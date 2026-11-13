"use client";

import { useActionState } from "react";
import { submitEstimate, type FormState } from "@/app/actions/forms";
import { serviceNames } from "@/lib/services";
import { FieldError, FormAlert, FormSuccess, Honeypot, SubmitButton, fieldProps } from "./FormBits";

const initial: FormState = { status: "idle" };
const methods = ["Phone call", "Text message", "Email"];

export default function EstimateForm({ defaultService }: { defaultService?: string }) {
  const [state, action] = useActionState(submitEstimate, initial);

  if (state.status === "success") return <FormSuccess message={state.message} />;

  const service = state.values?.service ?? (defaultService && serviceNames.includes(defaultService) ? defaultService : "");
  const method = state.values?.contactMethod ?? "Phone call";

  return (
    <form action={action} noValidate className="relative space-y-5">
      <Honeypot />
      <FormAlert state={state} />

      <div>
        <label htmlFor="service" className="form-label">Service needed *</label>
        <select {...fieldProps(state, "service")} defaultValue={service} required className="form-input">
          <option value="" disabled>Choose a service…</option>
          {serviceNames.map((s) => (
            <option key={s} value={s} className="text-black">{s}</option>
          ))}
          <option value="Other / Not sure" className="text-black">Other / Not sure</option>
        </select>
        <FieldError state={state} name="service" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="form-label">Name *</label>
          <input {...fieldProps(state, "name")} type="text" autoComplete="name" required className="form-input" />
          <FieldError state={state} name="name" />
        </div>
        <div>
          <label htmlFor="phone" className="form-label">Phone *</label>
          <input {...fieldProps(state, "phone")} type="tel" autoComplete="tel" required className="form-input" />
          <FieldError state={state} name="phone" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="form-label">Email</label>
        <input {...fieldProps(state, "email")} type="email" autoComplete="email" className="form-input" />
        <FieldError state={state} name="email" />
      </div>

      <div>
        <label htmlFor="address" className="form-label">Job address or town *</label>
        <input {...fieldProps(state, "address")} type="text" autoComplete="street-address" required placeholder="e.g. 123 Main St, Attica" className="form-input" />
        <FieldError state={state} name="address" />
      </div>

      <div>
        <label htmlFor="description" className="form-label">Tell us about the job *</label>
        <textarea
          {...fieldProps(state, "description")}
          rows={5}
          required
          placeholder="How many stumps or trees, rough sizes, access (gates, slopes), timing…"
          className="form-input"
        />
        <FieldError state={state} name="description" />
      </div>

      <fieldset>
        <legend className="form-label">Best way to reach you *</legend>
        <div className="mt-1 flex flex-wrap gap-3">
          {methods.map((m) => (
            <label
              key={m}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-white/20 px-4 py-2 has-[:checked]:border-brand has-[:checked]:bg-brand/10"
            >
              <input type="radio" name="contactMethod" value={m} defaultChecked={m === method} className="accent-[#E5AB00]" />
              {m}
            </label>
          ))}
        </div>
        <FieldError state={state} name="contactMethod" />
      </fieldset>

      <SubmitButton>Request My Free Estimate</SubmitButton>
    </form>
  );
}
