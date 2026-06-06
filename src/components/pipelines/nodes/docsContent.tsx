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
  // Agent (AgentCore)
  // -------------------------------------------------------------------------
  agent: (
    <>
      <h4>What it does</h4>
      <p>Invokes a Strands agent via A2A protocol. The agent processes the input and returns a structured response.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>agentId</code> — AgentCore agent identifier or ARN.</li>
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
      <p>Queries a Bedrock Knowledge Base for relevant document chunks (RAG retrieval).</p>
      <h4>Fields</h4>
      <ul>
        <li><code>knowledgeBaseId</code> — Bedrock KB identifier.</li>
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
      <p>Runs an openCypher query against a Neptune Analytics graph.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>graphId</code> — Neptune Analytics graph identifier.</li>
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
      <p>Reads from or writes to AgentCore Memory (session or long-term).</p>
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
      <p>Applies Bedrock Guardrails content filtering. Evaluates input against configured policies and routes accordingly.</p>
      <h4>Fields</h4>
      <ul>
        <li><code>guardrailId</code> — Bedrock Guardrail identifier.</li>
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
};

export default docsContent;
