import type { Topic } from "./types";

export const topics: Topic[] = [
  {
    slug: "general",
    name: "General agents",
    dek: "Products people open when the job is not yet a ticket, a document, or a pull request.",
    sections: [
      {
        heading: "The default tab",
        paragraphs: [
          "A general agent is the one you open before you know which specialist you need. It can search, draft, click, and sometimes hand work to a narrower tool. That breadth is the product. It is also the way these things waste an afternoon: they sound confident on every task, including the ones they should refuse.",
          "In this issue the general seats are Claude, ChatGPT, Grok, and Manus. They are not interchangeable. Claude is the careful long-form worker. ChatGPT is the widest consumer surface. Grok is the live desk. Manus is closer to a rented computer that tries to finish the errand.",
          "Read them against the [methodology](/methodology), not against a launch video. A general agent earns a high rank only if it can stop, show its work, and leave you with a file you would actually send.",
        ],
      },
    ],
  },
  {
    slug: "coding",
    name: "Coding agents",
    dek: "Editors, issue runners, and cloud machines that try to land a change without you typing every line.",
    sections: [
      {
        heading: "The repo is the point",
        paragraphs: [
          "Coding agents are the most mature slice of this market and the easiest to oversell. Completing a function in an open file is not the same job as taking an issue, running the tests, and opening a pull request a teammate can review. Helm Review scores the second job.",
          "The coding seats this issue are GitHub Copilot’s coding agent, Cursor, Devin, Windsurf, Replit Agent, and Amazon Q Developer. Claude and ChatGPT also write serious code; they sit on the general list because their products are larger than the editor.",
          "Start with [field notes from the coding desk](/briefings/coding-agent-field-notes) if you are choosing one subscription instead of four. The short version: put the agent where your review already happens.",
        ],
      },
    ],
  },
  {
    slug: "research",
    name: "Research agents",
    dek: "Tools that are supposed to come back with sources, not a confident paragraph.",
    sections: [
      {
        heading: "Citations or it did not happen",
        paragraphs: [
          "A research agent is hired to shrink a pile of sources into a briefing you can check. The failure mode is familiar: a smooth summary with links that do not say what the sentence claims. We treat that as a product bug, not a rounding error.",
          "Gemini and Perplexity hold the research seats. ChatGPT, Claude, and Grok all research too. They are filed elsewhere because research is not the whole product. If your actual job is a cited memo, start on this desk and read [the citation problem](/briefings/research-desks).",
          "Never paste a research-agent paragraph into a decision memo without opening two of the sources. The rank is about how often those sources support the sentence, not about how fast the paragraph arrived.",
        ],
      },
    ],
  },
  {
    slug: "workplace",
    name: "Workplace agents",
    dek: "Agents that live in the suite you already pay for: documents, mail, tickets, and the glue between apps.",
    sections: [
      {
        heading: "Distribution is a feature",
        paragraphs: [
          "Workplace agents win on distribution. The model does not have to be the most charming if it can already see the deck, the thread, and the wiki, under the same login your admin controls. They lose when that access becomes a reason to answer questions the user did not have permission to ask.",
          "This issue seats Microsoft 365 Copilot, Notion, and Zapier here. They solve different problems: the suite, the workspace, and the glue. Read [the rollout briefing](/briefings/rollout) before you turn any of them on for a whole company.",
          "A workplace agent should have an off switch a manager can find without filing a ticket. If the setting is a rumor, the product is not ready, whatever the demo looked like.",
        ],
      },
    ],
  },
  {
    slug: "customer",
    name: "Customer work",
    dek: "Agents on the support line, in the CRM, and in the practice areas where a wrong sentence has a cost.",
    sections: [
      {
        heading: "The sentence customers remember",
        paragraphs: [
          "Customer agents are not chat widgets with a new name. The ones worth reviewing can take an action: refund within a policy, update a record, draft a filing, or stop and hand the case to a person. The ones that only rephrase the help center are a search box.",
          "Agentforce, Intercom Fin, Harvey, and Sierra sit here because their buyers are teams with a queue, not individuals with a tab. The interesting question is the contract: per seat, per resolution, or per outcome. Read [what support agents are allowed to say](/briefings/support-floor) beside the profiles.",
          "Do not point a customer agent at production data on the strength of a sandbox demo. Ask where the transcript is stored and who can delete it. That question is part of the product.",
        ],
      },
    ],
  },
  {
    slug: "personal",
    name: "Personal agents",
    dek: "A single operator, an inbox, and a stack of small promises that are easy to over-automate.",
    sections: [
      {
        heading: "One person is still a production system",
        paragraphs: [
          "Personal agents sell the fantasy of a chief of staff. The honest version is narrower: triage this inbox, prep this meeting, chase this form, and leave a trail you can audit on Sunday night. Lindy is the personal seat in the ranking because that is the job it is built around.",
          "General agents can do personal work too. The reason to look at a personal product is the wiring: calendars, mail, and the little automations you would otherwise rebuild in five tools. Read [a sane personal stack](/briefings/personal-stack) before you add another subscription.",
          "Give a personal agent the least access that still lets it help. A product that wants full mailbox control on day one is asking you to skip the only safety practice that scales to a household.",
        ],
      },
    ],
  },
];

export function getTopic(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}
