import { q } from "../q";
import type { Course } from "../types";

export const foodSafetyCourse: Course = {
  id: "lh-safety",
  title: "Food safety",
  blurb:
    "Baseline for new managers before the ten-day corporate course. Not a cook-along, and not the ServSafe exam.",
  audience: "Manager",
  modules: [
    {
      id: "lh-safety-cert",
      title: "Certification and illness",
      lessons: [
        {
          id: "lh-safety-who",
          title: "Who must be certified",
          minutes: 5,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Read this before the ten-day corporate course. You will teach hourly staff later. It is not a cook-along. It is not the certification exam.",
            },
            {
              type: "p",
              text: "ServSafe Manager Certification is required for owner/operators and managers. At least one person with that manager certification must be present whenever the restaurant is open. This course does not replace that certification.",
            },
            {
              type: "p",
              text: "A possible foodborne-illness complaint is a manager job. Hourly staff stop and get you. They do not handle it.",
            },
            {
              type: "list",
              items: [
                "Document it.",
                "Do not admit fault.",
                "Do not speculate.",
                "Follow up in 24 hours.",
                "Isolate the food.",
                "File the report and notify headquarters immediately.",
              ],
            },
            {
              type: "warn",
              title: "Do not admit fault",
              text: "Only a manager takes the complaint. Saying the food caused the illness is not your line, and it is not the cashier's line.",
            },
          ],
        },
      ],
    },
    {
      id: "lh-safety-line",
      title: "Raw chicken and the fryer",
      lessons: [
        {
          id: "lh-safety-chicken",
          title: "Raw chicken, hands, and the fryer",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Someone who is vomiting, has diarrhea, or is too sick to handle food stays off food. That includes chicken, buns, sauces, and the line. Stop and get a manager.",
            },
            {
              type: "p",
              text: "Wash hands before food work, after the restroom, after raw chicken, and whenever hands are dirty. Soap and water on the palms, the backs, between the fingers, and under the nails. Dry with a clean towel.",
            },
            {
              type: "p",
              text: "A cut on a hand that will touch food gets an impermeable bandage, then a glove. The bandage alone is not enough.",
            },
            {
              type: "list",
              items: [
                "Change gloves when they tear.",
                "Change gloves after raw chicken, before ready-to-eat food.",
                "Ready-to-eat here means buns, pickles, slaw, sauce, and chicken that is already cooked.",
                "A glove that touched raw chicken does not build the sandwich.",
              ],
            },
            {
              type: "p",
              text: "Keep raw chicken separate from ready-to-eat food. Use a separate surface. Do not let raw juice run onto a board, a pan, or a counter that will hold a finished sandwich.",
            },
            {
              type: "warn",
              title: "Do not spray raw chicken",
              text: "Do not rinse raw chicken in a way that sprays. The splash carries raw juice onto the sink, the handles, and food nearby.",
            },
            {
              type: "p",
              text: "Coolers hold cold food cold. Hot holding stays hot. This course does not give you a temperature to post. Do not invent one, and do not borrow a fryer number from another kitchen.",
            },
            {
              type: "steps",
              items: [
                "Sift the dredge.",
                "Do not overcrowd the frying basket.",
                "Those are line standards, not a fry chart. No time, weight, or temperature is added here.",
              ],
            },
            {
              type: "p",
              text: "Tots are fried in the same oil as the chicken. Wheat from the breading can ride that oil. Do not treat the shared fryer as a separate gluten-free fryer.",
            },
            {
              type: "tip",
              title: "Stop and get a manager",
              text: "Call a manager when someone sick is on food, when a guest says the food made them ill, when raw chicken has touched ready-to-eat food, when you cannot replace a torn glove, or when a guest names an allergy and you are not sure.",
            },
          ],
        },
      ],
    },
    {
      id: "lh-safety-menu",
      title: "Allergens on the sandwiches",
      lessons: [
        {
          id: "lh-safety-sandwiches",
          title: "Allergens on the sandwiches",
          minutes: 5,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "The OG Fried Chicken Sandwich, the Nashville Fried Chicken Sandwich, and the sliders are wheat, dairy, eggs, and soy. Fried chicken is wheat and dairy. Sandwiches and sliders add eggs and soy.",
            },
            {
              type: "list",
              items: [
                "BBQ sauce is fish, from the anchovy in Worcestershire. A fish allergy means BBQ is not clear.",
                "Tots are N/A as a product. They are still fried in the same oil as the chicken. After that fryer, do not call them free of wheat.",
              ],
            },
            {
              type: "p",
              text: "Cross-contact is the shared oil, a basket, a tong, or a glove that just touched breaded chicken. If you are not sure what a guest can eat, stop and get a manager. Do not guess that it is fine.",
            },
            {
              type: "tip",
              title: "Still not the exam",
              text: "ServSafe Manager Certification is still required. Finishing this lesson does not certify anyone.",
            },
          ],
        },
        {
          id: "lh-safety-quiz",
          title: "Food safety check",
          minutes: 6,
          kind: "quiz",
          pass: 83,
          blocks: [
            {
              type: "p",
              text: "Twelve questions. You need 10 of 12. This is not the ServSafe exam.",
            },
          ],
          questions: [
            q(
              "fs-q1",
              "Who must hold ServSafe Manager Certification, and what is this course?",
              [
                "Owner/operators and managers. This course does not replace that certification.",
                "Hourly fry cooks only. This course is the certification.",
                "Only the owner. A manager can skip it once this course is finished.",
                "Nobody, once the ten-day corporate course is on the calendar.",
              ],
              0,
              "ServSafe Manager Certification is required. This course does not replace it.",
            ),
            q(
              "fs-q2",
              "The restaurant is open. Which coverage is the rule?",
              [
                "A certified manager is required only on Fridays.",
                "The certificate can sit in a binder. Nobody with it has to be in the building.",
                "At least one person with manager certification must always be present.",
                "Any hourly lead counts, certified or not.",
              ],
              2,
              "At least one person with manager certification is present while the restaurant is open.",
            ),
            q(
              "fs-q3",
              "A guest tells a cashier the sandwich made them sick yesterday. The cashier should:",
              [
                "Apologize and say the chicken was the cause.",
                "Stop and get a manager. Only a manager handles it, documents it, and does not admit fault.",
                "Offer a free sandwich and end the conversation.",
                "Argue that the guest is wrong.",
              ],
              1,
              "Managers only. Document it. Do not admit fault and do not speculate. Follow up in 24 hours, isolate the food, file the report, and notify headquarters.",
            ),
            q(
              "fs-q4",
              "A cook on chicken is vomiting and has diarrhea. You:",
              [
                "Let them bread chicken if they wear gloves.",
                "Move them to buns only.",
                "Keep them on the fryer and shorten the shift.",
                "They stay off food. Get a manager and take them off the line.",
              ],
              3,
              "Sick people do not handle food. Stop and get a manager.",
            ),
            q(
              "fs-q5",
              "A cook has a cut on the hand they use for chicken. Before they touch food:",
              [
                "Cover the cut with an impermeable bandage, then a glove.",
                "A glove is enough. Skip the bandage.",
                "A cloth wrap is enough if it stays dry.",
                "Leave the cut open so it can air out under the glove.",
              ],
              0,
              "Impermeable bandage, then a glove. A bandage alone on a food hand is not enough.",
            ),
            q(
              "fs-q6",
              "Gloves just touched raw chicken, or a glove tears. Next is:",
              [
                "Keep going. Raw-chicken gloves are fine on the bun.",
                "Rinse the gloves and continue.",
                "Change gloves when they tear, and after raw chicken, before ready-to-eat food.",
                "Wipe them on a towel and build the sandwich.",
              ],
              2,
              "Change gloves when they tear and after raw chicken, before buns, pickles, slaw, sauce, or cooked chicken.",
            ),
            q(
              "fs-q7",
              "Raw chicken and a finished sandwich. The safe habit is:",
              [
                "Set the raw tray on the bun board if you move fast.",
                "Keep raw chicken separate from ready-to-eat food.",
                "Use one board for both if you wipe it with a dry towel.",
                "Stack cooked chicken under the raw pan to save space.",
              ],
              1,
              "Raw chicken stays away from food that will not be cooked again.",
            ),
            q(
              "fs-q8",
              "A cook wants to rinse raw chicken in the prep sink. You say:",
              [
                "Rinse hard so the spray reaches the backsplash. That cleans it.",
                "Rinse it over the ready-to-eat pans so the water has somewhere to go.",
                "Rinse only if most of the spray stays on the chicken.",
                "Do not rinse raw chicken in a way that sprays. Raw juice travels.",
              ],
              3,
              "A spray from raw chicken lands on the sink, the faucet, and food nearby.",
            ),
            q(
              "fs-q9",
              "Which fryer habit matches the standard, without inventing a chart?",
              [
                "Sift the dredge. Do not overcrowd the frying basket. Do not add a temperature this course did not give you.",
                "Pack the basket until the oil stops moving.",
                "Skip the sift when the dredge looks clumpy.",
                "Post a fryer temperature from another kitchen.",
              ],
              0,
              "Sift the dredge and do not overcrowd the basket. No fryer temperature is stated here.",
            ),
            q(
              "fs-q10",
              "Coolers and hot holding. What do you teach, with no new number?",
              [
                "Cold food can sit out if the lid is on.",
                "Coolers hold cold food cold. Hot holding stays hot. Do not invent a temperature for this course.",
                "Hot holding can cool off if the chicken was just fried.",
                "A number remembered from another job is now the rule here.",
              ],
              1,
              "Cold stays cold. Hot stays hot. This course does not add a temperature.",
            ),
            q(
              "fs-q11",
              "OG chicken sandwich, Nashville sandwich, and the sliders. The allergen set is:",
              [
                "Wheat only.",
                "Wheat, dairy, eggs, and soy.",
                "Peanuts and shellfish.",
                "Eggs only, because of the bun.",
              ],
              1,
              "Fried chicken is wheat and dairy. Sandwiches and sliders add eggs and soy.",
            ),
            q(
              "fs-q12",
              "Tots and BBQ. Which pair is right?",
              [
                "Tots use a separate gluten-free fryer. BBQ has no fish.",
                "Tots are wheat in the bag. BBQ is peanuts.",
                "Tots share the chicken fryer. BBQ is fish, from the anchovy in Worcestershire.",
                "Tots are clear of wheat after the shared fryer, and BBQ is dairy only.",
              ],
              2,
              "Same oil as the chicken, so the fryer is not gluten-free. BBQ brings anchovy, which is fish.",
            ),
          ],
        },
      ],
    },
  ],
};
