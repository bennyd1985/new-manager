import { q } from "../q";
import type { Course } from "../types";

export const cogsCourse: Course = {
  id: "lh-cogs",
  title: "Food and packaging cost (COGS)",
  blurb:
    "What cost of goods sold is, how it is counted, and the standards a new manager holds the team to before the ten-day corporate course. Not an hourly handout. No station how-to.",
  audience: "Manager",
  modules: [
    {
      id: "lh-cogs-basics",
      title: "What COGS is",
      lessons: [
        {
          id: "lh-cogs-what",
          title: "Food plus packaging",
          minutes: 5,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "COGS is cost of goods sold. At Love & Honey it is everything involved with the food: the food itself, plus the boxes it goes out in, the containers for sauces and sides, and napkins.",
            },
            {
              type: "p",
              text: "COGS is not labor. Wages, payroll taxes, and overtime are labor cost. Rent, utilities, and repairs are other operating costs. They matter, but they are not in this number.",
            },
            {
              type: "warn",
              title: "Cleaning items are not COGS",
              text: "Chemicals, gloves, and paper towels are not in COGS. They are operating supplies. Napkins go out with the food, so they count. Paper towels at the hand sink do not.",
            },
            {
              type: "p",
              text: "COGS is the cost you touch every shift: what you order, what you receive, what you prep, what you portion, and what you throw away. That is why it is a manager number.",
            },
            {
              type: "p",
              text: "Love & Honey’s target COGS is 30% of net food sales.",
            },
            {
              type: "tip",
              title: "Cost never jumps the line",
              text: "The Pyramid of Success puts Financial Fundamentals above people, readiness, service, and product. You protect cost by running the standard, not by cutting it.",
            },
          ],
        },
        {
          id: "lh-cogs-math",
          title: "The math",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Beginning inventory + purchases − ending inventory = COGS.",
            },
            {
              type: "steps",
              items: [
                "Beginning inventory: what was on hand at the last count. It is last month’s ending inventory.",
                "Plus purchases: everything that came in since that count, from the invoices.",
                "Minus ending inventory: what is on hand at this count.",
                "Equals COGS: what was used, sold, wasted, or lost.",
              ],
            },
            {
              type: "p",
              text: "COGS % = COGS ÷ net food sales. Net food sales is sales after discounts and comps. Tax and tips are not sales.",
            },
            {
              type: "p",
              text: "Example only, with round numbers: beginning inventory $5,000. Purchases $12,000. Ending inventory $4,000. COGS is $5,000 + $12,000 − $4,000 = $13,000. Net food sales are $40,000. COGS % is $13,000 ÷ $40,000 = 32.5%.",
            },
            {
              type: "p",
              text: "The target is 30%. That example store is 2.5 points over. On $40,000 in sales, every point is $400, so 2.5 points is $1,000 of food and packaging that did not have to leave the building.",
            },
            {
              type: "warn",
              title: "Ending inventory moves the whole number",
              text: "Ending inventory is subtracted. Miss a case in the count and COGS goes up by that case. Count a case twice and COGS looks better than it is. A bad count gives a bad number either way.",
            },
          ],
        },
      ],
    },
    {
      id: "lh-cogs-in",
      title: "Counting and receiving",
      lessons: [
        {
          id: "lh-cogs-count",
          title: "The monthly count",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Stores take inventory once a month, ideally as soon as the month ends. The count is half of the COGS math, so it gets the same care as a cash count.",
            },
            {
              type: "list",
              items: [
                "Same units every count. Count in the unit the inventory sheet names. A case is a case. Do not switch units from one month to the next.",
                "Count everything. Walk-in, reach-ins, freezer, dry storage, the line, and the boxes, sauce and side containers, and napkins. Product on the line is still inventory.",
                "Same schedule. Once a month, ideally as soon as the month ends, so each count closes out that month.",
                "No estimating. Open it and count it. A guess is not a count.",
                "Every invoice for product in the building is in purchases for that period. A case in the count with no invoice makes COGS look lower than it is.",
              ],
            },
            {
              type: "p",
              text: "Toast tells you what sold. The count tells you what is left. You need both to know what it cost.",
            },
          ],
        },
        {
          id: "lh-cogs-receive",
          title: "Receiving the truck",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Sysco is the main broadline distributor. Receiving is where money walks in the back door. What you sign for is what you pay for.",
            },
            {
              type: "steps",
              items: [
                "Check the delivery against the invoice, line by line, before you sign.",
                "Count cases. Ten on the invoice means ten in the building.",
                "Shorts: anything on the invoice that did not come off the truck.",
                "Substitutions: a different item, brand, or pack size than what was ordered. Core product comes from the Vendor list. Do not accept a substitute for core product that is not approved.",
                "Prices: check them against what you expected. A price change gets flagged, not just signed.",
                "Write any short, substitution, or price issue on the invoice before you sign.",
                "Then request the credit. For a Sysco credit, call Sysco’s customer service line, listed on the Sysco Who to Contact sheet, for anything short, refused, or mispriced.",
                "Put product away right away. FIFO: new product goes behind old.",
              ],
            },
            {
              type: "warn",
              title: "A signature is a promise to pay",
              text: "Sign for ten cases and you pay for ten cases. Catch it at the door, not at the end of the month.",
            },
          ],
        },
      ],
    },
    {
      id: "lh-cogs-hold",
      title: "Holding the standard",
      lessons: [
        {
          id: "lh-cogs-drivers",
          title: "What drives COGS up",
          minutes: 5,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "list",
              items: [
                "Waste: food made and thrown out.",
                "Overproduction: prepping more than the par calls for.",
                "Spoilage and FIFO failures: old product stuck behind new, dates missed.",
                "Unrecorded comps and voids: food that leaves with no ticket, or a void with no reason.",
                "Theft: product or food out the door without a sale.",
                "Over-portioning: a little extra on every order adds up over a month.",
                "Incorrect receiving: paying for shorts, wrong items, or wrong prices.",
                "Vendor price increases: the same food at a higher cost.",
              ],
            },
            {
              type: "p",
              text: "Most of these are shift habits. You see the habits on the floor before the monthly number shows them.",
            },
            {
              type: "p",
              text: "Every comp and every void is rung in Toast with a reason. A comp for a guest recovery is part of the job. A free meal nobody rang is cost with no record.",
            },
          ],
        },
        {
          id: "lh-cogs-waste",
          title: "The waste log",
          minutes: 4,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Every waste item gets logged. Dropped tenders, a burnt batch, an expired case, a wrong order remade. If it goes in the trash, it goes on the log. The waste log is an Excel file on Playbook Builder, in the Appendix.",
            },
            {
              type: "list",
              items: [
                "Log the item, the amount, and the reason.",
                "Log it when it happens, not at close from memory.",
                "Make logging safe. A team that is afraid to log waste hides it, and hidden waste cannot be fixed.",
              ],
            },
            {
              type: "p",
              text: "The waste log is how you explain COGS. Without it, the count only says money is missing. With it, you can see what, when, and why. Look for the same item, the same shift, or the same reason. That points to the fix: a par, a training gap, or a holding problem.",
            },
          ],
        },
        {
          id: "lh-cogs-portion",
          title: "Exact portions and the right par",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Love & Honey is a premium brand. The standard portion is the cost standard and the brand standard at the same time.",
            },
            {
              type: "list",
              items: [
                "Over-portioning gives food away.",
                "Under-portioning shorts the guest. It is not acceptable here, even when cost is running high.",
                "The goal is the exact standard portion, every time.",
              ],
            },
            {
              type: "warn",
              title: "Never short the guest to save cost",
              text: "If COGS is high, find the waste, the shorts, and the missing tickets. Do not take it out of the guest’s order.",
            },
            {
              type: "p",
              text: "Portion specs are on the store sheets and taught at corporate. Your job here is to hold the line to them and watch for drift in either direction.",
            },
            {
              type: "p",
              text: "Count first, then prep the gap to the daily par. Too much wastes money. Too little creates a fire drill.",
            },
            {
              type: "p",
              text: "Pars are up to each store, based on its own sales. Use Toast sales history to see the trend: the day of the week, the weather, a local event, a catering order. If the same item is thrown out at close again and again, or runs out at the same hour, the par no longer fits the store’s sales. Adjust it to match the trend.",
            },
          ],
        },
        {
          id: "lh-cogs-read",
          title: "Reading the result",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "After each monthly count, compare COGS % to the 30% target. Close to target means the system is working. Over target means something is leaking. Compare it to last month too. A sudden jump means something changed.",
            },
            {
              type: "p",
              text: "Well under target is not automatically good news. It can mean a counting mistake, a missing invoice, or portions running short. Check it the same way.",
            },
            {
              type: "steps",
              items: [
                "Check the count and the math first. Were all invoices in purchases? Was the ending count complete, in the right units, with nothing estimated?",
                "Check receiving: shorts signed for, credits never received, substitutions, and price increases on the invoices.",
                "Check the waste log. What was thrown out, and why?",
                "Check comps and voids in Toast. Every one should have a reason.",
                "Check pars against sales. Was the line prepping more than it sold?",
                "Watch portions on the line, and watch dates and FIFO in the walk-in.",
                "Loss that none of that explains can be theft. Alert your franchisee.",
              ],
            },
            {
              type: "tip",
              title: "Fix the habit, not the number",
              text: "The goal is not to make one month look good. It is to find the habit that is leaking cost and fix it on the next shift.",
            },
          ],
        },
        {
          id: "lh-cogs-quiz",
          title: "Food and packaging cost check",
          minutes: 8,
          kind: "quiz",
          pass: 83,
          blocks: [
            {
              type: "p",
              text: "Twelve questions. You need 10 of 12. The dollar figures in the math questions are examples only.",
            },
          ],
          questions: [
            q(
              "cg-q1",
              "Which of these counts toward COGS?",
              [
                "The gloves the line wears.",
                "The boxes, sauce and side containers, and napkins that go out with the food.",
                "Sanitizer and other cleaning chemicals.",
                "Paper towels at the hand sink.",
              ],
              1,
              "COGS is the food plus what goes out with it: boxes, sauce and side containers, and napkins. Chemicals, gloves, and paper towels are operating supplies.",
            ),
            q(
              "cg-q2",
              "Example only: beginning inventory $6,000, purchases $10,000, ending inventory $4,000. What is COGS?",
              ["$20,000", "$16,000", "$12,000", "$8,000"],
              2,
              "$6,000 + $10,000 − $4,000 = $12,000.",
            ),
            q(
              "cg-q3",
              "Example only: COGS is $9,000 and net food sales are $30,000. What is COGS %, and how does it compare to Love & Honey’s target?",
              [
                "30%. On the 30% target.",
                "33%. Over the 30% target.",
                "27%. Under the 30% target.",
                "3%. Far under the 30% target.",
              ],
              0,
              "$9,000 ÷ $30,000 = 30%. The target is 30%.",
            ),
            q(
              "cg-q4",
              "Example only: beginning inventory $4,000, purchases $11,000, ending inventory $2,000, net food sales $40,000. Which is right?",
              [
                "COGS is $9,000. COGS % is 22.5%, under target.",
                "COGS is $12,000. COGS % is 30%, on target.",
                "COGS is $15,000. COGS % is 37.5%, over target.",
                "COGS is $13,000. COGS % is 32.5%, over the 30% target. Investigate.",
              ],
              3,
              "$4,000 + $11,000 − $2,000 = $13,000. $13,000 ÷ $40,000 = 32.5%, which is over 30%.",
            ),
            q(
              "cg-q5",
              "How do Love & Honey stores take inventory?",
              [
                "Once a month, ideally as soon as the month ends, in the same units every time, counting everything, with no estimating.",
                "Whenever the walk-in looks low, estimating the partial cases.",
                "Once a year, counting only the chicken.",
                "Once a month, but the line and the boxes and containers can be skipped.",
              ],
              0,
              "Once a month, ideally as soon as the month ends. Same units, everything counted, no guessing.",
            ),
            q(
              "cg-q6",
              "The Sysco invoice shows 10 cases of an item. 9 came off the truck. You:",
              [
                "Sign for 10. It will even out next week.",
                "Write the short on the invoice before you sign, then call the Sysco customer service line on the Sysco Who to Contact sheet to request a credit for the missing case.",
                "Refuse the whole delivery.",
                "Sign for 10 and order an extra case next time.",
              ],
              1,
              "What you sign for is what you pay for. Note the short on the invoice, then call Sysco customer service, from the Who to Contact sheet, for the credit.",
            ),
            q(
              "cg-q7",
              "The Sysco truck brings a different brand of a core product than what was ordered, and it is not approved. You:",
              [
                "Take it. Close enough is fine on a busy day.",
                "Take it and keep it off the invoice.",
                "Do not accept it. Core product comes from the Vendor list. Note it on the invoice before you sign, then call Sysco customer service, from the Who to Contact sheet, for the credit.",
                "Take it and change the recipe to match.",
              ],
              2,
              "Catch substitutions at the door. Do not freelance core product.",
            ),
            q(
              "cg-q8",
              "A cook drops a basket of tenders on the floor and throws them out. What happens next?",
              [
                "Nothing. It is only one basket.",
                "Log it at close if you remember.",
                "Leave it off so the shift looks good.",
                "Log the item, the amount, and the reason now. Every waste item gets logged.",
              ],
              3,
              "If it goes in the trash, it goes on the log, when it happens.",
            ),
            q(
              "cg-q9",
              "COGS is running high. A shift lead starts going light on portions to help. You:",
              [
                "Stop it. The exact standard portion every time. Under-portioning is not acceptable, and you find the real leak instead.",
                "Allow it until the number comes back down.",
                "Allow it on delivery orders only.",
                "Allow it if nobody complains.",
              ],
              0,
              "The standard portion is the cost standard and the brand standard. Never short the guest to save cost.",
            ),
            q(
              "cg-q10",
              "The same item gets thrown out at close almost every night. What do you do?",
              [
                "Keep prepping the same amount. The par is the par.",
                "Compare the par to Toast sales history and adjust it to match the store’s sales.",
                "Stop making the item.",
                "Tell the team to skip logging it.",
              ],
              1,
              "Pars are up to each store, based on its sales. Repeated waste at close means the par no longer fits, so the manager adjusts it.",
            ),
            q(
              "cg-q11",
              "COGS came in high this month. What do you check first?",
              [
                "Raise prices.",
                "Tell the line to go lighter on portions.",
                "The count and the math: all invoices in purchases, and an ending count that was complete, in the right units, with nothing estimated.",
                "Wait for next month and see if it fixes itself.",
              ],
              2,
              "A bad count or a missing invoice gives a bad number. Confirm the number, then work receiving, waste, comps and voids, pars, and portions.",
            ),
            q(
              "cg-q12",
              "A crew member hands a friend a free sandwich and nobody rings it. Why does that matter for COGS?",
              [
                "It does not. One sandwich is too small to matter.",
                "It only matters for labor cost.",
                "It lowers COGS because nothing was sold.",
                "It is food out the door with no sale and no record. Every comp and void is rung in Toast with a reason.",
              ],
              3,
              "Unrecorded comps and giveaways are cost with no sale. Ring every comp and void with a reason.",
            ),
          ],
        },
      ],
    },
  ],
};
