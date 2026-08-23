import { jsxs as o, jsx as t, Fragment as H } from "react/jsx-runtime";
import Ur, { useState as S, memo as Io, useRef as ce, useEffect as oe, useMemo as W, useCallback as E, useContext as Kt, createContext as So } from "react";
import { useNavigate as Ve, useParams as xt, Navigate as bt, useSearchParams as Ht } from "react-router";
import { t as jr, v as fe, w as _e, p as Me, G as Cn, x as Ke, u as yt, h as To, f as $o, e as Un, o as Ao, y as In, N as he, z as Ro, S as Sn, R as Et, J as Qt, q as zr, I as Fr, A as it, B as Tn, m as qr, a as ct, C as Wr, D as $n, E as xn, F as Vr, H as Po, K as Do, L as Mo, b as Eo, M as dt, O as Oo, Q as _o, T as pt, U as jn, V as Lo, i as Bo, n as Kr, W as Ft, X as Uo, k as zn, P as jo, Y as zo, r as Fo, Z as qt, l as Fn, _ as qo, j as Wo } from "./usePendingApprovals-CZUoGJD7.js";
import { g as yh, $ as vh, a0 as wh } from "./usePendingApprovals-CZUoGJD7.js";
import { Handle as U, Position as j, useNodeConnections as Vo, getSmoothStepPath as Ko, EdgeLabelRenderer as qn, ReactFlowProvider as Ho, useReactFlow as Jo, useNodesState as Hr, useEdgesState as Jr, ReactFlow as Gr, Background as Yr, BackgroundVariant as Go, Controls as Xr, MiniMap as Yo } from "@xyflow/react";
/* empty css               */
import { c as I } from "./cn-B6yFEsav.js";
import { c as An, u as Jt } from "./ToastProvider-DzXNjRMX.js";
import { a as vt, F as Xo, I as Qo, C as Rn, U as Zo, T as Pn, S as Dn, b as ea } from "./TrendSparkline-po-w4wQC.js";
import "clsx";
import "tailwind-merge";
import { M as Qe } from "./Modal-X8tdpRKs.js";
import "react-dom";
import "./WebSocketContext-DPGFyPeZ.js";
import { a as ze, u as ta } from "./EventStreamContext-CjzSHXy-.js";
import { E as kh } from "./EventStreamContext-CjzSHXy-.js";
import { B as Pe } from "./Button-DILgRebO.js";
import { T as $e } from "./Textarea-kaa9rHUL.js";
import { I as mt, S as na, F as ra } from "./FileUploadDrop-D8mbq_QB.js";
import { I as we } from "./Input-Dt0yAs9r.js";
import { S as Ce } from "./Select-DAEcKWg2.js";
import { E as qe } from "./EmptyState-Ejc9dJA3.js";
import { B as nt } from "./Banner-BoO81CCz.js";
import { C as le } from "./Chip-BDT8ro4h.js";
import { C as rt } from "./Checkbox-vOc5I8kn.js";
import { u as Qr } from "./IdentityContext-CLalsm_M.js";
import { C as Wt } from "./ConfirmDialog-B0yXaqxp.js";
import { B as oa, L as Ut } from "./Chart-D_DsFB-7.js";
import { S as Zt } from "./SkeletonCard-Bm2f1JX1.js";
const aa = {
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
  "ag-ui-output": [],
  "image-source": ["out"],
  "image:save": ["out", "error"],
  scatter: ["out"],
  "image:resize": ["out", "error"],
  "image:transform": ["out", "error"],
  "image:format-convert": ["out", "error"],
  "image:sharpen": ["out", "error"],
  "image:watermark": ["out", "error"],
  "image:crop": ["out"],
  "image:adjust-bw": ["out", "error"],
  "image:adjust-layer": ["out", "error"],
  "image:dimensions": ["out", "error"],
  "image:upscale": ["out", "error"],
  "image:vision-analyze": ["out"],
  "image:vision-classify": ["out", "error"],
  "image:vision-describe": ["out", "error"],
  "image:vision-tag": ["out", "error"],
  "image:vision-extract-text": ["out", "error"],
  "image:generate": ["out", "error"],
  "image:variation": ["out", "error"],
  "image:edit-prompt": ["out", "error"]
}, ia = {
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
  "ag-ui-output": ["in"],
  // image-source runs downstream of the trigger (default mode reads the
  // trigger payload), so it accepts an inbound 'in' edge: trigger →
  // image-source → … . Matches the backend contract + VisionPipelineE2E.
  "image-source": ["in"],
  "image:save": ["in"],
  scatter: ["in"],
  "image:resize": ["in"],
  "image:transform": ["in"],
  "image:format-convert": ["in"],
  "image:sharpen": ["in"],
  "image:watermark": ["in"],
  "image:crop": ["in"],
  "image:adjust-bw": ["in"],
  "image:adjust-layer": ["in"],
  "image:dimensions": ["in"],
  "image:upscale": ["in"],
  "image:vision-analyze": ["in"],
  "image:vision-classify": ["in"],
  "image:vision-describe": ["in"],
  "image:vision-tag": ["in"],
  "image:vision-extract-text": ["in"],
  "image:generate": ["in"],
  "image:variation": ["in"],
  "image:edit-prompt": ["in"]
};
function bn(e, n, r, a) {
  return !(!sa(e, n) || !la(r, a));
}
function sa(e, n) {
  const r = aa[e];
  return r === "fork" ? ca(n) : r.includes(n);
}
function la(e, n) {
  const r = ia[e];
  return r === null ? !1 : r === "join" ? da(n) : r.includes(n);
}
function ca(e) {
  return /^branch-(\d+)$/.exec(e) !== null;
}
function da(e) {
  return /^in-(\d+)$/.exec(e) !== null;
}
const pa = {
  idle: { card: "border border-border-field bg-white", dot: "bg-state-idle" },
  pending: { card: "border border-dashed border-info-border bg-info-bg", dot: "bg-state-pending" },
  running: { card: "border-2 border-info bg-info-bg", dot: "bg-info" },
  awaiting: { card: "border-2 border-warning bg-warning-bg", dot: "bg-warning" },
  completed: { card: "border border-success bg-success-bg", dot: "bg-success" },
  failed: { card: "border-2 border-danger bg-danger-bg", dot: "bg-danger" },
  skipped: { card: "border border-dashed border-border-field bg-surface-inset opacity-50", dot: "bg-state-idle" }
}, ua = {
  source: { bar: "bg-cat-source", chip: "w-5 h-5 rounded-full bg-cat-source/15" },
  transform: { bar: "bg-cat-transform", chip: "w-5 h-5 rounded-md bg-cat-transform/15" },
  ai: { bar: "bg-cat-ai", chip: "w-5 h-5 rounded-md bg-gradient-to-br from-cat-ai/25 to-cat-ai/5" },
  control: { bar: "bg-cat-control", chip: "w-5 h-5 rounded-[4px] bg-cat-control/15 rotate-45", glyph: "-rotate-45" },
  sink: { bar: "bg-cat-sink", chip: "w-5 h-5 rounded-md bg-cat-sink/15" },
  human: { bar: "bg-cat-human", chip: "w-7 h-5 rounded-full bg-cat-human/15" }
};
function ye(e) {
  const n = jr(), r = e.nodeType ? !n(e.nodeType) : !1, { icon: a, subtitle: i, state: s, body: d, footer: c, selected: l, onRetry: p, hasBreakpoint: u, pausedAtBreakpoint: f, ariaLabel: h, category: g, children: x } = e, m = pa[s], w = g ? ua[g] : void 0, v = An(), [b, N] = S(!1), y = s === "failed" && typeof p == "function", k = (D) => {
    D.preventDefault(), D.stopPropagation(), p?.();
  }, C = !v && s === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !v && s === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", T = !!(d || c || y), M = !!(d || c), P = i ? `${i}, state: ${s}` : `Node, state: ${s}`;
  return /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        f ? "border-2 border-warning bg-warning-bg shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]" : m.card,
        !f && l && "shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]",
        !f && !l && "shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
        v && "transition-none"
      ),
      role: "button",
      tabIndex: 0,
      "aria-label": h ?? P,
      "aria-selected": !!l,
      "data-state": s,
      "data-node-state": s,
      "data-node-category": g,
      "data-pipeline-node": "true",
      children: [
        w && /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            "data-testid": "category-accent",
            className: I(
              "absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[7px] pointer-events-none",
              w.bar
            )
          }
        ),
        u && /* @__PURE__ */ t(
          "span",
          {
            "aria-label": "breakpoint",
            "data-testid": "breakpoint-dot",
            className: "absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-danger border-[1.5px] border-white z-[1]"
          }
        ),
        /* @__PURE__ */ o("div", { className: I(
          "flex items-center gap-2 h-7 px-2.5",
          T && "border-b border-border"
        ), children: [
          w ? /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": "true",
              "data-testid": "category-chip",
              className: I("flex items-center justify-center shrink-0", w.chip),
              children: /* @__PURE__ */ t("span", { className: I("text-xs leading-none", w.glyph), children: a })
            }
          ) : /* @__PURE__ */ t("span", { className: "text-sm leading-none shrink-0", "aria-hidden": "true", children: a }),
          /* @__PURE__ */ t("span", { className: "flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap", children: i }),
          r && /* @__PURE__ */ t(
            "span",
            {
              "data-testid": "node-preview-badge",
              title: "This deployment has no executor for this node type — the step will not run.",
              className: "shrink-0 rounded-full border border-warning-border bg-warning-bg px-1.5 text-[8px] font-semibold uppercase tracking-wide text-warning-fg",
              children: "preview"
            }
          ),
          /* @__PURE__ */ t(
            "span",
            {
              className: I("w-2 h-2 rounded-full shrink-0", m.dot, C),
              "aria-label": `state: ${s}`
            }
          )
        ] }),
        y && /* @__PURE__ */ t("div", { className: I(
          "flex px-2.5 py-1.5",
          M && "border-b border-border"
        ), children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: I(
              "cursor-pointer appearance-none font-inherit text-[11px] font-medium leading-tight px-2 py-0.5 rounded-full border border-danger text-danger-fg transition-colors duration-[120ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              b ? "bg-danger-bg" : "bg-transparent",
              v && "transition-none"
            ),
            onClick: k,
            onMouseDown: (D) => D.stopPropagation(),
            onMouseEnter: () => N(!0),
            onMouseLeave: () => N(!1),
            "aria-label": "Retry from here",
            children: "⟳ Retry from here"
          }
        ) }),
        d != null && /* @__PURE__ */ t("div", { className: "px-2.5 py-2 text-[13px] leading-[1.4] text-text-secondary", children: d }),
        c != null && /* @__PURE__ */ t("div", { className: "border-t border-border px-2.5 py-1.5 text-xs text-text-secondary", children: c }),
        x
      ]
    }
  );
}
const ma = {
  // -- source: where data enters the graph -----------------------------
  trigger: "source",
  "image-source": "source",
  "knowledge-base": "source",
  "graph-query": "source",
  // -- transform: deterministic data/image manipulation ----------------
  transform: "transform",
  // memory reads/writes run-scoped context — it reshapes state rather
  // than originating or emitting data, so it sits with transforms.
  memory: "transform",
  "image:resize": "transform",
  "image:transform": "transform",
  "image:format-convert": "transform",
  "image:sharpen": "transform",
  "image:watermark": "transform",
  "image:crop": "transform",
  "image:adjust-bw": "transform",
  "image:adjust-layer": "transform",
  "image:dimensions": "transform",
  // -- ai: model-backed steps (LLM, agents, vision, generative) --------
  llm: "ai",
  agent: "ai",
  "mcp-tool": "ai",
  "image:vision-analyze": "ai",
  "image:vision-classify": "ai",
  "image:vision-describe": "ai",
  "image:vision-tag": "ai",
  "image:vision-extract-text": "ai",
  "image:generate": "ai",
  "image:variation": "ai",
  "image:edit-prompt": "ai",
  "image:upscale": "ai",
  // -- control: branching / fan-out / gating ---------------------------
  condition: "control",
  fork: "control",
  join: "control",
  scatter: "control",
  guardrail: "control",
  policy: "control",
  // -- sink: where data leaves the graph -------------------------------
  action: "sink",
  "ag-ui-output": "sink",
  "image:save": "sink",
  // -- human: human-in-the-loop gates ----------------------------------
  approval: "human"
};
function xe(e) {
  return ma[e];
}
const ha = {
  image: "!w-2.5 !h-2.5 !rounded-sm !bg-accent !border-accent",
  text: "!w-2.5 !h-2.5 !bg-surface-emphasis",
  data: "!w-2.5 !h-2.5 !bg-neutral",
  control: "!w-2 !h-2 !bg-warning",
  error: "!w-2 !h-2 !bg-danger"
};
function z(e) {
  return ha[e];
}
function Wn(e) {
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
function fa(e) {
  return e.triggerType === "schedule" ? e.schedule ? `cron: ${e.schedule}` : "No schedule set" : e.triggerType === "webhook" ? e.webhookPath ? `POST ${e.webhookPath}` : "No path set" : e.triggerType.startsWith("document.") ? e.documentTypeId ? `Doc type: ${e.documentTypeId}` : "Any document" : "Fires on user click";
}
function ga(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = _e(), p = c === "failed" ? () => l(n) : void 0, u = `Trigger node, ${Wn(r)}, state: ${c}`;
  return /* @__PURE__ */ t(
    ye,
    {
      icon: "▶",
      subtitle: Wn(r),
      state: c,
      category: xe("trigger"),
      body: /* @__PURE__ */ t("span", { className: "italic", children: fa(r) }),
      selected: a,
      onRetry: p,
      ariaLabel: u,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: /* @__PURE__ */ t(
        U,
        {
          type: "source",
          position: j.Right,
          id: "out",
          className: z("data")
        }
      )
    }
  );
}
function xa(e) {
  if (!e || e.trim().length === 0) return "Not configured";
  const r = e.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
function ba({ info: e }) {
  const [n, r] = S(!1), a = n ? e.response : e.response.length > 60 ? `${e.response.slice(0, 60)}…` : e.response, i = e.tokensIn != null || e.tokensOut != null;
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => r((s) => !s),
        className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-xs text-text-secondary font-medium text-left",
        children: [
          n ? "▾" : "▸",
          " Response",
          i && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: [
            e.tokensIn ?? 0,
            " → ",
            e.tokensOut ?? 0,
            " tokens"
          ] }),
          e.streamOpening && /* @__PURE__ */ t(
            "span",
            {
              className: "ml-1.5 text-[11px] text-info-fg",
              "data-testid": "llm-stream-opening",
              title: "LLM stream is open — waiting for the first token",
              children: "· stream open — waiting…"
            }
          ),
          !e.streamOpening && e.streaming && /* @__PURE__ */ t("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: "· streaming…" })
        ]
      }
    ),
    /* @__PURE__ */ t(
      "div",
      {
        className: n ? "mt-1 font-mono text-[11px] leading-[1.4] text-text-primary whitespace-pre-wrap break-words line-clamp-6" : "mt-1 font-mono text-[11px] leading-[1.4] text-text-primary whitespace-pre-wrap break-words max-h-[1.4em] overflow-hidden",
        children: a
      }
    )
  ] });
}
function ya(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = i?.llm, p = c === "running" && l?.streamOpened === !0 && (l?.tokensOut ?? 0) === 0, u = c === "running" && l !== void 0 && (l.tokensOut ?? 0) > 0, f = _e(), h = c === "failed" ? () => f(n) : void 0, g = /* @__PURE__ */ t("span", { className: "italic", children: xa(r.userPromptTemplate) }), m = (l ? {
    response: l.response ?? "",
    tokensIn: l.tokensIn,
    tokensOut: l.tokensOut,
    streaming: u,
    streamOpening: p
  } : void 0) ?? r._llmResponse, w = m ? /* @__PURE__ */ t(ba, { info: m }) : void 0, v = (r.systemPrompt ?? "").replace(/\s+/g, " ").trim(), b = v.length === 0 ? "no system prompt" : `system prompt: ${v.length > 60 ? `${v.slice(0, 60)}…` : v}`, N = `LLM node, ${r.model || r.provider}, ${b}, state: ${c}`;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "🧠",
      subtitle: r.model || r.provider,
      state: c,
      category: xe("llm"),
      body: g,
      footer: w,
      selected: a,
      onRetry: h,
      ariaLabel: N,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: `${z("text")} !top-[40%]` }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !top-[60%]` })
      ]
    }
  );
}
function va(e) {
  if (!e) return "—";
  const n = e.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function wa(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = _e(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "✨",
      subtitle: r.transformType,
      state: c,
      category: xe("transform"),
      body: /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: va(r.expression) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("data") })
      ]
    }
  );
}
function Na(e) {
  if (!e) return "—";
  const n = e.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function ka(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = _e(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "❓",
      subtitle: r.label || "condition",
      state: c,
      category: xe("condition"),
      body: /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Na(r.expression) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "true", className: `${z("control")} !top-[40%]` }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "false", className: `${z("control")} !top-[60%]` })
      ]
    }
  );
}
function Ca(e) {
  const n = e.config ?? {};
  switch (e.actionType) {
    case "update-document":
      return `Update ${typeof n.documentId == "string" ? n.documentId : "(current)"}`;
    case "post-comment":
      return `Comment on ${typeof n.target == "string" ? n.target : "(current doc)"}`;
    case "notify":
      return `Notify ${typeof n.channel == "string" ? n.channel : "recipients"}`;
    case "webhook":
      return `POST → ${typeof n.url == "string" ? n.url : "(no URL)"}`;
    case "mcp-tool":
      return `Invoke ${typeof n.tool == "string" ? n.tool : "(no tool)"}`;
    default:
      return "Action";
  }
}
function Ia(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = _e(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "⚡",
      subtitle: r.actionType,
      state: c,
      category: xe("action"),
      body: /* @__PURE__ */ t("span", { className: "italic", children: Ca(r) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: `${z("data")} !top-[40%]` }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !top-[60%]` })
      ]
    }
  );
}
function Sa(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = _e(), p = c === "failed" ? () => l(n) : void 0, u = Math.max(2, Math.min(8, r.branchCount ?? 2)), f = Array.from({ length: u }, (h, g) => {
    const x = r.branchLabels?.[g];
    return x && x.trim().length > 0 ? x : `branch ${g}`;
  });
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "⑂",
      subtitle: `${u} branches`,
      state: c,
      category: xe("fork"),
      body: /* @__PURE__ */ t("ul", { className: "m-0 p-0 list-none flex flex-col gap-0.5 text-xs text-text-secondary", children: f.map((h, g) => /* @__PURE__ */ o("li", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: [
        "• ",
        h
      ] }, g)) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        f.map((h, g) => {
          const x = (g + 1) / (u + 1) * 100;
          return /* @__PURE__ */ t(
            U,
            {
              type: "source",
              position: j.Right,
              id: `branch-${g}`,
              className: z("control"),
              style: { top: `${x}%` }
            },
            g
          );
        })
      ]
    }
  );
}
function Ta(e) {
  return e.mode === "all" ? "all" : e.mode === "any" ? "any" : `${e.n ?? 1} of many`;
}
function $a(e) {
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
function Aa(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = _e(), p = c === "failed" ? () => l(n) : void 0, u = Vo({ handleType: "target" }), f = Math.max(2, u.length + 1);
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "⑃",
      subtitle: Ta(r),
      state: c,
      category: xe("join"),
      body: /* @__PURE__ */ t("span", { className: "italic", children: $a(r.mergeStrategy) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        Array.from({ length: f }, (h, g) => {
          const x = (g + 1) / (f + 1) * 100;
          return /* @__PURE__ */ t(
            U,
            {
              type: "target",
              position: j.Left,
              id: `in-${g}`,
              className: z("control"),
              style: { top: `${x}%` }
            },
            `in-${g}`
          );
        }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("data") })
      ]
    }
  );
}
function Ra(e) {
  return e.type === "role" ? `@${e.value}` : e.value;
}
function Pa(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = _e(), p = c === "failed" ? () => l(n) : void 0, u = r.approvers ?? [], f = u.length, h = r.requiredCount ?? 0, g = `${f} approver${f === 1 ? "" : "s"}, ${h}/${f} required`, x = u.slice(0, 2), m = Math.max(0, u.length - 2), w = u.length === 0 ? /* @__PURE__ */ t("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: [
    x.map((v, b) => /* @__PURE__ */ t(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: Ra(v)
      },
      b
    )),
    m > 0 && /* @__PURE__ */ o("span", { className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-inset text-text-tertiary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap", children: [
      "+",
      m,
      " more"
    ] })
  ] });
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "✋",
      subtitle: g,
      state: c,
      category: xe("approval"),
      body: w,
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "approved", className: `${z("data")} !top-[40%]` }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "rejected", className: `${z("data")} !top-[60%]` })
      ]
    }
  );
}
function Da({ id: e, data: n, selected: r }) {
  const a = fe(e), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = _e(), c = n.agentName || n.agentId || "Not configured", l = `${n.protocol.toUpperCase()}${n.streaming ? " (streaming)" : ""}`;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "🤖",
      subtitle: c,
      state: s,
      category: xe("agent"),
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: `${z("data")} !top-[40%]` }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !top-[60%]` })
      ]
    }
  );
}
function Ma({ id: e, data: n, selected: r }) {
  const a = fe(e), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = _e(), c = n.toolName || "Not configured";
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "🔌",
      subtitle: c,
      state: s,
      category: xe("mcp-tool"),
      body: n.gatewayUrl ? /* @__PURE__ */ t("span", { className: "text-[11px]", children: n.gatewayUrl }) : void 0,
      selected: r,
      onRetry: s === "failed" && a ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: `${z("data")} !top-[40%]` }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !top-[60%]` })
      ]
    }
  );
}
function Ea({ id: e, data: n, selected: r }) {
  const a = fe(e), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = _e(), c = n.knowledgeBaseId || "Not configured", l = `Top ${n.topK} chunks${n.scoreThreshold ? ` (≥${n.scoreThreshold})` : ""}`;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "📚",
      subtitle: c,
      state: s,
      category: xe("knowledge-base"),
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: `${z("data")} !top-[40%]` }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !top-[60%]` })
      ]
    }
  );
}
function Oa({ id: e, data: n, selected: r }) {
  const a = fe(e), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = _e(), c = n.graphId || "Not configured", l = n.query.length > 40 ? `${n.query.slice(0, 37)}...` : n.query;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "🕸️",
      subtitle: c,
      state: s,
      category: xe("graph-query"),
      body: /* @__PURE__ */ t("span", { className: "text-[11px] font-mono", children: l }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: `${z("data")} !top-[40%]` }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !top-[60%]` })
      ]
    }
  );
}
function _a({ id: e, data: n, selected: r }) {
  const a = fe(e), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = _e(), c = `${n.mode} ${n.scope}`, l = n.namespace ? `ns: ${n.namespace}` : "No namespace";
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "💾",
      subtitle: c,
      state: s,
      category: xe("memory"),
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: `${z("data")} !top-[40%]` }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !top-[60%]` })
      ]
    }
  );
}
function La({ id: e, data: n, selected: r }) {
  const a = fe(e), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = _e(), c = n.label || n.guardrailId || "Not configured";
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "🛡️",
      subtitle: c,
      state: s,
      category: xe("guardrail"),
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        "Action: ",
        n.action
      ] }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "pass", className: `${z("control")} !top-[40%]` }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "block", className: `${z("control")} !top-[60%]` })
      ]
    }
  );
}
function Ba({ id: e, data: n, selected: r }) {
  const a = fe(e), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = _e(), c = n.label || n.action || "Not configured";
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "📜",
      subtitle: c,
      state: s,
      category: xe("policy"),
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        n.principal,
        " → ",
        n.resource
      ] }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "allow", className: `${z("control")} !top-[40%]` }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "deny", className: `${z("control")} !top-[60%]` })
      ]
    }
  );
}
function Ua({ id: e, data: n, selected: r }) {
  const a = fe(e), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = n.eventType === "CUSTOM" ? n.customEventName || "Custom" : n.eventType;
  return /* @__PURE__ */ t(
    ye,
    {
      icon: "📡",
      subtitle: d,
      state: s,
      category: xe("ag-ui-output"),
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        "Source: ",
        n.sourceField
      ] }),
      footer: /* @__PURE__ */ t("span", { className: "text-[10px] text-primary", children: "Terminal — streams to AG-UI frontend" }),
      selected: r,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") })
    }
  );
}
const ja = (e) => e.stopPropagation();
function za(e) {
  const { id: n, data: r, selected: a } = e, [i, s] = S(!1), d = fe(n), c = d?.status === "cancelled" ? "failed" : d?.status, p = (r._state && r._state !== "idle" ? r._state : void 0) ?? c ?? r._state ?? "idle", u = Me(), h = d?.images?.[0]?.imageId ?? d?.output?.imageId ?? r.imageId, g = h ? /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "aria-label": "View source image",
        className: I(
          "block w-full rounded border-none bg-transparent p-0 cursor-zoom-in",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
        ),
        onMouseDown: ja,
        onClick: (m) => {
          m.stopPropagation(), s(!0);
        },
        children: /* @__PURE__ */ t(
          "img",
          {
            src: u(h),
            alt: "Source image",
            className: I(
              "w-full h-20 object-cover rounded block",
              "border border-border-field bg-surface-hover"
            ),
            "data-testid": "image-source-thumb"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      vt,
      {
        images: [{ src: u(h), alt: "Source image" }],
        openIndex: i ? 0 : null,
        onClose: () => s(!1)
      }
    )
  ] }) : /* @__PURE__ */ t(
    "div",
    {
      className: I(
        "w-full h-20 rounded flex items-center justify-center",
        "border border-dashed border-border-field bg-surface-hover",
        "text-[11px] text-text-secondary"
      ),
      "data-testid": "image-source-placeholder",
      children: "No image configured"
    }
  ), x = h ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-secondary", children: [
    h.slice(0, 16),
    "…"
  ] }) : void 0;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "🖼",
      subtitle: "image-source",
      state: p,
      category: xe("image-source"),
      body: g,
      footer: x,
      selected: a,
      ariaLabel: `Image Source node, state: ${p}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(
          U,
          {
            type: "target",
            position: j.Left,
            id: "in",
            className: z("control")
          }
        ),
        /* @__PURE__ */ t(
          U,
          {
            type: "source",
            position: j.Right,
            id: "out",
            className: z("image")
          }
        )
      ]
    }
  );
}
const Vn = (e) => e.stopPropagation(), Kn = I(
  "h-[38px] w-[38px] shrink-0 overflow-hidden rounded border border-border bg-surface-inset",
  "p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
);
function Gt({
  images: e,
  max: n = 4,
  "data-testid": r = "node-thumb-strip"
}) {
  const a = Me(), [i, s] = S(null);
  if (e.length === 0) return null;
  const d = e.length > n, c = d ? e.slice(0, n - 1) : e, l = e.length - c.length, p = (u) => (f) => {
    f.stopPropagation(), s(u);
  };
  return /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ o("div", { "data-testid": r, className: "flex flex-row items-center gap-1", children: [
      c.map((u, f) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "data-testid": `${r}-thumb-${f}`,
          "aria-label": u.alt ?? `Result image ${f + 1} of ${e.length}`,
          className: Kn,
          onMouseDown: Vn,
          onClick: p(f),
          children: /* @__PURE__ */ t(
            "img",
            {
              src: a(u.imageId),
              alt: u.alt ?? "",
              loading: "lazy",
              className: "h-full w-full object-cover"
            }
          )
        },
        `${u.imageId}-${f}`
      )),
      d && /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          "data-testid": `${r}-overflow`,
          "aria-label": `Show all ${e.length} images`,
          className: I(
            Kn,
            "flex items-center justify-center font-mono text-[11px] font-medium text-text-secondary"
          ),
          onMouseDown: Vn,
          onClick: p(c.length),
          children: [
            "+",
            l
          ]
        }
      )
    ] }),
    /* @__PURE__ */ t(
      vt,
      {
        images: e.map((u) => ({
          src: a(u.imageId),
          alt: u.alt,
          caption: u.alt
        })),
        openIndex: i,
        onClose: () => s(null),
        onNavigate: s
      }
    )
  ] });
}
function Fa(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = i?.images ?? [], u = i?.output?.filename ?? null, f = l.length > 0 ? /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t(Gt, { images: l, "data-testid": "save-thumb-strip" }),
    u && /* @__PURE__ */ t(
      "div",
      {
        className: "mt-1 text-[10px] font-mono text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
        "data-testid": "save-filename-badge",
        title: u,
        children: u
      }
    )
  ] }) : /* @__PURE__ */ t(
    "div",
    {
      className: I(
        "w-full h-20 rounded flex items-center justify-center",
        "border border-dashed border-border-field bg-surface-hover",
        "text-[11px] text-text-secondary"
      ),
      "data-testid": "save-placeholder",
      children: "Awaiting input"
    }
  ), h = r.filenameTemplate ?? "crop-{{scatter.index}}.png", g = h.length > 28 ? `${h.slice(0, 25)}…` : h, x = /* @__PURE__ */ t(
    "span",
    {
      className: "font-mono text-[11px] text-text-secondary",
      "data-testid": "save-footer",
      title: h,
      children: g
    }
  ), m = "image:save", w = `Save node, template: ${h}, state: ${c}`;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "⬇",
      subtitle: m,
      state: c,
      category: xe("image:save"),
      body: f,
      footer: x,
      selected: a,
      ariaLabel: w,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(
          U,
          {
            type: "target",
            position: j.Left,
            id: "in",
            className: z("image")
          }
        ),
        /* @__PURE__ */ t(
          U,
          {
            type: "source",
            position: j.Right,
            id: "out",
            className: z("image")
          }
        ),
        /* @__PURE__ */ t(
          U,
          {
            type: "source",
            position: j.Right,
            id: "error",
            className: `${z("error")} !top-[75%]`
          }
        )
      ]
    }
  );
}
function qa(e) {
  return e ? e.length > 40 ? `${e.slice(0, 37)}…` : e : "Not configured";
}
function Wa(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = i?.output, p = Array.isArray(l?.items) ? l.items.length : null, u = /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary break-all", children: qa(r.itemsPath ?? "") }),
    p !== null && /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", children: [
      p,
      " item",
      p === 1 ? "" : "s",
      " resolved"
    ] })
  ] }), f = p, h = f !== null && c !== "idle" ? /* @__PURE__ */ o("span", { className: "inline-block text-[11px] font-semibold text-info-fg bg-info-bg border border-info rounded-full px-2 py-0.5", children: [
    "Dispatched ",
    f,
    " arm",
    f === 1 ? "" : "s"
  ] }) : void 0, g = r.itemAlias ? ` · alias: ${r.itemAlias}` : "", x = r.maxConcurrency ? ` · max ${r.maxConcurrency}` : "", m = `scatter${g}${x}`, w = `Scatter node, path: ${r.itemsPath ?? "not set"}, state: ${c}`;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "⑂",
      subtitle: m,
      state: c,
      category: xe("scatter"),
      body: u,
      footer: h,
      selected: a,
      ariaLabel: w,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("control") })
      ]
    }
  );
}
function Va(e) {
  const { id: n, data: r, selected: a } = e, i = Me(), s = fe(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.width != null && r.height != null ? `→ ${r.width}×${r.height}` : r.width != null ? `→ ${r.width}w` : r.height != null ? `→ ${r.height}h` : null, f = p ? /* @__PURE__ */ t(
    "img",
    {
      src: i(p.imageId),
      alt: "Resize output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "resize-output-thumb"
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "resize-placeholder",
      children: u ?? "No image yet"
    }
  ), h = u ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    u,
    r.fit ? ` · ${r.fit}` : ""
  ] }) : void 0;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "⥂",
      subtitle: "image:resize",
      state: l,
      category: xe("image:resize"),
      body: f,
      footer: h,
      selected: a,
      ariaLabel: `Resize node, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ka(e) {
  switch (e.op) {
    case "rotate":
      return `rotate ${e.degrees}°`;
    case "flip":
      return "flip ↕";
    case "flop":
      return "flop ↔";
  }
}
function Ha(e) {
  const { id: n, data: r, selected: a } = e, i = Me(), s = fe(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.operations ?? [], f = u.length > 0 ? u.map(Ka).join("  ›  ") : null, h = p ? /* @__PURE__ */ t(
    "img",
    {
      src: i(p.imageId),
      alt: "Transform output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "transform-geo-output-thumb"
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "transform-geo-placeholder",
      children: f ?? "No ops configured"
    }
  ), g = f ? /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-tertiary", children: f }) : void 0;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "↻",
      subtitle: "image:transform",
      state: l,
      category: xe("image:transform"),
      body: h,
      footer: g,
      selected: a,
      ariaLabel: `Transform node, ops: ${u.length}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ja(e) {
  const n = e.format?.toUpperCase() ?? "?", r = e.lossless ? "lossless" : e.quality != null ? `q${e.quality}` : "";
  return r ? `${n} ${r}` : n;
}
function Ga(e) {
  const { id: n, data: r, selected: a } = e, i = Me(), s = fe(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.format ? Ja(r) : null, f = p ? /* @__PURE__ */ t(
    "img",
    {
      src: i(p.imageId),
      alt: "Format convert output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "format-convert-output-thumb"
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "format-convert-placeholder",
      children: u ?? "No format set"
    }
  ), h = u ? /* @__PURE__ */ t("span", { className: "font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary", children: u }) : void 0;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "⇌",
      subtitle: "image:format-convert",
      state: l,
      category: xe("image:format-convert"),
      body: f,
      footer: h,
      selected: a,
      ariaLabel: `Format Convert node, format: ${r.format ?? "unset"}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ya(e) {
  const { id: n, data: r, selected: a } = e, i = Me(), s = fe(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.sigma != null ? `σ ${r.sigma}` : null, f = p ? /* @__PURE__ */ t(
    "img",
    {
      src: i(p.imageId),
      alt: "Sharpen output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "sharpen-output-thumb"
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "sharpen-placeholder",
      children: u ?? "Sharpen (default σ)"
    }
  ), h = u ? /* @__PURE__ */ t("span", { className: "font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary", children: u }) : void 0;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "◈",
      subtitle: "image:sharpen",
      state: l,
      category: xe("image:sharpen"),
      body: f,
      footer: h,
      selected: a,
      ariaLabel: `Sharpen node, sigma: ${r.sigma ?? "default"}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Xa(e) {
  const { id: n, data: r, selected: a } = e, i = Me(), s = fe(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.gravity ?? "southeast", f = r.opacity != null ? `${Math.round(r.opacity * 100)}%` : "100%", h = p ? /* @__PURE__ */ t(
    "img",
    {
      src: i(p.imageId),
      alt: "Watermark output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "watermark-output-thumb"
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "watermark-placeholder",
      children: r.overlayImageId ? `${u} · ${f}` : "No overlay image set"
    }
  ), g = r.overlayImageId ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    u,
    " · ",
    f
  ] }) : void 0;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "⊕",
      subtitle: "image:watermark",
      state: l,
      category: xe("image:watermark"),
      body: h,
      footer: g,
      selected: a,
      ariaLabel: `Watermark node, gravity: ${u}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Qa(e) {
  if (!e) return null;
  const n = e.x + e.width, r = e.y + e.height;
  return `[${e.x},${e.y} → ${n},${r}]`;
}
function Za(e) {
  const { id: n, data: r, selected: a } = e, i = Me(), s = fe(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = s?.output, f = Qa(p?.bbox ?? u?.bbox), h = p ? /* @__PURE__ */ t(
    "img",
    {
      src: i(p.imageId),
      alt: "Crop output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "crop-output-thumb"
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "crop-placeholder",
      children: "No crop yet"
    }
  ), g = f ? /* @__PURE__ */ t(
    "span",
    {
      className: "font-mono text-[11px] text-text-tertiary",
      "data-testid": "crop-bbox-coords",
      children: f
    }
  ) : void 0, x = `Crop node, source: ${r.sourceImagePath ?? "default"}, state: ${l}`;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "✂",
      subtitle: "image:crop",
      state: l,
      category: xe("image:crop"),
      body: h,
      footer: g,
      selected: a,
      ariaLabel: x,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("image") })
      ]
    }
  );
}
function ei(e) {
  const { id: n, data: r, selected: a } = e, i = Me(), s = fe(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ t("div", { className: "flex gap-1 w-full", children: /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
    /* @__PURE__ */ t(
      "img",
      {
        src: i(p.imageId),
        alt: "B/W output",
        className: "flex-1 h-16 object-cover rounded border border-border bg-surface-inset block",
        "data-testid": "adjust-bw-output-thumb"
      }
    ),
    /* @__PURE__ */ t("div", { className: "text-[9px] text-text-tertiary text-center mt-0.5", children: "output" })
  ] }) }) : /* @__PURE__ */ t(
    "div",
    {
      className: "w-full h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "adjust-bw-placeholder",
      children: "Awaiting input"
    }
  ), f = r.algorithm ?? "luminosity", h = r.contrast ?? 1, g = /* @__PURE__ */ o(
    "span",
    {
      className: "font-mono text-[11px] text-text-tertiary",
      "data-testid": "adjust-bw-footer",
      children: [
        f,
        " · contrast ",
        h
      ]
    }
  ), x = `Adjust B/W node, algorithm: ${f}, state: ${l}`;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "◐",
      subtitle: "image:adjust-bw",
      state: l,
      category: xe("image:adjust-bw"),
      body: u,
      footer: g,
      selected: a,
      ariaLabel: x,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !top-[75%]` })
      ]
    }
  );
}
function ti(e) {
  switch (e.kind) {
    case "brightness":
      return `brightness ${e.value}`;
    case "contrast":
      return `contrast ${e.value}`;
    case "saturation":
      return `sat ${e.value}`;
    case "hue":
      return `hue ${e.degrees}°`;
    case "blur":
      return `blur ${e.radiusPx}px`;
  }
}
function ni(e) {
  const { id: n, data: r, selected: a } = e, i = Me(), s = fe(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.layers ?? [], f = p ? /* @__PURE__ */ t(
    "img",
    {
      src: i(p.imageId),
      alt: "Adjust output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "adjust-layer-output-thumb"
    }
  ) : u.length > 0 ? /* @__PURE__ */ t(
    "div",
    {
      className: "w-full rounded border border-dashed border-border bg-surface-inset p-1.5 flex flex-wrap gap-1 min-h-8",
      "data-testid": "adjust-layer-chips",
      children: u.map((x, m) => /* @__PURE__ */ t(
        "span",
        {
          className: "text-[10px] font-mono bg-surface-hover border border-border text-text-secondary rounded px-1 py-0.5",
          children: ti(x)
        },
        m
      ))
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: "w-full rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary min-h-8",
      "data-testid": "adjust-layer-placeholder",
      children: "Awaiting input"
    }
  ), h = /* @__PURE__ */ o(
    "span",
    {
      className: "text-[11px] text-text-tertiary",
      "data-testid": "adjust-layer-footer",
      children: [
        u.length,
        " layer",
        u.length === 1 ? "" : "s"
      ]
    }
  ), g = `Adjust Layer node, ${u.length} layer${u.length === 1 ? "" : "s"}, state: ${l}`;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "𝍩",
      subtitle: "image:adjust-layer",
      state: l,
      category: xe("image:adjust-layer"),
      body: f,
      footer: h,
      selected: a,
      ariaLabel: g,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !top-[75%]` })
      ]
    }
  );
}
function ri(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = i?.output ?? void 0, p = l?.genWidth != null && l?.genHeight != null ? `${l.genWidth}×${l.genHeight}` : null, u = p ? /* @__PURE__ */ o(
    "div",
    {
      className: "w-full h-20 rounded border border-border bg-surface-inset flex flex-col items-center justify-center gap-0.5 text-text-secondary",
      "data-testid": "dimensions-output",
      children: [
        /* @__PURE__ */ t("span", { className: "font-mono text-[13px]", children: p }),
        l?.width != null && l?.height != null && /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
          "src ",
          l.width,
          "×",
          l.height
        ] })
      ]
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "dimensions-placeholder",
      children: "reads image size"
    }
  ), f = /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "maxEdge ",
    r.maxEdge ?? 1024
  ] });
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "📐",
      subtitle: "image:dimensions",
      state: c,
      category: xe("image:dimensions"),
      body: u,
      footer: f,
      selected: a,
      ariaLabel: `Dimensions node, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function oi(e) {
  const { id: n, data: r, selected: a } = e, i = Me(), s = fe(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = `≤ ${r.maxEdge ?? 1024}px → 4×`, f = p ? /* @__PURE__ */ t(
    "img",
    {
      src: i(p.imageId),
      alt: "Upscale output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "upscale-output-thumb"
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "upscale-placeholder",
      children: u
    }
  ), h = /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-tertiary", children: u });
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "⤢",
      subtitle: "image:upscale",
      state: l,
      category: xe("image:upscale"),
      body: f,
      footer: h,
      selected: a,
      ariaLabel: `Upscale node, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function ai(e) {
  return e === 0 ? "$0" : e < 1e-3 ? "<$0.001" : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function ii(e) {
  if (!e || e.trim().length === 0) return "Not configured";
  const r = e.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
const si = (e) => e.stopPropagation(), li = Io(function({ info: n }) {
  const [r, a] = S(!1), [i, s] = S(!1);
  if (n.failure) {
    const u = n.failure.reason === "refusal";
    return /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ t("output", { "aria-live": "polite", className: "sr-only", children: u ? "Content policy refusal" : `Failure: ${n.failure.reason}` }),
      /* @__PURE__ */ o("div", { className: "flex items-start gap-1", children: [
        /* @__PURE__ */ t("span", { className: "bg-transparent border-none p-0 text-[12px] text-danger-fg font-medium text-left", children: u ? "✕ Content policy refusal" : `✕ ${n.failure.reason}` }),
        n.onRetry && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: n.onRetry,
            className: "ml-2 bg-transparent border border-border-emphasis rounded px-1.5 py-0.5 text-[11px] cursor-pointer text-text-secondary",
            title: "Retry this step",
            children: "Retry ↺"
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "mt-1 font-mono text-[11px] leading-snug text-text-secondary", children: n.failure.error })
    ] });
  }
  const d = n.tokensIn != null || n.tokensOut != null, c = !n.streaming && !n.awaiting && n.response.length > 0, l = r ? n.response : n.response.length > 60 ? `${n.response.slice(0, 60)}…` : n.response, p = n.awaiting ? "Vision: waiting for first token" : n.streaming ? "Vision: streaming response" : c ? "Vision: completed" : "";
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t("output", { "aria-live": "polite", className: "sr-only", children: p }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => a((u) => !u),
        className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] text-text-secondary font-medium text-left",
        children: [
          r ? "▾" : "▸",
          " ",
          n.streaming ? "Streaming" : "Response",
          typeof n.costUsd == "number" && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", "data-testid": "vision-cost", title: "Cost based on model usage rate", children: [
            "· ",
            ai(n.costUsd)
          ] }),
          d && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: [
            "· ",
            n.tokensIn ?? 0,
            " → ",
            n.tokensOut ?? 0,
            " tokens"
          ] }),
          n.awaiting && /* @__PURE__ */ t("span", { className: "ml-1.5 text-[11px] text-info-fg", "data-testid": "vision-awaiting", children: "· waiting…" }),
          n.streaming && !n.awaiting && /* @__PURE__ */ t("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: "· streaming…" })
        ]
      }
    ),
    c && n.imageId && /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => window.dispatchEvent(new CustomEvent("pipeline:open-run-modal")),
        className: "mt-1 block bg-transparent border-none p-0 cursor-pointer text-[11px] text-primary underline font-inherit",
        children: "Run with new image →"
      }
    ),
    n.imageId && /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "aria-label": "View vision input image",
          className: I(
            "mt-1.5 block h-14 w-14 overflow-hidden rounded border border-border bg-surface-inset",
            "p-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
          ),
          onMouseDown: si,
          onClick: (u) => {
            u.stopPropagation(), s(!0);
          },
          children: /* @__PURE__ */ t(
            "img",
            {
              src: n.getImageUrl(n.imageId),
              alt: "Vision input",
              className: "h-full w-full object-cover",
              "data-testid": "vision-input-thumb"
            }
          )
        }
      ),
      /* @__PURE__ */ t(
        vt,
        {
          images: [{ src: n.getImageUrl(n.imageId), alt: "Vision input", caption: "Vision input" }],
          openIndex: i ? 0 : null,
          onClose: () => s(!1)
        }
      )
    ] }),
    /* @__PURE__ */ t(
      "div",
      {
        className: I(
          "mt-1 overflow-hidden font-mono text-[11px] leading-snug text-text-primary whitespace-pre-wrap break-words",
          r ? "max-h-none" : "max-h-[1.4em]"
        ),
        children: l
      }
    )
  ] });
});
function ci(e) {
  const { id: n, data: r, selected: a } = e, i = Me(), s = fe(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = _e(), u = l === "failed" ? () => p(n) : void 0, f = /* @__PURE__ */ t("span", { className: "italic text-text-secondary text-[13px]", children: ii(r.userPrompt) }), h = s?.vision, g = l === "running" && h !== void 0 && h.tokensSeen > 0 && !h.analyzed, x = l === "running" && h !== void 0 && h.tokensSeen === 0 && !h.failure, m = h ? {
    response: h.response,
    tokensIn: h.tokensIn,
    tokensOut: h.tokensOut,
    streaming: g,
    awaiting: x,
    ...h.failure ? { failure: h.failure } : {},
    ...h.imageId ? { imageId: h.imageId } : {},
    ...typeof h.costUsd == "number" ? { costUsd: h.costUsd } : {},
    ...u ? { onRetry: u } : {},
    getImageUrl: i
  } : void 0, w = m ? /* @__PURE__ */ t(li, { info: m }) : void 0, v = r.model || "claude-sonnet-4-6", b = r.outputSchema ? "extract" : "caption", N = `Vision node, model ${v}, mode ${b}, state: ${l}`;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "📷",
      subtitle: `${v} · ${b}`,
      state: l,
      category: xe("image:vision-analyze"),
      body: f,
      footer: w,
      selected: a,
      onRetry: u,
      ariaLabel: N,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("data") })
      ]
    }
  );
}
function di(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = i?.output, p = l?.extracted?.label, u = l?.extracted?.confidence, f = (r.labels ?? []).slice(0, 4).join(", "), h = p ? /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 py-0.5", children: [
    /* @__PURE__ */ t(
      "span",
      {
        className: "text-[12px] font-semibold text-text-primary bg-surface-inset border border-border rounded px-2 py-0.5",
        "data-testid": "classify-label",
        children: p
      }
    ),
    u != null && /* @__PURE__ */ o(
      "span",
      {
        className: "text-[11px] font-mono text-text-tertiary",
        "data-testid": "classify-confidence",
        children: [
          (u * 100).toFixed(0),
          "%"
        ]
      }
    )
  ] }) : /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary italic", children: f ? `Labels: ${f}` : "No labels configured" }), g = r.model ?? "claude-haiku-4-5";
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "🏷",
      subtitle: g,
      state: c,
      category: xe("image:vision-classify"),
      body: h,
      selected: a,
      ariaLabel: `Vision Classify node, model: ${g}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function pi(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", p = i?.output?.extracted?.caption, u = p ? p.length > 80 ? `${p.slice(0, 77)}…` : p : null, f = r.userPrompt ? r.userPrompt.length > 60 ? `${r.userPrompt.slice(0, 57)}…` : r.userPrompt : "No prompt set", h = u ? /* @__PURE__ */ t(
    "span",
    {
      className: "text-[11px] text-text-primary leading-snug",
      "data-testid": "describe-caption",
      children: u
    }
  ) : /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary italic", children: f }), g = r.model ?? "claude-haiku-4-5";
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "💬",
      subtitle: g,
      state: c,
      category: xe("image:vision-describe"),
      body: h,
      selected: a,
      ariaLabel: `Vision Describe node, model: ${g}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function ui(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", u = (i?.output?.extracted?.tags ?? []).slice(0, 5), f = (r.candidateTags ?? []).slice(0, 3).join(", "), h = u.length > 0 ? /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", "data-testid": "tag-pills", children: u.map((x) => /* @__PURE__ */ t(
    "span",
    {
      className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded-full px-1.5 py-0.5 text-text-secondary whitespace-nowrap",
      children: x
    },
    x
  )) }) : /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary italic", children: f ? `Candidates: ${f}…` : "Open-vocabulary tagging" }), g = r.model ?? "claude-haiku-4-5";
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "🔖",
      subtitle: g,
      state: c,
      category: xe("image:vision-tag"),
      body: h,
      selected: a,
      ariaLabel: `Vision Tag node, model: ${g}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function mi(e) {
  const { id: n, data: r, selected: a } = e, i = fe(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", p = i?.output?.extracted?.lines ?? [], u = p[0], f = p.length > 0 ? /* @__PURE__ */ o("div", { "data-testid": "extract-text-result", children: [
    /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary mb-0.5", children: [
      p.length,
      " line",
      p.length !== 1 ? "s" : ""
    ] }),
    /* @__PURE__ */ t(
      "div",
      {
        className: "font-mono text-[11px] text-text-primary whitespace-nowrap overflow-hidden text-ellipsis",
        "data-testid": "extract-text-first-line",
        children: u
      }
    )
  ] }) : /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary italic", children: "Awaiting OCR" }), h = r.model ?? "claude-sonnet-4-6";
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "📝",
      subtitle: h,
      state: c,
      category: xe("image:vision-extract-text"),
      body: f,
      selected: a,
      ariaLabel: `Vision Extract Text node, model: ${h}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function hi(e) {
  return !e || !e.trim() ? "No prompt set" : e.length > 80 ? `${e.slice(0, 77)}…` : e;
}
const fi = (e) => e.stopPropagation();
function gi(e) {
  const { id: n, data: r, selected: a } = e, i = Me(), [s, d] = S(!1), c = fe(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", f = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && f.length === 0, x = (r.numImages ?? 1) > 1 || f.length > 1;
  let m;
  if (f.length > 0 && x)
    m = /* @__PURE__ */ t(Gt, { images: f, "data-testid": "generate-thumb-strip" });
  else if (g || f.length === 1) {
    const N = f[0] ? i(f[0].imageId) : void 0;
    m = /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "data-testid": "generate-output-preview",
          "aria-label": N ? "View generated image" : "Image synthesizing",
          className: I(
            "block w-full rounded-md border-none bg-transparent p-0",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-info",
            N ? "cursor-zoom-in" : "cursor-default"
          ),
          onMouseDown: fi,
          onClick: (y) => {
            y.stopPropagation(), N && d(!0);
          },
          children: /* @__PURE__ */ t(
            Cn,
            {
              status: g ? "synthesizing" : "done",
              ...N ? { src: N } : {},
              alt: "Generate output",
              ...g && Number.isFinite(h) ? { startedAt: h } : {},
              className: "w-full h-20"
            }
          )
        }
      ),
      N && /* @__PURE__ */ t(
        vt,
        {
          images: [{ src: N, alt: "Generate output" }],
          openIndex: s ? 0 : null,
          onClose: () => d(!1)
        }
      )
    ] });
  } else
    m = /* @__PURE__ */ t(
      "div",
      {
        className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
        "data-testid": "generate-placeholder",
        children: hi(r.prompt)
      }
    );
  const w = (r.numImages ?? 1) > 1 ? `×${r.numImages}` : null, v = r.width && r.height ? `${r.width}×${r.height}` : null, b = w || v ? /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-tertiary", children: [v, w].filter(Boolean).join(" · ") }) : void 0;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "✦",
      subtitle: "image:generate",
      state: u,
      category: xe("image:generate"),
      body: m,
      footer: b,
      selected: a,
      ariaLabel: `Generate node, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("data") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
const xi = (e) => e.stopPropagation();
function bi(e) {
  const { id: n, data: r, selected: a } = e, i = Me(), [s, d] = S(!1), c = fe(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", f = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && f.length === 0, x = r.numVariations ?? 1, m = x > 1 || f.length > 1, w = /* @__PURE__ */ o("span", { className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary mb-1", children: [
    "×",
    x,
    " variation",
    x !== 1 ? "s" : ""
  ] });
  let v;
  if (f.length > 0 && m)
    v = /* @__PURE__ */ t(Gt, { images: f, "data-testid": "variation-thumb-strip" });
  else if (g || f.length === 1) {
    const y = f[0] ? i(f[0].imageId) : void 0;
    v = /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "data-testid": "variation-output-preview",
          "aria-label": y ? "View variation image" : "Image synthesizing",
          className: I(
            "block w-full rounded-md border-none bg-transparent p-0",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-info",
            y ? "cursor-zoom-in" : "cursor-default"
          ),
          onMouseDown: xi,
          onClick: (k) => {
            k.stopPropagation(), y && d(!0);
          },
          children: /* @__PURE__ */ t(
            Cn,
            {
              status: g ? "synthesizing" : "done",
              ...y ? { src: y } : {},
              alt: "Variation output",
              ...g && Number.isFinite(h) ? { startedAt: h } : {},
              className: "w-full h-20"
            }
          )
        }
      ),
      y && /* @__PURE__ */ t(
        vt,
        {
          images: [{ src: y, alt: "Variation output" }],
          openIndex: s ? 0 : null,
          onClose: () => d(!1)
        }
      )
    ] });
  } else
    v = /* @__PURE__ */ t(
      "div",
      {
        className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
        "data-testid": "variation-placeholder",
        children: "Awaiting input"
      }
    );
  const b = /* @__PURE__ */ o("div", { children: [
    w,
    v
  ] }), N = r.similarity != null ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "similarity ",
    r.similarity
  ] }) : void 0;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "⊞",
      subtitle: "image:variation",
      state: u,
      category: xe("image:variation"),
      body: b,
      footer: N,
      selected: a,
      ariaLabel: `Variation node, ${x} variations, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function yi(e) {
  return !e || !e.trim() ? "No prompt set" : e.length > 80 ? `${e.slice(0, 77)}…` : e;
}
const vi = (e) => e.stopPropagation();
function wi(e) {
  const { id: n, data: r, selected: a } = e, i = Me(), [s, d] = S(!1), c = fe(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", f = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && f.length === 0, x = f.length > 1;
  let m;
  if (x)
    m = /* @__PURE__ */ t(Gt, { images: f, "data-testid": "edit-prompt-thumb-strip" });
  else if (g || f.length === 1) {
    const v = f[0] ? i(f[0].imageId) : void 0;
    m = /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "data-testid": "edit-prompt-output-preview",
          "aria-label": v ? "View edited image" : "Image synthesizing",
          className: I(
            "block w-full rounded-md border-none bg-transparent p-0",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-info",
            v ? "cursor-zoom-in" : "cursor-default"
          ),
          onMouseDown: vi,
          onClick: (b) => {
            b.stopPropagation(), v && d(!0);
          },
          children: /* @__PURE__ */ t(
            Cn,
            {
              status: g ? "synthesizing" : "done",
              ...v ? { src: v } : {},
              alt: "Edit output",
              ...g && Number.isFinite(h) ? { startedAt: h } : {},
              className: "w-full h-20"
            }
          )
        }
      ),
      v && /* @__PURE__ */ t(
        vt,
        {
          images: [{ src: v, alt: "Edit output" }],
          openIndex: s ? 0 : null,
          onClose: () => d(!1)
        }
      )
    ] });
  } else
    m = /* @__PURE__ */ t(
      "div",
      {
        className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
        "data-testid": "edit-prompt-placeholder",
        children: yi(r.prompt)
      }
    );
  const w = r.maskImagePath ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "mask: ",
    r.maskImagePath
  ] }) : void 0;
  return /* @__PURE__ */ o(
    ye,
    {
      icon: "✎",
      subtitle: "image:edit-prompt",
      state: u,
      category: xe("image:edit-prompt"),
      body: m,
      footer: w,
      selected: a,
      ariaLabel: `Edit Prompt node, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: z("image") }),
        /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "error", className: `${z("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
const Ni = {
  trigger: ga,
  llm: ya,
  transform: wa,
  condition: ka,
  action: Ia,
  fork: Sa,
  join: Aa,
  approval: Pa,
  agent: Da,
  "mcp-tool": Ma,
  "knowledge-base": Ea,
  "graph-query": Oa,
  memory: _a,
  guardrail: La,
  policy: Ba,
  "ag-ui-output": Ua,
  "image-source": za,
  "image:save": Fa,
  scatter: Wa,
  "image:resize": Va,
  "image:transform": Ha,
  "image:format-convert": Ga,
  "image:sharpen": Ya,
  "image:watermark": Xa,
  "image:crop": Za,
  "image:adjust-bw": ei,
  "image:adjust-layer": ni,
  "image:dimensions": ri,
  "image:upscale": oi,
  "image:vision-analyze": ci,
  "image:vision-classify": di,
  "image:vision-describe": pi,
  "image:vision-tag": ui,
  "image:vision-extract-text": mi,
  "image:generate": gi,
  "image:variation": bi,
  "image:edit-prompt": wi
}, ki = "#c4b5fd";
function Ci(e) {
  switch (e) {
    case "active":
      return {
        stroke: "var(--color-info)",
        strokeWidth: 2,
        strokeDasharray: "6 4",
        animate: !0
      };
    case "traversed-success":
      return { stroke: "var(--color-success)", strokeWidth: 2 };
    case "traversed-failure":
      return { stroke: "var(--color-danger)", strokeWidth: 2 };
    default:
      return { stroke: "var(--color-border-emphasis)", strokeWidth: 1.5 };
  }
}
function Ii({
  id: e,
  sourceX: n,
  sourceY: r,
  targetX: a,
  targetY: i,
  sourcePosition: s,
  targetPosition: d,
  data: c,
  markerEnd: l,
  selected: p
}) {
  const u = c ?? {}, f = An(), [h, g, x] = Ko({
    sourceX: n,
    sourceY: r,
    targetX: a,
    targetY: i,
    sourcePosition: s,
    targetPosition: d
  }), m = Ci(u.state), w = (u.state ?? "default") === "default", v = u.payload, b = m.animate && !f;
  let N = m.stroke, y = m.strokeWidth, k = b ? m.strokeDasharray : void 0;
  v === "image" ? (y = 2.5, w && (N = ki)) : v === "control" && (y = 1.5, w && (k = "2 4"));
  const C = u.volume, T = typeof C == "number" && C >= 2;
  T && (y = Math.min(4, y + Math.log2(C)));
  const M = p ? "var(--color-primary)" : N, P = p ? Math.max(2.5, y) : y, D = v === "image" && u.state === "active" && !f;
  return /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t(
      "path",
      {
        d: h,
        fill: "none",
        stroke: "transparent",
        strokeWidth: 12,
        className: "[pointer-events:stroke]"
      }
    ),
    /* @__PURE__ */ t(
      "path",
      {
        id: e,
        d: h,
        fill: "none",
        stroke: M,
        strokeWidth: P,
        strokeDasharray: k,
        markerEnd: l,
        className: "pointer-events-none",
        children: b ? /* @__PURE__ */ t(
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
    D ? /* @__PURE__ */ t("circle", { r: 3, fill: M, className: "pointer-events-none", children: /* @__PURE__ */ t("animateMotion", { dur: "1.2s", repeatCount: "indefinite", path: h }) }) : null,
    u.label ? /* @__PURE__ */ t(qn, { children: /* @__PURE__ */ t(
      "div",
      {
        className: I(
          "absolute pointer-events-auto px-2 py-0.5 rounded-full text-[10px] font-semibold leading-[1.4]",
          "bg-white text-text-secondary border border-border font-[inherit] whitespace-nowrap",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
        ),
        style: {
          // Pull the pill slightly downstream of the source handle so it
          // sits inside the edge route rather than on top of the node.
          transform: `translate(-50%, -50%) translate(${n + 28}px, ${r}px)`
        },
        children: u.label
      }
    ) }) : null,
    T ? /* @__PURE__ */ t(qn, { children: /* @__PURE__ */ t(
      "div",
      {
        className: I(
          "absolute pointer-events-none px-1.5 py-px rounded-full text-[9px] font-semibold leading-[1.4]",
          "bg-white text-text-secondary border border-border font-[inherit] whitespace-nowrap",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
        ),
        style: {
          // Midpoint of the smooth-step path, as reported by
          // getSmoothStepPath's labelX/labelY.
          transform: `translate(-50%, -50%) translate(${g}px, ${x}px)`
        },
        children: `×${C}`
      }
    ) }) : null
  ] });
}
function gt(e, n, r) {
  const a = ce(n);
  a.current = n, oe(() => {
    if (r === !1) return;
    const i = (s) => {
      e.current && !e.current.contains(s.target) && a.current();
    };
    return document.addEventListener("mousedown", i), () => document.removeEventListener("mousedown", i);
  }, [e, r]);
}
const Si = [
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
function Ti(e, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return e.type.toLowerCase().includes(r) || e.name.toLowerCase().includes(r) || e.description.toLowerCase().includes(r);
}
function $i({
  anchor: e,
  flowPosition: n,
  disabledTypes: r = [],
  onClose: a,
  onInsert: i
}) {
  const [s, d] = S(""), [c, l] = S(0), p = ce(null), u = ce(null), f = W(() => new Set(r), [r]), h = W(
    () => Si.filter((m) => !f.has(m.type) && Ti(m, s)),
    [f, s]
  );
  if (oe(() => {
    l((m) => m >= h.length ? 0 : m);
  }, [h.length]), oe(() => {
    if (e) {
      const m = setTimeout(() => u.current?.focus(), 0);
      return () => clearTimeout(m);
    }
  }, [e]), gt(p, a, !!e), !e) return null;
  const g = (m) => {
    const w = h[m];
    !w || !n || (i(w.type, n), a());
  }, x = (m) => {
    if (m.key === "ArrowDown") {
      if (m.preventDefault(), h.length === 0) return;
      l((w) => (w + 1) % h.length);
    } else if (m.key === "ArrowUp") {
      if (m.preventDefault(), h.length === 0) return;
      l((w) => (w - 1 + h.length) % h.length);
    } else m.key === "Enter" ? (m.preventDefault(), g(c)) : m.key === "Escape" && (m.preventDefault(), a());
  };
  return /* @__PURE__ */ o(
    "div",
    {
      ref: p,
      className: "fixed w-[260px] bg-white border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] z-50 flex flex-col overflow-hidden font-inherit",
      style: { top: e.y, left: e.x },
      role: "dialog",
      "aria-label": "Quick insert node",
      "data-testid": "quick-insert-popover",
      children: [
        /* @__PURE__ */ t("div", { className: "p-2 border-b border-border", children: /* @__PURE__ */ t(
          "input",
          {
            ref: u,
            type: "text",
            value: s,
            onChange: (m) => d(m.target.value),
            onKeyDown: x,
            placeholder: "Search nodes…",
            className: "w-full box-border border border-border-field rounded-md px-2.5 py-1.5 text-[13px] font-inherit bg-surface-inset text-text-primary outline-none",
            "aria-label": "Search node types",
            "data-testid": "quick-insert-search"
          }
        ) }),
        /* @__PURE__ */ t("div", { className: "max-h-[260px] overflow-y-auto py-1", role: "listbox", children: h.length === 0 ? /* @__PURE__ */ o("div", { className: "px-3 py-3.5 text-xs text-text-tertiary font-inherit", children: [
          'No nodes match "',
          s,
          '"'
        ] }) : h.map((m, w) => {
          const v = w === c;
          return /* @__PURE__ */ o(
            "div",
            {
              role: "option",
              "aria-selected": v,
              onMouseEnter: () => l(w),
              onMouseDown: (b) => {
                b.preventDefault(), g(w);
              },
              className: I(
                "flex items-center gap-2.5 px-3 py-2 cursor-pointer font-inherit",
                v ? "bg-surface-hover" : "bg-transparent"
              ),
              "data-node-type": m.type,
              "data-testid": `quick-insert-row-${m.type}`,
              children: [
                /* @__PURE__ */ t("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: m.icon }),
                /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: m.name }),
                  /* @__PURE__ */ t("div", { className: "text-[11px] text-text-secondary whitespace-nowrap overflow-hidden text-ellipsis", children: m.description })
                ] })
              ]
            },
            m.type
          );
        }) })
      ]
    }
  );
}
function Ai({
  addNode: e,
  addEdge: n,
  updateNodeData: r,
  getDefinition: a
}) {
  oe(() => {
  }, [e, n, r, a]);
}
function Ri({
  definition: e,
  selectedNodeId: n,
  setSelectedNodeId: r,
  removeNode: a,
  removeDefEdge: i,
  setNodes: s,
  setEdges: d,
  setPositions: c,
  duplicateNodes: l,
  clipboardRef: p,
  containerRef: u
}) {
  oe(() => {
    const f = u.current;
    if (!f) return;
    const h = (x) => {
      const m = f.querySelector(
        `.react-flow__node[data-id="${CSS.escape(x)}"]`
      );
      return m ? ((m.querySelector('[data-pipeline-node="true"]') ?? m).focus(), !0) : !1;
    }, g = (x) => {
      if (En(x.target)) return;
      const m = document.activeElement, w = !!m && f.contains(m);
      if (x.key === "Tab") {
        if (!w || !e || e.nodes.length === 0) return;
        const v = Xi(e);
        if (v.length === 0) return;
        const N = m?.closest(".react-flow__node")?.getAttribute("data-id") ?? null, y = N !== null ? v.indexOf(N) : -1, k = x.shiftKey ? -1 : 1, C = y === -1 ? x.shiftKey ? v.length - 1 : 0 : (y + k + v.length) % v.length, T = v[C];
        h(T) && x.preventDefault();
        return;
      }
      if (w && !x.altKey) {
        if (x.key === "Enter" || x.key === " " || x.key === "Spacebar") {
          const b = m?.closest(".react-flow__node")?.getAttribute("data-id");
          b && (x.preventDefault(), r(b));
          return;
        }
        if (x.key === "Delete" || x.key === "Backspace") {
          if (n) {
            x.preventDefault(), a(n);
            return;
          }
          d((v) => {
            const b = v.filter((N) => N.selected);
            if (b.length === 0) return v;
            for (const N of b) i(N.id);
            return v.filter((N) => !N.selected);
          }), x.preventDefault();
          return;
        }
        if (x.key === "Escape") {
          x.preventDefault(), r(null);
          return;
        }
        if ((x.metaKey || x.ctrlKey) && x.key === "c" && n) {
          x.preventDefault(), p.current = n;
          return;
        }
        if ((x.metaKey || x.ctrlKey) && x.key === "v" && p.current) {
          x.preventDefault();
          const v = l([p.current]);
          v.length > 0 && r(v[0]);
          return;
        }
        if ((x.metaKey || x.ctrlKey) && x.key === "d" && n) {
          x.preventDefault();
          const v = l([n]);
          v.length > 0 && r(v[0]);
          return;
        }
        if (x.key === "ArrowUp" || x.key === "ArrowDown" || x.key === "ArrowLeft" || x.key === "ArrowRight") {
          if (x.preventDefault(), x.stopPropagation(), !x.shiftKey || !n) return;
          const v = 8, b = x.key === "ArrowLeft" ? -v : x.key === "ArrowRight" ? v : 0, N = x.key === "ArrowUp" ? -v : x.key === "ArrowDown" ? v : 0;
          s((y) => {
            const k = y.map(
              (T) => T.id === n ? {
                ...T,
                position: {
                  x: T.position.x + b,
                  y: T.position.y + N
                }
              } : T
            ), C = k.find((T) => T.id === n);
            return C && c([{ id: C.id, position: C.position }]), k;
          });
        }
      }
    };
    return f.addEventListener("keydown", g), () => f.removeEventListener("keydown", g);
  }, [e, n, r, a, i, s, d, c, l, p, u]);
}
function Pi({
  addNode: e,
  screenToFlowPosition: n
}) {
  const r = E((i) => {
    i.preventDefault(), i.dataTransfer.dropEffect = "move";
  }, []), a = E(
    (i) => {
      i.preventDefault();
      const s = i.dataTransfer.getData("application/reactflow");
      if (!s) return;
      let d = null;
      try {
        d = JSON.parse(s);
      } catch {
        return;
      }
      const c = d?.nodeType;
      if (!c) return;
      const l = n({
        x: i.clientX,
        y: i.clientY
      });
      e(c, l);
    },
    [e, n]
  );
  return { handleDragOver: r, handleDrop: a };
}
function Di({
  nodeMenu: e,
  breakpoints: n,
  showBreakpointOption: r,
  onFilterLog: a,
  onCopyNodeId: i,
  onDuplicate: s,
  onToggleBreakpoint: d,
  onDismiss: c
}) {
  oe(() => {
    const p = (f) => {
      f.target?.closest('[data-testid="canvas-node-context-menu"]') || c();
    }, u = (f) => {
      f.key === "Escape" && c();
    };
    return document.addEventListener("mousedown", p), window.addEventListener("keydown", u), () => {
      document.removeEventListener("mousedown", p), window.removeEventListener("keydown", u);
    };
  }, [c]);
  const l = "block w-full text-left px-3 py-2 border-none bg-transparent text-[13px] cursor-pointer rounded font-inherit";
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": "canvas-node-context-menu",
      role: "menu",
      className: "fixed bg-white border border-border rounded-md shadow-[0_8px_20px_rgba(15,23,42,0.16)] min-w-[220px] z-50 p-1 font-inherit",
      style: { top: e.y, left: e.x },
      children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: a,
            "data-testid": "ctx-filter-log",
            className: I(l, "text-text-primary"),
            children: "🎯 Filter log to this node"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: i,
            "data-testid": "ctx-copy-id",
            className: I(l, "text-text-primary"),
            children: "📋 Copy node id"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: s,
            "data-testid": "ctx-duplicate",
            className: I(l, "text-text-primary"),
            children: "📑 Duplicate node"
          }
        ),
        r ? /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: d,
            "data-testid": "ctx-toggle-breakpoint",
            className: I(
              l,
              n?.has(e.nodeId) ? "text-danger-fg" : "text-text-primary"
            ),
            children: n?.has(e.nodeId) ? "🔴 Remove Breakpoint" : "🔴 Toggle Breakpoint"
          }
        ) : null
      ]
    }
  );
}
const Mi = [
  { type: "trigger", icon: "⚡", name: "Trigger", description: "Starts the pipeline" },
  { type: "image-source", icon: "🖼", name: "Image Source", description: "Inject an image into the pipeline context" },
  { type: "knowledge-base", icon: "📚", name: "Knowledge Base", description: "RAG retrieval from Bedrock KB" },
  { type: "graph-query", icon: "🕸️", name: "Graph Query", description: "Neptune openCypher query" },
  { type: "llm", icon: "🧠", name: "LLM", description: "Call an LLM model" },
  { type: "agent", icon: "🤖", name: "Agent", description: "Invoke a Strands agent via A2A" },
  { type: "mcp-tool", icon: "🔌", name: "MCP Tool", description: "Invoke an MCP Gateway tool" },
  { type: "image:vision-analyze", icon: "📷", name: "Vision Analyze", description: "Analyze an image with a multimodal LLM" },
  { type: "image:vision-classify", icon: "🏷", name: "Vision Classify", description: "Classify image into a label set" },
  { type: "image:vision-describe", icon: "💬", name: "Vision Describe", description: "Generate a natural-language caption of an image" },
  { type: "image:vision-tag", icon: "🔖", name: "Vision Tag", description: "Extract ranked tags from an image" },
  { type: "image:vision-extract-text", icon: "📝", name: "Vision Extract Text", description: "OCR / text extraction from an image" },
  { type: "image:generate", icon: "✦", name: "Generate", description: "Generate an image from a text prompt via Bedrock" },
  { type: "image:variation", icon: "⊞", name: "Variation", description: "Generate variations of a source image via Nova Canvas" },
  { type: "image:edit-prompt", icon: "✎", name: "Edit Prompt", description: "Inpaint or outpaint a region via Nova Canvas" },
  { type: "transform", icon: "🔧", name: "Transform", description: "Reshape the context" },
  { type: "memory", icon: "💾", name: "Memory", description: "AgentCore Memory read/write" },
  { type: "image:crop", icon: "✂", name: "Crop", description: "Crop a region from an image using a bbox" },
  { type: "image:resize", icon: "⤢", name: "Resize", description: "Resize an image to target dimensions" },
  { type: "image:transform", icon: "↻", name: "Transform Image", description: "Rotate, flip or flop an image" },
  { type: "image:format-convert", icon: "⇌", name: "Format Convert", description: "Convert image to JPEG, PNG, WebP or AVIF" },
  { type: "image:sharpen", icon: "◈", name: "Sharpen", description: "Apply unsharp-mask sharpening" },
  { type: "image:watermark", icon: "⊕", name: "Watermark", description: "Composite an overlay image onto the source" },
  { type: "image:adjust-bw", icon: "◐", name: "Adjust B/W", description: "Convert image to black and white" },
  { type: "image:adjust-layer", icon: "𝍩", name: "Adjust Layers", description: "Apply stacked colour/filter adjustments" },
  { type: "image:dimensions", icon: "📐", name: "Dimensions", description: "Read an image's size → feed generate" },
  { type: "image:upscale", icon: "⤢", name: "Upscale", description: "4× super-resolution (self-hosted)" },
  { type: "condition", icon: "🔀", name: "Condition", description: "Branch on an expression" },
  { type: "fork", icon: "🍴", name: "Fork", description: "Split into parallel branches" },
  { type: "join", icon: "🔗", name: "Join", description: "Combine parallel branches" },
  { type: "scatter", icon: "⑂", name: "Scatter", description: "Fan out over an array — one arm per item" },
  { type: "guardrail", icon: "🛡️", name: "Guardrail", description: "Bedrock Guardrails content filter" },
  { type: "policy", icon: "📜", name: "Policy", description: "Cedar authorization policy" },
  { type: "action", icon: "🎯", name: "Action", description: "Produce a side effect" },
  { type: "ag-ui-output", icon: "📡", name: "AG-UI Output", description: "Stream to AG-UI frontend" },
  { type: "image:save", icon: "⬇", name: "Save Image", description: "Write produced image to artifact store" },
  { type: "approval", icon: "✅", name: "Approval", description: "Wait for a human decision" }
], Ei = [
  { key: "source", name: "Sources" },
  { key: "transform", name: "Transform" },
  { key: "ai", name: "AI" },
  { key: "control", name: "Control" },
  { key: "sink", name: "Sinks" },
  { key: "human", name: "Human" }
], en = {
  source: "bg-cat-source",
  transform: "bg-cat-transform",
  ai: "bg-cat-ai",
  control: "bg-cat-control",
  sink: "bg-cat-sink",
  human: "bg-cat-human"
}, At = Ei.map(({ key: e, name: n }) => ({
  key: e,
  name: n,
  items: Mi.filter((r) => xe(r.type) === e).map((r) => ({ ...r, category: n, nodeCategory: e }))
})).filter((e) => e.items.length > 0), Oi = At.flatMap((e) => e.items.map((n) => ({ type: n.type, name: n.name }))), _i = At.map((e) => e.name), Mn = "pipeline.palette.recents", Li = 5, Hn = "pipeline.palette.compact";
function yn() {
  if (typeof window > "u") return [];
  try {
    const e = window.localStorage.getItem(Mn);
    if (!e) return [];
    const n = JSON.parse(e);
    return Array.isArray(n) ? n : [];
  } catch {
    return [];
  }
}
function Bi(e) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(Mn, JSON.stringify(e));
    } catch {
    }
}
function Gm(e) {
  const n = yn().filter((a) => a !== e), r = [e, ...n].slice(0, Li);
  Bi(r);
}
const Zr = "pipeline.palette.collapsed.";
function Ui(e) {
  if (typeof window > "u") return !1;
  try {
    return window.localStorage.getItem(Zr + e) === "true";
  } catch {
    return !1;
  }
}
function ji(e, n) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(Zr + e, String(n));
    } catch {
    }
}
function zi(e, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return e.name.toLowerCase().includes(r) || e.type.toLowerCase().includes(r) || e.description.toLowerCase().includes(r);
}
function Jn({ expanded: e }) {
  return /* @__PURE__ */ t(
    "svg",
    {
      width: "12",
      height: "12",
      viewBox: "0 0 12 12",
      fill: "none",
      "aria-hidden": "true",
      className: I("shrink-0 transition-transform duration-150", e ? "rotate-90" : "rotate-0"),
      children: /* @__PURE__ */ t(
        "path",
        {
          d: "M4 2.5l3.5 3.5L4 9.5",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
}
function Fi({ disabledTypes: e = [] }) {
  const [n, r] = S(""), [a, i] = S(/* @__PURE__ */ new Set()), [s, d] = S(null), [c, l] = S(() => yn()), [p, u] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem(Hn) === "true";
    } catch {
      return !1;
    }
  }), [f, h] = S(() => {
    const A = {};
    for (const J of At)
      A[J.name] = Ui(J.name);
    return A;
  }), g = W(() => new Set(e), [e]);
  oe(() => {
    const A = (J) => {
      J.key === Mn && l(yn());
    };
    return window.addEventListener("storage", A), () => window.removeEventListener("storage", A);
  }, []), oe(() => {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(Hn, String(p));
      } catch {
      }
  }, [p]);
  const x = E((A) => {
    i((J) => {
      const Q = new Set(J);
      return Q.has(A) ? Q.delete(A) : Q.add(A), Q;
    });
  }, []), m = E(() => {
    r(""), i(/* @__PURE__ */ new Set());
  }, []), w = E((A) => {
    h((J) => {
      const Q = { ...J, [A]: !J[A] };
      return ji(A, Q[A]), Q;
    });
  }, []), v = W(() => {
    const A = /* @__PURE__ */ new Map();
    for (const J of At)
      for (const Q of J.items) A.set(Q.type, Q);
    return A;
  }, []), b = W(
    () => c.map((A) => v.get(A)).filter(Boolean),
    [c, v]
  ), N = W(() => At.map((A) => {
    const J = a.size > 0 && !a.has(A.name) ? [] : A.items.filter((Q) => zi(Q, n));
    return { ...A, items: J };
  }).filter((A) => A.items.length > 0), [n, a]), y = W(() => {
    const A = /* @__PURE__ */ new Set(), J = [];
    if (!n && a.size === 0)
      for (const Q of b)
        J.push(Q), A.add(Q.type);
    for (const Q of N)
      for (const G of Q.items)
        A.has(G.type) || (J.push(G), A.add(G.type));
    return J;
  }, [b, N, n, a]), k = ce(y);
  oe(() => {
    k.current = y;
  }, [y]);
  const C = N.length === 0 && (n !== "" || a.size > 0), T = (A) => (J) => {
    if (g.has(A.type)) {
      J.preventDefault();
      return;
    }
    J.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: A.type })
    ), J.dataTransfer.effectAllowed = "move";
  }, M = jr(), P = (A, J) => {
    const Q = g.has(A.type), G = !M(A.type), Z = s === A.type && !Q, O = J !== null && J < 9 ? J + 1 : null;
    return p ? /* @__PURE__ */ o(
      "div",
      {
        draggable: !Q,
        onDragStart: T(A),
        onMouseEnter: () => d(A.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-8 box-border my-px mx-2 px-2 flex items-center gap-2 rounded font-[inherit]",
          Q ? "cursor-not-allowed opacity-45" : "cursor-grab",
          Z ? "bg-surface-hover" : "bg-transparent"
        ),
        title: Q ? `${A.name} is already placed` : G ? `${A.name} — preview: this deployment has no executor for it yet, so the step will not run.` : O ? `${A.description} — press ${O}` : A.description,
        "data-preview": G || void 0,
        "data-node-type": A.type,
        "data-disabled": Q || void 0,
        "data-testid": `palette-item-${A.type}`,
        children: [
          /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": !0,
              "data-testid": `palette-accent-${A.type}`,
              className: I("w-1.5 h-1.5 rounded-full shrink-0", A.nodeCategory && en[A.nodeCategory])
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-base leading-none w-5 text-center shrink-0", "aria-hidden": !0, children: A.icon }),
          /* @__PURE__ */ t("span", { className: I("text-[12px] font-medium text-text-primary truncate", Q && "line-through"), children: A.name }),
          O !== null && /* @__PURE__ */ t(
            "kbd",
            {
              "data-testid": `palette-shortcut-${A.type}`,
              className: I(
                "ml-auto text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                Q && "opacity-50"
              ),
              children: O
            }
          )
        ]
      },
      A.type
    ) : /* @__PURE__ */ o(
      "div",
      {
        draggable: !Q,
        onDragStart: T(A),
        onMouseEnter: () => d(A.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-11 box-border my-0.5 mx-2 py-1.5 px-2.5 flex items-center gap-2.5 rounded-md border border-transparent font-[inherit]",
          Q ? "cursor-not-allowed opacity-45" : "cursor-grab",
          Z ? "bg-surface-panel" : "bg-transparent"
        ),
        title: Q ? `${A.name} is already placed` : G ? `${A.name} — preview: this deployment has no executor for it yet, so the step will not run.` : O ? `${A.description} — press ${O}` : A.description,
        "data-preview": G || void 0,
        "data-node-type": A.type,
        "data-disabled": Q || void 0,
        "data-testid": `palette-item-${A.type}`,
        children: [
          /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": !0,
              "data-testid": `palette-accent-${A.type}`,
              className: I("w-1.5 h-1.5 rounded-full shrink-0", A.nodeCategory && en[A.nodeCategory])
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: A.icon }),
          /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ o("div", { className: I("text-[13px] font-semibold text-text-primary flex items-center gap-1.5", Q && "line-through"), children: [
              /* @__PURE__ */ t("span", { className: "truncate", children: A.name }),
              G && /* @__PURE__ */ t(
                "span",
                {
                  "data-testid": `palette-preview-${A.type}`,
                  className: "shrink-0 rounded-full border border-warning-border bg-warning-bg px-1.5 text-[9px] font-semibold uppercase tracking-wide text-warning-fg",
                  title: "No executor handler in this deployment",
                  children: "preview"
                }
              ),
              O !== null && /* @__PURE__ */ t(
                "kbd",
                {
                  "data-testid": `palette-shortcut-${A.type}`,
                  className: I(
                    "text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                    Q && "opacity-50"
                  ),
                  children: O
                }
              )
            ] }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-neutral truncate", children: Q ? "Placed" : G ? "Preview — no executor" : A.description })
          ] })
        ]
      },
      A.type
    );
  }, D = b.length > 0 && !n && a.size === 0;
  let re = 0;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "w-[220px] shrink-0 h-full border-r border-border bg-white flex flex-col",
      "data-testid": "node-palette",
      children: [
        /* @__PURE__ */ o("div", { className: "shrink-0 border-b border-border", children: [
          /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 py-2.5 px-3", children: [
            /* @__PURE__ */ t(
              "input",
              {
                type: "text",
                value: n,
                onChange: (A) => r(A.target.value),
                placeholder: "Search nodes...",
                "aria-label": "Search nodes",
                "data-testid": "palette-search",
                className: "flex-1 min-w-0 border border-border-emphasis rounded-md py-1.5 px-2.5 text-[13px] font-[inherit] bg-surface-panel text-text-primary outline-none focus:border-info focus:ring-1 focus:ring-info placeholder:text-text-tertiary"
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => u((A) => !A),
                title: p ? "Switch to card view" : "Switch to compact view",
                "data-testid": "palette-compact-toggle",
                "aria-pressed": p,
                className: I(
                  "shrink-0 w-7 h-7 flex items-center justify-center rounded border text-[11px] transition-colors",
                  p ? "bg-info border-info text-white" : "bg-white border-border-emphasis text-neutral hover:bg-surface-panel"
                ),
                children: p ? /* @__PURE__ */ o("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", "aria-hidden": "true", children: [
                  /* @__PURE__ */ t("rect", { x: "1", y: "2", width: "12", height: "2", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ t("rect", { x: "1", y: "6", width: "12", height: "2", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ t("rect", { x: "1", y: "10", width: "12", height: "2", rx: "1", fill: "currentColor" })
                ] }) : /* @__PURE__ */ o("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", "aria-hidden": "true", children: [
                  /* @__PURE__ */ t("rect", { x: "1", y: "1", width: "5", height: "5", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ t("rect", { x: "8", y: "1", width: "5", height: "5", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ t("rect", { x: "1", y: "8", width: "5", height: "5", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ t("rect", { x: "8", y: "8", width: "5", height: "5", rx: "1", fill: "currentColor" })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ t(
            "div",
            {
              className: "flex flex-wrap gap-1 px-3 pb-2.5",
              "data-testid": "palette-category-chips",
              children: _i.map((A) => /* @__PURE__ */ t(
                Xo,
                {
                  size: "xs",
                  active: a.has(A),
                  onClick: () => x(A),
                  "data-testid": `palette-chip-${A}`,
                  children: A
                },
                A
              ))
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto py-1", "data-testid": "palette-scroll", children: [
          D && /* @__PURE__ */ o("div", { "data-testid": "palette-recents", children: [
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: () => w("__recents__"),
                className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
                "aria-expanded": !f.__recents__,
                children: [
                  /* @__PURE__ */ t(Jn, { expanded: !f.__recents__ }),
                  "Recently used"
                ]
              }
            ),
            !f.__recents__ && /* @__PURE__ */ t("div", { children: b.map((A) => {
              const J = re++;
              return P(A, J);
            }) })
          ] }),
          C ? /* @__PURE__ */ o(
            "div",
            {
              className: "flex flex-col items-center gap-3 px-4 py-8 text-center",
              "data-testid": "palette-empty",
              children: [
                /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary", children: "No nodes match" }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: m,
                    "data-testid": "palette-clear-filters",
                    className: "text-[11px] font-semibold text-info-fg hover:underline",
                    children: "Clear filters"
                  }
                )
              ]
            }
          ) : N.map((A) => {
            const J = !!f[A.name];
            return /* @__PURE__ */ o("div", { "data-testid": `palette-category-${A.name}`, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => w(A.name),
                  className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
                  "aria-expanded": !J,
                  children: [
                    /* @__PURE__ */ t(Jn, { expanded: !J }),
                    /* @__PURE__ */ t(
                      "span",
                      {
                        "aria-hidden": !0,
                        "data-testid": `palette-section-accent-${A.key}`,
                        className: I("w-1.5 h-1.5 rounded-full shrink-0", en[A.key])
                      }
                    ),
                    A.name
                  ]
                }
              ),
              !J && /* @__PURE__ */ t("div", { children: A.items.map((Q) => {
                const G = re++;
                return P(Q, G);
              }) })
            ] }, A.name);
          })
        ] }),
        /* @__PURE__ */ t("div", { className: "py-2 px-3 border-t border-border text-[10px] text-text-tertiary font-[inherit] shrink-0", children: "Press 1–9 to insert at center" })
      ]
    }
  );
}
function qi({
  definition: e,
  addNode: n,
  screenToFlowPosition: r,
  containerRef: a
}) {
  return oe(() => {
    const i = (s) => {
      if (!En(s.target) && !(s.metaKey || s.ctrlKey || s.altKey) && /^[1-8]$/.test(s.key)) {
        const d = Number(s.key) - 1, c = Oi[d];
        if (!c || c.type === "trigger" && e?.nodes.some((g) => g.type === "trigger"))
          return;
        const p = a.current?.getBoundingClientRect(), u = p ? r({
          x: p.left + p.width / 2,
          y: p.top + p.height / 2
        }) : { x: 0, y: 0 };
        let { x: f, y: h } = u;
        if (e)
          for (const g of e.nodes)
            Math.abs(g.position.x - f) < 16 && Math.abs(g.position.y - h) < 16 && (f += 24, h += 24);
        n(c.type, { x: f, y: h }), s.preventDefault();
      }
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [n, e, r, a]), null;
}
const Wi = 280, Vi = 120, Ki = 40, Hi = 40;
function Ji(e, n) {
  const r = Wi, a = Vi, i = Ki, s = Hi;
  if (e.nodes.length === 0) return [];
  const d = /* @__PURE__ */ new Map();
  for (const w of e.nodes)
    d.set(w.id, []);
  for (const w of e.edges) {
    const v = d.get(w.source);
    v && d.has(w.target) && v.push(w.target);
  }
  const l = e.nodes.filter((w) => w.type === "trigger").map((w) => w.id).sort()[0], p = /* @__PURE__ */ new Map();
  if (l !== void 0) {
    const w = [l];
    for (p.set(l, 0); w.length > 0; ) {
      const v = w.shift(), b = p.get(v), N = d.get(v) ?? [];
      for (const y of N)
        p.has(y) || (p.set(y, b + 1), w.push(y));
    }
  }
  const u = /* @__PURE__ */ new Map();
  let f = -1;
  for (const w of e.nodes) {
    const v = p.get(w.id);
    v !== void 0 && (u.has(v) || u.set(v, []), u.get(v).push(w.id), v > f && (f = v));
  }
  for (const w of u.values())
    w.sort();
  const h = e.nodes.filter((w) => !p.has(w.id)).map((w) => w.id).sort(), g = f >= 0 ? f + 1 : 0;
  h.length > 0 && u.set(g, h);
  const x = [], m = [...u.keys()].sort((w, v) => w - v);
  for (const w of m) {
    const v = u.get(w), b = v.length, N = i + w * r;
    for (let y = 0; y < b; y++) {
      const k = s + (y - b / 2) * a;
      x.push({ id: v[y], position: { x: N, y: k } });
    }
  }
  return x;
}
function Gi({
  definition: e,
  setPositions: n,
  fitView: r
}) {
  const a = E(() => {
    r({ padding: 0.15, duration: 500 });
  }, [r]), i = E(() => {
    if (!e) return;
    const s = Ji(e);
    s.length !== 0 && (n(s), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => r({ padding: 0.15, duration: 500 })) : r({ padding: 0.15, duration: 500 }));
  }, [e, n, r]);
  return { handleFitView: a, handleAutoArrange: i };
}
function Yi({
  definition: e,
  setPositions: n,
  fitView: r
}) {
  const { handleFitView: a, handleAutoArrange: i } = Gi({
    definition: e,
    setPositions: n,
    fitView: r
  });
  return oe(() => {
    const s = (d) => {
      const c = d.target;
      if (!(c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable)) && d.shiftKey && (d.key === "A" || d.key === "a")) {
        if (d.metaKey || d.ctrlKey || d.altKey) return;
        d.preventDefault(), i();
      }
    };
    return window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s);
  }, [i]), /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: i,
        className: "absolute top-3 right-[50px] z-[5] w-8 h-8 inline-flex items-center justify-center bg-white border border-border rounded-md shadow-sm text-text-secondary cursor-pointer p-0 font-inherit text-sm leading-none",
        title: "Auto-arrange (Shift+A)",
        "aria-label": "Auto-arrange",
        "data-testid": "auto-arrange-btn",
        children: /* @__PURE__ */ t("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ t(
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
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: a,
        className: "absolute top-3 right-3 z-[5] w-8 h-8 inline-flex items-center justify-center bg-white border border-border rounded-md shadow-sm text-text-secondary cursor-pointer p-0 font-inherit text-sm leading-none",
        title: "Fit view",
        "aria-label": "Fit view",
        children: /* @__PURE__ */ t("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ t(
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
const eo = 0.1, Gn = { padding: 0.15, minZoom: eo, maxZoom: 1 };
function En(e) {
  if (!e || !(e instanceof HTMLElement)) return !1;
  const n = e.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || e.isContentEditable);
}
function Xi(e) {
  if (e.nodes.length === 0) return [];
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const s of e.nodes)
    n.set(s.id, []), r.set(s.id, 0);
  for (const s of e.edges)
    !n.has(s.source) || !r.has(s.target) || (n.get(s.source).push(s.target), r.set(s.target, (r.get(s.target) ?? 0) + 1));
  const a = [], i = e.nodes.filter((s) => (r.get(s.id) ?? 0) === 0).map((s) => s.id).sort();
  for (; i.length > 0; ) {
    const s = i.shift();
    a.push(s);
    const d = (n.get(s) ?? []).slice().sort();
    for (const c of d) {
      const l = (r.get(c) ?? 0) - 1;
      r.set(c, l), l === 0 && i.push(c);
    }
  }
  if (a.length < e.nodes.length) {
    const s = new Set(a), d = e.nodes.filter((c) => !s.has(c.id)).map((c) => c.id).sort();
    a.push(...d);
  }
  return a;
}
const Qi = { animated: Ii }, Zi = Ni;
function es(e) {
  return {
    id: e.id,
    type: e.type,
    position: e.position,
    data: { ...e.data, nodeType: e.type }
  };
}
function ts(e) {
  const n = e.sourceHandle === "true" || e.sourceHandle === "false" || e.sourceHandle === "approved" || e.sourceHandle === "rejected" || e.sourceHandle === "error" || /^branch-\d+$/.test(e.sourceHandle) ? e.sourceHandle : void 0;
  return {
    id: e.id,
    source: e.source,
    sourceHandle: e.sourceHandle,
    target: e.target,
    targetHandle: e.targetHandle,
    type: "animated",
    data: { state: "default", label: n }
  };
}
function ns({ onFilterLog: e, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: a, replayNodeClasses: i, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c }) {
  const {
    definition: l,
    addNode: p,
    setPositions: u,
    addEdge: f,
    removeEdge: h,
    removeNode: g,
    duplicateNodes: x,
    selectedNodeId: m,
    setSelectedNodeId: w,
    updateNodeData: v
  } = Ke(), { screenToFlowPosition: b, fitView: N } = Jo(), y = ce(!1), k = E((ee) => {
    ee && (y.current = !0);
  }, []);
  oe(() => {
    const ee = Z.current;
    if (!ee || typeof ResizeObserver > "u") return;
    let ie = { w: ee.clientWidth, h: ee.clientHeight };
    const ue = new ResizeObserver(() => {
      const be = ee.clientWidth, Re = ee.clientHeight;
      be === 0 || Re === 0 || Math.abs(be - ie.w) < 2 && Math.abs(Re - ie.h) < 2 || (ie = { w: be, h: Re }, !y.current && N(Gn));
    });
    return ue.observe(ee), () => ue.disconnect();
  }, [N]), Ai({
    addNode: p,
    addEdge: f,
    updateNodeData: v,
    getDefinition: () => l
  });
  const [C, T, M] = Hr([]), [P, D, re] = Jr([]), [A, J] = S(!0), [Q, G] = S(!0), Z = ce(null), O = ce(null), [R, Y] = S(null), [F, L] = S(null), V = E(
    (ee, ie) => {
      ee.preventDefault(), L({ nodeId: ie.id, x: ee.clientX, y: ee.clientY });
    },
    []
  ), K = E(() => {
    F && (e?.(F.nodeId), L(null));
  }, [F, e]), X = E(() => {
    if (!F) return;
    const ee = F.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(ee).catch(() => {
    }), L(null);
  }, [F]), me = E(() => {
    F && (d?.(F.nodeId), L(null));
  }, [F, d]), q = E(() => {
    if (!F) return;
    const ee = x([F.nodeId]);
    ee.length > 0 && w(ee[0]), L(null);
  }, [F, x, w]), de = E(() => L(null), []);
  oe(() => {
    if (!l) {
      T([]), D([]);
      return;
    }
    T((ee) => {
      const ie = new Map(ee.map((ue) => [ue.id, ue]));
      return l.nodes.map((ue) => {
        const be = ie.get(ue.id), Re = es(ue);
        return s && s.size > 0 && (Re.data._hasBreakpoint = s.has(ue.id)), c && (Re.data._pausedAtBreakpoint = ue.id === c), be ? { ...be, ...Re, selected: be.selected } : Re;
      });
    }), D(() => l.edges.map(ts));
  }, [l, s, c, T, D]), oe(() => {
    if (!n) {
      r?.(null);
      return;
    }
    T(
      (ee) => ee.map((ie) => ({
        ...ie,
        className: ie.id === n ? "node-error" : ie.className?.replace("node-error", "").trim() || void 0
      }))
    ), requestAnimationFrame(() => {
      const ee = Z.current;
      if (!ee) return;
      const ie = ee.querySelector(
        `.react-flow__node[data-id="${CSS.escape(n)}"]`
      );
      if (!ie) {
        r?.(null);
        return;
      }
      const ue = ie.getBoundingClientRect();
      r?.({ x: ue.right, y: ue.top + ue.height / 2 });
    });
  }, [n, T, r]), oe(() => {
    i && T(
      (ee) => ee.map((ie) => {
        const ue = i[ie.id] ?? "", Re = [ie.id === n ? "node-error" : "", ue].filter(Boolean).join(" ") || void 0;
        let je;
        ue === "node-replay-active" ? je = "running" : ue === "node-replay-completed" ? je = "completed" : ue === "node-replay-failed" && (je = "failed");
        const $ = { ...ie.data };
        return je ? $._state = je : $._state = "idle", { ...ie, className: Re, data: $ };
      })
    );
  }, [i, n, T]), oe(() => {
    a && D(
      (ee) => ee.map((ie) => {
        const ue = a[ie.id];
        if (!ue) return ie;
        const be = ie.data ?? {};
        return be.state === ue ? ie : { ...ie, data: { ...be, state: ue } };
      })
    );
  }, [a, D]);
  const Ie = E(
    (ee) => {
      M(ee);
      const ie = [], ue = [];
      for (const be of ee)
        be.type === "position" && be.position && be.dragging === !1 ? ie.push({ id: be.id, position: be.position }) : be.type === "remove" && ue.push(be.id);
      ie.length && u(ie);
      for (const be of ue) g(be);
    },
    [M, u, g]
  ), Fe = E(
    (ee) => {
      re(ee);
      for (const ie of ee)
        ie.type === "remove" && h(ie.id);
    },
    [re, h]
  ), Ze = E(
    (ee) => {
      if (!l || !ee.source || !ee.target) return;
      const ie = l.nodes.find((je) => je.id === ee.source), ue = l.nodes.find((je) => je.id === ee.target);
      if (!ie || !ue) return;
      const be = ee.sourceHandle ?? "out", Re = ee.targetHandle ?? "in";
      bn(
        ie.type,
        be,
        ue.type,
        Re
      ) && f({
        source: ee.source,
        sourceHandle: be,
        target: ee.target,
        targetHandle: Re
      });
    },
    [l, f]
  ), He = E(
    (ee) => {
      if (!l || !ee.source || !ee.target) return !1;
      const ie = l.nodes.find((be) => be.id === ee.source), ue = l.nodes.find((be) => be.id === ee.target);
      return !ie || !ue ? !1 : bn(
        ie.type,
        ee.sourceHandle ?? "out",
        ue.type,
        ee.targetHandle ?? "in"
      );
    },
    [l]
  ), Ue = E(
    (ee, ie) => {
      w(ie.id);
    },
    [w]
  ), Ge = E(() => {
    w(null);
  }, [w]), Je = E(
    (ee) => {
      const ie = ee.target;
      if (!ie || !(ie.classList.contains("react-flow__pane") || ie.classList.contains("react-flow__renderer") || ie.classList.contains("react-flow__viewport") || ie.classList.contains("react-flow"))) return;
      ee.preventDefault();
      const be = b({ x: ee.clientX, y: ee.clientY });
      Y({
        anchor: { x: ee.clientX, y: ee.clientY },
        flowPosition: be
      });
    },
    [b]
  ), Ye = E(() => Y(null), []), Ae = E(
    (ee, ie) => {
      p(ee, ie);
    },
    [p]
  ), ve = W(() => l ? l.nodes.some((ee) => ee.type === "trigger") ? ["trigger"] : [] : [], [l]), { handleDragOver: se, handleDrop: Ee } = Pi({
    addNode: p,
    screenToFlowPosition: b
  });
  oe(() => {
    const ee = (ie) => {
      if (!En(ie.target) && !(ie.metaKey || ie.ctrlKey || ie.altKey)) {
        if (ie.key === "m" || ie.key === "M") {
          J((ue) => !ue);
          return;
        }
        if (ie.key === "c" || ie.key === "C") {
          G((ue) => !ue);
          return;
        }
      }
    };
    return window.addEventListener("keydown", ee), () => window.removeEventListener("keydown", ee);
  }, []), Ri({
    definition: l,
    selectedNodeId: m,
    setSelectedNodeId: w,
    removeNode: g,
    removeDefEdge: h,
    setNodes: T,
    setEdges: D,
    setPositions: u,
    duplicateNodes: x,
    clipboardRef: O,
    containerRef: Z
  });
  const kt = E((ee) => {
    switch (ee.data?._state) {
      case "running":
      case "pending":
        return "var(--color-info)";
      case "completed":
        return "var(--color-success)";
      case "failed":
        return "var(--color-danger)";
      case "awaiting":
        return "var(--color-warning)";
      default:
        return "var(--color-text-tertiary)";
    }
  }, []);
  return /* @__PURE__ */ o(
    "div",
    {
      ref: Z,
      className: "flex-1 min-w-0 min-h-[520px] relative bg-surface-inset",
      role: "application",
      "aria-label": "Pipeline editor canvas",
      tabIndex: 0,
      "data-testid": "pipeline-canvas",
      onDragOver: se,
      onDrop: Ee,
      onDoubleClick: Je,
      children: [
        /* @__PURE__ */ o(
          Gr,
          {
            nodes: C,
            edges: P,
            nodeTypes: Zi,
            edgeTypes: Qi,
            onNodesChange: Ie,
            onEdgesChange: Fe,
            onConnect: Ze,
            isValidConnection: He,
            onNodeClick: Ue,
            onNodeContextMenu: V,
            onPaneClick: Ge,
            onMoveStart: k,
            fitView: !0,
            fitViewOptions: Gn,
            minZoom: eo,
            snapToGrid: !0,
            snapGrid: [16, 16],
            edgesFocusable: !0,
            defaultEdgeOptions: { type: "smoothstep" },
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ t(
                Yr,
                {
                  variant: Go.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              Q ? /* @__PURE__ */ t(
                Xr,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              A ? /* @__PURE__ */ t(
                Yo,
                {
                  position: "bottom-right",
                  pannable: !0,
                  zoomable: !0,
                  className: "!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]",
                  maskColor: "rgba(15, 23, 42, 0.04)",
                  nodeColor: kt,
                  nodeStrokeColor: "#e2e8f0"
                }
              ) : null
            ]
          }
        ),
        R ? /* @__PURE__ */ t(
          $i,
          {
            anchor: R.anchor,
            flowPosition: R.flowPosition,
            disabledTypes: ve,
            onClose: Ye,
            onInsert: Ae
          }
        ) : null,
        /* @__PURE__ */ t(
          qi,
          {
            definition: l,
            addNode: p,
            screenToFlowPosition: b,
            containerRef: Z
          }
        ),
        /* @__PURE__ */ t(
          Yi,
          {
            definition: l,
            setPositions: u,
            fitView: N
          }
        ),
        F ? /* @__PURE__ */ t(
          Di,
          {
            nodeMenu: F,
            breakpoints: s,
            showBreakpointOption: !!d,
            onFilterLog: K,
            onCopyNodeId: X,
            onDuplicate: q,
            onToggleBreakpoint: me,
            onDismiss: de
          }
        ) : null
      ]
    }
  );
}
function rs({ onFilterLog: e, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: a, replayNodeClasses: i, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c } = {}) {
  return /* @__PURE__ */ t(Ho, { children: /* @__PURE__ */ t(
    ns,
    {
      onFilterLog: e,
      errorNodeId: n,
      onErrorNodePosition: r,
      replayEdgeStates: a,
      replayNodeClasses: i,
      breakpoints: s,
      onToggleBreakpoint: d,
      pausedAtNodeId: c
    }
  ) });
}
const Yn = {
  LLMError: { bg: "var(--color-danger-bg)", fg: "var(--color-danger)" },
  TimeoutError: { bg: "var(--color-caution-bg)", fg: "var(--color-caution)" },
  NetworkError: { bg: "var(--color-warning-bg)", fg: "var(--color-warning)" },
  ValidationError: { bg: "#fefce8", fg: "var(--color-warning)" },
  RegistryConflict: { bg: "var(--color-accent-bg)", fg: "var(--color-accent)" },
  UnknownError: { bg: "var(--color-surface-hover)", fg: "var(--color-text-secondary)" }
};
function os(e) {
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
function as({ error: e, anchor: n, onDismiss: r, onRetry: a }) {
  const [i, s] = S(!1), [d, c] = S(!1), l = e.errorCategory ?? "UnknownError", p = Yn[l] ?? Yn.UnknownError, u = E(async () => {
    const x = [
      `Error Category: ${l}`,
      `Node ID: ${e.nodeId}`,
      `Message: ${e.message}`,
      e.stack ? `
Stack Trace:
${e.stack}` : ""
    ].filter(Boolean).join(`
`);
    try {
      typeof navigator < "u" && navigator.clipboard?.writeText && (await navigator.clipboard.writeText(x), c(!0), setTimeout(() => c(!1), 2e3));
    } catch {
    }
  }, [e, l]), f = E(() => {
    a?.();
  }, [a]), h = Math.min(n.y + 8, window.innerHeight - 440), g = Math.min(n.x + 12, window.innerWidth - 360);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "fixed z-[100] bg-white border border-border rounded-[10px] shadow-[0_12px_32px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.08)] p-0 w-[340px] max-h-[420px] overflow-y-auto font-inherit text-text-primary",
      style: { top: Math.max(8, h), left: Math.max(8, g) },
      "data-testid": "error-overlay",
      role: "dialog",
      "aria-label": `Error details for node ${e.nodeId}`,
      children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 px-3.5 pt-3 pb-2.5 border-b border-border", children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold leading-snug",
              style: { background: p.bg, color: p.fg },
              "data-testid": "error-category-badge",
              children: os(l)
            }
          ),
          /* @__PURE__ */ t("span", { className: "flex-1" }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: r,
              "aria-label": "Dismiss error overlay",
              className: "bg-transparent border-none text-text-tertiary cursor-pointer text-base leading-none px-1 py-0.5",
              children: "×"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "px-3.5 py-3 flex flex-col gap-2.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] leading-normal text-text-primary", children: e.message }),
          /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary", children: [
            "Failed node:",
            " ",
            /* @__PURE__ */ t("code", { className: "bg-surface-hover px-[5px] py-px rounded-[3px] font-mono text-[11px] text-text-secondary", children: e.nodeId })
          ] }),
          e.stack && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: () => s((x) => !x),
                className: "bg-transparent border-none p-0 cursor-pointer text-xs font-medium text-text-secondary font-inherit",
                "data-testid": "error-stack-toggle",
                children: [
                  i ? "▾" : "▸",
                  " Stack trace"
                ]
              }
            ),
            i && /* @__PURE__ */ t(
              "pre",
              {
                className: "mt-1.5 p-2.5 bg-surface-panel border border-border rounded-md text-[10px] leading-normal font-mono text-text-secondary whitespace-pre-wrap break-all max-h-40 overflow-y-auto m-0",
                "data-testid": "error-stack-content",
                children: e.stack
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex gap-2 px-3.5 pt-2.5 pb-3 border-t border-border", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: u,
              className: "px-3 py-1.5 text-xs font-semibold border-none rounded-md cursor-pointer font-inherit leading-snug bg-surface-hover text-text-secondary",
              "data-testid": "error-copy-btn",
              children: d ? "Copied!" : "Copy error details"
            }
          ),
          a && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: f,
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
function is(e, n) {
  const r = /* @__PURE__ */ new Map();
  for (const i of e)
    r.set(i.id, []);
  for (const i of n) {
    const s = r.get(i.source);
    s && s.push({ target: i.target, edgeId: i.id });
  }
  const a = /* @__PURE__ */ new Map();
  for (const i of e)
    a.set(i.id, 0);
  for (const i of e) {
    if (a.get(i.id) !== 0) continue;
    const s = [
      { nodeId: i.id, index: 0 }
    ];
    for (a.set(i.id, 1); s.length > 0; ) {
      const d = s[s.length - 1], c = r.get(d.nodeId) ?? [];
      if (d.index >= c.length) {
        a.set(d.nodeId, 2), s.pop();
        continue;
      }
      const l = c[d.index];
      d.index += 1;
      const p = a.get(l.target);
      if (p === 1)
        return l.edgeId;
      p === 0 && (a.set(l.target, 1), s.push({ nodeId: l.target, index: 0 }));
    }
  }
  return null;
}
function to(e) {
  const n = [], r = [], { nodes: a, edges: i } = e, s = /* @__PURE__ */ new Map();
  for (const d of a)
    s.set(d.id, d);
  return ss(a, n), ls(a, i, n), cs(i, s, n), ds(a, n), bs(a, i, n), ys(a, i, r), vs(a, i, r), ws(a, i, r), Ns(a, i, r), r.push(...ks(e)), r.push(...Cs(e)), r.push(...Is(e)), r.push(...Ss(e)), r.push(...Ts(e)), r.push(...$s(e)), r.push(...As(e)), r.push(...Rs(e)), r.push(...Ps(e)), r.push(...Ds(e)), {
    errors: n,
    warnings: r,
    isValid: n.length === 0,
    canPublish: n.length === 0
  };
}
function ss(e, n) {
  const r = e.filter((a) => a.type === "trigger");
  if (r.length === 0) {
    n.push({
      code: "NO_TRIGGER",
      severity: "error",
      message: "Pipeline must have exactly one Trigger node."
    });
    return;
  }
  if (r.length > 1)
    for (const a of r)
      n.push({
        code: "MULTIPLE_TRIGGERS",
        severity: "error",
        message: "Pipeline must have exactly one Trigger node.",
        nodeId: a.id
      });
}
function ls(e, n, r) {
  const a = is(e, n);
  a !== null && r.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: a
  });
}
function cs(e, n, r) {
  for (const a of e) {
    const i = n.get(a.source), s = n.get(a.target);
    if (!i || !s) {
      r.push({
        code: "INVALID_HANDLE",
        severity: "error",
        message: "Edge references a node that does not exist.",
        edgeId: a.id
      });
      continue;
    }
    bn(
      i.type,
      a.sourceHandle,
      s.type,
      a.targetHandle
    ) || r.push({
      code: "INVALID_HANDLE",
      severity: "error",
      message: `Invalid connection: ${i.type}.${a.sourceHandle} → ${s.type}.${a.targetHandle}.`,
      edgeId: a.id
    });
  }
}
function ds(e, n) {
  for (const r of e)
    switch (r.data.type) {
      case "llm":
        ps(r.id, r.data, n);
        break;
      case "transform":
        us(r.id, r.data, n);
        break;
      case "condition":
        ms(r.id, r.data, n);
        break;
      case "action":
        hs(r.id, r.data, n);
        break;
      case "fork":
        fs(r.id, r.data, n);
        break;
      case "join":
        gs(r.id, r.data, n);
        break;
      case "approval":
        xs(r.id, r.data, n);
        break;
    }
}
function ps(e, n, r) {
  n.provider || Xe(r, e, "provider"), (!n.model || !n.model.trim()) && Xe(r, e, "model"), (!n.systemPrompt || !n.systemPrompt.trim()) && Xe(r, e, "systemPrompt"), (!n.userPromptTemplate || !n.userPromptTemplate.trim()) && Xe(r, e, "userPromptTemplate");
}
function us(e, n, r) {
  n.transformType || Xe(r, e, "transformType"), (!n.expression || !n.expression.trim()) && Xe(r, e, "expression");
}
function ms(e, n, r) {
  (!n.expression || !n.expression.trim()) && Xe(r, e, "expression");
}
function hs(e, n, r) {
  n.actionType || Xe(r, e, "actionType");
}
function fs(e, n, r) {
  (typeof n.branchCount != "number" || n.branchCount < 2) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: e,
    field: "branchCount"
  });
}
function gs(e, n, r) {
  n.mode || Xe(r, e, "mode"), n.mergeStrategy || Xe(r, e, "mergeStrategy"), n.mode === "n_of_m" && (typeof n.n != "number" || n.n < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: e,
    field: "n"
  });
}
function xs(e, n, r) {
  (!n.approvers || n.approvers.length === 0) && r.push({
    code: "APPROVAL_NO_APPROVERS",
    severity: "error",
    message: "Approval node must have at least one approver.",
    nodeId: e,
    field: "approvers"
  }), (typeof n.requiredCount != "number" || n.requiredCount < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Approval requires requiredCount ≥ 1.",
    nodeId: e,
    field: "requiredCount"
  });
}
function bs(e, n, r) {
  const a = /* @__PURE__ */ new Map();
  for (const i of n)
    a.set(i.target, (a.get(i.target) ?? 0) + 1);
  for (const i of e) {
    if (i.type !== "join") continue;
    (a.get(i.id) ?? 0) < 2 && r.push({
      code: "JOIN_INSUFFICIENT_INPUTS",
      severity: "error",
      message: "Join node requires at least 2 incoming edges.",
      nodeId: i.id
    });
  }
}
function Xe(e, n, r) {
  e.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: `Missing required field '${r}'.`,
    nodeId: n,
    field: r
  });
}
function ys(e, n, r) {
  const a = e.filter((c) => c.type === "trigger");
  if (a.length !== 1) return;
  const i = /* @__PURE__ */ new Map();
  for (const c of e) i.set(c.id, []);
  for (const c of n)
    i.get(c.source)?.push(c.target);
  const s = /* @__PURE__ */ new Set(), d = [a[0].id];
  for (s.add(a[0].id); d.length > 0; ) {
    const c = d.shift();
    for (const l of i.get(c) ?? [])
      s.has(l) || (s.add(l), d.push(l));
  }
  for (const c of e)
    s.has(c.id) || r.push({
      code: "ORPHAN_NODE",
      severity: "warning",
      message: "Node is unreachable from the Trigger.",
      nodeId: c.id
    });
}
function vs(e, n, r) {
  const a = /* @__PURE__ */ new Set();
  for (const i of n) a.add(i.source);
  for (const i of e)
    a.has(i.id) || i.data.terminal !== !0 && r.push({
      code: "DEAD_END",
      severity: "warning",
      message: "Node has no outgoing edges.",
      nodeId: i.id
    });
}
function ws(e, n, r) {
  const a = /* @__PURE__ */ new Map();
  for (const i of n) {
    const s = a.get(i.source) ?? /* @__PURE__ */ new Set();
    s.add(i.sourceHandle), a.set(i.source, s);
  }
  for (const i of e) {
    if (i.data.type !== "fork") continue;
    const s = i.data.branchCount, d = a.get(i.id) ?? /* @__PURE__ */ new Set();
    for (let c = 0; c < s; c += 1) {
      const l = `branch-${c}`;
      d.has(l) || r.push({
        code: "UNUSED_FORK_BRANCH",
        severity: "warning",
        message: `Fork branch '${l}' has no connected edge.`,
        nodeId: i.id,
        field: l
      });
    }
  }
}
function Ns(e, n, r) {
  const a = /* @__PURE__ */ new Map();
  for (const i of n) {
    const s = a.get(i.source) ?? /* @__PURE__ */ new Set();
    s.add(i.sourceHandle), a.set(i.source, s);
  }
  for (const i of e) {
    if (i.type !== "condition") continue;
    const s = a.get(i.id) ?? /* @__PURE__ */ new Set();
    for (const d of ["true", "false"])
      s.has(d) || r.push({
        code: "UNUSED_CONDITION_BRANCH",
        severity: "warning",
        message: `Condition branch '${d}' has no connected edge.`,
        nodeId: i.id,
        field: d
      });
  }
}
function ot(e) {
  const n = e.data.label;
  if (typeof n == "string" && n.trim()) return n.trim();
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
function ks(e) {
  const n = [], r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const c of e.nodes)
    r.set(c.id, []), a.set(c.id, []);
  for (const c of e.edges)
    c.sourceHandle !== "error" && r.get(c.source)?.push(c.target), a.get(c.target)?.push(c.source);
  const i = /* @__PURE__ */ new Map();
  for (const c of e.nodes) i.set(c.id, c);
  function s(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [];
    for (const u of r.get(c) ?? [])
      l.has(u) || (l.add(u), p.push(u));
    for (; p.length > 0; ) {
      const u = p.shift();
      if (i.get(u)?.type === "join") return !0;
      for (const h of r.get(u) ?? [])
        l.has(h) || (l.add(h), p.push(h));
    }
    return !1;
  }
  function d(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [];
    for (const u of a.get(c) ?? [])
      l.has(u) || (l.add(u), p.push(u));
    for (; p.length > 0; ) {
      const u = p.shift();
      if (i.get(u)?.type === "fork") return !0;
      for (const h of a.get(u) ?? [])
        l.has(h) || (l.add(h), p.push(h));
    }
    return !1;
  }
  for (const c of e.nodes)
    c.data.type !== "llm" && c.data.type !== "action" || e.edges.some(
      (p) => p.source === c.id && p.sourceHandle === "error"
    ) || d(c.id) && s(c.id) || n.push({
      code: "NO_ERROR_HANDLER",
      severity: "warning",
      message: `${c.data.type} node '${ot(c)}' has no error handler — failures will terminate the run.`,
      nodeId: c.id
    });
  return n;
}
function Cs(e) {
  const n = [];
  for (const r of e.nodes)
    r.data.type === "llm" && (typeof r.data.maxTokens != "number" || r.data.maxTokens <= 0) && n.push({
      code: "LLM_NO_MAX_TOKENS",
      severity: "warning",
      message: `LLM node '${ot(r)}' has no maxTokens — responses could run long / expensive.`,
      nodeId: r.id,
      field: "maxTokens"
    });
  return n;
}
function Is(e) {
  const n = [];
  for (const r of e.nodes)
    r.data.type === "approval" && (typeof r.data.timeoutMs != "number" || r.data.timeoutMs <= 0) && n.push({
      code: "UNGUARDED_APPROVAL_TIMEOUT",
      severity: "warning",
      message: `Approval '${ot(r)}' has no timeout — the run could block indefinitely.`,
      nodeId: r.id,
      field: "timeoutMs"
    });
  return n;
}
function Ss(e) {
  const n = [];
  for (const r of e.nodes)
    r.data.type === "fork" && typeof r.data.branchCount == "number" && r.data.branchCount > 5 && n.push({
      code: "LARGE_FORK",
      severity: "warning",
      message: `Fork with ${r.data.branchCount} branches; consider splitting into multiple joins for readability.`,
      nodeId: r.id,
      field: "branchCount"
    });
  return n;
}
function Ts(e) {
  const r = e.nodes.filter((p) => p.type === "trigger");
  if (r.length !== 1) return [];
  const a = /* @__PURE__ */ new Map();
  for (const p of e.nodes) a.set(p.id, []);
  for (const p of e.edges) a.get(p.source)?.push(p.target);
  const i = /* @__PURE__ */ new Map(), s = [r[0].id];
  i.set(r[0].id, 1);
  const d = e.nodes.length * e.nodes.length + 1;
  let c = 0;
  for (; s.length > 0; ) {
    if (c++ > d) return [];
    const p = s.shift(), u = i.get(p);
    for (const f of a.get(p) ?? []) {
      const h = i.get(f);
      (h === void 0 || u + 1 > h) && (i.set(f, u + 1), s.push(f));
    }
  }
  let l = 0;
  for (const p of i.values()) p > l && (l = p);
  return l > 12 ? [
    {
      code: "DEEP_CHAIN",
      severity: "warning",
      message: `Pipeline is very deep (${l} levels); consider modularizing.`
    }
  ] : [];
}
function $s(e) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e.nodes) {
    const i = ot(a), s = r.get(i) ?? [];
    s.push(a), r.set(i, s);
  }
  for (const [a, i] of r)
    if (!(i.length < 2))
      for (const s of i)
        n.push({
          code: "DUPLICATE_NODE_NAME",
          severity: "warning",
          message: `Multiple nodes named '${a}'; consider disambiguating.`,
          nodeId: s.id
        });
  return n;
}
function As(e) {
  const n = [], r = /\{\{[^}]+\}\}/;
  for (const a of e.nodes) {
    if (a.data.type !== "llm") continue;
    const { temperature: i, userPromptTemplate: s } = a.data;
    typeof i != "number" || i <= 0.8 || !s || !r.test(s) || n.push({
      code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
      severity: "warning",
      message: `LLM '${ot(a)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
      nodeId: a.id
    });
  }
  return n;
}
function Rs(e) {
  return e.triggerBinding?.event !== "schedule" ? [] : e.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function Ps(e) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e.edges) {
    const i = r.get(a.source) ?? /* @__PURE__ */ new Set();
    i.add(a.sourceHandle), r.set(a.source, i);
  }
  for (const a of e.nodes) {
    if (a.type !== "condition") continue;
    const i = r.get(a.id) ?? /* @__PURE__ */ new Set(), s = i.has("true"), d = i.has("false");
    s && !d && n.push({
      code: "UNREACHABLE_AFTER_CONDITION_FALSE",
      severity: "warning",
      message: `Condition '${ot(a)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: a.id,
      field: "false"
    });
  }
  return n;
}
function Ds(e) {
  const n = [], r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const c of e.nodes)
    r.set(c.id, []), a.set(c.id, []);
  for (const c of e.edges)
    r.get(c.source)?.push({ target: c.target, sourceHandle: c.sourceHandle }), a.get(c.target)?.push(c.source);
  const i = /* @__PURE__ */ new Map();
  for (const c of e.nodes) i.set(c.id, c);
  function s(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [c];
    for (; p.length > 0; ) {
      const u = p.shift(), f = i.get(u);
      if (f && f.type === "join" && u !== c) return u;
      for (const { target: h } of r.get(u) ?? [])
        l.has(h) || (l.add(h), p.push(h));
    }
    return null;
  }
  function d(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [c];
    for (; p.length > 0; ) {
      const u = p.shift(), f = i.get(u);
      if (f && f.type === "fork" && u !== c) return u;
      for (const h of a.get(u) ?? [])
        l.has(h) || (l.add(h), p.push(h));
    }
    return null;
  }
  for (const c of e.nodes) {
    if (c.data.type !== "fork") continue;
    const l = r.get(c.id) ?? [];
    if (l.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const { target: h } of l)
      p.add(s(h));
    const u = p.has(null), f = [...p].filter((h) => h !== null);
    (u || f.length !== 1) && n.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Fork '${ot(c)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
      nodeId: c.id
    });
  }
  for (const c of e.nodes) {
    if (c.data.type !== "join") continue;
    const l = a.get(c.id) ?? [];
    if (l.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const h of l)
      p.add(d(h));
    const u = p.has(null), f = [...p].filter((h) => h !== null);
    (u || f.length !== 1) && n.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Join '${ot(c)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: c.id
    });
  }
  return n;
}
function Ms(e, n) {
  return `${e}${n}`;
}
const Es = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, Os = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function no(e) {
  return e.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const _s = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function Ls(e) {
  const n = Os[e.type] ?? "■", r = _s[e.type] ?? e.type.charAt(0).toUpperCase() + e.type.slice(1);
  let a = null;
  switch (e.data.type) {
    case "llm":
      a = e.data.model || null;
      break;
    case "condition": {
      const s = e.data;
      a = s.label || s.expression || null;
      break;
    }
    case "approval": {
      const d = e.data.approvers?.length ?? 0;
      a = `${d} approver${d === 1 ? "" : "s"}`;
      break;
    }
    case "fork": {
      const s = e.data;
      a = `${s.branchCount} branch${s.branchCount === 1 ? "" : "es"}`;
      break;
    }
    case "action":
      a = e.data.actionType;
      break;
    case "transform":
      a = e.data.transformType;
      break;
    case "trigger":
      a = e.data.triggerType;
      break;
    case "join":
      a = e.data.mode;
      break;
  }
  const i = `${n} ${r}`;
  return no(a ? `${i}<br/>${a}` : i);
}
function Bs(e, n) {
  const r = `"${n}"`;
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
function Us(e) {
  return !e || e === "out" ? null : e;
}
function js(e) {
  const n = ["flowchart TD"], r = {}, a = /* @__PURE__ */ new Map();
  for (const i of e.nodes) {
    const s = Es[i.type] ?? "n", d = r[s] = (r[s] ?? 0) + 1;
    a.set(i.id, Ms(s, d));
  }
  for (const i of e.nodes) {
    const s = a.get(i.id);
    if (!s) continue;
    const d = Bs(i.type, Ls(i));
    n.push(`  ${s}${d}`);
  }
  for (const i of e.edges) {
    const s = a.get(i.source), d = a.get(i.target);
    if (!s || !d) continue;
    const c = Us(i.sourceHandle);
    c ? n.push(`  ${s} --"${no(c)}"--> ${d}`) : n.push(`  ${s} --> ${d}`);
  }
  return n.join(`
`);
}
function Xn(e) {
  return JSON.stringify(e, (n, r) => {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const a = Object.keys(r).sort(), i = {};
      for (const s of a) i[s] = r[s];
      return i;
    }
    return r;
  });
}
function Qn(e) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e) n.set(r.id, r);
  return n;
}
function Zn(e) {
  return new Set(e.edges.map((n) => n.id));
}
function zs(e, n) {
  if (!n)
    return {
      addedNodes: e.nodes.map((b) => ({
        node: b,
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
  const r = Qn(e.nodes), a = Qn(n.nodes), i = [], s = [], d = [];
  for (const [b, N] of r) {
    const y = a.get(b);
    if (!y) {
      i.push({ node: N, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const k = Xn(N.data) !== Xn(y.data), C = N.position.x !== y.position.x || N.position.y !== y.position.y;
    (k || C) && d.push({ node: N, dataChanged: k, positionChanged: C });
  }
  for (const [b, N] of a)
    r.has(b) || s.push({ node: N, dataChanged: !0, positionChanged: !1 });
  const c = Zn(e), l = Zn(n);
  let p = 0, u = 0;
  for (const b of c) l.has(b) || p++;
  for (const b of l) c.has(b) || u++;
  const f = e.name !== n.name, h = (e.icon ?? "") !== (n.icon ?? ""), g = new Set(e.tags ?? []), x = new Set(n.tags ?? []), m = [], w = [];
  for (const b of g) x.has(b) || m.push(b);
  for (const b of x) g.has(b) || w.push(b);
  const v = m.length > 0 || w.length > 0;
  return {
    addedNodes: i,
    removedNodes: s,
    modifiedNodes: d,
    addedEdges: p,
    removedEdges: u,
    nameChanged: f,
    previousName: f ? n.name : void 0,
    iconChanged: h,
    previousIcon: h ? n.icon : void 0,
    tagsChanged: v,
    tagsAdded: m,
    tagsRemoved: w
  };
}
const Fs = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function qs(e) {
  return e.data.type === "condition" && e.data.label ? e.data.label : e.data.type === "llm" ? e.data.model : e.data.type === "action" ? e.data.actionType : e.data.type === "trigger" ? e.data.triggerType : e.type.charAt(0).toUpperCase() + e.type.slice(1);
}
function tn(e, n, r) {
  const a = e.node, i = Fs[a.type] ?? "■", s = n !== "removed" && !!r;
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      disabled: !s,
      onClick: s ? () => r(e.node.id) : void 0,
      className: I(
        "flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-[inherit] bg-surface-panel border border-border text-left w-full text-text-primary",
        s ? "cursor-pointer" : "cursor-default",
        n === "removed" && "opacity-85"
      ),
      "data-testid": `diff-row-${n}`,
      children: [
        /* @__PURE__ */ t("span", { className: "text-sm", children: i }),
        /* @__PURE__ */ t("span", { className: "font-semibold", children: a.type }),
        /* @__PURE__ */ t("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: qs(a) }),
        n === "modified" && e.positionChanged ? /* @__PURE__ */ t("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-warning-bg text-warning-fg", children: "moved" }) : null
      ]
    },
    `${n}-${e.node.id}`
  );
}
function Ws({
  open: e,
  onClose: n,
  currentDef: r,
  publishedDef: a,
  onJumpToNode: i
}) {
  const s = W(
    () => zs(r, a),
    [r, a]
  ), d = (u) => {
    i && i(u), n();
  }, c = a !== null, l = r.version, p = r.publishedVersion;
  return /* @__PURE__ */ o(
    Qe,
    {
      open: e,
      onClose: n,
      title: "Changes since publish",
      maxWidth: 820,
      footer: /* @__PURE__ */ t(
        "button",
        {
          onClick: n,
          className: "px-4 py-[7px] text-[13px] font-semibold bg-primary text-white border-none rounded-[7px] cursor-pointer font-[inherit]",
          children: "Close"
        }
      ),
      children: [
        /* @__PURE__ */ o("div", { className: "text-[13px] text-text-primary mb-3 flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ o("strong", { children: [
            "v",
            l
          ] }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "vs" }),
          typeof p == "number" ? /* @__PURE__ */ o("strong", { children: [
            "published v",
            p
          ] }) : /* @__PURE__ */ t("strong", { className: "text-text-secondary", children: "never published" })
        ] }),
        r.publishedVersion === void 0 ? /* @__PURE__ */ t("p", { className: "m-0 text-[13px] text-text-secondary", children: "This pipeline has never been published." }) : c ? /* @__PURE__ */ o(H, { children: [
          /* @__PURE__ */ o("div", { className: "flex gap-3 flex-wrap", children: [
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Added (",
                s.addedNodes.length,
                ")"
              ] }),
              s.addedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.addedNodes.map((u) => tn(u, "added", d))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Removed (",
                s.removedNodes.length,
                ")"
              ] }),
              s.removedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.removedNodes.map((u) => tn(u, "removed", void 0))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Modified (",
                s.modifiedNodes.length,
                ")"
              ] }),
              s.modifiedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.modifiedNodes.map((u) => tn(u, "modified", d))
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "mt-4 pt-3 border-t border-border", children: [
            /* @__PURE__ */ o("div", { className: "text-xs text-text-secondary mt-1", children: [
              /* @__PURE__ */ t("strong", { children: s.addedEdges }),
              " edge",
              s.addedEdges === 1 ? "" : "s",
              " added ·",
              " ",
              /* @__PURE__ */ t("strong", { children: s.removedEdges }),
              " edge",
              s.removedEdges === 1 ? "" : "s",
              " removed"
            ] }),
            s.nameChanged ? /* @__PURE__ */ o("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Name: ",
              /* @__PURE__ */ o("em", { children: [
                '"',
                s.previousName ?? "",
                '"'
              ] }),
              " →",
              " ",
              /* @__PURE__ */ o("strong", { children: [
                '"',
                r.name,
                '"'
              ] })
            ] }) : null,
            s.iconChanged ? /* @__PURE__ */ o("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Icon: ",
              s.previousIcon ?? "—",
              " → ",
              r.icon ?? "—"
            ] }) : null,
            s.tagsChanged ? /* @__PURE__ */ o("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Tags changed: added [",
              s.tagsAdded.join(", ") || "—",
              "], removed [",
              s.tagsRemoved.join(", ") || "—",
              "]"
            ] }) : null
          ] })
        ] }) : /* @__PURE__ */ o("p", { className: "m-0 text-[13px] text-text-secondary", children: [
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
function Vs({ open: e, onClose: n }) {
  return null;
}
const nn = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", er = "px-4 py-[7px] text-[13px] font-semibold bg-danger text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function Ks(e) {
  const {
    publishConfirmOpen: n,
    onPublishClose: r,
    onPublishConfirm: a,
    hasErrors: i,
    validationErrorCount: s,
    definitionName: d,
    definitionVersion: c,
    deleteConfirmOpen: l,
    onDeleteClose: p,
    onDeleteConfirm: u,
    clearRunsConfirmOpen: f,
    onClearRunsClose: h,
    onClearRunsConfirm: g,
    versionDiffOpen: x,
    onVersionDiffClose: m,
    currentDef: w,
    publishedDef: v,
    onJumpToNode: b,
    simPanelOpen: N,
    onSimPanelClose: y
  } = e;
  return /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t(
      Qe,
      {
        open: n,
        onClose: r,
        title: "Publish pipeline?",
        maxWidth: 420,
        footer: /* @__PURE__ */ o(H, { children: [
          /* @__PURE__ */ t("button", { onClick: r, className: nn, children: "Cancel" }),
          /* @__PURE__ */ t(
            "button",
            {
              onClick: a,
              disabled: i,
              className: I(
                "px-4 py-[7px] text-[13px] font-semibold text-white border-none rounded-[7px] font-[inherit]",
                i ? "bg-border-emphasis cursor-not-allowed" : "bg-primary cursor-pointer"
              ),
              children: "Publish"
            }
          )
        ] }),
        children: /* @__PURE__ */ o("p", { className: "m-0", children: [
          "Publishing will make ",
          /* @__PURE__ */ o("strong", { children: [
            '"',
            d,
            '"'
          ] }),
          " available for runs and set the published version to",
          /* @__PURE__ */ o("strong", { children: [
            " v",
            c + 1
          ] }),
          ".",
          i ? /* @__PURE__ */ o(H, { children: [
            /* @__PURE__ */ t("br", {}),
            /* @__PURE__ */ t("br", {}),
            /* @__PURE__ */ o("span", { className: "text-danger-fg", children: [
              "Pipeline has ",
              s,
              " validation error",
              s === 1 ? "" : "s",
              ". Fix them before publishing."
            ] })
          ] }) : null
        ] })
      }
    ),
    /* @__PURE__ */ t(
      Qe,
      {
        open: l,
        onClose: p,
        title: "Delete pipeline?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(H, { children: [
          /* @__PURE__ */ t("button", { onClick: p, className: nn, children: "Cancel" }),
          /* @__PURE__ */ t("button", { onClick: u, className: er, children: "Delete" })
        ] }),
        children: /* @__PURE__ */ o("p", { className: "m-0", children: [
          /* @__PURE__ */ o("strong", { children: [
            '"',
            d,
            '"'
          ] }),
          " will be permanently removed. Run history for this pipeline will also be lost."
        ] })
      }
    ),
    /* @__PURE__ */ t(
      Qe,
      {
        open: f,
        onClose: h,
        title: "Clear run history?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(H, { children: [
          /* @__PURE__ */ t("button", { onClick: h, className: nn, children: "Cancel" }),
          /* @__PURE__ */ t("button", { onClick: g, className: er, children: "Clear history" })
        ] }),
        children: /* @__PURE__ */ o("p", { className: "m-0", children: [
          "All stored run history for ",
          /* @__PURE__ */ o("strong", { children: [
            '"',
            d,
            '"'
          ] }),
          " will be permanently removed. This cannot be undone."
        ] })
      }
    ),
    /* @__PURE__ */ t(
      Ws,
      {
        open: x,
        onClose: m,
        currentDef: w,
        publishedDef: v,
        onJumpToNode: b
      }
    ),
    /* @__PURE__ */ t(
      Vs,
      {
        open: N,
        onClose: y
      }
    )
  ] });
}
function Hs({ runId: e, visible: n }) {
  const [r, a] = S(/* @__PURE__ */ new Map()), i = ce(null), s = ce(!0), d = ce(null);
  oe(() => {
    e !== d.current && (d.current = e, a(/* @__PURE__ */ new Map()), s.current = !0);
  }, [e]);
  const c = E(() => {
    const g = i.current;
    if (!g) return;
    const x = g.scrollHeight - g.scrollTop - g.clientHeight < 30;
    s.current = x;
  }, []), l = E(() => {
    if (!s.current) return;
    const g = i.current;
    g && (g.scrollTop = g.scrollHeight);
  }, []), p = E(
    (g) => {
      if (!("eventType" in g)) return;
      const { eventType: x, payload: m } = g;
      if (!x.startsWith("pipeline.llm.")) return;
      const w = m?.runId;
      if (!e || w !== e) return;
      const v = m?.stepId;
      if (v) {
        if (x === "pipeline.llm.stream.opened")
          a((b) => {
            const N = new Map(b);
            return N.has(v) || N.set(v, {
              stepId: v,
              tokens: [],
              text: "",
              active: !0,
              summary: null,
              collapsed: !1,
              startedAt: Date.now()
            }), N;
          });
        else if (x === "pipeline.llm.token") {
          const b = m?.token;
          if (b === void 0) return;
          a((N) => {
            const y = new Map(N), k = y.get(v);
            if (k) {
              const C = {
                ...k,
                tokens: [...k.tokens, b],
                text: k.text + b,
                active: !0
              };
              y.set(v, C);
            } else
              y.set(v, {
                stepId: v,
                tokens: [b],
                text: b,
                active: !0,
                summary: null,
                collapsed: !1,
                startedAt: Date.now()
              });
            return y;
          });
        } else if (x === "pipeline.llm.response") {
          const b = m?.tokensIn, N = m?.tokensOut;
          a((y) => {
            const k = new Map(y), C = k.get(v), T = C ? Date.now() - C.startedAt : 0, M = T > 1e3 ? `${(T / 1e3).toFixed(1)}s` : `${T}ms`, P = `${v}: ${b ?? "?"} tokens in, ${N ?? "?"} tokens out (${M})`;
            return C ? k.set(v, {
              ...C,
              active: !1,
              summary: P
            }) : k.set(v, {
              stepId: v,
              tokens: [],
              text: "",
              active: !1,
              summary: P,
              collapsed: !1,
              startedAt: Date.now()
            }), k;
          });
        }
      }
    },
    [e]
  );
  ze("*", p), oe(() => {
    l();
  }, [r, l]);
  const u = E((g) => {
    a((x) => {
      const m = new Map(x), w = m.get(g);
      return w && m.set(g, { ...w, collapsed: !w.collapsed }), m;
    });
  }, []), f = W(() => {
    for (const g of r.values())
      if (g.active) return !0;
    return !1;
  }, [r]), h = W(() => Array.from(r.values()), [r]);
  return n ? /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col bg-code-surface border-t border-code-border max-h-[320px] min-h-[160px] overflow-hidden relative",
      "data-testid": "live-output-panel",
      children: [
        /* @__PURE__ */ t("div", { className: "flex items-center justify-between py-2 px-[14px] bg-code-panel border-b border-code-border shrink-0", children: /* @__PURE__ */ o("div", { className: "text-xs font-bold text-code-text tracking-[0.04em] uppercase flex items-center gap-2", children: [
          /* @__PURE__ */ t("span", { children: "Live Output" }),
          f && /* @__PURE__ */ t("span", { className: "w-1.5 h-1.5 rounded-full bg-code-green [animation:live-output-blink_1.2s_ease-in-out_infinite]" }),
          e && /* @__PURE__ */ o("span", { className: "text-[10px] text-code-muted font-normal normal-case", children: [
            e.slice(0, 8),
            "..."
          ] })
        ] }) }),
        /* @__PURE__ */ t(
          "div",
          {
            ref: i,
            className: "flex-1 overflow-y-auto py-[10px] px-[14px] text-[13px] leading-[1.6] text-code-text font-code",
            onScroll: c,
            children: h.length === 0 ? /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full text-code-muted text-[13px] italic", children: e ? "Waiting for LLM output..." : "No active run" }) : h.map((g) => /* @__PURE__ */ o("div", { children: [
              /* @__PURE__ */ o(
                "div",
                {
                  className: I(
                    "flex items-center gap-2 py-1.5 cursor-pointer select-none text-[11px] font-semibold border-b border-code-border mb-1.5",
                    g.active ? "text-code-blue" : "text-code-subtle"
                  ),
                  onClick: () => u(g.stepId),
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (x) => {
                    (x.key === "Enter" || x.key === " ") && u(g.stepId);
                  },
                  children: [
                    /* @__PURE__ */ t("span", { className: "text-[10px]", children: g.collapsed ? "▶" : "▼" }),
                    /* @__PURE__ */ t("span", { children: g.stepId }),
                    g.active && /* @__PURE__ */ t("span", { className: "text-code-green text-[10px]", children: "streaming" })
                  ]
                }
              ),
              !g.collapsed && /* @__PURE__ */ o(H, { children: [
                g.text.length > 0 && /* @__PURE__ */ o("div", { className: "whitespace-pre-wrap break-words m-0 mb-3 p-0 text-code-text", children: [
                  g.text,
                  g.active && /* @__PURE__ */ t("span", { className: "inline-block w-0.5 h-[14px] bg-code-blue ml-px align-text-bottom [animation:live-output-blink_1s_step-end_infinite]" })
                ] }),
                g.summary && /* @__PURE__ */ o("div", { className: "text-[11px] text-code-green font-semibold pt-1 pb-2 border-b border-code-border mb-2", children: [
                  "✓",
                  " ",
                  g.summary
                ] })
              ] })
            ] }, g.stepId))
          }
        )
      ]
    }
  ) : null;
}
function Rt(e, n) {
  const r = new Blob([n], { type: "application/json" }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = e, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(a);
}
function Pt(e, n) {
  if (!n) return "step";
  const r = e?.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Js(e) {
  const n = yt(), { toast: r } = Jt(), { definition: a, selectedNodeId: i, setSelectedNodeId: s } = Ke(), d = ce(n.runs);
  oe(() => {
    d.current = n.runs;
  }, [n.runs]);
  const c = ce(a);
  oe(() => {
    c.current = a;
  }, [a]);
  const l = E(
    ($) => $ ? d.current[$]?.pipelineId === e : !1,
    [e]
  ), [p, u] = S(null), [f, h] = S(null), g = E(() => {
    u(null), h(null);
  }, []), x = E(
    ($) => {
      h($);
    },
    []
  ), m = E(
    ($) => {
      "eventType" in $ || $.pipelineId === e && (r("Run started", { type: "info" }), u(null), h(null));
    },
    [e, r]
  ), w = E(
    ($) => {
      if ("eventType" in $ || !l($.runId)) return;
      const B = Math.round($.durationMs / 100) / 10;
      r(`Run completed in ${B}s`, { type: "success" });
    },
    [l, r]
  ), v = E(
    ($) => {
      if ("eventType" in $ || !l($.runId)) return;
      const B = $.error.nodeId, pe = Pt(c.current, B);
      r(`Run failed at ${pe}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => s(B)
      }), u($.error);
    },
    [l, s, r]
  ), b = E(
    ($) => {
      "eventType" in $ || l($.runId) && r("Run cancelled", { type: "warning" });
    },
    [l, r]
  ), N = E(
    ($) => {
      if ("eventType" in $ || !l($.runId)) return;
      const B = $.stepId, pe = Pt(c.current, B);
      r(`Approval requested on "${pe}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => s(B)
      });
    },
    [l, s, r]
  );
  ze("pipeline.run.started", m), ze("pipeline.run.completed", w), ze("pipeline.run.failed", v), ze("pipeline.run.cancelled", b), ze("pipeline.approval.requested", N);
  const [y, k] = S(null);
  oe(() => {
    if (n.activeRunIds.length > 0) {
      const $ = n.activeRunIds[n.activeRunIds.length - 1];
      $ !== y && k($);
      return;
    }
    if (!y) {
      const $ = Object.values(n.runs).sort(
        (B, pe) => pe.startedAt.localeCompare(B.startedAt)
      );
      $.length > 0 && k($[0].id);
    }
  }, [n.activeRunIds, n.runs, y]);
  const C = y ? n.runs[y] : void 0, T = !!C && (C.status === "running" || C.status === "pending" || C.status === "awaiting_approval"), [M, P] = S(/* @__PURE__ */ new Set()), [D, re] = S(null), [A, J] = S(null), [Q, G] = S(null), [Z, O] = S(0), [R, Y] = S(!1), [F, L] = S(null), V = E(
    ($, B) => {
      B === null ? (J(null), G(null)) : (J(B), G($));
    },
    []
  ), K = E(($) => {
    P((B) => {
      const pe = new Set(B);
      return pe.has($) ? pe.delete($) : pe.add($), pe;
    });
  }, []), X = E(async () => {
    if (M.size !== 0)
      try {
        const $ = await n.triggerDebugRun(
          e,
          Array.from(M)
        );
        k($);
      } catch ($) {
        console.error("[PipelineEditor] triggerDebugRun failed", $);
      }
  }, [M, n, e]), me = E(() => {
    D && (n.resolveBreakpoint(D.runId, D.stepId, "continue"), re(null));
  }, [D, n]), q = E(() => {
    D && (n.resolveBreakpoint(D.runId, D.stepId, "step_over"), re(null));
  }, [D, n]), de = E(() => {
    D && (n.resolveBreakpoint(D.runId, D.stepId, "resume_all"), re(null));
  }, [D, n]), Ie = E(async () => {
    if (!(!D || !A || Q !== D.stepId) && Object.keys(A).length !== 0) {
      Y(!0);
      try {
        await To(
          e,
          D.runId,
          D.stepId,
          { mode: "merge", values: A }
        ), J(null), G(null), O(($) => $ + 1), n.resolveBreakpoint(D.runId, D.stepId, "continue"), re(null);
      } catch ($) {
        if ($ instanceof $o)
          r(`Patch rejected: ${$.reason}`, { type: "error", durationMs: 8e3 });
        else if ($ instanceof Un)
          r(`Apply failed (HTTP ${$.status})`, { type: "error", durationMs: 6e3 });
        else {
          const B = $ instanceof Error ? $.message : String($);
          r(`Apply failed: ${B}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        Y(!1);
      }
    }
  }, [D, A, Q, e, n, r]), Fe = E(
    async ($) => {
      if (D) {
        L($);
        try {
          await Ao(
            e,
            D.runId,
            D.stepId,
            $
          ), r("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (B) {
          if (B instanceof Un)
            r(`Revert failed (HTTP ${B.status})`, { type: "error", durationMs: 6e3 });
          else {
            const pe = B instanceof Error ? B.message : String(B);
            r(`Revert failed: ${pe}`, { type: "error", durationMs: 6e3 });
          }
        } finally {
          L(null);
        }
      }
    },
    [D, e, r]
  ), Ze = E(
    ($) => {
      if ("eventType" in $ || !l($.runId)) return;
      re({ runId: $.runId, stepId: $.stepId });
      const B = Pt(c.current, $.stepId);
      r(`Paused at breakpoint: ${B}`, { type: "warning", durationMs: 6e3 });
    },
    [l, r]
  );
  ze("pipeline.step.breakpoint", Ze);
  const He = E(
    ($) => {
      "eventType" in $ || D && D.runId === $.runId && re(null);
    },
    [D]
  );
  ze("pipeline.run.completed", He), ze("pipeline.run.failed", He), ze("pipeline.run.cancelled", He);
  const Ue = E(() => {
    p?.nodeId && (n.retryFromStep(p.nodeId), g());
  }, [p, n, g]), Ge = a?.status === "published", Je = !T && !Ge, Ye = T ? "Cancel the active run" : Ge ? "Start a new run" : "Publish the pipeline to enable runs", [Ae, ve] = S(!1), [se, Ee] = S({}), [kt, ee] = S(!1), [ie, ue] = S("config");
  oe(() => {
    i !== null && ue("config");
  }, [i]);
  const be = E(async ($) => {
    ee(!0);
    try {
      const B = await n.triggerRun(e, $);
      k(B), ue("runs"), r(`Pipeline triggered — run ${B.slice(0, 8)}…`, { type: "success" });
    } catch (B) {
      console.error("[PipelineEditor] triggerRun failed", B), r(`Trigger failed: ${B.message}`, { type: "error" });
    } finally {
      ee(!1);
    }
  }, [n, e, r]), Re = E(async () => {
    if (T && y) {
      n.cancelRun(y);
      return;
    }
    Je || be();
  }, [T, y, Je, n, be]), je = E(() => {
    ve(!1), be(se);
  }, [be, se]);
  return {
    currentRunId: y,
    setCurrentRunId: k,
    activeError: p,
    setActiveError: u,
    errorNodeAnchor: f,
    handleDismissError: g,
    handleErrorNodePosition: x,
    handleRetryFromError: Ue,
    handleRunClick: Re,
    handleTriggerInputSubmit: je,
    isRunActive: T,
    runDisabled: Je,
    runTitle: Ye,
    isTriggering: kt,
    triggerInputOpen: Ae,
    setTriggerInputOpen: ve,
    triggerInputValues: se,
    setTriggerInputValues: Ee,
    breakpoints: M,
    handleToggleBreakpoint: K,
    handleDebugRunClick: X,
    pausedBreakpoint: D,
    handleBreakpointContinue: me,
    handleBreakpointStepOver: q,
    handleBreakpointResumeAll: de,
    handleApplyAndContinue: Ie,
    handleRevertPatch: Fe,
    applyingPatch: R,
    revertingPatchId: F,
    dirtyPatch: A,
    dirtyPatchStepId: Q,
    handleContextEditBufferChange: V,
    resetEditBufferKey: Z,
    sidebarTab: ie,
    setSidebarTab: ue
  };
}
function Gs({
  isPublished: e,
  showTags: n,
  hasPublishedVersion: r,
  onDuplicate: a,
  onCopyMermaid: i,
  onViewVersions: s,
  onRevert: d,
  onToggleShowTags: c,
  onViewRunHistory: l,
  onClearRunHistory: p,
  onSimPanelOpen: u,
  onDelete: f
}) {
  const h = I(
    "block w-full text-left px-3.5 py-2 text-[13px]",
    "border-none bg-transparent cursor-pointer font-inherit text-text-primary",
    "hover:bg-surface-hover"
  ), g = I(
    "block w-full text-left px-3.5 py-2 text-[13px]",
    "border-none bg-transparent cursor-pointer font-inherit text-danger-fg",
    "hover:bg-surface-hover"
  );
  return /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg",
        "shadow-lg p-0 min-w-[200px] max-h-[320px] overflow-y-auto z-20"
      ),
      role: "menu",
      children: [
        /* @__PURE__ */ t("button", { className: h, role: "menuitem", onClick: a, children: "Duplicate" }),
        /* @__PURE__ */ t(
          "button",
          {
            className: h,
            role: "menuitem",
            onClick: i,
            "data-testid": "copy-mermaid-btn",
            children: "Copy Mermaid"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: h,
            role: "menuitem",
            onClick: s,
            "data-testid": "view-versions-btn",
            children: "View changes since publish"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: h,
            role: "menuitem",
            onClick: d,
            disabled: !r,
            children: "Revert to published"
          }
        ),
        /* @__PURE__ */ t("div", { className: "border-t border-border-subtle my-1" }),
        /* @__PURE__ */ t(
          "button",
          {
            className: h,
            role: "menuitem",
            onClick: c,
            "data-testid": "toggle-tags-row",
            children: n ? "Hide tags" : "Show tags"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: h,
            role: "menuitem",
            onClick: l,
            children: "View run history"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: g,
            role: "menuitem",
            onClick: p,
            children: "Clear run history"
          }
        ),
        !1,
        /* @__PURE__ */ t("div", { className: "border-t border-border-subtle my-1" }),
        /* @__PURE__ */ t(
          "button",
          {
            className: g,
            role: "menuitem",
            onClick: f,
            children: "Delete"
          }
        )
      ]
    }
  );
}
const rn = {
  neutral: "bg-surface-hover text-text-secondary",
  success: "bg-success-bg text-success-fg",
  warning: "bg-warning-bg text-warning-fg",
  danger: "bg-danger-bg text-danger-fg",
  info: "bg-info-bg text-info-fg"
};
function Ys({
  pipelineId: e,
  definition: n,
  dirty: r,
  savingFlash: a,
  isRunActive: i,
  isTriggering: s,
  runDisabled: d,
  runTitle: c,
  currentRun: l,
  breakpoints: p,
  onRunClick: u,
  onDebugRunClick: f,
  onExport: h,
  onPublishClick: g,
  onDuplicate: x,
  onCopyMermaid: m,
  onViewVersions: w,
  onRevert: v,
  onToggleShowTags: b,
  showTags: N,
  onViewRunHistory: y,
  onClearRunHistory: k,
  onSimPanelOpen: C,
  onDelete: T
}) {
  const M = Ve(), { rename: P, setIcon: D, setSelectedNodeId: re } = Ke(), [A, J] = S(!1), [Q, G] = S(""), Z = ce(null);
  oe(() => {
    A && (G(n.name ?? ""), setTimeout(() => Z.current?.focus(), 0));
  }, [A, n.name]);
  const O = () => {
    const se = Q.trim();
    se && se !== n.name && P(se), J(!1);
  }, R = n ? to(n) : null;
  (R?.errors.length ?? 0) > 0;
  const Y = n.status === "published", F = r ? { label: "Saving…", variant: "info" } : a ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, L = n.status === "published" ? { label: `v${n.version} · Published`, variant: "success" } : typeof n.publishedVersion == "number" ? { label: `v${n.version} · Draft (pub v${n.publishedVersion})`, variant: "warning" } : { label: `v${n.version} · Draft`, variant: "neutral" }, V = R ? R.errors.length > 0 ? { label: `✗ ${R.errors.length} error${R.errors.length === 1 ? "" : "s"}`, variant: "danger" } : R.warnings.length > 0 ? { label: `⚠ ${R.warnings.length} warning${R.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [K, X] = S(!1), me = ce(null);
  gt(me, () => X(!1), K);
  const q = R ? [...R.errors, ...R.warnings] : [], de = (se) => {
    se && (re(se), X(!1));
  }, Ie = n.nodes.filter((se) => se.type !== "trigger").length, Fe = l ? Object.values(l.steps).filter(
    (se) => se.status === "completed" || se.status === "skipped"
  ).length : 0, He = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), Ue = i && l ? { text: `Running (${Fe}/${Ie} steps) · ${He}s`, variant: "running" } : l?.status === "completed" ? { text: `Completed in ${l.durationMs ? (l.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : l?.status === "failed" ? { text: `Failed at ${Pt(n, l.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, Ge = {
    running: "bg-info-bg text-info-fg",
    success: "bg-success-bg text-success-fg",
    error: "bg-danger-bg text-danger-fg"
  }, Je = i ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [Ye, Ae] = S(!1), ve = ce(null);
  return gt(ve, () => Ae(!1), Ye), /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "h-11 shrink-0 flex items-center gap-2.5 px-3",
        "border-b border-border bg-surface",
        "sticky top-0 z-5"
      ),
      children: [
        /* @__PURE__ */ t(
          mt,
          {
            onClick: () => M("/pipelines"),
            "aria-label": "Back to pipelines",
            title: "Back to pipelines",
            children: "←"
          }
        ),
        /* @__PURE__ */ t(
          Qo,
          {
            value: n.icon ?? "🔀",
            onChange: D
          }
        ),
        A ? /* @__PURE__ */ t(
          "input",
          {
            ref: Z,
            value: Q,
            onChange: (se) => G(se.target.value),
            onBlur: O,
            onKeyDown: (se) => {
              se.key === "Enter" && O(), se.key === "Escape" && (G(n.name), J(!1));
            },
            className: I(
              "px-2 py-1 text-sm font-bold text-text-primary",
              "bg-surface border border-border-field rounded-md",
              "font-inherit outline-none w-[260px]"
            ),
            "data-testid": "pipeline-name-input"
          }
        ) : /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => J(!0),
            className: I(
              "px-2 py-1 text-sm font-bold text-text-primary",
              "bg-transparent border border-transparent rounded-md",
              "cursor-text font-inherit max-w-[280px]",
              "overflow-hidden text-ellipsis whitespace-nowrap text-left"
            ),
            title: n.name,
            "data-testid": "pipeline-name",
            children: n.name
          }
        ),
        /* @__PURE__ */ t(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              rn[F.variant]
            ),
            "data-testid": "save-status",
            children: F.label
          }
        ),
        /* @__PURE__ */ t(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              rn[L.variant]
            ),
            "data-testid": "version-badge",
            children: L.label
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", ref: me, children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => X((se) => !se),
              className: I(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
                "cursor-pointer border-none",
                rn[V.variant]
              ),
              "data-testid": "validation-indicator",
              children: V.label
            }
          ),
          K && q.length > 0 && /* @__PURE__ */ t(
            "div",
            {
              className: I(
                "absolute top-full mt-1.5 bg-surface border border-border rounded-lg",
                "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"
              ),
              children: q.map((se, Ee) => /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => de(se.nodeId),
                  className: I(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    se.nodeId ? "cursor-pointer" : "cursor-default",
                    Ee < q.length - 1 && "border-b border-border"
                  ),
                  children: [
                    /* @__PURE__ */ t(
                      "span",
                      {
                        className: I(
                          "font-bold text-xs",
                          se.severity === "error" ? "text-danger-fg" : "text-warning-fg"
                        ),
                        children: se.severity === "error" ? "✗" : "⚠"
                      }
                    ),
                    /* @__PURE__ */ o("span", { className: "flex-1 text-xs", children: [
                      /* @__PURE__ */ t("div", { className: "font-semibold", children: se.code }),
                      /* @__PURE__ */ t("div", { className: "text-text-secondary", children: se.message }),
                      se.nodeId && /* @__PURE__ */ t("div", { className: "mt-0.5 text-[11px] text-primary", children: "Jump to node →" })
                    ] })
                  ]
                },
                `${se.code}-${Ee}`
              ))
            }
          )
        ] }),
        Ue.variant !== "none" && /* @__PURE__ */ o(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap",
              Ge[Ue.variant]
            ),
            "data-testid": "run-status-indicator",
            children: [
              Ue.variant === "running" && /* @__PURE__ */ t("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-primary rounded-full animate-spin" }),
              Ue.variant === "success" && "✓ ",
              Ue.variant === "error" && "✗ ",
              Ue.text
            ]
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex-1" }),
        /* @__PURE__ */ t(
          Pe,
          {
            variant: "secondary",
            onClick: () => M("/pipelines/metrics"),
            title: "View pipeline metrics dashboard",
            "data-testid": "metrics-button",
            children: "Metrics"
          }
        ),
        /* @__PURE__ */ t(
          Pe,
          {
            variant: "secondary",
            onClick: h,
            title: "Export pipeline as JSON",
            "data-testid": "export-button",
            children: "Export"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: g,
            title: Y ? "Already published at this version" : "Publish pipeline to enable runs",
            disabled: Y,
            className: I(
              "px-3 py-1.5 text-[13px] font-semibold border-none rounded-md font-inherit shrink-0",
              Y ? "bg-surface-hover text-text-tertiary cursor-default opacity-70" : "bg-success text-white cursor-pointer"
            ),
            "data-testid": "publish-button",
            children: Y ? "Published" : "Publish"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: u,
            disabled: d || s,
            title: c,
            className: I(
              "px-3.5 py-1.5 text-[13px] font-semibold text-white border-none rounded-md font-inherit shrink-0",
              i ? "bg-danger" : "bg-primary",
              d || s ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            ),
            "data-testid": "run-button",
            children: s ? /* @__PURE__ */ o("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ t("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-white rounded-full animate-spin" }),
              "Triggering…"
            ] }) : Je
          }
        ),
        p.size > 0 && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: f,
            disabled: d || i,
            title: `Debug run (${p.size} breakpoint${p.size > 1 ? "s" : ""})`,
            className: I(
              "px-3.5 py-1.5 text-[13px] font-semibold bg-warning text-white",
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
        /* @__PURE__ */ o("div", { className: "relative", ref: ve, children: [
          /* @__PURE__ */ t(
            mt,
            {
              onClick: () => Ae((se) => !se),
              "aria-label": "More actions",
              "data-testid": "overflow-menu-btn",
              children: "⋯"
            }
          ),
          Ye && /* @__PURE__ */ t(
            Gs,
            {
              isPublished: Y,
              showTags: N,
              onDuplicate: () => {
                x(), Ae(!1);
              },
              onCopyMermaid: () => {
                m(), Ae(!1);
              },
              onViewVersions: () => {
                w(), Ae(!1);
              },
              onRevert: () => {
                v(), Ae(!1);
              },
              onToggleShowTags: () => {
                b(), Ae(!1);
              },
              onViewRunHistory: () => {
                y(), Ae(!1);
              },
              onClearRunHistory: () => {
                k(), Ae(!1);
              },
              onSimPanelOpen: () => {
                C(), Ae(!1);
              },
              onDelete: () => {
                T(), Ae(!1);
              },
              hasPublishedVersion: typeof n.publishedVersion == "number"
            }
          )
        ] })
      ]
    }
  );
}
const Xs = 12;
function Oe(e) {
  return I("text-xs", {
    string: "text-code-green",
    number: "text-code-peach",
    boolean: "text-code-mauve",
    null: "text-code-muted",
    bracket: "text-code-comment"
  }[e]);
}
function Ot({
  data: e,
  depth: n = 0,
  highlightKeys: r,
  keyName: a,
  isHighlighted: i = !1
}) {
  const [s, d] = S(n > 2);
  if (n > Xs)
    return /* @__PURE__ */ t("span", { className: Oe("string"), children: "[max depth]" });
  const c = i || a != null && r?.has(a);
  if (e === null)
    return /* @__PURE__ */ t("span", { className: I(Oe("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "null" });
  if (e === void 0)
    return /* @__PURE__ */ t("span", { className: I(Oe("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "undefined" });
  if (typeof e == "boolean")
    return /* @__PURE__ */ t("span", { className: I(Oe("boolean"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(e) });
  if (typeof e == "number")
    return /* @__PURE__ */ t("span", { className: I(Oe("number"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(e) });
  if (typeof e == "string") {
    const l = e.length > 120 ? e.slice(0, 120) + "..." : e;
    return /* @__PURE__ */ o("span", { className: I(Oe("string"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: [
      '"',
      l,
      '"'
    ] });
  }
  if (Array.isArray(e))
    return e.length === 0 ? /* @__PURE__ */ t("span", { className: Oe("bracket"), children: "[]" }) : /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(
        "span",
        {
          className: "cursor-pointer select-none text-[9px] mr-1 text-code-muted inline-block w-3 text-center",
          onClick: () => d((l) => !l),
          role: "button",
          tabIndex: 0,
          onKeyDown: (l) => {
            (l.key === "Enter" || l.key === " ") && d((p) => !p);
          },
          children: s ? "▶" : "▼"
        }
      ),
      /* @__PURE__ */ t("span", { className: Oe("bracket"), children: "[" }),
      s ? /* @__PURE__ */ o("span", { className: "text-code-muted italic text-[11px] ml-1", children: [
        e.length,
        " items"
      ] }) : /* @__PURE__ */ t("div", { className: "pl-4", children: e.map((l, p) => /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
        /* @__PURE__ */ o("span", { className: "text-code-muted text-[11px]", children: [
          p,
          ": "
        ] }),
        /* @__PURE__ */ t(Ot, { data: l, depth: n + 1, highlightKeys: r }),
        p < e.length - 1 && /* @__PURE__ */ t("span", { className: Oe("bracket"), children: "," })
      ] }, p)) }),
      /* @__PURE__ */ t("span", { className: Oe("bracket"), children: "]" })
    ] });
  if (typeof e == "object") {
    const l = Object.entries(e);
    return l.length === 0 ? /* @__PURE__ */ t("span", { className: Oe("bracket"), children: "{}" }) : /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(
        "span",
        {
          className: "cursor-pointer select-none text-[9px] mr-1 text-code-muted inline-block w-3 text-center",
          onClick: () => d((p) => !p),
          role: "button",
          tabIndex: 0,
          onKeyDown: (p) => {
            (p.key === "Enter" || p.key === " ") && d((u) => !u);
          },
          children: s ? "▶" : "▼"
        }
      ),
      /* @__PURE__ */ t("span", { className: Oe("bracket"), children: "{" }),
      s ? /* @__PURE__ */ o("span", { className: "text-code-muted italic text-[11px] ml-1", children: [
        l.length,
        " keys"
      ] }) : /* @__PURE__ */ t("div", { className: "pl-4", children: l.map(([p, u], f) => {
        const h = r?.has(p) || i;
        return /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
          /* @__PURE__ */ t("span", { className: I(
            "text-xs font-medium text-code-blue",
            h && "text-code-green font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5"
          ), children: p }),
          /* @__PURE__ */ t("span", { className: Oe("bracket"), children: ": " }),
          /* @__PURE__ */ t(
            Ot,
            {
              data: u,
              depth: n + 1,
              highlightKeys: n === 0 ? r : void 0,
              keyName: p,
              isHighlighted: h
            }
          ),
          f < l.length - 1 && /* @__PURE__ */ t("span", { className: Oe("bracket"), children: "," })
        ] }, p);
      }) }),
      /* @__PURE__ */ t("span", { className: Oe("bracket"), children: "}" })
    ] });
  }
  return /* @__PURE__ */ t("span", { className: Oe("string"), children: String(e) });
}
function Qs({
  snapshots: e,
  activeStepId: n,
  fallbackActiveStepId: r,
  onStepSelect: a
}) {
  const i = n ?? r;
  return /* @__PURE__ */ t("div", { className: "w-[140px] shrink-0 border-r border-border overflow-y-auto", children: e.map((s, d) => {
    const c = s.stepId === i;
    return /* @__PURE__ */ o(
      "div",
      {
        className: I(
          "px-2.5 py-1.5 text-[11px] font-mono cursor-pointer border-b border-border overflow-hidden text-ellipsis whitespace-nowrap",
          c ? "text-text-primary bg-surface-inset font-semibold" : "text-text-tertiary font-normal"
        ),
        onClick: () => a?.(s.stepId),
        role: "button",
        tabIndex: 0,
        onKeyDown: (l) => {
          (l.key === "Enter" || l.key === " ") && a?.(s.stepId);
        },
        title: s.stepId,
        children: [
          s.newKeys.length > 0 && /* @__PURE__ */ t("span", { className: "text-code-green mr-1 text-[9px]", children: "+" }),
          /* @__PURE__ */ o("span", { className: "text-[10px] text-code-comment mr-1", children: [
            d + 1,
            "."
          ] }),
          s.stepId ? s.stepId.slice(0, 8) : `step-${d + 1}`
        ]
      },
      s.stepId || d
    );
  }) });
}
function Zs(e) {
  return typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : "object";
}
function el({ k: e, initial: n, onCommit: r, onError: a, onFocus: i }) {
  const [s, d] = S(() => {
    try {
      return JSON.stringify(n, null, 2);
    } catch {
      return "";
    }
  });
  return /* @__PURE__ */ t(
    "textarea",
    {
      "data-testid": `context-edit-input-${e}`,
      value: s,
      onChange: (c) => d(c.target.value),
      onFocus: i,
      onBlur: () => {
        try {
          const c = JSON.parse(s);
          r(c);
        } catch (c) {
          a(`Invalid JSON: ${c instanceof Error ? c.message : String(c)}`);
        }
      },
      className: "w-full px-1.5 py-1 text-xs bg-code-bg text-code-text border border-code-border rounded-sm font-mono min-h-[60px] resize-y"
    }
  );
}
function tl({
  inputContext: e,
  buffer: n,
  parseErrors: r,
  newKeyDraft: a,
  setNewKeyDraft: i,
  onCommitNewKey: s,
  onBeginEditKey: d,
  onSetValue: c,
  onRemoveKey: l,
  onParseError: p
}) {
  const u = W(() => {
    const h = /* @__PURE__ */ new Set([
      ...Object.keys(e),
      ...Object.keys(n)
    ]);
    return Array.from(h);
  }, [e, n]), f = "w-full px-1.5 py-1 text-xs bg-code-bg text-code-text border border-code-border rounded-sm font-mono";
  return /* @__PURE__ */ o("div", { "data-testid": "context-edit-table", children: [
    u.map((h) => {
      const g = h in n, x = g ? n[h] : e[h], m = Zs(x), w = g;
      return /* @__PURE__ */ o(
        "div",
        {
          className: "grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 border-b border-code-border",
          "data-testid": `context-edit-row-${h}`,
          children: [
            /* @__PURE__ */ o(
              "span",
              {
                className: I(
                  "text-xs font-medium text-code-blue pt-1 overflow-hidden text-ellipsis whitespace-nowrap",
                  w && "text-code-green font-bold"
                ),
                title: h,
                children: [
                  h,
                  w && /* @__PURE__ */ t("span", { className: "ml-1 text-[9px]", children: "●" })
                ]
              }
            ),
            /* @__PURE__ */ o("div", { className: "min-w-0", children: [
              m === "boolean" ? /* @__PURE__ */ o(
                "select",
                {
                  "data-testid": `context-edit-input-${h}`,
                  value: String(x),
                  onChange: (v) => c(h, v.target.value === "true"),
                  onFocus: () => d(h, x),
                  className: f,
                  children: [
                    /* @__PURE__ */ t("option", { value: "true", children: "true" }),
                    /* @__PURE__ */ t("option", { value: "false", children: "false" })
                  ]
                }
              ) : m === "number" ? /* @__PURE__ */ t(
                "input",
                {
                  "data-testid": `context-edit-input-${h}`,
                  type: "number",
                  value: String(x),
                  onChange: (v) => {
                    const b = v.target.value === "" ? 0 : Number(v.target.value);
                    c(h, Number.isNaN(b) ? 0 : b);
                  },
                  onFocus: () => d(h, x),
                  className: f
                }
              ) : m === "string" ? /* @__PURE__ */ t(
                "input",
                {
                  "data-testid": `context-edit-input-${h}`,
                  type: "text",
                  value: x ?? "",
                  onChange: (v) => c(h, v.target.value),
                  onFocus: () => d(h, x),
                  className: f
                }
              ) : /* @__PURE__ */ t(
                el,
                {
                  k: h,
                  initial: x,
                  onCommit: (v) => c(h, v),
                  onError: (v) => p(h, v),
                  onFocus: () => d(h, x)
                }
              ),
              r[h] && /* @__PURE__ */ t(
                "div",
                {
                  "data-testid": `context-edit-parse-error-${h}`,
                  className: "text-code-red text-[11px] mt-1",
                  children: r[h]
                }
              )
            ] }),
            /* @__PURE__ */ t("div", { className: "flex gap-1", children: w && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                "data-testid": `context-edit-revert-${h}`,
                onClick: () => l(h),
                title: "Drop change",
                className: "px-1.5 py-0.5 text-[10px] bg-transparent text-code-comment border border-code-border rounded-sm cursor-pointer font-mono",
                children: "↺"
              }
            ) })
          ]
        },
        h
      );
    }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 mt-2",
        "data-testid": "context-edit-add-row",
        children: [
          /* @__PURE__ */ t(
            "input",
            {
              "data-testid": "context-edit-new-key",
              type: "text",
              placeholder: "key",
              value: a.key,
              onChange: (h) => i({ ...a, key: h.target.value }),
              className: f
            }
          ),
          /* @__PURE__ */ t(
            "input",
            {
              "data-testid": "context-edit-new-value",
              type: "text",
              placeholder: "value (string or JSON)",
              value: a.value,
              onChange: (h) => i({ ...a, value: h.target.value }),
              onKeyDown: (h) => {
                h.key === "Enter" && (h.preventDefault(), s());
              },
              className: f
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": "context-edit-add-btn",
              onClick: s,
              disabled: !a.key.trim(),
              className: I(
                "px-2.5 py-0.5 text-[11px] font-semibold border rounded-sm cursor-pointer font-mono",
                a.key.trim() ? "bg-code-green text-code-surface border-code-green" : "bg-transparent text-code-raised border-code-border cursor-not-allowed"
              ),
              children: "+ Add field"
            }
          )
        ]
      }
    )
  ] });
}
function nl(e, n, r) {
  const a = { ...e }, i = { ...a.steps ?? {} };
  return i[n] = r, a.steps = i, r && typeof r == "object" && !Array.isArray(r) && Object.assign(a, r), a;
}
function rl(e, n) {
  const r = [];
  for (const a of Object.keys(n))
    a in e || r.push(a);
  return r;
}
function ol(e) {
  const n = Object.values(e.steps).filter((i) => i != null).sort((i, s) => {
    const d = i.startedAt ? Date.parse(i.startedAt) : 0, c = s.startedAt ? Date.parse(s.startedAt) : 0;
    return d - c;
  }), r = [];
  let a = {};
  e.triggeredBy?.payload && typeof e.triggeredBy.payload == "object" && (a = { ...e.triggeredBy.payload });
  for (const i of n) {
    const s = { ...a }, d = i.output, c = i.llm?.prompt;
    let l;
    if (d !== void 0)
      l = nl(a, i.nodeId, d);
    else {
      l = { ...a };
      const u = {
        ...l.steps ?? {}
      };
      u[i.nodeId] = d, l.steps = u;
    }
    const p = rl(s, l);
    r.push({
      stepId: i.nodeId,
      inputContext: s,
      output: d,
      outputContext: l,
      resolvedPrompt: c || void 0,
      newKeys: p,
      stepExecution: i
    }), a = l;
  }
  return r;
}
function al(e, n) {
  const [r, a] = S(/* @__PURE__ */ new Map()), [i, s] = S(
    /* @__PURE__ */ new Map()
  ), d = ce(null);
  oe(() => {
    const h = e?.id ?? null;
    h !== d.current && (d.current = h, a(/* @__PURE__ */ new Map()), s(/* @__PURE__ */ new Map()));
  }, [e?.id]);
  const c = E(
    (h) => {
      if (!h || typeof h != "object") return;
      const { eventType: g, payload: x } = h;
      if (!x || typeof x != "object") return;
      const m = x, w = m.runId;
      if (!(!e?.id || w !== e.id)) {
        if (g === "pipeline.llm.prompt") {
          const v = m.stepId, b = m.prompt;
          v && b && a((N) => {
            const y = new Map(N);
            return y.set(v, b), y;
          });
        }
        if (g === "pipeline.run.checkpoint" || g === "pipeline.run.checkpointed" || g === "pipeline:run:checkpoint" || g === "pipeline:run:checkpointed") {
          const v = m.context, b = m.stepId;
          v && b && s((N) => {
            const y = new Map(N);
            return y.set(b, v), y;
          });
        }
      }
    },
    [e?.id]
  );
  ze("*", c);
  const l = W(() => e ? ol(e) : [], [e]), p = W(() => l.map((h) => {
    const g = r.get(h.stepId), x = i.get(h.stepId);
    return {
      ...h,
      resolvedPrompt: h.resolvedPrompt || g,
      outputContext: x ?? h.outputContext
    };
  }), [l, r, i]), u = W(() => n ? p.find((h) => h.stepId === n) ?? null : p[p.length - 1] ?? null, [p, n]), f = W(() => u ? new Set(u.newKeys) : /* @__PURE__ */ new Set(), [u]);
  return { enrichedSnapshots: p, activeSnapshot: u, newKeysSet: f };
}
function tr({ attempt: e, label: n }) {
  const r = !e.error;
  return /* @__PURE__ */ o("div", { className: "bg-code-bg rounded-md border border-code-border p-2.5 overflow-auto", children: [
    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold text-code-text mb-2", children: n }),
    /* @__PURE__ */ o("div", { className: "flex gap-1.5 mb-1.5 items-center", children: [
      /* @__PURE__ */ t("span", { className: I(
        "text-[10px] font-semibold px-1.5 py-px rounded-sm",
        r ? "bg-[rgba(166,227,161,0.15)] text-code-green" : "bg-[rgba(243,139,168,0.15)] text-code-red"
      ), children: r ? "OK" : "FAIL" }),
      e.durationMs != null && /* @__PURE__ */ o("span", { className: "text-[10px] text-code-muted", children: [
        e.durationMs,
        "ms"
      ] })
    ] }),
    e.error && /* @__PURE__ */ t("div", { className: "text-[11px] text-code-red font-mono mb-1.5 px-2 py-1.5 bg-code-red/10 rounded whitespace-pre-wrap break-words", children: e.error }),
    e.output !== void 0 && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ t("div", { className: "text-[10px] text-code-muted font-semibold mb-1 uppercase", children: "Output" }),
      /* @__PURE__ */ t(Ot, { data: e.output, depth: 0 })
    ] })
  ] });
}
function il({
  run: e,
  activeStepId: n,
  onStepSelect: r,
  editable: a = !1,
  onEditBufferChange: i,
  resetEditBufferKey: s
}) {
  const [d, c] = S("input"), [l, p] = S(0), [u, f] = S(!1), [h, g] = S({}), [x, m] = S(null), [w, v] = S({}), [b, N] = S({
    key: "",
    value: ""
  }), { enrichedSnapshots: y, activeSnapshot: k, newKeysSet: C } = al(e, n), T = k?.resolvedPrompt != null, M = k?.stepExecution.attempts, P = (M?.length ?? 0) >= 2;
  oe(() => {
    d === "prompt" && !T && c("input"), d === "attempts" && !P && c("input");
  }, [d, T, P]), oe(() => {
    p(0);
  }, [n]);
  const D = !!(e && e.status === "paused_at_breakpoint" && n && (e.currentStepIds?.includes(n) || k?.stepExecution.status === "running" || k?.stepExecution.status === "awaiting" || k?.stepExecution.status === "pending")), re = !!a && !!D;
  oe(() => {
    re ? x && x !== n && (g({}), m(null), v({})) : (u && f(!1), Object.keys(h).length > 0 && g({}), x && m(null), Object.keys(w).length > 0 && v({}));
  }, [re, n]), oe(() => {
    s !== void 0 && (g({}), m(null), v({}), N({ key: "", value: "" }));
  }, [s]), oe(() => {
    !re || !n || i && (Object.keys(h).length === 0 ? i(n, null) : i(n, h));
  }, [h, re, n]);
  const A = E(
    (R, Y) => {
      m(n), g((F) => R in F ? F : { ...F, [R]: Y });
    },
    [n]
  ), J = E(
    (R, Y) => {
      m(n), g((F) => ({ ...F, [R]: Y })), v((F) => {
        if (!(R in F)) return F;
        const L = { ...F };
        return delete L[R], L;
      });
    },
    [n]
  ), Q = E((R) => {
    g((Y) => {
      if (!(R in Y)) return Y;
      const F = { ...Y };
      return delete F[R], F;
    }), v((Y) => {
      if (!(R in Y)) return Y;
      const F = { ...Y };
      return delete F[R], F;
    });
  }, []), G = E((R, Y) => {
    v((F) => ({ ...F, [R]: Y }));
  }, []), Z = E(() => {
    g({}), m(null), v({}), N({ key: "", value: "" });
  }, []), O = E(() => {
    const R = b.key.trim();
    if (!R) return;
    let Y = b.value;
    const F = b.value;
    if (F.trim().length > 0)
      try {
        Y = JSON.parse(F);
      } catch {
        Y = F;
      }
    J(R, Y), N({ key: "", value: "" });
  }, [b, J]);
  return !e || y.length === 0 ? /* @__PURE__ */ o("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0", children: /* @__PURE__ */ t("span", { className: "text-xs font-bold text-text-primary tracking-wide uppercase", children: "Context Inspector" }) }),
    /* @__PURE__ */ o("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs flex items-center justify-center flex-col gap-2", children: [
      /* @__PURE__ */ t("span", { className: "text-[13px] text-code-muted", children: e ? "Waiting for step execution data..." : "Run a pipeline to inspect context flow" }),
      /* @__PURE__ */ t("span", { className: "text-[11px] text-code-raised", children: e ? "Context data will appear as steps complete." : "Trigger a run to see inputs, outputs, and context at each step." })
    ] })
  ] }) : /* @__PURE__ */ o("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0", children: [
      /* @__PURE__ */ t("span", { className: "text-xs font-bold text-text-primary tracking-wide uppercase", children: "Context Inspector" }),
      k && k.stepId && /* @__PURE__ */ o("span", { className: "text-[10px] text-code-muted", children: [
        "Step: ",
        k.stepId.slice(0, 8)
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex gap-0 border-b border-border shrink-0", children: [
      { id: "input", label: "Input Context", show: !0 },
      { id: "output", label: "Output", show: !0 },
      { id: "prompt", label: "Resolved Prompt", show: T },
      { id: "details", label: "Details", show: !0 },
      { id: "attempts", label: `Attempts (${M?.length})`, show: P }
    ].filter((R) => R.show).map((R) => /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "data-testid": R.id === "attempts" ? "attempts-tab" : void 0,
        className: I(
          "px-3.5 py-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer font-inherit uppercase tracking-wide border-b-2",
          d === R.id ? "text-primary border-b-primary" : "text-text-tertiary border-b-transparent"
        ),
        onClick: () => c(R.id),
        children: R.label
      },
      R.id
    )) }),
    /* @__PURE__ */ o("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
      /* @__PURE__ */ t(
        Qs,
        {
          snapshots: y,
          activeStepId: n,
          fallbackActiveStepId: k?.stepId,
          onStepSelect: r
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs", children: k ? d === "input" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ o("div", { className: "text-[10px] text-code-muted font-semibold uppercase", children: [
            "Input context",
            k.stepId ? ` — step ${k.stepId.slice(0, 8)}` : ""
          ] }),
          re && /* @__PURE__ */ o("div", { className: "flex gap-1.5 items-center", children: [
            u && Object.keys(h).length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: Z,
                "data-testid": "context-inspector-discard",
                className: "px-2 py-0.5 text-[10px] font-semibold bg-transparent text-code-red border border-code-border rounded-sm cursor-pointer font-mono",
                children: "Discard changes"
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => {
                  const R = !u;
                  f(R), R || Z();
                },
                "data-testid": "context-inspector-edit-toggle",
                className: I(
                  "px-2 py-0.5 text-[10px] font-semibold border rounded-sm cursor-pointer font-mono uppercase tracking-wide",
                  u ? "bg-warning text-white border-warning" : "bg-transparent text-warning-fg border-warning"
                ),
                children: u ? "Editing" : "Edit"
              }
            )
          ] })
        ] }),
        Object.keys(k.inputContext).length === 0 && !(re && u) ? /* @__PURE__ */ t("div", { className: "text-code-muted text-xs italic", children: "No input context (first step or no upstream output)" }) : re && u ? /* @__PURE__ */ t(
          tl,
          {
            inputContext: k.inputContext,
            buffer: h,
            parseErrors: w,
            newKeyDraft: b,
            setNewKeyDraft: N,
            onCommitNewKey: O,
            onBeginEditKey: A,
            onSetValue: J,
            onRemoveKey: Q,
            onParseError: G
          }
        ) : /* @__PURE__ */ t(
          Ot,
          {
            data: k.inputContext,
            highlightKeys: C
          }
        )
      ] }) : d === "output" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "mb-2 text-[10px] text-code-muted font-semibold uppercase", children: [
          "Output",
          k.stepId ? ` — step ${k.stepId.slice(0, 8)}` : ""
        ] }),
        /* @__PURE__ */ t(Ot, { data: k.output }),
        k.newKeys.length > 0 && /* @__PURE__ */ o("div", { className: "mt-3", children: [
          /* @__PURE__ */ t("div", { className: "text-[10px] text-code-green font-semibold uppercase mb-1", children: "New context keys added" }),
          /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: k.newKeys.map((R) => /* @__PURE__ */ t(
            "span",
            {
              className: "px-1.5 py-0.5 bg-[rgba(166,227,161,0.15)] text-code-green rounded-sm text-[11px] font-semibold font-mono",
              children: R
            },
            R
          )) })
        ] })
      ] }) : d === "prompt" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("div", { className: "mb-2 text-[10px] text-code-muted font-semibold uppercase", children: "Resolved prompt template" }),
        /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: k.resolvedPrompt })
      ] }) : d === "details" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("div", { className: "mb-2 text-[10px] text-code-muted font-semibold uppercase", children: "Step execution details" }),
        /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
          k.stepExecution.startedAt && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-code-blue font-semibold mb-1", children: "Duration" }),
            /* @__PURE__ */ o("div", { className: "text-[11px] text-code-text", children: [
              "Started: ",
              k.stepExecution.startedAt,
              k.stepExecution.completedAt && /* @__PURE__ */ o(H, { children: [
                /* @__PURE__ */ t("br", {}),
                "Completed: ",
                k.stepExecution.completedAt,
                k.stepExecution.durationMs != null && /* @__PURE__ */ o(H, { children: [
                  /* @__PURE__ */ t("br", {}),
                  "Duration: ",
                  k.stepExecution.durationMs,
                  "ms"
                ] })
              ] })
            ] })
          ] }),
          k.stepExecution.llm && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-code-blue font-semibold mb-1", children: "LLM Metrics" }),
            /* @__PURE__ */ o("div", { className: "text-[11px] text-code-text", children: [
              "Tokens in: ",
              k.stepExecution.llm.tokensIn,
              /* @__PURE__ */ t("br", {}),
              "Tokens out: ",
              k.stepExecution.llm.tokensOut,
              k.stepExecution.llm.firstTokenLatencyMs != null && /* @__PURE__ */ o(H, { children: [
                /* @__PURE__ */ t("br", {}),
                "First token latency: ",
                k.stepExecution.llm.firstTokenLatencyMs,
                "ms"
              ] })
            ] }),
            k.stepExecution.llm.response && /* @__PURE__ */ o(H, { children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] text-code-blue font-semibold mt-2 mb-1", children: "Response Text" }),
              /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: k.stepExecution.llm.response })
            ] })
          ] }),
          k.stepExecution.error && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-code-red font-semibold mb-1", children: "Error" }),
            /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-code-red/10 border border-code-red rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: /* @__PURE__ */ t("div", { className: "text-code-red font-semibold mb-1", children: k.stepExecution.error }) })
          ] }),
          k.stepExecution.approvals && k.stepExecution.approvals.length > 0 && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("div", { className: "text-[11px] text-code-blue font-semibold mb-1", children: [
              "Approvals (",
              k.stepExecution.approvals.length,
              ")"
            ] }),
            k.stepExecution.approvals.map((R, Y) => /* @__PURE__ */ o("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2", children: [
              /* @__PURE__ */ o("div", { className: "flex gap-2 mb-1", children: [
                /* @__PURE__ */ t("span", { className: I(
                  "px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                  R.decision === "approve" ? "bg-[rgba(166,227,161,0.15)] text-code-green" : "bg-[rgba(243,139,168,0.15)] text-code-red"
                ), children: R.decision.toUpperCase() }),
                /* @__PURE__ */ t("span", { className: "text-[11px] text-code-text", children: R.userId })
              ] }),
              R.comment && /* @__PURE__ */ o("div", { className: "text-[11px] text-code-comment italic", children: [
                '"',
                R.comment,
                '"'
              ] }),
              /* @__PURE__ */ t("div", { className: "text-[10px] text-code-muted mt-1", children: R.at })
            ] }, Y))
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-code-blue font-semibold mb-1", children: "Status" }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-code-text", children: k.stepExecution.status })
          ] })
        ] })
      ] }) : d === "attempts" && M && M.length >= 2 ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": "attempts-prev",
              disabled: l === 0,
              onClick: () => p((R) => R - 1),
              className: I(
                "px-2 py-0.5 text-[11px] bg-transparent border border-code-border rounded-sm font-mono",
                l === 0 ? "text-code-raised cursor-not-allowed" : "text-code-text cursor-pointer"
              ),
              children: "←"
            }
          ),
          /* @__PURE__ */ o(
            "span",
            {
              "data-testid": "attempts-label",
              className: "text-[11px] text-code-comment flex-1 text-center",
              children: [
                "Attempt ",
                l + 1,
                " vs ",
                l + 2,
                " of ",
                M.length
              ]
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": "attempts-next",
              disabled: l >= M.length - 2,
              onClick: () => p((R) => R + 1),
              className: I(
                "px-2 py-0.5 text-[11px] bg-transparent border border-code-border rounded-sm font-mono",
                l >= M.length - 2 ? "text-code-raised cursor-not-allowed" : "text-code-text cursor-pointer"
              ),
              children: "→"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ t(tr, { attempt: M[l], label: `Attempt ${l + 1}` }),
          /* @__PURE__ */ t(tr, { attempt: M[l + 1], label: `Attempt ${l + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function sl({
  definition: e,
  pausedBreakpoint: n,
  applyingPatch: r,
  revertingPatchId: a,
  dirtyPatch: i,
  dirtyPatchStepId: s,
  resetEditBufferKey: d,
  onContinue: c,
  onStepOver: l,
  onResumeAll: p,
  onApplyAndContinue: u,
  onRevertPatch: f,
  onEditBufferChange: h
}) {
  const x = yt().runs[n.runId] ?? null, w = x?.steps?.[n.stepId]?.patches ?? [], v = !!i && s === n.stepId && Object.keys(i).length > 0, b = x?.status === "paused_at_breakpoint";
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": "breakpoint-pause-overlay",
      className: I(
        "absolute top-14 left-1/2 -translate-x-1/2 z-30",
        "bg-surface border-2 border-warning rounded-lg",
        "px-4 py-3 shadow-[0_8px_24px_rgba(217,119,6,0.2)]",
        "flex flex-col gap-3 font-inherit",
        "w-[min(900px,92vw)] max-h-[calc(100vh-120px)]"
      ),
      children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ o("span", { className: "text-[13px] font-semibold text-warning-fg", children: [
            "Paused at: ",
            Pt(e, n.stepId)
          ] }),
          v && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: u,
              disabled: r,
              "data-testid": "breakpoint-apply-continue-btn",
              className: I(
                "px-3 py-1 text-xs font-semibold bg-success-bg text-text-primary",
                "border-none rounded cursor-pointer font-inherit",
                r && "cursor-wait opacity-70"
              ),
              children: r ? "Applying…" : "Apply & Continue"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: c,
              disabled: r,
              className: I(
                "px-3 py-1 text-xs font-semibold bg-warning text-white",
                "border-none rounded font-inherit",
                r ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              ),
              "data-testid": "breakpoint-continue-btn",
              children: "Continue"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: l,
              disabled: r,
              className: I(
                "px-3 py-1 text-xs font-semibold bg-transparent text-warning-fg",
                "border border-warning rounded font-inherit",
                r ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              ),
              "data-testid": "breakpoint-step-over-btn",
              children: "Step Over"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: p,
              disabled: r,
              className: I(
                "px-3 py-1 text-xs font-semibold bg-transparent text-warning-fg",
                "border border-warning rounded font-inherit",
                r ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              ),
              "data-testid": "breakpoint-resume-all-btn",
              children: "Resume All"
            }
          )
        ] }),
        /* @__PURE__ */ o(
          "div",
          {
            className: "grid [grid-template-columns:minmax(0,1fr)_240px] gap-3 min-h-[280px] max-h-[calc(100vh-220px)]",
            children: [
              /* @__PURE__ */ t("div", { className: "border border-border rounded-md bg-surface-inset overflow-hidden min-h-0", children: x ? /* @__PURE__ */ t(
                il,
                {
                  run: x,
                  activeStepId: n.stepId,
                  editable: !0,
                  onEditBufferChange: h,
                  resetEditBufferKey: d
                }
              ) : /* @__PURE__ */ t("div", { className: "p-3 text-xs text-text-tertiary", children: "Loading run…" }) }),
              /* @__PURE__ */ o(
                "div",
                {
                  "data-testid": "breakpoint-patch-history",
                  className: "border border-border rounded-md bg-surface-inset p-2.5 overflow-auto min-h-0",
                  children: [
                    /* @__PURE__ */ o("div", { className: "text-[10px] font-bold text-text-primary tracking-wide uppercase mb-2", children: [
                      "Patch history (",
                      w.length,
                      ")"
                    ] }),
                    w.length === 0 ? /* @__PURE__ */ t(
                      "div",
                      {
                        className: "text-[11px] text-text-tertiary italic",
                        "data-testid": "breakpoint-patch-history-empty",
                        children: "No patches applied yet."
                      }
                    ) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: w.map((N) => {
                      const y = !!N.revertedAt;
                      return /* @__PURE__ */ o(
                        "div",
                        {
                          "data-testid": `breakpoint-patch-row-${N.patchId}`,
                          className: I(
                            "border border-border rounded p-1.5",
                            y ? "bg-neutral/10 opacity-60" : "bg-code-bg"
                          ),
                          children: [
                            /* @__PURE__ */ o("div", { className: "flex items-center gap-1 text-[10px] text-code-text mb-0.5", children: [
                              /* @__PURE__ */ t("span", { className: "font-mono", children: N.patchId.slice(0, 8) }),
                              N.unvalidated && /* @__PURE__ */ t(
                                "span",
                                {
                                  "data-testid": `breakpoint-patch-unvalidated-${N.patchId}`,
                                  title: "No validator was registered for this step's node type",
                                  className: "px-1 text-[9px] font-bold bg-caution-bg/15 text-caution-fg rounded-sm",
                                  children: "⚠ Unvalidated"
                                }
                              ),
                              y && /* @__PURE__ */ t("span", { className: "px-1 text-[9px] font-bold bg-neutral/20 text-text-tertiary rounded-sm", children: "Reverted" })
                            ] }),
                            /* @__PURE__ */ o("div", { className: "text-[10px] text-code-comment", children: [
                              N.appliedAt,
                              N.appliedBy && /* @__PURE__ */ o(H, { children: [
                                " · ",
                                /* @__PURE__ */ t("span", { className: "text-code-text", children: N.appliedBy })
                              ] })
                            ] }),
                            !y && /* @__PURE__ */ t(
                              "button",
                              {
                                type: "button",
                                "data-testid": `breakpoint-patch-revert-${N.patchId}`,
                                onClick: () => f(N.patchId),
                                disabled: !b || a === N.patchId,
                                title: b ? "Revert this patch" : "Run has progressed past this breakpoint — revert no longer allowed",
                                className: I(
                                  "mt-1 px-2 py-0.5 text-[10px] font-semibold bg-transparent rounded-sm font-inherit",
                                  b ? "text-danger-fg border border-danger cursor-pointer" : "text-text-primary border border-border-emphasis cursor-not-allowed",
                                  a === N.patchId && "cursor-not-allowed"
                                ),
                                children: a === N.patchId ? "Reverting…" : "Revert"
                              }
                            )
                          ]
                        },
                        N.patchId
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
function _({ label: e, required: n, help: r, error: a, children: i, className: s }) {
  return /* @__PURE__ */ o("div", { className: I("flex flex-col", s), children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary", children: [
      e,
      n && /* @__PURE__ */ t("span", { className: "text-danger-fg ml-1", "aria-hidden": "true", children: "●" })
    ] }),
    /* @__PURE__ */ t("div", { className: "mt-1", children: i }),
    a && /* @__PURE__ */ t("div", { role: "alert", className: "text-[11px] text-danger-fg mt-0.5", children: a }),
    !a && r && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: r })
  ] });
}
function ht({ title: e, defaultCollapsed: n = !1, children: r, className: a }) {
  const [i, s] = S(n);
  return /* @__PURE__ */ o("div", { className: I("flex flex-col", a), children: [
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => s((d) => !d),
        className: "flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer font-inherit text-xs font-semibold text-text-secondary",
        children: [
          /* @__PURE__ */ t("span", { children: i ? "▸" : "▾" }),
          " ",
          e
        ]
      }
    ),
    !i && /* @__PURE__ */ t("div", { className: "flex flex-col gap-3 mt-2", children: r })
  ] });
}
function Ne({ children: e, className: n }) {
  return /* @__PURE__ */ t("div", { className: I("flex flex-col gap-3 px-4 py-3", n), children: e });
}
function lt({
  samples: e,
  onSelect: n,
  "aria-label": r = "Suggestions",
  className: a
}) {
  return e.length === 0 ? null : /* @__PURE__ */ t(
    "div",
    {
      className: I("mt-1.5 flex flex-wrap gap-1", a),
      role: "group",
      "aria-label": r,
      "data-testid": "sample-pills",
      children: e.map((i) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => n(i),
          className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer hover:bg-surface-hover",
          children: i
        },
        i
      ))
    }
  );
}
function nr(e) {
  const n = e.data ?? {}, a = `${typeof n.label == "string" && n.label ? n.label : e.type} (${e.type})`, i = (c, l, p) => ({
    path: c,
    source: a,
    sourceNodeId: e.id,
    description: l,
    kind: p
  }), s = typeof n.outputKey == "string" && n.outputKey ? n.outputKey : null, d = s ? `context.${s}` : `context.steps.${e.id}.output`;
  switch (e.type) {
    case "trigger":
      return [
        i("context.trigger", "The full trigger payload.", "object"),
        i("context.trigger.userId", "Who initiated the run.", "string"),
        i("context.trigger.imageRef", "Image supplied with the trigger, if any.", "image")
      ];
    case "llm":
      return [
        i(d, "Model completion text.", "string"),
        i(`context.steps.${e.id}.usage`, "Token usage for this call.", "object")
      ];
    case "transform":
      return [i(d, "Result of the transform expression.", "object")];
    case "action":
      return [i(d, "Response returned by the action.", "object")];
    case "memory":
      return n.mode === "write" ? [
        i(d, "Result of the memory write.", "object"),
        i(`${d}.written`, "Whether the value was persisted.", "boolean"),
        i(`${d}.key`, "The resolved key that was written.", "string")
      ] : [
        i(d, "Result of the memory read.", "object"),
        i(`${d}.value`, "The recalled value, or null on a miss.", "object"),
        i(`${d}.found`, "Whether a record existed for the key.", "boolean"),
        i(`${d}.key`, "The resolved key that was read.", "string")
      ];
    case "scatter":
      return [
        i(`context.steps.${e.id}.items`, "The fanned-out items.", "array"),
        i(`context.steps.${e.id}.index`, "Index of the current item.", "number")
      ];
    case "condition":
      return [i(`context.steps.${e.id}.matched`, "Whether the condition passed.", "boolean")];
    case "image-source":
    case "image:generate":
    case "image:variation":
    case "image:edit-prompt":
    case "image:resize":
    case "image:transform":
    case "image:format-convert":
    case "image:sharpen":
    case "image:watermark":
    case "image:crop":
    case "image:adjust-bw":
    case "image:adjust-layer":
    case "image:upscale":
    case "image:save":
      return [i(`context.steps.${e.id}.imageRef`, "Image produced by this step.", "image")];
    case "image:dimensions":
      return [
        i(`context.steps.${e.id}.width`, "Image width in pixels.", "number"),
        i(`context.steps.${e.id}.height`, "Image height in pixels.", "number")
      ];
    case "image:vision-analyze":
    case "image:vision-classify":
    case "image:vision-describe":
    case "image:vision-tag":
    case "image:vision-extract-text":
      return [
        i(d, "Structured vision result, shaped by the output schema.", "object"),
        i(`context.steps.${e.id}.usage`, "Token usage for the vision call.", "object")
      ];
    default:
      return [i(d, "Output of this step.", "object")];
  }
}
function vn(e, n) {
  const r = /* @__PURE__ */ new Map();
  for (const d of e) {
    const c = r.get(d.target);
    c ? c.push(d.source) : r.set(d.target, [d.source]);
  }
  const a = [], i = /* @__PURE__ */ new Set([n]);
  let s = r.get(n) ?? [];
  for (; s.length; ) {
    const d = [];
    for (const c of s)
      i.has(c) || (i.add(c), a.push(c), d.push(...r.get(c) ?? []));
    s = d;
  }
  return a;
}
function ll(e, n, r) {
  const a = new Map(e.map((c) => [c.id, c])), i = [], s = /* @__PURE__ */ new Set(), d = (c) => {
    s.has(c.path) || (s.add(c.path), i.push(c));
  };
  for (const c of vn(n, r)) {
    const l = a.get(c);
    l && nr(l).forEach(d);
  }
  if (!s.has("context.trigger")) {
    const c = e.find((l) => l.type === "trigger");
    c && nr(c).forEach(d);
  }
  return i;
}
function cl(e, n) {
  const r = new Set(n.map((i) => i.path)), a = /* @__PURE__ */ new Set();
  for (const i of e.matchAll(/\{\{\s*([\w.[\]-]+)\s*\}\}/g))
    a.add(i[1]);
  return [...a].filter((i) => r.has(i) ? !1 : ![...r].some((s) => i.startsWith(`${s}.`)));
}
const dl = /* @__PURE__ */ new Set([
  "image-source",
  "image:generate",
  "image:variation",
  "image:edit-prompt",
  "image:resize",
  "image:transform",
  "image:format-convert",
  "image:sharpen",
  "image:watermark",
  "image:crop",
  "image:adjust-bw",
  "image:adjust-layer",
  "image:upscale",
  "image:save"
]);
function pl(e, n, r) {
  const a = new Map(e.map((l) => [l.id, l])), i = [], s = /* @__PURE__ */ new Set(), d = (l) => {
    s.has(l.path) || (s.add(l.path), i.push(l));
  };
  for (const l of vn(n, r)) {
    const p = a.get(l);
    if (!p || !dl.has(p.type)) continue;
    const u = p.data ?? {}, f = typeof u.label == "string" && u.label ? u.label : p.type;
    d({
      path: `$.steps.${p.id}.output.imageId`,
      source: `${f} (${p.type})`,
      sourceNodeId: p.id
    });
  }
  const c = e.find((l) => l.type === "trigger");
  d({
    path: "$.trigger.imageRef",
    source: c ? "Trigger payload" : "Trigger payload (no trigger node yet)",
    sourceNodeId: c?.id ?? ""
  });
  for (const l of vn(n, r))
    if (a.get(l)?.type === "scatter") {
      d({ path: "$.scatter.parentImageId", source: "Scatter (parent image)", sourceNodeId: l });
      break;
    }
  return i;
}
function Yt(e) {
  const n = Kt(In)?.definition ?? null, r = n?.nodes ?? [], a = n?.edges ?? [], i = W(
    () => e ? ll(r, a, e) : [],
    [r, a, e]
  );
  return W(
    () => ({
      paths: i,
      unresolved: (s) => cl(s, i)
    }),
    [i]
  );
}
function wt(e) {
  const n = Kt(In)?.definition ?? null, r = n?.nodes ?? [], a = n?.edges ?? [];
  return W(
    () => e ? pl(r, a, e) : [],
    [r, a, e]
  );
}
function Be({
  value: e,
  onChange: n,
  nodeId: r,
  label: a = "Source image path",
  help: i = "Optional. Defaults to the image produced upstream.",
  placeholder: s = "$.trigger.imageRef"
}) {
  const d = wt(r ?? null);
  return /* @__PURE__ */ o(_, { label: a, help: i, children: [
    /* @__PURE__ */ t(
      we,
      {
        size: "sm",
        mono: !0,
        spellCheck: !1,
        value: e ?? "",
        onChange: (c) => n(c.target.value.trim() || void 0),
        placeholder: s,
        "aria-label": a
      }
    ),
    /* @__PURE__ */ t(
      lt,
      {
        samples: d.map((c) => c.path),
        onSelect: n,
        "aria-label": "Upstream image refs"
      }
    )
  ] });
}
function at({
  label: e,
  checked: n,
  onChange: r,
  help: a,
  disabled: i,
  "data-testid": s
}) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ t(
        na,
        {
          size: "sm",
          checked: n,
          onChange: r,
          disabled: i,
          "aria-label": e,
          "data-testid": s
        }
      ),
      /* @__PURE__ */ t("span", { className: "text-xs font-semibold text-text-secondary", children: e })
    ] }),
    a && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: a })
  ] });
}
const ul = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function ml(e, n, r) {
  const a = e.trim();
  if (a === "") return null;
  const i = /^\*\/(\d+)$/.exec(a);
  if (i) {
    const c = Number(i[1]);
    return !Number.isFinite(c) || c <= 0 ? null : { match: "*", step: c };
  }
  if (a === "*") return { match: "*" };
  const s = /^(\d+)-(\d+)$/.exec(a);
  if (s) {
    const c = Number(s[1]), l = Number(s[2]);
    if (!Number.isFinite(c) || !Number.isFinite(l) || c < n || l > r || c > l) return null;
    const p = [];
    for (let u = c; u <= l; u++) p.push(u);
    return { match: p };
  }
  if (a.includes(",")) {
    const c = a.split(","), l = /* @__PURE__ */ new Set(), p = [];
    for (const u of c) {
      const f = Number(u.trim());
      if (!Number.isFinite(f) || !Number.isInteger(f) || f < n || f > r) return null;
      l.has(f) || (l.add(f), p.push(f));
    }
    return p.length === 0 ? null : { match: p };
  }
  const d = Number(a);
  return !Number.isFinite(d) || !Number.isInteger(d) || d < n || d > r ? null : { match: [d] };
}
function hl(e) {
  if (typeof e != "string") return null;
  const n = e.trim().split(/\s+/);
  if (n.length !== 5) return null;
  const r = {};
  for (let a = 0; a < 5; a++) {
    const i = ul[a], s = ml(n[a], i.min, i.max);
    if (!s) return null;
    r[i.name] = s;
  }
  return r;
}
function Ct(e, n, r) {
  return e.match === "*" ? !e.step || e.step === 1 ? !0 : (n - r) % e.step === 0 : e.match.includes(n);
}
function fl(e, n) {
  return Ct(e.minute, n.getMinutes(), 0) && Ct(e.hour, n.getHours(), 0) && Ct(e.dayOfMonth, n.getDate(), 1) && Ct(e.month, n.getMonth() + 1, 1) && Ct(e.dayOfWeek, n.getDay(), 0);
}
function gl(e, n, r) {
  const a = [], i = new Date(n.getTime());
  i.setSeconds(0, 0), i.setMinutes(i.getMinutes() + 1);
  const s = 1440 * 366, d = new Date(i.getTime());
  for (let c = 0; c < s && a.length < r; c++)
    fl(e, d) && a.push(new Date(d.getTime())), d.setMinutes(d.getMinutes() + 1);
  return a;
}
const rr = /^[a-zA-Z0-9_-]{1,64}$/, xl = "http://localhost:13001";
function bl() {
  try {
    const e = localStorage.getItem("ws_document_types_v1");
    if (!e) return [];
    const n = JSON.parse(e);
    return Array.isArray(n) ? n.filter((r) => typeof r == "object" && r !== null).filter((r) => typeof r.id == "string" && typeof r.name == "string").map((r) => ({ id: r.id, name: r.name })) : [];
  } catch {
    return [];
  }
}
const yl = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function vl({ data: e, onChange: n }) {
  const { toast: r } = Jt(), i = Kt(In)?.definition?.triggerBinding?.webhookSecret, [s, d] = S(!1), c = e.triggerType.startsWith("document."), l = W(() => c ? bl() : [], [c]), p = c && !e.documentTypeId, u = e.triggerType === "schedule" && !e.schedule, f = e.triggerType === "webhook" && !e.webhookPath, h = e.webhookPath ?? "", g = e.triggerType === "webhook" && h.length > 0 && !rr.test(h), x = e.triggerType === "webhook" && rr.test(h) ? `${xl}/hooks/pipeline/${h}` : null, m = () => {
    x && navigator.clipboard.writeText(x).then(() => r("Webhook URL copied", { type: "success" })).catch(() => r("Could not copy webhook URL", { type: "error" }));
  }, w = () => {
    i && navigator.clipboard.writeText(i).then(() => r("Webhook secret copied", { type: "success" })).catch(() => r("Could not copy webhook secret", { type: "error" }));
  }, v = e.triggerType === "schedule" ? e.schedule ?? "" : "", b = W(
    () => v ? hl(v) : null,
    [v]
  ), N = W(() => b ? gl(b, /* @__PURE__ */ new Date(), 3) : [], [b]), y = e.triggerType === "schedule" && !!v && !b, k = e.triggerType === "document.finalize" ? "On finalize" : e.triggerType === "document.submit" ? "On submit for review" : e.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(_, { label: "Trigger type", required: !0, children: /* @__PURE__ */ t(
      Ce,
      {
        size: "sm",
        value: e.triggerType,
        onChange: (C) => n({ triggerType: C.target.value }),
        "aria-label": "Trigger type",
        options: yl
      }
    ) }),
    c && /* @__PURE__ */ o(
      _,
      {
        label: "Document type",
        required: !0,
        error: p ? "Select a document type." : void 0,
        help: p ? void 0 : "Which document type should trigger this pipeline.",
        children: [
          /* @__PURE__ */ t(
            Ce,
            {
              size: "sm",
              invalid: p,
              value: e.documentTypeId ?? "",
              onChange: (C) => n({ documentTypeId: C.target.value || void 0 }),
              "aria-label": "Document type",
              options: [
                { value: "", label: "— select a document type —" },
                ...l.map((C) => ({ value: C.id, label: C.name }))
              ]
            }
          ),
          k && /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary mt-1.5", children: [
            "Event: ",
            /* @__PURE__ */ t("span", { className: "font-semibold text-text-secondary", children: k })
          ] })
        ]
      }
    ),
    e.triggerType === "schedule" && /* @__PURE__ */ o(
      _,
      {
        label: "Schedule (cron)",
        required: !0,
        error: u ? "Cron expression is required." : y ? "Invalid cron expression — supports *, */N, N,M, A-B, exact values." : void 0,
        help: !u && !y ? "5-field cron: minute hour day month weekday." : void 0,
        children: [
          /* @__PURE__ */ t(
            we,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              invalid: u || y,
              placeholder: "*/15 * * * *",
              value: e.schedule ?? "",
              onChange: (C) => n({ schedule: C.target.value }),
              "aria-label": "Cron schedule"
            }
          ),
          /* @__PURE__ */ t("div", { className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono", children: N.length > 0 ? /* @__PURE__ */ o(H, { children: [
            /* @__PURE__ */ t("div", { className: "text-text-secondary mb-1", children: "Next 3 fires:" }),
            N.map((C, T) => /* @__PURE__ */ t("div", { children: C.toLocaleString() }, T))
          ] }) : /* @__PURE__ */ t("span", { children: "Next fires: enter a valid cron expression to preview." }) })
        ]
      }
    ),
    e.triggerType === "webhook" && /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ t(
        _,
        {
          label: "Path",
          required: !0,
          error: f ? "Webhook path is required." : g ? "Path must be alphanumeric (plus _, -)" : void 0,
          help: !f && !g ? "Alphanumeric, _, or - (max 64 chars). No leading slash." : void 0,
          children: /* @__PURE__ */ t(
            we,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              invalid: f || g,
              placeholder: "weekly-digest",
              value: h,
              onChange: (C) => n({ webhookPath: C.target.value }),
              "aria-label": "Webhook path"
            }
          )
        }
      ),
      /* @__PURE__ */ t("div", { className: "p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: x ? /* @__PURE__ */ o(H, { children: [
        /* @__PURE__ */ o("span", { className: "flex-1", children: [
          /* @__PURE__ */ t("span", { className: "font-sans text-text-tertiary mr-1", children: "Full URL:" }),
          x
        ] }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: m,
            className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
            children: "Copy"
          }
        )
      ] }) : /* @__PURE__ */ t("span", { className: "font-sans text-text-tertiary", children: "Set a path above to see the URL" }) }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("label", { className: "text-xs font-semibold text-text-secondary", children: "Signing secret" }),
        /* @__PURE__ */ t("div", { className: "mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: i ? /* @__PURE__ */ o(H, { children: [
          /* @__PURE__ */ t("span", { className: "flex-1", "aria-label": "webhook secret", children: s ? i : "•".repeat(32) }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => d((C) => !C),
              className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
              children: s ? "Hide" : "Reveal"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: w,
              className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
              children: "Copy"
            }
          )
        ] }) : /* @__PURE__ */ o("span", { className: "font-sans text-text-tertiary", children: [
          "Save the pipeline to mint a signing secret. External callers must send ",
          /* @__PURE__ */ t("code", { children: "X-Pipeline-Signature-256: sha256=<hmac>" }),
          "."
        ] }) }),
        /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: [
          "HMAC-SHA256 of the raw request body. Send as",
          " ",
          /* @__PURE__ */ t("code", { children: "X-Pipeline-Signature-256: sha256=<hex>" }),
          "."
        ] })
      ] })
    ] })
  ] });
}
const or = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, wl = 3e4;
function Nl(e) {
  return e < 1e3 ? `${Math.round(e)}ms` : e < 6e4 ? `${(e / 1e3).toFixed(e < 1e4 ? 1 : 0)}s` : `${Math.round(e / 6e4)}m`;
}
function kl(e) {
  const n = [];
  for (let r = 1; r < e.maxAttempts; r++) {
    const a = e.backoffMs * Math.pow(e.backoffMultiplier, r - 1);
    n.push(Math.min(a, wl));
  }
  return n;
}
function Lt({ value: e, onChange: n }) {
  const r = e !== void 0, a = e ?? or, i = r ? kl(a) : [], d = i.reduce((c, l) => c + l, 0) > 300 * 1e3;
  return /* @__PURE__ */ o("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ t(
      at,
      {
        label: "Retry policy",
        checked: r,
        onChange: (c) => n(c ? or : void 0),
        help: r ? void 0 : "No retries — failure is terminal on first attempt.",
        "data-testid": "retry-policy-enabled"
      }
    ),
    r && /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-3 gap-2 mt-1", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Max attempts" }),
          /* @__PURE__ */ t(
            he,
            {
              size: "sm",
              min: 1,
              max: 10,
              step: 1,
              value: a.maxAttempts,
              onChange: (c) => n({ ...a, maxAttempts: c }),
              "aria-label": "Max attempts"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Initial backoff (ms)" }),
          /* @__PURE__ */ t(
            he,
            {
              size: "sm",
              min: 0,
              step: 100,
              unit: "ms",
              value: a.backoffMs,
              onChange: (c) => n({ ...a, backoffMs: c }),
              "aria-label": "Initial backoff in milliseconds"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Backoff multiplier" }),
          /* @__PURE__ */ t(
            he,
            {
              size: "sm",
              min: 1,
              max: 4,
              step: 0.5,
              value: a.backoffMultiplier,
              onChange: (c) => n({ ...a, backoffMultiplier: c }),
              "aria-label": "Backoff multiplier"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: a.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : i.length === 0 ? `Retries up to ${a.maxAttempts}× with no delay.` : `Retries up to ${a.maxAttempts}× with delays: ${i.map(Nl).join(", ")}.` }),
      d && /* @__PURE__ */ t("div", { className: "text-[11px] text-warning-fg mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const Cl = {
  string: "bg-info-bg text-info-fg border-info-border",
  number: "bg-accent-bg text-accent-fg border-accent-border",
  boolean: "bg-warning-bg text-warning-fg border-warning-border",
  object: "bg-neutral-bg text-neutral-fg border-neutral-border",
  array: "bg-neutral-bg text-neutral-fg border-neutral-border",
  image: "bg-success-bg text-success-fg border-success-border"
};
function Xt({
  paths: e,
  unresolved: n = [],
  onInsert: r,
  onRevealNode: a,
  className: i
}) {
  return /* @__PURE__ */ o("div", { className: I("flex flex-col gap-1.5", i), "data-testid": "context-variable-picker", children: [
    e.length === 0 ? /* @__PURE__ */ t("p", { className: "m-0 text-[11px] text-text-tertiary", "data-testid": "context-picker-empty", children: "No upstream context yet — connect this node to a trigger or an earlier step and its outputs will appear here." }) : /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: e.map((s) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => r(`{{${s.path}}}`),
          title: `${s.description}
from ${s.source}`,
          className: I(
            "rounded-full border px-2 py-0.5 font-mono text-[10px] cursor-pointer",
            "hover:brightness-95 transition-[filter]",
            Cl[s.kind]
          ),
          "data-testid": `context-pill-${s.path}`,
          children: s.path.replace(/^context\./, "")
        },
        s.path
      )) }),
      /* @__PURE__ */ t("p", { className: "m-0 text-[11px] text-text-tertiary", children: "Click to insert. Derived from what is actually upstream of this node." })
    ] }),
    n.length > 0 && /* @__PURE__ */ o(
      "div",
      {
        className: "rounded-md border border-warning-border bg-warning-bg px-2 py-1.5",
        "data-testid": "context-unresolved",
        children: [
          /* @__PURE__ */ t("p", { className: "m-0 text-[11px] font-semibold text-warning-fg", children: n.length === 1 ? "This path is not provided by anything upstream:" : `${n.length} paths are not provided by anything upstream:` }),
          /* @__PURE__ */ t("ul", { className: "m-0 mt-1 list-none p-0", children: n.map((s) => /* @__PURE__ */ t("li", { className: "font-mono text-[11px] text-warning-fg", children: `{{${s}}}` }, s)) }),
          /* @__PURE__ */ t("p", { className: "m-0 mt-1 text-[10px] text-warning-fg", children: "It will resolve to nothing at run time. Wire in the step that produces it, or fix the path." })
        ]
      }
    ),
    a && e.length > 0 && /* @__PURE__ */ o("details", { className: "text-[11px] text-text-secondary", children: [
      /* @__PURE__ */ t("summary", { className: "cursor-pointer select-none", children: "Where each value comes from" }),
      /* @__PURE__ */ t("ul", { className: "m-0 mt-1 list-none p-0", children: e.map((s) => /* @__PURE__ */ o("li", { className: "flex items-baseline gap-1.5 py-0.5", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => a(s.sourceNodeId),
            className: "bg-transparent border-none p-0 cursor-pointer text-primary underline font-inherit text-[11px]",
            children: s.source
          }
        ),
        /* @__PURE__ */ t("span", { className: "font-mono text-[10px] text-text-tertiary", children: s.path })
      ] }, s.path)) })
    ] })
  ] });
}
const Il = [
  { value: "anthropic", label: "Anthropic" },
  { value: "bedrock", label: "Bedrock" },
  { value: "claude-code", label: "Claude Code (subprocess)" }
], Sl = {
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
};
function Tl(e, n) {
  switch (n) {
    case "image":
      return `<image from ${e}>`;
    case "number":
      return "123";
    case "boolean":
      return "true";
    case "array":
      return "[ … ]";
    case "object":
      return "{ … }";
    default:
      return `<${e}>`;
  }
}
function ar(e, n) {
  return e.replace(/\{\{\s*([\w.[\]-]+)\s*\}\}/g, (r, a) => {
    const i = n.get(a);
    return i ? Tl(a, i) : `{{${a}}}`;
  });
}
function $l({ data: e, onChange: n, nodeId: r }) {
  const [a, i] = S(!1), { paths: s, unresolved: d } = Yt(r ?? null), c = new Map(s.map((m) => [m.path, m.kind])), l = d(
    `${e.systemPrompt ?? ""}
${e.userPromptTemplate ?? ""}`
  ), p = !e.systemPrompt?.trim(), u = !e.userPromptTemplate?.trim(), f = Ro(), h = (m) => f(
    `llm:${m}`,
    Sl[m].map((w) => ({ value: w }))
  ), g = h(e.provider), x = (m) => {
    const w = h(m).map((b) => b.value), v = w.includes(e.model) ? e.model : w[0];
    n({ provider: m, model: v });
  };
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(_, { label: "Provider", required: !0, children: /* @__PURE__ */ t(
      Ce,
      {
        size: "sm",
        value: e.provider,
        onChange: (m) => x(m.target.value),
        "aria-label": "Provider",
        options: Il
      }
    ) }),
    /* @__PURE__ */ t(_, { label: "Model", required: !0, children: /* @__PURE__ */ t(
      Ce,
      {
        size: "sm",
        value: e.model,
        onChange: (m) => n({ model: m.target.value }),
        "aria-label": "Model",
        options: g.map((m) => ({
          value: m.value,
          label: m.label ?? m.value
        }))
      }
    ) }),
    /* @__PURE__ */ t(_, { label: "Available context", children: /* @__PURE__ */ t(
      Xt,
      {
        paths: s,
        unresolved: l,
        onInsert: (m) => n({ userPromptTemplate: `${e.userPromptTemplate ?? ""}${m}` })
      }
    ) }),
    /* @__PURE__ */ t(
      _,
      {
        label: "System prompt",
        required: !0,
        error: p ? "System prompt is required." : void 0,
        help: p ? void 0 : "Sets the model's role and constraints.",
        children: /* @__PURE__ */ t(
          $e,
          {
            rows: 4,
            invalid: p,
            value: e.systemPrompt,
            onChange: (m) => n({ systemPrompt: m.target.value }),
            "aria-label": "System prompt"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "User prompt template",
        required: !0,
        error: u ? "User prompt template is required." : void 0,
        help: u ? void 0 : "Supports {{ context.* }} substitution — click a pill above to append.",
        children: /* @__PURE__ */ t(
          Rn,
          {
            value: e.userPromptTemplate,
            onChange: (m) => n({ userPromptTemplate: m }),
            language: "template",
            variables: s.map((m) => m.path),
            minLines: 6,
            "aria-label": "User prompt template"
          }
        )
      }
    ),
    /* @__PURE__ */ o(ht, { title: "Advanced", defaultCollapsed: !0, children: [
      /* @__PURE__ */ t(
        _,
        {
          label: "Temperature",
          help: "0 = deterministic, 1 = creative.",
          children: /* @__PURE__ */ t(
            Sn,
            {
              min: 0,
              max: 1,
              step: 0.1,
              value: e.temperature ?? 0.7,
              onChange: (m) => n({ temperature: m }),
              readout: (m) => m.toFixed(1),
              "aria-label": "Temperature",
              "data-testid": "llm-temperature"
            }
          )
        }
      ),
      /* @__PURE__ */ t(_, { label: "Max tokens", help: "Upper bound on response length.", children: /* @__PURE__ */ t(
        he,
        {
          size: "sm",
          min: 1,
          value: e.maxTokens,
          onChange: (m) => n({ maxTokens: m }),
          onClear: () => n({ maxTokens: void 0 }),
          "aria-label": "Max tokens",
          "data-testid": "llm-max-tokens"
        }
      ) }),
      /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(
        at,
        {
          label: "Streaming",
          checked: e.streaming,
          onChange: (m) => n({ streaming: m }),
          help: "Stream tokens as they are generated.",
          "data-testid": "llm-streaming"
        }
      ) }),
      /* @__PURE__ */ t(
        Lt,
        {
          value: e.retryPolicy,
          onChange: (m) => n({ retryPolicy: m })
        }
      )
    ] }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => i((m) => !m),
        className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit shrink-0",
        children: [
          a ? "▾" : "▶",
          " Preview with sample context"
        ]
      }
    ),
    a && /* @__PURE__ */ o("div", { className: "bg-surface-inset border border-border rounded-lg p-3 flex flex-col gap-2.5", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved system prompt" }),
        /* @__PURE__ */ t("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: ar(e.systemPrompt || "(empty)", c) })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ t("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: ar(e.userPromptTemplate || "(empty)", c) })
      ] }),
      /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary", children: s.length > 0 ? "Placeholders describe the shape of each upstream value; unresolved paths stay in braces." : "No upstream context — connect this node to see what it can reference." })
    ] })
  ] });
}
const Al = ["context", "context.steps", "context.trigger"], Rl = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function Pl({ data: e, onChange: n }) {
  const r = !e.expression?.trim();
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(_, { label: "Type", required: !0, children: /* @__PURE__ */ t(
      Et,
      {
        name: "transform-type",
        value: e.transformType,
        onChange: (a) => n({ transformType: a }),
        options: Rl.map((a) => ({ value: a.value, label: a.label })),
        "data-testid": "transform-type"
      }
    ) }),
    /* @__PURE__ */ t(
      _,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : e.transformType === "jsonpath" ? 'e.g. $.items[?(@.status == "active")]' : e.transformType === "template" ? "Mustache-style: {{ context.doc.title }}" : e.transformType === "javascript" ? "return ctx.items.filter(x => x.active)" : void 0,
        children: /* @__PURE__ */ t(
          Rn,
          {
            value: e.expression,
            onChange: (a) => n({ expression: a }),
            language: e.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: Al,
            "aria-label": "Transform expression"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Output key (optional)",
        help: `If set, writes to context.${e.outputKey || "outputKey"}. Otherwise merges into root context.`,
        children: /* @__PURE__ */ t(
          we,
          {
            size: "sm",
            mono: !0,
            spellCheck: !1,
            value: e.outputKey ?? "",
            onChange: (a) => n({ outputKey: a.target.value || void 0 }),
            placeholder: "activeItems",
            "aria-label": "Output key"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      Lt,
      {
        value: e.retryPolicy,
        onChange: (a) => n({ retryPolicy: a })
      }
    ),
    /* @__PURE__ */ t(_, { label: "Preview", children: /* @__PURE__ */ t(
      qe,
      {
        title: "Preview not available yet",
        body: "Sample input and output for a transform will render here once the preview runner ships."
      }
    ) })
  ] });
}
const Dl = ["context.trigger", "context.steps"];
function Ml({ data: e, onChange: n }) {
  const r = !e.expression?.trim();
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      _,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : "e.g. context.llm.response.length > 500",
        children: /* @__PURE__ */ t(
          Rn,
          {
            value: e.expression,
            onChange: (a) => n({ expression: a }),
            language: "javascript",
            variables: Dl,
            "aria-label": "Condition expression"
          }
        )
      }
    ),
    /* @__PURE__ */ t(_, { label: "Label (optional — shown on node face)", help: "A short name so this branch is easy to spot.", children: /* @__PURE__ */ t(
      we,
      {
        size: "sm",
        value: e.label ?? "",
        onChange: (a) => n({ label: a.target.value || void 0 }),
        placeholder: "Long summary?",
        "aria-label": "Condition label"
      }
    ) })
  ] });
}
const El = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], Ol = {
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
}, _l = [
  { value: "route-error", label: "Route to error handle" },
  { value: "halt", label: "Halt pipeline" },
  { value: "retry", label: "Retry a fixed number of times" }
], Ll = [
  { value: "per-step", label: "Per step — fire once regardless of retries" },
  { value: "per-attempt", label: "Per attempt — fire once per retry window" }
];
function Bl({ data: e, onChange: n }) {
  const r = Ol[e.actionType], a = e.config ?? {}, i = typeof a.retryCount == "number" ? a.retryCount : 3, s = e.onError === "route-error" ? "route-error" : typeof a.retryCount == "number" ? "retry" : "halt", d = (l, p) => {
    n({ config: { ...a, [l]: p } });
  }, c = (l) => {
    if (l === "route-error") {
      const { retryCount: p, ...u } = a;
      n({ onError: "route-error", config: u });
    } else if (l === "halt") {
      const { retryCount: p, ...u } = a;
      n({ onError: "fail-run", config: u });
    } else
      n({ onError: "fail-run", config: { ...a, retryCount: i } });
  };
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(_, { label: "Action type", required: !0, children: /* @__PURE__ */ t(
      Ce,
      {
        size: "sm",
        value: e.actionType,
        onChange: (l) => n({ actionType: l.target.value, config: {} }),
        "aria-label": "Action type",
        options: El
      }
    ) }),
    /* @__PURE__ */ t(_, { label: "Configuration", children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2.5", children: r.map((l) => /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: l.label }),
      l.multiline ? /* @__PURE__ */ t(
        $e,
        {
          rows: 2,
          placeholder: l.placeholder,
          value: typeof a[l.key] == "string" ? a[l.key] : "",
          onChange: (p) => d(l.key, p.target.value),
          "aria-label": l.label
        }
      ) : /* @__PURE__ */ t(
        we,
        {
          size: "sm",
          placeholder: l.placeholder,
          value: typeof a[l.key] == "string" ? a[l.key] : "",
          onChange: (p) => d(l.key, p.target.value),
          "aria-label": l.label
        }
      ),
      l.help && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: l.help })
    ] }, l.key)) }) }),
    /* @__PURE__ */ t(
      at,
      {
        label: "Idempotent",
        checked: !!e.idempotent,
        onChange: (l) => n({ idempotent: l }),
        help: "This action is safe to retry.",
        "data-testid": "action-idempotent"
      }
    ),
    e.idempotent && /* @__PURE__ */ o(_, { label: "Dedup scope", children: [
      /* @__PURE__ */ t(
        Ce,
        {
          size: "sm",
          value: e.idempotencyMode ?? "per-step",
          onChange: (l) => n({ idempotencyMode: l.target.value }),
          "aria-label": "Dedup scope",
          options: Ll
        }
      ),
      /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: (e.idempotencyMode ?? "per-step") === "per-step" ? "Retries skip this action if it already succeeded. Best for post-comment, notify." : "Each retry attempt can execute the action. Best for idempotent PUTs/webhooks." })
    ] }),
    /* @__PURE__ */ t(
      Lt,
      {
        value: e.retryPolicy,
        onChange: (l) => n({ retryPolicy: l })
      }
    ),
    /* @__PURE__ */ o(_, { label: "On error", children: [
      /* @__PURE__ */ t(
        Et,
        {
          name: "action-on-error",
          value: s,
          onChange: c,
          options: _l,
          "data-testid": "action-on-error"
        }
      ),
      s === "retry" && /* @__PURE__ */ o("div", { className: "mt-2 flex items-center gap-2", children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-text-secondary", children: "Attempts" }),
        /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 1,
            value: i,
            onChange: (l) => n({ onError: "fail-run", config: { ...a, retryCount: l } }),
            "data-testid": "action-retry-count"
          }
        )
      ] })
    ] })
  ] });
}
const ut = 2, It = 8;
function ir(e, n) {
  const r = e ?? [];
  return r.length === n ? r : r.length > n ? r.slice(0, n) : [...r, ...Array(n - r.length).fill("")];
}
function Ul({ data: e, onChange: n }) {
  const r = Math.max(ut, Math.min(It, e.branchCount || ut)), a = ir(e.branchLabels, r), i = (d) => {
    const c = Math.max(ut, Math.min(It, d));
    n({
      branchCount: c,
      branchLabels: ir(e.branchLabels, c)
    });
  }, s = (d, c) => {
    const l = [...a];
    l[d] = c, n({ branchLabels: l });
  };
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o(
      _,
      {
        label: "Branch count",
        required: !0,
        help: `Between ${ut} and ${It} parallel branches.`,
        children: [
          /* @__PURE__ */ t(
            Sn,
            {
              min: ut,
              max: It,
              step: 1,
              value: r,
              onChange: i,
              "aria-label": "Branch count",
              "data-testid": "fork-branch-slider"
            }
          ),
          /* @__PURE__ */ t(
            he,
            {
              size: "sm",
              min: ut,
              max: It,
              value: r,
              onChange: i,
              "data-testid": "fork-branch-count"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(_, { label: "Branch labels (optional)", children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: a.map((d, c) => /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-xs text-text-secondary min-w-[72px]", children: [
        "Branch ",
        c,
        ":"
      ] }),
      /* @__PURE__ */ t(
        we,
        {
          size: "sm",
          value: d,
          onChange: (l) => s(c, l.target.value),
          placeholder: c === 0 ? "primary" : `branch-${c}`,
          "aria-label": `Branch ${c} label`
        }
      )
    ] }, c)) }) })
  ] });
}
const jl = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], zl = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function Fl({ data: e, onChange: n }) {
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o(_, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ t(
        Et,
        {
          name: "join-mode",
          value: e.mode,
          onChange: (r) => n({ mode: r }),
          options: jl.map((r) => ({
            value: r.value,
            label: r.label,
            description: r.hint
          })),
          "data-testid": "join-mode"
        }
      ),
      e.mode === "n_of_m" && /* @__PURE__ */ o("div", { className: "mt-2 flex items-center gap-2", children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-text-secondary", children: "N" }),
        /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 1,
            value: e.n ?? 1,
            onChange: (r) => n({ n: r }),
            "data-testid": "join-n"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t(_, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ t(
      Et,
      {
        name: "join-merge",
        value: e.mergeStrategy,
        onChange: (r) => n({ mergeStrategy: r }),
        options: zl.map((r) => ({
          value: r.value,
          label: r.label,
          description: r.hint
        })),
        "data-testid": "join-merge"
      }
    ) }),
    /* @__PURE__ */ o("div", { className: "p-2 bg-surface-inset border border-border rounded-md text-xs text-text-secondary", children: [
      "Current inputs: ",
      /* @__PURE__ */ t("strong", { children: "TBD" }),
      /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Derived from incoming edges once the canvas is connected." })
    ] })
  ] });
}
const ql = [
  { value: "seconds", label: "seconds" },
  { value: "minutes", label: "minutes" },
  { value: "hours", label: "hours" }
], Wl = [
  { value: "reject", label: "Reject" },
  { value: "approve", label: "Approve" }
], Dt = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5
};
function Vl(e) {
  return !e || e <= 0 ? "minutes" : e % Dt.hours === 0 ? "hours" : e % Dt.minutes === 0 ? "minutes" : "seconds";
}
function Kl({ data: e, onChange: n }) {
  const r = e.approvers ?? [], a = r.length === 0, [i, s] = S(() => Vl(e.timeoutMs)), d = e.timeoutMs !== void 0 ? Math.round(e.timeoutMs / Dt[i]) : "", c = r.filter((g) => g.type === "user").map((g) => g.value), l = (g) => {
    const x = r.filter((v) => v.type === "role"), w = [...g.map((v) => ({ type: "user", value: v })), ...x];
    n({
      approvers: w,
      // Clamp requiredCount so it never exceeds approvers.length (min 1).
      requiredCount: Math.max(1, Math.min(e.requiredCount || 1, w.length || 1))
    });
  }, p = (g) => {
    const x = r.filter((m, w) => w !== g);
    n({
      approvers: x,
      requiredCount: Math.max(1, Math.min(e.requiredCount || 1, x.length || 1))
    });
  }, u = (g) => {
    if (g === "") {
      n({ timeoutMs: void 0 });
      return;
    }
    const x = Math.max(0, parseInt(g, 10) || 0);
    n({ timeoutMs: x * Dt[i] });
  }, f = (g) => {
    s(g), typeof d == "number" && !Number.isNaN(d) && n({ timeoutMs: d * Dt[g] });
  }, h = Math.max(1, r.length);
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o(
      _,
      {
        label: "Approvers",
        required: !0,
        error: a ? "At least one approver is required." : void 0,
        help: a ? void 0 : "Who can approve this step.",
        children: [
          /* @__PURE__ */ t(
            Zo,
            {
              value: c,
              onChange: l,
              placeholder: "Add approver…"
            }
          ),
          r.length > 0 && /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5 mt-2", children: r.map((g, x) => /* @__PURE__ */ o(
            "span",
            {
              className: I(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-[1.4] whitespace-nowrap",
                g.type === "role" ? "bg-warning-bg text-warning-fg" : "bg-info-bg text-info-fg"
              ),
              children: [
                g.type === "role" ? "🎖" : "👤",
                " ",
                g.value,
                /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: () => p(x),
                    "aria-label": `Remove ${g.value}`,
                    className: "bg-transparent border-none p-0 ml-0.5 cursor-pointer text-current font-inherit text-xs leading-none",
                    children: "×"
                  }
                )
              ]
            },
            `${g.type}:${g.value}:${x}`
          )) })
        ]
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Required count",
        required: !0,
        help: "How many approvers must say yes.",
        children: /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t(
            he,
            {
              size: "sm",
              min: 1,
              max: h,
              value: e.requiredCount || 1,
              onChange: (g) => n({ requiredCount: g }),
              "data-testid": "approval-required-count"
            }
          ),
          /* @__PURE__ */ o("span", { className: "text-text-tertiary text-xs whitespace-nowrap", children: [
            "of ",
            h
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ o(_, { label: "Timeout", help: "Leave blank for no timeout.", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 0,
            value: d === "" ? void 0 : Number(d),
            onChange: (g) => u(String(g)),
            onClear: () => u(""),
            placeholder: "24",
            "data-testid": "approval-timeout-value"
          }
        ),
        /* @__PURE__ */ t(
          Ce,
          {
            size: "sm",
            className: "w-[120px] flex-none",
            value: i,
            onChange: (g) => f(g.target.value),
            "aria-label": "Timeout unit",
            options: ql
          }
        )
      ] }),
      e.timeoutMs !== void 0 && e.timeoutMs > 0 && /* @__PURE__ */ o("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold text-text-secondary", children: "If timeout" }),
        /* @__PURE__ */ t("div", { className: "mt-1", children: /* @__PURE__ */ t(
          Et,
          {
            name: "approval-timeout-action",
            orientation: "horizontal",
            value: e.timeoutAction ?? "reject",
            onChange: (g) => n({ timeoutAction: g }),
            options: Wl,
            "data-testid": "approval-timeout-action"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ t(_, { label: "Message for approver (optional)", help: "Shown to the approver when the request is sent.", children: /* @__PURE__ */ t(
      $e,
      {
        rows: 4,
        value: e.message ?? "",
        onChange: (g) => n({ message: g.target.value || void 0 }),
        placeholder: "Please review the summary before it's posted to the document.",
        "aria-label": "Message for approver"
      }
    ) })
  ] });
}
function wn(e) {
  switch (Array.isArray(e.type) ? e.type[0] : e.type) {
    case "array":
      return "array";
    case "object":
      return "object";
    case "string":
      return "string";
    case "number":
    case "integer":
      return "number";
    case "boolean":
      return "boolean";
    default:
      return "unknown";
  }
}
function ro(e) {
  const n = Array.isArray(e.type) ? e.type[0] : e.type;
  if (n === "array") {
    const r = e.items ? Array.isArray(e.items.type) ? e.items.type[0] : e.items.type : void 0;
    return r ? `array of ${r}` : "array";
  }
  return n ?? "unknown";
}
function Mt(e, n, r, a, i) {
  if (i.has(e)) return;
  i.add(e);
  const s = Array.isArray(e.type) ? e.type[0] : e.type, d = [e.anyOf, e.oneOf, e.allOf].filter(Boolean);
  for (const c of d)
    for (const l of c)
      Mt(l, n, r, a, i);
  if (s === "object" && e.properties) {
    for (const [c, l] of Object.entries(e.properties)) {
      const p = `${n}.${c}`, u = wn(l);
      a.push({
        path: p,
        label: `${c} (${ro(l)})`,
        depth: r,
        kind: u,
        isArrayItems: u === "array"
      }), Mt(l, p, r + 1, a, i);
    }
    return;
  }
  if (s === "array") {
    const c = `${n}[*]`, l = e.items, p = l ? wn(l) : "unknown";
    a.push({
      path: c,
      label: `${n.slice(n.lastIndexOf(".") + 1)}[*] (each item)`,
      depth: r,
      kind: p,
      isArrayItems: !0
    }), l && Mt(l, c, r + 1, a, i);
  }
}
function Hl(e, n = "$") {
  if (!e || typeof e != "object") return [];
  const r = [], a = /* @__PURE__ */ new Set();
  if ((Array.isArray(e.type) ? e.type[0] : e.type) === "object" && e.properties)
    for (const [s, d] of Object.entries(e.properties)) {
      const c = `${n}.${s}`, l = wn(d);
      r.push({
        path: c,
        label: `${s} (${ro(d)})`,
        depth: 0,
        kind: l,
        isArrayItems: l === "array"
      }), Mt(d, c, 1, r, a);
    }
  else
    Mt(e, n, 0, r, a);
  return r;
}
const Jl = {};
function Gl() {
  return `${(typeof import.meta < "u" && Jl?.VITE_SOCIAL_API_URL) ?? ""}/api/pipeline/output-schemas`;
}
let on = null, St = null;
async function Yl() {
  return on || (St || (St = fetch(Gl()).then((e) => {
    if (!e.ok) throw new Error(`HTTP ${e.status}`);
    return e.json();
  }).then((e) => (on = e, St = null, e)).catch((e) => {
    throw St = null, e;
  })), St);
}
const Xl = {
  array: "bg-primary-bg text-primary-fg border-primary-border",
  object: "bg-surface-panel text-text-secondary border-border",
  string: "bg-success-bg text-success-fg border-success-border",
  number: "bg-warning-bg text-warning-fg border-warning-border",
  boolean: "bg-pink-50 text-pink-700 border-pink-200",
  unknown: "bg-surface-panel text-text-tertiary border-border"
};
function Ql({ kind: e }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: I(
        "inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4",
        Xl[e]
      ),
      children: e
    }
  );
}
function Zl({ entry: e, isSelected: n, onPick: r }) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      onClick: () => r(e.path),
      "data-testid": `path-row-${e.path}`,
      className: I(
        "w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors duration-100",
        "hover:bg-surface-panel focus:outline-none focus:ring-2 focus:ring-primary/50",
        n && "bg-primary-bg ring-1 ring-inset ring-primary",
        e.isArrayItems && !n && "hover:bg-primary-bg"
      ),
      style: { paddingLeft: `${8 + e.depth * 12}px` },
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            className: I(
              "flex-1 font-mono text-[12px] leading-5 truncate",
              e.isArrayItems ? "text-primary-fg font-semibold" : "text-text-primary"
            ),
            children: e.path
          }
        ),
        /* @__PURE__ */ t(Ql, { kind: e.kind })
      ]
    }
  );
}
function ec({
  value: e,
  onChange: n,
  upstreamKind: r,
  upstreamSchema: a
}) {
  const [i, s] = S("idle"), [d, c] = S(null), l = ce(!0);
  oe(() => (l.current = !0, () => {
    l.current = !1;
  }), []);
  const p = W(() => a !== void 0 ? a : d, [a, d]);
  oe(() => {
    !r || a !== void 0 || (s("loading"), Yl().then((m) => {
      if (!l.current) return;
      const w = m.schemas[r] ?? null;
      c(w), s("done");
    }).catch(() => {
      l.current && s("error");
    }));
  }, [r, a]);
  const u = W(
    () => Hl(p),
    [p]
  ), f = p !== null && u.length > 0, h = E(
    (m) => {
      n(m);
    },
    [n]
  );
  if (!r && a === void 0)
    return /* @__PURE__ */ t(
      Qt,
      {
        value: e,
        onChange: n,
        enforcePrefix: !0,
        "data-testid": "scatter-path-plain-input"
      }
    );
  if (!f)
    return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
      i === "loading" && /* @__PURE__ */ o("p", { className: "text-[11px] text-text-tertiary leading-4", children: [
        "Loading schema for ",
        r,
        "…"
      ] }),
      i === "error" && /* @__PURE__ */ t("p", { className: "text-[11px] text-warning-fg leading-4", children: "Could not load schema — enter path manually." }),
      (i === "done" || a === null) && /* @__PURE__ */ o("p", { className: "text-[11px] text-text-tertiary leading-4", children: [
        "Schema unavailable for ",
        /* @__PURE__ */ t("span", { className: "font-mono", children: r }),
        " — enter path manually."
      ] }),
      /* @__PURE__ */ t(
        Qt,
        {
          value: e,
          onChange: n,
          enforcePrefix: !0,
          "data-testid": "scatter-path-fallback-input"
        }
      )
    ] });
  const x = u.filter((m) => m.isArrayItems).length < u.length;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("p", { className: "text-[11px] text-neutral leading-4", children: [
      "Click a path to set itemsPath.",
      x && /* @__PURE__ */ o(H, { children: [
        " ",
        /* @__PURE__ */ t("span", { className: "text-primary-fg font-semibold", children: "Indigo" }),
        " ",
        "paths are arrays — valid scatter sources."
      ] })
    ] }),
    /* @__PURE__ */ t(
      "div",
      {
        className: "flex flex-col gap-px border border-border rounded-md bg-white max-h-48 overflow-y-auto",
        "data-testid": "scatter-path-tree",
        role: "listbox",
        "aria-label": "Available output paths",
        children: u.map((m) => /* @__PURE__ */ t(
          Zl,
          {
            entry: m,
            isSelected: e === m.path,
            onPick: h
          },
          m.path
        ))
      }
    ),
    /* @__PURE__ */ t(
      Qt,
      {
        value: e,
        onChange: n,
        enforcePrefix: !0,
        "data-testid": "scatter-path-input",
        placeholder: "$.path selected above or type manually"
      }
    )
  ] });
}
function tc(e) {
  const { definition: n } = Ke();
  return W(() => {
    if (!e || !n) return;
    const r = n.edges.find((i) => i.target === e);
    if (!r) return;
    const a = n.nodes.find((i) => i.id === r.source);
    if (a)
      return a.type;
  }, [e, n]);
}
function nc({ data: e, onChange: n }) {
  const { selectedNodeId: r } = Ke(), a = tc(r);
  return e.maxConcurrency, /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      _,
      {
        label: "Items path",
        required: !0,
        error: e.itemsPath?.trim() ? e.itemsPath.startsWith("$.") ? void 0 : "Path must start with $." : "Items path is required.",
        help: "JSONPath into context resolving to an array. Each element becomes one scatter arm.",
        children: /* @__PURE__ */ t(
          ec,
          {
            value: e.itemsPath ?? "",
            onChange: (i) => n({ itemsPath: i }),
            upstreamKind: a
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Item alias",
        help: "Optional, default 'item'. Key written to $.scatter.<alias> for each arm.",
        children: /* @__PURE__ */ t(
          we,
          {
            size: "sm",
            mono: !0,
            spellCheck: !1,
            value: e.itemAlias ?? "",
            onChange: (i) => n({ itemAlias: i.target.value.trim() || void 0 }),
            placeholder: "item",
            "aria-label": "Item alias"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Max concurrency",
        help: "Optional, default 4. Maximum number of arms executing concurrently.",
        children: /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 1,
            max: 64,
            value: e.maxConcurrency,
            onChange: (i) => n({ maxConcurrency: i }),
            onClear: () => n({ maxConcurrency: void 0 }),
            placeholder: "4",
            "data-testid": "scatter-max-concurrency"
          }
        )
      }
    )
  ] });
}
const rc = [
  { value: "cover", label: "cover" },
  { value: "contain", label: "contain" },
  { value: "fill", label: "fill" },
  { value: "inside", label: "inside" },
  { value: "outside", label: "outside" }
];
function oc({ data: e, onChange: n, nodeId: r }) {
  const a = e.fit ?? "cover", i = a === "contain" || a === "fill";
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      Be,
      {
        value: e.sourceImagePath,
        onChange: (s) => n({ sourceImagePath: s }),
        nodeId: r
      }
    ),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ t("div", { className: "flex-1", children: /* @__PURE__ */ t(_, { label: "Width", children: /* @__PURE__ */ t(
        he,
        {
          size: "sm",
          min: 1,
          step: 1,
          unit: "px",
          value: e.width,
          onChange: (s) => n({ width: s }),
          onClear: () => n({ width: void 0 }),
          placeholder: "e.g. 512",
          "data-testid": "resize-width"
        }
      ) }) }),
      /* @__PURE__ */ t("div", { className: "flex-1", children: /* @__PURE__ */ t(_, { label: "Height", children: /* @__PURE__ */ t(
        he,
        {
          size: "sm",
          min: 1,
          step: 1,
          unit: "px",
          value: e.height,
          onChange: (s) => n({ height: s }),
          onClear: () => n({ height: void 0 }),
          placeholder: "e.g. 512",
          "data-testid": "resize-height"
        }
      ) }) })
    ] }),
    /* @__PURE__ */ t(
      _,
      {
        label: "Fit mode",
        help: "How the image fits the target dimensions. cover (default) crops, contain letterboxes, fill stretches.",
        children: /* @__PURE__ */ t(
          Ce,
          {
            size: "sm",
            value: a,
            onChange: (s) => n({ fit: s.target.value }),
            "aria-label": "Fit mode",
            options: rc
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      at,
      {
        label: "Do not enlarge if already smaller than target",
        checked: e.withoutEnlargement ?? !1,
        onChange: (s) => n({ withoutEnlargement: s }),
        "data-testid": "resize-without-enlargement"
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Background colour",
        help: i ? "Hex colour used to fill letterbox padding." : "Only applies when fit is contain or fill.",
        children: /* @__PURE__ */ t(
          we,
          {
            size: "sm",
            mono: !0,
            spellCheck: !1,
            value: e.background ?? "",
            onChange: (s) => n({ background: s.target.value.trim() || void 0 }),
            placeholder: "#ffffff",
            "aria-label": "Background colour"
          }
        )
      }
    )
  ] });
}
const ac = [
  { value: "rotate", label: "Rotate" },
  { value: "flip", label: "Flip (vertical)" },
  { value: "flop", label: "Flop (horizontal)" }
];
function ic(e) {
  switch (e) {
    case "rotate":
      return { op: "rotate", degrees: 90 };
    case "flip":
      return { op: "flip" };
    case "flop":
      return { op: "flop" };
    default:
      return { op: "rotate", degrees: 90 };
  }
}
function sc({ op: e, index: n, onUpdate: r, onRemove: a }) {
  const i = e;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2",
      "data-testid": `geo-op-card-${n}`,
      children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary font-semibold min-w-[20px]", children: [
            n + 1,
            "."
          ] }),
          /* @__PURE__ */ t(
            Ce,
            {
              size: "sm",
              className: "flex-1",
              value: e.op,
              onChange: (s) => r(ic(s.target.value)),
              "aria-label": `Op ${n + 1} type`,
              options: ac
            }
          ),
          /* @__PURE__ */ t(
            Pe,
            {
              size: "sm",
              variant: "ghost",
              onClick: a,
              "aria-label": `Remove op ${n + 1}`,
              children: "✕"
            }
          )
        ] }),
        e.op === "rotate" && /* @__PURE__ */ o(H, { children: [
          /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary min-w-[60px]", children: "Degrees" }),
            /* @__PURE__ */ t(
              he,
              {
                size: "sm",
                min: -360,
                max: 360,
                step: 90,
                unit: "°",
                value: i.degrees,
                onChange: (s) => r({ ...e, degrees: s }),
                "data-testid": `geo-op-degrees-${n}`
              }
            )
          ] }),
          /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary min-w-[60px]", children: "Background" }),
            /* @__PURE__ */ t(
              we,
              {
                size: "sm",
                mono: !0,
                spellCheck: !1,
                value: i.background ?? "",
                onChange: (s) => r({
                  ...e,
                  background: s.target.value.trim() || void 0
                }),
                placeholder: "#000000",
                "aria-label": `Op ${n + 1} background`
              }
            )
          ] }),
          /* @__PURE__ */ t(
            at,
            {
              label: "Trim after rotate",
              checked: i.trimAfter ?? !1,
              onChange: (s) => r({ ...e, trimAfter: s }),
              "data-testid": `geo-op-trim-${n}`
            }
          )
        ] })
      ]
    }
  );
}
function lc({
  data: e,
  onChange: n,
  nodeId: r
}) {
  const a = e.operations ?? [], i = (c, l) => {
    n({ operations: a.map((p, u) => u === c ? l : p) });
  }, s = (c) => {
    n({ operations: a.filter((l, p) => p !== c) });
  }, d = () => {
    n({ operations: [...a, { op: "rotate", degrees: 90 }] });
  };
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      Be,
      {
        value: e.sourceImagePath,
        onChange: (c) => n({ sourceImagePath: c }),
        nodeId: r
      }
    ),
    /* @__PURE__ */ o(
      _,
      {
        label: "Operations",
        error: a.length === 0 ? "Add at least one operation." : void 0,
        help: "Applied top-to-bottom. Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror).",
        children: [
          /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: a.map((c, l) => /* @__PURE__ */ t(
            sc,
            {
              op: c,
              index: l,
              onUpdate: (p) => i(l, p),
              onRemove: () => s(l)
            },
            l
          )) }),
          /* @__PURE__ */ t("div", { className: a.length > 0 ? "mt-2" : "", children: /* @__PURE__ */ t(
            Pe,
            {
              size: "sm",
              variant: "secondary",
              onClick: d,
              className: "w-full",
              "data-testid": "add-geo-op-btn",
              children: "+ Add operation"
            }
          ) })
        ]
      }
    )
  ] });
}
const cc = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "avif", label: "AVIF" }
], dc = ["jpeg", "webp", "avif"], pc = ["webp", "avif"];
function uc({
  data: e,
  onChange: n,
  nodeId: r
}) {
  const a = e.format ?? "jpeg", i = dc.includes(a), s = pc.includes(a), d = e.lossless ?? !1;
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      Be,
      {
        value: e.sourceImagePath,
        onChange: (c) => n({ sourceImagePath: c }),
        nodeId: r
      }
    ),
    /* @__PURE__ */ t(_, { label: "Output format", children: /* @__PURE__ */ t(
      Ce,
      {
        size: "sm",
        value: a,
        onChange: (c) => n({ format: c.target.value }),
        "aria-label": "Output format",
        options: cc
      }
    ) }),
    i && /* @__PURE__ */ t(
      _,
      {
        label: "Quality",
        help: d ? "Ignored while lossless encoding is on." : "Higher is better quality and a larger file. 80 is a good default. Range 1–100.",
        children: /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 1,
            max: 100,
            step: 1,
            disabled: d,
            value: e.quality ?? 80,
            onChange: (c) => n({ quality: c }),
            "data-testid": "format-convert-quality"
          }
        )
      }
    ),
    s && /* @__PURE__ */ t(
      at,
      {
        label: "Lossless encoding",
        checked: d,
        onChange: (c) => n({ lossless: c }),
        help: "Overrides quality when on. Larger files, no compression artefacts.",
        "data-testid": "format-convert-lossless"
      }
    ),
    /* @__PURE__ */ t(
      at,
      {
        label: "Strip EXIF and metadata",
        checked: e.stripMetadata ?? !1,
        onChange: (c) => n({ stripMetadata: c }),
        help: "Removes camera EXIF, GPS and copyright tags. Reduces file size; recommended for web delivery.",
        "data-testid": "format-convert-strip-metadata"
      }
    )
  ] });
}
function mc({ data: e, onChange: n, nodeId: r }) {
  const a = wt(r ?? null);
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o(
      _,
      {
        label: "Source image path",
        help: "Optional. Defaults to the image produced upstream.",
        children: [
          /* @__PURE__ */ t(
            we,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              value: e.sourceImagePath ?? "",
              onChange: (i) => n({ sourceImagePath: i.target.value.trim() || void 0 }),
              placeholder: "$.trigger.imageRef",
              "aria-label": "Source image path"
            }
          ),
          /* @__PURE__ */ t(
            lt,
            {
              samples: a.map((i) => i.path),
              onSelect: (i) => n({ sourceImagePath: i }),
              "aria-label": "Upstream image refs"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Sigma",
        help: "Gaussian mask sigma. Higher is broader and stronger. Typical range 0.5–3.",
        children: /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 0.01,
            max: 10,
            step: 0.1,
            value: e.sigma,
            onChange: (i) => n({ sigma: i }),
            onClear: () => n({ sigma: void 0 }),
            placeholder: "1",
            "data-testid": "sharpen-sigma"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "m1 — flat area level",
        help: "Sharpening applied to flat (smooth) areas of the image.",
        children: /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 0,
            step: 0.1,
            value: e.m1,
            onChange: (i) => n({ m1: i }),
            onClear: () => n({ m1: void 0 }),
            placeholder: "leave blank for default",
            "data-testid": "sharpen-m1"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "m2 — jagged area level",
        help: "Sharpening applied to jagged (edge) areas of the image.",
        children: /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 0,
            step: 0.1,
            value: e.m2,
            onChange: (i) => n({ m2: i }),
            onClear: () => n({ m2: void 0 }),
            placeholder: "leave blank for default",
            "data-testid": "sharpen-m2"
          }
        )
      }
    )
  ] });
}
const hc = [
  "northwest",
  "north",
  "northeast",
  "west",
  "center",
  "east",
  "southwest",
  "south",
  "southeast"
].map((e) => ({ value: e, label: e }));
function fc({ data: e, onChange: n, nodeId: r }) {
  const a = !e.overlayImageId?.trim();
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      Be,
      {
        value: e.sourceImagePath,
        onChange: (i) => n({ sourceImagePath: i }),
        nodeId: r
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Overlay image ID",
        required: !0,
        error: a ? "Overlay image ID is required." : void 0,
        help: "The imageId of the watermark image already stored in the blob store.",
        children: /* @__PURE__ */ t(
          we,
          {
            size: "sm",
            mono: !0,
            spellCheck: !1,
            invalid: a,
            value: e.overlayImageId ?? "",
            onChange: (i) => n({ overlayImageId: i.target.value.trim() }),
            placeholder: "img_xxxxxxxx",
            "aria-label": "Overlay image ID"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Gravity",
        help: "Where the overlay sits on the source image. Default southeast.",
        children: /* @__PURE__ */ t(
          Ce,
          {
            size: "sm",
            value: e.gravity ?? "southeast",
            onChange: (i) => n({ gravity: i.target.value }),
            "aria-label": "Gravity",
            options: hc
          }
        )
      }
    ),
    /* @__PURE__ */ t(_, { label: "Opacity", help: "0 to 1. Default 1.", children: /* @__PURE__ */ t(
      he,
      {
        size: "sm",
        min: 0,
        max: 1,
        step: 0.05,
        value: e.opacity ?? 1,
        onChange: (i) => n({ opacity: i }),
        "data-testid": "watermark-opacity"
      }
    ) }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ t("div", { className: "flex-1", children: /* @__PURE__ */ t(_, { label: "Offset X", children: /* @__PURE__ */ t(
        he,
        {
          size: "sm",
          step: 1,
          unit: "px",
          value: e.offsetX,
          onChange: (i) => n({ offsetX: i }),
          onClear: () => n({ offsetX: void 0 }),
          placeholder: "0",
          "data-testid": "watermark-offset-x"
        }
      ) }) }),
      /* @__PURE__ */ t("div", { className: "flex-1", children: /* @__PURE__ */ t(_, { label: "Offset Y", children: /* @__PURE__ */ t(
        he,
        {
          size: "sm",
          step: 1,
          unit: "px",
          value: e.offsetY,
          onChange: (i) => n({ offsetY: i }),
          onClear: () => n({ offsetY: void 0 }),
          placeholder: "0",
          "data-testid": "watermark-offset-y"
        }
      ) }) })
    ] })
  ] });
}
const sr = 50;
function gc(e, n) {
  const [r, a] = S(e), [i, s] = S([]), [d, c] = S([]), l = ce(r);
  l.current = r;
  const p = E(
    (v) => {
      a((b) => {
        const N = v(b);
        return s((y) => {
          const k = [...y, b];
          return k.length > sr && k.shift(), k;
        }), c([]), n(N), N;
      });
    },
    [n]
  ), u = E(
    (v) => {
      p((b) => [...b, v]);
    },
    [p]
  ), f = E(
    (v, b, N) => {
      p(
        (y) => y.map((k) => k.id === v ? { ...k, x: b, y: N } : k)
      );
    },
    [p]
  ), h = E(
    (v, b, N, y, k) => {
      p(
        (C) => C.map((T) => T.id === v ? { ...T, x: b, y: N, width: y, height: k } : T)
      );
    },
    [p]
  ), g = E(
    (v, b) => {
      p(
        (N) => N.map((y) => y.id === v ? { ...y, label: b } : y)
      );
    },
    [p]
  ), x = E(
    (v) => {
      p((b) => b.filter((N) => N.id !== v));
    },
    [p]
  ), m = E(() => {
    s((v) => {
      if (v.length === 0) return v;
      const b = v[v.length - 1];
      c((y) => [...y, l.current]);
      const N = b;
      return a(N), n(N), v.slice(0, -1);
    });
  }, [n]), w = E(() => {
    c((v) => {
      if (v.length === 0) return v;
      const b = v[v.length - 1];
      s((y) => {
        const k = [...y, l.current];
        return k.length > sr && k.shift(), k;
      });
      const N = b;
      return a(N), n(N), v.slice(0, -1);
    });
  }, [n]);
  return {
    boxes: r,
    addBox: u,
    moveBox: f,
    resizeBox: h,
    setLabel: g,
    deleteBox: x,
    undo: m,
    redo: w,
    canUndo: i.length > 0,
    canRedo: d.length > 0
  };
}
function xc() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Te(e, n, r) {
  return Math.max(n, Math.min(r, e));
}
function an(e, n) {
  const r = n.getBoundingClientRect();
  return {
    x: Te(e.clientX - r.left, 0, r.width),
    y: Te(e.clientY - r.top, 0, r.height)
  };
}
function sn(e, n, r, a, i, s) {
  const d = i / r, c = s / a;
  return { x: e * d, y: n * c };
}
function lr(e, n, r) {
  return {
    left: `${e.x / n * 100}%`,
    top: `${e.y / r * 100}%`,
    width: `${e.width / n * 100}%`,
    height: `${e.height / r * 100}%`
  };
}
function bc(e, n, r) {
  for (let a = r.length - 1; a >= 0; a--) {
    const i = r[a];
    if (e >= i.x && e <= i.x + i.width && n >= i.y && n <= i.y + i.height)
      return i;
  }
  return null;
}
function oo({
  imageUrl: e,
  imageWidth: n,
  imageHeight: r,
  boxes: a,
  onChange: i,
  readOnly: s = !1,
  className: d
}) {
  const c = ce(null), [l, p] = S({ kind: "idle" }), [u, f] = S(null), h = ce(null), { addBox: g, moveBox: x, resizeBox: m, setLabel: w, deleteBox: v } = gc(
    a,
    i
  );
  oe(() => {
    u && h.current && (h.current.focus(), h.current.select());
  }, [u]);
  const b = E(
    (O) => {
      if (s || O.button !== 0) return;
      const R = c.current;
      if (!R) return;
      O.preventDefault(), R.setPointerCapture(O.pointerId);
      const { x: Y, y: F } = an(O, R), L = R.getBoundingClientRect(), { x: V, y: K } = sn(
        Y,
        F,
        L.width,
        L.height,
        n,
        r
      ), X = bc(V, K, a);
      p(X ? {
        kind: "move",
        id: X.id,
        offsetX: V - X.x,
        offsetY: K - X.y,
        currentX: V,
        currentY: K
      } : { kind: "create", startX: V, startY: K, currentX: V, currentY: K });
    },
    [s, a, n, r]
  ), N = E(
    (O, R, Y) => {
      if (s) return;
      O.stopPropagation(), O.preventDefault();
      const F = c.current;
      if (!F) return;
      F.setPointerCapture(O.pointerId);
      const { x: L, y: V } = an(O, F), K = F.getBoundingClientRect(), { x: X, y: me } = sn(L, V, K.width, K.height, n, r);
      p({ kind: "resize", id: R.id, corner: Y, origBox: { ...R }, currentX: X, currentY: me });
    },
    [s, n, r]
  ), y = E(
    (O) => {
      if (l.kind === "idle") return;
      const R = c.current;
      if (!R) return;
      const { x: Y, y: F } = an(O, R), L = R.getBoundingClientRect(), { x: V, y: K } = sn(Y, F, L.width, L.height, n, r);
      l.kind === "create" ? p((X) => X.kind === "create" ? { ...X, currentX: V, currentY: K } : X) : l.kind === "move" ? p((X) => X.kind === "move" ? { ...X, currentX: V, currentY: K } : X) : l.kind === "resize" && p((X) => X.kind === "resize" ? { ...X, currentX: V, currentY: K } : X);
    },
    [l.kind, n, r]
  ), k = E(
    (O) => {
      if (l.kind === "create") {
        const R = Math.min(l.startX, l.currentX), Y = Math.min(l.startY, l.currentY), F = Math.max(l.startX, l.currentX), L = Math.max(l.startY, l.currentY), V = F - R, K = L - Y;
        V >= 4 && K >= 4 && g({ id: xc(), x: R, y: Y, width: V, height: K });
      } else if (l.kind === "move") {
        const R = a.find((Y) => Y.id === l.id);
        if (R) {
          const Y = Te(l.currentX - l.offsetX, 0, n - R.width), F = Te(l.currentY - l.offsetY, 0, r - R.height);
          x(l.id, Y, F);
        }
      } else if (l.kind === "resize") {
        const { id: R, corner: Y, origBox: F, currentX: L, currentY: V } = l;
        let { x: K, y: X, width: me, height: q } = F;
        if (Y === "nw") {
          const de = Te(L, 0, K + me - 4), Ie = Te(V, 0, X + q - 4);
          me = K + me - de, q = X + q - Ie, K = de, X = Ie;
        } else if (Y === "ne") {
          const de = Te(V, 0, X + q - 4);
          me = Te(L - K, 4, n - K), q = X + q - de, X = de;
        } else if (Y === "sw") {
          const de = Te(L, 0, K + me - 4);
          me = K + me - de, q = Te(V - X, 4, r - X), K = de;
        } else
          me = Te(L - K, 4, n - K), q = Te(V - X, 4, r - X);
        m(R, K, X, me, q);
      }
      p({ kind: "idle" });
    },
    [l, a, g, x, m, n, r]
  ), C = E(
    (O, R) => {
      s || (O.preventDefault(), v(R));
    },
    [s, v]
  ), T = E(
    (O, R) => {
      s || (O.key === "Delete" || O.key === "Backspace") && (O.preventDefault(), v(R));
    },
    [s, v]
  ), M = E(
    (O, R) => {
      s || (O.stopPropagation(), f({ id: R.id, value: R.label ?? "" }));
    },
    [s]
  ), P = E(() => {
    u && (w(u.id, u.value), f(null));
  }, [u, w]);
  let D = null;
  if (l.kind === "create") {
    const O = Math.min(l.startX, l.currentX), R = Math.min(l.startY, l.currentY), Y = Math.max(l.startX, l.currentX), F = Math.max(l.startY, l.currentY);
    Y - O >= 2 && F - R >= 2 && (D = { x: O, y: R, width: Y - O, height: F - R });
  }
  let re = null;
  if (l.kind === "move") {
    const O = a.find((R) => R.id === l.id);
    if (O) {
      const R = Te(l.currentX - l.offsetX, 0, n - O.width), Y = Te(l.currentY - l.offsetY, 0, r - O.height);
      re = { ...O, x: R, y: Y };
    }
  }
  let A = null;
  if (l.kind === "resize") {
    const { corner: O, origBox: R, currentX: Y, currentY: F } = l;
    let { x: L, y: V, width: K, height: X } = R;
    if (O === "nw") {
      const me = Te(Y, 0, L + K - 4), q = Te(F, 0, V + X - 4);
      K = L + K - me, X = V + X - q, L = me, V = q;
    } else if (O === "ne") {
      const me = Te(F, 0, V + X - 4);
      K = Te(Y - L, 4, n - L), X = V + X - me, V = me;
    } else if (O === "sw") {
      const me = Te(Y, 0, L + K - 4);
      K = L + K - me, X = Te(F - V, 4, r - V), L = me;
    } else
      K = Te(Y - L, 4, n - L), X = Te(F - V, 4, r - V);
    A = { ...R, x: L, y: V, width: K, height: X };
  }
  const J = /* @__PURE__ */ new Set();
  l.kind === "move" && J.add(l.id), l.kind === "resize" && J.add(l.id);
  const Q = (O, R) => {
    const Y = {
      nw: "-top-1.5 -left-1.5 cursor-nw-resize",
      ne: "-top-1.5 -right-1.5 cursor-ne-resize",
      sw: "-bottom-1.5 -left-1.5 cursor-sw-resize",
      se: "-bottom-1.5 -right-1.5 cursor-se-resize"
    };
    return /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "aria-label": `Resize ${R}`,
        className: I(
          "absolute h-3 w-3 rounded-sm border border-primary bg-white shadow",
          Y[R]
        ),
        onPointerDown: (F) => N(F, O, R)
      },
      R
    );
  }, G = (O, R, Y, F) => {
    const L = lr(O, n, r), V = u?.id === O.id;
    return /* @__PURE__ */ o(
      "div",
      {
        role: "none",
        "aria-label": `Bounding box${O.label ? ": " + O.label : ""}`,
        className: I(
          "absolute",
          R ? "opacity-60" : "opacity-100"
        ),
        style: {
          left: L.left,
          top: L.top,
          width: L.width,
          height: L.height,
          border: "2px solid #6366f1",
          background: "rgba(99,102,241,0.1)",
          borderRadius: 2,
          boxSizing: "border-box"
        },
        children: [
          V ? /* @__PURE__ */ t(
            "input",
            {
              ref: h,
              type: "text",
              value: u.value,
              onChange: (K) => f((X) => X ? { ...X, value: K.target.value } : null),
              onBlur: P,
              onKeyDown: (K) => {
                K.key === "Enter" && (K.preventDefault(), P()), K.key === "Escape" && (K.preventDefault(), f(null));
              },
              className: "absolute -top-5 left-0 w-24 rounded border border-primary bg-white px-1 py-0 text-[10px] font-semibold text-primary shadow outline-none focus:ring-1 focus:ring-primary",
              onClick: (K) => K.stopPropagation()
            }
          ) : /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              tabIndex: 0,
              "aria-label": `Label: ${O.label || "Unlabeled"}. Double-click to edit.`,
              className: "absolute -top-5 left-0 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow",
              style: { whiteSpace: "nowrap" },
              onDoubleClick: (K) => M(K, O),
              onContextMenu: (K) => C(K, O.id),
              onKeyDown: (K) => T(K, O.id),
              children: O.label || "Unlabeled"
            }
          ),
          Y && !s && /* @__PURE__ */ o(H, { children: [
            Q(O, "nw"),
            Q(O, "ne"),
            Q(O, "sw"),
            Q(O, "se")
          ] })
        ]
      },
      F
    );
  }, Z = () => {
    if (!D) return null;
    const O = lr(D, n, r);
    return /* @__PURE__ */ t(
      "div",
      {
        "aria-hidden": !0,
        className: "pointer-events-none absolute",
        style: {
          left: O.left,
          top: O.top,
          width: O.width,
          height: O.height,
          border: "2px dashed #6366f1",
          background: "rgba(99,102,241,0.08)",
          borderRadius: 2,
          boxSizing: "border-box",
          opacity: 0.8
        }
      },
      "ghost-create"
    );
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: I("relative w-full select-none overflow-hidden rounded-lg border border-border bg-black/5", d),
      "aria-label": "Bounding box authoring canvas",
      "data-testid": "bbox-authoring-canvas",
      children: [
        /* @__PURE__ */ t(
          "img",
          {
            src: e,
            alt: "",
            className: "block h-auto w-full object-contain",
            draggable: !1
          }
        ),
        /* @__PURE__ */ o(
          "div",
          {
            ref: c,
            "data-testid": "bbox-authoring-overlay",
            className: I(
              "absolute inset-0",
              s ? "pointer-events-none" : "cursor-crosshair"
            ),
            onPointerDown: s ? void 0 : b,
            onPointerMove: s ? void 0 : y,
            onPointerUp: s ? void 0 : k,
            children: [
              a.map((O) => J.has(O.id) ? null : G(O, !1, !0, `box-${O.id}`)),
              re && G(re, !0, !1, "ghost-move"),
              A && G(A, !0, !0, "ghost-resize"),
              Z()
            ]
          }
        ),
        !s && /* @__PURE__ */ t("div", { className: "pointer-events-none absolute bottom-1.5 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80", children: "Drag to add box" })
      ]
    }
  );
}
const yc = [
  "$.scatter.item.bbox",
  "$.steps.visionAnalyze.output.extracted.regions[0].bbox",
  "$.trigger.payload.bbox"
], vc = "crop-region", wc = "crop", Nc = "text-[11px] text-text-tertiary mt-0.5";
function kc(e) {
  const { definition: n } = Ke(), r = W(() => !e || !n ? null : n.edges.find((d) => d.target === e)?.source ?? null, [n, e]), i = fe(r ?? "")?.images?.[0];
  return i ? { imageId: i.imageId, width: i.width, height: i.height } : null;
}
function Cc({
  data: e,
  onChange: n,
  currentNodeId: r
}) {
  wt(r ?? null);
  const a = e.materialize !== !1, i = kc(r), s = Me(), d = W(() => e.bbox ? [
    {
      id: vc,
      x: e.bbox.x,
      y: e.bbox.y,
      width: e.bbox.width,
      height: e.bbox.height,
      label: wc
    }
  ] : [], [e.bbox]), c = E(
    (l) => {
      if (l.length === 0) {
        n({ bbox: void 0 });
        return;
      }
      const p = l[l.length - 1], u = {
        x: Math.round(p.x),
        y: Math.round(p.y),
        width: Math.round(p.width),
        height: Math.round(p.height)
      };
      n({ bbox: u });
    },
    [n]
  );
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      Be,
      {
        value: e.sourceImagePath,
        onChange: (l) => n({ sourceImagePath: l }),
        nodeId: r ?? void 0,
        help: "JSONPath to the imageId of the source image. Defaults server-side to $.scatter.parentImageId.",
        placeholder: "$.scatter.parentImageId"
      }
    ),
    /* @__PURE__ */ o(
      _,
      {
        label: "Bounding-box path",
        help: "Optional. JSONPath to a bbox object { x, y, width, height } in pixels. Overrides the manual crop region below when present at run time.",
        children: [
          /* @__PURE__ */ t(
            we,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              value: e.bboxPath ?? "",
              onChange: (l) => n({ bboxPath: l.target.value.trim() || void 0 }),
              placeholder: "$.scatter.item.bbox",
              "aria-label": "Bounding-box path"
            }
          ),
          /* @__PURE__ */ t(
            lt,
            {
              samples: yc,
              onSelect: (l) => n({ bboxPath: l }),
              "aria-label": "Common bbox paths"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ o("div", { "data-testid": "crop-region-section", children: [
      /* @__PURE__ */ t(
        _,
        {
          label: "Crop region",
          help: "Optional. Drag on the source image to paint the crop box. Drawing a new box replaces the previous one.",
          children: /* @__PURE__ */ t(H, {})
        }
      ),
      i ? /* @__PURE__ */ o(H, { children: [
        /* @__PURE__ */ t(
          oo,
          {
            imageUrl: s(i.imageId),
            imageWidth: i.width,
            imageHeight: i.height,
            boxes: d,
            onChange: c,
            className: "mt-1.5"
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: "mt-1.5 flex flex-wrap gap-1",
            "data-testid": "crop-region-chips",
            children: e.bbox ? /* @__PURE__ */ o(H, { children: [
              /* @__PURE__ */ o(le, { tone: "neutral", size: "xs", mono: !0, "data-testid": "crop-chip-x", children: [
                "x: ",
                e.bbox.x
              ] }),
              /* @__PURE__ */ o(le, { tone: "neutral", size: "xs", mono: !0, "data-testid": "crop-chip-y", children: [
                "y: ",
                e.bbox.y
              ] }),
              /* @__PURE__ */ o(
                le,
                {
                  tone: "neutral",
                  size: "xs",
                  mono: !0,
                  "data-testid": "crop-chip-width",
                  children: [
                    "w: ",
                    e.bbox.width
                  ]
                }
              ),
              /* @__PURE__ */ o(
                le,
                {
                  tone: "neutral",
                  size: "xs",
                  mono: !0,
                  "data-testid": "crop-chip-height",
                  children: [
                    "h: ",
                    e.bbox.height
                  ]
                }
              )
            ] }) : /* @__PURE__ */ t("span", { className: I(Nc, "italic"), children: "No crop region yet — drag on the image to add one." })
          }
        )
      ] }) : /* @__PURE__ */ t(
        nt,
        {
          variant: "info",
          className: "mt-1.5",
          "data-testid": "crop-region-empty-banner",
          children: "Run the upstream node once to populate the source image, then drag here to paint a crop region."
        }
      )
    ] }),
    /* @__PURE__ */ t(
      at,
      {
        label: "Persist crop to blob store",
        checked: a,
        onChange: (l) => n({ materialize: l }),
        help: "On by default. The cropped image is saved to the image blob store.",
        "data-testid": "crop-materialize"
      }
    )
  ] });
}
function Ic(e) {
  const { selectedNodeId: n } = Ke();
  return /* @__PURE__ */ t(Cc, { ...e, currentNodeId: n });
}
const Sc = [
  { value: "luminosity", label: "Luminosity — 0.21R + 0.72G + 0.07B (perceptually accurate)" },
  { value: "average", label: "Average — (R+G+B)/3 (fast, flat)" },
  { value: "desaturate", label: "Desaturate — (max+min)/2 (Lightness channel)" }
];
function Tc({ data: e, onChange: n, nodeId: r }) {
  const a = e.algorithm ?? "luminosity", i = e.contrast ?? 1;
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      Be,
      {
        value: e.sourceImagePath,
        onChange: (s) => n({ sourceImagePath: s }),
        nodeId: r,
        help: "JSONPath to the imageId of the source image.",
        placeholder: "$.scatter.parentImageId"
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Greyscale algorithm",
        help: "Controls how RGB channels are weighted when converting to greyscale.",
        children: /* @__PURE__ */ t(
          Ce,
          {
            size: "sm",
            value: a,
            onChange: (s) => n({ algorithm: s.target.value }),
            "aria-label": "Greyscale algorithm",
            options: Sc
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Contrast multiplier",
        help: "Applied after greyscale conversion. 1 is no change, below 1 lowers contrast, above 1 raises it. Range 0–4.",
        children: /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 0,
            max: 4,
            step: 0.05,
            value: i,
            onChange: (s) => n({ contrast: s }),
            "data-testid": "adjust-bw-contrast"
          }
        )
      }
    )
  ] });
}
function $c({
  value: e,
  onChange: n,
  uploadImage: r,
  getImageUrl: a,
  maxSize: i = 8 * 1024 * 1024,
  accept: s = "image/*",
  fileOnly: d = !1,
  urlOnly: c = !1,
  className: l,
  "data-testid": p
}) {
  const [u, f] = S(!1), [h, g] = S(null), [x, m] = S("");
  async function w(N) {
    f(!0), g(null);
    try {
      const y = await r(N);
      n(y), m("");
    } catch (y) {
      const k = y instanceof Error ? y.message : "Upload failed. Please try again.";
      g(k);
    } finally {
      f(!1);
    }
  }
  function v(N) {
    N.length > 0 && w(N[0]);
  }
  async function b() {
    const N = x.trim();
    N && await w({ url: N });
  }
  if (e) {
    const N = a(e.imageId);
    return /* @__PURE__ */ t(
      "div",
      {
        className: I("flex flex-col gap-3", l),
        "data-testid": p,
        children: /* @__PURE__ */ o("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ t(
            Fr,
            {
              src: N,
              alt: "Uploaded image",
              size: "md",
              aspectRatio: "square",
              "data-testid": p ? `${p}-thumbnail` : void 0
            }
          ),
          /* @__PURE__ */ t(
            Pe,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => n(null),
              "data-testid": p ? `${p}-replace` : void 0,
              children: "Replace"
            }
          )
        ] })
      }
    );
  }
  return /* @__PURE__ */ o(
    "div",
    {
      className: I("flex flex-col gap-3", l),
      "data-testid": p,
      children: [
        u && /* @__PURE__ */ t(
          "p",
          {
            className: "text-sm text-neutral",
            "data-testid": p ? `${p}-uploading` : void 0,
            children: "Uploading..."
          }
        ),
        !c && /* @__PURE__ */ t(
          ra,
          {
            accept: s,
            maxSize: i,
            onFiles: v,
            disabled: u,
            "data-testid": p ? `${p}-drop` : void 0
          }
        ),
        !d && /* @__PURE__ */ o(
          "div",
          {
            className: "flex items-center gap-2",
            "data-testid": p ? `${p}-url-row` : void 0,
            children: [
              /* @__PURE__ */ t(
                we,
                {
                  type: "url",
                  placeholder: "https://example.com/image.jpg",
                  value: x,
                  onChange: (N) => m(N.target.value),
                  disabled: u,
                  "data-testid": p ? `${p}-url-input` : void 0,
                  onKeyDown: (N) => {
                    N.key === "Enter" && b();
                  }
                }
              ),
              /* @__PURE__ */ t(
                Pe,
                {
                  variant: "secondary",
                  size: "sm",
                  onClick: () => {
                    b();
                  },
                  disabled: u || !x.trim(),
                  "data-testid": p ? `${p}-fetch-btn` : void 0,
                  children: "Fetch"
                }
              )
            ]
          }
        ),
        h && /* @__PURE__ */ t(
          "p",
          {
            role: "alert",
            className: "text-sm text-danger-fg",
            "data-testid": p ? `${p}-error` : void 0,
            children: h
          }
        )
      ]
    }
  );
}
function ao(e) {
  const n = zr(), r = n.uploadImage;
  return r ? /* @__PURE__ */ t(
    $c,
    {
      ...e,
      uploadImage: r,
      getImageUrl: n.getImageUrl
    }
  ) : /* @__PURE__ */ t("div", { className: "text-sm text-neutral", children: "This host has not wired uploadImage. Cannot accept new uploads." });
}
const Nn = {
  brightness: "Brightness",
  contrast: "Contrast",
  saturation: "Saturation",
  hue: "Hue",
  blur: "Blur"
}, io = Object.keys(Nn).map((e) => ({
  value: e,
  label: Nn[e]
})), Ac = {
  brightness: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  contrast: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  saturation: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  hue: { min: -180, max: 180, step: 1, unit: "°", defaultValue: 0 },
  blur: { min: 0, max: 50, step: 0.5, unit: "px", defaultValue: 1 }
};
function so(e) {
  switch (e) {
    case "brightness":
      return { kind: e, value: 1 };
    case "contrast":
      return { kind: e, value: 1 };
    case "saturation":
      return { kind: e, value: 1 };
    case "hue":
      return { kind: e, degrees: 0 };
    case "blur":
      return { kind: e, radiusPx: 1 };
  }
}
function Rc(e) {
  switch (e.kind) {
    case "hue":
      return e.degrees;
    case "blur":
      return e.radiusPx;
    default:
      return e.value;
  }
}
function Pc(e, n) {
  switch (e.kind) {
    case "hue":
      return { kind: "hue", degrees: n };
    case "blur":
      return { kind: "blur", radiusPx: n };
    default:
      return { kind: e.kind, value: n };
  }
}
const Dc = I(
  "w-4 h-full flex items-center justify-center",
  "text-[14px] text-text-tertiary cursor-grab select-none shrink-0"
);
I(
  "text-[11px] font-semibold px-2 py-0.5 rounded-full",
  "bg-surface-hover border border-border text-text-secondary",
  "whitespace-nowrap shrink-0"
);
function Mc({ layer: e, index: n, onUpdate: r, onRemove: a }) {
  const i = Ac[e.kind], s = Rc(e), d = (l) => {
    r(so(l.target.value));
  }, c = (l) => {
    r(Pc(e, l));
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-surface-inset",
      "data-testid": `layer-row-${n}`,
      children: [
        /* @__PURE__ */ t("span", { className: Dc, "aria-hidden": "true", title: "Drag handle", children: "⠿" }),
        /* @__PURE__ */ t(
          Ce,
          {
            value: e.kind,
            onChange: d,
            options: io,
            size: "sm",
            "aria-label": `Layer ${n + 1} kind`,
            "data-testid": `layer-kind-select-${n}`,
            className: "shrink-0"
          }
        ),
        /* @__PURE__ */ t(
          Sn,
          {
            min: i.min,
            max: i.max,
            step: i.step,
            value: s,
            onChange: c,
            readout: !1,
            className: "flex-1 min-w-0",
            "aria-label": `${Nn[e.kind]} slider`,
            "data-testid": `layer-slider-${n}`
          }
        ),
        /* @__PURE__ */ t(
          he,
          {
            value: s,
            onChange: c,
            min: i.min,
            max: i.max,
            step: i.step,
            unit: i.unit,
            size: "sm",
            "data-testid": `layer-number-${n}`
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: a,
            className: I(
              "shrink-0 w-6 h-6 flex items-center justify-center rounded",
              "text-[12px] text-text-tertiary bg-transparent border-none",
              "cursor-pointer hover:text-danger-fg hover:bg-danger-bg"
            ),
            "aria-label": `Remove layer ${n + 1}`,
            "data-testid": `layer-remove-${n}`,
            children: "✕"
          }
        )
      ]
    }
  );
}
const Ec = 150;
function Oc(e, n, r) {
  const [a, i] = S(null), [s, d] = S(!1), c = ce(null), l = ce(null), p = E(
    async (u, f) => {
      l.current?.abort();
      const h = new AbortController();
      l.current = h, d(!0);
      try {
        const g = await fetch(`${r}/api/pipeline/preview/adjust-layer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageId: u, layers: f }),
          signal: h.signal
        });
        if (!g.ok) return;
        const x = await g.json();
        x.dataUrl && i(x.dataUrl);
      } catch {
      } finally {
        d(!1);
      }
    },
    [r]
  );
  return oe(() => {
    if (!e) {
      i(null);
      return;
    }
    return c.current && clearTimeout(c.current), c.current = setTimeout(() => {
      p(e, n);
    }, Ec), () => {
      c.current && clearTimeout(c.current);
    };
  }, [e, JSON.stringify(n), p]), { previewSrc: a, loading: s };
}
function cr(e) {
  return e.length <= 8 ? e : `${e.slice(0, 8)}…`;
}
function _c({
  layers: e,
  onChange: n,
  autoSourceImageId: r,
  pinnedSourceImageId: a,
  onPinnedSourceImageIdChange: i,
  sourceImageId: s,
  apiBase: d = ""
}) {
  const [c, l] = S("brightness"), [p, u] = S(!1), f = r ?? s, h = a ?? f, g = !!a, { previewSrc: x, loading: m } = Oc(h, e, d), w = () => {
    i?.(void 0);
  }, v = (C) => {
    C?.imageId && (i?.(C.imageId), u(!1));
  }, b = (C, T) => {
    n(e.map((M, P) => P === C ? T : M));
  }, N = (C) => {
    n(e.filter((T, M) => M !== C));
  }, y = () => {
    n([...e, so(c)]);
  }, k = (C) => {
    l(C.target.value);
  };
  return /* @__PURE__ */ o("div", { className: "flex gap-3 p-3", "data-testid": "adjust-layer-slider-panel", children: [
    /* @__PURE__ */ o("div", { className: "flex-1 flex flex-col gap-2 min-w-0", children: [
      e.length === 0 && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary italic", children: "No layers — add one below." }),
      e.map((C, T) => /* @__PURE__ */ t(
        Mc,
        {
          layer: C,
          index: T,
          onUpdate: (M) => b(T, M),
          onRemove: () => N(T)
        },
        T
      )),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mt-1", children: [
        /* @__PURE__ */ t(
          Ce,
          {
            value: c,
            onChange: k,
            options: io,
            size: "sm",
            "aria-label": "New layer kind",
            "data-testid": "new-layer-kind-select"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: y,
            className: I(
              "text-[12px] font-semibold px-3 py-1 rounded-md cursor-pointer",
              "bg-primary text-white border-none hover:bg-primary/90"
            ),
            "data-testid": "add-layer-btn",
            children: "+ Add layer"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "shrink-0 flex flex-col items-stretch gap-1.5", children: [
      /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-tertiary", children: "Preview" }),
      /* @__PURE__ */ o(
        "div",
        {
          className: I("flex items-center gap-1.5 flex-wrap"),
          "data-testid": "adjust-layer-source-caption-row",
          children: [
            g && h ? /* @__PURE__ */ o(
              le,
              {
                tone: "neutral",
                size: "xs",
                "data-testid": "adjust-layer-source-chip-pinned",
                children: [
                  /* @__PURE__ */ o("span", { children: [
                    "Source: pinned (",
                    cr(h),
                    ")"
                  ] }),
                  /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      onClick: w,
                      "aria-label": "Clear pinned source image",
                      "data-testid": "adjust-layer-source-clear-pin",
                      className: I(
                        "ml-1 inline-flex items-center justify-center",
                        "w-3 h-3 rounded-full text-[10px] leading-none",
                        "bg-transparent border-none cursor-pointer text-current",
                        "hover:bg-surface-emphasis"
                      ),
                      children: "×"
                    }
                  )
                ]
              }
            ) : f ? /* @__PURE__ */ o(
              le,
              {
                tone: "info",
                size: "xs",
                "data-testid": "adjust-layer-source-chip-auto",
                children: [
                  "Source: ",
                  cr(f),
                  " from upstream run"
                ]
              }
            ) : null,
            i && /* @__PURE__ */ t(
              Pe,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => u((C) => !C),
                "data-testid": "adjust-layer-override-btn",
                children: "Override"
              }
            )
          ]
        }
      ),
      p && i && /* @__PURE__ */ t(
        "div",
        {
          className: "w-48",
          "data-testid": "adjust-layer-override-uploader-wrap",
          children: /* @__PURE__ */ t(
            ao,
            {
              value: null,
              onChange: v,
              "data-testid": "adjust-layer-override-uploader"
            }
          )
        }
      ),
      h ? /* @__PURE__ */ o("div", { className: "relative", children: [
        /* @__PURE__ */ t(
          Fr,
          {
            src: x ?? "",
            alt: "Adjust layer preview",
            size: "lg",
            aspectRatio: "auto",
            loading: "eager",
            "data-testid": "adjust-layer-preview-thumb"
          }
        ),
        m && /* @__PURE__ */ t("div", { className: "absolute inset-0 flex items-center justify-center bg-white/60 rounded-md", children: /* @__PURE__ */ t("span", { className: "text-[11px] text-text-secondary", children: "Loading…" }) })
      ] }) : /* @__PURE__ */ t(
        "div",
        {
          className: I(
            "w-48 h-32 rounded-md border border-dashed border-border",
            "flex items-center justify-center text-[11px] text-text-tertiary",
            "bg-surface-inset"
          ),
          "data-testid": "adjust-layer-no-source",
          children: "No source image"
        }
      )
    ] })
  ] });
}
function Lc(e) {
  const { definition: n } = Ke(), r = W(() => !e || !n ? null : n.edges.find((s) => s.target === e)?.source ?? null, [n, e]);
  return fe(r ?? "")?.images?.[0]?.imageId;
}
function Bc({
  data: e,
  onChange: n,
  currentNodeId: r
}) {
  wt(r ?? null);
  const a = Lc(r), i = e.previewSourceImageId, s = e.layers ?? [];
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      Be,
      {
        value: e.sourceImagePath,
        onChange: (d) => n({ sourceImagePath: d }),
        nodeId: r ?? void 0,
        help: "JSONPath to the imageId of the source image.",
        placeholder: "$.scatter.parentImageId"
      }
    ),
    /* @__PURE__ */ t(_, { label: "Adjustment layers", help: "Applied top-to-bottom.", children: /* @__PURE__ */ t(
      _c,
      {
        layers: s,
        onChange: (d) => n({ layers: d }),
        autoSourceImageId: a,
        pinnedSourceImageId: i,
        onPinnedSourceImageIdChange: (d) => n({ previewSourceImageId: d })
      }
    ) })
  ] });
}
function Uc(e) {
  const { selectedNodeId: n } = Ke();
  return /* @__PURE__ */ t(Bc, { ...e, currentNodeId: n });
}
const jc = 1024;
function zc({ data: e, onChange: n, nodeId: r }) {
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      Be,
      {
        value: e.sourceImagePath,
        onChange: (a) => n({ sourceImagePath: a }),
        nodeId: r
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Max edge",
        help: "Longest-edge cap. The derived genWidth/genHeight scale to fit within it while preserving aspect ratio — wire them into image:generate.",
        children: /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 1,
            step: 1,
            unit: "px",
            value: e.maxEdge ?? jc,
            onChange: (a) => n({ maxEdge: a }),
            "data-testid": "dimensions-max-edge"
          }
        )
      }
    )
  ] });
}
const Fc = 1024;
function qc({ data: e, onChange: n, nodeId: r }) {
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      _,
      {
        label: "Prompt",
        help: "Optional text guidance forwarded to the upscaler.",
        children: /* @__PURE__ */ t(
          $e,
          {
            rows: 3,
            spellCheck: !1,
            value: e.prompt ?? "",
            onChange: (a) => n({ prompt: a.target.value.trim() ? a.target.value : void 0 }),
            placeholder: "optional guidance forwarded to the upscaler",
            "aria-label": "Prompt"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Max edge",
        help: "Longest-edge cap applied before the super-resolution pass.",
        children: /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 1,
            step: 1,
            unit: "px",
            value: e.maxEdge ?? Fc,
            onChange: (a) => n({ maxEdge: a }),
            "data-testid": "upscale-max-edge"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      Be,
      {
        value: e.sourceImagePath,
        onChange: (a) => n({ sourceImagePath: a }),
        nodeId: r
      }
    )
  ] });
}
const Wc = [
  { value: "claude-opus-4-7" },
  { value: "claude-sonnet-4-6" },
  { value: "claude-haiku-4-5-20251001" }
];
function Vc(e) {
  if (!e) return !1;
  const n = e.properties;
  if (!n || typeof n != "object" || Array.isArray(n)) return !1;
  const r = n.regions;
  return typeof r == "object" && r !== null;
}
function Kc(e) {
  const n = e.trim();
  if (n.length === 0) return { ok: !0, value: void 0 };
  try {
    const r = JSON.parse(n);
    return r === null || typeof r != "object" || Array.isArray(r) ? { ok: !1, error: "Schema must be a JSON object" } : { ok: !0, value: r };
  } catch (r) {
    return { ok: !1, error: r.message };
  }
}
const Hc = `{
  "type": "object",
  "properties": {
    "caption": { "type": "string" }
  }
}`;
function Jc({ data: e, onChange: n, nodeId: r }) {
  const a = wt(r ?? null), i = it("image:vision-analyze", Wc), [s, d] = S(!1), [c, l] = S(
    e.outputSchema ? JSON.stringify(e.outputSchema, null, 2) : ""
  ), [p, u] = S(null), f = !e.userPrompt?.trim(), h = !e.imageRefPath?.trim(), g = !!e.imageRefPath && !e.imageRefPath.startsWith("$."), x = Vc(e.outputSchema), m = E(
    (b) => {
      n({ seedRegions: b });
    },
    [n]
  ), w = (b) => {
    l(b);
    const N = Kc(b);
    if (!N.ok) {
      u(N.error);
      return;
    }
    u(null), n({ outputSchema: N.value });
  }, v = h ? "Image reference path is required." : g ? "Path must start with $." : void 0;
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      _,
      {
        label: "Model",
        help: "Requires the host's vision credentials on the executor.",
        children: /* @__PURE__ */ t(
          Ce,
          {
            size: "sm",
            value: e.model ?? "claude-sonnet-4-6",
            onChange: (b) => n({ model: b.target.value }),
            "aria-label": "Model",
            options: i.map((b) => ({ value: b.value, label: b.label ?? b.value }))
          }
        )
      }
    ),
    /* @__PURE__ */ o(
      _,
      {
        label: "Image reference path",
        required: !0,
        error: v,
        help: "JSONPath into context. The value must be a string imageId, or an object with one.",
        children: [
          /* @__PURE__ */ t(
            we,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              invalid: !!v,
              value: e.imageRefPath ?? "",
              onChange: (b) => n({ imageRefPath: b.target.value }),
              placeholder: "$.trigger.imageRef",
              "aria-label": "Image reference path"
            }
          ),
          /* @__PURE__ */ t(
            lt,
            {
              samples: a.map((b) => b.path),
              onSelect: (b) => n({ imageRefPath: b }),
              "aria-label": "Upstream image refs"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "User prompt",
        required: !0,
        error: f ? "User prompt is required." : void 0,
        help: "Supports {{ context.* }} substitution.",
        children: /* @__PURE__ */ t(
          $e,
          {
            rows: 4,
            invalid: f,
            value: e.userPrompt,
            onChange: (b) => n({ userPrompt: b.target.value }),
            "aria-label": "User prompt"
          }
        )
      }
    ),
    x && /* @__PURE__ */ o(
      _,
      {
        label: "Focus regions",
        help: "Drag on the image to paint focus boxes. The next vision pass uses these as analysis hints.",
        children: [
          /* @__PURE__ */ t(
            oo,
            {
              imageUrl: "",
              imageWidth: 800,
              imageHeight: 600,
              boxes: e.seedRegions ?? [],
              onChange: m
            }
          ),
          (e.seedRegions?.length ?? 0) > 0 && /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary mt-0.5", "data-testid": "bbox-region-count", children: [
            e.seedRegions.length,
            " region",
            e.seedRegions.length !== 1 ? "s" : "",
            " defined."
          ] })
        ]
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Output schema",
        error: p ? `Invalid JSON: ${p}` : void 0,
        help: e.outputSchema ? "Extract mode — the model must return JSON matching this schema." : "Leave blank for caption mode (freeform analysis text).",
        children: /* @__PURE__ */ t(
          $e,
          {
            rows: 6,
            invalid: !!p,
            className: "font-mono text-[11px]",
            value: c,
            onChange: (b) => w(b.target.value),
            placeholder: Hc,
            "aria-label": "Output schema"
          }
        )
      }
    ),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => d((b) => !b),
          "aria-expanded": s,
          className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] font-semibold text-text-secondary flex items-center gap-1",
          children: [
            /* @__PURE__ */ t("span", { "aria-hidden": "true", children: s ? "▾" : "▸" }),
            " Advanced"
          ]
        }
      ),
      s && /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 mt-2", children: [
        /* @__PURE__ */ t(_, { label: "Max output tokens", help: "Caps the response length. Default 2048.", children: /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 1,
            max: 8192,
            value: e.maxOutputTokens,
            onChange: (b) => n({ maxOutputTokens: b }),
            onClear: () => n({ maxOutputTokens: void 0 }),
            "data-testid": "vision-max-output-tokens"
          }
        ) }),
        /* @__PURE__ */ t(
          _,
          {
            label: "System prompt override",
            help: "Schema instructions are auto-appended when an output schema is set.",
            children: /* @__PURE__ */ t(
              $e,
              {
                rows: 2,
                value: e.systemPrompt ?? "",
                onChange: (b) => n({ systemPrompt: b.target.value || void 0 }),
                placeholder: "Leave blank to use the canned vision system prompt.",
                "aria-label": "System prompt override"
              }
            )
          }
        )
      ] })
    ] })
  ] });
}
const On = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
];
function Gc({ data: e, onChange: n, nodeId: r }) {
  const a = it("image:vision", On), i = !e.imageRefPath?.trim();
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      Be,
      {
        value: e.imageRefPath,
        onChange: (s) => n({ imageRefPath: s ?? "" }),
        nodeId: r,
        label: "Image ref path",
        help: i ? "Required — JSONPath to the imageId to tag." : "JSONPath to the imageId to tag."
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Candidate tags",
        help: "Restricts tagging to this vocabulary. Leave empty for open-ended tags.",
        children: /* @__PURE__ */ t(
          Pn,
          {
            value: e.candidateTags ?? [],
            onChange: (s) => n({ candidateTags: s }),
            placeholder: "Add candidate tag…",
            lowercase: !1
          }
        )
      }
    ),
    /* @__PURE__ */ t(_, { label: "Max tags", help: "Default 10.", children: /* @__PURE__ */ t(
      he,
      {
        size: "sm",
        min: 1,
        max: 50,
        step: 1,
        value: e.maxTags ?? 10,
        onChange: (s) => n({ maxTags: s }),
        "data-testid": "vision-tag-max-tags"
      }
    ) }),
    /* @__PURE__ */ t(_, { label: "Model", children: /* @__PURE__ */ t(
      Ce,
      {
        size: "sm",
        value: e.model ?? a[0]?.value ?? "",
        onChange: (s) => n({ model: s.target.value }),
        "aria-label": "Model",
        options: a.map((s) => ({ value: s.value, label: s.label ?? s.value }))
      }
    ) }),
    /* @__PURE__ */ t(
      _,
      {
        label: "System prompt override",
        help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
        children: /* @__PURE__ */ t(
          $e,
          {
            rows: 3,
            spellCheck: !1,
            value: e.systemPrompt ?? "",
            onChange: (s) => n({ systemPrompt: s.target.value || void 0 }),
            placeholder: "Leave blank to use the default tagging system prompt.",
            "aria-label": "System prompt override"
          }
        )
      }
    ),
    /* @__PURE__ */ t(_, { label: "Max output tokens", help: "Default 256.", children: /* @__PURE__ */ t(
      he,
      {
        size: "sm",
        min: 64,
        max: 4096,
        step: 64,
        value: e.maxOutputTokens ?? 256,
        onChange: (s) => n({ maxOutputTokens: s }),
        "data-testid": "vision-tag-max-output-tokens"
      }
    ) })
  ] });
}
const dr = 2;
function Yc({
  data: e,
  onChange: n,
  nodeId: r
}) {
  const a = it("image:vision", On), i = e.labels ?? [], s = !e.imageRefPath?.trim();
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      Be,
      {
        value: e.imageRefPath,
        onChange: (d) => n({ imageRefPath: d ?? "" }),
        nodeId: r,
        label: "Image ref path",
        help: s ? "Required — JSONPath to the imageId to classify." : "JSONPath to the imageId to classify."
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Labels",
        required: !0,
        error: i.length < dr ? `At least ${dr} labels are required to classify between.` : void 0,
        help: "The model returns the single best-matching label.",
        children: /* @__PURE__ */ t(
          Pn,
          {
            value: i,
            onChange: (d) => n({ labels: d }),
            placeholder: "Add label…",
            lowercase: !1
          }
        )
      }
    ),
    /* @__PURE__ */ t(_, { label: "Model", children: /* @__PURE__ */ t(
      Ce,
      {
        size: "sm",
        value: e.model ?? a[0]?.value ?? "",
        onChange: (d) => n({ model: d.target.value }),
        "aria-label": "Model",
        options: a.map((d) => ({ value: d.value, label: d.label ?? d.value }))
      }
    ) }),
    /* @__PURE__ */ t(
      _,
      {
        label: "System prompt override",
        help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
        children: /* @__PURE__ */ t(
          $e,
          {
            rows: 3,
            spellCheck: !1,
            value: e.systemPrompt ?? "",
            onChange: (d) => n({ systemPrompt: d.target.value || void 0 }),
            placeholder: "Leave blank to use the default classification system prompt.",
            "aria-label": "System prompt override"
          }
        )
      }
    ),
    /* @__PURE__ */ t(_, { label: "Max output tokens", help: "Default 256.", children: /* @__PURE__ */ t(
      he,
      {
        size: "sm",
        min: 64,
        max: 4096,
        step: 64,
        value: e.maxOutputTokens ?? 256,
        onChange: (d) => n({ maxOutputTokens: d }),
        "data-testid": "vision-classify-max-output-tokens"
      }
    ) })
  ] });
}
function Xc({
  data: e,
  onChange: n,
  nodeId: r
}) {
  const a = it("image:vision", On), i = !e.imageRefPath?.trim(), s = !e.userPrompt?.trim();
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      Be,
      {
        value: e.imageRefPath,
        onChange: (d) => n({ imageRefPath: d ?? "" }),
        nodeId: r,
        label: "Image ref path",
        help: i ? "Required — JSONPath to the imageId to describe." : "JSONPath to the imageId to describe."
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "User prompt",
        required: !0,
        error: s ? "User prompt is required." : void 0,
        help: "What to ask the model about the image.",
        children: /* @__PURE__ */ t(
          $e,
          {
            rows: 3,
            spellCheck: !1,
            invalid: s,
            value: e.userPrompt ?? "",
            onChange: (d) => n({ userPrompt: d.target.value }),
            placeholder: "Describe what you see in this image in one paragraph.",
            "aria-label": "User prompt"
          }
        )
      }
    ),
    /* @__PURE__ */ t(_, { label: "Model", children: /* @__PURE__ */ t(
      Ce,
      {
        size: "sm",
        value: e.model ?? a[0]?.value ?? "",
        onChange: (d) => n({ model: d.target.value }),
        "aria-label": "Model",
        options: a.map((d) => ({ value: d.value, label: d.label ?? d.value }))
      }
    ) }),
    /* @__PURE__ */ t(
      _,
      {
        label: "System prompt override",
        help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
        children: /* @__PURE__ */ t(
          $e,
          {
            rows: 3,
            spellCheck: !1,
            value: e.systemPrompt ?? "",
            onChange: (d) => n({ systemPrompt: d.target.value || void 0 }),
            placeholder: "Leave blank to use the default describe system prompt.",
            "aria-label": "System prompt override"
          }
        )
      }
    ),
    /* @__PURE__ */ t(_, { label: "Max output tokens", help: "Default 512.", children: /* @__PURE__ */ t(
      he,
      {
        size: "sm",
        min: 64,
        max: 4096,
        step: 64,
        value: e.maxOutputTokens ?? 512,
        onChange: (d) => n({ maxOutputTokens: d }),
        "data-testid": "vision-describe-max-output-tokens"
      }
    ) })
  ] });
}
const Qc = [
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (default — best OCR accuracy)" },
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (faster, lower accuracy)" }
];
function Zc({
  data: e,
  onChange: n,
  nodeId: r
}) {
  const a = it("image:vision-ocr", Qc), i = !e.imageRefPath?.trim();
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      Be,
      {
        value: e.imageRefPath,
        onChange: (s) => n({ imageRefPath: s ?? "" }),
        nodeId: r,
        label: "Image ref path",
        help: i ? "Required — JSONPath to the imageId to extract text from." : "JSONPath to the imageId to extract text from."
      }
    ),
    /* @__PURE__ */ t(_, { label: "Model", help: "Defaults to the more accurate model for OCR.", children: /* @__PURE__ */ t(
      Ce,
      {
        size: "sm",
        value: e.model ?? a[0]?.value ?? "",
        onChange: (s) => n({ model: s.target.value }),
        "aria-label": "Model",
        options: a.map((s) => ({ value: s.value, label: s.label ?? s.value }))
      }
    ) }),
    /* @__PURE__ */ t(
      _,
      {
        label: "System prompt override",
        help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
        children: /* @__PURE__ */ t(
          $e,
          {
            rows: 3,
            spellCheck: !1,
            value: e.systemPrompt ?? "",
            onChange: (s) => n({ systemPrompt: s.target.value || void 0 }),
            placeholder: "Leave blank to use the default OCR system prompt.",
            "aria-label": "System prompt override"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Max output tokens",
        help: "Default 1024. Increase for documents with large amounts of text.",
        children: /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 64,
            max: 8192,
            step: 64,
            value: e.maxOutputTokens ?? 1024,
            onChange: (s) => n({ maxOutputTokens: s }),
            "data-testid": "vision-extract-text-max-output-tokens"
          }
        )
      }
    )
  ] });
}
const ed = [
  { value: "amazon.titan-image-generator-v2:0", label: "Titan v2 (default)" },
  { value: "amazon.titan-image-generator-v1", label: "Titan v1" }
], pr = 64, ur = 2048, td = 8;
function nd({ data: e, onChange: n }) {
  const r = it("image:generate", ed), a = Tn("image:generate"), i = !e.prompt?.trim(), s = e.model ?? r[0]?.value ?? "";
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      _,
      {
        label: a.label("prompt", "Prompt"),
        required: !0,
        error: i ? "Prompt is required." : void 0,
        help: i ? void 0 : a.help("prompt", "Text description of the image to generate."),
        children: /* @__PURE__ */ t(
          $e,
          {
            rows: 4,
            spellCheck: !1,
            invalid: i,
            value: e.prompt ?? "",
            onChange: (d) => n({ prompt: d.target.value }),
            placeholder: a.placeholder(
              "prompt",
              "A photorealistic photograph of a golden retriever in a sunny meadow"
            ),
            "aria-label": "Prompt"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: a.label("model", "Model"),
        help: r.length === 0 ? "This host declares no image models." : a.help("model"),
        children: /* @__PURE__ */ t(
          Ce,
          {
            size: "sm",
            value: s,
            onChange: (d) => n({ model: d.target.value }),
            "aria-label": "Model",
            options: r.map((d) => ({ value: d.value, label: d.label ?? d.value }))
          }
        )
      }
    ),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ t("div", { className: "flex-1", children: /* @__PURE__ */ t(_, { label: a.label("width", "Width"), children: /* @__PURE__ */ t(
        he,
        {
          size: "sm",
          min: pr,
          max: ur,
          step: 64,
          unit: "px",
          value: e.width ?? 512,
          onChange: (d) => n({ width: d }),
          "data-testid": "generate-width"
        }
      ) }) }),
      /* @__PURE__ */ t("div", { className: "flex-1", children: /* @__PURE__ */ t(_, { label: a.label("height", "Height"), children: /* @__PURE__ */ t(
        he,
        {
          size: "sm",
          min: pr,
          max: ur,
          step: 64,
          unit: "px",
          value: e.height ?? 512,
          onChange: (d) => n({ height: d }),
          "data-testid": "generate-height"
        }
      ) }) })
    ] }),
    /* @__PURE__ */ t(
      _,
      {
        label: a.label("seed", "Seed"),
        help: "Optional — set for a reproducible result.",
        children: /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 0,
            step: 1,
            value: e.seed,
            onChange: (d) => n({ seed: d }),
            onClear: () => n({ seed: void 0 }),
            placeholder: "random",
            "data-testid": "generate-seed"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: a.label("numImages", "Number of images"),
        help: "Above 1, the step fans out with one arm per image, each carrying one imageId.",
        children: /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 1,
            max: td,
            step: 1,
            value: e.numImages ?? 1,
            onChange: (d) => n({ numImages: d }),
            "data-testid": "generate-num-images"
          }
        )
      }
    )
  ] });
}
const lo = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], rd = 8;
function od({ data: e, onChange: n, nodeId: r }) {
  const a = it("image:edit", lo);
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      Be,
      {
        value: e.sourceImagePath,
        onChange: (i) => n({ sourceImagePath: i }),
        nodeId: r
      }
    ),
    /* @__PURE__ */ t(_, { label: "Model", children: /* @__PURE__ */ t(
      Ce,
      {
        size: "sm",
        value: e.model ?? a[0]?.value ?? "",
        onChange: (i) => n({ model: i.target.value }),
        "aria-label": "Model",
        options: a.map((i) => ({ value: i.value, label: i.label ?? i.value }))
      }
    ) }),
    /* @__PURE__ */ t(
      _,
      {
        label: "Number of variations",
        help: "Always fans out — each variation becomes a separate arm downstream.",
        children: /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 1,
            max: rd,
            step: 1,
            value: e.numVariations ?? 1,
            onChange: (i) => n({ numVariations: i }),
            "data-testid": "variation-num-variations"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Similarity",
        help: "0 is very different, 1 is nearly identical. 0.7 is a good starting point.",
        children: /* @__PURE__ */ t(
          he,
          {
            size: "sm",
            min: 0,
            max: 1,
            step: 0.05,
            value: e.similarity ?? 0.7,
            onChange: (i) => n({ similarity: i }),
            "data-testid": "variation-similarity"
          }
        )
      }
    )
  ] });
}
const ad = ["$.steps.mask.output.imageId", "$.trigger.maskRef"];
function id({ data: e, onChange: n, nodeId: r }) {
  const a = it("image:edit", lo), i = !e.prompt?.trim();
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(
      Be,
      {
        value: e.sourceImagePath,
        onChange: (s) => n({ sourceImagePath: s }),
        nodeId: r
      }
    ),
    /* @__PURE__ */ o(
      _,
      {
        label: "Mask image path",
        help: "Optional. White pixels are the edit region, black is preserved. Omit for outpainting.",
        children: [
          /* @__PURE__ */ t(
            we,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              value: e.maskImagePath ?? "",
              onChange: (s) => n({ maskImagePath: s.target.value.trim() || void 0 }),
              placeholder: "$.steps.mask.output.imageId",
              "aria-label": "Mask image path"
            }
          ),
          /* @__PURE__ */ t(
            lt,
            {
              samples: ad,
              onSelect: (s) => n({ maskImagePath: s }),
              "aria-label": "Common mask paths"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Edit prompt",
        required: !0,
        error: i ? "Edit prompt is required." : void 0,
        help: "Describes what to generate in the masked region.",
        children: /* @__PURE__ */ t(
          $e,
          {
            rows: 4,
            spellCheck: !1,
            invalid: i,
            value: e.prompt ?? "",
            onChange: (s) => n({ prompt: s.target.value }),
            placeholder: "Replace the background with a sunny beach",
            "aria-label": "Edit prompt"
          }
        )
      }
    ),
    /* @__PURE__ */ t(_, { label: "Model", children: /* @__PURE__ */ t(
      Ce,
      {
        size: "sm",
        value: e.model ?? a[0]?.value ?? "",
        onChange: (s) => n({ model: s.target.value }),
        "aria-label": "Model",
        options: a.map((s) => ({ value: s.value, label: s.label ?? s.value }))
      }
    ) })
  ] });
}
const sd = {
  // -------------------------------------------------------------------------
  // Trigger
  // -------------------------------------------------------------------------
  trigger: /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "The entry point of every pipeline. Every pipeline has exactly one trigger." }),
    /* @__PURE__ */ t("h4", { children: "Trigger types" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "manual" }),
        " — started by clicking Run in the editor."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "document.finalize" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "document.submit" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "document.comment" }),
        " — fires on doc lifecycle events for a given document type."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "schedule" }),
        " — cron expression (e.g. ",
        /* @__PURE__ */ t("code", { children: "0 9 * * 1-5" }),
        ")."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "webhook" }),
        " — inbound HTTP POST at the configured path."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "triggerType" }),
        " — one of the above."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "documentTypeId" }),
        " — required for ",
        /* @__PURE__ */ t("code", { children: "document.*" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "schedule" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "webhookPath" }),
        " — per type."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "One output handle ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " that fires downstream with ",
      /* @__PURE__ */ t("code", { children: "{ trigger, payload }" }),
      " as the initial context."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // LLM
  // -------------------------------------------------------------------------
  llm: /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Calls an LLM with a prompt template filled from pipeline context." }),
    /* @__PURE__ */ t("h4", { children: "Provider & model" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "anthropic" }),
        " — Claude models (e.g. ",
        /* @__PURE__ */ t("code", { children: "claude-sonnet-4-6" }),
        ")."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "bedrock" }),
        " — same models via AWS Bedrock."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Prompt templates" }),
    /* @__PURE__ */ o("p", { children: [
      "Interpolate with ",
      /* @__PURE__ */ t("code", { children: "{{ context.steps.X.output }}" }),
      " or any dotted path into the run context."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Streaming" }),
    /* @__PURE__ */ o("p", { children: [
      "Toggle on to emit ",
      /* @__PURE__ */ t("code", { children: "pipeline.llm.token" }),
      " events as text arrives; off for a single response."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Errors" }),
    /* @__PURE__ */ o("p", { children: [
      "The ",
      /* @__PURE__ */ t("code", { children: "error" }),
      " handle routes downstream on LLM failure — retried per ",
      /* @__PURE__ */ t("code", { children: "RetryManager" }),
      " policy before surfacing here."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Transform
  // -------------------------------------------------------------------------
  transform: /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Pure data transform — JSONPath, template string, or sandboxed JavaScript. No side effects." }),
    /* @__PURE__ */ t("h4", { children: "When to use each" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "jsonpath" }),
        " — extract a value, e.g. ",
        /* @__PURE__ */ t("code", { children: "$.document.body.sections[0]" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "template" }),
        " — shape a string from context, e.g. ",
        /* @__PURE__ */ t("code", { children: "Hi {{context.user.name}}" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "javascript" }),
        " — arbitrary logic; runs in an isolated sandbox with ",
        /* @__PURE__ */ t("code", { children: "context" }),
        " as input."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Output" }),
    /* @__PURE__ */ o("p", { children: [
      /* @__PURE__ */ t("code", { children: "outputKey" }),
      " scopes the result into ",
      /* @__PURE__ */ o("code", { children: [
        "context.",
        "{outputKey}"
      ] }),
      ". Leave blank to merge into the root context."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Condition
  // -------------------------------------------------------------------------
  condition: /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Branches the flow based on a boolean expression evaluated over context." }),
    /* @__PURE__ */ t("h4", { children: "Expression language" }),
    /* @__PURE__ */ o("p", { children: [
      "JSONPath lookups combined with booleans and comparisons, e.g. ",
      /* @__PURE__ */ t("code", { children: '$.llm.output.sentiment == "positive"' }),
      " or ",
      /* @__PURE__ */ t("code", { children: "$.score > 0.8 && $.reviewed" }),
      "."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ t("code", { children: "true" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "false" }),
      ". Connected branches run; unconnected branches are skipped and their step is marked ",
      /* @__PURE__ */ t("code", { children: "skipped" }),
      "."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Action
  // -------------------------------------------------------------------------
  action: /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Performs a side-effect: updates a doc, posts a comment, notifies, calls a webhook, or invokes an MCP tool." }),
    /* @__PURE__ */ t("h4", { children: "Subtypes" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "update-document" }),
        " — patch a document's body."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "post-comment" }),
        " — append a comment thread entry."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "notify" }),
        " — push notification to users/roles."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "webhook" }),
        " — outbound HTTP request."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "mcp-tool" }),
        " — invoke a registered MCP tool by name."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Idempotent flag" }),
    /* @__PURE__ */ o("p", { children: [
      "If ",
      /* @__PURE__ */ t("code", { children: "idempotent" }),
      " is true, retries are safe after partial completion — the runtime may re-invoke the action without guarding against duplicates."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Errors" }),
    /* @__PURE__ */ o("p", { children: [
      "The ",
      /* @__PURE__ */ t("code", { children: "error" }),
      " handle routes on failure (after retries), or fails the run if ",
      /* @__PURE__ */ t("code", { children: "onError" }),
      " is ",
      /* @__PURE__ */ t("code", { children: "fail-run" }),
      "."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Fork
  // -------------------------------------------------------------------------
  fork: /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Splits the flow into N parallel branches that all run concurrently against the same context snapshot." }),
    /* @__PURE__ */ t("h4", { children: "Branch count" }),
    /* @__PURE__ */ o("p", { children: [
      "2-8 branches. Each branch exposes a handle ",
      /* @__PURE__ */ t("code", { children: "branch-0" }),
      ", ",
      /* @__PURE__ */ t("code", { children: "branch-1" }),
      ", etc."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Downstream" }),
    /* @__PURE__ */ o("p", { children: [
      "Typically paired with a ",
      /* @__PURE__ */ t("code", { children: "Join" }),
      " to merge results. Without a Join, each branch terminates independently and the run completes when all tails finish."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Join
  // -------------------------------------------------------------------------
  join: /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Combines N parallel branches back into one flow." }),
    /* @__PURE__ */ t("h4", { children: "Modes" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "all" }),
        " — wait for every input."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "any" }),
        " — fire as soon as the first input arrives; later inputs are ignored."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "n_of_m" }),
        " — fire after ",
        /* @__PURE__ */ t("code", { children: "n" }),
        " of ",
        /* @__PURE__ */ t("code", { children: "m" }),
        " inputs complete."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Merge strategies" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "deep-merge" }),
        " — recursive object merge."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "array-collect" }),
        " — collect each branch's output into an array."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "last-writer-wins" }),
        " — final branch to arrive replaces prior values."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Partial failures (§17.2)" }),
    /* @__PURE__ */ o("p", { children: [
      "In ",
      /* @__PURE__ */ t("code", { children: "all" }),
      " mode a failed branch fails the run. In ",
      /* @__PURE__ */ t("code", { children: "any" }),
      "/",
      /* @__PURE__ */ t("code", { children: "n_of_m" }),
      " failed branches count against the required total — the Join fires as soon as enough successes arrive."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Approval
  // -------------------------------------------------------------------------
  approval: /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ o("p", { children: [
      "Blocks the pipeline waiting for human approval. The run enters ",
      /* @__PURE__ */ t("code", { children: "awaiting_approval" }),
      " until decisions are recorded."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Approvers" }),
    /* @__PURE__ */ o("p", { children: [
      "A list of users or roles. ",
      /* @__PURE__ */ t("code", { children: "requiredCount" }),
      " controls how many approvals are needed (n-of-m)."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Timeout" }),
    /* @__PURE__ */ o("p", { children: [
      "Optional ",
      /* @__PURE__ */ t("code", { children: "timeoutMs" }),
      " with ",
      /* @__PURE__ */ t("code", { children: "timeoutAction" }),
      " of ",
      /* @__PURE__ */ t("code", { children: "reject" }),
      " or ",
      /* @__PURE__ */ t("code", { children: "approve" }),
      " — decides the outcome if no one responds in time."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ t("code", { children: "approved" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "rejected" }),
      ". The flow resumes down the matching branch."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Agent
  // -------------------------------------------------------------------------
  agent: /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Invokes a Strands agent via A2A protocol. The agent processes the input and returns a structured response." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "agentId" }),
        " — agent identifier, in whatever form the host's agent runtime uses."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "protocol" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "a2a" }),
        " (recommended) or ",
        /* @__PURE__ */ t("code", { children: "direct" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "inputTemplate" }),
        " — supports ",
        /* @__PURE__ */ t("code", { children: "{{context.*}}" }),
        " substitution."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "streaming" }),
        " — whether to stream the agent's response tokens."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " (success) and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      " (invocation failure)."
    ] })
  ] }),
  "mcp-tool": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Invokes an external tool through an MCP Gateway server." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "gatewayUrl" }),
        " — MCP Gateway endpoint."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "toolName" }),
        " — registered tool to invoke."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "inputTemplate" }),
        " — JSON input with substitution support."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "knowledge-base": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Queries a knowledge base for relevant document chunks (RAG retrieval). Which retrieval backend answers is configured by the host." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "knowledgeBaseId" }),
        " — knowledge base identifier."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "queryTemplate" }),
        " — natural language query with substitution."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "topK" }),
        " — number of chunks to retrieve (default 5)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "scoreThreshold" }),
        " — minimum relevance score (0–1)."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " (retrieved chunks in context) and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "graph-query": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Runs a query against a graph database. The query dialect is whatever the host's graph engine accepts." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "graphId" }),
        " — graph identifier."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "query" }),
        " — openCypher query (NOT Gremlin/SPARQL)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "parameters" }),
        " — named query parameters."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  memory: /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Reads from or writes to a scoped key/value memory (session or long-term). The backing store is supplied by the host." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "mode" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "read" }),
        " or ",
        /* @__PURE__ */ t("code", { children: "write" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "scope" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "session" }),
        " (ephemeral) or ",
        /* @__PURE__ */ t("code", { children: "long-term" }),
        " (persistent)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "namespace" }),
        " — memory collection key."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "keyExpression" }),
        " — lookup key (read) or storage key (write)."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  guardrail: /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Applies content filtering. Evaluates input against the host's configured policies and routes accordingly." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "guardrailId" }),
        " — guardrail identifier."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "inputField" }),
        " — context path to evaluate."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "action" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "block" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "mask" }),
        ", or ",
        /* @__PURE__ */ t("code", { children: "warn" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ t("code", { children: "pass" }),
      " (content OK) and ",
      /* @__PURE__ */ t("code", { children: "block" }),
      " (content flagged)."
    ] })
  ] }),
  policy: /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Evaluates a Cedar authorization policy against principal/action/resource." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "policyStoreId" }),
        " — Cedar policy store identifier."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "principal" }),
        " — who is requesting (supports substitution)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "action" }),
        " — what action is being performed."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "resource" }),
        " — what resource is being accessed."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ t("code", { children: "allow" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "deny" }),
      "."
    ] })
  ] }),
  "ag-ui-output": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Streams output to the AG-UI frontend via Server-Sent Events. This is a terminal node — no downstream flow." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "sourceField" }),
        " — context path to stream."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "eventType" }),
        " — AG-UI event type to emit (TEXT_MESSAGE_CONTENT, STATE_DELTA, or CUSTOM)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "terminal" }),
        " — marks this as the pipeline endpoint."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "One input handle ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ". No output — this is the endpoint."
    ] })
  ] }),
  "image-source": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Injects an existing image into the pipeline context. Use this as the entry point for image-processing pipelines when the image is already stored in the blob store." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "imageId" }),
        " — optional; can be set at run time by the trigger or a preceding step."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "outputKey" }),
        " — the key written to pipeline context (default: ",
        /* @__PURE__ */ t("code", { children: "imageRef" }),
        ")."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "One output handle ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ". No inputs — this is a source node."
    ] })
  ] }),
  "image:save": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Writes a produced image to a named file in the artifact store. Dispatched server-side by the SaveStepHandler." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "sourceImagePath" }),
        " — JSONPath to the imageId to save (default: ",
        /* @__PURE__ */ t("code", { children: "$.scatter.parentImageId" }),
        ")."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "filenameTemplate" }),
        " — output filename; supports ",
        /* @__PURE__ */ t("code", { children: "{{scatter.item.label}}" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "{{scatter.index}}" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "{{scatter.parentImageId}}" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "One input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", one output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", one error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  scatter: /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Fans out over a collection — runs downstream nodes once per item in the scatter set. Results are collected by a downstream Join or Save node." }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "One input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ". One output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " that fires once per item in the scatter collection."
    ] })
  ] }),
  "image:resize": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Resizes an image to the target dimensions using sharp.resize()." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "width" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "height" }),
        " — target dimensions in pixels."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "fit" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "cover" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "contain" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "fill" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "inside" }),
        ", or ",
        /* @__PURE__ */ t("code", { children: "outside" }),
        " (default: ",
        /* @__PURE__ */ t("code", { children: "cover" }),
        ")."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "background" }),
        " — hex fill colour used by ",
        /* @__PURE__ */ t("code", { children: "contain" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "inside" }),
        " when padding is needed."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "withoutEnlargement" }),
        " — skip resize if image is already smaller than target."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:transform": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Applies a sequential chain of geometric operations to an image." }),
    /* @__PURE__ */ t("h4", { children: "Operations" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "rotate" }),
        " — rotate by degrees (e.g. 90, 180, 270)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "flip" }),
        " — mirror vertically."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "flop" }),
        " — mirror horizontally."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:format-convert": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Converts the image to a new format using sharp." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "format" }),
        " — target format: ",
        /* @__PURE__ */ t("code", { children: "jpeg" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "png" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "webp" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "avif" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "tiff" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "gif" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "quality" }),
        " — 1–100 for lossy formats."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "lossless" }),
        " — force lossless for WebP/AVIF."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:sharpen": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Applies unsharp mask sharpening via sharp." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "sigma" }),
        " — Gaussian sigma (0.5–3). Controls radius of the blur before differencing."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "m1" }),
        " — flat area threshold (default 1.0)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "m2" }),
        " — jagged area threshold (default 2.0)."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:watermark": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Composites an overlay image (watermark / logo) atop the source." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "overlayImageId" }),
        " — the watermark image stored in the blob store."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "gravity" }),
        " — placement: ",
        /* @__PURE__ */ t("code", { children: "northwest" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "north" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "northeast" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "west" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "center" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "east" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "southwest" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "south" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "southeast" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "opacity" }),
        " — 0.0–1.0 (default 1.0)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "offsetX" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "offsetY" }),
        " — pixel nudge from gravity anchor."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:crop": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Crops a rectangular region from the source image using a bounding box resolved from pipeline context." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "sourceImagePath" }),
        " — JSONPath to the source imageId (default: ",
        /* @__PURE__ */ t("code", { children: "$.trigger.imageRef" }),
        ")."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "bboxPath" }),
        " — JSONPath to a ",
        /* @__PURE__ */ t("code", { children: "{ x, y, width, height }" }),
        " object in context."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "materialize" }),
        " — if true, saves the cropped image to the blob store; otherwise returns inline."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      "."
    ] })
  ] }),
  "image:adjust-bw": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Converts a colour image to greyscale with an adjustable contrast." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "algorithm" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "luminosity" }),
        " (default), ",
        /* @__PURE__ */ t("code", { children: "average" }),
        ", or ",
        /* @__PURE__ */ t("code", { children: "lightness" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "contrast" }),
        " — multiplier applied after greyscale conversion (default 1.0)."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:adjust-layer": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Applies a composable stack of colour and filter adjustments in sequence." }),
    /* @__PURE__ */ t("h4", { children: "Layer kinds" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "brightness" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "contrast" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "saturation" }),
        " — multiplicative factor (1.0 = no change)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "hue" }),
        " — degrees to rotate the hue wheel."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "blur" }),
        " — Gaussian blur radius in pixels."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:dimensions": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ o("p", { children: [
      "Reads a source image's natural size and emits dimension data — ",
      /* @__PURE__ */ t("code", { children: "width" }),
      ", ",
      /* @__PURE__ */ t("code", { children: "height" }),
      ", ",
      /* @__PURE__ */ t("code", { children: "aspectRatio" }),
      ", plus ",
      /* @__PURE__ */ t("code", { children: "genWidth" }),
      "/",
      /* @__PURE__ */ t("code", { children: "genHeight" }),
      " scaled to fit within ",
      /* @__PURE__ */ t("code", { children: "maxEdge" }),
      ". It does ",
      /* @__PURE__ */ t("em", { children: "not" }),
      " output an image."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "sourceImagePath" }),
        " — JSONPath to the source image (optional; defaults to the upstream image)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "maxEdge" }),
        " — longest-edge cap used to derive the generation dimensions (default 1024)."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Image input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", data output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " (wire into Generate's width/height), error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:upscale": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Super-resolves a source image via a self-hosted x4 upscaler and outputs a new, higher-resolution image." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "sourceImagePath" }),
        " — JSONPath to the source image (optional; defaults to the upstream image)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "prompt" }),
        " — optional guidance forwarded to the upscaler."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "maxEdge" }),
        " — longest-edge cap applied before the 4× pass (default 1024)."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Image input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", image output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:vision-analyze": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Analyzes an image with a Claude vision model. Supports free-form caption mode (leave schema blank) or structured JSON extraction (provide a JSON Schema)." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "imageRefPath" }),
        " — JSONPath to the imageId (default: ",
        /* @__PURE__ */ t("code", { children: "$.trigger.imageRef" }),
        ")."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "userPrompt" }),
        " — required. What to ask the model about the image."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "outputSchema" }),
        " — optional JSON Schema; presence switches to structured extraction mode."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "model" }),
        " — default ",
        /* @__PURE__ */ t("code", { children: "claude-sonnet-4-6" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      "."
    ] })
  ] }),
  "image:vision-classify": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Classifies an image into one of a configured label set." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "labels" }),
        " — array of candidate labels (e.g. ",
        /* @__PURE__ */ t("code", { children: "['cat', 'dog', 'bird']" }),
        ")."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "model" }),
        " — default ",
        /* @__PURE__ */ t("code", { children: "claude-haiku-4-5" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Output" }),
    /* @__PURE__ */ o("p", { children: [
      "Produces ",
      /* @__PURE__ */ t("code", { children: "{ label, confidence }" }),
      " in context."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:vision-describe": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Generates a natural-language caption for an image via Claude Haiku." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "imageRefPath" }),
        " — JSONPath to the imageId."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "userPrompt" }),
        " — optional override (default: describe the image)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "systemPrompt" }),
        " — optional system context."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "maxOutputTokens" }),
        " — cap on response length."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:vision-tag": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Extracts ranked tags from an image. Open-vocabulary or guided by a candidate tag list." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "candidateTags" }),
        " — optional array to guide tagging. Leave blank for open-vocabulary."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "maxTags" }),
        " — maximum number of tags to return (default 10)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "model" }),
        " — default ",
        /* @__PURE__ */ t("code", { children: "claude-haiku-4-5" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:vision-extract-text": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Extracts text from an image via Claude vision (OCR)." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "imageRefPath" }),
        " — JSONPath to the imageId."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "model" }),
        " — default ",
        /* @__PURE__ */ t("code", { children: "claude-sonnet-4-6" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "systemPrompt" }),
        " — optional instruction for the extraction task."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "maxOutputTokens" }),
        " — response length cap."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Output" }),
    /* @__PURE__ */ o("p", { children: [
      "Produces ",
      /* @__PURE__ */ t("code", { children: "{ text, lines }" }),
      " in context."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:generate": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Generates images from a text prompt using the host's configured image model." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "prompt" }),
        " — required. Describes what to generate."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "model" }),
        " — default ",
        /* @__PURE__ */ t("code", { children: "amazon.titan-image-generator-v1" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "width" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "height" }),
        " — output dimensions."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "seed" }),
        " — optional for reproducible generation."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "numImages" }),
        " — 1–4 images to produce."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:variation": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Generates variations of a source image using Nova Canvas. Always fans out — each variation becomes a separate downstream arm." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "sourceImagePath" }),
        " — JSONPath to the source imageId."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "numVariations" }),
        " — 1–8 variations to generate (default 1)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "similarity" }),
        " — 0.0–1.0 how closely each variation resembles the source (default 0.7)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "model" }),
        " — default ",
        /* @__PURE__ */ t("code", { children: "amazon.nova-canvas-v1:0" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " (fires once per variation), error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:edit-prompt": /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Inpaints or outpaints a region of an image using Nova Canvas." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "prompt" }),
        " — required. Describes what to generate in the edited region."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "sourceImagePath" }),
        " — JSONPath to the source imageId."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "maskImagePath" }),
        " — optional JSONPath to a mask imageId (white = edit, black = preserve). Omit for outpainting."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ t("code", { children: "model" }),
        " — default ",
        /* @__PURE__ */ t("code", { children: "amazon.nova-canvas-v1:0" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] })
};
function ld({ data: e, onChange: n }) {
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o(
        "label",
        {
          htmlFor: "image-source-image-id",
          className: "block text-[12px] font-semibold text-text-primary",
          children: [
            "Image ID",
            " ",
            /* @__PURE__ */ t("span", { className: "text-text-secondary font-normal", children: "(optional — can be set at run time)" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        we,
        {
          id: "image-source-image-id",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: e.imageId ?? "",
          onChange: (r) => n({ imageId: r.target.value.trim() || void 0 }),
          placeholder: "img_xxxxxxxx"
        }
      ),
      /* @__PURE__ */ t("p", { className: "mt-0.5 text-[11px] text-text-secondary", children: "The imageId of an image already in the blob store. Leave blank to have the trigger or a preceding step supply the image at runtime." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o(
        "label",
        {
          htmlFor: "image-source-output-key",
          className: "block text-[12px] font-semibold text-text-primary",
          children: [
            "Output key",
            " ",
            /* @__PURE__ */ t("span", { className: "text-text-secondary font-normal", children: "(default: imageRef)" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        we,
        {
          id: "image-source-output-key",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: e.outputKey ?? "",
          onChange: (r) => n({ outputKey: r.target.value.trim() || void 0 }),
          placeholder: "imageRef"
        }
      ),
      /* @__PURE__ */ o("p", { className: "mt-0.5 text-[11px] text-text-secondary", children: [
        "The key written to pipeline context (accessible as",
        " ",
        /* @__PURE__ */ o("code", { children: [
          "$.trigger.",
          "<key>"
        ] }),
        " by downstream steps)."
      ] })
    ] })
  ] });
}
const cd = [
  "{{scatter.item.label}}",
  "{{scatter.index}}",
  "{{scatter.parentImageId}}"
];
function dd({ data: e, onChange: n, nodeId: r }) {
  const a = wt(r ?? null);
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o(
        "label",
        {
          htmlFor: "save-source-image-path",
          className: "block text-[12px] font-semibold text-text-primary",
          children: [
            "Source image path",
            " ",
            /* @__PURE__ */ t("span", { className: "text-text-secondary font-normal", children: "(optional)" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        we,
        {
          id: "save-source-image-path",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: e.sourceImagePath ?? "",
          onChange: (i) => n({ sourceImagePath: i.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ o("p", { className: "mt-0.5 text-[11px] text-text-secondary", children: [
        "JSONPath to the imageId to save. Defaults server-side to",
        " ",
        /* @__PURE__ */ t("code", { children: "$.scatter.parentImageId" }),
        "."
      ] }),
      /* @__PURE__ */ t(
        lt,
        {
          samples: a.map((i) => i.path),
          onSelect: (i) => n({ sourceImagePath: i })
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o(
        "label",
        {
          htmlFor: "save-filename-template",
          className: "block text-[12px] font-semibold text-text-primary",
          children: [
            "Filename template",
            " ",
            /* @__PURE__ */ t("span", { className: "text-text-secondary font-normal", children: "(optional)" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        we,
        {
          id: "save-filename-template",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: e.filenameTemplate ?? "",
          onChange: (i) => n({ filenameTemplate: i.target.value.trim() || void 0 }),
          placeholder: "crop-{{scatter.index}}.png"
        }
      ),
      /* @__PURE__ */ o("p", { className: "mt-0.5 text-[11px] text-text-secondary", children: [
        "Output filename. Supports",
        " ",
        /* @__PURE__ */ t("code", { children: "{{scatter.item.label}}" }),
        ",",
        " ",
        /* @__PURE__ */ t("code", { children: "{{scatter.index}}" }),
        ", and",
        " ",
        /* @__PURE__ */ t("code", { children: "{{scatter.parentImageId}}" }),
        " substitutions. Default:",
        " ",
        /* @__PURE__ */ o("code", { children: [
          "crop-",
          "{{scatter.index}}",
          ".png"
        ] }),
        "."
      ] }),
      /* @__PURE__ */ o("div", { className: "mt-1.5", children: [
        /* @__PURE__ */ t("div", { className: "text-[10px] text-text-secondary mb-1", children: "Quick-fill variable:" }),
        /* @__PURE__ */ t(
          lt,
          {
            samples: cd,
            onSelect: (i) => {
              const s = e.filenameTemplate ?? "";
              n({ filenameTemplate: s + i });
            }
          }
        )
      ] })
    ] })
  ] });
}
const mr = [
  { value: "read", label: "Read", help: "Look records up and write them into context." },
  { value: "write", label: "Write", help: "Persist a value from context into memory." }
], hr = [
  { value: "session", label: "Session", help: "Scoped to this run; cleared when the session ends." },
  { value: "long-term", label: "Long-term", help: "Persists across runs for the namespace." }
];
function pd({ data: e, onChange: n, nodeId: r }) {
  const { paths: a, unresolved: i } = Yt(r ?? null), s = e.mode === "write", d = !e.namespace?.trim(), c = !e.keyExpression?.trim(), l = s && !e.valueField?.trim(), p = mr.find((f) => f.value === e.mode)?.help, u = hr.find((f) => f.value === e.scope)?.help;
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ t(_, { label: "Mode", required: !0, help: p, children: /* @__PURE__ */ t(
      Ce,
      {
        size: "sm",
        value: e.mode,
        onChange: (f) => n({ mode: f.target.value }),
        "aria-label": "Memory mode",
        options: mr.map((f) => ({ value: f.value, label: f.label }))
      }
    ) }),
    /* @__PURE__ */ t(_, { label: "Scope", required: !0, help: u, children: /* @__PURE__ */ t(
      Ce,
      {
        size: "sm",
        value: e.scope,
        onChange: (f) => n({ scope: f.target.value }),
        "aria-label": "Memory scope",
        options: hr.map((f) => ({ value: f.value, label: f.label }))
      }
    ) }),
    /* @__PURE__ */ t(
      _,
      {
        label: "Namespace",
        required: !0,
        error: d ? "Namespace is required." : void 0,
        help: d ? void 0 : "Groups related records. Reads only see their own namespace.",
        children: /* @__PURE__ */ t(
          we,
          {
            size: "sm",
            mono: !0,
            spellCheck: !1,
            value: e.namespace ?? "",
            onChange: (f) => n({ namespace: f.target.value }),
            placeholder: "support-conversations",
            "aria-label": "Memory namespace"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      _,
      {
        label: "Key expression",
        required: !0,
        error: c ? "Key expression is required." : void 0,
        help: c ? void 0 : "Identifies the record. Supports {{ context.* }} substitution.",
        children: /* @__PURE__ */ t(
          we,
          {
            size: "sm",
            mono: !0,
            spellCheck: !1,
            value: e.keyExpression ?? "",
            onChange: (f) => n({ keyExpression: f.target.value }),
            placeholder: "{{context.trigger.userId}}",
            "aria-label": "Memory key expression"
          }
        )
      }
    ),
    /* @__PURE__ */ t(_, { label: "Available context", children: /* @__PURE__ */ t(
      Xt,
      {
        paths: a,
        unresolved: i(
          `${e.keyExpression ?? ""}
${s ? e.valueField ?? "" : ""}`
        ),
        onInsert: (f) => n({ keyExpression: `${e.keyExpression ?? ""}${f}` })
      }
    ) }),
    s ? /* @__PURE__ */ t(
      _,
      {
        label: "Value field",
        required: !0,
        error: l ? "Value field is required for a write." : void 0,
        help: l ? void 0 : "Context path whose value is persisted.",
        children: /* @__PURE__ */ t(
          we,
          {
            size: "sm",
            mono: !0,
            spellCheck: !1,
            value: e.valueField ?? "",
            onChange: (f) => n({ valueField: f.target.value || void 0 }),
            placeholder: "context.steps.llm-1.output",
            "aria-label": "Memory value field"
          }
        )
      }
    ) : /* @__PURE__ */ t(
      _,
      {
        label: "Output key",
        help: "Where retrieved records land in context. Defaults to this step's output.",
        children: /* @__PURE__ */ t(
          we,
          {
            size: "sm",
            mono: !0,
            spellCheck: !1,
            value: e.outputKey ?? "",
            onChange: (f) => n({ outputKey: f.target.value || void 0 }),
            placeholder: "recalled",
            "aria-label": "Memory output key"
          }
        )
      }
    )
  ] });
}
const ln = 100;
function ud({
  data: e,
  onChange: n,
  nodeId: r
}) {
  const { paths: a, unresolved: i } = Yt(r ?? null), s = Tn("knowledge-base"), d = !e.knowledgeBaseId?.trim(), c = !e.queryTemplate?.trim(), l = e.topK ?? 0, p = !Number.isFinite(l) || l < 1 || l > ln, u = e.scoreThreshold, f = u !== void 0 && (u < 0 || u > 1);
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o(ht, { title: "Knowledge base", children: [
      /* @__PURE__ */ t(
        _,
        {
          label: s.label("knowledgeBaseId", "Knowledge base ID"),
          required: !0,
          error: d ? "Knowledge base ID is required." : void 0,
          help: d ? void 0 : s.help("knowledgeBaseId", "The knowledge base to retrieve from."),
          children: /* @__PURE__ */ t(
            we,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              value: e.knowledgeBaseId ?? "",
              onChange: (h) => n({ knowledgeBaseId: h.target.value }),
              placeholder: s.placeholder("knowledgeBaseId", "my-knowledge-base"),
              "aria-label": "Knowledge base ID"
            }
          )
        }
      ),
      /* @__PURE__ */ t(
        _,
        {
          label: s.label("queryTemplate", "Query template"),
          required: !0,
          error: c ? "Query template is required." : void 0,
          help: c ? void 0 : s.help(
            "queryTemplate",
            "Text to embed and search. Supports {{ context.* }} substitution."
          ),
          children: /* @__PURE__ */ t(
            $e,
            {
              rows: 4,
              invalid: c,
              spellCheck: !1,
              value: e.queryTemplate ?? "",
              onChange: (h) => n({ queryTemplate: h.target.value }),
              placeholder: "{{context.trigger.question}}",
              "aria-label": "Query template"
            }
          )
        }
      ),
      /* @__PURE__ */ t(_, { label: "Available context", children: /* @__PURE__ */ t(
        Xt,
        {
          paths: a,
          unresolved: i(e.queryTemplate ?? ""),
          onInsert: (h) => n({ queryTemplate: `${e.queryTemplate ?? ""}${h}` })
        }
      ) })
    ] }),
    /* @__PURE__ */ o(ht, { title: "Retrieval", children: [
      /* @__PURE__ */ t(
        _,
        {
          label: s.label("topK", "Top K"),
          required: !0,
          error: p ? `Must be between 1 and ${ln}.` : void 0,
          help: p ? void 0 : s.help("topK", "How many passages to retrieve."),
          children: /* @__PURE__ */ t(
            he,
            {
              size: "sm",
              min: 1,
              max: ln,
              step: 1,
              value: l,
              onChange: (h) => n({ topK: h }),
              invalid: p,
              "data-testid": "kb-top-k"
            }
          )
        }
      ),
      /* @__PURE__ */ t(
        _,
        {
          label: s.label("scoreThreshold", "Score threshold"),
          error: f ? "Must be between 0 and 1." : void 0,
          help: f ? void 0 : "Drop passages scoring below this. Leave empty for no filtering.",
          children: /* @__PURE__ */ t(
            he,
            {
              size: "sm",
              min: 0,
              max: 1,
              step: 0.05,
              value: u ?? 0,
              onChange: (h) => n({ scoreThreshold: h }),
              invalid: f,
              "data-testid": "kb-score-threshold"
            }
          )
        }
      ),
      /* @__PURE__ */ t(
        _,
        {
          label: "Output key",
          help: "Where retrieved passages land in context. Defaults to this step's output.",
          children: /* @__PURE__ */ t(
            we,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              value: e.outputKey ?? "",
              onChange: (h) => n({ outputKey: h.target.value || void 0 }),
              placeholder: "passages",
              "aria-label": "Output key"
            }
          )
        }
      ),
      /* @__PURE__ */ t(
        Lt,
        {
          value: e.retryPolicy,
          onChange: (h) => n({ retryPolicy: h })
        }
      )
    ] })
  ] });
}
const md = `MATCH (u:User {id: $userId})-[:AUTHORED]->(d:Doc)
RETURN d.title LIMIT 10`, cn = 100, dn = 3e5;
function hd({
  data: e,
  onChange: n,
  nodeId: r
}) {
  const { paths: a, unresolved: i } = Yt(r ?? null), s = Tn("graph-query"), d = !e.graphId?.trim(), c = !e.query?.trim(), l = e.timeoutMs, p = l !== void 0 && (!Number.isFinite(l) || l < cn || l > dn), u = W(
    () => Object.entries(e.parameters ?? {}),
    [e.parameters]
  ), f = (b) => n({ parameters: Object.keys(b).length > 0 ? b : void 0 }), [h, g] = S(null), x = (b, N) => {
    if (N !== b && N.trim() !== "" && N in (e.parameters ?? {})) {
      g(N);
      return;
    }
    g(null);
    const y = {};
    for (const [k, C] of u) y[k === b ? N : k] = C;
    f(y);
  }, m = (b, N) => f({ ...e.parameters ?? {}, [b]: N }), w = (b) => {
    const N = { ...e.parameters ?? {} };
    delete N[b], f(N);
  }, v = () => {
    let b = u.length + 1, N = `param${b}`;
    for (; N in (e.parameters ?? {}); ) N = `param${++b}`;
    f({ ...e.parameters ?? {}, [N]: "" });
  };
  return /* @__PURE__ */ o(Ne, { children: [
    /* @__PURE__ */ o(ht, { title: "Graph", children: [
      /* @__PURE__ */ t(
        _,
        {
          label: s.label("graphId", "Graph ID"),
          required: !0,
          error: d ? "Graph ID is required." : void 0,
          help: d ? void 0 : s.help("graphId", "The graph to query."),
          children: /* @__PURE__ */ t(
            we,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              value: e.graphId ?? "",
              onChange: (b) => n({ graphId: b.target.value }),
              placeholder: s.placeholder("graphId", "my-graph"),
              "aria-label": "Graph ID"
            }
          )
        }
      ),
      /* @__PURE__ */ t(
        _,
        {
          label: s.label("query", "Graph query"),
          required: !0,
          error: c ? "Query is required." : void 0,
          help: c ? void 0 : "Bind values with $parameters below rather than interpolating them.",
          children: /* @__PURE__ */ t(
            $e,
            {
              rows: 6,
              invalid: c,
              spellCheck: !1,
              value: e.query ?? "",
              onChange: (b) => n({ query: b.target.value }),
              placeholder: s.placeholder("query", md),
              "aria-label": "Graph query"
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ o(ht, { title: "Parameters", children: [
      /* @__PURE__ */ t(
        _,
        {
          label: "Bind parameters",
          help: "Each row binds one $name in the query. Values support {{ context.* }}.",
          children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", "data-testid": "graph-query-params", children: [
            u.length === 0 ? /* @__PURE__ */ t("p", { className: "text-[12px] text-[var(--color-text-secondary)]", children: "No parameters. The query runs exactly as written." }) : null,
            u.map(([b, N], y) => /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t(
                we,
                {
                  size: "sm",
                  mono: !0,
                  spellCheck: !1,
                  value: b,
                  onChange: (k) => x(b, k.target.value),
                  invalid: b.trim() === "",
                  placeholder: "userId",
                  "aria-label": `Parameter ${y + 1} name`
                }
              ),
              /* @__PURE__ */ t(
                we,
                {
                  size: "sm",
                  mono: !0,
                  spellCheck: !1,
                  value: N,
                  onChange: (k) => m(b, k.target.value),
                  placeholder: "{{context.trigger.userId}}",
                  "aria-label": `Parameter ${y + 1} value`
                }
              ),
              /* @__PURE__ */ t(
                Pe,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: () => w(b),
                  "aria-label": `Remove parameter ${b || y + 1}`,
                  children: "×"
                }
              )
            ] }, y)),
            h ? /* @__PURE__ */ o("p", { className: "text-[12px] text-[var(--color-danger)]", role: "alert", children: [
              "A parameter named “",
              h,
              "” already exists. Rename or remove it first — two rows cannot share a name."
            ] }) : null,
            /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(Pe, { size: "sm", variant: "secondary", onClick: v, children: "+ Add parameter" }) })
          ] })
        }
      ),
      /* @__PURE__ */ t(_, { label: "Available context", children: /* @__PURE__ */ t(
        Xt,
        {
          paths: a,
          unresolved: i(u.map(([, b]) => b).join(`
`)),
          onInsert: (b) => {
            const N = u[u.length - 1];
            if (!N) {
              f({ ...e.parameters ?? {}, param1: b });
              return;
            }
            m(N[0], `${N[1]}${b}`);
          }
        }
      ) })
    ] }),
    /* @__PURE__ */ o(ht, { title: "Execution", children: [
      /* @__PURE__ */ t(
        _,
        {
          label: "Timeout",
          error: p ? `Must be between ${cn} and ${dn} ms.` : void 0,
          help: p ? void 0 : "Leave empty to use the executor default.",
          children: /* @__PURE__ */ t(
            he,
            {
              size: "sm",
              min: cn,
              max: dn,
              step: 100,
              unit: "ms",
              value: l ?? 0,
              onChange: (b) => n({ timeoutMs: b }),
              invalid: p,
              "data-testid": "graph-query-timeout"
            }
          )
        }
      ),
      /* @__PURE__ */ t(
        _,
        {
          label: "Output key",
          help: "Where rows land in context. Defaults to this step's output.",
          children: /* @__PURE__ */ t(
            we,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              value: e.outputKey ?? "",
              onChange: (b) => n({ outputKey: b.target.value || void 0 }),
              placeholder: "rows",
              "aria-label": "Output key"
            }
          )
        }
      ),
      /* @__PURE__ */ t(
        Lt,
        {
          value: e.retryPolicy,
          onChange: (b) => n({ retryPolicy: b })
        }
      )
    ] })
  ] });
}
function fd({ result: e, className: n }) {
  const { caption: r, setting: a, location: i, timeOfDay: s, mood: d, colors: c } = e;
  return !r && !a && !i && !s && !d && (!c || c.length === 0) ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", n), children: [
    r ? /* @__PURE__ */ t("p", { className: "text-base leading-relaxed text-text-primary", children: r }) : null,
    /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1.5", children: [
      a ? /* @__PURE__ */ o(le, { tone: "neutral", size: "sm", title: "Scene setting", children: [
        "setting: ",
        a
      ] }) : null,
      i ? /* @__PURE__ */ o(le, { tone: "neutral", size: "sm", title: "Location", children: [
        "loc: ",
        i
      ] }) : null,
      s ? /* @__PURE__ */ o(le, { tone: "neutral", size: "sm", title: "Time of day", children: [
        "tod: ",
        s
      ] }) : null,
      d ? /* @__PURE__ */ o(le, { tone: "info", size: "sm", title: "Mood", children: [
        "mood: ",
        d
      ] }) : null,
      (c ?? []).map((l) => /* @__PURE__ */ o(
        "span",
        {
          className: "inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-secondary",
          title: `Dominant color: ${l}`,
          children: [
            /* @__PURE__ */ t(
              "span",
              {
                "aria-hidden": !0,
                className: "inline-block h-2.5 w-2.5 rounded-full border border-black/10",
                style: { background: l }
              }
            ),
            l
          ]
        },
        l
      ))
    ] })
  ] });
}
const gd = {
  people: { stroke: "#4f46e5", fill: "rgba(79,70,229,0.10)", text: "bg-primary text-white" },
  object: { stroke: "var(--color-warning)", fill: "rgba(217,119,6,0.10)", text: "bg-warning text-white" }
};
function xd({
  imageUrl: e,
  imageDataUrl: n,
  imageWidth: r,
  imageHeight: a,
  people: i,
  objects: s,
  show: d = "both",
  onSelectPerson: c,
  onSelectObject: l,
  className: p,
  alt: u
}) {
  const f = n ?? e, [h, g] = S(null), x = ce(null), m = E(() => {
    const b = x.current;
    b && (!r || !a) && g({ w: b.naturalWidth, h: b.naturalHeight });
  }, [r, a]), w = W(() => r && a && r > 0 && a > 0 ? { w: r, h: a } : h && h.w > 0 && h.h > 0 ? h : null, [r, a, h]), v = (b, N, y, k, C) => {
    if (!w) return null;
    const T = Math.max(0, Math.min(b.x1, w.w)), M = Math.max(0, Math.min(b.y1, w.h)), P = Math.max(0, Math.min(b.x2, w.w)), D = Math.max(0, Math.min(b.y2, w.h));
    if (!Number.isFinite(T) || !Number.isFinite(M) || !Number.isFinite(P) || !Number.isFinite(D) || P <= T || D <= M) return null;
    const re = T / w.w * 100, A = M / w.h * 100, J = (P - T) / w.w * 100, Q = (D - M) / w.h * 100, G = gd[y];
    return /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: k,
        title: N,
        "aria-label": `${y === "people" ? "Person" : "Object"} bounding box: ${N}`,
        className: "group absolute m-0 cursor-pointer border-0 p-0 outline-none focus:ring-2 focus:ring-offset-1",
        style: {
          left: `${re}%`,
          top: `${A}%`,
          width: `${J}%`,
          height: `${Q}%`,
          background: G.fill,
          border: `2px solid ${G.stroke}`,
          borderRadius: "2px"
        },
        children: /* @__PURE__ */ t(
          "span",
          {
            className: I(
              "pointer-events-none absolute -top-5 left-0 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none shadow",
              G.text
            ),
            children: N
          }
        )
      },
      C
    );
  };
  return f ? /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "relative w-full overflow-hidden rounded-lg border border-border bg-black/5",
        p
      ),
      children: [
        /* @__PURE__ */ t(
          "img",
          {
            ref: x,
            src: f,
            alt: u ?? "",
            onLoad: m,
            className: "block h-auto w-full object-contain",
            draggable: !1
          }
        ),
        w ? /* @__PURE__ */ t("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ o("div", { className: "pointer-events-auto absolute inset-0", children: [
          (d === "people" || d === "both") && (i ?? []).map(
            (b) => v(
              b.bbox,
              `#${b.index}${b.activity ? " · " + b.activity.replace(/^::\s*/, "") : ""}`,
              "people",
              c ? () => c(b) : void 0,
              `p-${b.index}`
            )
          ),
          (d === "objects" || d === "both") && (s ?? []).map(
            (b, N) => v(
              b.bbox,
              b.label,
              "object",
              l ? () => l(b) : void 0,
              `o-${N}-${b.label}`
            )
          )
        ] }) }) : null
      ]
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: I(
        "flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-border-emphasis bg-surface-panel text-xs text-text-tertiary",
        p
      ),
      children: "(no image)"
    }
  );
}
function bd(e) {
  return {
    imageUrl: e.imageUrl,
    imageDataUrl: e.imageDataUrl,
    imageWidth: e.imageWidth,
    imageHeight: e.imageHeight,
    people: e.people,
    objects: e.objects
  };
}
function yd({ people: e, highlightedIndex: n, onSelect: r, className: a }) {
  return !e || e.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", a), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "People (",
      e.length,
      ")"
    ] }),
    /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1.5", children: e.map((i) => {
      const s = n === i.index, d = i.activity?.replace(/^::\s*/, ""), c = I(
        "group flex w-full flex-col gap-1 rounded-lg border px-2.5 py-2 text-left text-sm transition-colors",
        s ? "border-primary bg-primary-bg/70 ring-1 ring-primary" : "border-border bg-surface hover:bg-surface-hover"
      ), l = /* @__PURE__ */ o(H, { children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": !0,
              className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-white",
              children: i.index
            }
          ),
          i.ageBucket ? /* @__PURE__ */ t(le, { tone: "neutral", size: "sm", children: i.ageBucket.replace("_", " ") }) : null,
          i.gender ? /* @__PURE__ */ t(le, { tone: "neutral", size: "sm", children: i.gender }) : null,
          i.faceOrientation ? /* @__PURE__ */ t(le, { tone: "neutral", size: "sm", title: "Face orientation", children: i.faceOrientation }) : null,
          i.expression ? /* @__PURE__ */ t(le, { tone: "info", size: "sm", children: i.expression }) : null
        ] }),
        d ? /* @__PURE__ */ o("div", { className: "text-[13px] text-text-primary", children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "activity:" }),
          " ",
          d
        ] }) : null,
        i.clothing ? /* @__PURE__ */ o("div", { className: "text-[12px] text-text-secondary", children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "wearing:" }),
          " ",
          i.clothing
        ] }) : null
      ] });
      return r ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => r(i),
          className: I(
            c,
            "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          ),
          "aria-pressed": s,
          children: l
        }
      ) }, i.index) : /* @__PURE__ */ t("li", { className: c, children: l }, i.index);
    }) })
  ] });
}
function vd({ objects: e, onSelect: n, className: r }) {
  return !e || e.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Objects (",
      e.length,
      ")"
    ] }),
    /* @__PURE__ */ t("ul", { className: "grid grid-cols-1 gap-1 sm:grid-cols-2", children: e.map((a, i) => {
      const s = I(
        "flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 text-left text-[13px]"
      ), d = /* @__PURE__ */ o(H, { children: [
        /* @__PURE__ */ t("span", { className: "truncate font-medium text-text-primary", children: a.label }),
        /* @__PURE__ */ o("span", { className: "shrink-0 font-mono text-[10px] text-text-tertiary", children: [
          "[",
          a.bbox.x1,
          ",",
          a.bbox.y1,
          ",",
          a.bbox.x2,
          ",",
          a.bbox.y2,
          "]"
        ] })
      ] });
      return n ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => n(a),
          className: I(
            s,
            "cursor-pointer hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          ),
          children: d
        }
      ) }, `${a.label}-${i}`) : /* @__PURE__ */ t("li", { className: s, children: d }, `${a.label}-${i}`);
    }) })
  ] });
}
function wd({ tags: e, onTagClick: n, className: r }) {
  return !e || e.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ t("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Tags" }),
    /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5", children: e.map(
      (a) => n ? /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => n(a),
          title: `Filter by ${a}`,
          "aria-label": `Filter by ${a}`,
          className: "appearance-none border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-full",
          children: /* @__PURE__ */ o(le, { tone: "info", size: "sm", children: [
            "#",
            a
          ] })
        },
        a
      ) : /* @__PURE__ */ o(le, { tone: "info", size: "sm", children: [
        "#",
        a
      ] }, a)
    ) })
  ] });
}
function jt(e) {
  return e ? e === "correct" || e === "neutral" || e === "normal" ? "success" : "warning" : "neutral";
}
function pn(e) {
  const n = jt(e);
  return n === "success" ? `OK · ${e}` : n === "warning" ? `ADJUST · ${e}` : e ?? "";
}
function Nd({
  exposure: e,
  whiteBalance: n,
  contrast: r,
  composition: a,
  edits: i,
  onApplyEdit: s,
  className: d
}) {
  const c = e || n || r || a, l = (i ?? []).length > 0;
  return !c && !l ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", d), children: [
    /* @__PURE__ */ t("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Edits & Quality" }),
    c ? /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-1.5 sm:grid-cols-2", children: [
      e ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-text-tertiary", children: "EXPOSURE" }),
          /* @__PURE__ */ t(le, { tone: jt(e.verdict), size: "sm", children: pn(e.verdict) }),
          e.evAdjustment !== 0 ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
            e.evAdjustment > 0 ? "+" : "",
            e.evAdjustment.toFixed(1),
            " EV"
          ] }) : null
        ] }),
        /* @__PURE__ */ t("p", { className: "mt-1 text-[12px] text-text-primary", children: e.rationale })
      ] }) : null,
      n ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-text-tertiary", children: "WB" }),
          /* @__PURE__ */ t(le, { tone: jt(n.verdict), size: "sm", children: pn(n.verdict) }),
          n.kelvinShift ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
            n.kelvinShift > 0 ? "+" : "",
            n.kelvinShift,
            "K"
          ] }) : null
        ] }),
        /* @__PURE__ */ t("p", { className: "mt-1 text-[12px] text-text-primary", children: n.rationale })
      ] }) : null,
      r ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-text-tertiary", children: "CONTRAST" }),
        /* @__PURE__ */ t("span", { className: "ml-1.5", children: /* @__PURE__ */ t(le, { tone: jt(r), size: "sm", children: pn(r) }) })
      ] }) : null,
      a ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-text-tertiary", children: "COMPOSITION" }),
        /* @__PURE__ */ t("p", { className: "mt-1 text-[12px] text-text-primary", children: a })
      ] }) : null
    ] }) : null,
    l ? /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1", children: (i ?? []).map((p, u) => /* @__PURE__ */ o(
      "li",
      {
        className: "flex items-start justify-between gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[13px]",
        children: [
          /* @__PURE__ */ t("span", { className: "flex-1 text-text-primary", children: p }),
          s ? /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => s(p),
              className: "shrink-0 rounded-md border border-border bg-surface-hover px-2 py-0.5 text-[11px] font-medium text-text-primary hover:bg-surface-panel focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              children: "Apply"
            }
          ) : null
        ]
      },
      `${u}-${p.slice(0, 20)}`
    )) }) : null
  ] });
}
function kd({
  result: e,
  showImage: n = !0,
  showCaption: r = !0,
  showPeople: a = !0,
  showObjects: i = !0,
  showTags: s = !0,
  showEdits: d = !0,
  showRawText: c = !1,
  onTagClick: l,
  onApplyEdit: p,
  className: u
}) {
  const [f, h] = S(), [g, x] = S(!1), m = (v) => h(f === v.index ? void 0 : v.index), w = bd(e);
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-4 text-text-primary", u), children: [
    /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-12", children: [
      n ? /* @__PURE__ */ o("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ t(
          xd,
          {
            ...w,
            onSelectPerson: m,
            alt: e.caption ?? "Vision result"
          }
        ),
        e.model ? /* @__PURE__ */ o("div", { className: "mt-2 flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
          /* @__PURE__ */ t("span", { className: "font-medium text-text-primary", children: e.model.endpointId }),
          /* @__PURE__ */ t("span", { children: "·" }),
          /* @__PURE__ */ o("span", { children: [
            "latency ",
            e.model.latencyMs,
            "ms"
          ] }),
          typeof e.model.tokensOut == "number" ? /* @__PURE__ */ o(H, { children: [
            /* @__PURE__ */ t("span", { children: "·" }),
            /* @__PURE__ */ o("span", { children: [
              e.model.tokensOut,
              " tok out"
            ] })
          ] }) : null
        ] }) : null
      ] }) : null,
      /* @__PURE__ */ o("div", { className: I("flex flex-col gap-4", n ? "md:col-span-5" : "md:col-span-12"), children: [
        r ? /* @__PURE__ */ t(fd, { result: e }) : null,
        a && e.people && e.people.length > 0 ? /* @__PURE__ */ t(
          yd,
          {
            people: e.people,
            highlightedIndex: f,
            onSelect: m
          }
        ) : null
      ] })
    ] }),
    i && e.objects && e.objects.length > 0 ? /* @__PURE__ */ t(vd, { objects: e.objects }) : null,
    s && e.tags && e.tags.length > 0 ? /* @__PURE__ */ t(wd, { tags: e.tags, onTagClick: l }) : null,
    d ? /* @__PURE__ */ t(
      Nd,
      {
        exposure: e.exposure,
        whiteBalance: e.whiteBalance,
        contrast: e.contrast,
        composition: e.composition,
        edits: e.edits,
        onApplyEdit: p
      }
    ) : null,
    e.text && e.text.length > 0 ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ t("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Text (OCR)" }),
      /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1", children: e.text.map((v, b) => /* @__PURE__ */ t(
        "li",
        {
          className: "rounded border border-border bg-surface px-2 py-1 font-mono text-[12px]",
          children: v
        },
        b
      )) })
    ] }) : null,
    c && e.rawText ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => x((v) => !v),
          "aria-expanded": g,
          "aria-label": `${g ? "Hide" : "Show"} raw model output`,
          className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded",
          children: [
            g ? "▾" : "▸",
            " Raw model output"
          ]
        }
      ),
      g ? /* @__PURE__ */ t("pre", { className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary", children: e.rawText }) : null
    ] }) : null
  ] });
}
const Cd = [
  { value: "claude-haiku-4-5-20251001", label: "Haiku 4.5" },
  { value: "claude-sonnet-4-6", label: "Sonnet 4.6" },
  { value: "claude-opus-4-7", label: "Opus 4.7" }
], fr = "claude-sonnet-4-6", gr = [
  { label: "— None —", value: void 0 },
  {
    label: "Detection regions",
    value: {
      type: "object",
      properties: {
        regions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: { type: "string" },
              x1: { type: "number" },
              y1: { type: "number" },
              x2: { type: "number" },
              y2: { type: "number" }
            },
            required: ["label", "x1", "y1", "x2", "y2"]
          }
        }
      },
      required: ["regions"]
    }
  },
  {
    label: "Multi-label tags",
    value: {
      type: "object",
      properties: {
        tags: { type: "array", items: { type: "string" } }
      },
      required: ["tags"]
    }
  },
  {
    label: "Caption + setting",
    value: {
      type: "object",
      properties: {
        caption: { type: "string" },
        setting: { type: "string" },
        mood: { type: "string" }
      },
      required: ["caption"]
    }
  },
  {
    label: "Classification (enum)",
    systemPrompt: "You are a precise image classification assistant. Return the single best label from the enum that describes the image. Edit the schema below to set your label set.",
    value: {
      type: "object",
      required: ["label"],
      properties: {
        label: {
          type: "string",
          enum: ["red", "green", "blue"]
        },
        confidence: { type: "number", minimum: 0, maximum: 1 }
      }
    }
  },
  {
    label: "Face detection",
    systemPrompt: "You are a face detection vision model. Identify all human faces in the image and return their bounding boxes (normalized [0,1] coordinates) with optional age/expression/gaze attributes when clearly visible. Return JSON conforming to the schema. Do NOT detect non-human faces.",
    value: {
      type: "object",
      required: ["faces"],
      properties: {
        faces: {
          type: "array",
          items: {
            type: "object",
            required: ["bbox", "confidence"],
            properties: {
              bbox: {
                type: "object",
                required: ["x", "y", "width", "height"],
                properties: {
                  x: { type: "number", minimum: 0, maximum: 1 },
                  y: { type: "number", minimum: 0, maximum: 1 },
                  width: { type: "number", minimum: 0, maximum: 1 },
                  height: { type: "number", minimum: 0, maximum: 1 }
                }
              },
              confidence: { type: "number", minimum: 0, maximum: 1 },
              age: { type: "string" },
              expression: { type: "string" },
              gaze: { type: "string" }
            }
          }
        }
      }
    }
  },
  {
    label: "Color palette",
    systemPrompt: "Analyze the dominant colors in this image. Return the top 5 colors as hex codes with their approximate percentage coverage. Classify the overall temperature as warm/cool/neutral.",
    value: {
      type: "object",
      required: ["dominant", "temperature"],
      properties: {
        dominant: {
          type: "array",
          maxItems: 5,
          items: {
            type: "object",
            required: ["hex", "percentage"],
            properties: {
              hex: { type: "string" },
              percentage: { type: "number", minimum: 0, maximum: 100 }
            }
          }
        },
        temperature: {
          type: "string",
          enum: ["warm", "cool", "neutral"]
        }
      }
    }
  },
  {
    label: "Image quality rating",
    systemPrompt: "Rate this image's technical and aesthetic quality on focus (sharpness), exposure (lighting), composition (framing/balance) — each 0-10. Provide an overall score 0-10 weighted as 30/30/40. Add one sentence rationale.",
    value: {
      type: "object",
      required: ["focus", "exposure", "composition", "overallScore", "rationale"],
      properties: {
        focus: { type: "integer", minimum: 0, maximum: 10 },
        exposure: { type: "integer", minimum: 0, maximum: 10 },
        composition: { type: "integer", minimum: 0, maximum: 10 },
        overallScore: { type: "integer", minimum: 0, maximum: 10 },
        rationale: { type: "string" }
      }
    }
  }
];
function Id(e) {
  const n = [`${e.inputTokens} in`, `${e.outputTokens} out`];
  return e.cacheReadTokens && n.push(`${e.cacheReadTokens} cached`), n.join(" / ");
}
function Sd({
  systemPrompt: e,
  userPrompt: n,
  outputSchema: r,
  model: a,
  onSave: i,
  apiBase: s = ""
}) {
  const d = zr(), [c, l] = S(e), [p, u] = S(n), [f, h] = S(a ?? fr), [g, x] = S(
    r ? JSON.stringify(r, null, 2) : ""
  ), [m, w] = S("0"), [v, b] = S(null), [N, y] = S(!1), [k, C] = S(null), [T, M] = S(null), P = E(() => {
    const Z = g.trim();
    if (Z)
      try {
        const O = JSON.parse(Z);
        if (O && typeof O == "object" && !Array.isArray(O))
          return O;
      } catch {
      }
  }, [g]), D = E((Z) => {
    w(Z);
    const O = Number(Z), R = gr[O];
    R && (x(R.value ? JSON.stringify(R.value, null, 2) : ""), R.systemPrompt !== void 0 && l(R.systemPrompt));
  }, []), re = v?.imageId ?? null, A = re ? d.getImageUrl(re) : null, J = E(async () => {
    if (!re) {
      C("Upload or paste a sample image URL first.");
      return;
    }
    if (!p.trim()) {
      C("User prompt is required.");
      return;
    }
    y(!0), C(null), M(null);
    const Z = P();
    try {
      const O = await fetch(`${s}/api/pipeline/preview/vision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageId: re,
          systemPrompt: c.trim() || void 0,
          userPrompt: p.trim(),
          outputSchema: Z,
          model: f || fr
        })
      }), R = await O.json();
      if (!O.ok) {
        C(R.error ?? `Request failed with status ${O.status}`);
        return;
      }
      if (R.failureReason) {
        C(`Model refused to answer (${R.failureReason}).`);
        return;
      }
      const Y = {
        imageUrl: A ?? "",
        caption: R.caption ?? "",
        rawText: typeof R.extracted == "object" && R.extracted ? JSON.stringify(R.extracted, null, 2) : void 0,
        model: {
          endpointId: f,
          latencyMs: R.latencyMs ?? 0,
          tokensIn: R.usage?.inputTokens,
          tokensOut: R.usage?.outputTokens
        }
      };
      M({
        visionResult: Y,
        rawExtracted: R.extracted,
        usage: R.usage ?? { inputTokens: 0, outputTokens: 0 },
        latencyMs: R.latencyMs ?? 0,
        costUsd: R.costUsd ?? 0
      });
    } catch (O) {
      C(O instanceof Error ? O.message : "Network error");
    } finally {
      y(!1);
    }
  }, [re, A, p, c, f, P, s]), Q = () => {
    i({
      systemPrompt: c,
      userPrompt: p,
      outputSchema: P()
    });
  }, G = "text-[12px] font-semibold text-text-secondary";
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-4 px-4 py-3", "data-testid": "vision-prompt-bench", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ t("div", { className: I(G, "mb-1"), children: "Sample image" }),
      /* @__PURE__ */ t(
        ao,
        {
          value: v,
          onChange: (Z) => b(Z),
          "data-testid": "bench-image-uploader"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("label", { className: G, children: "System prompt" }),
        /* @__PURE__ */ t(
          $e,
          {
            value: c,
            onChange: (Z) => l(Z.target.value),
            rows: 3,
            placeholder: "Optional override of the default vision system prompt.",
            "data-testid": "bench-system-prompt",
            className: "mt-1 text-[12px] font-mono"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("label", { className: G, children: [
          "User prompt ",
          /* @__PURE__ */ t("span", { className: "text-danger-fg", children: "*" })
        ] }),
        /* @__PURE__ */ t(
          $e,
          {
            value: p,
            onChange: (Z) => u(Z.target.value),
            rows: 3,
            placeholder: "Describe what you want the model to do with the image.",
            "data-testid": "bench-user-prompt",
            className: "mt-1 text-[12px]"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ t("label", { className: G, children: "Output schema" }),
          /* @__PURE__ */ t(
            Ce,
            {
              value: m,
              onChange: (Z) => D(Z.target.value),
              options: gr.map((Z, O) => ({ value: String(O), label: Z.label })),
              size: "sm",
              "aria-label": "Schema preset",
              "data-testid": "bench-schema-preset"
            }
          )
        ] }),
        /* @__PURE__ */ t(
          $e,
          {
            value: g,
            onChange: (Z) => x(Z.target.value),
            rows: 5,
            placeholder: "Optional JSON Schema for structured output. Leave empty for caption-only mode.",
            "data-testid": "bench-schema-textarea",
            className: "text-[11px] font-mono"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ t(
        Ce,
        {
          value: f,
          onChange: (Z) => h(Z.target.value),
          options: Cd,
          size: "sm",
          "aria-label": "Vision model",
          "data-testid": "bench-model-select"
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => {
            J();
          },
          disabled: N,
          className: I(
            "flex-1 py-1.5 px-4 text-[13px] font-semibold rounded-md cursor-pointer",
            "bg-primary text-white border-none",
            N ? "opacity-60 cursor-not-allowed" : "hover:bg-primary/90"
          ),
          "data-testid": "bench-try-btn",
          children: N ? "Running…" : "Try"
        }
      )
    ] }),
    k && /* @__PURE__ */ t(
      "div",
      {
        className: "text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded px-3 py-2",
        "data-testid": "bench-error",
        children: k
      }
    ),
    T && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2 border-t border-border pt-3", "data-testid": "bench-result", children: [
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1.5", children: [
        /* @__PURE__ */ o("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary", children: [
          Id(T.usage),
          " tokens"
        ] }),
        /* @__PURE__ */ o("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary", children: [
          T.latencyMs,
          " ms"
        ] }),
        /* @__PURE__ */ o("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary", children: [
          "$",
          T.costUsd.toFixed(4)
        ] })
      ] }),
      /* @__PURE__ */ t(
        kd,
        {
          result: T.visionResult,
          showImage: !1,
          showRawText: !!T.rawExtracted,
          "data-testid": "bench-vision-viewer"
        }
      ),
      T.rawExtracted !== null && T.rawExtracted !== void 0 && /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary", children: "Extracted JSON" }),
        /* @__PURE__ */ t(
          "pre",
          {
            className: "text-[10px] font-mono bg-surface-inset border border-border rounded p-2 overflow-x-auto",
            "data-testid": "bench-extracted-json",
            children: JSON.stringify(T.rawExtracted, null, 2)
          }
        )
      ] }),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: Q,
          className: I(
            "mt-1 w-full py-1.5 text-[12px] font-semibold rounded-md cursor-pointer",
            "bg-surface-hover border border-border text-text-primary",
            "hover:bg-surface-inset"
          ),
          "data-testid": "bench-save-btn",
          children: "Save to node"
        }
      )
    ] })
  ] });
}
const Td = {
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
  },
  "image-source": {
    icon: "🖼",
    name: "Image Source",
    docs: "Injects an existing image into the pipeline context. Provide an imageId or leave blank to receive the image from the trigger or a preceding step at runtime."
  },
  "image:save": {
    icon: "⬇",
    name: "Save Image",
    docs: "Writes a produced image to a named file in the artifact store. Configure the source image path and output filename template."
  },
  scatter: {
    icon: "🔀",
    name: "Scatter",
    docs: "Fans out over a collection — runs downstream nodes once per item in the scatter set."
  },
  "image:resize": {
    icon: "⥂",
    name: "Resize",
    docs: "Resize an image to target dimensions using sharp.resize(). Supports fit modes: cover, contain, fill, inside, outside."
  },
  "image:transform": {
    icon: "↻",
    name: "Transform (Geo)",
    docs: "Apply a chain of geometric operations — rotate, flip (vertical), flop (horizontal) — using sharp."
  },
  "image:format-convert": {
    icon: "⇌",
    name: "Format Convert",
    docs: "Convert image format (JPEG, PNG, WebP, AVIF, TIFF, GIF). Configure quality or lossless for supported formats."
  },
  "image:sharpen": {
    icon: "◈",
    name: "Sharpen",
    docs: "Sharpen an image using the unsharp mask algorithm. Configure sigma, m1, and m2 parameters."
  },
  "image:watermark": {
    icon: "⊕",
    name: "Watermark",
    docs: "Composite a watermark / overlay image atop the source. Configure gravity, opacity, and offset."
  },
  "image:crop": {
    icon: "✂",
    name: "Crop",
    docs: "Crop a region from the source image using a bounding box pulled from pipeline context via JSONPath."
  },
  "image:adjust-bw": {
    icon: "◐",
    name: "Adjust B/W",
    docs: "Convert an image to greyscale. Choose algorithm (luminosity, average, lightness) and contrast multiplier."
  },
  "image:adjust-layer": {
    icon: "𝍩",
    name: "Adjust Layers",
    docs: "Apply a composable stack of colour and filter adjustments — brightness, contrast, saturation, hue, blur."
  },
  "image:dimensions": {
    icon: "📐",
    name: "Dimensions",
    docs: "Read a source image's natural size and emit width/height/aspectRatio plus genWidth/genHeight scaled to fit maxEdge. Wire the derived dimensions into Generate."
  },
  "image:upscale": {
    icon: "⤢",
    name: "Upscale",
    docs: "4× super-resolution of a source image via a self-hosted upscaler. Outputs a new, higher-resolution image."
  },
  "image:vision-analyze": {
    icon: "📷",
    name: "Vision Analyze",
    docs: "Analyze an image with a Claude vision model. Supports free-form caption mode and structured JSON extraction."
  },
  "image:vision-classify": {
    icon: "🏷",
    name: "Vision Classify",
    docs: "Classify an image into one of a configured label set. Returns label + confidence score."
  },
  "image:vision-describe": {
    icon: "💬",
    name: "Vision Describe",
    docs: "Generate a natural-language caption for an image via Claude Haiku. Supports custom system and user prompts."
  },
  "image:vision-tag": {
    icon: "🔖",
    name: "Vision Tag",
    docs: "Extract ranked tags from an image. Supports open-vocabulary tagging or a guided candidate-tag list."
  },
  "image:vision-extract-text": {
    icon: "📝",
    name: "Vision Extract Text",
    docs: "OCR / text extraction from an image via a Claude vision model. Returns extracted text lines."
  },
  "image:generate": {
    icon: "✦",
    name: "Generate Image",
    docs: "Generate images from a text prompt using Bedrock Titan Image Generator. Configure dimensions and image count."
  },
  "image:variation": {
    icon: "⊞",
    name: "Variation",
    docs: "Generate variations of a source image using Nova Canvas. Always fans out — each variation becomes a separate pipeline arm."
  },
  "image:edit-prompt": {
    icon: "✎",
    name: "Edit Prompt",
    docs: "Inpaint or outpaint a region of an image using Nova Canvas. Provide an optional mask (white = edit, black = preserve)."
  }
}, un = /* @__PURE__ */ new Set([
  "image:vision-analyze",
  "image:vision-classify",
  "image:vision-describe",
  "image:vision-tag",
  "image:vision-extract-text"
]), Tt = ({ data: e }) => /* @__PURE__ */ t("div", { className: "p-4", "data-testid": "config-panel-no-settings", children: /* @__PURE__ */ t(
  qe,
  {
    icon: "⚙️",
    title: "No settings for this node type yet",
    description: /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ t("code", { className: "font-mono text-[12px]", children: String(e.type) }),
      " has no configurable options in this version. The node can sit on the canvas and connect to others, and it will run with its defaults wherever the executor supports it."
    ] })
  }
) }), Ym = [
  "agent",
  "mcp-tool",
  "guardrail",
  "policy",
  "ag-ui-output"
], $d = {
  trigger: vl,
  llm: $l,
  transform: Pl,
  condition: Ml,
  action: Bl,
  fork: Ul,
  join: Fl,
  approval: Kl,
  agent: Tt,
  "mcp-tool": Tt,
  "knowledge-base": ud,
  "graph-query": hd,
  memory: pd,
  guardrail: Tt,
  policy: Tt,
  "ag-ui-output": Tt,
  "image-source": ld,
  "image:save": dd,
  scatter: nc,
  "image:resize": oc,
  "image:transform": lc,
  "image:format-convert": uc,
  "image:sharpen": mc,
  "image:watermark": fc,
  "image:crop": Ic,
  "image:adjust-bw": Tc,
  "image:adjust-layer": Uc,
  "image:dimensions": zc,
  "image:upscale": qc,
  "image:vision-analyze": Jc,
  "image:vision-classify": Yc,
  "image:vision-describe": Xc,
  "image:vision-tag": Gc,
  "image:vision-extract-text": Zc,
  "image:generate": nd,
  "image:variation": od,
  "image:edit-prompt": id
};
function Ad(e, n) {
  const r = $d[e.type];
  return /* @__PURE__ */ t(r, { data: e.data, onChange: n, nodeId: e.id }, e.id);
}
function Rd({ selectedIds: e }) {
  const {
    definition: n,
    selectedNodeId: r,
    setSelectedNodeId: a,
    updateNodeData: i,
    removeNode: s,
    duplicateNodes: d
  } = Ke(), [c, l] = S("config"), p = ce(null), u = ce(null);
  An();
  const f = W(() => e && e.length > 1 ? e : r ? [r] : [], [e, r]), h = f.length > 1, g = f.length > 0, x = W(() => h || f.length === 0 || !n ? null : n.nodes.find((y) => y.id === f[0]) ?? null, [n, f, h]), m = E(() => {
    a(null);
  }, [a]);
  oe(() => {
    l("config");
  }, [f.join(",")]), oe(() => {
    if (!g) return;
    const y = (k) => {
      k.key === "Escape" && (k.stopPropagation(), m());
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [g, m]), oe(() => {
    if (!g) return;
    const y = (k) => {
      const C = p.current;
      C && (k.target instanceof Node && C.contains(k.target) || k.target instanceof Element && (k.target.closest("[data-node-type]") || m()));
    };
    return window.addEventListener("mousedown", y), () => window.removeEventListener("mousedown", y);
  }, [g, m]);
  const w = x ? Td[x.type] : null, v = () => {
    if (h)
      for (const y of f) s(y);
    else x && s(x.id);
  }, b = () => {
    f.length !== 0 && d(f);
  }, N = (y) => {
    x && i(x.id, y);
  };
  return /* @__PURE__ */ t("div", { ref: p, className: "flex flex-col flex-1 min-h-0 bg-white", "data-testid": "config-panel", children: h ? (
    // ---------------------------------------------------------------
    // Multi-select pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ o("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-border shrink-0", children: [
        /* @__PURE__ */ t("span", { className: "text-base", "aria-hidden": !0, children: "⧉" }),
        /* @__PURE__ */ o("div", { className: "flex-1 text-[13px] font-semibold text-text-primary", children: [
          f.length,
          " nodes selected"
        ] }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: m,
            className: "w-7 h-7 p-0 bg-transparent border-none text-neutral text-lg leading-none cursor-pointer rounded font-inherit",
            "aria-label": "Close",
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto p-4 flex flex-col gap-3", children: [
        /* @__PURE__ */ t("div", { className: "text-xs text-neutral leading-normal", children: "Bulk actions apply to every selected node. Individual node configuration is only shown for single selections." }),
        /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: v,
              className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-danger-fg border border-danger-border rounded-md cursor-pointer font-inherit",
              children: "Delete all"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: b,
              className: "px-2.5 py-1.5 text-xs font-semibold bg-surface-hover text-text-primary border border-border rounded-md cursor-pointer font-inherit",
              children: "Duplicate all"
            }
          )
        ] })
      ] })
    ] })
  ) : x && w ? (
    // ---------------------------------------------------------------
    // Single-node pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ o("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-border shrink-0", children: [
        /* @__PURE__ */ t("span", { className: "text-lg leading-none", "aria-hidden": !0, children: w.icon }),
        /* @__PURE__ */ t("div", { className: "flex-1 text-[13px] font-semibold text-text-primary", children: w.name }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: m,
            className: "w-7 h-7 p-0 bg-transparent border-none text-neutral text-lg leading-none cursor-pointer rounded font-inherit",
            "aria-label": "Close",
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ t(
        "div",
        {
          ref: u,
          role: "tablist",
          "aria-label": "Node configuration tabs",
          className: "h-9 flex border-b border-border shrink-0",
          onKeyDown: (y) => {
            const C = x && un.has(x.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"], T = C.indexOf(c);
            let M = null;
            y.key === "ArrowRight" ? M = C[(T + 1) % C.length] : y.key === "ArrowLeft" ? M = C[(T - 1 + C.length) % C.length] : y.key === "Home" ? M = C[0] : y.key === "End" && (M = C[C.length - 1]), M && (y.preventDefault(), l(M), u.current?.querySelector(
              `[data-tab="${M}"]`
            )?.focus());
          },
          children: (x && un.has(x.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"]).map((y) => {
            const k = c === y, C = y === "config" ? "Config" : y === "runs" ? "Runs" : y === "docs" ? "Docs" : "Bench";
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": k,
                tabIndex: k ? 0 : -1,
                "data-tab": y,
                className: I(
                  "flex-1 border-none bg-transparent text-xs font-semibold cursor-pointer font-inherit",
                  k ? "text-text-primary border-b-2 border-b-[#646cff]" : "text-neutral border-b-2 border-b-transparent"
                ),
                onClick: () => l(y),
                children: C
              },
              y
            );
          })
        }
      ),
      /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto", children: [
        c === "config" && Ad(x, N),
        c === "runs" && /* @__PURE__ */ t("div", { className: "p-6 text-xs text-neutral", children: "No runs yet." }),
        c === "docs" && /* @__PURE__ */ t("div", { className: "pipeline-docs-pane p-4 text-[13px] text-text-primary leading-snug", children: sd[x.type] ?? /* @__PURE__ */ t("p", { className: "text-text-secondary", children: "No docs available for this node type." }) }),
        c === "bench" && un.has(x.type) && (() => {
          const y = x.data;
          return /* @__PURE__ */ t(
            Sd,
            {
              systemPrompt: y.systemPrompt ?? "",
              userPrompt: y.userPrompt ?? "",
              outputSchema: y.outputSchema,
              model: y.model,
              onSave: (k) => {
                N(k);
              }
            }
          );
        })()
      ] }),
      /* @__PURE__ */ o("div", { className: "h-10 px-3 flex items-center justify-between gap-2 border-t border-border shrink-0", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: v,
            className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-danger-fg border border-transparent rounded-md cursor-pointer font-inherit",
            children: "🗑 Delete node"
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: b,
            className: "px-2.5 py-1.5 text-xs font-semibold bg-surface-hover text-text-primary border border-border rounded-md cursor-pointer font-inherit",
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
function De(e) {
  if (e == null) return "--";
  if (e < 1e3) return `${Math.round(e)}ms`;
  if (e < 6e4) return `${(e / 1e3).toFixed(1)}s`;
  const n = Math.floor(e / 6e4), r = Math.floor(e % 6e4 / 1e3);
  return `${n}m ${r}s`;
}
function ft(e) {
  if (!e) return "--";
  const n = new Date(e);
  if (Number.isNaN(n.getTime())) return "--";
  const r = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  };
  return new Intl.DateTimeFormat(void 0, r).format(n);
}
function Pd(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Dd(e) {
  return e == null || e === 0 ? "--" : e < 1e-3 ? "<$0.001" : e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Md(e) {
  return e == null || e === 0 ? "text-text-tertiary" : e < 0.01 ? "text-success-fg" : e < 0.1 ? "text-warning-fg" : e < 1 ? "text-caution-fg" : "text-danger-fg";
}
function xr(e) {
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
function mn(e) {
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
function Ed(e) {
  return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function st({ label: e, children: n }) {
  return /* @__PURE__ */ o("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ t("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: e }),
    /* @__PURE__ */ t("span", { className: "text-[13px] text-text-primary", children: n })
  ] });
}
function Od({ pipelineId: e, run: n, onBack: r }) {
  const a = Ve();
  return /* @__PURE__ */ o("div", { className: "absolute inset-0 z-[2] flex flex-col overflow-hidden bg-surface", children: [
    /* @__PURE__ */ o("div", { className: "flex shrink-0 items-center gap-2 border-b border-border px-4 py-2.5", children: [
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: r,
          className: "cursor-pointer border-none bg-transparent p-0 font-inherit text-[13px] text-primary",
          children: "← Back"
        }
      ),
      /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-tertiary", children: n.id.slice(0, 12) })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex-1 overflow-y-auto p-4", children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ t(st, { label: "Status", children: /* @__PURE__ */ t(
        le,
        {
          tone: xr(n.status),
          "aria-label": `Status: ${mn(n.status)}`,
          children: mn(n.status)
        }
      ) }),
      /* @__PURE__ */ t(st, { label: "Started", children: new Date(n.startedAt).toLocaleString() }),
      n.completedAt && /* @__PURE__ */ t(st, { label: "Completed", children: new Date(n.completedAt).toLocaleString() }),
      /* @__PURE__ */ t(st, { label: "Duration", children: De(n.durationMs) }),
      /* @__PURE__ */ t(st, { label: "Triggered by", children: Ed(n) }),
      /* @__PURE__ */ t(st, { label: "Trigger type", children: n.triggeredBy.triggerType }),
      n.estimatedCostUsd != null && n.estimatedCostUsd > 0 && /* @__PURE__ */ o(st, { label: "Est. Cost", children: [
        /* @__PURE__ */ t("span", { className: I("font-semibold", Md(n.estimatedCostUsd)), children: Dd(n.estimatedCostUsd) }),
        n.estimatedCostUsd > 1 && /* @__PURE__ */ t("span", { className: "ml-1.5 rounded-sm bg-warning-bg px-1 py-px text-[9px] font-bold uppercase text-warning-fg", children: "Budget Warning" })
      ] }),
      n.tokenUsage && Object.keys(n.tokenUsage).length > 0 && /* @__PURE__ */ o("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: "Cost Breakdown" }),
        Object.entries(n.tokenUsage).map(([i, s]) => /* @__PURE__ */ o(
          "div",
          {
            className: "flex items-center gap-2 py-0.5 text-[11px]",
            children: [
              /* @__PURE__ */ t("span", { className: "min-w-[100px] font-mono text-text-secondary", children: i }),
              /* @__PURE__ */ o("span", { className: "text-text-tertiary", children: [
                s.tokensIn.toLocaleString(),
                " in / ",
                s.tokensOut.toLocaleString(),
                " out"
              ] })
            ]
          },
          i
        ))
      ] }),
      n.error && /* @__PURE__ */ o("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("div", { className: "mb-1 text-[11px] font-semibold uppercase text-state-failed", children: "Error" }),
        /* @__PURE__ */ o("div", { className: "whitespace-pre-wrap break-words rounded-md bg-danger-bg px-2.5 py-2 font-mono text-xs text-danger-fg", children: [
          n.error.message,
          n.error.nodeId && /* @__PURE__ */ o("div", { className: "mt-1 text-[11px] text-danger-fg", children: [
            "at node: ",
            n.error.nodeId
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => a(`/pipelines/${e}/runs/${n.id}`),
          "data-testid": "runs-panel-replay-btn",
          className: "mt-3 w-full cursor-pointer rounded-md border-none bg-primary px-3.5 py-2 font-inherit text-[13px] font-semibold text-white",
          children: "View Full Run"
        }
      ),
      Object.keys(n.steps).length > 0 && /* @__PURE__ */ o("div", { className: "mt-2", children: [
        /* @__PURE__ */ o("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: [
          "Steps (",
          Object.keys(n.steps).length,
          ")"
        ] }),
        Object.entries(n.steps).map(([i, s]) => {
          const d = xr(s.status), c = mn(s.status), l = s.output, p = l?.response;
          return /* @__PURE__ */ o("div", { className: "mb-2", children: [
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2 py-1 text-xs", children: [
              /* @__PURE__ */ t(le, { tone: d, "aria-label": `Status: ${c}`, children: c }),
              /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: i.slice(0, 10) }),
              s.durationMs != null && /* @__PURE__ */ t("span", { className: "ml-auto text-[11px] text-text-tertiary", children: De(s.durationMs) })
            ] }),
            p && /* @__PURE__ */ t("div", { className: "mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-2 text-xs leading-relaxed text-text-primary", children: p }),
            l && !p && Object.keys(l).length > 0 && /* @__PURE__ */ t("div", { className: "mt-1 max-h-[120px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-1.5 font-mono text-[11px] text-text-secondary", children: JSON.stringify(l, null, 2) })
          ] }, i);
        })
      ] }),
      /* @__PURE__ */ t("div", { className: "mt-3", children: /* @__PURE__ */ o("details", { children: [
        /* @__PURE__ */ t("summary", { className: "cursor-pointer select-none text-[11px] text-text-tertiary", children: "Raw snapshot JSON" }),
        /* @__PURE__ */ t("pre", { className: "mt-1.5 max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-md border border-border bg-surface-inset p-2.5 text-[10px]", children: JSON.stringify(n, null, 2) })
      ] }) })
    ] }) })
  ] });
}
function br(e) {
  return e == null || e === 0 ? "--" : e < 1e-3 ? "<$0.001" : e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function _d(e) {
  return e == null || e === 0 ? "text-text-tertiary" : e < 0.01 ? "text-success-fg" : e < 0.1 ? "text-warning-fg" : e < 1 ? "text-caution-fg" : "text-danger-fg";
}
function Ld(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Bd(e) {
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
function Ud(e) {
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
function jd(e) {
  return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function zd({ pipelineId: e, onClose: n }) {
  const r = Ve(), [a, i] = S([]), [s, d] = S(!0), [c, l] = S(null), [p, u] = S(null), [f, h] = S(!1), [g, x] = S([]), m = ce(null), w = E(async () => {
    d(!0), l(null);
    try {
      const y = await qr(e, { limit: 50 });
      i(y.runs);
    } catch (y) {
      l(y instanceof Error ? y.message : "Failed to load runs");
    } finally {
      d(!1);
    }
  }, [e]);
  oe(() => {
    m.current !== e && (m.current = e, w());
  }, [e, w]), ze("*", E((y) => {
    const { eventType: k, payload: C } = y;
    if (!C || typeof C != "object") return;
    const T = C;
    if (!(T.pipelineId && T.pipelineId !== e))
      switch (k) {
        case "pipeline.run.started": {
          const M = C;
          if (M.pipelineId !== e) return;
          const P = {
            id: M.runId,
            pipelineId: M.pipelineId,
            pipelineVersion: 0,
            status: "running",
            triggeredBy: M.triggeredBy,
            ownerNodeId: "local",
            startedAt: M.at,
            currentStepIds: [],
            steps: {},
            context: {}
          };
          i((D) => [P, ...D.filter((re) => re.id !== M.runId)]);
          break;
        }
        case "pipeline.run.completed": {
          const M = C;
          i(
            (P) => P.map(
              (D) => D.id === M.runId ? { ...D, status: "completed", completedAt: M.at, durationMs: M.durationMs } : D
            )
          );
          break;
        }
        case "pipeline.run.failed": {
          const M = C;
          i(
            (P) => P.map(
              (D) => D.id === M.runId ? { ...D, status: "failed", completedAt: M.at, error: M.error } : D
            )
          );
          break;
        }
        case "pipeline.run.cancelled": {
          const M = C;
          i(
            (P) => P.map(
              (D) => D.id === M.runId ? { ...D, status: "cancelled", completedAt: M.at } : D
            )
          );
          break;
        }
      }
  }, [e]));
  const v = W(
    () => a.find((y) => y.id === p) ?? null,
    [a, p]
  ), b = E((y) => {
    x((k) => k.includes(y) ? k.filter((C) => C !== y) : k.length >= 2 ? [k[1], y] : [...k, y]);
  }, []), N = E(() => {
    if (g.length !== 2) return;
    const [y, k] = g;
    r(`/pipelines/${e}/compare?a=${y}&b=${k}`);
  }, [g, r, e]);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "relative flex min-h-0 flex-1 flex-col overflow-hidden bg-surface",
      "data-testid": "pipeline-runs-panel",
      children: [
        /* @__PURE__ */ o("div", { className: "flex shrink-0 items-center justify-between border-b border-border px-4 py-3", children: [
          /* @__PURE__ */ t("span", { className: "text-sm font-bold text-text-primary", children: "Run History" }),
          /* @__PURE__ */ o("div", { className: "ml-auto flex items-center gap-1.5", children: [
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => {
                  h(!f), f && x([]);
                },
                "data-testid": "runs-panel-compare-toggle",
                className: I(
                  "cursor-pointer rounded px-2 py-0.5 font-inherit text-[11px] font-medium",
                  f ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"
                ),
                children: "Compare"
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: n,
                "aria-label": "Close runs panel",
                className: "cursor-pointer rounded border-none bg-transparent px-1.5 py-0.5 text-base text-text-tertiary",
                children: "x"
              }
            )
          ] })
        ] }),
        f && /* @__PURE__ */ o(
          "div",
          {
            className: "flex shrink-0 items-center gap-2 border-b border-border bg-surface-inset px-4 py-2",
            "data-testid": "runs-panel-compare-bar",
            children: [
              /* @__PURE__ */ o("span", { className: "text-[11px] text-text-secondary", children: [
                g.length,
                "/2 selected"
              ] }),
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  disabled: g.length !== 2,
                  onClick: N,
                  "data-testid": "runs-panel-compare-action",
                  className: I(
                    "ml-auto rounded px-2.5 py-0.5 font-inherit text-[11px] font-semibold",
                    g.length === 2 ? "cursor-pointer border border-primary bg-primary text-white" : "cursor-not-allowed border border-border bg-surface text-text-disabled"
                  ),
                  children: "Compare"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative min-h-0 flex-1", children: [
          v && /* @__PURE__ */ t(
            Od,
            {
              pipelineId: e,
              run: v,
              onBack: () => u(null)
            }
          ),
          s && a.length === 0 && /* @__PURE__ */ t("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "Loading runs..." }),
          c && /* @__PURE__ */ o("div", { className: "p-4 text-center text-xs text-state-failed", children: [
            c,
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => {
                  w();
                },
                className: "mx-auto mt-2 block cursor-pointer border-none bg-transparent font-inherit text-xs text-primary underline",
                children: "Retry"
              }
            )
          ] }),
          !s && !c && a.length === 0 && /* @__PURE__ */ t("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "No runs yet. Trigger this pipeline to see history here." }),
          a.length > 0 && /* @__PURE__ */ t("ul", { className: "m-0 flex-1 list-none overflow-y-auto p-0", children: a.map((y) => {
            const k = Bd(y.status), C = Ud(y.status), T = g.includes(y.id);
            return /* @__PURE__ */ o(
              "li",
              {
                "data-testid": `runs-panel-row-${y.id}`,
                onClick: () => {
                  f ? b(y.id) : u(y.id);
                },
                className: I(
                  "cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover",
                  T && "bg-info-bg"
                ),
                children: [
                  /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
                    f && /* @__PURE__ */ t(
                      rt,
                      {
                        checked: T,
                        onChange: () => b(y.id),
                        onClick: (M) => M.stopPropagation(),
                        "data-testid": `runs-panel-compare-check-${y.id}`,
                        className: "m-0 shrink-0",
                        "aria-label": `Select run ${y.id.slice(0, 8)} for comparison`
                      }
                    ),
                    /* @__PURE__ */ t(le, { tone: k, "aria-label": `Status: ${C}`, children: C }),
                    /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-secondary", children: y.id.slice(0, 8) }),
                    /* @__PURE__ */ t("span", { className: "ml-auto text-[11px] text-text-tertiary", children: Ld(y.startedAt) })
                  ] }),
                  /* @__PURE__ */ o("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ t("span", { children: De(y.durationMs) }),
                    y.estimatedCostUsd != null && y.estimatedCostUsd > 0 && /* @__PURE__ */ t(
                      "span",
                      {
                        className: I("font-mono font-semibold", _d(y.estimatedCostUsd)),
                        title: `Estimated cost: ${br(y.estimatedCostUsd)}`,
                        children: br(y.estimatedCostUsd)
                      }
                    ),
                    y.estimatedCostUsd != null && y.estimatedCostUsd > 1 && /* @__PURE__ */ t("span", { className: "rounded-sm bg-warning-bg px-1 py-px text-[9px] font-bold uppercase text-warning-fg", children: "High Cost" }),
                    /* @__PURE__ */ t("span", { className: "ml-auto", children: jd(y) })
                  ] }),
                  y.error && /* @__PURE__ */ t("div", { className: "mt-1 truncate text-[11px] text-state-failed", children: y.error.message })
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
function Fd({
  pipelineId: e,
  selectedNodeId: n,
  sidebarTab: r,
  onTabChange: a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "w-[350px] shrink-0 border-l border-border bg-surface",
        "flex flex-col overflow-hidden"
      ),
      "data-testid": "right-sidebar",
      children: [
        !(n !== null && r === "config") && /* @__PURE__ */ o("div", { className: "h-[38px] flex border-b border-border shrink-0", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: I(
                "flex-1 border-none bg-transparent text-xs font-semibold",
                "cursor-pointer font-inherit px-2",
                r === "config" ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"
              ),
              onClick: () => a("config"),
              "data-testid": "sidebar-tab-config",
              children: "Config"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: I(
                "flex-1 border-none bg-transparent text-xs font-semibold",
                "cursor-pointer font-inherit px-2",
                r === "runs" ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"
              ),
              onClick: () => a("runs"),
              "data-testid": "sidebar-tab-runs",
              children: "Runs"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto flex flex-col", children: [
          r === "config" && (n !== null ? /* @__PURE__ */ t(Rd, {}) : /* @__PURE__ */ t("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          r === "runs" && /* @__PURE__ */ t(
            zd,
            {
              pipelineId: e,
              onClose: () => a("config")
            }
          )
        ] })
      ]
    }
  );
}
function qd(e) {
  return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Wd(e) {
  if (!e) return [];
  const n = /* @__PURE__ */ new Set(), r = /\{\{\s*context\.([a-zA-Z0-9_.]+)\s*\}\}/g;
  for (const a of e.nodes) {
    const i = a.data;
    if (i.type === "llm") {
      for (const s of (i.userPromptTemplate || "").matchAll(r))
        s[1].startsWith("steps.") || n.add(s[1]);
      for (const s of (i.systemPrompt || "").matchAll(r))
        s[1].startsWith("steps.") || n.add(s[1]);
    } else if (i.type === "transform" && i.expression)
      for (const s of i.expression.matchAll(r))
        s[1].startsWith("steps.") || n.add(s[1]);
  }
  return Array.from(n);
}
function Vd(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const n = e.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || e.isContentEditable);
}
function Xm() {
  const { pipelineId: e } = xt(), n = W(() => e ? ct(e) !== null : !1, [e]);
  return !e || !n ? /* @__PURE__ */ t(bt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t(Wr, { pipelineId: e, children: /* @__PURE__ */ t(Kd, { pipelineId: e }) });
}
function Kd({ pipelineId: e }) {
  const n = Ve(), r = Ke(), a = yt(), { toast: i } = Jt(), {
    definition: s,
    dirty: d,
    selectedNodeId: c,
    setSelectedNodeId: l,
    save: p,
    publish: u,
    revert: f,
    undo: h,
    redo: g,
    setTags: x
  } = r, m = Js(e), [w, v] = S(!1), b = ce(null), N = ce(d);
  oe(() => (N.current && !d && (v(!0), b.current && clearTimeout(b.current), b.current = setTimeout(() => v(!1), 450)), N.current = d, () => {
    b.current && (clearTimeout(b.current), b.current = null);
  }), [d]);
  const y = W(
    () => s ? to(s) : null,
    [s]
  ), k = (y?.errors.length ?? 0) > 0, C = W(
    () => Wd(s),
    [s]
  ), M = W(() => s ? s.nodes.some((ve) => ve.type === "trigger") : !1, [s]) ? ["trigger"] : [], [P, D] = S(!0), [re, A] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), J = E(() => {
    A((ve) => {
      const se = !ve;
      try {
        window.localStorage.setItem(
          "ws_pipelines_v1_show_tags",
          se ? "true" : "false"
        );
      } catch {
      }
      return se;
    });
  }, []), [Q, G] = S(!1), [Z, O] = S(!1), [R, Y] = S(!1), [F, L] = S(!1), [V, K] = S(!1), X = W(() => s?.publishedSnapshot ? s.publishedSnapshot : null, [s]), me = s?.status === "published", q = !m.isRunActive && (!me || k), de = m.isRunActive ? "Cancel the active run" : me ? k ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", Ie = E(async () => {
    if (m.isRunActive && m.currentRunId) {
      a.cancelRun(m.currentRunId);
      return;
    }
    if (!q) {
      if (C.length > 0) {
        m.setTriggerInputValues(
          Object.fromEntries(C.map((ve) => [ve, ""]))
        ), m.setTriggerInputOpen(!0);
        return;
      }
      m.handleRunClick();
    }
  }, [m, a, q, C]);
  oe(() => {
    const ve = (se) => {
      if (Vd(se.target)) return;
      const Ee = se.metaKey || se.ctrlKey;
      if (Ee && se.key.toLowerCase() === "s") {
        se.preventDefault(), p(), i("Saved", { type: "success", durationMs: 1200 });
        return;
      }
      if (Ee && se.key === "Enter") {
        se.preventDefault(), Ie();
        return;
      }
      if (Ee && se.key === ".") {
        se.preventDefault(), m.isRunActive && m.currentRunId && a.cancelRun(m.currentRunId);
        return;
      }
      if (Ee && se.shiftKey && se.key.toLowerCase() === "z") {
        se.preventDefault(), g();
        return;
      }
      if (Ee && se.key.toLowerCase() === "z") {
        se.preventDefault(), h();
        return;
      }
      if (se.key === "Escape") {
        l(null);
        return;
      }
    };
    return window.addEventListener("keydown", ve), () => window.removeEventListener("keydown", ve);
  }, [p, i, Ie, m, a, h, g, l]);
  const Fe = () => {
    if (!s) return;
    const ve = $n(s.id);
    ve && n(`/pipelines/${ve.id}`);
  }, Ze = () => {
    if (!s) return;
    const ve = xn(s.id);
    ve && Rt(`${qd(s.name)}.pipeline.json`, ve);
  }, He = async () => {
    if (!s) return;
    const ve = js(s);
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(ve), i("Mermaid diagram copied", { type: "success" });
      else
        throw new Error("clipboard unavailable");
    } catch (se) {
      console.warn("[PipelineEditor] clipboard write failed", se), i("Could not copy Mermaid diagram", { type: "error" });
    }
  }, Ue = () => {
    L(!0);
  }, Ge = () => {
    G(!1), !k && (u(), i("Pipeline published", { type: "success" }));
  }, Je = () => {
    s && (Po(s.id), O(!1), n("/pipelines"));
  }, Ye = () => {
    Vr(e), Y(!1), i("Run history cleared", { type: "success" });
  }, Ae = m.currentRunId ? a.runs[m.currentRunId] : void 0;
  return s ? /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "flex flex-col min-h-[calc(100vh-200px)]",
        "bg-surface-inset font-inherit text-text-primary",
        "rounded-lg border border-border overflow-hidden"
      ),
      "data-testid": "pipeline-editor",
      children: [
        /* @__PURE__ */ t(
          Ys,
          {
            pipelineId: e,
            definition: s,
            dirty: d,
            savingFlash: w,
            isRunActive: m.isRunActive,
            isTriggering: m.isTriggering,
            runDisabled: q,
            runTitle: de,
            currentRun: Ae,
            breakpoints: m.breakpoints,
            onRunClick: Ie,
            onDebugRunClick: m.handleDebugRunClick,
            onExport: Ze,
            onPublishClick: () => G(!0),
            onDuplicate: Fe,
            onCopyMermaid: He,
            onViewVersions: Ue,
            onRevert: f,
            onToggleShowTags: J,
            showTags: re,
            onViewRunHistory: () => m.setSidebarTab("runs"),
            onClearRunHistory: () => Y(!0),
            onSimPanelOpen: () => K(!0),
            onDelete: () => O(!0)
          }
        ),
        re && /* @__PURE__ */ o(
          "div",
          {
            "data-testid": "tags-row",
            className: I(
              "flex items-center gap-2 px-4 py-1.5",
              "border-b border-border bg-surface-inset",
              "min-h-[34px] shrink-0 sticky top-11 z-[4]"
            ),
            children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary font-semibold", children: "TAGS" }),
              /* @__PURE__ */ t(
                Pn,
                {
                  value: s.tags ?? [],
                  onChange: x,
                  placeholder: "add tag…"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ o("div", { className: "flex-1 flex min-h-0 relative overflow-hidden", children: [
          /* @__PURE__ */ t(Fi, { disabledTypes: M }),
          /* @__PURE__ */ t("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ t(
            rs,
            {
              errorNodeId: m.activeError?.nodeId ?? null,
              onErrorNodePosition: m.handleErrorNodePosition,
              breakpoints: m.breakpoints,
              onToggleBreakpoint: m.handleToggleBreakpoint,
              pausedAtNodeId: m.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ t(
            Fd,
            {
              pipelineId: e,
              selectedNodeId: c,
              sidebarTab: m.sidebarTab,
              onTabChange: m.setSidebarTab
            }
          )
        ] }),
        m.pausedBreakpoint && /* @__PURE__ */ t(
          sl,
          {
            definition: s,
            pausedBreakpoint: m.pausedBreakpoint,
            applyingPatch: m.applyingPatch,
            revertingPatchId: m.revertingPatchId,
            dirtyPatch: m.dirtyPatch,
            dirtyPatchStepId: m.dirtyPatchStepId,
            resetEditBufferKey: m.resetEditBufferKey,
            onContinue: m.handleBreakpointContinue,
            onStepOver: m.handleBreakpointStepOver,
            onResumeAll: m.handleBreakpointResumeAll,
            onApplyAndContinue: m.handleApplyAndContinue,
            onRevertPatch: m.handleRevertPatch,
            onEditBufferChange: m.handleContextEditBufferChange
          }
        ),
        m.activeError && m.errorNodeAnchor && /* @__PURE__ */ t(
          as,
          {
            error: m.activeError,
            anchor: m.errorNodeAnchor,
            onDismiss: m.handleDismissError,
            onRetry: m.handleRetryFromError
          }
        ),
        /* @__PURE__ */ t(
          Hs,
          {
            runId: m.currentRunId,
            visible: m.isRunActive && P
          }
        ),
        /* @__PURE__ */ t(
          Ks,
          {
            publishConfirmOpen: Q,
            onPublishClose: () => G(!1),
            onPublishConfirm: Ge,
            hasErrors: k,
            validationErrorCount: y?.errors.length ?? 0,
            definitionName: s.name,
            definitionVersion: s.version,
            deleteConfirmOpen: Z,
            onDeleteClose: () => O(!1),
            onDeleteConfirm: Je,
            clearRunsConfirmOpen: R,
            onClearRunsClose: () => Y(!1),
            onClearRunsConfirm: Ye,
            versionDiffOpen: F,
            onVersionDiffClose: () => L(!1),
            currentDef: s,
            publishedDef: X,
            onJumpToNode: l,
            simPanelOpen: V,
            onSimPanelClose: () => K(!1)
          }
        ),
        /* @__PURE__ */ t(
          Qe,
          {
            open: m.triggerInputOpen,
            onClose: () => m.setTriggerInputOpen(!1),
            title: "Trigger inputs",
            maxWidth: 480,
            footer: /* @__PURE__ */ o(H, { children: [
              /* @__PURE__ */ t(Pe, { variant: "ghost", onClick: () => m.setTriggerInputOpen(!1), children: "Cancel" }),
              /* @__PURE__ */ t(
                Pe,
                {
                  variant: "primary",
                  onClick: m.handleTriggerInputSubmit,
                  disabled: C.some((ve) => !m.triggerInputValues[ve]?.trim()),
                  children: "Run"
                }
              )
            ] }),
            children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ t("p", { className: "m-0 text-xs text-text-secondary", children: "This pipeline expects input data. Provide values for the trigger context:" }),
              C.map((ve) => /* @__PURE__ */ o("label", { className: "flex flex-col gap-1 text-xs", children: [
                /* @__PURE__ */ t("span", { className: "font-medium text-text-primary", children: ve }),
                /* @__PURE__ */ t(
                  $e,
                  {
                    "data-autofocus": ve === C[0] ? !0 : void 0,
                    rows: 3,
                    value: m.triggerInputValues[ve] ?? "",
                    onChange: (se) => m.setTriggerInputValues((Ee) => ({ ...Ee, [ve]: se.target.value })),
                    "aria-label": `Trigger input ${ve}`
                  }
                )
              ] }, ve))
            ] })
          }
        )
      ]
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: I(
        "flex flex-col min-h-[calc(100vh-200px)]",
        "bg-surface-inset font-inherit text-text-primary",
        "rounded-lg border border-border overflow-hidden"
      ),
      children: /* @__PURE__ */ t("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]", children: "Loading pipeline…" })
    }
  );
}
function Hd(e) {
  const n = e?.event;
  return !n || n === "manual" ? { icon: "▶", text: "Manual" } : n === "schedule" ? { icon: "⏱", text: e?.schedule ?? "Schedule" } : n === "webhook" ? { icon: "🔌", text: e?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${e?.event}` };
}
function Jd({
  row: e,
  onOpen: n,
  onRun: r,
  onDuplicate: a,
  onExport: i,
  onDelete: s,
  selectionMode: d,
  selected: c,
  anySelected: l,
  onToggleSelect: p
}) {
  const [u, f] = S(!1), [h, g] = S(!1), x = ce(null);
  gt(x, () => f(!1), u);
  const m = e.status === "published", w = e.status === "archived", v = typeof e.publishedVersion == "number", b = Hd(e.triggerBinding);
  let N, y;
  w ? (N = `Archived · v${e.version}`, y = "danger") : m ? (N = `Published · v${e.version}`, y = "success") : v ? (N = `Draft · v${e.version} (published v${e.publishedVersion})`, y = "warning") : (N = `Draft · v${e.version}`, y = "neutral");
  const k = !m, C = (P) => (D) => {
    D.stopPropagation(), P();
  }, T = d || c || h || l, M = (P) => {
    d ? p(P.shiftKey) : n();
  };
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": `pipeline-card-${e.id}`,
      "data-selected": c ? "true" : "false",
      onClick: M,
      onMouseEnter: () => g(!0),
      onMouseLeave: () => {
        g(!1), f(!1);
      },
      className: I(
        "flex flex-col gap-2 w-full px-3.5 py-3 bg-surface rounded-lg cursor-pointer relative transition-[border-color,box-shadow] duration-100",
        c ? "border border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : h ? "border border-primary shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "border border-border shadow-none"
      ),
      children: [
        T && /* @__PURE__ */ t(
          "label",
          {
            onClick: (P) => P.stopPropagation(),
            className: "absolute top-2 right-2 flex items-center justify-center w-[22px] h-[22px] cursor-pointer z-[1]",
            children: /* @__PURE__ */ t(
              rt,
              {
                "data-testid": `pipeline-select-${e.id}`,
                checked: c,
                "aria-label": `Select pipeline ${e.name}`,
                onClick: (P) => {
                  P.stopPropagation(), p(P.shiftKey);
                },
                onKeyDown: (P) => {
                  (P.key === " " || P.key === "Spacebar") && (P.preventDefault(), p(P.shiftKey));
                },
                onChange: () => {
                },
                className: "w-4 h-4"
              }
            )
          }
        ),
        /* @__PURE__ */ o("div", { className: I("flex items-center gap-2 min-w-0", T && "pr-7"), children: [
          /* @__PURE__ */ t("span", { className: "text-lg shrink-0", "aria-hidden": !0, children: e.icon }),
          /* @__PURE__ */ t(
            "div",
            {
              className: "flex-1 min-w-0 text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
              title: e.name,
              children: e.name
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ t(le, { "aria-label": `Status: ${N}`, tone: y, size: "sm", children: N }),
          /* @__PURE__ */ o("span", { className: "text-[11px] text-text-secondary", children: [
            b.icon,
            " ",
            b.text
          ] }),
          /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", children: [
            "· ",
            e.nodeCount,
            " node",
            e.nodeCount === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": `run-pipeline-${e.id}`,
              onClick: C(r),
              disabled: k,
              title: k ? "Run requires published state" : "Run pipeline",
              className: "px-3 py-[5px] text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
              children: "Run"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": `edit-pipeline-${e.id}`,
              onClick: C(n),
              className: "px-3 py-[5px] text-xs font-semibold bg-surface text-text-secondary border border-border-field rounded-md cursor-pointer font-[inherit]",
              children: "Edit"
            }
          ),
          /* @__PURE__ */ o("div", { className: "relative ml-auto", ref: x, children: [
            /* @__PURE__ */ t(
              "button",
              {
                "data-testid": `overflow-pipeline-${e.id}`,
                onClick: C(() => f((P) => !P)),
                "aria-label": "More actions",
                className: "px-2 py-1 text-sm font-bold bg-transparent text-text-secondary border border-transparent rounded-md cursor-pointer font-[inherit] leading-none",
                children: "⋯"
              }
            ),
            u && /* @__PURE__ */ o(
              "div",
              {
                "data-testid": `overflow-menu-${e.id}`,
                role: "menu",
                onClick: (P) => P.stopPropagation(),
                className: "absolute right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-[0_8px_24px_rgba(15,23,42,0.12)] min-w-[160px] z-10 overflow-hidden",
                children: [
                  /* @__PURE__ */ t("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: C(() => {
                    f(!1), a();
                  }), children: "Duplicate" }),
                  /* @__PURE__ */ t("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: C(() => {
                    f(!1), i();
                  }), children: "Export JSON" }),
                  /* @__PURE__ */ t(
                    "button",
                    {
                      className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-danger-fg",
                      role: "menuitem",
                      onClick: C(() => {
                        f(!1), s();
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
const Gd = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, Yd = ["draft", "published"];
function Xd({
  search: e,
  onSearchChange: n,
  statusFilter: r,
  statusExplicit: a,
  onToggleStatusKey: i,
  triggerFilter: s,
  onTriggerFilterChange: d,
  sortKey: c,
  onSortKeyChange: l,
  allVisibleSelected: p,
  someVisibleSelected: u,
  onHeaderToggleAll: f
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "min-h-[40px] shrink-0 flex items-center gap-3 px-6",
        "border-b border-border bg-white"
      ),
      children: [
        /* @__PURE__ */ o(
          "label",
          {
            className: "flex items-center gap-1.5 cursor-pointer",
            title: "Select all visible pipelines",
            children: [
              /* @__PURE__ */ t(
                rt,
                {
                  "data-testid": "pipeline-select-all",
                  "aria-label": "Select all visible pipelines",
                  checked: p,
                  indeterminate: u && !p,
                  onChange: f
                }
              ),
              /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "All" })
            ]
          }
        ),
        /* @__PURE__ */ t(
          we,
          {
            "data-testid": "pipeline-search",
            type: "search",
            size: "sm",
            placeholder: "Search...",
            value: e,
            onChange: (h) => n(h.target.value),
            className: "flex-[0_1_260px] min-w-45",
            "aria-label": "Search pipelines"
          }
        ),
        /* @__PURE__ */ t(
          "span",
          {
            id: "pipelines-status-label",
            className: "text-xs text-text-secondary font-medium",
            children: "Status:"
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            role: "group",
            "aria-labelledby": "pipelines-status-label",
            className: "flex gap-1.5 flex-nowrap shrink-0",
            children: _n.map((h) => {
              const g = a ? r.has(h) : Yd.includes(h);
              return /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  role: "checkbox",
                  "aria-checked": g,
                  "data-testid": `status-chip-${h}`,
                  onClick: () => i(h),
                  onKeyDown: (x) => {
                    (x.key === "Enter" || x.key === " ") && (x.preventDefault(), i(h));
                  },
                  className: I(
                    "px-3 py-1.5 text-xs font-medium rounded cursor-pointer font-inherit",
                    g ? "border border-primary bg-primary text-white" : "border border-border bg-white text-text-secondary"
                  ),
                  children: Gd[h]
                },
                h
              );
            })
          }
        ),
        /* @__PURE__ */ o("label", { className: "text-xs text-text-secondary flex items-center gap-1.5", children: [
          "Trigger:",
          /* @__PURE__ */ t(
            Ce,
            {
              "data-testid": "trigger-filter",
              size: "sm",
              value: s,
              onChange: (h) => d(h.target.value),
              "aria-label": "Trigger filter",
              options: [
                { value: "all", label: "All" },
                { value: "manual", label: "Manual" },
                { value: "document", label: "Document event" },
                { value: "schedule", label: "Schedule" },
                { value: "webhook", label: "Webhook" }
              ]
            }
          )
        ] }),
        /* @__PURE__ */ o("label", { className: "text-xs text-text-secondary flex items-center gap-1.5 ml-auto", children: [
          "Sort:",
          /* @__PURE__ */ t(
            Ce,
            {
              "data-testid": "sort-key",
              size: "sm",
              value: c,
              onChange: (h) => l(h.target.value),
              "aria-label": "Sort pipelines",
              options: [
                { value: "updated", label: "Recently updated" },
                { value: "name", label: "Name A-Z" },
                { value: "created", label: "Recently created" }
              ]
            }
          )
        ] })
      ]
    }
  );
}
const et = I(
  "px-2.5 py-[5px] text-xs font-semibold",
  "bg-white text-text-secondary",
  "border border-border-field rounded-md",
  "cursor-pointer font-inherit"
);
function Qd({
  count: e,
  onClear: n,
  onExport: r,
  onExportAsJSON: a,
  onPublish: i,
  onArchive: s,
  onAddTag: d,
  onRemoveTag: c,
  onDelete: l,
  onDeleteWithConfirm: p,
  addTagOpen: u,
  removeTagOpen: f,
  onSubmitAddTag: h,
  onSubmitRemoveTag: g,
  onCloseAddTag: x,
  onCloseRemoveTag: m,
  unionTags: w
}) {
  const [v, b] = S(""), N = ce(null), y = ce(null), k = ce(null);
  oe(() => {
    u && (b(""), setTimeout(() => N.current?.focus(), 30));
  }, [u]), oe(() => {
    if (!u) return;
    const T = (P) => {
      y.current?.contains(P.target) || x();
    }, M = window.setTimeout(() => {
      document.addEventListener("mousedown", T);
    }, 0);
    return () => {
      window.clearTimeout(M), document.removeEventListener("mousedown", T);
    };
  }, [u, x]), oe(() => {
    if (!f) return;
    const T = (P) => {
      k.current?.contains(P.target) || m();
    }, M = window.setTimeout(() => {
      document.addEventListener("mousedown", T);
    }, 0);
    return () => {
      window.clearTimeout(M), document.removeEventListener("mousedown", T);
    };
  }, [f, m]);
  const C = () => {
    const T = v.trim();
    T.length !== 0 && (h(T), b(""));
  };
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": "bulk-action-bar",
      className: I(
        "min-h-[40px] shrink-0 flex items-center gap-3 px-6",
        "border-b border-border bg-primary-bg",
        "sticky top-[56px] z-[1]"
      ),
      children: [
        /* @__PURE__ */ o(
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
        /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
        /* @__PURE__ */ t("button", { "data-testid": "bulk-clear", className: et, onClick: n, children: "Clear" }),
        /* @__PURE__ */ t("button", { "data-testid": "bulk-publish", className: et, onClick: i, children: "Publish selected" }),
        /* @__PURE__ */ t("button", { "data-testid": "bulk-archive", className: et, onClick: s, children: "Archive selected" }),
        /* @__PURE__ */ t("button", { "data-testid": "bulk-export-json", className: et, onClick: a, children: "Export selected as JSON" }),
        /* @__PURE__ */ t("button", { "data-testid": "bulk-export", className: et, onClick: r, children: "Export all" }),
        /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "bulk-delete-confirm-prompt",
            className: et,
            onClick: p,
            children: "Delete selected"
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", children: [
          /* @__PURE__ */ t("button", { "data-testid": "bulk-add-tag-btn", className: et, onClick: d, children: "Add tag..." }),
          u && /* @__PURE__ */ o(
            "div",
            {
              ref: y,
              "data-testid": "bulk-add-tag-popover",
              onClick: (T) => T.stopPropagation(),
              className: I(
                "absolute top-full left-0 mt-1.5",
                "bg-white border border-border rounded-lg",
                "shadow-lg min-w-[220px] p-2.5 z-10",
                "flex flex-col gap-2"
              ),
              children: [
                /* @__PURE__ */ t(
                  we,
                  {
                    ref: N,
                    size: "sm",
                    "data-testid": "bulk-add-tag-input",
                    placeholder: "Tag name",
                    value: v,
                    onChange: (T) => b(T.target.value),
                    onKeyDown: (T) => {
                      T.key === "Enter" ? (T.preventDefault(), C()) : T.key === "Escape" && (T.preventDefault(), x());
                    },
                    className: I(
                      "border border-border-field rounded-md px-2.5 py-1.5 text-[13px]",
                      "bg-surface-inset text-text-primary outline-none w-full"
                    ),
                    "aria-label": "Tag name"
                  }
                ),
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "bulk-add-tag-submit",
                    disabled: v.trim().length === 0,
                    onClick: C,
                    className: I(
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
        /* @__PURE__ */ o("div", { className: "relative", children: [
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "bulk-remove-tag-btn",
              className: I(
                et,
                w.length === 0 && "opacity-50 cursor-not-allowed"
              ),
              onClick: c,
              disabled: w.length === 0,
              title: w.length === 0 ? "No tags on selected pipelines" : "Remove tag from selected",
              children: "Remove tag..."
            }
          ),
          f && /* @__PURE__ */ o(
            "div",
            {
              ref: k,
              "data-testid": "bulk-remove-tag-popover",
              onClick: (T) => T.stopPropagation(),
              className: I(
                "absolute top-full left-0 mt-1.5",
                "bg-white border border-border rounded-lg",
                "shadow-lg min-w-[220px] max-w-[320px] p-2.5 z-10",
                "flex flex-col gap-2"
              ),
              children: [
                /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary", children: "Click a tag to remove it from all selected:" }),
                /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5", children: w.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "No tags to remove." }) : w.map((T) => /* @__PURE__ */ o(
                  "button",
                  {
                    "data-testid": `bulk-remove-tag-chip-${T}`,
                    onClick: () => g(T),
                    className: I(
                      "px-2 py-0.5 text-xs font-medium",
                      "bg-danger-bg text-danger-fg",
                      "border border-danger-border rounded-full",
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
        /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "bulk-delete",
            className: I(
              "px-3 py-[5px] text-xs font-semibold",
              "bg-danger text-white border-none rounded-md",
              "cursor-pointer font-inherit ml-auto"
            ),
            onClick: l,
            children: "Delete"
          }
        )
      ]
    }
  );
}
function Zd({
  visibleRows: e,
  filteredIds: n
}) {
  const [r, a] = S(!1), [i, s] = S(/* @__PURE__ */ new Set()), d = ce(null), c = ce(null), l = E(() => {
    s(/* @__PURE__ */ new Set());
  }, []), p = E(() => {
    r ? (l(), a(!1)) : a(!0);
  }, [r, l]), u = E(
    (m, w = !1) => {
      const v = e, b = v.findIndex((y) => y.id === m), N = d.current;
      b !== -1 && (d.current = b), s((y) => {
        const k = new Set(y), C = !k.has(m);
        if (w && N != null && b !== -1) {
          const T = Math.min(N, b), M = Math.max(N, b);
          for (let P = T; P <= M; P++) {
            const D = v[P];
            D && (C ? k.add(D.id) : k.delete(D.id));
          }
        } else C ? k.add(m) : k.delete(m);
        return k;
      });
    },
    [e]
  ), f = E(() => {
    s(new Set(n));
  }, [n]), h = e.length > 0 && e.every((m) => i.has(m.id)), g = !h && e.some((m) => i.has(m.id)), x = E(() => {
    s((m) => {
      const w = new Set(m);
      if (h)
        for (const v of e) w.delete(v.id);
      else
        for (const v of e) w.add(v.id);
      return w;
    }), r || a(!0);
  }, [h, e, r]);
  return oe(() => {
    c.current && (c.current.indeterminate = g);
  }, [g]), {
    selectionMode: r,
    selected: i,
    allVisibleSelected: h,
    someVisibleSelected: g,
    selectAllRef: c,
    handleToggleSelectMode: p,
    handleToggleSelect: u,
    handleSelectAllFiltered: f,
    handleHeaderToggleAll: x,
    clearSelection: l,
    setSelectionMode: a
  };
}
const ep = 280, Se = 160, tp = 40, np = 200;
function te(e) {
  return tp + e * ep;
}
function ne(e) {
  return np + e * Se;
}
function ae(e, n, r, a = "in") {
  return {
    id: crypto.randomUUID(),
    source: e,
    sourceHandle: n,
    target: r,
    targetHandle: a
  };
}
function rp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = {
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
    config: { body: `{{context.steps.${a}.response}}` },
    idempotent: !0,
    onError: "fail-run"
  }, l = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: s },
    { id: a, type: "llm", position: { x: te(1), y: ne(0) }, data: d },
    { id: i, type: "action", position: { x: te(2), y: ne(0) }, data: c }
  ], p = [
    ae(r, "out", a),
    ae(a, "out", i)
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
    nodes: l,
    edges: p,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function op(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = {
    type: "trigger",
    triggerType: "document.finalize",
    documentTypeId: "meeting-notes"
  }, u = {
    type: "fork",
    branchCount: 2,
    branchLabels: ["action-items", "summary"]
  }, f = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Extract action items from these meeting notes. Respond as a JSON array of {assignee, task, dueDate?}.",
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0.2,
    maxTokens: 1024,
    streaming: !1
  }, h = {
    type: "action",
    actionType: "update-document",
    config: {
      field: "tasks",
      value: `{{context.steps.${i}.response}}`
    },
    idempotent: !0,
    onError: "route-error"
  }, g = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Write a short team-friendly summary of this meeting.",
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0.4,
    maxTokens: 512,
    streaming: !0
  }, x = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "team",
      message: `Meeting summary: {{context.steps.${d}.response}}`
    },
    idempotent: !1,
    onError: "route-error"
  }, m = {
    type: "join",
    mode: "all",
    mergeStrategy: "deep-merge"
  }, w = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: p },
    { id: a, type: "fork", position: { x: te(1), y: ne(0) }, data: u },
    { id: i, type: "llm", position: { x: te(2), y: ne(0) - Se / 2 }, data: f },
    { id: s, type: "action", position: { x: te(3), y: ne(0) - Se / 2 }, data: h },
    { id: d, type: "llm", position: { x: te(2), y: ne(0) + Se / 2 }, data: g },
    { id: c, type: "action", position: { x: te(3), y: ne(0) + Se / 2 }, data: x },
    { id: l, type: "join", position: { x: te(4), y: ne(0) }, data: m }
  ], v = [
    ae(r, "out", a),
    ae(a, "branch-0", i),
    ae(i, "out", s),
    ae(s, "out", l, "in-0"),
    ae(a, "branch-1", d),
    ae(d, "out", c),
    ae(c, "out", l, "in-1")
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
    nodes: w,
    edges: v,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function ap(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = crypto.randomUUID(), f = {
    type: "trigger",
    triggerType: "document.comment"
  }, h = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'Classify the safety of this content. Respond with JSON {"safe": boolean, "reason": string}.',
    userPromptTemplate: "{{context.commentBody}}",
    temperature: 0,
    maxTokens: 128,
    streaming: !1
  }, g = {
    type: "condition",
    expression: `context.steps.${a}.output.safe === true`,
    label: "Safe?"
  }, x = {
    type: "action",
    actionType: "post-comment",
    config: { body: "{{context.commentBody}}" },
    idempotent: !0,
    onError: "fail-run"
  }, m = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "moderation",
      message: `Flagged comment: {{context.steps.${a}.output.reason}}`
    },
    idempotent: !0,
    onError: "fail-run"
  }, w = {
    type: "approval",
    approvers: [{ type: "role", value: "moderator" }],
    requiredCount: 1,
    timeoutMs: 1440 * 60 * 1e3,
    timeoutAction: "reject",
    message: "This comment was flagged by the safety classifier. Approve to post, reject to delete."
  }, v = {
    type: "condition",
    expression: `context.steps.${c}.output.decision === 'approve'`,
    label: "Approved?"
  }, b = {
    type: "action",
    actionType: "post-comment",
    config: { body: "{{context.commentBody}}" },
    idempotent: !0,
    onError: "fail-run"
  }, N = {
    type: "action",
    actionType: "update-document",
    config: { field: "commentStatus", value: "deleted" },
    idempotent: !0,
    onError: "fail-run"
  }, y = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: f },
    { id: a, type: "llm", position: { x: te(1), y: ne(0) }, data: h },
    { id: i, type: "condition", position: { x: te(2), y: ne(0) }, data: g },
    { id: s, type: "action", position: { x: te(3), y: ne(0) - Se / 2 }, data: x },
    { id: d, type: "action", position: { x: te(3), y: ne(0) + Se / 2 }, data: m },
    { id: c, type: "approval", position: { x: te(4), y: ne(0) + Se / 2 }, data: w },
    { id: l, type: "condition", position: { x: te(5), y: ne(0) + Se / 2 }, data: v },
    { id: p, type: "action", position: { x: te(6), y: ne(0) }, data: b },
    { id: u, type: "action", position: { x: te(6), y: ne(0) + Se }, data: N }
  ], k = [
    ae(r, "out", a),
    ae(a, "out", i),
    ae(i, "true", s),
    ae(i, "false", d),
    ae(d, "out", c),
    ae(c, "approved", l),
    ae(c, "rejected", u),
    ae(l, "true", p),
    ae(l, "false", u)
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
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function ip(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = {
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
  }, l = {
    type: "transform",
    transformType: "jsonpath",
    expression: `$.steps.${a}.response`,
    outputKey: "tags"
  }, p = {
    type: "action",
    actionType: "update-document",
    config: { field: "tags", value: "{{context.tags}}" },
    idempotent: !0,
    onError: "fail-run"
  }, u = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: d },
    { id: a, type: "llm", position: { x: te(1), y: ne(0) }, data: c },
    { id: i, type: "transform", position: { x: te(2), y: ne(0) }, data: l },
    { id: s, type: "action", position: { x: te(3), y: ne(0) }, data: p }
  ], f = [
    ae(r, "out", a),
    ae(a, "out", i),
    ae(i, "out", s)
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
    nodes: u,
    edges: f,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function sp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = {
    type: "trigger",
    triggerType: "document.finalize"
  }, c = {
    type: "approval",
    approvers: [{ type: "role", value: "team-lead" }],
    requiredCount: 1,
    timeoutMs: 2880 * 60 * 1e3,
    timeoutAction: "reject",
    message: "Team-lead approval required before this document can advance."
  }, l = {
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
  }, u = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: d },
    { id: a, type: "approval", position: { x: te(1), y: ne(0) }, data: c },
    { id: i, type: "approval", position: { x: te(2), y: ne(0) }, data: l },
    { id: s, type: "action", position: { x: te(3), y: ne(0) }, data: p }
  ], f = [
    ae(r, "out", a),
    ae(a, "approved", i),
    ae(i, "approved", s)
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
    nodes: u,
    edges: f,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function lp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = {
    type: "trigger",
    triggerType: "webhook",
    webhookPath: "/pipelines/webhooks/translate"
  }, c = {
    type: "transform",
    transformType: "jsonpath",
    expression: "$.payload.text",
    outputKey: "sourceText"
  }, l = {
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
  }, u = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: d },
    { id: a, type: "transform", position: { x: te(1), y: ne(0) }, data: c },
    { id: i, type: "llm", position: { x: te(2), y: ne(0) }, data: l },
    { id: s, type: "action", position: { x: te(3), y: ne(0) }, data: p }
  ], f = [
    ae(r, "out", a),
    ae(a, "out", i),
    ae(i, "out", s)
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
    nodes: u,
    edges: f,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function cp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = {
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
    config: { documentId: "digest-doc", body: `{{context.steps.${a}.response}}` },
    idempotent: !0,
    onError: "route-error"
  }, l = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: s },
    { id: a, type: "llm", position: { x: te(1), y: ne(0) }, data: d },
    { id: i, type: "action", position: { x: te(2), y: ne(0) }, data: c }
  ], p = [
    ae(r, "out", a),
    ae(a, "out", i)
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
    nodes: l,
    edges: p,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function dp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = { type: "trigger", triggerType: "document.submit" }, d = {
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
    config: { field: "tags", value: `{{context.steps.${a}.response}}` },
    idempotent: !0,
    onError: "fail-run"
  }, l = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: s },
    { id: a, type: "llm", position: { x: te(1), y: ne(0) }, data: d },
    { id: i, type: "action", position: { x: te(2), y: ne(0) }, data: c }
  ], p = [
    ae(r, "out", a),
    ae(a, "out", i)
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
    nodes: l,
    edges: p,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function pp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = { type: "trigger", triggerType: "document.finalize" }, p = {
    type: "fork",
    branchCount: 2,
    branchLabels: ["llm-review", "human-review"]
  }, u = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "You are a code/document reviewer. Provide a PR-style review with comments, suggestions, and an approval recommendation.",
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0.3,
    maxTokens: 1024,
    streaming: !1
  }, f = {
    type: "approval",
    approvers: [{ type: "role", value: "reviewer" }],
    requiredCount: 1,
    timeoutMs: 2880 * 60 * 1e3,
    timeoutAction: "reject",
    message: "Please review this document PR-style and approve or reject."
  }, h = { type: "join", mode: "all", mergeStrategy: "deep-merge" }, g = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "reviews",
      message: `Review complete: LLM said {{context.steps.${i}.response}}; reviewer decision: {{context.steps.${s}.output.decision}}`
    },
    idempotent: !1,
    onError: "route-error"
  }, x = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: l },
    { id: a, type: "fork", position: { x: te(1), y: ne(0) }, data: p },
    { id: i, type: "llm", position: { x: te(2), y: ne(0) - Se / 2 }, data: u },
    { id: s, type: "approval", position: { x: te(2), y: ne(0) + Se / 2 }, data: f },
    { id: d, type: "join", position: { x: te(3), y: ne(0) }, data: h },
    { id: c, type: "action", position: { x: te(4), y: ne(0) }, data: g }
  ], m = [
    ae(r, "out", a),
    ae(a, "branch-0", i),
    ae(i, "out", d, "in-0"),
    ae(a, "branch-1", s),
    ae(s, "approved", d, "in-1"),
    ae(d, "out", c)
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
    nodes: x,
    edges: m,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function up(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = {
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
  }, u = {
    type: "condition",
    expression: `context.steps.${a}.output.severity === 'critical'`,
    label: "Critical?"
  }, f = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "on-call",
      message: `CRITICAL incident: {{context.steps.${a}.output.summary}}`
    },
    idempotent: !1,
    onError: "fail-run"
  }, h = {
    type: "approval",
    approvers: [{ type: "role", value: "incident-commander" }],
    requiredCount: 1,
    timeoutMs: 1440 * 60 * 1e3,
    timeoutAction: "escalate",
    message: "Critical incident paged. Please acknowledge and assign a post-mortem owner."
  }, g = {
    type: "action",
    actionType: "webhook",
    config: {
      url: "https://tickets.example.com/api/incidents",
      method: "POST",
      body: {
        severity: `{{context.steps.${a}.output.severity}}`,
        summary: `{{context.steps.${a}.output.summary}}`
      }
    },
    idempotent: !0,
    onError: "route-error"
  }, x = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: l },
    { id: a, type: "llm", position: { x: te(1), y: ne(0) }, data: p },
    { id: i, type: "condition", position: { x: te(2), y: ne(0) }, data: u },
    { id: s, type: "action", position: { x: te(3), y: ne(0) - Se / 2 }, data: f },
    { id: d, type: "approval", position: { x: te(4), y: ne(0) - Se / 2 }, data: h },
    { id: c, type: "action", position: { x: te(3), y: ne(0) + Se / 2 }, data: g }
  ], m = [
    ae(r, "out", a),
    ae(a, "out", i),
    ae(i, "true", s),
    ae(s, "out", d),
    ae(i, "false", c)
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
    nodes: x,
    edges: m,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function mp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = crypto.randomUUID(), f = {
    type: "trigger",
    triggerType: "webhook",
    webhookPath: "/pipelines/webhooks/github-pr"
  }, h = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "You are a senior code reviewer. Read the GitHub pull-request payload and produce a brief, structured summary of the diff (files touched, scope, intent). No prose preface.",
    userPromptTemplate: "{{context.payload.pull_request}}",
    temperature: 0.2,
    maxTokens: 768,
    streaming: !1
  }, g = {
    type: "fork",
    branchCount: 3,
    branchLabels: ["security", "style", "tests"]
  }, x = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are a security auditor. Review this diff for vulnerabilities (injection, secrets, authz, unsafe deserialization, SSRF). Output JSON {"findings": [{"severity": "high"|"med"|"low", "file": string, "issue": string}]}.',
    userPromptTemplate: `{{context.payload.pull_request.diff}}

Summary: {{context.steps.${a}.response}}`,
    temperature: 0.1,
    maxTokens: 1024,
    streaming: !1
  }, m = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are a code-style reviewer. Flag naming, structure, readability, and idiom issues. Output JSON {"findings": [{"file": string, "line": number?, "issue": string}]}.',
    userPromptTemplate: `{{context.payload.pull_request.diff}}

Summary: {{context.steps.${a}.response}}`,
    temperature: 0.2,
    maxTokens: 1024,
    streaming: !1
  }, w = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are a test-coverage reviewer. Identify untested branches, missing edge-case tests, and risky changes lacking tests. Output JSON {"gaps": [{"file": string, "concern": string}]}.',
    userPromptTemplate: `{{context.payload.pull_request.diff}}

Summary: {{context.steps.${a}.response}}`,
    temperature: 0.1,
    maxTokens: 1024,
    streaming: !1
  }, v = {
    type: "join",
    mode: "all",
    mergeStrategy: "array-collect"
  }, b = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "You are a lead reviewer. Combine the security, style, and test-coverage findings into a single PR comment in markdown with sections, prioritized actions, and a final approve/request-changes recommendation.",
    userPromptTemplate: `Security: {{context.steps.${s}.response}}

Style: {{context.steps.${d}.response}}

Coverage: {{context.steps.${c}.response}}`,
    temperature: 0.3,
    maxTokens: 1536,
    streaming: !0
  }, N = {
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
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: f },
    { id: a, type: "llm", position: { x: te(1), y: ne(0) }, data: h },
    { id: i, type: "fork", position: { x: te(2), y: ne(0) }, data: g },
    { id: s, type: "llm", position: { x: te(3), y: ne(0) - Se }, data: x },
    { id: d, type: "llm", position: { x: te(3), y: ne(0) }, data: m },
    { id: c, type: "llm", position: { x: te(3), y: ne(0) + Se }, data: w },
    { id: l, type: "join", position: { x: te(4), y: ne(0) }, data: v },
    { id: p, type: "llm", position: { x: te(5), y: ne(0) }, data: b },
    { id: u, type: "action", position: { x: te(6), y: ne(0) }, data: N }
  ], k = [
    ae(r, "out", a),
    ae(a, "out", i),
    ae(i, "branch-0", s),
    ae(i, "branch-1", d),
    ae(i, "branch-2", c),
    ae(s, "out", l, "in-0"),
    ae(d, "out", l, "in-1"),
    ae(c, "out", l, "in-2"),
    ae(l, "out", p),
    ae(p, "out", u)
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
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function hp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = {
    type: "trigger",
    triggerType: "document.submit"
  }, l = {
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
    expression: `context.steps.${a}.output.category === 'clean'`,
    label: "Clean?"
  }, u = {
    type: "action",
    actionType: "update-document",
    config: { field: "status", value: "published" },
    idempotent: !0,
    onError: "fail-run"
  }, f = {
    type: "approval",
    approvers: [{ type: "role", value: "moderator" }],
    requiredCount: 1,
    timeoutMs: 720 * 60 * 1e3,
    timeoutAction: "reject",
    message: `Document flagged as {{context.steps.${a}.output.category}} — please review before publishing.`
  }, h = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: c },
    { id: a, type: "llm", position: { x: te(1), y: ne(0) }, data: l },
    { id: i, type: "condition", position: { x: te(2), y: ne(0) }, data: p },
    { id: s, type: "action", position: { x: te(3), y: ne(0) - Se / 2 }, data: u },
    { id: d, type: "approval", position: { x: te(3), y: ne(0) + Se / 2 }, data: f }
  ], g = [
    ae(r, "out", a),
    ae(a, "out", i),
    ae(i, "true", s),
    ae(i, "false", d)
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
    nodes: h,
    edges: g,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function fp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = {
    type: "trigger",
    triggerType: "webhook",
    webhookPath: "/pipelines/webhooks/helpdesk"
  }, f = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'Read this helpdesk ticket. Extract intent and urgency. Output strict JSON {"intent": string, "urgency": "high"|"medium"|"low", "tags": string[]}. No prose.',
    userPromptTemplate: "{{context.payload.ticket}}",
    temperature: 0.1,
    maxTokens: 256,
    streaming: !1
  }, h = {
    type: "transform",
    transformType: "jsonpath",
    expression: `$.steps.${a}.output`,
    outputKey: "triage"
  }, g = {
    type: "condition",
    expression: "context.triage.urgency === 'high'",
    label: "High urgency?"
  }, x = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "support-escalations",
      message: "High-urgency ticket: {{context.triage.intent}} (tags: {{context.triage.tags}})"
    },
    idempotent: !1,
    onError: "fail-run"
  }, m = {
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
  }, w = {
    type: "approval",
    approvers: [{ type: "role", value: "support-agent" }],
    requiredCount: 1,
    timeoutMs: 14400 * 1e3,
    timeoutAction: "reject",
    message: "Please review this drafted reply before it is sent to the customer."
  }, v = {
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
  }, b = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: u },
    { id: a, type: "llm", position: { x: te(1), y: ne(0) }, data: f },
    { id: i, type: "transform", position: { x: te(2), y: ne(0) }, data: h },
    { id: s, type: "condition", position: { x: te(3), y: ne(0) }, data: g },
    { id: d, type: "action", position: { x: te(4), y: ne(0) - Se / 2 }, data: x },
    { id: c, type: "llm", position: { x: te(4), y: ne(0) + Se / 2 }, data: m },
    { id: l, type: "approval", position: { x: te(5), y: ne(0) + Se / 2 }, data: w },
    { id: p, type: "action", position: { x: te(6), y: ne(0) + Se / 2 }, data: v }
  ], N = [
    ae(r, "out", a),
    ae(a, "out", i),
    ae(i, "out", s),
    ae(s, "true", d),
    ae(s, "false", c),
    ae(c, "out", l),
    ae(l, "approved", p)
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
    nodes: b,
    edges: N,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
const hn = [
  {
    id: "document-summary",
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    tags: ["llm", "summary", "document"],
    build: rp
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: op
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: ap,
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
    build: ip,
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
    build: sp,
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
    build: lp
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: cp
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: dp
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: pp
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: up
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: mp
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: hp
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: fp
  }
], co = "/api";
async function gp(e) {
  const n = { createdTypes: [], errors: [] };
  if (!e?.documentTypes?.length) return n;
  for (const r of e.documentTypes)
    try {
      const a = await xp(r.name);
      if (a) {
        n.createdTypes.push(a.typeId);
        continue;
      }
      const i = await bp(r);
      n.createdTypes.push(i.typeId);
    } catch (a) {
      n.errors.push(
        `Failed to scaffold "${r.name}": ${a instanceof Error ? a.message : String(a)}`
      );
    }
  return n;
}
async function xp(e) {
  try {
    const n = await fetch(`${co}/document-types`, { credentials: "same-origin" });
    if (!n.ok) return null;
    const a = (await n.json()).items?.find(
      (i) => i.name.toLowerCase() === e.toLowerCase()
    );
    return a ? { typeId: a.typeId } : null;
  } catch {
    return null;
  }
}
async function bp(e) {
  const n = e.fields.map((i, s) => ({
    fieldId: crypto.randomUUID(),
    name: i.name,
    fieldType: i.fieldType,
    widget: yp(i.fieldType),
    cardinality: 1,
    required: i.required ?? !1,
    helpText: "",
    options: i.options,
    order: s
  })), r = await fetch(`${co}/document-types`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({
      name: e.name,
      description: "Auto-created for pipeline template",
      icon: e.icon,
      fields: n
    })
  });
  if (!r.ok) {
    const i = await r.text();
    throw new Error(`HTTP ${r.status}: ${i}`);
  }
  return await r.json();
}
function yp(e) {
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
function vp(e) {
  const n = /* @__PURE__ */ new Map(), r = e.nodes.map((s) => {
    const d = crypto.randomUUID();
    return n.set(s.id, d), {
      ...s,
      id: d,
      data: JSON.parse(JSON.stringify(s.data)),
      position: { ...s.position }
    };
  }), a = e.edges.map((s) => ({
    ...s,
    id: crypto.randomUUID(),
    source: n.get(s.source) ?? s.source,
    target: n.get(s.target) ?? s.target
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
    edges: a,
    createdAt: i,
    updatedAt: i
  };
}
function wp(e) {
  const n = e.triggerBinding?.event ?? "manual";
  return n === "schedule" ? "Schedule" : n === "webhook" ? "Webhook" : n === "manual" ? "Manual" : n.startsWith("document.") ? `On ${n}` : n;
}
function Np({ template: e, meta: n, onPick: r }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": `template-card-${e.id}`,
      className: "flex flex-col gap-2 w-[220px] min-h-[200px] p-3.5 bg-surface border border-border rounded-[10px] font-[inherit]",
      children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ t("span", { className: "text-2xl", "aria-hidden": !0, children: e.icon }),
          /* @__PURE__ */ t("div", { className: "text-sm font-bold text-text-primary overflow-hidden text-ellipsis", children: e.name })
        ] }),
        /* @__PURE__ */ o(
          "div",
          {
            "data-testid": `template-meta-${e.id}`,
            className: "text-[11px] text-text-tertiary flex gap-2",
            children: [
              /* @__PURE__ */ o("span", { children: [
                n.nodeCount,
                " node",
                n.nodeCount === 1 ? "" : "s"
              ] }),
              /* @__PURE__ */ t("span", { "aria-hidden": !0, children: "·" }),
              /* @__PURE__ */ t("span", { children: n.trigger })
            ]
          }
        ),
        /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary leading-[1.4] flex-1", children: e.description }),
        e.tags.length > 0 && /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: e.tags.map((a) => /* @__PURE__ */ t(
          "span",
          {
            className: "text-[10px] font-semibold px-1.5 py-0.5 rounded bg-surface-hover text-text-secondary lowercase",
            children: a
          },
          a
        )) }),
        /* @__PURE__ */ t(
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
function kp({
  open: e,
  onClose: n,
  onCreated: r,
  onSelect: a
}) {
  const { userId: i } = Qr(), [s, d] = S(""), c = ce(null);
  oe(() => {
    e && (d(""), setTimeout(() => c.current?.focus(), 30));
  }, [e]);
  const l = W(() => {
    const h = /* @__PURE__ */ new Map();
    for (const g of hn) {
      const x = g.build(i || "anonymous");
      h.set(g.id, { nodeCount: x.nodes.length, trigger: wp(x) });
    }
    return h;
  }, [i, e]), p = W(() => {
    const h = s.trim().toLowerCase();
    return h ? hn.filter(
      (g) => g.name.toLowerCase().includes(h) || g.description.toLowerCase().includes(h) || g.tags.some((x) => x.toLowerCase().includes(h))
    ) : hn;
  }, [s]), u = (h) => {
    if (r) {
      const g = h.build(i || "anonymous"), x = vp(g);
      Do(x), n(), r(x.id), h.prerequisites && gp(h.prerequisites).then((m) => {
        m.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", m.errors);
      });
      return;
    }
    a && a(h);
  };
  return /* @__PURE__ */ o(
    Qe,
    {
      open: e,
      onClose: n,
      title: "Pipeline templates",
      maxWidth: 760,
      backdropTestId: "templates-modal",
      rawChildren: !0,
      children: [
        /* @__PURE__ */ t("div", { className: "text-[13px] text-text-secondary mb-3", children: "Pick a template to spawn a new pipeline with prebuilt nodes and edges." }),
        /* @__PURE__ */ t(
          we,
          {
            ref: c,
            type: "search",
            "data-testid": "templates-search",
            placeholder: "Search templates…",
            value: s,
            onChange: (h) => d(h.target.value),
            onKeyDown: (h) => {
              h.key === "Enter" && p.length > 0 && (h.preventDefault(), u(p[0]));
            },
            className: "w-full mb-3.5",
            "aria-label": "Search templates"
          }
        ),
        p.length === 0 ? /* @__PURE__ */ o(
          "div",
          {
            "data-testid": "templates-empty",
            className: "text-center p-8 text-[13px] text-text-tertiary",
            children: [
              'No templates match "',
              s,
              '".'
            ]
          }
        ) : /* @__PURE__ */ t(
          "div",
          {
            "data-testid": "templates-grid",
            className: "grid grid-cols-[repeat(3,220px)] gap-4 justify-center max-h-[60vh] overflow-y-auto p-2",
            children: p.map((h) => /* @__PURE__ */ t(
              Np,
              {
                template: h,
                meta: l.get(h.id) ?? { nodeCount: 0, trigger: "—" },
                onPick: u
              },
              h.id
            ))
          }
        )
      ]
    }
  );
}
const _n = ["draft", "published", "archived"], yr = ["draft", "published"];
function Cp(e) {
  if (e == null) return null;
  if (e.trim() === "") return /* @__PURE__ */ new Set();
  const n = new Set(_n);
  return new Set(
    e.split(",").map((a) => a.trim()).filter((a) => n.has(a))
  );
}
function Ip(e, n) {
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
    icon: e.icon ?? n ?? "🔀",
    tags: e.tags ?? []
  };
}
function Sp(e) {
  const n = e?.event;
  return !n || n === "manual" ? "manual" : n === "schedule" ? "schedule" : n === "webhook" ? "webhook" : "document";
}
function vr(e) {
  return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Tp() {
  const e = /* @__PURE__ */ new Date(), n = e.getFullYear(), r = String(e.getMonth() + 1).padStart(2, "0"), a = String(e.getDate()).padStart(2, "0");
  return `${n}-${r}-${a}`;
}
function $p({
  open: e,
  onClose: n,
  onCreate: r
}) {
  const [a, i] = S(""), s = ce(null);
  oe(() => {
    e && (i(""), setTimeout(() => s.current?.focus(), 50));
  }, [e]);
  const d = a.trim().length > 0, c = () => {
    d && r(a.trim());
  };
  return /* @__PURE__ */ o(
    Qe,
    {
      open: e,
      onClose: n,
      title: "Create new pipeline",
      maxWidth: 440,
      footer: /* @__PURE__ */ o(H, { children: [
        /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "new-pipeline-cancel",
            className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
            onClick: n,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "new-pipeline-confirm",
            className: I(
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
        /* @__PURE__ */ t("label", { className: "block text-[13px] font-semibold text-text-secondary mb-1.5", children: "Name" }),
        /* @__PURE__ */ t(
          we,
          {
            ref: s,
            "data-testid": "new-pipeline-name",
            value: a,
            onChange: (l) => i(l.target.value),
            onKeyDown: (l) => {
              l.key === "Enter" && c();
            },
            placeholder: "e.g. Invoice summarizer",
            "aria-label": "New pipeline name",
            className: "w-full"
          }
        )
      ]
    }
  );
}
function Qm() {
  const e = Ve(), { userId: n } = Qr(), { toast: r } = Jt(), { triggerRun: a, isTriggering: i } = Mo(), [s, d] = Ht(), [c, l] = S([]), [p, u] = S(""), [f, h] = S("all"), [g, x] = S("updated"), m = W(
    () => Cp(s.get("status")),
    [s]
  ), w = W(() => m ?? new Set(yr), [m]), v = m != null, b = ($) => {
    const B = new URLSearchParams(s);
    if ($.size === 0)
      B.set("status", "");
    else {
      const pe = _n.filter((ge) => $.has(ge)).join(",");
      B.set("status", pe);
    }
    d(B, { replace: !0 });
  }, N = ($) => {
    const B = v ? new Set(w) : new Set(yr);
    B.has($) ? B.delete($) : B.add($), b(B);
  }, [y, k] = S(!1), [C, T] = S(!1), [M, P] = S(null), [D, re] = S(!1), [A, J] = S(!1), [Q, G] = S(!1), Z = E(async () => {
    const $ = await Eo(), B = [];
    for (const pe of $) {
      const ge = await dt(pe.id);
      ge && B.push(Ip(ge, pe.icon));
    }
    l(B);
  }, []);
  oe(() => {
    Z();
  }, [Z]);
  const O = W(() => {
    const $ = p.trim().toLowerCase(), pe = [...c.filter((ge) => {
      if ($) {
        const ke = ge.name.toLowerCase().includes($), We = ge.tags.some((Bn) => Bn.toLowerCase().includes($));
        if (!ke && !We) return !1;
      }
      return !(!(v && w.size === 0) && !w.has(ge.status) || f !== "all" && Sp(ge.triggerBinding) !== f);
    })];
    return g === "name" ? pe.sort((ge, ke) => ge.name.localeCompare(ke.name)) : g === "created" ? pe.sort((ge, ke) => ke.createdAt.localeCompare(ge.createdAt)) : pe.sort((ge, ke) => ke.updatedAt.localeCompare(ge.updatedAt)), pe;
  }, [c, p, w, v, f, g]), R = W(() => O.map(($) => $.id), [O]), {
    selectionMode: Y,
    selected: F,
    allVisibleSelected: L,
    someVisibleSelected: V,
    handleToggleSelect: K,
    handleSelectAllFiltered: X,
    handleHeaderToggleAll: me,
    clearSelection: q,
    setSelectionMode: de
  } = Zd({ visibleRows: O, filteredIds: R }), Ie = W(() => {
    const $ = /* @__PURE__ */ new Set();
    for (const B of c)
      if (F.has(B.id))
        for (const pe of B.tags) $.add(pe);
    return Array.from($).sort((B, pe) => B.localeCompare(pe));
  }, [c, F]), Fe = async ($) => {
    const B = await Oo({ name: $, createdBy: n });
    k(!1), e(`/pipelines/${B.id}`);
  }, Ze = () => {
    const $ = _o(n);
    pt($).then(() => Z()), e(`/pipelines/${$.id}`);
  }, He = ($) => {
    const B = $.build(n);
    pt(B), T(!1), e(`/pipelines/${B.id}`);
  }, Ue = ($) => e(`/pipelines/${$}`), Ge = async ($) => {
    if ($.status !== "published") {
      r("Run requires published state", { type: "warning" });
      return;
    }
    if (!i)
      try {
        await a($.id, {}) ? r(`Run started for "${$.name}"`, { type: "success" }) : r("Could not start run", { type: "error" });
      } catch (B) {
        r(`Run failed: ${B.message}`, { type: "error" });
      } finally {
        e(`/pipelines/${$.id}`);
      }
  }, Je = ($) => {
    const B = $n($);
    B && (pt(B).then(() => Z()), r(`Duplicated as "${B.name}"`, { type: "success" }));
  }, Ye = ($) => {
    const B = xn($.id);
    if (!B) {
      r("Export failed", { type: "error" });
      return;
    }
    Rt(`${vr($.name)}.pipeline.json`, B);
  }, Ae = async () => {
    M && (await jn(M), P(null), Z(), r("Pipeline deleted", { type: "success" }));
  }, ve = M ? c.find(($) => $.id === M) : null, se = () => {
    const $ = Array.from(F);
    $.length !== 0 && ($.forEach((B, pe) => {
      window.setTimeout(() => {
        const ge = c.find((We) => We.id === B), ke = xn(B);
        !ge || !ke || Rt(`${vr(ge.name)}-${Tp()}.pipeline.json`, ke);
      }, pe * 100);
    }), r(`Exported ${$.length} pipeline${$.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, Ee = async ($) => {
    const B = Array.from(F);
    for (const pe of B) {
      const ge = await dt(pe);
      if (!ge) continue;
      const ke = ge.tags ?? [];
      ke.includes($) || (ge.tags = [...ke, $], await pt(ge));
    }
    J(!1), Z(), r(`Added tag "${$}" to ${B.length} pipeline${B.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, kt = async ($) => {
    const B = Array.from(F);
    for (const pe of B) {
      const ge = await dt(pe);
      if (!ge) continue;
      const ke = ge.tags ?? [];
      ke.includes($) && (ge.tags = ke.filter((We) => We !== $), await pt(ge));
    }
    Z(), r(`Removed tag "${$}" from ${B.length} pipeline${B.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ee = async () => {
    const $ = Array.from(F);
    for (const B of $) await jn(B);
    re(!1), q(), Z(), r(`Deleted ${$.length} pipeline${$.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ie = async () => {
    const $ = Array.from(F);
    if ($.length === 0) return;
    let B = 0, pe = 0;
    for (const ge of $) {
      const ke = await dt(ge);
      if (!ke) continue;
      if (ke.status === "published") {
        pe += 1;
        continue;
      }
      await Lo(ge) && (B += 1);
    }
    Z(), pe > 0 ? r(
      `Published ${B}; skipped ${pe} already published`,
      { type: "success" }
    ) : r(
      `Published ${B} pipeline${B === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, ue = async () => {
    const $ = Array.from(F);
    if ($.length === 0) return;
    let B = 0, pe = 0;
    for (const ke of $) {
      const We = await dt(ke);
      if (!We) continue;
      We.status === "archived" ? (We.status = "draft", pe += 1) : (We.status = "archived", B += 1), await pt(We);
    }
    Z();
    const ge = [];
    B > 0 && ge.push(`Archived ${B}`), pe > 0 && ge.push(`Unarchived ${pe}`), r(ge.join(" · ") || "No pipelines changed", { type: "success" });
  }, be = async () => {
    const $ = Array.from(F);
    if ($.length === 0) return;
    const B = [];
    for (const ge of $) {
      const ke = await dt(ge);
      ke && B.push(ke);
    }
    if (B.length === 0) {
      r("Export failed", { type: "error" });
      return;
    }
    const pe = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    Rt(`pipelines-${pe}.json`, JSON.stringify(B, null, 2)), r(`Exported ${B.length} pipeline${B.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  };
  oe(() => {
    const $ = (B) => {
      const pe = B.target;
      if (pe) {
        const ke = pe.tagName;
        if (ke === "INPUT" || ke === "TEXTAREA" || ke === "SELECT" || pe.isContentEditable)
          return;
      }
      if (B.key === "Escape") {
        (F.size > 0 || Y || A || Q) && (J(!1), G(!1), q(), de(!1));
        return;
      }
      if ((B.metaKey || B.ctrlKey) && (B.key === "a" || B.key === "A")) {
        Y && (B.preventDefault(), X());
        return;
      }
      (B.key === "Delete" || B.key === "Backspace") && F.size > 0 && !D && !M && !y && !C && (B.preventDefault(), re(!0));
    };
    return window.addEventListener("keydown", $), () => window.removeEventListener("keydown", $);
  }, [
    F,
    Y,
    A,
    Q,
    D,
    M,
    y,
    C,
    q,
    X,
    de
  ]);
  const Re = c.length > 0, je = F.size > 0;
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": "pipelines-page",
      className: "flex flex-col h-full overflow-hidden bg-surface-inset font-inherit",
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: I(
              "h-14 shrink-0 flex items-center justify-between px-6",
              "border-b border-border bg-white",
              "sticky top-0 z-[2]"
            ),
            children: [
              /* @__PURE__ */ t("div", { className: "text-lg font-bold text-text-primary", children: "Pipelines" }),
              /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "metrics-btn",
                    onClick: () => e("/pipelines/metrics"),
                    className: I(
                      "px-4 py-[7px] text-[13px] font-semibold",
                      "bg-white text-text-secondary",
                      "border border-border-field rounded-[7px]",
                      "cursor-pointer font-inherit"
                    ),
                    children: "Metrics"
                  }
                ),
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "templates-btn",
                    onClick: () => T(!0),
                    className: I(
                      "px-4 py-[7px] text-[13px] font-semibold",
                      "bg-white text-text-secondary",
                      "border border-border-field rounded-[7px]",
                      "cursor-pointer font-inherit"
                    ),
                    children: "Templates"
                  }
                ),
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "new-pipeline-btn",
                    onClick: () => k(!0),
                    className: I(
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
        Re && /* @__PURE__ */ t(
          Xd,
          {
            search: p,
            onSearchChange: u,
            statusFilter: w,
            statusExplicit: v,
            onToggleStatusKey: N,
            triggerFilter: f,
            onTriggerFilterChange: h,
            sortKey: g,
            onSortKeyChange: x,
            allVisibleSelected: L,
            someVisibleSelected: V,
            onHeaderToggleAll: me
          }
        ),
        je && /* @__PURE__ */ t(
          Qd,
          {
            count: F.size,
            onClear: q,
            onExport: se,
            onExportAsJSON: be,
            onPublish: ie,
            onArchive: ue,
            onAddTag: () => {
              J(($) => !$), G(!1);
            },
            onRemoveTag: () => {
              G(($) => !$), J(!1);
            },
            onDelete: () => re(!0),
            onDeleteWithConfirm: () => re(!0),
            addTagOpen: A,
            removeTagOpen: Q,
            onSubmitAddTag: Ee,
            onSubmitRemoveTag: kt,
            onCloseAddTag: () => J(!1),
            onCloseRemoveTag: () => G(!1),
            unionTags: Ie
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: I(
              "flex-1 overflow-y-auto overflow-x-hidden min-w-0",
              Re ? "p-6" : "p-0"
            ),
            children: Re ? O.length === 0 ? /* @__PURE__ */ t(
              "div",
              {
                "data-testid": "filtered-empty",
                className: "text-center p-12 text-[13px] text-text-tertiary",
                children: "No pipelines match the current filters."
              }
            ) : /* @__PURE__ */ t(
              "div",
              {
                "data-testid": "pipeline-grid",
                className: "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[50px]",
                children: O.map(($) => /* @__PURE__ */ t(
                  Jd,
                  {
                    row: $,
                    onOpen: () => Ue($.id),
                    onRun: () => {
                      Ge($);
                    },
                    onDuplicate: () => Je($.id),
                    onExport: () => Ye($),
                    onDelete: () => P($.id),
                    selectionMode: Y,
                    selected: F.has($.id),
                    anySelected: je,
                    onToggleSelect: (B) => K($.id, B)
                  },
                  $.id
                ))
              }
            ) : /* @__PURE__ */ o("div", { className: "flex flex-col h-full", children: [
              /* @__PURE__ */ t("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ t(
                qe,
                {
                  icon: "🔀",
                  title: "No pipelines yet",
                  body: "Design your first one — from scratch or pick a template later.",
                  actionLabel: "+ New Pipeline",
                  onAction: () => k(!0)
                }
              ) }),
              /* @__PURE__ */ o("div", { className: "flex justify-center items-center gap-2.5 text-[13px] text-text-tertiary px-6 pb-8", children: [
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "empty-state-demo",
                    onClick: Ze,
                    className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
                    children: "or try the demo pipeline"
                  }
                ),
                /* @__PURE__ */ t("span", { "aria-hidden": !0, children: "·" }),
                /* @__PURE__ */ t(
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
        /* @__PURE__ */ t(
          $p,
          {
            open: y,
            onClose: () => k(!1),
            onCreate: Fe
          }
        ),
        /* @__PURE__ */ t(
          kp,
          {
            open: C,
            onClose: () => T(!1),
            onSelect: He
          }
        ),
        /* @__PURE__ */ t(
          Qe,
          {
            open: !!M,
            onClose: () => P(null),
            title: "Delete pipeline?",
            maxWidth: 400,
            footer: /* @__PURE__ */ o(H, { children: [
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "delete-pipeline-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => P(null),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "delete-pipeline-confirm",
                  onClick: Ae,
                  className: I(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-danger text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: "Delete"
                }
              )
            ] }),
            children: ve && /* @__PURE__ */ o("p", { className: "m-0", children: [
              /* @__PURE__ */ o("strong", { children: [
                "“",
                ve.name,
                "”"
              ] }),
              " will be permanently removed. Run history will also be lost."
            ] })
          }
        ),
        /* @__PURE__ */ t(
          Qe,
          {
            open: D,
            onClose: () => re(!1),
            title: `Delete ${F.size} pipeline${F.size === 1 ? "" : "s"}?`,
            maxWidth: 420,
            backdropTestId: "bulk-delete-modal",
            footer: /* @__PURE__ */ o(H, { children: [
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "bulk-delete-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => re(!1),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ o(
                "button",
                {
                  "data-testid": "bulk-delete-confirm",
                  onClick: ee,
                  className: I(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-danger text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: [
                    "Delete ",
                    F.size
                  ]
                }
              )
            ] }),
            children: /* @__PURE__ */ o("p", { className: "m-0", children: [
              /* @__PURE__ */ o("strong", { children: [
                F.size,
                " pipeline",
                F.size === 1 ? "" : "s"
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
const Ap = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function po(e, n, r) {
  const a = Ap[e], i = Math.max(0, n | 0), s = Math.max(0, r | 0);
  if (!a)
    return {
      inputTokens: i,
      outputTokens: s,
      inputCostUsd: 0,
      outputCostUsd: 0,
      totalCostUsd: 0,
      model: e,
      modelFound: !1
    };
  const d = i / 1e6 * a.inputPerMillion, c = s / 1e6 * a.outputPerMillion;
  return {
    inputTokens: i,
    outputTokens: s,
    inputCostUsd: d,
    outputCostUsd: c,
    totalCostUsd: d + c,
    model: e,
    modelFound: !0
  };
}
function Nt(e) {
  const n = {};
  let r = 0, a = 0, i = 0, s = 0, d = !1;
  for (const l of e) {
    if (!l.model) continue;
    const p = l.tokensIn ?? 0, u = l.tokensOut ?? 0, f = po(l.model, p, u), h = n[l.model];
    h ? n[l.model] = {
      inputTokens: h.inputTokens + f.inputTokens,
      outputTokens: h.outputTokens + f.outputTokens,
      inputCostUsd: h.inputCostUsd + f.inputCostUsd,
      outputCostUsd: h.outputCostUsd + f.outputCostUsd,
      totalCostUsd: h.totalCostUsd + f.totalCostUsd,
      model: l.model,
      modelFound: h.modelFound || f.modelFound
    } : n[l.model] = f, r += f.inputTokens, a += f.outputTokens, i += f.inputCostUsd, s += f.outputCostUsd, f.modelFound && (d = !0);
  }
  return { total: {
    inputTokens: r,
    outputTokens: a,
    inputCostUsd: i,
    outputCostUsd: s,
    totalCostUsd: i + s,
    model: "aggregate",
    modelFound: d
  }, perModel: n };
}
function Bt(e) {
  return !e || !e.modelFound && e.totalCostUsd === 0 ? "—" : e.totalCostUsd >= 0.01 ? `$${e.totalCostUsd.toFixed(2)}` : e.totalCostUsd === 0 ? "$0.00" : `$${e.totalCostUsd.toFixed(4)}`;
}
function Rp(e) {
  const n = e.data.label;
  if (typeof n == "string" && n.trim()) return n.trim();
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
function uo(e, n) {
  let r = 0;
  if (e.llm) {
    const i = n.get(e.nodeId);
    i && (r += po(i, e.llm.tokensIn, e.llm.tokensOut).totalCostUsd);
  }
  const a = e.costUsd;
  return typeof a == "number" && Number.isFinite(a) && a > 0 && (r += a), r;
}
function Pp(e, n) {
  if (!n) return [];
  const r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    l.data.type === "llm" && r.set(l.id, l.data.model), a.set(l.id, Rp(l)), i.set(l.id, l.data.type);
  const s = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    s.set(l.id, 0), d.set(l.id, 0);
  for (const l of e)
    for (const p of Object.values(l.steps ?? {})) {
      if (!a.has(p.nodeId)) continue;
      const u = uo(p, r);
      s.set(p.nodeId, (s.get(p.nodeId) ?? 0) + u), d.set(p.nodeId, (d.get(p.nodeId) ?? 0) + 1);
    }
  const c = n.nodes.map((l) => ({
    nodeId: l.id,
    label: a.get(l.id) ?? l.id,
    type: i.get(l.id) ?? l.type,
    totalCostUsd: s.get(l.id) ?? 0,
    stepCount: d.get(l.id) ?? 0
  }));
  return c.sort((l, p) => p.totalCostUsd - l.totalCostUsd), c;
}
function Dp(e) {
  return e.slice(0, 10);
}
function Mp(e) {
  return Date.UTC(
    Number(e.slice(0, 4)),
    Number(e.slice(5, 7)) - 1,
    Number(e.slice(8, 10))
  );
}
function Ep(e, n, r = 30, a = /* @__PURE__ */ new Date()) {
  const i = /* @__PURE__ */ new Map();
  if (n)
    for (const u of n.nodes)
      u.data.type === "llm" && i.set(u.id, u.data.model);
  const s = Date.UTC(
    a.getUTCFullYear(),
    a.getUTCMonth(),
    a.getUTCDate()
  ), d = s - (r - 1) * 864e5, c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  for (let u = d; u <= s; u += 864e5) {
    const f = new Date(u).toISOString().slice(0, 10);
    c.set(f, 0), l.set(f, 0);
  }
  for (const u of e) {
    const f = Dp(u.startedAt);
    if (!c.has(f)) continue;
    let h = 0;
    for (const g of Object.values(u.steps ?? {}))
      h += uo(g, i);
    c.set(f, (c.get(f) ?? 0) + h), l.set(f, (l.get(f) ?? 0) + 1);
  }
  const p = [];
  for (let u = d; u <= s; u += 864e5) {
    const f = new Date(u).toISOString().slice(0, 10);
    p.push({
      date: f,
      ts: Mp(f),
      totalCostUsd: c.get(f) ?? 0,
      runCount: l.get(f) ?? 0
    });
  }
  return p;
}
const mo = [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
], ho = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], fo = ["24h", "7d", "30d", "all"], Op = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function _p(e) {
  return e.startsWith("document.") || e === "document" ? "document" : e === "schedule" || e === "scheduled" ? "scheduled" : e === "webhook" ? "webhook" : "manual";
}
function Lp(e) {
  let n = 0;
  for (const r of Object.values(e.steps ?? {})) {
    const a = r.attempts?.length ?? 0;
    a > 1 && (n += a - 1);
  }
  return n;
}
function go(e, n) {
  const r = n.now ?? Date.now(), a = n.range === "all" ? null : r - Op[n.range], i = n.query.trim().toLowerCase();
  return e.filter((s) => {
    if (n.statuses.size > 0 && !n.statuses.has(s.status)) return !1;
    if (n.triggerKinds.size > 0) {
      const d = _p(s.triggeredBy.triggerType);
      if (!n.triggerKinds.has(d)) return !1;
    }
    if (a != null) {
      const d = new Date(s.startedAt).getTime();
      if (Number.isFinite(d) && d < a) return !1;
    }
    if (i.length > 0) {
      const d = s.id.toLowerCase().includes(i), c = s.pipelineId.toLowerCase().includes(i);
      if (!d && !c) return !1;
    }
    return !0;
  });
}
function wr(e, n) {
  if (!e) return /* @__PURE__ */ new Set();
  const r = new Set(n);
  return new Set(
    e.split(",").map((a) => a.trim()).filter((a) => r.has(a))
  );
}
function xo(e) {
  const n = e.get("range") ?? "7d", r = fo.includes(n) ? n : "7d";
  return {
    query: e.get("q") ?? "",
    statuses: wr(e.get("status"), mo),
    triggerKinds: wr(e.get("trigger"), ho),
    range: r
  };
}
const Bp = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, Up = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, jp = {
  "24h": "Last 24h",
  "7d": "Last 7d",
  "30d": "Last 30d",
  all: "All time"
};
function Nr({
  label: e,
  options: n,
  selected: r,
  onToggle: a,
  labels: i,
  testIdPrefix: s
}) {
  const [d, c] = S(!1), l = ce(null);
  gt(l, () => c(!1), d);
  const p = r.size === 0 ? "All" : r.size <= 2 ? Array.from(r).map((u) => i[u]).join(", ") : `${r.size} selected`;
  return /* @__PURE__ */ o("div", { ref: l, className: "relative", children: [
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => c(!d),
        "data-testid": `${s}-dropdown`,
        className: I(
          "flex items-center gap-1.5 px-2.5 py-[5px] text-xs font-medium rounded cursor-pointer font-[inherit] whitespace-nowrap bg-surface text-text-secondary border",
          r.size > 0 ? "border-primary" : "border-border"
        ),
        children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary font-semibold text-[11px]", children: e }),
          /* @__PURE__ */ t(
            "span",
            {
              className: I(
                r.size > 0 ? "text-primary font-semibold" : "text-text-secondary font-medium"
              ),
              children: p
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-[9px] ml-0.5 opacity-60", children: "▾" })
        ]
      }
    ),
    d && /* @__PURE__ */ t(
      "div",
      {
        className: "absolute top-full left-0 mt-1 bg-white border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] py-1",
        children: n.map((u) => /* @__PURE__ */ o(
          "label",
          {
            "data-testid": `${s}-${u}`,
            className: "flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer text-text-primary hover:bg-surface-hover",
            children: [
              /* @__PURE__ */ t(
                rt,
                {
                  checked: r.has(u),
                  onChange: () => a(u),
                  className: "m-0",
                  "aria-label": i[u]
                }
              ),
              i[u]
            ]
          },
          u
        ))
      }
    )
  ] });
}
function bo({
  query: e,
  statuses: n,
  triggerKinds: r,
  range: a,
  onQueryChange: i,
  onStatusToggle: s,
  onTriggerToggle: d,
  onRangeChange: c,
  onClearFilters: l
}) {
  const p = n.size > 0 || r.size > 0 || e.length > 0;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 bg-surface-inset border border-border rounded-md",
      children: [
        /* @__PURE__ */ t(
          we,
          {
            id: "runs-search",
            type: "search",
            size: "sm",
            "data-testid": "runs-search-input",
            placeholder: "Search…",
            value: e,
            onChange: (u) => i(u.target.value),
            className: "flex-[1_1_180px] max-w-60",
            "aria-label": "Search runs by run id or pipeline id"
          }
        ),
        /* @__PURE__ */ t("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: fo.map((u) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": a === u,
            "data-testid": `runs-range-${u}`,
            onClick: () => c(u),
            className: I(
              "px-2 py-1 text-[11px] border-none rounded-[3px] cursor-pointer font-[inherit]",
              a === u ? "font-semibold bg-primary text-white" : "font-medium bg-transparent text-text-secondary"
            ),
            children: jp[u]
          },
          u
        )) }),
        /* @__PURE__ */ t("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ t(
          Nr,
          {
            label: "Status",
            options: mo,
            selected: n,
            onToggle: s,
            labels: Bp,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ t(
          Nr,
          {
            label: "Trigger",
            options: ho,
            selected: r,
            onToggle: d,
            labels: Up,
            testIdPrefix: "runs-trigger-chip"
          }
        ),
        p && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: l,
            className: "px-2 py-[3px] text-[11px] bg-none border-none text-text-tertiary cursor-pointer font-[inherit] underline",
            children: "Clear filters"
          }
        )
      ]
    }
  );
}
function zp({
  selectionCount: e,
  onExport: n,
  onDelete: r,
  onClear: a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": "runs-bulk-toolbar",
      className: "flex items-center gap-2 px-3 py-2 bg-surface-inset border border-border rounded-md",
      children: [
        /* @__PURE__ */ o("span", { className: "text-xs text-text-secondary", children: [
          e,
          " selected"
        ] }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "data-testid": "runs-bulk-export",
            onClick: n,
            className: "px-2.5 py-1 text-xs font-medium border border-border bg-surface text-text-secondary rounded cursor-pointer font-[inherit]",
            children: "Export JSON"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "data-testid": "runs-bulk-delete",
            onClick: r,
            className: "px-2.5 py-1 text-xs font-medium border border-danger bg-surface text-danger-fg rounded cursor-pointer font-[inherit]",
            children: "Delete"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "data-testid": "runs-bulk-clear",
            onClick: a,
            className: "px-2.5 py-1 text-xs bg-none border-none text-text-secondary cursor-pointer font-[inherit] ml-auto",
            children: "Clear selection"
          }
        )
      ]
    }
  );
}
function Ln(e) {
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
function Fp(e) {
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
const qp = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function Wp(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Vp({
  filtered: e,
  selected: n,
  onSelectionChange: r,
  comparePair: a,
  onToggleComparePair: i,
  costByRunId: s,
  pipelineId: d,
  onNavigate: c,
  onOpenRetryModal: l
}) {
  const p = ce(!1), u = ce(null), f = e.length > 0 && e.every((m) => n.has(m.id)), h = !f && e.some((m) => n.has(m.id)), g = () => {
    const m = new Set(n);
    if (f)
      for (const w of e) m.delete(w.id);
    else
      for (const w of e) m.add(w.id);
    r(m);
  }, x = (m, w, v) => {
    const b = new Set(n), N = !b.has(m);
    if (v && u.current != null) {
      const y = Math.min(u.current, w), k = Math.max(u.current, w);
      for (let C = y; C <= k; C++) {
        const T = e[C];
        T && (N ? b.add(T.id) : b.delete(T.id));
      }
    } else N ? b.add(m) : b.delete(m);
    u.current = w, r(b);
  };
  return /* @__PURE__ */ o(
    "table",
    {
      className: "w-full border-collapse text-[13px] bg-surface border border-border rounded-lg overflow-hidden",
      children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { className: "bg-surface-inset text-left", children: [
          /* @__PURE__ */ t(
            "th",
            {
              scope: "col",
              className: "px-3 py-2 w-6 border-b border-border",
              children: /* @__PURE__ */ t(
                rt,
                {
                  "data-testid": "runs-select-all",
                  "aria-label": "Select all visible runs",
                  checked: f,
                  indeterminate: h,
                  onChange: g
                }
              )
            }
          ),
          ["Started", "Status", "Duration", "Retries", "Cost", "Triggered by", "Run ID", ""].map((m, w) => /* @__PURE__ */ t(
            "th",
            {
              scope: "col",
              className: "px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
              children: m
            },
            `${m}-${w}`
          ))
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: e.map((m, w) => {
          const { tone: v, label: b } = Ln(m.status), N = n.has(m.id), y = Lp(m);
          return /* @__PURE__ */ o(
            "tr",
            {
              "data-testid": `run-card-${m.id}`,
              className: I(
                "border-b border-border cursor-pointer hover:bg-surface-hover",
                N && "bg-surface-hover"
              ),
              onClick: () => c(`/pipelines/${d}/runs/${m.id}`),
              children: [
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary w-6", onClick: (k) => k.stopPropagation(), children: [
                  /* @__PURE__ */ t(
                    "span",
                    {
                      onMouseDown: (k) => {
                        p.current = k.shiftKey;
                      },
                      onKeyDown: (k) => {
                        p.current = k.shiftKey;
                      },
                      children: /* @__PURE__ */ t(
                        rt,
                        {
                          "data-testid": `run-select-${m.id}`,
                          checked: N,
                          onChange: () => {
                            const k = p.current;
                            p.current = !1, x(m.id, w, k);
                          },
                          "aria-label": `Select run ${m.id.slice(0, 8)}`
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ t(
                    "input",
                    {
                      type: "checkbox",
                      "data-testid": `run-compare-pick-${m.id}`,
                      checked: a.includes(m.id),
                      onChange: () => i(m.id),
                      "aria-label": `Pick run ${m.id.slice(0, 8)} for comparison`,
                      className: "absolute w-px h-px opacity-0 pointer-events-none",
                      tabIndex: -1
                    }
                  )
                ] }),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: Wp(m.startedAt) }),
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: [
                  /* @__PURE__ */ t(le, { tone: v, "aria-label": `Status: ${b}`, children: b }),
                  m.status === "running" && m.stuckAt && /* @__PURE__ */ t(
                    le,
                    {
                      tone: "warning",
                      size: "xs",
                      "data-testid": `run-stuck-badge-${m.id}`,
                      title: `No pipeline events since ${new Date(m.stuckAt).toLocaleTimeString()}`,
                      className: "ml-1.5",
                      children: "Stuck"
                    }
                  ),
                  m.status === "failed" && m.error?.errorCategory && /* @__PURE__ */ t(
                    le,
                    {
                      tone: Fp(m.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${m.id}`,
                      title: m.error.message,
                      className: "ml-1.5",
                      children: qp[m.error.errorCategory] ?? m.error.errorCategory
                    }
                  )
                ] }),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: De(m.durationMs) }),
                /* @__PURE__ */ t(
                  "td",
                  {
                    className: I(
                      "px-3 py-2.5 text-xs font-mono",
                      y > 0 ? "text-text-primary" : "text-text-tertiary"
                    ),
                    "data-testid": `run-retries-${m.id}`,
                    title: y > 0 ? `${y} retry attempts across this run` : "No retries — every step succeeded on first attempt",
                    children: y > 0 ? `×${y}` : "—"
                  }
                ),
                /* @__PURE__ */ t(
                  "td",
                  {
                    className: "px-3 py-2.5 text-xs text-text-secondary font-mono",
                    "data-testid": `run-cost-${m.id}`,
                    children: s[m.id] ?? "—"
                  }
                ),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: m.triggeredBy.userId ?? m.triggeredBy.triggerType }),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-[11px] font-mono text-text-tertiary", children: m.id.slice(0, 8) }),
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right", onClick: (k) => k.stopPropagation(), children: [
                  m.status === "running" && m.stuckAt && /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      "data-testid": `force-fail-${m.id}`,
                      onClick: async (k) => {
                        if (k.stopPropagation(), !!confirm(`Force-fail stuck run ${m.id.slice(0, 8)}? The run will be interrupted and you can retry from the stuck step.`))
                          try {
                            await Bo(m.pipelineId, m.id);
                          } catch (C) {
                            alert(`Force-fail failed: ${C instanceof Error ? C.message : String(C)}`);
                          }
                      },
                      title: "Force-fail this stuck run so you can retry from the stuck step",
                      className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-warning-fg border border-warning-border rounded cursor-pointer font-[inherit]",
                      children: "⚡ Force-fail"
                    }
                  ),
                  m.status === "failed" && m.error?.nodeId && m.error.nodeId !== "unknown" && /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      "data-testid": `retry-from-failed-step-${m.id}`,
                      onClick: (k) => {
                        k.stopPropagation(), l(m);
                      },
                      title: `Retry from "${m.error.nodeId}" with the original upstream context`,
                      className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-caution-fg border border-caution-border rounded cursor-pointer font-[inherit]",
                      children: "↻ Retry from failed"
                    }
                  ),
                  /* @__PURE__ */ t("span", { className: "text-xs text-primary", children: "View →" })
                ] })
              ]
            },
            m.id
          );
        }) })
      ]
    }
  );
}
function Zm() {
  const { pipelineId: e } = xt(), n = Ve(), [r, a] = Ht(), [i, s] = S([]), [d, c] = S(null), [l, p] = S([]), [u, f] = S(() => /* @__PURE__ */ new Set()), [h, g] = S(null), [x, m] = S(!1), [w, v] = S(null), [b, N] = S(!1), y = E((L) => {
    const V = L.error?.nodeId;
    if (!V || V === "unknown") return;
    const K = Object.entries(L.steps).filter(([X, me]) => X !== V && me.status === "completed").map(([X]) => X);
    g({ run: L, nodeId: V, skippedNodes: K, snapshotInput: !1 }), v(null);
  }, []), k = E(async () => {
    if (h) {
      v(null), m(!0);
      try {
        const L = await Kr(
          h.run.pipelineId,
          h.run.id,
          h.nodeId,
          void 0,
          h.snapshotInput || void 0
        );
        g(null), n(`/pipelines/${h.run.pipelineId}/runs/${L.newRunId}`);
      } catch (L) {
        v(L instanceof Error ? L.message : String(L)), m(!1);
      }
    }
  }, [h, n]), { query: C, statuses: T, triggerKinds: M, range: P } = W(
    () => xo(r),
    [r]
  ), D = (L, V) => {
    const K = new URLSearchParams(r);
    V ? K.set(L, V) : K.delete(L), a(K, { replace: !0 });
  }, re = (L) => {
    const V = new Set(T);
    V.has(L) ? V.delete(L) : V.add(L), D("status", V.size === 0 ? null : Array.from(V).join(","));
  }, A = (L) => {
    const V = new Set(M);
    V.has(L) ? V.delete(L) : V.add(L), D("trigger", V.size === 0 ? null : Array.from(V).join(","));
  }, J = (L) => {
    D("range", L === "7d" ? null : L);
  }, Q = (L) => {
    D("q", L.length === 0 ? null : L);
  }, G = (L) => {
    p((V) => V.includes(L) ? V.filter((K) => K !== L) : V.length >= 2 ? [V[1], L] : [...V, L]);
  };
  oe(() => {
    e && (c(ct(e)), s(Ft(e)));
  }, [e]);
  const Z = W(
    () => go(i, { query: C, statuses: T, triggerKinds: M, range: P }),
    [i, C, T, M, P]
  ), O = W(() => {
    const L = /* @__PURE__ */ new Map();
    if (!d) return L;
    for (const V of d.nodes)
      V.data.type === "llm" && L.set(V.id, V.data.model);
    return L;
  }, [d]), R = W(() => {
    const L = {};
    for (const V of Z) {
      const K = Object.values(V.steps).filter((X) => !!X.llm).map((X) => ({
        model: O.get(X.nodeId),
        tokensIn: X.llm?.tokensIn ?? 0,
        tokensOut: X.llm?.tokensOut ?? 0
      }));
      L[V.id] = Bt(Nt(K).total);
    }
    return L;
  }, [Z, O]), Y = () => {
    if (!e) return;
    N(!1);
    const L = Array.from(u), V = i.filter((K) => !u.has(K.id));
    Vr(e);
    for (const K of [...V].sort((X, me) => X.startedAt.localeCompare(me.startedAt)))
      Uo(e, K);
    s(Ft(e)), f(/* @__PURE__ */ new Set()), p((K) => K.filter((X) => !L.includes(X)));
  }, F = () => {
    const L = i.filter((q) => u.has(q.id));
    if (L.length === 0) return;
    const V = new Blob([JSON.stringify(L, null, 2)], { type: "application/json" }), K = URL.createObjectURL(V), X = document.createElement("a"), me = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    X.href = K, X.download = `pipeline-runs-${me}.json`, document.body.appendChild(X), X.click(), document.body.removeChild(X), URL.revokeObjectURL(K);
  };
  return e ? d ? /* @__PURE__ */ o("div", { "data-testid": "pipeline-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ t(
      Wt,
      {
        open: h !== null,
        onConfirm: k,
        onCancel: () => {
          x || g(null);
        },
        title: "Retry from failure",
        confirmLabel: x ? "Starting…" : "Confirm retry",
        confirmDisabled: x,
        children: h && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2.5", children: [
          /* @__PURE__ */ o("div", { className: "text-[13px] text-text-secondary", children: [
            "Run ",
            /* @__PURE__ */ t("code", { className: "bg-surface-inset px-1 py-px rounded-[3px] text-xs", children: h.run.id.slice(0, 8) }),
            " will restart from step",
            " ",
            /* @__PURE__ */ o("code", { className: "bg-surface-inset px-1 py-px rounded-[3px] text-xs", children: [
              h.nodeId.slice(0, 12),
              h.nodeId.length > 12 ? "…" : ""
            ] }),
            " ",
            "using the original upstream context."
          ] }),
          h.skippedNodes.length > 0 && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5", children: [
              "Steps skipped (",
              h.skippedNodes.length,
              ")"
            ] }),
            /* @__PURE__ */ t("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: h.skippedNodes.map((L) => /* @__PURE__ */ t("span", { className: "bg-surface-inset border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary", children: L.slice(0, 10) }, L)) })
          ] }),
          /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
            /* @__PURE__ */ t(
              rt,
              {
                checked: h.snapshotInput,
                onChange: (L) => g((V) => V && { ...V, snapshotInput: L })
              }
            ),
            "Use persisted input snapshot"
          ] }),
          w && /* @__PURE__ */ t("div", { "data-testid": "retry-modal-error", className: "px-3 py-2 bg-danger-bg border border-danger-border rounded-md text-xs text-danger-fg", children: w })
        ] })
      }
    ),
    /* @__PURE__ */ t(
      Wt,
      {
        open: b,
        onConfirm: Y,
        onCancel: () => N(!1),
        title: `Delete ${u.size} run${u.size === 1 ? "" : "s"}?`,
        body: "This cannot be undone.",
        confirmLabel: `Delete ${u.size}`,
        tone: "destructive"
      }
    ),
    w && /* @__PURE__ */ t(nt, { title: "Retry failed:", onDismiss: () => v(null), children: w }),
    /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => n(`/pipelines/${e}`),
          className: "bg-none border-none text-primary cursor-pointer text-[13px] p-0",
          children: [
            "← ",
            d.name
          ]
        }
      ),
      /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "/" }),
      /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: "Run history" }),
      /* @__PURE__ */ o("span", { className: "text-xs text-text-tertiary ml-auto", children: [
        i.length,
        " run",
        i.length === 1 ? "" : "s",
        " persisted"
      ] }),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => n(`/pipelines/${e}/stats`),
          "data-testid": "runs-stats-link",
          className: "px-2.5 py-1 text-xs font-medium border border-border bg-surface text-text-secondary rounded cursor-pointer font-[inherit]",
          children: "📊 Stats"
        }
      ),
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          disabled: l.length !== 2,
          onClick: () => {
            if (l.length !== 2) return;
            const [L, V] = l;
            n(`/pipelines/${e}/runs/compare/${L}/${V}`);
          },
          "data-testid": "run-compare-btn",
          className: I(
            "px-2.5 py-1 text-xs font-medium rounded font-[inherit]",
            l.length === 2 ? "border border-primary bg-primary text-white cursor-pointer opacity-100" : "border border-border bg-surface text-text-secondary cursor-not-allowed opacity-70"
          ),
          children: [
            "⇄ Compare (",
            l.length,
            "/2)"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ t(
      bo,
      {
        query: C,
        statuses: T,
        triggerKinds: M,
        range: P,
        onQueryChange: Q,
        onStatusToggle: re,
        onTriggerToggle: A,
        onRangeChange: J,
        onClearFilters: () => {
          Q(""), D("status", null), D("trigger", null);
        }
      }
    ),
    u.size > 0 && /* @__PURE__ */ t(
      zp,
      {
        selectionCount: u.size,
        onExport: F,
        onDelete: () => {
          u.size > 0 && e && N(!0);
        },
        onClear: () => f(/* @__PURE__ */ new Set())
      }
    ),
    Z.length === 0 ? /* @__PURE__ */ t(
      qe,
      {
        icon: "📜",
        title: i.length === 0 ? "No runs yet" : "No runs match these filters",
        body: i.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
      }
    ) : /* @__PURE__ */ t(
      Vp,
      {
        filtered: Z,
        selected: u,
        onSelectionChange: f,
        comparePair: l,
        onToggleComparePair: G,
        costByRunId: R,
        pipelineId: e,
        onNavigate: n,
        onOpenRetryModal: y
      }
    )
  ] }) : /* @__PURE__ */ t("div", { className: "p-8", children: /* @__PURE__ */ t(
    qe,
    {
      icon: "🔍",
      title: "Pipeline not found",
      body: "It may have been deleted. Go back to the pipelines list.",
      actionLabel: "Back to pipelines",
      onAction: () => n("/pipelines")
    }
  ) }) : /* @__PURE__ */ t(bt, { to: "/pipelines", replace: !0 });
}
function Kp(e) {
  return W(() => {
    if (!e) return null;
    const n = ct(e.pipelineId);
    if (!n) return null;
    const r = /* @__PURE__ */ new Map();
    for (const i of n.nodes)
      i.data.type === "llm" && r.set(i.id, i.data.model);
    const a = Object.values(e.steps).filter((i) => !!i.llm).map((i) => ({
      model: r.get(i.nodeId),
      tokensIn: i.llm?.tokensIn ?? 0,
      tokensOut: i.llm?.tokensOut ?? 0
    }));
    return Nt(a).total;
  }, [e]);
}
function tt({ title: e, children: n }) {
  return /* @__PURE__ */ o("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ t("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: e }),
    n
  ] });
}
const kr = "m-0 px-3 py-2 bg-surface-inset border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", Cr = "px-3.5 py-2.5 bg-surface-inset border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", fn = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", Le = "px-2 py-[5px] text-[11px] text-text-secondary align-top", Hp = {
  "var(--color-info)": "bg-info/10 text-info-fg",
  "var(--color-cat-ai)": "bg-accent/10 text-accent-fg",
  "var(--color-success)": "bg-success/10 text-success-fg",
  "var(--color-danger)": "bg-danger/10 text-danger-fg"
};
function $t(e) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${Hp[e] ?? ""}`.trimEnd();
}
const Jp = {
  completed: "var(--color-success)",
  failed: "var(--color-danger)",
  running: "var(--color-info)"
};
function Gp({ stepId: e, step: n, index: r, nodeType: a, nodeConfig: i, onRetryFromStep: s, onResumeFromStep: d }) {
  const [c, l] = S(!1), p = n.output, u = p?.response, f = n.llm, h = n.input, g = Jp[n.status] ?? "var(--color-text-tertiary)";
  return /* @__PURE__ */ o("div", { className: "relative pl-9 mb-1", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: "absolute left-[10px] top-[14px] w-3 h-3 rounded-full border-2 border-white z-[1] shadow-[0_0_0_1px_#e2e8f0]",
        style: { background: g }
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        onClick: () => l(!c),
        "aria-expanded": c,
        role: "button",
        tabIndex: 0,
        onKeyDown: (x) => {
          (x.key === "Enter" || x.key === " ") && (x.preventDefault(), l(!c));
        },
        className: I(
          "flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer transition-colors duration-100",
          c ? "bg-surface-inset rounded-t-lg" : "bg-surface rounded-lg"
        ),
        style: {
          border: `1px solid ${c ? g + "40" : "var(--color-border)"}`,
          ...c ? { borderRadius: "8px 8px 0 0" } : {}
        },
        children: [
          /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": "true",
              className: I(
                "text-[10px] text-text-tertiary shrink-0 transition-transform duration-150",
                c && "rotate-90"
              ),
              children: "▶"
            }
          ),
          /* @__PURE__ */ t(
            "span",
            {
              "aria-label": `Status: ${n.status}`,
              className: "text-[10px] font-bold text-white px-1.5 py-0.5 rounded-[3px] uppercase shrink-0",
              style: { background: g },
              children: n.status
            }
          ),
          /* @__PURE__ */ o("span", { className: "text-[13px] font-semibold text-text-primary", children: [
            r + 1,
            ". ",
            a
          ] }),
          /* @__PURE__ */ t("span", { className: "text-[11px] font-mono text-text-tertiary", children: e.slice(0, 8) }),
          n.durationMs != null && /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary ml-auto", children: n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` }),
          f && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
            f.tokensIn + f.tokensOut,
            " tok"
          ] }),
          p?.tokensIn != null && !f && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
            Number(p.tokensIn) + Number(p.tokensOut),
            " tok"
          ] })
        ]
      }
    ),
    c && /* @__PURE__ */ o(
      "div",
      {
        className: "border-t-0 rounded-b-lg bg-surface overflow-hidden",
        style: { border: `1px solid ${g}40` },
        children: [
          /* @__PURE__ */ t(tt, { title: "Execution Timeline", children: /* @__PURE__ */ o("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ t("th", { scope: "col", className: fn, children: "Event" }),
              /* @__PURE__ */ t("th", { scope: "col", className: fn, children: "Time" }),
              /* @__PURE__ */ t("th", { scope: "col", className: fn, children: "Detail" })
            ] }) }),
            /* @__PURE__ */ o("tbody", { children: [
              n.startedAt && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Le, children: /* @__PURE__ */ t("span", { className: $t("var(--color-info)"), children: "started" }) }),
                /* @__PURE__ */ t("td", { className: Le, children: new Date(n.startedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Le, children: [
                  "Node ",
                  e.slice(0, 8),
                  " (",
                  a,
                  ") began execution"
                ] })
              ] }),
              f?.streamOpened && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Le, children: /* @__PURE__ */ t("span", { className: $t("var(--color-cat-ai)"), children: "stream.opened" }) }),
                /* @__PURE__ */ t("td", { className: Le, children: "—" }),
                /* @__PURE__ */ t("td", { className: Le, children: "LLM stream connection established" })
              ] }),
              f?.firstTokenLatencyMs != null && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Le, children: /* @__PURE__ */ t("span", { className: $t("var(--color-cat-ai)"), children: "first.token" }) }),
                /* @__PURE__ */ o("td", { className: Le, children: [
                  "+",
                  f.firstTokenLatencyMs,
                  "ms"
                ] }),
                /* @__PURE__ */ t("td", { className: Le, children: "First token received from LLM" })
              ] }),
              n.completedAt && n.status === "completed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Le, children: /* @__PURE__ */ t("span", { className: $t("var(--color-success)"), children: "completed" }) }),
                /* @__PURE__ */ t("td", { className: Le, children: new Date(n.completedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Le, children: [
                  "Finished in ",
                  n.durationMs != null ? n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` : "—"
                ] })
              ] }),
              n.status === "failed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Le, children: /* @__PURE__ */ t("span", { className: $t("var(--color-danger)"), children: "failed" }) }),
                /* @__PURE__ */ t("td", { className: Le, children: n.completedAt ? new Date(n.completedAt).toLocaleTimeString() : "—" }),
                /* @__PURE__ */ t("td", { className: Le, children: n.error ?? "Unknown error" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ t(tt, { title: "Node Configuration", children: i && Object.keys(i).length > 1 ? /* @__PURE__ */ t("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(i).filter(([x]) => x !== "type").map(([x, m]) => /* @__PURE__ */ o(Ur.Fragment, { children: [
            /* @__PURE__ */ t("span", { className: "text-text-tertiary font-medium", children: x }),
            /* @__PURE__ */ t(
              "span",
              {
                className: I(
                  "text-text-secondary break-words",
                  typeof m == "string" && m.length > 60 ? "whitespace-pre-wrap font-sans" : "whitespace-nowrap font-mono"
                ),
                children: typeof m == "string" ? m : JSON.stringify(m)
              }
            )
          ] }, x)) }) : /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary italic", children: "No configuration" }) }),
          h && Object.keys(h).length > 0 && /* @__PURE__ */ t(tt, { title: "Runtime Input", children: /* @__PURE__ */ t("pre", { className: kr, children: JSON.stringify(h, null, 2) }) }),
          f?.prompt && /* @__PURE__ */ t(tt, { title: "Resolved Prompt", children: /* @__PURE__ */ t("div", { className: Cr, children: f.prompt }) }),
          u || f?.response ? /* @__PURE__ */ t(tt, { title: "Response", children: /* @__PURE__ */ t("div", { className: Cr, children: u ?? f?.response }) }) : /* @__PURE__ */ t(tt, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ t("pre", { className: kr, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
          (f || p?.tokensIn != null) && /* @__PURE__ */ t(tt, { title: "Token Usage", children: /* @__PURE__ */ o("div", { className: "flex gap-5 flex-wrap text-xs text-text-secondary", children: [
            /* @__PURE__ */ o("span", { children: [
              "Tokens in: ",
              /* @__PURE__ */ t("strong", { children: String(f?.tokensIn ?? p?.tokensIn ?? "—") })
            ] }),
            /* @__PURE__ */ o("span", { children: [
              "Tokens out: ",
              /* @__PURE__ */ t("strong", { children: String(f?.tokensOut ?? p?.tokensOut ?? "—") })
            ] }),
            f?.firstTokenLatencyMs != null && /* @__PURE__ */ o("span", { children: [
              "First token: ",
              /* @__PURE__ */ o("strong", { children: [
                f.firstTokenLatencyMs,
                "ms"
              ] })
            ] })
          ] }) }),
          n.error && /* @__PURE__ */ t(tt, { title: "Error", children: /* @__PURE__ */ t("div", { className: "px-3 py-2 bg-danger-bg border border-danger-border rounded-md text-xs text-danger-fg font-mono whitespace-pre-wrap", children: n.error }) }),
          (s || d) && /* @__PURE__ */ o("div", { className: "px-4 py-2.5 border-t border-border flex justify-end gap-2", children: [
            d && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                "data-testid": `resume-from-step-${e}`,
                onClick: (x) => {
                  x.stopPropagation(), d(e);
                },
                title: "Resume the same run from this step (preserves accumulated context)",
                className: "px-3 py-[5px] text-xs font-medium border border-primary bg-primary text-white rounded cursor-pointer font-[inherit]",
                children: "↻ Resume from here"
              }
            ),
            s && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                "data-testid": `retry-from-step-${e}`,
                onClick: (x) => {
                  x.stopPropagation(), s(e);
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
function Yp({ steps: e, nodeDataMap: n, edges: r, onRetryFromStep: a, onResumeFromStep: i }) {
  const s = W(() => {
    const l = Object.entries(e).sort(([, y], [, k]) => {
      const C = y.completedAt ? Date.parse(y.completedAt) - (y.durationMs ?? 0) : 0, T = k.completedAt ? Date.parse(k.completedAt) - (k.durationMs ?? 0) : 0;
      return C - T;
    });
    if (!r || r.length === 0)
      return l.map(([y, k]) => ({
        stepId: y,
        step: k,
        children: []
      }));
    const p = (y) => {
      const k = y.lastIndexOf(":");
      if (k > 0) {
        const C = y.slice(k + 1);
        if (/^\d+$/.test(C)) return y.slice(0, k);
      }
      return y;
    }, u = /* @__PURE__ */ new Set(["fork", "condition", "approval"]), f = /* @__PURE__ */ new Set();
    for (const [y] of l) {
      const k = p(y), C = n[k]?.type;
      C && u.has(C) && f.add(k);
    }
    const h = (y) => y.startsWith("branch-") || y === "true" || y === "false" || y === "approved" || y === "rejected", g = [];
    for (const y of r)
      f.has(y.source) && h(y.sourceHandle) && g.push({ forkId: y.source, branch: y.sourceHandle, targetNodeId: y.target });
    const x = /* @__PURE__ */ new Map();
    for (const y of r)
      x.has(y.source) || x.set(y.source, []), x.get(y.source).push({ target: y.target, handle: y.sourceHandle });
    const m = /* @__PURE__ */ new Set();
    function w(y) {
      const k = [];
      let C = y;
      for (; C; ) {
        const T = l.find(([J]) => p(J) === C && !m.has(J));
        if (!T) break;
        const [M, P] = T;
        m.add(M);
        const D = { stepId: M, step: P, children: [] }, re = p(M);
        if (f.has(re)) {
          const J = g.filter((Q) => Q.forkId === re);
          for (const { branch: Q, targetNodeId: G } of J) {
            const Z = w(G);
            for (const O of Z)
              O.branch = O.branch ?? Q;
            Z.length > 0 && (Z[0].branch = Q, D.children.push(...Z));
          }
        }
        k.push(D);
        const A = x.get(re)?.filter((J) => J.handle === "out");
        C = A && A.length === 1 ? A[0].target : null;
      }
      return k;
    }
    const v = /* @__PURE__ */ new Set();
    for (const y of r)
      v.add(y.target);
    const b = l.find(([y]) => !v.has(p(y)))?.[1] ? l.find(([y]) => !v.has(p(y)))[0] : l[0]?.[0];
    let N = [];
    b && (N = w(p(b)));
    for (const [y, k] of l)
      m.has(y) || N.push({ stepId: y, step: k, children: [] });
    return N;
  }, [e, n, r]), d = (l) => {
    if (n[l]) return n[l];
    const p = l.lastIndexOf(":");
    if (p > 0 && /^\d+$/.test(l.slice(p + 1)))
      return n[l.slice(0, p)];
  };
  function c(l, p) {
    let u = p;
    return l.map((f) => {
      const h = u++, g = /* @__PURE__ */ new Map();
      for (const x of f.children) {
        const m = x.branch ?? "default";
        g.has(m) || g.set(m, []), g.get(m).push(x);
      }
      return /* @__PURE__ */ o(Ur.Fragment, { children: [
        /* @__PURE__ */ t(
          Gp,
          {
            stepId: f.stepId,
            step: f.step,
            index: h,
            nodeType: d(f.stepId)?.type ?? "unknown",
            nodeConfig: d(f.stepId)?.data,
            onRetryFromStep: a,
            onResumeFromStep: i
          }
        ),
        f.children.length > 0 && /* @__PURE__ */ t("div", { className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1", children: Array.from(g.entries()).map(([x, m], w) => /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("div", { className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${w === 0 ? "mt-1" : "mt-2"}`, children: x.replace("-", " ") }),
          c(m, u)
        ] }, x)) })
      ] }, f.stepId);
    });
  }
  return /* @__PURE__ */ o("div", { className: "relative", children: [
    /* @__PURE__ */ t("div", { className: "absolute left-[15px] top-6 bottom-6 w-0.5 bg-border rounded-sm" }),
    c(s, 0)
  ] });
}
const Xp = 5e3, Qp = "synthetic-";
function Zp(e) {
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
function kn(e, n) {
  return n.timestamp.localeCompare(e.timestamp);
}
function eu(e, n) {
  if (n.length === 0) return e.slice().sort(kn);
  const r = new Set(e.map((s) => s.auditId)), a = /* @__PURE__ */ new Map();
  for (const s of e) {
    const d = a.get(s.action);
    (!d || s.timestamp > d) && a.set(s.action, s.timestamp);
  }
  const i = n.filter((s) => {
    if (r.has(s.auditId)) return !1;
    const d = a.get(s.action);
    return !d || s.timestamp >= d;
  });
  return [...e, ...i].sort(kn);
}
function tu(e, n, r = {}) {
  const { pollMs: a = Xp, filters: i } = r, s = ta(), [d, c] = S([]), [l, p] = S([]), [u, f] = S(!0), [h, g] = S(null), [x, m] = S(void 0), [w, v] = S(0), [b, N] = S(!1), y = JSON.stringify({
    since: i?.since,
    until: i?.until,
    actions: i?.actions,
    limit: i?.limit
  });
  oe(() => {
    if (!e || !n) return;
    let P = !1;
    return f(!0), g(null), (async () => {
      try {
        const D = await zn(e, n, i ?? {});
        if (P) return;
        c(D.items), m(D.nextCursor), f(!1);
      } catch (D) {
        if (P) return;
        g(D instanceof Error ? D.message : String(D)), f(!1);
      }
    })(), () => {
      P = !0;
    };
  }, [e, n, y, w]), oe(() => {
    if (!e || !n || a <= 0) return;
    const P = window.setInterval(() => {
      v((D) => D + 1);
    }, a);
    return () => window.clearInterval(P);
  }, [e, n, a]), oe(() => {
    if (!e || !n) return;
    const P = [], D = (A, J) => {
      const Q = Zp(A);
      if (!Q) return;
      const G = J;
      if (G.runId !== n) return;
      N(!0);
      const Z = {
        auditId: `${Qp}${A}-${G.stepId ?? "run"}-${Date.now()}`,
        timestamp: G.at ?? (/* @__PURE__ */ new Date()).toISOString(),
        action: Q,
        actorUserId: "executor",
        pipelineId: e,
        runId: n,
        trace: J
      };
      p((O) => [Z, ...O]);
    }, re = [
      "pipeline.step.started",
      "pipeline.step.completed",
      "pipeline.step.failed",
      "pipeline.step.breakpoint",
      "pipeline.run.completed",
      "pipeline.run.failed",
      "pipeline.run.resumed-from-step",
      "pipeline.approval.recorded"
    ];
    for (const A of re)
      P.push(s.subscribe(A, (J) => D(A, J)));
    return P.push(s.subscribeToRun(n)), () => {
      for (const A of P) A();
    };
  }, [s, e, n]), oe(() => {
    d.length !== 0 && p((P) => {
      if (P.length === 0) return P;
      const D = /* @__PURE__ */ new Map();
      for (const re of d) {
        const A = D.get(re.action);
        (!A || re.timestamp > A) && D.set(re.action, re.timestamp);
      }
      return P.filter((re) => {
        const A = D.get(re.action);
        return !A || re.timestamp >= A;
      });
    });
  }, [d]);
  const k = ce(!1), C = E(() => {
    !e || !n || !x || k.current || (k.current = !0, (async () => {
      try {
        const P = await zn(e, n, {
          ...i ?? {},
          cursor: x
        });
        c((D) => {
          const re = new Set(D.map((J) => J.auditId)), A = D.concat(P.items.filter((J) => !re.has(J.auditId)));
          return A.sort(kn), A;
        }), m(P.nextCursor);
      } catch (P) {
        g(P instanceof Error ? P.message : String(P));
      } finally {
        k.current = !1;
      }
    })());
  }, [e, n, x, y]), T = E(() => {
    v((P) => P + 1);
  }, []);
  return {
    items: W(() => eu(d, l), [d, l]),
    loading: u,
    error: h,
    hasMore: !!x,
    loadMore: C,
    liveHealthy: b,
    refresh: T
  };
}
const nu = "var(--color-info)", ru = "#eab308", ou = "var(--color-caution)", Ir = "var(--color-neutral)", au = "var(--color-danger)", iu = "var(--color-accent)";
function su(e) {
  return e.action === "pipeline.step.failed" || e.outcome === "error" ? au : e.action === "pipeline.run.resumed-from-step" || e.action.startsWith("pipeline.step.context.patched") ? iu : e.action.startsWith("pipeline.approval.") ? ru : e.action.startsWith("pipeline.breakpoint.") ? ou : e.action.startsWith("pipeline.step.") ? nu : (e.action.startsWith("pipeline.run."), Ir);
}
const lu = {
  "1h": "Last 1h",
  "24h": "Last 24h",
  all: "All"
}, Sr = [
  { label: "Steps", matches: (e) => e.startsWith("pipeline.step.") },
  { label: "Approvals", matches: (e) => e.startsWith("pipeline.approval.") || e === "pipeline.approve" || e === "pipeline.reject" },
  { label: "Breakpoints", matches: (e) => e.startsWith("pipeline.breakpoint.") || e === "pipeline.step.breakpoint.hit" },
  { label: "Run lifecycle", matches: (e) => e.startsWith("pipeline.run.") || e === "pipeline.trigger" || e === "pipeline.cancel" },
  { label: "Errors", matches: (e) => e === "pipeline.step.failed" || e === "pipeline.run.failed" || e === "pipeline.force_fail" }
];
function cu(e) {
  if (e === "all") return null;
  const n = Date.now();
  return e === "1h" ? n - 3600 * 1e3 : n - 1440 * 60 * 1e3;
}
function Tr(e) {
  const n = e.details, r = e.trace, a = n && typeof n.stepId == "string" ? n.stepId : void 0, i = r && typeof r.stepId == "string" ? r.stepId : void 0, s = r && typeof r.nodeId == "string" ? r.nodeId : void 0;
  return a ?? i ?? s;
}
function du(e, n = Date.now()) {
  const r = Date.parse(e);
  if (!Number.isFinite(r)) return e;
  const a = Math.max(0, Math.floor((n - r) / 1e3));
  if (a < 5) return "just now";
  if (a < 60) return `${a}s ago`;
  const i = Math.floor(a / 60);
  if (i < 60) return `${i}m ago`;
  const s = Math.floor(i / 60);
  return s < 24 ? `${s}h ago` : `${Math.floor(s / 24)}d ago`;
}
function pu({
  pipelineId: e,
  runId: n,
  onStepClick: r
}) {
  const a = tu(e, n), { items: i, error: s, hasMore: d, loadMore: c, loading: l } = a, [p, u] = S(/* @__PURE__ */ new Set()), [f, h] = S(""), [g, x] = S("all"), [m, w] = S(/* @__PURE__ */ new Set()), v = E((C) => {
    u((T) => {
      const M = new Set(T);
      return M.has(C) ? M.delete(C) : M.add(C), M;
    });
  }, []), b = E((C) => {
    w((T) => {
      const M = new Set(T);
      return M.has(C) ? M.delete(C) : M.add(C), M;
    });
  }, []), N = W(() => {
    const C = cu(g), T = f.trim().toLowerCase(), M = Sr.filter((P) => p.has(P.label));
    return i.filter((P) => {
      if (M.length > 0 && !M.some((D) => D.matches(P.action)) || T && !P.actorUserId.toLowerCase().includes(T)) return !1;
      if (C !== null) {
        const D = Date.parse(P.timestamp);
        if (!Number.isFinite(D) || D < C) return !1;
      }
      return !0;
    });
  }, [i, p, f, g]), y = E(() => {
    if (typeof window > "u") return;
    const C = N.map((D) => JSON.stringify(D)).join(`
`) + (N.length > 0 ? `
` : ""), T = new Blob([C], { type: "application/x-ndjson" }), M = URL.createObjectURL(T), P = document.createElement("a");
    P.href = M, P.download = `executor-log-${n}.ndjson`, document.body.appendChild(P), P.click(), document.body.removeChild(P), URL.revokeObjectURL(M);
  }, [N, n]), k = E(
    (C) => {
      if (b(C.auditId), !r || !C.action.startsWith("pipeline.step.")) return;
      const T = Tr(C);
      T && r(T);
    },
    [r, b]
  );
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col flex-1 min-h-0 bg-surface border border-border rounded-lg overflow-hidden",
      "data-testid": "executor-log",
      children: [
        /* @__PURE__ */ o("div", { className: "sticky top-0 z-[2] flex flex-wrap items-center gap-2 px-3 py-2.5 bg-surface-panel border-b border-border text-xs", children: [
          /* @__PURE__ */ o(
            "span",
            {
              className: I(
                "inline-flex items-center text-[11px] font-semibold",
                s ? "text-text-tertiary" : "text-text-secondary"
              ),
              "data-testid": "executor-log-live-indicator",
              title: s ? `Live updates unavailable: ${s}` : "Live updates active",
              children: [
                /* @__PURE__ */ t(
                  "span",
                  {
                    className: I(
                      "inline-block w-2 h-2 rounded-full mr-1.5 align-middle",
                      s ? "bg-text-tertiary" : "bg-success [animation:executor-log-pulse_1.6s_ease-in-out_infinite]"
                    ),
                    "aria-hidden": !0
                  }
                ),
                "Live"
              ]
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-border", children: "|" }),
          Sr.map((C) => {
            const T = p.has(C.label);
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  T ? "bg-info-bg text-info-fg border-info-border" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => v(C.label),
                "data-testid": `executor-log-chip-${C.label.toLowerCase().replace(/\s+/g, "-")}`,
                "aria-pressed": T,
                children: C.label
              },
              C.label
            );
          }),
          /* @__PURE__ */ t("span", { className: "text-border", children: "|" }),
          /* @__PURE__ */ t(
            we,
            {
              size: "sm",
              value: f,
              onChange: (C) => h(C.target.value),
              placeholder: "Actor",
              className: "min-w-30",
              "data-testid": "executor-log-actor-input",
              "aria-label": "Filter by actor"
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-border", children: "|" }),
          ["1h", "24h", "all"].map((C) => {
            const T = g === C;
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  T ? "bg-info-bg text-info-fg border-info-border" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => x(C),
                "data-testid": `executor-log-time-${C}`,
                "aria-pressed": T,
                children: lu[C]
              },
              C
            );
          }),
          /* @__PURE__ */ t("div", { className: "flex-1" }),
          /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", children: [
            N.length,
            " of ",
            i.length,
            " shown"
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto px-4 py-3 relative", "data-testid": "executor-log-timeline", children: [
          l && i.length === 0 && /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary p-3", children: "Loading audit rows…" }),
          !l && i.length === 0 && /* @__PURE__ */ t(
            "div",
            {
              className: "px-3 py-6 text-[13px] text-text-secondary text-center leading-relaxed",
              "data-testid": "executor-log-empty",
              children: "Audit log started recording on 2026-05-07 (hub#2224). This run predates that — no rows captured."
            }
          ),
          N.length === 0 && i.length > 0 && /* @__PURE__ */ t(
            "div",
            {
              className: "px-3 py-5 text-xs text-text-tertiary text-center",
              "data-testid": "executor-log-no-matches",
              children: "No audit rows match the current filters."
            }
          ),
          N.map((C) => {
            const T = m.has(C.auditId), P = C.action.startsWith("pipeline.step.") ? Tr(C) : void 0;
            return /* @__PURE__ */ o(
              "div",
              {
                className: "grid grid-cols-[14px_auto_auto_1fr] items-baseline gap-2.5 py-1.5 text-xs border-b border-surface-inset cursor-pointer",
                onClick: () => k(C),
                "data-testid": "executor-log-row",
                "data-action": C.action,
                "data-audit-id": C.auditId,
                children: [
                  /* @__PURE__ */ t(
                    "span",
                    {
                      className: "w-2.5 h-2.5 rounded-full shrink-0 self-center",
                      style: { background: su(C) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ t(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: C.timestamp,
                      children: du(C.timestamp)
                    }
                  ),
                  /* @__PURE__ */ t("span", { className: "text-text-secondary text-[11px] whitespace-nowrap", children: C.actorUserId }),
                  /* @__PURE__ */ o("span", { className: "text-text-primary flex items-baseline gap-1.5 flex-wrap", children: [
                    /* @__PURE__ */ t("code", { className: "font-mono text-[11px] bg-surface-inset px-1.5 py-px rounded-[3px]", children: C.action }),
                    P && /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", "data-testid": "executor-log-stepid", children: [
                      "· ",
                      P.slice(0, 14),
                      P.length > 14 ? "…" : ""
                    ] }),
                    C.outcome && /* @__PURE__ */ o(
                      "span",
                      {
                        className: I(
                          "text-[11px]",
                          C.outcome === "error" ? "text-danger-fg" : "text-text-tertiary"
                        ),
                        children: [
                          "· ",
                          C.outcome
                        ]
                      }
                    )
                  ] }),
                  T && C.trace && /* @__PURE__ */ t(
                    "pre",
                    {
                      className: "col-[2/span_3] mt-1 p-2 bg-surface-inset border border-border rounded text-[11px] font-mono text-text-secondary overflow-x-auto",
                      "data-testid": "executor-log-trace",
                      onClick: (D) => D.stopPropagation(),
                      children: JSON.stringify(C.trace, null, 2)
                    }
                  )
                ]
              },
              C.auditId
            );
          })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex justify-between items-center gap-2 px-3 py-2.5 border-t border-border bg-surface-panel", children: [
          d ? /* @__PURE__ */ t("span", { "data-testid": "executor-log-load-more", children: /* @__PURE__ */ t(
            Pe,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => c(),
              children: "Load more"
            }
          ) }) : /* @__PURE__ */ t("span", {}),
          /* @__PURE__ */ t("span", { "data-testid": "executor-log-download", children: /* @__PURE__ */ t(
            Pe,
            {
              variant: "secondary",
              size: "sm",
              onClick: y,
              disabled: N.length === 0,
              children: "Download log"
            }
          ) })
        ] })
      ]
    }
  );
}
function eh() {
  const { pipelineId: e, runId: n } = xt();
  return !e || !n ? /* @__PURE__ */ t(bt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t(Wr, { pipelineId: e, children: /* @__PURE__ */ t(jo, { children: /* @__PURE__ */ t(uu, { pipelineId: e, runId: n }) }) });
}
function uu({ pipelineId: e, runId: n }) {
  const r = Ve(), a = Ke(), i = yt(), { definition: s } = a, [d, c] = S(null);
  oe(() => {
    let q = !1;
    return import("./usePendingApprovals-CZUoGJD7.js").then((de) => de.a1).then(({ getPipelineRun: de }) => {
      de(e, n).then((Ie) => {
        !q && Ie && c(Ie);
      });
    }), () => {
      q = !0;
    };
  }, [e, n]);
  const l = W(() => {
    const q = i.runs[n], de = d;
    if (!q && !de) return;
    if (!q) return de ?? void 0;
    if (!de) return q;
    const Ie = Object.keys(q.steps).length, Fe = Object.keys(de.steps).length;
    return Ie >= Fe ? q : { ...de, status: q.status, currentStepIds: q.currentStepIds };
  }, [i.runs, n, d]);
  zo(n);
  const p = Kp(l ?? null), u = W(() => {
    const q = {};
    if (!s) return q;
    for (const de of s.nodes)
      q[de.id] = { type: de.data.type, data: de.data };
    return q;
  }, [s]), [f, h] = S(!1), g = ce(null);
  gt(g, () => h(!1), f);
  const [x, m] = S("steps"), [w, v] = S(null), b = E((q) => {
    v(q), m("steps");
  }, []), [N, y] = S(null), [k, C] = S(null), [T, M] = S(!1), P = l?.status === "failed" ? l.error?.nodeId : void 0, D = E((q) => {
    if (!l) return;
    const de = Object.entries(l.steps).filter(([Ie, Fe]) => Ie !== q && Fe.status === "completed").map(([Ie]) => Ie);
    y({ nodeId: q, skippedNodes: de, snapshotInput: !1 }), C(null);
  }, [l]), re = E(async () => {
    if (!(!N || !l)) {
      C(null), M(!0);
      try {
        const q = await Kr(
          e,
          l.id,
          N.nodeId,
          void 0,
          N.snapshotInput || void 0
        );
        y(null), r(`/pipelines/${e}/runs/${q.newRunId}`);
      } catch (q) {
        C(q instanceof Error ? q.message : String(q)), M(!1);
      }
    }
  }, [N, l, e, r]), [A, J] = S(null), [Q, G] = S(null), [Z, O] = S(null), R = E(async (q) => {
    if (l) {
      G(null), J(q);
      try {
        const de = await Fo(e, l.id, q);
        O(
          `Resumed from ${q.slice(0, 10)}${q.length > 10 ? "…" : ""} (replay #${de.replayAttempts})`
        ), setTimeout(() => O(null), 4e3), r(`/pipelines/${e}/runs/${l.id}`);
      } catch (de) {
        G(de instanceof Error ? de.message : String(de));
      } finally {
        J(null);
      }
    }
  }, [l, e, r]), Y = E(async () => {
    if (!l) {
      try {
        const q = await i.triggerRun(e);
        r(`/pipelines/${e}/runs/${q}`);
      } catch (q) {
        console.error("[PipelineRunReplay] re-run failed", q);
      }
      return;
    }
    try {
      const q = await i.triggerRun(
        e,
        l.triggeredBy.payload
      );
      r(`/pipelines/${e}/runs/${q}`);
    } catch (q) {
      console.error("[PipelineRunReplay] re-run failed", q);
    }
  }, [l, i, e, r]), F = async () => {
    h(!1);
    try {
      await navigator.clipboard?.writeText(n);
    } catch {
    }
  }, L = () => {
    if (h(!1), !l) return;
    const q = JSON.stringify(l, null, 2);
    Rt(`run-${n}.json`, q);
  }, V = () => {
    if (h(!1), !s) return;
    const q = $n(
      s.id,
      `${s.name} (from run)`
    );
    q && r(`/pipelines/${q.id}`);
  };
  if (!l)
    return /* @__PURE__ */ o(
      "div",
      {
        className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
        "data-testid": "pipeline-replay-missing",
        children: [
          /* @__PURE__ */ o("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
            /* @__PURE__ */ t(
              mt,
              {
                onClick: () => r(`/pipelines/${e}`),
                "aria-label": "Back to pipeline",
                title: "Back to pipeline",
                children: "←"
              }
            ),
            /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: s?.name ?? "Pipeline" })
          ] }),
          /* @__PURE__ */ o("div", { className: "flex-1 flex flex-col items-center justify-center gap-3.5 p-8 text-center", children: [
            /* @__PURE__ */ t("div", { className: "text-sm text-text-secondary", children: "Run not available — it may have been trimmed from history." }),
            /* @__PURE__ */ t(
              Pe,
              {
                onClick: () => r(`/pipelines/${e}`),
                children: "Back to pipeline"
              }
            )
          ] })
        ]
      }
    );
  const K = Ln(l.status), X = l.triggeredBy.userId ?? l.triggeredBy.triggerType, me = Bt(p);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
      "data-testid": "pipeline-replay",
      children: [
        /* @__PURE__ */ o("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
          /* @__PURE__ */ t(
            mt,
            {
              onClick: () => r(`/pipelines/${e}`),
              "aria-label": "Back to pipeline",
              title: "Back to pipeline",
              children: "←"
            }
          ),
          /* @__PURE__ */ t(
            "div",
            {
              className: "text-[13px] font-bold text-text-primary max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap",
              title: s?.name ?? e,
              children: s?.name ?? e
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary text-xs", children: "·" }),
          /* @__PURE__ */ o(
            "div",
            {
              className: "text-xs text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
              "data-testid": "replay-subtitle",
              children: [
                "Run from ",
                ft(l.startedAt),
                " by ",
                X
              ]
            }
          ),
          /* @__PURE__ */ o(
            "span",
            {
              className: "text-text-tertiary text-xs",
              "data-testid": "replay-cost",
              children: [
                "· ",
                me
              ]
            }
          ),
          /* @__PURE__ */ t(le, { tone: K.tone, "aria-label": `Status: ${K.label}`, children: K.label }),
          l.status === "failed" && l.error?.errorCategory ? /* @__PURE__ */ t(
            le,
            {
              tone: "danger",
              title: l.error.message || "Error details unavailable",
              children: l.error.errorCategory
            }
          ) : null,
          /* @__PURE__ */ t("div", { className: "flex-1" }),
          P && /* @__PURE__ */ t(
            Pe,
            {
              onClick: () => D(P),
              disabled: T,
              "data-testid": "retry-from-failed-step-button",
              title: `Retry from "${P}" with the original upstream context`,
              children: "↻ Retry from failure"
            }
          ),
          /* @__PURE__ */ t(
            Pe,
            {
              onClick: Y,
              "data-testid": "rerun-button",
              title: "Re-run with the original trigger payload",
              children: "↻ Re-run"
            }
          ),
          /* @__PURE__ */ o("div", { className: "relative", ref: g, children: [
            /* @__PURE__ */ t(
              mt,
              {
                onClick: () => h((q) => !q),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            f ? /* @__PURE__ */ o("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: F, children: "Copy runId" }),
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: L, children: "Export run JSON" }),
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: V, children: "Open as new draft" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ t(
          Wt,
          {
            open: N !== null,
            onConfirm: re,
            onCancel: () => {
              T || y(null);
            },
            title: "Retry from step",
            confirmLabel: T ? "Starting…" : "Confirm retry",
            confirmDisabled: T,
            children: N && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[13px] text-text-secondary", children: [
                "A new run will start from",
                " ",
                /* @__PURE__ */ o("code", { className: "bg-surface-inset px-1 rounded text-xs", children: [
                  N.nodeId.slice(0, 12),
                  N.nodeId.length > 12 ? "…" : ""
                ] }),
                " ",
                "using the original upstream context."
              ] }),
              N.skippedNodes.length > 0 && /* @__PURE__ */ o("div", { children: [
                /* @__PURE__ */ o("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5", children: [
                  "Steps that will be skipped (",
                  N.skippedNodes.length,
                  ")"
                ] }),
                /* @__PURE__ */ t("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: N.skippedNodes.map((q) => /* @__PURE__ */ t("span", { className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary", children: q.slice(0, 10) }, q)) })
              ] }),
              /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
                /* @__PURE__ */ t(
                  rt,
                  {
                    checked: N.snapshotInput,
                    onChange: (q) => y((de) => de && { ...de, snapshotInput: q })
                  }
                ),
                "Use persisted input snapshot"
              ] }),
              k && /* @__PURE__ */ t("div", { "data-testid": "retry-modal-error", className: "py-2 px-3 bg-danger-bg border border-danger-border rounded-md text-xs text-danger-fg", children: k })
            ] })
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col min-h-0", children: /* @__PURE__ */ o("div", { className: "flex-1 overflow-auto py-5 px-7 bg-surface", children: [
          /* @__PURE__ */ o("div", { className: "flex items-center gap-3 mb-5", children: [
            /* @__PURE__ */ o("h3", { className: "m-0 text-[15px] font-bold text-text-primary", children: [
              "Steps (",
              Object.keys(l.steps).length,
              ")"
            ] }),
            /* @__PURE__ */ o("span", { className: "text-xs text-text-tertiary", children: [
              l.startedAt ? new Date(l.startedAt).toLocaleTimeString() : "",
              " — ",
              l.completedAt ? new Date(l.completedAt).toLocaleTimeString() : "in progress"
            ] }),
            l.durationMs != null && /* @__PURE__ */ o("span", { className: "text-xs text-text-secondary ml-auto", children: [
              "Total: ",
              l.durationMs < 1e3 ? `${l.durationMs}ms` : `${(l.durationMs / 1e3).toFixed(1)}s`
            ] })
          ] }),
          k && /* @__PURE__ */ t(nt, { title: "Retry failed:", className: "mb-4", children: k }),
          Q && /* @__PURE__ */ t(nt, { title: "Resume failed:", className: "mb-4", "data-testid": "resume-error-banner", children: Q }),
          (l.replayAttempts ?? 0) > 0 && /* @__PURE__ */ t(
            nt,
            {
              title: "Resumed from a previous failure",
              className: "mb-4",
              "data-testid": "resume-history-banner",
              children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ o("div", { children: [
                  l.error?.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o(H, { children: [
                    "Originally failed at ",
                    /* @__PURE__ */ t("code", { children: l.error.nodeId.slice(0, 12) }),
                    " — "
                  ] }),
                  "Resumed ",
                  l.replayAttempts,
                  " time",
                  l.replayAttempts === 1 ? "" : "s",
                  ".",
                  l.resumeHistory && l.resumeHistory.length > 0 && /* @__PURE__ */ o(H, { children: [
                    " ",
                    "Most recent: from",
                    " ",
                    /* @__PURE__ */ t("code", { children: l.resumeHistory[l.resumeHistory.length - 1].fromNodeId.slice(0, 12) }),
                    " ",
                    "at ",
                    ft(l.resumeHistory[l.resumeHistory.length - 1].at),
                    "."
                  ] })
                ] }),
                l.resumeHistory && l.resumeHistory.length > 1 && /* @__PURE__ */ t(
                  "ol",
                  {
                    className: "m-0 pl-[18px] text-[11px] text-text-tertiary leading-relaxed",
                    "data-testid": "resume-history-timeline",
                    children: l.resumeHistory.map((q, de) => /* @__PURE__ */ o("li", { children: [
                      "from ",
                      /* @__PURE__ */ t("code", { children: q.fromNodeId.slice(0, 12) }),
                      " at ",
                      ft(q.at)
                    ] }, `${q.fromNodeId}-${q.at}-${de}`))
                  }
                )
              ] })
            }
          ),
          Z && /* @__PURE__ */ t(nt, { title: "Resumed", className: "mb-4", "data-testid": "resume-toast", children: Z }),
          l.error && /* @__PURE__ */ o(nt, { title: "Run failed:", className: "mb-4", children: [
            l.error.message,
            l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o("span", { className: "ml-2 text-[11px] text-danger-fg", children: [
              "at node ",
              l.error.nodeId.slice(0, 8)
            ] }),
            l.status === "failed" && l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ t("div", { className: "mt-2", children: /* @__PURE__ */ t(
              Pe,
              {
                onClick: () => R(l.error.nodeId),
                disabled: A !== null,
                "data-testid": "resume-from-here-button",
                title: `Resume this run from "${l.error.nodeId}" using its accumulated upstream context`,
                children: A === l.error.nodeId ? "Resuming…" : "↻ Resume from here"
              }
            ) })
          ] }),
          /* @__PURE__ */ t(
            "div",
            {
              role: "tablist",
              "aria-label": "Run detail view",
              className: "flex gap-1 mb-3 border-b border-border",
              "data-testid": "run-replay-tabs",
              children: [
                { id: "steps", label: "Steps" },
                { id: "log", label: "Executor Log" }
              ].map((q) => {
                const de = x === q.id;
                return /* @__PURE__ */ t(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": de,
                    onClick: () => m(q.id),
                    "data-testid": `run-replay-tab-${q.id}`,
                    className: I(
                      "font-[inherit] text-[13px] font-semibold py-1.5 px-3.5 border-none bg-transparent cursor-pointer -mb-px",
                      de ? "text-text-primary border-b-2 border-b-primary" : "text-text-tertiary border-b-2 border-b-transparent"
                    ),
                    children: q.label
                  },
                  q.id
                );
              })
            }
          ),
          x === "steps" ? (
            /* Threaded step list with fork nesting */
            /* @__PURE__ */ t(
              Yp,
              {
                steps: l.steps,
                nodeDataMap: u,
                edges: s?.edges,
                onRetryFromStep: D,
                onResumeFromStep: l.status === "failed" ? R : void 0
              }
            )
          ) : /* @__PURE__ */ t("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ t(
            pu,
            {
              pipelineId: e,
              runId: n,
              onStepClick: b
            }
          ) })
        ] }) })
      ]
    }
  );
}
function mu(e) {
  return e == null ? "—" : `${e > 0 ? "+" : (e < 0, "")}${De(Math.abs(e))}`.replace(/^(\+|-)?/, e === 0 ? "" : e > 0 ? "+" : "-");
}
function hu(e) {
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
function fu(e, n) {
  if (!e) return n;
  const r = e.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function gu(e, n) {
  if (!e) return !1;
  const r = e.nodes.find((a) => a.id === n);
  return !!r && r.data.type === "condition";
}
function $r(e) {
  if (!e) return;
  const n = e.output;
  if (n && typeof n == "object" && "result" in n)
    return n.result ? "true" : "false";
}
function xu(e, n) {
  const r = (h) => h.split(/(\s+)/).filter((g) => g.length > 0), a = r(e), i = r(n), s = a.length, d = i.length, c = Array.from({ length: s + 1 }, () => new Array(d + 1).fill(0));
  for (let h = s - 1; h >= 0; h--)
    for (let g = d - 1; g >= 0; g--)
      a[h] === i[g] ? c[h][g] = c[h + 1][g + 1] + 1 : c[h][g] = Math.max(c[h + 1][g], c[h][g + 1]);
  const l = [], p = (h, g) => {
    const x = l[l.length - 1];
    x && x.type === h ? x.text += g : l.push({ type: h, text: g });
  };
  let u = 0, f = 0;
  for (; u < s && f < d; )
    a[u] === i[f] ? (p("eq", a[u]), u++, f++) : c[u + 1][f] >= c[u][f + 1] ? (p("del", a[u]), u++) : (p("add", i[f]), f++);
  for (; u < s; )
    p("del", a[u++]);
  for (; f < d; )
    p("add", i[f++]);
  return l;
}
function bu(e, n, r) {
  const a = /* @__PURE__ */ new Set(), i = [];
  if (r)
    for (const s of r.nodes)
      (e.steps[s.id] || n.steps[s.id]) && (i.push(s.id), a.add(s.id));
  for (const s of [...Object.keys(e.steps), ...Object.keys(n.steps)])
    a.has(s) || (i.push(s), a.add(s));
  return i.map((s) => {
    const d = e.steps[s], c = n.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, f = !!d && !!c && d.status !== c.status;
    let h = !1;
    l != null && p != null && l > 0 && (h = Math.abs(p - l) / l > 0.5);
    const g = gu(r, s), x = g ? $r(d) : void 0, m = g ? $r(c) : void 0, w = g && x !== void 0 && m !== void 0 && x !== m;
    return {
      nodeId: s,
      name: fu(r, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: f,
      durationLarge: h,
      branchDiffers: w,
      isLlm: !!(d?.llm || c?.llm),
      isCondition: g,
      branchA: x,
      branchB: m
    };
  });
}
function yu(e) {
  if (e.statusDiffers) return "bg-danger-bg";
  if (e.branchDiffers) return "bg-info-bg";
  if (e.durationLarge) return "bg-warning-bg";
}
function Ar({
  step: e,
  branch: n,
  isCondition: r
}) {
  if (!e)
    return /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" });
  const a = hu(e.status);
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ t(le, { tone: a, children: e.status }),
      /* @__PURE__ */ t("span", { className: "font-mono text-text-secondary", children: De(e.durationMs) }),
      r && n ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        "(",
        n === "true" ? "T" : "F",
        ")"
      ] }) : null
    ] }),
    e.llm ? /* @__PURE__ */ o("div", { className: "font-mono text-[11px] text-text-tertiary", children: [
      e.llm.tokensIn,
      "→",
      e.llm.tokensOut,
      "tok"
    ] }) : null,
    e.error ? /* @__PURE__ */ t("div", { className: "text-[11px] text-danger-fg", title: e.error, children: e.error.length > 60 ? `${e.error.slice(0, 60)}…` : e.error }) : null
  ] });
}
function vu({ a: e, b: n }) {
  const r = W(() => xu(e, n), [e, n]);
  return /* @__PURE__ */ t(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: r.map((a, i) => a.type === "eq" ? /* @__PURE__ */ t("span", { children: a.text }, i) : a.type === "add" ? /* @__PURE__ */ t("span", { "data-diff": "add", className: "bg-success-bg text-success-fg", children: a.text }, i) : /* @__PURE__ */ t("span", { "data-diff": "del", className: "bg-danger-bg text-danger-fg line-through", children: a.text }, i))
    }
  );
}
function wu({ row: e }) {
  const n = e.a?.llm, r = e.b?.llm, a = n && r ? r.tokensIn + r.tokensOut - (n.tokensIn + n.tokensOut) : void 0, i = yu(e);
  return /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ o("tr", { "data-testid": `run-compare-row-${e.nodeId}`, className: i, children: [
      /* @__PURE__ */ o("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: [
        /* @__PURE__ */ t("div", { className: "font-semibold text-text-primary", children: e.name }),
        /* @__PURE__ */ t("div", { className: "font-mono text-[11px] text-text-tertiary", children: e.nodeId })
      ] }),
      /* @__PURE__ */ t("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ t(Ar, { step: e.a, branch: e.branchA, isCondition: e.isCondition }) }),
      /* @__PURE__ */ t("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ t(Ar, { step: e.b, branch: e.branchB, isCondition: e.isCondition }) }),
      /* @__PURE__ */ o(
        "td",
        {
          className: I("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", i),
          "data-testid": `run-compare-delta-${e.nodeId}`,
          children: [
            e.branchDiffers ? /* @__PURE__ */ t("span", { className: "font-semibold text-info-fg", children: "different branch!" }) : e.statusDiffers ? /* @__PURE__ */ t("span", { className: "font-semibold text-danger-fg", children: "status differs" }) : e.durationDelta != null ? /* @__PURE__ */ t("span", { className: e.durationLarge ? "text-warning-fg" : "text-text-secondary", children: mu(e.durationDelta) }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "—" }),
            a != null && a !== 0 ? /* @__PURE__ */ o("div", { className: "mt-0.5 text-[11px] text-text-tertiary", children: [
              a > 0 ? "+" : "",
              a,
              "tok"
            ] }) : null
          ]
        }
      )
    ] }),
    e.isLlm && (n || r) ? /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t("td", { className: "border-b border-border p-0", colSpan: 4, children: /* @__PURE__ */ o("details", { className: "bg-surface-inset px-3.5 py-2.5", children: [
      /* @__PURE__ */ t(
        "summary",
        {
          className: "cursor-pointer text-xs font-semibold text-text-secondary",
          "data-testid": `run-compare-llm-toggle-${e.nodeId}`,
          children: "LLM response diff"
        }
      ),
      /* @__PURE__ */ o("div", { className: "mt-2 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run A" }),
          /* @__PURE__ */ t(
            "pre",
            {
              "data-testid": `run-compare-llm-a-${e.nodeId}`,
              className: "m-0 whitespace-pre-wrap break-words rounded-md border border-border bg-surface p-2.5 text-xs",
              children: n?.response ?? "(no response)"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run B" }),
          /* @__PURE__ */ t(
            "pre",
            {
              "data-testid": `run-compare-llm-b-${e.nodeId}`,
              className: "m-0 whitespace-pre-wrap break-words rounded-md border border-border bg-surface p-2.5 text-xs",
              children: r?.response ?? "(no response)"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "mt-2.5", children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Word-level diff" }),
        /* @__PURE__ */ t("div", { className: "mt-1.5", children: /* @__PURE__ */ t(
          vu,
          {
            a: n?.response ?? "",
            b: r?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function Nu({ runA: e, runB: n, def: r }) {
  const a = W(() => bu(e, n, r), [e, n, r]);
  return /* @__PURE__ */ o(
    "table",
    {
      className: "w-full overflow-hidden rounded-lg border border-border bg-surface text-[13px]",
      "data-testid": "run-compare-table",
      children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Step" }),
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run A" }),
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run B" }),
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Δ" })
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: a.map((i) => /* @__PURE__ */ t(wu, { row: i }, i.nodeId)) })
      ]
    }
  );
}
function ku(e) {
  return e == null ? "—" : `${e > 0 ? "+" : (e < 0, "")}${De(Math.abs(e))}`.replace(/^(\+|-)?/, e === 0 ? "" : e > 0 ? "+" : "-");
}
function Cu(e) {
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
function Iu(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Rr(e, n) {
  const r = Object.values(e.steps).filter((a) => !!a.llm).map((a) => ({
    model: n.get(a.nodeId),
    tokensIn: a.llm?.tokensIn ?? 0,
    tokensOut: a.llm?.tokensOut ?? 0
  }));
  return Bt(Nt(r).total);
}
function Pr({
  label: e,
  run: n,
  cost: r,
  testIdPrefix: a
}) {
  const i = Cu(n.status);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
      "data-testid": `${a}-summary`,
      children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: e }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-tertiary", children: n.id.slice(0, 8) }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "text-text-secondary", children: ft(n.startedAt) })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t(le, { tone: i, children: n.status }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono", children: De(n.durationMs) }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono", "data-testid": `${a}-cost`, children: r })
        ] })
      ]
    }
  );
}
function th() {
  const { pipelineId: e, runIdA: n, runIdB: r } = xt(), a = Ve(), i = W(
    () => e ? ct(e) : null,
    [e]
  ), s = W(
    () => e && n ? qt(e, n) : null,
    [e, n]
  ), d = W(
    () => e && r ? qt(e, r) : null,
    [e, r]
  ), c = W(() => Iu(i), [i]);
  if (!e || !n || !r)
    return /* @__PURE__ */ t(bt, { to: "/pipelines", replace: !0 });
  if (!i)
    return /* @__PURE__ */ t("div", { className: "p-8", children: /* @__PURE__ */ t(
      qe,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => a("/pipelines")
      }
    ) });
  if (!s || !d)
    return /* @__PURE__ */ t("div", { className: "p-8", "data-testid": "run-compare-missing", children: /* @__PURE__ */ t(
      qe,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable — they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => a(`/pipelines/${e}/runs`)
      }
    ) });
  const l = (d.durationMs ?? 0) - (s.durationMs ?? 0), p = Rr(s, c), u = Rr(d, c), f = (/* @__PURE__ */ new Set([
    ...Object.keys(s.steps),
    ...Object.keys(d.steps)
  ])).size;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-4 p-6 text-text-primary", "data-testid": "run-compare", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => a(`/pipelines/${e}/runs`),
          className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
          children: [
            "← ",
            i.name
          ]
        }
      ),
      /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "/" }),
      /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: "Compare runs" }),
      /* @__PURE__ */ o(
        "span",
        {
          className: "ml-auto text-xs text-text-tertiary",
          "data-testid": "run-compare-cost-delta",
          children: [
            p,
            " → ",
            u
          ]
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ t(Pr, { label: "Run A", run: s, cost: p, testIdPrefix: "run-a" }),
      /* @__PURE__ */ t(Pr, { label: "Run B", run: d, cost: u, testIdPrefix: "run-b" })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
        "data-testid": "run-compare-delta",
        children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Δ duration" }),
          /* @__PURE__ */ t("span", { className: "font-mono text-[13px]", children: ku(l) }),
          /* @__PURE__ */ t("span", { className: "flex-1" }),
          /* @__PURE__ */ o("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
            f,
            " step",
            f === 1 ? "" : "s",
            " compared"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ t(Nu, { runA: s, runB: d, def: i })
  ] });
}
function Su(e) {
  return e === 0 ? "0ms" : `${e > 0 ? "+" : "-"}${De(Math.abs(e))}`;
}
function Dr(e) {
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
function Tu({
  runA: e,
  runB: n,
  costA: r,
  costB: a
}) {
  const i = e.durationMs ?? 0, d = (n.durationMs ?? 0) - i;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ o(
        "div",
        {
          className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
          "data-testid": "diff-run-a-summary",
          children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run A" }),
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-tertiary", children: e.id.slice(0, 8) }),
              /* @__PURE__ */ t(le, { tone: Dr(e.status), children: e.status })
            ] }),
            /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary", children: ft(e.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              De(e.durationMs),
              " | ",
              r
            ] }),
            /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary", children: [
              "Trigger: ",
              e.triggeredBy.userId ?? e.triggeredBy.triggerType
            ] })
          ]
        }
      ),
      /* @__PURE__ */ o(
        "div",
        {
          className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
          "data-testid": "diff-run-b-summary",
          children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run B" }),
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-tertiary", children: n.id.slice(0, 8) }),
              /* @__PURE__ */ t(le, { tone: Dr(n.status), children: n.status })
            ] }),
            /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary", children: ft(n.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              De(n.durationMs),
              " | ",
              a
            ] }),
            /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary", children: [
              "Trigger: ",
              n.triggeredBy.userId ?? n.triggeredBy.triggerType
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "flex items-center gap-4 rounded-md bg-surface-inset px-3.5 py-2.5",
        "data-testid": "diff-duration-delta",
        children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Duration delta" }),
          /* @__PURE__ */ t(
            "span",
            {
              className: I(
                "font-mono text-sm font-bold",
                d === 0 ? "text-text-secondary" : d < 0 ? "text-success-fg" : "text-danger-fg"
              ),
              children: Su(d)
            }
          ),
          /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", children: [
            "(",
            d < 0 ? "faster" : d > 0 ? "slower" : "same",
            " in Run B)"
          ] })
        ]
      }
    )
  ] });
}
function $u(e) {
  return e === 0 ? "0ms" : `${e > 0 ? "+" : "-"}${De(Math.abs(e))}`;
}
function Mr(e) {
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
function Au(e, n) {
  if (!e) return n;
  const r = e.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Ru(e, n, r) {
  const a = /* @__PURE__ */ new Set(), i = [];
  if (r)
    for (const s of r.nodes)
      (e.steps[s.id] || n.steps[s.id]) && (i.push(s.id), a.add(s.id));
  for (const s of [...Object.keys(e.steps), ...Object.keys(n.steps)])
    a.has(s) || (i.push(s), a.add(s));
  return i.map((s) => {
    const d = e.steps[s], c = n.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, f = !!d && !!c && d.status !== c.status, h = !!d && !c, g = !d && !!c, x = d?.llm ? d.llm.tokensIn + d.llm.tokensOut : void 0, m = c?.llm ? c.llm.tokensIn + c.llm.tokensOut : void 0, w = x != null && m != null ? m - x : void 0;
    return {
      nodeId: s,
      name: Au(r, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: f,
      onlyInA: h,
      onlyInB: g,
      tokenDelta: w
    };
  });
}
function Pu({ runA: e, runB: n, def: r }) {
  const a = W(() => Ru(e, n, r), [e, n, r]);
  return /* @__PURE__ */ o("table", { className: "w-full border-collapse text-[13px]", children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Step" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run A" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run B" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Delta" })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((i) => /* @__PURE__ */ o(
      "tr",
      {
        className: I(
          i.onlyInA || i.onlyInB ? "bg-warning-bg" : i.statusDiffers ? "bg-danger-bg" : void 0
        ),
        "data-testid": `diff-step-row-${i.nodeId}`,
        children: [
          /* @__PURE__ */ o("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: [
            /* @__PURE__ */ t("div", { className: "font-semibold", children: i.name }),
            /* @__PURE__ */ t("div", { className: "font-mono text-[10px] text-text-tertiary", children: i.nodeId }),
            i.onlyInA && /* @__PURE__ */ t(le, { tone: "warning", size: "xs", children: "only in A" }),
            i.onlyInB && /* @__PURE__ */ t(le, { tone: "warning", size: "xs", children: "only in B" })
          ] }),
          /* @__PURE__ */ t("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: i.a ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ t(le, { tone: Mr(i.a.status), children: i.a.status }),
            /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: De(i.a.durationMs) }),
            i.a.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              i.a.llm.tokensIn,
              " in / ",
              i.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ t("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: i.b ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ t(le, { tone: Mr(i.b.status), children: i.b.status }),
            /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: De(i.b.durationMs) }),
            i.b.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              i.b.llm.tokensIn,
              " in / ",
              i.b.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ o("td", { className: "border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", children: [
            i.statusDiffers && /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-danger-fg", children: "status differs" }),
            i.durationDelta != null && /* @__PURE__ */ t(
              "div",
              {
                className: I(
                  "text-xs",
                  i.durationDelta === 0 ? "text-text-tertiary" : i.durationDelta < 0 ? "text-success-fg" : "text-danger-fg"
                ),
                children: $u(i.durationDelta)
              }
            ),
            i.tokenDelta != null && i.tokenDelta !== 0 && /* @__PURE__ */ o(
              "div",
              {
                className: I(
                  "mt-0.5 text-[10px]",
                  i.tokenDelta < 0 ? "text-success-fg" : "text-danger-fg"
                ),
                children: [
                  i.tokenDelta > 0 ? "+" : "",
                  i.tokenDelta,
                  " tok"
                ]
              }
            ),
            i.durationDelta == null && !i.statusDiffers && /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "--" })
          ] })
        ]
      },
      i.nodeId
    )) })
  ] });
}
function Du(e, n) {
  if (!e) return n;
  const r = e.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Vt(e, n = "", r = 0) {
  const a = /* @__PURE__ */ new Map();
  if (r > 6 || e == null)
    return a.set(n || "(root)", String(e)), a;
  if (typeof e != "object")
    return a.set(n || "(root)", JSON.stringify(e)), a;
  if (Array.isArray(e)) {
    if (e.length === 0)
      a.set(n || "(root)", "[]");
    else
      for (let s = 0; s < e.length; s++) {
        const d = n ? `${n}.${s}` : String(s);
        for (const [c, l] of Vt(e[s], d, r + 1))
          a.set(c, l);
      }
    return a;
  }
  const i = Object.entries(e);
  if (i.length === 0)
    a.set(n || "(root)", "{}");
  else
    for (const [s, d] of i) {
      const c = n ? `${n}.${s}` : s;
      for (const [l, p] of Vt(d, c, r + 1))
        a.set(l, p);
    }
  return a;
}
function yo(e, n) {
  const r = Vt(e), a = Vt(n), i = /* @__PURE__ */ new Set([...r.keys(), ...a.keys()]), s = [];
  for (const c of i) {
    const l = r.get(c), p = a.get(c);
    l === void 0 ? s.push({ key: c, type: "added", valueB: p }) : p === void 0 ? s.push({ key: c, type: "removed", valueA: l }) : l !== p ? s.push({ key: c, type: "changed", valueA: l, valueB: p }) : s.push({ key: c, type: "unchanged", valueA: l, valueB: p });
  }
  const d = {
    changed: 0,
    added: 1,
    removed: 2,
    unchanged: 3
  };
  return s.sort((c, l) => {
    const p = d[c.type] - d[l.type];
    return p !== 0 ? p : c.key.localeCompare(l.key);
  }), s;
}
const Mu = {
  added: "bg-success-bg text-success-fg",
  removed: "bg-danger-bg text-danger-fg line-through",
  changed: "bg-warning-bg text-warning-fg",
  unchanged: "text-text-tertiary"
};
function Eu({
  nodeId: e,
  name: n,
  outputA: r,
  outputB: a
}) {
  const [i, s] = S(!1), d = W(() => yo(r, a), [r, a]), c = d.filter((l) => l.type !== "unchanged").length;
  return c === 0 ? /* @__PURE__ */ o("div", { className: "rounded-md bg-surface-inset px-3 py-2", children: [
    /* @__PURE__ */ t("span", { className: "text-xs font-semibold", children: n }),
    /* @__PURE__ */ t("span", { className: "ml-2 text-[11px] text-text-tertiary", children: "(no differences)" })
  ] }) : /* @__PURE__ */ o(
    "div",
    {
      className: "overflow-hidden rounded-md border border-border",
      "data-testid": `diff-output-${e}`,
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: "flex cursor-pointer items-center gap-2 bg-surface-inset px-3 py-2",
            onClick: () => s(!i),
            children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: i ? "▼" : "▶" }),
              /* @__PURE__ */ t("span", { className: "text-xs font-semibold", children: n }),
              /* @__PURE__ */ t("span", { className: "font-mono text-[10px] text-text-tertiary", children: e }),
              /* @__PURE__ */ o(le, { tone: "warning", size: "xs", className: "ml-auto", children: [
                c,
                " difference",
                c === 1 ? "" : "s"
              ] })
            ]
          }
        ),
        i && /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5 px-3 py-2", children: d.filter((l) => l.type !== "unchanged").map((l, p) => /* @__PURE__ */ o(
          "div",
          {
            className: I(
              "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
              Mu[l.type]
            ),
            children: [
              /* @__PURE__ */ o("span", { className: "min-w-[120px] shrink-0 font-semibold", children: [
                l.type === "added" && "+ ",
                l.type === "removed" && "- ",
                l.type === "changed" && "~ ",
                l.key
              ] }),
              l.type === "changed" && /* @__PURE__ */ o("span", { children: [
                /* @__PURE__ */ t("span", { className: "line-through opacity-70", children: l.valueA }),
                " -> ",
                /* @__PURE__ */ t("span", { className: "font-semibold", children: l.valueB })
              ] }),
              l.type === "added" && /* @__PURE__ */ t("span", { children: l.valueB }),
              l.type === "removed" && /* @__PURE__ */ t("span", { children: l.valueA })
            ]
          },
          `${l.key}-${p}`
        )) })
      ]
    }
  );
}
function Ou({ runA: e, runB: n, def: r }) {
  const a = W(() => {
    const i = /* @__PURE__ */ new Set(), s = [];
    if (r)
      for (const d of r.nodes) {
        const c = e.steps[d.id]?.output != null, l = n.steps[d.id]?.output != null;
        (c || l) && (s.push(d.id), i.add(d.id));
      }
    for (const d of [...Object.keys(e.steps), ...Object.keys(n.steps)]) {
      if (i.has(d)) continue;
      const c = e.steps[d]?.output != null, l = n.steps[d]?.output != null;
      (c || l) && (s.push(d), i.add(d));
    }
    return s;
  }, [e, n, r]);
  return a.length === 0 ? /* @__PURE__ */ t("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "No step outputs to compare." }) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-3", children: a.map((i) => /* @__PURE__ */ t(
    Eu,
    {
      nodeId: i,
      name: Du(r, i),
      outputA: e.steps[i]?.output,
      outputB: n.steps[i]?.output
    },
    i
  )) });
}
function _u(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Er(e, n) {
  const r = Object.values(e.steps).filter((a) => !!a.llm).map((a) => ({
    model: n.get(a.nodeId),
    tokensIn: a.llm?.tokensIn ?? 0,
    tokensOut: a.llm?.tokensOut ?? 0
  }));
  return Bt(Nt(r).total);
}
function zt({
  title: e,
  defaultOpen: n = !0,
  badge: r,
  children: a,
  testId: i
}) {
  const [s, d] = S(n);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "overflow-hidden rounded-lg border border-border bg-surface",
      "data-testid": i,
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: "flex cursor-pointer select-none items-center gap-2 border-b border-border bg-surface-inset px-4 py-3",
            onClick: () => d(!s),
            role: "button",
            tabIndex: 0,
            onKeyDown: (c) => {
              (c.key === "Enter" || c.key === " ") && (c.preventDefault(), d(!s));
            },
            "aria-expanded": s,
            children: [
              /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary", children: s ? "▼" : "▶" }),
              /* @__PURE__ */ t("span", { className: "text-[13px] font-bold text-text-primary", children: e }),
              r && /* @__PURE__ */ t(le, { tone: "info", className: "ml-auto", children: r })
            ]
          }
        ),
        s && /* @__PURE__ */ t("div", { className: "p-4", children: a })
      ]
    }
  );
}
const Lu = {
  added: "bg-success-bg text-success-fg",
  removed: "bg-danger-bg text-danger-fg line-through",
  changed: "bg-warning-bg text-warning-fg",
  unchanged: "text-text-tertiary"
};
function Bu({
  runA: e,
  runB: n
}) {
  const r = W(
    () => yo(e.context, n.context),
    [e.context, n.context]
  ), a = r.filter((i) => i.type !== "unchanged").length;
  return /* @__PURE__ */ t(
    zt,
    {
      title: "Context evolution diff",
      defaultOpen: !1,
      badge: a > 0 ? `${a} difference${a === 1 ? "" : "s"}` : void 0,
      testId: "diff-context-section",
      children: a === 0 ? /* @__PURE__ */ t("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "Final contexts are identical." }) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: r.map((i, s) => /* @__PURE__ */ o(
        "div",
        {
          className: I(
            "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
            Lu[i.type]
          ),
          children: [
            /* @__PURE__ */ o("span", { className: "min-w-[160px] shrink-0 font-semibold", children: [
              i.type === "added" && "+ ",
              i.type === "removed" && "- ",
              i.type === "changed" && "~ ",
              i.type === "unchanged" && "  ",
              i.key
            ] }),
            i.type === "changed" && /* @__PURE__ */ o("span", { children: [
              /* @__PURE__ */ t("span", { className: "line-through opacity-70", children: i.valueA }),
              " -> ",
              /* @__PURE__ */ t("span", { className: "font-semibold", children: i.valueB })
            ] }),
            i.type === "added" && /* @__PURE__ */ t("span", { children: i.valueB }),
            i.type === "removed" && /* @__PURE__ */ t("span", { children: i.valueA }),
            i.type === "unchanged" && /* @__PURE__ */ t("span", { className: "opacity-50", children: i.valueA })
          ]
        },
        `${i.key}-${s}`
      )) })
    }
  );
}
function Uu({ pipelineId: e, runIdA: n, runIdB: r }) {
  const a = Ve(), i = W(
    () => ct(e),
    [e]
  ), s = W(
    () => qt(e, n),
    [e, n]
  ), d = W(
    () => qt(e, r),
    [e, r]
  ), c = W(() => _u(i), [i]);
  if (!i)
    return /* @__PURE__ */ t("div", { className: "p-8", children: /* @__PURE__ */ t(
      qe,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => a("/pipelines")
      }
    ) });
  if (!s || !d)
    return /* @__PURE__ */ t("div", { className: "p-8", "data-testid": "diff-run-missing", children: /* @__PURE__ */ t(
      qe,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable -- they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => a(`/pipelines/${e}/runs`)
      }
    ) });
  const l = Er(s, c), p = Er(d, c);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "mx-auto flex w-full max-w-[1400px] flex-col gap-5 p-6 text-text-primary",
      "data-testid": "pipeline-run-diff",
      children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ o(
            "button",
            {
              type: "button",
              onClick: () => a(`/pipelines/${e}/runs`),
              className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
              children: [
                "← ",
                i.name
              ]
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "/" }),
          /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: "Diff view" }),
          /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
            n.slice(0, 8),
            " vs ",
            r.slice(0, 8)
          ] })
        ] }),
        /* @__PURE__ */ t(zt, { title: "Summary", testId: "diff-summary-section", children: /* @__PURE__ */ t(
          Tu,
          {
            runA: s,
            runB: d,
            costA: l,
            costB: p
          }
        ) }),
        /* @__PURE__ */ t(
          zt,
          {
            title: "Step-by-step comparison",
            badge: `${Object.keys(s.steps).length + Object.keys(d.steps).length > 0 ? "steps" : "0 steps"}`,
            testId: "diff-steps-section",
            children: /* @__PURE__ */ t(Pu, { runA: s, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ t(
          zt,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ t(Ou, { runA: s, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ t(Bu, { runA: s, runB: d })
      ]
    }
  );
}
function nh() {
  const { pipelineId: e } = xt(), [n] = Ht(), r = n.get("a"), a = n.get("b");
  return !e || !r || !a ? /* @__PURE__ */ t(bt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t(Uu, { pipelineId: e, runIdA: r, runIdB: a });
}
function rh() {
  const e = Ve(), [n, r] = Ht(), [a, i] = S([]), { runs: s } = yt();
  oe(() => {
    let b = !1;
    return (async () => {
      const N = Fn(), y = [];
      await Promise.all(
        N.map(async (k) => {
          try {
            const { runs: C } = await qr(k.id, { limit: 50 });
            if (C.length > 0) {
              for (const T of C)
                T.id && y.push({ ...T, pipelineName: k.name });
              return;
            }
          } catch {
          }
          for (const C of Ft(k.id))
            C.id && y.push({ ...C, pipelineName: k.name });
        })
      ), !b && (y.sort((k, C) => C.startedAt.localeCompare(k.startedAt)), i(y));
    })(), () => {
      b = !0;
    };
  }, []);
  const d = W(() => {
    const b = new Map(Fn().map((k) => [k.id, k.name])), N = new Set(a.map((k) => k.id)), y = [];
    for (const [k, C] of Object.entries(s))
      N.has(k) || C.pipelineId && y.push({
        ...C,
        pipelineName: b.get(C.pipelineId) ?? `Pipeline ${C.pipelineId.slice(0, 8)}`
      });
    return y.length === 0 ? a : [...y, ...a].sort((k, C) => C.startedAt.localeCompare(k.startedAt));
  }, [a, s]), { query: c, statuses: l, triggerKinds: p, range: u } = W(
    () => xo(n),
    [n]
  ), f = (b, N) => {
    const y = new URLSearchParams(n);
    N ? y.set(b, N) : y.delete(b), r(y, { replace: !0 });
  }, h = (b) => {
    const N = new Set(l);
    N.has(b) ? N.delete(b) : N.add(b), f("status", N.size === 0 ? null : Array.from(N).join(","));
  }, g = (b) => {
    const N = new Set(p);
    N.has(b) ? N.delete(b) : N.add(b), f("trigger", N.size === 0 ? null : Array.from(N).join(","));
  }, x = (b) => {
    f("range", b === "7d" ? null : b);
  }, m = (b) => {
    f("q", b.length === 0 ? null : b);
  }, w = W(
    () => go(d, { query: c, statuses: l, triggerKinds: p, range: u }),
    [d, c, l, p, u]
  ), v = W(() => {
    const b = {};
    for (const N of w) {
      const y = Object.values(N.steps).filter((C) => !!C.llm).map((C) => ({
        model: void 0,
        tokensIn: C.llm?.tokensIn ?? 0,
        tokensOut: C.llm?.tokensOut ?? 0
      })), k = Nt(y);
      k.total.totalCostUsd > 0 && (b[N.id] = Bt(k.total));
    }
    return b;
  }, [w]);
  return /* @__PURE__ */ o("div", { "data-testid": "all-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ t("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Runs" }),
      /* @__PURE__ */ o("span", { className: "text-[13px] text-text-tertiary", children: [
        w.length,
        " run",
        w.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ t(
      bo,
      {
        query: c,
        onQueryChange: m,
        statuses: l,
        onStatusToggle: h,
        triggerKinds: p,
        onTriggerToggle: g,
        range: u,
        onRangeChange: x,
        onClearFilters: () => r(new URLSearchParams(), { replace: !0 })
      }
    ),
    w.length === 0 ? /* @__PURE__ */ t(
      qe,
      {
        icon: "📋",
        title: "No runs yet",
        body: "Run a pipeline to see execution history here."
      }
    ) : /* @__PURE__ */ t("div", { className: "overflow-x-auto", children: /* @__PURE__ */ o("table", { className: "w-full border-collapse text-[13px]", children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Pipeline" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Run ID" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Status" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Trigger" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Started" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right", children: "Duration" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right", children: "Cost" })
      ] }) }),
      /* @__PURE__ */ t("tbody", { children: w.map((b) => /* @__PURE__ */ o(
        "tr",
        {
          onClick: () => e(`/pipelines/${b.pipelineId}/runs/${b.id}`),
          className: "border-b border-border cursor-pointer hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-medium", children: b.pipelineName }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: b.id.slice(0, 11) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ t(le, { tone: Ln(b.status).tone, size: "sm", children: b.status }) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: b.triggerType ?? b.triggeredBy?.triggerType }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: Pd(b.startedAt) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: b.completedAt ? De(new Date(b.completedAt).getTime() - new Date(b.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: v[b.id] ?? "—" })
          ]
        },
        b.id
      )) })
    ] }) })
  ] });
}
function vo(e) {
  let n = 0, r = 0;
  for (const a of Object.values(e.steps ?? {}))
    a.llm && (n += a.llm.tokensIn ?? 0, r += a.llm.tokensOut ?? 0);
  return { tokensIn: n, tokensOut: r };
}
function ju(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function zu(e, n) {
  const r = [];
  for (const a of Object.values(e.steps ?? {}))
    a.llm && r.push({
      model: n.get(a.nodeId),
      tokensIn: a.llm.tokensIn,
      tokensOut: a.llm.tokensOut
    });
  return Nt(r).total.totalCostUsd;
}
function Or(e, n) {
  if (e.length === 0) return 0;
  const r = Math.min(e.length - 1, Math.floor(e.length * n));
  return e[r];
}
function _r(e) {
  return e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Lr(e) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? `$${n.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function Fu(e) {
  return e.slice(0, 8);
}
function qu(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Wu(e, n) {
  const r = e.length;
  let a = 0, i = 0, s = 0;
  const d = [];
  let c = 0, l = 0, p = 0;
  const u = /* @__PURE__ */ new Map();
  for (const m of e) {
    m.status === "completed" ? a++ : m.status === "failed" ? i++ : m.status === "cancelled" && s++, typeof m.durationMs == "number" && m.durationMs > 0 && d.push(m.durationMs);
    const w = vo(m);
    if (c += w.tokensIn, l += w.tokensOut, p += zu(m, n), m.error?.message) {
      const v = m.error.message.slice(0, 48), b = u.get(v);
      b ? (b.count += 1, m.startedAt > b.lastSeenAt && (b.lastSeenAt = m.startedAt, b.exampleRunId = m.id)) : u.set(v, { count: 1, lastSeenAt: m.startedAt, exampleRunId: m.id });
    }
  }
  d.sort((m, w) => m - w);
  const f = Or(d, 0.5), h = Or(d, 0.95), g = r === 0 ? 0 : Math.round(a / r * 100), x = [...u.entries()].map(([m, w]) => ({ key: m, count: w.count, lastSeenAt: w.lastSeenAt, exampleRunId: w.exampleRunId })).sort((m, w) => w.count - m.count).slice(0, 5);
  return {
    totalCount: r,
    completedCount: a,
    failedCount: i,
    cancelledCount: s,
    successRatePct: g,
    medianMs: f,
    p95Ms: h,
    tokensIn: c,
    tokensOut: l,
    tokensPerRun: r === 0 ? 0 : Math.round((c + l) / r),
    totalCost: p,
    costPerRun: r === 0 ? 0 : p / r,
    failureBreakdown: x
  };
}
function Vu(e) {
  return e >= 90 ? "var(--color-success)" : e >= 70 ? "var(--color-warning)" : "var(--color-danger)";
}
function Ku(e) {
  const n = [...e].sort((l, p) => l.startedAt.localeCompare(p.startedAt)), r = [], a = [], i = [];
  let s = 0, d = 0, c = 0;
  for (const l of n) {
    const p = new Date(l.startedAt).getTime();
    l.status === "completed" ? s += 1 : l.status === "failed" ? d += 1 : l.status === "cancelled" && (c += 1), r.push({ x: p, y: s }), a.push({ x: p, y: d }), i.push({ x: p, y: c });
  }
  return [
    { label: "Completed", data: r, color: "var(--color-success)" },
    { label: "Failed", data: a, color: "var(--color-danger)" },
    { label: "Cancelled", data: i, color: "var(--color-border-field)" }
  ];
}
function Hu(e, n) {
  const a = [...e].sort((s, d) => s.startedAt.localeCompare(d.startedAt)).filter((s) => typeof s.durationMs == "number" && s.durationMs > 0).map((s) => ({ x: new Date(s.startedAt).getTime(), y: s.durationMs })), i = a.map((s) => ({ x: s.x, y: n }));
  return [
    { label: "Duration (ms)", data: a, color: "var(--color-primary)" },
    { label: "p50", data: i, color: "var(--color-text-tertiary)" }
  ];
}
function Ju(e) {
  const n = [...e].sort((i, s) => i.startedAt.localeCompare(s.startedAt)), r = [], a = [];
  for (const i of n) {
    const s = new Date(i.startedAt).getTime(), { tokensIn: d, tokensOut: c } = vo(i);
    r.push({ x: s, y: d }), a.push({ x: s, y: c });
  }
  return [
    { label: "Tokens in", data: r, color: "var(--color-primary)" },
    { label: "Tokens out", data: a, color: "var(--color-success)" }
  ];
}
function oh() {
  const { pipelineId: e } = xt(), n = Ve(), [r, a] = S(null), [i, s] = S([]), [d, c] = S("50");
  oe(() => {
    e && (a(ct(e)), s(Ft(e)));
  }, [e]);
  const l = W(() => {
    if (d === "all") return i;
    const m = Number(d);
    return i.slice(0, m);
  }, [i, d]), p = W(() => ju(r), [r]), u = W(() => Wu(l, p), [l, p]), f = W(
    () => Pp(l, r).filter((m) => m.totalCostUsd > 0 || m.stepCount > 0),
    [l, r]
  ), h = W(() => Ep(i, r, 30), [i, r]), g = W(
    () => [
      {
        label: "Daily spend",
        data: h.map((m) => ({ x: m.ts, y: m.totalCostUsd })),
        color: "var(--color-primary)"
      }
    ],
    [h]
  );
  if (!e) return /* @__PURE__ */ t(bt, { to: "/pipelines", replace: !0 });
  if (!r)
    return /* @__PURE__ */ t("div", { className: "p-8", children: /* @__PURE__ */ t(
      qe,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => n("/pipelines")
      }
    ) });
  const x = l.length > 0;
  return /* @__PURE__ */ o("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => n(`/pipelines/${e}`),
          className: "bg-transparent border-none text-primary cursor-pointer text-[13px] p-0",
          children: [
            "← ",
            r.name
          ]
        }
      ),
      /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "/" }),
      /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: "Execution stats" }),
      /* @__PURE__ */ t(
        "div",
        {
          className: "ml-auto flex gap-1.5",
          "data-testid": "stats-range",
          children: ["10", "50", "all"].map((m) => /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => c(m),
              className: I(
                "px-2.5 py-1 text-xs font-medium rounded cursor-pointer font-[inherit]",
                d === m ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"
              ),
              children: m === "all" ? "All" : `Last ${m}`
            },
            m
          ))
        }
      )
    ] }),
    x ? /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ o(
        "div",
        {
          className: "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3",
          "data-testid": "stats-kpis",
          children: [
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Success rate" }),
              /* @__PURE__ */ o(
                "div",
                {
                  className: "text-[22px] font-bold font-mono",
                  style: { color: Vu(u.successRatePct) },
                  "data-testid": "stats-success-rate",
                  children: [
                    u.completedCount,
                    "/",
                    u.totalCount,
                    " (",
                    u.successRatePct,
                    "%)"
                  ]
                }
              ),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                u.failedCount,
                " failed · ",
                u.cancelledCount,
                " cancelled"
              ] })
            ] }),
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Median duration" }),
              /* @__PURE__ */ t("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: De(u.medianMs) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                "p95 · ",
                De(u.p95Ms)
              ] })
            ] }),
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Total tokens" }),
              /* @__PURE__ */ o("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: [
                u.tokensIn.toLocaleString(),
                " → ",
                u.tokensOut.toLocaleString()
              ] }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                u.tokensPerRun.toLocaleString(),
                " avg per run"
              ] })
            ] }),
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Total cost" }),
              /* @__PURE__ */ t("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: _r(u.totalCost) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                _r(u.costPerRun),
                " avg per run"
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ o(
        "div",
        {
          className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3",
          "data-testid": "stats-cost-row",
          children: [
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-by-node", children: [
              /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Cost by node" }),
              f.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary py-2", children: "No per-node cost data in this range." }) : /* @__PURE__ */ t(
                oa,
                {
                  data: f.map((m) => ({
                    label: m.label,
                    cost: Number(m.totalCostUsd.toFixed(6))
                  })),
                  xKey: "label",
                  yKey: "cost",
                  height: 200,
                  color: "#646cff",
                  yFormat: Lr
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-trend-30d", children: [
              /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "30-day spend trend" }),
              /* @__PURE__ */ t(
                Ut,
                {
                  series: g,
                  height: 200,
                  xFormat: (m) => new Date(Number(m)).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric"
                  }),
                  yFormat: Lr
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ o("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3", children: [
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Runs over time (cumulative)" }),
          /* @__PURE__ */ t(
            Ut,
            {
              series: Ku(l),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString()
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Duration over time" }),
          /* @__PURE__ */ t(
            Ut,
            {
              series: Hu(l, u.medianMs),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString(),
              yFormat: (m) => De(m)
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Token usage over time" }),
          /* @__PURE__ */ t(
            Ut,
            {
              series: Ju(l),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString(),
              yFormat: (m) => m.toLocaleString()
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-failure-breakdown", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Failure breakdown (top 5)" }),
          u.failureBreakdown.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary py-2", children: "No failures in this range." }) : /* @__PURE__ */ o("table", { className: "w-full border-collapse text-xs", children: [
            /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: "text-left", children: ["Error", "Count", "Last seen", "Example"].map((m) => /* @__PURE__ */ t(
              "th",
              {
                className: "px-2 py-1.5 text-[10px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
                children: m
              },
              m
            )) }) }),
            /* @__PURE__ */ t("tbody", { children: u.failureBreakdown.map((m) => /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ t(
                "td",
                {
                  className: "px-2 py-1.5 text-text-primary max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap",
                  title: m.key,
                  children: m.key
                }
              ),
              /* @__PURE__ */ t("td", { className: "px-2 py-1.5 font-mono text-text-primary", children: m.count }),
              /* @__PURE__ */ t("td", { className: "px-2 py-1.5 text-text-secondary", children: qu(m.lastSeenAt) }),
              /* @__PURE__ */ t("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => n(`/pipelines/${e}/runs/${m.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    Fu(m.exampleRunId),
                    " →"
                  ]
                }
              ) })
            ] }, m.key)) })
          ] })
        ] })
      ] })
    ] }) : /* @__PURE__ */ t(
      qe,
      {
        icon: "📊",
        title: "No runs yet",
        body: "No runs yet. Trigger this pipeline to see stats."
      }
    )
  ] });
}
function Gu(e) {
  const n = new Date(e).getTime();
  if (!Number.isFinite(n) || n <= 0) return "—";
  const r = Math.floor((Date.now() - n) / 1e3);
  if (r < 10) return "just now";
  if (r < 60) return `${r}s ago`;
  const a = Math.floor(r / 60);
  if (a < 60) return `${a}m ago`;
  const i = Math.floor(a / 60);
  return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
}
function Yu(e) {
  return e.length <= 6 ? e : e.slice(-6);
}
function Xu({ approver: e, idx: n }) {
  const r = e.type === "role" ? "🎖" : "👤";
  return /* @__PURE__ */ o(
    "span",
    {
      className: "inline-flex items-center gap-1 bg-info-bg text-info-fg px-2 py-0.5 rounded-sm text-[11px] font-semibold leading-[1.4] whitespace-nowrap",
      children: [
        /* @__PURE__ */ t("span", { "aria-hidden": !0, children: r }),
        /* @__PURE__ */ t("span", { children: e.value })
      ]
    },
    `${e.type}:${e.value}:${n}`
  );
}
function Qu(e, n) {
  const r = [];
  if (e) {
    const a = e.steps;
    for (const [i, s] of Object.entries(e))
      i === "steps" || s == null || s === "" || (typeof s == "string" ? r.push({ label: i, value: s }) : typeof s == "object" && r.push({ label: i, value: JSON.stringify(s, null, 2) }));
    if (a && typeof a == "object")
      for (const [i, s] of Object.entries(a)) {
        if (s == null) continue;
        const d = s;
        typeof d.response == "string" && d.response.trim() && r.push({ label: `Step ${i.slice(0, 8)} response`, value: d.response });
      }
  }
  if (r.length === 0 && n)
    for (const [a, i] of Object.entries(n)) {
      const s = i.output;
      if (s)
        for (const [d, c] of Object.entries(s))
          c == null || c === "" || d === "tokensIn" || d === "tokensOut" || typeof c == "string" && c.trim() && r.push({ label: d, value: c });
    }
  return r;
}
function Zu({ row: e, onSubmit: n, onOpenPipeline: r }) {
  const [a, i] = S(""), s = E(
    (p) => {
      n(p, a.trim()), i("");
    },
    [a, n]
  ), d = e.requiredCount ?? 1, c = e.recordedCount ?? 0, l = W(() => Qu(e.runContext, e.runSteps), [e.runContext, e.runSteps]);
  return /* @__PURE__ */ o("div", { "data-testid": `approval-card-${e.runId}`, className: "flex flex-col gap-3 p-4 bg-surface border border-border rounded-[10px]", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2.5 min-w-0", children: [
        /* @__PURE__ */ t("span", { className: "text-lg", "aria-hidden": !0, children: "✋" }),
        /* @__PURE__ */ o("div", { className: "min-w-0", children: [
          /* @__PURE__ */ t(
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
          /* @__PURE__ */ o("div", { className: "font-mono text-[11px] text-text-tertiary", children: [
            "run #",
            Yu(e.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: Gu(e.requestedAt) })
    ] }),
    e.message ? /* @__PURE__ */ t("div", { "data-testid": `approval-message-${e.runId}`, className: "text-[13px] text-text-secondary bg-surface-inset px-3 py-2 rounded-md leading-normal", children: e.message }) : null,
    /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5 px-3 py-2.5 bg-surface-inset rounded-md border border-border", children: [
      /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: l.length > 0 ? "Context" : "Run details" }),
      l.length > 0 ? l.map(({ label: p, value: u }) => /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: p }),
        /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: u })
      ] }, p)) : /* @__PURE__ */ o(H, { children: [
        /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: "Run" }),
          /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: e.runId })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: "Step" }),
          /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: e.stepId })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: "Status" }),
          /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: "Awaiting your approval — upstream steps haven't produced reviewable output yet (or this approval node runs in parallel with them)." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1.5 items-center", children: [
      /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Approvers:" }),
      e.approvers.length === 0 ? /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : e.approvers.map((p, u) => /* @__PURE__ */ t(Xu, { approver: p, idx: u }, u)),
      d > 1 ? /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary ml-1", children: [
        "(",
        c,
        "/",
        d,
        " approvals)"
      ] }) : null
    ] }),
    /* @__PURE__ */ t(
      $e,
      {
        "data-testid": `approval-comment-${e.runId}`,
        value: a,
        onChange: (p) => i(p.target.value),
        placeholder: "Optional comment…",
        rows: 2,
        className: "w-full",
        "aria-label": "Approval comment"
      }
    ),
    /* @__PURE__ */ o("div", { className: "flex gap-2 justify-end", children: [
      /* @__PURE__ */ t("button", { "data-testid": `reject-${e.runId}`, onClick: () => s("reject"), className: "px-3.5 py-1.5 text-[13px] font-semibold bg-danger text-white border-none rounded-md font-[inherit] cursor-pointer", children: "Reject" }),
      /* @__PURE__ */ t("button", { "data-testid": `approve-${e.runId}`, onClick: () => s("approve"), className: "px-3.5 py-1.5 text-[13px] font-semibold bg-success text-white border-none rounded-md font-[inherit] cursor-pointer shrink-0", children: "Approve" })
    ] })
  ] });
}
function ah() {
  const e = Ve(), { approvals: n, isLoading: r, error: a, retry: i } = qo(), { resolveApproval: s, runs: d } = yt(), [c, l] = S(
    () => /* @__PURE__ */ new Set()
  );
  oe(() => {
    if (c.size === 0) return;
    const m = new Set(n.map((b) => `${b.runId}::${b.stepId}`));
    let w = !1;
    const v = new Set(c);
    for (const b of c)
      m.has(b) || (v.delete(b), w = !0);
    w && l(v);
  }, [n, c]);
  const [p, u] = S({}), f = ce(/* @__PURE__ */ new Set());
  oe(() => {
    for (const m of n)
      f.current.has(m.runId) || (f.current.add(m.runId), Wo(m.pipelineId, m.runId).then((w) => {
        w && u((v) => ({
          ...v,
          [m.runId]: { context: w.context, steps: w.steps }
        }));
      }));
  }, [n]);
  const h = W(() => {
    const m = /* @__PURE__ */ new Map(), w = [];
    for (const v of n) {
      const b = `${v.runId}::${v.stepId}`;
      if (c.has(b)) continue;
      let N = m.get(v.pipelineId);
      N === void 0 && (N = ct(v.pipelineId), m.set(v.pipelineId, N));
      const y = N?.name ?? (v.pipelineId ? `Pipeline ${v.pipelineId.slice(0, 8)}` : "Unknown pipeline"), k = p[v.runId]?.context ?? d[v.runId]?.context, C = p[v.runId]?.steps;
      w.push({ ...v, pipelineName: y, runContext: k, runSteps: C });
    }
    return w;
  }, [n, c, d, p]), g = E(
    (m, w, v, b, N) => {
      s(w, v, b, N || void 0), l((y) => {
        const k = new Set(y);
        return k.add(`${w}::${v}`), k;
      }), fetch(`/api/pipelines/${encodeURIComponent(w)}/approvals`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: v, decision: b, ...N ? { comment: N } : {} })
      }).catch((y) => {
        console.error("[approvals] POST failed", y);
      }), e(`/pipelines/${m}/runs/${w}`);
    },
    [s, e]
  ), x = h.length;
  return /* @__PURE__ */ o("div", { "data-testid": "pending-approvals-page", className: "flex flex-col h-full overflow-hidden bg-surface-inset font-[inherit]", children: [
    /* @__PURE__ */ t("div", { className: "h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]", children: /* @__PURE__ */ o("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ t("div", { className: "text-lg font-bold text-text-primary", children: "Pending approvals" }),
      /* @__PURE__ */ t(le, { "data-testid": "pending-count", tone: x > 0 ? "warning" : "neutral", size: "sm", children: x })
    ] }) }),
    /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto p-5", children: [
      a ? /* @__PURE__ */ o("div", { "data-testid": "approvals-error", role: "alert", className: "px-4 py-3 bg-danger-bg border border-danger text-danger-fg rounded-lg flex items-center justify-between gap-3 mb-4", children: [
        /* @__PURE__ */ t("span", { className: "text-[13px] font-medium", children: "Couldn't load pending approvals. Try again." }),
        /* @__PURE__ */ t("button", { "data-testid": "approvals-retry", onClick: i, className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-danger-fg border border-danger rounded-md cursor-pointer font-[inherit]", children: "Retry" })
      ] }) : null,
      r && x === 0 ? /* @__PURE__ */ o("div", { "data-testid": "approvals-loading", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: [
        /* @__PURE__ */ t(Zt, { height: 140 }),
        /* @__PURE__ */ t(Zt, { height: 140 }),
        /* @__PURE__ */ t(Zt, { height: 140 })
      ] }) : x === 0 && !a ? /* @__PURE__ */ t(
        qe,
        {
          icon: "✋",
          title: "No pending approvals",
          body: "When a pipeline reaches an approval step, it'll show up here.",
          testId: "approvals-empty"
        }
      ) : /* @__PURE__ */ t("div", { "data-testid": "approvals-list", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: h.map((m) => /* @__PURE__ */ t(
        Zu,
        {
          row: m,
          onOpenPipeline: () => e(`/pipelines/${m.pipelineId}`),
          onSubmit: (w, v) => g(m.pipelineId, m.runId, m.stepId, w, v)
        },
        `${m.runId}:${m.stepId}`
      )) })
    ] })
  ] });
}
function ih({
  status: e,
  result: n,
  runId: r,
  endpointLabel: a,
  error: i,
  latencyMs: s,
  onOpen: d,
  className: c
}) {
  const l = a ?? n?.model?.endpointId ?? "vision-model", p = s ?? n?.model?.latencyMs, u = n?.caption, f = (n?.tags ?? []).slice(0, 5), h = /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ t("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: l }),
      e === "running" ? /* @__PURE__ */ o(le, { tone: "info", size: "sm", children: [
        /* @__PURE__ */ t("span", { className: "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" }),
        " running"
      ] }) : e === "completed" ? /* @__PURE__ */ t(le, { tone: "success", size: "sm", children: "ok" }) : /* @__PURE__ */ t(le, { tone: "danger", size: "sm", children: "failed" }),
      typeof p == "number" ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        p.toFixed(0),
        "ms"
      ] }) : null,
      r ? /* @__PURE__ */ t("span", { className: "ml-auto truncate font-mono text-[10px] text-text-tertiary", children: r }) : null
    ] }),
    e === "failed" && i ? /* @__PURE__ */ t("p", { className: "text-[13px] text-danger-fg", children: i }) : /* @__PURE__ */ t("p", { className: "line-clamp-2 text-left text-[13px] text-text-primary", children: u ?? (e === "running" ? "Analyzing image…" : "No caption produced.") }),
    f.length > 0 ? /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: f.map((x) => /* @__PURE__ */ o(le, { tone: "neutral", size: "sm", children: [
      "#",
      x
    ] }, x)) }) : null
  ] }), g = I(
    "flex w-full flex-col gap-1.5 rounded-lg border bg-surface p-3 text-sm text-left",
    e === "running" ? "border-primary-border ring-1 ring-primary" : e === "failed" ? "border-danger-border" : "border-border"
  );
  if (d) {
    const x = u ? u.slice(0, 60) : "no caption";
    return /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: d,
        "aria-label": `Open vision result: ${l}, ${e}, ${x}`,
        className: I(
          g,
          "cursor-pointer transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
          c
        ),
        children: h
      }
    );
  }
  return /* @__PURE__ */ t("article", { className: I(g, c), children: h });
}
function sh(e = {}) {
  const { maxRecords: n = 50, runId: r } = e, [a, i] = S([]), s = ce(/* @__PURE__ */ new Map()), d = ce(!0);
  return oe(() => (d.current = !0, () => {
    d.current = !1;
  }), []), ze("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.image.vision.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const f = `${u.runId}::${u.stepId}`;
    i((h) => {
      const g = s.current.get(f), x = typeof u.at == "number" ? u.at : Date.now(), m = (w) => {
        if (typeof g == "number" && g >= 0 && g < h.length) {
          const N = h.slice();
          return N[g] = { ...h[g], ...w }, N;
        }
        const v = [w, ...h];
        v.length > n && (v.length = n);
        const b = /* @__PURE__ */ new Map();
        return v.forEach((N, y) => b.set(`${N.runId}::${N.stepId}`, y)), s.current = b, v;
      };
      if (p === "pipeline.image.vision.started")
        return m({
          runId: u.runId,
          stepId: u.stepId,
          status: "running",
          endpointId: u.endpointId,
          startedAt: x
        });
      if (p === "pipeline.image.vision.completed") {
        const w = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          status: "completed",
          result: u.result,
          completedAt: x,
          elapsedMs: w?.startedAt ? x - w.startedAt : void 0,
          endpointId: w?.endpointId ?? u.result?.model?.endpointId
        });
      }
      if (p === "pipeline.image.vision.failed") {
        const w = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          status: "failed",
          error: u.error,
          completedAt: x,
          elapsedMs: w?.startedAt ? x - w.startedAt : void 0
        });
      }
      return h;
    });
  }), W(() => a, [a]);
}
function em(e) {
  return e === "pass" ? "success" : e === "fail" ? "danger" : "warning";
}
function tm({ result: e, className: n }) {
  const r = em(e.overallVerdict), a = r === "success" ? "PASS" : r === "danger" ? "FAIL" : "INCONCLUSIVE", i = e.rubricSnapshot.passThreshold ?? 0.5;
  return /* @__PURE__ */ o(
    "section",
    {
      className: I(
        "flex flex-col gap-2 rounded-lg border border-border bg-surface p-3",
        n
      ),
      children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ o("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: [
            e.rubricSnapshot.id,
            " v",
            e.rubricSnapshot.version
          ] }),
          /* @__PURE__ */ o(le, { tone: r, size: "sm", children: [
            a,
            " · ",
            e.overallVerdict
          ] }),
          /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-tertiary", children: e.model }),
          /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "·" }),
          /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
            "mode: ",
            e.mode
          ] }),
          typeof e.confidence == "number" ? /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
            "confidence ",
            (e.confidence * 100).toFixed(0),
            "%"
          ] }) : null
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium uppercase text-text-tertiary", children: "overall" }),
          /* @__PURE__ */ t(
            Dn,
            {
              value: e.overallScore,
              threshold: i,
              tone: r === "warning" ? "warning" : r,
              size: "lg",
              ariaLabel: `Overall judge score ${(e.overallScore * 100).toFixed(0)}% — ${a}`
            }
          )
        ] })
      ]
    }
  );
}
function nm({ result: e, className: n }) {
  if (!e.criteria || e.criteria.length === 0) return null;
  const r = /* @__PURE__ */ new Map();
  for (const a of e.rubricSnapshot.criteria) r.set(a.id, a);
  return /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", n), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Criteria (",
      e.criteria.length,
      ")"
    ] }),
    /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1.5", children: e.criteria.map((a) => /* @__PURE__ */ t(rm, { score: a, def: r.get(a.criterionId) }, a.criterionId)) })
  ] });
}
function rm({
  score: e,
  def: n
}) {
  const r = e.passed ? "success" : "danger", a = e.passed ? "PASS" : "FAIL", i = n?.scale ?? "0-1";
  return /* @__PURE__ */ o("li", { className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2.5", children: [
    /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-1.5", children: [
      /* @__PURE__ */ t("span", { className: "font-mono text-[11px] font-semibold text-text-primary", children: e.criterionId }),
      /* @__PURE__ */ o("span", { className: "font-mono text-[10px] uppercase text-text-tertiary", children: [
        "[",
        i,
        "]"
      ] }),
      /* @__PURE__ */ t(le, { tone: r, size: "sm", children: a }),
      /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
        "raw: ",
        String(e.rawScore)
      ] })
    ] }),
    /* @__PURE__ */ t(
      Dn,
      {
        value: e.score,
        threshold: n?.failThreshold ?? 0.5,
        tone: r,
        size: "sm",
        ariaLabel: `Criterion ${e.criterionId} score ${(e.score * 100).toFixed(0)}% — ${a}`
      }
    ),
    n?.prompt ? /* @__PURE__ */ o("p", { className: "text-[12px] italic leading-snug text-text-tertiary", children: [
      "“",
      n.prompt,
      "”"
    ] }) : null,
    e.rationale ? /* @__PURE__ */ t("p", { className: "text-[13px] leading-snug text-text-primary", children: e.rationale }) : null
  ] });
}
const wo = So(null);
function lh({ value: e, children: n }) {
  return /* @__PURE__ */ t(wo.Provider, { value: e, children: n });
}
function No() {
  return Kt(wo);
}
function ch({
  result: e,
  showVerdict: n = !0,
  showCriteria: r = !0,
  showMetadata: a = !0,
  showRawText: i = !1,
  className: s
}) {
  const d = No(), [c, l] = S(!1), [p, u] = S(null), [f, h] = S(!1), [g, x] = S(null), m = ce(!0);
  oe(() => (m.current = !0, () => {
    m.current = !1;
  }), []), oe(() => {
    c && (e.rawModelText || p === null && (f || e.rawTextTruncated && d && (h(!0), (async () => {
      try {
        const b = await d.fetchRawText(e.judgmentId);
        if (!m.current) return;
        u(b ?? ""), x(null);
      } catch (b) {
        if (!m.current) return;
        x(b instanceof Error ? b : new Error(String(b)));
      } finally {
        m.current && h(!1);
      }
    })())));
  }, [c, e.rawModelText, e.rawTextTruncated, e.judgmentId, d, p, f]);
  const w = e.rawModelText ?? p ?? null, v = !!e.rawModelText || !!e.rawTextTruncated;
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-3 text-text-primary", s), children: [
    n ? /* @__PURE__ */ t(tm, { result: e }) : null,
    r ? /* @__PURE__ */ t(nm, { result: e }) : null,
    a ? /* @__PURE__ */ o("section", { className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
      /* @__PURE__ */ o("span", { children: [
        "tokens ",
        /* @__PURE__ */ t("span", { className: "font-mono", children: e.tokensIn }),
        " in /",
        " ",
        /* @__PURE__ */ t("span", { className: "font-mono", children: e.tokensOut }),
        " out"
      ] }),
      e.cacheReadTokens && e.cacheReadTokens > 0 ? /* @__PURE__ */ o(H, { children: [
        /* @__PURE__ */ t("span", { children: "·" }),
        /* @__PURE__ */ o("span", { children: [
          "cache ",
          /* @__PURE__ */ t("span", { className: "font-mono", children: e.cacheReadTokens }),
          " read"
        ] })
      ] }) : null,
      /* @__PURE__ */ t("span", { children: "·" }),
      /* @__PURE__ */ o("span", { children: [
        "latency ",
        /* @__PURE__ */ t("span", { className: "font-mono", children: e.latencyMs }),
        "ms"
      ] }),
      /* @__PURE__ */ t("span", { children: "·" }),
      /* @__PURE__ */ o("span", { children: [
        "cost ",
        /* @__PURE__ */ o("span", { className: "font-mono", children: [
          "$",
          e.costUsd.toFixed(4)
        ] })
      ] }),
      /* @__PURE__ */ t("span", { className: "ml-auto font-mono", children: e.judgedAt })
    ] }) : null,
    i && v ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => l((b) => !b),
          className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded",
          "aria-expanded": c,
          children: [
            c ? "▾" : "▸",
            " Raw model output"
          ]
        }
      ),
      c ? /* @__PURE__ */ t(
        om,
        {
          text: w,
          loading: f,
          error: g,
          fallbackHint: e.rawTextTruncated && !d ? "Raw text was spilled to S3 but no JudgmentApi provider is wired." : null
        }
      ) : null
    ] }) : null
  ] });
}
function om({
  text: e,
  loading: n,
  error: r,
  fallbackHint: a
}) {
  return n ? /* @__PURE__ */ t("div", { className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary", children: "Loading raw text…" }) : r ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-state-failed bg-danger-bg p-2 text-[11px] text-text-primary", children: [
    "Failed to fetch raw text: ",
    r.message
  ] }) : e === null || e.length === 0 ? /* @__PURE__ */ t("div", { className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary", children: a ?? "Raw text not available." }) : /* @__PURE__ */ t("pre", { className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary", children: e });
}
function dh({ aggregate: e, className: n }) {
  const r = e.numJudgments > 0 ? e.numPassed / e.numJudgments : 0, a = e.numJudgments > 0 ? e.sumOverallScore / e.numJudgments : 0, i = r >= 0.9 ? "success" : r >= 0.6 ? "warning" : "danger", s = i === "success" ? "HEALTHY" : i === "warning" ? "MIXED" : "FAILING";
  return /* @__PURE__ */ o(
    "section",
    {
      className: I(
        "flex flex-col gap-2 rounded-lg border border-border bg-surface p-3",
        n
      ),
      children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ t("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: e.dayBucket }),
          /* @__PURE__ */ o(le, { tone: i, size: "sm", children: [
            s,
            " · ",
            (r * 100).toFixed(0),
            "% pass"
          ] }),
          /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
            e.numJudgments,
            " judgments"
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium uppercase text-text-tertiary", children: "mean score" }),
          /* @__PURE__ */ t(
            Dn,
            {
              value: a,
              tone: i === "warning" ? "warning" : i,
              size: "md",
              ariaLabel: `Mean score ${(a * 100).toFixed(0)}% across ${e.numJudgments} judgments`
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
          /* @__PURE__ */ o("span", { children: [
            "tokens ",
            /* @__PURE__ */ t("span", { className: "font-mono", children: e.sumTokensIn }),
            " in /",
            " ",
            /* @__PURE__ */ t("span", { className: "font-mono", children: e.sumTokensOut }),
            " out"
          ] }),
          /* @__PURE__ */ t("span", { children: "·" }),
          /* @__PURE__ */ o("span", { children: [
            "cost ",
            /* @__PURE__ */ o("span", { className: "font-mono", children: [
              "$",
              e.sumCostUsd.toFixed(4)
            ] })
          ] }),
          typeof e.minOverallScore == "number" && typeof e.maxOverallScore == "number" ? /* @__PURE__ */ o(H, { children: [
            /* @__PURE__ */ t("span", { children: "·" }),
            /* @__PURE__ */ o("span", { children: [
              "range ",
              /* @__PURE__ */ t("span", { className: "font-mono", children: e.minOverallScore.toFixed(2) }),
              "–",
              /* @__PURE__ */ t("span", { className: "font-mono", children: e.maxOverallScore.toFixed(2) })
            ] })
          ] }) : null,
          /* @__PURE__ */ t("span", { children: "·" }),
          /* @__PURE__ */ o("span", { className: "font-mono", children: [
            e.numPassed,
            " pass / ",
            e.numFailed,
            " fail"
          ] })
        ] })
      ]
    }
  );
}
function ph({
  aggregates: e,
  sortOrder: n = "desc",
  caption: r,
  loading: a = !1,
  className: i
}) {
  const s = W(() => {
    const f = e.slice();
    return f.sort((h, g) => h.dayBucket.localeCompare(g.dayBucket)), n === "desc" && f.reverse(), f;
  }, [e, n]), d = W(() => e.slice().sort((h, g) => h.dayBucket.localeCompare(g.dayBucket)).map((h) => h.numJudgments > 0 ? h.numPassed / h.numJudgments : 0), [e]);
  if (e.length === 0)
    return /* @__PURE__ */ t(
      "section",
      {
        className: I(
          "flex min-h-[120px] w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-surface-panel p-4 text-text-tertiary",
          i
        ),
        children: /* @__PURE__ */ t("span", { className: "text-[12px]", children: a ? "Loading trends…" : "No judgment activity in range." })
      }
    );
  const c = e.reduce((f, h) => f + h.numJudgments, 0), l = e.reduce((f, h) => f + h.numPassed, 0), p = e.reduce((f, h) => f + h.sumCostUsd, 0), u = c > 0 ? l / c : 0;
  return /* @__PURE__ */ o("section", { className: I("flex w-full flex-col gap-2", i), children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: r ?? `Judgment trend — ${e.length} days` }),
      /* @__PURE__ */ o(
        le,
        {
          tone: u >= 0.9 ? "success" : u >= 0.6 ? "warning" : "danger",
          size: "sm",
          children: [
            (u * 100).toFixed(0),
            "% pass · ",
            c,
            " judgments"
          ]
        }
      ),
      /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
        "total cost $",
        p.toFixed(4)
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ t("span", { className: "text-[11px] font-medium uppercase text-text-tertiary", children: "pass-rate" }),
      /* @__PURE__ */ t(
        ea,
        {
          points: d,
          yMin: 0,
          yMax: 1,
          width: 240,
          height: 36,
          ariaLabel: `Pass-rate over ${d.length} days, ending at ${(d[d.length - 1] * 100).toFixed(0)}%`
        }
      )
    ] }),
    /* @__PURE__ */ o("table", { className: "w-full border-collapse text-[12px]", children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { className: "text-left text-[11px] uppercase tracking-wide text-text-tertiary", children: [
        /* @__PURE__ */ t("th", { scope: "col", className: "py-1 pr-2", children: "date" }),
        /* @__PURE__ */ t("th", { scope: "col", className: "py-1 pr-2", children: "pass" }),
        /* @__PURE__ */ t("th", { scope: "col", className: "py-1 pr-2", children: "mean" }),
        /* @__PURE__ */ t("th", { scope: "col", className: "py-1 pr-2 text-right", children: "judgments" }),
        /* @__PURE__ */ t("th", { scope: "col", className: "py-1 pl-2 text-right", children: "cost" })
      ] }) }),
      /* @__PURE__ */ t("tbody", { children: s.map((f) => /* @__PURE__ */ t(am, { row: f }, f.aggregateKey)) })
    ] })
  ] });
}
function am({ row: e }) {
  const n = e.numJudgments > 0 ? e.numPassed / e.numJudgments : 0, r = e.numJudgments > 0 ? e.sumOverallScore / e.numJudgments : 0, a = n >= 0.9 ? "success" : n >= 0.6 ? "warning" : "danger";
  return /* @__PURE__ */ o("tr", { className: "border-t border-border", children: [
    /* @__PURE__ */ t("td", { className: "py-1 pr-2 font-mono", children: e.dayBucket }),
    /* @__PURE__ */ t("td", { className: "py-1 pr-2", children: /* @__PURE__ */ o(le, { tone: a, size: "sm", children: [
      (n * 100).toFixed(0),
      "%"
    ] }) }),
    /* @__PURE__ */ o("td", { className: "py-1 pr-2 font-mono", children: [
      (r * 100).toFixed(0),
      "%"
    ] }),
    /* @__PURE__ */ t("td", { className: "py-1 pr-2 text-right font-mono", children: e.numJudgments }),
    /* @__PURE__ */ o("td", { className: "py-1 pl-2 text-right font-mono", children: [
      "$",
      e.sumCostUsd.toFixed(4)
    ] })
  ] });
}
function im(e) {
  if (typeof e == "number") return e;
  if (typeof e == "string") {
    const n = Date.parse(e);
    if (Number.isFinite(n)) return n;
  }
  return Date.now();
}
function uh(e = {}) {
  const { maxRecords: n = 50, runId: r } = e, [a, i] = S([]), s = ce(/* @__PURE__ */ new Map()), d = ce(!0);
  return oe(() => (d.current = !0, () => {
    d.current = !1;
  }), []), ze("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.judge.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const f = `${u.runId}::${u.stepId}`;
    i((h) => {
      const g = s.current.get(f), x = im(u.at), m = (w) => {
        if (typeof g == "number" && g >= 0 && g < h.length) {
          const N = h.slice();
          return N[g] = { ...h[g], ...w }, N;
        }
        const v = [w, ...h];
        v.length > n && (v.length = n);
        const b = /* @__PURE__ */ new Map();
        return v.forEach((N, y) => b.set(`${N.runId}::${N.stepId}`, y)), s.current = b, v;
      };
      if (p === "pipeline.judge.started")
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId,
          status: "running",
          rubricId: u.rubricId,
          judgeModel: u.judgeModel,
          startedAt: x
        });
      if (p === "pipeline.judge.scored") {
        const w = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? w?.pipelineId,
          status: "scored",
          result: u.result,
          completedAt: x,
          elapsedMs: w?.startedAt ? x - w.startedAt : u.latencyMs,
          rubricId: u.rubricId ?? w?.rubricId,
          judgeModel: u.judgeModel ?? w?.judgeModel,
          costUsd: u.costUsd ?? u.result?.costUsd,
          tokensIn: u.usage?.inputTokens ?? u.result?.tokensIn,
          tokensOut: u.usage?.outputTokens ?? u.result?.tokensOut
        });
      }
      if (p === "pipeline.judge.failed") {
        const w = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? w?.pipelineId,
          status: "failed",
          error: u.error,
          failureReason: u.reason,
          completedAt: x,
          elapsedMs: w?.startedAt ? x - w.startedAt : u.latencyMs,
          costUsd: u.costUsd,
          tokensIn: u.tokensIn,
          tokensOut: u.tokensOut
        });
      }
      if (p === "pipeline.judge.budget-exceeded") {
        const w = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? w?.pipelineId,
          status: "budget-exceeded",
          completedAt: x
        });
      }
      return h;
    });
  }), W(() => a, [a]);
}
function mh(e) {
  const n = No(), [r, a] = S([]), [i, s] = S(!1), [d, c] = S(null), l = ce(!0), p = ce(() => {
  }), { pipelineId: u, rubricId: f, since: h, until: g, limit: x, refreshIntervalMs: m = 0, paused: w = !1 } = e, v = `${u ?? ""}|${f ?? ""}|${h ?? ""}|${g ?? ""}|${x ?? ""}|${w ? "1" : "0"}`;
  return oe(() => (l.current = !0, () => {
    l.current = !1;
  }), []), oe(() => {
    if (!n) {
      a([]), s(!1), c(null);
      return;
    }
    if (w) return;
    if (!u && !f) {
      c(new Error("useJudgmentAggregates: one of pipelineId or rubricId is required")), s(!1);
      return;
    }
    let b = !1;
    const N = async () => {
      s(!0);
      try {
        const y = await n.fetchAggregates({
          ...u ? { pipelineId: u } : {},
          ...f ? { rubricId: f } : {},
          ...h ? { since: h } : {},
          ...g ? { until: g } : {},
          ...typeof x == "number" ? { limit: x } : {}
        });
        if (b || !l.current) return;
        a(y.items), c(null);
      } catch (y) {
        if (b || !l.current) return;
        c(y instanceof Error ? y : new Error(String(y)));
      } finally {
        l.current && !b && s(!1);
      }
    };
    if (p.current = () => {
      N();
    }, N(), m > 0) {
      const y = setInterval(() => {
        N();
      }, m);
      return () => {
        b = !0, clearInterval(y);
      };
    }
    return () => {
      b = !0;
    };
  }, [n, v, m]), {
    aggregates: r,
    loading: i,
    error: d,
    reload: () => p.current()
  };
}
const sm = 100, lm = 500, ko = 148, Co = 116, cm = 56, dm = 20;
function pm(e) {
  const n = new Map(e.map((l) => [l.imageId, l])), r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const l of e)
    if (l.parentImageId) {
      const p = a.get(l.parentImageId) ?? [];
      p.push(l.imageId), a.set(l.parentImageId, p);
    }
  const i = [];
  for (const l of e)
    (!l.parentImageId || !n.has(l.parentImageId)) && (r.set(l.imageId, 0), i.push(l.imageId));
  let s = 0;
  for (; s < i.length; ) {
    const l = i[s++], p = r.get(l) ?? 0;
    for (const u of a.get(l) ?? []) {
      const f = r.get(u) ?? -1;
      p + 1 > f && (r.set(u, p + 1), i.push(u));
    }
  }
  const d = /* @__PURE__ */ new Map();
  for (const [l, p] of r.entries()) {
    const u = d.get(p) ?? [];
    u.push(l), d.set(p, u);
  }
  const c = /* @__PURE__ */ new Map();
  for (const [l, p] of d.entries()) {
    const u = l * (ko + cm);
    p.forEach((f, h) => {
      c.set(f, {
        x: u,
        y: h * (Co + dm)
      });
    });
  }
  return c;
}
function um(e, n) {
  const r = new Map(n.map((s) => [s.imageId, s])), a = /* @__PURE__ */ new Set(), i = [e];
  for (; i.length; ) {
    const s = i.shift();
    if (a.has(s)) continue;
    a.add(s);
    const d = r.get(s);
    d?.parentImageId && i.push(d.parentImageId);
  }
  return a;
}
function mm({ src: e, alt: n, testId: r }) {
  const a = ce(null), [i, s] = S(!1);
  return oe(() => {
    if (!a.current) return;
    if (typeof IntersectionObserver > "u") {
      s(!0);
      return;
    }
    const d = a.current, c = new IntersectionObserver(
      ([l]) => {
        l.isIntersecting && (s(!0), c.disconnect());
      },
      { rootMargin: "200px" }
    );
    return c.observe(d), () => c.disconnect();
  }, []), /* @__PURE__ */ t(
    "div",
    {
      ref: a,
      className: "w-full h-full flex items-center justify-center bg-surface-inset",
      children: i ? /* @__PURE__ */ t(
        "img",
        {
          src: e,
          alt: n,
          className: "w-full h-full object-cover",
          loading: "lazy",
          "data-testid": r
        }
      ) : /* @__PURE__ */ t(
        "div",
        {
          "aria-hidden": "true",
          className: "w-full h-full animate-pulse bg-surface-inset",
          "data-testid": r ? `${r}-placeholder` : void 0
        }
      )
    }
  );
}
function hm({ data: e }) {
  const { entry: n, highlighted: r, selected: a, onSelect: i, getImageUrl: s } = e, d = n.width && n.height ? `${n.width}×${n.height}` : "", c = n.producedByNodeKind;
  return /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t(U, { type: "target", position: j.Left, id: "in", className: "w-2 h-2 bg-border-emphasis" }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => i(n.imageId),
        className: I(
          "w-full h-full flex flex-col overflow-hidden rounded-lg border bg-surface text-left",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          a ? "border-primary ring-2 ring-primary/30" : r ? "border-primary/60 bg-primary/5" : "border-border"
        ),
        "aria-label": `Image artifact ${n.imageId.slice(0, 8)} produced by ${c}`,
        "data-testid": `lineage-node-${n.imageId}`,
        children: [
          /* @__PURE__ */ t("div", { className: "flex-1 min-h-0 overflow-hidden bg-surface-inset flex items-center justify-center", children: /* @__PURE__ */ t(
            mm,
            {
              src: s(n.imageId),
              alt: `Artifact ${n.imageId.slice(0, 8)}`,
              testId: `lineage-thumb-${n.imageId}`
            }
          ) }),
          /* @__PURE__ */ o("div", { className: "px-1.5 py-1 flex flex-col gap-0.5 flex-shrink-0", children: [
            /* @__PURE__ */ t(
              "span",
              {
                className: I(
                  "inline-block text-[9px] font-mono px-1 rounded",
                  "bg-surface-inset text-text-secondary truncate max-w-full"
                ),
                title: c,
                children: c
              }
            ),
            d && /* @__PURE__ */ t("span", { className: "text-[9px] text-text-tertiary font-mono", children: d })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ t(U, { type: "source", position: j.Right, id: "out", className: "w-2 h-2 bg-border-emphasis" })
  ] });
}
const fm = { lineageNode: hm };
function gm() {
  return /* @__PURE__ */ t(
    "div",
    {
      className: "flex items-center justify-center h-full text-text-tertiary text-sm",
      "data-testid": "lineage-graph-empty",
      children: "No image artifacts produced by this run."
    }
  );
}
function xm(e, n) {
  if (e.length <= n) return e;
  const r = e.map((a, i) => ({ e: a, i }));
  return r.sort((a, i) => {
    const s = Date.parse(a.e.at), d = Date.parse(i.e.at);
    return d !== s ? d - s : i.i - a.i;
  }), r.slice(0, n).map((a) => a.e);
}
function gn(e) {
  return e.length > 10 ? `${e.slice(0, 8)}…` : e;
}
function bm({
  navEntries: e,
  imageId: n,
  onClose: r,
  onNavigate: a,
  getImageUrl: i
}) {
  const s = e.find((u) => u.imageId === n), [d, c] = S(!1);
  oe(() => {
    c(!1);
  }, [n]), oe(() => {
    const u = (f) => {
      if (f.key !== "ArrowRight" && f.key !== "ArrowLeft" || e.length === 0) return;
      const h = e.findIndex((m) => m.imageId === n);
      if (h === -1) return;
      const g = e.length, x = f.key === "ArrowRight" ? (h + 1) % g : (h - 1 + g) % g;
      f.preventDefault(), a(e[x].imageId);
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [n, e, a]);
  const l = E(() => {
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(n).then(
      () => {
        c(!0), window.setTimeout(() => c(!1), 1200);
      },
      () => {
      }
    );
  }, [n]);
  if (!s) return null;
  const p = s.width && s.height ? `${s.width}×${s.height}` : null;
  return /* @__PURE__ */ t(
    Qe,
    {
      open: !0,
      onClose: r,
      title: `Artifact ${gn(s.imageId)}`,
      maxWidth: 760,
      rawChildren: !0,
      backdropTestId: "lineage-preview-backdrop",
      footer: /* @__PURE__ */ t(
        Pe,
        {
          variant: "secondary",
          size: "sm",
          onClick: r,
          "data-testid": "lineage-preview-close",
          children: "Close"
        }
      ),
      children: /* @__PURE__ */ o(
        "div",
        {
          className: "flex flex-col gap-3",
          "data-testid": "lineage-preview-modal",
          children: [
            /* @__PURE__ */ t(
              "div",
              {
                className: I(
                  "flex items-center justify-center bg-surface-inset rounded-md overflow-hidden",
                  "max-h-[70vh] min-h-[200px]"
                ),
                children: /* @__PURE__ */ t(
                  "img",
                  {
                    src: i(s.imageId),
                    alt: `Artifact ${s.imageId}`,
                    className: "max-w-full max-h-[70vh] object-contain",
                    "data-testid": `lineage-preview-image-${s.imageId}`
                  }
                )
              }
            ),
            /* @__PURE__ */ o(
              "div",
              {
                className: "flex flex-wrap items-center gap-2 pt-1",
                "data-testid": "lineage-preview-meta",
                children: [
                  /* @__PURE__ */ o(le, { tone: "neutral", size: "sm", mono: !0, title: s.imageId, children: [
                    "id: ",
                    gn(s.imageId)
                  ] }),
                  /* @__PURE__ */ t(
                    mt,
                    {
                      "aria-label": d ? "Image id copied" : "Copy image id",
                      size: "sm",
                      variant: "ghost",
                      onClick: l,
                      "data-testid": "lineage-preview-copy",
                      children: d ? "✓" : "⧉"
                    }
                  ),
                  s.mimeType && /* @__PURE__ */ t(le, { tone: "info", size: "sm", children: s.mimeType }),
                  p && /* @__PURE__ */ t(le, { tone: "neutral", size: "sm", mono: !0, children: p }),
                  /* @__PURE__ */ o(le, { tone: "purple", size: "sm", mono: !0, title: s.producedByStepId, children: [
                    "step: ",
                    gn(s.producedByStepId)
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function hh({
  entries: e,
  selectedImageId: n,
  onSelect: r,
  maxRenderedNodes: a = sm
}) {
  const i = Me(), [s, d] = S(!1), [c, l] = S(!1), [p, u] = S(null), f = e.length, h = !s && f > a, g = W(
    () => h ? xm(e, a) : e,
    [e, h, a]
  ), x = W(
    () => n ? um(n, g) : /* @__PURE__ */ new Set(),
    [n, g]
  ), m = W(() => pm(g), [g]), w = E(
    (G) => {
      r?.(G), u(G);
    },
    [r]
  ), v = W(
    () => g.map((G) => {
      const Z = m.get(G.imageId) ?? { x: 0, y: 0 };
      return {
        id: G.imageId,
        type: "lineageNode",
        position: Z,
        data: {
          entry: G,
          highlighted: x.has(G.imageId),
          selected: G.imageId === n,
          onSelect: w,
          getImageUrl: i
        },
        style: { width: ko, height: Co }
      };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [g, n, x, w, i]
  ), b = W(
    () => new Set(g.map((G) => G.imageId)),
    [g]
  ), N = W(
    () => g.filter(
      (G) => G.parentImageId && b.has(G.parentImageId)
    ).map((G) => ({
      id: `${G.parentImageId}->${G.imageId}`,
      source: G.parentImageId,
      target: G.imageId,
      sourceHandle: "out",
      targetHandle: "in",
      className: x.has(G.imageId) && x.has(G.parentImageId) ? "stroke-primary stroke-2" : "stroke-border"
    })),
    [g, b, x]
  ), [y, , k] = Hr(v), [C, , T] = Jr(N), M = E(
    (G, Z) => {
      w(Z.id);
    },
    [w]
  ), P = E(() => {
    f > lm ? l(!0) : d(!0);
  }, [f]), D = E(() => {
    d(!0), l(!1);
  }, []), re = E(() => {
    l(!1);
  }, []), A = W(() => {
    const G = g.slice();
    return G.sort((Z, O) => {
      const R = Date.parse(Z.at), Y = Date.parse(O.at);
      return R !== Y ? R - Y : Z.imageId.localeCompare(O.imageId);
    }), G;
  }, [g]), J = E(() => u(null), []), Q = E(
    (G) => u(G),
    []
  );
  return f === 0 ? /* @__PURE__ */ t(gm, {}) : /* @__PURE__ */ o(
    "div",
    {
      className: "relative w-full h-full flex flex-col",
      "data-testid": "lineage-graph",
      children: [
        h && /* @__PURE__ */ t("div", { className: "p-2 flex-shrink-0", children: /* @__PURE__ */ o(
          nt,
          {
            variant: "info",
            "data-testid": "lineage-graph-clip-banner",
            children: [
              /* @__PURE__ */ o("span", { className: "flex-1", children: [
                "Showing ",
                g.length,
                " of ",
                f,
                " artifacts"
              ] }),
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: P,
                  "data-testid": "lineage-graph-show-all",
                  className: I(
                    "ml-2 px-2 py-1 text-[12px] font-medium rounded",
                    "border border-current bg-transparent cursor-pointer",
                    "hover:bg-current/10"
                  ),
                  children: "Show all"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ o("div", { className: "flex-1 min-h-0 relative", children: [
          /* @__PURE__ */ t("style", { children: ".react-flow__node { position: absolute; }" }),
          /* @__PURE__ */ o(
            Gr,
            {
              nodes: y,
              edges: C,
              onNodesChange: k,
              onEdgesChange: T,
              onNodeClick: M,
              nodeTypes: fm,
              fitView: !0,
              fitViewOptions: { padding: 0.2 },
              minZoom: 0.3,
              maxZoom: 2,
              onlyRenderVisibleElements: !0,
              proOptions: { hideAttribution: !0 },
              children: [
                /* @__PURE__ */ t(Yr, { gap: 16, size: 1, className: "bg-surface-inset" }),
                /* @__PURE__ */ t(Xr, { showInteractive: !1, className: "bg-surface border border-border rounded" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ t(
          Wt,
          {
            open: c,
            onConfirm: D,
            onCancel: re,
            title: "Show all artifacts?",
            body: `Rendering all ${f} artifacts may slow down the lineage tab. Continue?`,
            confirmLabel: "Show all",
            tone: "caution"
          }
        ),
        p && /* @__PURE__ */ t(
          bm,
          {
            navEntries: A,
            imageId: p,
            onClose: J,
            onNavigate: Q,
            getImageUrl: i
          }
        )
      ]
    }
  );
}
const _t = /* @__PURE__ */ new Map(), ym = 6e4;
function Br(e) {
  const n = _t.get(e);
  return n ? Date.now() - n.fetchedAt > ym ? (_t.delete(e), null) : n.entries : null;
}
function vm(e, n) {
  _t.set(e, { entries: n, fetchedAt: Date.now() });
}
function fh() {
  _t.clear();
}
function gh(e, n) {
  const [r, a] = S(() => e ? Br(e) ?? [] : []), [i, s] = S(!1), [d, c] = S(null), l = ce(0), p = E(() => {
    if (!e || !n) return;
    const f = Br(e);
    if (f) {
      a(f), s(!1), c(null);
      return;
    }
    const h = ++l.current;
    s(!0), c(null);
    const g = `/api/pipeline/runs/${encodeURIComponent(e)}/image-lineage?pipelineId=${encodeURIComponent(n)}`;
    fetch(g, {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    }).then(async (x) => {
      if (h !== l.current) return;
      if (!x.ok) {
        const v = `image-lineage: ${x.status} ${x.statusText}`;
        c(v), s(!1);
        return;
      }
      const m = await x.json();
      if (h !== l.current) return;
      const w = Array.isArray(m.entries) ? m.entries : [];
      vm(e, w), a(w), s(!1);
    }).catch((x) => {
      h === l.current && (c(x instanceof Error ? x.message : String(x)), s(!1));
    });
  }, [e, n]), u = E(() => {
    e && _t.delete(e), p();
  }, [e, p]);
  return oe(() => {
    p();
  }, [p]), { entries: r, loading: i, error: d, refetch: u };
}
export {
  Ia as ActionNode,
  Tc as AdjustBwConfig,
  ei as AdjustBwNode,
  Uc as AdjustLayerConfig,
  ni as AdjustLayerNode,
  Ua as AgUiOutputNode,
  Da as AgentNode,
  dh as AggregateSummaryCard,
  rh as AllRunsPage,
  Ii as AnimatedEdge,
  Pa as ApprovalNode,
  ye as BaseNode,
  fd as CaptionPanel,
  ka as ConditionNode,
  _ as ConfigField,
  ht as ConfigSection,
  Xt as ContextVariablePicker,
  nm as CriteriaPanel,
  Ic as CropConfig,
  Za as CropNode,
  zc as DimensionsConfig,
  ri as DimensionsNode,
  id as EditPromptConfig,
  wi as EditPromptNode,
  Nd as EditRecommendationsPanel,
  kh as EventStreamProvider,
  Sa as ForkNode,
  uc as FormatConvertConfig,
  Ga as FormatConvertNode,
  nd as GenerateConfig,
  gi as GenerateNode,
  Oa as GraphQueryNode,
  La as GuardrailNode,
  hh as ImageLineageGraph,
  ld as ImageSourceConfig,
  za as ImageSourceNode,
  xd as ImageWithBBoxOverlay,
  Aa as JoinNode,
  lh as JudgmentApiProvider,
  ch as JudgmentResultViewer,
  ph as JudgmentTrendChart,
  Ea as KnowledgeBaseNode,
  ya as LLMNode,
  Ma as McpToolNode,
  _a as MemoryNode,
  ma as NODE_CATEGORIES,
  Ym as NODE_TYPES_WITHOUT_CONFIG,
  Ne as NodeConfigShell,
  Fi as NodePalette,
  Gt as NodeThumbStrip,
  vd as ObjectsPanel,
  Oi as PALETTE_ITEMS,
  ha as PORT_CLS,
  ah as PendingApprovalsPage,
  yd as PeoplePanel,
  rs as PipelineCanvas,
  In as PipelineEditorContext,
  Xm as PipelineEditorPage,
  Wr as PipelineEditorProvider,
  yh as PipelineEditorServicesProvider,
  vh as PipelineNodeRuntimeProvider,
  th as PipelineRunComparePage,
  nh as PipelineRunDiff,
  eh as PipelineRunReplayPage,
  Zm as PipelineRunsPage,
  jo as PipelineRunsProvider,
  oh as PipelineStatsPage,
  Qm as PipelinesPage,
  Ba as PolicyNode,
  oc as ResizeConfig,
  Va as ResizeNode,
  lt as SamplePills,
  dd as SaveConfig,
  Fa as SaveNode,
  nc as ScatterConfig,
  Wa as ScatterNode,
  mc as SharpenConfig,
  Ya as SharpenNode,
  Be as SourceImagePathField,
  wd as TagsPanel,
  at as ToggleField,
  lc as TransformGeoConfig,
  Ha as TransformGeoNode,
  wa as TransformNode,
  ga as TriggerNode,
  qc as UpscaleConfig,
  oi as UpscaleNode,
  od as VariationConfig,
  bi as VariationNode,
  tm as VerdictPanel,
  Yc as VisionClassifyConfig,
  di as VisionClassifyNode,
  Jc as VisionConfig,
  Xc as VisionDescribeConfig,
  pi as VisionDescribeNode,
  Zc as VisionExtractTextConfig,
  mi as VisionExtractTextNode,
  ci as VisionNode,
  kd as VisionResultViewer,
  ih as VisionRunCard,
  Gc as VisionTagConfig,
  ui as VisionTagNode,
  fc as WatermarkConfig,
  Xa as WatermarkNode,
  ll as availableContextPaths,
  pl as availableImageRefs,
  xe as categoryFor,
  fh as clearImageLineageCache,
  nr as contextContributions,
  bd as imageOverlayPropsFrom,
  Ni as nodeTypes,
  z as portCls,
  Gm as recordRecentType,
  cl as unresolvedTemplatePaths,
  vn as upstreamNodeIds,
  ze as useEventStream,
  ta as useEventStreamContext,
  gh as useImageLineage,
  Me as useImageUrl,
  jr as useIsNodeTypeExecutable,
  mh as useJudgmentAggregates,
  No as useJudgmentApi,
  uh as useJudgmentResults,
  fe as useLatestStepForNode,
  Ke as usePipelineEditor,
  zr as usePipelineEditorServices,
  wh as usePipelineNodeRuntime,
  yt as usePipelineRuns,
  _e as useRetryFromStep,
  Yt as useUpstreamContext,
  wt as useUpstreamImageRefs,
  sh as useVisionResults
};
