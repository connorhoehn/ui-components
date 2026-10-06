import type { PresenceStatus } from './types';
export declare const PRESENCE_DOT: Record<PresenceStatus, {
    fill: string;
    stroke: string;
    label: string;
}>;
/** Any status that means NOT at keyboard. */
export declare const AWAY_STATUSES: PresenceStatus[];
/** The presence filter the graph dims against. */
export type PresenceFilter = 'office' | 'remote' | 'away';
export declare function passesPresenceFilter(status: PresenceStatus, filter: PresenceFilter | null | undefined): boolean;
/** Relationship line styles — the edges and the legend draw from this one map. */
export declare const RELATIONSHIP_STYLES: Record<string, {
    color: string;
    label: string;
    dash?: string;
}>;
//# sourceMappingURL=presence.d.ts.map