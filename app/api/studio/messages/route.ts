import { NextResponse } from 'next/server'
import { dbAdmin } from '@/lib/supabase'
export async function GET() {
  if (!dbAdmin) return NextResponse.json([])
  const { data, error } = await dbAdmin.from('messages').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}
export async function PATCH(req: Request) {
  if (!dbAdmin) return NextResponse.json({ ok: false }, { status: 503 })
  const { id, ...updates } = await req.json()
  const { error } = await dbAdmin.from('messages').update(updates).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
export async function DELETE(req: Request) {
  if (!dbAdmin) return NextResponse.json({ ok: false }, { status: 503 })
  const { id } = await req.json()
  const { error } = await dbAdmin.from('messages').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
