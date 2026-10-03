export type Audience = "Crew" | "Shift lead" | "Manager" | "Franchisee";

export type CheckItem = { id: string; label: string };

export type Block =
  | { type: "p"; text: string }
  | { type: "tip"; title: string; text: string }
  | { type: "warn"; title: string; text: string }
  | { type: "steps"; items: string[] }
  | { type: "list"; items: string[] }
  | { type: "figure"; src: string; alt: string; caption?: string; fit?: "wide" }
  | { type: "checks"; items: CheckItem[] };

export type Question = {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  explain: string;
};

export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  kind: "read" | "quiz";
  blocks: Block[];
  questions: Question[];
  pass: number;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  blurb: string;
  audience: Audience;
  modules: Module[];
};

export type Attempt = {
  lessonId: string;
  score: number;
  passed: boolean;
  at: number;
};

export const AUDIENCES: Audience[] = ["Crew", "Shift lead", "Manager", "Franchisee"];
