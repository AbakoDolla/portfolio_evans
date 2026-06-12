import { NextResponse } from 'next/server'
import { z } from 'zod'
import { dbAdmin } from '@/lib/supabase'

const schema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  service: z.string().optional(),
  budget:  z.string().optional(),
  message: z.string().min(10).max(2000),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    if (dbAdmin) {
      await dbAdmin.from('messages').insert({
        name: data.name, email: data.email,
        service: data.service ?? null, budget: data.budget ?? null,
        message: data.message,
      })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from: 'Portfolio Evans <onboarding@resend.dev>',
        to: 'evansabah2006@gmail.com',
        replyTo: data.email,
        subject: `[Portfolio] ${data.service ?? 'Contact'} — ${data.name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#030712;color:#e2f8f8;padding:36px;border-radius:14px;border:1px solid rgba(0,255,255,0.18)">
            <h2 style="color:#00ffff;margin:0 0 24px;font-size:22px">&#128236; Nouvelle demande — portfolio</h2>
            <table style="width:100%;border-collapse:collapse;font-size:15px">
              <tr><td style="padding:10px 0;color:rgba(180,230,230,0.55);width:110px">Nom</td><td style="padding:10px 0;font-weight:700">${data.name}</td></tr>
              <tr><td style="padding:10px 0;color:rgba(180,230,230,0.55)">Email</td><td style="padding:10px 0"><a href="mailto:${data.email}" style="color:#00ffff">${data.email}</a></td></tr>
              ${data.service ? `<tr><td style="padding:10px 0;color:rgba(180,230,230,0.55)">Service</td><td style="padding:10px 0;color:#00ff96;font-weight:700">${data.service}</td></tr>` : ''}
              ${data.budget  ? `<tr><td style="padding:10px 0;color:rgba(180,230,230,0.55)">Budget</td><td style="padding:10px 0">${data.budget}</td></tr>` : ''}
            </table>
            <div style="margin-top:24px;padding:18px;background:rgba(0,255,255,0.05);border-radius:10px;border-left:3px solid #00ffff;line-height:1.7">
              <p style="margin:0;white-space:pre-wrap">${data.message.replace(/</g,'&lt;')}</p>
            </div>
            <hr style="margin:28px 0;border:none;border-top:1px solid rgba(0,255,255,0.08)" />
            <p style="margin:0;font-size:12px;color:rgba(140,200,200,0.35)">Via <a href="https://portfolio-evans-abah.vercel.app" style="color:rgba(0,255,255,0.4)">portfolio-evans-abah.vercel.app</a></p>
          </div>`,
      })
    }

    return NextResponse.json({ ok: true, message: "Message reçu ! Je vous contacte sous 24h." })
  } catch (err) {
    if (err instanceof z.ZodError)
      return NextResponse.json({ ok: false, errors: err.flatten().fieldErrors }, { status: 400 })
    return NextResponse.json({ ok: false, message: "Erreur serveur" }, { status: 500 })
  }
}
