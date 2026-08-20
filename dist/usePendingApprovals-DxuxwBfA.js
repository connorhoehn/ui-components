import { jsx as S, jsxs as V, Fragment as Oe } from "react/jsx-runtime";
import { createContext as oe, useContext as L, useState as O, useRef as W, useEffect as _, useCallback as v, useMemo as B, forwardRef as z, useId as pe } from "react";
import { c as U } from "./cn-B6yFEsav.js";
import { b as je } from "./ToastProvider-D3MHbP-u.js";
import { a as _e, u as Me } from "./EventStreamContext-CjzSHXy-.js";
import { u as Fe } from "./IdentityContext-CLalsm_M.js";
import { u as me } from "./WebSocketContext-DPGFyPeZ.js";
const Pe = "ws_pipelines_v1_index", qe = "ws_pipelines_v1:";
function se(e) {
  return `${qe}${e}`;
}
let Ie = !1;
function fe(e, n) {
  try {
    localStorage.setItem(e, n);
  } catch (r) {
    Ie || (Ie = !0, console.warn("[pipelineStorage] localStorage write failed", r));
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
function Le(e) {
  const n = ge(), r = {
    id: e.id,
    name: e.name,
    status: e.status,
    updatedAt: e.updatedAt
  }, o = n.findIndex((s) => s.id === e.id);
  if (o === -1)
    e.icon && (r.icon = e.icon), e.tags && e.tags.length > 0 && (r.tags = [...e.tags]), n.push(r);
  else {
    const s = e.icon ?? n[o].icon, t = e.tags ?? n[o].tags, i = { ...r };
    s && (i.icon = s), t && t.length > 0 && (i.tags = [...t]), n[o] = i;
  }
  Te(n);
}
function He(e) {
  const n = ge().filter((r) => r.id !== e);
  Te(n);
}
function Be() {
  return ge();
}
function K(e) {
  try {
    const n = localStorage.getItem(se(e));
    return n ? JSON.parse(n) : null;
  } catch {
    return null;
  }
}
function X(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), fe(se(e.id), JSON.stringify(e)), Le(e);
}
function Je(e) {
  fe(se(e.id), JSON.stringify(e));
}
function Ve(e) {
  try {
    localStorage.removeItem(se(e));
  } catch {
  }
  He(e);
}
function Nt(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), t = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), c = crypto.randomUUID(), d = crypto.randomUUID(), h = crypto.randomUUID(), m = crypto.randomUUID(), u = crypto.randomUUID(), I = crypto.randomUUID(), f = { type: "trigger", triggerType: "manual" }, T = {
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
  }, w = {
    type: "fork",
    branchCount: 2,
    branchLabels: ["post-comment", "notify-user"]
  }, x = {
    type: "action",
    actionType: "post-comment",
    config: { body: "{{context.steps." + o + ".response}}" },
    onError: "route-error"
  }, $ = {
    type: "action",
    actionType: "notify",
    config: {
      recipient: "{{context.triggeredBy.userId}}",
      message: "Your document summary is ready for review."
    },
    onError: "route-error"
  }, k = {
    type: "join",
    mode: "all",
    mergeStrategy: "deep-merge"
  }, D = {
    type: "approval",
    approvers: [{ type: "user", value: "demo-user" }],
    requiredCount: 1,
    timeoutMs: 1440 * 60 * 1e3,
    timeoutAction: "reject",
    message: "Please review before posting."
  }, p = {
    type: "action",
    actionType: "update-document",
    config: { summary: "{{context.steps." + o + ".response}}" },
    onError: "route-error"
  }, A = [
    { id: r, type: "trigger", position: { x: 40, y: 200 }, data: f },
    { id: o, type: "llm", position: { x: 320, y: 200 }, data: T },
    { id: s, type: "condition", position: { x: 620, y: 200 }, data: y },
    { id: t, type: "fork", position: { x: 900, y: 120 }, data: w },
    { id: i, type: "action", position: { x: 1180, y: 60 }, data: x },
    { id: a, type: "action", position: { x: 1180, y: 180 }, data: $ },
    { id: c, type: "join", position: { x: 1480, y: 120 }, data: k },
    { id: d, type: "approval", position: { x: 1780, y: 120 }, data: D },
    { id: h, type: "action", position: { x: 2080, y: 120 }, data: p },
    { id: m, type: "action", position: { x: 900, y: 320 }, data: {
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
    { id: I, type: "transform", position: { x: 2380, y: 200 }, data: {
      type: "transform",
      transformType: "template",
      expression: "pipeline-complete",
      outputKey: "pipelineCompletion",
      terminal: !0
    } }
  ], C = (q, Q, g, l) => ({
    id: crypto.randomUUID(),
    source: q,
    sourceHandle: Q,
    target: g,
    targetHandle: l
  }), J = [
    // Happy path: trigger → llm → condition → fork → (postComment | notify) → join → approval → updateDoc → finalSink
    C(r, "out", o, "in"),
    C(o, "out", s, "in"),
    C(s, "true", t, "in"),
    C(s, "false", m, "in"),
    C(t, "branch-0", i, "in"),
    C(t, "branch-1", a, "in"),
    C(i, "out", c, "in-0"),
    C(a, "out", c, "in-1"),
    C(c, "out", d, "in"),
    C(d, "approved", h, "in"),
    // Terminal `out` paths converge on the final sink. Each leaf wires `out`
    // so DEAD_END only fires for the sink itself.
    C(h, "out", I, "in"),
    C(m, "out", I, "in"),
    // Approval rejection routes through the shared error handler. Wiring
    // `rejected` is hygiene only — there is no UNUSED_APPROVAL_BRANCH lint —
    // but it keeps the rejection path observable.
    C(d, "rejected", u, "in"),
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
    C(o, "error", u, "in"),
    C(h, "error", u, "in"),
    C(m, "error", u, "in"),
    // The error handler itself drains into the final sink on both handles
    // so it is not a dead end and its own `error` handle is wired (silencing
    // NO_ERROR_HANDLER for the error-handler node).
    C(u, "out", I, "in"),
    C(u, "error", I, "in")
  ], H = {
    id: crypto.randomUUID(),
    name: "Document Summary Pipeline (Demo)",
    description: "A showcase pipeline demonstrating LLM summarization, branching, approval, parallel actions, and a shared error handler.",
    icon: "📄",
    version: 0,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "manual" },
    nodes: A,
    edges: J,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
  return X(H), H;
}
function Ct(e, n) {
  const r = K(e);
  if (!r) return null;
  const o = /* @__PURE__ */ new Map(), s = r.nodes.map((c) => {
    const d = crypto.randomUUID();
    return o.set(c.id, d), { ...c, id: d, data: { ...c.data } };
  }), t = r.edges.map((c) => ({
    ...c,
    id: crypto.randomUUID(),
    source: o.get(c.source) ?? c.source,
    target: o.get(c.target) ?? c.target
  })), i = (/* @__PURE__ */ new Date()).toISOString(), a = {
    ...r,
    id: crypto.randomUUID(),
    name: n ?? `${r.name} (copy)`,
    // Spread preserves tags from the source; defensive-copy the array so
    // later mutation of the clone can't alias the source's tag list.
    tags: r.tags ? [...r.tags] : void 0,
    version: 0,
    status: "draft",
    publishedVersion: void 0,
    nodes: s,
    edges: t,
    createdAt: i,
    updatedAt: i
  };
  return X(a), a;
}
function Ut(e) {
  const n = K(e);
  return n ? JSON.stringify(n, null, 2) : null;
}
function Z(e = "") {
  return `/api/pipelines/defs${e}`;
}
const We = { "Content-Type": "application/json" };
async function Ke() {
  const e = await fetch(Z("/"), { credentials: "include" });
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
async function ze(e) {
  const n = await fetch(Z(`/${encodeURIComponent(e)}`), {
    credentials: "include"
  });
  if (n.status === 404) return null;
  if (!n.ok) throw new Error(`loadPipelineRemote failed (${n.status})`);
  return await n.json();
}
async function $e(e) {
  const n = await fetch(Z(`/${encodeURIComponent(e.id)}`), {
    method: "PUT",
    headers: We,
    credentials: "include",
    body: JSON.stringify(e)
  });
  if (!n.ok) throw new Error(`savePipelineRemote failed (${n.status})`);
  return await n.json();
}
async function Ye(e) {
  const n = await fetch(Z(`/${encodeURIComponent(e)}`), {
    method: "DELETE",
    credentials: "include"
  });
  if (!n.ok && n.status !== 404)
    throw new Error(`deletePipelineRemote failed (${n.status})`);
}
async function Xe(e) {
  const n = await fetch(Z(`/${encodeURIComponent(e)}/publish`), {
    method: "POST",
    credentials: "include"
  });
  if (n.status === 404) return null;
  if (!n.ok) throw new Error(`publishPipelineRemote failed (${n.status})`);
  return await n.json();
}
function G(e) {
  if (e instanceof SyntaxError) return !0;
  const n = e.message || String(e);
  return n.includes("NetworkError") || n.includes("Failed to fetch") || n.includes("network") || n.includes("ECONNREFUSED") || n.includes("Unexpected token") || n.includes("not valid JSON") || n.includes("500") || n.includes("502") || n.includes("503") || n.includes("504");
}
async function At() {
  try {
    return await Ke();
  } catch (e) {
    if (G(e)) return Be();
    throw e;
  }
}
async function ve(e) {
  try {
    const n = await ze(e);
    return n && X(n), n ?? K(e);
  } catch (n) {
    if (G(n)) return K(e);
    throw n;
  }
}
async function ce(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), X(e);
  try {
    return await $e(e);
  } catch (n) {
    if (G(n)) return e;
    throw n;
  }
}
async function Dt(e) {
  Ve(e);
  try {
    await Ye(e);
  } catch (n) {
    if (G(n)) return;
    throw n;
  }
}
async function Ge(e) {
  try {
    const n = await Xe(e);
    return n && X(n), n;
  } catch (n) {
    if (G(n)) return null;
    throw n;
  }
}
async function Ot(e) {
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
  X(o);
  try {
    await $e(o);
  } catch (s) {
    if (!G(s)) throw s;
  }
  return o;
}
const Qe = 500, xe = 50;
function Ze(e) {
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
    case "image:dimensions":
      return { type: "image:dimensions", maxEdge: 1024 };
    case "image:upscale":
      return { type: "image:upscale", maxEdge: 1024 };
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
function te() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
const he = oe(null);
function jt({
  pipelineId: e,
  children: n
}) {
  const [r, o] = O(null), [s, t] = O(!1), [i, a] = O(null), [c, d] = O([]), [h, m] = O([]), u = W(null);
  _(() => {
    let g = !1;
    return o(null), t(!1), a(null), d([]), m([]), ve(e).then((l) => {
      g || (l && (l.nodes = l.nodes ?? [], l.edges = l.edges ?? []), o(l));
    }), () => {
      g = !0;
    };
  }, [e]), _(() => {
    if (!(!s || !r))
      return u.current && clearTimeout(u.current), u.current = setTimeout(() => {
        ce(r).then(() => t(!1));
      }, Qe), () => {
        u.current && (clearTimeout(u.current), u.current = null);
      };
  }, [r, s]);
  const I = v((g) => {
    d((l) => {
      const b = [
        ...l,
        { nodes: g.nodes, edges: g.edges }
      ];
      return b.length > xe && b.shift(), b;
    }), m([]);
  }, []), f = v(
    (g) => {
      let l = null;
      return o((b) => {
        if (!b) return b;
        I(b);
        const N = g(b);
        return l = N, N;
      }), t(!0), l;
    },
    [I]
  ), T = v(
    (g, l) => {
      const b = te();
      return f((N) => ({
        ...N,
        nodes: [
          ...N.nodes,
          { id: b, type: g, position: l, data: Ze(g) }
        ]
      })), b;
    },
    [f]
  ), y = v(
    (g, l) => {
      f((b) => ({
        ...b,
        nodes: b.nodes.map((N) => N.id === g ? { ...N, ...l } : N)
      }));
    },
    [f]
  ), w = v(
    (g, l) => {
      f((b) => ({
        ...b,
        nodes: b.nodes.map((N) => {
          if (N.id !== g) return N;
          const M = { ...N.data, ...l };
          return { ...N, data: M };
        })
      }));
    },
    [f]
  ), x = v(
    (g) => {
      f((l) => ({
        ...l,
        nodes: l.nodes.filter((b) => b.id !== g),
        edges: l.edges.filter((b) => b.source !== g && b.target !== g)
      })), a((l) => l === g ? null : l);
    },
    [f]
  ), $ = v(
    (g) => {
      const l = [];
      return f((b) => {
        const N = new Set(g), M = /* @__PURE__ */ new Map(), ee = b.nodes.filter((j) => N.has(j.id)).map((j) => {
          const ae = te();
          return M.set(j.id, ae), l.push(ae), {
            ...j,
            id: ae,
            position: { x: j.position.x + 40, y: j.position.y + 40 },
            data: { ...j.data }
          };
        }), De = b.edges.filter((j) => N.has(j.source) && N.has(j.target)).map((j) => ({
          ...j,
          id: te(),
          source: M.get(j.source) ?? j.source,
          target: M.get(j.target) ?? j.target
        }));
        return {
          ...b,
          nodes: [...b.nodes, ...ee],
          edges: [...b.edges, ...De]
        };
      }), l;
    },
    [f]
  ), k = v(
    (g) => {
      const l = te();
      return f((b) => ({
        ...b,
        edges: [...b.edges, { id: l, ...g }]
      })), l;
    },
    [f]
  ), D = v(
    (g) => {
      f((l) => ({
        ...l,
        edges: l.edges.filter((b) => b.id !== g)
      }));
    },
    [f]
  ), p = v(
    (g) => {
      g.length !== 0 && o((l) => {
        if (!l) return l;
        const b = new Map(g.map((M) => [M.id, M.position])), N = {
          ...l,
          nodes: l.nodes.map((M) => {
            const ee = b.get(M.id);
            return ee ? { ...M, position: ee } : M;
          })
        };
        return Je(N), N;
      });
    },
    []
  ), P = v(() => {
    r && (u.current && (clearTimeout(u.current), u.current = null), ce(r).then(() => t(!1)));
  }, [r]), E = v(() => {
    if (!r) return;
    u.current && (clearTimeout(u.current), u.current = null), (async () => {
      s && (await ce(r), t(!1));
      const l = await Ge(r.id);
      l && o(l);
    })();
  }, [r, s]), R = v(() => {
    ve(e).then((g) => {
      o(g), t(!1), d([]), m([]);
    });
  }, [e]), A = v((g) => {
    const l = g.trim();
    l && (o((b) => !b || b.name === l ? b : { ...b, name: l }), t(!0));
  }, []), C = v((g) => {
    o((l) => !l || l.icon === g ? l : { ...l, icon: g }), t(!0);
  }, []), J = v((g) => {
    o((l) => {
      if (!l) return l;
      const b = l.tags ?? [];
      return b.length === g.length && b.every((N, M) => N === g[M]) ? l : { ...l, tags: [...g] };
    }), t(!0);
  }, []), H = v(() => {
    d((g) => {
      if (g.length === 0 || !r) return g;
      const l = g[g.length - 1];
      return m((b) => [
        ...b,
        { nodes: r.nodes, edges: r.edges }
      ]), o({ ...r, nodes: l.nodes, edges: l.edges }), t(!0), g.slice(0, -1);
    });
  }, [r]), q = v(() => {
    m((g) => {
      if (g.length === 0 || !r) return g;
      const l = g[g.length - 1];
      return d((b) => {
        const N = [
          ...b,
          { nodes: r.nodes, edges: r.edges }
        ];
        return N.length > xe && N.shift(), N;
      }), o({ ...r, nodes: l.nodes, edges: l.edges }), t(!0), g.slice(0, -1);
    });
  }, [r]), Q = B(
    () => ({
      definition: r,
      dirty: s,
      selectedNodeId: i,
      setSelectedNodeId: a,
      addNode: T,
      updateNode: y,
      updateNodeData: w,
      removeNode: x,
      duplicateNodes: $,
      addEdge: k,
      removeEdge: D,
      setPositions: p,
      save: P,
      publish: E,
      revert: R,
      undo: H,
      redo: q,
      canUndo: c.length > 0,
      canRedo: h.length > 0,
      rename: A,
      setIcon: C,
      setTags: J
    }),
    [
      r,
      s,
      i,
      T,
      y,
      w,
      x,
      $,
      k,
      D,
      p,
      P,
      E,
      R,
      H,
      q,
      c.length,
      h.length,
      A,
      C,
      J
    ]
  );
  return /* @__PURE__ */ S(he.Provider, { value: Q, children: n });
}
function _t() {
  const e = L(he);
  if (!e)
    throw new Error(
      "usePipelineEditor must be used within a PipelineEditorProvider"
    );
  return e;
}
async function Mt(e, n) {
  const r = `/api/pipelines/${e}/runs/${n}/force-fail`, o = await fetch(r, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });
  if (!o.ok) {
    const s = await o.text();
    throw new Error(`Force-fail failed: ${o.status} ${s}`);
  }
  return o.json();
}
async function et(e, n, r, o, s) {
  const t = `/api/pipelines/${e}/runs/${n}/retry/${r}`, i = await fetch(t, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: o, ...s ? { snapshotInput: s } : {} })
  });
  if (!i.ok) {
    const a = await i.text();
    throw new Error(`Failed to retry from node ${r}: ${i.status} ${a}`);
  }
  return i.json();
}
const tt = "ws_pipeline_runs_v1:", nt = 50;
function ye(e) {
  return `${tt}${e}`;
}
let we = !1;
function rt(e, n) {
  try {
    localStorage.setItem(e, n);
  } catch (r) {
    we || (we = !0, console.warn("[runHistory] localStorage write failed", r));
  }
}
function be(e) {
  try {
    const n = localStorage.getItem(ye(e));
    if (!n) return [];
    const r = JSON.parse(n);
    return Array.isArray(r) ? r : [];
  } catch {
    return [];
  }
}
function Ft(e, n) {
  return be(e).find((o) => o.id === n) ?? null;
}
function ot(e, n) {
  const r = be(e).filter((s) => s.id !== n.id), o = [n, ...r].sort((s, t) => t.startedAt.localeCompare(s.startedAt)).slice(0, nt);
  rt(ye(e), JSON.stringify(o));
}
function qt(e) {
  try {
    localStorage.removeItem(ye(e));
  } catch {
  }
}
async function ke(e, n) {
  const r = new URLSearchParams();
  n?.limit && r.set("limit", String(n.limit)), n?.cursor && r.set("cursor", n.cursor);
  const o = `/api/pipelines/${e}/runs${r.toString() ? `?${r}` : ""}`;
  try {
    const s = await fetch(o, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
      // Send cookies for auth
    });
    if (!s.ok)
      throw new Error(`Failed to list runs: ${s.status} ${s.statusText}`);
    const t = await s.json();
    return Array.isArray(t.runs) && (t.runs = t.runs.map((i) => ({
      ...i,
      id: i.id ?? i.runId
    })).sort((i, a) => {
      const c = i.startedAt ? new Date(i.startedAt).getTime() : 0;
      return (a.startedAt ? new Date(a.startedAt).getTime() : 0) - c;
    })), t;
  } catch (s) {
    return console.error("[pipelineRuns] Failed to fetch from API:", s), { runs: [] };
  }
}
async function st(e, n) {
  const r = `/api/v2/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(n)}`;
  try {
    const o = await fetch(r, {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    if (o.status === 404) return null;
    if (!o.ok)
      throw new Error(`Failed to get run: ${o.status} ${o.statusText}`);
    const s = await o.json();
    return { ...s, id: s.runId };
  } catch (o) {
    return console.error("[pipelineRuns] Failed to fetch run:", o), null;
  }
}
const Lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getPipelineRun: st,
  listPipelineRuns: ke
}, Symbol.toStringTag, { value: "Module" }));
function it() {
  const { idToken: e } = Fe(), [n, r] = O(!1), [o, s] = O(null), [t, i] = O(!1), a = "";
  return { triggerRun: v(
    async (d, h, m) => {
      r(!0), s(null), i(!1);
      try {
        const u = K(d), I = {};
        h && (I.triggerPayload = h), u && (I.definition = u);
        const f = {
          "Content-Type": "application/json",
          ...e ? { Authorization: `Bearer ${e}` } : {}
        };
        m?.idempotencyKey && (f["Idempotency-Key"] = m.idempotencyKey);
        const T = await fetch(
          `${a}/api/pipelines/${encodeURIComponent(d)}/runs`,
          {
            method: "POST",
            headers: f,
            body: JSON.stringify(I)
          }
        );
        if (!T.ok) {
          const x = await T.text().catch(() => "");
          return s(
            `Trigger failed (${T.status})${x ? `: ${x}` : ""}`
          ), null;
        }
        const y = typeof T.headers?.get == "function" ? T.headers.get("X-Idempotent-Replay") : T.headers["x-idempotent-replay"] ?? null;
        return i(y === "true"), (await T.json()).runId;
      } catch (u) {
        return s(u.message), null;
      } finally {
        r(!1);
      }
    },
    [a, e]
  ), isTriggering: n, lastError: o, isReplay: t };
}
const at = Object.freeze({
  // DC-sourced kebab form (after bridge's `:` → `.` mapping) → colon-form in-app key.
  "pipeline.run.resume-from-step": "pipeline:run:resumeFromStep",
  // hub#2223: producer-backed canonical past-tense form. Kebab-from-the-wire
  // already maps directly into the PipelineEventMap key, but keep an explicit
  // identity entry here for documentation purposes (the function below
  // collapses to the input when the alias is the same string).
  "pipeline.run.resumed-from-step": "pipeline.run.resumed-from-step"
});
function ct(e) {
  return at[e] ?? e;
}
function Ht({
  channel: e = "pipeline:all",
  onEvent: n,
  enabled: r = !1
}) {
  const { connectionState: o, sendMessage: s, onMessage: t } = me(), i = W(n);
  _(() => {
    i.current = n;
  }, [n]), _(() => {
    if (!r || o !== "connected") return;
    s({ service: "pipeline", action: "subscribe", channel: e });
    const a = t((c) => {
      if (c.type !== "pipeline:event") return;
      const d = c, h = d.eventType;
      if (!h) return;
      const u = {
        eventType: ct(h),
        payload: d.payload,
        seq: typeof d.seq == "number" ? d.seq : 0,
        sourceNodeId: typeof d.sourceNodeId == "string" ? d.sourceNodeId : "unknown",
        emittedAt: typeof d.emittedAt == "number" ? d.emittedAt : Date.now()
      };
      try {
        i.current(u);
      } catch (I) {
        console.error("[WebSocketEventAdapter] onEvent threw", I);
      }
    });
    return () => {
      a(), s({ service: "pipeline", action: "unsubscribe", channel: e });
    };
  }, [r, o, e, s, t]);
}
function ne() {
  const e = typeof globalThis < "u" ? globalThis.crypto : void 0;
  return e && typeof e.randomUUID == "function" ? e.randomUUID() : `ws-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function ut() {
  const { sendMessage: e } = me(), n = v(
    (m) => e({ service: "pipeline", action: "subscribe", channel: `pipeline:run:${m}` }),
    [e]
  ), r = v(
    (m) => e({ service: "pipeline", action: "unsubscribe", channel: `pipeline:run:${m}` }),
    [e]
  ), o = v(
    () => e({ service: "pipeline", action: "subscribe", channel: "pipeline:all" }),
    [e]
  ), s = v(
    () => e({ service: "pipeline", action: "unsubscribe", channel: "pipeline:all" }),
    [e]
  ), t = v(
    () => e({ service: "pipeline", action: "subscribe", channel: "pipeline:approvals" }),
    [e]
  ), i = v(
    () => e({ service: "pipeline", action: "unsubscribe", channel: "pipeline:approvals" }),
    [e]
  ), a = v(
    (m, u = {}) => {
      const I = u.correlationId ?? ne();
      return e({
        service: "pipeline",
        action: "trigger",
        pipelineId: m,
        ...u.definition ? { definition: u.definition } : {},
        ...u.triggerPayload ? { triggerPayload: u.triggerPayload } : {},
        ...u.triggeredBy ? { triggeredBy: u.triggeredBy } : {},
        correlationId: I
      }), I;
    },
    [e]
  ), c = v(
    (m, u) => {
      const I = u ?? ne();
      return e({ service: "pipeline", action: "cancel", runId: m, correlationId: I }), I;
    },
    [e]
  ), d = v(
    (m, u, I, f = {}) => {
      const T = f.correlationId ?? ne();
      return e({
        service: "pipeline",
        action: "resolveApproval",
        runId: m,
        stepId: u,
        decision: I,
        ...f.comment ? { comment: f.comment } : {},
        ...f.decidedBy ? { decidedBy: f.decidedBy } : {},
        correlationId: T
      }), T;
    },
    [e]
  ), h = v(
    (m, u, I) => {
      const f = I ?? ne();
      return e({
        service: "pipeline",
        action: "resumeFromStep",
        runId: m,
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
    unsubscribeFromAll: s,
    subscribeToApprovals: t,
    unsubscribeFromApprovals: i,
    triggerRun: a,
    cancelRun: c,
    resolveApproval: d,
    requestResumeFromStep: h
  };
}
function Bt(e, n = {}) {
  const { enabled: r = !0 } = n, { connectionState: o, sendMessage: s } = me();
  _(() => {
    if (!r || !e || o !== "connected") return;
    const t = `pipeline:run:${e}`;
    return s({ service: "pipeline", action: "subscribe", channel: t }), () => {
      s({ service: "pipeline", action: "unsubscribe", channel: t });
    };
  }, [r, e, o, s]);
}
const Ee = oe(null);
function Jt({
  value: e,
  children: n
}) {
  return /* @__PURE__ */ S(Ee.Provider, { value: e, children: n });
}
function Re() {
  return L(Ee);
}
const le = 20, ie = oe(null);
function dt(e, n) {
  return e.steps[n] ?? {
    nodeId: n,
    status: "pending"
  };
}
function F(e, n, r) {
  const o = dt(e, n), s = typeof r == "function" ? r(o) : { ...o, ...r };
  return { ...e, steps: { ...e.steps, [n]: s } };
}
function lt(e) {
  const n = Object.values(e);
  if (n.length <= le) return e;
  const r = n.filter(
    (a) => a.status === "running" || a.status === "pending" || a.status === "awaiting_approval" || a.status === "paused_at_breakpoint"
  ), s = n.filter(
    (a) => a.status !== "running" && a.status !== "pending" && a.status !== "awaiting_approval" && a.status !== "paused_at_breakpoint"
  ).sort((a, c) => c.startedAt.localeCompare(a.startedAt)).slice(
    0,
    Math.max(0, le - r.length)
  ), t = [...r, ...s], i = {};
  for (const a of t) i[a.id] = a;
  return i;
}
function Vt({ children: e }) {
  const n = L(he), { triggerRun: r } = it(), o = ut(), [s, t] = O({}), [i, a] = O(!1), c = W(/* @__PURE__ */ new Set()), d = W(null);
  _(() => {
    const p = n?.definition?.id;
    !p || d.current === p || (d.current = p, a(!0), ke(p, { limit: le }).then((P) => {
      t((E) => {
        const R = { ...E };
        for (const A of P.runs)
          R[A.id] || (R[A.id] = A);
        return R;
      });
    }).catch((P) => {
      console.error("[PipelineRuns] Failed to load history from API", P), t((E) => {
        const R = { ...E };
        for (const A of be(p))
          R[A.id] || (R[A.id] = A);
        return R;
      });
    }).finally(() => a(!1)));
  }, [n?.definition?.id]), _e("*", (p) => {
    const { eventType: P, payload: E } = p;
    t((R) => pt(R, P, E));
  }), _(() => {
    for (const p of Object.values(s))
      if ((p.status === "completed" || p.status === "failed" || p.status === "cancelled") && !c.current.has(p.id)) {
        c.current.add(p.id);
        try {
          ot(p.pipelineId, p);
        } catch (E) {
          console.warn("[PipelineRuns] appendRun failed", E);
        }
      }
  }, [s]);
  const h = v(
    async (p, P) => {
      const E = await r(p, P);
      if (!E)
        throw new Error("Trigger failed (REST POST did not return a runId)");
      return E;
    },
    [r]
  ), m = v(
    (p) => {
      o.cancelRun(p);
    },
    [o]
  ), u = v(
    (p, P, E, R) => {
      o.resolveApproval(p, P, E, { comment: R });
    },
    [o]
  ), I = W(s);
  _(() => {
    I.current = s;
  }, [s]);
  const f = v(
    async (p) => {
      const E = Object.values(I.current).filter((R) => R.status === "failed").filter((R) => R.steps[p]?.status === "failed").sort((R, A) => A.startedAt.localeCompare(R.startedAt))[0];
      if (!E) {
        console.warn(
          "[PipelineRuns] retryFromStep — no failed run found for node",
          p
        );
        return;
      }
      try {
        await et(E.pipelineId, E.id, p);
      } catch (R) {
        console.error("[PipelineRuns] retryFromNode API failed", R);
      }
    },
    []
  ), T = v(
    async (p, P, E) => {
      const R = { ...E ?? {}, __breakpoints: P };
      return h(p, R);
    },
    [h]
  ), y = v(
    (p, P, E = "continue") => {
      const C = I.current[p]?.pipelineId ?? "unknown";
      fetch(
        `/api/pipelines/${encodeURIComponent(C)}/runs/${encodeURIComponent(p)}/breakpoint/${encodeURIComponent(P)}/resolve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: E })
        }
      ).catch((J) => {
        console.error("[PipelineRuns] resolveBreakpoint API failed", J);
      });
    },
    []
  ), w = v(
    async (p, P, E, R) => {
      const J = I.current[p]?.pipelineId ?? "unknown", H = `/api/pipelines/${encodeURIComponent(J)}/runs/${encodeURIComponent(p)}/breakpoint/${encodeURIComponent(P)}/patch`, q = await fetch(H, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patch: E, ...R ? { appliedBy: R } : {} })
      });
      if (q.status === 200)
        return await q.json();
      if (q.status === 422) {
        const g = await q.json().catch(() => ({}));
        return g.result ? g.result : {
          patchId: "",
          before: {},
          after: {},
          validation: { ok: !1, reason: g.error ?? "patch rejected" }
        };
      }
      const Q = await q.text().catch(() => "");
      throw new Error(`applyContextPatch HTTP ${q.status}: ${Q}`);
    },
    []
  ), x = v(
    async (p, P, E) => {
      const C = I.current[p]?.pipelineId ?? "unknown", J = `/api/pipelines/${encodeURIComponent(C)}/runs/${encodeURIComponent(p)}/breakpoint/${encodeURIComponent(P)}/patch/${encodeURIComponent(E)}`, H = await fetch(J, { method: "DELETE" });
      if (H.status !== 204) {
        const q = await H.text().catch(() => "");
        throw new Error(`revertContextPatch HTTP ${H.status}: ${q}`);
      }
    },
    []
  ), $ = v((p) => {
    t((P) => {
      const E = P[p.id];
      if (E && E.status === p.status) {
        const R = Object.keys(E.steps).length, A = Object.keys(p.steps).length;
        if (R >= A) return P;
      }
      return { ...P, [p.id]: p };
    });
  }, []), k = B(
    () => Object.values(s).filter(
      (p) => p.status === "running" || p.status === "pending" || p.status === "awaiting_approval" || p.status === "paused_at_breakpoint"
    ).map((p) => p.id),
    [s]
  ), D = B(
    () => ({
      runs: s,
      activeRunIds: k,
      triggerRun: h,
      triggerDebugRun: T,
      cancelRun: m,
      resolveApproval: u,
      resolveBreakpoint: y,
      applyContextPatch: w,
      revertContextPatch: x,
      retryFromStep: f,
      ingestRun: $
    }),
    [
      s,
      k,
      h,
      T,
      m,
      u,
      y,
      w,
      x,
      f,
      $
    ]
  );
  return /* @__PURE__ */ S(ie.Provider, { value: D, children: e });
}
function pt(e, n, r) {
  if (!r || typeof r != "object" || typeof r.runId != "string") return e;
  switch (n) {
    case "pipeline.run.started": {
      const t = r, i = {
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
      return lt({ ...e, [t.runId]: i });
    }
    case "pipeline.run.completed": {
      const t = r, i = e[t.runId];
      return i ? {
        ...e,
        [t.runId]: {
          ...i,
          status: "completed",
          completedAt: t.at,
          durationMs: t.durationMs,
          currentStepIds: []
        }
      } : e;
    }
    case "pipeline.run.failed": {
      const t = r, i = e[t.runId];
      return i ? {
        ...e,
        [t.runId]: {
          ...i,
          status: "failed",
          completedAt: t.at,
          error: t.error,
          currentStepIds: []
        }
      } : e;
    }
    case "pipeline.run.cancelled": {
      const t = r, i = e[t.runId];
      return i ? {
        ...e,
        [t.runId]: {
          ...i,
          status: "cancelled",
          completedAt: t.at,
          currentStepIds: []
        }
      } : e;
    }
    case "pipeline.step.started": {
      const t = r, i = e[t.runId];
      if (!i) return e;
      const a = F(i, t.stepId, (c) => ({
        ...c,
        nodeId: t.stepId,
        status: "running",
        startedAt: t.at
      }));
      return {
        ...e,
        [t.runId]: {
          ...a,
          currentStepIds: Array.from(
            /* @__PURE__ */ new Set([...a.currentStepIds, t.stepId])
          )
        }
      };
    }
    case "pipeline.step.completed": {
      const t = r, i = e[t.runId];
      if (!i) return e;
      const a = F(i, t.stepId, (c) => ({
        ...c,
        status: "completed",
        completedAt: t.at,
        durationMs: t.durationMs,
        output: t.output
      }));
      return {
        ...e,
        [t.runId]: {
          ...a,
          currentStepIds: a.currentStepIds.filter((c) => c !== t.stepId)
        }
      };
    }
    case "pipeline.step.failed": {
      const t = r, i = e[t.runId];
      if (!i) return e;
      const a = F(i, t.stepId, (c) => ({
        ...c,
        status: "failed",
        completedAt: t.at,
        error: t.error
      }));
      return {
        ...e,
        [t.runId]: {
          ...a,
          currentStepIds: a.currentStepIds.filter((c) => c !== t.stepId)
        }
      };
    }
    case "pipeline.step.skipped": {
      const t = r, i = e[t.runId];
      if (!i) return e;
      const a = F(i, t.stepId, (c) => ({
        ...c,
        status: "skipped",
        completedAt: t.at,
        error: c.error
      }));
      return {
        ...e,
        [t.runId]: {
          ...a,
          currentStepIds: a.currentStepIds.filter((c) => c !== t.stepId)
        }
      };
    }
    case "pipeline.step.cancelled": {
      const t = r, i = e[t.runId];
      if (!i) return e;
      const a = F(i, t.stepId, (c) => ({
        ...c,
        // `StepStatus` has no 'cancelled' — track as failed with marker.
        status: "failed",
        completedAt: t.at,
        error: c.error ?? "cancelled"
      }));
      return {
        ...e,
        [t.runId]: {
          ...a,
          currentStepIds: a.currentStepIds.filter((c) => c !== t.stepId)
        }
      };
    }
    case "pipeline.llm.prompt": {
      const t = r, i = e[t.runId];
      return i ? {
        ...e,
        [t.runId]: F(i, t.stepId, (a) => ({
          ...a,
          llm: {
            prompt: t.prompt,
            response: a.llm?.response ?? "",
            tokensIn: a.llm?.tokensIn ?? 0,
            tokensOut: a.llm?.tokensOut ?? 0,
            ...a.llm?.streamOpened !== void 0 ? { streamOpened: a.llm.streamOpened } : {},
            ...a.llm?.firstTokenLatencyMs !== void 0 ? { firstTokenLatencyMs: a.llm.firstTokenLatencyMs } : {}
          }
        }))
      } : e;
    }
    case "pipeline.llm.stream.opened": {
      const t = r, i = e[t.runId];
      return i ? {
        ...e,
        [t.runId]: F(i, t.stepId, (a) => {
          const c = Date.parse(t.openedAt), d = {
            ...a,
            llm: {
              prompt: a.llm?.prompt ?? "",
              response: a.llm?.response ?? "",
              tokensIn: a.llm?.tokensIn ?? 0,
              tokensOut: a.llm?.tokensOut ?? 0,
              streamOpened: !0,
              ...a.llm?.firstTokenLatencyMs !== void 0 ? { firstTokenLatencyMs: a.llm.firstTokenLatencyMs } : {}
            }
          };
          return d.llm._streamOpenedAtMs = Number.isFinite(c) ? c : Date.now(), d;
        })
      } : e;
    }
    case "pipeline.llm.token": {
      const t = r, i = e[t.runId];
      return i ? {
        ...e,
        [t.runId]: F(i, t.stepId, (a) => {
          const c = a.llm?.tokensOut ?? 0, d = c === 0, h = a.llm?._streamOpenedAtMs, m = Date.parse(t.at), u = d && typeof h == "number" && Number.isFinite(m) ? Math.max(0, m - h) : a.llm?.firstTokenLatencyMs;
          return {
            ...a,
            llm: {
              prompt: a.llm?.prompt ?? "",
              response: (a.llm?.response ?? "") + t.token,
              tokensIn: a.llm?.tokensIn ?? 0,
              tokensOut: c + 1,
              streamOpened: !1,
              ...u !== void 0 ? { firstTokenLatencyMs: u } : {}
            }
          };
        })
      } : e;
    }
    case "pipeline.llm.response": {
      const t = r, i = e[t.runId];
      return i ? {
        ...e,
        [t.runId]: F(i, t.stepId, (a) => ({
          ...a,
          llm: {
            prompt: a.llm?.prompt ?? "",
            response: t.response,
            tokensIn: t.tokensIn,
            tokensOut: t.tokensOut
          }
        }))
      } : e;
    }
    case "pipeline.step.breakpoint": {
      const t = r, i = e[t.runId];
      if (!i) return e;
      const a = F(i, t.stepId, (c) => ({
        ...c,
        status: "awaiting"
      }));
      return {
        ...e,
        [t.runId]: { ...a, status: "paused_at_breakpoint" }
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
      const t = r, i = e[t.runId];
      if (!i) return e;
      const a = n === "pipeline.step.context.patched-unvalidated", c = {
        patchId: t.patchId,
        appliedAt: t.at,
        mode: t.mode,
        ...a ? { unvalidated: !0 } : {}
      };
      return {
        ...e,
        [t.runId]: F(i, t.stepId, (d) => ({
          ...d,
          patches: [...d.patches ?? [], c]
        }))
      };
    }
    case "pipeline.step.context.patch-reverted": {
      const t = r, i = e[t.runId];
      return i ? {
        ...e,
        [t.runId]: F(i, t.stepId, (a) => ({
          ...a,
          patches: (a.patches ?? []).map(
            (c) => c.patchId === t.patchId ? { ...c, revertedAt: t.at } : c
          )
        }))
      } : e;
    }
    case "pipeline.approval.requested": {
      const t = r, i = e[t.runId];
      if (!i) return e;
      const a = F(i, t.stepId, (c) => ({
        ...c,
        status: "awaiting",
        approvals: c.approvals ?? []
      }));
      return {
        ...e,
        [t.runId]: { ...a, status: "awaiting_approval" }
      };
    }
    case "pipeline.run.resumed-from-step": {
      const t = r, i = e[t.runId];
      if (!i) return e;
      const a = {
        fromNodeId: t.fromNodeId,
        ...t.originalFailedStepId ? { originalFailedStepId: t.originalFailedStepId } : {},
        at: t.at
      };
      return {
        ...e,
        [t.runId]: {
          ...i,
          status: "running",
          replayAttempts: (i.replayAttempts ?? 0) + 1,
          resumeHistory: [...i.resumeHistory ?? [], a]
        }
      };
    }
    case "pipeline.approval.recorded": {
      const t = r, i = e[t.runId];
      if (!i) return e;
      const a = {
        userId: t.userId,
        decision: t.decision,
        at: t.at
      };
      return {
        ...e,
        [t.runId]: F(i, t.stepId, (c) => ({
          ...c,
          approvals: [...c.approvals ?? [], a]
        }))
      };
    }
    default:
      return e;
  }
}
function mt() {
  const e = L(ie);
  if (!e)
    throw new Error(
      "usePipelineRuns must be used within a PipelineRunsProvider"
    );
  return e;
}
function Wt() {
  const e = Re(), n = L(ie), r = e?.retryFromStep, o = n?.retryFromStep;
  return B(() => r ? async (s) => {
    await r(s);
  } : o ?? (async () => {
  }), [r, o]);
}
function Kt(e) {
  const n = Re(), r = L(ie), o = n?.getLatestStepForNode, s = B(
    () => o ? o(e) : null,
    [o, e]
  ), t = B(() => {
    if (!r) return null;
    let i = null, a = "";
    for (const c of Object.values(r.runs)) {
      const d = c.steps[e];
      d && c.startedAt > a && (i = d, a = c.startedAt);
    }
    return i;
  }, [r, e]);
  return o ? s : t;
}
const Y = oe(null);
function zt({
  services: e,
  children: n
}) {
  return /* @__PURE__ */ S(Y.Provider, { value: e, children: n });
}
function Yt() {
  const e = L(Y);
  if (!e)
    throw new Error(
      "useImageUrl must be called inside <PipelineEditorServicesProvider>. The host editor (e.g. wsg PipelineEditorPage) is responsible for mounting it with its own getImageUrl implementation."
    );
  return e.getImageUrl;
}
function Xt() {
  const e = L(Y);
  if (!e)
    throw new Error(
      "usePipelineEditorServices must be called inside <PipelineEditorServicesProvider>."
    );
  return e;
}
function Gt(e) {
  const r = L(Y)?.nodeVocabulary?.[e];
  return B(
    () => ({
      label: (o, s) => r?.labels?.[o] ?? s,
      help: (o, s) => r?.help?.[o] ?? s,
      placeholder: (o, s) => r?.placeholders?.[o] ?? s
    }),
    [r]
  );
}
function Qt(e, n) {
  const o = L(Y)?.modelOptions?.[e];
  return B(
    // An explicitly empty list is a real answer ("this host runs none"), so it
    // is honoured rather than treated as "unset" and replaced by the defaults.
    () => o ?? n,
    [o, n]
  );
}
function Zt() {
  const n = L(Y)?.modelOptions;
  return B(
    () => (r, o) => n?.[r] ?? o,
    [n]
  );
}
function en() {
  const n = L(Y)?.executableNodeTypes;
  return B(() => {
    if (!n) return () => !0;
    const r = new Set(n);
    return (o) => r.has(o);
  }, [n]);
}
function ft(e) {
  if (e < 60) return `${e}s`;
  const n = Math.floor(e / 60), r = e % 60;
  return `${n}m ${r}s`;
}
function gt({ startedAt: e }) {
  const [n, r] = O(
    () => Math.max(0, Math.floor((Date.now() - e) / 1e3))
  );
  return _(() => {
    const o = () => r(Math.max(0, Math.floor((Date.now() - e) / 1e3)));
    o();
    const s = setInterval(o, 1e3);
    return () => clearInterval(s);
  }, [e]), /* @__PURE__ */ S(
    "span",
    {
      "data-testid": "generative-image-preview-elapsed",
      className: "absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] leading-none text-white/90",
      children: ft(n)
    }
  );
}
function tn({
  status: e,
  src: n,
  alt: r = "",
  startedAt: o,
  className: s
}) {
  const t = je(), i = W(e), [a, c] = O(!1);
  return i.current !== e && (i.current = e, e === "done" && !t && c(!0)), _(() => {
    if (!a) return;
    const d = setTimeout(() => c(!1), 30);
    return () => clearTimeout(d);
  }, [a]), /* @__PURE__ */ S(
    "div",
    {
      "data-testid": "generative-image-preview",
      "data-status": e,
      className: U("relative overflow-hidden rounded-md bg-surface-hover", s),
      children: e === "synthesizing" ? /* @__PURE__ */ V(Oe, { children: [
        /* @__PURE__ */ S(
          "div",
          {
            "aria-hidden": "true",
            "data-testid": "generative-image-preview-shimmer",
            className: U(
              "absolute inset-0",
              t ? "bg-surface-emphasis" : U(
                "bg-gradient-to-r from-surface-hover via-surface-emphasis to-surface-hover",
                "bg-[length:400px_100%] animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]"
              )
            )
          }
        ),
        !t && /* @__PURE__ */ S(
          "div",
          {
            "aria-hidden": "true",
            "data-testid": "generative-image-preview-sweep",
            className: U(
              "absolute inset-0",
              "bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)]",
              "bg-[length:400px_100%] bg-no-repeat",
              "animate-[skeleton-shimmer_2.4s_linear_infinite]"
            )
          }
        ),
        /* @__PURE__ */ S(
          "span",
          {
            className: U(
              "absolute inset-0 flex items-center justify-center",
              "text-[11px] font-medium tracking-wide text-neutral select-none"
            ),
            children: "✦ synthesizing"
          }
        ),
        o !== void 0 && /* @__PURE__ */ S(gt, { startedAt: o })
      ] }) : n ? /* @__PURE__ */ S(
        "img",
        {
          src: n,
          alt: r,
          "data-testid": "generative-image-preview-img",
          className: U(
            "h-full w-full object-cover",
            !t && "transition-[filter] duration-[400ms] ease-out",
            a ? "blur-[16px]" : "blur-0"
          )
        }
      ) : (
        // 'done' without a src — keep the neutral block rather than a broken img.
        /* @__PURE__ */ S("div", { "aria-hidden": "true", className: "absolute inset-0 bg-surface-emphasis" })
      )
    }
  );
}
const nn = z(
  function({
    rows: n,
    minRows: r = 2,
    maxRows: o,
    autoResize: s = !1,
    invalid: t = !1,
    disabled: i = !1,
    onChange: a,
    value: c,
    className: d,
    "data-testid": h,
    ...m
  }, u) {
    const I = W(null), f = v(
      (k) => {
        I.current = k, typeof u == "function" ? u(k) : u && (u.current = k);
      },
      [u]
    ), T = 20, y = 12, w = v(() => {
      const k = I.current;
      if (!k || !s) return;
      k.style.height = "auto";
      const D = r * T + y, p = k.scrollHeight, P = o ? o * T + y : 1 / 0;
      k.style.height = `${Math.min(Math.max(p, D), P)}px`, k.style.overflowY = p > P ? "auto" : "hidden";
    }, [s, r, o]);
    _(() => {
      w();
    }, [c, w]);
    const x = v(
      (k) => {
        w(), a?.(k);
      },
      [a, w]
    );
    return /* @__PURE__ */ S(
      "textarea",
      {
        ref: f,
        rows: s ? void 0 : n ?? r,
        disabled: i,
        "data-testid": h,
        value: c,
        onChange: x,
        className: U(
          "w-full rounded-md border bg-surface-panel font-inherit text-text-primary",
          "outline-none transition-colors duration-150 px-2.5 py-1.5 text-[13px] leading-5",
          "placeholder:text-text-tertiary",
          "focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover",
          !s && "resize-y",
          s && "resize-none overflow-hidden",
          t ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis",
          d
        ),
        style: s ? { minHeight: `${r * T + y}px` } : void 0,
        ...m
      }
    );
  }
);
class ht extends Error {
  reason;
  result;
  constructor(n, r) {
    super(n), this.name = "PatchValidationRejectedError", this.reason = n, this.result = r;
  }
}
class Ne extends Error {
  status;
  body;
  constructor(n, r, o) {
    super(r), this.name = "PatchHttpError", this.status = n, this.body = o;
  }
}
function Ce(e, n, r, o) {
  const t = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(n)}/breakpoint/${encodeURIComponent(r)}/patch`;
  return o ? `${t}/${encodeURIComponent(o)}` : `${t}`;
}
async function rn(e, n, r, o, s) {
  const t = await fetch(Ce(e, n, r), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ patch: o, ...s ? { appliedBy: s } : {} })
  });
  if (t.status === 200)
    return await t.json();
  if (t.status === 422) {
    const c = await t.json().catch(() => ({}));
    let d = "patch rejected by validator";
    throw c.result && c.result.validation && c.result.validation.ok === !1 && typeof c.result.validation.reason == "string" ? d = c.result.validation.reason : typeof c.error == "string" && (d = c.error), new ht(d, c.result);
  }
  const i = await t.text().catch(() => "");
  let a;
  try {
    a = JSON.parse(i);
  } catch {
    a = i;
  }
  throw new Ne(
    t.status,
    `applyPatch HTTP ${t.status}: ${i}`,
    a
  );
}
async function on(e, n, r, o) {
  const s = await fetch(Ce(e, n, r, o), {
    method: "DELETE",
    credentials: "include"
  });
  if (s.status === 204) return;
  const t = await s.text().catch(() => "");
  let i;
  try {
    i = JSON.parse(t);
  } catch {
    i = t;
  }
  throw new Ne(
    s.status,
    `revertPatch HTTP ${s.status}: ${t}`,
    i
  );
}
const ue = {
  sm: "h-7 px-2 text-[12px]",
  md: "h-9 px-2.5 text-[13px]"
}, Se = {
  sm: "px-1.5",
  md: "px-2"
}, Ue = z(function({
  type: n = "text",
  size: r = "md",
  prefix: o,
  suffix: s,
  invalid: t = !1,
  disabled: i = !1,
  mono: a = !1,
  className: c,
  "data-testid": d,
  ...h
}, m) {
  const u = o != null, I = s != null;
  return !u && !I ? /* @__PURE__ */ S(
    "input",
    {
      ref: m,
      type: n,
      disabled: i,
      "data-testid": d,
      className: U(
        "w-full rounded-md border bg-surface-panel font-inherit text-text-primary",
        "outline-none transition-colors duration-150",
        "placeholder:text-text-tertiary",
        "focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover",
        t ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis",
        a && "font-mono",
        ue[r],
        c
      ),
      ...h
    }
  ) : /* @__PURE__ */ V(
    "div",
    {
      className: U(
        "relative flex w-full items-center rounded-md border bg-surface-panel",
        "transition-colors duration-150",
        "focus-within:bg-white focus-within:border-info focus-within:ring-1 focus-within:ring-info/40",
        t ? "border-danger focus-within:border-danger focus-within:ring-danger/40" : "border-border-emphasis",
        i && "opacity-50 cursor-not-allowed bg-surface-hover"
      ),
      children: [
        u && /* @__PURE__ */ S(
          "span",
          {
            "aria-hidden": "true",
            className: U(
              "flex shrink-0 items-center text-text-tertiary",
              Se[r]
            ),
            children: o
          }
        ),
        /* @__PURE__ */ S(
          "input",
          {
            ref: m,
            type: n,
            disabled: i,
            "data-testid": d,
            className: U(
              "flex-1 min-w-0 bg-transparent font-inherit text-text-primary outline-none",
              "placeholder:text-text-tertiary",
              "disabled:cursor-not-allowed",
              u ? "pl-0" : ue[r].split(" ")[1],
              I ? "pr-0" : ue[r].split(" ")[2],
              r === "sm" ? "h-7 text-[12px]" : "h-9 text-[13px]",
              a && "font-mono",
              c
            ),
            ...h
          }
        ),
        I && /* @__PURE__ */ S(
          "span",
          {
            "aria-hidden": "true",
            className: U(
              "flex shrink-0 items-center text-text-tertiary",
              Se[r]
            ),
            children: s
          }
        )
      ]
    }
  );
}), yt = {
  sm: "h-7 px-2 text-[12px]",
  md: "h-9 px-2.5 text-[13px]"
}, sn = z(function({
  options: n,
  placeholder: r,
  size: o = "md",
  invalid: s = !1,
  disabled: t = !1,
  className: i,
  "data-testid": a,
  value: c,
  ...d
}, h) {
  return /* @__PURE__ */ V(
    "select",
    {
      ref: h,
      disabled: t,
      "data-testid": a,
      value: c,
      className: U(
        "w-full appearance-none rounded-md border bg-surface-panel font-inherit text-text-primary",
        "outline-none transition-colors duration-150 cursor-pointer",
        // Custom chevron via background-image is banned (inline style). Instead
        // rely on the native OS chevron — appearance: none removes it but is
        // only needed to remove the native outline; here we let native appearance
        // show through via a Tailwind `select` reset that keeps the arrow.
        // We use `appearance-auto` to restore the native arrow on modern browsers.
        "appearance-auto",
        "focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover",
        s ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis",
        yt[o],
        i
      ),
      ...d,
      children: [
        r && /* @__PURE__ */ S("option", { value: "", disabled: !0, children: r }),
        n.map((m) => /* @__PURE__ */ S("option", { value: m.value, disabled: m.disabled, children: m.label }, m.value))
      ]
    }
  );
}), an = z(
  function({
    value: n,
    onChange: r,
    onClear: o,
    min: s,
    max: t,
    step: i,
    unit: a,
    placeholder: c,
    invalid: d = !1,
    disabled: h = !1,
    size: m = "md",
    "data-testid": u
  }, I) {
    const f = v(
      (x) => {
        let $ = x;
        return s !== void 0 && $ < s && ($ = s), t !== void 0 && $ > t && ($ = t), $;
      },
      [s, t]
    ), T = v(
      (x) => {
        const $ = x.target.value;
        if ($ === "" && o) {
          o();
          return;
        }
        const k = parseFloat($);
        Number.isNaN(k) || r(k);
      },
      [r, o]
    ), y = v(
      (x) => {
        const $ = parseFloat(x.target.value);
        if (!Number.isNaN($)) {
          const k = f($);
          k !== $ && r(k);
        }
      },
      [f, r]
    );
    return /* @__PURE__ */ S(
      Ue,
      {
        ref: I,
        type: "number",
        size: m,
        value: n ?? "",
        min: s,
        max: t,
        step: i,
        placeholder: c,
        invalid: d,
        disabled: h,
        suffix: a ? /* @__PURE__ */ S("span", { className: "text-text-tertiary font-sans text-[12px] select-none", children: a }) : void 0,
        "data-testid": u,
        onChange: T,
        onBlur: y
      }
    );
  }
), cn = z(function({
  value: n,
  onChange: r,
  min: o = 0,
  max: s = 100,
  step: t = 1,
  "aria-label": i,
  readout: a = !0,
  disabled: c = !1,
  className: d,
  "data-testid": h
}, m) {
  const u = pe(), I = typeof a == "function" ? a(n) : String(n);
  return /* @__PURE__ */ V("div", { className: U("flex items-center gap-2", d), children: [
    /* @__PURE__ */ S(
      "input",
      {
        ref: m,
        id: u,
        type: "range",
        min: o,
        max: s,
        step: t,
        value: n,
        disabled: c,
        "aria-label": i,
        onChange: (f) => r(parseFloat(f.target.value)),
        className: "flex-1 accent-primary cursor-pointer disabled:cursor-not-allowed",
        "data-testid": h
      }
    ),
    a !== !1 && /* @__PURE__ */ S(
      "output",
      {
        htmlFor: u,
        className: "text-xs text-text-secondary tabular-nums min-w-[2.5rem] text-right",
        children: I
      }
    )
  ] });
});
function un({
  name: e,
  value: n,
  onChange: r,
  options: o,
  disabled: s = !1,
  orientation: t = "vertical",
  "data-testid": i
}) {
  const a = pe();
  return /* @__PURE__ */ S(
    "div",
    {
      role: "radiogroup",
      "data-testid": i,
      className: U(
        "flex",
        t === "vertical" ? "flex-col gap-2" : "flex-row flex-wrap gap-x-4 gap-y-2"
      ),
      children: o.map((c, d) => {
        const h = `${a}-${d}`, m = c.value === n;
        return /* @__PURE__ */ V(
          "label",
          {
            htmlFor: h,
            className: U(
              "flex items-start gap-2.5 cursor-pointer select-none",
              s && "opacity-50 cursor-not-allowed"
            ),
            children: [
              /* @__PURE__ */ V("span", { className: "relative flex shrink-0 mt-0.5", children: [
                /* @__PURE__ */ S(
                  "input",
                  {
                    id: h,
                    type: "radio",
                    name: e,
                    value: c.value,
                    checked: m,
                    disabled: s,
                    onChange: () => r(c.value),
                    className: "sr-only peer"
                  }
                ),
                /* @__PURE__ */ S(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: U(
                      "block w-4 h-4 rounded-full border-2 transition-colors duration-150",
                      m ? "border-info bg-white" : "border-border-emphasis bg-white",
                      !s && !m && "peer-hover:border-info",
                      "peer-focus-visible:ring-2 peer-focus-visible:ring-info/40 peer-focus-visible:ring-offset-1"
                    )
                  }
                ),
                m && /* @__PURE__ */ S(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: "absolute inset-0 m-auto block w-2 h-2 rounded-full bg-info"
                  }
                )
              ] }),
              /* @__PURE__ */ V("span", { className: "flex flex-col", children: [
                /* @__PURE__ */ S(
                  "span",
                  {
                    className: U(
                      "text-[13px] leading-5 font-medium",
                      s ? "text-text-tertiary" : "text-text-primary"
                    ),
                    children: c.label
                  }
                ),
                c.description && /* @__PURE__ */ S(
                  "span",
                  {
                    className: U(
                      "text-[11px] leading-4 mt-0.5",
                      s ? "text-text-disabled" : "text-neutral"
                    ),
                    children: c.description
                  }
                )
              ] })
            ]
          },
          c.value
        );
      })
    }
  );
}
const bt = {
  sm: "px-1.5 py-0.5 text-[11px]",
  md: "px-2 py-0.5 text-[12px]"
}, dn = z(
  function({
    value: n,
    onChange: r,
    samples: o,
    placeholder: s = "$.path.to.value",
    invalid: t = !1,
    errorMessage: i,
    disabled: a = !1,
    size: c = "md",
    enforcePrefix: d = !1,
    "data-testid": h
  }, m) {
    const u = pe(), I = d && n.length > 0 && !n.startsWith("$.") ? 'JSONPath must start with "$."' : void 0, f = t || I != null, T = i ?? I;
    return /* @__PURE__ */ V("div", { className: "flex flex-col gap-1 w-full", children: [
      /* @__PURE__ */ S(
        Ue,
        {
          ref: m,
          type: "text",
          mono: !0,
          size: c,
          value: n,
          onChange: (y) => r(y.target.value),
          placeholder: s,
          invalid: f,
          disabled: a,
          "data-testid": h,
          "aria-describedby": T ? u : void 0,
          "aria-invalid": f || void 0
        }
      ),
      o && o.length > 0 && /* @__PURE__ */ S("div", { className: "flex flex-wrap gap-1", children: o.map((y) => /* @__PURE__ */ S(
        "button",
        {
          type: "button",
          disabled: a,
          onClick: () => r(y.value),
          className: U(
            "rounded border border-border bg-surface-hover font-mono text-text-secondary",
            "transition-colors duration-100",
            "hover:bg-info-bg hover:border-info-border hover:text-info-fg",
            "focus:outline-none focus:ring-2 focus:ring-info/40",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            bt[c]
          ),
          children: y.label
        },
        y.value
      )) }),
      T && /* @__PURE__ */ S(
        "p",
        {
          id: u,
          role: "alert",
          className: "text-[11px] text-danger-fg leading-4",
          children: T
        }
      )
    ] });
  }
), It = {
  sm: "w-16",
  md: "w-32",
  lg: "w-48"
}, vt = {
  square: "aspect-square",
  video: "aspect-video",
  auto: ""
};
function xt() {
  return /* @__PURE__ */ V(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "w-6 h-6 text-text-tertiary",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ S("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
        /* @__PURE__ */ S("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
        /* @__PURE__ */ S("path", { d: "M21 15l-5-5L5 21" })
      ]
    }
  );
}
function ln({
  src: e,
  alt: n,
  size: r = "md",
  aspectRatio: o = "square",
  rounded: s = !1,
  fallback: t,
  loading: i = "lazy",
  className: a,
  "data-testid": c
}) {
  const [d, h] = O("loading");
  return /* @__PURE__ */ V(
    "div",
    {
      "data-testid": c,
      className: U(
        "relative overflow-hidden bg-surface-hover",
        It[r],
        o !== "auto" && vt[o],
        s ? "rounded-full" : "rounded-md",
        a
      ),
      children: [
        d === "loading" && /* @__PURE__ */ S(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute inset-0 animate-pulse bg-surface-emphasis"
          }
        ),
        d === "error" && /* @__PURE__ */ S("div", { className: "absolute inset-0 flex items-center justify-center bg-surface-hover", children: t ?? /* @__PURE__ */ S(xt, {}) }),
        /* @__PURE__ */ S(
          "img",
          {
            src: e,
            alt: n,
            loading: i,
            onLoad: () => h("loaded"),
            onError: () => h("error"),
            className: U(
              "w-full h-full object-cover transition-opacity duration-200",
              d === "loaded" ? "opacity-100" : "opacity-0"
            )
          }
        )
      ]
    }
  );
}
const pn = z(
  function({
    checked: n,
    onChange: r,
    indeterminate: o = !1,
    disabled: s = !1,
    "aria-label": t,
    onClick: i,
    onKeyDown: a,
    className: c,
    "data-testid": d
  }, h) {
    const m = W(null);
    return _(() => {
      m.current && (m.current.indeterminate = o);
    }, [o]), /* @__PURE__ */ S(
      "input",
      {
        ref: (u) => {
          m.current = u, typeof h == "function" ? h(u) : h && (h.current = u);
        },
        type: "checkbox",
        checked: n,
        disabled: s,
        "aria-label": t,
        "aria-checked": o ? "mixed" : void 0,
        onChange: (u) => r(u.target.checked),
        onClick: i,
        onKeyDown: a,
        className: U(
          "w-3.5 h-3.5 accent-primary cursor-pointer disabled:cursor-not-allowed",
          c
        ),
        "data-testid": d
      }
    );
  }
);
async function mn(e, n, r, o) {
  const s = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(n)}/resume?fromNodeId=${encodeURIComponent(r)}`, t = await fetch(s, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(o ?? {})
  });
  if (!t.ok) {
    const i = await t.text();
    throw new Error(`Failed to resume run ${n} from node ${r}: ${t.status} ${i}`);
  }
  return t.json();
}
function Ae(e) {
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
async function fn(e, n, r = {}) {
  const o = Ae({
    since: r.since,
    until: r.until,
    actions: r.actions,
    limit: r.limit,
    cursor: r.cursor
  }), s = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(n)}/audit${o}`, t = await fetch(s, {
    method: "GET",
    credentials: "include"
  });
  if (!t.ok) {
    const i = await t.text();
    throw new Error(`Failed to load audit log for ${e}/${n}: ${t.status} ${i}`);
  }
  return t.json();
}
async function gn(e) {
  if (!e.actor && !e.pipelineId)
    throw new Error("searchAudit requires at least one of `actor` or `pipelineId`");
  const r = `/api/pipelines/audit/search${Ae({
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
    const s = await o.text();
    throw new Error(`Audit search failed: ${o.status} ${s}`);
  }
  return o.json();
}
function re(e, n) {
  return `${e}::${n}`;
}
function de(e, n) {
  const r = K(e);
  if (!r) return { requiredCount: 1 };
  const o = r.nodes.find((t) => t.id === n);
  if (!o || o.data.type !== "approval") return { requiredCount: 1 };
  const s = o.data;
  return {
    message: s.message,
    requiredCount: Math.max(1, s.requiredCount ?? 1)
  };
}
function wt() {
  const e = Me(), n = mt(), [r, o] = O(
    () => {
      const f = {};
      for (const T in n.runs) {
        const y = n.runs[T];
        if (y.status === "awaiting_approval")
          for (const w in y.steps) {
            const x = y.steps[w];
            if (x.status !== "awaiting") continue;
            const $ = de(y.pipelineId, w), D = K(y.pipelineId)?.nodes.find((P) => P.id === w), p = D && D.data.type === "approval" ? D.data.approvers : [];
            f[re(T, w)] = {
              runId: T,
              pipelineId: y.pipelineId,
              stepId: w,
              approvers: p,
              requestedAt: x.startedAt ?? (/* @__PURE__ */ new Date(0)).toISOString(),
              message: $.message,
              requiredCount: $.requiredCount,
              recordedCount: x.approvals?.filter((P) => P.decision === "approve").length ?? 0
            };
          }
      }
      return f;
    }
  ), [s, t] = O(!0), [i, a] = O(null), [c, d] = O(0), h = W(n.runs);
  _(() => {
    h.current = n.runs;
  }, [n.runs]);
  const m = W(/* @__PURE__ */ new Map());
  _(() => {
    let f = !1;
    t(!0), a(null);
    const T = async () => {
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
        const y = await T();
        if (f) return;
        if (y?.pendingApprovals) {
          const w = {};
          for (const x of y.pendingApprovals) {
            const $ = de(x.pipelineId, x.stepId);
            w[re(x.runId, x.stepId)] = {
              runId: x.runId,
              pipelineId: x.pipelineId,
              stepId: x.stepId,
              approvers: x.approvers ?? [],
              requestedAt: x.requestedAt,
              message: x.message ?? $.message,
              requiredCount: x.requiredCount ?? $.requiredCount,
              recordedCount: x.recordedCount ?? 0
            };
          }
          o(w);
        }
        t(!1);
      } catch (y) {
        if (f) return;
        console.error(
          "[usePendingApprovals] /api/observability/dashboard?include=pendingApprovals failed:",
          y
        ), a(y.message ?? "Failed to load pending approvals"), t(!1);
      }
    })(), () => {
      f = !0;
    };
  }, [c]), _(() => {
    const f = [];
    f.push(
      e.subscribe("pipeline.run.started", (y) => {
        const w = y;
        m.current.set(w.runId, w.pipelineId);
      })
    ), f.push(
      e.subscribe("pipeline.approval.requested", (y) => {
        const w = y, x = m.current.get(w.runId) ?? h.current[w.runId]?.pipelineId ?? "", $ = de(x, w.stepId);
        o((k) => {
          const D = re(w.runId, w.stepId);
          return k[D] ? k : {
            ...k,
            [D]: {
              runId: w.runId,
              pipelineId: x,
              stepId: w.stepId,
              approvers: w.approvers,
              requestedAt: w.at,
              message: $.message,
              requiredCount: $.requiredCount,
              recordedCount: 0
            }
          };
        });
      })
    ), f.push(
      e.subscribe("pipeline.approval.recorded", (y) => {
        const w = y, x = re(w.runId, w.stepId);
        o(($) => {
          const k = $[x];
          if (!k) return $;
          if (w.decision === "reject") {
            const P = { ...$ };
            return delete P[x], P;
          }
          const D = (k.recordedCount ?? 0) + 1, p = k.requiredCount ?? 1;
          if (D >= p) {
            const P = { ...$ };
            return delete P[x], P;
          }
          return {
            ...$,
            [x]: { ...k, recordedCount: D }
          };
        });
      })
    );
    const T = e.subscribeToApprovals();
    return f.push(T), () => {
      for (const y of f) y();
    };
  }, [e]);
  const u = B(() => Object.values(r).sort(
    (f, T) => T.requestedAt.localeCompare(f.requestedAt)
  ), [r]), I = v(() => {
    d((f) => f + 1);
  }, []);
  return { approvals: u, isLoading: s, error: i, retry: I };
}
function hn() {
  const { approvals: e } = wt();
  return e;
}
export {
  ot as $,
  he as A,
  Zt as B,
  pn as C,
  Qt as D,
  Gt as E,
  jt as F,
  tn as G,
  Ct as H,
  ln as I,
  dn as J,
  Ut as K,
  qt as L,
  Ve as M,
  an as N,
  X as O,
  Vt as P,
  it as Q,
  un as R,
  sn as S,
  nn as T,
  ve as U,
  Ot as V,
  Nt as W,
  ce as X,
  Dt as Y,
  Ge as Z,
  be as _,
  K as a,
  Bt as a0,
  Ft as a1,
  wt as a2,
  Jt as a3,
  Re as a4,
  Lt as a5,
  At as b,
  Ht as c,
  hn as d,
  Ue as e,
  Ne as f,
  ht as g,
  zt as h,
  cn as i,
  rn as j,
  Mt as k,
  Be as l,
  st as m,
  fn as n,
  ke as o,
  et as p,
  on as q,
  mn as r,
  gn as s,
  Yt as t,
  mt as u,
  Xt as v,
  en as w,
  Kt as x,
  Wt as y,
  _t as z
};
