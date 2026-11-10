import type { Section } from "./types";

export type LongPage = {
  kicker: string;
  title: string;
  dek: string;
  updated: string;
  sections: Section[];
};

export const methodology: LongPage = {
  kicker: "Method",
  title: "How the desk ranking works",
  dek: "Five scores, a tie-break you can argue with, and a refusal to invent a lab we do not run.",
  updated: "9 November 2026",
  sections: [
    {
      heading: "What this is",
      paragraphs: [
        "The Helm Review top twenty is an editorial ranking of AI agent products, locked for issue 11 on 9 November 2026. It is not a benchmark, not a paid placement, and not a prediction. Scores are the desk’s judgments of how each product behaves on the jobs described in its profile. We use public documentation and direct use where an account was available. We do not claim a hidden lab, a sealed dataset, or a count of hours engineered to sound scientific.",
        "A one-point gap is a shrug. Use it to choose a shortlist, then run your own week. The [buyers’ questions](/briefings/before-you-buy) are the bridge from our opinion to your pilot.",
      ],
    },
    {
      heading: "The five scores",
      paragraphs: [
        "Task is whether the agent finishes the job it is hired for, not every job a demo might attempt. Tools is the quality of the actions it can take: breadth, and whether those actions are specific. Reliability is how often the result is usable without a rescue, including citations that match and tests that still mean something. Control is whether a cautious team can see the plan, limit permissions, stop a run, and keep a log. Value is the honest invoice: price shape, overlap with tools you have, and the human time around the seat.",
        "Each score is an integer from 1 to 10. The composite is the arithmetic mean, shown to one decimal. We do not weight the five. Control and value are not a footnote. A dazzling task score cannot hide a product you cannot stop or cannot afford.",
      ],
    },
    {
      heading: "Tie-break",
      paragraphs: [
        "When composites match, the higher rank goes to the product whose work is easier to check before it counts. A diff you can read beats a paragraph. A citation you can open beats a vibe. An approval step that is on by default beats a setting you must discover. This is why a calmer coding tool can sit above a louder generalist with the same average.",
        "Last place in a top twenty is still a seat. [Manus](/agents/manus) is last because we would reach for more checkable tools first, not because the category is a joke. The market moves. Ranks are dated on purpose.",
      ],
    },
    {
      heading: "What we will not do",
      paragraphs: [
        "We do not take money for a rank. We do not run affiliate links in this issue. If that ever changes, the [advertising disclosure](/disclosure) will say so before the link does. We do not print prices that will be wrong next month. We describe the shape: seat, usage, or outcome.",
        "We do not rank open-source frameworks as if they were products. They are covered in [open-source runtimes](/briefings/open-source-runtimes). We do not rank models apart from the product that makes them an agent. A weight file is not a seat.",
      ],
    },
    {
      heading: "Corrections",
      paragraphs: [
        "Factual mistakes get a note on the [corrections](/corrections) page and, if they would change a score, a visible line in the profile. Disagreement with a judgment is not a correction. You can still write to the desk. The [contact page](/contact) says what happens to a note in this preview.",
        "The next lock is the next issue, not a silent edit. Software changes faster than a magazine. That is why every profile carries a date.",
      ],
    },
  ],
};

