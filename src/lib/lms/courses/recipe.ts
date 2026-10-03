import { q } from "../q";
import type { Course } from "../types";

export const recipeCourse: Course = {
  id: "lh-recipe",
  title: "Recipe book",
  blurb: "Do not copy recipes off property. Allergen rules from the September 2026 kitchen packet.",
  audience: "Crew",
  modules: [
    {
      id: "lh-recipe-base",
      title: "How this book is used",
      lessons: [
        {
          id: "lh-recipe-rules",
          title: "How this book is used",
          minutes: 5,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Recipes are proprietary. Do not copy, photograph, or share them off property.",
            },
            {
              type: "list",
              items: [
                "Access is for people assigned to recipe prep.",
                "Questions go to your trainer.",
                "Results go to training leadership.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "lh-recipe-line",
      title: "Allergens",
      lessons: [
        {
          id: "lh-recipe-kits",
          title: "Allergens",
          minutes: 5,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Allergens",
            },
            {
              type: "list",
              items: [
                "Fried chicken is wheat and dairy.",
                "Sandwiches and sliders add eggs and soy.",
                "Coleslaw is dairy and eggs.",
                "BBQ sauce is fish, from the anchovy in Worcestershire.",
                "Honey Hot and pickles are N/A.",
                "Tots are N/A as a product and are fried in the same oil as the chicken.",
                "Gluten-free notes in the guide: pimento cheese, potato salad, pickles, and sauces. Not the shared fryer.",
              ],
            },
          ],
        },
        {
          id: "lh-recipe-quiz",
          title: "Recipe check",
          minutes: 3,
          kind: "quiz",
          pass: 86,
          blocks: [
            {
              type: "p",
              text: "Two questions from the September 2026 packet. You need 2 of 2.",
            },
          ],
          questions: [
            q("rc-q13", "A guest asks if BBQ sauce is a problem for a fish allergy. You say:", ["No. It is gluten-free, so it is clear.", "No. The only allergen in it is dairy.", "Yes. It has peanuts.", "Yes. Worcestershire brings anchovy, which is fish."], 3, "Fish. Say so."),
            q("rc-q14", "Tots and gluten. Which statement is the careful one?", ["They contain wheat, so they are not gluten-free at all.", "The product is gluten-free, and they share fryer oil with the chicken.", "They are fried in a separate gluten-free fryer.", "They contain egg, which is the gluten issue."], 1, "Gluten-free as a product. Not gluten-free once they share the chicken fryer."),
          ],
        },
      ],
    },
  ],
};
