import { jsxs as l, jsx as n, Fragment as ne } from "react/jsx-runtime";
import Yn, { useState as R, useRef as oe, useMemo as F, useEffect as G, createContext as Xn, useCallback as M, useContext as it } from "react";
import { useNavigate as Ee, useParams as at, Navigate as lt, useSearchParams as Rt } from "react-router";
import "@schemas/pipeline.schema.json";
import { u as Pe, a as Qn } from "./EventStreamContext-DEaDWFtC.js";
import { E as pd } from "./EventStreamContext-DEaDWFtC.js";
import { l as Yt, d as Xt, b as Ir, a as Sr, P as dn, e as Tr, f as Ar, c as pn, r as Dr, g as Rr } from "./pipelineAudit-HIi3aStK.js";
import { u as $t } from "./IdentityContext-CLalsm_M.js";
import { u as Zn } from "./WebSocketContext-DPGFyPeZ.js";
import { Handle as se, Position as ie, useNodeConnections as $r, getSmoothStepPath as Pr, EdgeLabelRenderer as Mr, ReactFlowProvider as Er, useReactFlow as Or, useNodesState as Ur, useEdgesState as _r, ReactFlow as Lr, Background as Br, BackgroundVariant as Fr, Controls as jr, MiniMap as qr } from "@xyflow/react";
/* empty css               */
import { c as $ } from "./cn-B6yFEsav.js";
import { u as Qt, a as Pt } from "./ToastProvider-aHBNxMTO.js";
import "clsx";
import "tailwind-merge";
import { M as ze } from "./Modal-2jg4229_.js";
import "react-dom";
import { u as Hr, I as ht, a as zr, C as Zt, T as Kr } from "./TagEditor-CuaVtW7o.js";
import { a as Fe, C as zt, B as rt } from "./ConfirmDialog-DCCuBtRb.js";
import { C as xe } from "./Chip-BXdhqVFm.js";
import { E as _e } from "./EmptyState-C3KCJ6Ae.js";
import { B as Wr, L as kt } from "./Chart-ByoxeiYX.js";
import { S as Ut } from "./SkeletonCard-C89GWQ3p.js";
const Vr = "";
function un(e, t) {
  const r = e.displayName;
  return typeof r == "string" && r.length > 0 ? r : t.slice(0, 8);
}
function Jr({ value: e, onChange: t, placeholder: r, maxSelect: s }) {
  const { presenceUsers: i } = Hr(), { idToken: o } = $t(), [d, c] = R(""), [a, p] = R(!1), [f, h] = R(0), [m, x] = R([]), g = oe(null), u = oe(null), v = F(() => {
    const I = new Set(e), S = [];
    for (const D of i)
      I.has(D.clientId) || (I.add(D.clientId), S.push({
        userId: D.clientId,
        displayName: un(D.metadata, D.clientId)
      }));
    return S;
  }, [i, e]);
  G(() => {
    const I = d.trim();
    if (!I || !o) {
      x([]);
      return;
    }
    const S = new AbortController(), D = setTimeout(() => {
      const _ = `${Vr}/api/profiles?q=${encodeURIComponent(I)}&limit=20`;
      fetch(_, {
        headers: { Authorization: `Bearer ${o}` },
        signal: S.signal
      }).then((W) => W.ok ? W.json() : Promise.reject(new Error(`HTTP ${W.status}`))).then((W) => {
        x(Array.isArray(W.profiles) ? W.profiles : []);
      }).catch(() => {
      });
    }, 250);
    return () => {
      clearTimeout(D), S.abort();
    };
  }, [d, o]);
  const w = F(() => {
    const I = new Set(e), S = [];
    for (const D of v)
      I.has(D.userId) || (I.add(D.userId), S.push(D));
    for (const D of m)
      I.has(D.userId) || (I.add(D.userId), S.push({
        userId: D.userId,
        displayName: D.displayName || D.userId.slice(0, 8)
      }));
    return S;
  }, [v, m, e]), N = F(() => {
    const I = d.trim().toLowerCase();
    return I ? w.filter(
      (S) => S.displayName.toLowerCase().includes(I) || S.userId.toLowerCase().includes(I)
    ) : w;
  }, [w, d]), C = typeof s == "number" && e.length >= s, y = (I) => {
    const S = I.trim();
    S && (e.includes(S) || C || (t([...e, S]), c(""), h(0)));
  }, k = (I) => {
    t(e.filter((S) => S !== I));
  }, b = (I) => {
    if (I.key === "ArrowDown")
      I.preventDefault(), p(!0), h((S) => Math.min(S + 1, Math.max(N.length - 1, 0)));
    else if (I.key === "ArrowUp")
      I.preventDefault(), h((S) => Math.max(S - 1, 0));
    else if (I.key === "Enter") {
      I.preventDefault();
      const S = N[f];
      S ? y(S.userId) : d.trim() && y(d.trim());
    } else I.key === "Escape" ? p(!1) : I.key === "Backspace" && !d && e.length > 0 && k(e[e.length - 1]);
  }, T = (I) => {
    const S = i.find((_) => _.clientId === I);
    if (S) return un(S.metadata, I);
    const D = m.find((_) => _.userId === I);
    return D && D.displayName ? D.displayName : I;
  };
  return /* @__PURE__ */ l("div", { className: "flex flex-col gap-1.5 font-[inherit]", children: [
    e.length > 0 && /* @__PURE__ */ n("div", { className: "flex flex-wrap gap-1.5", children: e.map((I) => /* @__PURE__ */ l(
      "span",
      {
        className: "inline-flex items-center gap-1 bg-[#eef2ff] border border-[#c7d2fe] text-[#3730a3] rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
        children: [
          T(I),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: () => k(I),
              "aria-label": `Remove ${T(I)}`,
              className: "bg-transparent border-none text-[#3730a3] cursor-pointer text-[14px] leading-none px-0.5 py-0",
              children: "×"
            }
          )
        ]
      },
      I
    )) }),
    /* @__PURE__ */ l("div", { className: "relative", children: [
      /* @__PURE__ */ n(
        "input",
        {
          ref: g,
          type: "text",
          value: d,
          disabled: C,
          placeholder: C ? `Max ${s} selected` : r ?? "Search users…",
          onChange: (I) => {
            c(I.target.value), p(!0), h(0);
          },
          onFocus: () => p(!0),
          onBlur: () => {
            u.current = setTimeout(() => p(!1), 120);
          },
          onKeyDown: b,
          className: "w-full py-1.5 px-2.5 text-[13px] border border-[#e2e8f0] rounded-md font-[inherit] box-border outline-none"
        }
      ),
      a && !C && N.length > 0 && /* @__PURE__ */ n(
        "div",
        {
          className: "absolute top-full left-0 right-0 bg-white border border-[#e2e8f0] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
          onMouseDown: (I) => {
            I.preventDefault(), u.current && clearTimeout(u.current);
          },
          children: N.map((I, S) => /* @__PURE__ */ l(
            "div",
            {
              className: $(
                "py-1.5 px-2.5 text-[13px] text-[#374151] cursor-pointer",
                S === f ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              onMouseEnter: () => h(S),
              onClick: () => {
                y(I.userId), g.current?.focus();
              },
              children: [
                /* @__PURE__ */ n("span", { className: "font-medium", children: I.displayName }),
                I.displayName !== I.userId && /* @__PURE__ */ n("span", { className: "text-[#94a3b8] ml-2 text-[11px] font-mono", children: I.userId.slice(0, 12) })
              ]
            },
            I.userId
          ))
        }
      )
    ] })
  ] });
}
const er = "ws_pipelines_v1_index", Gr = "ws_pipelines_v1:";
function Mt(e) {
  return `${Gr}${e}`;
}
let mn = !1;
function en(e, t) {
  try {
    localStorage.setItem(e, t);
  } catch (r) {
    mn || (mn = !0, console.warn("[pipelineStorage] localStorage write failed", r));
  }
}
function tn() {
  try {
    const e = localStorage.getItem(er);
    if (!e) return [];
    const t = JSON.parse(e);
    return Array.isArray(t) ? t : [];
  } catch {
    return [];
  }
}
function tr(e) {
  en(er, JSON.stringify(e));
}
function Yr(e) {
  const t = tn(), r = {
    id: e.id,
    name: e.name,
    status: e.status,
    updatedAt: e.updatedAt
  }, s = t.findIndex((i) => i.id === e.id);
  if (s === -1)
    e.icon && (r.icon = e.icon), e.tags && e.tags.length > 0 && (r.tags = [...e.tags]), t.push(r);
  else {
    const i = e.icon ?? t[s].icon, o = e.tags ?? t[s].tags, d = { ...r };
    i && (d.icon = i), o && o.length > 0 && (d.tags = [...o]), t[s] = d;
  }
  tr(t);
}
function Xr(e) {
  const t = tn().filter((r) => r.id !== e);
  tr(t);
}
function Kt() {
  return tn();
}
function Re(e) {
  try {
    const t = localStorage.getItem(Mt(e));
    return t ? JSON.parse(t) : null;
  } catch {
    return null;
  }
}
function tt(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), en(Mt(e.id), JSON.stringify(e)), Yr(e);
}
function Qr(e) {
  en(Mt(e.id), JSON.stringify(e));
}
function nr(e) {
  try {
    localStorage.removeItem(Mt(e));
  } catch {
  }
  Xr(e);
}
function Zr(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), o = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), a = crypto.randomUUID(), p = crypto.randomUUID(), f = crypto.randomUUID(), h = crypto.randomUUID(), m = crypto.randomUUID(), x = crypto.randomUUID(), g = { type: "trigger", triggerType: "manual" }, u = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Summarize this document",
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0.3,
    maxTokens: 1024,
    streaming: !0
  }, v = {
    type: "condition",
    expression: `context.steps.${s}.llm.tokensOut > 200`,
    label: "Long summary?"
  }, w = {
    type: "fork",
    branchCount: 2,
    branchLabels: ["post-comment", "notify-user"]
  }, N = {
    type: "action",
    actionType: "post-comment",
    config: { body: "{{context.steps." + s + ".response}}" },
    onError: "route-error"
  }, C = {
    type: "action",
    actionType: "notify",
    config: {
      recipient: "{{context.triggeredBy.userId}}",
      message: "Your document summary is ready for review."
    },
    onError: "route-error"
  }, y = {
    type: "join",
    mode: "all",
    mergeStrategy: "deep-merge"
  }, k = {
    type: "approval",
    approvers: [{ type: "user", value: "demo-user" }],
    requiredCount: 1,
    timeoutMs: 1440 * 60 * 1e3,
    timeoutAction: "reject",
    message: "Please review before posting."
  }, b = {
    type: "action",
    actionType: "update-document",
    config: { summary: "{{context.steps." + s + ".response}}" },
    onError: "route-error"
  }, D = [
    { id: r, type: "trigger", position: { x: 40, y: 200 }, data: g },
    { id: s, type: "llm", position: { x: 320, y: 200 }, data: u },
    { id: i, type: "condition", position: { x: 620, y: 200 }, data: v },
    { id: o, type: "fork", position: { x: 900, y: 120 }, data: w },
    { id: d, type: "action", position: { x: 1180, y: 60 }, data: N },
    { id: c, type: "action", position: { x: 1180, y: 180 }, data: C },
    { id: a, type: "join", position: { x: 1480, y: 120 }, data: y },
    { id: p, type: "approval", position: { x: 1780, y: 120 }, data: k },
    { id: f, type: "action", position: { x: 2080, y: 120 }, data: b },
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
    { id: x, type: "transform", position: { x: 2380, y: 200 }, data: {
      type: "transform",
      transformType: "template",
      expression: "pipeline-complete",
      outputKey: "pipelineCompletion",
      terminal: !0
    } }
  ], _ = (ee, de, O, U) => ({
    id: crypto.randomUUID(),
    source: ee,
    sourceHandle: de,
    target: O,
    targetHandle: U
  }), W = [
    // Happy path: trigger → llm → condition → fork → (postComment | notify) → join → approval → updateDoc → finalSink
    _(r, "out", s, "in"),
    _(s, "out", i, "in"),
    _(i, "true", o, "in"),
    _(i, "false", h, "in"),
    _(o, "branch-0", d, "in"),
    _(o, "branch-1", c, "in"),
    _(d, "out", a, "in-0"),
    _(c, "out", a, "in-1"),
    _(a, "out", p, "in"),
    _(p, "approved", f, "in"),
    // Terminal `out` paths converge on the final sink. Each leaf wires `out`
    // so DEAD_END only fires for the sink itself.
    _(f, "out", x, "in"),
    _(h, "out", x, "in"),
    // Approval rejection routes through the shared error handler. Wiring
    // `rejected` is hygiene only — there is no UNUSED_APPROVAL_BRANCH lint —
    // but it keeps the rejection path observable.
    _(p, "rejected", m, "in"),
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
    _(s, "error", m, "in"),
    _(f, "error", m, "in"),
    _(h, "error", m, "in"),
    // The error handler itself drains into the final sink on both handles
    // so it is not a dead end and its own `error` handle is wired (silencing
    // NO_ERROR_HANDLER for the error-handler node).
    _(m, "out", x, "in"),
    _(m, "error", x, "in")
  ], Q = {
    id: crypto.randomUUID(),
    name: "Document Summary Pipeline (Demo)",
    description: "A showcase pipeline demonstrating LLM summarization, branching, approval, parallel actions, and a shared error handler.",
    icon: "📄",
    version: 0,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "manual" },
    nodes: D,
    edges: W,
    createdAt: t,
    updatedAt: t,
    createdBy: e
  };
  return tt(Q), Q;
}
function nn(e, t) {
  const r = Re(e);
  if (!r) return null;
  const s = /* @__PURE__ */ new Map(), i = r.nodes.map((a) => {
    const p = crypto.randomUUID();
    return s.set(a.id, p), { ...a, id: p, data: { ...a.data } };
  }), o = r.edges.map((a) => ({
    ...a,
    id: crypto.randomUUID(),
    source: s.get(a.source) ?? a.source,
    target: s.get(a.target) ?? a.target
  })), d = (/* @__PURE__ */ new Date()).toISOString(), c = {
    ...r,
    id: crypto.randomUUID(),
    name: t ?? `${r.name} (copy)`,
    // Spread preserves tags from the source; defensive-copy the array so
    // later mutation of the clone can't alias the source's tag list.
    tags: r.tags ? [...r.tags] : void 0,
    version: 0,
    status: "draft",
    publishedVersion: void 0,
    nodes: i,
    edges: o,
    createdAt: d,
    updatedAt: d
  };
  return tt(c), c;
}
function Wt(e) {
  const t = Re(e);
  return t ? JSON.stringify(t, null, 2) : null;
}
function vt(e = "") {
  return `/api/pipelines/defs${e}`;
}
const eo = { "Content-Type": "application/json" };
async function to() {
  const e = await fetch(vt("/"), { credentials: "include" });
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
async function no(e) {
  const t = await fetch(vt(`/${encodeURIComponent(e)}`), {
    credentials: "include"
  });
  if (t.status === 404) return null;
  if (!t.ok) throw new Error(`loadPipelineRemote failed (${t.status})`);
  return await t.json();
}
async function rr(e) {
  const t = await fetch(vt(`/${encodeURIComponent(e.id)}`), {
    method: "PUT",
    headers: eo,
    credentials: "include",
    body: JSON.stringify(e)
  });
  if (!t.ok) throw new Error(`savePipelineRemote failed (${t.status})`);
  return await t.json();
}
async function ro(e) {
  const t = await fetch(vt(`/${encodeURIComponent(e)}`), {
    method: "DELETE",
    credentials: "include"
  });
  if (!t.ok && t.status !== 404)
    throw new Error(`deletePipelineRemote failed (${t.status})`);
}
async function oo(e) {
  const t = await fetch(vt(`/${encodeURIComponent(e)}/publish`), {
    method: "POST",
    credentials: "include"
  });
  if (t.status === 404) return null;
  if (!t.ok) throw new Error(`publishPipelineRemote failed (${t.status})`);
  return await t.json();
}
function ct(e) {
  const t = e.message || String(e);
  return t.includes("NetworkError") || t.includes("Failed to fetch") || t.includes("network") || t.includes("ECONNREFUSED") || t.includes("500") || t.includes("502") || t.includes("503") || t.includes("504");
}
async function so() {
  try {
    return await to();
  } catch (e) {
    if (ct(e)) return Kt();
    throw e;
  }
}
async function Ge(e) {
  try {
    const t = await no(e);
    return t && tt(t), t ?? Re(e);
  } catch (t) {
    if (ct(t)) return Re(e);
    throw t;
  }
}
async function He(e) {
  e.version = (e.version ?? 0) + 1, e.updatedAt = (/* @__PURE__ */ new Date()).toISOString(), tt(e);
  try {
    return await rr(e);
  } catch (t) {
    if (ct(t)) return e;
    throw t;
  }
}
async function fn(e) {
  nr(e);
  try {
    await ro(e);
  } catch (t) {
    if (ct(t)) return;
    throw t;
  }
}
async function or(e) {
  try {
    const t = await oo(e);
    return t && tt(t), t;
  } catch (t) {
    if (ct(t)) return null;
    throw t;
  }
}
async function io(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = {
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
    createdAt: e.createdAt ?? t,
    updatedAt: t,
    createdBy: e.createdBy
  };
  tt(s);
  try {
    await rr(s);
  } catch (i) {
    if (!ct(i)) throw i;
  }
  return s;
}
const ao = 500, hn = 50;
function lo(e) {
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
function Ct() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
const Et = Xn(null);
function sr({
  pipelineId: e,
  children: t
}) {
  const [r, s] = R(null), [i, o] = R(!1), [d, c] = R(null), [a, p] = R([]), [f, h] = R([]), m = oe(null);
  G(() => {
    let O = !1;
    return s(null), o(!1), c(null), p([]), h([]), Ge(e).then((U) => {
      O || (U && (U.nodes = U.nodes ?? [], U.edges = U.edges ?? []), s(U));
    }), () => {
      O = !0;
    };
  }, [e]), G(() => {
    if (!(!i || !r))
      return m.current && clearTimeout(m.current), m.current = setTimeout(() => {
        He(r).then(() => o(!1));
      }, ao), () => {
        m.current && (clearTimeout(m.current), m.current = null);
      };
  }, [r, i]);
  const x = M((O) => {
    p((U) => {
      const P = [
        ...U,
        { nodes: O.nodes, edges: O.edges }
      ];
      return P.length > hn && P.shift(), P;
    }), h([]);
  }, []), g = M(
    (O) => {
      let U = null;
      return s((P) => {
        if (!P) return P;
        x(P);
        const B = O(P);
        return U = B, B;
      }), o(!0), U;
    },
    [x]
  ), u = M(
    (O, U) => {
      const P = Ct();
      return g((B) => ({
        ...B,
        nodes: [
          ...B.nodes,
          { id: P, type: O, position: U, data: lo(O) }
        ]
      })), P;
    },
    [g]
  ), v = M(
    (O, U) => {
      g((P) => ({
        ...P,
        nodes: P.nodes.map((B) => B.id === O ? { ...B, ...U } : B)
      }));
    },
    [g]
  ), w = M(
    (O, U) => {
      g((P) => ({
        ...P,
        nodes: P.nodes.map((B) => {
          if (B.id !== O) return B;
          const K = { ...B.data, ...U };
          return { ...B, data: K };
        })
      }));
    },
    [g]
  ), N = M(
    (O) => {
      g((U) => ({
        ...U,
        nodes: U.nodes.filter((P) => P.id !== O),
        edges: U.edges.filter((P) => P.source !== O && P.target !== O)
      })), c((U) => U === O ? null : U);
    },
    [g]
  ), C = M(
    (O) => {
      const U = [];
      return g((P) => {
        const B = new Set(O), K = /* @__PURE__ */ new Map(), j = P.nodes.filter((Z) => B.has(Z.id)).map((Z) => {
          const le = Ct();
          return K.set(Z.id, le), U.push(le), {
            ...Z,
            id: le,
            position: { x: Z.position.x + 40, y: Z.position.y + 40 },
            data: { ...Z.data }
          };
        }), X = P.edges.filter((Z) => B.has(Z.source) && B.has(Z.target)).map((Z) => ({
          ...Z,
          id: Ct(),
          source: K.get(Z.source) ?? Z.source,
          target: K.get(Z.target) ?? Z.target
        }));
        return {
          ...P,
          nodes: [...P.nodes, ...j],
          edges: [...P.edges, ...X]
        };
      }), U;
    },
    [g]
  ), y = M(
    (O) => {
      const U = Ct();
      return g((P) => ({
        ...P,
        edges: [...P.edges, { id: U, ...O }]
      })), U;
    },
    [g]
  ), k = M(
    (O) => {
      g((U) => ({
        ...U,
        edges: U.edges.filter((P) => P.id !== O)
      }));
    },
    [g]
  ), b = M(
    (O) => {
      O.length !== 0 && s((U) => {
        if (!U) return U;
        const P = new Map(O.map((K) => [K.id, K.position])), B = {
          ...U,
          nodes: U.nodes.map((K) => {
            const j = P.get(K.id);
            return j ? { ...K, position: j } : K;
          })
        };
        return Qr(B), B;
      });
    },
    []
  ), T = M(() => {
    r && (m.current && (clearTimeout(m.current), m.current = null), He(r).then(() => o(!1)));
  }, [r]), I = M(() => {
    if (!r) return;
    m.current && (clearTimeout(m.current), m.current = null), (async () => {
      i && (await He(r), o(!1));
      const U = await or(r.id);
      U && s(U);
    })();
  }, [r, i]), S = M(() => {
    Ge(e).then((O) => {
      s(O), o(!1), p([]), h([]);
    });
  }, [e]), D = M((O) => {
    const U = O.trim();
    U && (s((P) => !P || P.name === U ? P : { ...P, name: U }), o(!0));
  }, []), _ = M((O) => {
    s((U) => !U || U.icon === O ? U : { ...U, icon: O }), o(!0);
  }, []), W = M((O) => {
    s((U) => {
      if (!U) return U;
      const P = U.tags ?? [];
      return P.length === O.length && P.every((B, K) => B === O[K]) ? U : { ...U, tags: [...O] };
    }), o(!0);
  }, []), Q = M(() => {
    p((O) => {
      if (O.length === 0 || !r) return O;
      const U = O[O.length - 1];
      return h((P) => [
        ...P,
        { nodes: r.nodes, edges: r.edges }
      ]), s({ ...r, nodes: U.nodes, edges: U.edges }), o(!0), O.slice(0, -1);
    });
  }, [r]), ee = M(() => {
    h((O) => {
      if (O.length === 0 || !r) return O;
      const U = O[O.length - 1];
      return p((P) => {
        const B = [
          ...P,
          { nodes: r.nodes, edges: r.edges }
        ];
        return B.length > hn && B.shift(), B;
      }), s({ ...r, nodes: U.nodes, edges: U.edges }), o(!0), O.slice(0, -1);
    });
  }, [r]), de = F(
    () => ({
      definition: r,
      dirty: i,
      selectedNodeId: d,
      setSelectedNodeId: c,
      addNode: u,
      updateNode: v,
      updateNodeData: w,
      removeNode: N,
      duplicateNodes: C,
      addEdge: y,
      removeEdge: k,
      setPositions: b,
      save: T,
      publish: I,
      revert: S,
      undo: Q,
      redo: ee,
      canUndo: a.length > 0,
      canRedo: f.length > 0,
      rename: D,
      setIcon: _,
      setTags: W
    }),
    [
      r,
      i,
      d,
      u,
      v,
      w,
      N,
      C,
      y,
      k,
      b,
      T,
      I,
      S,
      Q,
      ee,
      a.length,
      f.length,
      D,
      _,
      W
    ]
  );
  return /* @__PURE__ */ n(Et.Provider, { value: de, children: t });
}
function dt() {
  const e = it(Et);
  if (!e)
    throw new Error(
      "usePipelineEditor must be used within a PipelineEditorProvider"
    );
  return e;
}
const co = "ws_pipeline_runs_v1:", po = 50;
function rn(e) {
  return `${co}${e}`;
}
let xn = !1;
function uo(e, t) {
  try {
    localStorage.setItem(e, t);
  } catch (r) {
    xn || (xn = !0, console.warn("[runHistory] localStorage write failed", r));
  }
}
function et(e) {
  try {
    const t = localStorage.getItem(rn(e));
    if (!t) return [];
    const r = JSON.parse(t);
    return Array.isArray(r) ? r : [];
  } catch {
    return [];
  }
}
function At(e, t) {
  return et(e).find((s) => s.id === t) ?? null;
}
function ir(e, t) {
  const r = et(e).filter((i) => i.id !== t.id), s = [t, ...r].sort((i, o) => o.startedAt.localeCompare(i.startedAt)).slice(0, po);
  uo(rn(e), JSON.stringify(s));
}
function ar(e) {
  try {
    localStorage.removeItem(rn(e));
  } catch {
  }
}
function lr() {
  const { idToken: e } = $t(), [t, r] = R(!1), [s, i] = R(null), [o, d] = R(!1), c = "";
  return { triggerRun: M(
    async (p, f, h) => {
      r(!0), i(null), d(!1);
      try {
        const m = Re(p), x = {};
        f && (x.triggerPayload = f), m && (x.definition = m);
        const g = {
          "Content-Type": "application/json",
          ...e ? { Authorization: `Bearer ${e}` } : {}
        };
        h?.idempotencyKey && (g["Idempotency-Key"] = h.idempotencyKey);
        const u = await fetch(
          `${c}/api/pipelines/${encodeURIComponent(p)}/runs`,
          {
            method: "POST",
            headers: g,
            body: JSON.stringify(x)
          }
        );
        if (!u.ok) {
          const N = await u.text().catch(() => "");
          return i(
            `Trigger failed (${u.status})${N ? `: ${N}` : ""}`
          ), null;
        }
        const v = typeof u.headers?.get == "function" ? u.headers.get("X-Idempotent-Replay") : u.headers["x-idempotent-replay"] ?? null;
        return d(v === "true"), (await u.json()).runId;
      } catch (m) {
        return i(m.message), null;
      } finally {
        r(!1);
      }
    },
    [c, e]
  ), isTriggering: t, lastError: s, isReplay: o };
}
function It() {
  const e = typeof globalThis < "u" ? globalThis.crypto : void 0;
  return e && typeof e.randomUUID == "function" ? e.randomUUID() : `ws-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function mo() {
  const { sendMessage: e } = Zn(), t = M(
    (h) => e({ service: "pipeline", action: "subscribe", channel: `pipeline:run:${h}` }),
    [e]
  ), r = M(
    (h) => e({ service: "pipeline", action: "unsubscribe", channel: `pipeline:run:${h}` }),
    [e]
  ), s = M(
    () => e({ service: "pipeline", action: "subscribe", channel: "pipeline:all" }),
    [e]
  ), i = M(
    () => e({ service: "pipeline", action: "unsubscribe", channel: "pipeline:all" }),
    [e]
  ), o = M(
    () => e({ service: "pipeline", action: "subscribe", channel: "pipeline:approvals" }),
    [e]
  ), d = M(
    () => e({ service: "pipeline", action: "unsubscribe", channel: "pipeline:approvals" }),
    [e]
  ), c = M(
    (h, m = {}) => {
      const x = m.correlationId ?? It();
      return e({
        service: "pipeline",
        action: "trigger",
        pipelineId: h,
        ...m.definition ? { definition: m.definition } : {},
        ...m.triggerPayload ? { triggerPayload: m.triggerPayload } : {},
        ...m.triggeredBy ? { triggeredBy: m.triggeredBy } : {},
        correlationId: x
      }), x;
    },
    [e]
  ), a = M(
    (h, m) => {
      const x = m ?? It();
      return e({ service: "pipeline", action: "cancel", runId: h, correlationId: x }), x;
    },
    [e]
  ), p = M(
    (h, m, x, g = {}) => {
      const u = g.correlationId ?? It();
      return e({
        service: "pipeline",
        action: "resolveApproval",
        runId: h,
        stepId: m,
        decision: x,
        ...g.comment ? { comment: g.comment } : {},
        ...g.decidedBy ? { decidedBy: g.decidedBy } : {},
        correlationId: u
      }), u;
    },
    [e]
  ), f = M(
    (h, m, x) => {
      const g = x ?? It();
      return e({
        service: "pipeline",
        action: "resumeFromStep",
        runId: h,
        fromNodeId: m,
        correlationId: g
      }), g;
    },
    [e]
  );
  return {
    subscribeToRun: t,
    unsubscribeFromRun: r,
    subscribeToAll: s,
    unsubscribeFromAll: i,
    subscribeToApprovals: o,
    unsubscribeFromApprovals: d,
    triggerRun: c,
    cancelRun: a,
    resolveApproval: p,
    requestResumeFromStep: f
  };
}
function fo(e, t = {}) {
  const { enabled: r = !0 } = t, { connectionState: s, sendMessage: i } = Zn();
  G(() => {
    if (!r || !e || s !== "connected") return;
    const o = `pipeline:run:${e}`;
    return i({ service: "pipeline", action: "subscribe", channel: o }), () => {
      i({ service: "pipeline", action: "unsubscribe", channel: o });
    };
  }, [r, e, s, i]);
}
const Vt = 20, Ot = Xn(null);
function ho(e, t) {
  return e.steps[t] ?? {
    nodeId: t,
    status: "pending"
  };
}
function De(e, t, r) {
  const s = ho(e, t), i = typeof r == "function" ? r(s) : { ...s, ...r };
  return { ...e, steps: { ...e.steps, [t]: i } };
}
function xo(e) {
  const t = Object.values(e);
  if (t.length <= Vt) return e;
  const r = t.filter(
    (c) => c.status === "running" || c.status === "pending" || c.status === "awaiting_approval" || c.status === "paused_at_breakpoint"
  ), i = t.filter(
    (c) => c.status !== "running" && c.status !== "pending" && c.status !== "awaiting_approval" && c.status !== "paused_at_breakpoint"
  ).sort((c, a) => a.startedAt.localeCompare(c.startedAt)).slice(
    0,
    Math.max(0, Vt - r.length)
  ), o = [...r, ...i], d = {};
  for (const c of o) d[c.id] = c;
  return d;
}
function go({ children: e }) {
  const t = it(Et), { triggerRun: r } = lr(), s = mo(), [i, o] = R({}), [d, c] = R(!1), a = oe(/* @__PURE__ */ new Set()), p = oe(null);
  G(() => {
    const b = t?.definition?.id;
    !b || p.current === b || (p.current = b, c(!0), Yt(b, { limit: Vt }).then((T) => {
      o((I) => {
        const S = { ...I };
        for (const D of T.runs)
          S[D.id] || (S[D.id] = D);
        return S;
      });
    }).catch((T) => {
      console.error("[PipelineRuns] Failed to load history from API", T), o((I) => {
        const S = { ...I };
        for (const D of et(b))
          S[D.id] || (S[D.id] = D);
        return S;
      });
    }).finally(() => c(!1)));
  }, [t?.definition?.id]), Pe("*", (b) => {
    const { eventType: T, payload: I } = b;
    o((S) => bo(S, T, I));
  }), G(() => {
    for (const b of Object.values(i))
      if ((b.status === "completed" || b.status === "failed" || b.status === "cancelled") && !a.current.has(b.id)) {
        a.current.add(b.id);
        try {
          ir(b.pipelineId, b);
        } catch (I) {
          console.warn("[PipelineRuns] appendRun failed", I);
        }
      }
  }, [i]);
  const f = M(
    async (b, T) => {
      const I = await r(b, T);
      if (!I)
        throw new Error("Trigger failed (REST POST did not return a runId)");
      return I;
    },
    [r]
  ), h = M(
    (b) => {
      s.cancelRun(b);
    },
    [s]
  ), m = M(
    (b, T, I, S) => {
      s.resolveApproval(b, T, I, { comment: S });
    },
    [s]
  ), x = oe(i);
  G(() => {
    x.current = i;
  }, [i]);
  const g = M(
    async (b) => {
      const I = Object.values(x.current).filter((S) => S.status === "failed").filter((S) => S.steps[b]?.status === "failed").sort((S, D) => D.startedAt.localeCompare(S.startedAt))[0];
      if (!I) {
        console.warn(
          "[PipelineRuns] retryFromStep — no failed run found for node",
          b
        );
        return;
      }
      try {
        await Xt(I.pipelineId, I.id, b);
      } catch (S) {
        console.error("[PipelineRuns] retryFromNode API failed", S);
      }
    },
    []
  ), u = M(
    async (b, T, I) => {
      const S = { ...I ?? {}, __breakpoints: T };
      return f(b, S);
    },
    [f]
  ), v = M(
    (b, T, I = "continue") => {
      const _ = x.current[b]?.pipelineId ?? "unknown";
      fetch(
        `/api/pipelines/${encodeURIComponent(_)}/runs/${encodeURIComponent(b)}/breakpoint/${encodeURIComponent(T)}/resolve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: I })
        }
      ).catch((W) => {
        console.error("[PipelineRuns] resolveBreakpoint API failed", W);
      });
    },
    []
  ), w = M(
    async (b, T, I, S) => {
      const W = x.current[b]?.pipelineId ?? "unknown", Q = `/api/pipelines/${encodeURIComponent(W)}/runs/${encodeURIComponent(b)}/breakpoint/${encodeURIComponent(T)}/patch`, ee = await fetch(Q, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patch: I, ...S ? { appliedBy: S } : {} })
      });
      if (ee.status === 200)
        return await ee.json();
      if (ee.status === 422) {
        const O = await ee.json().catch(() => ({}));
        return O.result ? O.result : {
          patchId: "",
          before: {},
          after: {},
          validation: { ok: !1, reason: O.error ?? "patch rejected" }
        };
      }
      const de = await ee.text().catch(() => "");
      throw new Error(`applyContextPatch HTTP ${ee.status}: ${de}`);
    },
    []
  ), N = M(
    async (b, T, I) => {
      const _ = x.current[b]?.pipelineId ?? "unknown", W = `/api/pipelines/${encodeURIComponent(_)}/runs/${encodeURIComponent(b)}/breakpoint/${encodeURIComponent(T)}/patch/${encodeURIComponent(I)}`, Q = await fetch(W, { method: "DELETE" });
      if (Q.status !== 204) {
        const ee = await Q.text().catch(() => "");
        throw new Error(`revertContextPatch HTTP ${Q.status}: ${ee}`);
      }
    },
    []
  ), C = M((b) => {
    o((T) => {
      const I = T[b.id];
      if (I && I.status === b.status) {
        const S = Object.keys(I.steps).length, D = Object.keys(b.steps).length;
        if (S >= D) return T;
      }
      return { ...T, [b.id]: b };
    });
  }, []), y = F(
    () => Object.values(i).filter(
      (b) => b.status === "running" || b.status === "pending" || b.status === "awaiting_approval" || b.status === "paused_at_breakpoint"
    ).map((b) => b.id),
    [i]
  ), k = F(
    () => ({
      runs: i,
      activeRunIds: y,
      triggerRun: f,
      triggerDebugRun: u,
      cancelRun: h,
      resolveApproval: m,
      resolveBreakpoint: v,
      applyContextPatch: w,
      revertContextPatch: N,
      retryFromStep: g,
      ingestRun: C
    }),
    [
      i,
      y,
      f,
      u,
      h,
      m,
      v,
      w,
      N,
      g,
      C
    ]
  );
  return /* @__PURE__ */ n(Ot.Provider, { value: k, children: e });
}
function bo(e, t, r) {
  if (!r || typeof r != "object" || typeof r.runId != "string") return e;
  switch (t) {
    case "pipeline.run.started": {
      const o = r, d = {
        id: o.runId,
        pipelineId: o.pipelineId,
        pipelineVersion: 0,
        status: "running",
        triggeredBy: o.triggeredBy,
        ownerNodeId: "local",
        startedAt: o.at,
        currentStepIds: [],
        steps: {},
        context: {}
      };
      return xo({ ...e, [o.runId]: d });
    }
    case "pipeline.run.completed": {
      const o = r, d = e[o.runId];
      return d ? {
        ...e,
        [o.runId]: {
          ...d,
          status: "completed",
          completedAt: o.at,
          durationMs: o.durationMs,
          currentStepIds: []
        }
      } : e;
    }
    case "pipeline.run.failed": {
      const o = r, d = e[o.runId];
      return d ? {
        ...e,
        [o.runId]: {
          ...d,
          status: "failed",
          completedAt: o.at,
          error: o.error,
          currentStepIds: []
        }
      } : e;
    }
    case "pipeline.run.cancelled": {
      const o = r, d = e[o.runId];
      return d ? {
        ...e,
        [o.runId]: {
          ...d,
          status: "cancelled",
          completedAt: o.at,
          currentStepIds: []
        }
      } : e;
    }
    case "pipeline.step.started": {
      const o = r, d = e[o.runId];
      if (!d) return e;
      const c = De(d, o.stepId, (a) => ({
        ...a,
        nodeId: o.stepId,
        status: "running",
        startedAt: o.at
      }));
      return {
        ...e,
        [o.runId]: {
          ...c,
          currentStepIds: Array.from(
            /* @__PURE__ */ new Set([...c.currentStepIds, o.stepId])
          )
        }
      };
    }
    case "pipeline.step.completed": {
      const o = r, d = e[o.runId];
      if (!d) return e;
      const c = De(d, o.stepId, (a) => ({
        ...a,
        status: "completed",
        completedAt: o.at,
        durationMs: o.durationMs,
        output: o.output
      }));
      return {
        ...e,
        [o.runId]: {
          ...c,
          currentStepIds: c.currentStepIds.filter((a) => a !== o.stepId)
        }
      };
    }
    case "pipeline.step.failed": {
      const o = r, d = e[o.runId];
      if (!d) return e;
      const c = De(d, o.stepId, (a) => ({
        ...a,
        status: "failed",
        completedAt: o.at,
        error: o.error
      }));
      return {
        ...e,
        [o.runId]: {
          ...c,
          currentStepIds: c.currentStepIds.filter((a) => a !== o.stepId)
        }
      };
    }
    case "pipeline.step.skipped": {
      const o = r, d = e[o.runId];
      if (!d) return e;
      const c = De(d, o.stepId, (a) => ({
        ...a,
        status: "skipped",
        completedAt: o.at,
        error: a.error
      }));
      return {
        ...e,
        [o.runId]: {
          ...c,
          currentStepIds: c.currentStepIds.filter((a) => a !== o.stepId)
        }
      };
    }
    case "pipeline.step.cancelled": {
      const o = r, d = e[o.runId];
      if (!d) return e;
      const c = De(d, o.stepId, (a) => ({
        ...a,
        // `StepStatus` has no 'cancelled' — track as failed with marker.
        status: "failed",
        completedAt: o.at,
        error: a.error ?? "cancelled"
      }));
      return {
        ...e,
        [o.runId]: {
          ...c,
          currentStepIds: c.currentStepIds.filter((a) => a !== o.stepId)
        }
      };
    }
    case "pipeline.llm.prompt": {
      const o = r, d = e[o.runId];
      return d ? {
        ...e,
        [o.runId]: De(d, o.stepId, (c) => ({
          ...c,
          llm: {
            prompt: o.prompt,
            response: c.llm?.response ?? "",
            tokensIn: c.llm?.tokensIn ?? 0,
            tokensOut: c.llm?.tokensOut ?? 0,
            ...c.llm?.streamOpened !== void 0 ? { streamOpened: c.llm.streamOpened } : {},
            ...c.llm?.firstTokenLatencyMs !== void 0 ? { firstTokenLatencyMs: c.llm.firstTokenLatencyMs } : {}
          }
        }))
      } : e;
    }
    case "pipeline.llm.stream.opened": {
      const o = r, d = e[o.runId];
      return d ? {
        ...e,
        [o.runId]: De(d, o.stepId, (c) => {
          const a = Date.parse(o.openedAt), p = {
            ...c,
            llm: {
              prompt: c.llm?.prompt ?? "",
              response: c.llm?.response ?? "",
              tokensIn: c.llm?.tokensIn ?? 0,
              tokensOut: c.llm?.tokensOut ?? 0,
              streamOpened: !0,
              ...c.llm?.firstTokenLatencyMs !== void 0 ? { firstTokenLatencyMs: c.llm.firstTokenLatencyMs } : {}
            }
          };
          return p.llm._streamOpenedAtMs = Number.isFinite(a) ? a : Date.now(), p;
        })
      } : e;
    }
    case "pipeline.llm.token": {
      const o = r, d = e[o.runId];
      return d ? {
        ...e,
        [o.runId]: De(d, o.stepId, (c) => {
          const a = c.llm?.tokensOut ?? 0, p = a === 0, f = c.llm?._streamOpenedAtMs, h = Date.parse(o.at), m = p && typeof f == "number" && Number.isFinite(h) ? Math.max(0, h - f) : c.llm?.firstTokenLatencyMs;
          return {
            ...c,
            llm: {
              prompt: c.llm?.prompt ?? "",
              response: (c.llm?.response ?? "") + o.token,
              tokensIn: c.llm?.tokensIn ?? 0,
              tokensOut: a + 1,
              streamOpened: !1,
              ...m !== void 0 ? { firstTokenLatencyMs: m } : {}
            }
          };
        })
      } : e;
    }
    case "pipeline.llm.response": {
      const o = r, d = e[o.runId];
      return d ? {
        ...e,
        [o.runId]: De(d, o.stepId, (c) => ({
          ...c,
          llm: {
            prompt: c.llm?.prompt ?? "",
            response: o.response,
            tokensIn: o.tokensIn,
            tokensOut: o.tokensOut
          }
        }))
      } : e;
    }
    case "pipeline.step.breakpoint": {
      const o = r, d = e[o.runId];
      if (!d) return e;
      const c = De(d, o.stepId, (a) => ({
        ...a,
        status: "awaiting"
      }));
      return {
        ...e,
        [o.runId]: { ...c, status: "paused_at_breakpoint" }
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
      const o = r, d = e[o.runId];
      if (!d) return e;
      const c = t === "pipeline.step.context.patched-unvalidated", a = {
        patchId: o.patchId,
        appliedAt: o.at,
        mode: o.mode,
        ...c ? { unvalidated: !0 } : {}
      };
      return {
        ...e,
        [o.runId]: De(d, o.stepId, (p) => ({
          ...p,
          patches: [...p.patches ?? [], a]
        }))
      };
    }
    case "pipeline.step.context.patch-reverted": {
      const o = r, d = e[o.runId];
      return d ? {
        ...e,
        [o.runId]: De(d, o.stepId, (c) => ({
          ...c,
          patches: (c.patches ?? []).map(
            (a) => a.patchId === o.patchId ? { ...a, revertedAt: o.at } : a
          )
        }))
      } : e;
    }
    case "pipeline.approval.requested": {
      const o = r, d = e[o.runId];
      if (!d) return e;
      const c = De(d, o.stepId, (a) => ({
        ...a,
        status: "awaiting",
        approvals: a.approvals ?? []
      }));
      return {
        ...e,
        [o.runId]: { ...c, status: "awaiting_approval" }
      };
    }
    case "pipeline.run.resumed-from-step": {
      const o = r, d = e[o.runId];
      if (!d) return e;
      const c = {
        fromNodeId: o.fromNodeId,
        ...o.originalFailedStepId ? { originalFailedStepId: o.originalFailedStepId } : {},
        at: o.at
      };
      return {
        ...e,
        [o.runId]: {
          ...d,
          status: "running",
          replayAttempts: (d.replayAttempts ?? 0) + 1,
          resumeHistory: [...d.resumeHistory ?? [], c]
        }
      };
    }
    case "pipeline.approval.recorded": {
      const o = r, d = e[o.runId];
      if (!d) return e;
      const c = {
        userId: o.userId,
        decision: o.decision,
        at: o.at
      };
      return {
        ...e,
        [o.runId]: De(d, o.stepId, (a) => ({
          ...a,
          approvals: [...a.approvals ?? [], c]
        }))
      };
    }
    default:
      return e;
  }
}
function nt() {
  const e = it(Ot);
  if (!e)
    throw new Error(
      "usePipelineRuns must be used within a PipelineRunsProvider"
    );
  return e;
}
function Te() {
  return it(Ot)?.retryFromStep ?? (async () => {
  });
}
function ke(e) {
  const t = it(Ot);
  return F(() => {
    if (!t) return null;
    let r = null, s = "";
    for (const i of Object.values(t.runs)) {
      const o = i.steps[e];
      o && i.startedAt > s && (r = o, s = i.startedAt);
    }
    return r;
  }, [t, e]);
}
const yo = {
  trigger: ["out"],
  llm: ["out", "error"],
  transform: ["out"],
  condition: ["true", "false"],
  action: ["out", "error"],
  fork: "fork",
  // dynamic: 'branch-0'..'branch-(N-1)'
  join: ["out"],
  approval: ["approved", "rejected"],
  agent: ["out", "error"],
  "mcp-tool": ["out", "error"],
  "knowledge-base": ["out", "error"],
  "graph-query": ["out", "error"],
  memory: ["out", "error"],
  guardrail: ["pass", "block"],
  policy: ["allow", "deny"],
  "ag-ui-output": []
}, vo = {
  trigger: null,
  // Trigger has no inputs — never a target
  llm: ["in"],
  transform: ["in"],
  condition: ["in"],
  action: ["in"],
  fork: ["in"],
  join: "join",
  // dynamic: 'in-0'..'in-(N-1)'
  approval: ["in"],
  agent: ["in"],
  "mcp-tool": ["in"],
  "knowledge-base": ["in"],
  "graph-query": ["in"],
  memory: ["in"],
  guardrail: ["in"],
  policy: ["in"],
  "ag-ui-output": ["in"]
};
function Jt(e, t, r, s) {
  return !(!wo(e, t) || !No(r, s));
}
function wo(e, t) {
  const r = yo[e];
  return r === "fork" ? ko(t) : r.includes(t);
}
function No(e, t) {
  const r = vo[e];
  return r === null ? !1 : r === "join" ? Co(t) : r.includes(t);
}
function ko(e) {
  return /^branch-(\d+)$/.exec(e) !== null;
}
function Co(e) {
  return /^in-(\d+)$/.exec(e) !== null;
}
const Io = {
  idle: { card: "border border-[#d1d5db] bg-white", dot: "bg-[#d1d5db]" },
  pending: { card: "border border-dashed border-[#93c5fd] bg-[#eff6ff]", dot: "bg-[#93c5fd]" },
  running: { card: "border-2 border-[#2563eb] bg-[#eff6ff]", dot: "bg-[#2563eb]" },
  awaiting: { card: "border-2 border-[#f59e0b] bg-[#fffbeb]", dot: "bg-[#f59e0b]" },
  completed: { card: "border border-[#16a34a] bg-[#f0fdf4]", dot: "bg-[#16a34a]" },
  failed: { card: "border-2 border-[#dc2626] bg-[#fef2f2]", dot: "bg-[#dc2626]" },
  skipped: { card: "border border-dashed border-[#d1d5db] bg-[#f9fafb] opacity-50", dot: "bg-[#d1d5db]" }
};
function Ce(e) {
  const { icon: t, subtitle: r, state: s, body: i, footer: o, selected: d, onRetry: c, hasBreakpoint: a, pausedAtBreakpoint: p, ariaLabel: f, children: h } = e, m = Io[s], x = Qt(), [g, u] = R(!1), v = s === "failed" && typeof c == "function", w = (b) => {
    b.preventDefault(), b.stopPropagation(), c?.();
  }, N = !x && s === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !x && s === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", C = !!(i || o || v), y = !!(i || o), k = r ? `${r}, state: ${s}` : `Node, state: ${s}`;
  return /* @__PURE__ */ l(
    "div",
    {
      className: $(
        "w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        p ? "border-2 border-[#d97706] bg-[#fffbeb] shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]" : m.card,
        !p && d && "shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]",
        !p && !d && "shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
        x && "transition-none"
      ),
      role: "button",
      tabIndex: 0,
      "aria-label": f ?? k,
      "aria-selected": !!d,
      "data-state": s,
      "data-node-state": s,
      "data-pipeline-node": "true",
      children: [
        a && /* @__PURE__ */ n(
          "span",
          {
            "aria-label": "breakpoint",
            "data-testid": "breakpoint-dot",
            className: "absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-[#ef4444] border-[1.5px] border-white z-[1]"
          }
        ),
        /* @__PURE__ */ l("div", { className: $(
          "flex items-center gap-2 h-7 px-2.5",
          C && "border-b border-border"
        ), children: [
          /* @__PURE__ */ n("span", { className: "text-sm leading-none shrink-0", "aria-hidden": "true", children: t }),
          /* @__PURE__ */ n("span", { className: "flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap", children: r }),
          /* @__PURE__ */ n(
            "span",
            {
              className: $("w-2 h-2 rounded-full shrink-0", m.dot, N),
              "aria-label": `state: ${s}`
            }
          )
        ] }),
        v && /* @__PURE__ */ n("div", { className: $(
          "flex px-2.5 py-1.5",
          y && "border-b border-border"
        ), children: /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: $(
              "cursor-pointer appearance-none font-inherit text-[11px] font-medium leading-tight px-2 py-0.5 rounded-full border border-[#dc2626] text-[#dc2626] transition-colors duration-[120ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              g ? "bg-[#fef2f2]" : "bg-transparent",
              x && "transition-none"
            ),
            onClick: w,
            onMouseDown: (b) => b.stopPropagation(),
            onMouseEnter: () => u(!0),
            onMouseLeave: () => u(!1),
            "aria-label": "Retry from here",
            children: "⟳ Retry from here"
          }
        ) }),
        i != null && /* @__PURE__ */ n("div", { className: "px-2.5 py-2 text-[13px] leading-[1.4] text-text-secondary", children: i }),
        o != null && /* @__PURE__ */ n("div", { className: "border-t border-border px-2.5 py-1.5 text-xs text-text-secondary", children: o }),
        h
      ]
    }
  );
}
function gn(e) {
  switch (e.triggerType) {
    case "manual":
      return "Manual";
    case "document.finalize":
      return "On doc.finalize";
    case "document.comment":
      return "On doc.comment";
    case "document.submit":
      return "On doc.submit";
    case "schedule":
      return `Schedule: ${e.schedule ?? "—"}`;
    case "webhook":
      return `Webhook: ${e.webhookPath ?? "/—"}`;
    default:
      return "Trigger";
  }
}
function So(e) {
  return e.triggerType === "schedule" ? e.schedule ? `cron: ${e.schedule}` : "No schedule set" : e.triggerType === "webhook" ? e.webhookPath ? `POST ${e.webhookPath}` : "No path set" : e.triggerType.startsWith("document.") ? e.documentTypeId ? `Doc type: ${e.documentTypeId}` : "Any document" : "Fires on user click";
}
function To(e) {
  const { id: t, data: r, selected: s } = e, i = ke(t), o = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? o ?? r._state ?? "idle", a = Te(), p = c === "failed" ? () => a(t) : void 0, f = `Trigger node, ${gn(r)}, state: ${c}`;
  return /* @__PURE__ */ n(
    Ce,
    {
      icon: "▶",
      subtitle: gn(r),
      state: c,
      body: /* @__PURE__ */ n("span", { className: "italic", children: So(r) }),
      selected: s,
      onRetry: p,
      ariaLabel: f,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: /* @__PURE__ */ n(
        se,
        {
          type: "source",
          position: ie.Right,
          id: "out",
          className: "!bg-slate-300 !w-2.5 !h-2.5"
        }
      )
    }
  );
}
function Ao(e) {
  if (!e || e.trim().length === 0) return "Not configured";
  const r = e.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
function Do({ info: e }) {
  const [t, r] = R(!1), s = t ? e.response : e.response.length > 60 ? `${e.response.slice(0, 60)}…` : e.response, i = e.tokensIn != null || e.tokensOut != null;
  return /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: () => r((o) => !o),
        className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-xs text-text-secondary font-medium text-left",
        children: [
          t ? "▾" : "▸",
          " Response",
          i && /* @__PURE__ */ l("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: [
            e.tokensIn ?? 0,
            " → ",
            e.tokensOut ?? 0,
            " tokens"
          ] }),
          e.streamOpening && /* @__PURE__ */ n(
            "span",
            {
              className: "ml-1.5 text-[11px] text-[#2563eb]",
              "data-testid": "llm-stream-opening",
              title: "LLM stream is open — waiting for the first token",
              children: "· stream open — waiting…"
            }
          ),
          !e.streamOpening && e.streaming && /* @__PURE__ */ n("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: "· streaming…" })
        ]
      }
    ),
    /* @__PURE__ */ n(
      "div",
      {
        className: t ? "mt-1 font-mono text-[11px] leading-[1.4] text-text-primary whitespace-pre-wrap break-words line-clamp-6" : "mt-1 font-mono text-[11px] leading-[1.4] text-text-primary whitespace-pre-wrap break-words max-h-[1.4em] overflow-hidden",
        children: s
      }
    )
  ] });
}
function Ro(e) {
  const { id: t, data: r, selected: s } = e, i = ke(t), o = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? o ?? r._state ?? "idle", a = i?.llm, p = c === "running" && a?.streamOpened === !0 && (a?.tokensOut ?? 0) === 0, f = c === "running" && a !== void 0 && (a.tokensOut ?? 0) > 0, h = Te(), m = c === "failed" ? () => h(t) : void 0, x = /* @__PURE__ */ n("span", { className: "italic", children: Ao(r.userPromptTemplate) }), u = (a ? {
    response: a.response ?? "",
    tokensIn: a.tokensIn,
    tokensOut: a.tokensOut,
    streaming: f,
    streamOpening: p
  } : void 0) ?? r._llmResponse, v = u ? /* @__PURE__ */ n(Do, { info: u }) : void 0, w = (r.systemPrompt ?? "").replace(/\s+/g, " ").trim(), N = w.length === 0 ? "no system prompt" : `system prompt: ${w.length > 60 ? `${w.slice(0, 60)}…` : w}`, C = `LLM node, ${r.model || r.provider}, ${N}, state: ${c}`;
  return /* @__PURE__ */ l(
    Ce,
    {
      icon: "🧠",
      subtitle: r.model || r.provider,
      state: c,
      body: x,
      footer: v,
      selected: s,
      onRetry: m,
      ariaLabel: C,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ n(se, { type: "target", position: ie.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "error", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function $o(e) {
  if (!e) return "—";
  const t = e.replace(/\s+/g, " ").trim();
  return t.length > 60 ? `${t.slice(0, 60)}…` : t;
}
function Po(e) {
  const { id: t, data: r, selected: s } = e, i = ke(t), o = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? o ?? r._state ?? "idle", a = Te(), p = c === "failed" ? () => a(t) : void 0;
  return /* @__PURE__ */ l(
    Ce,
    {
      icon: "✨",
      subtitle: r.transformType,
      state: c,
      body: /* @__PURE__ */ n("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: $o(r.expression) }),
      selected: s,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ n(se, { type: "target", position: ie.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5" })
      ]
    }
  );
}
function Mo(e) {
  if (!e) return "—";
  const t = e.replace(/\s+/g, " ").trim();
  return t.length > 60 ? `${t.slice(0, 60)}…` : t;
}
function Eo(e) {
  const { id: t, data: r, selected: s } = e, i = ke(t), o = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? o ?? r._state ?? "idle", a = Te(), p = c === "failed" ? () => a(t) : void 0;
  return /* @__PURE__ */ l(
    Ce,
    {
      icon: "❓",
      subtitle: r.label || "condition",
      state: c,
      body: /* @__PURE__ */ n("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Mo(r.expression) }),
      selected: s,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ n(se, { type: "target", position: ie.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "true", className: "!bg-green-600 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "false", className: "!bg-amber-500 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Oo(e) {
  const t = e.config ?? {};
  switch (e.actionType) {
    case "update-document":
      return `Update ${typeof t.documentId == "string" ? t.documentId : "(current)"}`;
    case "post-comment":
      return `Comment on ${typeof t.target == "string" ? t.target : "(current doc)"}`;
    case "notify":
      return `Notify ${typeof t.channel == "string" ? t.channel : "recipients"}`;
    case "webhook":
      return `POST → ${typeof t.url == "string" ? t.url : "(no URL)"}`;
    case "mcp-tool":
      return `Invoke ${typeof t.tool == "string" ? t.tool : "(no tool)"}`;
    default:
      return "Action";
  }
}
function Uo(e) {
  const { id: t, data: r, selected: s } = e, i = ke(t), o = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? o ?? r._state ?? "idle", a = Te(), p = c === "failed" ? () => a(t) : void 0;
  return /* @__PURE__ */ l(
    Ce,
    {
      icon: "⚡",
      subtitle: r.actionType,
      state: c,
      body: /* @__PURE__ */ n("span", { className: "italic", children: Oo(r) }),
      selected: s,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ n(se, { type: "target", position: ie.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "error", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function _o(e) {
  const { id: t, data: r, selected: s } = e, i = ke(t), o = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? o ?? r._state ?? "idle", a = Te(), p = c === "failed" ? () => a(t) : void 0, f = Math.max(2, Math.min(8, r.branchCount ?? 2)), h = Array.from({ length: f }, (m, x) => {
    const g = r.branchLabels?.[x];
    return g && g.trim().length > 0 ? g : `branch ${x}`;
  });
  return /* @__PURE__ */ l(
    Ce,
    {
      icon: "⑂",
      subtitle: `${f} branches`,
      state: c,
      body: /* @__PURE__ */ n("ul", { className: "m-0 p-0 list-none flex flex-col gap-0.5 text-xs text-text-secondary", children: h.map((m, x) => /* @__PURE__ */ l("li", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: [
        "• ",
        m
      ] }, x)) }),
      selected: s,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ n(se, { type: "target", position: ie.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        h.map((m, x) => {
          const g = (x + 1) / (f + 1) * 100;
          return /* @__PURE__ */ n(
            se,
            {
              type: "source",
              position: ie.Right,
              id: `branch-${x}`,
              className: "!bg-blue-600 !w-2.5 !h-2.5",
              style: { top: `${g}%` }
            },
            x
          );
        })
      ]
    }
  );
}
function Lo(e) {
  return e.mode === "all" ? "all" : e.mode === "any" ? "any" : `${e.n ?? 1} of many`;
}
function Bo(e) {
  switch (e) {
    case "deep-merge":
      return "Deep merge";
    case "array-collect":
      return "Array collect";
    case "last-writer-wins":
      return "Last writer wins";
    default:
      return String(e);
  }
}
function Fo(e) {
  const { id: t, data: r, selected: s } = e, i = ke(t), o = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? o ?? r._state ?? "idle", a = Te(), p = c === "failed" ? () => a(t) : void 0, f = $r({ handleType: "target" }), h = Math.max(2, f.length + 1);
  return /* @__PURE__ */ l(
    Ce,
    {
      icon: "⑃",
      subtitle: Lo(r),
      state: c,
      body: /* @__PURE__ */ n("span", { className: "italic", children: Bo(r.mergeStrategy) }),
      selected: s,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        Array.from({ length: h }, (m, x) => {
          const g = (x + 1) / (h + 1) * 100;
          return /* @__PURE__ */ n(
            se,
            {
              type: "target",
              position: ie.Left,
              id: `in-${x}`,
              className: "!bg-slate-300 !w-2.5 !h-2.5",
              style: { top: `${g}%` }
            },
            `in-${x}`
          );
        }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5" })
      ]
    }
  );
}
function jo(e) {
  return e.type === "role" ? `@${e.value}` : e.value;
}
function qo(e) {
  const { id: t, data: r, selected: s } = e, i = ke(t), o = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? o ?? r._state ?? "idle", a = Te(), p = c === "failed" ? () => a(t) : void 0, f = r.approvers ?? [], h = f.length, m = r.requiredCount ?? 0, x = `${h} approver${h === 1 ? "" : "s"}, ${m}/${h} required`, g = f.slice(0, 2), u = Math.max(0, f.length - 2), v = f.length === 0 ? /* @__PURE__ */ n("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ l("div", { className: "flex flex-wrap gap-1", children: [
    g.map((w, N) => /* @__PURE__ */ n(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: jo(w)
      },
      N
    )),
    u > 0 && /* @__PURE__ */ l("span", { className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-inset text-text-tertiary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap", children: [
      "+",
      u,
      " more"
    ] })
  ] });
  return /* @__PURE__ */ l(
    Ce,
    {
      icon: "✋",
      subtitle: x,
      state: c,
      body: v,
      selected: s,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ n(se, { type: "target", position: ie.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "approved", className: "!bg-green-600 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "rejected", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Ho({ id: e, data: t, selected: r }) {
  const s = ke(e), i = s?.status === "cancelled" ? "failed" : s?.status, o = t._state ?? i ?? "idle", d = Te(), c = t.agentName || t.agentId || "Not configured", a = `${t.protocol.toUpperCase()}${t.streaming ? " (streaming)" : ""}`;
  return /* @__PURE__ */ l(
    Ce,
    {
      icon: "🤖",
      subtitle: c,
      state: o,
      body: /* @__PURE__ */ n("span", { className: "text-[11px]", children: a }),
      selected: r,
      onRetry: o === "failed" && s ? () => d(e) : void 0,
      hasBreakpoint: t._hasBreakpoint,
      pausedAtBreakpoint: t._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ n(se, { type: "target", position: ie.Left, id: "in" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function zo({ id: e, data: t, selected: r }) {
  const s = ke(e), i = s?.status === "cancelled" ? "failed" : s?.status, o = t._state ?? i ?? "idle", d = Te(), c = t.toolName || "Not configured";
  return /* @__PURE__ */ l(
    Ce,
    {
      icon: "🔌",
      subtitle: c,
      state: o,
      body: t.gatewayUrl ? /* @__PURE__ */ n("span", { className: "text-[11px]", children: t.gatewayUrl }) : void 0,
      selected: r,
      onRetry: o === "failed" && s ? () => d(e) : void 0,
      hasBreakpoint: t._hasBreakpoint,
      pausedAtBreakpoint: t._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ n(se, { type: "target", position: ie.Left, id: "in" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Ko({ id: e, data: t, selected: r }) {
  const s = ke(e), i = s?.status === "cancelled" ? "failed" : s?.status, o = t._state ?? i ?? "idle", d = Te(), c = t.knowledgeBaseId || "Not configured", a = `Top ${t.topK} chunks${t.scoreThreshold ? ` (≥${t.scoreThreshold})` : ""}`;
  return /* @__PURE__ */ l(
    Ce,
    {
      icon: "📚",
      subtitle: c,
      state: o,
      body: /* @__PURE__ */ n("span", { className: "text-[11px]", children: a }),
      selected: r,
      onRetry: o === "failed" && s ? () => d(e) : void 0,
      hasBreakpoint: t._hasBreakpoint,
      pausedAtBreakpoint: t._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ n(se, { type: "target", position: ie.Left, id: "in" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Wo({ id: e, data: t, selected: r }) {
  const s = ke(e), i = s?.status === "cancelled" ? "failed" : s?.status, o = t._state ?? i ?? "idle", d = Te(), c = t.graphId || "Not configured", a = t.query.length > 40 ? `${t.query.slice(0, 37)}...` : t.query;
  return /* @__PURE__ */ l(
    Ce,
    {
      icon: "🕸️",
      subtitle: c,
      state: o,
      body: /* @__PURE__ */ n("span", { className: "text-[11px] font-mono", children: a }),
      selected: r,
      onRetry: o === "failed" && s ? () => d(e) : void 0,
      hasBreakpoint: t._hasBreakpoint,
      pausedAtBreakpoint: t._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ n(se, { type: "target", position: ie.Left, id: "in" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Vo({ id: e, data: t, selected: r }) {
  const s = ke(e), i = s?.status === "cancelled" ? "failed" : s?.status, o = t._state ?? i ?? "idle", d = Te(), c = `${t.mode} ${t.scope}`, a = t.namespace ? `ns: ${t.namespace}` : "No namespace";
  return /* @__PURE__ */ l(
    Ce,
    {
      icon: "💾",
      subtitle: c,
      state: o,
      body: /* @__PURE__ */ n("span", { className: "text-[11px]", children: a }),
      selected: r,
      onRetry: o === "failed" && s ? () => d(e) : void 0,
      hasBreakpoint: t._hasBreakpoint,
      pausedAtBreakpoint: t._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ n(se, { type: "target", position: ie.Left, id: "in" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Jo({ id: e, data: t, selected: r }) {
  const s = ke(e), i = s?.status === "cancelled" ? "failed" : s?.status, o = t._state ?? i ?? "idle", d = Te(), c = t.label || t.guardrailId || "Not configured";
  return /* @__PURE__ */ l(
    Ce,
    {
      icon: "🛡️",
      subtitle: c,
      state: o,
      body: /* @__PURE__ */ l("span", { className: "text-[11px]", children: [
        "Action: ",
        t.action
      ] }),
      selected: r,
      onRetry: o === "failed" && s ? () => d(e) : void 0,
      hasBreakpoint: t._hasBreakpoint,
      pausedAtBreakpoint: t._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ n(se, { type: "target", position: ie.Left, id: "in" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "pass", className: "!top-[40%] !bg-green-600" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "block", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Go({ id: e, data: t, selected: r }) {
  const s = ke(e), i = s?.status === "cancelled" ? "failed" : s?.status, o = t._state ?? i ?? "idle", d = Te(), c = t.label || t.action || "Not configured";
  return /* @__PURE__ */ l(
    Ce,
    {
      icon: "📜",
      subtitle: c,
      state: o,
      body: /* @__PURE__ */ l("span", { className: "text-[11px]", children: [
        t.principal,
        " → ",
        t.resource
      ] }),
      selected: r,
      onRetry: o === "failed" && s ? () => d(e) : void 0,
      hasBreakpoint: t._hasBreakpoint,
      pausedAtBreakpoint: t._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ n(se, { type: "target", position: ie.Left, id: "in" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "allow", className: "!top-[40%] !bg-green-600" }),
        /* @__PURE__ */ n(se, { type: "source", position: ie.Right, id: "deny", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Yo({ id: e, data: t, selected: r }) {
  const s = ke(e), i = s?.status === "cancelled" ? "failed" : s?.status, o = t._state ?? i ?? "idle", d = t.eventType === "CUSTOM" ? t.customEventName || "Custom" : t.eventType;
  return /* @__PURE__ */ n(
    Ce,
    {
      icon: "📡",
      subtitle: d,
      state: o,
      body: /* @__PURE__ */ l("span", { className: "text-[11px]", children: [
        "Source: ",
        t.sourceField
      ] }),
      footer: /* @__PURE__ */ n("span", { className: "text-[10px] text-[#6366f1]", children: "Terminal — streams to AG-UI frontend" }),
      selected: r,
      hasBreakpoint: t._hasBreakpoint,
      pausedAtBreakpoint: t._pausedAtBreakpoint,
      children: /* @__PURE__ */ n(se, { type: "target", position: ie.Left, id: "in" })
    }
  );
}
const Xo = {
  trigger: To,
  llm: Ro,
  transform: Po,
  condition: Eo,
  action: Uo,
  fork: _o,
  join: Fo,
  approval: qo,
  agent: Ho,
  "mcp-tool": zo,
  "knowledge-base": Ko,
  "graph-query": Wo,
  memory: Vo,
  guardrail: Jo,
  policy: Go,
  "ag-ui-output": Yo
};
function Qo(e) {
  switch (e) {
    case "active":
      return {
        stroke: "#2563eb",
        strokeWidth: 2,
        strokeDasharray: "6 4",
        animate: !0
      };
    case "traversed-success":
      return { stroke: "#16a34a", strokeWidth: 2 };
    case "traversed-failure":
      return { stroke: "#dc2626", strokeWidth: 2 };
    default:
      return { stroke: "#cbd5e1", strokeWidth: 1.5 };
  }
}
function Zo({
  id: e,
  sourceX: t,
  sourceY: r,
  targetX: s,
  targetY: i,
  sourcePosition: o,
  targetPosition: d,
  data: c,
  markerEnd: a,
  selected: p
}) {
  const f = c ?? {}, h = Qt(), [m] = Pr({
    sourceX: t,
    sourceY: r,
    targetX: s,
    targetY: i,
    sourcePosition: o,
    targetPosition: d
  }), x = Qo(f.state), g = x.animate && !h, u = p ? "#646cff" : x.stroke, v = p ? 2.5 : x.strokeWidth;
  return /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n(
      "path",
      {
        d: m,
        fill: "none",
        stroke: "transparent",
        strokeWidth: 12,
        className: "[pointer-events:stroke]"
      }
    ),
    /* @__PURE__ */ n(
      "path",
      {
        id: e,
        d: m,
        fill: "none",
        stroke: u,
        strokeWidth: v,
        strokeDasharray: g ? x.strokeDasharray : void 0,
        markerEnd: a,
        className: "pointer-events-none",
        children: g ? /* @__PURE__ */ n(
          "animate",
          {
            attributeName: "stroke-dashoffset",
            from: "0",
            to: "-20",
            dur: "1s",
            repeatCount: "indefinite"
          }
        ) : null
      }
    ),
    f.label ? /* @__PURE__ */ n(Mr, { children: /* @__PURE__ */ n(
      "div",
      {
        className: $(
          "absolute pointer-events-auto px-2 py-0.5 rounded-full text-[10px] font-semibold leading-[1.4]",
          "bg-white text-[#475569] border border-[#e2e8f0] font-[inherit] whitespace-nowrap",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
        ),
        style: {
          // Pull the pill slightly downstream of the source handle so it
          // sits inside the edge route rather than on top of the node.
          transform: `translate(-50%, -50%) translate(${t + 28}px, ${r}px)`
        },
        children: f.label
      }
    ) }) : null
  ] });
}
function st(e, t, r) {
  const s = oe(t);
  s.current = t, G(() => {
    if (r === !1) return;
    const i = (o) => {
      e.current && !e.current.contains(o.target) && s.current();
    };
    return document.addEventListener("mousedown", i), () => document.removeEventListener("mousedown", i);
  }, [e, r]);
}
const es = [
  { type: "trigger", icon: "⚡", name: "Trigger", description: "Starts the pipeline" },
  { type: "llm", icon: "🧠", name: "LLM", description: "Call an LLM model" },
  { type: "agent", icon: "🤖", name: "Agent", description: "Invoke a Strands agent via A2A" },
  { type: "mcp-tool", icon: "🔌", name: "MCP Tool", description: "Invoke an MCP Gateway tool" },
  { type: "knowledge-base", icon: "📚", name: "Knowledge Base", description: "RAG retrieval from Bedrock KB" },
  { type: "graph-query", icon: "🕸️", name: "Graph Query", description: "Neptune openCypher query" },
  { type: "memory", icon: "💾", name: "Memory", description: "AgentCore Memory read/write" },
  { type: "guardrail", icon: "🛡️", name: "Guardrail", description: "Bedrock Guardrails content filter" },
  { type: "policy", icon: "📜", name: "Policy", description: "Cedar authorization policy" },
  { type: "transform", icon: "🔧", name: "Transform", description: "Reshape the context" },
  { type: "condition", icon: "🔀", name: "Condition", description: "Branch on an expression" },
  { type: "fork", icon: "🍴", name: "Fork", description: "Split into parallel branches" },
  { type: "join", icon: "🔗", name: "Join", description: "Combine parallel branches" },
  { type: "action", icon: "🎯", name: "Action", description: "Produce a side effect" },
  { type: "ag-ui-output", icon: "📡", name: "AG-UI Output", description: "Stream to AG-UI frontend" },
  { type: "approval", icon: "✅", name: "Approval", description: "Wait for a human decision" }
];
function ts(e, t) {
  if (!t) return !0;
  const r = t.toLowerCase();
  return e.type.toLowerCase().includes(r) || e.name.toLowerCase().includes(r) || e.description.toLowerCase().includes(r);
}
function ns({
  anchor: e,
  flowPosition: t,
  disabledTypes: r = [],
  onClose: s,
  onInsert: i
}) {
  const [o, d] = R(""), [c, a] = R(0), p = oe(null), f = oe(null), h = F(() => new Set(r), [r]), m = F(
    () => es.filter((u) => !h.has(u.type) && ts(u, o)),
    [h, o]
  );
  if (G(() => {
    a((u) => u >= m.length ? 0 : u);
  }, [m.length]), G(() => {
    if (e) {
      const u = setTimeout(() => f.current?.focus(), 0);
      return () => clearTimeout(u);
    }
  }, [e]), st(p, s, !!e), !e) return null;
  const x = (u) => {
    const v = m[u];
    !v || !t || (i(v.type, t), s());
  }, g = (u) => {
    if (u.key === "ArrowDown") {
      if (u.preventDefault(), m.length === 0) return;
      a((v) => (v + 1) % m.length);
    } else if (u.key === "ArrowUp") {
      if (u.preventDefault(), m.length === 0) return;
      a((v) => (v - 1 + m.length) % m.length);
    } else u.key === "Enter" ? (u.preventDefault(), x(c)) : u.key === "Escape" && (u.preventDefault(), s());
  };
  return /* @__PURE__ */ l(
    "div",
    {
      ref: p,
      className: "fixed w-[260px] bg-white border border-[#e2e8f0] rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] z-50 flex flex-col overflow-hidden font-inherit",
      style: { top: e.y, left: e.x },
      role: "dialog",
      "aria-label": "Quick insert node",
      "data-testid": "quick-insert-popover",
      children: [
        /* @__PURE__ */ n("div", { className: "p-2 border-b border-[#e2e8f0]", children: /* @__PURE__ */ n(
          "input",
          {
            ref: f,
            type: "text",
            value: o,
            onChange: (u) => d(u.target.value),
            onKeyDown: g,
            placeholder: "Search nodes…",
            className: "w-full box-border border border-[#d1d5db] rounded-md px-2.5 py-1.5 text-[13px] font-inherit bg-[#f9fafb] text-[#0f172a] outline-none",
            "aria-label": "Search node types",
            "data-testid": "quick-insert-search"
          }
        ) }),
        /* @__PURE__ */ n("div", { className: "max-h-[260px] overflow-y-auto py-1", role: "listbox", children: m.length === 0 ? /* @__PURE__ */ l("div", { className: "px-3 py-3.5 text-xs text-[#94a3b8] font-inherit", children: [
          'No nodes match "',
          o,
          '"'
        ] }) : m.map((u, v) => {
          const w = v === c;
          return /* @__PURE__ */ l(
            "div",
            {
              role: "option",
              "aria-selected": w,
              onMouseEnter: () => a(v),
              onMouseDown: (N) => {
                N.preventDefault(), x(v);
              },
              className: $(
                "flex items-center gap-2.5 px-3 py-2 cursor-pointer font-inherit",
                w ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              "data-node-type": u.type,
              "data-testid": `quick-insert-row-${u.type}`,
              children: [
                /* @__PURE__ */ n("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: u.icon }),
                /* @__PURE__ */ l("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ n("div", { className: "text-[13px] font-semibold text-[#0f172a]", children: u.name }),
                  /* @__PURE__ */ n("div", { className: "text-[11px] text-[#475569] whitespace-nowrap overflow-hidden text-ellipsis", children: u.description })
                ] })
              ]
            },
            u.type
          );
        }) })
      ]
    }
  );
}
function rs({
  addNode: e,
  addEdge: t,
  updateNodeData: r,
  getDefinition: s
}) {
  G(() => {
  }, [e, t, r, s]);
}
function os({
  definition: e,
  selectedNodeId: t,
  setSelectedNodeId: r,
  removeNode: s,
  removeDefEdge: i,
  setNodes: o,
  setEdges: d,
  setPositions: c,
  duplicateNodes: a,
  clipboardRef: p,
  containerRef: f
}) {
  G(() => {
    const h = f.current;
    if (!h) return;
    const m = (g) => {
      const u = h.querySelector(
        `.react-flow__node[data-id="${CSS.escape(g)}"]`
      );
      return u ? ((u.querySelector('[data-pipeline-node="true"]') ?? u).focus(), !0) : !1;
    }, x = (g) => {
      if (on(g.target)) return;
      const u = document.activeElement, v = !!u && h.contains(u);
      if (g.key === "Tab") {
        if (!v || !e || e.nodes.length === 0) return;
        const w = gs(e);
        if (w.length === 0) return;
        const C = u?.closest(".react-flow__node")?.getAttribute("data-id") ?? null, y = C !== null ? w.indexOf(C) : -1, k = g.shiftKey ? -1 : 1, b = y === -1 ? g.shiftKey ? w.length - 1 : 0 : (y + k + w.length) % w.length, T = w[b];
        m(T) && g.preventDefault();
        return;
      }
      if (v && !g.altKey) {
        if (g.key === "Enter" || g.key === " " || g.key === "Spacebar") {
          const N = u?.closest(".react-flow__node")?.getAttribute("data-id");
          N && (g.preventDefault(), r(N));
          return;
        }
        if (g.key === "Delete" || g.key === "Backspace") {
          if (t) {
            g.preventDefault(), s(t);
            return;
          }
          d((w) => {
            const N = w.filter((C) => C.selected);
            if (N.length === 0) return w;
            for (const C of N) i(C.id);
            return w.filter((C) => !C.selected);
          }), g.preventDefault();
          return;
        }
        if (g.key === "Escape") {
          g.preventDefault(), r(null);
          return;
        }
        if ((g.metaKey || g.ctrlKey) && g.key === "c" && t) {
          g.preventDefault(), p.current = t;
          return;
        }
        if ((g.metaKey || g.ctrlKey) && g.key === "v" && p.current) {
          g.preventDefault();
          const w = a([p.current]);
          w.length > 0 && r(w[0]);
          return;
        }
        if ((g.metaKey || g.ctrlKey) && g.key === "d" && t) {
          g.preventDefault();
          const w = a([t]);
          w.length > 0 && r(w[0]);
          return;
        }
        if (g.key === "ArrowUp" || g.key === "ArrowDown" || g.key === "ArrowLeft" || g.key === "ArrowRight") {
          if (g.preventDefault(), g.stopPropagation(), !g.shiftKey || !t) return;
          const w = 8, N = g.key === "ArrowLeft" ? -w : g.key === "ArrowRight" ? w : 0, C = g.key === "ArrowUp" ? -w : g.key === "ArrowDown" ? w : 0;
          o((y) => {
            const k = y.map(
              (T) => T.id === t ? {
                ...T,
                position: {
                  x: T.position.x + N,
                  y: T.position.y + C
                }
              } : T
            ), b = k.find((T) => T.id === t);
            return b && c([{ id: b.id, position: b.position }]), k;
          });
        }
      }
    };
    return h.addEventListener("keydown", x), () => h.removeEventListener("keydown", x);
  }, [e, t, r, s, i, o, d, c, a, p, f]);
}
function ss({
  addNode: e,
  screenToFlowPosition: t
}) {
  const r = M((i) => {
    i.preventDefault(), i.dataTransfer.dropEffect = "move";
  }, []), s = M(
    (i) => {
      i.preventDefault();
      const o = i.dataTransfer.getData("application/reactflow");
      if (!o) return;
      let d = null;
      try {
        d = JSON.parse(o);
      } catch {
        return;
      }
      const c = d?.nodeType;
      if (!c) return;
      const a = t({
        x: i.clientX,
        y: i.clientY
      });
      e(c, a);
    },
    [e, t]
  );
  return { handleDragOver: r, handleDrop: s };
}
function is({
  nodeMenu: e,
  breakpoints: t,
  showBreakpointOption: r,
  onFilterLog: s,
  onCopyNodeId: i,
  onDuplicate: o,
  onToggleBreakpoint: d,
  onDismiss: c
}) {
  G(() => {
    const p = (h) => {
      h.target?.closest('[data-testid="canvas-node-context-menu"]') || c();
    }, f = (h) => {
      h.key === "Escape" && c();
    };
    return document.addEventListener("mousedown", p), window.addEventListener("keydown", f), () => {
      document.removeEventListener("mousedown", p), window.removeEventListener("keydown", f);
    };
  }, [c]);
  const a = "block w-full text-left px-3 py-2 border-none bg-transparent text-[13px] cursor-pointer rounded font-inherit";
  return /* @__PURE__ */ l(
    "div",
    {
      "data-testid": "canvas-node-context-menu",
      role: "menu",
      className: "fixed bg-white border border-[#e2e8f0] rounded-md shadow-[0_8px_20px_rgba(15,23,42,0.16)] min-w-[220px] z-50 p-1 font-inherit",
      style: { top: e.y, left: e.x },
      children: [
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: s,
            "data-testid": "ctx-filter-log",
            className: $(a, "text-[#0f172a]"),
            children: "🎯 Filter log to this node"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: i,
            "data-testid": "ctx-copy-id",
            className: $(a, "text-[#0f172a]"),
            children: "📋 Copy node id"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: o,
            "data-testid": "ctx-duplicate",
            className: $(a, "text-[#0f172a]"),
            children: "📑 Duplicate node"
          }
        ),
        r ? /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: d,
            "data-testid": "ctx-toggle-breakpoint",
            className: $(
              a,
              t?.has(e.nodeId) ? "text-[#dc2626]" : "text-[#0f172a]"
            ),
            children: t?.has(e.nodeId) ? "🔴 Remove Breakpoint" : "🔴 Toggle Breakpoint"
          }
        ) : null
      ]
    }
  );
}
const cr = [
  {
    name: "Sources",
    items: [
      { type: "trigger", icon: "⚡", name: "Trigger", description: "Starts the pipeline" }
    ]
  },
  {
    name: "Language",
    items: [
      { type: "llm", icon: "🧠", name: "LLM", description: "Call an LLM model" }
    ]
  },
  {
    name: "Agents",
    items: [
      { type: "agent", icon: "🤖", name: "Agent", description: "Invoke a Strands agent via A2A" },
      { type: "mcp-tool", icon: "🔌", name: "MCP Tool", description: "Invoke an MCP Gateway tool" }
    ]
  },
  {
    name: "Knowledge",
    items: [
      { type: "knowledge-base", icon: "📚", name: "Knowledge Base", description: "RAG retrieval from Bedrock KB" },
      { type: "graph-query", icon: "🕸️", name: "Graph Query", description: "Neptune openCypher query" },
      { type: "memory", icon: "💾", name: "Memory", description: "AgentCore Memory read/write" }
    ]
  },
  {
    name: "Safety",
    items: [
      { type: "guardrail", icon: "🛡️", name: "Guardrail", description: "Bedrock Guardrails content filter" },
      { type: "policy", icon: "📜", name: "Policy", description: "Cedar authorization policy" }
    ]
  },
  {
    name: "Data",
    items: [
      { type: "transform", icon: "🔧", name: "Transform", description: "Reshape the context" },
      { type: "condition", icon: "🔀", name: "Condition", description: "Branch on an expression" }
    ]
  },
  {
    name: "Flow",
    items: [
      { type: "fork", icon: "🍴", name: "Fork", description: "Split into parallel branches" },
      { type: "join", icon: "🔗", name: "Join", description: "Combine parallel branches" }
    ]
  },
  {
    name: "Outputs",
    items: [
      { type: "action", icon: "🎯", name: "Action", description: "Produce a side effect" },
      { type: "ag-ui-output", icon: "📡", name: "AG-UI Output", description: "Stream to AG-UI frontend" }
    ]
  },
  {
    name: "Human",
    items: [
      { type: "approval", icon: "✅", name: "Approval", description: "Wait for a human decision" }
    ]
  }
], dr = cr.flatMap((e) => e.items.map((t) => ({ type: t.type, name: t.name })));
function as(e, t) {
  if (!t) return !0;
  const r = t.toLowerCase();
  return e.name.toLowerCase().includes(r) || e.type.toLowerCase().includes(r) || e.description.toLowerCase().includes(r);
}
function ls({ disabledTypes: e = [] }) {
  const [t, r] = R(""), [s, i] = R(null), o = F(() => new Set(e), [e]), d = F(
    () => cr.map((a) => ({
      ...a,
      items: a.items.filter((p) => as(p, t))
    })).filter((a) => a.items.length > 0),
    [t]
  ), c = (a) => (p) => {
    if (o.has(a.type)) {
      p.preventDefault();
      return;
    }
    p.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: a.type })
    ), p.dataTransfer.effectAllowed = "move";
  };
  return /* @__PURE__ */ l("div", { className: "w-[220px] shrink-0 h-full border-r border-[#e2e8f0] bg-white flex flex-col", "data-testid": "node-palette", children: [
    /* @__PURE__ */ n("div", { className: "py-[10px] px-3 border-b border-[#e2e8f0] shrink-0", children: /* @__PURE__ */ n(
      "input",
      {
        type: "text",
        value: t,
        onChange: (a) => r(a.target.value),
        placeholder: "Search nodes…",
        className: "w-full box-border border border-[#d1d5db] rounded-[6px] py-1.5 px-[10px] text-[13px] font-[inherit] bg-[#f9fafb] text-[#0f172a] outline-none"
      }
    ) }),
    /* @__PURE__ */ n("div", { className: "flex-1 overflow-y-auto py-2", children: d.length === 0 ? /* @__PURE__ */ l("div", { className: "px-3.5 py-4 text-xs text-[#94a3b8]", children: [
      'No nodes match "',
      t,
      '"'
    ] }) : d.map((a) => /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ n("div", { className: "pt-2 px-[14px] pb-1 text-[10px] font-bold tracking-[0.6px] uppercase text-[#94a3b8] font-[inherit]", children: a.name }),
      a.items.map((p) => {
        const f = o.has(p.type), h = s === p.type && !f, m = dr.findIndex((g) => g.type === p.type), x = m >= 0 && m < 9 ? m + 1 : null;
        return /* @__PURE__ */ l(
          "div",
          {
            draggable: !f,
            onDragStart: c(p),
            onMouseEnter: () => i(p.type),
            onMouseLeave: () => i(null),
            className: $(
              "h-11 box-border my-0.5 mx-2 py-1.5 px-[10px] flex items-center gap-[10px] rounded-[6px] border border-transparent font-[inherit]",
              f ? "cursor-not-allowed opacity-[0.45]" : "cursor-grab",
              h ? "bg-[#f1f5f9]" : "bg-transparent"
            ),
            title: f ? `${p.name} is already placed` : x ? `${p.description} — press ${x}` : p.description,
            "data-node-type": p.type,
            "data-disabled": f || void 0,
            children: [
              /* @__PURE__ */ n(
                "span",
                {
                  className: "text-[18px] leading-none w-[22px] text-center shrink-0",
                  "aria-hidden": !0,
                  children: p.icon
                }
              ),
              /* @__PURE__ */ l("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ l("div", { className: $("text-[13px] font-semibold text-text-primary flex items-center gap-1.5", f && "line-through"), children: [
                  /* @__PURE__ */ n("span", { children: p.name }),
                  x !== null && /* @__PURE__ */ n(
                    "kbd",
                    {
                      "data-testid": `palette-shortcut-${p.type}`,
                      className: $("text-[10px] font-semibold font-mono text-[#64748b] bg-[#f1f5f9] border border-[#e2e8f0] rounded px-[5px] leading-[14px] min-w-[14px] text-center", f ? "opacity-50" : "opacity-100"),
                      children: x
                    }
                  )
                ] }),
                /* @__PURE__ */ n("div", { className: "text-[11px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis", children: f ? "Placed" : p.description })
              ] })
            ]
          },
          p.type
        );
      })
    ] }, a.name)) }),
    /* @__PURE__ */ n("div", { className: "py-2 px-3 border-t border-[#e2e8f0] text-[10px] text-[#94a3b8] font-[inherit] shrink-0", children: "Press 1–8 to insert at center" })
  ] });
}
function cs({
  definition: e,
  addNode: t,
  screenToFlowPosition: r,
  containerRef: s
}) {
  return G(() => {
    const i = (o) => {
      if (!on(o.target) && !(o.metaKey || o.ctrlKey || o.altKey) && /^[1-8]$/.test(o.key)) {
        const d = Number(o.key) - 1, c = dr[d];
        if (!c || c.type === "trigger" && e?.nodes.some((x) => x.type === "trigger"))
          return;
        const p = s.current?.getBoundingClientRect(), f = p ? r({
          x: p.left + p.width / 2,
          y: p.top + p.height / 2
        }) : { x: 0, y: 0 };
        let { x: h, y: m } = f;
        if (e)
          for (const x of e.nodes)
            Math.abs(x.position.x - h) < 16 && Math.abs(x.position.y - m) < 16 && (h += 24, m += 24);
        t(c.type, { x: h, y: m }), o.preventDefault();
      }
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [t, e, r, s]), null;
}
const ds = 280, ps = 120, us = 40, ms = 40;
function fs(e, t) {
  const r = ds, s = ps, i = us, o = ms;
  if (e.nodes.length === 0) return [];
  const d = /* @__PURE__ */ new Map();
  for (const v of e.nodes)
    d.set(v.id, []);
  for (const v of e.edges) {
    const w = d.get(v.source);
    w && d.has(v.target) && w.push(v.target);
  }
  const a = e.nodes.filter((v) => v.type === "trigger").map((v) => v.id).sort()[0], p = /* @__PURE__ */ new Map();
  if (a !== void 0) {
    const v = [a];
    for (p.set(a, 0); v.length > 0; ) {
      const w = v.shift(), N = p.get(w), C = d.get(w) ?? [];
      for (const y of C)
        p.has(y) || (p.set(y, N + 1), v.push(y));
    }
  }
  const f = /* @__PURE__ */ new Map();
  let h = -1;
  for (const v of e.nodes) {
    const w = p.get(v.id);
    w !== void 0 && (f.has(w) || f.set(w, []), f.get(w).push(v.id), w > h && (h = w));
  }
  for (const v of f.values())
    v.sort();
  const m = e.nodes.filter((v) => !p.has(v.id)).map((v) => v.id).sort(), x = h >= 0 ? h + 1 : 0;
  m.length > 0 && f.set(x, m);
  const g = [], u = [...f.keys()].sort((v, w) => v - w);
  for (const v of u) {
    const w = f.get(v), N = w.length, C = i + v * r;
    for (let y = 0; y < N; y++) {
      const k = o + (y - N / 2) * s;
      g.push({ id: w[y], position: { x: C, y: k } });
    }
  }
  return g;
}
function hs({
  definition: e,
  setPositions: t,
  fitView: r
}) {
  const s = M(() => {
    r({ padding: 0.15, duration: 500 });
  }, [r]), i = M(() => {
    if (!e) return;
    const o = fs(e);
    o.length !== 0 && (t(o), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => r({ padding: 0.15, duration: 500 })) : r({ padding: 0.15, duration: 500 }));
  }, [e, t, r]);
  return { handleFitView: s, handleAutoArrange: i };
}
function xs({
  definition: e,
  setPositions: t,
  fitView: r
}) {
  const { handleFitView: s, handleAutoArrange: i } = hs({
    definition: e,
    setPositions: t,
    fitView: r
  });
  return G(() => {
    const o = (d) => {
      const c = d.target;
      if (!(c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable)) && d.shiftKey && (d.key === "A" || d.key === "a")) {
        if (d.metaKey || d.ctrlKey || d.altKey) return;
        d.preventDefault(), i();
      }
    };
    return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
  }, [i]), /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        onClick: i,
        className: "absolute top-3 right-[50px] z-[5] w-8 h-8 inline-flex items-center justify-center bg-white border border-[#e2e8f0] rounded-md shadow-sm text-[#475569] cursor-pointer p-0 font-inherit text-sm leading-none",
        title: "Auto-arrange (Shift+A)",
        "aria-label": "Auto-arrange",
        "data-testid": "auto-arrange-btn",
        children: /* @__PURE__ */ n("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ n(
          "path",
          {
            d: "M2 4h8M2 8h12M2 12h6",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        ) })
      }
    ),
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        onClick: s,
        className: "absolute top-3 right-3 z-[5] w-8 h-8 inline-flex items-center justify-center bg-white border border-[#e2e8f0] rounded-md shadow-sm text-[#475569] cursor-pointer p-0 font-inherit text-sm leading-none",
        title: "Fit view",
        "aria-label": "Fit view",
        children: /* @__PURE__ */ n("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ n(
          "path",
          {
            d: "M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) })
      }
    )
  ] });
}
function on(e) {
  if (!e || !(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable);
}
function gs(e) {
  if (e.nodes.length === 0) return [];
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const o of e.nodes)
    t.set(o.id, []), r.set(o.id, 0);
  for (const o of e.edges)
    !t.has(o.source) || !r.has(o.target) || (t.get(o.source).push(o.target), r.set(o.target, (r.get(o.target) ?? 0) + 1));
  const s = [], i = e.nodes.filter((o) => (r.get(o.id) ?? 0) === 0).map((o) => o.id).sort();
  for (; i.length > 0; ) {
    const o = i.shift();
    s.push(o);
    const d = (t.get(o) ?? []).slice().sort();
    for (const c of d) {
      const a = (r.get(c) ?? 0) - 1;
      r.set(c, a), a === 0 && i.push(c);
    }
  }
  if (s.length < e.nodes.length) {
    const o = new Set(s), d = e.nodes.filter((c) => !o.has(c.id)).map((c) => c.id).sort();
    s.push(...d);
  }
  return s;
}
const bs = { animated: Zo }, ys = Xo;
function vs(e) {
  return {
    id: e.id,
    type: e.type,
    position: e.position,
    data: { ...e.data, nodeType: e.type }
  };
}
function ws(e) {
  const t = e.sourceHandle === "true" || e.sourceHandle === "false" || e.sourceHandle === "approved" || e.sourceHandle === "rejected" || e.sourceHandle === "error" || /^branch-\d+$/.test(e.sourceHandle) ? e.sourceHandle : void 0;
  return {
    id: e.id,
    source: e.source,
    sourceHandle: e.sourceHandle,
    target: e.target,
    targetHandle: e.targetHandle,
    type: "animated",
    data: { state: "default", label: t }
  };
}
function Ns({ onFilterLog: e, errorNodeId: t, onErrorNodePosition: r, replayEdgeStates: s, replayNodeClasses: i, breakpoints: o, onToggleBreakpoint: d, pausedAtNodeId: c }) {
  const {
    definition: a,
    addNode: p,
    setPositions: f,
    addEdge: h,
    removeEdge: m,
    removeNode: x,
    duplicateNodes: g,
    selectedNodeId: u,
    setSelectedNodeId: v,
    updateNodeData: w
  } = dt(), { screenToFlowPosition: N, fitView: C } = Or();
  rs({
    addNode: p,
    addEdge: h,
    updateNodeData: w,
    getDefinition: () => a
  });
  const [y, k, b] = Ur([]), [T, I, S] = _r([]), [D, _] = R(!0), [W, Q] = R(!0), ee = oe(null), de = oe(null), [O, U] = R(null), [P, B] = R(null), K = M(
    (q, Y) => {
      q.preventDefault(), B({ nodeId: Y.id, x: q.clientX, y: q.clientY });
    },
    []
  ), j = M(() => {
    P && (e?.(P.nodeId), B(null));
  }, [P, e]), X = M(() => {
    if (!P) return;
    const q = P.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(q).catch(() => {
    }), B(null);
  }, [P]), Z = M(() => {
    P && (d?.(P.nodeId), B(null));
  }, [P, d]), le = M(() => {
    if (!P) return;
    const q = g([P.nodeId]);
    q.length > 0 && v(q[0]), B(null);
  }, [P, g, v]), be = M(() => B(null), []);
  G(() => {
    if (!a) {
      k([]), I([]);
      return;
    }
    k((q) => {
      const Y = new Map(q.map((ae) => [ae.id, ae]));
      return a.nodes.map((ae) => {
        const ue = Y.get(ae.id), Ie = vs(ae);
        return o && o.size > 0 && (Ie.data._hasBreakpoint = o.has(ae.id)), c && (Ie.data._pausedAtBreakpoint = ae.id === c), ue ? { ...ue, ...Ie, selected: ue.selected } : Ie;
      });
    }), I(() => a.edges.map(ws));
  }, [a, o, c, k, I]), G(() => {
    if (!t) {
      r?.(null);
      return;
    }
    k(
      (q) => q.map((Y) => ({
        ...Y,
        className: Y.id === t ? "node-error" : Y.className?.replace("node-error", "").trim() || void 0
      }))
    ), requestAnimationFrame(() => {
      const q = ee.current;
      if (!q) return;
      const Y = q.querySelector(
        `.react-flow__node[data-id="${CSS.escape(t)}"]`
      );
      if (!Y) {
        r?.(null);
        return;
      }
      const ae = Y.getBoundingClientRect();
      r?.({ x: ae.right, y: ae.top + ae.height / 2 });
    });
  }, [t, k, r]), G(() => {
    i && k(
      (q) => q.map((Y) => {
        const ae = i[Y.id] ?? "", Ie = [Y.id === t ? "node-error" : "", ae].filter(Boolean).join(" ") || void 0;
        let we;
        ae === "node-replay-active" ? we = "running" : ae === "node-replay-completed" ? we = "completed" : ae === "node-replay-failed" && (we = "failed");
        const qe = { ...Y.data };
        return we ? qe._state = we : qe._state = "idle", { ...Y, className: Ie, data: qe };
      })
    );
  }, [i, t, k]), G(() => {
    s && I(
      (q) => q.map((Y) => {
        const ae = s[Y.id];
        if (!ae) return Y;
        const ue = Y.data ?? {};
        return ue.state === ae ? Y : { ...Y, data: { ...ue, state: ae } };
      })
    );
  }, [s, I]);
  const L = M(
    (q) => {
      b(q);
      const Y = [], ae = [];
      for (const ue of q)
        ue.type === "position" && ue.position && ue.dragging === !1 ? Y.push({ id: ue.id, position: ue.position }) : ue.type === "remove" && ae.push(ue.id);
      Y.length && f(Y);
      for (const ue of ae) x(ue);
    },
    [b, f, x]
  ), re = M(
    (q) => {
      S(q);
      for (const Y of q)
        Y.type === "remove" && m(Y.id);
    },
    [S, m]
  ), ge = M(
    (q) => {
      if (!a || !q.source || !q.target) return;
      const Y = a.nodes.find((we) => we.id === q.source), ae = a.nodes.find((we) => we.id === q.target);
      if (!Y || !ae) return;
      const ue = q.sourceHandle ?? "out", Ie = q.targetHandle ?? "in";
      Jt(
        Y.type,
        ue,
        ae.type,
        Ie
      ) && h({
        source: q.source,
        sourceHandle: ue,
        target: q.target,
        targetHandle: Ie
      });
    },
    [a, h]
  ), $e = M(
    (q) => {
      if (!a || !q.source || !q.target) return !1;
      const Y = a.nodes.find((ue) => ue.id === q.source), ae = a.nodes.find((ue) => ue.id === q.target);
      return !Y || !ae ? !1 : Jt(
        Y.type,
        q.sourceHandle ?? "out",
        ae.type,
        q.targetHandle ?? "in"
      );
    },
    [a]
  ), Ke = M(
    (q, Y) => {
      v(Y.id);
    },
    [v]
  ), Oe = M(() => {
    v(null);
  }, [v]), Ae = M(
    (q) => {
      const Y = q.target;
      if (!Y || !(Y.classList.contains("react-flow__pane") || Y.classList.contains("react-flow__renderer") || Y.classList.contains("react-flow__viewport") || Y.classList.contains("react-flow"))) return;
      q.preventDefault();
      const ue = N({ x: q.clientX, y: q.clientY });
      U({
        anchor: { x: q.clientX, y: q.clientY },
        flowPosition: ue
      });
    },
    [N]
  ), Le = M(() => U(null), []), Ue = M(
    (q, Y) => {
      p(q, Y);
    },
    [p]
  ), Be = F(() => a ? a.nodes.some((q) => q.type === "trigger") ? ["trigger"] : [] : [], [a]), { handleDragOver: ye, handleDrop: pe } = ss({
    addNode: p,
    screenToFlowPosition: N
  });
  G(() => {
    const q = (Y) => {
      if (!on(Y.target) && !(Y.metaKey || Y.ctrlKey || Y.altKey)) {
        if (Y.key === "m" || Y.key === "M") {
          _((ae) => !ae);
          return;
        }
        if (Y.key === "c" || Y.key === "C") {
          Q((ae) => !ae);
          return;
        }
      }
    };
    return window.addEventListener("keydown", q), () => window.removeEventListener("keydown", q);
  }, []), os({
    definition: a,
    selectedNodeId: u,
    setSelectedNodeId: v,
    removeNode: x,
    removeDefEdge: m,
    setNodes: k,
    setEdges: I,
    setPositions: f,
    duplicateNodes: g,
    clipboardRef: de,
    containerRef: ee
  });
  const J = M((q) => {
    switch (q.data?._state) {
      case "running":
      case "pending":
        return "#2563eb";
      case "completed":
        return "#16a34a";
      case "failed":
        return "#dc2626";
      case "awaiting":
        return "#f59e0b";
      default:
        return "#94a3b8";
    }
  }, []);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: ee,
      className: "flex-1 min-w-0 min-h-[520px] relative bg-[#fafbfc]",
      role: "application",
      "aria-label": "Pipeline editor canvas",
      tabIndex: 0,
      "data-testid": "pipeline-canvas",
      onDragOver: ye,
      onDrop: pe,
      onDoubleClick: Ae,
      children: [
        /* @__PURE__ */ l(
          Lr,
          {
            nodes: y,
            edges: T,
            nodeTypes: ys,
            edgeTypes: bs,
            onNodesChange: L,
            onEdgesChange: re,
            onConnect: ge,
            isValidConnection: $e,
            onNodeClick: Ke,
            onNodeContextMenu: K,
            onPaneClick: Oe,
            fitView: !0,
            snapToGrid: !0,
            snapGrid: [16, 16],
            edgesFocusable: !0,
            defaultEdgeOptions: { type: "smoothstep" },
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ n(
                Br,
                {
                  variant: Fr.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              W ? /* @__PURE__ */ n(
                jr,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              D ? /* @__PURE__ */ n(
                qr,
                {
                  position: "bottom-right",
                  pannable: !0,
                  zoomable: !0,
                  className: "!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]",
                  maskColor: "rgba(15, 23, 42, 0.04)",
                  nodeColor: J,
                  nodeStrokeColor: "#e2e8f0"
                }
              ) : null
            ]
          }
        ),
        O ? /* @__PURE__ */ n(
          ns,
          {
            anchor: O.anchor,
            flowPosition: O.flowPosition,
            disabledTypes: Be,
            onClose: Le,
            onInsert: Ue
          }
        ) : null,
        /* @__PURE__ */ n(
          cs,
          {
            definition: a,
            addNode: p,
            screenToFlowPosition: N,
            containerRef: ee
          }
        ),
        /* @__PURE__ */ n(
          xs,
          {
            definition: a,
            setPositions: f,
            fitView: C
          }
        ),
        P ? /* @__PURE__ */ n(
          is,
          {
            nodeMenu: P,
            breakpoints: o,
            showBreakpointOption: !!d,
            onFilterLog: j,
            onCopyNodeId: X,
            onDuplicate: le,
            onToggleBreakpoint: Z,
            onDismiss: be
          }
        ) : null
      ]
    }
  );
}
function ks({ onFilterLog: e, errorNodeId: t, onErrorNodePosition: r, replayEdgeStates: s, replayNodeClasses: i, breakpoints: o, onToggleBreakpoint: d, pausedAtNodeId: c } = {}) {
  return /* @__PURE__ */ n(Er, { children: /* @__PURE__ */ n(
    Ns,
    {
      onFilterLog: e,
      errorNodeId: t,
      onErrorNodePosition: r,
      replayEdgeStates: s,
      replayNodeClasses: i,
      breakpoints: o,
      onToggleBreakpoint: d,
      pausedAtNodeId: c
    }
  ) });
}
const bn = {
  LLMError: { bg: "#fef2f2", fg: "#dc2626" },
  TimeoutError: { bg: "#fff7ed", fg: "#ea580c" },
  NetworkError: { bg: "#fffbeb", fg: "#d97706" },
  ValidationError: { bg: "#fefce8", fg: "#ca8a04" },
  RegistryConflict: { bg: "#faf5ff", fg: "#9333ea" },
  UnknownError: { bg: "#f1f5f9", fg: "#475569" }
};
function Cs(e) {
  switch (e) {
    case "LLMError":
      return "LLM Error";
    case "TimeoutError":
      return "Timeout";
    case "NetworkError":
      return "Network Error";
    case "ValidationError":
      return "Validation Error";
    case "RegistryConflict":
      return "Registry Conflict";
    case "UnknownError":
      return "Unknown Error";
    default:
      return String(e);
  }
}
function Is({ error: e, anchor: t, onDismiss: r, onRetry: s }) {
  const [i, o] = R(!1), [d, c] = R(!1), a = e.errorCategory ?? "UnknownError", p = bn[a] ?? bn.UnknownError, f = M(async () => {
    const g = [
      `Error Category: ${a}`,
      `Node ID: ${e.nodeId}`,
      `Message: ${e.message}`,
      e.stack ? `
Stack Trace:
${e.stack}` : ""
    ].filter(Boolean).join(`
`);
    try {
      typeof navigator < "u" && navigator.clipboard?.writeText && (await navigator.clipboard.writeText(g), c(!0), setTimeout(() => c(!1), 2e3));
    } catch {
    }
  }, [e, a]), h = M(() => {
    s?.();
  }, [s]), m = Math.min(t.y + 8, window.innerHeight - 440), x = Math.min(t.x + 12, window.innerWidth - 360);
  return /* @__PURE__ */ l(
    "div",
    {
      className: "fixed z-[100] bg-white border border-[#e2e8f0] rounded-[10px] shadow-[0_12px_32px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.08)] p-0 w-[340px] max-h-[420px] overflow-y-auto font-inherit text-[#0f172a]",
      style: { top: Math.max(8, m), left: Math.max(8, x) },
      "data-testid": "error-overlay",
      role: "dialog",
      "aria-label": `Error details for node ${e.nodeId}`,
      children: [
        /* @__PURE__ */ l("div", { className: "flex items-center gap-2 px-3.5 pt-3 pb-2.5 border-b border-[#e2e8f0]", children: [
          /* @__PURE__ */ n(
            "span",
            {
              className: "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold leading-snug",
              style: { background: p.bg, color: p.fg },
              "data-testid": "error-category-badge",
              children: Cs(a)
            }
          ),
          /* @__PURE__ */ n("span", { className: "flex-1" }),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: r,
              "aria-label": "Dismiss error overlay",
              className: "bg-transparent border-none text-[#94a3b8] cursor-pointer text-base leading-none px-1 py-0.5",
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { className: "px-3.5 py-3 flex flex-col gap-2.5", children: [
          /* @__PURE__ */ n("div", { className: "text-[13px] leading-normal text-[#0f172a]", children: e.message }),
          /* @__PURE__ */ l("div", { className: "text-[11px] text-[#94a3b8]", children: [
            "Failed node:",
            " ",
            /* @__PURE__ */ n("code", { className: "bg-[#f1f5f9] px-[5px] py-px rounded-[3px] font-mono text-[11px] text-[#475569]", children: e.nodeId })
          ] }),
          e.stack && /* @__PURE__ */ l("div", { children: [
            /* @__PURE__ */ l(
              "button",
              {
                type: "button",
                onClick: () => o((g) => !g),
                className: "bg-transparent border-none p-0 cursor-pointer text-xs font-medium text-[#475569] font-inherit",
                "data-testid": "error-stack-toggle",
                children: [
                  i ? "▾" : "▸",
                  " Stack trace"
                ]
              }
            ),
            i && /* @__PURE__ */ n(
              "pre",
              {
                className: "mt-1.5 p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-md text-[10px] leading-normal font-mono text-[#475569] whitespace-pre-wrap break-all max-h-40 overflow-y-auto m-0",
                "data-testid": "error-stack-content",
                children: e.stack
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ l("div", { className: "flex gap-2 px-3.5 pt-2.5 pb-3 border-t border-[#e2e8f0]", children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: f,
              className: "px-3 py-1.5 text-xs font-semibold border-none rounded-md cursor-pointer font-inherit leading-snug bg-[#f1f5f9] text-[#475569]",
              "data-testid": "error-copy-btn",
              children: d ? "Copied!" : "Copy error details"
            }
          ),
          s && /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: h,
              className: "px-3 py-1.5 text-xs font-semibold border-none rounded-md cursor-pointer font-inherit leading-snug bg-primary text-white",
              "data-testid": "error-retry-btn",
              children: "Retry from here"
            }
          )
        ] })
      ]
    }
  );
}
function Ss(e, t) {
  const r = /* @__PURE__ */ new Map();
  for (const i of e)
    r.set(i.id, []);
  for (const i of t) {
    const o = r.get(i.source);
    o && o.push({ target: i.target, edgeId: i.id });
  }
  const s = /* @__PURE__ */ new Map();
  for (const i of e)
    s.set(i.id, 0);
  for (const i of e) {
    if (s.get(i.id) !== 0) continue;
    const o = [
      { nodeId: i.id, index: 0 }
    ];
    for (s.set(i.id, 1); o.length > 0; ) {
      const d = o[o.length - 1], c = r.get(d.nodeId) ?? [];
      if (d.index >= c.length) {
        s.set(d.nodeId, 2), o.pop();
        continue;
      }
      const a = c[d.index];
      d.index += 1;
      const p = s.get(a.target);
      if (p === 1)
        return a.edgeId;
      p === 0 && (s.set(a.target, 1), o.push({ nodeId: a.target, index: 0 }));
    }
  }
  return null;
}
function pr(e) {
  const t = [], r = [], { nodes: s, edges: i } = e, o = /* @__PURE__ */ new Map();
  for (const d of s)
    o.set(d.id, d);
  return Ts(s, t), As(s, i, t), Ds(i, o, t), Rs(s, t), Ls(s, i, t), Bs(s, i, r), Fs(s, i, r), js(s, i, r), qs(s, i, r), r.push(...Hs(e)), r.push(...zs(e)), r.push(...Ks(e)), r.push(...Ws(e)), r.push(...Vs(e)), r.push(...Js(e)), r.push(...Gs(e)), r.push(...Ys(e)), r.push(...Xs(e)), r.push(...Qs(e)), {
    errors: t,
    warnings: r,
    isValid: t.length === 0,
    canPublish: t.length === 0
  };
}
function Ts(e, t) {
  const r = e.filter((s) => s.type === "trigger");
  if (r.length === 0) {
    t.push({
      code: "NO_TRIGGER",
      severity: "error",
      message: "Pipeline must have exactly one Trigger node."
    });
    return;
  }
  if (r.length > 1)
    for (const s of r)
      t.push({
        code: "MULTIPLE_TRIGGERS",
        severity: "error",
        message: "Pipeline must have exactly one Trigger node.",
        nodeId: s.id
      });
}
function As(e, t, r) {
  const s = Ss(e, t);
  s !== null && r.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: s
  });
}
function Ds(e, t, r) {
  for (const s of e) {
    const i = t.get(s.source), o = t.get(s.target);
    if (!i || !o) {
      r.push({
        code: "INVALID_HANDLE",
        severity: "error",
        message: "Edge references a node that does not exist.",
        edgeId: s.id
      });
      continue;
    }
    Jt(
      i.type,
      s.sourceHandle,
      o.type,
      s.targetHandle
    ) || r.push({
      code: "INVALID_HANDLE",
      severity: "error",
      message: `Invalid connection: ${i.type}.${s.sourceHandle} → ${o.type}.${s.targetHandle}.`,
      edgeId: s.id
    });
  }
}
function Rs(e, t) {
  for (const r of e)
    switch (r.data.type) {
      case "llm":
        $s(r.id, r.data, t);
        break;
      case "transform":
        Ps(r.id, r.data, t);
        break;
      case "condition":
        Ms(r.id, r.data, t);
        break;
      case "action":
        Es(r.id, r.data, t);
        break;
      case "fork":
        Os(r.id, r.data, t);
        break;
      case "join":
        Us(r.id, r.data, t);
        break;
      case "approval":
        _s(r.id, r.data, t);
        break;
    }
}
function $s(e, t, r) {
  t.provider || je(r, e, "provider"), (!t.model || !t.model.trim()) && je(r, e, "model"), (!t.systemPrompt || !t.systemPrompt.trim()) && je(r, e, "systemPrompt"), (!t.userPromptTemplate || !t.userPromptTemplate.trim()) && je(r, e, "userPromptTemplate");
}
function Ps(e, t, r) {
  t.transformType || je(r, e, "transformType"), (!t.expression || !t.expression.trim()) && je(r, e, "expression");
}
function Ms(e, t, r) {
  (!t.expression || !t.expression.trim()) && je(r, e, "expression");
}
function Es(e, t, r) {
  t.actionType || je(r, e, "actionType");
}
function Os(e, t, r) {
  (typeof t.branchCount != "number" || t.branchCount < 2) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: e,
    field: "branchCount"
  });
}
function Us(e, t, r) {
  t.mode || je(r, e, "mode"), t.mergeStrategy || je(r, e, "mergeStrategy"), t.mode === "n_of_m" && (typeof t.n != "number" || t.n < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: e,
    field: "n"
  });
}
function _s(e, t, r) {
  (!t.approvers || t.approvers.length === 0) && r.push({
    code: "APPROVAL_NO_APPROVERS",
    severity: "error",
    message: "Approval node must have at least one approver.",
    nodeId: e,
    field: "approvers"
  }), (typeof t.requiredCount != "number" || t.requiredCount < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Approval requires requiredCount ≥ 1.",
    nodeId: e,
    field: "requiredCount"
  });
}
function Ls(e, t, r) {
  const s = /* @__PURE__ */ new Map();
  for (const i of t)
    s.set(i.target, (s.get(i.target) ?? 0) + 1);
  for (const i of e) {
    if (i.type !== "join") continue;
    (s.get(i.id) ?? 0) < 2 && r.push({
      code: "JOIN_INSUFFICIENT_INPUTS",
      severity: "error",
      message: "Join node requires at least 2 incoming edges.",
      nodeId: i.id
    });
  }
}
function je(e, t, r) {
  e.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: `Missing required field '${r}'.`,
    nodeId: t,
    field: r
  });
}
function Bs(e, t, r) {
  const s = e.filter((c) => c.type === "trigger");
  if (s.length !== 1) return;
  const i = /* @__PURE__ */ new Map();
  for (const c of e) i.set(c.id, []);
  for (const c of t)
    i.get(c.source)?.push(c.target);
  const o = /* @__PURE__ */ new Set(), d = [s[0].id];
  for (o.add(s[0].id); d.length > 0; ) {
    const c = d.shift();
    for (const a of i.get(c) ?? [])
      o.has(a) || (o.add(a), d.push(a));
  }
  for (const c of e)
    o.has(c.id) || r.push({
      code: "ORPHAN_NODE",
      severity: "warning",
      message: "Node is unreachable from the Trigger.",
      nodeId: c.id
    });
}
function Fs(e, t, r) {
  const s = /* @__PURE__ */ new Set();
  for (const i of t) s.add(i.source);
  for (const i of e)
    s.has(i.id) || i.data.terminal !== !0 && r.push({
      code: "DEAD_END",
      severity: "warning",
      message: "Node has no outgoing edges.",
      nodeId: i.id
    });
}
function js(e, t, r) {
  const s = /* @__PURE__ */ new Map();
  for (const i of t) {
    const o = s.get(i.source) ?? /* @__PURE__ */ new Set();
    o.add(i.sourceHandle), s.set(i.source, o);
  }
  for (const i of e) {
    if (i.data.type !== "fork") continue;
    const o = i.data.branchCount, d = s.get(i.id) ?? /* @__PURE__ */ new Set();
    for (let c = 0; c < o; c += 1) {
      const a = `branch-${c}`;
      d.has(a) || r.push({
        code: "UNUSED_FORK_BRANCH",
        severity: "warning",
        message: `Fork branch '${a}' has no connected edge.`,
        nodeId: i.id,
        field: a
      });
    }
  }
}
function qs(e, t, r) {
  const s = /* @__PURE__ */ new Map();
  for (const i of t) {
    const o = s.get(i.source) ?? /* @__PURE__ */ new Set();
    o.add(i.sourceHandle), s.set(i.source, o);
  }
  for (const i of e) {
    if (i.type !== "condition") continue;
    const o = s.get(i.id) ?? /* @__PURE__ */ new Set();
    for (const d of ["true", "false"])
      o.has(d) || r.push({
        code: "UNUSED_CONDITION_BRANCH",
        severity: "warning",
        message: `Condition branch '${d}' has no connected edge.`,
        nodeId: i.id,
        field: d
      });
  }
}
function Ye(e) {
  const t = e.data.label;
  if (typeof t == "string" && t.trim()) return t.trim();
  switch (e.data.type) {
    case "llm":
      return e.data.model || "llm";
    case "trigger":
      return e.data.triggerType || "trigger";
    case "action":
      return e.data.actionType || "action";
    case "transform":
      return e.data.transformType || "transform";
    case "join":
      return e.data.mode ? `join:${e.data.mode}` : "join";
    default:
      return e.type;
  }
}
function Hs(e) {
  const t = [], r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  for (const c of e.nodes)
    r.set(c.id, []), s.set(c.id, []);
  for (const c of e.edges)
    c.sourceHandle !== "error" && r.get(c.source)?.push(c.target), s.get(c.target)?.push(c.source);
  const i = /* @__PURE__ */ new Map();
  for (const c of e.nodes) i.set(c.id, c);
  function o(c) {
    const a = /* @__PURE__ */ new Set([c]), p = [];
    for (const f of r.get(c) ?? [])
      a.has(f) || (a.add(f), p.push(f));
    for (; p.length > 0; ) {
      const f = p.shift();
      if (i.get(f)?.type === "join") return !0;
      for (const m of r.get(f) ?? [])
        a.has(m) || (a.add(m), p.push(m));
    }
    return !1;
  }
  function d(c) {
    const a = /* @__PURE__ */ new Set([c]), p = [];
    for (const f of s.get(c) ?? [])
      a.has(f) || (a.add(f), p.push(f));
    for (; p.length > 0; ) {
      const f = p.shift();
      if (i.get(f)?.type === "fork") return !0;
      for (const m of s.get(f) ?? [])
        a.has(m) || (a.add(m), p.push(m));
    }
    return !1;
  }
  for (const c of e.nodes)
    c.data.type !== "llm" && c.data.type !== "action" || e.edges.some(
      (p) => p.source === c.id && p.sourceHandle === "error"
    ) || d(c.id) && o(c.id) || t.push({
      code: "NO_ERROR_HANDLER",
      severity: "warning",
      message: `${c.data.type} node '${Ye(c)}' has no error handler — failures will terminate the run.`,
      nodeId: c.id
    });
  return t;
}
function zs(e) {
  const t = [];
  for (const r of e.nodes)
    r.data.type === "llm" && (typeof r.data.maxTokens != "number" || r.data.maxTokens <= 0) && t.push({
      code: "LLM_NO_MAX_TOKENS",
      severity: "warning",
      message: `LLM node '${Ye(r)}' has no maxTokens — responses could run long / expensive.`,
      nodeId: r.id,
      field: "maxTokens"
    });
  return t;
}
function Ks(e) {
  const t = [];
  for (const r of e.nodes)
    r.data.type === "approval" && (typeof r.data.timeoutMs != "number" || r.data.timeoutMs <= 0) && t.push({
      code: "UNGUARDED_APPROVAL_TIMEOUT",
      severity: "warning",
      message: `Approval '${Ye(r)}' has no timeout — the run could block indefinitely.`,
      nodeId: r.id,
      field: "timeoutMs"
    });
  return t;
}
function Ws(e) {
  const t = [];
  for (const r of e.nodes)
    r.data.type === "fork" && typeof r.data.branchCount == "number" && r.data.branchCount > 5 && t.push({
      code: "LARGE_FORK",
      severity: "warning",
      message: `Fork with ${r.data.branchCount} branches; consider splitting into multiple joins for readability.`,
      nodeId: r.id,
      field: "branchCount"
    });
  return t;
}
function Vs(e) {
  const r = e.nodes.filter((p) => p.type === "trigger");
  if (r.length !== 1) return [];
  const s = /* @__PURE__ */ new Map();
  for (const p of e.nodes) s.set(p.id, []);
  for (const p of e.edges) s.get(p.source)?.push(p.target);
  const i = /* @__PURE__ */ new Map(), o = [r[0].id];
  i.set(r[0].id, 1);
  const d = e.nodes.length * e.nodes.length + 1;
  let c = 0;
  for (; o.length > 0; ) {
    if (c++ > d) return [];
    const p = o.shift(), f = i.get(p);
    for (const h of s.get(p) ?? []) {
      const m = i.get(h);
      (m === void 0 || f + 1 > m) && (i.set(h, f + 1), o.push(h));
    }
  }
  let a = 0;
  for (const p of i.values()) p > a && (a = p);
  return a > 12 ? [
    {
      code: "DEEP_CHAIN",
      severity: "warning",
      message: `Pipeline is very deep (${a} levels); consider modularizing.`
    }
  ] : [];
}
function Js(e) {
  const t = [], r = /* @__PURE__ */ new Map();
  for (const s of e.nodes) {
    const i = Ye(s), o = r.get(i) ?? [];
    o.push(s), r.set(i, o);
  }
  for (const [s, i] of r)
    if (!(i.length < 2))
      for (const o of i)
        t.push({
          code: "DUPLICATE_NODE_NAME",
          severity: "warning",
          message: `Multiple nodes named '${s}'; consider disambiguating.`,
          nodeId: o.id
        });
  return t;
}
function Gs(e) {
  const t = [], r = /\{\{[^}]+\}\}/;
  for (const s of e.nodes) {
    if (s.data.type !== "llm") continue;
    const { temperature: i, userPromptTemplate: o } = s.data;
    typeof i != "number" || i <= 0.8 || !o || !r.test(o) || t.push({
      code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
      severity: "warning",
      message: `LLM '${Ye(s)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
      nodeId: s.id
    });
  }
  return t;
}
function Ys(e) {
  return e.triggerBinding?.event !== "schedule" ? [] : e.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function Xs(e) {
  const t = [], r = /* @__PURE__ */ new Map();
  for (const s of e.edges) {
    const i = r.get(s.source) ?? /* @__PURE__ */ new Set();
    i.add(s.sourceHandle), r.set(s.source, i);
  }
  for (const s of e.nodes) {
    if (s.type !== "condition") continue;
    const i = r.get(s.id) ?? /* @__PURE__ */ new Set(), o = i.has("true"), d = i.has("false");
    o && !d && t.push({
      code: "UNREACHABLE_AFTER_CONDITION_FALSE",
      severity: "warning",
      message: `Condition '${Ye(s)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: s.id,
      field: "false"
    });
  }
  return t;
}
function Qs(e) {
  const t = [], r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  for (const c of e.nodes)
    r.set(c.id, []), s.set(c.id, []);
  for (const c of e.edges)
    r.get(c.source)?.push({ target: c.target, sourceHandle: c.sourceHandle }), s.get(c.target)?.push(c.source);
  const i = /* @__PURE__ */ new Map();
  for (const c of e.nodes) i.set(c.id, c);
  function o(c) {
    const a = /* @__PURE__ */ new Set([c]), p = [c];
    for (; p.length > 0; ) {
      const f = p.shift(), h = i.get(f);
      if (h && h.type === "join" && f !== c) return f;
      for (const { target: m } of r.get(f) ?? [])
        a.has(m) || (a.add(m), p.push(m));
    }
    return null;
  }
  function d(c) {
    const a = /* @__PURE__ */ new Set([c]), p = [c];
    for (; p.length > 0; ) {
      const f = p.shift(), h = i.get(f);
      if (h && h.type === "fork" && f !== c) return f;
      for (const m of s.get(f) ?? [])
        a.has(m) || (a.add(m), p.push(m));
    }
    return null;
  }
  for (const c of e.nodes) {
    if (c.data.type !== "fork") continue;
    const a = r.get(c.id) ?? [];
    if (a.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const { target: m } of a)
      p.add(o(m));
    const f = p.has(null), h = [...p].filter((m) => m !== null);
    (f || h.length !== 1) && t.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Fork '${Ye(c)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
      nodeId: c.id
    });
  }
  for (const c of e.nodes) {
    if (c.data.type !== "join") continue;
    const a = s.get(c.id) ?? [];
    if (a.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const m of a)
      p.add(d(m));
    const f = p.has(null), h = [...p].filter((m) => m !== null);
    (f || h.length !== 1) && t.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Join '${Ye(c)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: c.id
    });
  }
  return t;
}
function Zs(e, t) {
  return `${e}${t}`;
}
const ei = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, ti = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function ur(e) {
  return e.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const ni = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function ri(e) {
  const t = ti[e.type] ?? "■", r = ni[e.type] ?? e.type.charAt(0).toUpperCase() + e.type.slice(1);
  let s = null;
  switch (e.data.type) {
    case "llm":
      s = e.data.model || null;
      break;
    case "condition": {
      const o = e.data;
      s = o.label || o.expression || null;
      break;
    }
    case "approval": {
      const d = e.data.approvers?.length ?? 0;
      s = `${d} approver${d === 1 ? "" : "s"}`;
      break;
    }
    case "fork": {
      const o = e.data;
      s = `${o.branchCount} branch${o.branchCount === 1 ? "" : "es"}`;
      break;
    }
    case "action":
      s = e.data.actionType;
      break;
    case "transform":
      s = e.data.transformType;
      break;
    case "trigger":
      s = e.data.triggerType;
      break;
    case "join":
      s = e.data.mode;
      break;
  }
  const i = `${t} ${r}`;
  return ur(s ? `${i}<br/>${s}` : i);
}
function oi(e, t) {
  const r = `"${t}"`;
  switch (e) {
    case "condition":
      return `{${r}}`;
    case "fork":
      return `{{${r}}}`;
    case "approval":
      return `[/${r}\\]`;
    case "llm":
      return `(${r})`;
    default:
      return `[${r}]`;
  }
}
function si(e) {
  return !e || e === "out" ? null : e;
}
function ii(e) {
  const t = ["flowchart TD"], r = {}, s = /* @__PURE__ */ new Map();
  for (const i of e.nodes) {
    const o = ei[i.type] ?? "n", d = r[o] = (r[o] ?? 0) + 1;
    s.set(i.id, Zs(o, d));
  }
  for (const i of e.nodes) {
    const o = s.get(i.id);
    if (!o) continue;
    const d = oi(i.type, ri(i));
    t.push(`  ${o}${d}`);
  }
  for (const i of e.edges) {
    const o = s.get(i.source), d = s.get(i.target);
    if (!o || !d) continue;
    const c = si(i.sourceHandle);
    c ? t.push(`  ${o} --"${ur(c)}"--> ${d}`) : t.push(`  ${o} --> ${d}`);
  }
  return t.join(`
`);
}
function yn(e) {
  return JSON.stringify(e, (t, r) => {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const s = Object.keys(r).sort(), i = {};
      for (const o of s) i[o] = r[o];
      return i;
    }
    return r;
  });
}
function vn(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e) t.set(r.id, r);
  return t;
}
function wn(e) {
  return new Set(e.edges.map((t) => t.id));
}
function ai(e, t) {
  if (!t)
    return {
      addedNodes: e.nodes.map((N) => ({
        node: N,
        dataChanged: !0,
        positionChanged: !1
      })),
      removedNodes: [],
      modifiedNodes: [],
      addedEdges: e.edges.length,
      removedEdges: 0,
      nameChanged: !1,
      iconChanged: !1,
      tagsChanged: !1,
      tagsAdded: [],
      tagsRemoved: []
    };
  const r = vn(e.nodes), s = vn(t.nodes), i = [], o = [], d = [];
  for (const [N, C] of r) {
    const y = s.get(N);
    if (!y) {
      i.push({ node: C, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const k = yn(C.data) !== yn(y.data), b = C.position.x !== y.position.x || C.position.y !== y.position.y;
    (k || b) && d.push({ node: C, dataChanged: k, positionChanged: b });
  }
  for (const [N, C] of s)
    r.has(N) || o.push({ node: C, dataChanged: !0, positionChanged: !1 });
  const c = wn(e), a = wn(t);
  let p = 0, f = 0;
  for (const N of c) a.has(N) || p++;
  for (const N of a) c.has(N) || f++;
  const h = e.name !== t.name, m = (e.icon ?? "") !== (t.icon ?? ""), x = new Set(e.tags ?? []), g = new Set(t.tags ?? []), u = [], v = [];
  for (const N of x) g.has(N) || u.push(N);
  for (const N of g) x.has(N) || v.push(N);
  const w = u.length > 0 || v.length > 0;
  return {
    addedNodes: i,
    removedNodes: o,
    modifiedNodes: d,
    addedEdges: p,
    removedEdges: f,
    nameChanged: h,
    previousName: h ? t.name : void 0,
    iconChanged: m,
    previousIcon: m ? t.icon : void 0,
    tagsChanged: w,
    tagsAdded: u,
    tagsRemoved: v
  };
}
const li = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function ci(e) {
  return e.data.type === "condition" && e.data.label ? e.data.label : e.data.type === "llm" ? e.data.model : e.data.type === "action" ? e.data.actionType : e.data.type === "trigger" ? e.data.triggerType : e.type.charAt(0).toUpperCase() + e.type.slice(1);
}
function _t(e, t, r) {
  const s = e.node, i = li[s.type] ?? "■", o = t !== "removed" && !!r;
  return /* @__PURE__ */ l(
    "button",
    {
      type: "button",
      disabled: !o,
      onClick: o ? () => r(e.node.id) : void 0,
      className: $(
        "flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-[inherit] bg-[#f8fafc] border border-border text-left w-full text-text-primary",
        o ? "cursor-pointer" : "cursor-default",
        t === "removed" && "opacity-85"
      ),
      "data-testid": `diff-row-${t}`,
      children: [
        /* @__PURE__ */ n("span", { className: "text-sm", children: i }),
        /* @__PURE__ */ n("span", { className: "font-semibold", children: s.type }),
        /* @__PURE__ */ n("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: ci(s) }),
        t === "modified" && e.positionChanged ? /* @__PURE__ */ n("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]", children: "moved" }) : null
      ]
    },
    `${t}-${e.node.id}`
  );
}
function di({
  open: e,
  onClose: t,
  currentDef: r,
  publishedDef: s,
  onJumpToNode: i
}) {
  const o = F(
    () => ai(r, s),
    [r, s]
  ), d = (f) => {
    i && i(f), t();
  }, c = s !== null, a = r.version, p = r.publishedVersion;
  return /* @__PURE__ */ l(
    ze,
    {
      open: e,
      onClose: t,
      title: "Changes since publish",
      maxWidth: 820,
      footer: /* @__PURE__ */ n(
        "button",
        {
          onClick: t,
          className: "px-4 py-[7px] text-[13px] font-semibold bg-primary text-white border-none rounded-[7px] cursor-pointer font-[inherit]",
          children: "Close"
        }
      ),
      children: [
        /* @__PURE__ */ l("div", { className: "text-[13px] text-text-primary mb-3 flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ l("strong", { children: [
            "v",
            a
          ] }),
          /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "vs" }),
          typeof p == "number" ? /* @__PURE__ */ l("strong", { children: [
            "published v",
            p
          ] }) : /* @__PURE__ */ n("strong", { className: "text-text-secondary", children: "never published" })
        ] }),
        r.publishedVersion === void 0 ? /* @__PURE__ */ n("p", { className: "m-0 text-[13px] text-text-secondary", children: "This pipeline has never been published." }) : c ? /* @__PURE__ */ l(ne, { children: [
          /* @__PURE__ */ l("div", { className: "flex gap-3 flex-wrap", children: [
            /* @__PURE__ */ l("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ l("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Added (",
                o.addedNodes.length,
                ")"
              ] }),
              o.addedNodes.length === 0 ? /* @__PURE__ */ n("div", { className: "text-xs text-text-tertiary", children: "None" }) : o.addedNodes.map((f) => _t(f, "added", d))
            ] }),
            /* @__PURE__ */ l("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ l("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Removed (",
                o.removedNodes.length,
                ")"
              ] }),
              o.removedNodes.length === 0 ? /* @__PURE__ */ n("div", { className: "text-xs text-text-tertiary", children: "None" }) : o.removedNodes.map((f) => _t(f, "removed", void 0))
            ] }),
            /* @__PURE__ */ l("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ l("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Modified (",
                o.modifiedNodes.length,
                ")"
              ] }),
              o.modifiedNodes.length === 0 ? /* @__PURE__ */ n("div", { className: "text-xs text-text-tertiary", children: "None" }) : o.modifiedNodes.map((f) => _t(f, "modified", d))
            ] })
          ] }),
          /* @__PURE__ */ l("div", { className: "mt-4 pt-3 border-t border-border", children: [
            /* @__PURE__ */ l("div", { className: "text-xs text-text-secondary mt-1", children: [
              /* @__PURE__ */ n("strong", { children: o.addedEdges }),
              " edge",
              o.addedEdges === 1 ? "" : "s",
              " added ·",
              " ",
              /* @__PURE__ */ n("strong", { children: o.removedEdges }),
              " edge",
              o.removedEdges === 1 ? "" : "s",
              " removed"
            ] }),
            o.nameChanged ? /* @__PURE__ */ l("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Name: ",
              /* @__PURE__ */ l("em", { children: [
                '"',
                o.previousName ?? "",
                '"'
              ] }),
              " →",
              " ",
              /* @__PURE__ */ l("strong", { children: [
                '"',
                r.name,
                '"'
              ] })
            ] }) : null,
            o.iconChanged ? /* @__PURE__ */ l("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Icon: ",
              o.previousIcon ?? "—",
              " → ",
              r.icon ?? "—"
            ] }) : null,
            o.tagsChanged ? /* @__PURE__ */ l("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Tags changed: added [",
              o.tagsAdded.join(", ") || "—",
              "], removed [",
              o.tagsRemoved.join(", ") || "—",
              "]"
            ] }) : null
          ] })
        ] }) : /* @__PURE__ */ l("p", { className: "m-0 text-[13px] text-text-secondary", children: [
          "v",
          r.version,
          " · Published v",
          r.publishedVersion,
          " · No snapshot stored — diff will be available after the next publish (Phase 2 once archived snapshots back-fill)."
        ] })
      ]
    }
  );
}
function pi({ open: e, onClose: t }) {
  return null;
}
const Lt = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", Nn = "px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function ui(e) {
  const {
    publishConfirmOpen: t,
    onPublishClose: r,
    onPublishConfirm: s,
    hasErrors: i,
    validationErrorCount: o,
    definitionName: d,
    definitionVersion: c,
    deleteConfirmOpen: a,
    onDeleteClose: p,
    onDeleteConfirm: f,
    clearRunsConfirmOpen: h,
    onClearRunsClose: m,
    onClearRunsConfirm: x,
    versionDiffOpen: g,
    onVersionDiffClose: u,
    currentDef: v,
    publishedDef: w,
    onJumpToNode: N,
    simPanelOpen: C,
    onSimPanelClose: y
  } = e;
  return /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n(
      ze,
      {
        open: t,
        onClose: r,
        title: "Publish pipeline?",
        maxWidth: 420,
        footer: /* @__PURE__ */ l(ne, { children: [
          /* @__PURE__ */ n("button", { onClick: r, className: Lt, children: "Cancel" }),
          /* @__PURE__ */ n(
            "button",
            {
              onClick: s,
              disabled: i,
              className: $(
                "px-4 py-[7px] text-[13px] font-semibold text-white border-none rounded-[7px] font-[inherit]",
                i ? "bg-[#cbd5e1] cursor-not-allowed" : "bg-primary cursor-pointer"
              ),
              children: "Publish"
            }
          )
        ] }),
        children: /* @__PURE__ */ l("p", { className: "m-0", children: [
          "Publishing will make ",
          /* @__PURE__ */ l("strong", { children: [
            '"',
            d,
            '"'
          ] }),
          " available for runs and set the published version to",
          /* @__PURE__ */ l("strong", { children: [
            " v",
            c + 1
          ] }),
          ".",
          i ? /* @__PURE__ */ l(ne, { children: [
            /* @__PURE__ */ n("br", {}),
            /* @__PURE__ */ n("br", {}),
            /* @__PURE__ */ l("span", { className: "text-[#dc2626]", children: [
              "Pipeline has ",
              o,
              " validation error",
              o === 1 ? "" : "s",
              ". Fix them before publishing."
            ] })
          ] }) : null
        ] })
      }
    ),
    /* @__PURE__ */ n(
      ze,
      {
        open: a,
        onClose: p,
        title: "Delete pipeline?",
        maxWidth: 400,
        footer: /* @__PURE__ */ l(ne, { children: [
          /* @__PURE__ */ n("button", { onClick: p, className: Lt, children: "Cancel" }),
          /* @__PURE__ */ n("button", { onClick: f, className: Nn, children: "Delete" })
        ] }),
        children: /* @__PURE__ */ l("p", { className: "m-0", children: [
          /* @__PURE__ */ l("strong", { children: [
            '"',
            d,
            '"'
          ] }),
          " will be permanently removed. Run history for this pipeline will also be lost."
        ] })
      }
    ),
    /* @__PURE__ */ n(
      ze,
      {
        open: h,
        onClose: m,
        title: "Clear run history?",
        maxWidth: 400,
        footer: /* @__PURE__ */ l(ne, { children: [
          /* @__PURE__ */ n("button", { onClick: m, className: Lt, children: "Cancel" }),
          /* @__PURE__ */ n("button", { onClick: x, className: Nn, children: "Clear history" })
        ] }),
        children: /* @__PURE__ */ l("p", { className: "m-0", children: [
          "All stored run history for ",
          /* @__PURE__ */ l("strong", { children: [
            '"',
            d,
            '"'
          ] }),
          " will be permanently removed. This cannot be undone."
        ] })
      }
    ),
    /* @__PURE__ */ n(
      di,
      {
        open: g,
        onClose: u,
        currentDef: v,
        publishedDef: w,
        onJumpToNode: N
      }
    ),
    /* @__PURE__ */ n(
      pi,
      {
        open: C,
        onClose: y
      }
    )
  ] });
}
function mi({ runId: e, visible: t }) {
  const [r, s] = R(/* @__PURE__ */ new Map()), i = oe(null), o = oe(!0), d = oe(null);
  G(() => {
    e !== d.current && (d.current = e, s(/* @__PURE__ */ new Map()), o.current = !0);
  }, [e]);
  const c = M(() => {
    const x = i.current;
    if (!x) return;
    const g = x.scrollHeight - x.scrollTop - x.clientHeight < 30;
    o.current = g;
  }, []), a = M(() => {
    if (!o.current) return;
    const x = i.current;
    x && (x.scrollTop = x.scrollHeight);
  }, []), p = M(
    (x) => {
      if (!("eventType" in x)) return;
      const { eventType: g, payload: u } = x;
      if (!g.startsWith("pipeline.llm.")) return;
      const v = u?.runId;
      if (!e || v !== e) return;
      const w = u?.stepId;
      if (w) {
        if (g === "pipeline.llm.stream.opened")
          s((N) => {
            const C = new Map(N);
            return C.has(w) || C.set(w, {
              stepId: w,
              tokens: [],
              text: "",
              active: !0,
              summary: null,
              collapsed: !1,
              startedAt: Date.now()
            }), C;
          });
        else if (g === "pipeline.llm.token") {
          const N = u?.token;
          if (N === void 0) return;
          s((C) => {
            const y = new Map(C), k = y.get(w);
            if (k) {
              const b = {
                ...k,
                tokens: [...k.tokens, N],
                text: k.text + N,
                active: !0
              };
              y.set(w, b);
            } else
              y.set(w, {
                stepId: w,
                tokens: [N],
                text: N,
                active: !0,
                summary: null,
                collapsed: !1,
                startedAt: Date.now()
              });
            return y;
          });
        } else if (g === "pipeline.llm.response") {
          const N = u?.tokensIn, C = u?.tokensOut;
          s((y) => {
            const k = new Map(y), b = k.get(w), T = b ? Date.now() - b.startedAt : 0, I = T > 1e3 ? `${(T / 1e3).toFixed(1)}s` : `${T}ms`, S = `${w}: ${N ?? "?"} tokens in, ${C ?? "?"} tokens out (${I})`;
            return b ? k.set(w, {
              ...b,
              active: !1,
              summary: S
            }) : k.set(w, {
              stepId: w,
              tokens: [],
              text: "",
              active: !1,
              summary: S,
              collapsed: !1,
              startedAt: Date.now()
            }), k;
          });
        }
      }
    },
    [e]
  );
  Pe("*", p), G(() => {
    a();
  }, [r, a]);
  const f = M((x) => {
    s((g) => {
      const u = new Map(g), v = u.get(x);
      return v && u.set(x, { ...v, collapsed: !v.collapsed }), u;
    });
  }, []), h = F(() => {
    for (const x of r.values())
      if (x.active) return !0;
    return !1;
  }, [r]), m = F(() => Array.from(r.values()), [r]);
  return t ? /* @__PURE__ */ l(
    "div",
    {
      className: "flex flex-col bg-[#1e1e2e] border-t border-[#313244] max-h-[320px] min-h-[160px] overflow-hidden relative",
      "data-testid": "live-output-panel",
      children: [
        /* @__PURE__ */ n("div", { className: "flex items-center justify-between py-2 px-[14px] bg-[#181825] border-b border-[#313244] shrink-0", children: /* @__PURE__ */ l("div", { className: "text-xs font-bold text-[#cdd6f4] tracking-[0.04em] uppercase flex items-center gap-2", children: [
          /* @__PURE__ */ n("span", { children: "Live Output" }),
          h && /* @__PURE__ */ n("span", { className: "w-1.5 h-1.5 rounded-full bg-[#a6e3a1] [animation:live-output-blink_1.2s_ease-in-out_infinite]" }),
          e && /* @__PURE__ */ l("span", { className: "text-[10px] text-[#6c7086] font-normal normal-case", children: [
            e.slice(0, 8),
            "..."
          ] })
        ] }) }),
        /* @__PURE__ */ n(
          "div",
          {
            ref: i,
            className: "flex-1 overflow-y-auto py-[10px] px-[14px] text-[13px] leading-[1.6] text-[#cdd6f4] font-code",
            onScroll: c,
            children: m.length === 0 ? /* @__PURE__ */ n("div", { className: "flex items-center justify-center h-full text-[#6c7086] text-[13px] italic", children: e ? "Waiting for LLM output..." : "No active run" }) : m.map((x) => /* @__PURE__ */ l("div", { children: [
              /* @__PURE__ */ l(
                "div",
                {
                  className: $(
                    "flex items-center gap-2 py-1.5 cursor-pointer select-none text-[11px] font-semibold border-b border-[#313244] mb-1.5",
                    x.active ? "text-[#89b4fa]" : "text-[#a6adc8]"
                  ),
                  onClick: () => f(x.stepId),
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (g) => {
                    (g.key === "Enter" || g.key === " ") && f(x.stepId);
                  },
                  children: [
                    /* @__PURE__ */ n("span", { className: "text-[10px]", children: x.collapsed ? "▶" : "▼" }),
                    /* @__PURE__ */ n("span", { children: x.stepId }),
                    x.active && /* @__PURE__ */ n("span", { className: "text-[#a6e3a1] text-[10px]", children: "streaming" })
                  ]
                }
              ),
              !x.collapsed && /* @__PURE__ */ l(ne, { children: [
                x.text.length > 0 && /* @__PURE__ */ l("div", { className: "whitespace-pre-wrap break-words m-0 mb-3 p-0 text-[#cdd6f4]", children: [
                  x.text,
                  x.active && /* @__PURE__ */ n("span", { className: "inline-block w-0.5 h-[14px] bg-[#89b4fa] ml-px align-text-bottom [animation:live-output-blink_1s_step-end_infinite]" })
                ] }),
                x.summary && /* @__PURE__ */ l("div", { className: "text-[11px] text-[#a6e3a1] font-semibold pt-1 pb-2 border-b border-[#313244] mb-2", children: [
                  "✓",
                  " ",
                  x.summary
                ] })
              ] })
            ] }, x.stepId))
          }
        )
      ]
    }
  ) : null;
}
function xt(e, t) {
  const r = new Blob([t], { type: "application/json" }), s = URL.createObjectURL(r), i = document.createElement("a");
  i.href = s, i.download = e, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(s);
}
function gt(e, t) {
  if (!t) return "step";
  const r = e?.nodes.find((s) => s.id === t);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : t;
}
function fi(e) {
  const t = nt(), { toast: r } = Pt(), { definition: s, selectedNodeId: i, setSelectedNodeId: o } = dt(), d = oe(t.runs);
  G(() => {
    d.current = t.runs;
  }, [t.runs]);
  const c = oe(s);
  G(() => {
    c.current = s;
  }, [s]);
  const a = M(
    (A) => A ? d.current[A]?.pipelineId === e : !1,
    [e]
  ), [p, f] = R(null), [h, m] = R(null), x = M(() => {
    f(null), m(null);
  }, []), g = M(
    (A) => {
      m(A);
    },
    []
  ), u = M(
    (A) => {
      "eventType" in A || A.pipelineId === e && (r("Run started", { type: "info" }), f(null), m(null));
    },
    [e, r]
  ), v = M(
    (A) => {
      if ("eventType" in A || !a(A.runId)) return;
      const E = Math.round(A.durationMs / 100) / 10;
      r(`Run completed in ${E}s`, { type: "success" });
    },
    [a, r]
  ), w = M(
    (A) => {
      if ("eventType" in A || !a(A.runId)) return;
      const E = A.error.nodeId, te = gt(c.current, E);
      r(`Run failed at ${te}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => o(E)
      }), f(A.error);
    },
    [a, o, r]
  ), N = M(
    (A) => {
      "eventType" in A || a(A.runId) && r("Run cancelled", { type: "warning" });
    },
    [a, r]
  ), C = M(
    (A) => {
      if ("eventType" in A || !a(A.runId)) return;
      const E = A.stepId, te = gt(c.current, E);
      r(`Approval requested on "${te}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => o(E)
      });
    },
    [a, o, r]
  );
  Pe("pipeline.run.started", u), Pe("pipeline.run.completed", v), Pe("pipeline.run.failed", w), Pe("pipeline.run.cancelled", N), Pe("pipeline.approval.requested", C);
  const [y, k] = R(null);
  G(() => {
    if (t.activeRunIds.length > 0) {
      const A = t.activeRunIds[t.activeRunIds.length - 1];
      A !== y && k(A);
      return;
    }
    if (!y) {
      const A = Object.values(t.runs).sort(
        (E, te) => te.startedAt.localeCompare(E.startedAt)
      );
      A.length > 0 && k(A[0].id);
    }
  }, [t.activeRunIds, t.runs, y]);
  const b = y ? t.runs[y] : void 0, T = !!b && (b.status === "running" || b.status === "pending" || b.status === "awaiting_approval"), [I, S] = R(/* @__PURE__ */ new Set()), [D, _] = R(null), [W, Q] = R(null), [ee, de] = R(null), [O, U] = R(0), [P, B] = R(!1), [K, j] = R(null), X = M(
    (A, E) => {
      E === null ? (Q(null), de(null)) : (Q(E), de(A));
    },
    []
  ), Z = M((A) => {
    S((E) => {
      const te = new Set(E);
      return te.has(A) ? te.delete(A) : te.add(A), te;
    });
  }, []), le = M(async () => {
    if (I.size !== 0)
      try {
        const A = await t.triggerDebugRun(
          e,
          Array.from(I)
        );
        k(A);
      } catch (A) {
        console.error("[PipelineEditor] triggerDebugRun failed", A);
      }
  }, [I, t, e]), be = M(() => {
    D && (t.resolveBreakpoint(D.runId, D.stepId, "continue"), _(null));
  }, [D, t]), L = M(() => {
    D && (t.resolveBreakpoint(D.runId, D.stepId, "step_over"), _(null));
  }, [D, t]), re = M(() => {
    D && (t.resolveBreakpoint(D.runId, D.stepId, "resume_all"), _(null));
  }, [D, t]), ge = M(async () => {
    if (!(!D || !W || ee !== D.stepId) && Object.keys(W).length !== 0) {
      B(!0);
      try {
        await Ir(
          e,
          D.runId,
          D.stepId,
          { mode: "merge", values: W }
        ), Q(null), de(null), U((A) => A + 1), t.resolveBreakpoint(D.runId, D.stepId, "continue"), _(null);
      } catch (A) {
        if (A instanceof Sr)
          r(`Patch rejected: ${A.reason}`, { type: "error", durationMs: 8e3 });
        else if (A instanceof dn)
          r(`Apply failed (HTTP ${A.status})`, { type: "error", durationMs: 6e3 });
        else {
          const E = A instanceof Error ? A.message : String(A);
          r(`Apply failed: ${E}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        B(!1);
      }
    }
  }, [D, W, ee, e, t, r]), $e = M(
    async (A) => {
      if (D) {
        j(A);
        try {
          await Tr(
            e,
            D.runId,
            D.stepId,
            A
          ), r("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (E) {
          if (E instanceof dn)
            r(`Revert failed (HTTP ${E.status})`, { type: "error", durationMs: 6e3 });
          else {
            const te = E instanceof Error ? E.message : String(E);
            r(`Revert failed: ${te}`, { type: "error", durationMs: 6e3 });
          }
        } finally {
          j(null);
        }
      }
    },
    [D, e, r]
  ), Ke = M(
    (A) => {
      if ("eventType" in A || !a(A.runId)) return;
      _({ runId: A.runId, stepId: A.stepId });
      const E = gt(c.current, A.stepId);
      r(`Paused at breakpoint: ${E}`, { type: "warning", durationMs: 6e3 });
    },
    [a, r]
  );
  Pe("pipeline.step.breakpoint", Ke);
  const Oe = M(
    (A) => {
      "eventType" in A || D && D.runId === A.runId && _(null);
    },
    [D]
  );
  Pe("pipeline.run.completed", Oe), Pe("pipeline.run.failed", Oe), Pe("pipeline.run.cancelled", Oe);
  const Ae = M(() => {
    p?.nodeId && (t.retryFromStep(p.nodeId), x());
  }, [p, t, x]), Le = s?.status === "published", Ue = !T && !Le, Be = T ? "Cancel the active run" : Le ? "Start a new run" : "Publish the pipeline to enable runs", [ye, pe] = R(!1), [J, q] = R({}), [Y, ae] = R(!1), [ue, Ie] = R("config");
  G(() => {
    i !== null && Ie("config");
  }, [i]);
  const we = M(async (A) => {
    ae(!0);
    try {
      const E = await t.triggerRun(e, A);
      k(E), Ie("runs"), r(`Pipeline triggered — run ${E.slice(0, 8)}…`, { type: "success" });
    } catch (E) {
      console.error("[PipelineEditor] triggerRun failed", E), r(`Trigger failed: ${E.message}`, { type: "error" });
    } finally {
      ae(!1);
    }
  }, [t, e, r]), qe = M(async () => {
    if (T && y) {
      t.cancelRun(y);
      return;
    }
    Ue || we();
  }, [T, y, Ue, t, we]), Nt = M(() => {
    pe(!1), we(J);
  }, [we, J]);
  return {
    currentRunId: y,
    setCurrentRunId: k,
    activeError: p,
    setActiveError: f,
    errorNodeAnchor: h,
    handleDismissError: x,
    handleErrorNodePosition: g,
    handleRetryFromError: Ae,
    handleRunClick: qe,
    handleTriggerInputSubmit: Nt,
    isRunActive: T,
    runDisabled: Ue,
    runTitle: Be,
    isTriggering: Y,
    triggerInputOpen: ye,
    setTriggerInputOpen: pe,
    triggerInputValues: J,
    setTriggerInputValues: q,
    breakpoints: I,
    handleToggleBreakpoint: Z,
    handleDebugRunClick: le,
    pausedBreakpoint: D,
    handleBreakpointContinue: be,
    handleBreakpointStepOver: L,
    handleBreakpointResumeAll: re,
    handleApplyAndContinue: ge,
    handleRevertPatch: $e,
    applyingPatch: P,
    revertingPatchId: K,
    dirtyPatch: W,
    dirtyPatchStepId: ee,
    handleContextEditBufferChange: X,
    resetEditBufferKey: O,
    sidebarTab: ue,
    setSidebarTab: Ie
  };
}
function hi({
  isPublished: e,
  showTags: t,
  hasPublishedVersion: r,
  onDuplicate: s,
  onCopyMermaid: i,
  onViewVersions: o,
  onRevert: d,
  onToggleShowTags: c,
  onViewRunHistory: a,
  onClearRunHistory: p,
  onSimPanelOpen: f,
  onDelete: h
}) {
  const m = $(
    "block w-full text-left px-3.5 py-2 text-[13px]",
    "border-none bg-transparent cursor-pointer font-inherit text-text-primary",
    "hover:bg-surface-hover"
  ), x = $(
    "block w-full text-left px-3.5 py-2 text-[13px]",
    "border-none bg-transparent cursor-pointer font-inherit text-red-600",
    "hover:bg-surface-hover"
  );
  return /* @__PURE__ */ l(
    "div",
    {
      className: $(
        "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg",
        "shadow-lg p-0 min-w-[200px] max-h-[320px] overflow-y-auto z-20"
      ),
      role: "menu",
      children: [
        /* @__PURE__ */ n("button", { className: m, role: "menuitem", onClick: s, children: "Duplicate" }),
        /* @__PURE__ */ n(
          "button",
          {
            className: m,
            role: "menuitem",
            onClick: i,
            "data-testid": "copy-mermaid-btn",
            children: "Copy Mermaid"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            className: m,
            role: "menuitem",
            onClick: o,
            "data-testid": "view-versions-btn",
            children: "View changes since publish"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            className: m,
            role: "menuitem",
            onClick: d,
            disabled: !r,
            children: "Revert to published"
          }
        ),
        /* @__PURE__ */ n("div", { className: "border-t border-slate-100 my-1" }),
        /* @__PURE__ */ n(
          "button",
          {
            className: m,
            role: "menuitem",
            onClick: c,
            "data-testid": "toggle-tags-row",
            children: t ? "Hide tags" : "Show tags"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            className: m,
            role: "menuitem",
            onClick: a,
            children: "View run history"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            className: x,
            role: "menuitem",
            onClick: p,
            children: "Clear run history"
          }
        ),
        !1,
        /* @__PURE__ */ n("div", { className: "border-t border-slate-100 my-1" }),
        /* @__PURE__ */ n(
          "button",
          {
            className: x,
            role: "menuitem",
            onClick: h,
            children: "Delete"
          }
        )
      ]
    }
  );
}
const Bt = {
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-green-50 text-green-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600"
};
function xi({
  pipelineId: e,
  definition: t,
  dirty: r,
  savingFlash: s,
  isRunActive: i,
  isTriggering: o,
  runDisabled: d,
  runTitle: c,
  currentRun: a,
  breakpoints: p,
  onRunClick: f,
  onDebugRunClick: h,
  onExport: m,
  onPublishClick: x,
  onDuplicate: g,
  onCopyMermaid: u,
  onViewVersions: v,
  onRevert: w,
  onToggleShowTags: N,
  showTags: C,
  onViewRunHistory: y,
  onClearRunHistory: k,
  onSimPanelOpen: b,
  onDelete: T
}) {
  const I = Ee(), { rename: S, setIcon: D, setSelectedNodeId: _ } = dt(), [W, Q] = R(!1), [ee, de] = R(""), O = oe(null);
  G(() => {
    W && (de(t.name ?? ""), setTimeout(() => O.current?.focus(), 0));
  }, [W, t.name]);
  const U = () => {
    const J = ee.trim();
    J && J !== t.name && S(J), Q(!1);
  }, P = t ? pr(t) : null;
  (P?.errors.length ?? 0) > 0;
  const B = t.status === "published", K = r ? { label: "Saving…", variant: "info" } : s ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, j = t.status === "published" ? { label: `v${t.version} · Published`, variant: "success" } : typeof t.publishedVersion == "number" ? { label: `v${t.version} · Draft (pub v${t.publishedVersion})`, variant: "warning" } : { label: `v${t.version} · Draft`, variant: "neutral" }, X = P ? P.errors.length > 0 ? { label: `✗ ${P.errors.length} error${P.errors.length === 1 ? "" : "s"}`, variant: "danger" } : P.warnings.length > 0 ? { label: `⚠ ${P.warnings.length} warning${P.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [Z, le] = R(!1), be = oe(null);
  st(be, () => le(!1), Z);
  const L = P ? [...P.errors, ...P.warnings] : [], re = (J) => {
    J && (_(J), le(!1));
  }, ge = t.nodes.filter((J) => J.type !== "trigger").length, $e = a ? Object.values(a.steps).filter(
    (J) => J.status === "completed" || J.status === "skipped"
  ).length : 0, Oe = ((a?.startedAt ? Date.now() - new Date(a.startedAt).getTime() : 0) / 1e3).toFixed(1), Ae = i && a ? { text: `Running (${$e}/${ge} steps) · ${Oe}s`, variant: "running" } : a?.status === "completed" ? { text: `Completed in ${a.durationMs ? (a.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : a?.status === "failed" ? { text: `Failed at ${gt(t, a.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, Le = {
    running: "bg-blue-50 text-blue-600",
    success: "bg-green-50 text-green-600",
    error: "bg-red-50 text-red-600"
  }, Ue = i ? "⏹ Stop" : a && a.status !== "running" ? "↻ Re-run" : "▶ Run", [Be, ye] = R(!1), pe = oe(null);
  return st(pe, () => ye(!1), Be), /* @__PURE__ */ l(
    "div",
    {
      className: $(
        "h-11 shrink-0 flex items-center gap-2.5 px-3",
        "border-b border-border bg-surface",
        "sticky top-0 z-5"
      ),
      children: [
        /* @__PURE__ */ n(
          ht,
          {
            onClick: () => I("/pipelines"),
            "aria-label": "Back to pipelines",
            title: "Back to pipelines",
            children: "←"
          }
        ),
        /* @__PURE__ */ n(
          zr,
          {
            value: t.icon ?? "🔀",
            onChange: D
          }
        ),
        W ? /* @__PURE__ */ n(
          "input",
          {
            ref: O,
            value: ee,
            onChange: (J) => de(J.target.value),
            onBlur: U,
            onKeyDown: (J) => {
              J.key === "Enter" && U(), J.key === "Escape" && (de(t.name), Q(!1));
            },
            className: $(
              "px-2 py-1 text-sm font-bold text-text-primary",
              "bg-surface border border-border-field rounded-md",
              "font-inherit outline-none w-[260px]"
            ),
            "data-testid": "pipeline-name-input"
          }
        ) : /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: () => Q(!0),
            className: $(
              "px-2 py-1 text-sm font-bold text-text-primary",
              "bg-transparent border border-transparent rounded-md",
              "cursor-text font-inherit max-w-[280px]",
              "overflow-hidden text-ellipsis whitespace-nowrap text-left"
            ),
            title: t.name,
            "data-testid": "pipeline-name",
            children: t.name
          }
        ),
        /* @__PURE__ */ n(
          "span",
          {
            className: $(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              Bt[K.variant]
            ),
            "data-testid": "save-status",
            children: K.label
          }
        ),
        /* @__PURE__ */ n(
          "span",
          {
            className: $(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              Bt[j.variant]
            ),
            "data-testid": "version-badge",
            children: j.label
          }
        ),
        /* @__PURE__ */ l("div", { className: "relative", ref: be, children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: () => le((J) => !J),
              className: $(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
                "cursor-pointer border-none",
                Bt[X.variant]
              ),
              "data-testid": "validation-indicator",
              children: X.label
            }
          ),
          Z && L.length > 0 && /* @__PURE__ */ n(
            "div",
            {
              className: $(
                "absolute top-full mt-1.5 bg-surface border border-border rounded-lg",
                "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"
              ),
              children: L.map((J, q) => /* @__PURE__ */ l(
                "button",
                {
                  type: "button",
                  onClick: () => re(J.nodeId),
                  className: $(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    J.nodeId ? "cursor-pointer" : "cursor-default",
                    q < L.length - 1 && "border-b border-border"
                  ),
                  children: [
                    /* @__PURE__ */ n(
                      "span",
                      {
                        className: $(
                          "font-bold text-xs",
                          J.severity === "error" ? "text-red-600" : "text-amber-600"
                        ),
                        children: J.severity === "error" ? "✗" : "⚠"
                      }
                    ),
                    /* @__PURE__ */ l("span", { className: "flex-1 text-xs", children: [
                      /* @__PURE__ */ n("div", { className: "font-semibold", children: J.code }),
                      /* @__PURE__ */ n("div", { className: "text-text-secondary", children: J.message }),
                      J.nodeId && /* @__PURE__ */ n("div", { className: "mt-0.5 text-[11px] text-primary", children: "Jump to node →" })
                    ] })
                  ]
                },
                `${J.code}-${q}`
              ))
            }
          )
        ] }),
        Ae.variant !== "none" && /* @__PURE__ */ l(
          "span",
          {
            className: $(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap",
              Le[Ae.variant]
            ),
            "data-testid": "run-status-indicator",
            children: [
              Ae.variant === "running" && /* @__PURE__ */ n("span", { className: "inline-block w-3 h-3 border-2 border-slate-200 border-t-primary rounded-full animate-spin" }),
              Ae.variant === "success" && "✓ ",
              Ae.variant === "error" && "✗ ",
              Ae.text
            ]
          }
        ),
        /* @__PURE__ */ n("div", { className: "flex-1" }),
        /* @__PURE__ */ n(
          Fe,
          {
            variant: "secondary",
            onClick: () => I("/pipelines/metrics"),
            title: "View pipeline metrics dashboard",
            "data-testid": "metrics-button",
            children: "Metrics"
          }
        ),
        /* @__PURE__ */ n(
          Fe,
          {
            variant: "secondary",
            onClick: m,
            title: "Export pipeline as JSON",
            "data-testid": "export-button",
            children: "Export"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: x,
            title: B ? "Already published at this version" : "Publish pipeline to enable runs",
            disabled: B,
            className: $(
              "px-3 py-1.5 text-[13px] font-semibold border-none rounded-md font-inherit shrink-0",
              B ? "bg-surface-hover text-text-tertiary cursor-default opacity-70" : "bg-green-600 text-white cursor-pointer"
            ),
            "data-testid": "publish-button",
            children: B ? "Published" : "Publish"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: f,
            disabled: d || o,
            title: c,
            className: $(
              "px-3.5 py-1.5 text-[13px] font-semibold text-white border-none rounded-md font-inherit shrink-0",
              i ? "bg-red-600" : "bg-primary",
              d || o ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            ),
            "data-testid": "run-button",
            children: o ? /* @__PURE__ */ l("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ n("span", { className: "inline-block w-3 h-3 border-2 border-slate-200 border-t-white rounded-full animate-spin" }),
              "Triggering…"
            ] }) : Ue
          }
        ),
        p.size > 0 && /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: h,
            disabled: d || i,
            title: `Debug run (${p.size} breakpoint${p.size > 1 ? "s" : ""})`,
            className: $(
              "px-3.5 py-1.5 text-[13px] font-semibold bg-amber-600 text-white",
              "border-none rounded-md font-inherit shrink-0",
              d || i ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            ),
            "data-testid": "debug-run-button",
            children: [
              "Debug (",
              p.size,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ l("div", { className: "relative", ref: pe, children: [
          /* @__PURE__ */ n(
            ht,
            {
              onClick: () => ye((J) => !J),
              "aria-label": "More actions",
              "data-testid": "overflow-menu-btn",
              children: "⋯"
            }
          ),
          Be && /* @__PURE__ */ n(
            hi,
            {
              isPublished: B,
              showTags: C,
              onDuplicate: () => {
                g(), ye(!1);
              },
              onCopyMermaid: () => {
                u(), ye(!1);
              },
              onViewVersions: () => {
                v(), ye(!1);
              },
              onRevert: () => {
                w(), ye(!1);
              },
              onToggleShowTags: () => {
                N(), ye(!1);
              },
              onViewRunHistory: () => {
                y(), ye(!1);
              },
              onClearRunHistory: () => {
                k(), ye(!1);
              },
              onSimPanelOpen: () => {
                b(), ye(!1);
              },
              onDelete: () => {
                T(), ye(!1);
              },
              hasPublishedVersion: typeof t.publishedVersion == "number"
            }
          )
        ] })
      ]
    }
  );
}
const gi = 12;
function Ne(e) {
  return $("text-xs", {
    string: "text-[#a6e3a1]",
    number: "text-[#fab387]",
    boolean: "text-[#cba6f7]",
    null: "text-[#6c7086]",
    bracket: "text-[#9399b2]"
  }[e]);
}
function yt({
  data: e,
  depth: t = 0,
  highlightKeys: r,
  keyName: s,
  isHighlighted: i = !1
}) {
  const [o, d] = R(t > 2);
  if (t > gi)
    return /* @__PURE__ */ n("span", { className: Ne("string"), children: "[max depth]" });
  const c = i || s != null && r?.has(s);
  if (e === null)
    return /* @__PURE__ */ n("span", { className: $(Ne("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "null" });
  if (e === void 0)
    return /* @__PURE__ */ n("span", { className: $(Ne("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "undefined" });
  if (typeof e == "boolean")
    return /* @__PURE__ */ n("span", { className: $(Ne("boolean"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(e) });
  if (typeof e == "number")
    return /* @__PURE__ */ n("span", { className: $(Ne("number"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(e) });
  if (typeof e == "string") {
    const a = e.length > 120 ? e.slice(0, 120) + "..." : e;
    return /* @__PURE__ */ l("span", { className: $(Ne("string"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: [
      '"',
      a,
      '"'
    ] });
  }
  if (Array.isArray(e))
    return e.length === 0 ? /* @__PURE__ */ n("span", { className: Ne("bracket"), children: "[]" }) : /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(
        "span",
        {
          className: "cursor-pointer select-none text-[9px] mr-1 text-[#6c7086] inline-block w-3 text-center",
          onClick: () => d((a) => !a),
          role: "button",
          tabIndex: 0,
          onKeyDown: (a) => {
            (a.key === "Enter" || a.key === " ") && d((p) => !p);
          },
          children: o ? "▶" : "▼"
        }
      ),
      /* @__PURE__ */ n("span", { className: Ne("bracket"), children: "[" }),
      o ? /* @__PURE__ */ l("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        e.length,
        " items"
      ] }) : /* @__PURE__ */ n("div", { className: "pl-4", children: e.map((a, p) => /* @__PURE__ */ l("div", { className: "leading-relaxed whitespace-nowrap", children: [
        /* @__PURE__ */ l("span", { className: "text-[#6c7086] text-[11px]", children: [
          p,
          ": "
        ] }),
        /* @__PURE__ */ n(yt, { data: a, depth: t + 1, highlightKeys: r }),
        p < e.length - 1 && /* @__PURE__ */ n("span", { className: Ne("bracket"), children: "," })
      ] }, p)) }),
      /* @__PURE__ */ n("span", { className: Ne("bracket"), children: "]" })
    ] });
  if (typeof e == "object") {
    const a = Object.entries(e);
    return a.length === 0 ? /* @__PURE__ */ n("span", { className: Ne("bracket"), children: "{}" }) : /* @__PURE__ */ l("span", { children: [
      /* @__PURE__ */ n(
        "span",
        {
          className: "cursor-pointer select-none text-[9px] mr-1 text-[#6c7086] inline-block w-3 text-center",
          onClick: () => d((p) => !p),
          role: "button",
          tabIndex: 0,
          onKeyDown: (p) => {
            (p.key === "Enter" || p.key === " ") && d((f) => !f);
          },
          children: o ? "▶" : "▼"
        }
      ),
      /* @__PURE__ */ n("span", { className: Ne("bracket"), children: "{" }),
      o ? /* @__PURE__ */ l("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        a.length,
        " keys"
      ] }) : /* @__PURE__ */ n("div", { className: "pl-4", children: a.map(([p, f], h) => {
        const m = r?.has(p) || i;
        return /* @__PURE__ */ l("div", { className: "leading-relaxed whitespace-nowrap", children: [
          /* @__PURE__ */ n("span", { className: $(
            "text-xs font-medium text-[#89b4fa]",
            m && "text-[#a6e3a1] font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5"
          ), children: p }),
          /* @__PURE__ */ n("span", { className: Ne("bracket"), children: ": " }),
          /* @__PURE__ */ n(
            yt,
            {
              data: f,
              depth: t + 1,
              highlightKeys: t === 0 ? r : void 0,
              keyName: p,
              isHighlighted: m
            }
          ),
          h < a.length - 1 && /* @__PURE__ */ n("span", { className: Ne("bracket"), children: "," })
        ] }, p);
      }) }),
      /* @__PURE__ */ n("span", { className: Ne("bracket"), children: "}" })
    ] });
  }
  return /* @__PURE__ */ n("span", { className: Ne("string"), children: String(e) });
}
function bi({
  snapshots: e,
  activeStepId: t,
  fallbackActiveStepId: r,
  onStepSelect: s
}) {
  const i = t ?? r;
  return /* @__PURE__ */ n("div", { className: "w-[140px] shrink-0 border-r border-border overflow-y-auto", children: e.map((o, d) => {
    const c = o.stepId === i;
    return /* @__PURE__ */ l(
      "div",
      {
        className: $(
          "px-2.5 py-1.5 text-[11px] font-mono cursor-pointer border-b border-border overflow-hidden text-ellipsis whitespace-nowrap",
          c ? "text-text-primary bg-surface-inset font-semibold" : "text-text-tertiary font-normal"
        ),
        onClick: () => s?.(o.stepId),
        role: "button",
        tabIndex: 0,
        onKeyDown: (a) => {
          (a.key === "Enter" || a.key === " ") && s?.(o.stepId);
        },
        title: o.stepId,
        children: [
          o.newKeys.length > 0 && /* @__PURE__ */ n("span", { className: "text-[#a6e3a1] mr-1 text-[9px]", children: "+" }),
          /* @__PURE__ */ l("span", { className: "text-[10px] text-[#9399b2] mr-1", children: [
            d + 1,
            "."
          ] }),
          o.stepId ? o.stepId.slice(0, 8) : `step-${d + 1}`
        ]
      },
      o.stepId || d
    );
  }) });
}
function yi(e) {
  return typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : "object";
}
function vi({ k: e, initial: t, onCommit: r, onError: s, onFocus: i }) {
  const [o, d] = R(() => {
    try {
      return JSON.stringify(t, null, 2);
    } catch {
      return "";
    }
  });
  return /* @__PURE__ */ n(
    "textarea",
    {
      "data-testid": `context-edit-input-${e}`,
      value: o,
      onChange: (c) => d(c.target.value),
      onFocus: i,
      onBlur: () => {
        try {
          const c = JSON.parse(o);
          r(c);
        } catch (c) {
          s(`Invalid JSON: ${c instanceof Error ? c.message : String(c)}`);
        }
      },
      className: "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono min-h-[60px] resize-y"
    }
  );
}
function wi({
  inputContext: e,
  buffer: t,
  parseErrors: r,
  newKeyDraft: s,
  setNewKeyDraft: i,
  onCommitNewKey: o,
  onBeginEditKey: d,
  onSetValue: c,
  onRemoveKey: a,
  onParseError: p
}) {
  const f = F(() => {
    const m = /* @__PURE__ */ new Set([
      ...Object.keys(e),
      ...Object.keys(t)
    ]);
    return Array.from(m);
  }, [e, t]), h = "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono";
  return /* @__PURE__ */ l("div", { "data-testid": "context-edit-table", children: [
    f.map((m) => {
      const x = m in t, g = x ? t[m] : e[m], u = yi(g), v = x;
      return /* @__PURE__ */ l(
        "div",
        {
          className: "grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 border-b border-[#313244]",
          "data-testid": `context-edit-row-${m}`,
          children: [
            /* @__PURE__ */ l(
              "span",
              {
                className: $(
                  "text-xs font-medium text-[#89b4fa] pt-1 overflow-hidden text-ellipsis whitespace-nowrap",
                  v && "text-[#a6e3a1] font-bold"
                ),
                title: m,
                children: [
                  m,
                  v && /* @__PURE__ */ n("span", { className: "ml-1 text-[9px]", children: "●" })
                ]
              }
            ),
            /* @__PURE__ */ l("div", { className: "min-w-0", children: [
              u === "boolean" ? /* @__PURE__ */ l(
                "select",
                {
                  "data-testid": `context-edit-input-${m}`,
                  value: String(g),
                  onChange: (w) => c(m, w.target.value === "true"),
                  onFocus: () => d(m, g),
                  className: h,
                  children: [
                    /* @__PURE__ */ n("option", { value: "true", children: "true" }),
                    /* @__PURE__ */ n("option", { value: "false", children: "false" })
                  ]
                }
              ) : u === "number" ? /* @__PURE__ */ n(
                "input",
                {
                  "data-testid": `context-edit-input-${m}`,
                  type: "number",
                  value: String(g),
                  onChange: (w) => {
                    const N = w.target.value === "" ? 0 : Number(w.target.value);
                    c(m, Number.isNaN(N) ? 0 : N);
                  },
                  onFocus: () => d(m, g),
                  className: h
                }
              ) : u === "string" ? /* @__PURE__ */ n(
                "input",
                {
                  "data-testid": `context-edit-input-${m}`,
                  type: "text",
                  value: g ?? "",
                  onChange: (w) => c(m, w.target.value),
                  onFocus: () => d(m, g),
                  className: h
                }
              ) : /* @__PURE__ */ n(
                vi,
                {
                  k: m,
                  initial: g,
                  onCommit: (w) => c(m, w),
                  onError: (w) => p(m, w),
                  onFocus: () => d(m, g)
                }
              ),
              r[m] && /* @__PURE__ */ n(
                "div",
                {
                  "data-testid": `context-edit-parse-error-${m}`,
                  className: "text-[#f38ba8] text-[11px] mt-1",
                  children: r[m]
                }
              )
            ] }),
            /* @__PURE__ */ n("div", { className: "flex gap-1", children: v && /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                "data-testid": `context-edit-revert-${m}`,
                onClick: () => a(m),
                title: "Drop change",
                className: "px-1.5 py-0.5 text-[10px] bg-transparent text-[#9399b2] border border-[#313244] rounded-sm cursor-pointer font-mono",
                children: "↺"
              }
            ) })
          ]
        },
        m
      );
    }),
    /* @__PURE__ */ l(
      "div",
      {
        className: "grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 mt-2",
        "data-testid": "context-edit-add-row",
        children: [
          /* @__PURE__ */ n(
            "input",
            {
              "data-testid": "context-edit-new-key",
              type: "text",
              placeholder: "key",
              value: s.key,
              onChange: (m) => i({ ...s, key: m.target.value }),
              className: h
            }
          ),
          /* @__PURE__ */ n(
            "input",
            {
              "data-testid": "context-edit-new-value",
              type: "text",
              placeholder: "value (string or JSON)",
              value: s.value,
              onChange: (m) => i({ ...s, value: m.target.value }),
              onKeyDown: (m) => {
                m.key === "Enter" && (m.preventDefault(), o());
              },
              className: h
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              "data-testid": "context-edit-add-btn",
              onClick: o,
              disabled: !s.key.trim(),
              className: $(
                "px-2.5 py-0.5 text-[11px] font-semibold border rounded-sm cursor-pointer font-mono",
                s.key.trim() ? "bg-[#a6e3a1] text-[#1e1e2e] border-[#a6e3a1]" : "bg-transparent text-[#45475a] border-[#313244] cursor-not-allowed"
              ),
              children: "+ Add field"
            }
          )
        ]
      }
    )
  ] });
}
function Ni(e, t, r) {
  const s = { ...e }, i = { ...s.steps ?? {} };
  return i[t] = r, s.steps = i, r && typeof r == "object" && !Array.isArray(r) && Object.assign(s, r), s;
}
function ki(e, t) {
  const r = [];
  for (const s of Object.keys(t))
    s in e || r.push(s);
  return r;
}
function Ci(e) {
  const t = Object.values(e.steps).filter((i) => i != null).sort((i, o) => {
    const d = i.startedAt ? Date.parse(i.startedAt) : 0, c = o.startedAt ? Date.parse(o.startedAt) : 0;
    return d - c;
  }), r = [];
  let s = {};
  e.triggeredBy?.payload && typeof e.triggeredBy.payload == "object" && (s = { ...e.triggeredBy.payload });
  for (const i of t) {
    const o = { ...s }, d = i.output, c = i.llm?.prompt;
    let a;
    if (d !== void 0)
      a = Ni(s, i.nodeId, d);
    else {
      a = { ...s };
      const f = {
        ...a.steps ?? {}
      };
      f[i.nodeId] = d, a.steps = f;
    }
    const p = ki(o, a);
    r.push({
      stepId: i.nodeId,
      inputContext: o,
      output: d,
      outputContext: a,
      resolvedPrompt: c || void 0,
      newKeys: p,
      stepExecution: i
    }), s = a;
  }
  return r;
}
function Ii(e, t) {
  const [r, s] = R(/* @__PURE__ */ new Map()), [i, o] = R(
    /* @__PURE__ */ new Map()
  ), d = oe(null);
  G(() => {
    const m = e?.id ?? null;
    m !== d.current && (d.current = m, s(/* @__PURE__ */ new Map()), o(/* @__PURE__ */ new Map()));
  }, [e?.id]);
  const c = M(
    (m) => {
      if (!m || typeof m != "object") return;
      const { eventType: x, payload: g } = m;
      if (!g || typeof g != "object") return;
      const u = g, v = u.runId;
      if (!(!e?.id || v !== e.id)) {
        if (x === "pipeline.llm.prompt") {
          const w = u.stepId, N = u.prompt;
          w && N && s((C) => {
            const y = new Map(C);
            return y.set(w, N), y;
          });
        }
        if (x === "pipeline.run.checkpoint" || x === "pipeline.run.checkpointed" || x === "pipeline:run:checkpoint" || x === "pipeline:run:checkpointed") {
          const w = u.context, N = u.stepId;
          w && N && o((C) => {
            const y = new Map(C);
            return y.set(N, w), y;
          });
        }
      }
    },
    [e?.id]
  );
  Pe("*", c);
  const a = F(() => e ? Ci(e) : [], [e]), p = F(() => a.map((m) => {
    const x = r.get(m.stepId), g = i.get(m.stepId);
    return {
      ...m,
      resolvedPrompt: m.resolvedPrompt || x,
      outputContext: g ?? m.outputContext
    };
  }), [a, r, i]), f = F(() => t ? p.find((m) => m.stepId === t) ?? null : p[p.length - 1] ?? null, [p, t]), h = F(() => f ? new Set(f.newKeys) : /* @__PURE__ */ new Set(), [f]);
  return { enrichedSnapshots: p, activeSnapshot: f, newKeysSet: h };
}
function kn({ attempt: e, label: t }) {
  const r = !e.error;
  return /* @__PURE__ */ l("div", { className: "bg-[#11111b] rounded-md border border-[#313244] p-2.5 overflow-auto", children: [
    /* @__PURE__ */ n("div", { className: "text-[11px] font-bold text-[#cdd6f4] mb-2", children: t }),
    /* @__PURE__ */ l("div", { className: "flex gap-1.5 mb-1.5 items-center", children: [
      /* @__PURE__ */ n("span", { className: $(
        "text-[10px] font-semibold px-1.5 py-px rounded-sm",
        r ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
      ), children: r ? "OK" : "FAIL" }),
      e.durationMs != null && /* @__PURE__ */ l("span", { className: "text-[10px] text-[#6c7086]", children: [
        e.durationMs,
        "ms"
      ] })
    ] }),
    e.error && /* @__PURE__ */ n("div", { className: "text-[11px] text-[#f38ba8] font-mono mb-1.5 px-2 py-1.5 bg-[#1a0f14] rounded whitespace-pre-wrap break-words", children: e.error }),
    e.output !== void 0 && /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ n("div", { className: "text-[10px] text-[#6c7086] font-semibold mb-1 uppercase", children: "Output" }),
      /* @__PURE__ */ n(yt, { data: e.output, depth: 0 })
    ] })
  ] });
}
function Si({
  run: e,
  activeStepId: t,
  onStepSelect: r,
  editable: s = !1,
  onEditBufferChange: i,
  resetEditBufferKey: o
}) {
  const [d, c] = R("input"), [a, p] = R(0), [f, h] = R(!1), [m, x] = R({}), [g, u] = R(null), [v, w] = R({}), [N, C] = R({
    key: "",
    value: ""
  }), { enrichedSnapshots: y, activeSnapshot: k, newKeysSet: b } = Ii(e, t), T = k?.resolvedPrompt != null, I = k?.stepExecution.attempts, S = (I?.length ?? 0) >= 2;
  G(() => {
    d === "prompt" && !T && c("input"), d === "attempts" && !S && c("input");
  }, [d, T, S]), G(() => {
    p(0);
  }, [t]);
  const D = !!(e && e.status === "paused_at_breakpoint" && t && (e.currentStepIds?.includes(t) || k?.stepExecution.status === "running" || k?.stepExecution.status === "awaiting" || k?.stepExecution.status === "pending")), _ = !!s && !!D;
  G(() => {
    _ ? g && g !== t && (x({}), u(null), w({})) : (f && h(!1), Object.keys(m).length > 0 && x({}), g && u(null), Object.keys(v).length > 0 && w({}));
  }, [_, t]), G(() => {
    o !== void 0 && (x({}), u(null), w({}), C({ key: "", value: "" }));
  }, [o]), G(() => {
    !_ || !t || i && (Object.keys(m).length === 0 ? i(t, null) : i(t, m));
  }, [m, _, t]);
  const W = M(
    (P, B) => {
      u(t), x((K) => P in K ? K : { ...K, [P]: B });
    },
    [t]
  ), Q = M(
    (P, B) => {
      u(t), x((K) => ({ ...K, [P]: B })), w((K) => {
        if (!(P in K)) return K;
        const j = { ...K };
        return delete j[P], j;
      });
    },
    [t]
  ), ee = M((P) => {
    x((B) => {
      if (!(P in B)) return B;
      const K = { ...B };
      return delete K[P], K;
    }), w((B) => {
      if (!(P in B)) return B;
      const K = { ...B };
      return delete K[P], K;
    });
  }, []), de = M((P, B) => {
    w((K) => ({ ...K, [P]: B }));
  }, []), O = M(() => {
    x({}), u(null), w({}), C({ key: "", value: "" });
  }, []), U = M(() => {
    const P = N.key.trim();
    if (!P) return;
    let B = N.value;
    const K = N.value;
    if (K.trim().length > 0)
      try {
        B = JSON.parse(K);
      } catch {
        B = K;
      }
    Q(P, B), C({ key: "", value: "" });
  }, [N, Q]);
  return !e || y.length === 0 ? /* @__PURE__ */ l("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
    /* @__PURE__ */ n("div", { className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0", children: /* @__PURE__ */ n("span", { className: "text-xs font-bold text-text-primary tracking-wide uppercase", children: "Context Inspector" }) }),
    /* @__PURE__ */ l("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs flex items-center justify-center flex-col gap-2", children: [
      /* @__PURE__ */ n("span", { className: "text-[13px] text-[#6c7086]", children: e ? "Waiting for step execution data..." : "Run a pipeline to inspect context flow" }),
      /* @__PURE__ */ n("span", { className: "text-[11px] text-[#45475a]", children: e ? "Context data will appear as steps complete." : "Trigger a run to see inputs, outputs, and context at each step." })
    ] })
  ] }) : /* @__PURE__ */ l("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
    /* @__PURE__ */ l("div", { className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0", children: [
      /* @__PURE__ */ n("span", { className: "text-xs font-bold text-text-primary tracking-wide uppercase", children: "Context Inspector" }),
      k && k.stepId && /* @__PURE__ */ l("span", { className: "text-[10px] text-[#6c7086]", children: [
        "Step: ",
        k.stepId.slice(0, 8)
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: "flex gap-0 border-b border-border shrink-0", children: [
      { id: "input", label: "Input Context", show: !0 },
      { id: "output", label: "Output", show: !0 },
      { id: "prompt", label: "Resolved Prompt", show: T },
      { id: "details", label: "Details", show: !0 },
      { id: "attempts", label: `Attempts (${I?.length})`, show: S }
    ].filter((P) => P.show).map((P) => /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        "data-testid": P.id === "attempts" ? "attempts-tab" : void 0,
        className: $(
          "px-3.5 py-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer font-inherit uppercase tracking-wide border-b-2",
          d === P.id ? "text-primary border-b-primary" : "text-text-tertiary border-b-transparent"
        ),
        onClick: () => c(P.id),
        children: P.label
      },
      P.id
    )) }),
    /* @__PURE__ */ l("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
      /* @__PURE__ */ n(
        bi,
        {
          snapshots: y,
          activeStepId: t,
          fallbackActiveStepId: k?.stepId,
          onStepSelect: r
        }
      ),
      /* @__PURE__ */ n("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs", children: k ? d === "input" ? /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ l("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ l("div", { className: "text-[10px] text-[#6c7086] font-semibold uppercase", children: [
            "Input context",
            k.stepId ? ` — step ${k.stepId.slice(0, 8)}` : ""
          ] }),
          _ && /* @__PURE__ */ l("div", { className: "flex gap-1.5 items-center", children: [
            f && Object.keys(m).length > 0 && /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                onClick: O,
                "data-testid": "context-inspector-discard",
                className: "px-2 py-0.5 text-[10px] font-semibold bg-transparent text-[#f38ba8] border border-[#313244] rounded-sm cursor-pointer font-mono",
                children: "Discard changes"
              }
            ),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                onClick: () => {
                  const P = !f;
                  h(P), P || O();
                },
                "data-testid": "context-inspector-edit-toggle",
                className: $(
                  "px-2 py-0.5 text-[10px] font-semibold border rounded-sm cursor-pointer font-mono uppercase tracking-wide",
                  f ? "bg-[#d97706] text-white border-[#d97706]" : "bg-transparent text-[#d97706] border-[#d97706]"
                ),
                children: f ? "Editing" : "Edit"
              }
            )
          ] })
        ] }),
        Object.keys(k.inputContext).length === 0 && !(_ && f) ? /* @__PURE__ */ n("div", { className: "text-[#6c7086] text-xs italic", children: "No input context (first step or no upstream output)" }) : _ && f ? /* @__PURE__ */ n(
          wi,
          {
            inputContext: k.inputContext,
            buffer: m,
            parseErrors: v,
            newKeyDraft: N,
            setNewKeyDraft: C,
            onCommitNewKey: U,
            onBeginEditKey: W,
            onSetValue: Q,
            onRemoveKey: ee,
            onParseError: de
          }
        ) : /* @__PURE__ */ n(
          yt,
          {
            data: k.inputContext,
            highlightKeys: b
          }
        )
      ] }) : d === "output" ? /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ l("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: [
          "Output",
          k.stepId ? ` — step ${k.stepId.slice(0, 8)}` : ""
        ] }),
        /* @__PURE__ */ n(yt, { data: k.output }),
        k.newKeys.length > 0 && /* @__PURE__ */ l("div", { className: "mt-3", children: [
          /* @__PURE__ */ n("div", { className: "text-[10px] text-[#a6e3a1] font-semibold uppercase mb-1", children: "New context keys added" }),
          /* @__PURE__ */ n("div", { className: "flex flex-wrap gap-1", children: k.newKeys.map((P) => /* @__PURE__ */ n(
            "span",
            {
              className: "px-1.5 py-0.5 bg-[rgba(166,227,161,0.15)] text-[#a6e3a1] rounded-sm text-[11px] font-semibold font-mono",
              children: P
            },
            P
          )) })
        ] })
      ] }) : d === "prompt" ? /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: "Resolved prompt template" }),
        /* @__PURE__ */ n("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: k.resolvedPrompt })
      ] }) : d === "details" ? /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: "Step execution details" }),
        /* @__PURE__ */ l("div", { className: "flex flex-col gap-3", children: [
          k.stepExecution.startedAt && /* @__PURE__ */ l("div", { children: [
            /* @__PURE__ */ n("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Duration" }),
            /* @__PURE__ */ l("div", { className: "text-[11px] text-[#cdd6f4]", children: [
              "Started: ",
              k.stepExecution.startedAt,
              k.stepExecution.completedAt && /* @__PURE__ */ l(ne, { children: [
                /* @__PURE__ */ n("br", {}),
                "Completed: ",
                k.stepExecution.completedAt,
                k.stepExecution.durationMs != null && /* @__PURE__ */ l(ne, { children: [
                  /* @__PURE__ */ n("br", {}),
                  "Duration: ",
                  k.stepExecution.durationMs,
                  "ms"
                ] })
              ] })
            ] })
          ] }),
          k.stepExecution.llm && /* @__PURE__ */ l("div", { children: [
            /* @__PURE__ */ n("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "LLM Metrics" }),
            /* @__PURE__ */ l("div", { className: "text-[11px] text-[#cdd6f4]", children: [
              "Tokens in: ",
              k.stepExecution.llm.tokensIn,
              /* @__PURE__ */ n("br", {}),
              "Tokens out: ",
              k.stepExecution.llm.tokensOut,
              k.stepExecution.llm.firstTokenLatencyMs != null && /* @__PURE__ */ l(ne, { children: [
                /* @__PURE__ */ n("br", {}),
                "First token latency: ",
                k.stepExecution.llm.firstTokenLatencyMs,
                "ms"
              ] })
            ] }),
            k.stepExecution.llm.response && /* @__PURE__ */ l(ne, { children: [
              /* @__PURE__ */ n("div", { className: "text-[11px] text-[#89b4fa] font-semibold mt-2 mb-1", children: "Response Text" }),
              /* @__PURE__ */ n("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: k.stepExecution.llm.response })
            ] })
          ] }),
          k.stepExecution.error && /* @__PURE__ */ l("div", { children: [
            /* @__PURE__ */ n("div", { className: "text-[11px] text-[#f38ba8] font-semibold mb-1", children: "Error" }),
            /* @__PURE__ */ n("div", { className: "px-3 py-2.5 bg-[#1a0f14] border border-[#f38ba8] rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: /* @__PURE__ */ n("div", { className: "text-[#f38ba8] font-semibold mb-1", children: k.stepExecution.error }) })
          ] }),
          k.stepExecution.approvals && k.stepExecution.approvals.length > 0 && /* @__PURE__ */ l("div", { children: [
            /* @__PURE__ */ l("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: [
              "Approvals (",
              k.stepExecution.approvals.length,
              ")"
            ] }),
            k.stepExecution.approvals.map((P, B) => /* @__PURE__ */ l("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2", children: [
              /* @__PURE__ */ l("div", { className: "flex gap-2 mb-1", children: [
                /* @__PURE__ */ n("span", { className: $(
                  "px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                  P.decision === "approve" ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
                ), children: P.decision.toUpperCase() }),
                /* @__PURE__ */ n("span", { className: "text-[11px] text-[#cdd6f4]", children: P.userId })
              ] }),
              P.comment && /* @__PURE__ */ l("div", { className: "text-[11px] text-[#9399b2] italic", children: [
                '"',
                P.comment,
                '"'
              ] }),
              /* @__PURE__ */ n("div", { className: "text-[10px] text-[#6c7086] mt-1", children: P.at })
            ] }, B))
          ] }),
          /* @__PURE__ */ l("div", { children: [
            /* @__PURE__ */ n("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Status" }),
            /* @__PURE__ */ n("div", { className: "text-[11px] text-[#cdd6f4]", children: k.stepExecution.status })
          ] })
        ] })
      ] }) : d === "attempts" && I && I.length >= 2 ? /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ l("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              "data-testid": "attempts-prev",
              disabled: a === 0,
              onClick: () => p((P) => P - 1),
              className: $(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                a === 0 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "←"
            }
          ),
          /* @__PURE__ */ l(
            "span",
            {
              "data-testid": "attempts-label",
              className: "text-[11px] text-[#9399b2] flex-1 text-center",
              children: [
                "Attempt ",
                a + 1,
                " vs ",
                a + 2,
                " of ",
                I.length
              ]
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              "data-testid": "attempts-next",
              disabled: a >= I.length - 2,
              onClick: () => p((P) => P + 1),
              className: $(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                a >= I.length - 2 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "→"
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { className: "grid grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ n(kn, { attempt: I[a], label: `Attempt ${a + 1}` }),
          /* @__PURE__ */ n(kn, { attempt: I[a + 1], label: `Attempt ${a + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ n("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function Ti({
  definition: e,
  pausedBreakpoint: t,
  applyingPatch: r,
  revertingPatchId: s,
  dirtyPatch: i,
  dirtyPatchStepId: o,
  resetEditBufferKey: d,
  onContinue: c,
  onStepOver: a,
  onResumeAll: p,
  onApplyAndContinue: f,
  onRevertPatch: h,
  onEditBufferChange: m
}) {
  const g = nt().runs[t.runId] ?? null, v = g?.steps?.[t.stepId]?.patches ?? [], w = !!i && o === t.stepId && Object.keys(i).length > 0, N = g?.status === "paused_at_breakpoint";
  return /* @__PURE__ */ l(
    "div",
    {
      "data-testid": "breakpoint-pause-overlay",
      className: $(
        "absolute top-14 left-1/2 -translate-x-1/2 z-30",
        "bg-surface border-2 border-amber-600 rounded-lg",
        "px-4 py-3 shadow-[0_8px_24px_rgba(217,119,6,0.2)]",
        "flex flex-col gap-3 font-inherit",
        "w-[min(900px,92vw)] max-h-[calc(100vh-120px)]"
      ),
      children: [
        /* @__PURE__ */ l("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ l("span", { className: "text-[13px] font-semibold text-amber-600", children: [
            "Paused at: ",
            gt(e, t.stepId)
          ] }),
          w && /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: f,
              disabled: r,
              "data-testid": "breakpoint-apply-continue-btn",
              className: $(
                "px-3 py-1 text-xs font-semibold bg-green-300 text-gray-900",
                "border-none rounded cursor-pointer font-inherit",
                r && "cursor-wait opacity-70"
              ),
              children: r ? "Applying…" : "Apply & Continue"
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: c,
              disabled: r,
              className: $(
                "px-3 py-1 text-xs font-semibold bg-amber-600 text-white",
                "border-none rounded font-inherit",
                r ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              ),
              "data-testid": "breakpoint-continue-btn",
              children: "Continue"
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: a,
              disabled: r,
              className: $(
                "px-3 py-1 text-xs font-semibold bg-transparent text-amber-600",
                "border border-amber-600 rounded font-inherit",
                r ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              ),
              "data-testid": "breakpoint-step-over-btn",
              children: "Step Over"
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: p,
              disabled: r,
              className: $(
                "px-3 py-1 text-xs font-semibold bg-transparent text-amber-600",
                "border border-amber-600 rounded font-inherit",
                r ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              ),
              "data-testid": "breakpoint-resume-all-btn",
              children: "Resume All"
            }
          )
        ] }),
        /* @__PURE__ */ l(
          "div",
          {
            className: "grid [grid-template-columns:minmax(0,1fr)_240px] gap-3 min-h-[280px] max-h-[calc(100vh-220px)]",
            children: [
              /* @__PURE__ */ n("div", { className: "border border-border rounded-md bg-surface-inset overflow-hidden min-h-0", children: g ? /* @__PURE__ */ n(
                Si,
                {
                  run: g,
                  activeStepId: t.stepId,
                  editable: !0,
                  onEditBufferChange: m,
                  resetEditBufferKey: d
                }
              ) : /* @__PURE__ */ n("div", { className: "p-3 text-xs text-text-tertiary", children: "Loading run…" }) }),
              /* @__PURE__ */ l(
                "div",
                {
                  "data-testid": "breakpoint-patch-history",
                  className: "border border-border rounded-md bg-surface-inset p-2.5 overflow-auto min-h-0",
                  children: [
                    /* @__PURE__ */ l("div", { className: "text-[10px] font-bold text-text-primary tracking-wide uppercase mb-2", children: [
                      "Patch history (",
                      v.length,
                      ")"
                    ] }),
                    v.length === 0 ? /* @__PURE__ */ n(
                      "div",
                      {
                        className: "text-[11px] text-text-tertiary italic",
                        "data-testid": "breakpoint-patch-history-empty",
                        children: "No patches applied yet."
                      }
                    ) : /* @__PURE__ */ n("div", { className: "flex flex-col gap-2", children: v.map((C) => {
                      const y = !!C.revertedAt;
                      return /* @__PURE__ */ l(
                        "div",
                        {
                          "data-testid": `breakpoint-patch-row-${C.patchId}`,
                          className: $(
                            "border border-border rounded p-1.5",
                            y ? "bg-gray-500/10 opacity-60" : "bg-[#11111b]"
                          ),
                          children: [
                            /* @__PURE__ */ l("div", { className: "flex items-center gap-1 text-[10px] text-[#cdd6f4] mb-0.5", children: [
                              /* @__PURE__ */ n("span", { className: "font-mono", children: C.patchId.slice(0, 8) }),
                              C.unvalidated && /* @__PURE__ */ n(
                                "span",
                                {
                                  "data-testid": `breakpoint-patch-unvalidated-${C.patchId}`,
                                  title: "No validator was registered for this step's node type",
                                  className: "px-1 text-[9px] font-bold bg-orange-300/15 text-orange-300 rounded-sm",
                                  children: "⚠ Unvalidated"
                                }
                              ),
                              y && /* @__PURE__ */ n("span", { className: "px-1 text-[9px] font-bold bg-gray-500/20 text-gray-400 rounded-sm", children: "Reverted" })
                            ] }),
                            /* @__PURE__ */ l("div", { className: "text-[10px] text-[#9399b2]", children: [
                              C.appliedAt,
                              C.appliedBy && /* @__PURE__ */ l(ne, { children: [
                                " · ",
                                /* @__PURE__ */ n("span", { className: "text-[#cdd6f4]", children: C.appliedBy })
                              ] })
                            ] }),
                            !y && /* @__PURE__ */ n(
                              "button",
                              {
                                type: "button",
                                "data-testid": `breakpoint-patch-revert-${C.patchId}`,
                                onClick: () => h(C.patchId),
                                disabled: !N || s === C.patchId,
                                title: N ? "Revert this patch" : "Run has progressed past this breakpoint — revert no longer allowed",
                                className: $(
                                  "mt-1 px-2 py-0.5 text-[10px] font-semibold bg-transparent rounded-sm font-inherit",
                                  N ? "text-red-400 border border-red-400 cursor-pointer" : "text-gray-700 border border-gray-700 cursor-not-allowed",
                                  s === C.patchId && "cursor-not-allowed"
                                ),
                                children: s === C.patchId ? "Reverting…" : "Revert"
                              }
                            )
                          ]
                        },
                        C.patchId
                      );
                    }) })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function fe({ label: e, required: t, help: r, error: s, children: i, className: o }) {
  return /* @__PURE__ */ l("div", { className: $("flex flex-col", o), children: [
    /* @__PURE__ */ l("label", { className: "text-xs font-semibold text-text-secondary", children: [
      e,
      t && /* @__PURE__ */ n("span", { className: "text-[#dc2626] ml-1", children: "●" })
    ] }),
    /* @__PURE__ */ n("div", { className: "mt-1", children: i }),
    s && /* @__PURE__ */ n("div", { className: "text-[11px] text-[#dc2626] mt-0.5", children: s }),
    !s && r && /* @__PURE__ */ n("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: r })
  ] });
}
function Ai({ title: e, defaultCollapsed: t = !1, children: r, className: s }) {
  const [i, o] = R(t);
  return /* @__PURE__ */ l("div", { className: $("flex flex-col", s), children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: () => o((d) => !d),
        className: "flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer font-inherit text-xs font-semibold text-text-secondary",
        children: [
          /* @__PURE__ */ n("span", { children: i ? "▸" : "▾" }),
          " ",
          e
        ]
      }
    ),
    !i && /* @__PURE__ */ n("div", { className: "flex flex-col gap-3 mt-2", children: r })
  ] });
}
function Xe({ children: e, className: t }) {
  return /* @__PURE__ */ n("div", { className: $("flex flex-col gap-3 px-4 py-3", t), children: e });
}
const Di = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function Ri(e, t, r) {
  const s = e.trim();
  if (s === "") return null;
  const i = /^\*\/(\d+)$/.exec(s);
  if (i) {
    const c = Number(i[1]);
    return !Number.isFinite(c) || c <= 0 ? null : { match: "*", step: c };
  }
  if (s === "*") return { match: "*" };
  const o = /^(\d+)-(\d+)$/.exec(s);
  if (o) {
    const c = Number(o[1]), a = Number(o[2]);
    if (!Number.isFinite(c) || !Number.isFinite(a) || c < t || a > r || c > a) return null;
    const p = [];
    for (let f = c; f <= a; f++) p.push(f);
    return { match: p };
  }
  if (s.includes(",")) {
    const c = s.split(","), a = /* @__PURE__ */ new Set(), p = [];
    for (const f of c) {
      const h = Number(f.trim());
      if (!Number.isFinite(h) || !Number.isInteger(h) || h < t || h > r) return null;
      a.has(h) || (a.add(h), p.push(h));
    }
    return p.length === 0 ? null : { match: p };
  }
  const d = Number(s);
  return !Number.isFinite(d) || !Number.isInteger(d) || d < t || d > r ? null : { match: [d] };
}
function $i(e) {
  if (typeof e != "string") return null;
  const t = e.trim().split(/\s+/);
  if (t.length !== 5) return null;
  const r = {};
  for (let s = 0; s < 5; s++) {
    const i = Di[s], o = Ri(t[s], i.min, i.max);
    if (!o) return null;
    r[i.name] = o;
  }
  return r;
}
function ut(e, t, r) {
  return e.match === "*" ? !e.step || e.step === 1 ? !0 : (t - r) % e.step === 0 : e.match.includes(t);
}
function Pi(e, t) {
  return ut(e.minute, t.getMinutes(), 0) && ut(e.hour, t.getHours(), 0) && ut(e.dayOfMonth, t.getDate(), 1) && ut(e.month, t.getMonth() + 1, 1) && ut(e.dayOfWeek, t.getDay(), 0);
}
function Mi(e, t, r) {
  const s = [], i = new Date(t.getTime());
  i.setSeconds(0, 0), i.setMinutes(i.getMinutes() + 1);
  const o = 1440 * 366, d = new Date(i.getTime());
  for (let c = 0; c < o && s.length < r; c++)
    Pi(e, d) && s.push(new Date(d.getTime())), d.setMinutes(d.getMinutes() + 1);
  return s;
}
const Cn = /^[a-zA-Z0-9_-]{1,64}$/, Ei = "http://localhost:13001";
function Oi() {
  try {
    const e = localStorage.getItem("ws_document_types_v1");
    if (!e) return [];
    const t = JSON.parse(e);
    return Array.isArray(t) ? t.filter((r) => typeof r == "object" && r !== null).filter((r) => typeof r.id == "string" && typeof r.name == "string").map((r) => ({ id: r.id, name: r.name })) : [];
  } catch {
    return [];
  }
}
const Ui = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function _i({ data: e, onChange: t }) {
  const { toast: r } = Pt(), i = it(Et)?.definition?.triggerBinding?.webhookSecret, [o, d] = R(!1), c = e.triggerType.startsWith("document."), a = F(() => c ? Oi() : [], [c]), p = c && !e.documentTypeId, f = e.triggerType === "schedule" && !e.schedule, h = e.triggerType === "webhook" && !e.webhookPath, m = e.webhookPath ?? "", x = e.triggerType === "webhook" && m.length > 0 && !Cn.test(m), g = e.triggerType === "webhook" && Cn.test(m) ? `${Ei}/hooks/pipeline/${m}` : null, u = () => {
    g && navigator.clipboard.writeText(g).then(() => r("Webhook URL copied", { type: "success" })).catch(() => r("Could not copy webhook URL", { type: "error" }));
  }, v = () => {
    i && navigator.clipboard.writeText(i).then(() => r("Webhook secret copied", { type: "success" })).catch(() => r("Could not copy webhook secret", { type: "error" }));
  }, w = e.triggerType === "schedule" ? e.schedule ?? "" : "", N = F(
    () => w ? $i(w) : null,
    [w]
  ), C = F(() => N ? Mi(N, /* @__PURE__ */ new Date(), 3) : [], [N]), y = e.triggerType === "schedule" && !!w && !N, k = e.triggerType === "document.finalize" ? "On finalize" : e.triggerType === "document.submit" ? "On submit for review" : e.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ l(Xe, { children: [
    /* @__PURE__ */ n(fe, { label: "Trigger type", required: !0, children: /* @__PURE__ */ n(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.triggerType,
        onChange: (b) => t({ triggerType: b.target.value }),
        children: Ui.map((b) => /* @__PURE__ */ n("option", { value: b.value, children: b.label }, b.value))
      }
    ) }),
    c && /* @__PURE__ */ l(
      fe,
      {
        label: "Document type",
        required: !0,
        error: p ? "Select a document type." : void 0,
        help: p ? void 0 : "Which document type should trigger this pipeline.",
        children: [
          /* @__PURE__ */ l(
            "select",
            {
              className: $(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
                p ? "border-[#dc2626]" : "border-border-field"
              ),
              value: e.documentTypeId ?? "",
              onChange: (b) => t({ documentTypeId: b.target.value || void 0 }),
              children: [
                /* @__PURE__ */ n("option", { value: "", children: "— select a document type —" }),
                a.map((b) => /* @__PURE__ */ n("option", { value: b.id, children: b.name }, b.id))
              ]
            }
          ),
          k && /* @__PURE__ */ l("div", { className: "text-[11px] text-text-tertiary mt-1.5", children: [
            "Event: ",
            /* @__PURE__ */ n("span", { className: "font-semibold text-text-secondary", children: k })
          ] })
        ]
      }
    ),
    e.triggerType === "schedule" && /* @__PURE__ */ l(
      fe,
      {
        label: "Schedule (cron)",
        required: !0,
        error: f ? "Cron expression is required." : y ? "Invalid cron expression — supports *, */N, N,M, A-B, exact values." : void 0,
        help: !f && !y ? "5-field cron: minute hour day month weekday." : void 0,
        children: [
          /* @__PURE__ */ n(
            "input",
            {
              type: "text",
              className: $(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                f || y ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "*/15 * * * *",
              value: e.schedule ?? "",
              onChange: (b) => t({ schedule: b.target.value })
            }
          ),
          /* @__PURE__ */ n("div", { className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono", children: C.length > 0 ? /* @__PURE__ */ l(ne, { children: [
            /* @__PURE__ */ n("div", { className: "text-text-secondary mb-1", children: "Next 3 fires:" }),
            C.map((b, T) => /* @__PURE__ */ n("div", { children: b.toLocaleString() }, T))
          ] }) : /* @__PURE__ */ n("span", { children: "Next fires: enter a valid cron expression to preview." }) })
        ]
      }
    ),
    e.triggerType === "webhook" && /* @__PURE__ */ l("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ n(
        fe,
        {
          label: "Path",
          required: !0,
          error: h ? "Webhook path is required." : x ? "Path must be alphanumeric (plus _, -)" : void 0,
          help: !h && !x ? "Alphanumeric, _, or - (max 64 chars). No leading slash." : void 0,
          children: /* @__PURE__ */ n(
            "input",
            {
              type: "text",
              className: $(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                h || x ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "weekly-digest",
              value: m,
              onChange: (b) => t({ webhookPath: b.target.value })
            }
          )
        }
      ),
      /* @__PURE__ */ n("div", { className: "p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: g ? /* @__PURE__ */ l(ne, { children: [
        /* @__PURE__ */ l("span", { className: "flex-1", children: [
          /* @__PURE__ */ n("span", { className: "font-sans text-text-tertiary mr-1", children: "Full URL:" }),
          g
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: u,
            className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
            children: "Copy"
          }
        )
      ] }) : /* @__PURE__ */ n("span", { className: "font-sans text-text-tertiary", children: "Set a path above to see the URL" }) }),
      /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("label", { className: "text-xs font-semibold text-text-secondary", children: "Signing secret" }),
        /* @__PURE__ */ n("div", { className: "mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: i ? /* @__PURE__ */ l(ne, { children: [
          /* @__PURE__ */ n("span", { className: "flex-1", "aria-label": "webhook secret", children: o ? i : "•".repeat(32) }),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: () => d((b) => !b),
              className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
              children: o ? "Hide" : "Reveal"
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: v,
              className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
              children: "Copy"
            }
          )
        ] }) : /* @__PURE__ */ l("span", { className: "font-sans text-text-tertiary", children: [
          "Save the pipeline to mint a signing secret. External callers must send ",
          /* @__PURE__ */ n("code", { children: "X-Pipeline-Signature-256: sha256=<hmac>" }),
          "."
        ] }) }),
        /* @__PURE__ */ l("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: [
          "HMAC-SHA256 of the raw request body. Send as",
          " ",
          /* @__PURE__ */ n("code", { children: "X-Pipeline-Signature-256: sha256=<hex>" }),
          "."
        ] })
      ] })
    ] })
  ] });
}
const In = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, Li = 3e4;
function Bi(e) {
  return e < 1e3 ? `${Math.round(e)}ms` : e < 6e4 ? `${(e / 1e3).toFixed(e < 1e4 ? 1 : 0)}s` : `${Math.round(e / 6e4)}m`;
}
function Fi(e) {
  const t = [];
  for (let r = 1; r < e.maxAttempts; r++) {
    const s = e.backoffMs * Math.pow(e.backoffMultiplier, r - 1);
    t.push(Math.min(s, Li));
  }
  return t;
}
function sn({ value: e, onChange: t }) {
  const r = e !== void 0, s = e ?? In, i = r ? Fi(s) : [], d = i.reduce((c, a) => c + a, 0) > 300 * 1e3;
  return /* @__PURE__ */ l("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ l("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
      /* @__PURE__ */ n(
        "input",
        {
          type: "checkbox",
          checked: r,
          onChange: (c) => t(c.target.checked ? In : void 0),
          "aria-label": "Enable retries"
        }
      ),
      "Retry policy"
    ] }),
    !r && /* @__PURE__ */ n("div", { className: "text-[11px] text-text-tertiary mt-1", children: "No retries — failure is terminal on first attempt." }),
    r && /* @__PURE__ */ l(ne, { children: [
      /* @__PURE__ */ l("div", { className: "grid grid-cols-3 gap-2 mt-1", children: [
        /* @__PURE__ */ l("div", { children: [
          /* @__PURE__ */ n("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Max attempts" }),
          /* @__PURE__ */ n(
            "input",
            {
              type: "number",
              min: 1,
              max: 10,
              step: 1,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full mt-0.5 font-inherit",
              value: s.maxAttempts,
              onChange: (c) => {
                const a = Math.max(1, Math.min(10, parseInt(c.target.value, 10) || 1));
                t({ ...s, maxAttempts: a });
              },
              "aria-label": "Max attempts"
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { children: [
          /* @__PURE__ */ n("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Initial backoff (ms)" }),
          /* @__PURE__ */ n(
            "input",
            {
              type: "number",
              min: 0,
              step: 100,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full mt-0.5 font-inherit",
              value: s.backoffMs,
              onChange: (c) => {
                const a = Math.max(0, parseInt(c.target.value, 10) || 0);
                t({ ...s, backoffMs: a });
              },
              "aria-label": "Initial backoff in milliseconds"
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { children: [
          /* @__PURE__ */ n("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Backoff multiplier" }),
          /* @__PURE__ */ n(
            "input",
            {
              type: "number",
              min: 1,
              max: 4,
              step: 0.5,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full mt-0.5 font-inherit",
              value: s.backoffMultiplier,
              onChange: (c) => {
                const a = Math.max(1, Math.min(4, parseFloat(c.target.value) || 1));
                t({ ...s, backoffMultiplier: a });
              },
              "aria-label": "Backoff multiplier"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ n("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: s.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : i.length === 0 ? `Retries up to ${s.maxAttempts}× with no delay.` : `Retries up to ${s.maxAttempts}× with delays: ${i.map(Bi).join(", ")}.` }),
      d && /* @__PURE__ */ n("div", { className: "text-[11px] text-[#ca8a04] mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const Sn = {
  anthropic: [
    "claude-opus-4-7",
    "claude-sonnet-4-6",
    "claude-haiku-4-5-20251001"
  ],
  bedrock: [
    "claude-opus-4-7",
    "claude-sonnet-4-6",
    "claude-haiku-4-5-20251001"
  ],
  // CLI aliases — `claude --model sonnet` resolves to the latest of each tier
  // server-side, so we don't have to chase model-ID bumps in the frontend.
  "claude-code": [
    "opus",
    "sonnet",
    "haiku"
  ]
}, ji = [
  "context.doc.body",
  "context.doc.title",
  "context.trigger.userId",
  "context.steps"
], mr = {
  "context.doc.body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "context.doc.title": "Sample Document Title",
  "context.trigger.userId": "user_abc123",
  "context.steps": '["step-1: fetched document", "step-2: validated schema"]'
};
function Tn(e) {
  return e.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (t, r) => mr[r] ?? `{{${r}}}`);
}
function qi({ data: e, onChange: t }) {
  const [r, s] = R(!1), i = !e.systemPrompt?.trim(), o = !e.userPromptTemplate?.trim(), d = (c) => {
    const a = Sn[c], p = a.includes(e.model) ? e.model : a[0];
    t({ provider: c, model: p });
  };
  return /* @__PURE__ */ l(Xe, { children: [
    /* @__PURE__ */ n(fe, { label: "Provider", required: !0, children: /* @__PURE__ */ l(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.provider,
        onChange: (c) => d(c.target.value),
        children: [
          /* @__PURE__ */ n("option", { value: "anthropic", children: "Anthropic" }),
          /* @__PURE__ */ n("option", { value: "bedrock", children: "Bedrock" }),
          /* @__PURE__ */ n("option", { value: "claude-code", children: "Claude Code (subprocess)" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(fe, { label: "Model", required: !0, children: /* @__PURE__ */ n(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.model,
        onChange: (c) => t({ model: c.target.value }),
        children: Sn[e.provider].map((c) => /* @__PURE__ */ n("option", { value: c, children: c }, c))
      }
    ) }),
    /* @__PURE__ */ n(
      fe,
      {
        label: "System prompt",
        required: !0,
        error: i ? "System prompt is required." : void 0,
        help: i ? void 0 : "Sets the model's role and constraints.",
        children: /* @__PURE__ */ n(
          "textarea",
          {
            className: $(
              "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]",
              i ? "border-[#dc2626]" : "border-border-field"
            ),
            value: e.systemPrompt,
            onChange: (c) => t({ systemPrompt: c.target.value })
          }
        )
      }
    ),
    /* @__PURE__ */ n(
      fe,
      {
        label: "User prompt template",
        required: !0,
        error: o ? "User prompt template is required." : void 0,
        help: o ? void 0 : "Supports {{ context.* }} substitution — click a pill above to insert.",
        children: /* @__PURE__ */ n(
          Zt,
          {
            value: e.userPromptTemplate,
            onChange: (c) => t({ userPromptTemplate: c }),
            language: "template",
            variables: ji,
            minLines: 6,
            "aria-label": "User prompt template"
          }
        )
      }
    ),
    /* @__PURE__ */ l(Ai, { title: "Advanced", defaultCollapsed: !0, children: [
      /* @__PURE__ */ l(
        fe,
        {
          label: "Temperature",
          help: "0 = deterministic, 1 = creative.",
          children: [
            /* @__PURE__ */ n("span", { className: "text-text-tertiary text-xs ml-2", children: (e.temperature ?? 0.7).toFixed(1) }),
            /* @__PURE__ */ n(
              "input",
              {
                type: "range",
                min: 0,
                max: 1,
                step: 0.1,
                value: e.temperature ?? 0.7,
                onChange: (c) => t({ temperature: parseFloat(c.target.value) }),
                className: "w-full mt-1"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ n(fe, { label: "Max tokens", help: "Upper bound on response length.", children: /* @__PURE__ */ n(
        "input",
        {
          type: "number",
          min: 1,
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
          value: e.maxTokens ?? "",
          onChange: (c) => {
            const a = c.target.value;
            t({ maxTokens: a === "" ? void 0 : Math.max(1, parseInt(a, 10) || 0) });
          }
        }
      ) }),
      /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ l("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
          /* @__PURE__ */ n(
            "input",
            {
              type: "checkbox",
              checked: e.streaming,
              onChange: (c) => t({ streaming: c.target.checked })
            }
          ),
          "Streaming"
        ] }),
        /* @__PURE__ */ n("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Stream tokens as they are generated." })
      ] }),
      /* @__PURE__ */ n(
        sn,
        {
          value: e.retryPolicy,
          onChange: (c) => t({ retryPolicy: c })
        }
      )
    ] }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: () => s((c) => !c),
        className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit shrink-0",
        children: [
          r ? "▾" : "▶",
          " Preview with sample context"
        ]
      }
    ),
    r && /* @__PURE__ */ l("div", { className: "bg-surface-inset border border-border rounded-lg p-3 flex flex-col gap-2.5", children: [
      /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved system prompt" }),
        /* @__PURE__ */ n("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: Tn(e.systemPrompt || "(empty)") })
      ] }),
      /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ n("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: Tn(e.userPromptTemplate || "(empty)") })
      ] }),
      /* @__PURE__ */ l("div", { className: "text-[11px] text-text-tertiary", children: [
        "Sample values: ",
        Object.keys(mr).map((c) => `{{${c}}}`).join(", ")
      ] })
    ] })
  ] });
}
const Hi = ["context", "context.steps", "context.trigger"], zi = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function Ki({ data: e, onChange: t }) {
  const r = !e.expression?.trim();
  return /* @__PURE__ */ l(Xe, { children: [
    /* @__PURE__ */ n(fe, { label: "Type", required: !0, children: /* @__PURE__ */ n("div", { className: "flex flex-col gap-1.5", children: zi.map((s) => /* @__PURE__ */ l(
      "label",
      {
        className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
        children: [
          /* @__PURE__ */ n(
            "input",
            {
              type: "radio",
              name: "transform-type",
              value: s.value,
              checked: e.transformType === s.value,
              onChange: () => t({ transformType: s.value })
            }
          ),
          s.label
        ]
      },
      s.value
    )) }) }),
    /* @__PURE__ */ n(
      fe,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : e.transformType === "jsonpath" ? 'e.g. $.items[?(@.status == "active")]' : e.transformType === "template" ? "Mustache-style: {{ context.doc.title }}" : e.transformType === "javascript" ? "return ctx.items.filter(x => x.active)" : void 0,
        children: /* @__PURE__ */ n(
          Zt,
          {
            value: e.expression,
            onChange: (s) => t({ expression: s }),
            language: e.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: Hi,
            "aria-label": "Transform expression"
          }
        )
      }
    ),
    /* @__PURE__ */ n(
      fe,
      {
        label: "Output key (optional)",
        help: `If set, writes to context.${e.outputKey || "outputKey"}. Otherwise merges into root context.`,
        children: /* @__PURE__ */ n(
          "input",
          {
            type: "text",
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
            value: e.outputKey ?? "",
            onChange: (s) => t({ outputKey: s.target.value || void 0 }),
            placeholder: "activeItems"
          }
        )
      }
    ),
    /* @__PURE__ */ n(
      sn,
      {
        value: e.retryPolicy,
        onChange: (s) => t({ retryPolicy: s })
      }
    ),
    /* @__PURE__ */ n(fe, { label: "Preview", children: /* @__PURE__ */ l("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("div", { className: "text-[11px] text-text-tertiary mb-1", children: "Sample input" }),
        /* @__PURE__ */ n(
          "textarea",
          {
            disabled: !0,
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[11px] bg-surface-inset text-text-tertiary outline-none w-full font-mono resize-y min-h-[80px]",
            placeholder: '{ "items": [...] }'
          }
        )
      ] }),
      /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ n("div", { className: "text-[11px] text-text-tertiary mb-1", children: "Sample output" }),
        /* @__PURE__ */ n(
          "textarea",
          {
            disabled: !0,
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[11px] bg-surface-inset text-text-tertiary outline-none w-full font-mono resize-y min-h-[80px]",
            placeholder: "(preview not yet available)"
          }
        )
      ] })
    ] }) })
  ] });
}
const Wi = ["context.trigger", "context.steps"];
function Vi({ data: e, onChange: t }) {
  const r = !e.expression?.trim();
  return /* @__PURE__ */ l(Xe, { children: [
    /* @__PURE__ */ n(
      fe,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : "e.g. context.llm.response.length > 500",
        children: /* @__PURE__ */ n(
          Zt,
          {
            value: e.expression,
            onChange: (s) => t({ expression: s }),
            language: "javascript",
            variables: Wi,
            "aria-label": "Condition expression"
          }
        )
      }
    ),
    /* @__PURE__ */ n(fe, { label: "Label (optional — shown on node face)", help: "A short name so this branch is easy to spot.", children: /* @__PURE__ */ n(
      "input",
      {
        type: "text",
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.label ?? "",
        onChange: (s) => t({ label: s.target.value || void 0 }),
        placeholder: "Long summary?"
      }
    ) }),
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        onClick: () => {
        },
        className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit shrink-0",
        children: "▶ Preview with sample context"
      }
    )
  ] });
}
const Ji = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], Gi = {
  "update-document": [
    { key: "documentId", label: "Document ID", placeholder: "{{current}}", help: "Use {{current}} for the triggering document" },
    { key: "field", label: "Field name", placeholder: "e.g. status, tags" },
    { key: "value", label: "New value", placeholder: "{{context.steps.<id>.response}}", help: "Supports {{context.*}} template variables" }
  ],
  "post-comment": [
    { key: "documentId", label: "Document ID", placeholder: "{{current}}", help: "Use {{current}} for the triggering document" },
    { key: "body", label: "Comment body", placeholder: "{{context.steps.<id>.response}}", multiline: !0, help: "Supports {{context.*}} template variables" }
  ],
  notify: [
    { key: "channel", label: "Channel / Room", placeholder: "e.g. general, moderation", help: "Room ID where the notification is posted" },
    { key: "message", label: "Message", placeholder: "Flagged: {{context.steps.<id>.output.reason}}", multiline: !0, help: "Supports {{context.*}} template variables" }
  ],
  webhook: [
    { key: "url", label: "URL", placeholder: "https://..." },
    { key: "method", label: "Method", placeholder: "POST" },
    { key: "body", label: "Body (JSON)", placeholder: '{"key": "{{context.value}}"}', multiline: !0 }
  ],
  "mcp-tool": [
    { key: "toolName", label: "Tool name", placeholder: "e.g. search, summarize" },
    { key: "input", label: "Input (JSON)", placeholder: "{}", multiline: !0 }
  ],
  "sync-back": [
    { key: "sourceId", label: "Source ID", placeholder: "{{document.metadata.sourceId}}", help: "Ingest source to sync back to" },
    { key: "documentId", label: "Document ID", placeholder: "{{document.id}}", help: "Document to push back to source" }
  ]
};
function Yi({ data: e, onChange: t }) {
  const r = Gi[e.actionType], s = e.config ?? {}, i = typeof s.retryCount == "number" ? s.retryCount : 3, o = e.onError === "route-error" ? "route-error" : typeof s.retryCount == "number" ? "retry" : "halt", d = (a, p) => {
    t({ config: { ...s, [a]: p } });
  }, c = (a) => {
    if (a === "route-error") {
      const { retryCount: p, ...f } = s;
      t({ onError: "route-error", config: f });
    } else if (a === "halt") {
      const { retryCount: p, ...f } = s;
      t({ onError: "fail-run", config: f });
    } else
      t({ onError: "fail-run", config: { ...s, retryCount: i } });
  };
  return /* @__PURE__ */ l(Xe, { children: [
    /* @__PURE__ */ n(fe, { label: "Action type", required: !0, children: /* @__PURE__ */ n(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.actionType,
        onChange: (a) => t({ actionType: a.target.value, config: {} }),
        children: Ji.map((a) => /* @__PURE__ */ n("option", { value: a.value, children: a.label }, a.value))
      }
    ) }),
    /* @__PURE__ */ n(fe, { label: "Configuration", children: /* @__PURE__ */ n("div", { className: "flex flex-col gap-2.5", children: r.map((a) => /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ n("label", { className: "text-[11px] font-semibold text-text-secondary", children: a.label }),
      a.multiline ? /* @__PURE__ */ n(
        "textarea",
        {
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[48px] mt-0.5",
          rows: 2,
          placeholder: a.placeholder,
          value: typeof s[a.key] == "string" ? s[a.key] : "",
          onChange: (p) => d(a.key, p.target.value)
        }
      ) : /* @__PURE__ */ n(
        "input",
        {
          type: "text",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit mt-0.5",
          placeholder: a.placeholder,
          value: typeof s[a.key] == "string" ? s[a.key] : "",
          onChange: (p) => d(a.key, p.target.value)
        }
      ),
      a.help && /* @__PURE__ */ n("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: a.help })
    ] }, a.key)) }) }),
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ l("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
        /* @__PURE__ */ n(
          "input",
          {
            type: "checkbox",
            checked: !!e.idempotent,
            onChange: (a) => t({ idempotent: a.target.checked })
          }
        ),
        "Idempotent"
      ] }),
      /* @__PURE__ */ n("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "This action is safe to retry." })
    ] }),
    e.idempotent && /* @__PURE__ */ l(fe, { label: "Dedup scope", children: [
      /* @__PURE__ */ l(
        "select",
        {
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
          value: e.idempotencyMode ?? "per-step",
          onChange: (a) => t({ idempotencyMode: a.target.value }),
          children: [
            /* @__PURE__ */ n("option", { value: "per-step", children: "Per step — fire once regardless of retries" }),
            /* @__PURE__ */ n("option", { value: "per-attempt", children: "Per attempt — fire once per retry window" })
          ]
        }
      ),
      /* @__PURE__ */ n("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: (e.idempotencyMode ?? "per-step") === "per-step" ? "Retries skip this action if it already succeeded. Best for post-comment, notify." : "Each retry attempt can execute the action. Best for idempotent PUTs/webhooks." })
    ] }),
    /* @__PURE__ */ n(
      sn,
      {
        value: e.retryPolicy,
        onChange: (a) => t({ retryPolicy: a })
      }
    ),
    /* @__PURE__ */ n(fe, { label: "On error", children: /* @__PURE__ */ l("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ l("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ n(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: o === "route-error",
            onChange: () => c("route-error")
          }
        ),
        "Route to error handle"
      ] }),
      /* @__PURE__ */ l("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ n(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: o === "halt",
            onChange: () => c("halt")
          }
        ),
        "Halt pipeline"
      ] }),
      /* @__PURE__ */ l("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ n(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: o === "retry",
            onChange: () => c("retry")
          }
        ),
        "Retry up to",
        /* @__PURE__ */ n(
          "input",
          {
            type: "number",
            min: 1,
            disabled: o !== "retry",
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-16 flex-none font-inherit",
            value: i,
            onChange: (a) => {
              const p = Math.max(1, parseInt(a.target.value, 10) || 1);
              t({ onError: "fail-run", config: { ...s, retryCount: p } });
            }
          }
        ),
        "times"
      ] })
    ] }) })
  ] });
}
const Qe = 2, mt = 8;
function An(e, t) {
  const r = e ?? [];
  return r.length === t ? r : r.length > t ? r.slice(0, t) : [...r, ...Array(t - r.length).fill("")];
}
function Xi({ data: e, onChange: t }) {
  const r = Math.max(Qe, Math.min(mt, e.branchCount || Qe)), s = An(e.branchLabels, r), i = (d) => {
    const c = Math.max(Qe, Math.min(mt, d));
    t({
      branchCount: c,
      branchLabels: An(e.branchLabels, c)
    });
  }, o = (d, c) => {
    const a = [...s];
    a[d] = c, t({ branchLabels: a });
  };
  return /* @__PURE__ */ l(Xe, { children: [
    /* @__PURE__ */ l(
      fe,
      {
        label: "Branch count",
        required: !0,
        help: `Between ${Qe} and ${mt} parallel branches.`,
        children: [
          /* @__PURE__ */ n("span", { className: "text-text-tertiary text-xs ml-2", children: r }),
          /* @__PURE__ */ n(
            "input",
            {
              type: "range",
              min: Qe,
              max: mt,
              step: 1,
              value: r,
              onChange: (d) => i(parseInt(d.target.value, 10)),
              className: "w-full mt-1"
            }
          ),
          /* @__PURE__ */ n(
            "input",
            {
              type: "number",
              min: Qe,
              max: mt,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit mt-1",
              value: r,
              onChange: (d) => i(parseInt(d.target.value, 10) || Qe)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ n(fe, { label: "Branch labels (optional)", children: /* @__PURE__ */ n("div", { className: "flex flex-col gap-1.5", children: s.map((d, c) => /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ l("span", { className: "text-xs text-text-secondary min-w-[72px]", children: [
        "Branch ",
        c,
        ":"
      ] }),
      /* @__PURE__ */ n(
        "input",
        {
          type: "text",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none flex-1 min-w-[120px] font-inherit",
          value: d,
          onChange: (a) => o(c, a.target.value),
          placeholder: c === 0 ? "primary" : `branch-${c}`
        }
      )
    ] }, c)) }) })
  ] });
}
const Qi = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], Zi = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function ea({ data: e, onChange: t }) {
  return /* @__PURE__ */ l(Xe, { children: [
    /* @__PURE__ */ l(fe, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ n("div", { className: "flex flex-col gap-1.5", children: Qi.map((r) => /* @__PURE__ */ l(
        "label",
        {
          className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
          children: [
            /* @__PURE__ */ n(
              "input",
              {
                type: "radio",
                name: "join-mode",
                checked: e.mode === r.value,
                onChange: () => t({ mode: r.value })
              }
            ),
            r.label,
            /* @__PURE__ */ l("span", { className: "text-text-tertiary text-[11px]", children: [
              "— ",
              r.hint
            ] })
          ]
        },
        r.value
      )) }),
      e.mode === "n_of_m" && /* @__PURE__ */ l("div", { className: "mt-2 flex items-center gap-2", children: [
        /* @__PURE__ */ n("label", { className: "text-[11px] font-semibold text-text-secondary", children: "N" }),
        /* @__PURE__ */ n(
          "input",
          {
            type: "number",
            min: 1,
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit",
            value: e.n ?? 1,
            onChange: (r) => t({ n: Math.max(1, parseInt(r.target.value, 10) || 1) })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ n(fe, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ n("div", { className: "flex flex-col gap-1.5", children: Zi.map((r) => /* @__PURE__ */ l(
      "label",
      {
        className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
        children: [
          /* @__PURE__ */ n(
            "input",
            {
              type: "radio",
              name: "join-merge",
              checked: e.mergeStrategy === r.value,
              onChange: () => t({ mergeStrategy: r.value })
            }
          ),
          r.label,
          /* @__PURE__ */ l("span", { className: "text-text-tertiary text-[11px]", children: [
            "— ",
            r.hint
          ] })
        ]
      },
      r.value
    )) }) }),
    /* @__PURE__ */ l("div", { className: "p-2 bg-surface-inset border border-border rounded-md text-xs text-text-secondary", children: [
      "Current inputs: ",
      /* @__PURE__ */ n("strong", { children: "TBD" }),
      /* @__PURE__ */ n("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Derived from incoming edges once the canvas is connected." })
    ] })
  ] });
}
const bt = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5
};
function ta(e) {
  return !e || e <= 0 ? "minutes" : e % bt.hours === 0 ? "hours" : e % bt.minutes === 0 ? "minutes" : "seconds";
}
function na({ data: e, onChange: t }) {
  const r = e.approvers ?? [], s = r.length === 0, [i, o] = R(() => ta(e.timeoutMs)), d = e.timeoutMs !== void 0 ? Math.round(e.timeoutMs / bt[i]) : "", c = r.filter((x) => x.type === "user").map((x) => x.value), a = (x) => {
    const g = r.filter((w) => w.type === "role"), v = [...x.map((w) => ({ type: "user", value: w })), ...g];
    t({
      approvers: v,
      // Clamp requiredCount so it never exceeds approvers.length (min 1).
      requiredCount: Math.max(1, Math.min(e.requiredCount || 1, v.length || 1))
    });
  }, p = (x) => {
    const g = r.filter((u, v) => v !== x);
    t({
      approvers: g,
      requiredCount: Math.max(1, Math.min(e.requiredCount || 1, g.length || 1))
    });
  }, f = (x) => {
    if (x === "") {
      t({ timeoutMs: void 0 });
      return;
    }
    const g = Math.max(0, parseInt(x, 10) || 0);
    t({ timeoutMs: g * bt[i] });
  }, h = (x) => {
    o(x), typeof d == "number" && !Number.isNaN(d) && t({ timeoutMs: d * bt[x] });
  }, m = Math.max(1, r.length);
  return /* @__PURE__ */ l(Xe, { children: [
    /* @__PURE__ */ l(
      fe,
      {
        label: "Approvers",
        required: !0,
        error: s ? "At least one approver is required." : void 0,
        help: s ? void 0 : "Who can approve this step.",
        children: [
          /* @__PURE__ */ n(
            Jr,
            {
              value: c,
              onChange: a,
              placeholder: "Add approver…"
            }
          ),
          r.length > 0 && /* @__PURE__ */ n("div", { className: "flex flex-wrap gap-1.5 mt-2", children: r.map((x, g) => /* @__PURE__ */ l(
            "span",
            {
              className: $(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-[1.4] whitespace-nowrap",
                x.type === "role" ? "bg-[#fffbeb] text-[#d97706]" : "bg-[#eff6ff] text-[#2563eb]"
              ),
              children: [
                x.type === "role" ? "🎖" : "👤",
                " ",
                x.value,
                /* @__PURE__ */ n(
                  "button",
                  {
                    type: "button",
                    onClick: () => p(g),
                    "aria-label": `Remove ${x.value}`,
                    className: "bg-transparent border-none p-0 ml-0.5 cursor-pointer text-current font-inherit text-xs leading-none",
                    children: "×"
                  }
                )
              ]
            },
            `${x.type}:${x.value}:${g}`
          )) })
        ]
      }
    ),
    /* @__PURE__ */ n(
      fe,
      {
        label: "Required count",
        required: !0,
        help: "How many approvers must say yes.",
        children: /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ n(
            "input",
            {
              type: "number",
              min: 1,
              max: m,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-24 font-inherit",
              value: e.requiredCount || 1,
              onChange: (x) => {
                const g = parseInt(x.target.value, 10), u = Math.max(1, Math.min(m, Number.isNaN(g) ? 1 : g));
                t({ requiredCount: u });
              }
            }
          ),
          /* @__PURE__ */ l("span", { className: "text-text-tertiary text-xs", children: [
            e.requiredCount || 1,
            " of ",
            m
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ l(fe, { label: "Timeout", help: "Leave blank for no timeout.", children: [
      /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ n(
          "input",
          {
            type: "number",
            min: 0,
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-24 flex-none font-inherit",
            value: d,
            onChange: (x) => f(x.target.value),
            placeholder: "24"
          }
        ),
        /* @__PURE__ */ l(
          "select",
          {
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-[120px] flex-none font-inherit",
            value: i,
            onChange: (x) => h(x.target.value),
            children: [
              /* @__PURE__ */ n("option", { value: "seconds", children: "seconds" }),
              /* @__PURE__ */ n("option", { value: "minutes", children: "minutes" }),
              /* @__PURE__ */ n("option", { value: "hours", children: "hours" })
            ]
          }
        )
      ] }),
      e.timeoutMs !== void 0 && e.timeoutMs > 0 && /* @__PURE__ */ l("div", { className: "mt-2", children: [
        /* @__PURE__ */ n("label", { className: "text-[11px] font-semibold text-text-secondary", children: "If timeout" }),
        /* @__PURE__ */ n("div", { className: "flex gap-3 mt-1", children: ["reject", "approve"].map((x) => /* @__PURE__ */ l(
          "label",
          {
            className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
            children: [
              /* @__PURE__ */ n(
                "input",
                {
                  type: "radio",
                  name: "approval-timeout-action",
                  checked: (e.timeoutAction ?? "reject") === x,
                  onChange: () => t({ timeoutAction: x })
                }
              ),
              x === "reject" ? "Reject" : "Approve"
            ]
          },
          x
        )) })
      ] })
    ] }),
    /* @__PURE__ */ n(fe, { label: "Message for approver (optional)", help: "Shown to the approver when the request is sent.", children: /* @__PURE__ */ n(
      "textarea",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]",
        value: e.message ?? "",
        onChange: (x) => t({ message: x.target.value || void 0 }),
        placeholder: "Please review the summary before it's posted to the document."
      }
    ) })
  ] });
}
const ra = {
  // -------------------------------------------------------------------------
  // Trigger
  // -------------------------------------------------------------------------
  trigger: /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "The entry point of every pipeline. Every pipeline has exactly one trigger." }),
    /* @__PURE__ */ n("h4", { children: "Trigger types" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "manual" }),
        " — started by clicking Run in the editor."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "document.finalize" }),
        " / ",
        /* @__PURE__ */ n("code", { children: "document.submit" }),
        " / ",
        /* @__PURE__ */ n("code", { children: "document.comment" }),
        " — fires on doc lifecycle events for a given document type."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "schedule" }),
        " — cron expression (e.g. ",
        /* @__PURE__ */ n("code", { children: "0 9 * * 1-5" }),
        ")."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "webhook" }),
        " — inbound HTTP POST at the configured path."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Fields" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "triggerType" }),
        " — one of the above."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "documentTypeId" }),
        " — required for ",
        /* @__PURE__ */ n("code", { children: "document.*" }),
        "."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "schedule" }),
        " / ",
        /* @__PURE__ */ n("code", { children: "webhookPath" }),
        " — per type."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Wiring" }),
    /* @__PURE__ */ l("p", { children: [
      "One output handle ",
      /* @__PURE__ */ n("code", { children: "out" }),
      " that fires downstream with ",
      /* @__PURE__ */ n("code", { children: "{ trigger, payload }" }),
      " as the initial context."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // LLM
  // -------------------------------------------------------------------------
  llm: /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "Calls an LLM with a prompt template filled from pipeline context." }),
    /* @__PURE__ */ n("h4", { children: "Provider & model" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "anthropic" }),
        " — Claude models (e.g. ",
        /* @__PURE__ */ n("code", { children: "claude-sonnet-4-6" }),
        ")."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "bedrock" }),
        " — same models via AWS Bedrock."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Prompt templates" }),
    /* @__PURE__ */ l("p", { children: [
      "Interpolate with ",
      /* @__PURE__ */ n("code", { children: "{{ context.steps.X.output }}" }),
      " or any dotted path into the run context."
    ] }),
    /* @__PURE__ */ n("h4", { children: "Streaming" }),
    /* @__PURE__ */ l("p", { children: [
      "Toggle on to emit ",
      /* @__PURE__ */ n("code", { children: "pipeline.llm.token" }),
      " events as text arrives; off for a single response."
    ] }),
    /* @__PURE__ */ n("h4", { children: "Errors" }),
    /* @__PURE__ */ l("p", { children: [
      "The ",
      /* @__PURE__ */ n("code", { children: "error" }),
      " handle routes downstream on LLM failure — retried per ",
      /* @__PURE__ */ n("code", { children: "RetryManager" }),
      " policy before surfacing here."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Transform
  // -------------------------------------------------------------------------
  transform: /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "Pure data transform — JSONPath, template string, or sandboxed JavaScript. No side effects." }),
    /* @__PURE__ */ n("h4", { children: "When to use each" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "jsonpath" }),
        " — extract a value, e.g. ",
        /* @__PURE__ */ n("code", { children: "$.document.body.sections[0]" }),
        "."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "template" }),
        " — shape a string from context, e.g. ",
        /* @__PURE__ */ n("code", { children: "Hi {{context.user.name}}" }),
        "."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "javascript" }),
        " — arbitrary logic; runs in an isolated sandbox with ",
        /* @__PURE__ */ n("code", { children: "context" }),
        " as input."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Output" }),
    /* @__PURE__ */ l("p", { children: [
      /* @__PURE__ */ n("code", { children: "outputKey" }),
      " scopes the result into ",
      /* @__PURE__ */ l("code", { children: [
        "context.",
        "{outputKey}"
      ] }),
      ". Leave blank to merge into the root context."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Condition
  // -------------------------------------------------------------------------
  condition: /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "Branches the flow based on a boolean expression evaluated over context." }),
    /* @__PURE__ */ n("h4", { children: "Expression language" }),
    /* @__PURE__ */ l("p", { children: [
      "JSONPath lookups combined with booleans and comparisons, e.g. ",
      /* @__PURE__ */ n("code", { children: '$.llm.output.sentiment == "positive"' }),
      " or ",
      /* @__PURE__ */ n("code", { children: "$.score > 0.8 && $.reviewed" }),
      "."
    ] }),
    /* @__PURE__ */ n("h4", { children: "Wiring" }),
    /* @__PURE__ */ l("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ n("code", { children: "true" }),
      " and ",
      /* @__PURE__ */ n("code", { children: "false" }),
      ". Connected branches run; unconnected branches are skipped and their step is marked ",
      /* @__PURE__ */ n("code", { children: "skipped" }),
      "."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Action
  // -------------------------------------------------------------------------
  action: /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "Performs a side-effect: updates a doc, posts a comment, notifies, calls a webhook, or invokes an MCP tool." }),
    /* @__PURE__ */ n("h4", { children: "Subtypes" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "update-document" }),
        " — patch a document's body."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "post-comment" }),
        " — append a comment thread entry."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "notify" }),
        " — push notification to users/roles."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "webhook" }),
        " — outbound HTTP request."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "mcp-tool" }),
        " — invoke a registered MCP tool by name."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Idempotent flag" }),
    /* @__PURE__ */ l("p", { children: [
      "If ",
      /* @__PURE__ */ n("code", { children: "idempotent" }),
      " is true, retries are safe after partial completion — the runtime may re-invoke the action without guarding against duplicates."
    ] }),
    /* @__PURE__ */ n("h4", { children: "Errors" }),
    /* @__PURE__ */ l("p", { children: [
      "The ",
      /* @__PURE__ */ n("code", { children: "error" }),
      " handle routes on failure (after retries), or fails the run if ",
      /* @__PURE__ */ n("code", { children: "onError" }),
      " is ",
      /* @__PURE__ */ n("code", { children: "fail-run" }),
      "."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Fork
  // -------------------------------------------------------------------------
  fork: /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "Splits the flow into N parallel branches that all run concurrently against the same context snapshot." }),
    /* @__PURE__ */ n("h4", { children: "Branch count" }),
    /* @__PURE__ */ l("p", { children: [
      "2-8 branches. Each branch exposes a handle ",
      /* @__PURE__ */ n("code", { children: "branch-0" }),
      ", ",
      /* @__PURE__ */ n("code", { children: "branch-1" }),
      ", etc."
    ] }),
    /* @__PURE__ */ n("h4", { children: "Downstream" }),
    /* @__PURE__ */ l("p", { children: [
      "Typically paired with a ",
      /* @__PURE__ */ n("code", { children: "Join" }),
      " to merge results. Without a Join, each branch terminates independently and the run completes when all tails finish."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Join
  // -------------------------------------------------------------------------
  join: /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "Combines N parallel branches back into one flow." }),
    /* @__PURE__ */ n("h4", { children: "Modes" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "all" }),
        " — wait for every input."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "any" }),
        " — fire as soon as the first input arrives; later inputs are ignored."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "n_of_m" }),
        " — fire after ",
        /* @__PURE__ */ n("code", { children: "n" }),
        " of ",
        /* @__PURE__ */ n("code", { children: "m" }),
        " inputs complete."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Merge strategies" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "deep-merge" }),
        " — recursive object merge."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "array-collect" }),
        " — collect each branch's output into an array."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "last-writer-wins" }),
        " — final branch to arrive replaces prior values."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Partial failures (§17.2)" }),
    /* @__PURE__ */ l("p", { children: [
      "In ",
      /* @__PURE__ */ n("code", { children: "all" }),
      " mode a failed branch fails the run. In ",
      /* @__PURE__ */ n("code", { children: "any" }),
      "/",
      /* @__PURE__ */ n("code", { children: "n_of_m" }),
      " failed branches count against the required total — the Join fires as soon as enough successes arrive."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Approval
  // -------------------------------------------------------------------------
  approval: /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ l("p", { children: [
      "Blocks the pipeline waiting for human approval. The run enters ",
      /* @__PURE__ */ n("code", { children: "awaiting_approval" }),
      " until decisions are recorded."
    ] }),
    /* @__PURE__ */ n("h4", { children: "Approvers" }),
    /* @__PURE__ */ l("p", { children: [
      "A list of users or roles. ",
      /* @__PURE__ */ n("code", { children: "requiredCount" }),
      " controls how many approvals are needed (n-of-m)."
    ] }),
    /* @__PURE__ */ n("h4", { children: "Timeout" }),
    /* @__PURE__ */ l("p", { children: [
      "Optional ",
      /* @__PURE__ */ n("code", { children: "timeoutMs" }),
      " with ",
      /* @__PURE__ */ n("code", { children: "timeoutAction" }),
      " of ",
      /* @__PURE__ */ n("code", { children: "reject" }),
      " or ",
      /* @__PURE__ */ n("code", { children: "approve" }),
      " — decides the outcome if no one responds in time."
    ] }),
    /* @__PURE__ */ n("h4", { children: "Wiring" }),
    /* @__PURE__ */ l("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ n("code", { children: "approved" }),
      " and ",
      /* @__PURE__ */ n("code", { children: "rejected" }),
      ". The flow resumes down the matching branch."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Agent (AgentCore)
  // -------------------------------------------------------------------------
  agent: /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "Invokes a Strands agent via A2A protocol. The agent processes the input and returns a structured response." }),
    /* @__PURE__ */ n("h4", { children: "Fields" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "agentId" }),
        " — AgentCore agent identifier or ARN."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "protocol" }),
        " — ",
        /* @__PURE__ */ n("code", { children: "a2a" }),
        " (recommended) or ",
        /* @__PURE__ */ n("code", { children: "direct" }),
        "."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "inputTemplate" }),
        " — supports ",
        /* @__PURE__ */ n("code", { children: "{{context.*}}" }),
        " substitution."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "streaming" }),
        " — whether to stream the agent's response tokens."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Wiring" }),
    /* @__PURE__ */ l("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ n("code", { children: "out" }),
      " (success) and ",
      /* @__PURE__ */ n("code", { children: "error" }),
      " (invocation failure)."
    ] })
  ] }),
  "mcp-tool": /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "Invokes an external tool through an MCP Gateway server." }),
    /* @__PURE__ */ n("h4", { children: "Fields" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "gatewayUrl" }),
        " — MCP Gateway endpoint."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "toolName" }),
        " — registered tool to invoke."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "inputTemplate" }),
        " — JSON input with substitution support."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Wiring" }),
    /* @__PURE__ */ l("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ n("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ n("code", { children: "error" }),
      "."
    ] })
  ] }),
  "knowledge-base": /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "Queries a Bedrock Knowledge Base for relevant document chunks (RAG retrieval)." }),
    /* @__PURE__ */ n("h4", { children: "Fields" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "knowledgeBaseId" }),
        " — Bedrock KB identifier."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "queryTemplate" }),
        " — natural language query with substitution."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "topK" }),
        " — number of chunks to retrieve (default 5)."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "scoreThreshold" }),
        " — minimum relevance score (0–1)."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Wiring" }),
    /* @__PURE__ */ l("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ n("code", { children: "out" }),
      " (retrieved chunks in context) and ",
      /* @__PURE__ */ n("code", { children: "error" }),
      "."
    ] })
  ] }),
  "graph-query": /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "Runs an openCypher query against a Neptune Analytics graph." }),
    /* @__PURE__ */ n("h4", { children: "Fields" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "graphId" }),
        " — Neptune Analytics graph identifier."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "query" }),
        " — openCypher query (NOT Gremlin/SPARQL)."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "parameters" }),
        " — named query parameters."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Wiring" }),
    /* @__PURE__ */ l("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ n("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ n("code", { children: "error" }),
      "."
    ] })
  ] }),
  memory: /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "Reads from or writes to AgentCore Memory (session or long-term)." }),
    /* @__PURE__ */ n("h4", { children: "Fields" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "mode" }),
        " — ",
        /* @__PURE__ */ n("code", { children: "read" }),
        " or ",
        /* @__PURE__ */ n("code", { children: "write" }),
        "."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "scope" }),
        " — ",
        /* @__PURE__ */ n("code", { children: "session" }),
        " (ephemeral) or ",
        /* @__PURE__ */ n("code", { children: "long-term" }),
        " (persistent)."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "namespace" }),
        " — memory collection key."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "keyExpression" }),
        " — lookup key (read) or storage key (write)."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Wiring" }),
    /* @__PURE__ */ l("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ n("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ n("code", { children: "error" }),
      "."
    ] })
  ] }),
  guardrail: /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "Applies Bedrock Guardrails content filtering. Evaluates input against configured policies and routes accordingly." }),
    /* @__PURE__ */ n("h4", { children: "Fields" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "guardrailId" }),
        " — Bedrock Guardrail identifier."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "inputField" }),
        " — context path to evaluate."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "action" }),
        " — ",
        /* @__PURE__ */ n("code", { children: "block" }),
        ", ",
        /* @__PURE__ */ n("code", { children: "mask" }),
        ", or ",
        /* @__PURE__ */ n("code", { children: "warn" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Wiring" }),
    /* @__PURE__ */ l("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ n("code", { children: "pass" }),
      " (content OK) and ",
      /* @__PURE__ */ n("code", { children: "block" }),
      " (content flagged)."
    ] })
  ] }),
  policy: /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "Evaluates a Cedar authorization policy against principal/action/resource." }),
    /* @__PURE__ */ n("h4", { children: "Fields" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "policyStoreId" }),
        " — Cedar policy store identifier."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "principal" }),
        " — who is requesting (supports substitution)."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "action" }),
        " — what action is being performed."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "resource" }),
        " — what resource is being accessed."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Wiring" }),
    /* @__PURE__ */ l("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ n("code", { children: "allow" }),
      " and ",
      /* @__PURE__ */ n("code", { children: "deny" }),
      "."
    ] })
  ] }),
  "ag-ui-output": /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ n("h4", { children: "What it does" }),
    /* @__PURE__ */ n("p", { children: "Streams output to the AG-UI frontend via Server-Sent Events. This is a terminal node — no downstream flow." }),
    /* @__PURE__ */ n("h4", { children: "Fields" }),
    /* @__PURE__ */ l("ul", { children: [
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "sourceField" }),
        " — context path to stream."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "eventType" }),
        " — AG-UI event type to emit (TEXT_MESSAGE_CONTENT, STATE_DELTA, or CUSTOM)."
      ] }),
      /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ n("code", { children: "terminal" }),
        " — marks this as the pipeline endpoint."
      ] })
    ] }),
    /* @__PURE__ */ n("h4", { children: "Wiring" }),
    /* @__PURE__ */ l("p", { children: [
      "One input handle ",
      /* @__PURE__ */ n("code", { children: "in" }),
      ". No output — this is the endpoint."
    ] })
  ] })
}, oa = {
  trigger: {
    icon: "⚡",
    name: "Trigger",
    docs: "The entry point of the pipeline. Configure how the pipeline is started — manually, on a document event, on a schedule, or via webhook."
  },
  llm: {
    icon: "🧠",
    name: "LLM",
    docs: "Calls an LLM model with a system + user prompt. Supports variable substitution from pipeline context (e.g. {{context.document.body}})."
  },
  transform: {
    icon: "🔧",
    name: "Transform",
    docs: "Reshape or extract data from pipeline context using JSONPath, template strings, or sandboxed JavaScript."
  },
  condition: {
    icon: "🔀",
    name: "Condition",
    docs: "Branch the pipeline on a boolean expression. The `true` output runs on match, the `false` output otherwise."
  },
  action: {
    icon: "🎯",
    name: "Action",
    docs: "Produce a side effect — update a document, post a comment, notify a user, hit a webhook, or invoke an MCP tool."
  },
  fork: {
    icon: "🍴",
    name: "Fork",
    docs: "Split execution into N parallel branches. Use with a Join to wait for all branches to complete."
  },
  join: {
    icon: "🔗",
    name: "Join",
    docs: "Wait for multiple parallel branches to complete and merge their outputs. Supports all / any / n-of-m modes."
  },
  approval: {
    icon: "✅",
    name: "Approval",
    docs: "Pause the pipeline and wait for a human to approve or reject. Supports n-of-m approvers and timeout fallbacks."
  },
  agent: {
    icon: "🤖",
    name: "Agent",
    docs: "Invoke a Strands agent via A2A protocol. Supports streaming output and configurable timeouts."
  },
  "mcp-tool": {
    icon: "🔌",
    name: "MCP Tool",
    docs: "Invoke an external tool through MCP Gateway. Supports arbitrary tool inputs and configurable timeouts."
  },
  "knowledge-base": {
    icon: "📚",
    name: "Knowledge Base",
    docs: "Query a Bedrock Knowledge Base for relevant document chunks via RAG retrieval."
  },
  "graph-query": {
    icon: "🕸️",
    name: "Graph Query",
    docs: "Run an openCypher query against Neptune Analytics. Returns graph traversal results into pipeline context."
  },
  memory: {
    icon: "💾",
    name: "Memory",
    docs: "Read from or write to AgentCore Memory. Supports session-scoped and long-term persistent storage."
  },
  guardrail: {
    icon: "🛡️",
    name: "Guardrail",
    docs: "Apply Bedrock Guardrails content filtering. Routes to pass or block based on content policy evaluation."
  },
  policy: {
    icon: "📜",
    name: "Policy",
    docs: "Evaluate a Cedar authorization policy. Routes to allow or deny based on principal/action/resource."
  },
  "ag-ui-output": {
    icon: "📡",
    name: "AG-UI Output",
    docs: "Stream output to the AG-UI frontend. Terminal node — emits AG-UI protocol events for real-time display."
  }
}, We = ({ data: e }) => /* @__PURE__ */ l("div", { className: "p-3 text-[13px] text-[#64748b]", children: [
  "Configuration for ",
  /* @__PURE__ */ n("strong", { children: e.type }),
  " — coming in Phase C."
] }), sa = {
  trigger: _i,
  llm: qi,
  transform: Ki,
  condition: Vi,
  action: Yi,
  fork: Xi,
  join: ea,
  approval: na,
  agent: We,
  "mcp-tool": We,
  "knowledge-base": We,
  "graph-query": We,
  memory: We,
  guardrail: We,
  policy: We,
  "ag-ui-output": We
};
function ia(e, t) {
  const r = sa[e.type];
  return /* @__PURE__ */ n(r, { data: e.data, onChange: t });
}
function aa({ selectedIds: e }) {
  const {
    definition: t,
    selectedNodeId: r,
    setSelectedNodeId: s,
    updateNodeData: i,
    removeNode: o,
    duplicateNodes: d
  } = dt(), [c, a] = R("config"), p = oe(null), f = oe(null);
  Qt();
  const h = F(() => e && e.length > 1 ? e : r ? [r] : [], [e, r]), m = h.length > 1, x = h.length > 0, g = F(() => m || h.length === 0 || !t ? null : t.nodes.find((y) => y.id === h[0]) ?? null, [t, h, m]), u = M(() => {
    s(null);
  }, [s]);
  G(() => {
    a("config");
  }, [h.join(",")]), G(() => {
    if (!x) return;
    const y = (k) => {
      k.key === "Escape" && (k.stopPropagation(), u());
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [x, u]), G(() => {
    if (!x) return;
    const y = (k) => {
      const b = p.current;
      b && (k.target instanceof Node && b.contains(k.target) || k.target instanceof Element && (k.target.closest("[data-node-type]") || u()));
    };
    return window.addEventListener("mousedown", y), () => window.removeEventListener("mousedown", y);
  }, [x, u]);
  const v = g ? oa[g.type] : null, w = () => {
    if (m)
      for (const y of h) o(y);
    else g && o(g.id);
  }, N = () => {
    h.length !== 0 && d(h);
  }, C = (y) => {
    g && i(g.id, y);
  };
  return /* @__PURE__ */ n("div", { ref: p, className: "flex flex-col flex-1 min-h-0 bg-white", "data-testid": "config-panel", children: m ? (
    // ---------------------------------------------------------------
    // Multi-select pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ l(ne, { children: [
      /* @__PURE__ */ l("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ n("span", { className: "text-base", "aria-hidden": !0, children: "⧉" }),
        /* @__PURE__ */ l("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: [
          h.length,
          " nodes selected"
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: u,
            className: "w-7 h-7 p-0 bg-transparent border-none text-[#64748b] text-lg leading-none cursor-pointer rounded font-inherit",
            "aria-label": "Close",
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ l("div", { className: "flex-1 overflow-y-auto p-4 flex flex-col gap-3", children: [
        /* @__PURE__ */ n("div", { className: "text-xs text-[#64748b] leading-normal", children: "Bulk actions apply to every selected node. Individual node configuration is only shown for single selections." }),
        /* @__PURE__ */ l("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: w,
              className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-[#fecaca] rounded-md cursor-pointer font-inherit",
              children: "Delete all"
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: N,
              className: "px-2.5 py-1.5 text-xs font-semibold bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0] rounded-md cursor-pointer font-inherit",
              children: "Duplicate all"
            }
          )
        ] })
      ] })
    ] })
  ) : g && v ? (
    // ---------------------------------------------------------------
    // Single-node pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ l(ne, { children: [
      /* @__PURE__ */ l("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ n("span", { className: "text-lg leading-none", "aria-hidden": !0, children: v.icon }),
        /* @__PURE__ */ n("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: v.name }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: u,
            className: "w-7 h-7 p-0 bg-transparent border-none text-[#64748b] text-lg leading-none cursor-pointer rounded font-inherit",
            "aria-label": "Close",
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ n(
        "div",
        {
          ref: f,
          role: "tablist",
          "aria-label": "Node configuration tabs",
          className: "h-9 flex border-b border-[#e2e8f0] shrink-0",
          onKeyDown: (y) => {
            const k = ["config", "runs", "docs"], b = k.indexOf(c);
            let T = null;
            y.key === "ArrowRight" ? T = k[(b + 1) % k.length] : y.key === "ArrowLeft" ? T = k[(b - 1 + k.length) % k.length] : y.key === "Home" ? T = k[0] : y.key === "End" && (T = k[k.length - 1]), T && (y.preventDefault(), a(T), f.current?.querySelector(
              `[data-tab="${T}"]`
            )?.focus());
          },
          children: ["config", "runs", "docs"].map((y) => {
            const k = c === y, b = y === "config" ? "Config" : y === "runs" ? "Runs" : "Docs";
            return /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": k,
                tabIndex: k ? 0 : -1,
                "data-tab": y,
                className: $(
                  "flex-1 border-none bg-transparent text-xs font-semibold cursor-pointer font-inherit",
                  k ? "text-[#0f172a] border-b-2 border-b-[#646cff]" : "text-[#64748b] border-b-2 border-b-transparent"
                ),
                onClick: () => a(y),
                children: b
              },
              y
            );
          })
        }
      ),
      /* @__PURE__ */ l("div", { className: "flex-1 overflow-y-auto", children: [
        c === "config" && ia(g, C),
        c === "runs" && /* @__PURE__ */ n("div", { className: "p-6 text-xs text-[#64748b]", children: "No runs yet." }),
        c === "docs" && /* @__PURE__ */ n("div", { className: "pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug", children: ra[g.type] ?? /* @__PURE__ */ n("p", { className: "text-text-secondary", children: "No docs available for this node type." }) })
      ] }),
      /* @__PURE__ */ l("div", { className: "h-10 px-3 flex items-center justify-between gap-2 border-t border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: w,
            className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-transparent rounded-md cursor-pointer font-inherit",
            children: "🗑 Delete node"
          }
        ),
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            onClick: N,
            className: "px-2.5 py-1.5 text-xs font-semibold bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0] rounded-md cursor-pointer font-inherit",
            children: [
              "⧉",
              " Duplicate"
            ]
          }
        )
      ] })
    ] })
  ) : null });
}
function ve(e) {
  if (e == null) return "--";
  if (e < 1e3) return `${Math.round(e)}ms`;
  if (e < 6e4) return `${(e / 1e3).toFixed(1)}s`;
  const t = Math.floor(e / 6e4), r = Math.floor(e % 6e4 / 1e3);
  return `${t}m ${r}s`;
}
function ot(e) {
  if (!e) return "--";
  const t = new Date(e);
  if (Number.isNaN(t.getTime())) return "--";
  const r = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  };
  return new Intl.DateTimeFormat(void 0, r).format(t);
}
function la(e) {
  const t = Date.now() - new Date(e).getTime();
  return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function ca(e) {
  return e == null || e === 0 ? "--" : e < 1e-3 ? "<$0.001" : e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function da(e) {
  return e == null || e === 0 ? "text-text-tertiary" : e < 0.01 ? "text-[#16a34a]" : e < 0.1 ? "text-[#ca8a04]" : e < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Dn(e) {
  switch (e) {
    case "completed":
      return "success";
    case "failed":
      return "danger";
    case "cancelled":
      return "neutral";
    case "running":
      return "info";
    case "pending":
      return "neutral";
    case "awaiting_approval":
      return "warning";
    default:
      return "neutral";
  }
}
function Ft(e) {
  switch (e) {
    case "completed":
      return "Completed";
    case "failed":
      return "Failed";
    case "cancelled":
      return "Cancelled";
    case "running":
      return "Running";
    case "pending":
      return "Pending";
    case "awaiting_approval":
      return "Awaiting";
    default:
      return e;
  }
}
function pa(e) {
  return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function Ze({ label: e, children: t }) {
  return /* @__PURE__ */ l("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ n("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: e }),
    /* @__PURE__ */ n("span", { className: "text-[13px] text-text-primary", children: t })
  ] });
}
function ua({ pipelineId: e, run: t, onBack: r }) {
  const s = Ee();
  return /* @__PURE__ */ l("div", { className: "absolute inset-0 z-[2] flex flex-col overflow-hidden bg-surface", children: [
    /* @__PURE__ */ l("div", { className: "flex shrink-0 items-center gap-2 border-b border-border px-4 py-2.5", children: [
      /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          onClick: r,
          className: "cursor-pointer border-none bg-transparent p-0 font-inherit text-[13px] text-primary",
          children: "← Back"
        }
      ),
      /* @__PURE__ */ n("span", { className: "font-mono text-xs text-text-tertiary", children: t.id.slice(0, 12) })
    ] }),
    /* @__PURE__ */ n("div", { className: "flex-1 overflow-y-auto p-4", children: /* @__PURE__ */ l("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ n(Ze, { label: "Status", children: /* @__PURE__ */ n(
        xe,
        {
          tone: Dn(t.status),
          "aria-label": `Status: ${Ft(t.status)}`,
          children: Ft(t.status)
        }
      ) }),
      /* @__PURE__ */ n(Ze, { label: "Started", children: new Date(t.startedAt).toLocaleString() }),
      t.completedAt && /* @__PURE__ */ n(Ze, { label: "Completed", children: new Date(t.completedAt).toLocaleString() }),
      /* @__PURE__ */ n(Ze, { label: "Duration", children: ve(t.durationMs) }),
      /* @__PURE__ */ n(Ze, { label: "Triggered by", children: pa(t) }),
      /* @__PURE__ */ n(Ze, { label: "Trigger type", children: t.triggeredBy.triggerType }),
      t.estimatedCostUsd != null && t.estimatedCostUsd > 0 && /* @__PURE__ */ l(Ze, { label: "Est. Cost", children: [
        /* @__PURE__ */ n("span", { className: $("font-semibold", da(t.estimatedCostUsd)), children: ca(t.estimatedCostUsd) }),
        t.estimatedCostUsd > 1 && /* @__PURE__ */ n("span", { className: "ml-1.5 rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "Budget Warning" })
      ] }),
      t.tokenUsage && Object.keys(t.tokenUsage).length > 0 && /* @__PURE__ */ l("div", { className: "mt-2", children: [
        /* @__PURE__ */ n("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: "Cost Breakdown" }),
        Object.entries(t.tokenUsage).map(([i, o]) => /* @__PURE__ */ l(
          "div",
          {
            className: "flex items-center gap-2 py-0.5 text-[11px]",
            children: [
              /* @__PURE__ */ n("span", { className: "min-w-[100px] font-mono text-text-secondary", children: i }),
              /* @__PURE__ */ l("span", { className: "text-text-tertiary", children: [
                o.tokensIn.toLocaleString(),
                " in / ",
                o.tokensOut.toLocaleString(),
                " out"
              ] })
            ]
          },
          i
        ))
      ] }),
      t.error && /* @__PURE__ */ l("div", { className: "mt-2", children: [
        /* @__PURE__ */ n("div", { className: "mb-1 text-[11px] font-semibold uppercase text-state-failed", children: "Error" }),
        /* @__PURE__ */ l("div", { className: "whitespace-pre-wrap break-words rounded-md bg-[#fef2f2] px-2.5 py-2 font-mono text-xs text-[#991b1b]", children: [
          t.error.message,
          t.error.nodeId && /* @__PURE__ */ l("div", { className: "mt-1 text-[11px] text-[#b91c1c]", children: [
            "at node: ",
            t.error.nodeId
          ] })
        ] })
      ] }),
      /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          onClick: () => s(`/pipelines/${e}/runs/${t.id}`),
          "data-testid": "runs-panel-replay-btn",
          className: "mt-3 w-full cursor-pointer rounded-md border-none bg-primary px-3.5 py-2 font-inherit text-[13px] font-semibold text-white",
          children: "View Full Run"
        }
      ),
      Object.keys(t.steps).length > 0 && /* @__PURE__ */ l("div", { className: "mt-2", children: [
        /* @__PURE__ */ l("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: [
          "Steps (",
          Object.keys(t.steps).length,
          ")"
        ] }),
        Object.entries(t.steps).map(([i, o]) => {
          const d = Dn(o.status), c = Ft(o.status), a = o.output, p = a?.response;
          return /* @__PURE__ */ l("div", { className: "mb-2", children: [
            /* @__PURE__ */ l("div", { className: "flex items-center gap-2 py-1 text-xs", children: [
              /* @__PURE__ */ n(xe, { tone: d, "aria-label": `Status: ${c}`, children: c }),
              /* @__PURE__ */ n("span", { className: "font-mono text-[11px] text-text-secondary", children: i.slice(0, 10) }),
              o.durationMs != null && /* @__PURE__ */ n("span", { className: "ml-auto text-[11px] text-text-tertiary", children: ve(o.durationMs) })
            ] }),
            p && /* @__PURE__ */ n("div", { className: "mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-2 text-xs leading-relaxed text-text-primary", children: p }),
            a && !p && Object.keys(a).length > 0 && /* @__PURE__ */ n("div", { className: "mt-1 max-h-[120px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-1.5 font-mono text-[11px] text-text-secondary", children: JSON.stringify(a, null, 2) })
          ] }, i);
        })
      ] }),
      /* @__PURE__ */ n("div", { className: "mt-3", children: /* @__PURE__ */ l("details", { children: [
        /* @__PURE__ */ n("summary", { className: "cursor-pointer select-none text-[11px] text-text-tertiary", children: "Raw snapshot JSON" }),
        /* @__PURE__ */ n("pre", { className: "mt-1.5 max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-md border border-border bg-surface-inset p-2.5 text-[10px]", children: JSON.stringify(t, null, 2) })
      ] }) })
    ] }) })
  ] });
}
function Rn(e) {
  return e == null || e === 0 ? "--" : e < 1e-3 ? "<$0.001" : e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function ma(e) {
  return e == null || e === 0 ? "text-text-tertiary" : e < 0.01 ? "text-[#16a34a]" : e < 0.1 ? "text-[#ca8a04]" : e < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function fa(e) {
  const t = Date.now() - new Date(e).getTime();
  return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function ha(e) {
  switch (e) {
    case "completed":
      return "success";
    case "failed":
      return "danger";
    case "cancelled":
      return "neutral";
    case "running":
      return "info";
    case "pending":
      return "neutral";
    case "awaiting_approval":
      return "warning";
    default:
      return "neutral";
  }
}
function xa(e) {
  switch (e) {
    case "completed":
      return "Completed";
    case "failed":
      return "Failed";
    case "cancelled":
      return "Cancelled";
    case "running":
      return "Running";
    case "pending":
      return "Pending";
    case "awaiting_approval":
      return "Awaiting";
    default:
      return e;
  }
}
function ga(e) {
  return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function ba({ pipelineId: e, onClose: t }) {
  const r = Ee(), [s, i] = R([]), [o, d] = R(!0), [c, a] = R(null), [p, f] = R(null), [h, m] = R(!1), [x, g] = R([]), u = oe(null), v = M(async () => {
    d(!0), a(null);
    try {
      const y = await Yt(e, { limit: 50 });
      i(y.runs);
    } catch (y) {
      a(y instanceof Error ? y.message : "Failed to load runs");
    } finally {
      d(!1);
    }
  }, [e]);
  G(() => {
    u.current !== e && (u.current = e, v());
  }, [e, v]), Pe("*", M((y) => {
    const { eventType: k, payload: b } = y;
    if (!b || typeof b != "object") return;
    const T = b;
    if (!(T.pipelineId && T.pipelineId !== e))
      switch (k) {
        case "pipeline.run.started": {
          const I = b;
          if (I.pipelineId !== e) return;
          const S = {
            id: I.runId,
            pipelineId: I.pipelineId,
            pipelineVersion: 0,
            status: "running",
            triggeredBy: I.triggeredBy,
            ownerNodeId: "local",
            startedAt: I.at,
            currentStepIds: [],
            steps: {},
            context: {}
          };
          i((D) => [S, ...D.filter((_) => _.id !== I.runId)]);
          break;
        }
        case "pipeline.run.completed": {
          const I = b;
          i(
            (S) => S.map(
              (D) => D.id === I.runId ? { ...D, status: "completed", completedAt: I.at, durationMs: I.durationMs } : D
            )
          );
          break;
        }
        case "pipeline.run.failed": {
          const I = b;
          i(
            (S) => S.map(
              (D) => D.id === I.runId ? { ...D, status: "failed", completedAt: I.at, error: I.error } : D
            )
          );
          break;
        }
        case "pipeline.run.cancelled": {
          const I = b;
          i(
            (S) => S.map(
              (D) => D.id === I.runId ? { ...D, status: "cancelled", completedAt: I.at } : D
            )
          );
          break;
        }
      }
  }, [e]));
  const w = F(
    () => s.find((y) => y.id === p) ?? null,
    [s, p]
  ), N = M((y) => {
    g((k) => k.includes(y) ? k.filter((b) => b !== y) : k.length >= 2 ? [k[1], y] : [...k, y]);
  }, []), C = M(() => {
    if (x.length !== 2) return;
    const [y, k] = x;
    r(`/pipelines/${e}/compare?a=${y}&b=${k}`);
  }, [x, r, e]);
  return /* @__PURE__ */ l(
    "div",
    {
      className: "relative flex min-h-0 flex-1 flex-col overflow-hidden bg-surface",
      "data-testid": "pipeline-runs-panel",
      children: [
        /* @__PURE__ */ l("div", { className: "flex shrink-0 items-center justify-between border-b border-border px-4 py-3", children: [
          /* @__PURE__ */ n("span", { className: "text-sm font-bold text-text-primary", children: "Run History" }),
          /* @__PURE__ */ l("div", { className: "ml-auto flex items-center gap-1.5", children: [
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                onClick: () => {
                  m(!h), h && g([]);
                },
                "data-testid": "runs-panel-compare-toggle",
                className: $(
                  "cursor-pointer rounded px-2 py-0.5 font-inherit text-[11px] font-medium",
                  h ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"
                ),
                children: "Compare"
              }
            ),
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                onClick: t,
                "aria-label": "Close runs panel",
                className: "cursor-pointer rounded border-none bg-transparent px-1.5 py-0.5 text-base text-text-tertiary",
                children: "x"
              }
            )
          ] })
        ] }),
        h && /* @__PURE__ */ l(
          "div",
          {
            className: "flex shrink-0 items-center gap-2 border-b border-border bg-surface-inset px-4 py-2",
            "data-testid": "runs-panel-compare-bar",
            children: [
              /* @__PURE__ */ l("span", { className: "text-[11px] text-text-secondary", children: [
                x.length,
                "/2 selected"
              ] }),
              /* @__PURE__ */ n(
                "button",
                {
                  type: "button",
                  disabled: x.length !== 2,
                  onClick: C,
                  "data-testid": "runs-panel-compare-action",
                  className: $(
                    "ml-auto rounded px-2.5 py-0.5 font-inherit text-[11px] font-semibold",
                    x.length === 2 ? "cursor-pointer border border-primary bg-primary text-white" : "cursor-not-allowed border border-border bg-surface text-text-disabled"
                  ),
                  children: "Compare"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ l("div", { className: "relative min-h-0 flex-1", children: [
          w && /* @__PURE__ */ n(
            ua,
            {
              pipelineId: e,
              run: w,
              onBack: () => f(null)
            }
          ),
          o && s.length === 0 && /* @__PURE__ */ n("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "Loading runs..." }),
          c && /* @__PURE__ */ l("div", { className: "p-4 text-center text-xs text-state-failed", children: [
            c,
            /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                onClick: () => {
                  v();
                },
                className: "mx-auto mt-2 block cursor-pointer border-none bg-transparent font-inherit text-xs text-primary underline",
                children: "Retry"
              }
            )
          ] }),
          !o && !c && s.length === 0 && /* @__PURE__ */ n("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "No runs yet. Trigger this pipeline to see history here." }),
          s.length > 0 && /* @__PURE__ */ n("ul", { className: "m-0 flex-1 list-none overflow-y-auto p-0", children: s.map((y) => {
            const k = ha(y.status), b = xa(y.status), T = x.includes(y.id);
            return /* @__PURE__ */ l(
              "li",
              {
                "data-testid": `runs-panel-row-${y.id}`,
                onClick: () => {
                  h ? N(y.id) : f(y.id);
                },
                className: $(
                  "cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover",
                  T && "bg-[#eff6ff]"
                ),
                children: [
                  /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
                    h && /* @__PURE__ */ n(
                      "input",
                      {
                        type: "checkbox",
                        checked: T,
                        onChange: () => N(y.id),
                        onClick: (I) => I.stopPropagation(),
                        "data-testid": `runs-panel-compare-check-${y.id}`,
                        className: "m-0 shrink-0 accent-primary",
                        "aria-label": `Select run ${y.id.slice(0, 8)} for comparison`
                      }
                    ),
                    /* @__PURE__ */ n(xe, { tone: k, "aria-label": `Status: ${b}`, children: b }),
                    /* @__PURE__ */ n("span", { className: "font-mono text-xs text-text-secondary", children: y.id.slice(0, 8) }),
                    /* @__PURE__ */ n("span", { className: "ml-auto text-[11px] text-text-tertiary", children: fa(y.startedAt) })
                  ] }),
                  /* @__PURE__ */ l("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ n("span", { children: ve(y.durationMs) }),
                    y.estimatedCostUsd != null && y.estimatedCostUsd > 0 && /* @__PURE__ */ n(
                      "span",
                      {
                        className: $("font-mono font-semibold", ma(y.estimatedCostUsd)),
                        title: `Estimated cost: ${Rn(y.estimatedCostUsd)}`,
                        children: Rn(y.estimatedCostUsd)
                      }
                    ),
                    y.estimatedCostUsd != null && y.estimatedCostUsd > 1 && /* @__PURE__ */ n("span", { className: "rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "High Cost" }),
                    /* @__PURE__ */ n("span", { className: "ml-auto", children: ga(y) })
                  ] }),
                  y.error && /* @__PURE__ */ n("div", { className: "mt-1 truncate text-[11px] text-state-failed", children: y.error.message })
                ]
              },
              y.id
            );
          }) })
        ] })
      ]
    }
  );
}
function ya({
  pipelineId: e,
  selectedNodeId: t,
  sidebarTab: r,
  onTabChange: s
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      className: $(
        "w-[350px] shrink-0 border-l border-border bg-surface",
        "flex flex-col overflow-hidden"
      ),
      "data-testid": "right-sidebar",
      children: [
        !(t !== null && r === "config") && /* @__PURE__ */ l("div", { className: "h-[38px] flex border-b border-border shrink-0", children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: $(
                "flex-1 border-none bg-transparent text-xs font-semibold",
                "cursor-pointer font-inherit px-2",
                r === "config" ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"
              ),
              onClick: () => s("config"),
              "data-testid": "sidebar-tab-config",
              children: "Config"
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: $(
                "flex-1 border-none bg-transparent text-xs font-semibold",
                "cursor-pointer font-inherit px-2",
                r === "runs" ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"
              ),
              onClick: () => s("runs"),
              "data-testid": "sidebar-tab-runs",
              children: "Runs"
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { className: "flex-1 overflow-y-auto flex flex-col", children: [
          r === "config" && (t !== null ? /* @__PURE__ */ n(aa, {}) : /* @__PURE__ */ n("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          r === "runs" && /* @__PURE__ */ n(
            ba,
            {
              pipelineId: e,
              onClose: () => s("config")
            }
          )
        ] })
      ]
    }
  );
}
function va(e) {
  return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function wa(e) {
  if (!e) return [];
  const t = /* @__PURE__ */ new Set(), r = /\{\{\s*context\.([a-zA-Z0-9_.]+)\s*\}\}/g;
  for (const s of e.nodes) {
    const i = s.data;
    if (i.type === "llm") {
      for (const o of (i.userPromptTemplate || "").matchAll(r))
        o[1].startsWith("steps.") || t.add(o[1]);
      for (const o of (i.systemPrompt || "").matchAll(r))
        o[1].startsWith("steps.") || t.add(o[1]);
    } else if (i.type === "transform" && i.expression)
      for (const o of i.expression.matchAll(r))
        o[1].startsWith("steps.") || t.add(o[1]);
  }
  return Array.from(t);
}
function Na(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable);
}
function ed() {
  const { pipelineId: e } = at(), t = F(() => e ? Re(e) !== null : !1, [e]);
  return !e || !t ? /* @__PURE__ */ n(lt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ n(sr, { pipelineId: e, children: /* @__PURE__ */ n(ka, { pipelineId: e }) });
}
function ka({ pipelineId: e }) {
  const t = Ee(), r = dt(), s = nt(), { toast: i } = Pt(), {
    definition: o,
    dirty: d,
    selectedNodeId: c,
    setSelectedNodeId: a,
    save: p,
    publish: f,
    revert: h,
    undo: m,
    redo: x,
    setTags: g
  } = r, u = fi(e), [v, w] = R(!1), N = oe(null), C = oe(d);
  G(() => (C.current && !d && (w(!0), N.current && clearTimeout(N.current), N.current = setTimeout(() => w(!1), 450)), C.current = d, () => {
    N.current && (clearTimeout(N.current), N.current = null);
  }), [d]);
  const y = F(
    () => o ? pr(o) : null,
    [o]
  ), k = (y?.errors.length ?? 0) > 0, b = F(
    () => wa(o),
    [o]
  ), I = F(() => o ? o.nodes.some((pe) => pe.type === "trigger") : !1, [o]) ? ["trigger"] : [], [S, D] = R(!0), [_, W] = R(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), Q = M(() => {
    W((pe) => {
      const J = !pe;
      try {
        window.localStorage.setItem(
          "ws_pipelines_v1_show_tags",
          J ? "true" : "false"
        );
      } catch {
      }
      return J;
    });
  }, []), [ee, de] = R(!1), [O, U] = R(!1), [P, B] = R(!1), [K, j] = R(!1), [X, Z] = R(!1), le = F(() => o?.publishedSnapshot ? o.publishedSnapshot : null, [o]), be = o?.status === "published", L = !u.isRunActive && (!be || k), re = u.isRunActive ? "Cancel the active run" : be ? k ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", ge = M(async () => {
    if (u.isRunActive && u.currentRunId) {
      s.cancelRun(u.currentRunId);
      return;
    }
    if (!L) {
      if (b.length > 0) {
        u.setTriggerInputValues(
          Object.fromEntries(b.map((pe) => [pe, ""]))
        ), u.setTriggerInputOpen(!0);
        return;
      }
      u.handleRunClick();
    }
  }, [u, s, L, b]);
  G(() => {
    const pe = (J) => {
      if (Na(J.target)) return;
      const q = J.metaKey || J.ctrlKey;
      if (q && J.key.toLowerCase() === "s") {
        J.preventDefault(), p(), i("Saved", { type: "success", durationMs: 1200 });
        return;
      }
      if (q && J.key === "Enter") {
        J.preventDefault(), ge();
        return;
      }
      if (q && J.key === ".") {
        J.preventDefault(), u.isRunActive && u.currentRunId && s.cancelRun(u.currentRunId);
        return;
      }
      if (q && J.shiftKey && J.key.toLowerCase() === "z") {
        J.preventDefault(), x();
        return;
      }
      if (q && J.key.toLowerCase() === "z") {
        J.preventDefault(), m();
        return;
      }
      if (J.key === "Escape") {
        a(null);
        return;
      }
    };
    return window.addEventListener("keydown", pe), () => window.removeEventListener("keydown", pe);
  }, [p, i, ge, u, s, m, x, a]);
  const $e = () => {
    if (!o) return;
    const pe = nn(o.id);
    pe && t(`/pipelines/${pe.id}`);
  }, Ke = () => {
    if (!o) return;
    const pe = Wt(o.id);
    pe && xt(`${va(o.name)}.pipeline.json`, pe);
  }, Oe = async () => {
    if (!o) return;
    const pe = ii(o);
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(pe), i("Mermaid diagram copied", { type: "success" });
      else
        throw new Error("clipboard unavailable");
    } catch (J) {
      console.warn("[PipelineEditor] clipboard write failed", J), i("Could not copy Mermaid diagram", { type: "error" });
    }
  }, Ae = () => {
    j(!0);
  }, Le = () => {
    de(!1), !k && (f(), i("Pipeline published", { type: "success" }));
  }, Ue = () => {
    o && (nr(o.id), U(!1), t("/pipelines"));
  }, Be = () => {
    ar(e), B(!1), i("Run history cleared", { type: "success" });
  }, ye = u.currentRunId ? s.runs[u.currentRunId] : void 0;
  return o ? /* @__PURE__ */ l(
    "div",
    {
      className: $(
        "flex flex-col min-h-[calc(100vh-200px)]",
        "bg-surface-inset font-inherit text-text-primary",
        "rounded-lg border border-border overflow-hidden"
      ),
      "data-testid": "pipeline-editor",
      children: [
        /* @__PURE__ */ n(
          xi,
          {
            pipelineId: e,
            definition: o,
            dirty: d,
            savingFlash: v,
            isRunActive: u.isRunActive,
            isTriggering: u.isTriggering,
            runDisabled: L,
            runTitle: re,
            currentRun: ye,
            breakpoints: u.breakpoints,
            onRunClick: ge,
            onDebugRunClick: u.handleDebugRunClick,
            onExport: Ke,
            onPublishClick: () => de(!0),
            onDuplicate: $e,
            onCopyMermaid: Oe,
            onViewVersions: Ae,
            onRevert: h,
            onToggleShowTags: Q,
            showTags: _,
            onViewRunHistory: () => u.setSidebarTab("runs"),
            onClearRunHistory: () => B(!0),
            onSimPanelOpen: () => Z(!0),
            onDelete: () => U(!0)
          }
        ),
        _ && /* @__PURE__ */ l(
          "div",
          {
            "data-testid": "tags-row",
            className: $(
              "flex items-center gap-2 px-4 py-1.5",
              "border-b border-slate-200 bg-[#fafbfc]",
              "min-h-[34px] shrink-0 sticky top-11 z-[4]"
            ),
            children: [
              /* @__PURE__ */ n("span", { className: "text-[11px] text-slate-400 font-semibold", children: "TAGS" }),
              /* @__PURE__ */ n(
                Kr,
                {
                  value: o.tags ?? [],
                  onChange: g,
                  placeholder: "add tag…"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ l("div", { className: "flex-1 flex min-h-0 relative overflow-hidden", children: [
          /* @__PURE__ */ n(ls, { disabledTypes: I }),
          /* @__PURE__ */ n("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ n(
            ks,
            {
              errorNodeId: u.activeError?.nodeId ?? null,
              onErrorNodePosition: u.handleErrorNodePosition,
              breakpoints: u.breakpoints,
              onToggleBreakpoint: u.handleToggleBreakpoint,
              pausedAtNodeId: u.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ n(
            ya,
            {
              pipelineId: e,
              selectedNodeId: c,
              sidebarTab: u.sidebarTab,
              onTabChange: u.setSidebarTab
            }
          )
        ] }),
        u.pausedBreakpoint && /* @__PURE__ */ n(
          Ti,
          {
            definition: o,
            pausedBreakpoint: u.pausedBreakpoint,
            applyingPatch: u.applyingPatch,
            revertingPatchId: u.revertingPatchId,
            dirtyPatch: u.dirtyPatch,
            dirtyPatchStepId: u.dirtyPatchStepId,
            resetEditBufferKey: u.resetEditBufferKey,
            onContinue: u.handleBreakpointContinue,
            onStepOver: u.handleBreakpointStepOver,
            onResumeAll: u.handleBreakpointResumeAll,
            onApplyAndContinue: u.handleApplyAndContinue,
            onRevertPatch: u.handleRevertPatch,
            onEditBufferChange: u.handleContextEditBufferChange
          }
        ),
        u.activeError && u.errorNodeAnchor && /* @__PURE__ */ n(
          Is,
          {
            error: u.activeError,
            anchor: u.errorNodeAnchor,
            onDismiss: u.handleDismissError,
            onRetry: u.handleRetryFromError
          }
        ),
        /* @__PURE__ */ n(
          mi,
          {
            runId: u.currentRunId,
            visible: u.isRunActive && S
          }
        ),
        /* @__PURE__ */ n(
          ui,
          {
            publishConfirmOpen: ee,
            onPublishClose: () => de(!1),
            onPublishConfirm: Le,
            hasErrors: k,
            validationErrorCount: y?.errors.length ?? 0,
            definitionName: o.name,
            definitionVersion: o.version,
            deleteConfirmOpen: O,
            onDeleteClose: () => U(!1),
            onDeleteConfirm: Ue,
            clearRunsConfirmOpen: P,
            onClearRunsClose: () => B(!1),
            onClearRunsConfirm: Be,
            versionDiffOpen: K,
            onVersionDiffClose: () => j(!1),
            currentDef: o,
            publishedDef: le,
            onJumpToNode: a,
            simPanelOpen: X,
            onSimPanelClose: () => Z(!1)
          }
        ),
        /* @__PURE__ */ n(
          ze,
          {
            open: u.triggerInputOpen,
            onClose: () => u.setTriggerInputOpen(!1),
            title: "Trigger inputs",
            maxWidth: 480,
            footer: /* @__PURE__ */ l(ne, { children: [
              /* @__PURE__ */ n(Fe, { variant: "ghost", onClick: () => u.setTriggerInputOpen(!1), children: "Cancel" }),
              /* @__PURE__ */ n(
                Fe,
                {
                  variant: "primary",
                  onClick: u.handleTriggerInputSubmit,
                  disabled: b.some((pe) => !u.triggerInputValues[pe]?.trim()),
                  children: "Run"
                }
              )
            ] }),
            children: /* @__PURE__ */ l("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ n("p", { className: "m-0 text-xs text-text-secondary", children: "This pipeline expects input data. Provide values for the trigger context:" }),
              b.map((pe) => /* @__PURE__ */ l("label", { className: "flex flex-col gap-1 text-xs", children: [
                /* @__PURE__ */ n("span", { className: "font-medium text-text-primary", children: pe }),
                /* @__PURE__ */ n(
                  "textarea",
                  {
                    "data-autofocus": pe === b[0] ? !0 : void 0,
                    rows: 3,
                    className: "resize-y px-2 py-1.5 rounded-md border border-border text-xs font-inherit",
                    value: u.triggerInputValues[pe] ?? "",
                    onChange: (J) => u.setTriggerInputValues((q) => ({ ...q, [pe]: J.target.value }))
                  }
                )
              ] }, pe))
            ] })
          }
        )
      ]
    }
  ) : /* @__PURE__ */ n(
    "div",
    {
      className: $(
        "flex flex-col min-h-[calc(100vh-200px)]",
        "bg-surface-inset font-inherit text-text-primary",
        "rounded-lg border border-border overflow-hidden"
      ),
      children: /* @__PURE__ */ n("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]", children: "Loading pipeline…" })
    }
  );
}
function Ca(e) {
  const t = e?.event;
  return !t || t === "manual" ? { icon: "▶", text: "Manual" } : t === "schedule" ? { icon: "⏱", text: e?.schedule ?? "Schedule" } : t === "webhook" ? { icon: "🔌", text: e?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${e?.event}` };
}
function Ia({
  row: e,
  onOpen: t,
  onRun: r,
  onDuplicate: s,
  onExport: i,
  onDelete: o,
  selectionMode: d,
  selected: c,
  anySelected: a,
  onToggleSelect: p
}) {
  const [f, h] = R(!1), [m, x] = R(!1), g = oe(null);
  st(g, () => h(!1), f);
  const u = e.status === "published", v = e.status === "archived", w = typeof e.publishedVersion == "number", N = Ca(e.triggerBinding);
  let C, y;
  v ? (C = `Archived · v${e.version}`, y = "danger") : u ? (C = `Published · v${e.version}`, y = "success") : w ? (C = `Draft · v${e.version} (published v${e.publishedVersion})`, y = "warning") : (C = `Draft · v${e.version}`, y = "neutral");
  const k = !u, b = (S) => (D) => {
    D.stopPropagation(), S();
  }, T = d || c || m || a, I = (S) => {
    d ? p(S.shiftKey) : t();
  };
  return /* @__PURE__ */ l(
    "div",
    {
      "data-testid": `pipeline-card-${e.id}`,
      "data-selected": c ? "true" : "false",
      onClick: I,
      onMouseEnter: () => x(!0),
      onMouseLeave: () => {
        x(!1), h(!1);
      },
      className: $(
        "flex flex-col gap-2 w-full px-3.5 py-3 bg-surface rounded-lg cursor-pointer relative transition-[border-color,box-shadow] duration-100",
        c ? "border border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : m ? "border border-primary shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "border border-border shadow-none"
      ),
      children: [
        T && /* @__PURE__ */ n(
          "label",
          {
            onClick: (S) => S.stopPropagation(),
            className: "absolute top-2 right-2 flex items-center justify-center w-[22px] h-[22px] cursor-pointer z-[1]",
            children: /* @__PURE__ */ n(
              "input",
              {
                type: "checkbox",
                "data-testid": `pipeline-select-${e.id}`,
                checked: c,
                onClick: (S) => {
                  S.stopPropagation(), p(S.shiftKey);
                },
                onKeyDown: (S) => {
                  (S.key === " " || S.key === "Spacebar") && (S.preventDefault(), p(S.shiftKey));
                },
                onChange: () => {
                },
                className: "cursor-pointer w-4 h-4 accent-primary"
              }
            )
          }
        ),
        /* @__PURE__ */ l("div", { className: $("flex items-center gap-2 min-w-0", T && "pr-7"), children: [
          /* @__PURE__ */ n("span", { className: "text-lg shrink-0", "aria-hidden": !0, children: e.icon }),
          /* @__PURE__ */ n(
            "div",
            {
              className: "flex-1 min-w-0 text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
              title: e.name,
              children: e.name
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ n(xe, { "aria-label": `Status: ${C}`, tone: y, size: "sm", children: C }),
          /* @__PURE__ */ l("span", { className: "text-[11px] text-text-secondary", children: [
            N.icon,
            " ",
            N.text
          ] }),
          /* @__PURE__ */ l("span", { className: "text-[11px] text-text-tertiary", children: [
            "· ",
            e.nodeCount,
            " node",
            e.nodeCount === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ l("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ n(
            "button",
            {
              "data-testid": `run-pipeline-${e.id}`,
              onClick: b(r),
              disabled: k,
              title: k ? "Run requires published state" : "Run pipeline",
              className: "px-3 py-[5px] text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
              children: "Run"
            }
          ),
          /* @__PURE__ */ n(
            "button",
            {
              "data-testid": `edit-pipeline-${e.id}`,
              onClick: b(t),
              className: "px-3 py-[5px] text-xs font-semibold bg-surface text-text-secondary border border-border-field rounded-md cursor-pointer font-[inherit]",
              children: "Edit"
            }
          ),
          /* @__PURE__ */ l("div", { className: "relative ml-auto", ref: g, children: [
            /* @__PURE__ */ n(
              "button",
              {
                "data-testid": `overflow-pipeline-${e.id}`,
                onClick: b(() => h((S) => !S)),
                "aria-label": "More actions",
                className: "px-2 py-1 text-sm font-bold bg-transparent text-text-secondary border border-transparent rounded-md cursor-pointer font-[inherit] leading-none",
                children: "⋯"
              }
            ),
            f && /* @__PURE__ */ l(
              "div",
              {
                "data-testid": `overflow-menu-${e.id}`,
                role: "menu",
                onClick: (S) => S.stopPropagation(),
                className: "absolute right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-[0_8px_24px_rgba(15,23,42,0.12)] min-w-[160px] z-10 overflow-hidden",
                children: [
                  /* @__PURE__ */ n("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: b(() => {
                    h(!1), s();
                  }), children: "Duplicate" }),
                  /* @__PURE__ */ n("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: b(() => {
                    h(!1), i();
                  }), children: "Export JSON" }),
                  /* @__PURE__ */ n(
                    "button",
                    {
                      className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-[#dc2626]",
                      role: "menuitem",
                      onClick: b(() => {
                        h(!1), o();
                      }),
                      children: "Delete"
                    }
                  )
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const Sa = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, Ta = ["draft", "published"];
function Aa({
  search: e,
  onSearchChange: t,
  statusFilter: r,
  statusExplicit: s,
  onToggleStatusKey: i,
  triggerFilter: o,
  onTriggerFilterChange: d,
  sortKey: c,
  onSortKeyChange: a,
  allVisibleSelected: p,
  selectAllRef: f,
  onHeaderToggleAll: h
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      className: $(
        "min-h-[40px] shrink-0 flex items-center gap-3 px-6",
        "border-b border-border bg-white"
      ),
      children: [
        /* @__PURE__ */ l(
          "label",
          {
            className: "flex items-center gap-1.5 cursor-pointer",
            title: "Select all visible pipelines",
            children: [
              /* @__PURE__ */ n(
                "input",
                {
                  ref: f,
                  type: "checkbox",
                  "data-testid": "pipeline-select-all",
                  "aria-label": "Select all visible pipelines",
                  checked: p,
                  onChange: h,
                  className: "w-3.5 h-3.5 accent-primary"
                }
              ),
              /* @__PURE__ */ n("span", { className: "text-[11px] text-text-tertiary", children: "All" })
            ]
          }
        ),
        /* @__PURE__ */ n(
          "input",
          {
            "data-testid": "pipeline-search",
            type: "search",
            placeholder: "Search...",
            value: e,
            onChange: (m) => t(m.target.value),
            className: $(
              "border border-border-field rounded-md px-2.5 py-1.5 text-[13px]",
              "bg-[#f9fafb] text-text-primary outline-none",
              "flex-[0_1_260px] min-w-[180px]"
            )
          }
        ),
        /* @__PURE__ */ n(
          "span",
          {
            id: "pipelines-status-label",
            className: "text-xs text-text-secondary font-medium",
            children: "Status:"
          }
        ),
        /* @__PURE__ */ n(
          "div",
          {
            role: "group",
            "aria-labelledby": "pipelines-status-label",
            className: "flex gap-1.5 flex-nowrap shrink-0",
            children: an.map((m) => {
              const x = s ? r.has(m) : Ta.includes(m);
              return /* @__PURE__ */ n(
                "button",
                {
                  type: "button",
                  role: "checkbox",
                  "aria-checked": x,
                  "data-testid": `status-chip-${m}`,
                  onClick: () => i(m),
                  onKeyDown: (g) => {
                    (g.key === "Enter" || g.key === " ") && (g.preventDefault(), i(m));
                  },
                  className: $(
                    "px-3 py-1.5 text-xs font-medium rounded cursor-pointer font-inherit",
                    x ? "border border-primary bg-primary text-white" : "border border-border bg-white text-text-secondary"
                  ),
                  children: Sa[m]
                },
                m
              );
            })
          }
        ),
        /* @__PURE__ */ l("label", { className: "text-xs text-text-secondary flex items-center gap-1.5", children: [
          "Trigger:",
          /* @__PURE__ */ l(
            "select",
            {
              "data-testid": "trigger-filter",
              value: o,
              onChange: (m) => d(m.target.value),
              className: $(
                "border border-border-field rounded-md px-2 py-1 text-[13px]",
                "bg-[#f9fafb] text-text-primary outline-none"
              ),
              children: [
                /* @__PURE__ */ n("option", { value: "all", children: "All" }),
                /* @__PURE__ */ n("option", { value: "manual", children: "Manual" }),
                /* @__PURE__ */ n("option", { value: "document", children: "Document event" }),
                /* @__PURE__ */ n("option", { value: "schedule", children: "Schedule" }),
                /* @__PURE__ */ n("option", { value: "webhook", children: "Webhook" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ l("label", { className: "text-xs text-text-secondary flex items-center gap-1.5 ml-auto", children: [
          "Sort:",
          /* @__PURE__ */ l(
            "select",
            {
              "data-testid": "sort-key",
              value: c,
              onChange: (m) => a(m.target.value),
              className: $(
                "border border-border-field rounded-md px-2 py-1 text-[13px]",
                "bg-[#f9fafb] text-text-primary outline-none"
              ),
              children: [
                /* @__PURE__ */ n("option", { value: "updated", children: "Recently updated" }),
                /* @__PURE__ */ n("option", { value: "name", children: "Name A-Z" }),
                /* @__PURE__ */ n("option", { value: "created", children: "Recently created" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
const Ve = $(
  "px-2.5 py-[5px] text-xs font-semibold",
  "bg-white text-text-secondary",
  "border border-border-field rounded-md",
  "cursor-pointer font-inherit"
);
function Da({
  count: e,
  onClear: t,
  onExport: r,
  onExportAsJSON: s,
  onPublish: i,
  onArchive: o,
  onAddTag: d,
  onRemoveTag: c,
  onDelete: a,
  onDeleteWithConfirm: p,
  addTagOpen: f,
  removeTagOpen: h,
  onSubmitAddTag: m,
  onSubmitRemoveTag: x,
  onCloseAddTag: g,
  onCloseRemoveTag: u,
  unionTags: v
}) {
  const [w, N] = R(""), C = oe(null), y = oe(null), k = oe(null);
  G(() => {
    f && (N(""), setTimeout(() => C.current?.focus(), 30));
  }, [f]), G(() => {
    if (!f) return;
    const T = (S) => {
      y.current?.contains(S.target) || g();
    }, I = window.setTimeout(() => {
      document.addEventListener("mousedown", T);
    }, 0);
    return () => {
      window.clearTimeout(I), document.removeEventListener("mousedown", T);
    };
  }, [f, g]), G(() => {
    if (!h) return;
    const T = (S) => {
      k.current?.contains(S.target) || u();
    }, I = window.setTimeout(() => {
      document.addEventListener("mousedown", T);
    }, 0);
    return () => {
      window.clearTimeout(I), document.removeEventListener("mousedown", T);
    };
  }, [h, u]);
  const b = () => {
    const T = w.trim();
    T.length !== 0 && (m(T), N(""));
  };
  return /* @__PURE__ */ l(
    "div",
    {
      "data-testid": "bulk-action-bar",
      className: $(
        "min-h-[40px] shrink-0 flex items-center gap-3 px-6",
        "border-b border-border bg-[#eef2ff]",
        "sticky top-[56px] z-[1]"
      ),
      children: [
        /* @__PURE__ */ l(
          "span",
          {
            "data-testid": "bulk-count",
            className: "text-[13px] font-semibold text-text-primary",
            children: [
              e,
              " selected"
            ]
          }
        ),
        /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "·" }),
        /* @__PURE__ */ n("button", { "data-testid": "bulk-clear", className: Ve, onClick: t, children: "Clear" }),
        /* @__PURE__ */ n("button", { "data-testid": "bulk-publish", className: Ve, onClick: i, children: "Publish selected" }),
        /* @__PURE__ */ n("button", { "data-testid": "bulk-archive", className: Ve, onClick: o, children: "Archive selected" }),
        /* @__PURE__ */ n("button", { "data-testid": "bulk-export-json", className: Ve, onClick: s, children: "Export selected as JSON" }),
        /* @__PURE__ */ n("button", { "data-testid": "bulk-export", className: Ve, onClick: r, children: "Export all" }),
        /* @__PURE__ */ n(
          "button",
          {
            "data-testid": "bulk-delete-confirm-prompt",
            className: Ve,
            onClick: p,
            children: "Delete selected"
          }
        ),
        /* @__PURE__ */ l("div", { className: "relative", children: [
          /* @__PURE__ */ n("button", { "data-testid": "bulk-add-tag-btn", className: Ve, onClick: d, children: "Add tag..." }),
          f && /* @__PURE__ */ l(
            "div",
            {
              ref: y,
              "data-testid": "bulk-add-tag-popover",
              onClick: (T) => T.stopPropagation(),
              className: $(
                "absolute top-full left-0 mt-1.5",
                "bg-white border border-border rounded-lg",
                "shadow-lg min-w-[220px] p-2.5 z-10",
                "flex flex-col gap-2"
              ),
              children: [
                /* @__PURE__ */ n(
                  "input",
                  {
                    ref: C,
                    type: "text",
                    "data-testid": "bulk-add-tag-input",
                    placeholder: "Tag name",
                    value: w,
                    onChange: (T) => N(T.target.value),
                    onKeyDown: (T) => {
                      T.key === "Enter" ? (T.preventDefault(), b()) : T.key === "Escape" && (T.preventDefault(), g());
                    },
                    className: $(
                      "border border-border-field rounded-md px-2.5 py-1.5 text-[13px]",
                      "bg-[#f9fafb] text-text-primary outline-none w-full"
                    )
                  }
                ),
                /* @__PURE__ */ n(
                  "button",
                  {
                    "data-testid": "bulk-add-tag-submit",
                    disabled: w.trim().length === 0,
                    onClick: b,
                    className: $(
                      "px-2.5 py-[5px] text-xs font-semibold",
                      "bg-primary text-white border-none rounded-md",
                      "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    ),
                    children: "Add"
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { className: "relative", children: [
          /* @__PURE__ */ n(
            "button",
            {
              "data-testid": "bulk-remove-tag-btn",
              className: $(
                Ve,
                v.length === 0 && "opacity-50 cursor-not-allowed"
              ),
              onClick: c,
              disabled: v.length === 0,
              title: v.length === 0 ? "No tags on selected pipelines" : "Remove tag from selected",
              children: "Remove tag..."
            }
          ),
          h && /* @__PURE__ */ l(
            "div",
            {
              ref: k,
              "data-testid": "bulk-remove-tag-popover",
              onClick: (T) => T.stopPropagation(),
              className: $(
                "absolute top-full left-0 mt-1.5",
                "bg-white border border-border rounded-lg",
                "shadow-lg min-w-[220px] max-w-[320px] p-2.5 z-10",
                "flex flex-col gap-2"
              ),
              children: [
                /* @__PURE__ */ n("div", { className: "text-xs text-text-secondary", children: "Click a tag to remove it from all selected:" }),
                /* @__PURE__ */ n("div", { className: "flex flex-wrap gap-1.5", children: v.length === 0 ? /* @__PURE__ */ n("div", { className: "text-xs text-text-tertiary", children: "No tags to remove." }) : v.map((T) => /* @__PURE__ */ l(
                  "button",
                  {
                    "data-testid": `bulk-remove-tag-chip-${T}`,
                    onClick: () => x(T),
                    className: $(
                      "px-2 py-0.5 text-xs font-medium",
                      "bg-red-50 text-red-600",
                      "border border-red-200 rounded-full",
                      "cursor-pointer font-inherit"
                    ),
                    children: [
                      T,
                      " ✕"
                    ]
                  },
                  T
                )) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            "data-testid": "bulk-delete",
            className: $(
              "px-3 py-[5px] text-xs font-semibold",
              "bg-red-600 text-white border-none rounded-md",
              "cursor-pointer font-inherit ml-auto"
            ),
            onClick: a,
            children: "Delete"
          }
        )
      ]
    }
  );
}
function Ra({
  visibleRows: e,
  filteredIds: t
}) {
  const [r, s] = R(!1), [i, o] = R(/* @__PURE__ */ new Set()), d = oe(null), c = oe(null), a = M(() => {
    o(/* @__PURE__ */ new Set());
  }, []), p = M(() => {
    r ? (a(), s(!1)) : s(!0);
  }, [r, a]), f = M(
    (u, v = !1) => {
      const w = e, N = w.findIndex((y) => y.id === u), C = d.current;
      N !== -1 && (d.current = N), o((y) => {
        const k = new Set(y), b = !k.has(u);
        if (v && C != null && N !== -1) {
          const T = Math.min(C, N), I = Math.max(C, N);
          for (let S = T; S <= I; S++) {
            const D = w[S];
            D && (b ? k.add(D.id) : k.delete(D.id));
          }
        } else b ? k.add(u) : k.delete(u);
        return k;
      });
    },
    [e]
  ), h = M(() => {
    o(new Set(t));
  }, [t]), m = e.length > 0 && e.every((u) => i.has(u.id)), x = !m && e.some((u) => i.has(u.id)), g = M(() => {
    o((u) => {
      const v = new Set(u);
      if (m)
        for (const w of e) v.delete(w.id);
      else
        for (const w of e) v.add(w.id);
      return v;
    }), r || s(!0);
  }, [m, e, r]);
  return G(() => {
    c.current && (c.current.indeterminate = x);
  }, [x]), {
    selectionMode: r,
    selected: i,
    allVisibleSelected: m,
    someVisibleSelected: x,
    selectAllRef: c,
    handleToggleSelectMode: p,
    handleToggleSelect: f,
    handleSelectAllFiltered: h,
    handleHeaderToggleAll: g,
    clearSelection: a,
    setSelectionMode: s
  };
}
const $a = 280, he = 160, Pa = 40, Ma = 200;
function H(e) {
  return Pa + e * $a;
}
function z(e) {
  return Ma + e * he;
}
function V(e, t, r, s = "in") {
  return {
    id: crypto.randomUUID(),
    source: e,
    sourceHandle: t,
    target: r,
    targetHandle: s
  };
}
function Ea(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), o = {
    type: "trigger",
    triggerType: "document.finalize"
  }, d = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Summarize the following document in 2-3 concise sentences.",
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0.3,
    maxTokens: 512,
    streaming: !0
  }, c = {
    type: "action",
    actionType: "post-comment",
    config: { body: `{{context.steps.${s}.response}}` },
    idempotent: !0,
    onError: "fail-run"
  }, a = [
    { id: r, type: "trigger", position: { x: H(0), y: z(0) }, data: o },
    { id: s, type: "llm", position: { x: H(1), y: z(0) }, data: d },
    { id: i, type: "action", position: { x: H(2), y: z(0) }, data: c }
  ], p = [
    V(r, "out", s),
    V(s, "out", i)
  ];
  return {
    id: crypto.randomUUID(),
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    version: 1,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "document.finalize" },
    nodes: a,
    edges: p,
    createdAt: t,
    updatedAt: t,
    createdBy: e
  };
}
function Oa(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), o = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), a = crypto.randomUUID(), p = {
    type: "trigger",
    triggerType: "document.finalize",
    documentTypeId: "meeting-notes"
  }, f = {
    type: "fork",
    branchCount: 2,
    branchLabels: ["action-items", "summary"]
  }, h = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Extract action items from these meeting notes. Respond as a JSON array of {assignee, task, dueDate?}.",
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0.2,
    maxTokens: 1024,
    streaming: !1
  }, m = {
    type: "action",
    actionType: "update-document",
    config: {
      field: "tasks",
      value: `{{context.steps.${i}.response}}`
    },
    idempotent: !0,
    onError: "route-error"
  }, x = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Write a short team-friendly summary of this meeting.",
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0.4,
    maxTokens: 512,
    streaming: !0
  }, g = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "team",
      message: `Meeting summary: {{context.steps.${d}.response}}`
    },
    idempotent: !1,
    onError: "route-error"
  }, u = {
    type: "join",
    mode: "all",
    mergeStrategy: "deep-merge"
  }, v = [
    { id: r, type: "trigger", position: { x: H(0), y: z(0) }, data: p },
    { id: s, type: "fork", position: { x: H(1), y: z(0) }, data: f },
    { id: i, type: "llm", position: { x: H(2), y: z(0) - he / 2 }, data: h },
    { id: o, type: "action", position: { x: H(3), y: z(0) - he / 2 }, data: m },
    { id: d, type: "llm", position: { x: H(2), y: z(0) + he / 2 }, data: x },
    { id: c, type: "action", position: { x: H(3), y: z(0) + he / 2 }, data: g },
    { id: a, type: "join", position: { x: H(4), y: z(0) }, data: u }
  ], w = [
    V(r, "out", s),
    V(s, "branch-0", i),
    V(i, "out", o),
    V(o, "out", a, "in-0"),
    V(s, "branch-1", d),
    V(d, "out", c),
    V(c, "out", a, "in-1")
  ];
  return {
    id: crypto.randomUUID(),
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a summary in parallel when meeting notes are finalized.",
    icon: "📝",
    version: 1,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "document.finalize", documentTypeId: "meeting-notes" },
    nodes: v,
    edges: w,
    createdAt: t,
    updatedAt: t,
    createdBy: e
  };
}
function Ua(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), o = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), a = crypto.randomUUID(), p = crypto.randomUUID(), f = crypto.randomUUID(), h = {
    type: "trigger",
    triggerType: "document.comment"
  }, m = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'Classify the safety of this content. Respond with JSON {"safe": boolean, "reason": string}.',
    userPromptTemplate: "{{context.commentBody}}",
    temperature: 0,
    maxTokens: 128,
    streaming: !1
  }, x = {
    type: "condition",
    expression: `context.steps.${s}.output.safe === true`,
    label: "Safe?"
  }, g = {
    type: "action",
    actionType: "post-comment",
    config: { body: "{{context.commentBody}}" },
    idempotent: !0,
    onError: "fail-run"
  }, u = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "moderation",
      message: `Flagged comment: {{context.steps.${s}.output.reason}}`
    },
    idempotent: !0,
    onError: "fail-run"
  }, v = {
    type: "approval",
    approvers: [{ type: "role", value: "moderator" }],
    requiredCount: 1,
    timeoutMs: 1440 * 60 * 1e3,
    timeoutAction: "reject",
    message: "This comment was flagged by the safety classifier. Approve to post, reject to delete."
  }, w = {
    type: "condition",
    expression: `context.steps.${c}.output.decision === 'approve'`,
    label: "Approved?"
  }, N = {
    type: "action",
    actionType: "post-comment",
    config: { body: "{{context.commentBody}}" },
    idempotent: !0,
    onError: "fail-run"
  }, C = {
    type: "action",
    actionType: "update-document",
    config: { field: "commentStatus", value: "deleted" },
    idempotent: !0,
    onError: "fail-run"
  }, y = [
    { id: r, type: "trigger", position: { x: H(0), y: z(0) }, data: h },
    { id: s, type: "llm", position: { x: H(1), y: z(0) }, data: m },
    { id: i, type: "condition", position: { x: H(2), y: z(0) }, data: x },
    { id: o, type: "action", position: { x: H(3), y: z(0) - he / 2 }, data: g },
    { id: d, type: "action", position: { x: H(3), y: z(0) + he / 2 }, data: u },
    { id: c, type: "approval", position: { x: H(4), y: z(0) + he / 2 }, data: v },
    { id: a, type: "condition", position: { x: H(5), y: z(0) + he / 2 }, data: w },
    { id: p, type: "action", position: { x: H(6), y: z(0) }, data: N },
    { id: f, type: "action", position: { x: H(6), y: z(0) + he }, data: C }
  ], k = [
    V(r, "out", s),
    V(s, "out", i),
    V(i, "true", o),
    V(i, "false", d),
    V(d, "out", c),
    V(c, "approved", a),
    V(c, "rejected", f),
    V(a, "true", p),
    V(a, "false", f)
  ];
  return {
    id: crypto.randomUUID(),
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    version: 1,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "document.comment" },
    nodes: y,
    edges: k,
    createdAt: t,
    updatedAt: t,
    createdBy: e
  };
}
function _a(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), o = crypto.randomUUID(), d = {
    type: "trigger",
    triggerType: "document.finalize"
  }, c = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Extract 3-8 relevant tags from this document. Respond with a JSON array of lowercase strings, no prose.",
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0.1,
    maxTokens: 256,
    streaming: !1
  }, a = {
    type: "transform",
    transformType: "jsonpath",
    expression: `$.steps.${s}.response`,
    outputKey: "tags"
  }, p = {
    type: "action",
    actionType: "update-document",
    config: { field: "tags", value: "{{context.tags}}" },
    idempotent: !0,
    onError: "fail-run"
  }, f = [
    { id: r, type: "trigger", position: { x: H(0), y: z(0) }, data: d },
    { id: s, type: "llm", position: { x: H(1), y: z(0) }, data: c },
    { id: i, type: "transform", position: { x: H(2), y: z(0) }, data: a },
    { id: o, type: "action", position: { x: H(3), y: z(0) }, data: p }
  ], h = [
    V(r, "out", s),
    V(s, "out", i),
    V(i, "out", o)
  ];
  return {
    id: crypto.randomUUID(),
    name: "Auto-tag Document",
    description: "Extract tags from a finalized document using an LLM and write them back to the document.",
    icon: "🏷️",
    version: 1,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "document.finalize" },
    nodes: f,
    edges: h,
    createdAt: t,
    updatedAt: t,
    createdBy: e
  };
}
function La(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), o = crypto.randomUUID(), d = {
    type: "trigger",
    triggerType: "document.finalize"
  }, c = {
    type: "approval",
    approvers: [{ type: "role", value: "team-lead" }],
    requiredCount: 1,
    timeoutMs: 2880 * 60 * 1e3,
    timeoutAction: "reject",
    message: "Team-lead approval required before this document can advance."
  }, a = {
    type: "approval",
    approvers: [{ type: "role", value: "director" }],
    requiredCount: 1,
    timeoutMs: 4320 * 60 * 1e3,
    timeoutAction: "reject",
    message: "Director approval required before publishing."
  }, p = {
    type: "action",
    actionType: "update-document",
    config: { field: "status", value: "published" },
    idempotent: !0,
    onError: "fail-run"
  }, f = [
    { id: r, type: "trigger", position: { x: H(0), y: z(0) }, data: d },
    { id: s, type: "approval", position: { x: H(1), y: z(0) }, data: c },
    { id: i, type: "approval", position: { x: H(2), y: z(0) }, data: a },
    { id: o, type: "action", position: { x: H(3), y: z(0) }, data: p }
  ], h = [
    V(r, "out", s),
    V(s, "approved", i),
    V(i, "approved", o)
  ];
  return {
    id: crypto.randomUUID(),
    name: "Approval Chain",
    description: "Require team-lead then director approval before publishing a finalized document.",
    icon: "✅",
    version: 1,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "document.finalize" },
    nodes: f,
    edges: h,
    createdAt: t,
    updatedAt: t,
    createdBy: e
  };
}
function Ba(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), o = crypto.randomUUID(), d = {
    type: "trigger",
    triggerType: "webhook",
    webhookPath: "/pipelines/webhooks/translate"
  }, c = {
    type: "transform",
    transformType: "jsonpath",
    expression: "$.payload.text",
    outputKey: "sourceText"
  }, a = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Translate the provided text into English. Respond with the translation only, no prose.",
    userPromptTemplate: "{{context.sourceText}}",
    temperature: 0.2,
    maxTokens: 1024,
    streaming: !0
  }, p = {
    type: "action",
    actionType: "post-comment",
    config: { body: `{{context.steps.${i}.response}}` },
    idempotent: !0,
    onError: "route-error"
  }, f = [
    { id: r, type: "trigger", position: { x: H(0), y: z(0) }, data: d },
    { id: s, type: "transform", position: { x: H(1), y: z(0) }, data: c },
    { id: i, type: "llm", position: { x: H(2), y: z(0) }, data: a },
    { id: o, type: "action", position: { x: H(3), y: z(0) }, data: p }
  ], h = [
    V(r, "out", s),
    V(s, "out", i),
    V(i, "out", o)
  ];
  return {
    id: crypto.randomUUID(),
    name: "Webhook → Translate → Publish",
    description: "Receive a webhook payload, extract text, translate to English, and post it as a comment.",
    icon: "🌐",
    version: 1,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "webhook", webhookPath: "/pipelines/webhooks/translate" },
    nodes: f,
    edges: h,
    createdAt: t,
    updatedAt: t,
    createdBy: e
  };
}
function Fa(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), o = {
    type: "trigger",
    triggerType: "schedule",
    schedule: "0 9 * * *"
  }, d = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Summarize all documents updated in the last 24 hours into a concise daily digest with bullet points.",
    userPromptTemplate: "{{context.recentDocuments}}",
    temperature: 0.3,
    maxTokens: 1024,
    streaming: !1
  }, c = {
    type: "action",
    actionType: "post-comment",
    config: { documentId: "digest-doc", body: `{{context.steps.${s}.response}}` },
    idempotent: !0,
    onError: "route-error"
  }, a = [
    { id: r, type: "trigger", position: { x: H(0), y: z(0) }, data: o },
    { id: s, type: "llm", position: { x: H(1), y: z(0) }, data: d },
    { id: i, type: "action", position: { x: H(2), y: z(0) }, data: c }
  ], p = [
    V(r, "out", s),
    V(s, "out", i)
  ];
  return {
    id: crypto.randomUUID(),
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    version: 1,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "schedule", schedule: "0 9 * * *" },
    nodes: a,
    edges: p,
    createdAt: t,
    updatedAt: t,
    createdBy: e
  };
}
function ja(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), o = { type: "trigger", triggerType: "document.submit" }, d = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Extract 3-6 relevant tags from this newly submitted document. Respond as a JSON array of lowercase strings, no prose.",
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0.2,
    maxTokens: 256,
    streaming: !1
  }, c = {
    type: "action",
    actionType: "update-document",
    config: { field: "tags", value: `{{context.steps.${s}.response}}` },
    idempotent: !0,
    onError: "fail-run"
  }, a = [
    { id: r, type: "trigger", position: { x: H(0), y: z(0) }, data: o },
    { id: s, type: "llm", position: { x: H(1), y: z(0) }, data: d },
    { id: i, type: "action", position: { x: H(2), y: z(0) }, data: c }
  ], p = [
    V(r, "out", s),
    V(s, "out", i)
  ];
  return {
    id: crypto.randomUUID(),
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    version: 1,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "document.submit" },
    nodes: a,
    edges: p,
    createdAt: t,
    updatedAt: t,
    createdBy: e
  };
}
function qa(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), o = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), a = { type: "trigger", triggerType: "document.finalize" }, p = {
    type: "fork",
    branchCount: 2,
    branchLabels: ["llm-review", "human-review"]
  }, f = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "You are a code/document reviewer. Provide a PR-style review with comments, suggestions, and an approval recommendation.",
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0.3,
    maxTokens: 1024,
    streaming: !1
  }, h = {
    type: "approval",
    approvers: [{ type: "role", value: "reviewer" }],
    requiredCount: 1,
    timeoutMs: 2880 * 60 * 1e3,
    timeoutAction: "reject",
    message: "Please review this document PR-style and approve or reject."
  }, m = { type: "join", mode: "all", mergeStrategy: "deep-merge" }, x = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "reviews",
      message: `Review complete: LLM said {{context.steps.${i}.response}}; reviewer decision: {{context.steps.${o}.output.decision}}`
    },
    idempotent: !1,
    onError: "route-error"
  }, g = [
    { id: r, type: "trigger", position: { x: H(0), y: z(0) }, data: a },
    { id: s, type: "fork", position: { x: H(1), y: z(0) }, data: p },
    { id: i, type: "llm", position: { x: H(2), y: z(0) - he / 2 }, data: f },
    { id: o, type: "approval", position: { x: H(2), y: z(0) + he / 2 }, data: h },
    { id: d, type: "join", position: { x: H(3), y: z(0) }, data: m },
    { id: c, type: "action", position: { x: H(4), y: z(0) }, data: x }
  ], u = [
    V(r, "out", s),
    V(s, "branch-0", i),
    V(i, "out", d, "in-0"),
    V(s, "branch-1", o),
    V(o, "approved", d, "in-1"),
    V(d, "out", c)
  ];
  return {
    id: crypto.randomUUID(),
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    version: 1,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "document.finalize" },
    nodes: g,
    edges: u,
    createdAt: t,
    updatedAt: t,
    createdBy: e
  };
}
function Ha(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), o = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), a = {
    type: "trigger",
    triggerType: "webhook",
    webhookPath: "/pipelines/webhooks/incident"
  }, p = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are an incident triage assistant. Read the alert payload (PagerDuty/Opsgenie shape) and respond with strict JSON {"severity": "critical"|"high"|"medium"|"low", "summary": string}. No prose.',
    userPromptTemplate: "{{context.payload}}",
    temperature: 0,
    maxTokens: 256,
    streaming: !1
  }, f = {
    type: "condition",
    expression: `context.steps.${s}.output.severity === 'critical'`,
    label: "Critical?"
  }, h = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "on-call",
      message: `CRITICAL incident: {{context.steps.${s}.output.summary}}`
    },
    idempotent: !1,
    onError: "fail-run"
  }, m = {
    type: "approval",
    approvers: [{ type: "role", value: "incident-commander" }],
    requiredCount: 1,
    timeoutMs: 1440 * 60 * 1e3,
    timeoutAction: "escalate",
    message: "Critical incident paged. Please acknowledge and assign a post-mortem owner."
  }, x = {
    type: "action",
    actionType: "webhook",
    config: {
      url: "https://tickets.example.com/api/incidents",
      method: "POST",
      body: {
        severity: `{{context.steps.${s}.output.severity}}`,
        summary: `{{context.steps.${s}.output.summary}}`
      }
    },
    idempotent: !0,
    onError: "route-error"
  }, g = [
    { id: r, type: "trigger", position: { x: H(0), y: z(0) }, data: a },
    { id: s, type: "llm", position: { x: H(1), y: z(0) }, data: p },
    { id: i, type: "condition", position: { x: H(2), y: z(0) }, data: f },
    { id: o, type: "action", position: { x: H(3), y: z(0) - he / 2 }, data: h },
    { id: d, type: "approval", position: { x: H(4), y: z(0) - he / 2 }, data: m },
    { id: c, type: "action", position: { x: H(3), y: z(0) + he / 2 }, data: x }
  ], u = [
    V(r, "out", s),
    V(s, "out", i),
    V(i, "true", o),
    V(o, "out", d),
    V(i, "false", c)
  ];
  return {
    id: crypto.randomUUID(),
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    version: 1,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "webhook", webhookPath: "/pipelines/webhooks/incident" },
    nodes: g,
    edges: u,
    createdAt: t,
    updatedAt: t,
    createdBy: e
  };
}
function za(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), o = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), a = crypto.randomUUID(), p = crypto.randomUUID(), f = crypto.randomUUID(), h = {
    type: "trigger",
    triggerType: "webhook",
    webhookPath: "/pipelines/webhooks/github-pr"
  }, m = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "You are a senior code reviewer. Read the GitHub pull-request payload and produce a brief, structured summary of the diff (files touched, scope, intent). No prose preface.",
    userPromptTemplate: "{{context.payload.pull_request}}",
    temperature: 0.2,
    maxTokens: 768,
    streaming: !1
  }, x = {
    type: "fork",
    branchCount: 3,
    branchLabels: ["security", "style", "tests"]
  }, g = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are a security auditor. Review this diff for vulnerabilities (injection, secrets, authz, unsafe deserialization, SSRF). Output JSON {"findings": [{"severity": "high"|"med"|"low", "file": string, "issue": string}]}.',
    userPromptTemplate: `{{context.payload.pull_request.diff}}

Summary: {{context.steps.${s}.response}}`,
    temperature: 0.1,
    maxTokens: 1024,
    streaming: !1
  }, u = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are a code-style reviewer. Flag naming, structure, readability, and idiom issues. Output JSON {"findings": [{"file": string, "line": number?, "issue": string}]}.',
    userPromptTemplate: `{{context.payload.pull_request.diff}}

Summary: {{context.steps.${s}.response}}`,
    temperature: 0.2,
    maxTokens: 1024,
    streaming: !1
  }, v = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are a test-coverage reviewer. Identify untested branches, missing edge-case tests, and risky changes lacking tests. Output JSON {"gaps": [{"file": string, "concern": string}]}.',
    userPromptTemplate: `{{context.payload.pull_request.diff}}

Summary: {{context.steps.${s}.response}}`,
    temperature: 0.1,
    maxTokens: 1024,
    streaming: !1
  }, w = {
    type: "join",
    mode: "all",
    mergeStrategy: "array-collect"
  }, N = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "You are a lead reviewer. Combine the security, style, and test-coverage findings into a single PR comment in markdown with sections, prioritized actions, and a final approve/request-changes recommendation.",
    userPromptTemplate: `Security: {{context.steps.${o}.response}}

Style: {{context.steps.${d}.response}}

Coverage: {{context.steps.${c}.response}}`,
    temperature: 0.3,
    maxTokens: 1536,
    streaming: !0
  }, C = {
    type: "action",
    actionType: "webhook",
    config: {
      url: "{{context.payload.pull_request.comments_url}}",
      method: "POST",
      body: { body: `{{context.steps.${p}.response}}` }
    },
    idempotent: !1,
    onError: "route-error"
  }, y = [
    { id: r, type: "trigger", position: { x: H(0), y: z(0) }, data: h },
    { id: s, type: "llm", position: { x: H(1), y: z(0) }, data: m },
    { id: i, type: "fork", position: { x: H(2), y: z(0) }, data: x },
    { id: o, type: "llm", position: { x: H(3), y: z(0) - he }, data: g },
    { id: d, type: "llm", position: { x: H(3), y: z(0) }, data: u },
    { id: c, type: "llm", position: { x: H(3), y: z(0) + he }, data: v },
    { id: a, type: "join", position: { x: H(4), y: z(0) }, data: w },
    { id: p, type: "llm", position: { x: H(5), y: z(0) }, data: N },
    { id: f, type: "action", position: { x: H(6), y: z(0) }, data: C }
  ], k = [
    V(r, "out", s),
    V(s, "out", i),
    V(i, "branch-0", o),
    V(i, "branch-1", d),
    V(i, "branch-2", c),
    V(o, "out", a, "in-0"),
    V(d, "out", a, "in-1"),
    V(c, "out", a, "in-2"),
    V(a, "out", p),
    V(p, "out", f)
  ];
  return {
    id: crypto.randomUUID(),
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    version: 1,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "webhook", webhookPath: "/pipelines/webhooks/github-pr" },
    nodes: y,
    edges: k,
    createdAt: t,
    updatedAt: t,
    createdBy: e
  };
}
function Ka(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), o = crypto.randomUUID(), d = crypto.randomUUID(), c = {
    type: "trigger",
    triggerType: "document.submit"
  }, a = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'Classify this newly created document for safety. Output strict JSON {"category": "clean"|"pii"|"policy_violation", "reason": string}. No prose.',
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0,
    maxTokens: 192,
    streaming: !1
  }, p = {
    type: "condition",
    expression: `context.steps.${s}.output.category === 'clean'`,
    label: "Clean?"
  }, f = {
    type: "action",
    actionType: "update-document",
    config: { field: "status", value: "published" },
    idempotent: !0,
    onError: "fail-run"
  }, h = {
    type: "approval",
    approvers: [{ type: "role", value: "moderator" }],
    requiredCount: 1,
    timeoutMs: 720 * 60 * 1e3,
    timeoutAction: "reject",
    message: `Document flagged as {{context.steps.${s}.output.category}} — please review before publishing.`
  }, m = [
    { id: r, type: "trigger", position: { x: H(0), y: z(0) }, data: c },
    { id: s, type: "llm", position: { x: H(1), y: z(0) }, data: a },
    { id: i, type: "condition", position: { x: H(2), y: z(0) }, data: p },
    { id: o, type: "action", position: { x: H(3), y: z(0) - he / 2 }, data: f },
    { id: d, type: "approval", position: { x: H(3), y: z(0) + he / 2 }, data: h }
  ], x = [
    V(r, "out", s),
    V(s, "out", i),
    V(i, "true", o),
    V(i, "false", d)
  ];
  return {
    id: crypto.randomUUID(),
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    version: 1,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "document.submit" },
    nodes: m,
    edges: x,
    createdAt: t,
    updatedAt: t,
    createdBy: e
  };
}
function Wa(e) {
  const t = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), o = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), a = crypto.randomUUID(), p = crypto.randomUUID(), f = {
    type: "trigger",
    triggerType: "webhook",
    webhookPath: "/pipelines/webhooks/helpdesk"
  }, h = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'Read this helpdesk ticket. Extract intent and urgency. Output strict JSON {"intent": string, "urgency": "high"|"medium"|"low", "tags": string[]}. No prose.',
    userPromptTemplate: "{{context.payload.ticket}}",
    temperature: 0.1,
    maxTokens: 256,
    streaming: !1
  }, m = {
    type: "transform",
    transformType: "jsonpath",
    expression: `$.steps.${s}.output`,
    outputKey: "triage"
  }, x = {
    type: "condition",
    expression: "context.triage.urgency === 'high'",
    label: "High urgency?"
  }, g = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "support-escalations",
      message: "High-urgency ticket: {{context.triage.intent}} (tags: {{context.triage.tags}})"
    },
    idempotent: !1,
    onError: "fail-run"
  }, u = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are a customer-support agent. Draft a friendly, concise reply addressing the ticket intent. Sign off as "The Support Team". Plain text, no markdown.',
    userPromptTemplate: `Ticket: {{context.payload.ticket}}

Intent: {{context.triage.intent}}
Tags: {{context.triage.tags}}`,
    temperature: 0.4,
    maxTokens: 768,
    streaming: !0
  }, v = {
    type: "approval",
    approvers: [{ type: "role", value: "support-agent" }],
    requiredCount: 1,
    timeoutMs: 14400 * 1e3,
    timeoutAction: "reject",
    message: "Please review this drafted reply before it is sent to the customer."
  }, w = {
    type: "action",
    actionType: "webhook",
    config: {
      url: "https://helpdesk.example.com/api/replies",
      method: "POST",
      body: {
        ticketId: "{{context.payload.ticket.id}}",
        body: `{{context.steps.${c}.response}}`
      }
    },
    idempotent: !0,
    onError: "route-error"
  }, N = [
    { id: r, type: "trigger", position: { x: H(0), y: z(0) }, data: f },
    { id: s, type: "llm", position: { x: H(1), y: z(0) }, data: h },
    { id: i, type: "transform", position: { x: H(2), y: z(0) }, data: m },
    { id: o, type: "condition", position: { x: H(3), y: z(0) }, data: x },
    { id: d, type: "action", position: { x: H(4), y: z(0) - he / 2 }, data: g },
    { id: c, type: "llm", position: { x: H(4), y: z(0) + he / 2 }, data: u },
    { id: a, type: "approval", position: { x: H(5), y: z(0) + he / 2 }, data: v },
    { id: p, type: "action", position: { x: H(6), y: z(0) + he / 2 }, data: w }
  ], C = [
    V(r, "out", s),
    V(s, "out", i),
    V(i, "out", o),
    V(o, "true", d),
    V(o, "false", c),
    V(c, "out", a),
    V(a, "approved", p)
  ];
  return {
    id: crypto.randomUUID(),
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    version: 1,
    status: "published",
    publishedVersion: 1,
    triggerBinding: { event: "webhook", webhookPath: "/pipelines/webhooks/helpdesk" },
    nodes: N,
    edges: C,
    createdAt: t,
    updatedAt: t,
    createdBy: e
  };
}
const jt = [
  {
    id: "document-summary",
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    tags: ["llm", "summary", "document"],
    build: Ea
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: Oa
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: Ua,
    prerequisites: {
      documentTypes: [{
        name: "Moderated Comment",
        icon: "💬",
        fields: [
          { name: "commentBody", fieldType: "long_text", required: !0 },
          { name: "commentStatus", fieldType: "enum", options: ["pending", "approved", "rejected", "deleted"] },
          { name: "author", fieldType: "text" }
        ]
      }]
    }
  },
  {
    id: "auto-tag-document",
    name: "Auto-tag Document",
    description: "Extract tags from a finalized document using an LLM and write them back.",
    icon: "🏷️",
    tags: ["llm", "tags", "transform"],
    build: _a,
    prerequisites: {
      documentTypes: [{
        name: "Taggable Document",
        icon: "🏷️",
        fields: [
          { name: "title", fieldType: "text", required: !0 },
          { name: "body", fieldType: "long_text", required: !0 },
          { name: "tags", fieldType: "text" }
        ]
      }]
    }
  },
  {
    id: "approval-chain",
    name: "Approval Chain",
    description: "Require team-lead then director approval before publishing a finalized document.",
    icon: "✅",
    tags: ["approval", "governance"],
    build: La,
    prerequisites: {
      documentTypes: [{
        name: "Publishable Document",
        icon: "📄",
        fields: [
          { name: "title", fieldType: "text", required: !0 },
          { name: "body", fieldType: "long_text", required: !0 },
          { name: "status", fieldType: "enum", options: ["draft", "review", "published"] }
        ]
      }]
    }
  },
  {
    id: "webhook-translate-publish",
    name: "Webhook → Translate → Publish",
    description: "Receive a webhook payload, extract text, translate to English, and post it as a comment.",
    icon: "🌐",
    tags: ["webhook", "llm", "translate"],
    build: Ba
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: Fa
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: ja
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: qa
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: Ha
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: za
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: Ka
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: Wa
  }
], fr = "/api";
async function Va(e) {
  const t = { createdTypes: [], errors: [] };
  if (!e?.documentTypes?.length) return t;
  for (const r of e.documentTypes)
    try {
      const s = await Ja(r.name);
      if (s) {
        t.createdTypes.push(s.typeId);
        continue;
      }
      const i = await Ga(r);
      t.createdTypes.push(i.typeId);
    } catch (s) {
      t.errors.push(
        `Failed to scaffold "${r.name}": ${s instanceof Error ? s.message : String(s)}`
      );
    }
  return t;
}
async function Ja(e) {
  try {
    const t = await fetch(`${fr}/document-types`, { credentials: "same-origin" });
    if (!t.ok) return null;
    const s = (await t.json()).items?.find(
      (i) => i.name.toLowerCase() === e.toLowerCase()
    );
    return s ? { typeId: s.typeId } : null;
  } catch {
    return null;
  }
}
async function Ga(e) {
  const t = e.fields.map((i, o) => ({
    fieldId: crypto.randomUUID(),
    name: i.name,
    fieldType: i.fieldType,
    widget: Ya(i.fieldType),
    cardinality: 1,
    required: i.required ?? !1,
    helpText: "",
    options: i.options,
    order: o
  })), r = await fetch(`${fr}/document-types`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({
      name: e.name,
      description: "Auto-created for pipeline template",
      icon: e.icon,
      fields: t
    })
  });
  if (!r.ok) {
    const i = await r.text();
    throw new Error(`HTTP ${r.status}: ${i}`);
  }
  return await r.json();
}
function Ya(e) {
  switch (e) {
    case "long_text":
      return "textarea";
    case "number":
      return "number_input";
    case "date":
      return "date_picker";
    case "boolean":
      return "checkbox";
    case "enum":
      return "select";
    default:
      return "text_field";
  }
}
function Xa(e) {
  const t = /* @__PURE__ */ new Map(), r = e.nodes.map((o) => {
    const d = crypto.randomUUID();
    return t.set(o.id, d), {
      ...o,
      id: d,
      data: JSON.parse(JSON.stringify(o.data)),
      position: { ...o.position }
    };
  }), s = e.edges.map((o) => ({
    ...o,
    id: crypto.randomUUID(),
    source: t.get(o.source) ?? o.source,
    target: t.get(o.target) ?? o.target
  })), i = (/* @__PURE__ */ new Date()).toISOString();
  return {
    ...e,
    id: crypto.randomUUID(),
    name: `${e.name} (copy)`,
    status: "draft",
    version: 1,
    publishedVersion: void 0,
    publishedSnapshot: void 0,
    nodes: r,
    edges: s,
    createdAt: i,
    updatedAt: i
  };
}
function Qa(e) {
  const t = e.triggerBinding?.event ?? "manual";
  return t === "schedule" ? "Schedule" : t === "webhook" ? "Webhook" : t === "manual" ? "Manual" : t.startsWith("document.") ? `On ${t}` : t;
}
function Za({ template: e, meta: t, onPick: r }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-testid": `template-card-${e.id}`,
      className: "flex flex-col gap-2 w-[220px] min-h-[200px] p-3.5 bg-surface border border-border rounded-[10px] font-[inherit]",
      children: [
        /* @__PURE__ */ l("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ n("span", { className: "text-2xl", "aria-hidden": !0, children: e.icon }),
          /* @__PURE__ */ n("div", { className: "text-sm font-bold text-text-primary overflow-hidden text-ellipsis", children: e.name })
        ] }),
        /* @__PURE__ */ l(
          "div",
          {
            "data-testid": `template-meta-${e.id}`,
            className: "text-[11px] text-text-tertiary flex gap-2",
            children: [
              /* @__PURE__ */ l("span", { children: [
                t.nodeCount,
                " node",
                t.nodeCount === 1 ? "" : "s"
              ] }),
              /* @__PURE__ */ n("span", { "aria-hidden": !0, children: "·" }),
              /* @__PURE__ */ n("span", { children: t.trigger })
            ]
          }
        ),
        /* @__PURE__ */ n("div", { className: "text-xs text-text-secondary leading-[1.4] flex-1", children: e.description }),
        e.tags.length > 0 && /* @__PURE__ */ n("div", { className: "flex flex-wrap gap-1", children: e.tags.map((s) => /* @__PURE__ */ n(
          "span",
          {
            className: "text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#f1f5f9] text-text-secondary lowercase",
            children: s
          },
          s
        )) }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            "data-testid": `template-use-${e.id}`,
            onClick: () => r(e),
            className: "mt-auto px-2.5 py-1.5 text-xs font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
            children: "Use this template"
          }
        )
      ]
    }
  );
}
function el({
  open: e,
  onClose: t,
  onCreated: r,
  onSelect: s
}) {
  const { userId: i } = $t(), [o, d] = R(""), c = oe(null);
  G(() => {
    e && (d(""), setTimeout(() => c.current?.focus(), 30));
  }, [e]);
  const a = F(() => {
    const m = /* @__PURE__ */ new Map();
    for (const x of jt) {
      const g = x.build(i || "anonymous");
      m.set(x.id, { nodeCount: g.nodes.length, trigger: Qa(g) });
    }
    return m;
  }, [i, e]), p = F(() => {
    const m = o.trim().toLowerCase();
    return m ? jt.filter(
      (x) => x.name.toLowerCase().includes(m) || x.description.toLowerCase().includes(m) || x.tags.some((g) => g.toLowerCase().includes(m))
    ) : jt;
  }, [o]), f = (m) => {
    if (r) {
      const x = m.build(i || "anonymous"), g = Xa(x);
      tt(g), t(), r(g.id), m.prerequisites && Va(m.prerequisites).then((u) => {
        u.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", u.errors);
      });
      return;
    }
    s && s(m);
  };
  return /* @__PURE__ */ l(
    ze,
    {
      open: e,
      onClose: t,
      title: "Pipeline templates",
      maxWidth: 760,
      backdropTestId: "templates-modal",
      rawChildren: !0,
      children: [
        /* @__PURE__ */ n("div", { className: "text-[13px] text-text-secondary mb-3", children: "Pick a template to spawn a new pipeline with prebuilt nodes and edges." }),
        /* @__PURE__ */ n(
          "input",
          {
            ref: c,
            type: "search",
            "data-testid": "templates-search",
            placeholder: "Search templates…",
            value: o,
            onChange: (m) => d(m.target.value),
            onKeyDown: (m) => {
              m.key === "Enter" && p.length > 0 && (m.preventDefault(), f(p[0]));
            },
            className: "w-full px-3 py-2 text-[13px] mb-3.5 border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none"
          }
        ),
        p.length === 0 ? /* @__PURE__ */ l(
          "div",
          {
            "data-testid": "templates-empty",
            className: "text-center p-8 text-[13px] text-text-tertiary",
            children: [
              'No templates match "',
              o,
              '".'
            ]
          }
        ) : /* @__PURE__ */ n(
          "div",
          {
            "data-testid": "templates-grid",
            className: "grid grid-cols-[repeat(3,220px)] gap-4 justify-center max-h-[60vh] overflow-y-auto p-2",
            children: p.map((m) => /* @__PURE__ */ n(
              Za,
              {
                template: m,
                meta: a.get(m.id) ?? { nodeCount: 0, trigger: "—" },
                onPick: f
              },
              m.id
            ))
          }
        )
      ]
    }
  );
}
const an = ["draft", "published", "archived"], $n = ["draft", "published"];
function tl(e) {
  if (e == null) return null;
  if (e.trim() === "") return /* @__PURE__ */ new Set();
  const t = new Set(an);
  return new Set(
    e.split(",").map((s) => s.trim()).filter((s) => t.has(s))
  );
}
function nl(e, t) {
  return {
    id: e.id,
    name: e.name,
    status: e.status || "draft",
    updatedAt: e.updatedAt,
    version: e.version,
    publishedVersion: e.publishedVersion,
    nodeCount: (e.nodes ?? []).length,
    triggerBinding: e.triggerBinding,
    createdAt: e.createdAt,
    icon: e.icon ?? t ?? "🔀",
    tags: e.tags ?? []
  };
}
function rl(e) {
  const t = e?.event;
  return !t || t === "manual" ? "manual" : t === "schedule" ? "schedule" : t === "webhook" ? "webhook" : "document";
}
function Pn(e) {
  return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function ol() {
  const e = /* @__PURE__ */ new Date(), t = e.getFullYear(), r = String(e.getMonth() + 1).padStart(2, "0"), s = String(e.getDate()).padStart(2, "0");
  return `${t}-${r}-${s}`;
}
function sl({
  open: e,
  onClose: t,
  onCreate: r
}) {
  const [s, i] = R(""), o = oe(null);
  G(() => {
    e && (i(""), setTimeout(() => o.current?.focus(), 50));
  }, [e]);
  const d = s.trim().length > 0, c = () => {
    d && r(s.trim());
  };
  return /* @__PURE__ */ l(
    ze,
    {
      open: e,
      onClose: t,
      title: "Create new pipeline",
      maxWidth: 440,
      footer: /* @__PURE__ */ l(ne, { children: [
        /* @__PURE__ */ n(
          "button",
          {
            "data-testid": "new-pipeline-cancel",
            className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
            onClick: t,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            "data-testid": "new-pipeline-confirm",
            className: $(
              "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer",
              !d && "opacity-50 cursor-not-allowed"
            ),
            disabled: !d,
            onClick: c,
            children: "Create pipeline"
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ n("label", { className: "block text-[13px] font-semibold text-text-secondary mb-1.5", children: "Name" }),
        /* @__PURE__ */ n(
          "input",
          {
            ref: o,
            "data-testid": "new-pipeline-name",
            type: "text",
            value: s,
            onChange: (a) => i(a.target.value),
            onKeyDown: (a) => {
              a.key === "Enter" && c();
            },
            placeholder: "e.g. Invoice summarizer",
            className: $(
              "border border-border-field rounded-md px-3 py-2 text-sm",
              "bg-[#f9fafb] text-text-primary outline-none",
              "box-border w-full"
            )
          }
        )
      ]
    }
  );
}
function td() {
  const e = Ee(), { userId: t } = $t(), { toast: r } = Pt(), { triggerRun: s, isTriggering: i } = lr(), [o, d] = Rt(), [c, a] = R([]), [p, f] = R(""), [h, m] = R("all"), [x, g] = R("updated"), u = F(
    () => tl(o.get("status")),
    [o]
  ), v = F(() => u ?? new Set($n), [u]), w = u != null, N = (A) => {
    const E = new URLSearchParams(o);
    if (A.size === 0)
      E.set("status", "");
    else {
      const te = an.filter((ce) => A.has(ce)).join(",");
      E.set("status", te);
    }
    d(E, { replace: !0 });
  }, C = (A) => {
    const E = w ? new Set(v) : new Set($n);
    E.has(A) ? E.delete(A) : E.add(A), N(E);
  }, [y, k] = R(!1), [b, T] = R(!1), [I, S] = R(null), [D, _] = R(!1), [W, Q] = R(!1), [ee, de] = R(!1), O = M(async () => {
    const A = await so(), E = [];
    for (const te of A) {
      const ce = await Ge(te.id);
      ce && E.push(nl(ce, te.icon));
    }
    a(E);
  }, []);
  G(() => {
    O();
  }, [O]);
  const U = F(() => {
    const A = p.trim().toLowerCase(), te = [...c.filter((ce) => {
      if (A) {
        const me = ce.name.toLowerCase().includes(A), Me = ce.tags.some((cn) => cn.toLowerCase().includes(A));
        if (!me && !Me) return !1;
      }
      return !(!(w && v.size === 0) && !v.has(ce.status) || h !== "all" && rl(ce.triggerBinding) !== h);
    })];
    return x === "name" ? te.sort((ce, me) => ce.name.localeCompare(me.name)) : x === "created" ? te.sort((ce, me) => me.createdAt.localeCompare(ce.createdAt)) : te.sort((ce, me) => me.updatedAt.localeCompare(ce.updatedAt)), te;
  }, [c, p, v, w, h, x]), P = F(() => U.map((A) => A.id), [U]), {
    selectionMode: B,
    selected: K,
    allVisibleSelected: j,
    selectAllRef: X,
    handleToggleSelect: Z,
    handleSelectAllFiltered: le,
    handleHeaderToggleAll: be,
    clearSelection: L,
    setSelectionMode: re
  } = Ra({ visibleRows: U, filteredIds: P }), ge = F(() => {
    const A = /* @__PURE__ */ new Set();
    for (const E of c)
      if (K.has(E.id))
        for (const te of E.tags) A.add(te);
    return Array.from(A).sort((E, te) => E.localeCompare(te));
  }, [c, K]), $e = async (A) => {
    const E = await io({ name: A, createdBy: t });
    k(!1), e(`/pipelines/${E.id}`);
  }, Ke = () => {
    const A = Zr(t);
    He(A).then(() => O()), e(`/pipelines/${A.id}`);
  }, Oe = (A) => {
    const E = A.build(t);
    He(E), T(!1), e(`/pipelines/${E.id}`);
  }, Ae = (A) => e(`/pipelines/${A}`), Le = async (A) => {
    if (A.status !== "published") {
      r("Run requires published state", { type: "warning" });
      return;
    }
    if (!i)
      try {
        await s(A.id, {}) ? r(`Run started for "${A.name}"`, { type: "success" }) : r("Could not start run", { type: "error" });
      } catch (E) {
        r(`Run failed: ${E.message}`, { type: "error" });
      } finally {
        e(`/pipelines/${A.id}`);
      }
  }, Ue = (A) => {
    const E = nn(A);
    E && (He(E).then(() => O()), r(`Duplicated as "${E.name}"`, { type: "success" }));
  }, Be = (A) => {
    const E = Wt(A.id);
    if (!E) {
      r("Export failed", { type: "error" });
      return;
    }
    xt(`${Pn(A.name)}.pipeline.json`, E);
  }, ye = async () => {
    I && (await fn(I), S(null), O(), r("Pipeline deleted", { type: "success" }));
  }, pe = I ? c.find((A) => A.id === I) : null, J = () => {
    const A = Array.from(K);
    A.length !== 0 && (A.forEach((E, te) => {
      window.setTimeout(() => {
        const ce = c.find((Me) => Me.id === E), me = Wt(E);
        !ce || !me || xt(`${Pn(ce.name)}-${ol()}.pipeline.json`, me);
      }, te * 100);
    }), r(`Exported ${A.length} pipeline${A.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, q = async (A) => {
    const E = Array.from(K);
    for (const te of E) {
      const ce = await Ge(te);
      if (!ce) continue;
      const me = ce.tags ?? [];
      me.includes(A) || (ce.tags = [...me, A], await He(ce));
    }
    Q(!1), O(), r(`Added tag "${A}" to ${E.length} pipeline${E.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, Y = async (A) => {
    const E = Array.from(K);
    for (const te of E) {
      const ce = await Ge(te);
      if (!ce) continue;
      const me = ce.tags ?? [];
      me.includes(A) && (ce.tags = me.filter((Me) => Me !== A), await He(ce));
    }
    O(), r(`Removed tag "${A}" from ${E.length} pipeline${E.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ae = async () => {
    const A = Array.from(K);
    for (const E of A) await fn(E);
    _(!1), L(), O(), r(`Deleted ${A.length} pipeline${A.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ue = async () => {
    const A = Array.from(K);
    if (A.length === 0) return;
    let E = 0, te = 0;
    for (const ce of A) {
      const me = await Ge(ce);
      if (!me) continue;
      if (me.status === "published") {
        te += 1;
        continue;
      }
      await or(ce) && (E += 1);
    }
    O(), te > 0 ? r(
      `Published ${E}; skipped ${te} already published`,
      { type: "success" }
    ) : r(
      `Published ${E} pipeline${E === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, Ie = async () => {
    const A = Array.from(K);
    if (A.length === 0) return;
    let E = 0, te = 0;
    for (const me of A) {
      const Me = await Ge(me);
      if (!Me) continue;
      Me.status === "archived" ? (Me.status = "draft", te += 1) : (Me.status = "archived", E += 1), await He(Me);
    }
    O();
    const ce = [];
    E > 0 && ce.push(`Archived ${E}`), te > 0 && ce.push(`Unarchived ${te}`), r(ce.join(" · ") || "No pipelines changed", { type: "success" });
  }, we = async () => {
    const A = Array.from(K);
    if (A.length === 0) return;
    const E = [];
    for (const ce of A) {
      const me = await Ge(ce);
      me && E.push(me);
    }
    if (E.length === 0) {
      r("Export failed", { type: "error" });
      return;
    }
    const te = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    xt(`pipelines-${te}.json`, JSON.stringify(E, null, 2)), r(`Exported ${E.length} pipeline${E.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  };
  G(() => {
    const A = (E) => {
      const te = E.target;
      if (te) {
        const me = te.tagName;
        if (me === "INPUT" || me === "TEXTAREA" || me === "SELECT" || te.isContentEditable)
          return;
      }
      if (E.key === "Escape") {
        (K.size > 0 || B || W || ee) && (Q(!1), de(!1), L(), re(!1));
        return;
      }
      if ((E.metaKey || E.ctrlKey) && (E.key === "a" || E.key === "A")) {
        B && (E.preventDefault(), le());
        return;
      }
      (E.key === "Delete" || E.key === "Backspace") && K.size > 0 && !D && !I && !y && !b && (E.preventDefault(), _(!0));
    };
    return window.addEventListener("keydown", A), () => window.removeEventListener("keydown", A);
  }, [
    K,
    B,
    W,
    ee,
    D,
    I,
    y,
    b,
    L,
    le,
    re
  ]);
  const qe = c.length > 0, Nt = K.size > 0;
  return /* @__PURE__ */ l(
    "div",
    {
      "data-testid": "pipelines-page",
      className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-inherit",
      children: [
        /* @__PURE__ */ l(
          "div",
          {
            className: $(
              "h-14 shrink-0 flex items-center justify-between px-6",
              "border-b border-border bg-white",
              "sticky top-0 z-[2]"
            ),
            children: [
              /* @__PURE__ */ n("div", { className: "text-lg font-bold text-text-primary", children: "Pipelines" }),
              /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ n(
                  "button",
                  {
                    "data-testid": "metrics-btn",
                    onClick: () => e("/pipelines/metrics"),
                    className: $(
                      "px-4 py-[7px] text-[13px] font-semibold",
                      "bg-white text-text-secondary",
                      "border border-border-field rounded-[7px]",
                      "cursor-pointer font-inherit"
                    ),
                    children: "Metrics"
                  }
                ),
                /* @__PURE__ */ n(
                  "button",
                  {
                    "data-testid": "templates-btn",
                    onClick: () => T(!0),
                    className: $(
                      "px-4 py-[7px] text-[13px] font-semibold",
                      "bg-white text-text-secondary",
                      "border border-border-field rounded-[7px]",
                      "cursor-pointer font-inherit"
                    ),
                    children: "Templates"
                  }
                ),
                /* @__PURE__ */ n(
                  "button",
                  {
                    "data-testid": "new-pipeline-btn",
                    onClick: () => k(!0),
                    className: $(
                      "px-4 py-[7px] text-[13px] font-semibold",
                      "bg-primary text-white border-none rounded-md",
                      "cursor-pointer font-inherit"
                    ),
                    children: "+ New Pipeline"
                  }
                )
              ] })
            ]
          }
        ),
        qe && /* @__PURE__ */ n(
          Aa,
          {
            search: p,
            onSearchChange: f,
            statusFilter: v,
            statusExplicit: w,
            onToggleStatusKey: C,
            triggerFilter: h,
            onTriggerFilterChange: m,
            sortKey: x,
            onSortKeyChange: g,
            allVisibleSelected: j,
            selectAllRef: X,
            onHeaderToggleAll: be
          }
        ),
        Nt && /* @__PURE__ */ n(
          Da,
          {
            count: K.size,
            onClear: L,
            onExport: J,
            onExportAsJSON: we,
            onPublish: ue,
            onArchive: Ie,
            onAddTag: () => {
              Q((A) => !A), de(!1);
            },
            onRemoveTag: () => {
              de((A) => !A), Q(!1);
            },
            onDelete: () => _(!0),
            onDeleteWithConfirm: () => _(!0),
            addTagOpen: W,
            removeTagOpen: ee,
            onSubmitAddTag: q,
            onSubmitRemoveTag: Y,
            onCloseAddTag: () => Q(!1),
            onCloseRemoveTag: () => de(!1),
            unionTags: ge
          }
        ),
        /* @__PURE__ */ n(
          "div",
          {
            className: $(
              "flex-1 overflow-y-auto overflow-x-hidden min-w-0",
              qe ? "p-6" : "p-0"
            ),
            children: qe ? U.length === 0 ? /* @__PURE__ */ n(
              "div",
              {
                "data-testid": "filtered-empty",
                className: "text-center p-12 text-[13px] text-text-tertiary",
                children: "No pipelines match the current filters."
              }
            ) : /* @__PURE__ */ n(
              "div",
              {
                "data-testid": "pipeline-grid",
                className: "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[50px]",
                children: U.map((A) => /* @__PURE__ */ n(
                  Ia,
                  {
                    row: A,
                    onOpen: () => Ae(A.id),
                    onRun: () => {
                      Le(A);
                    },
                    onDuplicate: () => Ue(A.id),
                    onExport: () => Be(A),
                    onDelete: () => S(A.id),
                    selectionMode: B,
                    selected: K.has(A.id),
                    anySelected: Nt,
                    onToggleSelect: (E) => Z(A.id, E)
                  },
                  A.id
                ))
              }
            ) : /* @__PURE__ */ l("div", { className: "flex flex-col h-full", children: [
              /* @__PURE__ */ n("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ n(
                _e,
                {
                  icon: "🔀",
                  title: "No pipelines yet",
                  body: "Design your first one — from scratch or pick a template later.",
                  actionLabel: "+ New Pipeline",
                  onAction: () => k(!0)
                }
              ) }),
              /* @__PURE__ */ l("div", { className: "flex justify-center items-center gap-2.5 text-[13px] text-text-tertiary px-6 pb-8", children: [
                /* @__PURE__ */ n(
                  "button",
                  {
                    "data-testid": "empty-state-demo",
                    onClick: Ke,
                    className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
                    children: "or try the demo pipeline"
                  }
                ),
                /* @__PURE__ */ n("span", { "aria-hidden": !0, children: "·" }),
                /* @__PURE__ */ n(
                  "button",
                  {
                    "data-testid": "empty-state-templates",
                    onClick: () => T(!0),
                    className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
                    children: "or browse templates"
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ n(
          sl,
          {
            open: y,
            onClose: () => k(!1),
            onCreate: $e
          }
        ),
        /* @__PURE__ */ n(
          el,
          {
            open: b,
            onClose: () => T(!1),
            onSelect: Oe
          }
        ),
        /* @__PURE__ */ n(
          ze,
          {
            open: !!I,
            onClose: () => S(null),
            title: "Delete pipeline?",
            maxWidth: 400,
            footer: /* @__PURE__ */ l(ne, { children: [
              /* @__PURE__ */ n(
                "button",
                {
                  "data-testid": "delete-pipeline-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => S(null),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ n(
                "button",
                {
                  "data-testid": "delete-pipeline-confirm",
                  onClick: ye,
                  className: $(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-red-600 text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: "Delete"
                }
              )
            ] }),
            children: pe && /* @__PURE__ */ l("p", { className: "m-0", children: [
              /* @__PURE__ */ l("strong", { children: [
                "“",
                pe.name,
                "”"
              ] }),
              " will be permanently removed. Run history will also be lost."
            ] })
          }
        ),
        /* @__PURE__ */ n(
          ze,
          {
            open: D,
            onClose: () => _(!1),
            title: `Delete ${K.size} pipeline${K.size === 1 ? "" : "s"}?`,
            maxWidth: 420,
            backdropTestId: "bulk-delete-modal",
            footer: /* @__PURE__ */ l(ne, { children: [
              /* @__PURE__ */ n(
                "button",
                {
                  "data-testid": "bulk-delete-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => _(!1),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ l(
                "button",
                {
                  "data-testid": "bulk-delete-confirm",
                  onClick: ae,
                  className: $(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-red-600 text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: [
                    "Delete ",
                    K.size
                  ]
                }
              )
            ] }),
            children: /* @__PURE__ */ l("p", { className: "m-0", children: [
              /* @__PURE__ */ l("strong", { children: [
                K.size,
                " pipeline",
                K.size === 1 ? "" : "s"
              ] }),
              " ",
              "will be permanently removed. Run history will also be lost."
            ] })
          }
        )
      ]
    }
  );
}
const il = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function hr(e, t, r) {
  const s = il[e], i = Math.max(0, t | 0), o = Math.max(0, r | 0);
  if (!s)
    return {
      inputTokens: i,
      outputTokens: o,
      inputCostUsd: 0,
      outputCostUsd: 0,
      totalCostUsd: 0,
      model: e,
      modelFound: !1
    };
  const d = i / 1e6 * s.inputPerMillion, c = o / 1e6 * s.outputPerMillion;
  return {
    inputTokens: i,
    outputTokens: o,
    inputCostUsd: d,
    outputCostUsd: c,
    totalCostUsd: d + c,
    model: e,
    modelFound: !0
  };
}
function pt(e) {
  const t = {};
  let r = 0, s = 0, i = 0, o = 0, d = !1;
  for (const a of e) {
    if (!a.model) continue;
    const p = a.tokensIn ?? 0, f = a.tokensOut ?? 0, h = hr(a.model, p, f), m = t[a.model];
    m ? t[a.model] = {
      inputTokens: m.inputTokens + h.inputTokens,
      outputTokens: m.outputTokens + h.outputTokens,
      inputCostUsd: m.inputCostUsd + h.inputCostUsd,
      outputCostUsd: m.outputCostUsd + h.outputCostUsd,
      totalCostUsd: m.totalCostUsd + h.totalCostUsd,
      model: a.model,
      modelFound: m.modelFound || h.modelFound
    } : t[a.model] = h, r += h.inputTokens, s += h.outputTokens, i += h.inputCostUsd, o += h.outputCostUsd, h.modelFound && (d = !0);
  }
  return { total: {
    inputTokens: r,
    outputTokens: s,
    inputCostUsd: i,
    outputCostUsd: o,
    totalCostUsd: i + o,
    model: "aggregate",
    modelFound: d
  }, perModel: t };
}
function wt(e) {
  return !e || !e.modelFound && e.totalCostUsd === 0 ? "—" : e.totalCostUsd >= 0.01 ? `$${e.totalCostUsd.toFixed(2)}` : e.totalCostUsd === 0 ? "$0.00" : `$${e.totalCostUsd.toFixed(4)}`;
}
function al(e) {
  const t = e.data.label;
  if (typeof t == "string" && t.trim()) return t.trim();
  switch (e.data.type) {
    case "llm":
      return e.data.model || "llm";
    case "trigger":
      return e.data.triggerType || "trigger";
    case "action":
      return e.data.actionType || "action";
    case "transform":
      return e.data.transformType || "transform";
    case "join":
      return e.data.mode ? `join:${e.data.mode}` : "join";
    default:
      return e.type;
  }
}
function xr(e, t) {
  let r = 0;
  if (e.llm) {
    const i = t.get(e.nodeId);
    i && (r += hr(i, e.llm.tokensIn, e.llm.tokensOut).totalCostUsd);
  }
  const s = e.costUsd;
  return typeof s == "number" && Number.isFinite(s) && s > 0 && (r += s), r;
}
function ll(e, t) {
  if (!t) return [];
  const r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const a of t.nodes)
    a.data.type === "llm" && r.set(a.id, a.data.model), s.set(a.id, al(a)), i.set(a.id, a.data.type);
  const o = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const a of t.nodes)
    o.set(a.id, 0), d.set(a.id, 0);
  for (const a of e)
    for (const p of Object.values(a.steps ?? {})) {
      if (!s.has(p.nodeId)) continue;
      const f = xr(p, r);
      o.set(p.nodeId, (o.get(p.nodeId) ?? 0) + f), d.set(p.nodeId, (d.get(p.nodeId) ?? 0) + 1);
    }
  const c = t.nodes.map((a) => ({
    nodeId: a.id,
    label: s.get(a.id) ?? a.id,
    type: i.get(a.id) ?? a.type,
    totalCostUsd: o.get(a.id) ?? 0,
    stepCount: d.get(a.id) ?? 0
  }));
  return c.sort((a, p) => p.totalCostUsd - a.totalCostUsd), c;
}
function cl(e) {
  return e.slice(0, 10);
}
function dl(e) {
  return Date.UTC(
    Number(e.slice(0, 4)),
    Number(e.slice(5, 7)) - 1,
    Number(e.slice(8, 10))
  );
}
function pl(e, t, r = 30, s = /* @__PURE__ */ new Date()) {
  const i = /* @__PURE__ */ new Map();
  if (t)
    for (const f of t.nodes)
      f.data.type === "llm" && i.set(f.id, f.data.model);
  const o = Date.UTC(
    s.getUTCFullYear(),
    s.getUTCMonth(),
    s.getUTCDate()
  ), d = o - (r - 1) * 864e5, c = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (let f = d; f <= o; f += 864e5) {
    const h = new Date(f).toISOString().slice(0, 10);
    c.set(h, 0), a.set(h, 0);
  }
  for (const f of e) {
    const h = cl(f.startedAt);
    if (!c.has(h)) continue;
    let m = 0;
    for (const x of Object.values(f.steps ?? {}))
      m += xr(x, i);
    c.set(h, (c.get(h) ?? 0) + m), a.set(h, (a.get(h) ?? 0) + 1);
  }
  const p = [];
  for (let f = d; f <= o; f += 864e5) {
    const h = new Date(f).toISOString().slice(0, 10);
    p.push({
      date: h,
      ts: dl(h),
      totalCostUsd: c.get(h) ?? 0,
      runCount: a.get(h) ?? 0
    });
  }
  return p;
}
const gr = [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
], br = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], yr = ["24h", "7d", "30d", "all"], ul = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function ml(e) {
  return e.startsWith("document.") || e === "document" ? "document" : e === "schedule" || e === "scheduled" ? "scheduled" : e === "webhook" ? "webhook" : "manual";
}
function fl(e) {
  let t = 0;
  for (const r of Object.values(e.steps ?? {})) {
    const s = r.attempts?.length ?? 0;
    s > 1 && (t += s - 1);
  }
  return t;
}
function vr(e, t) {
  const r = t.now ?? Date.now(), s = t.range === "all" ? null : r - ul[t.range], i = t.query.trim().toLowerCase();
  return e.filter((o) => {
    if (t.statuses.size > 0 && !t.statuses.has(o.status)) return !1;
    if (t.triggerKinds.size > 0) {
      const d = ml(o.triggeredBy.triggerType);
      if (!t.triggerKinds.has(d)) return !1;
    }
    if (s != null) {
      const d = new Date(o.startedAt).getTime();
      if (Number.isFinite(d) && d < s) return !1;
    }
    if (i.length > 0) {
      const d = o.id.toLowerCase().includes(i), c = o.pipelineId.toLowerCase().includes(i);
      if (!d && !c) return !1;
    }
    return !0;
  });
}
function Mn(e, t) {
  if (!e) return /* @__PURE__ */ new Set();
  const r = new Set(t);
  return new Set(
    e.split(",").map((s) => s.trim()).filter((s) => r.has(s))
  );
}
function wr(e) {
  const t = e.get("range") ?? "7d", r = yr.includes(t) ? t : "7d";
  return {
    query: e.get("q") ?? "",
    statuses: Mn(e.get("status"), gr),
    triggerKinds: Mn(e.get("trigger"), br),
    range: r
  };
}
const hl = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, xl = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, gl = {
  "24h": "Last 24h",
  "7d": "Last 7d",
  "30d": "Last 30d",
  all: "All time"
};
function En({
  label: e,
  options: t,
  selected: r,
  onToggle: s,
  labels: i,
  testIdPrefix: o
}) {
  const [d, c] = R(!1), a = oe(null);
  st(a, () => c(!1), d);
  const p = r.size === 0 ? "All" : r.size <= 2 ? Array.from(r).map((f) => i[f]).join(", ") : `${r.size} selected`;
  return /* @__PURE__ */ l("div", { ref: a, className: "relative", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: () => c(!d),
        "data-testid": `${o}-dropdown`,
        className: $(
          "flex items-center gap-1.5 px-2.5 py-[5px] text-xs font-medium rounded cursor-pointer font-[inherit] whitespace-nowrap bg-surface text-text-secondary border",
          r.size > 0 ? "border-primary" : "border-border"
        ),
        children: [
          /* @__PURE__ */ n("span", { className: "text-text-tertiary font-semibold text-[11px]", children: e }),
          /* @__PURE__ */ n(
            "span",
            {
              className: $(
                r.size > 0 ? "text-primary font-semibold" : "text-text-secondary font-medium"
              ),
              children: p
            }
          ),
          /* @__PURE__ */ n("span", { className: "text-[9px] ml-0.5 opacity-60", children: "▾" })
        ]
      }
    ),
    d && /* @__PURE__ */ n(
      "div",
      {
        className: "absolute top-full left-0 mt-1 bg-white border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] py-1",
        children: t.map((f) => /* @__PURE__ */ l(
          "label",
          {
            "data-testid": `${o}-${f}`,
            className: "flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer text-text-primary hover:bg-[#f1f5f9]",
            children: [
              /* @__PURE__ */ n(
                "input",
                {
                  type: "checkbox",
                  checked: r.has(f),
                  onChange: () => s(f),
                  className: "m-0 accent-primary"
                }
              ),
              i[f]
            ]
          },
          f
        ))
      }
    )
  ] });
}
function Nr({
  query: e,
  statuses: t,
  triggerKinds: r,
  range: s,
  onQueryChange: i,
  onStatusToggle: o,
  onTriggerToggle: d,
  onRangeChange: c,
  onClearFilters: a
}) {
  const p = t.size > 0 || r.size > 0 || e.length > 0;
  return /* @__PURE__ */ l(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 bg-[#fafbfc] border border-border rounded-md",
      children: [
        /* @__PURE__ */ n(
          "input",
          {
            id: "runs-search",
            type: "search",
            "data-testid": "runs-search-input",
            placeholder: "Search…",
            value: e,
            onChange: (f) => i(f.target.value),
            className: "flex-[1_1_180px] max-w-[240px] px-2.5 py-[5px] text-xs border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
            "aria-label": "Search runs by run id or pipeline id"
          }
        ),
        /* @__PURE__ */ n("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ n("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: yr.map((f) => /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": s === f,
            "data-testid": `runs-range-${f}`,
            onClick: () => c(f),
            className: $(
              "px-2 py-1 text-[11px] border-none rounded-[3px] cursor-pointer font-[inherit]",
              s === f ? "font-semibold bg-primary text-white" : "font-medium bg-transparent text-text-secondary"
            ),
            children: gl[f]
          },
          f
        )) }),
        /* @__PURE__ */ n("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ n(
          En,
          {
            label: "Status",
            options: gr,
            selected: t,
            onToggle: o,
            labels: hl,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ n(
          En,
          {
            label: "Trigger",
            options: br,
            selected: r,
            onToggle: d,
            labels: xl,
            testIdPrefix: "runs-trigger-chip"
          }
        ),
        p && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            onClick: a,
            className: "px-2 py-[3px] text-[11px] bg-none border-none text-text-tertiary cursor-pointer font-[inherit] underline",
            children: "Clear filters"
          }
        )
      ]
    }
  );
}
function bl({
  selectionCount: e,
  onExport: t,
  onDelete: r,
  onClear: s
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-testid": "runs-bulk-toolbar",
      className: "flex items-center gap-2 px-3 py-2 bg-[#fafbfc] border border-border rounded-md",
      children: [
        /* @__PURE__ */ l("span", { className: "text-xs text-text-secondary", children: [
          e,
          " selected"
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            "data-testid": "runs-bulk-export",
            onClick: t,
            className: "px-2.5 py-1 text-xs font-medium border border-border bg-surface text-text-secondary rounded cursor-pointer font-[inherit]",
            children: "Export JSON"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            "data-testid": "runs-bulk-delete",
            onClick: r,
            className: "px-2.5 py-1 text-xs font-medium border border-[#dc2626] bg-surface text-[#dc2626] rounded cursor-pointer font-[inherit]",
            children: "Delete"
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            "data-testid": "runs-bulk-clear",
            onClick: s,
            className: "px-2.5 py-1 text-xs bg-none border-none text-text-secondary cursor-pointer font-[inherit] ml-auto",
            children: "Clear selection"
          }
        )
      ]
    }
  );
}
function ln(e) {
  switch (e) {
    case "completed":
      return { label: "Completed", tone: "success" };
    case "failed":
      return { label: "Failed", tone: "danger" };
    case "cancelled":
      return { label: "Cancelled", tone: "neutral" };
    case "awaiting_approval":
      return { label: "Awaiting approval", tone: "warning" };
    case "running":
      return { label: "Running", tone: "info" };
    case "pending":
      return { label: "Pending", tone: "neutral" };
    case "paused_at_breakpoint":
      return { label: "Paused", tone: "warning" };
    default:
      return { label: e, tone: "neutral" };
  }
}
function yl(e) {
  switch (e) {
    case "LLMError":
      return "danger";
    case "TimeoutError":
      return "caution";
    case "NetworkError":
      return "warning";
    case "ValidationError":
      return "warning";
    case "RegistryConflict":
      return "purple";
    case "UnknownError":
      return "neutral";
    default:
      return "neutral";
  }
}
const vl = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function wl(e) {
  const t = Date.now() - new Date(e).getTime();
  return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Nl({
  filtered: e,
  selected: t,
  onSelectionChange: r,
  comparePair: s,
  onToggleComparePair: i,
  costByRunId: o,
  pipelineId: d,
  onNavigate: c,
  onOpenRetryModal: a
}) {
  const p = oe(!1), f = oe(null), h = e.length > 0 && e.every((u) => t.has(u.id)), m = !h && e.some((u) => t.has(u.id)), x = () => {
    const u = new Set(t);
    if (h)
      for (const v of e) u.delete(v.id);
    else
      for (const v of e) u.add(v.id);
    r(u);
  }, g = (u, v, w) => {
    const N = new Set(t), C = !N.has(u);
    if (w && f.current != null) {
      const y = Math.min(f.current, v), k = Math.max(f.current, v);
      for (let b = y; b <= k; b++) {
        const T = e[b];
        T && (C ? N.add(T.id) : N.delete(T.id));
      }
    } else C ? N.add(u) : N.delete(u);
    f.current = v, r(N);
  };
  return /* @__PURE__ */ l(
    "table",
    {
      className: "w-full border-collapse text-[13px] bg-surface border border-border rounded-lg overflow-hidden",
      children: [
        /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { className: "bg-[#fafbfc] text-left", children: [
          /* @__PURE__ */ n(
            "th",
            {
              scope: "col",
              className: "px-3 py-2 w-6 border-b border-border",
              children: /* @__PURE__ */ n(
                "input",
                {
                  type: "checkbox",
                  "data-testid": "runs-select-all",
                  "aria-label": "Select all visible runs",
                  checked: h,
                  ref: (u) => {
                    u && (u.indeterminate = m);
                  },
                  onChange: x
                }
              )
            }
          ),
          ["Started", "Status", "Duration", "Retries", "Cost", "Triggered by", "Run ID", ""].map((u, v) => /* @__PURE__ */ n(
            "th",
            {
              scope: "col",
              className: "px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
              children: u
            },
            `${u}-${v}`
          ))
        ] }) }),
        /* @__PURE__ */ n("tbody", { children: e.map((u, v) => {
          const { tone: w, label: N } = ln(u.status), C = t.has(u.id), y = fl(u);
          return /* @__PURE__ */ l(
            "tr",
            {
              "data-testid": `run-card-${u.id}`,
              className: $(
                "border-b border-border cursor-pointer hover:bg-[#f1f5f9]",
                C && "bg-[#f1f5f9]"
              ),
              onClick: () => c(`/pipelines/${d}/runs/${u.id}`),
              children: [
                /* @__PURE__ */ l("td", { className: "px-3 py-2.5 text-xs text-text-secondary w-6", onClick: (k) => k.stopPropagation(), children: [
                  /* @__PURE__ */ n(
                    "input",
                    {
                      type: "checkbox",
                      "data-testid": `run-select-${u.id}`,
                      checked: C,
                      onMouseDown: (k) => {
                        p.current = k.shiftKey;
                      },
                      onKeyDown: (k) => {
                        p.current = k.shiftKey;
                      },
                      onChange: () => {
                        const k = p.current;
                        p.current = !1, g(u.id, v, k);
                      },
                      "aria-label": `Select run ${u.id.slice(0, 8)}`
                    }
                  ),
                  /* @__PURE__ */ n(
                    "input",
                    {
                      type: "checkbox",
                      "data-testid": `run-compare-pick-${u.id}`,
                      checked: s.includes(u.id),
                      onChange: () => i(u.id),
                      "aria-label": `Pick run ${u.id.slice(0, 8)} for comparison`,
                      className: "absolute w-px h-px opacity-0 pointer-events-none",
                      tabIndex: -1
                    }
                  )
                ] }),
                /* @__PURE__ */ n("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: wl(u.startedAt) }),
                /* @__PURE__ */ l("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: [
                  /* @__PURE__ */ n(xe, { tone: w, "aria-label": `Status: ${N}`, children: N }),
                  u.status === "running" && u.stuckAt && /* @__PURE__ */ n(
                    xe,
                    {
                      tone: "warning",
                      size: "xs",
                      "data-testid": `run-stuck-badge-${u.id}`,
                      title: `No pipeline events since ${new Date(u.stuckAt).toLocaleTimeString()}`,
                      className: "ml-1.5",
                      children: "Stuck"
                    }
                  ),
                  u.status === "failed" && u.error?.errorCategory && /* @__PURE__ */ n(
                    xe,
                    {
                      tone: yl(u.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${u.id}`,
                      title: u.error.message,
                      className: "ml-1.5",
                      children: vl[u.error.errorCategory] ?? u.error.errorCategory
                    }
                  )
                ] }),
                /* @__PURE__ */ n("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: ve(u.durationMs) }),
                /* @__PURE__ */ n(
                  "td",
                  {
                    className: $(
                      "px-3 py-2.5 text-xs font-mono",
                      y > 0 ? "text-text-primary" : "text-text-tertiary"
                    ),
                    "data-testid": `run-retries-${u.id}`,
                    title: y > 0 ? `${y} retry attempts across this run` : "No retries — every step succeeded on first attempt",
                    children: y > 0 ? `×${y}` : "—"
                  }
                ),
                /* @__PURE__ */ n(
                  "td",
                  {
                    className: "px-3 py-2.5 text-xs text-text-secondary font-mono",
                    "data-testid": `run-cost-${u.id}`,
                    children: o[u.id] ?? "—"
                  }
                ),
                /* @__PURE__ */ n("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: u.triggeredBy.userId ?? u.triggeredBy.triggerType }),
                /* @__PURE__ */ n("td", { className: "px-3 py-2.5 text-[11px] font-mono text-text-tertiary", children: u.id.slice(0, 8) }),
                /* @__PURE__ */ l("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right", onClick: (k) => k.stopPropagation(), children: [
                  u.status === "running" && u.stuckAt && /* @__PURE__ */ n(
                    "button",
                    {
                      type: "button",
                      "data-testid": `force-fail-${u.id}`,
                      onClick: async (k) => {
                        if (k.stopPropagation(), !!confirm(`Force-fail stuck run ${u.id.slice(0, 8)}? The run will be interrupted and you can retry from the stuck step.`))
                          try {
                            await Ar(u.pipelineId, u.id);
                          } catch (b) {
                            alert(`Force-fail failed: ${b instanceof Error ? b.message : String(b)}`);
                          }
                      },
                      title: "Force-fail this stuck run so you can retry from the stuck step",
                      className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-[#b45309] border border-[#fde68a] rounded cursor-pointer font-[inherit]",
                      children: "⚡ Force-fail"
                    }
                  ),
                  u.status === "failed" && u.error?.nodeId && u.error.nodeId !== "unknown" && /* @__PURE__ */ n(
                    "button",
                    {
                      type: "button",
                      "data-testid": `retry-from-failed-step-${u.id}`,
                      onClick: (k) => {
                        k.stopPropagation(), a(u);
                      },
                      title: `Retry from "${u.error.nodeId}" with the original upstream context`,
                      className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-[#ea580c] border border-[#fed7aa] rounded cursor-pointer font-[inherit]",
                      children: "↻ Retry from failed"
                    }
                  ),
                  /* @__PURE__ */ n("span", { className: "text-xs text-primary", children: "View →" })
                ] })
              ]
            },
            u.id
          );
        }) })
      ]
    }
  );
}
function nd() {
  const { pipelineId: e } = at(), t = Ee(), [r, s] = Rt(), [i, o] = R([]), [d, c] = R(null), [a, p] = R([]), [f, h] = R(() => /* @__PURE__ */ new Set()), [m, x] = R(null), [g, u] = R(!1), [v, w] = R(null), [N, C] = R(!1), y = M((j) => {
    const X = j.error?.nodeId;
    if (!X || X === "unknown") return;
    const Z = Object.entries(j.steps).filter(([le, be]) => le !== X && be.status === "completed").map(([le]) => le);
    x({ run: j, nodeId: X, skippedNodes: Z, snapshotInput: !1 }), w(null);
  }, []), k = M(async () => {
    if (m) {
      w(null), u(!0);
      try {
        const j = await Xt(
          m.run.pipelineId,
          m.run.id,
          m.nodeId,
          void 0,
          m.snapshotInput || void 0
        );
        x(null), t(`/pipelines/${m.run.pipelineId}/runs/${j.newRunId}`);
      } catch (j) {
        w(j instanceof Error ? j.message : String(j)), u(!1);
      }
    }
  }, [m, t]), { query: b, statuses: T, triggerKinds: I, range: S } = F(
    () => wr(r),
    [r]
  ), D = (j, X) => {
    const Z = new URLSearchParams(r);
    X ? Z.set(j, X) : Z.delete(j), s(Z, { replace: !0 });
  }, _ = (j) => {
    const X = new Set(T);
    X.has(j) ? X.delete(j) : X.add(j), D("status", X.size === 0 ? null : Array.from(X).join(","));
  }, W = (j) => {
    const X = new Set(I);
    X.has(j) ? X.delete(j) : X.add(j), D("trigger", X.size === 0 ? null : Array.from(X).join(","));
  }, Q = (j) => {
    D("range", j === "7d" ? null : j);
  }, ee = (j) => {
    D("q", j.length === 0 ? null : j);
  }, de = (j) => {
    p((X) => X.includes(j) ? X.filter((Z) => Z !== j) : X.length >= 2 ? [X[1], j] : [...X, j]);
  };
  G(() => {
    e && (c(Re(e)), o(et(e)));
  }, [e]);
  const O = F(
    () => vr(i, { query: b, statuses: T, triggerKinds: I, range: S }),
    [i, b, T, I, S]
  ), U = F(() => {
    const j = /* @__PURE__ */ new Map();
    if (!d) return j;
    for (const X of d.nodes)
      X.data.type === "llm" && j.set(X.id, X.data.model);
    return j;
  }, [d]), P = F(() => {
    const j = {};
    for (const X of O) {
      const Z = Object.values(X.steps).filter((le) => !!le.llm).map((le) => ({
        model: U.get(le.nodeId),
        tokensIn: le.llm?.tokensIn ?? 0,
        tokensOut: le.llm?.tokensOut ?? 0
      }));
      j[X.id] = wt(pt(Z).total);
    }
    return j;
  }, [O, U]), B = () => {
    if (!e) return;
    C(!1);
    const j = Array.from(f), X = i.filter((Z) => !f.has(Z.id));
    ar(e);
    for (const Z of [...X].sort((le, be) => le.startedAt.localeCompare(be.startedAt)))
      ir(e, Z);
    o(et(e)), h(/* @__PURE__ */ new Set()), p((Z) => Z.filter((le) => !j.includes(le)));
  }, K = () => {
    const j = i.filter((L) => f.has(L.id));
    if (j.length === 0) return;
    const X = new Blob([JSON.stringify(j, null, 2)], { type: "application/json" }), Z = URL.createObjectURL(X), le = document.createElement("a"), be = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    le.href = Z, le.download = `pipeline-runs-${be}.json`, document.body.appendChild(le), le.click(), document.body.removeChild(le), URL.revokeObjectURL(Z);
  };
  return e ? d ? /* @__PURE__ */ l("div", { "data-testid": "pipeline-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ n(
      zt,
      {
        open: m !== null,
        onConfirm: k,
        onCancel: () => {
          g || x(null);
        },
        title: "Retry from failure",
        confirmLabel: g ? "Starting…" : "Confirm retry",
        confirmDisabled: g,
        children: m && /* @__PURE__ */ l("div", { className: "flex flex-col gap-2.5", children: [
          /* @__PURE__ */ l("div", { className: "text-[13px] text-text-secondary", children: [
            "Run ",
            /* @__PURE__ */ n("code", { className: "bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs", children: m.run.id.slice(0, 8) }),
            " will restart from step",
            " ",
            /* @__PURE__ */ l("code", { className: "bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs", children: [
              m.nodeId.slice(0, 12),
              m.nodeId.length > 12 ? "…" : ""
            ] }),
            " ",
            "using the original upstream context."
          ] }),
          m.skippedNodes.length > 0 && /* @__PURE__ */ l("div", { children: [
            /* @__PURE__ */ l("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5", children: [
              "Steps skipped (",
              m.skippedNodes.length,
              ")"
            ] }),
            /* @__PURE__ */ n("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: m.skippedNodes.map((j) => /* @__PURE__ */ n("span", { className: "bg-[#fafbfc] border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary", children: j.slice(0, 10) }, j)) })
          ] }),
          /* @__PURE__ */ l("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
            /* @__PURE__ */ n("input", { type: "checkbox", checked: m.snapshotInput, onChange: (j) => x((X) => X && { ...X, snapshotInput: j.target.checked }), className: "accent-primary" }),
            "Use persisted input snapshot"
          ] }),
          v && /* @__PURE__ */ n("div", { "data-testid": "retry-modal-error", className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: v })
        ] })
      }
    ),
    /* @__PURE__ */ n(
      zt,
      {
        open: N,
        onConfirm: B,
        onCancel: () => C(!1),
        title: `Delete ${f.size} run${f.size === 1 ? "" : "s"}?`,
        body: "This cannot be undone.",
        confirmLabel: `Delete ${f.size}`,
        tone: "destructive"
      }
    ),
    v && /* @__PURE__ */ n(rt, { title: "Retry failed:", onDismiss: () => w(null), children: v }),
    /* @__PURE__ */ l("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          onClick: () => t(`/pipelines/${e}`),
          className: "bg-none border-none text-primary cursor-pointer text-[13px] p-0",
          children: [
            "← ",
            d.name
          ]
        }
      ),
      /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "/" }),
      /* @__PURE__ */ n("span", { className: "text-lg font-bold text-text-primary", children: "Run history" }),
      /* @__PURE__ */ l("span", { className: "text-xs text-text-tertiary ml-auto", children: [
        i.length,
        " run",
        i.length === 1 ? "" : "s",
        " persisted"
      ] }),
      /* @__PURE__ */ n(
        "button",
        {
          type: "button",
          onClick: () => t(`/pipelines/${e}/stats`),
          "data-testid": "runs-stats-link",
          className: "px-2.5 py-1 text-xs font-medium border border-border bg-surface text-text-secondary rounded cursor-pointer font-[inherit]",
          children: "📊 Stats"
        }
      ),
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          disabled: a.length !== 2,
          onClick: () => {
            if (a.length !== 2) return;
            const [j, X] = a;
            t(`/pipelines/${e}/runs/compare/${j}/${X}`);
          },
          "data-testid": "run-compare-btn",
          className: $(
            "px-2.5 py-1 text-xs font-medium rounded font-[inherit]",
            a.length === 2 ? "border border-primary bg-primary text-white cursor-pointer opacity-100" : "border border-border bg-surface text-text-secondary cursor-not-allowed opacity-70"
          ),
          children: [
            "⇄ Compare (",
            a.length,
            "/2)"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ n(
      Nr,
      {
        query: b,
        statuses: T,
        triggerKinds: I,
        range: S,
        onQueryChange: ee,
        onStatusToggle: _,
        onTriggerToggle: W,
        onRangeChange: Q,
        onClearFilters: () => {
          ee(""), D("status", null), D("trigger", null);
        }
      }
    ),
    f.size > 0 && /* @__PURE__ */ n(
      bl,
      {
        selectionCount: f.size,
        onExport: K,
        onDelete: () => {
          f.size > 0 && e && C(!0);
        },
        onClear: () => h(/* @__PURE__ */ new Set())
      }
    ),
    O.length === 0 ? /* @__PURE__ */ n(
      _e,
      {
        icon: "📜",
        title: i.length === 0 ? "No runs yet" : "No runs match these filters",
        body: i.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
      }
    ) : /* @__PURE__ */ n(
      Nl,
      {
        filtered: O,
        selected: f,
        onSelectionChange: h,
        comparePair: a,
        onToggleComparePair: de,
        costByRunId: P,
        pipelineId: e,
        onNavigate: t,
        onOpenRetryModal: y
      }
    )
  ] }) : /* @__PURE__ */ n("div", { className: "p-8", children: /* @__PURE__ */ n(
    _e,
    {
      icon: "🔍",
      title: "Pipeline not found",
      body: "It may have been deleted. Go back to the pipelines list.",
      actionLabel: "Back to pipelines",
      onAction: () => t("/pipelines")
    }
  ) }) : /* @__PURE__ */ n(lt, { to: "/pipelines", replace: !0 });
}
function kl(e) {
  return F(() => {
    if (!e) return null;
    const t = Re(e.pipelineId);
    if (!t) return null;
    const r = /* @__PURE__ */ new Map();
    for (const i of t.nodes)
      i.data.type === "llm" && r.set(i.id, i.data.model);
    const s = Object.values(e.steps).filter((i) => !!i.llm).map((i) => ({
      model: r.get(i.nodeId),
      tokensIn: i.llm?.tokensIn ?? 0,
      tokensOut: i.llm?.tokensOut ?? 0
    }));
    return pt(s).total;
  }, [e]);
}
function Je({ title: e, children: t }) {
  return /* @__PURE__ */ l("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ n("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: e }),
    t
  ] });
}
const On = "m-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", Un = "px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", qt = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", Se = "px-2 py-[5px] text-[11px] text-text-secondary align-top", Cl = {
  "#2563eb": "bg-blue-600/10 text-blue-600",
  "#7c3aed": "bg-violet-600/10 text-violet-600",
  "#16a34a": "bg-green-600/10 text-green-600",
  "#dc2626": "bg-red-600/10 text-red-600"
};
function ft(e) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${Cl[e] ?? ""}`.trimEnd();
}
const Il = {
  completed: "#16a34a",
  failed: "#dc2626",
  running: "#2563eb"
};
function Sl({ stepId: e, step: t, index: r, nodeType: s, nodeConfig: i, onRetryFromStep: o, onResumeFromStep: d }) {
  const [c, a] = R(!1), p = t.output, f = p?.response, h = t.llm, m = t.input, x = Il[t.status] ?? "#94a3b8";
  return /* @__PURE__ */ l("div", { className: "relative pl-9 mb-1", children: [
    /* @__PURE__ */ n(
      "div",
      {
        className: "absolute left-[10px] top-[14px] w-3 h-3 rounded-full border-2 border-white z-[1] shadow-[0_0_0_1px_#e2e8f0]",
        style: { background: x }
      }
    ),
    /* @__PURE__ */ l(
      "div",
      {
        onClick: () => a(!c),
        "aria-expanded": c,
        role: "button",
        tabIndex: 0,
        onKeyDown: (g) => {
          (g.key === "Enter" || g.key === " ") && (g.preventDefault(), a(!c));
        },
        className: $(
          "flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer transition-colors duration-100",
          c ? "bg-[#fafbfc] rounded-t-lg" : "bg-surface rounded-lg"
        ),
        style: {
          border: `1px solid ${c ? x + "40" : "#e2e8f0"}`,
          ...c ? { borderRadius: "8px 8px 0 0" } : {}
        },
        children: [
          /* @__PURE__ */ n(
            "span",
            {
              "aria-hidden": "true",
              className: $(
                "text-[10px] text-text-tertiary shrink-0 transition-transform duration-150",
                c && "rotate-90"
              ),
              children: "▶"
            }
          ),
          /* @__PURE__ */ n(
            "span",
            {
              "aria-label": `Status: ${t.status}`,
              className: "text-[10px] font-bold text-white px-1.5 py-0.5 rounded-[3px] uppercase shrink-0",
              style: { background: x },
              children: t.status
            }
          ),
          /* @__PURE__ */ l("span", { className: "text-[13px] font-semibold text-text-primary", children: [
            r + 1,
            ". ",
            s
          ] }),
          /* @__PURE__ */ n("span", { className: "text-[11px] font-mono text-text-tertiary", children: e.slice(0, 8) }),
          t.durationMs != null && /* @__PURE__ */ n("span", { className: "text-[11px] text-text-tertiary ml-auto", children: t.durationMs < 1e3 ? `${t.durationMs}ms` : `${(t.durationMs / 1e3).toFixed(1)}s` }),
          h && /* @__PURE__ */ l("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
            h.tokensIn + h.tokensOut,
            " tok"
          ] }),
          p?.tokensIn != null && !h && /* @__PURE__ */ l("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
            Number(p.tokensIn) + Number(p.tokensOut),
            " tok"
          ] })
        ]
      }
    ),
    c && /* @__PURE__ */ l(
      "div",
      {
        className: "border-t-0 rounded-b-lg bg-surface overflow-hidden",
        style: { border: `1px solid ${x}40` },
        children: [
          /* @__PURE__ */ n(Je, { title: "Execution Timeline", children: /* @__PURE__ */ l("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ n("th", { scope: "col", className: qt, children: "Event" }),
              /* @__PURE__ */ n("th", { scope: "col", className: qt, children: "Time" }),
              /* @__PURE__ */ n("th", { scope: "col", className: qt, children: "Detail" })
            ] }) }),
            /* @__PURE__ */ l("tbody", { children: [
              t.startedAt && /* @__PURE__ */ l("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ n("td", { className: Se, children: /* @__PURE__ */ n("span", { className: ft("#2563eb"), children: "started" }) }),
                /* @__PURE__ */ n("td", { className: Se, children: new Date(t.startedAt).toLocaleTimeString() }),
                /* @__PURE__ */ l("td", { className: Se, children: [
                  "Node ",
                  e.slice(0, 8),
                  " (",
                  s,
                  ") began execution"
                ] })
              ] }),
              h?.streamOpened && /* @__PURE__ */ l("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ n("td", { className: Se, children: /* @__PURE__ */ n("span", { className: ft("#7c3aed"), children: "stream.opened" }) }),
                /* @__PURE__ */ n("td", { className: Se, children: "—" }),
                /* @__PURE__ */ n("td", { className: Se, children: "LLM stream connection established" })
              ] }),
              h?.firstTokenLatencyMs != null && /* @__PURE__ */ l("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ n("td", { className: Se, children: /* @__PURE__ */ n("span", { className: ft("#7c3aed"), children: "first.token" }) }),
                /* @__PURE__ */ l("td", { className: Se, children: [
                  "+",
                  h.firstTokenLatencyMs,
                  "ms"
                ] }),
                /* @__PURE__ */ n("td", { className: Se, children: "First token received from LLM" })
              ] }),
              t.completedAt && t.status === "completed" && /* @__PURE__ */ l("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ n("td", { className: Se, children: /* @__PURE__ */ n("span", { className: ft("#16a34a"), children: "completed" }) }),
                /* @__PURE__ */ n("td", { className: Se, children: new Date(t.completedAt).toLocaleTimeString() }),
                /* @__PURE__ */ l("td", { className: Se, children: [
                  "Finished in ",
                  t.durationMs != null ? t.durationMs < 1e3 ? `${t.durationMs}ms` : `${(t.durationMs / 1e3).toFixed(1)}s` : "—"
                ] })
              ] }),
              t.status === "failed" && /* @__PURE__ */ l("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ n("td", { className: Se, children: /* @__PURE__ */ n("span", { className: ft("#dc2626"), children: "failed" }) }),
                /* @__PURE__ */ n("td", { className: Se, children: t.completedAt ? new Date(t.completedAt).toLocaleTimeString() : "—" }),
                /* @__PURE__ */ n("td", { className: Se, children: t.error ?? "Unknown error" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ n(Je, { title: "Node Configuration", children: i && Object.keys(i).length > 1 ? /* @__PURE__ */ n("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(i).filter(([g]) => g !== "type").map(([g, u]) => /* @__PURE__ */ l(Yn.Fragment, { children: [
            /* @__PURE__ */ n("span", { className: "text-text-tertiary font-medium", children: g }),
            /* @__PURE__ */ n(
              "span",
              {
                className: $(
                  "text-text-secondary break-words",
                  typeof u == "string" && u.length > 60 ? "whitespace-pre-wrap font-sans" : "whitespace-nowrap font-mono"
                ),
                children: typeof u == "string" ? u : JSON.stringify(u)
              }
            )
          ] }, g)) }) : /* @__PURE__ */ n("span", { className: "text-xs text-text-tertiary italic", children: "No configuration" }) }),
          m && Object.keys(m).length > 0 && /* @__PURE__ */ n(Je, { title: "Runtime Input", children: /* @__PURE__ */ n("pre", { className: On, children: JSON.stringify(m, null, 2) }) }),
          h?.prompt && /* @__PURE__ */ n(Je, { title: "Resolved Prompt", children: /* @__PURE__ */ n("div", { className: Un, children: h.prompt }) }),
          f || h?.response ? /* @__PURE__ */ n(Je, { title: "Response", children: /* @__PURE__ */ n("div", { className: Un, children: f ?? h?.response }) }) : /* @__PURE__ */ n(Je, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ n("pre", { className: On, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ n("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
          (h || p?.tokensIn != null) && /* @__PURE__ */ n(Je, { title: "Token Usage", children: /* @__PURE__ */ l("div", { className: "flex gap-5 flex-wrap text-xs text-text-secondary", children: [
            /* @__PURE__ */ l("span", { children: [
              "Tokens in: ",
              /* @__PURE__ */ n("strong", { children: String(h?.tokensIn ?? p?.tokensIn ?? "—") })
            ] }),
            /* @__PURE__ */ l("span", { children: [
              "Tokens out: ",
              /* @__PURE__ */ n("strong", { children: String(h?.tokensOut ?? p?.tokensOut ?? "—") })
            ] }),
            h?.firstTokenLatencyMs != null && /* @__PURE__ */ l("span", { children: [
              "First token: ",
              /* @__PURE__ */ l("strong", { children: [
                h.firstTokenLatencyMs,
                "ms"
              ] })
            ] })
          ] }) }),
          t.error && /* @__PURE__ */ n(Je, { title: "Error", children: /* @__PURE__ */ n("div", { className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap", children: t.error }) }),
          (o || d) && /* @__PURE__ */ l("div", { className: "px-4 py-2.5 border-t border-border flex justify-end gap-2", children: [
            d && /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                "data-testid": `resume-from-step-${e}`,
                onClick: (g) => {
                  g.stopPropagation(), d(e);
                },
                title: "Resume the same run from this step (preserves accumulated context)",
                className: "px-3 py-[5px] text-xs font-medium border border-primary bg-primary text-white rounded cursor-pointer font-[inherit]",
                children: "↻ Resume from here"
              }
            ),
            o && /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                "data-testid": `retry-from-step-${e}`,
                onClick: (g) => {
                  g.stopPropagation(), o(e);
                },
                className: "px-3 py-[5px] text-xs font-medium border border-primary bg-transparent text-primary rounded cursor-pointer font-[inherit]",
                children: "↻ Retry from here"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function Tl({ steps: e, nodeDataMap: t, edges: r, onRetryFromStep: s, onResumeFromStep: i }) {
  const o = F(() => {
    const a = Object.entries(e).sort(([, y], [, k]) => {
      const b = y.completedAt ? Date.parse(y.completedAt) - (y.durationMs ?? 0) : 0, T = k.completedAt ? Date.parse(k.completedAt) - (k.durationMs ?? 0) : 0;
      return b - T;
    });
    if (!r || r.length === 0)
      return a.map(([y, k]) => ({
        stepId: y,
        step: k,
        children: []
      }));
    const p = (y) => {
      const k = y.lastIndexOf(":");
      if (k > 0) {
        const b = y.slice(k + 1);
        if (/^\d+$/.test(b)) return y.slice(0, k);
      }
      return y;
    }, f = /* @__PURE__ */ new Set(["fork", "condition", "approval"]), h = /* @__PURE__ */ new Set();
    for (const [y] of a) {
      const k = p(y), b = t[k]?.type;
      b && f.has(b) && h.add(k);
    }
    const m = (y) => y.startsWith("branch-") || y === "true" || y === "false" || y === "approved" || y === "rejected", x = [];
    for (const y of r)
      h.has(y.source) && m(y.sourceHandle) && x.push({ forkId: y.source, branch: y.sourceHandle, targetNodeId: y.target });
    const g = /* @__PURE__ */ new Map();
    for (const y of r)
      g.has(y.source) || g.set(y.source, []), g.get(y.source).push({ target: y.target, handle: y.sourceHandle });
    const u = /* @__PURE__ */ new Set();
    function v(y) {
      const k = [];
      let b = y;
      for (; b; ) {
        const T = a.find(([Q]) => p(Q) === b && !u.has(Q));
        if (!T) break;
        const [I, S] = T;
        u.add(I);
        const D = { stepId: I, step: S, children: [] }, _ = p(I);
        if (h.has(_)) {
          const Q = x.filter((ee) => ee.forkId === _);
          for (const { branch: ee, targetNodeId: de } of Q) {
            const O = v(de);
            for (const U of O)
              U.branch = U.branch ?? ee;
            O.length > 0 && (O[0].branch = ee, D.children.push(...O));
          }
        }
        k.push(D);
        const W = g.get(_)?.filter((Q) => Q.handle === "out");
        b = W && W.length === 1 ? W[0].target : null;
      }
      return k;
    }
    const w = /* @__PURE__ */ new Set();
    for (const y of r)
      w.add(y.target);
    const N = a.find(([y]) => !w.has(p(y)))?.[1] ? a.find(([y]) => !w.has(p(y)))[0] : a[0]?.[0];
    let C = [];
    N && (C = v(p(N)));
    for (const [y, k] of a)
      u.has(y) || C.push({ stepId: y, step: k, children: [] });
    return C;
  }, [e, t, r]), d = (a) => {
    if (t[a]) return t[a];
    const p = a.lastIndexOf(":");
    if (p > 0 && /^\d+$/.test(a.slice(p + 1)))
      return t[a.slice(0, p)];
  };
  function c(a, p) {
    let f = p;
    return a.map((h) => {
      const m = f++, x = /* @__PURE__ */ new Map();
      for (const g of h.children) {
        const u = g.branch ?? "default";
        x.has(u) || x.set(u, []), x.get(u).push(g);
      }
      return /* @__PURE__ */ l(Yn.Fragment, { children: [
        /* @__PURE__ */ n(
          Sl,
          {
            stepId: h.stepId,
            step: h.step,
            index: m,
            nodeType: d(h.stepId)?.type ?? "unknown",
            nodeConfig: d(h.stepId)?.data,
            onRetryFromStep: s,
            onResumeFromStep: i
          }
        ),
        h.children.length > 0 && /* @__PURE__ */ n("div", { className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1", children: Array.from(x.entries()).map(([g, u], v) => /* @__PURE__ */ l("div", { children: [
          /* @__PURE__ */ n("div", { className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${v === 0 ? "mt-1" : "mt-2"}`, children: g.replace("-", " ") }),
          c(u, f)
        ] }, g)) })
      ] }, h.stepId);
    });
  }
  return /* @__PURE__ */ l("div", { className: "relative", children: [
    /* @__PURE__ */ n("div", { className: "absolute left-[15px] top-6 bottom-6 w-0.5 bg-border rounded-sm" }),
    c(o, 0)
  ] });
}
const Al = 5e3, Dl = "synthetic-";
function Rl(e) {
  switch (e) {
    case "pipeline.step.started":
      return "pipeline.step.started";
    case "pipeline.step.completed":
      return "pipeline.step.completed";
    case "pipeline.step.failed":
      return "pipeline.step.failed";
    case "pipeline.step.breakpoint":
      return "pipeline.step.breakpoint.hit";
    case "pipeline.run.completed":
      return "pipeline.run.completed";
    case "pipeline.run.failed":
      return "pipeline.run.failed";
    case "pipeline.run.resumed-from-step":
      return "pipeline.run.resumed-from-step";
    case "pipeline.approval.requested":
      return null;
    // request lacks an audit-row twin
    case "pipeline.approval.recorded":
      return "pipeline.approve";
    default:
      return null;
  }
}
function Gt(e, t) {
  return t.timestamp.localeCompare(e.timestamp);
}
function $l(e, t) {
  if (t.length === 0) return e.slice().sort(Gt);
  const r = new Set(e.map((o) => o.auditId)), s = /* @__PURE__ */ new Map();
  for (const o of e) {
    const d = s.get(o.action);
    (!d || o.timestamp > d) && s.set(o.action, o.timestamp);
  }
  const i = t.filter((o) => {
    if (r.has(o.auditId)) return !1;
    const d = s.get(o.action);
    return !d || o.timestamp >= d;
  });
  return [...e, ...i].sort(Gt);
}
function Pl(e, t, r = {}) {
  const { pollMs: s = Al, filters: i } = r, o = Qn(), [d, c] = R([]), [a, p] = R([]), [f, h] = R(!0), [m, x] = R(null), [g, u] = R(void 0), [v, w] = R(0), [N, C] = R(!1), y = JSON.stringify({
    since: i?.since,
    until: i?.until,
    actions: i?.actions,
    limit: i?.limit
  });
  G(() => {
    if (!e || !t) return;
    let S = !1;
    return h(!0), x(null), (async () => {
      try {
        const D = await pn(e, t, i ?? {});
        if (S) return;
        c(D.items), u(D.nextCursor), h(!1);
      } catch (D) {
        if (S) return;
        x(D instanceof Error ? D.message : String(D)), h(!1);
      }
    })(), () => {
      S = !0;
    };
  }, [e, t, y, v]), G(() => {
    if (!e || !t || s <= 0) return;
    const S = window.setInterval(() => {
      w((D) => D + 1);
    }, s);
    return () => window.clearInterval(S);
  }, [e, t, s]), G(() => {
    if (!e || !t) return;
    const S = [], D = (W, Q) => {
      const ee = Rl(W);
      if (!ee) return;
      const de = Q;
      if (de.runId !== t) return;
      C(!0);
      const O = {
        auditId: `${Dl}${W}-${de.stepId ?? "run"}-${Date.now()}`,
        timestamp: de.at ?? (/* @__PURE__ */ new Date()).toISOString(),
        action: ee,
        actorUserId: "executor",
        pipelineId: e,
        runId: t,
        trace: Q
      };
      p((U) => [O, ...U]);
    }, _ = [
      "pipeline.step.started",
      "pipeline.step.completed",
      "pipeline.step.failed",
      "pipeline.step.breakpoint",
      "pipeline.run.completed",
      "pipeline.run.failed",
      "pipeline.run.resumed-from-step",
      "pipeline.approval.recorded"
    ];
    for (const W of _)
      S.push(o.subscribe(W, (Q) => D(W, Q)));
    return S.push(o.subscribeToRun(t)), () => {
      for (const W of S) W();
    };
  }, [o, e, t]), G(() => {
    d.length !== 0 && p((S) => {
      if (S.length === 0) return S;
      const D = /* @__PURE__ */ new Map();
      for (const _ of d) {
        const W = D.get(_.action);
        (!W || _.timestamp > W) && D.set(_.action, _.timestamp);
      }
      return S.filter((_) => {
        const W = D.get(_.action);
        return !W || _.timestamp >= W;
      });
    });
  }, [d]);
  const k = oe(!1), b = M(() => {
    !e || !t || !g || k.current || (k.current = !0, (async () => {
      try {
        const S = await pn(e, t, {
          ...i ?? {},
          cursor: g
        });
        c((D) => {
          const _ = new Set(D.map((Q) => Q.auditId)), W = D.concat(S.items.filter((Q) => !_.has(Q.auditId)));
          return W.sort(Gt), W;
        }), u(S.nextCursor);
      } catch (S) {
        x(S instanceof Error ? S.message : String(S));
      } finally {
        k.current = !1;
      }
    })());
  }, [e, t, g, y]), T = M(() => {
    w((S) => S + 1);
  }, []);
  return {
    items: F(() => $l(d, a), [d, a]),
    loading: f,
    error: m,
    hasMore: !!g,
    loadMore: b,
    liveHealthy: N,
    refresh: T
  };
}
const Ml = "#3b82f6", El = "#eab308", Ol = "#f97316", _n = "#64748b", Ul = "#ef4444", _l = "#a855f7";
function Ll(e) {
  return e.action === "pipeline.step.failed" || e.outcome === "error" ? Ul : e.action === "pipeline.run.resumed-from-step" || e.action.startsWith("pipeline.step.context.patched") ? _l : e.action.startsWith("pipeline.approval.") ? El : e.action.startsWith("pipeline.breakpoint.") ? Ol : e.action.startsWith("pipeline.step.") ? Ml : (e.action.startsWith("pipeline.run."), _n);
}
const Bl = {
  "1h": "Last 1h",
  "24h": "Last 24h",
  all: "All"
}, Ln = [
  { label: "Steps", matches: (e) => e.startsWith("pipeline.step.") },
  { label: "Approvals", matches: (e) => e.startsWith("pipeline.approval.") || e === "pipeline.approve" || e === "pipeline.reject" },
  { label: "Breakpoints", matches: (e) => e.startsWith("pipeline.breakpoint.") || e === "pipeline.step.breakpoint.hit" },
  { label: "Run lifecycle", matches: (e) => e.startsWith("pipeline.run.") || e === "pipeline.trigger" || e === "pipeline.cancel" },
  { label: "Errors", matches: (e) => e === "pipeline.step.failed" || e === "pipeline.run.failed" || e === "pipeline.force_fail" }
];
function Fl(e) {
  if (e === "all") return null;
  const t = Date.now();
  return e === "1h" ? t - 3600 * 1e3 : t - 1440 * 60 * 1e3;
}
function Bn(e) {
  const t = e.details, r = e.trace, s = t && typeof t.stepId == "string" ? t.stepId : void 0, i = r && typeof r.stepId == "string" ? r.stepId : void 0, o = r && typeof r.nodeId == "string" ? r.nodeId : void 0;
  return s ?? i ?? o;
}
function jl(e, t = Date.now()) {
  const r = Date.parse(e);
  if (!Number.isFinite(r)) return e;
  const s = Math.max(0, Math.floor((t - r) / 1e3));
  if (s < 5) return "just now";
  if (s < 60) return `${s}s ago`;
  const i = Math.floor(s / 60);
  if (i < 60) return `${i}m ago`;
  const o = Math.floor(i / 60);
  return o < 24 ? `${o}h ago` : `${Math.floor(o / 24)}d ago`;
}
function ql({
  pipelineId: e,
  runId: t,
  onStepClick: r
}) {
  const s = Pl(e, t), { items: i, error: o, hasMore: d, loadMore: c, loading: a } = s, [p, f] = R(/* @__PURE__ */ new Set()), [h, m] = R(""), [x, g] = R("all"), [u, v] = R(/* @__PURE__ */ new Set()), w = M((b) => {
    f((T) => {
      const I = new Set(T);
      return I.has(b) ? I.delete(b) : I.add(b), I;
    });
  }, []), N = M((b) => {
    v((T) => {
      const I = new Set(T);
      return I.has(b) ? I.delete(b) : I.add(b), I;
    });
  }, []), C = F(() => {
    const b = Fl(x), T = h.trim().toLowerCase(), I = Ln.filter((S) => p.has(S.label));
    return i.filter((S) => {
      if (I.length > 0 && !I.some((D) => D.matches(S.action)) || T && !S.actorUserId.toLowerCase().includes(T)) return !1;
      if (b !== null) {
        const D = Date.parse(S.timestamp);
        if (!Number.isFinite(D) || D < b) return !1;
      }
      return !0;
    });
  }, [i, p, h, x]), y = M(() => {
    if (typeof window > "u") return;
    const b = C.map((D) => JSON.stringify(D)).join(`
`) + (C.length > 0 ? `
` : ""), T = new Blob([b], { type: "application/x-ndjson" }), I = URL.createObjectURL(T), S = document.createElement("a");
    S.href = I, S.download = `executor-log-${t}.ndjson`, document.body.appendChild(S), S.click(), document.body.removeChild(S), URL.revokeObjectURL(I);
  }, [C, t]), k = M(
    (b) => {
      if (N(b.auditId), !r || !b.action.startsWith("pipeline.step.")) return;
      const T = Bn(b);
      T && r(T);
    },
    [r, N]
  );
  return /* @__PURE__ */ l(
    "div",
    {
      className: "flex flex-col flex-1 min-h-0 bg-surface border border-border rounded-lg overflow-hidden",
      "data-testid": "executor-log",
      children: [
        /* @__PURE__ */ l("div", { className: "sticky top-0 z-[2] flex flex-wrap items-center gap-2 px-3 py-2.5 bg-[#f8fafc] border-b border-border text-xs", children: [
          /* @__PURE__ */ l(
            "span",
            {
              className: $(
                "inline-flex items-center text-[11px] font-semibold",
                o ? "text-text-tertiary" : "text-text-secondary"
              ),
              "data-testid": "executor-log-live-indicator",
              title: o ? `Live updates unavailable: ${o}` : "Live updates active",
              children: [
                /* @__PURE__ */ n(
                  "span",
                  {
                    className: $(
                      "inline-block w-2 h-2 rounded-full mr-1.5 align-middle",
                      o ? "bg-text-tertiary" : "bg-[#22c55e] [animation:executor-log-pulse_1.6s_ease-in-out_infinite]"
                    ),
                    "aria-hidden": !0
                  }
                ),
                "Live"
              ]
            }
          ),
          /* @__PURE__ */ n("span", { className: "text-border", children: "|" }),
          Ln.map((b) => {
            const T = p.has(b.label);
            return /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: $(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  T ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => w(b.label),
                "data-testid": `executor-log-chip-${b.label.toLowerCase().replace(/\s+/g, "-")}`,
                "aria-pressed": T,
                children: b.label
              },
              b.label
            );
          }),
          /* @__PURE__ */ n("span", { className: "text-border", children: "|" }),
          /* @__PURE__ */ n(
            "input",
            {
              type: "text",
              value: h,
              onChange: (b) => m(b.target.value),
              placeholder: "Actor",
              className: "font-[inherit] text-xs px-2 py-1 border border-border-field rounded bg-surface text-text-primary min-w-[120px]",
              "data-testid": "executor-log-actor-input",
              "aria-label": "Filter by actor"
            }
          ),
          /* @__PURE__ */ n("span", { className: "text-border", children: "|" }),
          ["1h", "24h", "all"].map((b) => {
            const T = x === b;
            return /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: $(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  T ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => g(b),
                "data-testid": `executor-log-time-${b}`,
                "aria-pressed": T,
                children: Bl[b]
              },
              b
            );
          }),
          /* @__PURE__ */ n("div", { className: "flex-1" }),
          /* @__PURE__ */ l("span", { className: "text-[11px] text-text-tertiary", children: [
            C.length,
            " of ",
            i.length,
            " shown"
          ] })
        ] }),
        /* @__PURE__ */ l("div", { className: "flex-1 overflow-y-auto px-4 py-3 relative", "data-testid": "executor-log-timeline", children: [
          a && i.length === 0 && /* @__PURE__ */ n("div", { className: "text-xs text-text-tertiary p-3", children: "Loading audit rows…" }),
          !a && i.length === 0 && /* @__PURE__ */ n(
            "div",
            {
              className: "px-3 py-6 text-[13px] text-text-secondary text-center leading-relaxed",
              "data-testid": "executor-log-empty",
              children: "Audit log started recording on 2026-05-07 (hub#2224). This run predates that — no rows captured."
            }
          ),
          C.length === 0 && i.length > 0 && /* @__PURE__ */ n(
            "div",
            {
              className: "px-3 py-5 text-xs text-text-tertiary text-center",
              "data-testid": "executor-log-no-matches",
              children: "No audit rows match the current filters."
            }
          ),
          C.map((b) => {
            const T = u.has(b.auditId), S = b.action.startsWith("pipeline.step.") ? Bn(b) : void 0;
            return /* @__PURE__ */ l(
              "div",
              {
                className: "grid grid-cols-[14px_auto_auto_1fr] items-baseline gap-2.5 py-1.5 text-xs border-b border-[#fafbfc] cursor-pointer",
                onClick: () => k(b),
                "data-testid": "executor-log-row",
                "data-action": b.action,
                "data-audit-id": b.auditId,
                children: [
                  /* @__PURE__ */ n(
                    "span",
                    {
                      className: "w-2.5 h-2.5 rounded-full shrink-0 self-center",
                      style: { background: Ll(b) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ n(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: b.timestamp,
                      children: jl(b.timestamp)
                    }
                  ),
                  /* @__PURE__ */ n("span", { className: "text-text-secondary text-[11px] whitespace-nowrap", children: b.actorUserId }),
                  /* @__PURE__ */ l("span", { className: "text-text-primary flex items-baseline gap-1.5 flex-wrap", children: [
                    /* @__PURE__ */ n("code", { className: "font-mono text-[11px] bg-[#fafbfc] px-1.5 py-px rounded-[3px]", children: b.action }),
                    S && /* @__PURE__ */ l("span", { className: "text-[11px] text-text-tertiary", "data-testid": "executor-log-stepid", children: [
                      "· ",
                      S.slice(0, 14),
                      S.length > 14 ? "…" : ""
                    ] }),
                    b.outcome && /* @__PURE__ */ l(
                      "span",
                      {
                        className: $(
                          "text-[11px]",
                          b.outcome === "error" ? "text-[#b91c1c]" : "text-text-tertiary"
                        ),
                        children: [
                          "· ",
                          b.outcome
                        ]
                      }
                    )
                  ] }),
                  T && b.trace && /* @__PURE__ */ n(
                    "pre",
                    {
                      className: "col-[2/span_3] mt-1 p-2 bg-[#fafbfc] border border-border rounded text-[11px] font-mono text-text-secondary overflow-x-auto",
                      "data-testid": "executor-log-trace",
                      onClick: (D) => D.stopPropagation(),
                      children: JSON.stringify(b.trace, null, 2)
                    }
                  )
                ]
              },
              b.auditId
            );
          })
        ] }),
        /* @__PURE__ */ l("div", { className: "flex justify-between items-center gap-2 px-3 py-2.5 border-t border-border bg-[#f8fafc]", children: [
          d ? /* @__PURE__ */ n("span", { "data-testid": "executor-log-load-more", children: /* @__PURE__ */ n(
            Fe,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => c(),
              children: "Load more"
            }
          ) }) : /* @__PURE__ */ n("span", {}),
          /* @__PURE__ */ n("span", { "data-testid": "executor-log-download", children: /* @__PURE__ */ n(
            Fe,
            {
              variant: "secondary",
              size: "sm",
              onClick: y,
              disabled: C.length === 0,
              children: "Download log"
            }
          ) })
        ] })
      ]
    }
  );
}
function rd() {
  const { pipelineId: e, runId: t } = at();
  return !e || !t ? /* @__PURE__ */ n(lt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ n(sr, { pipelineId: e, children: /* @__PURE__ */ n(go, { children: /* @__PURE__ */ n(Hl, { pipelineId: e, runId: t }) }) });
}
function Hl({ pipelineId: e, runId: t }) {
  const r = Ee(), s = dt(), i = nt(), { definition: o } = s, [d, c] = R(null);
  G(() => {
    let L = !1;
    return import("./pipelineAudit-HIi3aStK.js").then((re) => re.p).then(({ getPipelineRun: re }) => {
      re(e, t).then((ge) => {
        !L && ge && c(ge);
      });
    }), () => {
      L = !0;
    };
  }, [e, t]);
  const a = F(() => {
    const L = i.runs[t], re = d;
    if (!L && !re) return;
    if (!L) return re ?? void 0;
    if (!re) return L;
    const ge = Object.keys(L.steps).length, $e = Object.keys(re.steps).length;
    return ge >= $e ? L : { ...re, status: L.status, currentStepIds: L.currentStepIds };
  }, [i.runs, t, d]);
  fo(t);
  const p = kl(a ?? null), f = F(() => {
    const L = {};
    if (!o) return L;
    for (const re of o.nodes)
      L[re.id] = { type: re.data.type, data: re.data };
    return L;
  }, [o]), [h, m] = R(!1), x = oe(null);
  st(x, () => m(!1), h);
  const [g, u] = R("steps"), [v, w] = R(null), N = M((L) => {
    w(L), u("steps");
  }, []), [C, y] = R(null), [k, b] = R(null), [T, I] = R(!1), S = a?.status === "failed" ? a.error?.nodeId : void 0, D = M((L) => {
    if (!a) return;
    const re = Object.entries(a.steps).filter(([ge, $e]) => ge !== L && $e.status === "completed").map(([ge]) => ge);
    y({ nodeId: L, skippedNodes: re, snapshotInput: !1 }), b(null);
  }, [a]), _ = M(async () => {
    if (!(!C || !a)) {
      b(null), I(!0);
      try {
        const L = await Xt(
          e,
          a.id,
          C.nodeId,
          void 0,
          C.snapshotInput || void 0
        );
        y(null), r(`/pipelines/${e}/runs/${L.newRunId}`);
      } catch (L) {
        b(L instanceof Error ? L.message : String(L)), I(!1);
      }
    }
  }, [C, a, e, r]), [W, Q] = R(null), [ee, de] = R(null), [O, U] = R(null), P = M(async (L) => {
    if (a) {
      de(null), Q(L);
      try {
        const re = await Dr(e, a.id, L);
        U(
          `Resumed from ${L.slice(0, 10)}${L.length > 10 ? "…" : ""} (replay #${re.replayAttempts})`
        ), setTimeout(() => U(null), 4e3), r(`/pipelines/${e}/runs/${a.id}`);
      } catch (re) {
        de(re instanceof Error ? re.message : String(re));
      } finally {
        Q(null);
      }
    }
  }, [a, e, r]), B = M(async () => {
    if (!a) {
      try {
        const L = await i.triggerRun(e);
        r(`/pipelines/${e}/runs/${L}`);
      } catch (L) {
        console.error("[PipelineRunReplay] re-run failed", L);
      }
      return;
    }
    try {
      const L = await i.triggerRun(
        e,
        a.triggeredBy.payload
      );
      r(`/pipelines/${e}/runs/${L}`);
    } catch (L) {
      console.error("[PipelineRunReplay] re-run failed", L);
    }
  }, [a, i, e, r]), K = async () => {
    m(!1);
    try {
      await navigator.clipboard?.writeText(t);
    } catch {
    }
  }, j = () => {
    if (m(!1), !a) return;
    const L = JSON.stringify(a, null, 2);
    xt(`run-${t}.json`, L);
  }, X = () => {
    if (m(!1), !o) return;
    const L = nn(
      o.id,
      `${o.name} (from run)`
    );
    L && r(`/pipelines/${L.id}`);
  };
  if (!a)
    return /* @__PURE__ */ l(
      "div",
      {
        className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
        "data-testid": "pipeline-replay-missing",
        children: [
          /* @__PURE__ */ l("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
            /* @__PURE__ */ n(
              ht,
              {
                onClick: () => r(`/pipelines/${e}`),
                "aria-label": "Back to pipeline",
                title: "Back to pipeline",
                children: "←"
              }
            ),
            /* @__PURE__ */ n("div", { className: "text-[13px] font-semibold text-text-primary", children: o?.name ?? "Pipeline" })
          ] }),
          /* @__PURE__ */ l("div", { className: "flex-1 flex flex-col items-center justify-center gap-3.5 p-8 text-center", children: [
            /* @__PURE__ */ n("div", { className: "text-sm text-text-secondary", children: "Run not available — it may have been trimmed from history." }),
            /* @__PURE__ */ n(
              Fe,
              {
                onClick: () => r(`/pipelines/${e}`),
                children: "Back to pipeline"
              }
            )
          ] })
        ]
      }
    );
  const Z = ln(a.status), le = a.triggeredBy.userId ?? a.triggeredBy.triggerType, be = wt(p);
  return /* @__PURE__ */ l(
    "div",
    {
      className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
      "data-testid": "pipeline-replay",
      children: [
        /* @__PURE__ */ l("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
          /* @__PURE__ */ n(
            ht,
            {
              onClick: () => r(`/pipelines/${e}`),
              "aria-label": "Back to pipeline",
              title: "Back to pipeline",
              children: "←"
            }
          ),
          /* @__PURE__ */ n(
            "div",
            {
              className: "text-[13px] font-bold text-text-primary max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap",
              title: o?.name ?? e,
              children: o?.name ?? e
            }
          ),
          /* @__PURE__ */ n("span", { className: "text-text-tertiary text-xs", children: "·" }),
          /* @__PURE__ */ l(
            "div",
            {
              className: "text-xs text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
              "data-testid": "replay-subtitle",
              children: [
                "Run from ",
                ot(a.startedAt),
                " by ",
                le
              ]
            }
          ),
          /* @__PURE__ */ l(
            "span",
            {
              className: "text-text-tertiary text-xs",
              "data-testid": "replay-cost",
              children: [
                "· ",
                be
              ]
            }
          ),
          /* @__PURE__ */ n(xe, { tone: Z.tone, "aria-label": `Status: ${Z.label}`, children: Z.label }),
          a.status === "failed" && a.error?.errorCategory ? /* @__PURE__ */ n(
            xe,
            {
              tone: "danger",
              title: a.error.message || "Error details unavailable",
              children: a.error.errorCategory
            }
          ) : null,
          /* @__PURE__ */ n("div", { className: "flex-1" }),
          S && /* @__PURE__ */ n(
            Fe,
            {
              onClick: () => D(S),
              disabled: T,
              "data-testid": "retry-from-failed-step-button",
              title: `Retry from "${S}" with the original upstream context`,
              children: "↻ Retry from failure"
            }
          ),
          /* @__PURE__ */ n(
            Fe,
            {
              onClick: B,
              "data-testid": "rerun-button",
              title: "Re-run with the original trigger payload",
              children: "↻ Re-run"
            }
          ),
          /* @__PURE__ */ l("div", { className: "relative", ref: x, children: [
            /* @__PURE__ */ n(
              ht,
              {
                onClick: () => m((L) => !L),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            h ? /* @__PURE__ */ l("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ n("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: K, children: "Copy runId" }),
              /* @__PURE__ */ n("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: j, children: "Export run JSON" }),
              /* @__PURE__ */ n("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: X, children: "Open as new draft" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ n(
          zt,
          {
            open: C !== null,
            onConfirm: _,
            onCancel: () => {
              T || y(null);
            },
            title: "Retry from step",
            confirmLabel: T ? "Starting…" : "Confirm retry",
            confirmDisabled: T,
            children: C && /* @__PURE__ */ l("div", { className: "flex flex-col gap-2.5", children: [
              /* @__PURE__ */ l("div", { className: "text-[13px] text-text-secondary", children: [
                "A new run will start from",
                " ",
                /* @__PURE__ */ l("code", { className: "bg-surface-inset px-1 rounded text-xs", children: [
                  C.nodeId.slice(0, 12),
                  C.nodeId.length > 12 ? "…" : ""
                ] }),
                " ",
                "using the original upstream context."
              ] }),
              C.skippedNodes.length > 0 && /* @__PURE__ */ l("div", { children: [
                /* @__PURE__ */ l("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5", children: [
                  "Steps that will be skipped (",
                  C.skippedNodes.length,
                  ")"
                ] }),
                /* @__PURE__ */ n("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: C.skippedNodes.map((L) => /* @__PURE__ */ n("span", { className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary", children: L.slice(0, 10) }, L)) })
              ] }),
              /* @__PURE__ */ l("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
                /* @__PURE__ */ n(
                  "input",
                  {
                    type: "checkbox",
                    checked: C.snapshotInput,
                    onChange: (L) => y((re) => re && { ...re, snapshotInput: L.target.checked }),
                    className: "accent-primary"
                  }
                ),
                "Use persisted input snapshot"
              ] }),
              k && /* @__PURE__ */ n("div", { "data-testid": "retry-modal-error", className: "py-2 px-3 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: k })
            ] })
          }
        ),
        /* @__PURE__ */ n("div", { className: "flex-1 flex flex-col min-h-0", children: /* @__PURE__ */ l("div", { className: "flex-1 overflow-auto py-5 px-7 bg-surface", children: [
          /* @__PURE__ */ l("div", { className: "flex items-center gap-3 mb-5", children: [
            /* @__PURE__ */ l("h3", { className: "m-0 text-[15px] font-bold text-text-primary", children: [
              "Steps (",
              Object.keys(a.steps).length,
              ")"
            ] }),
            /* @__PURE__ */ l("span", { className: "text-xs text-text-tertiary", children: [
              a.startedAt ? new Date(a.startedAt).toLocaleTimeString() : "",
              " — ",
              a.completedAt ? new Date(a.completedAt).toLocaleTimeString() : "in progress"
            ] }),
            a.durationMs != null && /* @__PURE__ */ l("span", { className: "text-xs text-text-secondary ml-auto", children: [
              "Total: ",
              a.durationMs < 1e3 ? `${a.durationMs}ms` : `${(a.durationMs / 1e3).toFixed(1)}s`
            ] })
          ] }),
          k && /* @__PURE__ */ n(rt, { title: "Retry failed:", className: "mb-4", children: k }),
          ee && /* @__PURE__ */ n(rt, { title: "Resume failed:", className: "mb-4", "data-testid": "resume-error-banner", children: ee }),
          (a.replayAttempts ?? 0) > 0 && /* @__PURE__ */ n(
            rt,
            {
              title: "Resumed from a previous failure",
              className: "mb-4",
              "data-testid": "resume-history-banner",
              children: /* @__PURE__ */ l("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ l("div", { children: [
                  a.error?.nodeId && a.error.nodeId !== "unknown" && /* @__PURE__ */ l(ne, { children: [
                    "Originally failed at ",
                    /* @__PURE__ */ n("code", { children: a.error.nodeId.slice(0, 12) }),
                    " — "
                  ] }),
                  "Resumed ",
                  a.replayAttempts,
                  " time",
                  a.replayAttempts === 1 ? "" : "s",
                  ".",
                  a.resumeHistory && a.resumeHistory.length > 0 && /* @__PURE__ */ l(ne, { children: [
                    " ",
                    "Most recent: from",
                    " ",
                    /* @__PURE__ */ n("code", { children: a.resumeHistory[a.resumeHistory.length - 1].fromNodeId.slice(0, 12) }),
                    " ",
                    "at ",
                    ot(a.resumeHistory[a.resumeHistory.length - 1].at),
                    "."
                  ] })
                ] }),
                a.resumeHistory && a.resumeHistory.length > 1 && /* @__PURE__ */ n(
                  "ol",
                  {
                    className: "m-0 pl-[18px] text-[11px] text-text-tertiary leading-relaxed",
                    "data-testid": "resume-history-timeline",
                    children: a.resumeHistory.map((L, re) => /* @__PURE__ */ l("li", { children: [
                      "from ",
                      /* @__PURE__ */ n("code", { children: L.fromNodeId.slice(0, 12) }),
                      " at ",
                      ot(L.at)
                    ] }, `${L.fromNodeId}-${L.at}-${re}`))
                  }
                )
              ] })
            }
          ),
          O && /* @__PURE__ */ n(rt, { title: "Resumed", className: "mb-4", "data-testid": "resume-toast", children: O }),
          a.error && /* @__PURE__ */ l(rt, { title: "Run failed:", className: "mb-4", children: [
            a.error.message,
            a.error.nodeId && a.error.nodeId !== "unknown" && /* @__PURE__ */ l("span", { className: "ml-2 text-[11px] text-[#b91c1c]", children: [
              "at node ",
              a.error.nodeId.slice(0, 8)
            ] }),
            a.status === "failed" && a.error.nodeId && a.error.nodeId !== "unknown" && /* @__PURE__ */ n("div", { className: "mt-2", children: /* @__PURE__ */ n(
              Fe,
              {
                onClick: () => P(a.error.nodeId),
                disabled: W !== null,
                "data-testid": "resume-from-here-button",
                title: `Resume this run from "${a.error.nodeId}" using its accumulated upstream context`,
                children: W === a.error.nodeId ? "Resuming…" : "↻ Resume from here"
              }
            ) })
          ] }),
          /* @__PURE__ */ n(
            "div",
            {
              role: "tablist",
              "aria-label": "Run detail view",
              className: "flex gap-1 mb-3 border-b border-border",
              "data-testid": "run-replay-tabs",
              children: [
                { id: "steps", label: "Steps" },
                { id: "log", label: "Executor Log" }
              ].map((L) => {
                const re = g === L.id;
                return /* @__PURE__ */ n(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": re,
                    onClick: () => u(L.id),
                    "data-testid": `run-replay-tab-${L.id}`,
                    className: $(
                      "font-[inherit] text-[13px] font-semibold py-1.5 px-3.5 border-none bg-transparent cursor-pointer -mb-px",
                      re ? "text-text-primary border-b-2 border-b-primary" : "text-text-tertiary border-b-2 border-b-transparent"
                    ),
                    children: L.label
                  },
                  L.id
                );
              })
            }
          ),
          g === "steps" ? (
            /* Threaded step list with fork nesting */
            /* @__PURE__ */ n(
              Tl,
              {
                steps: a.steps,
                nodeDataMap: f,
                edges: o?.edges,
                onRetryFromStep: D,
                onResumeFromStep: a.status === "failed" ? P : void 0
              }
            )
          ) : /* @__PURE__ */ n("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ n(
            ql,
            {
              pipelineId: e,
              runId: t,
              onStepClick: N
            }
          ) })
        ] }) })
      ]
    }
  );
}
function zl(e) {
  return e == null ? "—" : `${e > 0 ? "+" : (e < 0, "")}${ve(Math.abs(e))}`.replace(/^(\+|-)?/, e === 0 ? "" : e > 0 ? "+" : "-");
}
function Kl(e) {
  switch (e) {
    case "completed":
      return "success";
    case "failed":
      return "danger";
    case "cancelled":
      return "neutral";
    case "skipped":
      return "neutral";
    case "running":
      return "info";
    case "awaiting":
      return "warning";
    default:
      return "neutral";
  }
}
function Wl(e, t) {
  if (!e) return t;
  const r = e.nodes.find((s) => s.id === t);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : t;
}
function Vl(e, t) {
  if (!e) return !1;
  const r = e.nodes.find((s) => s.id === t);
  return !!r && r.data.type === "condition";
}
function Fn(e) {
  if (!e) return;
  const t = e.output;
  if (t && typeof t == "object" && "result" in t)
    return t.result ? "true" : "false";
}
function Jl(e, t) {
  const r = (m) => m.split(/(\s+)/).filter((x) => x.length > 0), s = r(e), i = r(t), o = s.length, d = i.length, c = Array.from({ length: o + 1 }, () => new Array(d + 1).fill(0));
  for (let m = o - 1; m >= 0; m--)
    for (let x = d - 1; x >= 0; x--)
      s[m] === i[x] ? c[m][x] = c[m + 1][x + 1] + 1 : c[m][x] = Math.max(c[m + 1][x], c[m][x + 1]);
  const a = [], p = (m, x) => {
    const g = a[a.length - 1];
    g && g.type === m ? g.text += x : a.push({ type: m, text: x });
  };
  let f = 0, h = 0;
  for (; f < o && h < d; )
    s[f] === i[h] ? (p("eq", s[f]), f++, h++) : c[f + 1][h] >= c[f][h + 1] ? (p("del", s[f]), f++) : (p("add", i[h]), h++);
  for (; f < o; )
    p("del", s[f++]);
  for (; h < d; )
    p("add", i[h++]);
  return a;
}
function Gl(e, t, r) {
  const s = /* @__PURE__ */ new Set(), i = [];
  if (r)
    for (const o of r.nodes)
      (e.steps[o.id] || t.steps[o.id]) && (i.push(o.id), s.add(o.id));
  for (const o of [...Object.keys(e.steps), ...Object.keys(t.steps)])
    s.has(o) || (i.push(o), s.add(o));
  return i.map((o) => {
    const d = e.steps[o], c = t.steps[o], a = d?.durationMs, p = c?.durationMs, f = a != null && p != null ? p - a : void 0, h = !!d && !!c && d.status !== c.status;
    let m = !1;
    a != null && p != null && a > 0 && (m = Math.abs(p - a) / a > 0.5);
    const x = Vl(r, o), g = x ? Fn(d) : void 0, u = x ? Fn(c) : void 0, v = x && g !== void 0 && u !== void 0 && g !== u;
    return {
      nodeId: o,
      name: Wl(r, o),
      a: d,
      b: c,
      durationDelta: f,
      statusDiffers: h,
      durationLarge: m,
      branchDiffers: v,
      isLlm: !!(d?.llm || c?.llm),
      isCondition: x,
      branchA: g,
      branchB: u
    };
  });
}
function Yl(e) {
  if (e.statusDiffers) return "bg-[#fef2f2]";
  if (e.branchDiffers) return "bg-[#eff6ff]";
  if (e.durationLarge) return "bg-[#fffbeb]";
}
function jn({
  step: e,
  branch: t,
  isCondition: r
}) {
  if (!e)
    return /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "(not run)" });
  const s = Kl(e.status);
  return /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ l("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ n(xe, { tone: s, children: e.status }),
      /* @__PURE__ */ n("span", { className: "font-mono text-text-secondary", children: ve(e.durationMs) }),
      r && t ? /* @__PURE__ */ l("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        "(",
        t === "true" ? "T" : "F",
        ")"
      ] }) : null
    ] }),
    e.llm ? /* @__PURE__ */ l("div", { className: "font-mono text-[11px] text-text-tertiary", children: [
      e.llm.tokensIn,
      "→",
      e.llm.tokensOut,
      "tok"
    ] }) : null,
    e.error ? /* @__PURE__ */ n("div", { className: "text-[11px] text-[#dc2626]", title: e.error, children: e.error.length > 60 ? `${e.error.slice(0, 60)}…` : e.error }) : null
  ] });
}
function Xl({ a: e, b: t }) {
  const r = F(() => Jl(e, t), [e, t]);
  return /* @__PURE__ */ n(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: r.map((s, i) => s.type === "eq" ? /* @__PURE__ */ n("span", { children: s.text }, i) : s.type === "add" ? /* @__PURE__ */ n("span", { "data-diff": "add", className: "bg-[#dcfce7] text-[#166534]", children: s.text }, i) : /* @__PURE__ */ n("span", { "data-diff": "del", className: "bg-[#fee2e2] text-[#991b1b] line-through", children: s.text }, i))
    }
  );
}
function Ql({ row: e }) {
  const t = e.a?.llm, r = e.b?.llm, s = t && r ? r.tokensIn + r.tokensOut - (t.tokensIn + t.tokensOut) : void 0, i = Yl(e);
  return /* @__PURE__ */ l(ne, { children: [
    /* @__PURE__ */ l("tr", { "data-testid": `run-compare-row-${e.nodeId}`, className: i, children: [
      /* @__PURE__ */ l("td", { className: $("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: [
        /* @__PURE__ */ n("div", { className: "font-semibold text-text-primary", children: e.name }),
        /* @__PURE__ */ n("div", { className: "font-mono text-[11px] text-text-tertiary", children: e.nodeId })
      ] }),
      /* @__PURE__ */ n("td", { className: $("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ n(jn, { step: e.a, branch: e.branchA, isCondition: e.isCondition }) }),
      /* @__PURE__ */ n("td", { className: $("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ n(jn, { step: e.b, branch: e.branchB, isCondition: e.isCondition }) }),
      /* @__PURE__ */ l(
        "td",
        {
          className: $("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", i),
          "data-testid": `run-compare-delta-${e.nodeId}`,
          children: [
            e.branchDiffers ? /* @__PURE__ */ n("span", { className: "font-semibold text-[#2563eb]", children: "different branch!" }) : e.statusDiffers ? /* @__PURE__ */ n("span", { className: "font-semibold text-[#dc2626]", children: "status differs" }) : e.durationDelta != null ? /* @__PURE__ */ n("span", { className: e.durationLarge ? "text-[#d97706]" : "text-text-secondary", children: zl(e.durationDelta) }) : /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "—" }),
            s != null && s !== 0 ? /* @__PURE__ */ l("div", { className: "mt-0.5 text-[11px] text-text-tertiary", children: [
              s > 0 ? "+" : "",
              s,
              "tok"
            ] }) : null
          ]
        }
      )
    ] }),
    e.isLlm && (t || r) ? /* @__PURE__ */ n("tr", { children: /* @__PURE__ */ n("td", { className: "border-b border-border p-0", colSpan: 4, children: /* @__PURE__ */ l("details", { className: "bg-surface-inset px-3.5 py-2.5", children: [
      /* @__PURE__ */ n(
        "summary",
        {
          className: "cursor-pointer text-xs font-semibold text-text-secondary",
          "data-testid": `run-compare-llm-toggle-${e.nodeId}`,
          children: "LLM response diff"
        }
      ),
      /* @__PURE__ */ l("div", { className: "mt-2 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ l("div", { children: [
          /* @__PURE__ */ n("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run A" }),
          /* @__PURE__ */ n(
            "pre",
            {
              "data-testid": `run-compare-llm-a-${e.nodeId}`,
              className: "m-0 whitespace-pre-wrap break-words rounded-md border border-border bg-surface p-2.5 text-xs",
              children: t?.response ?? "(no response)"
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { children: [
          /* @__PURE__ */ n("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run B" }),
          /* @__PURE__ */ n(
            "pre",
            {
              "data-testid": `run-compare-llm-b-${e.nodeId}`,
              className: "m-0 whitespace-pre-wrap break-words rounded-md border border-border bg-surface p-2.5 text-xs",
              children: r?.response ?? "(no response)"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ l("div", { className: "mt-2.5", children: [
        /* @__PURE__ */ n("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Word-level diff" }),
        /* @__PURE__ */ n("div", { className: "mt-1.5", children: /* @__PURE__ */ n(
          Xl,
          {
            a: t?.response ?? "",
            b: r?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function Zl({ runA: e, runB: t, def: r }) {
  const s = F(() => Gl(e, t, r), [e, t, r]);
  return /* @__PURE__ */ l(
    "table",
    {
      className: "w-full overflow-hidden rounded-lg border border-border bg-surface text-[13px]",
      "data-testid": "run-compare-table",
      children: [
        /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { children: [
          /* @__PURE__ */ n("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Step" }),
          /* @__PURE__ */ n("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run A" }),
          /* @__PURE__ */ n("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run B" }),
          /* @__PURE__ */ n("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Δ" })
        ] }) }),
        /* @__PURE__ */ n("tbody", { children: s.map((i) => /* @__PURE__ */ n(Ql, { row: i }, i.nodeId)) })
      ]
    }
  );
}
function ec(e) {
  return e == null ? "—" : `${e > 0 ? "+" : (e < 0, "")}${ve(Math.abs(e))}`.replace(/^(\+|-)?/, e === 0 ? "" : e > 0 ? "+" : "-");
}
function tc(e) {
  switch (e) {
    case "completed":
      return "success";
    case "failed":
      return "danger";
    case "cancelled":
      return "neutral";
    case "awaiting_approval":
      return "warning";
    case "running":
      return "info";
    case "pending":
      return "neutral";
    default:
      return "neutral";
  }
}
function nc(e) {
  const t = /* @__PURE__ */ new Map();
  if (!e) return t;
  for (const r of e.nodes)
    r.data.type === "llm" && t.set(r.id, r.data.model);
  return t;
}
function qn(e, t) {
  const r = Object.values(e.steps).filter((s) => !!s.llm).map((s) => ({
    model: t.get(s.nodeId),
    tokensIn: s.llm?.tokensIn ?? 0,
    tokensOut: s.llm?.tokensOut ?? 0
  }));
  return wt(pt(r).total);
}
function Hn({
  label: e,
  run: t,
  cost: r,
  testIdPrefix: s
}) {
  const i = tc(t.status);
  return /* @__PURE__ */ l(
    "div",
    {
      className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
      "data-testid": `${s}-summary`,
      children: [
        /* @__PURE__ */ n("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: e }),
        /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ n("span", { className: "font-mono text-xs text-text-tertiary", children: t.id.slice(0, 8) }),
          /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ n("span", { className: "text-text-secondary", children: ot(t.startedAt) })
        ] }),
        /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ n(xe, { tone: i, children: t.status }),
          /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ n("span", { className: "font-mono", children: ve(t.durationMs) }),
          /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ n("span", { className: "font-mono", "data-testid": `${s}-cost`, children: r })
        ] })
      ]
    }
  );
}
function od() {
  const { pipelineId: e, runIdA: t, runIdB: r } = at(), s = Ee(), i = F(
    () => e ? Re(e) : null,
    [e]
  ), o = F(
    () => e && t ? At(e, t) : null,
    [e, t]
  ), d = F(
    () => e && r ? At(e, r) : null,
    [e, r]
  ), c = F(() => nc(i), [i]);
  if (!e || !t || !r)
    return /* @__PURE__ */ n(lt, { to: "/pipelines", replace: !0 });
  if (!i)
    return /* @__PURE__ */ n("div", { className: "p-8", children: /* @__PURE__ */ n(
      _e,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => s("/pipelines")
      }
    ) });
  if (!o || !d)
    return /* @__PURE__ */ n("div", { className: "p-8", "data-testid": "run-compare-missing", children: /* @__PURE__ */ n(
      _e,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable — they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => s(`/pipelines/${e}/runs`)
      }
    ) });
  const a = (d.durationMs ?? 0) - (o.durationMs ?? 0), p = qn(o, c), f = qn(d, c), h = (/* @__PURE__ */ new Set([
    ...Object.keys(o.steps),
    ...Object.keys(d.steps)
  ])).size;
  return /* @__PURE__ */ l("div", { className: "flex flex-col gap-4 p-6 text-text-primary", "data-testid": "run-compare", children: [
    /* @__PURE__ */ l("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          onClick: () => s(`/pipelines/${e}/runs`),
          className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
          children: [
            "← ",
            i.name
          ]
        }
      ),
      /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "/" }),
      /* @__PURE__ */ n("span", { className: "text-lg font-bold text-text-primary", children: "Compare runs" }),
      /* @__PURE__ */ l(
        "span",
        {
          className: "ml-auto text-xs text-text-tertiary",
          "data-testid": "run-compare-cost-delta",
          children: [
            p,
            " → ",
            f
          ]
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ n(Hn, { label: "Run A", run: o, cost: p, testIdPrefix: "run-a" }),
      /* @__PURE__ */ n(Hn, { label: "Run B", run: d, cost: f, testIdPrefix: "run-b" })
    ] }),
    /* @__PURE__ */ l(
      "div",
      {
        className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
        "data-testid": "run-compare-delta",
        children: [
          /* @__PURE__ */ n("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Δ duration" }),
          /* @__PURE__ */ n("span", { className: "font-mono text-[13px]", children: ec(a) }),
          /* @__PURE__ */ n("span", { className: "flex-1" }),
          /* @__PURE__ */ l("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
            h,
            " step",
            h === 1 ? "" : "s",
            " compared"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ n(Zl, { runA: o, runB: d, def: i })
  ] });
}
function rc(e) {
  return e === 0 ? "0ms" : `${e > 0 ? "+" : "-"}${ve(Math.abs(e))}`;
}
function zn(e) {
  switch (e) {
    case "completed":
      return "success";
    case "failed":
      return "danger";
    case "cancelled":
      return "neutral";
    case "awaiting_approval":
      return "warning";
    case "running":
      return "info";
    case "pending":
      return "neutral";
    default:
      return "neutral";
  }
}
function oc({
  runA: e,
  runB: t,
  costA: r,
  costB: s
}) {
  const i = e.durationMs ?? 0, d = (t.durationMs ?? 0) - i;
  return /* @__PURE__ */ l("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ l("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ l(
        "div",
        {
          className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
          "data-testid": "diff-run-a-summary",
          children: [
            /* @__PURE__ */ n("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run A" }),
            /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ n("span", { className: "font-mono text-xs text-text-tertiary", children: e.id.slice(0, 8) }),
              /* @__PURE__ */ n(xe, { tone: zn(e.status), children: e.status })
            ] }),
            /* @__PURE__ */ n("div", { className: "text-xs text-text-secondary", children: ot(e.startedAt) }),
            /* @__PURE__ */ l("div", { className: "font-mono text-xs", children: [
              ve(e.durationMs),
              " | ",
              r
            ] }),
            /* @__PURE__ */ l("div", { className: "text-[11px] text-text-tertiary", children: [
              "Trigger: ",
              e.triggeredBy.userId ?? e.triggeredBy.triggerType
            ] })
          ]
        }
      ),
      /* @__PURE__ */ l(
        "div",
        {
          className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
          "data-testid": "diff-run-b-summary",
          children: [
            /* @__PURE__ */ n("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run B" }),
            /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ n("span", { className: "font-mono text-xs text-text-tertiary", children: t.id.slice(0, 8) }),
              /* @__PURE__ */ n(xe, { tone: zn(t.status), children: t.status })
            ] }),
            /* @__PURE__ */ n("div", { className: "text-xs text-text-secondary", children: ot(t.startedAt) }),
            /* @__PURE__ */ l("div", { className: "font-mono text-xs", children: [
              ve(t.durationMs),
              " | ",
              s
            ] }),
            /* @__PURE__ */ l("div", { className: "text-[11px] text-text-tertiary", children: [
              "Trigger: ",
              t.triggeredBy.userId ?? t.triggeredBy.triggerType
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ l(
      "div",
      {
        className: "flex items-center gap-4 rounded-md bg-surface-inset px-3.5 py-2.5",
        "data-testid": "diff-duration-delta",
        children: [
          /* @__PURE__ */ n("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Duration delta" }),
          /* @__PURE__ */ n(
            "span",
            {
              className: $(
                "font-mono text-sm font-bold",
                d === 0 ? "text-text-secondary" : d < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
              ),
              children: rc(d)
            }
          ),
          /* @__PURE__ */ l("span", { className: "text-[11px] text-text-tertiary", children: [
            "(",
            d < 0 ? "faster" : d > 0 ? "slower" : "same",
            " in Run B)"
          ] })
        ]
      }
    )
  ] });
}
function sc(e) {
  return e === 0 ? "0ms" : `${e > 0 ? "+" : "-"}${ve(Math.abs(e))}`;
}
function Kn(e) {
  switch (e) {
    case "completed":
      return "success";
    case "failed":
      return "danger";
    case "cancelled":
      return "neutral";
    case "skipped":
      return "neutral";
    case "running":
      return "info";
    case "awaiting":
      return "warning";
    default:
      return "neutral";
  }
}
function ic(e, t) {
  if (!e) return t;
  const r = e.nodes.find((s) => s.id === t);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : t;
}
function ac(e, t, r) {
  const s = /* @__PURE__ */ new Set(), i = [];
  if (r)
    for (const o of r.nodes)
      (e.steps[o.id] || t.steps[o.id]) && (i.push(o.id), s.add(o.id));
  for (const o of [...Object.keys(e.steps), ...Object.keys(t.steps)])
    s.has(o) || (i.push(o), s.add(o));
  return i.map((o) => {
    const d = e.steps[o], c = t.steps[o], a = d?.durationMs, p = c?.durationMs, f = a != null && p != null ? p - a : void 0, h = !!d && !!c && d.status !== c.status, m = !!d && !c, x = !d && !!c, g = d?.llm ? d.llm.tokensIn + d.llm.tokensOut : void 0, u = c?.llm ? c.llm.tokensIn + c.llm.tokensOut : void 0, v = g != null && u != null ? u - g : void 0;
    return {
      nodeId: o,
      name: ic(r, o),
      a: d,
      b: c,
      durationDelta: f,
      statusDiffers: h,
      onlyInA: m,
      onlyInB: x,
      tokenDelta: v
    };
  });
}
function lc({ runA: e, runB: t, def: r }) {
  const s = F(() => ac(e, t, r), [e, t, r]);
  return /* @__PURE__ */ l("table", { className: "w-full border-collapse text-[13px]", children: [
    /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ n("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Step" }),
      /* @__PURE__ */ n("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run A" }),
      /* @__PURE__ */ n("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run B" }),
      /* @__PURE__ */ n("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Delta" })
    ] }) }),
    /* @__PURE__ */ n("tbody", { children: s.map((i) => /* @__PURE__ */ l(
      "tr",
      {
        className: $(
          i.onlyInA || i.onlyInB ? "bg-[#fefce8]" : i.statusDiffers ? "bg-[#fef2f2]" : void 0
        ),
        "data-testid": `diff-step-row-${i.nodeId}`,
        children: [
          /* @__PURE__ */ l("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: [
            /* @__PURE__ */ n("div", { className: "font-semibold", children: i.name }),
            /* @__PURE__ */ n("div", { className: "font-mono text-[10px] text-text-tertiary", children: i.nodeId }),
            i.onlyInA && /* @__PURE__ */ n(xe, { tone: "warning", size: "xs", children: "only in A" }),
            i.onlyInB && /* @__PURE__ */ n(xe, { tone: "warning", size: "xs", children: "only in B" })
          ] }),
          /* @__PURE__ */ n("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: i.a ? /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ n(xe, { tone: Kn(i.a.status), children: i.a.status }),
            /* @__PURE__ */ n("span", { className: "font-mono text-[11px] text-text-secondary", children: ve(i.a.durationMs) }),
            i.a.llm && /* @__PURE__ */ l("span", { className: "text-[10px] text-text-tertiary", children: [
              i.a.llm.tokensIn,
              " in / ",
              i.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ n("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: i.b ? /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ n(xe, { tone: Kn(i.b.status), children: i.b.status }),
            /* @__PURE__ */ n("span", { className: "font-mono text-[11px] text-text-secondary", children: ve(i.b.durationMs) }),
            i.b.llm && /* @__PURE__ */ l("span", { className: "text-[10px] text-text-tertiary", children: [
              i.b.llm.tokensIn,
              " in / ",
              i.b.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ l("td", { className: "border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", children: [
            i.statusDiffers && /* @__PURE__ */ n("div", { className: "text-[11px] font-semibold text-[#dc2626]", children: "status differs" }),
            i.durationDelta != null && /* @__PURE__ */ n(
              "div",
              {
                className: $(
                  "text-xs",
                  i.durationDelta === 0 ? "text-text-tertiary" : i.durationDelta < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
                ),
                children: sc(i.durationDelta)
              }
            ),
            i.tokenDelta != null && i.tokenDelta !== 0 && /* @__PURE__ */ l(
              "div",
              {
                className: $(
                  "mt-0.5 text-[10px]",
                  i.tokenDelta < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
                ),
                children: [
                  i.tokenDelta > 0 ? "+" : "",
                  i.tokenDelta,
                  " tok"
                ]
              }
            ),
            i.durationDelta == null && !i.statusDiffers && /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "--" })
          ] })
        ]
      },
      i.nodeId
    )) })
  ] });
}
function cc(e, t) {
  if (!e) return t;
  const r = e.nodes.find((s) => s.id === t);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : t;
}
function Dt(e, t = "", r = 0) {
  const s = /* @__PURE__ */ new Map();
  if (r > 6 || e == null)
    return s.set(t || "(root)", String(e)), s;
  if (typeof e != "object")
    return s.set(t || "(root)", JSON.stringify(e)), s;
  if (Array.isArray(e)) {
    if (e.length === 0)
      s.set(t || "(root)", "[]");
    else
      for (let o = 0; o < e.length; o++) {
        const d = t ? `${t}.${o}` : String(o);
        for (const [c, a] of Dt(e[o], d, r + 1))
          s.set(c, a);
      }
    return s;
  }
  const i = Object.entries(e);
  if (i.length === 0)
    s.set(t || "(root)", "{}");
  else
    for (const [o, d] of i) {
      const c = t ? `${t}.${o}` : o;
      for (const [a, p] of Dt(d, c, r + 1))
        s.set(a, p);
    }
  return s;
}
function kr(e, t) {
  const r = Dt(e), s = Dt(t), i = /* @__PURE__ */ new Set([...r.keys(), ...s.keys()]), o = [];
  for (const c of i) {
    const a = r.get(c), p = s.get(c);
    a === void 0 ? o.push({ key: c, type: "added", valueB: p }) : p === void 0 ? o.push({ key: c, type: "removed", valueA: a }) : a !== p ? o.push({ key: c, type: "changed", valueA: a, valueB: p }) : o.push({ key: c, type: "unchanged", valueA: a, valueB: p });
  }
  const d = {
    changed: 0,
    added: 1,
    removed: 2,
    unchanged: 3
  };
  return o.sort((c, a) => {
    const p = d[c.type] - d[a.type];
    return p !== 0 ? p : c.key.localeCompare(a.key);
  }), o;
}
const dc = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function pc({
  nodeId: e,
  name: t,
  outputA: r,
  outputB: s
}) {
  const [i, o] = R(!1), d = F(() => kr(r, s), [r, s]), c = d.filter((a) => a.type !== "unchanged").length;
  return c === 0 ? /* @__PURE__ */ l("div", { className: "rounded-md bg-surface-inset px-3 py-2", children: [
    /* @__PURE__ */ n("span", { className: "text-xs font-semibold", children: t }),
    /* @__PURE__ */ n("span", { className: "ml-2 text-[11px] text-text-tertiary", children: "(no differences)" })
  ] }) : /* @__PURE__ */ l(
    "div",
    {
      className: "overflow-hidden rounded-md border border-border",
      "data-testid": `diff-output-${e}`,
      children: [
        /* @__PURE__ */ l(
          "div",
          {
            className: "flex cursor-pointer items-center gap-2 bg-surface-inset px-3 py-2",
            onClick: () => o(!i),
            children: [
              /* @__PURE__ */ n("span", { className: "text-[11px] text-text-tertiary", children: i ? "▼" : "▶" }),
              /* @__PURE__ */ n("span", { className: "text-xs font-semibold", children: t }),
              /* @__PURE__ */ n("span", { className: "font-mono text-[10px] text-text-tertiary", children: e }),
              /* @__PURE__ */ l(xe, { tone: "warning", size: "xs", className: "ml-auto", children: [
                c,
                " difference",
                c === 1 ? "" : "s"
              ] })
            ]
          }
        ),
        i && /* @__PURE__ */ n("div", { className: "flex flex-col gap-0.5 px-3 py-2", children: d.filter((a) => a.type !== "unchanged").map((a, p) => /* @__PURE__ */ l(
          "div",
          {
            className: $(
              "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
              dc[a.type]
            ),
            children: [
              /* @__PURE__ */ l("span", { className: "min-w-[120px] shrink-0 font-semibold", children: [
                a.type === "added" && "+ ",
                a.type === "removed" && "- ",
                a.type === "changed" && "~ ",
                a.key
              ] }),
              a.type === "changed" && /* @__PURE__ */ l("span", { children: [
                /* @__PURE__ */ n("span", { className: "line-through opacity-70", children: a.valueA }),
                " -> ",
                /* @__PURE__ */ n("span", { className: "font-semibold", children: a.valueB })
              ] }),
              a.type === "added" && /* @__PURE__ */ n("span", { children: a.valueB }),
              a.type === "removed" && /* @__PURE__ */ n("span", { children: a.valueA })
            ]
          },
          `${a.key}-${p}`
        )) })
      ]
    }
  );
}
function uc({ runA: e, runB: t, def: r }) {
  const s = F(() => {
    const i = /* @__PURE__ */ new Set(), o = [];
    if (r)
      for (const d of r.nodes) {
        const c = e.steps[d.id]?.output != null, a = t.steps[d.id]?.output != null;
        (c || a) && (o.push(d.id), i.add(d.id));
      }
    for (const d of [...Object.keys(e.steps), ...Object.keys(t.steps)]) {
      if (i.has(d)) continue;
      const c = e.steps[d]?.output != null, a = t.steps[d]?.output != null;
      (c || a) && (o.push(d), i.add(d));
    }
    return o;
  }, [e, t, r]);
  return s.length === 0 ? /* @__PURE__ */ n("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "No step outputs to compare." }) : /* @__PURE__ */ n("div", { className: "flex flex-col gap-3", children: s.map((i) => /* @__PURE__ */ n(
    pc,
    {
      nodeId: i,
      name: cc(r, i),
      outputA: e.steps[i]?.output,
      outputB: t.steps[i]?.output
    },
    i
  )) });
}
function mc(e) {
  const t = /* @__PURE__ */ new Map();
  if (!e) return t;
  for (const r of e.nodes)
    r.data.type === "llm" && t.set(r.id, r.data.model);
  return t;
}
function Wn(e, t) {
  const r = Object.values(e.steps).filter((s) => !!s.llm).map((s) => ({
    model: t.get(s.nodeId),
    tokensIn: s.llm?.tokensIn ?? 0,
    tokensOut: s.llm?.tokensOut ?? 0
  }));
  return wt(pt(r).total);
}
function Tt({
  title: e,
  defaultOpen: t = !0,
  badge: r,
  children: s,
  testId: i
}) {
  const [o, d] = R(t);
  return /* @__PURE__ */ l(
    "div",
    {
      className: "overflow-hidden rounded-lg border border-border bg-surface",
      "data-testid": i,
      children: [
        /* @__PURE__ */ l(
          "div",
          {
            className: "flex cursor-pointer select-none items-center gap-2 border-b border-border bg-surface-inset px-4 py-3",
            onClick: () => d(!o),
            role: "button",
            tabIndex: 0,
            onKeyDown: (c) => {
              (c.key === "Enter" || c.key === " ") && (c.preventDefault(), d(!o));
            },
            "aria-expanded": o,
            children: [
              /* @__PURE__ */ n("span", { className: "text-xs text-text-tertiary", children: o ? "▼" : "▶" }),
              /* @__PURE__ */ n("span", { className: "text-[13px] font-bold text-text-primary", children: e }),
              r && /* @__PURE__ */ n(xe, { tone: "info", className: "ml-auto", children: r })
            ]
          }
        ),
        o && /* @__PURE__ */ n("div", { className: "p-4", children: s })
      ]
    }
  );
}
const fc = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function hc({
  runA: e,
  runB: t
}) {
  const r = F(
    () => kr(e.context, t.context),
    [e.context, t.context]
  ), s = r.filter((i) => i.type !== "unchanged").length;
  return /* @__PURE__ */ n(
    Tt,
    {
      title: "Context evolution diff",
      defaultOpen: !1,
      badge: s > 0 ? `${s} difference${s === 1 ? "" : "s"}` : void 0,
      testId: "diff-context-section",
      children: s === 0 ? /* @__PURE__ */ n("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "Final contexts are identical." }) : /* @__PURE__ */ n("div", { className: "flex flex-col gap-0.5", children: r.map((i, o) => /* @__PURE__ */ l(
        "div",
        {
          className: $(
            "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
            fc[i.type]
          ),
          children: [
            /* @__PURE__ */ l("span", { className: "min-w-[160px] shrink-0 font-semibold", children: [
              i.type === "added" && "+ ",
              i.type === "removed" && "- ",
              i.type === "changed" && "~ ",
              i.type === "unchanged" && "  ",
              i.key
            ] }),
            i.type === "changed" && /* @__PURE__ */ l("span", { children: [
              /* @__PURE__ */ n("span", { className: "line-through opacity-70", children: i.valueA }),
              " -> ",
              /* @__PURE__ */ n("span", { className: "font-semibold", children: i.valueB })
            ] }),
            i.type === "added" && /* @__PURE__ */ n("span", { children: i.valueB }),
            i.type === "removed" && /* @__PURE__ */ n("span", { children: i.valueA }),
            i.type === "unchanged" && /* @__PURE__ */ n("span", { className: "opacity-50", children: i.valueA })
          ]
        },
        `${i.key}-${o}`
      )) })
    }
  );
}
function xc({ pipelineId: e, runIdA: t, runIdB: r }) {
  const s = Ee(), i = F(
    () => Re(e),
    [e]
  ), o = F(
    () => At(e, t),
    [e, t]
  ), d = F(
    () => At(e, r),
    [e, r]
  ), c = F(() => mc(i), [i]);
  if (!i)
    return /* @__PURE__ */ n("div", { className: "p-8", children: /* @__PURE__ */ n(
      _e,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => s("/pipelines")
      }
    ) });
  if (!o || !d)
    return /* @__PURE__ */ n("div", { className: "p-8", "data-testid": "diff-run-missing", children: /* @__PURE__ */ n(
      _e,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable -- they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => s(`/pipelines/${e}/runs`)
      }
    ) });
  const a = Wn(o, c), p = Wn(d, c);
  return /* @__PURE__ */ l(
    "div",
    {
      className: "mx-auto flex w-full max-w-[1400px] flex-col gap-5 p-6 text-text-primary",
      "data-testid": "pipeline-run-diff",
      children: [
        /* @__PURE__ */ l("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              onClick: () => s(`/pipelines/${e}/runs`),
              className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
              children: [
                "← ",
                i.name
              ]
            }
          ),
          /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "/" }),
          /* @__PURE__ */ n("span", { className: "text-lg font-bold text-text-primary", children: "Diff view" }),
          /* @__PURE__ */ l("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
            t.slice(0, 8),
            " vs ",
            r.slice(0, 8)
          ] })
        ] }),
        /* @__PURE__ */ n(Tt, { title: "Summary", testId: "diff-summary-section", children: /* @__PURE__ */ n(
          oc,
          {
            runA: o,
            runB: d,
            costA: a,
            costB: p
          }
        ) }),
        /* @__PURE__ */ n(
          Tt,
          {
            title: "Step-by-step comparison",
            badge: `${Object.keys(o.steps).length + Object.keys(d.steps).length > 0 ? "steps" : "0 steps"}`,
            testId: "diff-steps-section",
            children: /* @__PURE__ */ n(lc, { runA: o, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ n(
          Tt,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ n(uc, { runA: o, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ n(hc, { runA: o, runB: d })
      ]
    }
  );
}
function sd() {
  const { pipelineId: e } = at(), [t] = Rt(), r = t.get("a"), s = t.get("b");
  return !e || !r || !s ? /* @__PURE__ */ n(lt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ n(xc, { pipelineId: e, runIdA: r, runIdB: s });
}
function id() {
  const e = Ee(), [t, r] = Rt(), [s, i] = R([]), { runs: o } = nt();
  G(() => {
    let N = !1;
    return (async () => {
      const C = Kt(), y = [];
      await Promise.all(
        C.map(async (k) => {
          try {
            const { runs: b } = await Yt(k.id, { limit: 50 });
            if (b.length > 0) {
              for (const T of b)
                T.id && y.push({ ...T, pipelineName: k.name });
              return;
            }
          } catch {
          }
          for (const b of et(k.id))
            b.id && y.push({ ...b, pipelineName: k.name });
        })
      ), !N && (y.sort((k, b) => b.startedAt.localeCompare(k.startedAt)), i(y));
    })(), () => {
      N = !0;
    };
  }, []);
  const d = F(() => {
    const N = new Map(Kt().map((k) => [k.id, k.name])), C = new Set(s.map((k) => k.id)), y = [];
    for (const [k, b] of Object.entries(o))
      C.has(k) || b.pipelineId && y.push({
        ...b,
        pipelineName: N.get(b.pipelineId) ?? `Pipeline ${b.pipelineId.slice(0, 8)}`
      });
    return y.length === 0 ? s : [...y, ...s].sort((k, b) => b.startedAt.localeCompare(k.startedAt));
  }, [s, o]), { query: c, statuses: a, triggerKinds: p, range: f } = F(
    () => wr(t),
    [t]
  ), h = (N, C) => {
    const y = new URLSearchParams(t);
    C ? y.set(N, C) : y.delete(N), r(y, { replace: !0 });
  }, m = (N) => {
    const C = new Set(a);
    C.has(N) ? C.delete(N) : C.add(N), h("status", C.size === 0 ? null : Array.from(C).join(","));
  }, x = (N) => {
    const C = new Set(p);
    C.has(N) ? C.delete(N) : C.add(N), h("trigger", C.size === 0 ? null : Array.from(C).join(","));
  }, g = (N) => {
    h("range", N === "7d" ? null : N);
  }, u = (N) => {
    h("q", N.length === 0 ? null : N);
  }, v = F(
    () => vr(d, { query: c, statuses: a, triggerKinds: p, range: f }),
    [d, c, a, p, f]
  ), w = F(() => {
    const N = {};
    for (const C of v) {
      const y = Object.values(C.steps).filter((b) => !!b.llm).map((b) => ({
        model: void 0,
        tokensIn: b.llm?.tokensIn ?? 0,
        tokensOut: b.llm?.tokensOut ?? 0
      })), k = pt(y);
      k.total.totalCostUsd > 0 && (N[C.id] = wt(k.total));
    }
    return N;
  }, [v]);
  return /* @__PURE__ */ l("div", { "data-testid": "all-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ l("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ n("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Runs" }),
      /* @__PURE__ */ l("span", { className: "text-[13px] text-text-tertiary", children: [
        v.length,
        " run",
        v.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ n(
      Nr,
      {
        query: c,
        onQueryChange: u,
        statuses: a,
        onStatusToggle: m,
        triggerKinds: p,
        onTriggerToggle: x,
        range: f,
        onRangeChange: g,
        onClearFilters: () => r(new URLSearchParams(), { replace: !0 })
      }
    ),
    v.length === 0 ? /* @__PURE__ */ n(
      _e,
      {
        icon: "📋",
        title: "No runs yet",
        body: "Run a pipeline to see execution history here."
      }
    ) : /* @__PURE__ */ n("div", { className: "overflow-x-auto", children: /* @__PURE__ */ l("table", { className: "w-full border-collapse text-[13px]", children: [
      /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ l("tr", { className: "border-b border-border", children: [
        /* @__PURE__ */ n("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Pipeline" }),
        /* @__PURE__ */ n("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Run ID" }),
        /* @__PURE__ */ n("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Status" }),
        /* @__PURE__ */ n("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Trigger" }),
        /* @__PURE__ */ n("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Started" }),
        /* @__PURE__ */ n("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right", children: "Duration" }),
        /* @__PURE__ */ n("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right", children: "Cost" })
      ] }) }),
      /* @__PURE__ */ n("tbody", { children: v.map((N) => /* @__PURE__ */ l(
        "tr",
        {
          onClick: () => e(`/pipelines/${N.pipelineId}/runs/${N.id}`),
          className: "border-b border-border cursor-pointer hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ n("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-medium", children: N.pipelineName }),
            /* @__PURE__ */ n("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: N.id.slice(0, 11) }),
            /* @__PURE__ */ n("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ n(xe, { tone: ln(N.status).tone, size: "sm", children: N.status }) }),
            /* @__PURE__ */ n("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: N.triggerType ?? N.triggeredBy?.triggerType }),
            /* @__PURE__ */ n("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: la(N.startedAt) }),
            /* @__PURE__ */ n("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: N.completedAt ? ve(new Date(N.completedAt).getTime() - new Date(N.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ n("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: w[N.id] ?? "—" })
          ]
        },
        N.id
      )) })
    ] }) })
  ] });
}
function Cr(e) {
  let t = 0, r = 0;
  for (const s of Object.values(e.steps ?? {}))
    s.llm && (t += s.llm.tokensIn ?? 0, r += s.llm.tokensOut ?? 0);
  return { tokensIn: t, tokensOut: r };
}
function gc(e) {
  const t = /* @__PURE__ */ new Map();
  if (!e) return t;
  for (const r of e.nodes)
    r.data.type === "llm" && t.set(r.id, r.data.model);
  return t;
}
function bc(e, t) {
  const r = [];
  for (const s of Object.values(e.steps ?? {}))
    s.llm && r.push({
      model: t.get(s.nodeId),
      tokensIn: s.llm.tokensIn,
      tokensOut: s.llm.tokensOut
    });
  return pt(r).total.totalCostUsd;
}
function Vn(e, t) {
  if (e.length === 0) return 0;
  const r = Math.min(e.length - 1, Math.floor(e.length * t));
  return e[r];
}
function Jn(e) {
  return e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Gn(e) {
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? `$${t.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function yc(e) {
  return e.slice(0, 8);
}
function vc(e) {
  const t = Date.now() - new Date(e).getTime();
  return t < 6e4 ? "just now" : t < 36e5 ? `${Math.floor(t / 6e4)}m ago` : t < 864e5 ? `${Math.floor(t / 36e5)}h ago` : t < 2592e5 ? `${Math.floor(t / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function wc(e, t) {
  const r = e.length;
  let s = 0, i = 0, o = 0;
  const d = [];
  let c = 0, a = 0, p = 0;
  const f = /* @__PURE__ */ new Map();
  for (const u of e) {
    u.status === "completed" ? s++ : u.status === "failed" ? i++ : u.status === "cancelled" && o++, typeof u.durationMs == "number" && u.durationMs > 0 && d.push(u.durationMs);
    const v = Cr(u);
    if (c += v.tokensIn, a += v.tokensOut, p += bc(u, t), u.error?.message) {
      const w = u.error.message.slice(0, 48), N = f.get(w);
      N ? (N.count += 1, u.startedAt > N.lastSeenAt && (N.lastSeenAt = u.startedAt, N.exampleRunId = u.id)) : f.set(w, { count: 1, lastSeenAt: u.startedAt, exampleRunId: u.id });
    }
  }
  d.sort((u, v) => u - v);
  const h = Vn(d, 0.5), m = Vn(d, 0.95), x = r === 0 ? 0 : Math.round(s / r * 100), g = [...f.entries()].map(([u, v]) => ({ key: u, count: v.count, lastSeenAt: v.lastSeenAt, exampleRunId: v.exampleRunId })).sort((u, v) => v.count - u.count).slice(0, 5);
  return {
    totalCount: r,
    completedCount: s,
    failedCount: i,
    cancelledCount: o,
    successRatePct: x,
    medianMs: h,
    p95Ms: m,
    tokensIn: c,
    tokensOut: a,
    tokensPerRun: r === 0 ? 0 : Math.round((c + a) / r),
    totalCost: p,
    costPerRun: r === 0 ? 0 : p / r,
    failureBreakdown: g
  };
}
function Nc(e) {
  return e >= 90 ? "#16a34a" : e >= 70 ? "#f59e0b" : "#dc2626";
}
function kc(e) {
  const t = [...e].sort((a, p) => a.startedAt.localeCompare(p.startedAt)), r = [], s = [], i = [];
  let o = 0, d = 0, c = 0;
  for (const a of t) {
    const p = new Date(a.startedAt).getTime();
    a.status === "completed" ? o += 1 : a.status === "failed" ? d += 1 : a.status === "cancelled" && (c += 1), r.push({ x: p, y: o }), s.push({ x: p, y: d }), i.push({ x: p, y: c });
  }
  return [
    { label: "Completed", data: r, color: "#16a34a" },
    { label: "Failed", data: s, color: "#dc2626" },
    { label: "Cancelled", data: i, color: "#d1d5db" }
  ];
}
function Cc(e, t) {
  const s = [...e].sort((o, d) => o.startedAt.localeCompare(d.startedAt)).filter((o) => typeof o.durationMs == "number" && o.durationMs > 0).map((o) => ({ x: new Date(o.startedAt).getTime(), y: o.durationMs })), i = s.map((o) => ({ x: o.x, y: t }));
  return [
    { label: "Duration (ms)", data: s, color: "#646cff" },
    { label: "p50", data: i, color: "#94a3b8" }
  ];
}
function Ic(e) {
  const t = [...e].sort((i, o) => i.startedAt.localeCompare(o.startedAt)), r = [], s = [];
  for (const i of t) {
    const o = new Date(i.startedAt).getTime(), { tokensIn: d, tokensOut: c } = Cr(i);
    r.push({ x: o, y: d }), s.push({ x: o, y: c });
  }
  return [
    { label: "Tokens in", data: r, color: "#646cff" },
    { label: "Tokens out", data: s, color: "#16a34a" }
  ];
}
function ad() {
  const { pipelineId: e } = at(), t = Ee(), [r, s] = R(null), [i, o] = R([]), [d, c] = R("50");
  G(() => {
    e && (s(Re(e)), o(et(e)));
  }, [e]);
  const a = F(() => {
    if (d === "all") return i;
    const u = Number(d);
    return i.slice(0, u);
  }, [i, d]), p = F(() => gc(r), [r]), f = F(() => wc(a, p), [a, p]), h = F(
    () => ll(a, r).filter((u) => u.totalCostUsd > 0 || u.stepCount > 0),
    [a, r]
  ), m = F(() => pl(i, r, 30), [i, r]), x = F(
    () => [
      {
        label: "Daily spend",
        data: m.map((u) => ({ x: u.ts, y: u.totalCostUsd })),
        color: "#646cff"
      }
    ],
    [m]
  );
  if (!e) return /* @__PURE__ */ n(lt, { to: "/pipelines", replace: !0 });
  if (!r)
    return /* @__PURE__ */ n("div", { className: "p-8", children: /* @__PURE__ */ n(
      _e,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => t("/pipelines")
      }
    ) });
  const g = a.length > 0;
  return /* @__PURE__ */ l("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ l("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          onClick: () => t(`/pipelines/${e}`),
          className: "bg-transparent border-none text-primary cursor-pointer text-[13px] p-0",
          children: [
            "← ",
            r.name
          ]
        }
      ),
      /* @__PURE__ */ n("span", { className: "text-text-tertiary", children: "/" }),
      /* @__PURE__ */ n("span", { className: "text-lg font-bold text-text-primary", children: "Execution stats" }),
      /* @__PURE__ */ n(
        "div",
        {
          className: "ml-auto flex gap-1.5",
          "data-testid": "stats-range",
          children: ["10", "50", "all"].map((u) => /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: () => c(u),
              className: $(
                "px-2.5 py-1 text-xs font-medium rounded cursor-pointer font-[inherit]",
                d === u ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"
              ),
              children: u === "all" ? "All" : `Last ${u}`
            },
            u
          ))
        }
      )
    ] }),
    g ? /* @__PURE__ */ l(ne, { children: [
      /* @__PURE__ */ l(
        "div",
        {
          className: "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3",
          "data-testid": "stats-kpis",
          children: [
            /* @__PURE__ */ l("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ n("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Success rate" }),
              /* @__PURE__ */ l(
                "div",
                {
                  className: "text-[22px] font-bold font-mono",
                  style: { color: Nc(f.successRatePct) },
                  "data-testid": "stats-success-rate",
                  children: [
                    f.completedCount,
                    "/",
                    f.totalCount,
                    " (",
                    f.successRatePct,
                    "%)"
                  ]
                }
              ),
              /* @__PURE__ */ l("div", { className: "text-xs text-text-tertiary font-mono", children: [
                f.failedCount,
                " failed · ",
                f.cancelledCount,
                " cancelled"
              ] })
            ] }),
            /* @__PURE__ */ l("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ n("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Median duration" }),
              /* @__PURE__ */ n("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: ve(f.medianMs) }),
              /* @__PURE__ */ l("div", { className: "text-xs text-text-tertiary font-mono", children: [
                "p95 · ",
                ve(f.p95Ms)
              ] })
            ] }),
            /* @__PURE__ */ l("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ n("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Total tokens" }),
              /* @__PURE__ */ l("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: [
                f.tokensIn.toLocaleString(),
                " → ",
                f.tokensOut.toLocaleString()
              ] }),
              /* @__PURE__ */ l("div", { className: "text-xs text-text-tertiary font-mono", children: [
                f.tokensPerRun.toLocaleString(),
                " avg per run"
              ] })
            ] }),
            /* @__PURE__ */ l("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ n("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Total cost" }),
              /* @__PURE__ */ n("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: Jn(f.totalCost) }),
              /* @__PURE__ */ l("div", { className: "text-xs text-text-tertiary font-mono", children: [
                Jn(f.costPerRun),
                " avg per run"
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ l(
        "div",
        {
          className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3",
          "data-testid": "stats-cost-row",
          children: [
            /* @__PURE__ */ l("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-by-node", children: [
              /* @__PURE__ */ n("div", { className: "text-[13px] font-semibold text-text-primary", children: "Cost by node" }),
              h.length === 0 ? /* @__PURE__ */ n("div", { className: "text-xs text-text-tertiary py-2", children: "No per-node cost data in this range." }) : /* @__PURE__ */ n(
                Wr,
                {
                  data: h.map((u) => ({
                    label: u.label,
                    cost: Number(u.totalCostUsd.toFixed(6))
                  })),
                  xKey: "label",
                  yKey: "cost",
                  height: 200,
                  color: "#646cff",
                  yFormat: Gn
                }
              )
            ] }),
            /* @__PURE__ */ l("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-trend-30d", children: [
              /* @__PURE__ */ n("div", { className: "text-[13px] font-semibold text-text-primary", children: "30-day spend trend" }),
              /* @__PURE__ */ n(
                kt,
                {
                  series: x,
                  height: 200,
                  xFormat: (u) => new Date(Number(u)).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric"
                  }),
                  yFormat: Gn
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ l("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3", children: [
        /* @__PURE__ */ l("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ n("div", { className: "text-[13px] font-semibold text-text-primary", children: "Runs over time (cumulative)" }),
          /* @__PURE__ */ n(
            kt,
            {
              series: kc(a),
              height: 180,
              xFormat: (u) => new Date(Number(u)).toLocaleDateString()
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ n("div", { className: "text-[13px] font-semibold text-text-primary", children: "Duration over time" }),
          /* @__PURE__ */ n(
            kt,
            {
              series: Cc(a, f.medianMs),
              height: 180,
              xFormat: (u) => new Date(Number(u)).toLocaleDateString(),
              yFormat: (u) => ve(u)
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ n("div", { className: "text-[13px] font-semibold text-text-primary", children: "Token usage over time" }),
          /* @__PURE__ */ n(
            kt,
            {
              series: Ic(a),
              height: 180,
              xFormat: (u) => new Date(Number(u)).toLocaleDateString(),
              yFormat: (u) => u.toLocaleString()
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-failure-breakdown", children: [
          /* @__PURE__ */ n("div", { className: "text-[13px] font-semibold text-text-primary", children: "Failure breakdown (top 5)" }),
          f.failureBreakdown.length === 0 ? /* @__PURE__ */ n("div", { className: "text-xs text-text-tertiary py-2", children: "No failures in this range." }) : /* @__PURE__ */ l("table", { className: "w-full border-collapse text-xs", children: [
            /* @__PURE__ */ n("thead", { children: /* @__PURE__ */ n("tr", { className: "text-left", children: ["Error", "Count", "Last seen", "Example"].map((u) => /* @__PURE__ */ n(
              "th",
              {
                className: "px-2 py-1.5 text-[10px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
                children: u
              },
              u
            )) }) }),
            /* @__PURE__ */ n("tbody", { children: f.failureBreakdown.map((u) => /* @__PURE__ */ l("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ n(
                "td",
                {
                  className: "px-2 py-1.5 text-text-primary max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap",
                  title: u.key,
                  children: u.key
                }
              ),
              /* @__PURE__ */ n("td", { className: "px-2 py-1.5 font-mono text-text-primary", children: u.count }),
              /* @__PURE__ */ n("td", { className: "px-2 py-1.5 text-text-secondary", children: vc(u.lastSeenAt) }),
              /* @__PURE__ */ n("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ l(
                "button",
                {
                  type: "button",
                  onClick: () => t(`/pipelines/${e}/runs/${u.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    yc(u.exampleRunId),
                    " →"
                  ]
                }
              ) })
            ] }, u.key)) })
          ] })
        ] })
      ] })
    ] }) : /* @__PURE__ */ n(
      _e,
      {
        icon: "📊",
        title: "No runs yet",
        body: "No runs yet. Trigger this pipeline to see stats."
      }
    )
  ] });
}
function St(e, t) {
  return `${e}::${t}`;
}
function Ht(e, t) {
  const r = Re(e);
  if (!r) return { requiredCount: 1 };
  const s = r.nodes.find((o) => o.id === t);
  if (!s || s.data.type !== "approval") return { requiredCount: 1 };
  const i = s.data;
  return {
    message: i.message,
    requiredCount: Math.max(1, i.requiredCount ?? 1)
  };
}
function Sc() {
  const e = Qn(), t = nt(), [r, s] = R(
    () => {
      const g = {};
      for (const u in t.runs) {
        const v = t.runs[u];
        if (v.status === "awaiting_approval")
          for (const w in v.steps) {
            const N = v.steps[w];
            if (N.status !== "awaiting") continue;
            const C = Ht(v.pipelineId, w), k = Re(v.pipelineId)?.nodes.find((T) => T.id === w), b = k && k.data.type === "approval" ? k.data.approvers : [];
            g[St(u, w)] = {
              runId: u,
              pipelineId: v.pipelineId,
              stepId: w,
              approvers: b,
              requestedAt: N.startedAt ?? (/* @__PURE__ */ new Date(0)).toISOString(),
              message: C.message,
              requiredCount: C.requiredCount,
              recordedCount: N.approvals?.filter((T) => T.decision === "approve").length ?? 0
            };
          }
      }
      return g;
    }
  ), [i, o] = R(!0), [d, c] = R(null), [a, p] = R(0), f = oe(t.runs);
  G(() => {
    f.current = t.runs;
  }, [t.runs]);
  const h = oe(/* @__PURE__ */ new Map());
  G(() => {
    let g = !1;
    o(!0), c(null);
    const u = async () => {
      try {
        const v = await fetch("/api/pipelines/approvals", {
          credentials: "same-origin"
        });
        if (v.status === 404) return null;
        if (!v.ok)
          throw new Error(`Dashboard fetch failed: ${v.status}`);
        return { pendingApprovals: (await v.json()).approvals ?? [] };
      } catch (v) {
        if (v.message?.includes("Dashboard fetch failed"))
          throw v;
        return null;
      }
    };
    return (async () => {
      try {
        const v = await u();
        if (g) return;
        if (v?.pendingApprovals) {
          const w = {};
          for (const N of v.pendingApprovals) {
            const C = Ht(N.pipelineId, N.stepId);
            w[St(N.runId, N.stepId)] = {
              runId: N.runId,
              pipelineId: N.pipelineId,
              stepId: N.stepId,
              approvers: N.approvers ?? [],
              requestedAt: N.requestedAt,
              message: N.message ?? C.message,
              requiredCount: N.requiredCount ?? C.requiredCount,
              recordedCount: N.recordedCount ?? 0
            };
          }
          s(w);
        }
        o(!1);
      } catch (v) {
        if (g) return;
        console.error(
          "[usePendingApprovals] /api/observability/dashboard?include=pendingApprovals failed:",
          v
        ), c(v.message ?? "Failed to load pending approvals"), o(!1);
      }
    })(), () => {
      g = !0;
    };
  }, [a]), G(() => {
    const g = [];
    g.push(
      e.subscribe("pipeline.run.started", (v) => {
        const w = v;
        h.current.set(w.runId, w.pipelineId);
      })
    ), g.push(
      e.subscribe("pipeline.approval.requested", (v) => {
        const w = v, N = h.current.get(w.runId) ?? f.current[w.runId]?.pipelineId ?? "", C = Ht(N, w.stepId);
        s((y) => {
          const k = St(w.runId, w.stepId);
          return y[k] ? y : {
            ...y,
            [k]: {
              runId: w.runId,
              pipelineId: N,
              stepId: w.stepId,
              approvers: w.approvers,
              requestedAt: w.at,
              message: C.message,
              requiredCount: C.requiredCount,
              recordedCount: 0
            }
          };
        });
      })
    ), g.push(
      e.subscribe("pipeline.approval.recorded", (v) => {
        const w = v, N = St(w.runId, w.stepId);
        s((C) => {
          const y = C[N];
          if (!y) return C;
          if (w.decision === "reject") {
            const T = { ...C };
            return delete T[N], T;
          }
          const k = (y.recordedCount ?? 0) + 1, b = y.requiredCount ?? 1;
          if (k >= b) {
            const T = { ...C };
            return delete T[N], T;
          }
          return {
            ...C,
            [N]: { ...y, recordedCount: k }
          };
        });
      })
    );
    const u = e.subscribeToApprovals();
    return g.push(u), () => {
      for (const v of g) v();
    };
  }, [e]);
  const m = F(() => Object.values(r).sort(
    (g, u) => u.requestedAt.localeCompare(g.requestedAt)
  ), [r]), x = M(() => {
    p((g) => g + 1);
  }, []);
  return { approvals: m, isLoading: i, error: d, retry: x };
}
function Tc(e) {
  const t = new Date(e).getTime();
  if (!Number.isFinite(t) || t <= 0) return "—";
  const r = Math.floor((Date.now() - t) / 1e3);
  if (r < 10) return "just now";
  if (r < 60) return `${r}s ago`;
  const s = Math.floor(r / 60);
  if (s < 60) return `${s}m ago`;
  const i = Math.floor(s / 60);
  return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
}
function Ac(e) {
  return e.length <= 6 ? e : e.slice(-6);
}
function Dc({ approver: e, idx: t }) {
  const r = e.type === "role" ? "🎖" : "👤";
  return /* @__PURE__ */ l(
    "span",
    {
      className: "inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-sm text-[11px] font-semibold leading-[1.4] whitespace-nowrap",
      children: [
        /* @__PURE__ */ n("span", { "aria-hidden": !0, children: r }),
        /* @__PURE__ */ n("span", { children: e.value })
      ]
    },
    `${e.type}:${e.value}:${t}`
  );
}
function Rc(e, t) {
  const r = [];
  if (e) {
    const s = e.steps;
    for (const [i, o] of Object.entries(e))
      i === "steps" || o == null || o === "" || (typeof o == "string" ? r.push({ label: i, value: o }) : typeof o == "object" && r.push({ label: i, value: JSON.stringify(o, null, 2) }));
    if (s && typeof s == "object")
      for (const [i, o] of Object.entries(s)) {
        if (o == null) continue;
        const d = o;
        typeof d.response == "string" && d.response.trim() && r.push({ label: `Step ${i.slice(0, 8)} response`, value: d.response });
      }
  }
  if (r.length === 0 && t)
    for (const [s, i] of Object.entries(t)) {
      const o = i.output;
      if (o)
        for (const [d, c] of Object.entries(o))
          c == null || c === "" || d === "tokensIn" || d === "tokensOut" || typeof c == "string" && c.trim() && r.push({ label: d, value: c });
    }
  return r;
}
function $c({ row: e, onSubmit: t, onOpenPipeline: r }) {
  const [s, i] = R(""), o = M(
    (p) => {
      t(p, s.trim()), i("");
    },
    [s, t]
  ), d = e.requiredCount ?? 1, c = e.recordedCount ?? 0, a = F(() => Rc(e.runContext, e.runSteps), [e.runContext, e.runSteps]);
  return /* @__PURE__ */ l("div", { "data-testid": `approval-card-${e.runId}`, className: "flex flex-col gap-3 p-4 bg-surface border border-border rounded-[10px]", children: [
    /* @__PURE__ */ l("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ l("div", { className: "flex items-center gap-2.5 min-w-0", children: [
        /* @__PURE__ */ n("span", { className: "text-lg", "aria-hidden": !0, children: "✋" }),
        /* @__PURE__ */ l("div", { className: "min-w-0", children: [
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              onClick: r,
              "data-testid": `open-pipeline-${e.pipelineId}`,
              className: "text-sm font-semibold text-text-primary bg-transparent border-none p-0 cursor-pointer font-[inherit] text-left overflow-hidden text-ellipsis whitespace-nowrap max-w-full",
              title: e.pipelineName,
              children: e.pipelineName
            }
          ),
          /* @__PURE__ */ l("div", { className: "font-mono text-[11px] text-text-tertiary", children: [
            "run #",
            Ac(e.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ n("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: Tc(e.requestedAt) })
    ] }),
    e.message ? /* @__PURE__ */ n("div", { "data-testid": `approval-message-${e.runId}`, className: "text-[13px] text-text-secondary bg-[#fafbfc] px-3 py-2 rounded-md leading-normal", children: e.message }) : null,
    /* @__PURE__ */ l("div", { className: "flex flex-col gap-1.5 px-3 py-2.5 bg-[#fafbfc] rounded-md border border-border", children: [
      /* @__PURE__ */ n("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: a.length > 0 ? "Context" : "Run details" }),
      a.length > 0 ? a.map(({ label: p, value: f }) => /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ n("div", { className: "text-[11px] font-medium text-text-secondary", children: p }),
        /* @__PURE__ */ n("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: f })
      ] }, p)) : /* @__PURE__ */ l(ne, { children: [
        /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ n("div", { className: "text-[11px] font-medium text-text-secondary", children: "Run" }),
          /* @__PURE__ */ n("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: e.runId })
        ] }),
        /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ n("div", { className: "text-[11px] font-medium text-text-secondary", children: "Step" }),
          /* @__PURE__ */ n("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: e.stepId })
        ] }),
        /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ n("div", { className: "text-[11px] font-medium text-text-secondary", children: "Status" }),
          /* @__PURE__ */ n("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: "Awaiting your approval — upstream steps haven't produced reviewable output yet (or this approval node runs in parallel with them)." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ l("div", { className: "flex flex-wrap gap-1.5 items-center", children: [
      /* @__PURE__ */ n("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Approvers:" }),
      e.approvers.length === 0 ? /* @__PURE__ */ n("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : e.approvers.map((p, f) => /* @__PURE__ */ n(Dc, { approver: p, idx: f }, f)),
      d > 1 ? /* @__PURE__ */ l("span", { className: "text-[11px] text-text-tertiary ml-1", children: [
        "(",
        c,
        "/",
        d,
        " approvals)"
      ] }) : null
    ] }),
    /* @__PURE__ */ n(
      "textarea",
      {
        "data-testid": `approval-comment-${e.runId}`,
        value: s,
        onChange: (p) => i(p.target.value),
        placeholder: "Optional comment…",
        rows: 2,
        className: "w-full px-3 py-2 text-[13px] font-[inherit] border border-border-field rounded-md bg-[#f9fafb] text-text-primary outline-none resize-y"
      }
    ),
    /* @__PURE__ */ l("div", { className: "flex gap-2 justify-end", children: [
      /* @__PURE__ */ n("button", { "data-testid": `reject-${e.runId}`, onClick: () => o("reject"), className: "px-3.5 py-1.5 text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-md font-[inherit] cursor-pointer", children: "Reject" }),
      /* @__PURE__ */ n("button", { "data-testid": `approve-${e.runId}`, onClick: () => o("approve"), className: "px-3.5 py-1.5 text-[13px] font-semibold bg-[#16a34a] text-white border-none rounded-md font-[inherit] cursor-pointer shrink-0", children: "Approve" })
    ] })
  ] });
}
function ld() {
  const e = Ee(), { approvals: t, isLoading: r, error: s, retry: i } = Sc(), { resolveApproval: o, runs: d } = nt(), [c, a] = R(
    () => /* @__PURE__ */ new Set()
  );
  G(() => {
    if (c.size === 0) return;
    const u = new Set(t.map((N) => `${N.runId}::${N.stepId}`));
    let v = !1;
    const w = new Set(c);
    for (const N of c)
      u.has(N) || (w.delete(N), v = !0);
    v && a(w);
  }, [t, c]);
  const [p, f] = R({}), h = oe(/* @__PURE__ */ new Set());
  G(() => {
    for (const u of t)
      h.current.has(u.runId) || (h.current.add(u.runId), Rr(u.pipelineId, u.runId).then((v) => {
        v && f((w) => ({
          ...w,
          [u.runId]: { context: v.context, steps: v.steps }
        }));
      }));
  }, [t]);
  const m = F(() => {
    const u = /* @__PURE__ */ new Map(), v = [];
    for (const w of t) {
      const N = `${w.runId}::${w.stepId}`;
      if (c.has(N)) continue;
      let C = u.get(w.pipelineId);
      C === void 0 && (C = Re(w.pipelineId), u.set(w.pipelineId, C));
      const y = C?.name ?? (w.pipelineId ? `Pipeline ${w.pipelineId.slice(0, 8)}` : "Unknown pipeline"), k = p[w.runId]?.context ?? d[w.runId]?.context, b = p[w.runId]?.steps;
      v.push({ ...w, pipelineName: y, runContext: k, runSteps: b });
    }
    return v;
  }, [t, c, d, p]), x = M(
    (u, v, w, N, C) => {
      o(v, w, N, C || void 0), a((y) => {
        const k = new Set(y);
        return k.add(`${v}::${w}`), k;
      }), fetch(`/api/pipelines/${encodeURIComponent(v)}/approvals`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: w, decision: N, ...C ? { comment: C } : {} })
      }).catch((y) => {
        console.error("[approvals] POST failed", y);
      }), e(`/pipelines/${u}/runs/${v}`);
    },
    [o, e]
  ), g = m.length;
  return /* @__PURE__ */ l("div", { "data-testid": "pending-approvals-page", className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-[inherit]", children: [
    /* @__PURE__ */ n("div", { className: "h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]", children: /* @__PURE__ */ l("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ n("div", { className: "text-lg font-bold text-text-primary", children: "Pending approvals" }),
      /* @__PURE__ */ n(xe, { "data-testid": "pending-count", tone: g > 0 ? "warning" : "neutral", size: "sm", children: g })
    ] }) }),
    /* @__PURE__ */ l("div", { className: "flex-1 overflow-y-auto p-5", children: [
      s ? /* @__PURE__ */ l("div", { "data-testid": "approvals-error", role: "alert", className: "px-4 py-3 bg-[#fef2f2] border border-[#dc2626] text-[#dc2626] rounded-lg flex items-center justify-between gap-3 mb-4", children: [
        /* @__PURE__ */ n("span", { className: "text-[13px] font-medium", children: "Couldn't load pending approvals. Try again." }),
        /* @__PURE__ */ n("button", { "data-testid": "approvals-retry", onClick: i, className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[#dc2626] border border-[#dc2626] rounded-md cursor-pointer font-[inherit]", children: "Retry" })
      ] }) : null,
      r && g === 0 ? /* @__PURE__ */ l("div", { "data-testid": "approvals-loading", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: [
        /* @__PURE__ */ n(Ut, { height: 140 }),
        /* @__PURE__ */ n(Ut, { height: 140 }),
        /* @__PURE__ */ n(Ut, { height: 140 })
      ] }) : g === 0 && !s ? /* @__PURE__ */ n(
        _e,
        {
          icon: "✋",
          title: "No pending approvals",
          body: "When a pipeline reaches an approval step, it'll show up here.",
          testId: "approvals-empty"
        }
      ) : /* @__PURE__ */ n("div", { "data-testid": "approvals-list", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: m.map((u) => /* @__PURE__ */ n(
        $c,
        {
          row: u,
          onOpenPipeline: () => e(`/pipelines/${u.pipelineId}`),
          onSubmit: (v, w) => x(u.pipelineId, u.runId, u.stepId, v, w)
        },
        `${u.runId}:${u.stepId}`
      )) })
    ] })
  ] });
}
export {
  Uo as ActionNode,
  id as AllRunsPage,
  qo as ApprovalNode,
  Ce as BaseNode,
  Eo as ConditionNode,
  pd as EventStreamProvider,
  _o as ForkNode,
  Fo as JoinNode,
  Ro as LLMNode,
  ld as PendingApprovalsPage,
  ks as PipelineCanvas,
  Et as PipelineEditorContext,
  ed as PipelineEditorPage,
  sr as PipelineEditorProvider,
  od as PipelineRunComparePage,
  sd as PipelineRunDiff,
  rd as PipelineRunReplayPage,
  nd as PipelineRunsPage,
  go as PipelineRunsProvider,
  ad as PipelineStatsPage,
  td as PipelinesPage,
  Po as TransformNode,
  To as TriggerNode,
  Xo as nodeTypes,
  Pe as useEventStream,
  Qn as useEventStreamContext,
  ke as useLatestStepForNode,
  dt as usePipelineEditor,
  nt as usePipelineRuns,
  Te as useRetryFromStep
};
