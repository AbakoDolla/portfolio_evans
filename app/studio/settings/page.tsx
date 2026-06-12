'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Palette, Save, Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const PRESETS = [
  { name: 'Cyber Teal',   primary: '#00ffff', secondary: '#00ff96', accent: '#ff9900' },
  { name: 'Neon Blue',    primary: '#3b82f6', secondary: '#8b5cf6', accent: '#f97316' },
  { name: 'Matrix Green', primary: '#22c55e', secondary: '#86efac', accent: '#eab308' },
  { name: 'Purple Haze',  primary: '#a855f7', secondary: '#ec4899', accent: '#06b6d4' },
  { name: 'Sunset Red',   primary: '#ef4444', secondary: '#f97316', accent: '#eab308' },
  { name: 'Ocean Deep',   primary: '#06b6d4', secondary: '#0ea5e9', accent: '#6366f1' },
]

interface Theme { primary_color: string; secondary_color: string; accent_color: string }
const DEFAULTS: Theme = { primary_color: '#00ffff', secondary_color: '#00ff96', accent_color: '#ff9900' }

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>(DEFAULTS)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    fetch('/api/studio/settings')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setTheme({ ...DEFAULTS, ...d }) })
      .finally(() => setFetching(false))
  }, [])

  async function save() {
    setLoading(true)
    try {
      const r = await fetch('/api/studio/settings', { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(theme) })
      if (r.ok) { setSaved(true); toast.success('Thème sauvegardé ! Actif dans ~30 secondes.'); setTimeout(()=>setSaved(false), 3000) }
      else toast.error('Erreur lors de la sauvegarde')
    } finally { setLoading(false) }
  }

  const FIELDS: { key: keyof Theme; label: string; desc: string }[] = [
    { key: 'primary_color',   label: 'Couleur primaire',     desc: 'Boutons, liens, accents néon' },
    { key: 'secondary_color', label: 'Couleur secondaire',   desc: 'Badges, éléments secondaires' },
    { key: 'accent_color',    label: 'Couleur accentuation', desc: 'Highlights, tags spéciaux' },
  ]

  if (fetching) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Palette className="w-6 h-6 text-primary" />Apparence</h1>
        <p className="text-muted-foreground text-sm mt-1">Personnalise les couleurs de ton portfolio sans toucher au code.</p>
      </div>

      {/* Live preview */}
      <div className="glass-strong rounded-2xl overflow-hidden">
        <div className="h-1.5 flex">
          <div className="flex-1" style={{ background: theme.primary_color }} />
          <div className="flex-1" style={{ background: theme.secondary_color }} />
          <div className="flex-1" style={{ background: theme.accent_color }} />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex-shrink-0" style={{ background: theme.primary_color, boxShadow: `0 0 20px ${theme.primary_color}60` }} />
            <div>
              <div className="font-medium text-sm">Aperçu du thème</div>
              <div className="text-xs text-muted-foreground font-mono">{theme.primary_color} · {theme.secondary_color} · {theme.accent_color}</div>
            </div>
          </div>
          <div className="rounded-xl bg-black/30 p-4 space-y-2.5">
            <div className="h-2 rounded-full w-2/5" style={{ background: theme.primary_color }} />
            <div className="h-1.5 rounded-full w-3/5 bg-white/15" />
            <div className="h-1.5 rounded-full w-2/5 bg-white/10" />
            <div className="flex gap-2 pt-1">
              <div className="h-7 rounded-lg px-3 flex items-center text-xs font-bold" style={{ background: theme.primary_color, color: '#030712' }}>Voir projets</div>
              <div className="h-7 rounded-lg px-3 flex items-center text-xs font-bold border" style={{ borderColor: `${theme.secondary_color}60`, color: theme.secondary_color }}>Services</div>
              <div className="h-7 rounded-lg px-3 flex items-center text-xs font-bold" style={{ color: theme.accent_color }}>WhatsApp</div>
            </div>
          </div>
        </div>
      </div>

      {/* Presets */}
      <div>
        <p className="text-sm font-medium mb-3">Thèmes prédéfinis</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PRESETS.map(p => (
            <button key={p.name} onClick={()=>setTheme({primary_color:p.primary,secondary_color:p.secondary,accent_color:p.accent})}
              className="glass rounded-xl p-3 flex items-center gap-2.5 text-left hover:border-white/20 transition-all group">
              <div className="flex gap-0.5 flex-shrink-0">
                {[p.primary,p.secondary,p.accent].map((c,i)=>(
                  <div key={i} className="w-3 h-5 first:rounded-l-md last:rounded-r-md" style={{background:c}} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors truncate">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color pickers */}
      <div className="space-y-3">
        {FIELDS.map(({ key, label, desc }) => (
          <div key={key} className="glass-strong rounded-2xl p-5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <div className="font-medium text-sm">{label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg border border-white/10" style={{ background: theme[key], boxShadow: `0 0 12px ${theme[key]}40` }} />
                <input type="color" value={theme[key]} onChange={e=>setTheme(p=>({...p,[key]:e.target.value}))}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0 overflow-hidden" aria-label={label} />
                <input type="text" value={theme[key]}
                  onChange={e=>{ const v=e.target.value; if(/^#[0-9a-fA-F]{0,6}$/.test(v)) setTheme(p=>({...p,[key]:v})) }}
                  className="w-24 px-2.5 py-1.5 rounded-lg bg-muted/50 border border-border focus:border-primary outline-none text-xs font-mono transition-all"
                  maxLength={7} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <motion.button onClick={save} disabled={loading}
        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/85 transition-all disabled:opacity-60 shadow-lg shadow-primary/20">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
        {loading ? 'Sauvegarde…' : saved ? 'Sauvegardé !' : 'Sauvegarder le thème'}
      </motion.button>
    </div>
  )
}
