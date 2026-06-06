import { createContext as ce, useState as j, useRef as J, useEffect as q, useCallback as w, useMemo as Y, useContext as H, forwardRef as ve, useId as Ue } from "react";
import { a as Ce, u as De } from "./EventStreamContext-CjzSHXy-.js";
import { jsx as F, jsxs as xe } from "react/jsx-runtime";
import { u as Oe } from "./IdentityContext-CLalsm_M.js";
import { u as ue } from "./WebSocketContext-DPGFyPeZ.js";
import { c as K } from "./cn-B6yFEsav.js";
async function wt(e, n) {
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
async function Ne(e, n, r, o, a) {
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
const je = "ws_pipeline_runs_v1:", _e = 50;
function de(e) {
  return `${je}${e}`;
}
let ye = !1;
function Me(e, n) {
  try {
    localStorage.setItem(e, n);
  } catch (r) {
    ye || (ye = !0, console.warn("[runHistory] localStorage write failed", r));
  }
}
function le(e) {
  try {
    const n = localStorage.getItem(de(e));
    if (!n) return [];
    const r = JSON.parse(n);
    return Array.isArray(r) ? r : [];
  } catch {
    return [];
  }
}
function bt(e, n) {
  return le(e).find((o) => o.id === n) ?? null;
}
function Fe(e, n) {
  const r = le(e).filter((a) => a.id !== n.id), o = [n, ...r].sort((a, t) => t.startedAt.localeCompare(a.startedAt)).slice(0, _e);
  Me(de(e), JSON.stringify(o));
}
function vt(e) {
  try {
    localStorage.removeItem(de(e));
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
async function qe(e, n) {
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
const xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getPipelineRun: qe,
  listPipelineRuns: Se
}, Symbol.toStringTag, { value: "Module" })), Pe = "ws_pipelines_v1_index", Le = "ws_pipelines_v1:";
function te(e) {
  return `${Le}${e}`;
}
let he = !1;
function pe(e, n) {
  try {
    localStorage.setItem(e, n);
  } catch (r) {
    he || (he = !0, console.warn("[pipelineStorage] localStorage write failed", r));
  }
}
function fe() {
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
  pe(Pe, JSON.stringify(e));
}
function Je(e) {
  const n = fe(), r = {
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
function Be(e) {
  const n = fe().filter((r) => r.id !== e);
  Te(n);
}
function He() {
  return fe();
}
function B(e) {
  try {
    const n = localStorage.getItem(te(e));
    return n ? JSON.parse(n) : null;
  } catch {
    return null;
  }
}
function W(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), pe(te(e.id), JSON.stringify(e)), Je(e);
}
function Ke(e) {
  pe(te(e.id), JSON.stringify(e));
}
function We(e) {
  try {
    localStorage.removeItem(te(e));
  } catch {
  }
  Be(e);
}
function St(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), t = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), c = crypto.randomUUID(), m = crypto.randomUUID(), R = crypto.randomUUID(), h = crypto.randomUUID(), p = crypto.randomUUID(), I = crypto.randomUUID(), f = { type: "trigger", triggerType: "manual" }, S = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Summarize this document",
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0.3,
    maxTokens: 1024,
    streaming: !0
  }, y = {
    type: "condition",
    expression: `context.steps.${o}.llm.tokensOut > 200`,
    label: "Long summary?"
  }, v = {
    type: "fork",
    branchCount: 2,
    branchLabels: ["post-comment", "notify-user"]
  }, x = {
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
  }, A = [
    { id: r, type: "trigger", position: { x: 40, y: 200 }, data: f },
    { id: o, type: "llm", position: { x: 320, y: 200 }, data: S },
    { id: a, type: "condition", position: { x: 620, y: 200 }, data: y },
    { id: t, type: "fork", position: { x: 900, y: 120 }, data: v },
    { id: s, type: "action", position: { x: 1180, y: 60 }, data: x },
    { id: i, type: "action", position: { x: 1180, y: 180 }, data: k },
    { id: c, type: "join", position: { x: 1480, y: 120 }, data: U },
    { id: m, type: "approval", position: { x: 1780, y: 120 }, data: C },
    { id: R, type: "action", position: { x: 2080, y: 120 }, data: d },
    { id: h, type: "action", position: { x: 900, y: 320 }, data: {
      type: "action",
      actionType: "mcp-tool",
      config: {
        tool: "send-short-summary",
        recipient: "{{context.triggeredBy.userId}}",
        message: "Short summary generated."
      },
      onError: "route-error"
    } },
    { id: p, type: "action", position: { x: 1480, y: 420 }, data: {
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
    { id: I, type: "transform", position: { x: 2380, y: 200 }, data: {
      type: "transform",
      transformType: "template",
      expression: "pipeline-complete",
      outputKey: "pipelineCompletion",
      terminal: !0
    } }
  ], E = (_, X, l, u) => ({
    id: crypto.randomUUID(),
    source: _,
    sourceHandle: X,
    target: l,
    targetHandle: u
  }), L = [
    // Happy path: trigger → llm → condition → fork → (postComment | notify) → join → approval → updateDoc → finalSink
    E(r, "out", o, "in"),
    E(o, "out", a, "in"),
    E(a, "true", t, "in"),
    E(a, "false", h, "in"),
    E(t, "branch-0", s, "in"),
    E(t, "branch-1", i, "in"),
    E(s, "out", c, "in-0"),
    E(i, "out", c, "in-1"),
    E(c, "out", m, "in"),
    E(m, "approved", R, "in"),
    // Terminal `out` paths converge on the final sink. Each leaf wires `out`
    // so DEAD_END only fires for the sink itself.
    E(R, "out", I, "in"),
    E(h, "out", I, "in"),
    // Approval rejection routes through the shared error handler. Wiring
    // `rejected` is hygiene only — there is no UNUSED_APPROVAL_BRANCH lint —
    // but it keeps the rejection path observable.
    E(m, "rejected", p, "in"),
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
    E(o, "error", p, "in"),
    E(R, "error", p, "in"),
    E(h, "error", p, "in"),
    // The error handler itself drains into the final sink on both handles
    // so it is not a dead end and its own `error` handle is wired (silencing
    // NO_ERROR_HANDLER for the error-handler node).
    E(p, "out", I, "in"),
    E(p, "error", I, "in")
  ], M = {
    id: crypto.randomUUID(),
    name: "Document Summary Pipeline (Demo)",
    description: "A showcase pipeline demonstrating LLM summarization, branching, approval, parallel actions, and a shared error handler.",
    icon: "📄",
    version: 0,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "manual" },
    nodes: A,
    edges: L,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
  return W(M), M;
}
function Pt(e, n) {
  const r = B(e);
  if (!r) return null;
  const o = /* @__PURE__ */ new Map(), a = r.nodes.map((c) => {
    const m = crypto.randomUUID();
    return o.set(c.id, m), { ...c, id: m, data: { ...c.data } };
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
  return W(i), i;
}
function Tt(e) {
  const n = B(e);
  return n ? JSON.stringify(n, null, 2) : null;
}
function G(e = "") {
  return `/api/pipelines/defs${e}`;
}
const Ve = { "Content-Type": "application/json" };
async function Xe() {
  const e = await fetch(G("/"), { credentials: "include" });
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
  const n = await fetch(G(`/${encodeURIComponent(e)}`), {
    credentials: "include"
  });
  if (n.status === 404) return null;
  if (!n.ok) throw new Error(`loadPipelineRemote failed (${n.status})`);
  return await n.json();
}
async function Re(e) {
  const n = await fetch(G(`/${encodeURIComponent(e.id)}`), {
    method: "PUT",
    headers: Ve,
    credentials: "include",
    body: JSON.stringify(e)
  });
  if (!n.ok) throw new Error(`savePipelineRemote failed (${n.status})`);
  return await n.json();
}
async function Ge(e) {
  const n = await fetch(G(`/${encodeURIComponent(e)}`), {
    method: "DELETE",
    credentials: "include"
  });
  if (!n.ok && n.status !== 404)
    throw new Error(`deletePipelineRemote failed (${n.status})`);
}
async function ze(e) {
  const n = await fetch(G(`/${encodeURIComponent(e)}/publish`), {
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
async function Rt() {
  try {
    return await Xe();
  } catch (e) {
    if (V(e)) return He();
    throw e;
  }
}
async function Ie(e) {
  try {
    const n = await Ye(e);
    return n && W(n), n ?? B(e);
  } catch (n) {
    if (V(n)) return B(e);
    throw n;
  }
}
async function oe(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), W(e);
  try {
    return await Re(e);
  } catch (n) {
    if (V(n)) return e;
    throw n;
  }
}
async function $t(e) {
  We(e);
  try {
    await Ge(e);
  } catch (n) {
    if (V(n)) return;
    throw n;
  }
}
async function Qe(e) {
  try {
    const n = await ze(e);
    return n && W(n), n;
  } catch (n) {
    if (V(n)) return null;
    throw n;
  }
}
async function Et(e) {
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
  W(o);
  try {
    await Re(o);
  } catch (a) {
    if (!V(a)) throw a;
  }
  return o;
}
const Ze = 500, we = 50;
function et(e) {
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
function Q() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
const me = ce(null);
function kt({
  pipelineId: e,
  children: n
}) {
  const [r, o] = j(null), [a, t] = j(!1), [s, i] = j(null), [c, m] = j([]), [R, h] = j([]), p = J(null);
  q(() => {
    let l = !1;
    return o(null), t(!1), i(null), m([]), h([]), Ie(e).then((u) => {
      l || (u && (u.nodes = u.nodes ?? [], u.edges = u.edges ?? []), o(u));
    }), () => {
      l = !0;
    };
  }, [e]), q(() => {
    if (!(!a || !r))
      return p.current && clearTimeout(p.current), p.current = setTimeout(() => {
        oe(r).then(() => t(!1));
      }, Ze), () => {
        p.current && (clearTimeout(p.current), p.current = null);
      };
  }, [r, a]);
  const I = w((l) => {
    m((u) => {
      const g = [
        ...u,
        { nodes: l.nodes, edges: l.edges }
      ];
      return g.length > we && g.shift(), g;
    }), h([]);
  }, []), f = w(
    (l) => {
      let u = null;
      return o((g) => {
        if (!g) return g;
        I(g);
        const $ = l(g);
        return u = $, $;
      }), t(!0), u;
    },
    [I]
  ), S = w(
    (l, u) => {
      const g = Q();
      return f(($) => ({
        ...$,
        nodes: [
          ...$.nodes,
          { id: g, type: l, position: u, data: et(l) }
        ]
      })), g;
    },
    [f]
  ), y = w(
    (l, u) => {
      f((g) => ({
        ...g,
        nodes: g.nodes.map(($) => $.id === l ? { ...$, ...u } : $)
      }));
    },
    [f]
  ), v = w(
    (l, u) => {
      f((g) => ({
        ...g,
        nodes: g.nodes.map(($) => {
          if ($.id !== l) return $;
          const O = { ...$.data, ...u };
          return { ...$, data: O };
        })
      }));
    },
    [f]
  ), x = w(
    (l) => {
      f((u) => ({
        ...u,
        nodes: u.nodes.filter((g) => g.id !== l),
        edges: u.edges.filter((g) => g.source !== l && g.target !== l)
      })), i((u) => u === l ? null : u);
    },
    [f]
  ), k = w(
    (l) => {
      const u = [];
      return f((g) => {
        const $ = new Set(l), O = /* @__PURE__ */ new Map(), z = g.nodes.filter((D) => $.has(D.id)).map((D) => {
          const re = Q();
          return O.set(D.id, re), u.push(re), {
            ...D,
            id: re,
            position: { x: D.position.x + 40, y: D.position.y + 40 },
            data: { ...D.data }
          };
        }), Ae = g.edges.filter((D) => $.has(D.source) && $.has(D.target)).map((D) => ({
          ...D,
          id: Q(),
          source: O.get(D.source) ?? D.source,
          target: O.get(D.target) ?? D.target
        }));
        return {
          ...g,
          nodes: [...g.nodes, ...z],
          edges: [...g.edges, ...Ae]
        };
      }), u;
    },
    [f]
  ), U = w(
    (l) => {
      const u = Q();
      return f((g) => ({
        ...g,
        edges: [...g.edges, { id: u, ...l }]
      })), u;
    },
    [f]
  ), C = w(
    (l) => {
      f((u) => ({
        ...u,
        edges: u.edges.filter((g) => g.id !== l)
      }));
    },
    [f]
  ), d = w(
    (l) => {
      l.length !== 0 && o((u) => {
        if (!u) return u;
        const g = new Map(l.map((O) => [O.id, O.position])), $ = {
          ...u,
          nodes: u.nodes.map((O) => {
            const z = g.get(O.id);
            return z ? { ...O, position: z } : O;
          })
        };
        return Ke($), $;
      });
    },
    []
  ), b = w(() => {
    r && (p.current && (clearTimeout(p.current), p.current = null), oe(r).then(() => t(!1)));
  }, [r]), P = w(() => {
    if (!r) return;
    p.current && (clearTimeout(p.current), p.current = null), (async () => {
      a && (await oe(r), t(!1));
      const u = await Qe(r.id);
      u && o(u);
    })();
  }, [r, a]), T = w(() => {
    Ie(e).then((l) => {
      o(l), t(!1), m([]), h([]);
    });
  }, [e]), A = w((l) => {
    const u = l.trim();
    u && (o((g) => !g || g.name === u ? g : { ...g, name: u }), t(!0));
  }, []), E = w((l) => {
    o((u) => !u || u.icon === l ? u : { ...u, icon: l }), t(!0);
  }, []), L = w((l) => {
    o((u) => {
      if (!u) return u;
      const g = u.tags ?? [];
      return g.length === l.length && g.every(($, O) => $ === l[O]) ? u : { ...u, tags: [...l] };
    }), t(!0);
  }, []), M = w(() => {
    m((l) => {
      if (l.length === 0 || !r) return l;
      const u = l[l.length - 1];
      return h((g) => [
        ...g,
        { nodes: r.nodes, edges: r.edges }
      ]), o({ ...r, nodes: u.nodes, edges: u.edges }), t(!0), l.slice(0, -1);
    });
  }, [r]), _ = w(() => {
    h((l) => {
      if (l.length === 0 || !r) return l;
      const u = l[l.length - 1];
      return m((g) => {
        const $ = [
          ...g,
          { nodes: r.nodes, edges: r.edges }
        ];
        return $.length > we && $.shift(), $;
      }), o({ ...r, nodes: u.nodes, edges: u.edges }), t(!0), l.slice(0, -1);
    });
  }, [r]), X = Y(
    () => ({
      definition: r,
      dirty: a,
      selectedNodeId: s,
      setSelectedNodeId: i,
      addNode: S,
      updateNode: y,
      updateNodeData: v,
      removeNode: x,
      duplicateNodes: k,
      addEdge: U,
      removeEdge: C,
      setPositions: d,
      save: b,
      publish: P,
      revert: T,
      undo: M,
      redo: _,
      canUndo: c.length > 0,
      canRedo: R.length > 0,
      rename: A,
      setIcon: E,
      setTags: L
    }),
    [
      r,
      a,
      s,
      S,
      y,
      v,
      x,
      k,
      U,
      C,
      d,
      b,
      P,
      T,
      M,
      _,
      c.length,
      R.length,
      A,
      E,
      L
    ]
  );
  return /* @__PURE__ */ F(me.Provider, { value: X, children: n });
}
function At() {
  const e = H(me);
  if (!e)
    throw new Error(
      "usePipelineEditor must be used within a PipelineEditorProvider"
    );
  return e;
}
function tt() {
  const { idToken: e } = Oe(), [n, r] = j(!1), [o, a] = j(null), [t, s] = j(!1), i = "";
  return { triggerRun: w(
    async (m, R, h) => {
      r(!0), a(null), s(!1);
      try {
        const p = B(m), I = {};
        R && (I.triggerPayload = R), p && (I.definition = p);
        const f = {
          "Content-Type": "application/json",
          ...e ? { Authorization: `Bearer ${e}` } : {}
        };
        h?.idempotencyKey && (f["Idempotency-Key"] = h.idempotencyKey);
        const S = await fetch(
          `${i}/api/pipelines/${encodeURIComponent(m)}/runs`,
          {
            method: "POST",
            headers: f,
            body: JSON.stringify(I)
          }
        );
        if (!S.ok) {
          const x = await S.text().catch(() => "");
          return a(
            `Trigger failed (${S.status})${x ? `: ${x}` : ""}`
          ), null;
        }
        const y = typeof S.headers?.get == "function" ? S.headers.get("X-Idempotent-Replay") : S.headers["x-idempotent-replay"] ?? null;
        return s(y === "true"), (await S.json()).runId;
      } catch (p) {
        return a(p.message), null;
      } finally {
        r(!1);
      }
    },
    [i, e]
  ), isTriggering: n, lastError: o, isReplay: t };
}
const nt = Object.freeze({
  // DC-sourced kebab form (after bridge's `:` → `.` mapping) → colon-form in-app key.
  "pipeline.run.resume-from-step": "pipeline:run:resumeFromStep",
  // hub#2223: producer-backed canonical past-tense form. Kebab-from-the-wire
  // already maps directly into the PipelineEventMap key, but keep an explicit
  // identity entry here for documentation purposes (the function below
  // collapses to the input when the alias is the same string).
  "pipeline.run.resumed-from-step": "pipeline.run.resumed-from-step"
});
function rt(e) {
  return nt[e] ?? e;
}
function Ut({
  channel: e = "pipeline:all",
  onEvent: n,
  enabled: r = !1
}) {
  const { connectionState: o, sendMessage: a, onMessage: t } = ue(), s = J(n);
  q(() => {
    s.current = n;
  }, [n]), q(() => {
    if (!r || o !== "connected") return;
    a({ service: "pipeline", action: "subscribe", channel: e });
    const i = t((c) => {
      if (c.type !== "pipeline:event") return;
      const m = c, R = m.eventType;
      if (!R) return;
      const p = {
        eventType: rt(R),
        payload: m.payload,
        seq: typeof m.seq == "number" ? m.seq : 0,
        sourceNodeId: typeof m.sourceNodeId == "string" ? m.sourceNodeId : "unknown",
        emittedAt: typeof m.emittedAt == "number" ? m.emittedAt : Date.now()
      };
      try {
        s.current(p);
      } catch (I) {
        console.error("[WebSocketEventAdapter] onEvent threw", I);
      }
    });
    return () => {
      i(), a({ service: "pipeline", action: "unsubscribe", channel: e });
    };
  }, [r, o, e, a, t]);
}
function Z() {
  const e = typeof globalThis < "u" ? globalThis.crypto : void 0;
  return e && typeof e.randomUUID == "function" ? e.randomUUID() : `ws-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function ot() {
  const { sendMessage: e } = ue(), n = w(
    (h) => e({ service: "pipeline", action: "subscribe", channel: `pipeline:run:${h}` }),
    [e]
  ), r = w(
    (h) => e({ service: "pipeline", action: "unsubscribe", channel: `pipeline:run:${h}` }),
    [e]
  ), o = w(
    () => e({ service: "pipeline", action: "subscribe", channel: "pipeline:all" }),
    [e]
  ), a = w(
    () => e({ service: "pipeline", action: "unsubscribe", channel: "pipeline:all" }),
    [e]
  ), t = w(
    () => e({ service: "pipeline", action: "subscribe", channel: "pipeline:approvals" }),
    [e]
  ), s = w(
    () => e({ service: "pipeline", action: "unsubscribe", channel: "pipeline:approvals" }),
    [e]
  ), i = w(
    (h, p = {}) => {
      const I = p.correlationId ?? Z();
      return e({
        service: "pipeline",
        action: "trigger",
        pipelineId: h,
        ...p.definition ? { definition: p.definition } : {},
        ...p.triggerPayload ? { triggerPayload: p.triggerPayload } : {},
        ...p.triggeredBy ? { triggeredBy: p.triggeredBy } : {},
        correlationId: I
      }), I;
    },
    [e]
  ), c = w(
    (h, p) => {
      const I = p ?? Z();
      return e({ service: "pipeline", action: "cancel", runId: h, correlationId: I }), I;
    },
    [e]
  ), m = w(
    (h, p, I, f = {}) => {
      const S = f.correlationId ?? Z();
      return e({
        service: "pipeline",
        action: "resolveApproval",
        runId: h,
        stepId: p,
        decision: I,
        ...f.comment ? { comment: f.comment } : {},
        ...f.decidedBy ? { decidedBy: f.decidedBy } : {},
        correlationId: S
      }), S;
    },
    [e]
  ), R = w(
    (h, p, I) => {
      const f = I ?? Z();
      return e({
        service: "pipeline",
        action: "resumeFromStep",
        runId: h,
        fromNodeId: p,
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
    resolveApproval: m,
    requestResumeFromStep: R
  };
}
function Ct(e, n = {}) {
  const { enabled: r = !0 } = n, { connectionState: o, sendMessage: a } = ue();
  q(() => {
    if (!r || !e || o !== "connected") return;
    const t = `pipeline:run:${e}`;
    return a({ service: "pipeline", action: "subscribe", channel: t }), () => {
      a({ service: "pipeline", action: "unsubscribe", channel: t });
    };
  }, [r, e, o, a]);
}
const ae = 20, ne = ce(null);
function st(e, n) {
  return e.steps[n] ?? {
    nodeId: n,
    status: "pending"
  };
}
function N(e, n, r) {
  const o = st(e, n), a = typeof r == "function" ? r(o) : { ...o, ...r };
  return { ...e, steps: { ...e.steps, [n]: a } };
}
function it(e) {
  const n = Object.values(e);
  if (n.length <= ae) return e;
  const r = n.filter(
    (i) => i.status === "running" || i.status === "pending" || i.status === "awaiting_approval" || i.status === "paused_at_breakpoint"
  ), a = n.filter(
    (i) => i.status !== "running" && i.status !== "pending" && i.status !== "awaiting_approval" && i.status !== "paused_at_breakpoint"
  ).sort((i, c) => c.startedAt.localeCompare(i.startedAt)).slice(
    0,
    Math.max(0, ae - r.length)
  ), t = [...r, ...a], s = {};
  for (const i of t) s[i.id] = i;
  return s;
}
function Dt({ children: e }) {
  const n = H(me), { triggerRun: r } = tt(), o = ot(), [a, t] = j({}), [s, i] = j(!1), c = J(/* @__PURE__ */ new Set()), m = J(null);
  q(() => {
    const d = n?.definition?.id;
    !d || m.current === d || (m.current = d, i(!0), Se(d, { limit: ae }).then((b) => {
      t((P) => {
        const T = { ...P };
        for (const A of b.runs)
          T[A.id] || (T[A.id] = A);
        return T;
      });
    }).catch((b) => {
      console.error("[PipelineRuns] Failed to load history from API", b), t((P) => {
        const T = { ...P };
        for (const A of le(d))
          T[A.id] || (T[A.id] = A);
        return T;
      });
    }).finally(() => i(!1)));
  }, [n?.definition?.id]), Ce("*", (d) => {
    const { eventType: b, payload: P } = d;
    t((T) => at(T, b, P));
  }), q(() => {
    for (const d of Object.values(a))
      if ((d.status === "completed" || d.status === "failed" || d.status === "cancelled") && !c.current.has(d.id)) {
        c.current.add(d.id);
        try {
          Fe(d.pipelineId, d);
        } catch (P) {
          console.warn("[PipelineRuns] appendRun failed", P);
        }
      }
  }, [a]);
  const R = w(
    async (d, b) => {
      const P = await r(d, b);
      if (!P)
        throw new Error("Trigger failed (REST POST did not return a runId)");
      return P;
    },
    [r]
  ), h = w(
    (d) => {
      o.cancelRun(d);
    },
    [o]
  ), p = w(
    (d, b, P, T) => {
      o.resolveApproval(d, b, P, { comment: T });
    },
    [o]
  ), I = J(a);
  q(() => {
    I.current = a;
  }, [a]);
  const f = w(
    async (d) => {
      const P = Object.values(I.current).filter((T) => T.status === "failed").filter((T) => T.steps[d]?.status === "failed").sort((T, A) => A.startedAt.localeCompare(T.startedAt))[0];
      if (!P) {
        console.warn(
          "[PipelineRuns] retryFromStep — no failed run found for node",
          d
        );
        return;
      }
      try {
        await Ne(P.pipelineId, P.id, d);
      } catch (T) {
        console.error("[PipelineRuns] retryFromNode API failed", T);
      }
    },
    []
  ), S = w(
    async (d, b, P) => {
      const T = { ...P ?? {}, __breakpoints: b };
      return R(d, T);
    },
    [R]
  ), y = w(
    (d, b, P = "continue") => {
      const E = I.current[d]?.pipelineId ?? "unknown";
      fetch(
        `/api/pipelines/${encodeURIComponent(E)}/runs/${encodeURIComponent(d)}/breakpoint/${encodeURIComponent(b)}/resolve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: P })
        }
      ).catch((L) => {
        console.error("[PipelineRuns] resolveBreakpoint API failed", L);
      });
    },
    []
  ), v = w(
    async (d, b, P, T) => {
      const L = I.current[d]?.pipelineId ?? "unknown", M = `/api/pipelines/${encodeURIComponent(L)}/runs/${encodeURIComponent(d)}/breakpoint/${encodeURIComponent(b)}/patch`, _ = await fetch(M, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patch: P, ...T ? { appliedBy: T } : {} })
      });
      if (_.status === 200)
        return await _.json();
      if (_.status === 422) {
        const l = await _.json().catch(() => ({}));
        return l.result ? l.result : {
          patchId: "",
          before: {},
          after: {},
          validation: { ok: !1, reason: l.error ?? "patch rejected" }
        };
      }
      const X = await _.text().catch(() => "");
      throw new Error(`applyContextPatch HTTP ${_.status}: ${X}`);
    },
    []
  ), x = w(
    async (d, b, P) => {
      const E = I.current[d]?.pipelineId ?? "unknown", L = `/api/pipelines/${encodeURIComponent(E)}/runs/${encodeURIComponent(d)}/breakpoint/${encodeURIComponent(b)}/patch/${encodeURIComponent(P)}`, M = await fetch(L, { method: "DELETE" });
      if (M.status !== 204) {
        const _ = await M.text().catch(() => "");
        throw new Error(`revertContextPatch HTTP ${M.status}: ${_}`);
      }
    },
    []
  ), k = w((d) => {
    t((b) => {
      const P = b[d.id];
      if (P && P.status === d.status) {
        const T = Object.keys(P.steps).length, A = Object.keys(d.steps).length;
        if (T >= A) return b;
      }
      return { ...b, [d.id]: d };
    });
  }, []), U = Y(
    () => Object.values(a).filter(
      (d) => d.status === "running" || d.status === "pending" || d.status === "awaiting_approval" || d.status === "paused_at_breakpoint"
    ).map((d) => d.id),
    [a]
  ), C = Y(
    () => ({
      runs: a,
      activeRunIds: U,
      triggerRun: R,
      triggerDebugRun: S,
      cancelRun: h,
      resolveApproval: p,
      resolveBreakpoint: y,
      applyContextPatch: v,
      revertContextPatch: x,
      retryFromStep: f,
      ingestRun: k
    }),
    [
      a,
      U,
      R,
      S,
      h,
      p,
      y,
      v,
      x,
      f,
      k
    ]
  );
  return /* @__PURE__ */ F(ne.Provider, { value: C, children: e });
}
function at(e, n, r) {
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
      return it({ ...e, [t.runId]: s });
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
      const i = N(s, t.stepId, (c) => ({
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
      const i = N(s, t.stepId, (c) => ({
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
      const i = N(s, t.stepId, (c) => ({
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
      const i = N(s, t.stepId, (c) => ({
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
      const i = N(s, t.stepId, (c) => ({
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
        [t.runId]: N(s, t.stepId, (i) => ({
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
        [t.runId]: N(s, t.stepId, (i) => {
          const c = Date.parse(t.openedAt), m = {
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
          return m.llm._streamOpenedAtMs = Number.isFinite(c) ? c : Date.now(), m;
        })
      } : e;
    }
    case "pipeline.llm.token": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: N(s, t.stepId, (i) => {
          const c = i.llm?.tokensOut ?? 0, m = c === 0, R = i.llm?._streamOpenedAtMs, h = Date.parse(t.at), p = m && typeof R == "number" && Number.isFinite(h) ? Math.max(0, h - R) : i.llm?.firstTokenLatencyMs;
          return {
            ...i,
            llm: {
              prompt: i.llm?.prompt ?? "",
              response: (i.llm?.response ?? "") + t.token,
              tokensIn: i.llm?.tokensIn ?? 0,
              tokensOut: c + 1,
              streamOpened: !1,
              ...p !== void 0 ? { firstTokenLatencyMs: p } : {}
            }
          };
        })
      } : e;
    }
    case "pipeline.llm.response": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: N(s, t.stepId, (i) => ({
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
      const i = N(s, t.stepId, (c) => ({
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
        [t.runId]: N(s, t.stepId, (m) => ({
          ...m,
          patches: [...m.patches ?? [], c]
        }))
      };
    }
    case "pipeline.step.context.patch-reverted": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: N(s, t.stepId, (i) => ({
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
      const i = N(s, t.stepId, (c) => ({
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
        [t.runId]: N(s, t.stepId, (c) => ({
          ...c,
          approvals: [...c.approvals ?? [], i]
        }))
      };
    }
    default:
      return e;
  }
}
function ct() {
  const e = H(ne);
  if (!e)
    throw new Error(
      "usePipelineRuns must be used within a PipelineRunsProvider"
    );
  return e;
}
function Ot() {
  return H(ne)?.retryFromStep ?? (async () => {
  });
}
function Nt(e) {
  const n = H(ne);
  return Y(() => {
    if (!n) return null;
    let r = null, o = "";
    for (const a of Object.values(n.runs)) {
      const t = a.steps[e];
      t && a.startedAt > o && (r = t, o = a.startedAt);
    }
    return r;
  }, [n, e]);
}
function ee(e, n) {
  return `${e}::${n}`;
}
function se(e, n) {
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
function ut() {
  const e = De(), n = ct(), [r, o] = j(
    () => {
      const f = {};
      for (const S in n.runs) {
        const y = n.runs[S];
        if (y.status === "awaiting_approval")
          for (const v in y.steps) {
            const x = y.steps[v];
            if (x.status !== "awaiting") continue;
            const k = se(y.pipelineId, v), C = B(y.pipelineId)?.nodes.find((b) => b.id === v), d = C && C.data.type === "approval" ? C.data.approvers : [];
            f[ee(S, v)] = {
              runId: S,
              pipelineId: y.pipelineId,
              stepId: v,
              approvers: d,
              requestedAt: x.startedAt ?? (/* @__PURE__ */ new Date(0)).toISOString(),
              message: k.message,
              requiredCount: k.requiredCount,
              recordedCount: x.approvals?.filter((b) => b.decision === "approve").length ?? 0
            };
          }
      }
      return f;
    }
  ), [a, t] = j(!0), [s, i] = j(null), [c, m] = j(0), R = J(n.runs);
  q(() => {
    R.current = n.runs;
  }, [n.runs]);
  const h = J(/* @__PURE__ */ new Map());
  q(() => {
    let f = !1;
    t(!0), i(null);
    const S = async () => {
      try {
        const y = await fetch("/api/pipelines/approvals", {
          credentials: "same-origin"
        });
        if (y.status === 404) return null;
        if (!y.ok)
          throw new Error(`Dashboard fetch failed: ${y.status}`);
        return { pendingApprovals: (await y.json()).approvals ?? [] };
      } catch (y) {
        if (y.message?.includes("Dashboard fetch failed"))
          throw y;
        return null;
      }
    };
    return (async () => {
      try {
        const y = await S();
        if (f) return;
        if (y?.pendingApprovals) {
          const v = {};
          for (const x of y.pendingApprovals) {
            const k = se(x.pipelineId, x.stepId);
            v[ee(x.runId, x.stepId)] = {
              runId: x.runId,
              pipelineId: x.pipelineId,
              stepId: x.stepId,
              approvers: x.approvers ?? [],
              requestedAt: x.requestedAt,
              message: x.message ?? k.message,
              requiredCount: x.requiredCount ?? k.requiredCount,
              recordedCount: x.recordedCount ?? 0
            };
          }
          o(v);
        }
        t(!1);
      } catch (y) {
        if (f) return;
        console.error(
          "[usePendingApprovals] /api/observability/dashboard?include=pendingApprovals failed:",
          y
        ), i(y.message ?? "Failed to load pending approvals"), t(!1);
      }
    })(), () => {
      f = !0;
    };
  }, [c]), q(() => {
    const f = [];
    f.push(
      e.subscribe("pipeline.run.started", (y) => {
        const v = y;
        h.current.set(v.runId, v.pipelineId);
      })
    ), f.push(
      e.subscribe("pipeline.approval.requested", (y) => {
        const v = y, x = h.current.get(v.runId) ?? R.current[v.runId]?.pipelineId ?? "", k = se(x, v.stepId);
        o((U) => {
          const C = ee(v.runId, v.stepId);
          return U[C] ? U : {
            ...U,
            [C]: {
              runId: v.runId,
              pipelineId: x,
              stepId: v.stepId,
              approvers: v.approvers,
              requestedAt: v.at,
              message: k.message,
              requiredCount: k.requiredCount,
              recordedCount: 0
            }
          };
        });
      })
    ), f.push(
      e.subscribe("pipeline.approval.recorded", (y) => {
        const v = y, x = ee(v.runId, v.stepId);
        o((k) => {
          const U = k[x];
          if (!U) return k;
          if (v.decision === "reject") {
            const b = { ...k };
            return delete b[x], b;
          }
          const C = (U.recordedCount ?? 0) + 1, d = U.requiredCount ?? 1;
          if (C >= d) {
            const b = { ...k };
            return delete b[x], b;
          }
          return {
            ...k,
            [x]: { ...U, recordedCount: C }
          };
        });
      })
    );
    const S = e.subscribeToApprovals();
    return f.push(S), () => {
      for (const y of f) y();
    };
  }, [e]);
  const p = Y(() => Object.values(r).sort(
    (f, S) => S.requestedAt.localeCompare(f.requestedAt)
  ), [r]), I = w(() => {
    m((f) => f + 1);
  }, []);
  return { approvals: p, isLoading: a, error: s, retry: I };
}
function jt() {
  const { approvals: e } = ut();
  return e;
}
class dt extends Error {
  reason;
  result;
  constructor(n, r) {
    super(n), this.name = "PatchValidationRejectedError", this.reason = n, this.result = r;
  }
}
class $e extends Error {
  status;
  body;
  constructor(n, r, o) {
    super(r), this.name = "PatchHttpError", this.status = n, this.body = o;
  }
}
function Ee(e, n, r, o) {
  const t = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(n)}/breakpoint/${encodeURIComponent(r)}/patch`;
  return o ? `${t}/${encodeURIComponent(o)}` : `${t}`;
}
async function _t(e, n, r, o, a) {
  const t = await fetch(Ee(e, n, r), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ patch: o, ...a ? { appliedBy: a } : {} })
  });
  if (t.status === 200)
    return await t.json();
  if (t.status === 422) {
    const c = await t.json().catch(() => ({}));
    let m = "patch rejected by validator";
    throw c.result && c.result.validation && c.result.validation.ok === !1 && typeof c.result.validation.reason == "string" ? m = c.result.validation.reason : typeof c.error == "string" && (m = c.error), new dt(m, c.result);
  }
  const s = await t.text().catch(() => "");
  let i;
  try {
    i = JSON.parse(s);
  } catch {
    i = s;
  }
  throw new $e(
    t.status,
    `applyPatch HTTP ${t.status}: ${s}`,
    i
  );
}
async function Mt(e, n, r, o) {
  const a = await fetch(Ee(e, n, r, o), {
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
  throw new $e(
    a.status,
    `revertPatch HTTP ${a.status}: ${t}`,
    s
  );
}
async function Ft(e, n, r, o) {
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
function ke(e) {
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
async function qt(e, n, r = {}) {
  const o = ke({
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
async function Lt(e) {
  if (!e.actor && !e.pipelineId)
    throw new Error("searchAudit requires at least one of `actor` or `pipelineId`");
  const r = `/api/pipelines/audit/search${ke({
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
const ie = {
  sm: "h-7 px-2 text-[12px]",
  md: "h-9 px-2.5 text-[13px]"
}, be = {
  sm: "px-1.5",
  md: "px-2"
}, lt = ve(function({
  type: n = "text",
  size: r = "md",
  prefix: o,
  suffix: a,
  invalid: t = !1,
  disabled: s = !1,
  mono: i = !1,
  className: c,
  "data-testid": m,
  ...R
}, h) {
  const p = o != null, I = a != null;
  return !p && !I ? /* @__PURE__ */ F(
    "input",
    {
      ref: h,
      type: n,
      disabled: s,
      "data-testid": m,
      className: K(
        "w-full rounded-md border bg-slate-50 font-inherit text-slate-900",
        "outline-none transition-colors duration-150",
        "placeholder:text-slate-400",
        "focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100",
        t ? "border-red-500 focus:border-red-500 focus:ring-red-500/40" : "border-slate-300",
        i && "font-mono",
        ie[r],
        c
      ),
      ...R
    }
  ) : /* @__PURE__ */ xe(
    "div",
    {
      className: K(
        "relative flex w-full items-center rounded-md border bg-slate-50",
        "transition-colors duration-150",
        "focus-within:bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/40",
        t ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/40" : "border-slate-300",
        s && "opacity-50 cursor-not-allowed bg-slate-100"
      ),
      children: [
        p && /* @__PURE__ */ F(
          "span",
          {
            "aria-hidden": "true",
            className: K(
              "flex shrink-0 items-center text-slate-400",
              be[r]
            ),
            children: o
          }
        ),
        /* @__PURE__ */ F(
          "input",
          {
            ref: h,
            type: n,
            disabled: s,
            "data-testid": m,
            className: K(
              "flex-1 min-w-0 bg-transparent font-inherit text-slate-900 outline-none",
              "placeholder:text-slate-400",
              "disabled:cursor-not-allowed",
              p ? "pl-0" : ie[r].split(" ")[1],
              I ? "pr-0" : ie[r].split(" ")[2],
              r === "sm" ? "h-7 text-[12px]" : "h-9 text-[13px]",
              i && "font-mono",
              c
            ),
            ...R
          }
        ),
        I && /* @__PURE__ */ F(
          "span",
          {
            "aria-hidden": "true",
            className: K(
              "flex shrink-0 items-center text-slate-400",
              be[r]
            ),
            children: a
          }
        )
      ]
    }
  );
}), pt = {
  sm: "px-1.5 py-0.5 text-[11px]",
  md: "px-2 py-0.5 text-[12px]"
}, Jt = ve(
  function({
    value: n,
    onChange: r,
    samples: o,
    placeholder: a = "$.path.to.value",
    invalid: t = !1,
    errorMessage: s,
    disabled: i = !1,
    size: c = "md",
    enforcePrefix: m = !1,
    "data-testid": R
  }, h) {
    const p = Ue(), I = m && n.length > 0 && !n.startsWith("$.") ? 'JSONPath must start with "$."' : void 0, f = t || I != null, S = s ?? I;
    return /* @__PURE__ */ xe("div", { className: "flex flex-col gap-1 w-full", children: [
      /* @__PURE__ */ F(
        lt,
        {
          ref: h,
          type: "text",
          mono: !0,
          size: c,
          value: n,
          onChange: (y) => r(y.target.value),
          placeholder: a,
          invalid: f,
          disabled: i,
          "data-testid": R,
          "aria-describedby": S ? p : void 0,
          "aria-invalid": f || void 0
        }
      ),
      o && o.length > 0 && /* @__PURE__ */ F("div", { className: "flex flex-wrap gap-1", children: o.map((y) => /* @__PURE__ */ F(
        "button",
        {
          type: "button",
          disabled: i,
          onClick: () => r(y.value),
          className: K(
            "rounded border border-slate-200 bg-slate-100 font-mono text-slate-600",
            "transition-colors duration-100",
            "hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/40",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            pt[c]
          ),
          children: y.label
        },
        y.value
      )) }),
      S && /* @__PURE__ */ F(
        "p",
        {
          id: p,
          role: "alert",
          className: "text-[11px] text-red-600 leading-4",
          children: S
        }
      )
    ] });
  }
), ge = ce(null);
function Bt({
  services: e,
  children: n
}) {
  return /* @__PURE__ */ F(ge.Provider, { value: e, children: n });
}
function Ht() {
  const e = H(ge);
  if (!e)
    throw new Error(
      "useImageUrl must be called inside <PipelineEditorServicesProvider>. The host editor (e.g. wsg PipelineEditorPage) is responsible for mounting it with its own getImageUrl implementation."
    );
  return e.getImageUrl;
}
function Kt() {
  const e = H(ge);
  if (!e)
    throw new Error(
      "usePipelineEditorServices must be called inside <PipelineEditorServicesProvider>."
    );
  return e;
}
export {
  Tt as A,
  vt as B,
  We as C,
  W as D,
  tt as E,
  Ie as F,
  Et as G,
  St as H,
  lt as I,
  Jt as J,
  oe as K,
  $t as L,
  Qe as M,
  le as N,
  Fe as O,
  Dt as P,
  Ct as Q,
  bt as R,
  ut as S,
  xt as T,
  B as a,
  Rt as b,
  Ut as c,
  jt as d,
  $e as e,
  dt as f,
  Bt as g,
  _t as h,
  wt as i,
  qe as j,
  qt as k,
  He as l,
  Se as m,
  Ne as n,
  Mt as o,
  Ht as p,
  Kt as q,
  Ft as r,
  Lt as s,
  Nt as t,
  ct as u,
  Ot as v,
  At as w,
  me as x,
  kt as y,
  Pt as z
};
