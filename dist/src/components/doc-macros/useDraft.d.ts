export type Draft<T> = [value: T, set: (next: T) => void, read: () => T];
export declare function useDraft<T>(initial: T): Draft<T>;
export default useDraft;
//# sourceMappingURL=useDraft.d.ts.map