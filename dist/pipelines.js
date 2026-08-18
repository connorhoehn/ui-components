import { jsxs as o, jsx as e, Fragment as K } from "react/jsx-runtime";
import Do, { useState as S, memo as xa, useRef as ce, useEffect as re, useMemo as q, useCallback as O, useContext as dn, createContext as ba } from "react";
import { useNavigate as ze, useParams as vt, Navigate as Nt, useSearchParams as pn } from "react-router";
import { v as Oo, w as he, x as De, q as Re, G as tr, y as qe, u as wt, i as ya, g as va, f as mr, p as Na, z as nr, A as wa, S as Xe, J as fn, t as Eo, I as _o, e as Ee, N as rt, B as ka, C as rr, T as ft, n as Lo, a as lt, D as Bo, E as or, F as qn, H as Uo, K as Ca, L as Ia, M as Sa, b as $a, O as ct, Q as Ta, R as Ra, U as dt, V as hr, W as Pa, j as Aa, o as Fo, X as an, Y as Ma, m as fr, P as Da, Z as Oa, r as Ea, _ as sn, l as gr, $ as _a, k as La } from "./usePendingApprovals-Dqy8id86.js";
import { h as Tf, a0 as Rf, a1 as Pf } from "./usePendingApprovals-Dqy8id86.js";
import { Handle as B, Position as U, useNodeConnections as Ba, getSmoothStepPath as Ua, EdgeLabelRenderer as xr, ReactFlowProvider as Fa, useReactFlow as ja, useNodesState as jo, useEdgesState as zo, ReactFlow as qo, Background as Wo, BackgroundVariant as za, Controls as Vo, MiniMap as qa } from "@xyflow/react";
/* empty css               */
import { c as I } from "./cn-B6yFEsav.js";
import { b as ar, u as un } from "./ToastProvider-D3MHbP-u.js";
import { a as kt, F as Wa, I as Va, C as ir, U as Ka, T as Ha, S as sr, b as Ja } from "./TrendSparkline-Bm0kEjdg.js";
import "clsx";
import "tailwind-merge";
import { M as Ge } from "./Modal-fp5zcyw8.js";
import "react-dom";
import "./WebSocketContext-DPGFyPeZ.js";
import { a as Be, u as Ga } from "./EventStreamContext-CjzSHXy-.js";
import { E as Mf } from "./EventStreamContext-CjzSHXy-.js";
import { B as Me } from "./Button-Qsbxqsl9.js";
import { I as gt, F as Ya } from "./FileUploadDrop-Cmz3XANg.js";
import { B as nt } from "./Banner-DKb3JiLs.js";
import { C as le } from "./Chip-BDT8ro4h.js";
import { E as je } from "./EmptyState-Ejc9dJA3.js";
import { u as Ko } from "./IdentityContext-CLalsm_M.js";
import { C as ln } from "./ConfirmDialog-Ix7G_Mb4.js";
import { B as Xa, L as Jt } from "./Chart-ByoxeiYX.js";
import { S as gn } from "./SkeletonCard-Baj5Ynm7.js";
const Qa = {
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
}, Za = {
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
function Wn(t, n, r, i) {
  return !(!ei(t, n) || !ti(r, i));
}
function ei(t, n) {
  const r = Qa[t];
  return r === "fork" ? ni(n) : r.includes(n);
}
function ti(t, n) {
  const r = Za[t];
  return r === null ? !1 : r === "join" ? ri(n) : r.includes(n);
}
function ni(t) {
  return /^branch-(\d+)$/.exec(t) !== null;
}
function ri(t) {
  return /^in-(\d+)$/.exec(t) !== null;
}
const oi = {
  idle: { card: "border border-[#d1d5db] bg-white", dot: "bg-[#d1d5db]" },
  pending: { card: "border border-dashed border-[#93c5fd] bg-[#eff6ff]", dot: "bg-[#93c5fd]" },
  running: { card: "border-2 border-[#2563eb] bg-[#eff6ff]", dot: "bg-[#2563eb]" },
  awaiting: { card: "border-2 border-[#f59e0b] bg-[#fffbeb]", dot: "bg-[#f59e0b]" },
  completed: { card: "border border-[#16a34a] bg-[#f0fdf4]", dot: "bg-[#16a34a]" },
  failed: { card: "border-2 border-[#dc2626] bg-[#fef2f2]", dot: "bg-[#dc2626]" },
  skipped: { card: "border border-dashed border-[#d1d5db] bg-[#f9fafb] opacity-50", dot: "bg-[#d1d5db]" }
}, ai = {
  source: { bar: "bg-cat-source", chip: "w-5 h-5 rounded-full bg-cat-source/15" },
  transform: { bar: "bg-cat-transform", chip: "w-5 h-5 rounded-md bg-cat-transform/15" },
  ai: { bar: "bg-cat-ai", chip: "w-5 h-5 rounded-md bg-gradient-to-br from-cat-ai/25 to-cat-ai/5" },
  control: { bar: "bg-cat-control", chip: "w-5 h-5 rounded-[4px] bg-cat-control/15 rotate-45", glyph: "-rotate-45" },
  sink: { bar: "bg-cat-sink", chip: "w-5 h-5 rounded-md bg-cat-sink/15" },
  human: { bar: "bg-cat-human", chip: "w-7 h-5 rounded-full bg-cat-human/15" }
};
function be(t) {
  const n = Oo(), r = t.nodeType ? !n(t.nodeType) : !1, { icon: i, subtitle: a, state: s, body: d, footer: c, selected: l, onRetry: p, hasBreakpoint: u, pausedAtBreakpoint: m, ariaLabel: h, category: g, children: x } = t, f = oi[s], v = g ? ai[g] : void 0, N = ar(), [b, w] = S(!1), y = s === "failed" && typeof p == "function", k = (M) => {
    M.preventDefault(), M.stopPropagation(), p?.();
  }, C = !N && s === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !N && s === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", $ = !!(d || c || y), D = !!(d || c), A = a ? `${a}, state: ${s}` : `Node, state: ${s}`;
  return /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        m ? "border-2 border-[#d97706] bg-[#fffbeb] shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]" : f.card,
        !m && l && "shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]",
        !m && !l && "shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
        N && "transition-none"
      ),
      role: "button",
      tabIndex: 0,
      "aria-label": h ?? A,
      "aria-selected": !!l,
      "data-state": s,
      "data-node-state": s,
      "data-node-category": g,
      "data-pipeline-node": "true",
      children: [
        v && /* @__PURE__ */ e(
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
        u && /* @__PURE__ */ e(
          "span",
          {
            "aria-label": "breakpoint",
            "data-testid": "breakpoint-dot",
            className: "absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-[#ef4444] border-[1.5px] border-white z-[1]"
          }
        ),
        /* @__PURE__ */ o("div", { className: I(
          "flex items-center gap-2 h-7 px-2.5",
          $ && "border-b border-border"
        ), children: [
          v ? /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": "true",
              "data-testid": "category-chip",
              className: I("flex items-center justify-center shrink-0", v.chip),
              children: /* @__PURE__ */ e("span", { className: I("text-xs leading-none", v.glyph), children: i })
            }
          ) : /* @__PURE__ */ e("span", { className: "text-sm leading-none shrink-0", "aria-hidden": "true", children: i }),
          /* @__PURE__ */ e("span", { className: "flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap", children: a }),
          r && /* @__PURE__ */ e(
            "span",
            {
              "data-testid": "node-preview-badge",
              title: "This deployment has no executor for this node type — the step will not run.",
              className: "shrink-0 rounded-full border border-warning-border bg-warning-bg px-1.5 text-[8px] font-semibold uppercase tracking-wide text-warning-fg",
              children: "preview"
            }
          ),
          /* @__PURE__ */ e(
            "span",
            {
              className: I("w-2 h-2 rounded-full shrink-0", f.dot, C),
              "aria-label": `state: ${s}`
            }
          )
        ] }),
        y && /* @__PURE__ */ e("div", { className: I(
          "flex px-2.5 py-1.5",
          D && "border-b border-border"
        ), children: /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: I(
              "cursor-pointer appearance-none font-inherit text-[11px] font-medium leading-tight px-2 py-0.5 rounded-full border border-[#dc2626] text-[#dc2626] transition-colors duration-[120ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              b ? "bg-[#fef2f2]" : "bg-transparent",
              N && "transition-none"
            ),
            onClick: k,
            onMouseDown: (M) => M.stopPropagation(),
            onMouseEnter: () => w(!0),
            onMouseLeave: () => w(!1),
            "aria-label": "Retry from here",
            children: "⟳ Retry from here"
          }
        ) }),
        d != null && /* @__PURE__ */ e("div", { className: "px-2.5 py-2 text-[13px] leading-[1.4] text-text-secondary", children: d }),
        c != null && /* @__PURE__ */ e("div", { className: "border-t border-border px-2.5 py-1.5 text-xs text-text-secondary", children: c }),
        x
      ]
    }
  );
}
const ii = {
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
function ge(t) {
  return ii[t];
}
const si = {
  image: "!w-2.5 !h-2.5 !rounded-sm !bg-[#7c3aed] !border-[#6d28d9]",
  text: "!w-2.5 !h-2.5 !bg-surface-emphasis",
  data: "!w-2.5 !h-2.5 !bg-[#94a3b8]",
  control: "!w-2 !h-2 !bg-warning",
  error: "!w-2 !h-2 !bg-danger"
};
function F(t) {
  return si[t];
}
function br(t) {
  switch (t.triggerType) {
    case "manual":
      return "Manual";
    case "document.finalize":
      return "On doc.finalize";
    case "document.comment":
      return "On doc.comment";
    case "document.submit":
      return "On doc.submit";
    case "schedule":
      return `Schedule: ${t.schedule ?? "—"}`;
    case "webhook":
      return `Webhook: ${t.webhookPath ?? "/—"}`;
    default:
      return "Trigger";
  }
}
function li(t) {
  return t.triggerType === "schedule" ? t.schedule ? `cron: ${t.schedule}` : "No schedule set" : t.triggerType === "webhook" ? t.webhookPath ? `POST ${t.webhookPath}` : "No path set" : t.triggerType.startsWith("document.") ? t.documentTypeId ? `Doc type: ${t.documentTypeId}` : "Any document" : "Fires on user click";
}
function ci(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = De(), p = c === "failed" ? () => l(n) : void 0, u = `Trigger node, ${br(r)}, state: ${c}`;
  return /* @__PURE__ */ e(
    be,
    {
      icon: "▶",
      subtitle: br(r),
      state: c,
      category: ge("trigger"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: li(r) }),
      selected: i,
      onRetry: p,
      ariaLabel: u,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: /* @__PURE__ */ e(
        B,
        {
          type: "source",
          position: U.Right,
          id: "out",
          className: F("data")
        }
      )
    }
  );
}
function di(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const r = t.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
function pi({ info: t }) {
  const [n, r] = S(!1), i = n ? t.response : t.response.length > 60 ? `${t.response.slice(0, 60)}…` : t.response, a = t.tokensIn != null || t.tokensOut != null;
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
            t.tokensIn ?? 0,
            " → ",
            t.tokensOut ?? 0,
            " tokens"
          ] }),
          t.streamOpening && /* @__PURE__ */ e(
            "span",
            {
              className: "ml-1.5 text-[11px] text-[#2563eb]",
              "data-testid": "llm-stream-opening",
              title: "LLM stream is open — waiting for the first token",
              children: "· stream open — waiting…"
            }
          ),
          !t.streamOpening && t.streaming && /* @__PURE__ */ e("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: "· streaming…" })
        ]
      }
    ),
    /* @__PURE__ */ e(
      "div",
      {
        className: n ? "mt-1 font-mono text-[11px] leading-[1.4] text-text-primary whitespace-pre-wrap break-words line-clamp-6" : "mt-1 font-mono text-[11px] leading-[1.4] text-text-primary whitespace-pre-wrap break-words max-h-[1.4em] overflow-hidden",
        children: i
      }
    )
  ] });
}
function ui(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.llm, p = c === "running" && l?.streamOpened === !0 && (l?.tokensOut ?? 0) === 0, u = c === "running" && l !== void 0 && (l.tokensOut ?? 0) > 0, m = De(), h = c === "failed" ? () => m(n) : void 0, g = /* @__PURE__ */ e("span", { className: "italic", children: di(r.userPromptTemplate) }), f = (l ? {
    response: l.response ?? "",
    tokensIn: l.tokensIn,
    tokensOut: l.tokensOut,
    streaming: u,
    streamOpening: p
  } : void 0) ?? r._llmResponse, v = f ? /* @__PURE__ */ e(pi, { info: f }) : void 0, N = (r.systemPrompt ?? "").replace(/\s+/g, " ").trim(), b = N.length === 0 ? "no system prompt" : `system prompt: ${N.length > 60 ? `${N.slice(0, 60)}…` : N}`, w = `LLM node, ${r.model || r.provider}, ${b}, state: ${c}`;
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
      ariaLabel: w,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: `${F("text")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function mi(t) {
  if (!t) return "—";
  const n = t.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function hi(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = De(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "✨",
      subtitle: r.transformType,
      state: c,
      category: ge("transform"),
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: mi(r.expression) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("data") })
      ]
    }
  );
}
function fi(t) {
  if (!t) return "—";
  const n = t.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function gi(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = De(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "❓",
      subtitle: r.label || "condition",
      state: c,
      category: ge("condition"),
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: fi(r.expression) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "true", className: `${F("control")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "false", className: `${F("control")} !top-[60%]` })
      ]
    }
  );
}
function xi(t) {
  const n = t.config ?? {};
  switch (t.actionType) {
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
function bi(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = De(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "⚡",
      subtitle: r.actionType,
      state: c,
      category: ge("action"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: xi(r) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function yi(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = De(), p = c === "failed" ? () => l(n) : void 0, u = Math.max(2, Math.min(8, r.branchCount ?? 2)), m = Array.from({ length: u }, (h, g) => {
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
      body: /* @__PURE__ */ e("ul", { className: "m-0 p-0 list-none flex flex-col gap-0.5 text-xs text-text-secondary", children: m.map((h, g) => /* @__PURE__ */ o("li", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: [
        "• ",
        h
      ] }, g)) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        m.map((h, g) => {
          const x = (g + 1) / (u + 1) * 100;
          return /* @__PURE__ */ e(
            B,
            {
              type: "source",
              position: U.Right,
              id: `branch-${g}`,
              className: F("control"),
              style: { top: `${x}%` }
            },
            g
          );
        })
      ]
    }
  );
}
function vi(t) {
  return t.mode === "all" ? "all" : t.mode === "any" ? "any" : `${t.n ?? 1} of many`;
}
function Ni(t) {
  switch (t) {
    case "deep-merge":
      return "Deep merge";
    case "array-collect":
      return "Array collect";
    case "last-writer-wins":
      return "Last writer wins";
    default:
      return String(t);
  }
}
function wi(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = De(), p = c === "failed" ? () => l(n) : void 0, u = Ba({ handleType: "target" }), m = Math.max(2, u.length + 1);
  return /* @__PURE__ */ o(
    be,
    {
      icon: "⑃",
      subtitle: vi(r),
      state: c,
      category: ge("join"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: Ni(r.mergeStrategy) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        Array.from({ length: m }, (h, g) => {
          const x = (g + 1) / (m + 1) * 100;
          return /* @__PURE__ */ e(
            B,
            {
              type: "target",
              position: U.Left,
              id: `in-${g}`,
              className: F("control"),
              style: { top: `${x}%` }
            },
            `in-${g}`
          );
        }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("data") })
      ]
    }
  );
}
function ki(t) {
  return t.type === "role" ? `@${t.value}` : t.value;
}
function Ci(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = De(), p = c === "failed" ? () => l(n) : void 0, u = r.approvers ?? [], m = u.length, h = r.requiredCount ?? 0, g = `${m} approver${m === 1 ? "" : "s"}, ${h}/${m} required`, x = u.slice(0, 2), f = Math.max(0, u.length - 2), v = u.length === 0 ? /* @__PURE__ */ e("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: [
    x.map((N, b) => /* @__PURE__ */ e(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: ki(N)
      },
      b
    )),
    f > 0 && /* @__PURE__ */ o("span", { className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-inset text-text-tertiary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap", children: [
      "+",
      f,
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "approved", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "rejected", className: `${F("data")} !top-[60%]` })
      ]
    }
  );
}
function Ii({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = De(), c = n.agentName || n.agentId || "Not configured", l = `${n.protocol.toUpperCase()}${n.streaming ? " (streaming)" : ""}`;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "🤖",
      subtitle: c,
      state: s,
      category: ge("agent"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function Si({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = De(), c = n.toolName || "Not configured";
  return /* @__PURE__ */ o(
    be,
    {
      icon: "🔌",
      subtitle: c,
      state: s,
      category: ge("mcp-tool"),
      body: n.gatewayUrl ? /* @__PURE__ */ e("span", { className: "text-[11px]", children: n.gatewayUrl }) : void 0,
      selected: r,
      onRetry: s === "failed" && i ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function $i({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = De(), c = n.knowledgeBaseId || "Not configured", l = `Top ${n.topK} chunks${n.scoreThreshold ? ` (≥${n.scoreThreshold})` : ""}`;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "📚",
      subtitle: c,
      state: s,
      category: ge("knowledge-base"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function Ti({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = De(), c = n.graphId || "Not configured", l = n.query.length > 40 ? `${n.query.slice(0, 37)}...` : n.query;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "🕸️",
      subtitle: c,
      state: s,
      category: ge("graph-query"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px] font-mono", children: l }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function Ri({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = De(), c = `${n.mode} ${n.scope}`, l = n.namespace ? `ns: ${n.namespace}` : "No namespace";
  return /* @__PURE__ */ o(
    be,
    {
      icon: "💾",
      subtitle: c,
      state: s,
      category: ge("memory"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function Pi({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = De(), c = n.label || n.guardrailId || "Not configured";
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
      onRetry: s === "failed" && i ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "pass", className: `${F("control")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "block", className: `${F("control")} !top-[60%]` })
      ]
    }
  );
}
function Ai({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = De(), c = n.label || n.action || "Not configured";
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
      onRetry: s === "failed" && i ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "allow", className: `${F("control")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "deny", className: `${F("control")} !top-[60%]` })
      ]
    }
  );
}
function Mi({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = n.eventType === "CUSTOM" ? n.customEventName || "Custom" : n.eventType;
  return /* @__PURE__ */ e(
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
      footer: /* @__PURE__ */ e("span", { className: "text-[10px] text-[#6366f1]", children: "Terminal — streams to AG-UI frontend" }),
      selected: r,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") })
    }
  );
}
const Di = (t) => t.stopPropagation();
function Oi(t) {
  const { id: n, data: r, selected: i } = t, [a, s] = S(!1), d = he(n), c = d?.status === "cancelled" ? "failed" : d?.status, p = (r._state && r._state !== "idle" ? r._state : void 0) ?? c ?? r._state ?? "idle", u = Re(), h = d?.images?.[0]?.imageId ?? d?.output?.imageId ?? r.imageId, g = h ? /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "aria-label": "View source image",
        className: I(
          "block w-full rounded border-none bg-transparent p-0 cursor-zoom-in",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
        ),
        onMouseDown: Di,
        onClick: (f) => {
          f.stopPropagation(), s(!0);
        },
        children: /* @__PURE__ */ e(
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
    /* @__PURE__ */ e(
      kt,
      {
        images: [{ src: u(h), alt: "Source image" }],
        openIndex: a ? 0 : null,
        onClose: () => s(!1)
      }
    )
  ] }) : /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(
          B,
          {
            type: "target",
            position: U.Left,
            id: "in",
            className: F("control")
          }
        ),
        /* @__PURE__ */ e(
          B,
          {
            type: "source",
            position: U.Right,
            id: "out",
            className: F("image")
          }
        )
      ]
    }
  );
}
const yr = (t) => t.stopPropagation(), vr = I(
  "h-[38px] w-[38px] shrink-0 overflow-hidden rounded border border-border bg-surface-inset",
  "p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
);
function mn({
  images: t,
  max: n = 4,
  "data-testid": r = "node-thumb-strip"
}) {
  const i = Re(), [a, s] = S(null);
  if (t.length === 0) return null;
  const d = t.length > n, c = d ? t.slice(0, n - 1) : t, l = t.length - c.length, p = (u) => (m) => {
    m.stopPropagation(), s(u);
  };
  return /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ o("div", { "data-testid": r, className: "flex flex-row items-center gap-1", children: [
      c.map((u, m) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          "data-testid": `${r}-thumb-${m}`,
          "aria-label": u.alt ?? `Result image ${m + 1} of ${t.length}`,
          className: vr,
          onMouseDown: yr,
          onClick: p(m),
          children: /* @__PURE__ */ e(
            "img",
            {
              src: i(u.imageId),
              alt: u.alt ?? "",
              loading: "lazy",
              className: "h-full w-full object-cover"
            }
          )
        },
        `${u.imageId}-${m}`
      )),
      d && /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          "data-testid": `${r}-overflow`,
          "aria-label": `Show all ${t.length} images`,
          className: I(
            vr,
            "flex items-center justify-center font-mono text-[11px] font-medium text-text-secondary"
          ),
          onMouseDown: yr,
          onClick: p(c.length),
          children: [
            "+",
            l
          ]
        }
      )
    ] }),
    /* @__PURE__ */ e(
      kt,
      {
        images: t.map((u) => ({
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
function Ei(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.images ?? [], u = a?.output?.filename ?? null, m = l.length > 0 ? /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ e(mn, { images: l, "data-testid": "save-thumb-strip" }),
    u && /* @__PURE__ */ e(
      "div",
      {
        className: "mt-1 text-[10px] font-mono text-[#6b7280] overflow-hidden text-ellipsis whitespace-nowrap",
        "data-testid": "save-filename-badge",
        title: u,
        children: u
      }
    )
  ] }) : /* @__PURE__ */ e(
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
  ), h = r.filenameTemplate ?? "crop-{{scatter.index}}.png", g = h.length > 28 ? `${h.slice(0, 25)}…` : h, x = /* @__PURE__ */ e(
    "span",
    {
      className: "font-mono text-[11px] text-[#6b7280]",
      "data-testid": "save-footer",
      title: h,
      children: g
    }
  ), f = "image:save", v = `Save node, template: ${h}, state: ${c}`;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "⬇",
      subtitle: f,
      state: c,
      category: ge("image:save"),
      body: m,
      footer: x,
      selected: i,
      ariaLabel: v,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(
          B,
          {
            type: "target",
            position: U.Left,
            id: "in",
            className: F("image")
          }
        ),
        /* @__PURE__ */ e(
          B,
          {
            type: "source",
            position: U.Right,
            id: "out",
            className: F("image")
          }
        ),
        /* @__PURE__ */ e(
          B,
          {
            type: "source",
            position: U.Right,
            id: "error",
            className: `${F("error")} !top-[75%]`
          }
        )
      ]
    }
  );
}
function _i(t) {
  return t ? t.length > 40 ? `${t.slice(0, 37)}…` : t : "Not configured";
}
function Li(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.output, p = Array.isArray(l?.items) ? l.items.length : null, u = /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary break-all", children: _i(r.itemsPath ?? "") }),
    p !== null && /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", children: [
      p,
      " item",
      p === 1 ? "" : "s",
      " resolved"
    ] })
  ] }), m = p, h = m !== null && c !== "idle" ? /* @__PURE__ */ o("span", { className: "inline-block text-[11px] font-semibold text-info-fg bg-info-bg border border-info rounded-full px-2 py-0.5", children: [
    "Dispatched ",
    m,
    " arm",
    m === 1 ? "" : "s"
  ] }) : void 0, g = r.itemAlias ? ` · alias: ${r.itemAlias}` : "", x = r.maxConcurrency ? ` · max ${r.maxConcurrency}` : "", f = `scatter${g}${x}`, v = `Scatter node, path: ${r.itemsPath ?? "not set"}, state: ${c}`;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "⑂",
      subtitle: f,
      state: c,
      category: ge("scatter"),
      body: u,
      footer: h,
      selected: i,
      ariaLabel: v,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("control") })
      ]
    }
  );
}
function Bi(t) {
  const { id: n, data: r, selected: i } = t, a = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.width != null && r.height != null ? `→ ${r.width}×${r.height}` : r.width != null ? `→ ${r.width}w` : r.height != null ? `→ ${r.height}h` : null, m = p ? /* @__PURE__ */ e(
    "img",
    {
      src: a(p.imageId),
      alt: "Resize output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "resize-output-thumb"
    }
  ) : /* @__PURE__ */ e(
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
      body: m,
      footer: h,
      selected: i,
      ariaLabel: `Resize node, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ui(t) {
  switch (t.op) {
    case "rotate":
      return `rotate ${t.degrees}°`;
    case "flip":
      return "flip ↕";
    case "flop":
      return "flop ↔";
  }
}
function Fi(t) {
  const { id: n, data: r, selected: i } = t, a = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.operations ?? [], m = u.length > 0 ? u.map(Ui).join("  ›  ") : null, h = p ? /* @__PURE__ */ e(
    "img",
    {
      src: a(p.imageId),
      alt: "Transform output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "transform-geo-output-thumb"
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "transform-geo-placeholder",
      children: m ?? "No ops configured"
    }
  ), g = m ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-tertiary", children: m }) : void 0;
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function ji(t) {
  const n = t.format?.toUpperCase() ?? "?", r = t.lossless ? "lossless" : t.quality != null ? `q${t.quality}` : "";
  return r ? `${n} ${r}` : n;
}
function zi(t) {
  const { id: n, data: r, selected: i } = t, a = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.format ? ji(r) : null, m = p ? /* @__PURE__ */ e(
    "img",
    {
      src: a(p.imageId),
      alt: "Format convert output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "format-convert-output-thumb"
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "format-convert-placeholder",
      children: u ?? "No format set"
    }
  ), h = u ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary", children: u }) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "⇌",
      subtitle: "image:format-convert",
      state: l,
      category: ge("image:format-convert"),
      body: m,
      footer: h,
      selected: i,
      ariaLabel: `Format Convert node, format: ${r.format ?? "unset"}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function qi(t) {
  const { id: n, data: r, selected: i } = t, a = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.sigma != null ? `σ ${r.sigma}` : null, m = p ? /* @__PURE__ */ e(
    "img",
    {
      src: a(p.imageId),
      alt: "Sharpen output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "sharpen-output-thumb"
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "sharpen-placeholder",
      children: u ?? "Sharpen (default σ)"
    }
  ), h = u ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary", children: u }) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "◈",
      subtitle: "image:sharpen",
      state: l,
      category: ge("image:sharpen"),
      body: m,
      footer: h,
      selected: i,
      ariaLabel: `Sharpen node, sigma: ${r.sigma ?? "default"}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Wi(t) {
  const { id: n, data: r, selected: i } = t, a = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.gravity ?? "southeast", m = r.opacity != null ? `${Math.round(r.opacity * 100)}%` : "100%", h = p ? /* @__PURE__ */ e(
    "img",
    {
      src: a(p.imageId),
      alt: "Watermark output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "watermark-output-thumb"
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "watermark-placeholder",
      children: r.overlayImageId ? `${u} · ${m}` : "No overlay image set"
    }
  ), g = r.overlayImageId ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    u,
    " · ",
    m
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Vi(t) {
  if (!t) return null;
  const n = t.x + t.width, r = t.y + t.height;
  return `[${t.x},${t.y} → ${n},${r}]`;
}
function Ki(t) {
  const { id: n, data: r, selected: i } = t, a = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = s?.output, m = Vi(p?.bbox ?? u?.bbox), h = p ? /* @__PURE__ */ e(
    "img",
    {
      src: a(p.imageId),
      alt: "Crop output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "crop-output-thumb"
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "crop-placeholder",
      children: "No crop yet"
    }
  ), g = m ? /* @__PURE__ */ e(
    "span",
    {
      className: "font-mono text-[11px] text-text-tertiary",
      "data-testid": "crop-bbox-coords",
      children: m
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("image") })
      ]
    }
  );
}
function Hi(t) {
  const { id: n, data: r, selected: i } = t, a = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e("div", { className: "flex gap-1 w-full", children: /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
    /* @__PURE__ */ e(
      "img",
      {
        src: a(p.imageId),
        alt: "B/W output",
        className: "flex-1 h-16 object-cover rounded border border-border bg-surface-inset block",
        "data-testid": "adjust-bw-output-thumb"
      }
    ),
    /* @__PURE__ */ e("div", { className: "text-[9px] text-text-tertiary text-center mt-0.5", children: "output" })
  ] }) }) : /* @__PURE__ */ e(
    "div",
    {
      className: "w-full h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "adjust-bw-placeholder",
      children: "Awaiting input"
    }
  ), m = r.algorithm ?? "luminosity", h = r.contrast ?? 1, g = /* @__PURE__ */ o(
    "span",
    {
      className: "font-mono text-[11px] text-text-tertiary",
      "data-testid": "adjust-bw-footer",
      children: [
        m,
        " · contrast ",
        h
      ]
    }
  ), x = `Adjust B/W node, algorithm: ${m}, state: ${l}`;
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !top-[75%]` })
      ]
    }
  );
}
function Ji(t) {
  switch (t.kind) {
    case "brightness":
      return `brightness ${t.value}`;
    case "contrast":
      return `contrast ${t.value}`;
    case "saturation":
      return `sat ${t.value}`;
    case "hue":
      return `hue ${t.degrees}°`;
    case "blur":
      return `blur ${t.radiusPx}px`;
  }
}
function Gi(t) {
  const { id: n, data: r, selected: i } = t, a = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.layers ?? [], m = p ? /* @__PURE__ */ e(
    "img",
    {
      src: a(p.imageId),
      alt: "Adjust output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "adjust-layer-output-thumb"
    }
  ) : u.length > 0 ? /* @__PURE__ */ e(
    "div",
    {
      className: "w-full rounded border border-dashed border-border bg-surface-inset p-1.5 flex flex-wrap gap-1 min-h-8",
      "data-testid": "adjust-layer-chips",
      children: u.map((x, f) => /* @__PURE__ */ e(
        "span",
        {
          className: "text-[10px] font-mono bg-surface-hover border border-border text-text-secondary rounded px-1 py-0.5",
          children: Ji(x)
        },
        f
      ))
    }
  ) : /* @__PURE__ */ e(
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
      body: m,
      footer: h,
      selected: i,
      ariaLabel: g,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !top-[75%]` })
      ]
    }
  );
}
function Yi(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.output ?? void 0, p = l?.genWidth != null && l?.genHeight != null ? `${l.genWidth}×${l.genHeight}` : null, u = p ? /* @__PURE__ */ o(
    "div",
    {
      className: "w-full h-20 rounded border border-border bg-surface-inset flex flex-col items-center justify-center gap-0.5 text-text-secondary",
      "data-testid": "dimensions-output",
      children: [
        /* @__PURE__ */ e("span", { className: "font-mono text-[13px]", children: p }),
        l?.width != null && l?.height != null && /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
          "src ",
          l.width,
          "×",
          l.height
        ] })
      ]
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "dimensions-placeholder",
      children: "reads image size"
    }
  ), m = /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
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
      footer: m,
      selected: i,
      ariaLabel: `Dimensions node, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Xi(t) {
  const { id: n, data: r, selected: i } = t, a = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = `≤ ${r.maxEdge ?? 1024}px → 4×`, m = p ? /* @__PURE__ */ e(
    "img",
    {
      src: a(p.imageId),
      alt: "Upscale output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "upscale-output-thumb"
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "upscale-placeholder",
      children: u
    }
  ), h = /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-tertiary", children: u });
  return /* @__PURE__ */ o(
    be,
    {
      icon: "⤢",
      subtitle: "image:upscale",
      state: l,
      category: ge("image:upscale"),
      body: m,
      footer: h,
      selected: i,
      ariaLabel: `Upscale node, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Qi(t) {
  return t === 0 ? "$0" : t < 1e-3 ? "<$0.001" : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Zi(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const r = t.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
const es = (t) => t.stopPropagation(), ts = xa(function({ info: n }) {
  const [r, i] = S(!1), [a, s] = S(!1);
  if (n.failure) {
    const u = n.failure.reason === "refusal";
    return /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("output", { "aria-live": "polite", className: "sr-only", children: u ? "Content policy refusal" : `Failure: ${n.failure.reason}` }),
      /* @__PURE__ */ o("div", { className: "flex items-start gap-1", children: [
        /* @__PURE__ */ e("span", { className: "bg-transparent border-none p-0 text-[12px] text-danger-fg font-medium text-left", children: u ? "✕ Content policy refusal" : `✕ ${n.failure.reason}` }),
        n.onRetry && /* @__PURE__ */ e(
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
      /* @__PURE__ */ e("div", { className: "mt-1 font-mono text-[11px] leading-snug text-text-secondary", children: n.failure.error })
    ] });
  }
  const d = n.tokensIn != null || n.tokensOut != null, c = !n.streaming && !n.awaiting && n.response.length > 0, l = r ? n.response : n.response.length > 60 ? `${n.response.slice(0, 60)}…` : n.response, p = n.awaiting ? "Vision: waiting for first token" : n.streaming ? "Vision: streaming response" : c ? "Vision: completed" : "";
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ e("output", { "aria-live": "polite", className: "sr-only", children: p }),
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
            Qi(n.costUsd)
          ] }),
          d && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: [
            "· ",
            n.tokensIn ?? 0,
            " → ",
            n.tokensOut ?? 0,
            " tokens"
          ] }),
          n.awaiting && /* @__PURE__ */ e("span", { className: "ml-1.5 text-[11px] text-info-fg", "data-testid": "vision-awaiting", children: "· waiting…" }),
          n.streaming && !n.awaiting && /* @__PURE__ */ e("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: "· streaming…" })
        ]
      }
    ),
    c && n.imageId && /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: () => window.dispatchEvent(new CustomEvent("pipeline:open-run-modal")),
        className: "mt-1 block bg-transparent border-none p-0 cursor-pointer text-[11px] text-primary underline font-inherit",
        children: "Run with new image →"
      }
    ),
    n.imageId && /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          "aria-label": "View vision input image",
          className: I(
            "mt-1.5 block h-14 w-14 overflow-hidden rounded border border-border bg-surface-inset",
            "p-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
          ),
          onMouseDown: es,
          onClick: (u) => {
            u.stopPropagation(), s(!0);
          },
          children: /* @__PURE__ */ e(
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
      /* @__PURE__ */ e(
        kt,
        {
          images: [{ src: n.getImageUrl(n.imageId), alt: "Vision input", caption: "Vision input" }],
          openIndex: a ? 0 : null,
          onClose: () => s(!1)
        }
      )
    ] }),
    /* @__PURE__ */ e(
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
function ns(t) {
  const { id: n, data: r, selected: i } = t, a = Re(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = De(), u = l === "failed" ? () => p(n) : void 0, m = /* @__PURE__ */ e("span", { className: "italic text-text-secondary text-[13px]", children: Zi(r.userPrompt) }), h = s?.vision, g = l === "running" && h !== void 0 && h.tokensSeen > 0 && !h.analyzed, x = l === "running" && h !== void 0 && h.tokensSeen === 0 && !h.failure, f = h ? {
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
  } : void 0, v = f ? /* @__PURE__ */ e(ts, { info: f }) : void 0, N = r.model || "claude-sonnet-4-6", b = r.outputSchema ? "extract" : "caption", w = `Vision node, model ${N}, mode ${b}, state: ${l}`;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "📷",
      subtitle: `${N} · ${b}`,
      state: l,
      category: ge("image:vision-analyze"),
      body: m,
      footer: v,
      selected: i,
      onRetry: u,
      ariaLabel: w,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("data") })
      ]
    }
  );
}
function rs(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.output, p = l?.extracted?.label, u = l?.extracted?.confidence, m = (r.labels ?? []).slice(0, 4).join(", "), h = p ? /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 py-0.5", children: [
    /* @__PURE__ */ e(
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
  ] }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: m ? `Labels: ${m}` : "No labels configured" }), g = r.model ?? "claude-haiku-4-5";
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function os(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", p = a?.output?.extracted?.caption, u = p ? p.length > 80 ? `${p.slice(0, 77)}…` : p : null, m = r.userPrompt ? r.userPrompt.length > 60 ? `${r.userPrompt.slice(0, 57)}…` : r.userPrompt : "No prompt set", h = u ? /* @__PURE__ */ e(
    "span",
    {
      className: "text-[11px] text-text-primary leading-snug",
      "data-testid": "describe-caption",
      children: u
    }
  ) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: m }), g = r.model ?? "claude-haiku-4-5";
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function as(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", u = (a?.output?.extracted?.tags ?? []).slice(0, 5), m = (r.candidateTags ?? []).slice(0, 3).join(", "), h = u.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", "data-testid": "tag-pills", children: u.map((x) => /* @__PURE__ */ e(
    "span",
    {
      className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded-full px-1.5 py-0.5 text-text-secondary whitespace-nowrap",
      children: x
    },
    x
  )) }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: m ? `Candidates: ${m}…` : "Open-vocabulary tagging" }), g = r.model ?? "claude-haiku-4-5";
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function is(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", p = a?.output?.extracted?.lines ?? [], u = p[0], m = p.length > 0 ? /* @__PURE__ */ o("div", { "data-testid": "extract-text-result", children: [
    /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary mb-0.5", children: [
      p.length,
      " line",
      p.length !== 1 ? "s" : ""
    ] }),
    /* @__PURE__ */ e(
      "div",
      {
        className: "font-mono text-[11px] text-text-primary whitespace-nowrap overflow-hidden text-ellipsis",
        "data-testid": "extract-text-first-line",
        children: u
      }
    )
  ] }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: "Awaiting OCR" }), h = r.model ?? "claude-sonnet-4-6";
  return /* @__PURE__ */ o(
    be,
    {
      icon: "📝",
      subtitle: h,
      state: c,
      category: ge("image:vision-extract-text"),
      body: m,
      selected: i,
      ariaLabel: `Vision Extract Text node, model: ${h}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function ss(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
const ls = (t) => t.stopPropagation();
function cs(t) {
  const { id: n, data: r, selected: i } = t, a = Re(), [s, d] = S(!1), c = he(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", m = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && m.length === 0, x = (r.numImages ?? 1) > 1 || m.length > 1;
  let f;
  if (m.length > 0 && x)
    f = /* @__PURE__ */ e(mn, { images: m, "data-testid": "generate-thumb-strip" });
  else if (g || m.length === 1) {
    const w = m[0] ? a(m[0].imageId) : void 0;
    f = /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          "data-testid": "generate-output-preview",
          "aria-label": w ? "View generated image" : "Image synthesizing",
          className: I(
            "block w-full rounded-md border-none bg-transparent p-0",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-info",
            w ? "cursor-zoom-in" : "cursor-default"
          ),
          onMouseDown: ls,
          onClick: (y) => {
            y.stopPropagation(), w && d(!0);
          },
          children: /* @__PURE__ */ e(
            tr,
            {
              status: g ? "synthesizing" : "done",
              ...w ? { src: w } : {},
              alt: "Generate output",
              ...g && Number.isFinite(h) ? { startedAt: h } : {},
              className: "w-full h-20"
            }
          )
        }
      ),
      w && /* @__PURE__ */ e(
        kt,
        {
          images: [{ src: w, alt: "Generate output" }],
          openIndex: s ? 0 : null,
          onClose: () => d(!1)
        }
      )
    ] });
  } else
    f = /* @__PURE__ */ e(
      "div",
      {
        className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
        "data-testid": "generate-placeholder",
        children: ss(r.prompt)
      }
    );
  const v = (r.numImages ?? 1) > 1 ? `×${r.numImages}` : null, N = r.width && r.height ? `${r.width}×${r.height}` : null, b = v || N ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-tertiary", children: [N, v].filter(Boolean).join(" · ") }) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "✦",
      subtitle: "image:generate",
      state: u,
      category: ge("image:generate"),
      body: f,
      footer: b,
      selected: i,
      ariaLabel: `Generate node, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
const ds = (t) => t.stopPropagation();
function ps(t) {
  const { id: n, data: r, selected: i } = t, a = Re(), [s, d] = S(!1), c = he(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", m = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && m.length === 0, x = r.numVariations ?? 1, f = x > 1 || m.length > 1, v = /* @__PURE__ */ o("span", { className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary mb-1", children: [
    "×",
    x,
    " variation",
    x !== 1 ? "s" : ""
  ] });
  let N;
  if (m.length > 0 && f)
    N = /* @__PURE__ */ e(mn, { images: m, "data-testid": "variation-thumb-strip" });
  else if (g || m.length === 1) {
    const y = m[0] ? a(m[0].imageId) : void 0;
    N = /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ e(
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
          onMouseDown: ds,
          onClick: (k) => {
            k.stopPropagation(), y && d(!0);
          },
          children: /* @__PURE__ */ e(
            tr,
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
      y && /* @__PURE__ */ e(
        kt,
        {
          images: [{ src: y, alt: "Variation output" }],
          openIndex: s ? 0 : null,
          onClose: () => d(!1)
        }
      )
    ] });
  } else
    N = /* @__PURE__ */ e(
      "div",
      {
        className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
        "data-testid": "variation-placeholder",
        children: "Awaiting input"
      }
    );
  const b = /* @__PURE__ */ o("div", { children: [
    v,
    N
  ] }), w = r.similarity != null ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
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
      footer: w,
      selected: i,
      ariaLabel: `Variation node, ${x} variations, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function us(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
const ms = (t) => t.stopPropagation();
function hs(t) {
  const { id: n, data: r, selected: i } = t, a = Re(), [s, d] = S(!1), c = he(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", m = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && m.length === 0, x = m.length > 1;
  let f;
  if (x)
    f = /* @__PURE__ */ e(mn, { images: m, "data-testid": "edit-prompt-thumb-strip" });
  else if (g || m.length === 1) {
    const N = m[0] ? a(m[0].imageId) : void 0;
    f = /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          "data-testid": "edit-prompt-output-preview",
          "aria-label": N ? "View edited image" : "Image synthesizing",
          className: I(
            "block w-full rounded-md border-none bg-transparent p-0",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-info",
            N ? "cursor-zoom-in" : "cursor-default"
          ),
          onMouseDown: ms,
          onClick: (b) => {
            b.stopPropagation(), N && d(!0);
          },
          children: /* @__PURE__ */ e(
            tr,
            {
              status: g ? "synthesizing" : "done",
              ...N ? { src: N } : {},
              alt: "Edit output",
              ...g && Number.isFinite(h) ? { startedAt: h } : {},
              className: "w-full h-20"
            }
          )
        }
      ),
      N && /* @__PURE__ */ e(
        kt,
        {
          images: [{ src: N, alt: "Edit output" }],
          openIndex: s ? 0 : null,
          onClose: () => d(!1)
        }
      )
    ] });
  } else
    f = /* @__PURE__ */ e(
      "div",
      {
        className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
        "data-testid": "edit-prompt-placeholder",
        children: us(r.prompt)
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
      body: f,
      footer: v,
      selected: i,
      ariaLabel: `Edit Prompt node, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
const fs = {
  trigger: ci,
  llm: ui,
  transform: hi,
  condition: gi,
  action: bi,
  fork: yi,
  join: wi,
  approval: Ci,
  agent: Ii,
  "mcp-tool": Si,
  "knowledge-base": $i,
  "graph-query": Ti,
  memory: Ri,
  guardrail: Pi,
  policy: Ai,
  "ag-ui-output": Mi,
  "image-source": Oi,
  "image:save": Ei,
  scatter: Li,
  "image:resize": Bi,
  "image:transform": Fi,
  "image:format-convert": zi,
  "image:sharpen": qi,
  "image:watermark": Wi,
  "image:crop": Ki,
  "image:adjust-bw": Hi,
  "image:adjust-layer": Gi,
  "image:dimensions": Yi,
  "image:upscale": Xi,
  "image:vision-analyze": ns,
  "image:vision-classify": rs,
  "image:vision-describe": os,
  "image:vision-tag": as,
  "image:vision-extract-text": is,
  "image:generate": cs,
  "image:variation": ps,
  "image:edit-prompt": hs
}, gs = "#c4b5fd";
function xs(t) {
  switch (t) {
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
function bs({
  id: t,
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
  const u = c ?? {}, m = ar(), [h, g, x] = Ua({
    sourceX: n,
    sourceY: r,
    targetX: i,
    targetY: a,
    sourcePosition: s,
    targetPosition: d
  }), f = xs(u.state), v = (u.state ?? "default") === "default", N = u.payload, b = f.animate && !m;
  let w = f.stroke, y = f.strokeWidth, k = b ? f.strokeDasharray : void 0;
  N === "image" ? (y = 2.5, v && (w = gs)) : N === "control" && (y = 1.5, v && (k = "2 4"));
  const C = u.volume, $ = typeof C == "number" && C >= 2;
  $ && (y = Math.min(4, y + Math.log2(C)));
  const D = p ? "#646cff" : w, A = p ? Math.max(2.5, y) : y, M = N === "image" && u.state === "active" && !m;
  return /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e(
      "path",
      {
        d: h,
        fill: "none",
        stroke: "transparent",
        strokeWidth: 12,
        className: "[pointer-events:stroke]"
      }
    ),
    /* @__PURE__ */ e(
      "path",
      {
        id: t,
        d: h,
        fill: "none",
        stroke: D,
        strokeWidth: A,
        strokeDasharray: k,
        markerEnd: l,
        className: "pointer-events-none",
        children: b ? /* @__PURE__ */ e(
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
    M ? /* @__PURE__ */ e("circle", { r: 3, fill: D, className: "pointer-events-none", children: /* @__PURE__ */ e("animateMotion", { dur: "1.2s", repeatCount: "indefinite", path: h }) }) : null,
    u.label ? /* @__PURE__ */ e(xr, { children: /* @__PURE__ */ e(
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
    $ ? /* @__PURE__ */ e(xr, { children: /* @__PURE__ */ e(
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
function yt(t, n, r) {
  const i = ce(n);
  i.current = n, re(() => {
    if (r === !1) return;
    const a = (s) => {
      t.current && !t.current.contains(s.target) && i.current();
    };
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [t, r]);
}
const ys = [
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
function vs(t, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return t.type.toLowerCase().includes(r) || t.name.toLowerCase().includes(r) || t.description.toLowerCase().includes(r);
}
function Ns({
  anchor: t,
  flowPosition: n,
  disabledTypes: r = [],
  onClose: i,
  onInsert: a
}) {
  const [s, d] = S(""), [c, l] = S(0), p = ce(null), u = ce(null), m = q(() => new Set(r), [r]), h = q(
    () => ys.filter((f) => !m.has(f.type) && vs(f, s)),
    [m, s]
  );
  if (re(() => {
    l((f) => f >= h.length ? 0 : f);
  }, [h.length]), re(() => {
    if (t) {
      const f = setTimeout(() => u.current?.focus(), 0);
      return () => clearTimeout(f);
    }
  }, [t]), yt(p, i, !!t), !t) return null;
  const g = (f) => {
    const v = h[f];
    !v || !n || (a(v.type, n), i());
  }, x = (f) => {
    if (f.key === "ArrowDown") {
      if (f.preventDefault(), h.length === 0) return;
      l((v) => (v + 1) % h.length);
    } else if (f.key === "ArrowUp") {
      if (f.preventDefault(), h.length === 0) return;
      l((v) => (v - 1 + h.length) % h.length);
    } else f.key === "Enter" ? (f.preventDefault(), g(c)) : f.key === "Escape" && (f.preventDefault(), i());
  };
  return /* @__PURE__ */ o(
    "div",
    {
      ref: p,
      className: "fixed w-[260px] bg-white border border-[#e2e8f0] rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] z-50 flex flex-col overflow-hidden font-inherit",
      style: { top: t.y, left: t.x },
      role: "dialog",
      "aria-label": "Quick insert node",
      "data-testid": "quick-insert-popover",
      children: [
        /* @__PURE__ */ e("div", { className: "p-2 border-b border-[#e2e8f0]", children: /* @__PURE__ */ e(
          "input",
          {
            ref: u,
            type: "text",
            value: s,
            onChange: (f) => d(f.target.value),
            onKeyDown: x,
            placeholder: "Search nodes…",
            className: "w-full box-border border border-[#d1d5db] rounded-md px-2.5 py-1.5 text-[13px] font-inherit bg-[#f9fafb] text-[#0f172a] outline-none",
            "aria-label": "Search node types",
            "data-testid": "quick-insert-search"
          }
        ) }),
        /* @__PURE__ */ e("div", { className: "max-h-[260px] overflow-y-auto py-1", role: "listbox", children: h.length === 0 ? /* @__PURE__ */ o("div", { className: "px-3 py-3.5 text-xs text-[#94a3b8] font-inherit", children: [
          'No nodes match "',
          s,
          '"'
        ] }) : h.map((f, v) => {
          const N = v === c;
          return /* @__PURE__ */ o(
            "div",
            {
              role: "option",
              "aria-selected": N,
              onMouseEnter: () => l(v),
              onMouseDown: (b) => {
                b.preventDefault(), g(v);
              },
              className: I(
                "flex items-center gap-2.5 px-3 py-2 cursor-pointer font-inherit",
                N ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              "data-node-type": f.type,
              "data-testid": `quick-insert-row-${f.type}`,
              children: [
                /* @__PURE__ */ e("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: f.icon }),
                /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-[#0f172a]", children: f.name }),
                  /* @__PURE__ */ e("div", { className: "text-[11px] text-[#475569] whitespace-nowrap overflow-hidden text-ellipsis", children: f.description })
                ] })
              ]
            },
            f.type
          );
        }) })
      ]
    }
  );
}
function ws({
  addNode: t,
  addEdge: n,
  updateNodeData: r,
  getDefinition: i
}) {
  re(() => {
  }, [t, n, r, i]);
}
function ks({
  definition: t,
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
  re(() => {
    const m = u.current;
    if (!m) return;
    const h = (x) => {
      const f = m.querySelector(
        `.react-flow__node[data-id="${CSS.escape(x)}"]`
      );
      return f ? ((f.querySelector('[data-pipeline-node="true"]') ?? f).focus(), !0) : !1;
    }, g = (x) => {
      if (cr(x.target)) return;
      const f = document.activeElement, v = !!f && m.contains(f);
      if (x.key === "Tab") {
        if (!v || !t || t.nodes.length === 0) return;
        const N = Ws(t);
        if (N.length === 0) return;
        const w = f?.closest(".react-flow__node")?.getAttribute("data-id") ?? null, y = w !== null ? N.indexOf(w) : -1, k = x.shiftKey ? -1 : 1, C = y === -1 ? x.shiftKey ? N.length - 1 : 0 : (y + k + N.length) % N.length, $ = N[C];
        h($) && x.preventDefault();
        return;
      }
      if (v && !x.altKey) {
        if (x.key === "Enter" || x.key === " " || x.key === "Spacebar") {
          const b = f?.closest(".react-flow__node")?.getAttribute("data-id");
          b && (x.preventDefault(), r(b));
          return;
        }
        if (x.key === "Delete" || x.key === "Backspace") {
          if (n) {
            x.preventDefault(), i(n);
            return;
          }
          d((N) => {
            const b = N.filter((w) => w.selected);
            if (b.length === 0) return N;
            for (const w of b) a(w.id);
            return N.filter((w) => !w.selected);
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
          const N = l([p.current]);
          N.length > 0 && r(N[0]);
          return;
        }
        if ((x.metaKey || x.ctrlKey) && x.key === "d" && n) {
          x.preventDefault();
          const N = l([n]);
          N.length > 0 && r(N[0]);
          return;
        }
        if (x.key === "ArrowUp" || x.key === "ArrowDown" || x.key === "ArrowLeft" || x.key === "ArrowRight") {
          if (x.preventDefault(), x.stopPropagation(), !x.shiftKey || !n) return;
          const N = 8, b = x.key === "ArrowLeft" ? -N : x.key === "ArrowRight" ? N : 0, w = x.key === "ArrowUp" ? -N : x.key === "ArrowDown" ? N : 0;
          s((y) => {
            const k = y.map(
              ($) => $.id === n ? {
                ...$,
                position: {
                  x: $.position.x + b,
                  y: $.position.y + w
                }
              } : $
            ), C = k.find(($) => $.id === n);
            return C && c([{ id: C.id, position: C.position }]), k;
          });
        }
      }
    };
    return m.addEventListener("keydown", g), () => m.removeEventListener("keydown", g);
  }, [t, n, r, i, a, s, d, c, l, p, u]);
}
function Cs({
  addNode: t,
  screenToFlowPosition: n
}) {
  const r = O((a) => {
    a.preventDefault(), a.dataTransfer.dropEffect = "move";
  }, []), i = O(
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
      t(c, l);
    },
    [t, n]
  );
  return { handleDragOver: r, handleDrop: i };
}
function Is({
  nodeMenu: t,
  breakpoints: n,
  showBreakpointOption: r,
  onFilterLog: i,
  onCopyNodeId: a,
  onDuplicate: s,
  onToggleBreakpoint: d,
  onDismiss: c
}) {
  re(() => {
    const p = (m) => {
      m.target?.closest('[data-testid="canvas-node-context-menu"]') || c();
    }, u = (m) => {
      m.key === "Escape" && c();
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
      style: { top: t.y, left: t.x },
      children: [
        /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(
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
        r ? /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: d,
            "data-testid": "ctx-toggle-breakpoint",
            className: I(
              l,
              n?.has(t.nodeId) ? "text-[#dc2626]" : "text-[#0f172a]"
            ),
            children: n?.has(t.nodeId) ? "🔴 Remove Breakpoint" : "🔴 Toggle Breakpoint"
          }
        ) : null
      ]
    }
  );
}
const Ss = [
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
], $s = [
  { key: "source", name: "Sources" },
  { key: "transform", name: "Transform" },
  { key: "ai", name: "AI" },
  { key: "control", name: "Control" },
  { key: "sink", name: "Sinks" },
  { key: "human", name: "Human" }
], xn = {
  source: "bg-cat-source",
  transform: "bg-cat-transform",
  ai: "bg-cat-ai",
  control: "bg-cat-control",
  sink: "bg-cat-sink",
  human: "bg-cat-human"
}, Ut = $s.map(({ key: t, name: n }) => ({
  key: t,
  name: n,
  items: Ss.filter((r) => ge(r.type) === t).map((r) => ({ ...r, category: n, nodeCategory: t }))
})).filter((t) => t.items.length > 0), Ts = Ut.flatMap((t) => t.items.map((n) => ({ type: n.type, name: n.name }))), Rs = Ut.map((t) => t.name), lr = "pipeline.palette.recents", Ps = 5, Nr = "pipeline.palette.compact";
function Vn() {
  if (typeof window > "u") return [];
  try {
    const t = window.localStorage.getItem(lr);
    if (!t) return [];
    const n = JSON.parse(t);
    return Array.isArray(n) ? n : [];
  } catch {
    return [];
  }
}
function As(t) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(lr, JSON.stringify(t));
    } catch {
    }
}
function rf(t) {
  const n = Vn().filter((i) => i !== t), r = [t, ...n].slice(0, Ps);
  As(r);
}
const Ho = "pipeline.palette.collapsed.";
function Ms(t) {
  if (typeof window > "u") return !1;
  try {
    return window.localStorage.getItem(Ho + t) === "true";
  } catch {
    return !1;
  }
}
function Ds(t, n) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(Ho + t, String(n));
    } catch {
    }
}
function Os(t, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return t.name.toLowerCase().includes(r) || t.type.toLowerCase().includes(r) || t.description.toLowerCase().includes(r);
}
function wr({ expanded: t }) {
  return /* @__PURE__ */ e(
    "svg",
    {
      width: "12",
      height: "12",
      viewBox: "0 0 12 12",
      fill: "none",
      "aria-hidden": "true",
      className: I("shrink-0 transition-transform duration-150", t ? "rotate-90" : "rotate-0"),
      children: /* @__PURE__ */ e(
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
function Es({ disabledTypes: t = [] }) {
  const [n, r] = S(""), [i, a] = S(/* @__PURE__ */ new Set()), [s, d] = S(null), [c, l] = S(() => Vn()), [p, u] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem(Nr) === "true";
    } catch {
      return !1;
    }
  }), [m, h] = S(() => {
    const R = {};
    for (const H of Ut)
      R[H.name] = Ms(H.name);
    return R;
  }), g = q(() => new Set(t), [t]);
  re(() => {
    const R = (H) => {
      H.key === lr && l(Vn());
    };
    return window.addEventListener("storage", R), () => window.removeEventListener("storage", R);
  }, []), re(() => {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(Nr, String(p));
      } catch {
      }
  }, [p]);
  const x = O((R) => {
    a((H) => {
      const X = new Set(H);
      return X.has(R) ? X.delete(R) : X.add(R), X;
    });
  }, []), f = O(() => {
    r(""), a(/* @__PURE__ */ new Set());
  }, []), v = O((R) => {
    h((H) => {
      const X = { ...H, [R]: !H[R] };
      return Ds(R, X[R]), X;
    });
  }, []), N = q(() => {
    const R = /* @__PURE__ */ new Map();
    for (const H of Ut)
      for (const X of H.items) R.set(X.type, X);
    return R;
  }, []), b = q(
    () => c.map((R) => N.get(R)).filter(Boolean),
    [c, N]
  ), w = q(() => Ut.map((R) => {
    const H = i.size > 0 && !i.has(R.name) ? [] : R.items.filter((X) => Os(X, n));
    return { ...R, items: H };
  }).filter((R) => R.items.length > 0), [n, i]), y = q(() => {
    const R = /* @__PURE__ */ new Set(), H = [];
    if (!n && i.size === 0)
      for (const X of b)
        H.push(X), R.add(X.type);
    for (const X of w)
      for (const J of X.items)
        R.has(J.type) || (H.push(J), R.add(J.type));
    return H;
  }, [b, w, n, i]), k = ce(y);
  re(() => {
    k.current = y;
  }, [y]);
  const C = w.length === 0 && (n !== "" || i.size > 0), $ = (R) => (H) => {
    if (g.has(R.type)) {
      H.preventDefault();
      return;
    }
    H.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: R.type })
    ), H.dataTransfer.effectAllowed = "move";
  }, D = Oo(), A = (R, H) => {
    const X = g.has(R.type), J = !D(R.type), Q = s === R.type && !X, E = H !== null && H < 9 ? H + 1 : null;
    return p ? /* @__PURE__ */ o(
      "div",
      {
        draggable: !X,
        onDragStart: $(R),
        onMouseEnter: () => d(R.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-8 box-border my-px mx-2 px-2 flex items-center gap-2 rounded font-[inherit]",
          X ? "cursor-not-allowed opacity-45" : "cursor-grab",
          Q ? "bg-surface-hover" : "bg-transparent"
        ),
        title: X ? `${R.name} is already placed` : J ? `${R.name} — preview: this deployment has no executor for it yet, so the step will not run.` : E ? `${R.description} — press ${E}` : R.description,
        "data-preview": J || void 0,
        "data-node-type": R.type,
        "data-disabled": X || void 0,
        "data-testid": `palette-item-${R.type}`,
        children: [
          /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": !0,
              "data-testid": `palette-accent-${R.type}`,
              className: I("w-1.5 h-1.5 rounded-full shrink-0", R.nodeCategory && xn[R.nodeCategory])
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-base leading-none w-5 text-center shrink-0", "aria-hidden": !0, children: R.icon }),
          /* @__PURE__ */ e("span", { className: I("text-[12px] font-medium text-text-primary truncate", X && "line-through"), children: R.name }),
          E !== null && /* @__PURE__ */ e(
            "kbd",
            {
              "data-testid": `palette-shortcut-${R.type}`,
              className: I(
                "ml-auto text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                X && "opacity-50"
              ),
              children: E
            }
          )
        ]
      },
      R.type
    ) : /* @__PURE__ */ o(
      "div",
      {
        draggable: !X,
        onDragStart: $(R),
        onMouseEnter: () => d(R.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-11 box-border my-0.5 mx-2 py-1.5 px-2.5 flex items-center gap-2.5 rounded-md border border-transparent font-[inherit]",
          X ? "cursor-not-allowed opacity-45" : "cursor-grab",
          Q ? "bg-surface-panel" : "bg-transparent"
        ),
        title: X ? `${R.name} is already placed` : J ? `${R.name} — preview: this deployment has no executor for it yet, so the step will not run.` : E ? `${R.description} — press ${E}` : R.description,
        "data-preview": J || void 0,
        "data-node-type": R.type,
        "data-disabled": X || void 0,
        "data-testid": `palette-item-${R.type}`,
        children: [
          /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": !0,
              "data-testid": `palette-accent-${R.type}`,
              className: I("w-1.5 h-1.5 rounded-full shrink-0", R.nodeCategory && xn[R.nodeCategory])
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: R.icon }),
          /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ o("div", { className: I("text-[13px] font-semibold text-text-primary flex items-center gap-1.5", X && "line-through"), children: [
              /* @__PURE__ */ e("span", { className: "truncate", children: R.name }),
              J && /* @__PURE__ */ e(
                "span",
                {
                  "data-testid": `palette-preview-${R.type}`,
                  className: "shrink-0 rounded-full border border-warning-border bg-warning-bg px-1.5 text-[9px] font-semibold uppercase tracking-wide text-warning-fg",
                  title: "No executor handler in this deployment",
                  children: "preview"
                }
              ),
              E !== null && /* @__PURE__ */ e(
                "kbd",
                {
                  "data-testid": `palette-shortcut-${R.type}`,
                  className: I(
                    "text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                    X && "opacity-50"
                  ),
                  children: E
                }
              )
            ] }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-neutral truncate", children: X ? "Placed" : J ? "Preview — no executor" : R.description })
          ] })
        ]
      },
      R.type
    );
  }, M = b.length > 0 && !n && i.size === 0;
  let ne = 0;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "w-[220px] shrink-0 h-full border-r border-border bg-white flex flex-col",
      "data-testid": "node-palette",
      children: [
        /* @__PURE__ */ o("div", { className: "shrink-0 border-b border-border", children: [
          /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 py-2.5 px-3", children: [
            /* @__PURE__ */ e(
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
            /* @__PURE__ */ e(
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
                  /* @__PURE__ */ e("rect", { x: "1", y: "2", width: "12", height: "2", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ e("rect", { x: "1", y: "6", width: "12", height: "2", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ e("rect", { x: "1", y: "10", width: "12", height: "2", rx: "1", fill: "currentColor" })
                ] }) : /* @__PURE__ */ o("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", "aria-hidden": "true", children: [
                  /* @__PURE__ */ e("rect", { x: "1", y: "1", width: "5", height: "5", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ e("rect", { x: "8", y: "1", width: "5", height: "5", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ e("rect", { x: "1", y: "8", width: "5", height: "5", rx: "1", fill: "currentColor" }),
                  /* @__PURE__ */ e("rect", { x: "8", y: "8", width: "5", height: "5", rx: "1", fill: "currentColor" })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ e(
            "div",
            {
              className: "flex flex-wrap gap-1 px-3 pb-2.5",
              "data-testid": "palette-category-chips",
              children: Rs.map((R) => /* @__PURE__ */ e(
                Wa,
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
                "aria-expanded": !m.__recents__,
                children: [
                  /* @__PURE__ */ e(wr, { expanded: !m.__recents__ }),
                  "Recently used"
                ]
              }
            ),
            !m.__recents__ && /* @__PURE__ */ e("div", { children: b.map((R) => {
              const H = ne++;
              return A(R, H);
            }) })
          ] }),
          C ? /* @__PURE__ */ o(
            "div",
            {
              className: "flex flex-col items-center gap-3 px-4 py-8 text-center",
              "data-testid": "palette-empty",
              children: [
                /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: "No nodes match" }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    onClick: f,
                    "data-testid": "palette-clear-filters",
                    className: "text-[11px] font-semibold text-info-fg hover:underline",
                    children: "Clear filters"
                  }
                )
              ]
            }
          ) : w.map((R) => {
            const H = !!m[R.name];
            return /* @__PURE__ */ o("div", { "data-testid": `palette-category-${R.name}`, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => v(R.name),
                  className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
                  "aria-expanded": !H,
                  children: [
                    /* @__PURE__ */ e(wr, { expanded: !H }),
                    /* @__PURE__ */ e(
                      "span",
                      {
                        "aria-hidden": !0,
                        "data-testid": `palette-section-accent-${R.key}`,
                        className: I("w-1.5 h-1.5 rounded-full shrink-0", xn[R.key])
                      }
                    ),
                    R.name
                  ]
                }
              ),
              !H && /* @__PURE__ */ e("div", { children: R.items.map((X) => {
                const J = ne++;
                return A(X, J);
              }) })
            ] }, R.name);
          })
        ] }),
        /* @__PURE__ */ e("div", { className: "py-2 px-3 border-t border-border text-[10px] text-text-tertiary font-[inherit] shrink-0", children: "Press 1–9 to insert at center" })
      ]
    }
  );
}
function _s({
  definition: t,
  addNode: n,
  screenToFlowPosition: r,
  containerRef: i
}) {
  return re(() => {
    const a = (s) => {
      if (!cr(s.target) && !(s.metaKey || s.ctrlKey || s.altKey) && /^[1-8]$/.test(s.key)) {
        const d = Number(s.key) - 1, c = Ts[d];
        if (!c || c.type === "trigger" && t?.nodes.some((g) => g.type === "trigger"))
          return;
        const p = i.current?.getBoundingClientRect(), u = p ? r({
          x: p.left + p.width / 2,
          y: p.top + p.height / 2
        }) : { x: 0, y: 0 };
        let { x: m, y: h } = u;
        if (t)
          for (const g of t.nodes)
            Math.abs(g.position.x - m) < 16 && Math.abs(g.position.y - h) < 16 && (m += 24, h += 24);
        n(c.type, { x: m, y: h }), s.preventDefault();
      }
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [n, t, r, i]), null;
}
const Ls = 280, Bs = 120, Us = 40, Fs = 40;
function js(t, n) {
  const r = Ls, i = Bs, a = Us, s = Fs;
  if (t.nodes.length === 0) return [];
  const d = /* @__PURE__ */ new Map();
  for (const v of t.nodes)
    d.set(v.id, []);
  for (const v of t.edges) {
    const N = d.get(v.source);
    N && d.has(v.target) && N.push(v.target);
  }
  const l = t.nodes.filter((v) => v.type === "trigger").map((v) => v.id).sort()[0], p = /* @__PURE__ */ new Map();
  if (l !== void 0) {
    const v = [l];
    for (p.set(l, 0); v.length > 0; ) {
      const N = v.shift(), b = p.get(N), w = d.get(N) ?? [];
      for (const y of w)
        p.has(y) || (p.set(y, b + 1), v.push(y));
    }
  }
  const u = /* @__PURE__ */ new Map();
  let m = -1;
  for (const v of t.nodes) {
    const N = p.get(v.id);
    N !== void 0 && (u.has(N) || u.set(N, []), u.get(N).push(v.id), N > m && (m = N));
  }
  for (const v of u.values())
    v.sort();
  const h = t.nodes.filter((v) => !p.has(v.id)).map((v) => v.id).sort(), g = m >= 0 ? m + 1 : 0;
  h.length > 0 && u.set(g, h);
  const x = [], f = [...u.keys()].sort((v, N) => v - N);
  for (const v of f) {
    const N = u.get(v), b = N.length, w = a + v * r;
    for (let y = 0; y < b; y++) {
      const k = s + (y - b / 2) * i;
      x.push({ id: N[y], position: { x: w, y: k } });
    }
  }
  return x;
}
function zs({
  definition: t,
  setPositions: n,
  fitView: r
}) {
  const i = O(() => {
    r({ padding: 0.15, duration: 500 });
  }, [r]), a = O(() => {
    if (!t) return;
    const s = js(t);
    s.length !== 0 && (n(s), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => r({ padding: 0.15, duration: 500 })) : r({ padding: 0.15, duration: 500 }));
  }, [t, n, r]);
  return { handleFitView: i, handleAutoArrange: a };
}
function qs({
  definition: t,
  setPositions: n,
  fitView: r
}) {
  const { handleFitView: i, handleAutoArrange: a } = zs({
    definition: t,
    setPositions: n,
    fitView: r
  });
  return re(() => {
    const s = (d) => {
      const c = d.target;
      if (!(c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable)) && d.shiftKey && (d.key === "A" || d.key === "a")) {
        if (d.metaKey || d.ctrlKey || d.altKey) return;
        d.preventDefault(), a();
      }
    };
    return window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s);
  }, [a]), /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: a,
        className: "absolute top-3 right-[50px] z-[5] w-8 h-8 inline-flex items-center justify-center bg-white border border-[#e2e8f0] rounded-md shadow-sm text-[#475569] cursor-pointer p-0 font-inherit text-sm leading-none",
        title: "Auto-arrange (Shift+A)",
        "aria-label": "Auto-arrange",
        "data-testid": "auto-arrange-btn",
        children: /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ e(
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
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: i,
        className: "absolute top-3 right-3 z-[5] w-8 h-8 inline-flex items-center justify-center bg-white border border-[#e2e8f0] rounded-md shadow-sm text-[#475569] cursor-pointer p-0 font-inherit text-sm leading-none",
        title: "Fit view",
        "aria-label": "Fit view",
        children: /* @__PURE__ */ e("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ e(
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
const Jo = 0.1, kr = { padding: 0.15, minZoom: Jo, maxZoom: 1 };
function cr(t) {
  if (!t || !(t instanceof HTMLElement)) return !1;
  const n = t.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || t.isContentEditable);
}
function Ws(t) {
  if (t.nodes.length === 0) return [];
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const s of t.nodes)
    n.set(s.id, []), r.set(s.id, 0);
  for (const s of t.edges)
    !n.has(s.source) || !r.has(s.target) || (n.get(s.source).push(s.target), r.set(s.target, (r.get(s.target) ?? 0) + 1));
  const i = [], a = t.nodes.filter((s) => (r.get(s.id) ?? 0) === 0).map((s) => s.id).sort();
  for (; a.length > 0; ) {
    const s = a.shift();
    i.push(s);
    const d = (n.get(s) ?? []).slice().sort();
    for (const c of d) {
      const l = (r.get(c) ?? 0) - 1;
      r.set(c, l), l === 0 && a.push(c);
    }
  }
  if (i.length < t.nodes.length) {
    const s = new Set(i), d = t.nodes.filter((c) => !s.has(c.id)).map((c) => c.id).sort();
    i.push(...d);
  }
  return i;
}
const Vs = { animated: bs }, Ks = fs;
function Hs(t) {
  return {
    id: t.id,
    type: t.type,
    position: t.position,
    data: { ...t.data, nodeType: t.type }
  };
}
function Js(t) {
  const n = t.sourceHandle === "true" || t.sourceHandle === "false" || t.sourceHandle === "approved" || t.sourceHandle === "rejected" || t.sourceHandle === "error" || /^branch-\d+$/.test(t.sourceHandle) ? t.sourceHandle : void 0;
  return {
    id: t.id,
    source: t.source,
    sourceHandle: t.sourceHandle,
    target: t.target,
    targetHandle: t.targetHandle,
    type: "animated",
    data: { state: "default", label: n }
  };
}
function Gs({ onFilterLog: t, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: i, replayNodeClasses: a, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c }) {
  const {
    definition: l,
    addNode: p,
    setPositions: u,
    addEdge: m,
    removeEdge: h,
    removeNode: g,
    duplicateNodes: x,
    selectedNodeId: f,
    setSelectedNodeId: v,
    updateNodeData: N
  } = qe(), { screenToFlowPosition: b, fitView: w } = ja(), y = ce(!1), k = O((Z) => {
    Z && (y.current = !0);
  }, []);
  re(() => {
    const Z = Q.current;
    if (!Z || typeof ResizeObserver > "u") return;
    let ae = { w: Z.clientWidth, h: Z.clientHeight };
    const ue = new ResizeObserver(() => {
      const xe = Z.clientWidth, Se = Z.clientHeight;
      xe === 0 || Se === 0 || Math.abs(xe - ae.w) < 2 && Math.abs(Se - ae.h) < 2 || (ae = { w: xe, h: Se }, !y.current && w(kr));
    });
    return ue.observe(Z), () => ue.disconnect();
  }, [w]), ws({
    addNode: p,
    addEdge: m,
    updateNodeData: N,
    getDefinition: () => l
  });
  const [C, $, D] = jo([]), [A, M, ne] = zo([]), [R, H] = S(!0), [X, J] = S(!0), Q = ce(null), E = ce(null), [P, G] = S(null), [j, _] = S(null), W = O(
    (Z, ae) => {
      Z.preventDefault(), _({ nodeId: ae.id, x: Z.clientX, y: Z.clientY });
    },
    []
  ), V = O(() => {
    j && (t?.(j.nodeId), _(null));
  }, [j, t]), Y = O(() => {
    if (!j) return;
    const Z = j.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(Z).catch(() => {
    }), _(null);
  }, [j]), me = O(() => {
    j && (d?.(j.nodeId), _(null));
  }, [j, d]), z = O(() => {
    if (!j) return;
    const Z = x([j.nodeId]);
    Z.length > 0 && v(Z[0]), _(null);
  }, [j, x, v]), de = O(() => _(null), []);
  re(() => {
    if (!l) {
      $([]), M([]);
      return;
    }
    $((Z) => {
      const ae = new Map(Z.map((ue) => [ue.id, ue]));
      return l.nodes.map((ue) => {
        const xe = ae.get(ue.id), Se = Hs(ue);
        return s && s.size > 0 && (Se.data._hasBreakpoint = s.has(ue.id)), c && (Se.data._pausedAtBreakpoint = ue.id === c), xe ? { ...xe, ...Se, selected: xe.selected } : Se;
      });
    }), M(() => l.edges.map(Js));
  }, [l, s, c, $, M]), re(() => {
    if (!n) {
      r?.(null);
      return;
    }
    $(
      (Z) => Z.map((ae) => ({
        ...ae,
        className: ae.id === n ? "node-error" : ae.className?.replace("node-error", "").trim() || void 0
      }))
    ), requestAnimationFrame(() => {
      const Z = Q.current;
      if (!Z) return;
      const ae = Z.querySelector(
        `.react-flow__node[data-id="${CSS.escape(n)}"]`
      );
      if (!ae) {
        r?.(null);
        return;
      }
      const ue = ae.getBoundingClientRect();
      r?.({ x: ue.right, y: ue.top + ue.height / 2 });
    });
  }, [n, $, r]), re(() => {
    a && $(
      (Z) => Z.map((ae) => {
        const ue = a[ae.id] ?? "", Se = [ae.id === n ? "node-error" : "", ue].filter(Boolean).join(" ") || void 0;
        let Le;
        ue === "node-replay-active" ? Le = "running" : ue === "node-replay-completed" ? Le = "completed" : ue === "node-replay-failed" && (Le = "failed");
        const T = { ...ae.data };
        return Le ? T._state = Le : T._state = "idle", { ...ae, className: Se, data: T };
      })
    );
  }, [a, n, $]), re(() => {
    i && M(
      (Z) => Z.map((ae) => {
        const ue = i[ae.id];
        if (!ue) return ae;
        const xe = ae.data ?? {};
        return xe.state === ue ? ae : { ...ae, data: { ...xe, state: ue } };
      })
    );
  }, [i, M]);
  const we = O(
    (Z) => {
      D(Z);
      const ae = [], ue = [];
      for (const xe of Z)
        xe.type === "position" && xe.position && xe.dragging === !1 ? ae.push({ id: xe.id, position: xe.position }) : xe.type === "remove" && ue.push(xe.id);
      ae.length && u(ae);
      for (const xe of ue) g(xe);
    },
    [D, u, g]
  ), Ue = O(
    (Z) => {
      ne(Z);
      for (const ae of Z)
        ae.type === "remove" && h(ae.id);
    },
    [ne, h]
  ), Ze = O(
    (Z) => {
      if (!l || !Z.source || !Z.target) return;
      const ae = l.nodes.find((Le) => Le.id === Z.source), ue = l.nodes.find((Le) => Le.id === Z.target);
      if (!ae || !ue) return;
      const xe = Z.sourceHandle ?? "out", Se = Z.targetHandle ?? "in";
      Wn(
        ae.type,
        xe,
        ue.type,
        Se
      ) && m({
        source: Z.source,
        sourceHandle: xe,
        target: Z.target,
        targetHandle: Se
      });
    },
    [l, m]
  ), We = O(
    (Z) => {
      if (!l || !Z.source || !Z.target) return !1;
      const ae = l.nodes.find((xe) => xe.id === Z.source), ue = l.nodes.find((xe) => xe.id === Z.target);
      return !ae || !ue ? !1 : Wn(
        ae.type,
        Z.sourceHandle ?? "out",
        ue.type,
        Z.targetHandle ?? "in"
      );
    },
    [l]
  ), _e = O(
    (Z, ae) => {
      v(ae.id);
    },
    [v]
  ), Ke = O(() => {
    v(null);
  }, [v]), Ve = O(
    (Z) => {
      const ae = Z.target;
      if (!ae || !(ae.classList.contains("react-flow__pane") || ae.classList.contains("react-flow__renderer") || ae.classList.contains("react-flow__viewport") || ae.classList.contains("react-flow"))) return;
      Z.preventDefault();
      const xe = b({ x: Z.clientX, y: Z.clientY });
      G({
        anchor: { x: Z.clientX, y: Z.clientY },
        flowPosition: xe
      });
    },
    [b]
  ), He = O(() => G(null), []), Ie = O(
    (Z, ae) => {
      p(Z, ae);
    },
    [p]
  ), ye = q(() => l ? l.nodes.some((Z) => Z.type === "trigger") ? ["trigger"] : [] : [], [l]), { handleDragOver: ie, handleDrop: Pe } = Cs({
    addNode: p,
    screenToFlowPosition: b
  });
  re(() => {
    const Z = (ae) => {
      if (!cr(ae.target) && !(ae.metaKey || ae.ctrlKey || ae.altKey)) {
        if (ae.key === "m" || ae.key === "M") {
          H((ue) => !ue);
          return;
        }
        if (ae.key === "c" || ae.key === "C") {
          J((ue) => !ue);
          return;
        }
      }
    };
    return window.addEventListener("keydown", Z), () => window.removeEventListener("keydown", Z);
  }, []), ks({
    definition: l,
    selectedNodeId: f,
    setSelectedNodeId: v,
    removeNode: g,
    removeDefEdge: h,
    setNodes: $,
    setEdges: M,
    setPositions: u,
    duplicateNodes: x,
    clipboardRef: E,
    containerRef: Q
  });
  const It = O((Z) => {
    switch (Z.data?._state) {
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
      ref: Q,
      className: "flex-1 min-w-0 min-h-[520px] relative bg-[#fafbfc]",
      role: "application",
      "aria-label": "Pipeline editor canvas",
      tabIndex: 0,
      "data-testid": "pipeline-canvas",
      onDragOver: ie,
      onDrop: Pe,
      onDoubleClick: Ve,
      children: [
        /* @__PURE__ */ o(
          qo,
          {
            nodes: C,
            edges: A,
            nodeTypes: Ks,
            edgeTypes: Vs,
            onNodesChange: we,
            onEdgesChange: Ue,
            onConnect: Ze,
            isValidConnection: We,
            onNodeClick: _e,
            onNodeContextMenu: W,
            onPaneClick: Ke,
            onMoveStart: k,
            fitView: !0,
            fitViewOptions: kr,
            minZoom: Jo,
            snapToGrid: !0,
            snapGrid: [16, 16],
            edgesFocusable: !0,
            defaultEdgeOptions: { type: "smoothstep" },
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ e(
                Wo,
                {
                  variant: za.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              X ? /* @__PURE__ */ e(
                Vo,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              R ? /* @__PURE__ */ e(
                qa,
                {
                  position: "bottom-right",
                  pannable: !0,
                  zoomable: !0,
                  className: "!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]",
                  maskColor: "rgba(15, 23, 42, 0.04)",
                  nodeColor: It,
                  nodeStrokeColor: "#e2e8f0"
                }
              ) : null
            ]
          }
        ),
        P ? /* @__PURE__ */ e(
          Ns,
          {
            anchor: P.anchor,
            flowPosition: P.flowPosition,
            disabledTypes: ye,
            onClose: He,
            onInsert: Ie
          }
        ) : null,
        /* @__PURE__ */ e(
          _s,
          {
            definition: l,
            addNode: p,
            screenToFlowPosition: b,
            containerRef: Q
          }
        ),
        /* @__PURE__ */ e(
          qs,
          {
            definition: l,
            setPositions: u,
            fitView: w
          }
        ),
        j ? /* @__PURE__ */ e(
          Is,
          {
            nodeMenu: j,
            breakpoints: s,
            showBreakpointOption: !!d,
            onFilterLog: V,
            onCopyNodeId: Y,
            onDuplicate: z,
            onToggleBreakpoint: me,
            onDismiss: de
          }
        ) : null
      ]
    }
  );
}
function Ys({ onFilterLog: t, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: i, replayNodeClasses: a, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c } = {}) {
  return /* @__PURE__ */ e(Fa, { children: /* @__PURE__ */ e(
    Gs,
    {
      onFilterLog: t,
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
const Cr = {
  LLMError: { bg: "#fef2f2", fg: "#dc2626" },
  TimeoutError: { bg: "#fff7ed", fg: "#ea580c" },
  NetworkError: { bg: "#fffbeb", fg: "#d97706" },
  ValidationError: { bg: "#fefce8", fg: "#ca8a04" },
  RegistryConflict: { bg: "#faf5ff", fg: "#9333ea" },
  UnknownError: { bg: "#f1f5f9", fg: "#475569" }
};
function Xs(t) {
  switch (t) {
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
      return String(t);
  }
}
function Qs({ error: t, anchor: n, onDismiss: r, onRetry: i }) {
  const [a, s] = S(!1), [d, c] = S(!1), l = t.errorCategory ?? "UnknownError", p = Cr[l] ?? Cr.UnknownError, u = O(async () => {
    const x = [
      `Error Category: ${l}`,
      `Node ID: ${t.nodeId}`,
      `Message: ${t.message}`,
      t.stack ? `
Stack Trace:
${t.stack}` : ""
    ].filter(Boolean).join(`
`);
    try {
      typeof navigator < "u" && navigator.clipboard?.writeText && (await navigator.clipboard.writeText(x), c(!0), setTimeout(() => c(!1), 2e3));
    } catch {
    }
  }, [t, l]), m = O(() => {
    i?.();
  }, [i]), h = Math.min(n.y + 8, window.innerHeight - 440), g = Math.min(n.x + 12, window.innerWidth - 360);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "fixed z-[100] bg-white border border-[#e2e8f0] rounded-[10px] shadow-[0_12px_32px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.08)] p-0 w-[340px] max-h-[420px] overflow-y-auto font-inherit text-[#0f172a]",
      style: { top: Math.max(8, h), left: Math.max(8, g) },
      "data-testid": "error-overlay",
      role: "dialog",
      "aria-label": `Error details for node ${t.nodeId}`,
      children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 px-3.5 pt-3 pb-2.5 border-b border-[#e2e8f0]", children: [
          /* @__PURE__ */ e(
            "span",
            {
              className: "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold leading-snug",
              style: { background: p.bg, color: p.fg },
              "data-testid": "error-category-badge",
              children: Xs(l)
            }
          ),
          /* @__PURE__ */ e("span", { className: "flex-1" }),
          /* @__PURE__ */ e(
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
          /* @__PURE__ */ e("div", { className: "text-[13px] leading-normal text-[#0f172a]", children: t.message }),
          /* @__PURE__ */ o("div", { className: "text-[11px] text-[#94a3b8]", children: [
            "Failed node:",
            " ",
            /* @__PURE__ */ e("code", { className: "bg-[#f1f5f9] px-[5px] py-px rounded-[3px] font-mono text-[11px] text-[#475569]", children: t.nodeId })
          ] }),
          t.stack && /* @__PURE__ */ o("div", { children: [
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
            a && /* @__PURE__ */ e(
              "pre",
              {
                className: "mt-1.5 p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-md text-[10px] leading-normal font-mono text-[#475569] whitespace-pre-wrap break-all max-h-40 overflow-y-auto m-0",
                "data-testid": "error-stack-content",
                children: t.stack
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex gap-2 px-3.5 pt-2.5 pb-3 border-t border-[#e2e8f0]", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: u,
              className: "px-3 py-1.5 text-xs font-semibold border-none rounded-md cursor-pointer font-inherit leading-snug bg-[#f1f5f9] text-[#475569]",
              "data-testid": "error-copy-btn",
              children: d ? "Copied!" : "Copy error details"
            }
          ),
          i && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: m,
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
function Zs(t, n) {
  const r = /* @__PURE__ */ new Map();
  for (const a of t)
    r.set(a.id, []);
  for (const a of n) {
    const s = r.get(a.source);
    s && s.push({ target: a.target, edgeId: a.id });
  }
  const i = /* @__PURE__ */ new Map();
  for (const a of t)
    i.set(a.id, 0);
  for (const a of t) {
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
function Go(t) {
  const n = [], r = [], { nodes: i, edges: a } = t, s = /* @__PURE__ */ new Map();
  for (const d of i)
    s.set(d.id, d);
  return el(i, n), tl(i, a, n), nl(a, s, n), rl(i, n), pl(i, a, n), ul(i, a, r), ml(i, a, r), hl(i, a, r), fl(i, a, r), r.push(...gl(t)), r.push(...xl(t)), r.push(...bl(t)), r.push(...yl(t)), r.push(...vl(t)), r.push(...Nl(t)), r.push(...wl(t)), r.push(...kl(t)), r.push(...Cl(t)), r.push(...Il(t)), {
    errors: n,
    warnings: r,
    isValid: n.length === 0,
    canPublish: n.length === 0
  };
}
function el(t, n) {
  const r = t.filter((i) => i.type === "trigger");
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
function tl(t, n, r) {
  const i = Zs(t, n);
  i !== null && r.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: i
  });
}
function nl(t, n, r) {
  for (const i of t) {
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
    Wn(
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
function rl(t, n) {
  for (const r of t)
    switch (r.data.type) {
      case "llm":
        ol(r.id, r.data, n);
        break;
      case "transform":
        al(r.id, r.data, n);
        break;
      case "condition":
        il(r.id, r.data, n);
        break;
      case "action":
        sl(r.id, r.data, n);
        break;
      case "fork":
        ll(r.id, r.data, n);
        break;
      case "join":
        cl(r.id, r.data, n);
        break;
      case "approval":
        dl(r.id, r.data, n);
        break;
    }
}
function ol(t, n, r) {
  n.provider || Je(r, t, "provider"), (!n.model || !n.model.trim()) && Je(r, t, "model"), (!n.systemPrompt || !n.systemPrompt.trim()) && Je(r, t, "systemPrompt"), (!n.userPromptTemplate || !n.userPromptTemplate.trim()) && Je(r, t, "userPromptTemplate");
}
function al(t, n, r) {
  n.transformType || Je(r, t, "transformType"), (!n.expression || !n.expression.trim()) && Je(r, t, "expression");
}
function il(t, n, r) {
  (!n.expression || !n.expression.trim()) && Je(r, t, "expression");
}
function sl(t, n, r) {
  n.actionType || Je(r, t, "actionType");
}
function ll(t, n, r) {
  (typeof n.branchCount != "number" || n.branchCount < 2) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: t,
    field: "branchCount"
  });
}
function cl(t, n, r) {
  n.mode || Je(r, t, "mode"), n.mergeStrategy || Je(r, t, "mergeStrategy"), n.mode === "n_of_m" && (typeof n.n != "number" || n.n < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: t,
    field: "n"
  });
}
function dl(t, n, r) {
  (!n.approvers || n.approvers.length === 0) && r.push({
    code: "APPROVAL_NO_APPROVERS",
    severity: "error",
    message: "Approval node must have at least one approver.",
    nodeId: t,
    field: "approvers"
  }), (typeof n.requiredCount != "number" || n.requiredCount < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Approval requires requiredCount ≥ 1.",
    nodeId: t,
    field: "requiredCount"
  });
}
function pl(t, n, r) {
  const i = /* @__PURE__ */ new Map();
  for (const a of n)
    i.set(a.target, (i.get(a.target) ?? 0) + 1);
  for (const a of t) {
    if (a.type !== "join") continue;
    (i.get(a.id) ?? 0) < 2 && r.push({
      code: "JOIN_INSUFFICIENT_INPUTS",
      severity: "error",
      message: "Join node requires at least 2 incoming edges.",
      nodeId: a.id
    });
  }
}
function Je(t, n, r) {
  t.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: `Missing required field '${r}'.`,
    nodeId: n,
    field: r
  });
}
function ul(t, n, r) {
  const i = t.filter((c) => c.type === "trigger");
  if (i.length !== 1) return;
  const a = /* @__PURE__ */ new Map();
  for (const c of t) a.set(c.id, []);
  for (const c of n)
    a.get(c.source)?.push(c.target);
  const s = /* @__PURE__ */ new Set(), d = [i[0].id];
  for (s.add(i[0].id); d.length > 0; ) {
    const c = d.shift();
    for (const l of a.get(c) ?? [])
      s.has(l) || (s.add(l), d.push(l));
  }
  for (const c of t)
    s.has(c.id) || r.push({
      code: "ORPHAN_NODE",
      severity: "warning",
      message: "Node is unreachable from the Trigger.",
      nodeId: c.id
    });
}
function ml(t, n, r) {
  const i = /* @__PURE__ */ new Set();
  for (const a of n) i.add(a.source);
  for (const a of t)
    i.has(a.id) || a.data.terminal !== !0 && r.push({
      code: "DEAD_END",
      severity: "warning",
      message: "Node has no outgoing edges.",
      nodeId: a.id
    });
}
function hl(t, n, r) {
  const i = /* @__PURE__ */ new Map();
  for (const a of n) {
    const s = i.get(a.source) ?? /* @__PURE__ */ new Set();
    s.add(a.sourceHandle), i.set(a.source, s);
  }
  for (const a of t) {
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
function fl(t, n, r) {
  const i = /* @__PURE__ */ new Map();
  for (const a of n) {
    const s = i.get(a.source) ?? /* @__PURE__ */ new Set();
    s.add(a.sourceHandle), i.set(a.source, s);
  }
  for (const a of t) {
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
function ot(t) {
  const n = t.data.label;
  if (typeof n == "string" && n.trim()) return n.trim();
  switch (t.data.type) {
    case "llm":
      return t.data.model || "llm";
    case "trigger":
      return t.data.triggerType || "trigger";
    case "action":
      return t.data.actionType || "action";
    case "transform":
      return t.data.transformType || "transform";
    case "join":
      return t.data.mode ? `join:${t.data.mode}` : "join";
    default:
      return t.type;
  }
}
function gl(t) {
  const n = [], r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const c of t.nodes)
    r.set(c.id, []), i.set(c.id, []);
  for (const c of t.edges)
    c.sourceHandle !== "error" && r.get(c.source)?.push(c.target), i.get(c.target)?.push(c.source);
  const a = /* @__PURE__ */ new Map();
  for (const c of t.nodes) a.set(c.id, c);
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
  for (const c of t.nodes)
    c.data.type !== "llm" && c.data.type !== "action" || t.edges.some(
      (p) => p.source === c.id && p.sourceHandle === "error"
    ) || d(c.id) && s(c.id) || n.push({
      code: "NO_ERROR_HANDLER",
      severity: "warning",
      message: `${c.data.type} node '${ot(c)}' has no error handler — failures will terminate the run.`,
      nodeId: c.id
    });
  return n;
}
function xl(t) {
  const n = [];
  for (const r of t.nodes)
    r.data.type === "llm" && (typeof r.data.maxTokens != "number" || r.data.maxTokens <= 0) && n.push({
      code: "LLM_NO_MAX_TOKENS",
      severity: "warning",
      message: `LLM node '${ot(r)}' has no maxTokens — responses could run long / expensive.`,
      nodeId: r.id,
      field: "maxTokens"
    });
  return n;
}
function bl(t) {
  const n = [];
  for (const r of t.nodes)
    r.data.type === "approval" && (typeof r.data.timeoutMs != "number" || r.data.timeoutMs <= 0) && n.push({
      code: "UNGUARDED_APPROVAL_TIMEOUT",
      severity: "warning",
      message: `Approval '${ot(r)}' has no timeout — the run could block indefinitely.`,
      nodeId: r.id,
      field: "timeoutMs"
    });
  return n;
}
function yl(t) {
  const n = [];
  for (const r of t.nodes)
    r.data.type === "fork" && typeof r.data.branchCount == "number" && r.data.branchCount > 5 && n.push({
      code: "LARGE_FORK",
      severity: "warning",
      message: `Fork with ${r.data.branchCount} branches; consider splitting into multiple joins for readability.`,
      nodeId: r.id,
      field: "branchCount"
    });
  return n;
}
function vl(t) {
  const r = t.nodes.filter((p) => p.type === "trigger");
  if (r.length !== 1) return [];
  const i = /* @__PURE__ */ new Map();
  for (const p of t.nodes) i.set(p.id, []);
  for (const p of t.edges) i.get(p.source)?.push(p.target);
  const a = /* @__PURE__ */ new Map(), s = [r[0].id];
  a.set(r[0].id, 1);
  const d = t.nodes.length * t.nodes.length + 1;
  let c = 0;
  for (; s.length > 0; ) {
    if (c++ > d) return [];
    const p = s.shift(), u = a.get(p);
    for (const m of i.get(p) ?? []) {
      const h = a.get(m);
      (h === void 0 || u + 1 > h) && (a.set(m, u + 1), s.push(m));
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
function Nl(t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const i of t.nodes) {
    const a = ot(i), s = r.get(a) ?? [];
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
function wl(t) {
  const n = [], r = /\{\{[^}]+\}\}/;
  for (const i of t.nodes) {
    if (i.data.type !== "llm") continue;
    const { temperature: a, userPromptTemplate: s } = i.data;
    typeof a != "number" || a <= 0.8 || !s || !r.test(s) || n.push({
      code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
      severity: "warning",
      message: `LLM '${ot(i)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
      nodeId: i.id
    });
  }
  return n;
}
function kl(t) {
  return t.triggerBinding?.event !== "schedule" ? [] : t.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function Cl(t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const i of t.edges) {
    const a = r.get(i.source) ?? /* @__PURE__ */ new Set();
    a.add(i.sourceHandle), r.set(i.source, a);
  }
  for (const i of t.nodes) {
    if (i.type !== "condition") continue;
    const a = r.get(i.id) ?? /* @__PURE__ */ new Set(), s = a.has("true"), d = a.has("false");
    s && !d && n.push({
      code: "UNREACHABLE_AFTER_CONDITION_FALSE",
      severity: "warning",
      message: `Condition '${ot(i)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: i.id,
      field: "false"
    });
  }
  return n;
}
function Il(t) {
  const n = [], r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const c of t.nodes)
    r.set(c.id, []), i.set(c.id, []);
  for (const c of t.edges)
    r.get(c.source)?.push({ target: c.target, sourceHandle: c.sourceHandle }), i.get(c.target)?.push(c.source);
  const a = /* @__PURE__ */ new Map();
  for (const c of t.nodes) a.set(c.id, c);
  function s(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [c];
    for (; p.length > 0; ) {
      const u = p.shift(), m = a.get(u);
      if (m && m.type === "join" && u !== c) return u;
      for (const { target: h } of r.get(u) ?? [])
        l.has(h) || (l.add(h), p.push(h));
    }
    return null;
  }
  function d(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [c];
    for (; p.length > 0; ) {
      const u = p.shift(), m = a.get(u);
      if (m && m.type === "fork" && u !== c) return u;
      for (const h of i.get(u) ?? [])
        l.has(h) || (l.add(h), p.push(h));
    }
    return null;
  }
  for (const c of t.nodes) {
    if (c.data.type !== "fork") continue;
    const l = r.get(c.id) ?? [];
    if (l.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const { target: h } of l)
      p.add(s(h));
    const u = p.has(null), m = [...p].filter((h) => h !== null);
    (u || m.length !== 1) && n.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Fork '${ot(c)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
      nodeId: c.id
    });
  }
  for (const c of t.nodes) {
    if (c.data.type !== "join") continue;
    const l = i.get(c.id) ?? [];
    if (l.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const h of l)
      p.add(d(h));
    const u = p.has(null), m = [...p].filter((h) => h !== null);
    (u || m.length !== 1) && n.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Join '${ot(c)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: c.id
    });
  }
  return n;
}
function Sl(t, n) {
  return `${t}${n}`;
}
const $l = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, Tl = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function Yo(t) {
  return t.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const Rl = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function Pl(t) {
  const n = Tl[t.type] ?? "■", r = Rl[t.type] ?? t.type.charAt(0).toUpperCase() + t.type.slice(1);
  let i = null;
  switch (t.data.type) {
    case "llm":
      i = t.data.model || null;
      break;
    case "condition": {
      const s = t.data;
      i = s.label || s.expression || null;
      break;
    }
    case "approval": {
      const d = t.data.approvers?.length ?? 0;
      i = `${d} approver${d === 1 ? "" : "s"}`;
      break;
    }
    case "fork": {
      const s = t.data;
      i = `${s.branchCount} branch${s.branchCount === 1 ? "" : "es"}`;
      break;
    }
    case "action":
      i = t.data.actionType;
      break;
    case "transform":
      i = t.data.transformType;
      break;
    case "trigger":
      i = t.data.triggerType;
      break;
    case "join":
      i = t.data.mode;
      break;
  }
  const a = `${n} ${r}`;
  return Yo(i ? `${a}<br/>${i}` : a);
}
function Al(t, n) {
  const r = `"${n}"`;
  switch (t) {
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
function Ml(t) {
  return !t || t === "out" ? null : t;
}
function Dl(t) {
  const n = ["flowchart TD"], r = {}, i = /* @__PURE__ */ new Map();
  for (const a of t.nodes) {
    const s = $l[a.type] ?? "n", d = r[s] = (r[s] ?? 0) + 1;
    i.set(a.id, Sl(s, d));
  }
  for (const a of t.nodes) {
    const s = i.get(a.id);
    if (!s) continue;
    const d = Al(a.type, Pl(a));
    n.push(`  ${s}${d}`);
  }
  for (const a of t.edges) {
    const s = i.get(a.source), d = i.get(a.target);
    if (!s || !d) continue;
    const c = Ml(a.sourceHandle);
    c ? n.push(`  ${s} --"${Yo(c)}"--> ${d}`) : n.push(`  ${s} --> ${d}`);
  }
  return n.join(`
`);
}
function Ir(t) {
  return JSON.stringify(t, (n, r) => {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const i = Object.keys(r).sort(), a = {};
      for (const s of i) a[s] = r[s];
      return a;
    }
    return r;
  });
}
function Sr(t) {
  const n = /* @__PURE__ */ new Map();
  for (const r of t) n.set(r.id, r);
  return n;
}
function $r(t) {
  return new Set(t.edges.map((n) => n.id));
}
function Ol(t, n) {
  if (!n)
    return {
      addedNodes: t.nodes.map((b) => ({
        node: b,
        dataChanged: !0,
        positionChanged: !1
      })),
      removedNodes: [],
      modifiedNodes: [],
      addedEdges: t.edges.length,
      removedEdges: 0,
      nameChanged: !1,
      iconChanged: !1,
      tagsChanged: !1,
      tagsAdded: [],
      tagsRemoved: []
    };
  const r = Sr(t.nodes), i = Sr(n.nodes), a = [], s = [], d = [];
  for (const [b, w] of r) {
    const y = i.get(b);
    if (!y) {
      a.push({ node: w, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const k = Ir(w.data) !== Ir(y.data), C = w.position.x !== y.position.x || w.position.y !== y.position.y;
    (k || C) && d.push({ node: w, dataChanged: k, positionChanged: C });
  }
  for (const [b, w] of i)
    r.has(b) || s.push({ node: w, dataChanged: !0, positionChanged: !1 });
  const c = $r(t), l = $r(n);
  let p = 0, u = 0;
  for (const b of c) l.has(b) || p++;
  for (const b of l) c.has(b) || u++;
  const m = t.name !== n.name, h = (t.icon ?? "") !== (n.icon ?? ""), g = new Set(t.tags ?? []), x = new Set(n.tags ?? []), f = [], v = [];
  for (const b of g) x.has(b) || f.push(b);
  for (const b of x) g.has(b) || v.push(b);
  const N = f.length > 0 || v.length > 0;
  return {
    addedNodes: a,
    removedNodes: s,
    modifiedNodes: d,
    addedEdges: p,
    removedEdges: u,
    nameChanged: m,
    previousName: m ? n.name : void 0,
    iconChanged: h,
    previousIcon: h ? n.icon : void 0,
    tagsChanged: N,
    tagsAdded: f,
    tagsRemoved: v
  };
}
const El = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function _l(t) {
  return t.data.type === "condition" && t.data.label ? t.data.label : t.data.type === "llm" ? t.data.model : t.data.type === "action" ? t.data.actionType : t.data.type === "trigger" ? t.data.triggerType : t.type.charAt(0).toUpperCase() + t.type.slice(1);
}
function bn(t, n, r) {
  const i = t.node, a = El[i.type] ?? "■", s = n !== "removed" && !!r;
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      disabled: !s,
      onClick: s ? () => r(t.node.id) : void 0,
      className: I(
        "flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-[inherit] bg-[#f8fafc] border border-border text-left w-full text-text-primary",
        s ? "cursor-pointer" : "cursor-default",
        n === "removed" && "opacity-85"
      ),
      "data-testid": `diff-row-${n}`,
      children: [
        /* @__PURE__ */ e("span", { className: "text-sm", children: a }),
        /* @__PURE__ */ e("span", { className: "font-semibold", children: i.type }),
        /* @__PURE__ */ e("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: _l(i) }),
        n === "modified" && t.positionChanged ? /* @__PURE__ */ e("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]", children: "moved" }) : null
      ]
    },
    `${n}-${t.node.id}`
  );
}
function Ll({
  open: t,
  onClose: n,
  currentDef: r,
  publishedDef: i,
  onJumpToNode: a
}) {
  const s = q(
    () => Ol(r, i),
    [r, i]
  ), d = (u) => {
    a && a(u), n();
  }, c = i !== null, l = r.version, p = r.publishedVersion;
  return /* @__PURE__ */ o(
    Ge,
    {
      open: t,
      onClose: n,
      title: "Changes since publish",
      maxWidth: 820,
      footer: /* @__PURE__ */ e(
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
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "vs" }),
          typeof p == "number" ? /* @__PURE__ */ o("strong", { children: [
            "published v",
            p
          ] }) : /* @__PURE__ */ e("strong", { className: "text-text-secondary", children: "never published" })
        ] }),
        r.publishedVersion === void 0 ? /* @__PURE__ */ e("p", { className: "m-0 text-[13px] text-text-secondary", children: "This pipeline has never been published." }) : c ? /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ o("div", { className: "flex gap-3 flex-wrap", children: [
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Added (",
                s.addedNodes.length,
                ")"
              ] }),
              s.addedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.addedNodes.map((u) => bn(u, "added", d))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Removed (",
                s.removedNodes.length,
                ")"
              ] }),
              s.removedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.removedNodes.map((u) => bn(u, "removed", void 0))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Modified (",
                s.modifiedNodes.length,
                ")"
              ] }),
              s.modifiedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.modifiedNodes.map((u) => bn(u, "modified", d))
            ] })
          ] }),
          /* @__PURE__ */ o("div", { className: "mt-4 pt-3 border-t border-border", children: [
            /* @__PURE__ */ o("div", { className: "text-xs text-text-secondary mt-1", children: [
              /* @__PURE__ */ e("strong", { children: s.addedEdges }),
              " edge",
              s.addedEdges === 1 ? "" : "s",
              " added ·",
              " ",
              /* @__PURE__ */ e("strong", { children: s.removedEdges }),
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
function Bl({ open: t, onClose: n }) {
  return null;
}
const yn = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", Tr = "px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function Ul(t) {
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
    clearRunsConfirmOpen: m,
    onClearRunsClose: h,
    onClearRunsConfirm: g,
    versionDiffOpen: x,
    onVersionDiffClose: f,
    currentDef: v,
    publishedDef: N,
    onJumpToNode: b,
    simPanelOpen: w,
    onSimPanelClose: y
  } = t;
  return /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e(
      Ge,
      {
        open: n,
        onClose: r,
        title: "Publish pipeline?",
        maxWidth: 420,
        footer: /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ e("button", { onClick: r, className: yn, children: "Cancel" }),
          /* @__PURE__ */ e(
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
          a ? /* @__PURE__ */ o(K, { children: [
            /* @__PURE__ */ e("br", {}),
            /* @__PURE__ */ e("br", {}),
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
    /* @__PURE__ */ e(
      Ge,
      {
        open: l,
        onClose: p,
        title: "Delete pipeline?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ e("button", { onClick: p, className: yn, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: u, className: Tr, children: "Delete" })
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
    /* @__PURE__ */ e(
      Ge,
      {
        open: m,
        onClose: h,
        title: "Clear run history?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ e("button", { onClick: h, className: yn, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: g, className: Tr, children: "Clear history" })
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
    /* @__PURE__ */ e(
      Ll,
      {
        open: x,
        onClose: f,
        currentDef: v,
        publishedDef: N,
        onJumpToNode: b
      }
    ),
    /* @__PURE__ */ e(
      Bl,
      {
        open: w,
        onClose: y
      }
    )
  ] });
}
function Fl({ runId: t, visible: n }) {
  const [r, i] = S(/* @__PURE__ */ new Map()), a = ce(null), s = ce(!0), d = ce(null);
  re(() => {
    t !== d.current && (d.current = t, i(/* @__PURE__ */ new Map()), s.current = !0);
  }, [t]);
  const c = O(() => {
    const g = a.current;
    if (!g) return;
    const x = g.scrollHeight - g.scrollTop - g.clientHeight < 30;
    s.current = x;
  }, []), l = O(() => {
    if (!s.current) return;
    const g = a.current;
    g && (g.scrollTop = g.scrollHeight);
  }, []), p = O(
    (g) => {
      if (!("eventType" in g)) return;
      const { eventType: x, payload: f } = g;
      if (!x.startsWith("pipeline.llm.")) return;
      const v = f?.runId;
      if (!t || v !== t) return;
      const N = f?.stepId;
      if (N) {
        if (x === "pipeline.llm.stream.opened")
          i((b) => {
            const w = new Map(b);
            return w.has(N) || w.set(N, {
              stepId: N,
              tokens: [],
              text: "",
              active: !0,
              summary: null,
              collapsed: !1,
              startedAt: Date.now()
            }), w;
          });
        else if (x === "pipeline.llm.token") {
          const b = f?.token;
          if (b === void 0) return;
          i((w) => {
            const y = new Map(w), k = y.get(N);
            if (k) {
              const C = {
                ...k,
                tokens: [...k.tokens, b],
                text: k.text + b,
                active: !0
              };
              y.set(N, C);
            } else
              y.set(N, {
                stepId: N,
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
          const b = f?.tokensIn, w = f?.tokensOut;
          i((y) => {
            const k = new Map(y), C = k.get(N), $ = C ? Date.now() - C.startedAt : 0, D = $ > 1e3 ? `${($ / 1e3).toFixed(1)}s` : `${$}ms`, A = `${N}: ${b ?? "?"} tokens in, ${w ?? "?"} tokens out (${D})`;
            return C ? k.set(N, {
              ...C,
              active: !1,
              summary: A
            }) : k.set(N, {
              stepId: N,
              tokens: [],
              text: "",
              active: !1,
              summary: A,
              collapsed: !1,
              startedAt: Date.now()
            }), k;
          });
        }
      }
    },
    [t]
  );
  Be("*", p), re(() => {
    l();
  }, [r, l]);
  const u = O((g) => {
    i((x) => {
      const f = new Map(x), v = f.get(g);
      return v && f.set(g, { ...v, collapsed: !v.collapsed }), f;
    });
  }, []), m = q(() => {
    for (const g of r.values())
      if (g.active) return !0;
    return !1;
  }, [r]), h = q(() => Array.from(r.values()), [r]);
  return n ? /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col bg-[#1e1e2e] border-t border-[#313244] max-h-[320px] min-h-[160px] overflow-hidden relative",
      "data-testid": "live-output-panel",
      children: [
        /* @__PURE__ */ e("div", { className: "flex items-center justify-between py-2 px-[14px] bg-[#181825] border-b border-[#313244] shrink-0", children: /* @__PURE__ */ o("div", { className: "text-xs font-bold text-[#cdd6f4] tracking-[0.04em] uppercase flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { children: "Live Output" }),
          m && /* @__PURE__ */ e("span", { className: "w-1.5 h-1.5 rounded-full bg-[#a6e3a1] [animation:live-output-blink_1.2s_ease-in-out_infinite]" }),
          t && /* @__PURE__ */ o("span", { className: "text-[10px] text-[#6c7086] font-normal normal-case", children: [
            t.slice(0, 8),
            "..."
          ] })
        ] }) }),
        /* @__PURE__ */ e(
          "div",
          {
            ref: a,
            className: "flex-1 overflow-y-auto py-[10px] px-[14px] text-[13px] leading-[1.6] text-[#cdd6f4] font-code",
            onScroll: c,
            children: h.length === 0 ? /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-full text-[#6c7086] text-[13px] italic", children: t ? "Waiting for LLM output..." : "No active run" }) : h.map((g) => /* @__PURE__ */ o("div", { children: [
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
                    /* @__PURE__ */ e("span", { className: "text-[10px]", children: g.collapsed ? "▶" : "▼" }),
                    /* @__PURE__ */ e("span", { children: g.stepId }),
                    g.active && /* @__PURE__ */ e("span", { className: "text-[#a6e3a1] text-[10px]", children: "streaming" })
                  ]
                }
              ),
              !g.collapsed && /* @__PURE__ */ o(K, { children: [
                g.text.length > 0 && /* @__PURE__ */ o("div", { className: "whitespace-pre-wrap break-words m-0 mb-3 p-0 text-[#cdd6f4]", children: [
                  g.text,
                  g.active && /* @__PURE__ */ e("span", { className: "inline-block w-0.5 h-[14px] bg-[#89b4fa] ml-px align-text-bottom [animation:live-output-blink_1s_step-end_infinite]" })
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
function Ft(t, n) {
  const r = new Blob([n], { type: "application/json" }), i = URL.createObjectURL(r), a = document.createElement("a");
  a.href = i, a.download = t, document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(i);
}
function jt(t, n) {
  if (!n) return "step";
  const r = t?.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function jl(t) {
  const n = wt(), { toast: r } = un(), { definition: i, selectedNodeId: a, setSelectedNodeId: s } = qe(), d = ce(n.runs);
  re(() => {
    d.current = n.runs;
  }, [n.runs]);
  const c = ce(i);
  re(() => {
    c.current = i;
  }, [i]);
  const l = O(
    (T) => T ? d.current[T]?.pipelineId === t : !1,
    [t]
  ), [p, u] = S(null), [m, h] = S(null), g = O(() => {
    u(null), h(null);
  }, []), x = O(
    (T) => {
      h(T);
    },
    []
  ), f = O(
    (T) => {
      "eventType" in T || T.pipelineId === t && (r("Run started", { type: "info" }), u(null), h(null));
    },
    [t, r]
  ), v = O(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const L = Math.round(T.durationMs / 100) / 10;
      r(`Run completed in ${L}s`, { type: "success" });
    },
    [l, r]
  ), N = O(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const L = T.error.nodeId, pe = jt(c.current, L);
      r(`Run failed at ${pe}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => s(L)
      }), u(T.error);
    },
    [l, s, r]
  ), b = O(
    (T) => {
      "eventType" in T || l(T.runId) && r("Run cancelled", { type: "warning" });
    },
    [l, r]
  ), w = O(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const L = T.stepId, pe = jt(c.current, L);
      r(`Approval requested on "${pe}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => s(L)
      });
    },
    [l, s, r]
  );
  Be("pipeline.run.started", f), Be("pipeline.run.completed", v), Be("pipeline.run.failed", N), Be("pipeline.run.cancelled", b), Be("pipeline.approval.requested", w);
  const [y, k] = S(null);
  re(() => {
    if (n.activeRunIds.length > 0) {
      const T = n.activeRunIds[n.activeRunIds.length - 1];
      T !== y && k(T);
      return;
    }
    if (!y) {
      const T = Object.values(n.runs).sort(
        (L, pe) => pe.startedAt.localeCompare(L.startedAt)
      );
      T.length > 0 && k(T[0].id);
    }
  }, [n.activeRunIds, n.runs, y]);
  const C = y ? n.runs[y] : void 0, $ = !!C && (C.status === "running" || C.status === "pending" || C.status === "awaiting_approval"), [D, A] = S(/* @__PURE__ */ new Set()), [M, ne] = S(null), [R, H] = S(null), [X, J] = S(null), [Q, E] = S(0), [P, G] = S(!1), [j, _] = S(null), W = O(
    (T, L) => {
      L === null ? (H(null), J(null)) : (H(L), J(T));
    },
    []
  ), V = O((T) => {
    A((L) => {
      const pe = new Set(L);
      return pe.has(T) ? pe.delete(T) : pe.add(T), pe;
    });
  }, []), Y = O(async () => {
    if (D.size !== 0)
      try {
        const T = await n.triggerDebugRun(
          t,
          Array.from(D)
        );
        k(T);
      } catch (T) {
        console.error("[PipelineEditor] triggerDebugRun failed", T);
      }
  }, [D, n, t]), me = O(() => {
    M && (n.resolveBreakpoint(M.runId, M.stepId, "continue"), ne(null));
  }, [M, n]), z = O(() => {
    M && (n.resolveBreakpoint(M.runId, M.stepId, "step_over"), ne(null));
  }, [M, n]), de = O(() => {
    M && (n.resolveBreakpoint(M.runId, M.stepId, "resume_all"), ne(null));
  }, [M, n]), we = O(async () => {
    if (!(!M || !R || X !== M.stepId) && Object.keys(R).length !== 0) {
      G(!0);
      try {
        await ya(
          t,
          M.runId,
          M.stepId,
          { mode: "merge", values: R }
        ), H(null), J(null), E((T) => T + 1), n.resolveBreakpoint(M.runId, M.stepId, "continue"), ne(null);
      } catch (T) {
        if (T instanceof va)
          r(`Patch rejected: ${T.reason}`, { type: "error", durationMs: 8e3 });
        else if (T instanceof mr)
          r(`Apply failed (HTTP ${T.status})`, { type: "error", durationMs: 6e3 });
        else {
          const L = T instanceof Error ? T.message : String(T);
          r(`Apply failed: ${L}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        G(!1);
      }
    }
  }, [M, R, X, t, n, r]), Ue = O(
    async (T) => {
      if (M) {
        _(T);
        try {
          await Na(
            t,
            M.runId,
            M.stepId,
            T
          ), r("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (L) {
          if (L instanceof mr)
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
    [M, t, r]
  ), Ze = O(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      ne({ runId: T.runId, stepId: T.stepId });
      const L = jt(c.current, T.stepId);
      r(`Paused at breakpoint: ${L}`, { type: "warning", durationMs: 6e3 });
    },
    [l, r]
  );
  Be("pipeline.step.breakpoint", Ze);
  const We = O(
    (T) => {
      "eventType" in T || M && M.runId === T.runId && ne(null);
    },
    [M]
  );
  Be("pipeline.run.completed", We), Be("pipeline.run.failed", We), Be("pipeline.run.cancelled", We);
  const _e = O(() => {
    p?.nodeId && (n.retryFromStep(p.nodeId), g());
  }, [p, n, g]), Ke = i?.status === "published", Ve = !$ && !Ke, He = $ ? "Cancel the active run" : Ke ? "Start a new run" : "Publish the pipeline to enable runs", [Ie, ye] = S(!1), [ie, Pe] = S({}), [It, Z] = S(!1), [ae, ue] = S("config");
  re(() => {
    a !== null && ue("config");
  }, [a]);
  const xe = O(async (T) => {
    Z(!0);
    try {
      const L = await n.triggerRun(t, T);
      k(L), ue("runs"), r(`Pipeline triggered — run ${L.slice(0, 8)}…`, { type: "success" });
    } catch (L) {
      console.error("[PipelineEditor] triggerRun failed", L), r(`Trigger failed: ${L.message}`, { type: "error" });
    } finally {
      Z(!1);
    }
  }, [n, t, r]), Se = O(async () => {
    if ($ && y) {
      n.cancelRun(y);
      return;
    }
    Ve || xe();
  }, [$, y, Ve, n, xe]), Le = O(() => {
    ye(!1), xe(ie);
  }, [xe, ie]);
  return {
    currentRunId: y,
    setCurrentRunId: k,
    activeError: p,
    setActiveError: u,
    errorNodeAnchor: m,
    handleDismissError: g,
    handleErrorNodePosition: x,
    handleRetryFromError: _e,
    handleRunClick: Se,
    handleTriggerInputSubmit: Le,
    isRunActive: $,
    runDisabled: Ve,
    runTitle: He,
    isTriggering: It,
    triggerInputOpen: Ie,
    setTriggerInputOpen: ye,
    triggerInputValues: ie,
    setTriggerInputValues: Pe,
    breakpoints: D,
    handleToggleBreakpoint: V,
    handleDebugRunClick: Y,
    pausedBreakpoint: M,
    handleBreakpointContinue: me,
    handleBreakpointStepOver: z,
    handleBreakpointResumeAll: de,
    handleApplyAndContinue: we,
    handleRevertPatch: Ue,
    applyingPatch: P,
    revertingPatchId: j,
    dirtyPatch: R,
    dirtyPatchStepId: X,
    handleContextEditBufferChange: W,
    resetEditBufferKey: Q,
    sidebarTab: ae,
    setSidebarTab: ue
  };
}
function zl({
  isPublished: t,
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
  onDelete: m
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
        /* @__PURE__ */ e("button", { className: h, role: "menuitem", onClick: i, children: "Duplicate" }),
        /* @__PURE__ */ e(
          "button",
          {
            className: h,
            role: "menuitem",
            onClick: a,
            "data-testid": "copy-mermaid-btn",
            children: "Copy Mermaid"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            className: h,
            role: "menuitem",
            onClick: s,
            "data-testid": "view-versions-btn",
            children: "View changes since publish"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            className: h,
            role: "menuitem",
            onClick: d,
            disabled: !r,
            children: "Revert to published"
          }
        ),
        /* @__PURE__ */ e("div", { className: "border-t border-border-subtle my-1" }),
        /* @__PURE__ */ e(
          "button",
          {
            className: h,
            role: "menuitem",
            onClick: c,
            "data-testid": "toggle-tags-row",
            children: n ? "Hide tags" : "Show tags"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            className: h,
            role: "menuitem",
            onClick: l,
            children: "View run history"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            className: g,
            role: "menuitem",
            onClick: p,
            children: "Clear run history"
          }
        ),
        !1,
        /* @__PURE__ */ e("div", { className: "border-t border-border-subtle my-1" }),
        /* @__PURE__ */ e(
          "button",
          {
            className: g,
            role: "menuitem",
            onClick: m,
            children: "Delete"
          }
        )
      ]
    }
  );
}
const vn = {
  neutral: "bg-surface-hover text-text-secondary",
  success: "bg-success-bg text-success-fg",
  warning: "bg-warning-bg text-warning-fg",
  danger: "bg-danger-bg text-danger-fg",
  info: "bg-info-bg text-info-fg"
};
function ql({
  pipelineId: t,
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
  onDebugRunClick: m,
  onExport: h,
  onPublishClick: g,
  onDuplicate: x,
  onCopyMermaid: f,
  onViewVersions: v,
  onRevert: N,
  onToggleShowTags: b,
  showTags: w,
  onViewRunHistory: y,
  onClearRunHistory: k,
  onSimPanelOpen: C,
  onDelete: $
}) {
  const D = ze(), { rename: A, setIcon: M, setSelectedNodeId: ne } = qe(), [R, H] = S(!1), [X, J] = S(""), Q = ce(null);
  re(() => {
    R && (J(n.name ?? ""), setTimeout(() => Q.current?.focus(), 0));
  }, [R, n.name]);
  const E = () => {
    const ie = X.trim();
    ie && ie !== n.name && A(ie), H(!1);
  }, P = n ? Go(n) : null;
  (P?.errors.length ?? 0) > 0;
  const G = n.status === "published", j = r ? { label: "Saving…", variant: "info" } : i ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, _ = n.status === "published" ? { label: `v${n.version} · Published`, variant: "success" } : typeof n.publishedVersion == "number" ? { label: `v${n.version} · Draft (pub v${n.publishedVersion})`, variant: "warning" } : { label: `v${n.version} · Draft`, variant: "neutral" }, W = P ? P.errors.length > 0 ? { label: `✗ ${P.errors.length} error${P.errors.length === 1 ? "" : "s"}`, variant: "danger" } : P.warnings.length > 0 ? { label: `⚠ ${P.warnings.length} warning${P.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [V, Y] = S(!1), me = ce(null);
  yt(me, () => Y(!1), V);
  const z = P ? [...P.errors, ...P.warnings] : [], de = (ie) => {
    ie && (ne(ie), Y(!1));
  }, we = n.nodes.filter((ie) => ie.type !== "trigger").length, Ue = l ? Object.values(l.steps).filter(
    (ie) => ie.status === "completed" || ie.status === "skipped"
  ).length : 0, We = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), _e = a && l ? { text: `Running (${Ue}/${we} steps) · ${We}s`, variant: "running" } : l?.status === "completed" ? { text: `Completed in ${l.durationMs ? (l.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : l?.status === "failed" ? { text: `Failed at ${jt(n, l.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, Ke = {
    running: "bg-info-bg text-info-fg",
    success: "bg-success-bg text-success-fg",
    error: "bg-danger-bg text-danger-fg"
  }, Ve = a ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [He, Ie] = S(!1), ye = ce(null);
  return yt(ye, () => Ie(!1), He), /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "h-11 shrink-0 flex items-center gap-2.5 px-3",
        "border-b border-border bg-surface",
        "sticky top-0 z-5"
      ),
      children: [
        /* @__PURE__ */ e(
          gt,
          {
            onClick: () => D("/pipelines"),
            "aria-label": "Back to pipelines",
            title: "Back to pipelines",
            children: "←"
          }
        ),
        /* @__PURE__ */ e(
          Va,
          {
            value: n.icon ?? "🔀",
            onChange: M
          }
        ),
        R ? /* @__PURE__ */ e(
          "input",
          {
            ref: Q,
            value: X,
            onChange: (ie) => J(ie.target.value),
            onBlur: E,
            onKeyDown: (ie) => {
              ie.key === "Enter" && E(), ie.key === "Escape" && (J(n.name), H(!1));
            },
            className: I(
              "px-2 py-1 text-sm font-bold text-text-primary",
              "bg-surface border border-border-field rounded-md",
              "font-inherit outline-none w-[260px]"
            ),
            "data-testid": "pipeline-name-input"
          }
        ) : /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: () => H(!0),
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
        /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              vn[j.variant]
            ),
            "data-testid": "save-status",
            children: j.label
          }
        ),
        /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              vn[_.variant]
            ),
            "data-testid": "version-badge",
            children: _.label
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", ref: me, children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => Y((ie) => !ie),
              className: I(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
                "cursor-pointer border-none",
                vn[W.variant]
              ),
              "data-testid": "validation-indicator",
              children: W.label
            }
          ),
          V && z.length > 0 && /* @__PURE__ */ e(
            "div",
            {
              className: I(
                "absolute top-full mt-1.5 bg-surface border border-border rounded-lg",
                "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"
              ),
              children: z.map((ie, Pe) => /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => de(ie.nodeId),
                  className: I(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    ie.nodeId ? "cursor-pointer" : "cursor-default",
                    Pe < z.length - 1 && "border-b border-border"
                  ),
                  children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: I(
                          "font-bold text-xs",
                          ie.severity === "error" ? "text-danger-fg" : "text-warning-fg"
                        ),
                        children: ie.severity === "error" ? "✗" : "⚠"
                      }
                    ),
                    /* @__PURE__ */ o("span", { className: "flex-1 text-xs", children: [
                      /* @__PURE__ */ e("div", { className: "font-semibold", children: ie.code }),
                      /* @__PURE__ */ e("div", { className: "text-text-secondary", children: ie.message }),
                      ie.nodeId && /* @__PURE__ */ e("div", { className: "mt-0.5 text-[11px] text-primary", children: "Jump to node →" })
                    ] })
                  ]
                },
                `${ie.code}-${Pe}`
              ))
            }
          )
        ] }),
        _e.variant !== "none" && /* @__PURE__ */ o(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap",
              Ke[_e.variant]
            ),
            "data-testid": "run-status-indicator",
            children: [
              _e.variant === "running" && /* @__PURE__ */ e("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-primary rounded-full animate-spin" }),
              _e.variant === "success" && "✓ ",
              _e.variant === "error" && "✗ ",
              _e.text
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex-1" }),
        /* @__PURE__ */ e(
          Me,
          {
            variant: "secondary",
            onClick: () => D("/pipelines/metrics"),
            title: "View pipeline metrics dashboard",
            "data-testid": "metrics-button",
            children: "Metrics"
          }
        ),
        /* @__PURE__ */ e(
          Me,
          {
            variant: "secondary",
            onClick: h,
            title: "Export pipeline as JSON",
            "data-testid": "export-button",
            children: "Export"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: g,
            title: G ? "Already published at this version" : "Publish pipeline to enable runs",
            disabled: G,
            className: I(
              "px-3 py-1.5 text-[13px] font-semibold border-none rounded-md font-inherit shrink-0",
              G ? "bg-surface-hover text-text-tertiary cursor-default opacity-70" : "bg-success text-white cursor-pointer"
            ),
            "data-testid": "publish-button",
            children: G ? "Published" : "Publish"
          }
        ),
        /* @__PURE__ */ e(
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
              /* @__PURE__ */ e("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-white rounded-full animate-spin" }),
              "Triggering…"
            ] }) : Ve
          }
        ),
        p.size > 0 && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: m,
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
          /* @__PURE__ */ e(
            gt,
            {
              onClick: () => Ie((ie) => !ie),
              "aria-label": "More actions",
              "data-testid": "overflow-menu-btn",
              children: "⋯"
            }
          ),
          He && /* @__PURE__ */ e(
            zl,
            {
              isPublished: G,
              showTags: w,
              onDuplicate: () => {
                x(), Ie(!1);
              },
              onCopyMermaid: () => {
                f(), Ie(!1);
              },
              onViewVersions: () => {
                v(), Ie(!1);
              },
              onRevert: () => {
                N(), Ie(!1);
              },
              onToggleShowTags: () => {
                b(), Ie(!1);
              },
              onViewRunHistory: () => {
                y(), Ie(!1);
              },
              onClearRunHistory: () => {
                k(), Ie(!1);
              },
              onSimPanelOpen: () => {
                C(), Ie(!1);
              },
              onDelete: () => {
                $(), Ie(!1);
              },
              hasPublishedVersion: typeof n.publishedVersion == "number"
            }
          )
        ] })
      ]
    }
  );
}
const Wl = 12;
function Ae(t) {
  return I("text-xs", {
    string: "text-[#a6e3a1]",
    number: "text-[#fab387]",
    boolean: "text-[#cba6f7]",
    null: "text-[#6c7086]",
    bracket: "text-[#9399b2]"
  }[t]);
}
function Wt({
  data: t,
  depth: n = 0,
  highlightKeys: r,
  keyName: i,
  isHighlighted: a = !1
}) {
  const [s, d] = S(n > 2);
  if (n > Wl)
    return /* @__PURE__ */ e("span", { className: Ae("string"), children: "[max depth]" });
  const c = a || i != null && r?.has(i);
  if (t === null)
    return /* @__PURE__ */ e("span", { className: I(Ae("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "null" });
  if (t === void 0)
    return /* @__PURE__ */ e("span", { className: I(Ae("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "undefined" });
  if (typeof t == "boolean")
    return /* @__PURE__ */ e("span", { className: I(Ae("boolean"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(t) });
  if (typeof t == "number")
    return /* @__PURE__ */ e("span", { className: I(Ae("number"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(t) });
  if (typeof t == "string") {
    const l = t.length > 120 ? t.slice(0, 120) + "..." : t;
    return /* @__PURE__ */ o("span", { className: I(Ae("string"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: [
      '"',
      l,
      '"'
    ] });
  }
  if (Array.isArray(t))
    return t.length === 0 ? /* @__PURE__ */ e("span", { className: Ae("bracket"), children: "[]" }) : /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ e(
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
      /* @__PURE__ */ e("span", { className: Ae("bracket"), children: "[" }),
      s ? /* @__PURE__ */ o("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        t.length,
        " items"
      ] }) : /* @__PURE__ */ e("div", { className: "pl-4", children: t.map((l, p) => /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
        /* @__PURE__ */ o("span", { className: "text-[#6c7086] text-[11px]", children: [
          p,
          ": "
        ] }),
        /* @__PURE__ */ e(Wt, { data: l, depth: n + 1, highlightKeys: r }),
        p < t.length - 1 && /* @__PURE__ */ e("span", { className: Ae("bracket"), children: "," })
      ] }, p)) }),
      /* @__PURE__ */ e("span", { className: Ae("bracket"), children: "]" })
    ] });
  if (typeof t == "object") {
    const l = Object.entries(t);
    return l.length === 0 ? /* @__PURE__ */ e("span", { className: Ae("bracket"), children: "{}" }) : /* @__PURE__ */ o("span", { children: [
      /* @__PURE__ */ e(
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
      /* @__PURE__ */ e("span", { className: Ae("bracket"), children: "{" }),
      s ? /* @__PURE__ */ o("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        l.length,
        " keys"
      ] }) : /* @__PURE__ */ e("div", { className: "pl-4", children: l.map(([p, u], m) => {
        const h = r?.has(p) || a;
        return /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
          /* @__PURE__ */ e("span", { className: I(
            "text-xs font-medium text-[#89b4fa]",
            h && "text-[#a6e3a1] font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5"
          ), children: p }),
          /* @__PURE__ */ e("span", { className: Ae("bracket"), children: ": " }),
          /* @__PURE__ */ e(
            Wt,
            {
              data: u,
              depth: n + 1,
              highlightKeys: n === 0 ? r : void 0,
              keyName: p,
              isHighlighted: h
            }
          ),
          m < l.length - 1 && /* @__PURE__ */ e("span", { className: Ae("bracket"), children: "," })
        ] }, p);
      }) }),
      /* @__PURE__ */ e("span", { className: Ae("bracket"), children: "}" })
    ] });
  }
  return /* @__PURE__ */ e("span", { className: Ae("string"), children: String(t) });
}
function Vl({
  snapshots: t,
  activeStepId: n,
  fallbackActiveStepId: r,
  onStepSelect: i
}) {
  const a = n ?? r;
  return /* @__PURE__ */ e("div", { className: "w-[140px] shrink-0 border-r border-border overflow-y-auto", children: t.map((s, d) => {
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
          s.newKeys.length > 0 && /* @__PURE__ */ e("span", { className: "text-[#a6e3a1] mr-1 text-[9px]", children: "+" }),
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
function Kl(t) {
  return typeof t == "string" ? "string" : typeof t == "number" ? "number" : typeof t == "boolean" ? "boolean" : "object";
}
function Hl({ k: t, initial: n, onCommit: r, onError: i, onFocus: a }) {
  const [s, d] = S(() => {
    try {
      return JSON.stringify(n, null, 2);
    } catch {
      return "";
    }
  });
  return /* @__PURE__ */ e(
    "textarea",
    {
      "data-testid": `context-edit-input-${t}`,
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
function Jl({
  inputContext: t,
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
  const u = q(() => {
    const h = /* @__PURE__ */ new Set([
      ...Object.keys(t),
      ...Object.keys(n)
    ]);
    return Array.from(h);
  }, [t, n]), m = "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono";
  return /* @__PURE__ */ o("div", { "data-testid": "context-edit-table", children: [
    u.map((h) => {
      const g = h in n, x = g ? n[h] : t[h], f = Kl(x), v = g;
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
                  v && /* @__PURE__ */ e("span", { className: "ml-1 text-[9px]", children: "●" })
                ]
              }
            ),
            /* @__PURE__ */ o("div", { className: "min-w-0", children: [
              f === "boolean" ? /* @__PURE__ */ o(
                "select",
                {
                  "data-testid": `context-edit-input-${h}`,
                  value: String(x),
                  onChange: (N) => c(h, N.target.value === "true"),
                  onFocus: () => d(h, x),
                  className: m,
                  children: [
                    /* @__PURE__ */ e("option", { value: "true", children: "true" }),
                    /* @__PURE__ */ e("option", { value: "false", children: "false" })
                  ]
                }
              ) : f === "number" ? /* @__PURE__ */ e(
                "input",
                {
                  "data-testid": `context-edit-input-${h}`,
                  type: "number",
                  value: String(x),
                  onChange: (N) => {
                    const b = N.target.value === "" ? 0 : Number(N.target.value);
                    c(h, Number.isNaN(b) ? 0 : b);
                  },
                  onFocus: () => d(h, x),
                  className: m
                }
              ) : f === "string" ? /* @__PURE__ */ e(
                "input",
                {
                  "data-testid": `context-edit-input-${h}`,
                  type: "text",
                  value: x ?? "",
                  onChange: (N) => c(h, N.target.value),
                  onFocus: () => d(h, x),
                  className: m
                }
              ) : /* @__PURE__ */ e(
                Hl,
                {
                  k: h,
                  initial: x,
                  onCommit: (N) => c(h, N),
                  onError: (N) => p(h, N),
                  onFocus: () => d(h, x)
                }
              ),
              r[h] && /* @__PURE__ */ e(
                "div",
                {
                  "data-testid": `context-edit-parse-error-${h}`,
                  className: "text-[#f38ba8] text-[11px] mt-1",
                  children: r[h]
                }
              )
            ] }),
            /* @__PURE__ */ e("div", { className: "flex gap-1", children: v && /* @__PURE__ */ e(
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
          /* @__PURE__ */ e(
            "input",
            {
              "data-testid": "context-edit-new-key",
              type: "text",
              placeholder: "key",
              value: i.key,
              onChange: (h) => a({ ...i, key: h.target.value }),
              className: m
            }
          ),
          /* @__PURE__ */ e(
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
              className: m
            }
          ),
          /* @__PURE__ */ e(
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
function Gl(t, n, r) {
  const i = { ...t }, a = { ...i.steps ?? {} };
  return a[n] = r, i.steps = a, r && typeof r == "object" && !Array.isArray(r) && Object.assign(i, r), i;
}
function Yl(t, n) {
  const r = [];
  for (const i of Object.keys(n))
    i in t || r.push(i);
  return r;
}
function Xl(t) {
  const n = Object.values(t.steps).filter((a) => a != null).sort((a, s) => {
    const d = a.startedAt ? Date.parse(a.startedAt) : 0, c = s.startedAt ? Date.parse(s.startedAt) : 0;
    return d - c;
  }), r = [];
  let i = {};
  t.triggeredBy?.payload && typeof t.triggeredBy.payload == "object" && (i = { ...t.triggeredBy.payload });
  for (const a of n) {
    const s = { ...i }, d = a.output, c = a.llm?.prompt;
    let l;
    if (d !== void 0)
      l = Gl(i, a.nodeId, d);
    else {
      l = { ...i };
      const u = {
        ...l.steps ?? {}
      };
      u[a.nodeId] = d, l.steps = u;
    }
    const p = Yl(s, l);
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
function Ql(t, n) {
  const [r, i] = S(/* @__PURE__ */ new Map()), [a, s] = S(
    /* @__PURE__ */ new Map()
  ), d = ce(null);
  re(() => {
    const h = t?.id ?? null;
    h !== d.current && (d.current = h, i(/* @__PURE__ */ new Map()), s(/* @__PURE__ */ new Map()));
  }, [t?.id]);
  const c = O(
    (h) => {
      if (!h || typeof h != "object") return;
      const { eventType: g, payload: x } = h;
      if (!x || typeof x != "object") return;
      const f = x, v = f.runId;
      if (!(!t?.id || v !== t.id)) {
        if (g === "pipeline.llm.prompt") {
          const N = f.stepId, b = f.prompt;
          N && b && i((w) => {
            const y = new Map(w);
            return y.set(N, b), y;
          });
        }
        if (g === "pipeline.run.checkpoint" || g === "pipeline.run.checkpointed" || g === "pipeline:run:checkpoint" || g === "pipeline:run:checkpointed") {
          const N = f.context, b = f.stepId;
          N && b && s((w) => {
            const y = new Map(w);
            return y.set(b, N), y;
          });
        }
      }
    },
    [t?.id]
  );
  Be("*", c);
  const l = q(() => t ? Xl(t) : [], [t]), p = q(() => l.map((h) => {
    const g = r.get(h.stepId), x = a.get(h.stepId);
    return {
      ...h,
      resolvedPrompt: h.resolvedPrompt || g,
      outputContext: x ?? h.outputContext
    };
  }), [l, r, a]), u = q(() => n ? p.find((h) => h.stepId === n) ?? null : p[p.length - 1] ?? null, [p, n]), m = q(() => u ? new Set(u.newKeys) : /* @__PURE__ */ new Set(), [u]);
  return { enrichedSnapshots: p, activeSnapshot: u, newKeysSet: m };
}
function Rr({ attempt: t, label: n }) {
  const r = !t.error;
  return /* @__PURE__ */ o("div", { className: "bg-[#11111b] rounded-md border border-[#313244] p-2.5 overflow-auto", children: [
    /* @__PURE__ */ e("div", { className: "text-[11px] font-bold text-[#cdd6f4] mb-2", children: n }),
    /* @__PURE__ */ o("div", { className: "flex gap-1.5 mb-1.5 items-center", children: [
      /* @__PURE__ */ e("span", { className: I(
        "text-[10px] font-semibold px-1.5 py-px rounded-sm",
        r ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
      ), children: r ? "OK" : "FAIL" }),
      t.durationMs != null && /* @__PURE__ */ o("span", { className: "text-[10px] text-[#6c7086]", children: [
        t.durationMs,
        "ms"
      ] })
    ] }),
    t.error && /* @__PURE__ */ e("div", { className: "text-[11px] text-[#f38ba8] font-mono mb-1.5 px-2 py-1.5 bg-[#1a0f14] rounded whitespace-pre-wrap break-words", children: t.error }),
    t.output !== void 0 && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: "text-[10px] text-[#6c7086] font-semibold mb-1 uppercase", children: "Output" }),
      /* @__PURE__ */ e(Wt, { data: t.output, depth: 0 })
    ] })
  ] });
}
function Zl({
  run: t,
  activeStepId: n,
  onStepSelect: r,
  editable: i = !1,
  onEditBufferChange: a,
  resetEditBufferKey: s
}) {
  const [d, c] = S("input"), [l, p] = S(0), [u, m] = S(!1), [h, g] = S({}), [x, f] = S(null), [v, N] = S({}), [b, w] = S({
    key: "",
    value: ""
  }), { enrichedSnapshots: y, activeSnapshot: k, newKeysSet: C } = Ql(t, n), $ = k?.resolvedPrompt != null, D = k?.stepExecution.attempts, A = (D?.length ?? 0) >= 2;
  re(() => {
    d === "prompt" && !$ && c("input"), d === "attempts" && !A && c("input");
  }, [d, $, A]), re(() => {
    p(0);
  }, [n]);
  const M = !!(t && t.status === "paused_at_breakpoint" && n && (t.currentStepIds?.includes(n) || k?.stepExecution.status === "running" || k?.stepExecution.status === "awaiting" || k?.stepExecution.status === "pending")), ne = !!i && !!M;
  re(() => {
    ne ? x && x !== n && (g({}), f(null), N({})) : (u && m(!1), Object.keys(h).length > 0 && g({}), x && f(null), Object.keys(v).length > 0 && N({}));
  }, [ne, n]), re(() => {
    s !== void 0 && (g({}), f(null), N({}), w({ key: "", value: "" }));
  }, [s]), re(() => {
    !ne || !n || a && (Object.keys(h).length === 0 ? a(n, null) : a(n, h));
  }, [h, ne, n]);
  const R = O(
    (P, G) => {
      f(n), g((j) => P in j ? j : { ...j, [P]: G });
    },
    [n]
  ), H = O(
    (P, G) => {
      f(n), g((j) => ({ ...j, [P]: G })), N((j) => {
        if (!(P in j)) return j;
        const _ = { ...j };
        return delete _[P], _;
      });
    },
    [n]
  ), X = O((P) => {
    g((G) => {
      if (!(P in G)) return G;
      const j = { ...G };
      return delete j[P], j;
    }), N((G) => {
      if (!(P in G)) return G;
      const j = { ...G };
      return delete j[P], j;
    });
  }, []), J = O((P, G) => {
    N((j) => ({ ...j, [P]: G }));
  }, []), Q = O(() => {
    g({}), f(null), N({}), w({ key: "", value: "" });
  }, []), E = O(() => {
    const P = b.key.trim();
    if (!P) return;
    let G = b.value;
    const j = b.value;
    if (j.trim().length > 0)
      try {
        G = JSON.parse(j);
      } catch {
        G = j;
      }
    H(P, G), w({ key: "", value: "" });
  }, [b, H]);
  return !t || y.length === 0 ? /* @__PURE__ */ o("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
    /* @__PURE__ */ e("div", { className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0", children: /* @__PURE__ */ e("span", { className: "text-xs font-bold text-text-primary tracking-wide uppercase", children: "Context Inspector" }) }),
    /* @__PURE__ */ o("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs flex items-center justify-center flex-col gap-2", children: [
      /* @__PURE__ */ e("span", { className: "text-[13px] text-[#6c7086]", children: t ? "Waiting for step execution data..." : "Run a pipeline to inspect context flow" }),
      /* @__PURE__ */ e("span", { className: "text-[11px] text-[#45475a]", children: t ? "Context data will appear as steps complete." : "Trigger a run to see inputs, outputs, and context at each step." })
    ] })
  ] }) : /* @__PURE__ */ o("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0", children: [
      /* @__PURE__ */ e("span", { className: "text-xs font-bold text-text-primary tracking-wide uppercase", children: "Context Inspector" }),
      k && k.stepId && /* @__PURE__ */ o("span", { className: "text-[10px] text-[#6c7086]", children: [
        "Step: ",
        k.stepId.slice(0, 8)
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "flex gap-0 border-b border-border shrink-0", children: [
      { id: "input", label: "Input Context", show: !0 },
      { id: "output", label: "Output", show: !0 },
      { id: "prompt", label: "Resolved Prompt", show: $ },
      { id: "details", label: "Details", show: !0 },
      { id: "attempts", label: `Attempts (${D?.length})`, show: A }
    ].filter((P) => P.show).map((P) => /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "data-testid": P.id === "attempts" ? "attempts-tab" : void 0,
        className: I(
          "px-3.5 py-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer font-inherit uppercase tracking-wide border-b-2",
          d === P.id ? "text-primary border-b-primary" : "text-text-tertiary border-b-transparent"
        ),
        onClick: () => c(P.id),
        children: P.label
      },
      P.id
    )) }),
    /* @__PURE__ */ o("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
      /* @__PURE__ */ e(
        Vl,
        {
          snapshots: y,
          activeStepId: n,
          fallbackActiveStepId: k?.stepId,
          onStepSelect: r
        }
      ),
      /* @__PURE__ */ e("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs", children: k ? d === "input" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ o("div", { className: "text-[10px] text-[#6c7086] font-semibold uppercase", children: [
            "Input context",
            k.stepId ? ` — step ${k.stepId.slice(0, 8)}` : ""
          ] }),
          ne && /* @__PURE__ */ o("div", { className: "flex gap-1.5 items-center", children: [
            u && Object.keys(h).length > 0 && /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: Q,
                "data-testid": "context-inspector-discard",
                className: "px-2 py-0.5 text-[10px] font-semibold bg-transparent text-[#f38ba8] border border-[#313244] rounded-sm cursor-pointer font-mono",
                children: "Discard changes"
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: () => {
                  const P = !u;
                  m(P), P || Q();
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
        Object.keys(k.inputContext).length === 0 && !(ne && u) ? /* @__PURE__ */ e("div", { className: "text-[#6c7086] text-xs italic", children: "No input context (first step or no upstream output)" }) : ne && u ? /* @__PURE__ */ e(
          Jl,
          {
            inputContext: k.inputContext,
            buffer: h,
            parseErrors: v,
            newKeyDraft: b,
            setNewKeyDraft: w,
            onCommitNewKey: E,
            onBeginEditKey: R,
            onSetValue: H,
            onRemoveKey: X,
            onParseError: J
          }
        ) : /* @__PURE__ */ e(
          Wt,
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
        /* @__PURE__ */ e(Wt, { data: k.output }),
        k.newKeys.length > 0 && /* @__PURE__ */ o("div", { className: "mt-3", children: [
          /* @__PURE__ */ e("div", { className: "text-[10px] text-[#a6e3a1] font-semibold uppercase mb-1", children: "New context keys added" }),
          /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: k.newKeys.map((P) => /* @__PURE__ */ e(
            "span",
            {
              className: "px-1.5 py-0.5 bg-[rgba(166,227,161,0.15)] text-[#a6e3a1] rounded-sm text-[11px] font-semibold font-mono",
              children: P
            },
            P
          )) })
        ] })
      ] }) : d === "prompt" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: "Resolved prompt template" }),
        /* @__PURE__ */ e("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: k.resolvedPrompt })
      ] }) : d === "details" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: "Step execution details" }),
        /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
          k.stepExecution.startedAt && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Duration" }),
            /* @__PURE__ */ o("div", { className: "text-[11px] text-[#cdd6f4]", children: [
              "Started: ",
              k.stepExecution.startedAt,
              k.stepExecution.completedAt && /* @__PURE__ */ o(K, { children: [
                /* @__PURE__ */ e("br", {}),
                "Completed: ",
                k.stepExecution.completedAt,
                k.stepExecution.durationMs != null && /* @__PURE__ */ o(K, { children: [
                  /* @__PURE__ */ e("br", {}),
                  "Duration: ",
                  k.stepExecution.durationMs,
                  "ms"
                ] })
              ] })
            ] })
          ] }),
          k.stepExecution.llm && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "LLM Metrics" }),
            /* @__PURE__ */ o("div", { className: "text-[11px] text-[#cdd6f4]", children: [
              "Tokens in: ",
              k.stepExecution.llm.tokensIn,
              /* @__PURE__ */ e("br", {}),
              "Tokens out: ",
              k.stepExecution.llm.tokensOut,
              k.stepExecution.llm.firstTokenLatencyMs != null && /* @__PURE__ */ o(K, { children: [
                /* @__PURE__ */ e("br", {}),
                "First token latency: ",
                k.stepExecution.llm.firstTokenLatencyMs,
                "ms"
              ] })
            ] }),
            k.stepExecution.llm.response && /* @__PURE__ */ o(K, { children: [
              /* @__PURE__ */ e("div", { className: "text-[11px] text-[#89b4fa] font-semibold mt-2 mb-1", children: "Response Text" }),
              /* @__PURE__ */ e("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: k.stepExecution.llm.response })
            ] })
          ] }),
          k.stepExecution.error && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-[11px] text-[#f38ba8] font-semibold mb-1", children: "Error" }),
            /* @__PURE__ */ e("div", { className: "px-3 py-2.5 bg-[#1a0f14] border border-[#f38ba8] rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: /* @__PURE__ */ e("div", { className: "text-[#f38ba8] font-semibold mb-1", children: k.stepExecution.error }) })
          ] }),
          k.stepExecution.approvals && k.stepExecution.approvals.length > 0 && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: [
              "Approvals (",
              k.stepExecution.approvals.length,
              ")"
            ] }),
            k.stepExecution.approvals.map((P, G) => /* @__PURE__ */ o("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2", children: [
              /* @__PURE__ */ o("div", { className: "flex gap-2 mb-1", children: [
                /* @__PURE__ */ e("span", { className: I(
                  "px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                  P.decision === "approve" ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
                ), children: P.decision.toUpperCase() }),
                /* @__PURE__ */ e("span", { className: "text-[11px] text-[#cdd6f4]", children: P.userId })
              ] }),
              P.comment && /* @__PURE__ */ o("div", { className: "text-[11px] text-[#9399b2] italic", children: [
                '"',
                P.comment,
                '"'
              ] }),
              /* @__PURE__ */ e("div", { className: "text-[10px] text-[#6c7086] mt-1", children: P.at })
            ] }, G))
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Status" }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-[#cdd6f4]", children: k.stepExecution.status })
          ] })
        ] })
      ] }) : d === "attempts" && D && D.length >= 2 ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              "data-testid": "attempts-prev",
              disabled: l === 0,
              onClick: () => p((P) => P - 1),
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
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              "data-testid": "attempts-next",
              disabled: l >= D.length - 2,
              onClick: () => p((P) => P + 1),
              className: I(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l >= D.length - 2 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "→"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ e(Rr, { attempt: D[l], label: `Attempt ${l + 1}` }),
          /* @__PURE__ */ e(Rr, { attempt: D[l + 1], label: `Attempt ${l + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function ec({
  definition: t,
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
  onRevertPatch: m,
  onEditBufferChange: h
}) {
  const x = wt().runs[n.runId] ?? null, v = x?.steps?.[n.stepId]?.patches ?? [], N = !!a && s === n.stepId && Object.keys(a).length > 0, b = x?.status === "paused_at_breakpoint";
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
            jt(t, n.stepId)
          ] }),
          N && /* @__PURE__ */ e(
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
          /* @__PURE__ */ e(
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
          /* @__PURE__ */ e(
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
          /* @__PURE__ */ e(
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
              /* @__PURE__ */ e("div", { className: "border border-border rounded-md bg-surface-inset overflow-hidden min-h-0", children: x ? /* @__PURE__ */ e(
                Zl,
                {
                  run: x,
                  activeStepId: n.stepId,
                  editable: !0,
                  onEditBufferChange: h,
                  resetEditBufferKey: d
                }
              ) : /* @__PURE__ */ e("div", { className: "p-3 text-xs text-text-tertiary", children: "Loading run…" }) }),
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
                    v.length === 0 ? /* @__PURE__ */ e(
                      "div",
                      {
                        className: "text-[11px] text-text-tertiary italic",
                        "data-testid": "breakpoint-patch-history-empty",
                        children: "No patches applied yet."
                      }
                    ) : /* @__PURE__ */ e("div", { className: "flex flex-col gap-2", children: v.map((w) => {
                      const y = !!w.revertedAt;
                      return /* @__PURE__ */ o(
                        "div",
                        {
                          "data-testid": `breakpoint-patch-row-${w.patchId}`,
                          className: I(
                            "border border-border rounded p-1.5",
                            y ? "bg-neutral/10 opacity-60" : "bg-[#11111b]"
                          ),
                          children: [
                            /* @__PURE__ */ o("div", { className: "flex items-center gap-1 text-[10px] text-[#cdd6f4] mb-0.5", children: [
                              /* @__PURE__ */ e("span", { className: "font-mono", children: w.patchId.slice(0, 8) }),
                              w.unvalidated && /* @__PURE__ */ e(
                                "span",
                                {
                                  "data-testid": `breakpoint-patch-unvalidated-${w.patchId}`,
                                  title: "No validator was registered for this step's node type",
                                  className: "px-1 text-[9px] font-bold bg-caution-bg/15 text-caution-fg rounded-sm",
                                  children: "⚠ Unvalidated"
                                }
                              ),
                              y && /* @__PURE__ */ e("span", { className: "px-1 text-[9px] font-bold bg-neutral/20 text-text-tertiary rounded-sm", children: "Reverted" })
                            ] }),
                            /* @__PURE__ */ o("div", { className: "text-[10px] text-[#9399b2]", children: [
                              w.appliedAt,
                              w.appliedBy && /* @__PURE__ */ o(K, { children: [
                                " · ",
                                /* @__PURE__ */ e("span", { className: "text-[#cdd6f4]", children: w.appliedBy })
                              ] })
                            ] }),
                            !y && /* @__PURE__ */ e(
                              "button",
                              {
                                type: "button",
                                "data-testid": `breakpoint-patch-revert-${w.patchId}`,
                                onClick: () => m(w.patchId),
                                disabled: !b || i === w.patchId,
                                title: b ? "Revert this patch" : "Run has progressed past this breakpoint — revert no longer allowed",
                                className: I(
                                  "mt-1 px-2 py-0.5 text-[10px] font-semibold bg-transparent rounded-sm font-inherit",
                                  b ? "text-danger-fg border border-danger cursor-pointer" : "text-text-primary border border-border-emphasis cursor-not-allowed",
                                  i === w.patchId && "cursor-not-allowed"
                                ),
                                children: i === w.patchId ? "Reverting…" : "Revert"
                              }
                            )
                          ]
                        },
                        w.patchId
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
function se({ label: t, required: n, help: r, error: i, children: a, className: s }) {
  return /* @__PURE__ */ o("div", { className: I("flex flex-col", s), children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary", children: [
      t,
      n && /* @__PURE__ */ e("span", { className: "text-[#dc2626] ml-1", children: "●" })
    ] }),
    /* @__PURE__ */ e("div", { className: "mt-1", children: a }),
    i && /* @__PURE__ */ e("div", { className: "text-[11px] text-[#dc2626] mt-0.5", children: i }),
    !i && r && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: r })
  ] });
}
function xt({ title: t, defaultCollapsed: n = !1, children: r, className: i }) {
  const [a, s] = S(n);
  return /* @__PURE__ */ o("div", { className: I("flex flex-col", i), children: [
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => s((d) => !d),
        className: "flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer font-inherit text-xs font-semibold text-text-secondary",
        children: [
          /* @__PURE__ */ e("span", { children: a ? "▸" : "▾" }),
          " ",
          t
        ]
      }
    ),
    !a && /* @__PURE__ */ e("div", { className: "flex flex-col gap-3 mt-2", children: r })
  ] });
}
function ve({ children: t, className: n }) {
  return /* @__PURE__ */ e("div", { className: I("flex flex-col gap-3 px-4 py-3", n), children: t });
}
const tc = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function nc(t, n, r) {
  const i = t.trim();
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
      const m = Number(u.trim());
      if (!Number.isFinite(m) || !Number.isInteger(m) || m < n || m > r) return null;
      l.has(m) || (l.add(m), p.push(m));
    }
    return p.length === 0 ? null : { match: p };
  }
  const d = Number(i);
  return !Number.isFinite(d) || !Number.isInteger(d) || d < n || d > r ? null : { match: [d] };
}
function rc(t) {
  if (typeof t != "string") return null;
  const n = t.trim().split(/\s+/);
  if (n.length !== 5) return null;
  const r = {};
  for (let i = 0; i < 5; i++) {
    const a = tc[i], s = nc(n[i], a.min, a.max);
    if (!s) return null;
    r[a.name] = s;
  }
  return r;
}
function St(t, n, r) {
  return t.match === "*" ? !t.step || t.step === 1 ? !0 : (n - r) % t.step === 0 : t.match.includes(n);
}
function oc(t, n) {
  return St(t.minute, n.getMinutes(), 0) && St(t.hour, n.getHours(), 0) && St(t.dayOfMonth, n.getDate(), 1) && St(t.month, n.getMonth() + 1, 1) && St(t.dayOfWeek, n.getDay(), 0);
}
function ac(t, n, r) {
  const i = [], a = new Date(n.getTime());
  a.setSeconds(0, 0), a.setMinutes(a.getMinutes() + 1);
  const s = 1440 * 366, d = new Date(a.getTime());
  for (let c = 0; c < s && i.length < r; c++)
    oc(t, d) && i.push(new Date(d.getTime())), d.setMinutes(d.getMinutes() + 1);
  return i;
}
const Pr = /^[a-zA-Z0-9_-]{1,64}$/, ic = "http://localhost:13001";
function sc() {
  try {
    const t = localStorage.getItem("ws_document_types_v1");
    if (!t) return [];
    const n = JSON.parse(t);
    return Array.isArray(n) ? n.filter((r) => typeof r == "object" && r !== null).filter((r) => typeof r.id == "string" && typeof r.name == "string").map((r) => ({ id: r.id, name: r.name })) : [];
  } catch {
    return [];
  }
}
const lc = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function cc({ data: t, onChange: n }) {
  const { toast: r } = un(), a = dn(nr)?.definition?.triggerBinding?.webhookSecret, [s, d] = S(!1), c = t.triggerType.startsWith("document."), l = q(() => c ? sc() : [], [c]), p = c && !t.documentTypeId, u = t.triggerType === "schedule" && !t.schedule, m = t.triggerType === "webhook" && !t.webhookPath, h = t.webhookPath ?? "", g = t.triggerType === "webhook" && h.length > 0 && !Pr.test(h), x = t.triggerType === "webhook" && Pr.test(h) ? `${ic}/hooks/pipeline/${h}` : null, f = () => {
    x && navigator.clipboard.writeText(x).then(() => r("Webhook URL copied", { type: "success" })).catch(() => r("Could not copy webhook URL", { type: "error" }));
  }, v = () => {
    a && navigator.clipboard.writeText(a).then(() => r("Webhook secret copied", { type: "success" })).catch(() => r("Could not copy webhook secret", { type: "error" }));
  }, N = t.triggerType === "schedule" ? t.schedule ?? "" : "", b = q(
    () => N ? rc(N) : null,
    [N]
  ), w = q(() => b ? ac(b, /* @__PURE__ */ new Date(), 3) : [], [b]), y = t.triggerType === "schedule" && !!N && !b, k = t.triggerType === "document.finalize" ? "On finalize" : t.triggerType === "document.submit" ? "On submit for review" : t.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(se, { label: "Trigger type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.triggerType,
        onChange: (C) => n({ triggerType: C.target.value }),
        children: lc.map((C) => /* @__PURE__ */ e("option", { value: C.value, children: C.label }, C.value))
      }
    ) }),
    c && /* @__PURE__ */ o(
      se,
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
              value: t.documentTypeId ?? "",
              onChange: (C) => n({ documentTypeId: C.target.value || void 0 }),
              children: [
                /* @__PURE__ */ e("option", { value: "", children: "— select a document type —" }),
                l.map((C) => /* @__PURE__ */ e("option", { value: C.id, children: C.name }, C.id))
              ]
            }
          ),
          k && /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary mt-1.5", children: [
            "Event: ",
            /* @__PURE__ */ e("span", { className: "font-semibold text-text-secondary", children: k })
          ] })
        ]
      }
    ),
    t.triggerType === "schedule" && /* @__PURE__ */ o(
      se,
      {
        label: "Schedule (cron)",
        required: !0,
        error: u ? "Cron expression is required." : y ? "Invalid cron expression — supports *, */N, N,M, A-B, exact values." : void 0,
        help: !u && !y ? "5-field cron: minute hour day month weekday." : void 0,
        children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              className: I(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                u || y ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "*/15 * * * *",
              value: t.schedule ?? "",
              onChange: (C) => n({ schedule: C.target.value })
            }
          ),
          /* @__PURE__ */ e("div", { className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono", children: w.length > 0 ? /* @__PURE__ */ o(K, { children: [
            /* @__PURE__ */ e("div", { className: "text-text-secondary mb-1", children: "Next 3 fires:" }),
            w.map((C, $) => /* @__PURE__ */ e("div", { children: C.toLocaleString() }, $))
          ] }) : /* @__PURE__ */ e("span", { children: "Next fires: enter a valid cron expression to preview." }) })
        ]
      }
    ),
    t.triggerType === "webhook" && /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e(
        se,
        {
          label: "Path",
          required: !0,
          error: m ? "Webhook path is required." : g ? "Path must be alphanumeric (plus _, -)" : void 0,
          help: !m && !g ? "Alphanumeric, _, or - (max 64 chars). No leading slash." : void 0,
          children: /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              className: I(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                m || g ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "weekly-digest",
              value: h,
              onChange: (C) => n({ webhookPath: C.target.value })
            }
          )
        }
      ),
      /* @__PURE__ */ e("div", { className: "p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: x ? /* @__PURE__ */ o(K, { children: [
        /* @__PURE__ */ o("span", { className: "flex-1", children: [
          /* @__PURE__ */ e("span", { className: "font-sans text-text-tertiary mr-1", children: "Full URL:" }),
          x
        ] }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: f,
            className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
            children: "Copy"
          }
        )
      ] }) : /* @__PURE__ */ e("span", { className: "font-sans text-text-tertiary", children: "Set a path above to see the URL" }) }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-text-secondary", children: "Signing secret" }),
        /* @__PURE__ */ e("div", { className: "mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: a ? /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ e("span", { className: "flex-1", "aria-label": "webhook secret", children: s ? a : "•".repeat(32) }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => d((C) => !C),
              className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
              children: s ? "Hide" : "Reveal"
            }
          ),
          /* @__PURE__ */ e(
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
          /* @__PURE__ */ e("code", { children: "X-Pipeline-Signature-256: sha256=<hmac>" }),
          "."
        ] }) }),
        /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: [
          "HMAC-SHA256 of the raw request body. Send as",
          " ",
          /* @__PURE__ */ e("code", { children: "X-Pipeline-Signature-256: sha256=<hex>" }),
          "."
        ] })
      ] })
    ] })
  ] });
}
const Ar = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, dc = 3e4;
function pc(t) {
  return t < 1e3 ? `${Math.round(t)}ms` : t < 6e4 ? `${(t / 1e3).toFixed(t < 1e4 ? 1 : 0)}s` : `${Math.round(t / 6e4)}m`;
}
function uc(t) {
  const n = [];
  for (let r = 1; r < t.maxAttempts; r++) {
    const i = t.backoffMs * Math.pow(t.backoffMultiplier, r - 1);
    n.push(Math.min(i, dc));
  }
  return n;
}
function Kt({ value: t, onChange: n }) {
  const r = t !== void 0, i = t ?? Ar, a = r ? uc(i) : [], d = a.reduce((c, l) => c + l, 0) > 300 * 1e3;
  return /* @__PURE__ */ o("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "checkbox",
          checked: r,
          onChange: (c) => n(c.target.checked ? Ar : void 0),
          "aria-label": "Enable retries"
        }
      ),
      "Retry policy"
    ] }),
    !r && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", children: "No retries — failure is terminal on first attempt." }),
    r && /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-3 gap-2 mt-1", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Max attempts" }),
          /* @__PURE__ */ e(
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
          /* @__PURE__ */ e("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Initial backoff (ms)" }),
          /* @__PURE__ */ e(
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
          /* @__PURE__ */ e("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Backoff multiplier" }),
          /* @__PURE__ */ e(
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
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: i.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : a.length === 0 ? `Retries up to ${i.maxAttempts}× with no delay.` : `Retries up to ${i.maxAttempts}× with delays: ${a.map(pc).join(", ")}.` }),
      d && /* @__PURE__ */ e("div", { className: "text-[11px] text-[#ca8a04] mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const mc = {
  string: "bg-info-bg text-info-fg border-info-border",
  number: "bg-accent-bg text-accent-fg border-accent-border",
  boolean: "bg-warning-bg text-warning-fg border-warning-border",
  object: "bg-neutral-bg text-neutral-fg border-neutral-border",
  array: "bg-neutral-bg text-neutral-fg border-neutral-border",
  image: "bg-success-bg text-success-fg border-success-border"
};
function hn({
  paths: t,
  unresolved: n = [],
  onInsert: r,
  onRevealNode: i,
  className: a
}) {
  return /* @__PURE__ */ o("div", { className: I("flex flex-col gap-1.5", a), "data-testid": "context-variable-picker", children: [
    t.length === 0 ? /* @__PURE__ */ e("p", { className: "m-0 text-[11px] text-text-tertiary", "data-testid": "context-picker-empty", children: "No upstream context yet — connect this node to a trigger or an earlier step and its outputs will appear here." }) : /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: t.map((s) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => r(`{{${s.path}}}`),
          title: `${s.description}
from ${s.source}`,
          className: I(
            "rounded-full border px-2 py-0.5 font-mono text-[10px] cursor-pointer",
            "hover:brightness-95 transition-[filter]",
            mc[s.kind]
          ),
          "data-testid": `context-pill-${s.path}`,
          children: s.path.replace(/^context\./, "")
        },
        s.path
      )) }),
      /* @__PURE__ */ e("p", { className: "m-0 text-[11px] text-text-tertiary", children: "Click to insert. Derived from what is actually upstream of this node." })
    ] }),
    n.length > 0 && /* @__PURE__ */ o(
      "div",
      {
        className: "rounded-md border border-warning-border bg-warning-bg px-2 py-1.5",
        "data-testid": "context-unresolved",
        children: [
          /* @__PURE__ */ e("p", { className: "m-0 text-[11px] font-semibold text-warning-fg", children: n.length === 1 ? "This path is not provided by anything upstream:" : `${n.length} paths are not provided by anything upstream:` }),
          /* @__PURE__ */ e("ul", { className: "m-0 mt-1 list-none p-0", children: n.map((s) => /* @__PURE__ */ e("li", { className: "font-mono text-[11px] text-warning-fg", children: `{{${s}}}` }, s)) }),
          /* @__PURE__ */ e("p", { className: "m-0 mt-1 text-[10px] text-warning-fg", children: "It will resolve to nothing at run time. Wire in the step that produces it, or fix the path." })
        ]
      }
    ),
    i && t.length > 0 && /* @__PURE__ */ o("details", { className: "text-[11px] text-text-secondary", children: [
      /* @__PURE__ */ e("summary", { className: "cursor-pointer select-none", children: "Where each value comes from" }),
      /* @__PURE__ */ e("ul", { className: "m-0 mt-1 list-none p-0", children: t.map((s) => /* @__PURE__ */ o("li", { className: "flex items-baseline gap-1.5 py-0.5", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: () => i(s.sourceNodeId),
            className: "bg-transparent border-none p-0 cursor-pointer text-primary underline font-inherit text-[11px]",
            children: s.source
          }
        ),
        /* @__PURE__ */ e("span", { className: "font-mono text-[10px] text-text-tertiary", children: s.path })
      ] }, s.path)) })
    ] })
  ] });
}
function Mr(t) {
  const n = t.data ?? {}, i = `${typeof n.label == "string" && n.label ? n.label : t.type} (${t.type})`, a = (c, l, p) => ({
    path: c,
    source: i,
    sourceNodeId: t.id,
    description: l,
    kind: p
  }), s = typeof n.outputKey == "string" && n.outputKey ? n.outputKey : null, d = s ? `context.${s}` : `context.steps.${t.id}.output`;
  switch (t.type) {
    case "trigger":
      return [
        a("context.trigger", "The full trigger payload.", "object"),
        a("context.trigger.userId", "Who initiated the run.", "string"),
        a("context.trigger.imageRef", "Image supplied with the trigger, if any.", "image")
      ];
    case "llm":
      return [
        a(d, "Model completion text.", "string"),
        a(`context.steps.${t.id}.usage`, "Token usage for this call.", "object")
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
        a(`context.steps.${t.id}.items`, "The fanned-out items.", "array"),
        a(`context.steps.${t.id}.index`, "Index of the current item.", "number")
      ];
    case "condition":
      return [a(`context.steps.${t.id}.matched`, "Whether the condition passed.", "boolean")];
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
      return [a(`context.steps.${t.id}.imageRef`, "Image produced by this step.", "image")];
    case "image:dimensions":
      return [
        a(`context.steps.${t.id}.width`, "Image width in pixels.", "number"),
        a(`context.steps.${t.id}.height`, "Image height in pixels.", "number")
      ];
    case "image:vision-analyze":
    case "image:vision-classify":
    case "image:vision-describe":
    case "image:vision-tag":
    case "image:vision-extract-text":
      return [
        a(d, "Structured vision result, shaped by the output schema.", "object"),
        a(`context.steps.${t.id}.usage`, "Token usage for the vision call.", "object")
      ];
    default:
      return [a(d, "Output of this step.", "object")];
  }
}
function Kn(t, n) {
  const r = /* @__PURE__ */ new Map();
  for (const d of t) {
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
function hc(t, n, r) {
  const i = new Map(t.map((c) => [c.id, c])), a = [], s = /* @__PURE__ */ new Set(), d = (c) => {
    s.has(c.path) || (s.add(c.path), a.push(c));
  };
  for (const c of Kn(n, r)) {
    const l = i.get(c);
    l && Mr(l).forEach(d);
  }
  if (!s.has("context.trigger")) {
    const c = t.find((l) => l.type === "trigger");
    c && Mr(c).forEach(d);
  }
  return a;
}
function fc(t, n) {
  const r = new Set(n.map((a) => a.path)), i = /* @__PURE__ */ new Set();
  for (const a of t.matchAll(/\{\{\s*([\w.[\]-]+)\s*\}\}/g))
    i.add(a[1]);
  return [...i].filter((a) => r.has(a) ? !1 : ![...r].some((s) => a.startsWith(`${s}.`)));
}
const gc = /* @__PURE__ */ new Set([
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
function xc(t, n, r) {
  const i = new Map(t.map((l) => [l.id, l])), a = [], s = /* @__PURE__ */ new Set(), d = (l) => {
    s.has(l.path) || (s.add(l.path), a.push(l));
  };
  for (const l of Kn(n, r)) {
    const p = i.get(l);
    if (!p || !gc.has(p.type)) continue;
    const u = p.data ?? {}, m = typeof u.label == "string" && u.label ? u.label : p.type;
    d({
      path: `$.steps.${p.id}.output.imageId`,
      source: `${m} (${p.type})`,
      sourceNodeId: p.id
    });
  }
  const c = t.find((l) => l.type === "trigger");
  d({
    path: "$.trigger.imageRef",
    source: c ? "Trigger payload" : "Trigger payload (no trigger node yet)",
    sourceNodeId: c?.id ?? ""
  });
  for (const l of Kn(n, r))
    if (i.get(l)?.type === "scatter") {
      d({ path: "$.scatter.parentImageId", source: "Scatter (parent image)", sourceNodeId: l });
      break;
    }
  return a;
}
function Qe(t) {
  const n = dn(nr)?.definition ?? null, r = n?.nodes ?? [], i = n?.edges ?? [], a = q(
    () => t ? hc(r, i, t) : [],
    [r, i, t]
  );
  return q(
    () => ({
      paths: a,
      unresolved: (s) => fc(s, a)
    }),
    [a]
  );
}
function Te(t) {
  const n = dn(nr)?.definition ?? null, r = n?.nodes ?? [], i = n?.edges ?? [];
  return q(
    () => t ? xc(r, i, t) : [],
    [r, i, t]
  );
}
const bc = [
  { value: "anthropic", label: "Anthropic" },
  { value: "bedrock", label: "Bedrock" },
  { value: "claude-code", label: "Claude Code (subprocess)" }
], yc = {
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
function vc(t, n) {
  switch (n) {
    case "image":
      return `<image from ${t}>`;
    case "number":
      return "123";
    case "boolean":
      return "true";
    case "array":
      return "[ … ]";
    case "object":
      return "{ … }";
    default:
      return `<${t}>`;
  }
}
function Dr(t, n) {
  return t.replace(/\{\{\s*([\w.[\]-]+)\s*\}\}/g, (r, i) => {
    const a = n.get(i);
    return a ? vc(i, a) : `{{${i}}}`;
  });
}
function Nc({ data: t, onChange: n, nodeId: r }) {
  const [i, a] = S(!1), { paths: s, unresolved: d } = Qe(r ?? null), c = new Map(s.map((f) => [f.path, f.kind])), l = d(
    `${t.systemPrompt ?? ""}
${t.userPromptTemplate ?? ""}`
  ), p = !t.systemPrompt?.trim(), u = !t.userPromptTemplate?.trim(), m = wa(), h = (f) => m(
    `llm:${f}`,
    yc[f].map((v) => ({ value: v }))
  ), g = h(t.provider), x = (f) => {
    const v = h(f).map((b) => b.value), N = v.includes(t.model) ? t.model : v[0];
    n({ provider: f, model: N });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(se, { label: "Provider", required: !0, children: /* @__PURE__ */ e(
      Xe,
      {
        size: "sm",
        value: t.provider,
        onChange: (f) => x(f.target.value),
        "aria-label": "Provider",
        options: bc
      }
    ) }),
    /* @__PURE__ */ e(se, { label: "Model", required: !0, children: /* @__PURE__ */ e(
      Xe,
      {
        size: "sm",
        value: t.model,
        onChange: (f) => n({ model: f.target.value }),
        "aria-label": "Model",
        options: g.map((f) => ({
          value: f.value,
          label: f.label ?? f.value
        }))
      }
    ) }),
    /* @__PURE__ */ e(se, { label: "Available context", children: /* @__PURE__ */ e(
      hn,
      {
        paths: s,
        unresolved: l,
        onInsert: (f) => n({ userPromptTemplate: `${t.userPromptTemplate ?? ""}${f}` })
      }
    ) }),
    /* @__PURE__ */ e(
      se,
      {
        label: "System prompt",
        required: !0,
        error: p ? "System prompt is required." : void 0,
        help: p ? void 0 : "Sets the model's role and constraints.",
        children: /* @__PURE__ */ e(
          "textarea",
          {
            className: I(
              "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]",
              p ? "border-[#dc2626]" : "border-border-field"
            ),
            value: t.systemPrompt,
            onChange: (f) => n({ systemPrompt: f.target.value })
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      se,
      {
        label: "User prompt template",
        required: !0,
        error: u ? "User prompt template is required." : void 0,
        help: u ? void 0 : "Supports {{ context.* }} substitution — click a pill above to append.",
        children: /* @__PURE__ */ e(
          ir,
          {
            value: t.userPromptTemplate,
            onChange: (f) => n({ userPromptTemplate: f }),
            language: "template",
            variables: s.map((f) => f.path),
            minLines: 6,
            "aria-label": "User prompt template"
          }
        )
      }
    ),
    /* @__PURE__ */ o(xt, { title: "Advanced", defaultCollapsed: !0, children: [
      /* @__PURE__ */ o(
        se,
        {
          label: "Temperature",
          help: "0 = deterministic, 1 = creative.",
          children: [
            /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs ml-2", children: (t.temperature ?? 0.7).toFixed(1) }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "range",
                min: 0,
                max: 1,
                step: 0.1,
                value: t.temperature ?? 0.7,
                onChange: (f) => n({ temperature: parseFloat(f.target.value) }),
                className: "w-full mt-1"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ e(se, { label: "Max tokens", help: "Upper bound on response length.", children: /* @__PURE__ */ e(
        "input",
        {
          type: "number",
          min: 1,
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
          value: t.maxTokens ?? "",
          onChange: (f) => {
            const v = f.target.value;
            n({ maxTokens: v === "" ? void 0 : Math.max(1, parseInt(v, 10) || 0) });
          }
        }
      ) }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "checkbox",
              checked: t.streaming,
              onChange: (f) => n({ streaming: f.target.checked })
            }
          ),
          "Streaming"
        ] }),
        /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Stream tokens as they are generated." })
      ] }),
      /* @__PURE__ */ e(
        Kt,
        {
          value: t.retryPolicy,
          onChange: (f) => n({ retryPolicy: f })
        }
      )
    ] }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => a((f) => !f),
        className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit shrink-0",
        children: [
          i ? "▾" : "▶",
          " Preview with sample context"
        ]
      }
    ),
    i && /* @__PURE__ */ o("div", { className: "bg-surface-inset border border-border rounded-lg p-3 flex flex-col gap-2.5", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved system prompt" }),
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: Dr(t.systemPrompt || "(empty)", c) })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: Dr(t.userPromptTemplate || "(empty)", c) })
      ] }),
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary", children: s.length > 0 ? "Placeholders describe the shape of each upstream value; unresolved paths stay in braces." : "No upstream context — connect this node to see what it can reference." })
    ] })
  ] });
}
const wc = ["context", "context.steps", "context.trigger"], kc = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function Cc({ data: t, onChange: n }) {
  const r = !t.expression?.trim();
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(se, { label: "Type", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: kc.map((i) => /* @__PURE__ */ o(
      "label",
      {
        className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
        children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "radio",
              name: "transform-type",
              value: i.value,
              checked: t.transformType === i.value,
              onChange: () => n({ transformType: i.value })
            }
          ),
          i.label
        ]
      },
      i.value
    )) }) }),
    /* @__PURE__ */ e(
      se,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : t.transformType === "jsonpath" ? 'e.g. $.items[?(@.status == "active")]' : t.transformType === "template" ? "Mustache-style: {{ context.doc.title }}" : t.transformType === "javascript" ? "return ctx.items.filter(x => x.active)" : void 0,
        children: /* @__PURE__ */ e(
          ir,
          {
            value: t.expression,
            onChange: (i) => n({ expression: i }),
            language: t.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: wc,
            "aria-label": "Transform expression"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      se,
      {
        label: "Output key (optional)",
        help: `If set, writes to context.${t.outputKey || "outputKey"}. Otherwise merges into root context.`,
        children: /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
            value: t.outputKey ?? "",
            onChange: (i) => n({ outputKey: i.target.value || void 0 }),
            placeholder: "activeItems"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      Kt,
      {
        value: t.retryPolicy,
        onChange: (i) => n({ retryPolicy: i })
      }
    ),
    /* @__PURE__ */ e(se, { label: "Preview", children: /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-1", children: "Sample input" }),
        /* @__PURE__ */ e(
          "textarea",
          {
            disabled: !0,
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[11px] bg-surface-inset text-text-tertiary outline-none w-full font-mono resize-y min-h-[80px]",
            placeholder: '{ "items": [...] }'
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-1", children: "Sample output" }),
        /* @__PURE__ */ e(
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
const Ic = ["context.trigger", "context.steps"];
function Sc({ data: t, onChange: n }) {
  const r = !t.expression?.trim();
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(
      se,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : "e.g. context.llm.response.length > 500",
        children: /* @__PURE__ */ e(
          ir,
          {
            value: t.expression,
            onChange: (i) => n({ expression: i }),
            language: "javascript",
            variables: Ic,
            "aria-label": "Condition expression"
          }
        )
      }
    ),
    /* @__PURE__ */ e(se, { label: "Label (optional — shown on node face)", help: "A short name so this branch is easy to spot.", children: /* @__PURE__ */ e(
      "input",
      {
        type: "text",
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.label ?? "",
        onChange: (i) => n({ label: i.target.value || void 0 }),
        placeholder: "Long summary?"
      }
    ) }),
    /* @__PURE__ */ e(
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
const $c = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], Tc = {
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
function Rc({ data: t, onChange: n }) {
  const r = Tc[t.actionType], i = t.config ?? {}, a = typeof i.retryCount == "number" ? i.retryCount : 3, s = t.onError === "route-error" ? "route-error" : typeof i.retryCount == "number" ? "retry" : "halt", d = (l, p) => {
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
    /* @__PURE__ */ e(se, { label: "Action type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.actionType,
        onChange: (l) => n({ actionType: l.target.value, config: {} }),
        children: $c.map((l) => /* @__PURE__ */ e("option", { value: l.value, children: l.label }, l.value))
      }
    ) }),
    /* @__PURE__ */ e(se, { label: "Configuration", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-2.5", children: r.map((l) => /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "text-[11px] font-semibold text-text-secondary", children: l.label }),
      l.multiline ? /* @__PURE__ */ e(
        "textarea",
        {
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[48px] mt-0.5",
          rows: 2,
          placeholder: l.placeholder,
          value: typeof i[l.key] == "string" ? i[l.key] : "",
          onChange: (p) => d(l.key, p.target.value)
        }
      ) : /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit mt-0.5",
          placeholder: l.placeholder,
          value: typeof i[l.key] == "string" ? i[l.key] : "",
          onChange: (p) => d(l.key, p.target.value)
        }
      ),
      l.help && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: l.help })
    ] }, l.key)) }) }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "checkbox",
            checked: !!t.idempotent,
            onChange: (l) => n({ idempotent: l.target.checked })
          }
        ),
        "Idempotent"
      ] }),
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "This action is safe to retry." })
    ] }),
    t.idempotent && /* @__PURE__ */ o(se, { label: "Dedup scope", children: [
      /* @__PURE__ */ o(
        "select",
        {
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
          value: t.idempotencyMode ?? "per-step",
          onChange: (l) => n({ idempotencyMode: l.target.value }),
          children: [
            /* @__PURE__ */ e("option", { value: "per-step", children: "Per step — fire once regardless of retries" }),
            /* @__PURE__ */ e("option", { value: "per-attempt", children: "Per attempt — fire once per retry window" })
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: (t.idempotencyMode ?? "per-step") === "per-step" ? "Retries skip this action if it already succeeded. Best for post-comment, notify." : "Each retry attempt can execute the action. Best for idempotent PUTs/webhooks." })
    ] }),
    /* @__PURE__ */ e(
      Kt,
      {
        value: t.retryPolicy,
        onChange: (l) => n({ retryPolicy: l })
      }
    ),
    /* @__PURE__ */ e(se, { label: "On error", children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ o("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: s === "retry",
            onChange: () => c("retry")
          }
        ),
        "Retry up to",
        /* @__PURE__ */ e(
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
const at = 2, $t = 8;
function Or(t, n) {
  const r = t ?? [];
  return r.length === n ? r : r.length > n ? r.slice(0, n) : [...r, ...Array(n - r.length).fill("")];
}
function Pc({ data: t, onChange: n }) {
  const r = Math.max(at, Math.min($t, t.branchCount || at)), i = Or(t.branchLabels, r), a = (d) => {
    const c = Math.max(at, Math.min($t, d));
    n({
      branchCount: c,
      branchLabels: Or(t.branchLabels, c)
    });
  }, s = (d, c) => {
    const l = [...i];
    l[d] = c, n({ branchLabels: l });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(
      se,
      {
        label: "Branch count",
        required: !0,
        help: `Between ${at} and ${$t} parallel branches.`,
        children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs ml-2", children: r }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: at,
              max: $t,
              step: 1,
              value: r,
              onChange: (d) => a(parseInt(d.target.value, 10)),
              className: "w-full mt-1"
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              type: "number",
              min: at,
              max: $t,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit mt-1",
              value: r,
              onChange: (d) => a(parseInt(d.target.value, 10) || at)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e(se, { label: "Branch labels (optional)", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: i.map((d, c) => /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-xs text-text-secondary min-w-[72px]", children: [
        "Branch ",
        c,
        ":"
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none flex-1 min-w-[120px] font-inherit",
          value: d,
          onChange: (l) => s(c, l.target.value),
          placeholder: c === 0 ? "primary" : `branch-${c}`
        }
      )
    ] }, c)) }) })
  ] });
}
const Ac = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], Mc = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function Dc({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(se, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: Ac.map((r) => /* @__PURE__ */ o(
        "label",
        {
          className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
          children: [
            /* @__PURE__ */ e(
              "input",
              {
                type: "radio",
                name: "join-mode",
                checked: t.mode === r.value,
                onChange: () => n({ mode: r.value })
              }
            ),
            r.label,
            /* @__PURE__ */ o("span", { className: "text-text-tertiary text-[11px]", children: [
              "— ",
              r.hint
            ] })
          ]
        },
        r.value
      )) }),
      t.mode === "n_of_m" && /* @__PURE__ */ o("div", { className: "mt-2 flex items-center gap-2", children: [
        /* @__PURE__ */ e("label", { className: "text-[11px] font-semibold text-text-secondary", children: "N" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "number",
            min: 1,
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit",
            value: t.n ?? 1,
            onChange: (r) => n({ n: Math.max(1, parseInt(r.target.value, 10) || 1) })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e(se, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: Mc.map((r) => /* @__PURE__ */ o(
      "label",
      {
        className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
        children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "radio",
              name: "join-merge",
              checked: t.mergeStrategy === r.value,
              onChange: () => n({ mergeStrategy: r.value })
            }
          ),
          r.label,
          /* @__PURE__ */ o("span", { className: "text-text-tertiary text-[11px]", children: [
            "— ",
            r.hint
          ] })
        ]
      },
      r.value
    )) }) }),
    /* @__PURE__ */ o("div", { className: "p-2 bg-surface-inset border border-border rounded-md text-xs text-text-secondary", children: [
      "Current inputs: ",
      /* @__PURE__ */ e("strong", { children: "TBD" }),
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Derived from incoming edges once the canvas is connected." })
    ] })
  ] });
}
const zt = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5
};
function Oc(t) {
  return !t || t <= 0 ? "minutes" : t % zt.hours === 0 ? "hours" : t % zt.minutes === 0 ? "minutes" : "seconds";
}
function Ec({ data: t, onChange: n }) {
  const r = t.approvers ?? [], i = r.length === 0, [a, s] = S(() => Oc(t.timeoutMs)), d = t.timeoutMs !== void 0 ? Math.round(t.timeoutMs / zt[a]) : "", c = r.filter((g) => g.type === "user").map((g) => g.value), l = (g) => {
    const x = r.filter((N) => N.type === "role"), v = [...g.map((N) => ({ type: "user", value: N })), ...x];
    n({
      approvers: v,
      // Clamp requiredCount so it never exceeds approvers.length (min 1).
      requiredCount: Math.max(1, Math.min(t.requiredCount || 1, v.length || 1))
    });
  }, p = (g) => {
    const x = r.filter((f, v) => v !== g);
    n({
      approvers: x,
      requiredCount: Math.max(1, Math.min(t.requiredCount || 1, x.length || 1))
    });
  }, u = (g) => {
    if (g === "") {
      n({ timeoutMs: void 0 });
      return;
    }
    const x = Math.max(0, parseInt(g, 10) || 0);
    n({ timeoutMs: x * zt[a] });
  }, m = (g) => {
    s(g), typeof d == "number" && !Number.isNaN(d) && n({ timeoutMs: d * zt[g] });
  }, h = Math.max(1, r.length);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(
      se,
      {
        label: "Approvers",
        required: !0,
        error: i ? "At least one approver is required." : void 0,
        help: i ? void 0 : "Who can approve this step.",
        children: [
          /* @__PURE__ */ e(
            Ka,
            {
              value: c,
              onChange: l,
              placeholder: "Add approver…"
            }
          ),
          r.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 mt-2", children: r.map((g, x) => /* @__PURE__ */ o(
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
                /* @__PURE__ */ e(
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
    /* @__PURE__ */ e(
      se,
      {
        label: "Required count",
        required: !0,
        help: "How many approvers must say yes.",
        children: /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "number",
              min: 1,
              max: h,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-24 font-inherit",
              value: t.requiredCount || 1,
              onChange: (g) => {
                const x = parseInt(g.target.value, 10), f = Math.max(1, Math.min(h, Number.isNaN(x) ? 1 : x));
                n({ requiredCount: f });
              }
            }
          ),
          /* @__PURE__ */ o("span", { className: "text-text-tertiary text-xs", children: [
            t.requiredCount || 1,
            " of ",
            h
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ o(se, { label: "Timeout", help: "Leave blank for no timeout.", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(
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
            onChange: (g) => m(g.target.value),
            children: [
              /* @__PURE__ */ e("option", { value: "seconds", children: "seconds" }),
              /* @__PURE__ */ e("option", { value: "minutes", children: "minutes" }),
              /* @__PURE__ */ e("option", { value: "hours", children: "hours" })
            ]
          }
        )
      ] }),
      t.timeoutMs !== void 0 && t.timeoutMs > 0 && /* @__PURE__ */ o("div", { className: "mt-2", children: [
        /* @__PURE__ */ e("label", { className: "text-[11px] font-semibold text-text-secondary", children: "If timeout" }),
        /* @__PURE__ */ e("div", { className: "flex gap-3 mt-1", children: ["reject", "approve"].map((g) => /* @__PURE__ */ o(
          "label",
          {
            className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
            children: [
              /* @__PURE__ */ e(
                "input",
                {
                  type: "radio",
                  name: "approval-timeout-action",
                  checked: (t.timeoutAction ?? "reject") === g,
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
    /* @__PURE__ */ e(se, { label: "Message for approver (optional)", help: "Shown to the approver when the request is sent.", children: /* @__PURE__ */ e(
      "textarea",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]",
        value: t.message ?? "",
        onChange: (g) => n({ message: g.target.value || void 0 }),
        placeholder: "Please review the summary before it's posted to the document."
      }
    ) })
  ] });
}
function Hn(t) {
  switch (Array.isArray(t.type) ? t.type[0] : t.type) {
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
function Xo(t) {
  const n = Array.isArray(t.type) ? t.type[0] : t.type;
  if (n === "array") {
    const r = t.items ? Array.isArray(t.items.type) ? t.items.type[0] : t.items.type : void 0;
    return r ? `array of ${r}` : "array";
  }
  return n ?? "unknown";
}
function qt(t, n, r, i, a) {
  if (a.has(t)) return;
  a.add(t);
  const s = Array.isArray(t.type) ? t.type[0] : t.type, d = [t.anyOf, t.oneOf, t.allOf].filter(Boolean);
  for (const c of d)
    for (const l of c)
      qt(l, n, r, i, a);
  if (s === "object" && t.properties) {
    for (const [c, l] of Object.entries(t.properties)) {
      const p = `${n}.${c}`, u = Hn(l);
      i.push({
        path: p,
        label: `${c} (${Xo(l)})`,
        depth: r,
        kind: u,
        isArrayItems: u === "array"
      }), qt(l, p, r + 1, i, a);
    }
    return;
  }
  if (s === "array") {
    const c = `${n}[*]`, l = t.items, p = l ? Hn(l) : "unknown";
    i.push({
      path: c,
      label: `${n.slice(n.lastIndexOf(".") + 1)}[*] (each item)`,
      depth: r,
      kind: p,
      isArrayItems: !0
    }), l && qt(l, c, r + 1, i, a);
  }
}
function _c(t, n = "$") {
  if (!t || typeof t != "object") return [];
  const r = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(t.type) ? t.type[0] : t.type) === "object" && t.properties)
    for (const [s, d] of Object.entries(t.properties)) {
      const c = `${n}.${s}`, l = Hn(d);
      r.push({
        path: c,
        label: `${s} (${Xo(d)})`,
        depth: 0,
        kind: l,
        isArrayItems: l === "array"
      }), qt(d, c, 1, r, i);
    }
  else
    qt(t, n, 0, r, i);
  return r;
}
const Lc = {};
function Bc() {
  return `${(typeof import.meta < "u" && Lc?.VITE_SOCIAL_API_URL) ?? ""}/api/pipeline/output-schemas`;
}
let Nn = null, Tt = null;
async function Uc() {
  return Nn || (Tt || (Tt = fetch(Bc()).then((t) => {
    if (!t.ok) throw new Error(`HTTP ${t.status}`);
    return t.json();
  }).then((t) => (Nn = t, Tt = null, t)).catch((t) => {
    throw Tt = null, t;
  })), Tt);
}
const Fc = {
  array: "bg-primary-bg text-primary-fg border-primary-border",
  object: "bg-surface-panel text-text-secondary border-border",
  string: "bg-success-bg text-success-fg border-success-border",
  number: "bg-warning-bg text-warning-fg border-warning-border",
  boolean: "bg-pink-50 text-pink-700 border-pink-200",
  unknown: "bg-surface-panel text-text-tertiary border-border"
};
function jc({ kind: t }) {
  return /* @__PURE__ */ e(
    "span",
    {
      className: I(
        "inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4",
        Fc[t]
      ),
      children: t
    }
  );
}
function zc({ entry: t, isSelected: n, onPick: r }) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      onClick: () => r(t.path),
      "data-testid": `path-row-${t.path}`,
      className: I(
        "w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors duration-100",
        "hover:bg-surface-panel focus:outline-none focus:ring-2 focus:ring-primary/50",
        n && "bg-primary-bg ring-1 ring-inset ring-primary",
        t.isArrayItems && !n && "hover:bg-primary-bg"
      ),
      style: { paddingLeft: `${8 + t.depth * 12}px` },
      children: [
        /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "flex-1 font-mono text-[12px] leading-5 truncate",
              t.isArrayItems ? "text-primary-fg font-semibold" : "text-text-primary"
            ),
            children: t.path
          }
        ),
        /* @__PURE__ */ e(jc, { kind: t.kind })
      ]
    }
  );
}
function qc({
  value: t,
  onChange: n,
  upstreamKind: r,
  upstreamSchema: i
}) {
  const [a, s] = S("idle"), [d, c] = S(null), l = ce(!0);
  re(() => (l.current = !0, () => {
    l.current = !1;
  }), []);
  const p = q(() => i !== void 0 ? i : d, [i, d]);
  re(() => {
    !r || i !== void 0 || (s("loading"), Uc().then((f) => {
      if (!l.current) return;
      const v = f.schemas[r] ?? null;
      c(v), s("done");
    }).catch(() => {
      l.current && s("error");
    }));
  }, [r, i]);
  const u = q(
    () => _c(p),
    [p]
  ), m = p !== null && u.length > 0, h = O(
    (f) => {
      n(f);
    },
    [n]
  );
  if (!r && i === void 0)
    return /* @__PURE__ */ e(
      fn,
      {
        value: t,
        onChange: n,
        enforcePrefix: !0,
        "data-testid": "scatter-path-plain-input"
      }
    );
  if (!m)
    return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
      a === "loading" && /* @__PURE__ */ o("p", { className: "text-[11px] text-text-tertiary leading-4", children: [
        "Loading schema for ",
        r,
        "…"
      ] }),
      a === "error" && /* @__PURE__ */ e("p", { className: "text-[11px] text-warning-fg leading-4", children: "Could not load schema — enter path manually." }),
      (a === "done" || i === null) && /* @__PURE__ */ o("p", { className: "text-[11px] text-text-tertiary leading-4", children: [
        "Schema unavailable for ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: r }),
        " — enter path manually."
      ] }),
      /* @__PURE__ */ e(
        fn,
        {
          value: t,
          onChange: n,
          enforcePrefix: !0,
          "data-testid": "scatter-path-fallback-input"
        }
      )
    ] });
  const x = u.filter((f) => f.isArrayItems).length < u.length;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("p", { className: "text-[11px] text-neutral leading-4", children: [
      "Click a path to set itemsPath.",
      x && /* @__PURE__ */ o(K, { children: [
        " ",
        /* @__PURE__ */ e("span", { className: "text-primary-fg font-semibold", children: "Indigo" }),
        " ",
        "paths are arrays — valid scatter sources."
      ] })
    ] }),
    /* @__PURE__ */ e(
      "div",
      {
        className: "flex flex-col gap-px border border-border rounded-md bg-white max-h-48 overflow-y-auto",
        "data-testid": "scatter-path-tree",
        role: "listbox",
        "aria-label": "Available output paths",
        children: u.map((f) => /* @__PURE__ */ e(
          zc,
          {
            entry: f,
            isSelected: t === f.path,
            onPick: h
          },
          f.path
        ))
      }
    ),
    /* @__PURE__ */ e(
      fn,
      {
        value: t,
        onChange: n,
        enforcePrefix: !0,
        "data-testid": "scatter-path-input",
        placeholder: "$.path selected above or type manually"
      }
    )
  ] });
}
const wn = "text-[12px] font-semibold text-text-secondary", kn = "text-[11px] text-text-tertiary mt-0.5", Wc = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary";
function Vc(t) {
  const { definition: n } = qe();
  return q(() => {
    if (!t || !n) return;
    const r = n.edges.find((a) => a.target === t);
    if (!r) return;
    const i = n.nodes.find((a) => a.id === r.source);
    if (i)
      return i.type;
  }, [t, n]);
}
function Kc({ data: t, onChange: n }) {
  const { selectedNodeId: r } = qe(), i = Vc(r), a = t.maxConcurrency ?? "";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { className: wn, children: [
        "Items path",
        /* @__PURE__ */ e("span", { className: "text-danger-fg ml-1", "aria-hidden": !0, children: "*" })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-1", children: /* @__PURE__ */ e(
        qc,
        {
          value: t.itemsPath ?? "",
          onChange: (s) => n({ itemsPath: s }),
          upstreamKind: i
        }
      ) }),
      !t.itemsPath?.trim() && /* @__PURE__ */ e("div", { role: "alert", className: "text-[11px] text-danger-fg mt-0.5", children: "Items path is required." }),
      !!t.itemsPath && !t.itemsPath.startsWith("$.") && /* @__PURE__ */ o("div", { role: "alert", className: "text-[11px] text-danger-fg mt-0.5", children: [
        "Path must start with ",
        /* @__PURE__ */ e("code", { children: "$." })
      ] }),
      !!t.itemsPath?.startsWith("$.") && /* @__PURE__ */ e("div", { className: kn, children: "JSONPath into context resolving to an array. Each element becomes one scatter arm." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-item-alias", className: wn, children: [
        "Item alias ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, default: item)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "scatter-item-alias",
          type: "text",
          spellCheck: !1,
          className: Wc,
          value: t.itemAlias ?? "",
          onChange: (s) => n({ itemAlias: s.target.value.trim() || void 0 }),
          placeholder: "item"
        }
      ),
      /* @__PURE__ */ o("div", { className: kn, children: [
        "Key written to ",
        /* @__PURE__ */ e("code", { children: "$.scatter.<alias>" }),
        " for each arm."
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-max-concurrency", className: wn, children: [
        "Max concurrency ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, default: 4)" })
      ] }),
      /* @__PURE__ */ e(
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
      /* @__PURE__ */ e("div", { className: kn, children: "Maximum number of arms executing concurrently." })
    ] })
  ] });
}
function Hc({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const Jc = ["cover", "contain", "fill", "inside", "outside"], Rt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", Pt = "text-[12px] font-semibold text-text-secondary", Er = "text-[11px] text-text-tertiary mt-0.5";
function Gc({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "resize-source-image-path", className: Pt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "resize-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Rt,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Hc, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "resize-width", className: Pt, children: "Width (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "resize-width",
            type: "number",
            min: 1,
            step: 1,
            className: Rt,
            value: t.width ?? "",
            onChange: (a) => {
              const s = parseInt(a.target.value, 10);
              n({ width: Number.isFinite(s) && s > 0 ? s : void 0 });
            },
            placeholder: "e.g. 512"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "resize-height", className: Pt, children: "Height (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "resize-height",
            type: "number",
            min: 1,
            step: 1,
            className: Rt,
            value: t.height ?? "",
            onChange: (a) => {
              const s = parseInt(a.target.value, 10);
              n({ height: Number.isFinite(s) && s > 0 ? s : void 0 });
            },
            placeholder: "e.g. 512"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "resize-fit", className: Pt, children: "Fit mode" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "resize-fit",
          className: Rt,
          value: t.fit ?? "cover",
          onChange: (a) => n({ fit: a.target.value }),
          children: Jc.map((a) => /* @__PURE__ */ e("option", { value: a, children: a }, a))
        }
      ),
      /* @__PURE__ */ o("div", { className: Er, children: [
        "How the image is fit into the target dimensions. ",
        /* @__PURE__ */ e("code", { children: "cover" }),
        " (default) crops; ",
        /* @__PURE__ */ e("code", { children: "contain" }),
        " letterboxes; ",
        /* @__PURE__ */ e("code", { children: "fill" }),
        " stretches."
      ] })
    ] }),
    /* @__PURE__ */ o("label", { htmlFor: "resize-without-enlargement", className: "flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer", children: [
      /* @__PURE__ */ e(
        "input",
        {
          id: "resize-without-enlargement",
          type: "checkbox",
          checked: t.withoutEnlargement ?? !1,
          onChange: (a) => n({ withoutEnlargement: a.target.checked }),
          className: "w-3.5 h-3.5 accent-primary"
        }
      ),
      "Do not enlarge if already smaller than target"
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "resize-background", className: Pt, children: [
        "Background colour ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, for contain / fill)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "resize-background",
          type: "text",
          spellCheck: !1,
          className: Rt,
          value: t.background ?? "",
          onChange: (a) => n({ background: a.target.value.trim() || void 0 }),
          placeholder: "#ffffff"
        }
      ),
      /* @__PURE__ */ o("div", { className: Er, children: [
        "Hex colour used to fill letterbox padding. Only applies when fit is ",
        /* @__PURE__ */ e("code", { children: "contain" }),
        " or ",
        /* @__PURE__ */ e("code", { children: "fill" }),
        "."
      ] })
    ] })
  ] });
}
function Yc({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
function Xc(t) {
  switch (t) {
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
const Jn = "text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", Qc = "flex-1 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", _r = "text-[12px] font-semibold text-text-secondary", Zc = "text-[11px] text-text-tertiary mt-0.5";
function ed({ op: t, index: n, onUpdate: r, onRemove: i }) {
  return /* @__PURE__ */ o("div", { className: "border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2", "data-testid": `geo-op-card-${n}`, children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary font-semibold min-w-[20px]", children: [
        n + 1,
        "."
      ] }),
      /* @__PURE__ */ o(
        "select",
        {
          className: Qc,
          value: t.op,
          onChange: (a) => r(Xc(a.target.value)),
          "aria-label": `Op ${n + 1} type`,
          children: [
            /* @__PURE__ */ e("option", { value: "rotate", children: "Rotate" }),
            /* @__PURE__ */ e("option", { value: "flip", children: "Flip (vertical)" }),
            /* @__PURE__ */ e("option", { value: "flop", children: "Flop (horizontal)" })
          ]
        }
      ),
      /* @__PURE__ */ e(
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
    t.op === "rotate" && /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e("label", { className: "text-[11px] text-text-tertiary min-w-[60px]", children: "Degrees" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "number",
            min: -360,
            max: 360,
            step: 90,
            className: `${Jn} w-24`,
            value: t.degrees,
            onChange: (a) => {
              const s = parseFloat(a.target.value);
              r({ ...t, degrees: Number.isFinite(s) ? s : 90 });
            },
            "aria-label": "Rotation degrees"
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: "°" })
      ] }),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e("label", { className: "text-[11px] text-text-tertiary min-w-[60px]", children: "Background" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            spellCheck: !1,
            className: `${Jn} flex-1`,
            value: t.background ?? "",
            onChange: (a) => r({ ...t, background: a.target.value.trim() || void 0 }),
            placeholder: "#000000"
          }
        )
      ] }),
      /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "checkbox",
            checked: t.trimAfter ?? !1,
            onChange: (a) => r({ ...t, trimAfter: a.target.checked }),
            className: "w-3.5 h-3.5 accent-primary"
          }
        ),
        "Trim after rotate"
      ] })
    ] })
  ] });
}
function td({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null), a = t.operations ?? [], s = (l, p) => {
    n({ operations: a.map((u, m) => m === l ? p : u) });
  }, d = (l) => {
    n({ operations: a.filter((p, u) => u !== l) });
  }, c = () => {
    n({ operations: [...a, { op: "rotate", degrees: 90 }] });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "transform-geo-source-image-path", className: _r, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "transform-geo-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `mt-1 w-full ${Jn}`,
          value: t.sourceImagePath ?? "",
          onChange: (l) => n({ sourceImagePath: l.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Yc, { samples: i.map((l) => l.path), onSelect: (l) => n({ sourceImagePath: l }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${_r} mb-2`, children: [
        "Operations ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      a.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-2 italic", children: "No operations — add at least one." }),
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: a.map((l, p) => /* @__PURE__ */ e(
        ed,
        {
          op: l,
          index: p,
          onUpdate: (u) => s(p, u),
          onRemove: () => d(p)
        },
        p
      )) }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: c,
          className: `w-full text-[12px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer py-1.5 px-3 ${a.length > 0 ? "mt-2" : ""}`,
          "data-testid": "add-geo-op-btn",
          children: "+ Add operation"
        }
      ),
      /* @__PURE__ */ e("div", { className: `${Zc} mt-1.5`, children: "Supported: Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror)." })
    ] })
  ] });
}
function nd({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const rd = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "avif", label: "AVIF" }
], Gn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", od = `${Gn} font-mono`, Cn = "text-[12px] font-semibold text-text-secondary", In = "text-[11px] text-text-tertiary mt-0.5";
function ad({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null), a = t.format === "jpeg" || t.format === "webp" || t.format === "avif";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-source-image-path", className: Cn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "format-convert-source-image-path",
          type: "text",
          spellCheck: !1,
          className: od,
          value: t.sourceImagePath ?? "",
          onChange: (s) => n({ sourceImagePath: s.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(nd, { samples: i.map((s) => s.path), onSelect: (s) => n({ sourceImagePath: s }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "format-convert-format", className: Cn, children: "Output format" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "format-convert-format",
          className: Gn,
          value: t.format ?? "jpeg",
          onChange: (s) => n({ format: s.target.value }),
          children: rd.map((s) => /* @__PURE__ */ e("option", { value: s.value, children: s.label }, s.value))
        }
      )
    ] }),
    a && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-quality", className: Cn, children: [
        "Quality ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(1–100, default 80)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "format-convert-quality",
          type: "number",
          min: 1,
          max: 100,
          step: 1,
          className: Gn,
          value: t.quality ?? 80,
          onChange: (s) => {
            const d = parseInt(s.target.value, 10);
            n({ quality: Number.isFinite(d) ? Math.min(100, Math.max(1, d)) : 80 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: In, children: "Higher = better quality, larger file. 80 is a good default." })
    ] }),
    (t.format === "webp" || t.format === "avif") && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-lossless", className: "flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer", children: [
        /* @__PURE__ */ e(
          "input",
          {
            id: "format-convert-lossless",
            type: "checkbox",
            checked: t.lossless ?? !1,
            onChange: (s) => n({ lossless: s.target.checked }),
            className: "w-3.5 h-3.5 accent-primary"
          }
        ),
        "Lossless encoding"
      ] }),
      /* @__PURE__ */ e("div", { className: In, children: "Overrides quality when enabled. Produces larger files with no compression artefacts." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-strip-metadata", className: "flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer", children: [
        /* @__PURE__ */ e(
          "input",
          {
            id: "format-convert-strip-metadata",
            type: "checkbox",
            checked: t.stripMetadata ?? !1,
            onChange: (s) => n({ stripMetadata: s.target.checked }),
            className: "w-3.5 h-3.5 accent-primary"
          }
        ),
        "Strip EXIF and metadata"
      ] }),
      /* @__PURE__ */ e("div", { className: In, children: "Removes camera EXIF, GPS, copyright tags etc. Reduces file size; recommended for web delivery." })
    ] })
  ] });
}
function id({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const Gt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Yt = "text-[12px] font-semibold text-text-secondary", Sn = "text-[11px] text-text-tertiary mt-0.5";
function sd({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-source-image-path", className: Yt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "sharpen-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `${Gt} font-mono`,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(id, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-sigma", className: Yt, children: [
        "Sigma ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, default 1)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "sharpen-sigma",
          type: "number",
          min: 0.01,
          max: 10,
          step: 0.1,
          className: Gt,
          value: t.sigma ?? "",
          onChange: (a) => {
            const s = parseFloat(a.target.value);
            n({ sigma: Number.isFinite(s) && s > 0 ? s : void 0 });
          },
          placeholder: "1"
        }
      ),
      /* @__PURE__ */ e("div", { className: Sn, children: "Gaussian mask sigma. Higher = broader/stronger sharpening. Typical range: 0.5–3." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-m1", className: Yt, children: [
        "m1 — flat area level ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "sharpen-m1",
          type: "number",
          min: 0,
          max: 1e6,
          step: 0.1,
          className: Gt,
          value: t.m1 ?? "",
          onChange: (a) => {
            const s = parseFloat(a.target.value);
            n({ m1: Number.isFinite(s) && s >= 0 ? s : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: Sn, children: "Level of sharpening applied to flat (smooth) areas of the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-m2", className: Yt, children: [
        "m2 — jagged area level ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "sharpen-m2",
          type: "number",
          min: 0,
          max: 1e6,
          step: 0.1,
          className: Gt,
          value: t.m2 ?? "",
          onChange: (a) => {
            const s = parseFloat(a.target.value);
            n({ m2: Number.isFinite(s) && s >= 0 ? s : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: Sn, children: "Level of sharpening applied to jagged (edge) areas of the image." })
    ] })
  ] });
}
function ld({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const cd = [
  "northwest",
  "north",
  "northeast",
  "west",
  "center",
  "east",
  "southwest",
  "south",
  "southeast"
], _t = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Lr = `${_t} font-mono`, pt = "text-[12px] font-semibold text-text-secondary", Br = "text-[11px] text-text-tertiary mt-0.5";
function dd({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "watermark-source-image-path", className: pt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Lr,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(ld, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-overlay-image-id", className: pt, children: "Overlay image ID" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-overlay-image-id",
          type: "text",
          spellCheck: !1,
          className: Lr,
          value: t.overlayImageId ?? "",
          onChange: (a) => n({ overlayImageId: a.target.value.trim() }),
          placeholder: "img_xxxxxxxx"
        }
      ),
      /* @__PURE__ */ e("div", { className: Br, children: "The imageId of the watermark/overlay image already stored in the blob store. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-gravity", className: pt, children: "Gravity (placement)" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "watermark-gravity",
          className: _t,
          value: t.gravity ?? "southeast",
          onChange: (a) => n({ gravity: a.target.value }),
          children: cd.map((a) => /* @__PURE__ */ e("option", { value: a, children: a }, a))
        }
      ),
      /* @__PURE__ */ e("div", { className: Br, children: "Where the overlay is placed on the source image. Default: southeast." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "watermark-opacity", className: pt, children: [
        "Opacity ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(0.0–1.0, default 1.0)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-opacity",
          type: "number",
          min: 0,
          max: 1,
          step: 0.05,
          className: _t,
          value: t.opacity ?? 1,
          onChange: (a) => {
            const s = parseFloat(a.target.value);
            n({ opacity: Number.isFinite(s) ? Math.min(1, Math.max(0, s)) : 1 });
          }
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "watermark-offset-x", className: pt, children: "Offset X (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "watermark-offset-x",
            type: "number",
            step: 1,
            className: _t,
            value: t.offsetX ?? "",
            onChange: (a) => {
              const s = parseInt(a.target.value, 10);
              n({ offsetX: Number.isFinite(s) ? s : void 0 });
            },
            placeholder: "0"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "watermark-offset-y", className: pt, children: "Offset Y (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "watermark-offset-y",
            type: "number",
            step: 1,
            className: _t,
            value: t.offsetY ?? "",
            onChange: (a) => {
              const s = parseInt(a.target.value, 10);
              n({ offsetY: Number.isFinite(s) ? s : void 0 });
            },
            placeholder: "0"
          }
        )
      ] })
    ] })
  ] });
}
const Ur = 50;
function pd(t, n) {
  const [r, i] = S(t), [a, s] = S([]), [d, c] = S([]), l = ce(r);
  l.current = r;
  const p = O(
    (N) => {
      i((b) => {
        const w = N(b);
        return s((y) => {
          const k = [...y, b];
          return k.length > Ur && k.shift(), k;
        }), c([]), n(w), w;
      });
    },
    [n]
  ), u = O(
    (N) => {
      p((b) => [...b, N]);
    },
    [p]
  ), m = O(
    (N, b, w) => {
      p(
        (y) => y.map((k) => k.id === N ? { ...k, x: b, y: w } : k)
      );
    },
    [p]
  ), h = O(
    (N, b, w, y, k) => {
      p(
        (C) => C.map(($) => $.id === N ? { ...$, x: b, y: w, width: y, height: k } : $)
      );
    },
    [p]
  ), g = O(
    (N, b) => {
      p(
        (w) => w.map((y) => y.id === N ? { ...y, label: b } : y)
      );
    },
    [p]
  ), x = O(
    (N) => {
      p((b) => b.filter((w) => w.id !== N));
    },
    [p]
  ), f = O(() => {
    s((N) => {
      if (N.length === 0) return N;
      const b = N[N.length - 1];
      c((y) => [...y, l.current]);
      const w = b;
      return i(w), n(w), N.slice(0, -1);
    });
  }, [n]), v = O(() => {
    c((N) => {
      if (N.length === 0) return N;
      const b = N[N.length - 1];
      s((y) => {
        const k = [...y, l.current];
        return k.length > Ur && k.shift(), k;
      });
      const w = b;
      return i(w), n(w), N.slice(0, -1);
    });
  }, [n]);
  return {
    boxes: r,
    addBox: u,
    moveBox: m,
    resizeBox: h,
    setLabel: g,
    deleteBox: x,
    undo: f,
    redo: v,
    canUndo: a.length > 0,
    canRedo: d.length > 0
  };
}
function ud() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Ce(t, n, r) {
  return Math.max(n, Math.min(r, t));
}
function $n(t, n) {
  const r = n.getBoundingClientRect();
  return {
    x: Ce(t.clientX - r.left, 0, r.width),
    y: Ce(t.clientY - r.top, 0, r.height)
  };
}
function Tn(t, n, r, i, a, s) {
  const d = a / r, c = s / i;
  return { x: t * d, y: n * c };
}
function Fr(t, n, r) {
  return {
    left: `${t.x / n * 100}%`,
    top: `${t.y / r * 100}%`,
    width: `${t.width / n * 100}%`,
    height: `${t.height / r * 100}%`
  };
}
function md(t, n, r) {
  for (let i = r.length - 1; i >= 0; i--) {
    const a = r[i];
    if (t >= a.x && t <= a.x + a.width && n >= a.y && n <= a.y + a.height)
      return a;
  }
  return null;
}
function Qo({
  imageUrl: t,
  imageWidth: n,
  imageHeight: r,
  boxes: i,
  onChange: a,
  readOnly: s = !1,
  className: d
}) {
  const c = ce(null), [l, p] = S({ kind: "idle" }), [u, m] = S(null), h = ce(null), { addBox: g, moveBox: x, resizeBox: f, setLabel: v, deleteBox: N } = pd(
    i,
    a
  );
  re(() => {
    u && h.current && (h.current.focus(), h.current.select());
  }, [u]);
  const b = O(
    (E) => {
      if (s || E.button !== 0) return;
      const P = c.current;
      if (!P) return;
      E.preventDefault(), P.setPointerCapture(E.pointerId);
      const { x: G, y: j } = $n(E, P), _ = P.getBoundingClientRect(), { x: W, y: V } = Tn(
        G,
        j,
        _.width,
        _.height,
        n,
        r
      ), Y = md(W, V, i);
      p(Y ? {
        kind: "move",
        id: Y.id,
        offsetX: W - Y.x,
        offsetY: V - Y.y,
        currentX: W,
        currentY: V
      } : { kind: "create", startX: W, startY: V, currentX: W, currentY: V });
    },
    [s, i, n, r]
  ), w = O(
    (E, P, G) => {
      if (s) return;
      E.stopPropagation(), E.preventDefault();
      const j = c.current;
      if (!j) return;
      j.setPointerCapture(E.pointerId);
      const { x: _, y: W } = $n(E, j), V = j.getBoundingClientRect(), { x: Y, y: me } = Tn(_, W, V.width, V.height, n, r);
      p({ kind: "resize", id: P.id, corner: G, origBox: { ...P }, currentX: Y, currentY: me });
    },
    [s, n, r]
  ), y = O(
    (E) => {
      if (l.kind === "idle") return;
      const P = c.current;
      if (!P) return;
      const { x: G, y: j } = $n(E, P), _ = P.getBoundingClientRect(), { x: W, y: V } = Tn(G, j, _.width, _.height, n, r);
      l.kind === "create" ? p((Y) => Y.kind === "create" ? { ...Y, currentX: W, currentY: V } : Y) : l.kind === "move" ? p((Y) => Y.kind === "move" ? { ...Y, currentX: W, currentY: V } : Y) : l.kind === "resize" && p((Y) => Y.kind === "resize" ? { ...Y, currentX: W, currentY: V } : Y);
    },
    [l.kind, n, r]
  ), k = O(
    (E) => {
      if (l.kind === "create") {
        const P = Math.min(l.startX, l.currentX), G = Math.min(l.startY, l.currentY), j = Math.max(l.startX, l.currentX), _ = Math.max(l.startY, l.currentY), W = j - P, V = _ - G;
        W >= 4 && V >= 4 && g({ id: ud(), x: P, y: G, width: W, height: V });
      } else if (l.kind === "move") {
        const P = i.find((G) => G.id === l.id);
        if (P) {
          const G = Ce(l.currentX - l.offsetX, 0, n - P.width), j = Ce(l.currentY - l.offsetY, 0, r - P.height);
          x(l.id, G, j);
        }
      } else if (l.kind === "resize") {
        const { id: P, corner: G, origBox: j, currentX: _, currentY: W } = l;
        let { x: V, y: Y, width: me, height: z } = j;
        if (G === "nw") {
          const de = Ce(_, 0, V + me - 4), we = Ce(W, 0, Y + z - 4);
          me = V + me - de, z = Y + z - we, V = de, Y = we;
        } else if (G === "ne") {
          const de = Ce(W, 0, Y + z - 4);
          me = Ce(_ - V, 4, n - V), z = Y + z - de, Y = de;
        } else if (G === "sw") {
          const de = Ce(_, 0, V + me - 4);
          me = V + me - de, z = Ce(W - Y, 4, r - Y), V = de;
        } else
          me = Ce(_ - V, 4, n - V), z = Ce(W - Y, 4, r - Y);
        f(P, V, Y, me, z);
      }
      p({ kind: "idle" });
    },
    [l, i, g, x, f, n, r]
  ), C = O(
    (E, P) => {
      s || (E.preventDefault(), N(P));
    },
    [s, N]
  ), $ = O(
    (E, P) => {
      s || (E.key === "Delete" || E.key === "Backspace") && (E.preventDefault(), N(P));
    },
    [s, N]
  ), D = O(
    (E, P) => {
      s || (E.stopPropagation(), m({ id: P.id, value: P.label ?? "" }));
    },
    [s]
  ), A = O(() => {
    u && (v(u.id, u.value), m(null));
  }, [u, v]);
  let M = null;
  if (l.kind === "create") {
    const E = Math.min(l.startX, l.currentX), P = Math.min(l.startY, l.currentY), G = Math.max(l.startX, l.currentX), j = Math.max(l.startY, l.currentY);
    G - E >= 2 && j - P >= 2 && (M = { x: E, y: P, width: G - E, height: j - P });
  }
  let ne = null;
  if (l.kind === "move") {
    const E = i.find((P) => P.id === l.id);
    if (E) {
      const P = Ce(l.currentX - l.offsetX, 0, n - E.width), G = Ce(l.currentY - l.offsetY, 0, r - E.height);
      ne = { ...E, x: P, y: G };
    }
  }
  let R = null;
  if (l.kind === "resize") {
    const { corner: E, origBox: P, currentX: G, currentY: j } = l;
    let { x: _, y: W, width: V, height: Y } = P;
    if (E === "nw") {
      const me = Ce(G, 0, _ + V - 4), z = Ce(j, 0, W + Y - 4);
      V = _ + V - me, Y = W + Y - z, _ = me, W = z;
    } else if (E === "ne") {
      const me = Ce(j, 0, W + Y - 4);
      V = Ce(G - _, 4, n - _), Y = W + Y - me, W = me;
    } else if (E === "sw") {
      const me = Ce(G, 0, _ + V - 4);
      V = _ + V - me, Y = Ce(j - W, 4, r - W), _ = me;
    } else
      V = Ce(G - _, 4, n - _), Y = Ce(j - W, 4, r - W);
    R = { ...P, x: _, y: W, width: V, height: Y };
  }
  const H = /* @__PURE__ */ new Set();
  l.kind === "move" && H.add(l.id), l.kind === "resize" && H.add(l.id);
  const X = (E, P) => {
    const G = {
      nw: "-top-1.5 -left-1.5 cursor-nw-resize",
      ne: "-top-1.5 -right-1.5 cursor-ne-resize",
      sw: "-bottom-1.5 -left-1.5 cursor-sw-resize",
      se: "-bottom-1.5 -right-1.5 cursor-se-resize"
    };
    return /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "aria-label": `Resize ${P}`,
        className: I(
          "absolute h-3 w-3 rounded-sm border border-primary bg-white shadow",
          G[P]
        ),
        onPointerDown: (j) => w(j, E, P)
      },
      P
    );
  }, J = (E, P, G, j) => {
    const _ = Fr(E, n, r), W = u?.id === E.id;
    return /* @__PURE__ */ o(
      "div",
      {
        role: "none",
        "aria-label": `Bounding box${E.label ? ": " + E.label : ""}`,
        className: I(
          "absolute",
          P ? "opacity-60" : "opacity-100"
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
          W ? /* @__PURE__ */ e(
            "input",
            {
              ref: h,
              type: "text",
              value: u.value,
              onChange: (V) => m((Y) => Y ? { ...Y, value: V.target.value } : null),
              onBlur: A,
              onKeyDown: (V) => {
                V.key === "Enter" && (V.preventDefault(), A()), V.key === "Escape" && (V.preventDefault(), m(null));
              },
              className: "absolute -top-5 left-0 w-24 rounded border border-primary bg-white px-1 py-0 text-[10px] font-semibold text-primary shadow outline-none focus:ring-1 focus:ring-primary",
              onClick: (V) => V.stopPropagation()
            }
          ) : /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              tabIndex: 0,
              "aria-label": `Label: ${E.label || "Unlabeled"}. Double-click to edit.`,
              className: "absolute -top-5 left-0 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow",
              style: { whiteSpace: "nowrap" },
              onDoubleClick: (V) => D(V, E),
              onContextMenu: (V) => C(V, E.id),
              onKeyDown: (V) => $(V, E.id),
              children: E.label || "Unlabeled"
            }
          ),
          G && !s && /* @__PURE__ */ o(K, { children: [
            X(E, "nw"),
            X(E, "ne"),
            X(E, "sw"),
            X(E, "se")
          ] })
        ]
      },
      j
    );
  }, Q = () => {
    if (!M) return null;
    const E = Fr(M, n, r);
    return /* @__PURE__ */ e(
      "div",
      {
        "aria-hidden": !0,
        className: "pointer-events-none absolute",
        style: {
          left: E.left,
          top: E.top,
          width: E.width,
          height: E.height,
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
        /* @__PURE__ */ e(
          "img",
          {
            src: t,
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
              i.map((E) => H.has(E.id) ? null : J(E, !1, !0, `box-${E.id}`)),
              ne && J(ne, !0, !1, "ghost-move"),
              R && J(R, !0, !0, "ghost-resize"),
              Q()
            ]
          }
        ),
        !s && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute bottom-1.5 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80", children: "Drag to add box" })
      ]
    }
  );
}
const hd = [
  "$.scatter.item.bbox",
  "$.steps.visionAnalyze.output.extracted.regions[0].bbox",
  "$.trigger.payload.bbox"
], fd = "crop-region", gd = "crop";
function jr({
  samples: t,
  onSelect: n
}) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const zr = "mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Rn = "text-[12px] font-semibold text-text-secondary", At = "text-[11px] text-text-tertiary mt-0.5";
function xd(t) {
  const { definition: n } = qe(), r = q(() => !t || !n ? null : n.edges.find((d) => d.target === t)?.source ?? null, [n, t]), a = he(r ?? "")?.images?.[0];
  return a ? { imageId: a.imageId, width: a.width, height: a.height } : null;
}
function bd({
  data: t,
  onChange: n,
  currentNodeId: r
}) {
  const i = Te(r ?? null), a = t.materialize !== !1, s = xd(r), d = Re(), c = q(() => t.bbox ? [
    {
      id: fd,
      x: t.bbox.x,
      y: t.bbox.y,
      width: t.bbox.width,
      height: t.bbox.height,
      label: gd
    }
  ] : [], [t.bbox]), l = O(
    (p) => {
      if (p.length === 0) {
        n({ bbox: void 0 });
        return;
      }
      const u = p[p.length - 1], m = {
        x: Math.round(u.x),
        y: Math.round(u.y),
        width: Math.round(u.width),
        height: Math.round(u.height)
      };
      n({ bbox: m });
    },
    [n]
  );
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-source-image-path", className: Rn, children: [
        "Source image path",
        " ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "crop-source-image-path",
          type: "text",
          spellCheck: !1,
          className: zr,
          value: t.sourceImagePath ?? "",
          onChange: (p) => n({ sourceImagePath: p.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ o("div", { className: At, children: [
        "JSONPath to the imageId of the source image. Defaults server-side to",
        " ",
        /* @__PURE__ */ e("code", { children: "$.scatter.parentImageId" }),
        "."
      ] }),
      /* @__PURE__ */ e(
        jr,
        {
          samples: i.map((p) => p.path),
          onSelect: (p) => n({ sourceImagePath: p })
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-bbox-path", className: Rn, children: [
        "Bounding-box path",
        " ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "crop-bbox-path",
          type: "text",
          spellCheck: !1,
          className: zr,
          value: t.bboxPath ?? "",
          onChange: (p) => n({ bboxPath: p.target.value.trim() || void 0 }),
          placeholder: "$.scatter.item.bbox"
        }
      ),
      /* @__PURE__ */ o("div", { className: At, children: [
        "JSONPath to a bbox object ",
        /* @__PURE__ */ e("code", { children: "{ x, y, width, height }" }),
        " in pixels. Overrides the manual crop region below when present at run time."
      ] }),
      /* @__PURE__ */ e(
        jr,
        {
          samples: hd,
          onSelect: (p) => n({ bboxPath: p })
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { "data-testid": "crop-region-section", children: [
      /* @__PURE__ */ o("div", { className: Rn, children: [
        "Crop region",
        " ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e("div", { className: At, children: "Drag on the source image to paint the crop box. Drawing a new box replaces the previous one." }),
      s ? /* @__PURE__ */ o(K, { children: [
        /* @__PURE__ */ e(
          Qo,
          {
            imageUrl: d(s.imageId),
            imageWidth: s.width,
            imageHeight: s.height,
            boxes: c,
            onChange: l,
            className: "mt-1.5"
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: "mt-1.5 flex flex-wrap gap-1",
            "data-testid": "crop-region-chips",
            children: t.bbox ? /* @__PURE__ */ o(K, { children: [
              /* @__PURE__ */ o(le, { tone: "neutral", size: "xs", mono: !0, "data-testid": "crop-chip-x", children: [
                "x: ",
                t.bbox.x
              ] }),
              /* @__PURE__ */ o(le, { tone: "neutral", size: "xs", mono: !0, "data-testid": "crop-chip-y", children: [
                "y: ",
                t.bbox.y
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
                    t.bbox.width
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
                    t.bbox.height
                  ]
                }
              )
            ] }) : /* @__PURE__ */ e("span", { className: I(At, "italic"), children: "No crop region yet — drag on the image to add one." })
          }
        )
      ] }) : /* @__PURE__ */ e(
        nt,
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
          /* @__PURE__ */ e(
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
    /* @__PURE__ */ e("div", { className: At, children: "When enabled (default), the cropped image is saved to the ImageBlobStore." })
  ] });
}
function yd(t) {
  const { selectedNodeId: n } = qe();
  return /* @__PURE__ */ e(bd, { ...t, currentNodeId: n });
}
function vd({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const qr = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Pn = "text-[12px] font-semibold text-text-secondary", An = "text-[11px] text-text-tertiary mt-0.5";
function Nd({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null), a = t.algorithm ?? "luminosity", s = t.contrast ?? 1;
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-bw-source-image-path", className: Pn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "adjust-bw-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `${qr} font-mono`,
          value: t.sourceImagePath ?? "",
          onChange: (d) => n({ sourceImagePath: d.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: An, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(vd, { samples: i.map((d) => d.path), onSelect: (d) => n({ sourceImagePath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "adjust-bw-algorithm", className: Pn, children: "Greyscale algorithm" }),
      /* @__PURE__ */ o(
        "select",
        {
          id: "adjust-bw-algorithm",
          className: qr,
          value: a,
          onChange: (d) => n({ algorithm: d.target.value }),
          children: [
            /* @__PURE__ */ e("option", { value: "luminosity", children: "Luminosity — 0.21R + 0.72G + 0.07B (perceptually accurate)" }),
            /* @__PURE__ */ e("option", { value: "average", children: "Average — (R+G+B)/3 (fast, flat)" }),
            /* @__PURE__ */ e("option", { value: "desaturate", children: "Desaturate — (max+min)/2 (Lightness channel)" })
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: An, children: "Controls how RGB channels are weighted when converting to greyscale." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-bw-contrast", className: Pn, children: [
        "Contrast multiplier ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(default: 1)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "adjust-bw-contrast",
          type: "number",
          min: 0,
          max: 4,
          step: 0.05,
          className: "mt-1 w-28 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary",
          value: s,
          onChange: (d) => {
            const c = parseFloat(d.target.value);
            n({ contrast: Number.isFinite(c) ? Math.max(0, c) : 1 });
          }
        }
      ),
      /* @__PURE__ */ o("div", { className: An, children: [
        "Applied after greyscale conversion. 1 = no change, ",
        "<",
        "1 = lower contrast,",
        " >",
        "1 = higher contrast. Range 0–4."
      ] })
    ] })
  ] });
}
function wd({
  value: t,
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
  const [u, m] = S(!1), [h, g] = S(null), [x, f] = S("");
  async function v(w) {
    m(!0), g(null);
    try {
      const y = await r(w);
      n(y), f("");
    } catch (y) {
      const k = y instanceof Error ? y.message : "Upload failed. Please try again.";
      g(k);
    } finally {
      m(!1);
    }
  }
  function N(w) {
    w.length > 0 && v(w[0]);
  }
  async function b() {
    const w = x.trim();
    w && await v({ url: w });
  }
  if (t) {
    const w = i(t.imageId);
    return /* @__PURE__ */ e(
      "div",
      {
        className: I("flex flex-col gap-3", l),
        "data-testid": p,
        children: /* @__PURE__ */ o("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ e(
            _o,
            {
              src: w,
              alt: "Uploaded image",
              size: "md",
              aspectRatio: "square",
              "data-testid": p ? `${p}-thumbnail` : void 0
            }
          ),
          /* @__PURE__ */ e(
            Me,
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
        u && /* @__PURE__ */ e(
          "p",
          {
            className: "text-sm text-neutral",
            "data-testid": p ? `${p}-uploading` : void 0,
            children: "Uploading..."
          }
        ),
        !c && /* @__PURE__ */ e(
          Ya,
          {
            accept: s,
            maxSize: a,
            onFiles: N,
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
              /* @__PURE__ */ e(
                Ee,
                {
                  type: "url",
                  placeholder: "https://example.com/image.jpg",
                  value: x,
                  onChange: (w) => f(w.target.value),
                  disabled: u,
                  "data-testid": p ? `${p}-url-input` : void 0,
                  onKeyDown: (w) => {
                    w.key === "Enter" && b();
                  }
                }
              ),
              /* @__PURE__ */ e(
                Me,
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
        h && /* @__PURE__ */ e(
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
function Zo(t) {
  const n = Eo(), r = n.uploadImage;
  return r ? /* @__PURE__ */ e(
    wd,
    {
      ...t,
      uploadImage: r,
      getImageUrl: n.getImageUrl
    }
  ) : /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: "This host has not wired uploadImage. Cannot accept new uploads." });
}
const Yn = {
  brightness: "Brightness",
  contrast: "Contrast",
  saturation: "Saturation",
  hue: "Hue",
  blur: "Blur"
}, ea = Object.keys(Yn).map((t) => ({
  value: t,
  label: Yn[t]
})), kd = {
  brightness: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  contrast: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  saturation: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  hue: { min: -180, max: 180, step: 1, unit: "°", defaultValue: 0 },
  blur: { min: 0, max: 50, step: 0.5, unit: "px", defaultValue: 1 }
};
function ta(t) {
  switch (t) {
    case "brightness":
      return { kind: t, value: 1 };
    case "contrast":
      return { kind: t, value: 1 };
    case "saturation":
      return { kind: t, value: 1 };
    case "hue":
      return { kind: t, degrees: 0 };
    case "blur":
      return { kind: t, radiusPx: 1 };
  }
}
function Cd(t) {
  switch (t.kind) {
    case "hue":
      return t.degrees;
    case "blur":
      return t.radiusPx;
    default:
      return t.value;
  }
}
function Wr(t, n) {
  switch (t.kind) {
    case "hue":
      return { kind: "hue", degrees: n };
    case "blur":
      return { kind: "blur", radiusPx: n };
    default:
      return { kind: t.kind, value: n };
  }
}
const Id = I(
  "w-4 h-full flex items-center justify-center",
  "text-[14px] text-text-tertiary cursor-grab select-none shrink-0"
);
I(
  "text-[11px] font-semibold px-2 py-0.5 rounded-full",
  "bg-surface-hover border border-border text-text-secondary",
  "whitespace-nowrap shrink-0"
);
function Sd({ layer: t, index: n, onUpdate: r, onRemove: i }) {
  const a = kd[t.kind], s = Cd(t), d = (p) => {
    r(ta(p.target.value));
  }, c = (p) => {
    const u = parseFloat(p.target.value);
    Number.isFinite(u) && r(Wr(t, u));
  }, l = (p) => {
    r(Wr(t, p));
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-surface-inset",
      "data-testid": `layer-row-${n}`,
      children: [
        /* @__PURE__ */ e("span", { className: Id, "aria-hidden": "true", title: "Drag handle", children: "⠿" }),
        /* @__PURE__ */ e(
          Xe,
          {
            value: t.kind,
            onChange: d,
            options: ea,
            size: "sm",
            "aria-label": `Layer ${n + 1} kind`,
            "data-testid": `layer-kind-select-${n}`,
            className: "shrink-0"
          }
        ),
        /* @__PURE__ */ e(
          "input",
          {
            type: "range",
            min: a.min,
            max: a.max,
            step: a.step,
            value: s,
            onChange: c,
            className: "flex-1 h-1 accent-primary cursor-pointer min-w-0",
            "aria-label": `${Yn[t.kind]} slider`,
            "data-testid": `layer-slider-${n}`
          }
        ),
        /* @__PURE__ */ e(
          rt,
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
        /* @__PURE__ */ e(
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
const $d = 150;
function Td(t, n, r) {
  const [i, a] = S(null), [s, d] = S(!1), c = ce(null), l = ce(null), p = O(
    async (u, m) => {
      l.current?.abort();
      const h = new AbortController();
      l.current = h, d(!0);
      try {
        const g = await fetch(`${r}/api/pipeline/preview/adjust-layer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageId: u, layers: m }),
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
  return re(() => {
    if (!t) {
      a(null);
      return;
    }
    return c.current && clearTimeout(c.current), c.current = setTimeout(() => {
      p(t, n);
    }, $d), () => {
      c.current && clearTimeout(c.current);
    };
  }, [t, JSON.stringify(n), p]), { previewSrc: i, loading: s };
}
function Vr(t) {
  return t.length <= 8 ? t : `${t.slice(0, 8)}…`;
}
function Rd({
  layers: t,
  onChange: n,
  autoSourceImageId: r,
  pinnedSourceImageId: i,
  onPinnedSourceImageIdChange: a,
  sourceImageId: s,
  apiBase: d = ""
}) {
  const [c, l] = S("brightness"), [p, u] = S(!1), m = r ?? s, h = i ?? m, g = !!i, { previewSrc: x, loading: f } = Td(h, t, d), v = () => {
    a?.(void 0);
  }, N = (C) => {
    C?.imageId && (a?.(C.imageId), u(!1));
  }, b = (C, $) => {
    n(t.map((D, A) => A === C ? $ : D));
  }, w = (C) => {
    n(t.filter(($, D) => D !== C));
  }, y = () => {
    n([...t, ta(c)]);
  }, k = (C) => {
    l(C.target.value);
  };
  return /* @__PURE__ */ o("div", { className: "flex gap-3 p-3", "data-testid": "adjust-layer-slider-panel", children: [
    /* @__PURE__ */ o("div", { className: "flex-1 flex flex-col gap-2 min-w-0", children: [
      t.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary italic", children: "No layers — add one below." }),
      t.map((C, $) => /* @__PURE__ */ e(
        Sd,
        {
          layer: C,
          index: $,
          onUpdate: (D) => b($, D),
          onRemove: () => w($)
        },
        $
      )),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mt-1", children: [
        /* @__PURE__ */ e(
          Xe,
          {
            value: c,
            onChange: k,
            options: ea,
            size: "sm",
            "aria-label": "New layer kind",
            "data-testid": "new-layer-kind-select"
          }
        ),
        /* @__PURE__ */ e(
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
      /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-tertiary", children: "Preview" }),
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
                    Vr(h),
                    ")"
                  ] }),
                  /* @__PURE__ */ e(
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
            ) : m ? /* @__PURE__ */ o(
              le,
              {
                tone: "info",
                size: "xs",
                "data-testid": "adjust-layer-source-chip-auto",
                children: [
                  "Source: ",
                  Vr(m),
                  " from upstream run"
                ]
              }
            ) : null,
            a && /* @__PURE__ */ e(
              Me,
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
      p && a && /* @__PURE__ */ e(
        "div",
        {
          className: "w-48",
          "data-testid": "adjust-layer-override-uploader-wrap",
          children: /* @__PURE__ */ e(
            Zo,
            {
              value: null,
              onChange: N,
              "data-testid": "adjust-layer-override-uploader"
            }
          )
        }
      ),
      h ? /* @__PURE__ */ o("div", { className: "relative", children: [
        /* @__PURE__ */ e(
          _o,
          {
            src: x ?? "",
            alt: "Adjust layer preview",
            size: "lg",
            aspectRatio: "auto",
            loading: "eager",
            "data-testid": "adjust-layer-preview-thumb"
          }
        ),
        f && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-white/60 rounded-md", children: /* @__PURE__ */ e("span", { className: "text-[11px] text-text-secondary", children: "Loading…" }) })
      ] }) : /* @__PURE__ */ e(
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
function Pd({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const Kr = "text-[12px] font-semibold text-text-secondary", Ad = "text-[11px] text-text-tertiary mt-0.5";
function Md(t) {
  const { definition: n } = qe(), r = q(() => !t || !n ? null : n.edges.find((s) => s.target === t)?.source ?? null, [n, t]);
  return he(r ?? "")?.images?.[0]?.imageId;
}
function Dd({
  data: t,
  onChange: n,
  currentNodeId: r
}) {
  const i = Te(r ?? null), a = Md(r), s = t.previewSourceImageId, d = t.layers ?? [];
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-layer-source-image-path", className: Kr, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "adjust-layer-source-image-path",
          type: "text",
          spellCheck: !1,
          className: "mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary",
          value: t.sourceImagePath ?? "",
          onChange: (c) => n({ sourceImagePath: c.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: Ad, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(Pd, { samples: i.map((c) => c.path), onSelect: (c) => n({ sourceImagePath: c }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${Kr} mb-1`, children: [
        "Adjustment layers ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      /* @__PURE__ */ e(
        Rd,
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
function Od(t) {
  const { selectedNodeId: n } = qe();
  return /* @__PURE__ */ e(Dd, { ...t, currentNodeId: n });
}
function Ed({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const Hr = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", Jr = "text-[12px] font-semibold text-text-secondary", _d = "text-[11px] text-text-tertiary mt-0.5";
function Ld({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "dimensions-source-image-path", className: Jr, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "dimensions-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Hr,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Ed, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "dimensions-max-edge", className: Jr, children: "Max edge (px)" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "dimensions-max-edge",
          type: "number",
          min: 1,
          step: 1,
          className: Hr,
          value: t.maxEdge ?? 1024,
          onChange: (a) => {
            const s = parseInt(a.target.value, 10);
            n({ maxEdge: Number.isFinite(s) && s > 0 ? s : 1024 });
          }
        }
      ),
      /* @__PURE__ */ o("div", { className: _d, children: [
        "Longest-edge cap. The derived ",
        /* @__PURE__ */ e("code", { children: "genWidth" }),
        "/",
        /* @__PURE__ */ e("code", { children: "genHeight" }),
        " are scaled to fit within this while preserving aspect ratio — wire them into ",
        /* @__PURE__ */ e("code", { children: "image:generate" }),
        "."
      ] })
    ] })
  ] });
}
function Bd({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const Xn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Ud = `${Xn} font-mono`, Mn = "text-[12px] font-semibold text-text-secondary", Gr = "text-[11px] text-text-tertiary mt-0.5";
function Fd({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "upscale-prompt", className: Mn, children: [
        "Prompt ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "upscale-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Xn} resize-y min-h-16`,
          value: t.prompt ?? "",
          onChange: (a) => n({ prompt: a.target.value.trim() ? a.target.value : void 0 }),
          placeholder: "optional guidance forwarded to the upscaler"
        }
      ),
      /* @__PURE__ */ e("div", { className: Gr, children: "Optional text guidance forwarded to the self-hosted x4 upscaler." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "upscale-max-edge", className: Mn, children: "Max edge (px)" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "upscale-max-edge",
          type: "number",
          min: 1,
          step: 1,
          className: Xn,
          value: t.maxEdge ?? 1024,
          onChange: (a) => {
            const s = parseInt(a.target.value, 10);
            n({ maxEdge: Number.isFinite(s) && s > 0 ? s : 1024 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Gr, children: "Longest-edge cap applied before the 4× super-resolution pass." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "upscale-source-image-path", className: Mn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "upscale-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Ud,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Bd, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] })
  ] });
}
const jd = [
  "claude-opus-4-7",
  "claude-sonnet-4-6",
  "claude-haiku-4-5-20251001"
];
function zd(t) {
  if (!t) return !1;
  const n = t.properties;
  if (!n || typeof n != "object" || Array.isArray(n)) return !1;
  const r = n.regions;
  return typeof r == "object" && r !== null;
}
function qd(t) {
  const n = t.trim();
  if (n.length === 0) return { ok: !0, value: void 0 };
  try {
    const r = JSON.parse(n);
    return r === null || typeof r != "object" || Array.isArray(r) ? { ok: !1, error: "Schema must be a JSON object" } : { ok: !0, value: r };
  } catch (r) {
    return { ok: !1, error: r.message };
  }
}
const mt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Qn = "mt-1 w-full text-[12px] rounded border border-danger bg-white px-2 py-1 outline-none", Wd = `${mt} font-mono`, Vd = `${Qn} font-mono`, it = "text-[12px] font-semibold text-text-secondary", Ye = "text-[11px] text-text-tertiary mt-0.5", Xt = "text-[11px] text-danger-fg mt-0.5";
function Kd({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null), { paths: a, unresolved: s } = Qe(r ?? null), [d, c] = S(!1), [l, p] = S(
    t.outputSchema ? JSON.stringify(t.outputSchema, null, 2) : ""
  ), [u, m] = S(null), h = !t.userPrompt?.trim(), g = !t.imageRefPath?.trim(), x = !!t.imageRefPath && !t.imageRefPath.startsWith("$."), f = zd(t.outputSchema), v = O(
    (b) => {
      n({ seedRegions: b });
    },
    [n]
  ), N = (b) => {
    p(b);
    const w = qd(b);
    if (!w.ok) {
      m(w.error);
      return;
    }
    m(null), n({ outputSchema: w.value });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-model", className: it, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-model",
          className: mt,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (b) => n({ model: b.target.value }),
          children: jd.map((b) => /* @__PURE__ */ e("option", { value: b, children: b }, b))
        }
      ),
      /* @__PURE__ */ e("div", { className: Ye, children: "Anthropic Messages API. Requires ANTHROPIC_API_KEY on platform-api." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-image-ref-path", className: it, children: [
        "Image reference path",
        /* @__PURE__ */ e("span", { className: "text-danger-fg ml-1", children: "●" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-image-ref-path",
          type: "text",
          spellCheck: !1,
          "aria-invalid": g || x ? "true" : void 0,
          "aria-describedby": g || x ? "vision-image-ref-path-error" : void 0,
          className: g || x ? Vd : Wd,
          value: t.imageRefPath ?? "",
          onChange: (b) => n({ imageRefPath: b.target.value }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      g ? /* @__PURE__ */ e("div", { id: "vision-image-ref-path-error", role: "alert", className: Xt, children: "Image reference path is required." }) : x ? /* @__PURE__ */ o("div", { id: "vision-image-ref-path-error", role: "alert", className: Xt, children: [
        "Path must start with ",
        /* @__PURE__ */ e("code", { children: "$." })
      ] }) : /* @__PURE__ */ e("div", { className: Ye, children: "JSONPath into context. The value must be a string imageId or object with imageId." }),
      /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: i.map(({ path: b }) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => n({ imageRefPath: b }),
          className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
          children: b
        },
        b
      )) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-user-prompt", className: it, children: [
        "User prompt",
        /* @__PURE__ */ e("span", { className: "text-danger-fg ml-1", children: "●" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-user-prompt",
          "aria-invalid": h ? "true" : void 0,
          "aria-describedby": h ? "vision-user-prompt-error" : void 0,
          className: `${h ? Qn : mt} min-h-20 resize-y`,
          value: t.userPrompt,
          onChange: (b) => n({ userPrompt: b.target.value })
        }
      ),
      h ? /* @__PURE__ */ e("div", { id: "vision-user-prompt-error", role: "alert", className: Xt, children: "User prompt is required." }) : /* @__PURE__ */ o("div", { className: Ye, children: [
        "Supports ",
        "{{ context.* }}",
        " substitution."
      ] })
    ] }),
    f && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: it, children: "Focus regions (optional)" }),
      /* @__PURE__ */ e("div", { className: Ye, children: "Drag on the image to paint focus boxes. The next vision pass will use these as analysis hints." }),
      /* @__PURE__ */ e(
        Qo,
        {
          imageUrl: "",
          imageWidth: 800,
          imageHeight: 600,
          boxes: t.seedRegions ?? [],
          onChange: v,
          className: "mt-1"
        }
      ),
      (t.seedRegions?.length ?? 0) > 0 && /* @__PURE__ */ o("div", { className: Ye, "data-testid": "bbox-region-count", children: [
        t.seedRegions.length,
        " region",
        t.seedRegions.length !== 1 ? "s" : "",
        " defined."
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-output-schema", className: it, children: "Output schema (optional)" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-output-schema",
          "aria-invalid": u ? "true" : void 0,
          "aria-describedby": u ? "vision-output-schema-error" : void 0,
          className: `${u ? Qn : mt} font-mono text-[11px] min-h-28 resize-y`,
          value: l,
          onChange: (b) => N(b.target.value),
          placeholder: `{
  "type": "object",
  "properties": {
    "caption": { "type": "string" }
  }
}`
        }
      ),
      u ? /* @__PURE__ */ o("div", { id: "vision-output-schema-error", role: "alert", className: Xt, children: [
        "Invalid JSON: ",
        u
      ] }) : t.outputSchema ? /* @__PURE__ */ e("div", { className: Ye, children: "Extract mode — model must return JSON matching this schema." }) : /* @__PURE__ */ e("div", { className: Ye, children: "Leave blank for caption mode (freeform analysis text)." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => c((b) => !b),
          className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] font-semibold text-text-secondary flex items-center gap-1",
          children: [
            /* @__PURE__ */ e("span", { children: d ? "▾" : "▸" }),
            " Advanced"
          ]
        }
      ),
      d && /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 mt-2", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("label", { htmlFor: "vision-max-output-tokens", className: it, children: "Max output tokens" }),
          /* @__PURE__ */ e(
            "input",
            {
              id: "vision-max-output-tokens",
              type: "number",
              min: 1,
              max: 8192,
              className: mt,
              value: t.maxOutputTokens ?? "",
              onChange: (b) => {
                const w = b.target.value;
                n({ maxOutputTokens: w === "" ? void 0 : Math.max(1, parseInt(w, 10) || 0) });
              }
            }
          ),
          /* @__PURE__ */ e("div", { className: Ye, children: "Caps the response length. Default 2048." })
        ] }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("label", { htmlFor: "vision-system-prompt", className: it, children: "System prompt override (optional)" }),
          /* @__PURE__ */ e(
            "textarea",
            {
              id: "vision-system-prompt",
              className: `${mt} min-h-14 resize-y`,
              value: t.systemPrompt ?? "",
              onChange: (b) => n({ systemPrompt: b.target.value || void 0 }),
              placeholder: "Leave blank to use the canned vision system prompt."
            }
          ),
          /* @__PURE__ */ e("div", { className: Ye, children: "Schema instructions are auto-appended when output schema is set." })
        ] })
      ] })
    ] })
  ] });
}
function Hd({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const Jd = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], Lt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Gd = `${Lt} font-mono`, Mt = "text-[12px] font-semibold text-text-secondary", Yr = "text-[11px] text-text-tertiary mt-0.5";
function Yd({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null), { paths: a, unresolved: s } = Qe(r ?? null), [d, c] = S(""), l = t.labels ?? [], p = () => {
    const m = d.trim();
    !m || l.includes(m) || (n({ labels: [...l, m] }), c(""));
  }, u = (m) => {
    n({ labels: l.filter((h, g) => g !== m) });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-image-ref-path", className: Mt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-classify-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Gd,
          value: t.imageRefPath ?? "",
          onChange: (m) => n({ imageRefPath: m.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Yr, children: "JSONPath to the imageId to classify. Required." }),
      /* @__PURE__ */ e(Hd, { samples: i.map((m) => m.path), onSelect: (m) => n({ imageRefPath: m }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: Mt, children: "Labels (at least 2 required)" }),
      l.length > 0 && /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: l.map((m, h) => /* @__PURE__ */ o(
        "span",
        {
          className: "inline-flex items-center gap-1 text-[11px] font-semibold bg-surface-inset border border-border rounded-full px-2 py-0.5 text-text-secondary",
          children: [
            m,
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: () => u(h),
                className: "bg-transparent border-none cursor-pointer p-0 text-danger-fg text-[11px] leading-none",
                "aria-label": `Remove label ${m}`,
                children: "✕"
              }
            )
          ]
        },
        m
      )) }),
      /* @__PURE__ */ o("div", { className: "mt-1.5 flex gap-1.5", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            spellCheck: !1,
            className: `${Lt} flex-1 mt-0`,
            value: d,
            onChange: (m) => c(m.target.value),
            onKeyDown: (m) => {
              m.key === "Enter" && (m.preventDefault(), p());
            },
            placeholder: "Add label…"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: p,
            className: "text-[12px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer py-1 px-3 shrink-0",
            children: "Add"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: Yr, children: "Press Enter or click Add. The model returns the single best-matching label." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-model", className: Mt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-classify-model",
          className: Lt,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (m) => n({ model: m.target.value }),
          children: Jd.map((m) => /* @__PURE__ */ e("option", { value: m.value, children: m.label }, m.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-classify-system-prompt", className: Mt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-classify-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Lt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (m) => n({ systemPrompt: m.target.value || void 0 }),
          placeholder: "Leave blank to use the default classification system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-classify-max-output-tokens", className: Mt, children: [
        "Max output tokens ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(default 256)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-classify-max-output-tokens",
          type: "number",
          min: 64,
          max: 4096,
          step: 64,
          className: Lt,
          value: t.maxOutputTokens ?? 256,
          onChange: (m) => {
            const h = parseInt(m.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(h) && h > 0 ? h : 256 });
          }
        }
      )
    ] })
  ] });
}
function Xd({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const Qd = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more detail)" }
], Bt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Zd = `${Bt} font-mono`, Dt = "text-[12px] font-semibold text-text-secondary", Xr = "text-[11px] text-text-tertiary mt-0.5";
function ep({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null), { paths: a, unresolved: s } = Qe(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-image-ref-path", className: Dt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-describe-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Zd,
          value: t.imageRefPath ?? "",
          onChange: (d) => n({ imageRefPath: d.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Xr, children: "JSONPath to the imageId to describe. Required." }),
      /* @__PURE__ */ e(Xd, { samples: i.map((d) => d.path), onSelect: (d) => n({ imageRefPath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-user-prompt", className: Dt, children: "User prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-describe-user-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Bt} resize-y`,
          value: t.userPrompt ?? "",
          onChange: (d) => n({ userPrompt: d.target.value }),
          placeholder: "Describe what you see in this image in one paragraph."
        }
      ),
      /* @__PURE__ */ e("div", { className: Xr, children: "Required. What to ask the model about the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-model", className: Dt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-describe-model",
          className: Bt,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (d) => n({ model: d.target.value }),
          children: Qd.map((d) => /* @__PURE__ */ e("option", { value: d.value, children: d.label }, d.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-describe-system-prompt", className: Dt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-describe-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Bt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (d) => n({ systemPrompt: d.target.value || void 0 }),
          placeholder: "Leave blank to use the default describe system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-describe-max-output-tokens", className: Dt, children: [
        "Max output tokens ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(default 512)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-describe-max-output-tokens",
          type: "number",
          min: 64,
          max: 4096,
          step: 64,
          className: Bt,
          value: t.maxOutputTokens ?? 512,
          onChange: (d) => {
            const c = parseInt(d.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(c) && c > 0 ? c : 512 });
          }
        }
      )
    ] })
  ] });
}
function tp({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const np = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], ht = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", rp = `${ht} font-mono`, ut = "text-[12px] font-semibold text-text-secondary", Qr = "text-[11px] text-text-tertiary mt-0.5";
function op({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null), { paths: a, unresolved: s } = Qe(r ?? null), [d, c] = S(""), l = t.candidateTags ?? [], p = () => {
    const m = d.trim();
    !m || l.includes(m) || (n({ candidateTags: [...l, m] }), c(""));
  }, u = (m) => {
    n({ candidateTags: l.filter((h, g) => g !== m) });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-tag-image-ref-path", className: ut, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-tag-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: rp,
          value: t.imageRefPath ?? "",
          onChange: (m) => n({ imageRefPath: m.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Qr, children: "JSONPath to the imageId to tag. Required." }),
      /* @__PURE__ */ e(tp, { samples: i.map((m) => m.path), onSelect: (m) => n({ imageRefPath: m }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: ut, children: [
        "Candidate tags ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional — omit for open-vocabulary)" })
      ] }),
      l.length > 0 && /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: l.map((m, h) => /* @__PURE__ */ o(
        "span",
        {
          className: "inline-flex items-center gap-1 text-[11px] font-semibold bg-surface-inset border border-border rounded-full px-2 py-0.5 text-text-secondary",
          children: [
            m,
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: () => u(h),
                className: "bg-transparent border-none cursor-pointer p-0 text-danger-fg text-[11px] leading-none",
                "aria-label": `Remove candidate tag ${m}`,
                children: "✕"
              }
            )
          ]
        },
        m
      )) }),
      /* @__PURE__ */ o("div", { className: "mt-1.5 flex gap-1.5", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            spellCheck: !1,
            className: `${ht} flex-1 mt-0`,
            value: d,
            onChange: (m) => c(m.target.value),
            onKeyDown: (m) => {
              m.key === "Enter" && (m.preventDefault(), p());
            },
            placeholder: "Add candidate tag…"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: p,
            className: "text-[12px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer py-1 px-3 shrink-0",
            children: "Add"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: Qr, children: "Restricts tagging to this vocabulary. Leave empty for open-ended tags." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-max-tags", className: ut, children: [
        "Max tags ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(default 10)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-tag-max-tags",
          type: "number",
          min: 1,
          max: 50,
          step: 1,
          className: ht,
          value: t.maxTags ?? 10,
          onChange: (m) => {
            const h = parseInt(m.target.value, 10);
            n({ maxTags: Number.isFinite(h) && h >= 1 ? h : 10 });
          }
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-tag-model", className: ut, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-tag-model",
          className: ht,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (m) => n({ model: m.target.value }),
          children: np.map((m) => /* @__PURE__ */ e("option", { value: m.value, children: m.label }, m.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-system-prompt", className: ut, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-tag-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${ht} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (m) => n({ systemPrompt: m.target.value || void 0 }),
          placeholder: "Leave blank to use the default tagging system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-max-output-tokens", className: ut, children: [
        "Max output tokens ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(default 256)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-tag-max-output-tokens",
          type: "number",
          min: 64,
          max: 4096,
          step: 64,
          className: ht,
          value: t.maxOutputTokens ?? 256,
          onChange: (m) => {
            const h = parseInt(m.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(h) && h > 0 ? h : 256 });
          }
        }
      )
    ] })
  ] });
}
function ap({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const ip = [
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (default — best OCR accuracy)" },
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (faster, lower accuracy)" }
], tn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", sp = `${tn} font-mono`, Qt = "text-[12px] font-semibold text-text-secondary", Dn = "text-[11px] text-text-tertiary mt-0.5";
function lp({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null), { paths: a, unresolved: s } = Qe(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-image-ref-path", className: Qt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-extract-text-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: sp,
          value: t.imageRefPath ?? "",
          onChange: (d) => n({ imageRefPath: d.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Dn, children: "JSONPath to the imageId to extract text from. Required." }),
      /* @__PURE__ */ e(ap, { samples: i.map((d) => d.path), onSelect: (d) => n({ imageRefPath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-model", className: Qt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-extract-text-model",
          className: tn,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (d) => n({ model: d.target.value }),
          children: ip.map((d) => /* @__PURE__ */ e("option", { value: d.value, children: d.label }, d.value))
        }
      ),
      /* @__PURE__ */ e("div", { className: Dn, children: "Defaults to Sonnet for best OCR accuracy." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-extract-text-system-prompt", className: Qt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-extract-text-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${tn} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (d) => n({ systemPrompt: d.target.value || void 0 }),
          placeholder: "Leave blank to use the default OCR system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-extract-text-max-output-tokens", className: Qt, children: [
        "Max output tokens ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(default 1024)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-extract-text-max-output-tokens",
          type: "number",
          min: 64,
          max: 8192,
          step: 64,
          className: tn,
          value: t.maxOutputTokens ?? 1024,
          onChange: (d) => {
            const c = parseInt(d.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(c) && c > 0 ? c : 1024 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Dn, children: "Increase for documents with large amounts of text." })
    ] })
  ] });
}
const cp = [
  { value: "amazon.titan-image-generator-v2:0", label: "Titan v2 (default)" },
  { value: "amazon.titan-image-generator-v1", label: "Titan v1" }
], Zr = 64, eo = 2048, dp = 8;
function pp({ data: t, onChange: n }) {
  const r = ka("image:generate", cp), i = rr("image:generate"), a = !t.prompt?.trim(), s = t.model ?? r[0]?.value ?? "";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(
      se,
      {
        label: i.label("prompt", "Prompt"),
        required: !0,
        error: a ? "Prompt is required." : void 0,
        help: a ? void 0 : i.help("prompt", "Text description of the image to generate."),
        children: /* @__PURE__ */ e(
          ft,
          {
            rows: 4,
            spellCheck: !1,
            invalid: a,
            value: t.prompt ?? "",
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
    /* @__PURE__ */ e(
      se,
      {
        label: i.label("model", "Model"),
        help: r.length === 0 ? "This host declares no image models." : i.help("model"),
        children: /* @__PURE__ */ e(
          Xe,
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
      /* @__PURE__ */ e("div", { className: "flex-1", children: /* @__PURE__ */ e(se, { label: i.label("width", "Width"), children: /* @__PURE__ */ e(
        rt,
        {
          size: "sm",
          min: Zr,
          max: eo,
          step: 64,
          unit: "px",
          value: t.width ?? 512,
          onChange: (d) => n({ width: d }),
          "data-testid": "generate-width"
        }
      ) }) }),
      /* @__PURE__ */ e("div", { className: "flex-1", children: /* @__PURE__ */ e(se, { label: i.label("height", "Height"), children: /* @__PURE__ */ e(
        rt,
        {
          size: "sm",
          min: Zr,
          max: eo,
          step: 64,
          unit: "px",
          value: t.height ?? 512,
          onChange: (d) => n({ height: d }),
          "data-testid": "generate-height"
        }
      ) }) })
    ] }),
    /* @__PURE__ */ e(
      se,
      {
        label: i.label("seed", "Seed"),
        help: "Optional — set for a reproducible result.",
        children: /* @__PURE__ */ e(
          rt,
          {
            size: "sm",
            min: 0,
            step: 1,
            value: t.seed ?? 0,
            onChange: (d) => n({ seed: d }),
            placeholder: "random",
            "data-testid": "generate-seed"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      se,
      {
        label: i.label("numImages", "Number of images"),
        help: "Above 1, the step fans out with one arm per image, each carrying one imageId.",
        children: /* @__PURE__ */ e(
          rt,
          {
            size: "sm",
            min: 1,
            max: dp,
            step: 1,
            value: t.numImages ?? 1,
            onChange: (d) => n({ numImages: d }),
            "data-testid": "generate-num-images"
          }
        )
      }
    )
  ] });
}
function up({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const mp = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], nn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", hp = `${nn} font-mono`, Zt = "text-[12px] font-semibold text-text-secondary", to = "text-[11px] text-text-tertiary mt-0.5";
function fp({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-source-image-path", className: Zt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "variation-source-image-path",
          type: "text",
          spellCheck: !1,
          className: hp,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(up, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "variation-model", className: Zt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "variation-model",
          className: nn,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (a) => n({ model: a.target.value }),
          children: mp.map((a) => /* @__PURE__ */ e("option", { value: a.value, children: a.label }, a.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-num-variations", className: Zt, children: [
        "Number of variations ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(fan-out)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "variation-num-variations",
          type: "number",
          min: 1,
          max: 8,
          step: 1,
          className: nn,
          value: t.numVariations ?? 1,
          onChange: (a) => {
            const s = parseInt(a.target.value, 10);
            n({ numVariations: Number.isFinite(s) && s >= 1 ? Math.min(8, s) : 1 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: to, children: "Always fans out — each variation becomes a separate arm downstream." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-similarity", className: Zt, children: [
        "Similarity ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(0.0–1.0, default 0.7)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "variation-similarity",
          type: "number",
          min: 0,
          max: 1,
          step: 0.05,
          className: nn,
          value: t.similarity ?? 0.7,
          onChange: (a) => {
            const s = parseFloat(a.target.value);
            n({ similarity: Number.isFinite(s) ? Math.min(1, Math.max(0, s)) : 0.7 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: to, children: "0 = very different, 1 = nearly identical. 0.7 is a good starting point." })
    ] })
  ] });
}
const gp = [
  "$.steps.mask.output.imageId",
  "$.trigger.maskRef"
];
function no({ samples: t, onSelect: n }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: r
    },
    r
  )) });
}
const xp = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], Zn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", ro = `${Zn} font-mono`, en = "text-[12px] font-semibold text-text-secondary", oo = "text-[11px] text-text-tertiary mt-0.5";
function bp({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-source-image-path", className: en, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "edit-prompt-source-image-path",
          type: "text",
          spellCheck: !1,
          className: ro,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(no, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-mask-image-path", className: en, children: [
        "Mask image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "edit-prompt-mask-image-path",
          type: "text",
          spellCheck: !1,
          className: ro,
          value: t.maskImagePath ?? "",
          onChange: (a) => n({ maskImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.steps.mask.output.imageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: oo, children: "JSONPath to a mask image. White pixels = edit region, black = preserve. Omit for outpainting." }),
      /* @__PURE__ */ e(no, { samples: gp, onSelect: (a) => n({ maskImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-prompt", className: en, children: "Edit prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "edit-prompt-prompt",
          rows: 4,
          spellCheck: !1,
          className: `${Zn} resize-y min-h-20`,
          value: t.prompt ?? "",
          onChange: (a) => n({ prompt: a.target.value }),
          placeholder: "Replace the background with a sunny beach"
        }
      ),
      /* @__PURE__ */ e("div", { className: oo, children: "Describes what to generate in the masked region. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-model", className: en, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "edit-prompt-model",
          className: Zn,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (a) => n({ model: a.target.value }),
          children: xp.map((a) => /* @__PURE__ */ e("option", { value: a.value, children: a.label }, a.value))
        }
      )
    ] })
  ] });
}
const yp = {
  // -------------------------------------------------------------------------
  // Trigger
  // -------------------------------------------------------------------------
  trigger: /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "The entry point of every pipeline. Every pipeline has exactly one trigger." }),
    /* @__PURE__ */ e("h4", { children: "Trigger types" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "manual" }),
        " — started by clicking Run in the editor."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "document.finalize" }),
        " / ",
        /* @__PURE__ */ e("code", { children: "document.submit" }),
        " / ",
        /* @__PURE__ */ e("code", { children: "document.comment" }),
        " — fires on doc lifecycle events for a given document type."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "schedule" }),
        " — cron expression (e.g. ",
        /* @__PURE__ */ e("code", { children: "0 9 * * 1-5" }),
        ")."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "webhook" }),
        " — inbound HTTP POST at the configured path."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "triggerType" }),
        " — one of the above."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "documentTypeId" }),
        " — required for ",
        /* @__PURE__ */ e("code", { children: "document.*" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "schedule" }),
        " / ",
        /* @__PURE__ */ e("code", { children: "webhookPath" }),
        " — per type."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "One output handle ",
      /* @__PURE__ */ e("code", { children: "out" }),
      " that fires downstream with ",
      /* @__PURE__ */ e("code", { children: "{ trigger, payload }" }),
      " as the initial context."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // LLM
  // -------------------------------------------------------------------------
  llm: /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Calls an LLM with a prompt template filled from pipeline context." }),
    /* @__PURE__ */ e("h4", { children: "Provider & model" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "anthropic" }),
        " — Claude models (e.g. ",
        /* @__PURE__ */ e("code", { children: "claude-sonnet-4-6" }),
        ")."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "bedrock" }),
        " — same models via AWS Bedrock."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Prompt templates" }),
    /* @__PURE__ */ o("p", { children: [
      "Interpolate with ",
      /* @__PURE__ */ e("code", { children: "{{ context.steps.X.output }}" }),
      " or any dotted path into the run context."
    ] }),
    /* @__PURE__ */ e("h4", { children: "Streaming" }),
    /* @__PURE__ */ o("p", { children: [
      "Toggle on to emit ",
      /* @__PURE__ */ e("code", { children: "pipeline.llm.token" }),
      " events as text arrives; off for a single response."
    ] }),
    /* @__PURE__ */ e("h4", { children: "Errors" }),
    /* @__PURE__ */ o("p", { children: [
      "The ",
      /* @__PURE__ */ e("code", { children: "error" }),
      " handle routes downstream on LLM failure — retried per ",
      /* @__PURE__ */ e("code", { children: "RetryManager" }),
      " policy before surfacing here."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Transform
  // -------------------------------------------------------------------------
  transform: /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Pure data transform — JSONPath, template string, or sandboxed JavaScript. No side effects." }),
    /* @__PURE__ */ e("h4", { children: "When to use each" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "jsonpath" }),
        " — extract a value, e.g. ",
        /* @__PURE__ */ e("code", { children: "$.document.body.sections[0]" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "template" }),
        " — shape a string from context, e.g. ",
        /* @__PURE__ */ e("code", { children: "Hi {{context.user.name}}" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "javascript" }),
        " — arbitrary logic; runs in an isolated sandbox with ",
        /* @__PURE__ */ e("code", { children: "context" }),
        " as input."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Output" }),
    /* @__PURE__ */ o("p", { children: [
      /* @__PURE__ */ e("code", { children: "outputKey" }),
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
  condition: /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Branches the flow based on a boolean expression evaluated over context." }),
    /* @__PURE__ */ e("h4", { children: "Expression language" }),
    /* @__PURE__ */ o("p", { children: [
      "JSONPath lookups combined with booleans and comparisons, e.g. ",
      /* @__PURE__ */ e("code", { children: '$.llm.output.sentiment == "positive"' }),
      " or ",
      /* @__PURE__ */ e("code", { children: "$.score > 0.8 && $.reviewed" }),
      "."
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ e("code", { children: "true" }),
      " and ",
      /* @__PURE__ */ e("code", { children: "false" }),
      ". Connected branches run; unconnected branches are skipped and their step is marked ",
      /* @__PURE__ */ e("code", { children: "skipped" }),
      "."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Action
  // -------------------------------------------------------------------------
  action: /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Performs a side-effect: updates a doc, posts a comment, notifies, calls a webhook, or invokes an MCP tool." }),
    /* @__PURE__ */ e("h4", { children: "Subtypes" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "update-document" }),
        " — patch a document's body."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "post-comment" }),
        " — append a comment thread entry."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "notify" }),
        " — push notification to users/roles."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "webhook" }),
        " — outbound HTTP request."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "mcp-tool" }),
        " — invoke a registered MCP tool by name."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Idempotent flag" }),
    /* @__PURE__ */ o("p", { children: [
      "If ",
      /* @__PURE__ */ e("code", { children: "idempotent" }),
      " is true, retries are safe after partial completion — the runtime may re-invoke the action without guarding against duplicates."
    ] }),
    /* @__PURE__ */ e("h4", { children: "Errors" }),
    /* @__PURE__ */ o("p", { children: [
      "The ",
      /* @__PURE__ */ e("code", { children: "error" }),
      " handle routes on failure (after retries), or fails the run if ",
      /* @__PURE__ */ e("code", { children: "onError" }),
      " is ",
      /* @__PURE__ */ e("code", { children: "fail-run" }),
      "."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Fork
  // -------------------------------------------------------------------------
  fork: /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Splits the flow into N parallel branches that all run concurrently against the same context snapshot." }),
    /* @__PURE__ */ e("h4", { children: "Branch count" }),
    /* @__PURE__ */ o("p", { children: [
      "2-8 branches. Each branch exposes a handle ",
      /* @__PURE__ */ e("code", { children: "branch-0" }),
      ", ",
      /* @__PURE__ */ e("code", { children: "branch-1" }),
      ", etc."
    ] }),
    /* @__PURE__ */ e("h4", { children: "Downstream" }),
    /* @__PURE__ */ o("p", { children: [
      "Typically paired with a ",
      /* @__PURE__ */ e("code", { children: "Join" }),
      " to merge results. Without a Join, each branch terminates independently and the run completes when all tails finish."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Join
  // -------------------------------------------------------------------------
  join: /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Combines N parallel branches back into one flow." }),
    /* @__PURE__ */ e("h4", { children: "Modes" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "all" }),
        " — wait for every input."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "any" }),
        " — fire as soon as the first input arrives; later inputs are ignored."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "n_of_m" }),
        " — fire after ",
        /* @__PURE__ */ e("code", { children: "n" }),
        " of ",
        /* @__PURE__ */ e("code", { children: "m" }),
        " inputs complete."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Merge strategies" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "deep-merge" }),
        " — recursive object merge."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "array-collect" }),
        " — collect each branch's output into an array."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "last-writer-wins" }),
        " — final branch to arrive replaces prior values."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Partial failures (§17.2)" }),
    /* @__PURE__ */ o("p", { children: [
      "In ",
      /* @__PURE__ */ e("code", { children: "all" }),
      " mode a failed branch fails the run. In ",
      /* @__PURE__ */ e("code", { children: "any" }),
      "/",
      /* @__PURE__ */ e("code", { children: "n_of_m" }),
      " failed branches count against the required total — the Join fires as soon as enough successes arrive."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Approval
  // -------------------------------------------------------------------------
  approval: /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ o("p", { children: [
      "Blocks the pipeline waiting for human approval. The run enters ",
      /* @__PURE__ */ e("code", { children: "awaiting_approval" }),
      " until decisions are recorded."
    ] }),
    /* @__PURE__ */ e("h4", { children: "Approvers" }),
    /* @__PURE__ */ o("p", { children: [
      "A list of users or roles. ",
      /* @__PURE__ */ e("code", { children: "requiredCount" }),
      " controls how many approvals are needed (n-of-m)."
    ] }),
    /* @__PURE__ */ e("h4", { children: "Timeout" }),
    /* @__PURE__ */ o("p", { children: [
      "Optional ",
      /* @__PURE__ */ e("code", { children: "timeoutMs" }),
      " with ",
      /* @__PURE__ */ e("code", { children: "timeoutAction" }),
      " of ",
      /* @__PURE__ */ e("code", { children: "reject" }),
      " or ",
      /* @__PURE__ */ e("code", { children: "approve" }),
      " — decides the outcome if no one responds in time."
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ e("code", { children: "approved" }),
      " and ",
      /* @__PURE__ */ e("code", { children: "rejected" }),
      ". The flow resumes down the matching branch."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Agent
  // -------------------------------------------------------------------------
  agent: /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Invokes a Strands agent via A2A protocol. The agent processes the input and returns a structured response." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "agentId" }),
        " — agent identifier, in whatever form the host's agent runtime uses."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "protocol" }),
        " — ",
        /* @__PURE__ */ e("code", { children: "a2a" }),
        " (recommended) or ",
        /* @__PURE__ */ e("code", { children: "direct" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "inputTemplate" }),
        " — supports ",
        /* @__PURE__ */ e("code", { children: "{{context.*}}" }),
        " substitution."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "streaming" }),
        " — whether to stream the agent's response tokens."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ e("code", { children: "out" }),
      " (success) and ",
      /* @__PURE__ */ e("code", { children: "error" }),
      " (invocation failure)."
    ] })
  ] }),
  "mcp-tool": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Invokes an external tool through an MCP Gateway server." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "gatewayUrl" }),
        " — MCP Gateway endpoint."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "toolName" }),
        " — registered tool to invoke."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "inputTemplate" }),
        " — JSON input with substitution support."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ e("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "knowledge-base": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Queries a knowledge base for relevant document chunks (RAG retrieval). Which retrieval backend answers is configured by the host." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "knowledgeBaseId" }),
        " — knowledge base identifier."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "queryTemplate" }),
        " — natural language query with substitution."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "topK" }),
        " — number of chunks to retrieve (default 5)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "scoreThreshold" }),
        " — minimum relevance score (0–1)."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ e("code", { children: "out" }),
      " (retrieved chunks in context) and ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "graph-query": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Runs a query against a graph database. The query dialect is whatever the host's graph engine accepts." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "graphId" }),
        " — graph identifier."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "query" }),
        " — openCypher query (NOT Gremlin/SPARQL)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "parameters" }),
        " — named query parameters."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ e("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  memory: /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Reads from or writes to a scoped key/value memory (session or long-term). The backing store is supplied by the host." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "mode" }),
        " — ",
        /* @__PURE__ */ e("code", { children: "read" }),
        " or ",
        /* @__PURE__ */ e("code", { children: "write" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "scope" }),
        " — ",
        /* @__PURE__ */ e("code", { children: "session" }),
        " (ephemeral) or ",
        /* @__PURE__ */ e("code", { children: "long-term" }),
        " (persistent)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "namespace" }),
        " — memory collection key."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "keyExpression" }),
        " — lookup key (read) or storage key (write)."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ e("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  guardrail: /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Applies content filtering. Evaluates input against the host's configured policies and routes accordingly." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "guardrailId" }),
        " — guardrail identifier."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "inputField" }),
        " — context path to evaluate."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "action" }),
        " — ",
        /* @__PURE__ */ e("code", { children: "block" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "mask" }),
        ", or ",
        /* @__PURE__ */ e("code", { children: "warn" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ e("code", { children: "pass" }),
      " (content OK) and ",
      /* @__PURE__ */ e("code", { children: "block" }),
      " (content flagged)."
    ] })
  ] }),
  policy: /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Evaluates a Cedar authorization policy against principal/action/resource." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "policyStoreId" }),
        " — Cedar policy store identifier."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "principal" }),
        " — who is requesting (supports substitution)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "action" }),
        " — what action is being performed."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "resource" }),
        " — what resource is being accessed."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ e("code", { children: "allow" }),
      " and ",
      /* @__PURE__ */ e("code", { children: "deny" }),
      "."
    ] })
  ] }),
  "ag-ui-output": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Streams output to the AG-UI frontend via Server-Sent Events. This is a terminal node — no downstream flow." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "sourceField" }),
        " — context path to stream."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "eventType" }),
        " — AG-UI event type to emit (TEXT_MESSAGE_CONTENT, STATE_DELTA, or CUSTOM)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "terminal" }),
        " — marks this as the pipeline endpoint."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "One input handle ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ". No output — this is the endpoint."
    ] })
  ] }),
  "image-source": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Injects an existing image into the pipeline context. Use this as the entry point for image-processing pipelines when the image is already stored in the blob store." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "imageId" }),
        " — optional; can be set at run time by the trigger or a preceding step."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "outputKey" }),
        " — the key written to pipeline context (default: ",
        /* @__PURE__ */ e("code", { children: "imageRef" }),
        ")."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "One output handle ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ". No inputs — this is a source node."
    ] })
  ] }),
  "image:save": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Writes a produced image to a named file in the artifact store. Dispatched server-side by the SaveStepHandler." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "sourceImagePath" }),
        " — JSONPath to the imageId to save (default: ",
        /* @__PURE__ */ e("code", { children: "$.scatter.parentImageId" }),
        ")."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "filenameTemplate" }),
        " — output filename; supports ",
        /* @__PURE__ */ e("code", { children: "{{scatter.item.label}}" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "{{scatter.index}}" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "{{scatter.parentImageId}}" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "One input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", one output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", one error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  scatter: /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Fans out over a collection — runs downstream nodes once per item in the scatter set. Results are collected by a downstream Join or Save node." }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "One input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ". One output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      " that fires once per item in the scatter collection."
    ] })
  ] }),
  "image:resize": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Resizes an image to the target dimensions using sharp.resize()." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "width" }),
        " / ",
        /* @__PURE__ */ e("code", { children: "height" }),
        " — target dimensions in pixels."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "fit" }),
        " — ",
        /* @__PURE__ */ e("code", { children: "cover" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "contain" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "fill" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "inside" }),
        ", or ",
        /* @__PURE__ */ e("code", { children: "outside" }),
        " (default: ",
        /* @__PURE__ */ e("code", { children: "cover" }),
        ")."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "background" }),
        " — hex fill colour used by ",
        /* @__PURE__ */ e("code", { children: "contain" }),
        " / ",
        /* @__PURE__ */ e("code", { children: "inside" }),
        " when padding is needed."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "withoutEnlargement" }),
        " — skip resize if image is already smaller than target."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:transform": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Applies a sequential chain of geometric operations to an image." }),
    /* @__PURE__ */ e("h4", { children: "Operations" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "rotate" }),
        " — rotate by degrees (e.g. 90, 180, 270)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "flip" }),
        " — mirror vertically."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "flop" }),
        " — mirror horizontally."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:format-convert": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Converts the image to a new format using sharp." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "format" }),
        " — target format: ",
        /* @__PURE__ */ e("code", { children: "jpeg" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "png" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "webp" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "avif" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "tiff" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "gif" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "quality" }),
        " — 1–100 for lossy formats."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "lossless" }),
        " — force lossless for WebP/AVIF."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:sharpen": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Applies unsharp mask sharpening via sharp." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "sigma" }),
        " — Gaussian sigma (0.5–3). Controls radius of the blur before differencing."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "m1" }),
        " — flat area threshold (default 1.0)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "m2" }),
        " — jagged area threshold (default 2.0)."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:watermark": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Composites an overlay image (watermark / logo) atop the source." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "overlayImageId" }),
        " — the watermark image stored in the blob store."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "gravity" }),
        " — placement: ",
        /* @__PURE__ */ e("code", { children: "northwest" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "north" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "northeast" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "west" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "center" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "east" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "southwest" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "south" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "southeast" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "opacity" }),
        " — 0.0–1.0 (default 1.0)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "offsetX" }),
        " / ",
        /* @__PURE__ */ e("code", { children: "offsetY" }),
        " — pixel nudge from gravity anchor."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:crop": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Crops a rectangular region from the source image using a bounding box resolved from pipeline context." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "sourceImagePath" }),
        " — JSONPath to the source imageId (default: ",
        /* @__PURE__ */ e("code", { children: "$.trigger.imageRef" }),
        ")."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "bboxPath" }),
        " — JSONPath to a ",
        /* @__PURE__ */ e("code", { children: "{ x, y, width, height }" }),
        " object in context."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "materialize" }),
        " — if true, saves the cropped image to the blob store; otherwise returns inline."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      "."
    ] })
  ] }),
  "image:adjust-bw": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Converts a colour image to greyscale with an adjustable contrast." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "algorithm" }),
        " — ",
        /* @__PURE__ */ e("code", { children: "luminosity" }),
        " (default), ",
        /* @__PURE__ */ e("code", { children: "average" }),
        ", or ",
        /* @__PURE__ */ e("code", { children: "lightness" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "contrast" }),
        " — multiplier applied after greyscale conversion (default 1.0)."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:adjust-layer": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Applies a composable stack of colour and filter adjustments in sequence." }),
    /* @__PURE__ */ e("h4", { children: "Layer kinds" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "brightness" }),
        " / ",
        /* @__PURE__ */ e("code", { children: "contrast" }),
        " / ",
        /* @__PURE__ */ e("code", { children: "saturation" }),
        " — multiplicative factor (1.0 = no change)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "hue" }),
        " — degrees to rotate the hue wheel."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "blur" }),
        " — Gaussian blur radius in pixels."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:dimensions": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ o("p", { children: [
      "Reads a source image's natural size and emits dimension data — ",
      /* @__PURE__ */ e("code", { children: "width" }),
      ", ",
      /* @__PURE__ */ e("code", { children: "height" }),
      ", ",
      /* @__PURE__ */ e("code", { children: "aspectRatio" }),
      ", plus ",
      /* @__PURE__ */ e("code", { children: "genWidth" }),
      "/",
      /* @__PURE__ */ e("code", { children: "genHeight" }),
      " scaled to fit within ",
      /* @__PURE__ */ e("code", { children: "maxEdge" }),
      ". It does ",
      /* @__PURE__ */ e("em", { children: "not" }),
      " output an image."
    ] }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "sourceImagePath" }),
        " — JSONPath to the source image (optional; defaults to the upstream image)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "maxEdge" }),
        " — longest-edge cap used to derive the generation dimensions (default 1024)."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Image input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", data output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      " (wire into Generate's width/height), error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:upscale": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Super-resolves a source image via a self-hosted x4 upscaler and outputs a new, higher-resolution image." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "sourceImagePath" }),
        " — JSONPath to the source image (optional; defaults to the upstream image)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "prompt" }),
        " — optional guidance forwarded to the upscaler."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "maxEdge" }),
        " — longest-edge cap applied before the 4× pass (default 1024)."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Image input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", image output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:vision-analyze": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Analyzes an image with a Claude vision model. Supports free-form caption mode (leave schema blank) or structured JSON extraction (provide a JSON Schema)." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "imageRefPath" }),
        " — JSONPath to the imageId (default: ",
        /* @__PURE__ */ e("code", { children: "$.trigger.imageRef" }),
        ")."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "userPrompt" }),
        " — required. What to ask the model about the image."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "outputSchema" }),
        " — optional JSON Schema; presence switches to structured extraction mode."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "model" }),
        " — default ",
        /* @__PURE__ */ e("code", { children: "claude-sonnet-4-6" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      "."
    ] })
  ] }),
  "image:vision-classify": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Classifies an image into one of a configured label set." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "labels" }),
        " — array of candidate labels (e.g. ",
        /* @__PURE__ */ e("code", { children: "['cat', 'dog', 'bird']" }),
        ")."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "model" }),
        " — default ",
        /* @__PURE__ */ e("code", { children: "claude-haiku-4-5" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Output" }),
    /* @__PURE__ */ o("p", { children: [
      "Produces ",
      /* @__PURE__ */ e("code", { children: "{ label, confidence }" }),
      " in context."
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:vision-describe": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Generates a natural-language caption for an image via Claude Haiku." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "imageRefPath" }),
        " — JSONPath to the imageId."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "userPrompt" }),
        " — optional override (default: describe the image)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "systemPrompt" }),
        " — optional system context."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "maxOutputTokens" }),
        " — cap on response length."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:vision-tag": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Extracts ranked tags from an image. Open-vocabulary or guided by a candidate tag list." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "candidateTags" }),
        " — optional array to guide tagging. Leave blank for open-vocabulary."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "maxTags" }),
        " — maximum number of tags to return (default 10)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "model" }),
        " — default ",
        /* @__PURE__ */ e("code", { children: "claude-haiku-4-5" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:vision-extract-text": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Extracts text from an image via Claude vision (OCR)." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "imageRefPath" }),
        " — JSONPath to the imageId."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "model" }),
        " — default ",
        /* @__PURE__ */ e("code", { children: "claude-sonnet-4-6" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "systemPrompt" }),
        " — optional instruction for the extraction task."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "maxOutputTokens" }),
        " — response length cap."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Output" }),
    /* @__PURE__ */ o("p", { children: [
      "Produces ",
      /* @__PURE__ */ e("code", { children: "{ text, lines }" }),
      " in context."
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:generate": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Generates images from a text prompt using the host's configured image model." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "prompt" }),
        " — required. Describes what to generate."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "model" }),
        " — default ",
        /* @__PURE__ */ e("code", { children: "amazon.titan-image-generator-v1" }),
        "."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "width" }),
        " / ",
        /* @__PURE__ */ e("code", { children: "height" }),
        " — output dimensions."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "seed" }),
        " — optional for reproducible generation."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "numImages" }),
        " — 1–4 images to produce."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:variation": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Generates variations of a source image using Nova Canvas. Always fans out — each variation becomes a separate downstream arm." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "sourceImagePath" }),
        " — JSONPath to the source imageId."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "numVariations" }),
        " — 1–8 variations to generate (default 1)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "similarity" }),
        " — 0.0–1.0 how closely each variation resembles the source (default 0.7)."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "model" }),
        " — default ",
        /* @__PURE__ */ e("code", { children: "amazon.nova-canvas-v1:0" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      " (fires once per variation), error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] }),
  "image:edit-prompt": /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Inpaints or outpaints a region of an image using Nova Canvas." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "prompt" }),
        " — required. Describes what to generate in the edited region."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "sourceImagePath" }),
        " — JSONPath to the source imageId."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "maskImagePath" }),
        " — optional JSONPath to a mask imageId (white = edit, black = preserve). Omit for outpainting."
      ] }),
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "model" }),
        " — default ",
        /* @__PURE__ */ e("code", { children: "amazon.nova-canvas-v1:0" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ e("h4", { children: "Wiring" }),
    /* @__PURE__ */ o("p", { children: [
      "Input ",
      /* @__PURE__ */ e("code", { children: "in" }),
      ", output ",
      /* @__PURE__ */ e("code", { children: "out" }),
      ", error handle ",
      /* @__PURE__ */ e("code", { children: "error" }),
      "."
    ] })
  ] })
};
function vp({ data: t, onChange: n }) {
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
            /* @__PURE__ */ e("span", { className: "text-[#6b7280] font-normal", children: "(optional — can be set at run time)" })
          ]
        }
      ),
      /* @__PURE__ */ e(
        Ee,
        {
          id: "image-source-image-id",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: t.imageId ?? "",
          onChange: (r) => n({ imageId: r.target.value.trim() || void 0 }),
          placeholder: "img_xxxxxxxx"
        }
      ),
      /* @__PURE__ */ e("p", { className: "mt-0.5 text-[11px] text-[#6b7280]", children: "The imageId of an image already in the blob store. Leave blank to have the trigger or a preceding step supply the image at runtime." })
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
            /* @__PURE__ */ e("span", { className: "text-[#6b7280] font-normal", children: "(default: imageRef)" })
          ]
        }
      ),
      /* @__PURE__ */ e(
        Ee,
        {
          id: "image-source-output-key",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: t.outputKey ?? "",
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
const Np = [
  "{{scatter.item.label}}",
  "{{scatter.index}}",
  "{{scatter.parentImageId}}"
];
function ao({
  samples: t,
  onSelect: n
}) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => n(r),
      className: I(
        "text-[10px] font-mono",
        "bg-[#f3f4f6] border border-[#d1d5db] text-[#374151]",
        "rounded px-1.5 py-0.5 cursor-pointer",
        "hover:bg-[#e5e7eb] transition-colors duration-100"
      ),
      children: r
    },
    r
  )) });
}
function wp({ data: t, onChange: n, nodeId: r }) {
  const i = Te(r ?? null);
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
            /* @__PURE__ */ e("span", { className: "text-[#6b7280] font-normal", children: "(optional)" })
          ]
        }
      ),
      /* @__PURE__ */ e(
        Ee,
        {
          id: "save-source-image-path",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ o("p", { className: "mt-0.5 text-[11px] text-[#6b7280]", children: [
        "JSONPath to the imageId to save. Defaults server-side to",
        " ",
        /* @__PURE__ */ e("code", { children: "$.scatter.parentImageId" }),
        "."
      ] }),
      /* @__PURE__ */ e(
        ao,
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
            /* @__PURE__ */ e("span", { className: "text-[#6b7280] font-normal", children: "(optional)" })
          ]
        }
      ),
      /* @__PURE__ */ e(
        Ee,
        {
          id: "save-filename-template",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: t.filenameTemplate ?? "",
          onChange: (a) => n({ filenameTemplate: a.target.value.trim() || void 0 }),
          placeholder: "crop-{{scatter.index}}.png"
        }
      ),
      /* @__PURE__ */ o("p", { className: "mt-0.5 text-[11px] text-[#6b7280]", children: [
        "Output filename. Supports",
        " ",
        /* @__PURE__ */ e("code", { children: "{{scatter.item.label}}" }),
        ",",
        " ",
        /* @__PURE__ */ e("code", { children: "{{scatter.index}}" }),
        ", and",
        " ",
        /* @__PURE__ */ e("code", { children: "{{scatter.parentImageId}}" }),
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
        /* @__PURE__ */ e("div", { className: "text-[10px] text-[#6b7280] mb-1", children: "Quick-fill variable:" }),
        /* @__PURE__ */ e(
          ao,
          {
            samples: Np,
            onSelect: (a) => {
              const s = t.filenameTemplate ?? "";
              n({ filenameTemplate: s + a });
            }
          }
        )
      ] })
    ] })
  ] });
}
const io = [
  { value: "read", label: "Read", help: "Look records up and write them into context." },
  { value: "write", label: "Write", help: "Persist a value from context into memory." }
], so = [
  { value: "session", label: "Session", help: "Scoped to this run; cleared when the session ends." },
  { value: "long-term", label: "Long-term", help: "Persists across runs for the namespace." }
];
function kp({ data: t, onChange: n, nodeId: r }) {
  const { paths: i, unresolved: a } = Qe(r ?? null), s = t.mode === "write", d = !t.namespace?.trim(), c = !t.keyExpression?.trim(), l = s && !t.valueField?.trim(), p = io.find((m) => m.value === t.mode)?.help, u = so.find((m) => m.value === t.scope)?.help;
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(se, { label: "Mode", required: !0, help: p, children: /* @__PURE__ */ e(
      Xe,
      {
        size: "sm",
        value: t.mode,
        onChange: (m) => n({ mode: m.target.value }),
        "aria-label": "Memory mode",
        options: io.map((m) => ({ value: m.value, label: m.label }))
      }
    ) }),
    /* @__PURE__ */ e(se, { label: "Scope", required: !0, help: u, children: /* @__PURE__ */ e(
      Xe,
      {
        size: "sm",
        value: t.scope,
        onChange: (m) => n({ scope: m.target.value }),
        "aria-label": "Memory scope",
        options: so.map((m) => ({ value: m.value, label: m.label }))
      }
    ) }),
    /* @__PURE__ */ e(
      se,
      {
        label: "Namespace",
        required: !0,
        error: d ? "Namespace is required." : void 0,
        help: d ? void 0 : "Groups related records. Reads only see their own namespace.",
        children: /* @__PURE__ */ e(
          Ee,
          {
            size: "sm",
            mono: !0,
            spellCheck: !1,
            value: t.namespace ?? "",
            onChange: (m) => n({ namespace: m.target.value }),
            placeholder: "support-conversations",
            "aria-label": "Memory namespace"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      se,
      {
        label: "Key expression",
        required: !0,
        error: c ? "Key expression is required." : void 0,
        help: c ? void 0 : "Identifies the record. Supports {{ context.* }} substitution.",
        children: /* @__PURE__ */ e(
          Ee,
          {
            size: "sm",
            mono: !0,
            spellCheck: !1,
            value: t.keyExpression ?? "",
            onChange: (m) => n({ keyExpression: m.target.value }),
            placeholder: "{{context.trigger.userId}}",
            "aria-label": "Memory key expression"
          }
        )
      }
    ),
    /* @__PURE__ */ e(se, { label: "Available context", children: /* @__PURE__ */ e(
      hn,
      {
        paths: i,
        unresolved: a(
          `${t.keyExpression ?? ""}
${s ? t.valueField ?? "" : ""}`
        ),
        onInsert: (m) => n({ keyExpression: `${t.keyExpression ?? ""}${m}` })
      }
    ) }),
    s ? /* @__PURE__ */ e(
      se,
      {
        label: "Value field",
        required: !0,
        error: l ? "Value field is required for a write." : void 0,
        help: l ? void 0 : "Context path whose value is persisted.",
        children: /* @__PURE__ */ e(
          Ee,
          {
            size: "sm",
            mono: !0,
            spellCheck: !1,
            value: t.valueField ?? "",
            onChange: (m) => n({ valueField: m.target.value || void 0 }),
            placeholder: "context.steps.llm-1.output",
            "aria-label": "Memory value field"
          }
        )
      }
    ) : /* @__PURE__ */ e(
      se,
      {
        label: "Output key",
        help: "Where retrieved records land in context. Defaults to this step's output.",
        children: /* @__PURE__ */ e(
          Ee,
          {
            size: "sm",
            mono: !0,
            spellCheck: !1,
            value: t.outputKey ?? "",
            onChange: (m) => n({ outputKey: m.target.value || void 0 }),
            placeholder: "recalled",
            "aria-label": "Memory output key"
          }
        )
      }
    )
  ] });
}
const On = 100;
function Cp({
  data: t,
  onChange: n,
  nodeId: r
}) {
  const { paths: i, unresolved: a } = Qe(r ?? null), s = rr("knowledge-base"), d = !t.knowledgeBaseId?.trim(), c = !t.queryTemplate?.trim(), l = t.topK ?? 0, p = !Number.isFinite(l) || l < 1 || l > On, u = t.scoreThreshold, m = u !== void 0 && (u < 0 || u > 1);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(xt, { title: "Knowledge base", children: [
      /* @__PURE__ */ e(
        se,
        {
          label: s.label("knowledgeBaseId", "Knowledge base ID"),
          required: !0,
          error: d ? "Knowledge base ID is required." : void 0,
          help: d ? void 0 : s.help("knowledgeBaseId", "The knowledge base to retrieve from."),
          children: /* @__PURE__ */ e(
            Ee,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              value: t.knowledgeBaseId ?? "",
              onChange: (h) => n({ knowledgeBaseId: h.target.value }),
              placeholder: s.placeholder("knowledgeBaseId", "my-knowledge-base"),
              "aria-label": "Knowledge base ID"
            }
          )
        }
      ),
      /* @__PURE__ */ e(
        se,
        {
          label: s.label("queryTemplate", "Query template"),
          required: !0,
          error: c ? "Query template is required." : void 0,
          help: c ? void 0 : s.help(
            "queryTemplate",
            "Text to embed and search. Supports {{ context.* }} substitution."
          ),
          children: /* @__PURE__ */ e(
            ft,
            {
              rows: 4,
              invalid: c,
              spellCheck: !1,
              value: t.queryTemplate ?? "",
              onChange: (h) => n({ queryTemplate: h.target.value }),
              placeholder: "{{context.trigger.question}}",
              "aria-label": "Query template"
            }
          )
        }
      ),
      /* @__PURE__ */ e(se, { label: "Available context", children: /* @__PURE__ */ e(
        hn,
        {
          paths: i,
          unresolved: a(t.queryTemplate ?? ""),
          onInsert: (h) => n({ queryTemplate: `${t.queryTemplate ?? ""}${h}` })
        }
      ) })
    ] }),
    /* @__PURE__ */ o(xt, { title: "Retrieval", children: [
      /* @__PURE__ */ e(
        se,
        {
          label: s.label("topK", "Top K"),
          required: !0,
          error: p ? `Must be between 1 and ${On}.` : void 0,
          help: p ? void 0 : s.help("topK", "How many passages to retrieve."),
          children: /* @__PURE__ */ e(
            rt,
            {
              size: "sm",
              min: 1,
              max: On,
              step: 1,
              value: l,
              onChange: (h) => n({ topK: h }),
              invalid: p,
              "data-testid": "kb-top-k"
            }
          )
        }
      ),
      /* @__PURE__ */ e(
        se,
        {
          label: s.label("scoreThreshold", "Score threshold"),
          error: m ? "Must be between 0 and 1." : void 0,
          help: m ? void 0 : "Drop passages scoring below this. Leave empty for no filtering.",
          children: /* @__PURE__ */ e(
            rt,
            {
              size: "sm",
              min: 0,
              max: 1,
              step: 0.05,
              value: u ?? 0,
              onChange: (h) => n({ scoreThreshold: h }),
              invalid: m,
              "data-testid": "kb-score-threshold"
            }
          )
        }
      ),
      /* @__PURE__ */ e(
        se,
        {
          label: "Output key",
          help: "Where retrieved passages land in context. Defaults to this step's output.",
          children: /* @__PURE__ */ e(
            Ee,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              value: t.outputKey ?? "",
              onChange: (h) => n({ outputKey: h.target.value || void 0 }),
              placeholder: "passages",
              "aria-label": "Output key"
            }
          )
        }
      ),
      /* @__PURE__ */ e(
        Kt,
        {
          value: t.retryPolicy,
          onChange: (h) => n({ retryPolicy: h })
        }
      )
    ] })
  ] });
}
const Ip = `MATCH (u:User {id: $userId})-[:AUTHORED]->(d:Doc)
RETURN d.title LIMIT 10`, En = 100, _n = 3e5;
function Sp({
  data: t,
  onChange: n,
  nodeId: r
}) {
  const { paths: i, unresolved: a } = Qe(r ?? null), s = rr("graph-query"), d = !t.graphId?.trim(), c = !t.query?.trim(), l = t.timeoutMs, p = l !== void 0 && (!Number.isFinite(l) || l < En || l > _n), u = q(
    () => Object.entries(t.parameters ?? {}),
    [t.parameters]
  ), m = (b) => n({ parameters: Object.keys(b).length > 0 ? b : void 0 }), [h, g] = S(null), x = (b, w) => {
    if (w !== b && w.trim() !== "" && w in (t.parameters ?? {})) {
      g(w);
      return;
    }
    g(null);
    const y = {};
    for (const [k, C] of u) y[k === b ? w : k] = C;
    m(y);
  }, f = (b, w) => m({ ...t.parameters ?? {}, [b]: w }), v = (b) => {
    const w = { ...t.parameters ?? {} };
    delete w[b], m(w);
  }, N = () => {
    let b = u.length + 1, w = `param${b}`;
    for (; w in (t.parameters ?? {}); ) w = `param${++b}`;
    m({ ...t.parameters ?? {}, [w]: "" });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(xt, { title: "Graph", children: [
      /* @__PURE__ */ e(
        se,
        {
          label: s.label("graphId", "Graph ID"),
          required: !0,
          error: d ? "Graph ID is required." : void 0,
          help: d ? void 0 : s.help("graphId", "The graph to query."),
          children: /* @__PURE__ */ e(
            Ee,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              value: t.graphId ?? "",
              onChange: (b) => n({ graphId: b.target.value }),
              placeholder: s.placeholder("graphId", "my-graph"),
              "aria-label": "Graph ID"
            }
          )
        }
      ),
      /* @__PURE__ */ e(
        se,
        {
          label: s.label("query", "Graph query"),
          required: !0,
          error: c ? "Query is required." : void 0,
          help: c ? void 0 : "Bind values with $parameters below rather than interpolating them.",
          children: /* @__PURE__ */ e(
            ft,
            {
              rows: 6,
              invalid: c,
              spellCheck: !1,
              value: t.query ?? "",
              onChange: (b) => n({ query: b.target.value }),
              placeholder: s.placeholder("query", Ip),
              "aria-label": "Graph query"
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ o(xt, { title: "Parameters", children: [
      /* @__PURE__ */ e(
        se,
        {
          label: "Bind parameters",
          help: "Each row binds one $name in the query. Values support {{ context.* }}.",
          children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", "data-testid": "graph-query-params", children: [
            u.length === 0 ? /* @__PURE__ */ e("p", { className: "text-[12px] text-[var(--color-text-secondary)]", children: "No parameters. The query runs exactly as written." }) : null,
            u.map(([b, w], y) => /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e(
                Ee,
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
              /* @__PURE__ */ e(
                Ee,
                {
                  size: "sm",
                  mono: !0,
                  spellCheck: !1,
                  value: w,
                  onChange: (k) => f(b, k.target.value),
                  placeholder: "{{context.trigger.userId}}",
                  "aria-label": `Parameter ${y + 1} value`
                }
              ),
              /* @__PURE__ */ e(
                Me,
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
            /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(Me, { size: "sm", variant: "secondary", onClick: N, children: "+ Add parameter" }) })
          ] })
        }
      ),
      /* @__PURE__ */ e(se, { label: "Available context", children: /* @__PURE__ */ e(
        hn,
        {
          paths: i,
          unresolved: a(u.map(([, b]) => b).join(`
`)),
          onInsert: (b) => {
            const w = u[u.length - 1];
            if (!w) {
              m({ ...t.parameters ?? {}, param1: b });
              return;
            }
            f(w[0], `${w[1]}${b}`);
          }
        }
      ) })
    ] }),
    /* @__PURE__ */ o(xt, { title: "Execution", children: [
      /* @__PURE__ */ e(
        se,
        {
          label: "Timeout",
          error: p ? `Must be between ${En} and ${_n} ms.` : void 0,
          help: p ? void 0 : "Leave empty to use the executor default.",
          children: /* @__PURE__ */ e(
            rt,
            {
              size: "sm",
              min: En,
              max: _n,
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
      /* @__PURE__ */ e(
        se,
        {
          label: "Output key",
          help: "Where rows land in context. Defaults to this step's output.",
          children: /* @__PURE__ */ e(
            Ee,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              value: t.outputKey ?? "",
              onChange: (b) => n({ outputKey: b.target.value || void 0 }),
              placeholder: "rows",
              "aria-label": "Output key"
            }
          )
        }
      ),
      /* @__PURE__ */ e(
        Kt,
        {
          value: t.retryPolicy,
          onChange: (b) => n({ retryPolicy: b })
        }
      )
    ] })
  ] });
}
function $p({ result: t, className: n }) {
  const { caption: r, setting: i, location: a, timeOfDay: s, mood: d, colors: c } = t;
  return !r && !i && !a && !s && !d && (!c || c.length === 0) ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", n), children: [
    r ? /* @__PURE__ */ e("p", { className: "text-base leading-relaxed text-text-primary", children: r }) : null,
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
            /* @__PURE__ */ e(
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
const Tp = {
  people: { stroke: "#4f46e5", fill: "rgba(79,70,229,0.10)", text: "bg-primary text-white" },
  object: { stroke: "#d97706", fill: "rgba(217,119,6,0.10)", text: "bg-warning text-white" }
};
function Rp({
  imageUrl: t,
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
  const m = n ?? t, [h, g] = S(null), x = ce(null), f = O(() => {
    const b = x.current;
    b && (!r || !i) && g({ w: b.naturalWidth, h: b.naturalHeight });
  }, [r, i]), v = q(() => r && i && r > 0 && i > 0 ? { w: r, h: i } : h && h.w > 0 && h.h > 0 ? h : null, [r, i, h]), N = (b, w, y, k, C) => {
    if (!v) return null;
    const $ = Math.max(0, Math.min(b.x1, v.w)), D = Math.max(0, Math.min(b.y1, v.h)), A = Math.max(0, Math.min(b.x2, v.w)), M = Math.max(0, Math.min(b.y2, v.h));
    if (!Number.isFinite($) || !Number.isFinite(D) || !Number.isFinite(A) || !Number.isFinite(M) || A <= $ || M <= D) return null;
    const ne = $ / v.w * 100, R = D / v.h * 100, H = (A - $) / v.w * 100, X = (M - D) / v.h * 100, J = Tp[y];
    return /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: k,
        title: w,
        "aria-label": `${y === "people" ? "Person" : "Object"} bounding box: ${w}`,
        className: "group absolute m-0 cursor-pointer border-0 p-0 outline-none focus:ring-2 focus:ring-offset-1",
        style: {
          left: `${ne}%`,
          top: `${R}%`,
          width: `${H}%`,
          height: `${X}%`,
          background: J.fill,
          border: `2px solid ${J.stroke}`,
          borderRadius: "2px"
        },
        children: /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "pointer-events-none absolute -top-5 left-0 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none shadow",
              J.text
            ),
            children: w
          }
        )
      },
      C
    );
  };
  return m ? /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "relative w-full overflow-hidden rounded-lg border border-border bg-black/5",
        p
      ),
      children: [
        /* @__PURE__ */ e(
          "img",
          {
            ref: x,
            src: m,
            alt: u ?? "",
            onLoad: f,
            className: "block h-auto w-full object-contain",
            draggable: !1
          }
        ),
        v ? /* @__PURE__ */ e("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ o("div", { className: "pointer-events-auto absolute inset-0", children: [
          (d === "people" || d === "both") && (a ?? []).map(
            (b) => N(
              b.bbox,
              `#${b.index}${b.activity ? " · " + b.activity.replace(/^::\s*/, "") : ""}`,
              "people",
              c ? () => c(b) : void 0,
              `p-${b.index}`
            )
          ),
          (d === "objects" || d === "both") && (s ?? []).map(
            (b, w) => N(
              b.bbox,
              b.label,
              "object",
              l ? () => l(b) : void 0,
              `o-${w}-${b.label}`
            )
          )
        ] }) }) : null
      ]
    }
  ) : /* @__PURE__ */ e(
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
function Pp(t) {
  return {
    imageUrl: t.imageUrl,
    imageDataUrl: t.imageDataUrl,
    imageWidth: t.imageWidth,
    imageHeight: t.imageHeight,
    people: t.people,
    objects: t.objects
  };
}
function Ap({ people: t, highlightedIndex: n, onSelect: r, className: i }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", i), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "People (",
      t.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1.5", children: t.map((a) => {
      const s = n === a.index, d = a.activity?.replace(/^::\s*/, ""), c = I(
        "group flex w-full flex-col gap-1 rounded-lg border px-2.5 py-2 text-left text-sm transition-colors",
        s ? "border-primary bg-primary-bg/70 ring-1 ring-primary" : "border-border bg-surface hover:bg-surface-hover"
      ), l = /* @__PURE__ */ o(K, { children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": !0,
              className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-white",
              children: a.index
            }
          ),
          a.ageBucket ? /* @__PURE__ */ e(le, { tone: "neutral", size: "sm", children: a.ageBucket.replace("_", " ") }) : null,
          a.gender ? /* @__PURE__ */ e(le, { tone: "neutral", size: "sm", children: a.gender }) : null,
          a.faceOrientation ? /* @__PURE__ */ e(le, { tone: "neutral", size: "sm", title: "Face orientation", children: a.faceOrientation }) : null,
          a.expression ? /* @__PURE__ */ e(le, { tone: "info", size: "sm", children: a.expression }) : null
        ] }),
        d ? /* @__PURE__ */ o("div", { className: "text-[13px] text-text-primary", children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "activity:" }),
          " ",
          d
        ] }) : null,
        a.clothing ? /* @__PURE__ */ o("div", { className: "text-[12px] text-text-secondary", children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "wearing:" }),
          " ",
          a.clothing
        ] }) : null
      ] });
      return r ? /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e(
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
      ) }, a.index) : /* @__PURE__ */ e("li", { className: c, children: l }, a.index);
    }) })
  ] });
}
function Mp({ objects: t, onSelect: n, className: r }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Objects (",
      t.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "grid grid-cols-1 gap-1 sm:grid-cols-2", children: t.map((i, a) => {
      const s = I(
        "flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 text-left text-[13px]"
      ), d = /* @__PURE__ */ o(K, { children: [
        /* @__PURE__ */ e("span", { className: "truncate font-medium text-text-primary", children: i.label }),
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
      return n ? /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e(
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
      ) }, `${i.label}-${a}`) : /* @__PURE__ */ e("li", { className: s, children: d }, `${i.label}-${a}`);
    }) })
  ] });
}
function Dp({ tags: t, onTagClick: n, className: r }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ e("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Tags" }),
    /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: t.map(
      (i) => n ? /* @__PURE__ */ e(
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
function rn(t) {
  return t ? t === "correct" || t === "neutral" || t === "normal" ? "success" : "warning" : "neutral";
}
function Ln(t) {
  const n = rn(t);
  return n === "success" ? `OK · ${t}` : n === "warning" ? `ADJUST · ${t}` : t ?? "";
}
function Op({
  exposure: t,
  whiteBalance: n,
  contrast: r,
  composition: i,
  edits: a,
  onApplyEdit: s,
  className: d
}) {
  const c = t || n || r || i, l = (a ?? []).length > 0;
  return !c && !l ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", d), children: [
    /* @__PURE__ */ e("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Edits & Quality" }),
    c ? /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-1.5 sm:grid-cols-2", children: [
      t ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-text-tertiary", children: "EXPOSURE" }),
          /* @__PURE__ */ e(le, { tone: rn(t.verdict), size: "sm", children: Ln(t.verdict) }),
          t.evAdjustment !== 0 ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
            t.evAdjustment > 0 ? "+" : "",
            t.evAdjustment.toFixed(1),
            " EV"
          ] }) : null
        ] }),
        /* @__PURE__ */ e("p", { className: "mt-1 text-[12px] text-text-primary", children: t.rationale })
      ] }) : null,
      n ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-text-tertiary", children: "WB" }),
          /* @__PURE__ */ e(le, { tone: rn(n.verdict), size: "sm", children: Ln(n.verdict) }),
          n.kelvinShift ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
            n.kelvinShift > 0 ? "+" : "",
            n.kelvinShift,
            "K"
          ] }) : null
        ] }),
        /* @__PURE__ */ e("p", { className: "mt-1 text-[12px] text-text-primary", children: n.rationale })
      ] }) : null,
      r ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-text-tertiary", children: "CONTRAST" }),
        /* @__PURE__ */ e("span", { className: "ml-1.5", children: /* @__PURE__ */ e(le, { tone: rn(r), size: "sm", children: Ln(r) }) })
      ] }) : null,
      i ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-text-tertiary", children: "COMPOSITION" }),
        /* @__PURE__ */ e("p", { className: "mt-1 text-[12px] text-text-primary", children: i })
      ] }) : null
    ] }) : null,
    l ? /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1", children: (a ?? []).map((p, u) => /* @__PURE__ */ o(
      "li",
      {
        className: "flex items-start justify-between gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[13px]",
        children: [
          /* @__PURE__ */ e("span", { className: "flex-1 text-text-primary", children: p }),
          s ? /* @__PURE__ */ e(
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
function Ep({
  result: t,
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
  const [m, h] = S(), [g, x] = S(!1), f = (N) => h(m === N.index ? void 0 : N.index), v = Pp(t);
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-4 text-text-primary", u), children: [
    /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-12", children: [
      n ? /* @__PURE__ */ o("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ e(
          Rp,
          {
            ...v,
            onSelectPerson: f,
            alt: t.caption ?? "Vision result"
          }
        ),
        t.model ? /* @__PURE__ */ o("div", { className: "mt-2 flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
          /* @__PURE__ */ e("span", { className: "font-medium text-text-primary", children: t.model.endpointId }),
          /* @__PURE__ */ e("span", { children: "·" }),
          /* @__PURE__ */ o("span", { children: [
            "latency ",
            t.model.latencyMs,
            "ms"
          ] }),
          typeof t.model.tokensOut == "number" ? /* @__PURE__ */ o(K, { children: [
            /* @__PURE__ */ e("span", { children: "·" }),
            /* @__PURE__ */ o("span", { children: [
              t.model.tokensOut,
              " tok out"
            ] })
          ] }) : null
        ] }) : null
      ] }) : null,
      /* @__PURE__ */ o("div", { className: I("flex flex-col gap-4", n ? "md:col-span-5" : "md:col-span-12"), children: [
        r ? /* @__PURE__ */ e($p, { result: t }) : null,
        i && t.people && t.people.length > 0 ? /* @__PURE__ */ e(
          Ap,
          {
            people: t.people,
            highlightedIndex: m,
            onSelect: f
          }
        ) : null
      ] })
    ] }),
    a && t.objects && t.objects.length > 0 ? /* @__PURE__ */ e(Mp, { objects: t.objects }) : null,
    s && t.tags && t.tags.length > 0 ? /* @__PURE__ */ e(Dp, { tags: t.tags, onTagClick: l }) : null,
    d ? /* @__PURE__ */ e(
      Op,
      {
        exposure: t.exposure,
        whiteBalance: t.whiteBalance,
        contrast: t.contrast,
        composition: t.composition,
        edits: t.edits,
        onApplyEdit: p
      }
    ) : null,
    t.text && t.text.length > 0 ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ e("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Text (OCR)" }),
      /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1", children: t.text.map((N, b) => /* @__PURE__ */ e(
        "li",
        {
          className: "rounded border border-border bg-surface px-2 py-1 font-mono text-[12px]",
          children: N
        },
        b
      )) })
    ] }) : null,
    c && t.rawText ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => x((N) => !N),
          "aria-expanded": g,
          "aria-label": `${g ? "Hide" : "Show"} raw model output`,
          className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded",
          children: [
            g ? "▾" : "▸",
            " Raw model output"
          ]
        }
      ),
      g ? /* @__PURE__ */ e("pre", { className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary", children: t.rawText }) : null
    ] }) : null
  ] });
}
const _p = [
  { value: "claude-haiku-4-5-20251001", label: "Haiku 4.5" },
  { value: "claude-sonnet-4-6", label: "Sonnet 4.6" },
  { value: "claude-opus-4-7", label: "Opus 4.7" }
], lo = "claude-sonnet-4-6", co = [
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
function Lp(t) {
  const n = [`${t.inputTokens} in`, `${t.outputTokens} out`];
  return t.cacheReadTokens && n.push(`${t.cacheReadTokens} cached`), n.join(" / ");
}
function Bp({
  systemPrompt: t,
  userPrompt: n,
  outputSchema: r,
  model: i,
  onSave: a,
  apiBase: s = ""
}) {
  const d = Eo(), [c, l] = S(t), [p, u] = S(n), [m, h] = S(i ?? lo), [g, x] = S(
    r ? JSON.stringify(r, null, 2) : ""
  ), [f, v] = S("0"), [N, b] = S(null), [w, y] = S(!1), [k, C] = S(null), [$, D] = S(null), A = O(() => {
    const Q = g.trim();
    if (Q)
      try {
        const E = JSON.parse(Q);
        if (E && typeof E == "object" && !Array.isArray(E))
          return E;
      } catch {
      }
  }, [g]), M = O((Q) => {
    v(Q);
    const E = Number(Q), P = co[E];
    P && (x(P.value ? JSON.stringify(P.value, null, 2) : ""), P.systemPrompt !== void 0 && l(P.systemPrompt));
  }, []), ne = N?.imageId ?? null, R = ne ? d.getImageUrl(ne) : null, H = O(async () => {
    if (!ne) {
      C("Upload or paste a sample image URL first.");
      return;
    }
    if (!p.trim()) {
      C("User prompt is required.");
      return;
    }
    y(!0), C(null), D(null);
    const Q = A();
    try {
      const E = await fetch(`${s}/api/pipeline/preview/vision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageId: ne,
          systemPrompt: c.trim() || void 0,
          userPrompt: p.trim(),
          outputSchema: Q,
          model: m || lo
        })
      }), P = await E.json();
      if (!E.ok) {
        C(P.error ?? `Request failed with status ${E.status}`);
        return;
      }
      if (P.failureReason) {
        C(`Model refused to answer (${P.failureReason}).`);
        return;
      }
      const G = {
        imageUrl: R ?? "",
        caption: P.caption ?? "",
        rawText: typeof P.extracted == "object" && P.extracted ? JSON.stringify(P.extracted, null, 2) : void 0,
        model: {
          endpointId: m,
          latencyMs: P.latencyMs ?? 0,
          tokensIn: P.usage?.inputTokens,
          tokensOut: P.usage?.outputTokens
        }
      };
      D({
        visionResult: G,
        rawExtracted: P.extracted,
        usage: P.usage ?? { inputTokens: 0, outputTokens: 0 },
        latencyMs: P.latencyMs ?? 0,
        costUsd: P.costUsd ?? 0
      });
    } catch (E) {
      C(E instanceof Error ? E.message : "Network error");
    } finally {
      y(!1);
    }
  }, [ne, R, p, c, m, A, s]), X = () => {
    a({
      systemPrompt: c,
      userPrompt: p,
      outputSchema: A()
    });
  }, J = "text-[12px] font-semibold text-text-secondary";
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-4 px-4 py-3", "data-testid": "vision-prompt-bench", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: I(J, "mb-1"), children: "Sample image" }),
      /* @__PURE__ */ e(
        Zo,
        {
          value: N,
          onChange: (Q) => b(Q),
          "data-testid": "bench-image-uploader"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("label", { className: J, children: "System prompt" }),
        /* @__PURE__ */ e(
          ft,
          {
            value: c,
            onChange: (Q) => l(Q.target.value),
            rows: 3,
            placeholder: "Optional override of the default vision system prompt.",
            "data-testid": "bench-system-prompt",
            className: "mt-1 text-[12px] font-mono"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("label", { className: J, children: [
          "User prompt ",
          /* @__PURE__ */ e("span", { className: "text-danger-fg", children: "*" })
        ] }),
        /* @__PURE__ */ e(
          ft,
          {
            value: p,
            onChange: (Q) => u(Q.target.value),
            rows: 3,
            placeholder: "Describe what you want the model to do with the image.",
            "data-testid": "bench-user-prompt",
            className: "mt-1 text-[12px]"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ e("label", { className: J, children: "Output schema" }),
          /* @__PURE__ */ e(
            Xe,
            {
              value: f,
              onChange: (Q) => M(Q.target.value),
              options: co.map((Q, E) => ({ value: String(E), label: Q.label })),
              size: "sm",
              "aria-label": "Schema preset",
              "data-testid": "bench-schema-preset"
            }
          )
        ] }),
        /* @__PURE__ */ e(
          ft,
          {
            value: g,
            onChange: (Q) => x(Q.target.value),
            rows: 5,
            placeholder: "Optional JSON Schema for structured output. Leave empty for caption-only mode.",
            "data-testid": "bench-schema-textarea",
            className: "text-[11px] font-mono"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ e(
        Xe,
        {
          value: m,
          onChange: (Q) => h(Q.target.value),
          options: _p,
          size: "sm",
          "aria-label": "Vision model",
          "data-testid": "bench-model-select"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => {
            H();
          },
          disabled: w,
          className: I(
            "flex-1 py-1.5 px-4 text-[13px] font-semibold rounded-md cursor-pointer",
            "bg-primary text-white border-none",
            w ? "opacity-60 cursor-not-allowed" : "hover:bg-primary/90"
          ),
          "data-testid": "bench-try-btn",
          children: w ? "Running…" : "Try"
        }
      )
    ] }),
    k && /* @__PURE__ */ e(
      "div",
      {
        className: "text-[12px] text-danger-fg bg-danger-bg border border-danger-border rounded px-3 py-2",
        "data-testid": "bench-error",
        children: k
      }
    ),
    $ && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2 border-t border-border pt-3", "data-testid": "bench-result", children: [
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1.5", children: [
        /* @__PURE__ */ o("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary", children: [
          Lp($.usage),
          " tokens"
        ] }),
        /* @__PURE__ */ o("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary", children: [
          $.latencyMs,
          " ms"
        ] }),
        /* @__PURE__ */ o("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary", children: [
          "$",
          $.costUsd.toFixed(4)
        ] })
      ] }),
      /* @__PURE__ */ e(
        Ep,
        {
          result: $.visionResult,
          showImage: !1,
          showRawText: !!$.rawExtracted,
          "data-testid": "bench-vision-viewer"
        }
      ),
      $.rawExtracted !== null && $.rawExtracted !== void 0 && /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary", children: "Extracted JSON" }),
        /* @__PURE__ */ e(
          "pre",
          {
            className: "text-[10px] font-mono bg-surface-inset border border-border rounded p-2 overflow-x-auto",
            "data-testid": "bench-extracted-json",
            children: JSON.stringify($.rawExtracted, null, 2)
          }
        )
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: X,
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
const Up = {
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
}, Bn = /* @__PURE__ */ new Set([
  "image:vision-analyze",
  "image:vision-classify",
  "image:vision-describe",
  "image:vision-tag",
  "image:vision-extract-text"
]), Ot = ({ data: t }) => /* @__PURE__ */ e("div", { className: "p-4", "data-testid": "config-panel-no-settings", children: /* @__PURE__ */ e(
  je,
  {
    icon: "⚙️",
    title: "No settings for this node type yet",
    description: /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ e("code", { className: "font-mono text-[12px]", children: String(t.type) }),
      " has no configurable options in this version. The node can sit on the canvas and connect to others, and it will run with its defaults wherever the executor supports it."
    ] })
  }
) }), of = [
  "agent",
  "mcp-tool",
  "guardrail",
  "policy",
  "ag-ui-output"
], Fp = {
  trigger: cc,
  llm: Nc,
  transform: Cc,
  condition: Sc,
  action: Rc,
  fork: Pc,
  join: Dc,
  approval: Ec,
  agent: Ot,
  "mcp-tool": Ot,
  "knowledge-base": Cp,
  "graph-query": Sp,
  memory: kp,
  guardrail: Ot,
  policy: Ot,
  "ag-ui-output": Ot,
  "image-source": vp,
  "image:save": wp,
  scatter: Kc,
  "image:resize": Gc,
  "image:transform": td,
  "image:format-convert": ad,
  "image:sharpen": sd,
  "image:watermark": dd,
  "image:crop": yd,
  "image:adjust-bw": Nd,
  "image:adjust-layer": Od,
  "image:dimensions": Ld,
  "image:upscale": Fd,
  "image:vision-analyze": Kd,
  "image:vision-classify": Yd,
  "image:vision-describe": ep,
  "image:vision-tag": op,
  "image:vision-extract-text": lp,
  "image:generate": pp,
  "image:variation": fp,
  "image:edit-prompt": bp
};
function jp(t, n) {
  const r = Fp[t.type];
  return /* @__PURE__ */ e(r, { data: t.data, onChange: n, nodeId: t.id }, t.id);
}
function zp({ selectedIds: t }) {
  const {
    definition: n,
    selectedNodeId: r,
    setSelectedNodeId: i,
    updateNodeData: a,
    removeNode: s,
    duplicateNodes: d
  } = qe(), [c, l] = S("config"), p = ce(null), u = ce(null);
  ar();
  const m = q(() => t && t.length > 1 ? t : r ? [r] : [], [t, r]), h = m.length > 1, g = m.length > 0, x = q(() => h || m.length === 0 || !n ? null : n.nodes.find((y) => y.id === m[0]) ?? null, [n, m, h]), f = O(() => {
    i(null);
  }, [i]);
  re(() => {
    l("config");
  }, [m.join(",")]), re(() => {
    if (!g) return;
    const y = (k) => {
      k.key === "Escape" && (k.stopPropagation(), f());
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [g, f]), re(() => {
    if (!g) return;
    const y = (k) => {
      const C = p.current;
      C && (k.target instanceof Node && C.contains(k.target) || k.target instanceof Element && (k.target.closest("[data-node-type]") || f()));
    };
    return window.addEventListener("mousedown", y), () => window.removeEventListener("mousedown", y);
  }, [g, f]);
  const v = x ? Up[x.type] : null, N = () => {
    if (h)
      for (const y of m) s(y);
    else x && s(x.id);
  }, b = () => {
    m.length !== 0 && d(m);
  }, w = (y) => {
    x && a(x.id, y);
  };
  return /* @__PURE__ */ e("div", { ref: p, className: "flex flex-col flex-1 min-h-0 bg-white", "data-testid": "config-panel", children: h ? (
    // ---------------------------------------------------------------
    // Multi-select pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ o("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ e("span", { className: "text-base", "aria-hidden": !0, children: "⧉" }),
        /* @__PURE__ */ o("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: [
          m.length,
          " nodes selected"
        ] }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: f,
            className: "w-7 h-7 p-0 bg-transparent border-none text-[#64748b] text-lg leading-none cursor-pointer rounded font-inherit",
            "aria-label": "Close",
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto p-4 flex flex-col gap-3", children: [
        /* @__PURE__ */ e("div", { className: "text-xs text-[#64748b] leading-normal", children: "Bulk actions apply to every selected node. Individual node configuration is only shown for single selections." }),
        /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: N,
              className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-[#fecaca] rounded-md cursor-pointer font-inherit",
              children: "Delete all"
            }
          ),
          /* @__PURE__ */ e(
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
    /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ o("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ e("span", { className: "text-lg leading-none", "aria-hidden": !0, children: v.icon }),
        /* @__PURE__ */ e("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: v.name }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: f,
            className: "w-7 h-7 p-0 bg-transparent border-none text-[#64748b] text-lg leading-none cursor-pointer rounded font-inherit",
            "aria-label": "Close",
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ e(
        "div",
        {
          ref: u,
          role: "tablist",
          "aria-label": "Node configuration tabs",
          className: "h-9 flex border-b border-[#e2e8f0] shrink-0",
          onKeyDown: (y) => {
            const C = x && Bn.has(x.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"], $ = C.indexOf(c);
            let D = null;
            y.key === "ArrowRight" ? D = C[($ + 1) % C.length] : y.key === "ArrowLeft" ? D = C[($ - 1 + C.length) % C.length] : y.key === "Home" ? D = C[0] : y.key === "End" && (D = C[C.length - 1]), D && (y.preventDefault(), l(D), u.current?.querySelector(
              `[data-tab="${D}"]`
            )?.focus());
          },
          children: (x && Bn.has(x.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"]).map((y) => {
            const k = c === y, C = y === "config" ? "Config" : y === "runs" ? "Runs" : y === "docs" ? "Docs" : "Bench";
            return /* @__PURE__ */ e(
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
        c === "config" && jp(x, w),
        c === "runs" && /* @__PURE__ */ e("div", { className: "p-6 text-xs text-[#64748b]", children: "No runs yet." }),
        c === "docs" && /* @__PURE__ */ e("div", { className: "pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug", children: yp[x.type] ?? /* @__PURE__ */ e("p", { className: "text-text-secondary", children: "No docs available for this node type." }) }),
        c === "bench" && Bn.has(x.type) && (() => {
          const y = x.data;
          return /* @__PURE__ */ e(
            Bp,
            {
              systemPrompt: y.systemPrompt ?? "",
              userPrompt: y.userPrompt ?? "",
              outputSchema: y.outputSchema,
              model: y.model,
              onSave: (k) => {
                w(k);
              }
            }
          );
        })()
      ] }),
      /* @__PURE__ */ o("div", { className: "h-10 px-3 flex items-center justify-between gap-2 border-t border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: N,
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
function $e(t) {
  if (t == null) return "--";
  if (t < 1e3) return `${Math.round(t)}ms`;
  if (t < 6e4) return `${(t / 1e3).toFixed(1)}s`;
  const n = Math.floor(t / 6e4), r = Math.floor(t % 6e4 / 1e3);
  return `${n}m ${r}s`;
}
function bt(t) {
  if (!t) return "--";
  const n = new Date(t);
  if (Number.isNaN(n.getTime())) return "--";
  const r = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  };
  return new Intl.DateTimeFormat(void 0, r).format(n);
}
function qp(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Wp(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Vp(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function po(t) {
  switch (t) {
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
function Un(t) {
  switch (t) {
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
      return t;
  }
}
function Kp(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function st({ label: t, children: n }) {
  return /* @__PURE__ */ o("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ e("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: t }),
    /* @__PURE__ */ e("span", { className: "text-[13px] text-text-primary", children: n })
  ] });
}
function Hp({ pipelineId: t, run: n, onBack: r }) {
  const i = ze();
  return /* @__PURE__ */ o("div", { className: "absolute inset-0 z-[2] flex flex-col overflow-hidden bg-surface", children: [
    /* @__PURE__ */ o("div", { className: "flex shrink-0 items-center gap-2 border-b border-border px-4 py-2.5", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: r,
          className: "cursor-pointer border-none bg-transparent p-0 font-inherit text-[13px] text-primary",
          children: "← Back"
        }
      ),
      /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-tertiary", children: n.id.slice(0, 12) })
    ] }),
    /* @__PURE__ */ e("div", { className: "flex-1 overflow-y-auto p-4", children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e(st, { label: "Status", children: /* @__PURE__ */ e(
        le,
        {
          tone: po(n.status),
          "aria-label": `Status: ${Un(n.status)}`,
          children: Un(n.status)
        }
      ) }),
      /* @__PURE__ */ e(st, { label: "Started", children: new Date(n.startedAt).toLocaleString() }),
      n.completedAt && /* @__PURE__ */ e(st, { label: "Completed", children: new Date(n.completedAt).toLocaleString() }),
      /* @__PURE__ */ e(st, { label: "Duration", children: $e(n.durationMs) }),
      /* @__PURE__ */ e(st, { label: "Triggered by", children: Kp(n) }),
      /* @__PURE__ */ e(st, { label: "Trigger type", children: n.triggeredBy.triggerType }),
      n.estimatedCostUsd != null && n.estimatedCostUsd > 0 && /* @__PURE__ */ o(st, { label: "Est. Cost", children: [
        /* @__PURE__ */ e("span", { className: I("font-semibold", Vp(n.estimatedCostUsd)), children: Wp(n.estimatedCostUsd) }),
        n.estimatedCostUsd > 1 && /* @__PURE__ */ e("span", { className: "ml-1.5 rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "Budget Warning" })
      ] }),
      n.tokenUsage && Object.keys(n.tokenUsage).length > 0 && /* @__PURE__ */ o("div", { className: "mt-2", children: [
        /* @__PURE__ */ e("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: "Cost Breakdown" }),
        Object.entries(n.tokenUsage).map(([a, s]) => /* @__PURE__ */ o(
          "div",
          {
            className: "flex items-center gap-2 py-0.5 text-[11px]",
            children: [
              /* @__PURE__ */ e("span", { className: "min-w-[100px] font-mono text-text-secondary", children: a }),
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
        /* @__PURE__ */ e("div", { className: "mb-1 text-[11px] font-semibold uppercase text-state-failed", children: "Error" }),
        /* @__PURE__ */ o("div", { className: "whitespace-pre-wrap break-words rounded-md bg-[#fef2f2] px-2.5 py-2 font-mono text-xs text-[#991b1b]", children: [
          n.error.message,
          n.error.nodeId && /* @__PURE__ */ o("div", { className: "mt-1 text-[11px] text-[#b91c1c]", children: [
            "at node: ",
            n.error.nodeId
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => i(`/pipelines/${t}/runs/${n.id}`),
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
          const d = po(s.status), c = Un(s.status), l = s.output, p = l?.response;
          return /* @__PURE__ */ o("div", { className: "mb-2", children: [
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2 py-1 text-xs", children: [
              /* @__PURE__ */ e(le, { tone: d, "aria-label": `Status: ${c}`, children: c }),
              /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: a.slice(0, 10) }),
              s.durationMs != null && /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: $e(s.durationMs) })
            ] }),
            p && /* @__PURE__ */ e("div", { className: "mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-2 text-xs leading-relaxed text-text-primary", children: p }),
            l && !p && Object.keys(l).length > 0 && /* @__PURE__ */ e("div", { className: "mt-1 max-h-[120px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-1.5 font-mono text-[11px] text-text-secondary", children: JSON.stringify(l, null, 2) })
          ] }, a);
        })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-3", children: /* @__PURE__ */ o("details", { children: [
        /* @__PURE__ */ e("summary", { className: "cursor-pointer select-none text-[11px] text-text-tertiary", children: "Raw snapshot JSON" }),
        /* @__PURE__ */ e("pre", { className: "mt-1.5 max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-md border border-border bg-surface-inset p-2.5 text-[10px]", children: JSON.stringify(n, null, 2) })
      ] }) })
    ] }) })
  ] });
}
function uo(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Jp(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Gp(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Yp(t) {
  switch (t) {
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
function Xp(t) {
  switch (t) {
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
      return t;
  }
}
function Qp(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function Zp({ pipelineId: t, onClose: n }) {
  const r = ze(), [i, a] = S([]), [s, d] = S(!0), [c, l] = S(null), [p, u] = S(null), [m, h] = S(!1), [g, x] = S([]), f = ce(null), v = O(async () => {
    d(!0), l(null);
    try {
      const y = await Lo(t, { limit: 50 });
      a(y.runs);
    } catch (y) {
      l(y instanceof Error ? y.message : "Failed to load runs");
    } finally {
      d(!1);
    }
  }, [t]);
  re(() => {
    f.current !== t && (f.current = t, v());
  }, [t, v]), Be("*", O((y) => {
    const { eventType: k, payload: C } = y;
    if (!C || typeof C != "object") return;
    const $ = C;
    if (!($.pipelineId && $.pipelineId !== t))
      switch (k) {
        case "pipeline.run.started": {
          const D = C;
          if (D.pipelineId !== t) return;
          const A = {
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
          a((M) => [A, ...M.filter((ne) => ne.id !== D.runId)]);
          break;
        }
        case "pipeline.run.completed": {
          const D = C;
          a(
            (A) => A.map(
              (M) => M.id === D.runId ? { ...M, status: "completed", completedAt: D.at, durationMs: D.durationMs } : M
            )
          );
          break;
        }
        case "pipeline.run.failed": {
          const D = C;
          a(
            (A) => A.map(
              (M) => M.id === D.runId ? { ...M, status: "failed", completedAt: D.at, error: D.error } : M
            )
          );
          break;
        }
        case "pipeline.run.cancelled": {
          const D = C;
          a(
            (A) => A.map(
              (M) => M.id === D.runId ? { ...M, status: "cancelled", completedAt: D.at } : M
            )
          );
          break;
        }
      }
  }, [t]));
  const N = q(
    () => i.find((y) => y.id === p) ?? null,
    [i, p]
  ), b = O((y) => {
    x((k) => k.includes(y) ? k.filter((C) => C !== y) : k.length >= 2 ? [k[1], y] : [...k, y]);
  }, []), w = O(() => {
    if (g.length !== 2) return;
    const [y, k] = g;
    r(`/pipelines/${t}/compare?a=${y}&b=${k}`);
  }, [g, r, t]);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "relative flex min-h-0 flex-1 flex-col overflow-hidden bg-surface",
      "data-testid": "pipeline-runs-panel",
      children: [
        /* @__PURE__ */ o("div", { className: "flex shrink-0 items-center justify-between border-b border-border px-4 py-3", children: [
          /* @__PURE__ */ e("span", { className: "text-sm font-bold text-text-primary", children: "Run History" }),
          /* @__PURE__ */ o("div", { className: "ml-auto flex items-center gap-1.5", children: [
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: () => {
                  h(!m), m && x([]);
                },
                "data-testid": "runs-panel-compare-toggle",
                className: I(
                  "cursor-pointer rounded px-2 py-0.5 font-inherit text-[11px] font-medium",
                  m ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"
                ),
                children: "Compare"
              }
            ),
            /* @__PURE__ */ e(
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
        m && /* @__PURE__ */ o(
          "div",
          {
            className: "flex shrink-0 items-center gap-2 border-b border-border bg-surface-inset px-4 py-2",
            "data-testid": "runs-panel-compare-bar",
            children: [
              /* @__PURE__ */ o("span", { className: "text-[11px] text-text-secondary", children: [
                g.length,
                "/2 selected"
              ] }),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  disabled: g.length !== 2,
                  onClick: w,
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
          N && /* @__PURE__ */ e(
            Hp,
            {
              pipelineId: t,
              run: N,
              onBack: () => u(null)
            }
          ),
          s && i.length === 0 && /* @__PURE__ */ e("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "Loading runs..." }),
          c && /* @__PURE__ */ o("div", { className: "p-4 text-center text-xs text-state-failed", children: [
            c,
            /* @__PURE__ */ e(
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
          !s && !c && i.length === 0 && /* @__PURE__ */ e("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "No runs yet. Trigger this pipeline to see history here." }),
          i.length > 0 && /* @__PURE__ */ e("ul", { className: "m-0 flex-1 list-none overflow-y-auto p-0", children: i.map((y) => {
            const k = Yp(y.status), C = Xp(y.status), $ = g.includes(y.id);
            return /* @__PURE__ */ o(
              "li",
              {
                "data-testid": `runs-panel-row-${y.id}`,
                onClick: () => {
                  m ? b(y.id) : u(y.id);
                },
                className: I(
                  "cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover",
                  $ && "bg-[#eff6ff]"
                ),
                children: [
                  /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
                    m && /* @__PURE__ */ e(
                      "input",
                      {
                        type: "checkbox",
                        checked: $,
                        onChange: () => b(y.id),
                        onClick: (D) => D.stopPropagation(),
                        "data-testid": `runs-panel-compare-check-${y.id}`,
                        className: "m-0 shrink-0 accent-primary",
                        "aria-label": `Select run ${y.id.slice(0, 8)} for comparison`
                      }
                    ),
                    /* @__PURE__ */ e(le, { tone: k, "aria-label": `Status: ${C}`, children: C }),
                    /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-secondary", children: y.id.slice(0, 8) }),
                    /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: Gp(y.startedAt) })
                  ] }),
                  /* @__PURE__ */ o("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ e("span", { children: $e(y.durationMs) }),
                    y.estimatedCostUsd != null && y.estimatedCostUsd > 0 && /* @__PURE__ */ e(
                      "span",
                      {
                        className: I("font-mono font-semibold", Jp(y.estimatedCostUsd)),
                        title: `Estimated cost: ${uo(y.estimatedCostUsd)}`,
                        children: uo(y.estimatedCostUsd)
                      }
                    ),
                    y.estimatedCostUsd != null && y.estimatedCostUsd > 1 && /* @__PURE__ */ e("span", { className: "rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "High Cost" }),
                    /* @__PURE__ */ e("span", { className: "ml-auto", children: Qp(y) })
                  ] }),
                  y.error && /* @__PURE__ */ e("div", { className: "mt-1 truncate text-[11px] text-state-failed", children: y.error.message })
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
function eu({
  pipelineId: t,
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
          /* @__PURE__ */ e(
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
          /* @__PURE__ */ e(
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
          r === "config" && (n !== null ? /* @__PURE__ */ e(zp, {}) : /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          r === "runs" && /* @__PURE__ */ e(
            Zp,
            {
              pipelineId: t,
              onClose: () => i("config")
            }
          )
        ] })
      ]
    }
  );
}
function tu(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function nu(t) {
  if (!t) return [];
  const n = /* @__PURE__ */ new Set(), r = /\{\{\s*context\.([a-zA-Z0-9_.]+)\s*\}\}/g;
  for (const i of t.nodes) {
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
function ru(t) {
  if (!(t instanceof HTMLElement)) return !1;
  const n = t.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || t.isContentEditable);
}
function af() {
  const { pipelineId: t } = vt(), n = q(() => t ? lt(t) !== null : !1, [t]);
  return !t || !n ? /* @__PURE__ */ e(Nt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(Bo, { pipelineId: t, children: /* @__PURE__ */ e(ou, { pipelineId: t }) });
}
function ou({ pipelineId: t }) {
  const n = ze(), r = qe(), i = wt(), { toast: a } = un(), {
    definition: s,
    dirty: d,
    selectedNodeId: c,
    setSelectedNodeId: l,
    save: p,
    publish: u,
    revert: m,
    undo: h,
    redo: g,
    setTags: x
  } = r, f = jl(t), [v, N] = S(!1), b = ce(null), w = ce(d);
  re(() => (w.current && !d && (N(!0), b.current && clearTimeout(b.current), b.current = setTimeout(() => N(!1), 450)), w.current = d, () => {
    b.current && (clearTimeout(b.current), b.current = null);
  }), [d]);
  const y = q(
    () => s ? Go(s) : null,
    [s]
  ), k = (y?.errors.length ?? 0) > 0, C = q(
    () => nu(s),
    [s]
  ), D = q(() => s ? s.nodes.some((ye) => ye.type === "trigger") : !1, [s]) ? ["trigger"] : [], [A, M] = S(!0), [ne, R] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), H = O(() => {
    R((ye) => {
      const ie = !ye;
      try {
        window.localStorage.setItem(
          "ws_pipelines_v1_show_tags",
          ie ? "true" : "false"
        );
      } catch {
      }
      return ie;
    });
  }, []), [X, J] = S(!1), [Q, E] = S(!1), [P, G] = S(!1), [j, _] = S(!1), [W, V] = S(!1), Y = q(() => s?.publishedSnapshot ? s.publishedSnapshot : null, [s]), me = s?.status === "published", z = !f.isRunActive && (!me || k), de = f.isRunActive ? "Cancel the active run" : me ? k ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", we = O(async () => {
    if (f.isRunActive && f.currentRunId) {
      i.cancelRun(f.currentRunId);
      return;
    }
    if (!z) {
      if (C.length > 0) {
        f.setTriggerInputValues(
          Object.fromEntries(C.map((ye) => [ye, ""]))
        ), f.setTriggerInputOpen(!0);
        return;
      }
      f.handleRunClick();
    }
  }, [f, i, z, C]);
  re(() => {
    const ye = (ie) => {
      if (ru(ie.target)) return;
      const Pe = ie.metaKey || ie.ctrlKey;
      if (Pe && ie.key.toLowerCase() === "s") {
        ie.preventDefault(), p(), a("Saved", { type: "success", durationMs: 1200 });
        return;
      }
      if (Pe && ie.key === "Enter") {
        ie.preventDefault(), we();
        return;
      }
      if (Pe && ie.key === ".") {
        ie.preventDefault(), f.isRunActive && f.currentRunId && i.cancelRun(f.currentRunId);
        return;
      }
      if (Pe && ie.shiftKey && ie.key.toLowerCase() === "z") {
        ie.preventDefault(), g();
        return;
      }
      if (Pe && ie.key.toLowerCase() === "z") {
        ie.preventDefault(), h();
        return;
      }
      if (ie.key === "Escape") {
        l(null);
        return;
      }
    };
    return window.addEventListener("keydown", ye), () => window.removeEventListener("keydown", ye);
  }, [p, a, we, f, i, h, g, l]);
  const Ue = () => {
    if (!s) return;
    const ye = or(s.id);
    ye && n(`/pipelines/${ye.id}`);
  }, Ze = () => {
    if (!s) return;
    const ye = qn(s.id);
    ye && Ft(`${tu(s.name)}.pipeline.json`, ye);
  }, We = async () => {
    if (!s) return;
    const ye = Dl(s);
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(ye), a("Mermaid diagram copied", { type: "success" });
      else
        throw new Error("clipboard unavailable");
    } catch (ie) {
      console.warn("[PipelineEditor] clipboard write failed", ie), a("Could not copy Mermaid diagram", { type: "error" });
    }
  }, _e = () => {
    _(!0);
  }, Ke = () => {
    J(!1), !k && (u(), a("Pipeline published", { type: "success" }));
  }, Ve = () => {
    s && (Ca(s.id), E(!1), n("/pipelines"));
  }, He = () => {
    Uo(t), G(!1), a("Run history cleared", { type: "success" });
  }, Ie = f.currentRunId ? i.runs[f.currentRunId] : void 0;
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
        /* @__PURE__ */ e(
          ql,
          {
            pipelineId: t,
            definition: s,
            dirty: d,
            savingFlash: v,
            isRunActive: f.isRunActive,
            isTriggering: f.isTriggering,
            runDisabled: z,
            runTitle: de,
            currentRun: Ie,
            breakpoints: f.breakpoints,
            onRunClick: we,
            onDebugRunClick: f.handleDebugRunClick,
            onExport: Ze,
            onPublishClick: () => J(!0),
            onDuplicate: Ue,
            onCopyMermaid: We,
            onViewVersions: _e,
            onRevert: m,
            onToggleShowTags: H,
            showTags: ne,
            onViewRunHistory: () => f.setSidebarTab("runs"),
            onClearRunHistory: () => G(!0),
            onSimPanelOpen: () => V(!0),
            onDelete: () => E(!0)
          }
        ),
        ne && /* @__PURE__ */ o(
          "div",
          {
            "data-testid": "tags-row",
            className: I(
              "flex items-center gap-2 px-4 py-1.5",
              "border-b border-border bg-[#fafbfc]",
              "min-h-[34px] shrink-0 sticky top-11 z-[4]"
            ),
            children: [
              /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary font-semibold", children: "TAGS" }),
              /* @__PURE__ */ e(
                Ha,
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
          /* @__PURE__ */ e(Es, { disabledTypes: D }),
          /* @__PURE__ */ e("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ e(
            Ys,
            {
              errorNodeId: f.activeError?.nodeId ?? null,
              onErrorNodePosition: f.handleErrorNodePosition,
              breakpoints: f.breakpoints,
              onToggleBreakpoint: f.handleToggleBreakpoint,
              pausedAtNodeId: f.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ e(
            eu,
            {
              pipelineId: t,
              selectedNodeId: c,
              sidebarTab: f.sidebarTab,
              onTabChange: f.setSidebarTab
            }
          )
        ] }),
        f.pausedBreakpoint && /* @__PURE__ */ e(
          ec,
          {
            definition: s,
            pausedBreakpoint: f.pausedBreakpoint,
            applyingPatch: f.applyingPatch,
            revertingPatchId: f.revertingPatchId,
            dirtyPatch: f.dirtyPatch,
            dirtyPatchStepId: f.dirtyPatchStepId,
            resetEditBufferKey: f.resetEditBufferKey,
            onContinue: f.handleBreakpointContinue,
            onStepOver: f.handleBreakpointStepOver,
            onResumeAll: f.handleBreakpointResumeAll,
            onApplyAndContinue: f.handleApplyAndContinue,
            onRevertPatch: f.handleRevertPatch,
            onEditBufferChange: f.handleContextEditBufferChange
          }
        ),
        f.activeError && f.errorNodeAnchor && /* @__PURE__ */ e(
          Qs,
          {
            error: f.activeError,
            anchor: f.errorNodeAnchor,
            onDismiss: f.handleDismissError,
            onRetry: f.handleRetryFromError
          }
        ),
        /* @__PURE__ */ e(
          Fl,
          {
            runId: f.currentRunId,
            visible: f.isRunActive && A
          }
        ),
        /* @__PURE__ */ e(
          Ul,
          {
            publishConfirmOpen: X,
            onPublishClose: () => J(!1),
            onPublishConfirm: Ke,
            hasErrors: k,
            validationErrorCount: y?.errors.length ?? 0,
            definitionName: s.name,
            definitionVersion: s.version,
            deleteConfirmOpen: Q,
            onDeleteClose: () => E(!1),
            onDeleteConfirm: Ve,
            clearRunsConfirmOpen: P,
            onClearRunsClose: () => G(!1),
            onClearRunsConfirm: He,
            versionDiffOpen: j,
            onVersionDiffClose: () => _(!1),
            currentDef: s,
            publishedDef: Y,
            onJumpToNode: l,
            simPanelOpen: W,
            onSimPanelClose: () => V(!1)
          }
        ),
        /* @__PURE__ */ e(
          Ge,
          {
            open: f.triggerInputOpen,
            onClose: () => f.setTriggerInputOpen(!1),
            title: "Trigger inputs",
            maxWidth: 480,
            footer: /* @__PURE__ */ o(K, { children: [
              /* @__PURE__ */ e(Me, { variant: "ghost", onClick: () => f.setTriggerInputOpen(!1), children: "Cancel" }),
              /* @__PURE__ */ e(
                Me,
                {
                  variant: "primary",
                  onClick: f.handleTriggerInputSubmit,
                  disabled: C.some((ye) => !f.triggerInputValues[ye]?.trim()),
                  children: "Run"
                }
              )
            ] }),
            children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ e("p", { className: "m-0 text-xs text-text-secondary", children: "This pipeline expects input data. Provide values for the trigger context:" }),
              C.map((ye) => /* @__PURE__ */ o("label", { className: "flex flex-col gap-1 text-xs", children: [
                /* @__PURE__ */ e("span", { className: "font-medium text-text-primary", children: ye }),
                /* @__PURE__ */ e(
                  "textarea",
                  {
                    "data-autofocus": ye === C[0] ? !0 : void 0,
                    rows: 3,
                    className: "resize-y px-2 py-1.5 rounded-md border border-border text-xs font-inherit",
                    value: f.triggerInputValues[ye] ?? "",
                    onChange: (ie) => f.setTriggerInputValues((Pe) => ({ ...Pe, [ye]: ie.target.value }))
                  }
                )
              ] }, ye))
            ] })
          }
        )
      ]
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: I(
        "flex flex-col min-h-[calc(100vh-200px)]",
        "bg-surface-inset font-inherit text-text-primary",
        "rounded-lg border border-border overflow-hidden"
      ),
      children: /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]", children: "Loading pipeline…" })
    }
  );
}
function au(t) {
  const n = t?.event;
  return !n || n === "manual" ? { icon: "▶", text: "Manual" } : n === "schedule" ? { icon: "⏱", text: t?.schedule ?? "Schedule" } : n === "webhook" ? { icon: "🔌", text: t?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${t?.event}` };
}
function iu({
  row: t,
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
  const [u, m] = S(!1), [h, g] = S(!1), x = ce(null);
  yt(x, () => m(!1), u);
  const f = t.status === "published", v = t.status === "archived", N = typeof t.publishedVersion == "number", b = au(t.triggerBinding);
  let w, y;
  v ? (w = `Archived · v${t.version}`, y = "danger") : f ? (w = `Published · v${t.version}`, y = "success") : N ? (w = `Draft · v${t.version} (published v${t.publishedVersion})`, y = "warning") : (w = `Draft · v${t.version}`, y = "neutral");
  const k = !f, C = (A) => (M) => {
    M.stopPropagation(), A();
  }, $ = d || c || h || l, D = (A) => {
    d ? p(A.shiftKey) : n();
  };
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": `pipeline-card-${t.id}`,
      "data-selected": c ? "true" : "false",
      onClick: D,
      onMouseEnter: () => g(!0),
      onMouseLeave: () => {
        g(!1), m(!1);
      },
      className: I(
        "flex flex-col gap-2 w-full px-3.5 py-3 bg-surface rounded-lg cursor-pointer relative transition-[border-color,box-shadow] duration-100",
        c ? "border border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : h ? "border border-primary shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "border border-border shadow-none"
      ),
      children: [
        $ && /* @__PURE__ */ e(
          "label",
          {
            onClick: (A) => A.stopPropagation(),
            className: "absolute top-2 right-2 flex items-center justify-center w-[22px] h-[22px] cursor-pointer z-[1]",
            children: /* @__PURE__ */ e(
              "input",
              {
                type: "checkbox",
                "data-testid": `pipeline-select-${t.id}`,
                checked: c,
                onClick: (A) => {
                  A.stopPropagation(), p(A.shiftKey);
                },
                onKeyDown: (A) => {
                  (A.key === " " || A.key === "Spacebar") && (A.preventDefault(), p(A.shiftKey));
                },
                onChange: () => {
                },
                className: "cursor-pointer w-4 h-4 accent-primary"
              }
            )
          }
        ),
        /* @__PURE__ */ o("div", { className: I("flex items-center gap-2 min-w-0", $ && "pr-7"), children: [
          /* @__PURE__ */ e("span", { className: "text-lg shrink-0", "aria-hidden": !0, children: t.icon }),
          /* @__PURE__ */ e(
            "div",
            {
              className: "flex-1 min-w-0 text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap",
              title: t.name,
              children: t.name
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ e(le, { "aria-label": `Status: ${w}`, tone: y, size: "sm", children: w }),
          /* @__PURE__ */ o("span", { className: "text-[11px] text-text-secondary", children: [
            b.icon,
            " ",
            b.text
          ] }),
          /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", children: [
            "· ",
            t.nodeCount,
            " node",
            t.nodeCount === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ e(
            "button",
            {
              "data-testid": `run-pipeline-${t.id}`,
              onClick: C(r),
              disabled: k,
              title: k ? "Run requires published state" : "Run pipeline",
              className: "px-3 py-[5px] text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
              children: "Run"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              "data-testid": `edit-pipeline-${t.id}`,
              onClick: C(n),
              className: "px-3 py-[5px] text-xs font-semibold bg-surface text-text-secondary border border-border-field rounded-md cursor-pointer font-[inherit]",
              children: "Edit"
            }
          ),
          /* @__PURE__ */ o("div", { className: "relative ml-auto", ref: x, children: [
            /* @__PURE__ */ e(
              "button",
              {
                "data-testid": `overflow-pipeline-${t.id}`,
                onClick: C(() => m((A) => !A)),
                "aria-label": "More actions",
                className: "px-2 py-1 text-sm font-bold bg-transparent text-text-secondary border border-transparent rounded-md cursor-pointer font-[inherit] leading-none",
                children: "⋯"
              }
            ),
            u && /* @__PURE__ */ o(
              "div",
              {
                "data-testid": `overflow-menu-${t.id}`,
                role: "menu",
                onClick: (A) => A.stopPropagation(),
                className: "absolute right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-[0_8px_24px_rgba(15,23,42,0.12)] min-w-[160px] z-10 overflow-hidden",
                children: [
                  /* @__PURE__ */ e("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: C(() => {
                    m(!1), i();
                  }), children: "Duplicate" }),
                  /* @__PURE__ */ e("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: C(() => {
                    m(!1), a();
                  }), children: "Export JSON" }),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-[#dc2626]",
                      role: "menuitem",
                      onClick: C(() => {
                        m(!1), s();
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
const su = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, lu = ["draft", "published"];
function cu({
  search: t,
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
  onHeaderToggleAll: m
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
              /* @__PURE__ */ e(
                "input",
                {
                  ref: u,
                  type: "checkbox",
                  "data-testid": "pipeline-select-all",
                  "aria-label": "Select all visible pipelines",
                  checked: p,
                  onChange: m,
                  className: "w-3.5 h-3.5 accent-primary"
                }
              ),
              /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: "All" })
            ]
          }
        ),
        /* @__PURE__ */ e(
          "input",
          {
            "data-testid": "pipeline-search",
            type: "search",
            placeholder: "Search...",
            value: t,
            onChange: (h) => n(h.target.value),
            className: I(
              "border border-border-field rounded-md px-2.5 py-1.5 text-[13px]",
              "bg-[#f9fafb] text-text-primary outline-none",
              "flex-[0_1_260px] min-w-[180px]"
            )
          }
        ),
        /* @__PURE__ */ e(
          "span",
          {
            id: "pipelines-status-label",
            className: "text-xs text-text-secondary font-medium",
            children: "Status:"
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            role: "group",
            "aria-labelledby": "pipelines-status-label",
            className: "flex gap-1.5 flex-nowrap shrink-0",
            children: dr.map((h) => {
              const g = i ? r.has(h) : lu.includes(h);
              return /* @__PURE__ */ e(
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
                  children: su[h]
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
                /* @__PURE__ */ e("option", { value: "all", children: "All" }),
                /* @__PURE__ */ e("option", { value: "manual", children: "Manual" }),
                /* @__PURE__ */ e("option", { value: "document", children: "Document event" }),
                /* @__PURE__ */ e("option", { value: "schedule", children: "Schedule" }),
                /* @__PURE__ */ e("option", { value: "webhook", children: "Webhook" })
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
                /* @__PURE__ */ e("option", { value: "updated", children: "Recently updated" }),
                /* @__PURE__ */ e("option", { value: "name", children: "Name A-Z" }),
                /* @__PURE__ */ e("option", { value: "created", children: "Recently created" })
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
function du({
  count: t,
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
  removeTagOpen: m,
  onSubmitAddTag: h,
  onSubmitRemoveTag: g,
  onCloseAddTag: x,
  onCloseRemoveTag: f,
  unionTags: v
}) {
  const [N, b] = S(""), w = ce(null), y = ce(null), k = ce(null);
  re(() => {
    u && (b(""), setTimeout(() => w.current?.focus(), 30));
  }, [u]), re(() => {
    if (!u) return;
    const $ = (A) => {
      y.current?.contains(A.target) || x();
    }, D = window.setTimeout(() => {
      document.addEventListener("mousedown", $);
    }, 0);
    return () => {
      window.clearTimeout(D), document.removeEventListener("mousedown", $);
    };
  }, [u, x]), re(() => {
    if (!m) return;
    const $ = (A) => {
      k.current?.contains(A.target) || f();
    }, D = window.setTimeout(() => {
      document.addEventListener("mousedown", $);
    }, 0);
    return () => {
      window.clearTimeout(D), document.removeEventListener("mousedown", $);
    };
  }, [m, f]);
  const C = () => {
    const $ = N.trim();
    $.length !== 0 && (h($), b(""));
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
              t,
              " selected"
            ]
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-clear", className: et, onClick: n, children: "Clear" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-publish", className: et, onClick: a, children: "Publish selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-archive", className: et, onClick: s, children: "Archive selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export-json", className: et, onClick: i, children: "Export selected as JSON" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export", className: et, onClick: r, children: "Export all" }),
        /* @__PURE__ */ e(
          "button",
          {
            "data-testid": "bulk-delete-confirm-prompt",
            className: et,
            onClick: p,
            children: "Delete selected"
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", children: [
          /* @__PURE__ */ e("button", { "data-testid": "bulk-add-tag-btn", className: et, onClick: d, children: "Add tag..." }),
          u && /* @__PURE__ */ o(
            "div",
            {
              ref: y,
              "data-testid": "bulk-add-tag-popover",
              onClick: ($) => $.stopPropagation(),
              className: I(
                "absolute top-full left-0 mt-1.5",
                "bg-white border border-border rounded-lg",
                "shadow-lg min-w-[220px] p-2.5 z-10",
                "flex flex-col gap-2"
              ),
              children: [
                /* @__PURE__ */ e(
                  "input",
                  {
                    ref: w,
                    type: "text",
                    "data-testid": "bulk-add-tag-input",
                    placeholder: "Tag name",
                    value: N,
                    onChange: ($) => b($.target.value),
                    onKeyDown: ($) => {
                      $.key === "Enter" ? ($.preventDefault(), C()) : $.key === "Escape" && ($.preventDefault(), x());
                    },
                    className: I(
                      "border border-border-field rounded-md px-2.5 py-1.5 text-[13px]",
                      "bg-[#f9fafb] text-text-primary outline-none w-full"
                    )
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    "data-testid": "bulk-add-tag-submit",
                    disabled: N.trim().length === 0,
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
          /* @__PURE__ */ e(
            "button",
            {
              "data-testid": "bulk-remove-tag-btn",
              className: I(
                et,
                v.length === 0 && "opacity-50 cursor-not-allowed"
              ),
              onClick: c,
              disabled: v.length === 0,
              title: v.length === 0 ? "No tags on selected pipelines" : "Remove tag from selected",
              children: "Remove tag..."
            }
          ),
          m && /* @__PURE__ */ o(
            "div",
            {
              ref: k,
              "data-testid": "bulk-remove-tag-popover",
              onClick: ($) => $.stopPropagation(),
              className: I(
                "absolute top-full left-0 mt-1.5",
                "bg-white border border-border rounded-lg",
                "shadow-lg min-w-[220px] max-w-[320px] p-2.5 z-10",
                "flex flex-col gap-2"
              ),
              children: [
                /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: "Click a tag to remove it from all selected:" }),
                /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: v.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "No tags to remove." }) : v.map(($) => /* @__PURE__ */ o(
                  "button",
                  {
                    "data-testid": `bulk-remove-tag-chip-${$}`,
                    onClick: () => g($),
                    className: I(
                      "px-2 py-0.5 text-xs font-medium",
                      "bg-danger-bg text-danger-fg",
                      "border border-danger-border rounded-full",
                      "cursor-pointer font-inherit"
                    ),
                    children: [
                      $,
                      " ✕"
                    ]
                  },
                  $
                )) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e(
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
function pu({
  visibleRows: t,
  filteredIds: n
}) {
  const [r, i] = S(!1), [a, s] = S(/* @__PURE__ */ new Set()), d = ce(null), c = ce(null), l = O(() => {
    s(/* @__PURE__ */ new Set());
  }, []), p = O(() => {
    r ? (l(), i(!1)) : i(!0);
  }, [r, l]), u = O(
    (f, v = !1) => {
      const N = t, b = N.findIndex((y) => y.id === f), w = d.current;
      b !== -1 && (d.current = b), s((y) => {
        const k = new Set(y), C = !k.has(f);
        if (v && w != null && b !== -1) {
          const $ = Math.min(w, b), D = Math.max(w, b);
          for (let A = $; A <= D; A++) {
            const M = N[A];
            M && (C ? k.add(M.id) : k.delete(M.id));
          }
        } else C ? k.add(f) : k.delete(f);
        return k;
      });
    },
    [t]
  ), m = O(() => {
    s(new Set(n));
  }, [n]), h = t.length > 0 && t.every((f) => a.has(f.id)), g = !h && t.some((f) => a.has(f.id)), x = O(() => {
    s((f) => {
      const v = new Set(f);
      if (h)
        for (const N of t) v.delete(N.id);
      else
        for (const N of t) v.add(N.id);
      return v;
    }), r || i(!0);
  }, [h, t, r]);
  return re(() => {
    c.current && (c.current.indeterminate = g);
  }, [g]), {
    selectionMode: r,
    selected: a,
    allVisibleSelected: h,
    someVisibleSelected: g,
    selectAllRef: c,
    handleToggleSelectMode: p,
    handleToggleSelect: u,
    handleSelectAllFiltered: m,
    handleHeaderToggleAll: x,
    clearSelection: l,
    setSelectionMode: i
  };
}
const uu = 280, ke = 160, mu = 40, hu = 200;
function ee(t) {
  return mu + t * uu;
}
function te(t) {
  return hu + t * ke;
}
function oe(t, n, r, i = "in") {
  return {
    id: crypto.randomUUID(),
    source: t,
    sourceHandle: n,
    target: r,
    targetHandle: i
  };
}
function fu(t) {
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
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: s },
    { id: i, type: "llm", position: { x: ee(1), y: te(0) }, data: d },
    { id: a, type: "action", position: { x: ee(2), y: te(0) }, data: c }
  ], p = [
    oe(r, "out", i),
    oe(i, "out", a)
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
    createdBy: t
  };
}
function gu(t) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = {
    type: "trigger",
    triggerType: "document.finalize",
    documentTypeId: "meeting-notes"
  }, u = {
    type: "fork",
    branchCount: 2,
    branchLabels: ["action-items", "summary"]
  }, m = {
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
  }, f = {
    type: "join",
    mode: "all",
    mergeStrategy: "deep-merge"
  }, v = [
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: p },
    { id: i, type: "fork", position: { x: ee(1), y: te(0) }, data: u },
    { id: a, type: "llm", position: { x: ee(2), y: te(0) - ke / 2 }, data: m },
    { id: s, type: "action", position: { x: ee(3), y: te(0) - ke / 2 }, data: h },
    { id: d, type: "llm", position: { x: ee(2), y: te(0) + ke / 2 }, data: g },
    { id: c, type: "action", position: { x: ee(3), y: te(0) + ke / 2 }, data: x },
    { id: l, type: "join", position: { x: ee(4), y: te(0) }, data: f }
  ], N = [
    oe(r, "out", i),
    oe(i, "branch-0", a),
    oe(a, "out", s),
    oe(s, "out", l, "in-0"),
    oe(i, "branch-1", d),
    oe(d, "out", c),
    oe(c, "out", l, "in-1")
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
    edges: N,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function xu(t) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = crypto.randomUUID(), m = {
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
  }, f = {
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
  }, N = {
    type: "condition",
    expression: `context.steps.${c}.output.decision === 'approve'`,
    label: "Approved?"
  }, b = {
    type: "action",
    actionType: "post-comment",
    config: { body: "{{context.commentBody}}" },
    idempotent: !0,
    onError: "fail-run"
  }, w = {
    type: "action",
    actionType: "update-document",
    config: { field: "commentStatus", value: "deleted" },
    idempotent: !0,
    onError: "fail-run"
  }, y = [
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: m },
    { id: i, type: "llm", position: { x: ee(1), y: te(0) }, data: h },
    { id: a, type: "condition", position: { x: ee(2), y: te(0) }, data: g },
    { id: s, type: "action", position: { x: ee(3), y: te(0) - ke / 2 }, data: x },
    { id: d, type: "action", position: { x: ee(3), y: te(0) + ke / 2 }, data: f },
    { id: c, type: "approval", position: { x: ee(4), y: te(0) + ke / 2 }, data: v },
    { id: l, type: "condition", position: { x: ee(5), y: te(0) + ke / 2 }, data: N },
    { id: p, type: "action", position: { x: ee(6), y: te(0) }, data: b },
    { id: u, type: "action", position: { x: ee(6), y: te(0) + ke }, data: w }
  ], k = [
    oe(r, "out", i),
    oe(i, "out", a),
    oe(a, "true", s),
    oe(a, "false", d),
    oe(d, "out", c),
    oe(c, "approved", l),
    oe(c, "rejected", u),
    oe(l, "true", p),
    oe(l, "false", u)
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
    createdBy: t
  };
}
function bu(t) {
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
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: d },
    { id: i, type: "llm", position: { x: ee(1), y: te(0) }, data: c },
    { id: a, type: "transform", position: { x: ee(2), y: te(0) }, data: l },
    { id: s, type: "action", position: { x: ee(3), y: te(0) }, data: p }
  ], m = [
    oe(r, "out", i),
    oe(i, "out", a),
    oe(a, "out", s)
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
    edges: m,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function yu(t) {
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
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: d },
    { id: i, type: "approval", position: { x: ee(1), y: te(0) }, data: c },
    { id: a, type: "approval", position: { x: ee(2), y: te(0) }, data: l },
    { id: s, type: "action", position: { x: ee(3), y: te(0) }, data: p }
  ], m = [
    oe(r, "out", i),
    oe(i, "approved", a),
    oe(a, "approved", s)
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
    edges: m,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function vu(t) {
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
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: d },
    { id: i, type: "transform", position: { x: ee(1), y: te(0) }, data: c },
    { id: a, type: "llm", position: { x: ee(2), y: te(0) }, data: l },
    { id: s, type: "action", position: { x: ee(3), y: te(0) }, data: p }
  ], m = [
    oe(r, "out", i),
    oe(i, "out", a),
    oe(a, "out", s)
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
    edges: m,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Nu(t) {
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
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: s },
    { id: i, type: "llm", position: { x: ee(1), y: te(0) }, data: d },
    { id: a, type: "action", position: { x: ee(2), y: te(0) }, data: c }
  ], p = [
    oe(r, "out", i),
    oe(i, "out", a)
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
    createdBy: t
  };
}
function wu(t) {
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
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: s },
    { id: i, type: "llm", position: { x: ee(1), y: te(0) }, data: d },
    { id: a, type: "action", position: { x: ee(2), y: te(0) }, data: c }
  ], p = [
    oe(r, "out", i),
    oe(i, "out", a)
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
    createdBy: t
  };
}
function ku(t) {
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
  }, m = {
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
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: l },
    { id: i, type: "fork", position: { x: ee(1), y: te(0) }, data: p },
    { id: a, type: "llm", position: { x: ee(2), y: te(0) - ke / 2 }, data: u },
    { id: s, type: "approval", position: { x: ee(2), y: te(0) + ke / 2 }, data: m },
    { id: d, type: "join", position: { x: ee(3), y: te(0) }, data: h },
    { id: c, type: "action", position: { x: ee(4), y: te(0) }, data: g }
  ], f = [
    oe(r, "out", i),
    oe(i, "branch-0", a),
    oe(a, "out", d, "in-0"),
    oe(i, "branch-1", s),
    oe(s, "approved", d, "in-1"),
    oe(d, "out", c)
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
    edges: f,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Cu(t) {
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
  }, m = {
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
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: l },
    { id: i, type: "llm", position: { x: ee(1), y: te(0) }, data: p },
    { id: a, type: "condition", position: { x: ee(2), y: te(0) }, data: u },
    { id: s, type: "action", position: { x: ee(3), y: te(0) - ke / 2 }, data: m },
    { id: d, type: "approval", position: { x: ee(4), y: te(0) - ke / 2 }, data: h },
    { id: c, type: "action", position: { x: ee(3), y: te(0) + ke / 2 }, data: g }
  ], f = [
    oe(r, "out", i),
    oe(i, "out", a),
    oe(a, "true", s),
    oe(s, "out", d),
    oe(a, "false", c)
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
    edges: f,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Iu(t) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = crypto.randomUUID(), m = {
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
  }, f = {
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
  }, N = {
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
  }, w = {
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
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: m },
    { id: i, type: "llm", position: { x: ee(1), y: te(0) }, data: h },
    { id: a, type: "fork", position: { x: ee(2), y: te(0) }, data: g },
    { id: s, type: "llm", position: { x: ee(3), y: te(0) - ke }, data: x },
    { id: d, type: "llm", position: { x: ee(3), y: te(0) }, data: f },
    { id: c, type: "llm", position: { x: ee(3), y: te(0) + ke }, data: v },
    { id: l, type: "join", position: { x: ee(4), y: te(0) }, data: N },
    { id: p, type: "llm", position: { x: ee(5), y: te(0) }, data: b },
    { id: u, type: "action", position: { x: ee(6), y: te(0) }, data: w }
  ], k = [
    oe(r, "out", i),
    oe(i, "out", a),
    oe(a, "branch-0", s),
    oe(a, "branch-1", d),
    oe(a, "branch-2", c),
    oe(s, "out", l, "in-0"),
    oe(d, "out", l, "in-1"),
    oe(c, "out", l, "in-2"),
    oe(l, "out", p),
    oe(p, "out", u)
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
    createdBy: t
  };
}
function Su(t) {
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
  }, m = {
    type: "approval",
    approvers: [{ type: "role", value: "moderator" }],
    requiredCount: 1,
    timeoutMs: 720 * 60 * 1e3,
    timeoutAction: "reject",
    message: `Document flagged as {{context.steps.${i}.output.category}} — please review before publishing.`
  }, h = [
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: c },
    { id: i, type: "llm", position: { x: ee(1), y: te(0) }, data: l },
    { id: a, type: "condition", position: { x: ee(2), y: te(0) }, data: p },
    { id: s, type: "action", position: { x: ee(3), y: te(0) - ke / 2 }, data: u },
    { id: d, type: "approval", position: { x: ee(3), y: te(0) + ke / 2 }, data: m }
  ], g = [
    oe(r, "out", i),
    oe(i, "out", a),
    oe(a, "true", s),
    oe(a, "false", d)
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
    createdBy: t
  };
}
function $u(t) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = {
    type: "trigger",
    triggerType: "webhook",
    webhookPath: "/pipelines/webhooks/helpdesk"
  }, m = {
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
  }, f = {
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
  }, N = {
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
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: u },
    { id: i, type: "llm", position: { x: ee(1), y: te(0) }, data: m },
    { id: a, type: "transform", position: { x: ee(2), y: te(0) }, data: h },
    { id: s, type: "condition", position: { x: ee(3), y: te(0) }, data: g },
    { id: d, type: "action", position: { x: ee(4), y: te(0) - ke / 2 }, data: x },
    { id: c, type: "llm", position: { x: ee(4), y: te(0) + ke / 2 }, data: f },
    { id: l, type: "approval", position: { x: ee(5), y: te(0) + ke / 2 }, data: v },
    { id: p, type: "action", position: { x: ee(6), y: te(0) + ke / 2 }, data: N }
  ], w = [
    oe(r, "out", i),
    oe(i, "out", a),
    oe(a, "out", s),
    oe(s, "true", d),
    oe(s, "false", c),
    oe(c, "out", l),
    oe(l, "approved", p)
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
    edges: w,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
const Fn = [
  {
    id: "document-summary",
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    tags: ["llm", "summary", "document"],
    build: fu
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: gu
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: xu,
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
    build: bu,
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
    build: yu,
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
    build: vu
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: Nu
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: wu
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: ku
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: Cu
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: Iu
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: Su
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: $u
  }
], na = "/api";
async function Tu(t) {
  const n = { createdTypes: [], errors: [] };
  if (!t?.documentTypes?.length) return n;
  for (const r of t.documentTypes)
    try {
      const i = await Ru(r.name);
      if (i) {
        n.createdTypes.push(i.typeId);
        continue;
      }
      const a = await Pu(r);
      n.createdTypes.push(a.typeId);
    } catch (i) {
      n.errors.push(
        `Failed to scaffold "${r.name}": ${i instanceof Error ? i.message : String(i)}`
      );
    }
  return n;
}
async function Ru(t) {
  try {
    const n = await fetch(`${na}/document-types`, { credentials: "same-origin" });
    if (!n.ok) return null;
    const i = (await n.json()).items?.find(
      (a) => a.name.toLowerCase() === t.toLowerCase()
    );
    return i ? { typeId: i.typeId } : null;
  } catch {
    return null;
  }
}
async function Pu(t) {
  const n = t.fields.map((a, s) => ({
    fieldId: crypto.randomUUID(),
    name: a.name,
    fieldType: a.fieldType,
    widget: Au(a.fieldType),
    cardinality: 1,
    required: a.required ?? !1,
    helpText: "",
    options: a.options,
    order: s
  })), r = await fetch(`${na}/document-types`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({
      name: t.name,
      description: "Auto-created for pipeline template",
      icon: t.icon,
      fields: n
    })
  });
  if (!r.ok) {
    const a = await r.text();
    throw new Error(`HTTP ${r.status}: ${a}`);
  }
  return await r.json();
}
function Au(t) {
  switch (t) {
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
function Mu(t) {
  const n = /* @__PURE__ */ new Map(), r = t.nodes.map((s) => {
    const d = crypto.randomUUID();
    return n.set(s.id, d), {
      ...s,
      id: d,
      data: JSON.parse(JSON.stringify(s.data)),
      position: { ...s.position }
    };
  }), i = t.edges.map((s) => ({
    ...s,
    id: crypto.randomUUID(),
    source: n.get(s.source) ?? s.source,
    target: n.get(s.target) ?? s.target
  })), a = (/* @__PURE__ */ new Date()).toISOString();
  return {
    ...t,
    id: crypto.randomUUID(),
    name: `${t.name} (copy)`,
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
function Du(t) {
  const n = t.triggerBinding?.event ?? "manual";
  return n === "schedule" ? "Schedule" : n === "webhook" ? "Webhook" : n === "manual" ? "Manual" : n.startsWith("document.") ? `On ${n}` : n;
}
function Ou({ template: t, meta: n, onPick: r }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": `template-card-${t.id}`,
      className: "flex flex-col gap-2 w-[220px] min-h-[200px] p-3.5 bg-surface border border-border rounded-[10px] font-[inherit]",
      children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ e("span", { className: "text-2xl", "aria-hidden": !0, children: t.icon }),
          /* @__PURE__ */ e("div", { className: "text-sm font-bold text-text-primary overflow-hidden text-ellipsis", children: t.name })
        ] }),
        /* @__PURE__ */ o(
          "div",
          {
            "data-testid": `template-meta-${t.id}`,
            className: "text-[11px] text-text-tertiary flex gap-2",
            children: [
              /* @__PURE__ */ o("span", { children: [
                n.nodeCount,
                " node",
                n.nodeCount === 1 ? "" : "s"
              ] }),
              /* @__PURE__ */ e("span", { "aria-hidden": !0, children: "·" }),
              /* @__PURE__ */ e("span", { children: n.trigger })
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary leading-[1.4] flex-1", children: t.description }),
        t.tags.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: t.tags.map((i) => /* @__PURE__ */ e(
          "span",
          {
            className: "text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#f1f5f9] text-text-secondary lowercase",
            children: i
          },
          i
        )) }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            "data-testid": `template-use-${t.id}`,
            onClick: () => r(t),
            className: "mt-auto px-2.5 py-1.5 text-xs font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
            children: "Use this template"
          }
        )
      ]
    }
  );
}
function Eu({
  open: t,
  onClose: n,
  onCreated: r,
  onSelect: i
}) {
  const { userId: a } = Ko(), [s, d] = S(""), c = ce(null);
  re(() => {
    t && (d(""), setTimeout(() => c.current?.focus(), 30));
  }, [t]);
  const l = q(() => {
    const h = /* @__PURE__ */ new Map();
    for (const g of Fn) {
      const x = g.build(a || "anonymous");
      h.set(g.id, { nodeCount: x.nodes.length, trigger: Du(x) });
    }
    return h;
  }, [a, t]), p = q(() => {
    const h = s.trim().toLowerCase();
    return h ? Fn.filter(
      (g) => g.name.toLowerCase().includes(h) || g.description.toLowerCase().includes(h) || g.tags.some((x) => x.toLowerCase().includes(h))
    ) : Fn;
  }, [s]), u = (h) => {
    if (r) {
      const g = h.build(a || "anonymous"), x = Mu(g);
      Ia(x), n(), r(x.id), h.prerequisites && Tu(h.prerequisites).then((f) => {
        f.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", f.errors);
      });
      return;
    }
    i && i(h);
  };
  return /* @__PURE__ */ o(
    Ge,
    {
      open: t,
      onClose: n,
      title: "Pipeline templates",
      maxWidth: 760,
      backdropTestId: "templates-modal",
      rawChildren: !0,
      children: [
        /* @__PURE__ */ e("div", { className: "text-[13px] text-text-secondary mb-3", children: "Pick a template to spawn a new pipeline with prebuilt nodes and edges." }),
        /* @__PURE__ */ e(
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
        ) : /* @__PURE__ */ e(
          "div",
          {
            "data-testid": "templates-grid",
            className: "grid grid-cols-[repeat(3,220px)] gap-4 justify-center max-h-[60vh] overflow-y-auto p-2",
            children: p.map((h) => /* @__PURE__ */ e(
              Ou,
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
const dr = ["draft", "published", "archived"], mo = ["draft", "published"];
function _u(t) {
  if (t == null) return null;
  if (t.trim() === "") return /* @__PURE__ */ new Set();
  const n = new Set(dr);
  return new Set(
    t.split(",").map((i) => i.trim()).filter((i) => n.has(i))
  );
}
function Lu(t, n) {
  return {
    id: t.id,
    name: t.name,
    status: t.status || "draft",
    updatedAt: t.updatedAt,
    version: t.version,
    publishedVersion: t.publishedVersion,
    nodeCount: (t.nodes ?? []).length,
    triggerBinding: t.triggerBinding,
    createdAt: t.createdAt,
    icon: t.icon ?? n ?? "🔀",
    tags: t.tags ?? []
  };
}
function Bu(t) {
  const n = t?.event;
  return !n || n === "manual" ? "manual" : n === "schedule" ? "schedule" : n === "webhook" ? "webhook" : "document";
}
function ho(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Uu() {
  const t = /* @__PURE__ */ new Date(), n = t.getFullYear(), r = String(t.getMonth() + 1).padStart(2, "0"), i = String(t.getDate()).padStart(2, "0");
  return `${n}-${r}-${i}`;
}
function Fu({
  open: t,
  onClose: n,
  onCreate: r
}) {
  const [i, a] = S(""), s = ce(null);
  re(() => {
    t && (a(""), setTimeout(() => s.current?.focus(), 50));
  }, [t]);
  const d = i.trim().length > 0, c = () => {
    d && r(i.trim());
  };
  return /* @__PURE__ */ o(
    Ge,
    {
      open: t,
      onClose: n,
      title: "Create new pipeline",
      maxWidth: 440,
      footer: /* @__PURE__ */ o(K, { children: [
        /* @__PURE__ */ e(
          "button",
          {
            "data-testid": "new-pipeline-cancel",
            className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
            onClick: n,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ e(
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
        /* @__PURE__ */ e("label", { className: "block text-[13px] font-semibold text-text-secondary mb-1.5", children: "Name" }),
        /* @__PURE__ */ e(
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
function sf() {
  const t = ze(), { userId: n } = Ko(), { toast: r } = un(), { triggerRun: i, isTriggering: a } = Sa(), [s, d] = pn(), [c, l] = S([]), [p, u] = S(""), [m, h] = S("all"), [g, x] = S("updated"), f = q(
    () => _u(s.get("status")),
    [s]
  ), v = q(() => f ?? new Set(mo), [f]), N = f != null, b = (T) => {
    const L = new URLSearchParams(s);
    if (T.size === 0)
      L.set("status", "");
    else {
      const pe = dr.filter((fe) => T.has(fe)).join(",");
      L.set("status", pe);
    }
    d(L, { replace: !0 });
  }, w = (T) => {
    const L = N ? new Set(v) : new Set(mo);
    L.has(T) ? L.delete(T) : L.add(T), b(L);
  }, [y, k] = S(!1), [C, $] = S(!1), [D, A] = S(null), [M, ne] = S(!1), [R, H] = S(!1), [X, J] = S(!1), Q = O(async () => {
    const T = await $a(), L = [];
    for (const pe of T) {
      const fe = await ct(pe.id);
      fe && L.push(Lu(fe, pe.icon));
    }
    l(L);
  }, []);
  re(() => {
    Q();
  }, [Q]);
  const E = q(() => {
    const T = p.trim().toLowerCase(), pe = [...c.filter((fe) => {
      if (T) {
        const Ne = fe.name.toLowerCase().includes(T), Fe = fe.tags.some((ur) => ur.toLowerCase().includes(T));
        if (!Ne && !Fe) return !1;
      }
      return !(!(N && v.size === 0) && !v.has(fe.status) || m !== "all" && Bu(fe.triggerBinding) !== m);
    })];
    return g === "name" ? pe.sort((fe, Ne) => fe.name.localeCompare(Ne.name)) : g === "created" ? pe.sort((fe, Ne) => Ne.createdAt.localeCompare(fe.createdAt)) : pe.sort((fe, Ne) => Ne.updatedAt.localeCompare(fe.updatedAt)), pe;
  }, [c, p, v, N, m, g]), P = q(() => E.map((T) => T.id), [E]), {
    selectionMode: G,
    selected: j,
    allVisibleSelected: _,
    selectAllRef: W,
    handleToggleSelect: V,
    handleSelectAllFiltered: Y,
    handleHeaderToggleAll: me,
    clearSelection: z,
    setSelectionMode: de
  } = pu({ visibleRows: E, filteredIds: P }), we = q(() => {
    const T = /* @__PURE__ */ new Set();
    for (const L of c)
      if (j.has(L.id))
        for (const pe of L.tags) T.add(pe);
    return Array.from(T).sort((L, pe) => L.localeCompare(pe));
  }, [c, j]), Ue = async (T) => {
    const L = await Ta({ name: T, createdBy: n });
    k(!1), t(`/pipelines/${L.id}`);
  }, Ze = () => {
    const T = Ra(n);
    dt(T).then(() => Q()), t(`/pipelines/${T.id}`);
  }, We = (T) => {
    const L = T.build(n);
    dt(L), $(!1), t(`/pipelines/${L.id}`);
  }, _e = (T) => t(`/pipelines/${T}`), Ke = async (T) => {
    if (T.status !== "published") {
      r("Run requires published state", { type: "warning" });
      return;
    }
    if (!a)
      try {
        await i(T.id, {}) ? r(`Run started for "${T.name}"`, { type: "success" }) : r("Could not start run", { type: "error" });
      } catch (L) {
        r(`Run failed: ${L.message}`, { type: "error" });
      } finally {
        t(`/pipelines/${T.id}`);
      }
  }, Ve = (T) => {
    const L = or(T);
    L && (dt(L).then(() => Q()), r(`Duplicated as "${L.name}"`, { type: "success" }));
  }, He = (T) => {
    const L = qn(T.id);
    if (!L) {
      r("Export failed", { type: "error" });
      return;
    }
    Ft(`${ho(T.name)}.pipeline.json`, L);
  }, Ie = async () => {
    D && (await hr(D), A(null), Q(), r("Pipeline deleted", { type: "success" }));
  }, ye = D ? c.find((T) => T.id === D) : null, ie = () => {
    const T = Array.from(j);
    T.length !== 0 && (T.forEach((L, pe) => {
      window.setTimeout(() => {
        const fe = c.find((Fe) => Fe.id === L), Ne = qn(L);
        !fe || !Ne || Ft(`${ho(fe.name)}-${Uu()}.pipeline.json`, Ne);
      }, pe * 100);
    }), r(`Exported ${T.length} pipeline${T.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, Pe = async (T) => {
    const L = Array.from(j);
    for (const pe of L) {
      const fe = await ct(pe);
      if (!fe) continue;
      const Ne = fe.tags ?? [];
      Ne.includes(T) || (fe.tags = [...Ne, T], await dt(fe));
    }
    H(!1), Q(), r(`Added tag "${T}" to ${L.length} pipeline${L.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, It = async (T) => {
    const L = Array.from(j);
    for (const pe of L) {
      const fe = await ct(pe);
      if (!fe) continue;
      const Ne = fe.tags ?? [];
      Ne.includes(T) && (fe.tags = Ne.filter((Fe) => Fe !== T), await dt(fe));
    }
    Q(), r(`Removed tag "${T}" from ${L.length} pipeline${L.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, Z = async () => {
    const T = Array.from(j);
    for (const L of T) await hr(L);
    ne(!1), z(), Q(), r(`Deleted ${T.length} pipeline${T.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ae = async () => {
    const T = Array.from(j);
    if (T.length === 0) return;
    let L = 0, pe = 0;
    for (const fe of T) {
      const Ne = await ct(fe);
      if (!Ne) continue;
      if (Ne.status === "published") {
        pe += 1;
        continue;
      }
      await Pa(fe) && (L += 1);
    }
    Q(), pe > 0 ? r(
      `Published ${L}; skipped ${pe} already published`,
      { type: "success" }
    ) : r(
      `Published ${L} pipeline${L === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, ue = async () => {
    const T = Array.from(j);
    if (T.length === 0) return;
    let L = 0, pe = 0;
    for (const Ne of T) {
      const Fe = await ct(Ne);
      if (!Fe) continue;
      Fe.status === "archived" ? (Fe.status = "draft", pe += 1) : (Fe.status = "archived", L += 1), await dt(Fe);
    }
    Q();
    const fe = [];
    L > 0 && fe.push(`Archived ${L}`), pe > 0 && fe.push(`Unarchived ${pe}`), r(fe.join(" · ") || "No pipelines changed", { type: "success" });
  }, xe = async () => {
    const T = Array.from(j);
    if (T.length === 0) return;
    const L = [];
    for (const fe of T) {
      const Ne = await ct(fe);
      Ne && L.push(Ne);
    }
    if (L.length === 0) {
      r("Export failed", { type: "error" });
      return;
    }
    const pe = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    Ft(`pipelines-${pe}.json`, JSON.stringify(L, null, 2)), r(`Exported ${L.length} pipeline${L.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  };
  re(() => {
    const T = (L) => {
      const pe = L.target;
      if (pe) {
        const Ne = pe.tagName;
        if (Ne === "INPUT" || Ne === "TEXTAREA" || Ne === "SELECT" || pe.isContentEditable)
          return;
      }
      if (L.key === "Escape") {
        (j.size > 0 || G || R || X) && (H(!1), J(!1), z(), de(!1));
        return;
      }
      if ((L.metaKey || L.ctrlKey) && (L.key === "a" || L.key === "A")) {
        G && (L.preventDefault(), Y());
        return;
      }
      (L.key === "Delete" || L.key === "Backspace") && j.size > 0 && !M && !D && !y && !C && (L.preventDefault(), ne(!0));
    };
    return window.addEventListener("keydown", T), () => window.removeEventListener("keydown", T);
  }, [
    j,
    G,
    R,
    X,
    M,
    D,
    y,
    C,
    z,
    Y,
    de
  ]);
  const Se = c.length > 0, Le = j.size > 0;
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
              /* @__PURE__ */ e("div", { className: "text-lg font-bold text-text-primary", children: "Pipelines" }),
              /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ e(
                  "button",
                  {
                    "data-testid": "metrics-btn",
                    onClick: () => t("/pipelines/metrics"),
                    className: I(
                      "px-4 py-[7px] text-[13px] font-semibold",
                      "bg-white text-text-secondary",
                      "border border-border-field rounded-[7px]",
                      "cursor-pointer font-inherit"
                    ),
                    children: "Metrics"
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    "data-testid": "templates-btn",
                    onClick: () => $(!0),
                    className: I(
                      "px-4 py-[7px] text-[13px] font-semibold",
                      "bg-white text-text-secondary",
                      "border border-border-field rounded-[7px]",
                      "cursor-pointer font-inherit"
                    ),
                    children: "Templates"
                  }
                ),
                /* @__PURE__ */ e(
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
        Se && /* @__PURE__ */ e(
          cu,
          {
            search: p,
            onSearchChange: u,
            statusFilter: v,
            statusExplicit: N,
            onToggleStatusKey: w,
            triggerFilter: m,
            onTriggerFilterChange: h,
            sortKey: g,
            onSortKeyChange: x,
            allVisibleSelected: _,
            selectAllRef: W,
            onHeaderToggleAll: me
          }
        ),
        Le && /* @__PURE__ */ e(
          du,
          {
            count: j.size,
            onClear: z,
            onExport: ie,
            onExportAsJSON: xe,
            onPublish: ae,
            onArchive: ue,
            onAddTag: () => {
              H((T) => !T), J(!1);
            },
            onRemoveTag: () => {
              J((T) => !T), H(!1);
            },
            onDelete: () => ne(!0),
            onDeleteWithConfirm: () => ne(!0),
            addTagOpen: R,
            removeTagOpen: X,
            onSubmitAddTag: Pe,
            onSubmitRemoveTag: It,
            onCloseAddTag: () => H(!1),
            onCloseRemoveTag: () => J(!1),
            unionTags: we
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: I(
              "flex-1 overflow-y-auto overflow-x-hidden min-w-0",
              Se ? "p-6" : "p-0"
            ),
            children: Se ? E.length === 0 ? /* @__PURE__ */ e(
              "div",
              {
                "data-testid": "filtered-empty",
                className: "text-center p-12 text-[13px] text-text-tertiary",
                children: "No pipelines match the current filters."
              }
            ) : /* @__PURE__ */ e(
              "div",
              {
                "data-testid": "pipeline-grid",
                className: "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[50px]",
                children: E.map((T) => /* @__PURE__ */ e(
                  iu,
                  {
                    row: T,
                    onOpen: () => _e(T.id),
                    onRun: () => {
                      Ke(T);
                    },
                    onDuplicate: () => Ve(T.id),
                    onExport: () => He(T),
                    onDelete: () => A(T.id),
                    selectionMode: G,
                    selected: j.has(T.id),
                    anySelected: Le,
                    onToggleSelect: (L) => V(T.id, L)
                  },
                  T.id
                ))
              }
            ) : /* @__PURE__ */ o("div", { className: "flex flex-col h-full", children: [
              /* @__PURE__ */ e("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ e(
                je,
                {
                  icon: "🔀",
                  title: "No pipelines yet",
                  body: "Design your first one — from scratch or pick a template later.",
                  actionLabel: "+ New Pipeline",
                  onAction: () => k(!0)
                }
              ) }),
              /* @__PURE__ */ o("div", { className: "flex justify-center items-center gap-2.5 text-[13px] text-text-tertiary px-6 pb-8", children: [
                /* @__PURE__ */ e(
                  "button",
                  {
                    "data-testid": "empty-state-demo",
                    onClick: Ze,
                    className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
                    children: "or try the demo pipeline"
                  }
                ),
                /* @__PURE__ */ e("span", { "aria-hidden": !0, children: "·" }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    "data-testid": "empty-state-templates",
                    onClick: () => $(!0),
                    className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
                    children: "or browse templates"
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ e(
          Fu,
          {
            open: y,
            onClose: () => k(!1),
            onCreate: Ue
          }
        ),
        /* @__PURE__ */ e(
          Eu,
          {
            open: C,
            onClose: () => $(!1),
            onSelect: We
          }
        ),
        /* @__PURE__ */ e(
          Ge,
          {
            open: !!D,
            onClose: () => A(null),
            title: "Delete pipeline?",
            maxWidth: 400,
            footer: /* @__PURE__ */ o(K, { children: [
              /* @__PURE__ */ e(
                "button",
                {
                  "data-testid": "delete-pipeline-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => A(null),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  "data-testid": "delete-pipeline-confirm",
                  onClick: Ie,
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
        /* @__PURE__ */ e(
          Ge,
          {
            open: M,
            onClose: () => ne(!1),
            title: `Delete ${j.size} pipeline${j.size === 1 ? "" : "s"}?`,
            maxWidth: 420,
            backdropTestId: "bulk-delete-modal",
            footer: /* @__PURE__ */ o(K, { children: [
              /* @__PURE__ */ e(
                "button",
                {
                  "data-testid": "bulk-delete-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => ne(!1),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ o(
                "button",
                {
                  "data-testid": "bulk-delete-confirm",
                  onClick: Z,
                  className: I(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-danger text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: [
                    "Delete ",
                    j.size
                  ]
                }
              )
            ] }),
            children: /* @__PURE__ */ o("p", { className: "m-0", children: [
              /* @__PURE__ */ o("strong", { children: [
                j.size,
                " pipeline",
                j.size === 1 ? "" : "s"
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
const ju = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function ra(t, n, r) {
  const i = ju[t], a = Math.max(0, n | 0), s = Math.max(0, r | 0);
  if (!i)
    return {
      inputTokens: a,
      outputTokens: s,
      inputCostUsd: 0,
      outputCostUsd: 0,
      totalCostUsd: 0,
      model: t,
      modelFound: !1
    };
  const d = a / 1e6 * i.inputPerMillion, c = s / 1e6 * i.outputPerMillion;
  return {
    inputTokens: a,
    outputTokens: s,
    inputCostUsd: d,
    outputCostUsd: c,
    totalCostUsd: d + c,
    model: t,
    modelFound: !0
  };
}
function Ct(t) {
  const n = {};
  let r = 0, i = 0, a = 0, s = 0, d = !1;
  for (const l of t) {
    if (!l.model) continue;
    const p = l.tokensIn ?? 0, u = l.tokensOut ?? 0, m = ra(l.model, p, u), h = n[l.model];
    h ? n[l.model] = {
      inputTokens: h.inputTokens + m.inputTokens,
      outputTokens: h.outputTokens + m.outputTokens,
      inputCostUsd: h.inputCostUsd + m.inputCostUsd,
      outputCostUsd: h.outputCostUsd + m.outputCostUsd,
      totalCostUsd: h.totalCostUsd + m.totalCostUsd,
      model: l.model,
      modelFound: h.modelFound || m.modelFound
    } : n[l.model] = m, r += m.inputTokens, i += m.outputTokens, a += m.inputCostUsd, s += m.outputCostUsd, m.modelFound && (d = !0);
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
function Ht(t) {
  return !t || !t.modelFound && t.totalCostUsd === 0 ? "—" : t.totalCostUsd >= 0.01 ? `$${t.totalCostUsd.toFixed(2)}` : t.totalCostUsd === 0 ? "$0.00" : `$${t.totalCostUsd.toFixed(4)}`;
}
function zu(t) {
  const n = t.data.label;
  if (typeof n == "string" && n.trim()) return n.trim();
  switch (t.data.type) {
    case "llm":
      return t.data.model || "llm";
    case "trigger":
      return t.data.triggerType || "trigger";
    case "action":
      return t.data.actionType || "action";
    case "transform":
      return t.data.transformType || "transform";
    case "join":
      return t.data.mode ? `join:${t.data.mode}` : "join";
    default:
      return t.type;
  }
}
function oa(t, n) {
  let r = 0;
  if (t.llm) {
    const a = n.get(t.nodeId);
    a && (r += ra(a, t.llm.tokensIn, t.llm.tokensOut).totalCostUsd);
  }
  const i = t.costUsd;
  return typeof i == "number" && Number.isFinite(i) && i > 0 && (r += i), r;
}
function qu(t, n) {
  if (!n) return [];
  const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    l.data.type === "llm" && r.set(l.id, l.data.model), i.set(l.id, zu(l)), a.set(l.id, l.data.type);
  const s = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    s.set(l.id, 0), d.set(l.id, 0);
  for (const l of t)
    for (const p of Object.values(l.steps ?? {})) {
      if (!i.has(p.nodeId)) continue;
      const u = oa(p, r);
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
function Wu(t) {
  return t.slice(0, 10);
}
function Vu(t) {
  return Date.UTC(
    Number(t.slice(0, 4)),
    Number(t.slice(5, 7)) - 1,
    Number(t.slice(8, 10))
  );
}
function Ku(t, n, r = 30, i = /* @__PURE__ */ new Date()) {
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
    const m = new Date(u).toISOString().slice(0, 10);
    c.set(m, 0), l.set(m, 0);
  }
  for (const u of t) {
    const m = Wu(u.startedAt);
    if (!c.has(m)) continue;
    let h = 0;
    for (const g of Object.values(u.steps ?? {}))
      h += oa(g, a);
    c.set(m, (c.get(m) ?? 0) + h), l.set(m, (l.get(m) ?? 0) + 1);
  }
  const p = [];
  for (let u = d; u <= s; u += 864e5) {
    const m = new Date(u).toISOString().slice(0, 10);
    p.push({
      date: m,
      ts: Vu(m),
      totalCostUsd: c.get(m) ?? 0,
      runCount: l.get(m) ?? 0
    });
  }
  return p;
}
const aa = [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
], ia = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], sa = ["24h", "7d", "30d", "all"], Hu = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function Ju(t) {
  return t.startsWith("document.") || t === "document" ? "document" : t === "schedule" || t === "scheduled" ? "scheduled" : t === "webhook" ? "webhook" : "manual";
}
function Gu(t) {
  let n = 0;
  for (const r of Object.values(t.steps ?? {})) {
    const i = r.attempts?.length ?? 0;
    i > 1 && (n += i - 1);
  }
  return n;
}
function la(t, n) {
  const r = n.now ?? Date.now(), i = n.range === "all" ? null : r - Hu[n.range], a = n.query.trim().toLowerCase();
  return t.filter((s) => {
    if (n.statuses.size > 0 && !n.statuses.has(s.status)) return !1;
    if (n.triggerKinds.size > 0) {
      const d = Ju(s.triggeredBy.triggerType);
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
function fo(t, n) {
  if (!t) return /* @__PURE__ */ new Set();
  const r = new Set(n);
  return new Set(
    t.split(",").map((i) => i.trim()).filter((i) => r.has(i))
  );
}
function ca(t) {
  const n = t.get("range") ?? "7d", r = sa.includes(n) ? n : "7d";
  return {
    query: t.get("q") ?? "",
    statuses: fo(t.get("status"), aa),
    triggerKinds: fo(t.get("trigger"), ia),
    range: r
  };
}
const Yu = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, Xu = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, Qu = {
  "24h": "Last 24h",
  "7d": "Last 7d",
  "30d": "Last 30d",
  all: "All time"
};
function go({
  label: t,
  options: n,
  selected: r,
  onToggle: i,
  labels: a,
  testIdPrefix: s
}) {
  const [d, c] = S(!1), l = ce(null);
  yt(l, () => c(!1), d);
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
          /* @__PURE__ */ e("span", { className: "text-text-tertiary font-semibold text-[11px]", children: t }),
          /* @__PURE__ */ e(
            "span",
            {
              className: I(
                r.size > 0 ? "text-primary font-semibold" : "text-text-secondary font-medium"
              ),
              children: p
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-[9px] ml-0.5 opacity-60", children: "▾" })
        ]
      }
    ),
    d && /* @__PURE__ */ e(
      "div",
      {
        className: "absolute top-full left-0 mt-1 bg-white border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] py-1",
        children: n.map((u) => /* @__PURE__ */ o(
          "label",
          {
            "data-testid": `${s}-${u}`,
            className: "flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer text-text-primary hover:bg-[#f1f5f9]",
            children: [
              /* @__PURE__ */ e(
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
function da({
  query: t,
  statuses: n,
  triggerKinds: r,
  range: i,
  onQueryChange: a,
  onStatusToggle: s,
  onTriggerToggle: d,
  onRangeChange: c,
  onClearFilters: l
}) {
  const p = n.size > 0 || r.size > 0 || t.length > 0;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex items-center gap-2 px-3 py-2 bg-[#fafbfc] border border-border rounded-md",
      children: [
        /* @__PURE__ */ e(
          "input",
          {
            id: "runs-search",
            type: "search",
            "data-testid": "runs-search-input",
            placeholder: "Search…",
            value: t,
            onChange: (u) => a(u.target.value),
            className: "flex-[1_1_180px] max-w-[240px] px-2.5 py-[5px] text-xs border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
            "aria-label": "Search runs by run id or pipeline id"
          }
        ),
        /* @__PURE__ */ e("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ e("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: sa.map((u) => /* @__PURE__ */ e(
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
            children: Qu[u]
          },
          u
        )) }),
        /* @__PURE__ */ e("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ e(
          go,
          {
            label: "Status",
            options: aa,
            selected: n,
            onToggle: s,
            labels: Yu,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ e(
          go,
          {
            label: "Trigger",
            options: ia,
            selected: r,
            onToggle: d,
            labels: Xu,
            testIdPrefix: "runs-trigger-chip"
          }
        ),
        p && /* @__PURE__ */ e(
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
function Zu({
  selectionCount: t,
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
          t,
          " selected"
        ] }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            "data-testid": "runs-bulk-export",
            onClick: n,
            className: "px-2.5 py-1 text-xs font-medium border border-border bg-surface text-text-secondary rounded cursor-pointer font-[inherit]",
            children: "Export JSON"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            "data-testid": "runs-bulk-delete",
            onClick: r,
            className: "px-2.5 py-1 text-xs font-medium border border-[#dc2626] bg-surface text-[#dc2626] rounded cursor-pointer font-[inherit]",
            children: "Delete"
          }
        ),
        /* @__PURE__ */ e(
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
function pr(t) {
  switch (t) {
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
      return { label: t, tone: "neutral" };
  }
}
function em(t) {
  switch (t) {
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
const tm = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function nm(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function rm({
  filtered: t,
  selected: n,
  onSelectionChange: r,
  comparePair: i,
  onToggleComparePair: a,
  costByRunId: s,
  pipelineId: d,
  onNavigate: c,
  onOpenRetryModal: l
}) {
  const p = ce(!1), u = ce(null), m = t.length > 0 && t.every((f) => n.has(f.id)), h = !m && t.some((f) => n.has(f.id)), g = () => {
    const f = new Set(n);
    if (m)
      for (const v of t) f.delete(v.id);
    else
      for (const v of t) f.add(v.id);
    r(f);
  }, x = (f, v, N) => {
    const b = new Set(n), w = !b.has(f);
    if (N && u.current != null) {
      const y = Math.min(u.current, v), k = Math.max(u.current, v);
      for (let C = y; C <= k; C++) {
        const $ = t[C];
        $ && (w ? b.add($.id) : b.delete($.id));
      }
    } else w ? b.add(f) : b.delete(f);
    u.current = v, r(b);
  };
  return /* @__PURE__ */ o(
    "table",
    {
      className: "w-full border-collapse text-[13px] bg-surface border border-border rounded-lg overflow-hidden",
      children: [
        /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { className: "bg-[#fafbfc] text-left", children: [
          /* @__PURE__ */ e(
            "th",
            {
              scope: "col",
              className: "px-3 py-2 w-6 border-b border-border",
              children: /* @__PURE__ */ e(
                "input",
                {
                  type: "checkbox",
                  "data-testid": "runs-select-all",
                  "aria-label": "Select all visible runs",
                  checked: m,
                  ref: (f) => {
                    f && (f.indeterminate = h);
                  },
                  onChange: g
                }
              )
            }
          ),
          ["Started", "Status", "Duration", "Retries", "Cost", "Triggered by", "Run ID", ""].map((f, v) => /* @__PURE__ */ e(
            "th",
            {
              scope: "col",
              className: "px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
              children: f
            },
            `${f}-${v}`
          ))
        ] }) }),
        /* @__PURE__ */ e("tbody", { children: t.map((f, v) => {
          const { tone: N, label: b } = pr(f.status), w = n.has(f.id), y = Gu(f);
          return /* @__PURE__ */ o(
            "tr",
            {
              "data-testid": `run-card-${f.id}`,
              className: I(
                "border-b border-border cursor-pointer hover:bg-[#f1f5f9]",
                w && "bg-[#f1f5f9]"
              ),
              onClick: () => c(`/pipelines/${d}/runs/${f.id}`),
              children: [
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary w-6", onClick: (k) => k.stopPropagation(), children: [
                  /* @__PURE__ */ e(
                    "input",
                    {
                      type: "checkbox",
                      "data-testid": `run-select-${f.id}`,
                      checked: w,
                      onMouseDown: (k) => {
                        p.current = k.shiftKey;
                      },
                      onKeyDown: (k) => {
                        p.current = k.shiftKey;
                      },
                      onChange: () => {
                        const k = p.current;
                        p.current = !1, x(f.id, v, k);
                      },
                      "aria-label": `Select run ${f.id.slice(0, 8)}`
                    }
                  ),
                  /* @__PURE__ */ e(
                    "input",
                    {
                      type: "checkbox",
                      "data-testid": `run-compare-pick-${f.id}`,
                      checked: i.includes(f.id),
                      onChange: () => a(f.id),
                      "aria-label": `Pick run ${f.id.slice(0, 8)} for comparison`,
                      className: "absolute w-px h-px opacity-0 pointer-events-none",
                      tabIndex: -1
                    }
                  )
                ] }),
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: nm(f.startedAt) }),
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: [
                  /* @__PURE__ */ e(le, { tone: N, "aria-label": `Status: ${b}`, children: b }),
                  f.status === "running" && f.stuckAt && /* @__PURE__ */ e(
                    le,
                    {
                      tone: "warning",
                      size: "xs",
                      "data-testid": `run-stuck-badge-${f.id}`,
                      title: `No pipeline events since ${new Date(f.stuckAt).toLocaleTimeString()}`,
                      className: "ml-1.5",
                      children: "Stuck"
                    }
                  ),
                  f.status === "failed" && f.error?.errorCategory && /* @__PURE__ */ e(
                    le,
                    {
                      tone: em(f.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${f.id}`,
                      title: f.error.message,
                      className: "ml-1.5",
                      children: tm[f.error.errorCategory] ?? f.error.errorCategory
                    }
                  )
                ] }),
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: $e(f.durationMs) }),
                /* @__PURE__ */ e(
                  "td",
                  {
                    className: I(
                      "px-3 py-2.5 text-xs font-mono",
                      y > 0 ? "text-text-primary" : "text-text-tertiary"
                    ),
                    "data-testid": `run-retries-${f.id}`,
                    title: y > 0 ? `${y} retry attempts across this run` : "No retries — every step succeeded on first attempt",
                    children: y > 0 ? `×${y}` : "—"
                  }
                ),
                /* @__PURE__ */ e(
                  "td",
                  {
                    className: "px-3 py-2.5 text-xs text-text-secondary font-mono",
                    "data-testid": `run-cost-${f.id}`,
                    children: s[f.id] ?? "—"
                  }
                ),
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: f.triggeredBy.userId ?? f.triggeredBy.triggerType }),
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-[11px] font-mono text-text-tertiary", children: f.id.slice(0, 8) }),
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right", onClick: (k) => k.stopPropagation(), children: [
                  f.status === "running" && f.stuckAt && /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      "data-testid": `force-fail-${f.id}`,
                      onClick: async (k) => {
                        if (k.stopPropagation(), !!confirm(`Force-fail stuck run ${f.id.slice(0, 8)}? The run will be interrupted and you can retry from the stuck step.`))
                          try {
                            await Aa(f.pipelineId, f.id);
                          } catch (C) {
                            alert(`Force-fail failed: ${C instanceof Error ? C.message : String(C)}`);
                          }
                      },
                      title: "Force-fail this stuck run so you can retry from the stuck step",
                      className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-[#b45309] border border-[#fde68a] rounded cursor-pointer font-[inherit]",
                      children: "⚡ Force-fail"
                    }
                  ),
                  f.status === "failed" && f.error?.nodeId && f.error.nodeId !== "unknown" && /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      "data-testid": `retry-from-failed-step-${f.id}`,
                      onClick: (k) => {
                        k.stopPropagation(), l(f);
                      },
                      title: `Retry from "${f.error.nodeId}" with the original upstream context`,
                      className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-[#ea580c] border border-[#fed7aa] rounded cursor-pointer font-[inherit]",
                      children: "↻ Retry from failed"
                    }
                  ),
                  /* @__PURE__ */ e("span", { className: "text-xs text-primary", children: "View →" })
                ] })
              ]
            },
            f.id
          );
        }) })
      ]
    }
  );
}
function lf() {
  const { pipelineId: t } = vt(), n = ze(), [r, i] = pn(), [a, s] = S([]), [d, c] = S(null), [l, p] = S([]), [u, m] = S(() => /* @__PURE__ */ new Set()), [h, g] = S(null), [x, f] = S(!1), [v, N] = S(null), [b, w] = S(!1), y = O((_) => {
    const W = _.error?.nodeId;
    if (!W || W === "unknown") return;
    const V = Object.entries(_.steps).filter(([Y, me]) => Y !== W && me.status === "completed").map(([Y]) => Y);
    g({ run: _, nodeId: W, skippedNodes: V, snapshotInput: !1 }), N(null);
  }, []), k = O(async () => {
    if (h) {
      N(null), f(!0);
      try {
        const _ = await Fo(
          h.run.pipelineId,
          h.run.id,
          h.nodeId,
          void 0,
          h.snapshotInput || void 0
        );
        g(null), n(`/pipelines/${h.run.pipelineId}/runs/${_.newRunId}`);
      } catch (_) {
        N(_ instanceof Error ? _.message : String(_)), f(!1);
      }
    }
  }, [h, n]), { query: C, statuses: $, triggerKinds: D, range: A } = q(
    () => ca(r),
    [r]
  ), M = (_, W) => {
    const V = new URLSearchParams(r);
    W ? V.set(_, W) : V.delete(_), i(V, { replace: !0 });
  }, ne = (_) => {
    const W = new Set($);
    W.has(_) ? W.delete(_) : W.add(_), M("status", W.size === 0 ? null : Array.from(W).join(","));
  }, R = (_) => {
    const W = new Set(D);
    W.has(_) ? W.delete(_) : W.add(_), M("trigger", W.size === 0 ? null : Array.from(W).join(","));
  }, H = (_) => {
    M("range", _ === "7d" ? null : _);
  }, X = (_) => {
    M("q", _.length === 0 ? null : _);
  }, J = (_) => {
    p((W) => W.includes(_) ? W.filter((V) => V !== _) : W.length >= 2 ? [W[1], _] : [...W, _]);
  };
  re(() => {
    t && (c(lt(t)), s(an(t)));
  }, [t]);
  const Q = q(
    () => la(a, { query: C, statuses: $, triggerKinds: D, range: A }),
    [a, C, $, D, A]
  ), E = q(() => {
    const _ = /* @__PURE__ */ new Map();
    if (!d) return _;
    for (const W of d.nodes)
      W.data.type === "llm" && _.set(W.id, W.data.model);
    return _;
  }, [d]), P = q(() => {
    const _ = {};
    for (const W of Q) {
      const V = Object.values(W.steps).filter((Y) => !!Y.llm).map((Y) => ({
        model: E.get(Y.nodeId),
        tokensIn: Y.llm?.tokensIn ?? 0,
        tokensOut: Y.llm?.tokensOut ?? 0
      }));
      _[W.id] = Ht(Ct(V).total);
    }
    return _;
  }, [Q, E]), G = () => {
    if (!t) return;
    w(!1);
    const _ = Array.from(u), W = a.filter((V) => !u.has(V.id));
    Uo(t);
    for (const V of [...W].sort((Y, me) => Y.startedAt.localeCompare(me.startedAt)))
      Ma(t, V);
    s(an(t)), m(/* @__PURE__ */ new Set()), p((V) => V.filter((Y) => !_.includes(Y)));
  }, j = () => {
    const _ = a.filter((z) => u.has(z.id));
    if (_.length === 0) return;
    const W = new Blob([JSON.stringify(_, null, 2)], { type: "application/json" }), V = URL.createObjectURL(W), Y = document.createElement("a"), me = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    Y.href = V, Y.download = `pipeline-runs-${me}.json`, document.body.appendChild(Y), Y.click(), document.body.removeChild(Y), URL.revokeObjectURL(V);
  };
  return t ? d ? /* @__PURE__ */ o("div", { "data-testid": "pipeline-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e(
      ln,
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
            /* @__PURE__ */ e("code", { className: "bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs", children: h.run.id.slice(0, 8) }),
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
            /* @__PURE__ */ e("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: h.skippedNodes.map((_) => /* @__PURE__ */ e("span", { className: "bg-[#fafbfc] border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary", children: _.slice(0, 10) }, _)) })
          ] }),
          /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
            /* @__PURE__ */ e("input", { type: "checkbox", checked: h.snapshotInput, onChange: (_) => g((W) => W && { ...W, snapshotInput: _.target.checked }), className: "accent-primary" }),
            "Use persisted input snapshot"
          ] }),
          v && /* @__PURE__ */ e("div", { "data-testid": "retry-modal-error", className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: v })
        ] })
      }
    ),
    /* @__PURE__ */ e(
      ln,
      {
        open: b,
        onConfirm: G,
        onCancel: () => w(!1),
        title: `Delete ${u.size} run${u.size === 1 ? "" : "s"}?`,
        body: "This cannot be undone.",
        confirmLabel: `Delete ${u.size}`,
        tone: "destructive"
      }
    ),
    v && /* @__PURE__ */ e(nt, { title: "Retry failed:", onDismiss: () => N(null), children: v }),
    /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => n(`/pipelines/${t}`),
          className: "bg-none border-none text-primary cursor-pointer text-[13px] p-0",
          children: [
            "← ",
            d.name
          ]
        }
      ),
      /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "/" }),
      /* @__PURE__ */ e("span", { className: "text-lg font-bold text-text-primary", children: "Run history" }),
      /* @__PURE__ */ o("span", { className: "text-xs text-text-tertiary ml-auto", children: [
        a.length,
        " run",
        a.length === 1 ? "" : "s",
        " persisted"
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => n(`/pipelines/${t}/stats`),
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
            const [_, W] = l;
            n(`/pipelines/${t}/runs/compare/${_}/${W}`);
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
    /* @__PURE__ */ e(
      da,
      {
        query: C,
        statuses: $,
        triggerKinds: D,
        range: A,
        onQueryChange: X,
        onStatusToggle: ne,
        onTriggerToggle: R,
        onRangeChange: H,
        onClearFilters: () => {
          X(""), M("status", null), M("trigger", null);
        }
      }
    ),
    u.size > 0 && /* @__PURE__ */ e(
      Zu,
      {
        selectionCount: u.size,
        onExport: j,
        onDelete: () => {
          u.size > 0 && t && w(!0);
        },
        onClear: () => m(/* @__PURE__ */ new Set())
      }
    ),
    Q.length === 0 ? /* @__PURE__ */ e(
      je,
      {
        icon: "📜",
        title: a.length === 0 ? "No runs yet" : "No runs match these filters",
        body: a.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
      }
    ) : /* @__PURE__ */ e(
      rm,
      {
        filtered: Q,
        selected: u,
        onSelectionChange: m,
        comparePair: l,
        onToggleComparePair: J,
        costByRunId: P,
        pipelineId: t,
        onNavigate: n,
        onOpenRetryModal: y
      }
    )
  ] }) : /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
    je,
    {
      icon: "🔍",
      title: "Pipeline not found",
      body: "It may have been deleted. Go back to the pipelines list.",
      actionLabel: "Back to pipelines",
      onAction: () => n("/pipelines")
    }
  ) }) : /* @__PURE__ */ e(Nt, { to: "/pipelines", replace: !0 });
}
function om(t) {
  return q(() => {
    if (!t) return null;
    const n = lt(t.pipelineId);
    if (!n) return null;
    const r = /* @__PURE__ */ new Map();
    for (const a of n.nodes)
      a.data.type === "llm" && r.set(a.id, a.data.model);
    const i = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
      model: r.get(a.nodeId),
      tokensIn: a.llm?.tokensIn ?? 0,
      tokensOut: a.llm?.tokensOut ?? 0
    }));
    return Ct(i).total;
  }, [t]);
}
function tt({ title: t, children: n }) {
  return /* @__PURE__ */ o("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ e("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: t }),
    n
  ] });
}
const xo = "m-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", bo = "px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", jn = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", Oe = "px-2 py-[5px] text-[11px] text-text-secondary align-top", am = {
  "#2563eb": "bg-info/10 text-info-fg",
  "#7c3aed": "bg-accent/10 text-accent-fg",
  "#16a34a": "bg-success/10 text-success-fg",
  "#dc2626": "bg-danger/10 text-danger-fg"
};
function Et(t) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${am[t] ?? ""}`.trimEnd();
}
const im = {
  completed: "#16a34a",
  failed: "#dc2626",
  running: "#2563eb"
};
function sm({ stepId: t, step: n, index: r, nodeType: i, nodeConfig: a, onRetryFromStep: s, onResumeFromStep: d }) {
  const [c, l] = S(!1), p = n.output, u = p?.response, m = n.llm, h = n.input, g = im[n.status] ?? "#94a3b8";
  return /* @__PURE__ */ o("div", { className: "relative pl-9 mb-1", children: [
    /* @__PURE__ */ e(
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
          /* @__PURE__ */ e(
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
          /* @__PURE__ */ e(
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
          /* @__PURE__ */ e("span", { className: "text-[11px] font-mono text-text-tertiary", children: t.slice(0, 8) }),
          n.durationMs != null && /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary ml-auto", children: n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` }),
          m && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
            m.tokensIn + m.tokensOut,
            " tok"
          ] }),
          p?.tokensIn != null && !m && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
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
          /* @__PURE__ */ e(tt, { title: "Execution Timeline", children: /* @__PURE__ */ o("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ e("th", { scope: "col", className: jn, children: "Event" }),
              /* @__PURE__ */ e("th", { scope: "col", className: jn, children: "Time" }),
              /* @__PURE__ */ e("th", { scope: "col", className: jn, children: "Detail" })
            ] }) }),
            /* @__PURE__ */ o("tbody", { children: [
              n.startedAt && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Oe, children: /* @__PURE__ */ e("span", { className: Et("#2563eb"), children: "started" }) }),
                /* @__PURE__ */ e("td", { className: Oe, children: new Date(n.startedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Oe, children: [
                  "Node ",
                  t.slice(0, 8),
                  " (",
                  i,
                  ") began execution"
                ] })
              ] }),
              m?.streamOpened && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Oe, children: /* @__PURE__ */ e("span", { className: Et("#7c3aed"), children: "stream.opened" }) }),
                /* @__PURE__ */ e("td", { className: Oe, children: "—" }),
                /* @__PURE__ */ e("td", { className: Oe, children: "LLM stream connection established" })
              ] }),
              m?.firstTokenLatencyMs != null && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Oe, children: /* @__PURE__ */ e("span", { className: Et("#7c3aed"), children: "first.token" }) }),
                /* @__PURE__ */ o("td", { className: Oe, children: [
                  "+",
                  m.firstTokenLatencyMs,
                  "ms"
                ] }),
                /* @__PURE__ */ e("td", { className: Oe, children: "First token received from LLM" })
              ] }),
              n.completedAt && n.status === "completed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Oe, children: /* @__PURE__ */ e("span", { className: Et("#16a34a"), children: "completed" }) }),
                /* @__PURE__ */ e("td", { className: Oe, children: new Date(n.completedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Oe, children: [
                  "Finished in ",
                  n.durationMs != null ? n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` : "—"
                ] })
              ] }),
              n.status === "failed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Oe, children: /* @__PURE__ */ e("span", { className: Et("#dc2626"), children: "failed" }) }),
                /* @__PURE__ */ e("td", { className: Oe, children: n.completedAt ? new Date(n.completedAt).toLocaleTimeString() : "—" }),
                /* @__PURE__ */ e("td", { className: Oe, children: n.error ?? "Unknown error" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ e(tt, { title: "Node Configuration", children: a && Object.keys(a).length > 1 ? /* @__PURE__ */ e("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(a).filter(([x]) => x !== "type").map(([x, f]) => /* @__PURE__ */ o(Do.Fragment, { children: [
            /* @__PURE__ */ e("span", { className: "text-text-tertiary font-medium", children: x }),
            /* @__PURE__ */ e(
              "span",
              {
                className: I(
                  "text-text-secondary break-words",
                  typeof f == "string" && f.length > 60 ? "whitespace-pre-wrap font-sans" : "whitespace-nowrap font-mono"
                ),
                children: typeof f == "string" ? f : JSON.stringify(f)
              }
            )
          ] }, x)) }) : /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary italic", children: "No configuration" }) }),
          h && Object.keys(h).length > 0 && /* @__PURE__ */ e(tt, { title: "Runtime Input", children: /* @__PURE__ */ e("pre", { className: xo, children: JSON.stringify(h, null, 2) }) }),
          m?.prompt && /* @__PURE__ */ e(tt, { title: "Resolved Prompt", children: /* @__PURE__ */ e("div", { className: bo, children: m.prompt }) }),
          u || m?.response ? /* @__PURE__ */ e(tt, { title: "Response", children: /* @__PURE__ */ e("div", { className: bo, children: u ?? m?.response }) }) : /* @__PURE__ */ e(tt, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ e("pre", { className: xo, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
          (m || p?.tokensIn != null) && /* @__PURE__ */ e(tt, { title: "Token Usage", children: /* @__PURE__ */ o("div", { className: "flex gap-5 flex-wrap text-xs text-text-secondary", children: [
            /* @__PURE__ */ o("span", { children: [
              "Tokens in: ",
              /* @__PURE__ */ e("strong", { children: String(m?.tokensIn ?? p?.tokensIn ?? "—") })
            ] }),
            /* @__PURE__ */ o("span", { children: [
              "Tokens out: ",
              /* @__PURE__ */ e("strong", { children: String(m?.tokensOut ?? p?.tokensOut ?? "—") })
            ] }),
            m?.firstTokenLatencyMs != null && /* @__PURE__ */ o("span", { children: [
              "First token: ",
              /* @__PURE__ */ o("strong", { children: [
                m.firstTokenLatencyMs,
                "ms"
              ] })
            ] })
          ] }) }),
          n.error && /* @__PURE__ */ e(tt, { title: "Error", children: /* @__PURE__ */ e("div", { className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap", children: n.error }) }),
          (s || d) && /* @__PURE__ */ o("div", { className: "px-4 py-2.5 border-t border-border flex justify-end gap-2", children: [
            d && /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                "data-testid": `resume-from-step-${t}`,
                onClick: (x) => {
                  x.stopPropagation(), d(t);
                },
                title: "Resume the same run from this step (preserves accumulated context)",
                className: "px-3 py-[5px] text-xs font-medium border border-primary bg-primary text-white rounded cursor-pointer font-[inherit]",
                children: "↻ Resume from here"
              }
            ),
            s && /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                "data-testid": `retry-from-step-${t}`,
                onClick: (x) => {
                  x.stopPropagation(), s(t);
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
function lm({ steps: t, nodeDataMap: n, edges: r, onRetryFromStep: i, onResumeFromStep: a }) {
  const s = q(() => {
    const l = Object.entries(t).sort(([, y], [, k]) => {
      const C = y.completedAt ? Date.parse(y.completedAt) - (y.durationMs ?? 0) : 0, $ = k.completedAt ? Date.parse(k.completedAt) - (k.durationMs ?? 0) : 0;
      return C - $;
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
    }, u = /* @__PURE__ */ new Set(["fork", "condition", "approval"]), m = /* @__PURE__ */ new Set();
    for (const [y] of l) {
      const k = p(y), C = n[k]?.type;
      C && u.has(C) && m.add(k);
    }
    const h = (y) => y.startsWith("branch-") || y === "true" || y === "false" || y === "approved" || y === "rejected", g = [];
    for (const y of r)
      m.has(y.source) && h(y.sourceHandle) && g.push({ forkId: y.source, branch: y.sourceHandle, targetNodeId: y.target });
    const x = /* @__PURE__ */ new Map();
    for (const y of r)
      x.has(y.source) || x.set(y.source, []), x.get(y.source).push({ target: y.target, handle: y.sourceHandle });
    const f = /* @__PURE__ */ new Set();
    function v(y) {
      const k = [];
      let C = y;
      for (; C; ) {
        const $ = l.find(([H]) => p(H) === C && !f.has(H));
        if (!$) break;
        const [D, A] = $;
        f.add(D);
        const M = { stepId: D, step: A, children: [] }, ne = p(D);
        if (m.has(ne)) {
          const H = g.filter((X) => X.forkId === ne);
          for (const { branch: X, targetNodeId: J } of H) {
            const Q = v(J);
            for (const E of Q)
              E.branch = E.branch ?? X;
            Q.length > 0 && (Q[0].branch = X, M.children.push(...Q));
          }
        }
        k.push(M);
        const R = x.get(ne)?.filter((H) => H.handle === "out");
        C = R && R.length === 1 ? R[0].target : null;
      }
      return k;
    }
    const N = /* @__PURE__ */ new Set();
    for (const y of r)
      N.add(y.target);
    const b = l.find(([y]) => !N.has(p(y)))?.[1] ? l.find(([y]) => !N.has(p(y)))[0] : l[0]?.[0];
    let w = [];
    b && (w = v(p(b)));
    for (const [y, k] of l)
      f.has(y) || w.push({ stepId: y, step: k, children: [] });
    return w;
  }, [t, n, r]), d = (l) => {
    if (n[l]) return n[l];
    const p = l.lastIndexOf(":");
    if (p > 0 && /^\d+$/.test(l.slice(p + 1)))
      return n[l.slice(0, p)];
  };
  function c(l, p) {
    let u = p;
    return l.map((m) => {
      const h = u++, g = /* @__PURE__ */ new Map();
      for (const x of m.children) {
        const f = x.branch ?? "default";
        g.has(f) || g.set(f, []), g.get(f).push(x);
      }
      return /* @__PURE__ */ o(Do.Fragment, { children: [
        /* @__PURE__ */ e(
          sm,
          {
            stepId: m.stepId,
            step: m.step,
            index: h,
            nodeType: d(m.stepId)?.type ?? "unknown",
            nodeConfig: d(m.stepId)?.data,
            onRetryFromStep: i,
            onResumeFromStep: a
          }
        ),
        m.children.length > 0 && /* @__PURE__ */ e("div", { className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1", children: Array.from(g.entries()).map(([x, f], v) => /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("div", { className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${v === 0 ? "mt-1" : "mt-2"}`, children: x.replace("-", " ") }),
          c(f, u)
        ] }, x)) })
      ] }, m.stepId);
    });
  }
  return /* @__PURE__ */ o("div", { className: "relative", children: [
    /* @__PURE__ */ e("div", { className: "absolute left-[15px] top-6 bottom-6 w-0.5 bg-border rounded-sm" }),
    c(s, 0)
  ] });
}
const cm = 5e3, dm = "synthetic-";
function pm(t) {
  switch (t) {
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
function er(t, n) {
  return n.timestamp.localeCompare(t.timestamp);
}
function um(t, n) {
  if (n.length === 0) return t.slice().sort(er);
  const r = new Set(t.map((s) => s.auditId)), i = /* @__PURE__ */ new Map();
  for (const s of t) {
    const d = i.get(s.action);
    (!d || s.timestamp > d) && i.set(s.action, s.timestamp);
  }
  const a = n.filter((s) => {
    if (r.has(s.auditId)) return !1;
    const d = i.get(s.action);
    return !d || s.timestamp >= d;
  });
  return [...t, ...a].sort(er);
}
function mm(t, n, r = {}) {
  const { pollMs: i = cm, filters: a } = r, s = Ga(), [d, c] = S([]), [l, p] = S([]), [u, m] = S(!0), [h, g] = S(null), [x, f] = S(void 0), [v, N] = S(0), [b, w] = S(!1), y = JSON.stringify({
    since: a?.since,
    until: a?.until,
    actions: a?.actions,
    limit: a?.limit
  });
  re(() => {
    if (!t || !n) return;
    let A = !1;
    return m(!0), g(null), (async () => {
      try {
        const M = await fr(t, n, a ?? {});
        if (A) return;
        c(M.items), f(M.nextCursor), m(!1);
      } catch (M) {
        if (A) return;
        g(M instanceof Error ? M.message : String(M)), m(!1);
      }
    })(), () => {
      A = !0;
    };
  }, [t, n, y, v]), re(() => {
    if (!t || !n || i <= 0) return;
    const A = window.setInterval(() => {
      N((M) => M + 1);
    }, i);
    return () => window.clearInterval(A);
  }, [t, n, i]), re(() => {
    if (!t || !n) return;
    const A = [], M = (R, H) => {
      const X = pm(R);
      if (!X) return;
      const J = H;
      if (J.runId !== n) return;
      w(!0);
      const Q = {
        auditId: `${dm}${R}-${J.stepId ?? "run"}-${Date.now()}`,
        timestamp: J.at ?? (/* @__PURE__ */ new Date()).toISOString(),
        action: X,
        actorUserId: "executor",
        pipelineId: t,
        runId: n,
        trace: H
      };
      p((E) => [Q, ...E]);
    }, ne = [
      "pipeline.step.started",
      "pipeline.step.completed",
      "pipeline.step.failed",
      "pipeline.step.breakpoint",
      "pipeline.run.completed",
      "pipeline.run.failed",
      "pipeline.run.resumed-from-step",
      "pipeline.approval.recorded"
    ];
    for (const R of ne)
      A.push(s.subscribe(R, (H) => M(R, H)));
    return A.push(s.subscribeToRun(n)), () => {
      for (const R of A) R();
    };
  }, [s, t, n]), re(() => {
    d.length !== 0 && p((A) => {
      if (A.length === 0) return A;
      const M = /* @__PURE__ */ new Map();
      for (const ne of d) {
        const R = M.get(ne.action);
        (!R || ne.timestamp > R) && M.set(ne.action, ne.timestamp);
      }
      return A.filter((ne) => {
        const R = M.get(ne.action);
        return !R || ne.timestamp >= R;
      });
    });
  }, [d]);
  const k = ce(!1), C = O(() => {
    !t || !n || !x || k.current || (k.current = !0, (async () => {
      try {
        const A = await fr(t, n, {
          ...a ?? {},
          cursor: x
        });
        c((M) => {
          const ne = new Set(M.map((H) => H.auditId)), R = M.concat(A.items.filter((H) => !ne.has(H.auditId)));
          return R.sort(er), R;
        }), f(A.nextCursor);
      } catch (A) {
        g(A instanceof Error ? A.message : String(A));
      } finally {
        k.current = !1;
      }
    })());
  }, [t, n, x, y]), $ = O(() => {
    N((A) => A + 1);
  }, []);
  return {
    items: q(() => um(d, l), [d, l]),
    loading: u,
    error: h,
    hasMore: !!x,
    loadMore: C,
    liveHealthy: b,
    refresh: $
  };
}
const hm = "#3b82f6", fm = "#eab308", gm = "#f97316", yo = "#64748b", xm = "#ef4444", bm = "#a855f7";
function ym(t) {
  return t.action === "pipeline.step.failed" || t.outcome === "error" ? xm : t.action === "pipeline.run.resumed-from-step" || t.action.startsWith("pipeline.step.context.patched") ? bm : t.action.startsWith("pipeline.approval.") ? fm : t.action.startsWith("pipeline.breakpoint.") ? gm : t.action.startsWith("pipeline.step.") ? hm : (t.action.startsWith("pipeline.run."), yo);
}
const vm = {
  "1h": "Last 1h",
  "24h": "Last 24h",
  all: "All"
}, vo = [
  { label: "Steps", matches: (t) => t.startsWith("pipeline.step.") },
  { label: "Approvals", matches: (t) => t.startsWith("pipeline.approval.") || t === "pipeline.approve" || t === "pipeline.reject" },
  { label: "Breakpoints", matches: (t) => t.startsWith("pipeline.breakpoint.") || t === "pipeline.step.breakpoint.hit" },
  { label: "Run lifecycle", matches: (t) => t.startsWith("pipeline.run.") || t === "pipeline.trigger" || t === "pipeline.cancel" },
  { label: "Errors", matches: (t) => t === "pipeline.step.failed" || t === "pipeline.run.failed" || t === "pipeline.force_fail" }
];
function Nm(t) {
  if (t === "all") return null;
  const n = Date.now();
  return t === "1h" ? n - 3600 * 1e3 : n - 1440 * 60 * 1e3;
}
function No(t) {
  const n = t.details, r = t.trace, i = n && typeof n.stepId == "string" ? n.stepId : void 0, a = r && typeof r.stepId == "string" ? r.stepId : void 0, s = r && typeof r.nodeId == "string" ? r.nodeId : void 0;
  return i ?? a ?? s;
}
function wm(t, n = Date.now()) {
  const r = Date.parse(t);
  if (!Number.isFinite(r)) return t;
  const i = Math.max(0, Math.floor((n - r) / 1e3));
  if (i < 5) return "just now";
  if (i < 60) return `${i}s ago`;
  const a = Math.floor(i / 60);
  if (a < 60) return `${a}m ago`;
  const s = Math.floor(a / 60);
  return s < 24 ? `${s}h ago` : `${Math.floor(s / 24)}d ago`;
}
function km({
  pipelineId: t,
  runId: n,
  onStepClick: r
}) {
  const i = mm(t, n), { items: a, error: s, hasMore: d, loadMore: c, loading: l } = i, [p, u] = S(/* @__PURE__ */ new Set()), [m, h] = S(""), [g, x] = S("all"), [f, v] = S(/* @__PURE__ */ new Set()), N = O((C) => {
    u(($) => {
      const D = new Set($);
      return D.has(C) ? D.delete(C) : D.add(C), D;
    });
  }, []), b = O((C) => {
    v(($) => {
      const D = new Set($);
      return D.has(C) ? D.delete(C) : D.add(C), D;
    });
  }, []), w = q(() => {
    const C = Nm(g), $ = m.trim().toLowerCase(), D = vo.filter((A) => p.has(A.label));
    return a.filter((A) => {
      if (D.length > 0 && !D.some((M) => M.matches(A.action)) || $ && !A.actorUserId.toLowerCase().includes($)) return !1;
      if (C !== null) {
        const M = Date.parse(A.timestamp);
        if (!Number.isFinite(M) || M < C) return !1;
      }
      return !0;
    });
  }, [a, p, m, g]), y = O(() => {
    if (typeof window > "u") return;
    const C = w.map((M) => JSON.stringify(M)).join(`
`) + (w.length > 0 ? `
` : ""), $ = new Blob([C], { type: "application/x-ndjson" }), D = URL.createObjectURL($), A = document.createElement("a");
    A.href = D, A.download = `executor-log-${n}.ndjson`, document.body.appendChild(A), A.click(), document.body.removeChild(A), URL.revokeObjectURL(D);
  }, [w, n]), k = O(
    (C) => {
      if (b(C.auditId), !r || !C.action.startsWith("pipeline.step.")) return;
      const $ = No(C);
      $ && r($);
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
                /* @__PURE__ */ e(
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
          /* @__PURE__ */ e("span", { className: "text-border", children: "|" }),
          vo.map((C) => {
            const $ = p.has(C.label);
            return /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  $ ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => N(C.label),
                "data-testid": `executor-log-chip-${C.label.toLowerCase().replace(/\s+/g, "-")}`,
                "aria-pressed": $,
                children: C.label
              },
              C.label
            );
          }),
          /* @__PURE__ */ e("span", { className: "text-border", children: "|" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: m,
              onChange: (C) => h(C.target.value),
              placeholder: "Actor",
              className: "font-[inherit] text-xs px-2 py-1 border border-border-field rounded bg-surface text-text-primary min-w-[120px]",
              "data-testid": "executor-log-actor-input",
              "aria-label": "Filter by actor"
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-border", children: "|" }),
          ["1h", "24h", "all"].map((C) => {
            const $ = g === C;
            return /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  $ ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => x(C),
                "data-testid": `executor-log-time-${C}`,
                "aria-pressed": $,
                children: vm[C]
              },
              C
            );
          }),
          /* @__PURE__ */ e("div", { className: "flex-1" }),
          /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", children: [
            w.length,
            " of ",
            a.length,
            " shown"
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto px-4 py-3 relative", "data-testid": "executor-log-timeline", children: [
          l && a.length === 0 && /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary p-3", children: "Loading audit rows…" }),
          !l && a.length === 0 && /* @__PURE__ */ e(
            "div",
            {
              className: "px-3 py-6 text-[13px] text-text-secondary text-center leading-relaxed",
              "data-testid": "executor-log-empty",
              children: "Audit log started recording on 2026-05-07 (hub#2224). This run predates that — no rows captured."
            }
          ),
          w.length === 0 && a.length > 0 && /* @__PURE__ */ e(
            "div",
            {
              className: "px-3 py-5 text-xs text-text-tertiary text-center",
              "data-testid": "executor-log-no-matches",
              children: "No audit rows match the current filters."
            }
          ),
          w.map((C) => {
            const $ = f.has(C.auditId), A = C.action.startsWith("pipeline.step.") ? No(C) : void 0;
            return /* @__PURE__ */ o(
              "div",
              {
                className: "grid grid-cols-[14px_auto_auto_1fr] items-baseline gap-2.5 py-1.5 text-xs border-b border-[#fafbfc] cursor-pointer",
                onClick: () => k(C),
                "data-testid": "executor-log-row",
                "data-action": C.action,
                "data-audit-id": C.auditId,
                children: [
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "w-2.5 h-2.5 rounded-full shrink-0 self-center",
                      style: { background: ym(C) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: C.timestamp,
                      children: wm(C.timestamp)
                    }
                  ),
                  /* @__PURE__ */ e("span", { className: "text-text-secondary text-[11px] whitespace-nowrap", children: C.actorUserId }),
                  /* @__PURE__ */ o("span", { className: "text-text-primary flex items-baseline gap-1.5 flex-wrap", children: [
                    /* @__PURE__ */ e("code", { className: "font-mono text-[11px] bg-[#fafbfc] px-1.5 py-px rounded-[3px]", children: C.action }),
                    A && /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", "data-testid": "executor-log-stepid", children: [
                      "· ",
                      A.slice(0, 14),
                      A.length > 14 ? "…" : ""
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
                  $ && C.trace && /* @__PURE__ */ e(
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
          d ? /* @__PURE__ */ e("span", { "data-testid": "executor-log-load-more", children: /* @__PURE__ */ e(
            Me,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => c(),
              children: "Load more"
            }
          ) }) : /* @__PURE__ */ e("span", {}),
          /* @__PURE__ */ e("span", { "data-testid": "executor-log-download", children: /* @__PURE__ */ e(
            Me,
            {
              variant: "secondary",
              size: "sm",
              onClick: y,
              disabled: w.length === 0,
              children: "Download log"
            }
          ) })
        ] })
      ]
    }
  );
}
function cf() {
  const { pipelineId: t, runId: n } = vt();
  return !t || !n ? /* @__PURE__ */ e(Nt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(Bo, { pipelineId: t, children: /* @__PURE__ */ e(Da, { children: /* @__PURE__ */ e(Cm, { pipelineId: t, runId: n }) }) });
}
function Cm({ pipelineId: t, runId: n }) {
  const r = ze(), i = qe(), a = wt(), { definition: s } = i, [d, c] = S(null);
  re(() => {
    let z = !1;
    return import("./usePendingApprovals-Dqy8id86.js").then((de) => de.a2).then(({ getPipelineRun: de }) => {
      de(t, n).then((we) => {
        !z && we && c(we);
      });
    }), () => {
      z = !0;
    };
  }, [t, n]);
  const l = q(() => {
    const z = a.runs[n], de = d;
    if (!z && !de) return;
    if (!z) return de ?? void 0;
    if (!de) return z;
    const we = Object.keys(z.steps).length, Ue = Object.keys(de.steps).length;
    return we >= Ue ? z : { ...de, status: z.status, currentStepIds: z.currentStepIds };
  }, [a.runs, n, d]);
  Oa(n);
  const p = om(l ?? null), u = q(() => {
    const z = {};
    if (!s) return z;
    for (const de of s.nodes)
      z[de.id] = { type: de.data.type, data: de.data };
    return z;
  }, [s]), [m, h] = S(!1), g = ce(null);
  yt(g, () => h(!1), m);
  const [x, f] = S("steps"), [v, N] = S(null), b = O((z) => {
    N(z), f("steps");
  }, []), [w, y] = S(null), [k, C] = S(null), [$, D] = S(!1), A = l?.status === "failed" ? l.error?.nodeId : void 0, M = O((z) => {
    if (!l) return;
    const de = Object.entries(l.steps).filter(([we, Ue]) => we !== z && Ue.status === "completed").map(([we]) => we);
    y({ nodeId: z, skippedNodes: de, snapshotInput: !1 }), C(null);
  }, [l]), ne = O(async () => {
    if (!(!w || !l)) {
      C(null), D(!0);
      try {
        const z = await Fo(
          t,
          l.id,
          w.nodeId,
          void 0,
          w.snapshotInput || void 0
        );
        y(null), r(`/pipelines/${t}/runs/${z.newRunId}`);
      } catch (z) {
        C(z instanceof Error ? z.message : String(z)), D(!1);
      }
    }
  }, [w, l, t, r]), [R, H] = S(null), [X, J] = S(null), [Q, E] = S(null), P = O(async (z) => {
    if (l) {
      J(null), H(z);
      try {
        const de = await Ea(t, l.id, z);
        E(
          `Resumed from ${z.slice(0, 10)}${z.length > 10 ? "…" : ""} (replay #${de.replayAttempts})`
        ), setTimeout(() => E(null), 4e3), r(`/pipelines/${t}/runs/${l.id}`);
      } catch (de) {
        J(de instanceof Error ? de.message : String(de));
      } finally {
        H(null);
      }
    }
  }, [l, t, r]), G = O(async () => {
    if (!l) {
      try {
        const z = await a.triggerRun(t);
        r(`/pipelines/${t}/runs/${z}`);
      } catch (z) {
        console.error("[PipelineRunReplay] re-run failed", z);
      }
      return;
    }
    try {
      const z = await a.triggerRun(
        t,
        l.triggeredBy.payload
      );
      r(`/pipelines/${t}/runs/${z}`);
    } catch (z) {
      console.error("[PipelineRunReplay] re-run failed", z);
    }
  }, [l, a, t, r]), j = async () => {
    h(!1);
    try {
      await navigator.clipboard?.writeText(n);
    } catch {
    }
  }, _ = () => {
    if (h(!1), !l) return;
    const z = JSON.stringify(l, null, 2);
    Ft(`run-${n}.json`, z);
  }, W = () => {
    if (h(!1), !s) return;
    const z = or(
      s.id,
      `${s.name} (from run)`
    );
    z && r(`/pipelines/${z.id}`);
  };
  if (!l)
    return /* @__PURE__ */ o(
      "div",
      {
        className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
        "data-testid": "pipeline-replay-missing",
        children: [
          /* @__PURE__ */ o("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
            /* @__PURE__ */ e(
              gt,
              {
                onClick: () => r(`/pipelines/${t}`),
                "aria-label": "Back to pipeline",
                title: "Back to pipeline",
                children: "←"
              }
            ),
            /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: s?.name ?? "Pipeline" })
          ] }),
          /* @__PURE__ */ o("div", { className: "flex-1 flex flex-col items-center justify-center gap-3.5 p-8 text-center", children: [
            /* @__PURE__ */ e("div", { className: "text-sm text-text-secondary", children: "Run not available — it may have been trimmed from history." }),
            /* @__PURE__ */ e(
              Me,
              {
                onClick: () => r(`/pipelines/${t}`),
                children: "Back to pipeline"
              }
            )
          ] })
        ]
      }
    );
  const V = pr(l.status), Y = l.triggeredBy.userId ?? l.triggeredBy.triggerType, me = Ht(p);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
      "data-testid": "pipeline-replay",
      children: [
        /* @__PURE__ */ o("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
          /* @__PURE__ */ e(
            gt,
            {
              onClick: () => r(`/pipelines/${t}`),
              "aria-label": "Back to pipeline",
              title: "Back to pipeline",
              children: "←"
            }
          ),
          /* @__PURE__ */ e(
            "div",
            {
              className: "text-[13px] font-bold text-text-primary max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap",
              title: s?.name ?? t,
              children: s?.name ?? t
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs", children: "·" }),
          /* @__PURE__ */ o(
            "div",
            {
              className: "text-xs text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
              "data-testid": "replay-subtitle",
              children: [
                "Run from ",
                bt(l.startedAt),
                " by ",
                Y
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
          /* @__PURE__ */ e(le, { tone: V.tone, "aria-label": `Status: ${V.label}`, children: V.label }),
          l.status === "failed" && l.error?.errorCategory ? /* @__PURE__ */ e(
            le,
            {
              tone: "danger",
              title: l.error.message || "Error details unavailable",
              children: l.error.errorCategory
            }
          ) : null,
          /* @__PURE__ */ e("div", { className: "flex-1" }),
          A && /* @__PURE__ */ e(
            Me,
            {
              onClick: () => M(A),
              disabled: $,
              "data-testid": "retry-from-failed-step-button",
              title: `Retry from "${A}" with the original upstream context`,
              children: "↻ Retry from failure"
            }
          ),
          /* @__PURE__ */ e(
            Me,
            {
              onClick: G,
              "data-testid": "rerun-button",
              title: "Re-run with the original trigger payload",
              children: "↻ Re-run"
            }
          ),
          /* @__PURE__ */ o("div", { className: "relative", ref: g, children: [
            /* @__PURE__ */ e(
              gt,
              {
                onClick: () => h((z) => !z),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            m ? /* @__PURE__ */ o("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: j, children: "Copy runId" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: _, children: "Export run JSON" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: W, children: "Open as new draft" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ e(
          ln,
          {
            open: w !== null,
            onConfirm: ne,
            onCancel: () => {
              $ || y(null);
            },
            title: "Retry from step",
            confirmLabel: $ ? "Starting…" : "Confirm retry",
            confirmDisabled: $,
            children: w && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[13px] text-text-secondary", children: [
                "A new run will start from",
                " ",
                /* @__PURE__ */ o("code", { className: "bg-surface-inset px-1 rounded text-xs", children: [
                  w.nodeId.slice(0, 12),
                  w.nodeId.length > 12 ? "…" : ""
                ] }),
                " ",
                "using the original upstream context."
              ] }),
              w.skippedNodes.length > 0 && /* @__PURE__ */ o("div", { children: [
                /* @__PURE__ */ o("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5", children: [
                  "Steps that will be skipped (",
                  w.skippedNodes.length,
                  ")"
                ] }),
                /* @__PURE__ */ e("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: w.skippedNodes.map((z) => /* @__PURE__ */ e("span", { className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary", children: z.slice(0, 10) }, z)) })
              ] }),
              /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
                /* @__PURE__ */ e(
                  "input",
                  {
                    type: "checkbox",
                    checked: w.snapshotInput,
                    onChange: (z) => y((de) => de && { ...de, snapshotInput: z.target.checked }),
                    className: "accent-primary"
                  }
                ),
                "Use persisted input snapshot"
              ] }),
              k && /* @__PURE__ */ e("div", { "data-testid": "retry-modal-error", className: "py-2 px-3 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: k })
            ] })
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex-1 flex flex-col min-h-0", children: /* @__PURE__ */ o("div", { className: "flex-1 overflow-auto py-5 px-7 bg-surface", children: [
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
          k && /* @__PURE__ */ e(nt, { title: "Retry failed:", className: "mb-4", children: k }),
          X && /* @__PURE__ */ e(nt, { title: "Resume failed:", className: "mb-4", "data-testid": "resume-error-banner", children: X }),
          (l.replayAttempts ?? 0) > 0 && /* @__PURE__ */ e(
            nt,
            {
              title: "Resumed from a previous failure",
              className: "mb-4",
              "data-testid": "resume-history-banner",
              children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ o("div", { children: [
                  l.error?.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o(K, { children: [
                    "Originally failed at ",
                    /* @__PURE__ */ e("code", { children: l.error.nodeId.slice(0, 12) }),
                    " — "
                  ] }),
                  "Resumed ",
                  l.replayAttempts,
                  " time",
                  l.replayAttempts === 1 ? "" : "s",
                  ".",
                  l.resumeHistory && l.resumeHistory.length > 0 && /* @__PURE__ */ o(K, { children: [
                    " ",
                    "Most recent: from",
                    " ",
                    /* @__PURE__ */ e("code", { children: l.resumeHistory[l.resumeHistory.length - 1].fromNodeId.slice(0, 12) }),
                    " ",
                    "at ",
                    bt(l.resumeHistory[l.resumeHistory.length - 1].at),
                    "."
                  ] })
                ] }),
                l.resumeHistory && l.resumeHistory.length > 1 && /* @__PURE__ */ e(
                  "ol",
                  {
                    className: "m-0 pl-[18px] text-[11px] text-text-tertiary leading-relaxed",
                    "data-testid": "resume-history-timeline",
                    children: l.resumeHistory.map((z, de) => /* @__PURE__ */ o("li", { children: [
                      "from ",
                      /* @__PURE__ */ e("code", { children: z.fromNodeId.slice(0, 12) }),
                      " at ",
                      bt(z.at)
                    ] }, `${z.fromNodeId}-${z.at}-${de}`))
                  }
                )
              ] })
            }
          ),
          Q && /* @__PURE__ */ e(nt, { title: "Resumed", className: "mb-4", "data-testid": "resume-toast", children: Q }),
          l.error && /* @__PURE__ */ o(nt, { title: "Run failed:", className: "mb-4", children: [
            l.error.message,
            l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o("span", { className: "ml-2 text-[11px] text-[#b91c1c]", children: [
              "at node ",
              l.error.nodeId.slice(0, 8)
            ] }),
            l.status === "failed" && l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ e("div", { className: "mt-2", children: /* @__PURE__ */ e(
              Me,
              {
                onClick: () => P(l.error.nodeId),
                disabled: R !== null,
                "data-testid": "resume-from-here-button",
                title: `Resume this run from "${l.error.nodeId}" using its accumulated upstream context`,
                children: R === l.error.nodeId ? "Resuming…" : "↻ Resume from here"
              }
            ) })
          ] }),
          /* @__PURE__ */ e(
            "div",
            {
              role: "tablist",
              "aria-label": "Run detail view",
              className: "flex gap-1 mb-3 border-b border-border",
              "data-testid": "run-replay-tabs",
              children: [
                { id: "steps", label: "Steps" },
                { id: "log", label: "Executor Log" }
              ].map((z) => {
                const de = x === z.id;
                return /* @__PURE__ */ e(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": de,
                    onClick: () => f(z.id),
                    "data-testid": `run-replay-tab-${z.id}`,
                    className: I(
                      "font-[inherit] text-[13px] font-semibold py-1.5 px-3.5 border-none bg-transparent cursor-pointer -mb-px",
                      de ? "text-text-primary border-b-2 border-b-primary" : "text-text-tertiary border-b-2 border-b-transparent"
                    ),
                    children: z.label
                  },
                  z.id
                );
              })
            }
          ),
          x === "steps" ? (
            /* Threaded step list with fork nesting */
            /* @__PURE__ */ e(
              lm,
              {
                steps: l.steps,
                nodeDataMap: u,
                edges: s?.edges,
                onRetryFromStep: M,
                onResumeFromStep: l.status === "failed" ? P : void 0
              }
            )
          ) : /* @__PURE__ */ e("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ e(
            km,
            {
              pipelineId: t,
              runId: n,
              onStepClick: b
            }
          ) })
        ] }) })
      ]
    }
  );
}
function Im(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${$e(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function Sm(t) {
  switch (t) {
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
function $m(t, n) {
  if (!t) return n;
  const r = t.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Tm(t, n) {
  if (!t) return !1;
  const r = t.nodes.find((i) => i.id === n);
  return !!r && r.data.type === "condition";
}
function wo(t) {
  if (!t) return;
  const n = t.output;
  if (n && typeof n == "object" && "result" in n)
    return n.result ? "true" : "false";
}
function Rm(t, n) {
  const r = (h) => h.split(/(\s+)/).filter((g) => g.length > 0), i = r(t), a = r(n), s = i.length, d = a.length, c = Array.from({ length: s + 1 }, () => new Array(d + 1).fill(0));
  for (let h = s - 1; h >= 0; h--)
    for (let g = d - 1; g >= 0; g--)
      i[h] === a[g] ? c[h][g] = c[h + 1][g + 1] + 1 : c[h][g] = Math.max(c[h + 1][g], c[h][g + 1]);
  const l = [], p = (h, g) => {
    const x = l[l.length - 1];
    x && x.type === h ? x.text += g : l.push({ type: h, text: g });
  };
  let u = 0, m = 0;
  for (; u < s && m < d; )
    i[u] === a[m] ? (p("eq", i[u]), u++, m++) : c[u + 1][m] >= c[u][m + 1] ? (p("del", i[u]), u++) : (p("add", a[m]), m++);
  for (; u < s; )
    p("del", i[u++]);
  for (; m < d; )
    p("add", a[m++]);
  return l;
}
function Pm(t, n, r) {
  const i = /* @__PURE__ */ new Set(), a = [];
  if (r)
    for (const s of r.nodes)
      (t.steps[s.id] || n.steps[s.id]) && (a.push(s.id), i.add(s.id));
  for (const s of [...Object.keys(t.steps), ...Object.keys(n.steps)])
    i.has(s) || (a.push(s), i.add(s));
  return a.map((s) => {
    const d = t.steps[s], c = n.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, m = !!d && !!c && d.status !== c.status;
    let h = !1;
    l != null && p != null && l > 0 && (h = Math.abs(p - l) / l > 0.5);
    const g = Tm(r, s), x = g ? wo(d) : void 0, f = g ? wo(c) : void 0, v = g && x !== void 0 && f !== void 0 && x !== f;
    return {
      nodeId: s,
      name: $m(r, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: m,
      durationLarge: h,
      branchDiffers: v,
      isLlm: !!(d?.llm || c?.llm),
      isCondition: g,
      branchA: x,
      branchB: f
    };
  });
}
function Am(t) {
  if (t.statusDiffers) return "bg-[#fef2f2]";
  if (t.branchDiffers) return "bg-[#eff6ff]";
  if (t.durationLarge) return "bg-[#fffbeb]";
}
function ko({
  step: t,
  branch: n,
  isCondition: r
}) {
  if (!t)
    return /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" });
  const i = Sm(t.status);
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(le, { tone: i, children: t.status }),
      /* @__PURE__ */ e("span", { className: "font-mono text-text-secondary", children: $e(t.durationMs) }),
      r && n ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        "(",
        n === "true" ? "T" : "F",
        ")"
      ] }) : null
    ] }),
    t.llm ? /* @__PURE__ */ o("div", { className: "font-mono text-[11px] text-text-tertiary", children: [
      t.llm.tokensIn,
      "→",
      t.llm.tokensOut,
      "tok"
    ] }) : null,
    t.error ? /* @__PURE__ */ e("div", { className: "text-[11px] text-[#dc2626]", title: t.error, children: t.error.length > 60 ? `${t.error.slice(0, 60)}…` : t.error }) : null
  ] });
}
function Mm({ a: t, b: n }) {
  const r = q(() => Rm(t, n), [t, n]);
  return /* @__PURE__ */ e(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: r.map((i, a) => i.type === "eq" ? /* @__PURE__ */ e("span", { children: i.text }, a) : i.type === "add" ? /* @__PURE__ */ e("span", { "data-diff": "add", className: "bg-[#dcfce7] text-[#166534]", children: i.text }, a) : /* @__PURE__ */ e("span", { "data-diff": "del", className: "bg-[#fee2e2] text-[#991b1b] line-through", children: i.text }, a))
    }
  );
}
function Dm({ row: t }) {
  const n = t.a?.llm, r = t.b?.llm, i = n && r ? r.tokensIn + r.tokensOut - (n.tokensIn + n.tokensOut) : void 0, a = Am(t);
  return /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ o("tr", { "data-testid": `run-compare-row-${t.nodeId}`, className: a, children: [
      /* @__PURE__ */ o("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a), children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-text-primary", children: t.name }),
        /* @__PURE__ */ e("div", { className: "font-mono text-[11px] text-text-tertiary", children: t.nodeId })
      ] }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a), children: /* @__PURE__ */ e(ko, { step: t.a, branch: t.branchA, isCondition: t.isCondition }) }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a), children: /* @__PURE__ */ e(ko, { step: t.b, branch: t.branchB, isCondition: t.isCondition }) }),
      /* @__PURE__ */ o(
        "td",
        {
          className: I("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", a),
          "data-testid": `run-compare-delta-${t.nodeId}`,
          children: [
            t.branchDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#2563eb]", children: "different branch!" }) : t.statusDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#dc2626]", children: "status differs" }) : t.durationDelta != null ? /* @__PURE__ */ e("span", { className: t.durationLarge ? "text-[#d97706]" : "text-text-secondary", children: Im(t.durationDelta) }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "—" }),
            i != null && i !== 0 ? /* @__PURE__ */ o("div", { className: "mt-0.5 text-[11px] text-text-tertiary", children: [
              i > 0 ? "+" : "",
              i,
              "tok"
            ] }) : null
          ]
        }
      )
    ] }),
    t.isLlm && (n || r) ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e("td", { className: "border-b border-border p-0", colSpan: 4, children: /* @__PURE__ */ o("details", { className: "bg-surface-inset px-3.5 py-2.5", children: [
      /* @__PURE__ */ e(
        "summary",
        {
          className: "cursor-pointer text-xs font-semibold text-text-secondary",
          "data-testid": `run-compare-llm-toggle-${t.nodeId}`,
          children: "LLM response diff"
        }
      ),
      /* @__PURE__ */ o("div", { className: "mt-2 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run A" }),
          /* @__PURE__ */ e(
            "pre",
            {
              "data-testid": `run-compare-llm-a-${t.nodeId}`,
              className: "m-0 whitespace-pre-wrap break-words rounded-md border border-border bg-surface p-2.5 text-xs",
              children: n?.response ?? "(no response)"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run B" }),
          /* @__PURE__ */ e(
            "pre",
            {
              "data-testid": `run-compare-llm-b-${t.nodeId}`,
              className: "m-0 whitespace-pre-wrap break-words rounded-md border border-border bg-surface p-2.5 text-xs",
              children: r?.response ?? "(no response)"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "mt-2.5", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Word-level diff" }),
        /* @__PURE__ */ e("div", { className: "mt-1.5", children: /* @__PURE__ */ e(
          Mm,
          {
            a: n?.response ?? "",
            b: r?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function Om({ runA: t, runB: n, def: r }) {
  const i = q(() => Pm(t, n, r), [t, n, r]);
  return /* @__PURE__ */ o(
    "table",
    {
      className: "w-full overflow-hidden rounded-lg border border-border bg-surface text-[13px]",
      "data-testid": "run-compare-table",
      children: [
        /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { children: [
          /* @__PURE__ */ e("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Step" }),
          /* @__PURE__ */ e("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run A" }),
          /* @__PURE__ */ e("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run B" }),
          /* @__PURE__ */ e("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Δ" })
        ] }) }),
        /* @__PURE__ */ e("tbody", { children: i.map((a) => /* @__PURE__ */ e(Dm, { row: a }, a.nodeId)) })
      ]
    }
  );
}
function Em(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${$e(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function _m(t) {
  switch (t) {
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
function Lm(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Co(t, n) {
  const r = Object.values(t.steps).filter((i) => !!i.llm).map((i) => ({
    model: n.get(i.nodeId),
    tokensIn: i.llm?.tokensIn ?? 0,
    tokensOut: i.llm?.tokensOut ?? 0
  }));
  return Ht(Ct(r).total);
}
function Io({
  label: t,
  run: n,
  cost: r,
  testIdPrefix: i
}) {
  const a = _m(n.status);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
      "data-testid": `${i}-summary`,
      children: [
        /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: t }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-tertiary", children: n.id.slice(0, 8) }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "text-text-secondary", children: bt(n.startedAt) })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(le, { tone: a, children: n.status }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", children: $e(n.durationMs) }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", "data-testid": `${i}-cost`, children: r })
        ] })
      ]
    }
  );
}
function df() {
  const { pipelineId: t, runIdA: n, runIdB: r } = vt(), i = ze(), a = q(
    () => t ? lt(t) : null,
    [t]
  ), s = q(
    () => t && n ? sn(t, n) : null,
    [t, n]
  ), d = q(
    () => t && r ? sn(t, r) : null,
    [t, r]
  ), c = q(() => Lm(a), [a]);
  if (!t || !n || !r)
    return /* @__PURE__ */ e(Nt, { to: "/pipelines", replace: !0 });
  if (!a)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      je,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => i("/pipelines")
      }
    ) });
  if (!s || !d)
    return /* @__PURE__ */ e("div", { className: "p-8", "data-testid": "run-compare-missing", children: /* @__PURE__ */ e(
      je,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable — they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => i(`/pipelines/${t}/runs`)
      }
    ) });
  const l = (d.durationMs ?? 0) - (s.durationMs ?? 0), p = Co(s, c), u = Co(d, c), m = (/* @__PURE__ */ new Set([
    ...Object.keys(s.steps),
    ...Object.keys(d.steps)
  ])).size;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-4 p-6 text-text-primary", "data-testid": "run-compare", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => i(`/pipelines/${t}/runs`),
          className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
          children: [
            "← ",
            a.name
          ]
        }
      ),
      /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "/" }),
      /* @__PURE__ */ e("span", { className: "text-lg font-bold text-text-primary", children: "Compare runs" }),
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
      /* @__PURE__ */ e(Io, { label: "Run A", run: s, cost: p, testIdPrefix: "run-a" }),
      /* @__PURE__ */ e(Io, { label: "Run B", run: d, cost: u, testIdPrefix: "run-b" })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
        "data-testid": "run-compare-delta",
        children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Δ duration" }),
          /* @__PURE__ */ e("span", { className: "font-mono text-[13px]", children: Em(l) }),
          /* @__PURE__ */ e("span", { className: "flex-1" }),
          /* @__PURE__ */ o("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
            m,
            " step",
            m === 1 ? "" : "s",
            " compared"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e(Om, { runA: s, runB: d, def: a })
  ] });
}
function Bm(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${$e(Math.abs(t))}`;
}
function So(t) {
  switch (t) {
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
function Um({
  runA: t,
  runB: n,
  costA: r,
  costB: i
}) {
  const a = t.durationMs ?? 0, d = (n.durationMs ?? 0) - a;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ o(
        "div",
        {
          className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
          "data-testid": "diff-run-a-summary",
          children: [
            /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run A" }),
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-tertiary", children: t.id.slice(0, 8) }),
              /* @__PURE__ */ e(le, { tone: So(t.status), children: t.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: bt(t.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              $e(t.durationMs),
              " | ",
              r
            ] }),
            /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary", children: [
              "Trigger: ",
              t.triggeredBy.userId ?? t.triggeredBy.triggerType
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
            /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run B" }),
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-tertiary", children: n.id.slice(0, 8) }),
              /* @__PURE__ */ e(le, { tone: So(n.status), children: n.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: bt(n.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              $e(n.durationMs),
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
          /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Duration delta" }),
          /* @__PURE__ */ e(
            "span",
            {
              className: I(
                "font-mono text-sm font-bold",
                d === 0 ? "text-text-secondary" : d < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
              ),
              children: Bm(d)
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
function Fm(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${$e(Math.abs(t))}`;
}
function $o(t) {
  switch (t) {
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
function jm(t, n) {
  if (!t) return n;
  const r = t.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function zm(t, n, r) {
  const i = /* @__PURE__ */ new Set(), a = [];
  if (r)
    for (const s of r.nodes)
      (t.steps[s.id] || n.steps[s.id]) && (a.push(s.id), i.add(s.id));
  for (const s of [...Object.keys(t.steps), ...Object.keys(n.steps)])
    i.has(s) || (a.push(s), i.add(s));
  return a.map((s) => {
    const d = t.steps[s], c = n.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, m = !!d && !!c && d.status !== c.status, h = !!d && !c, g = !d && !!c, x = d?.llm ? d.llm.tokensIn + d.llm.tokensOut : void 0, f = c?.llm ? c.llm.tokensIn + c.llm.tokensOut : void 0, v = x != null && f != null ? f - x : void 0;
    return {
      nodeId: s,
      name: jm(r, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: m,
      onlyInA: h,
      onlyInB: g,
      tokenDelta: v
    };
  });
}
function qm({ runA: t, runB: n, def: r }) {
  const i = q(() => zm(t, n, r), [t, n, r]);
  return /* @__PURE__ */ o("table", { className: "w-full border-collapse text-[13px]", children: [
    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ e("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Step" }),
      /* @__PURE__ */ e("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run A" }),
      /* @__PURE__ */ e("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run B" }),
      /* @__PURE__ */ e("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Delta" })
    ] }) }),
    /* @__PURE__ */ e("tbody", { children: i.map((a) => /* @__PURE__ */ o(
      "tr",
      {
        className: I(
          a.onlyInA || a.onlyInB ? "bg-[#fefce8]" : a.statusDiffers ? "bg-[#fef2f2]" : void 0
        ),
        "data-testid": `diff-step-row-${a.nodeId}`,
        children: [
          /* @__PURE__ */ o("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: [
            /* @__PURE__ */ e("div", { className: "font-semibold", children: a.name }),
            /* @__PURE__ */ e("div", { className: "font-mono text-[10px] text-text-tertiary", children: a.nodeId }),
            a.onlyInA && /* @__PURE__ */ e(le, { tone: "warning", size: "xs", children: "only in A" }),
            a.onlyInB && /* @__PURE__ */ e(le, { tone: "warning", size: "xs", children: "only in B" })
          ] }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: a.a ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(le, { tone: $o(a.a.status), children: a.a.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: $e(a.a.durationMs) }),
            a.a.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              a.a.llm.tokensIn,
              " in / ",
              a.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: a.b ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(le, { tone: $o(a.b.status), children: a.b.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: $e(a.b.durationMs) }),
            a.b.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              a.b.llm.tokensIn,
              " in / ",
              a.b.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ o("td", { className: "border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", children: [
            a.statusDiffers && /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-[#dc2626]", children: "status differs" }),
            a.durationDelta != null && /* @__PURE__ */ e(
              "div",
              {
                className: I(
                  "text-xs",
                  a.durationDelta === 0 ? "text-text-tertiary" : a.durationDelta < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
                ),
                children: Fm(a.durationDelta)
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
            a.durationDelta == null && !a.statusDiffers && /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "--" })
          ] })
        ]
      },
      a.nodeId
    )) })
  ] });
}
function Wm(t, n) {
  if (!t) return n;
  const r = t.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function cn(t, n = "", r = 0) {
  const i = /* @__PURE__ */ new Map();
  if (r > 6 || t == null)
    return i.set(n || "(root)", String(t)), i;
  if (typeof t != "object")
    return i.set(n || "(root)", JSON.stringify(t)), i;
  if (Array.isArray(t)) {
    if (t.length === 0)
      i.set(n || "(root)", "[]");
    else
      for (let s = 0; s < t.length; s++) {
        const d = n ? `${n}.${s}` : String(s);
        for (const [c, l] of cn(t[s], d, r + 1))
          i.set(c, l);
      }
    return i;
  }
  const a = Object.entries(t);
  if (a.length === 0)
    i.set(n || "(root)", "{}");
  else
    for (const [s, d] of a) {
      const c = n ? `${n}.${s}` : s;
      for (const [l, p] of cn(d, c, r + 1))
        i.set(l, p);
    }
  return i;
}
function pa(t, n) {
  const r = cn(t), i = cn(n), a = /* @__PURE__ */ new Set([...r.keys(), ...i.keys()]), s = [];
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
const Vm = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function Km({
  nodeId: t,
  name: n,
  outputA: r,
  outputB: i
}) {
  const [a, s] = S(!1), d = q(() => pa(r, i), [r, i]), c = d.filter((l) => l.type !== "unchanged").length;
  return c === 0 ? /* @__PURE__ */ o("div", { className: "rounded-md bg-surface-inset px-3 py-2", children: [
    /* @__PURE__ */ e("span", { className: "text-xs font-semibold", children: n }),
    /* @__PURE__ */ e("span", { className: "ml-2 text-[11px] text-text-tertiary", children: "(no differences)" })
  ] }) : /* @__PURE__ */ o(
    "div",
    {
      className: "overflow-hidden rounded-md border border-border",
      "data-testid": `diff-output-${t}`,
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            className: "flex cursor-pointer items-center gap-2 bg-surface-inset px-3 py-2",
            onClick: () => s(!a),
            children: [
              /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: a ? "▼" : "▶" }),
              /* @__PURE__ */ e("span", { className: "text-xs font-semibold", children: n }),
              /* @__PURE__ */ e("span", { className: "font-mono text-[10px] text-text-tertiary", children: t }),
              /* @__PURE__ */ o(le, { tone: "warning", size: "xs", className: "ml-auto", children: [
                c,
                " difference",
                c === 1 ? "" : "s"
              ] })
            ]
          }
        ),
        a && /* @__PURE__ */ e("div", { className: "flex flex-col gap-0.5 px-3 py-2", children: d.filter((l) => l.type !== "unchanged").map((l, p) => /* @__PURE__ */ o(
          "div",
          {
            className: I(
              "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
              Vm[l.type]
            ),
            children: [
              /* @__PURE__ */ o("span", { className: "min-w-[120px] shrink-0 font-semibold", children: [
                l.type === "added" && "+ ",
                l.type === "removed" && "- ",
                l.type === "changed" && "~ ",
                l.key
              ] }),
              l.type === "changed" && /* @__PURE__ */ o("span", { children: [
                /* @__PURE__ */ e("span", { className: "line-through opacity-70", children: l.valueA }),
                " -> ",
                /* @__PURE__ */ e("span", { className: "font-semibold", children: l.valueB })
              ] }),
              l.type === "added" && /* @__PURE__ */ e("span", { children: l.valueB }),
              l.type === "removed" && /* @__PURE__ */ e("span", { children: l.valueA })
            ]
          },
          `${l.key}-${p}`
        )) })
      ]
    }
  );
}
function Hm({ runA: t, runB: n, def: r }) {
  const i = q(() => {
    const a = /* @__PURE__ */ new Set(), s = [];
    if (r)
      for (const d of r.nodes) {
        const c = t.steps[d.id]?.output != null, l = n.steps[d.id]?.output != null;
        (c || l) && (s.push(d.id), a.add(d.id));
      }
    for (const d of [...Object.keys(t.steps), ...Object.keys(n.steps)]) {
      if (a.has(d)) continue;
      const c = t.steps[d]?.output != null, l = n.steps[d]?.output != null;
      (c || l) && (s.push(d), a.add(d));
    }
    return s;
  }, [t, n, r]);
  return i.length === 0 ? /* @__PURE__ */ e("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "No step outputs to compare." }) : /* @__PURE__ */ e("div", { className: "flex flex-col gap-3", children: i.map((a) => /* @__PURE__ */ e(
    Km,
    {
      nodeId: a,
      name: Wm(r, a),
      outputA: t.steps[a]?.output,
      outputB: n.steps[a]?.output
    },
    a
  )) });
}
function Jm(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function To(t, n) {
  const r = Object.values(t.steps).filter((i) => !!i.llm).map((i) => ({
    model: n.get(i.nodeId),
    tokensIn: i.llm?.tokensIn ?? 0,
    tokensOut: i.llm?.tokensOut ?? 0
  }));
  return Ht(Ct(r).total);
}
function on({
  title: t,
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
              /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: s ? "▼" : "▶" }),
              /* @__PURE__ */ e("span", { className: "text-[13px] font-bold text-text-primary", children: t }),
              r && /* @__PURE__ */ e(le, { tone: "info", className: "ml-auto", children: r })
            ]
          }
        ),
        s && /* @__PURE__ */ e("div", { className: "p-4", children: i })
      ]
    }
  );
}
const Gm = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function Ym({
  runA: t,
  runB: n
}) {
  const r = q(
    () => pa(t.context, n.context),
    [t.context, n.context]
  ), i = r.filter((a) => a.type !== "unchanged").length;
  return /* @__PURE__ */ e(
    on,
    {
      title: "Context evolution diff",
      defaultOpen: !1,
      badge: i > 0 ? `${i} difference${i === 1 ? "" : "s"}` : void 0,
      testId: "diff-context-section",
      children: i === 0 ? /* @__PURE__ */ e("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "Final contexts are identical." }) : /* @__PURE__ */ e("div", { className: "flex flex-col gap-0.5", children: r.map((a, s) => /* @__PURE__ */ o(
        "div",
        {
          className: I(
            "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
            Gm[a.type]
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
              /* @__PURE__ */ e("span", { className: "line-through opacity-70", children: a.valueA }),
              " -> ",
              /* @__PURE__ */ e("span", { className: "font-semibold", children: a.valueB })
            ] }),
            a.type === "added" && /* @__PURE__ */ e("span", { children: a.valueB }),
            a.type === "removed" && /* @__PURE__ */ e("span", { children: a.valueA }),
            a.type === "unchanged" && /* @__PURE__ */ e("span", { className: "opacity-50", children: a.valueA })
          ]
        },
        `${a.key}-${s}`
      )) })
    }
  );
}
function Xm({ pipelineId: t, runIdA: n, runIdB: r }) {
  const i = ze(), a = q(
    () => lt(t),
    [t]
  ), s = q(
    () => sn(t, n),
    [t, n]
  ), d = q(
    () => sn(t, r),
    [t, r]
  ), c = q(() => Jm(a), [a]);
  if (!a)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      je,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => i("/pipelines")
      }
    ) });
  if (!s || !d)
    return /* @__PURE__ */ e("div", { className: "p-8", "data-testid": "diff-run-missing", children: /* @__PURE__ */ e(
      je,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable -- they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => i(`/pipelines/${t}/runs`)
      }
    ) });
  const l = To(s, c), p = To(d, c);
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
              onClick: () => i(`/pipelines/${t}/runs`),
              className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
              children: [
                "← ",
                a.name
              ]
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "/" }),
          /* @__PURE__ */ e("span", { className: "text-lg font-bold text-text-primary", children: "Diff view" }),
          /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
            n.slice(0, 8),
            " vs ",
            r.slice(0, 8)
          ] })
        ] }),
        /* @__PURE__ */ e(on, { title: "Summary", testId: "diff-summary-section", children: /* @__PURE__ */ e(
          Um,
          {
            runA: s,
            runB: d,
            costA: l,
            costB: p
          }
        ) }),
        /* @__PURE__ */ e(
          on,
          {
            title: "Step-by-step comparison",
            badge: `${Object.keys(s.steps).length + Object.keys(d.steps).length > 0 ? "steps" : "0 steps"}`,
            testId: "diff-steps-section",
            children: /* @__PURE__ */ e(qm, { runA: s, runB: d, def: a })
          }
        ),
        /* @__PURE__ */ e(
          on,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ e(Hm, { runA: s, runB: d, def: a })
          }
        ),
        /* @__PURE__ */ e(Ym, { runA: s, runB: d })
      ]
    }
  );
}
function pf() {
  const { pipelineId: t } = vt(), [n] = pn(), r = n.get("a"), i = n.get("b");
  return !t || !r || !i ? /* @__PURE__ */ e(Nt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(Xm, { pipelineId: t, runIdA: r, runIdB: i });
}
function uf() {
  const t = ze(), [n, r] = pn(), [i, a] = S([]), { runs: s } = wt();
  re(() => {
    let b = !1;
    return (async () => {
      const w = gr(), y = [];
      await Promise.all(
        w.map(async (k) => {
          try {
            const { runs: C } = await Lo(k.id, { limit: 50 });
            if (C.length > 0) {
              for (const $ of C)
                $.id && y.push({ ...$, pipelineName: k.name });
              return;
            }
          } catch {
          }
          for (const C of an(k.id))
            C.id && y.push({ ...C, pipelineName: k.name });
        })
      ), !b && (y.sort((k, C) => C.startedAt.localeCompare(k.startedAt)), a(y));
    })(), () => {
      b = !0;
    };
  }, []);
  const d = q(() => {
    const b = new Map(gr().map((k) => [k.id, k.name])), w = new Set(i.map((k) => k.id)), y = [];
    for (const [k, C] of Object.entries(s))
      w.has(k) || C.pipelineId && y.push({
        ...C,
        pipelineName: b.get(C.pipelineId) ?? `Pipeline ${C.pipelineId.slice(0, 8)}`
      });
    return y.length === 0 ? i : [...y, ...i].sort((k, C) => C.startedAt.localeCompare(k.startedAt));
  }, [i, s]), { query: c, statuses: l, triggerKinds: p, range: u } = q(
    () => ca(n),
    [n]
  ), m = (b, w) => {
    const y = new URLSearchParams(n);
    w ? y.set(b, w) : y.delete(b), r(y, { replace: !0 });
  }, h = (b) => {
    const w = new Set(l);
    w.has(b) ? w.delete(b) : w.add(b), m("status", w.size === 0 ? null : Array.from(w).join(","));
  }, g = (b) => {
    const w = new Set(p);
    w.has(b) ? w.delete(b) : w.add(b), m("trigger", w.size === 0 ? null : Array.from(w).join(","));
  }, x = (b) => {
    m("range", b === "7d" ? null : b);
  }, f = (b) => {
    m("q", b.length === 0 ? null : b);
  }, v = q(
    () => la(d, { query: c, statuses: l, triggerKinds: p, range: u }),
    [d, c, l, p, u]
  ), N = q(() => {
    const b = {};
    for (const w of v) {
      const y = Object.values(w.steps).filter((C) => !!C.llm).map((C) => ({
        model: void 0,
        tokensIn: C.llm?.tokensIn ?? 0,
        tokensOut: C.llm?.tokensOut ?? 0
      })), k = Ct(y);
      k.total.totalCostUsd > 0 && (b[w.id] = Ht(k.total));
    }
    return b;
  }, [v]);
  return /* @__PURE__ */ o("div", { "data-testid": "all-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Runs" }),
      /* @__PURE__ */ o("span", { className: "text-[13px] text-text-tertiary", children: [
        v.length,
        " run",
        v.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ e(
      da,
      {
        query: c,
        onQueryChange: f,
        statuses: l,
        onStatusToggle: h,
        triggerKinds: p,
        onTriggerToggle: g,
        range: u,
        onRangeChange: x,
        onClearFilters: () => r(new URLSearchParams(), { replace: !0 })
      }
    ),
    v.length === 0 ? /* @__PURE__ */ e(
      je,
      {
        icon: "📋",
        title: "No runs yet",
        body: "Run a pipeline to see execution history here."
      }
    ) : /* @__PURE__ */ e("div", { className: "overflow-x-auto", children: /* @__PURE__ */ o("table", { className: "w-full border-collapse text-[13px]", children: [
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
        /* @__PURE__ */ e("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Pipeline" }),
        /* @__PURE__ */ e("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Run ID" }),
        /* @__PURE__ */ e("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Status" }),
        /* @__PURE__ */ e("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Trigger" }),
        /* @__PURE__ */ e("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Started" }),
        /* @__PURE__ */ e("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right", children: "Duration" }),
        /* @__PURE__ */ e("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right", children: "Cost" })
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: v.map((b) => /* @__PURE__ */ o(
        "tr",
        {
          onClick: () => t(`/pipelines/${b.pipelineId}/runs/${b.id}`),
          className: "border-b border-border cursor-pointer hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-medium", children: b.pipelineName }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: b.id.slice(0, 11) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ e(le, { tone: pr(b.status).tone, size: "sm", children: b.status }) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: b.triggerType ?? b.triggeredBy?.triggerType }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: qp(b.startedAt) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: b.completedAt ? $e(new Date(b.completedAt).getTime() - new Date(b.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: N[b.id] ?? "—" })
          ]
        },
        b.id
      )) })
    ] }) })
  ] });
}
function ua(t) {
  let n = 0, r = 0;
  for (const i of Object.values(t.steps ?? {}))
    i.llm && (n += i.llm.tokensIn ?? 0, r += i.llm.tokensOut ?? 0);
  return { tokensIn: n, tokensOut: r };
}
function Qm(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Zm(t, n) {
  const r = [];
  for (const i of Object.values(t.steps ?? {}))
    i.llm && r.push({
      model: n.get(i.nodeId),
      tokensIn: i.llm.tokensIn,
      tokensOut: i.llm.tokensOut
    });
  return Ct(r).total.totalCostUsd;
}
function Ro(t, n) {
  if (t.length === 0) return 0;
  const r = Math.min(t.length - 1, Math.floor(t.length * n));
  return t[r];
}
function Po(t) {
  return t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Ao(t) {
  const n = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) ? `$${n.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function eh(t) {
  return t.slice(0, 8);
}
function th(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function nh(t, n) {
  const r = t.length;
  let i = 0, a = 0, s = 0;
  const d = [];
  let c = 0, l = 0, p = 0;
  const u = /* @__PURE__ */ new Map();
  for (const f of t) {
    f.status === "completed" ? i++ : f.status === "failed" ? a++ : f.status === "cancelled" && s++, typeof f.durationMs == "number" && f.durationMs > 0 && d.push(f.durationMs);
    const v = ua(f);
    if (c += v.tokensIn, l += v.tokensOut, p += Zm(f, n), f.error?.message) {
      const N = f.error.message.slice(0, 48), b = u.get(N);
      b ? (b.count += 1, f.startedAt > b.lastSeenAt && (b.lastSeenAt = f.startedAt, b.exampleRunId = f.id)) : u.set(N, { count: 1, lastSeenAt: f.startedAt, exampleRunId: f.id });
    }
  }
  d.sort((f, v) => f - v);
  const m = Ro(d, 0.5), h = Ro(d, 0.95), g = r === 0 ? 0 : Math.round(i / r * 100), x = [...u.entries()].map(([f, v]) => ({ key: f, count: v.count, lastSeenAt: v.lastSeenAt, exampleRunId: v.exampleRunId })).sort((f, v) => v.count - f.count).slice(0, 5);
  return {
    totalCount: r,
    completedCount: i,
    failedCount: a,
    cancelledCount: s,
    successRatePct: g,
    medianMs: m,
    p95Ms: h,
    tokensIn: c,
    tokensOut: l,
    tokensPerRun: r === 0 ? 0 : Math.round((c + l) / r),
    totalCost: p,
    costPerRun: r === 0 ? 0 : p / r,
    failureBreakdown: x
  };
}
function rh(t) {
  return t >= 90 ? "#16a34a" : t >= 70 ? "#f59e0b" : "#dc2626";
}
function oh(t) {
  const n = [...t].sort((l, p) => l.startedAt.localeCompare(p.startedAt)), r = [], i = [], a = [];
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
function ah(t, n) {
  const i = [...t].sort((s, d) => s.startedAt.localeCompare(d.startedAt)).filter((s) => typeof s.durationMs == "number" && s.durationMs > 0).map((s) => ({ x: new Date(s.startedAt).getTime(), y: s.durationMs })), a = i.map((s) => ({ x: s.x, y: n }));
  return [
    { label: "Duration (ms)", data: i, color: "#646cff" },
    { label: "p50", data: a, color: "#94a3b8" }
  ];
}
function ih(t) {
  const n = [...t].sort((a, s) => a.startedAt.localeCompare(s.startedAt)), r = [], i = [];
  for (const a of n) {
    const s = new Date(a.startedAt).getTime(), { tokensIn: d, tokensOut: c } = ua(a);
    r.push({ x: s, y: d }), i.push({ x: s, y: c });
  }
  return [
    { label: "Tokens in", data: r, color: "#646cff" },
    { label: "Tokens out", data: i, color: "#16a34a" }
  ];
}
function mf() {
  const { pipelineId: t } = vt(), n = ze(), [r, i] = S(null), [a, s] = S([]), [d, c] = S("50");
  re(() => {
    t && (i(lt(t)), s(an(t)));
  }, [t]);
  const l = q(() => {
    if (d === "all") return a;
    const f = Number(d);
    return a.slice(0, f);
  }, [a, d]), p = q(() => Qm(r), [r]), u = q(() => nh(l, p), [l, p]), m = q(
    () => qu(l, r).filter((f) => f.totalCostUsd > 0 || f.stepCount > 0),
    [l, r]
  ), h = q(() => Ku(a, r, 30), [a, r]), g = q(
    () => [
      {
        label: "Daily spend",
        data: h.map((f) => ({ x: f.ts, y: f.totalCostUsd })),
        color: "#646cff"
      }
    ],
    [h]
  );
  if (!t) return /* @__PURE__ */ e(Nt, { to: "/pipelines", replace: !0 });
  if (!r)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      je,
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
          onClick: () => n(`/pipelines/${t}`),
          className: "bg-transparent border-none text-primary cursor-pointer text-[13px] p-0",
          children: [
            "← ",
            r.name
          ]
        }
      ),
      /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "/" }),
      /* @__PURE__ */ e("span", { className: "text-lg font-bold text-text-primary", children: "Execution stats" }),
      /* @__PURE__ */ e(
        "div",
        {
          className: "ml-auto flex gap-1.5",
          "data-testid": "stats-range",
          children: ["10", "50", "all"].map((f) => /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => c(f),
              className: I(
                "px-2.5 py-1 text-xs font-medium rounded cursor-pointer font-[inherit]",
                d === f ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"
              ),
              children: f === "all" ? "All" : `Last ${f}`
            },
            f
          ))
        }
      )
    ] }),
    x ? /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ o(
        "div",
        {
          className: "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3",
          "data-testid": "stats-kpis",
          children: [
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Success rate" }),
              /* @__PURE__ */ o(
                "div",
                {
                  className: "text-[22px] font-bold font-mono",
                  style: { color: rh(u.successRatePct) },
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
              /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Median duration" }),
              /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: $e(u.medianMs) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                "p95 · ",
                $e(u.p95Ms)
              ] })
            ] }),
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Total tokens" }),
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
              /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Total cost" }),
              /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: Po(u.totalCost) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                Po(u.costPerRun),
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
              /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Cost by node" }),
              m.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary py-2", children: "No per-node cost data in this range." }) : /* @__PURE__ */ e(
                Xa,
                {
                  data: m.map((f) => ({
                    label: f.label,
                    cost: Number(f.totalCostUsd.toFixed(6))
                  })),
                  xKey: "label",
                  yKey: "cost",
                  height: 200,
                  color: "#646cff",
                  yFormat: Ao
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-trend-30d", children: [
              /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "30-day spend trend" }),
              /* @__PURE__ */ e(
                Jt,
                {
                  series: g,
                  height: 200,
                  xFormat: (f) => new Date(Number(f)).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric"
                  }),
                  yFormat: Ao
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ o("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3", children: [
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Runs over time (cumulative)" }),
          /* @__PURE__ */ e(
            Jt,
            {
              series: oh(l),
              height: 180,
              xFormat: (f) => new Date(Number(f)).toLocaleDateString()
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Duration over time" }),
          /* @__PURE__ */ e(
            Jt,
            {
              series: ah(l, u.medianMs),
              height: 180,
              xFormat: (f) => new Date(Number(f)).toLocaleDateString(),
              yFormat: (f) => $e(f)
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Token usage over time" }),
          /* @__PURE__ */ e(
            Jt,
            {
              series: ih(l),
              height: 180,
              xFormat: (f) => new Date(Number(f)).toLocaleDateString(),
              yFormat: (f) => f.toLocaleString()
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-failure-breakdown", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Failure breakdown (top 5)" }),
          u.failureBreakdown.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary py-2", children: "No failures in this range." }) : /* @__PURE__ */ o("table", { className: "w-full border-collapse text-xs", children: [
            /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { className: "text-left", children: ["Error", "Count", "Last seen", "Example"].map((f) => /* @__PURE__ */ e(
              "th",
              {
                className: "px-2 py-1.5 text-[10px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
                children: f
              },
              f
            )) }) }),
            /* @__PURE__ */ e("tbody", { children: u.failureBreakdown.map((f) => /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ e(
                "td",
                {
                  className: "px-2 py-1.5 text-text-primary max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap",
                  title: f.key,
                  children: f.key
                }
              ),
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5 font-mono text-text-primary", children: f.count }),
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5 text-text-secondary", children: th(f.lastSeenAt) }),
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => n(`/pipelines/${t}/runs/${f.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    eh(f.exampleRunId),
                    " →"
                  ]
                }
              ) })
            ] }, f.key)) })
          ] })
        ] })
      ] })
    ] }) : /* @__PURE__ */ e(
      je,
      {
        icon: "📊",
        title: "No runs yet",
        body: "No runs yet. Trigger this pipeline to see stats."
      }
    )
  ] });
}
function sh(t) {
  const n = new Date(t).getTime();
  if (!Number.isFinite(n) || n <= 0) return "—";
  const r = Math.floor((Date.now() - n) / 1e3);
  if (r < 10) return "just now";
  if (r < 60) return `${r}s ago`;
  const i = Math.floor(r / 60);
  if (i < 60) return `${i}m ago`;
  const a = Math.floor(i / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function lh(t) {
  return t.length <= 6 ? t : t.slice(-6);
}
function ch({ approver: t, idx: n }) {
  const r = t.type === "role" ? "🎖" : "👤";
  return /* @__PURE__ */ o(
    "span",
    {
      className: "inline-flex items-center gap-1 bg-info-bg text-info-fg px-2 py-0.5 rounded-sm text-[11px] font-semibold leading-[1.4] whitespace-nowrap",
      children: [
        /* @__PURE__ */ e("span", { "aria-hidden": !0, children: r }),
        /* @__PURE__ */ e("span", { children: t.value })
      ]
    },
    `${t.type}:${t.value}:${n}`
  );
}
function dh(t, n) {
  const r = [];
  if (t) {
    const i = t.steps;
    for (const [a, s] of Object.entries(t))
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
function ph({ row: t, onSubmit: n, onOpenPipeline: r }) {
  const [i, a] = S(""), s = O(
    (p) => {
      n(p, i.trim()), a("");
    },
    [i, n]
  ), d = t.requiredCount ?? 1, c = t.recordedCount ?? 0, l = q(() => dh(t.runContext, t.runSteps), [t.runContext, t.runSteps]);
  return /* @__PURE__ */ o("div", { "data-testid": `approval-card-${t.runId}`, className: "flex flex-col gap-3 p-4 bg-surface border border-border rounded-[10px]", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2.5 min-w-0", children: [
        /* @__PURE__ */ e("span", { className: "text-lg", "aria-hidden": !0, children: "✋" }),
        /* @__PURE__ */ o("div", { className: "min-w-0", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: r,
              "data-testid": `open-pipeline-${t.pipelineId}`,
              className: "text-sm font-semibold text-text-primary bg-transparent border-none p-0 cursor-pointer font-[inherit] text-left overflow-hidden text-ellipsis whitespace-nowrap max-w-full",
              title: t.pipelineName,
              children: t.pipelineName
            }
          ),
          /* @__PURE__ */ o("div", { className: "font-mono text-[11px] text-text-tertiary", children: [
            "run #",
            lh(t.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: sh(t.requestedAt) })
    ] }),
    t.message ? /* @__PURE__ */ e("div", { "data-testid": `approval-message-${t.runId}`, className: "text-[13px] text-text-secondary bg-[#fafbfc] px-3 py-2 rounded-md leading-normal", children: t.message }) : null,
    /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5 px-3 py-2.5 bg-[#fafbfc] rounded-md border border-border", children: [
      /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: l.length > 0 ? "Context" : "Run details" }),
      l.length > 0 ? l.map(({ label: p, value: u }) => /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-medium text-text-secondary", children: p }),
        /* @__PURE__ */ e("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: u })
      ] }, p)) : /* @__PURE__ */ o(K, { children: [
        /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ e("div", { className: "text-[11px] font-medium text-text-secondary", children: "Run" }),
          /* @__PURE__ */ e("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: t.runId })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ e("div", { className: "text-[11px] font-medium text-text-secondary", children: "Step" }),
          /* @__PURE__ */ e("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: t.stepId })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ e("div", { className: "text-[11px] font-medium text-text-secondary", children: "Status" }),
          /* @__PURE__ */ e("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: "Awaiting your approval — upstream steps haven't produced reviewable output yet (or this approval node runs in parallel with them)." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1.5 items-center", children: [
      /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Approvers:" }),
      t.approvers.length === 0 ? /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : t.approvers.map((p, u) => /* @__PURE__ */ e(ch, { approver: p, idx: u }, u)),
      d > 1 ? /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary ml-1", children: [
        "(",
        c,
        "/",
        d,
        " approvals)"
      ] }) : null
    ] }),
    /* @__PURE__ */ e(
      "textarea",
      {
        "data-testid": `approval-comment-${t.runId}`,
        value: i,
        onChange: (p) => a(p.target.value),
        placeholder: "Optional comment…",
        rows: 2,
        className: "w-full px-3 py-2 text-[13px] font-[inherit] border border-border-field rounded-md bg-[#f9fafb] text-text-primary outline-none resize-y"
      }
    ),
    /* @__PURE__ */ o("div", { className: "flex gap-2 justify-end", children: [
      /* @__PURE__ */ e("button", { "data-testid": `reject-${t.runId}`, onClick: () => s("reject"), className: "px-3.5 py-1.5 text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-md font-[inherit] cursor-pointer", children: "Reject" }),
      /* @__PURE__ */ e("button", { "data-testid": `approve-${t.runId}`, onClick: () => s("approve"), className: "px-3.5 py-1.5 text-[13px] font-semibold bg-[#16a34a] text-white border-none rounded-md font-[inherit] cursor-pointer shrink-0", children: "Approve" })
    ] })
  ] });
}
function hf() {
  const t = ze(), { approvals: n, isLoading: r, error: i, retry: a } = _a(), { resolveApproval: s, runs: d } = wt(), [c, l] = S(
    () => /* @__PURE__ */ new Set()
  );
  re(() => {
    if (c.size === 0) return;
    const f = new Set(n.map((b) => `${b.runId}::${b.stepId}`));
    let v = !1;
    const N = new Set(c);
    for (const b of c)
      f.has(b) || (N.delete(b), v = !0);
    v && l(N);
  }, [n, c]);
  const [p, u] = S({}), m = ce(/* @__PURE__ */ new Set());
  re(() => {
    for (const f of n)
      m.current.has(f.runId) || (m.current.add(f.runId), La(f.pipelineId, f.runId).then((v) => {
        v && u((N) => ({
          ...N,
          [f.runId]: { context: v.context, steps: v.steps }
        }));
      }));
  }, [n]);
  const h = q(() => {
    const f = /* @__PURE__ */ new Map(), v = [];
    for (const N of n) {
      const b = `${N.runId}::${N.stepId}`;
      if (c.has(b)) continue;
      let w = f.get(N.pipelineId);
      w === void 0 && (w = lt(N.pipelineId), f.set(N.pipelineId, w));
      const y = w?.name ?? (N.pipelineId ? `Pipeline ${N.pipelineId.slice(0, 8)}` : "Unknown pipeline"), k = p[N.runId]?.context ?? d[N.runId]?.context, C = p[N.runId]?.steps;
      v.push({ ...N, pipelineName: y, runContext: k, runSteps: C });
    }
    return v;
  }, [n, c, d, p]), g = O(
    (f, v, N, b, w) => {
      s(v, N, b, w || void 0), l((y) => {
        const k = new Set(y);
        return k.add(`${v}::${N}`), k;
      }), fetch(`/api/pipelines/${encodeURIComponent(v)}/approvals`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: N, decision: b, ...w ? { comment: w } : {} })
      }).catch((y) => {
        console.error("[approvals] POST failed", y);
      }), t(`/pipelines/${f}/runs/${v}`);
    },
    [s, t]
  ), x = h.length;
  return /* @__PURE__ */ o("div", { "data-testid": "pending-approvals-page", className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-[inherit]", children: [
    /* @__PURE__ */ e("div", { className: "h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]", children: /* @__PURE__ */ o("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "text-lg font-bold text-text-primary", children: "Pending approvals" }),
      /* @__PURE__ */ e(le, { "data-testid": "pending-count", tone: x > 0 ? "warning" : "neutral", size: "sm", children: x })
    ] }) }),
    /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto p-5", children: [
      i ? /* @__PURE__ */ o("div", { "data-testid": "approvals-error", role: "alert", className: "px-4 py-3 bg-[#fef2f2] border border-[#dc2626] text-[#dc2626] rounded-lg flex items-center justify-between gap-3 mb-4", children: [
        /* @__PURE__ */ e("span", { className: "text-[13px] font-medium", children: "Couldn't load pending approvals. Try again." }),
        /* @__PURE__ */ e("button", { "data-testid": "approvals-retry", onClick: a, className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[#dc2626] border border-[#dc2626] rounded-md cursor-pointer font-[inherit]", children: "Retry" })
      ] }) : null,
      r && x === 0 ? /* @__PURE__ */ o("div", { "data-testid": "approvals-loading", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: [
        /* @__PURE__ */ e(gn, { height: 140 }),
        /* @__PURE__ */ e(gn, { height: 140 }),
        /* @__PURE__ */ e(gn, { height: 140 })
      ] }) : x === 0 && !i ? /* @__PURE__ */ e(
        je,
        {
          icon: "✋",
          title: "No pending approvals",
          body: "When a pipeline reaches an approval step, it'll show up here.",
          testId: "approvals-empty"
        }
      ) : /* @__PURE__ */ e("div", { "data-testid": "approvals-list", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: h.map((f) => /* @__PURE__ */ e(
        ph,
        {
          row: f,
          onOpenPipeline: () => t(`/pipelines/${f.pipelineId}`),
          onSubmit: (v, N) => g(f.pipelineId, f.runId, f.stepId, v, N)
        },
        `${f.runId}:${f.stepId}`
      )) })
    ] })
  ] });
}
function ff({
  status: t,
  result: n,
  runId: r,
  endpointLabel: i,
  error: a,
  latencyMs: s,
  onOpen: d,
  className: c
}) {
  const l = i ?? n?.model?.endpointId ?? "vision-model", p = s ?? n?.model?.latencyMs, u = n?.caption, m = (n?.tags ?? []).slice(0, 5), h = /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ e("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: l }),
      t === "running" ? /* @__PURE__ */ o(le, { tone: "info", size: "sm", children: [
        /* @__PURE__ */ e("span", { className: "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" }),
        " running"
      ] }) : t === "completed" ? /* @__PURE__ */ e(le, { tone: "success", size: "sm", children: "ok" }) : /* @__PURE__ */ e(le, { tone: "danger", size: "sm", children: "failed" }),
      typeof p == "number" ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        p.toFixed(0),
        "ms"
      ] }) : null,
      r ? /* @__PURE__ */ e("span", { className: "ml-auto truncate font-mono text-[10px] text-text-tertiary", children: r }) : null
    ] }),
    t === "failed" && a ? /* @__PURE__ */ e("p", { className: "text-[13px] text-danger-fg", children: a }) : /* @__PURE__ */ e("p", { className: "line-clamp-2 text-left text-[13px] text-text-primary", children: u ?? (t === "running" ? "Analyzing image…" : "No caption produced.") }),
    m.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: m.map((x) => /* @__PURE__ */ o(le, { tone: "neutral", size: "sm", children: [
      "#",
      x
    ] }, x)) }) : null
  ] }), g = I(
    "flex w-full flex-col gap-1.5 rounded-lg border bg-surface p-3 text-sm text-left",
    t === "running" ? "border-primary-border ring-1 ring-primary" : t === "failed" ? "border-danger-border" : "border-border"
  );
  if (d) {
    const x = u ? u.slice(0, 60) : "no caption";
    return /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: d,
        "aria-label": `Open vision result: ${l}, ${t}, ${x}`,
        className: I(
          g,
          "cursor-pointer transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
          c
        ),
        children: h
      }
    );
  }
  return /* @__PURE__ */ e("article", { className: I(g, c), children: h });
}
function gf(t = {}) {
  const { maxRecords: n = 50, runId: r } = t, [i, a] = S([]), s = ce(/* @__PURE__ */ new Map()), d = ce(!0);
  return re(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Be("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.image.vision.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const m = `${u.runId}::${u.stepId}`;
    a((h) => {
      const g = s.current.get(m), x = typeof u.at == "number" ? u.at : Date.now(), f = (v) => {
        if (typeof g == "number" && g >= 0 && g < h.length) {
          const w = h.slice();
          return w[g] = { ...h[g], ...v }, w;
        }
        const N = [v, ...h];
        N.length > n && (N.length = n);
        const b = /* @__PURE__ */ new Map();
        return N.forEach((w, y) => b.set(`${w.runId}::${w.stepId}`, y)), s.current = b, N;
      };
      if (p === "pipeline.image.vision.started")
        return f({
          runId: u.runId,
          stepId: u.stepId,
          status: "running",
          endpointId: u.endpointId,
          startedAt: x
        });
      if (p === "pipeline.image.vision.completed") {
        const v = typeof g == "number" ? h[g] : void 0;
        return f({
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
        return f({
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
  }), q(() => i, [i]);
}
function uh(t) {
  return t === "pass" ? "success" : t === "fail" ? "danger" : "warning";
}
function mh({ result: t, className: n }) {
  const r = uh(t.overallVerdict), i = r === "success" ? "PASS" : r === "danger" ? "FAIL" : "INCONCLUSIVE", a = t.rubricSnapshot.passThreshold ?? 0.5;
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
            t.rubricSnapshot.id,
            " v",
            t.rubricSnapshot.version
          ] }),
          /* @__PURE__ */ o(le, { tone: r, size: "sm", children: [
            i,
            " · ",
            t.overallVerdict
          ] }),
          /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-tertiary", children: t.model }),
          /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: "·" }),
          /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
            "mode: ",
            t.mode
          ] }),
          typeof t.confidence == "number" ? /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
            "confidence ",
            (t.confidence * 100).toFixed(0),
            "%"
          ] }) : null
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-medium uppercase text-text-tertiary", children: "overall" }),
          /* @__PURE__ */ e(
            sr,
            {
              value: t.overallScore,
              threshold: a,
              tone: r === "warning" ? "warning" : r,
              size: "lg",
              ariaLabel: `Overall judge score ${(t.overallScore * 100).toFixed(0)}% — ${i}`
            }
          )
        ] })
      ]
    }
  );
}
function hh({ result: t, className: n }) {
  if (!t.criteria || t.criteria.length === 0) return null;
  const r = /* @__PURE__ */ new Map();
  for (const i of t.rubricSnapshot.criteria) r.set(i.id, i);
  return /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", n), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Criteria (",
      t.criteria.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1.5", children: t.criteria.map((i) => /* @__PURE__ */ e(fh, { score: i, def: r.get(i.criterionId) }, i.criterionId)) })
  ] });
}
function fh({
  score: t,
  def: n
}) {
  const r = t.passed ? "success" : "danger", i = t.passed ? "PASS" : "FAIL", a = n?.scale ?? "0-1";
  return /* @__PURE__ */ o("li", { className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2.5", children: [
    /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-1.5", children: [
      /* @__PURE__ */ e("span", { className: "font-mono text-[11px] font-semibold text-text-primary", children: t.criterionId }),
      /* @__PURE__ */ o("span", { className: "font-mono text-[10px] uppercase text-text-tertiary", children: [
        "[",
        a,
        "]"
      ] }),
      /* @__PURE__ */ e(le, { tone: r, size: "sm", children: i }),
      /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
        "raw: ",
        String(t.rawScore)
      ] })
    ] }),
    /* @__PURE__ */ e(
      sr,
      {
        value: t.score,
        threshold: n?.failThreshold ?? 0.5,
        tone: r,
        size: "sm",
        ariaLabel: `Criterion ${t.criterionId} score ${(t.score * 100).toFixed(0)}% — ${i}`
      }
    ),
    n?.prompt ? /* @__PURE__ */ o("p", { className: "text-[12px] italic leading-snug text-text-tertiary", children: [
      "“",
      n.prompt,
      "”"
    ] }) : null,
    t.rationale ? /* @__PURE__ */ e("p", { className: "text-[13px] leading-snug text-text-primary", children: t.rationale }) : null
  ] });
}
const ma = ba(null);
function xf({ value: t, children: n }) {
  return /* @__PURE__ */ e(ma.Provider, { value: t, children: n });
}
function ha() {
  return dn(ma);
}
function bf({
  result: t,
  showVerdict: n = !0,
  showCriteria: r = !0,
  showMetadata: i = !0,
  showRawText: a = !1,
  className: s
}) {
  const d = ha(), [c, l] = S(!1), [p, u] = S(null), [m, h] = S(!1), [g, x] = S(null), f = ce(!0);
  re(() => (f.current = !0, () => {
    f.current = !1;
  }), []), re(() => {
    c && (t.rawModelText || p === null && (m || t.rawTextTruncated && d && (h(!0), (async () => {
      try {
        const b = await d.fetchRawText(t.judgmentId);
        if (!f.current) return;
        u(b ?? ""), x(null);
      } catch (b) {
        if (!f.current) return;
        x(b instanceof Error ? b : new Error(String(b)));
      } finally {
        f.current && h(!1);
      }
    })())));
  }, [c, t.rawModelText, t.rawTextTruncated, t.judgmentId, d, p, m]);
  const v = t.rawModelText ?? p ?? null, N = !!t.rawModelText || !!t.rawTextTruncated;
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-3 text-text-primary", s), children: [
    n ? /* @__PURE__ */ e(mh, { result: t }) : null,
    r ? /* @__PURE__ */ e(hh, { result: t }) : null,
    i ? /* @__PURE__ */ o("section", { className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
      /* @__PURE__ */ o("span", { children: [
        "tokens ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: t.tokensIn }),
        " in /",
        " ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: t.tokensOut }),
        " out"
      ] }),
      t.cacheReadTokens && t.cacheReadTokens > 0 ? /* @__PURE__ */ o(K, { children: [
        /* @__PURE__ */ e("span", { children: "·" }),
        /* @__PURE__ */ o("span", { children: [
          "cache ",
          /* @__PURE__ */ e("span", { className: "font-mono", children: t.cacheReadTokens }),
          " read"
        ] })
      ] }) : null,
      /* @__PURE__ */ e("span", { children: "·" }),
      /* @__PURE__ */ o("span", { children: [
        "latency ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: t.latencyMs }),
        "ms"
      ] }),
      /* @__PURE__ */ e("span", { children: "·" }),
      /* @__PURE__ */ o("span", { children: [
        "cost ",
        /* @__PURE__ */ o("span", { className: "font-mono", children: [
          "$",
          t.costUsd.toFixed(4)
        ] })
      ] }),
      /* @__PURE__ */ e("span", { className: "ml-auto font-mono", children: t.judgedAt })
    ] }) : null,
    a && N ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
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
      c ? /* @__PURE__ */ e(
        gh,
        {
          text: v,
          loading: m,
          error: g,
          fallbackHint: t.rawTextTruncated && !d ? "Raw text was spilled to S3 but no JudgmentApi provider is wired." : null
        }
      ) : null
    ] }) : null
  ] });
}
function gh({
  text: t,
  loading: n,
  error: r,
  fallbackHint: i
}) {
  return n ? /* @__PURE__ */ e("div", { className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary", children: "Loading raw text…" }) : r ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-state-failed bg-danger-bg p-2 text-[11px] text-text-primary", children: [
    "Failed to fetch raw text: ",
    r.message
  ] }) : t === null || t.length === 0 ? /* @__PURE__ */ e("div", { className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary", children: i ?? "Raw text not available." }) : /* @__PURE__ */ e("pre", { className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary", children: t });
}
function yf({ aggregate: t, className: n }) {
  const r = t.numJudgments > 0 ? t.numPassed / t.numJudgments : 0, i = t.numJudgments > 0 ? t.sumOverallScore / t.numJudgments : 0, a = r >= 0.9 ? "success" : r >= 0.6 ? "warning" : "danger", s = a === "success" ? "HEALTHY" : a === "warning" ? "MIXED" : "FAILING";
  return /* @__PURE__ */ o(
    "section",
    {
      className: I(
        "flex flex-col gap-2 rounded-lg border border-border bg-surface p-3",
        n
      ),
      children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ e("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: t.dayBucket }),
          /* @__PURE__ */ o(le, { tone: a, size: "sm", children: [
            s,
            " · ",
            (r * 100).toFixed(0),
            "% pass"
          ] }),
          /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
            t.numJudgments,
            " judgments"
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-medium uppercase text-text-tertiary", children: "mean score" }),
          /* @__PURE__ */ e(
            sr,
            {
              value: i,
              tone: a === "warning" ? "warning" : a,
              size: "md",
              ariaLabel: `Mean score ${(i * 100).toFixed(0)}% across ${t.numJudgments} judgments`
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
          /* @__PURE__ */ o("span", { children: [
            "tokens ",
            /* @__PURE__ */ e("span", { className: "font-mono", children: t.sumTokensIn }),
            " in /",
            " ",
            /* @__PURE__ */ e("span", { className: "font-mono", children: t.sumTokensOut }),
            " out"
          ] }),
          /* @__PURE__ */ e("span", { children: "·" }),
          /* @__PURE__ */ o("span", { children: [
            "cost ",
            /* @__PURE__ */ o("span", { className: "font-mono", children: [
              "$",
              t.sumCostUsd.toFixed(4)
            ] })
          ] }),
          typeof t.minOverallScore == "number" && typeof t.maxOverallScore == "number" ? /* @__PURE__ */ o(K, { children: [
            /* @__PURE__ */ e("span", { children: "·" }),
            /* @__PURE__ */ o("span", { children: [
              "range ",
              /* @__PURE__ */ e("span", { className: "font-mono", children: t.minOverallScore.toFixed(2) }),
              "–",
              /* @__PURE__ */ e("span", { className: "font-mono", children: t.maxOverallScore.toFixed(2) })
            ] })
          ] }) : null,
          /* @__PURE__ */ e("span", { children: "·" }),
          /* @__PURE__ */ o("span", { className: "font-mono", children: [
            t.numPassed,
            " pass / ",
            t.numFailed,
            " fail"
          ] })
        ] })
      ]
    }
  );
}
function vf({
  aggregates: t,
  sortOrder: n = "desc",
  caption: r,
  loading: i = !1,
  className: a
}) {
  const s = q(() => {
    const m = t.slice();
    return m.sort((h, g) => h.dayBucket.localeCompare(g.dayBucket)), n === "desc" && m.reverse(), m;
  }, [t, n]), d = q(() => t.slice().sort((h, g) => h.dayBucket.localeCompare(g.dayBucket)).map((h) => h.numJudgments > 0 ? h.numPassed / h.numJudgments : 0), [t]);
  if (t.length === 0)
    return /* @__PURE__ */ e(
      "section",
      {
        className: I(
          "flex min-h-[120px] w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-surface-panel p-4 text-text-tertiary",
          a
        ),
        children: /* @__PURE__ */ e("span", { className: "text-[12px]", children: i ? "Loading trends…" : "No judgment activity in range." })
      }
    );
  const c = t.reduce((m, h) => m + h.numJudgments, 0), l = t.reduce((m, h) => m + h.numPassed, 0), p = t.reduce((m, h) => m + h.sumCostUsd, 0), u = c > 0 ? l / c : 0;
  return /* @__PURE__ */ o("section", { className: I("flex w-full flex-col gap-2", a), children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: r ?? `Judgment trend — ${t.length} days` }),
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
      /* @__PURE__ */ e("span", { className: "text-[11px] font-medium uppercase text-text-tertiary", children: "pass-rate" }),
      /* @__PURE__ */ e(
        Ja,
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
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { className: "text-left text-[11px] uppercase tracking-wide text-text-tertiary", children: [
        /* @__PURE__ */ e("th", { scope: "col", className: "py-1 pr-2", children: "date" }),
        /* @__PURE__ */ e("th", { scope: "col", className: "py-1 pr-2", children: "pass" }),
        /* @__PURE__ */ e("th", { scope: "col", className: "py-1 pr-2", children: "mean" }),
        /* @__PURE__ */ e("th", { scope: "col", className: "py-1 pr-2 text-right", children: "judgments" }),
        /* @__PURE__ */ e("th", { scope: "col", className: "py-1 pl-2 text-right", children: "cost" })
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: s.map((m) => /* @__PURE__ */ e(xh, { row: m }, m.aggregateKey)) })
    ] })
  ] });
}
function xh({ row: t }) {
  const n = t.numJudgments > 0 ? t.numPassed / t.numJudgments : 0, r = t.numJudgments > 0 ? t.sumOverallScore / t.numJudgments : 0, i = n >= 0.9 ? "success" : n >= 0.6 ? "warning" : "danger";
  return /* @__PURE__ */ o("tr", { className: "border-t border-border", children: [
    /* @__PURE__ */ e("td", { className: "py-1 pr-2 font-mono", children: t.dayBucket }),
    /* @__PURE__ */ e("td", { className: "py-1 pr-2", children: /* @__PURE__ */ o(le, { tone: i, size: "sm", children: [
      (n * 100).toFixed(0),
      "%"
    ] }) }),
    /* @__PURE__ */ o("td", { className: "py-1 pr-2 font-mono", children: [
      (r * 100).toFixed(0),
      "%"
    ] }),
    /* @__PURE__ */ e("td", { className: "py-1 pr-2 text-right font-mono", children: t.numJudgments }),
    /* @__PURE__ */ o("td", { className: "py-1 pl-2 text-right font-mono", children: [
      "$",
      t.sumCostUsd.toFixed(4)
    ] })
  ] });
}
function bh(t) {
  if (typeof t == "number") return t;
  if (typeof t == "string") {
    const n = Date.parse(t);
    if (Number.isFinite(n)) return n;
  }
  return Date.now();
}
function Nf(t = {}) {
  const { maxRecords: n = 50, runId: r } = t, [i, a] = S([]), s = ce(/* @__PURE__ */ new Map()), d = ce(!0);
  return re(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Be("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.judge.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const m = `${u.runId}::${u.stepId}`;
    a((h) => {
      const g = s.current.get(m), x = bh(u.at), f = (v) => {
        if (typeof g == "number" && g >= 0 && g < h.length) {
          const w = h.slice();
          return w[g] = { ...h[g], ...v }, w;
        }
        const N = [v, ...h];
        N.length > n && (N.length = n);
        const b = /* @__PURE__ */ new Map();
        return N.forEach((w, y) => b.set(`${w.runId}::${w.stepId}`, y)), s.current = b, N;
      };
      if (p === "pipeline.judge.started")
        return f({
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
        return f({
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
        return f({
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
        return f({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? v?.pipelineId,
          status: "budget-exceeded",
          completedAt: x
        });
      }
      return h;
    });
  }), q(() => i, [i]);
}
function wf(t) {
  const n = ha(), [r, i] = S([]), [a, s] = S(!1), [d, c] = S(null), l = ce(!0), p = ce(() => {
  }), { pipelineId: u, rubricId: m, since: h, until: g, limit: x, refreshIntervalMs: f = 0, paused: v = !1 } = t, N = `${u ?? ""}|${m ?? ""}|${h ?? ""}|${g ?? ""}|${x ?? ""}|${v ? "1" : "0"}`;
  return re(() => (l.current = !0, () => {
    l.current = !1;
  }), []), re(() => {
    if (!n) {
      i([]), s(!1), c(null);
      return;
    }
    if (v) return;
    if (!u && !m) {
      c(new Error("useJudgmentAggregates: one of pipelineId or rubricId is required")), s(!1);
      return;
    }
    let b = !1;
    const w = async () => {
      s(!0);
      try {
        const y = await n.fetchAggregates({
          ...u ? { pipelineId: u } : {},
          ...m ? { rubricId: m } : {},
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
      w();
    }, w(), f > 0) {
      const y = setInterval(() => {
        w();
      }, f);
      return () => {
        b = !0, clearInterval(y);
      };
    }
    return () => {
      b = !0;
    };
  }, [n, N, f]), {
    aggregates: r,
    loading: a,
    error: d,
    reload: () => p.current()
  };
}
const yh = 100, vh = 500, fa = 148, ga = 116, Nh = 56, wh = 20;
function kh(t) {
  const n = new Map(t.map((l) => [l.imageId, l])), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const l of t)
    if (l.parentImageId) {
      const p = i.get(l.parentImageId) ?? [];
      p.push(l.imageId), i.set(l.parentImageId, p);
    }
  const a = [];
  for (const l of t)
    (!l.parentImageId || !n.has(l.parentImageId)) && (r.set(l.imageId, 0), a.push(l.imageId));
  let s = 0;
  for (; s < a.length; ) {
    const l = a[s++], p = r.get(l) ?? 0;
    for (const u of i.get(l) ?? []) {
      const m = r.get(u) ?? -1;
      p + 1 > m && (r.set(u, p + 1), a.push(u));
    }
  }
  const d = /* @__PURE__ */ new Map();
  for (const [l, p] of r.entries()) {
    const u = d.get(p) ?? [];
    u.push(l), d.set(p, u);
  }
  const c = /* @__PURE__ */ new Map();
  for (const [l, p] of d.entries()) {
    const u = l * (fa + Nh);
    p.forEach((m, h) => {
      c.set(m, {
        x: u,
        y: h * (ga + wh)
      });
    });
  }
  return c;
}
function Ch(t, n) {
  const r = new Map(n.map((s) => [s.imageId, s])), i = /* @__PURE__ */ new Set(), a = [t];
  for (; a.length; ) {
    const s = a.shift();
    if (i.has(s)) continue;
    i.add(s);
    const d = r.get(s);
    d?.parentImageId && a.push(d.parentImageId);
  }
  return i;
}
function Ih({ src: t, alt: n, testId: r }) {
  const i = ce(null), [a, s] = S(!1);
  return re(() => {
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
  }, []), /* @__PURE__ */ e(
    "div",
    {
      ref: i,
      className: "w-full h-full flex items-center justify-center bg-surface-inset",
      children: a ? /* @__PURE__ */ e(
        "img",
        {
          src: t,
          alt: n,
          className: "w-full h-full object-cover",
          loading: "lazy",
          "data-testid": r
        }
      ) : /* @__PURE__ */ e(
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
function Sh({ data: t }) {
  const { entry: n, highlighted: r, selected: i, onSelect: a, getImageUrl: s } = t, d = n.width && n.height ? `${n.width}×${n.height}` : "", c = n.producedByNodeKind;
  return /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: "w-2 h-2 bg-border-emphasis" }),
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
          /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 overflow-hidden bg-surface-inset flex items-center justify-center", children: /* @__PURE__ */ e(
            Ih,
            {
              src: s(n.imageId),
              alt: `Artifact ${n.imageId.slice(0, 8)}`,
              testId: `lineage-thumb-${n.imageId}`
            }
          ) }),
          /* @__PURE__ */ o("div", { className: "px-1.5 py-1 flex flex-col gap-0.5 flex-shrink-0", children: [
            /* @__PURE__ */ e(
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
            d && /* @__PURE__ */ e("span", { className: "text-[9px] text-text-tertiary font-mono", children: d })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: "w-2 h-2 bg-border-emphasis" })
  ] });
}
const $h = { lineageNode: Sh };
function Th() {
  return /* @__PURE__ */ e(
    "div",
    {
      className: "flex items-center justify-center h-full text-text-tertiary text-sm",
      "data-testid": "lineage-graph-empty",
      children: "No image artifacts produced by this run."
    }
  );
}
function Rh(t, n) {
  if (t.length <= n) return t;
  const r = t.map((i, a) => ({ e: i, i: a }));
  return r.sort((i, a) => {
    const s = Date.parse(i.e.at), d = Date.parse(a.e.at);
    return d !== s ? d - s : a.i - i.i;
  }), r.slice(0, n).map((i) => i.e);
}
function zn(t) {
  return t.length > 10 ? `${t.slice(0, 8)}…` : t;
}
function Ph({
  navEntries: t,
  imageId: n,
  onClose: r,
  onNavigate: i,
  getImageUrl: a
}) {
  const s = t.find((u) => u.imageId === n), [d, c] = S(!1);
  re(() => {
    c(!1);
  }, [n]), re(() => {
    const u = (m) => {
      if (m.key !== "ArrowRight" && m.key !== "ArrowLeft" || t.length === 0) return;
      const h = t.findIndex((f) => f.imageId === n);
      if (h === -1) return;
      const g = t.length, x = m.key === "ArrowRight" ? (h + 1) % g : (h - 1 + g) % g;
      m.preventDefault(), i(t[x].imageId);
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [n, t, i]);
  const l = O(() => {
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
  return /* @__PURE__ */ e(
    Ge,
    {
      open: !0,
      onClose: r,
      title: `Artifact ${zn(s.imageId)}`,
      maxWidth: 760,
      rawChildren: !0,
      backdropTestId: "lineage-preview-backdrop",
      footer: /* @__PURE__ */ e(
        Me,
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
            /* @__PURE__ */ e(
              "div",
              {
                className: I(
                  "flex items-center justify-center bg-surface-inset rounded-md overflow-hidden",
                  "max-h-[70vh] min-h-[200px]"
                ),
                children: /* @__PURE__ */ e(
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
                    zn(s.imageId)
                  ] }),
                  /* @__PURE__ */ e(
                    gt,
                    {
                      "aria-label": d ? "Image id copied" : "Copy image id",
                      size: "sm",
                      variant: "ghost",
                      onClick: l,
                      "data-testid": "lineage-preview-copy",
                      children: d ? "✓" : "⧉"
                    }
                  ),
                  s.mimeType && /* @__PURE__ */ e(le, { tone: "info", size: "sm", children: s.mimeType }),
                  p && /* @__PURE__ */ e(le, { tone: "neutral", size: "sm", mono: !0, children: p }),
                  /* @__PURE__ */ o(le, { tone: "purple", size: "sm", mono: !0, title: s.producedByStepId, children: [
                    "step: ",
                    zn(s.producedByStepId)
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
function kf({
  entries: t,
  selectedImageId: n,
  onSelect: r,
  maxRenderedNodes: i = yh
}) {
  const a = Re(), [s, d] = S(!1), [c, l] = S(!1), [p, u] = S(null), m = t.length, h = !s && m > i, g = q(
    () => h ? Rh(t, i) : t,
    [t, h, i]
  ), x = q(
    () => n ? Ch(n, g) : /* @__PURE__ */ new Set(),
    [n, g]
  ), f = q(() => kh(g), [g]), v = O(
    (J) => {
      r?.(J), u(J);
    },
    [r]
  ), N = q(
    () => g.map((J) => {
      const Q = f.get(J.imageId) ?? { x: 0, y: 0 };
      return {
        id: J.imageId,
        type: "lineageNode",
        position: Q,
        data: {
          entry: J,
          highlighted: x.has(J.imageId),
          selected: J.imageId === n,
          onSelect: v,
          getImageUrl: a
        },
        style: { width: fa, height: ga }
      };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [g, n, x, v, a]
  ), b = q(
    () => new Set(g.map((J) => J.imageId)),
    [g]
  ), w = q(
    () => g.filter(
      (J) => J.parentImageId && b.has(J.parentImageId)
    ).map((J) => ({
      id: `${J.parentImageId}->${J.imageId}`,
      source: J.parentImageId,
      target: J.imageId,
      sourceHandle: "out",
      targetHandle: "in",
      className: x.has(J.imageId) && x.has(J.parentImageId) ? "stroke-primary stroke-2" : "stroke-border"
    })),
    [g, b, x]
  ), [y, , k] = jo(N), [C, , $] = zo(w), D = O(
    (J, Q) => {
      v(Q.id);
    },
    [v]
  ), A = O(() => {
    m > vh ? l(!0) : d(!0);
  }, [m]), M = O(() => {
    d(!0), l(!1);
  }, []), ne = O(() => {
    l(!1);
  }, []), R = q(() => {
    const J = g.slice();
    return J.sort((Q, E) => {
      const P = Date.parse(Q.at), G = Date.parse(E.at);
      return P !== G ? P - G : Q.imageId.localeCompare(E.imageId);
    }), J;
  }, [g]), H = O(() => u(null), []), X = O(
    (J) => u(J),
    []
  );
  return m === 0 ? /* @__PURE__ */ e(Th, {}) : /* @__PURE__ */ o(
    "div",
    {
      className: "relative w-full h-full flex flex-col",
      "data-testid": "lineage-graph",
      children: [
        h && /* @__PURE__ */ e("div", { className: "p-2 flex-shrink-0", children: /* @__PURE__ */ o(
          nt,
          {
            variant: "info",
            "data-testid": "lineage-graph-clip-banner",
            children: [
              /* @__PURE__ */ o("span", { className: "flex-1", children: [
                "Showing ",
                g.length,
                " of ",
                m,
                " artifacts"
              ] }),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: A,
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
          /* @__PURE__ */ e("style", { children: ".react-flow__node { position: absolute; }" }),
          /* @__PURE__ */ o(
            qo,
            {
              nodes: y,
              edges: C,
              onNodesChange: k,
              onEdgesChange: $,
              onNodeClick: D,
              nodeTypes: $h,
              fitView: !0,
              fitViewOptions: { padding: 0.2 },
              minZoom: 0.3,
              maxZoom: 2,
              onlyRenderVisibleElements: !0,
              proOptions: { hideAttribution: !0 },
              children: [
                /* @__PURE__ */ e(Wo, { gap: 16, size: 1, className: "bg-surface-inset" }),
                /* @__PURE__ */ e(Vo, { showInteractive: !1, className: "bg-surface border border-border rounded" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e(
          ln,
          {
            open: c,
            onConfirm: M,
            onCancel: ne,
            title: "Show all artifacts?",
            body: `Rendering all ${m} artifacts may slow down the lineage tab. Continue?`,
            confirmLabel: "Show all",
            tone: "caution"
          }
        ),
        p && /* @__PURE__ */ e(
          Ph,
          {
            navEntries: R,
            imageId: p,
            onClose: H,
            onNavigate: X,
            getImageUrl: a
          }
        )
      ]
    }
  );
}
const Vt = /* @__PURE__ */ new Map(), Ah = 6e4;
function Mo(t) {
  const n = Vt.get(t);
  return n ? Date.now() - n.fetchedAt > Ah ? (Vt.delete(t), null) : n.entries : null;
}
function Mh(t, n) {
  Vt.set(t, { entries: n, fetchedAt: Date.now() });
}
function Cf() {
  Vt.clear();
}
function If(t, n) {
  const [r, i] = S(() => t ? Mo(t) ?? [] : []), [a, s] = S(!1), [d, c] = S(null), l = ce(0), p = O(() => {
    if (!t || !n) return;
    const m = Mo(t);
    if (m) {
      i(m), s(!1), c(null);
      return;
    }
    const h = ++l.current;
    s(!0), c(null);
    const g = `/api/pipeline/runs/${encodeURIComponent(t)}/image-lineage?pipelineId=${encodeURIComponent(n)}`;
    fetch(g, {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    }).then(async (x) => {
      if (h !== l.current) return;
      if (!x.ok) {
        const N = `image-lineage: ${x.status} ${x.statusText}`;
        c(N), s(!1);
        return;
      }
      const f = await x.json();
      if (h !== l.current) return;
      const v = Array.isArray(f.entries) ? f.entries : [];
      Mh(t, v), i(v), s(!1);
    }).catch((x) => {
      h === l.current && (c(x instanceof Error ? x.message : String(x)), s(!1));
    });
  }, [t, n]), u = O(() => {
    t && Vt.delete(t), p();
  }, [t, p]);
  return re(() => {
    p();
  }, [p]), { entries: r, loading: a, error: d, refetch: u };
}
export {
  bi as ActionNode,
  Nd as AdjustBwConfig,
  Hi as AdjustBwNode,
  Od as AdjustLayerConfig,
  Gi as AdjustLayerNode,
  Mi as AgUiOutputNode,
  Ii as AgentNode,
  yf as AggregateSummaryCard,
  uf as AllRunsPage,
  bs as AnimatedEdge,
  Ci as ApprovalNode,
  be as BaseNode,
  $p as CaptionPanel,
  gi as ConditionNode,
  hn as ContextVariablePicker,
  hh as CriteriaPanel,
  yd as CropConfig,
  Ki as CropNode,
  Ld as DimensionsConfig,
  Yi as DimensionsNode,
  bp as EditPromptConfig,
  hs as EditPromptNode,
  Op as EditRecommendationsPanel,
  Mf as EventStreamProvider,
  yi as ForkNode,
  ad as FormatConvertConfig,
  zi as FormatConvertNode,
  pp as GenerateConfig,
  cs as GenerateNode,
  Ti as GraphQueryNode,
  Pi as GuardrailNode,
  kf as ImageLineageGraph,
  vp as ImageSourceConfig,
  Oi as ImageSourceNode,
  Rp as ImageWithBBoxOverlay,
  wi as JoinNode,
  xf as JudgmentApiProvider,
  bf as JudgmentResultViewer,
  vf as JudgmentTrendChart,
  $i as KnowledgeBaseNode,
  ui as LLMNode,
  Si as McpToolNode,
  Ri as MemoryNode,
  ii as NODE_CATEGORIES,
  of as NODE_TYPES_WITHOUT_CONFIG,
  Es as NodePalette,
  mn as NodeThumbStrip,
  Mp as ObjectsPanel,
  Ts as PALETTE_ITEMS,
  si as PORT_CLS,
  hf as PendingApprovalsPage,
  Ap as PeoplePanel,
  Ys as PipelineCanvas,
  nr as PipelineEditorContext,
  af as PipelineEditorPage,
  Bo as PipelineEditorProvider,
  Tf as PipelineEditorServicesProvider,
  Rf as PipelineNodeRuntimeProvider,
  df as PipelineRunComparePage,
  pf as PipelineRunDiff,
  cf as PipelineRunReplayPage,
  lf as PipelineRunsPage,
  Da as PipelineRunsProvider,
  mf as PipelineStatsPage,
  sf as PipelinesPage,
  Ai as PolicyNode,
  Gc as ResizeConfig,
  Bi as ResizeNode,
  wp as SaveConfig,
  Ei as SaveNode,
  Kc as ScatterConfig,
  Li as ScatterNode,
  sd as SharpenConfig,
  qi as SharpenNode,
  Dp as TagsPanel,
  td as TransformGeoConfig,
  Fi as TransformGeoNode,
  hi as TransformNode,
  ci as TriggerNode,
  Fd as UpscaleConfig,
  Xi as UpscaleNode,
  fp as VariationConfig,
  ps as VariationNode,
  mh as VerdictPanel,
  Yd as VisionClassifyConfig,
  rs as VisionClassifyNode,
  Kd as VisionConfig,
  ep as VisionDescribeConfig,
  os as VisionDescribeNode,
  lp as VisionExtractTextConfig,
  is as VisionExtractTextNode,
  ns as VisionNode,
  Ep as VisionResultViewer,
  ff as VisionRunCard,
  op as VisionTagConfig,
  as as VisionTagNode,
  dd as WatermarkConfig,
  Wi as WatermarkNode,
  hc as availableContextPaths,
  xc as availableImageRefs,
  ge as categoryFor,
  Cf as clearImageLineageCache,
  Mr as contextContributions,
  Pp as imageOverlayPropsFrom,
  fs as nodeTypes,
  F as portCls,
  rf as recordRecentType,
  fc as unresolvedTemplatePaths,
  Kn as upstreamNodeIds,
  Be as useEventStream,
  Ga as useEventStreamContext,
  If as useImageLineage,
  Re as useImageUrl,
  Oo as useIsNodeTypeExecutable,
  wf as useJudgmentAggregates,
  ha as useJudgmentApi,
  Nf as useJudgmentResults,
  he as useLatestStepForNode,
  qe as usePipelineEditor,
  Eo as usePipelineEditorServices,
  Pf as usePipelineNodeRuntime,
  wt as usePipelineRuns,
  De as useRetryFromStep,
  Qe as useUpstreamContext,
  Te as useUpstreamImageRefs,
  gf as useVisionResults
};
