import { type ReactNode } from 'react';
import type { Decorator } from '@storybook/react-vite';
/**
 * A 640×400 canvas stream: a soft backdrop and a head-and-shoulders figure in
 * the person's hue, breathing slightly so a frozen frame is obvious. Cached
 * per key. Returns null where canvas capture is unavailable (jsdom).
 */
export declare function fakeCameraStream(key: string, hue?: number): MediaStream | null;
export declare const CAST: {
    readonly connor: {
        readonly userId: 'dev-connor';
        readonly name: 'Connor Hoehn';
        readonly hue: 205;
    };
    readonly alice: {
        readonly userId: 'dev-alice';
        readonly name: 'Alice Chen';
        readonly hue: 330;
    };
    readonly frank: {
        readonly userId: 'dev-frank';
        readonly name: 'Frank Davis';
        readonly hue: 30;
    };
    readonly bob: {
        readonly userId: 'dev-bob';
        readonly name: 'Bob Martinez';
        readonly hue: 150;
    };
    readonly carol: {
        readonly userId: 'dev-carol';
        readonly name: 'Carol Johnson';
        readonly hue: 270;
    };
};
export declare const DEVICES: {
    microphones: {
        deviceId: string;
        label: string;
    }[];
    speakers: {
        deviceId: string;
        label: string;
    }[];
    cameras: {
        deviceId: string;
        label: string;
    }[];
};
export type StoryTheme = 'light' | 'dark';
/** Flips <html data-theme> (so portals follow) and paints the story canvas. */
export declare function ThemeRoot({ theme, children, className, }: {
    theme: StoryTheme;
    children: ReactNode;
    className?: string;
}): import("react").JSX.Element;
/** Story decorator: `decorators: [themed('dark')]`. */
export declare function themed(theme: StoryTheme, className?: string): Decorator;
export declare const REVIEW_DOCS: {
    id: string;
    title: string;
}[];
export declare const noop: () => void;
//# sourceMappingURL=documentCallStoryKit.d.ts.map