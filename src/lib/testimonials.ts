// Customer testimonials shown on the homepage.
//
// Only add REAL reviews here: copy them from the Fullmers Grind Google
// Business Profile or Facebook page, or from customers who have given
// permission to be quoted. The Testimonials section hides itself while this
// list is empty, so nothing placeholder ever ships to the live site.

export type Testimonial = {
  name: string; // e.g. "Sarah M." (first name + last initial is fine)
  location?: string; // e.g. "Attica, NY"
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  source?: "Google" | "Facebook" | "Customer";
};

export const testimonials: Testimonial[] = [];

// Link to the Google Business Profile, where customers can read and leave reviews.
// Leave empty to hide the reviews link.
export const reviewsUrl = "https://share.google/ZuzMB7VByf0iskAOw";
