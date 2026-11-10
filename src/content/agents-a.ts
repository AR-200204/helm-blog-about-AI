import type { Agent } from "./types";

export const agentsA: Agent[] = [
  {
    slug: "claude",
    name: "Claude",
    vendor: "Anthropic",
    rank: 1,
    topic: "general",
    scores: { task: 9, tools: 8, reliability: 9, control: 9, value: 8 },
    dek: "The desk’s first call when the work is long, the stakes are real, and someone still has to read the result.",
    pull: "Claude is not the loudest agent. It is the one we trust with the second draft of something a person will sign.",
    bestFor: "Long documents, careful coding sessions, and tool use where you want the plan visible.",
    skipIf: "You need the widest consumer app store, or a bot that lives inside a CRM you already bought.",
    author: "mara-ellison",
    updated: "9 November 2026",
    sections: [
      {
        heading: "The job it is hired for",
        paragraphs: [
          "Open Claude when the pile is a contract, a repository, and a question that does not fit in a chat bubble. Anthropic’s product is the reference general agent in this issue because the same account can hold a serious writing project, a coding session through Claude Code, and a computer-use run that clicks through software with no clean API.",
          "That range is why it sits above specialists that beat it on a single lane. A [coding agent](/topics/coding) may land a pull request with less ceremony. Claude is the seat we keep when the task changes shape halfway through and the user still wants a readable trail.",
        ],
      },
      {
        heading: "Where the rank comes from",
        paragraphs: [
          "Reliability is the score that separates it. On long instructions it drifts less than the other generalists, and it is better at saying the source does not support a sentence. Projects and artifacts give the work a place to live that is not a scrolling transcript. Computer use is no longer a party trick: it is a mode you turn on for a specific machine, with a screen you can watch.",
          "Claude Code changed the product for engineers. It is still an agent in a terminal, which means it inherits your files and your mistakes. Used with a branch and a test command, it is one of the few general agents that can sit next to [Cursor](/agents/cursor) without feeling like a tourist.",
        ],
      },
      {
        heading: "Where it disappoints",
        paragraphs: [
          "Tool breadth is not the widest in the table. ChatGPT still reaches more consumer surfaces, and Microsoft’s agent meets you inside Word whether you asked for a new vendor or not. Claude’s computer use can be slow, and a shifted dialog box still wastes a run. The product is also serious about refusals, which is correct, and occasionally maddening when the refusal is aimed at a benign excerpt.",
          "Price is a seat plus usage, and heavy agent runs are not a rounding error. If your team will not read the trajectory, you are paying for a careful worker and then ignoring the care. That is a buying mistake, not a reason to drop the rank.",
        ],
      },
      {
        heading: "How the desk would deploy it",
        paragraphs: [
          "Give it a project per client or repo. Allow tools one workflow at a time. Require a person to send mail, merge code, and move money. Use computer use on a spare profile, never on the browser where you are logged into a bank. Write the house style in the project instructions so you are not re-teaching it every Monday.",
          "If you only buy one general agent this year, buy this one and a specialist that matches your queue. The rest of the ranking is about that second seat. The [methodology](/methodology) explains why a one-point gap is not a verdict.",
        ],
      },
    ],
  },
  {
    slug: "chatgpt",
    name: "ChatGPT",
    vendor: "OpenAI",
    rank: 2,
    topic: "general",
    scores: { task: 9, tools: 9, reliability: 7, control: 7, value: 8 },
    dek: "The broadest agent most people can actually open, descended from Operator and still the default tab.",
    pull: "ChatGPT wins on reach. It does not win on the days when you need it to be boring.",
    bestFor: "Mixed personal and professional work, agent runs in a browser, and teams already paying for the plan.",
    skipIf: "Your security review wants a narrower tool list and a calmer default.",
    author: "jonah-park",
    updated: "9 November 2026",
    sections: [
      {
        heading: "Still the default tab",
        paragraphs: [
          "ChatGPT is the agent people mean when they say “the AI” and then look embarrassed. The product now does more than answer. Agent mode, the line that grew out of Operator, can use a browser to finish errands. Custom GPTs and the built-in tools cover files, images, data analysis, and code. Codex sits in the same family for repository work.",
          "Breadth is the argument for rank two. A single login covers a student, a marketer, and an engineer, which is why it beats narrower products that are better at one job. The [general agents](/topics/general) desk is a fight about that trade.",
        ],
      },
      {
        heading: "What the tools are worth",
        paragraphs: [
          "The tool score is a 9 because the product will attempt almost anything you can describe, and often has a first-party way to do it. Scheduled tasks, voice, file creation, and browsing are not separate startups. They are tabs. For a household or a small team, that consolidation is the value.",
          "Agent runs that browse are the ones to watch. They are genuinely useful on sites without APIs, and they are exposed to every prompt-injection trick a web page can carry. Read the [computer-use briefing](/briefings/computer-use) before you save a password in a browser the agent drives.",
        ],
      },
      {
        heading: "The reliability tax",
        paragraphs: [
          "ChatGPT is more willing than Claude to produce a finished-looking answer when the evidence is thin. That is a gift in a brainstorm and a defect in a briefing. We docked reliability and control for the number of times the desk had to ask “where did that come from?” and get a confident pointer to a page that did not say it.",
          "Custom GPTs make this worse if you treat them as products. A GPT with a vague instruction and a plugged-in tool is an agent with no runbook. OpenAI gives you the parts. It does not make the parts a system.",
        ],
      },
      {
        heading: "A practical trial",
        paragraphs: [
          "Spend a week using agent mode only for tasks with an artifact: a downloaded file, a filled sheet, a code change on a branch. Ban it from sending messages. Compare the week with a week of ordinary chat. If you cannot tell them apart, you are paying for an agent and using a chatbot, which is fine, but then do not buy a second agent product yet.",
          "Teams that already standardized on ChatGPT should not switch to Claude out of fashion. They should route the careful work there and keep ChatGPT for reach. The [buyers’ questions](/briefings/before-you-buy) are the checklist either way.",
        ],
      },
    ],
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    vendor: "GitHub",
    rank: 3,
    topic: "coding",
    scores: { task: 8, tools: 8, reliability: 8, control: 8, value: 8 },
    dek: "The coding agent that shows up where the work already lives: the issue, the pull request, and the review.",
    pull: "Copilot’s coding agent is not the cleverest editor. It is the one your reviewer will actually see.",
    bestFor: "Teams on GitHub who want an agent to attempt issues and open reviewable pull requests.",
    skipIf: "Your source of truth is not GitHub, or you want a pair programmer sitting in the keystrokes.",
    author: "luis-ferreira",
    updated: "9 November 2026",
    sections: [
      {
        heading: "An agent with a return address",
        paragraphs: [
          "GitHub Copilot began as autocomplete. The coding agent is a different product wearing a familiar name. You assign it an issue. It works on a branch, runs commands in a provisioned environment, and opens a pull request. The review happens in the same place your team already argues about changes.",
          "That is why it ranks above agents that feel more magical in a demo. A pull request is an artifact with a diff, a test log, and a person who can say no. Read [a week with a coding agent](/briefings/week-in-code) for how that rhythm goes wrong when the queue is sloppy.",
        ],
      },
      {
        heading: "Even scores, on purpose",
        paragraphs: [
          "Copilot’s row is a string of eights. It is not the strongest coder in isolation. Cursor is more aggressive inside an editor. Devin will attempt a larger unsupervised leap. Copilot is the one that fits a normal engineering system without asking the team to adopt a new religion.",
          "The control score is high because GitHub’s permission model is the one developers already understand: repository access, branch protections, required reviews. An agent that cannot merge its own work is a feature.",
        ],
      },
      {
        heading: "What it will not do",
        paragraphs: [
          "It will not rescue a ticket that says “make it better.” Vague issues produce vague pull requests, and the agent will look stupid in public. It is also less helpful if the real environment cannot be reproduced in the hosted runner: private databases, hardware, and ceremonial build steps still need a person.",
          "Inline completions remain useful and are not this ranking. Do not confuse the two when someone on the team says Copilot is fine. Ask which product they meant.",
        ],
      },
      {
        heading: "How to trial it without a mess",
        paragraphs: [
          "Pick a label, agent-ready, and apply it only to issues with reproduction steps and a test to run. Let the agent open drafts. Turn on branch protection so a green check is not a merge. Review ten pull requests before you discuss whether it saved time. Count the ones you closed unchanged. That number is the product.",
          "If your engineers live in [Cursor](/agents/cursor) or [Windsurf](/agents/windsurf) all day, keep those for the editing session and use Copilot’s agent for the work that should arrive asynchronously. Two tools is not a failure of commitment.",
        ],
      },
    ],
  },
  {
    slug: "cursor",
    name: "Cursor",
    vendor: "Anysphere",
    rank: 4,
    topic: "coding",
    scores: { task: 9, tools: 8, reliability: 7, control: 7, value: 8 },
    dek: "The editor that stopped waiting for a completion and started taking the next change itself.",
    pull: "Cursor is the best place to watch an agent think, and the easiest place to let it think too long.",
    bestFor: "Developers who want a foreground agent in the repo they have open.",
    skipIf: "You need a company-wide agent that runs from issues while you are in meetings.",
    author: "luis-ferreira",
    updated: "9 November 2026",
    sections: [
      {
        heading: "Foreground, not folklore",
        paragraphs: [
          "Cursor is an editor with an agent in the room. You point it at a codebase, describe a change, and watch it read files, edit, and run commands. Background agents extend that to work that continues when the laptop lid is closed. The reason it ranks this high is simple: the task score is a 9. On a well-bounded change it is the tool the tools editor reaches for first.",
          "It is not a substitute for review culture. The [coding field notes](/briefings/coding-agent-field-notes) cover the habit that matters: small tasks, a test command, a diff you read.",
        ],
      },
      {
        heading: "Why control is a 7",
        paragraphs: [
          "The same speed that makes Cursor good makes it easy to accept a large edit you did not understand. The product shows the diff. It cannot make you read it. Teams that treat “apply all” as a personality will create a week of bugs and blame the model.",
          "Reliability is a 7 because the agent sometimes repairs a symptom and leaves the design alone, or edits a generated file, or “fixes” a test by weakening it. Those are ordinary coding-agent failures. Cursor hits them at a rate we are willing to manage, not ignore.",
        ],
      },
      {
        heading: "Against the other editors",
        paragraphs: [
          "[Windsurf](/agents/windsurf) is the closest rival and a calmer one. [Copilot](/agents/github-copilot) is the better asynchronous teammate if the work starts as an issue. Devin aims at a longer leash and charges like it. Cursor is the daily driver.",
          "Model choice inside the product moves the feel of the agent more than the chrome does. If you switch models every hour you will never learn the tool. Pick one for a week.",
        ],
      },
      {
        heading: "A clean way to start",
        paragraphs: [
          "Use it on a branch. Give it the test command in the first message. Ask for a plan only when the change crosses more than two modules. Reject edits that include drive-by formatting of unrelated files. That single rule cuts the review time in half.",
          "Do not buy Cursor for a team that does not write tests and does not review. You will get velocity of a kind, and you will not know what it cost until a customer does.",
        ],
      },
    ],
  },
  {
    slug: "gemini",
    name: "Gemini",
    vendor: "Google",
    rank: 5,
    topic: "research",
    scores: { task: 8, tools: 8, reliability: 7, control: 8, value: 8 },
    dek: "Google’s agent, strongest when the work already sits in mail, docs, and a search box you trust.",
    pull: "Gemini’s advantage is not mystery. It is that your files were already there.",
    bestFor: "Research briefs and Workspace-heavy teams who want an agent inside the suite.",
    skipIf: "You need a coding agent that lives in the repository, or you do not use Google’s tools.",
    author: "adele-okonkwo",
    updated: "9 November 2026",
    sections: [
      {
        heading: "Distribution as a design",
        paragraphs: [
          "Gemini is several products under one name: the consumer app, Deep Research, the Workspace side that can see Docs and Gmail when you allow it, and siblings like Jules aimed at code. We rank the agent a knowledge worker actually meets, not every Google experiment with the same logo.",
          "The research seat is the right filing. Deep Research is the mode that tries to come back with a sourced briefing instead of a paragraph. It belongs next to [Perplexity](/agents/perplexity), and the comparison is in [the research desk](/briefings/research-desks).",
        ],
      },
      {
        heading: "Why control scores well",
        paragraphs: [
          "Workspace is an admin’s world. That is a compliment. An agent that can be limited by the same organizational policies as Drive is easier to defend than a startup that wants a blanket OAuth grant. The control score is an 8 for that reason, not because the model is cautious in prose.",
          "Value is high if you already pay for the suite. Adding a separate general agent on top, without a job it does better, is how teams end up with three subscriptions and no habit. The [cost piece](/briefings/what-agents-cost) is the arithmetic.",
        ],
      },
      {
        heading: "The mush in the middle",
        paragraphs: [
          "Reliability is a 7. Deep Research can produce a long, official-looking document whose individual citations are real and whose connecting sentences are still wishful. You have to open the sources. The product makes that possible more often than a naked chat, and not often enough to skip it.",
          "Jules and the coding experiments are not why Gemini is on this list. If code is the job, go to the [coding topic](/topics/coding). Using Gemini as your only engineer is a category error.",
        ],
      },
      {
        heading: "Deployment that respects the suite",
        paragraphs: [
          "Turn on the Workspace connection for a pilot group, not the company. Ask for research briefs with a required source list. Forbid the agent from sending mail in the pilot. Compare one week of briefs with the briefs your analysts already write. You are looking for time saved after checking, not time saved before.",
          "If the pilot group cannot explain where a fact came from, you do not have an agent program. You have a faster way to be wrong in your own templates.",
        ],
      },
    ],
  },
  {
    slug: "windsurf",
    name: "Windsurf",
    vendor: "Windsurf",
    rank: 6,
    topic: "coding",
    scores: { task: 8, tools: 8, reliability: 7, control: 7, value: 8 },
    dek: "Cascade, the agent inside Windsurf, is the calmer editor-shaped rival to the noisier coding tools.",
    pull: "Windsurf feels like a colleague who shows the diff before narrating it.",
    bestFor: "Engineers who want an in-editor agent and a slightly stricter pace than Cursor.",
    skipIf: "Your org has already standardized on Copilot and does not want a second editor.",
    author: "luis-ferreira",
    updated: "9 November 2026",
    sections: [
      {
        heading: "Cascade is the product",
        paragraphs: [
          "Windsurf’s agent is Cascade. You describe a flow of work. It edits, runs, and keeps a trail in the editor. The corporate story around the product has been noisier than the product. This profile ignores the cap table and reviews the tool in front of a repository.",
          "It ties several peers on the composite and ranks above them because a diff you can read is the tie-break in our [methodology](/methodology). Windsurf shows its work in the place the work happens.",
        ],
      },
      {
        heading: "A different temperament",
        paragraphs: [
          "Next to [Cursor](/agents/cursor), Cascade is less eager to expand the task. That costs it a point on raw task completion and saves time in review. Teams who felt burned by agents that “helpfully” refactor a neighboring module often prefer this temperament.",
          "The tool use is real: terminal, files, and a context the editor already has. It is not a cloud employee. If you want the issue-to-pull-request loop, that is still [Copilot’s coding agent](/agents/github-copilot) or a carefully fenced Devin.",
        ],
      },
      {
        heading: "Limits",
        paragraphs: [
          "Reliability matches the rest of the editor class. It will sometimes declare victory with a test still red, or miss a call site. You notice quickly because you are sitting there, which is the hidden advantage of foreground agents over overnight ones.",
          "Value depends on whether anyone will switch editors. A better agent inside an editor nobody opens is a blog post, not a deployment. Run the trial with volunteers who already want a new editor, then decide if it earns a standard.",
        ],
      },
      {
        heading: "Trial rules",
        paragraphs: [
          "Two weeks, one repo, no drive-by adoption in the platform team. Keep a shared note of tasks that took less time and tasks that took more because the diff was large. If the second list is longer, stop. The agent is not your culture.",
          "Pair the trial with the [do-not-delegate list](/briefings/do-not-delegate). Migrations of authentication do not belong to a first month with any coding agent, including this one.",
        ],
      },
    ],
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    vendor: "Perplexity",
    rank: 7,
    topic: "research",
    scores: { task: 8, tools: 7, reliability: 8, control: 7, value: 8 },
    dek: "A research agent that treats the citation as the product, not as a garnish under the paragraph.",
    pull: "Perplexity is what you open when the cost of a made-up source is higher than the cost of reading.",
    bestFor: "Cited briefs, market scans, and readers who will click the footnotes.",
    skipIf: "You need the agent to change files, records, or a repository.",
    author: "jonah-park",
    updated: "9 November 2026",
    sections: [
      {
        heading: "A narrow excellence",
        paragraphs: [
          "Perplexity is not trying to be your employee. It is trying to answer with sources you can open, then go a step further in research mode and in the Comet browser, where that habit sits beside the page. The narrowness is why the tool score is a 7 and the reliability score is an 8.",
          "On the [research desk](/topics/research) it is the specialist. [Gemini](/agents/gemini) brings your private documents. Perplexity is stronger when the corpus is the public web and the deliverable is a briefing with links that match the claims.",
        ],
      },
      {
        heading: "What an 8 in reliability means",
        paragraphs: [
          "It still makes mistakes. Pages get misread. A secondary blog gets the same visual weight as a primary filing. The difference is that the interface pushes the source into your hand, so the mistake is cheaper. Products that hide the source force you to fact-check from zero.",
          "We do not give it a higher task score because many jobs are not research. Asking Perplexity to operate your company is how you end up copying answers into the tool that should have been doing the job.",
        ],
      },
      {
        heading: "Comet and the browser question",
        paragraphs: [
          "A browser built around a research agent is a real product idea and a new place to save logins you will regret. The [browser-agent briefing](/briefings/browser-agents) applies here even though Perplexity is better behaved than a generic clicker. The page can still contain instructions aimed at the model.",
          "Use Comet for reading. Do not use it as the place you approve payments. That sentence should be in the team’s onboarding and not in a footnote.",
        ],
      },
      {
        heading: "How to use the rank",
        paragraphs: [
          "Buy Perplexity if people on your team already paste links into chats and then do not click them. The product repairs that habit. Skip it if your knowledge lives in a private workspace. Then you want [Notion](/agents/notion) or a retrieval setup you control, plus a public-web tool on the side.",
          "Always open two sources before a number enters a decision. The rank assumes you do. If you will not, no research agent is safe enough to matter.",
        ],
      },
    ],
  },
  {
    slug: "intercom-fin",
    name: "Intercom Fin",
    vendor: "Intercom",
    rank: 8,
    topic: "customer",
    scores: { task: 8, tools: 7, reliability: 8, control: 8, value: 7 },
    dek: "A support agent that is judged on resolved conversations, not on how human the small talk sounds.",
    pull: "Fin is a policy engine with a friendly voice. Judge the policy, not the voice.",
    bestFor: "Support teams with a maintained help center and a clear definition of resolved.",
    skipIf: "Your answers live in people’s heads, or a wrong reply creates legal exposure you cannot bound.",
    author: "adele-okonkwo",
    updated: "9 November 2026",
    sections: [
      {
        heading: "Resolution is the unit",
        paragraphs: [
          "Intercom Fin sits on the customer desk because it tries to finish a support conversation from your help center and your connected tools, then hand off when it should not. Outcome-style pricing is part of the pitch. The rank does not depend on the invoice. It depends on whether “resolved” matches what a customer would say.",
          "Read [what support agents are allowed to say](/briefings/support-floor) before the pilot. The content gap, not the model, is why these projects stall.",
        ],
      },
      {
        heading: "High control, on a good day",
        paragraphs: [
          "The control score is an 8 when you use the product as designed: sources you approve, actions you list, a handoff that reaches a person, and transcripts you can sample every Friday. Teams that turn on every action because the toggle exists will not earn that score in real life. The product allows a mess. It does not require one.",
          "Reliability is also an 8 inside a tight domain. Ask Fin about an unwritten exception and it should abstain. If your best agents are heroes who break policy to save accounts, an agent will either imitate them unsafely or look rigid. Decide which behavior you want before you automate it.",
        ],
      },
      {
        heading: "Where the value dips",
        paragraphs: [
          "Value is a 7 because the help center has to be good enough to deserve automation. If you need a quarter of writing before Fin is safe, put that cost in the business case. Many teams discover they wanted a writer, not an agent, and that is a useful discovery.",
          "It is the wrong tool for a law firm’s client mail or a clinical inbox. Those seats are closer to [Harvey](/agents/harvey) or to no agent at all. The [do-not-delegate list](/briefings/do-not-delegate) is short on purpose.",
        ],
      },
      {
        heading: "A pilot with a number",
        paragraphs: [
          "Choose one intent you can define: password resets, shipping status, refunds under a dollar amount. Sample fifty transcripts. Count wrong answers, not just happy ones. Compare the cost per contained conversation with the cost of the same conversation handled by a person, including the ones Fin touched and a person had to repair.",
          "If you cannot sample transcripts, do not expand. A support agent you cannot audit is a brand problem with a dashboard.",
        ],
      },
    ],
  },
  {
    slug: "zapier",
    name: "Zapier Agents",
    vendor: "Zapier",
    rank: 9,
    topic: "workplace",
    scores: { task: 7, tools: 9, reliability: 7, control: 7, value: 8 },
    dek: "The agent for teams whose real product is the glue between a hundred other products.",
    pull: "Zapier’s agent is a switchboard. It is only as smart as the actions you were willing to name.",
    bestFor: "Operators who already run Zapier and want a worker on top of those app connections.",
    skipIf: "You need deep work inside one suite, or you cannot describe the action as a step.",
    author: "adele-okonkwo",
    updated: "9 November 2026",
    sections: [
      {
        heading: "A tool score of 9",
        paragraphs: [
          "No product in this issue connects to more ordinary business software with less custom code. That is the entire argument. Zapier Agents sit on top of a library of actions teams already trust for moving a row, posting a message, or creating a task. The agent is the part that decides which action, and with what fields, when the request is messy.",
          "The task score stays a 7 because messy requests are where it still needs a runbook. An agent with a thousand tools and no allowed list is not flexible. It is lost. The [permissions briefing](/briefings/memory-and-tools) is written for this failure.",
        ],
      },
      {
        heading: "Against suite agents",
        paragraphs: [
          "[Microsoft 365 Copilot](/agents/microsoft-365-copilot) is better when the work never leaves the suite. [Notion](/agents/notion) is better when the workspace is the system of record. Zapier is better when the truth is scattered and the job is to carry a fact from one place to another without a person retyping it.",
          "Do not use it as a general writer. The prose is not why you are here. If the deliverable is a memo, open [Claude](/agents/claude) or the research desk and let Zapier do the filing afterward.",
        ],
      },
      {
        heading: "Reliability is the log",
        paragraphs: [
          "A 7 in reliability means the run log usually explains a miss. A wrong field mapping is visible. That is more operable than a chatbot that simply says something incorrect. It is still wrong. Build the first agents around actions a person can undo: draft a record, do not email a customer.",
          "Control is a 7, not an 8, because the temptation is to grant the agent every Zap the company has ever built. Old Zaps are not a permission model. They are archaeology.",
        ],
      },
      {
        heading: "Start with one verb",
        paragraphs: [
          "Pick a verb you can stand: “file,” “summarize into a task,” “draft, never send.” Give the agent the minimum connections. Run it in a channel the team watches. After twenty runs, widen one permission or stop. This is slower than the template gallery and it is how you avoid a robot that posts into the wrong channel for a month.",
          "The [rollout briefing](/briefings/rollout) applies even though Zapier feels like a power-user toy. The moment it touches customer data, it is an enterprise system.",
        ],
      },
    ],
  },
  {
    slug: "grok",
    name: "Grok",
    vendor: "xAI",
    rank: 10,
    topic: "general",
    scores: { task: 8, tools: 8, reliability: 7, control: 7, value: 8 },
    dek: "A live general agent with the public conversation and the web in reach, better as a desk than as a system of record.",
    pull: "Grok is the agent you ask what just happened. It is not the agent you ask to close the books.",
    bestFor: "Live research, drafting against the news, and tool use when the trail can stay in the conversation.",
    skipIf: "You need private-corpus controls, a pull request, or a customer-facing policy bot.",
    author: "jonah-park",
    updated: "9 November 2026",
    sections: [
      {
        heading: "The live desk",
        paragraphs: [
          "Grok’s useful version is a general agent with tools and a bias toward what is happening now. It can search, draft, look at images, and talk. The connection to public posts is a real advantage when the question is about a fast-moving story, and a real distraction when the question is about your roadmap.",
          "It ranks tenth, not because the model is an afterthought, but because the artifact is often the conversation itself. Our tie-break favors a diff, a citation list, or an approval gate. Grok can produce those. The default product does not force them. The rule is in the [methodology](/methodology).",
        ],
      },
      {
        heading: "What it is doing in the general lane",
        paragraphs: [
          "Next to [ChatGPT](/agents/chatgpt) and [Claude](/agents/claude), Grok is less of a workplace platform and more of a sharp desk. The task score is an 8: it will attempt multi-step research and come back with something you can edit. The tool score is an 8 for search and the surrounding product, not for an app-store of business systems.",
          "Use it for the first pass on a story, a technical explanation of a new release, or a draft that has to acknowledge what people are already saying. Then move the result into a document with sources. Do not let the chat be the archive.",
        ],
      },
      {
        heading: "Control and reliability",
        paragraphs: [
          "Both sit at 7. Grok will sometimes prefer a vivid answer to a hedged one. That voice is a product choice. It is the wrong choice for incident reports, personnel notes, and anything a regulator might read. The [do-not-delegate list](/briefings/do-not-delegate) is not optional on this profile.",
          "There is less enterprise machinery here than in Microsoft or Google’s agents. If your security review needs tenant controls, start with those and come back to Grok for individual researchers who can handle a public-web tool responsibly.",
        ],
      },
      {
        heading: "A fair test",
        paragraphs: [
          "Give it three questions you already know the answers to, including one that broke in the last week, and three questions that require a file you upload. Look at whether it distinguishes “I found this” from “I think this.” If it does, it earns a bookmark. If every answer has the same confidence, use it for brainstorming only.",
          "It does not replace [Perplexity](/agents/perplexity) when the footnote is the product. It replaces the twenty tabs you open when you are trying to catch up.",
        ],
      },
    ],
  },
];
