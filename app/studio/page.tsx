import { dbAdmin } from '@/lib/supabase'
import { MessageSquare, Mail, Archive, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 60

async function getStats() {
  if (!dbAdmin) return { total: 0, unread: 0, archived: 0, recent: [] as Record<string,unknown>[] }
  const [{ count: total }, { count: unread }, { count: archived }, { data: recent }] = await Promise.all([
    dbAdmin.from('messages').select('*', { count: 'exact', head: true }),
    dbAdmin.from('messages').select('*', { count: 'exact', head: true }).eq('read', false).eq('archived', false),
    dbAdmin.from('messages').select('*', { count: 'exact', head: true }).eq('archived', true),
    dbAdmin.from('messages').select('id,name,email,service,message,read,created_at')
      .order('created_at', { ascending: false }).limit(5),
  ])
  return { total: total ?? 0, unread: unread ?? 0, archived: archived ?? 0, recent: (recent ?? []) as Record<string,unknown>[] }
}

export default async function StudioPage() {
  const { total, unread, archived, recent } = await getStats()

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Vue d&apos;ensemble</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {!dbAdmin && (
        <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-300 text-sm">Configuration Supabase requise</p>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Ajoute ces variables dans Vercel → Settings → Environment Variables :
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['NEXT_PUBLIC_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_ANON_KEY','SUPABASE_SERVICE_ROLE_KEY','STUDIO_PASSWORD','SESSION_SECRET'].map(k => (
                  <code key={k} className="text-[11px] font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">{k}</code>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total messages', value: total,    icon: MessageSquare, color: 'text-primary',   bg: 'bg-primary/10',   border: 'border-primary/20' },
          { label: 'Non lus',        value: unread,   icon: Mail,          color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' },
          { label: 'Archivés',       value: archived, icon: Archive,       color: 'text-accent',    bg: 'bg-accent/10',    border: 'border-accent/20' },
        ].map(({ label, value, icon: Icon, color, bg, border }) => (
          <div key={label} className={`glass-strong rounded-2xl p-5 flex items-center gap-4 border ${border}`}>
            <div className={`p-3 rounded-xl ${bg} flex-shrink-0`}><Icon className={`w-5 h-5 ${color}`} /></div>
            <div className="min-w-0">
              <div className="text-3xl font-bold tabular-nums">{value}</div>
              <div className="text-xs text-muted-foreground truncate">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Messages récents</h2>
          <Link href="/studio/messages" className="text-sm text-primary hover:underline flex items-center gap-1">
            Voir tout <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center text-muted-foreground text-sm">
            {dbAdmin ? "Aucun message pour l'instant." : 'Connecte Supabase pour voir les messages.'}
          </div>
        ) : (
          <div className="space-y-2">
            {recent.map((m) => (
              <div key={String(m.id)}
                className={`glass rounded-xl p-4 flex items-start gap-4 ${!m.read ? 'border-primary/20 bg-primary/[0.02]' : ''}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">{String(m.name)}</span>
                    {m.service && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md font-mono">{String(m.service)}</span>}
                    {!m.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{String(m.message)}</p>
                </div>
                <time className="text-xs text-muted-foreground flex-shrink-0">
                  {new Date(String(m.created_at)).toLocaleDateString('fr-FR')}
                </time>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
