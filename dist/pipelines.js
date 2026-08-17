import { jsxs as o, jsx as e, Fragment as G } from "react/jsx-runtime";
import No, { useState as S, memo as oa, useRef as le, useEffect as ne, useMemo as q, useCallback as D, useContext as wo, createContext as aa } from "react";
import { useNavigate as Be, useParams as gt, Navigate as xt, useSearchParams as an } from "react-router";
import { v as me, w as Re, q as $e, G as Jn, x as Ue, u as bt, i as ia, g as sa, f as or, p as la, y as ca, J as cn, t as ko, I as Co, e as Bt, S as en, N as da, T as dn, n as Io, a as ot, z as So, A as Hn, B as On, C as $o, D as pa, E as ua, F as ma, b as ha, H as at, K as fa, L as ga, M as it, O as ar, Q as xa, j as ba, o as To, R as tn, U as ya, m as ir, P as va, V as Na, r as wa, W as nn, l as sr, X as ka, k as Ca } from "./usePendingApprovals-BhFuu3qV.js";
import { h as kf, Y as Cf, Z as If } from "./usePendingApprovals-BhFuu3qV.js";
import { Handle as L, Position as B, useNodeConnections as Ia, getSmoothStepPath as Sa, EdgeLabelRenderer as lr, ReactFlowProvider as $a, useReactFlow as Ta, useNodesState as Ao, useEdgesState as Ro, ReactFlow as Po, Background as Mo, BackgroundVariant as Aa, Controls as Eo, MiniMap as Ra } from "@xyflow/react";
/* empty css               */
import { c as I } from "./cn-B6yFEsav.js";
import { a as Gn, u as sn } from "./ToastProvider-DLKtnzJT.js";
import { I as yt, F as Pa, b as Ma, C as Kn, u as Ea, T as Da, S as Yn, a as Oa } from "./TrendSparkline-BFllSNbR.js";
import "clsx";
import "tailwind-merge";
import { M as He } from "./Modal-fp5zcyw8.js";
import "react-dom";
import "./WebSocketContext-DPGFyPeZ.js";
import { a as De, u as _a } from "./EventStreamContext-CjzSHXy-.js";
import { E as $f } from "./EventStreamContext-CjzSHXy-.js";
import { B as Oe } from "./Button-Qsbxqsl9.js";
import { I as mt, F as La } from "./FileUploadDrop-Cmz3XANg.js";
import { u as Xn } from "./IdentityContext-CLalsm_M.js";
import { B as Ze } from "./Banner-DKb3JiLs.js";
import { C as se } from "./Chip-BDT8ro4h.js";
import { E as ze } from "./EmptyState-CpAOblv3.js";
import { C as rn } from "./ConfirmDialog-Ix7G_Mb4.js";
import { B as Ba, L as qt } from "./Chart-ByoxeiYX.js";
import { S as pn } from "./SkeletonCard-C89GWQ3p.js";
const Ua = {
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
}, Fa = {
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
function _n(t, r, n, a) {
  return !(!ja(t, r) || !za(n, a));
}
function ja(t, r) {
  const n = Ua[t];
  return n === "fork" ? qa(r) : n.includes(r);
}
function za(t, r) {
  const n = Fa[t];
  return n === null ? !1 : n === "join" ? Va(r) : n.includes(r);
}
function qa(t) {
  return /^branch-(\d+)$/.exec(t) !== null;
}
function Va(t) {
  return /^in-(\d+)$/.exec(t) !== null;
}
const Wa = {
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
function ge(t) {
  const { icon: r, subtitle: n, state: a, body: i, footer: s, selected: d, onRetry: c, hasBreakpoint: l, pausedAtBreakpoint: p, ariaLabel: u, category: f, children: h } = t, g = Wa[a], x = f ? Ja[f] : void 0, m = Gn(), [N, y] = S(!1), v = a === "failed" && typeof c == "function", w = ($) => {
    $.preventDefault(), $.stopPropagation(), c?.();
  }, b = !m && a === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !m && a === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", k = !!(i || s || v), C = !!(i || s), T = n ? `${n}, state: ${a}` : `Node, state: ${a}`;
  return /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        p ? "border-2 border-[#d97706] bg-[#fffbeb] shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]" : g.card,
        !p && d && "shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]",
        !p && !d && "shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
        m && "transition-none"
      ),
      role: "button",
      tabIndex: 0,
      "aria-label": u ?? T,
      "aria-selected": !!d,
      "data-state": a,
      "data-node-state": a,
      "data-node-category": f,
      "data-pipeline-node": "true",
      children: [
        x && /* @__PURE__ */ e(
          "span",
          {
            "aria-hidden": "true",
            "data-testid": "category-accent",
            className: I(
              "absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[7px] pointer-events-none",
              x.bar
            )
          }
        ),
        l && /* @__PURE__ */ e(
          "span",
          {
            "aria-label": "breakpoint",
            "data-testid": "breakpoint-dot",
            className: "absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-[#ef4444] border-[1.5px] border-white z-[1]"
          }
        ),
        /* @__PURE__ */ o("div", { className: I(
          "flex items-center gap-2 h-7 px-2.5",
          k && "border-b border-border"
        ), children: [
          x ? /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": "true",
              "data-testid": "category-chip",
              className: I("flex items-center justify-center shrink-0", x.chip),
              children: /* @__PURE__ */ e("span", { className: I("text-xs leading-none", x.glyph), children: r })
            }
          ) : /* @__PURE__ */ e("span", { className: "text-sm leading-none shrink-0", "aria-hidden": "true", children: r }),
          /* @__PURE__ */ e("span", { className: "flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap", children: n }),
          /* @__PURE__ */ e(
            "span",
            {
              className: I("w-2 h-2 rounded-full shrink-0", g.dot, b),
              "aria-label": `state: ${a}`
            }
          )
        ] }),
        v && /* @__PURE__ */ e("div", { className: I(
          "flex px-2.5 py-1.5",
          C && "border-b border-border"
        ), children: /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: I(
              "cursor-pointer appearance-none font-inherit text-[11px] font-medium leading-tight px-2 py-0.5 rounded-full border border-[#dc2626] text-[#dc2626] transition-colors duration-[120ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              N ? "bg-[#fef2f2]" : "bg-transparent",
              m && "transition-none"
            ),
            onClick: w,
            onMouseDown: ($) => $.stopPropagation(),
            onMouseEnter: () => y(!0),
            onMouseLeave: () => y(!1),
            "aria-label": "Retry from here",
            children: "⟳ Retry from here"
          }
        ) }),
        i != null && /* @__PURE__ */ e("div", { className: "px-2.5 py-2 text-[13px] leading-[1.4] text-text-secondary", children: i }),
        s != null && /* @__PURE__ */ e("div", { className: "border-t border-border px-2.5 py-1.5 text-xs text-text-secondary", children: s }),
        h
      ]
    }
  );
}
const Ha = {
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
function fe(t) {
  return Ha[t];
}
const Ga = {
  image: "!w-2.5 !h-2.5 !rounded-sm !bg-[#7c3aed] !border-[#6d28d9]",
  text: "!w-2.5 !h-2.5 !bg-slate-300",
  data: "!w-2.5 !h-2.5 !bg-[#94a3b8]",
  control: "!w-2 !h-2 !bg-warning",
  error: "!w-2 !h-2 !bg-danger"
};
function F(t) {
  return Ga[t];
}
function cr(t) {
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
function Ka(t) {
  return t.triggerType === "schedule" ? t.schedule ? `cron: ${t.schedule}` : "No schedule set" : t.triggerType === "webhook" ? t.webhookPath ? `POST ${t.webhookPath}` : "No path set" : t.triggerType.startsWith("document.") ? t.documentTypeId ? `Doc type: ${t.documentTypeId}` : "Any document" : "Fires on user click";
}
function Ya(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Re(), p = c === "failed" ? () => l(r) : void 0, u = `Trigger node, ${cr(n)}, state: ${c}`;
  return /* @__PURE__ */ e(
    ge,
    {
      icon: "▶",
      subtitle: cr(n),
      state: c,
      category: fe("trigger"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: Ka(n) }),
      selected: a,
      onRetry: p,
      ariaLabel: u,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: /* @__PURE__ */ e(
        L,
        {
          type: "source",
          position: B.Right,
          id: "out",
          className: F("data")
        }
      )
    }
  );
}
function Xa(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const n = t.split(`
`).slice(0, 2).join(" ").trim();
  return n.length > 120 ? `${n.slice(0, 117)}…` : n;
}
function Qa({ info: t }) {
  const [r, n] = S(!1), a = r ? t.response : t.response.length > 60 ? `${t.response.slice(0, 60)}…` : t.response, i = t.tokensIn != null || t.tokensOut != null;
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => n((s) => !s),
        className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-xs text-text-secondary font-medium text-left",
        children: [
          r ? "▾" : "▸",
          " Response",
          i && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: [
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
        className: r ? "mt-1 font-mono text-[11px] leading-[1.4] text-text-primary whitespace-pre-wrap break-words line-clamp-6" : "mt-1 font-mono text-[11px] leading-[1.4] text-text-primary whitespace-pre-wrap break-words max-h-[1.4em] overflow-hidden",
        children: a
      }
    )
  ] });
}
function Za(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = i?.llm, p = c === "running" && l?.streamOpened === !0 && (l?.tokensOut ?? 0) === 0, u = c === "running" && l !== void 0 && (l.tokensOut ?? 0) > 0, f = Re(), h = c === "failed" ? () => f(r) : void 0, g = /* @__PURE__ */ e("span", { className: "italic", children: Xa(n.userPromptTemplate) }), m = (l ? {
    response: l.response ?? "",
    tokensIn: l.tokensIn,
    tokensOut: l.tokensOut,
    streaming: u,
    streamOpening: p
  } : void 0) ?? n._llmResponse, N = m ? /* @__PURE__ */ e(Qa, { info: m }) : void 0, y = (n.systemPrompt ?? "").replace(/\s+/g, " ").trim(), v = y.length === 0 ? "no system prompt" : `system prompt: ${y.length > 60 ? `${y.slice(0, 60)}…` : y}`, w = `LLM node, ${n.model || n.provider}, ${v}, state: ${c}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "🧠",
      subtitle: n.model || n.provider,
      state: c,
      category: fe("llm"),
      body: g,
      footer: N,
      selected: a,
      onRetry: h,
      ariaLabel: w,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: `${F("text")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function ei(t) {
  if (!t) return "—";
  const r = t.replace(/\s+/g, " ").trim();
  return r.length > 60 ? `${r.slice(0, 60)}…` : r;
}
function ti(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Re(), p = c === "failed" ? () => l(r) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "✨",
      subtitle: n.transformType,
      state: c,
      category: fe("transform"),
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: ei(n.expression) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") })
      ]
    }
  );
}
function ni(t) {
  if (!t) return "—";
  const r = t.replace(/\s+/g, " ").trim();
  return r.length > 60 ? `${r.slice(0, 60)}…` : r;
}
function ri(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Re(), p = c === "failed" ? () => l(r) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "❓",
      subtitle: n.label || "condition",
      state: c,
      category: fe("condition"),
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: ni(n.expression) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "true", className: `${F("control")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "false", className: `${F("control")} !top-[60%]` })
      ]
    }
  );
}
function oi(t) {
  const r = t.config ?? {};
  switch (t.actionType) {
    case "update-document":
      return `Update ${typeof r.documentId == "string" ? r.documentId : "(current)"}`;
    case "post-comment":
      return `Comment on ${typeof r.target == "string" ? r.target : "(current doc)"}`;
    case "notify":
      return `Notify ${typeof r.channel == "string" ? r.channel : "recipients"}`;
    case "webhook":
      return `POST → ${typeof r.url == "string" ? r.url : "(no URL)"}`;
    case "mcp-tool":
      return `Invoke ${typeof r.tool == "string" ? r.tool : "(no tool)"}`;
    default:
      return "Action";
  }
}
function ai(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Re(), p = c === "failed" ? () => l(r) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⚡",
      subtitle: n.actionType,
      state: c,
      category: fe("action"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: oi(n) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function ii(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Re(), p = c === "failed" ? () => l(r) : void 0, u = Math.max(2, Math.min(8, n.branchCount ?? 2)), f = Array.from({ length: u }, (h, g) => {
    const x = n.branchLabels?.[g];
    return x && x.trim().length > 0 ? x : `branch ${g}`;
  });
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⑂",
      subtitle: `${u} branches`,
      state: c,
      category: fe("fork"),
      body: /* @__PURE__ */ e("ul", { className: "m-0 p-0 list-none flex flex-col gap-0.5 text-xs text-text-secondary", children: f.map((h, g) => /* @__PURE__ */ o("li", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: [
        "• ",
        h
      ] }, g)) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        f.map((h, g) => {
          const x = (g + 1) / (u + 1) * 100;
          return /* @__PURE__ */ e(
            L,
            {
              type: "source",
              position: B.Right,
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
function si(t) {
  return t.mode === "all" ? "all" : t.mode === "any" ? "any" : `${t.n ?? 1} of many`;
}
function li(t) {
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
function ci(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Re(), p = c === "failed" ? () => l(r) : void 0, u = Ia({ handleType: "target" }), f = Math.max(2, u.length + 1);
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⑃",
      subtitle: si(n),
      state: c,
      category: fe("join"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: li(n.mergeStrategy) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        Array.from({ length: f }, (h, g) => {
          const x = (g + 1) / (f + 1) * 100;
          return /* @__PURE__ */ e(
            L,
            {
              type: "target",
              position: B.Left,
              id: `in-${g}`,
              className: F("control"),
              style: { top: `${x}%` }
            },
            `in-${g}`
          );
        }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") })
      ]
    }
  );
}
function di(t) {
  return t.type === "role" ? `@${t.value}` : t.value;
}
function pi(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Re(), p = c === "failed" ? () => l(r) : void 0, u = n.approvers ?? [], f = u.length, h = n.requiredCount ?? 0, g = `${f} approver${f === 1 ? "" : "s"}, ${h}/${f} required`, x = u.slice(0, 2), m = Math.max(0, u.length - 2), N = u.length === 0 ? /* @__PURE__ */ e("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: [
    x.map((y, v) => /* @__PURE__ */ e(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: di(y)
      },
      v
    )),
    m > 0 && /* @__PURE__ */ o("span", { className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-inset text-text-tertiary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap", children: [
      "+",
      m,
      " more"
    ] })
  ] });
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "✋",
      subtitle: g,
      state: c,
      category: fe("approval"),
      body: N,
      selected: a,
      onRetry: p,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "approved", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "rejected", className: `${F("data")} !top-[60%]` })
      ]
    }
  );
}
function ui({ id: t, data: r, selected: n }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = Re(), c = r.agentName || r.agentId || "Not configured", l = `${r.protocol.toUpperCase()}${r.streaming ? " (streaming)" : ""}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "🤖",
      subtitle: c,
      state: s,
      category: fe("agent"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: n,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function mi({ id: t, data: r, selected: n }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = Re(), c = r.toolName || "Not configured";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "🔌",
      subtitle: c,
      state: s,
      category: fe("mcp-tool"),
      body: r.gatewayUrl ? /* @__PURE__ */ e("span", { className: "text-[11px]", children: r.gatewayUrl }) : void 0,
      selected: n,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function hi({ id: t, data: r, selected: n }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = Re(), c = r.knowledgeBaseId || "Not configured", l = `Top ${r.topK} chunks${r.scoreThreshold ? ` (≥${r.scoreThreshold})` : ""}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "📚",
      subtitle: c,
      state: s,
      category: fe("knowledge-base"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: n,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function fi({ id: t, data: r, selected: n }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = Re(), c = r.graphId || "Not configured", l = r.query.length > 40 ? `${r.query.slice(0, 37)}...` : r.query;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "🕸️",
      subtitle: c,
      state: s,
      category: fe("graph-query"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px] font-mono", children: l }),
      selected: n,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function gi({ id: t, data: r, selected: n }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = Re(), c = `${r.mode} ${r.scope}`, l = r.namespace ? `ns: ${r.namespace}` : "No namespace";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "💾",
      subtitle: c,
      state: s,
      category: fe("memory"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: n,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function xi({ id: t, data: r, selected: n }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = Re(), c = r.label || r.guardrailId || "Not configured";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "🛡️",
      subtitle: c,
      state: s,
      category: fe("guardrail"),
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        "Action: ",
        r.action
      ] }),
      selected: n,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "pass", className: `${F("control")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "block", className: `${F("control")} !top-[60%]` })
      ]
    }
  );
}
function bi({ id: t, data: r, selected: n }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = Re(), c = r.label || r.action || "Not configured";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "📜",
      subtitle: c,
      state: s,
      category: fe("policy"),
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        r.principal,
        " → ",
        r.resource
      ] }),
      selected: n,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "allow", className: `${F("control")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "deny", className: `${F("control")} !top-[60%]` })
      ]
    }
  );
}
function yi({ id: t, data: r, selected: n }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = r.eventType === "CUSTOM" ? r.customEventName || "Custom" : r.eventType;
  return /* @__PURE__ */ e(
    ge,
    {
      icon: "📡",
      subtitle: d,
      state: s,
      category: fe("ag-ui-output"),
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        "Source: ",
        r.sourceField
      ] }),
      footer: /* @__PURE__ */ e("span", { className: "text-[10px] text-[#6366f1]", children: "Terminal — streams to AG-UI frontend" }),
      selected: n,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") })
    }
  );
}
const vi = (t) => t.stopPropagation();
function Ni(t) {
  const { id: r, data: n, selected: a } = t, [i, s] = S(!1), d = me(r), c = d?.status === "cancelled" ? "failed" : d?.status, p = (n._state && n._state !== "idle" ? n._state : void 0) ?? c ?? n._state ?? "idle", u = $e(), h = d?.images?.[0]?.imageId ?? d?.output?.imageId ?? n.imageId, g = h ? /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "aria-label": "View source image",
        className: I(
          "block w-full rounded border-none bg-transparent p-0 cursor-zoom-in",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
        ),
        onMouseDown: vi,
        onClick: (m) => {
          m.stopPropagation(), s(!0);
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
      yt,
      {
        images: [{ src: u(h), alt: "Source image" }],
        openIndex: i ? 0 : null,
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
    ge,
    {
      icon: "🖼",
      subtitle: "image-source",
      state: p,
      category: fe("image-source"),
      body: g,
      footer: x,
      selected: a,
      ariaLabel: `Image Source node, state: ${p}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(
          L,
          {
            type: "target",
            position: B.Left,
            id: "in",
            className: F("control")
          }
        ),
        /* @__PURE__ */ e(
          L,
          {
            type: "source",
            position: B.Right,
            id: "out",
            className: F("image")
          }
        )
      ]
    }
  );
}
const dr = (t) => t.stopPropagation(), pr = I(
  "h-[38px] w-[38px] shrink-0 overflow-hidden rounded border border-border bg-surface-inset",
  "p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
);
function ln({
  images: t,
  max: r = 4,
  "data-testid": n = "node-thumb-strip"
}) {
  const a = $e(), [i, s] = S(null);
  if (t.length === 0) return null;
  const d = t.length > r, c = d ? t.slice(0, r - 1) : t, l = t.length - c.length, p = (u) => (f) => {
    f.stopPropagation(), s(u);
  };
  return /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ o("div", { "data-testid": n, className: "flex flex-row items-center gap-1", children: [
      c.map((u, f) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          "data-testid": `${n}-thumb-${f}`,
          "aria-label": u.alt ?? `Result image ${f + 1} of ${t.length}`,
          className: pr,
          onMouseDown: dr,
          onClick: p(f),
          children: /* @__PURE__ */ e(
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
          "data-testid": `${n}-overflow`,
          "aria-label": `Show all ${t.length} images`,
          className: I(
            pr,
            "flex items-center justify-center font-mono text-[11px] font-medium text-text-secondary"
          ),
          onMouseDown: dr,
          onClick: p(c.length),
          children: [
            "+",
            l
          ]
        }
      )
    ] }),
    /* @__PURE__ */ e(
      yt,
      {
        images: t.map((u) => ({
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
function wi(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = i?.images ?? [], u = i?.output?.filename ?? null, f = l.length > 0 ? /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ e(ln, { images: l, "data-testid": "save-thumb-strip" }),
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
  ), h = n.filenameTemplate ?? "crop-{{scatter.index}}.png", g = h.length > 28 ? `${h.slice(0, 25)}…` : h, x = /* @__PURE__ */ e(
    "span",
    {
      className: "font-mono text-[11px] text-[#6b7280]",
      "data-testid": "save-footer",
      title: h,
      children: g
    }
  ), m = "image:save", N = `Save node, template: ${h}, state: ${c}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⬇",
      subtitle: m,
      state: c,
      category: fe("image:save"),
      body: f,
      footer: x,
      selected: a,
      ariaLabel: N,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(
          L,
          {
            type: "target",
            position: B.Left,
            id: "in",
            className: F("image")
          }
        ),
        /* @__PURE__ */ e(
          L,
          {
            type: "source",
            position: B.Right,
            id: "out",
            className: F("image")
          }
        ),
        /* @__PURE__ */ e(
          L,
          {
            type: "source",
            position: B.Right,
            id: "error",
            className: `${F("error")} !top-[75%]`
          }
        )
      ]
    }
  );
}
function ki(t) {
  return t ? t.length > 40 ? `${t.slice(0, 37)}…` : t : "Not configured";
}
function Ci(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = i?.output, p = Array.isArray(l?.items) ? l.items.length : null, u = /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary break-all", children: ki(n.itemsPath ?? "") }),
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
  ] }) : void 0, g = n.itemAlias ? ` · alias: ${n.itemAlias}` : "", x = n.maxConcurrency ? ` · max ${n.maxConcurrency}` : "", m = `scatter${g}${x}`, N = `Scatter node, path: ${n.itemsPath ?? "not set"}, state: ${c}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⑂",
      subtitle: m,
      state: c,
      category: fe("scatter"),
      body: u,
      footer: h,
      selected: a,
      ariaLabel: N,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("control") })
      ]
    }
  );
}
function Ii(t) {
  const { id: r, data: n, selected: a } = t, i = $e(), s = me(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.width != null && n.height != null ? `→ ${n.width}×${n.height}` : n.width != null ? `→ ${n.width}w` : n.height != null ? `→ ${n.height}h` : null, f = p ? /* @__PURE__ */ e(
    "img",
    {
      src: i(p.imageId),
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
    n.fit ? ` · ${n.fit}` : ""
  ] }) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⥂",
      subtitle: "image:resize",
      state: l,
      category: fe("image:resize"),
      body: f,
      footer: h,
      selected: a,
      ariaLabel: `Resize node, state: ${l}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Si(t) {
  switch (t.op) {
    case "rotate":
      return `rotate ${t.degrees}°`;
    case "flip":
      return "flip ↕";
    case "flop":
      return "flop ↔";
  }
}
function $i(t) {
  const { id: r, data: n, selected: a } = t, i = $e(), s = me(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.operations ?? [], f = u.length > 0 ? u.map(Si).join("  ›  ") : null, h = p ? /* @__PURE__ */ e(
    "img",
    {
      src: i(p.imageId),
      alt: "Transform output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "transform-geo-output-thumb"
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "transform-geo-placeholder",
      children: f ?? "No ops configured"
    }
  ), g = f ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-tertiary", children: f }) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "↻",
      subtitle: "image:transform",
      state: l,
      category: fe("image:transform"),
      body: h,
      footer: g,
      selected: a,
      ariaLabel: `Transform node, ops: ${u.length}, state: ${l}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ti(t) {
  const r = t.format?.toUpperCase() ?? "?", n = t.lossless ? "lossless" : t.quality != null ? `q${t.quality}` : "";
  return n ? `${r} ${n}` : r;
}
function Ai(t) {
  const { id: r, data: n, selected: a } = t, i = $e(), s = me(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.format ? Ti(n) : null, f = p ? /* @__PURE__ */ e(
    "img",
    {
      src: i(p.imageId),
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
    ge,
    {
      icon: "⇌",
      subtitle: "image:format-convert",
      state: l,
      category: fe("image:format-convert"),
      body: f,
      footer: h,
      selected: a,
      ariaLabel: `Format Convert node, format: ${n.format ?? "unset"}, state: ${l}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ri(t) {
  const { id: r, data: n, selected: a } = t, i = $e(), s = me(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.sigma != null ? `σ ${n.sigma}` : null, f = p ? /* @__PURE__ */ e(
    "img",
    {
      src: i(p.imageId),
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
    ge,
    {
      icon: "◈",
      subtitle: "image:sharpen",
      state: l,
      category: fe("image:sharpen"),
      body: f,
      footer: h,
      selected: a,
      ariaLabel: `Sharpen node, sigma: ${n.sigma ?? "default"}, state: ${l}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Pi(t) {
  const { id: r, data: n, selected: a } = t, i = $e(), s = me(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.gravity ?? "southeast", f = n.opacity != null ? `${Math.round(n.opacity * 100)}%` : "100%", h = p ? /* @__PURE__ */ e(
    "img",
    {
      src: i(p.imageId),
      alt: "Watermark output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "watermark-output-thumb"
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
      "data-testid": "watermark-placeholder",
      children: n.overlayImageId ? `${u} · ${f}` : "No overlay image set"
    }
  ), g = n.overlayImageId ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    u,
    " · ",
    f
  ] }) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⊕",
      subtitle: "image:watermark",
      state: l,
      category: fe("image:watermark"),
      body: h,
      footer: g,
      selected: a,
      ariaLabel: `Watermark node, gravity: ${u}, state: ${l}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Mi(t) {
  if (!t) return null;
  const r = t.x + t.width, n = t.y + t.height;
  return `[${t.x},${t.y} → ${r},${n}]`;
}
function Ei(t) {
  const { id: r, data: n, selected: a } = t, i = $e(), s = me(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = s?.output, f = Mi(p?.bbox ?? u?.bbox), h = p ? /* @__PURE__ */ e(
    "img",
    {
      src: i(p.imageId),
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
  ), g = f ? /* @__PURE__ */ e(
    "span",
    {
      className: "font-mono text-[11px] text-text-tertiary",
      "data-testid": "crop-bbox-coords",
      children: f
    }
  ) : void 0, x = `Crop node, source: ${n.sourceImagePath ?? "default"}, state: ${l}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "✂",
      subtitle: "image:crop",
      state: l,
      category: fe("image:crop"),
      body: h,
      footer: g,
      selected: a,
      ariaLabel: x,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") })
      ]
    }
  );
}
function Di(t) {
  const { id: r, data: n, selected: a } = t, i = $e(), s = me(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e("div", { className: "flex gap-1 w-full", children: /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
    /* @__PURE__ */ e(
      "img",
      {
        src: i(p.imageId),
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
  ), f = n.algorithm ?? "luminosity", h = n.contrast ?? 1, g = /* @__PURE__ */ o(
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
    ge,
    {
      icon: "◐",
      subtitle: "image:adjust-bw",
      state: l,
      category: fe("image:adjust-bw"),
      body: u,
      footer: g,
      selected: a,
      ariaLabel: x,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !top-[75%]` })
      ]
    }
  );
}
function Oi(t) {
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
function _i(t) {
  const { id: r, data: n, selected: a } = t, i = $e(), s = me(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.layers ?? [], f = p ? /* @__PURE__ */ e(
    "img",
    {
      src: i(p.imageId),
      alt: "Adjust output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "adjust-layer-output-thumb"
    }
  ) : u.length > 0 ? /* @__PURE__ */ e(
    "div",
    {
      className: "w-full rounded border border-dashed border-border bg-surface-inset p-1.5 flex flex-wrap gap-1 min-h-8",
      "data-testid": "adjust-layer-chips",
      children: u.map((x, m) => /* @__PURE__ */ e(
        "span",
        {
          className: "text-[10px] font-mono bg-surface-hover border border-border text-text-secondary rounded px-1 py-0.5",
          children: Oi(x)
        },
        m
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
    ge,
    {
      icon: "𝍩",
      subtitle: "image:adjust-layer",
      state: l,
      category: fe("image:adjust-layer"),
      body: f,
      footer: h,
      selected: a,
      ariaLabel: g,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !top-[75%]` })
      ]
    }
  );
}
function Li(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = i?.output ?? void 0, p = l?.genWidth != null && l?.genHeight != null ? `${l.genWidth}×${l.genHeight}` : null, u = p ? /* @__PURE__ */ o(
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
  ), f = /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "maxEdge ",
    n.maxEdge ?? 1024
  ] });
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "📐",
      subtitle: "image:dimensions",
      state: c,
      category: fe("image:dimensions"),
      body: u,
      footer: f,
      selected: a,
      ariaLabel: `Dimensions node, state: ${c}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Bi(t) {
  const { id: r, data: n, selected: a } = t, i = $e(), s = me(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = `≤ ${n.maxEdge ?? 1024}px → 4×`, f = p ? /* @__PURE__ */ e(
    "img",
    {
      src: i(p.imageId),
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
    ge,
    {
      icon: "⤢",
      subtitle: "image:upscale",
      state: l,
      category: fe("image:upscale"),
      body: f,
      footer: h,
      selected: a,
      ariaLabel: `Upscale node, state: ${l}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ui(t) {
  return t === 0 ? "$0" : t < 1e-3 ? "<$0.001" : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Fi(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const n = t.split(`
`).slice(0, 2).join(" ").trim();
  return n.length > 120 ? `${n.slice(0, 117)}…` : n;
}
const ji = (t) => t.stopPropagation(), zi = oa(function({ info: r }) {
  const [n, a] = S(!1), [i, s] = S(!1);
  if (r.failure) {
    const u = r.failure.reason === "refusal";
    return /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("output", { "aria-live": "polite", className: "sr-only", children: u ? "Content policy refusal" : `Failure: ${r.failure.reason}` }),
      /* @__PURE__ */ o("div", { className: "flex items-start gap-1", children: [
        /* @__PURE__ */ e("span", { className: "bg-transparent border-none p-0 text-[12px] text-danger-fg font-medium text-left", children: u ? "✕ Content policy refusal" : `✕ ${r.failure.reason}` }),
        r.onRetry && /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: r.onRetry,
            className: "ml-2 bg-transparent border border-border-emphasis rounded px-1.5 py-0.5 text-[11px] cursor-pointer text-text-secondary",
            title: "Retry this step",
            children: "Retry ↺"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-1 font-mono text-[11px] leading-snug text-text-secondary", children: r.failure.error })
    ] });
  }
  const d = r.tokensIn != null || r.tokensOut != null, c = !r.streaming && !r.awaiting && r.response.length > 0, l = n ? r.response : r.response.length > 60 ? `${r.response.slice(0, 60)}…` : r.response, p = r.awaiting ? "Vision: waiting for first token" : r.streaming ? "Vision: streaming response" : c ? "Vision: completed" : "";
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ e("output", { "aria-live": "polite", className: "sr-only", children: p }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => a((u) => !u),
        className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] text-text-secondary font-medium text-left",
        children: [
          n ? "▾" : "▸",
          " ",
          r.streaming ? "Streaming" : "Response",
          typeof r.costUsd == "number" && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", "data-testid": "vision-cost", title: "Cost based on model usage rate", children: [
            "· ",
            Ui(r.costUsd)
          ] }),
          d && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: [
            "· ",
            r.tokensIn ?? 0,
            " → ",
            r.tokensOut ?? 0,
            " tokens"
          ] }),
          r.awaiting && /* @__PURE__ */ e("span", { className: "ml-1.5 text-[11px] text-info-fg", "data-testid": "vision-awaiting", children: "· waiting…" }),
          r.streaming && !r.awaiting && /* @__PURE__ */ e("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: "· streaming…" })
        ]
      }
    ),
    c && r.imageId && /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: () => window.dispatchEvent(new CustomEvent("pipeline:open-run-modal")),
        className: "mt-1 block bg-transparent border-none p-0 cursor-pointer text-[11px] text-primary underline font-inherit",
        children: "Run with new image →"
      }
    ),
    r.imageId && /* @__PURE__ */ o(G, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          "aria-label": "View vision input image",
          className: I(
            "mt-1.5 block h-14 w-14 overflow-hidden rounded border border-border bg-surface-inset",
            "p-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
          ),
          onMouseDown: ji,
          onClick: (u) => {
            u.stopPropagation(), s(!0);
          },
          children: /* @__PURE__ */ e(
            "img",
            {
              src: r.getImageUrl(r.imageId),
              alt: "Vision input",
              className: "h-full w-full object-cover",
              "data-testid": "vision-input-thumb"
            }
          )
        }
      ),
      /* @__PURE__ */ e(
        yt,
        {
          images: [{ src: r.getImageUrl(r.imageId), alt: "Vision input", caption: "Vision input" }],
          openIndex: i ? 0 : null,
          onClose: () => s(!1)
        }
      )
    ] }),
    /* @__PURE__ */ e(
      "div",
      {
        className: I(
          "mt-1 overflow-hidden font-mono text-[11px] leading-snug text-text-primary whitespace-pre-wrap break-words",
          n ? "max-h-none" : "max-h-[1.4em]"
        ),
        children: l
      }
    )
  ] });
});
function qi(t) {
  const { id: r, data: n, selected: a } = t, i = $e(), s = me(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = Re(), u = l === "failed" ? () => p(r) : void 0, f = /* @__PURE__ */ e("span", { className: "italic text-text-secondary text-[13px]", children: Fi(n.userPrompt) }), h = s?.vision, g = l === "running" && h !== void 0 && h.tokensSeen > 0 && !h.analyzed, x = l === "running" && h !== void 0 && h.tokensSeen === 0 && !h.failure, m = h ? {
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
  } : void 0, N = m ? /* @__PURE__ */ e(zi, { info: m }) : void 0, y = n.model || "claude-sonnet-4-6", v = n.outputSchema ? "extract" : "caption", w = `Vision node, model ${y}, mode ${v}, state: ${l}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "📷",
      subtitle: `${y} · ${v}`,
      state: l,
      category: fe("image:vision-analyze"),
      body: f,
      footer: N,
      selected: a,
      onRetry: u,
      ariaLabel: w,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") })
      ]
    }
  );
}
function Vi(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = i?.output, p = l?.extracted?.label, u = l?.extracted?.confidence, f = (n.labels ?? []).slice(0, 4).join(", "), h = p ? /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 py-0.5", children: [
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
  ] }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: f ? `Labels: ${f}` : "No labels configured" }), g = n.model ?? "claude-haiku-4-5";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "🏷",
      subtitle: g,
      state: c,
      category: fe("image:vision-classify"),
      body: h,
      selected: a,
      ariaLabel: `Vision Classify node, model: ${g}, state: ${c}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Wi(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", p = i?.output?.extracted?.caption, u = p ? p.length > 80 ? `${p.slice(0, 77)}…` : p : null, f = n.userPrompt ? n.userPrompt.length > 60 ? `${n.userPrompt.slice(0, 57)}…` : n.userPrompt : "No prompt set", h = u ? /* @__PURE__ */ e(
    "span",
    {
      className: "text-[11px] text-text-primary leading-snug",
      "data-testid": "describe-caption",
      children: u
    }
  ) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: f }), g = n.model ?? "claude-haiku-4-5";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "💬",
      subtitle: g,
      state: c,
      category: fe("image:vision-describe"),
      body: h,
      selected: a,
      ariaLabel: `Vision Describe node, model: ${g}, state: ${c}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ji(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", u = (i?.output?.extracted?.tags ?? []).slice(0, 5), f = (n.candidateTags ?? []).slice(0, 3).join(", "), h = u.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", "data-testid": "tag-pills", children: u.map((x) => /* @__PURE__ */ e(
    "span",
    {
      className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded-full px-1.5 py-0.5 text-text-secondary whitespace-nowrap",
      children: x
    },
    x
  )) }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: f ? `Candidates: ${f}…` : "Open-vocabulary tagging" }), g = n.model ?? "claude-haiku-4-5";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "🔖",
      subtitle: g,
      state: c,
      category: fe("image:vision-tag"),
      body: h,
      selected: a,
      ariaLabel: `Vision Tag node, model: ${g}, state: ${c}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Hi(t) {
  const { id: r, data: n, selected: a } = t, i = me(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", p = i?.output?.extracted?.lines ?? [], u = p[0], f = p.length > 0 ? /* @__PURE__ */ o("div", { "data-testid": "extract-text-result", children: [
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
  ] }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: "Awaiting OCR" }), h = n.model ?? "claude-sonnet-4-6";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "📝",
      subtitle: h,
      state: c,
      category: fe("image:vision-extract-text"),
      body: f,
      selected: a,
      ariaLabel: `Vision Extract Text node, model: ${h}, state: ${c}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Gi(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
const Ki = (t) => t.stopPropagation();
function Yi(t) {
  const { id: r, data: n, selected: a } = t, i = $e(), [s, d] = S(!1), c = me(r), l = c?.status === "cancelled" ? "failed" : c?.status, u = (n._state && n._state !== "idle" ? n._state : void 0) ?? l ?? n._state ?? "idle", f = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && f.length === 0, x = (n.numImages ?? 1) > 1 || f.length > 1;
  let m;
  if (f.length > 0 && x)
    m = /* @__PURE__ */ e(ln, { images: f, "data-testid": "generate-thumb-strip" });
  else if (g || f.length === 1) {
    const w = f[0] ? i(f[0].imageId) : void 0;
    m = /* @__PURE__ */ o(G, { children: [
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
          onMouseDown: Ki,
          onClick: (b) => {
            b.stopPropagation(), w && d(!0);
          },
          children: /* @__PURE__ */ e(
            Jn,
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
        yt,
        {
          images: [{ src: w, alt: "Generate output" }],
          openIndex: s ? 0 : null,
          onClose: () => d(!1)
        }
      )
    ] });
  } else
    m = /* @__PURE__ */ e(
      "div",
      {
        className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
        "data-testid": "generate-placeholder",
        children: Gi(n.prompt)
      }
    );
  const N = (n.numImages ?? 1) > 1 ? `×${n.numImages}` : null, y = n.width && n.height ? `${n.width}×${n.height}` : null, v = N || y ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-tertiary", children: [y, N].filter(Boolean).join(" · ") }) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "✦",
      subtitle: "image:generate",
      state: u,
      category: fe("image:generate"),
      body: m,
      footer: v,
      selected: a,
      ariaLabel: `Generate node, state: ${u}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
const Xi = (t) => t.stopPropagation();
function Qi(t) {
  const { id: r, data: n, selected: a } = t, i = $e(), [s, d] = S(!1), c = me(r), l = c?.status === "cancelled" ? "failed" : c?.status, u = (n._state && n._state !== "idle" ? n._state : void 0) ?? l ?? n._state ?? "idle", f = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && f.length === 0, x = n.numVariations ?? 1, m = x > 1 || f.length > 1, N = /* @__PURE__ */ o("span", { className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary mb-1", children: [
    "×",
    x,
    " variation",
    x !== 1 ? "s" : ""
  ] });
  let y;
  if (f.length > 0 && m)
    y = /* @__PURE__ */ e(ln, { images: f, "data-testid": "variation-thumb-strip" });
  else if (g || f.length === 1) {
    const b = f[0] ? i(f[0].imageId) : void 0;
    y = /* @__PURE__ */ o(G, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          "data-testid": "variation-output-preview",
          "aria-label": b ? "View variation image" : "Image synthesizing",
          className: I(
            "block w-full rounded-md border-none bg-transparent p-0",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-info",
            b ? "cursor-zoom-in" : "cursor-default"
          ),
          onMouseDown: Xi,
          onClick: (k) => {
            k.stopPropagation(), b && d(!0);
          },
          children: /* @__PURE__ */ e(
            Jn,
            {
              status: g ? "synthesizing" : "done",
              ...b ? { src: b } : {},
              alt: "Variation output",
              ...g && Number.isFinite(h) ? { startedAt: h } : {},
              className: "w-full h-20"
            }
          )
        }
      ),
      b && /* @__PURE__ */ e(
        yt,
        {
          images: [{ src: b, alt: "Variation output" }],
          openIndex: s ? 0 : null,
          onClose: () => d(!1)
        }
      )
    ] });
  } else
    y = /* @__PURE__ */ e(
      "div",
      {
        className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
        "data-testid": "variation-placeholder",
        children: "Awaiting input"
      }
    );
  const v = /* @__PURE__ */ o("div", { children: [
    N,
    y
  ] }), w = n.similarity != null ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "similarity ",
    n.similarity
  ] }) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⊞",
      subtitle: "image:variation",
      state: u,
      category: fe("image:variation"),
      body: v,
      footer: w,
      selected: a,
      ariaLabel: `Variation node, ${x} variations, state: ${u}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Zi(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
const es = (t) => t.stopPropagation();
function ts(t) {
  const { id: r, data: n, selected: a } = t, i = $e(), [s, d] = S(!1), c = me(r), l = c?.status === "cancelled" ? "failed" : c?.status, u = (n._state && n._state !== "idle" ? n._state : void 0) ?? l ?? n._state ?? "idle", f = c?.images ?? [], h = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && f.length === 0, x = f.length > 1;
  let m;
  if (x)
    m = /* @__PURE__ */ e(ln, { images: f, "data-testid": "edit-prompt-thumb-strip" });
  else if (g || f.length === 1) {
    const y = f[0] ? i(f[0].imageId) : void 0;
    m = /* @__PURE__ */ o(G, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          "data-testid": "edit-prompt-output-preview",
          "aria-label": y ? "View edited image" : "Image synthesizing",
          className: I(
            "block w-full rounded-md border-none bg-transparent p-0",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-info",
            y ? "cursor-zoom-in" : "cursor-default"
          ),
          onMouseDown: es,
          onClick: (v) => {
            v.stopPropagation(), y && d(!0);
          },
          children: /* @__PURE__ */ e(
            Jn,
            {
              status: g ? "synthesizing" : "done",
              ...y ? { src: y } : {},
              alt: "Edit output",
              ...g && Number.isFinite(h) ? { startedAt: h } : {},
              className: "w-full h-20"
            }
          )
        }
      ),
      y && /* @__PURE__ */ e(
        yt,
        {
          images: [{ src: y, alt: "Edit output" }],
          openIndex: s ? 0 : null,
          onClose: () => d(!1)
        }
      )
    ] });
  } else
    m = /* @__PURE__ */ e(
      "div",
      {
        className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
        "data-testid": "edit-prompt-placeholder",
        children: Zi(n.prompt)
      }
    );
  const N = n.maskImagePath ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "mask: ",
    n.maskImagePath
  ] }) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "✎",
      subtitle: "image:edit-prompt",
      state: u,
      category: fe("image:edit-prompt"),
      body: m,
      footer: N,
      selected: a,
      ariaLabel: `Edit Prompt node, state: ${u}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
const ns = {
  trigger: Ya,
  llm: Za,
  transform: ti,
  condition: ri,
  action: ai,
  fork: ii,
  join: ci,
  approval: pi,
  agent: ui,
  "mcp-tool": mi,
  "knowledge-base": hi,
  "graph-query": fi,
  memory: gi,
  guardrail: xi,
  policy: bi,
  "ag-ui-output": yi,
  "image-source": Ni,
  "image:save": wi,
  scatter: Ci,
  "image:resize": Ii,
  "image:transform": $i,
  "image:format-convert": Ai,
  "image:sharpen": Ri,
  "image:watermark": Pi,
  "image:crop": Ei,
  "image:adjust-bw": Di,
  "image:adjust-layer": _i,
  "image:dimensions": Li,
  "image:upscale": Bi,
  "image:vision-analyze": qi,
  "image:vision-classify": Vi,
  "image:vision-describe": Wi,
  "image:vision-tag": Ji,
  "image:vision-extract-text": Hi,
  "image:generate": Yi,
  "image:variation": Qi,
  "image:edit-prompt": ts
}, rs = "#c4b5fd";
function os(t) {
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
function as({
  id: t,
  sourceX: r,
  sourceY: n,
  targetX: a,
  targetY: i,
  sourcePosition: s,
  targetPosition: d,
  data: c,
  markerEnd: l,
  selected: p
}) {
  const u = c ?? {}, f = Gn(), [h, g, x] = Sa({
    sourceX: r,
    sourceY: n,
    targetX: a,
    targetY: i,
    sourcePosition: s,
    targetPosition: d
  }), m = os(u.state), N = (u.state ?? "default") === "default", y = u.payload, v = m.animate && !f;
  let w = m.stroke, b = m.strokeWidth, k = v ? m.strokeDasharray : void 0;
  y === "image" ? (b = 2.5, N && (w = rs)) : y === "control" && (b = 1.5, N && (k = "2 4"));
  const C = u.volume, T = typeof C == "number" && C >= 2;
  T && (b = Math.min(4, b + Math.log2(C)));
  const $ = p ? "#646cff" : w, R = p ? Math.max(2.5, b) : b, E = y === "image" && u.state === "active" && !f;
  return /* @__PURE__ */ o(G, { children: [
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
        stroke: $,
        strokeWidth: R,
        strokeDasharray: k,
        markerEnd: l,
        className: "pointer-events-none",
        children: v ? /* @__PURE__ */ e(
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
    E ? /* @__PURE__ */ e("circle", { r: 3, fill: $, className: "pointer-events-none", children: /* @__PURE__ */ e("animateMotion", { dur: "1.2s", repeatCount: "indefinite", path: h }) }) : null,
    u.label ? /* @__PURE__ */ e(lr, { children: /* @__PURE__ */ e(
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
          transform: `translate(-50%, -50%) translate(${r + 28}px, ${n}px)`
        },
        children: u.label
      }
    ) }) : null,
    T ? /* @__PURE__ */ e(lr, { children: /* @__PURE__ */ e(
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
function ft(t, r, n) {
  const a = le(r);
  a.current = r, ne(() => {
    if (n === !1) return;
    const i = (s) => {
      t.current && !t.current.contains(s.target) && a.current();
    };
    return document.addEventListener("mousedown", i), () => document.removeEventListener("mousedown", i);
  }, [t, n]);
}
const is = [
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
function ss(t, r) {
  if (!r) return !0;
  const n = r.toLowerCase();
  return t.type.toLowerCase().includes(n) || t.name.toLowerCase().includes(n) || t.description.toLowerCase().includes(n);
}
function ls({
  anchor: t,
  flowPosition: r,
  disabledTypes: n = [],
  onClose: a,
  onInsert: i
}) {
  const [s, d] = S(""), [c, l] = S(0), p = le(null), u = le(null), f = q(() => new Set(n), [n]), h = q(
    () => is.filter((m) => !f.has(m.type) && ss(m, s)),
    [f, s]
  );
  if (ne(() => {
    l((m) => m >= h.length ? 0 : m);
  }, [h.length]), ne(() => {
    if (t) {
      const m = setTimeout(() => u.current?.focus(), 0);
      return () => clearTimeout(m);
    }
  }, [t]), ft(p, a, !!t), !t) return null;
  const g = (m) => {
    const N = h[m];
    !N || !r || (i(N.type, r), a());
  }, x = (m) => {
    if (m.key === "ArrowDown") {
      if (m.preventDefault(), h.length === 0) return;
      l((N) => (N + 1) % h.length);
    } else if (m.key === "ArrowUp") {
      if (m.preventDefault(), h.length === 0) return;
      l((N) => (N - 1 + h.length) % h.length);
    } else m.key === "Enter" ? (m.preventDefault(), g(c)) : m.key === "Escape" && (m.preventDefault(), a());
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
            onChange: (m) => d(m.target.value),
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
        ] }) : h.map((m, N) => {
          const y = N === c;
          return /* @__PURE__ */ o(
            "div",
            {
              role: "option",
              "aria-selected": y,
              onMouseEnter: () => l(N),
              onMouseDown: (v) => {
                v.preventDefault(), g(N);
              },
              className: I(
                "flex items-center gap-2.5 px-3 py-2 cursor-pointer font-inherit",
                y ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              "data-node-type": m.type,
              "data-testid": `quick-insert-row-${m.type}`,
              children: [
                /* @__PURE__ */ e("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: m.icon }),
                /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-[#0f172a]", children: m.name }),
                  /* @__PURE__ */ e("div", { className: "text-[11px] text-[#475569] whitespace-nowrap overflow-hidden text-ellipsis", children: m.description })
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
function cs({
  addNode: t,
  addEdge: r,
  updateNodeData: n,
  getDefinition: a
}) {
  ne(() => {
  }, [t, r, n, a]);
}
function ds({
  definition: t,
  selectedNodeId: r,
  setSelectedNodeId: n,
  removeNode: a,
  removeDefEdge: i,
  setNodes: s,
  setEdges: d,
  setPositions: c,
  duplicateNodes: l,
  clipboardRef: p,
  containerRef: u
}) {
  ne(() => {
    const f = u.current;
    if (!f) return;
    const h = (x) => {
      const m = f.querySelector(
        `.react-flow__node[data-id="${CSS.escape(x)}"]`
      );
      return m ? ((m.querySelector('[data-pipeline-node="true"]') ?? m).focus(), !0) : !1;
    }, g = (x) => {
      if (Zn(x.target)) return;
      const m = document.activeElement, N = !!m && f.contains(m);
      if (x.key === "Tab") {
        if (!N || !t || t.nodes.length === 0) return;
        const y = Ps(t);
        if (y.length === 0) return;
        const w = m?.closest(".react-flow__node")?.getAttribute("data-id") ?? null, b = w !== null ? y.indexOf(w) : -1, k = x.shiftKey ? -1 : 1, C = b === -1 ? x.shiftKey ? y.length - 1 : 0 : (b + k + y.length) % y.length, T = y[C];
        h(T) && x.preventDefault();
        return;
      }
      if (N && !x.altKey) {
        if (x.key === "Enter" || x.key === " " || x.key === "Spacebar") {
          const v = m?.closest(".react-flow__node")?.getAttribute("data-id");
          v && (x.preventDefault(), n(v));
          return;
        }
        if (x.key === "Delete" || x.key === "Backspace") {
          if (r) {
            x.preventDefault(), a(r);
            return;
          }
          d((y) => {
            const v = y.filter((w) => w.selected);
            if (v.length === 0) return y;
            for (const w of v) i(w.id);
            return y.filter((w) => !w.selected);
          }), x.preventDefault();
          return;
        }
        if (x.key === "Escape") {
          x.preventDefault(), n(null);
          return;
        }
        if ((x.metaKey || x.ctrlKey) && x.key === "c" && r) {
          x.preventDefault(), p.current = r;
          return;
        }
        if ((x.metaKey || x.ctrlKey) && x.key === "v" && p.current) {
          x.preventDefault();
          const y = l([p.current]);
          y.length > 0 && n(y[0]);
          return;
        }
        if ((x.metaKey || x.ctrlKey) && x.key === "d" && r) {
          x.preventDefault();
          const y = l([r]);
          y.length > 0 && n(y[0]);
          return;
        }
        if (x.key === "ArrowUp" || x.key === "ArrowDown" || x.key === "ArrowLeft" || x.key === "ArrowRight") {
          if (x.preventDefault(), x.stopPropagation(), !x.shiftKey || !r) return;
          const y = 8, v = x.key === "ArrowLeft" ? -y : x.key === "ArrowRight" ? y : 0, w = x.key === "ArrowUp" ? -y : x.key === "ArrowDown" ? y : 0;
          s((b) => {
            const k = b.map(
              (T) => T.id === r ? {
                ...T,
                position: {
                  x: T.position.x + v,
                  y: T.position.y + w
                }
              } : T
            ), C = k.find((T) => T.id === r);
            return C && c([{ id: C.id, position: C.position }]), k;
          });
        }
      }
    };
    return f.addEventListener("keydown", g), () => f.removeEventListener("keydown", g);
  }, [t, r, n, a, i, s, d, c, l, p, u]);
}
function ps({
  addNode: t,
  screenToFlowPosition: r
}) {
  const n = D((i) => {
    i.preventDefault(), i.dataTransfer.dropEffect = "move";
  }, []), a = D(
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
      const l = r({
        x: i.clientX,
        y: i.clientY
      });
      t(c, l);
    },
    [t, r]
  );
  return { handleDragOver: n, handleDrop: a };
}
function us({
  nodeMenu: t,
  breakpoints: r,
  showBreakpointOption: n,
  onFilterLog: a,
  onCopyNodeId: i,
  onDuplicate: s,
  onToggleBreakpoint: d,
  onDismiss: c
}) {
  ne(() => {
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
      style: { top: t.y, left: t.x },
      children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: a,
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
            onClick: i,
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
        n ? /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: d,
            "data-testid": "ctx-toggle-breakpoint",
            className: I(
              l,
              r?.has(t.nodeId) ? "text-[#dc2626]" : "text-[#0f172a]"
            ),
            children: r?.has(t.nodeId) ? "🔴 Remove Breakpoint" : "🔴 Toggle Breakpoint"
          }
        ) : null
      ]
    }
  );
}
const ms = [
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
], hs = [
  { key: "source", name: "Sources" },
  { key: "transform", name: "Transform" },
  { key: "ai", name: "AI" },
  { key: "control", name: "Control" },
  { key: "sink", name: "Sinks" },
  { key: "human", name: "Human" }
], un = {
  source: "bg-cat-source",
  transform: "bg-cat-transform",
  ai: "bg-cat-ai",
  control: "bg-cat-control",
  sink: "bg-cat-sink",
  human: "bg-cat-human"
}, Et = hs.map(({ key: t, name: r }) => ({
  key: t,
  name: r,
  items: ms.filter((n) => fe(n.type) === t).map((n) => ({ ...n, category: r, nodeCategory: t }))
})).filter((t) => t.items.length > 0), fs = Et.flatMap((t) => t.items.map((r) => ({ type: r.type, name: r.name }))), gs = Et.map((t) => t.name), Qn = "pipeline.palette.recents", xs = 5, ur = "pipeline.palette.compact";
function Ln() {
  if (typeof window > "u") return [];
  try {
    const t = window.localStorage.getItem(Qn);
    if (!t) return [];
    const r = JSON.parse(t);
    return Array.isArray(r) ? r : [];
  } catch {
    return [];
  }
}
function bs(t) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(Qn, JSON.stringify(t));
    } catch {
    }
}
function Xh(t) {
  const r = Ln().filter((a) => a !== t), n = [t, ...r].slice(0, xs);
  bs(n);
}
const Do = "pipeline.palette.collapsed.";
function ys(t) {
  if (typeof window > "u") return !1;
  try {
    return window.localStorage.getItem(Do + t) === "true";
  } catch {
    return !1;
  }
}
function vs(t, r) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(Do + t, String(r));
    } catch {
    }
}
function Ns(t, r) {
  if (!r) return !0;
  const n = r.toLowerCase();
  return t.name.toLowerCase().includes(n) || t.type.toLowerCase().includes(n) || t.description.toLowerCase().includes(n);
}
function mr({ expanded: t }) {
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
function ws({ disabledTypes: t = [] }) {
  const [r, n] = S(""), [a, i] = S(/* @__PURE__ */ new Set()), [s, d] = S(null), [c, l] = S(() => Ln()), [p, u] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem(ur) === "true";
    } catch {
      return !1;
    }
  }), [f, h] = S(() => {
    const A = {};
    for (const j of Et)
      A[j.name] = ys(j.name);
    return A;
  }), g = q(() => new Set(t), [t]);
  ne(() => {
    const A = (j) => {
      j.key === Qn && l(Ln());
    };
    return window.addEventListener("storage", A), () => window.removeEventListener("storage", A);
  }, []), ne(() => {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(ur, String(p));
      } catch {
      }
  }, [p]);
  const x = D((A) => {
    i((j) => {
      const W = new Set(j);
      return W.has(A) ? W.delete(A) : W.add(A), W;
    });
  }, []), m = D(() => {
    n(""), i(/* @__PURE__ */ new Set());
  }, []), N = D((A) => {
    h((j) => {
      const W = { ...j, [A]: !j[A] };
      return vs(A, W[A]), W;
    });
  }, []), y = q(() => {
    const A = /* @__PURE__ */ new Map();
    for (const j of Et)
      for (const W of j.items) A.set(W.type, W);
    return A;
  }, []), v = q(
    () => c.map((A) => y.get(A)).filter(Boolean),
    [c, y]
  ), w = q(() => Et.map((A) => {
    const j = a.size > 0 && !a.has(A.name) ? [] : A.items.filter((W) => Ns(W, r));
    return { ...A, items: j };
  }).filter((A) => A.items.length > 0), [r, a]), b = q(() => {
    const A = /* @__PURE__ */ new Set(), j = [];
    if (!r && a.size === 0)
      for (const W of v)
        j.push(W), A.add(W.type);
    for (const W of w)
      for (const ie of W.items)
        A.has(ie.type) || (j.push(ie), A.add(ie.type));
    return j;
  }, [v, w, r, a]), k = le(b);
  ne(() => {
    k.current = b;
  }, [b]);
  const C = w.length === 0 && (r !== "" || a.size > 0), T = (A) => (j) => {
    if (g.has(A.type)) {
      j.preventDefault();
      return;
    }
    j.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: A.type })
    ), j.dataTransfer.effectAllowed = "move";
  }, $ = (A, j) => {
    const W = g.has(A.type), ie = s === A.type && !W, Y = j !== null && j < 9 ? j + 1 : null;
    return p ? /* @__PURE__ */ o(
      "div",
      {
        draggable: !W,
        onDragStart: T(A),
        onMouseEnter: () => d(A.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-8 box-border my-px mx-2 px-2 flex items-center gap-2 rounded font-[inherit]",
          W ? "cursor-not-allowed opacity-45" : "cursor-grab",
          ie ? "bg-surface-hover" : "bg-transparent"
        ),
        title: W ? `${A.name} is already placed` : Y ? `${A.description} — press ${Y}` : A.description,
        "data-node-type": A.type,
        "data-disabled": W || void 0,
        "data-testid": `palette-item-${A.type}`,
        children: [
          /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": !0,
              "data-testid": `palette-accent-${A.type}`,
              className: I("w-1.5 h-1.5 rounded-full shrink-0", A.nodeCategory && un[A.nodeCategory])
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-base leading-none w-5 text-center shrink-0", "aria-hidden": !0, children: A.icon }),
          /* @__PURE__ */ e("span", { className: I("text-[12px] font-medium text-slate-800 truncate", W && "line-through"), children: A.name }),
          Y !== null && /* @__PURE__ */ e(
            "kbd",
            {
              "data-testid": `palette-shortcut-${A.type}`,
              className: I(
                "ml-auto text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                W && "opacity-50"
              ),
              children: Y
            }
          )
        ]
      },
      A.type
    ) : /* @__PURE__ */ o(
      "div",
      {
        draggable: !W,
        onDragStart: T(A),
        onMouseEnter: () => d(A.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-11 box-border my-0.5 mx-2 py-1.5 px-2.5 flex items-center gap-2.5 rounded-md border border-transparent font-[inherit]",
          W ? "cursor-not-allowed opacity-45" : "cursor-grab",
          ie ? "bg-surface-panel" : "bg-transparent"
        ),
        title: W ? `${A.name} is already placed` : Y ? `${A.description} — press ${Y}` : A.description,
        "data-node-type": A.type,
        "data-disabled": W || void 0,
        "data-testid": `palette-item-${A.type}`,
        children: [
          /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": !0,
              "data-testid": `palette-accent-${A.type}`,
              className: I("w-1.5 h-1.5 rounded-full shrink-0", A.nodeCategory && un[A.nodeCategory])
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: A.icon }),
          /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ o("div", { className: I("text-[13px] font-semibold text-text-primary flex items-center gap-1.5", W && "line-through"), children: [
              /* @__PURE__ */ e("span", { className: "truncate", children: A.name }),
              Y !== null && /* @__PURE__ */ e(
                "kbd",
                {
                  "data-testid": `palette-shortcut-${A.type}`,
                  className: I(
                    "text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                    W && "opacity-50"
                  ),
                  children: Y
                }
              )
            ] }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-neutral truncate", children: W ? "Placed" : A.description })
          ] })
        ]
      },
      A.type
    );
  }, R = v.length > 0 && !r && a.size === 0;
  let E = 0;
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
                value: r,
                onChange: (A) => n(A.target.value),
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
                onClick: () => u((A) => !A),
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
              children: gs.map((A) => /* @__PURE__ */ e(
                Pa,
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
          R && /* @__PURE__ */ o("div", { "data-testid": "palette-recents", children: [
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: () => N("__recents__"),
                className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
                "aria-expanded": !f.__recents__,
                children: [
                  /* @__PURE__ */ e(mr, { expanded: !f.__recents__ }),
                  "Recently used"
                ]
              }
            ),
            !f.__recents__ && /* @__PURE__ */ e("div", { children: v.map((A) => {
              const j = E++;
              return $(A, j);
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
                    onClick: m,
                    "data-testid": "palette-clear-filters",
                    className: "text-[11px] font-semibold text-info-fg hover:underline",
                    children: "Clear filters"
                  }
                )
              ]
            }
          ) : w.map((A) => {
            const j = !!f[A.name];
            return /* @__PURE__ */ o("div", { "data-testid": `palette-category-${A.name}`, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => N(A.name),
                  className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
                  "aria-expanded": !j,
                  children: [
                    /* @__PURE__ */ e(mr, { expanded: !j }),
                    /* @__PURE__ */ e(
                      "span",
                      {
                        "aria-hidden": !0,
                        "data-testid": `palette-section-accent-${A.key}`,
                        className: I("w-1.5 h-1.5 rounded-full shrink-0", un[A.key])
                      }
                    ),
                    A.name
                  ]
                }
              ),
              !j && /* @__PURE__ */ e("div", { children: A.items.map((W) => {
                const ie = E++;
                return $(W, ie);
              }) })
            ] }, A.name);
          })
        ] }),
        /* @__PURE__ */ e("div", { className: "py-2 px-3 border-t border-border text-[10px] text-text-tertiary font-[inherit] shrink-0", children: "Press 1–9 to insert at center" })
      ]
    }
  );
}
function ks({
  definition: t,
  addNode: r,
  screenToFlowPosition: n,
  containerRef: a
}) {
  return ne(() => {
    const i = (s) => {
      if (!Zn(s.target) && !(s.metaKey || s.ctrlKey || s.altKey) && /^[1-8]$/.test(s.key)) {
        const d = Number(s.key) - 1, c = fs[d];
        if (!c || c.type === "trigger" && t?.nodes.some((g) => g.type === "trigger"))
          return;
        const p = a.current?.getBoundingClientRect(), u = p ? n({
          x: p.left + p.width / 2,
          y: p.top + p.height / 2
        }) : { x: 0, y: 0 };
        let { x: f, y: h } = u;
        if (t)
          for (const g of t.nodes)
            Math.abs(g.position.x - f) < 16 && Math.abs(g.position.y - h) < 16 && (f += 24, h += 24);
        r(c.type, { x: f, y: h }), s.preventDefault();
      }
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [r, t, n, a]), null;
}
const Cs = 280, Is = 120, Ss = 40, $s = 40;
function Ts(t, r) {
  const n = Cs, a = Is, i = Ss, s = $s;
  if (t.nodes.length === 0) return [];
  const d = /* @__PURE__ */ new Map();
  for (const N of t.nodes)
    d.set(N.id, []);
  for (const N of t.edges) {
    const y = d.get(N.source);
    y && d.has(N.target) && y.push(N.target);
  }
  const l = t.nodes.filter((N) => N.type === "trigger").map((N) => N.id).sort()[0], p = /* @__PURE__ */ new Map();
  if (l !== void 0) {
    const N = [l];
    for (p.set(l, 0); N.length > 0; ) {
      const y = N.shift(), v = p.get(y), w = d.get(y) ?? [];
      for (const b of w)
        p.has(b) || (p.set(b, v + 1), N.push(b));
    }
  }
  const u = /* @__PURE__ */ new Map();
  let f = -1;
  for (const N of t.nodes) {
    const y = p.get(N.id);
    y !== void 0 && (u.has(y) || u.set(y, []), u.get(y).push(N.id), y > f && (f = y));
  }
  for (const N of u.values())
    N.sort();
  const h = t.nodes.filter((N) => !p.has(N.id)).map((N) => N.id).sort(), g = f >= 0 ? f + 1 : 0;
  h.length > 0 && u.set(g, h);
  const x = [], m = [...u.keys()].sort((N, y) => N - y);
  for (const N of m) {
    const y = u.get(N), v = y.length, w = i + N * n;
    for (let b = 0; b < v; b++) {
      const k = s + (b - v / 2) * a;
      x.push({ id: y[b], position: { x: w, y: k } });
    }
  }
  return x;
}
function As({
  definition: t,
  setPositions: r,
  fitView: n
}) {
  const a = D(() => {
    n({ padding: 0.15, duration: 500 });
  }, [n]), i = D(() => {
    if (!t) return;
    const s = Ts(t);
    s.length !== 0 && (r(s), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => n({ padding: 0.15, duration: 500 })) : n({ padding: 0.15, duration: 500 }));
  }, [t, r, n]);
  return { handleFitView: a, handleAutoArrange: i };
}
function Rs({
  definition: t,
  setPositions: r,
  fitView: n
}) {
  const { handleFitView: a, handleAutoArrange: i } = As({
    definition: t,
    setPositions: r,
    fitView: n
  });
  return ne(() => {
    const s = (d) => {
      const c = d.target;
      if (!(c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable)) && d.shiftKey && (d.key === "A" || d.key === "a")) {
        if (d.metaKey || d.ctrlKey || d.altKey) return;
        d.preventDefault(), i();
      }
    };
    return window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s);
  }, [i]), /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: i,
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
        onClick: a,
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
function Zn(t) {
  if (!t || !(t instanceof HTMLElement)) return !1;
  const r = t.tagName;
  return !!(r === "INPUT" || r === "TEXTAREA" || r === "SELECT" || t.isContentEditable);
}
function Ps(t) {
  if (t.nodes.length === 0) return [];
  const r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const s of t.nodes)
    r.set(s.id, []), n.set(s.id, 0);
  for (const s of t.edges)
    !r.has(s.source) || !n.has(s.target) || (r.get(s.source).push(s.target), n.set(s.target, (n.get(s.target) ?? 0) + 1));
  const a = [], i = t.nodes.filter((s) => (n.get(s.id) ?? 0) === 0).map((s) => s.id).sort();
  for (; i.length > 0; ) {
    const s = i.shift();
    a.push(s);
    const d = (r.get(s) ?? []).slice().sort();
    for (const c of d) {
      const l = (n.get(c) ?? 0) - 1;
      n.set(c, l), l === 0 && i.push(c);
    }
  }
  if (a.length < t.nodes.length) {
    const s = new Set(a), d = t.nodes.filter((c) => !s.has(c.id)).map((c) => c.id).sort();
    a.push(...d);
  }
  return a;
}
const Ms = { animated: as }, Es = ns;
function Ds(t) {
  return {
    id: t.id,
    type: t.type,
    position: t.position,
    data: { ...t.data, nodeType: t.type }
  };
}
function Os(t) {
  const r = t.sourceHandle === "true" || t.sourceHandle === "false" || t.sourceHandle === "approved" || t.sourceHandle === "rejected" || t.sourceHandle === "error" || /^branch-\d+$/.test(t.sourceHandle) ? t.sourceHandle : void 0;
  return {
    id: t.id,
    source: t.source,
    sourceHandle: t.sourceHandle,
    target: t.target,
    targetHandle: t.targetHandle,
    type: "animated",
    data: { state: "default", label: r }
  };
}
function _s({ onFilterLog: t, errorNodeId: r, onErrorNodePosition: n, replayEdgeStates: a, replayNodeClasses: i, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c }) {
  const {
    definition: l,
    addNode: p,
    setPositions: u,
    addEdge: f,
    removeEdge: h,
    removeNode: g,
    duplicateNodes: x,
    selectedNodeId: m,
    setSelectedNodeId: N,
    updateNodeData: y
  } = Ue(), { screenToFlowPosition: v, fitView: w } = Ta();
  cs({
    addNode: p,
    addEdge: f,
    updateNodeData: y,
    getDefinition: () => l
  });
  const [b, k, C] = Ao([]), [T, $, R] = Ro([]), [E, A] = S(!0), [j, W] = S(!0), ie = le(null), Y = le(null), [te, O] = S(null), [P, H] = S(null), K = D(
    (Q, ae) => {
      Q.preventDefault(), H({ nodeId: ae.id, x: Q.clientX, y: Q.clientY });
    },
    []
  ), U = D(() => {
    P && (t?.(P.nodeId), H(null));
  }, [P, t]), V = D(() => {
    if (!P) return;
    const Q = P.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(Q).catch(() => {
    }), H(null);
  }, [P]), J = D(() => {
    P && (d?.(P.nodeId), H(null));
  }, [P, d]), X = D(() => {
    if (!P) return;
    const Q = x([P.nodeId]);
    Q.length > 0 && N(Q[0]), H(null);
  }, [P, x, N]), pe = D(() => H(null), []);
  ne(() => {
    if (!l) {
      k([]), $([]);
      return;
    }
    k((Q) => {
      const ae = new Map(Q.map((ue) => [ue.id, ue]));
      return l.nodes.map((ue) => {
        const be = ae.get(ue.id), Pe = Ds(ue);
        return s && s.size > 0 && (Pe.data._hasBreakpoint = s.has(ue.id)), c && (Pe.data._pausedAtBreakpoint = ue.id === c), be ? { ...be, ...Pe, selected: be.selected } : Pe;
      });
    }), $(() => l.edges.map(Os));
  }, [l, s, c, k, $]), ne(() => {
    if (!r) {
      n?.(null);
      return;
    }
    k(
      (Q) => Q.map((ae) => ({
        ...ae,
        className: ae.id === r ? "node-error" : ae.className?.replace("node-error", "").trim() || void 0
      }))
    ), requestAnimationFrame(() => {
      const Q = ie.current;
      if (!Q) return;
      const ae = Q.querySelector(
        `.react-flow__node[data-id="${CSS.escape(r)}"]`
      );
      if (!ae) {
        n?.(null);
        return;
      }
      const ue = ae.getBoundingClientRect();
      n?.({ x: ue.right, y: ue.top + ue.height / 2 });
    });
  }, [r, k, n]), ne(() => {
    i && k(
      (Q) => Q.map((ae) => {
        const ue = i[ae.id] ?? "", Pe = [ae.id === r ? "node-error" : "", ue].filter(Boolean).join(" ") || void 0;
        let Te;
        ue === "node-replay-active" ? Te = "running" : ue === "node-replay-completed" ? Te = "completed" : ue === "node-replay-failed" && (Te = "failed");
        const Ge = { ...ae.data };
        return Te ? Ge._state = Te : Ge._state = "idle", { ...ae, className: Pe, data: Ge };
      })
    );
  }, [i, r, k]), ne(() => {
    a && $(
      (Q) => Q.map((ae) => {
        const ue = a[ae.id];
        if (!ue) return ae;
        const be = ae.data ?? {};
        return be.state === ue ? ae : { ...ae, data: { ...be, state: ue } };
      })
    );
  }, [a, $]);
  const z = D(
    (Q) => {
      C(Q);
      const ae = [], ue = [];
      for (const be of Q)
        be.type === "position" && be.position && be.dragging === !1 ? ae.push({ id: be.id, position: be.position }) : be.type === "remove" && ue.push(be.id);
      ae.length && u(ae);
      for (const be of ue) g(be);
    },
    [C, u, g]
  ), ce = D(
    (Q) => {
      R(Q);
      for (const ae of Q)
        ae.type === "remove" && h(ae.id);
    },
    [R, h]
  ), we = D(
    (Q) => {
      if (!l || !Q.source || !Q.target) return;
      const ae = l.nodes.find((Te) => Te.id === Q.source), ue = l.nodes.find((Te) => Te.id === Q.target);
      if (!ae || !ue) return;
      const be = Q.sourceHandle ?? "out", Pe = Q.targetHandle ?? "in";
      _n(
        ae.type,
        be,
        ue.type,
        Pe
      ) && f({
        source: Q.source,
        sourceHandle: be,
        target: Q.target,
        targetHandle: Pe
      });
    },
    [l, f]
  ), _e = D(
    (Q) => {
      if (!l || !Q.source || !Q.target) return !1;
      const ae = l.nodes.find((be) => be.id === Q.source), ue = l.nodes.find((be) => be.id === Q.target);
      return !ae || !ue ? !1 : _n(
        ae.type,
        Q.sourceHandle ?? "out",
        ue.type,
        Q.targetHandle ?? "in"
      );
    },
    [l]
  ), Ye = D(
    (Q, ae) => {
      N(ae.id);
    },
    [N]
  ), Fe = D(() => {
    N(null);
  }, [N]), Ee = D(
    (Q) => {
      const ae = Q.target;
      if (!ae || !(ae.classList.contains("react-flow__pane") || ae.classList.contains("react-flow__renderer") || ae.classList.contains("react-flow__viewport") || ae.classList.contains("react-flow"))) return;
      Q.preventDefault();
      const be = v({ x: Q.clientX, y: Q.clientY });
      O({
        anchor: { x: Q.clientX, y: Q.clientY },
        flowPosition: be
      });
    },
    [v]
  ), qe = D(() => O(null), []), je = D(
    (Q, ae) => {
      p(Q, ae);
    },
    [p]
  ), Ve = q(() => l ? l.nodes.some((Q) => Q.type === "trigger") ? ["trigger"] : [] : [], [l]), { handleDragOver: Ie, handleDrop: xe } = ps({
    addNode: p,
    screenToFlowPosition: v
  });
  ne(() => {
    const Q = (ae) => {
      if (!Zn(ae.target) && !(ae.metaKey || ae.ctrlKey || ae.altKey)) {
        if (ae.key === "m" || ae.key === "M") {
          A((ue) => !ue);
          return;
        }
        if (ae.key === "c" || ae.key === "C") {
          W((ue) => !ue);
          return;
        }
      }
    };
    return window.addEventListener("keydown", Q), () => window.removeEventListener("keydown", Q);
  }, []), ds({
    definition: l,
    selectedNodeId: m,
    setSelectedNodeId: N,
    removeNode: g,
    removeDefEdge: h,
    setNodes: k,
    setEdges: $,
    setPositions: u,
    duplicateNodes: x,
    clipboardRef: Y,
    containerRef: ie
  });
  const oe = D((Q) => {
    switch (Q.data?._state) {
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
      ref: ie,
      className: "flex-1 min-w-0 min-h-[520px] relative bg-[#fafbfc]",
      role: "application",
      "aria-label": "Pipeline editor canvas",
      tabIndex: 0,
      "data-testid": "pipeline-canvas",
      onDragOver: Ie,
      onDrop: xe,
      onDoubleClick: Ee,
      children: [
        /* @__PURE__ */ o(
          Po,
          {
            nodes: b,
            edges: T,
            nodeTypes: Es,
            edgeTypes: Ms,
            onNodesChange: z,
            onEdgesChange: ce,
            onConnect: we,
            isValidConnection: _e,
            onNodeClick: Ye,
            onNodeContextMenu: K,
            onPaneClick: Fe,
            fitView: !0,
            snapToGrid: !0,
            snapGrid: [16, 16],
            edgesFocusable: !0,
            defaultEdgeOptions: { type: "smoothstep" },
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ e(
                Mo,
                {
                  variant: Aa.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              j ? /* @__PURE__ */ e(
                Eo,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              E ? /* @__PURE__ */ e(
                Ra,
                {
                  position: "bottom-right",
                  pannable: !0,
                  zoomable: !0,
                  className: "!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]",
                  maskColor: "rgba(15, 23, 42, 0.04)",
                  nodeColor: oe,
                  nodeStrokeColor: "#e2e8f0"
                }
              ) : null
            ]
          }
        ),
        te ? /* @__PURE__ */ e(
          ls,
          {
            anchor: te.anchor,
            flowPosition: te.flowPosition,
            disabledTypes: Ve,
            onClose: qe,
            onInsert: je
          }
        ) : null,
        /* @__PURE__ */ e(
          ks,
          {
            definition: l,
            addNode: p,
            screenToFlowPosition: v,
            containerRef: ie
          }
        ),
        /* @__PURE__ */ e(
          Rs,
          {
            definition: l,
            setPositions: u,
            fitView: w
          }
        ),
        P ? /* @__PURE__ */ e(
          us,
          {
            nodeMenu: P,
            breakpoints: s,
            showBreakpointOption: !!d,
            onFilterLog: U,
            onCopyNodeId: V,
            onDuplicate: X,
            onToggleBreakpoint: J,
            onDismiss: pe
          }
        ) : null
      ]
    }
  );
}
function Ls({ onFilterLog: t, errorNodeId: r, onErrorNodePosition: n, replayEdgeStates: a, replayNodeClasses: i, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c } = {}) {
  return /* @__PURE__ */ e($a, { children: /* @__PURE__ */ e(
    _s,
    {
      onFilterLog: t,
      errorNodeId: r,
      onErrorNodePosition: n,
      replayEdgeStates: a,
      replayNodeClasses: i,
      breakpoints: s,
      onToggleBreakpoint: d,
      pausedAtNodeId: c
    }
  ) });
}
const hr = {
  LLMError: { bg: "#fef2f2", fg: "#dc2626" },
  TimeoutError: { bg: "#fff7ed", fg: "#ea580c" },
  NetworkError: { bg: "#fffbeb", fg: "#d97706" },
  ValidationError: { bg: "#fefce8", fg: "#ca8a04" },
  RegistryConflict: { bg: "#faf5ff", fg: "#9333ea" },
  UnknownError: { bg: "#f1f5f9", fg: "#475569" }
};
function Bs(t) {
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
function Us({ error: t, anchor: r, onDismiss: n, onRetry: a }) {
  const [i, s] = S(!1), [d, c] = S(!1), l = t.errorCategory ?? "UnknownError", p = hr[l] ?? hr.UnknownError, u = D(async () => {
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
  }, [t, l]), f = D(() => {
    a?.();
  }, [a]), h = Math.min(r.y + 8, window.innerHeight - 440), g = Math.min(r.x + 12, window.innerWidth - 360);
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
              children: Bs(l)
            }
          ),
          /* @__PURE__ */ e("span", { className: "flex-1" }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: n,
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
                  i ? "▾" : "▸",
                  " Stack trace"
                ]
              }
            ),
            i && /* @__PURE__ */ e(
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
          a && /* @__PURE__ */ e(
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
function Fs(t, r) {
  const n = /* @__PURE__ */ new Map();
  for (const i of t)
    n.set(i.id, []);
  for (const i of r) {
    const s = n.get(i.source);
    s && s.push({ target: i.target, edgeId: i.id });
  }
  const a = /* @__PURE__ */ new Map();
  for (const i of t)
    a.set(i.id, 0);
  for (const i of t) {
    if (a.get(i.id) !== 0) continue;
    const s = [
      { nodeId: i.id, index: 0 }
    ];
    for (a.set(i.id, 1); s.length > 0; ) {
      const d = s[s.length - 1], c = n.get(d.nodeId) ?? [];
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
function Oo(t) {
  const r = [], n = [], { nodes: a, edges: i } = t, s = /* @__PURE__ */ new Map();
  for (const d of a)
    s.set(d.id, d);
  return js(a, r), zs(a, i, r), qs(i, s, r), Vs(a, r), Qs(a, i, r), Zs(a, i, n), el(a, i, n), tl(a, i, n), nl(a, i, n), n.push(...rl(t)), n.push(...ol(t)), n.push(...al(t)), n.push(...il(t)), n.push(...sl(t)), n.push(...ll(t)), n.push(...cl(t)), n.push(...dl(t)), n.push(...pl(t)), n.push(...ul(t)), {
    errors: r,
    warnings: n,
    isValid: r.length === 0,
    canPublish: r.length === 0
  };
}
function js(t, r) {
  const n = t.filter((a) => a.type === "trigger");
  if (n.length === 0) {
    r.push({
      code: "NO_TRIGGER",
      severity: "error",
      message: "Pipeline must have exactly one Trigger node."
    });
    return;
  }
  if (n.length > 1)
    for (const a of n)
      r.push({
        code: "MULTIPLE_TRIGGERS",
        severity: "error",
        message: "Pipeline must have exactly one Trigger node.",
        nodeId: a.id
      });
}
function zs(t, r, n) {
  const a = Fs(t, r);
  a !== null && n.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: a
  });
}
function qs(t, r, n) {
  for (const a of t) {
    const i = r.get(a.source), s = r.get(a.target);
    if (!i || !s) {
      n.push({
        code: "INVALID_HANDLE",
        severity: "error",
        message: "Edge references a node that does not exist.",
        edgeId: a.id
      });
      continue;
    }
    _n(
      i.type,
      a.sourceHandle,
      s.type,
      a.targetHandle
    ) || n.push({
      code: "INVALID_HANDLE",
      severity: "error",
      message: `Invalid connection: ${i.type}.${a.sourceHandle} → ${s.type}.${a.targetHandle}.`,
      edgeId: a.id
    });
  }
}
function Vs(t, r) {
  for (const n of t)
    switch (n.data.type) {
      case "llm":
        Ws(n.id, n.data, r);
        break;
      case "transform":
        Js(n.id, n.data, r);
        break;
      case "condition":
        Hs(n.id, n.data, r);
        break;
      case "action":
        Gs(n.id, n.data, r);
        break;
      case "fork":
        Ks(n.id, n.data, r);
        break;
      case "join":
        Ys(n.id, n.data, r);
        break;
      case "approval":
        Xs(n.id, n.data, r);
        break;
    }
}
function Ws(t, r, n) {
  r.provider || Je(n, t, "provider"), (!r.model || !r.model.trim()) && Je(n, t, "model"), (!r.systemPrompt || !r.systemPrompt.trim()) && Je(n, t, "systemPrompt"), (!r.userPromptTemplate || !r.userPromptTemplate.trim()) && Je(n, t, "userPromptTemplate");
}
function Js(t, r, n) {
  r.transformType || Je(n, t, "transformType"), (!r.expression || !r.expression.trim()) && Je(n, t, "expression");
}
function Hs(t, r, n) {
  (!r.expression || !r.expression.trim()) && Je(n, t, "expression");
}
function Gs(t, r, n) {
  r.actionType || Je(n, t, "actionType");
}
function Ks(t, r, n) {
  (typeof r.branchCount != "number" || r.branchCount < 2) && n.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: t,
    field: "branchCount"
  });
}
function Ys(t, r, n) {
  r.mode || Je(n, t, "mode"), r.mergeStrategy || Je(n, t, "mergeStrategy"), r.mode === "n_of_m" && (typeof r.n != "number" || r.n < 1) && n.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: t,
    field: "n"
  });
}
function Xs(t, r, n) {
  (!r.approvers || r.approvers.length === 0) && n.push({
    code: "APPROVAL_NO_APPROVERS",
    severity: "error",
    message: "Approval node must have at least one approver.",
    nodeId: t,
    field: "approvers"
  }), (typeof r.requiredCount != "number" || r.requiredCount < 1) && n.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Approval requires requiredCount ≥ 1.",
    nodeId: t,
    field: "requiredCount"
  });
}
function Qs(t, r, n) {
  const a = /* @__PURE__ */ new Map();
  for (const i of r)
    a.set(i.target, (a.get(i.target) ?? 0) + 1);
  for (const i of t) {
    if (i.type !== "join") continue;
    (a.get(i.id) ?? 0) < 2 && n.push({
      code: "JOIN_INSUFFICIENT_INPUTS",
      severity: "error",
      message: "Join node requires at least 2 incoming edges.",
      nodeId: i.id
    });
  }
}
function Je(t, r, n) {
  t.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: `Missing required field '${n}'.`,
    nodeId: r,
    field: n
  });
}
function Zs(t, r, n) {
  const a = t.filter((c) => c.type === "trigger");
  if (a.length !== 1) return;
  const i = /* @__PURE__ */ new Map();
  for (const c of t) i.set(c.id, []);
  for (const c of r)
    i.get(c.source)?.push(c.target);
  const s = /* @__PURE__ */ new Set(), d = [a[0].id];
  for (s.add(a[0].id); d.length > 0; ) {
    const c = d.shift();
    for (const l of i.get(c) ?? [])
      s.has(l) || (s.add(l), d.push(l));
  }
  for (const c of t)
    s.has(c.id) || n.push({
      code: "ORPHAN_NODE",
      severity: "warning",
      message: "Node is unreachable from the Trigger.",
      nodeId: c.id
    });
}
function el(t, r, n) {
  const a = /* @__PURE__ */ new Set();
  for (const i of r) a.add(i.source);
  for (const i of t)
    a.has(i.id) || i.data.terminal !== !0 && n.push({
      code: "DEAD_END",
      severity: "warning",
      message: "Node has no outgoing edges.",
      nodeId: i.id
    });
}
function tl(t, r, n) {
  const a = /* @__PURE__ */ new Map();
  for (const i of r) {
    const s = a.get(i.source) ?? /* @__PURE__ */ new Set();
    s.add(i.sourceHandle), a.set(i.source, s);
  }
  for (const i of t) {
    if (i.data.type !== "fork") continue;
    const s = i.data.branchCount, d = a.get(i.id) ?? /* @__PURE__ */ new Set();
    for (let c = 0; c < s; c += 1) {
      const l = `branch-${c}`;
      d.has(l) || n.push({
        code: "UNUSED_FORK_BRANCH",
        severity: "warning",
        message: `Fork branch '${l}' has no connected edge.`,
        nodeId: i.id,
        field: l
      });
    }
  }
}
function nl(t, r, n) {
  const a = /* @__PURE__ */ new Map();
  for (const i of r) {
    const s = a.get(i.source) ?? /* @__PURE__ */ new Set();
    s.add(i.sourceHandle), a.set(i.source, s);
  }
  for (const i of t) {
    if (i.type !== "condition") continue;
    const s = a.get(i.id) ?? /* @__PURE__ */ new Set();
    for (const d of ["true", "false"])
      s.has(d) || n.push({
        code: "UNUSED_CONDITION_BRANCH",
        severity: "warning",
        message: `Condition branch '${d}' has no connected edge.`,
        nodeId: i.id,
        field: d
      });
  }
}
function et(t) {
  const r = t.data.label;
  if (typeof r == "string" && r.trim()) return r.trim();
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
function rl(t) {
  const r = [], n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const c of t.nodes)
    n.set(c.id, []), a.set(c.id, []);
  for (const c of t.edges)
    c.sourceHandle !== "error" && n.get(c.source)?.push(c.target), a.get(c.target)?.push(c.source);
  const i = /* @__PURE__ */ new Map();
  for (const c of t.nodes) i.set(c.id, c);
  function s(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [];
    for (const u of n.get(c) ?? [])
      l.has(u) || (l.add(u), p.push(u));
    for (; p.length > 0; ) {
      const u = p.shift();
      if (i.get(u)?.type === "join") return !0;
      for (const h of n.get(u) ?? [])
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
  for (const c of t.nodes)
    c.data.type !== "llm" && c.data.type !== "action" || t.edges.some(
      (p) => p.source === c.id && p.sourceHandle === "error"
    ) || d(c.id) && s(c.id) || r.push({
      code: "NO_ERROR_HANDLER",
      severity: "warning",
      message: `${c.data.type} node '${et(c)}' has no error handler — failures will terminate the run.`,
      nodeId: c.id
    });
  return r;
}
function ol(t) {
  const r = [];
  for (const n of t.nodes)
    n.data.type === "llm" && (typeof n.data.maxTokens != "number" || n.data.maxTokens <= 0) && r.push({
      code: "LLM_NO_MAX_TOKENS",
      severity: "warning",
      message: `LLM node '${et(n)}' has no maxTokens — responses could run long / expensive.`,
      nodeId: n.id,
      field: "maxTokens"
    });
  return r;
}
function al(t) {
  const r = [];
  for (const n of t.nodes)
    n.data.type === "approval" && (typeof n.data.timeoutMs != "number" || n.data.timeoutMs <= 0) && r.push({
      code: "UNGUARDED_APPROVAL_TIMEOUT",
      severity: "warning",
      message: `Approval '${et(n)}' has no timeout — the run could block indefinitely.`,
      nodeId: n.id,
      field: "timeoutMs"
    });
  return r;
}
function il(t) {
  const r = [];
  for (const n of t.nodes)
    n.data.type === "fork" && typeof n.data.branchCount == "number" && n.data.branchCount > 5 && r.push({
      code: "LARGE_FORK",
      severity: "warning",
      message: `Fork with ${n.data.branchCount} branches; consider splitting into multiple joins for readability.`,
      nodeId: n.id,
      field: "branchCount"
    });
  return r;
}
function sl(t) {
  const n = t.nodes.filter((p) => p.type === "trigger");
  if (n.length !== 1) return [];
  const a = /* @__PURE__ */ new Map();
  for (const p of t.nodes) a.set(p.id, []);
  for (const p of t.edges) a.get(p.source)?.push(p.target);
  const i = /* @__PURE__ */ new Map(), s = [n[0].id];
  i.set(n[0].id, 1);
  const d = t.nodes.length * t.nodes.length + 1;
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
function ll(t) {
  const r = [], n = /* @__PURE__ */ new Map();
  for (const a of t.nodes) {
    const i = et(a), s = n.get(i) ?? [];
    s.push(a), n.set(i, s);
  }
  for (const [a, i] of n)
    if (!(i.length < 2))
      for (const s of i)
        r.push({
          code: "DUPLICATE_NODE_NAME",
          severity: "warning",
          message: `Multiple nodes named '${a}'; consider disambiguating.`,
          nodeId: s.id
        });
  return r;
}
function cl(t) {
  const r = [], n = /\{\{[^}]+\}\}/;
  for (const a of t.nodes) {
    if (a.data.type !== "llm") continue;
    const { temperature: i, userPromptTemplate: s } = a.data;
    typeof i != "number" || i <= 0.8 || !s || !n.test(s) || r.push({
      code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
      severity: "warning",
      message: `LLM '${et(a)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
      nodeId: a.id
    });
  }
  return r;
}
function dl(t) {
  return t.triggerBinding?.event !== "schedule" ? [] : t.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function pl(t) {
  const r = [], n = /* @__PURE__ */ new Map();
  for (const a of t.edges) {
    const i = n.get(a.source) ?? /* @__PURE__ */ new Set();
    i.add(a.sourceHandle), n.set(a.source, i);
  }
  for (const a of t.nodes) {
    if (a.type !== "condition") continue;
    const i = n.get(a.id) ?? /* @__PURE__ */ new Set(), s = i.has("true"), d = i.has("false");
    s && !d && r.push({
      code: "UNREACHABLE_AFTER_CONDITION_FALSE",
      severity: "warning",
      message: `Condition '${et(a)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: a.id,
      field: "false"
    });
  }
  return r;
}
function ul(t) {
  const r = [], n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const c of t.nodes)
    n.set(c.id, []), a.set(c.id, []);
  for (const c of t.edges)
    n.get(c.source)?.push({ target: c.target, sourceHandle: c.sourceHandle }), a.get(c.target)?.push(c.source);
  const i = /* @__PURE__ */ new Map();
  for (const c of t.nodes) i.set(c.id, c);
  function s(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [c];
    for (; p.length > 0; ) {
      const u = p.shift(), f = i.get(u);
      if (f && f.type === "join" && u !== c) return u;
      for (const { target: h } of n.get(u) ?? [])
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
  for (const c of t.nodes) {
    if (c.data.type !== "fork") continue;
    const l = n.get(c.id) ?? [];
    if (l.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const { target: h } of l)
      p.add(s(h));
    const u = p.has(null), f = [...p].filter((h) => h !== null);
    (u || f.length !== 1) && r.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Fork '${et(c)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
      nodeId: c.id
    });
  }
  for (const c of t.nodes) {
    if (c.data.type !== "join") continue;
    const l = a.get(c.id) ?? [];
    if (l.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const h of l)
      p.add(d(h));
    const u = p.has(null), f = [...p].filter((h) => h !== null);
    (u || f.length !== 1) && r.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Join '${et(c)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: c.id
    });
  }
  return r;
}
function ml(t, r) {
  return `${t}${r}`;
}
const hl = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, fl = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function _o(t) {
  return t.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const gl = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function xl(t) {
  const r = fl[t.type] ?? "■", n = gl[t.type] ?? t.type.charAt(0).toUpperCase() + t.type.slice(1);
  let a = null;
  switch (t.data.type) {
    case "llm":
      a = t.data.model || null;
      break;
    case "condition": {
      const s = t.data;
      a = s.label || s.expression || null;
      break;
    }
    case "approval": {
      const d = t.data.approvers?.length ?? 0;
      a = `${d} approver${d === 1 ? "" : "s"}`;
      break;
    }
    case "fork": {
      const s = t.data;
      a = `${s.branchCount} branch${s.branchCount === 1 ? "" : "es"}`;
      break;
    }
    case "action":
      a = t.data.actionType;
      break;
    case "transform":
      a = t.data.transformType;
      break;
    case "trigger":
      a = t.data.triggerType;
      break;
    case "join":
      a = t.data.mode;
      break;
  }
  const i = `${r} ${n}`;
  return _o(a ? `${i}<br/>${a}` : i);
}
function bl(t, r) {
  const n = `"${r}"`;
  switch (t) {
    case "condition":
      return `{${n}}`;
    case "fork":
      return `{{${n}}}`;
    case "approval":
      return `[/${n}\\]`;
    case "llm":
      return `(${n})`;
    default:
      return `[${n}]`;
  }
}
function yl(t) {
  return !t || t === "out" ? null : t;
}
function vl(t) {
  const r = ["flowchart TD"], n = {}, a = /* @__PURE__ */ new Map();
  for (const i of t.nodes) {
    const s = hl[i.type] ?? "n", d = n[s] = (n[s] ?? 0) + 1;
    a.set(i.id, ml(s, d));
  }
  for (const i of t.nodes) {
    const s = a.get(i.id);
    if (!s) continue;
    const d = bl(i.type, xl(i));
    r.push(`  ${s}${d}`);
  }
  for (const i of t.edges) {
    const s = a.get(i.source), d = a.get(i.target);
    if (!s || !d) continue;
    const c = yl(i.sourceHandle);
    c ? r.push(`  ${s} --"${_o(c)}"--> ${d}`) : r.push(`  ${s} --> ${d}`);
  }
  return r.join(`
`);
}
function fr(t) {
  return JSON.stringify(t, (r, n) => {
    if (n && typeof n == "object" && !Array.isArray(n)) {
      const a = Object.keys(n).sort(), i = {};
      for (const s of a) i[s] = n[s];
      return i;
    }
    return n;
  });
}
function gr(t) {
  const r = /* @__PURE__ */ new Map();
  for (const n of t) r.set(n.id, n);
  return r;
}
function xr(t) {
  return new Set(t.edges.map((r) => r.id));
}
function Nl(t, r) {
  if (!r)
    return {
      addedNodes: t.nodes.map((v) => ({
        node: v,
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
  const n = gr(t.nodes), a = gr(r.nodes), i = [], s = [], d = [];
  for (const [v, w] of n) {
    const b = a.get(v);
    if (!b) {
      i.push({ node: w, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const k = fr(w.data) !== fr(b.data), C = w.position.x !== b.position.x || w.position.y !== b.position.y;
    (k || C) && d.push({ node: w, dataChanged: k, positionChanged: C });
  }
  for (const [v, w] of a)
    n.has(v) || s.push({ node: w, dataChanged: !0, positionChanged: !1 });
  const c = xr(t), l = xr(r);
  let p = 0, u = 0;
  for (const v of c) l.has(v) || p++;
  for (const v of l) c.has(v) || u++;
  const f = t.name !== r.name, h = (t.icon ?? "") !== (r.icon ?? ""), g = new Set(t.tags ?? []), x = new Set(r.tags ?? []), m = [], N = [];
  for (const v of g) x.has(v) || m.push(v);
  for (const v of x) g.has(v) || N.push(v);
  const y = m.length > 0 || N.length > 0;
  return {
    addedNodes: i,
    removedNodes: s,
    modifiedNodes: d,
    addedEdges: p,
    removedEdges: u,
    nameChanged: f,
    previousName: f ? r.name : void 0,
    iconChanged: h,
    previousIcon: h ? r.icon : void 0,
    tagsChanged: y,
    tagsAdded: m,
    tagsRemoved: N
  };
}
const wl = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function kl(t) {
  return t.data.type === "condition" && t.data.label ? t.data.label : t.data.type === "llm" ? t.data.model : t.data.type === "action" ? t.data.actionType : t.data.type === "trigger" ? t.data.triggerType : t.type.charAt(0).toUpperCase() + t.type.slice(1);
}
function mn(t, r, n) {
  const a = t.node, i = wl[a.type] ?? "■", s = r !== "removed" && !!n;
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      disabled: !s,
      onClick: s ? () => n(t.node.id) : void 0,
      className: I(
        "flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-[inherit] bg-[#f8fafc] border border-border text-left w-full text-text-primary",
        s ? "cursor-pointer" : "cursor-default",
        r === "removed" && "opacity-85"
      ),
      "data-testid": `diff-row-${r}`,
      children: [
        /* @__PURE__ */ e("span", { className: "text-sm", children: i }),
        /* @__PURE__ */ e("span", { className: "font-semibold", children: a.type }),
        /* @__PURE__ */ e("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: kl(a) }),
        r === "modified" && t.positionChanged ? /* @__PURE__ */ e("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]", children: "moved" }) : null
      ]
    },
    `${r}-${t.node.id}`
  );
}
function Cl({
  open: t,
  onClose: r,
  currentDef: n,
  publishedDef: a,
  onJumpToNode: i
}) {
  const s = q(
    () => Nl(n, a),
    [n, a]
  ), d = (u) => {
    i && i(u), r();
  }, c = a !== null, l = n.version, p = n.publishedVersion;
  return /* @__PURE__ */ o(
    He,
    {
      open: t,
      onClose: r,
      title: "Changes since publish",
      maxWidth: 820,
      footer: /* @__PURE__ */ e(
        "button",
        {
          onClick: r,
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
        n.publishedVersion === void 0 ? /* @__PURE__ */ e("p", { className: "m-0 text-[13px] text-text-secondary", children: "This pipeline has never been published." }) : c ? /* @__PURE__ */ o(G, { children: [
          /* @__PURE__ */ o("div", { className: "flex gap-3 flex-wrap", children: [
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Added (",
                s.addedNodes.length,
                ")"
              ] }),
              s.addedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.addedNodes.map((u) => mn(u, "added", d))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Removed (",
                s.removedNodes.length,
                ")"
              ] }),
              s.removedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.removedNodes.map((u) => mn(u, "removed", void 0))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Modified (",
                s.modifiedNodes.length,
                ")"
              ] }),
              s.modifiedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.modifiedNodes.map((u) => mn(u, "modified", d))
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
                n.name,
                '"'
              ] })
            ] }) : null,
            s.iconChanged ? /* @__PURE__ */ o("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Icon: ",
              s.previousIcon ?? "—",
              " → ",
              n.icon ?? "—"
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
          n.version,
          " · Published v",
          n.publishedVersion,
          " · No snapshot stored — diff will be available after the next publish (Phase 2 once archived snapshots back-fill)."
        ] })
      ]
    }
  );
}
function Il({ open: t, onClose: r }) {
  return null;
}
const hn = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", br = "px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function Sl(t) {
  const {
    publishConfirmOpen: r,
    onPublishClose: n,
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
    currentDef: N,
    publishedDef: y,
    onJumpToNode: v,
    simPanelOpen: w,
    onSimPanelClose: b
  } = t;
  return /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ e(
      He,
      {
        open: r,
        onClose: n,
        title: "Publish pipeline?",
        maxWidth: 420,
        footer: /* @__PURE__ */ o(G, { children: [
          /* @__PURE__ */ e("button", { onClick: n, className: hn, children: "Cancel" }),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: a,
              disabled: i,
              className: I(
                "px-4 py-[7px] text-[13px] font-semibold text-white border-none rounded-[7px] font-[inherit]",
                i ? "bg-[#cbd5e1] cursor-not-allowed" : "bg-primary cursor-pointer"
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
          i ? /* @__PURE__ */ o(G, { children: [
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
      He,
      {
        open: l,
        onClose: p,
        title: "Delete pipeline?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(G, { children: [
          /* @__PURE__ */ e("button", { onClick: p, className: hn, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: u, className: br, children: "Delete" })
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
      He,
      {
        open: f,
        onClose: h,
        title: "Clear run history?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(G, { children: [
          /* @__PURE__ */ e("button", { onClick: h, className: hn, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: g, className: br, children: "Clear history" })
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
      Cl,
      {
        open: x,
        onClose: m,
        currentDef: N,
        publishedDef: y,
        onJumpToNode: v
      }
    ),
    /* @__PURE__ */ e(
      Il,
      {
        open: w,
        onClose: b
      }
    )
  ] });
}
function $l({ runId: t, visible: r }) {
  const [n, a] = S(/* @__PURE__ */ new Map()), i = le(null), s = le(!0), d = le(null);
  ne(() => {
    t !== d.current && (d.current = t, a(/* @__PURE__ */ new Map()), s.current = !0);
  }, [t]);
  const c = D(() => {
    const g = i.current;
    if (!g) return;
    const x = g.scrollHeight - g.scrollTop - g.clientHeight < 30;
    s.current = x;
  }, []), l = D(() => {
    if (!s.current) return;
    const g = i.current;
    g && (g.scrollTop = g.scrollHeight);
  }, []), p = D(
    (g) => {
      if (!("eventType" in g)) return;
      const { eventType: x, payload: m } = g;
      if (!x.startsWith("pipeline.llm.")) return;
      const N = m?.runId;
      if (!t || N !== t) return;
      const y = m?.stepId;
      if (y) {
        if (x === "pipeline.llm.stream.opened")
          a((v) => {
            const w = new Map(v);
            return w.has(y) || w.set(y, {
              stepId: y,
              tokens: [],
              text: "",
              active: !0,
              summary: null,
              collapsed: !1,
              startedAt: Date.now()
            }), w;
          });
        else if (x === "pipeline.llm.token") {
          const v = m?.token;
          if (v === void 0) return;
          a((w) => {
            const b = new Map(w), k = b.get(y);
            if (k) {
              const C = {
                ...k,
                tokens: [...k.tokens, v],
                text: k.text + v,
                active: !0
              };
              b.set(y, C);
            } else
              b.set(y, {
                stepId: y,
                tokens: [v],
                text: v,
                active: !0,
                summary: null,
                collapsed: !1,
                startedAt: Date.now()
              });
            return b;
          });
        } else if (x === "pipeline.llm.response") {
          const v = m?.tokensIn, w = m?.tokensOut;
          a((b) => {
            const k = new Map(b), C = k.get(y), T = C ? Date.now() - C.startedAt : 0, $ = T > 1e3 ? `${(T / 1e3).toFixed(1)}s` : `${T}ms`, R = `${y}: ${v ?? "?"} tokens in, ${w ?? "?"} tokens out (${$})`;
            return C ? k.set(y, {
              ...C,
              active: !1,
              summary: R
            }) : k.set(y, {
              stepId: y,
              tokens: [],
              text: "",
              active: !1,
              summary: R,
              collapsed: !1,
              startedAt: Date.now()
            }), k;
          });
        }
      }
    },
    [t]
  );
  De("*", p), ne(() => {
    l();
  }, [n, l]);
  const u = D((g) => {
    a((x) => {
      const m = new Map(x), N = m.get(g);
      return N && m.set(g, { ...N, collapsed: !N.collapsed }), m;
    });
  }, []), f = q(() => {
    for (const g of n.values())
      if (g.active) return !0;
    return !1;
  }, [n]), h = q(() => Array.from(n.values()), [n]);
  return r ? /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col bg-[#1e1e2e] border-t border-[#313244] max-h-[320px] min-h-[160px] overflow-hidden relative",
      "data-testid": "live-output-panel",
      children: [
        /* @__PURE__ */ e("div", { className: "flex items-center justify-between py-2 px-[14px] bg-[#181825] border-b border-[#313244] shrink-0", children: /* @__PURE__ */ o("div", { className: "text-xs font-bold text-[#cdd6f4] tracking-[0.04em] uppercase flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { children: "Live Output" }),
          f && /* @__PURE__ */ e("span", { className: "w-1.5 h-1.5 rounded-full bg-[#a6e3a1] [animation:live-output-blink_1.2s_ease-in-out_infinite]" }),
          t && /* @__PURE__ */ o("span", { className: "text-[10px] text-[#6c7086] font-normal normal-case", children: [
            t.slice(0, 8),
            "..."
          ] })
        ] }) }),
        /* @__PURE__ */ e(
          "div",
          {
            ref: i,
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
              !g.collapsed && /* @__PURE__ */ o(G, { children: [
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
function Dt(t, r) {
  const n = new Blob([r], { type: "application/json" }), a = URL.createObjectURL(n), i = document.createElement("a");
  i.href = a, i.download = t, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(a);
}
function Ot(t, r) {
  if (!r) return "step";
  const n = t?.nodes.find((a) => a.id === r);
  return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : r;
}
function Tl(t) {
  const r = bt(), { toast: n } = sn(), { definition: a, selectedNodeId: i, setSelectedNodeId: s } = Ue(), d = le(r.runs);
  ne(() => {
    d.current = r.runs;
  }, [r.runs]);
  const c = le(a);
  ne(() => {
    c.current = a;
  }, [a]);
  const l = D(
    (M) => M ? d.current[M]?.pipelineId === t : !1,
    [t]
  ), [p, u] = S(null), [f, h] = S(null), g = D(() => {
    u(null), h(null);
  }, []), x = D(
    (M) => {
      h(M);
    },
    []
  ), m = D(
    (M) => {
      "eventType" in M || M.pipelineId === t && (n("Run started", { type: "info" }), u(null), h(null));
    },
    [t, n]
  ), N = D(
    (M) => {
      if ("eventType" in M || !l(M.runId)) return;
      const _ = Math.round(M.durationMs / 100) / 10;
      n(`Run completed in ${_}s`, { type: "success" });
    },
    [l, n]
  ), y = D(
    (M) => {
      if ("eventType" in M || !l(M.runId)) return;
      const _ = M.error.nodeId, de = Ot(c.current, _);
      n(`Run failed at ${de}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => s(_)
      }), u(M.error);
    },
    [l, s, n]
  ), v = D(
    (M) => {
      "eventType" in M || l(M.runId) && n("Run cancelled", { type: "warning" });
    },
    [l, n]
  ), w = D(
    (M) => {
      if ("eventType" in M || !l(M.runId)) return;
      const _ = M.stepId, de = Ot(c.current, _);
      n(`Approval requested on "${de}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => s(_)
      });
    },
    [l, s, n]
  );
  De("pipeline.run.started", m), De("pipeline.run.completed", N), De("pipeline.run.failed", y), De("pipeline.run.cancelled", v), De("pipeline.approval.requested", w);
  const [b, k] = S(null);
  ne(() => {
    if (r.activeRunIds.length > 0) {
      const M = r.activeRunIds[r.activeRunIds.length - 1];
      M !== b && k(M);
      return;
    }
    if (!b) {
      const M = Object.values(r.runs).sort(
        (_, de) => de.startedAt.localeCompare(_.startedAt)
      );
      M.length > 0 && k(M[0].id);
    }
  }, [r.activeRunIds, r.runs, b]);
  const C = b ? r.runs[b] : void 0, T = !!C && (C.status === "running" || C.status === "pending" || C.status === "awaiting_approval"), [$, R] = S(/* @__PURE__ */ new Set()), [E, A] = S(null), [j, W] = S(null), [ie, Y] = S(null), [te, O] = S(0), [P, H] = S(!1), [K, U] = S(null), V = D(
    (M, _) => {
      _ === null ? (W(null), Y(null)) : (W(_), Y(M));
    },
    []
  ), J = D((M) => {
    R((_) => {
      const de = new Set(_);
      return de.has(M) ? de.delete(M) : de.add(M), de;
    });
  }, []), X = D(async () => {
    if ($.size !== 0)
      try {
        const M = await r.triggerDebugRun(
          t,
          Array.from($)
        );
        k(M);
      } catch (M) {
        console.error("[PipelineEditor] triggerDebugRun failed", M);
      }
  }, [$, r, t]), pe = D(() => {
    E && (r.resolveBreakpoint(E.runId, E.stepId, "continue"), A(null));
  }, [E, r]), z = D(() => {
    E && (r.resolveBreakpoint(E.runId, E.stepId, "step_over"), A(null));
  }, [E, r]), ce = D(() => {
    E && (r.resolveBreakpoint(E.runId, E.stepId, "resume_all"), A(null));
  }, [E, r]), we = D(async () => {
    if (!(!E || !j || ie !== E.stepId) && Object.keys(j).length !== 0) {
      H(!0);
      try {
        await ia(
          t,
          E.runId,
          E.stepId,
          { mode: "merge", values: j }
        ), W(null), Y(null), O((M) => M + 1), r.resolveBreakpoint(E.runId, E.stepId, "continue"), A(null);
      } catch (M) {
        if (M instanceof sa)
          n(`Patch rejected: ${M.reason}`, { type: "error", durationMs: 8e3 });
        else if (M instanceof or)
          n(`Apply failed (HTTP ${M.status})`, { type: "error", durationMs: 6e3 });
        else {
          const _ = M instanceof Error ? M.message : String(M);
          n(`Apply failed: ${_}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        H(!1);
      }
    }
  }, [E, j, ie, t, r, n]), _e = D(
    async (M) => {
      if (E) {
        U(M);
        try {
          await la(
            t,
            E.runId,
            E.stepId,
            M
          ), n("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (_) {
          if (_ instanceof or)
            n(`Revert failed (HTTP ${_.status})`, { type: "error", durationMs: 6e3 });
          else {
            const de = _ instanceof Error ? _.message : String(_);
            n(`Revert failed: ${de}`, { type: "error", durationMs: 6e3 });
          }
        } finally {
          U(null);
        }
      }
    },
    [E, t, n]
  ), Ye = D(
    (M) => {
      if ("eventType" in M || !l(M.runId)) return;
      A({ runId: M.runId, stepId: M.stepId });
      const _ = Ot(c.current, M.stepId);
      n(`Paused at breakpoint: ${_}`, { type: "warning", durationMs: 6e3 });
    },
    [l, n]
  );
  De("pipeline.step.breakpoint", Ye);
  const Fe = D(
    (M) => {
      "eventType" in M || E && E.runId === M.runId && A(null);
    },
    [E]
  );
  De("pipeline.run.completed", Fe), De("pipeline.run.failed", Fe), De("pipeline.run.cancelled", Fe);
  const Ee = D(() => {
    p?.nodeId && (r.retryFromStep(p.nodeId), g());
  }, [p, r, g]), qe = a?.status === "published", je = !T && !qe, Ve = T ? "Cancel the active run" : qe ? "Start a new run" : "Publish the pipeline to enable runs", [Ie, xe] = S(!1), [oe, Q] = S({}), [ae, ue] = S(!1), [be, Pe] = S("config");
  ne(() => {
    i !== null && Pe("config");
  }, [i]);
  const Te = D(async (M) => {
    ue(!0);
    try {
      const _ = await r.triggerRun(t, M);
      k(_), Pe("runs"), n(`Pipeline triggered — run ${_.slice(0, 8)}…`, { type: "success" });
    } catch (_) {
      console.error("[PipelineEditor] triggerRun failed", _), n(`Trigger failed: ${_.message}`, { type: "error" });
    } finally {
      ue(!1);
    }
  }, [r, t, n]), Ge = D(async () => {
    if (T && b) {
      r.cancelRun(b);
      return;
    }
    je || Te();
  }, [T, b, je, r, Te]), zt = D(() => {
    xe(!1), Te(oe);
  }, [Te, oe]);
  return {
    currentRunId: b,
    setCurrentRunId: k,
    activeError: p,
    setActiveError: u,
    errorNodeAnchor: f,
    handleDismissError: g,
    handleErrorNodePosition: x,
    handleRetryFromError: Ee,
    handleRunClick: Ge,
    handleTriggerInputSubmit: zt,
    isRunActive: T,
    runDisabled: je,
    runTitle: Ve,
    isTriggering: ae,
    triggerInputOpen: Ie,
    setTriggerInputOpen: xe,
    triggerInputValues: oe,
    setTriggerInputValues: Q,
    breakpoints: $,
    handleToggleBreakpoint: J,
    handleDebugRunClick: X,
    pausedBreakpoint: E,
    handleBreakpointContinue: pe,
    handleBreakpointStepOver: z,
    handleBreakpointResumeAll: ce,
    handleApplyAndContinue: we,
    handleRevertPatch: _e,
    applyingPatch: P,
    revertingPatchId: K,
    dirtyPatch: j,
    dirtyPatchStepId: ie,
    handleContextEditBufferChange: V,
    resetEditBufferKey: te,
    sidebarTab: be,
    setSidebarTab: Pe
  };
}
function Al({
  isPublished: t,
  showTags: r,
  hasPublishedVersion: n,
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
        /* @__PURE__ */ e("button", { className: h, role: "menuitem", onClick: a, children: "Duplicate" }),
        /* @__PURE__ */ e(
          "button",
          {
            className: h,
            role: "menuitem",
            onClick: i,
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
            disabled: !n,
            children: "Revert to published"
          }
        ),
        /* @__PURE__ */ e("div", { className: "border-t border-slate-100 my-1" }),
        /* @__PURE__ */ e(
          "button",
          {
            className: h,
            role: "menuitem",
            onClick: c,
            "data-testid": "toggle-tags-row",
            children: r ? "Hide tags" : "Show tags"
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
        /* @__PURE__ */ e("div", { className: "border-t border-slate-100 my-1" }),
        /* @__PURE__ */ e(
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
const fn = {
  neutral: "bg-surface-hover text-text-secondary",
  success: "bg-success-bg text-success-fg",
  warning: "bg-warning-bg text-warning-fg",
  danger: "bg-danger-bg text-danger-fg",
  info: "bg-info-bg text-info-fg"
};
function Rl({
  pipelineId: t,
  definition: r,
  dirty: n,
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
  onViewVersions: N,
  onRevert: y,
  onToggleShowTags: v,
  showTags: w,
  onViewRunHistory: b,
  onClearRunHistory: k,
  onSimPanelOpen: C,
  onDelete: T
}) {
  const $ = Be(), { rename: R, setIcon: E, setSelectedNodeId: A } = Ue(), [j, W] = S(!1), [ie, Y] = S(""), te = le(null);
  ne(() => {
    j && (Y(r.name ?? ""), setTimeout(() => te.current?.focus(), 0));
  }, [j, r.name]);
  const O = () => {
    const oe = ie.trim();
    oe && oe !== r.name && R(oe), W(!1);
  }, P = r ? Oo(r) : null;
  (P?.errors.length ?? 0) > 0;
  const H = r.status === "published", K = n ? { label: "Saving…", variant: "info" } : a ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, U = r.status === "published" ? { label: `v${r.version} · Published`, variant: "success" } : typeof r.publishedVersion == "number" ? { label: `v${r.version} · Draft (pub v${r.publishedVersion})`, variant: "warning" } : { label: `v${r.version} · Draft`, variant: "neutral" }, V = P ? P.errors.length > 0 ? { label: `✗ ${P.errors.length} error${P.errors.length === 1 ? "" : "s"}`, variant: "danger" } : P.warnings.length > 0 ? { label: `⚠ ${P.warnings.length} warning${P.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [J, X] = S(!1), pe = le(null);
  ft(pe, () => X(!1), J);
  const z = P ? [...P.errors, ...P.warnings] : [], ce = (oe) => {
    oe && (A(oe), X(!1));
  }, we = r.nodes.filter((oe) => oe.type !== "trigger").length, _e = l ? Object.values(l.steps).filter(
    (oe) => oe.status === "completed" || oe.status === "skipped"
  ).length : 0, Fe = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), Ee = i && l ? { text: `Running (${_e}/${we} steps) · ${Fe}s`, variant: "running" } : l?.status === "completed" ? { text: `Completed in ${l.durationMs ? (l.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : l?.status === "failed" ? { text: `Failed at ${Ot(r, l.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, qe = {
    running: "bg-info-bg text-info-fg",
    success: "bg-success-bg text-success-fg",
    error: "bg-danger-bg text-danger-fg"
  }, je = i ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [Ve, Ie] = S(!1), xe = le(null);
  return ft(xe, () => Ie(!1), Ve), /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "h-11 shrink-0 flex items-center gap-2.5 px-3",
        "border-b border-border bg-surface",
        "sticky top-0 z-5"
      ),
      children: [
        /* @__PURE__ */ e(
          mt,
          {
            onClick: () => $("/pipelines"),
            "aria-label": "Back to pipelines",
            title: "Back to pipelines",
            children: "←"
          }
        ),
        /* @__PURE__ */ e(
          Ma,
          {
            value: r.icon ?? "🔀",
            onChange: E
          }
        ),
        j ? /* @__PURE__ */ e(
          "input",
          {
            ref: te,
            value: ie,
            onChange: (oe) => Y(oe.target.value),
            onBlur: O,
            onKeyDown: (oe) => {
              oe.key === "Enter" && O(), oe.key === "Escape" && (Y(r.name), W(!1));
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
            onClick: () => W(!0),
            className: I(
              "px-2 py-1 text-sm font-bold text-text-primary",
              "bg-transparent border border-transparent rounded-md",
              "cursor-text font-inherit max-w-[280px]",
              "overflow-hidden text-ellipsis whitespace-nowrap text-left"
            ),
            title: r.name,
            "data-testid": "pipeline-name",
            children: r.name
          }
        ),
        /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              fn[K.variant]
            ),
            "data-testid": "save-status",
            children: K.label
          }
        ),
        /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              fn[U.variant]
            ),
            "data-testid": "version-badge",
            children: U.label
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", ref: pe, children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => X((oe) => !oe),
              className: I(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
                "cursor-pointer border-none",
                fn[V.variant]
              ),
              "data-testid": "validation-indicator",
              children: V.label
            }
          ),
          J && z.length > 0 && /* @__PURE__ */ e(
            "div",
            {
              className: I(
                "absolute top-full mt-1.5 bg-surface border border-border rounded-lg",
                "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"
              ),
              children: z.map((oe, Q) => /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => ce(oe.nodeId),
                  className: I(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    oe.nodeId ? "cursor-pointer" : "cursor-default",
                    Q < z.length - 1 && "border-b border-border"
                  ),
                  children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: I(
                          "font-bold text-xs",
                          oe.severity === "error" ? "text-danger-fg" : "text-warning-fg"
                        ),
                        children: oe.severity === "error" ? "✗" : "⚠"
                      }
                    ),
                    /* @__PURE__ */ o("span", { className: "flex-1 text-xs", children: [
                      /* @__PURE__ */ e("div", { className: "font-semibold", children: oe.code }),
                      /* @__PURE__ */ e("div", { className: "text-text-secondary", children: oe.message }),
                      oe.nodeId && /* @__PURE__ */ e("div", { className: "mt-0.5 text-[11px] text-primary", children: "Jump to node →" })
                    ] })
                  ]
                },
                `${oe.code}-${Q}`
              ))
            }
          )
        ] }),
        Ee.variant !== "none" && /* @__PURE__ */ o(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap",
              qe[Ee.variant]
            ),
            "data-testid": "run-status-indicator",
            children: [
              Ee.variant === "running" && /* @__PURE__ */ e("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-primary rounded-full animate-spin" }),
              Ee.variant === "success" && "✓ ",
              Ee.variant === "error" && "✗ ",
              Ee.text
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex-1" }),
        /* @__PURE__ */ e(
          Oe,
          {
            variant: "secondary",
            onClick: () => $("/pipelines/metrics"),
            title: "View pipeline metrics dashboard",
            "data-testid": "metrics-button",
            children: "Metrics"
          }
        ),
        /* @__PURE__ */ e(
          Oe,
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
            title: H ? "Already published at this version" : "Publish pipeline to enable runs",
            disabled: H,
            className: I(
              "px-3 py-1.5 text-[13px] font-semibold border-none rounded-md font-inherit shrink-0",
              H ? "bg-surface-hover text-text-tertiary cursor-default opacity-70" : "bg-success text-white cursor-pointer"
            ),
            "data-testid": "publish-button",
            children: H ? "Published" : "Publish"
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
              i ? "bg-danger" : "bg-primary",
              d || s ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            ),
            "data-testid": "run-button",
            children: s ? /* @__PURE__ */ o("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ e("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-white rounded-full animate-spin" }),
              "Triggering…"
            ] }) : je
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
        /* @__PURE__ */ o("div", { className: "relative", ref: xe, children: [
          /* @__PURE__ */ e(
            mt,
            {
              onClick: () => Ie((oe) => !oe),
              "aria-label": "More actions",
              "data-testid": "overflow-menu-btn",
              children: "⋯"
            }
          ),
          Ve && /* @__PURE__ */ e(
            Al,
            {
              isPublished: H,
              showTags: w,
              onDuplicate: () => {
                x(), Ie(!1);
              },
              onCopyMermaid: () => {
                m(), Ie(!1);
              },
              onViewVersions: () => {
                N(), Ie(!1);
              },
              onRevert: () => {
                y(), Ie(!1);
              },
              onToggleShowTags: () => {
                v(), Ie(!1);
              },
              onViewRunHistory: () => {
                b(), Ie(!1);
              },
              onClearRunHistory: () => {
                k(), Ie(!1);
              },
              onSimPanelOpen: () => {
                C(), Ie(!1);
              },
              onDelete: () => {
                T(), Ie(!1);
              },
              hasPublishedVersion: typeof r.publishedVersion == "number"
            }
          )
        ] })
      ]
    }
  );
}
const Pl = 12;
function Ae(t) {
  return I("text-xs", {
    string: "text-[#a6e3a1]",
    number: "text-[#fab387]",
    boolean: "text-[#cba6f7]",
    null: "text-[#6c7086]",
    bracket: "text-[#9399b2]"
  }[t]);
}
function Ut({
  data: t,
  depth: r = 0,
  highlightKeys: n,
  keyName: a,
  isHighlighted: i = !1
}) {
  const [s, d] = S(r > 2);
  if (r > Pl)
    return /* @__PURE__ */ e("span", { className: Ae("string"), children: "[max depth]" });
  const c = i || a != null && n?.has(a);
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
        /* @__PURE__ */ e(Ut, { data: l, depth: r + 1, highlightKeys: n }),
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
      ] }) : /* @__PURE__ */ e("div", { className: "pl-4", children: l.map(([p, u], f) => {
        const h = n?.has(p) || i;
        return /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
          /* @__PURE__ */ e("span", { className: I(
            "text-xs font-medium text-[#89b4fa]",
            h && "text-[#a6e3a1] font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5"
          ), children: p }),
          /* @__PURE__ */ e("span", { className: Ae("bracket"), children: ": " }),
          /* @__PURE__ */ e(
            Ut,
            {
              data: u,
              depth: r + 1,
              highlightKeys: r === 0 ? n : void 0,
              keyName: p,
              isHighlighted: h
            }
          ),
          f < l.length - 1 && /* @__PURE__ */ e("span", { className: Ae("bracket"), children: "," })
        ] }, p);
      }) }),
      /* @__PURE__ */ e("span", { className: Ae("bracket"), children: "}" })
    ] });
  }
  return /* @__PURE__ */ e("span", { className: Ae("string"), children: String(t) });
}
function Ml({
  snapshots: t,
  activeStepId: r,
  fallbackActiveStepId: n,
  onStepSelect: a
}) {
  const i = r ?? n;
  return /* @__PURE__ */ e("div", { className: "w-[140px] shrink-0 border-r border-border overflow-y-auto", children: t.map((s, d) => {
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
function El(t) {
  return typeof t == "string" ? "string" : typeof t == "number" ? "number" : typeof t == "boolean" ? "boolean" : "object";
}
function Dl({ k: t, initial: r, onCommit: n, onError: a, onFocus: i }) {
  const [s, d] = S(() => {
    try {
      return JSON.stringify(r, null, 2);
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
      onFocus: i,
      onBlur: () => {
        try {
          const c = JSON.parse(s);
          n(c);
        } catch (c) {
          a(`Invalid JSON: ${c instanceof Error ? c.message : String(c)}`);
        }
      },
      className: "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono min-h-[60px] resize-y"
    }
  );
}
function Ol({
  inputContext: t,
  buffer: r,
  parseErrors: n,
  newKeyDraft: a,
  setNewKeyDraft: i,
  onCommitNewKey: s,
  onBeginEditKey: d,
  onSetValue: c,
  onRemoveKey: l,
  onParseError: p
}) {
  const u = q(() => {
    const h = /* @__PURE__ */ new Set([
      ...Object.keys(t),
      ...Object.keys(r)
    ]);
    return Array.from(h);
  }, [t, r]), f = "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono";
  return /* @__PURE__ */ o("div", { "data-testid": "context-edit-table", children: [
    u.map((h) => {
      const g = h in r, x = g ? r[h] : t[h], m = El(x), N = g;
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
                  N && "text-[#a6e3a1] font-bold"
                ),
                title: h,
                children: [
                  h,
                  N && /* @__PURE__ */ e("span", { className: "ml-1 text-[9px]", children: "●" })
                ]
              }
            ),
            /* @__PURE__ */ o("div", { className: "min-w-0", children: [
              m === "boolean" ? /* @__PURE__ */ o(
                "select",
                {
                  "data-testid": `context-edit-input-${h}`,
                  value: String(x),
                  onChange: (y) => c(h, y.target.value === "true"),
                  onFocus: () => d(h, x),
                  className: f,
                  children: [
                    /* @__PURE__ */ e("option", { value: "true", children: "true" }),
                    /* @__PURE__ */ e("option", { value: "false", children: "false" })
                  ]
                }
              ) : m === "number" ? /* @__PURE__ */ e(
                "input",
                {
                  "data-testid": `context-edit-input-${h}`,
                  type: "number",
                  value: String(x),
                  onChange: (y) => {
                    const v = y.target.value === "" ? 0 : Number(y.target.value);
                    c(h, Number.isNaN(v) ? 0 : v);
                  },
                  onFocus: () => d(h, x),
                  className: f
                }
              ) : m === "string" ? /* @__PURE__ */ e(
                "input",
                {
                  "data-testid": `context-edit-input-${h}`,
                  type: "text",
                  value: x ?? "",
                  onChange: (y) => c(h, y.target.value),
                  onFocus: () => d(h, x),
                  className: f
                }
              ) : /* @__PURE__ */ e(
                Dl,
                {
                  k: h,
                  initial: x,
                  onCommit: (y) => c(h, y),
                  onError: (y) => p(h, y),
                  onFocus: () => d(h, x)
                }
              ),
              n[h] && /* @__PURE__ */ e(
                "div",
                {
                  "data-testid": `context-edit-parse-error-${h}`,
                  className: "text-[#f38ba8] text-[11px] mt-1",
                  children: n[h]
                }
              )
            ] }),
            /* @__PURE__ */ e("div", { className: "flex gap-1", children: N && /* @__PURE__ */ e(
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
              value: a.key,
              onChange: (h) => i({ ...a, key: h.target.value }),
              className: f
            }
          ),
          /* @__PURE__ */ e(
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
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              "data-testid": "context-edit-add-btn",
              onClick: s,
              disabled: !a.key.trim(),
              className: I(
                "px-2.5 py-0.5 text-[11px] font-semibold border rounded-sm cursor-pointer font-mono",
                a.key.trim() ? "bg-[#a6e3a1] text-[#1e1e2e] border-[#a6e3a1]" : "bg-transparent text-[#45475a] border-[#313244] cursor-not-allowed"
              ),
              children: "+ Add field"
            }
          )
        ]
      }
    )
  ] });
}
function _l(t, r, n) {
  const a = { ...t }, i = { ...a.steps ?? {} };
  return i[r] = n, a.steps = i, n && typeof n == "object" && !Array.isArray(n) && Object.assign(a, n), a;
}
function Ll(t, r) {
  const n = [];
  for (const a of Object.keys(r))
    a in t || n.push(a);
  return n;
}
function Bl(t) {
  const r = Object.values(t.steps).filter((i) => i != null).sort((i, s) => {
    const d = i.startedAt ? Date.parse(i.startedAt) : 0, c = s.startedAt ? Date.parse(s.startedAt) : 0;
    return d - c;
  }), n = [];
  let a = {};
  t.triggeredBy?.payload && typeof t.triggeredBy.payload == "object" && (a = { ...t.triggeredBy.payload });
  for (const i of r) {
    const s = { ...a }, d = i.output, c = i.llm?.prompt;
    let l;
    if (d !== void 0)
      l = _l(a, i.nodeId, d);
    else {
      l = { ...a };
      const u = {
        ...l.steps ?? {}
      };
      u[i.nodeId] = d, l.steps = u;
    }
    const p = Ll(s, l);
    n.push({
      stepId: i.nodeId,
      inputContext: s,
      output: d,
      outputContext: l,
      resolvedPrompt: c || void 0,
      newKeys: p,
      stepExecution: i
    }), a = l;
  }
  return n;
}
function Ul(t, r) {
  const [n, a] = S(/* @__PURE__ */ new Map()), [i, s] = S(
    /* @__PURE__ */ new Map()
  ), d = le(null);
  ne(() => {
    const h = t?.id ?? null;
    h !== d.current && (d.current = h, a(/* @__PURE__ */ new Map()), s(/* @__PURE__ */ new Map()));
  }, [t?.id]);
  const c = D(
    (h) => {
      if (!h || typeof h != "object") return;
      const { eventType: g, payload: x } = h;
      if (!x || typeof x != "object") return;
      const m = x, N = m.runId;
      if (!(!t?.id || N !== t.id)) {
        if (g === "pipeline.llm.prompt") {
          const y = m.stepId, v = m.prompt;
          y && v && a((w) => {
            const b = new Map(w);
            return b.set(y, v), b;
          });
        }
        if (g === "pipeline.run.checkpoint" || g === "pipeline.run.checkpointed" || g === "pipeline:run:checkpoint" || g === "pipeline:run:checkpointed") {
          const y = m.context, v = m.stepId;
          y && v && s((w) => {
            const b = new Map(w);
            return b.set(v, y), b;
          });
        }
      }
    },
    [t?.id]
  );
  De("*", c);
  const l = q(() => t ? Bl(t) : [], [t]), p = q(() => l.map((h) => {
    const g = n.get(h.stepId), x = i.get(h.stepId);
    return {
      ...h,
      resolvedPrompt: h.resolvedPrompt || g,
      outputContext: x ?? h.outputContext
    };
  }), [l, n, i]), u = q(() => r ? p.find((h) => h.stepId === r) ?? null : p[p.length - 1] ?? null, [p, r]), f = q(() => u ? new Set(u.newKeys) : /* @__PURE__ */ new Set(), [u]);
  return { enrichedSnapshots: p, activeSnapshot: u, newKeysSet: f };
}
function yr({ attempt: t, label: r }) {
  const n = !t.error;
  return /* @__PURE__ */ o("div", { className: "bg-[#11111b] rounded-md border border-[#313244] p-2.5 overflow-auto", children: [
    /* @__PURE__ */ e("div", { className: "text-[11px] font-bold text-[#cdd6f4] mb-2", children: r }),
    /* @__PURE__ */ o("div", { className: "flex gap-1.5 mb-1.5 items-center", children: [
      /* @__PURE__ */ e("span", { className: I(
        "text-[10px] font-semibold px-1.5 py-px rounded-sm",
        n ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
      ), children: n ? "OK" : "FAIL" }),
      t.durationMs != null && /* @__PURE__ */ o("span", { className: "text-[10px] text-[#6c7086]", children: [
        t.durationMs,
        "ms"
      ] })
    ] }),
    t.error && /* @__PURE__ */ e("div", { className: "text-[11px] text-[#f38ba8] font-mono mb-1.5 px-2 py-1.5 bg-[#1a0f14] rounded whitespace-pre-wrap break-words", children: t.error }),
    t.output !== void 0 && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: "text-[10px] text-[#6c7086] font-semibold mb-1 uppercase", children: "Output" }),
      /* @__PURE__ */ e(Ut, { data: t.output, depth: 0 })
    ] })
  ] });
}
function Fl({
  run: t,
  activeStepId: r,
  onStepSelect: n,
  editable: a = !1,
  onEditBufferChange: i,
  resetEditBufferKey: s
}) {
  const [d, c] = S("input"), [l, p] = S(0), [u, f] = S(!1), [h, g] = S({}), [x, m] = S(null), [N, y] = S({}), [v, w] = S({
    key: "",
    value: ""
  }), { enrichedSnapshots: b, activeSnapshot: k, newKeysSet: C } = Ul(t, r), T = k?.resolvedPrompt != null, $ = k?.stepExecution.attempts, R = ($?.length ?? 0) >= 2;
  ne(() => {
    d === "prompt" && !T && c("input"), d === "attempts" && !R && c("input");
  }, [d, T, R]), ne(() => {
    p(0);
  }, [r]);
  const E = !!(t && t.status === "paused_at_breakpoint" && r && (t.currentStepIds?.includes(r) || k?.stepExecution.status === "running" || k?.stepExecution.status === "awaiting" || k?.stepExecution.status === "pending")), A = !!a && !!E;
  ne(() => {
    A ? x && x !== r && (g({}), m(null), y({})) : (u && f(!1), Object.keys(h).length > 0 && g({}), x && m(null), Object.keys(N).length > 0 && y({}));
  }, [A, r]), ne(() => {
    s !== void 0 && (g({}), m(null), y({}), w({ key: "", value: "" }));
  }, [s]), ne(() => {
    !A || !r || i && (Object.keys(h).length === 0 ? i(r, null) : i(r, h));
  }, [h, A, r]);
  const j = D(
    (P, H) => {
      m(r), g((K) => P in K ? K : { ...K, [P]: H });
    },
    [r]
  ), W = D(
    (P, H) => {
      m(r), g((K) => ({ ...K, [P]: H })), y((K) => {
        if (!(P in K)) return K;
        const U = { ...K };
        return delete U[P], U;
      });
    },
    [r]
  ), ie = D((P) => {
    g((H) => {
      if (!(P in H)) return H;
      const K = { ...H };
      return delete K[P], K;
    }), y((H) => {
      if (!(P in H)) return H;
      const K = { ...H };
      return delete K[P], K;
    });
  }, []), Y = D((P, H) => {
    y((K) => ({ ...K, [P]: H }));
  }, []), te = D(() => {
    g({}), m(null), y({}), w({ key: "", value: "" });
  }, []), O = D(() => {
    const P = v.key.trim();
    if (!P) return;
    let H = v.value;
    const K = v.value;
    if (K.trim().length > 0)
      try {
        H = JSON.parse(K);
      } catch {
        H = K;
      }
    W(P, H), w({ key: "", value: "" });
  }, [v, W]);
  return !t || b.length === 0 ? /* @__PURE__ */ o("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
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
      { id: "prompt", label: "Resolved Prompt", show: T },
      { id: "details", label: "Details", show: !0 },
      { id: "attempts", label: `Attempts (${$?.length})`, show: R }
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
        Ml,
        {
          snapshots: b,
          activeStepId: r,
          fallbackActiveStepId: k?.stepId,
          onStepSelect: n
        }
      ),
      /* @__PURE__ */ e("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs", children: k ? d === "input" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ o("div", { className: "text-[10px] text-[#6c7086] font-semibold uppercase", children: [
            "Input context",
            k.stepId ? ` — step ${k.stepId.slice(0, 8)}` : ""
          ] }),
          A && /* @__PURE__ */ o("div", { className: "flex gap-1.5 items-center", children: [
            u && Object.keys(h).length > 0 && /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: te,
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
                  f(P), P || te();
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
        Object.keys(k.inputContext).length === 0 && !(A && u) ? /* @__PURE__ */ e("div", { className: "text-[#6c7086] text-xs italic", children: "No input context (first step or no upstream output)" }) : A && u ? /* @__PURE__ */ e(
          Ol,
          {
            inputContext: k.inputContext,
            buffer: h,
            parseErrors: N,
            newKeyDraft: v,
            setNewKeyDraft: w,
            onCommitNewKey: O,
            onBeginEditKey: j,
            onSetValue: W,
            onRemoveKey: ie,
            onParseError: Y
          }
        ) : /* @__PURE__ */ e(
          Ut,
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
        /* @__PURE__ */ e(Ut, { data: k.output }),
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
              k.stepExecution.completedAt && /* @__PURE__ */ o(G, { children: [
                /* @__PURE__ */ e("br", {}),
                "Completed: ",
                k.stepExecution.completedAt,
                k.stepExecution.durationMs != null && /* @__PURE__ */ o(G, { children: [
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
              k.stepExecution.llm.firstTokenLatencyMs != null && /* @__PURE__ */ o(G, { children: [
                /* @__PURE__ */ e("br", {}),
                "First token latency: ",
                k.stepExecution.llm.firstTokenLatencyMs,
                "ms"
              ] })
            ] }),
            k.stepExecution.llm.response && /* @__PURE__ */ o(G, { children: [
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
            k.stepExecution.approvals.map((P, H) => /* @__PURE__ */ o("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2", children: [
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
            ] }, H))
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Status" }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-[#cdd6f4]", children: k.stepExecution.status })
          ] })
        ] })
      ] }) : d === "attempts" && $ && $.length >= 2 ? /* @__PURE__ */ o("div", { children: [
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
                $.length
              ]
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              "data-testid": "attempts-next",
              disabled: l >= $.length - 2,
              onClick: () => p((P) => P + 1),
              className: I(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l >= $.length - 2 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "→"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ e(yr, { attempt: $[l], label: `Attempt ${l + 1}` }),
          /* @__PURE__ */ e(yr, { attempt: $[l + 1], label: `Attempt ${l + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function jl({
  definition: t,
  pausedBreakpoint: r,
  applyingPatch: n,
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
  const x = bt().runs[r.runId] ?? null, N = x?.steps?.[r.stepId]?.patches ?? [], y = !!i && s === r.stepId && Object.keys(i).length > 0, v = x?.status === "paused_at_breakpoint";
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
            Ot(t, r.stepId)
          ] }),
          y && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: u,
              disabled: n,
              "data-testid": "breakpoint-apply-continue-btn",
              className: I(
                "px-3 py-1 text-xs font-semibold bg-success-bg text-text-primary",
                "border-none rounded cursor-pointer font-inherit",
                n && "cursor-wait opacity-70"
              ),
              children: n ? "Applying…" : "Apply & Continue"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: c,
              disabled: n,
              className: I(
                "px-3 py-1 text-xs font-semibold bg-warning text-white",
                "border-none rounded font-inherit",
                n ? "cursor-not-allowed opacity-60" : "cursor-pointer"
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
              disabled: n,
              className: I(
                "px-3 py-1 text-xs font-semibold bg-transparent text-warning-fg",
                "border border-warning rounded font-inherit",
                n ? "cursor-not-allowed opacity-60" : "cursor-pointer"
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
              disabled: n,
              className: I(
                "px-3 py-1 text-xs font-semibold bg-transparent text-warning-fg",
                "border border-warning rounded font-inherit",
                n ? "cursor-not-allowed opacity-60" : "cursor-pointer"
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
                Fl,
                {
                  run: x,
                  activeStepId: r.stepId,
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
                      N.length,
                      ")"
                    ] }),
                    N.length === 0 ? /* @__PURE__ */ e(
                      "div",
                      {
                        className: "text-[11px] text-text-tertiary italic",
                        "data-testid": "breakpoint-patch-history-empty",
                        children: "No patches applied yet."
                      }
                    ) : /* @__PURE__ */ e("div", { className: "flex flex-col gap-2", children: N.map((w) => {
                      const b = !!w.revertedAt;
                      return /* @__PURE__ */ o(
                        "div",
                        {
                          "data-testid": `breakpoint-patch-row-${w.patchId}`,
                          className: I(
                            "border border-border rounded p-1.5",
                            b ? "bg-gray-500/10 opacity-60" : "bg-[#11111b]"
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
                              b && /* @__PURE__ */ e("span", { className: "px-1 text-[9px] font-bold bg-gray-500/20 text-text-tertiary rounded-sm", children: "Reverted" })
                            ] }),
                            /* @__PURE__ */ o("div", { className: "text-[10px] text-[#9399b2]", children: [
                              w.appliedAt,
                              w.appliedBy && /* @__PURE__ */ o(G, { children: [
                                " · ",
                                /* @__PURE__ */ e("span", { className: "text-[#cdd6f4]", children: w.appliedBy })
                              ] })
                            ] }),
                            !b && /* @__PURE__ */ e(
                              "button",
                              {
                                type: "button",
                                "data-testid": `breakpoint-patch-revert-${w.patchId}`,
                                onClick: () => f(w.patchId),
                                disabled: !v || a === w.patchId,
                                title: v ? "Revert this patch" : "Run has progressed past this breakpoint — revert no longer allowed",
                                className: I(
                                  "mt-1 px-2 py-0.5 text-[10px] font-semibold bg-transparent rounded-sm font-inherit",
                                  v ? "text-danger-fg border border-danger cursor-pointer" : "text-gray-700 border border-gray-700 cursor-not-allowed",
                                  a === w.patchId && "cursor-not-allowed"
                                ),
                                children: a === w.patchId ? "Reverting…" : "Revert"
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
function Ne({ label: t, required: r, help: n, error: a, children: i, className: s }) {
  return /* @__PURE__ */ o("div", { className: I("flex flex-col", s), children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary", children: [
      t,
      r && /* @__PURE__ */ e("span", { className: "text-[#dc2626] ml-1", children: "●" })
    ] }),
    /* @__PURE__ */ e("div", { className: "mt-1", children: i }),
    a && /* @__PURE__ */ e("div", { className: "text-[11px] text-[#dc2626] mt-0.5", children: a }),
    !a && n && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: n })
  ] });
}
function zl({ title: t, defaultCollapsed: r = !1, children: n, className: a }) {
  const [i, s] = S(r);
  return /* @__PURE__ */ o("div", { className: I("flex flex-col", a), children: [
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => s((d) => !d),
        className: "flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer font-inherit text-xs font-semibold text-text-secondary",
        children: [
          /* @__PURE__ */ e("span", { children: i ? "▸" : "▾" }),
          " ",
          t
        ]
      }
    ),
    !i && /* @__PURE__ */ e("div", { className: "flex flex-col gap-3 mt-2", children: n })
  ] });
}
function ye({ children: t, className: r }) {
  return /* @__PURE__ */ e("div", { className: I("flex flex-col gap-3 px-4 py-3", r), children: t });
}
const ql = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function Vl(t, r, n) {
  const a = t.trim();
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
    if (!Number.isFinite(c) || !Number.isFinite(l) || c < r || l > n || c > l) return null;
    const p = [];
    for (let u = c; u <= l; u++) p.push(u);
    return { match: p };
  }
  if (a.includes(",")) {
    const c = a.split(","), l = /* @__PURE__ */ new Set(), p = [];
    for (const u of c) {
      const f = Number(u.trim());
      if (!Number.isFinite(f) || !Number.isInteger(f) || f < r || f > n) return null;
      l.has(f) || (l.add(f), p.push(f));
    }
    return p.length === 0 ? null : { match: p };
  }
  const d = Number(a);
  return !Number.isFinite(d) || !Number.isInteger(d) || d < r || d > n ? null : { match: [d] };
}
function Wl(t) {
  if (typeof t != "string") return null;
  const r = t.trim().split(/\s+/);
  if (r.length !== 5) return null;
  const n = {};
  for (let a = 0; a < 5; a++) {
    const i = ql[a], s = Vl(r[a], i.min, i.max);
    if (!s) return null;
    n[i.name] = s;
  }
  return n;
}
function Nt(t, r, n) {
  return t.match === "*" ? !t.step || t.step === 1 ? !0 : (r - n) % t.step === 0 : t.match.includes(r);
}
function Jl(t, r) {
  return Nt(t.minute, r.getMinutes(), 0) && Nt(t.hour, r.getHours(), 0) && Nt(t.dayOfMonth, r.getDate(), 1) && Nt(t.month, r.getMonth() + 1, 1) && Nt(t.dayOfWeek, r.getDay(), 0);
}
function Hl(t, r, n) {
  const a = [], i = new Date(r.getTime());
  i.setSeconds(0, 0), i.setMinutes(i.getMinutes() + 1);
  const s = 1440 * 366, d = new Date(i.getTime());
  for (let c = 0; c < s && a.length < n; c++)
    Jl(t, d) && a.push(new Date(d.getTime())), d.setMinutes(d.getMinutes() + 1);
  return a;
}
const vr = /^[a-zA-Z0-9_-]{1,64}$/, Gl = "http://localhost:13001";
function Kl() {
  try {
    const t = localStorage.getItem("ws_document_types_v1");
    if (!t) return [];
    const r = JSON.parse(t);
    return Array.isArray(r) ? r.filter((n) => typeof n == "object" && n !== null).filter((n) => typeof n.id == "string" && typeof n.name == "string").map((n) => ({ id: n.id, name: n.name })) : [];
  } catch {
    return [];
  }
}
const Yl = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function Xl({ data: t, onChange: r }) {
  const { toast: n } = sn(), i = wo(ca)?.definition?.triggerBinding?.webhookSecret, [s, d] = S(!1), c = t.triggerType.startsWith("document."), l = q(() => c ? Kl() : [], [c]), p = c && !t.documentTypeId, u = t.triggerType === "schedule" && !t.schedule, f = t.triggerType === "webhook" && !t.webhookPath, h = t.webhookPath ?? "", g = t.triggerType === "webhook" && h.length > 0 && !vr.test(h), x = t.triggerType === "webhook" && vr.test(h) ? `${Gl}/hooks/pipeline/${h}` : null, m = () => {
    x && navigator.clipboard.writeText(x).then(() => n("Webhook URL copied", { type: "success" })).catch(() => n("Could not copy webhook URL", { type: "error" }));
  }, N = () => {
    i && navigator.clipboard.writeText(i).then(() => n("Webhook secret copied", { type: "success" })).catch(() => n("Could not copy webhook secret", { type: "error" }));
  }, y = t.triggerType === "schedule" ? t.schedule ?? "" : "", v = q(
    () => y ? Wl(y) : null,
    [y]
  ), w = q(() => v ? Hl(v, /* @__PURE__ */ new Date(), 3) : [], [v]), b = t.triggerType === "schedule" && !!y && !v, k = t.triggerType === "document.finalize" ? "On finalize" : t.triggerType === "document.submit" ? "On submit for review" : t.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ e(Ne, { label: "Trigger type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.triggerType,
        onChange: (C) => r({ triggerType: C.target.value }),
        children: Yl.map((C) => /* @__PURE__ */ e("option", { value: C.value, children: C.label }, C.value))
      }
    ) }),
    c && /* @__PURE__ */ o(
      Ne,
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
              onChange: (C) => r({ documentTypeId: C.target.value || void 0 }),
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
      Ne,
      {
        label: "Schedule (cron)",
        required: !0,
        error: u ? "Cron expression is required." : b ? "Invalid cron expression — supports *, */N, N,M, A-B, exact values." : void 0,
        help: !u && !b ? "5-field cron: minute hour day month weekday." : void 0,
        children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              className: I(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                u || b ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "*/15 * * * *",
              value: t.schedule ?? "",
              onChange: (C) => r({ schedule: C.target.value })
            }
          ),
          /* @__PURE__ */ e("div", { className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono", children: w.length > 0 ? /* @__PURE__ */ o(G, { children: [
            /* @__PURE__ */ e("div", { className: "text-text-secondary mb-1", children: "Next 3 fires:" }),
            w.map((C, T) => /* @__PURE__ */ e("div", { children: C.toLocaleString() }, T))
          ] }) : /* @__PURE__ */ e("span", { children: "Next fires: enter a valid cron expression to preview." }) })
        ]
      }
    ),
    t.triggerType === "webhook" && /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e(
        Ne,
        {
          label: "Path",
          required: !0,
          error: f ? "Webhook path is required." : g ? "Path must be alphanumeric (plus _, -)" : void 0,
          help: !f && !g ? "Alphanumeric, _, or - (max 64 chars). No leading slash." : void 0,
          children: /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              className: I(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                f || g ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "weekly-digest",
              value: h,
              onChange: (C) => r({ webhookPath: C.target.value })
            }
          )
        }
      ),
      /* @__PURE__ */ e("div", { className: "p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: x ? /* @__PURE__ */ o(G, { children: [
        /* @__PURE__ */ o("span", { className: "flex-1", children: [
          /* @__PURE__ */ e("span", { className: "font-sans text-text-tertiary mr-1", children: "Full URL:" }),
          x
        ] }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: m,
            className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
            children: "Copy"
          }
        )
      ] }) : /* @__PURE__ */ e("span", { className: "font-sans text-text-tertiary", children: "Set a path above to see the URL" }) }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("label", { className: "text-xs font-semibold text-text-secondary", children: "Signing secret" }),
        /* @__PURE__ */ e("div", { className: "mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: i ? /* @__PURE__ */ o(G, { children: [
          /* @__PURE__ */ e("span", { className: "flex-1", "aria-label": "webhook secret", children: s ? i : "•".repeat(32) }),
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
              onClick: N,
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
const Nr = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, Ql = 3e4;
function Zl(t) {
  return t < 1e3 ? `${Math.round(t)}ms` : t < 6e4 ? `${(t / 1e3).toFixed(t < 1e4 ? 1 : 0)}s` : `${Math.round(t / 6e4)}m`;
}
function ec(t) {
  const r = [];
  for (let n = 1; n < t.maxAttempts; n++) {
    const a = t.backoffMs * Math.pow(t.backoffMultiplier, n - 1);
    r.push(Math.min(a, Ql));
  }
  return r;
}
function er({ value: t, onChange: r }) {
  const n = t !== void 0, a = t ?? Nr, i = n ? ec(a) : [], d = i.reduce((c, l) => c + l, 0) > 300 * 1e3;
  return /* @__PURE__ */ o("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "checkbox",
          checked: n,
          onChange: (c) => r(c.target.checked ? Nr : void 0),
          "aria-label": "Enable retries"
        }
      ),
      "Retry policy"
    ] }),
    !n && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", children: "No retries — failure is terminal on first attempt." }),
    n && /* @__PURE__ */ o(G, { children: [
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
              value: a.maxAttempts,
              onChange: (c) => {
                const l = Math.max(1, Math.min(10, parseInt(c.target.value, 10) || 1));
                r({ ...a, maxAttempts: l });
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
              value: a.backoffMs,
              onChange: (c) => {
                const l = Math.max(0, parseInt(c.target.value, 10) || 0);
                r({ ...a, backoffMs: l });
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
              value: a.backoffMultiplier,
              onChange: (c) => {
                const l = Math.max(1, Math.min(4, parseFloat(c.target.value) || 1));
                r({ ...a, backoffMultiplier: l });
              },
              "aria-label": "Backoff multiplier"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: a.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : i.length === 0 ? `Retries up to ${a.maxAttempts}× with no delay.` : `Retries up to ${a.maxAttempts}× with delays: ${i.map(Zl).join(", ")}.` }),
      d && /* @__PURE__ */ e("div", { className: "text-[11px] text-[#ca8a04] mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const wr = {
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
}, tc = [
  "context.doc.body",
  "context.doc.title",
  "context.trigger.userId",
  "context.steps"
], Lo = {
  "context.doc.body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "context.doc.title": "Sample Document Title",
  "context.trigger.userId": "user_abc123",
  "context.steps": '["step-1: fetched document", "step-2: validated schema"]'
};
function kr(t) {
  return t.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (r, n) => Lo[n] ?? `{{${n}}}`);
}
function nc({ data: t, onChange: r }) {
  const [n, a] = S(!1), i = !t.systemPrompt?.trim(), s = !t.userPromptTemplate?.trim(), d = (c) => {
    const l = wr[c], p = l.includes(t.model) ? t.model : l[0];
    r({ provider: c, model: p });
  };
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ e(Ne, { label: "Provider", required: !0, children: /* @__PURE__ */ o(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.provider,
        onChange: (c) => d(c.target.value),
        children: [
          /* @__PURE__ */ e("option", { value: "anthropic", children: "Anthropic" }),
          /* @__PURE__ */ e("option", { value: "bedrock", children: "Bedrock" }),
          /* @__PURE__ */ e("option", { value: "claude-code", children: "Claude Code (subprocess)" })
        ]
      }
    ) }),
    /* @__PURE__ */ e(Ne, { label: "Model", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.model,
        onChange: (c) => r({ model: c.target.value }),
        children: wr[t.provider].map((c) => /* @__PURE__ */ e("option", { value: c, children: c }, c))
      }
    ) }),
    /* @__PURE__ */ e(
      Ne,
      {
        label: "System prompt",
        required: !0,
        error: i ? "System prompt is required." : void 0,
        help: i ? void 0 : "Sets the model's role and constraints.",
        children: /* @__PURE__ */ e(
          "textarea",
          {
            className: I(
              "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]",
              i ? "border-[#dc2626]" : "border-border-field"
            ),
            value: t.systemPrompt,
            onChange: (c) => r({ systemPrompt: c.target.value })
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      Ne,
      {
        label: "User prompt template",
        required: !0,
        error: s ? "User prompt template is required." : void 0,
        help: s ? void 0 : "Supports {{ context.* }} substitution — click a pill above to insert.",
        children: /* @__PURE__ */ e(
          Kn,
          {
            value: t.userPromptTemplate,
            onChange: (c) => r({ userPromptTemplate: c }),
            language: "template",
            variables: tc,
            minLines: 6,
            "aria-label": "User prompt template"
          }
        )
      }
    ),
    /* @__PURE__ */ o(zl, { title: "Advanced", defaultCollapsed: !0, children: [
      /* @__PURE__ */ o(
        Ne,
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
                onChange: (c) => r({ temperature: parseFloat(c.target.value) }),
                className: "w-full mt-1"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ e(Ne, { label: "Max tokens", help: "Upper bound on response length.", children: /* @__PURE__ */ e(
        "input",
        {
          type: "number",
          min: 1,
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
          value: t.maxTokens ?? "",
          onChange: (c) => {
            const l = c.target.value;
            r({ maxTokens: l === "" ? void 0 : Math.max(1, parseInt(l, 10) || 0) });
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
              onChange: (c) => r({ streaming: c.target.checked })
            }
          ),
          "Streaming"
        ] }),
        /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Stream tokens as they are generated." })
      ] }),
      /* @__PURE__ */ e(
        er,
        {
          value: t.retryPolicy,
          onChange: (c) => r({ retryPolicy: c })
        }
      )
    ] }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => a((c) => !c),
        className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit shrink-0",
        children: [
          n ? "▾" : "▶",
          " Preview with sample context"
        ]
      }
    ),
    n && /* @__PURE__ */ o("div", { className: "bg-surface-inset border border-border rounded-lg p-3 flex flex-col gap-2.5", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved system prompt" }),
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: kr(t.systemPrompt || "(empty)") })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: kr(t.userPromptTemplate || "(empty)") })
      ] }),
      /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary", children: [
        "Sample values: ",
        Object.keys(Lo).map((c) => `{{${c}}}`).join(", ")
      ] })
    ] })
  ] });
}
const rc = ["context", "context.steps", "context.trigger"], oc = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function ac({ data: t, onChange: r }) {
  const n = !t.expression?.trim();
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ e(Ne, { label: "Type", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: oc.map((a) => /* @__PURE__ */ o(
      "label",
      {
        className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
        children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "radio",
              name: "transform-type",
              value: a.value,
              checked: t.transformType === a.value,
              onChange: () => r({ transformType: a.value })
            }
          ),
          a.label
        ]
      },
      a.value
    )) }) }),
    /* @__PURE__ */ e(
      Ne,
      {
        label: "Expression",
        required: !0,
        error: n ? "Expression is required." : void 0,
        help: n ? void 0 : t.transformType === "jsonpath" ? 'e.g. $.items[?(@.status == "active")]' : t.transformType === "template" ? "Mustache-style: {{ context.doc.title }}" : t.transformType === "javascript" ? "return ctx.items.filter(x => x.active)" : void 0,
        children: /* @__PURE__ */ e(
          Kn,
          {
            value: t.expression,
            onChange: (a) => r({ expression: a }),
            language: t.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: rc,
            "aria-label": "Transform expression"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      Ne,
      {
        label: "Output key (optional)",
        help: `If set, writes to context.${t.outputKey || "outputKey"}. Otherwise merges into root context.`,
        children: /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
            value: t.outputKey ?? "",
            onChange: (a) => r({ outputKey: a.target.value || void 0 }),
            placeholder: "activeItems"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      er,
      {
        value: t.retryPolicy,
        onChange: (a) => r({ retryPolicy: a })
      }
    ),
    /* @__PURE__ */ e(Ne, { label: "Preview", children: /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2", children: [
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
const ic = ["context.trigger", "context.steps"];
function sc({ data: t, onChange: r }) {
  const n = !t.expression?.trim();
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ e(
      Ne,
      {
        label: "Expression",
        required: !0,
        error: n ? "Expression is required." : void 0,
        help: n ? void 0 : "e.g. context.llm.response.length > 500",
        children: /* @__PURE__ */ e(
          Kn,
          {
            value: t.expression,
            onChange: (a) => r({ expression: a }),
            language: "javascript",
            variables: ic,
            "aria-label": "Condition expression"
          }
        )
      }
    ),
    /* @__PURE__ */ e(Ne, { label: "Label (optional — shown on node face)", help: "A short name so this branch is easy to spot.", children: /* @__PURE__ */ e(
      "input",
      {
        type: "text",
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.label ?? "",
        onChange: (a) => r({ label: a.target.value || void 0 }),
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
const lc = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], cc = {
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
function dc({ data: t, onChange: r }) {
  const n = cc[t.actionType], a = t.config ?? {}, i = typeof a.retryCount == "number" ? a.retryCount : 3, s = t.onError === "route-error" ? "route-error" : typeof a.retryCount == "number" ? "retry" : "halt", d = (l, p) => {
    r({ config: { ...a, [l]: p } });
  }, c = (l) => {
    if (l === "route-error") {
      const { retryCount: p, ...u } = a;
      r({ onError: "route-error", config: u });
    } else if (l === "halt") {
      const { retryCount: p, ...u } = a;
      r({ onError: "fail-run", config: u });
    } else
      r({ onError: "fail-run", config: { ...a, retryCount: i } });
  };
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ e(Ne, { label: "Action type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.actionType,
        onChange: (l) => r({ actionType: l.target.value, config: {} }),
        children: lc.map((l) => /* @__PURE__ */ e("option", { value: l.value, children: l.label }, l.value))
      }
    ) }),
    /* @__PURE__ */ e(Ne, { label: "Configuration", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-2.5", children: n.map((l) => /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { className: "text-[11px] font-semibold text-text-secondary", children: l.label }),
      l.multiline ? /* @__PURE__ */ e(
        "textarea",
        {
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[48px] mt-0.5",
          rows: 2,
          placeholder: l.placeholder,
          value: typeof a[l.key] == "string" ? a[l.key] : "",
          onChange: (p) => d(l.key, p.target.value)
        }
      ) : /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit mt-0.5",
          placeholder: l.placeholder,
          value: typeof a[l.key] == "string" ? a[l.key] : "",
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
            onChange: (l) => r({ idempotent: l.target.checked })
          }
        ),
        "Idempotent"
      ] }),
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "This action is safe to retry." })
    ] }),
    t.idempotent && /* @__PURE__ */ o(Ne, { label: "Dedup scope", children: [
      /* @__PURE__ */ o(
        "select",
        {
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
          value: t.idempotencyMode ?? "per-step",
          onChange: (l) => r({ idempotencyMode: l.target.value }),
          children: [
            /* @__PURE__ */ e("option", { value: "per-step", children: "Per step — fire once regardless of retries" }),
            /* @__PURE__ */ e("option", { value: "per-attempt", children: "Per attempt — fire once per retry window" })
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: (t.idempotencyMode ?? "per-step") === "per-step" ? "Retries skip this action if it already succeeded. Best for post-comment, notify." : "Each retry attempt can execute the action. Best for idempotent PUTs/webhooks." })
    ] }),
    /* @__PURE__ */ e(
      er,
      {
        value: t.retryPolicy,
        onChange: (l) => r({ retryPolicy: l })
      }
    ),
    /* @__PURE__ */ e(Ne, { label: "On error", children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
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
            value: i,
            onChange: (l) => {
              const p = Math.max(1, parseInt(l.target.value, 10) || 1);
              r({ onError: "fail-run", config: { ...a, retryCount: p } });
            }
          }
        ),
        "times"
      ] })
    ] }) })
  ] });
}
const tt = 2, wt = 8;
function Cr(t, r) {
  const n = t ?? [];
  return n.length === r ? n : n.length > r ? n.slice(0, r) : [...n, ...Array(r - n.length).fill("")];
}
function pc({ data: t, onChange: r }) {
  const n = Math.max(tt, Math.min(wt, t.branchCount || tt)), a = Cr(t.branchLabels, n), i = (d) => {
    const c = Math.max(tt, Math.min(wt, d));
    r({
      branchCount: c,
      branchLabels: Cr(t.branchLabels, c)
    });
  }, s = (d, c) => {
    const l = [...a];
    l[d] = c, r({ branchLabels: l });
  };
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o(
      Ne,
      {
        label: "Branch count",
        required: !0,
        help: `Between ${tt} and ${wt} parallel branches.`,
        children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs ml-2", children: n }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: tt,
              max: wt,
              step: 1,
              value: n,
              onChange: (d) => i(parseInt(d.target.value, 10)),
              className: "w-full mt-1"
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              type: "number",
              min: tt,
              max: wt,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit mt-1",
              value: n,
              onChange: (d) => i(parseInt(d.target.value, 10) || tt)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e(Ne, { label: "Branch labels (optional)", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: a.map((d, c) => /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
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
const uc = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], mc = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function hc({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o(Ne, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: uc.map((n) => /* @__PURE__ */ o(
        "label",
        {
          className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
          children: [
            /* @__PURE__ */ e(
              "input",
              {
                type: "radio",
                name: "join-mode",
                checked: t.mode === n.value,
                onChange: () => r({ mode: n.value })
              }
            ),
            n.label,
            /* @__PURE__ */ o("span", { className: "text-text-tertiary text-[11px]", children: [
              "— ",
              n.hint
            ] })
          ]
        },
        n.value
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
            onChange: (n) => r({ n: Math.max(1, parseInt(n.target.value, 10) || 1) })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e(Ne, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: mc.map((n) => /* @__PURE__ */ o(
      "label",
      {
        className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
        children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "radio",
              name: "join-merge",
              checked: t.mergeStrategy === n.value,
              onChange: () => r({ mergeStrategy: n.value })
            }
          ),
          n.label,
          /* @__PURE__ */ o("span", { className: "text-text-tertiary text-[11px]", children: [
            "— ",
            n.hint
          ] })
        ]
      },
      n.value
    )) }) }),
    /* @__PURE__ */ o("div", { className: "p-2 bg-surface-inset border border-border rounded-md text-xs text-text-secondary", children: [
      "Current inputs: ",
      /* @__PURE__ */ e("strong", { children: "TBD" }),
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Derived from incoming edges once the canvas is connected." })
    ] })
  ] });
}
const fc = "";
function Ir(t, r) {
  const n = t.displayName;
  return typeof n == "string" && n.length > 0 ? n : r.slice(0, 8);
}
function gc({ value: t, onChange: r, placeholder: n, maxSelect: a }) {
  const { presenceUsers: i } = Ea(), { idToken: s } = Xn(), [d, c] = S(""), [l, p] = S(!1), [u, f] = S(0), [h, g] = S([]), x = le(null), m = le(null), N = q(() => {
    const $ = new Set(t), R = [];
    for (const E of i)
      $.has(E.clientId) || ($.add(E.clientId), R.push({
        userId: E.clientId,
        displayName: Ir(E.metadata, E.clientId)
      }));
    return R;
  }, [i, t]);
  ne(() => {
    const $ = d.trim();
    if (!$ || !s) {
      g([]);
      return;
    }
    const R = new AbortController(), E = setTimeout(() => {
      const A = `${fc}/api/profiles?q=${encodeURIComponent($)}&limit=20`;
      fetch(A, {
        headers: { Authorization: `Bearer ${s}` },
        signal: R.signal
      }).then((j) => j.ok ? j.json() : Promise.reject(new Error(`HTTP ${j.status}`))).then((j) => {
        g(Array.isArray(j.profiles) ? j.profiles : []);
      }).catch(() => {
      });
    }, 250);
    return () => {
      clearTimeout(E), R.abort();
    };
  }, [d, s]);
  const y = q(() => {
    const $ = new Set(t), R = [];
    for (const E of N)
      $.has(E.userId) || ($.add(E.userId), R.push(E));
    for (const E of h)
      $.has(E.userId) || ($.add(E.userId), R.push({
        userId: E.userId,
        displayName: E.displayName || E.userId.slice(0, 8)
      }));
    return R;
  }, [N, h, t]), v = q(() => {
    const $ = d.trim().toLowerCase();
    return $ ? y.filter(
      (R) => R.displayName.toLowerCase().includes($) || R.userId.toLowerCase().includes($)
    ) : y;
  }, [y, d]), w = typeof a == "number" && t.length >= a, b = ($) => {
    const R = $.trim();
    R && (t.includes(R) || w || (r([...t, R]), c(""), f(0)));
  }, k = ($) => {
    r(t.filter((R) => R !== $));
  }, C = ($) => {
    if ($.key === "ArrowDown")
      $.preventDefault(), p(!0), f((R) => Math.min(R + 1, Math.max(v.length - 1, 0)));
    else if ($.key === "ArrowUp")
      $.preventDefault(), f((R) => Math.max(R - 1, 0));
    else if ($.key === "Enter") {
      $.preventDefault();
      const R = v[u];
      R ? b(R.userId) : d.trim() && b(d.trim());
    } else $.key === "Escape" ? p(!1) : $.key === "Backspace" && !d && t.length > 0 && k(t[t.length - 1]);
  }, T = ($) => {
    const R = i.find((A) => A.clientId === $);
    if (R) return Ir(R.metadata, $);
    const E = h.find((A) => A.userId === $);
    return E && E.displayName ? E.displayName : $;
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5 font-[inherit]", children: [
    t.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: t.map(($) => /* @__PURE__ */ o(
      "span",
      {
        className: "inline-flex items-center gap-1 bg-[#eef2ff] border border-[#c7d2fe] text-[#3730a3] rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
        children: [
          T($),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => k($),
              "aria-label": `Remove ${T($)}`,
              className: "bg-transparent border-none text-[#3730a3] cursor-pointer text-[14px] leading-none px-0.5 py-0",
              children: "×"
            }
          )
        ]
      },
      $
    )) }),
    /* @__PURE__ */ o("div", { className: "relative", children: [
      /* @__PURE__ */ e(
        "input",
        {
          ref: x,
          type: "text",
          value: d,
          disabled: w,
          placeholder: w ? `Max ${a} selected` : n ?? "Search users…",
          onChange: ($) => {
            c($.target.value), p(!0), f(0);
          },
          onFocus: () => p(!0),
          onBlur: () => {
            m.current = setTimeout(() => p(!1), 120);
          },
          onKeyDown: C,
          className: "w-full py-1.5 px-2.5 text-[13px] border border-[#e2e8f0] rounded-md font-[inherit] box-border outline-none"
        }
      ),
      l && !w && v.length > 0 && /* @__PURE__ */ e(
        "div",
        {
          className: "absolute top-full left-0 right-0 bg-white border border-[#e2e8f0] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
          onMouseDown: ($) => {
            $.preventDefault(), m.current && clearTimeout(m.current);
          },
          children: v.map(($, R) => /* @__PURE__ */ o(
            "div",
            {
              className: I(
                "py-1.5 px-2.5 text-[13px] text-[#374151] cursor-pointer",
                R === u ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              onMouseEnter: () => f(R),
              onClick: () => {
                b($.userId), x.current?.focus();
              },
              children: [
                /* @__PURE__ */ e("span", { className: "font-medium", children: $.displayName }),
                $.displayName !== $.userId && /* @__PURE__ */ e("span", { className: "text-[#94a3b8] ml-2 text-[11px] font-mono", children: $.userId.slice(0, 12) })
              ]
            },
            $.userId
          ))
        }
      )
    ] })
  ] });
}
const _t = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5
};
function xc(t) {
  return !t || t <= 0 ? "minutes" : t % _t.hours === 0 ? "hours" : t % _t.minutes === 0 ? "minutes" : "seconds";
}
function bc({ data: t, onChange: r }) {
  const n = t.approvers ?? [], a = n.length === 0, [i, s] = S(() => xc(t.timeoutMs)), d = t.timeoutMs !== void 0 ? Math.round(t.timeoutMs / _t[i]) : "", c = n.filter((g) => g.type === "user").map((g) => g.value), l = (g) => {
    const x = n.filter((y) => y.type === "role"), N = [...g.map((y) => ({ type: "user", value: y })), ...x];
    r({
      approvers: N,
      // Clamp requiredCount so it never exceeds approvers.length (min 1).
      requiredCount: Math.max(1, Math.min(t.requiredCount || 1, N.length || 1))
    });
  }, p = (g) => {
    const x = n.filter((m, N) => N !== g);
    r({
      approvers: x,
      requiredCount: Math.max(1, Math.min(t.requiredCount || 1, x.length || 1))
    });
  }, u = (g) => {
    if (g === "") {
      r({ timeoutMs: void 0 });
      return;
    }
    const x = Math.max(0, parseInt(g, 10) || 0);
    r({ timeoutMs: x * _t[i] });
  }, f = (g) => {
    s(g), typeof d == "number" && !Number.isNaN(d) && r({ timeoutMs: d * _t[g] });
  }, h = Math.max(1, n.length);
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o(
      Ne,
      {
        label: "Approvers",
        required: !0,
        error: a ? "At least one approver is required." : void 0,
        help: a ? void 0 : "Who can approve this step.",
        children: [
          /* @__PURE__ */ e(
            gc,
            {
              value: c,
              onChange: l,
              placeholder: "Add approver…"
            }
          ),
          n.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 mt-2", children: n.map((g, x) => /* @__PURE__ */ o(
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
      Ne,
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
                const x = parseInt(g.target.value, 10), m = Math.max(1, Math.min(h, Number.isNaN(x) ? 1 : x));
                r({ requiredCount: m });
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
    /* @__PURE__ */ o(Ne, { label: "Timeout", help: "Leave blank for no timeout.", children: [
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
            value: i,
            onChange: (g) => f(g.target.value),
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
                  onChange: () => r({ timeoutAction: g })
                }
              ),
              g === "reject" ? "Reject" : "Approve"
            ]
          },
          g
        )) })
      ] })
    ] }),
    /* @__PURE__ */ e(Ne, { label: "Message for approver (optional)", help: "Shown to the approver when the request is sent.", children: /* @__PURE__ */ e(
      "textarea",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]",
        value: t.message ?? "",
        onChange: (g) => r({ message: g.target.value || void 0 }),
        placeholder: "Please review the summary before it's posted to the document."
      }
    ) })
  ] });
}
function Bn(t) {
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
function Bo(t) {
  const r = Array.isArray(t.type) ? t.type[0] : t.type;
  if (r === "array") {
    const n = t.items ? Array.isArray(t.items.type) ? t.items.type[0] : t.items.type : void 0;
    return n ? `array of ${n}` : "array";
  }
  return r ?? "unknown";
}
function Lt(t, r, n, a, i) {
  if (i.has(t)) return;
  i.add(t);
  const s = Array.isArray(t.type) ? t.type[0] : t.type, d = [t.anyOf, t.oneOf, t.allOf].filter(Boolean);
  for (const c of d)
    for (const l of c)
      Lt(l, r, n, a, i);
  if (s === "object" && t.properties) {
    for (const [c, l] of Object.entries(t.properties)) {
      const p = `${r}.${c}`, u = Bn(l);
      a.push({
        path: p,
        label: `${c} (${Bo(l)})`,
        depth: n,
        kind: u,
        isArrayItems: u === "array"
      }), Lt(l, p, n + 1, a, i);
    }
    return;
  }
  if (s === "array") {
    const c = `${r}[*]`, l = t.items, p = l ? Bn(l) : "unknown";
    a.push({
      path: c,
      label: `${r.slice(r.lastIndexOf(".") + 1)}[*] (each item)`,
      depth: n,
      kind: p,
      isArrayItems: !0
    }), l && Lt(l, c, n + 1, a, i);
  }
}
function yc(t, r = "$") {
  if (!t || typeof t != "object") return [];
  const n = [], a = /* @__PURE__ */ new Set();
  if ((Array.isArray(t.type) ? t.type[0] : t.type) === "object" && t.properties)
    for (const [s, d] of Object.entries(t.properties)) {
      const c = `${r}.${s}`, l = Bn(d);
      n.push({
        path: c,
        label: `${s} (${Bo(d)})`,
        depth: 0,
        kind: l,
        isArrayItems: l === "array"
      }), Lt(d, c, 1, n, a);
    }
  else
    Lt(t, r, 0, n, a);
  return n;
}
const vc = {};
function Nc() {
  return `${(typeof import.meta < "u" && vc?.VITE_SOCIAL_API_URL) ?? ""}/api/pipeline/output-schemas`;
}
let gn = null, kt = null;
async function wc() {
  return gn || (kt || (kt = fetch(Nc()).then((t) => {
    if (!t.ok) throw new Error(`HTTP ${t.status}`);
    return t.json();
  }).then((t) => (gn = t, kt = null, t)).catch((t) => {
    throw kt = null, t;
  })), kt);
}
const kc = {
  array: "bg-primary-bg text-primary-fg border-primary-border",
  object: "bg-surface-panel text-text-secondary border-border",
  string: "bg-success-bg text-success-fg border-success-border",
  number: "bg-warning-bg text-warning-fg border-warning-border",
  boolean: "bg-pink-50 text-pink-700 border-pink-200",
  unknown: "bg-surface-panel text-text-tertiary border-border"
};
function Cc({ kind: t }) {
  return /* @__PURE__ */ e(
    "span",
    {
      className: I(
        "inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4",
        kc[t]
      ),
      children: t
    }
  );
}
function Ic({ entry: t, isSelected: r, onPick: n }) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      onClick: () => n(t.path),
      "data-testid": `path-row-${t.path}`,
      className: I(
        "w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors duration-100",
        "hover:bg-surface-panel focus:outline-none focus:ring-2 focus:ring-primary/50",
        r && "bg-primary-bg ring-1 ring-inset ring-primary",
        t.isArrayItems && !r && "hover:bg-primary-bg"
      ),
      style: { paddingLeft: `${8 + t.depth * 12}px` },
      children: [
        /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "flex-1 font-mono text-[12px] leading-5 truncate",
              t.isArrayItems ? "text-primary-fg font-semibold" : "text-slate-700"
            ),
            children: t.path
          }
        ),
        /* @__PURE__ */ e(Cc, { kind: t.kind })
      ]
    }
  );
}
function Sc({
  value: t,
  onChange: r,
  upstreamKind: n,
  upstreamSchema: a
}) {
  const [i, s] = S("idle"), [d, c] = S(null), l = le(!0);
  ne(() => (l.current = !0, () => {
    l.current = !1;
  }), []);
  const p = q(() => a !== void 0 ? a : d, [a, d]);
  ne(() => {
    !n || a !== void 0 || (s("loading"), wc().then((m) => {
      if (!l.current) return;
      const N = m.schemas[n] ?? null;
      c(N), s("done");
    }).catch(() => {
      l.current && s("error");
    }));
  }, [n, a]);
  const u = q(
    () => yc(p),
    [p]
  ), f = p !== null && u.length > 0, h = D(
    (m) => {
      r(m);
    },
    [r]
  );
  if (!n && a === void 0)
    return /* @__PURE__ */ e(
      cn,
      {
        value: t,
        onChange: r,
        enforcePrefix: !0,
        "data-testid": "scatter-path-plain-input"
      }
    );
  if (!f)
    return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
      i === "loading" && /* @__PURE__ */ o("p", { className: "text-[11px] text-text-tertiary leading-4", children: [
        "Loading schema for ",
        n,
        "…"
      ] }),
      i === "error" && /* @__PURE__ */ e("p", { className: "text-[11px] text-warning-fg leading-4", children: "Could not load schema — enter path manually." }),
      (i === "done" || a === null) && /* @__PURE__ */ o("p", { className: "text-[11px] text-text-tertiary leading-4", children: [
        "Schema unavailable for ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: n }),
        " — enter path manually."
      ] }),
      /* @__PURE__ */ e(
        cn,
        {
          value: t,
          onChange: r,
          enforcePrefix: !0,
          "data-testid": "scatter-path-fallback-input"
        }
      )
    ] });
  const x = u.filter((m) => m.isArrayItems).length < u.length;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("p", { className: "text-[11px] text-neutral leading-4", children: [
      "Click a path to set itemsPath.",
      x && /* @__PURE__ */ o(G, { children: [
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
        children: u.map((m) => /* @__PURE__ */ e(
          Ic,
          {
            entry: m,
            isSelected: t === m.path,
            onPick: h
          },
          m.path
        ))
      }
    ),
    /* @__PURE__ */ e(
      cn,
      {
        value: t,
        onChange: r,
        enforcePrefix: !0,
        "data-testid": "scatter-path-input",
        placeholder: "$.path selected above or type manually"
      }
    )
  ] });
}
const xn = "text-[12px] font-semibold text-text-secondary", bn = "text-[11px] text-text-tertiary mt-0.5", $c = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary";
function Tc(t) {
  const { definition: r } = Ue();
  return q(() => {
    if (!t || !r) return;
    const n = r.edges.find((i) => i.target === t);
    if (!n) return;
    const a = r.nodes.find((i) => i.id === n.source);
    if (a)
      return a.type;
  }, [t, r]);
}
function Ac({ data: t, onChange: r }) {
  const { selectedNodeId: n } = Ue(), a = Tc(n), i = t.maxConcurrency ?? "";
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { className: xn, children: [
        "Items path",
        /* @__PURE__ */ e("span", { className: "text-danger-fg ml-1", "aria-hidden": !0, children: "*" })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-1", children: /* @__PURE__ */ e(
        Sc,
        {
          value: t.itemsPath ?? "",
          onChange: (s) => r({ itemsPath: s }),
          upstreamKind: a
        }
      ) }),
      !t.itemsPath?.trim() && /* @__PURE__ */ e("div", { role: "alert", className: "text-[11px] text-danger-fg mt-0.5", children: "Items path is required." }),
      !!t.itemsPath && !t.itemsPath.startsWith("$.") && /* @__PURE__ */ o("div", { role: "alert", className: "text-[11px] text-danger-fg mt-0.5", children: [
        "Path must start with ",
        /* @__PURE__ */ e("code", { children: "$." })
      ] }),
      !!t.itemsPath?.startsWith("$.") && /* @__PURE__ */ e("div", { className: bn, children: "JSONPath into context resolving to an array. Each element becomes one scatter arm." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-item-alias", className: xn, children: [
        "Item alias ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, default: item)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "scatter-item-alias",
          type: "text",
          spellCheck: !1,
          className: $c,
          value: t.itemAlias ?? "",
          onChange: (s) => r({ itemAlias: s.target.value.trim() || void 0 }),
          placeholder: "item"
        }
      ),
      /* @__PURE__ */ o("div", { className: bn, children: [
        "Key written to ",
        /* @__PURE__ */ e("code", { children: "$.scatter.<alias>" }),
        " for each arm."
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-max-concurrency", className: xn, children: [
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
          value: i,
          onChange: (s) => {
            const d = s.target.value;
            r({
              maxConcurrency: d === "" ? void 0 : Math.max(1, parseInt(d, 10) || 1)
            });
          },
          placeholder: "4"
        }
      ),
      /* @__PURE__ */ e("div", { className: bn, children: "Maximum number of arms executing concurrently." })
    ] })
  ] });
}
const Rc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Pc({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const Mc = ["cover", "contain", "fill", "inside", "outside"], Ct = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", It = "text-[12px] font-semibold text-text-secondary", Sr = "text-[11px] text-text-tertiary mt-0.5";
function Ec({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "resize-source-image-path", className: It, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "resize-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Ct,
          value: t.sourceImagePath ?? "",
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Pc, { samples: Rc, onSelect: (n) => r({ sourceImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "resize-width", className: It, children: "Width (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "resize-width",
            type: "number",
            min: 1,
            step: 1,
            className: Ct,
            value: t.width ?? "",
            onChange: (n) => {
              const a = parseInt(n.target.value, 10);
              r({ width: Number.isFinite(a) && a > 0 ? a : void 0 });
            },
            placeholder: "e.g. 512"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "resize-height", className: It, children: "Height (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "resize-height",
            type: "number",
            min: 1,
            step: 1,
            className: Ct,
            value: t.height ?? "",
            onChange: (n) => {
              const a = parseInt(n.target.value, 10);
              r({ height: Number.isFinite(a) && a > 0 ? a : void 0 });
            },
            placeholder: "e.g. 512"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "resize-fit", className: It, children: "Fit mode" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "resize-fit",
          className: Ct,
          value: t.fit ?? "cover",
          onChange: (n) => r({ fit: n.target.value }),
          children: Mc.map((n) => /* @__PURE__ */ e("option", { value: n, children: n }, n))
        }
      ),
      /* @__PURE__ */ o("div", { className: Sr, children: [
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
          onChange: (n) => r({ withoutEnlargement: n.target.checked }),
          className: "w-3.5 h-3.5 accent-primary"
        }
      ),
      "Do not enlarge if already smaller than target"
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "resize-background", className: It, children: [
        "Background colour ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, for contain / fill)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "resize-background",
          type: "text",
          spellCheck: !1,
          className: Ct,
          value: t.background ?? "",
          onChange: (n) => r({ background: n.target.value.trim() || void 0 }),
          placeholder: "#ffffff"
        }
      ),
      /* @__PURE__ */ o("div", { className: Sr, children: [
        "Hex colour used to fill letterbox padding. Only applies when fit is ",
        /* @__PURE__ */ e("code", { children: "contain" }),
        " or ",
        /* @__PURE__ */ e("code", { children: "fill" }),
        "."
      ] })
    ] })
  ] });
}
const Dc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Oc({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
function _c(t) {
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
const Un = "text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", Lc = "flex-1 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", $r = "text-[12px] font-semibold text-text-secondary", Bc = "text-[11px] text-text-tertiary mt-0.5";
function Uc({ op: t, index: r, onUpdate: n, onRemove: a }) {
  return /* @__PURE__ */ o("div", { className: "border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2", "data-testid": `geo-op-card-${r}`, children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary font-semibold min-w-[20px]", children: [
        r + 1,
        "."
      ] }),
      /* @__PURE__ */ o(
        "select",
        {
          className: Lc,
          value: t.op,
          onChange: (i) => n(_c(i.target.value)),
          "aria-label": `Op ${r + 1} type`,
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
          onClick: a,
          className: "ml-auto text-[11px] font-semibold bg-transparent text-danger-fg border border-transparent rounded px-2 py-0.5 cursor-pointer hover:bg-danger-bg",
          "aria-label": `Remove op ${r + 1}`,
          children: "✕"
        }
      )
    ] }),
    t.op === "rotate" && /* @__PURE__ */ o(G, { children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e("label", { className: "text-[11px] text-text-tertiary min-w-[60px]", children: "Degrees" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "number",
            min: -360,
            max: 360,
            step: 90,
            className: `${Un} w-24`,
            value: t.degrees,
            onChange: (i) => {
              const s = parseFloat(i.target.value);
              n({ ...t, degrees: Number.isFinite(s) ? s : 90 });
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
            className: `${Un} flex-1`,
            value: t.background ?? "",
            onChange: (i) => n({ ...t, background: i.target.value.trim() || void 0 }),
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
            onChange: (i) => n({ ...t, trimAfter: i.target.checked }),
            className: "w-3.5 h-3.5 accent-primary"
          }
        ),
        "Trim after rotate"
      ] })
    ] })
  ] });
}
function Fc({ data: t, onChange: r }) {
  const n = t.operations ?? [], a = (d, c) => {
    r({ operations: n.map((l, p) => p === d ? c : l) });
  }, i = (d) => {
    r({ operations: n.filter((c, l) => l !== d) });
  }, s = () => {
    r({ operations: [...n, { op: "rotate", degrees: 90 }] });
  };
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "transform-geo-source-image-path", className: $r, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "transform-geo-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `mt-1 w-full ${Un}`,
          value: t.sourceImagePath ?? "",
          onChange: (d) => r({ sourceImagePath: d.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Oc, { samples: Dc, onSelect: (d) => r({ sourceImagePath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${$r} mb-2`, children: [
        "Operations ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      n.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-2 italic", children: "No operations — add at least one." }),
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: n.map((d, c) => /* @__PURE__ */ e(
        Uc,
        {
          op: d,
          index: c,
          onUpdate: (l) => a(c, l),
          onRemove: () => i(c)
        },
        c
      )) }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: s,
          className: `w-full text-[12px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer py-1.5 px-3 ${n.length > 0 ? "mt-2" : ""}`,
          "data-testid": "add-geo-op-btn",
          children: "+ Add operation"
        }
      ),
      /* @__PURE__ */ e("div", { className: `${Bc} mt-1.5`, children: "Supported: Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror)." })
    ] })
  ] });
}
const jc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function zc({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const qc = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "avif", label: "AVIF" }
], Fn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Vc = `${Fn} font-mono`, yn = "text-[12px] font-semibold text-text-secondary", vn = "text-[11px] text-text-tertiary mt-0.5";
function Wc({ data: t, onChange: r }) {
  const n = t.format === "jpeg" || t.format === "webp" || t.format === "avif";
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-source-image-path", className: yn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "format-convert-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Vc,
          value: t.sourceImagePath ?? "",
          onChange: (a) => r({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(zc, { samples: jc, onSelect: (a) => r({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "format-convert-format", className: yn, children: "Output format" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "format-convert-format",
          className: Fn,
          value: t.format ?? "jpeg",
          onChange: (a) => r({ format: a.target.value }),
          children: qc.map((a) => /* @__PURE__ */ e("option", { value: a.value, children: a.label }, a.value))
        }
      )
    ] }),
    n && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-quality", className: yn, children: [
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
          className: Fn,
          value: t.quality ?? 80,
          onChange: (a) => {
            const i = parseInt(a.target.value, 10);
            r({ quality: Number.isFinite(i) ? Math.min(100, Math.max(1, i)) : 80 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: vn, children: "Higher = better quality, larger file. 80 is a good default." })
    ] }),
    (t.format === "webp" || t.format === "avif") && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-lossless", className: "flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer", children: [
        /* @__PURE__ */ e(
          "input",
          {
            id: "format-convert-lossless",
            type: "checkbox",
            checked: t.lossless ?? !1,
            onChange: (a) => r({ lossless: a.target.checked }),
            className: "w-3.5 h-3.5 accent-primary"
          }
        ),
        "Lossless encoding"
      ] }),
      /* @__PURE__ */ e("div", { className: vn, children: "Overrides quality when enabled. Produces larger files with no compression artefacts." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-strip-metadata", className: "flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer", children: [
        /* @__PURE__ */ e(
          "input",
          {
            id: "format-convert-strip-metadata",
            type: "checkbox",
            checked: t.stripMetadata ?? !1,
            onChange: (a) => r({ stripMetadata: a.target.checked }),
            className: "w-3.5 h-3.5 accent-primary"
          }
        ),
        "Strip EXIF and metadata"
      ] }),
      /* @__PURE__ */ e("div", { className: vn, children: "Removes camera EXIF, GPS, copyright tags etc. Reduces file size; recommended for web delivery." })
    ] })
  ] });
}
const Jc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Hc({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const Vt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Wt = "text-[12px] font-semibold text-text-secondary", Nn = "text-[11px] text-text-tertiary mt-0.5";
function Gc({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-source-image-path", className: Wt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "sharpen-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `${Vt} font-mono`,
          value: t.sourceImagePath ?? "",
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Hc, { samples: Jc, onSelect: (n) => r({ sourceImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-sigma", className: Wt, children: [
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
          className: Vt,
          value: t.sigma ?? "",
          onChange: (n) => {
            const a = parseFloat(n.target.value);
            r({ sigma: Number.isFinite(a) && a > 0 ? a : void 0 });
          },
          placeholder: "1"
        }
      ),
      /* @__PURE__ */ e("div", { className: Nn, children: "Gaussian mask sigma. Higher = broader/stronger sharpening. Typical range: 0.5–3." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-m1", className: Wt, children: [
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
          className: Vt,
          value: t.m1 ?? "",
          onChange: (n) => {
            const a = parseFloat(n.target.value);
            r({ m1: Number.isFinite(a) && a >= 0 ? a : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: Nn, children: "Level of sharpening applied to flat (smooth) areas of the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-m2", className: Wt, children: [
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
          className: Vt,
          value: t.m2 ?? "",
          onChange: (n) => {
            const a = parseFloat(n.target.value);
            r({ m2: Number.isFinite(a) && a >= 0 ? a : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: Nn, children: "Level of sharpening applied to jagged (edge) areas of the image." })
    ] })
  ] });
}
const Kc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Yc({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const Xc = [
  "northwest",
  "north",
  "northeast",
  "west",
  "center",
  "east",
  "southwest",
  "south",
  "southeast"
], Rt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Tr = `${Rt} font-mono`, st = "text-[12px] font-semibold text-text-secondary", Ar = "text-[11px] text-text-tertiary mt-0.5";
function Qc({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "watermark-source-image-path", className: st, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Tr,
          value: t.sourceImagePath ?? "",
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Yc, { samples: Kc, onSelect: (n) => r({ sourceImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-overlay-image-id", className: st, children: "Overlay image ID" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-overlay-image-id",
          type: "text",
          spellCheck: !1,
          className: Tr,
          value: t.overlayImageId ?? "",
          onChange: (n) => r({ overlayImageId: n.target.value.trim() }),
          placeholder: "img_xxxxxxxx"
        }
      ),
      /* @__PURE__ */ e("div", { className: Ar, children: "The imageId of the watermark/overlay image already stored in the blob store. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-gravity", className: st, children: "Gravity (placement)" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "watermark-gravity",
          className: Rt,
          value: t.gravity ?? "southeast",
          onChange: (n) => r({ gravity: n.target.value }),
          children: Xc.map((n) => /* @__PURE__ */ e("option", { value: n, children: n }, n))
        }
      ),
      /* @__PURE__ */ e("div", { className: Ar, children: "Where the overlay is placed on the source image. Default: southeast." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "watermark-opacity", className: st, children: [
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
          className: Rt,
          value: t.opacity ?? 1,
          onChange: (n) => {
            const a = parseFloat(n.target.value);
            r({ opacity: Number.isFinite(a) ? Math.min(1, Math.max(0, a)) : 1 });
          }
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "watermark-offset-x", className: st, children: "Offset X (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "watermark-offset-x",
            type: "number",
            step: 1,
            className: Rt,
            value: t.offsetX ?? "",
            onChange: (n) => {
              const a = parseInt(n.target.value, 10);
              r({ offsetX: Number.isFinite(a) ? a : void 0 });
            },
            placeholder: "0"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "watermark-offset-y", className: st, children: "Offset Y (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "watermark-offset-y",
            type: "number",
            step: 1,
            className: Rt,
            value: t.offsetY ?? "",
            onChange: (n) => {
              const a = parseInt(n.target.value, 10);
              r({ offsetY: Number.isFinite(a) ? a : void 0 });
            },
            placeholder: "0"
          }
        )
      ] })
    ] })
  ] });
}
const Rr = 50;
function Zc(t, r) {
  const [n, a] = S(t), [i, s] = S([]), [d, c] = S([]), l = le(n);
  l.current = n;
  const p = D(
    (y) => {
      a((v) => {
        const w = y(v);
        return s((b) => {
          const k = [...b, v];
          return k.length > Rr && k.shift(), k;
        }), c([]), r(w), w;
      });
    },
    [r]
  ), u = D(
    (y) => {
      p((v) => [...v, y]);
    },
    [p]
  ), f = D(
    (y, v, w) => {
      p(
        (b) => b.map((k) => k.id === y ? { ...k, x: v, y: w } : k)
      );
    },
    [p]
  ), h = D(
    (y, v, w, b, k) => {
      p(
        (C) => C.map((T) => T.id === y ? { ...T, x: v, y: w, width: b, height: k } : T)
      );
    },
    [p]
  ), g = D(
    (y, v) => {
      p(
        (w) => w.map((b) => b.id === y ? { ...b, label: v } : b)
      );
    },
    [p]
  ), x = D(
    (y) => {
      p((v) => v.filter((w) => w.id !== y));
    },
    [p]
  ), m = D(() => {
    s((y) => {
      if (y.length === 0) return y;
      const v = y[y.length - 1];
      c((b) => [...b, l.current]);
      const w = v;
      return a(w), r(w), y.slice(0, -1);
    });
  }, [r]), N = D(() => {
    c((y) => {
      if (y.length === 0) return y;
      const v = y[y.length - 1];
      s((b) => {
        const k = [...b, l.current];
        return k.length > Rr && k.shift(), k;
      });
      const w = v;
      return a(w), r(w), y.slice(0, -1);
    });
  }, [r]);
  return {
    boxes: n,
    addBox: u,
    moveBox: f,
    resizeBox: h,
    setLabel: g,
    deleteBox: x,
    undo: m,
    redo: N,
    canUndo: i.length > 0,
    canRedo: d.length > 0
  };
}
function ed() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Ce(t, r, n) {
  return Math.max(r, Math.min(n, t));
}
function wn(t, r) {
  const n = r.getBoundingClientRect();
  return {
    x: Ce(t.clientX - n.left, 0, n.width),
    y: Ce(t.clientY - n.top, 0, n.height)
  };
}
function kn(t, r, n, a, i, s) {
  const d = i / n, c = s / a;
  return { x: t * d, y: r * c };
}
function Pr(t, r, n) {
  return {
    left: `${t.x / r * 100}%`,
    top: `${t.y / n * 100}%`,
    width: `${t.width / r * 100}%`,
    height: `${t.height / n * 100}%`
  };
}
function td(t, r, n) {
  for (let a = n.length - 1; a >= 0; a--) {
    const i = n[a];
    if (t >= i.x && t <= i.x + i.width && r >= i.y && r <= i.y + i.height)
      return i;
  }
  return null;
}
function Uo({
  imageUrl: t,
  imageWidth: r,
  imageHeight: n,
  boxes: a,
  onChange: i,
  readOnly: s = !1,
  className: d
}) {
  const c = le(null), [l, p] = S({ kind: "idle" }), [u, f] = S(null), h = le(null), { addBox: g, moveBox: x, resizeBox: m, setLabel: N, deleteBox: y } = Zc(
    a,
    i
  );
  ne(() => {
    u && h.current && (h.current.focus(), h.current.select());
  }, [u]);
  const v = D(
    (O) => {
      if (s || O.button !== 0) return;
      const P = c.current;
      if (!P) return;
      O.preventDefault(), P.setPointerCapture(O.pointerId);
      const { x: H, y: K } = wn(O, P), U = P.getBoundingClientRect(), { x: V, y: J } = kn(
        H,
        K,
        U.width,
        U.height,
        r,
        n
      ), X = td(V, J, a);
      p(X ? {
        kind: "move",
        id: X.id,
        offsetX: V - X.x,
        offsetY: J - X.y,
        currentX: V,
        currentY: J
      } : { kind: "create", startX: V, startY: J, currentX: V, currentY: J });
    },
    [s, a, r, n]
  ), w = D(
    (O, P, H) => {
      if (s) return;
      O.stopPropagation(), O.preventDefault();
      const K = c.current;
      if (!K) return;
      K.setPointerCapture(O.pointerId);
      const { x: U, y: V } = wn(O, K), J = K.getBoundingClientRect(), { x: X, y: pe } = kn(U, V, J.width, J.height, r, n);
      p({ kind: "resize", id: P.id, corner: H, origBox: { ...P }, currentX: X, currentY: pe });
    },
    [s, r, n]
  ), b = D(
    (O) => {
      if (l.kind === "idle") return;
      const P = c.current;
      if (!P) return;
      const { x: H, y: K } = wn(O, P), U = P.getBoundingClientRect(), { x: V, y: J } = kn(H, K, U.width, U.height, r, n);
      l.kind === "create" ? p((X) => X.kind === "create" ? { ...X, currentX: V, currentY: J } : X) : l.kind === "move" ? p((X) => X.kind === "move" ? { ...X, currentX: V, currentY: J } : X) : l.kind === "resize" && p((X) => X.kind === "resize" ? { ...X, currentX: V, currentY: J } : X);
    },
    [l.kind, r, n]
  ), k = D(
    (O) => {
      if (l.kind === "create") {
        const P = Math.min(l.startX, l.currentX), H = Math.min(l.startY, l.currentY), K = Math.max(l.startX, l.currentX), U = Math.max(l.startY, l.currentY), V = K - P, J = U - H;
        V >= 4 && J >= 4 && g({ id: ed(), x: P, y: H, width: V, height: J });
      } else if (l.kind === "move") {
        const P = a.find((H) => H.id === l.id);
        if (P) {
          const H = Ce(l.currentX - l.offsetX, 0, r - P.width), K = Ce(l.currentY - l.offsetY, 0, n - P.height);
          x(l.id, H, K);
        }
      } else if (l.kind === "resize") {
        const { id: P, corner: H, origBox: K, currentX: U, currentY: V } = l;
        let { x: J, y: X, width: pe, height: z } = K;
        if (H === "nw") {
          const ce = Ce(U, 0, J + pe - 4), we = Ce(V, 0, X + z - 4);
          pe = J + pe - ce, z = X + z - we, J = ce, X = we;
        } else if (H === "ne") {
          const ce = Ce(V, 0, X + z - 4);
          pe = Ce(U - J, 4, r - J), z = X + z - ce, X = ce;
        } else if (H === "sw") {
          const ce = Ce(U, 0, J + pe - 4);
          pe = J + pe - ce, z = Ce(V - X, 4, n - X), J = ce;
        } else
          pe = Ce(U - J, 4, r - J), z = Ce(V - X, 4, n - X);
        m(P, J, X, pe, z);
      }
      p({ kind: "idle" });
    },
    [l, a, g, x, m, r, n]
  ), C = D(
    (O, P) => {
      s || (O.preventDefault(), y(P));
    },
    [s, y]
  ), T = D(
    (O, P) => {
      s || (O.key === "Delete" || O.key === "Backspace") && (O.preventDefault(), y(P));
    },
    [s, y]
  ), $ = D(
    (O, P) => {
      s || (O.stopPropagation(), f({ id: P.id, value: P.label ?? "" }));
    },
    [s]
  ), R = D(() => {
    u && (N(u.id, u.value), f(null));
  }, [u, N]);
  let E = null;
  if (l.kind === "create") {
    const O = Math.min(l.startX, l.currentX), P = Math.min(l.startY, l.currentY), H = Math.max(l.startX, l.currentX), K = Math.max(l.startY, l.currentY);
    H - O >= 2 && K - P >= 2 && (E = { x: O, y: P, width: H - O, height: K - P });
  }
  let A = null;
  if (l.kind === "move") {
    const O = a.find((P) => P.id === l.id);
    if (O) {
      const P = Ce(l.currentX - l.offsetX, 0, r - O.width), H = Ce(l.currentY - l.offsetY, 0, n - O.height);
      A = { ...O, x: P, y: H };
    }
  }
  let j = null;
  if (l.kind === "resize") {
    const { corner: O, origBox: P, currentX: H, currentY: K } = l;
    let { x: U, y: V, width: J, height: X } = P;
    if (O === "nw") {
      const pe = Ce(H, 0, U + J - 4), z = Ce(K, 0, V + X - 4);
      J = U + J - pe, X = V + X - z, U = pe, V = z;
    } else if (O === "ne") {
      const pe = Ce(K, 0, V + X - 4);
      J = Ce(H - U, 4, r - U), X = V + X - pe, V = pe;
    } else if (O === "sw") {
      const pe = Ce(H, 0, U + J - 4);
      J = U + J - pe, X = Ce(K - V, 4, n - V), U = pe;
    } else
      J = Ce(H - U, 4, r - U), X = Ce(K - V, 4, n - V);
    j = { ...P, x: U, y: V, width: J, height: X };
  }
  const W = /* @__PURE__ */ new Set();
  l.kind === "move" && W.add(l.id), l.kind === "resize" && W.add(l.id);
  const ie = (O, P) => {
    const H = {
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
          H[P]
        ),
        onPointerDown: (K) => w(K, O, P)
      },
      P
    );
  }, Y = (O, P, H, K) => {
    const U = Pr(O, r, n), V = u?.id === O.id;
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
          left: U.left,
          top: U.top,
          width: U.width,
          height: U.height,
          border: "2px solid #6366f1",
          background: "rgba(99,102,241,0.1)",
          borderRadius: 2,
          boxSizing: "border-box"
        },
        children: [
          V ? /* @__PURE__ */ e(
            "input",
            {
              ref: h,
              type: "text",
              value: u.value,
              onChange: (J) => f((X) => X ? { ...X, value: J.target.value } : null),
              onBlur: R,
              onKeyDown: (J) => {
                J.key === "Enter" && (J.preventDefault(), R()), J.key === "Escape" && (J.preventDefault(), f(null));
              },
              className: "absolute -top-5 left-0 w-24 rounded border border-primary bg-white px-1 py-0 text-[10px] font-semibold text-primary shadow outline-none focus:ring-1 focus:ring-primary",
              onClick: (J) => J.stopPropagation()
            }
          ) : /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              tabIndex: 0,
              "aria-label": `Label: ${O.label || "Unlabeled"}. Double-click to edit.`,
              className: "absolute -top-5 left-0 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow",
              style: { whiteSpace: "nowrap" },
              onDoubleClick: (J) => $(J, O),
              onContextMenu: (J) => C(J, O.id),
              onKeyDown: (J) => T(J, O.id),
              children: O.label || "Unlabeled"
            }
          ),
          H && !s && /* @__PURE__ */ o(G, { children: [
            ie(O, "nw"),
            ie(O, "ne"),
            ie(O, "sw"),
            ie(O, "se")
          ] })
        ]
      },
      K
    );
  }, te = () => {
    if (!E) return null;
    const O = Pr(E, r, n);
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
            onPointerDown: s ? void 0 : v,
            onPointerMove: s ? void 0 : b,
            onPointerUp: s ? void 0 : k,
            children: [
              a.map((O) => W.has(O.id) ? null : Y(O, !1, !0, `box-${O.id}`)),
              A && Y(A, !0, !1, "ghost-move"),
              j && Y(j, !0, !0, "ghost-resize"),
              te()
            ]
          }
        ),
        !s && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute bottom-1.5 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80", children: "Drag to add box" })
      ]
    }
  );
}
const nd = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
], rd = [
  "$.scatter.item.bbox",
  "$.steps.visionAnalyze.output.extracted.regions[0].bbox",
  "$.trigger.payload.bbox"
], od = "crop-region", ad = "crop";
function Mr({
  samples: t,
  onSelect: r
}) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const Er = "mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Cn = "text-[12px] font-semibold text-text-secondary", St = "text-[11px] text-text-tertiary mt-0.5";
function id(t) {
  const { definition: r } = Ue(), n = q(() => !t || !r ? null : r.edges.find((d) => d.target === t)?.source ?? null, [r, t]), i = me(n ?? "")?.images?.[0];
  return i ? { imageId: i.imageId, width: i.width, height: i.height } : null;
}
function sd({
  data: t,
  onChange: r,
  currentNodeId: n
}) {
  const a = t.materialize !== !1, i = id(n), s = $e(), d = q(() => t.bbox ? [
    {
      id: od,
      x: t.bbox.x,
      y: t.bbox.y,
      width: t.bbox.width,
      height: t.bbox.height,
      label: ad
    }
  ] : [], [t.bbox]), c = D(
    (l) => {
      if (l.length === 0) {
        r({ bbox: void 0 });
        return;
      }
      const p = l[l.length - 1], u = {
        x: Math.round(p.x),
        y: Math.round(p.y),
        width: Math.round(p.width),
        height: Math.round(p.height)
      };
      r({ bbox: u });
    },
    [r]
  );
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-source-image-path", className: Cn, children: [
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
          className: Er,
          value: t.sourceImagePath ?? "",
          onChange: (l) => r({ sourceImagePath: l.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ o("div", { className: St, children: [
        "JSONPath to the imageId of the source image. Defaults server-side to",
        " ",
        /* @__PURE__ */ e("code", { children: "$.scatter.parentImageId" }),
        "."
      ] }),
      /* @__PURE__ */ e(
        Mr,
        {
          samples: nd,
          onSelect: (l) => r({ sourceImagePath: l })
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-bbox-path", className: Cn, children: [
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
          className: Er,
          value: t.bboxPath ?? "",
          onChange: (l) => r({ bboxPath: l.target.value.trim() || void 0 }),
          placeholder: "$.scatter.item.bbox"
        }
      ),
      /* @__PURE__ */ o("div", { className: St, children: [
        "JSONPath to a bbox object ",
        /* @__PURE__ */ e("code", { children: "{ x, y, width, height }" }),
        " in pixels. Overrides the manual crop region below when present at run time."
      ] }),
      /* @__PURE__ */ e(
        Mr,
        {
          samples: rd,
          onSelect: (l) => r({ bboxPath: l })
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { "data-testid": "crop-region-section", children: [
      /* @__PURE__ */ o("div", { className: Cn, children: [
        "Crop region",
        " ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e("div", { className: St, children: "Drag on the source image to paint the crop box. Drawing a new box replaces the previous one." }),
      i ? /* @__PURE__ */ o(G, { children: [
        /* @__PURE__ */ e(
          Uo,
          {
            imageUrl: s(i.imageId),
            imageWidth: i.width,
            imageHeight: i.height,
            boxes: d,
            onChange: c,
            className: "mt-1.5"
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: "mt-1.5 flex flex-wrap gap-1",
            "data-testid": "crop-region-chips",
            children: t.bbox ? /* @__PURE__ */ o(G, { children: [
              /* @__PURE__ */ o(se, { tone: "neutral", size: "xs", mono: !0, "data-testid": "crop-chip-x", children: [
                "x: ",
                t.bbox.x
              ] }),
              /* @__PURE__ */ o(se, { tone: "neutral", size: "xs", mono: !0, "data-testid": "crop-chip-y", children: [
                "y: ",
                t.bbox.y
              ] }),
              /* @__PURE__ */ o(
                se,
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
                se,
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
            ] }) : /* @__PURE__ */ e("span", { className: I(St, "italic"), children: "No crop region yet — drag on the image to add one." })
          }
        )
      ] }) : /* @__PURE__ */ e(
        Ze,
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
              onChange: (l) => r({ materialize: l.target.checked }),
              className: "w-3.5 h-3.5 accent-primary"
            }
          ),
          "Persist crop to blob store"
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: St, children: "When enabled (default), the cropped image is saved to the ImageBlobStore." })
  ] });
}
function ld(t) {
  const { selectedNodeId: r } = Ue();
  return /* @__PURE__ */ e(sd, { ...t, currentNodeId: r });
}
const cd = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function dd({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const Dr = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", In = "text-[12px] font-semibold text-text-secondary", Sn = "text-[11px] text-text-tertiary mt-0.5";
function pd({ data: t, onChange: r }) {
  const n = t.algorithm ?? "luminosity", a = t.contrast ?? 1;
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-bw-source-image-path", className: In, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "adjust-bw-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `${Dr} font-mono`,
          value: t.sourceImagePath ?? "",
          onChange: (i) => r({ sourceImagePath: i.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: Sn, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(dd, { samples: cd, onSelect: (i) => r({ sourceImagePath: i }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "adjust-bw-algorithm", className: In, children: "Greyscale algorithm" }),
      /* @__PURE__ */ o(
        "select",
        {
          id: "adjust-bw-algorithm",
          className: Dr,
          value: n,
          onChange: (i) => r({ algorithm: i.target.value }),
          children: [
            /* @__PURE__ */ e("option", { value: "luminosity", children: "Luminosity — 0.21R + 0.72G + 0.07B (perceptually accurate)" }),
            /* @__PURE__ */ e("option", { value: "average", children: "Average — (R+G+B)/3 (fast, flat)" }),
            /* @__PURE__ */ e("option", { value: "desaturate", children: "Desaturate — (max+min)/2 (Lightness channel)" })
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: Sn, children: "Controls how RGB channels are weighted when converting to greyscale." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-bw-contrast", className: In, children: [
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
          value: a,
          onChange: (i) => {
            const s = parseFloat(i.target.value);
            r({ contrast: Number.isFinite(s) ? Math.max(0, s) : 1 });
          }
        }
      ),
      /* @__PURE__ */ o("div", { className: Sn, children: [
        "Applied after greyscale conversion. 1 = no change, ",
        "<",
        "1 = lower contrast,",
        " >",
        "1 = higher contrast. Range 0–4."
      ] })
    ] })
  ] });
}
function ud({
  value: t,
  onChange: r,
  uploadImage: n,
  getImageUrl: a,
  maxSize: i = 8 * 1024 * 1024,
  accept: s = "image/*",
  fileOnly: d = !1,
  urlOnly: c = !1,
  className: l,
  "data-testid": p
}) {
  const [u, f] = S(!1), [h, g] = S(null), [x, m] = S("");
  async function N(w) {
    f(!0), g(null);
    try {
      const b = await n(w);
      r(b), m("");
    } catch (b) {
      const k = b instanceof Error ? b.message : "Upload failed. Please try again.";
      g(k);
    } finally {
      f(!1);
    }
  }
  function y(w) {
    w.length > 0 && N(w[0]);
  }
  async function v() {
    const w = x.trim();
    w && await N({ url: w });
  }
  if (t) {
    const w = a(t.imageId);
    return /* @__PURE__ */ e(
      "div",
      {
        className: I("flex flex-col gap-3", l),
        "data-testid": p,
        children: /* @__PURE__ */ o("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ e(
            Co,
            {
              src: w,
              alt: "Uploaded image",
              size: "md",
              aspectRatio: "square",
              "data-testid": p ? `${p}-thumbnail` : void 0
            }
          ),
          /* @__PURE__ */ e(
            Oe,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => r(null),
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
          La,
          {
            accept: s,
            maxSize: i,
            onFiles: y,
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
                Bt,
                {
                  type: "url",
                  placeholder: "https://example.com/image.jpg",
                  value: x,
                  onChange: (w) => m(w.target.value),
                  disabled: u,
                  "data-testid": p ? `${p}-url-input` : void 0,
                  onKeyDown: (w) => {
                    w.key === "Enter" && v();
                  }
                }
              ),
              /* @__PURE__ */ e(
                Oe,
                {
                  variant: "secondary",
                  size: "sm",
                  onClick: () => {
                    v();
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
function Fo(t) {
  const r = ko(), n = r.uploadImage;
  return n ? /* @__PURE__ */ e(
    ud,
    {
      ...t,
      uploadImage: n,
      getImageUrl: r.getImageUrl
    }
  ) : /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: "This host has not wired uploadImage. Cannot accept new uploads." });
}
const jn = {
  brightness: "Brightness",
  contrast: "Contrast",
  saturation: "Saturation",
  hue: "Hue",
  blur: "Blur"
}, jo = Object.keys(jn).map((t) => ({
  value: t,
  label: jn[t]
})), md = {
  brightness: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  contrast: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  saturation: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  hue: { min: -180, max: 180, step: 1, unit: "°", defaultValue: 0 },
  blur: { min: 0, max: 50, step: 0.5, unit: "px", defaultValue: 1 }
};
function zo(t) {
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
function hd(t) {
  switch (t.kind) {
    case "hue":
      return t.degrees;
    case "blur":
      return t.radiusPx;
    default:
      return t.value;
  }
}
function Or(t, r) {
  switch (t.kind) {
    case "hue":
      return { kind: "hue", degrees: r };
    case "blur":
      return { kind: "blur", radiusPx: r };
    default:
      return { kind: t.kind, value: r };
  }
}
const fd = I(
  "w-4 h-full flex items-center justify-center",
  "text-[14px] text-text-tertiary cursor-grab select-none shrink-0"
);
I(
  "text-[11px] font-semibold px-2 py-0.5 rounded-full",
  "bg-surface-hover border border-border text-text-secondary",
  "whitespace-nowrap shrink-0"
);
function gd({ layer: t, index: r, onUpdate: n, onRemove: a }) {
  const i = md[t.kind], s = hd(t), d = (p) => {
    n(zo(p.target.value));
  }, c = (p) => {
    const u = parseFloat(p.target.value);
    Number.isFinite(u) && n(Or(t, u));
  }, l = (p) => {
    n(Or(t, p));
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-surface-inset",
      "data-testid": `layer-row-${r}`,
      children: [
        /* @__PURE__ */ e("span", { className: fd, "aria-hidden": "true", title: "Drag handle", children: "⠿" }),
        /* @__PURE__ */ e(
          en,
          {
            value: t.kind,
            onChange: d,
            options: jo,
            size: "sm",
            "aria-label": `Layer ${r + 1} kind`,
            "data-testid": `layer-kind-select-${r}`,
            className: "shrink-0"
          }
        ),
        /* @__PURE__ */ e(
          "input",
          {
            type: "range",
            min: i.min,
            max: i.max,
            step: i.step,
            value: s,
            onChange: c,
            className: "flex-1 h-1 accent-primary cursor-pointer min-w-0",
            "aria-label": `${jn[t.kind]} slider`,
            "data-testid": `layer-slider-${r}`
          }
        ),
        /* @__PURE__ */ e(
          da,
          {
            value: s,
            onChange: l,
            min: i.min,
            max: i.max,
            step: i.step,
            unit: i.unit,
            size: "sm",
            "data-testid": `layer-number-${r}`
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: a,
            className: I(
              "shrink-0 w-6 h-6 flex items-center justify-center rounded",
              "text-[12px] text-text-tertiary bg-transparent border-none",
              "cursor-pointer hover:text-danger-fg hover:bg-danger-bg"
            ),
            "aria-label": `Remove layer ${r + 1}`,
            "data-testid": `layer-remove-${r}`,
            children: "✕"
          }
        )
      ]
    }
  );
}
const xd = 150;
function bd(t, r, n) {
  const [a, i] = S(null), [s, d] = S(!1), c = le(null), l = le(null), p = D(
    async (u, f) => {
      l.current?.abort();
      const h = new AbortController();
      l.current = h, d(!0);
      try {
        const g = await fetch(`${n}/api/pipeline/preview/adjust-layer`, {
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
    [n]
  );
  return ne(() => {
    if (!t) {
      i(null);
      return;
    }
    return c.current && clearTimeout(c.current), c.current = setTimeout(() => {
      p(t, r);
    }, xd), () => {
      c.current && clearTimeout(c.current);
    };
  }, [t, JSON.stringify(r), p]), { previewSrc: a, loading: s };
}
function _r(t) {
  return t.length <= 8 ? t : `${t.slice(0, 8)}…`;
}
function yd({
  layers: t,
  onChange: r,
  autoSourceImageId: n,
  pinnedSourceImageId: a,
  onPinnedSourceImageIdChange: i,
  sourceImageId: s,
  apiBase: d = ""
}) {
  const [c, l] = S("brightness"), [p, u] = S(!1), f = n ?? s, h = a ?? f, g = !!a, { previewSrc: x, loading: m } = bd(h, t, d), N = () => {
    i?.(void 0);
  }, y = (C) => {
    C?.imageId && (i?.(C.imageId), u(!1));
  }, v = (C, T) => {
    r(t.map(($, R) => R === C ? T : $));
  }, w = (C) => {
    r(t.filter((T, $) => $ !== C));
  }, b = () => {
    r([...t, zo(c)]);
  }, k = (C) => {
    l(C.target.value);
  };
  return /* @__PURE__ */ o("div", { className: "flex gap-3 p-3", "data-testid": "adjust-layer-slider-panel", children: [
    /* @__PURE__ */ o("div", { className: "flex-1 flex flex-col gap-2 min-w-0", children: [
      t.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary italic", children: "No layers — add one below." }),
      t.map((C, T) => /* @__PURE__ */ e(
        gd,
        {
          layer: C,
          index: T,
          onUpdate: ($) => v(T, $),
          onRemove: () => w(T)
        },
        T
      )),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mt-1", children: [
        /* @__PURE__ */ e(
          en,
          {
            value: c,
            onChange: k,
            options: jo,
            size: "sm",
            "aria-label": "New layer kind",
            "data-testid": "new-layer-kind-select"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: b,
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
              se,
              {
                tone: "neutral",
                size: "xs",
                "data-testid": "adjust-layer-source-chip-pinned",
                children: [
                  /* @__PURE__ */ o("span", { children: [
                    "Source: pinned (",
                    _r(h),
                    ")"
                  ] }),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      onClick: N,
                      "aria-label": "Clear pinned source image",
                      "data-testid": "adjust-layer-source-clear-pin",
                      className: I(
                        "ml-1 inline-flex items-center justify-center",
                        "w-3 h-3 rounded-full text-[10px] leading-none",
                        "bg-transparent border-none cursor-pointer text-current",
                        "hover:bg-slate-200"
                      ),
                      children: "×"
                    }
                  )
                ]
              }
            ) : f ? /* @__PURE__ */ o(
              se,
              {
                tone: "info",
                size: "xs",
                "data-testid": "adjust-layer-source-chip-auto",
                children: [
                  "Source: ",
                  _r(f),
                  " from upstream run"
                ]
              }
            ) : null,
            i && /* @__PURE__ */ e(
              Oe,
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
      p && i && /* @__PURE__ */ e(
        "div",
        {
          className: "w-48",
          "data-testid": "adjust-layer-override-uploader-wrap",
          children: /* @__PURE__ */ e(
            Fo,
            {
              value: null,
              onChange: y,
              "data-testid": "adjust-layer-override-uploader"
            }
          )
        }
      ),
      h ? /* @__PURE__ */ o("div", { className: "relative", children: [
        /* @__PURE__ */ e(
          Co,
          {
            src: x ?? "",
            alt: "Adjust layer preview",
            size: "lg",
            aspectRatio: "auto",
            loading: "eager",
            "data-testid": "adjust-layer-preview-thumb"
          }
        ),
        m && /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center justify-center bg-white/60 rounded-md", children: /* @__PURE__ */ e("span", { className: "text-[11px] text-text-secondary", children: "Loading…" }) })
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
const vd = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Nd({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const Lr = "text-[12px] font-semibold text-text-secondary", wd = "text-[11px] text-text-tertiary mt-0.5";
function kd(t) {
  const { definition: r } = Ue(), n = q(() => !t || !r ? null : r.edges.find((s) => s.target === t)?.source ?? null, [r, t]);
  return me(n ?? "")?.images?.[0]?.imageId;
}
function Cd({
  data: t,
  onChange: r,
  currentNodeId: n
}) {
  const a = kd(n), i = t.previewSourceImageId, s = t.layers ?? [];
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-layer-source-image-path", className: Lr, children: [
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
          onChange: (d) => r({ sourceImagePath: d.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: wd, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(Nd, { samples: vd, onSelect: (d) => r({ sourceImagePath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${Lr} mb-1`, children: [
        "Adjustment layers ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      /* @__PURE__ */ e(
        yd,
        {
          layers: s,
          onChange: (d) => r({ layers: d }),
          autoSourceImageId: a,
          pinnedSourceImageId: i,
          onPinnedSourceImageIdChange: (d) => r({ previewSourceImageId: d })
        }
      )
    ] })
  ] });
}
function Id(t) {
  const { selectedNodeId: r } = Ue();
  return /* @__PURE__ */ e(Cd, { ...t, currentNodeId: r });
}
const Sd = [
  "$.imageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function $d({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const Br = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", Ur = "text-[12px] font-semibold text-text-secondary", Td = "text-[11px] text-text-tertiary mt-0.5";
function Ad({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "dimensions-source-image-path", className: Ur, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "dimensions-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Br,
          value: t.sourceImagePath ?? "",
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e($d, { samples: Sd, onSelect: (n) => r({ sourceImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "dimensions-max-edge", className: Ur, children: "Max edge (px)" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "dimensions-max-edge",
          type: "number",
          min: 1,
          step: 1,
          className: Br,
          value: t.maxEdge ?? 1024,
          onChange: (n) => {
            const a = parseInt(n.target.value, 10);
            r({ maxEdge: Number.isFinite(a) && a > 0 ? a : 1024 });
          }
        }
      ),
      /* @__PURE__ */ o("div", { className: Td, children: [
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
const Rd = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Pd({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const zn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Md = `${zn} font-mono`, $n = "text-[12px] font-semibold text-text-secondary", Fr = "text-[11px] text-text-tertiary mt-0.5";
function Ed({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "upscale-prompt", className: $n, children: [
        "Prompt ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "upscale-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${zn} resize-y min-h-16`,
          value: t.prompt ?? "",
          onChange: (n) => r({ prompt: n.target.value.trim() ? n.target.value : void 0 }),
          placeholder: "optional guidance forwarded to the upscaler"
        }
      ),
      /* @__PURE__ */ e("div", { className: Fr, children: "Optional text guidance forwarded to the self-hosted x4 upscaler." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "upscale-max-edge", className: $n, children: "Max edge (px)" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "upscale-max-edge",
          type: "number",
          min: 1,
          step: 1,
          className: zn,
          value: t.maxEdge ?? 1024,
          onChange: (n) => {
            const a = parseInt(n.target.value, 10);
            r({ maxEdge: Number.isFinite(a) && a > 0 ? a : 1024 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Fr, children: "Longest-edge cap applied before the 4× super-resolution pass." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "upscale-source-image-path", className: $n, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "upscale-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Md,
          value: t.sourceImagePath ?? "",
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Pd, { samples: Rd, onSelect: (n) => r({ sourceImagePath: n }) })
    ] })
  ] });
}
const Dd = [
  "claude-opus-4-7",
  "claude-sonnet-4-6",
  "claude-haiku-4-5-20251001"
], Od = [
  "$.trigger.imageRef",
  "$.trigger.image",
  "$.steps.upload.output.imageId"
];
function _d(t) {
  if (!t) return !1;
  const r = t.properties;
  if (!r || typeof r != "object" || Array.isArray(r)) return !1;
  const n = r.regions;
  return typeof n == "object" && n !== null;
}
function Ld(t) {
  const r = t.trim();
  if (r.length === 0) return { ok: !0, value: void 0 };
  try {
    const n = JSON.parse(r);
    return n === null || typeof n != "object" || Array.isArray(n) ? { ok: !1, error: "Schema must be a JSON object" } : { ok: !0, value: n };
  } catch (n) {
    return { ok: !1, error: n.message };
  }
}
const pt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", qn = "mt-1 w-full text-[12px] rounded border border-danger bg-white px-2 py-1 outline-none", Bd = `${pt} font-mono`, Ud = `${qn} font-mono`, nt = "text-[12px] font-semibold text-text-secondary", Ke = "text-[11px] text-text-tertiary mt-0.5", Jt = "text-[11px] text-danger-fg mt-0.5";
function Fd({ data: t, onChange: r }) {
  const [n, a] = S(!1), [i, s] = S(
    t.outputSchema ? JSON.stringify(t.outputSchema, null, 2) : ""
  ), [d, c] = S(null), l = !t.userPrompt?.trim(), p = !t.imageRefPath?.trim(), u = !!t.imageRefPath && !t.imageRefPath.startsWith("$."), f = _d(t.outputSchema), h = D(
    (x) => {
      r({ seedRegions: x });
    },
    [r]
  ), g = (x) => {
    s(x);
    const m = Ld(x);
    if (!m.ok) {
      c(m.error);
      return;
    }
    c(null), r({ outputSchema: m.value });
  };
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-model", className: nt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-model",
          className: pt,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (x) => r({ model: x.target.value }),
          children: Dd.map((x) => /* @__PURE__ */ e("option", { value: x, children: x }, x))
        }
      ),
      /* @__PURE__ */ e("div", { className: Ke, children: "Anthropic Messages API. Requires ANTHROPIC_API_KEY on platform-api." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-image-ref-path", className: nt, children: [
        "Image reference path",
        /* @__PURE__ */ e("span", { className: "text-danger-fg ml-1", children: "●" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-image-ref-path",
          type: "text",
          spellCheck: !1,
          "aria-invalid": p || u ? "true" : void 0,
          "aria-describedby": p || u ? "vision-image-ref-path-error" : void 0,
          className: p || u ? Ud : Bd,
          value: t.imageRefPath ?? "",
          onChange: (x) => r({ imageRefPath: x.target.value }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      p ? /* @__PURE__ */ e("div", { id: "vision-image-ref-path-error", role: "alert", className: Jt, children: "Image reference path is required." }) : u ? /* @__PURE__ */ o("div", { id: "vision-image-ref-path-error", role: "alert", className: Jt, children: [
        "Path must start with ",
        /* @__PURE__ */ e("code", { children: "$." })
      ] }) : /* @__PURE__ */ e("div", { className: Ke, children: "JSONPath into context. The value must be a string imageId or object with imageId." }),
      /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: Od.map((x) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => r({ imageRefPath: x }),
          className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
          children: x
        },
        x
      )) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-user-prompt", className: nt, children: [
        "User prompt",
        /* @__PURE__ */ e("span", { className: "text-danger-fg ml-1", children: "●" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-user-prompt",
          "aria-invalid": l ? "true" : void 0,
          "aria-describedby": l ? "vision-user-prompt-error" : void 0,
          className: `${l ? qn : pt} min-h-20 resize-y`,
          value: t.userPrompt,
          onChange: (x) => r({ userPrompt: x.target.value })
        }
      ),
      l ? /* @__PURE__ */ e("div", { id: "vision-user-prompt-error", role: "alert", className: Jt, children: "User prompt is required." }) : /* @__PURE__ */ o("div", { className: Ke, children: [
        "Supports ",
        "{{ context.* }}",
        " substitution."
      ] })
    ] }),
    f && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: nt, children: "Focus regions (optional)" }),
      /* @__PURE__ */ e("div", { className: Ke, children: "Drag on the image to paint focus boxes. The next vision pass will use these as analysis hints." }),
      /* @__PURE__ */ e(
        Uo,
        {
          imageUrl: "",
          imageWidth: 800,
          imageHeight: 600,
          boxes: t.seedRegions ?? [],
          onChange: h,
          className: "mt-1"
        }
      ),
      (t.seedRegions?.length ?? 0) > 0 && /* @__PURE__ */ o("div", { className: Ke, "data-testid": "bbox-region-count", children: [
        t.seedRegions.length,
        " region",
        t.seedRegions.length !== 1 ? "s" : "",
        " defined."
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-output-schema", className: nt, children: "Output schema (optional)" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-output-schema",
          "aria-invalid": d ? "true" : void 0,
          "aria-describedby": d ? "vision-output-schema-error" : void 0,
          className: `${d ? qn : pt} font-mono text-[11px] min-h-28 resize-y`,
          value: i,
          onChange: (x) => g(x.target.value),
          placeholder: `{
  "type": "object",
  "properties": {
    "caption": { "type": "string" }
  }
}`
        }
      ),
      d ? /* @__PURE__ */ o("div", { id: "vision-output-schema-error", role: "alert", className: Jt, children: [
        "Invalid JSON: ",
        d
      ] }) : t.outputSchema ? /* @__PURE__ */ e("div", { className: Ke, children: "Extract mode — model must return JSON matching this schema." }) : /* @__PURE__ */ e("div", { className: Ke, children: "Leave blank for caption mode (freeform analysis text)." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => a((x) => !x),
          className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] font-semibold text-text-secondary flex items-center gap-1",
          children: [
            /* @__PURE__ */ e("span", { children: n ? "▾" : "▸" }),
            " Advanced"
          ]
        }
      ),
      n && /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 mt-2", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("label", { htmlFor: "vision-max-output-tokens", className: nt, children: "Max output tokens" }),
          /* @__PURE__ */ e(
            "input",
            {
              id: "vision-max-output-tokens",
              type: "number",
              min: 1,
              max: 8192,
              className: pt,
              value: t.maxOutputTokens ?? "",
              onChange: (x) => {
                const m = x.target.value;
                r({ maxOutputTokens: m === "" ? void 0 : Math.max(1, parseInt(m, 10) || 0) });
              }
            }
          ),
          /* @__PURE__ */ e("div", { className: Ke, children: "Caps the response length. Default 2048." })
        ] }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("label", { htmlFor: "vision-system-prompt", className: nt, children: "System prompt override (optional)" }),
          /* @__PURE__ */ e(
            "textarea",
            {
              id: "vision-system-prompt",
              className: `${pt} min-h-14 resize-y`,
              value: t.systemPrompt ?? "",
              onChange: (x) => r({ systemPrompt: x.target.value || void 0 }),
              placeholder: "Leave blank to use the canned vision system prompt."
            }
          ),
          /* @__PURE__ */ e("div", { className: Ke, children: "Schema instructions are auto-appended when output schema is set." })
        ] })
      ] })
    ] })
  ] });
}
const jd = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function zd({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const qd = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], Pt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Vd = `${Pt} font-mono`, $t = "text-[12px] font-semibold text-text-secondary", jr = "text-[11px] text-text-tertiary mt-0.5";
function Wd({ data: t, onChange: r }) {
  const [n, a] = S(""), i = t.labels ?? [], s = () => {
    const c = n.trim();
    !c || i.includes(c) || (r({ labels: [...i, c] }), a(""));
  }, d = (c) => {
    r({ labels: i.filter((l, p) => p !== c) });
  };
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-image-ref-path", className: $t, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-classify-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Vd,
          value: t.imageRefPath ?? "",
          onChange: (c) => r({ imageRefPath: c.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: jr, children: "JSONPath to the imageId to classify. Required." }),
      /* @__PURE__ */ e(zd, { samples: jd, onSelect: (c) => r({ imageRefPath: c }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: $t, children: "Labels (at least 2 required)" }),
      i.length > 0 && /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: i.map((c, l) => /* @__PURE__ */ o(
        "span",
        {
          className: "inline-flex items-center gap-1 text-[11px] font-semibold bg-surface-inset border border-border rounded-full px-2 py-0.5 text-text-secondary",
          children: [
            c,
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: () => d(l),
                className: "bg-transparent border-none cursor-pointer p-0 text-danger-fg text-[11px] leading-none",
                "aria-label": `Remove label ${c}`,
                children: "✕"
              }
            )
          ]
        },
        c
      )) }),
      /* @__PURE__ */ o("div", { className: "mt-1.5 flex gap-1.5", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            spellCheck: !1,
            className: `${Pt} flex-1 mt-0`,
            value: n,
            onChange: (c) => a(c.target.value),
            onKeyDown: (c) => {
              c.key === "Enter" && (c.preventDefault(), s());
            },
            placeholder: "Add label…"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: s,
            className: "text-[12px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer py-1 px-3 shrink-0",
            children: "Add"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: jr, children: "Press Enter or click Add. The model returns the single best-matching label." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-model", className: $t, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-classify-model",
          className: Pt,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (c) => r({ model: c.target.value }),
          children: qd.map((c) => /* @__PURE__ */ e("option", { value: c.value, children: c.label }, c.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-classify-system-prompt", className: $t, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-classify-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Pt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (c) => r({ systemPrompt: c.target.value || void 0 }),
          placeholder: "Leave blank to use the default classification system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-classify-max-output-tokens", className: $t, children: [
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
          className: Pt,
          value: t.maxOutputTokens ?? 256,
          onChange: (c) => {
            const l = parseInt(c.target.value, 10);
            r({ maxOutputTokens: Number.isFinite(l) && l > 0 ? l : 256 });
          }
        }
      )
    ] })
  ] });
}
const Jd = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function Hd({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const Gd = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more detail)" }
], Mt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Kd = `${Mt} font-mono`, Tt = "text-[12px] font-semibold text-text-secondary", zr = "text-[11px] text-text-tertiary mt-0.5";
function Yd({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-image-ref-path", className: Tt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-describe-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Kd,
          value: t.imageRefPath ?? "",
          onChange: (n) => r({ imageRefPath: n.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: zr, children: "JSONPath to the imageId to describe. Required." }),
      /* @__PURE__ */ e(Hd, { samples: Jd, onSelect: (n) => r({ imageRefPath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-user-prompt", className: Tt, children: "User prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-describe-user-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Mt} resize-y`,
          value: t.userPrompt ?? "",
          onChange: (n) => r({ userPrompt: n.target.value }),
          placeholder: "Describe what you see in this image in one paragraph."
        }
      ),
      /* @__PURE__ */ e("div", { className: zr, children: "Required. What to ask the model about the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-model", className: Tt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-describe-model",
          className: Mt,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (n) => r({ model: n.target.value }),
          children: Gd.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-describe-system-prompt", className: Tt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-describe-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Mt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (n) => r({ systemPrompt: n.target.value || void 0 }),
          placeholder: "Leave blank to use the default describe system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-describe-max-output-tokens", className: Tt, children: [
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
          className: Mt,
          value: t.maxOutputTokens ?? 512,
          onChange: (n) => {
            const a = parseInt(n.target.value, 10);
            r({ maxOutputTokens: Number.isFinite(a) && a > 0 ? a : 512 });
          }
        }
      )
    ] })
  ] });
}
const Xd = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function Qd({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const Zd = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], ut = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", ep = `${ut} font-mono`, lt = "text-[12px] font-semibold text-text-secondary", qr = "text-[11px] text-text-tertiary mt-0.5";
function tp({ data: t, onChange: r }) {
  const [n, a] = S(""), i = t.candidateTags ?? [], s = () => {
    const c = n.trim();
    !c || i.includes(c) || (r({ candidateTags: [...i, c] }), a(""));
  }, d = (c) => {
    r({ candidateTags: i.filter((l, p) => p !== c) });
  };
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-tag-image-ref-path", className: lt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-tag-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: ep,
          value: t.imageRefPath ?? "",
          onChange: (c) => r({ imageRefPath: c.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: qr, children: "JSONPath to the imageId to tag. Required." }),
      /* @__PURE__ */ e(Qd, { samples: Xd, onSelect: (c) => r({ imageRefPath: c }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: lt, children: [
        "Candidate tags ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional — omit for open-vocabulary)" })
      ] }),
      i.length > 0 && /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: i.map((c, l) => /* @__PURE__ */ o(
        "span",
        {
          className: "inline-flex items-center gap-1 text-[11px] font-semibold bg-surface-inset border border-border rounded-full px-2 py-0.5 text-text-secondary",
          children: [
            c,
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: () => d(l),
                className: "bg-transparent border-none cursor-pointer p-0 text-danger-fg text-[11px] leading-none",
                "aria-label": `Remove candidate tag ${c}`,
                children: "✕"
              }
            )
          ]
        },
        c
      )) }),
      /* @__PURE__ */ o("div", { className: "mt-1.5 flex gap-1.5", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            spellCheck: !1,
            className: `${ut} flex-1 mt-0`,
            value: n,
            onChange: (c) => a(c.target.value),
            onKeyDown: (c) => {
              c.key === "Enter" && (c.preventDefault(), s());
            },
            placeholder: "Add candidate tag…"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: s,
            className: "text-[12px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer py-1 px-3 shrink-0",
            children: "Add"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: qr, children: "Restricts tagging to this vocabulary. Leave empty for open-ended tags." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-max-tags", className: lt, children: [
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
          className: ut,
          value: t.maxTags ?? 10,
          onChange: (c) => {
            const l = parseInt(c.target.value, 10);
            r({ maxTags: Number.isFinite(l) && l >= 1 ? l : 10 });
          }
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-tag-model", className: lt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-tag-model",
          className: ut,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (c) => r({ model: c.target.value }),
          children: Zd.map((c) => /* @__PURE__ */ e("option", { value: c.value, children: c.label }, c.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-system-prompt", className: lt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-tag-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${ut} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (c) => r({ systemPrompt: c.target.value || void 0 }),
          placeholder: "Leave blank to use the default tagging system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-max-output-tokens", className: lt, children: [
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
          className: ut,
          value: t.maxOutputTokens ?? 256,
          onChange: (c) => {
            const l = parseInt(c.target.value, 10);
            r({ maxOutputTokens: Number.isFinite(l) && l > 0 ? l : 256 });
          }
        }
      )
    ] })
  ] });
}
const np = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function rp({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const op = [
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (default — best OCR accuracy)" },
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (faster, lower accuracy)" }
], Yt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", ap = `${Yt} font-mono`, Ht = "text-[12px] font-semibold text-text-secondary", Tn = "text-[11px] text-text-tertiary mt-0.5";
function ip({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-image-ref-path", className: Ht, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-extract-text-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: ap,
          value: t.imageRefPath ?? "",
          onChange: (n) => r({ imageRefPath: n.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Tn, children: "JSONPath to the imageId to extract text from. Required." }),
      /* @__PURE__ */ e(rp, { samples: np, onSelect: (n) => r({ imageRefPath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-model", className: Ht, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-extract-text-model",
          className: Yt,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (n) => r({ model: n.target.value }),
          children: op.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
        }
      ),
      /* @__PURE__ */ e("div", { className: Tn, children: "Defaults to Sonnet for best OCR accuracy." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-extract-text-system-prompt", className: Ht, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-extract-text-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Yt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (n) => r({ systemPrompt: n.target.value || void 0 }),
          placeholder: "Leave blank to use the default OCR system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-extract-text-max-output-tokens", className: Ht, children: [
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
          className: Yt,
          value: t.maxOutputTokens ?? 1024,
          onChange: (n) => {
            const a = parseInt(n.target.value, 10);
            r({ maxOutputTokens: Number.isFinite(a) && a > 0 ? a : 1024 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Tn, children: "Increase for documents with large amounts of text." })
    ] })
  ] });
}
const sp = [
  { value: "amazon.titan-image-generator-v2:0", label: "Titan v2 (default)" },
  { value: "amazon.titan-image-generator-v1", label: "Titan v1" }
], ct = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", dt = "text-[12px] font-semibold text-text-secondary", Vr = "text-[11px] text-text-tertiary mt-0.5";
function lp({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "generate-prompt", className: dt, children: "Prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "generate-prompt",
          rows: 4,
          spellCheck: !1,
          className: `${ct} resize-y min-h-20`,
          value: t.prompt ?? "",
          onChange: (n) => r({ prompt: n.target.value }),
          placeholder: "A photorealistic photograph of a golden retriever in a sunny meadow"
        }
      ),
      /* @__PURE__ */ e("div", { className: Vr, children: "Text description of the image to generate. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "generate-model", className: dt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "generate-model",
          className: ct,
          value: t.model ?? "amazon.titan-image-generator-v2:0",
          onChange: (n) => r({ model: n.target.value }),
          children: sp.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "generate-width", className: dt, children: "Width (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "generate-width",
            type: "number",
            min: 64,
            max: 2048,
            step: 64,
            className: ct,
            value: t.width ?? 512,
            onChange: (n) => {
              const a = parseInt(n.target.value, 10);
              r({ width: Number.isFinite(a) && a > 0 ? a : 512 });
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "generate-height", className: dt, children: "Height (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "generate-height",
            type: "number",
            min: 64,
            max: 2048,
            step: 64,
            className: ct,
            value: t.height ?? 512,
            onChange: (n) => {
              const a = parseInt(n.target.value, 10);
              r({ height: Number.isFinite(a) && a > 0 ? a : 512 });
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "generate-seed", className: dt, children: [
        "Seed ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional — for reproducibility)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "generate-seed",
          type: "number",
          min: 0,
          step: 1,
          className: ct,
          value: t.seed ?? "",
          onChange: (n) => {
            const a = parseInt(n.target.value, 10);
            r({ seed: Number.isFinite(a) && a >= 0 ? a : void 0 });
          },
          placeholder: "random"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "generate-num-images", className: dt, children: [
        "Number of images ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(fan-out when > 1)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "generate-num-images",
          type: "number",
          min: 1,
          max: 8,
          step: 1,
          className: ct,
          value: t.numImages ?? 1,
          onChange: (n) => {
            const a = parseInt(n.target.value, 10);
            r({ numImages: Number.isFinite(a) && a >= 1 ? Math.min(8, a) : 1 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Vr, children: "When > 1, the step fans out with one arm per image. Each arm carries one imageId." })
    ] })
  ] });
}
const cp = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function dp({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const pp = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], Xt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", up = `${Xt} font-mono`, Gt = "text-[12px] font-semibold text-text-secondary", Wr = "text-[11px] text-text-tertiary mt-0.5";
function mp({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-source-image-path", className: Gt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "variation-source-image-path",
          type: "text",
          spellCheck: !1,
          className: up,
          value: t.sourceImagePath ?? "",
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(dp, { samples: cp, onSelect: (n) => r({ sourceImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "variation-model", className: Gt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "variation-model",
          className: Xt,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (n) => r({ model: n.target.value }),
          children: pp.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-num-variations", className: Gt, children: [
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
          className: Xt,
          value: t.numVariations ?? 1,
          onChange: (n) => {
            const a = parseInt(n.target.value, 10);
            r({ numVariations: Number.isFinite(a) && a >= 1 ? Math.min(8, a) : 1 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Wr, children: "Always fans out — each variation becomes a separate arm downstream." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-similarity", className: Gt, children: [
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
          className: Xt,
          value: t.similarity ?? 0.7,
          onChange: (n) => {
            const a = parseFloat(n.target.value);
            r({ similarity: Number.isFinite(a) ? Math.min(1, Math.max(0, a)) : 0.7 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Wr, children: "0 = very different, 1 = nearly identical. 0.7 is a good starting point." })
    ] })
  ] });
}
const hp = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
], fp = [
  "$.steps.mask.output.imageId",
  "$.trigger.maskRef"
];
function Jr({ samples: t, onSelect: r }) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
      children: n
    },
    n
  )) });
}
const gp = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], Vn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Hr = `${Vn} font-mono`, Kt = "text-[12px] font-semibold text-text-secondary", Gr = "text-[11px] text-text-tertiary mt-0.5";
function xp({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-source-image-path", className: Kt, children: [
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
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Jr, { samples: hp, onSelect: (n) => r({ sourceImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-mask-image-path", className: Kt, children: [
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
          onChange: (n) => r({ maskImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.steps.mask.output.imageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: Gr, children: "JSONPath to a mask image. White pixels = edit region, black = preserve. Omit for outpainting." }),
      /* @__PURE__ */ e(Jr, { samples: fp, onSelect: (n) => r({ maskImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-prompt", className: Kt, children: "Edit prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "edit-prompt-prompt",
          rows: 4,
          spellCheck: !1,
          className: `${Vn} resize-y min-h-20`,
          value: t.prompt ?? "",
          onChange: (n) => r({ prompt: n.target.value }),
          placeholder: "Replace the background with a sunny beach"
        }
      ),
      /* @__PURE__ */ e("div", { className: Gr, children: "Describes what to generate in the masked region. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-model", className: Kt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "edit-prompt-model",
          className: Vn,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (n) => r({ model: n.target.value }),
          children: gp.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
        }
      )
    ] })
  ] });
}
const bp = {
  // -------------------------------------------------------------------------
  // Trigger
  // -------------------------------------------------------------------------
  trigger: /* @__PURE__ */ o(G, { children: [
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
  llm: /* @__PURE__ */ o(G, { children: [
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
  transform: /* @__PURE__ */ o(G, { children: [
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
  condition: /* @__PURE__ */ o(G, { children: [
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
  action: /* @__PURE__ */ o(G, { children: [
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
  fork: /* @__PURE__ */ o(G, { children: [
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
  join: /* @__PURE__ */ o(G, { children: [
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
  approval: /* @__PURE__ */ o(G, { children: [
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
  // Agent (AgentCore)
  // -------------------------------------------------------------------------
  agent: /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Invokes a Strands agent via A2A protocol. The agent processes the input and returns a structured response." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "agentId" }),
        " — AgentCore agent identifier or ARN."
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
  "mcp-tool": /* @__PURE__ */ o(G, { children: [
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
  "knowledge-base": /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Queries a Bedrock Knowledge Base for relevant document chunks (RAG retrieval)." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "knowledgeBaseId" }),
        " — Bedrock KB identifier."
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
  "graph-query": /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Runs an openCypher query against a Neptune Analytics graph." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "graphId" }),
        " — Neptune Analytics graph identifier."
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
  memory: /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Reads from or writes to AgentCore Memory (session or long-term)." }),
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
  guardrail: /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Applies Bedrock Guardrails content filtering. Evaluates input against configured policies and routes accordingly." }),
    /* @__PURE__ */ e("h4", { children: "Fields" }),
    /* @__PURE__ */ o("ul", { children: [
      /* @__PURE__ */ o("li", { children: [
        /* @__PURE__ */ e("code", { children: "guardrailId" }),
        " — Bedrock Guardrail identifier."
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
  policy: /* @__PURE__ */ o(G, { children: [
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
  "ag-ui-output": /* @__PURE__ */ o(G, { children: [
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
  "image-source": /* @__PURE__ */ o(G, { children: [
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
  "image:save": /* @__PURE__ */ o(G, { children: [
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
  scatter: /* @__PURE__ */ o(G, { children: [
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
  "image:resize": /* @__PURE__ */ o(G, { children: [
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
  "image:transform": /* @__PURE__ */ o(G, { children: [
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
  "image:format-convert": /* @__PURE__ */ o(G, { children: [
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
  "image:sharpen": /* @__PURE__ */ o(G, { children: [
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
  "image:watermark": /* @__PURE__ */ o(G, { children: [
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
  "image:crop": /* @__PURE__ */ o(G, { children: [
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
  "image:adjust-bw": /* @__PURE__ */ o(G, { children: [
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
  "image:adjust-layer": /* @__PURE__ */ o(G, { children: [
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
  "image:dimensions": /* @__PURE__ */ o(G, { children: [
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
  "image:upscale": /* @__PURE__ */ o(G, { children: [
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
  "image:vision-analyze": /* @__PURE__ */ o(G, { children: [
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
  "image:vision-classify": /* @__PURE__ */ o(G, { children: [
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
  "image:vision-describe": /* @__PURE__ */ o(G, { children: [
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
  "image:vision-tag": /* @__PURE__ */ o(G, { children: [
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
  "image:vision-extract-text": /* @__PURE__ */ o(G, { children: [
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
  "image:generate": /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ e("h4", { children: "What it does" }),
    /* @__PURE__ */ e("p", { children: "Generates images from a text prompt using Amazon Bedrock Titan Image Generator." }),
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
  "image:variation": /* @__PURE__ */ o(G, { children: [
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
  "image:edit-prompt": /* @__PURE__ */ o(G, { children: [
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
function yp({ result: t, className: r }) {
  const { caption: n, setting: a, location: i, timeOfDay: s, mood: d, colors: c } = t;
  return !n && !a && !i && !s && !d && (!c || c.length === 0) ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", r), children: [
    n ? /* @__PURE__ */ e("p", { className: "text-base leading-relaxed text-text-primary", children: n }) : null,
    /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1.5", children: [
      a ? /* @__PURE__ */ o(se, { tone: "neutral", size: "sm", title: "Scene setting", children: [
        "setting: ",
        a
      ] }) : null,
      i ? /* @__PURE__ */ o(se, { tone: "neutral", size: "sm", title: "Location", children: [
        "loc: ",
        i
      ] }) : null,
      s ? /* @__PURE__ */ o(se, { tone: "neutral", size: "sm", title: "Time of day", children: [
        "tod: ",
        s
      ] }) : null,
      d ? /* @__PURE__ */ o(se, { tone: "info", size: "sm", title: "Mood", children: [
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
const vp = {
  people: { stroke: "#4f46e5", fill: "rgba(79,70,229,0.10)", text: "bg-primary text-white" },
  object: { stroke: "#d97706", fill: "rgba(217,119,6,0.10)", text: "bg-warning text-white" }
};
function Np({
  imageUrl: t,
  imageDataUrl: r,
  imageWidth: n,
  imageHeight: a,
  people: i,
  objects: s,
  show: d = "both",
  onSelectPerson: c,
  onSelectObject: l,
  className: p,
  alt: u
}) {
  const f = r ?? t, [h, g] = S(null), x = le(null), m = D(() => {
    const v = x.current;
    v && (!n || !a) && g({ w: v.naturalWidth, h: v.naturalHeight });
  }, [n, a]), N = q(() => n && a && n > 0 && a > 0 ? { w: n, h: a } : h && h.w > 0 && h.h > 0 ? h : null, [n, a, h]), y = (v, w, b, k, C) => {
    if (!N) return null;
    const T = Math.max(0, Math.min(v.x1, N.w)), $ = Math.max(0, Math.min(v.y1, N.h)), R = Math.max(0, Math.min(v.x2, N.w)), E = Math.max(0, Math.min(v.y2, N.h));
    if (!Number.isFinite(T) || !Number.isFinite($) || !Number.isFinite(R) || !Number.isFinite(E) || R <= T || E <= $) return null;
    const A = T / N.w * 100, j = $ / N.h * 100, W = (R - T) / N.w * 100, ie = (E - $) / N.h * 100, Y = vp[b];
    return /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: k,
        title: w,
        "aria-label": `${b === "people" ? "Person" : "Object"} bounding box: ${w}`,
        className: "group absolute m-0 cursor-pointer border-0 p-0 outline-none focus:ring-2 focus:ring-offset-1",
        style: {
          left: `${A}%`,
          top: `${j}%`,
          width: `${W}%`,
          height: `${ie}%`,
          background: Y.fill,
          border: `2px solid ${Y.stroke}`,
          borderRadius: "2px"
        },
        children: /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "pointer-events-none absolute -top-5 left-0 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none shadow",
              Y.text
            ),
            children: w
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
        /* @__PURE__ */ e(
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
        N ? /* @__PURE__ */ e("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ o("div", { className: "pointer-events-auto absolute inset-0", children: [
          (d === "people" || d === "both") && (i ?? []).map(
            (v) => y(
              v.bbox,
              `#${v.index}${v.activity ? " · " + v.activity.replace(/^::\s*/, "") : ""}`,
              "people",
              c ? () => c(v) : void 0,
              `p-${v.index}`
            )
          ),
          (d === "objects" || d === "both") && (s ?? []).map(
            (v, w) => y(
              v.bbox,
              v.label,
              "object",
              l ? () => l(v) : void 0,
              `o-${w}-${v.label}`
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
function wp(t) {
  return {
    imageUrl: t.imageUrl,
    imageDataUrl: t.imageDataUrl,
    imageWidth: t.imageWidth,
    imageHeight: t.imageHeight,
    people: t.people,
    objects: t.objects
  };
}
function kp({ people: t, highlightedIndex: r, onSelect: n, className: a }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", a), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "People (",
      t.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1.5", children: t.map((i) => {
      const s = r === i.index, d = i.activity?.replace(/^::\s*/, ""), c = I(
        "group flex w-full flex-col gap-1 rounded-lg border px-2.5 py-2 text-left text-sm transition-colors",
        s ? "border-primary bg-primary-bg/70 ring-1 ring-primary" : "border-border bg-surface hover:bg-surface-hover"
      ), l = /* @__PURE__ */ o(G, { children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": !0,
              className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-white",
              children: i.index
            }
          ),
          i.ageBucket ? /* @__PURE__ */ e(se, { tone: "neutral", size: "sm", children: i.ageBucket.replace("_", " ") }) : null,
          i.gender ? /* @__PURE__ */ e(se, { tone: "neutral", size: "sm", children: i.gender }) : null,
          i.faceOrientation ? /* @__PURE__ */ e(se, { tone: "neutral", size: "sm", title: "Face orientation", children: i.faceOrientation }) : null,
          i.expression ? /* @__PURE__ */ e(se, { tone: "info", size: "sm", children: i.expression }) : null
        ] }),
        d ? /* @__PURE__ */ o("div", { className: "text-[13px] text-text-primary", children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "activity:" }),
          " ",
          d
        ] }) : null,
        i.clothing ? /* @__PURE__ */ o("div", { className: "text-[12px] text-text-secondary", children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "wearing:" }),
          " ",
          i.clothing
        ] }) : null
      ] });
      return n ? /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => n(i),
          className: I(
            c,
            "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          ),
          "aria-pressed": s,
          children: l
        }
      ) }, i.index) : /* @__PURE__ */ e("li", { className: c, children: l }, i.index);
    }) })
  ] });
}
function Cp({ objects: t, onSelect: r, className: n }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", n), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Objects (",
      t.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "grid grid-cols-1 gap-1 sm:grid-cols-2", children: t.map((a, i) => {
      const s = I(
        "flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 text-left text-[13px]"
      ), d = /* @__PURE__ */ o(G, { children: [
        /* @__PURE__ */ e("span", { className: "truncate font-medium text-text-primary", children: a.label }),
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
      return r ? /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => r(a),
          className: I(
            s,
            "cursor-pointer hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          ),
          children: d
        }
      ) }, `${a.label}-${i}`) : /* @__PURE__ */ e("li", { className: s, children: d }, `${a.label}-${i}`);
    }) })
  ] });
}
function Ip({ tags: t, onTagClick: r, className: n }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", n), children: [
    /* @__PURE__ */ e("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Tags" }),
    /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: t.map(
      (a) => r ? /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => r(a),
          title: `Filter by ${a}`,
          "aria-label": `Filter by ${a}`,
          className: "appearance-none border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-full",
          children: /* @__PURE__ */ o(se, { tone: "info", size: "sm", children: [
            "#",
            a
          ] })
        },
        a
      ) : /* @__PURE__ */ o(se, { tone: "info", size: "sm", children: [
        "#",
        a
      ] }, a)
    ) })
  ] });
}
function Qt(t) {
  return t ? t === "correct" || t === "neutral" || t === "normal" ? "success" : "warning" : "neutral";
}
function An(t) {
  const r = Qt(t);
  return r === "success" ? `OK · ${t}` : r === "warning" ? `ADJUST · ${t}` : t ?? "";
}
function Sp({
  exposure: t,
  whiteBalance: r,
  contrast: n,
  composition: a,
  edits: i,
  onApplyEdit: s,
  className: d
}) {
  const c = t || r || n || a, l = (i ?? []).length > 0;
  return !c && !l ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", d), children: [
    /* @__PURE__ */ e("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Edits & Quality" }),
    c ? /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-1.5 sm:grid-cols-2", children: [
      t ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-text-tertiary", children: "EXPOSURE" }),
          /* @__PURE__ */ e(se, { tone: Qt(t.verdict), size: "sm", children: An(t.verdict) }),
          t.evAdjustment !== 0 ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
            t.evAdjustment > 0 ? "+" : "",
            t.evAdjustment.toFixed(1),
            " EV"
          ] }) : null
        ] }),
        /* @__PURE__ */ e("p", { className: "mt-1 text-[12px] text-text-primary", children: t.rationale })
      ] }) : null,
      r ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-text-tertiary", children: "WB" }),
          /* @__PURE__ */ e(se, { tone: Qt(r.verdict), size: "sm", children: An(r.verdict) }),
          r.kelvinShift ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
            r.kelvinShift > 0 ? "+" : "",
            r.kelvinShift,
            "K"
          ] }) : null
        ] }),
        /* @__PURE__ */ e("p", { className: "mt-1 text-[12px] text-text-primary", children: r.rationale })
      ] }) : null,
      n ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-text-tertiary", children: "CONTRAST" }),
        /* @__PURE__ */ e("span", { className: "ml-1.5", children: /* @__PURE__ */ e(se, { tone: Qt(n), size: "sm", children: An(n) }) })
      ] }) : null,
      a ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-text-tertiary", children: "COMPOSITION" }),
        /* @__PURE__ */ e("p", { className: "mt-1 text-[12px] text-text-primary", children: a })
      ] }) : null
    ] }) : null,
    l ? /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1", children: (i ?? []).map((p, u) => /* @__PURE__ */ o(
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
function $p({
  result: t,
  showImage: r = !0,
  showCaption: n = !0,
  showPeople: a = !0,
  showObjects: i = !0,
  showTags: s = !0,
  showEdits: d = !0,
  showRawText: c = !1,
  onTagClick: l,
  onApplyEdit: p,
  className: u
}) {
  const [f, h] = S(), [g, x] = S(!1), m = (y) => h(f === y.index ? void 0 : y.index), N = wp(t);
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-4 text-text-primary", u), children: [
    /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-12", children: [
      r ? /* @__PURE__ */ o("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ e(
          Np,
          {
            ...N,
            onSelectPerson: m,
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
          typeof t.model.tokensOut == "number" ? /* @__PURE__ */ o(G, { children: [
            /* @__PURE__ */ e("span", { children: "·" }),
            /* @__PURE__ */ o("span", { children: [
              t.model.tokensOut,
              " tok out"
            ] })
          ] }) : null
        ] }) : null
      ] }) : null,
      /* @__PURE__ */ o("div", { className: I("flex flex-col gap-4", r ? "md:col-span-5" : "md:col-span-12"), children: [
        n ? /* @__PURE__ */ e(yp, { result: t }) : null,
        a && t.people && t.people.length > 0 ? /* @__PURE__ */ e(
          kp,
          {
            people: t.people,
            highlightedIndex: f,
            onSelect: m
          }
        ) : null
      ] })
    ] }),
    i && t.objects && t.objects.length > 0 ? /* @__PURE__ */ e(Cp, { objects: t.objects }) : null,
    s && t.tags && t.tags.length > 0 ? /* @__PURE__ */ e(Ip, { tags: t.tags, onTagClick: l }) : null,
    d ? /* @__PURE__ */ e(
      Sp,
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
      /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1", children: t.text.map((y, v) => /* @__PURE__ */ e(
        "li",
        {
          className: "rounded border border-border bg-surface px-2 py-1 font-mono text-[12px]",
          children: y
        },
        v
      )) })
    ] }) : null,
    c && t.rawText ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => x((y) => !y),
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
const Tp = [
  { value: "claude-haiku-4-5-20251001", label: "Haiku 4.5" },
  { value: "claude-sonnet-4-6", label: "Sonnet 4.6" },
  { value: "claude-opus-4-7", label: "Opus 4.7" }
], Kr = "claude-sonnet-4-6", Yr = [
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
function Ap(t) {
  const r = [`${t.inputTokens} in`, `${t.outputTokens} out`];
  return t.cacheReadTokens && r.push(`${t.cacheReadTokens} cached`), r.join(" / ");
}
function Rp({
  systemPrompt: t,
  userPrompt: r,
  outputSchema: n,
  model: a,
  onSave: i,
  apiBase: s = ""
}) {
  const d = ko(), [c, l] = S(t), [p, u] = S(r), [f, h] = S(a ?? Kr), [g, x] = S(
    n ? JSON.stringify(n, null, 2) : ""
  ), [m, N] = S("0"), [y, v] = S(null), [w, b] = S(!1), [k, C] = S(null), [T, $] = S(null), R = D(() => {
    const te = g.trim();
    if (te)
      try {
        const O = JSON.parse(te);
        if (O && typeof O == "object" && !Array.isArray(O))
          return O;
      } catch {
      }
  }, [g]), E = D((te) => {
    N(te);
    const O = Number(te), P = Yr[O];
    P && (x(P.value ? JSON.stringify(P.value, null, 2) : ""), P.systemPrompt !== void 0 && l(P.systemPrompt));
  }, []), A = y?.imageId ?? null, j = A ? d.getImageUrl(A) : null, W = D(async () => {
    if (!A) {
      C("Upload or paste a sample image URL first.");
      return;
    }
    if (!p.trim()) {
      C("User prompt is required.");
      return;
    }
    b(!0), C(null), $(null);
    const te = R();
    try {
      const O = await fetch(`${s}/api/pipeline/preview/vision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageId: A,
          systemPrompt: c.trim() || void 0,
          userPrompt: p.trim(),
          outputSchema: te,
          model: f || Kr
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
      const H = {
        imageUrl: j ?? "",
        caption: P.caption ?? "",
        rawText: typeof P.extracted == "object" && P.extracted ? JSON.stringify(P.extracted, null, 2) : void 0,
        model: {
          endpointId: f,
          latencyMs: P.latencyMs ?? 0,
          tokensIn: P.usage?.inputTokens,
          tokensOut: P.usage?.outputTokens
        }
      };
      $({
        visionResult: H,
        rawExtracted: P.extracted,
        usage: P.usage ?? { inputTokens: 0, outputTokens: 0 },
        latencyMs: P.latencyMs ?? 0,
        costUsd: P.costUsd ?? 0
      });
    } catch (O) {
      C(O instanceof Error ? O.message : "Network error");
    } finally {
      b(!1);
    }
  }, [A, j, p, c, f, R, s]), ie = () => {
    i({
      systemPrompt: c,
      userPrompt: p,
      outputSchema: R()
    });
  }, Y = "text-[12px] font-semibold text-text-secondary";
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-4 px-4 py-3", "data-testid": "vision-prompt-bench", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: I(Y, "mb-1"), children: "Sample image" }),
      /* @__PURE__ */ e(
        Fo,
        {
          value: y,
          onChange: (te) => v(te),
          "data-testid": "bench-image-uploader"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("label", { className: Y, children: "System prompt" }),
        /* @__PURE__ */ e(
          dn,
          {
            value: c,
            onChange: (te) => l(te.target.value),
            rows: 3,
            placeholder: "Optional override of the default vision system prompt.",
            "data-testid": "bench-system-prompt",
            className: "mt-1 text-[12px] font-mono"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("label", { className: Y, children: [
          "User prompt ",
          /* @__PURE__ */ e("span", { className: "text-danger-fg", children: "*" })
        ] }),
        /* @__PURE__ */ e(
          dn,
          {
            value: p,
            onChange: (te) => u(te.target.value),
            rows: 3,
            placeholder: "Describe what you want the model to do with the image.",
            "data-testid": "bench-user-prompt",
            className: "mt-1 text-[12px]"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ e("label", { className: Y, children: "Output schema" }),
          /* @__PURE__ */ e(
            en,
            {
              value: m,
              onChange: (te) => E(te.target.value),
              options: Yr.map((te, O) => ({ value: String(O), label: te.label })),
              size: "sm",
              "aria-label": "Schema preset",
              "data-testid": "bench-schema-preset"
            }
          )
        ] }),
        /* @__PURE__ */ e(
          dn,
          {
            value: g,
            onChange: (te) => x(te.target.value),
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
        en,
        {
          value: f,
          onChange: (te) => h(te.target.value),
          options: Tp,
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
            W();
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
    T && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2 border-t border-border pt-3", "data-testid": "bench-result", children: [
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1.5", children: [
        /* @__PURE__ */ o("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary", children: [
          Ap(T.usage),
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
      /* @__PURE__ */ e(
        $p,
        {
          result: T.visionResult,
          showImage: !1,
          showRawText: !!T.rawExtracted,
          "data-testid": "bench-vision-viewer"
        }
      ),
      T.rawExtracted !== null && T.rawExtracted !== void 0 && /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary", children: "Extracted JSON" }),
        /* @__PURE__ */ e(
          "pre",
          {
            className: "text-[10px] font-mono bg-surface-inset border border-border rounded p-2 overflow-x-auto",
            "data-testid": "bench-extracted-json",
            children: JSON.stringify(T.rawExtracted, null, 2)
          }
        )
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: ie,
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
const Pp = {
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
}, Rn = /* @__PURE__ */ new Set([
  "image:vision-analyze",
  "image:vision-classify",
  "image:vision-describe",
  "image:vision-tag",
  "image:vision-extract-text"
]), We = ({ data: t }) => /* @__PURE__ */ o("div", { className: "p-3 text-[13px] text-[#64748b]", children: [
  "Configuration for ",
  /* @__PURE__ */ e("strong", { children: t.type }),
  " — coming in Phase C."
] }), Mp = {
  trigger: Xl,
  llm: nc,
  transform: ac,
  condition: sc,
  action: dc,
  fork: pc,
  join: hc,
  approval: bc,
  agent: We,
  "mcp-tool": We,
  "knowledge-base": We,
  "graph-query": We,
  memory: We,
  guardrail: We,
  policy: We,
  "ag-ui-output": We,
  "image-source": We,
  "image:save": We,
  scatter: Ac,
  "image:resize": Ec,
  "image:transform": Fc,
  "image:format-convert": Wc,
  "image:sharpen": Gc,
  "image:watermark": Qc,
  "image:crop": ld,
  "image:adjust-bw": pd,
  "image:adjust-layer": Id,
  "image:dimensions": Ad,
  "image:upscale": Ed,
  "image:vision-analyze": Fd,
  "image:vision-classify": Wd,
  "image:vision-describe": Yd,
  "image:vision-tag": tp,
  "image:vision-extract-text": ip,
  "image:generate": lp,
  "image:variation": mp,
  "image:edit-prompt": xp
};
function Ep(t, r) {
  const n = Mp[t.type];
  return /* @__PURE__ */ e(n, { data: t.data, onChange: r });
}
function Dp({ selectedIds: t }) {
  const {
    definition: r,
    selectedNodeId: n,
    setSelectedNodeId: a,
    updateNodeData: i,
    removeNode: s,
    duplicateNodes: d
  } = Ue(), [c, l] = S("config"), p = le(null), u = le(null);
  Gn();
  const f = q(() => t && t.length > 1 ? t : n ? [n] : [], [t, n]), h = f.length > 1, g = f.length > 0, x = q(() => h || f.length === 0 || !r ? null : r.nodes.find((b) => b.id === f[0]) ?? null, [r, f, h]), m = D(() => {
    a(null);
  }, [a]);
  ne(() => {
    l("config");
  }, [f.join(",")]), ne(() => {
    if (!g) return;
    const b = (k) => {
      k.key === "Escape" && (k.stopPropagation(), m());
    };
    return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b);
  }, [g, m]), ne(() => {
    if (!g) return;
    const b = (k) => {
      const C = p.current;
      C && (k.target instanceof Node && C.contains(k.target) || k.target instanceof Element && (k.target.closest("[data-node-type]") || m()));
    };
    return window.addEventListener("mousedown", b), () => window.removeEventListener("mousedown", b);
  }, [g, m]);
  const N = x ? Pp[x.type] : null, y = () => {
    if (h)
      for (const b of f) s(b);
    else x && s(x.id);
  }, v = () => {
    f.length !== 0 && d(f);
  }, w = (b) => {
    x && i(x.id, b);
  };
  return /* @__PURE__ */ e("div", { ref: p, className: "flex flex-col flex-1 min-h-0 bg-white", "data-testid": "config-panel", children: h ? (
    // ---------------------------------------------------------------
    // Multi-select pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ o(G, { children: [
      /* @__PURE__ */ o("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ e("span", { className: "text-base", "aria-hidden": !0, children: "⧉" }),
        /* @__PURE__ */ o("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: [
          f.length,
          " nodes selected"
        ] }),
        /* @__PURE__ */ e(
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
        /* @__PURE__ */ e("div", { className: "text-xs text-[#64748b] leading-normal", children: "Bulk actions apply to every selected node. Individual node configuration is only shown for single selections." }),
        /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: y,
              className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-[#fecaca] rounded-md cursor-pointer font-inherit",
              children: "Delete all"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: v,
              className: "px-2.5 py-1.5 text-xs font-semibold bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0] rounded-md cursor-pointer font-inherit",
              children: "Duplicate all"
            }
          )
        ] })
      ] })
    ] })
  ) : x && N ? (
    // ---------------------------------------------------------------
    // Single-node pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ o(G, { children: [
      /* @__PURE__ */ o("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ e("span", { className: "text-lg leading-none", "aria-hidden": !0, children: N.icon }),
        /* @__PURE__ */ e("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: N.name }),
        /* @__PURE__ */ e(
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
      /* @__PURE__ */ e(
        "div",
        {
          ref: u,
          role: "tablist",
          "aria-label": "Node configuration tabs",
          className: "h-9 flex border-b border-[#e2e8f0] shrink-0",
          onKeyDown: (b) => {
            const C = x && Rn.has(x.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"], T = C.indexOf(c);
            let $ = null;
            b.key === "ArrowRight" ? $ = C[(T + 1) % C.length] : b.key === "ArrowLeft" ? $ = C[(T - 1 + C.length) % C.length] : b.key === "Home" ? $ = C[0] : b.key === "End" && ($ = C[C.length - 1]), $ && (b.preventDefault(), l($), u.current?.querySelector(
              `[data-tab="${$}"]`
            )?.focus());
          },
          children: (x && Rn.has(x.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"]).map((b) => {
            const k = c === b, C = b === "config" ? "Config" : b === "runs" ? "Runs" : b === "docs" ? "Docs" : "Bench";
            return /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": k,
                tabIndex: k ? 0 : -1,
                "data-tab": b,
                className: I(
                  "flex-1 border-none bg-transparent text-xs font-semibold cursor-pointer font-inherit",
                  k ? "text-[#0f172a] border-b-2 border-b-[#646cff]" : "text-[#64748b] border-b-2 border-b-transparent"
                ),
                onClick: () => l(b),
                children: C
              },
              b
            );
          })
        }
      ),
      /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto", children: [
        c === "config" && Ep(x, w),
        c === "runs" && /* @__PURE__ */ e("div", { className: "p-6 text-xs text-[#64748b]", children: "No runs yet." }),
        c === "docs" && /* @__PURE__ */ e("div", { className: "pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug", children: bp[x.type] ?? /* @__PURE__ */ e("p", { className: "text-text-secondary", children: "No docs available for this node type." }) }),
        c === "bench" && Rn.has(x.type) && (() => {
          const b = x.data;
          return /* @__PURE__ */ e(
            Rp,
            {
              systemPrompt: b.systemPrompt ?? "",
              userPrompt: b.userPrompt ?? "",
              outputSchema: b.outputSchema,
              model: b.model,
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
            onClick: y,
            className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-transparent rounded-md cursor-pointer font-inherit",
            children: "🗑 Delete node"
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: v,
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
function Se(t) {
  if (t == null) return "--";
  if (t < 1e3) return `${Math.round(t)}ms`;
  if (t < 6e4) return `${(t / 1e3).toFixed(1)}s`;
  const r = Math.floor(t / 6e4), n = Math.floor(t % 6e4 / 1e3);
  return `${r}m ${n}s`;
}
function ht(t) {
  if (!t) return "--";
  const r = new Date(t);
  if (Number.isNaN(r.getTime())) return "--";
  const n = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  };
  return new Intl.DateTimeFormat(void 0, n).format(r);
}
function Op(t) {
  const r = Date.now() - new Date(t).getTime();
  return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 2592e5 ? `${Math.floor(r / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function _p(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Lp(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Xr(t) {
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
function Pn(t) {
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
function Bp(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function rt({ label: t, children: r }) {
  return /* @__PURE__ */ o("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ e("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: t }),
    /* @__PURE__ */ e("span", { className: "text-[13px] text-text-primary", children: r })
  ] });
}
function Up({ pipelineId: t, run: r, onBack: n }) {
  const a = Be();
  return /* @__PURE__ */ o("div", { className: "absolute inset-0 z-[2] flex flex-col overflow-hidden bg-surface", children: [
    /* @__PURE__ */ o("div", { className: "flex shrink-0 items-center gap-2 border-b border-border px-4 py-2.5", children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: n,
          className: "cursor-pointer border-none bg-transparent p-0 font-inherit text-[13px] text-primary",
          children: "← Back"
        }
      ),
      /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-tertiary", children: r.id.slice(0, 12) })
    ] }),
    /* @__PURE__ */ e("div", { className: "flex-1 overflow-y-auto p-4", children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e(rt, { label: "Status", children: /* @__PURE__ */ e(
        se,
        {
          tone: Xr(r.status),
          "aria-label": `Status: ${Pn(r.status)}`,
          children: Pn(r.status)
        }
      ) }),
      /* @__PURE__ */ e(rt, { label: "Started", children: new Date(r.startedAt).toLocaleString() }),
      r.completedAt && /* @__PURE__ */ e(rt, { label: "Completed", children: new Date(r.completedAt).toLocaleString() }),
      /* @__PURE__ */ e(rt, { label: "Duration", children: Se(r.durationMs) }),
      /* @__PURE__ */ e(rt, { label: "Triggered by", children: Bp(r) }),
      /* @__PURE__ */ e(rt, { label: "Trigger type", children: r.triggeredBy.triggerType }),
      r.estimatedCostUsd != null && r.estimatedCostUsd > 0 && /* @__PURE__ */ o(rt, { label: "Est. Cost", children: [
        /* @__PURE__ */ e("span", { className: I("font-semibold", Lp(r.estimatedCostUsd)), children: _p(r.estimatedCostUsd) }),
        r.estimatedCostUsd > 1 && /* @__PURE__ */ e("span", { className: "ml-1.5 rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "Budget Warning" })
      ] }),
      r.tokenUsage && Object.keys(r.tokenUsage).length > 0 && /* @__PURE__ */ o("div", { className: "mt-2", children: [
        /* @__PURE__ */ e("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: "Cost Breakdown" }),
        Object.entries(r.tokenUsage).map(([i, s]) => /* @__PURE__ */ o(
          "div",
          {
            className: "flex items-center gap-2 py-0.5 text-[11px]",
            children: [
              /* @__PURE__ */ e("span", { className: "min-w-[100px] font-mono text-text-secondary", children: i }),
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
      r.error && /* @__PURE__ */ o("div", { className: "mt-2", children: [
        /* @__PURE__ */ e("div", { className: "mb-1 text-[11px] font-semibold uppercase text-state-failed", children: "Error" }),
        /* @__PURE__ */ o("div", { className: "whitespace-pre-wrap break-words rounded-md bg-[#fef2f2] px-2.5 py-2 font-mono text-xs text-[#991b1b]", children: [
          r.error.message,
          r.error.nodeId && /* @__PURE__ */ o("div", { className: "mt-1 text-[11px] text-[#b91c1c]", children: [
            "at node: ",
            r.error.nodeId
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => a(`/pipelines/${t}/runs/${r.id}`),
          "data-testid": "runs-panel-replay-btn",
          className: "mt-3 w-full cursor-pointer rounded-md border-none bg-primary px-3.5 py-2 font-inherit text-[13px] font-semibold text-white",
          children: "View Full Run"
        }
      ),
      Object.keys(r.steps).length > 0 && /* @__PURE__ */ o("div", { className: "mt-2", children: [
        /* @__PURE__ */ o("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: [
          "Steps (",
          Object.keys(r.steps).length,
          ")"
        ] }),
        Object.entries(r.steps).map(([i, s]) => {
          const d = Xr(s.status), c = Pn(s.status), l = s.output, p = l?.response;
          return /* @__PURE__ */ o("div", { className: "mb-2", children: [
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2 py-1 text-xs", children: [
              /* @__PURE__ */ e(se, { tone: d, "aria-label": `Status: ${c}`, children: c }),
              /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: i.slice(0, 10) }),
              s.durationMs != null && /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: Se(s.durationMs) })
            ] }),
            p && /* @__PURE__ */ e("div", { className: "mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-2 text-xs leading-relaxed text-text-primary", children: p }),
            l && !p && Object.keys(l).length > 0 && /* @__PURE__ */ e("div", { className: "mt-1 max-h-[120px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-1.5 font-mono text-[11px] text-text-secondary", children: JSON.stringify(l, null, 2) })
          ] }, i);
        })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-3", children: /* @__PURE__ */ o("details", { children: [
        /* @__PURE__ */ e("summary", { className: "cursor-pointer select-none text-[11px] text-text-tertiary", children: "Raw snapshot JSON" }),
        /* @__PURE__ */ e("pre", { className: "mt-1.5 max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-md border border-border bg-surface-inset p-2.5 text-[10px]", children: JSON.stringify(r, null, 2) })
      ] }) })
    ] }) })
  ] });
}
function Qr(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Fp(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function jp(t) {
  const r = Date.now() - new Date(t).getTime();
  return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 2592e5 ? `${Math.floor(r / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function zp(t) {
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
function qp(t) {
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
function Vp(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function Wp({ pipelineId: t, onClose: r }) {
  const n = Be(), [a, i] = S([]), [s, d] = S(!0), [c, l] = S(null), [p, u] = S(null), [f, h] = S(!1), [g, x] = S([]), m = le(null), N = D(async () => {
    d(!0), l(null);
    try {
      const b = await Io(t, { limit: 50 });
      i(b.runs);
    } catch (b) {
      l(b instanceof Error ? b.message : "Failed to load runs");
    } finally {
      d(!1);
    }
  }, [t]);
  ne(() => {
    m.current !== t && (m.current = t, N());
  }, [t, N]), De("*", D((b) => {
    const { eventType: k, payload: C } = b;
    if (!C || typeof C != "object") return;
    const T = C;
    if (!(T.pipelineId && T.pipelineId !== t))
      switch (k) {
        case "pipeline.run.started": {
          const $ = C;
          if ($.pipelineId !== t) return;
          const R = {
            id: $.runId,
            pipelineId: $.pipelineId,
            pipelineVersion: 0,
            status: "running",
            triggeredBy: $.triggeredBy,
            ownerNodeId: "local",
            startedAt: $.at,
            currentStepIds: [],
            steps: {},
            context: {}
          };
          i((E) => [R, ...E.filter((A) => A.id !== $.runId)]);
          break;
        }
        case "pipeline.run.completed": {
          const $ = C;
          i(
            (R) => R.map(
              (E) => E.id === $.runId ? { ...E, status: "completed", completedAt: $.at, durationMs: $.durationMs } : E
            )
          );
          break;
        }
        case "pipeline.run.failed": {
          const $ = C;
          i(
            (R) => R.map(
              (E) => E.id === $.runId ? { ...E, status: "failed", completedAt: $.at, error: $.error } : E
            )
          );
          break;
        }
        case "pipeline.run.cancelled": {
          const $ = C;
          i(
            (R) => R.map(
              (E) => E.id === $.runId ? { ...E, status: "cancelled", completedAt: $.at } : E
            )
          );
          break;
        }
      }
  }, [t]));
  const y = q(
    () => a.find((b) => b.id === p) ?? null,
    [a, p]
  ), v = D((b) => {
    x((k) => k.includes(b) ? k.filter((C) => C !== b) : k.length >= 2 ? [k[1], b] : [...k, b]);
  }, []), w = D(() => {
    if (g.length !== 2) return;
    const [b, k] = g;
    n(`/pipelines/${t}/compare?a=${b}&b=${k}`);
  }, [g, n, t]);
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
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: r,
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
          y && /* @__PURE__ */ e(
            Up,
            {
              pipelineId: t,
              run: y,
              onBack: () => u(null)
            }
          ),
          s && a.length === 0 && /* @__PURE__ */ e("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "Loading runs..." }),
          c && /* @__PURE__ */ o("div", { className: "p-4 text-center text-xs text-state-failed", children: [
            c,
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: () => {
                  N();
                },
                className: "mx-auto mt-2 block cursor-pointer border-none bg-transparent font-inherit text-xs text-primary underline",
                children: "Retry"
              }
            )
          ] }),
          !s && !c && a.length === 0 && /* @__PURE__ */ e("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "No runs yet. Trigger this pipeline to see history here." }),
          a.length > 0 && /* @__PURE__ */ e("ul", { className: "m-0 flex-1 list-none overflow-y-auto p-0", children: a.map((b) => {
            const k = zp(b.status), C = qp(b.status), T = g.includes(b.id);
            return /* @__PURE__ */ o(
              "li",
              {
                "data-testid": `runs-panel-row-${b.id}`,
                onClick: () => {
                  f ? v(b.id) : u(b.id);
                },
                className: I(
                  "cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover",
                  T && "bg-[#eff6ff]"
                ),
                children: [
                  /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
                    f && /* @__PURE__ */ e(
                      "input",
                      {
                        type: "checkbox",
                        checked: T,
                        onChange: () => v(b.id),
                        onClick: ($) => $.stopPropagation(),
                        "data-testid": `runs-panel-compare-check-${b.id}`,
                        className: "m-0 shrink-0 accent-primary",
                        "aria-label": `Select run ${b.id.slice(0, 8)} for comparison`
                      }
                    ),
                    /* @__PURE__ */ e(se, { tone: k, "aria-label": `Status: ${C}`, children: C }),
                    /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-secondary", children: b.id.slice(0, 8) }),
                    /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: jp(b.startedAt) })
                  ] }),
                  /* @__PURE__ */ o("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ e("span", { children: Se(b.durationMs) }),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 0 && /* @__PURE__ */ e(
                      "span",
                      {
                        className: I("font-mono font-semibold", Fp(b.estimatedCostUsd)),
                        title: `Estimated cost: ${Qr(b.estimatedCostUsd)}`,
                        children: Qr(b.estimatedCostUsd)
                      }
                    ),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 1 && /* @__PURE__ */ e("span", { className: "rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "High Cost" }),
                    /* @__PURE__ */ e("span", { className: "ml-auto", children: Vp(b) })
                  ] }),
                  b.error && /* @__PURE__ */ e("div", { className: "mt-1 truncate text-[11px] text-state-failed", children: b.error.message })
                ]
              },
              b.id
            );
          }) })
        ] })
      ]
    }
  );
}
function Jp({
  pipelineId: t,
  selectedNodeId: r,
  sidebarTab: n,
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
        !(r !== null && n === "config") && /* @__PURE__ */ o("div", { className: "h-[38px] flex border-b border-border shrink-0", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              className: I(
                "flex-1 border-none bg-transparent text-xs font-semibold",
                "cursor-pointer font-inherit px-2",
                n === "config" ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"
              ),
              onClick: () => a("config"),
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
                n === "runs" ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"
              ),
              onClick: () => a("runs"),
              "data-testid": "sidebar-tab-runs",
              children: "Runs"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto flex flex-col", children: [
          n === "config" && (r !== null ? /* @__PURE__ */ e(Dp, {}) : /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          n === "runs" && /* @__PURE__ */ e(
            Wp,
            {
              pipelineId: t,
              onClose: () => a("config")
            }
          )
        ] })
      ]
    }
  );
}
function Hp(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Gp(t) {
  if (!t) return [];
  const r = /* @__PURE__ */ new Set(), n = /\{\{\s*context\.([a-zA-Z0-9_.]+)\s*\}\}/g;
  for (const a of t.nodes) {
    const i = a.data;
    if (i.type === "llm") {
      for (const s of (i.userPromptTemplate || "").matchAll(n))
        s[1].startsWith("steps.") || r.add(s[1]);
      for (const s of (i.systemPrompt || "").matchAll(n))
        s[1].startsWith("steps.") || r.add(s[1]);
    } else if (i.type === "transform" && i.expression)
      for (const s of i.expression.matchAll(n))
        s[1].startsWith("steps.") || r.add(s[1]);
  }
  return Array.from(r);
}
function Kp(t) {
  if (!(t instanceof HTMLElement)) return !1;
  const r = t.tagName;
  return !!(r === "INPUT" || r === "TEXTAREA" || r === "SELECT" || t.isContentEditable);
}
function Qh() {
  const { pipelineId: t } = gt(), r = q(() => t ? ot(t) !== null : !1, [t]);
  return !t || !r ? /* @__PURE__ */ e(xt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(So, { pipelineId: t, children: /* @__PURE__ */ e(Yp, { pipelineId: t }) });
}
function Yp({ pipelineId: t }) {
  const r = Be(), n = Ue(), a = bt(), { toast: i } = sn(), {
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
  } = n, m = Tl(t), [N, y] = S(!1), v = le(null), w = le(d);
  ne(() => (w.current && !d && (y(!0), v.current && clearTimeout(v.current), v.current = setTimeout(() => y(!1), 450)), w.current = d, () => {
    v.current && (clearTimeout(v.current), v.current = null);
  }), [d]);
  const b = q(
    () => s ? Oo(s) : null,
    [s]
  ), k = (b?.errors.length ?? 0) > 0, C = q(
    () => Gp(s),
    [s]
  ), $ = q(() => s ? s.nodes.some((xe) => xe.type === "trigger") : !1, [s]) ? ["trigger"] : [], [R, E] = S(!0), [A, j] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), W = D(() => {
    j((xe) => {
      const oe = !xe;
      try {
        window.localStorage.setItem(
          "ws_pipelines_v1_show_tags",
          oe ? "true" : "false"
        );
      } catch {
      }
      return oe;
    });
  }, []), [ie, Y] = S(!1), [te, O] = S(!1), [P, H] = S(!1), [K, U] = S(!1), [V, J] = S(!1), X = q(() => s?.publishedSnapshot ? s.publishedSnapshot : null, [s]), pe = s?.status === "published", z = !m.isRunActive && (!pe || k), ce = m.isRunActive ? "Cancel the active run" : pe ? k ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", we = D(async () => {
    if (m.isRunActive && m.currentRunId) {
      a.cancelRun(m.currentRunId);
      return;
    }
    if (!z) {
      if (C.length > 0) {
        m.setTriggerInputValues(
          Object.fromEntries(C.map((xe) => [xe, ""]))
        ), m.setTriggerInputOpen(!0);
        return;
      }
      m.handleRunClick();
    }
  }, [m, a, z, C]);
  ne(() => {
    const xe = (oe) => {
      if (Kp(oe.target)) return;
      const Q = oe.metaKey || oe.ctrlKey;
      if (Q && oe.key.toLowerCase() === "s") {
        oe.preventDefault(), p(), i("Saved", { type: "success", durationMs: 1200 });
        return;
      }
      if (Q && oe.key === "Enter") {
        oe.preventDefault(), we();
        return;
      }
      if (Q && oe.key === ".") {
        oe.preventDefault(), m.isRunActive && m.currentRunId && a.cancelRun(m.currentRunId);
        return;
      }
      if (Q && oe.shiftKey && oe.key.toLowerCase() === "z") {
        oe.preventDefault(), g();
        return;
      }
      if (Q && oe.key.toLowerCase() === "z") {
        oe.preventDefault(), h();
        return;
      }
      if (oe.key === "Escape") {
        l(null);
        return;
      }
    };
    return window.addEventListener("keydown", xe), () => window.removeEventListener("keydown", xe);
  }, [p, i, we, m, a, h, g, l]);
  const _e = () => {
    if (!s) return;
    const xe = Hn(s.id);
    xe && r(`/pipelines/${xe.id}`);
  }, Ye = () => {
    if (!s) return;
    const xe = On(s.id);
    xe && Dt(`${Hp(s.name)}.pipeline.json`, xe);
  }, Fe = async () => {
    if (!s) return;
    const xe = vl(s);
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(xe), i("Mermaid diagram copied", { type: "success" });
      else
        throw new Error("clipboard unavailable");
    } catch (oe) {
      console.warn("[PipelineEditor] clipboard write failed", oe), i("Could not copy Mermaid diagram", { type: "error" });
    }
  }, Ee = () => {
    U(!0);
  }, qe = () => {
    Y(!1), !k && (u(), i("Pipeline published", { type: "success" }));
  }, je = () => {
    s && (pa(s.id), O(!1), r("/pipelines"));
  }, Ve = () => {
    $o(t), H(!1), i("Run history cleared", { type: "success" });
  }, Ie = m.currentRunId ? a.runs[m.currentRunId] : void 0;
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
          Rl,
          {
            pipelineId: t,
            definition: s,
            dirty: d,
            savingFlash: N,
            isRunActive: m.isRunActive,
            isTriggering: m.isTriggering,
            runDisabled: z,
            runTitle: ce,
            currentRun: Ie,
            breakpoints: m.breakpoints,
            onRunClick: we,
            onDebugRunClick: m.handleDebugRunClick,
            onExport: Ye,
            onPublishClick: () => Y(!0),
            onDuplicate: _e,
            onCopyMermaid: Fe,
            onViewVersions: Ee,
            onRevert: f,
            onToggleShowTags: W,
            showTags: A,
            onViewRunHistory: () => m.setSidebarTab("runs"),
            onClearRunHistory: () => H(!0),
            onSimPanelOpen: () => J(!0),
            onDelete: () => O(!0)
          }
        ),
        A && /* @__PURE__ */ o(
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
                Da,
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
          /* @__PURE__ */ e(ws, { disabledTypes: $ }),
          /* @__PURE__ */ e("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ e(
            Ls,
            {
              errorNodeId: m.activeError?.nodeId ?? null,
              onErrorNodePosition: m.handleErrorNodePosition,
              breakpoints: m.breakpoints,
              onToggleBreakpoint: m.handleToggleBreakpoint,
              pausedAtNodeId: m.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ e(
            Jp,
            {
              pipelineId: t,
              selectedNodeId: c,
              sidebarTab: m.sidebarTab,
              onTabChange: m.setSidebarTab
            }
          )
        ] }),
        m.pausedBreakpoint && /* @__PURE__ */ e(
          jl,
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
        m.activeError && m.errorNodeAnchor && /* @__PURE__ */ e(
          Us,
          {
            error: m.activeError,
            anchor: m.errorNodeAnchor,
            onDismiss: m.handleDismissError,
            onRetry: m.handleRetryFromError
          }
        ),
        /* @__PURE__ */ e(
          $l,
          {
            runId: m.currentRunId,
            visible: m.isRunActive && R
          }
        ),
        /* @__PURE__ */ e(
          Sl,
          {
            publishConfirmOpen: ie,
            onPublishClose: () => Y(!1),
            onPublishConfirm: qe,
            hasErrors: k,
            validationErrorCount: b?.errors.length ?? 0,
            definitionName: s.name,
            definitionVersion: s.version,
            deleteConfirmOpen: te,
            onDeleteClose: () => O(!1),
            onDeleteConfirm: je,
            clearRunsConfirmOpen: P,
            onClearRunsClose: () => H(!1),
            onClearRunsConfirm: Ve,
            versionDiffOpen: K,
            onVersionDiffClose: () => U(!1),
            currentDef: s,
            publishedDef: X,
            onJumpToNode: l,
            simPanelOpen: V,
            onSimPanelClose: () => J(!1)
          }
        ),
        /* @__PURE__ */ e(
          He,
          {
            open: m.triggerInputOpen,
            onClose: () => m.setTriggerInputOpen(!1),
            title: "Trigger inputs",
            maxWidth: 480,
            footer: /* @__PURE__ */ o(G, { children: [
              /* @__PURE__ */ e(Oe, { variant: "ghost", onClick: () => m.setTriggerInputOpen(!1), children: "Cancel" }),
              /* @__PURE__ */ e(
                Oe,
                {
                  variant: "primary",
                  onClick: m.handleTriggerInputSubmit,
                  disabled: C.some((xe) => !m.triggerInputValues[xe]?.trim()),
                  children: "Run"
                }
              )
            ] }),
            children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ e("p", { className: "m-0 text-xs text-text-secondary", children: "This pipeline expects input data. Provide values for the trigger context:" }),
              C.map((xe) => /* @__PURE__ */ o("label", { className: "flex flex-col gap-1 text-xs", children: [
                /* @__PURE__ */ e("span", { className: "font-medium text-text-primary", children: xe }),
                /* @__PURE__ */ e(
                  "textarea",
                  {
                    "data-autofocus": xe === C[0] ? !0 : void 0,
                    rows: 3,
                    className: "resize-y px-2 py-1.5 rounded-md border border-border text-xs font-inherit",
                    value: m.triggerInputValues[xe] ?? "",
                    onChange: (oe) => m.setTriggerInputValues((Q) => ({ ...Q, [xe]: oe.target.value }))
                  }
                )
              ] }, xe))
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
function Xp(t) {
  const r = t?.event;
  return !r || r === "manual" ? { icon: "▶", text: "Manual" } : r === "schedule" ? { icon: "⏱", text: t?.schedule ?? "Schedule" } : r === "webhook" ? { icon: "🔌", text: t?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${t?.event}` };
}
function Qp({
  row: t,
  onOpen: r,
  onRun: n,
  onDuplicate: a,
  onExport: i,
  onDelete: s,
  selectionMode: d,
  selected: c,
  anySelected: l,
  onToggleSelect: p
}) {
  const [u, f] = S(!1), [h, g] = S(!1), x = le(null);
  ft(x, () => f(!1), u);
  const m = t.status === "published", N = t.status === "archived", y = typeof t.publishedVersion == "number", v = Xp(t.triggerBinding);
  let w, b;
  N ? (w = `Archived · v${t.version}`, b = "danger") : m ? (w = `Published · v${t.version}`, b = "success") : y ? (w = `Draft · v${t.version} (published v${t.publishedVersion})`, b = "warning") : (w = `Draft · v${t.version}`, b = "neutral");
  const k = !m, C = (R) => (E) => {
    E.stopPropagation(), R();
  }, T = d || c || h || l, $ = (R) => {
    d ? p(R.shiftKey) : r();
  };
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": `pipeline-card-${t.id}`,
      "data-selected": c ? "true" : "false",
      onClick: $,
      onMouseEnter: () => g(!0),
      onMouseLeave: () => {
        g(!1), f(!1);
      },
      className: I(
        "flex flex-col gap-2 w-full px-3.5 py-3 bg-surface rounded-lg cursor-pointer relative transition-[border-color,box-shadow] duration-100",
        c ? "border border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : h ? "border border-primary shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "border border-border shadow-none"
      ),
      children: [
        T && /* @__PURE__ */ e(
          "label",
          {
            onClick: (R) => R.stopPropagation(),
            className: "absolute top-2 right-2 flex items-center justify-center w-[22px] h-[22px] cursor-pointer z-[1]",
            children: /* @__PURE__ */ e(
              "input",
              {
                type: "checkbox",
                "data-testid": `pipeline-select-${t.id}`,
                checked: c,
                onClick: (R) => {
                  R.stopPropagation(), p(R.shiftKey);
                },
                onKeyDown: (R) => {
                  (R.key === " " || R.key === "Spacebar") && (R.preventDefault(), p(R.shiftKey));
                },
                onChange: () => {
                },
                className: "cursor-pointer w-4 h-4 accent-primary"
              }
            )
          }
        ),
        /* @__PURE__ */ o("div", { className: I("flex items-center gap-2 min-w-0", T && "pr-7"), children: [
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
          /* @__PURE__ */ e(se, { "aria-label": `Status: ${w}`, tone: b, size: "sm", children: w }),
          /* @__PURE__ */ o("span", { className: "text-[11px] text-text-secondary", children: [
            v.icon,
            " ",
            v.text
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
              onClick: C(n),
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
              onClick: C(r),
              className: "px-3 py-[5px] text-xs font-semibold bg-surface text-text-secondary border border-border-field rounded-md cursor-pointer font-[inherit]",
              children: "Edit"
            }
          ),
          /* @__PURE__ */ o("div", { className: "relative ml-auto", ref: x, children: [
            /* @__PURE__ */ e(
              "button",
              {
                "data-testid": `overflow-pipeline-${t.id}`,
                onClick: C(() => f((R) => !R)),
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
                onClick: (R) => R.stopPropagation(),
                className: "absolute right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-[0_8px_24px_rgba(15,23,42,0.12)] min-w-[160px] z-10 overflow-hidden",
                children: [
                  /* @__PURE__ */ e("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: C(() => {
                    f(!1), a();
                  }), children: "Duplicate" }),
                  /* @__PURE__ */ e("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: C(() => {
                    f(!1), i();
                  }), children: "Export JSON" }),
                  /* @__PURE__ */ e(
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
const Zp = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, eu = ["draft", "published"];
function tu({
  search: t,
  onSearchChange: r,
  statusFilter: n,
  statusExplicit: a,
  onToggleStatusKey: i,
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
              /* @__PURE__ */ e(
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
            onChange: (h) => r(h.target.value),
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
            children: tr.map((h) => {
              const g = a ? n.has(h) : eu.includes(h);
              return /* @__PURE__ */ e(
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
                  children: Zp[h]
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
const Xe = I(
  "px-2.5 py-[5px] text-xs font-semibold",
  "bg-white text-text-secondary",
  "border border-border-field rounded-md",
  "cursor-pointer font-inherit"
);
function nu({
  count: t,
  onClear: r,
  onExport: n,
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
  unionTags: N
}) {
  const [y, v] = S(""), w = le(null), b = le(null), k = le(null);
  ne(() => {
    u && (v(""), setTimeout(() => w.current?.focus(), 30));
  }, [u]), ne(() => {
    if (!u) return;
    const T = (R) => {
      b.current?.contains(R.target) || x();
    }, $ = window.setTimeout(() => {
      document.addEventListener("mousedown", T);
    }, 0);
    return () => {
      window.clearTimeout($), document.removeEventListener("mousedown", T);
    };
  }, [u, x]), ne(() => {
    if (!f) return;
    const T = (R) => {
      k.current?.contains(R.target) || m();
    }, $ = window.setTimeout(() => {
      document.addEventListener("mousedown", T);
    }, 0);
    return () => {
      window.clearTimeout($), document.removeEventListener("mousedown", T);
    };
  }, [f, m]);
  const C = () => {
    const T = y.trim();
    T.length !== 0 && (h(T), v(""));
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
        /* @__PURE__ */ e("button", { "data-testid": "bulk-clear", className: Xe, onClick: r, children: "Clear" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-publish", className: Xe, onClick: i, children: "Publish selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-archive", className: Xe, onClick: s, children: "Archive selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export-json", className: Xe, onClick: a, children: "Export selected as JSON" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export", className: Xe, onClick: n, children: "Export all" }),
        /* @__PURE__ */ e(
          "button",
          {
            "data-testid": "bulk-delete-confirm-prompt",
            className: Xe,
            onClick: p,
            children: "Delete selected"
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", children: [
          /* @__PURE__ */ e("button", { "data-testid": "bulk-add-tag-btn", className: Xe, onClick: d, children: "Add tag..." }),
          u && /* @__PURE__ */ o(
            "div",
            {
              ref: b,
              "data-testid": "bulk-add-tag-popover",
              onClick: (T) => T.stopPropagation(),
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
                    value: y,
                    onChange: (T) => v(T.target.value),
                    onKeyDown: (T) => {
                      T.key === "Enter" ? (T.preventDefault(), C()) : T.key === "Escape" && (T.preventDefault(), x());
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
                    disabled: y.trim().length === 0,
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
                Xe,
                N.length === 0 && "opacity-50 cursor-not-allowed"
              ),
              onClick: c,
              disabled: N.length === 0,
              title: N.length === 0 ? "No tags on selected pipelines" : "Remove tag from selected",
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
                /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: "Click a tag to remove it from all selected:" }),
                /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: N.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "No tags to remove." }) : N.map((T) => /* @__PURE__ */ o(
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
function ru({
  visibleRows: t,
  filteredIds: r
}) {
  const [n, a] = S(!1), [i, s] = S(/* @__PURE__ */ new Set()), d = le(null), c = le(null), l = D(() => {
    s(/* @__PURE__ */ new Set());
  }, []), p = D(() => {
    n ? (l(), a(!1)) : a(!0);
  }, [n, l]), u = D(
    (m, N = !1) => {
      const y = t, v = y.findIndex((b) => b.id === m), w = d.current;
      v !== -1 && (d.current = v), s((b) => {
        const k = new Set(b), C = !k.has(m);
        if (N && w != null && v !== -1) {
          const T = Math.min(w, v), $ = Math.max(w, v);
          for (let R = T; R <= $; R++) {
            const E = y[R];
            E && (C ? k.add(E.id) : k.delete(E.id));
          }
        } else C ? k.add(m) : k.delete(m);
        return k;
      });
    },
    [t]
  ), f = D(() => {
    s(new Set(r));
  }, [r]), h = t.length > 0 && t.every((m) => i.has(m.id)), g = !h && t.some((m) => i.has(m.id)), x = D(() => {
    s((m) => {
      const N = new Set(m);
      if (h)
        for (const y of t) N.delete(y.id);
      else
        for (const y of t) N.add(y.id);
      return N;
    }), n || a(!0);
  }, [h, t, n]);
  return ne(() => {
    c.current && (c.current.indeterminate = g);
  }, [g]), {
    selectionMode: n,
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
const ou = 280, ke = 160, au = 40, iu = 200;
function Z(t) {
  return au + t * ou;
}
function ee(t) {
  return iu + t * ke;
}
function re(t, r, n, a = "in") {
  return {
    id: crypto.randomUUID(),
    source: t,
    sourceHandle: r,
    target: n,
    targetHandle: a
  };
}
function su(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = {
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
    { id: n, type: "trigger", position: { x: Z(0), y: ee(0) }, data: s },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: d },
    { id: i, type: "action", position: { x: Z(2), y: ee(0) }, data: c }
  ], p = [
    re(n, "out", a),
    re(a, "out", i)
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
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function lu(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = {
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
  }, N = [
    { id: n, type: "trigger", position: { x: Z(0), y: ee(0) }, data: p },
    { id: a, type: "fork", position: { x: Z(1), y: ee(0) }, data: u },
    { id: i, type: "llm", position: { x: Z(2), y: ee(0) - ke / 2 }, data: f },
    { id: s, type: "action", position: { x: Z(3), y: ee(0) - ke / 2 }, data: h },
    { id: d, type: "llm", position: { x: Z(2), y: ee(0) + ke / 2 }, data: g },
    { id: c, type: "action", position: { x: Z(3), y: ee(0) + ke / 2 }, data: x },
    { id: l, type: "join", position: { x: Z(4), y: ee(0) }, data: m }
  ], y = [
    re(n, "out", a),
    re(a, "branch-0", i),
    re(i, "out", s),
    re(s, "out", l, "in-0"),
    re(a, "branch-1", d),
    re(d, "out", c),
    re(c, "out", l, "in-1")
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
    nodes: N,
    edges: y,
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function cu(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = crypto.randomUUID(), f = {
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
  }, N = {
    type: "approval",
    approvers: [{ type: "role", value: "moderator" }],
    requiredCount: 1,
    timeoutMs: 1440 * 60 * 1e3,
    timeoutAction: "reject",
    message: "This comment was flagged by the safety classifier. Approve to post, reject to delete."
  }, y = {
    type: "condition",
    expression: `context.steps.${c}.output.decision === 'approve'`,
    label: "Approved?"
  }, v = {
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
  }, b = [
    { id: n, type: "trigger", position: { x: Z(0), y: ee(0) }, data: f },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: h },
    { id: i, type: "condition", position: { x: Z(2), y: ee(0) }, data: g },
    { id: s, type: "action", position: { x: Z(3), y: ee(0) - ke / 2 }, data: x },
    { id: d, type: "action", position: { x: Z(3), y: ee(0) + ke / 2 }, data: m },
    { id: c, type: "approval", position: { x: Z(4), y: ee(0) + ke / 2 }, data: N },
    { id: l, type: "condition", position: { x: Z(5), y: ee(0) + ke / 2 }, data: y },
    { id: p, type: "action", position: { x: Z(6), y: ee(0) }, data: v },
    { id: u, type: "action", position: { x: Z(6), y: ee(0) + ke }, data: w }
  ], k = [
    re(n, "out", a),
    re(a, "out", i),
    re(i, "true", s),
    re(i, "false", d),
    re(d, "out", c),
    re(c, "approved", l),
    re(c, "rejected", u),
    re(l, "true", p),
    re(l, "false", u)
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
    nodes: b,
    edges: k,
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function du(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = {
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
    { id: n, type: "trigger", position: { x: Z(0), y: ee(0) }, data: d },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: c },
    { id: i, type: "transform", position: { x: Z(2), y: ee(0) }, data: l },
    { id: s, type: "action", position: { x: Z(3), y: ee(0) }, data: p }
  ], f = [
    re(n, "out", a),
    re(a, "out", i),
    re(i, "out", s)
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
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function pu(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = {
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
    { id: n, type: "trigger", position: { x: Z(0), y: ee(0) }, data: d },
    { id: a, type: "approval", position: { x: Z(1), y: ee(0) }, data: c },
    { id: i, type: "approval", position: { x: Z(2), y: ee(0) }, data: l },
    { id: s, type: "action", position: { x: Z(3), y: ee(0) }, data: p }
  ], f = [
    re(n, "out", a),
    re(a, "approved", i),
    re(i, "approved", s)
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
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function uu(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = {
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
    { id: n, type: "trigger", position: { x: Z(0), y: ee(0) }, data: d },
    { id: a, type: "transform", position: { x: Z(1), y: ee(0) }, data: c },
    { id: i, type: "llm", position: { x: Z(2), y: ee(0) }, data: l },
    { id: s, type: "action", position: { x: Z(3), y: ee(0) }, data: p }
  ], f = [
    re(n, "out", a),
    re(a, "out", i),
    re(i, "out", s)
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
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function mu(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = {
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
    { id: n, type: "trigger", position: { x: Z(0), y: ee(0) }, data: s },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: d },
    { id: i, type: "action", position: { x: Z(2), y: ee(0) }, data: c }
  ], p = [
    re(n, "out", a),
    re(a, "out", i)
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
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function hu(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = { type: "trigger", triggerType: "document.submit" }, d = {
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
    { id: n, type: "trigger", position: { x: Z(0), y: ee(0) }, data: s },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: d },
    { id: i, type: "action", position: { x: Z(2), y: ee(0) }, data: c }
  ], p = [
    re(n, "out", a),
    re(a, "out", i)
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
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function fu(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = { type: "trigger", triggerType: "document.finalize" }, p = {
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
    { id: n, type: "trigger", position: { x: Z(0), y: ee(0) }, data: l },
    { id: a, type: "fork", position: { x: Z(1), y: ee(0) }, data: p },
    { id: i, type: "llm", position: { x: Z(2), y: ee(0) - ke / 2 }, data: u },
    { id: s, type: "approval", position: { x: Z(2), y: ee(0) + ke / 2 }, data: f },
    { id: d, type: "join", position: { x: Z(3), y: ee(0) }, data: h },
    { id: c, type: "action", position: { x: Z(4), y: ee(0) }, data: g }
  ], m = [
    re(n, "out", a),
    re(a, "branch-0", i),
    re(i, "out", d, "in-0"),
    re(a, "branch-1", s),
    re(s, "approved", d, "in-1"),
    re(d, "out", c)
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
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function gu(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = {
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
    { id: n, type: "trigger", position: { x: Z(0), y: ee(0) }, data: l },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: p },
    { id: i, type: "condition", position: { x: Z(2), y: ee(0) }, data: u },
    { id: s, type: "action", position: { x: Z(3), y: ee(0) - ke / 2 }, data: f },
    { id: d, type: "approval", position: { x: Z(4), y: ee(0) - ke / 2 }, data: h },
    { id: c, type: "action", position: { x: Z(3), y: ee(0) + ke / 2 }, data: g }
  ], m = [
    re(n, "out", a),
    re(a, "out", i),
    re(i, "true", s),
    re(s, "out", d),
    re(i, "false", c)
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
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function xu(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = crypto.randomUUID(), f = {
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
  }, N = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are a test-coverage reviewer. Identify untested branches, missing edge-case tests, and risky changes lacking tests. Output JSON {"gaps": [{"file": string, "concern": string}]}.',
    userPromptTemplate: `{{context.payload.pull_request.diff}}

Summary: {{context.steps.${a}.response}}`,
    temperature: 0.1,
    maxTokens: 1024,
    streaming: !1
  }, y = {
    type: "join",
    mode: "all",
    mergeStrategy: "array-collect"
  }, v = {
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
  }, b = [
    { id: n, type: "trigger", position: { x: Z(0), y: ee(0) }, data: f },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: h },
    { id: i, type: "fork", position: { x: Z(2), y: ee(0) }, data: g },
    { id: s, type: "llm", position: { x: Z(3), y: ee(0) - ke }, data: x },
    { id: d, type: "llm", position: { x: Z(3), y: ee(0) }, data: m },
    { id: c, type: "llm", position: { x: Z(3), y: ee(0) + ke }, data: N },
    { id: l, type: "join", position: { x: Z(4), y: ee(0) }, data: y },
    { id: p, type: "llm", position: { x: Z(5), y: ee(0) }, data: v },
    { id: u, type: "action", position: { x: Z(6), y: ee(0) }, data: w }
  ], k = [
    re(n, "out", a),
    re(a, "out", i),
    re(i, "branch-0", s),
    re(i, "branch-1", d),
    re(i, "branch-2", c),
    re(s, "out", l, "in-0"),
    re(d, "out", l, "in-1"),
    re(c, "out", l, "in-2"),
    re(l, "out", p),
    re(p, "out", u)
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
    nodes: b,
    edges: k,
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function bu(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = {
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
    { id: n, type: "trigger", position: { x: Z(0), y: ee(0) }, data: c },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: l },
    { id: i, type: "condition", position: { x: Z(2), y: ee(0) }, data: p },
    { id: s, type: "action", position: { x: Z(3), y: ee(0) - ke / 2 }, data: u },
    { id: d, type: "approval", position: { x: Z(3), y: ee(0) + ke / 2 }, data: f }
  ], g = [
    re(n, "out", a),
    re(a, "out", i),
    re(i, "true", s),
    re(i, "false", d)
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
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function yu(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = {
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
  }, N = {
    type: "approval",
    approvers: [{ type: "role", value: "support-agent" }],
    requiredCount: 1,
    timeoutMs: 14400 * 1e3,
    timeoutAction: "reject",
    message: "Please review this drafted reply before it is sent to the customer."
  }, y = {
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
  }, v = [
    { id: n, type: "trigger", position: { x: Z(0), y: ee(0) }, data: u },
    { id: a, type: "llm", position: { x: Z(1), y: ee(0) }, data: f },
    { id: i, type: "transform", position: { x: Z(2), y: ee(0) }, data: h },
    { id: s, type: "condition", position: { x: Z(3), y: ee(0) }, data: g },
    { id: d, type: "action", position: { x: Z(4), y: ee(0) - ke / 2 }, data: x },
    { id: c, type: "llm", position: { x: Z(4), y: ee(0) + ke / 2 }, data: m },
    { id: l, type: "approval", position: { x: Z(5), y: ee(0) + ke / 2 }, data: N },
    { id: p, type: "action", position: { x: Z(6), y: ee(0) + ke / 2 }, data: y }
  ], w = [
    re(n, "out", a),
    re(a, "out", i),
    re(i, "out", s),
    re(s, "true", d),
    re(s, "false", c),
    re(c, "out", l),
    re(l, "approved", p)
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
    nodes: v,
    edges: w,
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
const Mn = [
  {
    id: "document-summary",
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    tags: ["llm", "summary", "document"],
    build: su
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: lu
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: cu,
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
    build: du,
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
    build: pu,
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
    build: uu
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: mu
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: hu
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: fu
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: gu
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: xu
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: bu
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: yu
  }
], qo = "/api";
async function vu(t) {
  const r = { createdTypes: [], errors: [] };
  if (!t?.documentTypes?.length) return r;
  for (const n of t.documentTypes)
    try {
      const a = await Nu(n.name);
      if (a) {
        r.createdTypes.push(a.typeId);
        continue;
      }
      const i = await wu(n);
      r.createdTypes.push(i.typeId);
    } catch (a) {
      r.errors.push(
        `Failed to scaffold "${n.name}": ${a instanceof Error ? a.message : String(a)}`
      );
    }
  return r;
}
async function Nu(t) {
  try {
    const r = await fetch(`${qo}/document-types`, { credentials: "same-origin" });
    if (!r.ok) return null;
    const a = (await r.json()).items?.find(
      (i) => i.name.toLowerCase() === t.toLowerCase()
    );
    return a ? { typeId: a.typeId } : null;
  } catch {
    return null;
  }
}
async function wu(t) {
  const r = t.fields.map((i, s) => ({
    fieldId: crypto.randomUUID(),
    name: i.name,
    fieldType: i.fieldType,
    widget: ku(i.fieldType),
    cardinality: 1,
    required: i.required ?? !1,
    helpText: "",
    options: i.options,
    order: s
  })), n = await fetch(`${qo}/document-types`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({
      name: t.name,
      description: "Auto-created for pipeline template",
      icon: t.icon,
      fields: r
    })
  });
  if (!n.ok) {
    const i = await n.text();
    throw new Error(`HTTP ${n.status}: ${i}`);
  }
  return await n.json();
}
function ku(t) {
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
function Cu(t) {
  const r = /* @__PURE__ */ new Map(), n = t.nodes.map((s) => {
    const d = crypto.randomUUID();
    return r.set(s.id, d), {
      ...s,
      id: d,
      data: JSON.parse(JSON.stringify(s.data)),
      position: { ...s.position }
    };
  }), a = t.edges.map((s) => ({
    ...s,
    id: crypto.randomUUID(),
    source: r.get(s.source) ?? s.source,
    target: r.get(s.target) ?? s.target
  })), i = (/* @__PURE__ */ new Date()).toISOString();
  return {
    ...t,
    id: crypto.randomUUID(),
    name: `${t.name} (copy)`,
    status: "draft",
    version: 1,
    publishedVersion: void 0,
    publishedSnapshot: void 0,
    nodes: n,
    edges: a,
    createdAt: i,
    updatedAt: i
  };
}
function Iu(t) {
  const r = t.triggerBinding?.event ?? "manual";
  return r === "schedule" ? "Schedule" : r === "webhook" ? "Webhook" : r === "manual" ? "Manual" : r.startsWith("document.") ? `On ${r}` : r;
}
function Su({ template: t, meta: r, onPick: n }) {
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
                r.nodeCount,
                " node",
                r.nodeCount === 1 ? "" : "s"
              ] }),
              /* @__PURE__ */ e("span", { "aria-hidden": !0, children: "·" }),
              /* @__PURE__ */ e("span", { children: r.trigger })
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary leading-[1.4] flex-1", children: t.description }),
        t.tags.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: t.tags.map((a) => /* @__PURE__ */ e(
          "span",
          {
            className: "text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#f1f5f9] text-text-secondary lowercase",
            children: a
          },
          a
        )) }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            "data-testid": `template-use-${t.id}`,
            onClick: () => n(t),
            className: "mt-auto px-2.5 py-1.5 text-xs font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
            children: "Use this template"
          }
        )
      ]
    }
  );
}
function $u({
  open: t,
  onClose: r,
  onCreated: n,
  onSelect: a
}) {
  const { userId: i } = Xn(), [s, d] = S(""), c = le(null);
  ne(() => {
    t && (d(""), setTimeout(() => c.current?.focus(), 30));
  }, [t]);
  const l = q(() => {
    const h = /* @__PURE__ */ new Map();
    for (const g of Mn) {
      const x = g.build(i || "anonymous");
      h.set(g.id, { nodeCount: x.nodes.length, trigger: Iu(x) });
    }
    return h;
  }, [i, t]), p = q(() => {
    const h = s.trim().toLowerCase();
    return h ? Mn.filter(
      (g) => g.name.toLowerCase().includes(h) || g.description.toLowerCase().includes(h) || g.tags.some((x) => x.toLowerCase().includes(h))
    ) : Mn;
  }, [s]), u = (h) => {
    if (n) {
      const g = h.build(i || "anonymous"), x = Cu(g);
      ua(x), r(), n(x.id), h.prerequisites && vu(h.prerequisites).then((m) => {
        m.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", m.errors);
      });
      return;
    }
    a && a(h);
  };
  return /* @__PURE__ */ o(
    He,
    {
      open: t,
      onClose: r,
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
              Su,
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
const tr = ["draft", "published", "archived"], Zr = ["draft", "published"];
function Tu(t) {
  if (t == null) return null;
  if (t.trim() === "") return /* @__PURE__ */ new Set();
  const r = new Set(tr);
  return new Set(
    t.split(",").map((a) => a.trim()).filter((a) => r.has(a))
  );
}
function Au(t, r) {
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
    icon: t.icon ?? r ?? "🔀",
    tags: t.tags ?? []
  };
}
function Ru(t) {
  const r = t?.event;
  return !r || r === "manual" ? "manual" : r === "schedule" ? "schedule" : r === "webhook" ? "webhook" : "document";
}
function eo(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Pu() {
  const t = /* @__PURE__ */ new Date(), r = t.getFullYear(), n = String(t.getMonth() + 1).padStart(2, "0"), a = String(t.getDate()).padStart(2, "0");
  return `${r}-${n}-${a}`;
}
function Mu({
  open: t,
  onClose: r,
  onCreate: n
}) {
  const [a, i] = S(""), s = le(null);
  ne(() => {
    t && (i(""), setTimeout(() => s.current?.focus(), 50));
  }, [t]);
  const d = a.trim().length > 0, c = () => {
    d && n(a.trim());
  };
  return /* @__PURE__ */ o(
    He,
    {
      open: t,
      onClose: r,
      title: "Create new pipeline",
      maxWidth: 440,
      footer: /* @__PURE__ */ o(G, { children: [
        /* @__PURE__ */ e(
          "button",
          {
            "data-testid": "new-pipeline-cancel",
            className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
            onClick: r,
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
            value: a,
            onChange: (l) => i(l.target.value),
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
function Zh() {
  const t = Be(), { userId: r } = Xn(), { toast: n } = sn(), { triggerRun: a, isTriggering: i } = ma(), [s, d] = an(), [c, l] = S([]), [p, u] = S(""), [f, h] = S("all"), [g, x] = S("updated"), m = q(
    () => Tu(s.get("status")),
    [s]
  ), N = q(() => m ?? new Set(Zr), [m]), y = m != null, v = (M) => {
    const _ = new URLSearchParams(s);
    if (M.size === 0)
      _.set("status", "");
    else {
      const de = tr.filter((he) => M.has(he)).join(",");
      _.set("status", de);
    }
    d(_, { replace: !0 });
  }, w = (M) => {
    const _ = y ? new Set(N) : new Set(Zr);
    _.has(M) ? _.delete(M) : _.add(M), v(_);
  }, [b, k] = S(!1), [C, T] = S(!1), [$, R] = S(null), [E, A] = S(!1), [j, W] = S(!1), [ie, Y] = S(!1), te = D(async () => {
    const M = await ha(), _ = [];
    for (const de of M) {
      const he = await at(de.id);
      he && _.push(Au(he, de.icon));
    }
    l(_);
  }, []);
  ne(() => {
    te();
  }, [te]);
  const O = q(() => {
    const M = p.trim().toLowerCase(), de = [...c.filter((he) => {
      if (M) {
        const ve = he.name.toLowerCase().includes(M), Le = he.tags.some((rr) => rr.toLowerCase().includes(M));
        if (!ve && !Le) return !1;
      }
      return !(!(y && N.size === 0) && !N.has(he.status) || f !== "all" && Ru(he.triggerBinding) !== f);
    })];
    return g === "name" ? de.sort((he, ve) => he.name.localeCompare(ve.name)) : g === "created" ? de.sort((he, ve) => ve.createdAt.localeCompare(he.createdAt)) : de.sort((he, ve) => ve.updatedAt.localeCompare(he.updatedAt)), de;
  }, [c, p, N, y, f, g]), P = q(() => O.map((M) => M.id), [O]), {
    selectionMode: H,
    selected: K,
    allVisibleSelected: U,
    selectAllRef: V,
    handleToggleSelect: J,
    handleSelectAllFiltered: X,
    handleHeaderToggleAll: pe,
    clearSelection: z,
    setSelectionMode: ce
  } = ru({ visibleRows: O, filteredIds: P }), we = q(() => {
    const M = /* @__PURE__ */ new Set();
    for (const _ of c)
      if (K.has(_.id))
        for (const de of _.tags) M.add(de);
    return Array.from(M).sort((_, de) => _.localeCompare(de));
  }, [c, K]), _e = async (M) => {
    const _ = await fa({ name: M, createdBy: r });
    k(!1), t(`/pipelines/${_.id}`);
  }, Ye = () => {
    const M = ga(r);
    it(M).then(() => te()), t(`/pipelines/${M.id}`);
  }, Fe = (M) => {
    const _ = M.build(r);
    it(_), T(!1), t(`/pipelines/${_.id}`);
  }, Ee = (M) => t(`/pipelines/${M}`), qe = async (M) => {
    if (M.status !== "published") {
      n("Run requires published state", { type: "warning" });
      return;
    }
    if (!i)
      try {
        await a(M.id, {}) ? n(`Run started for "${M.name}"`, { type: "success" }) : n("Could not start run", { type: "error" });
      } catch (_) {
        n(`Run failed: ${_.message}`, { type: "error" });
      } finally {
        t(`/pipelines/${M.id}`);
      }
  }, je = (M) => {
    const _ = Hn(M);
    _ && (it(_).then(() => te()), n(`Duplicated as "${_.name}"`, { type: "success" }));
  }, Ve = (M) => {
    const _ = On(M.id);
    if (!_) {
      n("Export failed", { type: "error" });
      return;
    }
    Dt(`${eo(M.name)}.pipeline.json`, _);
  }, Ie = async () => {
    $ && (await ar($), R(null), te(), n("Pipeline deleted", { type: "success" }));
  }, xe = $ ? c.find((M) => M.id === $) : null, oe = () => {
    const M = Array.from(K);
    M.length !== 0 && (M.forEach((_, de) => {
      window.setTimeout(() => {
        const he = c.find((Le) => Le.id === _), ve = On(_);
        !he || !ve || Dt(`${eo(he.name)}-${Pu()}.pipeline.json`, ve);
      }, de * 100);
    }), n(`Exported ${M.length} pipeline${M.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, Q = async (M) => {
    const _ = Array.from(K);
    for (const de of _) {
      const he = await at(de);
      if (!he) continue;
      const ve = he.tags ?? [];
      ve.includes(M) || (he.tags = [...ve, M], await it(he));
    }
    W(!1), te(), n(`Added tag "${M}" to ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ae = async (M) => {
    const _ = Array.from(K);
    for (const de of _) {
      const he = await at(de);
      if (!he) continue;
      const ve = he.tags ?? [];
      ve.includes(M) && (he.tags = ve.filter((Le) => Le !== M), await it(he));
    }
    te(), n(`Removed tag "${M}" from ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ue = async () => {
    const M = Array.from(K);
    for (const _ of M) await ar(_);
    A(!1), z(), te(), n(`Deleted ${M.length} pipeline${M.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, be = async () => {
    const M = Array.from(K);
    if (M.length === 0) return;
    let _ = 0, de = 0;
    for (const he of M) {
      const ve = await at(he);
      if (!ve) continue;
      if (ve.status === "published") {
        de += 1;
        continue;
      }
      await xa(he) && (_ += 1);
    }
    te(), de > 0 ? n(
      `Published ${_}; skipped ${de} already published`,
      { type: "success" }
    ) : n(
      `Published ${_} pipeline${_ === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, Pe = async () => {
    const M = Array.from(K);
    if (M.length === 0) return;
    let _ = 0, de = 0;
    for (const ve of M) {
      const Le = await at(ve);
      if (!Le) continue;
      Le.status === "archived" ? (Le.status = "draft", de += 1) : (Le.status = "archived", _ += 1), await it(Le);
    }
    te();
    const he = [];
    _ > 0 && he.push(`Archived ${_}`), de > 0 && he.push(`Unarchived ${de}`), n(he.join(" · ") || "No pipelines changed", { type: "success" });
  }, Te = async () => {
    const M = Array.from(K);
    if (M.length === 0) return;
    const _ = [];
    for (const he of M) {
      const ve = await at(he);
      ve && _.push(ve);
    }
    if (_.length === 0) {
      n("Export failed", { type: "error" });
      return;
    }
    const de = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    Dt(`pipelines-${de}.json`, JSON.stringify(_, null, 2)), n(`Exported ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  };
  ne(() => {
    const M = (_) => {
      const de = _.target;
      if (de) {
        const ve = de.tagName;
        if (ve === "INPUT" || ve === "TEXTAREA" || ve === "SELECT" || de.isContentEditable)
          return;
      }
      if (_.key === "Escape") {
        (K.size > 0 || H || j || ie) && (W(!1), Y(!1), z(), ce(!1));
        return;
      }
      if ((_.metaKey || _.ctrlKey) && (_.key === "a" || _.key === "A")) {
        H && (_.preventDefault(), X());
        return;
      }
      (_.key === "Delete" || _.key === "Backspace") && K.size > 0 && !E && !$ && !b && !C && (_.preventDefault(), A(!0));
    };
    return window.addEventListener("keydown", M), () => window.removeEventListener("keydown", M);
  }, [
    K,
    H,
    j,
    ie,
    E,
    $,
    b,
    C,
    z,
    X,
    ce
  ]);
  const Ge = c.length > 0, zt = K.size > 0;
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
        Ge && /* @__PURE__ */ e(
          tu,
          {
            search: p,
            onSearchChange: u,
            statusFilter: N,
            statusExplicit: y,
            onToggleStatusKey: w,
            triggerFilter: f,
            onTriggerFilterChange: h,
            sortKey: g,
            onSortKeyChange: x,
            allVisibleSelected: U,
            selectAllRef: V,
            onHeaderToggleAll: pe
          }
        ),
        zt && /* @__PURE__ */ e(
          nu,
          {
            count: K.size,
            onClear: z,
            onExport: oe,
            onExportAsJSON: Te,
            onPublish: be,
            onArchive: Pe,
            onAddTag: () => {
              W((M) => !M), Y(!1);
            },
            onRemoveTag: () => {
              Y((M) => !M), W(!1);
            },
            onDelete: () => A(!0),
            onDeleteWithConfirm: () => A(!0),
            addTagOpen: j,
            removeTagOpen: ie,
            onSubmitAddTag: Q,
            onSubmitRemoveTag: ae,
            onCloseAddTag: () => W(!1),
            onCloseRemoveTag: () => Y(!1),
            unionTags: we
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: I(
              "flex-1 overflow-y-auto overflow-x-hidden min-w-0",
              Ge ? "p-6" : "p-0"
            ),
            children: Ge ? O.length === 0 ? /* @__PURE__ */ e(
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
                children: O.map((M) => /* @__PURE__ */ e(
                  Qp,
                  {
                    row: M,
                    onOpen: () => Ee(M.id),
                    onRun: () => {
                      qe(M);
                    },
                    onDuplicate: () => je(M.id),
                    onExport: () => Ve(M),
                    onDelete: () => R(M.id),
                    selectionMode: H,
                    selected: K.has(M.id),
                    anySelected: zt,
                    onToggleSelect: (_) => J(M.id, _)
                  },
                  M.id
                ))
              }
            ) : /* @__PURE__ */ o("div", { className: "flex flex-col h-full", children: [
              /* @__PURE__ */ e("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ e(
                ze,
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
                    onClick: Ye,
                    className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
                    children: "or try the demo pipeline"
                  }
                ),
                /* @__PURE__ */ e("span", { "aria-hidden": !0, children: "·" }),
                /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(
          Mu,
          {
            open: b,
            onClose: () => k(!1),
            onCreate: _e
          }
        ),
        /* @__PURE__ */ e(
          $u,
          {
            open: C,
            onClose: () => T(!1),
            onSelect: Fe
          }
        ),
        /* @__PURE__ */ e(
          He,
          {
            open: !!$,
            onClose: () => R(null),
            title: "Delete pipeline?",
            maxWidth: 400,
            footer: /* @__PURE__ */ o(G, { children: [
              /* @__PURE__ */ e(
                "button",
                {
                  "data-testid": "delete-pipeline-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => R(null),
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
            children: xe && /* @__PURE__ */ o("p", { className: "m-0", children: [
              /* @__PURE__ */ o("strong", { children: [
                "“",
                xe.name,
                "”"
              ] }),
              " will be permanently removed. Run history will also be lost."
            ] })
          }
        ),
        /* @__PURE__ */ e(
          He,
          {
            open: E,
            onClose: () => A(!1),
            title: `Delete ${K.size} pipeline${K.size === 1 ? "" : "s"}?`,
            maxWidth: 420,
            backdropTestId: "bulk-delete-modal",
            footer: /* @__PURE__ */ o(G, { children: [
              /* @__PURE__ */ e(
                "button",
                {
                  "data-testid": "bulk-delete-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => A(!1),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ o(
                "button",
                {
                  "data-testid": "bulk-delete-confirm",
                  onClick: ue,
                  className: I(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-danger text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: [
                    "Delete ",
                    K.size
                  ]
                }
              )
            ] }),
            children: /* @__PURE__ */ o("p", { className: "m-0", children: [
              /* @__PURE__ */ o("strong", { children: [
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
const Eu = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function Vo(t, r, n) {
  const a = Eu[t], i = Math.max(0, r | 0), s = Math.max(0, n | 0);
  if (!a)
    return {
      inputTokens: i,
      outputTokens: s,
      inputCostUsd: 0,
      outputCostUsd: 0,
      totalCostUsd: 0,
      model: t,
      modelFound: !1
    };
  const d = i / 1e6 * a.inputPerMillion, c = s / 1e6 * a.outputPerMillion;
  return {
    inputTokens: i,
    outputTokens: s,
    inputCostUsd: d,
    outputCostUsd: c,
    totalCostUsd: d + c,
    model: t,
    modelFound: !0
  };
}
function vt(t) {
  const r = {};
  let n = 0, a = 0, i = 0, s = 0, d = !1;
  for (const l of t) {
    if (!l.model) continue;
    const p = l.tokensIn ?? 0, u = l.tokensOut ?? 0, f = Vo(l.model, p, u), h = r[l.model];
    h ? r[l.model] = {
      inputTokens: h.inputTokens + f.inputTokens,
      outputTokens: h.outputTokens + f.outputTokens,
      inputCostUsd: h.inputCostUsd + f.inputCostUsd,
      outputCostUsd: h.outputCostUsd + f.outputCostUsd,
      totalCostUsd: h.totalCostUsd + f.totalCostUsd,
      model: l.model,
      modelFound: h.modelFound || f.modelFound
    } : r[l.model] = f, n += f.inputTokens, a += f.outputTokens, i += f.inputCostUsd, s += f.outputCostUsd, f.modelFound && (d = !0);
  }
  return { total: {
    inputTokens: n,
    outputTokens: a,
    inputCostUsd: i,
    outputCostUsd: s,
    totalCostUsd: i + s,
    model: "aggregate",
    modelFound: d
  }, perModel: r };
}
function jt(t) {
  return !t || !t.modelFound && t.totalCostUsd === 0 ? "—" : t.totalCostUsd >= 0.01 ? `$${t.totalCostUsd.toFixed(2)}` : t.totalCostUsd === 0 ? "$0.00" : `$${t.totalCostUsd.toFixed(4)}`;
}
function Du(t) {
  const r = t.data.label;
  if (typeof r == "string" && r.trim()) return r.trim();
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
function Wo(t, r) {
  let n = 0;
  if (t.llm) {
    const i = r.get(t.nodeId);
    i && (n += Vo(i, t.llm.tokensIn, t.llm.tokensOut).totalCostUsd);
  }
  const a = t.costUsd;
  return typeof a == "number" && Number.isFinite(a) && a > 0 && (n += a), n;
}
function Ou(t, r) {
  if (!r) return [];
  const n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const l of r.nodes)
    l.data.type === "llm" && n.set(l.id, l.data.model), a.set(l.id, Du(l)), i.set(l.id, l.data.type);
  const s = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const l of r.nodes)
    s.set(l.id, 0), d.set(l.id, 0);
  for (const l of t)
    for (const p of Object.values(l.steps ?? {})) {
      if (!a.has(p.nodeId)) continue;
      const u = Wo(p, n);
      s.set(p.nodeId, (s.get(p.nodeId) ?? 0) + u), d.set(p.nodeId, (d.get(p.nodeId) ?? 0) + 1);
    }
  const c = r.nodes.map((l) => ({
    nodeId: l.id,
    label: a.get(l.id) ?? l.id,
    type: i.get(l.id) ?? l.type,
    totalCostUsd: s.get(l.id) ?? 0,
    stepCount: d.get(l.id) ?? 0
  }));
  return c.sort((l, p) => p.totalCostUsd - l.totalCostUsd), c;
}
function _u(t) {
  return t.slice(0, 10);
}
function Lu(t) {
  return Date.UTC(
    Number(t.slice(0, 4)),
    Number(t.slice(5, 7)) - 1,
    Number(t.slice(8, 10))
  );
}
function Bu(t, r, n = 30, a = /* @__PURE__ */ new Date()) {
  const i = /* @__PURE__ */ new Map();
  if (r)
    for (const u of r.nodes)
      u.data.type === "llm" && i.set(u.id, u.data.model);
  const s = Date.UTC(
    a.getUTCFullYear(),
    a.getUTCMonth(),
    a.getUTCDate()
  ), d = s - (n - 1) * 864e5, c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  for (let u = d; u <= s; u += 864e5) {
    const f = new Date(u).toISOString().slice(0, 10);
    c.set(f, 0), l.set(f, 0);
  }
  for (const u of t) {
    const f = _u(u.startedAt);
    if (!c.has(f)) continue;
    let h = 0;
    for (const g of Object.values(u.steps ?? {}))
      h += Wo(g, i);
    c.set(f, (c.get(f) ?? 0) + h), l.set(f, (l.get(f) ?? 0) + 1);
  }
  const p = [];
  for (let u = d; u <= s; u += 864e5) {
    const f = new Date(u).toISOString().slice(0, 10);
    p.push({
      date: f,
      ts: Lu(f),
      totalCostUsd: c.get(f) ?? 0,
      runCount: l.get(f) ?? 0
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
], Ho = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], Go = ["24h", "7d", "30d", "all"], Uu = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function Fu(t) {
  return t.startsWith("document.") || t === "document" ? "document" : t === "schedule" || t === "scheduled" ? "scheduled" : t === "webhook" ? "webhook" : "manual";
}
function ju(t) {
  let r = 0;
  for (const n of Object.values(t.steps ?? {})) {
    const a = n.attempts?.length ?? 0;
    a > 1 && (r += a - 1);
  }
  return r;
}
function Ko(t, r) {
  const n = r.now ?? Date.now(), a = r.range === "all" ? null : n - Uu[r.range], i = r.query.trim().toLowerCase();
  return t.filter((s) => {
    if (r.statuses.size > 0 && !r.statuses.has(s.status)) return !1;
    if (r.triggerKinds.size > 0) {
      const d = Fu(s.triggeredBy.triggerType);
      if (!r.triggerKinds.has(d)) return !1;
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
function to(t, r) {
  if (!t) return /* @__PURE__ */ new Set();
  const n = new Set(r);
  return new Set(
    t.split(",").map((a) => a.trim()).filter((a) => n.has(a))
  );
}
function Yo(t) {
  const r = t.get("range") ?? "7d", n = Go.includes(r) ? r : "7d";
  return {
    query: t.get("q") ?? "",
    statuses: to(t.get("status"), Jo),
    triggerKinds: to(t.get("trigger"), Ho),
    range: n
  };
}
const zu = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, qu = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, Vu = {
  "24h": "Last 24h",
  "7d": "Last 7d",
  "30d": "Last 30d",
  all: "All time"
};
function no({
  label: t,
  options: r,
  selected: n,
  onToggle: a,
  labels: i,
  testIdPrefix: s
}) {
  const [d, c] = S(!1), l = le(null);
  ft(l, () => c(!1), d);
  const p = n.size === 0 ? "All" : n.size <= 2 ? Array.from(n).map((u) => i[u]).join(", ") : `${n.size} selected`;
  return /* @__PURE__ */ o("div", { ref: l, className: "relative", children: [
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => c(!d),
        "data-testid": `${s}-dropdown`,
        className: I(
          "flex items-center gap-1.5 px-2.5 py-[5px] text-xs font-medium rounded cursor-pointer font-[inherit] whitespace-nowrap bg-surface text-text-secondary border",
          n.size > 0 ? "border-primary" : "border-border"
        ),
        children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary font-semibold text-[11px]", children: t }),
          /* @__PURE__ */ e(
            "span",
            {
              className: I(
                n.size > 0 ? "text-primary font-semibold" : "text-text-secondary font-medium"
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
        children: r.map((u) => /* @__PURE__ */ o(
          "label",
          {
            "data-testid": `${s}-${u}`,
            className: "flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer text-text-primary hover:bg-[#f1f5f9]",
            children: [
              /* @__PURE__ */ e(
                "input",
                {
                  type: "checkbox",
                  checked: n.has(u),
                  onChange: () => a(u),
                  className: "m-0 accent-primary"
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
function Xo({
  query: t,
  statuses: r,
  triggerKinds: n,
  range: a,
  onQueryChange: i,
  onStatusToggle: s,
  onTriggerToggle: d,
  onRangeChange: c,
  onClearFilters: l
}) {
  const p = r.size > 0 || n.size > 0 || t.length > 0;
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
            onChange: (u) => i(u.target.value),
            className: "flex-[1_1_180px] max-w-[240px] px-2.5 py-[5px] text-xs border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
            "aria-label": "Search runs by run id or pipeline id"
          }
        ),
        /* @__PURE__ */ e("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ e("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: Go.map((u) => /* @__PURE__ */ e(
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
            children: Vu[u]
          },
          u
        )) }),
        /* @__PURE__ */ e("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ e(
          no,
          {
            label: "Status",
            options: Jo,
            selected: r,
            onToggle: s,
            labels: zu,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ e(
          no,
          {
            label: "Trigger",
            options: Ho,
            selected: n,
            onToggle: d,
            labels: qu,
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
function Wu({
  selectionCount: t,
  onExport: r,
  onDelete: n,
  onClear: a
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
            onClick: r,
            className: "px-2.5 py-1 text-xs font-medium border border-border bg-surface text-text-secondary rounded cursor-pointer font-[inherit]",
            children: "Export JSON"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            "data-testid": "runs-bulk-delete",
            onClick: n,
            className: "px-2.5 py-1 text-xs font-medium border border-[#dc2626] bg-surface text-[#dc2626] rounded cursor-pointer font-[inherit]",
            children: "Delete"
          }
        ),
        /* @__PURE__ */ e(
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
function nr(t) {
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
function Ju(t) {
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
const Hu = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function Gu(t) {
  const r = Date.now() - new Date(t).getTime();
  return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 2592e5 ? `${Math.floor(r / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Ku({
  filtered: t,
  selected: r,
  onSelectionChange: n,
  comparePair: a,
  onToggleComparePair: i,
  costByRunId: s,
  pipelineId: d,
  onNavigate: c,
  onOpenRetryModal: l
}) {
  const p = le(!1), u = le(null), f = t.length > 0 && t.every((m) => r.has(m.id)), h = !f && t.some((m) => r.has(m.id)), g = () => {
    const m = new Set(r);
    if (f)
      for (const N of t) m.delete(N.id);
    else
      for (const N of t) m.add(N.id);
    n(m);
  }, x = (m, N, y) => {
    const v = new Set(r), w = !v.has(m);
    if (y && u.current != null) {
      const b = Math.min(u.current, N), k = Math.max(u.current, N);
      for (let C = b; C <= k; C++) {
        const T = t[C];
        T && (w ? v.add(T.id) : v.delete(T.id));
      }
    } else w ? v.add(m) : v.delete(m);
    u.current = N, n(v);
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
                  checked: f,
                  ref: (m) => {
                    m && (m.indeterminate = h);
                  },
                  onChange: g
                }
              )
            }
          ),
          ["Started", "Status", "Duration", "Retries", "Cost", "Triggered by", "Run ID", ""].map((m, N) => /* @__PURE__ */ e(
            "th",
            {
              scope: "col",
              className: "px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
              children: m
            },
            `${m}-${N}`
          ))
        ] }) }),
        /* @__PURE__ */ e("tbody", { children: t.map((m, N) => {
          const { tone: y, label: v } = nr(m.status), w = r.has(m.id), b = ju(m);
          return /* @__PURE__ */ o(
            "tr",
            {
              "data-testid": `run-card-${m.id}`,
              className: I(
                "border-b border-border cursor-pointer hover:bg-[#f1f5f9]",
                w && "bg-[#f1f5f9]"
              ),
              onClick: () => c(`/pipelines/${d}/runs/${m.id}`),
              children: [
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary w-6", onClick: (k) => k.stopPropagation(), children: [
                  /* @__PURE__ */ e(
                    "input",
                    {
                      type: "checkbox",
                      "data-testid": `run-select-${m.id}`,
                      checked: w,
                      onMouseDown: (k) => {
                        p.current = k.shiftKey;
                      },
                      onKeyDown: (k) => {
                        p.current = k.shiftKey;
                      },
                      onChange: () => {
                        const k = p.current;
                        p.current = !1, x(m.id, N, k);
                      },
                      "aria-label": `Select run ${m.id.slice(0, 8)}`
                    }
                  ),
                  /* @__PURE__ */ e(
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
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: Gu(m.startedAt) }),
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: [
                  /* @__PURE__ */ e(se, { tone: y, "aria-label": `Status: ${v}`, children: v }),
                  m.status === "running" && m.stuckAt && /* @__PURE__ */ e(
                    se,
                    {
                      tone: "warning",
                      size: "xs",
                      "data-testid": `run-stuck-badge-${m.id}`,
                      title: `No pipeline events since ${new Date(m.stuckAt).toLocaleTimeString()}`,
                      className: "ml-1.5",
                      children: "Stuck"
                    }
                  ),
                  m.status === "failed" && m.error?.errorCategory && /* @__PURE__ */ e(
                    se,
                    {
                      tone: Ju(m.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${m.id}`,
                      title: m.error.message,
                      className: "ml-1.5",
                      children: Hu[m.error.errorCategory] ?? m.error.errorCategory
                    }
                  )
                ] }),
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: Se(m.durationMs) }),
                /* @__PURE__ */ e(
                  "td",
                  {
                    className: I(
                      "px-3 py-2.5 text-xs font-mono",
                      b > 0 ? "text-text-primary" : "text-text-tertiary"
                    ),
                    "data-testid": `run-retries-${m.id}`,
                    title: b > 0 ? `${b} retry attempts across this run` : "No retries — every step succeeded on first attempt",
                    children: b > 0 ? `×${b}` : "—"
                  }
                ),
                /* @__PURE__ */ e(
                  "td",
                  {
                    className: "px-3 py-2.5 text-xs text-text-secondary font-mono",
                    "data-testid": `run-cost-${m.id}`,
                    children: s[m.id] ?? "—"
                  }
                ),
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: m.triggeredBy.userId ?? m.triggeredBy.triggerType }),
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-[11px] font-mono text-text-tertiary", children: m.id.slice(0, 8) }),
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right", onClick: (k) => k.stopPropagation(), children: [
                  m.status === "running" && m.stuckAt && /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      "data-testid": `force-fail-${m.id}`,
                      onClick: async (k) => {
                        if (k.stopPropagation(), !!confirm(`Force-fail stuck run ${m.id.slice(0, 8)}? The run will be interrupted and you can retry from the stuck step.`))
                          try {
                            await ba(m.pipelineId, m.id);
                          } catch (C) {
                            alert(`Force-fail failed: ${C instanceof Error ? C.message : String(C)}`);
                          }
                      },
                      title: "Force-fail this stuck run so you can retry from the stuck step",
                      className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-[#b45309] border border-[#fde68a] rounded cursor-pointer font-[inherit]",
                      children: "⚡ Force-fail"
                    }
                  ),
                  m.status === "failed" && m.error?.nodeId && m.error.nodeId !== "unknown" && /* @__PURE__ */ e(
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
                  /* @__PURE__ */ e("span", { className: "text-xs text-primary", children: "View →" })
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
function ef() {
  const { pipelineId: t } = gt(), r = Be(), [n, a] = an(), [i, s] = S([]), [d, c] = S(null), [l, p] = S([]), [u, f] = S(() => /* @__PURE__ */ new Set()), [h, g] = S(null), [x, m] = S(!1), [N, y] = S(null), [v, w] = S(!1), b = D((U) => {
    const V = U.error?.nodeId;
    if (!V || V === "unknown") return;
    const J = Object.entries(U.steps).filter(([X, pe]) => X !== V && pe.status === "completed").map(([X]) => X);
    g({ run: U, nodeId: V, skippedNodes: J, snapshotInput: !1 }), y(null);
  }, []), k = D(async () => {
    if (h) {
      y(null), m(!0);
      try {
        const U = await To(
          h.run.pipelineId,
          h.run.id,
          h.nodeId,
          void 0,
          h.snapshotInput || void 0
        );
        g(null), r(`/pipelines/${h.run.pipelineId}/runs/${U.newRunId}`);
      } catch (U) {
        y(U instanceof Error ? U.message : String(U)), m(!1);
      }
    }
  }, [h, r]), { query: C, statuses: T, triggerKinds: $, range: R } = q(
    () => Yo(n),
    [n]
  ), E = (U, V) => {
    const J = new URLSearchParams(n);
    V ? J.set(U, V) : J.delete(U), a(J, { replace: !0 });
  }, A = (U) => {
    const V = new Set(T);
    V.has(U) ? V.delete(U) : V.add(U), E("status", V.size === 0 ? null : Array.from(V).join(","));
  }, j = (U) => {
    const V = new Set($);
    V.has(U) ? V.delete(U) : V.add(U), E("trigger", V.size === 0 ? null : Array.from(V).join(","));
  }, W = (U) => {
    E("range", U === "7d" ? null : U);
  }, ie = (U) => {
    E("q", U.length === 0 ? null : U);
  }, Y = (U) => {
    p((V) => V.includes(U) ? V.filter((J) => J !== U) : V.length >= 2 ? [V[1], U] : [...V, U]);
  };
  ne(() => {
    t && (c(ot(t)), s(tn(t)));
  }, [t]);
  const te = q(
    () => Ko(i, { query: C, statuses: T, triggerKinds: $, range: R }),
    [i, C, T, $, R]
  ), O = q(() => {
    const U = /* @__PURE__ */ new Map();
    if (!d) return U;
    for (const V of d.nodes)
      V.data.type === "llm" && U.set(V.id, V.data.model);
    return U;
  }, [d]), P = q(() => {
    const U = {};
    for (const V of te) {
      const J = Object.values(V.steps).filter((X) => !!X.llm).map((X) => ({
        model: O.get(X.nodeId),
        tokensIn: X.llm?.tokensIn ?? 0,
        tokensOut: X.llm?.tokensOut ?? 0
      }));
      U[V.id] = jt(vt(J).total);
    }
    return U;
  }, [te, O]), H = () => {
    if (!t) return;
    w(!1);
    const U = Array.from(u), V = i.filter((J) => !u.has(J.id));
    $o(t);
    for (const J of [...V].sort((X, pe) => X.startedAt.localeCompare(pe.startedAt)))
      ya(t, J);
    s(tn(t)), f(/* @__PURE__ */ new Set()), p((J) => J.filter((X) => !U.includes(X)));
  }, K = () => {
    const U = i.filter((z) => u.has(z.id));
    if (U.length === 0) return;
    const V = new Blob([JSON.stringify(U, null, 2)], { type: "application/json" }), J = URL.createObjectURL(V), X = document.createElement("a"), pe = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    X.href = J, X.download = `pipeline-runs-${pe}.json`, document.body.appendChild(X), X.click(), document.body.removeChild(X), URL.revokeObjectURL(J);
  };
  return t ? d ? /* @__PURE__ */ o("div", { "data-testid": "pipeline-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e(
      rn,
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
            /* @__PURE__ */ e("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: h.skippedNodes.map((U) => /* @__PURE__ */ e("span", { className: "bg-[#fafbfc] border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary", children: U.slice(0, 10) }, U)) })
          ] }),
          /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
            /* @__PURE__ */ e("input", { type: "checkbox", checked: h.snapshotInput, onChange: (U) => g((V) => V && { ...V, snapshotInput: U.target.checked }), className: "accent-primary" }),
            "Use persisted input snapshot"
          ] }),
          N && /* @__PURE__ */ e("div", { "data-testid": "retry-modal-error", className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: N })
        ] })
      }
    ),
    /* @__PURE__ */ e(
      rn,
      {
        open: v,
        onConfirm: H,
        onCancel: () => w(!1),
        title: `Delete ${u.size} run${u.size === 1 ? "" : "s"}?`,
        body: "This cannot be undone.",
        confirmLabel: `Delete ${u.size}`,
        tone: "destructive"
      }
    ),
    N && /* @__PURE__ */ e(Ze, { title: "Retry failed:", onDismiss: () => y(null), children: N }),
    /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => r(`/pipelines/${t}`),
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
        i.length,
        " run",
        i.length === 1 ? "" : "s",
        " persisted"
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => r(`/pipelines/${t}/stats`),
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
            const [U, V] = l;
            r(`/pipelines/${t}/runs/compare/${U}/${V}`);
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
      Xo,
      {
        query: C,
        statuses: T,
        triggerKinds: $,
        range: R,
        onQueryChange: ie,
        onStatusToggle: A,
        onTriggerToggle: j,
        onRangeChange: W,
        onClearFilters: () => {
          ie(""), E("status", null), E("trigger", null);
        }
      }
    ),
    u.size > 0 && /* @__PURE__ */ e(
      Wu,
      {
        selectionCount: u.size,
        onExport: K,
        onDelete: () => {
          u.size > 0 && t && w(!0);
        },
        onClear: () => f(/* @__PURE__ */ new Set())
      }
    ),
    te.length === 0 ? /* @__PURE__ */ e(
      ze,
      {
        icon: "📜",
        title: i.length === 0 ? "No runs yet" : "No runs match these filters",
        body: i.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
      }
    ) : /* @__PURE__ */ e(
      Ku,
      {
        filtered: te,
        selected: u,
        onSelectionChange: f,
        comparePair: l,
        onToggleComparePair: Y,
        costByRunId: P,
        pipelineId: t,
        onNavigate: r,
        onOpenRetryModal: b
      }
    )
  ] }) : /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
    ze,
    {
      icon: "🔍",
      title: "Pipeline not found",
      body: "It may have been deleted. Go back to the pipelines list.",
      actionLabel: "Back to pipelines",
      onAction: () => r("/pipelines")
    }
  ) }) : /* @__PURE__ */ e(xt, { to: "/pipelines", replace: !0 });
}
function Yu(t) {
  return q(() => {
    if (!t) return null;
    const r = ot(t.pipelineId);
    if (!r) return null;
    const n = /* @__PURE__ */ new Map();
    for (const i of r.nodes)
      i.data.type === "llm" && n.set(i.id, i.data.model);
    const a = Object.values(t.steps).filter((i) => !!i.llm).map((i) => ({
      model: n.get(i.nodeId),
      tokensIn: i.llm?.tokensIn ?? 0,
      tokensOut: i.llm?.tokensOut ?? 0
    }));
    return vt(a).total;
  }, [t]);
}
function Qe({ title: t, children: r }) {
  return /* @__PURE__ */ o("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ e("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: t }),
    r
  ] });
}
const ro = "m-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", oo = "px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", En = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", Me = "px-2 py-[5px] text-[11px] text-text-secondary align-top", Xu = {
  "#2563eb": "bg-info/10 text-info-fg",
  "#7c3aed": "bg-accent/10 text-accent-fg",
  "#16a34a": "bg-success/10 text-success-fg",
  "#dc2626": "bg-danger/10 text-danger-fg"
};
function At(t) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${Xu[t] ?? ""}`.trimEnd();
}
const Qu = {
  completed: "#16a34a",
  failed: "#dc2626",
  running: "#2563eb"
};
function Zu({ stepId: t, step: r, index: n, nodeType: a, nodeConfig: i, onRetryFromStep: s, onResumeFromStep: d }) {
  const [c, l] = S(!1), p = r.output, u = p?.response, f = r.llm, h = r.input, g = Qu[r.status] ?? "#94a3b8";
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
              "aria-label": `Status: ${r.status}`,
              className: "text-[10px] font-bold text-white px-1.5 py-0.5 rounded-[3px] uppercase shrink-0",
              style: { background: g },
              children: r.status
            }
          ),
          /* @__PURE__ */ o("span", { className: "text-[13px] font-semibold text-text-primary", children: [
            n + 1,
            ". ",
            a
          ] }),
          /* @__PURE__ */ e("span", { className: "text-[11px] font-mono text-text-tertiary", children: t.slice(0, 8) }),
          r.durationMs != null && /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary ml-auto", children: r.durationMs < 1e3 ? `${r.durationMs}ms` : `${(r.durationMs / 1e3).toFixed(1)}s` }),
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
          /* @__PURE__ */ e(Qe, { title: "Execution Timeline", children: /* @__PURE__ */ o("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ e("th", { scope: "col", className: En, children: "Event" }),
              /* @__PURE__ */ e("th", { scope: "col", className: En, children: "Time" }),
              /* @__PURE__ */ e("th", { scope: "col", className: En, children: "Detail" })
            ] }) }),
            /* @__PURE__ */ o("tbody", { children: [
              r.startedAt && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Me, children: /* @__PURE__ */ e("span", { className: At("#2563eb"), children: "started" }) }),
                /* @__PURE__ */ e("td", { className: Me, children: new Date(r.startedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Me, children: [
                  "Node ",
                  t.slice(0, 8),
                  " (",
                  a,
                  ") began execution"
                ] })
              ] }),
              f?.streamOpened && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Me, children: /* @__PURE__ */ e("span", { className: At("#7c3aed"), children: "stream.opened" }) }),
                /* @__PURE__ */ e("td", { className: Me, children: "—" }),
                /* @__PURE__ */ e("td", { className: Me, children: "LLM stream connection established" })
              ] }),
              f?.firstTokenLatencyMs != null && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Me, children: /* @__PURE__ */ e("span", { className: At("#7c3aed"), children: "first.token" }) }),
                /* @__PURE__ */ o("td", { className: Me, children: [
                  "+",
                  f.firstTokenLatencyMs,
                  "ms"
                ] }),
                /* @__PURE__ */ e("td", { className: Me, children: "First token received from LLM" })
              ] }),
              r.completedAt && r.status === "completed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Me, children: /* @__PURE__ */ e("span", { className: At("#16a34a"), children: "completed" }) }),
                /* @__PURE__ */ e("td", { className: Me, children: new Date(r.completedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Me, children: [
                  "Finished in ",
                  r.durationMs != null ? r.durationMs < 1e3 ? `${r.durationMs}ms` : `${(r.durationMs / 1e3).toFixed(1)}s` : "—"
                ] })
              ] }),
              r.status === "failed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Me, children: /* @__PURE__ */ e("span", { className: At("#dc2626"), children: "failed" }) }),
                /* @__PURE__ */ e("td", { className: Me, children: r.completedAt ? new Date(r.completedAt).toLocaleTimeString() : "—" }),
                /* @__PURE__ */ e("td", { className: Me, children: r.error ?? "Unknown error" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ e(Qe, { title: "Node Configuration", children: i && Object.keys(i).length > 1 ? /* @__PURE__ */ e("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(i).filter(([x]) => x !== "type").map(([x, m]) => /* @__PURE__ */ o(No.Fragment, { children: [
            /* @__PURE__ */ e("span", { className: "text-text-tertiary font-medium", children: x }),
            /* @__PURE__ */ e(
              "span",
              {
                className: I(
                  "text-text-secondary break-words",
                  typeof m == "string" && m.length > 60 ? "whitespace-pre-wrap font-sans" : "whitespace-nowrap font-mono"
                ),
                children: typeof m == "string" ? m : JSON.stringify(m)
              }
            )
          ] }, x)) }) : /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary italic", children: "No configuration" }) }),
          h && Object.keys(h).length > 0 && /* @__PURE__ */ e(Qe, { title: "Runtime Input", children: /* @__PURE__ */ e("pre", { className: ro, children: JSON.stringify(h, null, 2) }) }),
          f?.prompt && /* @__PURE__ */ e(Qe, { title: "Resolved Prompt", children: /* @__PURE__ */ e("div", { className: oo, children: f.prompt }) }),
          u || f?.response ? /* @__PURE__ */ e(Qe, { title: "Response", children: /* @__PURE__ */ e("div", { className: oo, children: u ?? f?.response }) }) : /* @__PURE__ */ e(Qe, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ e("pre", { className: ro, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
          (f || p?.tokensIn != null) && /* @__PURE__ */ e(Qe, { title: "Token Usage", children: /* @__PURE__ */ o("div", { className: "flex gap-5 flex-wrap text-xs text-text-secondary", children: [
            /* @__PURE__ */ o("span", { children: [
              "Tokens in: ",
              /* @__PURE__ */ e("strong", { children: String(f?.tokensIn ?? p?.tokensIn ?? "—") })
            ] }),
            /* @__PURE__ */ o("span", { children: [
              "Tokens out: ",
              /* @__PURE__ */ e("strong", { children: String(f?.tokensOut ?? p?.tokensOut ?? "—") })
            ] }),
            f?.firstTokenLatencyMs != null && /* @__PURE__ */ o("span", { children: [
              "First token: ",
              /* @__PURE__ */ o("strong", { children: [
                f.firstTokenLatencyMs,
                "ms"
              ] })
            ] })
          ] }) }),
          r.error && /* @__PURE__ */ e(Qe, { title: "Error", children: /* @__PURE__ */ e("div", { className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap", children: r.error }) }),
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
function em({ steps: t, nodeDataMap: r, edges: n, onRetryFromStep: a, onResumeFromStep: i }) {
  const s = q(() => {
    const l = Object.entries(t).sort(([, b], [, k]) => {
      const C = b.completedAt ? Date.parse(b.completedAt) - (b.durationMs ?? 0) : 0, T = k.completedAt ? Date.parse(k.completedAt) - (k.durationMs ?? 0) : 0;
      return C - T;
    });
    if (!n || n.length === 0)
      return l.map(([b, k]) => ({
        stepId: b,
        step: k,
        children: []
      }));
    const p = (b) => {
      const k = b.lastIndexOf(":");
      if (k > 0) {
        const C = b.slice(k + 1);
        if (/^\d+$/.test(C)) return b.slice(0, k);
      }
      return b;
    }, u = /* @__PURE__ */ new Set(["fork", "condition", "approval"]), f = /* @__PURE__ */ new Set();
    for (const [b] of l) {
      const k = p(b), C = r[k]?.type;
      C && u.has(C) && f.add(k);
    }
    const h = (b) => b.startsWith("branch-") || b === "true" || b === "false" || b === "approved" || b === "rejected", g = [];
    for (const b of n)
      f.has(b.source) && h(b.sourceHandle) && g.push({ forkId: b.source, branch: b.sourceHandle, targetNodeId: b.target });
    const x = /* @__PURE__ */ new Map();
    for (const b of n)
      x.has(b.source) || x.set(b.source, []), x.get(b.source).push({ target: b.target, handle: b.sourceHandle });
    const m = /* @__PURE__ */ new Set();
    function N(b) {
      const k = [];
      let C = b;
      for (; C; ) {
        const T = l.find(([W]) => p(W) === C && !m.has(W));
        if (!T) break;
        const [$, R] = T;
        m.add($);
        const E = { stepId: $, step: R, children: [] }, A = p($);
        if (f.has(A)) {
          const W = g.filter((ie) => ie.forkId === A);
          for (const { branch: ie, targetNodeId: Y } of W) {
            const te = N(Y);
            for (const O of te)
              O.branch = O.branch ?? ie;
            te.length > 0 && (te[0].branch = ie, E.children.push(...te));
          }
        }
        k.push(E);
        const j = x.get(A)?.filter((W) => W.handle === "out");
        C = j && j.length === 1 ? j[0].target : null;
      }
      return k;
    }
    const y = /* @__PURE__ */ new Set();
    for (const b of n)
      y.add(b.target);
    const v = l.find(([b]) => !y.has(p(b)))?.[1] ? l.find(([b]) => !y.has(p(b)))[0] : l[0]?.[0];
    let w = [];
    v && (w = N(p(v)));
    for (const [b, k] of l)
      m.has(b) || w.push({ stepId: b, step: k, children: [] });
    return w;
  }, [t, r, n]), d = (l) => {
    if (r[l]) return r[l];
    const p = l.lastIndexOf(":");
    if (p > 0 && /^\d+$/.test(l.slice(p + 1)))
      return r[l.slice(0, p)];
  };
  function c(l, p) {
    let u = p;
    return l.map((f) => {
      const h = u++, g = /* @__PURE__ */ new Map();
      for (const x of f.children) {
        const m = x.branch ?? "default";
        g.has(m) || g.set(m, []), g.get(m).push(x);
      }
      return /* @__PURE__ */ o(No.Fragment, { children: [
        /* @__PURE__ */ e(
          Zu,
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
        f.children.length > 0 && /* @__PURE__ */ e("div", { className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1", children: Array.from(g.entries()).map(([x, m], N) => /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("div", { className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${N === 0 ? "mt-1" : "mt-2"}`, children: x.replace("-", " ") }),
          c(m, u)
        ] }, x)) })
      ] }, f.stepId);
    });
  }
  return /* @__PURE__ */ o("div", { className: "relative", children: [
    /* @__PURE__ */ e("div", { className: "absolute left-[15px] top-6 bottom-6 w-0.5 bg-border rounded-sm" }),
    c(s, 0)
  ] });
}
const tm = 5e3, nm = "synthetic-";
function rm(t) {
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
function Wn(t, r) {
  return r.timestamp.localeCompare(t.timestamp);
}
function om(t, r) {
  if (r.length === 0) return t.slice().sort(Wn);
  const n = new Set(t.map((s) => s.auditId)), a = /* @__PURE__ */ new Map();
  for (const s of t) {
    const d = a.get(s.action);
    (!d || s.timestamp > d) && a.set(s.action, s.timestamp);
  }
  const i = r.filter((s) => {
    if (n.has(s.auditId)) return !1;
    const d = a.get(s.action);
    return !d || s.timestamp >= d;
  });
  return [...t, ...i].sort(Wn);
}
function am(t, r, n = {}) {
  const { pollMs: a = tm, filters: i } = n, s = _a(), [d, c] = S([]), [l, p] = S([]), [u, f] = S(!0), [h, g] = S(null), [x, m] = S(void 0), [N, y] = S(0), [v, w] = S(!1), b = JSON.stringify({
    since: i?.since,
    until: i?.until,
    actions: i?.actions,
    limit: i?.limit
  });
  ne(() => {
    if (!t || !r) return;
    let R = !1;
    return f(!0), g(null), (async () => {
      try {
        const E = await ir(t, r, i ?? {});
        if (R) return;
        c(E.items), m(E.nextCursor), f(!1);
      } catch (E) {
        if (R) return;
        g(E instanceof Error ? E.message : String(E)), f(!1);
      }
    })(), () => {
      R = !0;
    };
  }, [t, r, b, N]), ne(() => {
    if (!t || !r || a <= 0) return;
    const R = window.setInterval(() => {
      y((E) => E + 1);
    }, a);
    return () => window.clearInterval(R);
  }, [t, r, a]), ne(() => {
    if (!t || !r) return;
    const R = [], E = (j, W) => {
      const ie = rm(j);
      if (!ie) return;
      const Y = W;
      if (Y.runId !== r) return;
      w(!0);
      const te = {
        auditId: `${nm}${j}-${Y.stepId ?? "run"}-${Date.now()}`,
        timestamp: Y.at ?? (/* @__PURE__ */ new Date()).toISOString(),
        action: ie,
        actorUserId: "executor",
        pipelineId: t,
        runId: r,
        trace: W
      };
      p((O) => [te, ...O]);
    }, A = [
      "pipeline.step.started",
      "pipeline.step.completed",
      "pipeline.step.failed",
      "pipeline.step.breakpoint",
      "pipeline.run.completed",
      "pipeline.run.failed",
      "pipeline.run.resumed-from-step",
      "pipeline.approval.recorded"
    ];
    for (const j of A)
      R.push(s.subscribe(j, (W) => E(j, W)));
    return R.push(s.subscribeToRun(r)), () => {
      for (const j of R) j();
    };
  }, [s, t, r]), ne(() => {
    d.length !== 0 && p((R) => {
      if (R.length === 0) return R;
      const E = /* @__PURE__ */ new Map();
      for (const A of d) {
        const j = E.get(A.action);
        (!j || A.timestamp > j) && E.set(A.action, A.timestamp);
      }
      return R.filter((A) => {
        const j = E.get(A.action);
        return !j || A.timestamp >= j;
      });
    });
  }, [d]);
  const k = le(!1), C = D(() => {
    !t || !r || !x || k.current || (k.current = !0, (async () => {
      try {
        const R = await ir(t, r, {
          ...i ?? {},
          cursor: x
        });
        c((E) => {
          const A = new Set(E.map((W) => W.auditId)), j = E.concat(R.items.filter((W) => !A.has(W.auditId)));
          return j.sort(Wn), j;
        }), m(R.nextCursor);
      } catch (R) {
        g(R instanceof Error ? R.message : String(R));
      } finally {
        k.current = !1;
      }
    })());
  }, [t, r, x, b]), T = D(() => {
    y((R) => R + 1);
  }, []);
  return {
    items: q(() => om(d, l), [d, l]),
    loading: u,
    error: h,
    hasMore: !!x,
    loadMore: C,
    liveHealthy: v,
    refresh: T
  };
}
const im = "#3b82f6", sm = "#eab308", lm = "#f97316", ao = "#64748b", cm = "#ef4444", dm = "#a855f7";
function pm(t) {
  return t.action === "pipeline.step.failed" || t.outcome === "error" ? cm : t.action === "pipeline.run.resumed-from-step" || t.action.startsWith("pipeline.step.context.patched") ? dm : t.action.startsWith("pipeline.approval.") ? sm : t.action.startsWith("pipeline.breakpoint.") ? lm : t.action.startsWith("pipeline.step.") ? im : (t.action.startsWith("pipeline.run."), ao);
}
const um = {
  "1h": "Last 1h",
  "24h": "Last 24h",
  all: "All"
}, io = [
  { label: "Steps", matches: (t) => t.startsWith("pipeline.step.") },
  { label: "Approvals", matches: (t) => t.startsWith("pipeline.approval.") || t === "pipeline.approve" || t === "pipeline.reject" },
  { label: "Breakpoints", matches: (t) => t.startsWith("pipeline.breakpoint.") || t === "pipeline.step.breakpoint.hit" },
  { label: "Run lifecycle", matches: (t) => t.startsWith("pipeline.run.") || t === "pipeline.trigger" || t === "pipeline.cancel" },
  { label: "Errors", matches: (t) => t === "pipeline.step.failed" || t === "pipeline.run.failed" || t === "pipeline.force_fail" }
];
function mm(t) {
  if (t === "all") return null;
  const r = Date.now();
  return t === "1h" ? r - 3600 * 1e3 : r - 1440 * 60 * 1e3;
}
function so(t) {
  const r = t.details, n = t.trace, a = r && typeof r.stepId == "string" ? r.stepId : void 0, i = n && typeof n.stepId == "string" ? n.stepId : void 0, s = n && typeof n.nodeId == "string" ? n.nodeId : void 0;
  return a ?? i ?? s;
}
function hm(t, r = Date.now()) {
  const n = Date.parse(t);
  if (!Number.isFinite(n)) return t;
  const a = Math.max(0, Math.floor((r - n) / 1e3));
  if (a < 5) return "just now";
  if (a < 60) return `${a}s ago`;
  const i = Math.floor(a / 60);
  if (i < 60) return `${i}m ago`;
  const s = Math.floor(i / 60);
  return s < 24 ? `${s}h ago` : `${Math.floor(s / 24)}d ago`;
}
function fm({
  pipelineId: t,
  runId: r,
  onStepClick: n
}) {
  const a = am(t, r), { items: i, error: s, hasMore: d, loadMore: c, loading: l } = a, [p, u] = S(/* @__PURE__ */ new Set()), [f, h] = S(""), [g, x] = S("all"), [m, N] = S(/* @__PURE__ */ new Set()), y = D((C) => {
    u((T) => {
      const $ = new Set(T);
      return $.has(C) ? $.delete(C) : $.add(C), $;
    });
  }, []), v = D((C) => {
    N((T) => {
      const $ = new Set(T);
      return $.has(C) ? $.delete(C) : $.add(C), $;
    });
  }, []), w = q(() => {
    const C = mm(g), T = f.trim().toLowerCase(), $ = io.filter((R) => p.has(R.label));
    return i.filter((R) => {
      if ($.length > 0 && !$.some((E) => E.matches(R.action)) || T && !R.actorUserId.toLowerCase().includes(T)) return !1;
      if (C !== null) {
        const E = Date.parse(R.timestamp);
        if (!Number.isFinite(E) || E < C) return !1;
      }
      return !0;
    });
  }, [i, p, f, g]), b = D(() => {
    if (typeof window > "u") return;
    const C = w.map((E) => JSON.stringify(E)).join(`
`) + (w.length > 0 ? `
` : ""), T = new Blob([C], { type: "application/x-ndjson" }), $ = URL.createObjectURL(T), R = document.createElement("a");
    R.href = $, R.download = `executor-log-${r}.ndjson`, document.body.appendChild(R), R.click(), document.body.removeChild(R), URL.revokeObjectURL($);
  }, [w, r]), k = D(
    (C) => {
      if (v(C.auditId), !n || !C.action.startsWith("pipeline.step.")) return;
      const T = so(C);
      T && n(T);
    },
    [n, v]
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
          io.map((C) => {
            const T = p.has(C.label);
            return /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  T ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => y(C.label),
                "data-testid": `executor-log-chip-${C.label.toLowerCase().replace(/\s+/g, "-")}`,
                "aria-pressed": T,
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
              value: f,
              onChange: (C) => h(C.target.value),
              placeholder: "Actor",
              className: "font-[inherit] text-xs px-2 py-1 border border-border-field rounded bg-surface text-text-primary min-w-[120px]",
              "data-testid": "executor-log-actor-input",
              "aria-label": "Filter by actor"
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-border", children: "|" }),
          ["1h", "24h", "all"].map((C) => {
            const T = g === C;
            return /* @__PURE__ */ e(
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
                children: um[C]
              },
              C
            );
          }),
          /* @__PURE__ */ e("div", { className: "flex-1" }),
          /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", children: [
            w.length,
            " of ",
            i.length,
            " shown"
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto px-4 py-3 relative", "data-testid": "executor-log-timeline", children: [
          l && i.length === 0 && /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary p-3", children: "Loading audit rows…" }),
          !l && i.length === 0 && /* @__PURE__ */ e(
            "div",
            {
              className: "px-3 py-6 text-[13px] text-text-secondary text-center leading-relaxed",
              "data-testid": "executor-log-empty",
              children: "Audit log started recording on 2026-05-07 (hub#2224). This run predates that — no rows captured."
            }
          ),
          w.length === 0 && i.length > 0 && /* @__PURE__ */ e(
            "div",
            {
              className: "px-3 py-5 text-xs text-text-tertiary text-center",
              "data-testid": "executor-log-no-matches",
              children: "No audit rows match the current filters."
            }
          ),
          w.map((C) => {
            const T = m.has(C.auditId), R = C.action.startsWith("pipeline.step.") ? so(C) : void 0;
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
                      style: { background: pm(C) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: C.timestamp,
                      children: hm(C.timestamp)
                    }
                  ),
                  /* @__PURE__ */ e("span", { className: "text-text-secondary text-[11px] whitespace-nowrap", children: C.actorUserId }),
                  /* @__PURE__ */ o("span", { className: "text-text-primary flex items-baseline gap-1.5 flex-wrap", children: [
                    /* @__PURE__ */ e("code", { className: "font-mono text-[11px] bg-[#fafbfc] px-1.5 py-px rounded-[3px]", children: C.action }),
                    R && /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", "data-testid": "executor-log-stepid", children: [
                      "· ",
                      R.slice(0, 14),
                      R.length > 14 ? "…" : ""
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
                  T && C.trace && /* @__PURE__ */ e(
                    "pre",
                    {
                      className: "col-[2/span_3] mt-1 p-2 bg-[#fafbfc] border border-border rounded text-[11px] font-mono text-text-secondary overflow-x-auto",
                      "data-testid": "executor-log-trace",
                      onClick: (E) => E.stopPropagation(),
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
            Oe,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => c(),
              children: "Load more"
            }
          ) }) : /* @__PURE__ */ e("span", {}),
          /* @__PURE__ */ e("span", { "data-testid": "executor-log-download", children: /* @__PURE__ */ e(
            Oe,
            {
              variant: "secondary",
              size: "sm",
              onClick: b,
              disabled: w.length === 0,
              children: "Download log"
            }
          ) })
        ] })
      ]
    }
  );
}
function tf() {
  const { pipelineId: t, runId: r } = gt();
  return !t || !r ? /* @__PURE__ */ e(xt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(So, { pipelineId: t, children: /* @__PURE__ */ e(va, { children: /* @__PURE__ */ e(gm, { pipelineId: t, runId: r }) }) });
}
function gm({ pipelineId: t, runId: r }) {
  const n = Be(), a = Ue(), i = bt(), { definition: s } = a, [d, c] = S(null);
  ne(() => {
    let z = !1;
    return import("./usePendingApprovals-BhFuu3qV.js").then((ce) => ce._).then(({ getPipelineRun: ce }) => {
      ce(t, r).then((we) => {
        !z && we && c(we);
      });
    }), () => {
      z = !0;
    };
  }, [t, r]);
  const l = q(() => {
    const z = i.runs[r], ce = d;
    if (!z && !ce) return;
    if (!z) return ce ?? void 0;
    if (!ce) return z;
    const we = Object.keys(z.steps).length, _e = Object.keys(ce.steps).length;
    return we >= _e ? z : { ...ce, status: z.status, currentStepIds: z.currentStepIds };
  }, [i.runs, r, d]);
  Na(r);
  const p = Yu(l ?? null), u = q(() => {
    const z = {};
    if (!s) return z;
    for (const ce of s.nodes)
      z[ce.id] = { type: ce.data.type, data: ce.data };
    return z;
  }, [s]), [f, h] = S(!1), g = le(null);
  ft(g, () => h(!1), f);
  const [x, m] = S("steps"), [N, y] = S(null), v = D((z) => {
    y(z), m("steps");
  }, []), [w, b] = S(null), [k, C] = S(null), [T, $] = S(!1), R = l?.status === "failed" ? l.error?.nodeId : void 0, E = D((z) => {
    if (!l) return;
    const ce = Object.entries(l.steps).filter(([we, _e]) => we !== z && _e.status === "completed").map(([we]) => we);
    b({ nodeId: z, skippedNodes: ce, snapshotInput: !1 }), C(null);
  }, [l]), A = D(async () => {
    if (!(!w || !l)) {
      C(null), $(!0);
      try {
        const z = await To(
          t,
          l.id,
          w.nodeId,
          void 0,
          w.snapshotInput || void 0
        );
        b(null), n(`/pipelines/${t}/runs/${z.newRunId}`);
      } catch (z) {
        C(z instanceof Error ? z.message : String(z)), $(!1);
      }
    }
  }, [w, l, t, n]), [j, W] = S(null), [ie, Y] = S(null), [te, O] = S(null), P = D(async (z) => {
    if (l) {
      Y(null), W(z);
      try {
        const ce = await wa(t, l.id, z);
        O(
          `Resumed from ${z.slice(0, 10)}${z.length > 10 ? "…" : ""} (replay #${ce.replayAttempts})`
        ), setTimeout(() => O(null), 4e3), n(`/pipelines/${t}/runs/${l.id}`);
      } catch (ce) {
        Y(ce instanceof Error ? ce.message : String(ce));
      } finally {
        W(null);
      }
    }
  }, [l, t, n]), H = D(async () => {
    if (!l) {
      try {
        const z = await i.triggerRun(t);
        n(`/pipelines/${t}/runs/${z}`);
      } catch (z) {
        console.error("[PipelineRunReplay] re-run failed", z);
      }
      return;
    }
    try {
      const z = await i.triggerRun(
        t,
        l.triggeredBy.payload
      );
      n(`/pipelines/${t}/runs/${z}`);
    } catch (z) {
      console.error("[PipelineRunReplay] re-run failed", z);
    }
  }, [l, i, t, n]), K = async () => {
    h(!1);
    try {
      await navigator.clipboard?.writeText(r);
    } catch {
    }
  }, U = () => {
    if (h(!1), !l) return;
    const z = JSON.stringify(l, null, 2);
    Dt(`run-${r}.json`, z);
  }, V = () => {
    if (h(!1), !s) return;
    const z = Hn(
      s.id,
      `${s.name} (from run)`
    );
    z && n(`/pipelines/${z.id}`);
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
              mt,
              {
                onClick: () => n(`/pipelines/${t}`),
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
              Oe,
              {
                onClick: () => n(`/pipelines/${t}`),
                children: "Back to pipeline"
              }
            )
          ] })
        ]
      }
    );
  const J = nr(l.status), X = l.triggeredBy.userId ?? l.triggeredBy.triggerType, pe = jt(p);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
      "data-testid": "pipeline-replay",
      children: [
        /* @__PURE__ */ o("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
          /* @__PURE__ */ e(
            mt,
            {
              onClick: () => n(`/pipelines/${t}`),
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
                ht(l.startedAt),
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
                pe
              ]
            }
          ),
          /* @__PURE__ */ e(se, { tone: J.tone, "aria-label": `Status: ${J.label}`, children: J.label }),
          l.status === "failed" && l.error?.errorCategory ? /* @__PURE__ */ e(
            se,
            {
              tone: "danger",
              title: l.error.message || "Error details unavailable",
              children: l.error.errorCategory
            }
          ) : null,
          /* @__PURE__ */ e("div", { className: "flex-1" }),
          R && /* @__PURE__ */ e(
            Oe,
            {
              onClick: () => E(R),
              disabled: T,
              "data-testid": "retry-from-failed-step-button",
              title: `Retry from "${R}" with the original upstream context`,
              children: "↻ Retry from failure"
            }
          ),
          /* @__PURE__ */ e(
            Oe,
            {
              onClick: H,
              "data-testid": "rerun-button",
              title: "Re-run with the original trigger payload",
              children: "↻ Re-run"
            }
          ),
          /* @__PURE__ */ o("div", { className: "relative", ref: g, children: [
            /* @__PURE__ */ e(
              mt,
              {
                onClick: () => h((z) => !z),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            f ? /* @__PURE__ */ o("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: K, children: "Copy runId" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: U, children: "Export run JSON" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: V, children: "Open as new draft" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ e(
          rn,
          {
            open: w !== null,
            onConfirm: A,
            onCancel: () => {
              T || b(null);
            },
            title: "Retry from step",
            confirmLabel: T ? "Starting…" : "Confirm retry",
            confirmDisabled: T,
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
                    onChange: (z) => b((ce) => ce && { ...ce, snapshotInput: z.target.checked }),
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
          k && /* @__PURE__ */ e(Ze, { title: "Retry failed:", className: "mb-4", children: k }),
          ie && /* @__PURE__ */ e(Ze, { title: "Resume failed:", className: "mb-4", "data-testid": "resume-error-banner", children: ie }),
          (l.replayAttempts ?? 0) > 0 && /* @__PURE__ */ e(
            Ze,
            {
              title: "Resumed from a previous failure",
              className: "mb-4",
              "data-testid": "resume-history-banner",
              children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ o("div", { children: [
                  l.error?.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o(G, { children: [
                    "Originally failed at ",
                    /* @__PURE__ */ e("code", { children: l.error.nodeId.slice(0, 12) }),
                    " — "
                  ] }),
                  "Resumed ",
                  l.replayAttempts,
                  " time",
                  l.replayAttempts === 1 ? "" : "s",
                  ".",
                  l.resumeHistory && l.resumeHistory.length > 0 && /* @__PURE__ */ o(G, { children: [
                    " ",
                    "Most recent: from",
                    " ",
                    /* @__PURE__ */ e("code", { children: l.resumeHistory[l.resumeHistory.length - 1].fromNodeId.slice(0, 12) }),
                    " ",
                    "at ",
                    ht(l.resumeHistory[l.resumeHistory.length - 1].at),
                    "."
                  ] })
                ] }),
                l.resumeHistory && l.resumeHistory.length > 1 && /* @__PURE__ */ e(
                  "ol",
                  {
                    className: "m-0 pl-[18px] text-[11px] text-text-tertiary leading-relaxed",
                    "data-testid": "resume-history-timeline",
                    children: l.resumeHistory.map((z, ce) => /* @__PURE__ */ o("li", { children: [
                      "from ",
                      /* @__PURE__ */ e("code", { children: z.fromNodeId.slice(0, 12) }),
                      " at ",
                      ht(z.at)
                    ] }, `${z.fromNodeId}-${z.at}-${ce}`))
                  }
                )
              ] })
            }
          ),
          te && /* @__PURE__ */ e(Ze, { title: "Resumed", className: "mb-4", "data-testid": "resume-toast", children: te }),
          l.error && /* @__PURE__ */ o(Ze, { title: "Run failed:", className: "mb-4", children: [
            l.error.message,
            l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o("span", { className: "ml-2 text-[11px] text-[#b91c1c]", children: [
              "at node ",
              l.error.nodeId.slice(0, 8)
            ] }),
            l.status === "failed" && l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ e("div", { className: "mt-2", children: /* @__PURE__ */ e(
              Oe,
              {
                onClick: () => P(l.error.nodeId),
                disabled: j !== null,
                "data-testid": "resume-from-here-button",
                title: `Resume this run from "${l.error.nodeId}" using its accumulated upstream context`,
                children: j === l.error.nodeId ? "Resuming…" : "↻ Resume from here"
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
                const ce = x === z.id;
                return /* @__PURE__ */ e(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": ce,
                    onClick: () => m(z.id),
                    "data-testid": `run-replay-tab-${z.id}`,
                    className: I(
                      "font-[inherit] text-[13px] font-semibold py-1.5 px-3.5 border-none bg-transparent cursor-pointer -mb-px",
                      ce ? "text-text-primary border-b-2 border-b-primary" : "text-text-tertiary border-b-2 border-b-transparent"
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
              em,
              {
                steps: l.steps,
                nodeDataMap: u,
                edges: s?.edges,
                onRetryFromStep: E,
                onResumeFromStep: l.status === "failed" ? P : void 0
              }
            )
          ) : /* @__PURE__ */ e("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ e(
            fm,
            {
              pipelineId: t,
              runId: r,
              onStepClick: v
            }
          ) })
        ] }) })
      ]
    }
  );
}
function xm(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${Se(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function bm(t) {
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
function ym(t, r) {
  if (!t) return r;
  const n = t.nodes.find((a) => a.id === r);
  return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : r;
}
function vm(t, r) {
  if (!t) return !1;
  const n = t.nodes.find((a) => a.id === r);
  return !!n && n.data.type === "condition";
}
function lo(t) {
  if (!t) return;
  const r = t.output;
  if (r && typeof r == "object" && "result" in r)
    return r.result ? "true" : "false";
}
function Nm(t, r) {
  const n = (h) => h.split(/(\s+)/).filter((g) => g.length > 0), a = n(t), i = n(r), s = a.length, d = i.length, c = Array.from({ length: s + 1 }, () => new Array(d + 1).fill(0));
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
function wm(t, r, n) {
  const a = /* @__PURE__ */ new Set(), i = [];
  if (n)
    for (const s of n.nodes)
      (t.steps[s.id] || r.steps[s.id]) && (i.push(s.id), a.add(s.id));
  for (const s of [...Object.keys(t.steps), ...Object.keys(r.steps)])
    a.has(s) || (i.push(s), a.add(s));
  return i.map((s) => {
    const d = t.steps[s], c = r.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, f = !!d && !!c && d.status !== c.status;
    let h = !1;
    l != null && p != null && l > 0 && (h = Math.abs(p - l) / l > 0.5);
    const g = vm(n, s), x = g ? lo(d) : void 0, m = g ? lo(c) : void 0, N = g && x !== void 0 && m !== void 0 && x !== m;
    return {
      nodeId: s,
      name: ym(n, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: f,
      durationLarge: h,
      branchDiffers: N,
      isLlm: !!(d?.llm || c?.llm),
      isCondition: g,
      branchA: x,
      branchB: m
    };
  });
}
function km(t) {
  if (t.statusDiffers) return "bg-[#fef2f2]";
  if (t.branchDiffers) return "bg-[#eff6ff]";
  if (t.durationLarge) return "bg-[#fffbeb]";
}
function co({
  step: t,
  branch: r,
  isCondition: n
}) {
  if (!t)
    return /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" });
  const a = bm(t.status);
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(se, { tone: a, children: t.status }),
      /* @__PURE__ */ e("span", { className: "font-mono text-text-secondary", children: Se(t.durationMs) }),
      n && r ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        "(",
        r === "true" ? "T" : "F",
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
function Cm({ a: t, b: r }) {
  const n = q(() => Nm(t, r), [t, r]);
  return /* @__PURE__ */ e(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: n.map((a, i) => a.type === "eq" ? /* @__PURE__ */ e("span", { children: a.text }, i) : a.type === "add" ? /* @__PURE__ */ e("span", { "data-diff": "add", className: "bg-[#dcfce7] text-[#166534]", children: a.text }, i) : /* @__PURE__ */ e("span", { "data-diff": "del", className: "bg-[#fee2e2] text-[#991b1b] line-through", children: a.text }, i))
    }
  );
}
function Im({ row: t }) {
  const r = t.a?.llm, n = t.b?.llm, a = r && n ? n.tokensIn + n.tokensOut - (r.tokensIn + r.tokensOut) : void 0, i = km(t);
  return /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ o("tr", { "data-testid": `run-compare-row-${t.nodeId}`, className: i, children: [
      /* @__PURE__ */ o("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-text-primary", children: t.name }),
        /* @__PURE__ */ e("div", { className: "font-mono text-[11px] text-text-tertiary", children: t.nodeId })
      ] }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ e(co, { step: t.a, branch: t.branchA, isCondition: t.isCondition }) }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ e(co, { step: t.b, branch: t.branchB, isCondition: t.isCondition }) }),
      /* @__PURE__ */ o(
        "td",
        {
          className: I("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", i),
          "data-testid": `run-compare-delta-${t.nodeId}`,
          children: [
            t.branchDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#2563eb]", children: "different branch!" }) : t.statusDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#dc2626]", children: "status differs" }) : t.durationDelta != null ? /* @__PURE__ */ e("span", { className: t.durationLarge ? "text-[#d97706]" : "text-text-secondary", children: xm(t.durationDelta) }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "—" }),
            a != null && a !== 0 ? /* @__PURE__ */ o("div", { className: "mt-0.5 text-[11px] text-text-tertiary", children: [
              a > 0 ? "+" : "",
              a,
              "tok"
            ] }) : null
          ]
        }
      )
    ] }),
    t.isLlm && (r || n) ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e("td", { className: "border-b border-border p-0", colSpan: 4, children: /* @__PURE__ */ o("details", { className: "bg-surface-inset px-3.5 py-2.5", children: [
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
              children: r?.response ?? "(no response)"
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
              children: n?.response ?? "(no response)"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ o("div", { className: "mt-2.5", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Word-level diff" }),
        /* @__PURE__ */ e("div", { className: "mt-1.5", children: /* @__PURE__ */ e(
          Cm,
          {
            a: r?.response ?? "",
            b: n?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function Sm({ runA: t, runB: r, def: n }) {
  const a = q(() => wm(t, r, n), [t, r, n]);
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
        /* @__PURE__ */ e("tbody", { children: a.map((i) => /* @__PURE__ */ e(Im, { row: i }, i.nodeId)) })
      ]
    }
  );
}
function $m(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${Se(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function Tm(t) {
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
function Am(t) {
  const r = /* @__PURE__ */ new Map();
  if (!t) return r;
  for (const n of t.nodes)
    n.data.type === "llm" && r.set(n.id, n.data.model);
  return r;
}
function po(t, r) {
  const n = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
    model: r.get(a.nodeId),
    tokensIn: a.llm?.tokensIn ?? 0,
    tokensOut: a.llm?.tokensOut ?? 0
  }));
  return jt(vt(n).total);
}
function uo({
  label: t,
  run: r,
  cost: n,
  testIdPrefix: a
}) {
  const i = Tm(r.status);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
      "data-testid": `${a}-summary`,
      children: [
        /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: t }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-tertiary", children: r.id.slice(0, 8) }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "text-text-secondary", children: ht(r.startedAt) })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(se, { tone: i, children: r.status }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", children: Se(r.durationMs) }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", "data-testid": `${a}-cost`, children: n })
        ] })
      ]
    }
  );
}
function nf() {
  const { pipelineId: t, runIdA: r, runIdB: n } = gt(), a = Be(), i = q(
    () => t ? ot(t) : null,
    [t]
  ), s = q(
    () => t && r ? nn(t, r) : null,
    [t, r]
  ), d = q(
    () => t && n ? nn(t, n) : null,
    [t, n]
  ), c = q(() => Am(i), [i]);
  if (!t || !r || !n)
    return /* @__PURE__ */ e(xt, { to: "/pipelines", replace: !0 });
  if (!i)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      ze,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => a("/pipelines")
      }
    ) });
  if (!s || !d)
    return /* @__PURE__ */ e("div", { className: "p-8", "data-testid": "run-compare-missing", children: /* @__PURE__ */ e(
      ze,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable — they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => a(`/pipelines/${t}/runs`)
      }
    ) });
  const l = (d.durationMs ?? 0) - (s.durationMs ?? 0), p = po(s, c), u = po(d, c), f = (/* @__PURE__ */ new Set([
    ...Object.keys(s.steps),
    ...Object.keys(d.steps)
  ])).size;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-4 p-6 text-text-primary", "data-testid": "run-compare", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => a(`/pipelines/${t}/runs`),
          className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
          children: [
            "← ",
            i.name
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
      /* @__PURE__ */ e(uo, { label: "Run A", run: s, cost: p, testIdPrefix: "run-a" }),
      /* @__PURE__ */ e(uo, { label: "Run B", run: d, cost: u, testIdPrefix: "run-b" })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
        "data-testid": "run-compare-delta",
        children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Δ duration" }),
          /* @__PURE__ */ e("span", { className: "font-mono text-[13px]", children: $m(l) }),
          /* @__PURE__ */ e("span", { className: "flex-1" }),
          /* @__PURE__ */ o("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
            f,
            " step",
            f === 1 ? "" : "s",
            " compared"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e(Sm, { runA: s, runB: d, def: i })
  ] });
}
function Rm(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${Se(Math.abs(t))}`;
}
function mo(t) {
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
function Pm({
  runA: t,
  runB: r,
  costA: n,
  costB: a
}) {
  const i = t.durationMs ?? 0, d = (r.durationMs ?? 0) - i;
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
              /* @__PURE__ */ e(se, { tone: mo(t.status), children: t.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: ht(t.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              Se(t.durationMs),
              " | ",
              n
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
              /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-tertiary", children: r.id.slice(0, 8) }),
              /* @__PURE__ */ e(se, { tone: mo(r.status), children: r.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: ht(r.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              Se(r.durationMs),
              " | ",
              a
            ] }),
            /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary", children: [
              "Trigger: ",
              r.triggeredBy.userId ?? r.triggeredBy.triggerType
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
              children: Rm(d)
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
function Mm(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${Se(Math.abs(t))}`;
}
function ho(t) {
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
function Em(t, r) {
  if (!t) return r;
  const n = t.nodes.find((a) => a.id === r);
  return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : r;
}
function Dm(t, r, n) {
  const a = /* @__PURE__ */ new Set(), i = [];
  if (n)
    for (const s of n.nodes)
      (t.steps[s.id] || r.steps[s.id]) && (i.push(s.id), a.add(s.id));
  for (const s of [...Object.keys(t.steps), ...Object.keys(r.steps)])
    a.has(s) || (i.push(s), a.add(s));
  return i.map((s) => {
    const d = t.steps[s], c = r.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, f = !!d && !!c && d.status !== c.status, h = !!d && !c, g = !d && !!c, x = d?.llm ? d.llm.tokensIn + d.llm.tokensOut : void 0, m = c?.llm ? c.llm.tokensIn + c.llm.tokensOut : void 0, N = x != null && m != null ? m - x : void 0;
    return {
      nodeId: s,
      name: Em(n, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: f,
      onlyInA: h,
      onlyInB: g,
      tokenDelta: N
    };
  });
}
function Om({ runA: t, runB: r, def: n }) {
  const a = q(() => Dm(t, r, n), [t, r, n]);
  return /* @__PURE__ */ o("table", { className: "w-full border-collapse text-[13px]", children: [
    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { children: [
      /* @__PURE__ */ e("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Step" }),
      /* @__PURE__ */ e("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run A" }),
      /* @__PURE__ */ e("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run B" }),
      /* @__PURE__ */ e("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Delta" })
    ] }) }),
    /* @__PURE__ */ e("tbody", { children: a.map((i) => /* @__PURE__ */ o(
      "tr",
      {
        className: I(
          i.onlyInA || i.onlyInB ? "bg-[#fefce8]" : i.statusDiffers ? "bg-[#fef2f2]" : void 0
        ),
        "data-testid": `diff-step-row-${i.nodeId}`,
        children: [
          /* @__PURE__ */ o("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: [
            /* @__PURE__ */ e("div", { className: "font-semibold", children: i.name }),
            /* @__PURE__ */ e("div", { className: "font-mono text-[10px] text-text-tertiary", children: i.nodeId }),
            i.onlyInA && /* @__PURE__ */ e(se, { tone: "warning", size: "xs", children: "only in A" }),
            i.onlyInB && /* @__PURE__ */ e(se, { tone: "warning", size: "xs", children: "only in B" })
          ] }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: i.a ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(se, { tone: ho(i.a.status), children: i.a.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: Se(i.a.durationMs) }),
            i.a.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              i.a.llm.tokensIn,
              " in / ",
              i.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: i.b ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(se, { tone: ho(i.b.status), children: i.b.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: Se(i.b.durationMs) }),
            i.b.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              i.b.llm.tokensIn,
              " in / ",
              i.b.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ o("td", { className: "border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", children: [
            i.statusDiffers && /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-[#dc2626]", children: "status differs" }),
            i.durationDelta != null && /* @__PURE__ */ e(
              "div",
              {
                className: I(
                  "text-xs",
                  i.durationDelta === 0 ? "text-text-tertiary" : i.durationDelta < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
                ),
                children: Mm(i.durationDelta)
              }
            ),
            i.tokenDelta != null && i.tokenDelta !== 0 && /* @__PURE__ */ o(
              "div",
              {
                className: I(
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
            i.durationDelta == null && !i.statusDiffers && /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "--" })
          ] })
        ]
      },
      i.nodeId
    )) })
  ] });
}
function _m(t, r) {
  if (!t) return r;
  const n = t.nodes.find((a) => a.id === r);
  return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : r;
}
function on(t, r = "", n = 0) {
  const a = /* @__PURE__ */ new Map();
  if (n > 6 || t == null)
    return a.set(r || "(root)", String(t)), a;
  if (typeof t != "object")
    return a.set(r || "(root)", JSON.stringify(t)), a;
  if (Array.isArray(t)) {
    if (t.length === 0)
      a.set(r || "(root)", "[]");
    else
      for (let s = 0; s < t.length; s++) {
        const d = r ? `${r}.${s}` : String(s);
        for (const [c, l] of on(t[s], d, n + 1))
          a.set(c, l);
      }
    return a;
  }
  const i = Object.entries(t);
  if (i.length === 0)
    a.set(r || "(root)", "{}");
  else
    for (const [s, d] of i) {
      const c = r ? `${r}.${s}` : s;
      for (const [l, p] of on(d, c, n + 1))
        a.set(l, p);
    }
  return a;
}
function Qo(t, r) {
  const n = on(t), a = on(r), i = /* @__PURE__ */ new Set([...n.keys(), ...a.keys()]), s = [];
  for (const c of i) {
    const l = n.get(c), p = a.get(c);
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
const Lm = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function Bm({
  nodeId: t,
  name: r,
  outputA: n,
  outputB: a
}) {
  const [i, s] = S(!1), d = q(() => Qo(n, a), [n, a]), c = d.filter((l) => l.type !== "unchanged").length;
  return c === 0 ? /* @__PURE__ */ o("div", { className: "rounded-md bg-surface-inset px-3 py-2", children: [
    /* @__PURE__ */ e("span", { className: "text-xs font-semibold", children: r }),
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
            onClick: () => s(!i),
            children: [
              /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: i ? "▼" : "▶" }),
              /* @__PURE__ */ e("span", { className: "text-xs font-semibold", children: r }),
              /* @__PURE__ */ e("span", { className: "font-mono text-[10px] text-text-tertiary", children: t }),
              /* @__PURE__ */ o(se, { tone: "warning", size: "xs", className: "ml-auto", children: [
                c,
                " difference",
                c === 1 ? "" : "s"
              ] })
            ]
          }
        ),
        i && /* @__PURE__ */ e("div", { className: "flex flex-col gap-0.5 px-3 py-2", children: d.filter((l) => l.type !== "unchanged").map((l, p) => /* @__PURE__ */ o(
          "div",
          {
            className: I(
              "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
              Lm[l.type]
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
function Um({ runA: t, runB: r, def: n }) {
  const a = q(() => {
    const i = /* @__PURE__ */ new Set(), s = [];
    if (n)
      for (const d of n.nodes) {
        const c = t.steps[d.id]?.output != null, l = r.steps[d.id]?.output != null;
        (c || l) && (s.push(d.id), i.add(d.id));
      }
    for (const d of [...Object.keys(t.steps), ...Object.keys(r.steps)]) {
      if (i.has(d)) continue;
      const c = t.steps[d]?.output != null, l = r.steps[d]?.output != null;
      (c || l) && (s.push(d), i.add(d));
    }
    return s;
  }, [t, r, n]);
  return a.length === 0 ? /* @__PURE__ */ e("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "No step outputs to compare." }) : /* @__PURE__ */ e("div", { className: "flex flex-col gap-3", children: a.map((i) => /* @__PURE__ */ e(
    Bm,
    {
      nodeId: i,
      name: _m(n, i),
      outputA: t.steps[i]?.output,
      outputB: r.steps[i]?.output
    },
    i
  )) });
}
function Fm(t) {
  const r = /* @__PURE__ */ new Map();
  if (!t) return r;
  for (const n of t.nodes)
    n.data.type === "llm" && r.set(n.id, n.data.model);
  return r;
}
function fo(t, r) {
  const n = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
    model: r.get(a.nodeId),
    tokensIn: a.llm?.tokensIn ?? 0,
    tokensOut: a.llm?.tokensOut ?? 0
  }));
  return jt(vt(n).total);
}
function Zt({
  title: t,
  defaultOpen: r = !0,
  badge: n,
  children: a,
  testId: i
}) {
  const [s, d] = S(r);
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
              /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: s ? "▼" : "▶" }),
              /* @__PURE__ */ e("span", { className: "text-[13px] font-bold text-text-primary", children: t }),
              n && /* @__PURE__ */ e(se, { tone: "info", className: "ml-auto", children: n })
            ]
          }
        ),
        s && /* @__PURE__ */ e("div", { className: "p-4", children: a })
      ]
    }
  );
}
const jm = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function zm({
  runA: t,
  runB: r
}) {
  const n = q(
    () => Qo(t.context, r.context),
    [t.context, r.context]
  ), a = n.filter((i) => i.type !== "unchanged").length;
  return /* @__PURE__ */ e(
    Zt,
    {
      title: "Context evolution diff",
      defaultOpen: !1,
      badge: a > 0 ? `${a} difference${a === 1 ? "" : "s"}` : void 0,
      testId: "diff-context-section",
      children: a === 0 ? /* @__PURE__ */ e("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "Final contexts are identical." }) : /* @__PURE__ */ e("div", { className: "flex flex-col gap-0.5", children: n.map((i, s) => /* @__PURE__ */ o(
        "div",
        {
          className: I(
            "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
            jm[i.type]
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
              /* @__PURE__ */ e("span", { className: "line-through opacity-70", children: i.valueA }),
              " -> ",
              /* @__PURE__ */ e("span", { className: "font-semibold", children: i.valueB })
            ] }),
            i.type === "added" && /* @__PURE__ */ e("span", { children: i.valueB }),
            i.type === "removed" && /* @__PURE__ */ e("span", { children: i.valueA }),
            i.type === "unchanged" && /* @__PURE__ */ e("span", { className: "opacity-50", children: i.valueA })
          ]
        },
        `${i.key}-${s}`
      )) })
    }
  );
}
function qm({ pipelineId: t, runIdA: r, runIdB: n }) {
  const a = Be(), i = q(
    () => ot(t),
    [t]
  ), s = q(
    () => nn(t, r),
    [t, r]
  ), d = q(
    () => nn(t, n),
    [t, n]
  ), c = q(() => Fm(i), [i]);
  if (!i)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      ze,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => a("/pipelines")
      }
    ) });
  if (!s || !d)
    return /* @__PURE__ */ e("div", { className: "p-8", "data-testid": "diff-run-missing", children: /* @__PURE__ */ e(
      ze,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable -- they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => a(`/pipelines/${t}/runs`)
      }
    ) });
  const l = fo(s, c), p = fo(d, c);
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
              onClick: () => a(`/pipelines/${t}/runs`),
              className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
              children: [
                "← ",
                i.name
              ]
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "/" }),
          /* @__PURE__ */ e("span", { className: "text-lg font-bold text-text-primary", children: "Diff view" }),
          /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
            r.slice(0, 8),
            " vs ",
            n.slice(0, 8)
          ] })
        ] }),
        /* @__PURE__ */ e(Zt, { title: "Summary", testId: "diff-summary-section", children: /* @__PURE__ */ e(
          Pm,
          {
            runA: s,
            runB: d,
            costA: l,
            costB: p
          }
        ) }),
        /* @__PURE__ */ e(
          Zt,
          {
            title: "Step-by-step comparison",
            badge: `${Object.keys(s.steps).length + Object.keys(d.steps).length > 0 ? "steps" : "0 steps"}`,
            testId: "diff-steps-section",
            children: /* @__PURE__ */ e(Om, { runA: s, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ e(
          Zt,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ e(Um, { runA: s, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ e(zm, { runA: s, runB: d })
      ]
    }
  );
}
function rf() {
  const { pipelineId: t } = gt(), [r] = an(), n = r.get("a"), a = r.get("b");
  return !t || !n || !a ? /* @__PURE__ */ e(xt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(qm, { pipelineId: t, runIdA: n, runIdB: a });
}
function of() {
  const t = Be(), [r, n] = an(), [a, i] = S([]), { runs: s } = bt();
  ne(() => {
    let v = !1;
    return (async () => {
      const w = sr(), b = [];
      await Promise.all(
        w.map(async (k) => {
          try {
            const { runs: C } = await Io(k.id, { limit: 50 });
            if (C.length > 0) {
              for (const T of C)
                T.id && b.push({ ...T, pipelineName: k.name });
              return;
            }
          } catch {
          }
          for (const C of tn(k.id))
            C.id && b.push({ ...C, pipelineName: k.name });
        })
      ), !v && (b.sort((k, C) => C.startedAt.localeCompare(k.startedAt)), i(b));
    })(), () => {
      v = !0;
    };
  }, []);
  const d = q(() => {
    const v = new Map(sr().map((k) => [k.id, k.name])), w = new Set(a.map((k) => k.id)), b = [];
    for (const [k, C] of Object.entries(s))
      w.has(k) || C.pipelineId && b.push({
        ...C,
        pipelineName: v.get(C.pipelineId) ?? `Pipeline ${C.pipelineId.slice(0, 8)}`
      });
    return b.length === 0 ? a : [...b, ...a].sort((k, C) => C.startedAt.localeCompare(k.startedAt));
  }, [a, s]), { query: c, statuses: l, triggerKinds: p, range: u } = q(
    () => Yo(r),
    [r]
  ), f = (v, w) => {
    const b = new URLSearchParams(r);
    w ? b.set(v, w) : b.delete(v), n(b, { replace: !0 });
  }, h = (v) => {
    const w = new Set(l);
    w.has(v) ? w.delete(v) : w.add(v), f("status", w.size === 0 ? null : Array.from(w).join(","));
  }, g = (v) => {
    const w = new Set(p);
    w.has(v) ? w.delete(v) : w.add(v), f("trigger", w.size === 0 ? null : Array.from(w).join(","));
  }, x = (v) => {
    f("range", v === "7d" ? null : v);
  }, m = (v) => {
    f("q", v.length === 0 ? null : v);
  }, N = q(
    () => Ko(d, { query: c, statuses: l, triggerKinds: p, range: u }),
    [d, c, l, p, u]
  ), y = q(() => {
    const v = {};
    for (const w of N) {
      const b = Object.values(w.steps).filter((C) => !!C.llm).map((C) => ({
        model: void 0,
        tokensIn: C.llm?.tokensIn ?? 0,
        tokensOut: C.llm?.tokensOut ?? 0
      })), k = vt(b);
      k.total.totalCostUsd > 0 && (v[w.id] = jt(k.total));
    }
    return v;
  }, [N]);
  return /* @__PURE__ */ o("div", { "data-testid": "all-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ e("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Runs" }),
      /* @__PURE__ */ o("span", { className: "text-[13px] text-text-tertiary", children: [
        N.length,
        " run",
        N.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ e(
      Xo,
      {
        query: c,
        onQueryChange: m,
        statuses: l,
        onStatusToggle: h,
        triggerKinds: p,
        onTriggerToggle: g,
        range: u,
        onRangeChange: x,
        onClearFilters: () => n(new URLSearchParams(), { replace: !0 })
      }
    ),
    N.length === 0 ? /* @__PURE__ */ e(
      ze,
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
      /* @__PURE__ */ e("tbody", { children: N.map((v) => /* @__PURE__ */ o(
        "tr",
        {
          onClick: () => t(`/pipelines/${v.pipelineId}/runs/${v.id}`),
          className: "border-b border-border cursor-pointer hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-medium", children: v.pipelineName }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: v.id.slice(0, 11) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ e(se, { tone: nr(v.status).tone, size: "sm", children: v.status }) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: v.triggerType ?? v.triggeredBy?.triggerType }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: Op(v.startedAt) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: v.completedAt ? Se(new Date(v.completedAt).getTime() - new Date(v.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: y[v.id] ?? "—" })
          ]
        },
        v.id
      )) })
    ] }) })
  ] });
}
function Zo(t) {
  let r = 0, n = 0;
  for (const a of Object.values(t.steps ?? {}))
    a.llm && (r += a.llm.tokensIn ?? 0, n += a.llm.tokensOut ?? 0);
  return { tokensIn: r, tokensOut: n };
}
function Vm(t) {
  const r = /* @__PURE__ */ new Map();
  if (!t) return r;
  for (const n of t.nodes)
    n.data.type === "llm" && r.set(n.id, n.data.model);
  return r;
}
function Wm(t, r) {
  const n = [];
  for (const a of Object.values(t.steps ?? {}))
    a.llm && n.push({
      model: r.get(a.nodeId),
      tokensIn: a.llm.tokensIn,
      tokensOut: a.llm.tokensOut
    });
  return vt(n).total.totalCostUsd;
}
function go(t, r) {
  if (t.length === 0) return 0;
  const n = Math.min(t.length - 1, Math.floor(t.length * r));
  return t[n];
}
function xo(t) {
  return t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function bo(t) {
  const r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(r) ? `$${r.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function Jm(t) {
  return t.slice(0, 8);
}
function Hm(t) {
  const r = Date.now() - new Date(t).getTime();
  return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 2592e5 ? `${Math.floor(r / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Gm(t, r) {
  const n = t.length;
  let a = 0, i = 0, s = 0;
  const d = [];
  let c = 0, l = 0, p = 0;
  const u = /* @__PURE__ */ new Map();
  for (const m of t) {
    m.status === "completed" ? a++ : m.status === "failed" ? i++ : m.status === "cancelled" && s++, typeof m.durationMs == "number" && m.durationMs > 0 && d.push(m.durationMs);
    const N = Zo(m);
    if (c += N.tokensIn, l += N.tokensOut, p += Wm(m, r), m.error?.message) {
      const y = m.error.message.slice(0, 48), v = u.get(y);
      v ? (v.count += 1, m.startedAt > v.lastSeenAt && (v.lastSeenAt = m.startedAt, v.exampleRunId = m.id)) : u.set(y, { count: 1, lastSeenAt: m.startedAt, exampleRunId: m.id });
    }
  }
  d.sort((m, N) => m - N);
  const f = go(d, 0.5), h = go(d, 0.95), g = n === 0 ? 0 : Math.round(a / n * 100), x = [...u.entries()].map(([m, N]) => ({ key: m, count: N.count, lastSeenAt: N.lastSeenAt, exampleRunId: N.exampleRunId })).sort((m, N) => N.count - m.count).slice(0, 5);
  return {
    totalCount: n,
    completedCount: a,
    failedCount: i,
    cancelledCount: s,
    successRatePct: g,
    medianMs: f,
    p95Ms: h,
    tokensIn: c,
    tokensOut: l,
    tokensPerRun: n === 0 ? 0 : Math.round((c + l) / n),
    totalCost: p,
    costPerRun: n === 0 ? 0 : p / n,
    failureBreakdown: x
  };
}
function Km(t) {
  return t >= 90 ? "#16a34a" : t >= 70 ? "#f59e0b" : "#dc2626";
}
function Ym(t) {
  const r = [...t].sort((l, p) => l.startedAt.localeCompare(p.startedAt)), n = [], a = [], i = [];
  let s = 0, d = 0, c = 0;
  for (const l of r) {
    const p = new Date(l.startedAt).getTime();
    l.status === "completed" ? s += 1 : l.status === "failed" ? d += 1 : l.status === "cancelled" && (c += 1), n.push({ x: p, y: s }), a.push({ x: p, y: d }), i.push({ x: p, y: c });
  }
  return [
    { label: "Completed", data: n, color: "#16a34a" },
    { label: "Failed", data: a, color: "#dc2626" },
    { label: "Cancelled", data: i, color: "#d1d5db" }
  ];
}
function Xm(t, r) {
  const a = [...t].sort((s, d) => s.startedAt.localeCompare(d.startedAt)).filter((s) => typeof s.durationMs == "number" && s.durationMs > 0).map((s) => ({ x: new Date(s.startedAt).getTime(), y: s.durationMs })), i = a.map((s) => ({ x: s.x, y: r }));
  return [
    { label: "Duration (ms)", data: a, color: "#646cff" },
    { label: "p50", data: i, color: "#94a3b8" }
  ];
}
function Qm(t) {
  const r = [...t].sort((i, s) => i.startedAt.localeCompare(s.startedAt)), n = [], a = [];
  for (const i of r) {
    const s = new Date(i.startedAt).getTime(), { tokensIn: d, tokensOut: c } = Zo(i);
    n.push({ x: s, y: d }), a.push({ x: s, y: c });
  }
  return [
    { label: "Tokens in", data: n, color: "#646cff" },
    { label: "Tokens out", data: a, color: "#16a34a" }
  ];
}
function af() {
  const { pipelineId: t } = gt(), r = Be(), [n, a] = S(null), [i, s] = S([]), [d, c] = S("50");
  ne(() => {
    t && (a(ot(t)), s(tn(t)));
  }, [t]);
  const l = q(() => {
    if (d === "all") return i;
    const m = Number(d);
    return i.slice(0, m);
  }, [i, d]), p = q(() => Vm(n), [n]), u = q(() => Gm(l, p), [l, p]), f = q(
    () => Ou(l, n).filter((m) => m.totalCostUsd > 0 || m.stepCount > 0),
    [l, n]
  ), h = q(() => Bu(i, n, 30), [i, n]), g = q(
    () => [
      {
        label: "Daily spend",
        data: h.map((m) => ({ x: m.ts, y: m.totalCostUsd })),
        color: "#646cff"
      }
    ],
    [h]
  );
  if (!t) return /* @__PURE__ */ e(xt, { to: "/pipelines", replace: !0 });
  if (!n)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      ze,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => r("/pipelines")
      }
    ) });
  const x = l.length > 0;
  return /* @__PURE__ */ o("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => r(`/pipelines/${t}`),
          className: "bg-transparent border-none text-primary cursor-pointer text-[13px] p-0",
          children: [
            "← ",
            n.name
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
          children: ["10", "50", "all"].map((m) => /* @__PURE__ */ e(
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
    x ? /* @__PURE__ */ o(G, { children: [
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
                  style: { color: Km(u.successRatePct) },
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
              /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: Se(u.medianMs) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                "p95 · ",
                Se(u.p95Ms)
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
              /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: xo(u.totalCost) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                xo(u.costPerRun),
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
              f.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary py-2", children: "No per-node cost data in this range." }) : /* @__PURE__ */ e(
                Ba,
                {
                  data: f.map((m) => ({
                    label: m.label,
                    cost: Number(m.totalCostUsd.toFixed(6))
                  })),
                  xKey: "label",
                  yKey: "cost",
                  height: 200,
                  color: "#646cff",
                  yFormat: bo
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-trend-30d", children: [
              /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "30-day spend trend" }),
              /* @__PURE__ */ e(
                qt,
                {
                  series: g,
                  height: 200,
                  xFormat: (m) => new Date(Number(m)).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric"
                  }),
                  yFormat: bo
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
            qt,
            {
              series: Ym(l),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString()
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Duration over time" }),
          /* @__PURE__ */ e(
            qt,
            {
              series: Xm(l, u.medianMs),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString(),
              yFormat: (m) => Se(m)
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Token usage over time" }),
          /* @__PURE__ */ e(
            qt,
            {
              series: Qm(l),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString(),
              yFormat: (m) => m.toLocaleString()
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-failure-breakdown", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Failure breakdown (top 5)" }),
          u.failureBreakdown.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary py-2", children: "No failures in this range." }) : /* @__PURE__ */ o("table", { className: "w-full border-collapse text-xs", children: [
            /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { className: "text-left", children: ["Error", "Count", "Last seen", "Example"].map((m) => /* @__PURE__ */ e(
              "th",
              {
                className: "px-2 py-1.5 text-[10px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
                children: m
              },
              m
            )) }) }),
            /* @__PURE__ */ e("tbody", { children: u.failureBreakdown.map((m) => /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ e(
                "td",
                {
                  className: "px-2 py-1.5 text-text-primary max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap",
                  title: m.key,
                  children: m.key
                }
              ),
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5 font-mono text-text-primary", children: m.count }),
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5 text-text-secondary", children: Hm(m.lastSeenAt) }),
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => r(`/pipelines/${t}/runs/${m.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    Jm(m.exampleRunId),
                    " →"
                  ]
                }
              ) })
            ] }, m.key)) })
          ] })
        ] })
      ] })
    ] }) : /* @__PURE__ */ e(
      ze,
      {
        icon: "📊",
        title: "No runs yet",
        body: "No runs yet. Trigger this pipeline to see stats."
      }
    )
  ] });
}
function Zm(t) {
  const r = new Date(t).getTime();
  if (!Number.isFinite(r) || r <= 0) return "—";
  const n = Math.floor((Date.now() - r) / 1e3);
  if (n < 10) return "just now";
  if (n < 60) return `${n}s ago`;
  const a = Math.floor(n / 60);
  if (a < 60) return `${a}m ago`;
  const i = Math.floor(a / 60);
  return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
}
function eh(t) {
  return t.length <= 6 ? t : t.slice(-6);
}
function th({ approver: t, idx: r }) {
  const n = t.type === "role" ? "🎖" : "👤";
  return /* @__PURE__ */ o(
    "span",
    {
      className: "inline-flex items-center gap-1 bg-info-bg text-info-fg px-2 py-0.5 rounded-sm text-[11px] font-semibold leading-[1.4] whitespace-nowrap",
      children: [
        /* @__PURE__ */ e("span", { "aria-hidden": !0, children: n }),
        /* @__PURE__ */ e("span", { children: t.value })
      ]
    },
    `${t.type}:${t.value}:${r}`
  );
}
function nh(t, r) {
  const n = [];
  if (t) {
    const a = t.steps;
    for (const [i, s] of Object.entries(t))
      i === "steps" || s == null || s === "" || (typeof s == "string" ? n.push({ label: i, value: s }) : typeof s == "object" && n.push({ label: i, value: JSON.stringify(s, null, 2) }));
    if (a && typeof a == "object")
      for (const [i, s] of Object.entries(a)) {
        if (s == null) continue;
        const d = s;
        typeof d.response == "string" && d.response.trim() && n.push({ label: `Step ${i.slice(0, 8)} response`, value: d.response });
      }
  }
  if (n.length === 0 && r)
    for (const [a, i] of Object.entries(r)) {
      const s = i.output;
      if (s)
        for (const [d, c] of Object.entries(s))
          c == null || c === "" || d === "tokensIn" || d === "tokensOut" || typeof c == "string" && c.trim() && n.push({ label: d, value: c });
    }
  return n;
}
function rh({ row: t, onSubmit: r, onOpenPipeline: n }) {
  const [a, i] = S(""), s = D(
    (p) => {
      r(p, a.trim()), i("");
    },
    [a, r]
  ), d = t.requiredCount ?? 1, c = t.recordedCount ?? 0, l = q(() => nh(t.runContext, t.runSteps), [t.runContext, t.runSteps]);
  return /* @__PURE__ */ o("div", { "data-testid": `approval-card-${t.runId}`, className: "flex flex-col gap-3 p-4 bg-surface border border-border rounded-[10px]", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2.5 min-w-0", children: [
        /* @__PURE__ */ e("span", { className: "text-lg", "aria-hidden": !0, children: "✋" }),
        /* @__PURE__ */ o("div", { className: "min-w-0", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: n,
              "data-testid": `open-pipeline-${t.pipelineId}`,
              className: "text-sm font-semibold text-text-primary bg-transparent border-none p-0 cursor-pointer font-[inherit] text-left overflow-hidden text-ellipsis whitespace-nowrap max-w-full",
              title: t.pipelineName,
              children: t.pipelineName
            }
          ),
          /* @__PURE__ */ o("div", { className: "font-mono text-[11px] text-text-tertiary", children: [
            "run #",
            eh(t.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: Zm(t.requestedAt) })
    ] }),
    t.message ? /* @__PURE__ */ e("div", { "data-testid": `approval-message-${t.runId}`, className: "text-[13px] text-text-secondary bg-[#fafbfc] px-3 py-2 rounded-md leading-normal", children: t.message }) : null,
    /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5 px-3 py-2.5 bg-[#fafbfc] rounded-md border border-border", children: [
      /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: l.length > 0 ? "Context" : "Run details" }),
      l.length > 0 ? l.map(({ label: p, value: u }) => /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-medium text-text-secondary", children: p }),
        /* @__PURE__ */ e("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: u })
      ] }, p)) : /* @__PURE__ */ o(G, { children: [
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
      t.approvers.length === 0 ? /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : t.approvers.map((p, u) => /* @__PURE__ */ e(th, { approver: p, idx: u }, u)),
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
        value: a,
        onChange: (p) => i(p.target.value),
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
function sf() {
  const t = Be(), { approvals: r, isLoading: n, error: a, retry: i } = ka(), { resolveApproval: s, runs: d } = bt(), [c, l] = S(
    () => /* @__PURE__ */ new Set()
  );
  ne(() => {
    if (c.size === 0) return;
    const m = new Set(r.map((v) => `${v.runId}::${v.stepId}`));
    let N = !1;
    const y = new Set(c);
    for (const v of c)
      m.has(v) || (y.delete(v), N = !0);
    N && l(y);
  }, [r, c]);
  const [p, u] = S({}), f = le(/* @__PURE__ */ new Set());
  ne(() => {
    for (const m of r)
      f.current.has(m.runId) || (f.current.add(m.runId), Ca(m.pipelineId, m.runId).then((N) => {
        N && u((y) => ({
          ...y,
          [m.runId]: { context: N.context, steps: N.steps }
        }));
      }));
  }, [r]);
  const h = q(() => {
    const m = /* @__PURE__ */ new Map(), N = [];
    for (const y of r) {
      const v = `${y.runId}::${y.stepId}`;
      if (c.has(v)) continue;
      let w = m.get(y.pipelineId);
      w === void 0 && (w = ot(y.pipelineId), m.set(y.pipelineId, w));
      const b = w?.name ?? (y.pipelineId ? `Pipeline ${y.pipelineId.slice(0, 8)}` : "Unknown pipeline"), k = p[y.runId]?.context ?? d[y.runId]?.context, C = p[y.runId]?.steps;
      N.push({ ...y, pipelineName: b, runContext: k, runSteps: C });
    }
    return N;
  }, [r, c, d, p]), g = D(
    (m, N, y, v, w) => {
      s(N, y, v, w || void 0), l((b) => {
        const k = new Set(b);
        return k.add(`${N}::${y}`), k;
      }), fetch(`/api/pipelines/${encodeURIComponent(N)}/approvals`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: y, decision: v, ...w ? { comment: w } : {} })
      }).catch((b) => {
        console.error("[approvals] POST failed", b);
      }), t(`/pipelines/${m}/runs/${N}`);
    },
    [s, t]
  ), x = h.length;
  return /* @__PURE__ */ o("div", { "data-testid": "pending-approvals-page", className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-[inherit]", children: [
    /* @__PURE__ */ e("div", { className: "h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]", children: /* @__PURE__ */ o("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "text-lg font-bold text-text-primary", children: "Pending approvals" }),
      /* @__PURE__ */ e(se, { "data-testid": "pending-count", tone: x > 0 ? "warning" : "neutral", size: "sm", children: x })
    ] }) }),
    /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto p-5", children: [
      a ? /* @__PURE__ */ o("div", { "data-testid": "approvals-error", role: "alert", className: "px-4 py-3 bg-[#fef2f2] border border-[#dc2626] text-[#dc2626] rounded-lg flex items-center justify-between gap-3 mb-4", children: [
        /* @__PURE__ */ e("span", { className: "text-[13px] font-medium", children: "Couldn't load pending approvals. Try again." }),
        /* @__PURE__ */ e("button", { "data-testid": "approvals-retry", onClick: i, className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[#dc2626] border border-[#dc2626] rounded-md cursor-pointer font-[inherit]", children: "Retry" })
      ] }) : null,
      n && x === 0 ? /* @__PURE__ */ o("div", { "data-testid": "approvals-loading", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: [
        /* @__PURE__ */ e(pn, { height: 140 }),
        /* @__PURE__ */ e(pn, { height: 140 }),
        /* @__PURE__ */ e(pn, { height: 140 })
      ] }) : x === 0 && !a ? /* @__PURE__ */ e(
        ze,
        {
          icon: "✋",
          title: "No pending approvals",
          body: "When a pipeline reaches an approval step, it'll show up here.",
          testId: "approvals-empty"
        }
      ) : /* @__PURE__ */ e("div", { "data-testid": "approvals-list", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: h.map((m) => /* @__PURE__ */ e(
        rh,
        {
          row: m,
          onOpenPipeline: () => t(`/pipelines/${m.pipelineId}`),
          onSubmit: (N, y) => g(m.pipelineId, m.runId, m.stepId, N, y)
        },
        `${m.runId}:${m.stepId}`
      )) })
    ] })
  ] });
}
function lf({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(ye, { children: [
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
        Bt,
        {
          id: "image-source-image-id",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: t.imageId ?? "",
          onChange: (n) => r({ imageId: n.target.value.trim() || void 0 }),
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
        Bt,
        {
          id: "image-source-output-key",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: t.outputKey ?? "",
          onChange: (n) => r({ outputKey: n.target.value.trim() || void 0 }),
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
const oh = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.crop.output.imageId"
], ah = [
  "{{scatter.item.label}}",
  "{{scatter.index}}",
  "{{scatter.parentImageId}}"
];
function yo({
  samples: t,
  onSelect: r
}) {
  return /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: t.map((n) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: () => r(n),
      className: I(
        "text-[10px] font-mono",
        "bg-[#f3f4f6] border border-[#d1d5db] text-[#374151]",
        "rounded px-1.5 py-0.5 cursor-pointer",
        "hover:bg-[#e5e7eb] transition-colors duration-100"
      ),
      children: n
    },
    n
  )) });
}
function cf({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(ye, { children: [
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
        Bt,
        {
          id: "save-source-image-path",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: t.sourceImagePath ?? "",
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
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
        yo,
        {
          samples: oh,
          onSelect: (n) => r({ sourceImagePath: n })
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
        Bt,
        {
          id: "save-filename-template",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: t.filenameTemplate ?? "",
          onChange: (n) => r({ filenameTemplate: n.target.value.trim() || void 0 }),
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
          yo,
          {
            samples: ah,
            onSelect: (n) => {
              const a = t.filenameTemplate ?? "";
              r({ filenameTemplate: a + n });
            }
          }
        )
      ] })
    ] })
  ] });
}
function df({
  status: t,
  result: r,
  runId: n,
  endpointLabel: a,
  error: i,
  latencyMs: s,
  onOpen: d,
  className: c
}) {
  const l = a ?? r?.model?.endpointId ?? "vision-model", p = s ?? r?.model?.latencyMs, u = r?.caption, f = (r?.tags ?? []).slice(0, 5), h = /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ e("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: l }),
      t === "running" ? /* @__PURE__ */ o(se, { tone: "info", size: "sm", children: [
        /* @__PURE__ */ e("span", { className: "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" }),
        " running"
      ] }) : t === "completed" ? /* @__PURE__ */ e(se, { tone: "success", size: "sm", children: "ok" }) : /* @__PURE__ */ e(se, { tone: "danger", size: "sm", children: "failed" }),
      typeof p == "number" ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        p.toFixed(0),
        "ms"
      ] }) : null,
      n ? /* @__PURE__ */ e("span", { className: "ml-auto truncate font-mono text-[10px] text-text-tertiary", children: n }) : null
    ] }),
    t === "failed" && i ? /* @__PURE__ */ e("p", { className: "text-[13px] text-danger-fg", children: i }) : /* @__PURE__ */ e("p", { className: "line-clamp-2 text-left text-[13px] text-text-primary", children: u ?? (t === "running" ? "Analyzing image…" : "No caption produced.") }),
    f.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: f.map((x) => /* @__PURE__ */ o(se, { tone: "neutral", size: "sm", children: [
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
function pf(t = {}) {
  const { maxRecords: r = 50, runId: n } = t, [a, i] = S([]), s = le(/* @__PURE__ */ new Map()), d = le(!0);
  return ne(() => (d.current = !0, () => {
    d.current = !1;
  }), []), De("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.image.vision.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || n && u.runId !== n) return;
    const f = `${u.runId}::${u.stepId}`;
    i((h) => {
      const g = s.current.get(f), x = typeof u.at == "number" ? u.at : Date.now(), m = (N) => {
        if (typeof g == "number" && g >= 0 && g < h.length) {
          const w = h.slice();
          return w[g] = { ...h[g], ...N }, w;
        }
        const y = [N, ...h];
        y.length > r && (y.length = r);
        const v = /* @__PURE__ */ new Map();
        return y.forEach((w, b) => v.set(`${w.runId}::${w.stepId}`, b)), s.current = v, y;
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
        const N = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          status: "completed",
          result: u.result,
          completedAt: x,
          elapsedMs: N?.startedAt ? x - N.startedAt : void 0,
          endpointId: N?.endpointId ?? u.result?.model?.endpointId
        });
      }
      if (p === "pipeline.image.vision.failed") {
        const N = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          status: "failed",
          error: u.error,
          completedAt: x,
          elapsedMs: N?.startedAt ? x - N.startedAt : void 0
        });
      }
      return h;
    });
  }), q(() => a, [a]);
}
function ih(t) {
  return t === "pass" ? "success" : t === "fail" ? "danger" : "warning";
}
function sh({ result: t, className: r }) {
  const n = ih(t.overallVerdict), a = n === "success" ? "PASS" : n === "danger" ? "FAIL" : "INCONCLUSIVE", i = t.rubricSnapshot.passThreshold ?? 0.5;
  return /* @__PURE__ */ o(
    "section",
    {
      className: I(
        "flex flex-col gap-2 rounded-lg border border-border bg-surface p-3",
        r
      ),
      children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ o("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: [
            t.rubricSnapshot.id,
            " v",
            t.rubricSnapshot.version
          ] }),
          /* @__PURE__ */ o(se, { tone: n, size: "sm", children: [
            a,
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
            Yn,
            {
              value: t.overallScore,
              threshold: i,
              tone: n === "warning" ? "warning" : n,
              size: "lg",
              ariaLabel: `Overall judge score ${(t.overallScore * 100).toFixed(0)}% — ${a}`
            }
          )
        ] })
      ]
    }
  );
}
function lh({ result: t, className: r }) {
  if (!t.criteria || t.criteria.length === 0) return null;
  const n = /* @__PURE__ */ new Map();
  for (const a of t.rubricSnapshot.criteria) n.set(a.id, a);
  return /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Criteria (",
      t.criteria.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1.5", children: t.criteria.map((a) => /* @__PURE__ */ e(ch, { score: a, def: n.get(a.criterionId) }, a.criterionId)) })
  ] });
}
function ch({
  score: t,
  def: r
}) {
  const n = t.passed ? "success" : "danger", a = t.passed ? "PASS" : "FAIL", i = r?.scale ?? "0-1";
  return /* @__PURE__ */ o("li", { className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2.5", children: [
    /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-1.5", children: [
      /* @__PURE__ */ e("span", { className: "font-mono text-[11px] font-semibold text-text-primary", children: t.criterionId }),
      /* @__PURE__ */ o("span", { className: "font-mono text-[10px] uppercase text-text-tertiary", children: [
        "[",
        i,
        "]"
      ] }),
      /* @__PURE__ */ e(se, { tone: n, size: "sm", children: a }),
      /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
        "raw: ",
        String(t.rawScore)
      ] })
    ] }),
    /* @__PURE__ */ e(
      Yn,
      {
        value: t.score,
        threshold: r?.failThreshold ?? 0.5,
        tone: n,
        size: "sm",
        ariaLabel: `Criterion ${t.criterionId} score ${(t.score * 100).toFixed(0)}% — ${a}`
      }
    ),
    r?.prompt ? /* @__PURE__ */ o("p", { className: "text-[12px] italic leading-snug text-text-tertiary", children: [
      "“",
      r.prompt,
      "”"
    ] }) : null,
    t.rationale ? /* @__PURE__ */ e("p", { className: "text-[13px] leading-snug text-text-primary", children: t.rationale }) : null
  ] });
}
const ea = aa(null);
function uf({ value: t, children: r }) {
  return /* @__PURE__ */ e(ea.Provider, { value: t, children: r });
}
function ta() {
  return wo(ea);
}
function mf({
  result: t,
  showVerdict: r = !0,
  showCriteria: n = !0,
  showMetadata: a = !0,
  showRawText: i = !1,
  className: s
}) {
  const d = ta(), [c, l] = S(!1), [p, u] = S(null), [f, h] = S(!1), [g, x] = S(null), m = le(!0);
  ne(() => (m.current = !0, () => {
    m.current = !1;
  }), []), ne(() => {
    c && (t.rawModelText || p === null && (f || t.rawTextTruncated && d && (h(!0), (async () => {
      try {
        const v = await d.fetchRawText(t.judgmentId);
        if (!m.current) return;
        u(v ?? ""), x(null);
      } catch (v) {
        if (!m.current) return;
        x(v instanceof Error ? v : new Error(String(v)));
      } finally {
        m.current && h(!1);
      }
    })())));
  }, [c, t.rawModelText, t.rawTextTruncated, t.judgmentId, d, p, f]);
  const N = t.rawModelText ?? p ?? null, y = !!t.rawModelText || !!t.rawTextTruncated;
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-3 text-text-primary", s), children: [
    r ? /* @__PURE__ */ e(sh, { result: t }) : null,
    n ? /* @__PURE__ */ e(lh, { result: t }) : null,
    a ? /* @__PURE__ */ o("section", { className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
      /* @__PURE__ */ o("span", { children: [
        "tokens ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: t.tokensIn }),
        " in /",
        " ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: t.tokensOut }),
        " out"
      ] }),
      t.cacheReadTokens && t.cacheReadTokens > 0 ? /* @__PURE__ */ o(G, { children: [
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
    i && y ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => l((v) => !v),
          className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded",
          "aria-expanded": c,
          children: [
            c ? "▾" : "▸",
            " Raw model output"
          ]
        }
      ),
      c ? /* @__PURE__ */ e(
        dh,
        {
          text: N,
          loading: f,
          error: g,
          fallbackHint: t.rawTextTruncated && !d ? "Raw text was spilled to S3 but no JudgmentApi provider is wired." : null
        }
      ) : null
    ] }) : null
  ] });
}
function dh({
  text: t,
  loading: r,
  error: n,
  fallbackHint: a
}) {
  return r ? /* @__PURE__ */ e("div", { className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary", children: "Loading raw text…" }) : n ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-state-failed bg-danger-bg p-2 text-[11px] text-text-primary", children: [
    "Failed to fetch raw text: ",
    n.message
  ] }) : t === null || t.length === 0 ? /* @__PURE__ */ e("div", { className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary", children: a ?? "Raw text not available." }) : /* @__PURE__ */ e("pre", { className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary", children: t });
}
function hf({ aggregate: t, className: r }) {
  const n = t.numJudgments > 0 ? t.numPassed / t.numJudgments : 0, a = t.numJudgments > 0 ? t.sumOverallScore / t.numJudgments : 0, i = n >= 0.9 ? "success" : n >= 0.6 ? "warning" : "danger", s = i === "success" ? "HEALTHY" : i === "warning" ? "MIXED" : "FAILING";
  return /* @__PURE__ */ o(
    "section",
    {
      className: I(
        "flex flex-col gap-2 rounded-lg border border-border bg-surface p-3",
        r
      ),
      children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ e("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: t.dayBucket }),
          /* @__PURE__ */ o(se, { tone: i, size: "sm", children: [
            s,
            " · ",
            (n * 100).toFixed(0),
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
            Yn,
            {
              value: a,
              tone: i === "warning" ? "warning" : i,
              size: "md",
              ariaLabel: `Mean score ${(a * 100).toFixed(0)}% across ${t.numJudgments} judgments`
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
          typeof t.minOverallScore == "number" && typeof t.maxOverallScore == "number" ? /* @__PURE__ */ o(G, { children: [
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
function ff({
  aggregates: t,
  sortOrder: r = "desc",
  caption: n,
  loading: a = !1,
  className: i
}) {
  const s = q(() => {
    const f = t.slice();
    return f.sort((h, g) => h.dayBucket.localeCompare(g.dayBucket)), r === "desc" && f.reverse(), f;
  }, [t, r]), d = q(() => t.slice().sort((h, g) => h.dayBucket.localeCompare(g.dayBucket)).map((h) => h.numJudgments > 0 ? h.numPassed / h.numJudgments : 0), [t]);
  if (t.length === 0)
    return /* @__PURE__ */ e(
      "section",
      {
        className: I(
          "flex min-h-[120px] w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-surface-panel p-4 text-text-tertiary",
          i
        ),
        children: /* @__PURE__ */ e("span", { className: "text-[12px]", children: a ? "Loading trends…" : "No judgment activity in range." })
      }
    );
  const c = t.reduce((f, h) => f + h.numJudgments, 0), l = t.reduce((f, h) => f + h.numPassed, 0), p = t.reduce((f, h) => f + h.sumCostUsd, 0), u = c > 0 ? l / c : 0;
  return /* @__PURE__ */ o("section", { className: I("flex w-full flex-col gap-2", i), children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: n ?? `Judgment trend — ${t.length} days` }),
      /* @__PURE__ */ o(
        se,
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
        Oa,
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
      /* @__PURE__ */ e("tbody", { children: s.map((f) => /* @__PURE__ */ e(ph, { row: f }, f.aggregateKey)) })
    ] })
  ] });
}
function ph({ row: t }) {
  const r = t.numJudgments > 0 ? t.numPassed / t.numJudgments : 0, n = t.numJudgments > 0 ? t.sumOverallScore / t.numJudgments : 0, a = r >= 0.9 ? "success" : r >= 0.6 ? "warning" : "danger";
  return /* @__PURE__ */ o("tr", { className: "border-t border-border", children: [
    /* @__PURE__ */ e("td", { className: "py-1 pr-2 font-mono", children: t.dayBucket }),
    /* @__PURE__ */ e("td", { className: "py-1 pr-2", children: /* @__PURE__ */ o(se, { tone: a, size: "sm", children: [
      (r * 100).toFixed(0),
      "%"
    ] }) }),
    /* @__PURE__ */ o("td", { className: "py-1 pr-2 font-mono", children: [
      (n * 100).toFixed(0),
      "%"
    ] }),
    /* @__PURE__ */ e("td", { className: "py-1 pr-2 text-right font-mono", children: t.numJudgments }),
    /* @__PURE__ */ o("td", { className: "py-1 pl-2 text-right font-mono", children: [
      "$",
      t.sumCostUsd.toFixed(4)
    ] })
  ] });
}
function uh(t) {
  if (typeof t == "number") return t;
  if (typeof t == "string") {
    const r = Date.parse(t);
    if (Number.isFinite(r)) return r;
  }
  return Date.now();
}
function gf(t = {}) {
  const { maxRecords: r = 50, runId: n } = t, [a, i] = S([]), s = le(/* @__PURE__ */ new Map()), d = le(!0);
  return ne(() => (d.current = !0, () => {
    d.current = !1;
  }), []), De("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.judge.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || n && u.runId !== n) return;
    const f = `${u.runId}::${u.stepId}`;
    i((h) => {
      const g = s.current.get(f), x = uh(u.at), m = (N) => {
        if (typeof g == "number" && g >= 0 && g < h.length) {
          const w = h.slice();
          return w[g] = { ...h[g], ...N }, w;
        }
        const y = [N, ...h];
        y.length > r && (y.length = r);
        const v = /* @__PURE__ */ new Map();
        return y.forEach((w, b) => v.set(`${w.runId}::${w.stepId}`, b)), s.current = v, y;
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
        const N = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? N?.pipelineId,
          status: "scored",
          result: u.result,
          completedAt: x,
          elapsedMs: N?.startedAt ? x - N.startedAt : u.latencyMs,
          rubricId: u.rubricId ?? N?.rubricId,
          judgeModel: u.judgeModel ?? N?.judgeModel,
          costUsd: u.costUsd ?? u.result?.costUsd,
          tokensIn: u.usage?.inputTokens ?? u.result?.tokensIn,
          tokensOut: u.usage?.outputTokens ?? u.result?.tokensOut
        });
      }
      if (p === "pipeline.judge.failed") {
        const N = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? N?.pipelineId,
          status: "failed",
          error: u.error,
          failureReason: u.reason,
          completedAt: x,
          elapsedMs: N?.startedAt ? x - N.startedAt : u.latencyMs,
          costUsd: u.costUsd,
          tokensIn: u.tokensIn,
          tokensOut: u.tokensOut
        });
      }
      if (p === "pipeline.judge.budget-exceeded") {
        const N = typeof g == "number" ? h[g] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? N?.pipelineId,
          status: "budget-exceeded",
          completedAt: x
        });
      }
      return h;
    });
  }), q(() => a, [a]);
}
function xf(t) {
  const r = ta(), [n, a] = S([]), [i, s] = S(!1), [d, c] = S(null), l = le(!0), p = le(() => {
  }), { pipelineId: u, rubricId: f, since: h, until: g, limit: x, refreshIntervalMs: m = 0, paused: N = !1 } = t, y = `${u ?? ""}|${f ?? ""}|${h ?? ""}|${g ?? ""}|${x ?? ""}|${N ? "1" : "0"}`;
  return ne(() => (l.current = !0, () => {
    l.current = !1;
  }), []), ne(() => {
    if (!r) {
      a([]), s(!1), c(null);
      return;
    }
    if (N) return;
    if (!u && !f) {
      c(new Error("useJudgmentAggregates: one of pipelineId or rubricId is required")), s(!1);
      return;
    }
    let v = !1;
    const w = async () => {
      s(!0);
      try {
        const b = await r.fetchAggregates({
          ...u ? { pipelineId: u } : {},
          ...f ? { rubricId: f } : {},
          ...h ? { since: h } : {},
          ...g ? { until: g } : {},
          ...typeof x == "number" ? { limit: x } : {}
        });
        if (v || !l.current) return;
        a(b.items), c(null);
      } catch (b) {
        if (v || !l.current) return;
        c(b instanceof Error ? b : new Error(String(b)));
      } finally {
        l.current && !v && s(!1);
      }
    };
    if (p.current = () => {
      w();
    }, w(), m > 0) {
      const b = setInterval(() => {
        w();
      }, m);
      return () => {
        v = !0, clearInterval(b);
      };
    }
    return () => {
      v = !0;
    };
  }, [r, y, m]), {
    aggregates: n,
    loading: i,
    error: d,
    reload: () => p.current()
  };
}
const mh = 100, hh = 500, na = 148, ra = 116, fh = 56, gh = 20;
function xh(t) {
  const r = new Map(t.map((l) => [l.imageId, l])), n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const l of t)
    if (l.parentImageId) {
      const p = a.get(l.parentImageId) ?? [];
      p.push(l.imageId), a.set(l.parentImageId, p);
    }
  const i = [];
  for (const l of t)
    (!l.parentImageId || !r.has(l.parentImageId)) && (n.set(l.imageId, 0), i.push(l.imageId));
  let s = 0;
  for (; s < i.length; ) {
    const l = i[s++], p = n.get(l) ?? 0;
    for (const u of a.get(l) ?? []) {
      const f = n.get(u) ?? -1;
      p + 1 > f && (n.set(u, p + 1), i.push(u));
    }
  }
  const d = /* @__PURE__ */ new Map();
  for (const [l, p] of n.entries()) {
    const u = d.get(p) ?? [];
    u.push(l), d.set(p, u);
  }
  const c = /* @__PURE__ */ new Map();
  for (const [l, p] of d.entries()) {
    const u = l * (na + fh);
    p.forEach((f, h) => {
      c.set(f, {
        x: u,
        y: h * (ra + gh)
      });
    });
  }
  return c;
}
function bh(t, r) {
  const n = new Map(r.map((s) => [s.imageId, s])), a = /* @__PURE__ */ new Set(), i = [t];
  for (; i.length; ) {
    const s = i.shift();
    if (a.has(s)) continue;
    a.add(s);
    const d = n.get(s);
    d?.parentImageId && i.push(d.parentImageId);
  }
  return a;
}
function yh({ src: t, alt: r, testId: n }) {
  const a = le(null), [i, s] = S(!1);
  return ne(() => {
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
  }, []), /* @__PURE__ */ e(
    "div",
    {
      ref: a,
      className: "w-full h-full flex items-center justify-center bg-surface-inset",
      children: i ? /* @__PURE__ */ e(
        "img",
        {
          src: t,
          alt: r,
          className: "w-full h-full object-cover",
          loading: "lazy",
          "data-testid": n
        }
      ) : /* @__PURE__ */ e(
        "div",
        {
          "aria-hidden": "true",
          className: "w-full h-full animate-pulse bg-surface-inset",
          "data-testid": n ? `${n}-placeholder` : void 0
        }
      )
    }
  );
}
function vh({ data: t }) {
  const { entry: r, highlighted: n, selected: a, onSelect: i, getImageUrl: s } = t, d = r.width && r.height ? `${r.width}×${r.height}` : "", c = r.producedByNodeKind;
  return /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: "w-2 h-2 bg-border-emphasis" }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => i(r.imageId),
        className: I(
          "w-full h-full flex flex-col overflow-hidden rounded-lg border bg-surface text-left",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          a ? "border-primary ring-2 ring-primary/30" : n ? "border-primary/60 bg-primary/5" : "border-border"
        ),
        "aria-label": `Image artifact ${r.imageId.slice(0, 8)} produced by ${c}`,
        "data-testid": `lineage-node-${r.imageId}`,
        children: [
          /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 overflow-hidden bg-surface-inset flex items-center justify-center", children: /* @__PURE__ */ e(
            yh,
            {
              src: s(r.imageId),
              alt: `Artifact ${r.imageId.slice(0, 8)}`,
              testId: `lineage-thumb-${r.imageId}`
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
    /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: "w-2 h-2 bg-border-emphasis" })
  ] });
}
const Nh = { lineageNode: vh };
function wh() {
  return /* @__PURE__ */ e(
    "div",
    {
      className: "flex items-center justify-center h-full text-text-tertiary text-sm",
      "data-testid": "lineage-graph-empty",
      children: "No image artifacts produced by this run."
    }
  );
}
function kh(t, r) {
  if (t.length <= r) return t;
  const n = t.map((a, i) => ({ e: a, i }));
  return n.sort((a, i) => {
    const s = Date.parse(a.e.at), d = Date.parse(i.e.at);
    return d !== s ? d - s : i.i - a.i;
  }), n.slice(0, r).map((a) => a.e);
}
function Dn(t) {
  return t.length > 10 ? `${t.slice(0, 8)}…` : t;
}
function Ch({
  navEntries: t,
  imageId: r,
  onClose: n,
  onNavigate: a,
  getImageUrl: i
}) {
  const s = t.find((u) => u.imageId === r), [d, c] = S(!1);
  ne(() => {
    c(!1);
  }, [r]), ne(() => {
    const u = (f) => {
      if (f.key !== "ArrowRight" && f.key !== "ArrowLeft" || t.length === 0) return;
      const h = t.findIndex((m) => m.imageId === r);
      if (h === -1) return;
      const g = t.length, x = f.key === "ArrowRight" ? (h + 1) % g : (h - 1 + g) % g;
      f.preventDefault(), a(t[x].imageId);
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [r, t, a]);
  const l = D(() => {
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(r).then(
      () => {
        c(!0), window.setTimeout(() => c(!1), 1200);
      },
      () => {
      }
    );
  }, [r]);
  if (!s) return null;
  const p = s.width && s.height ? `${s.width}×${s.height}` : null;
  return /* @__PURE__ */ e(
    He,
    {
      open: !0,
      onClose: n,
      title: `Artifact ${Dn(s.imageId)}`,
      maxWidth: 760,
      rawChildren: !0,
      backdropTestId: "lineage-preview-backdrop",
      footer: /* @__PURE__ */ e(
        Oe,
        {
          variant: "secondary",
          size: "sm",
          onClick: n,
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
                  /* @__PURE__ */ o(se, { tone: "neutral", size: "sm", mono: !0, title: s.imageId, children: [
                    "id: ",
                    Dn(s.imageId)
                  ] }),
                  /* @__PURE__ */ e(
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
                  s.mimeType && /* @__PURE__ */ e(se, { tone: "info", size: "sm", children: s.mimeType }),
                  p && /* @__PURE__ */ e(se, { tone: "neutral", size: "sm", mono: !0, children: p }),
                  /* @__PURE__ */ o(se, { tone: "purple", size: "sm", mono: !0, title: s.producedByStepId, children: [
                    "step: ",
                    Dn(s.producedByStepId)
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
function bf({
  entries: t,
  selectedImageId: r,
  onSelect: n,
  maxRenderedNodes: a = mh
}) {
  const i = $e(), [s, d] = S(!1), [c, l] = S(!1), [p, u] = S(null), f = t.length, h = !s && f > a, g = q(
    () => h ? kh(t, a) : t,
    [t, h, a]
  ), x = q(
    () => r ? bh(r, g) : /* @__PURE__ */ new Set(),
    [r, g]
  ), m = q(() => xh(g), [g]), N = D(
    (Y) => {
      n?.(Y), u(Y);
    },
    [n]
  ), y = q(
    () => g.map((Y) => {
      const te = m.get(Y.imageId) ?? { x: 0, y: 0 };
      return {
        id: Y.imageId,
        type: "lineageNode",
        position: te,
        data: {
          entry: Y,
          highlighted: x.has(Y.imageId),
          selected: Y.imageId === r,
          onSelect: N,
          getImageUrl: i
        },
        style: { width: na, height: ra }
      };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [g, r, x, N, i]
  ), v = q(
    () => new Set(g.map((Y) => Y.imageId)),
    [g]
  ), w = q(
    () => g.filter(
      (Y) => Y.parentImageId && v.has(Y.parentImageId)
    ).map((Y) => ({
      id: `${Y.parentImageId}->${Y.imageId}`,
      source: Y.parentImageId,
      target: Y.imageId,
      sourceHandle: "out",
      targetHandle: "in",
      className: x.has(Y.imageId) && x.has(Y.parentImageId) ? "stroke-primary stroke-2" : "stroke-border"
    })),
    [g, v, x]
  ), [b, , k] = Ao(y), [C, , T] = Ro(w), $ = D(
    (Y, te) => {
      N(te.id);
    },
    [N]
  ), R = D(() => {
    f > hh ? l(!0) : d(!0);
  }, [f]), E = D(() => {
    d(!0), l(!1);
  }, []), A = D(() => {
    l(!1);
  }, []), j = q(() => {
    const Y = g.slice();
    return Y.sort((te, O) => {
      const P = Date.parse(te.at), H = Date.parse(O.at);
      return P !== H ? P - H : te.imageId.localeCompare(O.imageId);
    }), Y;
  }, [g]), W = D(() => u(null), []), ie = D(
    (Y) => u(Y),
    []
  );
  return f === 0 ? /* @__PURE__ */ e(wh, {}) : /* @__PURE__ */ o(
    "div",
    {
      className: "relative w-full h-full flex flex-col",
      "data-testid": "lineage-graph",
      children: [
        h && /* @__PURE__ */ e("div", { className: "p-2 flex-shrink-0", children: /* @__PURE__ */ o(
          Ze,
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
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: R,
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
            Po,
            {
              nodes: b,
              edges: C,
              onNodesChange: k,
              onEdgesChange: T,
              onNodeClick: $,
              nodeTypes: Nh,
              fitView: !0,
              fitViewOptions: { padding: 0.2 },
              minZoom: 0.3,
              maxZoom: 2,
              onlyRenderVisibleElements: !0,
              proOptions: { hideAttribution: !0 },
              children: [
                /* @__PURE__ */ e(Mo, { gap: 16, size: 1, className: "bg-surface-inset" }),
                /* @__PURE__ */ e(Eo, { showInteractive: !1, className: "bg-surface border border-border rounded" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e(
          rn,
          {
            open: c,
            onConfirm: E,
            onCancel: A,
            title: "Show all artifacts?",
            body: `Rendering all ${f} artifacts may slow down the lineage tab. Continue?`,
            confirmLabel: "Show all",
            tone: "caution"
          }
        ),
        p && /* @__PURE__ */ e(
          Ch,
          {
            navEntries: j,
            imageId: p,
            onClose: W,
            onNavigate: ie,
            getImageUrl: i
          }
        )
      ]
    }
  );
}
const Ft = /* @__PURE__ */ new Map(), Ih = 6e4;
function vo(t) {
  const r = Ft.get(t);
  return r ? Date.now() - r.fetchedAt > Ih ? (Ft.delete(t), null) : r.entries : null;
}
function Sh(t, r) {
  Ft.set(t, { entries: r, fetchedAt: Date.now() });
}
function yf() {
  Ft.clear();
}
function vf(t, r) {
  const [n, a] = S(() => t ? vo(t) ?? [] : []), [i, s] = S(!1), [d, c] = S(null), l = le(0), p = D(() => {
    if (!t || !r) return;
    const f = vo(t);
    if (f) {
      a(f), s(!1), c(null);
      return;
    }
    const h = ++l.current;
    s(!0), c(null);
    const g = `/api/pipeline/runs/${encodeURIComponent(t)}/image-lineage?pipelineId=${encodeURIComponent(r)}`;
    fetch(g, {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    }).then(async (x) => {
      if (h !== l.current) return;
      if (!x.ok) {
        const y = `image-lineage: ${x.status} ${x.statusText}`;
        c(y), s(!1);
        return;
      }
      const m = await x.json();
      if (h !== l.current) return;
      const N = Array.isArray(m.entries) ? m.entries : [];
      Sh(t, N), a(N), s(!1);
    }).catch((x) => {
      h === l.current && (c(x instanceof Error ? x.message : String(x)), s(!1));
    });
  }, [t, r]), u = D(() => {
    t && Ft.delete(t), p();
  }, [t, p]);
  return ne(() => {
    p();
  }, [p]), { entries: n, loading: i, error: d, refetch: u };
}
export {
  ai as ActionNode,
  pd as AdjustBwConfig,
  Di as AdjustBwNode,
  Id as AdjustLayerConfig,
  _i as AdjustLayerNode,
  yi as AgUiOutputNode,
  ui as AgentNode,
  hf as AggregateSummaryCard,
  of as AllRunsPage,
  as as AnimatedEdge,
  pi as ApprovalNode,
  ge as BaseNode,
  yp as CaptionPanel,
  ri as ConditionNode,
  lh as CriteriaPanel,
  ld as CropConfig,
  Ei as CropNode,
  Ad as DimensionsConfig,
  Li as DimensionsNode,
  xp as EditPromptConfig,
  ts as EditPromptNode,
  Sp as EditRecommendationsPanel,
  $f as EventStreamProvider,
  ii as ForkNode,
  Wc as FormatConvertConfig,
  Ai as FormatConvertNode,
  lp as GenerateConfig,
  Yi as GenerateNode,
  fi as GraphQueryNode,
  xi as GuardrailNode,
  bf as ImageLineageGraph,
  lf as ImageSourceConfig,
  Ni as ImageSourceNode,
  Np as ImageWithBBoxOverlay,
  ci as JoinNode,
  uf as JudgmentApiProvider,
  mf as JudgmentResultViewer,
  ff as JudgmentTrendChart,
  hi as KnowledgeBaseNode,
  Za as LLMNode,
  mi as McpToolNode,
  gi as MemoryNode,
  Ha as NODE_CATEGORIES,
  ws as NodePalette,
  ln as NodeThumbStrip,
  Cp as ObjectsPanel,
  fs as PALETTE_ITEMS,
  Ga as PORT_CLS,
  sf as PendingApprovalsPage,
  kp as PeoplePanel,
  Ls as PipelineCanvas,
  ca as PipelineEditorContext,
  Qh as PipelineEditorPage,
  So as PipelineEditorProvider,
  kf as PipelineEditorServicesProvider,
  Cf as PipelineNodeRuntimeProvider,
  nf as PipelineRunComparePage,
  rf as PipelineRunDiff,
  tf as PipelineRunReplayPage,
  ef as PipelineRunsPage,
  va as PipelineRunsProvider,
  af as PipelineStatsPage,
  Zh as PipelinesPage,
  bi as PolicyNode,
  Ec as ResizeConfig,
  Ii as ResizeNode,
  cf as SaveConfig,
  wi as SaveNode,
  Ac as ScatterConfig,
  Ci as ScatterNode,
  Gc as SharpenConfig,
  Ri as SharpenNode,
  Ip as TagsPanel,
  Fc as TransformGeoConfig,
  $i as TransformGeoNode,
  ti as TransformNode,
  Ya as TriggerNode,
  Ed as UpscaleConfig,
  Bi as UpscaleNode,
  mp as VariationConfig,
  Qi as VariationNode,
  sh as VerdictPanel,
  Wd as VisionClassifyConfig,
  Vi as VisionClassifyNode,
  Fd as VisionConfig,
  Yd as VisionDescribeConfig,
  Wi as VisionDescribeNode,
  ip as VisionExtractTextConfig,
  Hi as VisionExtractTextNode,
  qi as VisionNode,
  $p as VisionResultViewer,
  df as VisionRunCard,
  tp as VisionTagConfig,
  Ji as VisionTagNode,
  Qc as WatermarkConfig,
  Pi as WatermarkNode,
  fe as categoryFor,
  yf as clearImageLineageCache,
  wp as imageOverlayPropsFrom,
  ns as nodeTypes,
  F as portCls,
  Xh as recordRecentType,
  De as useEventStream,
  _a as useEventStreamContext,
  vf as useImageLineage,
  $e as useImageUrl,
  xf as useJudgmentAggregates,
  ta as useJudgmentApi,
  gf as useJudgmentResults,
  me as useLatestStepForNode,
  Ue as usePipelineEditor,
  ko as usePipelineEditorServices,
  If as usePipelineNodeRuntime,
  bt as usePipelineRuns,
  Re as useRetryFromStep,
  pf as useVisionResults
};
