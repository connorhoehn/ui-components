// Reports a component's focus mode to its host: `report(true)` when `active`
// turns on, `report(false)` when it turns off or the component unmounts while
// on. Never called for the initial `false`. Shared by the deck editor's and
// reader's present mode (2.548.0).
import { useEffect, useRef } from 'react';

export function useFocusModeReport(active: boolean, report: ((focused: boolean) => void) | undefined): void {
  const latest = useRef(report);
  latest.current = report;
  useEffect(() => {
    if (!active) return undefined;
    latest.current?.(true);
    return () => latest.current?.(false);
  }, [active]);
}
