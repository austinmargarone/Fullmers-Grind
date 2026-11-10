
// Sends email through Resend's REST API (https://resend.com/docs/api-reference/emails/send-email).
// No SDK dependency needed.
//
// Required env vars (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY      API key from resend.com
//   CONTACT_FROM_EMAIL  Sender, e.g. "Fullmers Grind Website <website@fullmersgrind.com>"
//                       (domain must be verified in Resend)
// Optional:
//   CONTACT_TO_EMAIL    Where submissions go (defaults to the business email)

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
  <p style="color:#888;font-size:12px;margin-top:16px">Sent from the contact form on fullmersgrind.com. Reply to this email to respond to the customer directly.</p>
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
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || business.email;

  if (!apiKey || !from) {
    console.error("[email] RESEND_API_KEY or CONTACT_FROM_EMAIL is not set");
    return { ok: false, error: "Email is not configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        subject: opts.subject,
        html: renderHtml(opts.heading, opts.fields),
        text: renderText(opts.heading, opts.fields),
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[email] Resend error", res.status, await res.text());
      return { ok: false, error: "Send failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] Resend request failed", err);
    return { ok: false, error: "Send failed" };
  }
}
