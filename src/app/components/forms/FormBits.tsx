"use client";

import { useFormStatus } from "react-dom";
import type { FormState } from "@/app/actions/forms";

export function FieldError({ state, name }: { state: FormState; name: string }) {
  const msg = state.errors?.[name];
  if (!msg) return null;
  return (
    <p id={`${name}-error`} className="mt-1 text-sm text-red-400">
      {msg}
    </p>
  );
}

export function fieldProps(state: FormState, name: string) {
  const invalid = Boolean(state.errors?.[name]);
  return {
    id: name,
    name,
    defaultValue: state.values?.[name] ?? "",
    "aria-invalid": invalid || undefined,
    "aria-describedby": invalid ? `${name}-error` : undefined,
  };
}

/** Hidden spam trap. Bots fill it, people never see it. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label htmlFor="company">Company</label>
      <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full justify-center py-3 text-lg disabled:opacity-60 sm:w-auto">
      {pending ? "Sending…" : children}
    </button>
  );
}

export function FormAlert({ state }: { state: FormState }) {
  if (state.status === "error" && state.message) {
    return (
      <div role="alert" className="rounded-md border border-red-400/50 bg-red-500/10 p-4 text-red-200">
        {state.message}
      </div>
    );
  }
  return null;
}

export function FormSuccess({ message }: { message?: string }) {
  return (
    <div role="status" className="rounded-xl border border-brand/60 bg-brand/10 p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-2xl font-bold text-black" aria-hidden>
        ✓
      </div>
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
}
