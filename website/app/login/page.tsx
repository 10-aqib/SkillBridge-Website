import { login, signup } from './actions'

export default async function LoginPage(
  props: {
    searchParams: Promise<{ message: string }>
  }
) {
  const searchParams = await props.searchParams
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fbff] px-5 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-[#b9cae0]/30 sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#10233d] text-xl font-bold text-white">
            S
          </div>
          <h1 className="display text-3xl font-semibold text-[#10233d]">Welcome Back</h1>
          <p className="mt-2 text-sm text-[#52647c]">Sign in to your SkillBridge account</p>
        </div>

        <form className="flex flex-col gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#10233d]" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-[#dce5f0] bg-white px-4 py-3 text-sm text-[#10233d] placeholder:text-[#a0b3c8] focus:border-[#75d9c8] focus:outline-none focus:ring-4 focus:ring-[#75d9c8]/20 transition-all"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[#10233d]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-[#dce5f0] bg-white px-4 py-3 text-sm text-[#10233d] placeholder:text-[#a0b3c8] focus:border-[#75d9c8] focus:outline-none focus:ring-4 focus:ring-[#75d9c8]/20 transition-all"
            />
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              formAction={login}
              className="focus-ring w-full rounded-xl bg-[#10233d] px-4 py-3.5 text-center font-semibold text-white transition hover:bg-[#1a3860]"
            >
              Log In
            </button>
            <button
              formAction={signup}
              className="focus-ring w-full rounded-xl border-2 border-[#10233d] bg-white px-4 py-3.5 text-center font-semibold text-[#10233d] transition hover:bg-slate-50"
            >
              Sign Up
            </button>
          </div>

          {searchParams?.message && (
            <div className="mt-4 rounded-xl bg-red-50 p-4 text-center text-sm font-medium text-red-600 border border-red-100">
              {searchParams.message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
