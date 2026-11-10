export function pageHead(title: string, description: string) {
  const full = title.includes("Helm Review") ? title : `${title} · Helm Review`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
    ],
  };
}
