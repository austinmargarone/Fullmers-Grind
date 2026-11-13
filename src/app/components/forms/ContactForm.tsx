"use client";

import { useActionState } from "react";
import { submitContact, type FormState } from "@/app/actions/forms";
import { FieldError, FormAlert, FormSuccess, Honeypot, SubmitButton, fieldProps } from "./FormBits";

const initial: FormState = { status: "idle" };

export default function ContactForm() {
  const [state, action] = useActionState(submitContact, initial);

  if (state.status === "success") return <FormSuccess message={state.message} />;

  return (
    <form action={action} noValidate className="relative space-y-5">
      <Honeypot />
      <FormAlert state={state} />
      <div>
        <label htmlFor="name" className="form-label">Name *</label>
        <input {...fieldProps(state, "name")} type="text" autoComplete="name" required className="form-input" />
        <FieldError state={state} name="name" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="form-label">Email *</label>
          <input {...fieldProps(state, "email")} type="email" autoComplete="email" required className="form-input" />
          <FieldError state={state} name="email" />
        </div>
        <div>
          <label htmlFor="phone" className="form-label">Phone</label>
          <input {...fieldProps(state, "phone")} type="tel" autoComplete="tel" className="form-input" />
          <FieldError state={state} name="phone" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="form-label">Message *</label>
        <textarea {...fieldProps(state, "message")} rows={6} required className="form-input" />
        <FieldError state={state} name="message" />
      </div>
      <SubmitButton>Send Message</SubmitButton>
    </form>
  );
}
