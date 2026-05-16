// frontend/src/renderers/rich-text/RichTextReaderRenderer.tsx
//
// Reader-mode renderer for sectionType='rich-text'.
// Shows read-only Tiptap content with a jump-to-editor link.

import type { SectionRendererProps } from '../types';
import TiptapEditor from '../../components/doc-editor/TiptapEditor';

export default function RichTextReaderRenderer({
  section,
  fragment,
  ydoc,
  provider,
  onNavigateToEditor,
}: SectionRendererProps) {
  const hasContent = !!fragment && !!ydoc;

  return (
    <div>
      {hasContent ? (
        <div className="border border-sky-100 border-l-[3px] border-l-sky-400 rounded-md px-3.5 py-2.5 bg-sky-50 text-sm text-slate-800 leading-[1.6]">
          <TiptapEditor
            fragment={fragment}
            ydoc={ydoc}
            provider={provider ?? null}
            user={{ name: '', color: '#6b7280' }}
            editable={false}
            sectionId={section.id}
          />
        </div>
      ) : (
        <div className="text-text-tertiary italic text-[13px]">No content.</div>
      )}

      {onNavigateToEditor && (
        <button
          type="button"
          onClick={() => onNavigateToEditor(section.id)}
          className="mt-2 bg-transparent border-none text-blue-500 text-xs cursor-pointer p-0 font-inherit"
        >
          Edit in editor →
        </button>
      )}
    </div>
  );
}
