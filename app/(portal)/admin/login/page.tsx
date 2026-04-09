"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Truck, ShieldCheck } from "lucide-react";
import { loginAdmin } from "@/app/actions/auth";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAdmin, undefined);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white font-bold text-xl">
            <Truck className="w-7 h-7 text-orange-400" />
            <span>Smart <span className="text-orange-400">Trucking</span></span>
          </Link>
          <div className="flex items-center justify-center gap-2 mt-4">
            <ShieldCheck className="w-5 h-5 text-orange-400" />
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          </div>
          <p className="mt-1 text-sm text-slate-400">Restricted access — authorized personnel only</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8">
          <form action={action} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-600 bg-slate-700 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="admin@smartrucking.ca"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-600 bg-slate-700 text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {state?.error && (
              <div className="rounded-lg bg-red-900/30 border border-red-700 px-4 py-3 text-sm text-red-300">
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
            >
              {pending ? "Signing in…" : "Sign in to Admin Portal"}
            </button>
          </form>
        </div>

        <p className="text-center mt-5 text-sm text-slate-500">
          Employee?{" "}
          <Link href="/employee/login" className="text-orange-400 hover:underline font-medium">
            Employee Portal →
          </Link>
        </p>
      </div>
    </div>
  );
}
