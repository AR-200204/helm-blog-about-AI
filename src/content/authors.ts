import type { Author } from "./types";

export const authors: Author[] = [
  {
    slug: "mara-ellison",
    name: "Mara Ellison",
    role: "Editor",
    bio: [
      "Mara Ellison edits Helm Review and locks the desk ranking. She started as a software reporter and still reads release notes the way other people read box scores. Her rule for this magazine is simple: if a product cannot be described without a slogan, it does not get a feature.",
      "She writes the lead essays, the methodology, and any correction that changes a rank. She is not a spokesperson for any lab in the table.",
    ],
  },
  {
    slug: "jonah-park",
    name: "Jonah Park",
    role: "Staff writer",
    bio: [
      "Jonah Park covers general-purpose agents: the tabs people leave open, the browsers that click for them, and the gap between a demo video and a Tuesday afternoon. He is allergic to benchmark charts that do not name the task.",
      "Before the desk, he wrote documentation for a support team, which is why his pieces keep asking what the agent is allowed to say out loud.",
    ],
  },
  {
    slug: "adele-okonkwo",
    name: "Adele Okonkwo",
    role: "Enterprise correspondent",
    bio: [
      "Adele Okonkwo writes about agents that have to survive a security review. She covers workplace suites, customer platforms, and the unglamorous questions: where the log lives, who can turn the agent off, and what the contract says when it is wrong.",
      "She does not rank a product higher because a company is large. She ranks it by whether a cautious team can adopt it without inventing a new department.",
    ],
  },
  {
    slug: "luis-ferreira",
    name: "Luis Ferreira",
    role: "Tools editor",
    bio: [
      "Luis Ferreira owns the coding-agent beat. He reads pull requests more carefully than launch posts, and he keeps a private list of tasks he re-runs whenever a vendor ships a new agent mode. The list is boring on purpose: a failing test, a dependency bump, a migration with a sharp edge.",
      "If a coding agent only looks good on a greenfield todo app, he says so.",
    ],
  },
];

export function getAuthor(slug: string) {
  return authors.find((author) => author.slug === slug);
}
