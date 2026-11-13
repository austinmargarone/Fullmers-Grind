// Sends form submissions through EmailJS's REST API, called from the server
// (https://www.emailjs.com/docs/rest-api/send/). No SDK dependency needed.
//
// Required env vars (Vercel → Project → Settings → Environment Variables):
//   EMAILJS_SERVICE_ID    Email service ID (EmailJS → Email Services)
//   EMAILJS_TEMPLATE_ID   Template ID (EmailJS → Email Templates), set up as below
//   EMAILJS_PUBLIC_KEY    Account → General → Public Key
//   EMAILJS_PRIVATE_KEY   Account → General → Private Key
// Optional:
//   CONTACT_TO_EMAIL      Where submissions go (defaults to the business email)
//
// EmailJS account setting required: Account → Security →
//   "Allow EmailJS API for non-browser applications" must be ON.
//
// Template setup (one template serves both forms):
//   Subject:   {{subject}}
//   To Email:  {{to_email}}
//   From Name: Fullmers Grind Website
//   Reply To:  {{reply_to}}
//   Content:   {{{message_html}}}   (triple braces so the HTML table renders)

import { business } from "./site";

export type EmailField = { label: string; value: string };

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHtml(heading: string, fields: EmailField[]) {
  const rows = fields
    .filter((f) => f.value)
    .map(
      (f) => `<tr>
  <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;vertical-align:top;white-space:nowrap">${escapeHtml(f.label)}</td>
  <td style="padding:8px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(f.value)}</td>
</tr>`
    )
    .join("");
  return `<div style="font-family:Arial,sans-serif;max-width:640px">
  <h2 style="background:#E5AB00;color:#000;padding:12px 16px;margin:0">${escapeHtml(heading)}</h2>
  <table style="border-collapse:collapse;width:100%;font-size:15px">${rows}</table>
  <p style="color:#888;font-size:12px;margin-top:16px">Sent from the website form on fullmersgrind.com. Reply to this email to respond to the customer directly.</p>
</div>`;
}

function renderText(heading: string, fields: EmailField[]) {
  return [heading, "", ...fields.filter((f) => f.value).map((f) => `${f.label}: ${f.value}`)].join("\n");
}

export async function sendSubmissionEmail(opts: {
  subject: string;
  heading: string;
  fields: EmailField[];
  replyTo?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  const to = process.env.CONTACT_TO_EMAIL || business.email;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    console.error("[email] EmailJS env vars are not all set");
    return { ok: false, error: "Email is not configured" };
  }

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          to_email: to,
          // Fall back to the business email so Reply-To is never blank
          reply_to: opts.replyTo || business.email,
          subject: opts.subject,
          heading: opts.heading,
          message_html: renderHtml(opts.heading, opts.fields),
          message_text: renderText(opts.heading, opts.fields),
        },
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[email] EmailJS error", res.status, await res.text());
      return { ok: false, error: "Send failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] EmailJS request failed", err);
    return { ok: false, error: "Send failed" };
  }
}
