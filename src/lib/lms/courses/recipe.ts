import { q } from "../q";
import type { Course } from "../types";

export const recipeCourse: Course = {
  id: "lh-recipe",
  title: "Recipe book",
  blurb: "The September 2026 kitchen packet. Weights and brand callouts are not optional. Do not copy recipes off property.",
  audience: "Crew",
  modules: [
    {
      id: "lh-recipe-base",
      title: "Weights, brine, dredge",
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
                "Passing the quiz is 12 of 14.",
                "Questions go to your trainer.",
                "Results go to training leadership.",
              ],
            },
            {
              type: "warn",
              title: "Salt and bowls",
              text: "Sysco kosher salt is required for brine and dredge. Crystal size is part of the formula.",
            },
            {
              type: "list",
              items: [
                "Pulse dredge salt 10 to 15 seconds before you weigh it.",
                "Do not weigh dredge flour in the mixing bowl.",
                "Use a 2-gallon Cambro.",
                "Two batches of 3,972 g is 7,944 g of AP flour.",
              ],
            },
            {
              type: "p",
              text: "Butter is not one method. Match the recipe.",
            },
            {
              type: "list",
              items: [
                "Honey butter is softened, not melted. Overnight on a clean tray, or microwave 2 lb at a time for 2 minutes on #7.",
                "Cookie butter is 75% melted, not hot.",
                "Cornbread butter is melted and cooled to room temperature.",
                "Never add hot butter to wet ingredients.",
              ],
            },
          ],
        },
        {
          id: "lh-recipe-brine",
          title: "Brine and dredge",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Fried chicken brine. Dissolve completely. Hold in an 18 qt Cambro in the refrigerator.",
            },
            {
              type: "list",
              items: ["1,050 g Sysco kosher salt.", "850 g dark brown sugar.", "4 gallons very hot water."],
            },
            {
              type: "p",
              text: "Dredge, after the salt is pulsed.",
            },
            {
              type: "list",
              items: [
                "Pulsed Sysco kosher salt — 228 g.",
                "Granulated garlic — 340 g.",
                "Granulated onion — 304 g.",
                "Spanish paprika, never smoked — 104 g.",
                "Celery seed — 52 g.",
                "Café black pepper — 58 g.",
                "AP flour — 7,944 g.",
              ],
            },
            {
              type: "list",
              items: [
                "Whisk the spice into the flour, then finish with gloved hands, before it goes in the dredge bin.",
                "Spanish paprika in the dredge and in Nashville spice is never smoked.",
                "The BBQ spice mix uses both Spanish paprika and McCormick smoked paprika.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "lh-recipe-line",
      title: "The fryer, the oven, the allergens",
      lessons: [
        {
          id: "lh-recipe-art",
          title: "Art of Fried Chicken and the fry chart",
          minutes: 7,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "list",
              items: [
                "Knock off excess flour and dredge. It saves oil and keeps the buttermilk from going thick.",
                "Sift. Keep the dredge full and light.",
                "Drain as much buttermilk as you can.",
                "Add water to the buttermilk when it thickens. Thick buttermilk makes a heavy crust.",
                "Toss gently. Do not press chicken into the dredge.",
                "Do not overcrowd. No bald spots. That is the cardinal sin.",
                "Cover wings with another basket, or flip them. Wings float.",
                "Wait about 2 minutes before you shake, so the crust sets.",
                "Shake gently. Golden brown and delicious.",
              ],
            },
            {
              type: "p",
              text: "350° fryer",
            },
            {
              type: "list",
              items: [
                "Tenders: 40 per basket, 6:30, timer 1.",
                "5 oz breast: 6 per basket, shingled skin side up, 7:30, timer 2.",
                "Slider breasts: 12, skin side up, 6:30, timer 4.",
                "Tots: half a bag, 4:30, timer 3.",
              ],
            },
            {
              type: "p",
              text: "330° fryer",
            },
            {
              type: "list",
              items: [
                "Tenders: 40, 9:00, timer 3.",
                "5 oz breast: 6, 9:00, timer 4.",
                "Slider breasts: 12, 9:00, timer 4.",
                "Whole wings: 15, 12:00, timer 2.",
                "Drums: 20, 15:00, timer 1.",
                "Thighs: 10, 15:00, timer 1.",
              ],
            },
          ],
        },
        {
          id: "lh-recipe-kits",
          title: "Scoops, kits, and allergens",
          minutes: 7,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Oven",
            },
            {
              type: "list",
              items: [
                "Cornbread at 350°: 12 minutes, turn, 12 minutes.",
                "Minis: 8 minutes, turn, 8 minutes.",
                "A #12 green scoop fills the cups about 75%.",
                "Store cookies: 175 g balls, 8 per tray, 10 minutes, bang the tray, 10 more.",
                "Catering cookies: 70 g, 7 minutes, bang, 7 more.",
                "Oreo crumbles go in after the dough is mixed.",
              ],
            },
            {
              type: "list",
              items: [
                "Green #12 — coleslaw, cornbread, banana pudding, whipped cream. Blue #16 is retired.",
                "Black #30 — honey butter, mini cornbread, the 48 oz pudding cap.",
                "Red #24 — sauces in 2 oz cups.",
                "Pimento kit: no cheddar in the kit. Add 4,125 g shredded cheddar when you mix.",
                "Ranch: buttermilk stays out of the kit. Blend the kit, then add buttermilk.",
                "Honey mustard: honey stays out of the fridge kit.",
                "Nashville oil: 1 gallon vegetable oil to 190°, kill the heat, stir in 290 g spice, cool before use.",
                "Honey Hot: 1 gallon honey plus 3 gallons Louisiana Supreme. Whisk or immersion blender. Not a countertop blender.",
              ],
            },
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
          minutes: 8,
          kind: "quiz",
          pass: 86,
          blocks: [
            {
              type: "p",
              text: "Fourteen questions from the September 2026 packet. You need 12 of 14.",
            },
          ],
          questions: [
            q("rc-q1", "Brine and dredge both call for salt. Which one, and why the brand matters?", ["Sysco kosher. Crystal size is part of the formula.", "Any kosher. The crystal size does not change the weight.", "Table salt, weighed the same.", "Smoked salt, for the crust."], 0, "Sysco kosher. A different crystal changes the batch."),
            q("rc-q2", "Dredge salt goes in the food processor. How long?", ["It is not pulsed. Weigh it whole.", "Until it looks like powdered sugar", "10 to 15 seconds, then weigh it", "A full minute so it disappears into the flour"], 2, "10 to 15 seconds. Then it hits the scale."),
            q("rc-q3", "You need 7,944 g of dredge flour. Where does that weight happen?", ["In the mixing bowl, then into the bin", "By the cup, two batches", "After it is already in the dredge bin", "In a 2-gallon Cambro. Two batches of 3,972 g."], 3, "The bowl will not fit on the scale. 3,972 g twice is 7,944 g."),
            q("rc-q4", "Which brine is fried chicken brine, not a shortcut?", ["Salt and cold water", "1,050 g Sysco kosher salt, 850 g dark brown sugar, 4 gallons very hot water", "Buttermilk and sugar", "Dredge spice stirred into water"], 1, "Dissolve it completely. Hold it cold in an 18 qt Cambro."),
            q("rc-q5", "The dredge calls for paprika. Someone grabs the smoked tin. That is:", ["Correct. Smoked is the dredge paprika.", "Fine. Spanish and smoked are interchangeable.", "Wrong for the dredge. Spanish only. Smoked belongs in the BBQ spice mix.", "Right if you leave paprika out of the BBQ mix"], 2, "Never smoked in the dredge. BBQ spice is the mix that also uses smoked."),
            q("rc-q6", "Which miss is the cardinal sin on the fryer?", ["Sifting the dredge again", "A bald spot", "Waiting about 2 minutes before the shake", "Using timer 1"], 1, "No bald spots. Waiting to shake is correct, not the sin."),
            q("rc-q7", "The basket just hit the oil. When do you shake?", ["After about 2 minutes, so the crust can set", "Immediately, so the pieces do not stick", "Only when the timer ends", "Never. Shaking blows the crust off."], 0, "An early shake knocks the crust off."),
            q("rc-q8", "350° fryer, tenders. Which card is that drop, not a different product?", ["15 per basket, 12:00", "40 per basket, 6:30", "6 per basket, 9:00", "Half a bag, 4:30"], 1, "40 tenders, 6:30, timer 1. 12:00 is wings. 4:30 is tots. 9:00 is the 330° breast."),
            q("rc-q9", "330° fryer, whole wings. Do not grab the drum card.", ["40 per basket, 6:30", "20 per basket, 15:00", "6 per basket, 7:30", "15 per basket, 12:00"], 3, "15 wings, 12 minutes, timer 2. 20 at 15:00 is drums."),
            q("rc-q10", "A full pan of cornbread at 350°. Minis are the shorter cycle.", ["8 minutes flat, no turn", "10 minutes, bang the tray, 10 more", "12 minutes, turn, 12 minutes", "Until the top cracks"], 2, "Full pan: 12, rotate, 12. Minis are 8 and 8. The bang is cookies."),
            q("rc-q11", "Honey butter is going together. The butter should be:", ["Softened, not melted", "Melted hot", "Brown butter", "Oil, if the butter is cold"], 0, "Softened. Melted butter breaks the mix."),
            q("rc-q12", "You need coleslaw, a cornbread cup, banana pudding, and whipped cream. Which scoop?", ["Red #24", "Black #30", "Green #12", "Blue #16"], 2, "Green #12. Blue #16 is retired. Black #30 is honey butter, minis, and the pudding cap. Red #24 is the 2 oz sauce cup."),
            q("rc-q13", "A guest asks if BBQ sauce is a problem for a fish allergy. You say:", ["No. It is gluten-free, so it is clear.", "No. The only allergen in it is dairy.", "Yes. It has peanuts.", "Yes. Worcestershire brings anchovy, which is fish."], 3, "Fish. Say so."),
            q("rc-q14", "Tots and gluten. Which statement is the careful one?", ["They contain wheat, so they are not gluten-free at all.", "The product is gluten-free, and they share fryer oil with the chicken.", "They are fried in a separate gluten-free fryer.", "They contain egg, which is the gluten issue."], 1, "Gluten-free as a product. Not gluten-free once they share the chicken fryer."),
          ],
        },
      ],
    },
  ],
};
