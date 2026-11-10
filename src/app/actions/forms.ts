"use server";

import { sendSubmissionEmail } from "@/lib/email";
import { business } from "@/lib/site";
import { serviceNames } from "@/lib/services";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { short: 120, long: 5000 };

function get(fd: FormData, key: string, max = MAX.short) {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function phoneOk(p: string) {
  return p.replace(/\D/g, "").length >= 10;
}

const FAIL_MESSAGE = `Sorry, something went wrong sending your message. Please call us at ${business.phone} or email ${business.email}.`;

export async function submitContact(_prev: FormState, fd: FormData): Promise<FormState> {
  // Honeypot: real users never fill this hidden field
  if (get(fd, "company")) return { status: "success", message: "Thanks! We'll be in touch soon." };

  const values = {
    name: get(fd, "name"),
    email: get(fd, "email"),
    phone: get(fd, "phone"),
    message: get(fd, "message", MAX.long),
  };

  const errors: Record<string, string> = {};
  if (!values.name) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone && !phoneOk(values.phone)) errors.phone = "Please enter a valid phone number.";
  if (values.message.length < 5) errors.message = "Please enter a message.";
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const result = await sendSubmissionEmail({
    subject: `New website message from ${values.name}`,
    heading: "New Contact Form Message",
    replyTo: values.email,
    fields: [
      { label: "Name", value: values.name },
      { label: "Email", value: values.email },
      { label: "Phone", value: values.phone },
      { label: "Message", value: values.message },
    ],
  });

  if (!result.ok) return { status: "error", message: FAIL_MESSAGE, values };
  return { status: "success", message: "Thanks for reaching out! We'll get back to you soon." };
}

const CONTACT_METHODS = ["Phone call", "Text message", "Email"] as const;

export async function submitEstimate(_prev: FormState, fd: FormData): Promise<FormState> {
  if (get(fd, "company")) return { status: "success", message: "Thanks! We'll be in touch soon." };

  const values = {
    name: get(fd, "name"),
    phone: get(fd, "phone"),
    email: get(fd, "email"),
    service: get(fd, "service"),
    address: get(fd, "address", 300),
    description: get(fd, "description", MAX.long),
    contactMethod: get(fd, "contactMethod"),
  };

  const errors: Record<string, string> = {};
  if (!values.name) errors.name = "Please enter your name.";
  if (!phoneOk(values.phone)) errors.phone = "Please enter a valid phone number.";
  if (values.email && !EMAIL_RE.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.contactMethod === "Email" && !values.email) errors.email = "Please enter your email so we can reply.";
  if (![...serviceNames, "Other / Not sure"].includes(values.service)) errors.service = "Please choose a service.";
  if (!values.address) errors.address = "Please enter the job address or town.";
  if (values.description.length < 5) errors.description = "Please tell us a little about the job.";
  if (!CONTACT_METHODS.includes(values.contactMethod as (typeof CONTACT_METHODS)[number]))
    errors.contactMethod = "Please choose how you'd like us to reach you.";
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const result = await sendSubmissionEmail({
    subject: `Estimate request: ${values.service} (${values.name})`,
    heading: "New Free Estimate Request",
    replyTo: values.email || undefined,
    fields: [
      { label: "Service", value: values.service },
      { label: "Name", value: values.name },
      { label: "Phone", value: values.phone },
      { label: "Email", value: values.email },
      { label: "Preferred contact", value: values.contactMethod },
      { label: "Job address", value: values.address },
      { label: "Job description", value: values.description },
    ],
  });

  if (!result.ok) return { status: "error", message: FAIL_MESSAGE, values };
  return {
    status: "success",
    message: "Thanks! Your estimate request is in. We'll reach out soon to talk through the job.",
  };
}
