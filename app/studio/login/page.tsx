'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Terminal, Eye, EyeOff, Loader2 } from 'lucide-react'

export default function StudioLogin() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/studio/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.ok) router.push('/studio')
      else setError(data.error ?? 'Mot de passe incorrect')
    } catch { setError('Erreur de connexion') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity }} />
      <motion.div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none"
        animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }} />

      <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', damping: 20 }}
        className="w-full max-w-md mx-4 relative z-10">
        <div className="glass-strong rounded-3xl p-8">
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 mb-4"
              animate={{ boxShadow: ['0 0 20px rgba(0,255,255,0.1)', '0 0 45px rgba(0,255,255,0.35)', '0 0 20px rgba(0,255,255,0.1)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}>
              <Terminal className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="text-2xl font-bold">Studio Access</h1>
            <p className="text-muted-foreground text-sm mt-1 font-mono opacity-60">/studio — admin only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block font-mono tracking-widest uppercase">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input type={show ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none transition-all font-mono text-sm"
                  required />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                className="text-sm text-red-400 bg-red-400/8 border border-red-400/20 rounded-xl px-4 py-3 font-mono">
                ✗ {error}
              </motion.div>
            )}

            <button type="submit" disabled={loading || !password}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/85 transition-all disabled:opacity-50 shadow-lg shadow-primary/20 mt-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              {loading ? 'Connexion…' : 'Accéder au Studio'}
            </button>
          </form>

          <div className="text-center mt-6">
            <a href="/" className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono">
              ← Retour au portfolio
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
