// frontend/src/components/doc-editor/TableOfContents.tsx
//
// Mini table of contents sidebar that shows document sections as landmarks.
// Highlights the currently visible section as the user scrolls.

import { useState, useEffect, useCallback } from 'react';
import { cn } from '../../lib/cn';

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
  focusedSectionId: string | null;
}

export default function TableOfContents({ sections, focusedSectionId }: TableOfContentsProps) {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  // Track which section is currently in view using IntersectionObserver
  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        }
        if (bestEntry) {
          const id = bestEntry.target.id.replace('section-', '');
          setActiveSectionId(id);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-80px 0px -40% 0px' },
    );

    for (const section of sections) {
      const el = document.getElementById(`section-${section.id}`);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  // Use focused section as fallback
  const currentId = activeSectionId || focusedSectionId;

  const handleClick = useCallback((sectionId: string) => {
    const el = document.getElementById(`section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Deduplicate sections by ID
  const uniqueSections = sections.filter((s, i, arr) => arr.findIndex(x => x.id === s.id) === i);

  if (uniqueSections.length === 0) return null;

  const currentIndex = uniqueSections.findIndex(s => s.id === currentId);

  return (
    <div className={cn('flex flex-col gap-0 text-[11px] w-[140px] max-h-[calc(100vh-160px)] overflow-y-auto')}>
      {/* Header */}
      <div className={cn('text-[10px] font-semibold text-text-tertiary uppercase tracking-wide mb-1.5')}>
        Contents
      </div>

      {uniqueSections.map((section, idx) => {
        const isActive = section.id === currentId;
        const isPast = currentIndex >= 0 && idx < currentIndex;

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => handleClick(section.id)}
            className={cn('flex items-center gap-2 py-1 border-none bg-transparent cursor-pointer text-left font-[inherit]')}
          >
            {/* Timeline dot */}
            <div className={cn('flex flex-col items-center w-3 shrink-0')}>
              <div
                className={cn(
                  'rounded-full transition-all duration-200',
                  isActive ? 'w-2 h-2 bg-[#3b82f6] shadow-[0_0_0_3px_rgba(59,130,246,0.2)]' :
                  isPast ? 'w-1.5 h-1.5 bg-[#94a3b8]' : 'w-1.5 h-1.5 bg-[#d1d5db]',
                )}
              />
            </div>

            {/* Label */}
            <span className={cn(
              'text-[11px] overflow-hidden text-ellipsis whitespace-nowrap transition-colors duration-200',
              isActive ? 'font-semibold text-[#1e293b]' :
              isPast ? 'font-normal text-[#64748b]' : 'font-normal text-text-tertiary',
            )}>
              {section.title || 'Untitled'}
            </span>
          </button>
        );
      })}

      {/* Progress indicator */}
      {currentIndex >= 0 && (
        <div className={cn('text-[10px] text-text-tertiary mt-2')}>
          {currentIndex + 1} / {uniqueSections.length}
        </div>
      )}
    </div>
  );
}
