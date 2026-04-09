'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function loginEmployee(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error: string }> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) return { error: error.message }

  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await getServiceClient()
    .from('profiles')
    .select('role')
    .eq('id', user!.id)
    .single()

  redirect(profile?.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard')
}

export async function loginAdmin(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error: string }> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) return { error: error.message }

  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await getServiceClient()
    .from('profiles')
    .select('role')
    .eq('id', user!.id)
    .single()

  if (profile?.role !== 'admin') {
    await supabase.auth.signOut()
    return { error: 'Admin access required.' }
  }

  redirect('/admin/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
