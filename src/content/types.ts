export type TopicSlug =
  | "general"
  | "coding"
  | "research"
  | "workplace"
  | "customer"
  | "personal";

export type Section = {
  heading: string;
  paragraphs: string[];
};

export type Scores = {
  task: number;
  tools: number;
  reliability: number;
  control: number;
  value: number;
};

export type Agent = {
  slug: string;
  name: string;
  vendor: string;
  rank: number;
  topic: TopicSlug;
  scores: Scores;
  dek: string;
  pull: string;
  bestFor: string;
  skipIf: string;
  author: string;
  updated: string;
  sections: Section[];
};

export type Briefing = {
  slug: string;
  title: string;
  kicker: string;
  dek: string;
  topic: TopicSlug;
  author: string;
  date: string;
  sections: Section[];
};

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string[];
};

export type Topic = {
  slug: TopicSlug;
  name: string;
  dek: string;
  sections: Section[];
};
