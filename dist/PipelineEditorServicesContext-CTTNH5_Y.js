import { createContext as de, useContext as W, useState as O, useRef as B, useEffect as F, useCallback as v, useMemo as X, forwardRef as Y, useId as Ce } from "react";
import { a as Ne, u as De } from "./EventStreamContext-CjzSHXy-.js";
import { jsx as U, jsxs as G } from "react/jsx-runtime";
import { u as Oe } from "./IdentityContext-CLalsm_M.js";
import { u as le } from "./WebSocketContext-DPGFyPeZ.js";
import { c as H } from "./cn-B6yFEsav.js";
async function St(e, n) {
  const r = `/api/pipelines/${e}/runs/${n}/force-fail`, o = await fetch(r, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });
  if (!o.ok) {
    const a = await o.text();
    throw new Error(`Force-fail failed: ${o.status} ${a}`);
  }
  return o.json();
}
async function je(e, n, r, o, a) {
  const t = `/api/pipelines/${e}/runs/${n}/retry/${r}`, s = await fetch(t, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: o, ...a ? { snapshotInput: a } : {} })
  });
  if (!s.ok) {
    const i = await s.text();
    throw new Error(`Failed to retry from node ${r}: ${s.status} ${i}`);
  }
  return s.json();
}
const Me = "ws_pipeline_runs_v1:", _e = 50;
function pe(e) {
  return `${Me}${e}`;
}
let Ie = !1;
function Fe(e, n) {
  try {
    localStorage.setItem(e, n);
  } catch (r) {
    Ie || (Ie = !0, console.warn("[runHistory] localStorage write failed", r));
  }
}
function me(e) {
  try {
    const n = localStorage.getItem(pe(e));
    if (!n) return [];
    const r = JSON.parse(n);
    return Array.isArray(r) ? r : [];
  } catch {
    return [];
  }
}
function Pt(e, n) {
  return me(e).find((o) => o.id === n) ?? null;
}
function qe(e, n) {
  const r = me(e).filter((a) => a.id !== n.id), o = [n, ...r].sort((a, t) => t.startedAt.localeCompare(a.startedAt)).slice(0, _e);
  Fe(pe(e), JSON.stringify(o));
}
function Tt(e) {
  try {
    localStorage.removeItem(pe(e));
  } catch {
  }
}
async function Se(e, n) {
  const r = new URLSearchParams();
  n?.limit && r.set("limit", String(n.limit)), n?.cursor && r.set("cursor", n.cursor);
  const o = `/api/pipelines/${e}/runs${r.toString() ? `?${r}` : ""}`;
  try {
    const a = await fetch(o, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
      // Send cookies for auth
    });
    if (!a.ok)
      throw new Error(`Failed to list runs: ${a.status} ${a.statusText}`);
    const t = await a.json();
    return Array.isArray(t.runs) && (t.runs = t.runs.map((s) => ({
      ...s,
      id: s.id ?? s.runId
    })).sort((s, i) => {
      const c = s.startedAt ? new Date(s.startedAt).getTime() : 0;
      return (i.startedAt ? new Date(i.startedAt).getTime() : 0) - c;
    })), t;
  } catch (a) {
    return console.error("[pipelineRuns] Failed to fetch from API:", a), { runs: [] };
  }
}
async function Le(e, n) {
  const r = `/api/v2/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(n)}`;
  try {
    const o = await fetch(r, {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    if (o.status === 404) return null;
    if (!o.ok)
      throw new Error(`Failed to get run: ${o.status} ${o.statusText}`);
    const a = await o.json();
    return { ...a, id: a.runId };
  } catch (o) {
    return console.error("[pipelineRuns] Failed to fetch run:", o), null;
  }
}
const $t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getPipelineRun: Le,
  listPipelineRuns: Se
}, Symbol.toStringTag, { value: "Module" })), Pe = "ws_pipelines_v1_index", He = "ws_pipelines_v1:";
function re(e) {
  return `${He}${e}`;
}
let be = !1;
function fe(e, n) {
  try {
    localStorage.setItem(e, n);
  } catch (r) {
    be || (be = !0, console.warn("[pipelineStorage] localStorage write failed", r));
  }
}
function ge() {
  try {
    const e = localStorage.getItem(Pe);
    if (!e) return [];
    const n = JSON.parse(e);
    return Array.isArray(n) ? n : [];
  } catch {
    return [];
  }
}
function Te(e) {
  fe(Pe, JSON.stringify(e));
}
function Be(e) {
  const n = ge(), r = {
    id: e.id,
    name: e.name,
    status: e.status,
    updatedAt: e.updatedAt
  }, o = n.findIndex((a) => a.id === e.id);
  if (o === -1)
    e.icon && (r.icon = e.icon), e.tags && e.tags.length > 0 && (r.tags = [...e.tags]), n.push(r);
  else {
    const a = e.icon ?? n[o].icon, t = e.tags ?? n[o].tags, s = { ...r };
    a && (s.icon = a), t && t.length > 0 && (s.tags = [...t]), n[o] = s;
  }
  Te(n);
}
function Je(e) {
  const n = ge().filter((r) => r.id !== e);
  Te(n);
}
function We() {
  return ge();
}
function J(e) {
  try {
    const n = localStorage.getItem(re(e));
    return n ? JSON.parse(n) : null;
  } catch {
    return null;
  }
}
function K(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), fe(re(e.id), JSON.stringify(e)), Be(e);
}
function Ke(e) {
  fe(re(e.id), JSON.stringify(e));
}
function Ve(e) {
  try {
    localStorage.removeItem(re(e));
  } catch {
  }
  Je(e);
}
function Et(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), t = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), c = crypto.randomUUID(), p = crypto.randomUUID(), x = crypto.randomUUID(), y = crypto.randomUUID(), u = crypto.randomUUID(), w = crypto.randomUUID(), f = { type: "trigger", triggerType: "manual" }, P = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Summarize this document",
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0.3,
    maxTokens: 1024,
    streaming: !0
  }, h = {
    type: "condition",
    expression: `context.steps.${o}.llm.tokensOut > 200`,
    label: "Long summary?"
  }, b = {
    type: "fork",
    branchCount: 2,
    branchLabels: ["post-comment", "notify-user"]
  }, g = {
    type: "action",
    actionType: "post-comment",
    config: { body: "{{context.steps." + o + ".response}}" },
    onError: "route-error"
  }, R = {
    type: "action",
    actionType: "notify",
    config: {
      recipient: "{{context.triggeredBy.userId}}",
      message: "Your document summary is ready for review."
    },
    onError: "route-error"
  }, E = {
    type: "join",
    mode: "all",
    mergeStrategy: "deep-merge"
  }, N = {
    type: "approval",
    approvers: [{ type: "user", value: "demo-user" }],
    requiredCount: 1,
    timeoutMs: 1440 * 60 * 1e3,
    timeoutAction: "reject",
    message: "Please review before posting."
  }, l = {
    type: "action",
    actionType: "update-document",
    config: { summary: "{{context.steps." + o + ".response}}" },
    onError: "route-error"
  }, C = [
    { id: r, type: "trigger", position: { x: 40, y: 200 }, data: f },
    { id: o, type: "llm", position: { x: 320, y: 200 }, data: P },
    { id: a, type: "condition", position: { x: 620, y: 200 }, data: h },
    { id: t, type: "fork", position: { x: 900, y: 120 }, data: b },
    { id: s, type: "action", position: { x: 1180, y: 60 }, data: g },
    { id: i, type: "action", position: { x: 1180, y: 180 }, data: R },
    { id: c, type: "join", position: { x: 1480, y: 120 }, data: E },
    { id: p, type: "approval", position: { x: 1780, y: 120 }, data: N },
    { id: x, type: "action", position: { x: 2080, y: 120 }, data: l },
    { id: y, type: "action", position: { x: 900, y: 320 }, data: {
      type: "action",
      actionType: "mcp-tool",
      config: {
        tool: "send-short-summary",
        recipient: "{{context.triggeredBy.userId}}",
        message: "Short summary generated."
      },
      onError: "route-error"
    } },
    { id: u, type: "action", position: { x: 1480, y: 420 }, data: {
      type: "action",
      actionType: "webhook",
      config: {
        url: "https://example.invalid/pipeline-errors",
        method: "POST",
        bodyTemplate: '{ "runId": "{{runId}}", "stage": "error-handler" }'
      },
      idempotent: !0,
      onError: "route-error"
    } },
    { id: w, type: "transform", position: { x: 2380, y: 200 }, data: {
      type: "transform",
      transformType: "template",
      expression: "pipeline-complete",
      outputKey: "pipelineCompletion",
      terminal: !0
    } }
  ], A = (_, z, m, d) => ({
    id: crypto.randomUUID(),
    source: _,
    sourceHandle: z,
    target: m,
    targetHandle: d
  }), L = [
    // Happy path: trigger → llm → condition → fork → (postComment | notify) → join → approval → updateDoc → finalSink
    A(r, "out", o, "in"),
    A(o, "out", a, "in"),
    A(a, "true", t, "in"),
    A(a, "false", y, "in"),
    A(t, "branch-0", s, "in"),
    A(t, "branch-1", i, "in"),
    A(s, "out", c, "in-0"),
    A(i, "out", c, "in-1"),
    A(c, "out", p, "in"),
    A(p, "approved", x, "in"),
    // Terminal `out` paths converge on the final sink. Each leaf wires `out`
    // so DEAD_END only fires for the sink itself.
    A(x, "out", w, "in"),
    A(y, "out", w, "in"),
    // Approval rejection routes through the shared error handler. Wiring
    // `rejected` is hygiene only — there is no UNUSED_APPROVAL_BRANCH lint —
    // but it keeps the rejection path observable.
    A(p, "rejected", u, "in"),
    // Every llm/action `error` handle routes to the shared error handler so
    // NO_ERROR_HANDLER stays silent on each one. Exception: the two actions
    // *inside* the fork (postComment, notifyBranch) intentionally leave their
    // error handles unwired so the executor's fork-failure path can still
    // deliver a failed JoinArrival to the downstream Join (mode='all'). With
    // an explicit error edge, an action failure inside a fork would route
    // away from the Join and the Join would hang waiting for the missing
    // arrival. NO_ERROR_HANDLER's structural exemption (downstream-of-Fork
    // AND upstream-of-Join) covers these two nodes, so the demo stays
    // lint-clean while preserving fork-join 'all' runtime semantics.
    A(o, "error", u, "in"),
    A(x, "error", u, "in"),
    A(y, "error", u, "in"),
    // The error handler itself drains into the final sink on both handles
    // so it is not a dead end and its own `error` handle is wired (silencing
    // NO_ERROR_HANDLER for the error-handler node).
    A(u, "out", w, "in"),
    A(u, "error", w, "in")
  ], q = {
    id: crypto.randomUUID(),
    name: "Document Summary Pipeline (Demo)",
    description: "A showcase pipeline demonstrating LLM summarization, branching, approval, parallel actions, and a shared error handler.",
    icon: "📄",
    version: 0,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "manual" },
    nodes: C,
    edges: L,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
  return K(q), q;
}
function kt(e, n) {
  const r = J(e);
  if (!r) return null;
  const o = /* @__PURE__ */ new Map(), a = r.nodes.map((c) => {
    const p = crypto.randomUUID();
    return o.set(c.id, p), { ...c, id: p, data: { ...c.data } };
  }), t = r.edges.map((c) => ({
    ...c,
    id: crypto.randomUUID(),
    source: o.get(c.source) ?? c.source,
    target: o.get(c.target) ?? c.target
  })), s = (/* @__PURE__ */ new Date()).toISOString(), i = {
    ...r,
    id: crypto.randomUUID(),
    name: n ?? `${r.name} (copy)`,
    // Spread preserves tags from the source; defensive-copy the array so
    // later mutation of the clone can't alias the source's tag list.
    tags: r.tags ? [...r.tags] : void 0,
    version: 0,
    status: "draft",
    publishedVersion: void 0,
    nodes: a,
    edges: t,
    createdAt: s,
    updatedAt: s
  };
  return K(i), i;
}
function Rt(e) {
  const n = J(e);
  return n ? JSON.stringify(n, null, 2) : null;
}
function Q(e = "") {
  return `/api/pipelines/defs${e}`;
}
const ze = { "Content-Type": "application/json" };
async function Xe() {
  const e = await fetch(Q("/"), { credentials: "include" });
  if (!e.ok) throw new Error(`listPipelinesRemote failed (${e.status})`);
  return ((await e.json()).pipelines ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    status: r.status,
    updatedAt: r.updatedAt,
    ...r.icon ? { icon: r.icon } : {},
    ...r.tags && r.tags.length > 0 ? { tags: [...r.tags] } : {}
  }));
}
async function Ye(e) {
  const n = await fetch(Q(`/${encodeURIComponent(e)}`), {
    credentials: "include"
  });
  if (n.status === 404) return null;
  if (!n.ok) throw new Error(`loadPipelineRemote failed (${n.status})`);
  return await n.json();
}
async function $e(e) {
  const n = await fetch(Q(`/${encodeURIComponent(e.id)}`), {
    method: "PUT",
    headers: ze,
    credentials: "include",
    body: JSON.stringify(e)
  });
  if (!n.ok) throw new Error(`savePipelineRemote failed (${n.status})`);
  return await n.json();
}
async function Ge(e) {
  const n = await fetch(Q(`/${encodeURIComponent(e)}`), {
    method: "DELETE",
    credentials: "include"
  });
  if (!n.ok && n.status !== 404)
    throw new Error(`deletePipelineRemote failed (${n.status})`);
}
async function Qe(e) {
  const n = await fetch(Q(`/${encodeURIComponent(e)}/publish`), {
    method: "POST",
    credentials: "include"
  });
  if (n.status === 404) return null;
  if (!n.ok) throw new Error(`publishPipelineRemote failed (${n.status})`);
  return await n.json();
}
function V(e) {
  const n = e.message || String(e);
  return n.includes("NetworkError") || n.includes("Failed to fetch") || n.includes("network") || n.includes("ECONNREFUSED") || n.includes("500") || n.includes("502") || n.includes("503") || n.includes("504");
}
async function At() {
  try {
    return await Xe();
  } catch (e) {
    if (V(e)) return We();
    throw e;
  }
}
async function we(e) {
  try {
    const n = await Ye(e);
    return n && K(n), n ?? J(e);
  } catch (n) {
    if (V(n)) return J(e);
    throw n;
  }
}
async function ie(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), K(e);
  try {
    return await $e(e);
  } catch (n) {
    if (V(n)) return e;
    throw n;
  }
}
async function Ut(e) {
  Ve(e);
  try {
    await Ge(e);
  } catch (n) {
    if (V(n)) return;
    throw n;
  }
}
async function Ze(e) {
  try {
    const n = await Qe(e);
    return n && K(n), n;
  } catch (n) {
    if (V(n)) return null;
    throw n;
  }
}
async function Ct(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = {
    id: crypto.randomUUID(),
    type: "trigger",
    position: { x: 40, y: 120 },
    data: { type: "trigger", triggerType: "manual" }
  }, o = {
    id: e.id ?? crypto.randomUUID(),
    name: e.name,
    description: e.description,
    tags: e.tags ?? [],
    icon: e.icon ?? "🔀",
    version: 1,
    status: "draft",
    publishedVersion: e.publishedVersion,
    triggerBinding: e.triggerBinding,
    nodes: e.nodes ?? [r],
    edges: e.edges ?? [],
    createdAt: e.createdAt ?? n,
    updatedAt: n,
    createdBy: e.createdBy
  };
  K(o);
  try {
    await $e(o);
  } catch (a) {
    if (!V(a)) throw a;
  }
  return o;
}
const et = 500, ve = 50;
function tt(e) {
  switch (e) {
    case "trigger":
      return { type: "trigger", triggerType: "manual" };
    case "llm":
      return {
        type: "llm",
        provider: "bedrock",
        model: "claude-sonnet-4-6",
        systemPrompt: "You are a helpful assistant.",
        userPromptTemplate: "{{context.input}}",
        temperature: 0.7,
        maxTokens: 4096,
        streaming: !0
      };
    case "transform":
      return { type: "transform", transformType: "jsonpath", expression: "" };
    case "condition":
      return { type: "condition", expression: "" };
    case "action":
      return { type: "action", actionType: "notify", config: {} };
    case "fork":
      return { type: "fork", branchCount: 2 };
    case "join":
      return { type: "join", mode: "all", mergeStrategy: "deep-merge" };
    case "approval":
      return {
        type: "approval",
        approvers: [],
        requiredCount: 1
      };
    case "agent":
      return {
        type: "agent",
        agentId: "",
        protocol: "a2a",
        inputTemplate: "{{context.input}}",
        streaming: !0
      };
    case "guardrail":
      return {
        type: "guardrail",
        guardrailId: "",
        inputField: "context.input",
        action: "block"
      };
    case "mcp-tool":
      return {
        type: "mcp-tool",
        gatewayUrl: "",
        toolName: "",
        inputTemplate: "{}"
      };
    case "knowledge-base":
      return {
        type: "knowledge-base",
        knowledgeBaseId: "",
        queryTemplate: "{{context.input}}",
        topK: 5
      };
    case "graph-query":
      return {
        type: "graph-query",
        graphId: "",
        query: "MATCH (n) RETURN n LIMIT 10"
      };
    case "memory":
      return {
        type: "memory",
        mode: "read",
        scope: "session",
        namespace: "default",
        keyExpression: ""
      };
    case "policy":
      return {
        type: "policy",
        policyStoreId: "",
        principal: "{{context.user.id}}",
        action: "",
        resource: ""
      };
    case "ag-ui-output":
      return {
        type: "ag-ui-output",
        sourceField: "context.output",
        eventType: "TEXT_MESSAGE_CONTENT",
        terminal: !0
      };
    case "image-source":
      return { type: "image-source" };
    case "image:save":
      return { type: "image:save" };
    case "scatter":
      return { type: "scatter", itemsPath: "" };
    case "image:resize":
      return { type: "image:resize" };
    case "image:transform":
      return { type: "image:transform", operations: [] };
    case "image:format-convert":
      return { type: "image:format-convert", format: "jpeg" };
    case "image:sharpen":
      return { type: "image:sharpen" };
    case "image:watermark":
      return { type: "image:watermark", overlayImageId: "" };
    case "image:crop":
      return { type: "image:crop" };
    case "image:adjust-bw":
      return { type: "image:adjust-bw" };
    case "image:adjust-layer":
      return { type: "image:adjust-layer", layers: [] };
    case "image:vision-analyze":
      return { type: "image:vision-analyze", userPrompt: "", imageRefPath: "$.trigger.imageRef" };
    case "image:vision-classify":
      return { type: "image:vision-classify", labels: [], imageRefPath: "$.trigger.imageRef" };
    case "image:vision-describe":
      return { type: "image:vision-describe", imageRefPath: "$.trigger.imageRef", userPrompt: "Describe this image." };
    case "image:vision-tag":
      return { type: "image:vision-tag", imageRefPath: "$.trigger.imageRef" };
    case "image:vision-extract-text":
      return { type: "image:vision-extract-text", imageRefPath: "$.trigger.imageRef" };
    case "image:generate":
      return { type: "image:generate", prompt: "" };
    case "image:variation":
      return { type: "image:variation" };
    case "image:edit-prompt":
      return { type: "image:edit-prompt", prompt: "" };
  }
}
function ee() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
const ye = de(null);
function Nt({
  pipelineId: e,
  children: n
}) {
  const [r, o] = O(null), [a, t] = O(!1), [s, i] = O(null), [c, p] = O([]), [x, y] = O([]), u = B(null);
  F(() => {
    let m = !1;
    return o(null), t(!1), i(null), p([]), y([]), we(e).then((d) => {
      m || (d && (d.nodes = d.nodes ?? [], d.edges = d.edges ?? []), o(d));
    }), () => {
      m = !0;
    };
  }, [e]), F(() => {
    if (!(!a || !r))
      return u.current && clearTimeout(u.current), u.current = setTimeout(() => {
        ie(r).then(() => t(!1));
      }, et), () => {
        u.current && (clearTimeout(u.current), u.current = null);
      };
  }, [r, a]);
  const w = v((m) => {
    p((d) => {
      const I = [
        ...d,
        { nodes: m.nodes, edges: m.edges }
      ];
      return I.length > ve && I.shift(), I;
    }), y([]);
  }, []), f = v(
    (m) => {
      let d = null;
      return o((I) => {
        if (!I) return I;
        w(I);
        const k = m(I);
        return d = k, k;
      }), t(!0), d;
    },
    [w]
  ), P = v(
    (m, d) => {
      const I = ee();
      return f((k) => ({
        ...k,
        nodes: [
          ...k.nodes,
          { id: I, type: m, position: d, data: tt(m) }
        ]
      })), I;
    },
    [f]
  ), h = v(
    (m, d) => {
      f((I) => ({
        ...I,
        nodes: I.nodes.map((k) => k.id === m ? { ...k, ...d } : k)
      }));
    },
    [f]
  ), b = v(
    (m, d) => {
      f((I) => ({
        ...I,
        nodes: I.nodes.map((k) => {
          if (k.id !== m) return k;
          const j = { ...k.data, ...d };
          return { ...k, data: j };
        })
      }));
    },
    [f]
  ), g = v(
    (m) => {
      f((d) => ({
        ...d,
        nodes: d.nodes.filter((I) => I.id !== m),
        edges: d.edges.filter((I) => I.source !== m && I.target !== m)
      })), i((d) => d === m ? null : d);
    },
    [f]
  ), R = v(
    (m) => {
      const d = [];
      return f((I) => {
        const k = new Set(m), j = /* @__PURE__ */ new Map(), Z = I.nodes.filter((D) => k.has(D.id)).map((D) => {
          const se = ee();
          return j.set(D.id, se), d.push(se), {
            ...D,
            id: se,
            position: { x: D.position.x + 40, y: D.position.y + 40 },
            data: { ...D.data }
          };
        }), Ue = I.edges.filter((D) => k.has(D.source) && k.has(D.target)).map((D) => ({
          ...D,
          id: ee(),
          source: j.get(D.source) ?? D.source,
          target: j.get(D.target) ?? D.target
        }));
        return {
          ...I,
          nodes: [...I.nodes, ...Z],
          edges: [...I.edges, ...Ue]
        };
      }), d;
    },
    [f]
  ), E = v(
    (m) => {
      const d = ee();
      return f((I) => ({
        ...I,
        edges: [...I.edges, { id: d, ...m }]
      })), d;
    },
    [f]
  ), N = v(
    (m) => {
      f((d) => ({
        ...d,
        edges: d.edges.filter((I) => I.id !== m)
      }));
    },
    [f]
  ), l = v(
    (m) => {
      m.length !== 0 && o((d) => {
        if (!d) return d;
        const I = new Map(m.map((j) => [j.id, j.position])), k = {
          ...d,
          nodes: d.nodes.map((j) => {
            const Z = I.get(j.id);
            return Z ? { ...j, position: Z } : j;
          })
        };
        return Ke(k), k;
      });
    },
    []
  ), S = v(() => {
    r && (u.current && (clearTimeout(u.current), u.current = null), ie(r).then(() => t(!1)));
  }, [r]), T = v(() => {
    if (!r) return;
    u.current && (clearTimeout(u.current), u.current = null), (async () => {
      a && (await ie(r), t(!1));
      const d = await Ze(r.id);
      d && o(d);
    })();
  }, [r, a]), $ = v(() => {
    we(e).then((m) => {
      o(m), t(!1), p([]), y([]);
    });
  }, [e]), C = v((m) => {
    const d = m.trim();
    d && (o((I) => !I || I.name === d ? I : { ...I, name: d }), t(!0));
  }, []), A = v((m) => {
    o((d) => !d || d.icon === m ? d : { ...d, icon: m }), t(!0);
  }, []), L = v((m) => {
    o((d) => {
      if (!d) return d;
      const I = d.tags ?? [];
      return I.length === m.length && I.every((k, j) => k === m[j]) ? d : { ...d, tags: [...m] };
    }), t(!0);
  }, []), q = v(() => {
    p((m) => {
      if (m.length === 0 || !r) return m;
      const d = m[m.length - 1];
      return y((I) => [
        ...I,
        { nodes: r.nodes, edges: r.edges }
      ]), o({ ...r, nodes: d.nodes, edges: d.edges }), t(!0), m.slice(0, -1);
    });
  }, [r]), _ = v(() => {
    y((m) => {
      if (m.length === 0 || !r) return m;
      const d = m[m.length - 1];
      return p((I) => {
        const k = [
          ...I,
          { nodes: r.nodes, edges: r.edges }
        ];
        return k.length > ve && k.shift(), k;
      }), o({ ...r, nodes: d.nodes, edges: d.edges }), t(!0), m.slice(0, -1);
    });
  }, [r]), z = X(
    () => ({
      definition: r,
      dirty: a,
      selectedNodeId: s,
      setSelectedNodeId: i,
      addNode: P,
      updateNode: h,
      updateNodeData: b,
      removeNode: g,
      duplicateNodes: R,
      addEdge: E,
      removeEdge: N,
      setPositions: l,
      save: S,
      publish: T,
      revert: $,
      undo: q,
      redo: _,
      canUndo: c.length > 0,
      canRedo: x.length > 0,
      rename: C,
      setIcon: A,
      setTags: L
    }),
    [
      r,
      a,
      s,
      P,
      h,
      b,
      g,
      R,
      E,
      N,
      l,
      S,
      T,
      $,
      q,
      _,
      c.length,
      x.length,
      C,
      A,
      L
    ]
  );
  return /* @__PURE__ */ U(ye.Provider, { value: z, children: n });
}
function Dt() {
  const e = W(ye);
  if (!e)
    throw new Error(
      "usePipelineEditor must be used within a PipelineEditorProvider"
    );
  return e;
}
function nt() {
  const { idToken: e } = Oe(), [n, r] = O(!1), [o, a] = O(null), [t, s] = O(!1), i = "";
  return { triggerRun: v(
    async (p, x, y) => {
      r(!0), a(null), s(!1);
      try {
        const u = J(p), w = {};
        x && (w.triggerPayload = x), u && (w.definition = u);
        const f = {
          "Content-Type": "application/json",
          ...e ? { Authorization: `Bearer ${e}` } : {}
        };
        y?.idempotencyKey && (f["Idempotency-Key"] = y.idempotencyKey);
        const P = await fetch(
          `${i}/api/pipelines/${encodeURIComponent(p)}/runs`,
          {
            method: "POST",
            headers: f,
            body: JSON.stringify(w)
          }
        );
        if (!P.ok) {
          const g = await P.text().catch(() => "");
          return a(
            `Trigger failed (${P.status})${g ? `: ${g}` : ""}`
          ), null;
        }
        const h = typeof P.headers?.get == "function" ? P.headers.get("X-Idempotent-Replay") : P.headers["x-idempotent-replay"] ?? null;
        return s(h === "true"), (await P.json()).runId;
      } catch (u) {
        return a(u.message), null;
      } finally {
        r(!1);
      }
    },
    [i, e]
  ), isTriggering: n, lastError: o, isReplay: t };
}
const rt = Object.freeze({
  // DC-sourced kebab form (after bridge's `:` → `.` mapping) → colon-form in-app key.
  "pipeline.run.resume-from-step": "pipeline:run:resumeFromStep",
  // hub#2223: producer-backed canonical past-tense form. Kebab-from-the-wire
  // already maps directly into the PipelineEventMap key, but keep an explicit
  // identity entry here for documentation purposes (the function below
  // collapses to the input when the alias is the same string).
  "pipeline.run.resumed-from-step": "pipeline.run.resumed-from-step"
});
function ot(e) {
  return rt[e] ?? e;
}
function Ot({
  channel: e = "pipeline:all",
  onEvent: n,
  enabled: r = !1
}) {
  const { connectionState: o, sendMessage: a, onMessage: t } = le(), s = B(n);
  F(() => {
    s.current = n;
  }, [n]), F(() => {
    if (!r || o !== "connected") return;
    a({ service: "pipeline", action: "subscribe", channel: e });
    const i = t((c) => {
      if (c.type !== "pipeline:event") return;
      const p = c, x = p.eventType;
      if (!x) return;
      const u = {
        eventType: ot(x),
        payload: p.payload,
        seq: typeof p.seq == "number" ? p.seq : 0,
        sourceNodeId: typeof p.sourceNodeId == "string" ? p.sourceNodeId : "unknown",
        emittedAt: typeof p.emittedAt == "number" ? p.emittedAt : Date.now()
      };
      try {
        s.current(u);
      } catch (w) {
        console.error("[WebSocketEventAdapter] onEvent threw", w);
      }
    });
    return () => {
      i(), a({ service: "pipeline", action: "unsubscribe", channel: e });
    };
  }, [r, o, e, a, t]);
}
function te() {
  const e = typeof globalThis < "u" ? globalThis.crypto : void 0;
  return e && typeof e.randomUUID == "function" ? e.randomUUID() : `ws-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function st() {
  const { sendMessage: e } = le(), n = v(
    (y) => e({ service: "pipeline", action: "subscribe", channel: `pipeline:run:${y}` }),
    [e]
  ), r = v(
    (y) => e({ service: "pipeline", action: "unsubscribe", channel: `pipeline:run:${y}` }),
    [e]
  ), o = v(
    () => e({ service: "pipeline", action: "subscribe", channel: "pipeline:all" }),
    [e]
  ), a = v(
    () => e({ service: "pipeline", action: "unsubscribe", channel: "pipeline:all" }),
    [e]
  ), t = v(
    () => e({ service: "pipeline", action: "subscribe", channel: "pipeline:approvals" }),
    [e]
  ), s = v(
    () => e({ service: "pipeline", action: "unsubscribe", channel: "pipeline:approvals" }),
    [e]
  ), i = v(
    (y, u = {}) => {
      const w = u.correlationId ?? te();
      return e({
        service: "pipeline",
        action: "trigger",
        pipelineId: y,
        ...u.definition ? { definition: u.definition } : {},
        ...u.triggerPayload ? { triggerPayload: u.triggerPayload } : {},
        ...u.triggeredBy ? { triggeredBy: u.triggeredBy } : {},
        correlationId: w
      }), w;
    },
    [e]
  ), c = v(
    (y, u) => {
      const w = u ?? te();
      return e({ service: "pipeline", action: "cancel", runId: y, correlationId: w }), w;
    },
    [e]
  ), p = v(
    (y, u, w, f = {}) => {
      const P = f.correlationId ?? te();
      return e({
        service: "pipeline",
        action: "resolveApproval",
        runId: y,
        stepId: u,
        decision: w,
        ...f.comment ? { comment: f.comment } : {},
        ...f.decidedBy ? { decidedBy: f.decidedBy } : {},
        correlationId: P
      }), P;
    },
    [e]
  ), x = v(
    (y, u, w) => {
      const f = w ?? te();
      return e({
        service: "pipeline",
        action: "resumeFromStep",
        runId: y,
        fromNodeId: u,
        correlationId: f
      }), f;
    },
    [e]
  );
  return {
    subscribeToRun: n,
    unsubscribeFromRun: r,
    subscribeToAll: o,
    unsubscribeFromAll: a,
    subscribeToApprovals: t,
    unsubscribeFromApprovals: s,
    triggerRun: i,
    cancelRun: c,
    resolveApproval: p,
    requestResumeFromStep: x
  };
}
function jt(e, n = {}) {
  const { enabled: r = !0 } = n, { connectionState: o, sendMessage: a } = le();
  F(() => {
    if (!r || !e || o !== "connected") return;
    const t = `pipeline:run:${e}`;
    return a({ service: "pipeline", action: "subscribe", channel: t }), () => {
      a({ service: "pipeline", action: "unsubscribe", channel: t });
    };
  }, [r, e, o, a]);
}
const ue = 20, oe = de(null);
function it(e, n) {
  return e.steps[n] ?? {
    nodeId: n,
    status: "pending"
  };
}
function M(e, n, r) {
  const o = it(e, n), a = typeof r == "function" ? r(o) : { ...o, ...r };
  return { ...e, steps: { ...e.steps, [n]: a } };
}
function at(e) {
  const n = Object.values(e);
  if (n.length <= ue) return e;
  const r = n.filter(
    (i) => i.status === "running" || i.status === "pending" || i.status === "awaiting_approval" || i.status === "paused_at_breakpoint"
  ), a = n.filter(
    (i) => i.status !== "running" && i.status !== "pending" && i.status !== "awaiting_approval" && i.status !== "paused_at_breakpoint"
  ).sort((i, c) => c.startedAt.localeCompare(i.startedAt)).slice(
    0,
    Math.max(0, ue - r.length)
  ), t = [...r, ...a], s = {};
  for (const i of t) s[i.id] = i;
  return s;
}
function Mt({ children: e }) {
  const n = W(ye), { triggerRun: r } = nt(), o = st(), [a, t] = O({}), [s, i] = O(!1), c = B(/* @__PURE__ */ new Set()), p = B(null);
  F(() => {
    const l = n?.definition?.id;
    !l || p.current === l || (p.current = l, i(!0), Se(l, { limit: ue }).then((S) => {
      t((T) => {
        const $ = { ...T };
        for (const C of S.runs)
          $[C.id] || ($[C.id] = C);
        return $;
      });
    }).catch((S) => {
      console.error("[PipelineRuns] Failed to load history from API", S), t((T) => {
        const $ = { ...T };
        for (const C of me(l))
          $[C.id] || ($[C.id] = C);
        return $;
      });
    }).finally(() => i(!1)));
  }, [n?.definition?.id]), Ne("*", (l) => {
    const { eventType: S, payload: T } = l;
    t(($) => ct($, S, T));
  }), F(() => {
    for (const l of Object.values(a))
      if ((l.status === "completed" || l.status === "failed" || l.status === "cancelled") && !c.current.has(l.id)) {
        c.current.add(l.id);
        try {
          qe(l.pipelineId, l);
        } catch (T) {
          console.warn("[PipelineRuns] appendRun failed", T);
        }
      }
  }, [a]);
  const x = v(
    async (l, S) => {
      const T = await r(l, S);
      if (!T)
        throw new Error("Trigger failed (REST POST did not return a runId)");
      return T;
    },
    [r]
  ), y = v(
    (l) => {
      o.cancelRun(l);
    },
    [o]
  ), u = v(
    (l, S, T, $) => {
      o.resolveApproval(l, S, T, { comment: $ });
    },
    [o]
  ), w = B(a);
  F(() => {
    w.current = a;
  }, [a]);
  const f = v(
    async (l) => {
      const T = Object.values(w.current).filter(($) => $.status === "failed").filter(($) => $.steps[l]?.status === "failed").sort(($, C) => C.startedAt.localeCompare($.startedAt))[0];
      if (!T) {
        console.warn(
          "[PipelineRuns] retryFromStep — no failed run found for node",
          l
        );
        return;
      }
      try {
        await je(T.pipelineId, T.id, l);
      } catch ($) {
        console.error("[PipelineRuns] retryFromNode API failed", $);
      }
    },
    []
  ), P = v(
    async (l, S, T) => {
      const $ = { ...T ?? {}, __breakpoints: S };
      return x(l, $);
    },
    [x]
  ), h = v(
    (l, S, T = "continue") => {
      const A = w.current[l]?.pipelineId ?? "unknown";
      fetch(
        `/api/pipelines/${encodeURIComponent(A)}/runs/${encodeURIComponent(l)}/breakpoint/${encodeURIComponent(S)}/resolve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: T })
        }
      ).catch((L) => {
        console.error("[PipelineRuns] resolveBreakpoint API failed", L);
      });
    },
    []
  ), b = v(
    async (l, S, T, $) => {
      const L = w.current[l]?.pipelineId ?? "unknown", q = `/api/pipelines/${encodeURIComponent(L)}/runs/${encodeURIComponent(l)}/breakpoint/${encodeURIComponent(S)}/patch`, _ = await fetch(q, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patch: T, ...$ ? { appliedBy: $ } : {} })
      });
      if (_.status === 200)
        return await _.json();
      if (_.status === 422) {
        const m = await _.json().catch(() => ({}));
        return m.result ? m.result : {
          patchId: "",
          before: {},
          after: {},
          validation: { ok: !1, reason: m.error ?? "patch rejected" }
        };
      }
      const z = await _.text().catch(() => "");
      throw new Error(`applyContextPatch HTTP ${_.status}: ${z}`);
    },
    []
  ), g = v(
    async (l, S, T) => {
      const A = w.current[l]?.pipelineId ?? "unknown", L = `/api/pipelines/${encodeURIComponent(A)}/runs/${encodeURIComponent(l)}/breakpoint/${encodeURIComponent(S)}/patch/${encodeURIComponent(T)}`, q = await fetch(L, { method: "DELETE" });
      if (q.status !== 204) {
        const _ = await q.text().catch(() => "");
        throw new Error(`revertContextPatch HTTP ${q.status}: ${_}`);
      }
    },
    []
  ), R = v((l) => {
    t((S) => {
      const T = S[l.id];
      if (T && T.status === l.status) {
        const $ = Object.keys(T.steps).length, C = Object.keys(l.steps).length;
        if ($ >= C) return S;
      }
      return { ...S, [l.id]: l };
    });
  }, []), E = X(
    () => Object.values(a).filter(
      (l) => l.status === "running" || l.status === "pending" || l.status === "awaiting_approval" || l.status === "paused_at_breakpoint"
    ).map((l) => l.id),
    [a]
  ), N = X(
    () => ({
      runs: a,
      activeRunIds: E,
      triggerRun: x,
      triggerDebugRun: P,
      cancelRun: y,
      resolveApproval: u,
      resolveBreakpoint: h,
      applyContextPatch: b,
      revertContextPatch: g,
      retryFromStep: f,
      ingestRun: R
    }),
    [
      a,
      E,
      x,
      P,
      y,
      u,
      h,
      b,
      g,
      f,
      R
    ]
  );
  return /* @__PURE__ */ U(oe.Provider, { value: N, children: e });
}
function ct(e, n, r) {
  if (!r || typeof r != "object" || typeof r.runId != "string") return e;
  switch (n) {
    case "pipeline.run.started": {
      const t = r, s = {
        id: t.runId,
        pipelineId: t.pipelineId,
        pipelineVersion: 0,
        status: "running",
        triggeredBy: t.triggeredBy,
        ownerNodeId: "local",
        startedAt: t.at,
        currentStepIds: [],
        steps: {},
        context: {}
      };
      return at({ ...e, [t.runId]: s });
    }
    case "pipeline.run.completed": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: {
          ...s,
          status: "completed",
          completedAt: t.at,
          durationMs: t.durationMs,
          currentStepIds: []
        }
      } : e;
    }
    case "pipeline.run.failed": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: {
          ...s,
          status: "failed",
          completedAt: t.at,
          error: t.error,
          currentStepIds: []
        }
      } : e;
    }
    case "pipeline.run.cancelled": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: {
          ...s,
          status: "cancelled",
          completedAt: t.at,
          currentStepIds: []
        }
      } : e;
    }
    case "pipeline.step.started": {
      const t = r, s = e[t.runId];
      if (!s) return e;
      const i = M(s, t.stepId, (c) => ({
        ...c,
        nodeId: t.stepId,
        status: "running",
        startedAt: t.at
      }));
      return {
        ...e,
        [t.runId]: {
          ...i,
          currentStepIds: Array.from(
            /* @__PURE__ */ new Set([...i.currentStepIds, t.stepId])
          )
        }
      };
    }
    case "pipeline.step.completed": {
      const t = r, s = e[t.runId];
      if (!s) return e;
      const i = M(s, t.stepId, (c) => ({
        ...c,
        status: "completed",
        completedAt: t.at,
        durationMs: t.durationMs,
        output: t.output
      }));
      return {
        ...e,
        [t.runId]: {
          ...i,
          currentStepIds: i.currentStepIds.filter((c) => c !== t.stepId)
        }
      };
    }
    case "pipeline.step.failed": {
      const t = r, s = e[t.runId];
      if (!s) return e;
      const i = M(s, t.stepId, (c) => ({
        ...c,
        status: "failed",
        completedAt: t.at,
        error: t.error
      }));
      return {
        ...e,
        [t.runId]: {
          ...i,
          currentStepIds: i.currentStepIds.filter((c) => c !== t.stepId)
        }
      };
    }
    case "pipeline.step.skipped": {
      const t = r, s = e[t.runId];
      if (!s) return e;
      const i = M(s, t.stepId, (c) => ({
        ...c,
        status: "skipped",
        completedAt: t.at,
        error: c.error
      }));
      return {
        ...e,
        [t.runId]: {
          ...i,
          currentStepIds: i.currentStepIds.filter((c) => c !== t.stepId)
        }
      };
    }
    case "pipeline.step.cancelled": {
      const t = r, s = e[t.runId];
      if (!s) return e;
      const i = M(s, t.stepId, (c) => ({
        ...c,
        // `StepStatus` has no 'cancelled' — track as failed with marker.
        status: "failed",
        completedAt: t.at,
        error: c.error ?? "cancelled"
      }));
      return {
        ...e,
        [t.runId]: {
          ...i,
          currentStepIds: i.currentStepIds.filter((c) => c !== t.stepId)
        }
      };
    }
    case "pipeline.llm.prompt": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: M(s, t.stepId, (i) => ({
          ...i,
          llm: {
            prompt: t.prompt,
            response: i.llm?.response ?? "",
            tokensIn: i.llm?.tokensIn ?? 0,
            tokensOut: i.llm?.tokensOut ?? 0,
            ...i.llm?.streamOpened !== void 0 ? { streamOpened: i.llm.streamOpened } : {},
            ...i.llm?.firstTokenLatencyMs !== void 0 ? { firstTokenLatencyMs: i.llm.firstTokenLatencyMs } : {}
          }
        }))
      } : e;
    }
    case "pipeline.llm.stream.opened": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: M(s, t.stepId, (i) => {
          const c = Date.parse(t.openedAt), p = {
            ...i,
            llm: {
              prompt: i.llm?.prompt ?? "",
              response: i.llm?.response ?? "",
              tokensIn: i.llm?.tokensIn ?? 0,
              tokensOut: i.llm?.tokensOut ?? 0,
              streamOpened: !0,
              ...i.llm?.firstTokenLatencyMs !== void 0 ? { firstTokenLatencyMs: i.llm.firstTokenLatencyMs } : {}
            }
          };
          return p.llm._streamOpenedAtMs = Number.isFinite(c) ? c : Date.now(), p;
        })
      } : e;
    }
    case "pipeline.llm.token": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: M(s, t.stepId, (i) => {
          const c = i.llm?.tokensOut ?? 0, p = c === 0, x = i.llm?._streamOpenedAtMs, y = Date.parse(t.at), u = p && typeof x == "number" && Number.isFinite(y) ? Math.max(0, y - x) : i.llm?.firstTokenLatencyMs;
          return {
            ...i,
            llm: {
              prompt: i.llm?.prompt ?? "",
              response: (i.llm?.response ?? "") + t.token,
              tokensIn: i.llm?.tokensIn ?? 0,
              tokensOut: c + 1,
              streamOpened: !1,
              ...u !== void 0 ? { firstTokenLatencyMs: u } : {}
            }
          };
        })
      } : e;
    }
    case "pipeline.llm.response": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: M(s, t.stepId, (i) => ({
          ...i,
          llm: {
            prompt: i.llm?.prompt ?? "",
            response: t.response,
            tokensIn: t.tokensIn,
            tokensOut: t.tokensOut
          }
        }))
      } : e;
    }
    case "pipeline.step.breakpoint": {
      const t = r, s = e[t.runId];
      if (!s) return e;
      const i = M(s, t.stepId, (c) => ({
        ...c,
        status: "awaiting"
      }));
      return {
        ...e,
        [t.runId]: { ...i, status: "paused_at_breakpoint" }
      };
    }
    // hub#2226: edit-and-continue. The patched / patched-unvalidated events
    // append a new entry to `step.patches`; the patch-reverted event marks
    // the matching entry's `revertedAt`. We deliberately don't mirror
    // executor context state into `run.context` here — the run will receive
    // a fresh `pipeline.run.checkpoint` when execution resumes past the
    // pausedAtNodeId, and ContextInspector subscribes to checkpoints
    // directly.
    case "pipeline.step.context.patched":
    case "pipeline.step.context.patched-unvalidated": {
      const t = r, s = e[t.runId];
      if (!s) return e;
      const i = n === "pipeline.step.context.patched-unvalidated", c = {
        patchId: t.patchId,
        appliedAt: t.at,
        mode: t.mode,
        ...i ? { unvalidated: !0 } : {}
      };
      return {
        ...e,
        [t.runId]: M(s, t.stepId, (p) => ({
          ...p,
          patches: [...p.patches ?? [], c]
        }))
      };
    }
    case "pipeline.step.context.patch-reverted": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: M(s, t.stepId, (i) => ({
          ...i,
          patches: (i.patches ?? []).map(
            (c) => c.patchId === t.patchId ? { ...c, revertedAt: t.at } : c
          )
        }))
      } : e;
    }
    case "pipeline.approval.requested": {
      const t = r, s = e[t.runId];
      if (!s) return e;
      const i = M(s, t.stepId, (c) => ({
        ...c,
        status: "awaiting",
        approvals: c.approvals ?? []
      }));
      return {
        ...e,
        [t.runId]: { ...i, status: "awaiting_approval" }
      };
    }
    case "pipeline.run.resumed-from-step": {
      const t = r, s = e[t.runId];
      if (!s) return e;
      const i = {
        fromNodeId: t.fromNodeId,
        ...t.originalFailedStepId ? { originalFailedStepId: t.originalFailedStepId } : {},
        at: t.at
      };
      return {
        ...e,
        [t.runId]: {
          ...s,
          status: "running",
          replayAttempts: (s.replayAttempts ?? 0) + 1,
          resumeHistory: [...s.resumeHistory ?? [], i]
        }
      };
    }
    case "pipeline.approval.recorded": {
      const t = r, s = e[t.runId];
      if (!s) return e;
      const i = {
        userId: t.userId,
        decision: t.decision,
        at: t.at
      };
      return {
        ...e,
        [t.runId]: M(s, t.stepId, (c) => ({
          ...c,
          approvals: [...c.approvals ?? [], i]
        }))
      };
    }
    default:
      return e;
  }
}
function ut() {
  const e = W(oe);
  if (!e)
    throw new Error(
      "usePipelineRuns must be used within a PipelineRunsProvider"
    );
  return e;
}
function _t() {
  return W(oe)?.retryFromStep ?? (async () => {
  });
}
function Ft(e) {
  const n = W(oe);
  return X(() => {
    if (!n) return null;
    let r = null, o = "";
    for (const a of Object.values(n.runs)) {
      const t = a.steps[e];
      t && a.startedAt > o && (r = t, o = a.startedAt);
    }
    return r;
  }, [n, e]);
}
function ne(e, n) {
  return `${e}::${n}`;
}
function ae(e, n) {
  const r = J(e);
  if (!r) return { requiredCount: 1 };
  const o = r.nodes.find((t) => t.id === n);
  if (!o || o.data.type !== "approval") return { requiredCount: 1 };
  const a = o.data;
  return {
    message: a.message,
    requiredCount: Math.max(1, a.requiredCount ?? 1)
  };
}
function dt() {
  const e = De(), n = ut(), [r, o] = O(
    () => {
      const f = {};
      for (const P in n.runs) {
        const h = n.runs[P];
        if (h.status === "awaiting_approval")
          for (const b in h.steps) {
            const g = h.steps[b];
            if (g.status !== "awaiting") continue;
            const R = ae(h.pipelineId, b), N = J(h.pipelineId)?.nodes.find((S) => S.id === b), l = N && N.data.type === "approval" ? N.data.approvers : [];
            f[ne(P, b)] = {
              runId: P,
              pipelineId: h.pipelineId,
              stepId: b,
              approvers: l,
              requestedAt: g.startedAt ?? (/* @__PURE__ */ new Date(0)).toISOString(),
              message: R.message,
              requiredCount: R.requiredCount,
              recordedCount: g.approvals?.filter((S) => S.decision === "approve").length ?? 0
            };
          }
      }
      return f;
    }
  ), [a, t] = O(!0), [s, i] = O(null), [c, p] = O(0), x = B(n.runs);
  F(() => {
    x.current = n.runs;
  }, [n.runs]);
  const y = B(/* @__PURE__ */ new Map());
  F(() => {
    let f = !1;
    t(!0), i(null);
    const P = async () => {
      try {
        const h = await fetch("/api/pipelines/approvals", {
          credentials: "same-origin"
        });
        if (h.status === 404) return null;
        if (!h.ok)
          throw new Error(`Dashboard fetch failed: ${h.status}`);
        return { pendingApprovals: (await h.json()).approvals ?? [] };
      } catch (h) {
        if (h.message?.includes("Dashboard fetch failed"))
          throw h;
        return null;
      }
    };
    return (async () => {
      try {
        const h = await P();
        if (f) return;
        if (h?.pendingApprovals) {
          const b = {};
          for (const g of h.pendingApprovals) {
            const R = ae(g.pipelineId, g.stepId);
            b[ne(g.runId, g.stepId)] = {
              runId: g.runId,
              pipelineId: g.pipelineId,
              stepId: g.stepId,
              approvers: g.approvers ?? [],
              requestedAt: g.requestedAt,
              message: g.message ?? R.message,
              requiredCount: g.requiredCount ?? R.requiredCount,
              recordedCount: g.recordedCount ?? 0
            };
          }
          o(b);
        }
        t(!1);
      } catch (h) {
        if (f) return;
        console.error(
          "[usePendingApprovals] /api/observability/dashboard?include=pendingApprovals failed:",
          h
        ), i(h.message ?? "Failed to load pending approvals"), t(!1);
      }
    })(), () => {
      f = !0;
    };
  }, [c]), F(() => {
    const f = [];
    f.push(
      e.subscribe("pipeline.run.started", (h) => {
        const b = h;
        y.current.set(b.runId, b.pipelineId);
      })
    ), f.push(
      e.subscribe("pipeline.approval.requested", (h) => {
        const b = h, g = y.current.get(b.runId) ?? x.current[b.runId]?.pipelineId ?? "", R = ae(g, b.stepId);
        o((E) => {
          const N = ne(b.runId, b.stepId);
          return E[N] ? E : {
            ...E,
            [N]: {
              runId: b.runId,
              pipelineId: g,
              stepId: b.stepId,
              approvers: b.approvers,
              requestedAt: b.at,
              message: R.message,
              requiredCount: R.requiredCount,
              recordedCount: 0
            }
          };
        });
      })
    ), f.push(
      e.subscribe("pipeline.approval.recorded", (h) => {
        const b = h, g = ne(b.runId, b.stepId);
        o((R) => {
          const E = R[g];
          if (!E) return R;
          if (b.decision === "reject") {
            const S = { ...R };
            return delete S[g], S;
          }
          const N = (E.recordedCount ?? 0) + 1, l = E.requiredCount ?? 1;
          if (N >= l) {
            const S = { ...R };
            return delete S[g], S;
          }
          return {
            ...R,
            [g]: { ...E, recordedCount: N }
          };
        });
      })
    );
    const P = e.subscribeToApprovals();
    return f.push(P), () => {
      for (const h of f) h();
    };
  }, [e]);
  const u = X(() => Object.values(r).sort(
    (f, P) => P.requestedAt.localeCompare(f.requestedAt)
  ), [r]), w = v(() => {
    p((f) => f + 1);
  }, []);
  return { approvals: u, isLoading: a, error: s, retry: w };
}
function qt() {
  const { approvals: e } = dt();
  return e;
}
class lt extends Error {
  reason;
  result;
  constructor(n, r) {
    super(n), this.name = "PatchValidationRejectedError", this.reason = n, this.result = r;
  }
}
class Ee extends Error {
  status;
  body;
  constructor(n, r, o) {
    super(r), this.name = "PatchHttpError", this.status = n, this.body = o;
  }
}
function ke(e, n, r, o) {
  const t = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(n)}/breakpoint/${encodeURIComponent(r)}/patch`;
  return o ? `${t}/${encodeURIComponent(o)}` : `${t}`;
}
async function Lt(e, n, r, o, a) {
  const t = await fetch(ke(e, n, r), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ patch: o, ...a ? { appliedBy: a } : {} })
  });
  if (t.status === 200)
    return await t.json();
  if (t.status === 422) {
    const c = await t.json().catch(() => ({}));
    let p = "patch rejected by validator";
    throw c.result && c.result.validation && c.result.validation.ok === !1 && typeof c.result.validation.reason == "string" ? p = c.result.validation.reason : typeof c.error == "string" && (p = c.error), new lt(p, c.result);
  }
  const s = await t.text().catch(() => "");
  let i;
  try {
    i = JSON.parse(s);
  } catch {
    i = s;
  }
  throw new Ee(
    t.status,
    `applyPatch HTTP ${t.status}: ${s}`,
    i
  );
}
async function Ht(e, n, r, o) {
  const a = await fetch(ke(e, n, r, o), {
    method: "DELETE",
    credentials: "include"
  });
  if (a.status === 204) return;
  const t = await a.text().catch(() => "");
  let s;
  try {
    s = JSON.parse(t);
  } catch {
    s = t;
  }
  throw new Ee(
    a.status,
    `revertPatch HTTP ${a.status}: ${t}`,
    s
  );
}
async function Bt(e, n, r, o) {
  const a = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(n)}/resume?fromNodeId=${encodeURIComponent(r)}`, t = await fetch(a, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(o ?? {})
  });
  if (!t.ok) {
    const s = await t.text();
    throw new Error(`Failed to resume run ${n} from node ${r}: ${t.status} ${s}`);
  }
  return t.json();
}
function Re(e) {
  const n = [];
  for (const [r, o] of Object.entries(e))
    if (o != null)
      if (Array.isArray(o)) {
        if (o.length === 0) continue;
        n.push(`${encodeURIComponent(r)}=${encodeURIComponent(o.join(","))}`);
      } else
        n.push(`${encodeURIComponent(r)}=${encodeURIComponent(String(o))}`);
  return n.length > 0 ? `?${n.join("&")}` : "";
}
async function Jt(e, n, r = {}) {
  const o = Re({
    since: r.since,
    until: r.until,
    actions: r.actions,
    limit: r.limit,
    cursor: r.cursor
  }), a = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(n)}/audit${o}`, t = await fetch(a, {
    method: "GET",
    credentials: "include"
  });
  if (!t.ok) {
    const s = await t.text();
    throw new Error(`Failed to load audit log for ${e}/${n}: ${t.status} ${s}`);
  }
  return t.json();
}
async function Wt(e) {
  if (!e.actor && !e.pipelineId)
    throw new Error("searchAudit requires at least one of `actor` or `pipelineId`");
  const r = `/api/pipelines/audit/search${Re({
    actor: e.actor,
    pipelineId: e.pipelineId,
    actions: e.actions,
    since: e.since,
    until: e.until,
    limit: e.limit,
    cursor: e.cursor
  })}`, o = await fetch(r, {
    method: "GET",
    credentials: "include"
  });
  if (!o.ok) {
    const a = await o.text();
    throw new Error(`Audit search failed: ${o.status} ${a}`);
  }
  return o.json();
}
const ce = {
  sm: "h-7 px-2 text-[12px]",
  md: "h-9 px-2.5 text-[13px]"
}, xe = {
  sm: "px-1.5",
  md: "px-2"
}, Ae = Y(function({
  type: n = "text",
  size: r = "md",
  prefix: o,
  suffix: a,
  invalid: t = !1,
  disabled: s = !1,
  mono: i = !1,
  className: c,
  "data-testid": p,
  ...x
}, y) {
  const u = o != null, w = a != null;
  return !u && !w ? /* @__PURE__ */ U(
    "input",
    {
      ref: y,
      type: n,
      disabled: s,
      "data-testid": p,
      className: H(
        "w-full rounded-md border bg-slate-50 font-inherit text-slate-900",
        "outline-none transition-colors duration-150",
        "placeholder:text-slate-400",
        "focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100",
        t ? "border-red-500 focus:border-red-500 focus:ring-red-500/40" : "border-slate-300",
        i && "font-mono",
        ce[r],
        c
      ),
      ...x
    }
  ) : /* @__PURE__ */ G(
    "div",
    {
      className: H(
        "relative flex w-full items-center rounded-md border bg-slate-50",
        "transition-colors duration-150",
        "focus-within:bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/40",
        t ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/40" : "border-slate-300",
        s && "opacity-50 cursor-not-allowed bg-slate-100"
      ),
      children: [
        u && /* @__PURE__ */ U(
          "span",
          {
            "aria-hidden": "true",
            className: H(
              "flex shrink-0 items-center text-slate-400",
              xe[r]
            ),
            children: o
          }
        ),
        /* @__PURE__ */ U(
          "input",
          {
            ref: y,
            type: n,
            disabled: s,
            "data-testid": p,
            className: H(
              "flex-1 min-w-0 bg-transparent font-inherit text-slate-900 outline-none",
              "placeholder:text-slate-400",
              "disabled:cursor-not-allowed",
              u ? "pl-0" : ce[r].split(" ")[1],
              w ? "pr-0" : ce[r].split(" ")[2],
              r === "sm" ? "h-7 text-[12px]" : "h-9 text-[13px]",
              i && "font-mono",
              c
            ),
            ...x
          }
        ),
        w && /* @__PURE__ */ U(
          "span",
          {
            "aria-hidden": "true",
            className: H(
              "flex shrink-0 items-center text-slate-400",
              xe[r]
            ),
            children: a
          }
        )
      ]
    }
  );
}), pt = {
  sm: "h-7 px-2 text-[12px]",
  md: "h-9 px-2.5 text-[13px]"
}, Kt = Y(function({
  options: n,
  placeholder: r,
  size: o = "md",
  invalid: a = !1,
  disabled: t = !1,
  className: s,
  "data-testid": i,
  value: c,
  ...p
}, x) {
  return /* @__PURE__ */ G(
    "select",
    {
      ref: x,
      disabled: t,
      "data-testid": i,
      value: c,
      className: H(
        "w-full appearance-none rounded-md border bg-slate-50 font-inherit text-slate-900",
        "outline-none transition-colors duration-150 cursor-pointer",
        // Custom chevron via background-image is banned (inline style). Instead
        // rely on the native OS chevron — appearance: none removes it but is
        // only needed to remove the native outline; here we let native appearance
        // show through via a Tailwind `select` reset that keeps the arrow.
        // We use `appearance-auto` to restore the native arrow on modern browsers.
        "appearance-auto",
        "focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100",
        a ? "border-red-500 focus:border-red-500 focus:ring-red-500/40" : "border-slate-300",
        pt[o],
        s
      ),
      ...p,
      children: [
        r && /* @__PURE__ */ U("option", { value: "", disabled: !0, children: r }),
        n.map((y) => /* @__PURE__ */ U("option", { value: y.value, disabled: y.disabled, children: y.label }, y.value))
      ]
    }
  );
}), Vt = Y(
  function({
    rows: n,
    minRows: r = 2,
    maxRows: o,
    autoResize: a = !1,
    invalid: t = !1,
    disabled: s = !1,
    onChange: i,
    value: c,
    className: p,
    "data-testid": x,
    ...y
  }, u) {
    const w = B(null), f = v(
      (E) => {
        w.current = E, typeof u == "function" ? u(E) : u && (u.current = E);
      },
      [u]
    ), P = 20, h = 12, b = v(() => {
      const E = w.current;
      if (!E || !a) return;
      E.style.height = "auto";
      const N = r * P + h, l = E.scrollHeight, S = o ? o * P + h : 1 / 0;
      E.style.height = `${Math.min(Math.max(l, N), S)}px`, E.style.overflowY = l > S ? "auto" : "hidden";
    }, [a, r, o]);
    F(() => {
      b();
    }, [c, b]);
    const g = v(
      (E) => {
        b(), i?.(E);
      },
      [i, b]
    );
    return /* @__PURE__ */ U(
      "textarea",
      {
        ref: f,
        rows: a ? void 0 : n ?? r,
        disabled: s,
        "data-testid": x,
        value: c,
        onChange: g,
        className: H(
          "w-full rounded-md border bg-slate-50 font-inherit text-slate-900",
          "outline-none transition-colors duration-150 px-2.5 py-1.5 text-[13px] leading-5",
          "placeholder:text-slate-400",
          "focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100",
          !a && "resize-y",
          a && "resize-none overflow-hidden",
          t ? "border-red-500 focus:border-red-500 focus:ring-red-500/40" : "border-slate-300",
          p
        ),
        style: a ? { minHeight: `${r * P + h}px` } : void 0,
        ...y
      }
    );
  }
), mt = {
  sm: "px-1.5 py-0.5 text-[11px]",
  md: "px-2 py-0.5 text-[12px]"
}, zt = Y(
  function({
    value: n,
    onChange: r,
    samples: o,
    placeholder: a = "$.path.to.value",
    invalid: t = !1,
    errorMessage: s,
    disabled: i = !1,
    size: c = "md",
    enforcePrefix: p = !1,
    "data-testid": x
  }, y) {
    const u = Ce(), w = p && n.length > 0 && !n.startsWith("$.") ? 'JSONPath must start with "$."' : void 0, f = t || w != null, P = s ?? w;
    return /* @__PURE__ */ G("div", { className: "flex flex-col gap-1 w-full", children: [
      /* @__PURE__ */ U(
        Ae,
        {
          ref: y,
          type: "text",
          mono: !0,
          size: c,
          value: n,
          onChange: (h) => r(h.target.value),
          placeholder: a,
          invalid: f,
          disabled: i,
          "data-testid": x,
          "aria-describedby": P ? u : void 0,
          "aria-invalid": f || void 0
        }
      ),
      o && o.length > 0 && /* @__PURE__ */ U("div", { className: "flex flex-wrap gap-1", children: o.map((h) => /* @__PURE__ */ U(
        "button",
        {
          type: "button",
          disabled: i,
          onClick: () => r(h.value),
          className: H(
            "rounded border border-slate-200 bg-slate-100 font-mono text-slate-600",
            "transition-colors duration-100",
            "hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/40",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            mt[c]
          ),
          children: h.label
        },
        h.value
      )) }),
      P && /* @__PURE__ */ U(
        "p",
        {
          id: u,
          role: "alert",
          className: "text-[11px] text-red-600 leading-4",
          children: P
        }
      )
    ] });
  }
), Xt = Y(
  function({
    value: n,
    onChange: r,
    min: o,
    max: a,
    step: t,
    unit: s,
    placeholder: i,
    invalid: c = !1,
    disabled: p = !1,
    size: x = "md",
    "data-testid": y
  }, u) {
    const w = v(
      (b) => {
        let g = b;
        return o !== void 0 && g < o && (g = o), a !== void 0 && g > a && (g = a), g;
      },
      [o, a]
    ), f = v(
      (b) => {
        const g = parseFloat(b.target.value);
        Number.isNaN(g) || r(g);
      },
      [r]
    ), P = v(
      (b) => {
        const g = parseFloat(b.target.value);
        if (!Number.isNaN(g)) {
          const R = w(g);
          R !== g && r(R);
        }
      },
      [w, r]
    );
    return /* @__PURE__ */ U(
      Ae,
      {
        ref: u,
        type: "number",
        size: x,
        value: n,
        min: o,
        max: a,
        step: t,
        placeholder: i,
        invalid: c,
        disabled: p,
        suffix: s ? /* @__PURE__ */ U("span", { className: "text-slate-400 font-sans text-[12px] select-none", children: s }) : void 0,
        "data-testid": y,
        onChange: f,
        onBlur: P
      }
    );
  }
), ft = {
  sm: "w-16",
  md: "w-32",
  lg: "w-48"
}, gt = {
  square: "aspect-square",
  video: "aspect-video",
  auto: ""
};
function yt() {
  return /* @__PURE__ */ G(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "w-6 h-6 text-slate-400",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ U("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
        /* @__PURE__ */ U("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
        /* @__PURE__ */ U("path", { d: "M21 15l-5-5L5 21" })
      ]
    }
  );
}
function Yt({
  src: e,
  alt: n,
  size: r = "md",
  aspectRatio: o = "square",
  rounded: a = !1,
  fallback: t,
  loading: s = "lazy",
  className: i,
  "data-testid": c
}) {
  const [p, x] = O("loading");
  return /* @__PURE__ */ G(
    "div",
    {
      "data-testid": c,
      className: H(
        "relative overflow-hidden bg-slate-100",
        ft[r],
        o !== "auto" && gt[o],
        a ? "rounded-full" : "rounded-md",
        i
      ),
      children: [
        p === "loading" && /* @__PURE__ */ U(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute inset-0 animate-pulse bg-slate-200"
          }
        ),
        p === "error" && /* @__PURE__ */ U("div", { className: "absolute inset-0 flex items-center justify-center bg-slate-100", children: t ?? /* @__PURE__ */ U(yt, {}) }),
        /* @__PURE__ */ U(
          "img",
          {
            src: e,
            alt: n,
            loading: s,
            onLoad: () => x("loaded"),
            onError: () => x("error"),
            className: H(
              "w-full h-full object-cover transition-opacity duration-200",
              p === "loaded" ? "opacity-100" : "opacity-0"
            )
          }
        )
      ]
    }
  );
}
const he = de(null);
function Gt({
  services: e,
  children: n
}) {
  return /* @__PURE__ */ U(he.Provider, { value: e, children: n });
}
function Qt() {
  const e = W(he);
  if (!e)
    throw new Error(
      "useImageUrl must be called inside <PipelineEditorServicesProvider>. The host editor (e.g. wsg PipelineEditorPage) is responsible for mounting it with its own getImageUrl implementation."
    );
  return e.getImageUrl;
}
function Zt() {
  const e = W(he);
  if (!e)
    throw new Error(
      "usePipelineEditorServices must be called inside <PipelineEditorServicesProvider>."
    );
  return e;
}
export {
  kt as A,
  Rt as B,
  Tt as C,
  Ve as D,
  K as E,
  nt as F,
  we as G,
  Ct as H,
  Yt as I,
  zt as J,
  Et as K,
  ie as L,
  Ut as M,
  Xt as N,
  Ze as O,
  Mt as P,
  me as Q,
  qe as R,
  Kt as S,
  Vt as T,
  jt as U,
  Pt as V,
  dt as W,
  $t as X,
  J as a,
  At as b,
  Ot as c,
  qt as d,
  Ae as e,
  Ee as f,
  lt as g,
  Gt as h,
  Lt as i,
  St as j,
  Le as k,
  We as l,
  Jt as m,
  Se as n,
  je as o,
  Ht as p,
  Qt as q,
  Bt as r,
  Wt as s,
  Zt as t,
  ut as u,
  Ft as v,
  _t as w,
  Dt as x,
  ye as y,
  Nt as z
};
