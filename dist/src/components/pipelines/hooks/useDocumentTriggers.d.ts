import { ActivityEvent } from '../../../hooks/useActivityBus';
/**
 * Subscribes to activity-bus events and fires pipeline runs whose
 * triggerBinding matches. Mount once near the top of the tree (AppLayout).
 *
 * Expects an activity-event accessor. We accept events as a prop-style
 * argument to keep the hook pure and testable; callers wire it up from the
 * same `useActivityBus().events` array they already maintain.
 */
export declare function useDocumentTriggers(events: ActivityEvent[]): void;
//# sourceMappingURL=useDocumentTriggers.d.ts.map