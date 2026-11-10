import { agentsA } from "./agents-a";
import { agentsB } from "./agents-b";
import { authors, getAuthor } from "./authors";
import { briefingsA } from "./briefings-a";
import { briefingsB } from "./briefings-b";
import { glossary } from "./glossary";
import { getTopic, topics } from "./topics";
import type { Agent, Briefing, Section, TopicSlug } from "./types";

export { authors, getAuthor, glossary, getTopic, topics };
export type { Agent, Briefing, Section, TopicSlug };

export const agents: Agent[] = [...agentsA, ...agentsB].sort((a, b) => a.rank - b.rank);
export const briefings: Briefing[] = [...briefingsA, ...briefingsB];

export function composite(agent: Agent) {
  const { task, tools, reliability, control, value } = agent.scores;
  return Math.round(((task + tools + reliability + control + value) / 5) * 10) / 10;
}

export function wordCount(sections: Section[]) {
  const text = sections.map((section) => [section.heading, ...section.paragraphs].join(" ")).join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export function readingMinutes(sections: Section[]) {
  return Math.max(3, Math.round(wordCount(sections) / 220));
}

export function getAgent(slug: string) {
  return agents.find((agent) => agent.slug === slug);
}

export function getBriefing(slug: string) {
  return briefings.find((briefing) => briefing.slug === slug);
}

export function agentsByTopic(topic: TopicSlug) {
  return agents.filter((agent) => agent.topic === topic);
}

export function briefingsByTopic(topic: TopicSlug) {
  return briefings.filter((briefing) => briefing.topic === topic);
}

export function relatedAgents(slug: string, count = 3) {
  const current = getAgent(slug);
  if (!current) return [];
  const same = agents.filter((agent) => agent.slug !== slug && agent.topic === current.topic);
  const rest = agents.filter((agent) => agent.slug !== slug && agent.topic !== current.topic);
  return [...same, ...rest].slice(0, count);
}

export function relatedBriefings(slug: string, count = 3) {
  const current = getBriefing(slug);
  if (!current) return [];
  const same = briefings.filter((item) => item.slug !== slug && item.topic === current.topic);
  const rest = briefings.filter((item) => item.slug !== slug && item.topic !== current.topic);
  return [...same, ...rest].slice(0, count);
}

export function byAuthor(slug: string) {
  return {
    agents: agents.filter((agent) => agent.author === slug),
    briefings: briefings.filter((briefing) => briefing.author === slug),
  };
}

export type SearchHit = {
  href: string;
  kicker: string;
  title: string;
  dek: string;
};

export function searchAll(query: string): SearchHit[] {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];
  const hits: SearchHit[] = [];
  for (const agent of agents) {
    const hay = `${agent.name} ${agent.vendor} ${agent.dek} ${agent.bestFor}`.toLowerCase();
    if (hay.includes(needle)) {
      hits.push({
        href: `/agents/${agent.slug}`,
        kicker: `Rank ${agent.rank}`,
        title: agent.name,
        dek: agent.dek,
      });
    }
  }
  for (const briefing of briefings) {
    const hay = `${briefing.title} ${briefing.dek} ${briefing.kicker}`.toLowerCase();
    if (hay.includes(needle)) {
      hits.push({
        href: `/briefings/${briefing.slug}`,
        kicker: briefing.kicker,
        title: briefing.title,
        dek: briefing.dek,
      });
    }
  }
  for (const topic of topics) {
    if (`${topic.name} ${topic.dek}`.toLowerCase().includes(needle)) {
      hits.push({
        href: `/topics/${topic.slug}`,
        kicker: "Topic",
        title: topic.name,
        dek: topic.dek,
      });
    }
  }
  return hits;
}

export function allPaths() {
  return [
    "/",
    "/rankings",
    "/briefings",
    "/topics",
    "/glossary",
    "/methodology",
    "/faq",
    "/about",
    "/authors",
    "/contact",
    "/privacy",
    "/terms",
    "/disclosure",
    "/editorial",
    "/corrections",
    ...agents.map((agent) => `/agents/${agent.slug}`),
    ...briefings.map((briefing) => `/briefings/${briefing.slug}`),
    ...topics.map((topic) => `/topics/${topic.slug}`),
    ...authors.map((author) => `/authors/${author.slug}`),
  ];
}
