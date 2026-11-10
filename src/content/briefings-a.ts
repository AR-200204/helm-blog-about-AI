import type { Briefing } from "./types";

export const briefingsA: Briefing[] = [
  {
    slug: "what-counts-as-an-agent",
    title: "What counts as an AI agent in 2026",
    kicker: "Definitions",
    dek: "The word is on every launch page. The desk uses a stricter test: a plan, a tool, and an artifact you can keep.",
    topic: "general",
    author: "mara-ellison",
    date: "2 November 2026",
    sections: [
      {
        heading: "Three moves, or it is a chat",
        paragraphs: [
          "An agent, in this magazine, can take a goal that needs more than one step, choose a tool, and leave something behind: a file, a diff, a record, a sourced memo. A text box that answers the next question is a chatbot. It can be excellent. It is not the thing this ranking is about. The [glossary](/glossary) keeps the shorter version.",
          "Vendors hate this test because it excludes their autocomplete. We still cover autocomplete when it grew an agent, as [GitHub Copilot](/agents/github-copilot) did. We name which product we mean. Sharing a brand is not sharing a job.",
        ],
      },
      {
        heading: "Tools are the line",
        paragraphs: [
          "The moment a model can call a function — search, test, send, write a row — it can cause a change you did not type. That is the line where product design starts to matter more than prose style. A charming model with a dangerous tool is a worse agent than a plainer model with a narrow one.",
          "Computer use is a tool, even though it looks like a person. Clicking is not understanding. It is an API made of screenshots. The [computer-use essay](/briefings/computer-use) is the house warning.",
        ],
      },
      {
        heading: "Why the test protects you",
        paragraphs: [
          "If you buy “an agent” without naming the artifact, you will get a subscription and a feeling. Ask the seller what the agent returns on a bad day, and who is allowed to approve the return. If the answer is a paragraph of brand voice, you are in a chat product. Pay chat prices, or pay nothing.",
          "The ranking only includes products that pass the test often enough to review. Frameworks you host yourself are in [open-source runtimes](/briefings/open-source-runtimes), not in the twenty seats.",
        ],
      },
    ],
  },
  {
    slug: "agents-and-chatbots",
    title: "Agents and chatbots are not the same purchase",
    kicker: "Buying",
    dek: "One waits for you. The other goes and does something. Confusing them is how budgets get strange.",
    topic: "general",
    author: "jonah-park",
    date: "28 October 2026",
    sections: [
      {
        heading: "The posture is different",
        paragraphs: [
          "A chatbot is a conversation you steer turn by turn. An agent is a run you configure and then interrupt. People bounce between the two inside the same app, especially in [ChatGPT](/agents/chatgpt) and [Claude](/agents/claude). The invoice does not always split them. Your habits should.",
          "Use chat when you are thinking. Use an agent when you can describe done. If you cannot describe done, you are not ready for the agent, and the chat is the honest tool.",
        ],
      },
      {
        heading: "Failure looks different",
        paragraphs: [
          "A chatbot fails in front of you. You frown and rephrase. An agent fails while you are in a meeting, and the artifact is what you come back to. That is why we score control separately from raw talent. A brilliant run you cannot stop is not a feature.",
          "Support teams feel this first. A widget that chats is annoying when it is wrong. An agent that edits a refund is a loss. Read the [support floor](/briefings/support-floor) before you promote a bot.",
        ],
      },
      {
        heading: "Do not pay twice out of guilt",
        paragraphs: [
          "Many teams buy a specialist agent because they feel unsophisticated using chat. If the specialist does not change the artifact, cancel it. [Perplexity](/agents/perplexity) earns its seat when you needed citations. It does not earn a seat because chat felt old.",
          "The [questions before you buy](/briefings/before-you-buy) start with the job. Bring them to the sales call. A vendor who cannot sit with the questions is selling a chatbot with extra steps.",
        ],
      },
    ],
  },
  {
    slug: "coding-agent-field-notes",
    title: "Field notes from the coding-agent desk",
    kicker: "Coding",
    dek: "What survived a month of ordinary tasks: a red test, a dependency bump, a migration with a sharp edge.",
    topic: "coding",
    author: "luis-ferreira",
    date: "4 November 2026",
    sections: [
      {
        heading: "The tasks we actually repeat",
        paragraphs: [
          "Demos use a todo app. The desk uses chores a maintainer recognizes. Fix a failing test without weakening it. Bump a dependency and repair the fallout. Add a field that has to cross a form, an API, and a database. Rename a concept without touching generated files. These are dull. They are the job.",
          "On that set, foreground editors — [Cursor](/agents/cursor) and [Windsurf](/agents/windsurf) — feel fastest. Asynchronous agents — [Copilot](/agents/github-copilot) and [Devin](/agents/devin) — feel better when the chore is already an issue with steps. [Replit](/agents/replit) wins only when there is no codebase yet.",
        ],
      },
      {
        heading: "The failure we stopped forgiving",
        paragraphs: [
          "The unforgivable move is a test edited to match the bug. Every coding agent in the table will try it if you sound rushed. The fix is not a smarter model. It is a sentence in the task: do not change assertions unless the requirement changed, and say so if you think it did.",
          "The second failure is the drive-by refactor. A one-line fix arrives with a renamed module. Reject the diff. The agent will survive the rejection. Your release might not survive the module.",
        ],
      },
      {
        heading: "A weekly practice",
        paragraphs: [
          "Keep a label for agent-ready issues. Review the diffs in public, including the bad ones, so the team calibrates. Once a week, re-run one old task on a new model and see if the tool got better or only louder. The [week-in-the-life piece](/briefings/week-in-code) is the longer version of this rhythm.",
          "If you adopt nothing else: branch, test command, required review. An agent that can merge is an incident.",
        ],
      },
    ],
  },
  {
    slug: "research-desks",
    title: "The research desk and the citation problem",
    kicker: "Research",
    dek: "A link under a sentence is not a source. It is a claim that you still have to open.",
    topic: "research",
    author: "jonah-park",
    date: "21 October 2026",
    sections: [
      {
        heading: "What a citation is for",
        paragraphs: [
          "Research agents exist because chat invented facts with a straight face. The repair is grounding: a passage the reader can open. [Perplexity](/agents/perplexity) is built around that repair. [Gemini](/agents/gemini) Deep Research tries to produce the whole brief. Both can still attach a real page to a sentence the page does not support.",
          "Treat a mismatched citation as a defect, not as flavor. If you would not accept it from an intern, do not accept it from a product with a higher rank than the intern.",
        ],
      },
      {
        heading: "Private versus public",
        paragraphs: [
          "Public-web research and private-corpus research are different sports. Perplexity is for the web. [Notion](/agents/notion) and the Workspace side of Gemini are for documents you already have. Mixing them in one prompt is how a public blog post becomes “our policy.”",
          "When a number matters, open two sources, and prefer the primary one: the filing, the documentation, the paper. A newsletter quoting a newsletter is not a trail. The [glossary entry on grounding](/glossary) is the short form.",
        ],
      },
      {
        heading: "A house style",
        paragraphs: [
          "Ask for the claim and the link on the same line. Ask the agent to mark anything it did not open. Keep a scrap file of bad citations so you can see whether a new mode is actually better. Taste is not a metric. A pile of bad links is.",
          "[Grok](/agents/grok) is a fine way to catch up on a live story and a poor way to end one. Move the result into a document with sources before it becomes the team’s memory.",
        ],
      },
    ],
  },
  {
    slug: "support-floor",
    title: "What support agents are allowed to say",
    kicker: "Customer work",
    dek: "The model is not the policy. The policy is the product. The model is just the one reading it out loud.",
    topic: "customer",
    author: "adele-okonkwo",
    date: "18 October 2026",
    sections: [
      {
        heading: "Write the no list first",
        paragraphs: [
          "Before you launch [Fin](/agents/intercom-fin), [Agentforce](/agents/agentforce), or [Sierra](/agents/sierra), write the sentences the agent must not produce. Refunds over a line. Admissions of fault. Medical or legal claims. Promises about a roadmap. This list is shorter than the help center and more important.",
          "If executives disagree about the list, you do not have an AI project. You have a policy argument. Software will not chair it.",
        ],
      },
      {
        heading: "Actions are speech",
        paragraphs: [
          "A tool that issues a refund is a sentence with side effects. Put dollar limits in the tool, not in the prompt. Prompts are suggestions. Limits are engineering. The [memory and tools essay](/briefings/memory-and-tools) walks through the same idea outside support.",
          "Handoff is part of the answer. A customer should land on a person with the transcript, not in a new queue that asks them to start over. Test the handoff once a week by being a customer.",
        ],
      },
      {
        heading: "Sample like you mean it",
        paragraphs: [
          "Fifty transcripts, every Friday, including the ones marked resolved. Look for confident wrongness, not for tone. Tone is how vendors distract a review. A polite mistake is still a mistake, and it is harder to spot.",
          "Outcome pricing only works if your sample agrees with the vendor’s definition of resolved. If you are not sampling, you are not buying an outcome. You are buying a story about one.",
        ],
      },
    ],
  },
  {
    slug: "before-you-buy",
    title: "Twelve questions before you buy an agent seat",
    kicker: "Buying",
    dek: "A short list you can take into a sales call. If the answers are slides, you are not ready.",
    topic: "workplace",
    author: "mara-ellison",
    date: "14 October 2026",
    sections: [
      {
        heading: "The job",
        paragraphs: [
          "What artifact does a good run leave? Who is allowed to approve it? What is the smallest task that would count as success in two weeks, and what would count as stop? If the buyer cannot answer, the vendor will answer with a demo, and the demo will choose the task.",
          "Which existing product almost does this? If the answer is “chat, but we are bored of it,” you may not have a job yet. Read [agents and chatbots](/briefings/agents-and-chatbots).",
        ],
      },
      {
        heading: "The boundaries",
        paragraphs: [
          "What data will the run see? Where is the trajectory stored, and for how long? Can you delete it? Can an admin turn the agent off without a ticket? Which tools move money, mail, or customer records, and what is the hard limit?",
          "Does the price match the job — seat, usage, or outcome — and what does a bad month cost? The [cost essay](/briefings/what-agents-cost) has the shapes. Ask for the bad month, not the pilot credit.",
        ],
      },
      {
        heading: "The people",
        paragraphs: [
          "Who owns the content the agent relies on? Who samples failures? What is out of scope on purpose? A vendor-supplied success story is not a substitute. Bring a failure from your own backlog and ask them to attempt it live, or to say no.",
          "If you can get plain answers, shortlist from the [ranking](/rankings) instead of from an ad. If you cannot, buy nothing. A year of chat is cheaper than a quarter of cleanup.",
        ],
      },
    ],
  },
  {
    slug: "computer-use",
    title: "Computer use is a permission problem wearing a demo",
    kicker: "Safety",
    dek: "Watching an agent click is satisfying. Giving it the browser where you are logged in is not a plan.",
    topic: "general",
    author: "jonah-park",
    date: "9 October 2026",
    sections: [
      {
        heading: "What you are actually granting",
        paragraphs: [
          "Computer use lets a model operate a graphical interface: look at the screen, click, type, scroll. [Claude](/agents/claude), [ChatGPT](/agents/chatgpt), and cloud agents like [Manus](/agents/manus) all have versions of this. The capability is real. The thing you granted is a person-shaped session on a machine.",
          "APIs are safer when they exist, because the action is narrow. Computer use is what you reach for when there is no API. That is a reason to use it sparingly, not a reason to be impressed.",
        ],
      },
      {
        heading: "A separate profile",
        paragraphs: [
          "Give the agent a browser profile with no saved passwords, no payment methods, and no company admin. Log in only to the one site the task needs, and prefer a low-privilege account. When the task is done, end the session. This feels fussy until the first prompt injection, which will arrive as text on a page the agent was supposed to read.",
          "The [glossary](/glossary) defines prompt injection without the thriller music. Untrusted text will try to give orders. The defense is what the session is allowed to touch if it obeys the wrong order.",
        ],
      },
      {
        heading: "Watch the loop",
        paragraphs: [
          "A computer-use product you cannot pause is not finished. You should see the next click before it happens on any task you care about. Speed runs are for vendors. Takeovers are for you.",
          "Do not confuse a successful demo — book a table, scrape a list — with a standing automation. Demos use clean sites. Your vendors’ portals do not. If the task is weekly, ask for an API, a CSV export, or a person.",
        ],
      },
    ],
  },
  {
    slug: "memory-and-tools",
    title: "Memory, tools, and the three permissions that matter",
    kicker: "Design",
    dek: "Agents feel personal when they remember, and dangerous when you cannot see the memory or the tool.",
    topic: "general",
    author: "mara-ellison",
    date: "2 October 2026",
    sections: [
      {
        heading: "See it, edit it, delete it",
        paragraphs: [
          "Memory is a stored note the product brings back later. The acceptable version is a list you can open. The unacceptable version is a hidden profile that changes the agent’s behavior in ways support cannot explain. This applies to general agents and to [personal](/topics/personal) ones like [Lindy](/agents/lindy).",
          "If a setting says the product “learns your style,” click until you find the actual text. If there is no text, assume the worst and turn it off for work that other people will read.",
        ],
      },
      {
        heading: "Three permissions",
        paragraphs: [
          "Read, draft, and commit. Almost every serious workflow can be described as a combination of those. Read the doc. Draft the reply. A person commits — sends, merges, pays, updates the record. Products that skip to commit because “the demo is better” are asking you to skip the control that makes agents usable.",
          "Tools should implement the same split. A send-mail tool and a draft-mail tool are different products. Prefer the second until the first has earned boredom. [Zapier](/agents/zapier) users feel this every time an old action is too powerful.",
        ],
      },
      {
        heading: "Logs are part of the feature",
        paragraphs: [
          "A trajectory you can export is how you debug and how you explain a mistake to a customer. If the plan is visible only while the run is live, you do not have an audit trail. You have a show.",
          "Write the three permissions into the pilot doc. When someone asks for a new connector, ask which of the three it is. Connectors that are secretly “commit” need a second conversation.",
        ],
      },
    ],
  },
];
