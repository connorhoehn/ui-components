import { jsxs as o, jsx as t, Fragment as H } from "react/jsx-runtime";
import Zr, { useState as S, memo as Bo, useRef as ce, useEffect as oe, useMemo as W, useCallback as E, useContext as Ht, createContext as Uo } from "react";
import { useNavigate as Ve, useParams as ft, Navigate as gt, useSearchParams as Jt } from "react-router";
import { v as eo, w as he, x as Oe, q as Pe, G as Pn, y as Ke, u as xt, i as jo, g as Fo, f as Vn, p as zo, z as Mn, e as Se, A as qo, S as Ae, N as Ne, R as Kn, J as Zt, t as to, I as no, T as Le, B as bt, C as Dn, n as ro, a as st, D as oo, E as En, F as wn, H as ao, K as Wo, L as Vo, M as Ko, b as Ho, O as lt, Q as Jo, U as Go, V as ct, W as Hn, X as Yo, j as Xo, o as io, Y as qt, Z as Qo, m as Jn, P as Zo, _ as ea, r as ta, $ as Wt, l as Gn, a0 as na, k as ra } from "./usePendingApprovals-DB5-6o3z.js";
import { h as Th, a1 as $h, a2 as Rh } from "./usePendingApprovals-DB5-6o3z.js";
import { Handle as B, Position as U, useNodeConnections as oa, getSmoothStepPath as aa, EdgeLabelRenderer as Yn, ReactFlowProvider as ia, useReactFlow as sa, useNodesState as so, useEdgesState as lo, ReactFlow as co, Background as po, BackgroundVariant as la, Controls as uo, MiniMap as ca } from "@xyflow/react";
/* empty css               */
import { c as I } from "./cn-B6yFEsav.js";
import { b as On, u as Gt } from "./ToastProvider-D3MHbP-u.js";
import { a as yt, F as da, I as pa, C as _n, U as ua, T as Ln, S as Bn, b as ma } from "./TrendSparkline-Bm0kEjdg.js";
import "clsx";
import "tailwind-merge";
import { M as Qe } from "./Modal-fp5zcyw8.js";
import "react-dom";
import "./WebSocketContext-DPGFyPeZ.js";
import { a as je, u as ha } from "./EventStreamContext-CjzSHXy-.js";
import { E as Ph } from "./EventStreamContext-CjzSHXy-.js";
import { B as Ee } from "./Button-Qsbxqsl9.js";
import { I as pt, S as fa, F as ga } from "./FileUploadDrop-CL1kscAC.js";
import { B as ot } from "./Banner-DKb3JiLs.js";
import { C as le } from "./Chip-BDT8ro4h.js";
import { E as qe } from "./EmptyState-Ejc9dJA3.js";
import { u as mo } from "./IdentityContext-CLalsm_M.js";
import { C as Vt } from "./ConfirmDialog-Ix7G_Mb4.js";
import { B as xa, L as Lt } from "./Chart-ByoxeiYX.js";
import { S as en } from "./SkeletonCard-Baj5Ynm7.js";
const ba = {
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
}, ya = {
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
function Nn(e, n, r, i) {
  return !(!va(e, n) || !wa(r, i));
}
function va(e, n) {
  const r = ba[e];
  return r === "fork" ? Na(n) : r.includes(n);
}
function wa(e, n) {
  const r = ya[e];
  return r === null ? !1 : r === "join" ? ka(n) : r.includes(n);
}
function Na(e) {
  return /^branch-(\d+)$/.exec(e) !== null;
}
function ka(e) {
  return /^in-(\d+)$/.exec(e) !== null;
}
const Ca = {
  idle: { card: "border border-[#d1d5db] bg-white", dot: "bg-[#d1d5db]" },
  pending: { card: "border border-dashed border-[#93c5fd] bg-[#eff6ff]", dot: "bg-[#93c5fd]" },
  running: { card: "border-2 border-[#2563eb] bg-[#eff6ff]", dot: "bg-[#2563eb]" },
  awaiting: { card: "border-2 border-[#f59e0b] bg-[#fffbeb]", dot: "bg-[#f59e0b]" },
  completed: { card: "border border-[#16a34a] bg-[#f0fdf4]", dot: "bg-[#16a34a]" },
  failed: { card: "border-2 border-[#dc2626] bg-[#fef2f2]", dot: "bg-[#dc2626]" },
  skipped: { card: "border border-dashed border-[#d1d5db] bg-[#f9fafb] opacity-50", dot: "bg-[#d1d5db]" }
}, Ia = {
  source: { bar: "bg-cat-source", chip: "w-5 h-5 rounded-full bg-cat-source/15" },
  transform: { bar: "bg-cat-transform", chip: "w-5 h-5 rounded-md bg-cat-transform/15" },
  ai: { bar: "bg-cat-ai", chip: "w-5 h-5 rounded-md bg-gradient-to-br from-cat-ai/25 to-cat-ai/5" },
  control: { bar: "bg-cat-control", chip: "w-5 h-5 rounded-[4px] bg-cat-control/15 rotate-45", glyph: "-rotate-45" },
  sink: { bar: "bg-cat-sink", chip: "w-5 h-5 rounded-md bg-cat-sink/15" },
  human: { bar: "bg-cat-human", chip: "w-7 h-5 rounded-full bg-cat-human/15" }
};
function be(e) {
  const n = eo(), r = e.nodeType ? !n(e.nodeType) : !1, { icon: i, subtitle: a, state: s, body: d, footer: c, selected: l, onRetry: p, hasBreakpoint: u, pausedAtBreakpoint: f, ariaLabel: h, category: g, children: x } = e, m = Ca[s], v = g ? Ia[g] : void 0, w = On(), [b, N] = S(!1), y = s === "failed" && typeof p == "function", k = (M) => {
    M.preventDefault(), M.stopPropagation(), p?.();
  }, C = !w && s === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !w && s === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", T = !!(d || c || y), D = !!(d || c), P = a ? `${a}, state: ${s}` : `Node, state: ${s}`;
  return /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        f ? "border-2 border-[#d97706] bg-[#fffbeb] shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]" : m.card,
        !f && l && "shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]",
        !f && !l && "shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
        w && "transition-none"
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
        v && /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            "data-testid": "category-accent",
            className: I(
              "absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[7px] pointer-events-none",
              v.bar
            )
          }
        ),
        u && /* @__PURE__ */ t(
          "span",
          {
            "aria-label": "breakpoint",
            "data-testid": "breakpoint-dot",
            className: "absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-[#ef4444] border-[1.5px] border-white z-[1]"
          }
        ),
        /* @__PURE__ */ o("div", { className: I(
          "flex items-center gap-2 h-7 px-2.5",
          T && "border-b border-border"
        ), children: [
          v ? /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": "true",
              "data-testid": "category-chip",
              className: I("flex items-center justify-center shrink-0", v.chip),
              children: /* @__PURE__ */ t("span", { className: I("text-xs leading-none", v.glyph), children: i })
            }
          ) : /* @__PURE__ */ t("span", { className: "text-sm leading-none shrink-0", "aria-hidden": "true", children: i }),
          /* @__PURE__ */ t("span", { className: "flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap", children: a }),
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
          D && "border-b border-border"
        ), children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: I(
              "cursor-pointer appearance-none font-inherit text-[11px] font-medium leading-tight px-2 py-0.5 rounded-full border border-[#dc2626] text-[#dc2626] transition-colors duration-[120ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              b ? "bg-[#fef2f2]" : "bg-transparent",
              w && "transition-none"
            ),
            onClick: k,
            onMouseDown: (M) => M.stopPropagation(),
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
const Sa = {
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
function ge(e) {
  return Sa[e];
}
const Ta = {
  image: "!w-2.5 !h-2.5 !rounded-sm !bg-[#7c3aed] !border-[#6d28d9]",
  text: "!w-2.5 !h-2.5 !bg-surface-emphasis",
  data: "!w-2.5 !h-2.5 !bg-[#94a3b8]",
  control: "!w-2 !h-2 !bg-warning",
  error: "!w-2 !h-2 !bg-danger"
};
function j(e) {
  return Ta[e];
}
function Xn(e) {
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
function $a(e) {
  return e.triggerType === "schedule" ? e.schedule ? `cron: ${e.schedule}` : "No schedule set" : e.triggerType === "webhook" ? e.webhookPath ? `POST ${e.webhookPath}` : "No path set" : e.triggerType.startsWith("document.") ? e.documentTypeId ? `Doc type: ${e.documentTypeId}` : "Any document" : "Fires on user click";
}
function Ra(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Oe(), p = c === "failed" ? () => l(n) : void 0, u = `Trigger node, ${Xn(r)}, state: ${c}`;
  return /* @__PURE__ */ t(
    be,
    {
      icon: "▶",
      subtitle: Xn(r),
      state: c,
      category: ge("trigger"),
      body: /* @__PURE__ */ t("span", { className: "italic", children: $a(r) }),
      selected: i,
      onRetry: p,
      ariaLabel: u,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: /* @__PURE__ */ t(
        B,
        {
          type: "source",
          position: U.Right,
          id: "out",
          className: j("data")
        }
      )
    }
  );
}
function Aa(e) {
  if (!e || e.trim().length === 0) return "Not configured";
  const r = e.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
function Pa({ info: e }) {
  const [n, r] = S(!1), i = n ? e.response : e.response.length > 60 ? `${e.response.slice(0, 60)}…` : e.response, a = e.tokensIn != null || e.tokensOut != null;
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
          a && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: [
            e.tokensIn ?? 0,
            " → ",
            e.tokensOut ?? 0,
            " tokens"
          ] }),
          e.streamOpening && /* @__PURE__ */ t(
            "span",
            {
              className: "ml-1.5 text-[11px] text-[#2563eb]",
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
        children: i
      }
    )
  ] });
}
function Ma(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.llm, p = c === "running" && l?.streamOpened === !0 && (l?.tokensOut ?? 0) === 0, u = c === "running" && l !== void 0 && (l.tokensOut ?? 0) > 0, f = Oe(), h = c === "failed" ? () => f(n) : void 0, g = /* @__PURE__ */ t("span", { className: "italic", children: Aa(r.userPromptTemplate) }), m = (l ? {
    response: l.response ?? "",
    tokensIn: l.tokensIn,
    tokensOut: l.tokensOut,
    streaming: u,
    streamOpening: p
  } : void 0) ?? r._llmResponse, v = m ? /* @__PURE__ */ t(Pa, { info: m }) : void 0, w = (r.systemPrompt ?? "").replace(/\s+/g, " ").trim(), b = w.length === 0 ? "no system prompt" : `system prompt: ${w.length > 60 ? `${w.slice(0, 60)}…` : w}`, N = `LLM node, ${r.model || r.provider}, ${b}, state: ${c}`;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "🧠",
      subtitle: r.model || r.provider,
      state: c,
      category: ge("llm"),
      body: g,
      footer: v,
      selected: i,
      onRetry: h,
      ariaLabel: N,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: `${j("text")} !top-[40%]` }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[60%]` })
      ]
    }
  );
}
function Da(e) {
  if (!e) return "—";
  const n = e.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function Ea(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Oe(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "✨",
      subtitle: r.transformType,
      state: c,
      category: ge("transform"),
      body: /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Da(r.expression) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("data") })
      ]
    }
  );
}
function Oa(e) {
  if (!e) return "—";
  const n = e.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function _a(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Oe(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "❓",
      subtitle: r.label || "condition",
      state: c,
      category: ge("condition"),
      body: /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Oa(r.expression) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "true", className: `${j("control")} !top-[40%]` }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "false", className: `${j("control")} !top-[60%]` })
      ]
    }
  );
}
function La(e) {
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
function Ba(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Oe(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "⚡",
      subtitle: r.actionType,
      state: c,
      category: ge("action"),
      body: /* @__PURE__ */ t("span", { className: "italic", children: La(r) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: `${j("data")} !top-[40%]` }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[60%]` })
      ]
    }
  );
}
function Ua(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Oe(), p = c === "failed" ? () => l(n) : void 0, u = Math.max(2, Math.min(8, r.branchCount ?? 2)), f = Array.from({ length: u }, (h, g) => {
    const x = r.branchLabels?.[g];
    return x && x.trim().length > 0 ? x : `branch ${g}`;
  });
  return /* @__PURE__ */ o(
    be,
    {
      icon: "⑂",
      subtitle: `${u} branches`,
      state: c,
      category: ge("fork"),
      body: /* @__PURE__ */ t("ul", { className: "m-0 p-0 list-none flex flex-col gap-0.5 text-xs text-text-secondary", children: f.map((h, g) => /* @__PURE__ */ o("li", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: [
        "• ",
        h
      ] }, g)) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        f.map((h, g) => {
          const x = (g + 1) / (u + 1) * 100;
          return /* @__PURE__ */ t(
            B,
            {
              type: "source",
              position: U.Right,
              id: `branch-${g}`,
              className: j("control"),
              style: { top: `${x}%` }
            },
            g
          );
        })
      ]
    }
  );
}
function ja(e) {
  return e.mode === "all" ? "all" : e.mode === "any" ? "any" : `${e.n ?? 1} of many`;
}
function Fa(e) {
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
function za(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Oe(), p = c === "failed" ? () => l(n) : void 0, u = oa({ handleType: "target" }), f = Math.max(2, u.length + 1);
  return /* @__PURE__ */ o(
    be,
    {
      icon: "⑃",
      subtitle: ja(r),
      state: c,
      category: ge("join"),
      body: /* @__PURE__ */ t("span", { className: "italic", children: Fa(r.mergeStrategy) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        Array.from({ length: f }, (h, g) => {
          const x = (g + 1) / (f + 1) * 100;
          return /* @__PURE__ */ t(
            B,
            {
              type: "target",
              position: U.Left,
              id: `in-${g}`,
              className: j("control"),
              style: { top: `${x}%` }
            },
            `in-${g}`
          );
        }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("data") })
      ]
    }
  );
}
function qa(e) {
  return e.type === "role" ? `@${e.value}` : e.value;
}
function Wa(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Oe(), p = c === "failed" ? () => l(n) : void 0, u = r.approvers ?? [], f = u.length, h = r.requiredCount ?? 0, g = `${f} approver${f === 1 ? "" : "s"}, ${h}/${f} required`, x = u.slice(0, 2), m = Math.max(0, u.length - 2), v = u.length === 0 ? /* @__PURE__ */ t("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: [
    x.map((w, b) => /* @__PURE__ */ t(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: qa(w)
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
    be,
    {
      icon: "✋",
      subtitle: g,
      state: c,
      category: ge("approval"),
      body: v,
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "approved", className: `${j("data")} !top-[40%]` }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "rejected", className: `${j("data")} !top-[60%]` })
      ]
    }
  );
}
function Va({ id: e, data: n, selected: r }) {
  const i = he(e), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Oe(), c = n.agentName || n.agentId || "Not configured", l = `${n.protocol.toUpperCase()}${n.streaming ? " (streaming)" : ""}`;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "🤖",
      subtitle: c,
      state: s,
      category: ge("agent"),
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: `${j("data")} !top-[40%]` }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[60%]` })
      ]
    }
  );
}
function Ka({ id: e, data: n, selected: r }) {
  const i = he(e), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Oe(), c = n.toolName || "Not configured";
  return /* @__PURE__ */ o(
    be,
    {
      icon: "🔌",
      subtitle: c,
      state: s,
      category: ge("mcp-tool"),
      body: n.gatewayUrl ? /* @__PURE__ */ t("span", { className: "text-[11px]", children: n.gatewayUrl }) : void 0,
      selected: r,
      onRetry: s === "failed" && i ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: `${j("data")} !top-[40%]` }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[60%]` })
      ]
    }
  );
}
function Ha({ id: e, data: n, selected: r }) {
  const i = he(e), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Oe(), c = n.knowledgeBaseId || "Not configured", l = `Top ${n.topK} chunks${n.scoreThreshold ? ` (≥${n.scoreThreshold})` : ""}`;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "📚",
      subtitle: c,
      state: s,
      category: ge("knowledge-base"),
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: `${j("data")} !top-[40%]` }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[60%]` })
      ]
    }
  );
}
function Ja({ id: e, data: n, selected: r }) {
  const i = he(e), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Oe(), c = n.graphId || "Not configured", l = n.query.length > 40 ? `${n.query.slice(0, 37)}...` : n.query;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "🕸️",
      subtitle: c,
      state: s,
      category: ge("graph-query"),
      body: /* @__PURE__ */ t("span", { className: "text-[11px] font-mono", children: l }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: `${j("data")} !top-[40%]` }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[60%]` })
      ]
    }
  );
}
function Ga({ id: e, data: n, selected: r }) {
  const i = he(e), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Oe(), c = `${n.mode} ${n.scope}`, l = n.namespace ? `ns: ${n.namespace}` : "No namespace";
  return /* @__PURE__ */ o(
    be,
    {
      icon: "💾",
      subtitle: c,
      state: s,
      category: ge("memory"),
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: `${j("data")} !top-[40%]` }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[60%]` })
      ]
    }
  );
}
function Ya({ id: e, data: n, selected: r }) {
  const i = he(e), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Oe(), c = n.label || n.guardrailId || "Not configured";
  return /* @__PURE__ */ o(
    be,
    {
      icon: "🛡️",
      subtitle: c,
      state: s,
      category: ge("guardrail"),
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        "Action: ",
        n.action
      ] }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "pass", className: `${j("control")} !top-[40%]` }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "block", className: `${j("control")} !top-[60%]` })
      ]
    }
  );
}
function Xa({ id: e, data: n, selected: r }) {
  const i = he(e), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Oe(), c = n.label || n.action || "Not configured";
  return /* @__PURE__ */ o(
    be,
    {
      icon: "📜",
      subtitle: c,
      state: s,
      category: ge("policy"),
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        n.principal,
        " → ",
        n.resource
      ] }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "allow", className: `${j("control")} !top-[40%]` }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "deny", className: `${j("control")} !top-[60%]` })
      ]
    }
  );
}
function Qa({ id: e, data: n, selected: r }) {
  const i = he(e), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = n.eventType === "CUSTOM" ? n.customEventName || "Custom" : n.eventType;
  return /* @__PURE__ */ t(
    be,
    {
      icon: "📡",
      subtitle: d,
      state: s,
      category: ge("ag-ui-output"),
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        "Source: ",
        n.sourceField
      ] }),
      footer: /* @__PURE__ */ t("span", { className: "text-[10px] text-[#6366f1]", children: "Terminal — streams to AG-UI frontend" }),
      selected: r,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") })
    }
  );
}
const Za = (e) => e.stopPropagation();
function ei(e) {
  const { id: n, data: r, selected: i } = e, [a, s] = S(!1), d = he(n), c = d?.status === "cancelled" ? "failed" : d?.status, p = (r._state && r._state !== "idle" ? r._state : void 0) ?? c ?? r._state ?? "idle", u = Pe(), h = d?.images?.[0]?.imageId ?? d?.output?.imageId ?? r.imageId, g = h ? /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "aria-label": "View source image",
        className: I(
          "block w-full rounded border-none bg-transparent p-0 cursor-zoom-in",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
        ),
        onMouseDown: Za,
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
              "border border-[#d1d5db] bg-[#f3f4f6]"
            ),
            "data-testid": "image-source-thumb"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      yt,
      {
        images: [{ src: u(h), alt: "Source image" }],
        openIndex: a ? 0 : null,
        onClose: () => s(!1)
      }
    )
  ] }) : /* @__PURE__ */ t(
    "div",
    {
      className: I(
        "w-full h-20 rounded flex items-center justify-center",
        "border border-dashed border-[#d1d5db] bg-[#f3f4f6]",
        "text-[11px] text-[#6b7280]"
      ),
      "data-testid": "image-source-placeholder",
      children: "No image configured"
    }
  ), x = h ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-[#6b7280]", children: [
    h.slice(0, 16),
    "…"
  ] }) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "🖼",
      subtitle: "image-source",
      state: p,
      category: ge("image-source"),
      body: g,
      footer: x,
      selected: i,
      ariaLabel: `Image Source node, state: ${p}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(
          B,
          {
            type: "target",
            position: U.Left,
            id: "in",
            className: j("control")
          }
        ),
        /* @__PURE__ */ t(
          B,
          {
            type: "source",
            position: U.Right,
            id: "out",
            className: j("image")
          }
        )
      ]
    }
  );
}
const Qn = (e) => e.stopPropagation(), Zn = I(
  "h-[38px] w-[38px] shrink-0 overflow-hidden rounded border border-border bg-surface-inset",
  "p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
);
function Yt({
  images: e,
  max: n = 4,
  "data-testid": r = "node-thumb-strip"
}) {
  const i = Pe(), [a, s] = S(null);
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
          className: Zn,
          onMouseDown: Qn,
          onClick: p(f),
          children: /* @__PURE__ */ t(
            "img",
            {
              src: i(u.imageId),
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
            Zn,
            "flex items-center justify-center font-mono text-[11px] font-medium text-text-secondary"
          ),
          onMouseDown: Qn,
          onClick: p(c.length),
          children: [
            "+",
            l
          ]
        }
      )
    ] }),
    /* @__PURE__ */ t(
      yt,
      {
        images: e.map((u) => ({
          src: i(u.imageId),
          alt: u.alt,
          caption: u.alt
        })),
        openIndex: a,
        onClose: () => s(null),
        onNavigate: s
      }
    )
  ] });
}
function ti(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.images ?? [], u = a?.output?.filename ?? null, f = l.length > 0 ? /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ t(Yt, { images: l, "data-testid": "save-thumb-strip" }),
    u && /* @__PURE__ */ t(
      "div",
      {
        className: "mt-1 text-[10px] font-mono text-[#6b7280] overflow-hidden text-ellipsis whitespace-nowrap",
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
        "border border-dashed border-[#d1d5db] bg-[#f3f4f6]",
        "text-[11px] text-[#6b7280]"
      ),
      "data-testid": "save-placeholder",
      children: "Awaiting input"
    }
  ), h = r.filenameTemplate ?? "crop-{{scatter.index}}.png", g = h.length > 28 ? `${h.slice(0, 25)}…` : h, x = /* @__PURE__ */ t(
    "span",
    {
      className: "font-mono text-[11px] text-[#6b7280]",
      "data-testid": "save-footer",
      title: h,
      children: g
    }
  ), m = "image:save", v = `Save node, template: ${h}, state: ${c}`;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "⬇",
      subtitle: m,
      state: c,
      category: ge("image:save"),
      body: f,
      footer: x,
      selected: i,
      ariaLabel: v,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(
          B,
          {
            type: "target",
            position: U.Left,
            id: "in",
            className: j("image")
          }
        ),
        /* @__PURE__ */ t(
          B,
          {
            type: "source",
            position: U.Right,
            id: "out",
            className: j("image")
          }
        ),
        /* @__PURE__ */ t(
          B,
          {
            type: "source",
            position: U.Right,
            id: "error",
            className: `${j("error")} !top-[75%]`
          }
        )
      ]
    }
  );
}
function ni(e) {
  return e ? e.length > 40 ? `${e.slice(0, 37)}…` : e : "Not configured";
}
function ri(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.output, p = Array.isArray(l?.items) ? l.items.length : null, u = /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary break-all", children: ni(r.itemsPath ?? "") }),
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
  ] }) : void 0, g = r.itemAlias ? ` · alias: ${r.itemAlias}` : "", x = r.maxConcurrency ? ` · max ${r.maxConcurrency}` : "", m = `scatter${g}${x}`, v = `Scatter node, path: ${r.itemsPath ?? "not set"}, state: ${c}`;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "⑂",
      subtitle: m,
      state: c,
      category: ge("scatter"),
      body: u,
      footer: h,
      selected: i,
      ariaLabel: v,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("control") })
      ]
    }
  );
}
function oi(e) {
  const { id: n, data: r, selected: i } = e, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.width != null && r.height != null ? `→ ${r.width}×${r.height}` : r.width != null ? `→ ${r.width}w` : r.height != null ? `→ ${r.height}h` : null, f = p ? /* @__PURE__ */ t(
    "img",
    {
      src: a(p.imageId),
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
    be,
    {
      icon: "⥂",
      subtitle: "image:resize",
      state: l,
      category: ge("image:resize"),
      body: f,
      footer: h,
      selected: i,
      ariaLabel: `Resize node, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function ai(e) {
  switch (e.op) {
    case "rotate":
      return `rotate ${e.degrees}°`;
    case "flip":
      return "flip ↕";
    case "flop":
      return "flop ↔";
  }
}
function ii(e) {
  const { id: n, data: r, selected: i } = e, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.operations ?? [], f = u.length > 0 ? u.map(ai).join("  ›  ") : null, h = p ? /* @__PURE__ */ t(
    "img",
    {
      src: a(p.imageId),
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
    be,
    {
      icon: "↻",
      subtitle: "image:transform",
      state: l,
      category: ge("image:transform"),
      body: h,
      footer: g,
      selected: i,
      ariaLabel: `Transform node, ops: ${u.length}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function si(e) {
  const n = e.format?.toUpperCase() ?? "?", r = e.lossless ? "lossless" : e.quality != null ? `q${e.quality}` : "";
  return r ? `${n} ${r}` : n;
}
function li(e) {
  const { id: n, data: r, selected: i } = e, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.format ? si(r) : null, f = p ? /* @__PURE__ */ t(
    "img",
    {
      src: a(p.imageId),
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
    be,
    {
      icon: "⇌",
      subtitle: "image:format-convert",
      state: l,
      category: ge("image:format-convert"),
      body: f,
      footer: h,
      selected: i,
      ariaLabel: `Format Convert node, format: ${r.format ?? "unset"}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function ci(e) {
  const { id: n, data: r, selected: i } = e, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.sigma != null ? `σ ${r.sigma}` : null, f = p ? /* @__PURE__ */ t(
    "img",
    {
      src: a(p.imageId),
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
    be,
    {
      icon: "◈",
      subtitle: "image:sharpen",
      state: l,
      category: ge("image:sharpen"),
      body: f,
      footer: h,
      selected: i,
      ariaLabel: `Sharpen node, sigma: ${r.sigma ?? "default"}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function di(e) {
  const { id: n, data: r, selected: i } = e, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.gravity ?? "southeast", f = r.opacity != null ? `${Math.round(r.opacity * 100)}%` : "100%", h = p ? /* @__PURE__ */ t(
    "img",
    {
      src: a(p.imageId),
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
    be,
    {
      icon: "⊕",
      subtitle: "image:watermark",
      state: l,
      category: ge("image:watermark"),
      body: h,
      footer: g,
      selected: i,
      ariaLabel: `Watermark node, gravity: ${u}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function pi(e) {
  if (!e) return null;
  const n = e.x + e.width, r = e.y + e.height;
  return `[${e.x},${e.y} → ${n},${r}]`;
}
function ui(e) {
  const { id: n, data: r, selected: i } = e, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = s?.output, f = pi(p?.bbox ?? u?.bbox), h = p ? /* @__PURE__ */ t(
    "img",
    {
      src: a(p.imageId),
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
    be,
    {
      icon: "✂",
      subtitle: "image:crop",
      state: l,
      category: ge("image:crop"),
      body: h,
      footer: g,
      selected: i,
      ariaLabel: x,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("image") })
      ]
    }
  );
}
function mi(e) {
  const { id: n, data: r, selected: i } = e, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ t("div", { className: "flex gap-1 w-full", children: /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
    /* @__PURE__ */ t(
      "img",
      {
        src: a(p.imageId),
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
    be,
    {
      icon: "◐",
      subtitle: "image:adjust-bw",
      state: l,
      category: ge("image:adjust-bw"),
      body: u,
      footer: g,
      selected: i,
      ariaLabel: x,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[75%]` })
      ]
    }
  );
}
function hi(e) {
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
function fi(e) {
  const { id: n, data: r, selected: i } = e, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.layers ?? [], f = p ? /* @__PURE__ */ t(
    "img",
    {
      src: a(p.imageId),
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
          children: hi(x)
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
    be,
    {
      icon: "𝍩",
      subtitle: "image:adjust-layer",
      state: l,
      category: ge("image:adjust-layer"),
      body: f,
      footer: h,
      selected: i,
      ariaLabel: g,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[75%]` })
      ]
    }
  );
}
function gi(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.output ?? void 0, p = l?.genWidth != null && l?.genHeight != null ? `${l.genWidth}×${l.genHeight}` : null, u = p ? /* @__PURE__ */ o(
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
    be,
    {
      icon: "📐",
      subtitle: "image:dimensions",
      state: c,
      category: ge("image:dimensions"),
      body: u,
      footer: f,
      selected: i,
      ariaLabel: `Dimensions node, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function xi(e) {
  const { id: n, data: r, selected: i } = e, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = `≤ ${r.maxEdge ?? 1024}px → 4×`, f = p ? /* @__PURE__ */ t(
    "img",
    {
      src: a(p.imageId),
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
    be,
    {
      icon: "⤢",
      subtitle: "image:upscale",
      state: l,
      category: ge("image:upscale"),
      body: f,
      footer: h,
      selected: i,
      ariaLabel: `Upscale node, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function bi(e) {
  return e === 0 ? "$0" : e < 1e-3 ? "<$0.001" : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function yi(e) {
  if (!e || e.trim().length === 0) return "Not configured";
  const r = e.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
const vi = (e) => e.stopPropagation(), wi = Bo(function({ info: n }) {
  const [r, i] = S(!1), [a, s] = S(!1);
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
        onClick: () => i((u) => !u),
        className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] text-text-secondary font-medium text-left",
        children: [
          r ? "▾" : "▸",
          " ",
          n.streaming ? "Streaming" : "Response",
          typeof n.costUsd == "number" && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", "data-testid": "vision-cost", title: "Cost based on model usage rate", children: [
            "· ",
            bi(n.costUsd)
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
          onMouseDown: vi,
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
        yt,
        {
          images: [{ src: n.getImageUrl(n.imageId), alt: "Vision input", caption: "Vision input" }],
          openIndex: a ? 0 : null,
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
function Ni(e) {
  const { id: n, data: r, selected: i } = e, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = Oe(), u = l === "failed" ? () => p(n) : void 0, f = /* @__PURE__ */ t("span", { className: "italic text-text-secondary text-[13px]", children: yi(r.userPrompt) }), h = s?.vision, g = l === "running" && h !== void 0 && h.tokensSeen > 0 && !h.analyzed, x = l === "running" && h !== void 0 && h.tokensSeen === 0 && !h.failure, m = h ? {
    response: h.response,
    tokensIn: h.tokensIn,
    tokensOut: h.tokensOut,
    streaming: g,
    awaiting: x,
    ...h.failure ? { failure: h.failure } : {},
    ...h.imageId ? { imageId: h.imageId } : {},
    ...typeof h.costUsd == "number" ? { costUsd: h.costUsd } : {},
    ...u ? { onRetry: u } : {},
    getImageUrl: a
  } : void 0, v = m ? /* @__PURE__ */ t(wi, { info: m }) : void 0, w = r.model || "claude-sonnet-4-6", b = r.outputSchema ? "extract" : "caption", N = `Vision node, model ${w}, mode ${b}, state: ${l}`;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "📷",
      subtitle: `${w} · ${b}`,
      state: l,
      category: ge("image:vision-analyze"),
      body: f,
      footer: v,
      selected: i,
      onRetry: u,
      ariaLabel: N,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("data") })
      ]
    }
  );
}
function ki(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.output, p = l?.extracted?.label, u = l?.extracted?.confidence, f = (r.labels ?? []).slice(0, 4).join(", "), h = p ? /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 py-0.5", children: [
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
    be,
    {
      icon: "🏷",
      subtitle: g,
      state: c,
      category: ge("image:vision-classify"),
      body: h,
      selected: i,
      ariaLabel: `Vision Classify node, model: ${g}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ci(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", p = a?.output?.extracted?.caption, u = p ? p.length > 80 ? `${p.slice(0, 77)}…` : p : null, f = r.userPrompt ? r.userPrompt.length > 60 ? `${r.userPrompt.slice(0, 57)}…` : r.userPrompt : "No prompt set", h = u ? /* @__PURE__ */ t(
    "span",
    {
      className: "text-[11px] text-text-primary leading-snug",
      "data-testid": "describe-caption",
      children: u
    }
  ) : /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary italic", children: f }), g = r.model ?? "claude-haiku-4-5";
  return /* @__PURE__ */ o(
    be,
    {
      icon: "💬",
      subtitle: g,
      state: c,
      category: ge("image:vision-describe"),
      body: h,
      selected: i,
      ariaLabel: `Vision Describe node, model: ${g}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ii(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", u = (a?.output?.extracted?.tags ?? []).slice(0, 5), f = (r.candidateTags ?? []).slice(0, 3).join(", "), h = u.length > 0 ? /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", "data-testid": "tag-pills", children: u.map((x) => /* @__PURE__ */ t(
    "span",
    {
      className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded-full px-1.5 py-0.5 text-text-secondary whitespace-nowrap",
      children: x
    },
    x
  )) }) : /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary italic", children: f ? `Candidates: ${f}…` : "Open-vocabulary tagging" }), g = r.model ?? "claude-haiku-4-5";
  return /* @__PURE__ */ o(
    be,
    {
      icon: "🔖",
      subtitle: g,
      state: c,
      category: ge("image:vision-tag"),
      body: h,
      selected: i,
      ariaLabel: `Vision Tag node, model: ${g}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Si(e) {
  const { id: n, data: r, selected: i } = e, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", p = a?.output?.extracted?.lines ?? [], u = p[0], f = p.length > 0 ? /* @__PURE__ */ o("div", { "data-testid": "extract-text-result", children: [
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
    be,
    {
      icon: "📝",
      subtitle: h,
      state: c,
      category: ge("image:vision-extract-text"),
      body: f,
      selected: i,
      ariaLabel: `Vision Extract Text node, model: ${h}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ti(e) {
  return !e || !e.trim() ? "No prompt set" : e.length > 80 ? `${e.slice(0, 77)}…` : e;
}
const $i = (e) => e.stopPropagation();
function Ri(e) {
  const { id: n, data: r, selected: i } = e, a = Pe(), [s, d] = S(!1), c = he(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", f = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && f.length === 0, x = (r.numImages ?? 1) > 1 || f.length > 1;
  let m;
  if (f.length > 0 && x)
    m = /* @__PURE__ */ t(Yt, { images: f, "data-testid": "generate-thumb-strip" });
  else if (g || f.length === 1) {
    const N = f[0] ? a(f[0].imageId) : void 0;
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
          onMouseDown: $i,
          onClick: (y) => {
            y.stopPropagation(), N && d(!0);
          },
          children: /* @__PURE__ */ t(
            Pn,
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
        yt,
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
        children: Ti(r.prompt)
      }
    );
  const v = (r.numImages ?? 1) > 1 ? `×${r.numImages}` : null, w = r.width && r.height ? `${r.width}×${r.height}` : null, b = v || w ? /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-tertiary", children: [w, v].filter(Boolean).join(" · ") }) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "✦",
      subtitle: "image:generate",
      state: u,
      category: ge("image:generate"),
      body: m,
      footer: b,
      selected: i,
      ariaLabel: `Generate node, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
const Ai = (e) => e.stopPropagation();
function Pi(e) {
  const { id: n, data: r, selected: i } = e, a = Pe(), [s, d] = S(!1), c = he(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", f = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && f.length === 0, x = r.numVariations ?? 1, m = x > 1 || f.length > 1, v = /* @__PURE__ */ o("span", { className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary mb-1", children: [
    "×",
    x,
    " variation",
    x !== 1 ? "s" : ""
  ] });
  let w;
  if (f.length > 0 && m)
    w = /* @__PURE__ */ t(Yt, { images: f, "data-testid": "variation-thumb-strip" });
  else if (g || f.length === 1) {
    const y = f[0] ? a(f[0].imageId) : void 0;
    w = /* @__PURE__ */ o(H, { children: [
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
          onMouseDown: Ai,
          onClick: (k) => {
            k.stopPropagation(), y && d(!0);
          },
          children: /* @__PURE__ */ t(
            Pn,
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
        yt,
        {
          images: [{ src: y, alt: "Variation output" }],
          openIndex: s ? 0 : null,
          onClose: () => d(!1)
        }
      )
    ] });
  } else
    w = /* @__PURE__ */ t(
      "div",
      {
        className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
        "data-testid": "variation-placeholder",
        children: "Awaiting input"
      }
    );
  const b = /* @__PURE__ */ o("div", { children: [
    v,
    w
  ] }), N = r.similarity != null ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "similarity ",
    r.similarity
  ] }) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "⊞",
      subtitle: "image:variation",
      state: u,
      category: ge("image:variation"),
      body: b,
      footer: N,
      selected: i,
      ariaLabel: `Variation node, ${x} variations, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Mi(e) {
  return !e || !e.trim() ? "No prompt set" : e.length > 80 ? `${e.slice(0, 77)}…` : e;
}
const Di = (e) => e.stopPropagation();
function Ei(e) {
  const { id: n, data: r, selected: i } = e, a = Pe(), [s, d] = S(!1), c = he(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", f = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && f.length === 0, x = f.length > 1;
  let m;
  if (x)
    m = /* @__PURE__ */ t(Yt, { images: f, "data-testid": "edit-prompt-thumb-strip" });
  else if (g || f.length === 1) {
    const w = f[0] ? a(f[0].imageId) : void 0;
    m = /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          "data-testid": "edit-prompt-output-preview",
          "aria-label": w ? "View edited image" : "Image synthesizing",
          className: I(
            "block w-full rounded-md border-none bg-transparent p-0",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-info",
            w ? "cursor-zoom-in" : "cursor-default"
          ),
          onMouseDown: Di,
          onClick: (b) => {
            b.stopPropagation(), w && d(!0);
          },
          children: /* @__PURE__ */ t(
            Pn,
            {
              status: g ? "synthesizing" : "done",
              ...w ? { src: w } : {},
              alt: "Edit output",
              ...g && Number.isFinite(h) ? { startedAt: h } : {},
              className: "w-full h-20"
            }
          )
        }
      ),
      w && /* @__PURE__ */ t(
        yt,
        {
          images: [{ src: w, alt: "Edit output" }],
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
        children: Mi(r.prompt)
      }
    );
  const v = r.maskImagePath ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "mask: ",
    r.maskImagePath
  ] }) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "✎",
      subtitle: "image:edit-prompt",
      state: u,
      category: ge("image:edit-prompt"),
      body: m,
      footer: v,
      selected: i,
      ariaLabel: `Edit Prompt node, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
const Oi = {
  trigger: Ra,
  llm: Ma,
  transform: Ea,
  condition: _a,
  action: Ba,
  fork: Ua,
  join: za,
  approval: Wa,
  agent: Va,
  "mcp-tool": Ka,
  "knowledge-base": Ha,
  "graph-query": Ja,
  memory: Ga,
  guardrail: Ya,
  policy: Xa,
  "ag-ui-output": Qa,
  "image-source": ei,
  "image:save": ti,
  scatter: ri,
  "image:resize": oi,
  "image:transform": ii,
  "image:format-convert": li,
  "image:sharpen": ci,
  "image:watermark": di,
  "image:crop": ui,
  "image:adjust-bw": mi,
  "image:adjust-layer": fi,
  "image:dimensions": gi,
  "image:upscale": xi,
  "image:vision-analyze": Ni,
  "image:vision-classify": ki,
  "image:vision-describe": Ci,
  "image:vision-tag": Ii,
  "image:vision-extract-text": Si,
  "image:generate": Ri,
  "image:variation": Pi,
  "image:edit-prompt": Ei
}, _i = "#c4b5fd";
function Li(e) {
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
function Bi({
  id: e,
  sourceX: n,
  sourceY: r,
  targetX: i,
  targetY: a,
  sourcePosition: s,
  targetPosition: d,
  data: c,
  markerEnd: l,
  selected: p
}) {
  const u = c ?? {}, f = On(), [h, g, x] = aa({
    sourceX: n,
    sourceY: r,
    targetX: i,
    targetY: a,
    sourcePosition: s,
    targetPosition: d
  }), m = Li(u.state), v = (u.state ?? "default") === "default", w = u.payload, b = m.animate && !f;
  let N = m.stroke, y = m.strokeWidth, k = b ? m.strokeDasharray : void 0;
  w === "image" ? (y = 2.5, v && (N = _i)) : w === "control" && (y = 1.5, v && (k = "2 4"));
  const C = u.volume, T = typeof C == "number" && C >= 2;
  T && (y = Math.min(4, y + Math.log2(C)));
  const D = p ? "#646cff" : N, P = p ? Math.max(2.5, y) : y, M = w === "image" && u.state === "active" && !f;
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
        stroke: D,
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
    M ? /* @__PURE__ */ t("circle", { r: 3, fill: D, className: "pointer-events-none", children: /* @__PURE__ */ t("animateMotion", { dur: "1.2s", repeatCount: "indefinite", path: h }) }) : null,
    u.label ? /* @__PURE__ */ t(Yn, { children: /* @__PURE__ */ t(
      "div",
      {
        className: I(
          "absolute pointer-events-auto px-2 py-0.5 rounded-full text-[10px] font-semibold leading-[1.4]",
          "bg-white text-[#475569] border border-[#e2e8f0] font-[inherit] whitespace-nowrap",
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
    T ? /* @__PURE__ */ t(Yn, { children: /* @__PURE__ */ t(
      "div",
      {
        className: I(
          "absolute pointer-events-none px-1.5 py-px rounded-full text-[9px] font-semibold leading-[1.4]",
          "bg-white text-[#475569] border border-[#e2e8f0] font-[inherit] whitespace-nowrap",
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
function ht(e, n, r) {
  const i = ce(n);
  i.current = n, oe(() => {
    if (r === !1) return;
    const a = (s) => {
      e.current && !e.current.contains(s.target) && i.current();
    };
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [e, r]);
}
const Ui = [
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
function ji(e, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return e.type.toLowerCase().includes(r) || e.name.toLowerCase().includes(r) || e.description.toLowerCase().includes(r);
}
function Fi({
  anchor: e,
  flowPosition: n,
  disabledTypes: r = [],
  onClose: i,
  onInsert: a
}) {
  const [s, d] = S(""), [c, l] = S(0), p = ce(null), u = ce(null), f = W(() => new Set(r), [r]), h = W(
    () => Ui.filter((m) => !f.has(m.type) && ji(m, s)),
    [f, s]
  );
  if (oe(() => {
    l((m) => m >= h.length ? 0 : m);
  }, [h.length]), oe(() => {
    if (e) {
      const m = setTimeout(() => u.current?.focus(), 0);
      return () => clearTimeout(m);
    }
  }, [e]), ht(p, i, !!e), !e) return null;
  const g = (m) => {
    const v = h[m];
    !v || !n || (a(v.type, n), i());
  }, x = (m) => {
    if (m.key === "ArrowDown") {
      if (m.preventDefault(), h.length === 0) return;
      l((v) => (v + 1) % h.length);
    } else if (m.key === "ArrowUp") {
      if (m.preventDefault(), h.length === 0) return;
      l((v) => (v - 1 + h.length) % h.length);
    } else m.key === "Enter" ? (m.preventDefault(), g(c)) : m.key === "Escape" && (m.preventDefault(), i());
  };
  return /* @__PURE__ */ o(
    "div",
    {
      ref: p,
      className: "fixed w-[260px] bg-white border border-[#e2e8f0] rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] z-50 flex flex-col overflow-hidden font-inherit",
      style: { top: e.y, left: e.x },
      role: "dialog",
      "aria-label": "Quick insert node",
      "data-testid": "quick-insert-popover",
      children: [
        /* @__PURE__ */ t("div", { className: "p-2 border-b border-[#e2e8f0]", children: /* @__PURE__ */ t(
          "input",
          {
            ref: u,
            type: "text",
            value: s,
            onChange: (m) => d(m.target.value),
            onKeyDown: x,
            placeholder: "Search nodes…",
            className: "w-full box-border border border-[#d1d5db] rounded-md px-2.5 py-1.5 text-[13px] font-inherit bg-[#f9fafb] text-[#0f172a] outline-none",
            "aria-label": "Search node types",
            "data-testid": "quick-insert-search"
          }
        ) }),
        /* @__PURE__ */ t("div", { className: "max-h-[260px] overflow-y-auto py-1", role: "listbox", children: h.length === 0 ? /* @__PURE__ */ o("div", { className: "px-3 py-3.5 text-xs text-[#94a3b8] font-inherit", children: [
          'No nodes match "',
          s,
          '"'
        ] }) : h.map((m, v) => {
          const w = v === c;
          return /* @__PURE__ */ o(
            "div",
            {
              role: "option",
              "aria-selected": w,
              onMouseEnter: () => l(v),
              onMouseDown: (b) => {
                b.preventDefault(), g(v);
              },
              className: I(
                "flex items-center gap-2.5 px-3 py-2 cursor-pointer font-inherit",
                w ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              "data-node-type": m.type,
              "data-testid": `quick-insert-row-${m.type}`,
              children: [
                /* @__PURE__ */ t("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: m.icon }),
                /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-[#0f172a]", children: m.name }),
                  /* @__PURE__ */ t("div", { className: "text-[11px] text-[#475569] whitespace-nowrap overflow-hidden text-ellipsis", children: m.description })
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
function zi({
  addNode: e,
  addEdge: n,
  updateNodeData: r,
  getDefinition: i
}) {
  oe(() => {
  }, [e, n, r, i]);
}
function qi({
  definition: e,
  selectedNodeId: n,
  setSelectedNodeId: r,
  removeNode: i,
  removeDefEdge: a,
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
      if (jn(x.target)) return;
      const m = document.activeElement, v = !!m && f.contains(m);
      if (x.key === "Tab") {
        if (!v || !e || e.nodes.length === 0) return;
        const w = ds(e);
        if (w.length === 0) return;
        const N = m?.closest(".react-flow__node")?.getAttribute("data-id") ?? null, y = N !== null ? w.indexOf(N) : -1, k = x.shiftKey ? -1 : 1, C = y === -1 ? x.shiftKey ? w.length - 1 : 0 : (y + k + w.length) % w.length, T = w[C];
        h(T) && x.preventDefault();
        return;
      }
      if (v && !x.altKey) {
        if (x.key === "Enter" || x.key === " " || x.key === "Spacebar") {
          const b = m?.closest(".react-flow__node")?.getAttribute("data-id");
          b && (x.preventDefault(), r(b));
          return;
        }
        if (x.key === "Delete" || x.key === "Backspace") {
          if (n) {
            x.preventDefault(), i(n);
            return;
          }
          d((w) => {
            const b = w.filter((N) => N.selected);
            if (b.length === 0) return w;
            for (const N of b) a(N.id);
            return w.filter((N) => !N.selected);
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
          const w = l([p.current]);
          w.length > 0 && r(w[0]);
          return;
        }
        if ((x.metaKey || x.ctrlKey) && x.key === "d" && n) {
          x.preventDefault();
          const w = l([n]);
          w.length > 0 && r(w[0]);
          return;
        }
        if (x.key === "ArrowUp" || x.key === "ArrowDown" || x.key === "ArrowLeft" || x.key === "ArrowRight") {
          if (x.preventDefault(), x.stopPropagation(), !x.shiftKey || !n) return;
          const w = 8, b = x.key === "ArrowLeft" ? -w : x.key === "ArrowRight" ? w : 0, N = x.key === "ArrowUp" ? -w : x.key === "ArrowDown" ? w : 0;
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
  }, [e, n, r, i, a, s, d, c, l, p, u]);
}
function Wi({
  addNode: e,
  screenToFlowPosition: n
}) {
  const r = E((a) => {
    a.preventDefault(), a.dataTransfer.dropEffect = "move";
  }, []), i = E(
    (a) => {
      a.preventDefault();
      const s = a.dataTransfer.getData("application/reactflow");
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
        x: a.clientX,
        y: a.clientY
      });
      e(c, l);
    },
    [e, n]
  );
  return { handleDragOver: r, handleDrop: i };
}
function Vi({
  nodeMenu: e,
  breakpoints: n,
  showBreakpointOption: r,
  onFilterLog: i,
  onCopyNodeId: a,
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
      className: "fixed bg-white border border-[#e2e8f0] rounded-md shadow-[0_8px_20px_rgba(15,23,42,0.16)] min-w-[220px] z-50 p-1 font-inherit",
      style: { top: e.y, left: e.x },
      children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: i,
            "data-testid": "ctx-filter-log",
            className: I(l, "text-[#0f172a]"),
            children: "🎯 Filter log to this node"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: a,
            "data-testid": "ctx-copy-id",
            className: I(l, "text-[#0f172a]"),
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
            className: I(l, "text-[#0f172a]"),
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
              n?.has(e.nodeId) ? "text-[#dc2626]" : "text-[#0f172a]"
            ),
            children: n?.has(e.nodeId) ? "🔴 Remove Breakpoint" : "🔴 Toggle Breakpoint"
          }
        ) : null
      ]
    }
  );
}
const Ki = [
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
], Hi = [
  { key: "source", name: "Sources" },
  { key: "transform", name: "Transform" },
  { key: "ai", name: "AI" },
  { key: "control", name: "Control" },
  { key: "sink", name: "Sinks" },
  { key: "human", name: "Human" }
], tn = {
  source: "bg-cat-source",
  transform: "bg-cat-transform",
  ai: "bg-cat-ai",
  control: "bg-cat-control",
  sink: "bg-cat-sink",
  human: "bg-cat-human"
}, $t = Hi.map(({ key: e, name: n }) => ({
  key: e,
  name: n,
  items: Ki.filter((r) => ge(r.type) === e).map((r) => ({ ...r, category: n, nodeCategory: e }))
})).filter((e) => e.items.length > 0), Ji = $t.flatMap((e) => e.items.map((n) => ({ type: n.type, name: n.name }))), Gi = $t.map((e) => e.name), Un = "pipeline.palette.recents", Yi = 5, er = "pipeline.palette.compact";
function kn() {
  if (typeof window > "u") return [];
  try {
    const e = window.localStorage.getItem(Un);
    if (!e) return [];
    const n = JSON.parse(e);
    return Array.isArray(n) ? n : [];
  } catch {
    return [];
  }
}
function Xi(e) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(Un, JSON.stringify(e));
    } catch {
    }
}
function rh(e) {
  const n = kn().filter((i) => i !== e), r = [e, ...n].slice(0, Yi);
  Xi(r);
}
const ho = "pipeline.palette.collapsed.";
function Qi(e) {
  if (typeof window > "u") return !1;
  try {
    return window.localStorage.getItem(ho + e) === "true";
  } catch {
    return !1;
  }
}
function Zi(e, n) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(ho + e, String(n));
    } catch {
    }
}
function es(e, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return e.name.toLowerCase().includes(r) || e.type.toLowerCase().includes(r) || e.description.toLowerCase().includes(r);
}
function tr({ expanded: e }) {
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
function ts({ disabledTypes: e = [] }) {
  const [n, r] = S(""), [i, a] = S(/* @__PURE__ */ new Set()), [s, d] = S(null), [c, l] = S(() => kn()), [p, u] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem(er) === "true";
    } catch {
      return !1;
    }
  }), [f, h] = S(() => {
    const R = {};
    for (const J of $t)
      R[J.name] = Qi(J.name);
    return R;
  }), g = W(() => new Set(e), [e]);
  oe(() => {
    const R = (J) => {
      J.key === Un && l(kn());
    };
    return window.addEventListener("storage", R), () => window.removeEventListener("storage", R);
  }, []), oe(() => {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(er, String(p));
      } catch {
      }
  }, [p]);
  const x = E((R) => {
    a((J) => {
      const Q = new Set(J);
      return Q.has(R) ? Q.delete(R) : Q.add(R), Q;
    });
  }, []), m = E(() => {
    r(""), a(/* @__PURE__ */ new Set());
  }, []), v = E((R) => {
    h((J) => {
      const Q = { ...J, [R]: !J[R] };
      return Zi(R, Q[R]), Q;
    });
  }, []), w = W(() => {
    const R = /* @__PURE__ */ new Map();
    for (const J of $t)
      for (const Q of J.items) R.set(Q.type, Q);
    return R;
  }, []), b = W(
    () => c.map((R) => w.get(R)).filter(Boolean),
    [c, w]
  ), N = W(() => $t.map((R) => {
    const J = i.size > 0 && !i.has(R.name) ? [] : R.items.filter((Q) => es(Q, n));
    return { ...R, items: J };
  }).filter((R) => R.items.length > 0), [n, i]), y = W(() => {
    const R = /* @__PURE__ */ new Set(), J = [];
    if (!n && i.size === 0)
      for (const Q of b)
        J.push(Q), R.add(Q.type);
    for (const Q of N)
      for (const G of Q.items)
        R.has(G.type) || (J.push(G), R.add(G.type));
    return J;
  }, [b, N, n, i]), k = ce(y);
  oe(() => {
    k.current = y;
  }, [y]);
  const C = N.length === 0 && (n !== "" || i.size > 0), T = (R) => (J) => {
    if (g.has(R.type)) {
      J.preventDefault();
      return;
    }
    J.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: R.type })
    ), J.dataTransfer.effectAllowed = "move";
  }, D = eo(), P = (R, J) => {
    const Q = g.has(R.type), G = !D(R.type), Z = s === R.type && !Q, O = J !== null && J < 9 ? J + 1 : null;
    return p ? /* @__PURE__ */ o(
      "div",
      {
        draggable: !Q,
        onDragStart: T(R),
        onMouseEnter: () => d(R.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-8 box-border my-px mx-2 px-2 flex items-center gap-2 rounded font-[inherit]",
          Q ? "cursor-not-allowed opacity-45" : "cursor-grab",
          Z ? "bg-surface-hover" : "bg-transparent"
        ),
        title: Q ? `${R.name} is already placed` : G ? `${R.name} — preview: this deployment has no executor for it yet, so the step will not run.` : O ? `${R.description} — press ${O}` : R.description,
        "data-preview": G || void 0,
        "data-node-type": R.type,
        "data-disabled": Q || void 0,
        "data-testid": `palette-item-${R.type}`,
        children: [
          /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": !0,
              "data-testid": `palette-accent-${R.type}`,
              className: I("w-1.5 h-1.5 rounded-full shrink-0", R.nodeCategory && tn[R.nodeCategory])
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-base leading-none w-5 text-center shrink-0", "aria-hidden": !0, children: R.icon }),
          /* @__PURE__ */ t("span", { className: I("text-[12px] font-medium text-text-primary truncate", Q && "line-through"), children: R.name }),
          O !== null && /* @__PURE__ */ t(
            "kbd",
            {
              "data-testid": `palette-shortcut-${R.type}`,
              className: I(
                "ml-auto text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                Q && "opacity-50"
              ),
              children: O
            }
          )
        ]
      },
      R.type
    ) : /* @__PURE__ */ o(
      "div",
      {
        draggable: !Q,
        onDragStart: T(R),
        onMouseEnter: () => d(R.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-11 box-border my-0.5 mx-2 py-1.5 px-2.5 flex items-center gap-2.5 rounded-md border border-transparent font-[inherit]",
          Q ? "cursor-not-allowed opacity-45" : "cursor-grab",
          Z ? "bg-surface-panel" : "bg-transparent"
        ),
        title: Q ? `${R.name} is already placed` : G ? `${R.name} — preview: this deployment has no executor for it yet, so the step will not run.` : O ? `${R.description} — press ${O}` : R.description,
        "data-preview": G || void 0,
        "data-node-type": R.type,
        "data-disabled": Q || void 0,
        "data-testid": `palette-item-${R.type}`,
        children: [
          /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": !0,
              "data-testid": `palette-accent-${R.type}`,
              className: I("w-1.5 h-1.5 rounded-full shrink-0", R.nodeCategory && tn[R.nodeCategory])
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: R.icon }),
          /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ o("div", { className: I("text-[13px] font-semibold text-text-primary flex items-center gap-1.5", Q && "line-through"), children: [
              /* @__PURE__ */ t("span", { className: "truncate", children: R.name }),
              G && /* @__PURE__ */ t(
                "span",
                {
                  "data-testid": `palette-preview-${R.type}`,
                  className: "shrink-0 rounded-full border border-warning-border bg-warning-bg px-1.5 text-[9px] font-semibold uppercase tracking-wide text-warning-fg",
                  title: "No executor handler in this deployment",
                  children: "preview"
                }
              ),
              O !== null && /* @__PURE__ */ t(
                "kbd",
                {
                  "data-testid": `palette-shortcut-${R.type}`,
                  className: I(
                    "text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                    Q && "opacity-50"
                  ),
                  children: O
                }
              )
            ] }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-neutral truncate", children: Q ? "Placed" : G ? "Preview — no executor" : R.description })
          ] })
        ]
      },
      R.type
    );
  }, M = b.length > 0 && !n && i.size === 0;
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
                onChange: (R) => r(R.target.value),
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
                onClick: () => u((R) => !R),
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
              children: Gi.map((R) => /* @__PURE__ */ t(
                da,
                {
                  size: "xs",
                  active: i.has(R),
                  onClick: () => x(R),
                  "data-testid": `palette-chip-${R}`,
                  children: R
                },
                R
              ))
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto py-1", "data-testid": "palette-scroll", children: [
          M && /* @__PURE__ */ o("div", { "data-testid": "palette-recents", children: [
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: () => v("__recents__"),
                className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
                "aria-expanded": !f.__recents__,
                children: [
                  /* @__PURE__ */ t(tr, { expanded: !f.__recents__ }),
                  "Recently used"
                ]
              }
            ),
            !f.__recents__ && /* @__PURE__ */ t("div", { children: b.map((R) => {
              const J = re++;
              return P(R, J);
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
          ) : N.map((R) => {
            const J = !!f[R.name];
            return /* @__PURE__ */ o("div", { "data-testid": `palette-category-${R.name}`, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => v(R.name),
                  className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
                  "aria-expanded": !J,
                  children: [
                    /* @__PURE__ */ t(tr, { expanded: !J }),
                    /* @__PURE__ */ t(
                      "span",
                      {
                        "aria-hidden": !0,
                        "data-testid": `palette-section-accent-${R.key}`,
                        className: I("w-1.5 h-1.5 rounded-full shrink-0", tn[R.key])
                      }
                    ),
                    R.name
                  ]
                }
              ),
              !J && /* @__PURE__ */ t("div", { children: R.items.map((Q) => {
                const G = re++;
                return P(Q, G);
              }) })
            ] }, R.name);
          })
        ] }),
        /* @__PURE__ */ t("div", { className: "py-2 px-3 border-t border-border text-[10px] text-text-tertiary font-[inherit] shrink-0", children: "Press 1–9 to insert at center" })
      ]
    }
  );
}
function ns({
  definition: e,
  addNode: n,
  screenToFlowPosition: r,
  containerRef: i
}) {
  return oe(() => {
    const a = (s) => {
      if (!jn(s.target) && !(s.metaKey || s.ctrlKey || s.altKey) && /^[1-8]$/.test(s.key)) {
        const d = Number(s.key) - 1, c = Ji[d];
        if (!c || c.type === "trigger" && e?.nodes.some((g) => g.type === "trigger"))
          return;
        const p = i.current?.getBoundingClientRect(), u = p ? r({
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
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [n, e, r, i]), null;
}
const rs = 280, os = 120, as = 40, is = 40;
function ss(e, n) {
  const r = rs, i = os, a = as, s = is;
  if (e.nodes.length === 0) return [];
  const d = /* @__PURE__ */ new Map();
  for (const v of e.nodes)
    d.set(v.id, []);
  for (const v of e.edges) {
    const w = d.get(v.source);
    w && d.has(v.target) && w.push(v.target);
  }
  const l = e.nodes.filter((v) => v.type === "trigger").map((v) => v.id).sort()[0], p = /* @__PURE__ */ new Map();
  if (l !== void 0) {
    const v = [l];
    for (p.set(l, 0); v.length > 0; ) {
      const w = v.shift(), b = p.get(w), N = d.get(w) ?? [];
      for (const y of N)
        p.has(y) || (p.set(y, b + 1), v.push(y));
    }
  }
  const u = /* @__PURE__ */ new Map();
  let f = -1;
  for (const v of e.nodes) {
    const w = p.get(v.id);
    w !== void 0 && (u.has(w) || u.set(w, []), u.get(w).push(v.id), w > f && (f = w));
  }
  for (const v of u.values())
    v.sort();
  const h = e.nodes.filter((v) => !p.has(v.id)).map((v) => v.id).sort(), g = f >= 0 ? f + 1 : 0;
  h.length > 0 && u.set(g, h);
  const x = [], m = [...u.keys()].sort((v, w) => v - w);
  for (const v of m) {
    const w = u.get(v), b = w.length, N = a + v * r;
    for (let y = 0; y < b; y++) {
      const k = s + (y - b / 2) * i;
      x.push({ id: w[y], position: { x: N, y: k } });
    }
  }
  return x;
}
function ls({
  definition: e,
  setPositions: n,
  fitView: r
}) {
  const i = E(() => {
    r({ padding: 0.15, duration: 500 });
  }, [r]), a = E(() => {
    if (!e) return;
    const s = ss(e);
    s.length !== 0 && (n(s), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => r({ padding: 0.15, duration: 500 })) : r({ padding: 0.15, duration: 500 }));
  }, [e, n, r]);
  return { handleFitView: i, handleAutoArrange: a };
}
function cs({
  definition: e,
  setPositions: n,
  fitView: r
}) {
  const { handleFitView: i, handleAutoArrange: a } = ls({
    definition: e,
    setPositions: n,
    fitView: r
  });
  return oe(() => {
    const s = (d) => {
      const c = d.target;
      if (!(c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable)) && d.shiftKey && (d.key === "A" || d.key === "a")) {
        if (d.metaKey || d.ctrlKey || d.altKey) return;
        d.preventDefault(), a();
      }
    };
    return window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s);
  }, [a]), /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: a,
        className: "absolute top-3 right-[50px] z-[5] w-8 h-8 inline-flex items-center justify-center bg-white border border-[#e2e8f0] rounded-md shadow-sm text-[#475569] cursor-pointer p-0 font-inherit text-sm leading-none",
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
        onClick: i,
        className: "absolute top-3 right-3 z-[5] w-8 h-8 inline-flex items-center justify-center bg-white border border-[#e2e8f0] rounded-md shadow-sm text-[#475569] cursor-pointer p-0 font-inherit text-sm leading-none",
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
const fo = 0.1, nr = { padding: 0.15, minZoom: fo, maxZoom: 1 };
function jn(e) {
  if (!e || !(e instanceof HTMLElement)) return !1;
  const n = e.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || e.isContentEditable);
}
function ds(e) {
  if (e.nodes.length === 0) return [];
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const s of e.nodes)
    n.set(s.id, []), r.set(s.id, 0);
  for (const s of e.edges)
    !n.has(s.source) || !r.has(s.target) || (n.get(s.source).push(s.target), r.set(s.target, (r.get(s.target) ?? 0) + 1));
  const i = [], a = e.nodes.filter((s) => (r.get(s.id) ?? 0) === 0).map((s) => s.id).sort();
  for (; a.length > 0; ) {
    const s = a.shift();
    i.push(s);
    const d = (n.get(s) ?? []).slice().sort();
    for (const c of d) {
      const l = (r.get(c) ?? 0) - 1;
      r.set(c, l), l === 0 && a.push(c);
    }
  }
  if (i.length < e.nodes.length) {
    const s = new Set(i), d = e.nodes.filter((c) => !s.has(c.id)).map((c) => c.id).sort();
    i.push(...d);
  }
  return i;
}
const ps = { animated: Bi }, us = Oi;
function ms(e) {
  return {
    id: e.id,
    type: e.type,
    position: e.position,
    data: { ...e.data, nodeType: e.type }
  };
}
function hs(e) {
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
function fs({ onFilterLog: e, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: i, replayNodeClasses: a, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c }) {
  const {
    definition: l,
    addNode: p,
    setPositions: u,
    addEdge: f,
    removeEdge: h,
    removeNode: g,
    duplicateNodes: x,
    selectedNodeId: m,
    setSelectedNodeId: v,
    updateNodeData: w
  } = Ke(), { screenToFlowPosition: b, fitView: N } = sa(), y = ce(!1), k = E((ee) => {
    ee && (y.current = !0);
  }, []);
  oe(() => {
    const ee = Z.current;
    if (!ee || typeof ResizeObserver > "u") return;
    let ie = { w: ee.clientWidth, h: ee.clientHeight };
    const ue = new ResizeObserver(() => {
      const xe = ee.clientWidth, $e = ee.clientHeight;
      xe === 0 || $e === 0 || Math.abs(xe - ie.w) < 2 && Math.abs($e - ie.h) < 2 || (ie = { w: xe, h: $e }, !y.current && N(nr));
    });
    return ue.observe(ee), () => ue.disconnect();
  }, [N]), zi({
    addNode: p,
    addEdge: f,
    updateNodeData: w,
    getDefinition: () => l
  });
  const [C, T, D] = so([]), [P, M, re] = lo([]), [R, J] = S(!0), [Q, G] = S(!0), Z = ce(null), O = ce(null), [A, Y] = S(null), [z, _] = S(null), V = E(
    (ee, ie) => {
      ee.preventDefault(), _({ nodeId: ie.id, x: ee.clientX, y: ee.clientY });
    },
    []
  ), K = E(() => {
    z && (e?.(z.nodeId), _(null));
  }, [z, e]), X = E(() => {
    if (!z) return;
    const ee = z.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(ee).catch(() => {
    }), _(null);
  }, [z]), me = E(() => {
    z && (d?.(z.nodeId), _(null));
  }, [z, d]), q = E(() => {
    if (!z) return;
    const ee = x([z.nodeId]);
    ee.length > 0 && v(ee[0]), _(null);
  }, [z, x, v]), de = E(() => _(null), []);
  oe(() => {
    if (!l) {
      T([]), M([]);
      return;
    }
    T((ee) => {
      const ie = new Map(ee.map((ue) => [ue.id, ue]));
      return l.nodes.map((ue) => {
        const xe = ie.get(ue.id), $e = ms(ue);
        return s && s.size > 0 && ($e.data._hasBreakpoint = s.has(ue.id)), c && ($e.data._pausedAtBreakpoint = ue.id === c), xe ? { ...xe, ...$e, selected: xe.selected } : $e;
      });
    }), M(() => l.edges.map(hs));
  }, [l, s, c, T, M]), oe(() => {
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
    a && T(
      (ee) => ee.map((ie) => {
        const ue = a[ie.id] ?? "", $e = [ie.id === n ? "node-error" : "", ue].filter(Boolean).join(" ") || void 0;
        let Ue;
        ue === "node-replay-active" ? Ue = "running" : ue === "node-replay-completed" ? Ue = "completed" : ue === "node-replay-failed" && (Ue = "failed");
        const $ = { ...ie.data };
        return Ue ? $._state = Ue : $._state = "idle", { ...ie, className: $e, data: $ };
      })
    );
  }, [a, n, T]), oe(() => {
    i && M(
      (ee) => ee.map((ie) => {
        const ue = i[ie.id];
        if (!ue) return ie;
        const xe = ie.data ?? {};
        return xe.state === ue ? ie : { ...ie, data: { ...xe, state: ue } };
      })
    );
  }, [i, M]);
  const ke = E(
    (ee) => {
      D(ee);
      const ie = [], ue = [];
      for (const xe of ee)
        xe.type === "position" && xe.position && xe.dragging === !1 ? ie.push({ id: xe.id, position: xe.position }) : xe.type === "remove" && ue.push(xe.id);
      ie.length && u(ie);
      for (const xe of ue) g(xe);
    },
    [D, u, g]
  ), Fe = E(
    (ee) => {
      re(ee);
      for (const ie of ee)
        ie.type === "remove" && h(ie.id);
    },
    [re, h]
  ), tt = E(
    (ee) => {
      if (!l || !ee.source || !ee.target) return;
      const ie = l.nodes.find((Ue) => Ue.id === ee.source), ue = l.nodes.find((Ue) => Ue.id === ee.target);
      if (!ie || !ue) return;
      const xe = ee.sourceHandle ?? "out", $e = ee.targetHandle ?? "in";
      Nn(
        ie.type,
        xe,
        ue.type,
        $e
      ) && f({
        source: ee.source,
        sourceHandle: xe,
        target: ee.target,
        targetHandle: $e
      });
    },
    [l, f]
  ), He = E(
    (ee) => {
      if (!l || !ee.source || !ee.target) return !1;
      const ie = l.nodes.find((xe) => xe.id === ee.source), ue = l.nodes.find((xe) => xe.id === ee.target);
      return !ie || !ue ? !1 : Nn(
        ie.type,
        ee.sourceHandle ?? "out",
        ue.type,
        ee.targetHandle ?? "in"
      );
    },
    [l]
  ), Be = E(
    (ee, ie) => {
      v(ie.id);
    },
    [v]
  ), Ge = E(() => {
    v(null);
  }, [v]), Je = E(
    (ee) => {
      const ie = ee.target;
      if (!ie || !(ie.classList.contains("react-flow__pane") || ie.classList.contains("react-flow__renderer") || ie.classList.contains("react-flow__viewport") || ie.classList.contains("react-flow"))) return;
      ee.preventDefault();
      const xe = b({ x: ee.clientX, y: ee.clientY });
      Y({
        anchor: { x: ee.clientX, y: ee.clientY },
        flowPosition: xe
      });
    },
    [b]
  ), Ye = E(() => Y(null), []), Te = E(
    (ee, ie) => {
      p(ee, ie);
    },
    [p]
  ), ye = W(() => l ? l.nodes.some((ee) => ee.type === "trigger") ? ["trigger"] : [] : [], [l]), { handleDragOver: se, handleDrop: Me } = Wi({
    addNode: p,
    screenToFlowPosition: b
  });
  oe(() => {
    const ee = (ie) => {
      if (!jn(ie.target) && !(ie.metaKey || ie.ctrlKey || ie.altKey)) {
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
  }, []), qi({
    definition: l,
    selectedNodeId: m,
    setSelectedNodeId: v,
    removeNode: g,
    removeDefEdge: h,
    setNodes: T,
    setEdges: M,
    setPositions: u,
    duplicateNodes: x,
    clipboardRef: O,
    containerRef: Z
  });
  const wt = E((ee) => {
    switch (ee.data?._state) {
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
  return /* @__PURE__ */ o(
    "div",
    {
      ref: Z,
      className: "flex-1 min-w-0 min-h-[520px] relative bg-[#fafbfc]",
      role: "application",
      "aria-label": "Pipeline editor canvas",
      tabIndex: 0,
      "data-testid": "pipeline-canvas",
      onDragOver: se,
      onDrop: Me,
      onDoubleClick: Je,
      children: [
        /* @__PURE__ */ o(
          co,
          {
            nodes: C,
            edges: P,
            nodeTypes: us,
            edgeTypes: ps,
            onNodesChange: ke,
            onEdgesChange: Fe,
            onConnect: tt,
            isValidConnection: He,
            onNodeClick: Be,
            onNodeContextMenu: V,
            onPaneClick: Ge,
            onMoveStart: k,
            fitView: !0,
            fitViewOptions: nr,
            minZoom: fo,
            snapToGrid: !0,
            snapGrid: [16, 16],
            edgesFocusable: !0,
            defaultEdgeOptions: { type: "smoothstep" },
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ t(
                po,
                {
                  variant: la.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              Q ? /* @__PURE__ */ t(
                uo,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              R ? /* @__PURE__ */ t(
                ca,
                {
                  position: "bottom-right",
                  pannable: !0,
                  zoomable: !0,
                  className: "!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]",
                  maskColor: "rgba(15, 23, 42, 0.04)",
                  nodeColor: wt,
                  nodeStrokeColor: "#e2e8f0"
                }
              ) : null
            ]
          }
        ),
        A ? /* @__PURE__ */ t(
          Fi,
          {
            anchor: A.anchor,
            flowPosition: A.flowPosition,
            disabledTypes: ye,
            onClose: Ye,
            onInsert: Te
          }
        ) : null,
        /* @__PURE__ */ t(
          ns,
          {
            definition: l,
            addNode: p,
            screenToFlowPosition: b,
            containerRef: Z
          }
        ),
        /* @__PURE__ */ t(
          cs,
          {
            definition: l,
            setPositions: u,
            fitView: N
          }
        ),
        z ? /* @__PURE__ */ t(
          Vi,
          {
            nodeMenu: z,
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
function gs({ onFilterLog: e, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: i, replayNodeClasses: a, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c } = {}) {
  return /* @__PURE__ */ t(ia, { children: /* @__PURE__ */ t(
    fs,
    {
      onFilterLog: e,
      errorNodeId: n,
      onErrorNodePosition: r,
      replayEdgeStates: i,
      replayNodeClasses: a,
      breakpoints: s,
      onToggleBreakpoint: d,
      pausedAtNodeId: c
    }
  ) });
}
const rr = {
  LLMError: { bg: "#fef2f2", fg: "#dc2626" },
  TimeoutError: { bg: "#fff7ed", fg: "#ea580c" },
  NetworkError: { bg: "#fffbeb", fg: "#d97706" },
  ValidationError: { bg: "#fefce8", fg: "#ca8a04" },
  RegistryConflict: { bg: "#faf5ff", fg: "#9333ea" },
  UnknownError: { bg: "#f1f5f9", fg: "#475569" }
};
function xs(e) {
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
function bs({ error: e, anchor: n, onDismiss: r, onRetry: i }) {
  const [a, s] = S(!1), [d, c] = S(!1), l = e.errorCategory ?? "UnknownError", p = rr[l] ?? rr.UnknownError, u = E(async () => {
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
    i?.();
  }, [i]), h = Math.min(n.y + 8, window.innerHeight - 440), g = Math.min(n.x + 12, window.innerWidth - 360);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "fixed z-[100] bg-white border border-[#e2e8f0] rounded-[10px] shadow-[0_12px_32px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.08)] p-0 w-[340px] max-h-[420px] overflow-y-auto font-inherit text-[#0f172a]",
      style: { top: Math.max(8, h), left: Math.max(8, g) },
      "data-testid": "error-overlay",
      role: "dialog",
      "aria-label": `Error details for node ${e.nodeId}`,
      children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 px-3.5 pt-3 pb-2.5 border-b border-[#e2e8f0]", children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold leading-snug",
              style: { background: p.bg, color: p.fg },
              "data-testid": "error-category-badge",
              children: xs(l)
            }
          ),
          /* @__PURE__ */ t("span", { className: "flex-1" }),
          /* @__PURE__ */ t(
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
        /* @__PURE__ */ o("div", { className: "px-3.5 py-3 flex flex-col gap-2.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] leading-normal text-[#0f172a]", children: e.message }),
          /* @__PURE__ */ o("div", { className: "text-[11px] text-[#94a3b8]", children: [
            "Failed node:",
            " ",
            /* @__PURE__ */ t("code", { className: "bg-[#f1f5f9] px-[5px] py-px rounded-[3px] font-mono text-[11px] text-[#475569]", children: e.nodeId })
          ] }),
          e.stack && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: () => s((x) => !x),
                className: "bg-transparent border-none p-0 cursor-pointer text-xs font-medium text-[#475569] font-inherit",
                "data-testid": "error-stack-toggle",
                children: [
                  a ? "▾" : "▸",
                  " Stack trace"
                ]
              }
            ),
            a && /* @__PURE__ */ t(
              "pre",
              {
                className: "mt-1.5 p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-md text-[10px] leading-normal font-mono text-[#475569] whitespace-pre-wrap break-all max-h-40 overflow-y-auto m-0",
                "data-testid": "error-stack-content",
                children: e.stack
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex gap-2 px-3.5 pt-2.5 pb-3 border-t border-[#e2e8f0]", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: u,
              className: "px-3 py-1.5 text-xs font-semibold border-none rounded-md cursor-pointer font-inherit leading-snug bg-[#f1f5f9] text-[#475569]",
              "data-testid": "error-copy-btn",
              children: d ? "Copied!" : "Copy error details"
            }
          ),
          i && /* @__PURE__ */ t(
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
function ys(e, n) {
  const r = /* @__PURE__ */ new Map();
  for (const a of e)
    r.set(a.id, []);
  for (const a of n) {
    const s = r.get(a.source);
    s && s.push({ target: a.target, edgeId: a.id });
  }
  const i = /* @__PURE__ */ new Map();
  for (const a of e)
    i.set(a.id, 0);
  for (const a of e) {
    if (i.get(a.id) !== 0) continue;
    const s = [
      { nodeId: a.id, index: 0 }
    ];
    for (i.set(a.id, 1); s.length > 0; ) {
      const d = s[s.length - 1], c = r.get(d.nodeId) ?? [];
      if (d.index >= c.length) {
        i.set(d.nodeId, 2), s.pop();
        continue;
      }
      const l = c[d.index];
      d.index += 1;
      const p = i.get(l.target);
      if (p === 1)
        return l.edgeId;
      p === 0 && (i.set(l.target, 1), s.push({ nodeId: l.target, index: 0 }));
    }
  }
  return null;
}
function go(e) {
  const n = [], r = [], { nodes: i, edges: a } = e, s = /* @__PURE__ */ new Map();
  for (const d of i)
    s.set(d.id, d);
  return vs(i, n), ws(i, a, n), Ns(a, s, n), ks(i, n), Ps(i, a, n), Ms(i, a, r), Ds(i, a, r), Es(i, a, r), Os(i, a, r), r.push(..._s(e)), r.push(...Ls(e)), r.push(...Bs(e)), r.push(...Us(e)), r.push(...js(e)), r.push(...Fs(e)), r.push(...zs(e)), r.push(...qs(e)), r.push(...Ws(e)), r.push(...Vs(e)), {
    errors: n,
    warnings: r,
    isValid: n.length === 0,
    canPublish: n.length === 0
  };
}
function vs(e, n) {
  const r = e.filter((i) => i.type === "trigger");
  if (r.length === 0) {
    n.push({
      code: "NO_TRIGGER",
      severity: "error",
      message: "Pipeline must have exactly one Trigger node."
    });
    return;
  }
  if (r.length > 1)
    for (const i of r)
      n.push({
        code: "MULTIPLE_TRIGGERS",
        severity: "error",
        message: "Pipeline must have exactly one Trigger node.",
        nodeId: i.id
      });
}
function ws(e, n, r) {
  const i = ys(e, n);
  i !== null && r.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: i
  });
}
function Ns(e, n, r) {
  for (const i of e) {
    const a = n.get(i.source), s = n.get(i.target);
    if (!a || !s) {
      r.push({
        code: "INVALID_HANDLE",
        severity: "error",
        message: "Edge references a node that does not exist.",
        edgeId: i.id
      });
      continue;
    }
    Nn(
      a.type,
      i.sourceHandle,
      s.type,
      i.targetHandle
    ) || r.push({
      code: "INVALID_HANDLE",
      severity: "error",
      message: `Invalid connection: ${a.type}.${i.sourceHandle} → ${s.type}.${i.targetHandle}.`,
      edgeId: i.id
    });
  }
}
function ks(e, n) {
  for (const r of e)
    switch (r.data.type) {
      case "llm":
        Cs(r.id, r.data, n);
        break;
      case "transform":
        Is(r.id, r.data, n);
        break;
      case "condition":
        Ss(r.id, r.data, n);
        break;
      case "action":
        Ts(r.id, r.data, n);
        break;
      case "fork":
        $s(r.id, r.data, n);
        break;
      case "join":
        Rs(r.id, r.data, n);
        break;
      case "approval":
        As(r.id, r.data, n);
        break;
    }
}
function Cs(e, n, r) {
  n.provider || Xe(r, e, "provider"), (!n.model || !n.model.trim()) && Xe(r, e, "model"), (!n.systemPrompt || !n.systemPrompt.trim()) && Xe(r, e, "systemPrompt"), (!n.userPromptTemplate || !n.userPromptTemplate.trim()) && Xe(r, e, "userPromptTemplate");
}
function Is(e, n, r) {
  n.transformType || Xe(r, e, "transformType"), (!n.expression || !n.expression.trim()) && Xe(r, e, "expression");
}
function Ss(e, n, r) {
  (!n.expression || !n.expression.trim()) && Xe(r, e, "expression");
}
function Ts(e, n, r) {
  n.actionType || Xe(r, e, "actionType");
}
function $s(e, n, r) {
  (typeof n.branchCount != "number" || n.branchCount < 2) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: e,
    field: "branchCount"
  });
}
function Rs(e, n, r) {
  n.mode || Xe(r, e, "mode"), n.mergeStrategy || Xe(r, e, "mergeStrategy"), n.mode === "n_of_m" && (typeof n.n != "number" || n.n < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: e,
    field: "n"
  });
}
function As(e, n, r) {
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
function Ps(e, n, r) {
  const i = /* @__PURE__ */ new Map();
  for (const a of n)
    i.set(a.target, (i.get(a.target) ?? 0) + 1);
  for (const a of e) {
    if (a.type !== "join") continue;
    (i.get(a.id) ?? 0) < 2 && r.push({
      code: "JOIN_INSUFFICIENT_INPUTS",
      severity: "error",
      message: "Join node requires at least 2 incoming edges.",
      nodeId: a.id
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
function Ms(e, n, r) {
  const i = e.filter((c) => c.type === "trigger");
  if (i.length !== 1) return;
  const a = /* @__PURE__ */ new Map();
  for (const c of e) a.set(c.id, []);
  for (const c of n)
    a.get(c.source)?.push(c.target);
  const s = /* @__PURE__ */ new Set(), d = [i[0].id];
  for (s.add(i[0].id); d.length > 0; ) {
    const c = d.shift();
    for (const l of a.get(c) ?? [])
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
function Ds(e, n, r) {
  const i = /* @__PURE__ */ new Set();
  for (const a of n) i.add(a.source);
  for (const a of e)
    i.has(a.id) || a.data.terminal !== !0 && r.push({
      code: "DEAD_END",
      severity: "warning",
      message: "Node has no outgoing edges.",
      nodeId: a.id
    });
}
function Es(e, n, r) {
  const i = /* @__PURE__ */ new Map();
  for (const a of n) {
    const s = i.get(a.source) ?? /* @__PURE__ */ new Set();
    s.add(a.sourceHandle), i.set(a.source, s);
  }
  for (const a of e) {
    if (a.data.type !== "fork") continue;
    const s = a.data.branchCount, d = i.get(a.id) ?? /* @__PURE__ */ new Set();
    for (let c = 0; c < s; c += 1) {
      const l = `branch-${c}`;
      d.has(l) || r.push({
        code: "UNUSED_FORK_BRANCH",
        severity: "warning",
        message: `Fork branch '${l}' has no connected edge.`,
        nodeId: a.id,
        field: l
      });
    }
  }
}
function Os(e, n, r) {
  const i = /* @__PURE__ */ new Map();
  for (const a of n) {
    const s = i.get(a.source) ?? /* @__PURE__ */ new Set();
    s.add(a.sourceHandle), i.set(a.source, s);
  }
  for (const a of e) {
    if (a.type !== "condition") continue;
    const s = i.get(a.id) ?? /* @__PURE__ */ new Set();
    for (const d of ["true", "false"])
      s.has(d) || r.push({
        code: "UNUSED_CONDITION_BRANCH",
        severity: "warning",
        message: `Condition branch '${d}' has no connected edge.`,
        nodeId: a.id,
        field: d
      });
  }
}
function at(e) {
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
function _s(e) {
  const n = [], r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const c of e.nodes)
    r.set(c.id, []), i.set(c.id, []);
  for (const c of e.edges)
    c.sourceHandle !== "error" && r.get(c.source)?.push(c.target), i.get(c.target)?.push(c.source);
  const a = /* @__PURE__ */ new Map();
  for (const c of e.nodes) a.set(c.id, c);
  function s(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [];
    for (const u of r.get(c) ?? [])
      l.has(u) || (l.add(u), p.push(u));
    for (; p.length > 0; ) {
      const u = p.shift();
      if (a.get(u)?.type === "join") return !0;
      for (const h of r.get(u) ?? [])
        l.has(h) || (l.add(h), p.push(h));
    }
    return !1;
  }
  function d(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [];
    for (const u of i.get(c) ?? [])
      l.has(u) || (l.add(u), p.push(u));
    for (; p.length > 0; ) {
      const u = p.shift();
      if (a.get(u)?.type === "fork") return !0;
      for (const h of i.get(u) ?? [])
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
      message: `${c.data.type} node '${at(c)}' has no error handler — failures will terminate the run.`,
      nodeId: c.id
    });
  return n;
}
function Ls(e) {
  const n = [];
  for (const r of e.nodes)
    r.data.type === "llm" && (typeof r.data.maxTokens != "number" || r.data.maxTokens <= 0) && n.push({
      code: "LLM_NO_MAX_TOKENS",
      severity: "warning",
      message: `LLM node '${at(r)}' has no maxTokens — responses could run long / expensive.`,
      nodeId: r.id,
      field: "maxTokens"
    });
  return n;
}
function Bs(e) {
  const n = [];
  for (const r of e.nodes)
    r.data.type === "approval" && (typeof r.data.timeoutMs != "number" || r.data.timeoutMs <= 0) && n.push({
      code: "UNGUARDED_APPROVAL_TIMEOUT",
      severity: "warning",
      message: `Approval '${at(r)}' has no timeout — the run could block indefinitely.`,
      nodeId: r.id,
      field: "timeoutMs"
    });
  return n;
}
function Us(e) {
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
function js(e) {
  const r = e.nodes.filter((p) => p.type === "trigger");
  if (r.length !== 1) return [];
  const i = /* @__PURE__ */ new Map();
  for (const p of e.nodes) i.set(p.id, []);
  for (const p of e.edges) i.get(p.source)?.push(p.target);
  const a = /* @__PURE__ */ new Map(), s = [r[0].id];
  a.set(r[0].id, 1);
  const d = e.nodes.length * e.nodes.length + 1;
  let c = 0;
  for (; s.length > 0; ) {
    if (c++ > d) return [];
    const p = s.shift(), u = a.get(p);
    for (const f of i.get(p) ?? []) {
      const h = a.get(f);
      (h === void 0 || u + 1 > h) && (a.set(f, u + 1), s.push(f));
    }
  }
  let l = 0;
  for (const p of a.values()) p > l && (l = p);
  return l > 12 ? [
    {
      code: "DEEP_CHAIN",
      severity: "warning",
      message: `Pipeline is very deep (${l} levels); consider modularizing.`
    }
  ] : [];
}
function Fs(e) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const i of e.nodes) {
    const a = at(i), s = r.get(a) ?? [];
    s.push(i), r.set(a, s);
  }
  for (const [i, a] of r)
    if (!(a.length < 2))
      for (const s of a)
        n.push({
          code: "DUPLICATE_NODE_NAME",
          severity: "warning",
          message: `Multiple nodes named '${i}'; consider disambiguating.`,
          nodeId: s.id
        });
  return n;
}
function zs(e) {
  const n = [], r = /\{\{[^}]+\}\}/;
  for (const i of e.nodes) {
    if (i.data.type !== "llm") continue;
    const { temperature: a, userPromptTemplate: s } = i.data;
    typeof a != "number" || a <= 0.8 || !s || !r.test(s) || n.push({
      code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
      severity: "warning",
      message: `LLM '${at(i)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
      nodeId: i.id
    });
  }
  return n;
}
function qs(e) {
  return e.triggerBinding?.event !== "schedule" ? [] : e.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function Ws(e) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const i of e.edges) {
    const a = r.get(i.source) ?? /* @__PURE__ */ new Set();
    a.add(i.sourceHandle), r.set(i.source, a);
  }
  for (const i of e.nodes) {
    if (i.type !== "condition") continue;
    const a = r.get(i.id) ?? /* @__PURE__ */ new Set(), s = a.has("true"), d = a.has("false");
    s && !d && n.push({
      code: "UNREACHABLE_AFTER_CONDITION_FALSE",
      severity: "warning",
      message: `Condition '${at(i)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: i.id,
      field: "false"
    });
  }
  return n;
}
function Vs(e) {
  const n = [], r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const c of e.nodes)
    r.set(c.id, []), i.set(c.id, []);
  for (const c of e.edges)
    r.get(c.source)?.push({ target: c.target, sourceHandle: c.sourceHandle }), i.get(c.target)?.push(c.source);
  const a = /* @__PURE__ */ new Map();
  for (const c of e.nodes) a.set(c.id, c);
  function s(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [c];
    for (; p.length > 0; ) {
      const u = p.shift(), f = a.get(u);
      if (f && f.type === "join" && u !== c) return u;
      for (const { target: h } of r.get(u) ?? [])
        l.has(h) || (l.add(h), p.push(h));
    }
    return null;
  }
  function d(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [c];
    for (; p.length > 0; ) {
      const u = p.shift(), f = a.get(u);
      if (f && f.type === "fork" && u !== c) return u;
      for (const h of i.get(u) ?? [])
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
      message: `Fork '${at(c)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
      nodeId: c.id
    });
  }
  for (const c of e.nodes) {
    if (c.data.type !== "join") continue;
    const l = i.get(c.id) ?? [];
    if (l.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const h of l)
      p.add(d(h));
    const u = p.has(null), f = [...p].filter((h) => h !== null);
    (u || f.length !== 1) && n.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Join '${at(c)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: c.id
    });
  }
  return n;
}
function Ks(e, n) {
  return `${e}${n}`;
}
const Hs = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, Js = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function xo(e) {
  return e.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const Gs = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function Ys(e) {
  const n = Js[e.type] ?? "■", r = Gs[e.type] ?? e.type.charAt(0).toUpperCase() + e.type.slice(1);
  let i = null;
  switch (e.data.type) {
    case "llm":
      i = e.data.model || null;
      break;
    case "condition": {
      const s = e.data;
      i = s.label || s.expression || null;
      break;
    }
    case "approval": {
      const d = e.data.approvers?.length ?? 0;
      i = `${d} approver${d === 1 ? "" : "s"}`;
      break;
    }
    case "fork": {
      const s = e.data;
      i = `${s.branchCount} branch${s.branchCount === 1 ? "" : "es"}`;
      break;
    }
    case "action":
      i = e.data.actionType;
      break;
    case "transform":
      i = e.data.transformType;
      break;
    case "trigger":
      i = e.data.triggerType;
      break;
    case "join":
      i = e.data.mode;
      break;
  }
  const a = `${n} ${r}`;
  return xo(i ? `${a}<br/>${i}` : a);
}
function Xs(e, n) {
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
function Qs(e) {
  return !e || e === "out" ? null : e;
}
function Zs(e) {
  const n = ["flowchart TD"], r = {}, i = /* @__PURE__ */ new Map();
  for (const a of e.nodes) {
    const s = Hs[a.type] ?? "n", d = r[s] = (r[s] ?? 0) + 1;
    i.set(a.id, Ks(s, d));
  }
  for (const a of e.nodes) {
    const s = i.get(a.id);
    if (!s) continue;
    const d = Xs(a.type, Ys(a));
    n.push(`  ${s}${d}`);
  }
  for (const a of e.edges) {
    const s = i.get(a.source), d = i.get(a.target);
    if (!s || !d) continue;
    const c = Qs(a.sourceHandle);
    c ? n.push(`  ${s} --"${xo(c)}"--> ${d}`) : n.push(`  ${s} --> ${d}`);
  }
  return n.join(`
`);
}
function or(e) {
  return JSON.stringify(e, (n, r) => {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const i = Object.keys(r).sort(), a = {};
      for (const s of i) a[s] = r[s];
      return a;
    }
    return r;
  });
}
function ar(e) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e) n.set(r.id, r);
  return n;
}
function ir(e) {
  return new Set(e.edges.map((n) => n.id));
}
function el(e, n) {
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
  const r = ar(e.nodes), i = ar(n.nodes), a = [], s = [], d = [];
  for (const [b, N] of r) {
    const y = i.get(b);
    if (!y) {
      a.push({ node: N, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const k = or(N.data) !== or(y.data), C = N.position.x !== y.position.x || N.position.y !== y.position.y;
    (k || C) && d.push({ node: N, dataChanged: k, positionChanged: C });
  }
  for (const [b, N] of i)
    r.has(b) || s.push({ node: N, dataChanged: !0, positionChanged: !1 });
  const c = ir(e), l = ir(n);
  let p = 0, u = 0;
  for (const b of c) l.has(b) || p++;
  for (const b of l) c.has(b) || u++;
  const f = e.name !== n.name, h = (e.icon ?? "") !== (n.icon ?? ""), g = new Set(e.tags ?? []), x = new Set(n.tags ?? []), m = [], v = [];
  for (const b of g) x.has(b) || m.push(b);
  for (const b of x) g.has(b) || v.push(b);
  const w = m.length > 0 || v.length > 0;
  return {
    addedNodes: a,
    removedNodes: s,
    modifiedNodes: d,
    addedEdges: p,
    removedEdges: u,
    nameChanged: f,
    previousName: f ? n.name : void 0,
    iconChanged: h,
    previousIcon: h ? n.icon : void 0,
    tagsChanged: w,
    tagsAdded: m,
    tagsRemoved: v
  };
}
const tl = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function nl(e) {
  return e.data.type === "condition" && e.data.label ? e.data.label : e.data.type === "llm" ? e.data.model : e.data.type === "action" ? e.data.actionType : e.data.type === "trigger" ? e.data.triggerType : e.type.charAt(0).toUpperCase() + e.type.slice(1);
}
function nn(e, n, r) {
  const i = e.node, a = tl[i.type] ?? "■", s = n !== "removed" && !!r;
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      disabled: !s,
      onClick: s ? () => r(e.node.id) : void 0,
      className: I(
        "flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-[inherit] bg-[#f8fafc] border border-border text-left w-full text-text-primary",
        s ? "cursor-pointer" : "cursor-default",
        n === "removed" && "opacity-85"
      ),
      "data-testid": `diff-row-${n}`,
      children: [
        /* @__PURE__ */ t("span", { className: "text-sm", children: a }),
        /* @__PURE__ */ t("span", { className: "font-semibold", children: i.type }),
        /* @__PURE__ */ t("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: nl(i) }),
        n === "modified" && e.positionChanged ? /* @__PURE__ */ t("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]", children: "moved" }) : null
      ]
    },
    `${n}-${e.node.id}`
  );
}
function rl({
  open: e,
  onClose: n,
  currentDef: r,
  publishedDef: i,
  onJumpToNode: a
}) {
  const s = W(
    () => el(r, i),
    [r, i]
  ), d = (u) => {
    a && a(u), n();
  }, c = i !== null, l = r.version, p = r.publishedVersion;
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
              s.addedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.addedNodes.map((u) => nn(u, "added", d))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Removed (",
                s.removedNodes.length,
                ")"
              ] }),
              s.removedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.removedNodes.map((u) => nn(u, "removed", void 0))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Modified (",
                s.modifiedNodes.length,
                ")"
              ] }),
              s.modifiedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.modifiedNodes.map((u) => nn(u, "modified", d))
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
function ol({ open: e, onClose: n }) {
  return null;
}
const rn = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", sr = "px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function al(e) {
  const {
    publishConfirmOpen: n,
    onPublishClose: r,
    onPublishConfirm: i,
    hasErrors: a,
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
    currentDef: v,
    publishedDef: w,
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
          /* @__PURE__ */ t("button", { onClick: r, className: rn, children: "Cancel" }),
          /* @__PURE__ */ t(
            "button",
            {
              onClick: i,
              disabled: a,
              className: I(
                "px-4 py-[7px] text-[13px] font-semibold text-white border-none rounded-[7px] font-[inherit]",
                a ? "bg-[#cbd5e1] cursor-not-allowed" : "bg-primary cursor-pointer"
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
          a ? /* @__PURE__ */ o(H, { children: [
            /* @__PURE__ */ t("br", {}),
            /* @__PURE__ */ t("br", {}),
            /* @__PURE__ */ o("span", { className: "text-[#dc2626]", children: [
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
          /* @__PURE__ */ t("button", { onClick: p, className: rn, children: "Cancel" }),
          /* @__PURE__ */ t("button", { onClick: u, className: sr, children: "Delete" })
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
          /* @__PURE__ */ t("button", { onClick: h, className: rn, children: "Cancel" }),
          /* @__PURE__ */ t("button", { onClick: g, className: sr, children: "Clear history" })
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
      rl,
      {
        open: x,
        onClose: m,
        currentDef: v,
        publishedDef: w,
        onJumpToNode: b
      }
    ),
    /* @__PURE__ */ t(
      ol,
      {
        open: N,
        onClose: y
      }
    )
  ] });
}
function il({ runId: e, visible: n }) {
  const [r, i] = S(/* @__PURE__ */ new Map()), a = ce(null), s = ce(!0), d = ce(null);
  oe(() => {
    e !== d.current && (d.current = e, i(/* @__PURE__ */ new Map()), s.current = !0);
  }, [e]);
  const c = E(() => {
    const g = a.current;
    if (!g) return;
    const x = g.scrollHeight - g.scrollTop - g.clientHeight < 30;
    s.current = x;
  }, []), l = E(() => {
    if (!s.current) return;
    const g = a.current;
    g && (g.scrollTop = g.scrollHeight);
  }, []), p = E(
    (g) => {
      if (!("eventType" in g)) return;
      const { eventType: x, payload: m } = g;
      if (!x.startsWith("pipeline.llm.")) return;
      const v = m?.runId;
      if (!e || v !== e) return;
      const w = m?.stepId;
      if (w) {
        if (x === "pipeline.llm.stream.opened")
          i((b) => {
            const N = new Map(b);
            return N.has(w) || N.set(w, {
              stepId: w,
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
          i((N) => {
            const y = new Map(N), k = y.get(w);
            if (k) {
              const C = {
                ...k,
                tokens: [...k.tokens, b],
                text: k.text + b,
                active: !0
              };
              y.set(w, C);
            } else
              y.set(w, {
                stepId: w,
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
          i((y) => {
            const k = new Map(y), C = k.get(w), T = C ? Date.now() - C.startedAt : 0, D = T > 1e3 ? `${(T / 1e3).toFixed(1)}s` : `${T}ms`, P = `${w}: ${b ?? "?"} tokens in, ${N ?? "?"} tokens out (${D})`;
            return C ? k.set(w, {
              ...C,
              active: !1,
              summary: P
            }) : k.set(w, {
              stepId: w,
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
  je("*", p), oe(() => {
    l();
  }, [r, l]);
  const u = E((g) => {
    i((x) => {
      const m = new Map(x), v = m.get(g);
      return v && m.set(g, { ...v, collapsed: !v.collapsed }), m;
    });
  }, []), f = W(() => {
    for (const g of r.values())
      if (g.active) return !0;
    return !1;
  }, [r]), h = W(() => Array.from(r.values()), [r]);
  return n ? /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col bg-[#1e1e2e] border-t border-[#313244] max-h-[320px] min-h-[160px] overflow-hidden relative",
      "data-testid": "live-output-panel",
      children: [
        /* @__PURE__ */ t("div", { className: "flex items-center justify-between py-2 px-[14px] bg-[#181825] border-b border-[#313244] shrink-0", children: /* @__PURE__ */ o("div", { className: "text-xs font-bold text-[#cdd6f4] tracking-[0.04em] uppercase flex items-center gap-2", children: [
          /* @__PURE__ */ t("span", { children: "Live Output" }),
          f && /* @__PURE__ */ t("span", { className: "w-1.5 h-1.5 rounded-full bg-[#a6e3a1] [animation:live-output-blink_1.2s_ease-in-out_infinite]" }),
          e && /* @__PURE__ */ o("span", { className: "text-[10px] text-[#6c7086] font-normal normal-case", children: [
            e.slice(0, 8),
            "..."
          ] })
        ] }) }),
        /* @__PURE__ */ t(
          "div",
          {
            ref: a,
            className: "flex-1 overflow-y-auto py-[10px] px-[14px] text-[13px] leading-[1.6] text-[#cdd6f4] font-code",
            onScroll: c,
            children: h.length === 0 ? /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full text-[#6c7086] text-[13px] italic", children: e ? "Waiting for LLM output..." : "No active run" }) : h.map((g) => /* @__PURE__ */ o("div", { children: [
              /* @__PURE__ */ o(
                "div",
                {
                  className: I(
                    "flex items-center gap-2 py-1.5 cursor-pointer select-none text-[11px] font-semibold border-b border-[#313244] mb-1.5",
                    g.active ? "text-[#89b4fa]" : "text-[#a6adc8]"
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
                    g.active && /* @__PURE__ */ t("span", { className: "text-[#a6e3a1] text-[10px]", children: "streaming" })
                  ]
                }
              ),
              !g.collapsed && /* @__PURE__ */ o(H, { children: [
                g.text.length > 0 && /* @__PURE__ */ o("div", { className: "whitespace-pre-wrap break-words m-0 mb-3 p-0 text-[#cdd6f4]", children: [
                  g.text,
                  g.active && /* @__PURE__ */ t("span", { className: "inline-block w-0.5 h-[14px] bg-[#89b4fa] ml-px align-text-bottom [animation:live-output-blink_1s_step-end_infinite]" })
                ] }),
                g.summary && /* @__PURE__ */ o("div", { className: "text-[11px] text-[#a6e3a1] font-semibold pt-1 pb-2 border-b border-[#313244] mb-2", children: [
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
  const r = new Blob([n], { type: "application/json" }), i = URL.createObjectURL(r), a = document.createElement("a");
  a.href = i, a.download = e, document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(i);
}
function At(e, n) {
  if (!n) return "step";
  const r = e?.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function sl(e) {
  const n = xt(), { toast: r } = Gt(), { definition: i, selectedNodeId: a, setSelectedNodeId: s } = Ke(), d = ce(n.runs);
  oe(() => {
    d.current = n.runs;
  }, [n.runs]);
  const c = ce(i);
  oe(() => {
    c.current = i;
  }, [i]);
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
  ), v = E(
    ($) => {
      if ("eventType" in $ || !l($.runId)) return;
      const L = Math.round($.durationMs / 100) / 10;
      r(`Run completed in ${L}s`, { type: "success" });
    },
    [l, r]
  ), w = E(
    ($) => {
      if ("eventType" in $ || !l($.runId)) return;
      const L = $.error.nodeId, pe = At(c.current, L);
      r(`Run failed at ${pe}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => s(L)
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
      const L = $.stepId, pe = At(c.current, L);
      r(`Approval requested on "${pe}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => s(L)
      });
    },
    [l, s, r]
  );
  je("pipeline.run.started", m), je("pipeline.run.completed", v), je("pipeline.run.failed", w), je("pipeline.run.cancelled", b), je("pipeline.approval.requested", N);
  const [y, k] = S(null);
  oe(() => {
    if (n.activeRunIds.length > 0) {
      const $ = n.activeRunIds[n.activeRunIds.length - 1];
      $ !== y && k($);
      return;
    }
    if (!y) {
      const $ = Object.values(n.runs).sort(
        (L, pe) => pe.startedAt.localeCompare(L.startedAt)
      );
      $.length > 0 && k($[0].id);
    }
  }, [n.activeRunIds, n.runs, y]);
  const C = y ? n.runs[y] : void 0, T = !!C && (C.status === "running" || C.status === "pending" || C.status === "awaiting_approval"), [D, P] = S(/* @__PURE__ */ new Set()), [M, re] = S(null), [R, J] = S(null), [Q, G] = S(null), [Z, O] = S(0), [A, Y] = S(!1), [z, _] = S(null), V = E(
    ($, L) => {
      L === null ? (J(null), G(null)) : (J(L), G($));
    },
    []
  ), K = E(($) => {
    P((L) => {
      const pe = new Set(L);
      return pe.has($) ? pe.delete($) : pe.add($), pe;
    });
  }, []), X = E(async () => {
    if (D.size !== 0)
      try {
        const $ = await n.triggerDebugRun(
          e,
          Array.from(D)
        );
        k($);
      } catch ($) {
        console.error("[PipelineEditor] triggerDebugRun failed", $);
      }
  }, [D, n, e]), me = E(() => {
    M && (n.resolveBreakpoint(M.runId, M.stepId, "continue"), re(null));
  }, [M, n]), q = E(() => {
    M && (n.resolveBreakpoint(M.runId, M.stepId, "step_over"), re(null));
  }, [M, n]), de = E(() => {
    M && (n.resolveBreakpoint(M.runId, M.stepId, "resume_all"), re(null));
  }, [M, n]), ke = E(async () => {
    if (!(!M || !R || Q !== M.stepId) && Object.keys(R).length !== 0) {
      Y(!0);
      try {
        await jo(
          e,
          M.runId,
          M.stepId,
          { mode: "merge", values: R }
        ), J(null), G(null), O(($) => $ + 1), n.resolveBreakpoint(M.runId, M.stepId, "continue"), re(null);
      } catch ($) {
        if ($ instanceof Fo)
          r(`Patch rejected: ${$.reason}`, { type: "error", durationMs: 8e3 });
        else if ($ instanceof Vn)
          r(`Apply failed (HTTP ${$.status})`, { type: "error", durationMs: 6e3 });
        else {
          const L = $ instanceof Error ? $.message : String($);
          r(`Apply failed: ${L}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        Y(!1);
      }
    }
  }, [M, R, Q, e, n, r]), Fe = E(
    async ($) => {
      if (M) {
        _($);
        try {
          await zo(
            e,
            M.runId,
            M.stepId,
            $
          ), r("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (L) {
          if (L instanceof Vn)
            r(`Revert failed (HTTP ${L.status})`, { type: "error", durationMs: 6e3 });
          else {
            const pe = L instanceof Error ? L.message : String(L);
            r(`Revert failed: ${pe}`, { type: "error", durationMs: 6e3 });
          }
        } finally {
          _(null);
        }
      }
    },
    [M, e, r]
  ), tt = E(
    ($) => {
      if ("eventType" in $ || !l($.runId)) return;
      re({ runId: $.runId, stepId: $.stepId });
      const L = At(c.current, $.stepId);
      r(`Paused at breakpoint: ${L}`, { type: "warning", durationMs: 6e3 });
    },
    [l, r]
  );
  je("pipeline.step.breakpoint", tt);
  const He = E(
    ($) => {
      "eventType" in $ || M && M.runId === $.runId && re(null);
    },
    [M]
  );
  je("pipeline.run.completed", He), je("pipeline.run.failed", He), je("pipeline.run.cancelled", He);
  const Be = E(() => {
    p?.nodeId && (n.retryFromStep(p.nodeId), g());
  }, [p, n, g]), Ge = i?.status === "published", Je = !T && !Ge, Ye = T ? "Cancel the active run" : Ge ? "Start a new run" : "Publish the pipeline to enable runs", [Te, ye] = S(!1), [se, Me] = S({}), [wt, ee] = S(!1), [ie, ue] = S("config");
  oe(() => {
    a !== null && ue("config");
  }, [a]);
  const xe = E(async ($) => {
    ee(!0);
    try {
      const L = await n.triggerRun(e, $);
      k(L), ue("runs"), r(`Pipeline triggered — run ${L.slice(0, 8)}…`, { type: "success" });
    } catch (L) {
      console.error("[PipelineEditor] triggerRun failed", L), r(`Trigger failed: ${L.message}`, { type: "error" });
    } finally {
      ee(!1);
    }
  }, [n, e, r]), $e = E(async () => {
    if (T && y) {
      n.cancelRun(y);
      return;
    }
    Je || xe();
  }, [T, y, Je, n, xe]), Ue = E(() => {
    ye(!1), xe(se);
  }, [xe, se]);
  return {
    currentRunId: y,
    setCurrentRunId: k,
    activeError: p,
    setActiveError: u,
    errorNodeAnchor: f,
    handleDismissError: g,
    handleErrorNodePosition: x,
    handleRetryFromError: Be,
    handleRunClick: $e,
    handleTriggerInputSubmit: Ue,
    isRunActive: T,
    runDisabled: Je,
    runTitle: Ye,
    isTriggering: wt,
    triggerInputOpen: Te,
    setTriggerInputOpen: ye,
    triggerInputValues: se,
    setTriggerInputValues: Me,
    breakpoints: D,
    handleToggleBreakpoint: K,
    handleDebugRunClick: X,
    pausedBreakpoint: M,
    handleBreakpointContinue: me,
    handleBreakpointStepOver: q,
    handleBreakpointResumeAll: de,
    handleApplyAndContinue: ke,
    handleRevertPatch: Fe,
    applyingPatch: A,
    revertingPatchId: z,
    dirtyPatch: R,
    dirtyPatchStepId: Q,
    handleContextEditBufferChange: V,
    resetEditBufferKey: Z,
    sidebarTab: ie,
    setSidebarTab: ue
  };
}
function ll({
  isPublished: e,
  showTags: n,
  hasPublishedVersion: r,
  onDuplicate: i,
  onCopyMermaid: a,
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
        /* @__PURE__ */ t("button", { className: h, role: "menuitem", onClick: i, children: "Duplicate" }),
        /* @__PURE__ */ t(
          "button",
          {
            className: h,
            role: "menuitem",
            onClick: a,
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
const on = {
  neutral: "bg-surface-hover text-text-secondary",
  success: "bg-success-bg text-success-fg",
  warning: "bg-warning-bg text-warning-fg",
  danger: "bg-danger-bg text-danger-fg",
  info: "bg-info-bg text-info-fg"
};
function cl({
  pipelineId: e,
  definition: n,
  dirty: r,
  savingFlash: i,
  isRunActive: a,
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
  onViewVersions: v,
  onRevert: w,
  onToggleShowTags: b,
  showTags: N,
  onViewRunHistory: y,
  onClearRunHistory: k,
  onSimPanelOpen: C,
  onDelete: T
}) {
  const D = Ve(), { rename: P, setIcon: M, setSelectedNodeId: re } = Ke(), [R, J] = S(!1), [Q, G] = S(""), Z = ce(null);
  oe(() => {
    R && (G(n.name ?? ""), setTimeout(() => Z.current?.focus(), 0));
  }, [R, n.name]);
  const O = () => {
    const se = Q.trim();
    se && se !== n.name && P(se), J(!1);
  }, A = n ? go(n) : null;
  (A?.errors.length ?? 0) > 0;
  const Y = n.status === "published", z = r ? { label: "Saving…", variant: "info" } : i ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, _ = n.status === "published" ? { label: `v${n.version} · Published`, variant: "success" } : typeof n.publishedVersion == "number" ? { label: `v${n.version} · Draft (pub v${n.publishedVersion})`, variant: "warning" } : { label: `v${n.version} · Draft`, variant: "neutral" }, V = A ? A.errors.length > 0 ? { label: `✗ ${A.errors.length} error${A.errors.length === 1 ? "" : "s"}`, variant: "danger" } : A.warnings.length > 0 ? { label: `⚠ ${A.warnings.length} warning${A.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [K, X] = S(!1), me = ce(null);
  ht(me, () => X(!1), K);
  const q = A ? [...A.errors, ...A.warnings] : [], de = (se) => {
    se && (re(se), X(!1));
  }, ke = n.nodes.filter((se) => se.type !== "trigger").length, Fe = l ? Object.values(l.steps).filter(
    (se) => se.status === "completed" || se.status === "skipped"
  ).length : 0, He = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), Be = a && l ? { text: `Running (${Fe}/${ke} steps) · ${He}s`, variant: "running" } : l?.status === "completed" ? { text: `Completed in ${l.durationMs ? (l.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : l?.status === "failed" ? { text: `Failed at ${At(n, l.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, Ge = {
    running: "bg-info-bg text-info-fg",
    success: "bg-success-bg text-success-fg",
    error: "bg-danger-bg text-danger-fg"
  }, Je = a ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [Ye, Te] = S(!1), ye = ce(null);
  return ht(ye, () => Te(!1), Ye), /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "h-11 shrink-0 flex items-center gap-2.5 px-3",
        "border-b border-border bg-surface",
        "sticky top-0 z-5"
      ),
      children: [
        /* @__PURE__ */ t(
          pt,
          {
            onClick: () => D("/pipelines"),
            "aria-label": "Back to pipelines",
            title: "Back to pipelines",
            children: "←"
          }
        ),
        /* @__PURE__ */ t(
          pa,
          {
            value: n.icon ?? "🔀",
            onChange: M
          }
        ),
        R ? /* @__PURE__ */ t(
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
              on[z.variant]
            ),
            "data-testid": "save-status",
            children: z.label
          }
        ),
        /* @__PURE__ */ t(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              on[_.variant]
            ),
            "data-testid": "version-badge",
            children: _.label
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
                on[V.variant]
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
              children: q.map((se, Me) => /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => de(se.nodeId),
                  className: I(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    se.nodeId ? "cursor-pointer" : "cursor-default",
                    Me < q.length - 1 && "border-b border-border"
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
                `${se.code}-${Me}`
              ))
            }
          )
        ] }),
        Be.variant !== "none" && /* @__PURE__ */ o(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap",
              Ge[Be.variant]
            ),
            "data-testid": "run-status-indicator",
            children: [
              Be.variant === "running" && /* @__PURE__ */ t("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-primary rounded-full animate-spin" }),
              Be.variant === "success" && "✓ ",
              Be.variant === "error" && "✗ ",
              Be.text
            ]
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex-1" }),
        /* @__PURE__ */ t(
          Ee,
          {
            variant: "secondary",
            onClick: () => D("/pipelines/metrics"),
            title: "View pipeline metrics dashboard",
            "data-testid": "metrics-button",
            children: "Metrics"
          }
        ),
        /* @__PURE__ */ t(
          Ee,
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
              a ? "bg-danger" : "bg-primary",
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
            disabled: d || a,
            title: `Debug run (${p.size} breakpoint${p.size > 1 ? "s" : ""})`,
            className: I(
              "px-3.5 py-1.5 text-[13px] font-semibold bg-warning text-white",
              "border-none rounded-md font-inherit shrink-0",
              d || a ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            ),
            "data-testid": "debug-run-button",
            children: [
              "Debug (",
              p.size,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", ref: ye, children: [
          /* @__PURE__ */ t(
            pt,
            {
              onClick: () => Te((se) => !se),
              "aria-label": "More actions",
              "data-testid": "overflow-menu-btn",
              children: "⋯"
            }
          ),
          Ye && /* @__PURE__ */ t(
            ll,
            {
              isPublished: Y,
              showTags: N,
              onDuplicate: () => {
                x(), Te(!1);
              },
              onCopyMermaid: () => {
                m(), Te(!1);
              },
              onViewVersions: () => {
                v(), Te(!1);
              },
              onRevert: () => {
                w(), Te(!1);
              },
              onToggleShowTags: () => {
                b(), Te(!1);
              },
              onViewRunHistory: () => {
                y(), Te(!1);
              },
              onClearRunHistory: () => {
                k(), Te(!1);
              },
              onSimPanelOpen: () => {
                C(), Te(!1);
              },
              onDelete: () => {
                T(), Te(!1);
              },
              hasPublishedVersion: typeof n.publishedVersion == "number"
            }
          )
        ] })
      ]
    }
  );
}
const dl = 12;
function De(e) {
  return I("text-xs", {
    string: "text-[#a6e3a1]",
    number: "text-[#fab387]",
    boolean: "text-[#cba6f7]",
    null: "text-[#6c7086]",
    bracket: "text-[#9399b2]"
  }[e]);
}
function Dt({
  data: e,
  depth: n = 0,
  highlightKeys: r,
  keyName: i,
  isHighlighted: a = !1
}) {
  const [s, d] = S(n > 2);
  if (n > dl)
    return /* @__PURE__ */ t("span", { className: De("string"), children: "[max depth]" });
  const c = a || i != null && r?.has(i);
  if (e === null)
    return /* @__PURE__ */ t("span", { className: I(De("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "null" });
  if (e === void 0)
    return /* @__PURE__ */ t("span", { className: I(De("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "undefined" });
  if (typeof e == "boolean")
    return /* @__PURE__ */ t("span", { className: I(De("boolean"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(e) });
  if (typeof e == "number")
    return /* @__PURE__ */ t("span", { className: I(De("number"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(e) });
  if (typeof e == "string") {
    const l = e.length > 120 ? e.slice(0, 120) + "..." : e;
    return /* @__PURE__ */ o("span", { className: I(De("string"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: [
      '"',
      l,
      '"'
    ] });
  }
  if (Array.isArray(e))
    return e.length === 0 ? /* @__PURE__ */ t("span", { className: De("bracket"), children: "[]" }) : /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(
        "span",
        {
          className: "cursor-pointer select-none text-[9px] mr-1 text-[#6c7086] inline-block w-3 text-center",
          onClick: () => d((l) => !l),
          role: "button",
          tabIndex: 0,
          onKeyDown: (l) => {
            (l.key === "Enter" || l.key === " ") && d((p) => !p);
          },
          children: s ? "▶" : "▼"
        }
      ),
      /* @__PURE__ */ t("span", { className: De("bracket"), children: "[" }),
      s ? /* @__PURE__ */ o("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        e.length,
        " items"
      ] }) : /* @__PURE__ */ t("div", { className: "pl-4", children: e.map((l, p) => /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
        /* @__PURE__ */ o("span", { className: "text-[#6c7086] text-[11px]", children: [
          p,
          ": "
        ] }),
        /* @__PURE__ */ t(Dt, { data: l, depth: n + 1, highlightKeys: r }),
        p < e.length - 1 && /* @__PURE__ */ t("span", { className: De("bracket"), children: "," })
      ] }, p)) }),
      /* @__PURE__ */ t("span", { className: De("bracket"), children: "]" })
    ] });
  if (typeof e == "object") {
    const l = Object.entries(e);
    return l.length === 0 ? /* @__PURE__ */ t("span", { className: De("bracket"), children: "{}" }) : /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ t(
        "span",
        {
          className: "cursor-pointer select-none text-[9px] mr-1 text-[#6c7086] inline-block w-3 text-center",
          onClick: () => d((p) => !p),
          role: "button",
          tabIndex: 0,
          onKeyDown: (p) => {
            (p.key === "Enter" || p.key === " ") && d((u) => !u);
          },
          children: s ? "▶" : "▼"
        }
      ),
      /* @__PURE__ */ t("span", { className: De("bracket"), children: "{" }),
      s ? /* @__PURE__ */ o("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        l.length,
        " keys"
      ] }) : /* @__PURE__ */ t("div", { className: "pl-4", children: l.map(([p, u], f) => {
        const h = r?.has(p) || a;
        return /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
          /* @__PURE__ */ t("span", { className: I(
            "text-xs font-medium text-[#89b4fa]",
            h && "text-[#a6e3a1] font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5"
          ), children: p }),
          /* @__PURE__ */ t("span", { className: De("bracket"), children: ": " }),
          /* @__PURE__ */ t(
            Dt,
            {
              data: u,
              depth: n + 1,
              highlightKeys: n === 0 ? r : void 0,
              keyName: p,
              isHighlighted: h
            }
          ),
          f < l.length - 1 && /* @__PURE__ */ t("span", { className: De("bracket"), children: "," })
        ] }, p);
      }) }),
      /* @__PURE__ */ t("span", { className: De("bracket"), children: "}" })
    ] });
  }
  return /* @__PURE__ */ t("span", { className: De("string"), children: String(e) });
}
function pl({
  snapshots: e,
  activeStepId: n,
  fallbackActiveStepId: r,
  onStepSelect: i
}) {
  const a = n ?? r;
  return /* @__PURE__ */ t("div", { className: "w-[140px] shrink-0 border-r border-border overflow-y-auto", children: e.map((s, d) => {
    const c = s.stepId === a;
    return /* @__PURE__ */ o(
      "div",
      {
        className: I(
          "px-2.5 py-1.5 text-[11px] font-mono cursor-pointer border-b border-border overflow-hidden text-ellipsis whitespace-nowrap",
          c ? "text-text-primary bg-surface-inset font-semibold" : "text-text-tertiary font-normal"
        ),
        onClick: () => i?.(s.stepId),
        role: "button",
        tabIndex: 0,
        onKeyDown: (l) => {
          (l.key === "Enter" || l.key === " ") && i?.(s.stepId);
        },
        title: s.stepId,
        children: [
          s.newKeys.length > 0 && /* @__PURE__ */ t("span", { className: "text-[#a6e3a1] mr-1 text-[9px]", children: "+" }),
          /* @__PURE__ */ o("span", { className: "text-[10px] text-[#9399b2] mr-1", children: [
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
function ul(e) {
  return typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : "object";
}
function ml({ k: e, initial: n, onCommit: r, onError: i, onFocus: a }) {
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
      onFocus: a,
      onBlur: () => {
        try {
          const c = JSON.parse(s);
          r(c);
        } catch (c) {
          i(`Invalid JSON: ${c instanceof Error ? c.message : String(c)}`);
        }
      },
      className: "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono min-h-[60px] resize-y"
    }
  );
}
function hl({
  inputContext: e,
  buffer: n,
  parseErrors: r,
  newKeyDraft: i,
  setNewKeyDraft: a,
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
  }, [e, n]), f = "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono";
  return /* @__PURE__ */ o("div", { "data-testid": "context-edit-table", children: [
    u.map((h) => {
      const g = h in n, x = g ? n[h] : e[h], m = ul(x), v = g;
      return /* @__PURE__ */ o(
        "div",
        {
          className: "grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 border-b border-[#313244]",
          "data-testid": `context-edit-row-${h}`,
          children: [
            /* @__PURE__ */ o(
              "span",
              {
                className: I(
                  "text-xs font-medium text-[#89b4fa] pt-1 overflow-hidden text-ellipsis whitespace-nowrap",
                  v && "text-[#a6e3a1] font-bold"
                ),
                title: h,
                children: [
                  h,
                  v && /* @__PURE__ */ t("span", { className: "ml-1 text-[9px]", children: "●" })
                ]
              }
            ),
            /* @__PURE__ */ o("div", { className: "min-w-0", children: [
              m === "boolean" ? /* @__PURE__ */ o(
                "select",
                {
                  "data-testid": `context-edit-input-${h}`,
                  value: String(x),
                  onChange: (w) => c(h, w.target.value === "true"),
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
                  onChange: (w) => {
                    const b = w.target.value === "" ? 0 : Number(w.target.value);
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
                  onChange: (w) => c(h, w.target.value),
                  onFocus: () => d(h, x),
                  className: f
                }
              ) : /* @__PURE__ */ t(
                ml,
                {
                  k: h,
                  initial: x,
                  onCommit: (w) => c(h, w),
                  onError: (w) => p(h, w),
                  onFocus: () => d(h, x)
                }
              ),
              r[h] && /* @__PURE__ */ t(
                "div",
                {
                  "data-testid": `context-edit-parse-error-${h}`,
                  className: "text-[#f38ba8] text-[11px] mt-1",
                  children: r[h]
                }
              )
            ] }),
            /* @__PURE__ */ t("div", { className: "flex gap-1", children: v && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                "data-testid": `context-edit-revert-${h}`,
                onClick: () => l(h),
                title: "Drop change",
                className: "px-1.5 py-0.5 text-[10px] bg-transparent text-[#9399b2] border border-[#313244] rounded-sm cursor-pointer font-mono",
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
              value: i.key,
              onChange: (h) => a({ ...i, key: h.target.value }),
              className: f
            }
          ),
          /* @__PURE__ */ t(
            "input",
            {
              "data-testid": "context-edit-new-value",
              type: "text",
              placeholder: "value (string or JSON)",
              value: i.value,
              onChange: (h) => a({ ...i, value: h.target.value }),
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
              disabled: !i.key.trim(),
              className: I(
                "px-2.5 py-0.5 text-[11px] font-semibold border rounded-sm cursor-pointer font-mono",
                i.key.trim() ? "bg-[#a6e3a1] text-[#1e1e2e] border-[#a6e3a1]" : "bg-transparent text-[#45475a] border-[#313244] cursor-not-allowed"
              ),
              children: "+ Add field"
            }
          )
        ]
      }
    )
  ] });
}
function fl(e, n, r) {
  const i = { ...e }, a = { ...i.steps ?? {} };
  return a[n] = r, i.steps = a, r && typeof r == "object" && !Array.isArray(r) && Object.assign(i, r), i;
}
function gl(e, n) {
  const r = [];
  for (const i of Object.keys(n))
    i in e || r.push(i);
  return r;
}
function xl(e) {
  const n = Object.values(e.steps).filter((a) => a != null).sort((a, s) => {
    const d = a.startedAt ? Date.parse(a.startedAt) : 0, c = s.startedAt ? Date.parse(s.startedAt) : 0;
    return d - c;
  }), r = [];
  let i = {};
  e.triggeredBy?.payload && typeof e.triggeredBy.payload == "object" && (i = { ...e.triggeredBy.payload });
  for (const a of n) {
    const s = { ...i }, d = a.output, c = a.llm?.prompt;
    let l;
    if (d !== void 0)
      l = fl(i, a.nodeId, d);
    else {
      l = { ...i };
      const u = {
        ...l.steps ?? {}
      };
      u[a.nodeId] = d, l.steps = u;
    }
    const p = gl(s, l);
    r.push({
      stepId: a.nodeId,
      inputContext: s,
      output: d,
      outputContext: l,
      resolvedPrompt: c || void 0,
      newKeys: p,
      stepExecution: a
    }), i = l;
  }
  return r;
}
function bl(e, n) {
  const [r, i] = S(/* @__PURE__ */ new Map()), [a, s] = S(
    /* @__PURE__ */ new Map()
  ), d = ce(null);
  oe(() => {
    const h = e?.id ?? null;
    h !== d.current && (d.current = h, i(/* @__PURE__ */ new Map()), s(/* @__PURE__ */ new Map()));
  }, [e?.id]);
  const c = E(
    (h) => {
      if (!h || typeof h != "object") return;
      const { eventType: g, payload: x } = h;
      if (!x || typeof x != "object") return;
      const m = x, v = m.runId;
      if (!(!e?.id || v !== e.id)) {
        if (g === "pipeline.llm.prompt") {
          const w = m.stepId, b = m.prompt;
          w && b && i((N) => {
            const y = new Map(N);
            return y.set(w, b), y;
          });
        }
        if (g === "pipeline.run.checkpoint" || g === "pipeline.run.checkpointed" || g === "pipeline:run:checkpoint" || g === "pipeline:run:checkpointed") {
          const w = m.context, b = m.stepId;
          w && b && s((N) => {
            const y = new Map(N);
            return y.set(b, w), y;
          });
        }
      }
    },
    [e?.id]
  );
  je("*", c);
  const l = W(() => e ? xl(e) : [], [e]), p = W(() => l.map((h) => {
    const g = r.get(h.stepId), x = a.get(h.stepId);
    return {
      ...h,
      resolvedPrompt: h.resolvedPrompt || g,
      outputContext: x ?? h.outputContext
    };
  }), [l, r, a]), u = W(() => n ? p.find((h) => h.stepId === n) ?? null : p[p.length - 1] ?? null, [p, n]), f = W(() => u ? new Set(u.newKeys) : /* @__PURE__ */ new Set(), [u]);
  return { enrichedSnapshots: p, activeSnapshot: u, newKeysSet: f };
}
function lr({ attempt: e, label: n }) {
  const r = !e.error;
  return /* @__PURE__ */ o("div", { className: "bg-[#11111b] rounded-md border border-[#313244] p-2.5 overflow-auto", children: [
    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold text-[#cdd6f4] mb-2", children: n }),
    /* @__PURE__ */ o("div", { className: "flex gap-1.5 mb-1.5 items-center", children: [
      /* @__PURE__ */ t("span", { className: I(
        "text-[10px] font-semibold px-1.5 py-px rounded-sm",
        r ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
      ), children: r ? "OK" : "FAIL" }),
      e.durationMs != null && /* @__PURE__ */ o("span", { className: "text-[10px] text-[#6c7086]", children: [
        e.durationMs,
        "ms"
      ] })
    ] }),
    e.error && /* @__PURE__ */ t("div", { className: "text-[11px] text-[#f38ba8] font-mono mb-1.5 px-2 py-1.5 bg-[#1a0f14] rounded whitespace-pre-wrap break-words", children: e.error }),
    e.output !== void 0 && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ t("div", { className: "text-[10px] text-[#6c7086] font-semibold mb-1 uppercase", children: "Output" }),
      /* @__PURE__ */ t(Dt, { data: e.output, depth: 0 })
    ] })
  ] });
}
function yl({
  run: e,
  activeStepId: n,
  onStepSelect: r,
  editable: i = !1,
  onEditBufferChange: a,
  resetEditBufferKey: s
}) {
  const [d, c] = S("input"), [l, p] = S(0), [u, f] = S(!1), [h, g] = S({}), [x, m] = S(null), [v, w] = S({}), [b, N] = S({
    key: "",
    value: ""
  }), { enrichedSnapshots: y, activeSnapshot: k, newKeysSet: C } = bl(e, n), T = k?.resolvedPrompt != null, D = k?.stepExecution.attempts, P = (D?.length ?? 0) >= 2;
  oe(() => {
    d === "prompt" && !T && c("input"), d === "attempts" && !P && c("input");
  }, [d, T, P]), oe(() => {
    p(0);
  }, [n]);
  const M = !!(e && e.status === "paused_at_breakpoint" && n && (e.currentStepIds?.includes(n) || k?.stepExecution.status === "running" || k?.stepExecution.status === "awaiting" || k?.stepExecution.status === "pending")), re = !!i && !!M;
  oe(() => {
    re ? x && x !== n && (g({}), m(null), w({})) : (u && f(!1), Object.keys(h).length > 0 && g({}), x && m(null), Object.keys(v).length > 0 && w({}));
  }, [re, n]), oe(() => {
    s !== void 0 && (g({}), m(null), w({}), N({ key: "", value: "" }));
  }, [s]), oe(() => {
    !re || !n || a && (Object.keys(h).length === 0 ? a(n, null) : a(n, h));
  }, [h, re, n]);
  const R = E(
    (A, Y) => {
      m(n), g((z) => A in z ? z : { ...z, [A]: Y });
    },
    [n]
  ), J = E(
    (A, Y) => {
      m(n), g((z) => ({ ...z, [A]: Y })), w((z) => {
        if (!(A in z)) return z;
        const _ = { ...z };
        return delete _[A], _;
      });
    },
    [n]
  ), Q = E((A) => {
    g((Y) => {
      if (!(A in Y)) return Y;
      const z = { ...Y };
      return delete z[A], z;
    }), w((Y) => {
      if (!(A in Y)) return Y;
      const z = { ...Y };
      return delete z[A], z;
    });
  }, []), G = E((A, Y) => {
    w((z) => ({ ...z, [A]: Y }));
  }, []), Z = E(() => {
    g({}), m(null), w({}), N({ key: "", value: "" });
  }, []), O = E(() => {
    const A = b.key.trim();
    if (!A) return;
    let Y = b.value;
    const z = b.value;
    if (z.trim().length > 0)
      try {
        Y = JSON.parse(z);
      } catch {
        Y = z;
      }
    J(A, Y), N({ key: "", value: "" });
  }, [b, J]);
  return !e || y.length === 0 ? /* @__PURE__ */ o("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0", children: /* @__PURE__ */ t("span", { className: "text-xs font-bold text-text-primary tracking-wide uppercase", children: "Context Inspector" }) }),
    /* @__PURE__ */ o("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs flex items-center justify-center flex-col gap-2", children: [
      /* @__PURE__ */ t("span", { className: "text-[13px] text-[#6c7086]", children: e ? "Waiting for step execution data..." : "Run a pipeline to inspect context flow" }),
      /* @__PURE__ */ t("span", { className: "text-[11px] text-[#45475a]", children: e ? "Context data will appear as steps complete." : "Trigger a run to see inputs, outputs, and context at each step." })
    ] })
  ] }) : /* @__PURE__ */ o("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0", children: [
      /* @__PURE__ */ t("span", { className: "text-xs font-bold text-text-primary tracking-wide uppercase", children: "Context Inspector" }),
      k && k.stepId && /* @__PURE__ */ o("span", { className: "text-[10px] text-[#6c7086]", children: [
        "Step: ",
        k.stepId.slice(0, 8)
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex gap-0 border-b border-border shrink-0", children: [
      { id: "input", label: "Input Context", show: !0 },
      { id: "output", label: "Output", show: !0 },
      { id: "prompt", label: "Resolved Prompt", show: T },
      { id: "details", label: "Details", show: !0 },
      { id: "attempts", label: `Attempts (${D?.length})`, show: P }
    ].filter((A) => A.show).map((A) => /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "data-testid": A.id === "attempts" ? "attempts-tab" : void 0,
        className: I(
          "px-3.5 py-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer font-inherit uppercase tracking-wide border-b-2",
          d === A.id ? "text-primary border-b-primary" : "text-text-tertiary border-b-transparent"
        ),
        onClick: () => c(A.id),
        children: A.label
      },
      A.id
    )) }),
    /* @__PURE__ */ o("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
      /* @__PURE__ */ t(
        pl,
        {
          snapshots: y,
          activeStepId: n,
          fallbackActiveStepId: k?.stepId,
          onStepSelect: r
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs", children: k ? d === "input" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ o("div", { className: "text-[10px] text-[#6c7086] font-semibold uppercase", children: [
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
                className: "px-2 py-0.5 text-[10px] font-semibold bg-transparent text-[#f38ba8] border border-[#313244] rounded-sm cursor-pointer font-mono",
                children: "Discard changes"
              }
            ),
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => {
                  const A = !u;
                  f(A), A || Z();
                },
                "data-testid": "context-inspector-edit-toggle",
                className: I(
                  "px-2 py-0.5 text-[10px] font-semibold border rounded-sm cursor-pointer font-mono uppercase tracking-wide",
                  u ? "bg-[#d97706] text-white border-[#d97706]" : "bg-transparent text-[#d97706] border-[#d97706]"
                ),
                children: u ? "Editing" : "Edit"
              }
            )
          ] })
        ] }),
        Object.keys(k.inputContext).length === 0 && !(re && u) ? /* @__PURE__ */ t("div", { className: "text-[#6c7086] text-xs italic", children: "No input context (first step or no upstream output)" }) : re && u ? /* @__PURE__ */ t(
          hl,
          {
            inputContext: k.inputContext,
            buffer: h,
            parseErrors: v,
            newKeyDraft: b,
            setNewKeyDraft: N,
            onCommitNewKey: O,
            onBeginEditKey: R,
            onSetValue: J,
            onRemoveKey: Q,
            onParseError: G
          }
        ) : /* @__PURE__ */ t(
          Dt,
          {
            data: k.inputContext,
            highlightKeys: C
          }
        )
      ] }) : d === "output" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: [
          "Output",
          k.stepId ? ` — step ${k.stepId.slice(0, 8)}` : ""
        ] }),
        /* @__PURE__ */ t(Dt, { data: k.output }),
        k.newKeys.length > 0 && /* @__PURE__ */ o("div", { className: "mt-3", children: [
          /* @__PURE__ */ t("div", { className: "text-[10px] text-[#a6e3a1] font-semibold uppercase mb-1", children: "New context keys added" }),
          /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: k.newKeys.map((A) => /* @__PURE__ */ t(
            "span",
            {
              className: "px-1.5 py-0.5 bg-[rgba(166,227,161,0.15)] text-[#a6e3a1] rounded-sm text-[11px] font-semibold font-mono",
              children: A
            },
            A
          )) })
        ] })
      ] }) : d === "prompt" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: "Resolved prompt template" }),
        /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: k.resolvedPrompt })
      ] }) : d === "details" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: "Step execution details" }),
        /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
          k.stepExecution.startedAt && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Duration" }),
            /* @__PURE__ */ o("div", { className: "text-[11px] text-[#cdd6f4]", children: [
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
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "LLM Metrics" }),
            /* @__PURE__ */ o("div", { className: "text-[11px] text-[#cdd6f4]", children: [
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
              /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mt-2 mb-1", children: "Response Text" }),
              /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: k.stepExecution.llm.response })
            ] })
          ] }),
          k.stepExecution.error && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#f38ba8] font-semibold mb-1", children: "Error" }),
            /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-[#1a0f14] border border-[#f38ba8] rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: /* @__PURE__ */ t("div", { className: "text-[#f38ba8] font-semibold mb-1", children: k.stepExecution.error }) })
          ] }),
          k.stepExecution.approvals && k.stepExecution.approvals.length > 0 && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: [
              "Approvals (",
              k.stepExecution.approvals.length,
              ")"
            ] }),
            k.stepExecution.approvals.map((A, Y) => /* @__PURE__ */ o("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2", children: [
              /* @__PURE__ */ o("div", { className: "flex gap-2 mb-1", children: [
                /* @__PURE__ */ t("span", { className: I(
                  "px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                  A.decision === "approve" ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
                ), children: A.decision.toUpperCase() }),
                /* @__PURE__ */ t("span", { className: "text-[11px] text-[#cdd6f4]", children: A.userId })
              ] }),
              A.comment && /* @__PURE__ */ o("div", { className: "text-[11px] text-[#9399b2] italic", children: [
                '"',
                A.comment,
                '"'
              ] }),
              /* @__PURE__ */ t("div", { className: "text-[10px] text-[#6c7086] mt-1", children: A.at })
            ] }, Y))
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Status" }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#cdd6f4]", children: k.stepExecution.status })
          ] })
        ] })
      ] }) : d === "attempts" && D && D.length >= 2 ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": "attempts-prev",
              disabled: l === 0,
              onClick: () => p((A) => A - 1),
              className: I(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l === 0 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "←"
            }
          ),
          /* @__PURE__ */ o(
            "span",
            {
              "data-testid": "attempts-label",
              className: "text-[11px] text-[#9399b2] flex-1 text-center",
              children: [
                "Attempt ",
                l + 1,
                " vs ",
                l + 2,
                " of ",
                D.length
              ]
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": "attempts-next",
              disabled: l >= D.length - 2,
              onClick: () => p((A) => A + 1),
              className: I(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l >= D.length - 2 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "→"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ t(lr, { attempt: D[l], label: `Attempt ${l + 1}` }),
          /* @__PURE__ */ t(lr, { attempt: D[l + 1], label: `Attempt ${l + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function vl({
  definition: e,
  pausedBreakpoint: n,
  applyingPatch: r,
  revertingPatchId: i,
  dirtyPatch: a,
  dirtyPatchStepId: s,
  resetEditBufferKey: d,
  onContinue: c,
  onStepOver: l,
  onResumeAll: p,
  onApplyAndContinue: u,
  onRevertPatch: f,
  onEditBufferChange: h
}) {
  const x = xt().runs[n.runId] ?? null, v = x?.steps?.[n.stepId]?.patches ?? [], w = !!a && s === n.stepId && Object.keys(a).length > 0, b = x?.status === "paused_at_breakpoint";
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
            At(e, n.stepId)
          ] }),
          w && /* @__PURE__ */ t(
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
                yl,
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
                      v.length,
                      ")"
                    ] }),
                    v.length === 0 ? /* @__PURE__ */ t(
                      "div",
                      {
                        className: "text-[11px] text-text-tertiary italic",
                        "data-testid": "breakpoint-patch-history-empty",
                        children: "No patches applied yet."
                      }
                    ) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: v.map((N) => {
                      const y = !!N.revertedAt;
                      return /* @__PURE__ */ o(
                        "div",
                        {
                          "data-testid": `breakpoint-patch-row-${N.patchId}`,
                          className: I(
                            "border border-border rounded p-1.5",
                            y ? "bg-neutral/10 opacity-60" : "bg-[#11111b]"
                          ),
                          children: [
                            /* @__PURE__ */ o("div", { className: "flex items-center gap-1 text-[10px] text-[#cdd6f4] mb-0.5", children: [
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
                            /* @__PURE__ */ o("div", { className: "text-[10px] text-[#9399b2]", children: [
                              N.appliedAt,
                              N.appliedBy && /* @__PURE__ */ o(H, { children: [
                                " · ",
                                /* @__PURE__ */ t("span", { className: "text-[#cdd6f4]", children: N.appliedBy })
                              ] })
                            ] }),
                            !y && /* @__PURE__ */ t(
                              "button",
                              {
                                type: "button",
                                "data-testid": `breakpoint-patch-revert-${N.patchId}`,
                                onClick: () => f(N.patchId),
                                disabled: !b || i === N.patchId,
                                title: b ? "Revert this patch" : "Run has progressed past this breakpoint — revert no longer allowed",
                                className: I(
                                  "mt-1 px-2 py-0.5 text-[10px] font-semibold bg-transparent rounded-sm font-inherit",
                                  b ? "text-danger-fg border border-danger cursor-pointer" : "text-text-primary border border-border-emphasis cursor-not-allowed",
                                  i === N.patchId && "cursor-not-allowed"
                                ),
                                children: i === N.patchId ? "Reverting…" : "Revert"
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
function F({ label: e, required: n, help: r, error: i, children: a, className: s }) {
  return /* @__PURE__ */ o("div", { className: I("flex flex-col", s), children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary", children: [
      e,
      n && /* @__PURE__ */ t("span", { className: "text-danger-fg ml-1", "aria-hidden": "true", children: "●" })
    ] }),
    /* @__PURE__ */ t("div", { className: "mt-1", children: a }),
    i && /* @__PURE__ */ t("div", { role: "alert", className: "text-[11px] text-danger-fg mt-0.5", children: i }),
    !i && r && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: r })
  ] });
}
function ut({ title: e, defaultCollapsed: n = !1, children: r, className: i }) {
  const [a, s] = S(n);
  return /* @__PURE__ */ o("div", { className: I("flex flex-col", i), children: [
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => s((d) => !d),
        className: "flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer font-inherit text-xs font-semibold text-text-secondary",
        children: [
          /* @__PURE__ */ t("span", { children: a ? "▸" : "▾" }),
          " ",
          e
        ]
      }
    ),
    !a && /* @__PURE__ */ t("div", { className: "flex flex-col gap-3 mt-2", children: r })
  ] });
}
function ve({ children: e, className: n }) {
  return /* @__PURE__ */ t("div", { className: I("flex flex-col gap-3 px-4 py-3", n), children: e });
}
function We({
  samples: e,
  onSelect: n,
  "aria-label": r = "Suggestions",
  className: i
}) {
  return e.length === 0 ? null : /* @__PURE__ */ t(
    "div",
    {
      className: I("mt-1.5 flex flex-wrap gap-1", i),
      role: "group",
      "aria-label": r,
      "data-testid": "sample-pills",
      children: e.map((a) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => n(a),
          className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer hover:bg-surface-hover",
          children: a
        },
        a
      ))
    }
  );
}
function cr(e) {
  const n = e.data ?? {}, i = `${typeof n.label == "string" && n.label ? n.label : e.type} (${e.type})`, a = (c, l, p) => ({
    path: c,
    source: i,
    sourceNodeId: e.id,
    description: l,
    kind: p
  }), s = typeof n.outputKey == "string" && n.outputKey ? n.outputKey : null, d = s ? `context.${s}` : `context.steps.${e.id}.output`;
  switch (e.type) {
    case "trigger":
      return [
        a("context.trigger", "The full trigger payload.", "object"),
        a("context.trigger.userId", "Who initiated the run.", "string"),
        a("context.trigger.imageRef", "Image supplied with the trigger, if any.", "image")
      ];
    case "llm":
      return [
        a(d, "Model completion text.", "string"),
        a(`context.steps.${e.id}.usage`, "Token usage for this call.", "object")
      ];
    case "transform":
      return [a(d, "Result of the transform expression.", "object")];
    case "action":
      return [a(d, "Response returned by the action.", "object")];
    case "memory":
      return n.mode === "write" ? [
        a(d, "Result of the memory write.", "object"),
        a(`${d}.written`, "Whether the value was persisted.", "boolean"),
        a(`${d}.key`, "The resolved key that was written.", "string")
      ] : [
        a(d, "Result of the memory read.", "object"),
        a(`${d}.value`, "The recalled value, or null on a miss.", "object"),
        a(`${d}.found`, "Whether a record existed for the key.", "boolean"),
        a(`${d}.key`, "The resolved key that was read.", "string")
      ];
    case "scatter":
      return [
        a(`context.steps.${e.id}.items`, "The fanned-out items.", "array"),
        a(`context.steps.${e.id}.index`, "Index of the current item.", "number")
      ];
    case "condition":
      return [a(`context.steps.${e.id}.matched`, "Whether the condition passed.", "boolean")];
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
      return [a(`context.steps.${e.id}.imageRef`, "Image produced by this step.", "image")];
    case "image:dimensions":
      return [
        a(`context.steps.${e.id}.width`, "Image width in pixels.", "number"),
        a(`context.steps.${e.id}.height`, "Image height in pixels.", "number")
      ];
    case "image:vision-analyze":
    case "image:vision-classify":
    case "image:vision-describe":
    case "image:vision-tag":
    case "image:vision-extract-text":
      return [
        a(d, "Structured vision result, shaped by the output schema.", "object"),
        a(`context.steps.${e.id}.usage`, "Token usage for the vision call.", "object")
      ];
    default:
      return [a(d, "Output of this step.", "object")];
  }
}
function Cn(e, n) {
  const r = /* @__PURE__ */ new Map();
  for (const d of e) {
    const c = r.get(d.target);
    c ? c.push(d.source) : r.set(d.target, [d.source]);
  }
  const i = [], a = /* @__PURE__ */ new Set([n]);
  let s = r.get(n) ?? [];
  for (; s.length; ) {
    const d = [];
    for (const c of s)
      a.has(c) || (a.add(c), i.push(c), d.push(...r.get(c) ?? []));
    s = d;
  }
  return i;
}
function wl(e, n, r) {
  const i = new Map(e.map((c) => [c.id, c])), a = [], s = /* @__PURE__ */ new Set(), d = (c) => {
    s.has(c.path) || (s.add(c.path), a.push(c));
  };
  for (const c of Cn(n, r)) {
    const l = i.get(c);
    l && cr(l).forEach(d);
  }
  if (!s.has("context.trigger")) {
    const c = e.find((l) => l.type === "trigger");
    c && cr(c).forEach(d);
  }
  return a;
}
function Nl(e, n) {
  const r = new Set(n.map((a) => a.path)), i = /* @__PURE__ */ new Set();
  for (const a of e.matchAll(/\{\{\s*([\w.[\]-]+)\s*\}\}/g))
    i.add(a[1]);
  return [...i].filter((a) => r.has(a) ? !1 : ![...r].some((s) => a.startsWith(`${s}.`)));
}
const kl = /* @__PURE__ */ new Set([
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
function Cl(e, n, r) {
  const i = new Map(e.map((l) => [l.id, l])), a = [], s = /* @__PURE__ */ new Set(), d = (l) => {
    s.has(l.path) || (s.add(l.path), a.push(l));
  };
  for (const l of Cn(n, r)) {
    const p = i.get(l);
    if (!p || !kl.has(p.type)) continue;
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
  for (const l of Cn(n, r))
    if (i.get(l)?.type === "scatter") {
      d({ path: "$.scatter.parentImageId", source: "Scatter (parent image)", sourceNodeId: l });
      break;
    }
  return a;
}
function Xt(e) {
  const n = Ht(Mn)?.definition ?? null, r = n?.nodes ?? [], i = n?.edges ?? [], a = W(
    () => e ? wl(r, i, e) : [],
    [r, i, e]
  );
  return W(
    () => ({
      paths: a,
      unresolved: (s) => Nl(s, a)
    }),
    [a]
  );
}
function et(e) {
  const n = Ht(Mn)?.definition ?? null, r = n?.nodes ?? [], i = n?.edges ?? [];
  return W(
    () => e ? Cl(r, i, e) : [],
    [r, i, e]
  );
}
function Ze({
  value: e,
  onChange: n,
  nodeId: r,
  label: i = "Source image path",
  help: a = "Optional. Defaults to the image produced upstream.",
  placeholder: s = "$.trigger.imageRef"
}) {
  const d = et(r ?? null);
  return /* @__PURE__ */ o(F, { label: i, help: a, children: [
    /* @__PURE__ */ t(
      Se,
      {
        size: "sm",
        mono: !0,
        spellCheck: !1,
        value: e ?? "",
        onChange: (c) => n(c.target.value.trim() || void 0),
        placeholder: s,
        "aria-label": i
      }
    ),
    /* @__PURE__ */ t(
      We,
      {
        samples: d.map((c) => c.path),
        onSelect: n,
        "aria-label": "Upstream image refs"
      }
    )
  ] });
}
function In({
  label: e,
  checked: n,
  onChange: r,
  help: i,
  disabled: a,
  "data-testid": s
}) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ t(
        fa,
        {
          size: "sm",
          checked: n,
          onChange: r,
          disabled: a,
          "aria-label": e,
          "data-testid": s
        }
      ),
      /* @__PURE__ */ t("span", { className: "text-xs font-semibold text-text-secondary", children: e })
    ] }),
    i && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: i })
  ] });
}
const Il = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function Sl(e, n, r) {
  const i = e.trim();
  if (i === "") return null;
  const a = /^\*\/(\d+)$/.exec(i);
  if (a) {
    const c = Number(a[1]);
    return !Number.isFinite(c) || c <= 0 ? null : { match: "*", step: c };
  }
  if (i === "*") return { match: "*" };
  const s = /^(\d+)-(\d+)$/.exec(i);
  if (s) {
    const c = Number(s[1]), l = Number(s[2]);
    if (!Number.isFinite(c) || !Number.isFinite(l) || c < n || l > r || c > l) return null;
    const p = [];
    for (let u = c; u <= l; u++) p.push(u);
    return { match: p };
  }
  if (i.includes(",")) {
    const c = i.split(","), l = /* @__PURE__ */ new Set(), p = [];
    for (const u of c) {
      const f = Number(u.trim());
      if (!Number.isFinite(f) || !Number.isInteger(f) || f < n || f > r) return null;
      l.has(f) || (l.add(f), p.push(f));
    }
    return p.length === 0 ? null : { match: p };
  }
  const d = Number(i);
  return !Number.isFinite(d) || !Number.isInteger(d) || d < n || d > r ? null : { match: [d] };
}
function Tl(e) {
  if (typeof e != "string") return null;
  const n = e.trim().split(/\s+/);
  if (n.length !== 5) return null;
  const r = {};
  for (let i = 0; i < 5; i++) {
    const a = Il[i], s = Sl(n[i], a.min, a.max);
    if (!s) return null;
    r[a.name] = s;
  }
  return r;
}
function Nt(e, n, r) {
  return e.match === "*" ? !e.step || e.step === 1 ? !0 : (n - r) % e.step === 0 : e.match.includes(n);
}
function $l(e, n) {
  return Nt(e.minute, n.getMinutes(), 0) && Nt(e.hour, n.getHours(), 0) && Nt(e.dayOfMonth, n.getDate(), 1) && Nt(e.month, n.getMonth() + 1, 1) && Nt(e.dayOfWeek, n.getDay(), 0);
}
function Rl(e, n, r) {
  const i = [], a = new Date(n.getTime());
  a.setSeconds(0, 0), a.setMinutes(a.getMinutes() + 1);
  const s = 1440 * 366, d = new Date(a.getTime());
  for (let c = 0; c < s && i.length < r; c++)
    $l(e, d) && i.push(new Date(d.getTime())), d.setMinutes(d.getMinutes() + 1);
  return i;
}
const dr = /^[a-zA-Z0-9_-]{1,64}$/, Al = "http://localhost:13001";
function Pl() {
  try {
    const e = localStorage.getItem("ws_document_types_v1");
    if (!e) return [];
    const n = JSON.parse(e);
    return Array.isArray(n) ? n.filter((r) => typeof r == "object" && r !== null).filter((r) => typeof r.id == "string" && typeof r.name == "string").map((r) => ({ id: r.id, name: r.name })) : [];
  } catch {
    return [];
  }
}
const Ml = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function Dl({ data: e, onChange: n }) {
  const { toast: r } = Gt(), a = Ht(Mn)?.definition?.triggerBinding?.webhookSecret, [s, d] = S(!1), c = e.triggerType.startsWith("document."), l = W(() => c ? Pl() : [], [c]), p = c && !e.documentTypeId, u = e.triggerType === "schedule" && !e.schedule, f = e.triggerType === "webhook" && !e.webhookPath, h = e.webhookPath ?? "", g = e.triggerType === "webhook" && h.length > 0 && !dr.test(h), x = e.triggerType === "webhook" && dr.test(h) ? `${Al}/hooks/pipeline/${h}` : null, m = () => {
    x && navigator.clipboard.writeText(x).then(() => r("Webhook URL copied", { type: "success" })).catch(() => r("Could not copy webhook URL", { type: "error" }));
  }, v = () => {
    a && navigator.clipboard.writeText(a).then(() => r("Webhook secret copied", { type: "success" })).catch(() => r("Could not copy webhook secret", { type: "error" }));
  }, w = e.triggerType === "schedule" ? e.schedule ?? "" : "", b = W(
    () => w ? Tl(w) : null,
    [w]
  ), N = W(() => b ? Rl(b, /* @__PURE__ */ new Date(), 3) : [], [b]), y = e.triggerType === "schedule" && !!w && !b, k = e.triggerType === "document.finalize" ? "On finalize" : e.triggerType === "document.submit" ? "On submit for review" : e.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(F, { label: "Trigger type", required: !0, children: /* @__PURE__ */ t(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.triggerType,
        onChange: (C) => n({ triggerType: C.target.value }),
        children: Ml.map((C) => /* @__PURE__ */ t("option", { value: C.value, children: C.label }, C.value))
      }
    ) }),
    c && /* @__PURE__ */ o(
      F,
      {
        label: "Document type",
        required: !0,
        error: p ? "Select a document type." : void 0,
        help: p ? void 0 : "Which document type should trigger this pipeline.",
        children: [
          /* @__PURE__ */ o(
            "select",
            {
              className: I(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
                p ? "border-[#dc2626]" : "border-border-field"
              ),
              value: e.documentTypeId ?? "",
              onChange: (C) => n({ documentTypeId: C.target.value || void 0 }),
              children: [
                /* @__PURE__ */ t("option", { value: "", children: "— select a document type —" }),
                l.map((C) => /* @__PURE__ */ t("option", { value: C.id, children: C.name }, C.id))
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
      F,
      {
        label: "Schedule (cron)",
        required: !0,
        error: u ? "Cron expression is required." : y ? "Invalid cron expression — supports *, */N, N,M, A-B, exact values." : void 0,
        help: !u && !y ? "5-field cron: minute hour day month weekday." : void 0,
        children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "text",
              className: I(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                u || y ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "*/15 * * * *",
              value: e.schedule ?? "",
              onChange: (C) => n({ schedule: C.target.value })
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
        F,
        {
          label: "Path",
          required: !0,
          error: f ? "Webhook path is required." : g ? "Path must be alphanumeric (plus _, -)" : void 0,
          help: !f && !g ? "Alphanumeric, _, or - (max 64 chars). No leading slash." : void 0,
          children: /* @__PURE__ */ t(
            "input",
            {
              type: "text",
              className: I(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                f || g ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "weekly-digest",
              value: h,
              onChange: (C) => n({ webhookPath: C.target.value })
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
        /* @__PURE__ */ t("div", { className: "mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: a ? /* @__PURE__ */ o(H, { children: [
          /* @__PURE__ */ t("span", { className: "flex-1", "aria-label": "webhook secret", children: s ? a : "•".repeat(32) }),
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
              onClick: v,
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
const pr = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, El = 3e4;
function Ol(e) {
  return e < 1e3 ? `${Math.round(e)}ms` : e < 6e4 ? `${(e / 1e3).toFixed(e < 1e4 ? 1 : 0)}s` : `${Math.round(e / 6e4)}m`;
}
function _l(e) {
  const n = [];
  for (let r = 1; r < e.maxAttempts; r++) {
    const i = e.backoffMs * Math.pow(e.backoffMultiplier, r - 1);
    n.push(Math.min(i, El));
  }
  return n;
}
function Ot({ value: e, onChange: n }) {
  const r = e !== void 0, i = e ?? pr, a = r ? _l(i) : [], d = a.reduce((c, l) => c + l, 0) > 300 * 1e3;
  return /* @__PURE__ */ o("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          checked: r,
          onChange: (c) => n(c.target.checked ? pr : void 0),
          "aria-label": "Enable retries"
        }
      ),
      "Retry policy"
    ] }),
    !r && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-1", children: "No retries — failure is terminal on first attempt." }),
    r && /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-3 gap-2 mt-1", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Max attempts" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "number",
              min: 1,
              max: 10,
              step: 1,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full mt-0.5 font-inherit",
              value: i.maxAttempts,
              onChange: (c) => {
                const l = Math.max(1, Math.min(10, parseInt(c.target.value, 10) || 1));
                n({ ...i, maxAttempts: l });
              },
              "aria-label": "Max attempts"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Initial backoff (ms)" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "number",
              min: 0,
              step: 100,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full mt-0.5 font-inherit",
              value: i.backoffMs,
              onChange: (c) => {
                const l = Math.max(0, parseInt(c.target.value, 10) || 0);
                n({ ...i, backoffMs: l });
              },
              "aria-label": "Initial backoff in milliseconds"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Backoff multiplier" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "number",
              min: 1,
              max: 4,
              step: 0.5,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full mt-0.5 font-inherit",
              value: i.backoffMultiplier,
              onChange: (c) => {
                const l = Math.max(1, Math.min(4, parseFloat(c.target.value) || 1));
                n({ ...i, backoffMultiplier: l });
              },
              "aria-label": "Backoff multiplier"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: i.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : a.length === 0 ? `Retries up to ${i.maxAttempts}× with no delay.` : `Retries up to ${i.maxAttempts}× with delays: ${a.map(Ol).join(", ")}.` }),
      d && /* @__PURE__ */ t("div", { className: "text-[11px] text-[#ca8a04] mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const Ll = {
  string: "bg-info-bg text-info-fg border-info-border",
  number: "bg-accent-bg text-accent-fg border-accent-border",
  boolean: "bg-warning-bg text-warning-fg border-warning-border",
  object: "bg-neutral-bg text-neutral-fg border-neutral-border",
  array: "bg-neutral-bg text-neutral-fg border-neutral-border",
  image: "bg-success-bg text-success-fg border-success-border"
};
function Qt({
  paths: e,
  unresolved: n = [],
  onInsert: r,
  onRevealNode: i,
  className: a
}) {
  return /* @__PURE__ */ o("div", { className: I("flex flex-col gap-1.5", a), "data-testid": "context-variable-picker", children: [
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
            Ll[s.kind]
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
    i && e.length > 0 && /* @__PURE__ */ o("details", { className: "text-[11px] text-text-secondary", children: [
      /* @__PURE__ */ t("summary", { className: "cursor-pointer select-none", children: "Where each value comes from" }),
      /* @__PURE__ */ t("ul", { className: "m-0 mt-1 list-none p-0", children: e.map((s) => /* @__PURE__ */ o("li", { className: "flex items-baseline gap-1.5 py-0.5", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => i(s.sourceNodeId),
            className: "bg-transparent border-none p-0 cursor-pointer text-primary underline font-inherit text-[11px]",
            children: s.source
          }
        ),
        /* @__PURE__ */ t("span", { className: "font-mono text-[10px] text-text-tertiary", children: s.path })
      ] }, s.path)) })
    ] })
  ] });
}
const Bl = [
  { value: "anthropic", label: "Anthropic" },
  { value: "bedrock", label: "Bedrock" },
  { value: "claude-code", label: "Claude Code (subprocess)" }
], Ul = {
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
function jl(e, n) {
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
function ur(e, n) {
  return e.replace(/\{\{\s*([\w.[\]-]+)\s*\}\}/g, (r, i) => {
    const a = n.get(i);
    return a ? jl(i, a) : `{{${i}}}`;
  });
}
function Fl({ data: e, onChange: n, nodeId: r }) {
  const [i, a] = S(!1), { paths: s, unresolved: d } = Xt(r ?? null), c = new Map(s.map((m) => [m.path, m.kind])), l = d(
    `${e.systemPrompt ?? ""}
${e.userPromptTemplate ?? ""}`
  ), p = !e.systemPrompt?.trim(), u = !e.userPromptTemplate?.trim(), f = qo(), h = (m) => f(
    `llm:${m}`,
    Ul[m].map((v) => ({ value: v }))
  ), g = h(e.provider), x = (m) => {
    const v = h(m).map((b) => b.value), w = v.includes(e.model) ? e.model : v[0];
    n({ provider: m, model: w });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(F, { label: "Provider", required: !0, children: /* @__PURE__ */ t(
      Ae,
      {
        size: "sm",
        value: e.provider,
        onChange: (m) => x(m.target.value),
        "aria-label": "Provider",
        options: Bl
      }
    ) }),
    /* @__PURE__ */ t(F, { label: "Model", required: !0, children: /* @__PURE__ */ t(
      Ae,
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
    /* @__PURE__ */ t(F, { label: "Available context", children: /* @__PURE__ */ t(
      Qt,
      {
        paths: s,
        unresolved: l,
        onInsert: (m) => n({ userPromptTemplate: `${e.userPromptTemplate ?? ""}${m}` })
      }
    ) }),
    /* @__PURE__ */ t(
      F,
      {
        label: "System prompt",
        required: !0,
        error: p ? "System prompt is required." : void 0,
        help: p ? void 0 : "Sets the model's role and constraints.",
        children: /* @__PURE__ */ t(
          "textarea",
          {
            className: I(
              "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]",
              p ? "border-[#dc2626]" : "border-border-field"
            ),
            value: e.systemPrompt,
            onChange: (m) => n({ systemPrompt: m.target.value })
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "User prompt template",
        required: !0,
        error: u ? "User prompt template is required." : void 0,
        help: u ? void 0 : "Supports {{ context.* }} substitution — click a pill above to append.",
        children: /* @__PURE__ */ t(
          _n,
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
    /* @__PURE__ */ o(ut, { title: "Advanced", defaultCollapsed: !0, children: [
      /* @__PURE__ */ o(
        F,
        {
          label: "Temperature",
          help: "0 = deterministic, 1 = creative.",
          children: [
            /* @__PURE__ */ t("span", { className: "text-text-tertiary text-xs ml-2", children: (e.temperature ?? 0.7).toFixed(1) }),
            /* @__PURE__ */ t(
              "input",
              {
                type: "range",
                min: 0,
                max: 1,
                step: 0.1,
                value: e.temperature ?? 0.7,
                onChange: (m) => n({ temperature: parseFloat(m.target.value) }),
                className: "w-full mt-1"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ t(F, { label: "Max tokens", help: "Upper bound on response length.", children: /* @__PURE__ */ t(
        "input",
        {
          type: "number",
          min: 1,
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
          value: e.maxTokens ?? "",
          onChange: (m) => {
            const v = m.target.value;
            n({ maxTokens: v === "" ? void 0 : Math.max(1, parseInt(v, 10) || 0) });
          }
        }
      ) }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "checkbox",
              checked: e.streaming,
              onChange: (m) => n({ streaming: m.target.checked })
            }
          ),
          "Streaming"
        ] }),
        /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Stream tokens as they are generated." })
      ] }),
      /* @__PURE__ */ t(
        Ot,
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
        onClick: () => a((m) => !m),
        className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit shrink-0",
        children: [
          i ? "▾" : "▶",
          " Preview with sample context"
        ]
      }
    ),
    i && /* @__PURE__ */ o("div", { className: "bg-surface-inset border border-border rounded-lg p-3 flex flex-col gap-2.5", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved system prompt" }),
        /* @__PURE__ */ t("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: ur(e.systemPrompt || "(empty)", c) })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ t("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: ur(e.userPromptTemplate || "(empty)", c) })
      ] }),
      /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary", children: s.length > 0 ? "Placeholders describe the shape of each upstream value; unresolved paths stay in braces." : "No upstream context — connect this node to see what it can reference." })
    ] })
  ] });
}
const zl = ["context", "context.steps", "context.trigger"], ql = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function Wl({ data: e, onChange: n }) {
  const r = !e.expression?.trim();
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(F, { label: "Type", required: !0, children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: ql.map((i) => /* @__PURE__ */ o(
      "label",
      {
        className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
        children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "radio",
              name: "transform-type",
              value: i.value,
              checked: e.transformType === i.value,
              onChange: () => n({ transformType: i.value })
            }
          ),
          i.label
        ]
      },
      i.value
    )) }) }),
    /* @__PURE__ */ t(
      F,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : e.transformType === "jsonpath" ? 'e.g. $.items[?(@.status == "active")]' : e.transformType === "template" ? "Mustache-style: {{ context.doc.title }}" : e.transformType === "javascript" ? "return ctx.items.filter(x => x.active)" : void 0,
        children: /* @__PURE__ */ t(
          _n,
          {
            value: e.expression,
            onChange: (i) => n({ expression: i }),
            language: e.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: zl,
            "aria-label": "Transform expression"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "Output key (optional)",
        help: `If set, writes to context.${e.outputKey || "outputKey"}. Otherwise merges into root context.`,
        children: /* @__PURE__ */ t(
          "input",
          {
            type: "text",
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
            value: e.outputKey ?? "",
            onChange: (i) => n({ outputKey: i.target.value || void 0 }),
            placeholder: "activeItems"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      Ot,
      {
        value: e.retryPolicy,
        onChange: (i) => n({ retryPolicy: i })
      }
    ),
    /* @__PURE__ */ t(F, { label: "Preview", children: /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mb-1", children: "Sample input" }),
        /* @__PURE__ */ t(
          "textarea",
          {
            disabled: !0,
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[11px] bg-surface-inset text-text-tertiary outline-none w-full font-mono resize-y min-h-[80px]",
            placeholder: '{ "items": [...] }'
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mb-1", children: "Sample output" }),
        /* @__PURE__ */ t(
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
const Vl = ["context.trigger", "context.steps"];
function Kl({ data: e, onChange: n }) {
  const r = !e.expression?.trim();
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(
      F,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : "e.g. context.llm.response.length > 500",
        children: /* @__PURE__ */ t(
          _n,
          {
            value: e.expression,
            onChange: (i) => n({ expression: i }),
            language: "javascript",
            variables: Vl,
            "aria-label": "Condition expression"
          }
        )
      }
    ),
    /* @__PURE__ */ t(F, { label: "Label (optional — shown on node face)", help: "A short name so this branch is easy to spot.", children: /* @__PURE__ */ t(
      Se,
      {
        size: "sm",
        value: e.label ?? "",
        onChange: (i) => n({ label: i.target.value || void 0 }),
        placeholder: "Long summary?",
        "aria-label": "Condition label"
      }
    ) })
  ] });
}
const Hl = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], Jl = {
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
function Gl({ data: e, onChange: n }) {
  const r = Jl[e.actionType], i = e.config ?? {}, a = typeof i.retryCount == "number" ? i.retryCount : 3, s = e.onError === "route-error" ? "route-error" : typeof i.retryCount == "number" ? "retry" : "halt", d = (l, p) => {
    n({ config: { ...i, [l]: p } });
  }, c = (l) => {
    if (l === "route-error") {
      const { retryCount: p, ...u } = i;
      n({ onError: "route-error", config: u });
    } else if (l === "halt") {
      const { retryCount: p, ...u } = i;
      n({ onError: "fail-run", config: u });
    } else
      n({ onError: "fail-run", config: { ...i, retryCount: a } });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(F, { label: "Action type", required: !0, children: /* @__PURE__ */ t(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.actionType,
        onChange: (l) => n({ actionType: l.target.value, config: {} }),
        children: Hl.map((l) => /* @__PURE__ */ t("option", { value: l.value, children: l.label }, l.value))
      }
    ) }),
    /* @__PURE__ */ t(F, { label: "Configuration", children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2.5", children: r.map((l) => /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: l.label }),
      l.multiline ? /* @__PURE__ */ t(
        "textarea",
        {
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[48px] mt-0.5",
          rows: 2,
          placeholder: l.placeholder,
          value: typeof i[l.key] == "string" ? i[l.key] : "",
          onChange: (p) => d(l.key, p.target.value)
        }
      ) : /* @__PURE__ */ t(
        "input",
        {
          type: "text",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit mt-0.5",
          placeholder: l.placeholder,
          value: typeof i[l.key] == "string" ? i[l.key] : "",
          onChange: (p) => d(l.key, p.target.value)
        }
      ),
      l.help && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: l.help })
    ] }, l.key)) }) }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "checkbox",
            checked: !!e.idempotent,
            onChange: (l) => n({ idempotent: l.target.checked })
          }
        ),
        "Idempotent"
      ] }),
      /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "This action is safe to retry." })
    ] }),
    e.idempotent && /* @__PURE__ */ o(F, { label: "Dedup scope", children: [
      /* @__PURE__ */ o(
        "select",
        {
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
          value: e.idempotencyMode ?? "per-step",
          onChange: (l) => n({ idempotencyMode: l.target.value }),
          children: [
            /* @__PURE__ */ t("option", { value: "per-step", children: "Per step — fire once regardless of retries" }),
            /* @__PURE__ */ t("option", { value: "per-attempt", children: "Per attempt — fire once per retry window" })
          ]
        }
      ),
      /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: (e.idempotencyMode ?? "per-step") === "per-step" ? "Retries skip this action if it already succeeded. Best for post-comment, notify." : "Each retry attempt can execute the action. Best for idempotent PUTs/webhooks." })
    ] }),
    /* @__PURE__ */ t(
      Ot,
      {
        value: e.retryPolicy,
        onChange: (l) => n({ retryPolicy: l })
      }
    ),
    /* @__PURE__ */ t(F, { label: "On error", children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ o("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: s === "route-error",
            onChange: () => c("route-error")
          }
        ),
        "Route to error handle"
      ] }),
      /* @__PURE__ */ o("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: s === "halt",
            onChange: () => c("halt")
          }
        ),
        "Halt pipeline"
      ] }),
      /* @__PURE__ */ o("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: s === "retry",
            onChange: () => c("retry")
          }
        ),
        "Retry up to",
        /* @__PURE__ */ t(
          "input",
          {
            type: "number",
            min: 1,
            disabled: s !== "retry",
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-16 flex-none font-inherit",
            value: a,
            onChange: (l) => {
              const p = Math.max(1, parseInt(l.target.value, 10) || 1);
              n({ onError: "fail-run", config: { ...i, retryCount: p } });
            }
          }
        ),
        "times"
      ] })
    ] }) })
  ] });
}
const dt = 2, kt = 8;
function mr(e, n) {
  const r = e ?? [];
  return r.length === n ? r : r.length > n ? r.slice(0, n) : [...r, ...Array(n - r.length).fill("")];
}
function Yl({ data: e, onChange: n }) {
  const r = Math.max(dt, Math.min(kt, e.branchCount || dt)), i = mr(e.branchLabels, r), a = (d) => {
    const c = Math.max(dt, Math.min(kt, d));
    n({
      branchCount: c,
      branchLabels: mr(e.branchLabels, c)
    });
  }, s = (d, c) => {
    const l = [...i];
    l[d] = c, n({ branchLabels: l });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(
      F,
      {
        label: "Branch count",
        required: !0,
        help: `Between ${dt} and ${kt} parallel branches.`,
        children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary text-xs ml-2", children: r }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "range",
              min: dt,
              max: kt,
              step: 1,
              value: r,
              onChange: (d) => a(parseInt(d.target.value, 10)),
              className: "w-full mt-1"
            }
          ),
          /* @__PURE__ */ t(
            Ne,
            {
              size: "sm",
              min: dt,
              max: kt,
              value: r,
              onChange: a,
              "data-testid": "fork-branch-count"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(F, { label: "Branch labels (optional)", children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: i.map((d, c) => /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-xs text-text-secondary min-w-[72px]", children: [
        "Branch ",
        c,
        ":"
      ] }),
      /* @__PURE__ */ t(
        Se,
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
const Xl = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], Ql = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function Zl({ data: e, onChange: n }) {
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(F, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ t(
        Kn,
        {
          name: "join-mode",
          value: e.mode,
          onChange: (r) => n({ mode: r }),
          options: Xl.map((r) => ({
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
          Ne,
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
    /* @__PURE__ */ t(F, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ t(
      Kn,
      {
        name: "join-merge",
        value: e.mergeStrategy,
        onChange: (r) => n({ mergeStrategy: r }),
        options: Ql.map((r) => ({
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
const Pt = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5
};
function ec(e) {
  return !e || e <= 0 ? "minutes" : e % Pt.hours === 0 ? "hours" : e % Pt.minutes === 0 ? "minutes" : "seconds";
}
function tc({ data: e, onChange: n }) {
  const r = e.approvers ?? [], i = r.length === 0, [a, s] = S(() => ec(e.timeoutMs)), d = e.timeoutMs !== void 0 ? Math.round(e.timeoutMs / Pt[a]) : "", c = r.filter((g) => g.type === "user").map((g) => g.value), l = (g) => {
    const x = r.filter((w) => w.type === "role"), v = [...g.map((w) => ({ type: "user", value: w })), ...x];
    n({
      approvers: v,
      // Clamp requiredCount so it never exceeds approvers.length (min 1).
      requiredCount: Math.max(1, Math.min(e.requiredCount || 1, v.length || 1))
    });
  }, p = (g) => {
    const x = r.filter((m, v) => v !== g);
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
    n({ timeoutMs: x * Pt[a] });
  }, f = (g) => {
    s(g), typeof d == "number" && !Number.isNaN(d) && n({ timeoutMs: d * Pt[g] });
  }, h = Math.max(1, r.length);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(
      F,
      {
        label: "Approvers",
        required: !0,
        error: i ? "At least one approver is required." : void 0,
        help: i ? void 0 : "Who can approve this step.",
        children: [
          /* @__PURE__ */ t(
            ua,
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
                g.type === "role" ? "bg-[#fffbeb] text-[#d97706]" : "bg-[#eff6ff] text-[#2563eb]"
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
      F,
      {
        label: "Required count",
        required: !0,
        help: "How many approvers must say yes.",
        children: /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "number",
              min: 1,
              max: h,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-24 font-inherit",
              value: e.requiredCount || 1,
              onChange: (g) => {
                const x = parseInt(g.target.value, 10), m = Math.max(1, Math.min(h, Number.isNaN(x) ? 1 : x));
                n({ requiredCount: m });
              }
            }
          ),
          /* @__PURE__ */ o("span", { className: "text-text-tertiary text-xs", children: [
            e.requiredCount || 1,
            " of ",
            h
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ o(F, { label: "Timeout", help: "Leave blank for no timeout.", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "number",
            min: 0,
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-24 flex-none font-inherit",
            value: d,
            onChange: (g) => u(g.target.value),
            placeholder: "24"
          }
        ),
        /* @__PURE__ */ o(
          "select",
          {
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-[120px] flex-none font-inherit",
            value: a,
            onChange: (g) => f(g.target.value),
            children: [
              /* @__PURE__ */ t("option", { value: "seconds", children: "seconds" }),
              /* @__PURE__ */ t("option", { value: "minutes", children: "minutes" }),
              /* @__PURE__ */ t("option", { value: "hours", children: "hours" })
            ]
          }
        )
      ] }),
      e.timeoutMs !== void 0 && e.timeoutMs > 0 && /* @__PURE__ */ o("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "If timeout" }),
        /* @__PURE__ */ t("div", { className: "flex gap-3 mt-1", children: ["reject", "approve"].map((g) => /* @__PURE__ */ o(
          "label",
          {
            className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
            children: [
              /* @__PURE__ */ t(
                "input",
                {
                  type: "radio",
                  name: "approval-timeout-action",
                  checked: (e.timeoutAction ?? "reject") === g,
                  onChange: () => n({ timeoutAction: g })
                }
              ),
              g === "reject" ? "Reject" : "Approve"
            ]
          },
          g
        )) })
      ] })
    ] }),
    /* @__PURE__ */ t(F, { label: "Message for approver (optional)", help: "Shown to the approver when the request is sent.", children: /* @__PURE__ */ t(
      "textarea",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]",
        value: e.message ?? "",
        onChange: (g) => n({ message: g.target.value || void 0 }),
        placeholder: "Please review the summary before it's posted to the document."
      }
    ) })
  ] });
}
function Sn(e) {
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
function bo(e) {
  const n = Array.isArray(e.type) ? e.type[0] : e.type;
  if (n === "array") {
    const r = e.items ? Array.isArray(e.items.type) ? e.items.type[0] : e.items.type : void 0;
    return r ? `array of ${r}` : "array";
  }
  return n ?? "unknown";
}
function Mt(e, n, r, i, a) {
  if (a.has(e)) return;
  a.add(e);
  const s = Array.isArray(e.type) ? e.type[0] : e.type, d = [e.anyOf, e.oneOf, e.allOf].filter(Boolean);
  for (const c of d)
    for (const l of c)
      Mt(l, n, r, i, a);
  if (s === "object" && e.properties) {
    for (const [c, l] of Object.entries(e.properties)) {
      const p = `${n}.${c}`, u = Sn(l);
      i.push({
        path: p,
        label: `${c} (${bo(l)})`,
        depth: r,
        kind: u,
        isArrayItems: u === "array"
      }), Mt(l, p, r + 1, i, a);
    }
    return;
  }
  if (s === "array") {
    const c = `${n}[*]`, l = e.items, p = l ? Sn(l) : "unknown";
    i.push({
      path: c,
      label: `${n.slice(n.lastIndexOf(".") + 1)}[*] (each item)`,
      depth: r,
      kind: p,
      isArrayItems: !0
    }), l && Mt(l, c, r + 1, i, a);
  }
}
function nc(e, n = "$") {
  if (!e || typeof e != "object") return [];
  const r = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(e.type) ? e.type[0] : e.type) === "object" && e.properties)
    for (const [s, d] of Object.entries(e.properties)) {
      const c = `${n}.${s}`, l = Sn(d);
      r.push({
        path: c,
        label: `${s} (${bo(d)})`,
        depth: 0,
        kind: l,
        isArrayItems: l === "array"
      }), Mt(d, c, 1, r, i);
    }
  else
    Mt(e, n, 0, r, i);
  return r;
}
const rc = {};
function oc() {
  return `${(typeof import.meta < "u" && rc?.VITE_SOCIAL_API_URL) ?? ""}/api/pipeline/output-schemas`;
}
let an = null, Ct = null;
async function ac() {
  return an || (Ct || (Ct = fetch(oc()).then((e) => {
    if (!e.ok) throw new Error(`HTTP ${e.status}`);
    return e.json();
  }).then((e) => (an = e, Ct = null, e)).catch((e) => {
    throw Ct = null, e;
  })), Ct);
}
const ic = {
  array: "bg-primary-bg text-primary-fg border-primary-border",
  object: "bg-surface-panel text-text-secondary border-border",
  string: "bg-success-bg text-success-fg border-success-border",
  number: "bg-warning-bg text-warning-fg border-warning-border",
  boolean: "bg-pink-50 text-pink-700 border-pink-200",
  unknown: "bg-surface-panel text-text-tertiary border-border"
};
function sc({ kind: e }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: I(
        "inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4",
        ic[e]
      ),
      children: e
    }
  );
}
function lc({ entry: e, isSelected: n, onPick: r }) {
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
        /* @__PURE__ */ t(sc, { kind: e.kind })
      ]
    }
  );
}
function cc({
  value: e,
  onChange: n,
  upstreamKind: r,
  upstreamSchema: i
}) {
  const [a, s] = S("idle"), [d, c] = S(null), l = ce(!0);
  oe(() => (l.current = !0, () => {
    l.current = !1;
  }), []);
  const p = W(() => i !== void 0 ? i : d, [i, d]);
  oe(() => {
    !r || i !== void 0 || (s("loading"), ac().then((m) => {
      if (!l.current) return;
      const v = m.schemas[r] ?? null;
      c(v), s("done");
    }).catch(() => {
      l.current && s("error");
    }));
  }, [r, i]);
  const u = W(
    () => nc(p),
    [p]
  ), f = p !== null && u.length > 0, h = E(
    (m) => {
      n(m);
    },
    [n]
  );
  if (!r && i === void 0)
    return /* @__PURE__ */ t(
      Zt,
      {
        value: e,
        onChange: n,
        enforcePrefix: !0,
        "data-testid": "scatter-path-plain-input"
      }
    );
  if (!f)
    return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
      a === "loading" && /* @__PURE__ */ o("p", { className: "text-[11px] text-text-tertiary leading-4", children: [
        "Loading schema for ",
        r,
        "…"
      ] }),
      a === "error" && /* @__PURE__ */ t("p", { className: "text-[11px] text-warning-fg leading-4", children: "Could not load schema — enter path manually." }),
      (a === "done" || i === null) && /* @__PURE__ */ o("p", { className: "text-[11px] text-text-tertiary leading-4", children: [
        "Schema unavailable for ",
        /* @__PURE__ */ t("span", { className: "font-mono", children: r }),
        " — enter path manually."
      ] }),
      /* @__PURE__ */ t(
        Zt,
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
          lc,
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
      Zt,
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
const sn = "text-[12px] font-semibold text-text-secondary", ln = "text-[11px] text-text-tertiary mt-0.5", dc = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary";
function pc(e) {
  const { definition: n } = Ke();
  return W(() => {
    if (!e || !n) return;
    const r = n.edges.find((a) => a.target === e);
    if (!r) return;
    const i = n.nodes.find((a) => a.id === r.source);
    if (i)
      return i.type;
  }, [e, n]);
}
function uc({ data: e, onChange: n }) {
  const { selectedNodeId: r } = Ke(), i = pc(r), a = e.maxConcurrency ?? "";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { className: sn, children: [
        "Items path",
        /* @__PURE__ */ t("span", { className: "text-danger-fg ml-1", "aria-hidden": !0, children: "*" })
      ] }),
      /* @__PURE__ */ t("div", { className: "mt-1", children: /* @__PURE__ */ t(
        cc,
        {
          value: e.itemsPath ?? "",
          onChange: (s) => n({ itemsPath: s }),
          upstreamKind: i
        }
      ) }),
      !e.itemsPath?.trim() && /* @__PURE__ */ t("div", { role: "alert", className: "text-[11px] text-danger-fg mt-0.5", children: "Items path is required." }),
      !!e.itemsPath && !e.itemsPath.startsWith("$.") && /* @__PURE__ */ o("div", { role: "alert", className: "text-[11px] text-danger-fg mt-0.5", children: [
        "Path must start with ",
        /* @__PURE__ */ t("code", { children: "$." })
      ] }),
      !!e.itemsPath?.startsWith("$.") && /* @__PURE__ */ t("div", { className: ln, children: "JSONPath into context resolving to an array. Each element becomes one scatter arm." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-item-alias", className: sn, children: [
        "Item alias ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(optional, default: item)" })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "scatter-item-alias",
          type: "text",
          spellCheck: !1,
          className: dc,
          value: e.itemAlias ?? "",
          onChange: (s) => n({ itemAlias: s.target.value.trim() || void 0 }),
          placeholder: "item"
        }
      ),
      /* @__PURE__ */ o("div", { className: ln, children: [
        "Key written to ",
        /* @__PURE__ */ t("code", { children: "$.scatter.<alias>" }),
        " for each arm."
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-max-concurrency", className: sn, children: [
        "Max concurrency ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(optional, default: 4)" })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "scatter-max-concurrency",
          type: "number",
          min: 1,
          max: 64,
          className: "mt-1 w-28 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary",
          value: a,
          onChange: (s) => {
            const d = s.target.value;
            n({
              maxConcurrency: d === "" ? void 0 : Math.max(1, parseInt(d, 10) || 1)
            });
          },
          placeholder: "4"
        }
      ),
      /* @__PURE__ */ t("div", { className: ln, children: "Maximum number of arms executing concurrently." })
    ] })
  ] });
}
const mc = [
  { value: "cover", label: "cover" },
  { value: "contain", label: "contain" },
  { value: "fill", label: "fill" },
  { value: "inside", label: "inside" },
  { value: "outside", label: "outside" }
];
function hc({ data: e, onChange: n, nodeId: r }) {
  const i = e.fit ?? "cover", a = i === "contain" || i === "fill";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(
      Ze,
      {
        value: e.sourceImagePath,
        onChange: (s) => n({ sourceImagePath: s }),
        nodeId: r
      }
    ),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ t("div", { className: "flex-1", children: /* @__PURE__ */ t(F, { label: "Width", children: /* @__PURE__ */ t(
        Ne,
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
      /* @__PURE__ */ t("div", { className: "flex-1", children: /* @__PURE__ */ t(F, { label: "Height", children: /* @__PURE__ */ t(
        Ne,
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
      F,
      {
        label: "Fit mode",
        help: "How the image fits the target dimensions. cover (default) crops, contain letterboxes, fill stretches.",
        children: /* @__PURE__ */ t(
          Ae,
          {
            size: "sm",
            value: i,
            onChange: (s) => n({ fit: s.target.value }),
            "aria-label": "Fit mode",
            options: mc
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      In,
      {
        label: "Do not enlarge if already smaller than target",
        checked: e.withoutEnlargement ?? !1,
        onChange: (s) => n({ withoutEnlargement: s }),
        "data-testid": "resize-without-enlargement"
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "Background colour",
        help: a ? "Hex colour used to fill letterbox padding." : "Only applies when fit is contain or fill.",
        children: /* @__PURE__ */ t(
          Se,
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
function fc(e) {
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
const Tn = "text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", gc = "flex-1 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", hr = "text-[12px] font-semibold text-text-secondary", xc = "text-[11px] text-text-tertiary mt-0.5";
function bc({ op: e, index: n, onUpdate: r, onRemove: i }) {
  return /* @__PURE__ */ o("div", { className: "border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2", "data-testid": `geo-op-card-${n}`, children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary font-semibold min-w-[20px]", children: [
        n + 1,
        "."
      ] }),
      /* @__PURE__ */ o(
        "select",
        {
          className: gc,
          value: e.op,
          onChange: (a) => r(fc(a.target.value)),
          "aria-label": `Op ${n + 1} type`,
          children: [
            /* @__PURE__ */ t("option", { value: "rotate", children: "Rotate" }),
            /* @__PURE__ */ t("option", { value: "flip", children: "Flip (vertical)" }),
            /* @__PURE__ */ t("option", { value: "flop", children: "Flop (horizontal)" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: i,
          className: "ml-auto text-[11px] font-semibold bg-transparent text-danger-fg border border-transparent rounded px-2 py-0.5 cursor-pointer hover:bg-danger-bg",
          "aria-label": `Remove op ${n + 1}`,
          children: "✕"
        }
      )
    ] }),
    e.op === "rotate" && /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t("label", { className: "text-[11px] text-text-tertiary min-w-[60px]", children: "Degrees" }),
        /* @__PURE__ */ t(
          "input",
          {
            type: "number",
            min: -360,
            max: 360,
            step: 90,
            className: `${Tn} w-24`,
            value: e.degrees,
            onChange: (a) => {
              const s = parseFloat(a.target.value);
              r({ ...e, degrees: Number.isFinite(s) ? s : 90 });
            },
            "aria-label": "Rotation degrees"
          }
        ),
        /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "°" })
      ] }),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t("label", { className: "text-[11px] text-text-tertiary min-w-[60px]", children: "Background" }),
        /* @__PURE__ */ t(
          "input",
          {
            type: "text",
            spellCheck: !1,
            className: `${Tn} flex-1`,
            value: e.background ?? "",
            onChange: (a) => r({ ...e, background: a.target.value.trim() || void 0 }),
            placeholder: "#000000"
          }
        )
      ] }),
      /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "checkbox",
            checked: e.trimAfter ?? !1,
            onChange: (a) => r({ ...e, trimAfter: a.target.checked }),
            className: "w-3.5 h-3.5 accent-primary"
          }
        ),
        "Trim after rotate"
      ] })
    ] })
  ] });
}
function yc({ data: e, onChange: n, nodeId: r }) {
  const i = et(r ?? null), a = e.operations ?? [], s = (l, p) => {
    n({ operations: a.map((u, f) => f === l ? p : u) });
  }, d = (l) => {
    n({ operations: a.filter((p, u) => u !== l) });
  }, c = () => {
    n({ operations: [...a, { op: "rotate", degrees: 90 }] });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "transform-geo-source-image-path", className: hr, children: [
        "Source image path ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "transform-geo-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `mt-1 w-full ${Tn}`,
          value: e.sourceImagePath ?? "",
          onChange: (l) => n({ sourceImagePath: l.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ t(We, { samples: i.map((l) => l.path), onSelect: (l) => n({ sourceImagePath: l }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${hr} mb-2`, children: [
        "Operations ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      a.length === 0 && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mb-2 italic", children: "No operations — add at least one." }),
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: a.map((l, p) => /* @__PURE__ */ t(
        bc,
        {
          op: l,
          index: p,
          onUpdate: (u) => s(p, u),
          onRemove: () => d(p)
        },
        p
      )) }),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: c,
          className: `w-full text-[12px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer py-1.5 px-3 ${a.length > 0 ? "mt-2" : ""}`,
          "data-testid": "add-geo-op-btn",
          children: "+ Add operation"
        }
      ),
      /* @__PURE__ */ t("div", { className: `${xc} mt-1.5`, children: "Supported: Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror)." })
    ] })
  ] });
}
const vc = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "avif", label: "AVIF" }
], wc = ["jpeg", "webp", "avif"], Nc = ["webp", "avif"];
function kc({
  data: e,
  onChange: n,
  nodeId: r
}) {
  const i = e.format ?? "jpeg", a = wc.includes(i), s = Nc.includes(i), d = e.lossless ?? !1;
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(
      Ze,
      {
        value: e.sourceImagePath,
        onChange: (c) => n({ sourceImagePath: c }),
        nodeId: r
      }
    ),
    /* @__PURE__ */ t(F, { label: "Output format", children: /* @__PURE__ */ t(
      Ae,
      {
        size: "sm",
        value: i,
        onChange: (c) => n({ format: c.target.value }),
        "aria-label": "Output format",
        options: vc
      }
    ) }),
    a && /* @__PURE__ */ t(
      F,
      {
        label: "Quality",
        help: d ? "Ignored while lossless encoding is on." : "Higher is better quality and a larger file. 80 is a good default. Range 1–100.",
        children: /* @__PURE__ */ t(
          Ne,
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
      In,
      {
        label: "Lossless encoding",
        checked: d,
        onChange: (c) => n({ lossless: c }),
        help: "Overrides quality when on. Larger files, no compression artefacts.",
        "data-testid": "format-convert-lossless"
      }
    ),
    /* @__PURE__ */ t(
      In,
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
function Cc({ data: e, onChange: n, nodeId: r }) {
  const i = et(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(
      F,
      {
        label: "Source image path",
        help: "Optional. Defaults to the image produced upstream.",
        children: [
          /* @__PURE__ */ t(
            Se,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              value: e.sourceImagePath ?? "",
              onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
              placeholder: "$.trigger.imageRef",
              "aria-label": "Source image path"
            }
          ),
          /* @__PURE__ */ t(
            We,
            {
              samples: i.map((a) => a.path),
              onSelect: (a) => n({ sourceImagePath: a }),
              "aria-label": "Upstream image refs"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "Sigma",
        help: "Gaussian mask sigma. Higher is broader and stronger. Typical range 0.5–3.",
        children: /* @__PURE__ */ t(
          Ne,
          {
            size: "sm",
            min: 0.01,
            max: 10,
            step: 0.1,
            value: e.sigma,
            onChange: (a) => n({ sigma: a }),
            onClear: () => n({ sigma: void 0 }),
            placeholder: "1",
            "data-testid": "sharpen-sigma"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "m1 — flat area level",
        help: "Sharpening applied to flat (smooth) areas of the image.",
        children: /* @__PURE__ */ t(
          Ne,
          {
            size: "sm",
            min: 0,
            step: 0.1,
            value: e.m1,
            onChange: (a) => n({ m1: a }),
            onClear: () => n({ m1: void 0 }),
            placeholder: "leave blank for default",
            "data-testid": "sharpen-m1"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "m2 — jagged area level",
        help: "Sharpening applied to jagged (edge) areas of the image.",
        children: /* @__PURE__ */ t(
          Ne,
          {
            size: "sm",
            min: 0,
            step: 0.1,
            value: e.m2,
            onChange: (a) => n({ m2: a }),
            onClear: () => n({ m2: void 0 }),
            placeholder: "leave blank for default",
            "data-testid": "sharpen-m2"
          }
        )
      }
    )
  ] });
}
const Ic = [
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
function Sc({ data: e, onChange: n, nodeId: r }) {
  const i = !e.overlayImageId?.trim();
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(
      Ze,
      {
        value: e.sourceImagePath,
        onChange: (a) => n({ sourceImagePath: a }),
        nodeId: r
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "Overlay image ID",
        required: !0,
        error: i ? "Overlay image ID is required." : void 0,
        help: "The imageId of the watermark image already stored in the blob store.",
        children: /* @__PURE__ */ t(
          Se,
          {
            size: "sm",
            mono: !0,
            spellCheck: !1,
            invalid: i,
            value: e.overlayImageId ?? "",
            onChange: (a) => n({ overlayImageId: a.target.value.trim() }),
            placeholder: "img_xxxxxxxx",
            "aria-label": "Overlay image ID"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "Gravity",
        help: "Where the overlay sits on the source image. Default southeast.",
        children: /* @__PURE__ */ t(
          Ae,
          {
            size: "sm",
            value: e.gravity ?? "southeast",
            onChange: (a) => n({ gravity: a.target.value }),
            "aria-label": "Gravity",
            options: Ic
          }
        )
      }
    ),
    /* @__PURE__ */ t(F, { label: "Opacity", help: "0 to 1. Default 1.", children: /* @__PURE__ */ t(
      Ne,
      {
        size: "sm",
        min: 0,
        max: 1,
        step: 0.05,
        value: e.opacity ?? 1,
        onChange: (a) => n({ opacity: a }),
        "data-testid": "watermark-opacity"
      }
    ) }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ t("div", { className: "flex-1", children: /* @__PURE__ */ t(F, { label: "Offset X", children: /* @__PURE__ */ t(
        Ne,
        {
          size: "sm",
          step: 1,
          unit: "px",
          value: e.offsetX,
          onChange: (a) => n({ offsetX: a }),
          onClear: () => n({ offsetX: void 0 }),
          placeholder: "0",
          "data-testid": "watermark-offset-x"
        }
      ) }) }),
      /* @__PURE__ */ t("div", { className: "flex-1", children: /* @__PURE__ */ t(F, { label: "Offset Y", children: /* @__PURE__ */ t(
        Ne,
        {
          size: "sm",
          step: 1,
          unit: "px",
          value: e.offsetY,
          onChange: (a) => n({ offsetY: a }),
          onClear: () => n({ offsetY: void 0 }),
          placeholder: "0",
          "data-testid": "watermark-offset-y"
        }
      ) }) })
    ] })
  ] });
}
const fr = 50;
function Tc(e, n) {
  const [r, i] = S(e), [a, s] = S([]), [d, c] = S([]), l = ce(r);
  l.current = r;
  const p = E(
    (w) => {
      i((b) => {
        const N = w(b);
        return s((y) => {
          const k = [...y, b];
          return k.length > fr && k.shift(), k;
        }), c([]), n(N), N;
      });
    },
    [n]
  ), u = E(
    (w) => {
      p((b) => [...b, w]);
    },
    [p]
  ), f = E(
    (w, b, N) => {
      p(
        (y) => y.map((k) => k.id === w ? { ...k, x: b, y: N } : k)
      );
    },
    [p]
  ), h = E(
    (w, b, N, y, k) => {
      p(
        (C) => C.map((T) => T.id === w ? { ...T, x: b, y: N, width: y, height: k } : T)
      );
    },
    [p]
  ), g = E(
    (w, b) => {
      p(
        (N) => N.map((y) => y.id === w ? { ...y, label: b } : y)
      );
    },
    [p]
  ), x = E(
    (w) => {
      p((b) => b.filter((N) => N.id !== w));
    },
    [p]
  ), m = E(() => {
    s((w) => {
      if (w.length === 0) return w;
      const b = w[w.length - 1];
      c((y) => [...y, l.current]);
      const N = b;
      return i(N), n(N), w.slice(0, -1);
    });
  }, [n]), v = E(() => {
    c((w) => {
      if (w.length === 0) return w;
      const b = w[w.length - 1];
      s((y) => {
        const k = [...y, l.current];
        return k.length > fr && k.shift(), k;
      });
      const N = b;
      return i(N), n(N), w.slice(0, -1);
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
    redo: v,
    canUndo: a.length > 0,
    canRedo: d.length > 0
  };
}
function $c() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Ie(e, n, r) {
  return Math.max(n, Math.min(r, e));
}
function cn(e, n) {
  const r = n.getBoundingClientRect();
  return {
    x: Ie(e.clientX - r.left, 0, r.width),
    y: Ie(e.clientY - r.top, 0, r.height)
  };
}
function dn(e, n, r, i, a, s) {
  const d = a / r, c = s / i;
  return { x: e * d, y: n * c };
}
function gr(e, n, r) {
  return {
    left: `${e.x / n * 100}%`,
    top: `${e.y / r * 100}%`,
    width: `${e.width / n * 100}%`,
    height: `${e.height / r * 100}%`
  };
}
function Rc(e, n, r) {
  for (let i = r.length - 1; i >= 0; i--) {
    const a = r[i];
    if (e >= a.x && e <= a.x + a.width && n >= a.y && n <= a.y + a.height)
      return a;
  }
  return null;
}
function yo({
  imageUrl: e,
  imageWidth: n,
  imageHeight: r,
  boxes: i,
  onChange: a,
  readOnly: s = !1,
  className: d
}) {
  const c = ce(null), [l, p] = S({ kind: "idle" }), [u, f] = S(null), h = ce(null), { addBox: g, moveBox: x, resizeBox: m, setLabel: v, deleteBox: w } = Tc(
    i,
    a
  );
  oe(() => {
    u && h.current && (h.current.focus(), h.current.select());
  }, [u]);
  const b = E(
    (O) => {
      if (s || O.button !== 0) return;
      const A = c.current;
      if (!A) return;
      O.preventDefault(), A.setPointerCapture(O.pointerId);
      const { x: Y, y: z } = cn(O, A), _ = A.getBoundingClientRect(), { x: V, y: K } = dn(
        Y,
        z,
        _.width,
        _.height,
        n,
        r
      ), X = Rc(V, K, i);
      p(X ? {
        kind: "move",
        id: X.id,
        offsetX: V - X.x,
        offsetY: K - X.y,
        currentX: V,
        currentY: K
      } : { kind: "create", startX: V, startY: K, currentX: V, currentY: K });
    },
    [s, i, n, r]
  ), N = E(
    (O, A, Y) => {
      if (s) return;
      O.stopPropagation(), O.preventDefault();
      const z = c.current;
      if (!z) return;
      z.setPointerCapture(O.pointerId);
      const { x: _, y: V } = cn(O, z), K = z.getBoundingClientRect(), { x: X, y: me } = dn(_, V, K.width, K.height, n, r);
      p({ kind: "resize", id: A.id, corner: Y, origBox: { ...A }, currentX: X, currentY: me });
    },
    [s, n, r]
  ), y = E(
    (O) => {
      if (l.kind === "idle") return;
      const A = c.current;
      if (!A) return;
      const { x: Y, y: z } = cn(O, A), _ = A.getBoundingClientRect(), { x: V, y: K } = dn(Y, z, _.width, _.height, n, r);
      l.kind === "create" ? p((X) => X.kind === "create" ? { ...X, currentX: V, currentY: K } : X) : l.kind === "move" ? p((X) => X.kind === "move" ? { ...X, currentX: V, currentY: K } : X) : l.kind === "resize" && p((X) => X.kind === "resize" ? { ...X, currentX: V, currentY: K } : X);
    },
    [l.kind, n, r]
  ), k = E(
    (O) => {
      if (l.kind === "create") {
        const A = Math.min(l.startX, l.currentX), Y = Math.min(l.startY, l.currentY), z = Math.max(l.startX, l.currentX), _ = Math.max(l.startY, l.currentY), V = z - A, K = _ - Y;
        V >= 4 && K >= 4 && g({ id: $c(), x: A, y: Y, width: V, height: K });
      } else if (l.kind === "move") {
        const A = i.find((Y) => Y.id === l.id);
        if (A) {
          const Y = Ie(l.currentX - l.offsetX, 0, n - A.width), z = Ie(l.currentY - l.offsetY, 0, r - A.height);
          x(l.id, Y, z);
        }
      } else if (l.kind === "resize") {
        const { id: A, corner: Y, origBox: z, currentX: _, currentY: V } = l;
        let { x: K, y: X, width: me, height: q } = z;
        if (Y === "nw") {
          const de = Ie(_, 0, K + me - 4), ke = Ie(V, 0, X + q - 4);
          me = K + me - de, q = X + q - ke, K = de, X = ke;
        } else if (Y === "ne") {
          const de = Ie(V, 0, X + q - 4);
          me = Ie(_ - K, 4, n - K), q = X + q - de, X = de;
        } else if (Y === "sw") {
          const de = Ie(_, 0, K + me - 4);
          me = K + me - de, q = Ie(V - X, 4, r - X), K = de;
        } else
          me = Ie(_ - K, 4, n - K), q = Ie(V - X, 4, r - X);
        m(A, K, X, me, q);
      }
      p({ kind: "idle" });
    },
    [l, i, g, x, m, n, r]
  ), C = E(
    (O, A) => {
      s || (O.preventDefault(), w(A));
    },
    [s, w]
  ), T = E(
    (O, A) => {
      s || (O.key === "Delete" || O.key === "Backspace") && (O.preventDefault(), w(A));
    },
    [s, w]
  ), D = E(
    (O, A) => {
      s || (O.stopPropagation(), f({ id: A.id, value: A.label ?? "" }));
    },
    [s]
  ), P = E(() => {
    u && (v(u.id, u.value), f(null));
  }, [u, v]);
  let M = null;
  if (l.kind === "create") {
    const O = Math.min(l.startX, l.currentX), A = Math.min(l.startY, l.currentY), Y = Math.max(l.startX, l.currentX), z = Math.max(l.startY, l.currentY);
    Y - O >= 2 && z - A >= 2 && (M = { x: O, y: A, width: Y - O, height: z - A });
  }
  let re = null;
  if (l.kind === "move") {
    const O = i.find((A) => A.id === l.id);
    if (O) {
      const A = Ie(l.currentX - l.offsetX, 0, n - O.width), Y = Ie(l.currentY - l.offsetY, 0, r - O.height);
      re = { ...O, x: A, y: Y };
    }
  }
  let R = null;
  if (l.kind === "resize") {
    const { corner: O, origBox: A, currentX: Y, currentY: z } = l;
    let { x: _, y: V, width: K, height: X } = A;
    if (O === "nw") {
      const me = Ie(Y, 0, _ + K - 4), q = Ie(z, 0, V + X - 4);
      K = _ + K - me, X = V + X - q, _ = me, V = q;
    } else if (O === "ne") {
      const me = Ie(z, 0, V + X - 4);
      K = Ie(Y - _, 4, n - _), X = V + X - me, V = me;
    } else if (O === "sw") {
      const me = Ie(Y, 0, _ + K - 4);
      K = _ + K - me, X = Ie(z - V, 4, r - V), _ = me;
    } else
      K = Ie(Y - _, 4, n - _), X = Ie(z - V, 4, r - V);
    R = { ...A, x: _, y: V, width: K, height: X };
  }
  const J = /* @__PURE__ */ new Set();
  l.kind === "move" && J.add(l.id), l.kind === "resize" && J.add(l.id);
  const Q = (O, A) => {
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
        "aria-label": `Resize ${A}`,
        className: I(
          "absolute h-3 w-3 rounded-sm border border-primary bg-white shadow",
          Y[A]
        ),
        onPointerDown: (z) => N(z, O, A)
      },
      A
    );
  }, G = (O, A, Y, z) => {
    const _ = gr(O, n, r), V = u?.id === O.id;
    return /* @__PURE__ */ o(
      "div",
      {
        role: "none",
        "aria-label": `Bounding box${O.label ? ": " + O.label : ""}`,
        className: I(
          "absolute",
          A ? "opacity-60" : "opacity-100"
        ),
        style: {
          left: _.left,
          top: _.top,
          width: _.width,
          height: _.height,
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
              onDoubleClick: (K) => D(K, O),
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
      z
    );
  }, Z = () => {
    if (!M) return null;
    const O = gr(M, n, r);
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
              i.map((O) => J.has(O.id) ? null : G(O, !1, !0, `box-${O.id}`)),
              re && G(re, !0, !1, "ghost-move"),
              R && G(R, !0, !0, "ghost-resize"),
              Z()
            ]
          }
        ),
        !s && /* @__PURE__ */ t("div", { className: "pointer-events-none absolute bottom-1.5 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80", children: "Drag to add box" })
      ]
    }
  );
}
const Ac = [
  "$.scatter.item.bbox",
  "$.steps.visionAnalyze.output.extracted.regions[0].bbox",
  "$.trigger.payload.bbox"
], Pc = "crop-region", Mc = "crop", xr = "mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", pn = "text-[12px] font-semibold text-text-secondary", It = "text-[11px] text-text-tertiary mt-0.5";
function Dc(e) {
  const { definition: n } = Ke(), r = W(() => !e || !n ? null : n.edges.find((d) => d.target === e)?.source ?? null, [n, e]), a = he(r ?? "")?.images?.[0];
  return a ? { imageId: a.imageId, width: a.width, height: a.height } : null;
}
function Ec({
  data: e,
  onChange: n,
  currentNodeId: r
}) {
  const i = et(r ?? null), a = e.materialize !== !1, s = Dc(r), d = Pe(), c = W(() => e.bbox ? [
    {
      id: Pc,
      x: e.bbox.x,
      y: e.bbox.y,
      width: e.bbox.width,
      height: e.bbox.height,
      label: Mc
    }
  ] : [], [e.bbox]), l = E(
    (p) => {
      if (p.length === 0) {
        n({ bbox: void 0 });
        return;
      }
      const u = p[p.length - 1], f = {
        x: Math.round(u.x),
        y: Math.round(u.y),
        width: Math.round(u.width),
        height: Math.round(u.height)
      };
      n({ bbox: f });
    },
    [n]
  );
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-source-image-path", className: pn, children: [
        "Source image path",
        " ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "crop-source-image-path",
          type: "text",
          spellCheck: !1,
          className: xr,
          value: e.sourceImagePath ?? "",
          onChange: (p) => n({ sourceImagePath: p.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ o("div", { className: It, children: [
        "JSONPath to the imageId of the source image. Defaults server-side to",
        " ",
        /* @__PURE__ */ t("code", { children: "$.scatter.parentImageId" }),
        "."
      ] }),
      /* @__PURE__ */ t(
        We,
        {
          samples: i.map((p) => p.path),
          onSelect: (p) => n({ sourceImagePath: p })
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-bbox-path", className: pn, children: [
        "Bounding-box path",
        " ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "crop-bbox-path",
          type: "text",
          spellCheck: !1,
          className: xr,
          value: e.bboxPath ?? "",
          onChange: (p) => n({ bboxPath: p.target.value.trim() || void 0 }),
          placeholder: "$.scatter.item.bbox"
        }
      ),
      /* @__PURE__ */ o("div", { className: It, children: [
        "JSONPath to a bbox object ",
        /* @__PURE__ */ t("code", { children: "{ x, y, width, height }" }),
        " in pixels. Overrides the manual crop region below when present at run time."
      ] }),
      /* @__PURE__ */ t(
        We,
        {
          samples: Ac,
          onSelect: (p) => n({ bboxPath: p })
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { "data-testid": "crop-region-section", children: [
      /* @__PURE__ */ o("div", { className: pn, children: [
        "Crop region",
        " ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ t("div", { className: It, children: "Drag on the source image to paint the crop box. Drawing a new box replaces the previous one." }),
      s ? /* @__PURE__ */ o(H, { children: [
        /* @__PURE__ */ t(
          yo,
          {
            imageUrl: d(s.imageId),
            imageWidth: s.width,
            imageHeight: s.height,
            boxes: c,
            onChange: l,
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
            ] }) : /* @__PURE__ */ t("span", { className: I(It, "italic"), children: "No crop region yet — drag on the image to add one." })
          }
        )
      ] }) : /* @__PURE__ */ t(
        ot,
        {
          variant: "info",
          className: "mt-1.5",
          "data-testid": "crop-region-empty-banner",
          children: "Run the upstream node once to populate the source image, then drag here to paint a crop region."
        }
      )
    ] }),
    /* @__PURE__ */ o(
      "label",
      {
        htmlFor: "crop-materialize",
        className: "flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer",
        children: [
          /* @__PURE__ */ t(
            "input",
            {
              id: "crop-materialize",
              type: "checkbox",
              checked: a,
              onChange: (p) => n({ materialize: p.target.checked }),
              className: "w-3.5 h-3.5 accent-primary"
            }
          ),
          "Persist crop to blob store"
        ]
      }
    ),
    /* @__PURE__ */ t("div", { className: It, children: "When enabled (default), the cropped image is saved to the ImageBlobStore." })
  ] });
}
function Oc(e) {
  const { selectedNodeId: n } = Ke();
  return /* @__PURE__ */ t(Ec, { ...e, currentNodeId: n });
}
const _c = [
  { value: "luminosity", label: "Luminosity — 0.21R + 0.72G + 0.07B (perceptually accurate)" },
  { value: "average", label: "Average — (R+G+B)/3 (fast, flat)" },
  { value: "desaturate", label: "Desaturate — (max+min)/2 (Lightness channel)" }
];
function Lc({ data: e, onChange: n, nodeId: r }) {
  const i = e.algorithm ?? "luminosity", a = e.contrast ?? 1;
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(
      Ze,
      {
        value: e.sourceImagePath,
        onChange: (s) => n({ sourceImagePath: s }),
        nodeId: r,
        help: "JSONPath to the imageId of the source image.",
        placeholder: "$.scatter.parentImageId"
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "Greyscale algorithm",
        help: "Controls how RGB channels are weighted when converting to greyscale.",
        children: /* @__PURE__ */ t(
          Ae,
          {
            size: "sm",
            value: i,
            onChange: (s) => n({ algorithm: s.target.value }),
            "aria-label": "Greyscale algorithm",
            options: _c
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "Contrast multiplier",
        help: "Applied after greyscale conversion. 1 is no change, below 1 lowers contrast, above 1 raises it. Range 0–4.",
        children: /* @__PURE__ */ t(
          Ne,
          {
            size: "sm",
            min: 0,
            max: 4,
            step: 0.05,
            value: a,
            onChange: (s) => n({ contrast: s }),
            "data-testid": "adjust-bw-contrast"
          }
        )
      }
    )
  ] });
}
function Bc({
  value: e,
  onChange: n,
  uploadImage: r,
  getImageUrl: i,
  maxSize: a = 8 * 1024 * 1024,
  accept: s = "image/*",
  fileOnly: d = !1,
  urlOnly: c = !1,
  className: l,
  "data-testid": p
}) {
  const [u, f] = S(!1), [h, g] = S(null), [x, m] = S("");
  async function v(N) {
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
  function w(N) {
    N.length > 0 && v(N[0]);
  }
  async function b() {
    const N = x.trim();
    N && await v({ url: N });
  }
  if (e) {
    const N = i(e.imageId);
    return /* @__PURE__ */ t(
      "div",
      {
        className: I("flex flex-col gap-3", l),
        "data-testid": p,
        children: /* @__PURE__ */ o("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ t(
            no,
            {
              src: N,
              alt: "Uploaded image",
              size: "md",
              aspectRatio: "square",
              "data-testid": p ? `${p}-thumbnail` : void 0
            }
          ),
          /* @__PURE__ */ t(
            Ee,
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
          ga,
          {
            accept: s,
            maxSize: a,
            onFiles: w,
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
                Se,
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
                Ee,
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
function vo(e) {
  const n = to(), r = n.uploadImage;
  return r ? /* @__PURE__ */ t(
    Bc,
    {
      ...e,
      uploadImage: r,
      getImageUrl: n.getImageUrl
    }
  ) : /* @__PURE__ */ t("div", { className: "text-sm text-neutral", children: "This host has not wired uploadImage. Cannot accept new uploads." });
}
const $n = {
  brightness: "Brightness",
  contrast: "Contrast",
  saturation: "Saturation",
  hue: "Hue",
  blur: "Blur"
}, wo = Object.keys($n).map((e) => ({
  value: e,
  label: $n[e]
})), Uc = {
  brightness: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  contrast: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  saturation: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  hue: { min: -180, max: 180, step: 1, unit: "°", defaultValue: 0 },
  blur: { min: 0, max: 50, step: 0.5, unit: "px", defaultValue: 1 }
};
function No(e) {
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
function jc(e) {
  switch (e.kind) {
    case "hue":
      return e.degrees;
    case "blur":
      return e.radiusPx;
    default:
      return e.value;
  }
}
function br(e, n) {
  switch (e.kind) {
    case "hue":
      return { kind: "hue", degrees: n };
    case "blur":
      return { kind: "blur", radiusPx: n };
    default:
      return { kind: e.kind, value: n };
  }
}
const Fc = I(
  "w-4 h-full flex items-center justify-center",
  "text-[14px] text-text-tertiary cursor-grab select-none shrink-0"
);
I(
  "text-[11px] font-semibold px-2 py-0.5 rounded-full",
  "bg-surface-hover border border-border text-text-secondary",
  "whitespace-nowrap shrink-0"
);
function zc({ layer: e, index: n, onUpdate: r, onRemove: i }) {
  const a = Uc[e.kind], s = jc(e), d = (p) => {
    r(No(p.target.value));
  }, c = (p) => {
    const u = parseFloat(p.target.value);
    Number.isFinite(u) && r(br(e, u));
  }, l = (p) => {
    r(br(e, p));
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-surface-inset",
      "data-testid": `layer-row-${n}`,
      children: [
        /* @__PURE__ */ t("span", { className: Fc, "aria-hidden": "true", title: "Drag handle", children: "⠿" }),
        /* @__PURE__ */ t(
          Ae,
          {
            value: e.kind,
            onChange: d,
            options: wo,
            size: "sm",
            "aria-label": `Layer ${n + 1} kind`,
            "data-testid": `layer-kind-select-${n}`,
            className: "shrink-0"
          }
        ),
        /* @__PURE__ */ t(
          "input",
          {
            type: "range",
            min: a.min,
            max: a.max,
            step: a.step,
            value: s,
            onChange: c,
            className: "flex-1 h-1 accent-primary cursor-pointer min-w-0",
            "aria-label": `${$n[e.kind]} slider`,
            "data-testid": `layer-slider-${n}`
          }
        ),
        /* @__PURE__ */ t(
          Ne,
          {
            value: s,
            onChange: l,
            min: a.min,
            max: a.max,
            step: a.step,
            unit: a.unit,
            size: "sm",
            "data-testid": `layer-number-${n}`
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: i,
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
const qc = 150;
function Wc(e, n, r) {
  const [i, a] = S(null), [s, d] = S(!1), c = ce(null), l = ce(null), p = E(
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
        x.dataUrl && a(x.dataUrl);
      } catch {
      } finally {
        d(!1);
      }
    },
    [r]
  );
  return oe(() => {
    if (!e) {
      a(null);
      return;
    }
    return c.current && clearTimeout(c.current), c.current = setTimeout(() => {
      p(e, n);
    }, qc), () => {
      c.current && clearTimeout(c.current);
    };
  }, [e, JSON.stringify(n), p]), { previewSrc: i, loading: s };
}
function yr(e) {
  return e.length <= 8 ? e : `${e.slice(0, 8)}…`;
}
function Vc({
  layers: e,
  onChange: n,
  autoSourceImageId: r,
  pinnedSourceImageId: i,
  onPinnedSourceImageIdChange: a,
  sourceImageId: s,
  apiBase: d = ""
}) {
  const [c, l] = S("brightness"), [p, u] = S(!1), f = r ?? s, h = i ?? f, g = !!i, { previewSrc: x, loading: m } = Wc(h, e, d), v = () => {
    a?.(void 0);
  }, w = (C) => {
    C?.imageId && (a?.(C.imageId), u(!1));
  }, b = (C, T) => {
    n(e.map((D, P) => P === C ? T : D));
  }, N = (C) => {
    n(e.filter((T, D) => D !== C));
  }, y = () => {
    n([...e, No(c)]);
  }, k = (C) => {
    l(C.target.value);
  };
  return /* @__PURE__ */ o("div", { className: "flex gap-3 p-3", "data-testid": "adjust-layer-slider-panel", children: [
    /* @__PURE__ */ o("div", { className: "flex-1 flex flex-col gap-2 min-w-0", children: [
      e.length === 0 && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary italic", children: "No layers — add one below." }),
      e.map((C, T) => /* @__PURE__ */ t(
        zc,
        {
          layer: C,
          index: T,
          onUpdate: (D) => b(T, D),
          onRemove: () => N(T)
        },
        T
      )),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mt-1", children: [
        /* @__PURE__ */ t(
          Ae,
          {
            value: c,
            onChange: k,
            options: wo,
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
                    yr(h),
                    ")"
                  ] }),
                  /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      onClick: v,
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
                  yr(f),
                  " from upstream run"
                ]
              }
            ) : null,
            a && /* @__PURE__ */ t(
              Ee,
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
      p && a && /* @__PURE__ */ t(
        "div",
        {
          className: "w-48",
          "data-testid": "adjust-layer-override-uploader-wrap",
          children: /* @__PURE__ */ t(
            vo,
            {
              value: null,
              onChange: w,
              "data-testid": "adjust-layer-override-uploader"
            }
          )
        }
      ),
      h ? /* @__PURE__ */ o("div", { className: "relative", children: [
        /* @__PURE__ */ t(
          no,
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
const vr = "text-[12px] font-semibold text-text-secondary", Kc = "text-[11px] text-text-tertiary mt-0.5";
function Hc(e) {
  const { definition: n } = Ke(), r = W(() => !e || !n ? null : n.edges.find((s) => s.target === e)?.source ?? null, [n, e]);
  return he(r ?? "")?.images?.[0]?.imageId;
}
function Jc({
  data: e,
  onChange: n,
  currentNodeId: r
}) {
  const i = et(r ?? null), a = Hc(r), s = e.previewSourceImageId, d = e.layers ?? [];
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-layer-source-image-path", className: vr, children: [
        "Source image path ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "adjust-layer-source-image-path",
          type: "text",
          spellCheck: !1,
          className: "mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary",
          value: e.sourceImagePath ?? "",
          onChange: (c) => n({ sourceImagePath: c.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ t("div", { className: Kc, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ t(We, { samples: i.map((c) => c.path), onSelect: (c) => n({ sourceImagePath: c }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${vr} mb-1`, children: [
        "Adjustment layers ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      /* @__PURE__ */ t(
        Vc,
        {
          layers: d,
          onChange: (c) => n({ layers: c }),
          autoSourceImageId: a,
          pinnedSourceImageId: s,
          onPinnedSourceImageIdChange: (c) => n({ previewSourceImageId: c })
        }
      )
    ] })
  ] });
}
function Gc(e) {
  const { selectedNodeId: n } = Ke();
  return /* @__PURE__ */ t(Jc, { ...e, currentNodeId: n });
}
const Yc = 1024;
function Xc({ data: e, onChange: n, nodeId: r }) {
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(
      Ze,
      {
        value: e.sourceImagePath,
        onChange: (i) => n({ sourceImagePath: i }),
        nodeId: r
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "Max edge",
        help: "Longest-edge cap. The derived genWidth/genHeight scale to fit within it while preserving aspect ratio — wire them into image:generate.",
        children: /* @__PURE__ */ t(
          Ne,
          {
            size: "sm",
            min: 1,
            step: 1,
            unit: "px",
            value: e.maxEdge ?? Yc,
            onChange: (i) => n({ maxEdge: i }),
            "data-testid": "dimensions-max-edge"
          }
        )
      }
    )
  ] });
}
const Qc = 1024;
function Zc({ data: e, onChange: n, nodeId: r }) {
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(
      F,
      {
        label: "Prompt",
        help: "Optional text guidance forwarded to the upscaler.",
        children: /* @__PURE__ */ t(
          Le,
          {
            rows: 3,
            spellCheck: !1,
            value: e.prompt ?? "",
            onChange: (i) => n({ prompt: i.target.value.trim() ? i.target.value : void 0 }),
            placeholder: "optional guidance forwarded to the upscaler",
            "aria-label": "Prompt"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "Max edge",
        help: "Longest-edge cap applied before the super-resolution pass.",
        children: /* @__PURE__ */ t(
          Ne,
          {
            size: "sm",
            min: 1,
            step: 1,
            unit: "px",
            value: e.maxEdge ?? Qc,
            onChange: (i) => n({ maxEdge: i }),
            "data-testid": "upscale-max-edge"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      Ze,
      {
        value: e.sourceImagePath,
        onChange: (i) => n({ sourceImagePath: i }),
        nodeId: r
      }
    )
  ] });
}
const ed = [
  { value: "claude-opus-4-7" },
  { value: "claude-sonnet-4-6" },
  { value: "claude-haiku-4-5-20251001" }
];
function td(e) {
  if (!e) return !1;
  const n = e.properties;
  if (!n || typeof n != "object" || Array.isArray(n)) return !1;
  const r = n.regions;
  return typeof r == "object" && r !== null;
}
function nd(e) {
  const n = e.trim();
  if (n.length === 0) return { ok: !0, value: void 0 };
  try {
    const r = JSON.parse(n);
    return r === null || typeof r != "object" || Array.isArray(r) ? { ok: !1, error: "Schema must be a JSON object" } : { ok: !0, value: r };
  } catch (r) {
    return { ok: !1, error: r.message };
  }
}
const rd = `{
  "type": "object",
  "properties": {
    "caption": { "type": "string" }
  }
}`;
function od({ data: e, onChange: n, nodeId: r }) {
  const i = et(r ?? null), a = bt("image:vision-analyze", ed), [s, d] = S(!1), [c, l] = S(
    e.outputSchema ? JSON.stringify(e.outputSchema, null, 2) : ""
  ), [p, u] = S(null), f = !e.userPrompt?.trim(), h = !e.imageRefPath?.trim(), g = !!e.imageRefPath && !e.imageRefPath.startsWith("$."), x = td(e.outputSchema), m = E(
    (b) => {
      n({ seedRegions: b });
    },
    [n]
  ), v = (b) => {
    l(b);
    const N = nd(b);
    if (!N.ok) {
      u(N.error);
      return;
    }
    u(null), n({ outputSchema: N.value });
  }, w = h ? "Image reference path is required." : g ? "Path must start with $." : void 0;
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(
      F,
      {
        label: "Model",
        help: "Requires the host's vision credentials on the executor.",
        children: /* @__PURE__ */ t(
          Ae,
          {
            size: "sm",
            value: e.model ?? "claude-sonnet-4-6",
            onChange: (b) => n({ model: b.target.value }),
            "aria-label": "Model",
            options: a.map((b) => ({ value: b.value, label: b.label ?? b.value }))
          }
        )
      }
    ),
    /* @__PURE__ */ o(
      F,
      {
        label: "Image reference path",
        required: !0,
        error: w,
        help: "JSONPath into context. The value must be a string imageId, or an object with one.",
        children: [
          /* @__PURE__ */ t(
            Se,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              invalid: !!w,
              value: e.imageRefPath ?? "",
              onChange: (b) => n({ imageRefPath: b.target.value }),
              placeholder: "$.trigger.imageRef",
              "aria-label": "Image reference path"
            }
          ),
          /* @__PURE__ */ t(
            We,
            {
              samples: i.map((b) => b.path),
              onSelect: (b) => n({ imageRefPath: b }),
              "aria-label": "Upstream image refs"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "User prompt",
        required: !0,
        error: f ? "User prompt is required." : void 0,
        help: "Supports {{ context.* }} substitution.",
        children: /* @__PURE__ */ t(
          Le,
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
      F,
      {
        label: "Focus regions",
        help: "Drag on the image to paint focus boxes. The next vision pass uses these as analysis hints.",
        children: [
          /* @__PURE__ */ t(
            yo,
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
      F,
      {
        label: "Output schema",
        error: p ? `Invalid JSON: ${p}` : void 0,
        help: e.outputSchema ? "Extract mode — the model must return JSON matching this schema." : "Leave blank for caption mode (freeform analysis text).",
        children: /* @__PURE__ */ t(
          Le,
          {
            rows: 6,
            invalid: !!p,
            className: "font-mono text-[11px]",
            value: c,
            onChange: (b) => v(b.target.value),
            placeholder: rd,
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
        /* @__PURE__ */ t(F, { label: "Max output tokens", help: "Caps the response length. Default 2048.", children: /* @__PURE__ */ t(
          Ne,
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
          F,
          {
            label: "System prompt override",
            help: "Schema instructions are auto-appended when an output schema is set.",
            children: /* @__PURE__ */ t(
              Le,
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
const Fn = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
];
function ad({ data: e, onChange: n, nodeId: r }) {
  const i = bt("image:vision", Fn), a = !e.imageRefPath?.trim();
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(
      Ze,
      {
        value: e.imageRefPath,
        onChange: (s) => n({ imageRefPath: s ?? "" }),
        nodeId: r,
        label: "Image ref path",
        help: a ? "Required — JSONPath to the imageId to tag." : "JSONPath to the imageId to tag."
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "Candidate tags",
        help: "Restricts tagging to this vocabulary. Leave empty for open-ended tags.",
        children: /* @__PURE__ */ t(
          Ln,
          {
            value: e.candidateTags ?? [],
            onChange: (s) => n({ candidateTags: s }),
            placeholder: "Add candidate tag…",
            lowercase: !1
          }
        )
      }
    ),
    /* @__PURE__ */ t(F, { label: "Max tags", help: "Default 10.", children: /* @__PURE__ */ t(
      Ne,
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
    /* @__PURE__ */ t(F, { label: "Model", children: /* @__PURE__ */ t(
      Ae,
      {
        size: "sm",
        value: e.model ?? i[0]?.value ?? "",
        onChange: (s) => n({ model: s.target.value }),
        "aria-label": "Model",
        options: i.map((s) => ({ value: s.value, label: s.label ?? s.value }))
      }
    ) }),
    /* @__PURE__ */ t(
      F,
      {
        label: "System prompt override",
        help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
        children: /* @__PURE__ */ t(
          Le,
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
    /* @__PURE__ */ t(F, { label: "Max output tokens", help: "Default 256.", children: /* @__PURE__ */ t(
      Ne,
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
const wr = 2;
function id({
  data: e,
  onChange: n,
  nodeId: r
}) {
  const i = bt("image:vision", Fn), a = e.labels ?? [], s = !e.imageRefPath?.trim();
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(
      Ze,
      {
        value: e.imageRefPath,
        onChange: (d) => n({ imageRefPath: d ?? "" }),
        nodeId: r,
        label: "Image ref path",
        help: s ? "Required — JSONPath to the imageId to classify." : "JSONPath to the imageId to classify."
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "Labels",
        required: !0,
        error: a.length < wr ? `At least ${wr} labels are required to classify between.` : void 0,
        help: "The model returns the single best-matching label.",
        children: /* @__PURE__ */ t(
          Ln,
          {
            value: a,
            onChange: (d) => n({ labels: d }),
            placeholder: "Add label…",
            lowercase: !1
          }
        )
      }
    ),
    /* @__PURE__ */ t(F, { label: "Model", children: /* @__PURE__ */ t(
      Ae,
      {
        size: "sm",
        value: e.model ?? i[0]?.value ?? "",
        onChange: (d) => n({ model: d.target.value }),
        "aria-label": "Model",
        options: i.map((d) => ({ value: d.value, label: d.label ?? d.value }))
      }
    ) }),
    /* @__PURE__ */ t(
      F,
      {
        label: "System prompt override",
        help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
        children: /* @__PURE__ */ t(
          Le,
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
    /* @__PURE__ */ t(F, { label: "Max output tokens", help: "Default 256.", children: /* @__PURE__ */ t(
      Ne,
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
function sd({
  data: e,
  onChange: n,
  nodeId: r
}) {
  const i = bt("image:vision", Fn), a = !e.imageRefPath?.trim(), s = !e.userPrompt?.trim();
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(
      Ze,
      {
        value: e.imageRefPath,
        onChange: (d) => n({ imageRefPath: d ?? "" }),
        nodeId: r,
        label: "Image ref path",
        help: a ? "Required — JSONPath to the imageId to describe." : "JSONPath to the imageId to describe."
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: "User prompt",
        required: !0,
        error: s ? "User prompt is required." : void 0,
        help: "What to ask the model about the image.",
        children: /* @__PURE__ */ t(
          Le,
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
    /* @__PURE__ */ t(F, { label: "Model", children: /* @__PURE__ */ t(
      Ae,
      {
        size: "sm",
        value: e.model ?? i[0]?.value ?? "",
        onChange: (d) => n({ model: d.target.value }),
        "aria-label": "Model",
        options: i.map((d) => ({ value: d.value, label: d.label ?? d.value }))
      }
    ) }),
    /* @__PURE__ */ t(
      F,
      {
        label: "System prompt override",
        help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
        children: /* @__PURE__ */ t(
          Le,
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
    /* @__PURE__ */ t(F, { label: "Max output tokens", help: "Default 512.", children: /* @__PURE__ */ t(
      Ne,
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
const ld = [
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (default — best OCR accuracy)" },
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (faster, lower accuracy)" }
];
function cd({
  data: e,
  onChange: n,
  nodeId: r
}) {
  const i = bt("image:vision-ocr", ld), a = !e.imageRefPath?.trim();
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(
      Ze,
      {
        value: e.imageRefPath,
        onChange: (s) => n({ imageRefPath: s ?? "" }),
        nodeId: r,
        label: "Image ref path",
        help: a ? "Required — JSONPath to the imageId to extract text from." : "JSONPath to the imageId to extract text from."
      }
    ),
    /* @__PURE__ */ t(F, { label: "Model", help: "Defaults to the more accurate model for OCR.", children: /* @__PURE__ */ t(
      Ae,
      {
        size: "sm",
        value: e.model ?? i[0]?.value ?? "",
        onChange: (s) => n({ model: s.target.value }),
        "aria-label": "Model",
        options: i.map((s) => ({ value: s.value, label: s.label ?? s.value }))
      }
    ) }),
    /* @__PURE__ */ t(
      F,
      {
        label: "System prompt override",
        help: "Optional. Sent verbatim — {{context.*}} is NOT substituted here.",
        children: /* @__PURE__ */ t(
          Le,
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
      F,
      {
        label: "Max output tokens",
        help: "Default 1024. Increase for documents with large amounts of text.",
        children: /* @__PURE__ */ t(
          Ne,
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
const dd = [
  { value: "amazon.titan-image-generator-v2:0", label: "Titan v2 (default)" },
  { value: "amazon.titan-image-generator-v1", label: "Titan v1" }
], Nr = 64, kr = 2048, pd = 8;
function ud({ data: e, onChange: n }) {
  const r = bt("image:generate", dd), i = Dn("image:generate"), a = !e.prompt?.trim(), s = e.model ?? r[0]?.value ?? "";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(
      F,
      {
        label: i.label("prompt", "Prompt"),
        required: !0,
        error: a ? "Prompt is required." : void 0,
        help: a ? void 0 : i.help("prompt", "Text description of the image to generate."),
        children: /* @__PURE__ */ t(
          Le,
          {
            rows: 4,
            spellCheck: !1,
            invalid: a,
            value: e.prompt ?? "",
            onChange: (d) => n({ prompt: d.target.value }),
            placeholder: i.placeholder(
              "prompt",
              "A photorealistic photograph of a golden retriever in a sunny meadow"
            ),
            "aria-label": "Prompt"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      F,
      {
        label: i.label("model", "Model"),
        help: r.length === 0 ? "This host declares no image models." : i.help("model"),
        children: /* @__PURE__ */ t(
          Ae,
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
      /* @__PURE__ */ t("div", { className: "flex-1", children: /* @__PURE__ */ t(F, { label: i.label("width", "Width"), children: /* @__PURE__ */ t(
        Ne,
        {
          size: "sm",
          min: Nr,
          max: kr,
          step: 64,
          unit: "px",
          value: e.width ?? 512,
          onChange: (d) => n({ width: d }),
          "data-testid": "generate-width"
        }
      ) }) }),
      /* @__PURE__ */ t("div", { className: "flex-1", children: /* @__PURE__ */ t(F, { label: i.label("height", "Height"), children: /* @__PURE__ */ t(
        Ne,
        {
          size: "sm",
          min: Nr,
          max: kr,
          step: 64,
          unit: "px",
          value: e.height ?? 512,
          onChange: (d) => n({ height: d }),
          "data-testid": "generate-height"
        }
      ) }) })
    ] }),
    /* @__PURE__ */ t(
      F,
      {
        label: i.label("seed", "Seed"),
        help: "Optional — set for a reproducible result.",
        children: /* @__PURE__ */ t(
          Ne,
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
      F,
      {
        label: i.label("numImages", "Number of images"),
        help: "Above 1, the step fans out with one arm per image, each carrying one imageId.",
        children: /* @__PURE__ */ t(
          Ne,
          {
            size: "sm",
            min: 1,
            max: pd,
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
const md = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], jt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", hd = `${jt} font-mono`, Bt = "text-[12px] font-semibold text-text-secondary", Cr = "text-[11px] text-text-tertiary mt-0.5";
function fd({ data: e, onChange: n, nodeId: r }) {
  const i = et(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-source-image-path", className: Bt, children: [
        "Source image path ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "variation-source-image-path",
          type: "text",
          spellCheck: !1,
          className: hd,
          value: e.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ t(We, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ t("label", { htmlFor: "variation-model", className: Bt, children: "Model" }),
      /* @__PURE__ */ t(
        "select",
        {
          id: "variation-model",
          className: jt,
          value: e.model ?? "amazon.nova-canvas-v1:0",
          onChange: (a) => n({ model: a.target.value }),
          children: md.map((a) => /* @__PURE__ */ t("option", { value: a.value, children: a.label }, a.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-num-variations", className: Bt, children: [
        "Number of variations ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(fan-out)" })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "variation-num-variations",
          type: "number",
          min: 1,
          max: 8,
          step: 1,
          className: jt,
          value: e.numVariations ?? 1,
          onChange: (a) => {
            const s = parseInt(a.target.value, 10);
            n({ numVariations: Number.isFinite(s) && s >= 1 ? Math.min(8, s) : 1 });
          }
        }
      ),
      /* @__PURE__ */ t("div", { className: Cr, children: "Always fans out — each variation becomes a separate arm downstream." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-similarity", className: Bt, children: [
        "Similarity ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(0.0–1.0, default 0.7)" })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "variation-similarity",
          type: "number",
          min: 0,
          max: 1,
          step: 0.05,
          className: jt,
          value: e.similarity ?? 0.7,
          onChange: (a) => {
            const s = parseFloat(a.target.value);
            n({ similarity: Number.isFinite(s) ? Math.min(1, Math.max(0, s)) : 0.7 });
          }
        }
      ),
      /* @__PURE__ */ t("div", { className: Cr, children: "0 = very different, 1 = nearly identical. 0.7 is a good starting point." })
    ] })
  ] });
}
const gd = [
  "$.steps.mask.output.imageId",
  "$.trigger.maskRef"
], xd = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], Rn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Ir = `${Rn} font-mono`, Ut = "text-[12px] font-semibold text-text-secondary", Sr = "text-[11px] text-text-tertiary mt-0.5";
function bd({ data: e, onChange: n, nodeId: r }) {
  const i = et(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-source-image-path", className: Ut, children: [
        "Source image path ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "edit-prompt-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Ir,
          value: e.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ t(We, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-mask-image-path", className: Ut, children: [
        "Mask image path ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "edit-prompt-mask-image-path",
          type: "text",
          spellCheck: !1,
          className: Ir,
          value: e.maskImagePath ?? "",
          onChange: (a) => n({ maskImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.steps.mask.output.imageId"
        }
      ),
      /* @__PURE__ */ t("div", { className: Sr, children: "JSONPath to a mask image. White pixels = edit region, black = preserve. Omit for outpainting." }),
      /* @__PURE__ */ t(We, { samples: gd, onSelect: (a) => n({ maskImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ t("label", { htmlFor: "edit-prompt-prompt", className: Ut, children: "Edit prompt" }),
      /* @__PURE__ */ t(
        "textarea",
        {
          id: "edit-prompt-prompt",
          rows: 4,
          spellCheck: !1,
          className: `${Rn} resize-y min-h-20`,
          value: e.prompt ?? "",
          onChange: (a) => n({ prompt: a.target.value }),
          placeholder: "Replace the background with a sunny beach"
        }
      ),
      /* @__PURE__ */ t("div", { className: Sr, children: "Describes what to generate in the masked region. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ t("label", { htmlFor: "edit-prompt-model", className: Ut, children: "Model" }),
      /* @__PURE__ */ t(
        "select",
        {
          id: "edit-prompt-model",
          className: Rn,
          value: e.model ?? "amazon.nova-canvas-v1:0",
          onChange: (a) => n({ model: a.target.value }),
          children: xd.map((a) => /* @__PURE__ */ t("option", { value: a.value, children: a.label }, a.value))
        }
      )
    ] })
  ] });
}
const yd = {
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
function vd({ data: e, onChange: n }) {
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o(
        "label",
        {
          htmlFor: "image-source-image-id",
          className: "block text-[12px] font-semibold text-[#374151]",
          children: [
            "Image ID",
            " ",
            /* @__PURE__ */ t("span", { className: "text-[#6b7280] font-normal", children: "(optional — can be set at run time)" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        Se,
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
      /* @__PURE__ */ t("p", { className: "mt-0.5 text-[11px] text-[#6b7280]", children: "The imageId of an image already in the blob store. Leave blank to have the trigger or a preceding step supply the image at runtime." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o(
        "label",
        {
          htmlFor: "image-source-output-key",
          className: "block text-[12px] font-semibold text-[#374151]",
          children: [
            "Output key",
            " ",
            /* @__PURE__ */ t("span", { className: "text-[#6b7280] font-normal", children: "(default: imageRef)" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        Se,
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
      /* @__PURE__ */ o("p", { className: "mt-0.5 text-[11px] text-[#6b7280]", children: [
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
const wd = [
  "{{scatter.item.label}}",
  "{{scatter.index}}",
  "{{scatter.parentImageId}}"
];
function Nd({ data: e, onChange: n, nodeId: r }) {
  const i = et(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o(
        "label",
        {
          htmlFor: "save-source-image-path",
          className: "block text-[12px] font-semibold text-[#374151]",
          children: [
            "Source image path",
            " ",
            /* @__PURE__ */ t("span", { className: "text-[#6b7280] font-normal", children: "(optional)" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        Se,
        {
          id: "save-source-image-path",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: e.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ o("p", { className: "mt-0.5 text-[11px] text-[#6b7280]", children: [
        "JSONPath to the imageId to save. Defaults server-side to",
        " ",
        /* @__PURE__ */ t("code", { children: "$.scatter.parentImageId" }),
        "."
      ] }),
      /* @__PURE__ */ t(
        We,
        {
          samples: i.map((a) => a.path),
          onSelect: (a) => n({ sourceImagePath: a })
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o(
        "label",
        {
          htmlFor: "save-filename-template",
          className: "block text-[12px] font-semibold text-[#374151]",
          children: [
            "Filename template",
            " ",
            /* @__PURE__ */ t("span", { className: "text-[#6b7280] font-normal", children: "(optional)" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        Se,
        {
          id: "save-filename-template",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: e.filenameTemplate ?? "",
          onChange: (a) => n({ filenameTemplate: a.target.value.trim() || void 0 }),
          placeholder: "crop-{{scatter.index}}.png"
        }
      ),
      /* @__PURE__ */ o("p", { className: "mt-0.5 text-[11px] text-[#6b7280]", children: [
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
        /* @__PURE__ */ t("div", { className: "text-[10px] text-[#6b7280] mb-1", children: "Quick-fill variable:" }),
        /* @__PURE__ */ t(
          We,
          {
            samples: wd,
            onSelect: (a) => {
              const s = e.filenameTemplate ?? "";
              n({ filenameTemplate: s + a });
            }
          }
        )
      ] })
    ] })
  ] });
}
const Tr = [
  { value: "read", label: "Read", help: "Look records up and write them into context." },
  { value: "write", label: "Write", help: "Persist a value from context into memory." }
], $r = [
  { value: "session", label: "Session", help: "Scoped to this run; cleared when the session ends." },
  { value: "long-term", label: "Long-term", help: "Persists across runs for the namespace." }
];
function kd({ data: e, onChange: n, nodeId: r }) {
  const { paths: i, unresolved: a } = Xt(r ?? null), s = e.mode === "write", d = !e.namespace?.trim(), c = !e.keyExpression?.trim(), l = s && !e.valueField?.trim(), p = Tr.find((f) => f.value === e.mode)?.help, u = $r.find((f) => f.value === e.scope)?.help;
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ t(F, { label: "Mode", required: !0, help: p, children: /* @__PURE__ */ t(
      Ae,
      {
        size: "sm",
        value: e.mode,
        onChange: (f) => n({ mode: f.target.value }),
        "aria-label": "Memory mode",
        options: Tr.map((f) => ({ value: f.value, label: f.label }))
      }
    ) }),
    /* @__PURE__ */ t(F, { label: "Scope", required: !0, help: u, children: /* @__PURE__ */ t(
      Ae,
      {
        size: "sm",
        value: e.scope,
        onChange: (f) => n({ scope: f.target.value }),
        "aria-label": "Memory scope",
        options: $r.map((f) => ({ value: f.value, label: f.label }))
      }
    ) }),
    /* @__PURE__ */ t(
      F,
      {
        label: "Namespace",
        required: !0,
        error: d ? "Namespace is required." : void 0,
        help: d ? void 0 : "Groups related records. Reads only see their own namespace.",
        children: /* @__PURE__ */ t(
          Se,
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
      F,
      {
        label: "Key expression",
        required: !0,
        error: c ? "Key expression is required." : void 0,
        help: c ? void 0 : "Identifies the record. Supports {{ context.* }} substitution.",
        children: /* @__PURE__ */ t(
          Se,
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
    /* @__PURE__ */ t(F, { label: "Available context", children: /* @__PURE__ */ t(
      Qt,
      {
        paths: i,
        unresolved: a(
          `${e.keyExpression ?? ""}
${s ? e.valueField ?? "" : ""}`
        ),
        onInsert: (f) => n({ keyExpression: `${e.keyExpression ?? ""}${f}` })
      }
    ) }),
    s ? /* @__PURE__ */ t(
      F,
      {
        label: "Value field",
        required: !0,
        error: l ? "Value field is required for a write." : void 0,
        help: l ? void 0 : "Context path whose value is persisted.",
        children: /* @__PURE__ */ t(
          Se,
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
      F,
      {
        label: "Output key",
        help: "Where retrieved records land in context. Defaults to this step's output.",
        children: /* @__PURE__ */ t(
          Se,
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
const un = 100;
function Cd({
  data: e,
  onChange: n,
  nodeId: r
}) {
  const { paths: i, unresolved: a } = Xt(r ?? null), s = Dn("knowledge-base"), d = !e.knowledgeBaseId?.trim(), c = !e.queryTemplate?.trim(), l = e.topK ?? 0, p = !Number.isFinite(l) || l < 1 || l > un, u = e.scoreThreshold, f = u !== void 0 && (u < 0 || u > 1);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(ut, { title: "Knowledge base", children: [
      /* @__PURE__ */ t(
        F,
        {
          label: s.label("knowledgeBaseId", "Knowledge base ID"),
          required: !0,
          error: d ? "Knowledge base ID is required." : void 0,
          help: d ? void 0 : s.help("knowledgeBaseId", "The knowledge base to retrieve from."),
          children: /* @__PURE__ */ t(
            Se,
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
        F,
        {
          label: s.label("queryTemplate", "Query template"),
          required: !0,
          error: c ? "Query template is required." : void 0,
          help: c ? void 0 : s.help(
            "queryTemplate",
            "Text to embed and search. Supports {{ context.* }} substitution."
          ),
          children: /* @__PURE__ */ t(
            Le,
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
      /* @__PURE__ */ t(F, { label: "Available context", children: /* @__PURE__ */ t(
        Qt,
        {
          paths: i,
          unresolved: a(e.queryTemplate ?? ""),
          onInsert: (h) => n({ queryTemplate: `${e.queryTemplate ?? ""}${h}` })
        }
      ) })
    ] }),
    /* @__PURE__ */ o(ut, { title: "Retrieval", children: [
      /* @__PURE__ */ t(
        F,
        {
          label: s.label("topK", "Top K"),
          required: !0,
          error: p ? `Must be between 1 and ${un}.` : void 0,
          help: p ? void 0 : s.help("topK", "How many passages to retrieve."),
          children: /* @__PURE__ */ t(
            Ne,
            {
              size: "sm",
              min: 1,
              max: un,
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
        F,
        {
          label: s.label("scoreThreshold", "Score threshold"),
          error: f ? "Must be between 0 and 1." : void 0,
          help: f ? void 0 : "Drop passages scoring below this. Leave empty for no filtering.",
          children: /* @__PURE__ */ t(
            Ne,
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
        F,
        {
          label: "Output key",
          help: "Where retrieved passages land in context. Defaults to this step's output.",
          children: /* @__PURE__ */ t(
            Se,
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
        Ot,
        {
          value: e.retryPolicy,
          onChange: (h) => n({ retryPolicy: h })
        }
      )
    ] })
  ] });
}
const Id = `MATCH (u:User {id: $userId})-[:AUTHORED]->(d:Doc)
RETURN d.title LIMIT 10`, mn = 100, hn = 3e5;
function Sd({
  data: e,
  onChange: n,
  nodeId: r
}) {
  const { paths: i, unresolved: a } = Xt(r ?? null), s = Dn("graph-query"), d = !e.graphId?.trim(), c = !e.query?.trim(), l = e.timeoutMs, p = l !== void 0 && (!Number.isFinite(l) || l < mn || l > hn), u = W(
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
  }, m = (b, N) => f({ ...e.parameters ?? {}, [b]: N }), v = (b) => {
    const N = { ...e.parameters ?? {} };
    delete N[b], f(N);
  }, w = () => {
    let b = u.length + 1, N = `param${b}`;
    for (; N in (e.parameters ?? {}); ) N = `param${++b}`;
    f({ ...e.parameters ?? {}, [N]: "" });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(ut, { title: "Graph", children: [
      /* @__PURE__ */ t(
        F,
        {
          label: s.label("graphId", "Graph ID"),
          required: !0,
          error: d ? "Graph ID is required." : void 0,
          help: d ? void 0 : s.help("graphId", "The graph to query."),
          children: /* @__PURE__ */ t(
            Se,
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
        F,
        {
          label: s.label("query", "Graph query"),
          required: !0,
          error: c ? "Query is required." : void 0,
          help: c ? void 0 : "Bind values with $parameters below rather than interpolating them.",
          children: /* @__PURE__ */ t(
            Le,
            {
              rows: 6,
              invalid: c,
              spellCheck: !1,
              value: e.query ?? "",
              onChange: (b) => n({ query: b.target.value }),
              placeholder: s.placeholder("query", Id),
              "aria-label": "Graph query"
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ o(ut, { title: "Parameters", children: [
      /* @__PURE__ */ t(
        F,
        {
          label: "Bind parameters",
          help: "Each row binds one $name in the query. Values support {{ context.* }}.",
          children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", "data-testid": "graph-query-params", children: [
            u.length === 0 ? /* @__PURE__ */ t("p", { className: "text-[12px] text-[var(--color-text-secondary)]", children: "No parameters. The query runs exactly as written." }) : null,
            u.map(([b, N], y) => /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t(
                Se,
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
                Se,
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
                Ee,
                {
                  size: "sm",
                  variant: "ghost",
                  onClick: () => v(b),
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
            /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(Ee, { size: "sm", variant: "secondary", onClick: w, children: "+ Add parameter" }) })
          ] })
        }
      ),
      /* @__PURE__ */ t(F, { label: "Available context", children: /* @__PURE__ */ t(
        Qt,
        {
          paths: i,
          unresolved: a(u.map(([, b]) => b).join(`
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
    /* @__PURE__ */ o(ut, { title: "Execution", children: [
      /* @__PURE__ */ t(
        F,
        {
          label: "Timeout",
          error: p ? `Must be between ${mn} and ${hn} ms.` : void 0,
          help: p ? void 0 : "Leave empty to use the executor default.",
          children: /* @__PURE__ */ t(
            Ne,
            {
              size: "sm",
              min: mn,
              max: hn,
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
        F,
        {
          label: "Output key",
          help: "Where rows land in context. Defaults to this step's output.",
          children: /* @__PURE__ */ t(
            Se,
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
        Ot,
        {
          value: e.retryPolicy,
          onChange: (b) => n({ retryPolicy: b })
        }
      )
    ] })
  ] });
}
function Td({ result: e, className: n }) {
  const { caption: r, setting: i, location: a, timeOfDay: s, mood: d, colors: c } = e;
  return !r && !i && !a && !s && !d && (!c || c.length === 0) ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", n), children: [
    r ? /* @__PURE__ */ t("p", { className: "text-base leading-relaxed text-text-primary", children: r }) : null,
    /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1.5", children: [
      i ? /* @__PURE__ */ o(le, { tone: "neutral", size: "sm", title: "Scene setting", children: [
        "setting: ",
        i
      ] }) : null,
      a ? /* @__PURE__ */ o(le, { tone: "neutral", size: "sm", title: "Location", children: [
        "loc: ",
        a
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
const $d = {
  people: { stroke: "#4f46e5", fill: "rgba(79,70,229,0.10)", text: "bg-primary text-white" },
  object: { stroke: "#d97706", fill: "rgba(217,119,6,0.10)", text: "bg-warning text-white" }
};
function Rd({
  imageUrl: e,
  imageDataUrl: n,
  imageWidth: r,
  imageHeight: i,
  people: a,
  objects: s,
  show: d = "both",
  onSelectPerson: c,
  onSelectObject: l,
  className: p,
  alt: u
}) {
  const f = n ?? e, [h, g] = S(null), x = ce(null), m = E(() => {
    const b = x.current;
    b && (!r || !i) && g({ w: b.naturalWidth, h: b.naturalHeight });
  }, [r, i]), v = W(() => r && i && r > 0 && i > 0 ? { w: r, h: i } : h && h.w > 0 && h.h > 0 ? h : null, [r, i, h]), w = (b, N, y, k, C) => {
    if (!v) return null;
    const T = Math.max(0, Math.min(b.x1, v.w)), D = Math.max(0, Math.min(b.y1, v.h)), P = Math.max(0, Math.min(b.x2, v.w)), M = Math.max(0, Math.min(b.y2, v.h));
    if (!Number.isFinite(T) || !Number.isFinite(D) || !Number.isFinite(P) || !Number.isFinite(M) || P <= T || M <= D) return null;
    const re = T / v.w * 100, R = D / v.h * 100, J = (P - T) / v.w * 100, Q = (M - D) / v.h * 100, G = $d[y];
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
          top: `${R}%`,
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
        v ? /* @__PURE__ */ t("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ o("div", { className: "pointer-events-auto absolute inset-0", children: [
          (d === "people" || d === "both") && (a ?? []).map(
            (b) => w(
              b.bbox,
              `#${b.index}${b.activity ? " · " + b.activity.replace(/^::\s*/, "") : ""}`,
              "people",
              c ? () => c(b) : void 0,
              `p-${b.index}`
            )
          ),
          (d === "objects" || d === "both") && (s ?? []).map(
            (b, N) => w(
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
function Ad(e) {
  return {
    imageUrl: e.imageUrl,
    imageDataUrl: e.imageDataUrl,
    imageWidth: e.imageWidth,
    imageHeight: e.imageHeight,
    people: e.people,
    objects: e.objects
  };
}
function Pd({ people: e, highlightedIndex: n, onSelect: r, className: i }) {
  return !e || e.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", i), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "People (",
      e.length,
      ")"
    ] }),
    /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1.5", children: e.map((a) => {
      const s = n === a.index, d = a.activity?.replace(/^::\s*/, ""), c = I(
        "group flex w-full flex-col gap-1 rounded-lg border px-2.5 py-2 text-left text-sm transition-colors",
        s ? "border-primary bg-primary-bg/70 ring-1 ring-primary" : "border-border bg-surface hover:bg-surface-hover"
      ), l = /* @__PURE__ */ o(H, { children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": !0,
              className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-white",
              children: a.index
            }
          ),
          a.ageBucket ? /* @__PURE__ */ t(le, { tone: "neutral", size: "sm", children: a.ageBucket.replace("_", " ") }) : null,
          a.gender ? /* @__PURE__ */ t(le, { tone: "neutral", size: "sm", children: a.gender }) : null,
          a.faceOrientation ? /* @__PURE__ */ t(le, { tone: "neutral", size: "sm", title: "Face orientation", children: a.faceOrientation }) : null,
          a.expression ? /* @__PURE__ */ t(le, { tone: "info", size: "sm", children: a.expression }) : null
        ] }),
        d ? /* @__PURE__ */ o("div", { className: "text-[13px] text-text-primary", children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "activity:" }),
          " ",
          d
        ] }) : null,
        a.clothing ? /* @__PURE__ */ o("div", { className: "text-[12px] text-text-secondary", children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "wearing:" }),
          " ",
          a.clothing
        ] }) : null
      ] });
      return r ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => r(a),
          className: I(
            c,
            "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          ),
          "aria-pressed": s,
          children: l
        }
      ) }, a.index) : /* @__PURE__ */ t("li", { className: c, children: l }, a.index);
    }) })
  ] });
}
function Md({ objects: e, onSelect: n, className: r }) {
  return !e || e.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Objects (",
      e.length,
      ")"
    ] }),
    /* @__PURE__ */ t("ul", { className: "grid grid-cols-1 gap-1 sm:grid-cols-2", children: e.map((i, a) => {
      const s = I(
        "flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 text-left text-[13px]"
      ), d = /* @__PURE__ */ o(H, { children: [
        /* @__PURE__ */ t("span", { className: "truncate font-medium text-text-primary", children: i.label }),
        /* @__PURE__ */ o("span", { className: "shrink-0 font-mono text-[10px] text-text-tertiary", children: [
          "[",
          i.bbox.x1,
          ",",
          i.bbox.y1,
          ",",
          i.bbox.x2,
          ",",
          i.bbox.y2,
          "]"
        ] })
      ] });
      return n ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => n(i),
          className: I(
            s,
            "cursor-pointer hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          ),
          children: d
        }
      ) }, `${i.label}-${a}`) : /* @__PURE__ */ t("li", { className: s, children: d }, `${i.label}-${a}`);
    }) })
  ] });
}
function Dd({ tags: e, onTagClick: n, className: r }) {
  return !e || e.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ t("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Tags" }),
    /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5", children: e.map(
      (i) => n ? /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => n(i),
          title: `Filter by ${i}`,
          "aria-label": `Filter by ${i}`,
          className: "appearance-none border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-full",
          children: /* @__PURE__ */ o(le, { tone: "info", size: "sm", children: [
            "#",
            i
          ] })
        },
        i
      ) : /* @__PURE__ */ o(le, { tone: "info", size: "sm", children: [
        "#",
        i
      ] }, i)
    ) })
  ] });
}
function Ft(e) {
  return e ? e === "correct" || e === "neutral" || e === "normal" ? "success" : "warning" : "neutral";
}
function fn(e) {
  const n = Ft(e);
  return n === "success" ? `OK · ${e}` : n === "warning" ? `ADJUST · ${e}` : e ?? "";
}
function Ed({
  exposure: e,
  whiteBalance: n,
  contrast: r,
  composition: i,
  edits: a,
  onApplyEdit: s,
  className: d
}) {
  const c = e || n || r || i, l = (a ?? []).length > 0;
  return !c && !l ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", d), children: [
    /* @__PURE__ */ t("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Edits & Quality" }),
    c ? /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-1.5 sm:grid-cols-2", children: [
      e ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-text-tertiary", children: "EXPOSURE" }),
          /* @__PURE__ */ t(le, { tone: Ft(e.verdict), size: "sm", children: fn(e.verdict) }),
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
          /* @__PURE__ */ t(le, { tone: Ft(n.verdict), size: "sm", children: fn(n.verdict) }),
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
        /* @__PURE__ */ t("span", { className: "ml-1.5", children: /* @__PURE__ */ t(le, { tone: Ft(r), size: "sm", children: fn(r) }) })
      ] }) : null,
      i ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-text-tertiary", children: "COMPOSITION" }),
        /* @__PURE__ */ t("p", { className: "mt-1 text-[12px] text-text-primary", children: i })
      ] }) : null
    ] }) : null,
    l ? /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1", children: (a ?? []).map((p, u) => /* @__PURE__ */ o(
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
function Od({
  result: e,
  showImage: n = !0,
  showCaption: r = !0,
  showPeople: i = !0,
  showObjects: a = !0,
  showTags: s = !0,
  showEdits: d = !0,
  showRawText: c = !1,
  onTagClick: l,
  onApplyEdit: p,
  className: u
}) {
  const [f, h] = S(), [g, x] = S(!1), m = (w) => h(f === w.index ? void 0 : w.index), v = Ad(e);
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-4 text-text-primary", u), children: [
    /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-12", children: [
      n ? /* @__PURE__ */ o("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ t(
          Rd,
          {
            ...v,
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
        r ? /* @__PURE__ */ t(Td, { result: e }) : null,
        i && e.people && e.people.length > 0 ? /* @__PURE__ */ t(
          Pd,
          {
            people: e.people,
            highlightedIndex: f,
            onSelect: m
          }
        ) : null
      ] })
    ] }),
    a && e.objects && e.objects.length > 0 ? /* @__PURE__ */ t(Md, { objects: e.objects }) : null,
    s && e.tags && e.tags.length > 0 ? /* @__PURE__ */ t(Dd, { tags: e.tags, onTagClick: l }) : null,
    d ? /* @__PURE__ */ t(
      Ed,
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
      /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1", children: e.text.map((w, b) => /* @__PURE__ */ t(
        "li",
        {
          className: "rounded border border-border bg-surface px-2 py-1 font-mono text-[12px]",
          children: w
        },
        b
      )) })
    ] }) : null,
    c && e.rawText ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => x((w) => !w),
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
const _d = [
  { value: "claude-haiku-4-5-20251001", label: "Haiku 4.5" },
  { value: "claude-sonnet-4-6", label: "Sonnet 4.6" },
  { value: "claude-opus-4-7", label: "Opus 4.7" }
], Rr = "claude-sonnet-4-6", Ar = [
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
function Ld(e) {
  const n = [`${e.inputTokens} in`, `${e.outputTokens} out`];
  return e.cacheReadTokens && n.push(`${e.cacheReadTokens} cached`), n.join(" / ");
}
function Bd({
  systemPrompt: e,
  userPrompt: n,
  outputSchema: r,
  model: i,
  onSave: a,
  apiBase: s = ""
}) {
  const d = to(), [c, l] = S(e), [p, u] = S(n), [f, h] = S(i ?? Rr), [g, x] = S(
    r ? JSON.stringify(r, null, 2) : ""
  ), [m, v] = S("0"), [w, b] = S(null), [N, y] = S(!1), [k, C] = S(null), [T, D] = S(null), P = E(() => {
    const Z = g.trim();
    if (Z)
      try {
        const O = JSON.parse(Z);
        if (O && typeof O == "object" && !Array.isArray(O))
          return O;
      } catch {
      }
  }, [g]), M = E((Z) => {
    v(Z);
    const O = Number(Z), A = Ar[O];
    A && (x(A.value ? JSON.stringify(A.value, null, 2) : ""), A.systemPrompt !== void 0 && l(A.systemPrompt));
  }, []), re = w?.imageId ?? null, R = re ? d.getImageUrl(re) : null, J = E(async () => {
    if (!re) {
      C("Upload or paste a sample image URL first.");
      return;
    }
    if (!p.trim()) {
      C("User prompt is required.");
      return;
    }
    y(!0), C(null), D(null);
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
          model: f || Rr
        })
      }), A = await O.json();
      if (!O.ok) {
        C(A.error ?? `Request failed with status ${O.status}`);
        return;
      }
      if (A.failureReason) {
        C(`Model refused to answer (${A.failureReason}).`);
        return;
      }
      const Y = {
        imageUrl: R ?? "",
        caption: A.caption ?? "",
        rawText: typeof A.extracted == "object" && A.extracted ? JSON.stringify(A.extracted, null, 2) : void 0,
        model: {
          endpointId: f,
          latencyMs: A.latencyMs ?? 0,
          tokensIn: A.usage?.inputTokens,
          tokensOut: A.usage?.outputTokens
        }
      };
      D({
        visionResult: Y,
        rawExtracted: A.extracted,
        usage: A.usage ?? { inputTokens: 0, outputTokens: 0 },
        latencyMs: A.latencyMs ?? 0,
        costUsd: A.costUsd ?? 0
      });
    } catch (O) {
      C(O instanceof Error ? O.message : "Network error");
    } finally {
      y(!1);
    }
  }, [re, R, p, c, f, P, s]), Q = () => {
    a({
      systemPrompt: c,
      userPrompt: p,
      outputSchema: P()
    });
  }, G = "text-[12px] font-semibold text-text-secondary";
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-4 px-4 py-3", "data-testid": "vision-prompt-bench", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ t("div", { className: I(G, "mb-1"), children: "Sample image" }),
      /* @__PURE__ */ t(
        vo,
        {
          value: w,
          onChange: (Z) => b(Z),
          "data-testid": "bench-image-uploader"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("label", { className: G, children: "System prompt" }),
        /* @__PURE__ */ t(
          Le,
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
          Le,
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
            Ae,
            {
              value: m,
              onChange: (Z) => M(Z.target.value),
              options: Ar.map((Z, O) => ({ value: String(O), label: Z.label })),
              size: "sm",
              "aria-label": "Schema preset",
              "data-testid": "bench-schema-preset"
            }
          )
        ] }),
        /* @__PURE__ */ t(
          Le,
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
        Ae,
        {
          value: f,
          onChange: (Z) => h(Z.target.value),
          options: _d,
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
          Ld(T.usage),
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
        Od,
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
const Ud = {
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
}, gn = /* @__PURE__ */ new Set([
  "image:vision-analyze",
  "image:vision-classify",
  "image:vision-describe",
  "image:vision-tag",
  "image:vision-extract-text"
]), St = ({ data: e }) => /* @__PURE__ */ t("div", { className: "p-4", "data-testid": "config-panel-no-settings", children: /* @__PURE__ */ t(
  qe,
  {
    icon: "⚙️",
    title: "No settings for this node type yet",
    description: /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ t("code", { className: "font-mono text-[12px]", children: String(e.type) }),
      " has no configurable options in this version. The node can sit on the canvas and connect to others, and it will run with its defaults wherever the executor supports it."
    ] })
  }
) }), oh = [
  "agent",
  "mcp-tool",
  "guardrail",
  "policy",
  "ag-ui-output"
], jd = {
  trigger: Dl,
  llm: Fl,
  transform: Wl,
  condition: Kl,
  action: Gl,
  fork: Yl,
  join: Zl,
  approval: tc,
  agent: St,
  "mcp-tool": St,
  "knowledge-base": Cd,
  "graph-query": Sd,
  memory: kd,
  guardrail: St,
  policy: St,
  "ag-ui-output": St,
  "image-source": vd,
  "image:save": Nd,
  scatter: uc,
  "image:resize": hc,
  "image:transform": yc,
  "image:format-convert": kc,
  "image:sharpen": Cc,
  "image:watermark": Sc,
  "image:crop": Oc,
  "image:adjust-bw": Lc,
  "image:adjust-layer": Gc,
  "image:dimensions": Xc,
  "image:upscale": Zc,
  "image:vision-analyze": od,
  "image:vision-classify": id,
  "image:vision-describe": sd,
  "image:vision-tag": ad,
  "image:vision-extract-text": cd,
  "image:generate": ud,
  "image:variation": fd,
  "image:edit-prompt": bd
};
function Fd(e, n) {
  const r = jd[e.type];
  return /* @__PURE__ */ t(r, { data: e.data, onChange: n, nodeId: e.id }, e.id);
}
function zd({ selectedIds: e }) {
  const {
    definition: n,
    selectedNodeId: r,
    setSelectedNodeId: i,
    updateNodeData: a,
    removeNode: s,
    duplicateNodes: d
  } = Ke(), [c, l] = S("config"), p = ce(null), u = ce(null);
  On();
  const f = W(() => e && e.length > 1 ? e : r ? [r] : [], [e, r]), h = f.length > 1, g = f.length > 0, x = W(() => h || f.length === 0 || !n ? null : n.nodes.find((y) => y.id === f[0]) ?? null, [n, f, h]), m = E(() => {
    i(null);
  }, [i]);
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
  const v = x ? Ud[x.type] : null, w = () => {
    if (h)
      for (const y of f) s(y);
    else x && s(x.id);
  }, b = () => {
    f.length !== 0 && d(f);
  }, N = (y) => {
    x && a(x.id, y);
  };
  return /* @__PURE__ */ t("div", { ref: p, className: "flex flex-col flex-1 min-h-0 bg-white", "data-testid": "config-panel", children: h ? (
    // ---------------------------------------------------------------
    // Multi-select pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ o("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ t("span", { className: "text-base", "aria-hidden": !0, children: "⧉" }),
        /* @__PURE__ */ o("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: [
          f.length,
          " nodes selected"
        ] }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: m,
            className: "w-7 h-7 p-0 bg-transparent border-none text-[#64748b] text-lg leading-none cursor-pointer rounded font-inherit",
            "aria-label": "Close",
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto p-4 flex flex-col gap-3", children: [
        /* @__PURE__ */ t("div", { className: "text-xs text-[#64748b] leading-normal", children: "Bulk actions apply to every selected node. Individual node configuration is only shown for single selections." }),
        /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: w,
              className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-[#fecaca] rounded-md cursor-pointer font-inherit",
              children: "Delete all"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: b,
              className: "px-2.5 py-1.5 text-xs font-semibold bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0] rounded-md cursor-pointer font-inherit",
              children: "Duplicate all"
            }
          )
        ] })
      ] })
    ] })
  ) : x && v ? (
    // ---------------------------------------------------------------
    // Single-node pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ o("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ t("span", { className: "text-lg leading-none", "aria-hidden": !0, children: v.icon }),
        /* @__PURE__ */ t("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: v.name }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: m,
            className: "w-7 h-7 p-0 bg-transparent border-none text-[#64748b] text-lg leading-none cursor-pointer rounded font-inherit",
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
          className: "h-9 flex border-b border-[#e2e8f0] shrink-0",
          onKeyDown: (y) => {
            const C = x && gn.has(x.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"], T = C.indexOf(c);
            let D = null;
            y.key === "ArrowRight" ? D = C[(T + 1) % C.length] : y.key === "ArrowLeft" ? D = C[(T - 1 + C.length) % C.length] : y.key === "Home" ? D = C[0] : y.key === "End" && (D = C[C.length - 1]), D && (y.preventDefault(), l(D), u.current?.querySelector(
              `[data-tab="${D}"]`
            )?.focus());
          },
          children: (x && gn.has(x.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"]).map((y) => {
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
                  k ? "text-[#0f172a] border-b-2 border-b-[#646cff]" : "text-[#64748b] border-b-2 border-b-transparent"
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
        c === "config" && Fd(x, N),
        c === "runs" && /* @__PURE__ */ t("div", { className: "p-6 text-xs text-[#64748b]", children: "No runs yet." }),
        c === "docs" && /* @__PURE__ */ t("div", { className: "pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug", children: yd[x.type] ?? /* @__PURE__ */ t("p", { className: "text-text-secondary", children: "No docs available for this node type." }) }),
        c === "bench" && gn.has(x.type) && (() => {
          const y = x.data;
          return /* @__PURE__ */ t(
            Bd,
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
      /* @__PURE__ */ o("div", { className: "h-10 px-3 flex items-center justify-between gap-2 border-t border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: w,
            className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-transparent rounded-md cursor-pointer font-inherit",
            children: "🗑 Delete node"
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: b,
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
function Re(e) {
  if (e == null) return "--";
  if (e < 1e3) return `${Math.round(e)}ms`;
  if (e < 6e4) return `${(e / 1e3).toFixed(1)}s`;
  const n = Math.floor(e / 6e4), r = Math.floor(e % 6e4 / 1e3);
  return `${n}m ${r}s`;
}
function mt(e) {
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
function qd(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Wd(e) {
  return e == null || e === 0 ? "--" : e < 1e-3 ? "<$0.001" : e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Vd(e) {
  return e == null || e === 0 ? "text-text-tertiary" : e < 0.01 ? "text-[#16a34a]" : e < 0.1 ? "text-[#ca8a04]" : e < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Pr(e) {
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
function xn(e) {
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
function Kd(e) {
  return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function it({ label: e, children: n }) {
  return /* @__PURE__ */ o("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ t("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: e }),
    /* @__PURE__ */ t("span", { className: "text-[13px] text-text-primary", children: n })
  ] });
}
function Hd({ pipelineId: e, run: n, onBack: r }) {
  const i = Ve();
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
      /* @__PURE__ */ t(it, { label: "Status", children: /* @__PURE__ */ t(
        le,
        {
          tone: Pr(n.status),
          "aria-label": `Status: ${xn(n.status)}`,
          children: xn(n.status)
        }
      ) }),
      /* @__PURE__ */ t(it, { label: "Started", children: new Date(n.startedAt).toLocaleString() }),
      n.completedAt && /* @__PURE__ */ t(it, { label: "Completed", children: new Date(n.completedAt).toLocaleString() }),
      /* @__PURE__ */ t(it, { label: "Duration", children: Re(n.durationMs) }),
      /* @__PURE__ */ t(it, { label: "Triggered by", children: Kd(n) }),
      /* @__PURE__ */ t(it, { label: "Trigger type", children: n.triggeredBy.triggerType }),
      n.estimatedCostUsd != null && n.estimatedCostUsd > 0 && /* @__PURE__ */ o(it, { label: "Est. Cost", children: [
        /* @__PURE__ */ t("span", { className: I("font-semibold", Vd(n.estimatedCostUsd)), children: Wd(n.estimatedCostUsd) }),
        n.estimatedCostUsd > 1 && /* @__PURE__ */ t("span", { className: "ml-1.5 rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "Budget Warning" })
      ] }),
      n.tokenUsage && Object.keys(n.tokenUsage).length > 0 && /* @__PURE__ */ o("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: "Cost Breakdown" }),
        Object.entries(n.tokenUsage).map(([a, s]) => /* @__PURE__ */ o(
          "div",
          {
            className: "flex items-center gap-2 py-0.5 text-[11px]",
            children: [
              /* @__PURE__ */ t("span", { className: "min-w-[100px] font-mono text-text-secondary", children: a }),
              /* @__PURE__ */ o("span", { className: "text-text-tertiary", children: [
                s.tokensIn.toLocaleString(),
                " in / ",
                s.tokensOut.toLocaleString(),
                " out"
              ] })
            ]
          },
          a
        ))
      ] }),
      n.error && /* @__PURE__ */ o("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("div", { className: "mb-1 text-[11px] font-semibold uppercase text-state-failed", children: "Error" }),
        /* @__PURE__ */ o("div", { className: "whitespace-pre-wrap break-words rounded-md bg-[#fef2f2] px-2.5 py-2 font-mono text-xs text-[#991b1b]", children: [
          n.error.message,
          n.error.nodeId && /* @__PURE__ */ o("div", { className: "mt-1 text-[11px] text-[#b91c1c]", children: [
            "at node: ",
            n.error.nodeId
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => i(`/pipelines/${e}/runs/${n.id}`),
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
        Object.entries(n.steps).map(([a, s]) => {
          const d = Pr(s.status), c = xn(s.status), l = s.output, p = l?.response;
          return /* @__PURE__ */ o("div", { className: "mb-2", children: [
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2 py-1 text-xs", children: [
              /* @__PURE__ */ t(le, { tone: d, "aria-label": `Status: ${c}`, children: c }),
              /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: a.slice(0, 10) }),
              s.durationMs != null && /* @__PURE__ */ t("span", { className: "ml-auto text-[11px] text-text-tertiary", children: Re(s.durationMs) })
            ] }),
            p && /* @__PURE__ */ t("div", { className: "mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-2 text-xs leading-relaxed text-text-primary", children: p }),
            l && !p && Object.keys(l).length > 0 && /* @__PURE__ */ t("div", { className: "mt-1 max-h-[120px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-1.5 font-mono text-[11px] text-text-secondary", children: JSON.stringify(l, null, 2) })
          ] }, a);
        })
      ] }),
      /* @__PURE__ */ t("div", { className: "mt-3", children: /* @__PURE__ */ o("details", { children: [
        /* @__PURE__ */ t("summary", { className: "cursor-pointer select-none text-[11px] text-text-tertiary", children: "Raw snapshot JSON" }),
        /* @__PURE__ */ t("pre", { className: "mt-1.5 max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-md border border-border bg-surface-inset p-2.5 text-[10px]", children: JSON.stringify(n, null, 2) })
      ] }) })
    ] }) })
  ] });
}
function Mr(e) {
  return e == null || e === 0 ? "--" : e < 1e-3 ? "<$0.001" : e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Jd(e) {
  return e == null || e === 0 ? "text-text-tertiary" : e < 0.01 ? "text-[#16a34a]" : e < 0.1 ? "text-[#ca8a04]" : e < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Gd(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Yd(e) {
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
function Xd(e) {
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
function Qd(e) {
  return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function Zd({ pipelineId: e, onClose: n }) {
  const r = Ve(), [i, a] = S([]), [s, d] = S(!0), [c, l] = S(null), [p, u] = S(null), [f, h] = S(!1), [g, x] = S([]), m = ce(null), v = E(async () => {
    d(!0), l(null);
    try {
      const y = await ro(e, { limit: 50 });
      a(y.runs);
    } catch (y) {
      l(y instanceof Error ? y.message : "Failed to load runs");
    } finally {
      d(!1);
    }
  }, [e]);
  oe(() => {
    m.current !== e && (m.current = e, v());
  }, [e, v]), je("*", E((y) => {
    const { eventType: k, payload: C } = y;
    if (!C || typeof C != "object") return;
    const T = C;
    if (!(T.pipelineId && T.pipelineId !== e))
      switch (k) {
        case "pipeline.run.started": {
          const D = C;
          if (D.pipelineId !== e) return;
          const P = {
            id: D.runId,
            pipelineId: D.pipelineId,
            pipelineVersion: 0,
            status: "running",
            triggeredBy: D.triggeredBy,
            ownerNodeId: "local",
            startedAt: D.at,
            currentStepIds: [],
            steps: {},
            context: {}
          };
          a((M) => [P, ...M.filter((re) => re.id !== D.runId)]);
          break;
        }
        case "pipeline.run.completed": {
          const D = C;
          a(
            (P) => P.map(
              (M) => M.id === D.runId ? { ...M, status: "completed", completedAt: D.at, durationMs: D.durationMs } : M
            )
          );
          break;
        }
        case "pipeline.run.failed": {
          const D = C;
          a(
            (P) => P.map(
              (M) => M.id === D.runId ? { ...M, status: "failed", completedAt: D.at, error: D.error } : M
            )
          );
          break;
        }
        case "pipeline.run.cancelled": {
          const D = C;
          a(
            (P) => P.map(
              (M) => M.id === D.runId ? { ...M, status: "cancelled", completedAt: D.at } : M
            )
          );
          break;
        }
      }
  }, [e]));
  const w = W(
    () => i.find((y) => y.id === p) ?? null,
    [i, p]
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
          w && /* @__PURE__ */ t(
            Hd,
            {
              pipelineId: e,
              run: w,
              onBack: () => u(null)
            }
          ),
          s && i.length === 0 && /* @__PURE__ */ t("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "Loading runs..." }),
          c && /* @__PURE__ */ o("div", { className: "p-4 text-center text-xs text-state-failed", children: [
            c,
            /* @__PURE__ */ t(
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
          !s && !c && i.length === 0 && /* @__PURE__ */ t("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "No runs yet. Trigger this pipeline to see history here." }),
          i.length > 0 && /* @__PURE__ */ t("ul", { className: "m-0 flex-1 list-none overflow-y-auto p-0", children: i.map((y) => {
            const k = Yd(y.status), C = Xd(y.status), T = g.includes(y.id);
            return /* @__PURE__ */ o(
              "li",
              {
                "data-testid": `runs-panel-row-${y.id}`,
                onClick: () => {
                  f ? b(y.id) : u(y.id);
                },
                className: I(
                  "cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover",
                  T && "bg-[#eff6ff]"
                ),
                children: [
                  /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
                    f && /* @__PURE__ */ t(
                      "input",
                      {
                        type: "checkbox",
                        checked: T,
                        onChange: () => b(y.id),
                        onClick: (D) => D.stopPropagation(),
                        "data-testid": `runs-panel-compare-check-${y.id}`,
                        className: "m-0 shrink-0 accent-primary",
                        "aria-label": `Select run ${y.id.slice(0, 8)} for comparison`
                      }
                    ),
                    /* @__PURE__ */ t(le, { tone: k, "aria-label": `Status: ${C}`, children: C }),
                    /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-secondary", children: y.id.slice(0, 8) }),
                    /* @__PURE__ */ t("span", { className: "ml-auto text-[11px] text-text-tertiary", children: Gd(y.startedAt) })
                  ] }),
                  /* @__PURE__ */ o("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ t("span", { children: Re(y.durationMs) }),
                    y.estimatedCostUsd != null && y.estimatedCostUsd > 0 && /* @__PURE__ */ t(
                      "span",
                      {
                        className: I("font-mono font-semibold", Jd(y.estimatedCostUsd)),
                        title: `Estimated cost: ${Mr(y.estimatedCostUsd)}`,
                        children: Mr(y.estimatedCostUsd)
                      }
                    ),
                    y.estimatedCostUsd != null && y.estimatedCostUsd > 1 && /* @__PURE__ */ t("span", { className: "rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "High Cost" }),
                    /* @__PURE__ */ t("span", { className: "ml-auto", children: Qd(y) })
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
function ep({
  pipelineId: e,
  selectedNodeId: n,
  sidebarTab: r,
  onTabChange: i
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
              onClick: () => i("config"),
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
              onClick: () => i("runs"),
              "data-testid": "sidebar-tab-runs",
              children: "Runs"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto flex flex-col", children: [
          r === "config" && (n !== null ? /* @__PURE__ */ t(zd, {}) : /* @__PURE__ */ t("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          r === "runs" && /* @__PURE__ */ t(
            Zd,
            {
              pipelineId: e,
              onClose: () => i("config")
            }
          )
        ] })
      ]
    }
  );
}
function tp(e) {
  return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function np(e) {
  if (!e) return [];
  const n = /* @__PURE__ */ new Set(), r = /\{\{\s*context\.([a-zA-Z0-9_.]+)\s*\}\}/g;
  for (const i of e.nodes) {
    const a = i.data;
    if (a.type === "llm") {
      for (const s of (a.userPromptTemplate || "").matchAll(r))
        s[1].startsWith("steps.") || n.add(s[1]);
      for (const s of (a.systemPrompt || "").matchAll(r))
        s[1].startsWith("steps.") || n.add(s[1]);
    } else if (a.type === "transform" && a.expression)
      for (const s of a.expression.matchAll(r))
        s[1].startsWith("steps.") || n.add(s[1]);
  }
  return Array.from(n);
}
function rp(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const n = e.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || e.isContentEditable);
}
function ah() {
  const { pipelineId: e } = ft(), n = W(() => e ? st(e) !== null : !1, [e]);
  return !e || !n ? /* @__PURE__ */ t(gt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t(oo, { pipelineId: e, children: /* @__PURE__ */ t(op, { pipelineId: e }) });
}
function op({ pipelineId: e }) {
  const n = Ve(), r = Ke(), i = xt(), { toast: a } = Gt(), {
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
  } = r, m = sl(e), [v, w] = S(!1), b = ce(null), N = ce(d);
  oe(() => (N.current && !d && (w(!0), b.current && clearTimeout(b.current), b.current = setTimeout(() => w(!1), 450)), N.current = d, () => {
    b.current && (clearTimeout(b.current), b.current = null);
  }), [d]);
  const y = W(
    () => s ? go(s) : null,
    [s]
  ), k = (y?.errors.length ?? 0) > 0, C = W(
    () => np(s),
    [s]
  ), D = W(() => s ? s.nodes.some((ye) => ye.type === "trigger") : !1, [s]) ? ["trigger"] : [], [P, M] = S(!0), [re, R] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), J = E(() => {
    R((ye) => {
      const se = !ye;
      try {
        window.localStorage.setItem(
          "ws_pipelines_v1_show_tags",
          se ? "true" : "false"
        );
      } catch {
      }
      return se;
    });
  }, []), [Q, G] = S(!1), [Z, O] = S(!1), [A, Y] = S(!1), [z, _] = S(!1), [V, K] = S(!1), X = W(() => s?.publishedSnapshot ? s.publishedSnapshot : null, [s]), me = s?.status === "published", q = !m.isRunActive && (!me || k), de = m.isRunActive ? "Cancel the active run" : me ? k ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", ke = E(async () => {
    if (m.isRunActive && m.currentRunId) {
      i.cancelRun(m.currentRunId);
      return;
    }
    if (!q) {
      if (C.length > 0) {
        m.setTriggerInputValues(
          Object.fromEntries(C.map((ye) => [ye, ""]))
        ), m.setTriggerInputOpen(!0);
        return;
      }
      m.handleRunClick();
    }
  }, [m, i, q, C]);
  oe(() => {
    const ye = (se) => {
      if (rp(se.target)) return;
      const Me = se.metaKey || se.ctrlKey;
      if (Me && se.key.toLowerCase() === "s") {
        se.preventDefault(), p(), a("Saved", { type: "success", durationMs: 1200 });
        return;
      }
      if (Me && se.key === "Enter") {
        se.preventDefault(), ke();
        return;
      }
      if (Me && se.key === ".") {
        se.preventDefault(), m.isRunActive && m.currentRunId && i.cancelRun(m.currentRunId);
        return;
      }
      if (Me && se.shiftKey && se.key.toLowerCase() === "z") {
        se.preventDefault(), g();
        return;
      }
      if (Me && se.key.toLowerCase() === "z") {
        se.preventDefault(), h();
        return;
      }
      if (se.key === "Escape") {
        l(null);
        return;
      }
    };
    return window.addEventListener("keydown", ye), () => window.removeEventListener("keydown", ye);
  }, [p, a, ke, m, i, h, g, l]);
  const Fe = () => {
    if (!s) return;
    const ye = En(s.id);
    ye && n(`/pipelines/${ye.id}`);
  }, tt = () => {
    if (!s) return;
    const ye = wn(s.id);
    ye && Rt(`${tp(s.name)}.pipeline.json`, ye);
  }, He = async () => {
    if (!s) return;
    const ye = Zs(s);
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(ye), a("Mermaid diagram copied", { type: "success" });
      else
        throw new Error("clipboard unavailable");
    } catch (se) {
      console.warn("[PipelineEditor] clipboard write failed", se), a("Could not copy Mermaid diagram", { type: "error" });
    }
  }, Be = () => {
    _(!0);
  }, Ge = () => {
    G(!1), !k && (u(), a("Pipeline published", { type: "success" }));
  }, Je = () => {
    s && (Wo(s.id), O(!1), n("/pipelines"));
  }, Ye = () => {
    ao(e), Y(!1), a("Run history cleared", { type: "success" });
  }, Te = m.currentRunId ? i.runs[m.currentRunId] : void 0;
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
          cl,
          {
            pipelineId: e,
            definition: s,
            dirty: d,
            savingFlash: v,
            isRunActive: m.isRunActive,
            isTriggering: m.isTriggering,
            runDisabled: q,
            runTitle: de,
            currentRun: Te,
            breakpoints: m.breakpoints,
            onRunClick: ke,
            onDebugRunClick: m.handleDebugRunClick,
            onExport: tt,
            onPublishClick: () => G(!0),
            onDuplicate: Fe,
            onCopyMermaid: He,
            onViewVersions: Be,
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
              "border-b border-border bg-[#fafbfc]",
              "min-h-[34px] shrink-0 sticky top-11 z-[4]"
            ),
            children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary font-semibold", children: "TAGS" }),
              /* @__PURE__ */ t(
                Ln,
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
          /* @__PURE__ */ t(ts, { disabledTypes: D }),
          /* @__PURE__ */ t("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ t(
            gs,
            {
              errorNodeId: m.activeError?.nodeId ?? null,
              onErrorNodePosition: m.handleErrorNodePosition,
              breakpoints: m.breakpoints,
              onToggleBreakpoint: m.handleToggleBreakpoint,
              pausedAtNodeId: m.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ t(
            ep,
            {
              pipelineId: e,
              selectedNodeId: c,
              sidebarTab: m.sidebarTab,
              onTabChange: m.setSidebarTab
            }
          )
        ] }),
        m.pausedBreakpoint && /* @__PURE__ */ t(
          vl,
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
          bs,
          {
            error: m.activeError,
            anchor: m.errorNodeAnchor,
            onDismiss: m.handleDismissError,
            onRetry: m.handleRetryFromError
          }
        ),
        /* @__PURE__ */ t(
          il,
          {
            runId: m.currentRunId,
            visible: m.isRunActive && P
          }
        ),
        /* @__PURE__ */ t(
          al,
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
            clearRunsConfirmOpen: A,
            onClearRunsClose: () => Y(!1),
            onClearRunsConfirm: Ye,
            versionDiffOpen: z,
            onVersionDiffClose: () => _(!1),
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
              /* @__PURE__ */ t(Ee, { variant: "ghost", onClick: () => m.setTriggerInputOpen(!1), children: "Cancel" }),
              /* @__PURE__ */ t(
                Ee,
                {
                  variant: "primary",
                  onClick: m.handleTriggerInputSubmit,
                  disabled: C.some((ye) => !m.triggerInputValues[ye]?.trim()),
                  children: "Run"
                }
              )
            ] }),
            children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ t("p", { className: "m-0 text-xs text-text-secondary", children: "This pipeline expects input data. Provide values for the trigger context:" }),
              C.map((ye) => /* @__PURE__ */ o("label", { className: "flex flex-col gap-1 text-xs", children: [
                /* @__PURE__ */ t("span", { className: "font-medium text-text-primary", children: ye }),
                /* @__PURE__ */ t(
                  "textarea",
                  {
                    "data-autofocus": ye === C[0] ? !0 : void 0,
                    rows: 3,
                    className: "resize-y px-2 py-1.5 rounded-md border border-border text-xs font-inherit",
                    value: m.triggerInputValues[ye] ?? "",
                    onChange: (se) => m.setTriggerInputValues((Me) => ({ ...Me, [ye]: se.target.value }))
                  }
                )
              ] }, ye))
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
function ap(e) {
  const n = e?.event;
  return !n || n === "manual" ? { icon: "▶", text: "Manual" } : n === "schedule" ? { icon: "⏱", text: e?.schedule ?? "Schedule" } : n === "webhook" ? { icon: "🔌", text: e?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${e?.event}` };
}
function ip({
  row: e,
  onOpen: n,
  onRun: r,
  onDuplicate: i,
  onExport: a,
  onDelete: s,
  selectionMode: d,
  selected: c,
  anySelected: l,
  onToggleSelect: p
}) {
  const [u, f] = S(!1), [h, g] = S(!1), x = ce(null);
  ht(x, () => f(!1), u);
  const m = e.status === "published", v = e.status === "archived", w = typeof e.publishedVersion == "number", b = ap(e.triggerBinding);
  let N, y;
  v ? (N = `Archived · v${e.version}`, y = "danger") : m ? (N = `Published · v${e.version}`, y = "success") : w ? (N = `Draft · v${e.version} (published v${e.publishedVersion})`, y = "warning") : (N = `Draft · v${e.version}`, y = "neutral");
  const k = !m, C = (P) => (M) => {
    M.stopPropagation(), P();
  }, T = d || c || h || l, D = (P) => {
    d ? p(P.shiftKey) : n();
  };
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": `pipeline-card-${e.id}`,
      "data-selected": c ? "true" : "false",
      onClick: D,
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
              "input",
              {
                type: "checkbox",
                "data-testid": `pipeline-select-${e.id}`,
                checked: c,
                onClick: (P) => {
                  P.stopPropagation(), p(P.shiftKey);
                },
                onKeyDown: (P) => {
                  (P.key === " " || P.key === "Spacebar") && (P.preventDefault(), p(P.shiftKey));
                },
                onChange: () => {
                },
                className: "cursor-pointer w-4 h-4 accent-primary"
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
                    f(!1), i();
                  }), children: "Duplicate" }),
                  /* @__PURE__ */ t("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: C(() => {
                    f(!1), a();
                  }), children: "Export JSON" }),
                  /* @__PURE__ */ t(
                    "button",
                    {
                      className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-[#dc2626]",
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
const sp = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, lp = ["draft", "published"];
function cp({
  search: e,
  onSearchChange: n,
  statusFilter: r,
  statusExplicit: i,
  onToggleStatusKey: a,
  triggerFilter: s,
  onTriggerFilterChange: d,
  sortKey: c,
  onSortKeyChange: l,
  allVisibleSelected: p,
  selectAllRef: u,
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
                "input",
                {
                  ref: u,
                  type: "checkbox",
                  "data-testid": "pipeline-select-all",
                  "aria-label": "Select all visible pipelines",
                  checked: p,
                  onChange: f,
                  className: "w-3.5 h-3.5 accent-primary"
                }
              ),
              /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "All" })
            ]
          }
        ),
        /* @__PURE__ */ t(
          "input",
          {
            "data-testid": "pipeline-search",
            type: "search",
            placeholder: "Search...",
            value: e,
            onChange: (h) => n(h.target.value),
            className: I(
              "border border-border-field rounded-md px-2.5 py-1.5 text-[13px]",
              "bg-[#f9fafb] text-text-primary outline-none",
              "flex-[0_1_260px] min-w-[180px]"
            )
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
            children: zn.map((h) => {
              const g = i ? r.has(h) : lp.includes(h);
              return /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  role: "checkbox",
                  "aria-checked": g,
                  "data-testid": `status-chip-${h}`,
                  onClick: () => a(h),
                  onKeyDown: (x) => {
                    (x.key === "Enter" || x.key === " ") && (x.preventDefault(), a(h));
                  },
                  className: I(
                    "px-3 py-1.5 text-xs font-medium rounded cursor-pointer font-inherit",
                    g ? "border border-primary bg-primary text-white" : "border border-border bg-white text-text-secondary"
                  ),
                  children: sp[h]
                },
                h
              );
            })
          }
        ),
        /* @__PURE__ */ o("label", { className: "text-xs text-text-secondary flex items-center gap-1.5", children: [
          "Trigger:",
          /* @__PURE__ */ o(
            "select",
            {
              "data-testid": "trigger-filter",
              value: s,
              onChange: (h) => d(h.target.value),
              className: I(
                "border border-border-field rounded-md px-2 py-1 text-[13px]",
                "bg-[#f9fafb] text-text-primary outline-none"
              ),
              children: [
                /* @__PURE__ */ t("option", { value: "all", children: "All" }),
                /* @__PURE__ */ t("option", { value: "manual", children: "Manual" }),
                /* @__PURE__ */ t("option", { value: "document", children: "Document event" }),
                /* @__PURE__ */ t("option", { value: "schedule", children: "Schedule" }),
                /* @__PURE__ */ t("option", { value: "webhook", children: "Webhook" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ o("label", { className: "text-xs text-text-secondary flex items-center gap-1.5 ml-auto", children: [
          "Sort:",
          /* @__PURE__ */ o(
            "select",
            {
              "data-testid": "sort-key",
              value: c,
              onChange: (h) => l(h.target.value),
              className: I(
                "border border-border-field rounded-md px-2 py-1 text-[13px]",
                "bg-[#f9fafb] text-text-primary outline-none"
              ),
              children: [
                /* @__PURE__ */ t("option", { value: "updated", children: "Recently updated" }),
                /* @__PURE__ */ t("option", { value: "name", children: "Name A-Z" }),
                /* @__PURE__ */ t("option", { value: "created", children: "Recently created" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
const nt = I(
  "px-2.5 py-[5px] text-xs font-semibold",
  "bg-white text-text-secondary",
  "border border-border-field rounded-md",
  "cursor-pointer font-inherit"
);
function dp({
  count: e,
  onClear: n,
  onExport: r,
  onExportAsJSON: i,
  onPublish: a,
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
  unionTags: v
}) {
  const [w, b] = S(""), N = ce(null), y = ce(null), k = ce(null);
  oe(() => {
    u && (b(""), setTimeout(() => N.current?.focus(), 30));
  }, [u]), oe(() => {
    if (!u) return;
    const T = (P) => {
      y.current?.contains(P.target) || x();
    }, D = window.setTimeout(() => {
      document.addEventListener("mousedown", T);
    }, 0);
    return () => {
      window.clearTimeout(D), document.removeEventListener("mousedown", T);
    };
  }, [u, x]), oe(() => {
    if (!f) return;
    const T = (P) => {
      k.current?.contains(P.target) || m();
    }, D = window.setTimeout(() => {
      document.addEventListener("mousedown", T);
    }, 0);
    return () => {
      window.clearTimeout(D), document.removeEventListener("mousedown", T);
    };
  }, [f, m]);
  const C = () => {
    const T = w.trim();
    T.length !== 0 && (h(T), b(""));
  };
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": "bulk-action-bar",
      className: I(
        "min-h-[40px] shrink-0 flex items-center gap-3 px-6",
        "border-b border-border bg-[#eef2ff]",
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
        /* @__PURE__ */ t("button", { "data-testid": "bulk-clear", className: nt, onClick: n, children: "Clear" }),
        /* @__PURE__ */ t("button", { "data-testid": "bulk-publish", className: nt, onClick: a, children: "Publish selected" }),
        /* @__PURE__ */ t("button", { "data-testid": "bulk-archive", className: nt, onClick: s, children: "Archive selected" }),
        /* @__PURE__ */ t("button", { "data-testid": "bulk-export-json", className: nt, onClick: i, children: "Export selected as JSON" }),
        /* @__PURE__ */ t("button", { "data-testid": "bulk-export", className: nt, onClick: r, children: "Export all" }),
        /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "bulk-delete-confirm-prompt",
            className: nt,
            onClick: p,
            children: "Delete selected"
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", children: [
          /* @__PURE__ */ t("button", { "data-testid": "bulk-add-tag-btn", className: nt, onClick: d, children: "Add tag..." }),
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
                  "input",
                  {
                    ref: N,
                    type: "text",
                    "data-testid": "bulk-add-tag-input",
                    placeholder: "Tag name",
                    value: w,
                    onChange: (T) => b(T.target.value),
                    onKeyDown: (T) => {
                      T.key === "Enter" ? (T.preventDefault(), C()) : T.key === "Escape" && (T.preventDefault(), x());
                    },
                    className: I(
                      "border border-border-field rounded-md px-2.5 py-1.5 text-[13px]",
                      "bg-[#f9fafb] text-text-primary outline-none w-full"
                    )
                  }
                ),
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "bulk-add-tag-submit",
                    disabled: w.trim().length === 0,
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
                nt,
                v.length === 0 && "opacity-50 cursor-not-allowed"
              ),
              onClick: c,
              disabled: v.length === 0,
              title: v.length === 0 ? "No tags on selected pipelines" : "Remove tag from selected",
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
                /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5", children: v.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "No tags to remove." }) : v.map((T) => /* @__PURE__ */ o(
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
function pp({
  visibleRows: e,
  filteredIds: n
}) {
  const [r, i] = S(!1), [a, s] = S(/* @__PURE__ */ new Set()), d = ce(null), c = ce(null), l = E(() => {
    s(/* @__PURE__ */ new Set());
  }, []), p = E(() => {
    r ? (l(), i(!1)) : i(!0);
  }, [r, l]), u = E(
    (m, v = !1) => {
      const w = e, b = w.findIndex((y) => y.id === m), N = d.current;
      b !== -1 && (d.current = b), s((y) => {
        const k = new Set(y), C = !k.has(m);
        if (v && N != null && b !== -1) {
          const T = Math.min(N, b), D = Math.max(N, b);
          for (let P = T; P <= D; P++) {
            const M = w[P];
            M && (C ? k.add(M.id) : k.delete(M.id));
          }
        } else C ? k.add(m) : k.delete(m);
        return k;
      });
    },
    [e]
  ), f = E(() => {
    s(new Set(n));
  }, [n]), h = e.length > 0 && e.every((m) => a.has(m.id)), g = !h && e.some((m) => a.has(m.id)), x = E(() => {
    s((m) => {
      const v = new Set(m);
      if (h)
        for (const w of e) v.delete(w.id);
      else
        for (const w of e) v.add(w.id);
      return v;
    }), r || i(!0);
  }, [h, e, r]);
  return oe(() => {
    c.current && (c.current.indeterminate = g);
  }, [g]), {
    selectionMode: r,
    selected: a,
    allVisibleSelected: h,
    someVisibleSelected: g,
    selectAllRef: c,
    handleToggleSelectMode: p,
    handleToggleSelect: u,
    handleSelectAllFiltered: f,
    handleHeaderToggleAll: x,
    clearSelection: l,
    setSelectionMode: i
  };
}
const up = 280, Ce = 160, mp = 40, hp = 200;
function te(e) {
  return mp + e * up;
}
function ne(e) {
  return hp + e * Ce;
}
function ae(e, n, r, i = "in") {
  return {
    id: crypto.randomUUID(),
    source: e,
    sourceHandle: n,
    target: r,
    targetHandle: i
  };
}
function fp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = {
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
    config: { body: `{{context.steps.${i}.response}}` },
    idempotent: !0,
    onError: "fail-run"
  }, l = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: s },
    { id: i, type: "llm", position: { x: te(1), y: ne(0) }, data: d },
    { id: a, type: "action", position: { x: te(2), y: ne(0) }, data: c }
  ], p = [
    ae(r, "out", i),
    ae(i, "out", a)
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
function gp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = {
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
      value: `{{context.steps.${a}.response}}`
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
  }, v = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: p },
    { id: i, type: "fork", position: { x: te(1), y: ne(0) }, data: u },
    { id: a, type: "llm", position: { x: te(2), y: ne(0) - Ce / 2 }, data: f },
    { id: s, type: "action", position: { x: te(3), y: ne(0) - Ce / 2 }, data: h },
    { id: d, type: "llm", position: { x: te(2), y: ne(0) + Ce / 2 }, data: g },
    { id: c, type: "action", position: { x: te(3), y: ne(0) + Ce / 2 }, data: x },
    { id: l, type: "join", position: { x: te(4), y: ne(0) }, data: m }
  ], w = [
    ae(r, "out", i),
    ae(i, "branch-0", a),
    ae(a, "out", s),
    ae(s, "out", l, "in-0"),
    ae(i, "branch-1", d),
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
    nodes: v,
    edges: w,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function xp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = crypto.randomUUID(), f = {
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
    expression: `context.steps.${i}.output.safe === true`,
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
      message: `Flagged comment: {{context.steps.${i}.output.reason}}`
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
    { id: i, type: "llm", position: { x: te(1), y: ne(0) }, data: h },
    { id: a, type: "condition", position: { x: te(2), y: ne(0) }, data: g },
    { id: s, type: "action", position: { x: te(3), y: ne(0) - Ce / 2 }, data: x },
    { id: d, type: "action", position: { x: te(3), y: ne(0) + Ce / 2 }, data: m },
    { id: c, type: "approval", position: { x: te(4), y: ne(0) + Ce / 2 }, data: v },
    { id: l, type: "condition", position: { x: te(5), y: ne(0) + Ce / 2 }, data: w },
    { id: p, type: "action", position: { x: te(6), y: ne(0) }, data: b },
    { id: u, type: "action", position: { x: te(6), y: ne(0) + Ce }, data: N }
  ], k = [
    ae(r, "out", i),
    ae(i, "out", a),
    ae(a, "true", s),
    ae(a, "false", d),
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
function bp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = {
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
    expression: `$.steps.${i}.response`,
    outputKey: "tags"
  }, p = {
    type: "action",
    actionType: "update-document",
    config: { field: "tags", value: "{{context.tags}}" },
    idempotent: !0,
    onError: "fail-run"
  }, u = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: d },
    { id: i, type: "llm", position: { x: te(1), y: ne(0) }, data: c },
    { id: a, type: "transform", position: { x: te(2), y: ne(0) }, data: l },
    { id: s, type: "action", position: { x: te(3), y: ne(0) }, data: p }
  ], f = [
    ae(r, "out", i),
    ae(i, "out", a),
    ae(a, "out", s)
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
function yp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = {
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
    { id: i, type: "approval", position: { x: te(1), y: ne(0) }, data: c },
    { id: a, type: "approval", position: { x: te(2), y: ne(0) }, data: l },
    { id: s, type: "action", position: { x: te(3), y: ne(0) }, data: p }
  ], f = [
    ae(r, "out", i),
    ae(i, "approved", a),
    ae(a, "approved", s)
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
function vp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = {
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
    config: { body: `{{context.steps.${a}.response}}` },
    idempotent: !0,
    onError: "route-error"
  }, u = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: d },
    { id: i, type: "transform", position: { x: te(1), y: ne(0) }, data: c },
    { id: a, type: "llm", position: { x: te(2), y: ne(0) }, data: l },
    { id: s, type: "action", position: { x: te(3), y: ne(0) }, data: p }
  ], f = [
    ae(r, "out", i),
    ae(i, "out", a),
    ae(a, "out", s)
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
function wp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = {
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
    config: { documentId: "digest-doc", body: `{{context.steps.${i}.response}}` },
    idempotent: !0,
    onError: "route-error"
  }, l = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: s },
    { id: i, type: "llm", position: { x: te(1), y: ne(0) }, data: d },
    { id: a, type: "action", position: { x: te(2), y: ne(0) }, data: c }
  ], p = [
    ae(r, "out", i),
    ae(i, "out", a)
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
function Np(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = { type: "trigger", triggerType: "document.submit" }, d = {
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
    config: { field: "tags", value: `{{context.steps.${i}.response}}` },
    idempotent: !0,
    onError: "fail-run"
  }, l = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: s },
    { id: i, type: "llm", position: { x: te(1), y: ne(0) }, data: d },
    { id: a, type: "action", position: { x: te(2), y: ne(0) }, data: c }
  ], p = [
    ae(r, "out", i),
    ae(i, "out", a)
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
function kp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = { type: "trigger", triggerType: "document.finalize" }, p = {
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
      message: `Review complete: LLM said {{context.steps.${a}.response}}; reviewer decision: {{context.steps.${s}.output.decision}}`
    },
    idempotent: !1,
    onError: "route-error"
  }, x = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: l },
    { id: i, type: "fork", position: { x: te(1), y: ne(0) }, data: p },
    { id: a, type: "llm", position: { x: te(2), y: ne(0) - Ce / 2 }, data: u },
    { id: s, type: "approval", position: { x: te(2), y: ne(0) + Ce / 2 }, data: f },
    { id: d, type: "join", position: { x: te(3), y: ne(0) }, data: h },
    { id: c, type: "action", position: { x: te(4), y: ne(0) }, data: g }
  ], m = [
    ae(r, "out", i),
    ae(i, "branch-0", a),
    ae(a, "out", d, "in-0"),
    ae(i, "branch-1", s),
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
function Cp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = {
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
    expression: `context.steps.${i}.output.severity === 'critical'`,
    label: "Critical?"
  }, f = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "on-call",
      message: `CRITICAL incident: {{context.steps.${i}.output.summary}}`
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
        severity: `{{context.steps.${i}.output.severity}}`,
        summary: `{{context.steps.${i}.output.summary}}`
      }
    },
    idempotent: !0,
    onError: "route-error"
  }, x = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: l },
    { id: i, type: "llm", position: { x: te(1), y: ne(0) }, data: p },
    { id: a, type: "condition", position: { x: te(2), y: ne(0) }, data: u },
    { id: s, type: "action", position: { x: te(3), y: ne(0) - Ce / 2 }, data: f },
    { id: d, type: "approval", position: { x: te(4), y: ne(0) - Ce / 2 }, data: h },
    { id: c, type: "action", position: { x: te(3), y: ne(0) + Ce / 2 }, data: g }
  ], m = [
    ae(r, "out", i),
    ae(i, "out", a),
    ae(a, "true", s),
    ae(s, "out", d),
    ae(a, "false", c)
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
function Ip(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = crypto.randomUUID(), f = {
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

Summary: {{context.steps.${i}.response}}`,
    temperature: 0.1,
    maxTokens: 1024,
    streaming: !1
  }, m = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are a code-style reviewer. Flag naming, structure, readability, and idiom issues. Output JSON {"findings": [{"file": string, "line": number?, "issue": string}]}.',
    userPromptTemplate: `{{context.payload.pull_request.diff}}

Summary: {{context.steps.${i}.response}}`,
    temperature: 0.2,
    maxTokens: 1024,
    streaming: !1
  }, v = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are a test-coverage reviewer. Identify untested branches, missing edge-case tests, and risky changes lacking tests. Output JSON {"gaps": [{"file": string, "concern": string}]}.',
    userPromptTemplate: `{{context.payload.pull_request.diff}}

Summary: {{context.steps.${i}.response}}`,
    temperature: 0.1,
    maxTokens: 1024,
    streaming: !1
  }, w = {
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
    { id: i, type: "llm", position: { x: te(1), y: ne(0) }, data: h },
    { id: a, type: "fork", position: { x: te(2), y: ne(0) }, data: g },
    { id: s, type: "llm", position: { x: te(3), y: ne(0) - Ce }, data: x },
    { id: d, type: "llm", position: { x: te(3), y: ne(0) }, data: m },
    { id: c, type: "llm", position: { x: te(3), y: ne(0) + Ce }, data: v },
    { id: l, type: "join", position: { x: te(4), y: ne(0) }, data: w },
    { id: p, type: "llm", position: { x: te(5), y: ne(0) }, data: b },
    { id: u, type: "action", position: { x: te(6), y: ne(0) }, data: N }
  ], k = [
    ae(r, "out", i),
    ae(i, "out", a),
    ae(a, "branch-0", s),
    ae(a, "branch-1", d),
    ae(a, "branch-2", c),
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
function Sp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = {
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
    expression: `context.steps.${i}.output.category === 'clean'`,
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
    message: `Document flagged as {{context.steps.${i}.output.category}} — please review before publishing.`
  }, h = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: c },
    { id: i, type: "llm", position: { x: te(1), y: ne(0) }, data: l },
    { id: a, type: "condition", position: { x: te(2), y: ne(0) }, data: p },
    { id: s, type: "action", position: { x: te(3), y: ne(0) - Ce / 2 }, data: u },
    { id: d, type: "approval", position: { x: te(3), y: ne(0) + Ce / 2 }, data: f }
  ], g = [
    ae(r, "out", i),
    ae(i, "out", a),
    ae(a, "true", s),
    ae(a, "false", d)
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
function Tp(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = {
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
    expression: `$.steps.${i}.output`,
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
  }, b = [
    { id: r, type: "trigger", position: { x: te(0), y: ne(0) }, data: u },
    { id: i, type: "llm", position: { x: te(1), y: ne(0) }, data: f },
    { id: a, type: "transform", position: { x: te(2), y: ne(0) }, data: h },
    { id: s, type: "condition", position: { x: te(3), y: ne(0) }, data: g },
    { id: d, type: "action", position: { x: te(4), y: ne(0) - Ce / 2 }, data: x },
    { id: c, type: "llm", position: { x: te(4), y: ne(0) + Ce / 2 }, data: m },
    { id: l, type: "approval", position: { x: te(5), y: ne(0) + Ce / 2 }, data: v },
    { id: p, type: "action", position: { x: te(6), y: ne(0) + Ce / 2 }, data: w }
  ], N = [
    ae(r, "out", i),
    ae(i, "out", a),
    ae(a, "out", s),
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
const bn = [
  {
    id: "document-summary",
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    tags: ["llm", "summary", "document"],
    build: fp
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: gp
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: xp,
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
    build: bp,
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
    build: yp,
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
    build: vp
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: wp
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: Np
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: kp
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: Cp
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: Ip
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: Sp
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: Tp
  }
], ko = "/api";
async function $p(e) {
  const n = { createdTypes: [], errors: [] };
  if (!e?.documentTypes?.length) return n;
  for (const r of e.documentTypes)
    try {
      const i = await Rp(r.name);
      if (i) {
        n.createdTypes.push(i.typeId);
        continue;
      }
      const a = await Ap(r);
      n.createdTypes.push(a.typeId);
    } catch (i) {
      n.errors.push(
        `Failed to scaffold "${r.name}": ${i instanceof Error ? i.message : String(i)}`
      );
    }
  return n;
}
async function Rp(e) {
  try {
    const n = await fetch(`${ko}/document-types`, { credentials: "same-origin" });
    if (!n.ok) return null;
    const i = (await n.json()).items?.find(
      (a) => a.name.toLowerCase() === e.toLowerCase()
    );
    return i ? { typeId: i.typeId } : null;
  } catch {
    return null;
  }
}
async function Ap(e) {
  const n = e.fields.map((a, s) => ({
    fieldId: crypto.randomUUID(),
    name: a.name,
    fieldType: a.fieldType,
    widget: Pp(a.fieldType),
    cardinality: 1,
    required: a.required ?? !1,
    helpText: "",
    options: a.options,
    order: s
  })), r = await fetch(`${ko}/document-types`, {
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
    const a = await r.text();
    throw new Error(`HTTP ${r.status}: ${a}`);
  }
  return await r.json();
}
function Pp(e) {
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
function Mp(e) {
  const n = /* @__PURE__ */ new Map(), r = e.nodes.map((s) => {
    const d = crypto.randomUUID();
    return n.set(s.id, d), {
      ...s,
      id: d,
      data: JSON.parse(JSON.stringify(s.data)),
      position: { ...s.position }
    };
  }), i = e.edges.map((s) => ({
    ...s,
    id: crypto.randomUUID(),
    source: n.get(s.source) ?? s.source,
    target: n.get(s.target) ?? s.target
  })), a = (/* @__PURE__ */ new Date()).toISOString();
  return {
    ...e,
    id: crypto.randomUUID(),
    name: `${e.name} (copy)`,
    status: "draft",
    version: 1,
    publishedVersion: void 0,
    publishedSnapshot: void 0,
    nodes: r,
    edges: i,
    createdAt: a,
    updatedAt: a
  };
}
function Dp(e) {
  const n = e.triggerBinding?.event ?? "manual";
  return n === "schedule" ? "Schedule" : n === "webhook" ? "Webhook" : n === "manual" ? "Manual" : n.startsWith("document.") ? `On ${n}` : n;
}
function Ep({ template: e, meta: n, onPick: r }) {
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
        e.tags.length > 0 && /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: e.tags.map((i) => /* @__PURE__ */ t(
          "span",
          {
            className: "text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#f1f5f9] text-text-secondary lowercase",
            children: i
          },
          i
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
function Op({
  open: e,
  onClose: n,
  onCreated: r,
  onSelect: i
}) {
  const { userId: a } = mo(), [s, d] = S(""), c = ce(null);
  oe(() => {
    e && (d(""), setTimeout(() => c.current?.focus(), 30));
  }, [e]);
  const l = W(() => {
    const h = /* @__PURE__ */ new Map();
    for (const g of bn) {
      const x = g.build(a || "anonymous");
      h.set(g.id, { nodeCount: x.nodes.length, trigger: Dp(x) });
    }
    return h;
  }, [a, e]), p = W(() => {
    const h = s.trim().toLowerCase();
    return h ? bn.filter(
      (g) => g.name.toLowerCase().includes(h) || g.description.toLowerCase().includes(h) || g.tags.some((x) => x.toLowerCase().includes(h))
    ) : bn;
  }, [s]), u = (h) => {
    if (r) {
      const g = h.build(a || "anonymous"), x = Mp(g);
      Vo(x), n(), r(x.id), h.prerequisites && $p(h.prerequisites).then((m) => {
        m.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", m.errors);
      });
      return;
    }
    i && i(h);
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
          "input",
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
            className: "w-full px-3 py-2 text-[13px] mb-3.5 border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none"
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
              Ep,
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
const zn = ["draft", "published", "archived"], Dr = ["draft", "published"];
function _p(e) {
  if (e == null) return null;
  if (e.trim() === "") return /* @__PURE__ */ new Set();
  const n = new Set(zn);
  return new Set(
    e.split(",").map((i) => i.trim()).filter((i) => n.has(i))
  );
}
function Lp(e, n) {
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
function Bp(e) {
  const n = e?.event;
  return !n || n === "manual" ? "manual" : n === "schedule" ? "schedule" : n === "webhook" ? "webhook" : "document";
}
function Er(e) {
  return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Up() {
  const e = /* @__PURE__ */ new Date(), n = e.getFullYear(), r = String(e.getMonth() + 1).padStart(2, "0"), i = String(e.getDate()).padStart(2, "0");
  return `${n}-${r}-${i}`;
}
function jp({
  open: e,
  onClose: n,
  onCreate: r
}) {
  const [i, a] = S(""), s = ce(null);
  oe(() => {
    e && (a(""), setTimeout(() => s.current?.focus(), 50));
  }, [e]);
  const d = i.trim().length > 0, c = () => {
    d && r(i.trim());
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
          "input",
          {
            ref: s,
            "data-testid": "new-pipeline-name",
            type: "text",
            value: i,
            onChange: (l) => a(l.target.value),
            onKeyDown: (l) => {
              l.key === "Enter" && c();
            },
            placeholder: "e.g. Invoice summarizer",
            className: I(
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
function ih() {
  const e = Ve(), { userId: n } = mo(), { toast: r } = Gt(), { triggerRun: i, isTriggering: a } = Ko(), [s, d] = Jt(), [c, l] = S([]), [p, u] = S(""), [f, h] = S("all"), [g, x] = S("updated"), m = W(
    () => _p(s.get("status")),
    [s]
  ), v = W(() => m ?? new Set(Dr), [m]), w = m != null, b = ($) => {
    const L = new URLSearchParams(s);
    if ($.size === 0)
      L.set("status", "");
    else {
      const pe = zn.filter((fe) => $.has(fe)).join(",");
      L.set("status", pe);
    }
    d(L, { replace: !0 });
  }, N = ($) => {
    const L = w ? new Set(v) : new Set(Dr);
    L.has($) ? L.delete($) : L.add($), b(L);
  }, [y, k] = S(!1), [C, T] = S(!1), [D, P] = S(null), [M, re] = S(!1), [R, J] = S(!1), [Q, G] = S(!1), Z = E(async () => {
    const $ = await Ho(), L = [];
    for (const pe of $) {
      const fe = await lt(pe.id);
      fe && L.push(Lp(fe, pe.icon));
    }
    l(L);
  }, []);
  oe(() => {
    Z();
  }, [Z]);
  const O = W(() => {
    const $ = p.trim().toLowerCase(), pe = [...c.filter((fe) => {
      if ($) {
        const we = fe.name.toLowerCase().includes($), ze = fe.tags.some((Wn) => Wn.toLowerCase().includes($));
        if (!we && !ze) return !1;
      }
      return !(!(w && v.size === 0) && !v.has(fe.status) || f !== "all" && Bp(fe.triggerBinding) !== f);
    })];
    return g === "name" ? pe.sort((fe, we) => fe.name.localeCompare(we.name)) : g === "created" ? pe.sort((fe, we) => we.createdAt.localeCompare(fe.createdAt)) : pe.sort((fe, we) => we.updatedAt.localeCompare(fe.updatedAt)), pe;
  }, [c, p, v, w, f, g]), A = W(() => O.map(($) => $.id), [O]), {
    selectionMode: Y,
    selected: z,
    allVisibleSelected: _,
    selectAllRef: V,
    handleToggleSelect: K,
    handleSelectAllFiltered: X,
    handleHeaderToggleAll: me,
    clearSelection: q,
    setSelectionMode: de
  } = pp({ visibleRows: O, filteredIds: A }), ke = W(() => {
    const $ = /* @__PURE__ */ new Set();
    for (const L of c)
      if (z.has(L.id))
        for (const pe of L.tags) $.add(pe);
    return Array.from($).sort((L, pe) => L.localeCompare(pe));
  }, [c, z]), Fe = async ($) => {
    const L = await Jo({ name: $, createdBy: n });
    k(!1), e(`/pipelines/${L.id}`);
  }, tt = () => {
    const $ = Go(n);
    ct($).then(() => Z()), e(`/pipelines/${$.id}`);
  }, He = ($) => {
    const L = $.build(n);
    ct(L), T(!1), e(`/pipelines/${L.id}`);
  }, Be = ($) => e(`/pipelines/${$}`), Ge = async ($) => {
    if ($.status !== "published") {
      r("Run requires published state", { type: "warning" });
      return;
    }
    if (!a)
      try {
        await i($.id, {}) ? r(`Run started for "${$.name}"`, { type: "success" }) : r("Could not start run", { type: "error" });
      } catch (L) {
        r(`Run failed: ${L.message}`, { type: "error" });
      } finally {
        e(`/pipelines/${$.id}`);
      }
  }, Je = ($) => {
    const L = En($);
    L && (ct(L).then(() => Z()), r(`Duplicated as "${L.name}"`, { type: "success" }));
  }, Ye = ($) => {
    const L = wn($.id);
    if (!L) {
      r("Export failed", { type: "error" });
      return;
    }
    Rt(`${Er($.name)}.pipeline.json`, L);
  }, Te = async () => {
    D && (await Hn(D), P(null), Z(), r("Pipeline deleted", { type: "success" }));
  }, ye = D ? c.find(($) => $.id === D) : null, se = () => {
    const $ = Array.from(z);
    $.length !== 0 && ($.forEach((L, pe) => {
      window.setTimeout(() => {
        const fe = c.find((ze) => ze.id === L), we = wn(L);
        !fe || !we || Rt(`${Er(fe.name)}-${Up()}.pipeline.json`, we);
      }, pe * 100);
    }), r(`Exported ${$.length} pipeline${$.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, Me = async ($) => {
    const L = Array.from(z);
    for (const pe of L) {
      const fe = await lt(pe);
      if (!fe) continue;
      const we = fe.tags ?? [];
      we.includes($) || (fe.tags = [...we, $], await ct(fe));
    }
    J(!1), Z(), r(`Added tag "${$}" to ${L.length} pipeline${L.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, wt = async ($) => {
    const L = Array.from(z);
    for (const pe of L) {
      const fe = await lt(pe);
      if (!fe) continue;
      const we = fe.tags ?? [];
      we.includes($) && (fe.tags = we.filter((ze) => ze !== $), await ct(fe));
    }
    Z(), r(`Removed tag "${$}" from ${L.length} pipeline${L.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ee = async () => {
    const $ = Array.from(z);
    for (const L of $) await Hn(L);
    re(!1), q(), Z(), r(`Deleted ${$.length} pipeline${$.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ie = async () => {
    const $ = Array.from(z);
    if ($.length === 0) return;
    let L = 0, pe = 0;
    for (const fe of $) {
      const we = await lt(fe);
      if (!we) continue;
      if (we.status === "published") {
        pe += 1;
        continue;
      }
      await Yo(fe) && (L += 1);
    }
    Z(), pe > 0 ? r(
      `Published ${L}; skipped ${pe} already published`,
      { type: "success" }
    ) : r(
      `Published ${L} pipeline${L === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, ue = async () => {
    const $ = Array.from(z);
    if ($.length === 0) return;
    let L = 0, pe = 0;
    for (const we of $) {
      const ze = await lt(we);
      if (!ze) continue;
      ze.status === "archived" ? (ze.status = "draft", pe += 1) : (ze.status = "archived", L += 1), await ct(ze);
    }
    Z();
    const fe = [];
    L > 0 && fe.push(`Archived ${L}`), pe > 0 && fe.push(`Unarchived ${pe}`), r(fe.join(" · ") || "No pipelines changed", { type: "success" });
  }, xe = async () => {
    const $ = Array.from(z);
    if ($.length === 0) return;
    const L = [];
    for (const fe of $) {
      const we = await lt(fe);
      we && L.push(we);
    }
    if (L.length === 0) {
      r("Export failed", { type: "error" });
      return;
    }
    const pe = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    Rt(`pipelines-${pe}.json`, JSON.stringify(L, null, 2)), r(`Exported ${L.length} pipeline${L.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  };
  oe(() => {
    const $ = (L) => {
      const pe = L.target;
      if (pe) {
        const we = pe.tagName;
        if (we === "INPUT" || we === "TEXTAREA" || we === "SELECT" || pe.isContentEditable)
          return;
      }
      if (L.key === "Escape") {
        (z.size > 0 || Y || R || Q) && (J(!1), G(!1), q(), de(!1));
        return;
      }
      if ((L.metaKey || L.ctrlKey) && (L.key === "a" || L.key === "A")) {
        Y && (L.preventDefault(), X());
        return;
      }
      (L.key === "Delete" || L.key === "Backspace") && z.size > 0 && !M && !D && !y && !C && (L.preventDefault(), re(!0));
    };
    return window.addEventListener("keydown", $), () => window.removeEventListener("keydown", $);
  }, [
    z,
    Y,
    R,
    Q,
    M,
    D,
    y,
    C,
    q,
    X,
    de
  ]);
  const $e = c.length > 0, Ue = z.size > 0;
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": "pipelines-page",
      className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-inherit",
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
        $e && /* @__PURE__ */ t(
          cp,
          {
            search: p,
            onSearchChange: u,
            statusFilter: v,
            statusExplicit: w,
            onToggleStatusKey: N,
            triggerFilter: f,
            onTriggerFilterChange: h,
            sortKey: g,
            onSortKeyChange: x,
            allVisibleSelected: _,
            selectAllRef: V,
            onHeaderToggleAll: me
          }
        ),
        Ue && /* @__PURE__ */ t(
          dp,
          {
            count: z.size,
            onClear: q,
            onExport: se,
            onExportAsJSON: xe,
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
            addTagOpen: R,
            removeTagOpen: Q,
            onSubmitAddTag: Me,
            onSubmitRemoveTag: wt,
            onCloseAddTag: () => J(!1),
            onCloseRemoveTag: () => G(!1),
            unionTags: ke
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: I(
              "flex-1 overflow-y-auto overflow-x-hidden min-w-0",
              $e ? "p-6" : "p-0"
            ),
            children: $e ? O.length === 0 ? /* @__PURE__ */ t(
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
                  ip,
                  {
                    row: $,
                    onOpen: () => Be($.id),
                    onRun: () => {
                      Ge($);
                    },
                    onDuplicate: () => Je($.id),
                    onExport: () => Ye($),
                    onDelete: () => P($.id),
                    selectionMode: Y,
                    selected: z.has($.id),
                    anySelected: Ue,
                    onToggleSelect: (L) => K($.id, L)
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
                    onClick: tt,
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
          jp,
          {
            open: y,
            onClose: () => k(!1),
            onCreate: Fe
          }
        ),
        /* @__PURE__ */ t(
          Op,
          {
            open: C,
            onClose: () => T(!1),
            onSelect: He
          }
        ),
        /* @__PURE__ */ t(
          Qe,
          {
            open: !!D,
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
                  onClick: Te,
                  className: I(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-danger text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: "Delete"
                }
              )
            ] }),
            children: ye && /* @__PURE__ */ o("p", { className: "m-0", children: [
              /* @__PURE__ */ o("strong", { children: [
                "“",
                ye.name,
                "”"
              ] }),
              " will be permanently removed. Run history will also be lost."
            ] })
          }
        ),
        /* @__PURE__ */ t(
          Qe,
          {
            open: M,
            onClose: () => re(!1),
            title: `Delete ${z.size} pipeline${z.size === 1 ? "" : "s"}?`,
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
                    z.size
                  ]
                }
              )
            ] }),
            children: /* @__PURE__ */ o("p", { className: "m-0", children: [
              /* @__PURE__ */ o("strong", { children: [
                z.size,
                " pipeline",
                z.size === 1 ? "" : "s"
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
const Fp = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function Co(e, n, r) {
  const i = Fp[e], a = Math.max(0, n | 0), s = Math.max(0, r | 0);
  if (!i)
    return {
      inputTokens: a,
      outputTokens: s,
      inputCostUsd: 0,
      outputCostUsd: 0,
      totalCostUsd: 0,
      model: e,
      modelFound: !1
    };
  const d = a / 1e6 * i.inputPerMillion, c = s / 1e6 * i.outputPerMillion;
  return {
    inputTokens: a,
    outputTokens: s,
    inputCostUsd: d,
    outputCostUsd: c,
    totalCostUsd: d + c,
    model: e,
    modelFound: !0
  };
}
function vt(e) {
  const n = {};
  let r = 0, i = 0, a = 0, s = 0, d = !1;
  for (const l of e) {
    if (!l.model) continue;
    const p = l.tokensIn ?? 0, u = l.tokensOut ?? 0, f = Co(l.model, p, u), h = n[l.model];
    h ? n[l.model] = {
      inputTokens: h.inputTokens + f.inputTokens,
      outputTokens: h.outputTokens + f.outputTokens,
      inputCostUsd: h.inputCostUsd + f.inputCostUsd,
      outputCostUsd: h.outputCostUsd + f.outputCostUsd,
      totalCostUsd: h.totalCostUsd + f.totalCostUsd,
      model: l.model,
      modelFound: h.modelFound || f.modelFound
    } : n[l.model] = f, r += f.inputTokens, i += f.outputTokens, a += f.inputCostUsd, s += f.outputCostUsd, f.modelFound && (d = !0);
  }
  return { total: {
    inputTokens: r,
    outputTokens: i,
    inputCostUsd: a,
    outputCostUsd: s,
    totalCostUsd: a + s,
    model: "aggregate",
    modelFound: d
  }, perModel: n };
}
function _t(e) {
  return !e || !e.modelFound && e.totalCostUsd === 0 ? "—" : e.totalCostUsd >= 0.01 ? `$${e.totalCostUsd.toFixed(2)}` : e.totalCostUsd === 0 ? "$0.00" : `$${e.totalCostUsd.toFixed(4)}`;
}
function zp(e) {
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
function Io(e, n) {
  let r = 0;
  if (e.llm) {
    const a = n.get(e.nodeId);
    a && (r += Co(a, e.llm.tokensIn, e.llm.tokensOut).totalCostUsd);
  }
  const i = e.costUsd;
  return typeof i == "number" && Number.isFinite(i) && i > 0 && (r += i), r;
}
function qp(e, n) {
  if (!n) return [];
  const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    l.data.type === "llm" && r.set(l.id, l.data.model), i.set(l.id, zp(l)), a.set(l.id, l.data.type);
  const s = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    s.set(l.id, 0), d.set(l.id, 0);
  for (const l of e)
    for (const p of Object.values(l.steps ?? {})) {
      if (!i.has(p.nodeId)) continue;
      const u = Io(p, r);
      s.set(p.nodeId, (s.get(p.nodeId) ?? 0) + u), d.set(p.nodeId, (d.get(p.nodeId) ?? 0) + 1);
    }
  const c = n.nodes.map((l) => ({
    nodeId: l.id,
    label: i.get(l.id) ?? l.id,
    type: a.get(l.id) ?? l.type,
    totalCostUsd: s.get(l.id) ?? 0,
    stepCount: d.get(l.id) ?? 0
  }));
  return c.sort((l, p) => p.totalCostUsd - l.totalCostUsd), c;
}
function Wp(e) {
  return e.slice(0, 10);
}
function Vp(e) {
  return Date.UTC(
    Number(e.slice(0, 4)),
    Number(e.slice(5, 7)) - 1,
    Number(e.slice(8, 10))
  );
}
function Kp(e, n, r = 30, i = /* @__PURE__ */ new Date()) {
  const a = /* @__PURE__ */ new Map();
  if (n)
    for (const u of n.nodes)
      u.data.type === "llm" && a.set(u.id, u.data.model);
  const s = Date.UTC(
    i.getUTCFullYear(),
    i.getUTCMonth(),
    i.getUTCDate()
  ), d = s - (r - 1) * 864e5, c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  for (let u = d; u <= s; u += 864e5) {
    const f = new Date(u).toISOString().slice(0, 10);
    c.set(f, 0), l.set(f, 0);
  }
  for (const u of e) {
    const f = Wp(u.startedAt);
    if (!c.has(f)) continue;
    let h = 0;
    for (const g of Object.values(u.steps ?? {}))
      h += Io(g, a);
    c.set(f, (c.get(f) ?? 0) + h), l.set(f, (l.get(f) ?? 0) + 1);
  }
  const p = [];
  for (let u = d; u <= s; u += 864e5) {
    const f = new Date(u).toISOString().slice(0, 10);
    p.push({
      date: f,
      ts: Vp(f),
      totalCostUsd: c.get(f) ?? 0,
      runCount: l.get(f) ?? 0
    });
  }
  return p;
}
const So = [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
], To = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], $o = ["24h", "7d", "30d", "all"], Hp = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function Jp(e) {
  return e.startsWith("document.") || e === "document" ? "document" : e === "schedule" || e === "scheduled" ? "scheduled" : e === "webhook" ? "webhook" : "manual";
}
function Gp(e) {
  let n = 0;
  for (const r of Object.values(e.steps ?? {})) {
    const i = r.attempts?.length ?? 0;
    i > 1 && (n += i - 1);
  }
  return n;
}
function Ro(e, n) {
  const r = n.now ?? Date.now(), i = n.range === "all" ? null : r - Hp[n.range], a = n.query.trim().toLowerCase();
  return e.filter((s) => {
    if (n.statuses.size > 0 && !n.statuses.has(s.status)) return !1;
    if (n.triggerKinds.size > 0) {
      const d = Jp(s.triggeredBy.triggerType);
      if (!n.triggerKinds.has(d)) return !1;
    }
    if (i != null) {
      const d = new Date(s.startedAt).getTime();
      if (Number.isFinite(d) && d < i) return !1;
    }
    if (a.length > 0) {
      const d = s.id.toLowerCase().includes(a), c = s.pipelineId.toLowerCase().includes(a);
      if (!d && !c) return !1;
    }
    return !0;
  });
}
function Or(e, n) {
  if (!e) return /* @__PURE__ */ new Set();
  const r = new Set(n);
  return new Set(
    e.split(",").map((i) => i.trim()).filter((i) => r.has(i))
  );
}
function Ao(e) {
  const n = e.get("range") ?? "7d", r = $o.includes(n) ? n : "7d";
  return {
    query: e.get("q") ?? "",
    statuses: Or(e.get("status"), So),
    triggerKinds: Or(e.get("trigger"), To),
    range: r
  };
}
const Yp = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, Xp = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, Qp = {
  "24h": "Last 24h",
  "7d": "Last 7d",
  "30d": "Last 30d",
  all: "All time"
};
function _r({
  label: e,
  options: n,
  selected: r,
  onToggle: i,
  labels: a,
  testIdPrefix: s
}) {
  const [d, c] = S(!1), l = ce(null);
  ht(l, () => c(!1), d);
  const p = r.size === 0 ? "All" : r.size <= 2 ? Array.from(r).map((u) => a[u]).join(", ") : `${r.size} selected`;
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
            className: "flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer text-text-primary hover:bg-[#f1f5f9]",
            children: [
              /* @__PURE__ */ t(
                "input",
                {
                  type: "checkbox",
                  checked: r.has(u),
                  onChange: () => i(u),
                  className: "m-0 accent-primary"
                }
              ),
              a[u]
            ]
          },
          u
        ))
      }
    )
  ] });
}
function Po({
  query: e,
  statuses: n,
  triggerKinds: r,
  range: i,
  onQueryChange: a,
  onStatusToggle: s,
  onTriggerToggle: d,
  onRangeChange: c,
  onClearFilters: l
}) {
  const p = n.size > 0 || r.size > 0 || e.length > 0;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 bg-[#fafbfc] border border-border rounded-md",
      children: [
        /* @__PURE__ */ t(
          "input",
          {
            id: "runs-search",
            type: "search",
            "data-testid": "runs-search-input",
            placeholder: "Search…",
            value: e,
            onChange: (u) => a(u.target.value),
            className: "flex-[1_1_180px] max-w-[240px] px-2.5 py-[5px] text-xs border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
            "aria-label": "Search runs by run id or pipeline id"
          }
        ),
        /* @__PURE__ */ t("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: $o.map((u) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": i === u,
            "data-testid": `runs-range-${u}`,
            onClick: () => c(u),
            className: I(
              "px-2 py-1 text-[11px] border-none rounded-[3px] cursor-pointer font-[inherit]",
              i === u ? "font-semibold bg-primary text-white" : "font-medium bg-transparent text-text-secondary"
            ),
            children: Qp[u]
          },
          u
        )) }),
        /* @__PURE__ */ t("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ t(
          _r,
          {
            label: "Status",
            options: So,
            selected: n,
            onToggle: s,
            labels: Yp,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ t(
          _r,
          {
            label: "Trigger",
            options: To,
            selected: r,
            onToggle: d,
            labels: Xp,
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
function Zp({
  selectionCount: e,
  onExport: n,
  onDelete: r,
  onClear: i
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": "runs-bulk-toolbar",
      className: "flex items-center gap-2 px-3 py-2 bg-[#fafbfc] border border-border rounded-md",
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
            className: "px-2.5 py-1 text-xs font-medium border border-[#dc2626] bg-surface text-[#dc2626] rounded cursor-pointer font-[inherit]",
            children: "Delete"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "data-testid": "runs-bulk-clear",
            onClick: i,
            className: "px-2.5 py-1 text-xs bg-none border-none text-text-secondary cursor-pointer font-[inherit] ml-auto",
            children: "Clear selection"
          }
        )
      ]
    }
  );
}
function qn(e) {
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
function eu(e) {
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
const tu = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function nu(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function ru({
  filtered: e,
  selected: n,
  onSelectionChange: r,
  comparePair: i,
  onToggleComparePair: a,
  costByRunId: s,
  pipelineId: d,
  onNavigate: c,
  onOpenRetryModal: l
}) {
  const p = ce(!1), u = ce(null), f = e.length > 0 && e.every((m) => n.has(m.id)), h = !f && e.some((m) => n.has(m.id)), g = () => {
    const m = new Set(n);
    if (f)
      for (const v of e) m.delete(v.id);
    else
      for (const v of e) m.add(v.id);
    r(m);
  }, x = (m, v, w) => {
    const b = new Set(n), N = !b.has(m);
    if (w && u.current != null) {
      const y = Math.min(u.current, v), k = Math.max(u.current, v);
      for (let C = y; C <= k; C++) {
        const T = e[C];
        T && (N ? b.add(T.id) : b.delete(T.id));
      }
    } else N ? b.add(m) : b.delete(m);
    u.current = v, r(b);
  };
  return /* @__PURE__ */ o(
    "table",
    {
      className: "w-full border-collapse text-[13px] bg-surface border border-border rounded-lg overflow-hidden",
      children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { className: "bg-[#fafbfc] text-left", children: [
          /* @__PURE__ */ t(
            "th",
            {
              scope: "col",
              className: "px-3 py-2 w-6 border-b border-border",
              children: /* @__PURE__ */ t(
                "input",
                {
                  type: "checkbox",
                  "data-testid": "runs-select-all",
                  "aria-label": "Select all visible runs",
                  checked: f,
                  ref: (m) => {
                    m && (m.indeterminate = h);
                  },
                  onChange: g
                }
              )
            }
          ),
          ["Started", "Status", "Duration", "Retries", "Cost", "Triggered by", "Run ID", ""].map((m, v) => /* @__PURE__ */ t(
            "th",
            {
              scope: "col",
              className: "px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
              children: m
            },
            `${m}-${v}`
          ))
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: e.map((m, v) => {
          const { tone: w, label: b } = qn(m.status), N = n.has(m.id), y = Gp(m);
          return /* @__PURE__ */ o(
            "tr",
            {
              "data-testid": `run-card-${m.id}`,
              className: I(
                "border-b border-border cursor-pointer hover:bg-[#f1f5f9]",
                N && "bg-[#f1f5f9]"
              ),
              onClick: () => c(`/pipelines/${d}/runs/${m.id}`),
              children: [
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary w-6", onClick: (k) => k.stopPropagation(), children: [
                  /* @__PURE__ */ t(
                    "input",
                    {
                      type: "checkbox",
                      "data-testid": `run-select-${m.id}`,
                      checked: N,
                      onMouseDown: (k) => {
                        p.current = k.shiftKey;
                      },
                      onKeyDown: (k) => {
                        p.current = k.shiftKey;
                      },
                      onChange: () => {
                        const k = p.current;
                        p.current = !1, x(m.id, v, k);
                      },
                      "aria-label": `Select run ${m.id.slice(0, 8)}`
                    }
                  ),
                  /* @__PURE__ */ t(
                    "input",
                    {
                      type: "checkbox",
                      "data-testid": `run-compare-pick-${m.id}`,
                      checked: i.includes(m.id),
                      onChange: () => a(m.id),
                      "aria-label": `Pick run ${m.id.slice(0, 8)} for comparison`,
                      className: "absolute w-px h-px opacity-0 pointer-events-none",
                      tabIndex: -1
                    }
                  )
                ] }),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: nu(m.startedAt) }),
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: [
                  /* @__PURE__ */ t(le, { tone: w, "aria-label": `Status: ${b}`, children: b }),
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
                      tone: eu(m.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${m.id}`,
                      title: m.error.message,
                      className: "ml-1.5",
                      children: tu[m.error.errorCategory] ?? m.error.errorCategory
                    }
                  )
                ] }),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: Re(m.durationMs) }),
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
                            await Xo(m.pipelineId, m.id);
                          } catch (C) {
                            alert(`Force-fail failed: ${C instanceof Error ? C.message : String(C)}`);
                          }
                      },
                      title: "Force-fail this stuck run so you can retry from the stuck step",
                      className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-[#b45309] border border-[#fde68a] rounded cursor-pointer font-[inherit]",
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
                      className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-[#ea580c] border border-[#fed7aa] rounded cursor-pointer font-[inherit]",
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
function sh() {
  const { pipelineId: e } = ft(), n = Ve(), [r, i] = Jt(), [a, s] = S([]), [d, c] = S(null), [l, p] = S([]), [u, f] = S(() => /* @__PURE__ */ new Set()), [h, g] = S(null), [x, m] = S(!1), [v, w] = S(null), [b, N] = S(!1), y = E((_) => {
    const V = _.error?.nodeId;
    if (!V || V === "unknown") return;
    const K = Object.entries(_.steps).filter(([X, me]) => X !== V && me.status === "completed").map(([X]) => X);
    g({ run: _, nodeId: V, skippedNodes: K, snapshotInput: !1 }), w(null);
  }, []), k = E(async () => {
    if (h) {
      w(null), m(!0);
      try {
        const _ = await io(
          h.run.pipelineId,
          h.run.id,
          h.nodeId,
          void 0,
          h.snapshotInput || void 0
        );
        g(null), n(`/pipelines/${h.run.pipelineId}/runs/${_.newRunId}`);
      } catch (_) {
        w(_ instanceof Error ? _.message : String(_)), m(!1);
      }
    }
  }, [h, n]), { query: C, statuses: T, triggerKinds: D, range: P } = W(
    () => Ao(r),
    [r]
  ), M = (_, V) => {
    const K = new URLSearchParams(r);
    V ? K.set(_, V) : K.delete(_), i(K, { replace: !0 });
  }, re = (_) => {
    const V = new Set(T);
    V.has(_) ? V.delete(_) : V.add(_), M("status", V.size === 0 ? null : Array.from(V).join(","));
  }, R = (_) => {
    const V = new Set(D);
    V.has(_) ? V.delete(_) : V.add(_), M("trigger", V.size === 0 ? null : Array.from(V).join(","));
  }, J = (_) => {
    M("range", _ === "7d" ? null : _);
  }, Q = (_) => {
    M("q", _.length === 0 ? null : _);
  }, G = (_) => {
    p((V) => V.includes(_) ? V.filter((K) => K !== _) : V.length >= 2 ? [V[1], _] : [...V, _]);
  };
  oe(() => {
    e && (c(st(e)), s(qt(e)));
  }, [e]);
  const Z = W(
    () => Ro(a, { query: C, statuses: T, triggerKinds: D, range: P }),
    [a, C, T, D, P]
  ), O = W(() => {
    const _ = /* @__PURE__ */ new Map();
    if (!d) return _;
    for (const V of d.nodes)
      V.data.type === "llm" && _.set(V.id, V.data.model);
    return _;
  }, [d]), A = W(() => {
    const _ = {};
    for (const V of Z) {
      const K = Object.values(V.steps).filter((X) => !!X.llm).map((X) => ({
        model: O.get(X.nodeId),
        tokensIn: X.llm?.tokensIn ?? 0,
        tokensOut: X.llm?.tokensOut ?? 0
      }));
      _[V.id] = _t(vt(K).total);
    }
    return _;
  }, [Z, O]), Y = () => {
    if (!e) return;
    N(!1);
    const _ = Array.from(u), V = a.filter((K) => !u.has(K.id));
    ao(e);
    for (const K of [...V].sort((X, me) => X.startedAt.localeCompare(me.startedAt)))
      Qo(e, K);
    s(qt(e)), f(/* @__PURE__ */ new Set()), p((K) => K.filter((X) => !_.includes(X)));
  }, z = () => {
    const _ = a.filter((q) => u.has(q.id));
    if (_.length === 0) return;
    const V = new Blob([JSON.stringify(_, null, 2)], { type: "application/json" }), K = URL.createObjectURL(V), X = document.createElement("a"), me = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    X.href = K, X.download = `pipeline-runs-${me}.json`, document.body.appendChild(X), X.click(), document.body.removeChild(X), URL.revokeObjectURL(K);
  };
  return e ? d ? /* @__PURE__ */ o("div", { "data-testid": "pipeline-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ t(
      Vt,
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
            /* @__PURE__ */ t("code", { className: "bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs", children: h.run.id.slice(0, 8) }),
            " will restart from step",
            " ",
            /* @__PURE__ */ o("code", { className: "bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs", children: [
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
            /* @__PURE__ */ t("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: h.skippedNodes.map((_) => /* @__PURE__ */ t("span", { className: "bg-[#fafbfc] border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary", children: _.slice(0, 10) }, _)) })
          ] }),
          /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
            /* @__PURE__ */ t("input", { type: "checkbox", checked: h.snapshotInput, onChange: (_) => g((V) => V && { ...V, snapshotInput: _.target.checked }), className: "accent-primary" }),
            "Use persisted input snapshot"
          ] }),
          v && /* @__PURE__ */ t("div", { "data-testid": "retry-modal-error", className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: v })
        ] })
      }
    ),
    /* @__PURE__ */ t(
      Vt,
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
    v && /* @__PURE__ */ t(ot, { title: "Retry failed:", onDismiss: () => w(null), children: v }),
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
        a.length,
        " run",
        a.length === 1 ? "" : "s",
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
            const [_, V] = l;
            n(`/pipelines/${e}/runs/compare/${_}/${V}`);
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
      Po,
      {
        query: C,
        statuses: T,
        triggerKinds: D,
        range: P,
        onQueryChange: Q,
        onStatusToggle: re,
        onTriggerToggle: R,
        onRangeChange: J,
        onClearFilters: () => {
          Q(""), M("status", null), M("trigger", null);
        }
      }
    ),
    u.size > 0 && /* @__PURE__ */ t(
      Zp,
      {
        selectionCount: u.size,
        onExport: z,
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
        title: a.length === 0 ? "No runs yet" : "No runs match these filters",
        body: a.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
      }
    ) : /* @__PURE__ */ t(
      ru,
      {
        filtered: Z,
        selected: u,
        onSelectionChange: f,
        comparePair: l,
        onToggleComparePair: G,
        costByRunId: A,
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
  ) }) : /* @__PURE__ */ t(gt, { to: "/pipelines", replace: !0 });
}
function ou(e) {
  return W(() => {
    if (!e) return null;
    const n = st(e.pipelineId);
    if (!n) return null;
    const r = /* @__PURE__ */ new Map();
    for (const a of n.nodes)
      a.data.type === "llm" && r.set(a.id, a.data.model);
    const i = Object.values(e.steps).filter((a) => !!a.llm).map((a) => ({
      model: r.get(a.nodeId),
      tokensIn: a.llm?.tokensIn ?? 0,
      tokensOut: a.llm?.tokensOut ?? 0
    }));
    return vt(i).total;
  }, [e]);
}
function rt({ title: e, children: n }) {
  return /* @__PURE__ */ o("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ t("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: e }),
    n
  ] });
}
const Lr = "m-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", Br = "px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", yn = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", _e = "px-2 py-[5px] text-[11px] text-text-secondary align-top", au = {
  "#2563eb": "bg-info/10 text-info-fg",
  "#7c3aed": "bg-accent/10 text-accent-fg",
  "#16a34a": "bg-success/10 text-success-fg",
  "#dc2626": "bg-danger/10 text-danger-fg"
};
function Tt(e) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${au[e] ?? ""}`.trimEnd();
}
const iu = {
  completed: "#16a34a",
  failed: "#dc2626",
  running: "#2563eb"
};
function su({ stepId: e, step: n, index: r, nodeType: i, nodeConfig: a, onRetryFromStep: s, onResumeFromStep: d }) {
  const [c, l] = S(!1), p = n.output, u = p?.response, f = n.llm, h = n.input, g = iu[n.status] ?? "#94a3b8";
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
          c ? "bg-[#fafbfc] rounded-t-lg" : "bg-surface rounded-lg"
        ),
        style: {
          border: `1px solid ${c ? g + "40" : "#e2e8f0"}`,
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
            i
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
          /* @__PURE__ */ t(rt, { title: "Execution Timeline", children: /* @__PURE__ */ o("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ t("th", { scope: "col", className: yn, children: "Event" }),
              /* @__PURE__ */ t("th", { scope: "col", className: yn, children: "Time" }),
              /* @__PURE__ */ t("th", { scope: "col", className: yn, children: "Detail" })
            ] }) }),
            /* @__PURE__ */ o("tbody", { children: [
              n.startedAt && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: _e, children: /* @__PURE__ */ t("span", { className: Tt("#2563eb"), children: "started" }) }),
                /* @__PURE__ */ t("td", { className: _e, children: new Date(n.startedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: _e, children: [
                  "Node ",
                  e.slice(0, 8),
                  " (",
                  i,
                  ") began execution"
                ] })
              ] }),
              f?.streamOpened && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: _e, children: /* @__PURE__ */ t("span", { className: Tt("#7c3aed"), children: "stream.opened" }) }),
                /* @__PURE__ */ t("td", { className: _e, children: "—" }),
                /* @__PURE__ */ t("td", { className: _e, children: "LLM stream connection established" })
              ] }),
              f?.firstTokenLatencyMs != null && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: _e, children: /* @__PURE__ */ t("span", { className: Tt("#7c3aed"), children: "first.token" }) }),
                /* @__PURE__ */ o("td", { className: _e, children: [
                  "+",
                  f.firstTokenLatencyMs,
                  "ms"
                ] }),
                /* @__PURE__ */ t("td", { className: _e, children: "First token received from LLM" })
              ] }),
              n.completedAt && n.status === "completed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: _e, children: /* @__PURE__ */ t("span", { className: Tt("#16a34a"), children: "completed" }) }),
                /* @__PURE__ */ t("td", { className: _e, children: new Date(n.completedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: _e, children: [
                  "Finished in ",
                  n.durationMs != null ? n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` : "—"
                ] })
              ] }),
              n.status === "failed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: _e, children: /* @__PURE__ */ t("span", { className: Tt("#dc2626"), children: "failed" }) }),
                /* @__PURE__ */ t("td", { className: _e, children: n.completedAt ? new Date(n.completedAt).toLocaleTimeString() : "—" }),
                /* @__PURE__ */ t("td", { className: _e, children: n.error ?? "Unknown error" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ t(rt, { title: "Node Configuration", children: a && Object.keys(a).length > 1 ? /* @__PURE__ */ t("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(a).filter(([x]) => x !== "type").map(([x, m]) => /* @__PURE__ */ o(Zr.Fragment, { children: [
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
          h && Object.keys(h).length > 0 && /* @__PURE__ */ t(rt, { title: "Runtime Input", children: /* @__PURE__ */ t("pre", { className: Lr, children: JSON.stringify(h, null, 2) }) }),
          f?.prompt && /* @__PURE__ */ t(rt, { title: "Resolved Prompt", children: /* @__PURE__ */ t("div", { className: Br, children: f.prompt }) }),
          u || f?.response ? /* @__PURE__ */ t(rt, { title: "Response", children: /* @__PURE__ */ t("div", { className: Br, children: u ?? f?.response }) }) : /* @__PURE__ */ t(rt, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ t("pre", { className: Lr, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
          (f || p?.tokensIn != null) && /* @__PURE__ */ t(rt, { title: "Token Usage", children: /* @__PURE__ */ o("div", { className: "flex gap-5 flex-wrap text-xs text-text-secondary", children: [
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
          n.error && /* @__PURE__ */ t(rt, { title: "Error", children: /* @__PURE__ */ t("div", { className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap", children: n.error }) }),
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
function lu({ steps: e, nodeDataMap: n, edges: r, onRetryFromStep: i, onResumeFromStep: a }) {
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
    function v(y) {
      const k = [];
      let C = y;
      for (; C; ) {
        const T = l.find(([J]) => p(J) === C && !m.has(J));
        if (!T) break;
        const [D, P] = T;
        m.add(D);
        const M = { stepId: D, step: P, children: [] }, re = p(D);
        if (f.has(re)) {
          const J = g.filter((Q) => Q.forkId === re);
          for (const { branch: Q, targetNodeId: G } of J) {
            const Z = v(G);
            for (const O of Z)
              O.branch = O.branch ?? Q;
            Z.length > 0 && (Z[0].branch = Q, M.children.push(...Z));
          }
        }
        k.push(M);
        const R = x.get(re)?.filter((J) => J.handle === "out");
        C = R && R.length === 1 ? R[0].target : null;
      }
      return k;
    }
    const w = /* @__PURE__ */ new Set();
    for (const y of r)
      w.add(y.target);
    const b = l.find(([y]) => !w.has(p(y)))?.[1] ? l.find(([y]) => !w.has(p(y)))[0] : l[0]?.[0];
    let N = [];
    b && (N = v(p(b)));
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
      return /* @__PURE__ */ o(Zr.Fragment, { children: [
        /* @__PURE__ */ t(
          su,
          {
            stepId: f.stepId,
            step: f.step,
            index: h,
            nodeType: d(f.stepId)?.type ?? "unknown",
            nodeConfig: d(f.stepId)?.data,
            onRetryFromStep: i,
            onResumeFromStep: a
          }
        ),
        f.children.length > 0 && /* @__PURE__ */ t("div", { className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1", children: Array.from(g.entries()).map(([x, m], v) => /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("div", { className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${v === 0 ? "mt-1" : "mt-2"}`, children: x.replace("-", " ") }),
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
const cu = 5e3, du = "synthetic-";
function pu(e) {
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
function An(e, n) {
  return n.timestamp.localeCompare(e.timestamp);
}
function uu(e, n) {
  if (n.length === 0) return e.slice().sort(An);
  const r = new Set(e.map((s) => s.auditId)), i = /* @__PURE__ */ new Map();
  for (const s of e) {
    const d = i.get(s.action);
    (!d || s.timestamp > d) && i.set(s.action, s.timestamp);
  }
  const a = n.filter((s) => {
    if (r.has(s.auditId)) return !1;
    const d = i.get(s.action);
    return !d || s.timestamp >= d;
  });
  return [...e, ...a].sort(An);
}
function mu(e, n, r = {}) {
  const { pollMs: i = cu, filters: a } = r, s = ha(), [d, c] = S([]), [l, p] = S([]), [u, f] = S(!0), [h, g] = S(null), [x, m] = S(void 0), [v, w] = S(0), [b, N] = S(!1), y = JSON.stringify({
    since: a?.since,
    until: a?.until,
    actions: a?.actions,
    limit: a?.limit
  });
  oe(() => {
    if (!e || !n) return;
    let P = !1;
    return f(!0), g(null), (async () => {
      try {
        const M = await Jn(e, n, a ?? {});
        if (P) return;
        c(M.items), m(M.nextCursor), f(!1);
      } catch (M) {
        if (P) return;
        g(M instanceof Error ? M.message : String(M)), f(!1);
      }
    })(), () => {
      P = !0;
    };
  }, [e, n, y, v]), oe(() => {
    if (!e || !n || i <= 0) return;
    const P = window.setInterval(() => {
      w((M) => M + 1);
    }, i);
    return () => window.clearInterval(P);
  }, [e, n, i]), oe(() => {
    if (!e || !n) return;
    const P = [], M = (R, J) => {
      const Q = pu(R);
      if (!Q) return;
      const G = J;
      if (G.runId !== n) return;
      N(!0);
      const Z = {
        auditId: `${du}${R}-${G.stepId ?? "run"}-${Date.now()}`,
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
    for (const R of re)
      P.push(s.subscribe(R, (J) => M(R, J)));
    return P.push(s.subscribeToRun(n)), () => {
      for (const R of P) R();
    };
  }, [s, e, n]), oe(() => {
    d.length !== 0 && p((P) => {
      if (P.length === 0) return P;
      const M = /* @__PURE__ */ new Map();
      for (const re of d) {
        const R = M.get(re.action);
        (!R || re.timestamp > R) && M.set(re.action, re.timestamp);
      }
      return P.filter((re) => {
        const R = M.get(re.action);
        return !R || re.timestamp >= R;
      });
    });
  }, [d]);
  const k = ce(!1), C = E(() => {
    !e || !n || !x || k.current || (k.current = !0, (async () => {
      try {
        const P = await Jn(e, n, {
          ...a ?? {},
          cursor: x
        });
        c((M) => {
          const re = new Set(M.map((J) => J.auditId)), R = M.concat(P.items.filter((J) => !re.has(J.auditId)));
          return R.sort(An), R;
        }), m(P.nextCursor);
      } catch (P) {
        g(P instanceof Error ? P.message : String(P));
      } finally {
        k.current = !1;
      }
    })());
  }, [e, n, x, y]), T = E(() => {
    w((P) => P + 1);
  }, []);
  return {
    items: W(() => uu(d, l), [d, l]),
    loading: u,
    error: h,
    hasMore: !!x,
    loadMore: C,
    liveHealthy: b,
    refresh: T
  };
}
const hu = "#3b82f6", fu = "#eab308", gu = "#f97316", Ur = "#64748b", xu = "#ef4444", bu = "#a855f7";
function yu(e) {
  return e.action === "pipeline.step.failed" || e.outcome === "error" ? xu : e.action === "pipeline.run.resumed-from-step" || e.action.startsWith("pipeline.step.context.patched") ? bu : e.action.startsWith("pipeline.approval.") ? fu : e.action.startsWith("pipeline.breakpoint.") ? gu : e.action.startsWith("pipeline.step.") ? hu : (e.action.startsWith("pipeline.run."), Ur);
}
const vu = {
  "1h": "Last 1h",
  "24h": "Last 24h",
  all: "All"
}, jr = [
  { label: "Steps", matches: (e) => e.startsWith("pipeline.step.") },
  { label: "Approvals", matches: (e) => e.startsWith("pipeline.approval.") || e === "pipeline.approve" || e === "pipeline.reject" },
  { label: "Breakpoints", matches: (e) => e.startsWith("pipeline.breakpoint.") || e === "pipeline.step.breakpoint.hit" },
  { label: "Run lifecycle", matches: (e) => e.startsWith("pipeline.run.") || e === "pipeline.trigger" || e === "pipeline.cancel" },
  { label: "Errors", matches: (e) => e === "pipeline.step.failed" || e === "pipeline.run.failed" || e === "pipeline.force_fail" }
];
function wu(e) {
  if (e === "all") return null;
  const n = Date.now();
  return e === "1h" ? n - 3600 * 1e3 : n - 1440 * 60 * 1e3;
}
function Fr(e) {
  const n = e.details, r = e.trace, i = n && typeof n.stepId == "string" ? n.stepId : void 0, a = r && typeof r.stepId == "string" ? r.stepId : void 0, s = r && typeof r.nodeId == "string" ? r.nodeId : void 0;
  return i ?? a ?? s;
}
function Nu(e, n = Date.now()) {
  const r = Date.parse(e);
  if (!Number.isFinite(r)) return e;
  const i = Math.max(0, Math.floor((n - r) / 1e3));
  if (i < 5) return "just now";
  if (i < 60) return `${i}s ago`;
  const a = Math.floor(i / 60);
  if (a < 60) return `${a}m ago`;
  const s = Math.floor(a / 60);
  return s < 24 ? `${s}h ago` : `${Math.floor(s / 24)}d ago`;
}
function ku({
  pipelineId: e,
  runId: n,
  onStepClick: r
}) {
  const i = mu(e, n), { items: a, error: s, hasMore: d, loadMore: c, loading: l } = i, [p, u] = S(/* @__PURE__ */ new Set()), [f, h] = S(""), [g, x] = S("all"), [m, v] = S(/* @__PURE__ */ new Set()), w = E((C) => {
    u((T) => {
      const D = new Set(T);
      return D.has(C) ? D.delete(C) : D.add(C), D;
    });
  }, []), b = E((C) => {
    v((T) => {
      const D = new Set(T);
      return D.has(C) ? D.delete(C) : D.add(C), D;
    });
  }, []), N = W(() => {
    const C = wu(g), T = f.trim().toLowerCase(), D = jr.filter((P) => p.has(P.label));
    return a.filter((P) => {
      if (D.length > 0 && !D.some((M) => M.matches(P.action)) || T && !P.actorUserId.toLowerCase().includes(T)) return !1;
      if (C !== null) {
        const M = Date.parse(P.timestamp);
        if (!Number.isFinite(M) || M < C) return !1;
      }
      return !0;
    });
  }, [a, p, f, g]), y = E(() => {
    if (typeof window > "u") return;
    const C = N.map((M) => JSON.stringify(M)).join(`
`) + (N.length > 0 ? `
` : ""), T = new Blob([C], { type: "application/x-ndjson" }), D = URL.createObjectURL(T), P = document.createElement("a");
    P.href = D, P.download = `executor-log-${n}.ndjson`, document.body.appendChild(P), P.click(), document.body.removeChild(P), URL.revokeObjectURL(D);
  }, [N, n]), k = E(
    (C) => {
      if (b(C.auditId), !r || !C.action.startsWith("pipeline.step.")) return;
      const T = Fr(C);
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
        /* @__PURE__ */ o("div", { className: "sticky top-0 z-[2] flex flex-wrap items-center gap-2 px-3 py-2.5 bg-[#f8fafc] border-b border-border text-xs", children: [
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
                      s ? "bg-text-tertiary" : "bg-[#22c55e] [animation:executor-log-pulse_1.6s_ease-in-out_infinite]"
                    ),
                    "aria-hidden": !0
                  }
                ),
                "Live"
              ]
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-border", children: "|" }),
          jr.map((C) => {
            const T = p.has(C.label);
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  T ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => w(C.label),
                "data-testid": `executor-log-chip-${C.label.toLowerCase().replace(/\s+/g, "-")}`,
                "aria-pressed": T,
                children: C.label
              },
              C.label
            );
          }),
          /* @__PURE__ */ t("span", { className: "text-border", children: "|" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "text",
              value: f,
              onChange: (C) => h(C.target.value),
              placeholder: "Actor",
              className: "font-[inherit] text-xs px-2 py-1 border border-border-field rounded bg-surface text-text-primary min-w-[120px]",
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
                  T ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => x(C),
                "data-testid": `executor-log-time-${C}`,
                "aria-pressed": T,
                children: vu[C]
              },
              C
            );
          }),
          /* @__PURE__ */ t("div", { className: "flex-1" }),
          /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", children: [
            N.length,
            " of ",
            a.length,
            " shown"
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto px-4 py-3 relative", "data-testid": "executor-log-timeline", children: [
          l && a.length === 0 && /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary p-3", children: "Loading audit rows…" }),
          !l && a.length === 0 && /* @__PURE__ */ t(
            "div",
            {
              className: "px-3 py-6 text-[13px] text-text-secondary text-center leading-relaxed",
              "data-testid": "executor-log-empty",
              children: "Audit log started recording on 2026-05-07 (hub#2224). This run predates that — no rows captured."
            }
          ),
          N.length === 0 && a.length > 0 && /* @__PURE__ */ t(
            "div",
            {
              className: "px-3 py-5 text-xs text-text-tertiary text-center",
              "data-testid": "executor-log-no-matches",
              children: "No audit rows match the current filters."
            }
          ),
          N.map((C) => {
            const T = m.has(C.auditId), P = C.action.startsWith("pipeline.step.") ? Fr(C) : void 0;
            return /* @__PURE__ */ o(
              "div",
              {
                className: "grid grid-cols-[14px_auto_auto_1fr] items-baseline gap-2.5 py-1.5 text-xs border-b border-[#fafbfc] cursor-pointer",
                onClick: () => k(C),
                "data-testid": "executor-log-row",
                "data-action": C.action,
                "data-audit-id": C.auditId,
                children: [
                  /* @__PURE__ */ t(
                    "span",
                    {
                      className: "w-2.5 h-2.5 rounded-full shrink-0 self-center",
                      style: { background: yu(C) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ t(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: C.timestamp,
                      children: Nu(C.timestamp)
                    }
                  ),
                  /* @__PURE__ */ t("span", { className: "text-text-secondary text-[11px] whitespace-nowrap", children: C.actorUserId }),
                  /* @__PURE__ */ o("span", { className: "text-text-primary flex items-baseline gap-1.5 flex-wrap", children: [
                    /* @__PURE__ */ t("code", { className: "font-mono text-[11px] bg-[#fafbfc] px-1.5 py-px rounded-[3px]", children: C.action }),
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
                          C.outcome === "error" ? "text-[#b91c1c]" : "text-text-tertiary"
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
                      className: "col-[2/span_3] mt-1 p-2 bg-[#fafbfc] border border-border rounded text-[11px] font-mono text-text-secondary overflow-x-auto",
                      "data-testid": "executor-log-trace",
                      onClick: (M) => M.stopPropagation(),
                      children: JSON.stringify(C.trace, null, 2)
                    }
                  )
                ]
              },
              C.auditId
            );
          })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex justify-between items-center gap-2 px-3 py-2.5 border-t border-border bg-[#f8fafc]", children: [
          d ? /* @__PURE__ */ t("span", { "data-testid": "executor-log-load-more", children: /* @__PURE__ */ t(
            Ee,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => c(),
              children: "Load more"
            }
          ) }) : /* @__PURE__ */ t("span", {}),
          /* @__PURE__ */ t("span", { "data-testid": "executor-log-download", children: /* @__PURE__ */ t(
            Ee,
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
function lh() {
  const { pipelineId: e, runId: n } = ft();
  return !e || !n ? /* @__PURE__ */ t(gt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t(oo, { pipelineId: e, children: /* @__PURE__ */ t(Zo, { children: /* @__PURE__ */ t(Cu, { pipelineId: e, runId: n }) }) });
}
function Cu({ pipelineId: e, runId: n }) {
  const r = Ve(), i = Ke(), a = xt(), { definition: s } = i, [d, c] = S(null);
  oe(() => {
    let q = !1;
    return import("./usePendingApprovals-DB5-6o3z.js").then((de) => de.a3).then(({ getPipelineRun: de }) => {
      de(e, n).then((ke) => {
        !q && ke && c(ke);
      });
    }), () => {
      q = !0;
    };
  }, [e, n]);
  const l = W(() => {
    const q = a.runs[n], de = d;
    if (!q && !de) return;
    if (!q) return de ?? void 0;
    if (!de) return q;
    const ke = Object.keys(q.steps).length, Fe = Object.keys(de.steps).length;
    return ke >= Fe ? q : { ...de, status: q.status, currentStepIds: q.currentStepIds };
  }, [a.runs, n, d]);
  ea(n);
  const p = ou(l ?? null), u = W(() => {
    const q = {};
    if (!s) return q;
    for (const de of s.nodes)
      q[de.id] = { type: de.data.type, data: de.data };
    return q;
  }, [s]), [f, h] = S(!1), g = ce(null);
  ht(g, () => h(!1), f);
  const [x, m] = S("steps"), [v, w] = S(null), b = E((q) => {
    w(q), m("steps");
  }, []), [N, y] = S(null), [k, C] = S(null), [T, D] = S(!1), P = l?.status === "failed" ? l.error?.nodeId : void 0, M = E((q) => {
    if (!l) return;
    const de = Object.entries(l.steps).filter(([ke, Fe]) => ke !== q && Fe.status === "completed").map(([ke]) => ke);
    y({ nodeId: q, skippedNodes: de, snapshotInput: !1 }), C(null);
  }, [l]), re = E(async () => {
    if (!(!N || !l)) {
      C(null), D(!0);
      try {
        const q = await io(
          e,
          l.id,
          N.nodeId,
          void 0,
          N.snapshotInput || void 0
        );
        y(null), r(`/pipelines/${e}/runs/${q.newRunId}`);
      } catch (q) {
        C(q instanceof Error ? q.message : String(q)), D(!1);
      }
    }
  }, [N, l, e, r]), [R, J] = S(null), [Q, G] = S(null), [Z, O] = S(null), A = E(async (q) => {
    if (l) {
      G(null), J(q);
      try {
        const de = await ta(e, l.id, q);
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
        const q = await a.triggerRun(e);
        r(`/pipelines/${e}/runs/${q}`);
      } catch (q) {
        console.error("[PipelineRunReplay] re-run failed", q);
      }
      return;
    }
    try {
      const q = await a.triggerRun(
        e,
        l.triggeredBy.payload
      );
      r(`/pipelines/${e}/runs/${q}`);
    } catch (q) {
      console.error("[PipelineRunReplay] re-run failed", q);
    }
  }, [l, a, e, r]), z = async () => {
    h(!1);
    try {
      await navigator.clipboard?.writeText(n);
    } catch {
    }
  }, _ = () => {
    if (h(!1), !l) return;
    const q = JSON.stringify(l, null, 2);
    Rt(`run-${n}.json`, q);
  }, V = () => {
    if (h(!1), !s) return;
    const q = En(
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
              pt,
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
              Ee,
              {
                onClick: () => r(`/pipelines/${e}`),
                children: "Back to pipeline"
              }
            )
          ] })
        ]
      }
    );
  const K = qn(l.status), X = l.triggeredBy.userId ?? l.triggeredBy.triggerType, me = _t(p);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
      "data-testid": "pipeline-replay",
      children: [
        /* @__PURE__ */ o("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
          /* @__PURE__ */ t(
            pt,
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
                mt(l.startedAt),
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
            Ee,
            {
              onClick: () => M(P),
              disabled: T,
              "data-testid": "retry-from-failed-step-button",
              title: `Retry from "${P}" with the original upstream context`,
              children: "↻ Retry from failure"
            }
          ),
          /* @__PURE__ */ t(
            Ee,
            {
              onClick: Y,
              "data-testid": "rerun-button",
              title: "Re-run with the original trigger payload",
              children: "↻ Re-run"
            }
          ),
          /* @__PURE__ */ o("div", { className: "relative", ref: g, children: [
            /* @__PURE__ */ t(
              pt,
              {
                onClick: () => h((q) => !q),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            f ? /* @__PURE__ */ o("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: z, children: "Copy runId" }),
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: _, children: "Export run JSON" }),
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: V, children: "Open as new draft" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ t(
          Vt,
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
                  "input",
                  {
                    type: "checkbox",
                    checked: N.snapshotInput,
                    onChange: (q) => y((de) => de && { ...de, snapshotInput: q.target.checked }),
                    className: "accent-primary"
                  }
                ),
                "Use persisted input snapshot"
              ] }),
              k && /* @__PURE__ */ t("div", { "data-testid": "retry-modal-error", className: "py-2 px-3 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: k })
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
          k && /* @__PURE__ */ t(ot, { title: "Retry failed:", className: "mb-4", children: k }),
          Q && /* @__PURE__ */ t(ot, { title: "Resume failed:", className: "mb-4", "data-testid": "resume-error-banner", children: Q }),
          (l.replayAttempts ?? 0) > 0 && /* @__PURE__ */ t(
            ot,
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
                    mt(l.resumeHistory[l.resumeHistory.length - 1].at),
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
                      mt(q.at)
                    ] }, `${q.fromNodeId}-${q.at}-${de}`))
                  }
                )
              ] })
            }
          ),
          Z && /* @__PURE__ */ t(ot, { title: "Resumed", className: "mb-4", "data-testid": "resume-toast", children: Z }),
          l.error && /* @__PURE__ */ o(ot, { title: "Run failed:", className: "mb-4", children: [
            l.error.message,
            l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o("span", { className: "ml-2 text-[11px] text-[#b91c1c]", children: [
              "at node ",
              l.error.nodeId.slice(0, 8)
            ] }),
            l.status === "failed" && l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ t("div", { className: "mt-2", children: /* @__PURE__ */ t(
              Ee,
              {
                onClick: () => A(l.error.nodeId),
                disabled: R !== null,
                "data-testid": "resume-from-here-button",
                title: `Resume this run from "${l.error.nodeId}" using its accumulated upstream context`,
                children: R === l.error.nodeId ? "Resuming…" : "↻ Resume from here"
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
              lu,
              {
                steps: l.steps,
                nodeDataMap: u,
                edges: s?.edges,
                onRetryFromStep: M,
                onResumeFromStep: l.status === "failed" ? A : void 0
              }
            )
          ) : /* @__PURE__ */ t("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ t(
            ku,
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
function Iu(e) {
  return e == null ? "—" : `${e > 0 ? "+" : (e < 0, "")}${Re(Math.abs(e))}`.replace(/^(\+|-)?/, e === 0 ? "" : e > 0 ? "+" : "-");
}
function Su(e) {
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
function Tu(e, n) {
  if (!e) return n;
  const r = e.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function $u(e, n) {
  if (!e) return !1;
  const r = e.nodes.find((i) => i.id === n);
  return !!r && r.data.type === "condition";
}
function zr(e) {
  if (!e) return;
  const n = e.output;
  if (n && typeof n == "object" && "result" in n)
    return n.result ? "true" : "false";
}
function Ru(e, n) {
  const r = (h) => h.split(/(\s+)/).filter((g) => g.length > 0), i = r(e), a = r(n), s = i.length, d = a.length, c = Array.from({ length: s + 1 }, () => new Array(d + 1).fill(0));
  for (let h = s - 1; h >= 0; h--)
    for (let g = d - 1; g >= 0; g--)
      i[h] === a[g] ? c[h][g] = c[h + 1][g + 1] + 1 : c[h][g] = Math.max(c[h + 1][g], c[h][g + 1]);
  const l = [], p = (h, g) => {
    const x = l[l.length - 1];
    x && x.type === h ? x.text += g : l.push({ type: h, text: g });
  };
  let u = 0, f = 0;
  for (; u < s && f < d; )
    i[u] === a[f] ? (p("eq", i[u]), u++, f++) : c[u + 1][f] >= c[u][f + 1] ? (p("del", i[u]), u++) : (p("add", a[f]), f++);
  for (; u < s; )
    p("del", i[u++]);
  for (; f < d; )
    p("add", a[f++]);
  return l;
}
function Au(e, n, r) {
  const i = /* @__PURE__ */ new Set(), a = [];
  if (r)
    for (const s of r.nodes)
      (e.steps[s.id] || n.steps[s.id]) && (a.push(s.id), i.add(s.id));
  for (const s of [...Object.keys(e.steps), ...Object.keys(n.steps)])
    i.has(s) || (a.push(s), i.add(s));
  return a.map((s) => {
    const d = e.steps[s], c = n.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, f = !!d && !!c && d.status !== c.status;
    let h = !1;
    l != null && p != null && l > 0 && (h = Math.abs(p - l) / l > 0.5);
    const g = $u(r, s), x = g ? zr(d) : void 0, m = g ? zr(c) : void 0, v = g && x !== void 0 && m !== void 0 && x !== m;
    return {
      nodeId: s,
      name: Tu(r, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: f,
      durationLarge: h,
      branchDiffers: v,
      isLlm: !!(d?.llm || c?.llm),
      isCondition: g,
      branchA: x,
      branchB: m
    };
  });
}
function Pu(e) {
  if (e.statusDiffers) return "bg-[#fef2f2]";
  if (e.branchDiffers) return "bg-[#eff6ff]";
  if (e.durationLarge) return "bg-[#fffbeb]";
}
function qr({
  step: e,
  branch: n,
  isCondition: r
}) {
  if (!e)
    return /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" });
  const i = Su(e.status);
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ t(le, { tone: i, children: e.status }),
      /* @__PURE__ */ t("span", { className: "font-mono text-text-secondary", children: Re(e.durationMs) }),
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
    e.error ? /* @__PURE__ */ t("div", { className: "text-[11px] text-[#dc2626]", title: e.error, children: e.error.length > 60 ? `${e.error.slice(0, 60)}…` : e.error }) : null
  ] });
}
function Mu({ a: e, b: n }) {
  const r = W(() => Ru(e, n), [e, n]);
  return /* @__PURE__ */ t(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: r.map((i, a) => i.type === "eq" ? /* @__PURE__ */ t("span", { children: i.text }, a) : i.type === "add" ? /* @__PURE__ */ t("span", { "data-diff": "add", className: "bg-[#dcfce7] text-[#166534]", children: i.text }, a) : /* @__PURE__ */ t("span", { "data-diff": "del", className: "bg-[#fee2e2] text-[#991b1b] line-through", children: i.text }, a))
    }
  );
}
function Du({ row: e }) {
  const n = e.a?.llm, r = e.b?.llm, i = n && r ? r.tokensIn + r.tokensOut - (n.tokensIn + n.tokensOut) : void 0, a = Pu(e);
  return /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ o("tr", { "data-testid": `run-compare-row-${e.nodeId}`, className: a, children: [
      /* @__PURE__ */ o("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a), children: [
        /* @__PURE__ */ t("div", { className: "font-semibold text-text-primary", children: e.name }),
        /* @__PURE__ */ t("div", { className: "font-mono text-[11px] text-text-tertiary", children: e.nodeId })
      ] }),
      /* @__PURE__ */ t("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a), children: /* @__PURE__ */ t(qr, { step: e.a, branch: e.branchA, isCondition: e.isCondition }) }),
      /* @__PURE__ */ t("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a), children: /* @__PURE__ */ t(qr, { step: e.b, branch: e.branchB, isCondition: e.isCondition }) }),
      /* @__PURE__ */ o(
        "td",
        {
          className: I("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", a),
          "data-testid": `run-compare-delta-${e.nodeId}`,
          children: [
            e.branchDiffers ? /* @__PURE__ */ t("span", { className: "font-semibold text-[#2563eb]", children: "different branch!" }) : e.statusDiffers ? /* @__PURE__ */ t("span", { className: "font-semibold text-[#dc2626]", children: "status differs" }) : e.durationDelta != null ? /* @__PURE__ */ t("span", { className: e.durationLarge ? "text-[#d97706]" : "text-text-secondary", children: Iu(e.durationDelta) }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "—" }),
            i != null && i !== 0 ? /* @__PURE__ */ o("div", { className: "mt-0.5 text-[11px] text-text-tertiary", children: [
              i > 0 ? "+" : "",
              i,
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
          Mu,
          {
            a: n?.response ?? "",
            b: r?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function Eu({ runA: e, runB: n, def: r }) {
  const i = W(() => Au(e, n, r), [e, n, r]);
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
        /* @__PURE__ */ t("tbody", { children: i.map((a) => /* @__PURE__ */ t(Du, { row: a }, a.nodeId)) })
      ]
    }
  );
}
function Ou(e) {
  return e == null ? "—" : `${e > 0 ? "+" : (e < 0, "")}${Re(Math.abs(e))}`.replace(/^(\+|-)?/, e === 0 ? "" : e > 0 ? "+" : "-");
}
function _u(e) {
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
function Lu(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Wr(e, n) {
  const r = Object.values(e.steps).filter((i) => !!i.llm).map((i) => ({
    model: n.get(i.nodeId),
    tokensIn: i.llm?.tokensIn ?? 0,
    tokensOut: i.llm?.tokensOut ?? 0
  }));
  return _t(vt(r).total);
}
function Vr({
  label: e,
  run: n,
  cost: r,
  testIdPrefix: i
}) {
  const a = _u(n.status);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
      "data-testid": `${i}-summary`,
      children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: e }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-tertiary", children: n.id.slice(0, 8) }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "text-text-secondary", children: mt(n.startedAt) })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t(le, { tone: a, children: n.status }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono", children: Re(n.durationMs) }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono", "data-testid": `${i}-cost`, children: r })
        ] })
      ]
    }
  );
}
function ch() {
  const { pipelineId: e, runIdA: n, runIdB: r } = ft(), i = Ve(), a = W(
    () => e ? st(e) : null,
    [e]
  ), s = W(
    () => e && n ? Wt(e, n) : null,
    [e, n]
  ), d = W(
    () => e && r ? Wt(e, r) : null,
    [e, r]
  ), c = W(() => Lu(a), [a]);
  if (!e || !n || !r)
    return /* @__PURE__ */ t(gt, { to: "/pipelines", replace: !0 });
  if (!a)
    return /* @__PURE__ */ t("div", { className: "p-8", children: /* @__PURE__ */ t(
      qe,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => i("/pipelines")
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
        onAction: () => i(`/pipelines/${e}/runs`)
      }
    ) });
  const l = (d.durationMs ?? 0) - (s.durationMs ?? 0), p = Wr(s, c), u = Wr(d, c), f = (/* @__PURE__ */ new Set([
    ...Object.keys(s.steps),
    ...Object.keys(d.steps)
  ])).size;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-4 p-6 text-text-primary", "data-testid": "run-compare", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => i(`/pipelines/${e}/runs`),
          className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
          children: [
            "← ",
            a.name
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
      /* @__PURE__ */ t(Vr, { label: "Run A", run: s, cost: p, testIdPrefix: "run-a" }),
      /* @__PURE__ */ t(Vr, { label: "Run B", run: d, cost: u, testIdPrefix: "run-b" })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
        "data-testid": "run-compare-delta",
        children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Δ duration" }),
          /* @__PURE__ */ t("span", { className: "font-mono text-[13px]", children: Ou(l) }),
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
    /* @__PURE__ */ t(Eu, { runA: s, runB: d, def: a })
  ] });
}
function Bu(e) {
  return e === 0 ? "0ms" : `${e > 0 ? "+" : "-"}${Re(Math.abs(e))}`;
}
function Kr(e) {
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
function Uu({
  runA: e,
  runB: n,
  costA: r,
  costB: i
}) {
  const a = e.durationMs ?? 0, d = (n.durationMs ?? 0) - a;
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
              /* @__PURE__ */ t(le, { tone: Kr(e.status), children: e.status })
            ] }),
            /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary", children: mt(e.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              Re(e.durationMs),
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
              /* @__PURE__ */ t(le, { tone: Kr(n.status), children: n.status })
            ] }),
            /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary", children: mt(n.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              Re(n.durationMs),
              " | ",
              i
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
                d === 0 ? "text-text-secondary" : d < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
              ),
              children: Bu(d)
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
function ju(e) {
  return e === 0 ? "0ms" : `${e > 0 ? "+" : "-"}${Re(Math.abs(e))}`;
}
function Hr(e) {
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
function Fu(e, n) {
  if (!e) return n;
  const r = e.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function zu(e, n, r) {
  const i = /* @__PURE__ */ new Set(), a = [];
  if (r)
    for (const s of r.nodes)
      (e.steps[s.id] || n.steps[s.id]) && (a.push(s.id), i.add(s.id));
  for (const s of [...Object.keys(e.steps), ...Object.keys(n.steps)])
    i.has(s) || (a.push(s), i.add(s));
  return a.map((s) => {
    const d = e.steps[s], c = n.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, f = !!d && !!c && d.status !== c.status, h = !!d && !c, g = !d && !!c, x = d?.llm ? d.llm.tokensIn + d.llm.tokensOut : void 0, m = c?.llm ? c.llm.tokensIn + c.llm.tokensOut : void 0, v = x != null && m != null ? m - x : void 0;
    return {
      nodeId: s,
      name: Fu(r, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: f,
      onlyInA: h,
      onlyInB: g,
      tokenDelta: v
    };
  });
}
function qu({ runA: e, runB: n, def: r }) {
  const i = W(() => zu(e, n, r), [e, n, r]);
  return /* @__PURE__ */ o("table", { className: "w-full border-collapse text-[13px]", children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Step" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run A" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run B" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Delta" })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: i.map((a) => /* @__PURE__ */ o(
      "tr",
      {
        className: I(
          a.onlyInA || a.onlyInB ? "bg-[#fefce8]" : a.statusDiffers ? "bg-[#fef2f2]" : void 0
        ),
        "data-testid": `diff-step-row-${a.nodeId}`,
        children: [
          /* @__PURE__ */ o("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: [
            /* @__PURE__ */ t("div", { className: "font-semibold", children: a.name }),
            /* @__PURE__ */ t("div", { className: "font-mono text-[10px] text-text-tertiary", children: a.nodeId }),
            a.onlyInA && /* @__PURE__ */ t(le, { tone: "warning", size: "xs", children: "only in A" }),
            a.onlyInB && /* @__PURE__ */ t(le, { tone: "warning", size: "xs", children: "only in B" })
          ] }),
          /* @__PURE__ */ t("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: a.a ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ t(le, { tone: Hr(a.a.status), children: a.a.status }),
            /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: Re(a.a.durationMs) }),
            a.a.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              a.a.llm.tokensIn,
              " in / ",
              a.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ t("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: a.b ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ t(le, { tone: Hr(a.b.status), children: a.b.status }),
            /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: Re(a.b.durationMs) }),
            a.b.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              a.b.llm.tokensIn,
              " in / ",
              a.b.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ o("td", { className: "border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", children: [
            a.statusDiffers && /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-[#dc2626]", children: "status differs" }),
            a.durationDelta != null && /* @__PURE__ */ t(
              "div",
              {
                className: I(
                  "text-xs",
                  a.durationDelta === 0 ? "text-text-tertiary" : a.durationDelta < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
                ),
                children: ju(a.durationDelta)
              }
            ),
            a.tokenDelta != null && a.tokenDelta !== 0 && /* @__PURE__ */ o(
              "div",
              {
                className: I(
                  "mt-0.5 text-[10px]",
                  a.tokenDelta < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
                ),
                children: [
                  a.tokenDelta > 0 ? "+" : "",
                  a.tokenDelta,
                  " tok"
                ]
              }
            ),
            a.durationDelta == null && !a.statusDiffers && /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "--" })
          ] })
        ]
      },
      a.nodeId
    )) })
  ] });
}
function Wu(e, n) {
  if (!e) return n;
  const r = e.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Kt(e, n = "", r = 0) {
  const i = /* @__PURE__ */ new Map();
  if (r > 6 || e == null)
    return i.set(n || "(root)", String(e)), i;
  if (typeof e != "object")
    return i.set(n || "(root)", JSON.stringify(e)), i;
  if (Array.isArray(e)) {
    if (e.length === 0)
      i.set(n || "(root)", "[]");
    else
      for (let s = 0; s < e.length; s++) {
        const d = n ? `${n}.${s}` : String(s);
        for (const [c, l] of Kt(e[s], d, r + 1))
          i.set(c, l);
      }
    return i;
  }
  const a = Object.entries(e);
  if (a.length === 0)
    i.set(n || "(root)", "{}");
  else
    for (const [s, d] of a) {
      const c = n ? `${n}.${s}` : s;
      for (const [l, p] of Kt(d, c, r + 1))
        i.set(l, p);
    }
  return i;
}
function Mo(e, n) {
  const r = Kt(e), i = Kt(n), a = /* @__PURE__ */ new Set([...r.keys(), ...i.keys()]), s = [];
  for (const c of a) {
    const l = r.get(c), p = i.get(c);
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
const Vu = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function Ku({
  nodeId: e,
  name: n,
  outputA: r,
  outputB: i
}) {
  const [a, s] = S(!1), d = W(() => Mo(r, i), [r, i]), c = d.filter((l) => l.type !== "unchanged").length;
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
            onClick: () => s(!a),
            children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: a ? "▼" : "▶" }),
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
        a && /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5 px-3 py-2", children: d.filter((l) => l.type !== "unchanged").map((l, p) => /* @__PURE__ */ o(
          "div",
          {
            className: I(
              "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
              Vu[l.type]
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
function Hu({ runA: e, runB: n, def: r }) {
  const i = W(() => {
    const a = /* @__PURE__ */ new Set(), s = [];
    if (r)
      for (const d of r.nodes) {
        const c = e.steps[d.id]?.output != null, l = n.steps[d.id]?.output != null;
        (c || l) && (s.push(d.id), a.add(d.id));
      }
    for (const d of [...Object.keys(e.steps), ...Object.keys(n.steps)]) {
      if (a.has(d)) continue;
      const c = e.steps[d]?.output != null, l = n.steps[d]?.output != null;
      (c || l) && (s.push(d), a.add(d));
    }
    return s;
  }, [e, n, r]);
  return i.length === 0 ? /* @__PURE__ */ t("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "No step outputs to compare." }) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-3", children: i.map((a) => /* @__PURE__ */ t(
    Ku,
    {
      nodeId: a,
      name: Wu(r, a),
      outputA: e.steps[a]?.output,
      outputB: n.steps[a]?.output
    },
    a
  )) });
}
function Ju(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Jr(e, n) {
  const r = Object.values(e.steps).filter((i) => !!i.llm).map((i) => ({
    model: n.get(i.nodeId),
    tokensIn: i.llm?.tokensIn ?? 0,
    tokensOut: i.llm?.tokensOut ?? 0
  }));
  return _t(vt(r).total);
}
function zt({
  title: e,
  defaultOpen: n = !0,
  badge: r,
  children: i,
  testId: a
}) {
  const [s, d] = S(n);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "overflow-hidden rounded-lg border border-border bg-surface",
      "data-testid": a,
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
        s && /* @__PURE__ */ t("div", { className: "p-4", children: i })
      ]
    }
  );
}
const Gu = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function Yu({
  runA: e,
  runB: n
}) {
  const r = W(
    () => Mo(e.context, n.context),
    [e.context, n.context]
  ), i = r.filter((a) => a.type !== "unchanged").length;
  return /* @__PURE__ */ t(
    zt,
    {
      title: "Context evolution diff",
      defaultOpen: !1,
      badge: i > 0 ? `${i} difference${i === 1 ? "" : "s"}` : void 0,
      testId: "diff-context-section",
      children: i === 0 ? /* @__PURE__ */ t("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "Final contexts are identical." }) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: r.map((a, s) => /* @__PURE__ */ o(
        "div",
        {
          className: I(
            "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
            Gu[a.type]
          ),
          children: [
            /* @__PURE__ */ o("span", { className: "min-w-[160px] shrink-0 font-semibold", children: [
              a.type === "added" && "+ ",
              a.type === "removed" && "- ",
              a.type === "changed" && "~ ",
              a.type === "unchanged" && "  ",
              a.key
            ] }),
            a.type === "changed" && /* @__PURE__ */ o("span", { children: [
              /* @__PURE__ */ t("span", { className: "line-through opacity-70", children: a.valueA }),
              " -> ",
              /* @__PURE__ */ t("span", { className: "font-semibold", children: a.valueB })
            ] }),
            a.type === "added" && /* @__PURE__ */ t("span", { children: a.valueB }),
            a.type === "removed" && /* @__PURE__ */ t("span", { children: a.valueA }),
            a.type === "unchanged" && /* @__PURE__ */ t("span", { className: "opacity-50", children: a.valueA })
          ]
        },
        `${a.key}-${s}`
      )) })
    }
  );
}
function Xu({ pipelineId: e, runIdA: n, runIdB: r }) {
  const i = Ve(), a = W(
    () => st(e),
    [e]
  ), s = W(
    () => Wt(e, n),
    [e, n]
  ), d = W(
    () => Wt(e, r),
    [e, r]
  ), c = W(() => Ju(a), [a]);
  if (!a)
    return /* @__PURE__ */ t("div", { className: "p-8", children: /* @__PURE__ */ t(
      qe,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => i("/pipelines")
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
        onAction: () => i(`/pipelines/${e}/runs`)
      }
    ) });
  const l = Jr(s, c), p = Jr(d, c);
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
              onClick: () => i(`/pipelines/${e}/runs`),
              className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
              children: [
                "← ",
                a.name
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
          Uu,
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
            children: /* @__PURE__ */ t(qu, { runA: s, runB: d, def: a })
          }
        ),
        /* @__PURE__ */ t(
          zt,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ t(Hu, { runA: s, runB: d, def: a })
          }
        ),
        /* @__PURE__ */ t(Yu, { runA: s, runB: d })
      ]
    }
  );
}
function dh() {
  const { pipelineId: e } = ft(), [n] = Jt(), r = n.get("a"), i = n.get("b");
  return !e || !r || !i ? /* @__PURE__ */ t(gt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t(Xu, { pipelineId: e, runIdA: r, runIdB: i });
}
function ph() {
  const e = Ve(), [n, r] = Jt(), [i, a] = S([]), { runs: s } = xt();
  oe(() => {
    let b = !1;
    return (async () => {
      const N = Gn(), y = [];
      await Promise.all(
        N.map(async (k) => {
          try {
            const { runs: C } = await ro(k.id, { limit: 50 });
            if (C.length > 0) {
              for (const T of C)
                T.id && y.push({ ...T, pipelineName: k.name });
              return;
            }
          } catch {
          }
          for (const C of qt(k.id))
            C.id && y.push({ ...C, pipelineName: k.name });
        })
      ), !b && (y.sort((k, C) => C.startedAt.localeCompare(k.startedAt)), a(y));
    })(), () => {
      b = !0;
    };
  }, []);
  const d = W(() => {
    const b = new Map(Gn().map((k) => [k.id, k.name])), N = new Set(i.map((k) => k.id)), y = [];
    for (const [k, C] of Object.entries(s))
      N.has(k) || C.pipelineId && y.push({
        ...C,
        pipelineName: b.get(C.pipelineId) ?? `Pipeline ${C.pipelineId.slice(0, 8)}`
      });
    return y.length === 0 ? i : [...y, ...i].sort((k, C) => C.startedAt.localeCompare(k.startedAt));
  }, [i, s]), { query: c, statuses: l, triggerKinds: p, range: u } = W(
    () => Ao(n),
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
  }, v = W(
    () => Ro(d, { query: c, statuses: l, triggerKinds: p, range: u }),
    [d, c, l, p, u]
  ), w = W(() => {
    const b = {};
    for (const N of v) {
      const y = Object.values(N.steps).filter((C) => !!C.llm).map((C) => ({
        model: void 0,
        tokensIn: C.llm?.tokensIn ?? 0,
        tokensOut: C.llm?.tokensOut ?? 0
      })), k = vt(y);
      k.total.totalCostUsd > 0 && (b[N.id] = _t(k.total));
    }
    return b;
  }, [v]);
  return /* @__PURE__ */ o("div", { "data-testid": "all-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ t("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Runs" }),
      /* @__PURE__ */ o("span", { className: "text-[13px] text-text-tertiary", children: [
        v.length,
        " run",
        v.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ t(
      Po,
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
    v.length === 0 ? /* @__PURE__ */ t(
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
      /* @__PURE__ */ t("tbody", { children: v.map((b) => /* @__PURE__ */ o(
        "tr",
        {
          onClick: () => e(`/pipelines/${b.pipelineId}/runs/${b.id}`),
          className: "border-b border-border cursor-pointer hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-medium", children: b.pipelineName }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: b.id.slice(0, 11) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ t(le, { tone: qn(b.status).tone, size: "sm", children: b.status }) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: b.triggerType ?? b.triggeredBy?.triggerType }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: qd(b.startedAt) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: b.completedAt ? Re(new Date(b.completedAt).getTime() - new Date(b.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: w[b.id] ?? "—" })
          ]
        },
        b.id
      )) })
    ] }) })
  ] });
}
function Do(e) {
  let n = 0, r = 0;
  for (const i of Object.values(e.steps ?? {}))
    i.llm && (n += i.llm.tokensIn ?? 0, r += i.llm.tokensOut ?? 0);
  return { tokensIn: n, tokensOut: r };
}
function Qu(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Zu(e, n) {
  const r = [];
  for (const i of Object.values(e.steps ?? {}))
    i.llm && r.push({
      model: n.get(i.nodeId),
      tokensIn: i.llm.tokensIn,
      tokensOut: i.llm.tokensOut
    });
  return vt(r).total.totalCostUsd;
}
function Gr(e, n) {
  if (e.length === 0) return 0;
  const r = Math.min(e.length - 1, Math.floor(e.length * n));
  return e[r];
}
function Yr(e) {
  return e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Xr(e) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? `$${n.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function em(e) {
  return e.slice(0, 8);
}
function tm(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function nm(e, n) {
  const r = e.length;
  let i = 0, a = 0, s = 0;
  const d = [];
  let c = 0, l = 0, p = 0;
  const u = /* @__PURE__ */ new Map();
  for (const m of e) {
    m.status === "completed" ? i++ : m.status === "failed" ? a++ : m.status === "cancelled" && s++, typeof m.durationMs == "number" && m.durationMs > 0 && d.push(m.durationMs);
    const v = Do(m);
    if (c += v.tokensIn, l += v.tokensOut, p += Zu(m, n), m.error?.message) {
      const w = m.error.message.slice(0, 48), b = u.get(w);
      b ? (b.count += 1, m.startedAt > b.lastSeenAt && (b.lastSeenAt = m.startedAt, b.exampleRunId = m.id)) : u.set(w, { count: 1, lastSeenAt: m.startedAt, exampleRunId: m.id });
    }
  }
  d.sort((m, v) => m - v);
  const f = Gr(d, 0.5), h = Gr(d, 0.95), g = r === 0 ? 0 : Math.round(i / r * 100), x = [...u.entries()].map(([m, v]) => ({ key: m, count: v.count, lastSeenAt: v.lastSeenAt, exampleRunId: v.exampleRunId })).sort((m, v) => v.count - m.count).slice(0, 5);
  return {
    totalCount: r,
    completedCount: i,
    failedCount: a,
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
function rm(e) {
  return e >= 90 ? "#16a34a" : e >= 70 ? "#f59e0b" : "#dc2626";
}
function om(e) {
  const n = [...e].sort((l, p) => l.startedAt.localeCompare(p.startedAt)), r = [], i = [], a = [];
  let s = 0, d = 0, c = 0;
  for (const l of n) {
    const p = new Date(l.startedAt).getTime();
    l.status === "completed" ? s += 1 : l.status === "failed" ? d += 1 : l.status === "cancelled" && (c += 1), r.push({ x: p, y: s }), i.push({ x: p, y: d }), a.push({ x: p, y: c });
  }
  return [
    { label: "Completed", data: r, color: "#16a34a" },
    { label: "Failed", data: i, color: "#dc2626" },
    { label: "Cancelled", data: a, color: "#d1d5db" }
  ];
}
function am(e, n) {
  const i = [...e].sort((s, d) => s.startedAt.localeCompare(d.startedAt)).filter((s) => typeof s.durationMs == "number" && s.durationMs > 0).map((s) => ({ x: new Date(s.startedAt).getTime(), y: s.durationMs })), a = i.map((s) => ({ x: s.x, y: n }));
  return [
    { label: "Duration (ms)", data: i, color: "#646cff" },
    { label: "p50", data: a, color: "#94a3b8" }
  ];
}
function im(e) {
  const n = [...e].sort((a, s) => a.startedAt.localeCompare(s.startedAt)), r = [], i = [];
  for (const a of n) {
    const s = new Date(a.startedAt).getTime(), { tokensIn: d, tokensOut: c } = Do(a);
    r.push({ x: s, y: d }), i.push({ x: s, y: c });
  }
  return [
    { label: "Tokens in", data: r, color: "#646cff" },
    { label: "Tokens out", data: i, color: "#16a34a" }
  ];
}
function uh() {
  const { pipelineId: e } = ft(), n = Ve(), [r, i] = S(null), [a, s] = S([]), [d, c] = S("50");
  oe(() => {
    e && (i(st(e)), s(qt(e)));
  }, [e]);
  const l = W(() => {
    if (d === "all") return a;
    const m = Number(d);
    return a.slice(0, m);
  }, [a, d]), p = W(() => Qu(r), [r]), u = W(() => nm(l, p), [l, p]), f = W(
    () => qp(l, r).filter((m) => m.totalCostUsd > 0 || m.stepCount > 0),
    [l, r]
  ), h = W(() => Kp(a, r, 30), [a, r]), g = W(
    () => [
      {
        label: "Daily spend",
        data: h.map((m) => ({ x: m.ts, y: m.totalCostUsd })),
        color: "#646cff"
      }
    ],
    [h]
  );
  if (!e) return /* @__PURE__ */ t(gt, { to: "/pipelines", replace: !0 });
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
                  style: { color: rm(u.successRatePct) },
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
              /* @__PURE__ */ t("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: Re(u.medianMs) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                "p95 · ",
                Re(u.p95Ms)
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
              /* @__PURE__ */ t("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: Yr(u.totalCost) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                Yr(u.costPerRun),
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
                xa,
                {
                  data: f.map((m) => ({
                    label: m.label,
                    cost: Number(m.totalCostUsd.toFixed(6))
                  })),
                  xKey: "label",
                  yKey: "cost",
                  height: 200,
                  color: "#646cff",
                  yFormat: Xr
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-trend-30d", children: [
              /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "30-day spend trend" }),
              /* @__PURE__ */ t(
                Lt,
                {
                  series: g,
                  height: 200,
                  xFormat: (m) => new Date(Number(m)).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric"
                  }),
                  yFormat: Xr
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
            Lt,
            {
              series: om(l),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString()
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Duration over time" }),
          /* @__PURE__ */ t(
            Lt,
            {
              series: am(l, u.medianMs),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString(),
              yFormat: (m) => Re(m)
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Token usage over time" }),
          /* @__PURE__ */ t(
            Lt,
            {
              series: im(l),
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
              /* @__PURE__ */ t("td", { className: "px-2 py-1.5 text-text-secondary", children: tm(m.lastSeenAt) }),
              /* @__PURE__ */ t("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => n(`/pipelines/${e}/runs/${m.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    em(m.exampleRunId),
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
function sm(e) {
  const n = new Date(e).getTime();
  if (!Number.isFinite(n) || n <= 0) return "—";
  const r = Math.floor((Date.now() - n) / 1e3);
  if (r < 10) return "just now";
  if (r < 60) return `${r}s ago`;
  const i = Math.floor(r / 60);
  if (i < 60) return `${i}m ago`;
  const a = Math.floor(i / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function lm(e) {
  return e.length <= 6 ? e : e.slice(-6);
}
function cm({ approver: e, idx: n }) {
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
function dm(e, n) {
  const r = [];
  if (e) {
    const i = e.steps;
    for (const [a, s] of Object.entries(e))
      a === "steps" || s == null || s === "" || (typeof s == "string" ? r.push({ label: a, value: s }) : typeof s == "object" && r.push({ label: a, value: JSON.stringify(s, null, 2) }));
    if (i && typeof i == "object")
      for (const [a, s] of Object.entries(i)) {
        if (s == null) continue;
        const d = s;
        typeof d.response == "string" && d.response.trim() && r.push({ label: `Step ${a.slice(0, 8)} response`, value: d.response });
      }
  }
  if (r.length === 0 && n)
    for (const [i, a] of Object.entries(n)) {
      const s = a.output;
      if (s)
        for (const [d, c] of Object.entries(s))
          c == null || c === "" || d === "tokensIn" || d === "tokensOut" || typeof c == "string" && c.trim() && r.push({ label: d, value: c });
    }
  return r;
}
function pm({ row: e, onSubmit: n, onOpenPipeline: r }) {
  const [i, a] = S(""), s = E(
    (p) => {
      n(p, i.trim()), a("");
    },
    [i, n]
  ), d = e.requiredCount ?? 1, c = e.recordedCount ?? 0, l = W(() => dm(e.runContext, e.runSteps), [e.runContext, e.runSteps]);
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
            lm(e.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: sm(e.requestedAt) })
    ] }),
    e.message ? /* @__PURE__ */ t("div", { "data-testid": `approval-message-${e.runId}`, className: "text-[13px] text-text-secondary bg-[#fafbfc] px-3 py-2 rounded-md leading-normal", children: e.message }) : null,
    /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5 px-3 py-2.5 bg-[#fafbfc] rounded-md border border-border", children: [
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
      e.approvers.length === 0 ? /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : e.approvers.map((p, u) => /* @__PURE__ */ t(cm, { approver: p, idx: u }, u)),
      d > 1 ? /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary ml-1", children: [
        "(",
        c,
        "/",
        d,
        " approvals)"
      ] }) : null
    ] }),
    /* @__PURE__ */ t(
      "textarea",
      {
        "data-testid": `approval-comment-${e.runId}`,
        value: i,
        onChange: (p) => a(p.target.value),
        placeholder: "Optional comment…",
        rows: 2,
        className: "w-full px-3 py-2 text-[13px] font-[inherit] border border-border-field rounded-md bg-[#f9fafb] text-text-primary outline-none resize-y"
      }
    ),
    /* @__PURE__ */ o("div", { className: "flex gap-2 justify-end", children: [
      /* @__PURE__ */ t("button", { "data-testid": `reject-${e.runId}`, onClick: () => s("reject"), className: "px-3.5 py-1.5 text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-md font-[inherit] cursor-pointer", children: "Reject" }),
      /* @__PURE__ */ t("button", { "data-testid": `approve-${e.runId}`, onClick: () => s("approve"), className: "px-3.5 py-1.5 text-[13px] font-semibold bg-[#16a34a] text-white border-none rounded-md font-[inherit] cursor-pointer shrink-0", children: "Approve" })
    ] })
  ] });
}
function mh() {
  const e = Ve(), { approvals: n, isLoading: r, error: i, retry: a } = na(), { resolveApproval: s, runs: d } = xt(), [c, l] = S(
    () => /* @__PURE__ */ new Set()
  );
  oe(() => {
    if (c.size === 0) return;
    const m = new Set(n.map((b) => `${b.runId}::${b.stepId}`));
    let v = !1;
    const w = new Set(c);
    for (const b of c)
      m.has(b) || (w.delete(b), v = !0);
    v && l(w);
  }, [n, c]);
  const [p, u] = S({}), f = ce(/* @__PURE__ */ new Set());
  oe(() => {
    for (const m of n)
      f.current.has(m.runId) || (f.current.add(m.runId), ra(m.pipelineId, m.runId).then((v) => {
        v && u((w) => ({
          ...w,
          [m.runId]: { context: v.context, steps: v.steps }
        }));
      }));
  }, [n]);
  const h = W(() => {
    const m = /* @__PURE__ */ new Map(), v = [];
    for (const w of n) {
      const b = `${w.runId}::${w.stepId}`;
      if (c.has(b)) continue;
      let N = m.get(w.pipelineId);
      N === void 0 && (N = st(w.pipelineId), m.set(w.pipelineId, N));
      const y = N?.name ?? (w.pipelineId ? `Pipeline ${w.pipelineId.slice(0, 8)}` : "Unknown pipeline"), k = p[w.runId]?.context ?? d[w.runId]?.context, C = p[w.runId]?.steps;
      v.push({ ...w, pipelineName: y, runContext: k, runSteps: C });
    }
    return v;
  }, [n, c, d, p]), g = E(
    (m, v, w, b, N) => {
      s(v, w, b, N || void 0), l((y) => {
        const k = new Set(y);
        return k.add(`${v}::${w}`), k;
      }), fetch(`/api/pipelines/${encodeURIComponent(v)}/approvals`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: w, decision: b, ...N ? { comment: N } : {} })
      }).catch((y) => {
        console.error("[approvals] POST failed", y);
      }), e(`/pipelines/${m}/runs/${v}`);
    },
    [s, e]
  ), x = h.length;
  return /* @__PURE__ */ o("div", { "data-testid": "pending-approvals-page", className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-[inherit]", children: [
    /* @__PURE__ */ t("div", { className: "h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]", children: /* @__PURE__ */ o("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ t("div", { className: "text-lg font-bold text-text-primary", children: "Pending approvals" }),
      /* @__PURE__ */ t(le, { "data-testid": "pending-count", tone: x > 0 ? "warning" : "neutral", size: "sm", children: x })
    ] }) }),
    /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto p-5", children: [
      i ? /* @__PURE__ */ o("div", { "data-testid": "approvals-error", role: "alert", className: "px-4 py-3 bg-[#fef2f2] border border-[#dc2626] text-[#dc2626] rounded-lg flex items-center justify-between gap-3 mb-4", children: [
        /* @__PURE__ */ t("span", { className: "text-[13px] font-medium", children: "Couldn't load pending approvals. Try again." }),
        /* @__PURE__ */ t("button", { "data-testid": "approvals-retry", onClick: a, className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[#dc2626] border border-[#dc2626] rounded-md cursor-pointer font-[inherit]", children: "Retry" })
      ] }) : null,
      r && x === 0 ? /* @__PURE__ */ o("div", { "data-testid": "approvals-loading", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: [
        /* @__PURE__ */ t(en, { height: 140 }),
        /* @__PURE__ */ t(en, { height: 140 }),
        /* @__PURE__ */ t(en, { height: 140 })
      ] }) : x === 0 && !i ? /* @__PURE__ */ t(
        qe,
        {
          icon: "✋",
          title: "No pending approvals",
          body: "When a pipeline reaches an approval step, it'll show up here.",
          testId: "approvals-empty"
        }
      ) : /* @__PURE__ */ t("div", { "data-testid": "approvals-list", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: h.map((m) => /* @__PURE__ */ t(
        pm,
        {
          row: m,
          onOpenPipeline: () => e(`/pipelines/${m.pipelineId}`),
          onSubmit: (v, w) => g(m.pipelineId, m.runId, m.stepId, v, w)
        },
        `${m.runId}:${m.stepId}`
      )) })
    ] })
  ] });
}
function hh({
  status: e,
  result: n,
  runId: r,
  endpointLabel: i,
  error: a,
  latencyMs: s,
  onOpen: d,
  className: c
}) {
  const l = i ?? n?.model?.endpointId ?? "vision-model", p = s ?? n?.model?.latencyMs, u = n?.caption, f = (n?.tags ?? []).slice(0, 5), h = /* @__PURE__ */ o(H, { children: [
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
    e === "failed" && a ? /* @__PURE__ */ t("p", { className: "text-[13px] text-danger-fg", children: a }) : /* @__PURE__ */ t("p", { className: "line-clamp-2 text-left text-[13px] text-text-primary", children: u ?? (e === "running" ? "Analyzing image…" : "No caption produced.") }),
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
function fh(e = {}) {
  const { maxRecords: n = 50, runId: r } = e, [i, a] = S([]), s = ce(/* @__PURE__ */ new Map()), d = ce(!0);
  return oe(() => (d.current = !0, () => {
    d.current = !1;
  }), []), je("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.image.vision.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const f = `${u.runId}::${u.stepId}`;
    a((h) => {
      const g = s.current.get(f), x = typeof u.at == "number" ? u.at : Date.now(), m = (v) => {
        if (typeof g == "number" && g >= 0 && g < h.length) {
          const N = h.slice();
          return N[g] = { ...h[g], ...v }, N;
        }
        const w = [v, ...h];
        w.length > n && (w.length = n);
        const b = /* @__PURE__ */ new Map();
        return w.forEach((N, y) => b.set(`${N.runId}::${N.stepId}`, y)), s.current = b, w;
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
        const v = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          status: "completed",
          result: u.result,
          completedAt: x,
          elapsedMs: v?.startedAt ? x - v.startedAt : void 0,
          endpointId: v?.endpointId ?? u.result?.model?.endpointId
        });
      }
      if (p === "pipeline.image.vision.failed") {
        const v = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          status: "failed",
          error: u.error,
          completedAt: x,
          elapsedMs: v?.startedAt ? x - v.startedAt : void 0
        });
      }
      return h;
    });
  }), W(() => i, [i]);
}
function um(e) {
  return e === "pass" ? "success" : e === "fail" ? "danger" : "warning";
}
function mm({ result: e, className: n }) {
  const r = um(e.overallVerdict), i = r === "success" ? "PASS" : r === "danger" ? "FAIL" : "INCONCLUSIVE", a = e.rubricSnapshot.passThreshold ?? 0.5;
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
            i,
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
            Bn,
            {
              value: e.overallScore,
              threshold: a,
              tone: r === "warning" ? "warning" : r,
              size: "lg",
              ariaLabel: `Overall judge score ${(e.overallScore * 100).toFixed(0)}% — ${i}`
            }
          )
        ] })
      ]
    }
  );
}
function hm({ result: e, className: n }) {
  if (!e.criteria || e.criteria.length === 0) return null;
  const r = /* @__PURE__ */ new Map();
  for (const i of e.rubricSnapshot.criteria) r.set(i.id, i);
  return /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", n), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Criteria (",
      e.criteria.length,
      ")"
    ] }),
    /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1.5", children: e.criteria.map((i) => /* @__PURE__ */ t(fm, { score: i, def: r.get(i.criterionId) }, i.criterionId)) })
  ] });
}
function fm({
  score: e,
  def: n
}) {
  const r = e.passed ? "success" : "danger", i = e.passed ? "PASS" : "FAIL", a = n?.scale ?? "0-1";
  return /* @__PURE__ */ o("li", { className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2.5", children: [
    /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-1.5", children: [
      /* @__PURE__ */ t("span", { className: "font-mono text-[11px] font-semibold text-text-primary", children: e.criterionId }),
      /* @__PURE__ */ o("span", { className: "font-mono text-[10px] uppercase text-text-tertiary", children: [
        "[",
        a,
        "]"
      ] }),
      /* @__PURE__ */ t(le, { tone: r, size: "sm", children: i }),
      /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
        "raw: ",
        String(e.rawScore)
      ] })
    ] }),
    /* @__PURE__ */ t(
      Bn,
      {
        value: e.score,
        threshold: n?.failThreshold ?? 0.5,
        tone: r,
        size: "sm",
        ariaLabel: `Criterion ${e.criterionId} score ${(e.score * 100).toFixed(0)}% — ${i}`
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
const Eo = Uo(null);
function gh({ value: e, children: n }) {
  return /* @__PURE__ */ t(Eo.Provider, { value: e, children: n });
}
function Oo() {
  return Ht(Eo);
}
function xh({
  result: e,
  showVerdict: n = !0,
  showCriteria: r = !0,
  showMetadata: i = !0,
  showRawText: a = !1,
  className: s
}) {
  const d = Oo(), [c, l] = S(!1), [p, u] = S(null), [f, h] = S(!1), [g, x] = S(null), m = ce(!0);
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
  const v = e.rawModelText ?? p ?? null, w = !!e.rawModelText || !!e.rawTextTruncated;
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-3 text-text-primary", s), children: [
    n ? /* @__PURE__ */ t(mm, { result: e }) : null,
    r ? /* @__PURE__ */ t(hm, { result: e }) : null,
    i ? /* @__PURE__ */ o("section", { className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
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
    a && w ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
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
        gm,
        {
          text: v,
          loading: f,
          error: g,
          fallbackHint: e.rawTextTruncated && !d ? "Raw text was spilled to S3 but no JudgmentApi provider is wired." : null
        }
      ) : null
    ] }) : null
  ] });
}
function gm({
  text: e,
  loading: n,
  error: r,
  fallbackHint: i
}) {
  return n ? /* @__PURE__ */ t("div", { className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary", children: "Loading raw text…" }) : r ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-state-failed bg-danger-bg p-2 text-[11px] text-text-primary", children: [
    "Failed to fetch raw text: ",
    r.message
  ] }) : e === null || e.length === 0 ? /* @__PURE__ */ t("div", { className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary", children: i ?? "Raw text not available." }) : /* @__PURE__ */ t("pre", { className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary", children: e });
}
function bh({ aggregate: e, className: n }) {
  const r = e.numJudgments > 0 ? e.numPassed / e.numJudgments : 0, i = e.numJudgments > 0 ? e.sumOverallScore / e.numJudgments : 0, a = r >= 0.9 ? "success" : r >= 0.6 ? "warning" : "danger", s = a === "success" ? "HEALTHY" : a === "warning" ? "MIXED" : "FAILING";
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
          /* @__PURE__ */ o(le, { tone: a, size: "sm", children: [
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
            Bn,
            {
              value: i,
              tone: a === "warning" ? "warning" : a,
              size: "md",
              ariaLabel: `Mean score ${(i * 100).toFixed(0)}% across ${e.numJudgments} judgments`
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
function yh({
  aggregates: e,
  sortOrder: n = "desc",
  caption: r,
  loading: i = !1,
  className: a
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
          a
        ),
        children: /* @__PURE__ */ t("span", { className: "text-[12px]", children: i ? "Loading trends…" : "No judgment activity in range." })
      }
    );
  const c = e.reduce((f, h) => f + h.numJudgments, 0), l = e.reduce((f, h) => f + h.numPassed, 0), p = e.reduce((f, h) => f + h.sumCostUsd, 0), u = c > 0 ? l / c : 0;
  return /* @__PURE__ */ o("section", { className: I("flex w-full flex-col gap-2", a), children: [
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
        ma,
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
      /* @__PURE__ */ t("tbody", { children: s.map((f) => /* @__PURE__ */ t(xm, { row: f }, f.aggregateKey)) })
    ] })
  ] });
}
function xm({ row: e }) {
  const n = e.numJudgments > 0 ? e.numPassed / e.numJudgments : 0, r = e.numJudgments > 0 ? e.sumOverallScore / e.numJudgments : 0, i = n >= 0.9 ? "success" : n >= 0.6 ? "warning" : "danger";
  return /* @__PURE__ */ o("tr", { className: "border-t border-border", children: [
    /* @__PURE__ */ t("td", { className: "py-1 pr-2 font-mono", children: e.dayBucket }),
    /* @__PURE__ */ t("td", { className: "py-1 pr-2", children: /* @__PURE__ */ o(le, { tone: i, size: "sm", children: [
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
function bm(e) {
  if (typeof e == "number") return e;
  if (typeof e == "string") {
    const n = Date.parse(e);
    if (Number.isFinite(n)) return n;
  }
  return Date.now();
}
function vh(e = {}) {
  const { maxRecords: n = 50, runId: r } = e, [i, a] = S([]), s = ce(/* @__PURE__ */ new Map()), d = ce(!0);
  return oe(() => (d.current = !0, () => {
    d.current = !1;
  }), []), je("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.judge.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const f = `${u.runId}::${u.stepId}`;
    a((h) => {
      const g = s.current.get(f), x = bm(u.at), m = (v) => {
        if (typeof g == "number" && g >= 0 && g < h.length) {
          const N = h.slice();
          return N[g] = { ...h[g], ...v }, N;
        }
        const w = [v, ...h];
        w.length > n && (w.length = n);
        const b = /* @__PURE__ */ new Map();
        return w.forEach((N, y) => b.set(`${N.runId}::${N.stepId}`, y)), s.current = b, w;
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
        const v = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? v?.pipelineId,
          status: "scored",
          result: u.result,
          completedAt: x,
          elapsedMs: v?.startedAt ? x - v.startedAt : u.latencyMs,
          rubricId: u.rubricId ?? v?.rubricId,
          judgeModel: u.judgeModel ?? v?.judgeModel,
          costUsd: u.costUsd ?? u.result?.costUsd,
          tokensIn: u.usage?.inputTokens ?? u.result?.tokensIn,
          tokensOut: u.usage?.outputTokens ?? u.result?.tokensOut
        });
      }
      if (p === "pipeline.judge.failed") {
        const v = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? v?.pipelineId,
          status: "failed",
          error: u.error,
          failureReason: u.reason,
          completedAt: x,
          elapsedMs: v?.startedAt ? x - v.startedAt : u.latencyMs,
          costUsd: u.costUsd,
          tokensIn: u.tokensIn,
          tokensOut: u.tokensOut
        });
      }
      if (p === "pipeline.judge.budget-exceeded") {
        const v = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? v?.pipelineId,
          status: "budget-exceeded",
          completedAt: x
        });
      }
      return h;
    });
  }), W(() => i, [i]);
}
function wh(e) {
  const n = Oo(), [r, i] = S([]), [a, s] = S(!1), [d, c] = S(null), l = ce(!0), p = ce(() => {
  }), { pipelineId: u, rubricId: f, since: h, until: g, limit: x, refreshIntervalMs: m = 0, paused: v = !1 } = e, w = `${u ?? ""}|${f ?? ""}|${h ?? ""}|${g ?? ""}|${x ?? ""}|${v ? "1" : "0"}`;
  return oe(() => (l.current = !0, () => {
    l.current = !1;
  }), []), oe(() => {
    if (!n) {
      i([]), s(!1), c(null);
      return;
    }
    if (v) return;
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
        i(y.items), c(null);
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
  }, [n, w, m]), {
    aggregates: r,
    loading: a,
    error: d,
    reload: () => p.current()
  };
}
const ym = 100, vm = 500, _o = 148, Lo = 116, wm = 56, Nm = 20;
function km(e) {
  const n = new Map(e.map((l) => [l.imageId, l])), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const l of e)
    if (l.parentImageId) {
      const p = i.get(l.parentImageId) ?? [];
      p.push(l.imageId), i.set(l.parentImageId, p);
    }
  const a = [];
  for (const l of e)
    (!l.parentImageId || !n.has(l.parentImageId)) && (r.set(l.imageId, 0), a.push(l.imageId));
  let s = 0;
  for (; s < a.length; ) {
    const l = a[s++], p = r.get(l) ?? 0;
    for (const u of i.get(l) ?? []) {
      const f = r.get(u) ?? -1;
      p + 1 > f && (r.set(u, p + 1), a.push(u));
    }
  }
  const d = /* @__PURE__ */ new Map();
  for (const [l, p] of r.entries()) {
    const u = d.get(p) ?? [];
    u.push(l), d.set(p, u);
  }
  const c = /* @__PURE__ */ new Map();
  for (const [l, p] of d.entries()) {
    const u = l * (_o + wm);
    p.forEach((f, h) => {
      c.set(f, {
        x: u,
        y: h * (Lo + Nm)
      });
    });
  }
  return c;
}
function Cm(e, n) {
  const r = new Map(n.map((s) => [s.imageId, s])), i = /* @__PURE__ */ new Set(), a = [e];
  for (; a.length; ) {
    const s = a.shift();
    if (i.has(s)) continue;
    i.add(s);
    const d = r.get(s);
    d?.parentImageId && a.push(d.parentImageId);
  }
  return i;
}
function Im({ src: e, alt: n, testId: r }) {
  const i = ce(null), [a, s] = S(!1);
  return oe(() => {
    if (!i.current) return;
    if (typeof IntersectionObserver > "u") {
      s(!0);
      return;
    }
    const d = i.current, c = new IntersectionObserver(
      ([l]) => {
        l.isIntersecting && (s(!0), c.disconnect());
      },
      { rootMargin: "200px" }
    );
    return c.observe(d), () => c.disconnect();
  }, []), /* @__PURE__ */ t(
    "div",
    {
      ref: i,
      className: "w-full h-full flex items-center justify-center bg-surface-inset",
      children: a ? /* @__PURE__ */ t(
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
function Sm({ data: e }) {
  const { entry: n, highlighted: r, selected: i, onSelect: a, getImageUrl: s } = e, d = n.width && n.height ? `${n.width}×${n.height}` : "", c = n.producedByNodeKind;
  return /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ t(B, { type: "target", position: U.Left, id: "in", className: "w-2 h-2 bg-border-emphasis" }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => a(n.imageId),
        className: I(
          "w-full h-full flex flex-col overflow-hidden rounded-lg border bg-surface text-left",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          i ? "border-primary ring-2 ring-primary/30" : r ? "border-primary/60 bg-primary/5" : "border-border"
        ),
        "aria-label": `Image artifact ${n.imageId.slice(0, 8)} produced by ${c}`,
        "data-testid": `lineage-node-${n.imageId}`,
        children: [
          /* @__PURE__ */ t("div", { className: "flex-1 min-h-0 overflow-hidden bg-surface-inset flex items-center justify-center", children: /* @__PURE__ */ t(
            Im,
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
    /* @__PURE__ */ t(B, { type: "source", position: U.Right, id: "out", className: "w-2 h-2 bg-border-emphasis" })
  ] });
}
const Tm = { lineageNode: Sm };
function $m() {
  return /* @__PURE__ */ t(
    "div",
    {
      className: "flex items-center justify-center h-full text-text-tertiary text-sm",
      "data-testid": "lineage-graph-empty",
      children: "No image artifacts produced by this run."
    }
  );
}
function Rm(e, n) {
  if (e.length <= n) return e;
  const r = e.map((i, a) => ({ e: i, i: a }));
  return r.sort((i, a) => {
    const s = Date.parse(i.e.at), d = Date.parse(a.e.at);
    return d !== s ? d - s : a.i - i.i;
  }), r.slice(0, n).map((i) => i.e);
}
function vn(e) {
  return e.length > 10 ? `${e.slice(0, 8)}…` : e;
}
function Am({
  navEntries: e,
  imageId: n,
  onClose: r,
  onNavigate: i,
  getImageUrl: a
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
      f.preventDefault(), i(e[x].imageId);
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [n, e, i]);
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
      title: `Artifact ${vn(s.imageId)}`,
      maxWidth: 760,
      rawChildren: !0,
      backdropTestId: "lineage-preview-backdrop",
      footer: /* @__PURE__ */ t(
        Ee,
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
                    src: a(s.imageId),
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
                    vn(s.imageId)
                  ] }),
                  /* @__PURE__ */ t(
                    pt,
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
                    vn(s.producedByStepId)
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
function Nh({
  entries: e,
  selectedImageId: n,
  onSelect: r,
  maxRenderedNodes: i = ym
}) {
  const a = Pe(), [s, d] = S(!1), [c, l] = S(!1), [p, u] = S(null), f = e.length, h = !s && f > i, g = W(
    () => h ? Rm(e, i) : e,
    [e, h, i]
  ), x = W(
    () => n ? Cm(n, g) : /* @__PURE__ */ new Set(),
    [n, g]
  ), m = W(() => km(g), [g]), v = E(
    (G) => {
      r?.(G), u(G);
    },
    [r]
  ), w = W(
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
          onSelect: v,
          getImageUrl: a
        },
        style: { width: _o, height: Lo }
      };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [g, n, x, v, a]
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
  ), [y, , k] = so(w), [C, , T] = lo(N), D = E(
    (G, Z) => {
      v(Z.id);
    },
    [v]
  ), P = E(() => {
    f > vm ? l(!0) : d(!0);
  }, [f]), M = E(() => {
    d(!0), l(!1);
  }, []), re = E(() => {
    l(!1);
  }, []), R = W(() => {
    const G = g.slice();
    return G.sort((Z, O) => {
      const A = Date.parse(Z.at), Y = Date.parse(O.at);
      return A !== Y ? A - Y : Z.imageId.localeCompare(O.imageId);
    }), G;
  }, [g]), J = E(() => u(null), []), Q = E(
    (G) => u(G),
    []
  );
  return f === 0 ? /* @__PURE__ */ t($m, {}) : /* @__PURE__ */ o(
    "div",
    {
      className: "relative w-full h-full flex flex-col",
      "data-testid": "lineage-graph",
      children: [
        h && /* @__PURE__ */ t("div", { className: "p-2 flex-shrink-0", children: /* @__PURE__ */ o(
          ot,
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
            co,
            {
              nodes: y,
              edges: C,
              onNodesChange: k,
              onEdgesChange: T,
              onNodeClick: D,
              nodeTypes: Tm,
              fitView: !0,
              fitViewOptions: { padding: 0.2 },
              minZoom: 0.3,
              maxZoom: 2,
              onlyRenderVisibleElements: !0,
              proOptions: { hideAttribution: !0 },
              children: [
                /* @__PURE__ */ t(po, { gap: 16, size: 1, className: "bg-surface-inset" }),
                /* @__PURE__ */ t(uo, { showInteractive: !1, className: "bg-surface border border-border rounded" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ t(
          Vt,
          {
            open: c,
            onConfirm: M,
            onCancel: re,
            title: "Show all artifacts?",
            body: `Rendering all ${f} artifacts may slow down the lineage tab. Continue?`,
            confirmLabel: "Show all",
            tone: "caution"
          }
        ),
        p && /* @__PURE__ */ t(
          Am,
          {
            navEntries: R,
            imageId: p,
            onClose: J,
            onNavigate: Q,
            getImageUrl: a
          }
        )
      ]
    }
  );
}
const Et = /* @__PURE__ */ new Map(), Pm = 6e4;
function Qr(e) {
  const n = Et.get(e);
  return n ? Date.now() - n.fetchedAt > Pm ? (Et.delete(e), null) : n.entries : null;
}
function Mm(e, n) {
  Et.set(e, { entries: n, fetchedAt: Date.now() });
}
function kh() {
  Et.clear();
}
function Ch(e, n) {
  const [r, i] = S(() => e ? Qr(e) ?? [] : []), [a, s] = S(!1), [d, c] = S(null), l = ce(0), p = E(() => {
    if (!e || !n) return;
    const f = Qr(e);
    if (f) {
      i(f), s(!1), c(null);
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
        const w = `image-lineage: ${x.status} ${x.statusText}`;
        c(w), s(!1);
        return;
      }
      const m = await x.json();
      if (h !== l.current) return;
      const v = Array.isArray(m.entries) ? m.entries : [];
      Mm(e, v), i(v), s(!1);
    }).catch((x) => {
      h === l.current && (c(x instanceof Error ? x.message : String(x)), s(!1));
    });
  }, [e, n]), u = E(() => {
    e && Et.delete(e), p();
  }, [e, p]);
  return oe(() => {
    p();
  }, [p]), { entries: r, loading: a, error: d, refetch: u };
}
export {
  Ba as ActionNode,
  Lc as AdjustBwConfig,
  mi as AdjustBwNode,
  Gc as AdjustLayerConfig,
  fi as AdjustLayerNode,
  Qa as AgUiOutputNode,
  Va as AgentNode,
  bh as AggregateSummaryCard,
  ph as AllRunsPage,
  Bi as AnimatedEdge,
  Wa as ApprovalNode,
  be as BaseNode,
  Td as CaptionPanel,
  _a as ConditionNode,
  Qt as ContextVariablePicker,
  hm as CriteriaPanel,
  Oc as CropConfig,
  ui as CropNode,
  Xc as DimensionsConfig,
  gi as DimensionsNode,
  bd as EditPromptConfig,
  Ei as EditPromptNode,
  Ed as EditRecommendationsPanel,
  Ph as EventStreamProvider,
  Ua as ForkNode,
  kc as FormatConvertConfig,
  li as FormatConvertNode,
  ud as GenerateConfig,
  Ri as GenerateNode,
  Ja as GraphQueryNode,
  Ya as GuardrailNode,
  Nh as ImageLineageGraph,
  vd as ImageSourceConfig,
  ei as ImageSourceNode,
  Rd as ImageWithBBoxOverlay,
  za as JoinNode,
  gh as JudgmentApiProvider,
  xh as JudgmentResultViewer,
  yh as JudgmentTrendChart,
  Ha as KnowledgeBaseNode,
  Ma as LLMNode,
  Ka as McpToolNode,
  Ga as MemoryNode,
  Sa as NODE_CATEGORIES,
  oh as NODE_TYPES_WITHOUT_CONFIG,
  ts as NodePalette,
  Yt as NodeThumbStrip,
  Md as ObjectsPanel,
  Ji as PALETTE_ITEMS,
  Ta as PORT_CLS,
  mh as PendingApprovalsPage,
  Pd as PeoplePanel,
  gs as PipelineCanvas,
  Mn as PipelineEditorContext,
  ah as PipelineEditorPage,
  oo as PipelineEditorProvider,
  Th as PipelineEditorServicesProvider,
  $h as PipelineNodeRuntimeProvider,
  ch as PipelineRunComparePage,
  dh as PipelineRunDiff,
  lh as PipelineRunReplayPage,
  sh as PipelineRunsPage,
  Zo as PipelineRunsProvider,
  uh as PipelineStatsPage,
  ih as PipelinesPage,
  Xa as PolicyNode,
  hc as ResizeConfig,
  oi as ResizeNode,
  Nd as SaveConfig,
  ti as SaveNode,
  uc as ScatterConfig,
  ri as ScatterNode,
  Cc as SharpenConfig,
  ci as SharpenNode,
  Dd as TagsPanel,
  yc as TransformGeoConfig,
  ii as TransformGeoNode,
  Ea as TransformNode,
  Ra as TriggerNode,
  Zc as UpscaleConfig,
  xi as UpscaleNode,
  fd as VariationConfig,
  Pi as VariationNode,
  mm as VerdictPanel,
  id as VisionClassifyConfig,
  ki as VisionClassifyNode,
  od as VisionConfig,
  sd as VisionDescribeConfig,
  Ci as VisionDescribeNode,
  cd as VisionExtractTextConfig,
  Si as VisionExtractTextNode,
  Ni as VisionNode,
  Od as VisionResultViewer,
  hh as VisionRunCard,
  ad as VisionTagConfig,
  Ii as VisionTagNode,
  Sc as WatermarkConfig,
  di as WatermarkNode,
  wl as availableContextPaths,
  Cl as availableImageRefs,
  ge as categoryFor,
  kh as clearImageLineageCache,
  cr as contextContributions,
  Ad as imageOverlayPropsFrom,
  Oi as nodeTypes,
  j as portCls,
  rh as recordRecentType,
  Nl as unresolvedTemplatePaths,
  Cn as upstreamNodeIds,
  je as useEventStream,
  ha as useEventStreamContext,
  Ch as useImageLineage,
  Pe as useImageUrl,
  eo as useIsNodeTypeExecutable,
  wh as useJudgmentAggregates,
  Oo as useJudgmentApi,
  vh as useJudgmentResults,
  he as useLatestStepForNode,
  Ke as usePipelineEditor,
  to as usePipelineEditorServices,
  Rh as usePipelineNodeRuntime,
  xt as usePipelineRuns,
  Oe as useRetryFromStep,
  Xt as useUpstreamContext,
  et as useUpstreamImageRefs,
  fh as useVisionResults
};
