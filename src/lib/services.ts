// Service content for /services and /services/[slug].
// Copy is written to be accurate without making claims the client hasn't
// confirmed (insurance, years in business, pricing). Edit freely.

export type ServiceImage = { src: string; alt: string };

export type Service = {
  slug: string;
  name: string;
  /** One line for cards and meta descriptions */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  includes: string[];
  goodFor: string[];
  images: ServiceImage[];
};

export const services: Service[] = [
  {
    slug: "stump-grinding",
    name: "Stump Grinding",
    summary:
      "Grind unsightly stumps below grade so you can reclaim your lawn, garden or driveway edge.",
    metaTitle: "Stump Grinding in Buffalo, Wyoming & Genesee County, NY",
    metaDescription:
      "Professional stump grinding from Fullmers Grind LLC. We grind stumps below grade across Buffalo, Wyoming County and Genesee County, NY. Free estimates.",
    intro: [
      "Old stumps are tripping hazards, mower obstacles and a magnet for insects. Our stump grinder chips the stump and its surface roots down below ground level, leaving a clean area you can seed, sod or plant over.",
      "Our compact grinder fits through most gates and backyard openings, so we can reach stumps that bigger machines can't, with minimal impact on your lawn.",
    ],
    includes: [
      "Grinding the stump below grade",
      "Surface root grinding around the stump",
      "Single stumps or whole lots of them",
      "Cleanup of grindings, or leaving them for mulch if you prefer",
    ],
    goodFor: [
      "Leftover stumps after a tree removal",
      "Clearing space for a lawn, garden, patio or shed",
      "Removing hazards along driveways and walkways",
    ],
    images: [
      { src: "/Grinder.jpg", alt: "Fullmers Grind stump grinder" },
      { src: "/StumpGrinding-Trailer.jpg", alt: "Stump ground below grade with the Fullmers Grind trailer behind" },
      { src: "/StumpGrinding-After1.jpg", alt: "Lawn after several stumps were ground out" },
      { src: "/StumpGrinding-After2.jpg", alt: "Ground-out stump area in a yard" },
      { src: "/StumpGround-TreeRow.jpg", alt: "Freshly ground stump in front of a row of trees" },
      { src: "/Vertical1.jpg", alt: "Tree stump before grinding" },
      { src: "/Vertical2.jpg", alt: "Stump area after grinding" },
      { src: "/Vertical3.jpg", alt: "Cut tree stump in a lawn" },
      { src: "/Vertical4.jpg", alt: "Ground stump area in a yard" },
    ],
  },
  {
    slug: "small-tree-removal",
    name: "Small Tree Removal",
    summary:
      "Safe removal of small trees, overgrowth and storm-downed limbs, with cleanup when we're done.",
    metaTitle: "Small Tree Removal in Buffalo, Wyoming & Genesee County, NY",
    metaDescription:
      "Small tree and brush removal from Fullmers Grind LLC in Western NY. Downed trees, overgrowth and clearing, with stump grinding available. Free estimates.",
    intro: [
      "Whether it's a small tree that's grown too close to the house, a tangle of overgrowth or a tree that came down in a storm, we'll take it down and clear it out.",
      "Pair tree removal with stump grinding and you're left with a clean, usable space instead of a stump to work around.",
    ],
    includes: [
      "Removal of small trees and saplings",
      "Brush and overgrowth clearing",
      "Downed trees and storm cleanup",
      "Stump grinding available on the same visit",
    ],
    goodFor: [
      "Trees crowding the house, fence or driveway",
      "Overgrown fence lines and property edges",
      "Cleanup after wind and storm damage",
    ],
    images: [
      { src: "/TreeRemoval-Lift.jpg", alt: "Tree being taken down from a boom lift" },
      { src: "/TreeRemoval-Lift2.jpg", alt: "Crew cutting a tree down section by section from a lift" },
      { src: "/TreeRemoval-Chipper.jpg", alt: "Wood chipper and boom lift on a tree removal job" },
      { src: "/TreeRemoval-Brush.jpg", alt: "Brush and limbs cleared during a tree removal" },
      { src: "/TreeRemoval-StumpGround.jpg", alt: "Tree removal in progress with a ground stump in front" },
      { src: "/TreeRow-Before.jpg", alt: "Row of trees before removal" },
      { src: "/TreeJob-Roadside.jpg", alt: "Roadside tree removal job" },
      { src: "/TreeDown.jpg", alt: "Downed tree in a backyard" },
      { src: "/X2.jpg", alt: "Mini excavator clearing brush" },
      { src: "/X1.jpg", alt: "Equipment clearing an overgrown field" },
      { src: "/Equipment.jpg", alt: "Fullmers Grind tree and brush equipment" },
    ],
  },
  {
    slug: "snow-removal",
    name: "Snow Removal",
    summary:
      "Snow plowing to keep driveways and lots clear through Western New York winters.",
    metaTitle: "Snow Plowing & Snow Removal in Wyoming & Genesee County, NY",
    metaDescription:
      "Snow plowing and snow removal from Fullmers Grind LLC for driveways and lots in Western NY. Contact us for a free estimate.",
    intro: [
      "Western New York winters don't take days off, and neither does your driveway. We plow snow so you can get out the door without picking up a shovel.",
      "Reach out before the season starts to get on the schedule, or call us after a storm and we'll let you know what we can do.",
    ],
    includes: [
      "Driveway snow plowing",
      "Small lot plowing",
      "Seasonal or per-storm service (ask about availability)",
    ],
    goodFor: [
      "Homeowners who want a clear driveway before work",
      "Long rural driveways",
      "Small business lots",
    ],
    images: [{ src: "/plow.jpg", alt: "Fullmers Grind snow plow truck" }],
  },
  {
    slug: "small-demo",
    name: "Small Demo",
    summary:
      "Tear-down and haul-away of sheds, small outbuildings and other small structures.",
    metaTitle: "Small Demolition Services in Buffalo, Wyoming & Genesee County, NY",
    metaDescription:
      "Small demolition from Fullmers Grind LLC: sheds, outbuildings and small structures torn down and cleared in Western NY. Free estimates.",
    intro: [
      "That falling-down shed or old outbuilding doesn't have to stay. We tear down small structures with our own equipment and clear the debris, leaving you with open ground.",
      "From the first swing to the final cleanup, one crew handles the whole job.",
    ],
    includes: [
      "Shed and small outbuilding tear-downs",
      "Debris loading and haul-away",
      "Site cleanup when the structure is gone",
    ],
    goodFor: [
      "Rotting or unsafe sheds",
      "Clearing space for a new structure",
      "Prepping a property for sale",
    ],
    images: [
      { src: "/BeforeDemo.jpg", alt: "Old shed before demolition" },
      { src: "/AfterDemo.jpg", alt: "Cleared ground after shed demolition" },
      { src: "/Demo1.jpg", alt: "Small outbuilding ready for demolition" },
      { src: "/Demo2.jpg", alt: "Demolition debris being cleared" },
      { src: "/Demo3.jpg", alt: "Excavator clearing demolition debris" },
      { src: "/Demo4.jpg", alt: "Site after demolition cleanup" },
    ],
  },
  {
    slug: "junk-removal",
    name: "Junk Removal",
    summary:
      "Clean-outs and haul-away of yard debris, junk piles and unwanted materials.",
    metaTitle: "Junk Removal in Buffalo, Wyoming & Genesee County, NY",
    metaDescription:
      "Junk removal and clean-outs from Fullmers Grind LLC in Western NY. Yard debris, junk piles and unwanted materials hauled away. Free estimates.",
    intro: [
      "Got a pile that's been sitting too long? We load it up and haul it away, from brush and yard debris to old materials and junk left behind on a property.",
      "With the equipment to move heavy loads, we can handle the jobs that are too big for a weekend and a pickup truck.",
    ],
    includes: [
      "Yard debris and brush piles",
      "Property and outbuilding clean-outs",
      "Loading and haul-away",
    ],
    goodFor: [
      "Clearing out a newly purchased property",
      "Post-project and post-storm cleanup",
      "Getting rid of years of accumulated junk",
    ],
    images: [
      { src: "/X3.jpg", alt: "Excavator loading a dumpster for junk removal" },
      { src: "/Demo2.jpg", alt: "Debris pile being cleared" },
      { src: "/X.jpg", alt: "Fullmers Grind mini excavator" },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceNames = services.map((s) => s.name);
