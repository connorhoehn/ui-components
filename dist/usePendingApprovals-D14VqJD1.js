import { jsx as R, jsxs as V, Fragment as De } from "react/jsx-runtime";
import { createContext as re, useContext as J, useState as D, useRef as B, useEffect as F, useCallback as w, useMemo as W, forwardRef as G, useId as Oe } from "react";
import { c as j } from "./cn-B6yFEsav.js";
import { a as je } from "./ToastProvider-BMqraB3k.js";
import { a as _e, u as Me } from "./EventStreamContext-CjzSHXy-.js";
import { u as Fe } from "./IdentityContext-CLalsm_M.js";
import { u as le } from "./WebSocketContext-DPGFyPeZ.js";
const Se = "ws_pipelines_v1_index", qe = "ws_pipelines_v1:";
function oe(e) {
  return `${qe}${e}`;
}
let Ie = !1;
function pe(e, n) {
  try {
    localStorage.setItem(e, n);
  } catch (r) {
    Ie || (Ie = !0, console.warn("[pipelineStorage] localStorage write failed", r));
  }
}
function me() {
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
  pe(Se, JSON.stringify(e));
}
function Le(e) {
  const n = me(), r = {
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
  Pe(n);
}
function He(e) {
  const n = me().filter((r) => r.id !== e);
  Pe(n);
}
function Be() {
  return me();
}
function K(e) {
  try {
    const n = localStorage.getItem(oe(e));
    return n ? JSON.parse(n) : null;
  } catch {
    return null;
  }
}
function z(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), pe(oe(e.id), JSON.stringify(e)), Le(e);
}
function Je(e) {
  pe(oe(e.id), JSON.stringify(e));
}
function We(e) {
  try {
    localStorage.removeItem(oe(e));
  } catch {
  }
  He(e);
}
function Ct(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), t = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), c = crypto.randomUUID(), u = crypto.randomUUID(), x = crypto.randomUUID(), h = crypto.randomUUID(), d = crypto.randomUUID(), v = crypto.randomUUID(), f = { type: "trigger", triggerType: "manual" }, P = {
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
  }, b = {
    type: "fork",
    branchCount: 2,
    branchLabels: ["post-comment", "notify-user"]
  }, g = {
    type: "action",
    actionType: "post-comment",
    config: { body: "{{context.steps." + o + ".response}}" },
    onError: "route-error"
  }, C = {
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
  }, p = {
    type: "action",
    actionType: "update-document",
    config: { summary: "{{context.steps." + o + ".response}}" },
    onError: "route-error"
  }, A = [
    { id: r, type: "trigger", position: { x: 40, y: 200 }, data: f },
    { id: o, type: "llm", position: { x: 320, y: 200 }, data: P },
    { id: a, type: "condition", position: { x: 620, y: 200 }, data: y },
    { id: t, type: "fork", position: { x: 900, y: 120 }, data: b },
    { id: s, type: "action", position: { x: 1180, y: 60 }, data: g },
    { id: i, type: "action", position: { x: 1180, y: 180 }, data: C },
    { id: c, type: "join", position: { x: 1480, y: 120 }, data: E },
    { id: u, type: "approval", position: { x: 1780, y: 120 }, data: N },
    { id: x, type: "action", position: { x: 2080, y: 120 }, data: p },
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
    { id: d, type: "action", position: { x: 1480, y: 420 }, data: {
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
    { id: v, type: "transform", position: { x: 2380, y: 200 }, data: {
      type: "transform",
      transformType: "template",
      expression: "pipeline-complete",
      outputKey: "pipelineCompletion",
      terminal: !0
    } }
  ], U = (q, X, m, l) => ({
    id: crypto.randomUUID(),
    source: q,
    sourceHandle: X,
    target: m,
    targetHandle: l
  }), H = [
    // Happy path: trigger → llm → condition → fork → (postComment | notify) → join → approval → updateDoc → finalSink
    U(r, "out", o, "in"),
    U(o, "out", a, "in"),
    U(a, "true", t, "in"),
    U(a, "false", h, "in"),
    U(t, "branch-0", s, "in"),
    U(t, "branch-1", i, "in"),
    U(s, "out", c, "in-0"),
    U(i, "out", c, "in-1"),
    U(c, "out", u, "in"),
    U(u, "approved", x, "in"),
    // Terminal `out` paths converge on the final sink. Each leaf wires `out`
    // so DEAD_END only fires for the sink itself.
    U(x, "out", v, "in"),
    U(h, "out", v, "in"),
    // Approval rejection routes through the shared error handler. Wiring
    // `rejected` is hygiene only — there is no UNUSED_APPROVAL_BRANCH lint —
    // but it keeps the rejection path observable.
    U(u, "rejected", d, "in"),
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
    U(o, "error", d, "in"),
    U(x, "error", d, "in"),
    U(h, "error", d, "in"),
    // The error handler itself drains into the final sink on both handles
    // so it is not a dead end and its own `error` handle is wired (silencing
    // NO_ERROR_HANDLER for the error-handler node).
    U(d, "out", v, "in"),
    U(d, "error", v, "in")
  ], L = {
    id: crypto.randomUUID(),
    name: "Document Summary Pipeline (Demo)",
    description: "A showcase pipeline demonstrating LLM summarization, branching, approval, parallel actions, and a shared error handler.",
    icon: "📄",
    version: 0,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "manual" },
    nodes: A,
    edges: H,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
  return z(L), L;
}
function Ut(e, n) {
  const r = K(e);
  if (!r) return null;
  const o = /* @__PURE__ */ new Map(), a = r.nodes.map((c) => {
    const u = crypto.randomUUID();
    return o.set(c.id, u), { ...c, id: u, data: { ...c.data } };
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
  return z(i), i;
}
function At(e) {
  const n = K(e);
  return n ? JSON.stringify(n, null, 2) : null;
}
function Q(e = "") {
  return `/api/pipelines/defs${e}`;
}
const Ke = { "Content-Type": "application/json" };
async function Ve() {
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
async function ze(e) {
  const n = await fetch(Q(`/${encodeURIComponent(e)}`), {
    credentials: "include"
  });
  if (n.status === 404) return null;
  if (!n.ok) throw new Error(`loadPipelineRemote failed (${n.status})`);
  return await n.json();
}
async function Te(e) {
  const n = await fetch(Q(`/${encodeURIComponent(e.id)}`), {
    method: "PUT",
    headers: Ke,
    credentials: "include",
    body: JSON.stringify(e)
  });
  if (!n.ok) throw new Error(`savePipelineRemote failed (${n.status})`);
  return await n.json();
}
async function Ye(e) {
  const n = await fetch(Q(`/${encodeURIComponent(e)}`), {
    method: "DELETE",
    credentials: "include"
  });
  if (!n.ok && n.status !== 404)
    throw new Error(`deletePipelineRemote failed (${n.status})`);
}
async function Xe(e) {
  const n = await fetch(Q(`/${encodeURIComponent(e)}/publish`), {
    method: "POST",
    credentials: "include"
  });
  if (n.status === 404) return null;
  if (!n.ok) throw new Error(`publishPipelineRemote failed (${n.status})`);
  return await n.json();
}
function Y(e) {
  const n = e.message || String(e);
  return n.includes("NetworkError") || n.includes("Failed to fetch") || n.includes("network") || n.includes("ECONNREFUSED") || n.includes("500") || n.includes("502") || n.includes("503") || n.includes("504");
}
async function Nt() {
  try {
    return await Ve();
  } catch (e) {
    if (Y(e)) return Be();
    throw e;
  }
}
async function be(e) {
  try {
    const n = await ze(e);
    return n && z(n), n ?? K(e);
  } catch (n) {
    if (Y(n)) return K(e);
    throw n;
  }
}
async function ae(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), z(e);
  try {
    return await Te(e);
  } catch (n) {
    if (Y(n)) return e;
    throw n;
  }
}
async function Dt(e) {
  We(e);
  try {
    await Ye(e);
  } catch (n) {
    if (Y(n)) return;
    throw n;
  }
}
async function Ge(e) {
  try {
    const n = await Xe(e);
    return n && z(n), n;
  } catch (n) {
    if (Y(n)) return null;
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
  z(o);
  try {
    await Te(o);
  } catch (a) {
    if (!Y(a)) throw a;
  }
  return o;
}
const Qe = 500, ve = 50;
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
function ee() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
const fe = re(null);
function jt({
  pipelineId: e,
  children: n
}) {
  const [r, o] = D(null), [a, t] = D(!1), [s, i] = D(null), [c, u] = D([]), [x, h] = D([]), d = B(null);
  F(() => {
    let m = !1;
    return o(null), t(!1), i(null), u([]), h([]), be(e).then((l) => {
      m || (l && (l.nodes = l.nodes ?? [], l.edges = l.edges ?? []), o(l));
    }), () => {
      m = !0;
    };
  }, [e]), F(() => {
    if (!(!a || !r))
      return d.current && clearTimeout(d.current), d.current = setTimeout(() => {
        ae(r).then(() => t(!1));
      }, Qe), () => {
        d.current && (clearTimeout(d.current), d.current = null);
      };
  }, [r, a]);
  const v = w((m) => {
    u((l) => {
      const I = [
        ...l,
        { nodes: m.nodes, edges: m.edges }
      ];
      return I.length > ve && I.shift(), I;
    }), h([]);
  }, []), f = w(
    (m) => {
      let l = null;
      return o((I) => {
        if (!I) return I;
        v(I);
        const k = m(I);
        return l = k, k;
      }), t(!0), l;
    },
    [v]
  ), P = w(
    (m, l) => {
      const I = ee();
      return f((k) => ({
        ...k,
        nodes: [
          ...k.nodes,
          { id: I, type: m, position: l, data: Ze(m) }
        ]
      })), I;
    },
    [f]
  ), y = w(
    (m, l) => {
      f((I) => ({
        ...I,
        nodes: I.nodes.map((k) => k.id === m ? { ...k, ...l } : k)
      }));
    },
    [f]
  ), b = w(
    (m, l) => {
      f((I) => ({
        ...I,
        nodes: I.nodes.map((k) => {
          if (k.id !== m) return k;
          const _ = { ...k.data, ...l };
          return { ...k, data: _ };
        })
      }));
    },
    [f]
  ), g = w(
    (m) => {
      f((l) => ({
        ...l,
        nodes: l.nodes.filter((I) => I.id !== m),
        edges: l.edges.filter((I) => I.source !== m && I.target !== m)
      })), i((l) => l === m ? null : l);
    },
    [f]
  ), C = w(
    (m) => {
      const l = [];
      return f((I) => {
        const k = new Set(m), _ = /* @__PURE__ */ new Map(), Z = I.nodes.filter((O) => k.has(O.id)).map((O) => {
          const ie = ee();
          return _.set(O.id, ie), l.push(ie), {
            ...O,
            id: ie,
            position: { x: O.position.x + 40, y: O.position.y + 40 },
            data: { ...O.data }
          };
        }), Ne = I.edges.filter((O) => k.has(O.source) && k.has(O.target)).map((O) => ({
          ...O,
          id: ee(),
          source: _.get(O.source) ?? O.source,
          target: _.get(O.target) ?? O.target
        }));
        return {
          ...I,
          nodes: [...I.nodes, ...Z],
          edges: [...I.edges, ...Ne]
        };
      }), l;
    },
    [f]
  ), E = w(
    (m) => {
      const l = ee();
      return f((I) => ({
        ...I,
        edges: [...I.edges, { id: l, ...m }]
      })), l;
    },
    [f]
  ), N = w(
    (m) => {
      f((l) => ({
        ...l,
        edges: l.edges.filter((I) => I.id !== m)
      }));
    },
    [f]
  ), p = w(
    (m) => {
      m.length !== 0 && o((l) => {
        if (!l) return l;
        const I = new Map(m.map((_) => [_.id, _.position])), k = {
          ...l,
          nodes: l.nodes.map((_) => {
            const Z = I.get(_.id);
            return Z ? { ..._, position: Z } : _;
          })
        };
        return Je(k), k;
      });
    },
    []
  ), S = w(() => {
    r && (d.current && (clearTimeout(d.current), d.current = null), ae(r).then(() => t(!1)));
  }, [r]), T = w(() => {
    if (!r) return;
    d.current && (clearTimeout(d.current), d.current = null), (async () => {
      a && (await ae(r), t(!1));
      const l = await Ge(r.id);
      l && o(l);
    })();
  }, [r, a]), $ = w(() => {
    be(e).then((m) => {
      o(m), t(!1), u([]), h([]);
    });
  }, [e]), A = w((m) => {
    const l = m.trim();
    l && (o((I) => !I || I.name === l ? I : { ...I, name: l }), t(!0));
  }, []), U = w((m) => {
    o((l) => !l || l.icon === m ? l : { ...l, icon: m }), t(!0);
  }, []), H = w((m) => {
    o((l) => {
      if (!l) return l;
      const I = l.tags ?? [];
      return I.length === m.length && I.every((k, _) => k === m[_]) ? l : { ...l, tags: [...m] };
    }), t(!0);
  }, []), L = w(() => {
    u((m) => {
      if (m.length === 0 || !r) return m;
      const l = m[m.length - 1];
      return h((I) => [
        ...I,
        { nodes: r.nodes, edges: r.edges }
      ]), o({ ...r, nodes: l.nodes, edges: l.edges }), t(!0), m.slice(0, -1);
    });
  }, [r]), q = w(() => {
    h((m) => {
      if (m.length === 0 || !r) return m;
      const l = m[m.length - 1];
      return u((I) => {
        const k = [
          ...I,
          { nodes: r.nodes, edges: r.edges }
        ];
        return k.length > ve && k.shift(), k;
      }), o({ ...r, nodes: l.nodes, edges: l.edges }), t(!0), m.slice(0, -1);
    });
  }, [r]), X = W(
    () => ({
      definition: r,
      dirty: a,
      selectedNodeId: s,
      setSelectedNodeId: i,
      addNode: P,
      updateNode: y,
      updateNodeData: b,
      removeNode: g,
      duplicateNodes: C,
      addEdge: E,
      removeEdge: N,
      setPositions: p,
      save: S,
      publish: T,
      revert: $,
      undo: L,
      redo: q,
      canUndo: c.length > 0,
      canRedo: x.length > 0,
      rename: A,
      setIcon: U,
      setTags: H
    }),
    [
      r,
      a,
      s,
      P,
      y,
      b,
      g,
      C,
      E,
      N,
      p,
      S,
      T,
      $,
      L,
      q,
      c.length,
      x.length,
      A,
      U,
      H
    ]
  );
  return /* @__PURE__ */ R(fe.Provider, { value: X, children: n });
}
function _t() {
  const e = J(fe);
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
    const a = await o.text();
    throw new Error(`Force-fail failed: ${o.status} ${a}`);
  }
  return o.json();
}
async function et(e, n, r, o, a) {
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
const tt = "ws_pipeline_runs_v1:", nt = 50;
function ge(e) {
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
function he(e) {
  try {
    const n = localStorage.getItem(ge(e));
    if (!n) return [];
    const r = JSON.parse(n);
    return Array.isArray(r) ? r : [];
  } catch {
    return [];
  }
}
function Ft(e, n) {
  return he(e).find((o) => o.id === n) ?? null;
}
function ot(e, n) {
  const r = he(e).filter((a) => a.id !== n.id), o = [n, ...r].sort((a, t) => t.startedAt.localeCompare(a.startedAt)).slice(0, nt);
  rt(ge(e), JSON.stringify(o));
}
function qt(e) {
  try {
    localStorage.removeItem(ge(e));
  } catch {
  }
}
async function $e(e, n) {
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
    const a = await o.json();
    return { ...a, id: a.runId };
  } catch (o) {
    return console.error("[pipelineRuns] Failed to fetch run:", o), null;
  }
}
const Lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getPipelineRun: st,
  listPipelineRuns: $e
}, Symbol.toStringTag, { value: "Module" }));
function it() {
  const { idToken: e } = Fe(), [n, r] = D(!1), [o, a] = D(null), [t, s] = D(!1), i = "";
  return { triggerRun: w(
    async (u, x, h) => {
      r(!0), a(null), s(!1);
      try {
        const d = K(u), v = {};
        x && (v.triggerPayload = x), d && (v.definition = d);
        const f = {
          "Content-Type": "application/json",
          ...e ? { Authorization: `Bearer ${e}` } : {}
        };
        h?.idempotencyKey && (f["Idempotency-Key"] = h.idempotencyKey);
        const P = await fetch(
          `${i}/api/pipelines/${encodeURIComponent(u)}/runs`,
          {
            method: "POST",
            headers: f,
            body: JSON.stringify(v)
          }
        );
        if (!P.ok) {
          const g = await P.text().catch(() => "");
          return a(
            `Trigger failed (${P.status})${g ? `: ${g}` : ""}`
          ), null;
        }
        const y = typeof P.headers?.get == "function" ? P.headers.get("X-Idempotent-Replay") : P.headers["x-idempotent-replay"] ?? null;
        return s(y === "true"), (await P.json()).runId;
      } catch (d) {
        return a(d.message), null;
      } finally {
        r(!1);
      }
    },
    [i, e]
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
  const { connectionState: o, sendMessage: a, onMessage: t } = le(), s = B(n);
  F(() => {
    s.current = n;
  }, [n]), F(() => {
    if (!r || o !== "connected") return;
    a({ service: "pipeline", action: "subscribe", channel: e });
    const i = t((c) => {
      if (c.type !== "pipeline:event") return;
      const u = c, x = u.eventType;
      if (!x) return;
      const d = {
        eventType: ct(x),
        payload: u.payload,
        seq: typeof u.seq == "number" ? u.seq : 0,
        sourceNodeId: typeof u.sourceNodeId == "string" ? u.sourceNodeId : "unknown",
        emittedAt: typeof u.emittedAt == "number" ? u.emittedAt : Date.now()
      };
      try {
        s.current(d);
      } catch (v) {
        console.error("[WebSocketEventAdapter] onEvent threw", v);
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
function ut() {
  const { sendMessage: e } = le(), n = w(
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
    (h, d = {}) => {
      const v = d.correlationId ?? te();
      return e({
        service: "pipeline",
        action: "trigger",
        pipelineId: h,
        ...d.definition ? { definition: d.definition } : {},
        ...d.triggerPayload ? { triggerPayload: d.triggerPayload } : {},
        ...d.triggeredBy ? { triggeredBy: d.triggeredBy } : {},
        correlationId: v
      }), v;
    },
    [e]
  ), c = w(
    (h, d) => {
      const v = d ?? te();
      return e({ service: "pipeline", action: "cancel", runId: h, correlationId: v }), v;
    },
    [e]
  ), u = w(
    (h, d, v, f = {}) => {
      const P = f.correlationId ?? te();
      return e({
        service: "pipeline",
        action: "resolveApproval",
        runId: h,
        stepId: d,
        decision: v,
        ...f.comment ? { comment: f.comment } : {},
        ...f.decidedBy ? { decidedBy: f.decidedBy } : {},
        correlationId: P
      }), P;
    },
    [e]
  ), x = w(
    (h, d, v) => {
      const f = v ?? te();
      return e({
        service: "pipeline",
        action: "resumeFromStep",
        runId: h,
        fromNodeId: d,
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
    resolveApproval: u,
    requestResumeFromStep: x
  };
}
function Bt(e, n = {}) {
  const { enabled: r = !0 } = n, { connectionState: o, sendMessage: a } = le();
  F(() => {
    if (!r || !e || o !== "connected") return;
    const t = `pipeline:run:${e}`;
    return a({ service: "pipeline", action: "subscribe", channel: t }), () => {
      a({ service: "pipeline", action: "unsubscribe", channel: t });
    };
  }, [r, e, o, a]);
}
const Re = re(null);
function Jt({
  value: e,
  children: n
}) {
  return /* @__PURE__ */ R(Re.Provider, { value: e, children: n });
}
function Ee() {
  return J(Re);
}
const de = 20, se = re(null);
function dt(e, n) {
  return e.steps[n] ?? {
    nodeId: n,
    status: "pending"
  };
}
function M(e, n, r) {
  const o = dt(e, n), a = typeof r == "function" ? r(o) : { ...o, ...r };
  return { ...e, steps: { ...e.steps, [n]: a } };
}
function lt(e) {
  const n = Object.values(e);
  if (n.length <= de) return e;
  const r = n.filter(
    (i) => i.status === "running" || i.status === "pending" || i.status === "awaiting_approval" || i.status === "paused_at_breakpoint"
  ), a = n.filter(
    (i) => i.status !== "running" && i.status !== "pending" && i.status !== "awaiting_approval" && i.status !== "paused_at_breakpoint"
  ).sort((i, c) => c.startedAt.localeCompare(i.startedAt)).slice(
    0,
    Math.max(0, de - r.length)
  ), t = [...r, ...a], s = {};
  for (const i of t) s[i.id] = i;
  return s;
}
function Wt({ children: e }) {
  const n = J(fe), { triggerRun: r } = it(), o = ut(), [a, t] = D({}), [s, i] = D(!1), c = B(/* @__PURE__ */ new Set()), u = B(null);
  F(() => {
    const p = n?.definition?.id;
    !p || u.current === p || (u.current = p, i(!0), $e(p, { limit: de }).then((S) => {
      t((T) => {
        const $ = { ...T };
        for (const A of S.runs)
          $[A.id] || ($[A.id] = A);
        return $;
      });
    }).catch((S) => {
      console.error("[PipelineRuns] Failed to load history from API", S), t((T) => {
        const $ = { ...T };
        for (const A of he(p))
          $[A.id] || ($[A.id] = A);
        return $;
      });
    }).finally(() => i(!1)));
  }, [n?.definition?.id]), _e("*", (p) => {
    const { eventType: S, payload: T } = p;
    t(($) => pt($, S, T));
  }), F(() => {
    for (const p of Object.values(a))
      if ((p.status === "completed" || p.status === "failed" || p.status === "cancelled") && !c.current.has(p.id)) {
        c.current.add(p.id);
        try {
          ot(p.pipelineId, p);
        } catch (T) {
          console.warn("[PipelineRuns] appendRun failed", T);
        }
      }
  }, [a]);
  const x = w(
    async (p, S) => {
      const T = await r(p, S);
      if (!T)
        throw new Error("Trigger failed (REST POST did not return a runId)");
      return T;
    },
    [r]
  ), h = w(
    (p) => {
      o.cancelRun(p);
    },
    [o]
  ), d = w(
    (p, S, T, $) => {
      o.resolveApproval(p, S, T, { comment: $ });
    },
    [o]
  ), v = B(a);
  F(() => {
    v.current = a;
  }, [a]);
  const f = w(
    async (p) => {
      const T = Object.values(v.current).filter(($) => $.status === "failed").filter(($) => $.steps[p]?.status === "failed").sort(($, A) => A.startedAt.localeCompare($.startedAt))[0];
      if (!T) {
        console.warn(
          "[PipelineRuns] retryFromStep — no failed run found for node",
          p
        );
        return;
      }
      try {
        await et(T.pipelineId, T.id, p);
      } catch ($) {
        console.error("[PipelineRuns] retryFromNode API failed", $);
      }
    },
    []
  ), P = w(
    async (p, S, T) => {
      const $ = { ...T ?? {}, __breakpoints: S };
      return x(p, $);
    },
    [x]
  ), y = w(
    (p, S, T = "continue") => {
      const U = v.current[p]?.pipelineId ?? "unknown";
      fetch(
        `/api/pipelines/${encodeURIComponent(U)}/runs/${encodeURIComponent(p)}/breakpoint/${encodeURIComponent(S)}/resolve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: T })
        }
      ).catch((H) => {
        console.error("[PipelineRuns] resolveBreakpoint API failed", H);
      });
    },
    []
  ), b = w(
    async (p, S, T, $) => {
      const H = v.current[p]?.pipelineId ?? "unknown", L = `/api/pipelines/${encodeURIComponent(H)}/runs/${encodeURIComponent(p)}/breakpoint/${encodeURIComponent(S)}/patch`, q = await fetch(L, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patch: T, ...$ ? { appliedBy: $ } : {} })
      });
      if (q.status === 200)
        return await q.json();
      if (q.status === 422) {
        const m = await q.json().catch(() => ({}));
        return m.result ? m.result : {
          patchId: "",
          before: {},
          after: {},
          validation: { ok: !1, reason: m.error ?? "patch rejected" }
        };
      }
      const X = await q.text().catch(() => "");
      throw new Error(`applyContextPatch HTTP ${q.status}: ${X}`);
    },
    []
  ), g = w(
    async (p, S, T) => {
      const U = v.current[p]?.pipelineId ?? "unknown", H = `/api/pipelines/${encodeURIComponent(U)}/runs/${encodeURIComponent(p)}/breakpoint/${encodeURIComponent(S)}/patch/${encodeURIComponent(T)}`, L = await fetch(H, { method: "DELETE" });
      if (L.status !== 204) {
        const q = await L.text().catch(() => "");
        throw new Error(`revertContextPatch HTTP ${L.status}: ${q}`);
      }
    },
    []
  ), C = w((p) => {
    t((S) => {
      const T = S[p.id];
      if (T && T.status === p.status) {
        const $ = Object.keys(T.steps).length, A = Object.keys(p.steps).length;
        if ($ >= A) return S;
      }
      return { ...S, [p.id]: p };
    });
  }, []), E = W(
    () => Object.values(a).filter(
      (p) => p.status === "running" || p.status === "pending" || p.status === "awaiting_approval" || p.status === "paused_at_breakpoint"
    ).map((p) => p.id),
    [a]
  ), N = W(
    () => ({
      runs: a,
      activeRunIds: E,
      triggerRun: x,
      triggerDebugRun: P,
      cancelRun: h,
      resolveApproval: d,
      resolveBreakpoint: y,
      applyContextPatch: b,
      revertContextPatch: g,
      retryFromStep: f,
      ingestRun: C
    }),
    [
      a,
      E,
      x,
      P,
      h,
      d,
      y,
      b,
      g,
      f,
      C
    ]
  );
  return /* @__PURE__ */ R(se.Provider, { value: N, children: e });
}
function pt(e, n, r) {
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
      return lt({ ...e, [t.runId]: s });
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
          const c = Date.parse(t.openedAt), u = {
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
          return u.llm._streamOpenedAtMs = Number.isFinite(c) ? c : Date.now(), u;
        })
      } : e;
    }
    case "pipeline.llm.token": {
      const t = r, s = e[t.runId];
      return s ? {
        ...e,
        [t.runId]: M(s, t.stepId, (i) => {
          const c = i.llm?.tokensOut ?? 0, u = c === 0, x = i.llm?._streamOpenedAtMs, h = Date.parse(t.at), d = u && typeof x == "number" && Number.isFinite(h) ? Math.max(0, h - x) : i.llm?.firstTokenLatencyMs;
          return {
            ...i,
            llm: {
              prompt: i.llm?.prompt ?? "",
              response: (i.llm?.response ?? "") + t.token,
              tokensIn: i.llm?.tokensIn ?? 0,
              tokensOut: c + 1,
              streamOpened: !1,
              ...d !== void 0 ? { firstTokenLatencyMs: d } : {}
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
        [t.runId]: M(s, t.stepId, (u) => ({
          ...u,
          patches: [...u.patches ?? [], c]
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
function mt() {
  const e = J(se);
  if (!e)
    throw new Error(
      "usePipelineRuns must be used within a PipelineRunsProvider"
    );
  return e;
}
function Kt() {
  const e = Ee(), n = J(se), r = e?.retryFromStep, o = n?.retryFromStep;
  return W(() => r ? async (a) => {
    await r(a);
  } : o ?? (async () => {
  }), [r, o]);
}
function Vt(e) {
  const n = Ee(), r = J(se), o = n?.getLatestStepForNode, a = W(
    () => o ? o(e) : null,
    [o, e]
  ), t = W(() => {
    if (!r) return null;
    let s = null, i = "";
    for (const c of Object.values(r.runs)) {
      const u = c.steps[e];
      u && c.startedAt > i && (s = u, i = c.startedAt);
    }
    return s;
  }, [r, e]);
  return o ? a : t;
}
const ye = re(null);
function zt({
  services: e,
  children: n
}) {
  return /* @__PURE__ */ R(ye.Provider, { value: e, children: n });
}
function Yt() {
  const e = J(ye);
  if (!e)
    throw new Error(
      "useImageUrl must be called inside <PipelineEditorServicesProvider>. The host editor (e.g. wsg PipelineEditorPage) is responsible for mounting it with its own getImageUrl implementation."
    );
  return e.getImageUrl;
}
function Xt() {
  const e = J(ye);
  if (!e)
    throw new Error(
      "usePipelineEditorServices must be called inside <PipelineEditorServicesProvider>."
    );
  return e;
}
function ft(e) {
  if (e < 60) return `${e}s`;
  const n = Math.floor(e / 60), r = e % 60;
  return `${n}m ${r}s`;
}
function gt({ startedAt: e }) {
  const [n, r] = D(
    () => Math.max(0, Math.floor((Date.now() - e) / 1e3))
  );
  return F(() => {
    const o = () => r(Math.max(0, Math.floor((Date.now() - e) / 1e3)));
    o();
    const a = setInterval(o, 1e3);
    return () => clearInterval(a);
  }, [e]), /* @__PURE__ */ R(
    "span",
    {
      "data-testid": "generative-image-preview-elapsed",
      className: "absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] leading-none text-white/90",
      children: ft(n)
    }
  );
}
function Gt({
  status: e,
  src: n,
  alt: r = "",
  startedAt: o,
  className: a
}) {
  const t = je(), s = B(e), [i, c] = D(!1);
  return s.current !== e && (s.current = e, e === "done" && !t && c(!0)), F(() => {
    if (!i) return;
    const u = setTimeout(() => c(!1), 30);
    return () => clearTimeout(u);
  }, [i]), /* @__PURE__ */ R(
    "div",
    {
      "data-testid": "generative-image-preview",
      "data-status": e,
      className: j("relative overflow-hidden rounded-md bg-surface-hover", a),
      children: e === "synthesizing" ? /* @__PURE__ */ V(De, { children: [
        /* @__PURE__ */ R(
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
        !t && /* @__PURE__ */ R(
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
        /* @__PURE__ */ R(
          "span",
          {
            className: j(
              "absolute inset-0 flex items-center justify-center",
              "text-[11px] font-medium tracking-wide text-neutral select-none"
            ),
            children: "✦ synthesizing"
          }
        ),
        o !== void 0 && /* @__PURE__ */ R(gt, { startedAt: o })
      ] }) : n ? /* @__PURE__ */ R(
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
        /* @__PURE__ */ R("div", { "aria-hidden": "true", className: "absolute inset-0 bg-surface-emphasis" })
      )
    }
  );
}
class ht extends Error {
  reason;
  result;
  constructor(n, r) {
    super(n), this.name = "PatchValidationRejectedError", this.reason = n, this.result = r;
  }
}
class ke extends Error {
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
async function Qt(e, n, r, o, a) {
  const t = await fetch(Ce(e, n, r), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ patch: o, ...a ? { appliedBy: a } : {} })
  });
  if (t.status === 200)
    return await t.json();
  if (t.status === 422) {
    const c = await t.json().catch(() => ({}));
    let u = "patch rejected by validator";
    throw c.result && c.result.validation && c.result.validation.ok === !1 && typeof c.result.validation.reason == "string" ? u = c.result.validation.reason : typeof c.error == "string" && (u = c.error), new ht(u, c.result);
  }
  const s = await t.text().catch(() => "");
  let i;
  try {
    i = JSON.parse(s);
  } catch {
    i = s;
  }
  throw new ke(
    t.status,
    `applyPatch HTTP ${t.status}: ${s}`,
    i
  );
}
async function Zt(e, n, r, o) {
  const a = await fetch(Ce(e, n, r, o), {
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
  throw new ke(
    a.status,
    `revertPatch HTTP ${a.status}: ${t}`,
    s
  );
}
const ce = {
  sm: "h-7 px-2 text-[12px]",
  md: "h-9 px-2.5 text-[13px]"
}, xe = {
  sm: "px-1.5",
  md: "px-2"
}, Ue = G(function({
  type: n = "text",
  size: r = "md",
  prefix: o,
  suffix: a,
  invalid: t = !1,
  disabled: s = !1,
  mono: i = !1,
  className: c,
  "data-testid": u,
  ...x
}, h) {
  const d = o != null, v = a != null;
  return !d && !v ? /* @__PURE__ */ R(
    "input",
    {
      ref: h,
      type: n,
      disabled: s,
      "data-testid": u,
      className: j(
        "w-full rounded-md border bg-surface-panel font-inherit text-text-primary",
        "outline-none transition-colors duration-150",
        "placeholder:text-text-tertiary",
        "focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover",
        t ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis",
        i && "font-mono",
        ce[r],
        c
      ),
      ...x
    }
  ) : /* @__PURE__ */ V(
    "div",
    {
      className: j(
        "relative flex w-full items-center rounded-md border bg-surface-panel",
        "transition-colors duration-150",
        "focus-within:bg-white focus-within:border-info focus-within:ring-1 focus-within:ring-info/40",
        t ? "border-danger focus-within:border-danger focus-within:ring-danger/40" : "border-border-emphasis",
        s && "opacity-50 cursor-not-allowed bg-surface-hover"
      ),
      children: [
        d && /* @__PURE__ */ R(
          "span",
          {
            "aria-hidden": "true",
            className: j(
              "flex shrink-0 items-center text-text-tertiary",
              xe[r]
            ),
            children: o
          }
        ),
        /* @__PURE__ */ R(
          "input",
          {
            ref: h,
            type: n,
            disabled: s,
            "data-testid": u,
            className: j(
              "flex-1 min-w-0 bg-transparent font-inherit text-text-primary outline-none",
              "placeholder:text-text-tertiary",
              "disabled:cursor-not-allowed",
              d ? "pl-0" : ce[r].split(" ")[1],
              v ? "pr-0" : ce[r].split(" ")[2],
              r === "sm" ? "h-7 text-[12px]" : "h-9 text-[13px]",
              i && "font-mono",
              c
            ),
            ...x
          }
        ),
        v && /* @__PURE__ */ R(
          "span",
          {
            "aria-hidden": "true",
            className: j(
              "flex shrink-0 items-center text-text-tertiary",
              xe[r]
            ),
            children: a
          }
        )
      ]
    }
  );
}), yt = {
  sm: "px-1.5 py-0.5 text-[11px]",
  md: "px-2 py-0.5 text-[12px]"
}, en = G(
  function({
    value: n,
    onChange: r,
    samples: o,
    placeholder: a = "$.path.to.value",
    invalid: t = !1,
    errorMessage: s,
    disabled: i = !1,
    size: c = "md",
    enforcePrefix: u = !1,
    "data-testid": x
  }, h) {
    const d = Oe(), v = u && n.length > 0 && !n.startsWith("$.") ? 'JSONPath must start with "$."' : void 0, f = t || v != null, P = s ?? v;
    return /* @__PURE__ */ V("div", { className: "flex flex-col gap-1 w-full", children: [
      /* @__PURE__ */ R(
        Ue,
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
          "data-testid": x,
          "aria-describedby": P ? d : void 0,
          "aria-invalid": f || void 0
        }
      ),
      o && o.length > 0 && /* @__PURE__ */ R("div", { className: "flex flex-wrap gap-1", children: o.map((y) => /* @__PURE__ */ R(
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
            yt[c]
          ),
          children: y.label
        },
        y.value
      )) }),
      P && /* @__PURE__ */ R(
        "p",
        {
          id: d,
          role: "alert",
          className: "text-[11px] text-danger-fg leading-4",
          children: P
        }
      )
    ] });
  }
), tn = G(
  function({
    value: n,
    onChange: r,
    min: o,
    max: a,
    step: t,
    unit: s,
    placeholder: i,
    invalid: c = !1,
    disabled: u = !1,
    size: x = "md",
    "data-testid": h
  }, d) {
    const v = w(
      (b) => {
        let g = b;
        return o !== void 0 && g < o && (g = o), a !== void 0 && g > a && (g = a), g;
      },
      [o, a]
    ), f = w(
      (b) => {
        const g = parseFloat(b.target.value);
        Number.isNaN(g) || r(g);
      },
      [r]
    ), P = w(
      (b) => {
        const g = parseFloat(b.target.value);
        if (!Number.isNaN(g)) {
          const C = v(g);
          C !== g && r(C);
        }
      },
      [v, r]
    );
    return /* @__PURE__ */ R(
      Ue,
      {
        ref: d,
        type: "number",
        size: x,
        value: n,
        min: o,
        max: a,
        step: t,
        placeholder: i,
        invalid: c,
        disabled: u,
        suffix: s ? /* @__PURE__ */ R("span", { className: "text-text-tertiary font-sans text-[12px] select-none", children: s }) : void 0,
        "data-testid": h,
        onChange: f,
        onBlur: P
      }
    );
  }
), It = {
  sm: "h-7 px-2 text-[12px]",
  md: "h-9 px-2.5 text-[13px]"
}, nn = G(function({
  options: n,
  placeholder: r,
  size: o = "md",
  invalid: a = !1,
  disabled: t = !1,
  className: s,
  "data-testid": i,
  value: c,
  ...u
}, x) {
  return /* @__PURE__ */ V(
    "select",
    {
      ref: x,
      disabled: t,
      "data-testid": i,
      value: c,
      className: j(
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
        a ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis",
        It[o],
        s
      ),
      ...u,
      children: [
        r && /* @__PURE__ */ R("option", { value: "", disabled: !0, children: r }),
        n.map((h) => /* @__PURE__ */ R("option", { value: h.value, disabled: h.disabled, children: h.label }, h.value))
      ]
    }
  );
}), bt = {
  sm: "w-16",
  md: "w-32",
  lg: "w-48"
}, vt = {
  square: "aspect-square",
  video: "aspect-video",
  auto: ""
};
function wt() {
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
        /* @__PURE__ */ R("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
        /* @__PURE__ */ R("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
        /* @__PURE__ */ R("path", { d: "M21 15l-5-5L5 21" })
      ]
    }
  );
}
function rn({
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
  const [u, x] = D("loading");
  return /* @__PURE__ */ V(
    "div",
    {
      "data-testid": c,
      className: j(
        "relative overflow-hidden bg-surface-hover",
        bt[r],
        o !== "auto" && vt[o],
        a ? "rounded-full" : "rounded-md",
        i
      ),
      children: [
        u === "loading" && /* @__PURE__ */ R(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute inset-0 animate-pulse bg-surface-emphasis"
          }
        ),
        u === "error" && /* @__PURE__ */ R("div", { className: "absolute inset-0 flex items-center justify-center bg-surface-hover", children: t ?? /* @__PURE__ */ R(wt, {}) }),
        /* @__PURE__ */ R(
          "img",
          {
            src: e,
            alt: n,
            loading: s,
            onLoad: () => x("loaded"),
            onError: () => x("error"),
            className: j(
              "w-full h-full object-cover transition-opacity duration-200",
              u === "loaded" ? "opacity-100" : "opacity-0"
            )
          }
        )
      ]
    }
  );
}
const on = G(
  function({
    rows: n,
    minRows: r = 2,
    maxRows: o,
    autoResize: a = !1,
    invalid: t = !1,
    disabled: s = !1,
    onChange: i,
    value: c,
    className: u,
    "data-testid": x,
    ...h
  }, d) {
    const v = B(null), f = w(
      (E) => {
        v.current = E, typeof d == "function" ? d(E) : d && (d.current = E);
      },
      [d]
    ), P = 20, y = 12, b = w(() => {
      const E = v.current;
      if (!E || !a) return;
      E.style.height = "auto";
      const N = r * P + y, p = E.scrollHeight, S = o ? o * P + y : 1 / 0;
      E.style.height = `${Math.min(Math.max(p, N), S)}px`, E.style.overflowY = p > S ? "auto" : "hidden";
    }, [a, r, o]);
    F(() => {
      b();
    }, [c, b]);
    const g = w(
      (E) => {
        b(), i?.(E);
      },
      [i, b]
    );
    return /* @__PURE__ */ R(
      "textarea",
      {
        ref: f,
        rows: a ? void 0 : n ?? r,
        disabled: s,
        "data-testid": x,
        value: c,
        onChange: g,
        className: j(
          "w-full rounded-md border bg-surface-panel font-inherit text-text-primary",
          "outline-none transition-colors duration-150 px-2.5 py-1.5 text-[13px] leading-5",
          "placeholder:text-text-tertiary",
          "focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover",
          !a && "resize-y",
          a && "resize-none overflow-hidden",
          t ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis",
          u
        ),
        style: a ? { minHeight: `${r * P + y}px` } : void 0,
        ...h
      }
    );
  }
);
async function sn(e, n, r, o) {
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
async function an(e, n, r = {}) {
  const o = Ae({
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
async function cn(e) {
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
    const a = await o.text();
    throw new Error(`Audit search failed: ${o.status} ${a}`);
  }
  return o.json();
}
function ne(e, n) {
  return `${e}::${n}`;
}
function ue(e, n) {
  const r = K(e);
  if (!r) return { requiredCount: 1 };
  const o = r.nodes.find((t) => t.id === n);
  if (!o || o.data.type !== "approval") return { requiredCount: 1 };
  const a = o.data;
  return {
    message: a.message,
    requiredCount: Math.max(1, a.requiredCount ?? 1)
  };
}
function xt() {
  const e = Me(), n = mt(), [r, o] = D(
    () => {
      const f = {};
      for (const P in n.runs) {
        const y = n.runs[P];
        if (y.status === "awaiting_approval")
          for (const b in y.steps) {
            const g = y.steps[b];
            if (g.status !== "awaiting") continue;
            const C = ue(y.pipelineId, b), N = K(y.pipelineId)?.nodes.find((S) => S.id === b), p = N && N.data.type === "approval" ? N.data.approvers : [];
            f[ne(P, b)] = {
              runId: P,
              pipelineId: y.pipelineId,
              stepId: b,
              approvers: p,
              requestedAt: g.startedAt ?? (/* @__PURE__ */ new Date(0)).toISOString(),
              message: C.message,
              requiredCount: C.requiredCount,
              recordedCount: g.approvals?.filter((S) => S.decision === "approve").length ?? 0
            };
          }
      }
      return f;
    }
  ), [a, t] = D(!0), [s, i] = D(null), [c, u] = D(0), x = B(n.runs);
  F(() => {
    x.current = n.runs;
  }, [n.runs]);
  const h = B(/* @__PURE__ */ new Map());
  F(() => {
    let f = !1;
    t(!0), i(null);
    const P = async () => {
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
        const y = await P();
        if (f) return;
        if (y?.pendingApprovals) {
          const b = {};
          for (const g of y.pendingApprovals) {
            const C = ue(g.pipelineId, g.stepId);
            b[ne(g.runId, g.stepId)] = {
              runId: g.runId,
              pipelineId: g.pipelineId,
              stepId: g.stepId,
              approvers: g.approvers ?? [],
              requestedAt: g.requestedAt,
              message: g.message ?? C.message,
              requiredCount: g.requiredCount ?? C.requiredCount,
              recordedCount: g.recordedCount ?? 0
            };
          }
          o(b);
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
  }, [c]), F(() => {
    const f = [];
    f.push(
      e.subscribe("pipeline.run.started", (y) => {
        const b = y;
        h.current.set(b.runId, b.pipelineId);
      })
    ), f.push(
      e.subscribe("pipeline.approval.requested", (y) => {
        const b = y, g = h.current.get(b.runId) ?? x.current[b.runId]?.pipelineId ?? "", C = ue(g, b.stepId);
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
              message: C.message,
              requiredCount: C.requiredCount,
              recordedCount: 0
            }
          };
        });
      })
    ), f.push(
      e.subscribe("pipeline.approval.recorded", (y) => {
        const b = y, g = ne(b.runId, b.stepId);
        o((C) => {
          const E = C[g];
          if (!E) return C;
          if (b.decision === "reject") {
            const S = { ...C };
            return delete S[g], S;
          }
          const N = (E.recordedCount ?? 0) + 1, p = E.requiredCount ?? 1;
          if (N >= p) {
            const S = { ...C };
            return delete S[g], S;
          }
          return {
            ...C,
            [g]: { ...E, recordedCount: N }
          };
        });
      })
    );
    const P = e.subscribeToApprovals();
    return f.push(P), () => {
      for (const y of f) y();
    };
  }, [e]);
  const d = W(() => Object.values(r).sort(
    (f, P) => P.requestedAt.localeCompare(f.requestedAt)
  ), [r]), v = w(() => {
    u((f) => f + 1);
  }, []);
  return { approvals: d, isLoading: a, error: s, retry: v };
}
function un() {
  const { approvals: e } = xt();
  return e;
}
export {
  Ut as A,
  At as B,
  qt as C,
  We as D,
  z as E,
  it as F,
  Gt as G,
  be as H,
  rn as I,
  en as J,
  Ot as K,
  Ct as L,
  ae as M,
  tn as N,
  Dt as O,
  Wt as P,
  Ge as Q,
  he as R,
  nn as S,
  on as T,
  ot as U,
  Bt as V,
  Ft as W,
  xt as X,
  Jt as Y,
  Ee as Z,
  Lt as _,
  K as a,
  Nt as b,
  Ht as c,
  un as d,
  Ue as e,
  ke as f,
  ht as g,
  zt as h,
  Qt as i,
  Mt as j,
  st as k,
  Be as l,
  an as m,
  $e as n,
  et as o,
  Zt as p,
  Yt as q,
  sn as r,
  cn as s,
  Xt as t,
  mt as u,
  Vt as v,
  Kt as w,
  _t as x,
  fe as y,
  jt as z
};
