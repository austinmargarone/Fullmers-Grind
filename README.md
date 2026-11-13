# Fullmers Grind LLC website

Website for [Fullmers Grind LLC](https://fullmersgrind.com), a family-owned
stump grinding and property services business serving Buffalo, Wyoming County
and Genesee County, NY.

Built and maintained by [Flower City Virtual Tours](https://www.fcvt.dev).

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · deployed on Vercel

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values (see "Form email" below)
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build` (production build), `npm run lint`.

The Inter font is self-hosted from `src/app/fonts/` (SIL Open Font License, see `OFL.txt`),
so builds and dev don't depend on reaching Google Fonts.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage: hero, service cards, why-us, reviews, photo slideshow |
| `/services` | All services |
| `/services/[slug]` | One page per service, generated from `src/lib/services.ts` |
| `/about` | Family business story and service area |
| `/faq` | FAQ, from `src/lib/faqs.ts` (also emitted as FAQ structured data) |
| `/contact` | Contact info + contact form |
| `/estimate` | Free estimate form (`/estimate?service=Small%20Demo` pre-selects a service) |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | Generated automatically, including every service page |

## Where to edit content

Almost all content lives in `src/lib/`, so most updates don't touch page code:

| File | Controls |
| --- | --- |
| `src/lib/site.ts` | Phone, email, Facebook link, service area, nav links |
| `src/lib/services.ts` | Each service's name, copy, bullet lists, photos and SEO title/description |
| `src/lib/faqs.ts` | FAQ questions and answers |
| `src/lib/testimonials.ts` | Customer reviews and the Google reviews link |

### Adding a service

Add an entry to the `services` array in `src/lib/services.ts`. The page, nav
menu, footer, ticker, estimate form dropdown, sitemap and structured data all
pick it up automatically.

### Adding reviews

Copy **real** reviews from the Google Business Profile (or customers who've
agreed to be quoted) into `src/lib/testimonials.ts`:

```ts
export const testimonials: Testimonial[] = [
  {
    name: "First name + last initial",
    location: "Town, NY",     // optional
    rating: 5,                // optional
    source: "Google",         // optional
    quote: "Paste the review text exactly as written.",
  },
];
```

While the list is empty, the homepage shows a "See what our customers say on
Google" link instead (set by `reviewsUrl` in the same file). Once reviews are
added, they show as cards with a "Read more reviews on Google" button.

### Adding photos

Put images in `public/` and reference them as `/FileName.jpg`. Keep them web
sized (2000px on the long edge, roughly 1MB or less). For example, with
ImageMagick:

```bash
magick input.jpg -auto-orient -resize "2000x2000>" -strip -quality 78 public/NewPhoto.jpg
```

`-auto-orient` matters for phone photos: it bakes in the rotation so pictures
don't show up sideways anywhere.

## Form email

The contact and estimate forms use a Next.js server action
(`src/app/actions/forms.ts`) that emails each submission through
[Resend](https://resend.com). Replies go straight to the customer (their email
is set as Reply-To).

Setup:

1. Create a Resend account and add the domain **fullmersgrind.com**. Add the
   DNS records Resend gives you, wherever the domain's DNS is managed, then
   wait for it to show **Verified**.
2. Create an API key.
3. In Vercel → Project → Settings → Environment Variables, add:

   | Variable | Example | Required |
   | --- | --- | --- |
   | `RESEND_API_KEY` | `re_...` | yes |
   | `CONTACT_FROM_EMAIL` | `Fullmers Grind Website <website@fullmersgrind.com>` | yes (must use the verified domain) |
   | `CONTACT_TO_EMAIL` | `fullmersgrind@yahoo.com` | no (defaults to the business email; comma-separate for several) |

4. Redeploy, then send a test from `/contact` and `/estimate`.

If these aren't set, or Resend is down, the form shows the customer the phone
number and email to reach out directly, keeps what they typed, and logs the
error in Vercel's function logs (search for `[email]`).

Spam protection is a hidden honeypot field. If spam becomes a problem, add
Cloudflare Turnstile or rate limiting.

## SEO

- Per-page titles and descriptions via the Next.js Metadata API (title template in `src/app/layout.tsx`)
- Structured data: `HomeAndConstructionBusiness` (site-wide), `Service` + breadcrumbs (service pages), `FAQPage` (FAQ)
- Social share image: `public/og.jpg` (1200×630)
- After launch, submit `https://fullmersgrind.com/sitemap.xml` in Google Search Console

## Tracking

The Google Ads tag (`AW-18117004957`) loads site-wide from `src/app/layout.tsx`.
Form-submit and call-click conversion events aren't wired up yet; they need
conversion labels from the Google Ads account.
