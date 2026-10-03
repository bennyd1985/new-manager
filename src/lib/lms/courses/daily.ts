import { q } from "../q";
import type { Course } from "../types";

export const dailyCourse: Course = {
  id: "lh-daily",
  title: "Daily operating procedures",
  blurb: "The new-manager packet: hours, hospitality, H.E.A.T., cash, and the line. Not an hourly handout.",
  audience: "Manager",
  modules: [
    {
      id: "lh-daily-floor",
      title: "The floor",
      lessons: [
        {
          id: "lh-daily-hours",
          title: "Hours, holidays, and the greeting",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Minimum hours are 11 AM to 9 PM. Seven-day operation is the preference. Change hours only for demand or a landlord rule.",
            },
            {
              type: "list",
              items: [
                "New Year’s Eve — early close.",
                "New Year’s Day — closed.",
                "Easter — closed.",
                "4th of July — closed.",
                "Thanksgiving — closed.",
                "Christmas Eve — early close.",
                "Christmas Day — closed.",
              ],
            },
            {
              type: "p",
              text: "Front of house is service. Back of house is perfect food. Managers are the total package. The first priority is service. Smile. They are guests in your home.",
            },
            {
              type: "list",
              items: [
                "We depend on the guests.",
                "They are the work.",
                "They favor us by choosing us.",
                "They are people.",
              ],
            },
            {
              type: "warn",
              title: "When they say thank you",
              text: "We say thank you. Not you’re welcome, not no problem, not no worries.",
            },
          ],
        },
        {
          id: "lh-daily-service",
          title: "Walk-in, pickup, and the bag",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "steps",
              items: [
                "Walk-in: greet, state the current wait before they order, dine-in or to-go, ring, read back, pay, thank you.",
                "If they push on the wait: the chicken is hand-breaded and made with care. We are not fast food.",
                "Suggest sides, desserts, and drinks that belong with the meal. Not pressure.",
                "Pickup: tell the kitchen if it is not bagged. Early means it is still in the fryer. Full name, ticket facing the guest, confirm, farewell.",
                "Flag bags over 15 minutes, especially delivery.",
              ],
            },
            {
              type: "p",
              text: "Approved third-party delivery is DoorDash, Uber Eats, and Grubhub. Not DoorDash only. Not Toast delivery.",
            },
            {
              type: "list",
              items: [
                "A real goodbye on the way in and the way out.",
                "Assign a busser.",
                "Managers work the floor.",
                "Do not argue with a guest. Get a manager.",
                "No swearing.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "lh-daily-protect",
      title: "Recovery, money, and the line",
      lessons: [
        {
          id: "lh-daily-heat",
          title: "H.E.A.T. and phones",
          minutes: 7,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Watch faces and half-eaten food. Ask and fix it now. Reviews live on Google, Yelp, Facebook, and DoorDash. The first-order Google ask is automated. Corporate replies and forwards.",
            },
            {
              type: "steps",
              items: [
                "H.E.A.T.: Hear them out, Empathize, Acknowledge, Take action.",
                "A complaint is valid when the ticket is in Toast — receipt, order number, or the phone on the order.",
                "Then thank them, apologize, refund the problem item, and add a gift card or e-card rounded up.",
                "DoorDash, Uber Eats, and Grubhub: still run H.E.A.T. in the store. The refund goes through that platform. Do not refund cash from the drawer. Watch the portals and claim invalid charges.",
                "No ticket lookup means no refund and no remake. Cash refunds only on cash. Refund only to the original tender.",
              ],
            },
            {
              type: "list",
              items: [
                "Hourly phones live in cubbies or lockers.",
                "Not on the line, not on the clock, not in guest view, not in the restroom.",
                "A phone in prep or service is a sanitation violation.",
                "Managers use phones for the business.",
              ],
            },
            {
              type: "warn",
              title: "Foodborne illness",
              text: "Managers only. Do not admit fault and do not speculate. Follow up in 24 hours. Isolate the food. File the report and notify headquarters immediately.",
            },
          ],
        },
        {
          id: "lh-daily-money",
          title: "Pars, cash, and gift cards",
          minutes: 5,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Count first, then prep the gap to the daily par. Too much wastes money. Too little creates a fire drill. Catering needs corporate approval, and it does not get to hurt regular service.",
            },
            {
              type: "steps",
              items: [
                "Announce the cash and the total. Count change twice. Drawer shut. Managers drop.",
                "Toast authorizes cards. A decline needs another tender and the issuer’s number.",
                "Gift cards run through E-Card Systems. The sale sits in a corporate hold. The store is paid weekly on redemptions. Comps come from the E-Card back end.",
                "Close with Employee Checkout and the drawer count. Count the safe at the start and end of the shift. Tips go through payroll, by state law.",
              ],
            },
            {
              type: "p",
              text: "Use the Maintenance Report and the Service Repair and Maintenance Log.",
            },
          ],
        },
        {
          id: "lh-daily-quiz",
          title: "Daily procedures check",
          minutes: 8,
          kind: "quiz",
          pass: 86,
          blocks: [{ type: "p", text: "Fourteen questions from the daily procedures packet. You need 12 of 14." }],
          questions: [
            q("dy-q1", "A manager posts 10 AM to 8 PM, five days. What does the guide actually require?", ["Lunch only, if sales are soft", "Whatever the manager prefers that week", "11 AM to 9 PM, seven days strongly preferred", "10 AM to 9 PM, closed Monday"], 2, "11 to 9. Seven days unless demand or the landlord says otherwise."),
            q("dy-q2", "Which list is an approved close or early close, not a guess?", ["Super Bowl Sunday, and every Monday in January", "Memorial Day only", "The day before any holiday, manager’s choice", "Christmas Eve early, Christmas Day closed, New Year’s Eve early, New Year’s Day, Easter, Thanksgiving, and the 4th of July"], 3, "Those days are the list. Not Super Bowl, and not every Monday."),
            q("dy-q3", "A guest says thank you. The reply in this building is:", ["Thank you", "You’re welcome", "No problem", "Anytime"], 0, "We say thank you."),
            q("dy-q4", "A walk-in is at the counter. Which sequence is the one in the guide?", ["Ring, then mention the wait if they ask", "Greet, state the current wait before they order, then dine-in or to-go, ring, read back, pay, thank you", "Bag first so the food is moving", "Dessert, then the greeting"], 1, "The wait is spoken before the order."),
            q("dy-q5", "They flinch at the wait. The line we use is:", ["The chicken is hand-breaded and made with care. We are not fast food.", "We are fast food. It will be quick.", "Say nothing. The ticket will speak for itself.", "Blame the kitchen and offer a comp."], 0, "We are not fast food."),
            q("dy-q6", "H.E.A.T. is not “help, apologize, transfer.” It is:", ["Hurry, Excuse, Argue, Transfer", "Help, Exit, Avoid, Tip", "Hold, End, Audit, Ticket", "Hear them out, Empathize, Acknowledge, Take action"], 3, "Hear, Empathize, Acknowledge, Take action."),
            q("dy-q7", "They want a remake and will not give a receipt, order number, or phone. You:", ["Remake it. A loud complaint is enough.", "No lookup in Toast, no refund and no remake.", "Take their word. Toast lookup is optional.", "Refund it so they do not post."], 1, "A complaint is valid when the ticket is in Toast."),
            q("dy-q8", "The ticket checks out. The right recovery is:", ["Argue about whose fault it was", "Sorry, and nothing else", "Thank them, apologize, refund the problem item, and add a gift card or e-card rounded up", "Refund the whole check, every time"], 2, "Refund the problem item. Round up a gift card. Do not empty the day’s sales."),
            q("dy-q9", "A DoorDash guest calls the store angry. You:", ["Run H.E.A.T. in the store. The refund goes through that platform.", "Hand them cash from the drawer.", "Ignore it. The app owns the guest.", "Remake it with no ticket lookup."], 0, "H.E.A.T. still happens here. The money moves on the platform. Watch for scams."),
            q("dy-q10", "An hourly employee has a phone in their pocket on the line, on silent. That is:", ["Fine, if it stays silent", "Fine in the restroom, so the line is the same", "A sanitation violation. Phones stay in cubbies or lockers.", "Fine when the rush is over"], 2, "Cubbies or lockers. Not on the line, silent or not."),
            q("dy-q11", "A guest says the chicken made them sick. Who handles it, and how?", ["Any cashier. Apologize and admit the food was the cause.", "A manager only. Do not admit fault. Document, follow up in 24 hours, isolate the food, notify headquarters.", "Nobody until next week’s manager meeting.", "Talk it through at the fryer and throw the batch out quietly."], 1, "Managers only. No speculation. Headquarters immediately."),
            q("dy-q14", "A $25 gift card is sold at lunch. Where does that money live?", ["In today’s drawer. The store keeps it.", "A personal account until it is redeemed", "Through E-Card Systems. The store is paid weekly when the card is redeemed.", "It comes out of the drawer with no system."], 2, "Corporate hold. Weekly pay on redemptions. Comps come from the back end."),
            q("dy-q15", "Approved third-party delivery is:", ["DoorDash only", "Toast delivery", "Whichever app the guest used, plus cash from the drawer", "DoorDash, Uber Eats, and Grubhub"], 3, "DoorDash, Uber Eats, and Grubhub. Not DoorDash only. Not Toast delivery."),
            q("dy-q16", "A Grubhub guest wants the problem item refunded. You:", ["Run H.E.A.T. in the store. The refund goes through Grubhub.", "Hand them cash from the drawer.", "Ignore it. The app owns the guest.", "Remake it with no ticket lookup."], 0, "Run H.E.A.T. here. The refund goes through Grubhub. Do not refund cash from the drawer."),
          ],
        },
      ],
    },
  ],
};
