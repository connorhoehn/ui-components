// frontend/src/components/pipelines/nodes/docsContent.tsx
//
// Inline help copy shown in the ConfigPanel "Docs" tab for each of the 8 node
// types. Content is derived from PIPELINES_PLAN.md §5 (node spec) and §18.10
// (UI/help). Pithy, direct; intended as in-product reference — not prose docs.
//
// Shape: a flat Record<NodeType, ReactNode>. The ConfigPanel applies its own
// prose styling (font size, line-height, <h4> border) via inline styles on
// the container, so the JSX here is semantic-only.

import type { ReactNode } from 'react';
import type { NodeType } from '../../../types/pipeline';

const docsContent: Record<NodeType, ReactNode> = {
  // -------------------------------------------------------------------------
  // Trigger
  // -------------------------------------------------------------------------
  trigger: (
    <>
      <h4>What it does</h4>
      <p>The entry point of every pipeline. Every pipeline has exactly one trigger.</p>

      <h4>Trigger types</h4>
      <ul>
        <li><code>manual</code> — started by clicking Run in the editor.</li>
        <li><code>document.finalize</code> / <code>document.submit</code> / <code>document.comment</code> — fires on doc lifecycle events for a given document type.</li>
        <li><code>schedule</code> — cron expression (e.g. <code>0 9 * * 1-5</code>).</li>
        <li><code>webhook</code> — inbound HTTP POST at the configured path.</li>
      </ul>

      <h4>Fields</h4>
      <ul>
        <li><code>triggerType</code> — one of the above.</li>
        <li><code>documentTypeId</code> — required for <code>document.*</code>.</li>
        <li><code>schedule</code> / <code>webhookPath</code> — per type.</li>
      </ul>

      <h4>Wiring</h4>
      <p>One output handle <code>out</code> that fires downstream with <code>{'{ trigger, payload }'}</code> as the initial context.</p>
    </>
  ),

  // -------------------------------------------------------------------------
  // LLM
  // -------------------------------------------------------------------------
  llm: (
    <>
      <h4>What it does</h4>
      <p>Calls an LLM with a prompt template filled from pipeline context.</p>

      <h4>Provider &amp; model</h4>
      <ul>
        <li><code>anthropic</code> — Claude models (e.g. <code>claude-sonnet-4-6</code>).</li>
        <li><code>bedrock</code> — same models via AWS Bedrock.</li>
      </ul>

      <h4>Prompt templates</h4>
      <p>Interpolate with <code>{'{{ context.steps.X.output }}'}</code> or any dotted path into the run context.</p>

      <h4>Streaming</h4>
      <p>Toggle on to emit <code>pipeline.llm.token</code> events as text arrives; off for a single response.</p>

      <h4>Errors</h4>
      <p>The <code>error</code> handle routes downstream on LLM failure — retried per <code>RetryManager</code> policy before surfacing here.</p>
    </>
  ),

  // -------------------------------------------------------------------------
  // Transform
  // -------------------------------------------------------------------------
  transform: (
    <>
      <h4>What it does</h4>
      <p>Pure data transform — JSONPath, template string, or sandboxed JavaScript. No side effects.</p>

      <h4>When to use each</h4>
      <ul>
        <li><code>jsonpath</code> — extract a value, e.g. <code>$.document.body.sections[0]</code>.</li>
        <li><code>template</code> — shape a string from context, e.g. <code>{'Hi {{context.user.name}}'}</code>.</li>
        <li><code>javascript</code> — arbitrary logic; runs in an isolated sandbox with <code>context</code> as input.</li>
      </ul>

      <h4>Output</h4>
      <p><code>outputKey</code> scopes the result into <code>context.{'{outputKey}'}</code>. Leave blank to merge into the root context.</p>
    </>
  ),

  // -------------------------------------------------------------------------
  // Condition
  // -------------------------------------------------------------------------
  condition: (
    <>
      <h4>What it does</h4>
      <p>Branches the flow based on a boolean expression evaluated over context.</p>

      <h4>Expression language</h4>
      <p>JSONPath lookups combined with booleans and comparisons, e.g. <code>$.llm.output.sentiment == "positive"</code> or <code>$.score &gt; 0.8 &amp;&amp; $.reviewed</code>.</p>

      <h4>Wiring</h4>
      <p>Two output handles: <code>true</code> and <code>false</code>. Connected branches run; unconnected branches are skipped and their step is marked <code>skipped</code>.</p>
    </>
  ),

  // -------------------------------------------------------------------------
  // Action
  // -------------------------------------------------------------------------
  action: (
    <>
      <h4>What it does</h4>
      <p>Performs a side-effect: updates a doc, posts a comment, notifies, calls a webhook, or invokes an MCP tool.</p>

      <h4>Subtypes</h4>
      <ul>
        <li><code>update-document</code> — patch a document's body.</li>
        <li><code>post-comment</code> — append a comment thread entry.</li>
        <li><code>notify</code> — push notification to users/roles.</li>
        <li><code>webhook</code> — outbound HTTP request.</li>
        <li><code>mcp-tool</code> — invoke a registered MCP tool by name.</li>
      </ul>

      <h4>Idempotent flag</h4>
      <p>If <code>idempotent</code> is true, retries are safe after partial completion — the runtime may re-invoke the action without guarding against duplicates.</p>

      <h4>Errors</h4>
      <p>The <code>error</code> handle routes on failure (after retries), or fails the run if <code>onError</code> is <code>fail-run</code>.</p>
    </>
  ),

  // -------------------------------------------------------------------------
  // Fork
  // -------------------------------------------------------------------------
  fork: (
    <>
      <h4>What it does</h4>
      <p>Splits the flow into N parallel branches that all run concurrently against the same context snapshot.</p>

      <h4>Branch count</h4>
      <p>2-8 branches. Each branch exposes a handle <code>branch-0</code>, <code>branch-1</code>, etc.</p>

      <h4>Downstream</h4>
      <p>Typically paired with a <code>Join</code> to merge results. Without a Join, each branch terminates independently and the run completes when all tails finish.</p>
    </>
  ),

  // -------------------------------------------------------------------------
  // Join
  // -------------------------------------------------------------------------
  join: (
    <>
      <h4>What it does</h4>
      <p>Combines N parallel branches back into one flow.</p>

      <h4>Modes</h4>
      <ul>
        <li><code>all</code> — wait for every input.</li>
        <li><code>any</code> — fire as soon as the first input arrives; later inputs are ignored.</li>
        <li><code>n_of_m</code> — fire after <code>n</code> of <code>m</code> inputs complete.</li>
      </ul>

      <h4>Merge strategies</h4>
      <ul>
        <li><code>deep-merge</code> — recursive object merge.</li>
        <li><code>array-collect</code> — collect each branch's output into an array.</li>
        <li><code>last-writer-wins</code> — final branch to arrive replaces prior values.</li>
      </ul>

      <h4>Partial failures (§17.2)</h4>
      <p>In <code>all</code> mode a failed branch fails the run. In <code>any</code>/<code>n_of_m</code> failed branches count against the required total — the Join fires as soon as enough successes arrive.</p>
    </>
  ),

  // -------------------------------------------------------------------------
  // Approval
  // -------------------------------------------------------------------------
  approval: (
    <>
      <h4>What it does</h4>
      <p>Blocks the pipeline waiting for human approval. The run enters <code>awaiting_approval</code> until decisions are recorded.</p>

      <h4>Approvers</h4>
      <p>A list of users or roles. <code>requiredCount</code> controls how many approvals are needed (n-of-m).</p>

      <h4>Timeout</h4>
      <p>Optional <code>timeoutMs</code> with <code>timeoutAction</code> of <code>reject</code> or <code>approve</code> — decides the outcome if no one responds in time.</p>

      <h4>Wiring</h4>
      <p>Two output handles: <code>approved</code> and <code>rejected</code>. The flow resumes down the matching branch.</p>
    </>
  ),

  // -------------------------------------------------------------------------
  // Agent
  // -------------------------------------------------------------------------
  agent: (
    <>
      <h4>What it does</h4>
      <p>Invokes a Strands agent via A2A protocol. The agent processes the input and returns a structured response.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>agentId</code> — agent identifier, in whatever form the host's agent runtime uses.</li>
        <li><code>protocol</code> — <code>a2a</code> (recommended) or <code>direct</code>.</li>
        <li><code>inputTemplate</code> — supports <code>{'{{context.*}}'}</code> substitution.</li>
        <li><code>streaming</code> — whether to stream the agent's response tokens.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Output handles: <code>out</code> (success) and <code>error</code> (invocation failure).</p>
    </>
  ),

  'mcp-tool': (
    <>
      <h4>What it does</h4>
      <p>Invokes an external tool through an MCP Gateway server.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>gatewayUrl</code> — MCP Gateway endpoint.</li>
        <li><code>toolName</code> — registered tool to invoke.</li>
        <li><code>inputTemplate</code> — JSON input with substitution support.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Output handles: <code>out</code> and <code>error</code>.</p>
    </>
  ),

  'knowledge-base': (
    <>
      <h4>What it does</h4>
      <p>Queries a knowledge base for relevant document chunks (RAG retrieval). Which retrieval backend answers is configured by the host.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>knowledgeBaseId</code> — knowledge base identifier.</li>
        <li><code>queryTemplate</code> — natural language query with substitution.</li>
        <li><code>topK</code> — number of chunks to retrieve (default 5).</li>
        <li><code>scoreThreshold</code> — minimum relevance score (0–1).</li>
      </ul>
      <h4>Wiring</h4>
      <p>Output handles: <code>out</code> (retrieved chunks in context) and <code>error</code>.</p>
    </>
  ),

  'graph-query': (
    <>
      <h4>What it does</h4>
      <p>Runs a query against a graph database. The query dialect is whatever the host's graph engine accepts.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>graphId</code> — graph identifier.</li>
        <li><code>query</code> — openCypher query (NOT Gremlin/SPARQL).</li>
        <li><code>parameters</code> — named query parameters.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Output handles: <code>out</code> and <code>error</code>.</p>
    </>
  ),

  memory: (
    <>
      <h4>What it does</h4>
      <p>Reads from or writes to a scoped key/value memory (session or long-term). The backing store is supplied by the host.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>mode</code> — <code>read</code> or <code>write</code>.</li>
        <li><code>scope</code> — <code>session</code> (ephemeral) or <code>long-term</code> (persistent).</li>
        <li><code>namespace</code> — memory collection key.</li>
        <li><code>keyExpression</code> — lookup key (read) or storage key (write).</li>
      </ul>
      <h4>Wiring</h4>
      <p>Output handles: <code>out</code> and <code>error</code>.</p>
    </>
  ),

  guardrail: (
    <>
      <h4>What it does</h4>
      <p>Applies content filtering. Evaluates input against the host's configured policies and routes accordingly.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>guardrailId</code> — guardrail identifier.</li>
        <li><code>inputField</code> — context path to evaluate.</li>
        <li><code>action</code> — <code>block</code>, <code>mask</code>, or <code>warn</code>.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Two output handles: <code>pass</code> (content OK) and <code>block</code> (content flagged).</p>
    </>
  ),

  policy: (
    <>
      <h4>What it does</h4>
      <p>Evaluates a Cedar authorization policy against principal/action/resource.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>policyStoreId</code> — Cedar policy store identifier.</li>
        <li><code>principal</code> — who is requesting (supports substitution).</li>
        <li><code>action</code> — what action is being performed.</li>
        <li><code>resource</code> — what resource is being accessed.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Two output handles: <code>allow</code> and <code>deny</code>.</p>
    </>
  ),

  'ag-ui-output': (
    <>
      <h4>What it does</h4>
      <p>Streams output to the AG-UI frontend via Server-Sent Events. This is a terminal node — no downstream flow.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>sourceField</code> — context path to stream.</li>
        <li><code>eventType</code> — AG-UI event type to emit (TEXT_MESSAGE_CONTENT, STATE_DELTA, or CUSTOM).</li>
        <li><code>terminal</code> — marks this as the pipeline endpoint.</li>
      </ul>
      <h4>Wiring</h4>
      <p>One input handle <code>in</code>. No output — this is the endpoint.</p>
    </>
  ),

  'image-source': (
    <>
      <h4>What it does</h4>
      <p>Injects an existing image into the pipeline context. Use this as the entry point for image-processing pipelines when the image is already stored in the blob store.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>imageId</code> — optional; can be set at run time by the trigger or a preceding step.</li>
        <li><code>outputKey</code> — the key written to pipeline context (default: <code>imageRef</code>).</li>
      </ul>
      <h4>Wiring</h4>
      <p>One output handle <code>out</code>. No inputs — this is a source node.</p>
    </>
  ),

  'image:save': (
    <>
      <h4>What it does</h4>
      <p>Writes a produced image to a named file in the artifact store. Dispatched server-side by the SaveStepHandler.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>sourceImagePath</code> — JSONPath to the imageId to save (default: <code>$.scatter.parentImageId</code>).</li>
        <li><code>filenameTemplate</code> — output filename; supports <code>{'{{scatter.item.label}}'}</code>, <code>{'{{scatter.index}}'}</code>, <code>{'{{scatter.parentImageId}}'}</code>.</li>
      </ul>
      <h4>Wiring</h4>
      <p>One input <code>in</code>, one output <code>out</code>, one error handle <code>error</code>.</p>
    </>
  ),

  scatter: (
    <>
      <h4>What it does</h4>
      <p>Fans out over a collection — runs downstream nodes once per item in the scatter set. Results are collected by a downstream Join or Save node.</p>
      <h4>Wiring</h4>
      <p>One input <code>in</code>. One output <code>out</code> that fires once per item in the scatter collection.</p>
    </>
  ),

  'image:resize': (
    <>
      <h4>What it does</h4>
      <p>Resizes an image to the target dimensions using sharp.resize().</p>
      <h4>Fields</h4>
      <ul>
        <li><code>width</code> / <code>height</code> — target dimensions in pixels.</li>
        <li><code>fit</code> — <code>cover</code>, <code>contain</code>, <code>fill</code>, <code>inside</code>, or <code>outside</code> (default: <code>cover</code>).</li>
        <li><code>background</code> — hex fill colour used by <code>contain</code> / <code>inside</code> when padding is needed.</li>
        <li><code>withoutEnlargement</code> — skip resize if image is already smaller than target.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>, error handle <code>error</code>.</p>
    </>
  ),

  'image:transform': (
    <>
      <h4>What it does</h4>
      <p>Applies a sequential chain of geometric operations to an image.</p>
      <h4>Operations</h4>
      <ul>
        <li><code>rotate</code> — rotate by degrees (e.g. 90, 180, 270).</li>
        <li><code>flip</code> — mirror vertically.</li>
        <li><code>flop</code> — mirror horizontally.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>, error handle <code>error</code>.</p>
    </>
  ),

  'image:format-convert': (
    <>
      <h4>What it does</h4>
      <p>Converts the image to a new format using sharp.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>format</code> — target format: <code>jpeg</code>, <code>png</code>, <code>webp</code>, <code>avif</code>, <code>tiff</code>, <code>gif</code>.</li>
        <li><code>quality</code> — 1–100 for lossy formats.</li>
        <li><code>lossless</code> — force lossless for WebP/AVIF.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>, error handle <code>error</code>.</p>
    </>
  ),

  'image:sharpen': (
    <>
      <h4>What it does</h4>
      <p>Applies unsharp mask sharpening via sharp.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>sigma</code> — Gaussian sigma (0.5–3). Controls radius of the blur before differencing.</li>
        <li><code>m1</code> — flat area threshold (default 1.0).</li>
        <li><code>m2</code> — jagged area threshold (default 2.0).</li>
      </ul>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>, error handle <code>error</code>.</p>
    </>
  ),

  'image:watermark': (
    <>
      <h4>What it does</h4>
      <p>Composites an overlay image (watermark / logo) atop the source.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>overlayImageId</code> — the watermark image stored in the blob store.</li>
        <li><code>gravity</code> — placement: <code>northwest</code>, <code>north</code>, <code>northeast</code>, <code>west</code>, <code>center</code>, <code>east</code>, <code>southwest</code>, <code>south</code>, <code>southeast</code>.</li>
        <li><code>opacity</code> — 0.0–1.0 (default 1.0).</li>
        <li><code>offsetX</code> / <code>offsetY</code> — pixel nudge from gravity anchor.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>, error handle <code>error</code>.</p>
    </>
  ),

  'image:crop': (
    <>
      <h4>What it does</h4>
      <p>Crops a rectangular region from the source image using a bounding box resolved from pipeline context.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>sourceImagePath</code> — JSONPath to the source imageId (default: <code>$.trigger.imageRef</code>).</li>
        <li><code>bboxPath</code> — JSONPath to a <code>{'{ x, y, width, height }'}</code> object in context.</li>
        <li><code>materialize</code> — if true, saves the cropped image to the blob store; otherwise returns inline.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>.</p>
    </>
  ),

  'image:adjust-bw': (
    <>
      <h4>What it does</h4>
      <p>Converts a colour image to greyscale with an adjustable contrast.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>algorithm</code> — <code>luminosity</code> (default), <code>average</code>, or <code>lightness</code>.</li>
        <li><code>contrast</code> — multiplier applied after greyscale conversion (default 1.0).</li>
      </ul>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>, error handle <code>error</code>.</p>
    </>
  ),

  'image:adjust-layer': (
    <>
      <h4>What it does</h4>
      <p>Applies a composable stack of colour and filter adjustments in sequence.</p>
      <h4>Layer kinds</h4>
      <ul>
        <li><code>brightness</code> / <code>contrast</code> / <code>saturation</code> — multiplicative factor (1.0 = no change).</li>
        <li><code>hue</code> — degrees to rotate the hue wheel.</li>
        <li><code>blur</code> — Gaussian blur radius in pixels.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>, error handle <code>error</code>.</p>
    </>
  ),

  'image:dimensions': (
    <>
      <h4>What it does</h4>
      <p>Reads a source image&apos;s natural size and emits dimension data — <code>width</code>, <code>height</code>, <code>aspectRatio</code>, plus <code>genWidth</code>/<code>genHeight</code> scaled to fit within <code>maxEdge</code>. It does <em>not</em> output an image.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>sourceImagePath</code> — JSONPath to the source image (optional; defaults to the upstream image).</li>
        <li><code>maxEdge</code> — longest-edge cap used to derive the generation dimensions (default 1024).</li>
      </ul>
      <h4>Wiring</h4>
      <p>Image input <code>in</code>, data output <code>out</code> (wire into Generate&apos;s width/height), error handle <code>error</code>.</p>
    </>
  ),

  'image:upscale': (
    <>
      <h4>What it does</h4>
      <p>Super-resolves a source image via a self-hosted x4 upscaler and outputs a new, higher-resolution image.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>sourceImagePath</code> — JSONPath to the source image (optional; defaults to the upstream image).</li>
        <li><code>prompt</code> — optional guidance forwarded to the upscaler.</li>
        <li><code>maxEdge</code> — longest-edge cap applied before the 4× pass (default 1024).</li>
      </ul>
      <h4>Wiring</h4>
      <p>Image input <code>in</code>, image output <code>out</code>, error handle <code>error</code>.</p>
    </>
  ),

  'image:vision-analyze': (
    <>
      <h4>What it does</h4>
      <p>Analyzes an image with a Claude vision model. Supports free-form caption mode (leave schema blank) or structured JSON extraction (provide a JSON Schema).</p>
      <h4>Fields</h4>
      <ul>
        <li><code>imageRefPath</code> — JSONPath to the imageId (default: <code>$.trigger.imageRef</code>).</li>
        <li><code>userPrompt</code> — required. What to ask the model about the image.</li>
        <li><code>outputSchema</code> — optional JSON Schema; presence switches to structured extraction mode.</li>
        <li><code>model</code> — default <code>claude-sonnet-4-6</code>.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>.</p>
    </>
  ),

  'image:vision-classify': (
    <>
      <h4>What it does</h4>
      <p>Classifies an image into one of a configured label set.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>labels</code> — array of candidate labels (e.g. <code>['cat', 'dog', 'bird']</code>).</li>
        <li><code>model</code> — default <code>claude-haiku-4-5</code>.</li>
      </ul>
      <h4>Output</h4>
      <p>Produces <code>{'{ label, confidence }'}</code> in context.</p>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>, error handle <code>error</code>.</p>
    </>
  ),

  'image:vision-describe': (
    <>
      <h4>What it does</h4>
      <p>Generates a natural-language caption for an image via Claude Haiku.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>imageRefPath</code> — JSONPath to the imageId.</li>
        <li><code>userPrompt</code> — optional override (default: describe the image).</li>
        <li><code>systemPrompt</code> — optional system context.</li>
        <li><code>maxOutputTokens</code> — cap on response length.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>, error handle <code>error</code>.</p>
    </>
  ),

  'image:vision-tag': (
    <>
      <h4>What it does</h4>
      <p>Extracts ranked tags from an image. Open-vocabulary or guided by a candidate tag list.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>candidateTags</code> — optional array to guide tagging. Leave blank for open-vocabulary.</li>
        <li><code>maxTags</code> — maximum number of tags to return (default 10).</li>
        <li><code>model</code> — default <code>claude-haiku-4-5</code>.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>, error handle <code>error</code>.</p>
    </>
  ),

  'image:vision-extract-text': (
    <>
      <h4>What it does</h4>
      <p>Extracts text from an image via Claude vision (OCR).</p>
      <h4>Fields</h4>
      <ul>
        <li><code>imageRefPath</code> — JSONPath to the imageId.</li>
        <li><code>model</code> — default <code>claude-sonnet-4-6</code>.</li>
        <li><code>systemPrompt</code> — optional instruction for the extraction task.</li>
        <li><code>maxOutputTokens</code> — response length cap.</li>
      </ul>
      <h4>Output</h4>
      <p>Produces <code>{'{ text, lines }'}</code> in context.</p>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>, error handle <code>error</code>.</p>
    </>
  ),

  'image:generate': (
    <>
      <h4>What it does</h4>
      <p>Generates images from a text prompt using the host's configured image model.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>prompt</code> — required. Describes what to generate.</li>
        <li><code>model</code> — default <code>amazon.titan-image-generator-v1</code>.</li>
        <li><code>width</code> / <code>height</code> — output dimensions.</li>
        <li><code>seed</code> — optional for reproducible generation.</li>
        <li><code>numImages</code> — 1–4 images to produce.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>, error handle <code>error</code>.</p>
    </>
  ),

  'image:variation': (
    <>
      <h4>What it does</h4>
      <p>Generates variations of a source image using Nova Canvas. Always fans out — each variation becomes a separate downstream arm.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>sourceImagePath</code> — JSONPath to the source imageId.</li>
        <li><code>numVariations</code> — 1–8 variations to generate (default 1).</li>
        <li><code>similarity</code> — 0.0–1.0 how closely each variation resembles the source (default 0.7).</li>
        <li><code>model</code> — default <code>amazon.nova-canvas-v1:0</code>.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code> (fires once per variation), error handle <code>error</code>.</p>
    </>
  ),

  'image:edit-prompt': (
    <>
      <h4>What it does</h4>
      <p>Inpaints or outpaints a region of an image using Nova Canvas.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>prompt</code> — required. Describes what to generate in the edited region.</li>
        <li><code>sourceImagePath</code> — JSONPath to the source imageId.</li>
        <li><code>maskImagePath</code> — optional JSONPath to a mask imageId (white = edit, black = preserve). Omit for outpainting.</li>
        <li><code>model</code> — default <code>amazon.nova-canvas-v1:0</code>.</li>
      </ul>
      <h4>Wiring</h4>
      <p>Input <code>in</code>, output <code>out</code>, error handle <code>error</code>.</p>
    </>
  ),
};

export default docsContent;
