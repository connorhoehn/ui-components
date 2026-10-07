export interface TeamChannelItem {
    channel: string;
    name: string;
    unreadCount?: number;
    mentioned?: boolean;
    muted?: boolean;
    private?: boolean;
    live?: boolean;
    /** Pinned WITHIN its team — see `onTogglePinChannel` on the tree props. */
    pinned?: boolean;
}
export interface TeamTreeItem {
    teamId: string;
    name: string;
    avatarUrl?: string;
    channels: readonly TeamChannelItem[];
    expanded?: boolean;
    /** Pinned among the other teams — see `onTogglePinTeam` on the tree props. */
    pinned?: boolean;
}
export interface TeamChannelTreeProps {
    teams: readonly TeamTreeItem[];
    activeChannel?: string | null;
    onSelectChannel: (channel: string) => void;
    /** Controls expansion when given; the tree keeps its own state when absent. */
    onToggleTeam?: (teamId: string, expanded: boolean) => void;
    /**
     * The + on a team row. Receives the button itself so the host can hang the
     * create form off it — beside the team it is creating in, not centred over
     * the whole app.
     */
    onCreateChannel?: (teamId: string, trigger: HTMLElement) => void;
    /** "Manage team" in the team's ⋯ menu. */
    onManageTeam?: (teamId: string) => void;
    /** "Leave team" in the team's ⋯ menu. */
    onLeaveTeam?: (teamId: string) => void;
    /**
     * "Pin" / "Unpin" in the team's ⋯ menu — same language as `ConversationList`'s
     * `onTogglePin`. Pinned teams sort before unpinned ones (stable within each
     * group; see the sort below).
     */
    onTogglePinTeam?: (teamId: string, next: boolean) => void;
    /**
     * Pin / unpin one channel inside its team. Unlike a team's ⋯ menu, a channel
     * row has no menu today, so this is offered as a single hover-revealed
     * button rather than opening a `DropdownMenu` for one action — see the
     * render below for why. A pinned channel sorts before its unpinned siblings
     * but stays inside its team: the tree is a hierarchy, and lifting a channel
     * out into a flat "Pinned" group would be a second structure fighting the
     * first. A flat, cross-team Pinned group (if the host wants one) is the
     * host's business, built from this same `pinned` field.
     */
    onTogglePinChannel?: (channel: string, next: boolean) => void;
    /** The + on the "Teams" heading. Receives the button, for the same reason. */
    onCreateTeam?: (trigger: HTMLElement) => void;
    /** Hides the "Teams" heading for a host that draws its own. */
    heading?: string | false;
    /**
     * The rail's "Find a chat" text, so a channel inside a team can be found by
     * typing its name.
     *
     * The rail filtered its FLAT rows and left the tree alone, so a channel that
     * lived in a team was unreachable by search — typing "standups" returned
     * nothing while #Standups sat one fold away. Teams and Slack both find
     * channels this way and it is how people expect to reach one they are not
     * already looking at.
     *
     * While filtering, a matching team is shown OPEN regardless of how it was
     * left — and without disturbing that: the reader's own expansion is
     * untouched underneath and returns intact when the box is cleared. A team
     * whose NAME matches keeps all its channels (you asked for the team); any
     * other shows only the channels that match.
     */
    filter?: string;
    /**
     * Folds the whole tree away behind its heading, the way the rail's other
     * sections fold. Controlled together with `onToggleCollapse` — the host owns
     * it so it can persist it, and the heading is inert without the handler.
     *
     * Distinct from a team's own expansion (`expanded` / `onToggleTeam`): that
     * opens one team's channels, this hides the Teams section outright, and
     * reopening it leaves every team exactly as expanded as it was.
     */
    collapsed?: boolean;
    /** Fires with the state the host should switch to. */
    onToggleCollapse?: (next: boolean) => void;
    className?: string;
    'data-testid'?: string;
}
export declare function TeamChannelTree({ teams, activeChannel, onSelectChannel, onToggleTeam, onCreateChannel, onManageTeam, onLeaveTeam, onTogglePinTeam, onTogglePinChannel, onCreateTeam, heading, filter, collapsed, onToggleCollapse, className, 'data-testid': testId, }: TeamChannelTreeProps): import("react").JSX.Element;
export default TeamChannelTree;
//# sourceMappingURL=TeamChannelTree.d.ts.map