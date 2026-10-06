import type { StoryObj } from '@storybook/react-vite';
import { MachinePresenceMenu } from './components/MachinePresenceMenu';
import type { MachineNode } from './types';
declare const meta: {
    title: string;
    component: typeof MachinePresenceMenu;
    parameters: {
        layout: string;
    };
    args: {
        nodes: MachineNode[];
        models: import("./types").ComputeModel[];
    };
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        nodes: MachineNode[];
        models?: import("./types").ComputeModel[];
        onOpenLab?: () => void;
        onManage?: () => void;
        className?: string;
        'data-testid'?: string;
    }>) => import("react").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
/**
 * The full fixture fleet: a connected MacBook running one Bedrock and one
 * Ollama session, and a stale workstation whose memory sidecar is queuing
 * offline. Click the chip — the panel is the component.
 */
export declare const TwoMachines: Story;
/**
 * One machine, actively working — the everyday state. The dot pulses because
 * a connected machine has live sessions.
 */
export declare const SingleMachine: Story;
/**
 * Connected but idle: paired, heartbeating, nothing running. The chip stays
 * (the user asked "is my machine connected?") but the dot goes static and the
 * panel shows the placeholder rather than an empty list pretending to load.
 * The chip text also drops the session count entirely (`⌂ demo-macbook`, not
 * `⌂ demo-macbook · 0`) — a zero next to a static dot reads as broken, and
 * the dot's tone plus the `title` already say "connected".
 */
export declare const ConnectedIdle: Story;
/**
 * Everything dark: the machine missed its heartbeat horizon. Sessions are
 * gone from the listing — presence a machine can't back is not offered.
 */
export declare const Offline: Story;
/**
 * With the host affordances wired: a lab deep-link and the machines settings
 * surface. Omitting both props omits the footer entirely — a host without a
 * Computer Lab never shows a dead link into one.
 */
export declare const WithActions: Story;
//# sourceMappingURL=MachinePresenceMenu.stories.d.ts.map