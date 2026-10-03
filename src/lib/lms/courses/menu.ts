import { q } from "../q";
import type { Course } from "../types";

export const menuCourse: Course = {
  id: "lh-menu",
  title: "Everyday menu",
  blurb: "Builds, piece counts, and the five honey options from the Menu Training Guide. No store pricing.",
  audience: "Crew",
  modules: [
    {
      id: "lh-menu-builds",
      title: "Sandwiches, tenders, wings",
      lessons: [
        {
          id: "lh-menu-sandwiches",
          title: "OG and Nashville",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Learn the builds, not the dollars. Prices change by store.",
            },
            {
              type: "figure",
              src: "/sandwich-build.jpg",
              alt: "How we build the OG sandwich: toasted buttered brioche, buttermilk ranch on the top bun, three sweet pickles on the chicken, and one green scoop of buttermilk ranch slaw on the bottom bun.",
              caption: "OG stack. Nashville uses the same slaw, pickles, ranch, and bun, then the breast is dunked in hot chili oil and dusted.",
            },
            {
              type: "p",
              text: "OG Fried Chicken Sandwich",
            },
            {
              type: "list",
              items: [
                "Buttermilk fried chicken breast.",
                "Buttermilk ranch slaw.",
                "Three sweet pickles, placed so there is a pickle in every bite.",
                "Buttermilk ranch.",
                "Toasted and buttered brioche.",
              ],
            },
            {
              type: "p",
              text: "Nashville Fried Chicken Sandwich",
            },
            {
              type: "list",
              items: [
                "Same slaw, three sweet pickles, ranch, and bun.",
                "The breast is dunked in hot chili oil, then dusted with Nashville spice.",
                "The breading is different from all other chicken: flour, buttermilk, flour. Not flour, buttermilk, dredge.",
              ],
            },
            {
              type: "warn",
              title: "Nashville breading",
              text: "Flour, buttermilk, flour. Do not use the seasoned dredge path on Nashville chicken.",
            },
          ],
        },
        {
          id: "lh-menu-pieces",
          title: "Tenders, wings, and dark meat",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Tenders are natural state, not pounded. Hormone-free, no-antibiotic-ever chicken.",
            },
            {
              type: "steps",
              items: [
                "Single: half pound, at least 7 tenders, one 2 oz house-made sauce.",
                "Double: one pound, at least 14 tenders, two 2 oz house-made sauces.",
                "40 Tenders: 40 tenders, five 2 oz house-made sauces.",
                "Tenders & Tots Box: single tender count plus a choice of tots, one 2 oz sauce.",
                "3 whole wings: one 2 oz sauce. 6 whole wings: two 2 oz sauces.",
                "12 whole wings: sauce is not included. Sell it separately.",
                "A drumstick or a thigh includes no sauce. Dark Meat Combo is drums and thighs, no substitutions, no sauce included.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "lh-menu-rest",
      title: "Boxes, sides, honey",
      lessons: [
        {
          id: "lh-menu-boxes",
          title: "Kids, Rocky’s, Family, Snack Box",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "steps",
              items: [
                "Kids Meal: 3 buttermilk fried tenders, tater tots, ketchup packets.",
                "Rocky’s: 3 tenders plus 1 drum and 1 thigh, or 2 wings. One Rocky’s mini — Original, Honey Hot, Garlic, or one of each.",
                "Family Meal: double tenders plus 3 drums and 3 thighs, or 6 wings. Five sauces, four cornbread muffins with honey butter, large tots.",
                "Snack Box: serves 4, in a pizza box. 4 sliders, 4 mini cornbread with honey butter, double tenders, regular tots, 3 sauces.",
              ],
            },
          ],
        },
        {
          id: "lh-menu-honey",
          title: "Sides and the five honey options",
          minutes: 5,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "list",
              items: [
                "Potato salad and pimento cheese are both 5.5 oz and 8 oz.",
                "Potato salad is potatoes, mayo, mustard, sweet pickle relish, and egg.",
                "Regular tots are crispy and lightly salted.",
                "Nashville tots get Nashville spices plus 2 oz ranch.",
                "Banana pudding is Nilla Wafers, fresh banana, and house whipped cream.",
                "Drinks are 12 oz cans, plus Hank’s or Maine Root bottles, Simply Lemonade, and bottled water.",
                "Rocky’s minis are 1.7 fl oz: Original, Honey Hot, Garlic.",
              ],
            },
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
          minutes: 8,
          kind: "quiz",
          pass: 86,
          blocks: [{ type: "p", text: "Fourteen questions from the Menu Training Guide. You need 12 of 14. No prices." }],
          questions: [
            q("mn-q1", "OG and Nashville sandwiches. Which pickle build is right?", ["Two sweet pickles, off to one side of the breast", "Three sweet pickles, placed so there is a pickle in every bite", "One pickle under the breast", "Three pickles, and only on the Nashville"], 1, "Three sweet pickles, a pickle in every bite. Same stack on both sandwiches."),
            q("mn-q2", "The Nashville breast just came out of the hot chili oil. Next is:", ["Dust with Nashville spice", "Honey drizzle, then the bun", "A rinse, then the dredge", "Ranch, then the pickles"], 0, "Dunk, then dust. Not honey, ranch, or a rinse."),
            q("mn-q3", "Which breading path is Nashville, and only Nashville?", ["Flour, buttermilk, seasoned dredge", "Dredge only, no buttermilk", "Flour, buttermilk, flour", "Buttermilk, oil, then dredge"], 2, "Flour, buttermilk, flour. Every other chicken uses the dredge path."),
            q("mn-q4", "A guest orders a single tenders. You plate:", ["At least 14 tenders and two 2 oz sauces", "3 tenders and ketchup packets", "About 7 tenders and no sauce", "Half pound, at least 7 tenders, and one 2 oz house-made sauce"], 3, "At least 7, plus one 2 oz sauce. 14 and two sauces is the double."),
            q("mn-q5", "They upgrade to a double. What changes?", ["Same 7 tenders, and a second sauce", "40 tenders and five sauces", "14 tenders and no sauce", "One pound, at least 14 tenders, and two 2 oz sauces"], 3, "At least 14, plus two sauces."),
            q("mn-q6", "Which wing order is the one that does not include sauce?", ["3 whole wings", "12 whole wings", "6 whole wings", "Tenders and Tots Box"], 1, "12 whole wings: sauce is sold separately. 3 and 6 include it."),
            q("mn-q7", "A Kids Meal is not a small tenders. It is:", ["5 tenders, slaw, and a drink", "Double tenders and large tots", "3 buttermilk fried tenders, tater tots, and ketchup packets", "3 tenders and a side of pimento cheese"], 2, "Three tenders, tots, ketchup."),
            q("mn-q8", "Rocky’s is which build?", ["3 tenders plus 1 drum and 1 thigh or 2 wings, and one Rocky’s mini", "3 tenders, two minis, no dark meat", "A sandwich plus one Rocky’s mini", "7 tenders and two minis"], 0, "3 tenders, dark meat or 2 wings, one mini."),
            q("mn-q9", "A Family Meal is easy to underbuild. The guide includes:", ["Single tenders and two sauces", "The Snack Box, plus drinks", "40 tenders only", "Double tenders, 3 drums and 3 thighs or 6 wings, five sauces, four muffins with honey butter, and large tots"], 3, "Double tenders, dark meat or 6 wings, five sauces, four muffins, large tots."),
            q("mn-q10", "Snack Box, serves 4, goes out in a pizza box. Inside is:", ["4 sliders, 4 mini cornbread with honey butter, double tenders, regular tots, and 3 sauces", "A family meal and four drinks", "12 wings and no sauce", "Four kids meals"], 0, "4 sliders, 4 minis, double tenders, regular tots, 3 sauces."),
            q("mn-q11", "Potato salad and pimento cheese. Which sizes are real?", ["2 oz and 16 oz", "5.5 oz and 8 oz for both", "Potato salad only, one size", "One 5.5 oz pickle cup, sold as either"], 1, "Both come in 5.5 oz and 8 oz."),
            q("mn-q12", "Regular tater tots, not the Nashville tots, are:", ["Tossed in Nashville spice", "Unsalted, so the guest salts them", "Crispy and lightly salted", "Finished with maple syrup"], 2, "Crispy and lightly salted. Nashville spice is the other order."),
            q("mn-q13", "Which drink setup matches the guide?", ["Fountain only", "8 oz cans, and only Coke bottles", "12 oz cans, and Hank’s or Maine Root bottles", "Glass growlers"], 2, "12 oz cans, plus Hank’s or Maine Root bottles."),
            q("mn-q14", "A cashier offers “honey on the side” out loud on every ticket. That is:", ["The spoken default", "Wrong. Honey on the side is a Toast option. Honey is packed separately, not put on the chicken.", "The same offer as Sweet Heat", "Fine, because the chicken is already drizzled"], 1, "POS only. Not the spoken default, and not a drizzle."),
          ],
        },
      ],
    },
  ],
};
