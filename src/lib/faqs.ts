// FAQ content, rendered on /faq and emitted as FAQPage structured data.
// Answers avoid specific prices or claims the client hasn't confirmed.

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How much does stump grinding cost?",
    a: "Every stump is different. Price depends on the stump's diameter, how many stumps there are, the type of wood and how easy the spot is to reach. Send us a free estimate request with a photo, or give us a call, and we'll give you a straight answer.",
  },
  {
    q: "Are estimates really free?",
    a: "Yes. Tell us about the job through the estimate form or by phone and we'll get back to you with a quote at no cost and no obligation.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve Buffalo, NY and the surrounding area, plus Wyoming County and Genesee County. If you're just outside those areas, reach out anyway and we'll let you know if we can make it work.",
  },
  {
    q: "How deep do you grind stumps?",
    a: "We grind stumps below ground level so the area can be covered with soil and seeded, sodded or planted. If you have a specific depth in mind, for example to put in a patio or a new tree, let us know when you request your estimate.",
  },
  {
    q: "What happens to the wood chips after grinding?",
    a: "Grinding leaves a pile of wood chips and soil. We can clean it up for you, or leave it so you can use it as mulch or fill. Just tell us which you'd prefer.",
  },
  {
    q: "Can you reach stumps in a fenced backyard?",
    a: "In most cases, yes. Our compact equipment fits through many gates and tight spaces. Let us know the gate width or send a photo with your estimate request and we'll confirm.",
  },
  {
    q: "Do you remove the tree too, or just the stump?",
    a: "Both. We handle small tree removal, and we can grind the stump on the same visit so you're left with a clean, usable space.",
  },
  {
    q: "Do I need to do anything before you arrive?",
    a: "Clear away anything movable near the work area, like lawn furniture, decorations or vehicles, and let us know about any sprinkler lines, buried cables or other hidden hazards you're aware of.",
  },
  {
    q: "Do you plow snow for residential driveways?",
    a: "Yes. We offer snow plowing for driveways and small lots. Contact us before the season starts to ask about availability.",
  },
  {
    q: "What kind of demolition do you do?",
    a: "We focus on small demolition: sheds, small outbuildings and similar structures. We tear them down, load the debris and clean up the site.",
  },
  {
    q: "How do I schedule a job?",
    a: "Fill out the free estimate form, send us a message through the contact page, or call (585) 409-0818. We'll get back to you to talk through the job and find a time that works.",
  },
];
