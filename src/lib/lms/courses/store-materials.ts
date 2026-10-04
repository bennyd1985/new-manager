import { q } from "../q";
import type { Course } from "../types";

export const storeMaterialsCourse: Course = {
  id: "lh-store",
  title: "Store materials",
  blurb:
    "The sheets a new manager is expected to hold people to before the ten-day corporate course. Not an hourly handout. Times and recipes stay on the sheet and in the September 2026 recipe book.",
  audience: "Manager",
  modules: [
    {
      id: "lh-store-sheets",
      title: "The sheets",
      lessons: [
        {
          id: "lh-store-fry",
          title: "Two fryers",
          minutes: 5,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "The store runs two fryers. They run at 330°F and 350°F.",
            },
            {
              type: "warn",
              title: "Dark meat is 330°F only",
              text: "Wings, drums, and thighs are fried only at 330°F. At 350°F the skin burns before the meat is fully cooked.",
            },
            {
              type: "p",
              text: "Everything else can be cooked at 350°F. Everything except tater tots can also be cooked at 330°F, with different cook times. Tater tots are not cooked at 330°F.",
            },
            {
              type: "p",
              text: "Cook times stay on the frying guidelines sheet. Do not memorize them from this course. The Art of Fried Chicken sheet is the look-and-standard, not a recipe to memorize here.",
            },
            {
              type: "list",
              items: [
                "No bald spots.",
                "Golden brown.",
                "Do not overcrowd the basket.",
                "Do not press the chicken into the dredge.",
              ],
            },
          ],
        },
        {
          id: "lh-store-brine",
          title: "Case to fryer",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Follow the Chicken SOP and the chicken brining cycle. The manager holds the cycle. The crew does not invent a shortcut.",
            },
            {
              type: "steps",
              items: [
                "Receive the case. Check the date on every case. Rotate FIFO before anything is opened.",
                "Best-by is the date on the case sticker. A package date is not the best-by. If a package sticker is what you have, add 16 days.",
                "Open one case at a time. Label the open date and the best-by.",
                "Brine 8 hours. Cover the chicken fully with cold brine. Record the start, and write when it comes out.",
                "Rinse. Move it to the holding container. Transfer the sticker. Hold in the chicken fridge. FIFO. Fry to spec.",
              ],
            },
            {
              type: "p",
              text: "Four Cambros at a time is the ideal on the SOP.",
            },
            {
              type: "warn",
              title: "The salt is not a swap",
              text: "Sysco kosher salt is the salt in the brine. Crystal size changes the recipe. The formula stays in the September 2026 recipe book. Do not paste it here, and do not guess a weight.",
            },
          ],
        },
        {
          id: "lh-store-open",
          title: "MOD opening and the temp log",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "The pre-open checklist is done before the doors open. Every line is required. You hold the list.",
            },
            {
              type: "list",
              items: [
                "POS terminals and KDS screens are on, logged in, and working.",
                "Delivery is live and accepting orders: DoorDash, Uber Eats, and Grubhub. Not DoorDash only. Not Toast delivery.",
                "The menu is accurate. Counts are updated. Out-of-stocks are marked. Modifiers are checked.",
                "The cash drawer is built. The starting bank is verified.",
                "The dining room and bathrooms are clean, stocked, and guest-ready.",
                "Baked goods are produced, cooled, and staged for service.",
                "The most critical prep is done.",
                "The exterior is presentable: parking lot, sidewalk, entrance, and signage.",
                "The opening team is present, and the stations are set for service.",
                "The initial temperature log is done, and equipment is in range.",
              ],
            },
            {
              type: "p",
              text: "The manager completes the posted temp log. Record what the thermometer says. Do not fill the log from memory.",
            },
            {
              type: "p",
              text: "Close includes the final temperature log, with equipment in range.",
            },
          ],
        },
        {
          id: "lh-store-stations",
          title: "Stations signed off",
          minutes: 4,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Assembly, cashier, and chicken stations are completed twice a day. A manager checks them by 10:45 AM and by 4:45 PM.",
            },
            {
              type: "p",
              text: "This is the sign-off. It is not the cashier script.",
            },
            {
              type: "list",
              items: [
                "Chicken station: fryers on at 10 AM.",
                "Hot box on at 10:30 AM.",
                "Toaster on at 10:45 AM.",
              ],
            },
            {
              type: "p",
              text: "The closing checklist is completed before lockup. A manager checks that one too.",
            },
          ],
        },
        {
          id: "lh-store-pack",
          title: "Pack-out",
          minutes: 4,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Everyday food and catering do not share a container. Hold the packaging guide. Do not guess a size.",
            },
            {
              type: "p",
              text: "The everyday menu uses the small, medium, and large boxes on that guide, plus the two-large and the family three-large. The basket is the one the guide names for that item. Small basket or large basket. Not a coin flip.",
            },
            {
              type: "list",
              items: [
                "Catering chicken goes in a pizza box, lined with four pieces of checkerboard paper. Some counts take two pizza boxes.",
                "Sliders go in slider domes.",
                "Mini cornbread goes in the white barn.",
                "A dozen cookies go in a 9×9 hinge container.",
                "Potato salad goes in a 32 oz deli container.",
                "Banana pudding goes in a 48 oz container.",
              ],
            },
          ],
        },
        {
          id: "lh-store-allergy",
          title: "Allergens you hold",
          minutes: 5,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Sandwich allergens are wheat, dairy, eggs, and soy. That is the OG sandwich, the Nashville sandwich, and the sliders. Do not add an allergen that is not on the sheet.",
            },
            {
              type: "list",
              items: [
                "Fryer oil is premium canola.",
                "Tater tots share the chicken fryer. Do not call it a separate fryer.",
                "BBQ sauce is fish, from the anchovy in Worcestershire.",
                "The chicken is certified halal. It is not Zabiha.",
              ],
            },
            {
              type: "warn",
              title: "A severe allergy goes to a manager",
              text: "Hourly staff stop and get you. Do not guess that a guest will be fine.",
            },
          ],
        },
        {
          id: "lh-store-prep",
          title: "Prep pars",
          minutes: 5,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Excel and Word store files are for a store to edit for its own needs. PDFs are the set standard. Formulas stay in the September 2026 recipe book. This lesson is the par. It is not a recipe.",
            },
            {
              type: "warn",
              title: "No 5 oz cups",
              text: "There are no 5 oz cups. A 5 oz line on the chicken station is a breast size, not a cup.",
            },
            {
              type: "list",
              items: [
                "Potato salad, 5.5 oz: par 30.",
                "Potato salad, 8 oz: par 15.",
                "Pimento, 5.5 oz: par 20.",
                "Pimento, 8 oz: par 2. Those cups are dated.",
                "Pickle cups, 5.5 oz: par 10. No pickle butts. Fill the cups halfway with pickle juice.",
              ],
            },
            {
              type: "p",
              text: "The pickle 1/3 pan has enough pickle juice to keep all the pickles moist. Make a new pimento batch when 20 cups are left.",
            },
          ],
        },
        {
          id: "lh-store-oil",
          title: "Oil and the boil-out",
          minutes: 5,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "The manager calls the oil change. The call is volume, quality, and SuperSorb. It is not a fixed calendar date.",
            },
            {
              type: "p",
              text: "A slow stretch does not get new oil just because a date landed. Test. Taste. Wait for the manager to call it. Write the date on the oil change log after every change.",
            },
            {
              type: "warn",
              title: "Monthly boil-out wins",
              text: "Boil out every fryer at least once a month. Write the name and date on the yearly tracker. Start a new sheet each year. A cleaning list that says every two months does not override that monthly minimum.",
            },
            {
              type: "p",
              text: "Sysco customer care is the first call: 1-800-797-2627, customer@sysco.com. The Who to Contact sheet lists Central hours: weekdays 6 AM to 10 PM, Saturday 7 AM to 8 PM, Sunday 9 AM to 10 PM.",
            },
          ],
        },
        {
          id: "lh-store-quiz",
          title: "Store materials check",
          minutes: 8,
          kind: "quiz",
          pass: 83,
          blocks: [
            {
              type: "p",
              text: "Twelve questions. You need 10 of 12.",
            },
          ],
          questions: [
            q(
              "sm-q1",
              "Wings, drums, and thighs. Which fryer standard do you hold?",
              [
                "Dark meat is fried only at 330°F. At 350°F the skin burns before the meat is fully cooked.",
                "Dark meat is fried only at 350°F so the skin colors first.",
                "Dark meat can use either fryer. The color is the only check.",
                "Dark meat waits for a third fryer.",
              ],
              0,
              "Dark meat is fried only at 330°F, because at 350°F the skin burns before the meat is fully cooked.",
            ),
            q(
              "sm-q2",
              "Tater tots and the two fryer temperatures. Which line is right?",
              [
                "Tots are cooked at 330°F. Chicken is cooked only at 350°F.",
                "Everything, including tots, is cooked at both temperatures with the same time.",
                "Tots are not cooked at 330°F. Everything else can be cooked at 350°F. Everything except tots can also be cooked at 330°F.",
                "Pick a temperature from another kitchen and keep it.",
              ],
              2,
              "Tater tots are not cooked at 330°F, and the other foods can be cooked at 350°F.",
            ),
            q(
              "sm-q3",
              "Where do cook times live, and what is the Art of Fried Chicken sheet?",
              [
                "Memorize the times in this course. The Art sheet is a timer recipe.",
                "Times stay on the frying guidelines sheet. The Art of Fried Chicken sheet is the look-and-standard, not a recipe to memorize here.",
                "The Art sheet replaces the frying guidelines.",
                "Ignore both sheets if the color looks close.",
              ],
              1,
              "Cook times stay on the frying guidelines sheet, and the Art sheet is the look, not a recipe to memorize here.",
            ),
            q(
              "sm-q4",
              "Case to fryer. Which standard do you hold?",
              [
                "Any salt is fine. Brine when the rush allows. Dates are optional.",
                "Follow the Chicken SOP and the brining cycle. Brine is 8 hours, fully covered. The salt is Sysco kosher salt. The formula stays in the September 2026 recipe book.",
                "Skip the sticker and freeze whatever is closest to the date.",
                "Brine overnight with no recorded start time.",
              ],
              1,
              "The SOP brine is 8 hours and fully covered, and Sysco kosher salt is the salt because crystal size changes the recipe.",
            ),
            q(
              "sm-q5",
              "Before the doors open, which delivery platforms must be live?",
              [
                "DoorDash only.",
                "Toast delivery.",
                "Whichever app was left on from yesterday.",
                "DoorDash, Uber Eats, and Grubhub.",
              ],
              3,
              "Approved delivery is DoorDash, Uber Eats, and Grubhub, not DoorDash only and not Toast delivery.",
            ),
            q(
              "sm-q6",
              "The temp log. What do you hold?",
              [
                "Skip it if the equipment feels cold.",
                "Copy yesterday’s column into today.",
                "The manager completes the posted temp log from the thermometer, not from memory.",
                "A cashier completes it once a week from memory.",
              ],
              2,
              "The manager completes the posted temp log from the thermometer, not from memory.",
            ),
            q(
              "sm-q7",
              "Assembly, cashier, and chicken stations. When are they checked?",
              [
                "Once a week, if the rush was light.",
                "By a manager at 10:45 AM and at 4:45 PM.",
                "Only at close. Midday sign-off is optional.",
                "Whenever the cashier script is finished.",
              ],
              1,
              "Those stations are checked by the manager by 10:45 AM and by 4:45 PM.",
            ),
            q(
              "sm-q8",
              "Pack-out. Which standard is the one on the guide?",
              [
                "Everyday boxes and catering containers are the same pizza box.",
                "Everyday menu uses the boxes and baskets on the packaging guide. Catering uses the catering containers: pizza box, slider dome, white barn, 9×9 hinge, 32 oz deli, and 48 oz.",
                "Guess a box if the guide is in the office.",
                "Catering always goes in a small basket.",
              ],
              1,
              "Everyday boxes and catering containers are different, and the packaging guide is the standard.",
            ),
            q(
              "sm-q9",
              "A guest names a severe allergy. Which set do you hold?",
              [
                "Sandwiches are wheat, dairy, eggs, and soy. Tots share the chicken fryer. BBQ is fish, from anchovy. The oil is canola. The chicken is certified halal, not Zabiha. A severe allergy goes to a manager.",
                "Sandwiches are peanuts. Tots have their own fryer. BBQ is dairy. The claim is Zabiha.",
                "Sandwiches are wheat only. BBQ is clear for a fish allergy. The cashier clears a severe allergy.",
                "Any sauce is fine if the chicken is halal.",
              ],
              0,
              "Sandwiches are wheat, dairy, eggs, and soy, tots share the chicken fryer, BBQ is fish from anchovy, the oil is canola, the chicken is certified halal not Zabiha, and a severe allergy goes to a manager.",
            ),
            q(
              "sm-q10",
              "Cup pars. Which lock is right?",
              [
                "5 oz cups are the standard. Potato salad is a 5 oz par of 30.",
                "There are no 5 oz cups. Potato salad is 5.5 oz par 30 and 8 oz par 15. Pimento is 5.5 oz par 20 and 8 oz par 2, dated. Pickle cups are 5.5 oz par 10, no butts, filled halfway with pickle juice. A new pimento batch starts when 20 cups are left.",
                "Pimento 8 oz is par 20, and those cups are not dated.",
                "Pickle cups are filled to the top, butts included.",
              ],
              1,
              "There are no 5 oz cups, those pars are the lock, and a new pimento batch starts when 20 cups are left.",
            ),
            q(
              "sm-q11",
              "Oil and the boil-out. What do you hold?",
              [
                "Change the oil on a fixed calendar date. Boil out every two months, because a cleaning list says so.",
                "The manager calls the oil change from volume, quality, and SuperSorb, not a date. Boil out at least monthly. That monthly minimum overrides a cleaning list that says every two months.",
                "Boil out only when the year is over. Skip the tracker.",
                "Change the oil every slow day, and skip SuperSorb.",
              ],
              1,
              "The manager calls the oil from volume, quality, and SuperSorb, and a monthly boil-out overrides a cleaning list that says every two months.",
            ),
            q(
              "sm-q12",
              "A credit, a missing item, or product help. The first call is:",
              [
                "Whoever is written on the building list that morning.",
                "The account manager, before customer care.",
                "Sysco customer care: 1-800-797-2627, customer@sysco.com.",
                "A vendor remembered from another brand.",
              ],
              2,
              "Sysco customer care is the first call, at 1-800-797-2627 or customer@sysco.com.",
            ),
          ],
        },
      ],
    },
  ],
};
