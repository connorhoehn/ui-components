// ConnectionPathStrip — "how are these two connected?", answered as a band
// above the graph: the hops from `findConnectionPath`, with the relationship
// on each step and a button to select the whole corridor.

import { Button } from '../../ui/Button';
import { Inline } from '../../ui/Stack';
import { ContextStrip } from './graphOverlay';
import { PATH_TYPE_LABELS, type PathHop } from './connectionPath';

export interface ConnectionPathStripProps {
  path: PathHop[];
  /** Select every person on the path so the graph shows the corridor. */
  onHighlightPath: (ids: string[]) => void;
}

export function ConnectionPathStrip({ path, onHighlightPath }: ConnectionPathStripProps) {
  const intermediates = path.length - 2;

  return (
    <ContextStrip aria-label="Connection path" data-testid="connection-path-strip">
      <span className="whitespace-nowrap font-semibold text-primary">
        {intermediates === 0
          ? 'Directly connected'
          : `Connected via ${intermediates} ${intermediates === 1 ? 'person' : 'people'}`}
      </span>

      <Inline gap="xs" align="center" wrap className="min-w-0">
        {path.map((hop, i) => (
          <Inline key={hop.person.id} gap="xs" align="center" wrap={false} as="span">
            {i > 0 && (
              <span className="whitespace-nowrap text-[10px] text-text-tertiary">
                —{PATH_TYPE_LABELS[hop.viaType] ?? hop.viaType}→
              </span>
            )}
            {/* The two ENDS are what you asked about; the people between are
                how you get there. Weight says which is which. */}
            <span className={i === 0 || i === path.length - 1 ? 'whitespace-nowrap font-bold' : 'whitespace-nowrap font-medium'}>
              {hop.person.name}
            </span>
          </Inline>
        ))}
      </Inline>

      {intermediates > 0 && (
        <span className="ml-auto">
          <Button variant="primary" size="sm" onClick={() => onHighlightPath(path.map((h) => h.person.id))}>
            Show path on graph
          </Button>
        </span>
      )}
    </ContextStrip>
  );
}