export const faq: LongPage = {
  kicker: "FAQ",
  title: "Questions the desk hears",
  dek: "Short answers. The long ones are the profiles and the briefings.",
  updated: "9 November 2026",
  sections: [
    {
      heading: "Is this list sponsored?",
      paragraphs: [
        "No. Nobody paid for a rank, a link, or a kinder paragraph. Profiles exist because the product is one a working reader might actually have to choose. The [disclosure](/disclosure) is the standing version of this answer.",
      ],
    },
    {
      heading: "Why these twenty and not a framework I like?",
      paragraphs: [
        "The twenty are products with a seat a person can obtain. Frameworks you assemble yourself are a different decision. We wrote about them without pretending a library is a colleague. Start at [open-source runtimes](/briefings/open-source-runtimes).",
      ],
    },
    {
      heading: "Do you have a lab benchmark?",
      paragraphs: [
        "No. Inventing one would be worse than not having one. The [methodology](/methodology) says what the scores are. If a vendor quotes our composite as a scientific result, they are misusing it. Write to us and we will say so.",
      ],
    },
    {
      heading: "Which agent should a small team buy first?",
      paragraphs: [
        "One general agent and, if you write software, one coding agent that matches where review already happens. [Claude](/agents/claude) or [ChatGPT](/agents/chatgpt) for the general seat. [GitHub Copilot](/agents/github-copilot), [Cursor](/agents/cursor), or [Windsurf](/agents/windsurf) for code. Do not buy five to feel covered. The [personal stack](/briefings/personal-stack) is the small version of this advice.",
      ],
    },
    {
      heading: "Are the scores out of ten?",
      paragraphs: [
        "Yes. The number on the ranking is the mean of task, tools, reliability, control, and value. The profile shows each part. Do not average our average with a vendor’s leaderboard.",
      ],
    },
    {
      heading: "Can I use the articles on my company’s intranet?",
      paragraphs: [
        "You can link to them. Copying the ranking into a deck as if it were your evaluation is how opinions become policy by accident. Run your own pilot. The [rollout briefing](/briefings/rollout) is written for that.",
      ],
    },
    {
      heading: "How do I report a mistake?",
      paragraphs: [
        "Use the [contact page](/contact) and name the URL and the sentence. Corrections are logged on the [corrections](/corrections) page when we change something a reader could have relied on.",
      ],
    },
    {
      heading: "Do you use ads?",
      paragraphs: [
        "The layout reserves labeled placements for display advertising. This issue does not load a third-party ad script. If the publisher turns on Google AdSense later, the [privacy policy](/privacy) describes what that means for cookies. Placements are marked Advertisement so they are not confused with reporting.",
      ],
    },
    {
      heading: "Is Helm Review affiliated with any lab?",
      paragraphs: [
        "No. Not with Anthropic, OpenAI, Google, Microsoft, xAI, Amazon, or any other vendor in the table. Product names are theirs. The writing is ours. The [about page](/about) is the masthead.",
      ],
    },
    {
      heading: "How often does the ranking change?",
      paragraphs: [
        "When we lock an issue. Silent score changes are not the practice. A material factual fix can land sooner, with a correction note. The date on each profile is the one to trust.",
      ],
    },
  ],
};

export const about: LongPage = {
  kicker: "Masthead",
  title: "About the desk",
  dek: "Helm Review is an independent editorial site about the AI agents people actually run.",
  updated: "9 November 2026",
  sections: [
    {
      heading: "What we publish",
      paragraphs: [
        "We publish a dated ranking of agent products, a profile of each one, and briefings on how to buy, bound, and refuse them. The work is written for a reader who may have to choose a tool at work, not for a reader collecting launch trivia. Issue 11, November 2026, is the ranking you are in.",
        "The [methodology](/methodology) is the contract. Scores are judgments. They are not a lab. We would rather be argued with than counterfeit a precision we do not have.",
      ],
    },
    {
      heading: "Who writes",
      paragraphs: [
        "Four bylines carry the issue: Mara Ellison edits, Jonah Park writes the general desk, Adele Okonkwo covers enterprise and customer agents, and Luis Ferreira edits the tools coverage. Their notes are on the [authors](/authors) page. They are the desk’s writers, not spokespeople for vendors.",
        "We do not accept pieces that were written by a vendor’s agency. If we ever publish a contributed essay, it will say so in the first line.",
      ],
    },
    {
      heading: "How we pay for the site",
      paragraphs: [
        "The site is built to carry original reporting and, when the publisher chooses, display advertising through a program such as Google AdSense. Advertising does not buy a rank. The [disclosure](/disclosure) is the full version. Reserved boxes labeled Advertisement are not articles and are not links.",
        "There is no paywall in this issue. There is no affiliate program in this issue.",
      ],
    },
    {
      heading: "Independence",
      paragraphs: [
        "Helm Review is not affiliated with any company in the ranking. Names of products are used so that readers can identify them. If you are a vendor and a fact is wrong, send the sentence and the source through the [contact page](/contact). If you dislike a judgment, you are in good company. Judgments are not for sale.",
        "The [editorial standards](/editorial) explain how a profile gets edited. The [corrections](/corrections) page is where we show our work after a mistake.",
      ],
    },
  ],
};

