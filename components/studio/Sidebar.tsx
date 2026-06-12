'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, MessageSquare, Palette, ExternalLink, LogOut, Menu, X, Terminal, ChevronRight } from 'lucide-react'

const NAV = [
  { href: '/studio',          icon: LayoutDashboard, label: 'Dashboard',  exact: true },
  { href: '/studio/messages', icon: MessageSquare,   label: 'Messages' },
  { href: '/studio/settings', icon: Palette,         label: 'Apparence' },
]

export function StudioSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  async function logout() {
    await fetch('/api/studio/logout', { method: 'POST' })
    window.location.href = '/studio/login'
  }

  function isActive(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname.startsWith(href)
  }

  function NavContent({ onClose }: { onClose?: () => void }) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/[0.07]">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center flex-shrink-0">
            <Terminal className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-sm">Evans Studio</div>
            <div className="text-xs text-muted-foreground font-mono">CMS v1.0</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ href, icon: Icon, label, exact }) => {
            const active = isActive(href, exact)
            return (
              <Link key={href} href={href} onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                  active
                    ? 'bg-primary/12 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground border border-transparent'
                }`}>
                <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary' : 'group-hover:text-foreground'}`} />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight className="w-3 h-3 opacity-50" />}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/[0.07] space-y-0.5">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-all">
            <ExternalLink className="w-4 h-4 flex-shrink-0" />Voir le portfolio
          </a>
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-400/6 transition-all">
            <LogOut className="w-4 h-4 flex-shrink-0" />Déconnexion
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-[#030e14] border-r border-white/[0.07] z-40">
        <NavContent />
      </aside>

      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-[#030e14]/95 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-primary" />
          <span className="font-bold text-sm">Evans Studio</span>
        </div>
        <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors" aria-label="Menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)} />
            <motion.aside key="drawer"
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="lg:hidden fixed inset-y-0 left-0 w-72 bg-[#030e14] border-r border-white/[0.07] z-50">
              <NavContent onClose={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
