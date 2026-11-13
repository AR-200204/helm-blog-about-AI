export type Theme = "danger" | "life" | "news";

export type Article = {
  slug: string;
  title: string;
  theme: Theme;
  minutes: number;
  dek: string;
  sections: { heading: string; body: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "nvidia-ceo-week",
    title: "The week Nvidia’s CEO became the story",
    theme: "news",
    minutes: 7,
    dek: "As of 12 November 2026, Jensen Huang has admitted an affair, and outlets report a second one plus a board discussion about removing him. Allegations are not findings.",
    sections: [
      {
        heading: "What is on the record",
        body: [
          "On Sunday 8 November, Nvidia CEO Jensen Huang told staff he had been unfaithful to his wife. He apologized to his family and the company and said he would cooperate with a board review. The board said it was examining whether he had been the target of a foreign intelligence effort.",
          "News reports, including the New York Times and The Information, say U.S. officials believe Alice Huang, an executive at Singapore-based Megaspeed and no relation, was recruited by China’s Ministry of State Security. China’s foreign ministry called that groundless. Huang did not name her in his memo. On Tuesday the independent directors hired Wachtell, Lipton, Rosen & Katz, and former acting U.S. Attorney Joon Kim, to run the review.",
          "On Wednesday 11 November the Times reported a second relationship, with Kimberly Powell, Nvidia’s vice president of healthcare, who reports to Huang. The paper cited five unnamed people who worked at the company and said the two were filmed being affectionate at a hotel during a conference. Nvidia and Powell had not commented. The same night the Wall Street Journal and Reuters reported that the board was meeting on whether to remove him. He has no obvious public successor, owns about 3.5 percent of the company, and has said he keeps about 60 direct reports.",
        ],
      },
      {
        heading: "Why a chip company is an AI story",
        body: [
          "Models run on Nvidia’s processors. When one person holds the product calls, the government relationships, and the internal map of the company, a personal crisis becomes an industry crisis. That is the “power” problem from the other essays, with a date on it.",
          "Keep the two claims apart. The affair with his wife is something he admitted. The intelligence allegation is under investigation, denied by Beijing, and not a verdict. The second relationship is a news report, not a company statement. Markets did not wait. Reported moves: about −4.3% on Monday 9 November, about −5.5% on Tuesday to $168.89, and about −8% after hours on Wednesday. Published accounts put the two-day loss in value near $430 billion, and near $600 billion if Wednesday night is included. The chart uses those reported figures. It is not a live price. A separate piece sets this week beside other CEOs.",
        ],
      },
    ],
  },
  {
    slug: "ceo-comparison",
    title: "Huang beside the other CEOs",
    theme: "news",
    minutes: 7,
    dek: "Some tech CEOs are the company. Two earlier boards removed a CEO over a workplace relationship, and those stocks barely moved on day one.",
    sections: [
      {
        heading: "Who the company cannot picture without",
        body: [
          "CNN, on 9 November 2026, grouped Jensen Huang with a short list: Elon Musk at Tesla and SpaceX, Sam Altman at OpenAI, Mark Zuckerberg at Meta, and Dario Amodei at Anthropic. The shared fact is not an affair. It is that customers, staff, and governments treat the person as the company.",
          "They are not the same kind of power. Zuckerberg’s voting stock means a normal board cannot outvote him. Musk’s name is on several companies at once, and he has not been removed. Altman was removed. On 17 November 2023 OpenAI’s board fired him; staff threatened to leave, and he was back within about five days. OpenAI was private, so there is no stock print to put on the chart. The lesson was the opposite of a clean handoff: the organization could not function without him.",
          "Satya Nadella and Sundar Pichai are the contrast. Microsoft and Alphabet have famous leaders, but a week of personal news is not read as the end of the product. Nvidia, this week, is being read Huang’s way.",
        ],
      },
      {
        heading: "Two boards that did remove the CEO",
        body: [
          "On 21 June 2018 Intel said Brian Krzanich had resigned. An investigation confirmed a past consensual relationship with an employee, which broke a rule for managers. The shares fell about 2.3 to 2.4 percent that day. The chief financial officer, Bob Swan, was interim the same day and became CEO the following January. A year later Intel was down about 8.7 percent, dividends included, while the S&P 500 was up about 8.5 percent. There was no intelligence allegation.",
          "On 3 November 2019 McDonald’s fired Steve Easterbrook for a consensual relationship with an employee. Not a tech company, included because it is the other famous case of this policy. The shares fell about 2.7 percent that day. A year later they were up about 14.7 percent, ahead of the S&P 500. He later returned more than $105 million to the company.",
          "Huang’s Monday drop, about 4.3 percent, was already larger than either of those first days, and the story was not over. Compounding Monday’s and Tuesday’s reported closes is about a 9.6 percent decline. That is arithmetic from the two reported days, not an official Nvidia figure. Wednesday’s further 8 percent was after hours. He has not resigned. Removal is a news report. No interim has been named. And unlike Krzanich or Easterbrook, part of the file is a national-security allegation that is still only an allegation.",
        ],
      },
    ],
  },

  {
    slug: "what-danger-means",
    title: "What “danger” means when people say AI",
    theme: "danger",
    minutes: 6,
    dek: "The word covers four different problems. Mixing them up makes the useful warning hard to hear.",
    sections: [
      {
        heading: "Four problems, not one monster",
        body: [
          "A model can be wrong with a straight face. That is a mistake. A person can use a model to cheat, harass, or forge. That is misuse. A class can stop practicing because the answer arrives first. That is dependence. A few companies can set the default for millions of people. That is power.",
          "These are not the same size at every age. A child is hurt more by dependence than by boardroom power. An adult signing a contract is hurt more by a confident mistake and by who controls the tool. The chart lets you switch the person and see the mix move.",
        ],
      },
      {
        heading: "What to do with the word",
        body: [
          "If someone says AI is dangerous, ask which of the four they mean. A fix for mistakes is checking and sources. A fix for misuse is rules and friction. A fix for dependence is practice that a model cannot sit in for. A fix for power is choice: more than one tool, and a way to work without one.",
          "None of these require panic. They do require a sentence that names the actual harm. The scenarios below are not a poll. They are a way to see that “danger” changes with the person holding the keyboard.",
        ],
      },
    ],
  },
  {
    slug: "children-and-practice",
    title: "Children, practice, and the skipped step",
    theme: "danger",
    minutes: 6,
    dek: "The risk for a child is not a robot takeover. It is finishing the page without ever doing the thinking.",
    sections: [
      {
        heading: "Practice is the product",
        body: [
          "A spelling list, a paragraph, a times table: the point is the repetition, not the finished line. A model is glad to supply the finished line. If that is allowed every time, the child gets a grade and misses the skill.",
          "Used the other way, the same tool can be a patient checker. “Show me where this sentence is unclear” is different from “write the sentence.” The chart compares those two habits across four school subjects. Move the switch and the share of the hour flips.",
        ],
      },
      {
        heading: "A house rule that stays small",
        body: [
          "One rule is enough to start: the first try is the child’s. The model may explain a wrong answer after that try exists. Parents do not need to ban every chat. They need to protect the minute where the brain is supposed to strain.",
          "Primer’s block lessons are built on that idea. The child taps the steps. Nothing types the program for them. The same shape works for reading, arithmetic, and a first paragraph.",
        ],
      },
    ],
  },
  {
    slug: "forged-media",
    title: "Text, photos, voice, and video that lie",
    theme: "danger",
    minutes: 5,
    dek: "A hurried person trusts a voice note more than a paragraph. Forgers know that order.",
    sections: [
      {
        heading: "The cheap fake is already enough",
        body: [
          "You do not need a perfect film to cause harm. A screenshot of a chat, a photo of a principal, a ten-second clip of a relative asking for money: each one borrows trust the sender did not earn.",
          "Click a bar in the chart. It is a scenario of how easily a rushed person is fooled, not a lab result. Voice and video sit higher because we learned, for a whole century, that those were hard to fake.",
        ],
      },
      {
        heading: "A check that takes one minute",
        body: [
          "Call back on a number you already had, not the number in the message. Ask for a detail a stranger would not know. Treat a new account, even with a familiar face, as unverified until a second channel agrees.",
          "Schools and families can practice this the way they practice a fire drill. The habit matters more than any detector, because detectors lag the newest fake and fail in ordinary lighting.",
        ],
      },
    ],
  },
  {
    slug: "prompts-and-privacy",
    title: "What people paste into a prompt",
    theme: "danger",
    minutes: 5,
    dek: "The model is not the only reader. The box you type into is a copy machine.",
    sections: [
      {
        heading: "A prompt is a document",
        body: [
          "Names, school records, medical notes, salaries, photos of a child: people paste them because the box feels like a diary. It is closer to an email to a company. Someone may store it, a staff member may review it, and a later feature may train on lookalike text.",
          "Drag the slider. It scales a scenario of how much sensitive material lands in the box when pasting feels casual. At the low end, people ask general questions. At the high end, they upload the actual file.",
        ],
      },
      {
        heading: "A smaller habit",
        body: [
          "Replace real names with roles. Crop the photo. Summarize the medical note yourself and ask about the summary, not the chart. If a tool offers a setting that keeps chats out of training, turn it on before the first personal sentence.",
          "Nothing here says “never use a model.” It says the text you type should be text you would forward to a stranger’s office.",
        ],
      },
    ],
  },
  {
    slug: "who-sets-the-defaults",
    title: "Who sets the defaults",
    theme: "danger",
    minutes: 6,
    dek: "The quiet risk is not a single bad answer. It is one menu becoming the way a whole school or office works.",
    sections: [
      {
        heading: "Defaults become the culture",
        body: [
          "When a district or a company turns on one assistant, most people never pick a second. The tone, the refusals, the language, and the blind spots of that product become the local idea of what a computer is allowed to say.",
          "The chart is a sketch of attention, not market share. “Closed” means one stack is the path of least resistance. “Wider tools” means people can leave, compare, and still finish the job on paper.",
        ],
      },
      {
        heading: "Choice is a safety feature",
        body: [
          "A class should be able to do the lesson with the screens shut. A worker should be able to export their notes. A reader should see when a paragraph was drafted by a model. Those are small doors. Without them, the default hardens.",
          "Power, in this piece, means the power to make the other options annoying. The remedy is boring on purpose: more than one tool, and a path that uses none.",
        ],
      },
    ],
  },
  {
    slug: "tasks-not-jobs",
    title: "Tasks move before job titles do",
    theme: "life",
    minutes: 6,
    dek: "Most people will not be replaced in a headline. Pieces of their Tuesday will be.",
    sections: [
      {
        heading: "A job is a bundle of tasks",
        body: [
          "Drafting, scheduling, first-pass translation, summarizing a thread, writing a test, cleaning a spreadsheet: each one can slide toward a model while the job title stays put. The person then spends more time checking and less time starting.",
          "Move adoption from slow to fast. The lines are a scenario from 2024 onward, not a forecast you should bet money on. Fast does not mean every task vanishes. It means the first draft stops being the human’s job.",
        ],
      },
      {
        heading: "The part that stays valuable",
        body: [
          "Judgment, responsibility, and taste do not compress as easily as a first draft. Someone still signs the email, sits with the patient, and decides the lesson is finished. That someone needs to understand the draft well enough to reject it.",
          "Learning to program, which this site is for, is one way to stay on the side that can look inside a tool. You do not have to become an engineer. You do have to stop treating the output as weather.",
        ],
      },
    ],
  },
  {
    slug: "a-weekday",
    title: "Where a weekday actually changes",
    theme: "life",
    minutes: 5,
    dek: "Impact is not a keynote. It is the mix of hours in an ordinary day.",
    sections: [
      {
        heading: "Three ordinary days",
        body: [
          "A student, an office worker, and a person at home do not meet AI in the same rooms. One meets it in homework and chat. One meets it in mail and documents. One meets it in recipes, forms, and a parent’s questions.",
          "Switch the day on the chart. The bars are a teaching sketch of waking hours, with a slice left away from screens on purpose. If that slice shrinks to nothing, the tool has stopped being a tool.",
        ],
      },
      {
        heading: "Notice the trade",
        body: [
          "Some hours come back: a form that took forty minutes takes eight. Some hours disappear into a thread that felt useful and was not. The impact on a life is the sum of those trades, counted honestly at the end of a week.",
          "A dashboard later on this site lets you weigh which trades you care about. This article is only the clock.",
        ],
      },
    ],
  },
  {
    slug: "care-and-judgment",
    title: "Help in care, and the line it should not cross",
    theme: "life",
    minutes: 6,
    dek: "Drafting a note can be a gift. Choosing a treatment is still a person’s job.",
    sections: [
      {
        heading: "Separate the chores from the decision",
        body: [
          "Clinics drown in writing. A model that turns a conversation into a structured note can give a nurse time. A model that tells a frightened person at midnight what disease they have is a different product, even if the sentences sound alike.",
          "The chart splits four jobs and scores two things: how much help a draft gives, and how much harm a wrong confident answer can do. Switch between home and a clinic. At home the harm of a diagnosis climbs, because nobody is in the room to catch it.",
        ],
      },
      {
        heading: "A plain line",
        body: [
          "Use it to prepare questions for a professional. Use it to rewrite a note you already agree with. Do not use it as the professional. If the stakes are a body, a child, or a legal record, a human signs.",
          "That is an impact story as much as a danger story. The good version returns time to care. The bad version inserts a fluent stranger between a person and the help they needed.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug) ?? null;
}

export function siblingArticle(slug: string, delta: number) {
  const index = articles.findIndex((article) => article.slug === slug);
  if (index < 0) return null;
  return articles[index + delta] ?? null;
}

export type Age = "child" | "teen" | "adult";
export type PaceMode = "answer" | "check";
export type DayKind = "student" | "office" | "home";
export type Speed = 1 | 2 | 3;
export type Door = "closed" | "open";
export type Room = "home" | "clinic";

export function dangerMix(age: Age) {
  const table = {
    child: [
      { name: "Mistakes", value: 40 },
      { name: "Dependence", value: 88 },
      { name: "Misuse", value: 28 },
      { name: "Power", value: 18 },
    ],
    teen: [
      { name: "Mistakes", value: 52 },
      { name: "Dependence", value: 70 },
      { name: "Misuse", value: 64 },
      { name: "Power", value: 36 },
    ],
    adult: [
      { name: "Mistakes", value: 58 },
      { name: "Dependence", value: 42 },
      { name: "Misuse", value: 55 },
      { name: "Power", value: 72 },
    ],
  };
  return table[age];
}

export function homeworkMix(mode: PaceMode) {
  const thinking = mode === "answer" ? [28, 18, 34, 24] : [76, 64, 72, 70];
  return ["Math", "Writing", "Science", "Language"].map((name, index) => ({
    name,
    Thinking: thinking[index] ?? 0,
    Prompting: 100 - (thinking[index] ?? 0),
  }));
}

export const forged = [
  { name: "Text", ease: 34, note: "A paragraph can be checked against a second source in a minute." },
  { name: "Photo", ease: 58, note: "A face in a strange room still feels like evidence. Look for the hands and the light." },
  { name: "Voice", ease: 74, note: "A short call from a “relative” is built to skip the pause where you would think." },
  { name: "Video", ease: 82, note: "Moving pictures used to be expensive to fake. That price fell. Call back on a known number." },
];

export function privacyBars(paste: number) {
  const base = [
    { name: "Names", value: 42 },
    { name: "School", value: 55 },
    { name: "Health", value: 24 },
    { name: "Money", value: 30 },
    { name: "Photos", value: 16 },
  ];
  const scale = paste / 50;
  return base.map((row) => ({ ...row, value: Math.max(2, Math.min(100, Math.round(row.value * scale))) }));
}

export function powerBars(door: Door) {
  if (door === "closed") {
    return [
      { name: "Makers", share: 46 },
      { name: "Given apps", share: 34 },
      { name: "Everyone", share: 20 },
    ];
  }
  return [
    { name: "Makers", share: 24 },
    { name: "Given apps", share: 28 },
    { name: "Everyone", share: 48 },
  ];
}

export function workSeries(speed: Speed) {
  return [0, 1, 2, 3, 4, 5, 6].map((step) => {
    const model = Math.min(68, Math.round(10 + step * 7 * (speed / 2)));
    return { year: String(2024 + step), Person: 100 - model, Model: model };
  });
}

export function weekday(kind: DayKind) {
  const table = {
    student: [
      { name: "Work", hours: 3 },
      { name: "Chat", hours: 1.5 },
      { name: "Search", hours: 1 },
      { name: "Making", hours: 1 },
      { name: "Offline", hours: 4 },
    ],
    office: [
      { name: "Docs", hours: 3.5 },
      { name: "Meetings", hours: 2 },
      { name: "Checks", hours: 1.5 },
      { name: "Making", hours: 1 },
      { name: "Offline", hours: 1.5 },
    ],
    home: [
      { name: "Forms", hours: 1 },
      { name: "Family", hours: 1 },
      { name: "Chat", hours: 1 },
      { name: "Care", hours: 2 },
      { name: "Offline", hours: 5 },
    ],
  };
  return table[kind];
}

export function careBars(room: Room) {
  const help = [82, 70, 48, 20];
  const risk = room === "home" ? [12, 28, 74, 90] : [18, 24, 46, 62];
  return ["Note", "Explain", "Cause", "Treatment"].map((name, index) => ({
    name,
    Help: help[index],
    Harm: risk[index],
  }));
}

export const nvidiaTape = [
  {
    day: "Mon 9",
    move: -4.3,
    note: "Huang’s staff memo admits an affair. The board opens a review into whether foreign intelligence targeted him. Shares fall about 4.3%.",
  },
  {
    day: "Tue 10",
    move: -5.5,
    note: "Independent directors hire Wachtell Lipton. Shares close about 5.5% lower, at $168.89. Reports put the two-day drop in value near $430 billion.",
  },
  {
    day: "Wed 11",
    move: -8,
    note: "The Times reports a second relationship inside Nvidia. Reuters and the Journal report a board meeting on removing him. The −8% is after hours, not a closing print. With that move, Reuters put the week’s loss in value near $600 billion.",
  },
];

export function ceoMoves(span: "day" | "week") {
  return [
    {
      name: "Huang",
      move: span === "day" ? -4.3 : -9.6,
      note:
        span === "day"
          ? "Nvidia, Monday 9 November 2026. The first reported session, about −4.3%. He had not left. Removal was not yet the story."
          : "About −9.6%, compounding Monday’s −4.3% and Tuesday’s −5.5%. Our arithmetic, not a company print. Wednesday’s −8% after hours is left off so the bar stays a close-to-close figure.",
    },
    {
      name: "Krzanich",
      move: -2.4,
      note: "Intel, 21 June 2018. Resigned the same day a relationship was confirmed to break company policy. Shares fell about 2.3 to 2.4 percent. The CFO was interim that day.",
    },
    {
      name: "Easterbrook",
      move: -2.7,
      note: "McDonald’s, 3 November 2019. Fired over a workplace relationship. Not a tech CEO. First-day drop about 2.7 percent. A successor path existed.",
    },
  ];
}

export function nvidiaLoss(includeNight: boolean) {
  return includeNight
    ? [
        { name: "Through Tue", loss: 430 },
        { name: "Add Wed night", loss: 600 },
      ]
    : [
        { name: "Through Tue", loss: 430 },
        { name: "Add Wed night", loss: 430 },
      ];
}

export const concernCopy: {
  key: "dependence" | "truth" | "work" | "privacy" | "children";
  label: string;
  short: string;
  base: number;
  slug: string;
}[] = [
  { key: "children", label: "Children skipping practice", short: "Practice", base: 74, slug: "children-and-practice" },
  { key: "truth", label: "Forged media", short: "Forgeries", base: 68, slug: "forged-media" },
  { key: "dependence", label: "Dependence on the draft", short: "Dependence", base: 62, slug: "what-danger-means" },
  { key: "privacy", label: "What gets pasted", short: "Privacy", base: 58, slug: "prompts-and-privacy" },
  { key: "work", label: "Tasks leaving the person", short: "Tasks", base: 54, slug: "tasks-not-jobs" },
];

