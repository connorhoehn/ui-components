import { jsxs as o, jsx as e, Fragment as K } from "react/jsx-runtime";
import wo, { useState as S, memo as ia, useRef as ce, useEffect as re, useMemo as q, useCallback as E, useContext as cn, createContext as sa } from "react";
import { useNavigate as We, useParams as Nt, Navigate as wt, useSearchParams as dn } from "react-router";
import { v as ko, w as he, x as Oe, q as Pe, G as Gn, y as Ve, u as kt, i as la, g as ca, f as lr, p as da, z as Yn, e as $e, A as pa, S as Qe, N as De, R as cr, J as hn, t as Co, I as Io, T as lt, B as ua, C as Xn, n as So, a as ct, D as $o, E as Qn, F as Bn, H as To, K as ma, L as ha, M as fa, b as ga, O as dt, Q as xa, U as ba, V as pt, W as dr, X as ya, j as va, o as Ro, Y as on, Z as Na, m as pr, P as wa, _ as ka, r as Ca, $ as an, l as ur, a0 as Ia, k as Sa } from "./usePendingApprovals-DB5-6o3z.js";
import { h as rf, a1 as of, a2 as af } from "./usePendingApprovals-DB5-6o3z.js";
import { Handle as B, Position as U, useNodeConnections as $a, getSmoothStepPath as Ta, EdgeLabelRenderer as mr, ReactFlowProvider as Ra, useReactFlow as Pa, useNodesState as Po, useEdgesState as Ao, ReactFlow as Mo, Background as Do, BackgroundVariant as Aa, Controls as Eo, MiniMap as Ma } from "@xyflow/react";
/* empty css               */
import { c as I } from "./cn-B6yFEsav.js";
import { b as Zn, u as pn } from "./ToastProvider-D3MHbP-u.js";
import { a as Ct, F as Da, I as Ea, C as er, U as Oa, T as _a, S as tr, b as La } from "./TrendSparkline-Bm0kEjdg.js";
import "clsx";
import "tailwind-merge";
import { M as Xe } from "./Modal-fp5zcyw8.js";
import "react-dom";
import "./WebSocketContext-DPGFyPeZ.js";
import { a as je, u as Ba } from "./EventStreamContext-CjzSHXy-.js";
import { E as lf } from "./EventStreamContext-CjzSHXy-.js";
import { B as Ee } from "./Button-Qsbxqsl9.js";
import { I as xt, F as Ua } from "./FileUploadDrop-Cmz3XANg.js";
import { B as ot } from "./Banner-DKb3JiLs.js";
import { C as le } from "./Chip-BDT8ro4h.js";
import { E as qe } from "./EmptyState-Ejc9dJA3.js";
import { u as Oo } from "./IdentityContext-CLalsm_M.js";
import { C as sn } from "./ConfirmDialog-Ix7G_Mb4.js";
import { B as ja, L as Gt } from "./Chart-ByoxeiYX.js";
import { S as fn } from "./SkeletonCard-Baj5Ynm7.js";
const Fa = {
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
}, za = {
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
function Un(t, n, r, i) {
  return !(!qa(t, n) || !Wa(r, i));
}
function qa(t, n) {
  const r = Fa[t];
  return r === "fork" ? Va(n) : r.includes(n);
}
function Wa(t, n) {
  const r = za[t];
  return r === null ? !1 : r === "join" ? Ka(n) : r.includes(n);
}
function Va(t) {
  return /^branch-(\d+)$/.exec(t) !== null;
}
function Ka(t) {
  return /^in-(\d+)$/.exec(t) !== null;
}
const Ha = {
  idle: { card: "border border-[#d1d5db] bg-white", dot: "bg-[#d1d5db]" },
  pending: { card: "border border-dashed border-[#93c5fd] bg-[#eff6ff]", dot: "bg-[#93c5fd]" },
  running: { card: "border-2 border-[#2563eb] bg-[#eff6ff]", dot: "bg-[#2563eb]" },
  awaiting: { card: "border-2 border-[#f59e0b] bg-[#fffbeb]", dot: "bg-[#f59e0b]" },
  completed: { card: "border border-[#16a34a] bg-[#f0fdf4]", dot: "bg-[#16a34a]" },
  failed: { card: "border-2 border-[#dc2626] bg-[#fef2f2]", dot: "bg-[#dc2626]" },
  skipped: { card: "border border-dashed border-[#d1d5db] bg-[#f9fafb] opacity-50", dot: "bg-[#d1d5db]" }
}, Ja = {
  source: { bar: "bg-cat-source", chip: "w-5 h-5 rounded-full bg-cat-source/15" },
  transform: { bar: "bg-cat-transform", chip: "w-5 h-5 rounded-md bg-cat-transform/15" },
  ai: { bar: "bg-cat-ai", chip: "w-5 h-5 rounded-md bg-gradient-to-br from-cat-ai/25 to-cat-ai/5" },
  control: { bar: "bg-cat-control", chip: "w-5 h-5 rounded-[4px] bg-cat-control/15 rotate-45", glyph: "-rotate-45" },
  sink: { bar: "bg-cat-sink", chip: "w-5 h-5 rounded-md bg-cat-sink/15" },
  human: { bar: "bg-cat-human", chip: "w-7 h-5 rounded-full bg-cat-human/15" }
};
function be(t) {
  const n = ko(), r = t.nodeType ? !n(t.nodeType) : !1, { icon: i, subtitle: a, state: s, body: d, footer: c, selected: l, onRetry: p, hasBreakpoint: u, pausedAtBreakpoint: m, ariaLabel: h, category: g, children: x } = t, f = Ha[s], v = g ? Ja[g] : void 0, N = Zn(), [b, w] = S(!1), y = s === "failed" && typeof p == "function", k = (M) => {
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
const Ga = {
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
  return Ga[t];
}
const Ya = {
  image: "!w-2.5 !h-2.5 !rounded-sm !bg-[#7c3aed] !border-[#6d28d9]",
  text: "!w-2.5 !h-2.5 !bg-surface-emphasis",
  data: "!w-2.5 !h-2.5 !bg-[#94a3b8]",
  control: "!w-2 !h-2 !bg-warning",
  error: "!w-2 !h-2 !bg-danger"
};
function j(t) {
  return Ya[t];
}
function hr(t) {
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
function Xa(t) {
  return t.triggerType === "schedule" ? t.schedule ? `cron: ${t.schedule}` : "No schedule set" : t.triggerType === "webhook" ? t.webhookPath ? `POST ${t.webhookPath}` : "No path set" : t.triggerType.startsWith("document.") ? t.documentTypeId ? `Doc type: ${t.documentTypeId}` : "Any document" : "Fires on user click";
}
function Qa(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Oe(), p = c === "failed" ? () => l(n) : void 0, u = `Trigger node, ${hr(r)}, state: ${c}`;
  return /* @__PURE__ */ e(
    be,
    {
      icon: "▶",
      subtitle: hr(r),
      state: c,
      category: ge("trigger"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: Xa(r) }),
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
          className: j("data")
        }
      )
    }
  );
}
function Za(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const r = t.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
function ei({ info: t }) {
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
function ti(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.llm, p = c === "running" && l?.streamOpened === !0 && (l?.tokensOut ?? 0) === 0, u = c === "running" && l !== void 0 && (l.tokensOut ?? 0) > 0, m = Oe(), h = c === "failed" ? () => m(n) : void 0, g = /* @__PURE__ */ e("span", { className: "italic", children: Za(r.userPromptTemplate) }), f = (l ? {
    response: l.response ?? "",
    tokensIn: l.tokensIn,
    tokensOut: l.tokensOut,
    streaming: u,
    streamOpening: p
  } : void 0) ?? r._llmResponse, v = f ? /* @__PURE__ */ e(ei, { info: f }) : void 0, N = (r.systemPrompt ?? "").replace(/\s+/g, " ").trim(), b = N.length === 0 ? "no system prompt" : `system prompt: ${N.length > 60 ? `${N.slice(0, 60)}…` : N}`, w = `LLM node, ${r.model || r.provider}, ${b}, state: ${c}`;
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: `${j("text")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[60%]` })
      ]
    }
  );
}
function ni(t) {
  if (!t) return "—";
  const n = t.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function ri(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Oe(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "✨",
      subtitle: r.transformType,
      state: c,
      category: ge("transform"),
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: ni(r.expression) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("data") })
      ]
    }
  );
}
function oi(t) {
  if (!t) return "—";
  const n = t.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function ai(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Oe(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "❓",
      subtitle: r.label || "condition",
      state: c,
      category: ge("condition"),
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: oi(r.expression) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "true", className: `${j("control")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "false", className: `${j("control")} !top-[60%]` })
      ]
    }
  );
}
function ii(t) {
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
function si(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Oe(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    be,
    {
      icon: "⚡",
      subtitle: r.actionType,
      state: c,
      category: ge("action"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: ii(r) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: `${j("data")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[60%]` })
      ]
    }
  );
}
function li(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Oe(), p = c === "failed" ? () => l(n) : void 0, u = Math.max(2, Math.min(8, r.branchCount ?? 2)), m = Array.from({ length: u }, (h, g) => {
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        m.map((h, g) => {
          const x = (g + 1) / (u + 1) * 100;
          return /* @__PURE__ */ e(
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
function ci(t) {
  return t.mode === "all" ? "all" : t.mode === "any" ? "any" : `${t.n ?? 1} of many`;
}
function di(t) {
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
function pi(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Oe(), p = c === "failed" ? () => l(n) : void 0, u = $a({ handleType: "target" }), m = Math.max(2, u.length + 1);
  return /* @__PURE__ */ o(
    be,
    {
      icon: "⑃",
      subtitle: ci(r),
      state: c,
      category: ge("join"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: di(r.mergeStrategy) }),
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
              className: j("control"),
              style: { top: `${x}%` }
            },
            `in-${g}`
          );
        }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("data") })
      ]
    }
  );
}
function ui(t) {
  return t.type === "role" ? `@${t.value}` : t.value;
}
function mi(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Oe(), p = c === "failed" ? () => l(n) : void 0, u = r.approvers ?? [], m = u.length, h = r.requiredCount ?? 0, g = `${m} approver${m === 1 ? "" : "s"}, ${h}/${m} required`, x = u.slice(0, 2), f = Math.max(0, u.length - 2), v = u.length === 0 ? /* @__PURE__ */ e("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: [
    x.map((N, b) => /* @__PURE__ */ e(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: ui(N)
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "approved", className: `${j("data")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "rejected", className: `${j("data")} !top-[60%]` })
      ]
    }
  );
}
function hi({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Oe(), c = n.agentName || n.agentId || "Not configured", l = `${n.protocol.toUpperCase()}${n.streaming ? " (streaming)" : ""}`;
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: `${j("data")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[60%]` })
      ]
    }
  );
}
function fi({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Oe(), c = n.toolName || "Not configured";
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: `${j("data")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[60%]` })
      ]
    }
  );
}
function gi({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Oe(), c = n.knowledgeBaseId || "Not configured", l = `Top ${n.topK} chunks${n.scoreThreshold ? ` (≥${n.scoreThreshold})` : ""}`;
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: `${j("data")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[60%]` })
      ]
    }
  );
}
function xi({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Oe(), c = n.graphId || "Not configured", l = n.query.length > 40 ? `${n.query.slice(0, 37)}...` : n.query;
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: `${j("data")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[60%]` })
      ]
    }
  );
}
function bi({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Oe(), c = `${n.mode} ${n.scope}`, l = n.namespace ? `ns: ${n.namespace}` : "No namespace";
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: `${j("data")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[60%]` })
      ]
    }
  );
}
function yi({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Oe(), c = n.label || n.guardrailId || "Not configured";
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "pass", className: `${j("control")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "block", className: `${j("control")} !top-[60%]` })
      ]
    }
  );
}
function vi({ id: t, data: n, selected: r }) {
  const i = he(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Oe(), c = n.label || n.action || "Not configured";
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "allow", className: `${j("control")} !top-[40%]` }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "deny", className: `${j("control")} !top-[60%]` })
      ]
    }
  );
}
function Ni({ id: t, data: n, selected: r }) {
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
      children: /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") })
    }
  );
}
const wi = (t) => t.stopPropagation();
function ki(t) {
  const { id: n, data: r, selected: i } = t, [a, s] = S(!1), d = he(n), c = d?.status === "cancelled" ? "failed" : d?.status, p = (r._state && r._state !== "idle" ? r._state : void 0) ?? c ?? r._state ?? "idle", u = Pe(), h = d?.images?.[0]?.imageId ?? d?.output?.imageId ?? r.imageId, g = h ? /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "aria-label": "View source image",
        className: I(
          "block w-full rounded border-none bg-transparent p-0 cursor-zoom-in",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
        ),
        onMouseDown: wi,
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
      Ct,
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
            className: j("control")
          }
        ),
        /* @__PURE__ */ e(
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
const fr = (t) => t.stopPropagation(), gr = I(
  "h-[38px] w-[38px] shrink-0 overflow-hidden rounded border border-border bg-surface-inset",
  "p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
);
function un({
  images: t,
  max: n = 4,
  "data-testid": r = "node-thumb-strip"
}) {
  const i = Pe(), [a, s] = S(null);
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
          className: gr,
          onMouseDown: fr,
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
            gr,
            "flex items-center justify-center font-mono text-[11px] font-medium text-text-secondary"
          ),
          onMouseDown: fr,
          onClick: p(c.length),
          children: [
            "+",
            l
          ]
        }
      )
    ] }),
    /* @__PURE__ */ e(
      Ct,
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
function Ci(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.images ?? [], u = a?.output?.filename ?? null, m = l.length > 0 ? /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ e(un, { images: l, "data-testid": "save-thumb-strip" }),
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
            className: j("image")
          }
        ),
        /* @__PURE__ */ e(
          B,
          {
            type: "source",
            position: U.Right,
            id: "out",
            className: j("image")
          }
        ),
        /* @__PURE__ */ e(
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
function Ii(t) {
  return t ? t.length > 40 ? `${t.slice(0, 37)}…` : t : "Not configured";
}
function Si(t) {
  const { id: n, data: r, selected: i } = t, a = he(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.output, p = Array.isArray(l?.items) ? l.items.length : null, u = /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary break-all", children: Ii(r.itemsPath ?? "") }),
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("control") })
      ]
    }
  );
}
function $i(t) {
  const { id: n, data: r, selected: i } = t, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.width != null && r.height != null ? `→ ${r.width}×${r.height}` : r.width != null ? `→ ${r.width}w` : r.height != null ? `→ ${r.height}h` : null, m = p ? /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ti(t) {
  switch (t.op) {
    case "rotate":
      return `rotate ${t.degrees}°`;
    case "flip":
      return "flip ↕";
    case "flop":
      return "flop ↔";
  }
}
function Ri(t) {
  const { id: n, data: r, selected: i } = t, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.operations ?? [], m = u.length > 0 ? u.map(Ti).join("  ›  ") : null, h = p ? /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Pi(t) {
  const n = t.format?.toUpperCase() ?? "?", r = t.lossless ? "lossless" : t.quality != null ? `q${t.quality}` : "";
  return r ? `${n} ${r}` : n;
}
function Ai(t) {
  const { id: n, data: r, selected: i } = t, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.format ? Pi(r) : null, m = p ? /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Mi(t) {
  const { id: n, data: r, selected: i } = t, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.sigma != null ? `σ ${r.sigma}` : null, m = p ? /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Di(t) {
  const { id: n, data: r, selected: i } = t, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.gravity ?? "southeast", m = r.opacity != null ? `${Math.round(r.opacity * 100)}%` : "100%", h = p ? /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ei(t) {
  if (!t) return null;
  const n = t.x + t.width, r = t.y + t.height;
  return `[${t.x},${t.y} → ${n},${r}]`;
}
function Oi(t) {
  const { id: n, data: r, selected: i } = t, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = s?.output, m = Ei(p?.bbox ?? u?.bbox), h = p ? /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("image") })
      ]
    }
  );
}
function _i(t) {
  const { id: n, data: r, selected: i } = t, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e("div", { className: "flex gap-1 w-full", children: /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[75%]` })
      ]
    }
  );
}
function Li(t) {
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
function Bi(t) {
  const { id: n, data: r, selected: i } = t, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.layers ?? [], m = p ? /* @__PURE__ */ e(
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
          children: Li(x)
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !top-[75%]` })
      ]
    }
  );
}
function Ui(t) {
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function ji(t) {
  const { id: n, data: r, selected: i } = t, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = `≤ ${r.maxEdge ?? 1024}px → 4×`, m = p ? /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Fi(t) {
  return t === 0 ? "$0" : t < 1e-3 ? "<$0.001" : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function zi(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const r = t.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
const qi = (t) => t.stopPropagation(), Wi = ia(function({ info: n }) {
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
            Fi(n.costUsd)
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
          onMouseDown: qi,
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
        Ct,
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
function Vi(t) {
  const { id: n, data: r, selected: i } = t, a = Pe(), s = he(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = Oe(), u = l === "failed" ? () => p(n) : void 0, m = /* @__PURE__ */ e("span", { className: "italic text-text-secondary text-[13px]", children: zi(r.userPrompt) }), h = s?.vision, g = l === "running" && h !== void 0 && h.tokensSeen > 0 && !h.analyzed, x = l === "running" && h !== void 0 && h.tokensSeen === 0 && !h.failure, f = h ? {
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
  } : void 0, v = f ? /* @__PURE__ */ e(Wi, { info: f }) : void 0, N = r.model || "claude-sonnet-4-6", b = r.outputSchema ? "extract" : "caption", w = `Vision node, model ${N}, mode ${b}, state: ${l}`;
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("data") })
      ]
    }
  );
}
function Ki(t) {
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Hi(t) {
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ji(t) {
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Gi(t) {
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Yi(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
const Xi = (t) => t.stopPropagation();
function Qi(t) {
  const { id: n, data: r, selected: i } = t, a = Pe(), [s, d] = S(!1), c = he(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", m = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && m.length === 0, x = (r.numImages ?? 1) > 1 || m.length > 1;
  let f;
  if (m.length > 0 && x)
    f = /* @__PURE__ */ e(un, { images: m, "data-testid": "generate-thumb-strip" });
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
          onMouseDown: Xi,
          onClick: (y) => {
            y.stopPropagation(), w && d(!0);
          },
          children: /* @__PURE__ */ e(
            Gn,
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
        Ct,
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
        children: Yi(r.prompt)
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("data") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
const Zi = (t) => t.stopPropagation();
function es(t) {
  const { id: n, data: r, selected: i } = t, a = Pe(), [s, d] = S(!1), c = he(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", m = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && m.length === 0, x = r.numVariations ?? 1, f = x > 1 || m.length > 1, v = /* @__PURE__ */ o("span", { className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary mb-1", children: [
    "×",
    x,
    " variation",
    x !== 1 ? "s" : ""
  ] });
  let N;
  if (m.length > 0 && f)
    N = /* @__PURE__ */ e(un, { images: m, "data-testid": "variation-thumb-strip" });
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
          onMouseDown: Zi,
          onClick: (k) => {
            k.stopPropagation(), y && d(!0);
          },
          children: /* @__PURE__ */ e(
            Gn,
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
        Ct,
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function ts(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
const ns = (t) => t.stopPropagation();
function rs(t) {
  const { id: n, data: r, selected: i } = t, a = Pe(), [s, d] = S(!1), c = he(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", m = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && m.length === 0, x = m.length > 1;
  let f;
  if (x)
    f = /* @__PURE__ */ e(un, { images: m, "data-testid": "edit-prompt-thumb-strip" });
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
          onMouseDown: ns,
          onClick: (b) => {
            b.stopPropagation(), N && d(!0);
          },
          children: /* @__PURE__ */ e(
            Gn,
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
        Ct,
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
        children: ts(r.prompt)
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
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: j("image") }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: `${j("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
const os = {
  trigger: Qa,
  llm: ti,
  transform: ri,
  condition: ai,
  action: si,
  fork: li,
  join: pi,
  approval: mi,
  agent: hi,
  "mcp-tool": fi,
  "knowledge-base": gi,
  "graph-query": xi,
  memory: bi,
  guardrail: yi,
  policy: vi,
  "ag-ui-output": Ni,
  "image-source": ki,
  "image:save": Ci,
  scatter: Si,
  "image:resize": $i,
  "image:transform": Ri,
  "image:format-convert": Ai,
  "image:sharpen": Mi,
  "image:watermark": Di,
  "image:crop": Oi,
  "image:adjust-bw": _i,
  "image:adjust-layer": Bi,
  "image:dimensions": Ui,
  "image:upscale": ji,
  "image:vision-analyze": Vi,
  "image:vision-classify": Ki,
  "image:vision-describe": Hi,
  "image:vision-tag": Ji,
  "image:vision-extract-text": Gi,
  "image:generate": Qi,
  "image:variation": es,
  "image:edit-prompt": rs
}, as = "#c4b5fd";
function is(t) {
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
function ss({
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
  const u = c ?? {}, m = Zn(), [h, g, x] = Ta({
    sourceX: n,
    sourceY: r,
    targetX: i,
    targetY: a,
    sourcePosition: s,
    targetPosition: d
  }), f = is(u.state), v = (u.state ?? "default") === "default", N = u.payload, b = f.animate && !m;
  let w = f.stroke, y = f.strokeWidth, k = b ? f.strokeDasharray : void 0;
  N === "image" ? (y = 2.5, v && (w = as)) : N === "control" && (y = 1.5, v && (k = "2 4"));
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
    u.label ? /* @__PURE__ */ e(mr, { children: /* @__PURE__ */ e(
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
    $ ? /* @__PURE__ */ e(mr, { children: /* @__PURE__ */ e(
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
function vt(t, n, r) {
  const i = ce(n);
  i.current = n, re(() => {
    if (r === !1) return;
    const a = (s) => {
      t.current && !t.current.contains(s.target) && i.current();
    };
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [t, r]);
}
const ls = [
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
function cs(t, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return t.type.toLowerCase().includes(r) || t.name.toLowerCase().includes(r) || t.description.toLowerCase().includes(r);
}
function ds({
  anchor: t,
  flowPosition: n,
  disabledTypes: r = [],
  onClose: i,
  onInsert: a
}) {
  const [s, d] = S(""), [c, l] = S(0), p = ce(null), u = ce(null), m = q(() => new Set(r), [r]), h = q(
    () => ls.filter((f) => !m.has(f.type) && cs(f, s)),
    [m, s]
  );
  if (re(() => {
    l((f) => f >= h.length ? 0 : f);
  }, [h.length]), re(() => {
    if (t) {
      const f = setTimeout(() => u.current?.focus(), 0);
      return () => clearTimeout(f);
    }
  }, [t]), vt(p, i, !!t), !t) return null;
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
function ps({
  addNode: t,
  addEdge: n,
  updateNodeData: r,
  getDefinition: i
}) {
  re(() => {
  }, [t, n, r, i]);
}
function us({
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
      if (rr(x.target)) return;
      const f = document.activeElement, v = !!f && m.contains(f);
      if (x.key === "Tab") {
        if (!v || !t || t.nodes.length === 0) return;
        const N = Ds(t);
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
function ms({
  addNode: t,
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
      t(c, l);
    },
    [t, n]
  );
  return { handleDragOver: r, handleDrop: i };
}
function hs({
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
const fs = [
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
], gs = [
  { key: "source", name: "Sources" },
  { key: "transform", name: "Transform" },
  { key: "ai", name: "AI" },
  { key: "control", name: "Control" },
  { key: "sink", name: "Sinks" },
  { key: "human", name: "Human" }
], gn = {
  source: "bg-cat-source",
  transform: "bg-cat-transform",
  ai: "bg-cat-ai",
  control: "bg-cat-control",
  sink: "bg-cat-sink",
  human: "bg-cat-human"
}, jt = gs.map(({ key: t, name: n }) => ({
  key: t,
  name: n,
  items: fs.filter((r) => ge(r.type) === t).map((r) => ({ ...r, category: n, nodeCategory: t }))
})).filter((t) => t.items.length > 0), xs = jt.flatMap((t) => t.items.map((n) => ({ type: n.type, name: n.name }))), bs = jt.map((t) => t.name), nr = "pipeline.palette.recents", ys = 5, xr = "pipeline.palette.compact";
function jn() {
  if (typeof window > "u") return [];
  try {
    const t = window.localStorage.getItem(nr);
    if (!t) return [];
    const n = JSON.parse(t);
    return Array.isArray(n) ? n : [];
  } catch {
    return [];
  }
}
function vs(t) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(nr, JSON.stringify(t));
    } catch {
    }
}
function Dh(t) {
  const n = jn().filter((i) => i !== t), r = [t, ...n].slice(0, ys);
  vs(r);
}
const _o = "pipeline.palette.collapsed.";
function Ns(t) {
  if (typeof window > "u") return !1;
  try {
    return window.localStorage.getItem(_o + t) === "true";
  } catch {
    return !1;
  }
}
function ws(t, n) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(_o + t, String(n));
    } catch {
    }
}
function ks(t, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return t.name.toLowerCase().includes(r) || t.type.toLowerCase().includes(r) || t.description.toLowerCase().includes(r);
}
function br({ expanded: t }) {
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
function Cs({ disabledTypes: t = [] }) {
  const [n, r] = S(""), [i, a] = S(/* @__PURE__ */ new Set()), [s, d] = S(null), [c, l] = S(() => jn()), [p, u] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem(xr) === "true";
    } catch {
      return !1;
    }
  }), [m, h] = S(() => {
    const R = {};
    for (const H of jt)
      R[H.name] = Ns(H.name);
    return R;
  }), g = q(() => new Set(t), [t]);
  re(() => {
    const R = (H) => {
      H.key === nr && l(jn());
    };
    return window.addEventListener("storage", R), () => window.removeEventListener("storage", R);
  }, []), re(() => {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(xr, String(p));
      } catch {
      }
  }, [p]);
  const x = E((R) => {
    a((H) => {
      const X = new Set(H);
      return X.has(R) ? X.delete(R) : X.add(R), X;
    });
  }, []), f = E(() => {
    r(""), a(/* @__PURE__ */ new Set());
  }, []), v = E((R) => {
    h((H) => {
      const X = { ...H, [R]: !H[R] };
      return ws(R, X[R]), X;
    });
  }, []), N = q(() => {
    const R = /* @__PURE__ */ new Map();
    for (const H of jt)
      for (const X of H.items) R.set(X.type, X);
    return R;
  }, []), b = q(
    () => c.map((R) => N.get(R)).filter(Boolean),
    [c, N]
  ), w = q(() => jt.map((R) => {
    const H = i.size > 0 && !i.has(R.name) ? [] : R.items.filter((X) => ks(X, n));
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
  }, D = ko(), A = (R, H) => {
    const X = g.has(R.type), J = !D(R.type), Q = s === R.type && !X, O = H !== null && H < 9 ? H + 1 : null;
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
        title: X ? `${R.name} is already placed` : J ? `${R.name} — preview: this deployment has no executor for it yet, so the step will not run.` : O ? `${R.description} — press ${O}` : R.description,
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
              className: I("w-1.5 h-1.5 rounded-full shrink-0", R.nodeCategory && gn[R.nodeCategory])
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-base leading-none w-5 text-center shrink-0", "aria-hidden": !0, children: R.icon }),
          /* @__PURE__ */ e("span", { className: I("text-[12px] font-medium text-text-primary truncate", X && "line-through"), children: R.name }),
          O !== null && /* @__PURE__ */ e(
            "kbd",
            {
              "data-testid": `palette-shortcut-${R.type}`,
              className: I(
                "ml-auto text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                X && "opacity-50"
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
        draggable: !X,
        onDragStart: $(R),
        onMouseEnter: () => d(R.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-11 box-border my-0.5 mx-2 py-1.5 px-2.5 flex items-center gap-2.5 rounded-md border border-transparent font-[inherit]",
          X ? "cursor-not-allowed opacity-45" : "cursor-grab",
          Q ? "bg-surface-panel" : "bg-transparent"
        ),
        title: X ? `${R.name} is already placed` : J ? `${R.name} — preview: this deployment has no executor for it yet, so the step will not run.` : O ? `${R.description} — press ${O}` : R.description,
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
              className: I("w-1.5 h-1.5 rounded-full shrink-0", R.nodeCategory && gn[R.nodeCategory])
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
              O !== null && /* @__PURE__ */ e(
                "kbd",
                {
                  "data-testid": `palette-shortcut-${R.type}`,
                  className: I(
                    "text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                    X && "opacity-50"
                  ),
                  children: O
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
              children: bs.map((R) => /* @__PURE__ */ e(
                Da,
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
                  /* @__PURE__ */ e(br, { expanded: !m.__recents__ }),
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
                    /* @__PURE__ */ e(br, { expanded: !H }),
                    /* @__PURE__ */ e(
                      "span",
                      {
                        "aria-hidden": !0,
                        "data-testid": `palette-section-accent-${R.key}`,
                        className: I("w-1.5 h-1.5 rounded-full shrink-0", gn[R.key])
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
function Is({
  definition: t,
  addNode: n,
  screenToFlowPosition: r,
  containerRef: i
}) {
  return re(() => {
    const a = (s) => {
      if (!rr(s.target) && !(s.metaKey || s.ctrlKey || s.altKey) && /^[1-8]$/.test(s.key)) {
        const d = Number(s.key) - 1, c = xs[d];
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
const Ss = 280, $s = 120, Ts = 40, Rs = 40;
function Ps(t, n) {
  const r = Ss, i = $s, a = Ts, s = Rs;
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
function As({
  definition: t,
  setPositions: n,
  fitView: r
}) {
  const i = E(() => {
    r({ padding: 0.15, duration: 500 });
  }, [r]), a = E(() => {
    if (!t) return;
    const s = Ps(t);
    s.length !== 0 && (n(s), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => r({ padding: 0.15, duration: 500 })) : r({ padding: 0.15, duration: 500 }));
  }, [t, n, r]);
  return { handleFitView: i, handleAutoArrange: a };
}
function Ms({
  definition: t,
  setPositions: n,
  fitView: r
}) {
  const { handleFitView: i, handleAutoArrange: a } = As({
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
const Lo = 0.1, yr = { padding: 0.15, minZoom: Lo, maxZoom: 1 };
function rr(t) {
  if (!t || !(t instanceof HTMLElement)) return !1;
  const n = t.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || t.isContentEditable);
}
function Ds(t) {
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
const Es = { animated: ss }, Os = os;
function _s(t) {
  return {
    id: t.id,
    type: t.type,
    position: t.position,
    data: { ...t.data, nodeType: t.type }
  };
}
function Ls(t) {
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
function Bs({ onFilterLog: t, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: i, replayNodeClasses: a, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c }) {
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
  } = Ve(), { screenToFlowPosition: b, fitView: w } = Pa(), y = ce(!1), k = E((Z) => {
    Z && (y.current = !0);
  }, []);
  re(() => {
    const Z = Q.current;
    if (!Z || typeof ResizeObserver > "u") return;
    let ie = { w: Z.clientWidth, h: Z.clientHeight };
    const ue = new ResizeObserver(() => {
      const xe = Z.clientWidth, Se = Z.clientHeight;
      xe === 0 || Se === 0 || Math.abs(xe - ie.w) < 2 && Math.abs(Se - ie.h) < 2 || (ie = { w: xe, h: Se }, !y.current && w(yr));
    });
    return ue.observe(Z), () => ue.disconnect();
  }, [w]), ps({
    addNode: p,
    addEdge: m,
    updateNodeData: N,
    getDefinition: () => l
  });
  const [C, $, D] = Po([]), [A, M, ne] = Ao([]), [R, H] = S(!0), [X, J] = S(!0), Q = ce(null), O = ce(null), [P, G] = S(null), [F, _] = S(null), W = E(
    (Z, ie) => {
      Z.preventDefault(), _({ nodeId: ie.id, x: Z.clientX, y: Z.clientY });
    },
    []
  ), V = E(() => {
    F && (t?.(F.nodeId), _(null));
  }, [F, t]), Y = E(() => {
    if (!F) return;
    const Z = F.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(Z).catch(() => {
    }), _(null);
  }, [F]), me = E(() => {
    F && (d?.(F.nodeId), _(null));
  }, [F, d]), z = E(() => {
    if (!F) return;
    const Z = x([F.nodeId]);
    Z.length > 0 && v(Z[0]), _(null);
  }, [F, x, v]), de = E(() => _(null), []);
  re(() => {
    if (!l) {
      $([]), M([]);
      return;
    }
    $((Z) => {
      const ie = new Map(Z.map((ue) => [ue.id, ue]));
      return l.nodes.map((ue) => {
        const xe = ie.get(ue.id), Se = _s(ue);
        return s && s.size > 0 && (Se.data._hasBreakpoint = s.has(ue.id)), c && (Se.data._pausedAtBreakpoint = ue.id === c), xe ? { ...xe, ...Se, selected: xe.selected } : Se;
      });
    }), M(() => l.edges.map(Ls));
  }, [l, s, c, $, M]), re(() => {
    if (!n) {
      r?.(null);
      return;
    }
    $(
      (Z) => Z.map((ie) => ({
        ...ie,
        className: ie.id === n ? "node-error" : ie.className?.replace("node-error", "").trim() || void 0
      }))
    ), requestAnimationFrame(() => {
      const Z = Q.current;
      if (!Z) return;
      const ie = Z.querySelector(
        `.react-flow__node[data-id="${CSS.escape(n)}"]`
      );
      if (!ie) {
        r?.(null);
        return;
      }
      const ue = ie.getBoundingClientRect();
      r?.({ x: ue.right, y: ue.top + ue.height / 2 });
    });
  }, [n, $, r]), re(() => {
    a && $(
      (Z) => Z.map((ie) => {
        const ue = a[ie.id] ?? "", Se = [ie.id === n ? "node-error" : "", ue].filter(Boolean).join(" ") || void 0;
        let Ue;
        ue === "node-replay-active" ? Ue = "running" : ue === "node-replay-completed" ? Ue = "completed" : ue === "node-replay-failed" && (Ue = "failed");
        const T = { ...ie.data };
        return Ue ? T._state = Ue : T._state = "idle", { ...ie, className: Se, data: T };
      })
    );
  }, [a, n, $]), re(() => {
    i && M(
      (Z) => Z.map((ie) => {
        const ue = i[ie.id];
        if (!ue) return ie;
        const xe = ie.data ?? {};
        return xe.state === ue ? ie : { ...ie, data: { ...xe, state: ue } };
      })
    );
  }, [i, M]);
  const we = E(
    (Z) => {
      D(Z);
      const ie = [], ue = [];
      for (const xe of Z)
        xe.type === "position" && xe.position && xe.dragging === !1 ? ie.push({ id: xe.id, position: xe.position }) : xe.type === "remove" && ue.push(xe.id);
      ie.length && u(ie);
      for (const xe of ue) g(xe);
    },
    [D, u, g]
  ), Fe = E(
    (Z) => {
      ne(Z);
      for (const ie of Z)
        ie.type === "remove" && h(ie.id);
    },
    [ne, h]
  ), tt = E(
    (Z) => {
      if (!l || !Z.source || !Z.target) return;
      const ie = l.nodes.find((Ue) => Ue.id === Z.source), ue = l.nodes.find((Ue) => Ue.id === Z.target);
      if (!ie || !ue) return;
      const xe = Z.sourceHandle ?? "out", Se = Z.targetHandle ?? "in";
      Un(
        ie.type,
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
  ), Ke = E(
    (Z) => {
      if (!l || !Z.source || !Z.target) return !1;
      const ie = l.nodes.find((xe) => xe.id === Z.source), ue = l.nodes.find((xe) => xe.id === Z.target);
      return !ie || !ue ? !1 : Un(
        ie.type,
        Z.sourceHandle ?? "out",
        ue.type,
        Z.targetHandle ?? "in"
      );
    },
    [l]
  ), Be = E(
    (Z, ie) => {
      v(ie.id);
    },
    [v]
  ), Je = E(() => {
    v(null);
  }, [v]), He = E(
    (Z) => {
      const ie = Z.target;
      if (!ie || !(ie.classList.contains("react-flow__pane") || ie.classList.contains("react-flow__renderer") || ie.classList.contains("react-flow__viewport") || ie.classList.contains("react-flow"))) return;
      Z.preventDefault();
      const xe = b({ x: Z.clientX, y: Z.clientY });
      G({
        anchor: { x: Z.clientX, y: Z.clientY },
        flowPosition: xe
      });
    },
    [b]
  ), Ge = E(() => G(null), []), Ie = E(
    (Z, ie) => {
      p(Z, ie);
    },
    [p]
  ), ye = q(() => l ? l.nodes.some((Z) => Z.type === "trigger") ? ["trigger"] : [] : [], [l]), { handleDragOver: se, handleDrop: Ae } = ms({
    addNode: p,
    screenToFlowPosition: b
  });
  re(() => {
    const Z = (ie) => {
      if (!rr(ie.target) && !(ie.metaKey || ie.ctrlKey || ie.altKey)) {
        if (ie.key === "m" || ie.key === "M") {
          H((ue) => !ue);
          return;
        }
        if (ie.key === "c" || ie.key === "C") {
          J((ue) => !ue);
          return;
        }
      }
    };
    return window.addEventListener("keydown", Z), () => window.removeEventListener("keydown", Z);
  }, []), us({
    definition: l,
    selectedNodeId: f,
    setSelectedNodeId: v,
    removeNode: g,
    removeDefEdge: h,
    setNodes: $,
    setEdges: M,
    setPositions: u,
    duplicateNodes: x,
    clipboardRef: O,
    containerRef: Q
  });
  const St = E((Z) => {
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
      onDragOver: se,
      onDrop: Ae,
      onDoubleClick: He,
      children: [
        /* @__PURE__ */ o(
          Mo,
          {
            nodes: C,
            edges: A,
            nodeTypes: Os,
            edgeTypes: Es,
            onNodesChange: we,
            onEdgesChange: Fe,
            onConnect: tt,
            isValidConnection: Ke,
            onNodeClick: Be,
            onNodeContextMenu: W,
            onPaneClick: Je,
            onMoveStart: k,
            fitView: !0,
            fitViewOptions: yr,
            minZoom: Lo,
            snapToGrid: !0,
            snapGrid: [16, 16],
            edgesFocusable: !0,
            defaultEdgeOptions: { type: "smoothstep" },
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ e(
                Do,
                {
                  variant: Aa.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              X ? /* @__PURE__ */ e(
                Eo,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              R ? /* @__PURE__ */ e(
                Ma,
                {
                  position: "bottom-right",
                  pannable: !0,
                  zoomable: !0,
                  className: "!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]",
                  maskColor: "rgba(15, 23, 42, 0.04)",
                  nodeColor: St,
                  nodeStrokeColor: "#e2e8f0"
                }
              ) : null
            ]
          }
        ),
        P ? /* @__PURE__ */ e(
          ds,
          {
            anchor: P.anchor,
            flowPosition: P.flowPosition,
            disabledTypes: ye,
            onClose: Ge,
            onInsert: Ie
          }
        ) : null,
        /* @__PURE__ */ e(
          Is,
          {
            definition: l,
            addNode: p,
            screenToFlowPosition: b,
            containerRef: Q
          }
        ),
        /* @__PURE__ */ e(
          Ms,
          {
            definition: l,
            setPositions: u,
            fitView: w
          }
        ),
        F ? /* @__PURE__ */ e(
          hs,
          {
            nodeMenu: F,
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
function Us({ onFilterLog: t, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: i, replayNodeClasses: a, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c } = {}) {
  return /* @__PURE__ */ e(Ra, { children: /* @__PURE__ */ e(
    Bs,
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
const vr = {
  LLMError: { bg: "#fef2f2", fg: "#dc2626" },
  TimeoutError: { bg: "#fff7ed", fg: "#ea580c" },
  NetworkError: { bg: "#fffbeb", fg: "#d97706" },
  ValidationError: { bg: "#fefce8", fg: "#ca8a04" },
  RegistryConflict: { bg: "#faf5ff", fg: "#9333ea" },
  UnknownError: { bg: "#f1f5f9", fg: "#475569" }
};
function js(t) {
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
function Fs({ error: t, anchor: n, onDismiss: r, onRetry: i }) {
  const [a, s] = S(!1), [d, c] = S(!1), l = t.errorCategory ?? "UnknownError", p = vr[l] ?? vr.UnknownError, u = E(async () => {
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
  }, [t, l]), m = E(() => {
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
              children: js(l)
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
function zs(t, n) {
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
function Bo(t) {
  const n = [], r = [], { nodes: i, edges: a } = t, s = /* @__PURE__ */ new Map();
  for (const d of i)
    s.set(d.id, d);
  return qs(i, n), Ws(i, a, n), Vs(a, s, n), Ks(i, n), el(i, a, n), tl(i, a, r), nl(i, a, r), rl(i, a, r), ol(i, a, r), r.push(...al(t)), r.push(...il(t)), r.push(...sl(t)), r.push(...ll(t)), r.push(...cl(t)), r.push(...dl(t)), r.push(...pl(t)), r.push(...ul(t)), r.push(...ml(t)), r.push(...hl(t)), {
    errors: n,
    warnings: r,
    isValid: n.length === 0,
    canPublish: n.length === 0
  };
}
function qs(t, n) {
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
function Ws(t, n, r) {
  const i = zs(t, n);
  i !== null && r.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: i
  });
}
function Vs(t, n, r) {
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
    Un(
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
function Ks(t, n) {
  for (const r of t)
    switch (r.data.type) {
      case "llm":
        Hs(r.id, r.data, n);
        break;
      case "transform":
        Js(r.id, r.data, n);
        break;
      case "condition":
        Gs(r.id, r.data, n);
        break;
      case "action":
        Ys(r.id, r.data, n);
        break;
      case "fork":
        Xs(r.id, r.data, n);
        break;
      case "join":
        Qs(r.id, r.data, n);
        break;
      case "approval":
        Zs(r.id, r.data, n);
        break;
    }
}
function Hs(t, n, r) {
  n.provider || Ye(r, t, "provider"), (!n.model || !n.model.trim()) && Ye(r, t, "model"), (!n.systemPrompt || !n.systemPrompt.trim()) && Ye(r, t, "systemPrompt"), (!n.userPromptTemplate || !n.userPromptTemplate.trim()) && Ye(r, t, "userPromptTemplate");
}
function Js(t, n, r) {
  n.transformType || Ye(r, t, "transformType"), (!n.expression || !n.expression.trim()) && Ye(r, t, "expression");
}
function Gs(t, n, r) {
  (!n.expression || !n.expression.trim()) && Ye(r, t, "expression");
}
function Ys(t, n, r) {
  n.actionType || Ye(r, t, "actionType");
}
function Xs(t, n, r) {
  (typeof n.branchCount != "number" || n.branchCount < 2) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: t,
    field: "branchCount"
  });
}
function Qs(t, n, r) {
  n.mode || Ye(r, t, "mode"), n.mergeStrategy || Ye(r, t, "mergeStrategy"), n.mode === "n_of_m" && (typeof n.n != "number" || n.n < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: t,
    field: "n"
  });
}
function Zs(t, n, r) {
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
function el(t, n, r) {
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
function Ye(t, n, r) {
  t.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: `Missing required field '${r}'.`,
    nodeId: n,
    field: r
  });
}
function tl(t, n, r) {
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
function nl(t, n, r) {
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
function rl(t, n, r) {
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
function ol(t, n, r) {
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
function at(t) {
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
function al(t) {
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
      message: `${c.data.type} node '${at(c)}' has no error handler — failures will terminate the run.`,
      nodeId: c.id
    });
  return n;
}
function il(t) {
  const n = [];
  for (const r of t.nodes)
    r.data.type === "llm" && (typeof r.data.maxTokens != "number" || r.data.maxTokens <= 0) && n.push({
      code: "LLM_NO_MAX_TOKENS",
      severity: "warning",
      message: `LLM node '${at(r)}' has no maxTokens — responses could run long / expensive.`,
      nodeId: r.id,
      field: "maxTokens"
    });
  return n;
}
function sl(t) {
  const n = [];
  for (const r of t.nodes)
    r.data.type === "approval" && (typeof r.data.timeoutMs != "number" || r.data.timeoutMs <= 0) && n.push({
      code: "UNGUARDED_APPROVAL_TIMEOUT",
      severity: "warning",
      message: `Approval '${at(r)}' has no timeout — the run could block indefinitely.`,
      nodeId: r.id,
      field: "timeoutMs"
    });
  return n;
}
function ll(t) {
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
function cl(t) {
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
function dl(t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const i of t.nodes) {
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
function pl(t) {
  const n = [], r = /\{\{[^}]+\}\}/;
  for (const i of t.nodes) {
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
function ul(t) {
  return t.triggerBinding?.event !== "schedule" ? [] : t.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function ml(t) {
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
      message: `Condition '${at(i)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: i.id,
      field: "false"
    });
  }
  return n;
}
function hl(t) {
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
      message: `Fork '${at(c)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
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
      message: `Join '${at(c)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: c.id
    });
  }
  return n;
}
function fl(t, n) {
  return `${t}${n}`;
}
const gl = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, xl = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function Uo(t) {
  return t.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const bl = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function yl(t) {
  const n = xl[t.type] ?? "■", r = bl[t.type] ?? t.type.charAt(0).toUpperCase() + t.type.slice(1);
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
  return Uo(i ? `${a}<br/>${i}` : a);
}
function vl(t, n) {
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
function Nl(t) {
  return !t || t === "out" ? null : t;
}
function wl(t) {
  const n = ["flowchart TD"], r = {}, i = /* @__PURE__ */ new Map();
  for (const a of t.nodes) {
    const s = gl[a.type] ?? "n", d = r[s] = (r[s] ?? 0) + 1;
    i.set(a.id, fl(s, d));
  }
  for (const a of t.nodes) {
    const s = i.get(a.id);
    if (!s) continue;
    const d = vl(a.type, yl(a));
    n.push(`  ${s}${d}`);
  }
  for (const a of t.edges) {
    const s = i.get(a.source), d = i.get(a.target);
    if (!s || !d) continue;
    const c = Nl(a.sourceHandle);
    c ? n.push(`  ${s} --"${Uo(c)}"--> ${d}`) : n.push(`  ${s} --> ${d}`);
  }
  return n.join(`
`);
}
function Nr(t) {
  return JSON.stringify(t, (n, r) => {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const i = Object.keys(r).sort(), a = {};
      for (const s of i) a[s] = r[s];
      return a;
    }
    return r;
  });
}
function wr(t) {
  const n = /* @__PURE__ */ new Map();
  for (const r of t) n.set(r.id, r);
  return n;
}
function kr(t) {
  return new Set(t.edges.map((n) => n.id));
}
function kl(t, n) {
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
  const r = wr(t.nodes), i = wr(n.nodes), a = [], s = [], d = [];
  for (const [b, w] of r) {
    const y = i.get(b);
    if (!y) {
      a.push({ node: w, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const k = Nr(w.data) !== Nr(y.data), C = w.position.x !== y.position.x || w.position.y !== y.position.y;
    (k || C) && d.push({ node: w, dataChanged: k, positionChanged: C });
  }
  for (const [b, w] of i)
    r.has(b) || s.push({ node: w, dataChanged: !0, positionChanged: !1 });
  const c = kr(t), l = kr(n);
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
const Cl = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function Il(t) {
  return t.data.type === "condition" && t.data.label ? t.data.label : t.data.type === "llm" ? t.data.model : t.data.type === "action" ? t.data.actionType : t.data.type === "trigger" ? t.data.triggerType : t.type.charAt(0).toUpperCase() + t.type.slice(1);
}
function xn(t, n, r) {
  const i = t.node, a = Cl[i.type] ?? "■", s = n !== "removed" && !!r;
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
        /* @__PURE__ */ e("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: Il(i) }),
        n === "modified" && t.positionChanged ? /* @__PURE__ */ e("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]", children: "moved" }) : null
      ]
    },
    `${n}-${t.node.id}`
  );
}
function Sl({
  open: t,
  onClose: n,
  currentDef: r,
  publishedDef: i,
  onJumpToNode: a
}) {
  const s = q(
    () => kl(r, i),
    [r, i]
  ), d = (u) => {
    a && a(u), n();
  }, c = i !== null, l = r.version, p = r.publishedVersion;
  return /* @__PURE__ */ o(
    Xe,
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
              s.addedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.addedNodes.map((u) => xn(u, "added", d))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Removed (",
                s.removedNodes.length,
                ")"
              ] }),
              s.removedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.removedNodes.map((u) => xn(u, "removed", void 0))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Modified (",
                s.modifiedNodes.length,
                ")"
              ] }),
              s.modifiedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.modifiedNodes.map((u) => xn(u, "modified", d))
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
function $l({ open: t, onClose: n }) {
  return null;
}
const bn = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", Cr = "px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function Tl(t) {
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
      Xe,
      {
        open: n,
        onClose: r,
        title: "Publish pipeline?",
        maxWidth: 420,
        footer: /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ e("button", { onClick: r, className: bn, children: "Cancel" }),
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
      Xe,
      {
        open: l,
        onClose: p,
        title: "Delete pipeline?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ e("button", { onClick: p, className: bn, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: u, className: Cr, children: "Delete" })
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
      Xe,
      {
        open: m,
        onClose: h,
        title: "Clear run history?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ e("button", { onClick: h, className: bn, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: g, className: Cr, children: "Clear history" })
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
      Sl,
      {
        open: x,
        onClose: f,
        currentDef: v,
        publishedDef: N,
        onJumpToNode: b
      }
    ),
    /* @__PURE__ */ e(
      $l,
      {
        open: w,
        onClose: y
      }
    )
  ] });
}
function Rl({ runId: t, visible: n }) {
  const [r, i] = S(/* @__PURE__ */ new Map()), a = ce(null), s = ce(!0), d = ce(null);
  re(() => {
    t !== d.current && (d.current = t, i(/* @__PURE__ */ new Map()), s.current = !0);
  }, [t]);
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
  je("*", p), re(() => {
    l();
  }, [r, l]);
  const u = E((g) => {
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
function zt(t, n) {
  if (!n) return "step";
  const r = t?.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Pl(t) {
  const n = kt(), { toast: r } = pn(), { definition: i, selectedNodeId: a, setSelectedNodeId: s } = Ve(), d = ce(n.runs);
  re(() => {
    d.current = n.runs;
  }, [n.runs]);
  const c = ce(i);
  re(() => {
    c.current = i;
  }, [i]);
  const l = E(
    (T) => T ? d.current[T]?.pipelineId === t : !1,
    [t]
  ), [p, u] = S(null), [m, h] = S(null), g = E(() => {
    u(null), h(null);
  }, []), x = E(
    (T) => {
      h(T);
    },
    []
  ), f = E(
    (T) => {
      "eventType" in T || T.pipelineId === t && (r("Run started", { type: "info" }), u(null), h(null));
    },
    [t, r]
  ), v = E(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const L = Math.round(T.durationMs / 100) / 10;
      r(`Run completed in ${L}s`, { type: "success" });
    },
    [l, r]
  ), N = E(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const L = T.error.nodeId, pe = zt(c.current, L);
      r(`Run failed at ${pe}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => s(L)
      }), u(T.error);
    },
    [l, s, r]
  ), b = E(
    (T) => {
      "eventType" in T || l(T.runId) && r("Run cancelled", { type: "warning" });
    },
    [l, r]
  ), w = E(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const L = T.stepId, pe = zt(c.current, L);
      r(`Approval requested on "${pe}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => s(L)
      });
    },
    [l, s, r]
  );
  je("pipeline.run.started", f), je("pipeline.run.completed", v), je("pipeline.run.failed", N), je("pipeline.run.cancelled", b), je("pipeline.approval.requested", w);
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
  const C = y ? n.runs[y] : void 0, $ = !!C && (C.status === "running" || C.status === "pending" || C.status === "awaiting_approval"), [D, A] = S(/* @__PURE__ */ new Set()), [M, ne] = S(null), [R, H] = S(null), [X, J] = S(null), [Q, O] = S(0), [P, G] = S(!1), [F, _] = S(null), W = E(
    (T, L) => {
      L === null ? (H(null), J(null)) : (H(L), J(T));
    },
    []
  ), V = E((T) => {
    A((L) => {
      const pe = new Set(L);
      return pe.has(T) ? pe.delete(T) : pe.add(T), pe;
    });
  }, []), Y = E(async () => {
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
  }, [D, n, t]), me = E(() => {
    M && (n.resolveBreakpoint(M.runId, M.stepId, "continue"), ne(null));
  }, [M, n]), z = E(() => {
    M && (n.resolveBreakpoint(M.runId, M.stepId, "step_over"), ne(null));
  }, [M, n]), de = E(() => {
    M && (n.resolveBreakpoint(M.runId, M.stepId, "resume_all"), ne(null));
  }, [M, n]), we = E(async () => {
    if (!(!M || !R || X !== M.stepId) && Object.keys(R).length !== 0) {
      G(!0);
      try {
        await la(
          t,
          M.runId,
          M.stepId,
          { mode: "merge", values: R }
        ), H(null), J(null), O((T) => T + 1), n.resolveBreakpoint(M.runId, M.stepId, "continue"), ne(null);
      } catch (T) {
        if (T instanceof ca)
          r(`Patch rejected: ${T.reason}`, { type: "error", durationMs: 8e3 });
        else if (T instanceof lr)
          r(`Apply failed (HTTP ${T.status})`, { type: "error", durationMs: 6e3 });
        else {
          const L = T instanceof Error ? T.message : String(T);
          r(`Apply failed: ${L}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        G(!1);
      }
    }
  }, [M, R, X, t, n, r]), Fe = E(
    async (T) => {
      if (M) {
        _(T);
        try {
          await da(
            t,
            M.runId,
            M.stepId,
            T
          ), r("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (L) {
          if (L instanceof lr)
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
  ), tt = E(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      ne({ runId: T.runId, stepId: T.stepId });
      const L = zt(c.current, T.stepId);
      r(`Paused at breakpoint: ${L}`, { type: "warning", durationMs: 6e3 });
    },
    [l, r]
  );
  je("pipeline.step.breakpoint", tt);
  const Ke = E(
    (T) => {
      "eventType" in T || M && M.runId === T.runId && ne(null);
    },
    [M]
  );
  je("pipeline.run.completed", Ke), je("pipeline.run.failed", Ke), je("pipeline.run.cancelled", Ke);
  const Be = E(() => {
    p?.nodeId && (n.retryFromStep(p.nodeId), g());
  }, [p, n, g]), Je = i?.status === "published", He = !$ && !Je, Ge = $ ? "Cancel the active run" : Je ? "Start a new run" : "Publish the pipeline to enable runs", [Ie, ye] = S(!1), [se, Ae] = S({}), [St, Z] = S(!1), [ie, ue] = S("config");
  re(() => {
    a !== null && ue("config");
  }, [a]);
  const xe = E(async (T) => {
    Z(!0);
    try {
      const L = await n.triggerRun(t, T);
      k(L), ue("runs"), r(`Pipeline triggered — run ${L.slice(0, 8)}…`, { type: "success" });
    } catch (L) {
      console.error("[PipelineEditor] triggerRun failed", L), r(`Trigger failed: ${L.message}`, { type: "error" });
    } finally {
      Z(!1);
    }
  }, [n, t, r]), Se = E(async () => {
    if ($ && y) {
      n.cancelRun(y);
      return;
    }
    He || xe();
  }, [$, y, He, n, xe]), Ue = E(() => {
    ye(!1), xe(se);
  }, [xe, se]);
  return {
    currentRunId: y,
    setCurrentRunId: k,
    activeError: p,
    setActiveError: u,
    errorNodeAnchor: m,
    handleDismissError: g,
    handleErrorNodePosition: x,
    handleRetryFromError: Be,
    handleRunClick: Se,
    handleTriggerInputSubmit: Ue,
    isRunActive: $,
    runDisabled: He,
    runTitle: Ge,
    isTriggering: St,
    triggerInputOpen: Ie,
    setTriggerInputOpen: ye,
    triggerInputValues: se,
    setTriggerInputValues: Ae,
    breakpoints: D,
    handleToggleBreakpoint: V,
    handleDebugRunClick: Y,
    pausedBreakpoint: M,
    handleBreakpointContinue: me,
    handleBreakpointStepOver: z,
    handleBreakpointResumeAll: de,
    handleApplyAndContinue: we,
    handleRevertPatch: Fe,
    applyingPatch: P,
    revertingPatchId: F,
    dirtyPatch: R,
    dirtyPatchStepId: X,
    handleContextEditBufferChange: W,
    resetEditBufferKey: Q,
    sidebarTab: ie,
    setSidebarTab: ue
  };
}
function Al({
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
const yn = {
  neutral: "bg-surface-hover text-text-secondary",
  success: "bg-success-bg text-success-fg",
  warning: "bg-warning-bg text-warning-fg",
  danger: "bg-danger-bg text-danger-fg",
  info: "bg-info-bg text-info-fg"
};
function Ml({
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
  const D = We(), { rename: A, setIcon: M, setSelectedNodeId: ne } = Ve(), [R, H] = S(!1), [X, J] = S(""), Q = ce(null);
  re(() => {
    R && (J(n.name ?? ""), setTimeout(() => Q.current?.focus(), 0));
  }, [R, n.name]);
  const O = () => {
    const se = X.trim();
    se && se !== n.name && A(se), H(!1);
  }, P = n ? Bo(n) : null;
  (P?.errors.length ?? 0) > 0;
  const G = n.status === "published", F = r ? { label: "Saving…", variant: "info" } : i ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, _ = n.status === "published" ? { label: `v${n.version} · Published`, variant: "success" } : typeof n.publishedVersion == "number" ? { label: `v${n.version} · Draft (pub v${n.publishedVersion})`, variant: "warning" } : { label: `v${n.version} · Draft`, variant: "neutral" }, W = P ? P.errors.length > 0 ? { label: `✗ ${P.errors.length} error${P.errors.length === 1 ? "" : "s"}`, variant: "danger" } : P.warnings.length > 0 ? { label: `⚠ ${P.warnings.length} warning${P.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [V, Y] = S(!1), me = ce(null);
  vt(me, () => Y(!1), V);
  const z = P ? [...P.errors, ...P.warnings] : [], de = (se) => {
    se && (ne(se), Y(!1));
  }, we = n.nodes.filter((se) => se.type !== "trigger").length, Fe = l ? Object.values(l.steps).filter(
    (se) => se.status === "completed" || se.status === "skipped"
  ).length : 0, Ke = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), Be = a && l ? { text: `Running (${Fe}/${we} steps) · ${Ke}s`, variant: "running" } : l?.status === "completed" ? { text: `Completed in ${l.durationMs ? (l.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : l?.status === "failed" ? { text: `Failed at ${zt(n, l.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, Je = {
    running: "bg-info-bg text-info-fg",
    success: "bg-success-bg text-success-fg",
    error: "bg-danger-bg text-danger-fg"
  }, He = a ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [Ge, Ie] = S(!1), ye = ce(null);
  return vt(ye, () => Ie(!1), Ge), /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "h-11 shrink-0 flex items-center gap-2.5 px-3",
        "border-b border-border bg-surface",
        "sticky top-0 z-5"
      ),
      children: [
        /* @__PURE__ */ e(
          xt,
          {
            onClick: () => D("/pipelines"),
            "aria-label": "Back to pipelines",
            title: "Back to pipelines",
            children: "←"
          }
        ),
        /* @__PURE__ */ e(
          Ea,
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
            onChange: (se) => J(se.target.value),
            onBlur: O,
            onKeyDown: (se) => {
              se.key === "Enter" && O(), se.key === "Escape" && (J(n.name), H(!1));
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
              yn[F.variant]
            ),
            "data-testid": "save-status",
            children: F.label
          }
        ),
        /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              yn[_.variant]
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
              onClick: () => Y((se) => !se),
              className: I(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
                "cursor-pointer border-none",
                yn[W.variant]
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
              children: z.map((se, Ae) => /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => de(se.nodeId),
                  className: I(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    se.nodeId ? "cursor-pointer" : "cursor-default",
                    Ae < z.length - 1 && "border-b border-border"
                  ),
                  children: [
                    /* @__PURE__ */ e(
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
                      /* @__PURE__ */ e("div", { className: "font-semibold", children: se.code }),
                      /* @__PURE__ */ e("div", { className: "text-text-secondary", children: se.message }),
                      se.nodeId && /* @__PURE__ */ e("div", { className: "mt-0.5 text-[11px] text-primary", children: "Jump to node →" })
                    ] })
                  ]
                },
                `${se.code}-${Ae}`
              ))
            }
          )
        ] }),
        Be.variant !== "none" && /* @__PURE__ */ o(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap",
              Je[Be.variant]
            ),
            "data-testid": "run-status-indicator",
            children: [
              Be.variant === "running" && /* @__PURE__ */ e("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-primary rounded-full animate-spin" }),
              Be.variant === "success" && "✓ ",
              Be.variant === "error" && "✗ ",
              Be.text
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex-1" }),
        /* @__PURE__ */ e(
          Ee,
          {
            variant: "secondary",
            onClick: () => D("/pipelines/metrics"),
            title: "View pipeline metrics dashboard",
            "data-testid": "metrics-button",
            children: "Metrics"
          }
        ),
        /* @__PURE__ */ e(
          Ee,
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
            ] }) : He
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
            xt,
            {
              onClick: () => Ie((se) => !se),
              "aria-label": "More actions",
              "data-testid": "overflow-menu-btn",
              children: "⋯"
            }
          ),
          Ge && /* @__PURE__ */ e(
            Al,
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
const Dl = 12;
function Me(t) {
  return I("text-xs", {
    string: "text-[#a6e3a1]",
    number: "text-[#fab387]",
    boolean: "text-[#cba6f7]",
    null: "text-[#6c7086]",
    bracket: "text-[#9399b2]"
  }[t]);
}
function Vt({
  data: t,
  depth: n = 0,
  highlightKeys: r,
  keyName: i,
  isHighlighted: a = !1
}) {
  const [s, d] = S(n > 2);
  if (n > Dl)
    return /* @__PURE__ */ e("span", { className: Me("string"), children: "[max depth]" });
  const c = a || i != null && r?.has(i);
  if (t === null)
    return /* @__PURE__ */ e("span", { className: I(Me("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "null" });
  if (t === void 0)
    return /* @__PURE__ */ e("span", { className: I(Me("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "undefined" });
  if (typeof t == "boolean")
    return /* @__PURE__ */ e("span", { className: I(Me("boolean"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(t) });
  if (typeof t == "number")
    return /* @__PURE__ */ e("span", { className: I(Me("number"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(t) });
  if (typeof t == "string") {
    const l = t.length > 120 ? t.slice(0, 120) + "..." : t;
    return /* @__PURE__ */ o("span", { className: I(Me("string"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: [
      '"',
      l,
      '"'
    ] });
  }
  if (Array.isArray(t))
    return t.length === 0 ? /* @__PURE__ */ e("span", { className: Me("bracket"), children: "[]" }) : /* @__PURE__ */ o("span", { children: [
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
      /* @__PURE__ */ e("span", { className: Me("bracket"), children: "[" }),
      s ? /* @__PURE__ */ o("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        t.length,
        " items"
      ] }) : /* @__PURE__ */ e("div", { className: "pl-4", children: t.map((l, p) => /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
        /* @__PURE__ */ o("span", { className: "text-[#6c7086] text-[11px]", children: [
          p,
          ": "
        ] }),
        /* @__PURE__ */ e(Vt, { data: l, depth: n + 1, highlightKeys: r }),
        p < t.length - 1 && /* @__PURE__ */ e("span", { className: Me("bracket"), children: "," })
      ] }, p)) }),
      /* @__PURE__ */ e("span", { className: Me("bracket"), children: "]" })
    ] });
  if (typeof t == "object") {
    const l = Object.entries(t);
    return l.length === 0 ? /* @__PURE__ */ e("span", { className: Me("bracket"), children: "{}" }) : /* @__PURE__ */ o("span", { children: [
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
      /* @__PURE__ */ e("span", { className: Me("bracket"), children: "{" }),
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
          /* @__PURE__ */ e("span", { className: Me("bracket"), children: ": " }),
          /* @__PURE__ */ e(
            Vt,
            {
              data: u,
              depth: n + 1,
              highlightKeys: n === 0 ? r : void 0,
              keyName: p,
              isHighlighted: h
            }
          ),
          m < l.length - 1 && /* @__PURE__ */ e("span", { className: Me("bracket"), children: "," })
        ] }, p);
      }) }),
      /* @__PURE__ */ e("span", { className: Me("bracket"), children: "}" })
    ] });
  }
  return /* @__PURE__ */ e("span", { className: Me("string"), children: String(t) });
}
function El({
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
function Ol(t) {
  return typeof t == "string" ? "string" : typeof t == "number" ? "number" : typeof t == "boolean" ? "boolean" : "object";
}
function _l({ k: t, initial: n, onCommit: r, onError: i, onFocus: a }) {
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
function Ll({
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
      const g = h in n, x = g ? n[h] : t[h], f = Ol(x), v = g;
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
                _l,
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
function Bl(t, n, r) {
  const i = { ...t }, a = { ...i.steps ?? {} };
  return a[n] = r, i.steps = a, r && typeof r == "object" && !Array.isArray(r) && Object.assign(i, r), i;
}
function Ul(t, n) {
  const r = [];
  for (const i of Object.keys(n))
    i in t || r.push(i);
  return r;
}
function jl(t) {
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
      l = Bl(i, a.nodeId, d);
    else {
      l = { ...i };
      const u = {
        ...l.steps ?? {}
      };
      u[a.nodeId] = d, l.steps = u;
    }
    const p = Ul(s, l);
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
function Fl(t, n) {
  const [r, i] = S(/* @__PURE__ */ new Map()), [a, s] = S(
    /* @__PURE__ */ new Map()
  ), d = ce(null);
  re(() => {
    const h = t?.id ?? null;
    h !== d.current && (d.current = h, i(/* @__PURE__ */ new Map()), s(/* @__PURE__ */ new Map()));
  }, [t?.id]);
  const c = E(
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
  je("*", c);
  const l = q(() => t ? jl(t) : [], [t]), p = q(() => l.map((h) => {
    const g = r.get(h.stepId), x = a.get(h.stepId);
    return {
      ...h,
      resolvedPrompt: h.resolvedPrompt || g,
      outputContext: x ?? h.outputContext
    };
  }), [l, r, a]), u = q(() => n ? p.find((h) => h.stepId === n) ?? null : p[p.length - 1] ?? null, [p, n]), m = q(() => u ? new Set(u.newKeys) : /* @__PURE__ */ new Set(), [u]);
  return { enrichedSnapshots: p, activeSnapshot: u, newKeysSet: m };
}
function Ir({ attempt: t, label: n }) {
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
      /* @__PURE__ */ e(Vt, { data: t.output, depth: 0 })
    ] })
  ] });
}
function zl({
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
  }), { enrichedSnapshots: y, activeSnapshot: k, newKeysSet: C } = Fl(t, n), $ = k?.resolvedPrompt != null, D = k?.stepExecution.attempts, A = (D?.length ?? 0) >= 2;
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
  const R = E(
    (P, G) => {
      f(n), g((F) => P in F ? F : { ...F, [P]: G });
    },
    [n]
  ), H = E(
    (P, G) => {
      f(n), g((F) => ({ ...F, [P]: G })), N((F) => {
        if (!(P in F)) return F;
        const _ = { ...F };
        return delete _[P], _;
      });
    },
    [n]
  ), X = E((P) => {
    g((G) => {
      if (!(P in G)) return G;
      const F = { ...G };
      return delete F[P], F;
    }), N((G) => {
      if (!(P in G)) return G;
      const F = { ...G };
      return delete F[P], F;
    });
  }, []), J = E((P, G) => {
    N((F) => ({ ...F, [P]: G }));
  }, []), Q = E(() => {
    g({}), f(null), N({}), w({ key: "", value: "" });
  }, []), O = E(() => {
    const P = b.key.trim();
    if (!P) return;
    let G = b.value;
    const F = b.value;
    if (F.trim().length > 0)
      try {
        G = JSON.parse(F);
      } catch {
        G = F;
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
        El,
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
          Ll,
          {
            inputContext: k.inputContext,
            buffer: h,
            parseErrors: v,
            newKeyDraft: b,
            setNewKeyDraft: w,
            onCommitNewKey: O,
            onBeginEditKey: R,
            onSetValue: H,
            onRemoveKey: X,
            onParseError: J
          }
        ) : /* @__PURE__ */ e(
          Vt,
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
        /* @__PURE__ */ e(Vt, { data: k.output }),
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
          /* @__PURE__ */ e(Ir, { attempt: D[l], label: `Attempt ${l + 1}` }),
          /* @__PURE__ */ e(Ir, { attempt: D[l + 1], label: `Attempt ${l + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function ql({
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
  const x = kt().runs[n.runId] ?? null, v = x?.steps?.[n.stepId]?.patches ?? [], N = !!a && s === n.stepId && Object.keys(a).length > 0, b = x?.status === "paused_at_breakpoint";
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
            zt(t, n.stepId)
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
                zl,
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
function oe({ label: t, required: n, help: r, error: i, children: a, className: s }) {
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
function bt({ title: t, defaultCollapsed: n = !1, children: r, className: i }) {
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
function Re({
  samples: t,
  onSelect: n,
  "aria-label": r = "Suggestions",
  className: i
}) {
  return t.length === 0 ? null : /* @__PURE__ */ e(
    "div",
    {
      className: I("mt-1.5 flex flex-wrap gap-1", i),
      role: "group",
      "aria-label": r,
      "data-testid": "sample-pills",
      children: t.map((a) => /* @__PURE__ */ e(
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
function Sr(t) {
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
function Fn(t, n) {
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
function Wl(t, n, r) {
  const i = new Map(t.map((c) => [c.id, c])), a = [], s = /* @__PURE__ */ new Set(), d = (c) => {
    s.has(c.path) || (s.add(c.path), a.push(c));
  };
  for (const c of Fn(n, r)) {
    const l = i.get(c);
    l && Sr(l).forEach(d);
  }
  if (!s.has("context.trigger")) {
    const c = t.find((l) => l.type === "trigger");
    c && Sr(c).forEach(d);
  }
  return a;
}
function Vl(t, n) {
  const r = new Set(n.map((a) => a.path)), i = /* @__PURE__ */ new Set();
  for (const a of t.matchAll(/\{\{\s*([\w.[\]-]+)\s*\}\}/g))
    i.add(a[1]);
  return [...i].filter((a) => r.has(a) ? !1 : ![...r].some((s) => a.startsWith(`${s}.`)));
}
const Kl = /* @__PURE__ */ new Set([
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
function Hl(t, n, r) {
  const i = new Map(t.map((l) => [l.id, l])), a = [], s = /* @__PURE__ */ new Set(), d = (l) => {
    s.has(l.path) || (s.add(l.path), a.push(l));
  };
  for (const l of Fn(n, r)) {
    const p = i.get(l);
    if (!p || !Kl.has(p.type)) continue;
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
  for (const l of Fn(n, r))
    if (i.get(l)?.type === "scatter") {
      d({ path: "$.scatter.parentImageId", source: "Scatter (parent image)", sourceNodeId: l });
      break;
    }
  return a;
}
function et(t) {
  const n = cn(Yn)?.definition ?? null, r = n?.nodes ?? [], i = n?.edges ?? [], a = q(
    () => t ? Wl(r, i, t) : [],
    [r, i, t]
  );
  return q(
    () => ({
      paths: a,
      unresolved: (s) => Vl(s, a)
    }),
    [a]
  );
}
function _e(t) {
  const n = cn(Yn)?.definition ?? null, r = n?.nodes ?? [], i = n?.edges ?? [];
  return q(
    () => t ? Hl(r, i, t) : [],
    [r, i, t]
  );
}
function or({
  value: t,
  onChange: n,
  nodeId: r,
  label: i = "Source image path",
  help: a = "Optional. Defaults to the image produced upstream.",
  placeholder: s = "$.trigger.imageRef"
}) {
  const d = _e(r ?? null);
  return /* @__PURE__ */ o(oe, { label: i, help: a, children: [
    /* @__PURE__ */ e(
      $e,
      {
        size: "sm",
        mono: !0,
        spellCheck: !1,
        value: t ?? "",
        onChange: (c) => n(c.target.value.trim() || void 0),
        placeholder: s,
        "aria-label": i
      }
    ),
    /* @__PURE__ */ e(
      Re,
      {
        samples: d.map((c) => c.path),
        onSelect: n,
        "aria-label": "Upstream image refs"
      }
    )
  ] });
}
const Jl = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function Gl(t, n, r) {
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
function Yl(t) {
  if (typeof t != "string") return null;
  const n = t.trim().split(/\s+/);
  if (n.length !== 5) return null;
  const r = {};
  for (let i = 0; i < 5; i++) {
    const a = Jl[i], s = Gl(n[i], a.min, a.max);
    if (!s) return null;
    r[a.name] = s;
  }
  return r;
}
function $t(t, n, r) {
  return t.match === "*" ? !t.step || t.step === 1 ? !0 : (n - r) % t.step === 0 : t.match.includes(n);
}
function Xl(t, n) {
  return $t(t.minute, n.getMinutes(), 0) && $t(t.hour, n.getHours(), 0) && $t(t.dayOfMonth, n.getDate(), 1) && $t(t.month, n.getMonth() + 1, 1) && $t(t.dayOfWeek, n.getDay(), 0);
}
function Ql(t, n, r) {
  const i = [], a = new Date(n.getTime());
  a.setSeconds(0, 0), a.setMinutes(a.getMinutes() + 1);
  const s = 1440 * 366, d = new Date(a.getTime());
  for (let c = 0; c < s && i.length < r; c++)
    Xl(t, d) && i.push(new Date(d.getTime())), d.setMinutes(d.getMinutes() + 1);
  return i;
}
const $r = /^[a-zA-Z0-9_-]{1,64}$/, Zl = "http://localhost:13001";
function ec() {
  try {
    const t = localStorage.getItem("ws_document_types_v1");
    if (!t) return [];
    const n = JSON.parse(t);
    return Array.isArray(n) ? n.filter((r) => typeof r == "object" && r !== null).filter((r) => typeof r.id == "string" && typeof r.name == "string").map((r) => ({ id: r.id, name: r.name })) : [];
  } catch {
    return [];
  }
}
const tc = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function nc({ data: t, onChange: n }) {
  const { toast: r } = pn(), a = cn(Yn)?.definition?.triggerBinding?.webhookSecret, [s, d] = S(!1), c = t.triggerType.startsWith("document."), l = q(() => c ? ec() : [], [c]), p = c && !t.documentTypeId, u = t.triggerType === "schedule" && !t.schedule, m = t.triggerType === "webhook" && !t.webhookPath, h = t.webhookPath ?? "", g = t.triggerType === "webhook" && h.length > 0 && !$r.test(h), x = t.triggerType === "webhook" && $r.test(h) ? `${Zl}/hooks/pipeline/${h}` : null, f = () => {
    x && navigator.clipboard.writeText(x).then(() => r("Webhook URL copied", { type: "success" })).catch(() => r("Could not copy webhook URL", { type: "error" }));
  }, v = () => {
    a && navigator.clipboard.writeText(a).then(() => r("Webhook secret copied", { type: "success" })).catch(() => r("Could not copy webhook secret", { type: "error" }));
  }, N = t.triggerType === "schedule" ? t.schedule ?? "" : "", b = q(
    () => N ? Yl(N) : null,
    [N]
  ), w = q(() => b ? Ql(b, /* @__PURE__ */ new Date(), 3) : [], [b]), y = t.triggerType === "schedule" && !!N && !b, k = t.triggerType === "document.finalize" ? "On finalize" : t.triggerType === "document.submit" ? "On submit for review" : t.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(oe, { label: "Trigger type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.triggerType,
        onChange: (C) => n({ triggerType: C.target.value }),
        children: tc.map((C) => /* @__PURE__ */ e("option", { value: C.value, children: C.label }, C.value))
      }
    ) }),
    c && /* @__PURE__ */ o(
      oe,
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
      oe,
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
        oe,
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
const Tr = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, rc = 3e4;
function oc(t) {
  return t < 1e3 ? `${Math.round(t)}ms` : t < 6e4 ? `${(t / 1e3).toFixed(t < 1e4 ? 1 : 0)}s` : `${Math.round(t / 6e4)}m`;
}
function ac(t) {
  const n = [];
  for (let r = 1; r < t.maxAttempts; r++) {
    const i = t.backoffMs * Math.pow(t.backoffMultiplier, r - 1);
    n.push(Math.min(i, rc));
  }
  return n;
}
function Ht({ value: t, onChange: n }) {
  const r = t !== void 0, i = t ?? Tr, a = r ? ac(i) : [], d = a.reduce((c, l) => c + l, 0) > 300 * 1e3;
  return /* @__PURE__ */ o("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "checkbox",
          checked: r,
          onChange: (c) => n(c.target.checked ? Tr : void 0),
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
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: i.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : a.length === 0 ? `Retries up to ${i.maxAttempts}× with no delay.` : `Retries up to ${i.maxAttempts}× with delays: ${a.map(oc).join(", ")}.` }),
      d && /* @__PURE__ */ e("div", { className: "text-[11px] text-[#ca8a04] mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const ic = {
  string: "bg-info-bg text-info-fg border-info-border",
  number: "bg-accent-bg text-accent-fg border-accent-border",
  boolean: "bg-warning-bg text-warning-fg border-warning-border",
  object: "bg-neutral-bg text-neutral-fg border-neutral-border",
  array: "bg-neutral-bg text-neutral-fg border-neutral-border",
  image: "bg-success-bg text-success-fg border-success-border"
};
function mn({
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
            ic[s.kind]
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
const sc = [
  { value: "anthropic", label: "Anthropic" },
  { value: "bedrock", label: "Bedrock" },
  { value: "claude-code", label: "Claude Code (subprocess)" }
], lc = {
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
function cc(t, n) {
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
function Rr(t, n) {
  return t.replace(/\{\{\s*([\w.[\]-]+)\s*\}\}/g, (r, i) => {
    const a = n.get(i);
    return a ? cc(i, a) : `{{${i}}}`;
  });
}
function dc({ data: t, onChange: n, nodeId: r }) {
  const [i, a] = S(!1), { paths: s, unresolved: d } = et(r ?? null), c = new Map(s.map((f) => [f.path, f.kind])), l = d(
    `${t.systemPrompt ?? ""}
${t.userPromptTemplate ?? ""}`
  ), p = !t.systemPrompt?.trim(), u = !t.userPromptTemplate?.trim(), m = pa(), h = (f) => m(
    `llm:${f}`,
    lc[f].map((v) => ({ value: v }))
  ), g = h(t.provider), x = (f) => {
    const v = h(f).map((b) => b.value), N = v.includes(t.model) ? t.model : v[0];
    n({ provider: f, model: N });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(oe, { label: "Provider", required: !0, children: /* @__PURE__ */ e(
      Qe,
      {
        size: "sm",
        value: t.provider,
        onChange: (f) => x(f.target.value),
        "aria-label": "Provider",
        options: sc
      }
    ) }),
    /* @__PURE__ */ e(oe, { label: "Model", required: !0, children: /* @__PURE__ */ e(
      Qe,
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
    /* @__PURE__ */ e(oe, { label: "Available context", children: /* @__PURE__ */ e(
      mn,
      {
        paths: s,
        unresolved: l,
        onInsert: (f) => n({ userPromptTemplate: `${t.userPromptTemplate ?? ""}${f}` })
      }
    ) }),
    /* @__PURE__ */ e(
      oe,
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
      oe,
      {
        label: "User prompt template",
        required: !0,
        error: u ? "User prompt template is required." : void 0,
        help: u ? void 0 : "Supports {{ context.* }} substitution — click a pill above to append.",
        children: /* @__PURE__ */ e(
          er,
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
    /* @__PURE__ */ o(bt, { title: "Advanced", defaultCollapsed: !0, children: [
      /* @__PURE__ */ o(
        oe,
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
      /* @__PURE__ */ e(oe, { label: "Max tokens", help: "Upper bound on response length.", children: /* @__PURE__ */ e(
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
        Ht,
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
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: Rr(t.systemPrompt || "(empty)", c) })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: Rr(t.userPromptTemplate || "(empty)", c) })
      ] }),
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary", children: s.length > 0 ? "Placeholders describe the shape of each upstream value; unresolved paths stay in braces." : "No upstream context — connect this node to see what it can reference." })
    ] })
  ] });
}
const pc = ["context", "context.steps", "context.trigger"], uc = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function mc({ data: t, onChange: n }) {
  const r = !t.expression?.trim();
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(oe, { label: "Type", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: uc.map((i) => /* @__PURE__ */ o(
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
      oe,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : t.transformType === "jsonpath" ? 'e.g. $.items[?(@.status == "active")]' : t.transformType === "template" ? "Mustache-style: {{ context.doc.title }}" : t.transformType === "javascript" ? "return ctx.items.filter(x => x.active)" : void 0,
        children: /* @__PURE__ */ e(
          er,
          {
            value: t.expression,
            onChange: (i) => n({ expression: i }),
            language: t.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: pc,
            "aria-label": "Transform expression"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      oe,
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
      Ht,
      {
        value: t.retryPolicy,
        onChange: (i) => n({ retryPolicy: i })
      }
    ),
    /* @__PURE__ */ e(oe, { label: "Preview", children: /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2", children: [
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
const hc = ["context.trigger", "context.steps"];
function fc({ data: t, onChange: n }) {
  const r = !t.expression?.trim();
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(
      oe,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : "e.g. context.llm.response.length > 500",
        children: /* @__PURE__ */ e(
          er,
          {
            value: t.expression,
            onChange: (i) => n({ expression: i }),
            language: "javascript",
            variables: hc,
            "aria-label": "Condition expression"
          }
        )
      }
    ),
    /* @__PURE__ */ e(oe, { label: "Label (optional — shown on node face)", help: "A short name so this branch is easy to spot.", children: /* @__PURE__ */ e(
      $e,
      {
        size: "sm",
        value: t.label ?? "",
        onChange: (i) => n({ label: i.target.value || void 0 }),
        placeholder: "Long summary?",
        "aria-label": "Condition label"
      }
    ) })
  ] });
}
const gc = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], xc = {
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
function bc({ data: t, onChange: n }) {
  const r = xc[t.actionType], i = t.config ?? {}, a = typeof i.retryCount == "number" ? i.retryCount : 3, s = t.onError === "route-error" ? "route-error" : typeof i.retryCount == "number" ? "retry" : "halt", d = (l, p) => {
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
    /* @__PURE__ */ e(oe, { label: "Action type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.actionType,
        onChange: (l) => n({ actionType: l.target.value, config: {} }),
        children: gc.map((l) => /* @__PURE__ */ e("option", { value: l.value, children: l.label }, l.value))
      }
    ) }),
    /* @__PURE__ */ e(oe, { label: "Configuration", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-2.5", children: r.map((l) => /* @__PURE__ */ o("div", { children: [
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
    t.idempotent && /* @__PURE__ */ o(oe, { label: "Dedup scope", children: [
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
      Ht,
      {
        value: t.retryPolicy,
        onChange: (l) => n({ retryPolicy: l })
      }
    ),
    /* @__PURE__ */ e(oe, { label: "On error", children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
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
const ut = 2, Tt = 8;
function Pr(t, n) {
  const r = t ?? [];
  return r.length === n ? r : r.length > n ? r.slice(0, n) : [...r, ...Array(n - r.length).fill("")];
}
function yc({ data: t, onChange: n }) {
  const r = Math.max(ut, Math.min(Tt, t.branchCount || ut)), i = Pr(t.branchLabels, r), a = (d) => {
    const c = Math.max(ut, Math.min(Tt, d));
    n({
      branchCount: c,
      branchLabels: Pr(t.branchLabels, c)
    });
  }, s = (d, c) => {
    const l = [...i];
    l[d] = c, n({ branchLabels: l });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(
      oe,
      {
        label: "Branch count",
        required: !0,
        help: `Between ${ut} and ${Tt} parallel branches.`,
        children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs ml-2", children: r }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: ut,
              max: Tt,
              step: 1,
              value: r,
              onChange: (d) => a(parseInt(d.target.value, 10)),
              className: "w-full mt-1"
            }
          ),
          /* @__PURE__ */ e(
            De,
            {
              size: "sm",
              min: ut,
              max: Tt,
              value: r,
              onChange: a,
              "data-testid": "fork-branch-count"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e(oe, { label: "Branch labels (optional)", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: i.map((d, c) => /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-xs text-text-secondary min-w-[72px]", children: [
        "Branch ",
        c,
        ":"
      ] }),
      /* @__PURE__ */ e(
        $e,
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
const vc = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], Nc = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function wc({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(oe, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ e(
        cr,
        {
          name: "join-mode",
          value: t.mode,
          onChange: (r) => n({ mode: r }),
          options: vc.map((r) => ({
            value: r.value,
            label: r.label,
            description: r.hint
          })),
          "data-testid": "join-mode"
        }
      ),
      t.mode === "n_of_m" && /* @__PURE__ */ o("div", { className: "mt-2 flex items-center gap-2", children: [
        /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold text-text-secondary", children: "N" }),
        /* @__PURE__ */ e(
          De,
          {
            size: "sm",
            min: 1,
            value: t.n ?? 1,
            onChange: (r) => n({ n: r }),
            "data-testid": "join-n"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e(oe, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ e(
      cr,
      {
        name: "join-merge",
        value: t.mergeStrategy,
        onChange: (r) => n({ mergeStrategy: r }),
        options: Nc.map((r) => ({
          value: r.value,
          label: r.label,
          description: r.hint
        })),
        "data-testid": "join-merge"
      }
    ) }),
    /* @__PURE__ */ o("div", { className: "p-2 bg-surface-inset border border-border rounded-md text-xs text-text-secondary", children: [
      "Current inputs: ",
      /* @__PURE__ */ e("strong", { children: "TBD" }),
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Derived from incoming edges once the canvas is connected." })
    ] })
  ] });
}
const qt = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5
};
function kc(t) {
  return !t || t <= 0 ? "minutes" : t % qt.hours === 0 ? "hours" : t % qt.minutes === 0 ? "minutes" : "seconds";
}
function Cc({ data: t, onChange: n }) {
  const r = t.approvers ?? [], i = r.length === 0, [a, s] = S(() => kc(t.timeoutMs)), d = t.timeoutMs !== void 0 ? Math.round(t.timeoutMs / qt[a]) : "", c = r.filter((g) => g.type === "user").map((g) => g.value), l = (g) => {
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
    n({ timeoutMs: x * qt[a] });
  }, m = (g) => {
    s(g), typeof d == "number" && !Number.isNaN(d) && n({ timeoutMs: d * qt[g] });
  }, h = Math.max(1, r.length);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(
      oe,
      {
        label: "Approvers",
        required: !0,
        error: i ? "At least one approver is required." : void 0,
        help: i ? void 0 : "Who can approve this step.",
        children: [
          /* @__PURE__ */ e(
            Oa,
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
      oe,
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
    /* @__PURE__ */ o(oe, { label: "Timeout", help: "Leave blank for no timeout.", children: [
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
    /* @__PURE__ */ e(oe, { label: "Message for approver (optional)", help: "Shown to the approver when the request is sent.", children: /* @__PURE__ */ e(
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
function zn(t) {
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
function jo(t) {
  const n = Array.isArray(t.type) ? t.type[0] : t.type;
  if (n === "array") {
    const r = t.items ? Array.isArray(t.items.type) ? t.items.type[0] : t.items.type : void 0;
    return r ? `array of ${r}` : "array";
  }
  return n ?? "unknown";
}
function Wt(t, n, r, i, a) {
  if (a.has(t)) return;
  a.add(t);
  const s = Array.isArray(t.type) ? t.type[0] : t.type, d = [t.anyOf, t.oneOf, t.allOf].filter(Boolean);
  for (const c of d)
    for (const l of c)
      Wt(l, n, r, i, a);
  if (s === "object" && t.properties) {
    for (const [c, l] of Object.entries(t.properties)) {
      const p = `${n}.${c}`, u = zn(l);
      i.push({
        path: p,
        label: `${c} (${jo(l)})`,
        depth: r,
        kind: u,
        isArrayItems: u === "array"
      }), Wt(l, p, r + 1, i, a);
    }
    return;
  }
  if (s === "array") {
    const c = `${n}[*]`, l = t.items, p = l ? zn(l) : "unknown";
    i.push({
      path: c,
      label: `${n.slice(n.lastIndexOf(".") + 1)}[*] (each item)`,
      depth: r,
      kind: p,
      isArrayItems: !0
    }), l && Wt(l, c, r + 1, i, a);
  }
}
function Ic(t, n = "$") {
  if (!t || typeof t != "object") return [];
  const r = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(t.type) ? t.type[0] : t.type) === "object" && t.properties)
    for (const [s, d] of Object.entries(t.properties)) {
      const c = `${n}.${s}`, l = zn(d);
      r.push({
        path: c,
        label: `${s} (${jo(d)})`,
        depth: 0,
        kind: l,
        isArrayItems: l === "array"
      }), Wt(d, c, 1, r, i);
    }
  else
    Wt(t, n, 0, r, i);
  return r;
}
const Sc = {};
function $c() {
  return `${(typeof import.meta < "u" && Sc?.VITE_SOCIAL_API_URL) ?? ""}/api/pipeline/output-schemas`;
}
let vn = null, Rt = null;
async function Tc() {
  return vn || (Rt || (Rt = fetch($c()).then((t) => {
    if (!t.ok) throw new Error(`HTTP ${t.status}`);
    return t.json();
  }).then((t) => (vn = t, Rt = null, t)).catch((t) => {
    throw Rt = null, t;
  })), Rt);
}
const Rc = {
  array: "bg-primary-bg text-primary-fg border-primary-border",
  object: "bg-surface-panel text-text-secondary border-border",
  string: "bg-success-bg text-success-fg border-success-border",
  number: "bg-warning-bg text-warning-fg border-warning-border",
  boolean: "bg-pink-50 text-pink-700 border-pink-200",
  unknown: "bg-surface-panel text-text-tertiary border-border"
};
function Pc({ kind: t }) {
  return /* @__PURE__ */ e(
    "span",
    {
      className: I(
        "inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4",
        Rc[t]
      ),
      children: t
    }
  );
}
function Ac({ entry: t, isSelected: n, onPick: r }) {
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
        /* @__PURE__ */ e(Pc, { kind: t.kind })
      ]
    }
  );
}
function Mc({
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
    !r || i !== void 0 || (s("loading"), Tc().then((f) => {
      if (!l.current) return;
      const v = f.schemas[r] ?? null;
      c(v), s("done");
    }).catch(() => {
      l.current && s("error");
    }));
  }, [r, i]);
  const u = q(
    () => Ic(p),
    [p]
  ), m = p !== null && u.length > 0, h = E(
    (f) => {
      n(f);
    },
    [n]
  );
  if (!r && i === void 0)
    return /* @__PURE__ */ e(
      hn,
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
        hn,
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
          Ac,
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
      hn,
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
const Nn = "text-[12px] font-semibold text-text-secondary", wn = "text-[11px] text-text-tertiary mt-0.5", Dc = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary";
function Ec(t) {
  const { definition: n } = Ve();
  return q(() => {
    if (!t || !n) return;
    const r = n.edges.find((a) => a.target === t);
    if (!r) return;
    const i = n.nodes.find((a) => a.id === r.source);
    if (i)
      return i.type;
  }, [t, n]);
}
function Oc({ data: t, onChange: n }) {
  const { selectedNodeId: r } = Ve(), i = Ec(r), a = t.maxConcurrency ?? "";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { className: Nn, children: [
        "Items path",
        /* @__PURE__ */ e("span", { className: "text-danger-fg ml-1", "aria-hidden": !0, children: "*" })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-1", children: /* @__PURE__ */ e(
        Mc,
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
      !!t.itemsPath?.startsWith("$.") && /* @__PURE__ */ e("div", { className: wn, children: "JSONPath into context resolving to an array. Each element becomes one scatter arm." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-item-alias", className: Nn, children: [
        "Item alias ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, default: item)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "scatter-item-alias",
          type: "text",
          spellCheck: !1,
          className: Dc,
          value: t.itemAlias ?? "",
          onChange: (s) => n({ itemAlias: s.target.value.trim() || void 0 }),
          placeholder: "item"
        }
      ),
      /* @__PURE__ */ o("div", { className: wn, children: [
        "Key written to ",
        /* @__PURE__ */ e("code", { children: "$.scatter.<alias>" }),
        " for each arm."
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-max-concurrency", className: Nn, children: [
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
      /* @__PURE__ */ e("div", { className: wn, children: "Maximum number of arms executing concurrently." })
    ] })
  ] });
}
const _c = ["cover", "contain", "fill", "inside", "outside"], Pt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", At = "text-[12px] font-semibold text-text-secondary", Ar = "text-[11px] text-text-tertiary mt-0.5";
function Lc({ data: t, onChange: n, nodeId: r }) {
  const i = _e(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "resize-source-image-path", className: At, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "resize-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Pt,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Re, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "resize-width", className: At, children: "Width (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "resize-width",
            type: "number",
            min: 1,
            step: 1,
            className: Pt,
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
        /* @__PURE__ */ e("label", { htmlFor: "resize-height", className: At, children: "Height (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "resize-height",
            type: "number",
            min: 1,
            step: 1,
            className: Pt,
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
      /* @__PURE__ */ e("label", { htmlFor: "resize-fit", className: At, children: "Fit mode" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "resize-fit",
          className: Pt,
          value: t.fit ?? "cover",
          onChange: (a) => n({ fit: a.target.value }),
          children: _c.map((a) => /* @__PURE__ */ e("option", { value: a, children: a }, a))
        }
      ),
      /* @__PURE__ */ o("div", { className: Ar, children: [
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
      /* @__PURE__ */ o("label", { htmlFor: "resize-background", className: At, children: [
        "Background colour ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, for contain / fill)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "resize-background",
          type: "text",
          spellCheck: !1,
          className: Pt,
          value: t.background ?? "",
          onChange: (a) => n({ background: a.target.value.trim() || void 0 }),
          placeholder: "#ffffff"
        }
      ),
      /* @__PURE__ */ o("div", { className: Ar, children: [
        "Hex colour used to fill letterbox padding. Only applies when fit is ",
        /* @__PURE__ */ e("code", { children: "contain" }),
        " or ",
        /* @__PURE__ */ e("code", { children: "fill" }),
        "."
      ] })
    ] })
  ] });
}
function Bc(t) {
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
const qn = "text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", Uc = "flex-1 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Mr = "text-[12px] font-semibold text-text-secondary", jc = "text-[11px] text-text-tertiary mt-0.5";
function Fc({ op: t, index: n, onUpdate: r, onRemove: i }) {
  return /* @__PURE__ */ o("div", { className: "border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2", "data-testid": `geo-op-card-${n}`, children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary font-semibold min-w-[20px]", children: [
        n + 1,
        "."
      ] }),
      /* @__PURE__ */ o(
        "select",
        {
          className: Uc,
          value: t.op,
          onChange: (a) => r(Bc(a.target.value)),
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
            className: `${qn} w-24`,
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
            className: `${qn} flex-1`,
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
function zc({ data: t, onChange: n, nodeId: r }) {
  const i = _e(r ?? null), a = t.operations ?? [], s = (l, p) => {
    n({ operations: a.map((u, m) => m === l ? p : u) });
  }, d = (l) => {
    n({ operations: a.filter((p, u) => u !== l) });
  }, c = () => {
    n({ operations: [...a, { op: "rotate", degrees: 90 }] });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "transform-geo-source-image-path", className: Mr, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "transform-geo-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `mt-1 w-full ${qn}`,
          value: t.sourceImagePath ?? "",
          onChange: (l) => n({ sourceImagePath: l.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Re, { samples: i.map((l) => l.path), onSelect: (l) => n({ sourceImagePath: l }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${Mr} mb-2`, children: [
        "Operations ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      a.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-2 italic", children: "No operations — add at least one." }),
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: a.map((l, p) => /* @__PURE__ */ e(
        Fc,
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
      /* @__PURE__ */ e("div", { className: `${jc} mt-1.5`, children: "Supported: Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror)." })
    ] })
  ] });
}
const qc = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "avif", label: "AVIF" }
], Wn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Wc = `${Wn} font-mono`, kn = "text-[12px] font-semibold text-text-secondary", Cn = "text-[11px] text-text-tertiary mt-0.5";
function Vc({ data: t, onChange: n, nodeId: r }) {
  const i = _e(r ?? null), a = t.format === "jpeg" || t.format === "webp" || t.format === "avif";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-source-image-path", className: kn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "format-convert-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Wc,
          value: t.sourceImagePath ?? "",
          onChange: (s) => n({ sourceImagePath: s.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Re, { samples: i.map((s) => s.path), onSelect: (s) => n({ sourceImagePath: s }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "format-convert-format", className: kn, children: "Output format" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "format-convert-format",
          className: Wn,
          value: t.format ?? "jpeg",
          onChange: (s) => n({ format: s.target.value }),
          children: qc.map((s) => /* @__PURE__ */ e("option", { value: s.value, children: s.label }, s.value))
        }
      )
    ] }),
    a && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-quality", className: kn, children: [
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
          className: Wn,
          value: t.quality ?? 80,
          onChange: (s) => {
            const d = parseInt(s.target.value, 10);
            n({ quality: Number.isFinite(d) ? Math.min(100, Math.max(1, d)) : 80 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Cn, children: "Higher = better quality, larger file. 80 is a good default." })
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
      /* @__PURE__ */ e("div", { className: Cn, children: "Overrides quality when enabled. Produces larger files with no compression artefacts." })
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
      /* @__PURE__ */ e("div", { className: Cn, children: "Removes camera EXIF, GPS, copyright tags etc. Reduces file size; recommended for web delivery." })
    ] })
  ] });
}
function Kc({ data: t, onChange: n, nodeId: r }) {
  const i = _e(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(
      oe,
      {
        label: "Source image path",
        help: "Optional. Defaults to the image produced upstream.",
        children: [
          /* @__PURE__ */ e(
            $e,
            {
              size: "sm",
              mono: !0,
              spellCheck: !1,
              value: t.sourceImagePath ?? "",
              onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
              placeholder: "$.trigger.imageRef",
              "aria-label": "Source image path"
            }
          ),
          /* @__PURE__ */ e(
            Re,
            {
              samples: i.map((a) => a.path),
              onSelect: (a) => n({ sourceImagePath: a }),
              "aria-label": "Upstream image refs"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e(
      oe,
      {
        label: "Sigma",
        help: "Gaussian mask sigma. Higher is broader and stronger. Typical range 0.5–3.",
        children: /* @__PURE__ */ e(
          De,
          {
            size: "sm",
            min: 0.01,
            max: 10,
            step: 0.1,
            value: t.sigma,
            onChange: (a) => n({ sigma: a }),
            onClear: () => n({ sigma: void 0 }),
            placeholder: "1",
            "data-testid": "sharpen-sigma"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      oe,
      {
        label: "m1 — flat area level",
        help: "Sharpening applied to flat (smooth) areas of the image.",
        children: /* @__PURE__ */ e(
          De,
          {
            size: "sm",
            min: 0,
            step: 0.1,
            value: t.m1,
            onChange: (a) => n({ m1: a }),
            onClear: () => n({ m1: void 0 }),
            placeholder: "leave blank for default",
            "data-testid": "sharpen-m1"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      oe,
      {
        label: "m2 — jagged area level",
        help: "Sharpening applied to jagged (edge) areas of the image.",
        children: /* @__PURE__ */ e(
          De,
          {
            size: "sm",
            min: 0,
            step: 0.1,
            value: t.m2,
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
const Hc = [
  "northwest",
  "north",
  "northeast",
  "west",
  "center",
  "east",
  "southwest",
  "south",
  "southeast"
], Lt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Dr = `${Lt} font-mono`, mt = "text-[12px] font-semibold text-text-secondary", Er = "text-[11px] text-text-tertiary mt-0.5";
function Jc({ data: t, onChange: n, nodeId: r }) {
  const i = _e(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "watermark-source-image-path", className: mt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Dr,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Re, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-overlay-image-id", className: mt, children: "Overlay image ID" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-overlay-image-id",
          type: "text",
          spellCheck: !1,
          className: Dr,
          value: t.overlayImageId ?? "",
          onChange: (a) => n({ overlayImageId: a.target.value.trim() }),
          placeholder: "img_xxxxxxxx"
        }
      ),
      /* @__PURE__ */ e("div", { className: Er, children: "The imageId of the watermark/overlay image already stored in the blob store. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-gravity", className: mt, children: "Gravity (placement)" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "watermark-gravity",
          className: Lt,
          value: t.gravity ?? "southeast",
          onChange: (a) => n({ gravity: a.target.value }),
          children: Hc.map((a) => /* @__PURE__ */ e("option", { value: a, children: a }, a))
        }
      ),
      /* @__PURE__ */ e("div", { className: Er, children: "Where the overlay is placed on the source image. Default: southeast." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "watermark-opacity", className: mt, children: [
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
          className: Lt,
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
        /* @__PURE__ */ e("label", { htmlFor: "watermark-offset-x", className: mt, children: "Offset X (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "watermark-offset-x",
            type: "number",
            step: 1,
            className: Lt,
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
        /* @__PURE__ */ e("label", { htmlFor: "watermark-offset-y", className: mt, children: "Offset Y (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "watermark-offset-y",
            type: "number",
            step: 1,
            className: Lt,
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
const Or = 50;
function Gc(t, n) {
  const [r, i] = S(t), [a, s] = S([]), [d, c] = S([]), l = ce(r);
  l.current = r;
  const p = E(
    (N) => {
      i((b) => {
        const w = N(b);
        return s((y) => {
          const k = [...y, b];
          return k.length > Or && k.shift(), k;
        }), c([]), n(w), w;
      });
    },
    [n]
  ), u = E(
    (N) => {
      p((b) => [...b, N]);
    },
    [p]
  ), m = E(
    (N, b, w) => {
      p(
        (y) => y.map((k) => k.id === N ? { ...k, x: b, y: w } : k)
      );
    },
    [p]
  ), h = E(
    (N, b, w, y, k) => {
      p(
        (C) => C.map(($) => $.id === N ? { ...$, x: b, y: w, width: y, height: k } : $)
      );
    },
    [p]
  ), g = E(
    (N, b) => {
      p(
        (w) => w.map((y) => y.id === N ? { ...y, label: b } : y)
      );
    },
    [p]
  ), x = E(
    (N) => {
      p((b) => b.filter((w) => w.id !== N));
    },
    [p]
  ), f = E(() => {
    s((N) => {
      if (N.length === 0) return N;
      const b = N[N.length - 1];
      c((y) => [...y, l.current]);
      const w = b;
      return i(w), n(w), N.slice(0, -1);
    });
  }, [n]), v = E(() => {
    c((N) => {
      if (N.length === 0) return N;
      const b = N[N.length - 1];
      s((y) => {
        const k = [...y, l.current];
        return k.length > Or && k.shift(), k;
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
function Yc() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Ce(t, n, r) {
  return Math.max(n, Math.min(r, t));
}
function In(t, n) {
  const r = n.getBoundingClientRect();
  return {
    x: Ce(t.clientX - r.left, 0, r.width),
    y: Ce(t.clientY - r.top, 0, r.height)
  };
}
function Sn(t, n, r, i, a, s) {
  const d = a / r, c = s / i;
  return { x: t * d, y: n * c };
}
function _r(t, n, r) {
  return {
    left: `${t.x / n * 100}%`,
    top: `${t.y / r * 100}%`,
    width: `${t.width / n * 100}%`,
    height: `${t.height / r * 100}%`
  };
}
function Xc(t, n, r) {
  for (let i = r.length - 1; i >= 0; i--) {
    const a = r[i];
    if (t >= a.x && t <= a.x + a.width && n >= a.y && n <= a.y + a.height)
      return a;
  }
  return null;
}
function Fo({
  imageUrl: t,
  imageWidth: n,
  imageHeight: r,
  boxes: i,
  onChange: a,
  readOnly: s = !1,
  className: d
}) {
  const c = ce(null), [l, p] = S({ kind: "idle" }), [u, m] = S(null), h = ce(null), { addBox: g, moveBox: x, resizeBox: f, setLabel: v, deleteBox: N } = Gc(
    i,
    a
  );
  re(() => {
    u && h.current && (h.current.focus(), h.current.select());
  }, [u]);
  const b = E(
    (O) => {
      if (s || O.button !== 0) return;
      const P = c.current;
      if (!P) return;
      O.preventDefault(), P.setPointerCapture(O.pointerId);
      const { x: G, y: F } = In(O, P), _ = P.getBoundingClientRect(), { x: W, y: V } = Sn(
        G,
        F,
        _.width,
        _.height,
        n,
        r
      ), Y = Xc(W, V, i);
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
  ), w = E(
    (O, P, G) => {
      if (s) return;
      O.stopPropagation(), O.preventDefault();
      const F = c.current;
      if (!F) return;
      F.setPointerCapture(O.pointerId);
      const { x: _, y: W } = In(O, F), V = F.getBoundingClientRect(), { x: Y, y: me } = Sn(_, W, V.width, V.height, n, r);
      p({ kind: "resize", id: P.id, corner: G, origBox: { ...P }, currentX: Y, currentY: me });
    },
    [s, n, r]
  ), y = E(
    (O) => {
      if (l.kind === "idle") return;
      const P = c.current;
      if (!P) return;
      const { x: G, y: F } = In(O, P), _ = P.getBoundingClientRect(), { x: W, y: V } = Sn(G, F, _.width, _.height, n, r);
      l.kind === "create" ? p((Y) => Y.kind === "create" ? { ...Y, currentX: W, currentY: V } : Y) : l.kind === "move" ? p((Y) => Y.kind === "move" ? { ...Y, currentX: W, currentY: V } : Y) : l.kind === "resize" && p((Y) => Y.kind === "resize" ? { ...Y, currentX: W, currentY: V } : Y);
    },
    [l.kind, n, r]
  ), k = E(
    (O) => {
      if (l.kind === "create") {
        const P = Math.min(l.startX, l.currentX), G = Math.min(l.startY, l.currentY), F = Math.max(l.startX, l.currentX), _ = Math.max(l.startY, l.currentY), W = F - P, V = _ - G;
        W >= 4 && V >= 4 && g({ id: Yc(), x: P, y: G, width: W, height: V });
      } else if (l.kind === "move") {
        const P = i.find((G) => G.id === l.id);
        if (P) {
          const G = Ce(l.currentX - l.offsetX, 0, n - P.width), F = Ce(l.currentY - l.offsetY, 0, r - P.height);
          x(l.id, G, F);
        }
      } else if (l.kind === "resize") {
        const { id: P, corner: G, origBox: F, currentX: _, currentY: W } = l;
        let { x: V, y: Y, width: me, height: z } = F;
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
  ), C = E(
    (O, P) => {
      s || (O.preventDefault(), N(P));
    },
    [s, N]
  ), $ = E(
    (O, P) => {
      s || (O.key === "Delete" || O.key === "Backspace") && (O.preventDefault(), N(P));
    },
    [s, N]
  ), D = E(
    (O, P) => {
      s || (O.stopPropagation(), m({ id: P.id, value: P.label ?? "" }));
    },
    [s]
  ), A = E(() => {
    u && (v(u.id, u.value), m(null));
  }, [u, v]);
  let M = null;
  if (l.kind === "create") {
    const O = Math.min(l.startX, l.currentX), P = Math.min(l.startY, l.currentY), G = Math.max(l.startX, l.currentX), F = Math.max(l.startY, l.currentY);
    G - O >= 2 && F - P >= 2 && (M = { x: O, y: P, width: G - O, height: F - P });
  }
  let ne = null;
  if (l.kind === "move") {
    const O = i.find((P) => P.id === l.id);
    if (O) {
      const P = Ce(l.currentX - l.offsetX, 0, n - O.width), G = Ce(l.currentY - l.offsetY, 0, r - O.height);
      ne = { ...O, x: P, y: G };
    }
  }
  let R = null;
  if (l.kind === "resize") {
    const { corner: O, origBox: P, currentX: G, currentY: F } = l;
    let { x: _, y: W, width: V, height: Y } = P;
    if (O === "nw") {
      const me = Ce(G, 0, _ + V - 4), z = Ce(F, 0, W + Y - 4);
      V = _ + V - me, Y = W + Y - z, _ = me, W = z;
    } else if (O === "ne") {
      const me = Ce(F, 0, W + Y - 4);
      V = Ce(G - _, 4, n - _), Y = W + Y - me, W = me;
    } else if (O === "sw") {
      const me = Ce(G, 0, _ + V - 4);
      V = _ + V - me, Y = Ce(F - W, 4, r - W), _ = me;
    } else
      V = Ce(G - _, 4, n - _), Y = Ce(F - W, 4, r - W);
    R = { ...P, x: _, y: W, width: V, height: Y };
  }
  const H = /* @__PURE__ */ new Set();
  l.kind === "move" && H.add(l.id), l.kind === "resize" && H.add(l.id);
  const X = (O, P) => {
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
        onPointerDown: (F) => w(F, O, P)
      },
      P
    );
  }, J = (O, P, G, F) => {
    const _ = _r(O, n, r), W = u?.id === O.id;
    return /* @__PURE__ */ o(
      "div",
      {
        role: "none",
        "aria-label": `Bounding box${O.label ? ": " + O.label : ""}`,
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
              "aria-label": `Label: ${O.label || "Unlabeled"}. Double-click to edit.`,
              className: "absolute -top-5 left-0 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow",
              style: { whiteSpace: "nowrap" },
              onDoubleClick: (V) => D(V, O),
              onContextMenu: (V) => C(V, O.id),
              onKeyDown: (V) => $(V, O.id),
              children: O.label || "Unlabeled"
            }
          ),
          G && !s && /* @__PURE__ */ o(K, { children: [
            X(O, "nw"),
            X(O, "ne"),
            X(O, "sw"),
            X(O, "se")
          ] })
        ]
      },
      F
    );
  }, Q = () => {
    if (!M) return null;
    const O = _r(M, n, r);
    return /* @__PURE__ */ e(
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
              i.map((O) => H.has(O.id) ? null : J(O, !1, !0, `box-${O.id}`)),
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
const Qc = [
  "$.scatter.item.bbox",
  "$.steps.visionAnalyze.output.extracted.regions[0].bbox",
  "$.trigger.payload.bbox"
], Zc = "crop-region", ed = "crop", Lr = "mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", $n = "text-[12px] font-semibold text-text-secondary", Mt = "text-[11px] text-text-tertiary mt-0.5";
function td(t) {
  const { definition: n } = Ve(), r = q(() => !t || !n ? null : n.edges.find((d) => d.target === t)?.source ?? null, [n, t]), a = he(r ?? "")?.images?.[0];
  return a ? { imageId: a.imageId, width: a.width, height: a.height } : null;
}
function nd({
  data: t,
  onChange: n,
  currentNodeId: r
}) {
  const i = _e(r ?? null), a = t.materialize !== !1, s = td(r), d = Pe(), c = q(() => t.bbox ? [
    {
      id: Zc,
      x: t.bbox.x,
      y: t.bbox.y,
      width: t.bbox.width,
      height: t.bbox.height,
      label: ed
    }
  ] : [], [t.bbox]), l = E(
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
      /* @__PURE__ */ o("label", { htmlFor: "crop-source-image-path", className: $n, children: [
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
          className: Lr,
          value: t.sourceImagePath ?? "",
          onChange: (p) => n({ sourceImagePath: p.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ o("div", { className: Mt, children: [
        "JSONPath to the imageId of the source image. Defaults server-side to",
        " ",
        /* @__PURE__ */ e("code", { children: "$.scatter.parentImageId" }),
        "."
      ] }),
      /* @__PURE__ */ e(
        Re,
        {
          samples: i.map((p) => p.path),
          onSelect: (p) => n({ sourceImagePath: p })
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-bbox-path", className: $n, children: [
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
          className: Lr,
          value: t.bboxPath ?? "",
          onChange: (p) => n({ bboxPath: p.target.value.trim() || void 0 }),
          placeholder: "$.scatter.item.bbox"
        }
      ),
      /* @__PURE__ */ o("div", { className: Mt, children: [
        "JSONPath to a bbox object ",
        /* @__PURE__ */ e("code", { children: "{ x, y, width, height }" }),
        " in pixels. Overrides the manual crop region below when present at run time."
      ] }),
      /* @__PURE__ */ e(
        Re,
        {
          samples: Qc,
          onSelect: (p) => n({ bboxPath: p })
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { "data-testid": "crop-region-section", children: [
      /* @__PURE__ */ o("div", { className: $n, children: [
        "Crop region",
        " ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e("div", { className: Mt, children: "Drag on the source image to paint the crop box. Drawing a new box replaces the previous one." }),
      s ? /* @__PURE__ */ o(K, { children: [
        /* @__PURE__ */ e(
          Fo,
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
            ] }) : /* @__PURE__ */ e("span", { className: I(Mt, "italic"), children: "No crop region yet — drag on the image to add one." })
          }
        )
      ] }) : /* @__PURE__ */ e(
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
    /* @__PURE__ */ e("div", { className: Mt, children: "When enabled (default), the cropped image is saved to the ImageBlobStore." })
  ] });
}
function rd(t) {
  const { selectedNodeId: n } = Ve();
  return /* @__PURE__ */ e(nd, { ...t, currentNodeId: n });
}
const od = [
  { value: "luminosity", label: "Luminosity — 0.21R + 0.72G + 0.07B (perceptually accurate)" },
  { value: "average", label: "Average — (R+G+B)/3 (fast, flat)" },
  { value: "desaturate", label: "Desaturate — (max+min)/2 (Lightness channel)" }
];
function ad({ data: t, onChange: n, nodeId: r }) {
  const i = t.algorithm ?? "luminosity", a = t.contrast ?? 1;
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(
      or,
      {
        value: t.sourceImagePath,
        onChange: (s) => n({ sourceImagePath: s }),
        nodeId: r,
        help: "JSONPath to the imageId of the source image.",
        placeholder: "$.scatter.parentImageId"
      }
    ),
    /* @__PURE__ */ e(
      oe,
      {
        label: "Greyscale algorithm",
        help: "Controls how RGB channels are weighted when converting to greyscale.",
        children: /* @__PURE__ */ e(
          Qe,
          {
            size: "sm",
            value: i,
            onChange: (s) => n({ algorithm: s.target.value }),
            "aria-label": "Greyscale algorithm",
            options: od
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      oe,
      {
        label: "Contrast multiplier",
        help: "Applied after greyscale conversion. 1 is no change, below 1 lowers contrast, above 1 raises it. Range 0–4.",
        children: /* @__PURE__ */ e(
          De,
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
function id({
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
            Io,
            {
              src: w,
              alt: "Uploaded image",
              size: "md",
              aspectRatio: "square",
              "data-testid": p ? `${p}-thumbnail` : void 0
            }
          ),
          /* @__PURE__ */ e(
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
        u && /* @__PURE__ */ e(
          "p",
          {
            className: "text-sm text-neutral",
            "data-testid": p ? `${p}-uploading` : void 0,
            children: "Uploading..."
          }
        ),
        !c && /* @__PURE__ */ e(
          Ua,
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
                $e,
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
function zo(t) {
  const n = Co(), r = n.uploadImage;
  return r ? /* @__PURE__ */ e(
    id,
    {
      ...t,
      uploadImage: r,
      getImageUrl: n.getImageUrl
    }
  ) : /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: "This host has not wired uploadImage. Cannot accept new uploads." });
}
const Vn = {
  brightness: "Brightness",
  contrast: "Contrast",
  saturation: "Saturation",
  hue: "Hue",
  blur: "Blur"
}, qo = Object.keys(Vn).map((t) => ({
  value: t,
  label: Vn[t]
})), sd = {
  brightness: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  contrast: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  saturation: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  hue: { min: -180, max: 180, step: 1, unit: "°", defaultValue: 0 },
  blur: { min: 0, max: 50, step: 0.5, unit: "px", defaultValue: 1 }
};
function Wo(t) {
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
function ld(t) {
  switch (t.kind) {
    case "hue":
      return t.degrees;
    case "blur":
      return t.radiusPx;
    default:
      return t.value;
  }
}
function Br(t, n) {
  switch (t.kind) {
    case "hue":
      return { kind: "hue", degrees: n };
    case "blur":
      return { kind: "blur", radiusPx: n };
    default:
      return { kind: t.kind, value: n };
  }
}
const cd = I(
  "w-4 h-full flex items-center justify-center",
  "text-[14px] text-text-tertiary cursor-grab select-none shrink-0"
);
I(
  "text-[11px] font-semibold px-2 py-0.5 rounded-full",
  "bg-surface-hover border border-border text-text-secondary",
  "whitespace-nowrap shrink-0"
);
function dd({ layer: t, index: n, onUpdate: r, onRemove: i }) {
  const a = sd[t.kind], s = ld(t), d = (p) => {
    r(Wo(p.target.value));
  }, c = (p) => {
    const u = parseFloat(p.target.value);
    Number.isFinite(u) && r(Br(t, u));
  }, l = (p) => {
    r(Br(t, p));
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-surface-inset",
      "data-testid": `layer-row-${n}`,
      children: [
        /* @__PURE__ */ e("span", { className: cd, "aria-hidden": "true", title: "Drag handle", children: "⠿" }),
        /* @__PURE__ */ e(
          Qe,
          {
            value: t.kind,
            onChange: d,
            options: qo,
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
            "aria-label": `${Vn[t.kind]} slider`,
            "data-testid": `layer-slider-${n}`
          }
        ),
        /* @__PURE__ */ e(
          De,
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
const pd = 150;
function ud(t, n, r) {
  const [i, a] = S(null), [s, d] = S(!1), c = ce(null), l = ce(null), p = E(
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
    }, pd), () => {
      c.current && clearTimeout(c.current);
    };
  }, [t, JSON.stringify(n), p]), { previewSrc: i, loading: s };
}
function Ur(t) {
  return t.length <= 8 ? t : `${t.slice(0, 8)}…`;
}
function md({
  layers: t,
  onChange: n,
  autoSourceImageId: r,
  pinnedSourceImageId: i,
  onPinnedSourceImageIdChange: a,
  sourceImageId: s,
  apiBase: d = ""
}) {
  const [c, l] = S("brightness"), [p, u] = S(!1), m = r ?? s, h = i ?? m, g = !!i, { previewSrc: x, loading: f } = ud(h, t, d), v = () => {
    a?.(void 0);
  }, N = (C) => {
    C?.imageId && (a?.(C.imageId), u(!1));
  }, b = (C, $) => {
    n(t.map((D, A) => A === C ? $ : D));
  }, w = (C) => {
    n(t.filter(($, D) => D !== C));
  }, y = () => {
    n([...t, Wo(c)]);
  }, k = (C) => {
    l(C.target.value);
  };
  return /* @__PURE__ */ o("div", { className: "flex gap-3 p-3", "data-testid": "adjust-layer-slider-panel", children: [
    /* @__PURE__ */ o("div", { className: "flex-1 flex flex-col gap-2 min-w-0", children: [
      t.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary italic", children: "No layers — add one below." }),
      t.map((C, $) => /* @__PURE__ */ e(
        dd,
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
          Qe,
          {
            value: c,
            onChange: k,
            options: qo,
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
                    Ur(h),
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
                  Ur(m),
                  " from upstream run"
                ]
              }
            ) : null,
            a && /* @__PURE__ */ e(
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
      p && a && /* @__PURE__ */ e(
        "div",
        {
          className: "w-48",
          "data-testid": "adjust-layer-override-uploader-wrap",
          children: /* @__PURE__ */ e(
            zo,
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
          Io,
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
const jr = "text-[12px] font-semibold text-text-secondary", hd = "text-[11px] text-text-tertiary mt-0.5";
function fd(t) {
  const { definition: n } = Ve(), r = q(() => !t || !n ? null : n.edges.find((s) => s.target === t)?.source ?? null, [n, t]);
  return he(r ?? "")?.images?.[0]?.imageId;
}
function gd({
  data: t,
  onChange: n,
  currentNodeId: r
}) {
  const i = _e(r ?? null), a = fd(r), s = t.previewSourceImageId, d = t.layers ?? [];
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-layer-source-image-path", className: jr, children: [
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
      /* @__PURE__ */ e("div", { className: hd, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(Re, { samples: i.map((c) => c.path), onSelect: (c) => n({ sourceImagePath: c }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${jr} mb-1`, children: [
        "Adjustment layers ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      /* @__PURE__ */ e(
        md,
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
function xd(t) {
  const { selectedNodeId: n } = Ve();
  return /* @__PURE__ */ e(gd, { ...t, currentNodeId: n });
}
const bd = 1024;
function yd({ data: t, onChange: n, nodeId: r }) {
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(
      or,
      {
        value: t.sourceImagePath,
        onChange: (i) => n({ sourceImagePath: i }),
        nodeId: r
      }
    ),
    /* @__PURE__ */ e(
      oe,
      {
        label: "Max edge",
        help: "Longest-edge cap. The derived genWidth/genHeight scale to fit within it while preserving aspect ratio — wire them into image:generate.",
        children: /* @__PURE__ */ e(
          De,
          {
            size: "sm",
            min: 1,
            step: 1,
            unit: "px",
            value: t.maxEdge ?? bd,
            onChange: (i) => n({ maxEdge: i }),
            "data-testid": "dimensions-max-edge"
          }
        )
      }
    )
  ] });
}
const vd = 1024;
function Nd({ data: t, onChange: n, nodeId: r }) {
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(
      oe,
      {
        label: "Prompt",
        help: "Optional text guidance forwarded to the upscaler.",
        children: /* @__PURE__ */ e(
          lt,
          {
            rows: 3,
            spellCheck: !1,
            value: t.prompt ?? "",
            onChange: (i) => n({ prompt: i.target.value.trim() ? i.target.value : void 0 }),
            placeholder: "optional guidance forwarded to the upscaler",
            "aria-label": "Prompt"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      oe,
      {
        label: "Max edge",
        help: "Longest-edge cap applied before the super-resolution pass.",
        children: /* @__PURE__ */ e(
          De,
          {
            size: "sm",
            min: 1,
            step: 1,
            unit: "px",
            value: t.maxEdge ?? vd,
            onChange: (i) => n({ maxEdge: i }),
            "data-testid": "upscale-max-edge"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      or,
      {
        value: t.sourceImagePath,
        onChange: (i) => n({ sourceImagePath: i }),
        nodeId: r
      }
    )
  ] });
}
const wd = [
  "claude-opus-4-7",
  "claude-sonnet-4-6",
  "claude-haiku-4-5-20251001"
];
function kd(t) {
  if (!t) return !1;
  const n = t.properties;
  if (!n || typeof n != "object" || Array.isArray(n)) return !1;
  const r = n.regions;
  return typeof r == "object" && r !== null;
}
function Cd(t) {
  const n = t.trim();
  if (n.length === 0) return { ok: !0, value: void 0 };
  try {
    const r = JSON.parse(n);
    return r === null || typeof r != "object" || Array.isArray(r) ? { ok: !1, error: "Schema must be a JSON object" } : { ok: !0, value: r };
  } catch (r) {
    return { ok: !1, error: r.message };
  }
}
const ft = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Kn = "mt-1 w-full text-[12px] rounded border border-danger bg-white px-2 py-1 outline-none", Id = `${ft} font-mono`, Sd = `${Kn} font-mono`, it = "text-[12px] font-semibold text-text-secondary", Ze = "text-[11px] text-text-tertiary mt-0.5", Yt = "text-[11px] text-danger-fg mt-0.5";
function $d({ data: t, onChange: n, nodeId: r }) {
  const i = _e(r ?? null), { paths: a, unresolved: s } = et(r ?? null), [d, c] = S(!1), [l, p] = S(
    t.outputSchema ? JSON.stringify(t.outputSchema, null, 2) : ""
  ), [u, m] = S(null), h = !t.userPrompt?.trim(), g = !t.imageRefPath?.trim(), x = !!t.imageRefPath && !t.imageRefPath.startsWith("$."), f = kd(t.outputSchema), v = E(
    (b) => {
      n({ seedRegions: b });
    },
    [n]
  ), N = (b) => {
    p(b);
    const w = Cd(b);
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
          className: ft,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (b) => n({ model: b.target.value }),
          children: wd.map((b) => /* @__PURE__ */ e("option", { value: b, children: b }, b))
        }
      ),
      /* @__PURE__ */ e("div", { className: Ze, children: "Anthropic Messages API. Requires ANTHROPIC_API_KEY on platform-api." })
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
          className: g || x ? Sd : Id,
          value: t.imageRefPath ?? "",
          onChange: (b) => n({ imageRefPath: b.target.value }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      g ? /* @__PURE__ */ e("div", { id: "vision-image-ref-path-error", role: "alert", className: Yt, children: "Image reference path is required." }) : x ? /* @__PURE__ */ o("div", { id: "vision-image-ref-path-error", role: "alert", className: Yt, children: [
        "Path must start with ",
        /* @__PURE__ */ e("code", { children: "$." })
      ] }) : /* @__PURE__ */ e("div", { className: Ze, children: "JSONPath into context. The value must be a string imageId or object with imageId." }),
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
          className: `${h ? Kn : ft} min-h-20 resize-y`,
          value: t.userPrompt,
          onChange: (b) => n({ userPrompt: b.target.value })
        }
      ),
      h ? /* @__PURE__ */ e("div", { id: "vision-user-prompt-error", role: "alert", className: Yt, children: "User prompt is required." }) : /* @__PURE__ */ o("div", { className: Ze, children: [
        "Supports ",
        "{{ context.* }}",
        " substitution."
      ] })
    ] }),
    f && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: it, children: "Focus regions (optional)" }),
      /* @__PURE__ */ e("div", { className: Ze, children: "Drag on the image to paint focus boxes. The next vision pass will use these as analysis hints." }),
      /* @__PURE__ */ e(
        Fo,
        {
          imageUrl: "",
          imageWidth: 800,
          imageHeight: 600,
          boxes: t.seedRegions ?? [],
          onChange: v,
          className: "mt-1"
        }
      ),
      (t.seedRegions?.length ?? 0) > 0 && /* @__PURE__ */ o("div", { className: Ze, "data-testid": "bbox-region-count", children: [
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
          className: `${u ? Kn : ft} font-mono text-[11px] min-h-28 resize-y`,
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
      u ? /* @__PURE__ */ o("div", { id: "vision-output-schema-error", role: "alert", className: Yt, children: [
        "Invalid JSON: ",
        u
      ] }) : t.outputSchema ? /* @__PURE__ */ e("div", { className: Ze, children: "Extract mode — model must return JSON matching this schema." }) : /* @__PURE__ */ e("div", { className: Ze, children: "Leave blank for caption mode (freeform analysis text)." })
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
              className: ft,
              value: t.maxOutputTokens ?? "",
              onChange: (b) => {
                const w = b.target.value;
                n({ maxOutputTokens: w === "" ? void 0 : Math.max(1, parseInt(w, 10) || 0) });
              }
            }
          ),
          /* @__PURE__ */ e("div", { className: Ze, children: "Caps the response length. Default 2048." })
        ] }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("label", { htmlFor: "vision-system-prompt", className: it, children: "System prompt override (optional)" }),
          /* @__PURE__ */ e(
            "textarea",
            {
              id: "vision-system-prompt",
              className: `${ft} min-h-14 resize-y`,
              value: t.systemPrompt ?? "",
              onChange: (b) => n({ systemPrompt: b.target.value || void 0 }),
              placeholder: "Leave blank to use the canned vision system prompt."
            }
          ),
          /* @__PURE__ */ e("div", { className: Ze, children: "Schema instructions are auto-appended when output schema is set." })
        ] })
      ] })
    ] })
  ] });
}
const Td = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], Bt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Rd = `${Bt} font-mono`, Dt = "text-[12px] font-semibold text-text-secondary", Fr = "text-[11px] text-text-tertiary mt-0.5";
function Pd({ data: t, onChange: n, nodeId: r }) {
  const i = _e(r ?? null), { paths: a, unresolved: s } = et(r ?? null), [d, c] = S(""), l = t.labels ?? [], p = () => {
    const m = d.trim();
    !m || l.includes(m) || (n({ labels: [...l, m] }), c(""));
  }, u = (m) => {
    n({ labels: l.filter((h, g) => g !== m) });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-image-ref-path", className: Dt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-classify-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Rd,
          value: t.imageRefPath ?? "",
          onChange: (m) => n({ imageRefPath: m.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Fr, children: "JSONPath to the imageId to classify. Required." }),
      /* @__PURE__ */ e(Re, { samples: i.map((m) => m.path), onSelect: (m) => n({ imageRefPath: m }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: Dt, children: "Labels (at least 2 required)" }),
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
            className: `${Bt} flex-1 mt-0`,
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
      /* @__PURE__ */ e("div", { className: Fr, children: "Press Enter or click Add. The model returns the single best-matching label." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-model", className: Dt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-classify-model",
          className: Bt,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (m) => n({ model: m.target.value }),
          children: Td.map((m) => /* @__PURE__ */ e("option", { value: m.value, children: m.label }, m.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-classify-system-prompt", className: Dt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-classify-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Bt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (m) => n({ systemPrompt: m.target.value || void 0 }),
          placeholder: "Leave blank to use the default classification system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-classify-max-output-tokens", className: Dt, children: [
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
          className: Bt,
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
const Ad = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more detail)" }
], Ut = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Md = `${Ut} font-mono`, Et = "text-[12px] font-semibold text-text-secondary", zr = "text-[11px] text-text-tertiary mt-0.5";
function Dd({ data: t, onChange: n, nodeId: r }) {
  const i = _e(r ?? null), { paths: a, unresolved: s } = et(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-image-ref-path", className: Et, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-describe-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Md,
          value: t.imageRefPath ?? "",
          onChange: (d) => n({ imageRefPath: d.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: zr, children: "JSONPath to the imageId to describe. Required." }),
      /* @__PURE__ */ e(Re, { samples: i.map((d) => d.path), onSelect: (d) => n({ imageRefPath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-user-prompt", className: Et, children: "User prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-describe-user-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Ut} resize-y`,
          value: t.userPrompt ?? "",
          onChange: (d) => n({ userPrompt: d.target.value }),
          placeholder: "Describe what you see in this image in one paragraph."
        }
      ),
      /* @__PURE__ */ e("div", { className: zr, children: "Required. What to ask the model about the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-model", className: Et, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-describe-model",
          className: Ut,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (d) => n({ model: d.target.value }),
          children: Ad.map((d) => /* @__PURE__ */ e("option", { value: d.value, children: d.label }, d.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-describe-system-prompt", className: Et, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-describe-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Ut} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (d) => n({ systemPrompt: d.target.value || void 0 }),
          placeholder: "Leave blank to use the default describe system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-describe-max-output-tokens", className: Et, children: [
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
          className: Ut,
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
const Ed = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], gt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Od = `${gt} font-mono`, ht = "text-[12px] font-semibold text-text-secondary", qr = "text-[11px] text-text-tertiary mt-0.5";
function _d({ data: t, onChange: n, nodeId: r }) {
  const i = _e(r ?? null), { paths: a, unresolved: s } = et(r ?? null), [d, c] = S(""), l = t.candidateTags ?? [], p = () => {
    const m = d.trim();
    !m || l.includes(m) || (n({ candidateTags: [...l, m] }), c(""));
  }, u = (m) => {
    n({ candidateTags: l.filter((h, g) => g !== m) });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-tag-image-ref-path", className: ht, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-tag-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Od,
          value: t.imageRefPath ?? "",
          onChange: (m) => n({ imageRefPath: m.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: qr, children: "JSONPath to the imageId to tag. Required." }),
      /* @__PURE__ */ e(Re, { samples: i.map((m) => m.path), onSelect: (m) => n({ imageRefPath: m }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: ht, children: [
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
            className: `${gt} flex-1 mt-0`,
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
      /* @__PURE__ */ e("div", { className: qr, children: "Restricts tagging to this vocabulary. Leave empty for open-ended tags." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-max-tags", className: ht, children: [
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
          className: gt,
          value: t.maxTags ?? 10,
          onChange: (m) => {
            const h = parseInt(m.target.value, 10);
            n({ maxTags: Number.isFinite(h) && h >= 1 ? h : 10 });
          }
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-tag-model", className: ht, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-tag-model",
          className: gt,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (m) => n({ model: m.target.value }),
          children: Ed.map((m) => /* @__PURE__ */ e("option", { value: m.value, children: m.label }, m.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-system-prompt", className: ht, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-tag-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${gt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (m) => n({ systemPrompt: m.target.value || void 0 }),
          placeholder: "Leave blank to use the default tagging system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-max-output-tokens", className: ht, children: [
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
          className: gt,
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
const Ld = [
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (default — best OCR accuracy)" },
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (faster, lower accuracy)" }
], en = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Bd = `${en} font-mono`, Xt = "text-[12px] font-semibold text-text-secondary", Tn = "text-[11px] text-text-tertiary mt-0.5";
function Ud({ data: t, onChange: n, nodeId: r }) {
  const i = _e(r ?? null), { paths: a, unresolved: s } = et(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-image-ref-path", className: Xt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-extract-text-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Bd,
          value: t.imageRefPath ?? "",
          onChange: (d) => n({ imageRefPath: d.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Tn, children: "JSONPath to the imageId to extract text from. Required." }),
      /* @__PURE__ */ e(Re, { samples: i.map((d) => d.path), onSelect: (d) => n({ imageRefPath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-model", className: Xt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-extract-text-model",
          className: en,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (d) => n({ model: d.target.value }),
          children: Ld.map((d) => /* @__PURE__ */ e("option", { value: d.value, children: d.label }, d.value))
        }
      ),
      /* @__PURE__ */ e("div", { className: Tn, children: "Defaults to Sonnet for best OCR accuracy." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-extract-text-system-prompt", className: Xt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-extract-text-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${en} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (d) => n({ systemPrompt: d.target.value || void 0 }),
          placeholder: "Leave blank to use the default OCR system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-extract-text-max-output-tokens", className: Xt, children: [
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
          className: en,
          value: t.maxOutputTokens ?? 1024,
          onChange: (d) => {
            const c = parseInt(d.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(c) && c > 0 ? c : 1024 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Tn, children: "Increase for documents with large amounts of text." })
    ] })
  ] });
}
const jd = [
  { value: "amazon.titan-image-generator-v2:0", label: "Titan v2 (default)" },
  { value: "amazon.titan-image-generator-v1", label: "Titan v1" }
], Wr = 64, Vr = 2048, Fd = 8;
function zd({ data: t, onChange: n }) {
  const r = ua("image:generate", jd), i = Xn("image:generate"), a = !t.prompt?.trim(), s = t.model ?? r[0]?.value ?? "";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(
      oe,
      {
        label: i.label("prompt", "Prompt"),
        required: !0,
        error: a ? "Prompt is required." : void 0,
        help: a ? void 0 : i.help("prompt", "Text description of the image to generate."),
        children: /* @__PURE__ */ e(
          lt,
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
      oe,
      {
        label: i.label("model", "Model"),
        help: r.length === 0 ? "This host declares no image models." : i.help("model"),
        children: /* @__PURE__ */ e(
          Qe,
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
      /* @__PURE__ */ e("div", { className: "flex-1", children: /* @__PURE__ */ e(oe, { label: i.label("width", "Width"), children: /* @__PURE__ */ e(
        De,
        {
          size: "sm",
          min: Wr,
          max: Vr,
          step: 64,
          unit: "px",
          value: t.width ?? 512,
          onChange: (d) => n({ width: d }),
          "data-testid": "generate-width"
        }
      ) }) }),
      /* @__PURE__ */ e("div", { className: "flex-1", children: /* @__PURE__ */ e(oe, { label: i.label("height", "Height"), children: /* @__PURE__ */ e(
        De,
        {
          size: "sm",
          min: Wr,
          max: Vr,
          step: 64,
          unit: "px",
          value: t.height ?? 512,
          onChange: (d) => n({ height: d }),
          "data-testid": "generate-height"
        }
      ) }) })
    ] }),
    /* @__PURE__ */ e(
      oe,
      {
        label: i.label("seed", "Seed"),
        help: "Optional — set for a reproducible result.",
        children: /* @__PURE__ */ e(
          De,
          {
            size: "sm",
            min: 0,
            step: 1,
            value: t.seed,
            onChange: (d) => n({ seed: d }),
            onClear: () => n({ seed: void 0 }),
            placeholder: "random",
            "data-testid": "generate-seed"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      oe,
      {
        label: i.label("numImages", "Number of images"),
        help: "Above 1, the step fans out with one arm per image, each carrying one imageId.",
        children: /* @__PURE__ */ e(
          De,
          {
            size: "sm",
            min: 1,
            max: Fd,
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
const qd = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], tn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Wd = `${tn} font-mono`, Qt = "text-[12px] font-semibold text-text-secondary", Kr = "text-[11px] text-text-tertiary mt-0.5";
function Vd({ data: t, onChange: n, nodeId: r }) {
  const i = _e(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-source-image-path", className: Qt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "variation-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Wd,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Re, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "variation-model", className: Qt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "variation-model",
          className: tn,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (a) => n({ model: a.target.value }),
          children: qd.map((a) => /* @__PURE__ */ e("option", { value: a.value, children: a.label }, a.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-num-variations", className: Qt, children: [
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
          className: tn,
          value: t.numVariations ?? 1,
          onChange: (a) => {
            const s = parseInt(a.target.value, 10);
            n({ numVariations: Number.isFinite(s) && s >= 1 ? Math.min(8, s) : 1 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Kr, children: "Always fans out — each variation becomes a separate arm downstream." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-similarity", className: Qt, children: [
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
          className: tn,
          value: t.similarity ?? 0.7,
          onChange: (a) => {
            const s = parseFloat(a.target.value);
            n({ similarity: Number.isFinite(s) ? Math.min(1, Math.max(0, s)) : 0.7 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Kr, children: "0 = very different, 1 = nearly identical. 0.7 is a good starting point." })
    ] })
  ] });
}
const Kd = [
  "$.steps.mask.output.imageId",
  "$.trigger.maskRef"
], Hd = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], Hn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Hr = `${Hn} font-mono`, Zt = "text-[12px] font-semibold text-text-secondary", Jr = "text-[11px] text-text-tertiary mt-0.5";
function Jd({ data: t, onChange: n, nodeId: r }) {
  const i = _e(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-source-image-path", className: Zt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "edit-prompt-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Hr,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Re, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-mask-image-path", className: Zt, children: [
        "Mask image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "edit-prompt-mask-image-path",
          type: "text",
          spellCheck: !1,
          className: Hr,
          value: t.maskImagePath ?? "",
          onChange: (a) => n({ maskImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.steps.mask.output.imageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: Jr, children: "JSONPath to a mask image. White pixels = edit region, black = preserve. Omit for outpainting." }),
      /* @__PURE__ */ e(Re, { samples: Kd, onSelect: (a) => n({ maskImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-prompt", className: Zt, children: "Edit prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "edit-prompt-prompt",
          rows: 4,
          spellCheck: !1,
          className: `${Hn} resize-y min-h-20`,
          value: t.prompt ?? "",
          onChange: (a) => n({ prompt: a.target.value }),
          placeholder: "Replace the background with a sunny beach"
        }
      ),
      /* @__PURE__ */ e("div", { className: Jr, children: "Describes what to generate in the masked region. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-model", className: Zt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "edit-prompt-model",
          className: Hn,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (a) => n({ model: a.target.value }),
          children: Hd.map((a) => /* @__PURE__ */ e("option", { value: a.value, children: a.label }, a.value))
        }
      )
    ] })
  ] });
}
const Gd = {
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
function Yd({ data: t, onChange: n }) {
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
        $e,
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
        $e,
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
const Xd = [
  "{{scatter.item.label}}",
  "{{scatter.index}}",
  "{{scatter.parentImageId}}"
];
function Qd({ data: t, onChange: n, nodeId: r }) {
  const i = _e(r ?? null);
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
        $e,
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
        Re,
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
        $e,
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
          Re,
          {
            samples: Xd,
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
const Gr = [
  { value: "read", label: "Read", help: "Look records up and write them into context." },
  { value: "write", label: "Write", help: "Persist a value from context into memory." }
], Yr = [
  { value: "session", label: "Session", help: "Scoped to this run; cleared when the session ends." },
  { value: "long-term", label: "Long-term", help: "Persists across runs for the namespace." }
];
function Zd({ data: t, onChange: n, nodeId: r }) {
  const { paths: i, unresolved: a } = et(r ?? null), s = t.mode === "write", d = !t.namespace?.trim(), c = !t.keyExpression?.trim(), l = s && !t.valueField?.trim(), p = Gr.find((m) => m.value === t.mode)?.help, u = Yr.find((m) => m.value === t.scope)?.help;
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(oe, { label: "Mode", required: !0, help: p, children: /* @__PURE__ */ e(
      Qe,
      {
        size: "sm",
        value: t.mode,
        onChange: (m) => n({ mode: m.target.value }),
        "aria-label": "Memory mode",
        options: Gr.map((m) => ({ value: m.value, label: m.label }))
      }
    ) }),
    /* @__PURE__ */ e(oe, { label: "Scope", required: !0, help: u, children: /* @__PURE__ */ e(
      Qe,
      {
        size: "sm",
        value: t.scope,
        onChange: (m) => n({ scope: m.target.value }),
        "aria-label": "Memory scope",
        options: Yr.map((m) => ({ value: m.value, label: m.label }))
      }
    ) }),
    /* @__PURE__ */ e(
      oe,
      {
        label: "Namespace",
        required: !0,
        error: d ? "Namespace is required." : void 0,
        help: d ? void 0 : "Groups related records. Reads only see their own namespace.",
        children: /* @__PURE__ */ e(
          $e,
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
      oe,
      {
        label: "Key expression",
        required: !0,
        error: c ? "Key expression is required." : void 0,
        help: c ? void 0 : "Identifies the record. Supports {{ context.* }} substitution.",
        children: /* @__PURE__ */ e(
          $e,
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
    /* @__PURE__ */ e(oe, { label: "Available context", children: /* @__PURE__ */ e(
      mn,
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
      oe,
      {
        label: "Value field",
        required: !0,
        error: l ? "Value field is required for a write." : void 0,
        help: l ? void 0 : "Context path whose value is persisted.",
        children: /* @__PURE__ */ e(
          $e,
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
      oe,
      {
        label: "Output key",
        help: "Where retrieved records land in context. Defaults to this step's output.",
        children: /* @__PURE__ */ e(
          $e,
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
const Rn = 100;
function ep({
  data: t,
  onChange: n,
  nodeId: r
}) {
  const { paths: i, unresolved: a } = et(r ?? null), s = Xn("knowledge-base"), d = !t.knowledgeBaseId?.trim(), c = !t.queryTemplate?.trim(), l = t.topK ?? 0, p = !Number.isFinite(l) || l < 1 || l > Rn, u = t.scoreThreshold, m = u !== void 0 && (u < 0 || u > 1);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(bt, { title: "Knowledge base", children: [
      /* @__PURE__ */ e(
        oe,
        {
          label: s.label("knowledgeBaseId", "Knowledge base ID"),
          required: !0,
          error: d ? "Knowledge base ID is required." : void 0,
          help: d ? void 0 : s.help("knowledgeBaseId", "The knowledge base to retrieve from."),
          children: /* @__PURE__ */ e(
            $e,
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
        oe,
        {
          label: s.label("queryTemplate", "Query template"),
          required: !0,
          error: c ? "Query template is required." : void 0,
          help: c ? void 0 : s.help(
            "queryTemplate",
            "Text to embed and search. Supports {{ context.* }} substitution."
          ),
          children: /* @__PURE__ */ e(
            lt,
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
      /* @__PURE__ */ e(oe, { label: "Available context", children: /* @__PURE__ */ e(
        mn,
        {
          paths: i,
          unresolved: a(t.queryTemplate ?? ""),
          onInsert: (h) => n({ queryTemplate: `${t.queryTemplate ?? ""}${h}` })
        }
      ) })
    ] }),
    /* @__PURE__ */ o(bt, { title: "Retrieval", children: [
      /* @__PURE__ */ e(
        oe,
        {
          label: s.label("topK", "Top K"),
          required: !0,
          error: p ? `Must be between 1 and ${Rn}.` : void 0,
          help: p ? void 0 : s.help("topK", "How many passages to retrieve."),
          children: /* @__PURE__ */ e(
            De,
            {
              size: "sm",
              min: 1,
              max: Rn,
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
        oe,
        {
          label: s.label("scoreThreshold", "Score threshold"),
          error: m ? "Must be between 0 and 1." : void 0,
          help: m ? void 0 : "Drop passages scoring below this. Leave empty for no filtering.",
          children: /* @__PURE__ */ e(
            De,
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
        oe,
        {
          label: "Output key",
          help: "Where retrieved passages land in context. Defaults to this step's output.",
          children: /* @__PURE__ */ e(
            $e,
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
        Ht,
        {
          value: t.retryPolicy,
          onChange: (h) => n({ retryPolicy: h })
        }
      )
    ] })
  ] });
}
const tp = `MATCH (u:User {id: $userId})-[:AUTHORED]->(d:Doc)
RETURN d.title LIMIT 10`, Pn = 100, An = 3e5;
function np({
  data: t,
  onChange: n,
  nodeId: r
}) {
  const { paths: i, unresolved: a } = et(r ?? null), s = Xn("graph-query"), d = !t.graphId?.trim(), c = !t.query?.trim(), l = t.timeoutMs, p = l !== void 0 && (!Number.isFinite(l) || l < Pn || l > An), u = q(
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
    /* @__PURE__ */ o(bt, { title: "Graph", children: [
      /* @__PURE__ */ e(
        oe,
        {
          label: s.label("graphId", "Graph ID"),
          required: !0,
          error: d ? "Graph ID is required." : void 0,
          help: d ? void 0 : s.help("graphId", "The graph to query."),
          children: /* @__PURE__ */ e(
            $e,
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
        oe,
        {
          label: s.label("query", "Graph query"),
          required: !0,
          error: c ? "Query is required." : void 0,
          help: c ? void 0 : "Bind values with $parameters below rather than interpolating them.",
          children: /* @__PURE__ */ e(
            lt,
            {
              rows: 6,
              invalid: c,
              spellCheck: !1,
              value: t.query ?? "",
              onChange: (b) => n({ query: b.target.value }),
              placeholder: s.placeholder("query", tp),
              "aria-label": "Graph query"
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ o(bt, { title: "Parameters", children: [
      /* @__PURE__ */ e(
        oe,
        {
          label: "Bind parameters",
          help: "Each row binds one $name in the query. Values support {{ context.* }}.",
          children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", "data-testid": "graph-query-params", children: [
            u.length === 0 ? /* @__PURE__ */ e("p", { className: "text-[12px] text-[var(--color-text-secondary)]", children: "No parameters. The query runs exactly as written." }) : null,
            u.map(([b, w], y) => /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ e(
                $e,
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
                $e,
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
            /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(Ee, { size: "sm", variant: "secondary", onClick: N, children: "+ Add parameter" }) })
          ] })
        }
      ),
      /* @__PURE__ */ e(oe, { label: "Available context", children: /* @__PURE__ */ e(
        mn,
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
    /* @__PURE__ */ o(bt, { title: "Execution", children: [
      /* @__PURE__ */ e(
        oe,
        {
          label: "Timeout",
          error: p ? `Must be between ${Pn} and ${An} ms.` : void 0,
          help: p ? void 0 : "Leave empty to use the executor default.",
          children: /* @__PURE__ */ e(
            De,
            {
              size: "sm",
              min: Pn,
              max: An,
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
        oe,
        {
          label: "Output key",
          help: "Where rows land in context. Defaults to this step's output.",
          children: /* @__PURE__ */ e(
            $e,
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
        Ht,
        {
          value: t.retryPolicy,
          onChange: (b) => n({ retryPolicy: b })
        }
      )
    ] })
  ] });
}
function rp({ result: t, className: n }) {
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
const op = {
  people: { stroke: "#4f46e5", fill: "rgba(79,70,229,0.10)", text: "bg-primary text-white" },
  object: { stroke: "#d97706", fill: "rgba(217,119,6,0.10)", text: "bg-warning text-white" }
};
function ap({
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
  const m = n ?? t, [h, g] = S(null), x = ce(null), f = E(() => {
    const b = x.current;
    b && (!r || !i) && g({ w: b.naturalWidth, h: b.naturalHeight });
  }, [r, i]), v = q(() => r && i && r > 0 && i > 0 ? { w: r, h: i } : h && h.w > 0 && h.h > 0 ? h : null, [r, i, h]), N = (b, w, y, k, C) => {
    if (!v) return null;
    const $ = Math.max(0, Math.min(b.x1, v.w)), D = Math.max(0, Math.min(b.y1, v.h)), A = Math.max(0, Math.min(b.x2, v.w)), M = Math.max(0, Math.min(b.y2, v.h));
    if (!Number.isFinite($) || !Number.isFinite(D) || !Number.isFinite(A) || !Number.isFinite(M) || A <= $ || M <= D) return null;
    const ne = $ / v.w * 100, R = D / v.h * 100, H = (A - $) / v.w * 100, X = (M - D) / v.h * 100, J = op[y];
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
function ip(t) {
  return {
    imageUrl: t.imageUrl,
    imageDataUrl: t.imageDataUrl,
    imageWidth: t.imageWidth,
    imageHeight: t.imageHeight,
    people: t.people,
    objects: t.objects
  };
}
function sp({ people: t, highlightedIndex: n, onSelect: r, className: i }) {
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
function lp({ objects: t, onSelect: n, className: r }) {
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
function cp({ tags: t, onTagClick: n, className: r }) {
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
function nn(t) {
  return t ? t === "correct" || t === "neutral" || t === "normal" ? "success" : "warning" : "neutral";
}
function Mn(t) {
  const n = nn(t);
  return n === "success" ? `OK · ${t}` : n === "warning" ? `ADJUST · ${t}` : t ?? "";
}
function dp({
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
          /* @__PURE__ */ e(le, { tone: nn(t.verdict), size: "sm", children: Mn(t.verdict) }),
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
          /* @__PURE__ */ e(le, { tone: nn(n.verdict), size: "sm", children: Mn(n.verdict) }),
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
        /* @__PURE__ */ e("span", { className: "ml-1.5", children: /* @__PURE__ */ e(le, { tone: nn(r), size: "sm", children: Mn(r) }) })
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
function pp({
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
  const [m, h] = S(), [g, x] = S(!1), f = (N) => h(m === N.index ? void 0 : N.index), v = ip(t);
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-4 text-text-primary", u), children: [
    /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-12", children: [
      n ? /* @__PURE__ */ o("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ e(
          ap,
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
        r ? /* @__PURE__ */ e(rp, { result: t }) : null,
        i && t.people && t.people.length > 0 ? /* @__PURE__ */ e(
          sp,
          {
            people: t.people,
            highlightedIndex: m,
            onSelect: f
          }
        ) : null
      ] })
    ] }),
    a && t.objects && t.objects.length > 0 ? /* @__PURE__ */ e(lp, { objects: t.objects }) : null,
    s && t.tags && t.tags.length > 0 ? /* @__PURE__ */ e(cp, { tags: t.tags, onTagClick: l }) : null,
    d ? /* @__PURE__ */ e(
      dp,
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
const up = [
  { value: "claude-haiku-4-5-20251001", label: "Haiku 4.5" },
  { value: "claude-sonnet-4-6", label: "Sonnet 4.6" },
  { value: "claude-opus-4-7", label: "Opus 4.7" }
], Xr = "claude-sonnet-4-6", Qr = [
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
function mp(t) {
  const n = [`${t.inputTokens} in`, `${t.outputTokens} out`];
  return t.cacheReadTokens && n.push(`${t.cacheReadTokens} cached`), n.join(" / ");
}
function hp({
  systemPrompt: t,
  userPrompt: n,
  outputSchema: r,
  model: i,
  onSave: a,
  apiBase: s = ""
}) {
  const d = Co(), [c, l] = S(t), [p, u] = S(n), [m, h] = S(i ?? Xr), [g, x] = S(
    r ? JSON.stringify(r, null, 2) : ""
  ), [f, v] = S("0"), [N, b] = S(null), [w, y] = S(!1), [k, C] = S(null), [$, D] = S(null), A = E(() => {
    const Q = g.trim();
    if (Q)
      try {
        const O = JSON.parse(Q);
        if (O && typeof O == "object" && !Array.isArray(O))
          return O;
      } catch {
      }
  }, [g]), M = E((Q) => {
    v(Q);
    const O = Number(Q), P = Qr[O];
    P && (x(P.value ? JSON.stringify(P.value, null, 2) : ""), P.systemPrompt !== void 0 && l(P.systemPrompt));
  }, []), ne = N?.imageId ?? null, R = ne ? d.getImageUrl(ne) : null, H = E(async () => {
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
      const O = await fetch(`${s}/api/pipeline/preview/vision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageId: ne,
          systemPrompt: c.trim() || void 0,
          userPrompt: p.trim(),
          outputSchema: Q,
          model: m || Xr
        })
      }), P = await O.json();
      if (!O.ok) {
        C(P.error ?? `Request failed with status ${O.status}`);
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
    } catch (O) {
      C(O instanceof Error ? O.message : "Network error");
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
        zo,
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
          lt,
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
          lt,
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
            Qe,
            {
              value: f,
              onChange: (Q) => M(Q.target.value),
              options: Qr.map((Q, O) => ({ value: String(O), label: Q.label })),
              size: "sm",
              "aria-label": "Schema preset",
              "data-testid": "bench-schema-preset"
            }
          )
        ] }),
        /* @__PURE__ */ e(
          lt,
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
        Qe,
        {
          value: m,
          onChange: (Q) => h(Q.target.value),
          options: up,
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
          mp($.usage),
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
        pp,
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
const fp = {
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
}, Dn = /* @__PURE__ */ new Set([
  "image:vision-analyze",
  "image:vision-classify",
  "image:vision-describe",
  "image:vision-tag",
  "image:vision-extract-text"
]), Ot = ({ data: t }) => /* @__PURE__ */ e("div", { className: "p-4", "data-testid": "config-panel-no-settings", children: /* @__PURE__ */ e(
  qe,
  {
    icon: "⚙️",
    title: "No settings for this node type yet",
    description: /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ e("code", { className: "font-mono text-[12px]", children: String(t.type) }),
      " has no configurable options in this version. The node can sit on the canvas and connect to others, and it will run with its defaults wherever the executor supports it."
    ] })
  }
) }), Eh = [
  "agent",
  "mcp-tool",
  "guardrail",
  "policy",
  "ag-ui-output"
], gp = {
  trigger: nc,
  llm: dc,
  transform: mc,
  condition: fc,
  action: bc,
  fork: yc,
  join: wc,
  approval: Cc,
  agent: Ot,
  "mcp-tool": Ot,
  "knowledge-base": ep,
  "graph-query": np,
  memory: Zd,
  guardrail: Ot,
  policy: Ot,
  "ag-ui-output": Ot,
  "image-source": Yd,
  "image:save": Qd,
  scatter: Oc,
  "image:resize": Lc,
  "image:transform": zc,
  "image:format-convert": Vc,
  "image:sharpen": Kc,
  "image:watermark": Jc,
  "image:crop": rd,
  "image:adjust-bw": ad,
  "image:adjust-layer": xd,
  "image:dimensions": yd,
  "image:upscale": Nd,
  "image:vision-analyze": $d,
  "image:vision-classify": Pd,
  "image:vision-describe": Dd,
  "image:vision-tag": _d,
  "image:vision-extract-text": Ud,
  "image:generate": zd,
  "image:variation": Vd,
  "image:edit-prompt": Jd
};
function xp(t, n) {
  const r = gp[t.type];
  return /* @__PURE__ */ e(r, { data: t.data, onChange: n, nodeId: t.id }, t.id);
}
function bp({ selectedIds: t }) {
  const {
    definition: n,
    selectedNodeId: r,
    setSelectedNodeId: i,
    updateNodeData: a,
    removeNode: s,
    duplicateNodes: d
  } = Ve(), [c, l] = S("config"), p = ce(null), u = ce(null);
  Zn();
  const m = q(() => t && t.length > 1 ? t : r ? [r] : [], [t, r]), h = m.length > 1, g = m.length > 0, x = q(() => h || m.length === 0 || !n ? null : n.nodes.find((y) => y.id === m[0]) ?? null, [n, m, h]), f = E(() => {
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
  const v = x ? fp[x.type] : null, N = () => {
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
            const C = x && Dn.has(x.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"], $ = C.indexOf(c);
            let D = null;
            y.key === "ArrowRight" ? D = C[($ + 1) % C.length] : y.key === "ArrowLeft" ? D = C[($ - 1 + C.length) % C.length] : y.key === "Home" ? D = C[0] : y.key === "End" && (D = C[C.length - 1]), D && (y.preventDefault(), l(D), u.current?.querySelector(
              `[data-tab="${D}"]`
            )?.focus());
          },
          children: (x && Dn.has(x.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"]).map((y) => {
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
        c === "config" && xp(x, w),
        c === "runs" && /* @__PURE__ */ e("div", { className: "p-6 text-xs text-[#64748b]", children: "No runs yet." }),
        c === "docs" && /* @__PURE__ */ e("div", { className: "pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug", children: Gd[x.type] ?? /* @__PURE__ */ e("p", { className: "text-text-secondary", children: "No docs available for this node type." }) }),
        c === "bench" && Dn.has(x.type) && (() => {
          const y = x.data;
          return /* @__PURE__ */ e(
            hp,
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
function Te(t) {
  if (t == null) return "--";
  if (t < 1e3) return `${Math.round(t)}ms`;
  if (t < 6e4) return `${(t / 1e3).toFixed(1)}s`;
  const n = Math.floor(t / 6e4), r = Math.floor(t % 6e4 / 1e3);
  return `${n}m ${r}s`;
}
function yt(t) {
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
function yp(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function vp(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Np(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Zr(t) {
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
function En(t) {
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
function wp(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function st({ label: t, children: n }) {
  return /* @__PURE__ */ o("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ e("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: t }),
    /* @__PURE__ */ e("span", { className: "text-[13px] text-text-primary", children: n })
  ] });
}
function kp({ pipelineId: t, run: n, onBack: r }) {
  const i = We();
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
          tone: Zr(n.status),
          "aria-label": `Status: ${En(n.status)}`,
          children: En(n.status)
        }
      ) }),
      /* @__PURE__ */ e(st, { label: "Started", children: new Date(n.startedAt).toLocaleString() }),
      n.completedAt && /* @__PURE__ */ e(st, { label: "Completed", children: new Date(n.completedAt).toLocaleString() }),
      /* @__PURE__ */ e(st, { label: "Duration", children: Te(n.durationMs) }),
      /* @__PURE__ */ e(st, { label: "Triggered by", children: wp(n) }),
      /* @__PURE__ */ e(st, { label: "Trigger type", children: n.triggeredBy.triggerType }),
      n.estimatedCostUsd != null && n.estimatedCostUsd > 0 && /* @__PURE__ */ o(st, { label: "Est. Cost", children: [
        /* @__PURE__ */ e("span", { className: I("font-semibold", Np(n.estimatedCostUsd)), children: vp(n.estimatedCostUsd) }),
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
          const d = Zr(s.status), c = En(s.status), l = s.output, p = l?.response;
          return /* @__PURE__ */ o("div", { className: "mb-2", children: [
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2 py-1 text-xs", children: [
              /* @__PURE__ */ e(le, { tone: d, "aria-label": `Status: ${c}`, children: c }),
              /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: a.slice(0, 10) }),
              s.durationMs != null && /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: Te(s.durationMs) })
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
function eo(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Cp(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Ip(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Sp(t) {
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
function $p(t) {
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
function Tp(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function Rp({ pipelineId: t, onClose: n }) {
  const r = We(), [i, a] = S([]), [s, d] = S(!0), [c, l] = S(null), [p, u] = S(null), [m, h] = S(!1), [g, x] = S([]), f = ce(null), v = E(async () => {
    d(!0), l(null);
    try {
      const y = await So(t, { limit: 50 });
      a(y.runs);
    } catch (y) {
      l(y instanceof Error ? y.message : "Failed to load runs");
    } finally {
      d(!1);
    }
  }, [t]);
  re(() => {
    f.current !== t && (f.current = t, v());
  }, [t, v]), je("*", E((y) => {
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
  ), b = E((y) => {
    x((k) => k.includes(y) ? k.filter((C) => C !== y) : k.length >= 2 ? [k[1], y] : [...k, y]);
  }, []), w = E(() => {
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
            kp,
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
            const k = Sp(y.status), C = $p(y.status), $ = g.includes(y.id);
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
                    /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: Ip(y.startedAt) })
                  ] }),
                  /* @__PURE__ */ o("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ e("span", { children: Te(y.durationMs) }),
                    y.estimatedCostUsd != null && y.estimatedCostUsd > 0 && /* @__PURE__ */ e(
                      "span",
                      {
                        className: I("font-mono font-semibold", Cp(y.estimatedCostUsd)),
                        title: `Estimated cost: ${eo(y.estimatedCostUsd)}`,
                        children: eo(y.estimatedCostUsd)
                      }
                    ),
                    y.estimatedCostUsd != null && y.estimatedCostUsd > 1 && /* @__PURE__ */ e("span", { className: "rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "High Cost" }),
                    /* @__PURE__ */ e("span", { className: "ml-auto", children: Tp(y) })
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
function Pp({
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
          r === "config" && (n !== null ? /* @__PURE__ */ e(bp, {}) : /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          r === "runs" && /* @__PURE__ */ e(
            Rp,
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
function Ap(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Mp(t) {
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
function Dp(t) {
  if (!(t instanceof HTMLElement)) return !1;
  const n = t.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || t.isContentEditable);
}
function Oh() {
  const { pipelineId: t } = Nt(), n = q(() => t ? ct(t) !== null : !1, [t]);
  return !t || !n ? /* @__PURE__ */ e(wt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e($o, { pipelineId: t, children: /* @__PURE__ */ e(Ep, { pipelineId: t }) });
}
function Ep({ pipelineId: t }) {
  const n = We(), r = Ve(), i = kt(), { toast: a } = pn(), {
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
  } = r, f = Pl(t), [v, N] = S(!1), b = ce(null), w = ce(d);
  re(() => (w.current && !d && (N(!0), b.current && clearTimeout(b.current), b.current = setTimeout(() => N(!1), 450)), w.current = d, () => {
    b.current && (clearTimeout(b.current), b.current = null);
  }), [d]);
  const y = q(
    () => s ? Bo(s) : null,
    [s]
  ), k = (y?.errors.length ?? 0) > 0, C = q(
    () => Mp(s),
    [s]
  ), D = q(() => s ? s.nodes.some((ye) => ye.type === "trigger") : !1, [s]) ? ["trigger"] : [], [A, M] = S(!0), [ne, R] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), H = E(() => {
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
  }, []), [X, J] = S(!1), [Q, O] = S(!1), [P, G] = S(!1), [F, _] = S(!1), [W, V] = S(!1), Y = q(() => s?.publishedSnapshot ? s.publishedSnapshot : null, [s]), me = s?.status === "published", z = !f.isRunActive && (!me || k), de = f.isRunActive ? "Cancel the active run" : me ? k ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", we = E(async () => {
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
    const ye = (se) => {
      if (Dp(se.target)) return;
      const Ae = se.metaKey || se.ctrlKey;
      if (Ae && se.key.toLowerCase() === "s") {
        se.preventDefault(), p(), a("Saved", { type: "success", durationMs: 1200 });
        return;
      }
      if (Ae && se.key === "Enter") {
        se.preventDefault(), we();
        return;
      }
      if (Ae && se.key === ".") {
        se.preventDefault(), f.isRunActive && f.currentRunId && i.cancelRun(f.currentRunId);
        return;
      }
      if (Ae && se.shiftKey && se.key.toLowerCase() === "z") {
        se.preventDefault(), g();
        return;
      }
      if (Ae && se.key.toLowerCase() === "z") {
        se.preventDefault(), h();
        return;
      }
      if (se.key === "Escape") {
        l(null);
        return;
      }
    };
    return window.addEventListener("keydown", ye), () => window.removeEventListener("keydown", ye);
  }, [p, a, we, f, i, h, g, l]);
  const Fe = () => {
    if (!s) return;
    const ye = Qn(s.id);
    ye && n(`/pipelines/${ye.id}`);
  }, tt = () => {
    if (!s) return;
    const ye = Bn(s.id);
    ye && Ft(`${Ap(s.name)}.pipeline.json`, ye);
  }, Ke = async () => {
    if (!s) return;
    const ye = wl(s);
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
  }, Je = () => {
    J(!1), !k && (u(), a("Pipeline published", { type: "success" }));
  }, He = () => {
    s && (ma(s.id), O(!1), n("/pipelines"));
  }, Ge = () => {
    To(t), G(!1), a("Run history cleared", { type: "success" });
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
          Ml,
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
            onExport: tt,
            onPublishClick: () => J(!0),
            onDuplicate: Fe,
            onCopyMermaid: Ke,
            onViewVersions: Be,
            onRevert: m,
            onToggleShowTags: H,
            showTags: ne,
            onViewRunHistory: () => f.setSidebarTab("runs"),
            onClearRunHistory: () => G(!0),
            onSimPanelOpen: () => V(!0),
            onDelete: () => O(!0)
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
                _a,
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
          /* @__PURE__ */ e(Cs, { disabledTypes: D }),
          /* @__PURE__ */ e("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ e(
            Us,
            {
              errorNodeId: f.activeError?.nodeId ?? null,
              onErrorNodePosition: f.handleErrorNodePosition,
              breakpoints: f.breakpoints,
              onToggleBreakpoint: f.handleToggleBreakpoint,
              pausedAtNodeId: f.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ e(
            Pp,
            {
              pipelineId: t,
              selectedNodeId: c,
              sidebarTab: f.sidebarTab,
              onTabChange: f.setSidebarTab
            }
          )
        ] }),
        f.pausedBreakpoint && /* @__PURE__ */ e(
          ql,
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
          Fs,
          {
            error: f.activeError,
            anchor: f.errorNodeAnchor,
            onDismiss: f.handleDismissError,
            onRetry: f.handleRetryFromError
          }
        ),
        /* @__PURE__ */ e(
          Rl,
          {
            runId: f.currentRunId,
            visible: f.isRunActive && A
          }
        ),
        /* @__PURE__ */ e(
          Tl,
          {
            publishConfirmOpen: X,
            onPublishClose: () => J(!1),
            onPublishConfirm: Je,
            hasErrors: k,
            validationErrorCount: y?.errors.length ?? 0,
            definitionName: s.name,
            definitionVersion: s.version,
            deleteConfirmOpen: Q,
            onDeleteClose: () => O(!1),
            onDeleteConfirm: He,
            clearRunsConfirmOpen: P,
            onClearRunsClose: () => G(!1),
            onClearRunsConfirm: Ge,
            versionDiffOpen: F,
            onVersionDiffClose: () => _(!1),
            currentDef: s,
            publishedDef: Y,
            onJumpToNode: l,
            simPanelOpen: W,
            onSimPanelClose: () => V(!1)
          }
        ),
        /* @__PURE__ */ e(
          Xe,
          {
            open: f.triggerInputOpen,
            onClose: () => f.setTriggerInputOpen(!1),
            title: "Trigger inputs",
            maxWidth: 480,
            footer: /* @__PURE__ */ o(K, { children: [
              /* @__PURE__ */ e(Ee, { variant: "ghost", onClick: () => f.setTriggerInputOpen(!1), children: "Cancel" }),
              /* @__PURE__ */ e(
                Ee,
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
                    onChange: (se) => f.setTriggerInputValues((Ae) => ({ ...Ae, [ye]: se.target.value }))
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
function Op(t) {
  const n = t?.event;
  return !n || n === "manual" ? { icon: "▶", text: "Manual" } : n === "schedule" ? { icon: "⏱", text: t?.schedule ?? "Schedule" } : n === "webhook" ? { icon: "🔌", text: t?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${t?.event}` };
}
function _p({
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
  vt(x, () => m(!1), u);
  const f = t.status === "published", v = t.status === "archived", N = typeof t.publishedVersion == "number", b = Op(t.triggerBinding);
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
const Lp = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, Bp = ["draft", "published"];
function Up({
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
            children: ar.map((h) => {
              const g = i ? r.has(h) : Bp.includes(h);
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
                  children: Lp[h]
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
const nt = I(
  "px-2.5 py-[5px] text-xs font-semibold",
  "bg-white text-text-secondary",
  "border border-border-field rounded-md",
  "cursor-pointer font-inherit"
);
function jp({
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
        /* @__PURE__ */ e("button", { "data-testid": "bulk-clear", className: nt, onClick: n, children: "Clear" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-publish", className: nt, onClick: a, children: "Publish selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-archive", className: nt, onClick: s, children: "Archive selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export-json", className: nt, onClick: i, children: "Export selected as JSON" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export", className: nt, onClick: r, children: "Export all" }),
        /* @__PURE__ */ e(
          "button",
          {
            "data-testid": "bulk-delete-confirm-prompt",
            className: nt,
            onClick: p,
            children: "Delete selected"
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", children: [
          /* @__PURE__ */ e("button", { "data-testid": "bulk-add-tag-btn", className: nt, onClick: d, children: "Add tag..." }),
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
                nt,
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
function Fp({
  visibleRows: t,
  filteredIds: n
}) {
  const [r, i] = S(!1), [a, s] = S(/* @__PURE__ */ new Set()), d = ce(null), c = ce(null), l = E(() => {
    s(/* @__PURE__ */ new Set());
  }, []), p = E(() => {
    r ? (l(), i(!1)) : i(!0);
  }, [r, l]), u = E(
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
  ), m = E(() => {
    s(new Set(n));
  }, [n]), h = t.length > 0 && t.every((f) => a.has(f.id)), g = !h && t.some((f) => a.has(f.id)), x = E(() => {
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
const zp = 280, ke = 160, qp = 40, Wp = 200;
function ee(t) {
  return qp + t * zp;
}
function te(t) {
  return Wp + t * ke;
}
function ae(t, n, r, i = "in") {
  return {
    id: crypto.randomUUID(),
    source: t,
    sourceHandle: n,
    target: r,
    targetHandle: i
  };
}
function Vp(t) {
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
    createdBy: t
  };
}
function Kp(t) {
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
    edges: N,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Hp(t) {
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
    createdBy: t
  };
}
function Jp(t) {
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
    edges: m,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Gp(t) {
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
    edges: m,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Yp(t) {
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
    edges: m,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Xp(t) {
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
    createdBy: t
  };
}
function Qp(t) {
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
    createdBy: t
  };
}
function Zp(t) {
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
    edges: f,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function eu(t) {
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
    edges: f,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function tu(t) {
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
    createdBy: t
  };
}
function nu(t) {
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
    createdBy: t
  };
}
function ru(t) {
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
    edges: w,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
const On = [
  {
    id: "document-summary",
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    tags: ["llm", "summary", "document"],
    build: Vp
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: Kp
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: Hp,
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
    build: Jp,
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
    build: Gp,
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
    build: Yp
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: Xp
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: Qp
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: Zp
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: eu
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: tu
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: nu
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: ru
  }
], Vo = "/api";
async function ou(t) {
  const n = { createdTypes: [], errors: [] };
  if (!t?.documentTypes?.length) return n;
  for (const r of t.documentTypes)
    try {
      const i = await au(r.name);
      if (i) {
        n.createdTypes.push(i.typeId);
        continue;
      }
      const a = await iu(r);
      n.createdTypes.push(a.typeId);
    } catch (i) {
      n.errors.push(
        `Failed to scaffold "${r.name}": ${i instanceof Error ? i.message : String(i)}`
      );
    }
  return n;
}
async function au(t) {
  try {
    const n = await fetch(`${Vo}/document-types`, { credentials: "same-origin" });
    if (!n.ok) return null;
    const i = (await n.json()).items?.find(
      (a) => a.name.toLowerCase() === t.toLowerCase()
    );
    return i ? { typeId: i.typeId } : null;
  } catch {
    return null;
  }
}
async function iu(t) {
  const n = t.fields.map((a, s) => ({
    fieldId: crypto.randomUUID(),
    name: a.name,
    fieldType: a.fieldType,
    widget: su(a.fieldType),
    cardinality: 1,
    required: a.required ?? !1,
    helpText: "",
    options: a.options,
    order: s
  })), r = await fetch(`${Vo}/document-types`, {
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
function su(t) {
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
function lu(t) {
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
function cu(t) {
  const n = t.triggerBinding?.event ?? "manual";
  return n === "schedule" ? "Schedule" : n === "webhook" ? "Webhook" : n === "manual" ? "Manual" : n.startsWith("document.") ? `On ${n}` : n;
}
function du({ template: t, meta: n, onPick: r }) {
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
function pu({
  open: t,
  onClose: n,
  onCreated: r,
  onSelect: i
}) {
  const { userId: a } = Oo(), [s, d] = S(""), c = ce(null);
  re(() => {
    t && (d(""), setTimeout(() => c.current?.focus(), 30));
  }, [t]);
  const l = q(() => {
    const h = /* @__PURE__ */ new Map();
    for (const g of On) {
      const x = g.build(a || "anonymous");
      h.set(g.id, { nodeCount: x.nodes.length, trigger: cu(x) });
    }
    return h;
  }, [a, t]), p = q(() => {
    const h = s.trim().toLowerCase();
    return h ? On.filter(
      (g) => g.name.toLowerCase().includes(h) || g.description.toLowerCase().includes(h) || g.tags.some((x) => x.toLowerCase().includes(h))
    ) : On;
  }, [s]), u = (h) => {
    if (r) {
      const g = h.build(a || "anonymous"), x = lu(g);
      ha(x), n(), r(x.id), h.prerequisites && ou(h.prerequisites).then((f) => {
        f.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", f.errors);
      });
      return;
    }
    i && i(h);
  };
  return /* @__PURE__ */ o(
    Xe,
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
              du,
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
const ar = ["draft", "published", "archived"], to = ["draft", "published"];
function uu(t) {
  if (t == null) return null;
  if (t.trim() === "") return /* @__PURE__ */ new Set();
  const n = new Set(ar);
  return new Set(
    t.split(",").map((i) => i.trim()).filter((i) => n.has(i))
  );
}
function mu(t, n) {
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
function hu(t) {
  const n = t?.event;
  return !n || n === "manual" ? "manual" : n === "schedule" ? "schedule" : n === "webhook" ? "webhook" : "document";
}
function no(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function fu() {
  const t = /* @__PURE__ */ new Date(), n = t.getFullYear(), r = String(t.getMonth() + 1).padStart(2, "0"), i = String(t.getDate()).padStart(2, "0");
  return `${n}-${r}-${i}`;
}
function gu({
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
    Xe,
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
function _h() {
  const t = We(), { userId: n } = Oo(), { toast: r } = pn(), { triggerRun: i, isTriggering: a } = fa(), [s, d] = dn(), [c, l] = S([]), [p, u] = S(""), [m, h] = S("all"), [g, x] = S("updated"), f = q(
    () => uu(s.get("status")),
    [s]
  ), v = q(() => f ?? new Set(to), [f]), N = f != null, b = (T) => {
    const L = new URLSearchParams(s);
    if (T.size === 0)
      L.set("status", "");
    else {
      const pe = ar.filter((fe) => T.has(fe)).join(",");
      L.set("status", pe);
    }
    d(L, { replace: !0 });
  }, w = (T) => {
    const L = N ? new Set(v) : new Set(to);
    L.has(T) ? L.delete(T) : L.add(T), b(L);
  }, [y, k] = S(!1), [C, $] = S(!1), [D, A] = S(null), [M, ne] = S(!1), [R, H] = S(!1), [X, J] = S(!1), Q = E(async () => {
    const T = await ga(), L = [];
    for (const pe of T) {
      const fe = await dt(pe.id);
      fe && L.push(mu(fe, pe.icon));
    }
    l(L);
  }, []);
  re(() => {
    Q();
  }, [Q]);
  const O = q(() => {
    const T = p.trim().toLowerCase(), pe = [...c.filter((fe) => {
      if (T) {
        const Ne = fe.name.toLowerCase().includes(T), ze = fe.tags.some((sr) => sr.toLowerCase().includes(T));
        if (!Ne && !ze) return !1;
      }
      return !(!(N && v.size === 0) && !v.has(fe.status) || m !== "all" && hu(fe.triggerBinding) !== m);
    })];
    return g === "name" ? pe.sort((fe, Ne) => fe.name.localeCompare(Ne.name)) : g === "created" ? pe.sort((fe, Ne) => Ne.createdAt.localeCompare(fe.createdAt)) : pe.sort((fe, Ne) => Ne.updatedAt.localeCompare(fe.updatedAt)), pe;
  }, [c, p, v, N, m, g]), P = q(() => O.map((T) => T.id), [O]), {
    selectionMode: G,
    selected: F,
    allVisibleSelected: _,
    selectAllRef: W,
    handleToggleSelect: V,
    handleSelectAllFiltered: Y,
    handleHeaderToggleAll: me,
    clearSelection: z,
    setSelectionMode: de
  } = Fp({ visibleRows: O, filteredIds: P }), we = q(() => {
    const T = /* @__PURE__ */ new Set();
    for (const L of c)
      if (F.has(L.id))
        for (const pe of L.tags) T.add(pe);
    return Array.from(T).sort((L, pe) => L.localeCompare(pe));
  }, [c, F]), Fe = async (T) => {
    const L = await xa({ name: T, createdBy: n });
    k(!1), t(`/pipelines/${L.id}`);
  }, tt = () => {
    const T = ba(n);
    pt(T).then(() => Q()), t(`/pipelines/${T.id}`);
  }, Ke = (T) => {
    const L = T.build(n);
    pt(L), $(!1), t(`/pipelines/${L.id}`);
  }, Be = (T) => t(`/pipelines/${T}`), Je = async (T) => {
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
  }, He = (T) => {
    const L = Qn(T);
    L && (pt(L).then(() => Q()), r(`Duplicated as "${L.name}"`, { type: "success" }));
  }, Ge = (T) => {
    const L = Bn(T.id);
    if (!L) {
      r("Export failed", { type: "error" });
      return;
    }
    Ft(`${no(T.name)}.pipeline.json`, L);
  }, Ie = async () => {
    D && (await dr(D), A(null), Q(), r("Pipeline deleted", { type: "success" }));
  }, ye = D ? c.find((T) => T.id === D) : null, se = () => {
    const T = Array.from(F);
    T.length !== 0 && (T.forEach((L, pe) => {
      window.setTimeout(() => {
        const fe = c.find((ze) => ze.id === L), Ne = Bn(L);
        !fe || !Ne || Ft(`${no(fe.name)}-${fu()}.pipeline.json`, Ne);
      }, pe * 100);
    }), r(`Exported ${T.length} pipeline${T.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, Ae = async (T) => {
    const L = Array.from(F);
    for (const pe of L) {
      const fe = await dt(pe);
      if (!fe) continue;
      const Ne = fe.tags ?? [];
      Ne.includes(T) || (fe.tags = [...Ne, T], await pt(fe));
    }
    H(!1), Q(), r(`Added tag "${T}" to ${L.length} pipeline${L.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, St = async (T) => {
    const L = Array.from(F);
    for (const pe of L) {
      const fe = await dt(pe);
      if (!fe) continue;
      const Ne = fe.tags ?? [];
      Ne.includes(T) && (fe.tags = Ne.filter((ze) => ze !== T), await pt(fe));
    }
    Q(), r(`Removed tag "${T}" from ${L.length} pipeline${L.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, Z = async () => {
    const T = Array.from(F);
    for (const L of T) await dr(L);
    ne(!1), z(), Q(), r(`Deleted ${T.length} pipeline${T.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ie = async () => {
    const T = Array.from(F);
    if (T.length === 0) return;
    let L = 0, pe = 0;
    for (const fe of T) {
      const Ne = await dt(fe);
      if (!Ne) continue;
      if (Ne.status === "published") {
        pe += 1;
        continue;
      }
      await ya(fe) && (L += 1);
    }
    Q(), pe > 0 ? r(
      `Published ${L}; skipped ${pe} already published`,
      { type: "success" }
    ) : r(
      `Published ${L} pipeline${L === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, ue = async () => {
    const T = Array.from(F);
    if (T.length === 0) return;
    let L = 0, pe = 0;
    for (const Ne of T) {
      const ze = await dt(Ne);
      if (!ze) continue;
      ze.status === "archived" ? (ze.status = "draft", pe += 1) : (ze.status = "archived", L += 1), await pt(ze);
    }
    Q();
    const fe = [];
    L > 0 && fe.push(`Archived ${L}`), pe > 0 && fe.push(`Unarchived ${pe}`), r(fe.join(" · ") || "No pipelines changed", { type: "success" });
  }, xe = async () => {
    const T = Array.from(F);
    if (T.length === 0) return;
    const L = [];
    for (const fe of T) {
      const Ne = await dt(fe);
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
        (F.size > 0 || G || R || X) && (H(!1), J(!1), z(), de(!1));
        return;
      }
      if ((L.metaKey || L.ctrlKey) && (L.key === "a" || L.key === "A")) {
        G && (L.preventDefault(), Y());
        return;
      }
      (L.key === "Delete" || L.key === "Backspace") && F.size > 0 && !M && !D && !y && !C && (L.preventDefault(), ne(!0));
    };
    return window.addEventListener("keydown", T), () => window.removeEventListener("keydown", T);
  }, [
    F,
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
  const Se = c.length > 0, Ue = F.size > 0;
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
          Up,
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
        Ue && /* @__PURE__ */ e(
          jp,
          {
            count: F.size,
            onClear: z,
            onExport: se,
            onExportAsJSON: xe,
            onPublish: ie,
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
            onSubmitAddTag: Ae,
            onSubmitRemoveTag: St,
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
            children: Se ? O.length === 0 ? /* @__PURE__ */ e(
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
                children: O.map((T) => /* @__PURE__ */ e(
                  _p,
                  {
                    row: T,
                    onOpen: () => Be(T.id),
                    onRun: () => {
                      Je(T);
                    },
                    onDuplicate: () => He(T.id),
                    onExport: () => Ge(T),
                    onDelete: () => A(T.id),
                    selectionMode: G,
                    selected: F.has(T.id),
                    anySelected: Ue,
                    onToggleSelect: (L) => V(T.id, L)
                  },
                  T.id
                ))
              }
            ) : /* @__PURE__ */ o("div", { className: "flex flex-col h-full", children: [
              /* @__PURE__ */ e("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ e(
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
                /* @__PURE__ */ e(
                  "button",
                  {
                    "data-testid": "empty-state-demo",
                    onClick: tt,
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
          gu,
          {
            open: y,
            onClose: () => k(!1),
            onCreate: Fe
          }
        ),
        /* @__PURE__ */ e(
          pu,
          {
            open: C,
            onClose: () => $(!1),
            onSelect: Ke
          }
        ),
        /* @__PURE__ */ e(
          Xe,
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
          Xe,
          {
            open: M,
            onClose: () => ne(!1),
            title: `Delete ${F.size} pipeline${F.size === 1 ? "" : "s"}?`,
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
const xu = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function Ko(t, n, r) {
  const i = xu[t], a = Math.max(0, n | 0), s = Math.max(0, r | 0);
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
function It(t) {
  const n = {};
  let r = 0, i = 0, a = 0, s = 0, d = !1;
  for (const l of t) {
    if (!l.model) continue;
    const p = l.tokensIn ?? 0, u = l.tokensOut ?? 0, m = Ko(l.model, p, u), h = n[l.model];
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
function Jt(t) {
  return !t || !t.modelFound && t.totalCostUsd === 0 ? "—" : t.totalCostUsd >= 0.01 ? `$${t.totalCostUsd.toFixed(2)}` : t.totalCostUsd === 0 ? "$0.00" : `$${t.totalCostUsd.toFixed(4)}`;
}
function bu(t) {
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
function Ho(t, n) {
  let r = 0;
  if (t.llm) {
    const a = n.get(t.nodeId);
    a && (r += Ko(a, t.llm.tokensIn, t.llm.tokensOut).totalCostUsd);
  }
  const i = t.costUsd;
  return typeof i == "number" && Number.isFinite(i) && i > 0 && (r += i), r;
}
function yu(t, n) {
  if (!n) return [];
  const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    l.data.type === "llm" && r.set(l.id, l.data.model), i.set(l.id, bu(l)), a.set(l.id, l.data.type);
  const s = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    s.set(l.id, 0), d.set(l.id, 0);
  for (const l of t)
    for (const p of Object.values(l.steps ?? {})) {
      if (!i.has(p.nodeId)) continue;
      const u = Ho(p, r);
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
function vu(t) {
  return t.slice(0, 10);
}
function Nu(t) {
  return Date.UTC(
    Number(t.slice(0, 4)),
    Number(t.slice(5, 7)) - 1,
    Number(t.slice(8, 10))
  );
}
function wu(t, n, r = 30, i = /* @__PURE__ */ new Date()) {
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
    const m = vu(u.startedAt);
    if (!c.has(m)) continue;
    let h = 0;
    for (const g of Object.values(u.steps ?? {}))
      h += Ho(g, a);
    c.set(m, (c.get(m) ?? 0) + h), l.set(m, (l.get(m) ?? 0) + 1);
  }
  const p = [];
  for (let u = d; u <= s; u += 864e5) {
    const m = new Date(u).toISOString().slice(0, 10);
    p.push({
      date: m,
      ts: Nu(m),
      totalCostUsd: c.get(m) ?? 0,
      runCount: l.get(m) ?? 0
    });
  }
  return p;
}
const Jo = [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
], Go = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], Yo = ["24h", "7d", "30d", "all"], ku = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function Cu(t) {
  return t.startsWith("document.") || t === "document" ? "document" : t === "schedule" || t === "scheduled" ? "scheduled" : t === "webhook" ? "webhook" : "manual";
}
function Iu(t) {
  let n = 0;
  for (const r of Object.values(t.steps ?? {})) {
    const i = r.attempts?.length ?? 0;
    i > 1 && (n += i - 1);
  }
  return n;
}
function Xo(t, n) {
  const r = n.now ?? Date.now(), i = n.range === "all" ? null : r - ku[n.range], a = n.query.trim().toLowerCase();
  return t.filter((s) => {
    if (n.statuses.size > 0 && !n.statuses.has(s.status)) return !1;
    if (n.triggerKinds.size > 0) {
      const d = Cu(s.triggeredBy.triggerType);
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
function ro(t, n) {
  if (!t) return /* @__PURE__ */ new Set();
  const r = new Set(n);
  return new Set(
    t.split(",").map((i) => i.trim()).filter((i) => r.has(i))
  );
}
function Qo(t) {
  const n = t.get("range") ?? "7d", r = Yo.includes(n) ? n : "7d";
  return {
    query: t.get("q") ?? "",
    statuses: ro(t.get("status"), Jo),
    triggerKinds: ro(t.get("trigger"), Go),
    range: r
  };
}
const Su = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, $u = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, Tu = {
  "24h": "Last 24h",
  "7d": "Last 7d",
  "30d": "Last 30d",
  all: "All time"
};
function oo({
  label: t,
  options: n,
  selected: r,
  onToggle: i,
  labels: a,
  testIdPrefix: s
}) {
  const [d, c] = S(!1), l = ce(null);
  vt(l, () => c(!1), d);
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
function Zo({
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
        /* @__PURE__ */ e("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: Yo.map((u) => /* @__PURE__ */ e(
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
            children: Tu[u]
          },
          u
        )) }),
        /* @__PURE__ */ e("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ e(
          oo,
          {
            label: "Status",
            options: Jo,
            selected: n,
            onToggle: s,
            labels: Su,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ e(
          oo,
          {
            label: "Trigger",
            options: Go,
            selected: r,
            onToggle: d,
            labels: $u,
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
function Ru({
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
function ir(t) {
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
function Pu(t) {
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
const Au = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function Mu(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Du({
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
          const { tone: N, label: b } = ir(f.status), w = n.has(f.id), y = Iu(f);
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
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: Mu(f.startedAt) }),
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
                      tone: Pu(f.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${f.id}`,
                      title: f.error.message,
                      className: "ml-1.5",
                      children: Au[f.error.errorCategory] ?? f.error.errorCategory
                    }
                  )
                ] }),
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: Te(f.durationMs) }),
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
                            await va(f.pipelineId, f.id);
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
function Lh() {
  const { pipelineId: t } = Nt(), n = We(), [r, i] = dn(), [a, s] = S([]), [d, c] = S(null), [l, p] = S([]), [u, m] = S(() => /* @__PURE__ */ new Set()), [h, g] = S(null), [x, f] = S(!1), [v, N] = S(null), [b, w] = S(!1), y = E((_) => {
    const W = _.error?.nodeId;
    if (!W || W === "unknown") return;
    const V = Object.entries(_.steps).filter(([Y, me]) => Y !== W && me.status === "completed").map(([Y]) => Y);
    g({ run: _, nodeId: W, skippedNodes: V, snapshotInput: !1 }), N(null);
  }, []), k = E(async () => {
    if (h) {
      N(null), f(!0);
      try {
        const _ = await Ro(
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
    () => Qo(r),
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
    t && (c(ct(t)), s(on(t)));
  }, [t]);
  const Q = q(
    () => Xo(a, { query: C, statuses: $, triggerKinds: D, range: A }),
    [a, C, $, D, A]
  ), O = q(() => {
    const _ = /* @__PURE__ */ new Map();
    if (!d) return _;
    for (const W of d.nodes)
      W.data.type === "llm" && _.set(W.id, W.data.model);
    return _;
  }, [d]), P = q(() => {
    const _ = {};
    for (const W of Q) {
      const V = Object.values(W.steps).filter((Y) => !!Y.llm).map((Y) => ({
        model: O.get(Y.nodeId),
        tokensIn: Y.llm?.tokensIn ?? 0,
        tokensOut: Y.llm?.tokensOut ?? 0
      }));
      _[W.id] = Jt(It(V).total);
    }
    return _;
  }, [Q, O]), G = () => {
    if (!t) return;
    w(!1);
    const _ = Array.from(u), W = a.filter((V) => !u.has(V.id));
    To(t);
    for (const V of [...W].sort((Y, me) => Y.startedAt.localeCompare(me.startedAt)))
      Na(t, V);
    s(on(t)), m(/* @__PURE__ */ new Set()), p((V) => V.filter((Y) => !_.includes(Y)));
  }, F = () => {
    const _ = a.filter((z) => u.has(z.id));
    if (_.length === 0) return;
    const W = new Blob([JSON.stringify(_, null, 2)], { type: "application/json" }), V = URL.createObjectURL(W), Y = document.createElement("a"), me = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    Y.href = V, Y.download = `pipeline-runs-${me}.json`, document.body.appendChild(Y), Y.click(), document.body.removeChild(Y), URL.revokeObjectURL(V);
  };
  return t ? d ? /* @__PURE__ */ o("div", { "data-testid": "pipeline-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e(
      sn,
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
      sn,
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
    v && /* @__PURE__ */ e(ot, { title: "Retry failed:", onDismiss: () => N(null), children: v }),
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
      Zo,
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
      Ru,
      {
        selectionCount: u.size,
        onExport: F,
        onDelete: () => {
          u.size > 0 && t && w(!0);
        },
        onClear: () => m(/* @__PURE__ */ new Set())
      }
    ),
    Q.length === 0 ? /* @__PURE__ */ e(
      qe,
      {
        icon: "📜",
        title: a.length === 0 ? "No runs yet" : "No runs match these filters",
        body: a.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
      }
    ) : /* @__PURE__ */ e(
      Du,
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
    qe,
    {
      icon: "🔍",
      title: "Pipeline not found",
      body: "It may have been deleted. Go back to the pipelines list.",
      actionLabel: "Back to pipelines",
      onAction: () => n("/pipelines")
    }
  ) }) : /* @__PURE__ */ e(wt, { to: "/pipelines", replace: !0 });
}
function Eu(t) {
  return q(() => {
    if (!t) return null;
    const n = ct(t.pipelineId);
    if (!n) return null;
    const r = /* @__PURE__ */ new Map();
    for (const a of n.nodes)
      a.data.type === "llm" && r.set(a.id, a.data.model);
    const i = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
      model: r.get(a.nodeId),
      tokensIn: a.llm?.tokensIn ?? 0,
      tokensOut: a.llm?.tokensOut ?? 0
    }));
    return It(i).total;
  }, [t]);
}
function rt({ title: t, children: n }) {
  return /* @__PURE__ */ o("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ e("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: t }),
    n
  ] });
}
const ao = "m-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", io = "px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", _n = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", Le = "px-2 py-[5px] text-[11px] text-text-secondary align-top", Ou = {
  "#2563eb": "bg-info/10 text-info-fg",
  "#7c3aed": "bg-accent/10 text-accent-fg",
  "#16a34a": "bg-success/10 text-success-fg",
  "#dc2626": "bg-danger/10 text-danger-fg"
};
function _t(t) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${Ou[t] ?? ""}`.trimEnd();
}
const _u = {
  completed: "#16a34a",
  failed: "#dc2626",
  running: "#2563eb"
};
function Lu({ stepId: t, step: n, index: r, nodeType: i, nodeConfig: a, onRetryFromStep: s, onResumeFromStep: d }) {
  const [c, l] = S(!1), p = n.output, u = p?.response, m = n.llm, h = n.input, g = _u[n.status] ?? "#94a3b8";
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
          /* @__PURE__ */ e(rt, { title: "Execution Timeline", children: /* @__PURE__ */ o("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ e("th", { scope: "col", className: _n, children: "Event" }),
              /* @__PURE__ */ e("th", { scope: "col", className: _n, children: "Time" }),
              /* @__PURE__ */ e("th", { scope: "col", className: _n, children: "Detail" })
            ] }) }),
            /* @__PURE__ */ o("tbody", { children: [
              n.startedAt && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Le, children: /* @__PURE__ */ e("span", { className: _t("#2563eb"), children: "started" }) }),
                /* @__PURE__ */ e("td", { className: Le, children: new Date(n.startedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Le, children: [
                  "Node ",
                  t.slice(0, 8),
                  " (",
                  i,
                  ") began execution"
                ] })
              ] }),
              m?.streamOpened && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Le, children: /* @__PURE__ */ e("span", { className: _t("#7c3aed"), children: "stream.opened" }) }),
                /* @__PURE__ */ e("td", { className: Le, children: "—" }),
                /* @__PURE__ */ e("td", { className: Le, children: "LLM stream connection established" })
              ] }),
              m?.firstTokenLatencyMs != null && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Le, children: /* @__PURE__ */ e("span", { className: _t("#7c3aed"), children: "first.token" }) }),
                /* @__PURE__ */ o("td", { className: Le, children: [
                  "+",
                  m.firstTokenLatencyMs,
                  "ms"
                ] }),
                /* @__PURE__ */ e("td", { className: Le, children: "First token received from LLM" })
              ] }),
              n.completedAt && n.status === "completed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Le, children: /* @__PURE__ */ e("span", { className: _t("#16a34a"), children: "completed" }) }),
                /* @__PURE__ */ e("td", { className: Le, children: new Date(n.completedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Le, children: [
                  "Finished in ",
                  n.durationMs != null ? n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` : "—"
                ] })
              ] }),
              n.status === "failed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Le, children: /* @__PURE__ */ e("span", { className: _t("#dc2626"), children: "failed" }) }),
                /* @__PURE__ */ e("td", { className: Le, children: n.completedAt ? new Date(n.completedAt).toLocaleTimeString() : "—" }),
                /* @__PURE__ */ e("td", { className: Le, children: n.error ?? "Unknown error" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ e(rt, { title: "Node Configuration", children: a && Object.keys(a).length > 1 ? /* @__PURE__ */ e("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(a).filter(([x]) => x !== "type").map(([x, f]) => /* @__PURE__ */ o(wo.Fragment, { children: [
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
          h && Object.keys(h).length > 0 && /* @__PURE__ */ e(rt, { title: "Runtime Input", children: /* @__PURE__ */ e("pre", { className: ao, children: JSON.stringify(h, null, 2) }) }),
          m?.prompt && /* @__PURE__ */ e(rt, { title: "Resolved Prompt", children: /* @__PURE__ */ e("div", { className: io, children: m.prompt }) }),
          u || m?.response ? /* @__PURE__ */ e(rt, { title: "Response", children: /* @__PURE__ */ e("div", { className: io, children: u ?? m?.response }) }) : /* @__PURE__ */ e(rt, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ e("pre", { className: ao, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
          (m || p?.tokensIn != null) && /* @__PURE__ */ e(rt, { title: "Token Usage", children: /* @__PURE__ */ o("div", { className: "flex gap-5 flex-wrap text-xs text-text-secondary", children: [
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
          n.error && /* @__PURE__ */ e(rt, { title: "Error", children: /* @__PURE__ */ e("div", { className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap", children: n.error }) }),
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
function Bu({ steps: t, nodeDataMap: n, edges: r, onRetryFromStep: i, onResumeFromStep: a }) {
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
            for (const O of Q)
              O.branch = O.branch ?? X;
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
      return /* @__PURE__ */ o(wo.Fragment, { children: [
        /* @__PURE__ */ e(
          Lu,
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
const Uu = 5e3, ju = "synthetic-";
function Fu(t) {
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
function Jn(t, n) {
  return n.timestamp.localeCompare(t.timestamp);
}
function zu(t, n) {
  if (n.length === 0) return t.slice().sort(Jn);
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
  return [...t, ...a].sort(Jn);
}
function qu(t, n, r = {}) {
  const { pollMs: i = Uu, filters: a } = r, s = Ba(), [d, c] = S([]), [l, p] = S([]), [u, m] = S(!0), [h, g] = S(null), [x, f] = S(void 0), [v, N] = S(0), [b, w] = S(!1), y = JSON.stringify({
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
        const M = await pr(t, n, a ?? {});
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
      const X = Fu(R);
      if (!X) return;
      const J = H;
      if (J.runId !== n) return;
      w(!0);
      const Q = {
        auditId: `${ju}${R}-${J.stepId ?? "run"}-${Date.now()}`,
        timestamp: J.at ?? (/* @__PURE__ */ new Date()).toISOString(),
        action: X,
        actorUserId: "executor",
        pipelineId: t,
        runId: n,
        trace: H
      };
      p((O) => [Q, ...O]);
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
  const k = ce(!1), C = E(() => {
    !t || !n || !x || k.current || (k.current = !0, (async () => {
      try {
        const A = await pr(t, n, {
          ...a ?? {},
          cursor: x
        });
        c((M) => {
          const ne = new Set(M.map((H) => H.auditId)), R = M.concat(A.items.filter((H) => !ne.has(H.auditId)));
          return R.sort(Jn), R;
        }), f(A.nextCursor);
      } catch (A) {
        g(A instanceof Error ? A.message : String(A));
      } finally {
        k.current = !1;
      }
    })());
  }, [t, n, x, y]), $ = E(() => {
    N((A) => A + 1);
  }, []);
  return {
    items: q(() => zu(d, l), [d, l]),
    loading: u,
    error: h,
    hasMore: !!x,
    loadMore: C,
    liveHealthy: b,
    refresh: $
  };
}
const Wu = "#3b82f6", Vu = "#eab308", Ku = "#f97316", so = "#64748b", Hu = "#ef4444", Ju = "#a855f7";
function Gu(t) {
  return t.action === "pipeline.step.failed" || t.outcome === "error" ? Hu : t.action === "pipeline.run.resumed-from-step" || t.action.startsWith("pipeline.step.context.patched") ? Ju : t.action.startsWith("pipeline.approval.") ? Vu : t.action.startsWith("pipeline.breakpoint.") ? Ku : t.action.startsWith("pipeline.step.") ? Wu : (t.action.startsWith("pipeline.run."), so);
}
const Yu = {
  "1h": "Last 1h",
  "24h": "Last 24h",
  all: "All"
}, lo = [
  { label: "Steps", matches: (t) => t.startsWith("pipeline.step.") },
  { label: "Approvals", matches: (t) => t.startsWith("pipeline.approval.") || t === "pipeline.approve" || t === "pipeline.reject" },
  { label: "Breakpoints", matches: (t) => t.startsWith("pipeline.breakpoint.") || t === "pipeline.step.breakpoint.hit" },
  { label: "Run lifecycle", matches: (t) => t.startsWith("pipeline.run.") || t === "pipeline.trigger" || t === "pipeline.cancel" },
  { label: "Errors", matches: (t) => t === "pipeline.step.failed" || t === "pipeline.run.failed" || t === "pipeline.force_fail" }
];
function Xu(t) {
  if (t === "all") return null;
  const n = Date.now();
  return t === "1h" ? n - 3600 * 1e3 : n - 1440 * 60 * 1e3;
}
function co(t) {
  const n = t.details, r = t.trace, i = n && typeof n.stepId == "string" ? n.stepId : void 0, a = r && typeof r.stepId == "string" ? r.stepId : void 0, s = r && typeof r.nodeId == "string" ? r.nodeId : void 0;
  return i ?? a ?? s;
}
function Qu(t, n = Date.now()) {
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
function Zu({
  pipelineId: t,
  runId: n,
  onStepClick: r
}) {
  const i = qu(t, n), { items: a, error: s, hasMore: d, loadMore: c, loading: l } = i, [p, u] = S(/* @__PURE__ */ new Set()), [m, h] = S(""), [g, x] = S("all"), [f, v] = S(/* @__PURE__ */ new Set()), N = E((C) => {
    u(($) => {
      const D = new Set($);
      return D.has(C) ? D.delete(C) : D.add(C), D;
    });
  }, []), b = E((C) => {
    v(($) => {
      const D = new Set($);
      return D.has(C) ? D.delete(C) : D.add(C), D;
    });
  }, []), w = q(() => {
    const C = Xu(g), $ = m.trim().toLowerCase(), D = lo.filter((A) => p.has(A.label));
    return a.filter((A) => {
      if (D.length > 0 && !D.some((M) => M.matches(A.action)) || $ && !A.actorUserId.toLowerCase().includes($)) return !1;
      if (C !== null) {
        const M = Date.parse(A.timestamp);
        if (!Number.isFinite(M) || M < C) return !1;
      }
      return !0;
    });
  }, [a, p, m, g]), y = E(() => {
    if (typeof window > "u") return;
    const C = w.map((M) => JSON.stringify(M)).join(`
`) + (w.length > 0 ? `
` : ""), $ = new Blob([C], { type: "application/x-ndjson" }), D = URL.createObjectURL($), A = document.createElement("a");
    A.href = D, A.download = `executor-log-${n}.ndjson`, document.body.appendChild(A), A.click(), document.body.removeChild(A), URL.revokeObjectURL(D);
  }, [w, n]), k = E(
    (C) => {
      if (b(C.auditId), !r || !C.action.startsWith("pipeline.step.")) return;
      const $ = co(C);
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
          lo.map((C) => {
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
                children: Yu[C]
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
            const $ = f.has(C.auditId), A = C.action.startsWith("pipeline.step.") ? co(C) : void 0;
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
                      style: { background: Gu(C) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: C.timestamp,
                      children: Qu(C.timestamp)
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
            Ee,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => c(),
              children: "Load more"
            }
          ) }) : /* @__PURE__ */ e("span", {}),
          /* @__PURE__ */ e("span", { "data-testid": "executor-log-download", children: /* @__PURE__ */ e(
            Ee,
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
function Bh() {
  const { pipelineId: t, runId: n } = Nt();
  return !t || !n ? /* @__PURE__ */ e(wt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e($o, { pipelineId: t, children: /* @__PURE__ */ e(wa, { children: /* @__PURE__ */ e(em, { pipelineId: t, runId: n }) }) });
}
function em({ pipelineId: t, runId: n }) {
  const r = We(), i = Ve(), a = kt(), { definition: s } = i, [d, c] = S(null);
  re(() => {
    let z = !1;
    return import("./usePendingApprovals-DB5-6o3z.js").then((de) => de.a3).then(({ getPipelineRun: de }) => {
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
    const we = Object.keys(z.steps).length, Fe = Object.keys(de.steps).length;
    return we >= Fe ? z : { ...de, status: z.status, currentStepIds: z.currentStepIds };
  }, [a.runs, n, d]);
  ka(n);
  const p = Eu(l ?? null), u = q(() => {
    const z = {};
    if (!s) return z;
    for (const de of s.nodes)
      z[de.id] = { type: de.data.type, data: de.data };
    return z;
  }, [s]), [m, h] = S(!1), g = ce(null);
  vt(g, () => h(!1), m);
  const [x, f] = S("steps"), [v, N] = S(null), b = E((z) => {
    N(z), f("steps");
  }, []), [w, y] = S(null), [k, C] = S(null), [$, D] = S(!1), A = l?.status === "failed" ? l.error?.nodeId : void 0, M = E((z) => {
    if (!l) return;
    const de = Object.entries(l.steps).filter(([we, Fe]) => we !== z && Fe.status === "completed").map(([we]) => we);
    y({ nodeId: z, skippedNodes: de, snapshotInput: !1 }), C(null);
  }, [l]), ne = E(async () => {
    if (!(!w || !l)) {
      C(null), D(!0);
      try {
        const z = await Ro(
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
  }, [w, l, t, r]), [R, H] = S(null), [X, J] = S(null), [Q, O] = S(null), P = E(async (z) => {
    if (l) {
      J(null), H(z);
      try {
        const de = await Ca(t, l.id, z);
        O(
          `Resumed from ${z.slice(0, 10)}${z.length > 10 ? "…" : ""} (replay #${de.replayAttempts})`
        ), setTimeout(() => O(null), 4e3), r(`/pipelines/${t}/runs/${l.id}`);
      } catch (de) {
        J(de instanceof Error ? de.message : String(de));
      } finally {
        H(null);
      }
    }
  }, [l, t, r]), G = E(async () => {
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
  }, [l, a, t, r]), F = async () => {
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
    const z = Qn(
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
              xt,
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
              Ee,
              {
                onClick: () => r(`/pipelines/${t}`),
                children: "Back to pipeline"
              }
            )
          ] })
        ]
      }
    );
  const V = ir(l.status), Y = l.triggeredBy.userId ?? l.triggeredBy.triggerType, me = Jt(p);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
      "data-testid": "pipeline-replay",
      children: [
        /* @__PURE__ */ o("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
          /* @__PURE__ */ e(
            xt,
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
                yt(l.startedAt),
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
            Ee,
            {
              onClick: () => M(A),
              disabled: $,
              "data-testid": "retry-from-failed-step-button",
              title: `Retry from "${A}" with the original upstream context`,
              children: "↻ Retry from failure"
            }
          ),
          /* @__PURE__ */ e(
            Ee,
            {
              onClick: G,
              "data-testid": "rerun-button",
              title: "Re-run with the original trigger payload",
              children: "↻ Re-run"
            }
          ),
          /* @__PURE__ */ o("div", { className: "relative", ref: g, children: [
            /* @__PURE__ */ e(
              xt,
              {
                onClick: () => h((z) => !z),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            m ? /* @__PURE__ */ o("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: F, children: "Copy runId" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: _, children: "Export run JSON" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: W, children: "Open as new draft" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ e(
          sn,
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
          k && /* @__PURE__ */ e(ot, { title: "Retry failed:", className: "mb-4", children: k }),
          X && /* @__PURE__ */ e(ot, { title: "Resume failed:", className: "mb-4", "data-testid": "resume-error-banner", children: X }),
          (l.replayAttempts ?? 0) > 0 && /* @__PURE__ */ e(
            ot,
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
                    yt(l.resumeHistory[l.resumeHistory.length - 1].at),
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
                      yt(z.at)
                    ] }, `${z.fromNodeId}-${z.at}-${de}`))
                  }
                )
              ] })
            }
          ),
          Q && /* @__PURE__ */ e(ot, { title: "Resumed", className: "mb-4", "data-testid": "resume-toast", children: Q }),
          l.error && /* @__PURE__ */ o(ot, { title: "Run failed:", className: "mb-4", children: [
            l.error.message,
            l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o("span", { className: "ml-2 text-[11px] text-[#b91c1c]", children: [
              "at node ",
              l.error.nodeId.slice(0, 8)
            ] }),
            l.status === "failed" && l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ e("div", { className: "mt-2", children: /* @__PURE__ */ e(
              Ee,
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
              Bu,
              {
                steps: l.steps,
                nodeDataMap: u,
                edges: s?.edges,
                onRetryFromStep: M,
                onResumeFromStep: l.status === "failed" ? P : void 0
              }
            )
          ) : /* @__PURE__ */ e("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ e(
            Zu,
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
function tm(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${Te(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function nm(t) {
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
function rm(t, n) {
  if (!t) return n;
  const r = t.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function om(t, n) {
  if (!t) return !1;
  const r = t.nodes.find((i) => i.id === n);
  return !!r && r.data.type === "condition";
}
function po(t) {
  if (!t) return;
  const n = t.output;
  if (n && typeof n == "object" && "result" in n)
    return n.result ? "true" : "false";
}
function am(t, n) {
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
function im(t, n, r) {
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
    const g = om(r, s), x = g ? po(d) : void 0, f = g ? po(c) : void 0, v = g && x !== void 0 && f !== void 0 && x !== f;
    return {
      nodeId: s,
      name: rm(r, s),
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
function sm(t) {
  if (t.statusDiffers) return "bg-[#fef2f2]";
  if (t.branchDiffers) return "bg-[#eff6ff]";
  if (t.durationLarge) return "bg-[#fffbeb]";
}
function uo({
  step: t,
  branch: n,
  isCondition: r
}) {
  if (!t)
    return /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" });
  const i = nm(t.status);
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(le, { tone: i, children: t.status }),
      /* @__PURE__ */ e("span", { className: "font-mono text-text-secondary", children: Te(t.durationMs) }),
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
function lm({ a: t, b: n }) {
  const r = q(() => am(t, n), [t, n]);
  return /* @__PURE__ */ e(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: r.map((i, a) => i.type === "eq" ? /* @__PURE__ */ e("span", { children: i.text }, a) : i.type === "add" ? /* @__PURE__ */ e("span", { "data-diff": "add", className: "bg-[#dcfce7] text-[#166534]", children: i.text }, a) : /* @__PURE__ */ e("span", { "data-diff": "del", className: "bg-[#fee2e2] text-[#991b1b] line-through", children: i.text }, a))
    }
  );
}
function cm({ row: t }) {
  const n = t.a?.llm, r = t.b?.llm, i = n && r ? r.tokensIn + r.tokensOut - (n.tokensIn + n.tokensOut) : void 0, a = sm(t);
  return /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ o("tr", { "data-testid": `run-compare-row-${t.nodeId}`, className: a, children: [
      /* @__PURE__ */ o("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a), children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-text-primary", children: t.name }),
        /* @__PURE__ */ e("div", { className: "font-mono text-[11px] text-text-tertiary", children: t.nodeId })
      ] }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a), children: /* @__PURE__ */ e(uo, { step: t.a, branch: t.branchA, isCondition: t.isCondition }) }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a), children: /* @__PURE__ */ e(uo, { step: t.b, branch: t.branchB, isCondition: t.isCondition }) }),
      /* @__PURE__ */ o(
        "td",
        {
          className: I("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", a),
          "data-testid": `run-compare-delta-${t.nodeId}`,
          children: [
            t.branchDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#2563eb]", children: "different branch!" }) : t.statusDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#dc2626]", children: "status differs" }) : t.durationDelta != null ? /* @__PURE__ */ e("span", { className: t.durationLarge ? "text-[#d97706]" : "text-text-secondary", children: tm(t.durationDelta) }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "—" }),
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
          lm,
          {
            a: n?.response ?? "",
            b: r?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function dm({ runA: t, runB: n, def: r }) {
  const i = q(() => im(t, n, r), [t, n, r]);
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
        /* @__PURE__ */ e("tbody", { children: i.map((a) => /* @__PURE__ */ e(cm, { row: a }, a.nodeId)) })
      ]
    }
  );
}
function pm(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${Te(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function um(t) {
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
function mm(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function mo(t, n) {
  const r = Object.values(t.steps).filter((i) => !!i.llm).map((i) => ({
    model: n.get(i.nodeId),
    tokensIn: i.llm?.tokensIn ?? 0,
    tokensOut: i.llm?.tokensOut ?? 0
  }));
  return Jt(It(r).total);
}
function ho({
  label: t,
  run: n,
  cost: r,
  testIdPrefix: i
}) {
  const a = um(n.status);
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
          /* @__PURE__ */ e("span", { className: "text-text-secondary", children: yt(n.startedAt) })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(le, { tone: a, children: n.status }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", children: Te(n.durationMs) }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", "data-testid": `${i}-cost`, children: r })
        ] })
      ]
    }
  );
}
function Uh() {
  const { pipelineId: t, runIdA: n, runIdB: r } = Nt(), i = We(), a = q(
    () => t ? ct(t) : null,
    [t]
  ), s = q(
    () => t && n ? an(t, n) : null,
    [t, n]
  ), d = q(
    () => t && r ? an(t, r) : null,
    [t, r]
  ), c = q(() => mm(a), [a]);
  if (!t || !n || !r)
    return /* @__PURE__ */ e(wt, { to: "/pipelines", replace: !0 });
  if (!a)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
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
    return /* @__PURE__ */ e("div", { className: "p-8", "data-testid": "run-compare-missing", children: /* @__PURE__ */ e(
      qe,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable — they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => i(`/pipelines/${t}/runs`)
      }
    ) });
  const l = (d.durationMs ?? 0) - (s.durationMs ?? 0), p = mo(s, c), u = mo(d, c), m = (/* @__PURE__ */ new Set([
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
      /* @__PURE__ */ e(ho, { label: "Run A", run: s, cost: p, testIdPrefix: "run-a" }),
      /* @__PURE__ */ e(ho, { label: "Run B", run: d, cost: u, testIdPrefix: "run-b" })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
        "data-testid": "run-compare-delta",
        children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Δ duration" }),
          /* @__PURE__ */ e("span", { className: "font-mono text-[13px]", children: pm(l) }),
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
    /* @__PURE__ */ e(dm, { runA: s, runB: d, def: a })
  ] });
}
function hm(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${Te(Math.abs(t))}`;
}
function fo(t) {
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
function fm({
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
              /* @__PURE__ */ e(le, { tone: fo(t.status), children: t.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: yt(t.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              Te(t.durationMs),
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
              /* @__PURE__ */ e(le, { tone: fo(n.status), children: n.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: yt(n.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              Te(n.durationMs),
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
              children: hm(d)
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
function gm(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${Te(Math.abs(t))}`;
}
function go(t) {
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
function xm(t, n) {
  if (!t) return n;
  const r = t.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function bm(t, n, r) {
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
      name: xm(r, s),
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
function ym({ runA: t, runB: n, def: r }) {
  const i = q(() => bm(t, n, r), [t, n, r]);
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
            /* @__PURE__ */ e(le, { tone: go(a.a.status), children: a.a.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: Te(a.a.durationMs) }),
            a.a.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              a.a.llm.tokensIn,
              " in / ",
              a.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: a.b ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(le, { tone: go(a.b.status), children: a.b.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: Te(a.b.durationMs) }),
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
                children: gm(a.durationDelta)
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
function vm(t, n) {
  if (!t) return n;
  const r = t.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function ln(t, n = "", r = 0) {
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
        for (const [c, l] of ln(t[s], d, r + 1))
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
      for (const [l, p] of ln(d, c, r + 1))
        i.set(l, p);
    }
  return i;
}
function ea(t, n) {
  const r = ln(t), i = ln(n), a = /* @__PURE__ */ new Set([...r.keys(), ...i.keys()]), s = [];
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
const Nm = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function wm({
  nodeId: t,
  name: n,
  outputA: r,
  outputB: i
}) {
  const [a, s] = S(!1), d = q(() => ea(r, i), [r, i]), c = d.filter((l) => l.type !== "unchanged").length;
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
              Nm[l.type]
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
function km({ runA: t, runB: n, def: r }) {
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
    wm,
    {
      nodeId: a,
      name: vm(r, a),
      outputA: t.steps[a]?.output,
      outputB: n.steps[a]?.output
    },
    a
  )) });
}
function Cm(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function xo(t, n) {
  const r = Object.values(t.steps).filter((i) => !!i.llm).map((i) => ({
    model: n.get(i.nodeId),
    tokensIn: i.llm?.tokensIn ?? 0,
    tokensOut: i.llm?.tokensOut ?? 0
  }));
  return Jt(It(r).total);
}
function rn({
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
const Im = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function Sm({
  runA: t,
  runB: n
}) {
  const r = q(
    () => ea(t.context, n.context),
    [t.context, n.context]
  ), i = r.filter((a) => a.type !== "unchanged").length;
  return /* @__PURE__ */ e(
    rn,
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
            Im[a.type]
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
function $m({ pipelineId: t, runIdA: n, runIdB: r }) {
  const i = We(), a = q(
    () => ct(t),
    [t]
  ), s = q(
    () => an(t, n),
    [t, n]
  ), d = q(
    () => an(t, r),
    [t, r]
  ), c = q(() => Cm(a), [a]);
  if (!a)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
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
    return /* @__PURE__ */ e("div", { className: "p-8", "data-testid": "diff-run-missing", children: /* @__PURE__ */ e(
      qe,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable -- they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => i(`/pipelines/${t}/runs`)
      }
    ) });
  const l = xo(s, c), p = xo(d, c);
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
        /* @__PURE__ */ e(rn, { title: "Summary", testId: "diff-summary-section", children: /* @__PURE__ */ e(
          fm,
          {
            runA: s,
            runB: d,
            costA: l,
            costB: p
          }
        ) }),
        /* @__PURE__ */ e(
          rn,
          {
            title: "Step-by-step comparison",
            badge: `${Object.keys(s.steps).length + Object.keys(d.steps).length > 0 ? "steps" : "0 steps"}`,
            testId: "diff-steps-section",
            children: /* @__PURE__ */ e(ym, { runA: s, runB: d, def: a })
          }
        ),
        /* @__PURE__ */ e(
          rn,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ e(km, { runA: s, runB: d, def: a })
          }
        ),
        /* @__PURE__ */ e(Sm, { runA: s, runB: d })
      ]
    }
  );
}
function jh() {
  const { pipelineId: t } = Nt(), [n] = dn(), r = n.get("a"), i = n.get("b");
  return !t || !r || !i ? /* @__PURE__ */ e(wt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e($m, { pipelineId: t, runIdA: r, runIdB: i });
}
function Fh() {
  const t = We(), [n, r] = dn(), [i, a] = S([]), { runs: s } = kt();
  re(() => {
    let b = !1;
    return (async () => {
      const w = ur(), y = [];
      await Promise.all(
        w.map(async (k) => {
          try {
            const { runs: C } = await So(k.id, { limit: 50 });
            if (C.length > 0) {
              for (const $ of C)
                $.id && y.push({ ...$, pipelineName: k.name });
              return;
            }
          } catch {
          }
          for (const C of on(k.id))
            C.id && y.push({ ...C, pipelineName: k.name });
        })
      ), !b && (y.sort((k, C) => C.startedAt.localeCompare(k.startedAt)), a(y));
    })(), () => {
      b = !0;
    };
  }, []);
  const d = q(() => {
    const b = new Map(ur().map((k) => [k.id, k.name])), w = new Set(i.map((k) => k.id)), y = [];
    for (const [k, C] of Object.entries(s))
      w.has(k) || C.pipelineId && y.push({
        ...C,
        pipelineName: b.get(C.pipelineId) ?? `Pipeline ${C.pipelineId.slice(0, 8)}`
      });
    return y.length === 0 ? i : [...y, ...i].sort((k, C) => C.startedAt.localeCompare(k.startedAt));
  }, [i, s]), { query: c, statuses: l, triggerKinds: p, range: u } = q(
    () => Qo(n),
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
    () => Xo(d, { query: c, statuses: l, triggerKinds: p, range: u }),
    [d, c, l, p, u]
  ), N = q(() => {
    const b = {};
    for (const w of v) {
      const y = Object.values(w.steps).filter((C) => !!C.llm).map((C) => ({
        model: void 0,
        tokensIn: C.llm?.tokensIn ?? 0,
        tokensOut: C.llm?.tokensOut ?? 0
      })), k = It(y);
      k.total.totalCostUsd > 0 && (b[w.id] = Jt(k.total));
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
      Zo,
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
      qe,
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
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ e(le, { tone: ir(b.status).tone, size: "sm", children: b.status }) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: b.triggerType ?? b.triggeredBy?.triggerType }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: yp(b.startedAt) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: b.completedAt ? Te(new Date(b.completedAt).getTime() - new Date(b.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: N[b.id] ?? "—" })
          ]
        },
        b.id
      )) })
    ] }) })
  ] });
}
function ta(t) {
  let n = 0, r = 0;
  for (const i of Object.values(t.steps ?? {}))
    i.llm && (n += i.llm.tokensIn ?? 0, r += i.llm.tokensOut ?? 0);
  return { tokensIn: n, tokensOut: r };
}
function Tm(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Rm(t, n) {
  const r = [];
  for (const i of Object.values(t.steps ?? {}))
    i.llm && r.push({
      model: n.get(i.nodeId),
      tokensIn: i.llm.tokensIn,
      tokensOut: i.llm.tokensOut
    });
  return It(r).total.totalCostUsd;
}
function bo(t, n) {
  if (t.length === 0) return 0;
  const r = Math.min(t.length - 1, Math.floor(t.length * n));
  return t[r];
}
function yo(t) {
  return t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function vo(t) {
  const n = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) ? `$${n.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function Pm(t) {
  return t.slice(0, 8);
}
function Am(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Mm(t, n) {
  const r = t.length;
  let i = 0, a = 0, s = 0;
  const d = [];
  let c = 0, l = 0, p = 0;
  const u = /* @__PURE__ */ new Map();
  for (const f of t) {
    f.status === "completed" ? i++ : f.status === "failed" ? a++ : f.status === "cancelled" && s++, typeof f.durationMs == "number" && f.durationMs > 0 && d.push(f.durationMs);
    const v = ta(f);
    if (c += v.tokensIn, l += v.tokensOut, p += Rm(f, n), f.error?.message) {
      const N = f.error.message.slice(0, 48), b = u.get(N);
      b ? (b.count += 1, f.startedAt > b.lastSeenAt && (b.lastSeenAt = f.startedAt, b.exampleRunId = f.id)) : u.set(N, { count: 1, lastSeenAt: f.startedAt, exampleRunId: f.id });
    }
  }
  d.sort((f, v) => f - v);
  const m = bo(d, 0.5), h = bo(d, 0.95), g = r === 0 ? 0 : Math.round(i / r * 100), x = [...u.entries()].map(([f, v]) => ({ key: f, count: v.count, lastSeenAt: v.lastSeenAt, exampleRunId: v.exampleRunId })).sort((f, v) => v.count - f.count).slice(0, 5);
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
function Dm(t) {
  return t >= 90 ? "#16a34a" : t >= 70 ? "#f59e0b" : "#dc2626";
}
function Em(t) {
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
function Om(t, n) {
  const i = [...t].sort((s, d) => s.startedAt.localeCompare(d.startedAt)).filter((s) => typeof s.durationMs == "number" && s.durationMs > 0).map((s) => ({ x: new Date(s.startedAt).getTime(), y: s.durationMs })), a = i.map((s) => ({ x: s.x, y: n }));
  return [
    { label: "Duration (ms)", data: i, color: "#646cff" },
    { label: "p50", data: a, color: "#94a3b8" }
  ];
}
function _m(t) {
  const n = [...t].sort((a, s) => a.startedAt.localeCompare(s.startedAt)), r = [], i = [];
  for (const a of n) {
    const s = new Date(a.startedAt).getTime(), { tokensIn: d, tokensOut: c } = ta(a);
    r.push({ x: s, y: d }), i.push({ x: s, y: c });
  }
  return [
    { label: "Tokens in", data: r, color: "#646cff" },
    { label: "Tokens out", data: i, color: "#16a34a" }
  ];
}
function zh() {
  const { pipelineId: t } = Nt(), n = We(), [r, i] = S(null), [a, s] = S([]), [d, c] = S("50");
  re(() => {
    t && (i(ct(t)), s(on(t)));
  }, [t]);
  const l = q(() => {
    if (d === "all") return a;
    const f = Number(d);
    return a.slice(0, f);
  }, [a, d]), p = q(() => Tm(r), [r]), u = q(() => Mm(l, p), [l, p]), m = q(
    () => yu(l, r).filter((f) => f.totalCostUsd > 0 || f.stepCount > 0),
    [l, r]
  ), h = q(() => wu(a, r, 30), [a, r]), g = q(
    () => [
      {
        label: "Daily spend",
        data: h.map((f) => ({ x: f.ts, y: f.totalCostUsd })),
        color: "#646cff"
      }
    ],
    [h]
  );
  if (!t) return /* @__PURE__ */ e(wt, { to: "/pipelines", replace: !0 });
  if (!r)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
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
                  style: { color: Dm(u.successRatePct) },
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
              /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: Te(u.medianMs) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                "p95 · ",
                Te(u.p95Ms)
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
              /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: yo(u.totalCost) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                yo(u.costPerRun),
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
                ja,
                {
                  data: m.map((f) => ({
                    label: f.label,
                    cost: Number(f.totalCostUsd.toFixed(6))
                  })),
                  xKey: "label",
                  yKey: "cost",
                  height: 200,
                  color: "#646cff",
                  yFormat: vo
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-trend-30d", children: [
              /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "30-day spend trend" }),
              /* @__PURE__ */ e(
                Gt,
                {
                  series: g,
                  height: 200,
                  xFormat: (f) => new Date(Number(f)).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric"
                  }),
                  yFormat: vo
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
            Gt,
            {
              series: Em(l),
              height: 180,
              xFormat: (f) => new Date(Number(f)).toLocaleDateString()
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Duration over time" }),
          /* @__PURE__ */ e(
            Gt,
            {
              series: Om(l, u.medianMs),
              height: 180,
              xFormat: (f) => new Date(Number(f)).toLocaleDateString(),
              yFormat: (f) => Te(f)
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Token usage over time" }),
          /* @__PURE__ */ e(
            Gt,
            {
              series: _m(l),
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
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5 text-text-secondary", children: Am(f.lastSeenAt) }),
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => n(`/pipelines/${t}/runs/${f.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    Pm(f.exampleRunId),
                    " →"
                  ]
                }
              ) })
            ] }, f.key)) })
          ] })
        ] })
      ] })
    ] }) : /* @__PURE__ */ e(
      qe,
      {
        icon: "📊",
        title: "No runs yet",
        body: "No runs yet. Trigger this pipeline to see stats."
      }
    )
  ] });
}
function Lm(t) {
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
function Bm(t) {
  return t.length <= 6 ? t : t.slice(-6);
}
function Um({ approver: t, idx: n }) {
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
function jm(t, n) {
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
function Fm({ row: t, onSubmit: n, onOpenPipeline: r }) {
  const [i, a] = S(""), s = E(
    (p) => {
      n(p, i.trim()), a("");
    },
    [i, n]
  ), d = t.requiredCount ?? 1, c = t.recordedCount ?? 0, l = q(() => jm(t.runContext, t.runSteps), [t.runContext, t.runSteps]);
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
            Bm(t.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: Lm(t.requestedAt) })
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
      t.approvers.length === 0 ? /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : t.approvers.map((p, u) => /* @__PURE__ */ e(Um, { approver: p, idx: u }, u)),
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
function qh() {
  const t = We(), { approvals: n, isLoading: r, error: i, retry: a } = Ia(), { resolveApproval: s, runs: d } = kt(), [c, l] = S(
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
      m.current.has(f.runId) || (m.current.add(f.runId), Sa(f.pipelineId, f.runId).then((v) => {
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
      w === void 0 && (w = ct(N.pipelineId), f.set(N.pipelineId, w));
      const y = w?.name ?? (N.pipelineId ? `Pipeline ${N.pipelineId.slice(0, 8)}` : "Unknown pipeline"), k = p[N.runId]?.context ?? d[N.runId]?.context, C = p[N.runId]?.steps;
      v.push({ ...N, pipelineName: y, runContext: k, runSteps: C });
    }
    return v;
  }, [n, c, d, p]), g = E(
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
        /* @__PURE__ */ e(fn, { height: 140 }),
        /* @__PURE__ */ e(fn, { height: 140 }),
        /* @__PURE__ */ e(fn, { height: 140 })
      ] }) : x === 0 && !i ? /* @__PURE__ */ e(
        qe,
        {
          icon: "✋",
          title: "No pending approvals",
          body: "When a pipeline reaches an approval step, it'll show up here.",
          testId: "approvals-empty"
        }
      ) : /* @__PURE__ */ e("div", { "data-testid": "approvals-list", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: h.map((f) => /* @__PURE__ */ e(
        Fm,
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
function Wh({
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
function Vh(t = {}) {
  const { maxRecords: n = 50, runId: r } = t, [i, a] = S([]), s = ce(/* @__PURE__ */ new Map()), d = ce(!0);
  return re(() => (d.current = !0, () => {
    d.current = !1;
  }), []), je("*", (c) => {
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
function zm(t) {
  return t === "pass" ? "success" : t === "fail" ? "danger" : "warning";
}
function qm({ result: t, className: n }) {
  const r = zm(t.overallVerdict), i = r === "success" ? "PASS" : r === "danger" ? "FAIL" : "INCONCLUSIVE", a = t.rubricSnapshot.passThreshold ?? 0.5;
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
            tr,
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
function Wm({ result: t, className: n }) {
  if (!t.criteria || t.criteria.length === 0) return null;
  const r = /* @__PURE__ */ new Map();
  for (const i of t.rubricSnapshot.criteria) r.set(i.id, i);
  return /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", n), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Criteria (",
      t.criteria.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1.5", children: t.criteria.map((i) => /* @__PURE__ */ e(Vm, { score: i, def: r.get(i.criterionId) }, i.criterionId)) })
  ] });
}
function Vm({
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
      tr,
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
const na = sa(null);
function Kh({ value: t, children: n }) {
  return /* @__PURE__ */ e(na.Provider, { value: t, children: n });
}
function ra() {
  return cn(na);
}
function Hh({
  result: t,
  showVerdict: n = !0,
  showCriteria: r = !0,
  showMetadata: i = !0,
  showRawText: a = !1,
  className: s
}) {
  const d = ra(), [c, l] = S(!1), [p, u] = S(null), [m, h] = S(!1), [g, x] = S(null), f = ce(!0);
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
    n ? /* @__PURE__ */ e(qm, { result: t }) : null,
    r ? /* @__PURE__ */ e(Wm, { result: t }) : null,
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
        Km,
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
function Km({
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
function Jh({ aggregate: t, className: n }) {
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
            tr,
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
function Gh({
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
        La,
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
      /* @__PURE__ */ e("tbody", { children: s.map((m) => /* @__PURE__ */ e(Hm, { row: m }, m.aggregateKey)) })
    ] })
  ] });
}
function Hm({ row: t }) {
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
function Jm(t) {
  if (typeof t == "number") return t;
  if (typeof t == "string") {
    const n = Date.parse(t);
    if (Number.isFinite(n)) return n;
  }
  return Date.now();
}
function Yh(t = {}) {
  const { maxRecords: n = 50, runId: r } = t, [i, a] = S([]), s = ce(/* @__PURE__ */ new Map()), d = ce(!0);
  return re(() => (d.current = !0, () => {
    d.current = !1;
  }), []), je("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.judge.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const m = `${u.runId}::${u.stepId}`;
    a((h) => {
      const g = s.current.get(m), x = Jm(u.at), f = (v) => {
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
function Xh(t) {
  const n = ra(), [r, i] = S([]), [a, s] = S(!1), [d, c] = S(null), l = ce(!0), p = ce(() => {
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
const Gm = 100, Ym = 500, oa = 148, aa = 116, Xm = 56, Qm = 20;
function Zm(t) {
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
    const u = l * (oa + Xm);
    p.forEach((m, h) => {
      c.set(m, {
        x: u,
        y: h * (aa + Qm)
      });
    });
  }
  return c;
}
function eh(t, n) {
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
function th({ src: t, alt: n, testId: r }) {
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
function nh({ data: t }) {
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
            th,
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
const rh = { lineageNode: nh };
function oh() {
  return /* @__PURE__ */ e(
    "div",
    {
      className: "flex items-center justify-center h-full text-text-tertiary text-sm",
      "data-testid": "lineage-graph-empty",
      children: "No image artifacts produced by this run."
    }
  );
}
function ah(t, n) {
  if (t.length <= n) return t;
  const r = t.map((i, a) => ({ e: i, i: a }));
  return r.sort((i, a) => {
    const s = Date.parse(i.e.at), d = Date.parse(a.e.at);
    return d !== s ? d - s : a.i - i.i;
  }), r.slice(0, n).map((i) => i.e);
}
function Ln(t) {
  return t.length > 10 ? `${t.slice(0, 8)}…` : t;
}
function ih({
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
  return /* @__PURE__ */ e(
    Xe,
    {
      open: !0,
      onClose: r,
      title: `Artifact ${Ln(s.imageId)}`,
      maxWidth: 760,
      rawChildren: !0,
      backdropTestId: "lineage-preview-backdrop",
      footer: /* @__PURE__ */ e(
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
                    Ln(s.imageId)
                  ] }),
                  /* @__PURE__ */ e(
                    xt,
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
                    Ln(s.producedByStepId)
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
function Qh({
  entries: t,
  selectedImageId: n,
  onSelect: r,
  maxRenderedNodes: i = Gm
}) {
  const a = Pe(), [s, d] = S(!1), [c, l] = S(!1), [p, u] = S(null), m = t.length, h = !s && m > i, g = q(
    () => h ? ah(t, i) : t,
    [t, h, i]
  ), x = q(
    () => n ? eh(n, g) : /* @__PURE__ */ new Set(),
    [n, g]
  ), f = q(() => Zm(g), [g]), v = E(
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
        style: { width: oa, height: aa }
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
  ), [y, , k] = Po(N), [C, , $] = Ao(w), D = E(
    (J, Q) => {
      v(Q.id);
    },
    [v]
  ), A = E(() => {
    m > Ym ? l(!0) : d(!0);
  }, [m]), M = E(() => {
    d(!0), l(!1);
  }, []), ne = E(() => {
    l(!1);
  }, []), R = q(() => {
    const J = g.slice();
    return J.sort((Q, O) => {
      const P = Date.parse(Q.at), G = Date.parse(O.at);
      return P !== G ? P - G : Q.imageId.localeCompare(O.imageId);
    }), J;
  }, [g]), H = E(() => u(null), []), X = E(
    (J) => u(J),
    []
  );
  return m === 0 ? /* @__PURE__ */ e(oh, {}) : /* @__PURE__ */ o(
    "div",
    {
      className: "relative w-full h-full flex flex-col",
      "data-testid": "lineage-graph",
      children: [
        h && /* @__PURE__ */ e("div", { className: "p-2 flex-shrink-0", children: /* @__PURE__ */ o(
          ot,
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
            Mo,
            {
              nodes: y,
              edges: C,
              onNodesChange: k,
              onEdgesChange: $,
              onNodeClick: D,
              nodeTypes: rh,
              fitView: !0,
              fitViewOptions: { padding: 0.2 },
              minZoom: 0.3,
              maxZoom: 2,
              onlyRenderVisibleElements: !0,
              proOptions: { hideAttribution: !0 },
              children: [
                /* @__PURE__ */ e(Do, { gap: 16, size: 1, className: "bg-surface-inset" }),
                /* @__PURE__ */ e(Eo, { showInteractive: !1, className: "bg-surface border border-border rounded" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e(
          sn,
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
          ih,
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
const Kt = /* @__PURE__ */ new Map(), sh = 6e4;
function No(t) {
  const n = Kt.get(t);
  return n ? Date.now() - n.fetchedAt > sh ? (Kt.delete(t), null) : n.entries : null;
}
function lh(t, n) {
  Kt.set(t, { entries: n, fetchedAt: Date.now() });
}
function Zh() {
  Kt.clear();
}
function ef(t, n) {
  const [r, i] = S(() => t ? No(t) ?? [] : []), [a, s] = S(!1), [d, c] = S(null), l = ce(0), p = E(() => {
    if (!t || !n) return;
    const m = No(t);
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
      lh(t, v), i(v), s(!1);
    }).catch((x) => {
      h === l.current && (c(x instanceof Error ? x.message : String(x)), s(!1));
    });
  }, [t, n]), u = E(() => {
    t && Kt.delete(t), p();
  }, [t, p]);
  return re(() => {
    p();
  }, [p]), { entries: r, loading: a, error: d, refetch: u };
}
export {
  si as ActionNode,
  ad as AdjustBwConfig,
  _i as AdjustBwNode,
  xd as AdjustLayerConfig,
  Bi as AdjustLayerNode,
  Ni as AgUiOutputNode,
  hi as AgentNode,
  Jh as AggregateSummaryCard,
  Fh as AllRunsPage,
  ss as AnimatedEdge,
  mi as ApprovalNode,
  be as BaseNode,
  rp as CaptionPanel,
  ai as ConditionNode,
  mn as ContextVariablePicker,
  Wm as CriteriaPanel,
  rd as CropConfig,
  Oi as CropNode,
  yd as DimensionsConfig,
  Ui as DimensionsNode,
  Jd as EditPromptConfig,
  rs as EditPromptNode,
  dp as EditRecommendationsPanel,
  lf as EventStreamProvider,
  li as ForkNode,
  Vc as FormatConvertConfig,
  Ai as FormatConvertNode,
  zd as GenerateConfig,
  Qi as GenerateNode,
  xi as GraphQueryNode,
  yi as GuardrailNode,
  Qh as ImageLineageGraph,
  Yd as ImageSourceConfig,
  ki as ImageSourceNode,
  ap as ImageWithBBoxOverlay,
  pi as JoinNode,
  Kh as JudgmentApiProvider,
  Hh as JudgmentResultViewer,
  Gh as JudgmentTrendChart,
  gi as KnowledgeBaseNode,
  ti as LLMNode,
  fi as McpToolNode,
  bi as MemoryNode,
  Ga as NODE_CATEGORIES,
  Eh as NODE_TYPES_WITHOUT_CONFIG,
  Cs as NodePalette,
  un as NodeThumbStrip,
  lp as ObjectsPanel,
  xs as PALETTE_ITEMS,
  Ya as PORT_CLS,
  qh as PendingApprovalsPage,
  sp as PeoplePanel,
  Us as PipelineCanvas,
  Yn as PipelineEditorContext,
  Oh as PipelineEditorPage,
  $o as PipelineEditorProvider,
  rf as PipelineEditorServicesProvider,
  of as PipelineNodeRuntimeProvider,
  Uh as PipelineRunComparePage,
  jh as PipelineRunDiff,
  Bh as PipelineRunReplayPage,
  Lh as PipelineRunsPage,
  wa as PipelineRunsProvider,
  zh as PipelineStatsPage,
  _h as PipelinesPage,
  vi as PolicyNode,
  Lc as ResizeConfig,
  $i as ResizeNode,
  Qd as SaveConfig,
  Ci as SaveNode,
  Oc as ScatterConfig,
  Si as ScatterNode,
  Kc as SharpenConfig,
  Mi as SharpenNode,
  cp as TagsPanel,
  zc as TransformGeoConfig,
  Ri as TransformGeoNode,
  ri as TransformNode,
  Qa as TriggerNode,
  Nd as UpscaleConfig,
  ji as UpscaleNode,
  Vd as VariationConfig,
  es as VariationNode,
  qm as VerdictPanel,
  Pd as VisionClassifyConfig,
  Ki as VisionClassifyNode,
  $d as VisionConfig,
  Dd as VisionDescribeConfig,
  Hi as VisionDescribeNode,
  Ud as VisionExtractTextConfig,
  Gi as VisionExtractTextNode,
  Vi as VisionNode,
  pp as VisionResultViewer,
  Wh as VisionRunCard,
  _d as VisionTagConfig,
  Ji as VisionTagNode,
  Jc as WatermarkConfig,
  Di as WatermarkNode,
  Wl as availableContextPaths,
  Hl as availableImageRefs,
  ge as categoryFor,
  Zh as clearImageLineageCache,
  Sr as contextContributions,
  ip as imageOverlayPropsFrom,
  os as nodeTypes,
  j as portCls,
  Dh as recordRecentType,
  Vl as unresolvedTemplatePaths,
  Fn as upstreamNodeIds,
  je as useEventStream,
  Ba as useEventStreamContext,
  ef as useImageLineage,
  Pe as useImageUrl,
  ko as useIsNodeTypeExecutable,
  Xh as useJudgmentAggregates,
  ra as useJudgmentApi,
  Yh as useJudgmentResults,
  he as useLatestStepForNode,
  Ve as usePipelineEditor,
  Co as usePipelineEditorServices,
  af as usePipelineNodeRuntime,
  kt as usePipelineRuns,
  Oe as useRetryFromStep,
  et as useUpstreamContext,
  _e as useUpstreamImageRefs,
  Vh as useVisionResults
};
