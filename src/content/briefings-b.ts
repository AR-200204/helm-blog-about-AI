import type { Briefing } from "./types";

export const briefingsB: Briefing[] = [
  {
    slug: "personal-stack",
    title: "A sane personal stack, not seven subscriptions",
    kicker: "Personal",
    dek: "One general agent, one research habit, and maybe a coordinator. The rest is noise.",
    topic: "personal",
    author: "jonah-park",
    date: "24 September 2026",
    sections: [
      {
        heading: "Start from the week",
        paragraphs: [
          "List the ten tasks you actually repeat. Most people need a writer-researcher and a place for files. That is a general agent — [Claude](/agents/claude) or [ChatGPT](/agents/chatgpt) — plus a folder. Add [Perplexity](/agents/perplexity) only if you click sources for a living. Add [Lindy](/agents/lindy) only if something must happen while the laptop is closed.",
          "A stack of seven agents is not sophistication. It is seven places a draft can hide. The [cost essay](/briefings/what-agents-cost) is what that looks like on a card statement.",
        ],
      },
      {
        heading: "Unattended means smaller",
        paragraphs: [
          "Anything that runs when you are away gets fewer permissions, not more. Draft, do not send. A separate inbox label beats full access. The [permissions piece](/briefings/memory-and-tools) is the rule; personal use is where people waive it because the only victim seems to be themselves.",
          "Your future self is the victim. So is anyone you email by mistake.",
        ],
      },
      {
        heading: "Review on Sunday",
        paragraphs: [
          "Once a week, read what the unattended agent did and delete memory you do not recognize. If the review is empty because you avoided it, turn the agent off. A tool you will not supervise is a tool you do not have.",
          "Work accounts do not belong in a personal stack. Use the company tenant. Shadow IT with your household login is how strategy docs end up in a consumer memory feature.",
        ],
      },
    ],
  },
  {
    slug: "do-not-delegate",
    title: "Work you should not hand to an agent",
    kicker: "Judgment",
    dek: "A short refuse list. It will feel cautious. It is cheaper than the alternative.",
    topic: "general",
    author: "mara-ellison",
    date: "17 September 2026",
    sections: [
      {
        heading: "The list",
        paragraphs: [
          "Do not delegate the decision to fire, diagnose, sue, price a life-changing contract, or tell a customer the company was at fault. Do not delegate production access, wire transfers, or the merging of code nobody read. Do not delegate a message you would be ashamed to have misunderstood.",
          "You may delegate the preparation: the timeline, the draft, the diff, the stack of citations. Preparation is the whole legitimate business of agents. The [definition essay](/briefings/what-counts-as-an-agent) calls the result an artifact for a reason. Artifacts wait for you.",
        ],
      },
      {
        heading: "Gray areas",
        paragraphs: [
          "Refunds under a written limit are fine inside [Fin](/agents/intercom-fin) or a similar tool. Refunds as a vibe are not. Legal research inside [Harvey](/agents/harvey) is fine. Legal advice from a general chat, pasted from a client file, is not. The pattern is: a written boundary, a person, a log.",
          "Coding migrations of authentication, billing, and data deletion belong on the refuse list for the first months of any new tool. Not because agents cannot edit those files. Because you cannot review them casually.",
        ],
      },
      {
        heading: "Post the list",
        paragraphs: [
          "Put it where the pilot lives. A refuse list that stays in a magazine is a pose. A refuse list in the team channel is a control. Update it when you are surprised, not when a vendor is.",
          "People will say the list is timid. Ask them to add one item they would stake their name on. The conversation that follows is the governance program.",
        ],
      },
    ],
  },
  {
    slug: "open-source-runtimes",
    title: "Open-source agent runtimes, without the framework tour",
    kicker: "Building",
    dek: "LangGraph, CrewAI, AutoGen, Mastra, and the itch to build what you could have bought.",
    topic: "coding",
    author: "luis-ferreira",
    date: "11 September 2026",
    sections: [
      {
        heading: "A runtime is not a product",
        paragraphs: [
          "Open-source frameworks let you build an agent loop: plan, call tools, store state, stop. They are how internal tools get made, and how weekends disappear. They are not in the top twenty because a framework without your tools, your data, and your on-call is not a product a reader can rank.",
          "Choose a framework when the off-the-shelf agents cannot see the system only you have. Do not choose one because a talk made multi-agent graphs look like architecture. The [multi-agent piece](/briefings/multi-agent) is the skepticism.",
        ],
      },
      {
        heading: "What to borrow",
        paragraphs: [
          "Borrow the ideas, even if you buy [Zapier](/agents/zapier) or a suite. Explicit state. A maximum step count. Tools that are functions, not vibes. A human stop before commit. Those travel. A particular graph DSL might not.",
          "If you build, log the trajectory from day one. You will not add logging later, and you will need it the first time the agent does something you cannot reproduce.",
        ],
      },
      {
        heading: "A fair reason to build",
        paragraphs: [
          "A fair reason is a workflow inside your product: your users, your permissions, your audit. An unfair reason is “the API is cheaper than seats” before you have counted engineering time. It is not cheaper. It is differently expensive. See [what agents cost](/briefings/what-agents-cost).",
          "Host the model wherever your security review already allows. The framework will not save a key you pasted into a notebook.",
        ],
      },
    ],
  },
  {
    slug: "privacy-review",
    title: "A privacy review you can send a vendor",
    kicker: "Trust",
    dek: "Ten questions that fit in an email. The ones they dodge are the answer.",
    topic: "workplace",
    author: "adele-okonkwo",
    date: "3 September 2026",
    sections: [
      {
        heading: "Ask in writing",
        paragraphs: [
          "Where is the prompt stored? Is it used to train a model, and is that off by default for this plan? Who at the vendor can read a run? How long are trajectories kept? Can we delete a user’s data, and how fast? Which subprocessors see the content?",
          "Send the same list every time. [Our privacy policy](/privacy) explains what this site itself does, which is very little. A vendor agent is the opposite shape. It exists to see your work.",
        ],
      },
      {
        heading: "Training and tenants",
        paragraphs: [
          "Consumer plans and enterprise plans often differ on training. Do not assume the toggle you saw in a personal account exists at work, or the reverse. Ask which plan you are being sold. Ask what happens to data in a trial.",
          "A workplace agent that mixes tenants is a broken product. Ask how isolation is enforced, not whether they “take security seriously.” Everyone takes it seriously in the first paragraph of the PDF.",
        ],
      },
      {
        heading: "Bring your own boundary",
        paragraphs: [
          "Even a good answer does not mean you should upload everything. Keep the [refuse list](/briefings/do-not-delegate). Use a separate computer-use profile. Prefer products that inherit permissions you already manage, like the suites and [Notion](/agents/notion), when the corpus is internal.",
          "If the vendor will not answer in writing, stop the pilot. You do not need a more persuasive demo.",
        ],
      },
    ],
  },
  {
    slug: "multi-agent",
    title: "Multi-agent systems, after the demo ends",
    kicker: "Design",
    dek: "Several models with job titles can be a design. They can also be a way to spend tokens in a circle.",
    topic: "coding",
    author: "luis-ferreira",
    date: "27 August 2026",
    sections: [
      {
        heading: "When a second agent helps",
        paragraphs: [
          "A second role helps when you want a checker who did not write the draft: one pass to research, one pass to try to refute the sources. It helps when tools are safer split — a reader with no send button, a sender with no creativity. It rarely helps because you drew an org chart of six personas.",
          "The [glossary](/glossary) definition is deliberately dry. Job titles in a prompt are not employees. They do not create accountability. A person’s name on the review does.",
        ],
      },
      {
        heading: "The failure mode",
        paragraphs: [
          "Agents in a loop agree with each other. They also deadlock, repeat work, and produce a transcript nobody reads. If you cannot point to the step that may commit a change, you have a play, not a system. Cap the steps. Log the handoffs. Prefer one agent with good tools until that agent is the bottleneck.",
          "Frameworks make this easy to overbuild. That is not a reason to avoid them. It is a reason to start with one node. More in [open-source runtimes](/briefings/open-source-runtimes).",
        ],
      },
      {
        heading: "A buying implication",
        paragraphs: [
          "Be wary of a product whose main slide is a swarm. Ask what a single agent in the same product does on your task. If the swarm is the only way it works, ask to see a failed run. Swarms hide failure in bulk.",
          "None of the top twenty earned its seat by having the most internal personas. They earned it by leaving an artifact a person could check.",
        ],
      },
    ],
  },
  {
    slug: "week-in-code",
    title: "A week in the life of a coding agent",
    kicker: "Coding",
    dek: "Monday’s issue through Friday’s merge, and the hour that decides whether the tool stays.",
    topic: "coding",
    author: "luis-ferreira",
    date: "20 August 2026",
    sections: [
      {
        heading: "Monday",
        paragraphs: [
          "Triage the queue. Anything without reproduction steps goes back to a person. The agent-ready label gets five issues, not fifty. You assign two to [Copilot’s coding agent](/agents/github-copilot) or [Devin](/agents/devin) if you are paying for asynchronous work, and you keep the rest for a foreground session in [Cursor](/agents/cursor) or [Windsurf](/agents/windsurf).",
          "You write the test command in the issue. You are already tired. This is the point. The agent is not smarter than your preparation.",
        ],
      },
      {
        heading: "Wednesday",
        paragraphs: [
          "Two pull requests are useful. One is a large reformatting with a bugfix hiding in it. You reject that one in a sentence. One issue stalled because a secret was missing, which is good news. You do not paste the secret into the agent. You split the task.",
          "Someone on the team says the agent is slower than typing. Sometimes they are right. The [field notes](/briefings/coding-agent-field-notes) admit which chores lose to a person. Let them. The goal is the chores that do not.",
        ],
      },
      {
        heading: "Friday",
        paragraphs: [
          "You sample the merged diffs, not the dashboard of “accepted suggestions.” You look for weakened tests. You look for new dependencies you did not discuss. Then you delete the agent-ready label from anything that felt fuzzy. Next week’s queue gets smaller and better, or the experiment ends.",
          "A coding agent that survives a month of this is worth a standard. A coding agent that only survives demos is a slide. Rankings are downstream of weeks like this. That is the [methodology](/methodology), lived in.",
        ],
      },
    ],
  },
  {
    slug: "what-agents-cost",
    title: "What agents cost when the invoice is honest",
    kicker: "Money",
    dek: "Seats, tokens, outcomes, and the engineering time nobody puts in the pilot spreadsheet.",
    topic: "workplace",
    author: "adele-okonkwo",
    date: "12 August 2026",
    sections: [
      {
        heading: "Three shapes",
        paragraphs: [
          "Seat prices are familiar and blunt. You pay even if the person uses chat twice. Usage prices track heavy runs and punish the curious. Outcome prices, common in support and in pitches like [Sierra](/agents/sierra), charge for a result and argue about the definition. None is morally superior. Each hides a different surprise.",
          "We do not print vendor price lists. They change, and a stale number becomes a false one. Ask for the current order form. Compare it with a bad month, not a demo week.",
        ],
      },
      {
        heading: "The costs around the invoice",
        paragraphs: [
          "Someone has to write the corpus, sample the transcripts, review the diffs, and answer the [privacy questions](/briefings/privacy-review). That time is the product. A cheap seat with no owner is the expensive option. [Devin](/agents/devin) taught the desk to put value in the composite for this reason.",
          "Double subscriptions are the quiet leak. A company paying for [Microsoft 365 Copilot](/agents/microsoft-365-copilot), a general agent, a coding editor, and a research tool may be correct. It may also be four habits that never got a job description. The [personal stack](/briefings/personal-stack) scales up to teams more often than leaders admit.",
        ],
      },
      {
        heading: "A simple sheet",
        paragraphs: [
          "Rows: license, expected usage overage, review hours, cleanup hours, and the cost of one public mistake. If you cannot estimate the last row, you are not ready to automate commit actions. Fill the sheet before the pilot expands, then keep it. The ranking’s value column is this sheet, expressed as a number from one to ten.",
          "Cancel anything that loses to “a person with chat and a checklist” after a month. That sentence should be in the pilot doc, agreed while everyone is still polite.",
        ],
      },
    ],
  },
  {
    slug: "rollout",
    title: "Rolling an agent out at work without a shadow IT mess",
    kicker: "Workplace",
    dek: "A pilot is a boundary with a date. A rollout is what happens when you skip the date.",
    topic: "workplace",
    author: "adele-okonkwo",
    date: "5 August 2026",
    sections: [
      {
        heading: "One job, one owner, one date",
        paragraphs: [
          "Pick a job narrow enough to fail clearly. Name a human owner. Name an end date when you will expand, shrink, or kill it. [Microsoft 365 Copilot](/agents/microsoft-365-copilot) rollouts go wrong when the license arrives for everyone and the job arrives for no one. [Notion](/agents/notion) rollouts go wrong when every team builds a bot the same week.",
          "Shadow IT is a second pilot you do not know about. Publish an allowed list. A personal [ChatGPT](/agents/chatgpt) account with company files is not a pilot. It is a leak with a cheerful icon.",
        ],
      },
      {
        heading: "Admin before applause",
        paragraphs: [
          "Turn on logging. Turn off tools that commit. Set the refuse list from [the judgment piece](/briefings/do-not-delegate). Tell people the agent is a draft machine. If you tell them it is magic, they will hide the mistakes to match the story.",
          "Security reviews are not a delay tactic. Send the [privacy review](/briefings/privacy-review) on day one so the answers can arrive before habit does.",
        ],
      },
      {
        heading: "The decision meeting",
        paragraphs: [
          "At the end date, look at artifacts, not at monthly active users. Active users of a toy are easy. Useful diffs and trustworthy answers are not. Decide in the meeting. A pilot with no decision is a rollout wearing a costume.",
          "Then update the internal wiki in a page a new hire can find. The agent is now part of the building. Undocumented buildings are how the next team buys a duplicate.",
        ],
      },
    ],
  },
  {
    slug: "browser-agents",
    title: "Browser agents, from a guided click to a rented computer",
    kicker: "Tools",
    dek: "Some agents browse beside you. Some take the browser with them. The difference is the session.",
    topic: "general",
    author: "jonah-park",
    date: "29 July 2026",
    sections: [
      {
        heading: "A spectrum",
        paragraphs: [
          "On one end, a research product opens pages and shows them to you. [Perplexity](/agents/perplexity) and its Comet browser live here. On the other end, a cloud computer clicks while you do something else. [Manus](/agents/manus) and the agent modes inside [ChatGPT](/agents/chatgpt) and [Claude](/agents/claude) can live there. Same verb, different risk.",
          "Guided browsing is a reading aid. Unattended browsing is computer use. Apply the [computer-use rules](/briefings/computer-use) to the second and do not talk yourself into applying them halfway.",
        ],
      },
      {
        heading: "The page is hostile",
        paragraphs: [
          "Pages contain ads, prompt injections, lookalike buttons, and terms you did not read. An agent that “accepts all” to get to the content has opinions about your privacy you did not approve. Prefer products that show the click. Prefer tasks on sites you could have scripted.",
          "Captchas and logins are not a puzzle for the agent to heroically solve. They are a sign you should stop and use an export, an API, or a person. Solving a captcha with a rented computer is also a good way to get the account banned.",
        ],
      },
      {
        heading: "Keep a receipt",
        paragraphs: [
          "Save the final file and the list of URLs if the product lets you. A briefing with no trail is a rumor. If a browser agent cannot produce a trail, use it for throwaway scans only.",
          "Do not store the company’s password manager inside a browser an agent drives. Type a single low-privilege login for a single task, then sign out. This is slower. It is the speed the risk deserves.",
        ],
      },
    ],
  },
];