export const privacy: LongPage = {
  kicker: "Policy",
  title: "Privacy",
  dek: "What this site collects, what it does not, and what changes if advertising is turned on.",
  updated: "9 November 2026",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "Helm Review is an editorial website. This policy describes the site you are reading. It does not describe the AI vendors we review. Those companies have their own policies, and you should read them before you paste your work into their products. A checklist lives in the [privacy review briefing](/briefings/privacy-review).",
      ],
    },
    {
      heading: "What we collect",
      paragraphs: [
        "The site does not require an account. We do not ask you to create a profile. The contact form checks that a note is complete and confirms it in your browser. In this version it does not transmit the note to a server and does not store it in a database. Do not use it for secrets. Do not use it if you need a delivery receipt from a human.",
        "Pages may be served with ordinary technical logs that a host keeps in order to run a website: a truncated address, a user agent, a time. We do not use those logs to build a marketing profile. We do not sell personal information.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "The editorial pages are designed to work without a tracking cookie. We do not drop a cookie to follow you across other sites for our own advertising network, because we do not run one.",
        "If the publisher enables Google AdSense, Google and its partners may set or read cookies to show and measure ads, including on this site. Google’s own documentation describes those cookies and the controls in your Google ad settings. We will keep the placements labeled. We will not make an ad look like a ranking or a briefing. You can refuse non-essential cookies in your browser. Some ad measurement may then stop working. The articles will still load.",
      ],
    },
    {
      heading: "Advertising",
      paragraphs: [
        "Reserved boxes marked Advertisement are layout, not reporting. They are not links in this issue, and they do not load a third-party script until a publisher adds one. We do not accept ads that pretend to be a desk score. Ranks are not for sale. Details are on the [disclosure](/disclosure) page.",
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "The site is written for adults choosing software at work or in a serious hobby. It is not directed at children, and we do not knowingly collect personal information from children.",
      ],
    },
    {
      heading: "Your requests",
      paragraphs: [
        "If you believe we hold personal information about you, write through the [contact page](/contact) with the address you want used for a reply and the nature of the request: access, correction, or deletion. Because this preview does not store contact-form submissions, there may be nothing to retrieve. If a later version stores mail, we will update this policy before that storage begins.",
        "We may revise this page. The date at the top will change when we do. Continued use of the site after a revision means you are reading the revised policy. Material changes to advertising will be described here, not only in a vendor’s dashboard.",
      ],
    },
  ],
};

export const terms: LongPage = {
  kicker: "Policy",
  title: "Terms of use",
  dek: "Read the magazine. Do not mistake it for a vendor, a lawyer, or a lab.",
  updated: "9 November 2026",
  sections: [
    {
      heading: "The deal",
      paragraphs: [
        "You may read Helm Review for your own work, link to it, and quote short passages with credit and a link. You may not republish whole profiles or the ranking as your own evaluation, and you may not scrape the site to train a model that presents our scores as yours. Product names belong to their owners. Our text belongs to the desk.",
      ],
    },
    {
      heading: "Not advice",
      paragraphs: [
        "Profiles are opinions about software. They are not legal, medical, financial, or professional advice. The [Harvey](/agents/harvey) profile is a software review, not a recommendation to take or refuse a legal position. Decisions about production systems, customers, and money are yours. The [refuse list](/briefings/do-not-delegate) is a suggestion from editors, not a duty of care we owe your company.",
      ],
    },
    {
      heading: "No warranty",
      paragraphs: [
        "Products change. Scores go stale. We date the issue so that staleness is visible. The site is provided as is, without a warranty of completeness or fitness for a particular procurement. We are not liable for a purchase, an outage, or a hiring decision you made because you agreed with a paragraph. If a fact is wrong, tell us. The [corrections](/corrections) page is how we fix the record. A correction is not an admission of a broader duty.",
      ],
    },
    {
      heading: "Acceptable use",
      paragraphs: [
        "Do not attack the site, probe it for sport, or send the contact form anything unlawful. Do not imply that we endorsed you. We do not.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "Questions about these terms go through the [contact page](/contact). If a future version names a governing law and a venue, it will name them here. Until then, the practical rule is: use the site fairly, and write to us when we are wrong.",
      ],
    },
  ],
};

