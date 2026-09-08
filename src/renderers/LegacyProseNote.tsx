// Shown by the scalar renderers when a field is unanswered but the section's
// rich-text fragment still holds prose from before the field had a renderer
// of its own. See legacyProseText() for the full why.
//
// Renders nothing at all when there is no legacy prose, which is the normal
// case — this must not become a permanent line of chrome under every field.

import type { XmlFragment } from 'yjs';
import { legacyProseText } from './scalarValue';

export default function LegacyProseNote({
  sectionId,
  fragment,
}: {
  sectionId: string;
  fragment?: XmlFragment | null;
}) {
  const text = legacyProseText(fragment);
  if (!text) return null;

  return (
    <div
      data-testid={`scalar-legacy-note-${sectionId}`}
      className="mt-1.5 text-[12px] text-text-tertiary break-words"
    >
      <span className="font-medium">Earlier draft:</span> {text}
    </div>
  );
}
