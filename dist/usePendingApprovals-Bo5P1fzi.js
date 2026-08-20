import { jsx as T, jsxs as V, Fragment as Oe } from "react/jsx-runtime";
import { createContext as oe, useContext as L, useState as O, useRef as W, useEffect as F, useCallback as I, useMemo as B, forwardRef as Q, useId as Se } from "react";
import { c as U } from "./cn-B6yFEsav.js";
import { b as je } from "./ToastProvider-D3MHbP-u.js";
import { a as _e, u as Me } from "./EventStreamContext-CjzSHXy-.js";
import { u as Fe } from "./IdentityContext-CLalsm_M.js";
import { u as pe } from "./WebSocketContext-DPGFyPeZ.js";
const Pe = "ws_pipelines_v1_index", qe = "ws_pipelines_v1:";
function se(e) {
  return `${qe}${e}`;
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
    const e = localStorage.getItem(Pe);
    if (!e) return [];
    const n = JSON.parse(e);
    return Array.isArray(n) ? n : [];
  } catch {
    return [];
  }
}
function Te(e) {
  me(Pe, JSON.stringify(e));
}
function Le(e) {
  const n = fe(), r = {
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
  const n = fe().filter((r) => r.id !== e);
  Te(n);
}
function Be() {
  return fe();
}
function K(e) {
  try {
    const n = localStorage.getItem(se(e));
    return n ? JSON.parse(n) : null;
  } catch {
    return null;
  }
}
function Y(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), me(se(e.id), JSON.stringify(e)), Le(e);
}
function Je(e) {
  me(se(e.id), JSON.stringify(e));
}
function Ve(e) {
  try {
    localStorage.removeItem(se(e));
  } catch {
  }
  He(e);
}
function Nt(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), t = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), c = crypto.randomUUID(), u = crypto.randomUUID(), v = crypto.randomUUID(), g = crypto.randomUUID(), d = crypto.randomUUID(), b = crypto.randomUUID(), f = { type: "trigger", triggerType: "manual" }, P = {
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
    { id: o, type: "llm", position: { x: 320, y: 200 }, data: P },
    { id: s, type: "condition", position: { x: 620, y: 200 }, data: h },
    { id: t, type: "fork", position: { x: 900, y: 120 }, data: w },
    { id: i, type: "action", position: { x: 1180, y: 60 }, data: x },
    { id: a, type: "action", position: { x: 1180, y: 180 }, data: $ },
    { id: c, type: "join", position: { x: 1480, y: 120 }, data: k },
    { id: u, type: "approval", position: { x: 1780, y: 120 }, data: D },
    { id: v, type: "action", position: { x: 2080, y: 120 }, data: p },
    { id: g, type: "action", position: { x: 900, y: 320 }, data: {
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
    { id: b, type: "transform", position: { x: 2380, y: 200 }, data: {
      type: "transform",
      transformType: "template",
      expression: "pipeline-complete",
      outputKey: "pipelineCompletion",
      terminal: !0
    } }
  ], C = (q, G, m, l) => ({
    id: crypto.randomUUID(),
    source: q,
    sourceHandle: G,
    target: m,
    targetHandle: l
  }), J = [
    // Happy path: trigger → llm → condition → fork → (postComment | notify) → join → approval → updateDoc → finalSink
    C(r, "out", o, "in"),
    C(o, "out", s, "in"),
    C(s, "true", t, "in"),
    C(s, "false", g, "in"),
    C(t, "branch-0", i, "in"),
    C(t, "branch-1", a, "in"),
    C(i, "out", c, "in-0"),
    C(a, "out", c, "in-1"),
    C(c, "out", u, "in"),
    C(u, "approved", v, "in"),
    // Terminal `out` paths converge on the final sink. Each leaf wires `out`
    // so DEAD_END only fires for the sink itself.
    C(v, "out", b, "in"),
    C(g, "out", b, "in"),
    // Approval rejection routes through the shared error handler. Wiring
    // `rejected` is hygiene only — there is no UNUSED_APPROVAL_BRANCH lint —
    // but it keeps the rejection path observable.
    C(u, "rejected", d, "in"),
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
    C(o, "error", d, "in"),
    C(v, "error", d, "in"),
    C(g, "error", d, "in"),
    // The error handler itself drains into the final sink on both handles
    // so it is not a dead end and its own `error` handle is wired (silencing
    // NO_ERROR_HANDLER for the error-handler node).
    C(d, "out", b, "in"),
    C(d, "error", b, "in")
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
  return Y(H), H;
}
function Ct(e, n) {
  const r = K(e);
  if (!r) return null;
  const o = /* @__PURE__ */ new Map(), s = r.nodes.map((c) => {
    const u = crypto.randomUUID();
    return o.set(c.id, u), { ...c, id: u, data: { ...c.data } };
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
  return Y(a), a;
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
function X(e) {
  if (e instanceof SyntaxError) return !0;
  const n = e.message || String(e);
  return n.includes("NetworkError") || n.includes("Failed to fetch") || n.includes("network") || n.includes("ECONNREFUSED") || n.includes("Unexpected token") || n.includes("not valid JSON") || n.includes("500") || n.includes("502") || n.includes("503") || n.includes("504");
}
async function At() {
  try {
    return await Ke();
  } catch (e) {
    if (X(e)) return Be();
    throw e;
  }
}
async function be(e) {
  try {
    const n = await ze(e);
    return n && Y(n), n ?? K(e);
  } catch (n) {
    if (X(n)) return K(e);
    throw n;
  }
}
async function ce(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), Y(e);
  try {
    return await $e(e);
  } catch (n) {
    if (X(n)) return e;
    throw n;
  }
}
async function Dt(e) {
  Ve(e);
  try {
    await Ye(e);
  } catch (n) {
    if (X(n)) return;
    throw n;
  }
}
async function Ge(e) {
  try {
    const n = await Xe(e);
    return n && Y(n), n;
  } catch (n) {
    if (X(n)) return null;
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
  Y(o);
  try {
    await $e(o);
  } catch (s) {
    if (!X(s)) throw s;
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
function te() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
const ge = oe(null);
function jt({
  pipelineId: e,
  children: n
}) {
  const [r, o] = O(null), [s, t] = O(!1), [i, a] = O(null), [c, u] = O([]), [v, g] = O([]), d = W(null);
  F(() => {
    let m = !1;
    return o(null), t(!1), a(null), u([]), g([]), be(e).then((l) => {
      m || (l && (l.nodes = l.nodes ?? [], l.edges = l.edges ?? []), o(l));
    }), () => {
      m = !0;
    };
  }, [e]), F(() => {
    if (!(!s || !r))
      return d.current && clearTimeout(d.current), d.current = setTimeout(() => {
        ce(r).then(() => t(!1));
      }, Qe), () => {
        d.current && (clearTimeout(d.current), d.current = null);
      };
  }, [r, s]);
  const b = I((m) => {
    u((l) => {
      const y = [
        ...l,
        { nodes: m.nodes, edges: m.edges }
      ];
      return y.length > ve && y.shift(), y;
    }), g([]);
  }, []), f = I(
    (m) => {
      let l = null;
      return o((y) => {
        if (!y) return y;
        b(y);
        const N = m(y);
        return l = N, N;
      }), t(!0), l;
    },
    [b]
  ), P = I(
    (m, l) => {
      const y = te();
      return f((N) => ({
        ...N,
        nodes: [
          ...N.nodes,
          { id: y, type: m, position: l, data: Ze(m) }
        ]
      })), y;
    },
    [f]
  ), h = I(
    (m, l) => {
      f((y) => ({
        ...y,
        nodes: y.nodes.map((N) => N.id === m ? { ...N, ...l } : N)
      }));
    },
    [f]
  ), w = I(
    (m, l) => {
      f((y) => ({
        ...y,
        nodes: y.nodes.map((N) => {
          if (N.id !== m) return N;
          const _ = { ...N.data, ...l };
          return { ...N, data: _ };
        })
      }));
    },
    [f]
  ), x = I(
    (m) => {
      f((l) => ({
        ...l,
        nodes: l.nodes.filter((y) => y.id !== m),
        edges: l.edges.filter((y) => y.source !== m && y.target !== m)
      })), a((l) => l === m ? null : l);
    },
    [f]
  ), $ = I(
    (m) => {
      const l = [];
      return f((y) => {
        const N = new Set(m), _ = /* @__PURE__ */ new Map(), ee = y.nodes.filter((j) => N.has(j.id)).map((j) => {
          const ae = te();
          return _.set(j.id, ae), l.push(ae), {
            ...j,
            id: ae,
            position: { x: j.position.x + 40, y: j.position.y + 40 },
            data: { ...j.data }
          };
        }), De = y.edges.filter((j) => N.has(j.source) && N.has(j.target)).map((j) => ({
          ...j,
          id: te(),
          source: _.get(j.source) ?? j.source,
          target: _.get(j.target) ?? j.target
        }));
        return {
          ...y,
          nodes: [...y.nodes, ...ee],
          edges: [...y.edges, ...De]
        };
      }), l;
    },
    [f]
  ), k = I(
    (m) => {
      const l = te();
      return f((y) => ({
        ...y,
        edges: [...y.edges, { id: l, ...m }]
      })), l;
    },
    [f]
  ), D = I(
    (m) => {
      f((l) => ({
        ...l,
        edges: l.edges.filter((y) => y.id !== m)
      }));
    },
    [f]
  ), p = I(
    (m) => {
      m.length !== 0 && o((l) => {
        if (!l) return l;
        const y = new Map(m.map((_) => [_.id, _.position])), N = {
          ...l,
          nodes: l.nodes.map((_) => {
            const ee = y.get(_.id);
            return ee ? { ..._, position: ee } : _;
          })
        };
        return Je(N), N;
      });
    },
    []
  ), S = I(() => {
    r && (d.current && (clearTimeout(d.current), d.current = null), ce(r).then(() => t(!1)));
  }, [r]), R = I(() => {
    if (!r) return;
    d.current && (clearTimeout(d.current), d.current = null), (async () => {
      s && (await ce(r), t(!1));
      const l = await Ge(r.id);
      l && o(l);
    })();
  }, [r, s]), E = I(() => {
    be(e).then((m) => {
      o(m), t(!1), u([]), g([]);
    });
  }, [e]), A = I((m) => {
    const l = m.trim();
    l && (o((y) => !y || y.name === l ? y : { ...y, name: l }), t(!0));
  }, []), C = I((m) => {
    o((l) => !l || l.icon === m ? l : { ...l, icon: m }), t(!0);
  }, []), J = I((m) => {
    o((l) => {
      if (!l) return l;
      const y = l.tags ?? [];
      return y.length === m.length && y.every((N, _) => N === m[_]) ? l : { ...l, tags: [...m] };
    }), t(!0);
  }, []), H = I(() => {
    u((m) => {
      if (m.length === 0 || !r) return m;
      const l = m[m.length - 1];
      return g((y) => [
        ...y,
        { nodes: r.nodes, edges: r.edges }
      ]), o({ ...r, nodes: l.nodes, edges: l.edges }), t(!0), m.slice(0, -1);
    });
  }, [r]), q = I(() => {
    g((m) => {
      if (m.length === 0 || !r) return m;
      const l = m[m.length - 1];
      return u((y) => {
        const N = [
          ...y,
          { nodes: r.nodes, edges: r.edges }
        ];
        return N.length > ve && N.shift(), N;
      }), o({ ...r, nodes: l.nodes, edges: l.edges }), t(!0), m.slice(0, -1);
    });
  }, [r]), G = B(
    () => ({
      definition: r,
      dirty: s,
      selectedNodeId: i,
      setSelectedNodeId: a,
      addNode: P,
      updateNode: h,
      updateNodeData: w,
      removeNode: x,
      duplicateNodes: $,
      addEdge: k,
      removeEdge: D,
      setPositions: p,
      save: S,
      publish: R,
      revert: E,
      undo: H,
      redo: q,
      canUndo: c.length > 0,
      canRedo: v.length > 0,
      rename: A,
      setIcon: C,
      setTags: J
    }),
    [
      r,
      s,
      i,
      P,
      h,
      w,
      x,
      $,
      k,
      D,
      p,
      S,
      R,
      E,
      H,
      q,
      c.length,
      v.length,
      A,
      C,
      J
    ]
  );
  return /* @__PURE__ */ T(ge.Provider, { value: G, children: n });
}
function _t() {
  const e = L(ge);
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
function he(e) {
  return `${tt}${e}`;
}
let xe = !1;
function rt(e, n) {
  try {
    localStorage.setItem(e, n);
  } catch (r) {
    xe || (xe = !0, console.warn("[runHistory] localStorage write failed", r));
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
function Ft(e, n) {
  return ye(e).find((o) => o.id === n) ?? null;
}
function ot(e, n) {
  const r = ye(e).filter((s) => s.id !== n.id), o = [n, ...r].sort((s, t) => t.startedAt.localeCompare(s.startedAt)).slice(0, nt);
  rt(he(e), JSON.stringify(o));
}
function qt(e) {
  try {
    localStorage.removeItem(he(e));
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
  return { triggerRun: I(
    async (u, v, g) => {
      r(!0), s(null), i(!1);
      try {
        const d = K(u), b = {};
        v && (b.triggerPayload = v), d && (b.definition = d);
        const f = {
          "Content-Type": "application/json",
          ...e ? { Authorization: `Bearer ${e}` } : {}
        };
        g?.idempotencyKey && (f["Idempotency-Key"] = g.idempotencyKey);
        const P = await fetch(
          `${a}/api/pipelines/${encodeURIComponent(u)}/runs`,
          {
            method: "POST",
            headers: f,
            body: JSON.stringify(b)
          }
        );
        if (!P.ok) {
          const x = await P.text().catch(() => "");
          return s(
            `Trigger failed (${P.status})${x ? `: ${x}` : ""}`
          ), null;
        }
        const h = typeof P.headers?.get == "function" ? P.headers.get("X-Idempotent-Replay") : P.headers["x-idempotent-replay"] ?? null;
        return i(h === "true"), (await P.json()).runId;
      } catch (d) {
        return s(d.message), null;
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
  const { connectionState: o, sendMessage: s, onMessage: t } = pe(), i = W(n);
  F(() => {
    i.current = n;
  }, [n]), F(() => {
    if (!r || o !== "connected") return;
    s({ service: "pipeline", action: "subscribe", channel: e });
    const a = t((c) => {
      if (c.type !== "pipeline:event") return;
      const u = c, v = u.eventType;
      if (!v) return;
      const d = {
        eventType: ct(v),
        payload: u.payload,
        seq: typeof u.seq == "number" ? u.seq : 0,
        sourceNodeId: typeof u.sourceNodeId == "string" ? u.sourceNodeId : "unknown",
        emittedAt: typeof u.emittedAt == "number" ? u.emittedAt : Date.now()
      };
      try {
        i.current(d);
      } catch (b) {
        console.error("[WebSocketEventAdapter] onEvent threw", b);
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
  const { sendMessage: e } = pe(), n = I(
    (g) => e({ service: "pipeline", action: "subscribe", channel: `pipeline:run:${g}` }),
    [e]
  ), r = I(
    (g) => e({ service: "pipeline", action: "unsubscribe", channel: `pipeline:run:${g}` }),
    [e]
  ), o = I(
    () => e({ service: "pipeline", action: "subscribe", channel: "pipeline:all" }),
    [e]
  ), s = I(
    () => e({ service: "pipeline", action: "unsubscribe", channel: "pipeline:all" }),
    [e]
  ), t = I(
    () => e({ service: "pipeline", action: "subscribe", channel: "pipeline:approvals" }),
    [e]
  ), i = I(
    () => e({ service: "pipeline", action: "unsubscribe", channel: "pipeline:approvals" }),
    [e]
  ), a = I(
    (g, d = {}) => {
      const b = d.correlationId ?? ne();
      return e({
        service: "pipeline",
        action: "trigger",
        pipelineId: g,
        ...d.definition ? { definition: d.definition } : {},
        ...d.triggerPayload ? { triggerPayload: d.triggerPayload } : {},
        ...d.triggeredBy ? { triggeredBy: d.triggeredBy } : {},
        correlationId: b
      }), b;
    },
    [e]
  ), c = I(
    (g, d) => {
      const b = d ?? ne();
      return e({ service: "pipeline", action: "cancel", runId: g, correlationId: b }), b;
    },
    [e]
  ), u = I(
    (g, d, b, f = {}) => {
      const P = f.correlationId ?? ne();
      return e({
        service: "pipeline",
        action: "resolveApproval",
        runId: g,
        stepId: d,
        decision: b,
        ...f.comment ? { comment: f.comment } : {},
        ...f.decidedBy ? { decidedBy: f.decidedBy } : {},
        correlationId: P
      }), P;
    },
    [e]
  ), v = I(
    (g, d, b) => {
      const f = b ?? ne();
      return e({
        service: "pipeline",
        action: "resumeFromStep",
        runId: g,
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
    unsubscribeFromAll: s,
    subscribeToApprovals: t,
    unsubscribeFromApprovals: i,
    triggerRun: a,
    cancelRun: c,
    resolveApproval: u,
    requestResumeFromStep: v
  };
}
function Bt(e, n = {}) {
  const { enabled: r = !0 } = n, { connectionState: o, sendMessage: s } = pe();
  F(() => {
    if (!r || !e || o !== "connected") return;
    const t = `pipeline:run:${e}`;
    return s({ service: "pipeline", action: "subscribe", channel: t }), () => {
      s({ service: "pipeline", action: "unsubscribe", channel: t });
    };
  }, [r, e, o, s]);
}
const Re = oe(null);
function Jt({
  value: e,
  children: n
}) {
  return /* @__PURE__ */ T(Re.Provider, { value: e, children: n });
}
function Ee() {
  return L(Re);
}
const le = 20, ie = oe(null);
function dt(e, n) {
  return e.steps[n] ?? {
    nodeId: n,
    status: "pending"
  };
}
function M(e, n, r) {
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
  const n = L(ge), { triggerRun: r } = it(), o = ut(), [s, t] = O({}), [i, a] = O(!1), c = W(/* @__PURE__ */ new Set()), u = W(null);
  F(() => {
    const p = n?.definition?.id;
    !p || u.current === p || (u.current = p, a(!0), ke(p, { limit: le }).then((S) => {
      t((R) => {
        const E = { ...R };
        for (const A of S.runs)
          E[A.id] || (E[A.id] = A);
        return E;
      });
    }).catch((S) => {
      console.error("[PipelineRuns] Failed to load history from API", S), t((R) => {
        const E = { ...R };
        for (const A of ye(p))
          E[A.id] || (E[A.id] = A);
        return E;
      });
    }).finally(() => a(!1)));
  }, [n?.definition?.id]), _e("*", (p) => {
    const { eventType: S, payload: R } = p;
    t((E) => pt(E, S, R));
  }), F(() => {
    for (const p of Object.values(s))
      if ((p.status === "completed" || p.status === "failed" || p.status === "cancelled") && !c.current.has(p.id)) {
        c.current.add(p.id);
        try {
          ot(p.pipelineId, p);
        } catch (R) {
          console.warn("[PipelineRuns] appendRun failed", R);
        }
      }
  }, [s]);
  const v = I(
    async (p, S) => {
      const R = await r(p, S);
      if (!R)
        throw new Error("Trigger failed (REST POST did not return a runId)");
      return R;
    },
    [r]
  ), g = I(
    (p) => {
      o.cancelRun(p);
    },
    [o]
  ), d = I(
    (p, S, R, E) => {
      o.resolveApproval(p, S, R, { comment: E });
    },
    [o]
  ), b = W(s);
  F(() => {
    b.current = s;
  }, [s]);
  const f = I(
    async (p) => {
      const R = Object.values(b.current).filter((E) => E.status === "failed").filter((E) => E.steps[p]?.status === "failed").sort((E, A) => A.startedAt.localeCompare(E.startedAt))[0];
      if (!R) {
        console.warn(
          "[PipelineRuns] retryFromStep — no failed run found for node",
          p
        );
        return;
      }
      try {
        await et(R.pipelineId, R.id, p);
      } catch (E) {
        console.error("[PipelineRuns] retryFromNode API failed", E);
      }
    },
    []
  ), P = I(
    async (p, S, R) => {
      const E = { ...R ?? {}, __breakpoints: S };
      return v(p, E);
    },
    [v]
  ), h = I(
    (p, S, R = "continue") => {
      const C = b.current[p]?.pipelineId ?? "unknown";
      fetch(
        `/api/pipelines/${encodeURIComponent(C)}/runs/${encodeURIComponent(p)}/breakpoint/${encodeURIComponent(S)}/resolve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: R })
        }
      ).catch((J) => {
        console.error("[PipelineRuns] resolveBreakpoint API failed", J);
      });
    },
    []
  ), w = I(
    async (p, S, R, E) => {
      const J = b.current[p]?.pipelineId ?? "unknown", H = `/api/pipelines/${encodeURIComponent(J)}/runs/${encodeURIComponent(p)}/breakpoint/${encodeURIComponent(S)}/patch`, q = await fetch(H, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patch: R, ...E ? { appliedBy: E } : {} })
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
      const G = await q.text().catch(() => "");
      throw new Error(`applyContextPatch HTTP ${q.status}: ${G}`);
    },
    []
  ), x = I(
    async (p, S, R) => {
      const C = b.current[p]?.pipelineId ?? "unknown", J = `/api/pipelines/${encodeURIComponent(C)}/runs/${encodeURIComponent(p)}/breakpoint/${encodeURIComponent(S)}/patch/${encodeURIComponent(R)}`, H = await fetch(J, { method: "DELETE" });
      if (H.status !== 204) {
        const q = await H.text().catch(() => "");
        throw new Error(`revertContextPatch HTTP ${H.status}: ${q}`);
      }
    },
    []
  ), $ = I((p) => {
    t((S) => {
      const R = S[p.id];
      if (R && R.status === p.status) {
        const E = Object.keys(R.steps).length, A = Object.keys(p.steps).length;
        if (E >= A) return S;
      }
      return { ...S, [p.id]: p };
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
      triggerRun: v,
      triggerDebugRun: P,
      cancelRun: g,
      resolveApproval: d,
      resolveBreakpoint: h,
      applyContextPatch: w,
      revertContextPatch: x,
      retryFromStep: f,
      ingestRun: $
    }),
    [
      s,
      k,
      v,
      P,
      g,
      d,
      h,
      w,
      x,
      f,
      $
    ]
  );
  return /* @__PURE__ */ T(ie.Provider, { value: D, children: e });
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
      const a = M(i, t.stepId, (c) => ({
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
      const a = M(i, t.stepId, (c) => ({
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
      const a = M(i, t.stepId, (c) => ({
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
      const a = M(i, t.stepId, (c) => ({
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
      const a = M(i, t.stepId, (c) => ({
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
        [t.runId]: M(i, t.stepId, (a) => ({
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
        [t.runId]: M(i, t.stepId, (a) => {
          const c = Date.parse(t.openedAt), u = {
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
          return u.llm._streamOpenedAtMs = Number.isFinite(c) ? c : Date.now(), u;
        })
      } : e;
    }
    case "pipeline.llm.token": {
      const t = r, i = e[t.runId];
      return i ? {
        ...e,
        [t.runId]: M(i, t.stepId, (a) => {
          const c = a.llm?.tokensOut ?? 0, u = c === 0, v = a.llm?._streamOpenedAtMs, g = Date.parse(t.at), d = u && typeof v == "number" && Number.isFinite(g) ? Math.max(0, g - v) : a.llm?.firstTokenLatencyMs;
          return {
            ...a,
            llm: {
              prompt: a.llm?.prompt ?? "",
              response: (a.llm?.response ?? "") + t.token,
              tokensIn: a.llm?.tokensIn ?? 0,
              tokensOut: c + 1,
              streamOpened: !1,
              ...d !== void 0 ? { firstTokenLatencyMs: d } : {}
            }
          };
        })
      } : e;
    }
    case "pipeline.llm.response": {
      const t = r, i = e[t.runId];
      return i ? {
        ...e,
        [t.runId]: M(i, t.stepId, (a) => ({
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
      const a = M(i, t.stepId, (c) => ({
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
        [t.runId]: M(i, t.stepId, (u) => ({
          ...u,
          patches: [...u.patches ?? [], c]
        }))
      };
    }
    case "pipeline.step.context.patch-reverted": {
      const t = r, i = e[t.runId];
      return i ? {
        ...e,
        [t.runId]: M(i, t.stepId, (a) => ({
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
      const a = M(i, t.stepId, (c) => ({
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
        [t.runId]: M(i, t.stepId, (c) => ({
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
  const e = Ee(), n = L(ie), r = e?.retryFromStep, o = n?.retryFromStep;
  return B(() => r ? async (s) => {
    await r(s);
  } : o ?? (async () => {
  }), [r, o]);
}
function Kt(e) {
  const n = Ee(), r = L(ie), o = n?.getLatestStepForNode, s = B(
    () => o ? o(e) : null,
    [o, e]
  ), t = B(() => {
    if (!r) return null;
    let i = null, a = "";
    for (const c of Object.values(r.runs)) {
      const u = c.steps[e];
      u && c.startedAt > a && (i = u, a = c.startedAt);
    }
    return i;
  }, [r, e]);
  return o ? s : t;
}
const z = oe(null);
function zt({
  services: e,
  children: n
}) {
  return /* @__PURE__ */ T(z.Provider, { value: e, children: n });
}
function Yt() {
  const e = L(z);
  if (!e)
    throw new Error(
      "useImageUrl must be called inside <PipelineEditorServicesProvider>. The host editor (e.g. wsg PipelineEditorPage) is responsible for mounting it with its own getImageUrl implementation."
    );
  return e.getImageUrl;
}
function Xt() {
  const e = L(z);
  if (!e)
    throw new Error(
      "usePipelineEditorServices must be called inside <PipelineEditorServicesProvider>."
    );
  return e;
}
function Gt(e) {
  const r = L(z)?.nodeVocabulary?.[e];
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
  const o = L(z)?.modelOptions?.[e];
  return B(
    // An explicitly empty list is a real answer ("this host runs none"), so it
    // is honoured rather than treated as "unset" and replaced by the defaults.
    () => o ?? n,
    [o, n]
  );
}
function Zt() {
  const n = L(z)?.modelOptions;
  return B(
    () => (r, o) => n?.[r] ?? o,
    [n]
  );
}
function en() {
  const n = L(z)?.executableNodeTypes;
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
  return F(() => {
    const o = () => r(Math.max(0, Math.floor((Date.now() - e) / 1e3)));
    o();
    const s = setInterval(o, 1e3);
    return () => clearInterval(s);
  }, [e]), /* @__PURE__ */ T(
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
  return i.current !== e && (i.current = e, e === "done" && !t && c(!0)), F(() => {
    if (!a) return;
    const u = setTimeout(() => c(!1), 30);
    return () => clearTimeout(u);
  }, [a]), /* @__PURE__ */ T(
    "div",
    {
      "data-testid": "generative-image-preview",
      "data-status": e,
      className: U("relative overflow-hidden rounded-md bg-surface-hover", s),
      children: e === "synthesizing" ? /* @__PURE__ */ V(Oe, { children: [
        /* @__PURE__ */ T(
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
        !t && /* @__PURE__ */ T(
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
        /* @__PURE__ */ T(
          "span",
          {
            className: U(
              "absolute inset-0 flex items-center justify-center",
              "text-[11px] font-medium tracking-wide text-neutral select-none"
            ),
            children: "✦ synthesizing"
          }
        ),
        o !== void 0 && /* @__PURE__ */ T(gt, { startedAt: o })
      ] }) : n ? /* @__PURE__ */ T(
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
        /* @__PURE__ */ T("div", { "aria-hidden": "true", className: "absolute inset-0 bg-surface-emphasis" })
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
async function nn(e, n, r, o, s) {
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
    let u = "patch rejected by validator";
    throw c.result && c.result.validation && c.result.validation.ok === !1 && typeof c.result.validation.reason == "string" ? u = c.result.validation.reason : typeof c.error == "string" && (u = c.error), new ht(u, c.result);
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
async function rn(e, n, r, o) {
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
}, we = {
  sm: "px-1.5",
  md: "px-2"
}, Ue = Q(function({
  type: n = "text",
  size: r = "md",
  prefix: o,
  suffix: s,
  invalid: t = !1,
  disabled: i = !1,
  mono: a = !1,
  className: c,
  "data-testid": u,
  ...v
}, g) {
  const d = o != null, b = s != null;
  return !d && !b ? /* @__PURE__ */ T(
    "input",
    {
      ref: g,
      type: n,
      disabled: i,
      "data-testid": u,
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
      ...v
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
        d && /* @__PURE__ */ T(
          "span",
          {
            "aria-hidden": "true",
            className: U(
              "flex shrink-0 items-center text-text-tertiary",
              we[r]
            ),
            children: o
          }
        ),
        /* @__PURE__ */ T(
          "input",
          {
            ref: g,
            type: n,
            disabled: i,
            "data-testid": u,
            className: U(
              "flex-1 min-w-0 bg-transparent font-inherit text-text-primary outline-none",
              "placeholder:text-text-tertiary",
              "disabled:cursor-not-allowed",
              d ? "pl-0" : ue[r].split(" ")[1],
              b ? "pr-0" : ue[r].split(" ")[2],
              r === "sm" ? "h-7 text-[12px]" : "h-9 text-[13px]",
              a && "font-mono",
              c
            ),
            ...v
          }
        ),
        b && /* @__PURE__ */ T(
          "span",
          {
            "aria-hidden": "true",
            className: U(
              "flex shrink-0 items-center text-text-tertiary",
              we[r]
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
}, on = Q(function({
  options: n,
  placeholder: r,
  size: o = "md",
  invalid: s = !1,
  disabled: t = !1,
  className: i,
  "data-testid": a,
  value: c,
  ...u
}, v) {
  return /* @__PURE__ */ V(
    "select",
    {
      ref: v,
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
      ...u,
      children: [
        r && /* @__PURE__ */ T("option", { value: "", disabled: !0, children: r }),
        n.map((g) => /* @__PURE__ */ T("option", { value: g.value, disabled: g.disabled, children: g.label }, g.value))
      ]
    }
  );
}), sn = Q(
  function({
    value: n,
    onChange: r,
    onClear: o,
    min: s,
    max: t,
    step: i,
    unit: a,
    placeholder: c,
    invalid: u = !1,
    disabled: v = !1,
    size: g = "md",
    "data-testid": d
  }, b) {
    const f = I(
      (x) => {
        let $ = x;
        return s !== void 0 && $ < s && ($ = s), t !== void 0 && $ > t && ($ = t), $;
      },
      [s, t]
    ), P = I(
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
    ), h = I(
      (x) => {
        const $ = parseFloat(x.target.value);
        if (!Number.isNaN($)) {
          const k = f($);
          k !== $ && r(k);
        }
      },
      [f, r]
    );
    return /* @__PURE__ */ T(
      Ue,
      {
        ref: b,
        type: "number",
        size: g,
        value: n ?? "",
        min: s,
        max: t,
        step: i,
        placeholder: c,
        invalid: u,
        disabled: v,
        suffix: a ? /* @__PURE__ */ T("span", { className: "text-text-tertiary font-sans text-[12px] select-none", children: a }) : void 0,
        "data-testid": d,
        onChange: P,
        onBlur: h
      }
    );
  }
), an = Q(
  function({
    rows: n,
    minRows: r = 2,
    maxRows: o,
    autoResize: s = !1,
    invalid: t = !1,
    disabled: i = !1,
    onChange: a,
    value: c,
    className: u,
    "data-testid": v,
    ...g
  }, d) {
    const b = W(null), f = I(
      (k) => {
        b.current = k, typeof d == "function" ? d(k) : d && (d.current = k);
      },
      [d]
    ), P = 20, h = 12, w = I(() => {
      const k = b.current;
      if (!k || !s) return;
      k.style.height = "auto";
      const D = r * P + h, p = k.scrollHeight, S = o ? o * P + h : 1 / 0;
      k.style.height = `${Math.min(Math.max(p, D), S)}px`, k.style.overflowY = p > S ? "auto" : "hidden";
    }, [s, r, o]);
    F(() => {
      w();
    }, [c, w]);
    const x = I(
      (k) => {
        w(), a?.(k);
      },
      [a, w]
    );
    return /* @__PURE__ */ T(
      "textarea",
      {
        ref: f,
        rows: s ? void 0 : n ?? r,
        disabled: i,
        "data-testid": v,
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
          u
        ),
        style: s ? { minHeight: `${r * P + h}px` } : void 0,
        ...g
      }
    );
  }
);
function cn({
  name: e,
  value: n,
  onChange: r,
  options: o,
  disabled: s = !1,
  orientation: t = "vertical",
  "data-testid": i
}) {
  const a = Se();
  return /* @__PURE__ */ T(
    "div",
    {
      role: "radiogroup",
      "data-testid": i,
      className: U(
        "flex",
        t === "vertical" ? "flex-col gap-2" : "flex-row flex-wrap gap-x-4 gap-y-2"
      ),
      children: o.map((c, u) => {
        const v = `${a}-${u}`, g = c.value === n;
        return /* @__PURE__ */ V(
          "label",
          {
            htmlFor: v,
            className: U(
              "flex items-start gap-2.5 cursor-pointer select-none",
              s && "opacity-50 cursor-not-allowed"
            ),
            children: [
              /* @__PURE__ */ V("span", { className: "relative flex shrink-0 mt-0.5", children: [
                /* @__PURE__ */ T(
                  "input",
                  {
                    id: v,
                    type: "radio",
                    name: e,
                    value: c.value,
                    checked: g,
                    disabled: s,
                    onChange: () => r(c.value),
                    className: "sr-only peer"
                  }
                ),
                /* @__PURE__ */ T(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: U(
                      "block w-4 h-4 rounded-full border-2 transition-colors duration-150",
                      g ? "border-info bg-white" : "border-border-emphasis bg-white",
                      !s && !g && "peer-hover:border-info",
                      "peer-focus-visible:ring-2 peer-focus-visible:ring-info/40 peer-focus-visible:ring-offset-1"
                    )
                  }
                ),
                g && /* @__PURE__ */ T(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: "absolute inset-0 m-auto block w-2 h-2 rounded-full bg-info"
                  }
                )
              ] }),
              /* @__PURE__ */ V("span", { className: "flex flex-col", children: [
                /* @__PURE__ */ T(
                  "span",
                  {
                    className: U(
                      "text-[13px] leading-5 font-medium",
                      s ? "text-text-tertiary" : "text-text-primary"
                    ),
                    children: c.label
                  }
                ),
                c.description && /* @__PURE__ */ T(
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
const It = {
  sm: "px-1.5 py-0.5 text-[11px]",
  md: "px-2 py-0.5 text-[12px]"
}, un = Q(
  function({
    value: n,
    onChange: r,
    samples: o,
    placeholder: s = "$.path.to.value",
    invalid: t = !1,
    errorMessage: i,
    disabled: a = !1,
    size: c = "md",
    enforcePrefix: u = !1,
    "data-testid": v
  }, g) {
    const d = Se(), b = u && n.length > 0 && !n.startsWith("$.") ? 'JSONPath must start with "$."' : void 0, f = t || b != null, P = i ?? b;
    return /* @__PURE__ */ V("div", { className: "flex flex-col gap-1 w-full", children: [
      /* @__PURE__ */ T(
        Ue,
        {
          ref: g,
          type: "text",
          mono: !0,
          size: c,
          value: n,
          onChange: (h) => r(h.target.value),
          placeholder: s,
          invalid: f,
          disabled: a,
          "data-testid": v,
          "aria-describedby": P ? d : void 0,
          "aria-invalid": f || void 0
        }
      ),
      o && o.length > 0 && /* @__PURE__ */ T("div", { className: "flex flex-wrap gap-1", children: o.map((h) => /* @__PURE__ */ T(
        "button",
        {
          type: "button",
          disabled: a,
          onClick: () => r(h.value),
          className: U(
            "rounded border border-border bg-surface-hover font-mono text-text-secondary",
            "transition-colors duration-100",
            "hover:bg-info-bg hover:border-info-border hover:text-info-fg",
            "focus:outline-none focus:ring-2 focus:ring-info/40",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            It[c]
          ),
          children: h.label
        },
        h.value
      )) }),
      P && /* @__PURE__ */ T(
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
), bt = {
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
        /* @__PURE__ */ T("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
        /* @__PURE__ */ T("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
        /* @__PURE__ */ T("path", { d: "M21 15l-5-5L5 21" })
      ]
    }
  );
}
function dn({
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
  const [u, v] = O("loading");
  return /* @__PURE__ */ V(
    "div",
    {
      "data-testid": c,
      className: U(
        "relative overflow-hidden bg-surface-hover",
        bt[r],
        o !== "auto" && vt[o],
        s ? "rounded-full" : "rounded-md",
        a
      ),
      children: [
        u === "loading" && /* @__PURE__ */ T(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute inset-0 animate-pulse bg-surface-emphasis"
          }
        ),
        u === "error" && /* @__PURE__ */ T("div", { className: "absolute inset-0 flex items-center justify-center bg-surface-hover", children: t ?? /* @__PURE__ */ T(xt, {}) }),
        /* @__PURE__ */ T(
          "img",
          {
            src: e,
            alt: n,
            loading: i,
            onLoad: () => v("loaded"),
            onError: () => v("error"),
            className: U(
              "w-full h-full object-cover transition-opacity duration-200",
              u === "loaded" ? "opacity-100" : "opacity-0"
            )
          }
        )
      ]
    }
  );
}
async function ln(e, n, r, o) {
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
async function pn(e, n, r = {}) {
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
async function mn(e) {
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
      for (const P in n.runs) {
        const h = n.runs[P];
        if (h.status === "awaiting_approval")
          for (const w in h.steps) {
            const x = h.steps[w];
            if (x.status !== "awaiting") continue;
            const $ = de(h.pipelineId, w), D = K(h.pipelineId)?.nodes.find((S) => S.id === w), p = D && D.data.type === "approval" ? D.data.approvers : [];
            f[re(P, w)] = {
              runId: P,
              pipelineId: h.pipelineId,
              stepId: w,
              approvers: p,
              requestedAt: x.startedAt ?? (/* @__PURE__ */ new Date(0)).toISOString(),
              message: $.message,
              requiredCount: $.requiredCount,
              recordedCount: x.approvals?.filter((S) => S.decision === "approve").length ?? 0
            };
          }
      }
      return f;
    }
  ), [s, t] = O(!0), [i, a] = O(null), [c, u] = O(0), v = W(n.runs);
  F(() => {
    v.current = n.runs;
  }, [n.runs]);
  const g = W(/* @__PURE__ */ new Map());
  F(() => {
    let f = !1;
    t(!0), a(null);
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
          const w = {};
          for (const x of h.pendingApprovals) {
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
      } catch (h) {
        if (f) return;
        console.error(
          "[usePendingApprovals] /api/observability/dashboard?include=pendingApprovals failed:",
          h
        ), a(h.message ?? "Failed to load pending approvals"), t(!1);
      }
    })(), () => {
      f = !0;
    };
  }, [c]), F(() => {
    const f = [];
    f.push(
      e.subscribe("pipeline.run.started", (h) => {
        const w = h;
        g.current.set(w.runId, w.pipelineId);
      })
    ), f.push(
      e.subscribe("pipeline.approval.requested", (h) => {
        const w = h, x = g.current.get(w.runId) ?? v.current[w.runId]?.pipelineId ?? "", $ = de(x, w.stepId);
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
      e.subscribe("pipeline.approval.recorded", (h) => {
        const w = h, x = re(w.runId, w.stepId);
        o(($) => {
          const k = $[x];
          if (!k) return $;
          if (w.decision === "reject") {
            const S = { ...$ };
            return delete S[x], S;
          }
          const D = (k.recordedCount ?? 0) + 1, p = k.requiredCount ?? 1;
          if (D >= p) {
            const S = { ...$ };
            return delete S[x], S;
          }
          return {
            ...$,
            [x]: { ...k, recordedCount: D }
          };
        });
      })
    );
    const P = e.subscribeToApprovals();
    return f.push(P), () => {
      for (const h of f) h();
    };
  }, [e]);
  const d = B(() => Object.values(r).sort(
    (f, P) => P.requestedAt.localeCompare(f.requestedAt)
  ), [r]), b = I(() => {
    u((f) => f + 1);
  }, []);
  return { approvals: d, isLoading: s, error: i, retry: b };
}
function fn() {
  const { approvals: e } = wt();
  return e;
}
export {
  Ft as $,
  Zt as A,
  Qt as B,
  Gt as C,
  jt as D,
  Ct as E,
  Ut as F,
  tn as G,
  qt as H,
  dn as I,
  un as J,
  Ve as K,
  Y as L,
  it as M,
  sn as N,
  be as O,
  Vt as P,
  Ot as Q,
  cn as R,
  on as S,
  an as T,
  Nt as U,
  ce as V,
  Dt as W,
  Ge as X,
  ye as Y,
  ot as Z,
  Bt as _,
  K as a,
  wt as a0,
  Jt as a1,
  Ee as a2,
  Lt as a3,
  At as b,
  Ht as c,
  fn as d,
  Ue as e,
  Ne as f,
  ht as g,
  zt as h,
  nn as i,
  Mt as j,
  st as k,
  Be as l,
  pn as m,
  ke as n,
  et as o,
  rn as p,
  Yt as q,
  ln as r,
  mn as s,
  Xt as t,
  mt as u,
  en as v,
  Kt as w,
  Wt as x,
  _t as y,
  ge as z
};
