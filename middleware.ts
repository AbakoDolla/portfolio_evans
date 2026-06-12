import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (!pathname.startsWith('/studio')) return NextResponse.next()
  if (pathname === '/studio/login') return NextResponse.next()
  const token = req.cookies.get('studio_token')?.value
  if (!token) return NextResponse.redirect(new URL('/studio/login', req.url))
  try {
    const secret = new TextEncoder().encode(
      process.env.SESSION_SECRET ?? 'fallback-secret-change-me-in-vercel!!'
    )
    await jwtVerify(token, secret)
    return NextResponse.next()
  } catch {
    const res = NextResponse.redirect(new URL('/studio/login', req.url))
    res.cookies.delete('studio_token')
    return res
  }
}
export const config = { matcher: ['/studio/:path*'] }
