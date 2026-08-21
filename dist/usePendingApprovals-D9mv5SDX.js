import { jsx as T, jsxs as z, Fragment as Ae } from "react/jsx-runtime";
import { createContext as re, useContext as L, useState as A, useRef as V, useEffect as q, useCallback as I, useMemo as J, forwardRef as de, useId as le } from "react";
import { c as j } from "./cn-B6yFEsav.js";
import { b as De } from "./ToastProvider-D3MHbP-u.js";
import { I as xe } from "./Checkbox-DJp19x0a.js";
import { a as Oe, u as je } from "./EventStreamContext-CjzSHXy-.js";
import { u as _e } from "./IdentityContext-CLalsm_M.js";
import { u as pe } from "./WebSocketContext-DPGFyPeZ.js";
const Se = "ws_pipelines_v1_index", Me = "ws_pipelines_v1:";
function se(e) {
  return `${Me}${e}`;
}
let Ie = !1;
function me(e, n) {
  try {
    localStorage.setItem(e, n);
  } catch (r) {
    Ie || (Ie = !0, console.warn("[pipelineStorage] localStorage write failed", r));
  }
}
function fe() {
  try {
    const e = localStorage.getItem(Se);
    if (!e) return [];
    const n = JSON.parse(e);
    return Array.isArray(n) ? n : [];
  } catch {
    return [];
  }
}
function Pe(e) {
  me(Se, JSON.stringify(e));
}
function Fe(e) {
  const n = fe(), r = {
    id: e.id,
    name: e.name,
    status: e.status,
    updatedAt: e.updatedAt
  }, s = n.findIndex((a) => a.id === e.id);
  if (s === -1)
    e.icon && (r.icon = e.icon), e.tags && e.tags.length > 0 && (r.tags = [...e.tags]), n.push(r);
  else {
    const a = e.icon ?? n[s].icon, t = e.tags ?? n[s].tags, o = { ...r };
    a && (o.icon = a), t && t.length > 0 && (o.tags = [...t]), n[s] = o;
  }
  Pe(n);
}
function qe(e) {
  const n = fe().filter((r) => r.id !== e);
  Pe(n);
}
function Le() {
  return fe();
}
function W(e) {
  try {
    const n = localStorage.getItem(se(e));
    return n ? JSON.parse(n) : null;
  } catch {
    return null;
  }
}
function X(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), me(se(e.id), JSON.stringify(e)), Fe(e);
}
function Be(e) {
  me(se(e.id), JSON.stringify(e));
}
function Je(e) {
  try {
    localStorage.removeItem(se(e));
  } catch {
  }
  qe(e);
}
function Et(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), a = crypto.randomUUID(), t = crypto.randomUUID(), o = crypto.randomUUID(), i = crypto.randomUUID(), c = crypto.randomUUID(), d = crypto.randomUUID(), w = crypto.randomUUID(), h = crypto.randomUUID(), m = crypto.randomUUID(), b = crypto.randomUUID(), f = { type: "trigger", triggerType: "manual" }, R = {
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
    expression: `context.steps.${s}.llm.tokensOut > 200`,
    label: "Long summary?"
  }, S = {
    type: "fork",
    branchCount: 2,
    branchLabels: ["post-comment", "notify-user"]
  }, v = {
    type: "action",
    actionType: "post-comment",
    config: { body: "{{context.steps." + s + ".response}}" },
    onError: "route-error"
  }, P = {
    type: "action",
    actionType: "notify",
    config: {
      recipient: "{{context.triggeredBy.userId}}",
      message: "Your document summary is ready for review."
    },
    onError: "route-error"
  }, N = {
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
  }, l = {
    type: "action",
    actionType: "update-document",
    config: { summary: "{{context.steps." + s + ".response}}" },
    onError: "route-error"
  }, C = [
    { id: r, type: "trigger", position: { x: 40, y: 200 }, data: f },
    { id: s, type: "llm", position: { x: 320, y: 200 }, data: R },
    { id: a, type: "condition", position: { x: 620, y: 200 }, data: y },
    { id: t, type: "fork", position: { x: 900, y: 120 }, data: S },
    { id: o, type: "action", position: { x: 1180, y: 60 }, data: v },
    { id: i, type: "action", position: { x: 1180, y: 180 }, data: P },
    { id: c, type: "join", position: { x: 1480, y: 120 }, data: N },
    { id: d, type: "approval", position: { x: 1780, y: 120 }, data: D },
    { id: w, type: "action", position: { x: 2080, y: 120 }, data: l },
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
    { id: m, type: "action", position: { x: 1480, y: 420 }, data: {
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
    { id: b, type: "transform", position: { x: 2380, y: 200 }, data: {
      type: "transform",
      transformType: "template",
      expression: "pipeline-complete",
      outputKey: "pipelineCompletion",
      terminal: !0
    } }
  ], U = (F, G, p, u) => ({
    id: crypto.randomUUID(),
    source: F,
    sourceHandle: G,
    target: p,
    targetHandle: u
  }), H = [
    // Happy path: trigger → llm → condition → fork → (postComment | notify) → join → approval → updateDoc → finalSink
    U(r, "out", s, "in"),
    U(s, "out", a, "in"),
    U(a, "true", t, "in"),
    U(a, "false", h, "in"),
    U(t, "branch-0", o, "in"),
    U(t, "branch-1", i, "in"),
    U(o, "out", c, "in-0"),
    U(i, "out", c, "in-1"),
    U(c, "out", d, "in"),
    U(d, "approved", w, "in"),
    // Terminal `out` paths converge on the final sink. Each leaf wires `out`
    // so DEAD_END only fires for the sink itself.
    U(w, "out", b, "in"),
    U(h, "out", b, "in"),
    // Approval rejection routes through the shared error handler. Wiring
    // `rejected` is hygiene only — there is no UNUSED_APPROVAL_BRANCH lint —
    // but it keeps the rejection path observable.
    U(d, "rejected", m, "in"),
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
    U(s, "error", m, "in"),
    U(w, "error", m, "in"),
    U(h, "error", m, "in"),
    // The error handler itself drains into the final sink on both handles
    // so it is not a dead end and its own `error` handle is wired (silencing
    // NO_ERROR_HANDLER for the error-handler node).
    U(m, "out", b, "in"),
    U(m, "error", b, "in")
  ], B = {
    id: crypto.randomUUID(),
    name: "Document Summary Pipeline (Demo)",
    description: "A showcase pipeline demonstrating LLM summarization, branching, approval, parallel actions, and a shared error handler.",
    icon: "📄",
    version: 0,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "manual" },
    nodes: C,
    edges: H,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
  return X(B), B;
}
function kt(e, n) {
  const r = W(e);
  if (!r) return null;
  const s = /* @__PURE__ */ new Map(), a = r.nodes.map((c) => {
    const d = crypto.randomUUID();
    return s.set(c.id, d), { ...c, id: d, data: { ...c.data } };
  }), t = r.edges.map((c) => ({
    ...c,
    id: crypto.randomUUID(),
    source: s.get(c.source) ?? c.source,
    target: s.get(c.target) ?? c.target
  })), o = (/* @__PURE__ */ new Date()).toISOString(), i = {
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
    createdAt: o,
    updatedAt: o
  };
  return X(i), i;
}
function Ut(e) {
  const n = W(e);
  return n ? JSON.stringify(n, null, 2) : null;
}
function Q(e = "") {
  return `/api/pipelines/defs${e}`;
}
const He = { "Content-Type": "application/json" };
async function ze() {
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
async function Ve(e) {
  const n = await fetch(Q(`/${encodeURIComponent(e)}`), {
    credentials: "include"
  });
  if (n.status === 404) return null;
  if (!n.ok) throw new Error(`loadPipelineRemote failed (${n.status})`);
  return await n.json();
}
async function Re(e) {
  const n = await fetch(Q(`/${encodeURIComponent(e.id)}`), {
    method: "PUT",
    headers: He,
    credentials: "include",
    body: JSON.stringify(e)
  });
  if (!n.ok) throw new Error(`savePipelineRemote failed (${n.status})`);
  return await n.json();
}
async function We(e) {
  const n = await fetch(Q(`/${encodeURIComponent(e)}`), {
    method: "DELETE",
    credentials: "include"
  });
  if (!n.ok && n.status !== 404)
    throw new Error(`deletePipelineRemote failed (${n.status})`);
}
async function Ke(e) {
  const n = await fetch(Q(`/${encodeURIComponent(e)}/publish`), {
    method: "POST",
    credentials: "include"
  });
  if (n.status === 404) return null;
  if (!n.ok) throw new Error(`publishPipelineRemote failed (${n.status})`);
  return await n.json();
}
function Y(e) {
  if (e instanceof SyntaxError) return !0;
  const n = e.message || String(e);
  return n.includes("NetworkError") || n.includes("Failed to fetch") || n.includes("network") || n.includes("ECONNREFUSED") || n.includes("Unexpected token") || n.includes("not valid JSON") || n.includes("500") || n.includes("502") || n.includes("503") || n.includes("504");
}
async function Nt() {
  try {
    return await ze();
  } catch (e) {
    if (Y(e)) return Le();
    throw e;
  }
}
async function ve(e) {
  try {
    const n = await Ve(e);
    return n && X(n), n ?? W(e);
  } catch (n) {
    if (Y(n)) return W(e);
    throw n;
  }
}
async function ae(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), X(e);
  try {
    return await Re(e);
  } catch (n) {
    if (Y(n)) return e;
    throw n;
  }
}
async function Ct(e) {
  Je(e);
  try {
    await We(e);
  } catch (n) {
    if (Y(n)) return;
    throw n;
  }
}
async function Xe(e) {
  try {
    const n = await Ke(e);
    return n && X(n), n;
  } catch (n) {
    if (Y(n)) return null;
    throw n;
  }
}
async function At(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = {
    id: crypto.randomUUID(),
    type: "trigger",
    position: { x: 40, y: 120 },
    data: { type: "trigger", triggerType: "manual" }
  }, s = {
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
  X(s);
  try {
    await Re(s);
  } catch (a) {
    if (!Y(a)) throw a;
  }
  return s;
}
const Ye = 500, be = 50;
function Ge(e) {
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
function ee() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
const ge = re(null);
function Dt({
  pipelineId: e,
  children: n
}) {
  const [r, s] = A(null), [a, t] = A(!1), [o, i] = A(null), [c, d] = A([]), [w, h] = A([]), m = V(null);
  q(() => {
    let p = !1;
    return s(null), t(!1), i(null), d([]), h([]), ve(e).then((u) => {
      p || (u && (u.nodes = u.nodes ?? [], u.edges = u.edges ?? []), s(u));
    }), () => {
      p = !0;
    };
  }, [e]), q(() => {
    if (!(!a || !r))
      return m.current && clearTimeout(m.current), m.current = setTimeout(() => {
        ae(r).then(() => t(!1));
      }, Ye), () => {
        m.current && (clearTimeout(m.current), m.current = null);
      };
  }, [r, a]);
  const b = I((p) => {
    d((u) => {
      const g = [
        ...u,
        { nodes: p.nodes, edges: p.edges }
      ];
      return g.length > be && g.shift(), g;
    }), h([]);
  }, []), f = I(
    (p) => {
      let u = null;
      return s((g) => {
        if (!g) return g;
        b(g);
        const k = p(g);
        return u = k, k;
      }), t(!0), u;
    },
    [b]
  ), R = I(
    (p, u) => {
      const g = ee();
      return f((k) => ({
        ...k,
        nodes: [
          ...k.nodes,
          { id: g, type: p, position: u, data: Ge(p) }
        ]
      })), g;
    },
    [f]
  ), y = I(
    (p, u) => {
      f((g) => ({
        ...g,
        nodes: g.nodes.map((k) => k.id === p ? { ...k, ...u } : k)
      }));
    },
    [f]
  ), S = I(
    (p, u) => {
      f((g) => ({
        ...g,
        nodes: g.nodes.map((k) => {
          if (k.id !== p) return k;
          const _ = { ...k.data, ...u };
          return { ...k, data: _ };
        })
      }));
    },
    [f]
  ), v = I(
    (p) => {
      f((u) => ({
        ...u,
        nodes: u.nodes.filter((g) => g.id !== p),
        edges: u.edges.filter((g) => g.source !== p && g.target !== p)
      })), i((u) => u === p ? null : u);
    },
    [f]
  ), P = I(
    (p) => {
      const u = [];
      return f((g) => {
        const k = new Set(p), _ = /* @__PURE__ */ new Map(), Z = g.nodes.filter((O) => k.has(O.id)).map((O) => {
          const ie = ee();
          return _.set(O.id, ie), u.push(ie), {
            ...O,
            id: ie,
            position: { x: O.position.x + 40, y: O.position.y + 40 },
            data: { ...O.data }
          };
        }), Ce = g.edges.filter((O) => k.has(O.source) && k.has(O.target)).map((O) => ({
          ...O,
          id: ee(),
          source: _.get(O.source) ?? O.source,
          target: _.get(O.target) ?? O.target
        }));
        return {
          ...g,
          nodes: [...g.nodes, ...Z],
          edges: [...g.edges, ...Ce]
        };
      }), u;
    },
    [f]
  ), N = I(
    (p) => {
      const u = ee();
      return f((g) => ({
        ...g,
        edges: [...g.edges, { id: u, ...p }]
      })), u;
    },
    [f]
  ), D = I(
    (p) => {
      f((u) => ({
        ...u,
        edges: u.edges.filter((g) => g.id !== p)
      }));
    },
    [f]
  ), l = I(
    (p) => {
      p.length !== 0 && s((u) => {
        if (!u) return u;
        const g = new Map(p.map((_) => [_.id, _.position])), k = {
          ...u,
          nodes: u.nodes.map((_) => {
            const Z = g.get(_.id);
            return Z ? { ..._, position: Z } : _;
          })
        };
        return Be(k), k;
      });
    },
    []
  ), x = I(() => {
    r && (m.current && (clearTimeout(m.current), m.current = null), ae(r).then(() => t(!1)));
  }, [r]), $ = I(() => {
    if (!r) return;
    m.current && (clearTimeout(m.current), m.current = null), (async () => {
      a && (await ae(r), t(!1));
      const u = await Xe(r.id);
      u && s(u);
    })();
  }, [r, a]), E = I(() => {
    ve(e).then((p) => {
      s(p), t(!1), d([]), h([]);
    });
  }, [e]), C = I((p) => {
    const u = p.trim();
    u && (s((g) => !g || g.name === u ? g : { ...g, name: u }), t(!0));
  }, []), U = I((p) => {
    s((u) => !u || u.icon === p ? u : { ...u, icon: p }), t(!0);
  }, []), H = I((p) => {
    s((u) => {
      if (!u) return u;
      const g = u.tags ?? [];
      return g.length === p.length && g.every((k, _) => k === p[_]) ? u : { ...u, tags: [...p] };
    }), t(!0);
  }, []), B = I(() => {
    d((p) => {
      if (p.length === 0 || !r) return p;
      const u = p[p.length - 1];
      return h((g) => [
        ...g,
        { nodes: r.nodes, edges: r.edges }
      ]), s({ ...r, nodes: u.nodes, edges: u.edges }), t(!0), p.slice(0, -1);
    });
  }, [r]), F = I(() => {
    h((p) => {
      if (p.length === 0 || !r) return p;
      const u = p[p.length - 1];
      return d((g) => {
        const k = [
          ...g,
          { nodes: r.nodes, edges: r.edges }
        ];
        return k.length > be && k.shift(), k;
      }), s({ ...r, nodes: u.nodes, edges: u.edges }), t(!0), p.slice(0, -1);
    });
  }, [r]), G = J(
    () => ({
      definition: r,
      dirty: a,
      selectedNodeId: o,
      setSelectedNodeId: i,
      addNode: R,
      updateNode: y,
      updateNodeData: S,
      removeNode: v,
      duplicateNodes: P,
      addEdge: N,
      removeEdge: D,
      setPositions: l,
      save: x,
      publish: $,
      revert: E,
      undo: B,
      redo: F,
      canUndo: c.length > 0,
      canRedo: w.length > 0,
      rename: C,
      setIcon: U,
      setTags: H
    }),
    [
      r,
      a,
      o,
      R,
      y,
      S,
      v,
      P,
      N,
      D,
      l,
      x,
      $,
      E,
      B,
      F,
      c.length,
      w.length,
      C,
      U,
      H
    ]
  );
  return /* @__PURE__ */ T(ge.Provider, { value: G, children: n });
}
function Ot() {
  const e = L(ge);
  if (!e)
    throw new Error(
      "usePipelineEditor must be used within a PipelineEditorProvider"
    );
  return e;
}
async function jt(e, n) {
  const r = `/api/pipelines/${e}/runs/${n}/force-fail`, s = await fetch(r, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });
  if (!s.ok) {
    const a = await s.text();
    throw new Error(`Force-fail failed: ${s.status} ${a}`);
  }
  return s.json();
}
async function Qe(e, n, r, s, a) {
  const t = `/api/pipelines/${e}/runs/${n}/retry/${r}`, o = await fetch(t, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: s, ...a ? { snapshotInput: a } : {} })
  });
  if (!o.ok) {
    const i = await o.text();
    throw new Error(`Failed to retry from node ${r}: ${o.status} ${i}`);
  }
  return o.json();
}
const Ze = "ws_pipeline_runs_v1:", et = 50;
function he(e) {
  return `${Ze}${e}`;
}
let we = !1;
function tt(e, n) {
  try {
    localStorage.setItem(e, n);
  } catch (r) {
    we || (we = !0, console.warn("[runHistory] localStorage write failed", r));
  }
}
function ye(e) {
  try {
    const n = localStorage.getItem(he(e));
    if (!n) return [];
    const r = JSON.parse(n);
    return Array.isArray(r) ? r : [];
  } catch {
    return [];
  }
}
function _t(e, n) {
  return ye(e).find((s) => s.id === n) ?? null;
}
function nt(e, n) {
  const r = ye(e).filter((a) => a.id !== n.id), s = [n, ...r].sort((a, t) => t.startedAt.localeCompare(a.startedAt)).slice(0, et);
  tt(he(e), JSON.stringify(s));
}
function Mt(e) {
  try {
    localStorage.removeItem(he(e));
  } catch {
  }
}
async function Te(e, n) {
  const r = new URLSearchParams();
  n?.limit && r.set("limit", String(n.limit)), n?.cursor && r.set("cursor", n.cursor);
  const s = `/api/pipelines/${e}/runs${r.toString() ? `?${r}` : ""}`;
  try {
    const a = await fetch(s, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
      // Send cookies for auth
    });
    if (!a.ok)
      throw new Error(`Failed to list runs: ${a.status} ${a.statusText}`);
    const t = await a.json();
    return Array.isArray(t.runs) && (t.runs = t.runs.map((o) => ({
      ...o,
      id: o.id ?? o.runId
    })).sort((o, i) => {
      const c = o.startedAt ? new Date(o.startedAt).getTime() : 0;
      return (i.startedAt ? new Date(i.startedAt).getTime() : 0) - c;
    })), t;
  } catch (a) {
    return console.error("[pipelineRuns] Failed to fetch from API:", a), { runs: [] };
  }
}
async function rt(e, n) {
  const r = `/api/v2/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(n)}`;
  try {
    const s = await fetch(r, {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    if (s.status === 404) return null;
    if (!s.ok)
      throw new Error(`Failed to get run: ${s.status} ${s.statusText}`);
    const a = await s.json();
    return { ...a, id: a.runId };
  } catch (s) {
    return console.error("[pipelineRuns] Failed to fetch run:", s), null;
  }
}
const Ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getPipelineRun: rt,
  listPipelineRuns: Te
}, Symbol.toStringTag, { value: "Module" }));
function st() {
  const { idToken: e } = _e(), [n, r] = A(!1), [s, a] = A(null), [t, o] = A(!1), i = "";
  return { triggerRun: I(
    async (d, w, h) => {
      r(!0), a(null), o(!1);
      try {
        const m = W(d), b = {};
        w && (b.triggerPayload = w), m && (b.definition = m);
        const f = {
          "Content-Type": "application/json",
          ...e ? { Authorization: `Bearer ${e}` } : {}
        };
        h?.idempotencyKey && (f["Idempotency-Key"] = h.idempotencyKey);
        const R = await fetch(
          `${i}/api/pipelines/${encodeURIComponent(d)}/runs`,
          {
            method: "POST",
            headers: f,
            body: JSON.stringify(b)
          }
        );
        if (!R.ok) {
          const v = await R.text().catch(() => "");
          return a(
            `Trigger failed (${R.status})${v ? `: ${v}` : ""}`
          ), null;
        }
        const y = typeof R.headers?.get == "function" ? R.headers.get("X-Idempotent-Replay") : R.headers["x-idempotent-replay"] ?? null;
        return o(y === "true"), (await R.json()).runId;
      } catch (m) {
        return a(m.message), null;
      } finally {
        r(!1);
      }
    },
    [i, e]
  ), isTriggering: n, lastError: s, isReplay: t };
}
const ot = Object.freeze({
  // DC-sourced kebab form (after bridge's `:` → `.` mapping) → colon-form in-app key.
  "pipeline.run.resume-from-step": "pipeline:run:resumeFromStep",
  // hub#2223: producer-backed canonical past-tense form. Kebab-from-the-wire
  // already maps directly into the PipelineEventMap key, but keep an explicit
  // identity entry here for documentation purposes (the function below
  // collapses to the input when the alias is the same string).
  "pipeline.run.resumed-from-step": "pipeline.run.resumed-from-step"
});
function it(e) {
  return ot[e] ?? e;
}
function qt({
  channel: e = "pipeline:all",
  onEvent: n,
  enabled: r = !1
}) {
  const { connectionState: s, sendMessage: a, onMessage: t } = pe(), o = V(n);
  q(() => {
    o.current = n;
  }, [n]), q(() => {
    if (!r || s !== "connected") return;
    a({ service: "pipeline", action: "subscribe", channel: e });
    const i = t((c) => {
      if (c.type !== "pipeline:event") return;
      const d = c, w = d.eventType;
      if (!w) return;
      const m = {
        eventType: it(w),
        payload: d.payload,
        seq: typeof d.seq == "number" ? d.seq : 0,
        sourceNodeId: typeof d.sourceNodeId == "string" ? d.sourceNodeId : "unknown",
        emittedAt: typeof d.emittedAt == "number" ? d.emittedAt : Date.now()
      };
      try {
        o.current(m);
      } catch (b) {
        console.error("[WebSocketEventAdapter] onEvent threw", b);
      }
    });
    return () => {
      i(), a({ service: "pipeline", action: "unsubscribe", channel: e });
    };
  }, [r, s, e, a, t]);
}
function te() {
  const e = typeof globalThis < "u" ? globalThis.crypto : void 0;
  return e && typeof e.randomUUID == "function" ? e.randomUUID() : `ws-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function at() {
  const { sendMessage: e } = pe(), n = I(
    (h) => e({ service: "pipeline", action: "subscribe", channel: `pipeline:run:${h}` }),
    [e]
  ), r = I(
    (h) => e({ service: "pipeline", action: "unsubscribe", channel: `pipeline:run:${h}` }),
    [e]
  ), s = I(
    () => e({ service: "pipeline", action: "subscribe", channel: "pipeline:all" }),
    [e]
  ), a = I(
    () => e({ service: "pipeline", action: "unsubscribe", channel: "pipeline:all" }),
    [e]
  ), t = I(
    () => e({ service: "pipeline", action: "subscribe", channel: "pipeline:approvals" }),
    [e]
  ), o = I(
    () => e({ service: "pipeline", action: "unsubscribe", channel: "pipeline:approvals" }),
    [e]
  ), i = I(
    (h, m = {}) => {
      const b = m.correlationId ?? te();
      return e({
        service: "pipeline",
        action: "trigger",
        pipelineId: h,
        ...m.definition ? { definition: m.definition } : {},
        ...m.triggerPayload ? { triggerPayload: m.triggerPayload } : {},
        ...m.triggeredBy ? { triggeredBy: m.triggeredBy } : {},
        correlationId: b
      }), b;
    },
    [e]
  ), c = I(
    (h, m) => {
      const b = m ?? te();
      return e({ service: "pipeline", action: "cancel", runId: h, correlationId: b }), b;
    },
    [e]
  ), d = I(
    (h, m, b, f = {}) => {
      const R = f.correlationId ?? te();
      return e({
        service: "pipeline",
        action: "resolveApproval",
        runId: h,
        stepId: m,
        decision: b,
        ...f.comment ? { comment: f.comment } : {},
        ...f.decidedBy ? { decidedBy: f.decidedBy } : {},
        correlationId: R
      }), R;
    },
    [e]
  ), w = I(
    (h, m, b) => {
      const f = b ?? te();
      return e({
        service: "pipeline",
        action: "resumeFromStep",
        runId: h,
        fromNodeId: m,
        correlationId: f
      }), f;
    },
    [e]
  );
  return {
    subscribeToRun: n,
    unsubscribeFromRun: r,
    subscribeToAll: s,
    unsubscribeFromAll: a,
    subscribeToApprovals: t,
    unsubscribeFromApprovals: o,
    triggerRun: i,
    cancelRun: c,
    resolveApproval: d,
    requestResumeFromStep: w
  };
}
function Lt(e, n = {}) {
  const { enabled: r = !0 } = n, { connectionState: s, sendMessage: a } = pe();
  q(() => {
    if (!r || !e || s !== "connected") return;
    const t = `pipeline:run:${e}`;
    return a({ service: "pipeline", action: "subscribe", channel: t }), () => {
      a({ service: "pipeline", action: "unsubscribe", channel: t });
    };
  }, [r, e, s, a]);
}
const $e = re(null);
function Bt({
  value: e,
  children: n
}) {
  return /* @__PURE__ */ T($e.Provider, { value: e, children: n });
}
function Ee() {
  return L($e);
}
const ue = 20, oe = re(null);
function ct(e, n) {
  return e.steps[n] ?? {
    nodeId: n,
    status: "pending"
  };
}
function M(e, n, r) {
  const s = ct(e, n), a = typeof r == "function" ? r(s) : { ...s, ...r };
  return { ...e, steps: { ...e.steps, [n]: a } };
}
function ut(e) {
  const n = Object.values(e);
  if (n.length <= ue) return e;
  const r = n.filter(
    (i) => i.status === "running" || i.status === "pending" || i.status === "awaiting_approval" || i.status === "paused_at_breakpoint"
  ), a = n.filter(
    (i) => i.status !== "running" && i.status !== "pending" && i.status !== "awaiting_approval" && i.status !== "paused_at_breakpoint"
  ).sort((i, c) => c.startedAt.localeCompare(i.startedAt)).slice(
    0,
    Math.max(0, ue - r.length)
  ), t = [...r, ...a], o = {};
  for (const i of t) o[i.id] = i;
  return o;
}
function Jt({ children: e }) {
  const n = L(ge), { triggerRun: r } = st(), s = at(), [a, t] = A({}), [o, i] = A(!1), c = V(/* @__PURE__ */ new Set()), d = V(null);
  q(() => {
    const l = n?.definition?.id;
    !l || d.current === l || (d.current = l, i(!0), Te(l, { limit: ue }).then((x) => {
      t(($) => {
        const E = { ...$ };
        for (const C of x.runs)
          E[C.id] || (E[C.id] = C);
        return E;
      });
    }).catch((x) => {
      console.error("[PipelineRuns] Failed to load history from API", x), t(($) => {
        const E = { ...$ };
        for (const C of ye(l))
          E[C.id] || (E[C.id] = C);
        return E;
      });
    }).finally(() => i(!1)));
  }, [n?.definition?.id]), Oe("*", (l) => {
    const { eventType: x, payload: $ } = l;
    t((E) => dt(E, x, $));
  }), q(() => {
    for (const l of Object.values(a))
      if ((l.status === "completed" || l.status === "failed" || l.status === "cancelled") && !c.current.has(l.id)) {
        c.current.add(l.id);
        try {
          nt(l.pipelineId, l);
        } catch ($) {
          console.warn("[PipelineRuns] appendRun failed", $);
        }
      }
  }, [a]);
  const w = I(
    async (l, x) => {
      const $ = await r(l, x);
      if (!$)
        throw new Error("Trigger failed (REST POST did not return a runId)");
      return $;
    },
    [r]
  ), h = I(
    (l) => {
      s.cancelRun(l);
    },
    [s]
  ), m = I(
    (l, x, $, E) => {
      s.resolveApproval(l, x, $, { comment: E });
    },
    [s]
  ), b = V(a);
  q(() => {
    b.current = a;
  }, [a]);
  const f = I(
    async (l) => {
      const $ = Object.values(b.current).filter((E) => E.status === "failed").filter((E) => E.steps[l]?.status === "failed").sort((E, C) => C.startedAt.localeCompare(E.startedAt))[0];
      if (!$) {
        console.warn(
          "[PipelineRuns] retryFromStep — no failed run found for node",
          l
        );
        return;
      }
      try {
        await Qe($.pipelineId, $.id, l);
      } catch (E) {
        console.error("[PipelineRuns] retryFromNode API failed", E);
      }
    },
    []
  ), R = I(
    async (l, x, $) => {
      const E = { ...$ ?? {}, __breakpoints: x };
      return w(l, E);
    },
    [w]
  ), y = I(
    (l, x, $ = "continue") => {
      const U = b.current[l]?.pipelineId ?? "unknown";
      fetch(
        `/api/pipelines/${encodeURIComponent(U)}/runs/${encodeURIComponent(l)}/breakpoint/${encodeURIComponent(x)}/resolve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: $ })
        }
      ).catch((H) => {
        console.error("[PipelineRuns] resolveBreakpoint API failed", H);
      });
    },
    []
  ), S = I(
    async (l, x, $, E) => {
      const H = b.current[l]?.pipelineId ?? "unknown", B = `/api/pipelines/${encodeURIComponent(H)}/runs/${encodeURIComponent(l)}/breakpoint/${encodeURIComponent(x)}/patch`, F = await fetch(B, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patch: $, ...E ? { appliedBy: E } : {} })
      });
      if (F.status === 200)
        return await F.json();
      if (F.status === 422) {
        const p = await F.json().catch(() => ({}));
        return p.result ? p.result : {
          patchId: "",
          before: {},
          after: {},
          validation: { ok: !1, reason: p.error ?? "patch rejected" }
        };
      }
      const G = await F.text().catch(() => "");
      throw new Error(`applyContextPatch HTTP ${F.status}: ${G}`);
    },
    []
  ), v = I(
    async (l, x, $) => {
      const U = b.current[l]?.pipelineId ?? "unknown", H = `/api/pipelines/${encodeURIComponent(U)}/runs/${encodeURIComponent(l)}/breakpoint/${encodeURIComponent(x)}/patch/${encodeURIComponent($)}`, B = await fetch(H, { method: "DELETE" });
      if (B.status !== 204) {
        const F = await B.text().catch(() => "");
        throw new Error(`revertContextPatch HTTP ${B.status}: ${F}`);
      }
    },
    []
  ), P = I((l) => {
    t((x) => {
      const $ = x[l.id];
      if ($ && $.status === l.status) {
        const E = Object.keys($.steps).length, C = Object.keys(l.steps).length;
        if (E >= C) return x;
      }
      return { ...x, [l.id]: l };
    });
  }, []), N = J(
    () => Object.values(a).filter(
      (l) => l.status === "running" || l.status === "pending" || l.status === "awaiting_approval" || l.status === "paused_at_breakpoint"
    ).map((l) => l.id),
    [a]
  ), D = J(
    () => ({
      runs: a,
      activeRunIds: N,
      triggerRun: w,
      triggerDebugRun: R,
      cancelRun: h,
      resolveApproval: m,
      resolveBreakpoint: y,
      applyContextPatch: S,
      revertContextPatch: v,
      retryFromStep: f,
      ingestRun: P
    }),
    [
      a,
      N,
      w,
      R,
      h,
      m,
      y,
      S,
      v,
      f,
      P
    ]
  );
  return /* @__PURE__ */ T(oe.Provider, { value: D, children: e });
}
function dt(e, n, r) {
  if (!r || typeof r != "object" || typeof r.runId != "string") return e;
  switch (n) {
    case "pipeline.run.started": {
      const t = r, o = {
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
      return ut({ ...e, [t.runId]: o });
    }
    case "pipeline.run.completed": {
      const t = r, o = e[t.runId];
      return o ? {
        ...e,
        [t.runId]: {
          ...o,
          status: "completed",
          completedAt: t.at,
          durationMs: t.durationMs,
          currentStepIds: []
        }
      } : e;
    }
    case "pipeline.run.failed": {
      const t = r, o = e[t.runId];
      return o ? {
        ...e,
        [t.runId]: {
          ...o,
          status: "failed",
          completedAt: t.at,
          error: t.error,
          currentStepIds: []
        }
      } : e;
    }
    case "pipeline.run.cancelled": {
      const t = r, o = e[t.runId];
      return o ? {
        ...e,
        [t.runId]: {
          ...o,
          status: "cancelled",
          completedAt: t.at,
          currentStepIds: []
        }
      } : e;
    }
    case "pipeline.step.started": {
      const t = r, o = e[t.runId];
      if (!o) return e;
      const i = M(o, t.stepId, (c) => ({
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
      const t = r, o = e[t.runId];
      if (!o) return e;
      const i = M(o, t.stepId, (c) => ({
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
      const t = r, o = e[t.runId];
      if (!o) return e;
      const i = M(o, t.stepId, (c) => ({
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
      const t = r, o = e[t.runId];
      if (!o) return e;
      const i = M(o, t.stepId, (c) => ({
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
      const t = r, o = e[t.runId];
      if (!o) return e;
      const i = M(o, t.stepId, (c) => ({
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
      const t = r, o = e[t.runId];
      return o ? {
        ...e,
        [t.runId]: M(o, t.stepId, (i) => ({
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
      const t = r, o = e[t.runId];
      return o ? {
        ...e,
        [t.runId]: M(o, t.stepId, (i) => {
          const c = Date.parse(t.openedAt), d = {
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
          return d.llm._streamOpenedAtMs = Number.isFinite(c) ? c : Date.now(), d;
        })
      } : e;
    }
    case "pipeline.llm.token": {
      const t = r, o = e[t.runId];
      return o ? {
        ...e,
        [t.runId]: M(o, t.stepId, (i) => {
          const c = i.llm?.tokensOut ?? 0, d = c === 0, w = i.llm?._streamOpenedAtMs, h = Date.parse(t.at), m = d && typeof w == "number" && Number.isFinite(h) ? Math.max(0, h - w) : i.llm?.firstTokenLatencyMs;
          return {
            ...i,
            llm: {
              prompt: i.llm?.prompt ?? "",
              response: (i.llm?.response ?? "") + t.token,
              tokensIn: i.llm?.tokensIn ?? 0,
              tokensOut: c + 1,
              streamOpened: !1,
              ...m !== void 0 ? { firstTokenLatencyMs: m } : {}
            }
          };
        })
      } : e;
    }
    case "pipeline.llm.response": {
      const t = r, o = e[t.runId];
      return o ? {
        ...e,
        [t.runId]: M(o, t.stepId, (i) => ({
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
      const t = r, o = e[t.runId];
      if (!o) return e;
      const i = M(o, t.stepId, (c) => ({
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
      const t = r, o = e[t.runId];
      if (!o) return e;
      const i = n === "pipeline.step.context.patched-unvalidated", c = {
        patchId: t.patchId,
        appliedAt: t.at,
        mode: t.mode,
        ...i ? { unvalidated: !0 } : {}
      };
      return {
        ...e,
        [t.runId]: M(o, t.stepId, (d) => ({
          ...d,
          patches: [...d.patches ?? [], c]
        }))
      };
    }
    case "pipeline.step.context.patch-reverted": {
      const t = r, o = e[t.runId];
      return o ? {
        ...e,
        [t.runId]: M(o, t.stepId, (i) => ({
          ...i,
          patches: (i.patches ?? []).map(
            (c) => c.patchId === t.patchId ? { ...c, revertedAt: t.at } : c
          )
        }))
      } : e;
    }
    case "pipeline.approval.requested": {
      const t = r, o = e[t.runId];
      if (!o) return e;
      const i = M(o, t.stepId, (c) => ({
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
      const t = r, o = e[t.runId];
      if (!o) return e;
      const i = {
        fromNodeId: t.fromNodeId,
        ...t.originalFailedStepId ? { originalFailedStepId: t.originalFailedStepId } : {},
        at: t.at
      };
      return {
        ...e,
        [t.runId]: {
          ...o,
          status: "running",
          replayAttempts: (o.replayAttempts ?? 0) + 1,
          resumeHistory: [...o.resumeHistory ?? [], i]
        }
      };
    }
    case "pipeline.approval.recorded": {
      const t = r, o = e[t.runId];
      if (!o) return e;
      const i = {
        userId: t.userId,
        decision: t.decision,
        at: t.at
      };
      return {
        ...e,
        [t.runId]: M(o, t.stepId, (c) => ({
          ...c,
          approvals: [...c.approvals ?? [], i]
        }))
      };
    }
    default:
      return e;
  }
}
function lt() {
  const e = L(oe);
  if (!e)
    throw new Error(
      "usePipelineRuns must be used within a PipelineRunsProvider"
    );
  return e;
}
function Ht() {
  const e = Ee(), n = L(oe), r = e?.retryFromStep, s = n?.retryFromStep;
  return J(() => r ? async (a) => {
    await r(a);
  } : s ?? (async () => {
  }), [r, s]);
}
function zt(e) {
  const n = Ee(), r = L(oe), s = n?.getLatestStepForNode, a = J(
    () => s ? s(e) : null,
    [s, e]
  ), t = J(() => {
    if (!r) return null;
    let o = null, i = "";
    for (const c of Object.values(r.runs)) {
      const d = c.steps[e];
      d && c.startedAt > i && (o = d, i = c.startedAt);
    }
    return o;
  }, [r, e]);
  return s ? a : t;
}
const K = re(null);
function Vt({
  services: e,
  children: n
}) {
  return /* @__PURE__ */ T(K.Provider, { value: e, children: n });
}
function Wt() {
  const e = L(K);
  if (!e)
    throw new Error(
      "useImageUrl must be called inside <PipelineEditorServicesProvider>. The host editor (e.g. wsg PipelineEditorPage) is responsible for mounting it with its own getImageUrl implementation."
    );
  return e.getImageUrl;
}
function Kt() {
  const e = L(K);
  if (!e)
    throw new Error(
      "usePipelineEditorServices must be called inside <PipelineEditorServicesProvider>."
    );
  return e;
}
function Xt(e) {
  const r = L(K)?.nodeVocabulary?.[e];
  return J(
    () => ({
      label: (s, a) => r?.labels?.[s] ?? a,
      help: (s, a) => r?.help?.[s] ?? a,
      placeholder: (s, a) => r?.placeholders?.[s] ?? a
    }),
    [r]
  );
}
function Yt(e, n) {
  const s = L(K)?.modelOptions?.[e];
  return J(
    // An explicitly empty list is a real answer ("this host runs none"), so it
    // is honoured rather than treated as "unset" and replaced by the defaults.
    () => s ?? n,
    [s, n]
  );
}
function Gt() {
  const n = L(K)?.modelOptions;
  return J(
    () => (r, s) => n?.[r] ?? s,
    [n]
  );
}
function Qt() {
  const n = L(K)?.executableNodeTypes;
  return J(() => {
    if (!n) return () => !0;
    const r = new Set(n);
    return (s) => r.has(s);
  }, [n]);
}
function pt(e) {
  if (e < 60) return `${e}s`;
  const n = Math.floor(e / 60), r = e % 60;
  return `${n}m ${r}s`;
}
function mt({ startedAt: e }) {
  const [n, r] = A(
    () => Math.max(0, Math.floor((Date.now() - e) / 1e3))
  );
  return q(() => {
    const s = () => r(Math.max(0, Math.floor((Date.now() - e) / 1e3)));
    s();
    const a = setInterval(s, 1e3);
    return () => clearInterval(a);
  }, [e]), /* @__PURE__ */ T(
    "span",
    {
      "data-testid": "generative-image-preview-elapsed",
      className: "absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] leading-none text-white/90",
      children: pt(n)
    }
  );
}
function Zt({
  status: e,
  src: n,
  alt: r = "",
  startedAt: s,
  className: a
}) {
  const t = De(), o = V(e), [i, c] = A(!1);
  return o.current !== e && (o.current = e, e === "done" && !t && c(!0)), q(() => {
    if (!i) return;
    const d = setTimeout(() => c(!1), 30);
    return () => clearTimeout(d);
  }, [i]), /* @__PURE__ */ T(
    "div",
    {
      "data-testid": "generative-image-preview",
      "data-status": e,
      className: j("relative overflow-hidden rounded-md bg-surface-hover", a),
      children: e === "synthesizing" ? /* @__PURE__ */ z(Ae, { children: [
        /* @__PURE__ */ T(
          "div",
          {
            "aria-hidden": "true",
            "data-testid": "generative-image-preview-shimmer",
            className: j(
              "absolute inset-0",
              t ? "bg-surface-emphasis" : j(
                "bg-gradient-to-r from-surface-hover via-surface-emphasis to-surface-hover",
                "bg-[length:400px_100%] animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]"
              )
            )
          }
        ),
        !t && /* @__PURE__ */ T(
          "div",
          {
            "aria-hidden": "true",
            "data-testid": "generative-image-preview-sweep",
            className: j(
              "absolute inset-0",
              "bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)]",
              "bg-[length:400px_100%] bg-no-repeat",
              "animate-[skeleton-shimmer_2.4s_linear_infinite]"
            )
          }
        ),
        /* @__PURE__ */ T(
          "span",
          {
            className: j(
              "absolute inset-0 flex items-center justify-center",
              "text-[11px] font-medium tracking-wide text-neutral select-none"
            ),
            children: "✦ synthesizing"
          }
        ),
        s !== void 0 && /* @__PURE__ */ T(mt, { startedAt: s })
      ] }) : n ? /* @__PURE__ */ T(
        "img",
        {
          src: n,
          alt: r,
          "data-testid": "generative-image-preview-img",
          className: j(
            "h-full w-full object-cover",
            !t && "transition-[filter] duration-[400ms] ease-out",
            i ? "blur-[16px]" : "blur-0"
          )
        }
      ) : (
        // 'done' without a src — keep the neutral block rather than a broken img.
        /* @__PURE__ */ T("div", { "aria-hidden": "true", className: "absolute inset-0 bg-surface-emphasis" })
      )
    }
  );
}
class ft extends Error {
  reason;
  result;
  constructor(n, r) {
    super(n), this.name = "PatchValidationRejectedError", this.reason = n, this.result = r;
  }
}
class ke extends Error {
  status;
  body;
  constructor(n, r, s) {
    super(r), this.name = "PatchHttpError", this.status = n, this.body = s;
  }
}
function Ue(e, n, r, s) {
  const t = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(n)}/breakpoint/${encodeURIComponent(r)}/patch`;
  return s ? `${t}/${encodeURIComponent(s)}` : `${t}`;
}
async function en(e, n, r, s, a) {
  const t = await fetch(Ue(e, n, r), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ patch: s, ...a ? { appliedBy: a } : {} })
  });
  if (t.status === 200)
    return await t.json();
  if (t.status === 422) {
    const c = await t.json().catch(() => ({}));
    let d = "patch rejected by validator";
    throw c.result && c.result.validation && c.result.validation.ok === !1 && typeof c.result.validation.reason == "string" ? d = c.result.validation.reason : typeof c.error == "string" && (d = c.error), new ft(d, c.result);
  }
  const o = await t.text().catch(() => "");
  let i;
  try {
    i = JSON.parse(o);
  } catch {
    i = o;
  }
  throw new ke(
    t.status,
    `applyPatch HTTP ${t.status}: ${o}`,
    i
  );
}
async function tn(e, n, r, s) {
  const a = await fetch(Ue(e, n, r, s), {
    method: "DELETE",
    credentials: "include"
  });
  if (a.status === 204) return;
  const t = await a.text().catch(() => "");
  let o;
  try {
    o = JSON.parse(t);
  } catch {
    o = t;
  }
  throw new ke(
    a.status,
    `revertPatch HTTP ${a.status}: ${t}`,
    o
  );
}
const nn = de(
  function({
    value: n,
    onChange: r,
    onClear: s,
    min: a,
    max: t,
    step: o,
    unit: i,
    placeholder: c,
    invalid: d = !1,
    disabled: w = !1,
    size: h = "md",
    "data-testid": m
  }, b) {
    const f = I(
      (v) => {
        let P = v;
        return a !== void 0 && P < a && (P = a), t !== void 0 && P > t && (P = t), P;
      },
      [a, t]
    ), R = I(
      (v) => {
        const P = v.target.value;
        if (P === "" && s) {
          s();
          return;
        }
        const N = parseFloat(P);
        Number.isNaN(N) || r(N);
      },
      [r, s]
    ), y = I(
      (v) => {
        const P = parseFloat(v.target.value);
        if (!Number.isNaN(P)) {
          const N = f(P);
          N !== P && r(N);
        }
      },
      [f, r]
    );
    return /* @__PURE__ */ T(
      xe,
      {
        ref: b,
        type: "number",
        size: h,
        value: n ?? "",
        min: a,
        max: t,
        step: o,
        placeholder: c,
        invalid: d,
        disabled: w,
        suffix: i ? /* @__PURE__ */ T("span", { className: "text-text-tertiary font-sans text-[12px] select-none", children: i }) : void 0,
        "data-testid": m,
        onChange: R,
        onBlur: y
      }
    );
  }
), rn = de(function({
  value: n,
  onChange: r,
  min: s = 0,
  max: a = 100,
  step: t = 1,
  "aria-label": o,
  readout: i = !0,
  disabled: c = !1,
  className: d,
  "data-testid": w
}, h) {
  const m = le(), b = typeof i == "function" ? i(n) : String(n);
  return /* @__PURE__ */ z("div", { className: j("flex items-center gap-2", d), children: [
    /* @__PURE__ */ T(
      "input",
      {
        ref: h,
        id: m,
        type: "range",
        min: s,
        max: a,
        step: t,
        value: n,
        disabled: c,
        "aria-label": o,
        onChange: (f) => r(parseFloat(f.target.value)),
        className: "flex-1 accent-primary cursor-pointer disabled:cursor-not-allowed",
        "data-testid": w
      }
    ),
    i !== !1 && /* @__PURE__ */ T(
      "output",
      {
        htmlFor: m,
        className: "text-xs text-text-secondary tabular-nums min-w-[2.5rem] text-right",
        children: b
      }
    )
  ] });
});
function sn({
  name: e,
  value: n,
  onChange: r,
  options: s,
  disabled: a = !1,
  orientation: t = "vertical",
  "data-testid": o
}) {
  const i = le();
  return /* @__PURE__ */ T(
    "div",
    {
      role: "radiogroup",
      "data-testid": o,
      className: j(
        "flex",
        t === "vertical" ? "flex-col gap-2" : "flex-row flex-wrap gap-x-4 gap-y-2"
      ),
      children: s.map((c, d) => {
        const w = `${i}-${d}`, h = c.value === n;
        return /* @__PURE__ */ z(
          "label",
          {
            htmlFor: w,
            className: j(
              "flex items-start gap-2.5 cursor-pointer select-none",
              a && "opacity-50 cursor-not-allowed"
            ),
            children: [
              /* @__PURE__ */ z("span", { className: "relative flex shrink-0 mt-0.5", children: [
                /* @__PURE__ */ T(
                  "input",
                  {
                    id: w,
                    type: "radio",
                    name: e,
                    value: c.value,
                    checked: h,
                    disabled: a,
                    onChange: () => r(c.value),
                    className: "sr-only peer"
                  }
                ),
                /* @__PURE__ */ T(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: j(
                      "block w-4 h-4 rounded-full border-2 transition-colors duration-150",
                      h ? "border-info bg-white" : "border-border-emphasis bg-white",
                      !a && !h && "peer-hover:border-info",
                      "peer-focus-visible:ring-2 peer-focus-visible:ring-info/40 peer-focus-visible:ring-offset-1"
                    )
                  }
                ),
                h && /* @__PURE__ */ T(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: "absolute inset-0 m-auto block w-2 h-2 rounded-full bg-info"
                  }
                )
              ] }),
              /* @__PURE__ */ z("span", { className: "flex flex-col", children: [
                /* @__PURE__ */ T(
                  "span",
                  {
                    className: j(
                      "text-[13px] leading-5 font-medium",
                      a ? "text-text-tertiary" : "text-text-primary"
                    ),
                    children: c.label
                  }
                ),
                c.description && /* @__PURE__ */ T(
                  "span",
                  {
                    className: j(
                      "text-[11px] leading-4 mt-0.5",
                      a ? "text-text-disabled" : "text-neutral"
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
const gt = {
  sm: "px-1.5 py-0.5 text-[11px]",
  md: "px-2 py-0.5 text-[12px]"
}, on = de(
  function({
    value: n,
    onChange: r,
    samples: s,
    placeholder: a = "$.path.to.value",
    invalid: t = !1,
    errorMessage: o,
    disabled: i = !1,
    size: c = "md",
    enforcePrefix: d = !1,
    "data-testid": w
  }, h) {
    const m = le(), b = d && n.length > 0 && !n.startsWith("$.") ? 'JSONPath must start with "$."' : void 0, f = t || b != null, R = o ?? b;
    return /* @__PURE__ */ z("div", { className: "flex flex-col gap-1 w-full", children: [
      /* @__PURE__ */ T(
        xe,
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
          "data-testid": w,
          "aria-describedby": R ? m : void 0,
          "aria-invalid": f || void 0
        }
      ),
      s && s.length > 0 && /* @__PURE__ */ T("div", { className: "flex flex-wrap gap-1", children: s.map((y) => /* @__PURE__ */ T(
        "button",
        {
          type: "button",
          disabled: i,
          onClick: () => r(y.value),
          className: j(
            "rounded border border-border bg-surface-hover font-mono text-text-secondary",
            "transition-colors duration-100",
            "hover:bg-info-bg hover:border-info-border hover:text-info-fg",
            "focus:outline-none focus:ring-2 focus:ring-info/40",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            gt[c]
          ),
          children: y.label
        },
        y.value
      )) }),
      R && /* @__PURE__ */ T(
        "p",
        {
          id: m,
          role: "alert",
          className: "text-[11px] text-danger-fg leading-4",
          children: R
        }
      )
    ] });
  }
), ht = {
  sm: "w-16",
  md: "w-32",
  lg: "w-48"
}, yt = {
  square: "aspect-square",
  video: "aspect-video",
  auto: ""
};
function It() {
  return /* @__PURE__ */ z(
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
        /* @__PURE__ */ T("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
        /* @__PURE__ */ T("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
        /* @__PURE__ */ T("path", { d: "M21 15l-5-5L5 21" })
      ]
    }
  );
}
function an({
  src: e,
  alt: n,
  size: r = "md",
  aspectRatio: s = "square",
  rounded: a = !1,
  fallback: t,
  loading: o = "lazy",
  className: i,
  "data-testid": c
}) {
  const [d, w] = A("loading");
  return /* @__PURE__ */ z(
    "div",
    {
      "data-testid": c,
      className: j(
        "relative overflow-hidden bg-surface-hover",
        ht[r],
        s !== "auto" && yt[s],
        a ? "rounded-full" : "rounded-md",
        i
      ),
      children: [
        d === "loading" && /* @__PURE__ */ T(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute inset-0 animate-pulse bg-surface-emphasis"
          }
        ),
        d === "error" && /* @__PURE__ */ T("div", { className: "absolute inset-0 flex items-center justify-center bg-surface-hover", children: t ?? /* @__PURE__ */ T(It, {}) }),
        /* @__PURE__ */ T(
          "img",
          {
            src: e,
            alt: n,
            loading: o,
            onLoad: () => w("loaded"),
            onError: () => w("error"),
            className: j(
              "w-full h-full object-cover transition-opacity duration-200",
              d === "loaded" ? "opacity-100" : "opacity-0"
            )
          }
        )
      ]
    }
  );
}
async function cn(e, n, r, s) {
  const a = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(n)}/resume?fromNodeId=${encodeURIComponent(r)}`, t = await fetch(a, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(s ?? {})
  });
  if (!t.ok) {
    const o = await t.text();
    throw new Error(`Failed to resume run ${n} from node ${r}: ${t.status} ${o}`);
  }
  return t.json();
}
function Ne(e) {
  const n = [];
  for (const [r, s] of Object.entries(e))
    if (s != null)
      if (Array.isArray(s)) {
        if (s.length === 0) continue;
        n.push(`${encodeURIComponent(r)}=${encodeURIComponent(s.join(","))}`);
      } else
        n.push(`${encodeURIComponent(r)}=${encodeURIComponent(String(s))}`);
  return n.length > 0 ? `?${n.join("&")}` : "";
}
async function un(e, n, r = {}) {
  const s = Ne({
    since: r.since,
    until: r.until,
    actions: r.actions,
    limit: r.limit,
    cursor: r.cursor
  }), a = `/api/pipelines/${encodeURIComponent(e)}/runs/${encodeURIComponent(n)}/audit${s}`, t = await fetch(a, {
    method: "GET",
    credentials: "include"
  });
  if (!t.ok) {
    const o = await t.text();
    throw new Error(`Failed to load audit log for ${e}/${n}: ${t.status} ${o}`);
  }
  return t.json();
}
async function dn(e) {
  if (!e.actor && !e.pipelineId)
    throw new Error("searchAudit requires at least one of `actor` or `pipelineId`");
  const r = `/api/pipelines/audit/search${Ne({
    actor: e.actor,
    pipelineId: e.pipelineId,
    actions: e.actions,
    since: e.since,
    until: e.until,
    limit: e.limit,
    cursor: e.cursor
  })}`, s = await fetch(r, {
    method: "GET",
    credentials: "include"
  });
  if (!s.ok) {
    const a = await s.text();
    throw new Error(`Audit search failed: ${s.status} ${a}`);
  }
  return s.json();
}
function ne(e, n) {
  return `${e}::${n}`;
}
function ce(e, n) {
  const r = W(e);
  if (!r) return { requiredCount: 1 };
  const s = r.nodes.find((t) => t.id === n);
  if (!s || s.data.type !== "approval") return { requiredCount: 1 };
  const a = s.data;
  return {
    message: a.message,
    requiredCount: Math.max(1, a.requiredCount ?? 1)
  };
}
function vt() {
  const e = je(), n = lt(), [r, s] = A(
    () => {
      const f = {};
      for (const R in n.runs) {
        const y = n.runs[R];
        if (y.status === "awaiting_approval")
          for (const S in y.steps) {
            const v = y.steps[S];
            if (v.status !== "awaiting") continue;
            const P = ce(y.pipelineId, S), D = W(y.pipelineId)?.nodes.find((x) => x.id === S), l = D && D.data.type === "approval" ? D.data.approvers : [];
            f[ne(R, S)] = {
              runId: R,
              pipelineId: y.pipelineId,
              stepId: S,
              approvers: l,
              requestedAt: v.startedAt ?? (/* @__PURE__ */ new Date(0)).toISOString(),
              message: P.message,
              requiredCount: P.requiredCount,
              recordedCount: v.approvals?.filter((x) => x.decision === "approve").length ?? 0
            };
          }
      }
      return f;
    }
  ), [a, t] = A(!0), [o, i] = A(null), [c, d] = A(0), w = V(n.runs);
  q(() => {
    w.current = n.runs;
  }, [n.runs]);
  const h = V(/* @__PURE__ */ new Map());
  q(() => {
    let f = !1;
    t(!0), i(null);
    const R = async () => {
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
        const y = await R();
        if (f) return;
        if (y?.pendingApprovals) {
          const S = {};
          for (const v of y.pendingApprovals) {
            const P = ce(v.pipelineId, v.stepId);
            S[ne(v.runId, v.stepId)] = {
              runId: v.runId,
              pipelineId: v.pipelineId,
              stepId: v.stepId,
              approvers: v.approvers ?? [],
              requestedAt: v.requestedAt,
              message: v.message ?? P.message,
              requiredCount: v.requiredCount ?? P.requiredCount,
              recordedCount: v.recordedCount ?? 0
            };
          }
          s(S);
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
        const S = y;
        h.current.set(S.runId, S.pipelineId);
      })
    ), f.push(
      e.subscribe("pipeline.approval.requested", (y) => {
        const S = y, v = h.current.get(S.runId) ?? w.current[S.runId]?.pipelineId ?? "", P = ce(v, S.stepId);
        s((N) => {
          const D = ne(S.runId, S.stepId);
          return N[D] ? N : {
            ...N,
            [D]: {
              runId: S.runId,
              pipelineId: v,
              stepId: S.stepId,
              approvers: S.approvers,
              requestedAt: S.at,
              message: P.message,
              requiredCount: P.requiredCount,
              recordedCount: 0
            }
          };
        });
      })
    ), f.push(
      e.subscribe("pipeline.approval.recorded", (y) => {
        const S = y, v = ne(S.runId, S.stepId);
        s((P) => {
          const N = P[v];
          if (!N) return P;
          if (S.decision === "reject") {
            const x = { ...P };
            return delete x[v], x;
          }
          const D = (N.recordedCount ?? 0) + 1, l = N.requiredCount ?? 1;
          if (D >= l) {
            const x = { ...P };
            return delete x[v], x;
          }
          return {
            ...P,
            [v]: { ...N, recordedCount: D }
          };
        });
      })
    );
    const R = e.subscribeToApprovals();
    return f.push(R), () => {
      for (const y of f) y();
    };
  }, [e]);
  const m = J(() => Object.values(r).sort(
    (f, R) => R.requestedAt.localeCompare(f.requestedAt)
  ), [r]), b = I(() => {
    d((f) => f + 1);
  }, []);
  return { approvals: m, isLoading: a, error: o, retry: b };
}
function ln() {
  const { approvals: e } = vt();
  return e;
}
export {
  Bt as $,
  Yt as A,
  Xt as B,
  Dt as C,
  kt as D,
  Ut as E,
  Mt as F,
  Zt as G,
  Je as H,
  an as I,
  on as J,
  X as K,
  st as L,
  ve as M,
  nn as N,
  At as O,
  Jt as P,
  Et as Q,
  sn as R,
  rn as S,
  ae as T,
  Ct as U,
  Xe as V,
  ye as W,
  nt as X,
  Lt as Y,
  _t as Z,
  vt as _,
  W as a,
  Ee as a0,
  Ft as a1,
  Nt as b,
  qt as c,
  ln as d,
  ke as e,
  ft as f,
  Vt as g,
  en as h,
  jt as i,
  rt as j,
  un as k,
  Le as l,
  Te as m,
  Qe as n,
  tn as o,
  Wt as p,
  Kt as q,
  cn as r,
  dn as s,
  Qt as t,
  lt as u,
  zt as v,
  Ht as w,
  Ot as x,
  ge as y,
  Gt as z
};
