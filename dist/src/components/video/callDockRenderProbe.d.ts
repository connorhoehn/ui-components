export type CallDockRenderPart = 'meta' | 'tile';
type Probe = (part: CallDockRenderPart, id?: string) => void;
export declare function setCallDockRenderProbe(next: Probe | null): void;
export declare function noteCallDockRender(part: CallDockRenderPart, id?: string): void;
export {};
//# sourceMappingURL=callDockRenderProbe.d.ts.map