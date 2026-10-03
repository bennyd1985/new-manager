import type { Question } from "./types";

export function q(
  id: string,
  prompt: string,
  choices: [string, string, string, string],
  answer: 0 | 1 | 2 | 3,
  explain: string,
): Question {
  return { id, prompt, choices: [...choices], answer, explain };
}
