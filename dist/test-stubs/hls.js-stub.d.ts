declare class HlsStub {
    static isSupported(): boolean;
    static Events: {
        readonly MEDIA_ATTACHED: "media-attached";
        readonly ERROR: "error";
    };
    attachMedia(_el: HTMLMediaElement): void;
    loadSource(_url: string): void;
    destroy(): void;
    on(_event: string, _handler: (...args: unknown[]) => void): void;
}
export default HlsStub;
//# sourceMappingURL=hls.js-stub.d.ts.map