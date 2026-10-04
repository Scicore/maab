"use client";

import { Suspense, useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  const inputClass =
    "w-full border border-slate-300 rounded-md px-3.5 py-2.5 text-[0.9375rem] text-slate-900 bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors";

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm"
    >
      {error && (
        <div className="mb-5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3.5 py-2.5">
          {error}
        </div>
      )}

      <div className="space-y-5">
        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 mb-2">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 mb-2">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className={inputClass}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-7 w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white text-[0.9375rem] font-medium px-5 py-3 rounded-md hover:bg-slate-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Signing in…
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-slate-900 text-white mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">MAAB Admin</h1>
          <p className="text-slate-500 text-sm mt-1">
            Sign in to access the administration panel
          </p>
        </div>

        <Suspense
          fallback={
            <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm flex items-center justify-center h-[340px]">
              <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        <p className="text-center text-xs text-slate-400 mt-6">
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </div>
  );
}