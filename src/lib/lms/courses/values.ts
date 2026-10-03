import { q } from "../q";
import type { Course } from "../types";

export const valuesCourse: Course = {
  id: "lh-values",
  title: "Hospitality and core values",
  blurb: "New-manager packet from the Introduction & Core Values Guide in Drive. Not an hourly handout.",
  audience: "Manager",
  modules: [
    {
      id: "lh-values-welcome",
      title: "Who we are",
      lessons: [
        {
          id: "lh-values-founders",
          title: "Welcome from Laura and Todd",
          minutes: 5,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Welcome to Love & Honey. You are part of the family now. Read this before you come to the corporate store. Keep it with managers. It is not an hourly handout.",
            },
            {
              type: "figure",
              src: "/founders.jpg",
              alt: "Laura and Todd Lyons, co-founders of Love & Honey Fried Chicken, standing together.",
              caption: "Laura and Todd Lyons, co-founders.",
            },
            {
              type: "p",
              text: "Success takes active engagement and strong leadership. Managing from the office is not enough. Build a team that can grow. The manual has the recipes, systems, and standards. Your job is to use them.",
            },
          ],
        },
        {
          id: "lh-values-why",
          title: "Who, what, how, why",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "Who we are: a premium fast-casual destination that combines chef-driven expertise with heartfelt hospitality. Hand-dredged, freshly prepared chicken. Pickup and delivery. A warm, comforting experience in every order.",
            },
            {
              type: "p",
              text: "What we do: premium, hand-dredged, freshly prepared fried chicken from hormone-free poultry, scratch-made sauces, and a consistent offer.",
            },
            {
              type: "p",
              text: "How we do it: traditional hospitality training plus modern technology. Hire for genuine care and emotional intelligence. Keep the food chef-driven.",
            },
            {
              type: "p",
              text: "Why we do it: it is rooted in love. Meals are crafted to bring people together. Nurture relationships. Do not treat this as only a business to grow.",
            },
            {
              type: "steps",
              items: [
                "Love — in the food and in how we treat guests and the team.",
                "Integrity — highest standards in food and service. Promises kept, honestly.",
                "Connection — personalized service. The room should feel like home.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "lh-values-pyramid",
      title: "The pyramid and the promises",
      lessons: [
        {
          id: "lh-values-pyramid-lesson",
          title: "Pyramid of Success",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "The common goal is to get and keep more guests coming back more often. Execute the seven layers and profit and value should follow. Cost never jumps the line.",
            },
            {
              type: "figure",
              src: "/pyramid.jpg?v=2",
              alt: "Pyramid of Success. Profit and value sit on brand, local store marketing, financial fundamentals, high-quality products, wow service, restaurant readiness, and best people at the base.",
              caption: "Best people is the base. Cost does not jump the line.",
              fit: "wide",
            },
            {
              type: "steps",
              items: [
                "Best People — the foundation. Guest-first. The operator’s most important job is to manage, develop, and empower.",
                "Restaurant Readiness — from soap at the hand sink to full product and brand-standard training.",
                "Wow Service — knowledgeable, engaged, compassionate. Always Make it Right.",
                "High-Quality Products — the store runs corporate programs at the highest level.",
                "Financial Fundamentals — manage cost only after the layers below are strong.",
                "Local Store Marketing — only works if readiness, service, and product are real.",
                "Brand — corporate. It amplifies what the store is already doing.",
              ],
            },
          ],
        },
        {
          id: "lh-values-duties",
          title: "What you owe guests, the team, and the brand",
          minutes: 6,
          kind: "read",
          pass: 80,
          questions: [],
          blocks: [
            {
              type: "p",
              text: "To guests",
            },
            {
              type: "list",
              items: [
                "Regular hours.",
                "Approved product with enough stock.",
                "Friendly and efficient service.",
                "A clean and safe restaurant on ServSafe protocols.",
                "Honest treatment.",
                "Community events and local organizations need corporate approval.",
              ],
            },
            {
              type: "p",
              text: "To the team",
            },
            {
              type: "list",
              items: [
                "Follow employment law and pay fairly.",
                "Lead by example.",
                "Give feedback and train people.",
                "Keep the workplace safe.",
              ],
            },
            {
              type: "p",
              text: "To the franchisor and other franchisees",
            },
            {
              type: "list",
              items: [
                "Standards and the law.",
                "Reports and payments on time.",
                "Clean books, and a managed shift every day.",
                "Share what helps the network.",
                "Protect the reputation by running to standard.",
              ],
            },
            {
              type: "warn",
              title: "Suppliers",
              text: "Use brand supplier relationships. Preferred vendors live in the Playbook Builder appendix. Do not freelance core product.",
            },
            {
              type: "p",
              text: "A visit from headquarters can cover:",
            },
            {
              type: "list",
              items: [
                "The facility and operations.",
                "Business-plan progress.",
                "Safety and sanitation.",
                "Live observation.",
                "Team and guest interviews.",
                "Books and records.",
              ],
            },
          ],
        },
        {
          id: "lh-values-quiz",
          title: "Core values check",
          minutes: 8,
          kind: "quiz",
          pass: 86,
          blocks: [
            {
              type: "p",
              text: "Fourteen questions from the guide. You need 12 of 14. Name and store are not scored here.",
            },
          ],
          questions: [
            q("vh-q1", "A manager describes the brand as “quality fried chicken, as fast as we can fire it.” What did they miss in WHO we are?", ["A grocery brand with a hot case", "A catering commissary that also does pickup", "A value QSR built on frozen chicken", "Chef-driven fast-casual, with heartfelt hospitality"], 3, "Premium fast-casual. Chef-driven food and hospitality, not speed-first QSR."),
            q("vh-q2", "WHY we do it is easiest to get wrong. Which one is the guide?", ["Meals that bring people together. Not just a business to grow.", "Lowest ticket time, because guests come back for speed.", "Franchise growth first. The food follows the fees.", "National ads, so the room fills itself."], 0, "Rooted in love and relationships."),
            q("vh-q3", "Which set is the three core values, not a near miss?", ["Love, Profit, Expansion", "Love, Integrity, Connection", "Speed, Volume, Discount", "Integrity, Compliance, Audit"], 1, "Love, Integrity, Connection."),
            q("vh-q4", "A ticket is wrong and the fix costs food. Integrity says you:", ["Keep the promise and the standard. Do not bury the ticket.", "Let it go so food cost holds.", "Swap the vendor on the spot if it is cheaper.", "Post the complaint so the team sees it."], 0, "Highest standards, and honest promises. Cost does not buy a wrong ticket."),
            q("vh-q5", "The pyramid’s common goal is easy to replace with a business target. The actual line is:", ["Open the most stores.", "Cut food cost before anything else.", "To get and keep more guests coming back more often.", "Hire the cheapest labor that can pass a shift."], 2, "Get and keep more guests coming back more often."),
            q("vh-q6", "Which layer is the foundation, under restaurant readiness?", ["Brand", "Financial Fundamentals", "Local store marketing", "Best People"], 3, "Best People. Everything else sits on that."),
            q("vh-q7", "A guest is unhappy and the ticket is real. Wow Service is:", ["Go above and beyond, and always Make it Right.", "Hope they do not complain again.", "Comp only when corporate is in the store.", "Speed the next ticket and skip the greeting."], 0, "Always Make it Right."),
            q("vh-q8", "Why does Financial Fundamentals sit above people, readiness, service, and product?", ["Money is the first layer. The rest is extra.", "Local marketing replaces product if the ad is strong.", "Brand is run by the store, so cost can move first.", "You manage cost only after those lower layers are strong."], 3, "Cost never jumps the line."),
            q("vh-q9", "A big local campaign is booked. It works only if:", ["The ad budget is large enough to cover a slow store.", "Corporate has already pushed Brand.", "Guests who show up get a ready restaurant, Wow Service, and the product.", "Training is paused so labor can cover the rush."], 2, "Marketing cannot hide a store that is not ready."),
            q("vh-q10", "Which set is actually owed to guests?", ["New recipes the manager prefers, and a chicken brand they source", "Approved product, enough stock, regular hours, and ServSafe", "Hours that move whenever labor is tight", "Whatever supplier is cheapest this week"], 1, "Approved product, hours guests can trust, and ServSafe."),
            q("vh-q11", "A youth team wants a fundraiser in the dining room. You:", ["Book it. Community events are the manager’s call.", "Run it quietly and tell the team after.", "Take cash off the books so it stays simple.", "Get corporate approval before the event or the organization is involved."], 3, "Corporate approves community events and organizations."),
            q("vh-q12", "Where do you confirm a preferred supplier before you freelance a core product?", ["Guest reviews", "A group text with the last manager", "The Playbook Builder appendix", "The nearest restaurant supply store"], 2, "Playbook Builder appendix."),
            q("vh-q13", "Headquarters is on the calendar. Which visit matches the guide?", ["Lunch and a menu tasting", "A mystery shop with no debrief", "Facility and ops, the plan, safety, live observation, interviews, and the books", "A social visit. The books stay at the store."], 2, "The full agenda, including books and records."),
            q("vh-q14", "The founders’ standard for how you spend the shift is:", ["Run it from the office once the open is done.", "Active engagement and strong leadership. Not the sidelines.", "Skip the manual once the team knows the menu.", "Cut training when labor is tight."], 1, "Lead from the floor. The manual is there to be used."),
          ],
        },
      ],
    },
  ],
};
