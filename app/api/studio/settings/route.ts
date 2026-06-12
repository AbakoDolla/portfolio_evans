import { NextResponse } from 'next/server'
import { db, dbAdmin } from '@/lib/supabase'
export async function GET() {
  if (!db) return NextResponse.json(null)
  const { data } = await db.from('theme_config').select('primary_color,secondary_color,accent_color').eq('id', 1).single()
  return NextResponse.json(data ?? null)
}
export async function PUT(req: Request) {
  if (!dbAdmin) return NextResponse.json({ ok: false, error: 'DB not configured' }, { status: 503 })
  const { primary_color, secondary_color, accent_color } = await req.json()
  const { error } = await dbAdmin.from('theme_config').upsert({ id: 1, primary_color, secondary_color, accent_color, updated_at: new Date().toISOString() })
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
