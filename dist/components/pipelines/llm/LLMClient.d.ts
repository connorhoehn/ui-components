export type LLMChunk = {
    done: false;
    token: string;
} | {
    done: true;
    response: string;
    tokensIn: number;
    tokensOut: number;
};
export interface LLMStreamOptions {
    temperature?: number;
    maxTokens?: number;
    signal?: AbortSignal;
}
export interface LLMClient {
    stream(model: string, systemPrompt: string, userPrompt: string, opts?: LLMStreamOptions): AsyncIterable<LLMChunk>;
}
//# sourceMappingURL=LLMClient.d.ts.map