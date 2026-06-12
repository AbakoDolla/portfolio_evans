import { NextResponse } from 'next/server'
import { dbAdmin } from '@/lib/supabase'

export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`)
    return NextResponse.json({ ok: false }, { status: 401 })

  if (!dbAdmin) return NextResponse.json({ ok: false, error: 'DB not configured' })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return NextResponse.json({ ok: false, error: 'RESEND_API_KEY not configured' })

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [
    { count: totalMessages },
    { count: newMessages },
    { count: unread },
    { data: recent },
  ] = await Promise.all([
    dbAdmin.from('messages').select('*', { count: 'exact', head: true }),
    dbAdmin.from('messages').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
    dbAdmin.from('messages').select('*', { count: 'exact', head: true }).eq('read', false),
    dbAdmin.from('messages').select('name,service,email,created_at').gte('created_at', weekAgo).order('created_at', { ascending: false }).limit(10),
  ])

  const rows = (recent ?? []).map((m: Record<string,unknown>) => `
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
      <td style="padding:10px 8px;color:#e2f8f8">${m.name}</td>
      <td style="padding:10px 8px;color:#00ff96">${m.service ?? '—'}</td>
      <td style="padding:10px 8px;color:rgba(180,230,230,0.6)">${m.email}</td>
      <td style="padding:10px 8px;color:rgba(180,230,230,0.4)">${new Date(String(m.created_at)).toLocaleDateString('fr-FR')}</td>
    </tr>`).join('')

  const statCards = [
    { label: 'Total messages', value: totalMessages ?? 0, color: '#00ffff' },
    { label: 'Cette semaine',  value: newMessages  ?? 0, color: '#00ff96' },
    { label: 'Non lus',        value: unread       ?? 0, color: '#ff9900' },
  ].map(s => `
    <div style="flex:1;min-width:130px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;text-align:center">
      <div style="font-size:32px;font-weight:800;color:${s.color}">${s.value}</div>
      <div style="font-size:12px;color:rgba(180,230,230,0.5);margin-top:4px">${s.label}</div>
    </div>`).join('')

  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)

  await resend.emails.send({
    from: 'Portfolio Evans <onboarding@resend.dev>',
    to: 'evansabah2006@gmail.com',
    subject: `📊 Rapport hebdo — ${new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'long' })}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#030712;color:#e2f8f8;border-radius:16px;overflow:hidden;border:1px solid rgba(0,255,255,0.15)">
        <div style="padding:32px;background:linear-gradient(135deg,#030712,#071828)">
          <h1 style="margin:0;font-size:24px;color:#00ffff">📊 Rapport Hebdomadaire</h1>
          <p style="margin:8px 0 0;color:rgba(180,230,230,0.6);font-size:14px">
            ${new Date(weekAgo).toLocaleDateString('fr-FR')} → ${new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>
        <div style="padding:28px 32px">
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px">${statCards}</div>
          ${rows ? `
            <h3 style="color:#00ffff;font-size:14px;margin:0 0 12px">Nouveaux contacts cette semaine</h3>
            <table style="width:100%;border-collapse:collapse;font-size:13px">
              <thead><tr style="border-bottom:1px solid rgba(255,255,255,0.1)">
                <th style="padding:8px;text-align:left;color:rgba(180,230,230,0.4);font-weight:500">Nom</th>
                <th style="padding:8px;text-align:left;color:rgba(180,230,230,0.4);font-weight:500">Service</th>
                <th style="padding:8px;text-align:left;color:rgba(180,230,230,0.4);font-weight:500">Email</th>
                <th style="padding:8px;text-align:left;color:rgba(180,230,230,0.4);font-weight:500">Date</th>
              </tr></thead>
              <tbody>${rows}</tbody>
            </table>` :
            '<p style="color:rgba(180,230,230,0.4);font-size:13px;margin:0">Aucun nouveau contact cette semaine.</p>'
          }
          <div style="margin-top:28px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06)">
            <a href="https://portfolio-evans-abah.vercel.app/studio/messages"
              style="display:inline-block;background:#00ffff;color:#030712;padding:12px 24px;border-radius:10px;font-weight:700;font-size:13px;text-decoration:none">
              Voir les messages dans Studio →
            </a>
          </div>
        </div>
        <div style="padding:20px 32px;background:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.06)">
          <p style="margin:0;font-size:11px;color:rgba(140,200,200,0.3)">
            Rapport auto-généré chaque dimanche · <a href="https://portfolio-evans-abah.vercel.app" style="color:rgba(0,255,255,0.4)">portfolio-evans-abah.vercel.app</a>
          </p>
        </div>
      </div>`,
  })

  return NextResponse.json({ ok: true, stats: { totalMessages, newMessages, unread } })
}
