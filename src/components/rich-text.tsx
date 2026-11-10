export function RichText({ text }: { text: string }) {
  const chunks = text.split(/(\[[^\]]+\]\(\/[^)]+\))/g);
  return (
    <>
      {chunks.map((chunk, index) => {
        const match = chunk.match(/^\[([^\]]+)\]\((\/[^)]+)\)$/);
        if (!match) return <span key={index}>{chunk}</span>;
        return (
          <a
            key={index}
            href={match[2]}
            className="underline decoration-rule underline-offset-4 hover:decoration-oxide"
          >
            {match[1]}
          </a>
        );
      })}
    </>
  );
}
