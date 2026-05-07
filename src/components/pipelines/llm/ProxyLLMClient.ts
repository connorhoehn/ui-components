// frontend/src/components/pipelines/llm/ProxyLLMClient.ts
//
// Streams LLM tokens via the social-api SSE proxy endpoint at
// POST /api/pipelines/llm/stream. The Anthropic API key stays server-side;
// the frontend only sees token chunks over the SSE stream.
//
// The Vite dev server proxies /api → http://localhost:3001. In production
// the same path goes through the CDN/gateway.

import type { LLMClient, LLMChunk, LLMStreamOptions } from './LLMClient';

const LLM_STREAM_URL = '/api/pipelines/llm/stream';

export class ProxyLLMClient implements LLMClient {
  private readonly baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl ?? '';
  }

  stream(
    model: string,
    systemPrompt: string,
    userPrompt: string,
    opts: LLMStreamOptions = {},
  ): AsyncIterable<LLMChunk> {
    const { temperature, maxTokens, signal } = opts;
    const url = `${this.baseUrl}${LLM_STREAM_URL}`;

    return {
      [Symbol.asyncIterator]: async function* () {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model,
            systemPrompt,
            userPrompt,
            temperature,
            maxTokens: maxTokens ?? 1024,
          }),
          signal,
        });

        if (!response.ok) {
          const text = await response.text().catch(() => '');
          throw new Error(`LLM proxy returned ${response.status}: ${text}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body from LLM proxy');

        const decoder = new TextDecoder();
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith('data: ')) continue;
              const json = trimmed.slice(6);
              try {
                const chunk = JSON.parse(json) as LLMChunk | { error: string };
                if ('error' in chunk) {
                  throw new Error(`LLM stream error: ${chunk.error}`);
                }
                yield chunk;
              } catch (e) {
                if (e instanceof SyntaxError) continue;
                throw e;
              }
            }
          }

          if (buffer.trim()) {
            const trimmed = buffer.trim();
            if (trimmed.startsWith('data: ')) {
              try {
                const chunk = JSON.parse(trimmed.slice(6)) as LLMChunk | { error: string };
                if ('error' in chunk) throw new Error(`LLM stream error: ${chunk.error}`);
                yield chunk;
              } catch {
                // ignore trailing partial data
              }
            }
          }
        } finally {
          reader.releaseLock();
        }
      },
    };
  }
}
