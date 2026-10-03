import { q } from "../q";
import type { Course } from "../types";

export const menuCourse: Course = {
  id: "lh-menu",
  title: "Everyday menu",
  blurb: "The five honey options from the Menu Training Guide. No store pricing.",
  audience: "Crew",
  modules: [
    {
      id: "lh-menu-rest",
      title: "Honey",
      lessons: [
        {
          id: "lh-menu-honey",
          title: "The five honey options",
          minutes: 5,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "steps",
              items: [
                "Regular Honey Drizzle.",
                "Extra Honey.",
                "Sweet Heat — extra honey plus Nashville spice dusting.",
                "No Honey.",
                "Honey on the side — this exists in Toast only. It is not a spoken default. Honey is packed separately, not on the chicken.",
              ],
            },
          ],
        },
        {
          id: "lh-menu-quiz",
          title: "Menu check",
          minutes: 2,
          kind: "quiz",
          pass: 86,
          blocks: [{ type: "p", text: "One question from the Menu Training Guide. You need 1 of 1. No prices." }],
          questions: [
            q("mn-q14", "A cashier offers “honey on the side” out loud on every ticket. That is:", ["The spoken default", "Wrong. Honey on the side is a Toast option. Honey is packed separately, not put on the chicken.", "The same offer as Sweet Heat", "Fine, because the chicken is already drizzled"], 1, "POS only. Not the spoken default, and not a drizzle."),
          ],
        },
      ],
    },
  ],
};
