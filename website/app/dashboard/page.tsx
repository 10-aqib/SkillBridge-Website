import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { signOut } from '../login/actions'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch user profile from the database
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-[#f8fbff] p-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl shadow-[#b9cae0]/30">
        <div className="flex items-center justify-between border-b border-[#e5ebf3] pb-6">
          <h1 className="display text-3xl font-semibold text-[#10233d]">Dashboard</h1>
          <form action={signOut}>
            <button className="rounded-xl border border-[#dce5f0] bg-white px-4 py-2 text-sm font-semibold text-[#52647c] transition hover:bg-slate-50">
              Sign Out
            </button>
          </form>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-[#10233d]">Welcome, {profile?.full_name || user.email}</h2>
          <p className="mt-2 text-[#52647c]">
            Role: <span className="font-semibold text-[#0f9f8f] capitalize">{profile?.role || 'Customer'}</span>
          </p>
          
          <div className="mt-10 rounded-2xl bg-[#eaf4fa] p-6 border border-[#bcd4f8]">
            <h3 className="font-bold text-[#155eef]">Supabase Connected Successfully! 🚀</h3>
            <p className="mt-2 text-sm text-[#31455f]">
              Your authentication session is working, and your profile was retrieved securely from the PostgreSQL database using Row Level Security (RLS).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
