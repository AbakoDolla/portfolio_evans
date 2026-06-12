import type { Metadata } from 'next'
import { StudioSidebar } from '@/components/studio/Sidebar'

export const metadata: Metadata = {
  title: 'Studio — Abah Prince Evans',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020a0f] text-foreground">
      <StudioSidebar />
      <div className="lg:pl-64">
        <main className="p-4 sm:p-6 lg:p-8 pt-[72px] lg:pt-8 pb-10 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
