import { q } from "../q";
import type { Course } from "../types";

export const orderCourse: Course = {
  id: "lh-order",
  title: "Order taking",
  blurb: "The cashier script, written as the Order Taking Training Guide. Say the lines out loud.",
  audience: "Crew",
  modules: [
    {
      id: "lh-order-script",
      title: "The script",
      lessons: [
        {
          id: "lh-order-four",
          title: "Four moves",
          minutes: 4,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "This is the cashier script from Drive. Do not start ringing before you know dine-in or takeout. Every ticket needs a name and a dining option so the kitchen does not mix orders.",
            },
            {
              type: "steps",
              items: [
                "Greet and get Dine In or Take Out.",
                "Get a name. Get a phone number if they are to-go.",
                "Take the order. Help first-timers. Offer sides, drinks, and dessert.",
                "Read it back. Take payment. Thank them and repeat the wait.",
              ],
            },
          ],
        },
        {
          id: "lh-order-branches",
          title: "Dine in, takeout, and the close",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Open with: “Hi, welcome to Love & Honey Fried Chicken! Will you be dining in or taking out?”",
            },
            {
              type: "p",
              text: "Dining in: “Great! May I have a first name for the order?” Then: “Your food should be ready in about 10–15 minutes. We’ll call your name when it’s up!”",
            },
            {
              type: "p",
              text: "Taking out: enter the phone number and first name when the POS prompts you. Do not skip the prompt. “Perfect, we’ll send you a text as soon as your order is ready. It should be about 10–15 minutes. Feel free to wait here or step out — you’ll get notified either way.”",
            },
            {
              type: "warn",
              title: "The wait you quote",
              text: "Confirm the 10–15 with the kitchen so the promise is still true.",
            },
            {
              type: "p",
              text: "If they are unsure, give a real favorite: “My go-to is the Nashville Sandwich — the heat is addictive!” When they seem finished: “Would you like to add any drinks, sides, or desserts?” Read the entire order back and wait for a yes. Then the total, then payment. Close with thank you, 10–15 minutes, and that you will call or text their name.",
            },
          ],
        },
        {
          id: "lh-order-quiz",
          title: "Order taking check",
          minutes: 6,
          kind: "quiz",
          pass: 80,
          blocks: [{ type: "p", text: "Ten questions from the script. You need 8 of 10." }],
          questions: [
            q("or-q1", "A guest walks up already naming tenders. What happens before anything is rung?", ["Ask which sauce, then ring", "Quote 10–15 minutes, then ring", "Ask dine-in or takeout", "Offer the Nashville Sandwich"], 2, "Dining option first. Sauce, wait time, and the favorite come later."),
            q("or-q2", "Which dine-in ticket matches the script?", ["Alex, dine in. You will call Alex.", "Table 12, no name", "Alex, phone and email required", "Last name only, so tickets stay short"], 0, "First name, then tell them you will call it. A table number is not the name."),
            q("or-q3", "To-go, and the guest says they are in a hurry. The POS name prompt comes up. You:", ["Skip it so the line moves", "Take a last name only", "Take a phone number only", "Take the phone number and the first name"], 3, "The prompt is not optional. Phone and first name."),
            q("or-q4", "The board says the kitchen is at 18 minutes. A guest asks how long. You say:", ["10 to 15. The script number does not change.", "10 to 15, but only after the kitchen still agrees with that.", "5 minutes. We do not want them to walk.", "30 minutes on every ticket, so we never miss."], 1, "10–15 is the line, and only if the kitchen still agrees."),
            q("or-q5", "Two tickets are on the rail and one has no name. What must every ticket already have?", ["A sauce and a drink", "An upsell", "A name, and Dine In or To Go", "A printed receipt before the order is spoken"], 2, "Name plus dining option. That is what keeps tickets from mixing."),
            q("or-q6", "They have never been in and they freeze on the menu. The script’s example is:", ["Ring tenders and skip the menu", "The Nashville Sandwich, as your go-to", "Whatever is 86’d, so it moves", "A kids meal, because it is simple"], 1, "Give a real favorite. The line in the script is the Nashville Sandwich."),
            q("or-q7", "They stop talking. Which line is the upsell?", ["You should add extra honey.", "The family meal is the usual order.", "Would you like to add any drinks, sides, or desserts?", "We do not suggest anything after the entrée."], 2, "Drinks, sides, or desserts. One question, not pressure."),
            q("or-q8", "The order is in. What is the next required step, before the total?", ["Bag it so the window stays clear", "Ask for a review", "Call the kitchen to fire it", "Read the entire order back and wait for a yes"], 3, "Read-back and a yes, then the total, then payment."),
            q("or-q9", "Which close matches the script?", ["Thank you, about 10–15 minutes, and that you will call or text their name.", "You’re welcome, and hand the receipt.", "Cash only, and an apology for the wait.", "Thank you, and nothing about time or their name."], 0, "Thank you, the wait, and their name."),
            q("or-q10", "When are you allowed to start ringing?", ["Only after you know dine-in or takeout", "As soon as they walk in, so the ticket is open", "After the food is plated", "After they pay"], 0, "Do not ring before the dining option."),
          ],
        },
      ],
    },
  ],
};
