export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint: JSON-LD requires dangerouslySetInnerHTML
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
