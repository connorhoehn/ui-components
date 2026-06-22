import { LLMClient, LLMChunk, LLMStreamOptions } from './LLMClient';
export declare class ProxyLLMClient implements LLMClient {
    private readonly baseUrl;
    constructor(baseUrl?: string);
    stream(model: string, systemPrompt: string, userPrompt: string, opts?: LLMStreamOptions): AsyncIterable<LLMChunk>;
}
//# sourceMappingURL=ProxyLLMClient.d.ts.map