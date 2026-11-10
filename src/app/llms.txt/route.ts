import { faqs } from "@/lib/faqs";
import { business, SITE_URL } from "@/lib/site";
import { services } from "@/lib/services";

export const dynamic = "force-static";

export async function GET() {
  const content = `# ${business.name}

> ${business.name} is a family-owned and operated business offering stump grinding, small tree removal, snow removal, small demolition and junk removal. Service area: ${business.serviceAreas.join("; ")}. Free estimates.

## Services

${services.map((s) => `- [${s.name}](${SITE_URL}/services/${s.slug}): ${s.summary}`).join("\n")}

## Pages

- [Home](${SITE_URL}/): Overview of services and recent work
- [About](${SITE_URL}/about): About the business and service area
- [FAQ](${SITE_URL}/faq): ${faqs.length} common questions about pricing, service area and cleanup
- [Free Estimate](${SITE_URL}/estimate): Request a free, no-obligation estimate
- [Contact](${SITE_URL}/contact): Phone, email and contact form

## Contact

- Phone: ${business.phone}
- Email: ${business.email}
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
