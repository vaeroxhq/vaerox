/**
 * CodeBlock — mono, hairline, filename header, subtle line spacing.
 * No syntax highlighting: kept purely typographic to preserve the
 * brutal engineering aesthetic and to guarantee legibility across
 * both themes without color decisions.
 */
export function CodeBlock({
  filename,
  language,
  children,
}: {
  filename?: string;
  language?: string;
  children: string;
}) {
  return (
    <figure className="hairline bg-canvas mt-4">
      {(filename || language) && (
        <figcaption className="px-3 py-2 hairline-b flex items-baseline justify-between">
          <span className="font-mono text-overline text-text-2 tabular truncate">{filename}</span>
          {language && <span className="text-overline text-text-3 opacity-70">{language}</span>}
        </figcaption>
      )}
      <pre className="font-mono text-caption text-text-2 px-4 py-3 overflow-x-auto tabular">
        <code>{children}</code>
      </pre>
    </figure>
  );
}
