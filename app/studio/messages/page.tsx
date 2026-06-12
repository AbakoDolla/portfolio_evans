'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MailOpen, Archive, Trash2, RefreshCw, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

interface Msg { id:string; name:string; email:string; service?:string; budget?:string; message:string; read:boolean; archived:boolean; created_at:string }

export default function MessagesPage() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all'|'unread'|'archived'>('all')
  const [expanded, setExpanded] = useState<string|null>(null)

  async function load() {
    setLoading(true)
    try { const r = await fetch('/api/studio/messages'); if (r.ok) setMessages(await r.json()) }
    finally { setLoading(false) }
  }

  async function act(id: string, payload: Partial<Pick<Msg,'read'|'archived'>>) {
    const r = await fetch('/api/studio/messages', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id,...payload}) })
    if (r.ok) { setMessages(p => p.map(m => m.id===id ? {...m,...payload} : m)); toast.success('Mis à jour') }
  }

  async function remove(id: string) {
    const r = await fetch('/api/studio/messages', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id}) })
    if (r.ok) { setMessages(p => p.filter(m => m.id!==id)); toast.success('Supprimé') }
  }

  useEffect(() => { load() }, [])

  const filtered = messages.filter(m => {
    if (filter==='unread')   return !m.read && !m.archived
    if (filter==='archived') return m.archived
    return !m.archived
  })
  const unreadCount = messages.filter(m => !m.read && !m.archived).length

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Messages
            {unreadCount > 0 && (
              <span className="text-sm font-normal bg-primary/15 text-primary px-2.5 py-0.5 rounded-full border border-primary/25">
                {unreadCount} nouveau{unreadCount>1?'x':''}
              </span>
            )}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{messages.filter(m=>!m.archived).length} message{messages.length!==1?'s':''}</p>
        </div>
        <button onClick={load} disabled={loading} className="p-2.5 rounded-xl glass hover:border-primary/30 transition-all" aria-label="Rafraîchir">
          <RefreshCw className={`w-4 h-4 ${loading?'animate-spin text-primary':'text-muted-foreground'}`} />
        </button>
      </div>

      <div className="flex gap-1.5 p-1 glass rounded-xl w-fit">
        {(['all','unread','archived'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter===f ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`}>
            {f==='all'?'Tous':f==='unread'?'Non lus':'Archivés'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => (
          <div key={i} className="glass rounded-2xl p-5 animate-pulse">
            <div className="h-4 bg-white/5 rounded w-1/3 mb-2" /><div className="h-3 bg-white/5 rounded w-2/3" />
          </div>
        ))}</div>
      ) : filtered.length===0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
          <p className="text-muted-foreground text-sm">
            {filter==='unread'?'Aucun message non lu.':filter==='archived'?'Aucun message archivé.':'Aucun message.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {filtered.map(msg => (
              <motion.div key={msg.id} layout
                initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, x:20, scale:0.95 }}
                transition={{ duration:0.2 }}
                className={`glass rounded-2xl overflow-hidden ${!msg.read&&!msg.archived?'border-primary/25 bg-primary/[0.02]':''}`}>
                <div className="p-4 flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm">{msg.name}</span>
                      {!msg.read&&!msg.archived&&<span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                      {msg.service&&<span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md font-mono">{msg.service}</span>}
                      {msg.budget&&<span className="text-xs bg-accent/10 text-accent border border-accent/20 px-2 py-0.5 rounded-md">{msg.budget}</span>}
                    </div>
                    <a href={`mailto:${msg.email}`} className="text-xs text-primary/70 hover:text-primary transition-colors font-mono">{msg.email}</a>
                    {expanded!==msg.id&&<p className="text-xs text-muted-foreground mt-1 truncate">{msg.message}</p>}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <time className="text-xs text-muted-foreground mr-1">{new Date(msg.created_at).toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'})}</time>
                    <button onClick={()=>setExpanded(expanded===msg.id?null:msg.id)}
                      className="p-1.5 rounded-lg hover:bg-white/8 transition-colors text-muted-foreground">
                      {expanded===msg.id?<ChevronUp className="w-4 h-4"/>:<ChevronDown className="w-4 h-4"/>}
                    </button>
                  </div>
                </div>
                <AnimatePresence>
                  {expanded===msg.id&&(
                    <motion.div initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} transition={{duration:0.2}} className="overflow-hidden">
                      <div className="px-4 pb-4 pt-3 border-t border-white/[0.06]">
                        <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex items-center gap-1 px-4 pb-3 flex-wrap">
                  {!msg.archived&&(
                    <button onClick={()=>act(msg.id,{read:!msg.read})}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-white/6 hover:text-foreground transition-all">
                      {msg.read?<Mail className="w-3.5 h-3.5"/>:<MailOpen className="w-3.5 h-3.5"/>}
                      {msg.read?'Non lu':'Lu'}
                    </button>
                  )}
                  <button onClick={()=>act(msg.id,{archived:!msg.archived})}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-white/6 hover:text-foreground transition-all">
                    <Archive className="w-3.5 h-3.5"/>{msg.archived?'Désarchiver':'Archiver'}
                  </button>
                  <button onClick={()=>remove(msg.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-red-400/60 hover:text-red-400 hover:bg-red-400/8 transition-all ml-auto">
                    <Trash2 className="w-3.5 h-3.5"/>Supprimer
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