export const editorial: LongPage = {
  kicker: "Standards",
  title: "Editorial standards",
  dek: "How a profile gets assigned, edited, and left alone.",
  updated: "9 November 2026",
  sections: [
    {
      heading: "Assignment",
      paragraphs: [
        "The editor assigns a profile to the writer who covers that desk. Coding products go to the tools editor. Customer and workplace products go to the enterprise correspondent. General agents go to the staff writer. The editor reads everything that carries a score.",
        "We do not assign a profile to someone who works for the vendor, consults for the vendor, or holds a material investment they are not willing to see printed. This issue, no such conflict sits on the masthead.",
      ],
    },
    {
      heading: "Reporting",
      paragraphs: [
        "A profile describes what the product is for, where it is strong, where it fails, and how we would try it. Claims about a feature should be checkable in the product or in current public documentation. We do not invent usage statistics, customer counts, or benchmark wins. If we do not know, we say the score is a judgment.",
        "We do not accept embargoed briefings in exchange for a kinder rank. Vendors may send factual corrections. They may not see the score before publication.",
      ],
    },
    {
      heading: "Editing",
      paragraphs: [
        "The editor can change a score. When that happens, the writer and the editor agree on the sentence that justifies it. Profiles are not a compromise between five adjectives. They are an argument.",
        "Headlines do not promise what the text retracts. If the dek says a product is last because of value, the value section has to carry that weight.",
      ],
    },
    {
      heading: "After publication",
      paragraphs: [
        "Material factual fixes are logged on the [corrections](/corrections) page. We do not quietly polish a score because a vendor was unhappy. The next issue is the place for a changed mind. Readers who want the old reasoning can see the date.",
      ],
    },
  ],
};

export const corrections: LongPage = {
  kicker: "Record",
  title: "Corrections",
  dek: "Issue 11 has no corrections yet. This page is where they will live.",
  updated: "9 November 2026",
  sections: [
    {
      heading: "The log",
      paragraphs: [
        "When we change a factual statement a reader could have relied on, we add a dated note here and a line on the article. Typos that do not change meaning may be fixed without a note. Score changes are never silent.",
        "Issue 11, locked 9 November 2026, has not been corrected. If you are looking for a stealth edit, it is not the practice. The [standards](/editorial) explain why.",
      ],
    },
    {
      heading: "How to ask",
      paragraphs: [
        "Send the URL, the sentence, and the source you trust through the [contact page](/contact). A difference of taste — you would have ranked a product higher — is welcome and is not a correction. A wrong vendor, a feature the product does not have, or a policy we described inaccurately is a correction.",
        "We would rather run a short note than defend a broken sentence. The ranking is more useful when the facts underneath it are dull and right.",
      ],
    },
  ],
};

export const disclosure: LongPage = {
  kicker: "Advertising",
  title: "Advertising and independence",
  dek: "How ads, if we run them, stay out of the ranking.",
  updated: "9 November 2026",
  sections: [
    {
      heading: "No one bought a rank",
      paragraphs: [
        "The order of the twenty is an editorial decision. A company cannot pay to rise, to be omitted, or to have a paragraph softened. There is no affiliate program in this issue. If we add one, the link will be labeled in the sentence, not only on this page.",
        "Product names appear so you can find the thing. A mention is not a sponsorship.",
      ],
    },
    {
      heading: "Placements",
      paragraphs: [
        "Some pages reserve a box labeled Advertisement. In this build the box is inert. It is not a link, it does not load Google’s ad script, and it does not look like a profile. The label is there so that a future display ad cannot be mistaken for the desk.",
        "We will not place ads inside a sentence, disguise them as a score, or let an advertiser review a profile. Google AdSense, if the publisher enables it, has its own program rules. Those rules are not a substitute for ours. Our [privacy policy](/privacy) explains cookies that advertising would add.",
      ],
    },
    {
      heading: "For the publisher of this site",
      paragraphs: [
        "If you operate this site and apply to an ad network, use the labeled boxes as the only slots, keep the privacy policy accurate, and do not paste an ad script into a headline. Reviewers tend to trust sites with real articles, a masthead, a contact path, and pages that are not a single thin list. That is the structure of Helm Review. Approval is their decision, not a switch we can throw.",
      ],
    },
  ],
};
