import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'
export const runtime = 'nodejs'
export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    if (!process.env.STUDIO_PASSWORD)
      return NextResponse.json({ ok: false, error: 'STUDIO_PASSWORD not set' }, { status: 500 })
    if (password !== process.env.STUDIO_PASSWORD)
      return NextResponse.json({ ok: false, error: 'Mot de passe incorrect' }, { status: 401 })
    const secret = new TextEncoder().encode(
      process.env.SESSION_SECRET ?? 'fallback-secret-change-me-in-vercel!!'
    )
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .setIssuedAt()
      .sign(secret)
    const res = NextResponse.json({ ok: true })
    res.cookies.set('studio_token', token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', maxAge: 60 * 60 * 24 * 7, path: '/',
    })
    return res
  } catch { return NextResponse.json({ ok: false, error: 'Erreur serveur' }, { status: 500 }) }
}
