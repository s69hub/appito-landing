"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { adminLoginAction } from "../actions";
import { Loader2, Lock } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="relative w-full overflow-hidden rounded-xl bg-gradient-to-l from-brand to-navy py-3 text-sm font-bold text-white shadow-lg shadow-brand/20 transition-transform hover:scale-[1.02] disabled:opacity-70"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          در حال ورود...
        </span>
      ) : (
        "ورود"
      )}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, action] = useActionState(adminLoginAction, null);

  return (
    <div dir="rtl" className="flex min-h-screen flex-col items-center justify-center bg-bg px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-navy shadow-lg shadow-brand/20">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-black">پنل مدیریت اپیتو</h1>
          <p className="mt-1 text-sm text-muted">با رمز عبور ادمین وارد شوید</p>
        </div>

        <form action={action} className="card p-7 space-y-4">
          {state?.error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {state.error}
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-bold">رمز عبور</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-line bg-bg-soft px-3.5 py-2.5 text-sm outline-none focus:border-brand focus:ring-3 focus:ring-brand/15"
            />
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
