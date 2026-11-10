import type { Agent } from "./types";

export const agentsB: Agent[] = [
  {
    slug: "amazon-q",
    name: "Amazon Q Developer",
    vendor: "Amazon",
    rank: 11,
    topic: "coding",
    scores: { task: 7, tools: 8, reliability: 7, control: 8, value: 7 },
    dek: "The agent for teams whose production system is AWS, not a blank repository.",
    pull: "Q is less charming than an editor agent and more likely to pass a cloud security review.",
    bestFor: "AWS-heavy engineering orgs that want a coding and operations agent inside known boundaries.",
    skipIf: "You are a small team that does not live in AWS and just wants a faster editor.",
    author: "luis-ferreira",
    updated: "9 November 2026",
    sections: [
      {
        heading: "A cloud with a colleague",
        paragraphs: [
          "Amazon Q Developer is the agent we rank for people who already build on AWS. It can help with code, transformations, and operational questions against Amazon’s own surfaces. Kiro, the more IDE-shaped agent in the same family, is worth reading beside this profile. We did not give Amazon two seats. If your day is the console and the service APIs, start with Q.",
          "The control score is an 8 because identity, logging, and boundaries are the point of the platform. That will bore a reader shopping for a magical laptop tool. It will not bore the person who signs the security questionnaire.",
        ],
      },
      {
        heading: "Task score, honestly",
        paragraphs: [
          "A 7 means it is competent on the jobs it was shaped for and unremarkable as a general coding partner. [Cursor](/agents/cursor) will feel faster on a greenfield feature. Q earns its place when the change touches IAM, a Lambda, a queue, or a migration Amazon has actually seen before.",
          "Reliability matches that scope. Inside the documented path it is steady. Outside it, it is another model with a terminal. Do not ask it to invent your domain model. Ask it to implement a decision you already wrote down.",
        ],
      },
      {
        heading: "Value is situational",
        paragraphs: [
          "If the company is an AWS shop, the value is the missing context other agents do not have: the account, the services, the way a transformation is supposed to be reviewed. If you are multi-cloud or mostly a frontend team, the value falls apart and you should not buy it out of brand symmetry.",
          "The [cost briefing](/briefings/what-agents-cost) matters here because cloud agents can hide spend inside an existing enterprise agreement. “Included” is not the same as “used well.”",
        ],
      },
      {
        heading: "Pilot",
        paragraphs: [
          "Choose one service team. Let Q draft changes on a branch with the usual reviews. Separately, let two engineers ask it operational questions they would otherwise paste into a chat, and keep a note of wrong answers about your account. Wrong account facts are a launch blocker. Slow code suggestions are not.",
          "Revisit Kiro only after this pilot if the team asks for an editor. Do not run three Amazon agents and Copilot in the same week and then declare that agents do not work.",
        ],
      },
    ],
  },
  {
    slug: "notion",
    name: "Notion AI",
    vendor: "Notion",
    rank: 12,
    topic: "workplace",
    scores: { task: 7, tools: 7, reliability: 7, control: 8, value: 8 },
    dek: "An agent whose world is the workspace you already wrote down, which is both the feature and the ceiling.",
    pull: "Notion’s agent is only as good as the pages you were willing to maintain.",
    bestFor: "Teams whose wiki, notes, and light databases already live in Notion.",
    skipIf: "The real system of record is a CRM, a repo, or a shared drive nobody has cleaned.",
    author: "adele-okonkwo",
    updated: "9 November 2026",
    sections: [
      {
        heading: "The workspace is the corpus",
        paragraphs: [
          "Notion AI, including the custom agents teams build on top of their pages, answers from the place people already write. That sounds modest next to a computer-use demo. It is the right shape for a huge class of questions: where is the decision, what did we say the policy was, which notes mention this customer.",
          "Value is an 8 because if Notion is the wiki, the incremental cost of asking it questions is small and the alternative is search plus folklore. The [workplace topic](/topics/workplace) is full of products that want to be the wiki. This one often already is.",
        ],
      },
      {
        heading: "Control you can point at",
        paragraphs: [
          "Pages have permissions. An agent that inherits them is easier to explain than an agent with its own shadow index. The control score is an 8 assuming you do not then export the whole workspace into a second tool “so the model can see everything.” That move deletes the permission model you just praised.",
          "Reliability is a 7. It will mix two pages that use the same words for different projects, and it will sound sure. Ask it to link the page. If a custom agent cannot link the page, it is not ready for the team.",
        ],
      },
      {
        heading: "What not to force",
        paragraphs: [
          "Notion is a poor coding agent and a poor customer-of-record agent. Do not pipe production tickets into it so that a page can be the agent’s brain. Use [Fin](/agents/intercom-fin) or [Agentforce](/agents/agentforce) for queues, and keep Notion for the knowledge those queues should have cited.",
          "Custom agents multiply quickly. Five bots with overlapping instructions are worse than one Q&A box. Name an owner for each agent the way you name an owner for a database.",
        ],
      },
      {
        heading: "A maintenance test",
        paragraphs: [
          "Before you turn agents on, pick ten questions new hires actually ask. See whether a current page answers them. Update the pages that fail. Then enable the agent. If you skip the update, you will automate the confusion and call it adoption.",
          "Re-read the [privacy questions](/briefings/privacy-review). A workspace agent sees drafts, not just the handbook. Drafts are where people are careless.",
        ],
      },
    ],
  },
  {
    slug: "microsoft-365-copilot",
    name: "Microsoft 365 Copilot",
    vendor: "Microsoft",
    rank: 13,
    topic: "workplace",
    scores: { task: 7, tools: 8, reliability: 7, control: 8, value: 7 },
    dek: "The suite agent: Word, Excel, Teams, Outlook, and the Studio where companies build their own.",
    pull: "Copilot in 365 is bought by the people who already bought the building. The agent still has to earn the room.",
    bestFor: "Organizations standardized on Microsoft 365 that want agents under the same admin center.",
    skipIf: "Your work lives in Google Workspace, or you wanted a coding agent and got talked into a bundle.",
    author: "adele-okonkwo",
    updated: "9 November 2026",
    sections: [
      {
        heading: "The bundle is not the rank",
        paragraphs: [
          "Microsoft 365 Copilot meets people inside the apps they already resent and rely on. Copilot Studio is the part that turns that presence into agents with topics, actions, and connectors. We rank the combination as a workplace agent, not as a model beauty contest.",
          "It sits just behind [Notion](/agents/notion) on value because the license is often bought broadly and used narrowly. A tool everyone has and few can describe is an expensive rumor. The [rollout briefing](/briefings/rollout) was written with this pattern in mind.",
        ],
      },
      {
        heading: "Tools and control",
        paragraphs: [
          "The tool score is an 8: mail, calendar, documents, meetings, and the Graph underneath are a legitimate action surface. The control score matches it when administrators use the controls. Tenant defaults, plugin permission, and audit logs are there. They do not configure themselves.",
          "Reliability is a 7. Meeting summaries miss the only sentence that mattered. Spreadsheet help invents a column. These are survivable if the culture treats the output as a draft. They are not survivable in a team that forwards the summary as the minutes.",
        ],
      },
      {
        heading: "Studio, used badly",
        paragraphs: [
          "Copilot Studio will let you build a customer-facing agent. That does not make it [Fin](/agents/intercom-fin) or [Sierra](/agents/sierra). A Studio bot pointed at a SharePoint site no one owns is how internal demos leak into production. Give customer agents a team whose job is the queue.",
          "Do not confuse this product with [GitHub Copilot](/agents/github-copilot). They share a word and a parent and almost nothing else. Buying one does not staff the other.",
        ],
      },
      {
        heading: "Make the license visible",
        paragraphs: [
          "Pick two jobs: draft a reply from a thread, and build a Studio agent that answers one HR policy from a page with an owner. Measure both for a month. If the second job has no owner, turn it off. If the first job is unused, you do not have an adoption problem. You have a task people did not want done.",
          "Train people to ask for citations inside the document. The suite can ground answers. Users who do not know that will not discover it from a ribbon icon.",
        ],
      },
    ],
  },
  {
    slug: "harvey",
    name: "Harvey",
    vendor: "Harvey",
    rank: 14,
    topic: "customer",
    scores: { task: 8, tools: 7, reliability: 7, control: 8, value: 6 },
    dek: "A legal work agent for firms that already know a draft is not advice until a lawyer says so.",
    pull: "Harvey can prepare the pile. It cannot sign it, and the product is better when nobody pretends otherwise.",
    bestFor: "Law firms and legal teams with a corpus, a review culture, and a budget for specialist software.",
    skipIf: "You wanted a consumer chatbot to “look at a contract real quick.”",
    author: "mara-ellison",
    updated: "9 November 2026",
    sections: [
      {
        heading: "A practice, not a prompt",
        paragraphs: [
          "Harvey is built for legal work: research, drafting, and questions over a firm’s own material. It is on the customer desk because the user is acting for a client, and a wrong sentence has a cost that a marketing blog does not. The task score is an 8 inside that boundary. Outside it, the product is the wrong shape.",
          "Nothing in this profile is legal advice, including the rank. It is a software review. The [terms](/terms) say the same thing in plainer clothes.",
        ],
      },
      {
        heading: "Why value is a 6",
        paragraphs: [
          "Specialist agents cost specialist money, and the buyer is a firm that also pays for research systems it already trusts. Harvey has to beat “export the document into a general agent,” which many associates will try. It beats that path on control: matter separation, firm corpus, and a product that expects a reviewer. It does not beat it on a casual question.",
          "If you cannot name the workflow — diligence memo, first-pass research, clause comparison — do not buy the seat to find out. The [buyers’ questions](/briefings/before-you-buy) start with the workflow on purpose.",
        ],
      },
      {
        heading: "Reliability under a professional duty",
        paragraphs: [
          "A 7 is deliberate. The drafts still need a lawyer. Citations still need opening. The correct deployment assumes that. An incorrect deployment is any setting that lets a client-facing message leave without a person. Harvey’s controls can support the correct one. The firm has to choose it.",
          "Do not paste client material into a general consumer agent because this profile made the specialist sound expensive. That is the expensive mistake.",
        ],
      },
      {
        heading: "What a good week looks like",
        paragraphs: [
          "One practice group, one workflow, a senior reviewer who samples outputs, and a written rule about what never gets uploaded. At the end of the month the question is whether the first draft arrived faster without a rise in corrections. If you cannot see corrections, you cannot see quality.",
          "Keep general agents for public-law explainers and internal education. Keep Harvey, if you buy it, on the matter.",
        ],
      },
    ],
  },
  {
    slug: "replit",
    name: "Replit Agent",
    vendor: "Replit",
    rank: 15,
    topic: "coding",
    scores: { task: 8, tools: 7, reliability: 6, control: 7, value: 8 },
    dek: "Describes an app, gets a running one, and only then discovers what “done” was supposed to mean.",
    pull: "Replit Agent is a superb way to have a prototype by dinner and a muddle by Friday.",
    bestFor: "Founders and students who need a deployed first version more than a maintainable architecture.",
    skipIf: "The codebase is large, regulated, or already has a team of reviewers.",
    author: "luis-ferreira",
    updated: "9 November 2026",
    sections: [
      {
        heading: "From sentence to URL",
        paragraphs: [
          "Replit Agent’s promise is the one demos love: describe the software, watch it get built, click a URL that works. For a prototype, an internal tool, or a student project, the task score of 8 is fair. The distance from nothing to a running service is shorter here than in a local editor you still have to host.",
          "That is a different job from the one [Copilot](/agents/github-copilot) and [Cursor](/agents/cursor) are ranked for. Do not average them into “coding agents” and then be angry that they feel different.",
        ],
      },
      {
        heading: "Reliability is the catch",
        paragraphs: [
          "A 6 is the honest number once the app is more than a tour. The agent will stack frameworks, invent half a schema, and patch forward. The result runs. A second developer cannot always see why. For a hackathon that is a success. For a product you will charge for, it is the start of a rewrite you should schedule on purpose.",
          "Control is a 7 because the environment is contained. You are not pointing it at the company monorepo unless you go out of your way. Stay in that container until you have a reason and a reviewer.",
        ],
      },
      {
        heading: "Value",
        paragraphs: [
          "Value is an 8 for the person who would otherwise spend a week on boilerplate before learning whether the idea is interesting. It is not an 8 as a replacement for an engineering team. The [cost piece](/briefings/what-agents-cost) warns against counting a prototype as a headcount.",
          "Export the code when the experiment works. An idea that can only live inside one vendor’s agent is not a company yet. It might still be a very good afternoon.",
        ],
      },
      {
        heading: "Use it for the right week",
        paragraphs: [
          "Give it a product you can describe in one page, including what it must not do. Deploy it. Use it yourself for three days. Then decide whether to rewrite it with a foreground coding agent in a repository you control. That sequence respects both tools.",
          "Do not connect it to production customer data to “see how it feels.” Prototypes feel the same with fake data, and they leak less.",
        ],
      },
    ],
  },
  {
    slug: "agentforce",
    name: "Agentforce",
    vendor: "Salesforce",
    rank: 16,
    topic: "customer",
    scores: { task: 7, tools: 8, reliability: 7, control: 8, value: 6 },
    dek: "Salesforce’s agent layer, meaningful if the CRM is the business and ceremonial if it is not.",
    pull: "Agentforce should act on records you already trust. It cannot tidy a CRM by talking about it.",
    bestFor: "Salesforce customers who want agents to read and update the records their teams already live in.",
    skipIf: "You do not run Salesforce, or the org is an ungoverned pile of fields.",
    author: "adele-okonkwo",
    updated: "9 November 2026",
    sections: [
      {
        heading: "The record is the job",
        paragraphs: [
          "Agentforce is an agent platform on Salesforce: topics, actions, and the data model underneath. Ranked as a general chatbot it would look ordinary. Ranked as a way to let a bounded agent update a case, a lead, or a knowledge answer inside the system of record, it is a serious product. The tool score is an 8 for that reason.",
          "Value is a 6 until the org is clean enough. Agents amplify field names. If “status” means four different things, the agent will pick a confident one. Clean the object or do not automate it.",
        ],
      },
      {
        heading: "Control is the sales pitch you should actually want",
        paragraphs: [
          "The control score is an 8 because actions can be specific and permissions already exist. Use them. An agent with update rights on every object is not a pilot. It is an incident you have not had yet. The [support-floor briefing](/briefings/support-floor) covers the customer-facing version of this rule.",
          "Reliability is a 7 on well-specified topics. Open-ended “help the seller” topics drift. Write topics the way you would write a runbook, with examples of no.",
        ],
      },
      {
        heading: "Not a substitute for Fin or Sierra",
        paragraphs: [
          "If the job is a contained support conversation and you do not live in Service Cloud, [Fin](/agents/intercom-fin) or [Sierra](/agents/sierra) may fit better. If the job is the CRM record itself, Agentforce is the native choice and leaving the platform to call a model with a copied export is how data walks out.",
          "Atlas and the rest of the branding will keep changing. Ignore the adjective in the launch and read the action list.",
        ],
      },
      {
        heading: "Pilot on one object",
        paragraphs: [
          "One object, three actions, a week of logs, a human on the exception path. Measure bad writes, not demo applause. Bad writes are the only metric that predicts whether you can expand.",
          "Pair the pilot with a data owner who can rename a field without a committee. If that person does not exist, the agent project is early.",
        ],
      },
    ],
  },
  {
    slug: "sierra",
    name: "Sierra",
    vendor: "Sierra",
    rank: 17,
    topic: "customer",
    scores: { task: 8, tools: 7, reliability: 7, control: 8, value: 6 },
    dek: "Branded customer agents, sold on outcomes, built for companies that can supervise a voice on their site.",
    pull: "Sierra is a customer experience team that happens to be software. Budget for the team.",
    bestFor: "Consumer brands with volume, a real policy, and money for an outcome-priced agent.",
    skipIf: "You need a cheap help-center bot by next Thursday.",
    author: "adele-okonkwo",
    updated: "9 November 2026",
    sections: [
      {
        heading: "An agent with a brand voice",
        paragraphs: [
          "Sierra builds customer agents for companies that care what the agent sounds like and what it is allowed to do: returns, account questions, product advice, a handoff that does not drop the plot. The task score is an 8 when the company does the unglamorous policy work. The value score is a 6 because this is not a self-serve toggle. It is a project.",
          "Outcome pricing shows up in the conversation around Sierra more than around most seats in this table. Read the definition of an outcome twice. The [cost briefing](/briefings/what-agents-cost) has the questions.",
        ],
      },
      {
        heading: "Control as a service",
        paragraphs: [
          "The control score is an 8 if you use the supervision: brand rules, action limits, and reviews of conversations. A vendor that will sit with you is a feature for a first agent and a dependency later. Know which one you are buying.",
          "Reliability is a 7. Customer agents face hostile inputs and vague customers at the same time. The correct behavior is often to stop. If your dashboard punishes stops, you will train the agent to guess, and then you will write a postmortem.",
        ],
      },
      {
        heading: "Choosing among customer agents",
        paragraphs: [
          "[Fin](/agents/intercom-fin) is the faster path if you are already on Intercom and the help center is decent. [Agentforce](/agents/agentforce) is the path if the conversation must become a Salesforce write. Sierra is the path if the agent is the brand’s front door and you will staff it like a channel.",
          "None of them are a substitute for a policy. The [support briefing](/briefings/support-floor) is the homework.",
        ],
      },
      {
        heading: "Before the kickoff",
        paragraphs: [
          "Bring ten real transcripts, including angry ones. Mark the lines a person must say. Mark the actions that move money or personal data. If those marks are controversial inside the company, the agent is not late. The company is.",
          "Plan an off switch that marketing can hit without engineering. Launch week is a bad time to learn that the switch is a ticket.",
        ],
      },
    ],
  },
  {
    slug: "lindy",
    name: "Lindy",
    vendor: "Lindy",
    rank: 18,
    topic: "personal",
    scores: { task: 7, tools: 8, reliability: 6, control: 7, value: 7 },
    dek: "The personal “AI employee” pitch, narrowed to the automations a single operator can actually supervise.",
    pull: "Lindy is useful when you treat it as a junior coordinator, not as a second you.",
    bestFor: "Solo operators and small teams who want mail, calendar, and busywork wired together.",
    skipIf: "You need an audit trail a client or a regulator will accept.",
    author: "jonah-park",
    updated: "9 November 2026",
    sections: [
      {
        heading: "The chief-of-staff story",
        paragraphs: [
          "Lindy sells agents that behave like small employees: watch a calendar, triage mail, chase a workflow, connect the apps a person already pays for. The [personal topic](/topics/personal) has one seat, and this is it, because the product is aimed at a single operator rather than a tenant.",
          "The tool score is an 8. The connections are the product. The task score is a 7 because the jobs that work are specific. “Run my life” is not specific. “Draft replies to recruiting mail and do not send them” is.",
        ],
      },
      {
        heading: "Reliability at personal scale",
        paragraphs: [
          "A 6 sounds harsh until you remember that a personal agent touching mail can apologize to the wrong person at scale. Individual errors are ordinary. Unattended errors are the product risk. The rank assumes you read drafts for the first month and keep send rights off until the drafts bore you.",
          "Control is a 7. You can scope agents. You can also connect everything in a burst of optimism. The [personal stack briefing](/briefings/personal-stack) suggests a smaller bundle.",
        ],
      },
      {
        heading: "Compared with a general agent",
        paragraphs: [
          "[ChatGPT](/agents/chatgpt) can do many of the same errands if you sit with it. Lindy is for the errands that should happen when you are not in the tab. That is a real difference. It is also why the safety bar is higher, not lower. Unattended work needs fewer permissions, not more.",
          "It is the wrong place for client-confidential material if you are a lawyer, clinician, or anyone with a duty. Use a specialist or do not automate that inbox.",
        ],
      },
      {
        heading: "A humane setup",
        paragraphs: [
          "One inbox label. One calendar. Drafts only. A Sunday review of what the agent did, deleted after you have learned from it. Add a second automation only when the first has been dull for two weeks. Dull is the goal.",
          "If you want a team system of record, you have outgrown this seat. Move the workflow to [Zapier](/agents/zapier) or the suite your company already administers.",
        ],
      },
    ],
  },
  {
    slug: "devin",
    name: "Devin",
    vendor: "Cognition",
    rank: 19,
    topic: "coding",
    scores: { task: 8, tools: 8, reliability: 6, control: 7, value: 5 },
    dek: "An autonomous software engineer in a sandbox. Impressive on a leash, expensive as a colleague.",
    pull: "Devin can attempt the bigger coding job. The invoice assumes the attempt was worth it.",
    bestFor: "Teams with a budget for a true asynchronous engineer and a reviewer who is not optional.",
    skipIf: "You wanted a pair programmer, or you cannot afford runs that fail in interesting ways.",
    author: "luis-ferreira",
    updated: "9 November 2026",
    sections: [
      {
        heading: "The long leash",
        paragraphs: [
          "Devin is the product that made “autonomous engineer” a procurement category. It gets a sandbox, a plan, a browser, and a repository, and it tries to finish. The task and tool scores are 8s because the attempt is real. It is not autocomplete with a marketing team.",
          "It ranks nineteenth because the composite includes value and reliability, and both are where long-leash agents get hurt. A brilliant pull request that costs as much as a contractor, on a task a person should have sliced smaller, is a miss. The [week in code](/briefings/week-in-code) is the antidote.",
        ],
      },
      {
        heading: "Reliability is the product",
        paragraphs: [
          "A 6 is not an insult to the engineering. It is a statement about unsupervised work. Devin will sometimes wander, overbuild, or solve a test instead of a problem. You can catch this in review. You will not catch it if the culture is to merge anything green. The control score stays a 7 only because the sandbox and the pull request exist. Use both.",
          "Shorter tasks raise the reliability more than pep talks do. If the issue does not fit on a screen, split it before you assign it.",
        ],
      },
      {
        heading: "The value score is the argument",
        paragraphs: [
          "A 5 is the desk being direct. Devin’s pricing has historically matched a serious tool, closer to a contractor line than to an editor seat. That can be rational for a queue of well-specified chores. It is not rational as a default IDE. [Cursor](/agents/cursor) and [Windsurf](/agents/windsurf) will do the interactive job for less drama.",
          "Re-check the current price before you quote this page at anyone. We refuse to print a number that will be stale. The shape of the price is what the score refers to.",
        ],
      },
      {
        heading: "If you still want it",
        paragraphs: [
          "Buy a small package. Write ten issues that have tests. Compare the merged results with a week of [Copilot’s coding agent](/agents/github-copilot) on similar issues. Keep the winner. A team does not need both unless the queues are genuinely different.",
          "Never point it at production credentials so it can “just check.” The sandbox is the feature you think you can skip. You cannot.",
        ],
      },
    ],
  },
  {
    slug: "manus",
    name: "Manus",
    vendor: "Manus",
    rank: 20,
    topic: "general",
    scores: { task: 7, tools: 8, reliability: 6, control: 6, value: 7 },
    dek: "A general cloud agent that tries to finish the whole errand on a computer you do not have to watch.",
    pull: "Manus is a rented pair of hands. Count the fingers after each run.",
    bestFor: "Multi-step web research and deliverables when you can check the file and discard the rest.",
    skipIf: "The task touches accounts, money, private customer data, or anything you cannot undo.",
    author: "jonah-park",
    updated: "9 November 2026",
    sections: [
      {
        heading: "A computer, not a chat",
        paragraphs: [
          "Manus popularized the general agent that goes off and uses a cloud computer: browsing, files, slides, research, a result you download. The tool score is an 8 because that is a real capability. The control score is a 6 because you are delegating a whole screen, not a single API call.",
          "It closes the ranking. Being last in a top twenty is not a dismissal. It means we would exhaust the more checkable tools first. Tie-breaks and the meaning of last place are spelled out in the [methodology](/methodology).",
        ],
      },
      {
        heading: "When the errand is the point",
        paragraphs: [
          "Manus is genuinely useful when the output is a deck outline, a comparison table from public sources, or a folder of notes you will edit. The task score is a 7: it often returns something shaped like the ask, and the something still needs an editor. That is acceptable. Shipping it untouched is not.",
          "Reliability is a 6 for the usual cloud-agent reasons. Pages change, logins interrupt, and a fluent file can hide a skipped step. Open the trajectory if the product shows it. If it does not, do not use the run for anything you would be ashamed to redo by hand.",
        ],
      },
      {
        heading: "Do not give it the keys",
        paragraphs: [
          "A general computer-use agent plus saved passwords is the plot of an incident report. The [computer-use briefing](/briefings/computer-use) is the house rule: separate profile, no money, no mail send, no company admin. Manus does not get an exception for being convenient.",
          "It overlaps [ChatGPT’s](/agents/chatgpt) agent mode. Prefer the one your team can already administer. A second cloud computer is a second place for data to sit.",
        ],
      },
      {
        heading: "A bounded trial",
        paragraphs: [
          "Three public-information tasks. No accounts. Judge the files against a source you check yourself. If the files are useful drafts, keep the tool for that lane. If you cannot tell what it read, stop. An unauditable research trail is not research.",
          "Revisit the rank next issue. This corner of the market moves faster than the suites, and a control improvement would move the score more than a smarter paragraph would.",
        ],
      },
    ],
  },
];
