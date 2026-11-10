import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Contact",
      "Write to the Helm Review desk about corrections, privacy, and the ranking.",
    ),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2 || !email.includes("@") || message.length < 40) {
      setError("Add your name, a real email, and at least a few sentences so the note is usable.");
      setSent(false);
      return;
    }
    setError("");
    setSent(true);
    event.currentTarget.reset();
    void topic;
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-xs font-semibold tracking-widest text-oxide uppercase">Desk</p>
      <h1 className="mt-3 font-serif text-5xl">Contact</h1>
      <p className="mt-4 max-w-prose text-lg text-ink">
        Corrections, privacy requests, and questions about the method belong here. A disagreement about a rank is
        welcome. A request to buy a rank is not.
      </p>
      <form onSubmit={onSubmit} className="mt-8 flex max-w-prose flex-col gap-4" noValidate>
        <Field label="Name" name="name" type="text" autoComplete="name" />
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <label className="flex flex-col gap-1 text-sm font-semibold">
          Topic
          <select name="topic" className="min-h-11 border border-rule bg-card px-3 font-normal text-ink">
            <option>Correction</option>
            <option>Privacy</option>
            <option>Editorial</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold">
          Note
          <textarea
            name="message"
            required
            minLength={40}
            rows={7}
            className="border border-rule bg-card px-3 py-2 font-normal text-ink"
          />
        </label>
        {error ? (
          <p role="alert" className="text-sm text-oxide">
            {error}
          </p>
        ) : null}
        {sent ? (
          <p role="status" className="border border-rule bg-card p-3 text-sm text-ink">
            Noted in this session. This preview confirms the form. It does not deliver mail to an editor. Connect the
            form to your own inbox before you rely on it for AdSense or for readers.
          </p>
        ) : null}
        <button type="submit" className="inline-flex min-h-11 items-center self-start bg-ink px-4 text-sm font-semibold text-oxide-ink">
          Send to the desk
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-semibold">
      {label}
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="min-h-11 border border-rule bg-card px-3 font-normal text-ink"
      />
    </label>
  );
}
