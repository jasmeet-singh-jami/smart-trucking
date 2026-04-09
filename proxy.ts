import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isEmployeeRoute =
    pathname.startsWith('/employee') && !pathname.startsWith('/employee/login')
  const isAdminRoute =
    pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')

  if (!isEmployeeRoute && !isAdminRoute) return NextResponse.next()

  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    const loginUrl = isAdminRoute
      ? new URL('/admin/login', request.url)
      : new URL('/employee/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (isAdminRoute) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/profiles?select=role&id=eq.${user.id}&limit=1`,
      {
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
          Accept: 'application/json',
        },
      }
    )
    const rows = await res.json()
    if (rows?.[0]?.role !== 'admin') {
      return NextResponse.redirect(new URL('/employee/dashboard', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/employee/:path*', '/admin/:path*'],
}
