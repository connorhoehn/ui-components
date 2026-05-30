import { createContext as ge, useState as N, useRef as L, useEffect as F, useCallback as y, useMemo as V, useContext as W } from "react";
import { a as Pe, u as Re } from "./EventStreamContext-CjzSHXy-.js";
import { jsx as ye } from "react/jsx-runtime";
import "@schemas/pipeline.schema.json";
import { u as $e } from "./IdentityContext-CLalsm_M.js";
import { u as se } from "./WebSocketContext-DPGFyPeZ.js";
async function dt(e, n) {
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
async function Ae(e, n, r, o, a) {
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
const ke = "ws_pipeline_runs_v1:", Ee = 50;
function ie(e) {
  return `${ke}${e}`;
}
let pe = !1;
function Ue(e, n) {
  try {
    localStorage.setItem(e, n);
  } catch (r) {
    pe || (pe = !0, console.warn("[runHistory] localStorage write failed", r));
  }
}
function ae(e) {
  try {
    const n = localStorage.getItem(ie(e));
    if (!n) return [];
    const r = JSON.parse(n);
    return Array.isArray(r) ? r : [];
  } catch {
    return [];
  }
}
function pt(e, n) {
  return ae(e).find((o) => o.id === n) ?? null;
}
function Ce(e, n) {
  const r = ae(e).filter((a) => a.id !== n.id), o = [n, ...r].sort((a, t) => t.startedAt.localeCompare(a.startedAt)).slice(0, Ee);
  Ue(ie(e), JSON.stringify(o));
}
function lt(e) {
  try {
    localStorage.removeItem(ie(e));
  } catch {
  }
}
async function he(e, n) {
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
async function De(e, n) {
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
const mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getPipelineRun: De,
  listPipelineRuns: he
}, Symbol.toStringTag, { value: "Module" })), Ie = "ws_pipelines_v1_index", Oe = "ws_pipelines_v1:";
function Z(e) {
  return `${Oe}${e}`;
}
let le = !1;
function ce(e, n) {
  try {
    localStorage.setItem(e, n);
  } catch (r) {
    le || (le = !0, console.warn("[pipelineStorage] localStorage write failed", r));
  }
}
function ue() {
  try {
    const e = localStorage.getItem(Ie);
    if (!e) return [];
    const n = JSON.parse(e);
    return Array.isArray(n) ? n : [];
  } catch {
    return [];
  }
}
function we(e) {
  ce(Ie, JSON.stringify(e));
}
function je(e) {
  const n = ue(), r = {
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
  we(n);
}
function Ne(e) {
  const n = ue().filter((r) => r.id !== e);
  we(n);
}
function _e() {
  return ue();
}
function B(e) {
  try {
    const n = localStorage.getItem(Z(e));
    return n ? JSON.parse(n) : null;
  } catch {
    return null;
  }
}
function H(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), ce(Z(e.id), JSON.stringify(e)), je(e);
}
function Me(e) {
  ce(Z(e.id), JSON.stringify(e));
}
function Fe(e) {
  try {
    localStorage.removeItem(Z(e));
  } catch {
  }
  Ne(e);
}
function ft(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), t = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), c = crypto.randomUUID(), g = crypto.randomUUID(), $ = crypto.randomUUID(), w = crypto.randomUUID(), l = crypto.randomUUID(), S = crypto.randomUUID(), m = { type: "trigger", triggerType: "manual" }, P = {
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
  }, v = {
    type: "action",
    actionType: "post-comment",
    config: { body: "{{context.steps." + o + ".response}}" },
    onError: "route-error"
  }, k = {
    type: "action",
    actionType: "notify",
    config: {
      recipient: "{{context.triggeredBy.userId}}",
      message: "Your document summary is ready for review."
    },
    onError: "route-error"
  }, U = {
    type: "join",
    mode: "all",
    mergeStrategy: "deep-merge"
  }, C = {
    type: "approval",
    approvers: [{ type: "user", value: "demo-user" }],
    requiredCount: 1,
    timeoutMs: 1440 * 60 * 1e3,
    timeoutAction: "reject",
    message: "Please review before posting."
  }, d = {
    type: "action",
    actionType: "update-document",
    config: { summary: "{{context.steps." + o + ".response}}" },
    onError: "route-error"
  }, E = [
    { id: r, type: "trigger", position: { x: 40, y: 200 }, data: m },
    { id: o, type: "llm", position: { x: 320, y: 200 }, data: P },
    { id: a, type: "condition", position: { x: 620, y: 200 }, data: h },
    { id: t, type: "fork", position: { x: 900, y: 120 }, data: b },
    { id: s, type: "action", position: { x: 1180, y: 60 }, data: v },
    { id: i, type: "action", position: { x: 1180, y: 180 }, data: k },
    { id: c, type: "join", position: { x: 1480, y: 120 }, data: U },
    { id: g, type: "approval", position: { x: 1780, y: 120 }, data: C },
    { id: $, type: "action", position: { x: 2080, y: 120 }, data: d },
    { id: w, type: "action", position: { x: 900, y: 320 }, data: {
      type: "action",
      actionType: "mcp-tool",
      config: {
        tool: "send-short-summary",
        recipient: "{{context.triggeredBy.userId}}",
        message: "Short summary generated."
      },
      onError: "route-error"
    } },
    { id: l, type: "action", position: { x: 1480, y: 420 }, data: {
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
    { id: S, type: "transform", position: { x: 2380, y: 200 }, data: {
      type: "transform",
      transformType: "template",
      expression: "pipeline-complete",
      outputKey: "pipelineCompletion",
      terminal: !0
    } }
  ], A = (_, K, p, u) => ({
    id: crypto.randomUUID(),
    source: _,
    sourceHandle: K,
    target: p,
    targetHandle: u
  }), q = [
    // Happy path: trigger → llm → condition → fork → (postComment | notify) → join → approval → updateDoc → finalSink
    A(r, "out", o, "in"),
    A(o, "out", a, "in"),
    A(a, "true", t, "in"),
    A(a, "false", w, "in"),
    A(t, "branch-0", s, "in"),
    A(t, "branch-1", i, "in"),
    A(s, "out", c, "in-0"),
    A(i, "out", c, "in-1"),
    A(c, "out", g, "in"),
    A(g, "approved", $, "in"),
    // Terminal `out` paths converge on the final sink. Each leaf wires `out`
    // so DEAD_END only fires for the sink itself.
    A($, "out", S, "in"),
    A(w, "out", S, "in"),
    // Approval rejection routes through the shared error handler. Wiring
    // `rejected` is hygiene only — there is no UNUSED_APPROVAL_BRANCH lint —
    // but it keeps the rejection path observable.
    A(g, "rejected", l, "in"),
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
    A(o, "error", l, "in"),
    A($, "error", l, "in"),
    A(w, "error", l, "in"),
    // The error handler itself drains into the final sink on both handles
    // so it is not a dead end and its own `error` handle is wired (silencing
    // NO_ERROR_HANDLER for the error-handler node).
    A(l, "out", S, "in"),
    A(l, "error", S, "in")
  ], M = {
    id: crypto.randomUUID(),
    name: "Document Summary Pipeline (Demo)",
    description: "A showcase pipeline demonstrating LLM summarization, branching, approval, parallel actions, and a shared error handler.",
    icon: "📄",
    version: 0,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "manual" },
    nodes: E,
    edges: q,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
  return H(M), M;
}
function gt(e, n) {
  const r = B(e);
  if (!r) return null;
  const o = /* @__PURE__ */ new Map(), a = r.nodes.map((c) => {
    const g = crypto.randomUUID();
    return o.set(c.id, g), { ...c, id: g, data: { ...c.data } };
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
  return H(i), i;
}
function yt(e) {
  const n = B(e);
  return n ? JSON.stringify(n, null, 2) : null;
}
function X(e = "") {
  return `/api/pipelines/defs${e}`;
}
const qe = { "Content-Type": "application/json" };
async function Le() {
  const e = await fetch(X("/"), { credentials: "include" });
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
async function Be(e) {
  const n = await fetch(X(`/${encodeURIComponent(e)}`), {
    credentials: "include"
  });
  if (n.status === 404) return null;
  if (!n.ok) throw new Error(`loadPipelineRemote failed (${n.status})`);
  return await n.json();
}
async function be(e) {
  const n = await fetch(X(`/${encodeURIComponent(e.id)}`), {
    method: "PUT",
    headers: qe,
    credentials: "include",
    body: JSON.stringify(e)
  });
  if (!n.ok) throw new Error(`savePipelineRemote failed (${n.status})`);
  return await n.json();
}
async function He(e) {
  const n = await fetch(X(`/${encodeURIComponent(e)}`), {
    method: "DELETE",
    credentials: "include"
  });
  if (!n.ok && n.status !== 404)
    throw new Error(`deletePipelineRemote failed (${n.status})`);
}
async function Je(e) {
  const n = await fetch(X(`/${encodeURIComponent(e)}/publish`), {
    method: "POST",
    credentials: "include"
  });
  if (n.status === 404) return null;
  if (!n.ok) throw new Error(`publishPipelineRemote failed (${n.status})`);
  return await n.json();
}
function J(e) {
  const n = e.message || String(e);
  return n.includes("NetworkError") || n.includes("Failed to fetch") || n.includes("network") || n.includes("ECONNREFUSED") || n.includes("500") || n.includes("502") || n.includes("503") || n.includes("504");
}
async function ht() {
  try {
    return await Le();
  } catch (e) {
    if (J(e)) return _e();
    throw e;
  }
}
async function me(e) {
  try {
    const n = await Be(e);
    return n && H(n), n ?? B(e);
  } catch (n) {
    if (J(n)) return B(e);
    throw n;
  }
}
async function ne(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), H(e);
  try {
    return await be(e);
  } catch (n) {
    if (J(n)) return e;
    throw n;
  }
}
async function It(e) {
  Fe(e);
  try {
    await He(e);
  } catch (n) {
    if (J(n)) return;
    throw n;
  }
}
async function Ke(e) {
  try {
    const n = await Je(e);
    return n && H(n), n;
  } catch (n) {
    if (J(n)) return null;
    throw n;
  }
}
async function wt(e) {
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
  H(o);
  try {
    await be(o);
  } catch (a) {
    if (!J(a)) throw a;
  }
  return o;
}
const Ve = 500, fe = 50;
function We(e) {
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
  }
}
function z() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
const de = ge(null);
function bt({
  pipelineId: e,
  children: n
}) {
  const [r, o] = N(null), [a, t] = N(!1), [s, i] = N(null), [c, g] = N([]), [$, w] = N([]), l = L(null);
  F(() => {
    let p = !1;
    return o(null), t(!1), i(null), g([]), w([]), me(e).then((u) => {
      p || (u && (u.nodes = u.nodes ?? [], u.edges = u.edges ?? []), o(u));
    }), () => {
      p = !0;
    };
  }, [e]), F(() => {
    if (!(!a || !r))
      return l.current && clearTimeout(l.current), l.current = setTimeout(() => {
        ne(r).then(() => t(!1));
      }, Ve), () => {
        l.current && (clearTimeout(l.current), l.current = null);
      };
  }, [r, a]);
  const S = y((p) => {
    g((u) => {
      const f = [
        ...u,
        { nodes: p.nodes, edges: p.edges }
      ];
      return f.length > fe && f.shift(), f;
    }), w([]);
  }, []), m = y(
    (p) => {
      let u = null;
      return o((f) => {
        if (!f) return f;
        S(f);
        const R = p(f);
        return u = R, R;
      }), t(!0), u;
    },
    [S]
  ), P = y(
    (p, u) => {
      const f = z();
      return m((R) => ({
        ...R,
        nodes: [
          ...R.nodes,
          { id: f, type: p, position: u, data: We(p) }
        ]
      })), f;
    },
    [m]
  ), h = y(
    (p, u) => {
      m((f) => ({
        ...f,
        nodes: f.nodes.map((R) => R.id === p ? { ...R, ...u } : R)
      }));
    },
    [m]
  ), b = y(
    (p, u) => {
      m((f) => ({
        ...f,
        nodes: f.nodes.map((R) => {
          if (R.id !== p) return R;
          const O = { ...R.data, ...u };
          return { ...R, data: O };
        })
      }));
    },
    [m]
  ), v = y(
    (p) => {
      m((u) => ({
        ...u,
        nodes: u.nodes.filter((f) => f.id !== p),
        edges: u.edges.filter((f) => f.source !== p && f.target !== p)
      })), i((u) => u === p ? null : u);
    },
    [m]
  ), k = y(
    (p) => {
      const u = [];
      return m((f) => {
        const R = new Set(p), O = /* @__PURE__ */ new Map(), Y = f.nodes.filter((D) => R.has(D.id)).map((D) => {
          const te = z();
          return O.set(D.id, te), u.push(te), {
            ...D,
            id: te,
            position: { x: D.position.x + 40, y: D.position.y + 40 },
            data: { ...D.data }
          };
        }), Te = f.edges.filter((D) => R.has(D.source) && R.has(D.target)).map((D) => ({
          ...D,
          id: z(),
          source: O.get(D.source) ?? D.source,
          target: O.get(D.target) ?? D.target
        }));
        return {
          ...f,
          nodes: [...f.nodes, ...Y],
          edges: [...f.edges, ...Te]
        };
      }), u;
    },
    [m]
  ), U = y(
    (p) => {
      const u = z();
      return m((f) => ({
        ...f,
        edges: [...f.edges, { id: u, ...p }]
      })), u;
    },
    [m]
  ), C = y(
    (p) => {
      m((u) => ({
        ...u,
        edges: u.edges.filter((f) => f.id !== p)
      }));
    },
    [m]
  ), d = y(
    (p) => {
      p.length !== 0 && o((u) => {
        if (!u) return u;
        const f = new Map(p.map((O) => [O.id, O.position])), R = {
          ...u,
          nodes: u.nodes.map((O) => {
            const Y = f.get(O.id);
            return Y ? { ...O, position: Y } : O;
          })
        };
        return Me(R), R;
      });
    },
    []
  ), I = y(() => {
    r && (l.current && (clearTimeout(l.current), l.current = null), ne(r).then(() => t(!1)));
  }, [r]), x = y(() => {
    if (!r) return;
    l.current && (clearTimeout(l.current), l.current = null), (async () => {
      a && (await ne(r), t(!1));
      const u = await Ke(r.id);
      u && o(u);
    })();
  }, [r, a]), T = y(() => {
    me(e).then((p) => {
      o(p), t(!1), g([]), w([]);
    });
  }, [e]), E = y((p) => {
    const u = p.trim();
    u && (o((f) => !f || f.name === u ? f : { ...f, name: u }), t(!0));
  }, []), A = y((p) => {
    o((u) => !u || u.icon === p ? u : { ...u, icon: p }), t(!0);
  }, []), q = y((p) => {
    o((u) => {
      if (!u) return u;
      const f = u.tags ?? [];
      return f.length === p.length && f.every((R, O) => R === p[O]) ? u : { ...u, tags: [...p] };
    }), t(!0);
  }, []), M = y(() => {
    g((p) => {
      if (p.length === 0 || !r) return p;
      const u = p[p.length - 1];
      return w((f) => [
        ...f,
        { nodes: r.nodes, edges: r.edges }
      ]), o({ ...r, nodes: u.nodes, edges: u.edges }), t(!0), p.slice(0, -1);
    });
  }, [r]), _ = y(() => {
    w((p) => {
      if (p.length === 0 || !r) return p;
      const u = p[p.length - 1];
      return g((f) => {
        const R = [
          ...f,
          { nodes: r.nodes, edges: r.edges }
        ];
        return R.length > fe && R.shift(), R;
      }), o({ ...r, nodes: u.nodes, edges: u.edges }), t(!0), p.slice(0, -1);
    });
  }, [r]), K = V(
    () => ({
      definition: r,
      dirty: a,
      selectedNodeId: s,
      setSelectedNodeId: i,
      addNode: P,
      updateNode: h,
      updateNodeData: b,
      removeNode: v,
      duplicateNodes: k,
      addEdge: U,
      removeEdge: C,
      setPositions: d,
      save: I,
      publish: x,
      revert: T,
      undo: M,
      redo: _,
      canUndo: c.length > 0,
      canRedo: $.length > 0,
      rename: E,
      setIcon: A,
      setTags: q
    }),
    [
      r,
      a,
      s,
      P,
      h,
      b,
      v,
      k,
      U,
      C,
      d,
      I,
      x,
      T,
      M,
      _,
      c.length,
      $.length,
      E,
      A,
      q
    ]
  );
  return /* @__PURE__ */ ye(de.Provider, { value: K, children: n });
}
function vt() {
  const e = W(de);
  if (!e)
    throw new Error(
      "usePipelineEditor must be used within a PipelineEditorProvider"
    );
  return e;
}
function Xe() {
  const { idToken: e } = $e(), [n, r] = N(!1), [o, a] = N(null), [t, s] = N(!1), i = "";
  return { triggerRun: y(
    async (g, $, w) => {
      r(!0), a(null), s(!1);
      try {
        const l = B(g), S = {};
        $ && (S.triggerPayload = $), l && (S.definition = l);
        const m = {
          "Content-Type": "application/json",
          ...e ? { Authorization: `Bearer ${e}` } : {}
        };
        w?.idempotencyKey && (m["Idempotency-Key"] = w.idempotencyKey);
        const P = await fetch(
          `${i}/api/pipelines/${encodeURIComponent(g)}/runs`,
          {
            method: "POST",
            headers: m,
            body: JSON.stringify(S)
          }
        );
        if (!P.ok) {
          const v = await P.text().catch(() => "");
          return a(
            `Trigger failed (${P.status})${v ? `: ${v}` : ""}`
          ), null;
        }
        const h = typeof P.headers?.get == "function" ? P.headers.get("X-Idempotent-Replay") : P.headers["x-idempotent-replay"] ?? null;
        return s(h === "true"), (await P.json()).runId;
      } catch (l) {
        return a(l.message), null;
      } finally {
        r(!1);
      }
    },
    [i, e]
  ), isTriggering: n, lastError: o, isReplay: t };
}
const Ye = Object.freeze({
  // DC-sourced kebab form (after bridge's `:` → `.` mapping) → colon-form in-app key.
  "pipeline.run.resume-from-step": "pipeline:run:resumeFromStep",
  // hub#2223: producer-backed canonical past-tense form. Kebab-from-the-wire
  // already maps directly into the PipelineEventMap key, but keep an explicit
  // identity entry here for documentation purposes (the function below
  // collapses to the input when the alias is the same string).
  "pipeline.run.resumed-from-step": "pipeline.run.resumed-from-step"
});
function ze(e) {
  return Ye[e] ?? e;
}
function St({
  channel: e = "pipeline:all",
  onEvent: n,
  enabled: r = !1
}) {
  const { connectionState: o, sendMessage: a, onMessage: t } = se(), s = L(n);
  F(() => {
    s.current = n;
  }, [n]), F(() => {
    if (!r || o !== "connected") return;
    a({ service: "pipeline", action: "subscribe", channel: e });
    const i = t((c) => {
      if (c.type !== "pipeline:event") return;
      const g = c, $ = g.eventType;
      if (!$) return;
      const l = {
        eventType: ze($),
        payload: g.payload,
        seq: typeof g.seq == "number" ? g.seq : 0,
        sourceNodeId: typeof g.sourceNodeId == "string" ? g.sourceNodeId : "unknown",
        emittedAt: typeof g.emittedAt == "number" ? g.emittedAt : Date.now()
      };
      try {
        s.current(l);
      } catch (S) {
        console.error("[WebSocketEventAdapter] onEvent threw", S);
      }
    });
    return () => {
      i(), a({ service: "pipeline", action: "unsubscribe", channel: e });
    };
  }, [r, o, e, a, t]);
}
function G() {
  const e = typeof globalThis < "u" ? globalThis.crypto : void 0;
  return e && typeof e.randomUUID == "function" ? e.randomUUID() : `ws-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function Ge() {
  const { sendMessage: e } = se(), n = y(
    (w) => e({ service: "pipeline", action: "subscribe", channel: `pipeline:run:${w}` }),
    [e]
  ), r = y(
    (w) => e({ service: "pipeline", action: "unsubscribe", channel: `pipeline:run:${w}` }),
    [e]
  ), o = y(
    () => e({ service: "pipeline", action: "subscribe", channel: "pipeline:all" }),
    [e]
  ), a = y(
    () => e({ service: "pipeline", action: "unsubscribe", channel: "pipeline:all" }),
    [e]
  ), t = y(
    () => e({ service: "pipeline", action: "subscribe", channel: "pipeline:approvals" }),
    [e]
  ), s = y(
    () => e({ service: "pipeline", action: "unsubscribe", channel: "pipeline:approvals" }),
    [e]
  ), i = y(
    (w, l = {}) => {
      const S = l.correlationId ?? G();
      return e({
        service: "pipeline",
        action: "trigger",
        pipelineId: w,
        ...l.definition ? { definition: l.definition } : {},
        ...l.triggerPayload ? { triggerPayload: l.triggerPayload } : {},
        ...l.triggeredBy ? { triggeredBy: l.triggeredBy } : {},
        correlationId: S
      }), S;
    },
    [e]
  ), c = y(
    (w, l) => {
      const S = l ?? G();
      return e({ service: "pipeline", action: "cancel", runId: w, correlationId: S }), S;
    },
    [e]
  ), g = y(
    (w, l, S, m = {}) => {
      const P = m.correlationId ?? G();
      return e({
        service: "pipeline",
        action: "resolveApproval",
        runId: w,
        stepId: l,
        decision: S,
        ...m.comment ? { comment: m.comment } : {},
        ...m.decidedBy ? { decidedBy: m.decidedBy } : {},
        correlationId: P
      }), P;
    },
    [e]
  ), $ = y(
    (w, l, S) => {
      const m = S ?? G();
      return e({
        service: "pipeline",
        action: "resumeFromStep",
        runId: w,
        fromNodeId: l,
        correlationId: m
      }), m;
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
    resolveApproval: g,
    requestResumeFromStep: $
  };
}
function xt(e, n = {}) {
  const { enabled: r = !0 } = n, { connectionState: o, sendMessage: a } = se();
  F(() => {
    if (!r || !e || o !== "connected") return;
    const t = `pipeline:run:${e}`;
    return a({ service: "pipeline", action: "subscribe", channel: t }), () => {
      a({ service: "pipeline", action: "unsubscribe", channel: t });
    };
  }, [r, e, o, a]);
}
const oe = 20, ee = ge(null);
function Qe(e, n) {
  return e.steps[n] ?? {
    nodeId: n,
    status: "pending"
  };
}
function j(e, n, r) {
  const o = Qe(e, n), a = typeof r == "function" ? r(o) : { ...o, ...r };
  return { ...e, steps: { ...e.steps, [n]: a } };
}
function Ze(e) {
  const n = Object.values(e);
  if (n.length <= oe) return e;
  const r = n.filter(
    (i) => i.status === "running" || i.status === "pending" || i.status === "awaiting_approval" || i.status === "paused_at_breakpoint"
  ), a = n.filter(
    (i) => i.status !== "running" && i.status !== "pending" && i.status !== "awaiting_approval" && i.status !== "paused_at_breakpoint"
  ).sort((i, c) => c.startedAt.localeCompare(i.startedAt)).slice(
    0,
    Math.max(0, oe - r.length)
  ), t = [...r, ...a], s = {};
  for (const i of t) s[i.id] = i;
  return s;
}
function Tt({ children: e }) {
  const n = W(de), { triggerRun: r } = Xe(), o = Ge(), [a, t] = N({}), [s, i] = N(!1), c = L(/* @__PURE__ */ new Set()), g = L(null);
  F(() => {
    const d = n?.definition?.id;
    !d || g.current === d || (g.current = d, i(!0), he(d, { limit: oe }).then((I) => {
      t((x) => {
        const T = { ...x };
        for (const E of I.runs)
          T[E.id] || (T[E.id] = E);
        return T;
      });
    }).catch((I) => {
      console.error("[PipelineRuns] Failed to load history from API", I), t((x) => {
        const T = { ...x };
        for (const E of ae(d))
          T[E.id] || (T[E.id] = E);
        return T;
      });
    }).finally(() => i(!1)));
  }, [n?.definition?.id]), Pe("*", (d) => {
    const { eventType: I, payload: x } = d;
    t((T) => et(T, I, x));
  }), F(() => {
    for (const d of Object.values(a))
      if ((d.status === "completed" || d.status === "failed" || d.status === "cancelled") && !c.current.has(d.id)) {
        c.current.add(d.id);
        try {
          Ce(d.pipelineId, d);
        } catch (x) {
          console.warn("[PipelineRuns] appendRun failed", x);
        }
      }
  }, [a]);
  const $ = y(
    async (d, I) => {
      const x = await r(d, I);
      if (!x)
        throw new Error("Trigger failed (REST POST did not return a runId)");
      return x;
    },
    [r]
  ), w = y(
    (d) => {
      o.cancelRun(d);
    },
    [o]
  ), l = y(
    (d, I, x, T) => {
      o.resolveApproval(d, I, x, { comment: T });
    },
    [o]
  ), S = L(a);
  F(() => {
    S.current = a;
  }, [a]);
  const m = y(
    async (d) => {
      const x = Object.values(S.current).filter((T) => T.status === "failed").filter((T) => T.steps[d]?.status === "failed").sort((T, E) => E.startedAt.localeCompare(T.startedAt))[0];
      if (!x) {
        console.warn(
          "[PipelineRuns] retryFromStep — no failed run found for node",
          d
        );
        return;
      }
      try {
        await Ae(x.pipelineId, x.id, d);
      } catch (T) {
        console.error("[PipelineRuns] retryFromNode API failed", T);
      }
    },
    []
  ), P = y(
    async (d, I, x) => {
      const T = { ...x ?? {}, __breakpoints: I };
      return $(d, T);
    },
    [$]
  ), h = y(
    (d, I, x = "continue") => {
      const A = S.current[d]?.pipelineId ?? "unknown";
      fetch(
        `/api/pipelines/${encodeURIComponent(A)}/runs/${encodeURIComponent(d)}/breakpoint/${encodeURIComponent(I)}/resolve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: x })
        }
      ).catch((q) => {
        console.error("[PipelineRuns] resolveBreakpoint API failed", q);
      });
    },
    []
  ), b = y(
    async (d, I, x, T) => {
      const q = S.current[d]?.pipelineId ?? "unknown", M = `/api/pipelines/${encodeURIComponent(q)}/runs/${encodeURIComponent(d)}/breakpoint/${encodeURIComponent(I)}/patch`, _ = await fetch(M, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patch: x, ...T ? { appliedBy: T } : {} })
      });
      if (_.status === 200)
        return await _.json();
      if (_.status === 422) {
        const p = await _.json().catch(() => ({}));
        return p.result ? p.result : {
          patchId: "",
          before: {},
          after: {},
          validation: { ok: !1, reason: p.error ?? "patch rejected" }
        };
      }
      const K = await _.text().catch(() => "");
      throw new Error(`applyContextPatch HTTP ${_.status}: ${K}`);
    },
    []
  ), v = y(
    async (d, I, x) => {
      const A = S.current[d]?.pipelineId ?? "unknown", q = `/api/pipelines/${encodeURIComponent(A)}/runs/${encodeURIComponent(d)}/breakpoint/${encodeURIComponent(I)}/patch/${encodeURIComponent(x)}`, M = await fetch(q, { method: "DELETE" });
      if (M.status !== 204) {
        const _ = await M.text().catch(() => "");
        throw new Error(`revertContextPatch HTTP ${M.status}: ${_}`);
      }
    },
    []
  ), k = y((d) => {
    t((I) => {
      const x = I[d.id];
      if (x && x.status === d.status) {
        const T = Object.keys(x.steps).length, E = Object.keys(d.steps).length;
        if (T >= E) return I;
      }
      return { ...I, [d.id]: d };
    });
  }, []), U = V(
    () => Object.values(a).filter(
      (d) => d.status === "running" || d.status === "pending" || d.status === "awaiting_approval" || d.status === "paused_at_breakpoint"
    ).map((d) => d.id),
    [a]
  ), C = V(
    () => ({
      runs: a,
      activeRunIds: U,
      triggerRun: $,
      triggerDebugRun: P,
      cancelRun: w,
      resolveApproval: l,
      resolveBreakpoint: h,
      applyContextPatch: b,
      revertContextPatch: v,
      retryFromStep: m,
      ingestRun: k
    }),
    [
      a,
      U,
      $,
      P,
      w,
      l,
      h,
      b,
      v,
      m,
      k
    ]
  );
  return /* @__PURE__ */ ye(ee.Provider, { value: C, children: e });
}
function et(e, n, r) {
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
      return Ze({ ...e, [t.runId]: s });
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
      const i = j(s, t.stepId, (c) => ({
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
      const i = j(s, t.stepId, (c) => ({
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
      const i = j(s, t.stepId, (c) => ({
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
      const i = j(s, t.stepId, (c) => ({
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
      const i = j(s, t.stepId, (c) => ({
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
        [t.runId]: j(s, t.stepId, (i) => ({
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
        [t.runId]: j(s, t.stepId, (i) => {
          const c = Date.parse(t.openedAt), g = {
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
          return g.llm._streamOpenedAtMs = Number.isFinite(c) ? c : Date.now(), g;
        })
      } : e;
    }
    case "pipeline.llm.token": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: j(s, t.stepId, (i) => {
          const c = i.llm?.tokensOut ?? 0, g = c === 0, $ = i.llm?._streamOpenedAtMs, w = Date.parse(t.at), l = g && typeof $ == "number" && Number.isFinite(w) ? Math.max(0, w - $) : i.llm?.firstTokenLatencyMs;
          return {
            ...i,
            llm: {
              prompt: i.llm?.prompt ?? "",
              response: (i.llm?.response ?? "") + t.token,
              tokensIn: i.llm?.tokensIn ?? 0,
              tokensOut: c + 1,
              streamOpened: !1,
              ...l !== void 0 ? { firstTokenLatencyMs: l } : {}
            }
          };
        })
      } : e;
    }
    case "pipeline.llm.response": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: j(s, t.stepId, (i) => ({
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
      const i = j(s, t.stepId, (c) => ({
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
        [t.runId]: j(s, t.stepId, (g) => ({
          ...g,
          patches: [...g.patches ?? [], c]
        }))
      };
    }
    case "pipeline.step.context.patch-reverted": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: j(s, t.stepId, (i) => ({
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
      const i = j(s, t.stepId, (c) => ({
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
        [t.runId]: j(s, t.stepId, (c) => ({
          ...c,
          approvals: [...c.approvals ?? [], i]
        }))
      };
    }
    default:
      return e;
  }
}
function tt() {
  const e = W(ee);
  if (!e)
    throw new Error(
      "usePipelineRuns must be used within a PipelineRunsProvider"
    );
  return e;
}
function Pt() {
  return W(ee)?.retryFromStep ?? (async () => {
  });
}
function Rt(e) {
  const n = W(ee);
  return V(() => {
    if (!n) return null;
    let r = null, o = "";
    for (const a of Object.values(n.runs)) {
      const t = a.steps[e];
      t && a.startedAt > o && (r = t, o = a.startedAt);
    }
    return r;
  }, [n, e]);
}
function Q(e, n) {
  return `${e}::${n}`;
}
function re(e, n) {
  const r = B(e);
  if (!r) return { requiredCount: 1 };
  const o = r.nodes.find((t) => t.id === n);
  if (!o || o.data.type !== "approval") return { requiredCount: 1 };
  const a = o.data;
  return {
    message: a.message,
    requiredCount: Math.max(1, a.requiredCount ?? 1)
  };
}
function nt() {
  const e = Re(), n = tt(), [r, o] = N(
    () => {
      const m = {};
      for (const P in n.runs) {
        const h = n.runs[P];
        if (h.status === "awaiting_approval")
          for (const b in h.steps) {
            const v = h.steps[b];
            if (v.status !== "awaiting") continue;
            const k = re(h.pipelineId, b), C = B(h.pipelineId)?.nodes.find((I) => I.id === b), d = C && C.data.type === "approval" ? C.data.approvers : [];
            m[Q(P, b)] = {
              runId: P,
              pipelineId: h.pipelineId,
              stepId: b,
              approvers: d,
              requestedAt: v.startedAt ?? (/* @__PURE__ */ new Date(0)).toISOString(),
              message: k.message,
              requiredCount: k.requiredCount,
              recordedCount: v.approvals?.filter((I) => I.decision === "approve").length ?? 0
            };
          }
      }
      return m;
    }
  ), [a, t] = N(!0), [s, i] = N(null), [c, g] = N(0), $ = L(n.runs);
  F(() => {
    $.current = n.runs;
  }, [n.runs]);
  const w = L(/* @__PURE__ */ new Map());
  F(() => {
    let m = !1;
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
        if (m) return;
        if (h?.pendingApprovals) {
          const b = {};
          for (const v of h.pendingApprovals) {
            const k = re(v.pipelineId, v.stepId);
            b[Q(v.runId, v.stepId)] = {
              runId: v.runId,
              pipelineId: v.pipelineId,
              stepId: v.stepId,
              approvers: v.approvers ?? [],
              requestedAt: v.requestedAt,
              message: v.message ?? k.message,
              requiredCount: v.requiredCount ?? k.requiredCount,
              recordedCount: v.recordedCount ?? 0
            };
          }
          o(b);
        }
        t(!1);
      } catch (h) {
        if (m) return;
        console.error(
          "[usePendingApprovals] /api/observability/dashboard?include=pendingApprovals failed:",
          h
        ), i(h.message ?? "Failed to load pending approvals"), t(!1);
      }
    })(), () => {
      m = !0;
    };
  }, [c]), F(() => {
    const m = [];
    m.push(
      e.subscribe("pipeline.run.started", (h) => {
        const b = h;
        w.current.set(b.runId, b.pipelineId);
      })
    ), m.push(
      e.subscribe("pipeline.approval.requested", (h) => {
        const b = h, v = w.current.get(b.runId) ?? $.current[b.runId]?.pipelineId ?? "", k = re(v, b.stepId);
        o((U) => {
          const C = Q(b.runId, b.stepId);
          return U[C] ? U : {
            ...U,
            [C]: {
              runId: b.runId,
              pipelineId: v,
              stepId: b.stepId,
              approvers: b.approvers,
              requestedAt: b.at,
              message: k.message,
              requiredCount: k.requiredCount,
              recordedCount: 0
            }
          };
        });
      })
    ), m.push(
      e.subscribe("pipeline.approval.recorded", (h) => {
        const b = h, v = Q(b.runId, b.stepId);
        o((k) => {
          const U = k[v];
          if (!U) return k;
          if (b.decision === "reject") {
            const I = { ...k };
            return delete I[v], I;
          }
          const C = (U.recordedCount ?? 0) + 1, d = U.requiredCount ?? 1;
          if (C >= d) {
            const I = { ...k };
            return delete I[v], I;
          }
          return {
            ...k,
            [v]: { ...U, recordedCount: C }
          };
        });
      })
    );
    const P = e.subscribeToApprovals();
    return m.push(P), () => {
      for (const h of m) h();
    };
  }, [e]);
  const l = V(() => Object.values(r).sort(
    (m, P) => P.requestedAt.localeCompare(m.requestedAt)
  ), [r]), S = y(() => {
    g((m) => m + 1);
  }, []);
  return { approvals: l, isLoading: a, error: s, retry: S };
}
function $t() {
  const { approvals: e } = nt();
  return e;
}
class rt extends Error {
  reason;
  result;
  constructor(n, r) {
    super(n), this.name = "PatchValidationRejectedError", this.reason = n, this.result = r;
  }
}
class ve extends Error {
  status;
  body;
  constructor(n, r, o) {
    super(r), this.name = "PatchHttpError", this.status = n, this.body = o;
  }
}
function Se(e, n, r, o) {
  const t = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(n)}/breakpoint/${encodeURIComponent(r)}/patch`;
  return o ? `${t}/${encodeURIComponent(o)}` : `${t}`;
}
async function At(e, n, r, o, a) {
  const t = await fetch(Se(e, n, r), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ patch: o, ...a ? { appliedBy: a } : {} })
  });
  if (t.status === 200)
    return await t.json();
  if (t.status === 422) {
    const c = await t.json().catch(() => ({}));
    let g = "patch rejected by validator";
    throw c.result && c.result.validation && c.result.validation.ok === !1 && typeof c.result.validation.reason == "string" ? g = c.result.validation.reason : typeof c.error == "string" && (g = c.error), new rt(g, c.result);
  }
  const s = await t.text().catch(() => "");
  let i;
  try {
    i = JSON.parse(s);
  } catch {
    i = s;
  }
  throw new ve(
    t.status,
    `applyPatch HTTP ${t.status}: ${s}`,
    i
  );
}
async function kt(e, n, r, o) {
  const a = await fetch(Se(e, n, r, o), {
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
  throw new ve(
    a.status,
    `revertPatch HTTP ${a.status}: ${t}`,
    s
  );
}
async function Et(e, n, r, o) {
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
function xe(e) {
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
async function Ut(e, n, r = {}) {
  const o = xe({
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
async function Ct(e) {
  if (!e.actor && !e.pipelineId)
    throw new Error("searchAudit requires at least one of `actor` or `pipelineId`");
  const r = `/api/pipelines/audit/search${xe({
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
export {
  H as A,
  Xe as B,
  me as C,
  wt as D,
  ft as E,
  ne as F,
  It as G,
  Ke as H,
  ae as I,
  Ce as J,
  xt as K,
  pt as L,
  nt as M,
  mt as N,
  Tt as P,
  B as a,
  ht as b,
  St as c,
  $t as d,
  ve as e,
  rt as f,
  At as g,
  dt as h,
  De as i,
  Ut as j,
  he as k,
  _e as l,
  Ae as m,
  kt as n,
  Rt as o,
  Pt as p,
  vt as q,
  Et as r,
  Ct as s,
  de as t,
  tt as u,
  bt as v,
  gt as w,
  yt as x,
  lt as y,
  Fe as z
};
