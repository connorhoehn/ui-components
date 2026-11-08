import { Card } from '@connorhoehn/ui-components/shared';
import { cn } from '@/lib/cn';

interface TableOfContentsProps {
  sections: { id: string; title: string }[];
  activeSectionId: string | null;
}

export function TableOfContents({ sections, activeSectionId }: TableOfContentsProps) {
  return (
    <Card className="fixed bottom-6 right-6 z-[100] max-h-90 w-55 overflow-y-auto px-4 py-3 shadow-md">
      <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-[1.2px] text-text-tertiary">
        CONTENTS
      </div>
      {sections.map((section) => {
        const isActive = section.id === activeSectionId;
        return (
          <div key={section.id} className="flex cursor-pointer items-center gap-2 py-[3px]">
            <span
              className={cn(
                'shrink-0 rounded-full',
                isActive ? 'h-2 w-2 bg-info' : 'h-1.5 w-1.5 bg-border-emphasis',
              )}
            />
            <span
              className={cn(
                'overflow-hidden text-ellipsis whitespace-nowrap text-[12px]',
                isActive ? 'font-semibold text-text-primary' : 'font-normal text-neutral',
              )}
            >
              {section.title}
            </span>
          </div>
        );
      })}
    </Card>
  );
}
