// frontend/src/components/pipelines/llm/LLMClient.ts
//
// LLM client abstraction for the frontend pipeline executor. Mirrors the
// distributed-core LLMClient contract with the same AsyncIterable<LLMChunk>
// streaming interface. Two implementations:
//
//   - ProxyLLMClient: streams tokens via the social-api SSE proxy at
//     POST /api/pipelines/llm/stream (API key stays server-side)
//   - FixtureLLMClient: deterministic fixture responses for tests/demos
//
// Used by frontend code that needs to make LLM calls directly (e.g. dev
// utilities). Production pipeline runs go through the backend.

export type LLMChunk =
  | {
      done: false;
      token: string;
    }
  | {
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
  stream(
    model: string,
    systemPrompt: string,
    userPrompt: string,
    opts?: LLMStreamOptions,
  ): AsyncIterable<LLMChunk>;
}
