export interface ParsedField {
    match: '*' | number[];
    /** Step value for `*\/N`; only meaningful when match === '*'. */
    step?: number;
}
export interface ParsedCron {
    minute: ParsedField;
    hour: ParsedField;
    dayOfMonth: ParsedField;
    month: ParsedField;
    dayOfWeek: ParsedField;
}
export declare function parseCron(expr: string): ParsedCron | null;
export declare function matchesCron(cron: ParsedCron, date: Date): boolean;
/**
 * Walk forward minute-by-minute from `from`, collecting matches until we have
 * `count` of them. Capped at one year of lookups; returns whatever was found
 * if the cap is reached (this avoids infinite loops on impossible expressions
 * like `0 0 31 2 *`).
 */
export declare function nextFires(cron: ParsedCron, from: Date, count: number): Date[];
//# sourceMappingURL=cronUtils.d.ts.map