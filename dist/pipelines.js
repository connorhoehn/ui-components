import { jsxs as o, jsx as e, Fragment as V } from "react/jsx-runtime";
import ko, { useState as S, memo as sa, useRef as ce, useEffect as re, useMemo as z, useCallback as M, useContext as Co, createContext as la } from "react";
import { useNavigate as je, useParams as xt, Navigate as bt, useSearchParams as ln } from "react-router";
import { v as Io, w as me, x as Ae, q as Te, G as Gn, y as Le, u as yt, i as ca, g as da, f as ir, p as pa, z as ua, J as pn, t as So, I as $o, e as Ft, S as nn, N as ma, T as un, n as To, a as at, A as Ro, B as Yn, C as Ln, D as Po, E as ha, F as fa, H as ga, b as xa, K as it, L as ba, M as ya, O as st, Q as sr, R as va, j as Na, o as Ao, U as rn, V as wa, m as lr, P as ka, W as Ca, r as Ia, X as on, l as cr, Y as Sa, k as $a } from "./usePendingApprovals-78SaxJH0.js";
import { h as mf, Z as hf, _ as ff } from "./usePendingApprovals-78SaxJH0.js";
import { Handle as L, Position as B, useNodeConnections as Ta, getSmoothStepPath as Ra, EdgeLabelRenderer as dr, ReactFlowProvider as Pa, useReactFlow as Aa, useNodesState as Do, useEdgesState as Mo, ReactFlow as Oo, Background as Eo, BackgroundVariant as Da, Controls as _o, MiniMap as Ma } from "@xyflow/react";
/* empty css               */
import { c as I } from "./cn-B6yFEsav.js";
import { b as Xn, u as cn } from "./ToastProvider-D3MHbP-u.js";
import { a as vt, F as Oa, I as Ea, C as Qn, U as _a, T as La, S as Zn, b as Ba } from "./TrendSparkline-Bm0kEjdg.js";
import "clsx";
import "tailwind-merge";
import { M as Ke } from "./Modal-fp5zcyw8.js";
import "react-dom";
import "./WebSocketContext-DPGFyPeZ.js";
import { a as Ee, u as Ua } from "./EventStreamContext-CjzSHXy-.js";
import { E as xf } from "./EventStreamContext-CjzSHXy-.js";
import { B as _e } from "./Button-Qsbxqsl9.js";
import { I as ht, F as Fa } from "./FileUploadDrop-Cmz3XANg.js";
import { B as et } from "./Banner-DKb3JiLs.js";
import { C as se } from "./Chip-BDT8ro4h.js";
import { E as Fe } from "./EmptyState-Ejc9dJA3.js";
import { u as Lo } from "./IdentityContext-CLalsm_M.js";
import { C as an } from "./ConfirmDialog-Ix7G_Mb4.js";
import { B as ja, L as Vt } from "./Chart-ByoxeiYX.js";
import { S as mn } from "./SkeletonCard-Baj5Ynm7.js";
const za = {
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
}, qa = {
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
function Bn(t, n, r, i) {
  return !(!Wa(t, n) || !Va(r, i));
}
function Wa(t, n) {
  const r = za[t];
  return r === "fork" ? Ja(n) : r.includes(n);
}
function Va(t, n) {
  const r = qa[t];
  return r === null ? !1 : r === "join" ? Ha(n) : r.includes(n);
}
function Ja(t) {
  return /^branch-(\d+)$/.exec(t) !== null;
}
function Ha(t) {
  return /^in-(\d+)$/.exec(t) !== null;
}
const Ka = {
  idle: { card: "border border-[#d1d5db] bg-white", dot: "bg-[#d1d5db]" },
  pending: { card: "border border-dashed border-[#93c5fd] bg-[#eff6ff]", dot: "bg-[#93c5fd]" },
  running: { card: "border-2 border-[#2563eb] bg-[#eff6ff]", dot: "bg-[#2563eb]" },
  awaiting: { card: "border-2 border-[#f59e0b] bg-[#fffbeb]", dot: "bg-[#f59e0b]" },
  completed: { card: "border border-[#16a34a] bg-[#f0fdf4]", dot: "bg-[#16a34a]" },
  failed: { card: "border-2 border-[#dc2626] bg-[#fef2f2]", dot: "bg-[#dc2626]" },
  skipped: { card: "border border-dashed border-[#d1d5db] bg-[#f9fafb] opacity-50", dot: "bg-[#d1d5db]" }
}, Ga = {
  source: { bar: "bg-cat-source", chip: "w-5 h-5 rounded-full bg-cat-source/15" },
  transform: { bar: "bg-cat-transform", chip: "w-5 h-5 rounded-md bg-cat-transform/15" },
  ai: { bar: "bg-cat-ai", chip: "w-5 h-5 rounded-md bg-gradient-to-br from-cat-ai/25 to-cat-ai/5" },
  control: { bar: "bg-cat-control", chip: "w-5 h-5 rounded-[4px] bg-cat-control/15 rotate-45", glyph: "-rotate-45" },
  sink: { bar: "bg-cat-sink", chip: "w-5 h-5 rounded-md bg-cat-sink/15" },
  human: { bar: "bg-cat-human", chip: "w-7 h-5 rounded-full bg-cat-human/15" }
};
function ge(t) {
  const n = Io(), r = t.nodeType ? !n(t.nodeType) : !1, { icon: i, subtitle: a, state: s, body: d, footer: c, selected: l, onRetry: p, hasBreakpoint: u, pausedAtBreakpoint: h, ariaLabel: m, category: g, children: x } = t, f = Ka[s], N = g ? Ga[g] : void 0, v = Xn(), [b, w] = S(!1), y = s === "failed" && typeof p == "function", k = (O) => {
    O.preventDefault(), O.stopPropagation(), p?.();
  }, C = !v && s === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !v && s === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", $ = !!(d || c || y), A = !!(d || c), D = a ? `${a}, state: ${s}` : `Node, state: ${s}`;
  return /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        h ? "border-2 border-[#d97706] bg-[#fffbeb] shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]" : f.card,
        !h && l && "shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]",
        !h && !l && "shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
        v && "transition-none"
      ),
      role: "button",
      tabIndex: 0,
      "aria-label": m ?? D,
      "aria-selected": !!l,
      "data-state": s,
      "data-node-state": s,
      "data-node-category": g,
      "data-pipeline-node": "true",
      children: [
        N && /* @__PURE__ */ e(
          "span",
          {
            "aria-hidden": "true",
            "data-testid": "category-accent",
            className: I(
              "absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[7px] pointer-events-none",
              N.bar
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
          N ? /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": "true",
              "data-testid": "category-chip",
              className: I("flex items-center justify-center shrink-0", N.chip),
              children: /* @__PURE__ */ e("span", { className: I("text-xs leading-none", N.glyph), children: i })
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
          A && "border-b border-border"
        ), children: /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: I(
              "cursor-pointer appearance-none font-inherit text-[11px] font-medium leading-tight px-2 py-0.5 rounded-full border border-[#dc2626] text-[#dc2626] transition-colors duration-[120ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              b ? "bg-[#fef2f2]" : "bg-transparent",
              v && "transition-none"
            ),
            onClick: k,
            onMouseDown: (O) => O.stopPropagation(),
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
const Ya = {
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
  return Ya[t];
}
const Xa = {
  image: "!w-2.5 !h-2.5 !rounded-sm !bg-[#7c3aed] !border-[#6d28d9]",
  text: "!w-2.5 !h-2.5 !bg-surface-emphasis",
  data: "!w-2.5 !h-2.5 !bg-[#94a3b8]",
  control: "!w-2 !h-2 !bg-warning",
  error: "!w-2 !h-2 !bg-danger"
};
function F(t) {
  return Xa[t];
}
function pr(t) {
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
function Qa(t) {
  return t.triggerType === "schedule" ? t.schedule ? `cron: ${t.schedule}` : "No schedule set" : t.triggerType === "webhook" ? t.webhookPath ? `POST ${t.webhookPath}` : "No path set" : t.triggerType.startsWith("document.") ? t.documentTypeId ? `Doc type: ${t.documentTypeId}` : "Any document" : "Fires on user click";
}
function Za(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = c === "failed" ? () => l(n) : void 0, u = `Trigger node, ${pr(r)}, state: ${c}`;
  return /* @__PURE__ */ e(
    ge,
    {
      icon: "▶",
      subtitle: pr(r),
      state: c,
      category: fe("trigger"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: Qa(r) }),
      selected: i,
      onRetry: p,
      ariaLabel: u,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
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
function ei(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const r = t.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
function ti({ info: t }) {
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
function ni(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.llm, p = c === "running" && l?.streamOpened === !0 && (l?.tokensOut ?? 0) === 0, u = c === "running" && l !== void 0 && (l.tokensOut ?? 0) > 0, h = Ae(), m = c === "failed" ? () => h(n) : void 0, g = /* @__PURE__ */ e("span", { className: "italic", children: ei(r.userPromptTemplate) }), f = (l ? {
    response: l.response ?? "",
    tokensIn: l.tokensIn,
    tokensOut: l.tokensOut,
    streaming: u,
    streamOpening: p
  } : void 0) ?? r._llmResponse, N = f ? /* @__PURE__ */ e(ti, { info: f }) : void 0, v = (r.systemPrompt ?? "").replace(/\s+/g, " ").trim(), b = v.length === 0 ? "no system prompt" : `system prompt: ${v.length > 60 ? `${v.slice(0, 60)}…` : v}`, w = `LLM node, ${r.model || r.provider}, ${b}, state: ${c}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "🧠",
      subtitle: r.model || r.provider,
      state: c,
      category: fe("llm"),
      body: g,
      footer: N,
      selected: i,
      onRetry: m,
      ariaLabel: w,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: `${F("text")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !top-[60%]` })
      ]
    }
  );
}
function ri(t) {
  if (!t) return "—";
  const n = t.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function oi(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "✨",
      subtitle: r.transformType,
      state: c,
      category: fe("transform"),
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: ri(r.expression) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") })
      ]
    }
  );
}
function ai(t) {
  if (!t) return "—";
  const n = t.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function ii(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "❓",
      subtitle: r.label || "condition",
      state: c,
      category: fe("condition"),
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: ai(r.expression) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "true", className: `${F("control")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "false", className: `${F("control")} !top-[60%]` })
      ]
    }
  );
}
function si(t) {
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
function li(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⚡",
      subtitle: r.actionType,
      state: c,
      category: fe("action"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: si(r) }),
      selected: i,
      onRetry: p,
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
function ci(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = c === "failed" ? () => l(n) : void 0, u = Math.max(2, Math.min(8, r.branchCount ?? 2)), h = Array.from({ length: u }, (m, g) => {
    const x = r.branchLabels?.[g];
    return x && x.trim().length > 0 ? x : `branch ${g}`;
  });
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⑂",
      subtitle: `${u} branches`,
      state: c,
      category: fe("fork"),
      body: /* @__PURE__ */ e("ul", { className: "m-0 p-0 list-none flex flex-col gap-0.5 text-xs text-text-secondary", children: h.map((m, g) => /* @__PURE__ */ o("li", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: [
        "• ",
        m
      ] }, g)) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        h.map((m, g) => {
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
function di(t) {
  return t.mode === "all" ? "all" : t.mode === "any" ? "any" : `${t.n ?? 1} of many`;
}
function pi(t) {
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
function ui(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = c === "failed" ? () => l(n) : void 0, u = Ta({ handleType: "target" }), h = Math.max(2, u.length + 1);
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⑃",
      subtitle: di(r),
      state: c,
      category: fe("join"),
      body: /* @__PURE__ */ e("span", { className: "italic", children: pi(r.mergeStrategy) }),
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        Array.from({ length: h }, (m, g) => {
          const x = (g + 1) / (h + 1) * 100;
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
function mi(t) {
  return t.type === "role" ? `@${t.value}` : t.value;
}
function hi(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = c === "failed" ? () => l(n) : void 0, u = r.approvers ?? [], h = u.length, m = r.requiredCount ?? 0, g = `${h} approver${h === 1 ? "" : "s"}, ${m}/${h} required`, x = u.slice(0, 2), f = Math.max(0, u.length - 2), N = u.length === 0 ? /* @__PURE__ */ e("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: [
    x.map((v, b) => /* @__PURE__ */ e(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: mi(v)
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
    ge,
    {
      icon: "✋",
      subtitle: g,
      state: c,
      category: fe("approval"),
      body: N,
      selected: i,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "approved", className: `${F("data")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "rejected", className: `${F("data")} !top-[60%]` })
      ]
    }
  );
}
function fi({ id: t, data: n, selected: r }) {
  const i = me(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Ae(), c = n.agentName || n.agentId || "Not configured", l = `${n.protocol.toUpperCase()}${n.streaming ? " (streaming)" : ""}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "🤖",
      subtitle: c,
      state: s,
      category: fe("agent"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(t) : void 0,
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
function gi({ id: t, data: n, selected: r }) {
  const i = me(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Ae(), c = n.toolName || "Not configured";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "🔌",
      subtitle: c,
      state: s,
      category: fe("mcp-tool"),
      body: n.gatewayUrl ? /* @__PURE__ */ e("span", { className: "text-[11px]", children: n.gatewayUrl }) : void 0,
      selected: r,
      onRetry: s === "failed" && i ? () => d(t) : void 0,
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
function xi({ id: t, data: n, selected: r }) {
  const i = me(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Ae(), c = n.knowledgeBaseId || "Not configured", l = `Top ${n.topK} chunks${n.scoreThreshold ? ` (≥${n.scoreThreshold})` : ""}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "📚",
      subtitle: c,
      state: s,
      category: fe("knowledge-base"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(t) : void 0,
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
function bi({ id: t, data: n, selected: r }) {
  const i = me(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Ae(), c = n.graphId || "Not configured", l = n.query.length > 40 ? `${n.query.slice(0, 37)}...` : n.query;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "🕸️",
      subtitle: c,
      state: s,
      category: fe("graph-query"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px] font-mono", children: l }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(t) : void 0,
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
function yi({ id: t, data: n, selected: r }) {
  const i = me(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Ae(), c = `${n.mode} ${n.scope}`, l = n.namespace ? `ns: ${n.namespace}` : "No namespace";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "💾",
      subtitle: c,
      state: s,
      category: fe("memory"),
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(t) : void 0,
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
function vi({ id: t, data: n, selected: r }) {
  const i = me(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Ae(), c = n.label || n.guardrailId || "Not configured";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "🛡️",
      subtitle: c,
      state: s,
      category: fe("guardrail"),
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        "Action: ",
        n.action
      ] }),
      selected: r,
      onRetry: s === "failed" && i ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "pass", className: `${F("control")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "block", className: `${F("control")} !top-[60%]` })
      ]
    }
  );
}
function Ni({ id: t, data: n, selected: r }) {
  const i = me(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = Ae(), c = n.label || n.action || "Not configured";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "📜",
      subtitle: c,
      state: s,
      category: fe("policy"),
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
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "allow", className: `${F("control")} !top-[40%]` }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "deny", className: `${F("control")} !top-[60%]` })
      ]
    }
  );
}
function wi({ id: t, data: n, selected: r }) {
  const i = me(t), a = i?.status === "cancelled" ? "failed" : i?.status, s = n._state ?? a ?? "idle", d = n.eventType === "CUSTOM" ? n.customEventName || "Custom" : n.eventType;
  return /* @__PURE__ */ e(
    ge,
    {
      icon: "📡",
      subtitle: d,
      state: s,
      category: fe("ag-ui-output"),
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        "Source: ",
        n.sourceField
      ] }),
      footer: /* @__PURE__ */ e("span", { className: "text-[10px] text-[#6366f1]", children: "Terminal — streams to AG-UI frontend" }),
      selected: r,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") })
    }
  );
}
const ki = (t) => t.stopPropagation();
function Ci(t) {
  const { id: n, data: r, selected: i } = t, [a, s] = S(!1), d = me(n), c = d?.status === "cancelled" ? "failed" : d?.status, p = (r._state && r._state !== "idle" ? r._state : void 0) ?? c ?? r._state ?? "idle", u = Te(), m = d?.images?.[0]?.imageId ?? d?.output?.imageId ?? r.imageId, g = m ? /* @__PURE__ */ o(V, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "aria-label": "View source image",
        className: I(
          "block w-full rounded border-none bg-transparent p-0 cursor-zoom-in",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
        ),
        onMouseDown: ki,
        onClick: (f) => {
          f.stopPropagation(), s(!0);
        },
        children: /* @__PURE__ */ e(
          "img",
          {
            src: u(m),
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
      vt,
      {
        images: [{ src: u(m), alt: "Source image" }],
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
  ), x = m ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-[#6b7280]", children: [
    m.slice(0, 16),
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
      selected: i,
      ariaLabel: `Image Source node, state: ${p}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
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
const ur = (t) => t.stopPropagation(), mr = I(
  "h-[38px] w-[38px] shrink-0 overflow-hidden rounded border border-border bg-surface-inset",
  "p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
);
function dn({
  images: t,
  max: n = 4,
  "data-testid": r = "node-thumb-strip"
}) {
  const i = Te(), [a, s] = S(null);
  if (t.length === 0) return null;
  const d = t.length > n, c = d ? t.slice(0, n - 1) : t, l = t.length - c.length, p = (u) => (h) => {
    h.stopPropagation(), s(u);
  };
  return /* @__PURE__ */ o(V, { children: [
    /* @__PURE__ */ o("div", { "data-testid": r, className: "flex flex-row items-center gap-1", children: [
      c.map((u, h) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          "data-testid": `${r}-thumb-${h}`,
          "aria-label": u.alt ?? `Result image ${h + 1} of ${t.length}`,
          className: mr,
          onMouseDown: ur,
          onClick: p(h),
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
        `${u.imageId}-${h}`
      )),
      d && /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          "data-testid": `${r}-overflow`,
          "aria-label": `Show all ${t.length} images`,
          className: I(
            mr,
            "flex items-center justify-center font-mono text-[11px] font-medium text-text-secondary"
          ),
          onMouseDown: ur,
          onClick: p(c.length),
          children: [
            "+",
            l
          ]
        }
      )
    ] }),
    /* @__PURE__ */ e(
      vt,
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
function Ii(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.images ?? [], u = a?.output?.filename ?? null, h = l.length > 0 ? /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ e(dn, { images: l, "data-testid": "save-thumb-strip" }),
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
  ), m = r.filenameTemplate ?? "crop-{{scatter.index}}.png", g = m.length > 28 ? `${m.slice(0, 25)}…` : m, x = /* @__PURE__ */ e(
    "span",
    {
      className: "font-mono text-[11px] text-[#6b7280]",
      "data-testid": "save-footer",
      title: m,
      children: g
    }
  ), f = "image:save", N = `Save node, template: ${m}, state: ${c}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⬇",
      subtitle: f,
      state: c,
      category: fe("image:save"),
      body: h,
      footer: x,
      selected: i,
      ariaLabel: N,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
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
function Si(t) {
  return t ? t.length > 40 ? `${t.slice(0, 37)}…` : t : "Not configured";
}
function $i(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.output, p = Array.isArray(l?.items) ? l.items.length : null, u = /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary break-all", children: Si(r.itemsPath ?? "") }),
    p !== null && /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", children: [
      p,
      " item",
      p === 1 ? "" : "s",
      " resolved"
    ] })
  ] }), h = p, m = h !== null && c !== "idle" ? /* @__PURE__ */ o("span", { className: "inline-block text-[11px] font-semibold text-info-fg bg-info-bg border border-info rounded-full px-2 py-0.5", children: [
    "Dispatched ",
    h,
    " arm",
    h === 1 ? "" : "s"
  ] }) : void 0, g = r.itemAlias ? ` · alias: ${r.itemAlias}` : "", x = r.maxConcurrency ? ` · max ${r.maxConcurrency}` : "", f = `scatter${g}${x}`, N = `Scatter node, path: ${r.itemsPath ?? "not set"}, state: ${c}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⑂",
      subtitle: f,
      state: c,
      category: fe("scatter"),
      body: u,
      footer: m,
      selected: i,
      ariaLabel: N,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("control") })
      ]
    }
  );
}
function Ti(t) {
  const { id: n, data: r, selected: i } = t, a = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.width != null && r.height != null ? `→ ${r.width}×${r.height}` : r.width != null ? `→ ${r.width}w` : r.height != null ? `→ ${r.height}h` : null, h = p ? /* @__PURE__ */ e(
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
  ), m = u ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    u,
    r.fit ? ` · ${r.fit}` : ""
  ] }) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⥂",
      subtitle: "image:resize",
      state: l,
      category: fe("image:resize"),
      body: h,
      footer: m,
      selected: i,
      ariaLabel: `Resize node, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ri(t) {
  switch (t.op) {
    case "rotate":
      return `rotate ${t.degrees}°`;
    case "flip":
      return "flip ↕";
    case "flop":
      return "flop ↔";
  }
}
function Pi(t) {
  const { id: n, data: r, selected: i } = t, a = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.operations ?? [], h = u.length > 0 ? u.map(Ri).join("  ›  ") : null, m = p ? /* @__PURE__ */ e(
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
      children: h ?? "No ops configured"
    }
  ), g = h ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-tertiary", children: h }) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "↻",
      subtitle: "image:transform",
      state: l,
      category: fe("image:transform"),
      body: m,
      footer: g,
      selected: i,
      ariaLabel: `Transform node, ops: ${u.length}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ai(t) {
  const n = t.format?.toUpperCase() ?? "?", r = t.lossless ? "lossless" : t.quality != null ? `q${t.quality}` : "";
  return r ? `${n} ${r}` : n;
}
function Di(t) {
  const { id: n, data: r, selected: i } = t, a = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.format ? Ai(r) : null, h = p ? /* @__PURE__ */ e(
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
  ), m = u ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary", children: u }) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⇌",
      subtitle: "image:format-convert",
      state: l,
      category: fe("image:format-convert"),
      body: h,
      footer: m,
      selected: i,
      ariaLabel: `Format Convert node, format: ${r.format ?? "unset"}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Mi(t) {
  const { id: n, data: r, selected: i } = t, a = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.sigma != null ? `σ ${r.sigma}` : null, h = p ? /* @__PURE__ */ e(
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
  ), m = u ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary", children: u }) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "◈",
      subtitle: "image:sharpen",
      state: l,
      category: fe("image:sharpen"),
      body: h,
      footer: m,
      selected: i,
      ariaLabel: `Sharpen node, sigma: ${r.sigma ?? "default"}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Oi(t) {
  const { id: n, data: r, selected: i } = t, a = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.gravity ?? "southeast", h = r.opacity != null ? `${Math.round(r.opacity * 100)}%` : "100%", m = p ? /* @__PURE__ */ e(
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
      children: r.overlayImageId ? `${u} · ${h}` : "No overlay image set"
    }
  ), g = r.overlayImageId ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    u,
    " · ",
    h
  ] }) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⊕",
      subtitle: "image:watermark",
      state: l,
      category: fe("image:watermark"),
      body: m,
      footer: g,
      selected: i,
      ariaLabel: `Watermark node, gravity: ${u}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ei(t) {
  if (!t) return null;
  const n = t.x + t.width, r = t.y + t.height;
  return `[${t.x},${t.y} → ${n},${r}]`;
}
function _i(t) {
  const { id: n, data: r, selected: i } = t, a = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = s?.output, h = Ei(p?.bbox ?? u?.bbox), m = p ? /* @__PURE__ */ e(
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
  ), g = h ? /* @__PURE__ */ e(
    "span",
    {
      className: "font-mono text-[11px] text-text-tertiary",
      "data-testid": "crop-bbox-coords",
      children: h
    }
  ) : void 0, x = `Crop node, source: ${r.sourceImagePath ?? "default"}, state: ${l}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "✂",
      subtitle: "image:crop",
      state: l,
      category: fe("image:crop"),
      body: m,
      footer: g,
      selected: i,
      ariaLabel: x,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") })
      ]
    }
  );
}
function Li(t) {
  const { id: n, data: r, selected: i } = t, a = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e("div", { className: "flex gap-1 w-full", children: /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
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
  ), h = r.algorithm ?? "luminosity", m = r.contrast ?? 1, g = /* @__PURE__ */ o(
    "span",
    {
      className: "font-mono text-[11px] text-text-tertiary",
      "data-testid": "adjust-bw-footer",
      children: [
        h,
        " · contrast ",
        m
      ]
    }
  ), x = `Adjust B/W node, algorithm: ${h}, state: ${l}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "◐",
      subtitle: "image:adjust-bw",
      state: l,
      category: fe("image:adjust-bw"),
      body: u,
      footer: g,
      selected: i,
      ariaLabel: x,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !top-[75%]` })
      ]
    }
  );
}
function Bi(t) {
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
function Ui(t) {
  const { id: n, data: r, selected: i } = t, a = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.layers ?? [], h = p ? /* @__PURE__ */ e(
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
          children: Bi(x)
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
  ), m = /* @__PURE__ */ o(
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
      body: h,
      footer: m,
      selected: i,
      ariaLabel: g,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !top-[75%]` })
      ]
    }
  );
}
function Fi(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.output ?? void 0, p = l?.genWidth != null && l?.genHeight != null ? `${l.genWidth}×${l.genHeight}` : null, u = p ? /* @__PURE__ */ o(
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
  ), h = /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "maxEdge ",
    r.maxEdge ?? 1024
  ] });
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "📐",
      subtitle: "image:dimensions",
      state: c,
      category: fe("image:dimensions"),
      body: u,
      footer: h,
      selected: i,
      ariaLabel: `Dimensions node, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function ji(t) {
  const { id: n, data: r, selected: i } = t, a = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = `≤ ${r.maxEdge ?? 1024}px → 4×`, h = p ? /* @__PURE__ */ e(
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
  ), m = /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-tertiary", children: u });
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⤢",
      subtitle: "image:upscale",
      state: l,
      category: fe("image:upscale"),
      body: h,
      footer: m,
      selected: i,
      ariaLabel: `Upscale node, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function zi(t) {
  return t === 0 ? "$0" : t < 1e-3 ? "<$0.001" : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function qi(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const r = t.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
const Wi = (t) => t.stopPropagation(), Vi = sa(function({ info: n }) {
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
            zi(n.costUsd)
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
    n.imageId && /* @__PURE__ */ o(V, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          "aria-label": "View vision input image",
          className: I(
            "mt-1.5 block h-14 w-14 overflow-hidden rounded border border-border bg-surface-inset",
            "p-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-info"
          ),
          onMouseDown: Wi,
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
        vt,
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
function Ji(t) {
  const { id: n, data: r, selected: i } = t, a = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = Ae(), u = l === "failed" ? () => p(n) : void 0, h = /* @__PURE__ */ e("span", { className: "italic text-text-secondary text-[13px]", children: qi(r.userPrompt) }), m = s?.vision, g = l === "running" && m !== void 0 && m.tokensSeen > 0 && !m.analyzed, x = l === "running" && m !== void 0 && m.tokensSeen === 0 && !m.failure, f = m ? {
    response: m.response,
    tokensIn: m.tokensIn,
    tokensOut: m.tokensOut,
    streaming: g,
    awaiting: x,
    ...m.failure ? { failure: m.failure } : {},
    ...m.imageId ? { imageId: m.imageId } : {},
    ...typeof m.costUsd == "number" ? { costUsd: m.costUsd } : {},
    ...u ? { onRetry: u } : {},
    getImageUrl: a
  } : void 0, N = f ? /* @__PURE__ */ e(Vi, { info: f }) : void 0, v = r.model || "claude-sonnet-4-6", b = r.outputSchema ? "extract" : "caption", w = `Vision node, model ${v}, mode ${b}, state: ${l}`;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "📷",
      subtitle: `${v} · ${b}`,
      state: l,
      category: fe("image:vision-analyze"),
      body: h,
      footer: N,
      selected: i,
      onRetry: u,
      ariaLabel: w,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") })
      ]
    }
  );
}
function Hi(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = a?.output, p = l?.extracted?.label, u = l?.extracted?.confidence, h = (r.labels ?? []).slice(0, 4).join(", "), m = p ? /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 py-0.5", children: [
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
  ] }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: h ? `Labels: ${h}` : "No labels configured" }), g = r.model ?? "claude-haiku-4-5";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "🏷",
      subtitle: g,
      state: c,
      category: fe("image:vision-classify"),
      body: m,
      selected: i,
      ariaLabel: `Vision Classify node, model: ${g}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Ki(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", p = a?.output?.extracted?.caption, u = p ? p.length > 80 ? `${p.slice(0, 77)}…` : p : null, h = r.userPrompt ? r.userPrompt.length > 60 ? `${r.userPrompt.slice(0, 57)}…` : r.userPrompt : "No prompt set", m = u ? /* @__PURE__ */ e(
    "span",
    {
      className: "text-[11px] text-text-primary leading-snug",
      "data-testid": "describe-caption",
      children: u
    }
  ) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: h }), g = r.model ?? "claude-haiku-4-5";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "💬",
      subtitle: g,
      state: c,
      category: fe("image:vision-describe"),
      body: m,
      selected: i,
      ariaLabel: `Vision Describe node, model: ${g}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Gi(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", u = (a?.output?.extracted?.tags ?? []).slice(0, 5), h = (r.candidateTags ?? []).slice(0, 3).join(", "), m = u.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", "data-testid": "tag-pills", children: u.map((x) => /* @__PURE__ */ e(
    "span",
    {
      className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded-full px-1.5 py-0.5 text-text-secondary whitespace-nowrap",
      children: x
    },
    x
  )) }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: h ? `Candidates: ${h}…` : "Open-vocabulary tagging" }), g = r.model ?? "claude-haiku-4-5";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "🔖",
      subtitle: g,
      state: c,
      category: fe("image:vision-tag"),
      body: m,
      selected: i,
      ariaLabel: `Vision Tag node, model: ${g}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Yi(t) {
  const { id: n, data: r, selected: i } = t, a = me(n), s = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", p = a?.output?.extracted?.lines ?? [], u = p[0], h = p.length > 0 ? /* @__PURE__ */ o("div", { "data-testid": "extract-text-result", children: [
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
  ] }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: "Awaiting OCR" }), m = r.model ?? "claude-sonnet-4-6";
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "📝",
      subtitle: m,
      state: c,
      category: fe("image:vision-extract-text"),
      body: h,
      selected: i,
      ariaLabel: `Vision Extract Text node, model: ${m}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function Xi(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
const Qi = (t) => t.stopPropagation();
function Zi(t) {
  const { id: n, data: r, selected: i } = t, a = Te(), [s, d] = S(!1), c = me(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", h = c?.images ?? [], m = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && h.length === 0, x = (r.numImages ?? 1) > 1 || h.length > 1;
  let f;
  if (h.length > 0 && x)
    f = /* @__PURE__ */ e(dn, { images: h, "data-testid": "generate-thumb-strip" });
  else if (g || h.length === 1) {
    const w = h[0] ? a(h[0].imageId) : void 0;
    f = /* @__PURE__ */ o(V, { children: [
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
          onMouseDown: Qi,
          onClick: (y) => {
            y.stopPropagation(), w && d(!0);
          },
          children: /* @__PURE__ */ e(
            Gn,
            {
              status: g ? "synthesizing" : "done",
              ...w ? { src: w } : {},
              alt: "Generate output",
              ...g && Number.isFinite(m) ? { startedAt: m } : {},
              className: "w-full h-20"
            }
          )
        }
      ),
      w && /* @__PURE__ */ e(
        vt,
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
        children: Xi(r.prompt)
      }
    );
  const N = (r.numImages ?? 1) > 1 ? `×${r.numImages}` : null, v = r.width && r.height ? `${r.width}×${r.height}` : null, b = N || v ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-tertiary", children: [v, N].filter(Boolean).join(" · ") }) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "✦",
      subtitle: "image:generate",
      state: u,
      category: fe("image:generate"),
      body: f,
      footer: b,
      selected: i,
      ariaLabel: `Generate node, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("data") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
const es = (t) => t.stopPropagation();
function ts(t) {
  const { id: n, data: r, selected: i } = t, a = Te(), [s, d] = S(!1), c = me(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", h = c?.images ?? [], m = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && h.length === 0, x = r.numVariations ?? 1, f = x > 1 || h.length > 1, N = /* @__PURE__ */ o("span", { className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary mb-1", children: [
    "×",
    x,
    " variation",
    x !== 1 ? "s" : ""
  ] });
  let v;
  if (h.length > 0 && f)
    v = /* @__PURE__ */ e(dn, { images: h, "data-testid": "variation-thumb-strip" });
  else if (g || h.length === 1) {
    const y = h[0] ? a(h[0].imageId) : void 0;
    v = /* @__PURE__ */ o(V, { children: [
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
          onMouseDown: es,
          onClick: (k) => {
            k.stopPropagation(), y && d(!0);
          },
          children: /* @__PURE__ */ e(
            Gn,
            {
              status: g ? "synthesizing" : "done",
              ...y ? { src: y } : {},
              alt: "Variation output",
              ...g && Number.isFinite(m) ? { startedAt: m } : {},
              className: "w-full h-20"
            }
          )
        }
      ),
      y && /* @__PURE__ */ e(
        vt,
        {
          images: [{ src: y, alt: "Variation output" }],
          openIndex: s ? 0 : null,
          onClose: () => d(!1)
        }
      )
    ] });
  } else
    v = /* @__PURE__ */ e(
      "div",
      {
        className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
        "data-testid": "variation-placeholder",
        children: "Awaiting input"
      }
    );
  const b = /* @__PURE__ */ o("div", { children: [
    N,
    v
  ] }), w = r.similarity != null ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "similarity ",
    r.similarity
  ] }) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "⊞",
      subtitle: "image:variation",
      state: u,
      category: fe("image:variation"),
      body: b,
      footer: w,
      selected: i,
      ariaLabel: `Variation node, ${x} variations, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
function ns(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
const rs = (t) => t.stopPropagation();
function os(t) {
  const { id: n, data: r, selected: i } = t, a = Te(), [s, d] = S(!1), c = me(n), l = c?.status === "cancelled" ? "failed" : c?.status, u = (r._state && r._state !== "idle" ? r._state : void 0) ?? l ?? r._state ?? "idle", h = c?.images ?? [], m = c?.startedAt ? Date.parse(c.startedAt) : NaN, g = u === "running" && h.length === 0, x = h.length > 1;
  let f;
  if (x)
    f = /* @__PURE__ */ e(dn, { images: h, "data-testid": "edit-prompt-thumb-strip" });
  else if (g || h.length === 1) {
    const v = h[0] ? a(h[0].imageId) : void 0;
    f = /* @__PURE__ */ o(V, { children: [
      /* @__PURE__ */ e(
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
          onMouseDown: rs,
          onClick: (b) => {
            b.stopPropagation(), v && d(!0);
          },
          children: /* @__PURE__ */ e(
            Gn,
            {
              status: g ? "synthesizing" : "done",
              ...v ? { src: v } : {},
              alt: "Edit output",
              ...g && Number.isFinite(m) ? { startedAt: m } : {},
              className: "w-full h-20"
            }
          )
        }
      ),
      v && /* @__PURE__ */ e(
        vt,
        {
          images: [{ src: v, alt: "Edit output" }],
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
        children: ns(r.prompt)
      }
    );
  const N = r.maskImagePath ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "mask: ",
    r.maskImagePath
  ] }) : void 0;
  return /* @__PURE__ */ o(
    ge,
    {
      icon: "✎",
      subtitle: "image:edit-prompt",
      state: u,
      category: fe("image:edit-prompt"),
      body: f,
      footer: N,
      selected: i,
      ariaLabel: `Edit Prompt node, state: ${u}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: F("image") }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: `${F("error")} !bottom-2 !top-auto` })
      ]
    }
  );
}
const as = {
  trigger: Za,
  llm: ni,
  transform: oi,
  condition: ii,
  action: li,
  fork: ci,
  join: ui,
  approval: hi,
  agent: fi,
  "mcp-tool": gi,
  "knowledge-base": xi,
  "graph-query": bi,
  memory: yi,
  guardrail: vi,
  policy: Ni,
  "ag-ui-output": wi,
  "image-source": Ci,
  "image:save": Ii,
  scatter: $i,
  "image:resize": Ti,
  "image:transform": Pi,
  "image:format-convert": Di,
  "image:sharpen": Mi,
  "image:watermark": Oi,
  "image:crop": _i,
  "image:adjust-bw": Li,
  "image:adjust-layer": Ui,
  "image:dimensions": Fi,
  "image:upscale": ji,
  "image:vision-analyze": Ji,
  "image:vision-classify": Hi,
  "image:vision-describe": Ki,
  "image:vision-tag": Gi,
  "image:vision-extract-text": Yi,
  "image:generate": Zi,
  "image:variation": ts,
  "image:edit-prompt": os
}, is = "#c4b5fd";
function ss(t) {
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
function ls({
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
  const u = c ?? {}, h = Xn(), [m, g, x] = Ra({
    sourceX: n,
    sourceY: r,
    targetX: i,
    targetY: a,
    sourcePosition: s,
    targetPosition: d
  }), f = ss(u.state), N = (u.state ?? "default") === "default", v = u.payload, b = f.animate && !h;
  let w = f.stroke, y = f.strokeWidth, k = b ? f.strokeDasharray : void 0;
  v === "image" ? (y = 2.5, N && (w = is)) : v === "control" && (y = 1.5, N && (k = "2 4"));
  const C = u.volume, $ = typeof C == "number" && C >= 2;
  $ && (y = Math.min(4, y + Math.log2(C)));
  const A = p ? "#646cff" : w, D = p ? Math.max(2.5, y) : y, O = v === "image" && u.state === "active" && !h;
  return /* @__PURE__ */ o(V, { children: [
    /* @__PURE__ */ e(
      "path",
      {
        d: m,
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
        d: m,
        fill: "none",
        stroke: A,
        strokeWidth: D,
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
    O ? /* @__PURE__ */ e("circle", { r: 3, fill: A, className: "pointer-events-none", children: /* @__PURE__ */ e("animateMotion", { dur: "1.2s", repeatCount: "indefinite", path: m }) }) : null,
    u.label ? /* @__PURE__ */ e(dr, { children: /* @__PURE__ */ e(
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
    $ ? /* @__PURE__ */ e(dr, { children: /* @__PURE__ */ e(
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
function gt(t, n, r) {
  const i = ce(n);
  i.current = n, re(() => {
    if (r === !1) return;
    const a = (s) => {
      t.current && !t.current.contains(s.target) && i.current();
    };
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [t, r]);
}
const cs = [
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
function ds(t, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return t.type.toLowerCase().includes(r) || t.name.toLowerCase().includes(r) || t.description.toLowerCase().includes(r);
}
function ps({
  anchor: t,
  flowPosition: n,
  disabledTypes: r = [],
  onClose: i,
  onInsert: a
}) {
  const [s, d] = S(""), [c, l] = S(0), p = ce(null), u = ce(null), h = z(() => new Set(r), [r]), m = z(
    () => cs.filter((f) => !h.has(f.type) && ds(f, s)),
    [h, s]
  );
  if (re(() => {
    l((f) => f >= m.length ? 0 : f);
  }, [m.length]), re(() => {
    if (t) {
      const f = setTimeout(() => u.current?.focus(), 0);
      return () => clearTimeout(f);
    }
  }, [t]), gt(p, i, !!t), !t) return null;
  const g = (f) => {
    const N = m[f];
    !N || !n || (a(N.type, n), i());
  }, x = (f) => {
    if (f.key === "ArrowDown") {
      if (f.preventDefault(), m.length === 0) return;
      l((N) => (N + 1) % m.length);
    } else if (f.key === "ArrowUp") {
      if (f.preventDefault(), m.length === 0) return;
      l((N) => (N - 1 + m.length) % m.length);
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
        /* @__PURE__ */ e("div", { className: "max-h-[260px] overflow-y-auto py-1", role: "listbox", children: m.length === 0 ? /* @__PURE__ */ o("div", { className: "px-3 py-3.5 text-xs text-[#94a3b8] font-inherit", children: [
          'No nodes match "',
          s,
          '"'
        ] }) : m.map((f, N) => {
          const v = N === c;
          return /* @__PURE__ */ o(
            "div",
            {
              role: "option",
              "aria-selected": v,
              onMouseEnter: () => l(N),
              onMouseDown: (b) => {
                b.preventDefault(), g(N);
              },
              className: I(
                "flex items-center gap-2.5 px-3 py-2 cursor-pointer font-inherit",
                v ? "bg-[#f1f5f9]" : "bg-transparent"
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
function us({
  addNode: t,
  addEdge: n,
  updateNodeData: r,
  getDefinition: i
}) {
  re(() => {
  }, [t, n, r, i]);
}
function ms({
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
    const h = u.current;
    if (!h) return;
    const m = (x) => {
      const f = h.querySelector(
        `.react-flow__node[data-id="${CSS.escape(x)}"]`
      );
      return f ? ((f.querySelector('[data-pipeline-node="true"]') ?? f).focus(), !0) : !1;
    }, g = (x) => {
      if (tr(x.target)) return;
      const f = document.activeElement, N = !!f && h.contains(f);
      if (x.key === "Tab") {
        if (!N || !t || t.nodes.length === 0) return;
        const v = Os(t);
        if (v.length === 0) return;
        const w = f?.closest(".react-flow__node")?.getAttribute("data-id") ?? null, y = w !== null ? v.indexOf(w) : -1, k = x.shiftKey ? -1 : 1, C = y === -1 ? x.shiftKey ? v.length - 1 : 0 : (y + k + v.length) % v.length, $ = v[C];
        m($) && x.preventDefault();
        return;
      }
      if (N && !x.altKey) {
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
          d((v) => {
            const b = v.filter((w) => w.selected);
            if (b.length === 0) return v;
            for (const w of b) a(w.id);
            return v.filter((w) => !w.selected);
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
          const v = 8, b = x.key === "ArrowLeft" ? -v : x.key === "ArrowRight" ? v : 0, w = x.key === "ArrowUp" ? -v : x.key === "ArrowDown" ? v : 0;
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
    return h.addEventListener("keydown", g), () => h.removeEventListener("keydown", g);
  }, [t, n, r, i, a, s, d, c, l, p, u]);
}
function hs({
  addNode: t,
  screenToFlowPosition: n
}) {
  const r = M((a) => {
    a.preventDefault(), a.dataTransfer.dropEffect = "move";
  }, []), i = M(
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
function fs({
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
    const p = (h) => {
      h.target?.closest('[data-testid="canvas-node-context-menu"]') || c();
    }, u = (h) => {
      h.key === "Escape" && c();
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
const gs = [
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
], xs = [
  { key: "source", name: "Sources" },
  { key: "transform", name: "Transform" },
  { key: "ai", name: "AI" },
  { key: "control", name: "Control" },
  { key: "sink", name: "Sinks" },
  { key: "human", name: "Human" }
], hn = {
  source: "bg-cat-source",
  transform: "bg-cat-transform",
  ai: "bg-cat-ai",
  control: "bg-cat-control",
  sink: "bg-cat-sink",
  human: "bg-cat-human"
}, Et = xs.map(({ key: t, name: n }) => ({
  key: t,
  name: n,
  items: gs.filter((r) => fe(r.type) === t).map((r) => ({ ...r, category: n, nodeCategory: t }))
})).filter((t) => t.items.length > 0), bs = Et.flatMap((t) => t.items.map((n) => ({ type: n.type, name: n.name }))), ys = Et.map((t) => t.name), er = "pipeline.palette.recents", vs = 5, hr = "pipeline.palette.compact";
function Un() {
  if (typeof window > "u") return [];
  try {
    const t = window.localStorage.getItem(er);
    if (!t) return [];
    const n = JSON.parse(t);
    return Array.isArray(n) ? n : [];
  } catch {
    return [];
  }
}
function Ns(t) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(er, JSON.stringify(t));
    } catch {
    }
}
function Fh(t) {
  const n = Un().filter((i) => i !== t), r = [t, ...n].slice(0, vs);
  Ns(r);
}
const Bo = "pipeline.palette.collapsed.";
function ws(t) {
  if (typeof window > "u") return !1;
  try {
    return window.localStorage.getItem(Bo + t) === "true";
  } catch {
    return !1;
  }
}
function ks(t, n) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(Bo + t, String(n));
    } catch {
    }
}
function Cs(t, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return t.name.toLowerCase().includes(r) || t.type.toLowerCase().includes(r) || t.description.toLowerCase().includes(r);
}
function fr({ expanded: t }) {
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
function Is({ disabledTypes: t = [] }) {
  const [n, r] = S(""), [i, a] = S(/* @__PURE__ */ new Set()), [s, d] = S(null), [c, l] = S(() => Un()), [p, u] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem(hr) === "true";
    } catch {
      return !1;
    }
  }), [h, m] = S(() => {
    const R = {};
    for (const J of Et)
      R[J.name] = ws(J.name);
    return R;
  }), g = z(() => new Set(t), [t]);
  re(() => {
    const R = (J) => {
      J.key === er && l(Un());
    };
    return window.addEventListener("storage", R), () => window.removeEventListener("storage", R);
  }, []), re(() => {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(hr, String(p));
      } catch {
      }
  }, [p]);
  const x = M((R) => {
    a((J) => {
      const Y = new Set(J);
      return Y.has(R) ? Y.delete(R) : Y.add(R), Y;
    });
  }, []), f = M(() => {
    r(""), a(/* @__PURE__ */ new Set());
  }, []), N = M((R) => {
    m((J) => {
      const Y = { ...J, [R]: !J[R] };
      return ks(R, Y[R]), Y;
    });
  }, []), v = z(() => {
    const R = /* @__PURE__ */ new Map();
    for (const J of Et)
      for (const Y of J.items) R.set(Y.type, Y);
    return R;
  }, []), b = z(
    () => c.map((R) => v.get(R)).filter(Boolean),
    [c, v]
  ), w = z(() => Et.map((R) => {
    const J = i.size > 0 && !i.has(R.name) ? [] : R.items.filter((Y) => Cs(Y, n));
    return { ...R, items: J };
  }).filter((R) => R.items.length > 0), [n, i]), y = z(() => {
    const R = /* @__PURE__ */ new Set(), J = [];
    if (!n && i.size === 0)
      for (const Y of b)
        J.push(Y), R.add(Y.type);
    for (const Y of w)
      for (const H of Y.items)
        R.has(H.type) || (J.push(H), R.add(H.type));
    return J;
  }, [b, w, n, i]), k = ce(y);
  re(() => {
    k.current = y;
  }, [y]);
  const C = w.length === 0 && (n !== "" || i.size > 0), $ = (R) => (J) => {
    if (g.has(R.type)) {
      J.preventDefault();
      return;
    }
    J.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: R.type })
    ), J.dataTransfer.effectAllowed = "move";
  }, A = Io(), D = (R, J) => {
    const Y = g.has(R.type), H = !A(R.type), Q = s === R.type && !Y, E = J !== null && J < 9 ? J + 1 : null;
    return p ? /* @__PURE__ */ o(
      "div",
      {
        draggable: !Y,
        onDragStart: $(R),
        onMouseEnter: () => d(R.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-8 box-border my-px mx-2 px-2 flex items-center gap-2 rounded font-[inherit]",
          Y ? "cursor-not-allowed opacity-45" : "cursor-grab",
          Q ? "bg-surface-hover" : "bg-transparent"
        ),
        title: Y ? `${R.name} is already placed` : H ? `${R.name} — preview: this deployment has no executor for it yet, so the step will not run.` : E ? `${R.description} — press ${E}` : R.description,
        "data-preview": H || void 0,
        "data-node-type": R.type,
        "data-disabled": Y || void 0,
        "data-testid": `palette-item-${R.type}`,
        children: [
          /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": !0,
              "data-testid": `palette-accent-${R.type}`,
              className: I("w-1.5 h-1.5 rounded-full shrink-0", R.nodeCategory && hn[R.nodeCategory])
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-base leading-none w-5 text-center shrink-0", "aria-hidden": !0, children: R.icon }),
          /* @__PURE__ */ e("span", { className: I("text-[12px] font-medium text-text-primary truncate", Y && "line-through"), children: R.name }),
          E !== null && /* @__PURE__ */ e(
            "kbd",
            {
              "data-testid": `palette-shortcut-${R.type}`,
              className: I(
                "ml-auto text-[10px] font-semibold font-mono text-neutral bg-surface-hover border border-border rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                Y && "opacity-50"
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
        draggable: !Y,
        onDragStart: $(R),
        onMouseEnter: () => d(R.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-11 box-border my-0.5 mx-2 py-1.5 px-2.5 flex items-center gap-2.5 rounded-md border border-transparent font-[inherit]",
          Y ? "cursor-not-allowed opacity-45" : "cursor-grab",
          Q ? "bg-surface-panel" : "bg-transparent"
        ),
        title: Y ? `${R.name} is already placed` : H ? `${R.name} — preview: this deployment has no executor for it yet, so the step will not run.` : E ? `${R.description} — press ${E}` : R.description,
        "data-preview": H || void 0,
        "data-node-type": R.type,
        "data-disabled": Y || void 0,
        "data-testid": `palette-item-${R.type}`,
        children: [
          /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": !0,
              "data-testid": `palette-accent-${R.type}`,
              className: I("w-1.5 h-1.5 rounded-full shrink-0", R.nodeCategory && hn[R.nodeCategory])
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: R.icon }),
          /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ o("div", { className: I("text-[13px] font-semibold text-text-primary flex items-center gap-1.5", Y && "line-through"), children: [
              /* @__PURE__ */ e("span", { className: "truncate", children: R.name }),
              H && /* @__PURE__ */ e(
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
                    Y && "opacity-50"
                  ),
                  children: E
                }
              )
            ] }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-neutral truncate", children: Y ? "Placed" : H ? "Preview — no executor" : R.description })
          ] })
        ]
      },
      R.type
    );
  }, O = b.length > 0 && !n && i.size === 0;
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
              children: ys.map((R) => /* @__PURE__ */ e(
                Oa,
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
          O && /* @__PURE__ */ o("div", { "data-testid": "palette-recents", children: [
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: () => N("__recents__"),
                className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
                "aria-expanded": !h.__recents__,
                children: [
                  /* @__PURE__ */ e(fr, { expanded: !h.__recents__ }),
                  "Recently used"
                ]
              }
            ),
            !h.__recents__ && /* @__PURE__ */ e("div", { children: b.map((R) => {
              const J = ne++;
              return D(R, J);
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
            const J = !!h[R.name];
            return /* @__PURE__ */ o("div", { "data-testid": `palette-category-${R.name}`, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => N(R.name),
                  className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-text-tertiary hover:text-text-secondary transition-colors font-[inherit]",
                  "aria-expanded": !J,
                  children: [
                    /* @__PURE__ */ e(fr, { expanded: !J }),
                    /* @__PURE__ */ e(
                      "span",
                      {
                        "aria-hidden": !0,
                        "data-testid": `palette-section-accent-${R.key}`,
                        className: I("w-1.5 h-1.5 rounded-full shrink-0", hn[R.key])
                      }
                    ),
                    R.name
                  ]
                }
              ),
              !J && /* @__PURE__ */ e("div", { children: R.items.map((Y) => {
                const H = ne++;
                return D(Y, H);
              }) })
            ] }, R.name);
          })
        ] }),
        /* @__PURE__ */ e("div", { className: "py-2 px-3 border-t border-border text-[10px] text-text-tertiary font-[inherit] shrink-0", children: "Press 1–9 to insert at center" })
      ]
    }
  );
}
function Ss({
  definition: t,
  addNode: n,
  screenToFlowPosition: r,
  containerRef: i
}) {
  return re(() => {
    const a = (s) => {
      if (!tr(s.target) && !(s.metaKey || s.ctrlKey || s.altKey) && /^[1-8]$/.test(s.key)) {
        const d = Number(s.key) - 1, c = bs[d];
        if (!c || c.type === "trigger" && t?.nodes.some((g) => g.type === "trigger"))
          return;
        const p = i.current?.getBoundingClientRect(), u = p ? r({
          x: p.left + p.width / 2,
          y: p.top + p.height / 2
        }) : { x: 0, y: 0 };
        let { x: h, y: m } = u;
        if (t)
          for (const g of t.nodes)
            Math.abs(g.position.x - h) < 16 && Math.abs(g.position.y - m) < 16 && (h += 24, m += 24);
        n(c.type, { x: h, y: m }), s.preventDefault();
      }
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [n, t, r, i]), null;
}
const $s = 280, Ts = 120, Rs = 40, Ps = 40;
function As(t, n) {
  const r = $s, i = Ts, a = Rs, s = Ps;
  if (t.nodes.length === 0) return [];
  const d = /* @__PURE__ */ new Map();
  for (const N of t.nodes)
    d.set(N.id, []);
  for (const N of t.edges) {
    const v = d.get(N.source);
    v && d.has(N.target) && v.push(N.target);
  }
  const l = t.nodes.filter((N) => N.type === "trigger").map((N) => N.id).sort()[0], p = /* @__PURE__ */ new Map();
  if (l !== void 0) {
    const N = [l];
    for (p.set(l, 0); N.length > 0; ) {
      const v = N.shift(), b = p.get(v), w = d.get(v) ?? [];
      for (const y of w)
        p.has(y) || (p.set(y, b + 1), N.push(y));
    }
  }
  const u = /* @__PURE__ */ new Map();
  let h = -1;
  for (const N of t.nodes) {
    const v = p.get(N.id);
    v !== void 0 && (u.has(v) || u.set(v, []), u.get(v).push(N.id), v > h && (h = v));
  }
  for (const N of u.values())
    N.sort();
  const m = t.nodes.filter((N) => !p.has(N.id)).map((N) => N.id).sort(), g = h >= 0 ? h + 1 : 0;
  m.length > 0 && u.set(g, m);
  const x = [], f = [...u.keys()].sort((N, v) => N - v);
  for (const N of f) {
    const v = u.get(N), b = v.length, w = a + N * r;
    for (let y = 0; y < b; y++) {
      const k = s + (y - b / 2) * i;
      x.push({ id: v[y], position: { x: w, y: k } });
    }
  }
  return x;
}
function Ds({
  definition: t,
  setPositions: n,
  fitView: r
}) {
  const i = M(() => {
    r({ padding: 0.15, duration: 500 });
  }, [r]), a = M(() => {
    if (!t) return;
    const s = As(t);
    s.length !== 0 && (n(s), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => r({ padding: 0.15, duration: 500 })) : r({ padding: 0.15, duration: 500 }));
  }, [t, n, r]);
  return { handleFitView: i, handleAutoArrange: a };
}
function Ms({
  definition: t,
  setPositions: n,
  fitView: r
}) {
  const { handleFitView: i, handleAutoArrange: a } = Ds({
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
  }, [a]), /* @__PURE__ */ o(V, { children: [
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
function tr(t) {
  if (!t || !(t instanceof HTMLElement)) return !1;
  const n = t.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || t.isContentEditable);
}
function Os(t) {
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
const Es = { animated: ls }, _s = as;
function Ls(t) {
  return {
    id: t.id,
    type: t.type,
    position: t.position,
    data: { ...t.data, nodeType: t.type }
  };
}
function Bs(t) {
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
function Us({ onFilterLog: t, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: i, replayNodeClasses: a, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c }) {
  const {
    definition: l,
    addNode: p,
    setPositions: u,
    addEdge: h,
    removeEdge: m,
    removeNode: g,
    duplicateNodes: x,
    selectedNodeId: f,
    setSelectedNodeId: N,
    updateNodeData: v
  } = Le(), { screenToFlowPosition: b, fitView: w } = Aa();
  us({
    addNode: p,
    addEdge: h,
    updateNodeData: v,
    getDefinition: () => l
  });
  const [y, k, C] = Do([]), [$, A, D] = Mo([]), [O, ne] = S(!0), [R, J] = S(!0), Y = ce(null), H = ce(null), [Q, E] = S(null), [T, K] = S(null), G = M(
    (Z, ie) => {
      Z.preventDefault(), K({ nodeId: ie.id, x: Z.clientX, y: Z.clientY });
    },
    []
  ), U = M(() => {
    T && (t?.(T.nodeId), K(null));
  }, [T, t]), q = M(() => {
    if (!T) return;
    const Z = T.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(Z).catch(() => {
    }), K(null);
  }, [T]), W = M(() => {
    T && (d?.(T.nodeId), K(null));
  }, [T, d]), X = M(() => {
    if (!T) return;
    const Z = x([T.nodeId]);
    Z.length > 0 && N(Z[0]), K(null);
  }, [T, x, N]), pe = M(() => K(null), []);
  re(() => {
    if (!l) {
      k([]), A([]);
      return;
    }
    k((Z) => {
      const ie = new Map(Z.map((ue) => [ue.id, ue]));
      return l.nodes.map((ue) => {
        const be = ie.get(ue.id), De = Ls(ue);
        return s && s.size > 0 && (De.data._hasBreakpoint = s.has(ue.id)), c && (De.data._pausedAtBreakpoint = ue.id === c), be ? { ...be, ...De, selected: be.selected } : De;
      });
    }), A(() => l.edges.map(Bs));
  }, [l, s, c, k, A]), re(() => {
    if (!n) {
      r?.(null);
      return;
    }
    k(
      (Z) => Z.map((ie) => ({
        ...ie,
        className: ie.id === n ? "node-error" : ie.className?.replace("node-error", "").trim() || void 0
      }))
    ), requestAnimationFrame(() => {
      const Z = Y.current;
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
  }, [n, k, r]), re(() => {
    a && k(
      (Z) => Z.map((ie) => {
        const ue = a[ie.id] ?? "", De = [ie.id === n ? "node-error" : "", ue].filter(Boolean).join(" ") || void 0;
        let Re;
        ue === "node-replay-active" ? Re = "running" : ue === "node-replay-completed" ? Re = "completed" : ue === "node-replay-failed" && (Re = "failed");
        const Ge = { ...ie.data };
        return Re ? Ge._state = Re : Ge._state = "idle", { ...ie, className: De, data: Ge };
      })
    );
  }, [a, n, k]), re(() => {
    i && A(
      (Z) => Z.map((ie) => {
        const ue = i[ie.id];
        if (!ue) return ie;
        const be = ie.data ?? {};
        return be.state === ue ? ie : { ...ie, data: { ...be, state: ue } };
      })
    );
  }, [i, A]);
  const j = M(
    (Z) => {
      C(Z);
      const ie = [], ue = [];
      for (const be of Z)
        be.type === "position" && be.position && be.dragging === !1 ? ie.push({ id: be.id, position: be.position }) : be.type === "remove" && ue.push(be.id);
      ie.length && u(ie);
      for (const be of ue) g(be);
    },
    [C, u, g]
  ), le = M(
    (Z) => {
      D(Z);
      for (const ie of Z)
        ie.type === "remove" && m(ie.id);
    },
    [D, m]
  ), we = M(
    (Z) => {
      if (!l || !Z.source || !Z.target) return;
      const ie = l.nodes.find((Re) => Re.id === Z.source), ue = l.nodes.find((Re) => Re.id === Z.target);
      if (!ie || !ue) return;
      const be = Z.sourceHandle ?? "out", De = Z.targetHandle ?? "in";
      Bn(
        ie.type,
        be,
        ue.type,
        De
      ) && h({
        source: Z.source,
        sourceHandle: be,
        target: Z.target,
        targetHandle: De
      });
    },
    [l, h]
  ), Be = M(
    (Z) => {
      if (!l || !Z.source || !Z.target) return !1;
      const ie = l.nodes.find((be) => be.id === Z.source), ue = l.nodes.find((be) => be.id === Z.target);
      return !ie || !ue ? !1 : Bn(
        ie.type,
        Z.sourceHandle ?? "out",
        ue.type,
        Z.targetHandle ?? "in"
      );
    },
    [l]
  ), Xe = M(
    (Z, ie) => {
      N(ie.id);
    },
    [N]
  ), ze = M(() => {
    N(null);
  }, [N]), Oe = M(
    (Z) => {
      const ie = Z.target;
      if (!ie || !(ie.classList.contains("react-flow__pane") || ie.classList.contains("react-flow__renderer") || ie.classList.contains("react-flow__viewport") || ie.classList.contains("react-flow"))) return;
      Z.preventDefault();
      const be = b({ x: Z.clientX, y: Z.clientY });
      E({
        anchor: { x: Z.clientX, y: Z.clientY },
        flowPosition: be
      });
    },
    [b]
  ), We = M(() => E(null), []), qe = M(
    (Z, ie) => {
      p(Z, ie);
    },
    [p]
  ), Ve = z(() => l ? l.nodes.some((Z) => Z.type === "trigger") ? ["trigger"] : [] : [], [l]), { handleDragOver: Ie, handleDrop: xe } = hs({
    addNode: p,
    screenToFlowPosition: b
  });
  re(() => {
    const Z = (ie) => {
      if (!tr(ie.target) && !(ie.metaKey || ie.ctrlKey || ie.altKey)) {
        if (ie.key === "m" || ie.key === "M") {
          ne((ue) => !ue);
          return;
        }
        if (ie.key === "c" || ie.key === "C") {
          J((ue) => !ue);
          return;
        }
      }
    };
    return window.addEventListener("keydown", Z), () => window.removeEventListener("keydown", Z);
  }, []), ms({
    definition: l,
    selectedNodeId: f,
    setSelectedNodeId: N,
    removeNode: g,
    removeDefEdge: m,
    setNodes: k,
    setEdges: A,
    setPositions: u,
    duplicateNodes: x,
    clipboardRef: H,
    containerRef: Y
  });
  const ae = M((Z) => {
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
      ref: Y,
      className: "flex-1 min-w-0 min-h-[520px] relative bg-[#fafbfc]",
      role: "application",
      "aria-label": "Pipeline editor canvas",
      tabIndex: 0,
      "data-testid": "pipeline-canvas",
      onDragOver: Ie,
      onDrop: xe,
      onDoubleClick: Oe,
      children: [
        /* @__PURE__ */ o(
          Oo,
          {
            nodes: y,
            edges: $,
            nodeTypes: _s,
            edgeTypes: Es,
            onNodesChange: j,
            onEdgesChange: le,
            onConnect: we,
            isValidConnection: Be,
            onNodeClick: Xe,
            onNodeContextMenu: G,
            onPaneClick: ze,
            fitView: !0,
            snapToGrid: !0,
            snapGrid: [16, 16],
            edgesFocusable: !0,
            defaultEdgeOptions: { type: "smoothstep" },
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ e(
                Eo,
                {
                  variant: Da.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              R ? /* @__PURE__ */ e(
                _o,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              O ? /* @__PURE__ */ e(
                Ma,
                {
                  position: "bottom-right",
                  pannable: !0,
                  zoomable: !0,
                  className: "!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]",
                  maskColor: "rgba(15, 23, 42, 0.04)",
                  nodeColor: ae,
                  nodeStrokeColor: "#e2e8f0"
                }
              ) : null
            ]
          }
        ),
        Q ? /* @__PURE__ */ e(
          ps,
          {
            anchor: Q.anchor,
            flowPosition: Q.flowPosition,
            disabledTypes: Ve,
            onClose: We,
            onInsert: qe
          }
        ) : null,
        /* @__PURE__ */ e(
          Ss,
          {
            definition: l,
            addNode: p,
            screenToFlowPosition: b,
            containerRef: Y
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
        T ? /* @__PURE__ */ e(
          fs,
          {
            nodeMenu: T,
            breakpoints: s,
            showBreakpointOption: !!d,
            onFilterLog: U,
            onCopyNodeId: q,
            onDuplicate: X,
            onToggleBreakpoint: W,
            onDismiss: pe
          }
        ) : null
      ]
    }
  );
}
function Fs({ onFilterLog: t, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: i, replayNodeClasses: a, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c } = {}) {
  return /* @__PURE__ */ e(Pa, { children: /* @__PURE__ */ e(
    Us,
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
const gr = {
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
function zs({ error: t, anchor: n, onDismiss: r, onRetry: i }) {
  const [a, s] = S(!1), [d, c] = S(!1), l = t.errorCategory ?? "UnknownError", p = gr[l] ?? gr.UnknownError, u = M(async () => {
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
  }, [t, l]), h = M(() => {
    i?.();
  }, [i]), m = Math.min(n.y + 8, window.innerHeight - 440), g = Math.min(n.x + 12, window.innerWidth - 360);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "fixed z-[100] bg-white border border-[#e2e8f0] rounded-[10px] shadow-[0_12px_32px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.08)] p-0 w-[340px] max-h-[420px] overflow-y-auto font-inherit text-[#0f172a]",
      style: { top: Math.max(8, m), left: Math.max(8, g) },
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
function qs(t, n) {
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
function Uo(t) {
  const n = [], r = [], { nodes: i, edges: a } = t, s = /* @__PURE__ */ new Map();
  for (const d of i)
    s.set(d.id, d);
  return Ws(i, n), Vs(i, a, n), Js(a, s, n), Hs(i, n), tl(i, a, n), nl(i, a, r), rl(i, a, r), ol(i, a, r), al(i, a, r), r.push(...il(t)), r.push(...sl(t)), r.push(...ll(t)), r.push(...cl(t)), r.push(...dl(t)), r.push(...pl(t)), r.push(...ul(t)), r.push(...ml(t)), r.push(...hl(t)), r.push(...fl(t)), {
    errors: n,
    warnings: r,
    isValid: n.length === 0,
    canPublish: n.length === 0
  };
}
function Ws(t, n) {
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
function Vs(t, n, r) {
  const i = qs(t, n);
  i !== null && r.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: i
  });
}
function Js(t, n, r) {
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
    Bn(
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
function Hs(t, n) {
  for (const r of t)
    switch (r.data.type) {
      case "llm":
        Ks(r.id, r.data, n);
        break;
      case "transform":
        Gs(r.id, r.data, n);
        break;
      case "condition":
        Ys(r.id, r.data, n);
        break;
      case "action":
        Xs(r.id, r.data, n);
        break;
      case "fork":
        Qs(r.id, r.data, n);
        break;
      case "join":
        Zs(r.id, r.data, n);
        break;
      case "approval":
        el(r.id, r.data, n);
        break;
    }
}
function Ks(t, n, r) {
  n.provider || He(r, t, "provider"), (!n.model || !n.model.trim()) && He(r, t, "model"), (!n.systemPrompt || !n.systemPrompt.trim()) && He(r, t, "systemPrompt"), (!n.userPromptTemplate || !n.userPromptTemplate.trim()) && He(r, t, "userPromptTemplate");
}
function Gs(t, n, r) {
  n.transformType || He(r, t, "transformType"), (!n.expression || !n.expression.trim()) && He(r, t, "expression");
}
function Ys(t, n, r) {
  (!n.expression || !n.expression.trim()) && He(r, t, "expression");
}
function Xs(t, n, r) {
  n.actionType || He(r, t, "actionType");
}
function Qs(t, n, r) {
  (typeof n.branchCount != "number" || n.branchCount < 2) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: t,
    field: "branchCount"
  });
}
function Zs(t, n, r) {
  n.mode || He(r, t, "mode"), n.mergeStrategy || He(r, t, "mergeStrategy"), n.mode === "n_of_m" && (typeof n.n != "number" || n.n < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: t,
    field: "n"
  });
}
function el(t, n, r) {
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
function tl(t, n, r) {
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
function He(t, n, r) {
  t.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: `Missing required field '${r}'.`,
    nodeId: n,
    field: r
  });
}
function nl(t, n, r) {
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
function rl(t, n, r) {
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
function ol(t, n, r) {
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
function al(t, n, r) {
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
function tt(t) {
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
function il(t) {
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
      for (const m of r.get(u) ?? [])
        l.has(m) || (l.add(m), p.push(m));
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
      for (const m of i.get(u) ?? [])
        l.has(m) || (l.add(m), p.push(m));
    }
    return !1;
  }
  for (const c of t.nodes)
    c.data.type !== "llm" && c.data.type !== "action" || t.edges.some(
      (p) => p.source === c.id && p.sourceHandle === "error"
    ) || d(c.id) && s(c.id) || n.push({
      code: "NO_ERROR_HANDLER",
      severity: "warning",
      message: `${c.data.type} node '${tt(c)}' has no error handler — failures will terminate the run.`,
      nodeId: c.id
    });
  return n;
}
function sl(t) {
  const n = [];
  for (const r of t.nodes)
    r.data.type === "llm" && (typeof r.data.maxTokens != "number" || r.data.maxTokens <= 0) && n.push({
      code: "LLM_NO_MAX_TOKENS",
      severity: "warning",
      message: `LLM node '${tt(r)}' has no maxTokens — responses could run long / expensive.`,
      nodeId: r.id,
      field: "maxTokens"
    });
  return n;
}
function ll(t) {
  const n = [];
  for (const r of t.nodes)
    r.data.type === "approval" && (typeof r.data.timeoutMs != "number" || r.data.timeoutMs <= 0) && n.push({
      code: "UNGUARDED_APPROVAL_TIMEOUT",
      severity: "warning",
      message: `Approval '${tt(r)}' has no timeout — the run could block indefinitely.`,
      nodeId: r.id,
      field: "timeoutMs"
    });
  return n;
}
function cl(t) {
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
function dl(t) {
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
    for (const h of i.get(p) ?? []) {
      const m = a.get(h);
      (m === void 0 || u + 1 > m) && (a.set(h, u + 1), s.push(h));
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
function pl(t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const i of t.nodes) {
    const a = tt(i), s = r.get(a) ?? [];
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
function ul(t) {
  const n = [], r = /\{\{[^}]+\}\}/;
  for (const i of t.nodes) {
    if (i.data.type !== "llm") continue;
    const { temperature: a, userPromptTemplate: s } = i.data;
    typeof a != "number" || a <= 0.8 || !s || !r.test(s) || n.push({
      code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
      severity: "warning",
      message: `LLM '${tt(i)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
      nodeId: i.id
    });
  }
  return n;
}
function ml(t) {
  return t.triggerBinding?.event !== "schedule" ? [] : t.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function hl(t) {
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
      message: `Condition '${tt(i)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: i.id,
      field: "false"
    });
  }
  return n;
}
function fl(t) {
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
      const u = p.shift(), h = a.get(u);
      if (h && h.type === "join" && u !== c) return u;
      for (const { target: m } of r.get(u) ?? [])
        l.has(m) || (l.add(m), p.push(m));
    }
    return null;
  }
  function d(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [c];
    for (; p.length > 0; ) {
      const u = p.shift(), h = a.get(u);
      if (h && h.type === "fork" && u !== c) return u;
      for (const m of i.get(u) ?? [])
        l.has(m) || (l.add(m), p.push(m));
    }
    return null;
  }
  for (const c of t.nodes) {
    if (c.data.type !== "fork") continue;
    const l = r.get(c.id) ?? [];
    if (l.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const { target: m } of l)
      p.add(s(m));
    const u = p.has(null), h = [...p].filter((m) => m !== null);
    (u || h.length !== 1) && n.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Fork '${tt(c)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
      nodeId: c.id
    });
  }
  for (const c of t.nodes) {
    if (c.data.type !== "join") continue;
    const l = i.get(c.id) ?? [];
    if (l.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const m of l)
      p.add(d(m));
    const u = p.has(null), h = [...p].filter((m) => m !== null);
    (u || h.length !== 1) && n.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Join '${tt(c)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: c.id
    });
  }
  return n;
}
function gl(t, n) {
  return `${t}${n}`;
}
const xl = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, bl = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function Fo(t) {
  return t.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const yl = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function vl(t) {
  const n = bl[t.type] ?? "■", r = yl[t.type] ?? t.type.charAt(0).toUpperCase() + t.type.slice(1);
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
  return Fo(i ? `${a}<br/>${i}` : a);
}
function Nl(t, n) {
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
function wl(t) {
  return !t || t === "out" ? null : t;
}
function kl(t) {
  const n = ["flowchart TD"], r = {}, i = /* @__PURE__ */ new Map();
  for (const a of t.nodes) {
    const s = xl[a.type] ?? "n", d = r[s] = (r[s] ?? 0) + 1;
    i.set(a.id, gl(s, d));
  }
  for (const a of t.nodes) {
    const s = i.get(a.id);
    if (!s) continue;
    const d = Nl(a.type, vl(a));
    n.push(`  ${s}${d}`);
  }
  for (const a of t.edges) {
    const s = i.get(a.source), d = i.get(a.target);
    if (!s || !d) continue;
    const c = wl(a.sourceHandle);
    c ? n.push(`  ${s} --"${Fo(c)}"--> ${d}`) : n.push(`  ${s} --> ${d}`);
  }
  return n.join(`
`);
}
function xr(t) {
  return JSON.stringify(t, (n, r) => {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const i = Object.keys(r).sort(), a = {};
      for (const s of i) a[s] = r[s];
      return a;
    }
    return r;
  });
}
function br(t) {
  const n = /* @__PURE__ */ new Map();
  for (const r of t) n.set(r.id, r);
  return n;
}
function yr(t) {
  return new Set(t.edges.map((n) => n.id));
}
function Cl(t, n) {
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
  const r = br(t.nodes), i = br(n.nodes), a = [], s = [], d = [];
  for (const [b, w] of r) {
    const y = i.get(b);
    if (!y) {
      a.push({ node: w, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const k = xr(w.data) !== xr(y.data), C = w.position.x !== y.position.x || w.position.y !== y.position.y;
    (k || C) && d.push({ node: w, dataChanged: k, positionChanged: C });
  }
  for (const [b, w] of i)
    r.has(b) || s.push({ node: w, dataChanged: !0, positionChanged: !1 });
  const c = yr(t), l = yr(n);
  let p = 0, u = 0;
  for (const b of c) l.has(b) || p++;
  for (const b of l) c.has(b) || u++;
  const h = t.name !== n.name, m = (t.icon ?? "") !== (n.icon ?? ""), g = new Set(t.tags ?? []), x = new Set(n.tags ?? []), f = [], N = [];
  for (const b of g) x.has(b) || f.push(b);
  for (const b of x) g.has(b) || N.push(b);
  const v = f.length > 0 || N.length > 0;
  return {
    addedNodes: a,
    removedNodes: s,
    modifiedNodes: d,
    addedEdges: p,
    removedEdges: u,
    nameChanged: h,
    previousName: h ? n.name : void 0,
    iconChanged: m,
    previousIcon: m ? n.icon : void 0,
    tagsChanged: v,
    tagsAdded: f,
    tagsRemoved: N
  };
}
const Il = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function Sl(t) {
  return t.data.type === "condition" && t.data.label ? t.data.label : t.data.type === "llm" ? t.data.model : t.data.type === "action" ? t.data.actionType : t.data.type === "trigger" ? t.data.triggerType : t.type.charAt(0).toUpperCase() + t.type.slice(1);
}
function fn(t, n, r) {
  const i = t.node, a = Il[i.type] ?? "■", s = n !== "removed" && !!r;
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
        /* @__PURE__ */ e("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: Sl(i) }),
        n === "modified" && t.positionChanged ? /* @__PURE__ */ e("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]", children: "moved" }) : null
      ]
    },
    `${n}-${t.node.id}`
  );
}
function $l({
  open: t,
  onClose: n,
  currentDef: r,
  publishedDef: i,
  onJumpToNode: a
}) {
  const s = z(
    () => Cl(r, i),
    [r, i]
  ), d = (u) => {
    a && a(u), n();
  }, c = i !== null, l = r.version, p = r.publishedVersion;
  return /* @__PURE__ */ o(
    Ke,
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
        r.publishedVersion === void 0 ? /* @__PURE__ */ e("p", { className: "m-0 text-[13px] text-text-secondary", children: "This pipeline has never been published." }) : c ? /* @__PURE__ */ o(V, { children: [
          /* @__PURE__ */ o("div", { className: "flex gap-3 flex-wrap", children: [
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Added (",
                s.addedNodes.length,
                ")"
              ] }),
              s.addedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.addedNodes.map((u) => fn(u, "added", d))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Removed (",
                s.removedNodes.length,
                ")"
              ] }),
              s.removedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.removedNodes.map((u) => fn(u, "removed", void 0))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Modified (",
                s.modifiedNodes.length,
                ")"
              ] }),
              s.modifiedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.modifiedNodes.map((u) => fn(u, "modified", d))
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
function Tl({ open: t, onClose: n }) {
  return null;
}
const gn = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", vr = "px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function Rl(t) {
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
    clearRunsConfirmOpen: h,
    onClearRunsClose: m,
    onClearRunsConfirm: g,
    versionDiffOpen: x,
    onVersionDiffClose: f,
    currentDef: N,
    publishedDef: v,
    onJumpToNode: b,
    simPanelOpen: w,
    onSimPanelClose: y
  } = t;
  return /* @__PURE__ */ o(V, { children: [
    /* @__PURE__ */ e(
      Ke,
      {
        open: n,
        onClose: r,
        title: "Publish pipeline?",
        maxWidth: 420,
        footer: /* @__PURE__ */ o(V, { children: [
          /* @__PURE__ */ e("button", { onClick: r, className: gn, children: "Cancel" }),
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
          a ? /* @__PURE__ */ o(V, { children: [
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
      Ke,
      {
        open: l,
        onClose: p,
        title: "Delete pipeline?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(V, { children: [
          /* @__PURE__ */ e("button", { onClick: p, className: gn, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: u, className: vr, children: "Delete" })
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
      Ke,
      {
        open: h,
        onClose: m,
        title: "Clear run history?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(V, { children: [
          /* @__PURE__ */ e("button", { onClick: m, className: gn, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: g, className: vr, children: "Clear history" })
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
      $l,
      {
        open: x,
        onClose: f,
        currentDef: N,
        publishedDef: v,
        onJumpToNode: b
      }
    ),
    /* @__PURE__ */ e(
      Tl,
      {
        open: w,
        onClose: y
      }
    )
  ] });
}
function Pl({ runId: t, visible: n }) {
  const [r, i] = S(/* @__PURE__ */ new Map()), a = ce(null), s = ce(!0), d = ce(null);
  re(() => {
    t !== d.current && (d.current = t, i(/* @__PURE__ */ new Map()), s.current = !0);
  }, [t]);
  const c = M(() => {
    const g = a.current;
    if (!g) return;
    const x = g.scrollHeight - g.scrollTop - g.clientHeight < 30;
    s.current = x;
  }, []), l = M(() => {
    if (!s.current) return;
    const g = a.current;
    g && (g.scrollTop = g.scrollHeight);
  }, []), p = M(
    (g) => {
      if (!("eventType" in g)) return;
      const { eventType: x, payload: f } = g;
      if (!x.startsWith("pipeline.llm.")) return;
      const N = f?.runId;
      if (!t || N !== t) return;
      const v = f?.stepId;
      if (v) {
        if (x === "pipeline.llm.stream.opened")
          i((b) => {
            const w = new Map(b);
            return w.has(v) || w.set(v, {
              stepId: v,
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
            const y = new Map(w), k = y.get(v);
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
          const b = f?.tokensIn, w = f?.tokensOut;
          i((y) => {
            const k = new Map(y), C = k.get(v), $ = C ? Date.now() - C.startedAt : 0, A = $ > 1e3 ? `${($ / 1e3).toFixed(1)}s` : `${$}ms`, D = `${v}: ${b ?? "?"} tokens in, ${w ?? "?"} tokens out (${A})`;
            return C ? k.set(v, {
              ...C,
              active: !1,
              summary: D
            }) : k.set(v, {
              stepId: v,
              tokens: [],
              text: "",
              active: !1,
              summary: D,
              collapsed: !1,
              startedAt: Date.now()
            }), k;
          });
        }
      }
    },
    [t]
  );
  Ee("*", p), re(() => {
    l();
  }, [r, l]);
  const u = M((g) => {
    i((x) => {
      const f = new Map(x), N = f.get(g);
      return N && f.set(g, { ...N, collapsed: !N.collapsed }), f;
    });
  }, []), h = z(() => {
    for (const g of r.values())
      if (g.active) return !0;
    return !1;
  }, [r]), m = z(() => Array.from(r.values()), [r]);
  return n ? /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col bg-[#1e1e2e] border-t border-[#313244] max-h-[320px] min-h-[160px] overflow-hidden relative",
      "data-testid": "live-output-panel",
      children: [
        /* @__PURE__ */ e("div", { className: "flex items-center justify-between py-2 px-[14px] bg-[#181825] border-b border-[#313244] shrink-0", children: /* @__PURE__ */ o("div", { className: "text-xs font-bold text-[#cdd6f4] tracking-[0.04em] uppercase flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { children: "Live Output" }),
          h && /* @__PURE__ */ e("span", { className: "w-1.5 h-1.5 rounded-full bg-[#a6e3a1] [animation:live-output-blink_1.2s_ease-in-out_infinite]" }),
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
            children: m.length === 0 ? /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-full text-[#6c7086] text-[13px] italic", children: t ? "Waiting for LLM output..." : "No active run" }) : m.map((g) => /* @__PURE__ */ o("div", { children: [
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
              !g.collapsed && /* @__PURE__ */ o(V, { children: [
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
function _t(t, n) {
  const r = new Blob([n], { type: "application/json" }), i = URL.createObjectURL(r), a = document.createElement("a");
  a.href = i, a.download = t, document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(i);
}
function Lt(t, n) {
  if (!n) return "step";
  const r = t?.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Al(t) {
  const n = yt(), { toast: r } = cn(), { definition: i, selectedNodeId: a, setSelectedNodeId: s } = Le(), d = ce(n.runs);
  re(() => {
    d.current = n.runs;
  }, [n.runs]);
  const c = ce(i);
  re(() => {
    c.current = i;
  }, [i]);
  const l = M(
    (P) => P ? d.current[P]?.pipelineId === t : !1,
    [t]
  ), [p, u] = S(null), [h, m] = S(null), g = M(() => {
    u(null), m(null);
  }, []), x = M(
    (P) => {
      m(P);
    },
    []
  ), f = M(
    (P) => {
      "eventType" in P || P.pipelineId === t && (r("Run started", { type: "info" }), u(null), m(null));
    },
    [t, r]
  ), N = M(
    (P) => {
      if ("eventType" in P || !l(P.runId)) return;
      const _ = Math.round(P.durationMs / 100) / 10;
      r(`Run completed in ${_}s`, { type: "success" });
    },
    [l, r]
  ), v = M(
    (P) => {
      if ("eventType" in P || !l(P.runId)) return;
      const _ = P.error.nodeId, de = Lt(c.current, _);
      r(`Run failed at ${de}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => s(_)
      }), u(P.error);
    },
    [l, s, r]
  ), b = M(
    (P) => {
      "eventType" in P || l(P.runId) && r("Run cancelled", { type: "warning" });
    },
    [l, r]
  ), w = M(
    (P) => {
      if ("eventType" in P || !l(P.runId)) return;
      const _ = P.stepId, de = Lt(c.current, _);
      r(`Approval requested on "${de}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => s(_)
      });
    },
    [l, s, r]
  );
  Ee("pipeline.run.started", f), Ee("pipeline.run.completed", N), Ee("pipeline.run.failed", v), Ee("pipeline.run.cancelled", b), Ee("pipeline.approval.requested", w);
  const [y, k] = S(null);
  re(() => {
    if (n.activeRunIds.length > 0) {
      const P = n.activeRunIds[n.activeRunIds.length - 1];
      P !== y && k(P);
      return;
    }
    if (!y) {
      const P = Object.values(n.runs).sort(
        (_, de) => de.startedAt.localeCompare(_.startedAt)
      );
      P.length > 0 && k(P[0].id);
    }
  }, [n.activeRunIds, n.runs, y]);
  const C = y ? n.runs[y] : void 0, $ = !!C && (C.status === "running" || C.status === "pending" || C.status === "awaiting_approval"), [A, D] = S(/* @__PURE__ */ new Set()), [O, ne] = S(null), [R, J] = S(null), [Y, H] = S(null), [Q, E] = S(0), [T, K] = S(!1), [G, U] = S(null), q = M(
    (P, _) => {
      _ === null ? (J(null), H(null)) : (J(_), H(P));
    },
    []
  ), W = M((P) => {
    D((_) => {
      const de = new Set(_);
      return de.has(P) ? de.delete(P) : de.add(P), de;
    });
  }, []), X = M(async () => {
    if (A.size !== 0)
      try {
        const P = await n.triggerDebugRun(
          t,
          Array.from(A)
        );
        k(P);
      } catch (P) {
        console.error("[PipelineEditor] triggerDebugRun failed", P);
      }
  }, [A, n, t]), pe = M(() => {
    O && (n.resolveBreakpoint(O.runId, O.stepId, "continue"), ne(null));
  }, [O, n]), j = M(() => {
    O && (n.resolveBreakpoint(O.runId, O.stepId, "step_over"), ne(null));
  }, [O, n]), le = M(() => {
    O && (n.resolveBreakpoint(O.runId, O.stepId, "resume_all"), ne(null));
  }, [O, n]), we = M(async () => {
    if (!(!O || !R || Y !== O.stepId) && Object.keys(R).length !== 0) {
      K(!0);
      try {
        await ca(
          t,
          O.runId,
          O.stepId,
          { mode: "merge", values: R }
        ), J(null), H(null), E((P) => P + 1), n.resolveBreakpoint(O.runId, O.stepId, "continue"), ne(null);
      } catch (P) {
        if (P instanceof da)
          r(`Patch rejected: ${P.reason}`, { type: "error", durationMs: 8e3 });
        else if (P instanceof ir)
          r(`Apply failed (HTTP ${P.status})`, { type: "error", durationMs: 6e3 });
        else {
          const _ = P instanceof Error ? P.message : String(P);
          r(`Apply failed: ${_}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        K(!1);
      }
    }
  }, [O, R, Y, t, n, r]), Be = M(
    async (P) => {
      if (O) {
        U(P);
        try {
          await pa(
            t,
            O.runId,
            O.stepId,
            P
          ), r("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (_) {
          if (_ instanceof ir)
            r(`Revert failed (HTTP ${_.status})`, { type: "error", durationMs: 6e3 });
          else {
            const de = _ instanceof Error ? _.message : String(_);
            r(`Revert failed: ${de}`, { type: "error", durationMs: 6e3 });
          }
        } finally {
          U(null);
        }
      }
    },
    [O, t, r]
  ), Xe = M(
    (P) => {
      if ("eventType" in P || !l(P.runId)) return;
      ne({ runId: P.runId, stepId: P.stepId });
      const _ = Lt(c.current, P.stepId);
      r(`Paused at breakpoint: ${_}`, { type: "warning", durationMs: 6e3 });
    },
    [l, r]
  );
  Ee("pipeline.step.breakpoint", Xe);
  const ze = M(
    (P) => {
      "eventType" in P || O && O.runId === P.runId && ne(null);
    },
    [O]
  );
  Ee("pipeline.run.completed", ze), Ee("pipeline.run.failed", ze), Ee("pipeline.run.cancelled", ze);
  const Oe = M(() => {
    p?.nodeId && (n.retryFromStep(p.nodeId), g());
  }, [p, n, g]), We = i?.status === "published", qe = !$ && !We, Ve = $ ? "Cancel the active run" : We ? "Start a new run" : "Publish the pipeline to enable runs", [Ie, xe] = S(!1), [ae, Z] = S({}), [ie, ue] = S(!1), [be, De] = S("config");
  re(() => {
    a !== null && De("config");
  }, [a]);
  const Re = M(async (P) => {
    ue(!0);
    try {
      const _ = await n.triggerRun(t, P);
      k(_), De("runs"), r(`Pipeline triggered — run ${_.slice(0, 8)}…`, { type: "success" });
    } catch (_) {
      console.error("[PipelineEditor] triggerRun failed", _), r(`Trigger failed: ${_.message}`, { type: "error" });
    } finally {
      ue(!1);
    }
  }, [n, t, r]), Ge = M(async () => {
    if ($ && y) {
      n.cancelRun(y);
      return;
    }
    qe || Re();
  }, [$, y, qe, n, Re]), Wt = M(() => {
    xe(!1), Re(ae);
  }, [Re, ae]);
  return {
    currentRunId: y,
    setCurrentRunId: k,
    activeError: p,
    setActiveError: u,
    errorNodeAnchor: h,
    handleDismissError: g,
    handleErrorNodePosition: x,
    handleRetryFromError: Oe,
    handleRunClick: Ge,
    handleTriggerInputSubmit: Wt,
    isRunActive: $,
    runDisabled: qe,
    runTitle: Ve,
    isTriggering: ie,
    triggerInputOpen: Ie,
    setTriggerInputOpen: xe,
    triggerInputValues: ae,
    setTriggerInputValues: Z,
    breakpoints: A,
    handleToggleBreakpoint: W,
    handleDebugRunClick: X,
    pausedBreakpoint: O,
    handleBreakpointContinue: pe,
    handleBreakpointStepOver: j,
    handleBreakpointResumeAll: le,
    handleApplyAndContinue: we,
    handleRevertPatch: Be,
    applyingPatch: T,
    revertingPatchId: G,
    dirtyPatch: R,
    dirtyPatchStepId: Y,
    handleContextEditBufferChange: q,
    resetEditBufferKey: Q,
    sidebarTab: be,
    setSidebarTab: De
  };
}
function Dl({
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
  onDelete: h
}) {
  const m = I(
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
        /* @__PURE__ */ e("button", { className: m, role: "menuitem", onClick: i, children: "Duplicate" }),
        /* @__PURE__ */ e(
          "button",
          {
            className: m,
            role: "menuitem",
            onClick: a,
            "data-testid": "copy-mermaid-btn",
            children: "Copy Mermaid"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            className: m,
            role: "menuitem",
            onClick: s,
            "data-testid": "view-versions-btn",
            children: "View changes since publish"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            className: m,
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
            className: m,
            role: "menuitem",
            onClick: c,
            "data-testid": "toggle-tags-row",
            children: n ? "Hide tags" : "Show tags"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            className: m,
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
            onClick: h,
            children: "Delete"
          }
        )
      ]
    }
  );
}
const xn = {
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
  onDebugRunClick: h,
  onExport: m,
  onPublishClick: g,
  onDuplicate: x,
  onCopyMermaid: f,
  onViewVersions: N,
  onRevert: v,
  onToggleShowTags: b,
  showTags: w,
  onViewRunHistory: y,
  onClearRunHistory: k,
  onSimPanelOpen: C,
  onDelete: $
}) {
  const A = je(), { rename: D, setIcon: O, setSelectedNodeId: ne } = Le(), [R, J] = S(!1), [Y, H] = S(""), Q = ce(null);
  re(() => {
    R && (H(n.name ?? ""), setTimeout(() => Q.current?.focus(), 0));
  }, [R, n.name]);
  const E = () => {
    const ae = Y.trim();
    ae && ae !== n.name && D(ae), J(!1);
  }, T = n ? Uo(n) : null;
  (T?.errors.length ?? 0) > 0;
  const K = n.status === "published", G = r ? { label: "Saving…", variant: "info" } : i ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, U = n.status === "published" ? { label: `v${n.version} · Published`, variant: "success" } : typeof n.publishedVersion == "number" ? { label: `v${n.version} · Draft (pub v${n.publishedVersion})`, variant: "warning" } : { label: `v${n.version} · Draft`, variant: "neutral" }, q = T ? T.errors.length > 0 ? { label: `✗ ${T.errors.length} error${T.errors.length === 1 ? "" : "s"}`, variant: "danger" } : T.warnings.length > 0 ? { label: `⚠ ${T.warnings.length} warning${T.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [W, X] = S(!1), pe = ce(null);
  gt(pe, () => X(!1), W);
  const j = T ? [...T.errors, ...T.warnings] : [], le = (ae) => {
    ae && (ne(ae), X(!1));
  }, we = n.nodes.filter((ae) => ae.type !== "trigger").length, Be = l ? Object.values(l.steps).filter(
    (ae) => ae.status === "completed" || ae.status === "skipped"
  ).length : 0, ze = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), Oe = a && l ? { text: `Running (${Be}/${we} steps) · ${ze}s`, variant: "running" } : l?.status === "completed" ? { text: `Completed in ${l.durationMs ? (l.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : l?.status === "failed" ? { text: `Failed at ${Lt(n, l.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, We = {
    running: "bg-info-bg text-info-fg",
    success: "bg-success-bg text-success-fg",
    error: "bg-danger-bg text-danger-fg"
  }, qe = a ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [Ve, Ie] = S(!1), xe = ce(null);
  return gt(xe, () => Ie(!1), Ve), /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "h-11 shrink-0 flex items-center gap-2.5 px-3",
        "border-b border-border bg-surface",
        "sticky top-0 z-5"
      ),
      children: [
        /* @__PURE__ */ e(
          ht,
          {
            onClick: () => A("/pipelines"),
            "aria-label": "Back to pipelines",
            title: "Back to pipelines",
            children: "←"
          }
        ),
        /* @__PURE__ */ e(
          Ea,
          {
            value: n.icon ?? "🔀",
            onChange: O
          }
        ),
        R ? /* @__PURE__ */ e(
          "input",
          {
            ref: Q,
            value: Y,
            onChange: (ae) => H(ae.target.value),
            onBlur: E,
            onKeyDown: (ae) => {
              ae.key === "Enter" && E(), ae.key === "Escape" && (H(n.name), J(!1));
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
        /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              xn[G.variant]
            ),
            "data-testid": "save-status",
            children: G.label
          }
        ),
        /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              xn[U.variant]
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
              onClick: () => X((ae) => !ae),
              className: I(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
                "cursor-pointer border-none",
                xn[q.variant]
              ),
              "data-testid": "validation-indicator",
              children: q.label
            }
          ),
          W && j.length > 0 && /* @__PURE__ */ e(
            "div",
            {
              className: I(
                "absolute top-full mt-1.5 bg-surface border border-border rounded-lg",
                "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"
              ),
              children: j.map((ae, Z) => /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => le(ae.nodeId),
                  className: I(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    ae.nodeId ? "cursor-pointer" : "cursor-default",
                    Z < j.length - 1 && "border-b border-border"
                  ),
                  children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: I(
                          "font-bold text-xs",
                          ae.severity === "error" ? "text-danger-fg" : "text-warning-fg"
                        ),
                        children: ae.severity === "error" ? "✗" : "⚠"
                      }
                    ),
                    /* @__PURE__ */ o("span", { className: "flex-1 text-xs", children: [
                      /* @__PURE__ */ e("div", { className: "font-semibold", children: ae.code }),
                      /* @__PURE__ */ e("div", { className: "text-text-secondary", children: ae.message }),
                      ae.nodeId && /* @__PURE__ */ e("div", { className: "mt-0.5 text-[11px] text-primary", children: "Jump to node →" })
                    ] })
                  ]
                },
                `${ae.code}-${Z}`
              ))
            }
          )
        ] }),
        Oe.variant !== "none" && /* @__PURE__ */ o(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap",
              We[Oe.variant]
            ),
            "data-testid": "run-status-indicator",
            children: [
              Oe.variant === "running" && /* @__PURE__ */ e("span", { className: "inline-block w-3 h-3 border-2 border-border border-t-primary rounded-full animate-spin" }),
              Oe.variant === "success" && "✓ ",
              Oe.variant === "error" && "✗ ",
              Oe.text
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex-1" }),
        /* @__PURE__ */ e(
          _e,
          {
            variant: "secondary",
            onClick: () => A("/pipelines/metrics"),
            title: "View pipeline metrics dashboard",
            "data-testid": "metrics-button",
            children: "Metrics"
          }
        ),
        /* @__PURE__ */ e(
          _e,
          {
            variant: "secondary",
            onClick: m,
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
            title: K ? "Already published at this version" : "Publish pipeline to enable runs",
            disabled: K,
            className: I(
              "px-3 py-1.5 text-[13px] font-semibold border-none rounded-md font-inherit shrink-0",
              K ? "bg-surface-hover text-text-tertiary cursor-default opacity-70" : "bg-success text-white cursor-pointer"
            ),
            "data-testid": "publish-button",
            children: K ? "Published" : "Publish"
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
            ] }) : qe
          }
        ),
        p.size > 0 && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: h,
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
        /* @__PURE__ */ o("div", { className: "relative", ref: xe, children: [
          /* @__PURE__ */ e(
            ht,
            {
              onClick: () => Ie((ae) => !ae),
              "aria-label": "More actions",
              "data-testid": "overflow-menu-btn",
              children: "⋯"
            }
          ),
          Ve && /* @__PURE__ */ e(
            Dl,
            {
              isPublished: K,
              showTags: w,
              onDuplicate: () => {
                x(), Ie(!1);
              },
              onCopyMermaid: () => {
                f(), Ie(!1);
              },
              onViewVersions: () => {
                N(), Ie(!1);
              },
              onRevert: () => {
                v(), Ie(!1);
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
const Ol = 12;
function Pe(t) {
  return I("text-xs", {
    string: "text-[#a6e3a1]",
    number: "text-[#fab387]",
    boolean: "text-[#cba6f7]",
    null: "text-[#6c7086]",
    bracket: "text-[#9399b2]"
  }[t]);
}
function jt({
  data: t,
  depth: n = 0,
  highlightKeys: r,
  keyName: i,
  isHighlighted: a = !1
}) {
  const [s, d] = S(n > 2);
  if (n > Ol)
    return /* @__PURE__ */ e("span", { className: Pe("string"), children: "[max depth]" });
  const c = a || i != null && r?.has(i);
  if (t === null)
    return /* @__PURE__ */ e("span", { className: I(Pe("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "null" });
  if (t === void 0)
    return /* @__PURE__ */ e("span", { className: I(Pe("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "undefined" });
  if (typeof t == "boolean")
    return /* @__PURE__ */ e("span", { className: I(Pe("boolean"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(t) });
  if (typeof t == "number")
    return /* @__PURE__ */ e("span", { className: I(Pe("number"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(t) });
  if (typeof t == "string") {
    const l = t.length > 120 ? t.slice(0, 120) + "..." : t;
    return /* @__PURE__ */ o("span", { className: I(Pe("string"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: [
      '"',
      l,
      '"'
    ] });
  }
  if (Array.isArray(t))
    return t.length === 0 ? /* @__PURE__ */ e("span", { className: Pe("bracket"), children: "[]" }) : /* @__PURE__ */ o("span", { children: [
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
      /* @__PURE__ */ e("span", { className: Pe("bracket"), children: "[" }),
      s ? /* @__PURE__ */ o("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        t.length,
        " items"
      ] }) : /* @__PURE__ */ e("div", { className: "pl-4", children: t.map((l, p) => /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
        /* @__PURE__ */ o("span", { className: "text-[#6c7086] text-[11px]", children: [
          p,
          ": "
        ] }),
        /* @__PURE__ */ e(jt, { data: l, depth: n + 1, highlightKeys: r }),
        p < t.length - 1 && /* @__PURE__ */ e("span", { className: Pe("bracket"), children: "," })
      ] }, p)) }),
      /* @__PURE__ */ e("span", { className: Pe("bracket"), children: "]" })
    ] });
  if (typeof t == "object") {
    const l = Object.entries(t);
    return l.length === 0 ? /* @__PURE__ */ e("span", { className: Pe("bracket"), children: "{}" }) : /* @__PURE__ */ o("span", { children: [
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
      /* @__PURE__ */ e("span", { className: Pe("bracket"), children: "{" }),
      s ? /* @__PURE__ */ o("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        l.length,
        " keys"
      ] }) : /* @__PURE__ */ e("div", { className: "pl-4", children: l.map(([p, u], h) => {
        const m = r?.has(p) || a;
        return /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
          /* @__PURE__ */ e("span", { className: I(
            "text-xs font-medium text-[#89b4fa]",
            m && "text-[#a6e3a1] font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5"
          ), children: p }),
          /* @__PURE__ */ e("span", { className: Pe("bracket"), children: ": " }),
          /* @__PURE__ */ e(
            jt,
            {
              data: u,
              depth: n + 1,
              highlightKeys: n === 0 ? r : void 0,
              keyName: p,
              isHighlighted: m
            }
          ),
          h < l.length - 1 && /* @__PURE__ */ e("span", { className: Pe("bracket"), children: "," })
        ] }, p);
      }) }),
      /* @__PURE__ */ e("span", { className: Pe("bracket"), children: "}" })
    ] });
  }
  return /* @__PURE__ */ e("span", { className: Pe("string"), children: String(t) });
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
function _l(t) {
  return typeof t == "string" ? "string" : typeof t == "number" ? "number" : typeof t == "boolean" ? "boolean" : "object";
}
function Ll({ k: t, initial: n, onCommit: r, onError: i, onFocus: a }) {
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
function Bl({
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
  const u = z(() => {
    const m = /* @__PURE__ */ new Set([
      ...Object.keys(t),
      ...Object.keys(n)
    ]);
    return Array.from(m);
  }, [t, n]), h = "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono";
  return /* @__PURE__ */ o("div", { "data-testid": "context-edit-table", children: [
    u.map((m) => {
      const g = m in n, x = g ? n[m] : t[m], f = _l(x), N = g;
      return /* @__PURE__ */ o(
        "div",
        {
          className: "grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 border-b border-[#313244]",
          "data-testid": `context-edit-row-${m}`,
          children: [
            /* @__PURE__ */ o(
              "span",
              {
                className: I(
                  "text-xs font-medium text-[#89b4fa] pt-1 overflow-hidden text-ellipsis whitespace-nowrap",
                  N && "text-[#a6e3a1] font-bold"
                ),
                title: m,
                children: [
                  m,
                  N && /* @__PURE__ */ e("span", { className: "ml-1 text-[9px]", children: "●" })
                ]
              }
            ),
            /* @__PURE__ */ o("div", { className: "min-w-0", children: [
              f === "boolean" ? /* @__PURE__ */ o(
                "select",
                {
                  "data-testid": `context-edit-input-${m}`,
                  value: String(x),
                  onChange: (v) => c(m, v.target.value === "true"),
                  onFocus: () => d(m, x),
                  className: h,
                  children: [
                    /* @__PURE__ */ e("option", { value: "true", children: "true" }),
                    /* @__PURE__ */ e("option", { value: "false", children: "false" })
                  ]
                }
              ) : f === "number" ? /* @__PURE__ */ e(
                "input",
                {
                  "data-testid": `context-edit-input-${m}`,
                  type: "number",
                  value: String(x),
                  onChange: (v) => {
                    const b = v.target.value === "" ? 0 : Number(v.target.value);
                    c(m, Number.isNaN(b) ? 0 : b);
                  },
                  onFocus: () => d(m, x),
                  className: h
                }
              ) : f === "string" ? /* @__PURE__ */ e(
                "input",
                {
                  "data-testid": `context-edit-input-${m}`,
                  type: "text",
                  value: x ?? "",
                  onChange: (v) => c(m, v.target.value),
                  onFocus: () => d(m, x),
                  className: h
                }
              ) : /* @__PURE__ */ e(
                Ll,
                {
                  k: m,
                  initial: x,
                  onCommit: (v) => c(m, v),
                  onError: (v) => p(m, v),
                  onFocus: () => d(m, x)
                }
              ),
              r[m] && /* @__PURE__ */ e(
                "div",
                {
                  "data-testid": `context-edit-parse-error-${m}`,
                  className: "text-[#f38ba8] text-[11px] mt-1",
                  children: r[m]
                }
              )
            ] }),
            /* @__PURE__ */ e("div", { className: "flex gap-1", children: N && /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                "data-testid": `context-edit-revert-${m}`,
                onClick: () => l(m),
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
              onChange: (m) => a({ ...i, key: m.target.value }),
              className: h
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              "data-testid": "context-edit-new-value",
              type: "text",
              placeholder: "value (string or JSON)",
              value: i.value,
              onChange: (m) => a({ ...i, value: m.target.value }),
              onKeyDown: (m) => {
                m.key === "Enter" && (m.preventDefault(), s());
              },
              className: h
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
function Ul(t, n, r) {
  const i = { ...t }, a = { ...i.steps ?? {} };
  return a[n] = r, i.steps = a, r && typeof r == "object" && !Array.isArray(r) && Object.assign(i, r), i;
}
function Fl(t, n) {
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
      l = Ul(i, a.nodeId, d);
    else {
      l = { ...i };
      const u = {
        ...l.steps ?? {}
      };
      u[a.nodeId] = d, l.steps = u;
    }
    const p = Fl(s, l);
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
function zl(t, n) {
  const [r, i] = S(/* @__PURE__ */ new Map()), [a, s] = S(
    /* @__PURE__ */ new Map()
  ), d = ce(null);
  re(() => {
    const m = t?.id ?? null;
    m !== d.current && (d.current = m, i(/* @__PURE__ */ new Map()), s(/* @__PURE__ */ new Map()));
  }, [t?.id]);
  const c = M(
    (m) => {
      if (!m || typeof m != "object") return;
      const { eventType: g, payload: x } = m;
      if (!x || typeof x != "object") return;
      const f = x, N = f.runId;
      if (!(!t?.id || N !== t.id)) {
        if (g === "pipeline.llm.prompt") {
          const v = f.stepId, b = f.prompt;
          v && b && i((w) => {
            const y = new Map(w);
            return y.set(v, b), y;
          });
        }
        if (g === "pipeline.run.checkpoint" || g === "pipeline.run.checkpointed" || g === "pipeline:run:checkpoint" || g === "pipeline:run:checkpointed") {
          const v = f.context, b = f.stepId;
          v && b && s((w) => {
            const y = new Map(w);
            return y.set(b, v), y;
          });
        }
      }
    },
    [t?.id]
  );
  Ee("*", c);
  const l = z(() => t ? jl(t) : [], [t]), p = z(() => l.map((m) => {
    const g = r.get(m.stepId), x = a.get(m.stepId);
    return {
      ...m,
      resolvedPrompt: m.resolvedPrompt || g,
      outputContext: x ?? m.outputContext
    };
  }), [l, r, a]), u = z(() => n ? p.find((m) => m.stepId === n) ?? null : p[p.length - 1] ?? null, [p, n]), h = z(() => u ? new Set(u.newKeys) : /* @__PURE__ */ new Set(), [u]);
  return { enrichedSnapshots: p, activeSnapshot: u, newKeysSet: h };
}
function Nr({ attempt: t, label: n }) {
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
      /* @__PURE__ */ e(jt, { data: t.output, depth: 0 })
    ] })
  ] });
}
function ql({
  run: t,
  activeStepId: n,
  onStepSelect: r,
  editable: i = !1,
  onEditBufferChange: a,
  resetEditBufferKey: s
}) {
  const [d, c] = S("input"), [l, p] = S(0), [u, h] = S(!1), [m, g] = S({}), [x, f] = S(null), [N, v] = S({}), [b, w] = S({
    key: "",
    value: ""
  }), { enrichedSnapshots: y, activeSnapshot: k, newKeysSet: C } = zl(t, n), $ = k?.resolvedPrompt != null, A = k?.stepExecution.attempts, D = (A?.length ?? 0) >= 2;
  re(() => {
    d === "prompt" && !$ && c("input"), d === "attempts" && !D && c("input");
  }, [d, $, D]), re(() => {
    p(0);
  }, [n]);
  const O = !!(t && t.status === "paused_at_breakpoint" && n && (t.currentStepIds?.includes(n) || k?.stepExecution.status === "running" || k?.stepExecution.status === "awaiting" || k?.stepExecution.status === "pending")), ne = !!i && !!O;
  re(() => {
    ne ? x && x !== n && (g({}), f(null), v({})) : (u && h(!1), Object.keys(m).length > 0 && g({}), x && f(null), Object.keys(N).length > 0 && v({}));
  }, [ne, n]), re(() => {
    s !== void 0 && (g({}), f(null), v({}), w({ key: "", value: "" }));
  }, [s]), re(() => {
    !ne || !n || a && (Object.keys(m).length === 0 ? a(n, null) : a(n, m));
  }, [m, ne, n]);
  const R = M(
    (T, K) => {
      f(n), g((G) => T in G ? G : { ...G, [T]: K });
    },
    [n]
  ), J = M(
    (T, K) => {
      f(n), g((G) => ({ ...G, [T]: K })), v((G) => {
        if (!(T in G)) return G;
        const U = { ...G };
        return delete U[T], U;
      });
    },
    [n]
  ), Y = M((T) => {
    g((K) => {
      if (!(T in K)) return K;
      const G = { ...K };
      return delete G[T], G;
    }), v((K) => {
      if (!(T in K)) return K;
      const G = { ...K };
      return delete G[T], G;
    });
  }, []), H = M((T, K) => {
    v((G) => ({ ...G, [T]: K }));
  }, []), Q = M(() => {
    g({}), f(null), v({}), w({ key: "", value: "" });
  }, []), E = M(() => {
    const T = b.key.trim();
    if (!T) return;
    let K = b.value;
    const G = b.value;
    if (G.trim().length > 0)
      try {
        K = JSON.parse(G);
      } catch {
        K = G;
      }
    J(T, K), w({ key: "", value: "" });
  }, [b, J]);
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
      { id: "attempts", label: `Attempts (${A?.length})`, show: D }
    ].filter((T) => T.show).map((T) => /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "data-testid": T.id === "attempts" ? "attempts-tab" : void 0,
        className: I(
          "px-3.5 py-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer font-inherit uppercase tracking-wide border-b-2",
          d === T.id ? "text-primary border-b-primary" : "text-text-tertiary border-b-transparent"
        ),
        onClick: () => c(T.id),
        children: T.label
      },
      T.id
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
            u && Object.keys(m).length > 0 && /* @__PURE__ */ e(
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
                  const T = !u;
                  h(T), T || Q();
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
          Bl,
          {
            inputContext: k.inputContext,
            buffer: m,
            parseErrors: N,
            newKeyDraft: b,
            setNewKeyDraft: w,
            onCommitNewKey: E,
            onBeginEditKey: R,
            onSetValue: J,
            onRemoveKey: Y,
            onParseError: H
          }
        ) : /* @__PURE__ */ e(
          jt,
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
        /* @__PURE__ */ e(jt, { data: k.output }),
        k.newKeys.length > 0 && /* @__PURE__ */ o("div", { className: "mt-3", children: [
          /* @__PURE__ */ e("div", { className: "text-[10px] text-[#a6e3a1] font-semibold uppercase mb-1", children: "New context keys added" }),
          /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: k.newKeys.map((T) => /* @__PURE__ */ e(
            "span",
            {
              className: "px-1.5 py-0.5 bg-[rgba(166,227,161,0.15)] text-[#a6e3a1] rounded-sm text-[11px] font-semibold font-mono",
              children: T
            },
            T
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
              k.stepExecution.completedAt && /* @__PURE__ */ o(V, { children: [
                /* @__PURE__ */ e("br", {}),
                "Completed: ",
                k.stepExecution.completedAt,
                k.stepExecution.durationMs != null && /* @__PURE__ */ o(V, { children: [
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
              k.stepExecution.llm.firstTokenLatencyMs != null && /* @__PURE__ */ o(V, { children: [
                /* @__PURE__ */ e("br", {}),
                "First token latency: ",
                k.stepExecution.llm.firstTokenLatencyMs,
                "ms"
              ] })
            ] }),
            k.stepExecution.llm.response && /* @__PURE__ */ o(V, { children: [
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
            k.stepExecution.approvals.map((T, K) => /* @__PURE__ */ o("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2", children: [
              /* @__PURE__ */ o("div", { className: "flex gap-2 mb-1", children: [
                /* @__PURE__ */ e("span", { className: I(
                  "px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                  T.decision === "approve" ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
                ), children: T.decision.toUpperCase() }),
                /* @__PURE__ */ e("span", { className: "text-[11px] text-[#cdd6f4]", children: T.userId })
              ] }),
              T.comment && /* @__PURE__ */ o("div", { className: "text-[11px] text-[#9399b2] italic", children: [
                '"',
                T.comment,
                '"'
              ] }),
              /* @__PURE__ */ e("div", { className: "text-[10px] text-[#6c7086] mt-1", children: T.at })
            ] }, K))
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Status" }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-[#cdd6f4]", children: k.stepExecution.status })
          ] })
        ] })
      ] }) : d === "attempts" && A && A.length >= 2 ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              "data-testid": "attempts-prev",
              disabled: l === 0,
              onClick: () => p((T) => T - 1),
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
                A.length
              ]
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              "data-testid": "attempts-next",
              disabled: l >= A.length - 2,
              onClick: () => p((T) => T + 1),
              className: I(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l >= A.length - 2 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "→"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ e(Nr, { attempt: A[l], label: `Attempt ${l + 1}` }),
          /* @__PURE__ */ e(Nr, { attempt: A[l + 1], label: `Attempt ${l + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function Wl({
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
  onRevertPatch: h,
  onEditBufferChange: m
}) {
  const x = yt().runs[n.runId] ?? null, N = x?.steps?.[n.stepId]?.patches ?? [], v = !!a && s === n.stepId && Object.keys(a).length > 0, b = x?.status === "paused_at_breakpoint";
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
            Lt(t, n.stepId)
          ] }),
          v && /* @__PURE__ */ e(
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
                ql,
                {
                  run: x,
                  activeStepId: n.stepId,
                  editable: !0,
                  onEditBufferChange: m,
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
                              w.appliedBy && /* @__PURE__ */ o(V, { children: [
                                " · ",
                                /* @__PURE__ */ e("span", { className: "text-[#cdd6f4]", children: w.appliedBy })
                              ] })
                            ] }),
                            !y && /* @__PURE__ */ e(
                              "button",
                              {
                                type: "button",
                                "data-testid": `breakpoint-patch-revert-${w.patchId}`,
                                onClick: () => h(w.patchId),
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
function ye({ label: t, required: n, help: r, error: i, children: a, className: s }) {
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
function Vl({ title: t, defaultCollapsed: n = !1, children: r, className: i }) {
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
const Jl = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function Hl(t, n, r) {
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
      const h = Number(u.trim());
      if (!Number.isFinite(h) || !Number.isInteger(h) || h < n || h > r) return null;
      l.has(h) || (l.add(h), p.push(h));
    }
    return p.length === 0 ? null : { match: p };
  }
  const d = Number(i);
  return !Number.isFinite(d) || !Number.isInteger(d) || d < n || d > r ? null : { match: [d] };
}
function Kl(t) {
  if (typeof t != "string") return null;
  const n = t.trim().split(/\s+/);
  if (n.length !== 5) return null;
  const r = {};
  for (let i = 0; i < 5; i++) {
    const a = Jl[i], s = Hl(n[i], a.min, a.max);
    if (!s) return null;
    r[a.name] = s;
  }
  return r;
}
function kt(t, n, r) {
  return t.match === "*" ? !t.step || t.step === 1 ? !0 : (n - r) % t.step === 0 : t.match.includes(n);
}
function Gl(t, n) {
  return kt(t.minute, n.getMinutes(), 0) && kt(t.hour, n.getHours(), 0) && kt(t.dayOfMonth, n.getDate(), 1) && kt(t.month, n.getMonth() + 1, 1) && kt(t.dayOfWeek, n.getDay(), 0);
}
function Yl(t, n, r) {
  const i = [], a = new Date(n.getTime());
  a.setSeconds(0, 0), a.setMinutes(a.getMinutes() + 1);
  const s = 1440 * 366, d = new Date(a.getTime());
  for (let c = 0; c < s && i.length < r; c++)
    Gl(t, d) && i.push(new Date(d.getTime())), d.setMinutes(d.getMinutes() + 1);
  return i;
}
const wr = /^[a-zA-Z0-9_-]{1,64}$/, Xl = "http://localhost:13001";
function Ql() {
  try {
    const t = localStorage.getItem("ws_document_types_v1");
    if (!t) return [];
    const n = JSON.parse(t);
    return Array.isArray(n) ? n.filter((r) => typeof r == "object" && r !== null).filter((r) => typeof r.id == "string" && typeof r.name == "string").map((r) => ({ id: r.id, name: r.name })) : [];
  } catch {
    return [];
  }
}
const Zl = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function ec({ data: t, onChange: n }) {
  const { toast: r } = cn(), a = Co(ua)?.definition?.triggerBinding?.webhookSecret, [s, d] = S(!1), c = t.triggerType.startsWith("document."), l = z(() => c ? Ql() : [], [c]), p = c && !t.documentTypeId, u = t.triggerType === "schedule" && !t.schedule, h = t.triggerType === "webhook" && !t.webhookPath, m = t.webhookPath ?? "", g = t.triggerType === "webhook" && m.length > 0 && !wr.test(m), x = t.triggerType === "webhook" && wr.test(m) ? `${Xl}/hooks/pipeline/${m}` : null, f = () => {
    x && navigator.clipboard.writeText(x).then(() => r("Webhook URL copied", { type: "success" })).catch(() => r("Could not copy webhook URL", { type: "error" }));
  }, N = () => {
    a && navigator.clipboard.writeText(a).then(() => r("Webhook secret copied", { type: "success" })).catch(() => r("Could not copy webhook secret", { type: "error" }));
  }, v = t.triggerType === "schedule" ? t.schedule ?? "" : "", b = z(
    () => v ? Kl(v) : null,
    [v]
  ), w = z(() => b ? Yl(b, /* @__PURE__ */ new Date(), 3) : [], [b]), y = t.triggerType === "schedule" && !!v && !b, k = t.triggerType === "document.finalize" ? "On finalize" : t.triggerType === "document.submit" ? "On submit for review" : t.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(ye, { label: "Trigger type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.triggerType,
        onChange: (C) => n({ triggerType: C.target.value }),
        children: Zl.map((C) => /* @__PURE__ */ e("option", { value: C.value, children: C.label }, C.value))
      }
    ) }),
    c && /* @__PURE__ */ o(
      ye,
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
      ye,
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
          /* @__PURE__ */ e("div", { className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono", children: w.length > 0 ? /* @__PURE__ */ o(V, { children: [
            /* @__PURE__ */ e("div", { className: "text-text-secondary mb-1", children: "Next 3 fires:" }),
            w.map((C, $) => /* @__PURE__ */ e("div", { children: C.toLocaleString() }, $))
          ] }) : /* @__PURE__ */ e("span", { children: "Next fires: enter a valid cron expression to preview." }) })
        ]
      }
    ),
    t.triggerType === "webhook" && /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e(
        ye,
        {
          label: "Path",
          required: !0,
          error: h ? "Webhook path is required." : g ? "Path must be alphanumeric (plus _, -)" : void 0,
          help: !h && !g ? "Alphanumeric, _, or - (max 64 chars). No leading slash." : void 0,
          children: /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              className: I(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                h || g ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "weekly-digest",
              value: m,
              onChange: (C) => n({ webhookPath: C.target.value })
            }
          )
        }
      ),
      /* @__PURE__ */ e("div", { className: "p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: x ? /* @__PURE__ */ o(V, { children: [
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
        /* @__PURE__ */ e("div", { className: "mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: a ? /* @__PURE__ */ o(V, { children: [
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
const kr = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, tc = 3e4;
function nc(t) {
  return t < 1e3 ? `${Math.round(t)}ms` : t < 6e4 ? `${(t / 1e3).toFixed(t < 1e4 ? 1 : 0)}s` : `${Math.round(t / 6e4)}m`;
}
function rc(t) {
  const n = [];
  for (let r = 1; r < t.maxAttempts; r++) {
    const i = t.backoffMs * Math.pow(t.backoffMultiplier, r - 1);
    n.push(Math.min(i, tc));
  }
  return n;
}
function nr({ value: t, onChange: n }) {
  const r = t !== void 0, i = t ?? kr, a = r ? rc(i) : [], d = a.reduce((c, l) => c + l, 0) > 300 * 1e3;
  return /* @__PURE__ */ o("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "checkbox",
          checked: r,
          onChange: (c) => n(c.target.checked ? kr : void 0),
          "aria-label": "Enable retries"
        }
      ),
      "Retry policy"
    ] }),
    !r && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", children: "No retries — failure is terminal on first attempt." }),
    r && /* @__PURE__ */ o(V, { children: [
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
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: i.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : a.length === 0 ? `Retries up to ${i.maxAttempts}× with no delay.` : `Retries up to ${i.maxAttempts}× with delays: ${a.map(nc).join(", ")}.` }),
      d && /* @__PURE__ */ e("div", { className: "text-[11px] text-[#ca8a04] mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const oc = {
  string: "bg-info-bg text-info-fg border-info-border",
  number: "bg-accent-bg text-accent-fg border-accent-border",
  boolean: "bg-warning-bg text-warning-fg border-warning-border",
  object: "bg-neutral-bg text-neutral-fg border-neutral-border",
  array: "bg-neutral-bg text-neutral-fg border-neutral-border",
  image: "bg-success-bg text-success-fg border-success-border"
};
function ac({
  paths: t,
  unresolved: n = [],
  onInsert: r,
  onRevealNode: i,
  className: a
}) {
  return /* @__PURE__ */ o("div", { className: I("flex flex-col gap-1.5", a), "data-testid": "context-variable-picker", children: [
    t.length === 0 ? /* @__PURE__ */ e("p", { className: "m-0 text-[11px] text-text-tertiary", "data-testid": "context-picker-empty", children: "No upstream context yet — connect this node to a trigger or an earlier step and its outputs will appear here." }) : /* @__PURE__ */ o(V, { children: [
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
            oc[s.kind]
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
function Cr(t) {
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
      return [a(d, "Records read from memory.", "array")];
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
function ic(t, n, r) {
  const i = new Map(t.map((c) => [c.id, c])), a = [], s = /* @__PURE__ */ new Set(), d = (c) => {
    s.has(c.path) || (s.add(c.path), a.push(c));
  };
  for (const c of Fn(n, r)) {
    const l = i.get(c);
    l && Cr(l).forEach(d);
  }
  if (!s.has("context.trigger")) {
    const c = t.find((l) => l.type === "trigger");
    c && Cr(c).forEach(d);
  }
  return a;
}
function sc(t, n) {
  const r = new Set(n.map((a) => a.path)), i = /* @__PURE__ */ new Set();
  for (const a of t.matchAll(/\{\{\s*([\w.[\]-]+)\s*\}\}/g))
    i.add(a[1]);
  return [...i].filter((a) => r.has(a) ? !1 : ![...r].some((s) => a.startsWith(`${s}.`)));
}
const lc = /* @__PURE__ */ new Set([
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
function cc(t, n, r) {
  const i = new Map(t.map((l) => [l.id, l])), a = [], s = /* @__PURE__ */ new Set(), d = (l) => {
    s.has(l.path) || (s.add(l.path), a.push(l));
  };
  for (const l of Fn(n, r)) {
    const p = i.get(l);
    if (!p || !lc.has(p.type)) continue;
    const u = p.data ?? {}, h = typeof u.label == "string" && u.label ? u.label : p.type;
    d({
      path: `$.steps.${p.id}.output.imageId`,
      source: `${h} (${p.type})`,
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
function Nt(t) {
  const { definition: n } = Le(), r = n?.nodes ?? [], i = n?.edges ?? [], a = z(
    () => t ? ic(r, i, t) : [],
    [r, i, t]
  );
  return z(
    () => ({
      paths: a,
      unresolved: (s) => sc(s, a)
    }),
    [a]
  );
}
function $e(t) {
  const { definition: n } = Le(), r = n?.nodes ?? [], i = n?.edges ?? [];
  return z(
    () => t ? cc(r, i, t) : [],
    [r, i, t]
  );
}
const Ir = {
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
function dc(t, n) {
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
function Sr(t, n) {
  return t.replace(/\{\{\s*([\w.[\]-]+)\s*\}\}/g, (r, i) => {
    const a = n.get(i);
    return a ? dc(i, a) : `{{${i}}}`;
  });
}
function pc({ data: t, onChange: n, nodeId: r }) {
  const [i, a] = S(!1), { paths: s, unresolved: d } = Nt(r ?? null), c = new Map(s.map((m) => [m.path, m.kind])), l = d(
    `${t.systemPrompt ?? ""}
${t.userPromptTemplate ?? ""}`
  ), p = !t.systemPrompt?.trim(), u = !t.userPromptTemplate?.trim(), h = (m) => {
    const g = Ir[m], x = g.includes(t.model) ? t.model : g[0];
    n({ provider: m, model: x });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(ye, { label: "Provider", required: !0, children: /* @__PURE__ */ o(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.provider,
        onChange: (m) => h(m.target.value),
        children: [
          /* @__PURE__ */ e("option", { value: "anthropic", children: "Anthropic" }),
          /* @__PURE__ */ e("option", { value: "bedrock", children: "Bedrock" }),
          /* @__PURE__ */ e("option", { value: "claude-code", children: "Claude Code (subprocess)" })
        ]
      }
    ) }),
    /* @__PURE__ */ e(ye, { label: "Model", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.model,
        onChange: (m) => n({ model: m.target.value }),
        children: Ir[t.provider].map((m) => /* @__PURE__ */ e("option", { value: m, children: m }, m))
      }
    ) }),
    /* @__PURE__ */ e(ye, { label: "Available context", children: /* @__PURE__ */ e(
      ac,
      {
        paths: s,
        unresolved: l,
        onInsert: (m) => n({ userPromptTemplate: `${t.userPromptTemplate ?? ""}${m}` })
      }
    ) }),
    /* @__PURE__ */ e(
      ye,
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
            onChange: (m) => n({ systemPrompt: m.target.value })
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      ye,
      {
        label: "User prompt template",
        required: !0,
        error: u ? "User prompt template is required." : void 0,
        help: u ? void 0 : "Supports {{ context.* }} substitution — click a pill above to append.",
        children: /* @__PURE__ */ e(
          Qn,
          {
            value: t.userPromptTemplate,
            onChange: (m) => n({ userPromptTemplate: m }),
            language: "template",
            variables: s.map((m) => m.path),
            minLines: 6,
            "aria-label": "User prompt template"
          }
        )
      }
    ),
    /* @__PURE__ */ o(Vl, { title: "Advanced", defaultCollapsed: !0, children: [
      /* @__PURE__ */ o(
        ye,
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
                onChange: (m) => n({ temperature: parseFloat(m.target.value) }),
                className: "w-full mt-1"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ e(ye, { label: "Max tokens", help: "Upper bound on response length.", children: /* @__PURE__ */ e(
        "input",
        {
          type: "number",
          min: 1,
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
          value: t.maxTokens ?? "",
          onChange: (m) => {
            const g = m.target.value;
            n({ maxTokens: g === "" ? void 0 : Math.max(1, parseInt(g, 10) || 0) });
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
              onChange: (m) => n({ streaming: m.target.checked })
            }
          ),
          "Streaming"
        ] }),
        /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Stream tokens as they are generated." })
      ] }),
      /* @__PURE__ */ e(
        nr,
        {
          value: t.retryPolicy,
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
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved system prompt" }),
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: Sr(t.systemPrompt || "(empty)", c) })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: Sr(t.userPromptTemplate || "(empty)", c) })
      ] }),
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary", children: s.length > 0 ? "Placeholders describe the shape of each upstream value; unresolved paths stay in braces." : "No upstream context — connect this node to see what it can reference." })
    ] })
  ] });
}
const uc = ["context", "context.steps", "context.trigger"], mc = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function hc({ data: t, onChange: n }) {
  const r = !t.expression?.trim();
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(ye, { label: "Type", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: mc.map((i) => /* @__PURE__ */ o(
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
      ye,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : t.transformType === "jsonpath" ? 'e.g. $.items[?(@.status == "active")]' : t.transformType === "template" ? "Mustache-style: {{ context.doc.title }}" : t.transformType === "javascript" ? "return ctx.items.filter(x => x.active)" : void 0,
        children: /* @__PURE__ */ e(
          Qn,
          {
            value: t.expression,
            onChange: (i) => n({ expression: i }),
            language: t.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: uc,
            "aria-label": "Transform expression"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      ye,
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
      nr,
      {
        value: t.retryPolicy,
        onChange: (i) => n({ retryPolicy: i })
      }
    ),
    /* @__PURE__ */ e(ye, { label: "Preview", children: /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2", children: [
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
const fc = ["context.trigger", "context.steps"];
function gc({ data: t, onChange: n }) {
  const r = !t.expression?.trim();
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ e(
      ye,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : "e.g. context.llm.response.length > 500",
        children: /* @__PURE__ */ e(
          Qn,
          {
            value: t.expression,
            onChange: (i) => n({ expression: i }),
            language: "javascript",
            variables: fc,
            "aria-label": "Condition expression"
          }
        )
      }
    ),
    /* @__PURE__ */ e(ye, { label: "Label (optional — shown on node face)", help: "A short name so this branch is easy to spot.", children: /* @__PURE__ */ e(
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
const xc = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], bc = {
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
function yc({ data: t, onChange: n }) {
  const r = bc[t.actionType], i = t.config ?? {}, a = typeof i.retryCount == "number" ? i.retryCount : 3, s = t.onError === "route-error" ? "route-error" : typeof i.retryCount == "number" ? "retry" : "halt", d = (l, p) => {
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
    /* @__PURE__ */ e(ye, { label: "Action type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.actionType,
        onChange: (l) => n({ actionType: l.target.value, config: {} }),
        children: xc.map((l) => /* @__PURE__ */ e("option", { value: l.value, children: l.label }, l.value))
      }
    ) }),
    /* @__PURE__ */ e(ye, { label: "Configuration", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-2.5", children: r.map((l) => /* @__PURE__ */ o("div", { children: [
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
    t.idempotent && /* @__PURE__ */ o(ye, { label: "Dedup scope", children: [
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
      nr,
      {
        value: t.retryPolicy,
        onChange: (l) => n({ retryPolicy: l })
      }
    ),
    /* @__PURE__ */ e(ye, { label: "On error", children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
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
const nt = 2, Ct = 8;
function $r(t, n) {
  const r = t ?? [];
  return r.length === n ? r : r.length > n ? r.slice(0, n) : [...r, ...Array(n - r.length).fill("")];
}
function vc({ data: t, onChange: n }) {
  const r = Math.max(nt, Math.min(Ct, t.branchCount || nt)), i = $r(t.branchLabels, r), a = (d) => {
    const c = Math.max(nt, Math.min(Ct, d));
    n({
      branchCount: c,
      branchLabels: $r(t.branchLabels, c)
    });
  }, s = (d, c) => {
    const l = [...i];
    l[d] = c, n({ branchLabels: l });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(
      ye,
      {
        label: "Branch count",
        required: !0,
        help: `Between ${nt} and ${Ct} parallel branches.`,
        children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs ml-2", children: r }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: nt,
              max: Ct,
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
              min: nt,
              max: Ct,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit mt-1",
              value: r,
              onChange: (d) => a(parseInt(d.target.value, 10) || nt)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e(ye, { label: "Branch labels (optional)", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: i.map((d, c) => /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
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
const Nc = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], wc = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function kc({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(ye, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: Nc.map((r) => /* @__PURE__ */ o(
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
    /* @__PURE__ */ e(ye, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: wc.map((r) => /* @__PURE__ */ o(
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
const Bt = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5
};
function Cc(t) {
  return !t || t <= 0 ? "minutes" : t % Bt.hours === 0 ? "hours" : t % Bt.minutes === 0 ? "minutes" : "seconds";
}
function Ic({ data: t, onChange: n }) {
  const r = t.approvers ?? [], i = r.length === 0, [a, s] = S(() => Cc(t.timeoutMs)), d = t.timeoutMs !== void 0 ? Math.round(t.timeoutMs / Bt[a]) : "", c = r.filter((g) => g.type === "user").map((g) => g.value), l = (g) => {
    const x = r.filter((v) => v.type === "role"), N = [...g.map((v) => ({ type: "user", value: v })), ...x];
    n({
      approvers: N,
      // Clamp requiredCount so it never exceeds approvers.length (min 1).
      requiredCount: Math.max(1, Math.min(t.requiredCount || 1, N.length || 1))
    });
  }, p = (g) => {
    const x = r.filter((f, N) => N !== g);
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
    n({ timeoutMs: x * Bt[a] });
  }, h = (g) => {
    s(g), typeof d == "number" && !Number.isNaN(d) && n({ timeoutMs: d * Bt[g] });
  }, m = Math.max(1, r.length);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o(
      ye,
      {
        label: "Approvers",
        required: !0,
        error: i ? "At least one approver is required." : void 0,
        help: i ? void 0 : "Who can approve this step.",
        children: [
          /* @__PURE__ */ e(
            _a,
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
      ye,
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
              max: m,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-24 font-inherit",
              value: t.requiredCount || 1,
              onChange: (g) => {
                const x = parseInt(g.target.value, 10), f = Math.max(1, Math.min(m, Number.isNaN(x) ? 1 : x));
                n({ requiredCount: f });
              }
            }
          ),
          /* @__PURE__ */ o("span", { className: "text-text-tertiary text-xs", children: [
            t.requiredCount || 1,
            " of ",
            m
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ o(ye, { label: "Timeout", help: "Leave blank for no timeout.", children: [
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
            onChange: (g) => h(g.target.value),
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
    /* @__PURE__ */ e(ye, { label: "Message for approver (optional)", help: "Shown to the approver when the request is sent.", children: /* @__PURE__ */ e(
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
function jn(t) {
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
function Ut(t, n, r, i, a) {
  if (a.has(t)) return;
  a.add(t);
  const s = Array.isArray(t.type) ? t.type[0] : t.type, d = [t.anyOf, t.oneOf, t.allOf].filter(Boolean);
  for (const c of d)
    for (const l of c)
      Ut(l, n, r, i, a);
  if (s === "object" && t.properties) {
    for (const [c, l] of Object.entries(t.properties)) {
      const p = `${n}.${c}`, u = jn(l);
      i.push({
        path: p,
        label: `${c} (${jo(l)})`,
        depth: r,
        kind: u,
        isArrayItems: u === "array"
      }), Ut(l, p, r + 1, i, a);
    }
    return;
  }
  if (s === "array") {
    const c = `${n}[*]`, l = t.items, p = l ? jn(l) : "unknown";
    i.push({
      path: c,
      label: `${n.slice(n.lastIndexOf(".") + 1)}[*] (each item)`,
      depth: r,
      kind: p,
      isArrayItems: !0
    }), l && Ut(l, c, r + 1, i, a);
  }
}
function Sc(t, n = "$") {
  if (!t || typeof t != "object") return [];
  const r = [], i = /* @__PURE__ */ new Set();
  if ((Array.isArray(t.type) ? t.type[0] : t.type) === "object" && t.properties)
    for (const [s, d] of Object.entries(t.properties)) {
      const c = `${n}.${s}`, l = jn(d);
      r.push({
        path: c,
        label: `${s} (${jo(d)})`,
        depth: 0,
        kind: l,
        isArrayItems: l === "array"
      }), Ut(d, c, 1, r, i);
    }
  else
    Ut(t, n, 0, r, i);
  return r;
}
const $c = {};
function Tc() {
  return `${(typeof import.meta < "u" && $c?.VITE_SOCIAL_API_URL) ?? ""}/api/pipeline/output-schemas`;
}
let bn = null, It = null;
async function Rc() {
  return bn || (It || (It = fetch(Tc()).then((t) => {
    if (!t.ok) throw new Error(`HTTP ${t.status}`);
    return t.json();
  }).then((t) => (bn = t, It = null, t)).catch((t) => {
    throw It = null, t;
  })), It);
}
const Pc = {
  array: "bg-primary-bg text-primary-fg border-primary-border",
  object: "bg-surface-panel text-text-secondary border-border",
  string: "bg-success-bg text-success-fg border-success-border",
  number: "bg-warning-bg text-warning-fg border-warning-border",
  boolean: "bg-pink-50 text-pink-700 border-pink-200",
  unknown: "bg-surface-panel text-text-tertiary border-border"
};
function Ac({ kind: t }) {
  return /* @__PURE__ */ e(
    "span",
    {
      className: I(
        "inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4",
        Pc[t]
      ),
      children: t
    }
  );
}
function Dc({ entry: t, isSelected: n, onPick: r }) {
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
        /* @__PURE__ */ e(Ac, { kind: t.kind })
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
  const p = z(() => i !== void 0 ? i : d, [i, d]);
  re(() => {
    !r || i !== void 0 || (s("loading"), Rc().then((f) => {
      if (!l.current) return;
      const N = f.schemas[r] ?? null;
      c(N), s("done");
    }).catch(() => {
      l.current && s("error");
    }));
  }, [r, i]);
  const u = z(
    () => Sc(p),
    [p]
  ), h = p !== null && u.length > 0, m = M(
    (f) => {
      n(f);
    },
    [n]
  );
  if (!r && i === void 0)
    return /* @__PURE__ */ e(
      pn,
      {
        value: t,
        onChange: n,
        enforcePrefix: !0,
        "data-testid": "scatter-path-plain-input"
      }
    );
  if (!h)
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
        pn,
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
      x && /* @__PURE__ */ o(V, { children: [
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
          Dc,
          {
            entry: f,
            isSelected: t === f.path,
            onPick: m
          },
          f.path
        ))
      }
    ),
    /* @__PURE__ */ e(
      pn,
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
const yn = "text-[12px] font-semibold text-text-secondary", vn = "text-[11px] text-text-tertiary mt-0.5", Oc = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary";
function Ec(t) {
  const { definition: n } = Le();
  return z(() => {
    if (!t || !n) return;
    const r = n.edges.find((a) => a.target === t);
    if (!r) return;
    const i = n.nodes.find((a) => a.id === r.source);
    if (i)
      return i.type;
  }, [t, n]);
}
function _c({ data: t, onChange: n }) {
  const { selectedNodeId: r } = Le(), i = Ec(r), a = t.maxConcurrency ?? "";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { className: yn, children: [
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
      !!t.itemsPath?.startsWith("$.") && /* @__PURE__ */ e("div", { className: vn, children: "JSONPath into context resolving to an array. Each element becomes one scatter arm." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-item-alias", className: yn, children: [
        "Item alias ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, default: item)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "scatter-item-alias",
          type: "text",
          spellCheck: !1,
          className: Oc,
          value: t.itemAlias ?? "",
          onChange: (s) => n({ itemAlias: s.target.value.trim() || void 0 }),
          placeholder: "item"
        }
      ),
      /* @__PURE__ */ o("div", { className: vn, children: [
        "Key written to ",
        /* @__PURE__ */ e("code", { children: "$.scatter.<alias>" }),
        " for each arm."
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-max-concurrency", className: yn, children: [
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
      /* @__PURE__ */ e("div", { className: vn, children: "Maximum number of arms executing concurrently." })
    ] })
  ] });
}
function Lc({ samples: t, onSelect: n }) {
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
const Bc = ["cover", "contain", "fill", "inside", "outside"], St = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", $t = "text-[12px] font-semibold text-text-secondary", Tr = "text-[11px] text-text-tertiary mt-0.5";
function Uc({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "resize-source-image-path", className: $t, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "resize-source-image-path",
          type: "text",
          spellCheck: !1,
          className: St,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Lc, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "resize-width", className: $t, children: "Width (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "resize-width",
            type: "number",
            min: 1,
            step: 1,
            className: St,
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
        /* @__PURE__ */ e("label", { htmlFor: "resize-height", className: $t, children: "Height (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "resize-height",
            type: "number",
            min: 1,
            step: 1,
            className: St,
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
      /* @__PURE__ */ e("label", { htmlFor: "resize-fit", className: $t, children: "Fit mode" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "resize-fit",
          className: St,
          value: t.fit ?? "cover",
          onChange: (a) => n({ fit: a.target.value }),
          children: Bc.map((a) => /* @__PURE__ */ e("option", { value: a, children: a }, a))
        }
      ),
      /* @__PURE__ */ o("div", { className: Tr, children: [
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
      /* @__PURE__ */ o("label", { htmlFor: "resize-background", className: $t, children: [
        "Background colour ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, for contain / fill)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "resize-background",
          type: "text",
          spellCheck: !1,
          className: St,
          value: t.background ?? "",
          onChange: (a) => n({ background: a.target.value.trim() || void 0 }),
          placeholder: "#ffffff"
        }
      ),
      /* @__PURE__ */ o("div", { className: Tr, children: [
        "Hex colour used to fill letterbox padding. Only applies when fit is ",
        /* @__PURE__ */ e("code", { children: "contain" }),
        " or ",
        /* @__PURE__ */ e("code", { children: "fill" }),
        "."
      ] })
    ] })
  ] });
}
function Fc({ samples: t, onSelect: n }) {
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
function jc(t) {
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
const zn = "text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", zc = "flex-1 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Rr = "text-[12px] font-semibold text-text-secondary", qc = "text-[11px] text-text-tertiary mt-0.5";
function Wc({ op: t, index: n, onUpdate: r, onRemove: i }) {
  return /* @__PURE__ */ o("div", { className: "border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2", "data-testid": `geo-op-card-${n}`, children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary font-semibold min-w-[20px]", children: [
        n + 1,
        "."
      ] }),
      /* @__PURE__ */ o(
        "select",
        {
          className: zc,
          value: t.op,
          onChange: (a) => r(jc(a.target.value)),
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
    t.op === "rotate" && /* @__PURE__ */ o(V, { children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e("label", { className: "text-[11px] text-text-tertiary min-w-[60px]", children: "Degrees" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "number",
            min: -360,
            max: 360,
            step: 90,
            className: `${zn} w-24`,
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
            className: `${zn} flex-1`,
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
function Vc({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null), a = t.operations ?? [], s = (l, p) => {
    n({ operations: a.map((u, h) => h === l ? p : u) });
  }, d = (l) => {
    n({ operations: a.filter((p, u) => u !== l) });
  }, c = () => {
    n({ operations: [...a, { op: "rotate", degrees: 90 }] });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "transform-geo-source-image-path", className: Rr, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "transform-geo-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `mt-1 w-full ${zn}`,
          value: t.sourceImagePath ?? "",
          onChange: (l) => n({ sourceImagePath: l.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Fc, { samples: i.map((l) => l.path), onSelect: (l) => n({ sourceImagePath: l }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${Rr} mb-2`, children: [
        "Operations ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      a.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-2 italic", children: "No operations — add at least one." }),
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: a.map((l, p) => /* @__PURE__ */ e(
        Wc,
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
      /* @__PURE__ */ e("div", { className: `${qc} mt-1.5`, children: "Supported: Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror)." })
    ] })
  ] });
}
function Jc({ samples: t, onSelect: n }) {
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
const Hc = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "avif", label: "AVIF" }
], qn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Kc = `${qn} font-mono`, Nn = "text-[12px] font-semibold text-text-secondary", wn = "text-[11px] text-text-tertiary mt-0.5";
function Gc({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null), a = t.format === "jpeg" || t.format === "webp" || t.format === "avif";
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-source-image-path", className: Nn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "format-convert-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Kc,
          value: t.sourceImagePath ?? "",
          onChange: (s) => n({ sourceImagePath: s.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Jc, { samples: i.map((s) => s.path), onSelect: (s) => n({ sourceImagePath: s }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "format-convert-format", className: Nn, children: "Output format" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "format-convert-format",
          className: qn,
          value: t.format ?? "jpeg",
          onChange: (s) => n({ format: s.target.value }),
          children: Hc.map((s) => /* @__PURE__ */ e("option", { value: s.value, children: s.label }, s.value))
        }
      )
    ] }),
    a && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-quality", className: Nn, children: [
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
          className: qn,
          value: t.quality ?? 80,
          onChange: (s) => {
            const d = parseInt(s.target.value, 10);
            n({ quality: Number.isFinite(d) ? Math.min(100, Math.max(1, d)) : 80 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: wn, children: "Higher = better quality, larger file. 80 is a good default." })
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
      /* @__PURE__ */ e("div", { className: wn, children: "Overrides quality when enabled. Produces larger files with no compression artefacts." })
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
      /* @__PURE__ */ e("div", { className: wn, children: "Removes camera EXIF, GPS, copyright tags etc. Reduces file size; recommended for web delivery." })
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
const Jt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Ht = "text-[12px] font-semibold text-text-secondary", kn = "text-[11px] text-text-tertiary mt-0.5";
function Xc({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-source-image-path", className: Ht, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "sharpen-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `${Jt} font-mono`,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Yc, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-sigma", className: Ht, children: [
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
          className: Jt,
          value: t.sigma ?? "",
          onChange: (a) => {
            const s = parseFloat(a.target.value);
            n({ sigma: Number.isFinite(s) && s > 0 ? s : void 0 });
          },
          placeholder: "1"
        }
      ),
      /* @__PURE__ */ e("div", { className: kn, children: "Gaussian mask sigma. Higher = broader/stronger sharpening. Typical range: 0.5–3." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-m1", className: Ht, children: [
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
          className: Jt,
          value: t.m1 ?? "",
          onChange: (a) => {
            const s = parseFloat(a.target.value);
            n({ m1: Number.isFinite(s) && s >= 0 ? s : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: kn, children: "Level of sharpening applied to flat (smooth) areas of the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-m2", className: Ht, children: [
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
          className: Jt,
          value: t.m2 ?? "",
          onChange: (a) => {
            const s = parseFloat(a.target.value);
            n({ m2: Number.isFinite(s) && s >= 0 ? s : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: kn, children: "Level of sharpening applied to jagged (edge) areas of the image." })
    ] })
  ] });
}
function Qc({ samples: t, onSelect: n }) {
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
const Zc = [
  "northwest",
  "north",
  "northeast",
  "west",
  "center",
  "east",
  "southwest",
  "south",
  "southeast"
], Dt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Pr = `${Dt} font-mono`, lt = "text-[12px] font-semibold text-text-secondary", Ar = "text-[11px] text-text-tertiary mt-0.5";
function ed({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "watermark-source-image-path", className: lt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Pr,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Qc, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-overlay-image-id", className: lt, children: "Overlay image ID" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-overlay-image-id",
          type: "text",
          spellCheck: !1,
          className: Pr,
          value: t.overlayImageId ?? "",
          onChange: (a) => n({ overlayImageId: a.target.value.trim() }),
          placeholder: "img_xxxxxxxx"
        }
      ),
      /* @__PURE__ */ e("div", { className: Ar, children: "The imageId of the watermark/overlay image already stored in the blob store. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-gravity", className: lt, children: "Gravity (placement)" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "watermark-gravity",
          className: Dt,
          value: t.gravity ?? "southeast",
          onChange: (a) => n({ gravity: a.target.value }),
          children: Zc.map((a) => /* @__PURE__ */ e("option", { value: a, children: a }, a))
        }
      ),
      /* @__PURE__ */ e("div", { className: Ar, children: "Where the overlay is placed on the source image. Default: southeast." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "watermark-opacity", className: lt, children: [
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
          className: Dt,
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
        /* @__PURE__ */ e("label", { htmlFor: "watermark-offset-x", className: lt, children: "Offset X (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "watermark-offset-x",
            type: "number",
            step: 1,
            className: Dt,
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
        /* @__PURE__ */ e("label", { htmlFor: "watermark-offset-y", className: lt, children: "Offset Y (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "watermark-offset-y",
            type: "number",
            step: 1,
            className: Dt,
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
const Dr = 50;
function td(t, n) {
  const [r, i] = S(t), [a, s] = S([]), [d, c] = S([]), l = ce(r);
  l.current = r;
  const p = M(
    (v) => {
      i((b) => {
        const w = v(b);
        return s((y) => {
          const k = [...y, b];
          return k.length > Dr && k.shift(), k;
        }), c([]), n(w), w;
      });
    },
    [n]
  ), u = M(
    (v) => {
      p((b) => [...b, v]);
    },
    [p]
  ), h = M(
    (v, b, w) => {
      p(
        (y) => y.map((k) => k.id === v ? { ...k, x: b, y: w } : k)
      );
    },
    [p]
  ), m = M(
    (v, b, w, y, k) => {
      p(
        (C) => C.map(($) => $.id === v ? { ...$, x: b, y: w, width: y, height: k } : $)
      );
    },
    [p]
  ), g = M(
    (v, b) => {
      p(
        (w) => w.map((y) => y.id === v ? { ...y, label: b } : y)
      );
    },
    [p]
  ), x = M(
    (v) => {
      p((b) => b.filter((w) => w.id !== v));
    },
    [p]
  ), f = M(() => {
    s((v) => {
      if (v.length === 0) return v;
      const b = v[v.length - 1];
      c((y) => [...y, l.current]);
      const w = b;
      return i(w), n(w), v.slice(0, -1);
    });
  }, [n]), N = M(() => {
    c((v) => {
      if (v.length === 0) return v;
      const b = v[v.length - 1];
      s((y) => {
        const k = [...y, l.current];
        return k.length > Dr && k.shift(), k;
      });
      const w = b;
      return i(w), n(w), v.slice(0, -1);
    });
  }, [n]);
  return {
    boxes: r,
    addBox: u,
    moveBox: h,
    resizeBox: m,
    setLabel: g,
    deleteBox: x,
    undo: f,
    redo: N,
    canUndo: a.length > 0,
    canRedo: d.length > 0
  };
}
function nd() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Ce(t, n, r) {
  return Math.max(n, Math.min(r, t));
}
function Cn(t, n) {
  const r = n.getBoundingClientRect();
  return {
    x: Ce(t.clientX - r.left, 0, r.width),
    y: Ce(t.clientY - r.top, 0, r.height)
  };
}
function In(t, n, r, i, a, s) {
  const d = a / r, c = s / i;
  return { x: t * d, y: n * c };
}
function Mr(t, n, r) {
  return {
    left: `${t.x / n * 100}%`,
    top: `${t.y / r * 100}%`,
    width: `${t.width / n * 100}%`,
    height: `${t.height / r * 100}%`
  };
}
function rd(t, n, r) {
  for (let i = r.length - 1; i >= 0; i--) {
    const a = r[i];
    if (t >= a.x && t <= a.x + a.width && n >= a.y && n <= a.y + a.height)
      return a;
  }
  return null;
}
function zo({
  imageUrl: t,
  imageWidth: n,
  imageHeight: r,
  boxes: i,
  onChange: a,
  readOnly: s = !1,
  className: d
}) {
  const c = ce(null), [l, p] = S({ kind: "idle" }), [u, h] = S(null), m = ce(null), { addBox: g, moveBox: x, resizeBox: f, setLabel: N, deleteBox: v } = td(
    i,
    a
  );
  re(() => {
    u && m.current && (m.current.focus(), m.current.select());
  }, [u]);
  const b = M(
    (E) => {
      if (s || E.button !== 0) return;
      const T = c.current;
      if (!T) return;
      E.preventDefault(), T.setPointerCapture(E.pointerId);
      const { x: K, y: G } = Cn(E, T), U = T.getBoundingClientRect(), { x: q, y: W } = In(
        K,
        G,
        U.width,
        U.height,
        n,
        r
      ), X = rd(q, W, i);
      p(X ? {
        kind: "move",
        id: X.id,
        offsetX: q - X.x,
        offsetY: W - X.y,
        currentX: q,
        currentY: W
      } : { kind: "create", startX: q, startY: W, currentX: q, currentY: W });
    },
    [s, i, n, r]
  ), w = M(
    (E, T, K) => {
      if (s) return;
      E.stopPropagation(), E.preventDefault();
      const G = c.current;
      if (!G) return;
      G.setPointerCapture(E.pointerId);
      const { x: U, y: q } = Cn(E, G), W = G.getBoundingClientRect(), { x: X, y: pe } = In(U, q, W.width, W.height, n, r);
      p({ kind: "resize", id: T.id, corner: K, origBox: { ...T }, currentX: X, currentY: pe });
    },
    [s, n, r]
  ), y = M(
    (E) => {
      if (l.kind === "idle") return;
      const T = c.current;
      if (!T) return;
      const { x: K, y: G } = Cn(E, T), U = T.getBoundingClientRect(), { x: q, y: W } = In(K, G, U.width, U.height, n, r);
      l.kind === "create" ? p((X) => X.kind === "create" ? { ...X, currentX: q, currentY: W } : X) : l.kind === "move" ? p((X) => X.kind === "move" ? { ...X, currentX: q, currentY: W } : X) : l.kind === "resize" && p((X) => X.kind === "resize" ? { ...X, currentX: q, currentY: W } : X);
    },
    [l.kind, n, r]
  ), k = M(
    (E) => {
      if (l.kind === "create") {
        const T = Math.min(l.startX, l.currentX), K = Math.min(l.startY, l.currentY), G = Math.max(l.startX, l.currentX), U = Math.max(l.startY, l.currentY), q = G - T, W = U - K;
        q >= 4 && W >= 4 && g({ id: nd(), x: T, y: K, width: q, height: W });
      } else if (l.kind === "move") {
        const T = i.find((K) => K.id === l.id);
        if (T) {
          const K = Ce(l.currentX - l.offsetX, 0, n - T.width), G = Ce(l.currentY - l.offsetY, 0, r - T.height);
          x(l.id, K, G);
        }
      } else if (l.kind === "resize") {
        const { id: T, corner: K, origBox: G, currentX: U, currentY: q } = l;
        let { x: W, y: X, width: pe, height: j } = G;
        if (K === "nw") {
          const le = Ce(U, 0, W + pe - 4), we = Ce(q, 0, X + j - 4);
          pe = W + pe - le, j = X + j - we, W = le, X = we;
        } else if (K === "ne") {
          const le = Ce(q, 0, X + j - 4);
          pe = Ce(U - W, 4, n - W), j = X + j - le, X = le;
        } else if (K === "sw") {
          const le = Ce(U, 0, W + pe - 4);
          pe = W + pe - le, j = Ce(q - X, 4, r - X), W = le;
        } else
          pe = Ce(U - W, 4, n - W), j = Ce(q - X, 4, r - X);
        f(T, W, X, pe, j);
      }
      p({ kind: "idle" });
    },
    [l, i, g, x, f, n, r]
  ), C = M(
    (E, T) => {
      s || (E.preventDefault(), v(T));
    },
    [s, v]
  ), $ = M(
    (E, T) => {
      s || (E.key === "Delete" || E.key === "Backspace") && (E.preventDefault(), v(T));
    },
    [s, v]
  ), A = M(
    (E, T) => {
      s || (E.stopPropagation(), h({ id: T.id, value: T.label ?? "" }));
    },
    [s]
  ), D = M(() => {
    u && (N(u.id, u.value), h(null));
  }, [u, N]);
  let O = null;
  if (l.kind === "create") {
    const E = Math.min(l.startX, l.currentX), T = Math.min(l.startY, l.currentY), K = Math.max(l.startX, l.currentX), G = Math.max(l.startY, l.currentY);
    K - E >= 2 && G - T >= 2 && (O = { x: E, y: T, width: K - E, height: G - T });
  }
  let ne = null;
  if (l.kind === "move") {
    const E = i.find((T) => T.id === l.id);
    if (E) {
      const T = Ce(l.currentX - l.offsetX, 0, n - E.width), K = Ce(l.currentY - l.offsetY, 0, r - E.height);
      ne = { ...E, x: T, y: K };
    }
  }
  let R = null;
  if (l.kind === "resize") {
    const { corner: E, origBox: T, currentX: K, currentY: G } = l;
    let { x: U, y: q, width: W, height: X } = T;
    if (E === "nw") {
      const pe = Ce(K, 0, U + W - 4), j = Ce(G, 0, q + X - 4);
      W = U + W - pe, X = q + X - j, U = pe, q = j;
    } else if (E === "ne") {
      const pe = Ce(G, 0, q + X - 4);
      W = Ce(K - U, 4, n - U), X = q + X - pe, q = pe;
    } else if (E === "sw") {
      const pe = Ce(K, 0, U + W - 4);
      W = U + W - pe, X = Ce(G - q, 4, r - q), U = pe;
    } else
      W = Ce(K - U, 4, n - U), X = Ce(G - q, 4, r - q);
    R = { ...T, x: U, y: q, width: W, height: X };
  }
  const J = /* @__PURE__ */ new Set();
  l.kind === "move" && J.add(l.id), l.kind === "resize" && J.add(l.id);
  const Y = (E, T) => {
    const K = {
      nw: "-top-1.5 -left-1.5 cursor-nw-resize",
      ne: "-top-1.5 -right-1.5 cursor-ne-resize",
      sw: "-bottom-1.5 -left-1.5 cursor-sw-resize",
      se: "-bottom-1.5 -right-1.5 cursor-se-resize"
    };
    return /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "aria-label": `Resize ${T}`,
        className: I(
          "absolute h-3 w-3 rounded-sm border border-primary bg-white shadow",
          K[T]
        ),
        onPointerDown: (G) => w(G, E, T)
      },
      T
    );
  }, H = (E, T, K, G) => {
    const U = Mr(E, n, r), q = u?.id === E.id;
    return /* @__PURE__ */ o(
      "div",
      {
        role: "none",
        "aria-label": `Bounding box${E.label ? ": " + E.label : ""}`,
        className: I(
          "absolute",
          T ? "opacity-60" : "opacity-100"
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
          q ? /* @__PURE__ */ e(
            "input",
            {
              ref: m,
              type: "text",
              value: u.value,
              onChange: (W) => h((X) => X ? { ...X, value: W.target.value } : null),
              onBlur: D,
              onKeyDown: (W) => {
                W.key === "Enter" && (W.preventDefault(), D()), W.key === "Escape" && (W.preventDefault(), h(null));
              },
              className: "absolute -top-5 left-0 w-24 rounded border border-primary bg-white px-1 py-0 text-[10px] font-semibold text-primary shadow outline-none focus:ring-1 focus:ring-primary",
              onClick: (W) => W.stopPropagation()
            }
          ) : /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              tabIndex: 0,
              "aria-label": `Label: ${E.label || "Unlabeled"}. Double-click to edit.`,
              className: "absolute -top-5 left-0 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow",
              style: { whiteSpace: "nowrap" },
              onDoubleClick: (W) => A(W, E),
              onContextMenu: (W) => C(W, E.id),
              onKeyDown: (W) => $(W, E.id),
              children: E.label || "Unlabeled"
            }
          ),
          K && !s && /* @__PURE__ */ o(V, { children: [
            Y(E, "nw"),
            Y(E, "ne"),
            Y(E, "sw"),
            Y(E, "se")
          ] })
        ]
      },
      G
    );
  }, Q = () => {
    if (!O) return null;
    const E = Mr(O, n, r);
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
              i.map((E) => J.has(E.id) ? null : H(E, !1, !0, `box-${E.id}`)),
              ne && H(ne, !0, !1, "ghost-move"),
              R && H(R, !0, !0, "ghost-resize"),
              Q()
            ]
          }
        ),
        !s && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute bottom-1.5 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80", children: "Drag to add box" })
      ]
    }
  );
}
const od = [
  "$.scatter.item.bbox",
  "$.steps.visionAnalyze.output.extracted.regions[0].bbox",
  "$.trigger.payload.bbox"
], ad = "crop-region", id = "crop";
function Or({
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
const Er = "mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Sn = "text-[12px] font-semibold text-text-secondary", Tt = "text-[11px] text-text-tertiary mt-0.5";
function sd(t) {
  const { definition: n } = Le(), r = z(() => !t || !n ? null : n.edges.find((d) => d.target === t)?.source ?? null, [n, t]), a = me(r ?? "")?.images?.[0];
  return a ? { imageId: a.imageId, width: a.width, height: a.height } : null;
}
function ld({
  data: t,
  onChange: n,
  currentNodeId: r
}) {
  const i = $e(r ?? null), a = t.materialize !== !1, s = sd(r), d = Te(), c = z(() => t.bbox ? [
    {
      id: ad,
      x: t.bbox.x,
      y: t.bbox.y,
      width: t.bbox.width,
      height: t.bbox.height,
      label: id
    }
  ] : [], [t.bbox]), l = M(
    (p) => {
      if (p.length === 0) {
        n({ bbox: void 0 });
        return;
      }
      const u = p[p.length - 1], h = {
        x: Math.round(u.x),
        y: Math.round(u.y),
        width: Math.round(u.width),
        height: Math.round(u.height)
      };
      n({ bbox: h });
    },
    [n]
  );
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-source-image-path", className: Sn, children: [
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
          onChange: (p) => n({ sourceImagePath: p.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ o("div", { className: Tt, children: [
        "JSONPath to the imageId of the source image. Defaults server-side to",
        " ",
        /* @__PURE__ */ e("code", { children: "$.scatter.parentImageId" }),
        "."
      ] }),
      /* @__PURE__ */ e(
        Or,
        {
          samples: i.map((p) => p.path),
          onSelect: (p) => n({ sourceImagePath: p })
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-bbox-path", className: Sn, children: [
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
          onChange: (p) => n({ bboxPath: p.target.value.trim() || void 0 }),
          placeholder: "$.scatter.item.bbox"
        }
      ),
      /* @__PURE__ */ o("div", { className: Tt, children: [
        "JSONPath to a bbox object ",
        /* @__PURE__ */ e("code", { children: "{ x, y, width, height }" }),
        " in pixels. Overrides the manual crop region below when present at run time."
      ] }),
      /* @__PURE__ */ e(
        Or,
        {
          samples: od,
          onSelect: (p) => n({ bboxPath: p })
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { "data-testid": "crop-region-section", children: [
      /* @__PURE__ */ o("div", { className: Sn, children: [
        "Crop region",
        " ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e("div", { className: Tt, children: "Drag on the source image to paint the crop box. Drawing a new box replaces the previous one." }),
      s ? /* @__PURE__ */ o(V, { children: [
        /* @__PURE__ */ e(
          zo,
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
            children: t.bbox ? /* @__PURE__ */ o(V, { children: [
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
            ] }) : /* @__PURE__ */ e("span", { className: I(Tt, "italic"), children: "No crop region yet — drag on the image to add one." })
          }
        )
      ] }) : /* @__PURE__ */ e(
        et,
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
    /* @__PURE__ */ e("div", { className: Tt, children: "When enabled (default), the cropped image is saved to the ImageBlobStore." })
  ] });
}
function cd(t) {
  const { selectedNodeId: n } = Le();
  return /* @__PURE__ */ e(ld, { ...t, currentNodeId: n });
}
function dd({ samples: t, onSelect: n }) {
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
const _r = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", $n = "text-[12px] font-semibold text-text-secondary", Tn = "text-[11px] text-text-tertiary mt-0.5";
function pd({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null), a = t.algorithm ?? "luminosity", s = t.contrast ?? 1;
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-bw-source-image-path", className: $n, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "adjust-bw-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `${_r} font-mono`,
          value: t.sourceImagePath ?? "",
          onChange: (d) => n({ sourceImagePath: d.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: Tn, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(dd, { samples: i.map((d) => d.path), onSelect: (d) => n({ sourceImagePath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "adjust-bw-algorithm", className: $n, children: "Greyscale algorithm" }),
      /* @__PURE__ */ o(
        "select",
        {
          id: "adjust-bw-algorithm",
          className: _r,
          value: a,
          onChange: (d) => n({ algorithm: d.target.value }),
          children: [
            /* @__PURE__ */ e("option", { value: "luminosity", children: "Luminosity — 0.21R + 0.72G + 0.07B (perceptually accurate)" }),
            /* @__PURE__ */ e("option", { value: "average", children: "Average — (R+G+B)/3 (fast, flat)" }),
            /* @__PURE__ */ e("option", { value: "desaturate", children: "Desaturate — (max+min)/2 (Lightness channel)" })
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: Tn, children: "Controls how RGB channels are weighted when converting to greyscale." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-bw-contrast", className: $n, children: [
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
      /* @__PURE__ */ o("div", { className: Tn, children: [
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
  const [u, h] = S(!1), [m, g] = S(null), [x, f] = S("");
  async function N(w) {
    h(!0), g(null);
    try {
      const y = await r(w);
      n(y), f("");
    } catch (y) {
      const k = y instanceof Error ? y.message : "Upload failed. Please try again.";
      g(k);
    } finally {
      h(!1);
    }
  }
  function v(w) {
    w.length > 0 && N(w[0]);
  }
  async function b() {
    const w = x.trim();
    w && await N({ url: w });
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
            $o,
            {
              src: w,
              alt: "Uploaded image",
              size: "md",
              aspectRatio: "square",
              "data-testid": p ? `${p}-thumbnail` : void 0
            }
          ),
          /* @__PURE__ */ e(
            _e,
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
          Fa,
          {
            accept: s,
            maxSize: a,
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
              /* @__PURE__ */ e(
                Ft,
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
                _e,
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
        m && /* @__PURE__ */ e(
          "p",
          {
            role: "alert",
            className: "text-sm text-danger-fg",
            "data-testid": p ? `${p}-error` : void 0,
            children: m
          }
        )
      ]
    }
  );
}
function qo(t) {
  const n = So(), r = n.uploadImage;
  return r ? /* @__PURE__ */ e(
    ud,
    {
      ...t,
      uploadImage: r,
      getImageUrl: n.getImageUrl
    }
  ) : /* @__PURE__ */ e("div", { className: "text-sm text-neutral", children: "This host has not wired uploadImage. Cannot accept new uploads." });
}
const Wn = {
  brightness: "Brightness",
  contrast: "Contrast",
  saturation: "Saturation",
  hue: "Hue",
  blur: "Blur"
}, Wo = Object.keys(Wn).map((t) => ({
  value: t,
  label: Wn[t]
})), md = {
  brightness: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  contrast: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  saturation: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  hue: { min: -180, max: 180, step: 1, unit: "°", defaultValue: 0 },
  blur: { min: 0, max: 50, step: 0.5, unit: "px", defaultValue: 1 }
};
function Vo(t) {
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
function Lr(t, n) {
  switch (t.kind) {
    case "hue":
      return { kind: "hue", degrees: n };
    case "blur":
      return { kind: "blur", radiusPx: n };
    default:
      return { kind: t.kind, value: n };
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
function gd({ layer: t, index: n, onUpdate: r, onRemove: i }) {
  const a = md[t.kind], s = hd(t), d = (p) => {
    r(Vo(p.target.value));
  }, c = (p) => {
    const u = parseFloat(p.target.value);
    Number.isFinite(u) && r(Lr(t, u));
  }, l = (p) => {
    r(Lr(t, p));
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-surface-inset",
      "data-testid": `layer-row-${n}`,
      children: [
        /* @__PURE__ */ e("span", { className: fd, "aria-hidden": "true", title: "Drag handle", children: "⠿" }),
        /* @__PURE__ */ e(
          nn,
          {
            value: t.kind,
            onChange: d,
            options: Wo,
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
            "aria-label": `${Wn[t.kind]} slider`,
            "data-testid": `layer-slider-${n}`
          }
        ),
        /* @__PURE__ */ e(
          ma,
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
const xd = 150;
function bd(t, n, r) {
  const [i, a] = S(null), [s, d] = S(!1), c = ce(null), l = ce(null), p = M(
    async (u, h) => {
      l.current?.abort();
      const m = new AbortController();
      l.current = m, d(!0);
      try {
        const g = await fetch(`${r}/api/pipeline/preview/adjust-layer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageId: u, layers: h }),
          signal: m.signal
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
    }, xd), () => {
      c.current && clearTimeout(c.current);
    };
  }, [t, JSON.stringify(n), p]), { previewSrc: i, loading: s };
}
function Br(t) {
  return t.length <= 8 ? t : `${t.slice(0, 8)}…`;
}
function yd({
  layers: t,
  onChange: n,
  autoSourceImageId: r,
  pinnedSourceImageId: i,
  onPinnedSourceImageIdChange: a,
  sourceImageId: s,
  apiBase: d = ""
}) {
  const [c, l] = S("brightness"), [p, u] = S(!1), h = r ?? s, m = i ?? h, g = !!i, { previewSrc: x, loading: f } = bd(m, t, d), N = () => {
    a?.(void 0);
  }, v = (C) => {
    C?.imageId && (a?.(C.imageId), u(!1));
  }, b = (C, $) => {
    n(t.map((A, D) => D === C ? $ : A));
  }, w = (C) => {
    n(t.filter(($, A) => A !== C));
  }, y = () => {
    n([...t, Vo(c)]);
  }, k = (C) => {
    l(C.target.value);
  };
  return /* @__PURE__ */ o("div", { className: "flex gap-3 p-3", "data-testid": "adjust-layer-slider-panel", children: [
    /* @__PURE__ */ o("div", { className: "flex-1 flex flex-col gap-2 min-w-0", children: [
      t.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary italic", children: "No layers — add one below." }),
      t.map((C, $) => /* @__PURE__ */ e(
        gd,
        {
          layer: C,
          index: $,
          onUpdate: (A) => b($, A),
          onRemove: () => w($)
        },
        $
      )),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mt-1", children: [
        /* @__PURE__ */ e(
          nn,
          {
            value: c,
            onChange: k,
            options: Wo,
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
            g && m ? /* @__PURE__ */ o(
              se,
              {
                tone: "neutral",
                size: "xs",
                "data-testid": "adjust-layer-source-chip-pinned",
                children: [
                  /* @__PURE__ */ o("span", { children: [
                    "Source: pinned (",
                    Br(m),
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
                        "hover:bg-surface-emphasis"
                      ),
                      children: "×"
                    }
                  )
                ]
              }
            ) : h ? /* @__PURE__ */ o(
              se,
              {
                tone: "info",
                size: "xs",
                "data-testid": "adjust-layer-source-chip-auto",
                children: [
                  "Source: ",
                  Br(h),
                  " from upstream run"
                ]
              }
            ) : null,
            a && /* @__PURE__ */ e(
              _e,
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
            qo,
            {
              value: null,
              onChange: v,
              "data-testid": "adjust-layer-override-uploader"
            }
          )
        }
      ),
      m ? /* @__PURE__ */ o("div", { className: "relative", children: [
        /* @__PURE__ */ e(
          $o,
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
const Ur = "text-[12px] font-semibold text-text-secondary", Nd = "text-[11px] text-text-tertiary mt-0.5";
function wd(t) {
  const { definition: n } = Le(), r = z(() => !t || !n ? null : n.edges.find((s) => s.target === t)?.source ?? null, [n, t]);
  return me(r ?? "")?.images?.[0]?.imageId;
}
function kd({
  data: t,
  onChange: n,
  currentNodeId: r
}) {
  const i = $e(r ?? null), a = wd(r), s = t.previewSourceImageId, d = t.layers ?? [];
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-layer-source-image-path", className: Ur, children: [
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
      /* @__PURE__ */ e("div", { className: Nd, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(vd, { samples: i.map((c) => c.path), onSelect: (c) => n({ sourceImagePath: c }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${Ur} mb-1`, children: [
        "Adjustment layers ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      /* @__PURE__ */ e(
        yd,
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
function Cd(t) {
  const { selectedNodeId: n } = Le();
  return /* @__PURE__ */ e(kd, { ...t, currentNodeId: n });
}
function Id({ samples: t, onSelect: n }) {
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
const Fr = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", jr = "text-[12px] font-semibold text-text-secondary", Sd = "text-[11px] text-text-tertiary mt-0.5";
function $d({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "dimensions-source-image-path", className: jr, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "dimensions-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Fr,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Id, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "dimensions-max-edge", className: jr, children: "Max edge (px)" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "dimensions-max-edge",
          type: "number",
          min: 1,
          step: 1,
          className: Fr,
          value: t.maxEdge ?? 1024,
          onChange: (a) => {
            const s = parseInt(a.target.value, 10);
            n({ maxEdge: Number.isFinite(s) && s > 0 ? s : 1024 });
          }
        }
      ),
      /* @__PURE__ */ o("div", { className: Sd, children: [
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
function Td({ samples: t, onSelect: n }) {
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
const Vn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Rd = `${Vn} font-mono`, Rn = "text-[12px] font-semibold text-text-secondary", zr = "text-[11px] text-text-tertiary mt-0.5";
function Pd({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "upscale-prompt", className: Rn, children: [
        "Prompt ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "upscale-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Vn} resize-y min-h-16`,
          value: t.prompt ?? "",
          onChange: (a) => n({ prompt: a.target.value.trim() ? a.target.value : void 0 }),
          placeholder: "optional guidance forwarded to the upscaler"
        }
      ),
      /* @__PURE__ */ e("div", { className: zr, children: "Optional text guidance forwarded to the self-hosted x4 upscaler." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "upscale-max-edge", className: Rn, children: "Max edge (px)" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "upscale-max-edge",
          type: "number",
          min: 1,
          step: 1,
          className: Vn,
          value: t.maxEdge ?? 1024,
          onChange: (a) => {
            const s = parseInt(a.target.value, 10);
            n({ maxEdge: Number.isFinite(s) && s > 0 ? s : 1024 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: zr, children: "Longest-edge cap applied before the 4× super-resolution pass." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "upscale-source-image-path", className: Rn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "upscale-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Rd,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Td, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] })
  ] });
}
const Ad = [
  "claude-opus-4-7",
  "claude-sonnet-4-6",
  "claude-haiku-4-5-20251001"
];
function Dd(t) {
  if (!t) return !1;
  const n = t.properties;
  if (!n || typeof n != "object" || Array.isArray(n)) return !1;
  const r = n.regions;
  return typeof r == "object" && r !== null;
}
function Md(t) {
  const n = t.trim();
  if (n.length === 0) return { ok: !0, value: void 0 };
  try {
    const r = JSON.parse(n);
    return r === null || typeof r != "object" || Array.isArray(r) ? { ok: !1, error: "Schema must be a JSON object" } : { ok: !0, value: r };
  } catch (r) {
    return { ok: !1, error: r.message };
  }
}
const ut = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Jn = "mt-1 w-full text-[12px] rounded border border-danger bg-white px-2 py-1 outline-none", Od = `${ut} font-mono`, Ed = `${Jn} font-mono`, rt = "text-[12px] font-semibold text-text-secondary", Ye = "text-[11px] text-text-tertiary mt-0.5", Kt = "text-[11px] text-danger-fg mt-0.5";
function _d({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null), { paths: a, unresolved: s } = Nt(r ?? null), [d, c] = S(!1), [l, p] = S(
    t.outputSchema ? JSON.stringify(t.outputSchema, null, 2) : ""
  ), [u, h] = S(null), m = !t.userPrompt?.trim(), g = !t.imageRefPath?.trim(), x = !!t.imageRefPath && !t.imageRefPath.startsWith("$."), f = Dd(t.outputSchema), N = M(
    (b) => {
      n({ seedRegions: b });
    },
    [n]
  ), v = (b) => {
    p(b);
    const w = Md(b);
    if (!w.ok) {
      h(w.error);
      return;
    }
    h(null), n({ outputSchema: w.value });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-model", className: rt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-model",
          className: ut,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (b) => n({ model: b.target.value }),
          children: Ad.map((b) => /* @__PURE__ */ e("option", { value: b, children: b }, b))
        }
      ),
      /* @__PURE__ */ e("div", { className: Ye, children: "Anthropic Messages API. Requires ANTHROPIC_API_KEY on platform-api." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-image-ref-path", className: rt, children: [
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
          className: g || x ? Ed : Od,
          value: t.imageRefPath ?? "",
          onChange: (b) => n({ imageRefPath: b.target.value }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      g ? /* @__PURE__ */ e("div", { id: "vision-image-ref-path-error", role: "alert", className: Kt, children: "Image reference path is required." }) : x ? /* @__PURE__ */ o("div", { id: "vision-image-ref-path-error", role: "alert", className: Kt, children: [
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
      /* @__PURE__ */ o("label", { htmlFor: "vision-user-prompt", className: rt, children: [
        "User prompt",
        /* @__PURE__ */ e("span", { className: "text-danger-fg ml-1", children: "●" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-user-prompt",
          "aria-invalid": m ? "true" : void 0,
          "aria-describedby": m ? "vision-user-prompt-error" : void 0,
          className: `${m ? Jn : ut} min-h-20 resize-y`,
          value: t.userPrompt,
          onChange: (b) => n({ userPrompt: b.target.value })
        }
      ),
      m ? /* @__PURE__ */ e("div", { id: "vision-user-prompt-error", role: "alert", className: Kt, children: "User prompt is required." }) : /* @__PURE__ */ o("div", { className: Ye, children: [
        "Supports ",
        "{{ context.* }}",
        " substitution."
      ] })
    ] }),
    f && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: rt, children: "Focus regions (optional)" }),
      /* @__PURE__ */ e("div", { className: Ye, children: "Drag on the image to paint focus boxes. The next vision pass will use these as analysis hints." }),
      /* @__PURE__ */ e(
        zo,
        {
          imageUrl: "",
          imageWidth: 800,
          imageHeight: 600,
          boxes: t.seedRegions ?? [],
          onChange: N,
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
      /* @__PURE__ */ e("label", { htmlFor: "vision-output-schema", className: rt, children: "Output schema (optional)" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-output-schema",
          "aria-invalid": u ? "true" : void 0,
          "aria-describedby": u ? "vision-output-schema-error" : void 0,
          className: `${u ? Jn : ut} font-mono text-[11px] min-h-28 resize-y`,
          value: l,
          onChange: (b) => v(b.target.value),
          placeholder: `{
  "type": "object",
  "properties": {
    "caption": { "type": "string" }
  }
}`
        }
      ),
      u ? /* @__PURE__ */ o("div", { id: "vision-output-schema-error", role: "alert", className: Kt, children: [
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
          /* @__PURE__ */ e("label", { htmlFor: "vision-max-output-tokens", className: rt, children: "Max output tokens" }),
          /* @__PURE__ */ e(
            "input",
            {
              id: "vision-max-output-tokens",
              type: "number",
              min: 1,
              max: 8192,
              className: ut,
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
          /* @__PURE__ */ e("label", { htmlFor: "vision-system-prompt", className: rt, children: "System prompt override (optional)" }),
          /* @__PURE__ */ e(
            "textarea",
            {
              id: "vision-system-prompt",
              className: `${ut} min-h-14 resize-y`,
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
function Ld({ samples: t, onSelect: n }) {
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
const Bd = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], Mt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Ud = `${Mt} font-mono`, Rt = "text-[12px] font-semibold text-text-secondary", qr = "text-[11px] text-text-tertiary mt-0.5";
function Fd({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null), { paths: a, unresolved: s } = Nt(r ?? null), [d, c] = S(""), l = t.labels ?? [], p = () => {
    const h = d.trim();
    !h || l.includes(h) || (n({ labels: [...l, h] }), c(""));
  }, u = (h) => {
    n({ labels: l.filter((m, g) => g !== h) });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-image-ref-path", className: Rt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-classify-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Ud,
          value: t.imageRefPath ?? "",
          onChange: (h) => n({ imageRefPath: h.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: qr, children: "JSONPath to the imageId to classify. Required." }),
      /* @__PURE__ */ e(Ld, { samples: i.map((h) => h.path), onSelect: (h) => n({ imageRefPath: h }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: Rt, children: "Labels (at least 2 required)" }),
      l.length > 0 && /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: l.map((h, m) => /* @__PURE__ */ o(
        "span",
        {
          className: "inline-flex items-center gap-1 text-[11px] font-semibold bg-surface-inset border border-border rounded-full px-2 py-0.5 text-text-secondary",
          children: [
            h,
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: () => u(m),
                className: "bg-transparent border-none cursor-pointer p-0 text-danger-fg text-[11px] leading-none",
                "aria-label": `Remove label ${h}`,
                children: "✕"
              }
            )
          ]
        },
        h
      )) }),
      /* @__PURE__ */ o("div", { className: "mt-1.5 flex gap-1.5", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            spellCheck: !1,
            className: `${Mt} flex-1 mt-0`,
            value: d,
            onChange: (h) => c(h.target.value),
            onKeyDown: (h) => {
              h.key === "Enter" && (h.preventDefault(), p());
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
      /* @__PURE__ */ e("div", { className: qr, children: "Press Enter or click Add. The model returns the single best-matching label." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-model", className: Rt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-classify-model",
          className: Mt,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (h) => n({ model: h.target.value }),
          children: Bd.map((h) => /* @__PURE__ */ e("option", { value: h.value, children: h.label }, h.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-classify-system-prompt", className: Rt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-classify-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Mt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (h) => n({ systemPrompt: h.target.value || void 0 }),
          placeholder: "Leave blank to use the default classification system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-classify-max-output-tokens", className: Rt, children: [
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
          className: Mt,
          value: t.maxOutputTokens ?? 256,
          onChange: (h) => {
            const m = parseInt(h.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(m) && m > 0 ? m : 256 });
          }
        }
      )
    ] })
  ] });
}
function jd({ samples: t, onSelect: n }) {
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
const zd = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more detail)" }
], Ot = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", qd = `${Ot} font-mono`, Pt = "text-[12px] font-semibold text-text-secondary", Wr = "text-[11px] text-text-tertiary mt-0.5";
function Wd({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null), { paths: a, unresolved: s } = Nt(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-image-ref-path", className: Pt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-describe-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: qd,
          value: t.imageRefPath ?? "",
          onChange: (d) => n({ imageRefPath: d.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Wr, children: "JSONPath to the imageId to describe. Required." }),
      /* @__PURE__ */ e(jd, { samples: i.map((d) => d.path), onSelect: (d) => n({ imageRefPath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-user-prompt", className: Pt, children: "User prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-describe-user-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Ot} resize-y`,
          value: t.userPrompt ?? "",
          onChange: (d) => n({ userPrompt: d.target.value }),
          placeholder: "Describe what you see in this image in one paragraph."
        }
      ),
      /* @__PURE__ */ e("div", { className: Wr, children: "Required. What to ask the model about the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-model", className: Pt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-describe-model",
          className: Ot,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (d) => n({ model: d.target.value }),
          children: zd.map((d) => /* @__PURE__ */ e("option", { value: d.value, children: d.label }, d.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-describe-system-prompt", className: Pt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-describe-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Ot} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (d) => n({ systemPrompt: d.target.value || void 0 }),
          placeholder: "Leave blank to use the default describe system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-describe-max-output-tokens", className: Pt, children: [
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
          className: Ot,
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
function Vd({ samples: t, onSelect: n }) {
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
], mt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Hd = `${mt} font-mono`, ct = "text-[12px] font-semibold text-text-secondary", Vr = "text-[11px] text-text-tertiary mt-0.5";
function Kd({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null), { paths: a, unresolved: s } = Nt(r ?? null), [d, c] = S(""), l = t.candidateTags ?? [], p = () => {
    const h = d.trim();
    !h || l.includes(h) || (n({ candidateTags: [...l, h] }), c(""));
  }, u = (h) => {
    n({ candidateTags: l.filter((m, g) => g !== h) });
  };
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-tag-image-ref-path", className: ct, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-tag-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Hd,
          value: t.imageRefPath ?? "",
          onChange: (h) => n({ imageRefPath: h.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Vr, children: "JSONPath to the imageId to tag. Required." }),
      /* @__PURE__ */ e(Vd, { samples: i.map((h) => h.path), onSelect: (h) => n({ imageRefPath: h }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: ct, children: [
        "Candidate tags ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional — omit for open-vocabulary)" })
      ] }),
      l.length > 0 && /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: l.map((h, m) => /* @__PURE__ */ o(
        "span",
        {
          className: "inline-flex items-center gap-1 text-[11px] font-semibold bg-surface-inset border border-border rounded-full px-2 py-0.5 text-text-secondary",
          children: [
            h,
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: () => u(m),
                className: "bg-transparent border-none cursor-pointer p-0 text-danger-fg text-[11px] leading-none",
                "aria-label": `Remove candidate tag ${h}`,
                children: "✕"
              }
            )
          ]
        },
        h
      )) }),
      /* @__PURE__ */ o("div", { className: "mt-1.5 flex gap-1.5", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            spellCheck: !1,
            className: `${mt} flex-1 mt-0`,
            value: d,
            onChange: (h) => c(h.target.value),
            onKeyDown: (h) => {
              h.key === "Enter" && (h.preventDefault(), p());
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
      /* @__PURE__ */ e("div", { className: Vr, children: "Restricts tagging to this vocabulary. Leave empty for open-ended tags." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-max-tags", className: ct, children: [
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
          className: mt,
          value: t.maxTags ?? 10,
          onChange: (h) => {
            const m = parseInt(h.target.value, 10);
            n({ maxTags: Number.isFinite(m) && m >= 1 ? m : 10 });
          }
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-tag-model", className: ct, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-tag-model",
          className: mt,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (h) => n({ model: h.target.value }),
          children: Jd.map((h) => /* @__PURE__ */ e("option", { value: h.value, children: h.label }, h.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-system-prompt", className: ct, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-tag-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${mt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (h) => n({ systemPrompt: h.target.value || void 0 }),
          placeholder: "Leave blank to use the default tagging system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-max-output-tokens", className: ct, children: [
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
          className: mt,
          value: t.maxOutputTokens ?? 256,
          onChange: (h) => {
            const m = parseInt(h.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(m) && m > 0 ? m : 256 });
          }
        }
      )
    ] })
  ] });
}
function Gd({ samples: t, onSelect: n }) {
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
const Yd = [
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (default — best OCR accuracy)" },
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (faster, lower accuracy)" }
], Qt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Xd = `${Qt} font-mono`, Gt = "text-[12px] font-semibold text-text-secondary", Pn = "text-[11px] text-text-tertiary mt-0.5";
function Qd({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null), { paths: a, unresolved: s } = Nt(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-image-ref-path", className: Gt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-extract-text-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Xd,
          value: t.imageRefPath ?? "",
          onChange: (d) => n({ imageRefPath: d.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Pn, children: "JSONPath to the imageId to extract text from. Required." }),
      /* @__PURE__ */ e(Gd, { samples: i.map((d) => d.path), onSelect: (d) => n({ imageRefPath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-model", className: Gt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-extract-text-model",
          className: Qt,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (d) => n({ model: d.target.value }),
          children: Yd.map((d) => /* @__PURE__ */ e("option", { value: d.value, children: d.label }, d.value))
        }
      ),
      /* @__PURE__ */ e("div", { className: Pn, children: "Defaults to Sonnet for best OCR accuracy." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-extract-text-system-prompt", className: Gt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-extract-text-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Qt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (d) => n({ systemPrompt: d.target.value || void 0 }),
          placeholder: "Leave blank to use the default OCR system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-extract-text-max-output-tokens", className: Gt, children: [
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
          className: Qt,
          value: t.maxOutputTokens ?? 1024,
          onChange: (d) => {
            const c = parseInt(d.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(c) && c > 0 ? c : 1024 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Pn, children: "Increase for documents with large amounts of text." })
    ] })
  ] });
}
const Zd = [
  { value: "amazon.titan-image-generator-v2:0", label: "Titan v2 (default)" },
  { value: "amazon.titan-image-generator-v1", label: "Titan v1" }
], dt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", pt = "text-[12px] font-semibold text-text-secondary", Jr = "text-[11px] text-text-tertiary mt-0.5";
function ep({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "generate-prompt", className: pt, children: "Prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "generate-prompt",
          rows: 4,
          spellCheck: !1,
          className: `${dt} resize-y min-h-20`,
          value: t.prompt ?? "",
          onChange: (r) => n({ prompt: r.target.value }),
          placeholder: "A photorealistic photograph of a golden retriever in a sunny meadow"
        }
      ),
      /* @__PURE__ */ e("div", { className: Jr, children: "Text description of the image to generate. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "generate-model", className: pt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "generate-model",
          className: dt,
          value: t.model ?? "amazon.titan-image-generator-v2:0",
          onChange: (r) => n({ model: r.target.value }),
          children: Zd.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "generate-width", className: pt, children: "Width (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "generate-width",
            type: "number",
            min: 64,
            max: 2048,
            step: 64,
            className: dt,
            value: t.width ?? 512,
            onChange: (r) => {
              const i = parseInt(r.target.value, 10);
              n({ width: Number.isFinite(i) && i > 0 ? i : 512 });
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "generate-height", className: pt, children: "Height (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "generate-height",
            type: "number",
            min: 64,
            max: 2048,
            step: 64,
            className: dt,
            value: t.height ?? 512,
            onChange: (r) => {
              const i = parseInt(r.target.value, 10);
              n({ height: Number.isFinite(i) && i > 0 ? i : 512 });
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "generate-seed", className: pt, children: [
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
          className: dt,
          value: t.seed ?? "",
          onChange: (r) => {
            const i = parseInt(r.target.value, 10);
            n({ seed: Number.isFinite(i) && i >= 0 ? i : void 0 });
          },
          placeholder: "random"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "generate-num-images", className: pt, children: [
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
          className: dt,
          value: t.numImages ?? 1,
          onChange: (r) => {
            const i = parseInt(r.target.value, 10);
            n({ numImages: Number.isFinite(i) && i >= 1 ? Math.min(8, i) : 1 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Jr, children: "When > 1, the step fans out with one arm per image. Each arm carries one imageId." })
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
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], Zt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", rp = `${Zt} font-mono`, Yt = "text-[12px] font-semibold text-text-secondary", Hr = "text-[11px] text-text-tertiary mt-0.5";
function op({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-source-image-path", className: Yt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "variation-source-image-path",
          type: "text",
          spellCheck: !1,
          className: rp,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(tp, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "variation-model", className: Yt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "variation-model",
          className: Zt,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (a) => n({ model: a.target.value }),
          children: np.map((a) => /* @__PURE__ */ e("option", { value: a.value, children: a.label }, a.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-num-variations", className: Yt, children: [
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
          className: Zt,
          value: t.numVariations ?? 1,
          onChange: (a) => {
            const s = parseInt(a.target.value, 10);
            n({ numVariations: Number.isFinite(s) && s >= 1 ? Math.min(8, s) : 1 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Hr, children: "Always fans out — each variation becomes a separate arm downstream." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-similarity", className: Yt, children: [
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
          className: Zt,
          value: t.similarity ?? 0.7,
          onChange: (a) => {
            const s = parseFloat(a.target.value);
            n({ similarity: Number.isFinite(s) ? Math.min(1, Math.max(0, s)) : 0.7 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Hr, children: "0 = very different, 1 = nearly identical. 0.7 is a good starting point." })
    ] })
  ] });
}
const ap = [
  "$.steps.mask.output.imageId",
  "$.trigger.maskRef"
];
function Kr({ samples: t, onSelect: n }) {
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
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], Hn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Gr = `${Hn} font-mono`, Xt = "text-[12px] font-semibold text-text-secondary", Yr = "text-[11px] text-text-tertiary mt-0.5";
function sp({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null);
  return /* @__PURE__ */ o(ve, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-source-image-path", className: Xt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "edit-prompt-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Gr,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Kr, { samples: i.map((a) => a.path), onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-mask-image-path", className: Xt, children: [
        "Mask image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "edit-prompt-mask-image-path",
          type: "text",
          spellCheck: !1,
          className: Gr,
          value: t.maskImagePath ?? "",
          onChange: (a) => n({ maskImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.steps.mask.output.imageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: Yr, children: "JSONPath to a mask image. White pixels = edit region, black = preserve. Omit for outpainting." }),
      /* @__PURE__ */ e(Kr, { samples: ap, onSelect: (a) => n({ maskImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-prompt", className: Xt, children: "Edit prompt" }),
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
      /* @__PURE__ */ e("div", { className: Yr, children: "Describes what to generate in the masked region. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-model", className: Xt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "edit-prompt-model",
          className: Hn,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (a) => n({ model: a.target.value }),
          children: ip.map((a) => /* @__PURE__ */ e("option", { value: a.value, children: a.label }, a.value))
        }
      )
    ] })
  ] });
}
const lp = {
  // -------------------------------------------------------------------------
  // Trigger
  // -------------------------------------------------------------------------
  trigger: /* @__PURE__ */ o(V, { children: [
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
  llm: /* @__PURE__ */ o(V, { children: [
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
  transform: /* @__PURE__ */ o(V, { children: [
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
  condition: /* @__PURE__ */ o(V, { children: [
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
  action: /* @__PURE__ */ o(V, { children: [
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
  fork: /* @__PURE__ */ o(V, { children: [
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
  join: /* @__PURE__ */ o(V, { children: [
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
  approval: /* @__PURE__ */ o(V, { children: [
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
  agent: /* @__PURE__ */ o(V, { children: [
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
  "mcp-tool": /* @__PURE__ */ o(V, { children: [
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
  "knowledge-base": /* @__PURE__ */ o(V, { children: [
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
  "graph-query": /* @__PURE__ */ o(V, { children: [
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
  memory: /* @__PURE__ */ o(V, { children: [
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
  guardrail: /* @__PURE__ */ o(V, { children: [
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
  policy: /* @__PURE__ */ o(V, { children: [
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
  "ag-ui-output": /* @__PURE__ */ o(V, { children: [
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
  "image-source": /* @__PURE__ */ o(V, { children: [
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
  "image:save": /* @__PURE__ */ o(V, { children: [
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
  scatter: /* @__PURE__ */ o(V, { children: [
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
  "image:resize": /* @__PURE__ */ o(V, { children: [
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
  "image:transform": /* @__PURE__ */ o(V, { children: [
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
  "image:format-convert": /* @__PURE__ */ o(V, { children: [
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
  "image:sharpen": /* @__PURE__ */ o(V, { children: [
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
  "image:watermark": /* @__PURE__ */ o(V, { children: [
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
  "image:crop": /* @__PURE__ */ o(V, { children: [
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
  "image:adjust-bw": /* @__PURE__ */ o(V, { children: [
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
  "image:adjust-layer": /* @__PURE__ */ o(V, { children: [
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
  "image:dimensions": /* @__PURE__ */ o(V, { children: [
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
  "image:upscale": /* @__PURE__ */ o(V, { children: [
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
  "image:vision-analyze": /* @__PURE__ */ o(V, { children: [
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
  "image:vision-classify": /* @__PURE__ */ o(V, { children: [
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
  "image:vision-describe": /* @__PURE__ */ o(V, { children: [
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
  "image:vision-tag": /* @__PURE__ */ o(V, { children: [
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
  "image:vision-extract-text": /* @__PURE__ */ o(V, { children: [
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
  "image:generate": /* @__PURE__ */ o(V, { children: [
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
  "image:variation": /* @__PURE__ */ o(V, { children: [
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
  "image:edit-prompt": /* @__PURE__ */ o(V, { children: [
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
function cp({ result: t, className: n }) {
  const { caption: r, setting: i, location: a, timeOfDay: s, mood: d, colors: c } = t;
  return !r && !i && !a && !s && !d && (!c || c.length === 0) ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", n), children: [
    r ? /* @__PURE__ */ e("p", { className: "text-base leading-relaxed text-text-primary", children: r }) : null,
    /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1.5", children: [
      i ? /* @__PURE__ */ o(se, { tone: "neutral", size: "sm", title: "Scene setting", children: [
        "setting: ",
        i
      ] }) : null,
      a ? /* @__PURE__ */ o(se, { tone: "neutral", size: "sm", title: "Location", children: [
        "loc: ",
        a
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
const dp = {
  people: { stroke: "#4f46e5", fill: "rgba(79,70,229,0.10)", text: "bg-primary text-white" },
  object: { stroke: "#d97706", fill: "rgba(217,119,6,0.10)", text: "bg-warning text-white" }
};
function pp({
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
  const h = n ?? t, [m, g] = S(null), x = ce(null), f = M(() => {
    const b = x.current;
    b && (!r || !i) && g({ w: b.naturalWidth, h: b.naturalHeight });
  }, [r, i]), N = z(() => r && i && r > 0 && i > 0 ? { w: r, h: i } : m && m.w > 0 && m.h > 0 ? m : null, [r, i, m]), v = (b, w, y, k, C) => {
    if (!N) return null;
    const $ = Math.max(0, Math.min(b.x1, N.w)), A = Math.max(0, Math.min(b.y1, N.h)), D = Math.max(0, Math.min(b.x2, N.w)), O = Math.max(0, Math.min(b.y2, N.h));
    if (!Number.isFinite($) || !Number.isFinite(A) || !Number.isFinite(D) || !Number.isFinite(O) || D <= $ || O <= A) return null;
    const ne = $ / N.w * 100, R = A / N.h * 100, J = (D - $) / N.w * 100, Y = (O - A) / N.h * 100, H = dp[y];
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
          width: `${J}%`,
          height: `${Y}%`,
          background: H.fill,
          border: `2px solid ${H.stroke}`,
          borderRadius: "2px"
        },
        children: /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "pointer-events-none absolute -top-5 left-0 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none shadow",
              H.text
            ),
            children: w
          }
        )
      },
      C
    );
  };
  return h ? /* @__PURE__ */ o(
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
            src: h,
            alt: u ?? "",
            onLoad: f,
            className: "block h-auto w-full object-contain",
            draggable: !1
          }
        ),
        N ? /* @__PURE__ */ e("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ o("div", { className: "pointer-events-auto absolute inset-0", children: [
          (d === "people" || d === "both") && (a ?? []).map(
            (b) => v(
              b.bbox,
              `#${b.index}${b.activity ? " · " + b.activity.replace(/^::\s*/, "") : ""}`,
              "people",
              c ? () => c(b) : void 0,
              `p-${b.index}`
            )
          ),
          (d === "objects" || d === "both") && (s ?? []).map(
            (b, w) => v(
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
function up(t) {
  return {
    imageUrl: t.imageUrl,
    imageDataUrl: t.imageDataUrl,
    imageWidth: t.imageWidth,
    imageHeight: t.imageHeight,
    people: t.people,
    objects: t.objects
  };
}
function mp({ people: t, highlightedIndex: n, onSelect: r, className: i }) {
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
      ), l = /* @__PURE__ */ o(V, { children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": !0,
              className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-white",
              children: a.index
            }
          ),
          a.ageBucket ? /* @__PURE__ */ e(se, { tone: "neutral", size: "sm", children: a.ageBucket.replace("_", " ") }) : null,
          a.gender ? /* @__PURE__ */ e(se, { tone: "neutral", size: "sm", children: a.gender }) : null,
          a.faceOrientation ? /* @__PURE__ */ e(se, { tone: "neutral", size: "sm", title: "Face orientation", children: a.faceOrientation }) : null,
          a.expression ? /* @__PURE__ */ e(se, { tone: "info", size: "sm", children: a.expression }) : null
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
function hp({ objects: t, onSelect: n, className: r }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Objects (",
      t.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "grid grid-cols-1 gap-1 sm:grid-cols-2", children: t.map((i, a) => {
      const s = I(
        "flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 text-left text-[13px]"
      ), d = /* @__PURE__ */ o(V, { children: [
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
function fp({ tags: t, onTagClick: n, className: r }) {
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
          children: /* @__PURE__ */ o(se, { tone: "info", size: "sm", children: [
            "#",
            i
          ] })
        },
        i
      ) : /* @__PURE__ */ o(se, { tone: "info", size: "sm", children: [
        "#",
        i
      ] }, i)
    ) })
  ] });
}
function en(t) {
  return t ? t === "correct" || t === "neutral" || t === "normal" ? "success" : "warning" : "neutral";
}
function An(t) {
  const n = en(t);
  return n === "success" ? `OK · ${t}` : n === "warning" ? `ADJUST · ${t}` : t ?? "";
}
function gp({
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
          /* @__PURE__ */ e(se, { tone: en(t.verdict), size: "sm", children: An(t.verdict) }),
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
          /* @__PURE__ */ e(se, { tone: en(n.verdict), size: "sm", children: An(n.verdict) }),
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
        /* @__PURE__ */ e("span", { className: "ml-1.5", children: /* @__PURE__ */ e(se, { tone: en(r), size: "sm", children: An(r) }) })
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
function xp({
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
  const [h, m] = S(), [g, x] = S(!1), f = (v) => m(h === v.index ? void 0 : v.index), N = up(t);
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-4 text-text-primary", u), children: [
    /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-12", children: [
      n ? /* @__PURE__ */ o("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ e(
          pp,
          {
            ...N,
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
          typeof t.model.tokensOut == "number" ? /* @__PURE__ */ o(V, { children: [
            /* @__PURE__ */ e("span", { children: "·" }),
            /* @__PURE__ */ o("span", { children: [
              t.model.tokensOut,
              " tok out"
            ] })
          ] }) : null
        ] }) : null
      ] }) : null,
      /* @__PURE__ */ o("div", { className: I("flex flex-col gap-4", n ? "md:col-span-5" : "md:col-span-12"), children: [
        r ? /* @__PURE__ */ e(cp, { result: t }) : null,
        i && t.people && t.people.length > 0 ? /* @__PURE__ */ e(
          mp,
          {
            people: t.people,
            highlightedIndex: h,
            onSelect: f
          }
        ) : null
      ] })
    ] }),
    a && t.objects && t.objects.length > 0 ? /* @__PURE__ */ e(hp, { objects: t.objects }) : null,
    s && t.tags && t.tags.length > 0 ? /* @__PURE__ */ e(fp, { tags: t.tags, onTagClick: l }) : null,
    d ? /* @__PURE__ */ e(
      gp,
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
      /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1", children: t.text.map((v, b) => /* @__PURE__ */ e(
        "li",
        {
          className: "rounded border border-border bg-surface px-2 py-1 font-mono text-[12px]",
          children: v
        },
        b
      )) })
    ] }) : null,
    c && t.rawText ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
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
      g ? /* @__PURE__ */ e("pre", { className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary", children: t.rawText }) : null
    ] }) : null
  ] });
}
const bp = [
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
function yp(t) {
  const n = [`${t.inputTokens} in`, `${t.outputTokens} out`];
  return t.cacheReadTokens && n.push(`${t.cacheReadTokens} cached`), n.join(" / ");
}
function vp({
  systemPrompt: t,
  userPrompt: n,
  outputSchema: r,
  model: i,
  onSave: a,
  apiBase: s = ""
}) {
  const d = So(), [c, l] = S(t), [p, u] = S(n), [h, m] = S(i ?? Xr), [g, x] = S(
    r ? JSON.stringify(r, null, 2) : ""
  ), [f, N] = S("0"), [v, b] = S(null), [w, y] = S(!1), [k, C] = S(null), [$, A] = S(null), D = M(() => {
    const Q = g.trim();
    if (Q)
      try {
        const E = JSON.parse(Q);
        if (E && typeof E == "object" && !Array.isArray(E))
          return E;
      } catch {
      }
  }, [g]), O = M((Q) => {
    N(Q);
    const E = Number(Q), T = Qr[E];
    T && (x(T.value ? JSON.stringify(T.value, null, 2) : ""), T.systemPrompt !== void 0 && l(T.systemPrompt));
  }, []), ne = v?.imageId ?? null, R = ne ? d.getImageUrl(ne) : null, J = M(async () => {
    if (!ne) {
      C("Upload or paste a sample image URL first.");
      return;
    }
    if (!p.trim()) {
      C("User prompt is required.");
      return;
    }
    y(!0), C(null), A(null);
    const Q = D();
    try {
      const E = await fetch(`${s}/api/pipeline/preview/vision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageId: ne,
          systemPrompt: c.trim() || void 0,
          userPrompt: p.trim(),
          outputSchema: Q,
          model: h || Xr
        })
      }), T = await E.json();
      if (!E.ok) {
        C(T.error ?? `Request failed with status ${E.status}`);
        return;
      }
      if (T.failureReason) {
        C(`Model refused to answer (${T.failureReason}).`);
        return;
      }
      const K = {
        imageUrl: R ?? "",
        caption: T.caption ?? "",
        rawText: typeof T.extracted == "object" && T.extracted ? JSON.stringify(T.extracted, null, 2) : void 0,
        model: {
          endpointId: h,
          latencyMs: T.latencyMs ?? 0,
          tokensIn: T.usage?.inputTokens,
          tokensOut: T.usage?.outputTokens
        }
      };
      A({
        visionResult: K,
        rawExtracted: T.extracted,
        usage: T.usage ?? { inputTokens: 0, outputTokens: 0 },
        latencyMs: T.latencyMs ?? 0,
        costUsd: T.costUsd ?? 0
      });
    } catch (E) {
      C(E instanceof Error ? E.message : "Network error");
    } finally {
      y(!1);
    }
  }, [ne, R, p, c, h, D, s]), Y = () => {
    a({
      systemPrompt: c,
      userPrompt: p,
      outputSchema: D()
    });
  }, H = "text-[12px] font-semibold text-text-secondary";
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-4 px-4 py-3", "data-testid": "vision-prompt-bench", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: I(H, "mb-1"), children: "Sample image" }),
      /* @__PURE__ */ e(
        qo,
        {
          value: v,
          onChange: (Q) => b(Q),
          "data-testid": "bench-image-uploader"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("label", { className: H, children: "System prompt" }),
        /* @__PURE__ */ e(
          un,
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
        /* @__PURE__ */ o("label", { className: H, children: [
          "User prompt ",
          /* @__PURE__ */ e("span", { className: "text-danger-fg", children: "*" })
        ] }),
        /* @__PURE__ */ e(
          un,
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
          /* @__PURE__ */ e("label", { className: H, children: "Output schema" }),
          /* @__PURE__ */ e(
            nn,
            {
              value: f,
              onChange: (Q) => O(Q.target.value),
              options: Qr.map((Q, E) => ({ value: String(E), label: Q.label })),
              size: "sm",
              "aria-label": "Schema preset",
              "data-testid": "bench-schema-preset"
            }
          )
        ] }),
        /* @__PURE__ */ e(
          un,
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
        nn,
        {
          value: h,
          onChange: (Q) => m(Q.target.value),
          options: bp,
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
            J();
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
          yp($.usage),
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
        xp,
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
          onClick: Y,
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
const Np = {
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
]), Je = ({ data: t }) => /* @__PURE__ */ e("div", { className: "p-4", "data-testid": "config-panel-no-settings", children: /* @__PURE__ */ e(
  Fe,
  {
    icon: "⚙️",
    title: "No settings for this node type yet",
    description: /* @__PURE__ */ o(V, { children: [
      /* @__PURE__ */ e("code", { className: "font-mono text-[12px]", children: String(t.type) }),
      " has no configurable options in this version. The node can sit on the canvas and connect to others, and it will run with its defaults wherever the executor supports it."
    ] })
  }
) }), jh = [
  "agent",
  "mcp-tool",
  "knowledge-base",
  "graph-query",
  "memory",
  "guardrail",
  "policy",
  "ag-ui-output",
  "image-source",
  "image:save"
], wp = {
  trigger: ec,
  llm: pc,
  transform: hc,
  condition: gc,
  action: yc,
  fork: vc,
  join: kc,
  approval: Ic,
  agent: Je,
  "mcp-tool": Je,
  "knowledge-base": Je,
  "graph-query": Je,
  memory: Je,
  guardrail: Je,
  policy: Je,
  "ag-ui-output": Je,
  "image-source": Je,
  "image:save": Je,
  scatter: _c,
  "image:resize": Uc,
  "image:transform": Vc,
  "image:format-convert": Gc,
  "image:sharpen": Xc,
  "image:watermark": ed,
  "image:crop": cd,
  "image:adjust-bw": pd,
  "image:adjust-layer": Cd,
  "image:dimensions": $d,
  "image:upscale": Pd,
  "image:vision-analyze": _d,
  "image:vision-classify": Fd,
  "image:vision-describe": Wd,
  "image:vision-tag": Kd,
  "image:vision-extract-text": Qd,
  "image:generate": ep,
  "image:variation": op,
  "image:edit-prompt": sp
};
function kp(t, n) {
  const r = wp[t.type];
  return /* @__PURE__ */ e(r, { data: t.data, onChange: n, nodeId: t.id }, t.id);
}
function Cp({ selectedIds: t }) {
  const {
    definition: n,
    selectedNodeId: r,
    setSelectedNodeId: i,
    updateNodeData: a,
    removeNode: s,
    duplicateNodes: d
  } = Le(), [c, l] = S("config"), p = ce(null), u = ce(null);
  Xn();
  const h = z(() => t && t.length > 1 ? t : r ? [r] : [], [t, r]), m = h.length > 1, g = h.length > 0, x = z(() => m || h.length === 0 || !n ? null : n.nodes.find((y) => y.id === h[0]) ?? null, [n, h, m]), f = M(() => {
    i(null);
  }, [i]);
  re(() => {
    l("config");
  }, [h.join(",")]), re(() => {
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
  const N = x ? Np[x.type] : null, v = () => {
    if (m)
      for (const y of h) s(y);
    else x && s(x.id);
  }, b = () => {
    h.length !== 0 && d(h);
  }, w = (y) => {
    x && a(x.id, y);
  };
  return /* @__PURE__ */ e("div", { ref: p, className: "flex flex-col flex-1 min-h-0 bg-white", "data-testid": "config-panel", children: m ? (
    // ---------------------------------------------------------------
    // Multi-select pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ o(V, { children: [
      /* @__PURE__ */ o("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ e("span", { className: "text-base", "aria-hidden": !0, children: "⧉" }),
        /* @__PURE__ */ o("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: [
          h.length,
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
              onClick: v,
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
  ) : x && N ? (
    // ---------------------------------------------------------------
    // Single-node pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ o(V, { children: [
      /* @__PURE__ */ o("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ e("span", { className: "text-lg leading-none", "aria-hidden": !0, children: N.icon }),
        /* @__PURE__ */ e("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: N.name }),
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
            let A = null;
            y.key === "ArrowRight" ? A = C[($ + 1) % C.length] : y.key === "ArrowLeft" ? A = C[($ - 1 + C.length) % C.length] : y.key === "Home" ? A = C[0] : y.key === "End" && (A = C[C.length - 1]), A && (y.preventDefault(), l(A), u.current?.querySelector(
              `[data-tab="${A}"]`
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
        c === "config" && kp(x, w),
        c === "runs" && /* @__PURE__ */ e("div", { className: "p-6 text-xs text-[#64748b]", children: "No runs yet." }),
        c === "docs" && /* @__PURE__ */ e("div", { className: "pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug", children: lp[x.type] ?? /* @__PURE__ */ e("p", { className: "text-text-secondary", children: "No docs available for this node type." }) }),
        c === "bench" && Dn.has(x.type) && (() => {
          const y = x.data;
          return /* @__PURE__ */ e(
            vp,
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
            onClick: v,
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
function Se(t) {
  if (t == null) return "--";
  if (t < 1e3) return `${Math.round(t)}ms`;
  if (t < 6e4) return `${(t / 1e3).toFixed(1)}s`;
  const n = Math.floor(t / 6e4), r = Math.floor(t % 6e4 / 1e3);
  return `${n}m ${r}s`;
}
function ft(t) {
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
function Ip(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Sp(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function $p(t) {
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
function Mn(t) {
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
function ot({ label: t, children: n }) {
  return /* @__PURE__ */ o("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ e("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: t }),
    /* @__PURE__ */ e("span", { className: "text-[13px] text-text-primary", children: n })
  ] });
}
function Rp({ pipelineId: t, run: n, onBack: r }) {
  const i = je();
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
      /* @__PURE__ */ e(ot, { label: "Status", children: /* @__PURE__ */ e(
        se,
        {
          tone: Zr(n.status),
          "aria-label": `Status: ${Mn(n.status)}`,
          children: Mn(n.status)
        }
      ) }),
      /* @__PURE__ */ e(ot, { label: "Started", children: new Date(n.startedAt).toLocaleString() }),
      n.completedAt && /* @__PURE__ */ e(ot, { label: "Completed", children: new Date(n.completedAt).toLocaleString() }),
      /* @__PURE__ */ e(ot, { label: "Duration", children: Se(n.durationMs) }),
      /* @__PURE__ */ e(ot, { label: "Triggered by", children: Tp(n) }),
      /* @__PURE__ */ e(ot, { label: "Trigger type", children: n.triggeredBy.triggerType }),
      n.estimatedCostUsd != null && n.estimatedCostUsd > 0 && /* @__PURE__ */ o(ot, { label: "Est. Cost", children: [
        /* @__PURE__ */ e("span", { className: I("font-semibold", $p(n.estimatedCostUsd)), children: Sp(n.estimatedCostUsd) }),
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
          const d = Zr(s.status), c = Mn(s.status), l = s.output, p = l?.response;
          return /* @__PURE__ */ o("div", { className: "mb-2", children: [
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2 py-1 text-xs", children: [
              /* @__PURE__ */ e(se, { tone: d, "aria-label": `Status: ${c}`, children: c }),
              /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: a.slice(0, 10) }),
              s.durationMs != null && /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: Se(s.durationMs) })
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
function Pp(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Ap(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Dp(t) {
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
function Mp(t) {
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
function Op(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function Ep({ pipelineId: t, onClose: n }) {
  const r = je(), [i, a] = S([]), [s, d] = S(!0), [c, l] = S(null), [p, u] = S(null), [h, m] = S(!1), [g, x] = S([]), f = ce(null), N = M(async () => {
    d(!0), l(null);
    try {
      const y = await To(t, { limit: 50 });
      a(y.runs);
    } catch (y) {
      l(y instanceof Error ? y.message : "Failed to load runs");
    } finally {
      d(!1);
    }
  }, [t]);
  re(() => {
    f.current !== t && (f.current = t, N());
  }, [t, N]), Ee("*", M((y) => {
    const { eventType: k, payload: C } = y;
    if (!C || typeof C != "object") return;
    const $ = C;
    if (!($.pipelineId && $.pipelineId !== t))
      switch (k) {
        case "pipeline.run.started": {
          const A = C;
          if (A.pipelineId !== t) return;
          const D = {
            id: A.runId,
            pipelineId: A.pipelineId,
            pipelineVersion: 0,
            status: "running",
            triggeredBy: A.triggeredBy,
            ownerNodeId: "local",
            startedAt: A.at,
            currentStepIds: [],
            steps: {},
            context: {}
          };
          a((O) => [D, ...O.filter((ne) => ne.id !== A.runId)]);
          break;
        }
        case "pipeline.run.completed": {
          const A = C;
          a(
            (D) => D.map(
              (O) => O.id === A.runId ? { ...O, status: "completed", completedAt: A.at, durationMs: A.durationMs } : O
            )
          );
          break;
        }
        case "pipeline.run.failed": {
          const A = C;
          a(
            (D) => D.map(
              (O) => O.id === A.runId ? { ...O, status: "failed", completedAt: A.at, error: A.error } : O
            )
          );
          break;
        }
        case "pipeline.run.cancelled": {
          const A = C;
          a(
            (D) => D.map(
              (O) => O.id === A.runId ? { ...O, status: "cancelled", completedAt: A.at } : O
            )
          );
          break;
        }
      }
  }, [t]));
  const v = z(
    () => i.find((y) => y.id === p) ?? null,
    [i, p]
  ), b = M((y) => {
    x((k) => k.includes(y) ? k.filter((C) => C !== y) : k.length >= 2 ? [k[1], y] : [...k, y]);
  }, []), w = M(() => {
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
                  m(!h), h && x([]);
                },
                "data-testid": "runs-panel-compare-toggle",
                className: I(
                  "cursor-pointer rounded px-2 py-0.5 font-inherit text-[11px] font-medium",
                  h ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"
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
        h && /* @__PURE__ */ o(
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
          v && /* @__PURE__ */ e(
            Rp,
            {
              pipelineId: t,
              run: v,
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
                  N();
                },
                className: "mx-auto mt-2 block cursor-pointer border-none bg-transparent font-inherit text-xs text-primary underline",
                children: "Retry"
              }
            )
          ] }),
          !s && !c && i.length === 0 && /* @__PURE__ */ e("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "No runs yet. Trigger this pipeline to see history here." }),
          i.length > 0 && /* @__PURE__ */ e("ul", { className: "m-0 flex-1 list-none overflow-y-auto p-0", children: i.map((y) => {
            const k = Dp(y.status), C = Mp(y.status), $ = g.includes(y.id);
            return /* @__PURE__ */ o(
              "li",
              {
                "data-testid": `runs-panel-row-${y.id}`,
                onClick: () => {
                  h ? b(y.id) : u(y.id);
                },
                className: I(
                  "cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover",
                  $ && "bg-[#eff6ff]"
                ),
                children: [
                  /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
                    h && /* @__PURE__ */ e(
                      "input",
                      {
                        type: "checkbox",
                        checked: $,
                        onChange: () => b(y.id),
                        onClick: (A) => A.stopPropagation(),
                        "data-testid": `runs-panel-compare-check-${y.id}`,
                        className: "m-0 shrink-0 accent-primary",
                        "aria-label": `Select run ${y.id.slice(0, 8)} for comparison`
                      }
                    ),
                    /* @__PURE__ */ e(se, { tone: k, "aria-label": `Status: ${C}`, children: C }),
                    /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-secondary", children: y.id.slice(0, 8) }),
                    /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: Ap(y.startedAt) })
                  ] }),
                  /* @__PURE__ */ o("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ e("span", { children: Se(y.durationMs) }),
                    y.estimatedCostUsd != null && y.estimatedCostUsd > 0 && /* @__PURE__ */ e(
                      "span",
                      {
                        className: I("font-mono font-semibold", Pp(y.estimatedCostUsd)),
                        title: `Estimated cost: ${eo(y.estimatedCostUsd)}`,
                        children: eo(y.estimatedCostUsd)
                      }
                    ),
                    y.estimatedCostUsd != null && y.estimatedCostUsd > 1 && /* @__PURE__ */ e("span", { className: "rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "High Cost" }),
                    /* @__PURE__ */ e("span", { className: "ml-auto", children: Op(y) })
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
function _p({
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
          r === "config" && (n !== null ? /* @__PURE__ */ e(Cp, {}) : /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          r === "runs" && /* @__PURE__ */ e(
            Ep,
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
function Lp(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Bp(t) {
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
function Up(t) {
  if (!(t instanceof HTMLElement)) return !1;
  const n = t.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || t.isContentEditable);
}
function zh() {
  const { pipelineId: t } = xt(), n = z(() => t ? at(t) !== null : !1, [t]);
  return !t || !n ? /* @__PURE__ */ e(bt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(Ro, { pipelineId: t, children: /* @__PURE__ */ e(Fp, { pipelineId: t }) });
}
function Fp({ pipelineId: t }) {
  const n = je(), r = Le(), i = yt(), { toast: a } = cn(), {
    definition: s,
    dirty: d,
    selectedNodeId: c,
    setSelectedNodeId: l,
    save: p,
    publish: u,
    revert: h,
    undo: m,
    redo: g,
    setTags: x
  } = r, f = Al(t), [N, v] = S(!1), b = ce(null), w = ce(d);
  re(() => (w.current && !d && (v(!0), b.current && clearTimeout(b.current), b.current = setTimeout(() => v(!1), 450)), w.current = d, () => {
    b.current && (clearTimeout(b.current), b.current = null);
  }), [d]);
  const y = z(
    () => s ? Uo(s) : null,
    [s]
  ), k = (y?.errors.length ?? 0) > 0, C = z(
    () => Bp(s),
    [s]
  ), A = z(() => s ? s.nodes.some((xe) => xe.type === "trigger") : !1, [s]) ? ["trigger"] : [], [D, O] = S(!0), [ne, R] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), J = M(() => {
    R((xe) => {
      const ae = !xe;
      try {
        window.localStorage.setItem(
          "ws_pipelines_v1_show_tags",
          ae ? "true" : "false"
        );
      } catch {
      }
      return ae;
    });
  }, []), [Y, H] = S(!1), [Q, E] = S(!1), [T, K] = S(!1), [G, U] = S(!1), [q, W] = S(!1), X = z(() => s?.publishedSnapshot ? s.publishedSnapshot : null, [s]), pe = s?.status === "published", j = !f.isRunActive && (!pe || k), le = f.isRunActive ? "Cancel the active run" : pe ? k ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", we = M(async () => {
    if (f.isRunActive && f.currentRunId) {
      i.cancelRun(f.currentRunId);
      return;
    }
    if (!j) {
      if (C.length > 0) {
        f.setTriggerInputValues(
          Object.fromEntries(C.map((xe) => [xe, ""]))
        ), f.setTriggerInputOpen(!0);
        return;
      }
      f.handleRunClick();
    }
  }, [f, i, j, C]);
  re(() => {
    const xe = (ae) => {
      if (Up(ae.target)) return;
      const Z = ae.metaKey || ae.ctrlKey;
      if (Z && ae.key.toLowerCase() === "s") {
        ae.preventDefault(), p(), a("Saved", { type: "success", durationMs: 1200 });
        return;
      }
      if (Z && ae.key === "Enter") {
        ae.preventDefault(), we();
        return;
      }
      if (Z && ae.key === ".") {
        ae.preventDefault(), f.isRunActive && f.currentRunId && i.cancelRun(f.currentRunId);
        return;
      }
      if (Z && ae.shiftKey && ae.key.toLowerCase() === "z") {
        ae.preventDefault(), g();
        return;
      }
      if (Z && ae.key.toLowerCase() === "z") {
        ae.preventDefault(), m();
        return;
      }
      if (ae.key === "Escape") {
        l(null);
        return;
      }
    };
    return window.addEventListener("keydown", xe), () => window.removeEventListener("keydown", xe);
  }, [p, a, we, f, i, m, g, l]);
  const Be = () => {
    if (!s) return;
    const xe = Yn(s.id);
    xe && n(`/pipelines/${xe.id}`);
  }, Xe = () => {
    if (!s) return;
    const xe = Ln(s.id);
    xe && _t(`${Lp(s.name)}.pipeline.json`, xe);
  }, ze = async () => {
    if (!s) return;
    const xe = kl(s);
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(xe), a("Mermaid diagram copied", { type: "success" });
      else
        throw new Error("clipboard unavailable");
    } catch (ae) {
      console.warn("[PipelineEditor] clipboard write failed", ae), a("Could not copy Mermaid diagram", { type: "error" });
    }
  }, Oe = () => {
    U(!0);
  }, We = () => {
    H(!1), !k && (u(), a("Pipeline published", { type: "success" }));
  }, qe = () => {
    s && (ha(s.id), E(!1), n("/pipelines"));
  }, Ve = () => {
    Po(t), K(!1), a("Run history cleared", { type: "success" });
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
            savingFlash: N,
            isRunActive: f.isRunActive,
            isTriggering: f.isTriggering,
            runDisabled: j,
            runTitle: le,
            currentRun: Ie,
            breakpoints: f.breakpoints,
            onRunClick: we,
            onDebugRunClick: f.handleDebugRunClick,
            onExport: Xe,
            onPublishClick: () => H(!0),
            onDuplicate: Be,
            onCopyMermaid: ze,
            onViewVersions: Oe,
            onRevert: h,
            onToggleShowTags: J,
            showTags: ne,
            onViewRunHistory: () => f.setSidebarTab("runs"),
            onClearRunHistory: () => K(!0),
            onSimPanelOpen: () => W(!0),
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
                La,
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
          /* @__PURE__ */ e(Is, { disabledTypes: A }),
          /* @__PURE__ */ e("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ e(
            Fs,
            {
              errorNodeId: f.activeError?.nodeId ?? null,
              onErrorNodePosition: f.handleErrorNodePosition,
              breakpoints: f.breakpoints,
              onToggleBreakpoint: f.handleToggleBreakpoint,
              pausedAtNodeId: f.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ e(
            _p,
            {
              pipelineId: t,
              selectedNodeId: c,
              sidebarTab: f.sidebarTab,
              onTabChange: f.setSidebarTab
            }
          )
        ] }),
        f.pausedBreakpoint && /* @__PURE__ */ e(
          Wl,
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
          zs,
          {
            error: f.activeError,
            anchor: f.errorNodeAnchor,
            onDismiss: f.handleDismissError,
            onRetry: f.handleRetryFromError
          }
        ),
        /* @__PURE__ */ e(
          Pl,
          {
            runId: f.currentRunId,
            visible: f.isRunActive && D
          }
        ),
        /* @__PURE__ */ e(
          Rl,
          {
            publishConfirmOpen: Y,
            onPublishClose: () => H(!1),
            onPublishConfirm: We,
            hasErrors: k,
            validationErrorCount: y?.errors.length ?? 0,
            definitionName: s.name,
            definitionVersion: s.version,
            deleteConfirmOpen: Q,
            onDeleteClose: () => E(!1),
            onDeleteConfirm: qe,
            clearRunsConfirmOpen: T,
            onClearRunsClose: () => K(!1),
            onClearRunsConfirm: Ve,
            versionDiffOpen: G,
            onVersionDiffClose: () => U(!1),
            currentDef: s,
            publishedDef: X,
            onJumpToNode: l,
            simPanelOpen: q,
            onSimPanelClose: () => W(!1)
          }
        ),
        /* @__PURE__ */ e(
          Ke,
          {
            open: f.triggerInputOpen,
            onClose: () => f.setTriggerInputOpen(!1),
            title: "Trigger inputs",
            maxWidth: 480,
            footer: /* @__PURE__ */ o(V, { children: [
              /* @__PURE__ */ e(_e, { variant: "ghost", onClick: () => f.setTriggerInputOpen(!1), children: "Cancel" }),
              /* @__PURE__ */ e(
                _e,
                {
                  variant: "primary",
                  onClick: f.handleTriggerInputSubmit,
                  disabled: C.some((xe) => !f.triggerInputValues[xe]?.trim()),
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
                    value: f.triggerInputValues[xe] ?? "",
                    onChange: (ae) => f.setTriggerInputValues((Z) => ({ ...Z, [xe]: ae.target.value }))
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
function jp(t) {
  const n = t?.event;
  return !n || n === "manual" ? { icon: "▶", text: "Manual" } : n === "schedule" ? { icon: "⏱", text: t?.schedule ?? "Schedule" } : n === "webhook" ? { icon: "🔌", text: t?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${t?.event}` };
}
function zp({
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
  const [u, h] = S(!1), [m, g] = S(!1), x = ce(null);
  gt(x, () => h(!1), u);
  const f = t.status === "published", N = t.status === "archived", v = typeof t.publishedVersion == "number", b = jp(t.triggerBinding);
  let w, y;
  N ? (w = `Archived · v${t.version}`, y = "danger") : f ? (w = `Published · v${t.version}`, y = "success") : v ? (w = `Draft · v${t.version} (published v${t.publishedVersion})`, y = "warning") : (w = `Draft · v${t.version}`, y = "neutral");
  const k = !f, C = (D) => (O) => {
    O.stopPropagation(), D();
  }, $ = d || c || m || l, A = (D) => {
    d ? p(D.shiftKey) : n();
  };
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": `pipeline-card-${t.id}`,
      "data-selected": c ? "true" : "false",
      onClick: A,
      onMouseEnter: () => g(!0),
      onMouseLeave: () => {
        g(!1), h(!1);
      },
      className: I(
        "flex flex-col gap-2 w-full px-3.5 py-3 bg-surface rounded-lg cursor-pointer relative transition-[border-color,box-shadow] duration-100",
        c ? "border border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : m ? "border border-primary shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "border border-border shadow-none"
      ),
      children: [
        $ && /* @__PURE__ */ e(
          "label",
          {
            onClick: (D) => D.stopPropagation(),
            className: "absolute top-2 right-2 flex items-center justify-center w-[22px] h-[22px] cursor-pointer z-[1]",
            children: /* @__PURE__ */ e(
              "input",
              {
                type: "checkbox",
                "data-testid": `pipeline-select-${t.id}`,
                checked: c,
                onClick: (D) => {
                  D.stopPropagation(), p(D.shiftKey);
                },
                onKeyDown: (D) => {
                  (D.key === " " || D.key === "Spacebar") && (D.preventDefault(), p(D.shiftKey));
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
          /* @__PURE__ */ e(se, { "aria-label": `Status: ${w}`, tone: y, size: "sm", children: w }),
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
                onClick: C(() => h((D) => !D)),
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
                onClick: (D) => D.stopPropagation(),
                className: "absolute right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-[0_8px_24px_rgba(15,23,42,0.12)] min-w-[160px] z-10 overflow-hidden",
                children: [
                  /* @__PURE__ */ e("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: C(() => {
                    h(!1), i();
                  }), children: "Duplicate" }),
                  /* @__PURE__ */ e("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: C(() => {
                    h(!1), a();
                  }), children: "Export JSON" }),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-[#dc2626]",
                      role: "menuitem",
                      onClick: C(() => {
                        h(!1), s();
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
const qp = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, Wp = ["draft", "published"];
function Vp({
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
  onHeaderToggleAll: h
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
                  onChange: h,
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
            onChange: (m) => n(m.target.value),
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
            children: rr.map((m) => {
              const g = i ? r.has(m) : Wp.includes(m);
              return /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  role: "checkbox",
                  "aria-checked": g,
                  "data-testid": `status-chip-${m}`,
                  onClick: () => a(m),
                  onKeyDown: (x) => {
                    (x.key === "Enter" || x.key === " ") && (x.preventDefault(), a(m));
                  },
                  className: I(
                    "px-3 py-1.5 text-xs font-medium rounded cursor-pointer font-inherit",
                    g ? "border border-primary bg-primary text-white" : "border border-border bg-white text-text-secondary"
                  ),
                  children: qp[m]
                },
                m
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
              onChange: (m) => d(m.target.value),
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
              onChange: (m) => l(m.target.value),
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
const Qe = I(
  "px-2.5 py-[5px] text-xs font-semibold",
  "bg-white text-text-secondary",
  "border border-border-field rounded-md",
  "cursor-pointer font-inherit"
);
function Jp({
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
  removeTagOpen: h,
  onSubmitAddTag: m,
  onSubmitRemoveTag: g,
  onCloseAddTag: x,
  onCloseRemoveTag: f,
  unionTags: N
}) {
  const [v, b] = S(""), w = ce(null), y = ce(null), k = ce(null);
  re(() => {
    u && (b(""), setTimeout(() => w.current?.focus(), 30));
  }, [u]), re(() => {
    if (!u) return;
    const $ = (D) => {
      y.current?.contains(D.target) || x();
    }, A = window.setTimeout(() => {
      document.addEventListener("mousedown", $);
    }, 0);
    return () => {
      window.clearTimeout(A), document.removeEventListener("mousedown", $);
    };
  }, [u, x]), re(() => {
    if (!h) return;
    const $ = (D) => {
      k.current?.contains(D.target) || f();
    }, A = window.setTimeout(() => {
      document.addEventListener("mousedown", $);
    }, 0);
    return () => {
      window.clearTimeout(A), document.removeEventListener("mousedown", $);
    };
  }, [h, f]);
  const C = () => {
    const $ = v.trim();
    $.length !== 0 && (m($), b(""));
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
        /* @__PURE__ */ e("button", { "data-testid": "bulk-clear", className: Qe, onClick: n, children: "Clear" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-publish", className: Qe, onClick: a, children: "Publish selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-archive", className: Qe, onClick: s, children: "Archive selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export-json", className: Qe, onClick: i, children: "Export selected as JSON" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export", className: Qe, onClick: r, children: "Export all" }),
        /* @__PURE__ */ e(
          "button",
          {
            "data-testid": "bulk-delete-confirm-prompt",
            className: Qe,
            onClick: p,
            children: "Delete selected"
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", children: [
          /* @__PURE__ */ e("button", { "data-testid": "bulk-add-tag-btn", className: Qe, onClick: d, children: "Add tag..." }),
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
                    value: v,
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
          /* @__PURE__ */ e(
            "button",
            {
              "data-testid": "bulk-remove-tag-btn",
              className: I(
                Qe,
                N.length === 0 && "opacity-50 cursor-not-allowed"
              ),
              onClick: c,
              disabled: N.length === 0,
              title: N.length === 0 ? "No tags on selected pipelines" : "Remove tag from selected",
              children: "Remove tag..."
            }
          ),
          h && /* @__PURE__ */ o(
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
                /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: N.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "No tags to remove." }) : N.map(($) => /* @__PURE__ */ o(
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
function Hp({
  visibleRows: t,
  filteredIds: n
}) {
  const [r, i] = S(!1), [a, s] = S(/* @__PURE__ */ new Set()), d = ce(null), c = ce(null), l = M(() => {
    s(/* @__PURE__ */ new Set());
  }, []), p = M(() => {
    r ? (l(), i(!1)) : i(!0);
  }, [r, l]), u = M(
    (f, N = !1) => {
      const v = t, b = v.findIndex((y) => y.id === f), w = d.current;
      b !== -1 && (d.current = b), s((y) => {
        const k = new Set(y), C = !k.has(f);
        if (N && w != null && b !== -1) {
          const $ = Math.min(w, b), A = Math.max(w, b);
          for (let D = $; D <= A; D++) {
            const O = v[D];
            O && (C ? k.add(O.id) : k.delete(O.id));
          }
        } else C ? k.add(f) : k.delete(f);
        return k;
      });
    },
    [t]
  ), h = M(() => {
    s(new Set(n));
  }, [n]), m = t.length > 0 && t.every((f) => a.has(f.id)), g = !m && t.some((f) => a.has(f.id)), x = M(() => {
    s((f) => {
      const N = new Set(f);
      if (m)
        for (const v of t) N.delete(v.id);
      else
        for (const v of t) N.add(v.id);
      return N;
    }), r || i(!0);
  }, [m, t, r]);
  return re(() => {
    c.current && (c.current.indeterminate = g);
  }, [g]), {
    selectionMode: r,
    selected: a,
    allVisibleSelected: m,
    someVisibleSelected: g,
    selectAllRef: c,
    handleToggleSelectMode: p,
    handleToggleSelect: u,
    handleSelectAllFiltered: h,
    handleHeaderToggleAll: x,
    clearSelection: l,
    setSelectionMode: i
  };
}
const Kp = 280, ke = 160, Gp = 40, Yp = 200;
function ee(t) {
  return Gp + t * Kp;
}
function te(t) {
  return Yp + t * ke;
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
function Xp(t) {
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
function Qp(t) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = {
    type: "trigger",
    triggerType: "document.finalize",
    documentTypeId: "meeting-notes"
  }, u = {
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
  }, N = [
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: p },
    { id: i, type: "fork", position: { x: ee(1), y: te(0) }, data: u },
    { id: a, type: "llm", position: { x: ee(2), y: te(0) - ke / 2 }, data: h },
    { id: s, type: "action", position: { x: ee(3), y: te(0) - ke / 2 }, data: m },
    { id: d, type: "llm", position: { x: ee(2), y: te(0) + ke / 2 }, data: g },
    { id: c, type: "action", position: { x: ee(3), y: te(0) + ke / 2 }, data: x },
    { id: l, type: "join", position: { x: ee(4), y: te(0) }, data: f }
  ], v = [
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
    nodes: N,
    edges: v,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Zp(t) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = crypto.randomUUID(), h = {
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
  }, N = {
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
  }, w = {
    type: "action",
    actionType: "update-document",
    config: { field: "commentStatus", value: "deleted" },
    idempotent: !0,
    onError: "fail-run"
  }, y = [
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: h },
    { id: i, type: "llm", position: { x: ee(1), y: te(0) }, data: m },
    { id: a, type: "condition", position: { x: ee(2), y: te(0) }, data: g },
    { id: s, type: "action", position: { x: ee(3), y: te(0) - ke / 2 }, data: x },
    { id: d, type: "action", position: { x: ee(3), y: te(0) + ke / 2 }, data: f },
    { id: c, type: "approval", position: { x: ee(4), y: te(0) + ke / 2 }, data: N },
    { id: l, type: "condition", position: { x: ee(5), y: te(0) + ke / 2 }, data: v },
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
function eu(t) {
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
  ], h = [
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
    edges: h,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function tu(t) {
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
  ], h = [
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
    edges: h,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function nu(t) {
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
  ], h = [
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
    edges: h,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function ru(t) {
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
function ou(t) {
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
function au(t) {
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
  }, h = {
    type: "approval",
    approvers: [{ type: "role", value: "reviewer" }],
    requiredCount: 1,
    timeoutMs: 2880 * 60 * 1e3,
    timeoutAction: "reject",
    message: "Please review this document PR-style and approve or reject."
  }, m = { type: "join", mode: "all", mergeStrategy: "deep-merge" }, g = {
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
    { id: s, type: "approval", position: { x: ee(2), y: te(0) + ke / 2 }, data: h },
    { id: d, type: "join", position: { x: ee(3), y: te(0) }, data: m },
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
function iu(t) {
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
  }, h = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "on-call",
      message: `CRITICAL incident: {{context.steps.${i}.output.summary}}`
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
    { id: s, type: "action", position: { x: ee(3), y: te(0) - ke / 2 }, data: h },
    { id: d, type: "approval", position: { x: ee(4), y: te(0) - ke / 2 }, data: m },
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
function su(t) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = crypto.randomUUID(), h = {
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
  }, N = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are a test-coverage reviewer. Identify untested branches, missing edge-case tests, and risky changes lacking tests. Output JSON {"gaps": [{"file": string, "concern": string}]}.',
    userPromptTemplate: `{{context.payload.pull_request.diff}}

Summary: {{context.steps.${i}.response}}`,
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
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: h },
    { id: i, type: "llm", position: { x: ee(1), y: te(0) }, data: m },
    { id: a, type: "fork", position: { x: ee(2), y: te(0) }, data: g },
    { id: s, type: "llm", position: { x: ee(3), y: te(0) - ke }, data: x },
    { id: d, type: "llm", position: { x: ee(3), y: te(0) }, data: f },
    { id: c, type: "llm", position: { x: ee(3), y: te(0) + ke }, data: N },
    { id: l, type: "join", position: { x: ee(4), y: te(0) }, data: v },
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
function lu(t) {
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
  }, h = {
    type: "approval",
    approvers: [{ type: "role", value: "moderator" }],
    requiredCount: 1,
    timeoutMs: 720 * 60 * 1e3,
    timeoutAction: "reject",
    message: `Document flagged as {{context.steps.${i}.output.category}} — please review before publishing.`
  }, m = [
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: c },
    { id: i, type: "llm", position: { x: ee(1), y: te(0) }, data: l },
    { id: a, type: "condition", position: { x: ee(2), y: te(0) }, data: p },
    { id: s, type: "action", position: { x: ee(3), y: te(0) - ke / 2 }, data: u },
    { id: d, type: "approval", position: { x: ee(3), y: te(0) + ke / 2 }, data: h }
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
    nodes: m,
    edges: g,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function cu(t) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), i = crypto.randomUUID(), a = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = {
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
  }, N = {
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
    { id: r, type: "trigger", position: { x: ee(0), y: te(0) }, data: u },
    { id: i, type: "llm", position: { x: ee(1), y: te(0) }, data: h },
    { id: a, type: "transform", position: { x: ee(2), y: te(0) }, data: m },
    { id: s, type: "condition", position: { x: ee(3), y: te(0) }, data: g },
    { id: d, type: "action", position: { x: ee(4), y: te(0) - ke / 2 }, data: x },
    { id: c, type: "llm", position: { x: ee(4), y: te(0) + ke / 2 }, data: f },
    { id: l, type: "approval", position: { x: ee(5), y: te(0) + ke / 2 }, data: N },
    { id: p, type: "action", position: { x: ee(6), y: te(0) + ke / 2 }, data: v }
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
const On = [
  {
    id: "document-summary",
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    tags: ["llm", "summary", "document"],
    build: Xp
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: Qp
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: Zp,
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
    build: eu,
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
    build: tu,
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
    build: nu
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: ru
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: ou
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: au
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: iu
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: su
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: lu
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: cu
  }
], Jo = "/api";
async function du(t) {
  const n = { createdTypes: [], errors: [] };
  if (!t?.documentTypes?.length) return n;
  for (const r of t.documentTypes)
    try {
      const i = await pu(r.name);
      if (i) {
        n.createdTypes.push(i.typeId);
        continue;
      }
      const a = await uu(r);
      n.createdTypes.push(a.typeId);
    } catch (i) {
      n.errors.push(
        `Failed to scaffold "${r.name}": ${i instanceof Error ? i.message : String(i)}`
      );
    }
  return n;
}
async function pu(t) {
  try {
    const n = await fetch(`${Jo}/document-types`, { credentials: "same-origin" });
    if (!n.ok) return null;
    const i = (await n.json()).items?.find(
      (a) => a.name.toLowerCase() === t.toLowerCase()
    );
    return i ? { typeId: i.typeId } : null;
  } catch {
    return null;
  }
}
async function uu(t) {
  const n = t.fields.map((a, s) => ({
    fieldId: crypto.randomUUID(),
    name: a.name,
    fieldType: a.fieldType,
    widget: mu(a.fieldType),
    cardinality: 1,
    required: a.required ?? !1,
    helpText: "",
    options: a.options,
    order: s
  })), r = await fetch(`${Jo}/document-types`, {
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
function mu(t) {
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
function hu(t) {
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
function fu(t) {
  const n = t.triggerBinding?.event ?? "manual";
  return n === "schedule" ? "Schedule" : n === "webhook" ? "Webhook" : n === "manual" ? "Manual" : n.startsWith("document.") ? `On ${n}` : n;
}
function gu({ template: t, meta: n, onPick: r }) {
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
function xu({
  open: t,
  onClose: n,
  onCreated: r,
  onSelect: i
}) {
  const { userId: a } = Lo(), [s, d] = S(""), c = ce(null);
  re(() => {
    t && (d(""), setTimeout(() => c.current?.focus(), 30));
  }, [t]);
  const l = z(() => {
    const m = /* @__PURE__ */ new Map();
    for (const g of On) {
      const x = g.build(a || "anonymous");
      m.set(g.id, { nodeCount: x.nodes.length, trigger: fu(x) });
    }
    return m;
  }, [a, t]), p = z(() => {
    const m = s.trim().toLowerCase();
    return m ? On.filter(
      (g) => g.name.toLowerCase().includes(m) || g.description.toLowerCase().includes(m) || g.tags.some((x) => x.toLowerCase().includes(m))
    ) : On;
  }, [s]), u = (m) => {
    if (r) {
      const g = m.build(a || "anonymous"), x = hu(g);
      fa(x), n(), r(x.id), m.prerequisites && du(m.prerequisites).then((f) => {
        f.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", f.errors);
      });
      return;
    }
    i && i(m);
  };
  return /* @__PURE__ */ o(
    Ke,
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
            onChange: (m) => d(m.target.value),
            onKeyDown: (m) => {
              m.key === "Enter" && p.length > 0 && (m.preventDefault(), u(p[0]));
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
            children: p.map((m) => /* @__PURE__ */ e(
              gu,
              {
                template: m,
                meta: l.get(m.id) ?? { nodeCount: 0, trigger: "—" },
                onPick: u
              },
              m.id
            ))
          }
        )
      ]
    }
  );
}
const rr = ["draft", "published", "archived"], to = ["draft", "published"];
function bu(t) {
  if (t == null) return null;
  if (t.trim() === "") return /* @__PURE__ */ new Set();
  const n = new Set(rr);
  return new Set(
    t.split(",").map((i) => i.trim()).filter((i) => n.has(i))
  );
}
function yu(t, n) {
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
function vu(t) {
  const n = t?.event;
  return !n || n === "manual" ? "manual" : n === "schedule" ? "schedule" : n === "webhook" ? "webhook" : "document";
}
function no(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Nu() {
  const t = /* @__PURE__ */ new Date(), n = t.getFullYear(), r = String(t.getMonth() + 1).padStart(2, "0"), i = String(t.getDate()).padStart(2, "0");
  return `${n}-${r}-${i}`;
}
function wu({
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
    Ke,
    {
      open: t,
      onClose: n,
      title: "Create new pipeline",
      maxWidth: 440,
      footer: /* @__PURE__ */ o(V, { children: [
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
function qh() {
  const t = je(), { userId: n } = Lo(), { toast: r } = cn(), { triggerRun: i, isTriggering: a } = ga(), [s, d] = ln(), [c, l] = S([]), [p, u] = S(""), [h, m] = S("all"), [g, x] = S("updated"), f = z(
    () => bu(s.get("status")),
    [s]
  ), N = z(() => f ?? new Set(to), [f]), v = f != null, b = (P) => {
    const _ = new URLSearchParams(s);
    if (P.size === 0)
      _.set("status", "");
    else {
      const de = rr.filter((he) => P.has(he)).join(",");
      _.set("status", de);
    }
    d(_, { replace: !0 });
  }, w = (P) => {
    const _ = v ? new Set(N) : new Set(to);
    _.has(P) ? _.delete(P) : _.add(P), b(_);
  }, [y, k] = S(!1), [C, $] = S(!1), [A, D] = S(null), [O, ne] = S(!1), [R, J] = S(!1), [Y, H] = S(!1), Q = M(async () => {
    const P = await xa(), _ = [];
    for (const de of P) {
      const he = await it(de.id);
      he && _.push(yu(he, de.icon));
    }
    l(_);
  }, []);
  re(() => {
    Q();
  }, [Q]);
  const E = z(() => {
    const P = p.trim().toLowerCase(), de = [...c.filter((he) => {
      if (P) {
        const Ne = he.name.toLowerCase().includes(P), Ue = he.tags.some((ar) => ar.toLowerCase().includes(P));
        if (!Ne && !Ue) return !1;
      }
      return !(!(v && N.size === 0) && !N.has(he.status) || h !== "all" && vu(he.triggerBinding) !== h);
    })];
    return g === "name" ? de.sort((he, Ne) => he.name.localeCompare(Ne.name)) : g === "created" ? de.sort((he, Ne) => Ne.createdAt.localeCompare(he.createdAt)) : de.sort((he, Ne) => Ne.updatedAt.localeCompare(he.updatedAt)), de;
  }, [c, p, N, v, h, g]), T = z(() => E.map((P) => P.id), [E]), {
    selectionMode: K,
    selected: G,
    allVisibleSelected: U,
    selectAllRef: q,
    handleToggleSelect: W,
    handleSelectAllFiltered: X,
    handleHeaderToggleAll: pe,
    clearSelection: j,
    setSelectionMode: le
  } = Hp({ visibleRows: E, filteredIds: T }), we = z(() => {
    const P = /* @__PURE__ */ new Set();
    for (const _ of c)
      if (G.has(_.id))
        for (const de of _.tags) P.add(de);
    return Array.from(P).sort((_, de) => _.localeCompare(de));
  }, [c, G]), Be = async (P) => {
    const _ = await ba({ name: P, createdBy: n });
    k(!1), t(`/pipelines/${_.id}`);
  }, Xe = () => {
    const P = ya(n);
    st(P).then(() => Q()), t(`/pipelines/${P.id}`);
  }, ze = (P) => {
    const _ = P.build(n);
    st(_), $(!1), t(`/pipelines/${_.id}`);
  }, Oe = (P) => t(`/pipelines/${P}`), We = async (P) => {
    if (P.status !== "published") {
      r("Run requires published state", { type: "warning" });
      return;
    }
    if (!a)
      try {
        await i(P.id, {}) ? r(`Run started for "${P.name}"`, { type: "success" }) : r("Could not start run", { type: "error" });
      } catch (_) {
        r(`Run failed: ${_.message}`, { type: "error" });
      } finally {
        t(`/pipelines/${P.id}`);
      }
  }, qe = (P) => {
    const _ = Yn(P);
    _ && (st(_).then(() => Q()), r(`Duplicated as "${_.name}"`, { type: "success" }));
  }, Ve = (P) => {
    const _ = Ln(P.id);
    if (!_) {
      r("Export failed", { type: "error" });
      return;
    }
    _t(`${no(P.name)}.pipeline.json`, _);
  }, Ie = async () => {
    A && (await sr(A), D(null), Q(), r("Pipeline deleted", { type: "success" }));
  }, xe = A ? c.find((P) => P.id === A) : null, ae = () => {
    const P = Array.from(G);
    P.length !== 0 && (P.forEach((_, de) => {
      window.setTimeout(() => {
        const he = c.find((Ue) => Ue.id === _), Ne = Ln(_);
        !he || !Ne || _t(`${no(he.name)}-${Nu()}.pipeline.json`, Ne);
      }, de * 100);
    }), r(`Exported ${P.length} pipeline${P.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, Z = async (P) => {
    const _ = Array.from(G);
    for (const de of _) {
      const he = await it(de);
      if (!he) continue;
      const Ne = he.tags ?? [];
      Ne.includes(P) || (he.tags = [...Ne, P], await st(he));
    }
    J(!1), Q(), r(`Added tag "${P}" to ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ie = async (P) => {
    const _ = Array.from(G);
    for (const de of _) {
      const he = await it(de);
      if (!he) continue;
      const Ne = he.tags ?? [];
      Ne.includes(P) && (he.tags = Ne.filter((Ue) => Ue !== P), await st(he));
    }
    Q(), r(`Removed tag "${P}" from ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ue = async () => {
    const P = Array.from(G);
    for (const _ of P) await sr(_);
    ne(!1), j(), Q(), r(`Deleted ${P.length} pipeline${P.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, be = async () => {
    const P = Array.from(G);
    if (P.length === 0) return;
    let _ = 0, de = 0;
    for (const he of P) {
      const Ne = await it(he);
      if (!Ne) continue;
      if (Ne.status === "published") {
        de += 1;
        continue;
      }
      await va(he) && (_ += 1);
    }
    Q(), de > 0 ? r(
      `Published ${_}; skipped ${de} already published`,
      { type: "success" }
    ) : r(
      `Published ${_} pipeline${_ === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, De = async () => {
    const P = Array.from(G);
    if (P.length === 0) return;
    let _ = 0, de = 0;
    for (const Ne of P) {
      const Ue = await it(Ne);
      if (!Ue) continue;
      Ue.status === "archived" ? (Ue.status = "draft", de += 1) : (Ue.status = "archived", _ += 1), await st(Ue);
    }
    Q();
    const he = [];
    _ > 0 && he.push(`Archived ${_}`), de > 0 && he.push(`Unarchived ${de}`), r(he.join(" · ") || "No pipelines changed", { type: "success" });
  }, Re = async () => {
    const P = Array.from(G);
    if (P.length === 0) return;
    const _ = [];
    for (const he of P) {
      const Ne = await it(he);
      Ne && _.push(Ne);
    }
    if (_.length === 0) {
      r("Export failed", { type: "error" });
      return;
    }
    const de = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    _t(`pipelines-${de}.json`, JSON.stringify(_, null, 2)), r(`Exported ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  };
  re(() => {
    const P = (_) => {
      const de = _.target;
      if (de) {
        const Ne = de.tagName;
        if (Ne === "INPUT" || Ne === "TEXTAREA" || Ne === "SELECT" || de.isContentEditable)
          return;
      }
      if (_.key === "Escape") {
        (G.size > 0 || K || R || Y) && (J(!1), H(!1), j(), le(!1));
        return;
      }
      if ((_.metaKey || _.ctrlKey) && (_.key === "a" || _.key === "A")) {
        K && (_.preventDefault(), X());
        return;
      }
      (_.key === "Delete" || _.key === "Backspace") && G.size > 0 && !O && !A && !y && !C && (_.preventDefault(), ne(!0));
    };
    return window.addEventListener("keydown", P), () => window.removeEventListener("keydown", P);
  }, [
    G,
    K,
    R,
    Y,
    O,
    A,
    y,
    C,
    j,
    X,
    le
  ]);
  const Ge = c.length > 0, Wt = G.size > 0;
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
        Ge && /* @__PURE__ */ e(
          Vp,
          {
            search: p,
            onSearchChange: u,
            statusFilter: N,
            statusExplicit: v,
            onToggleStatusKey: w,
            triggerFilter: h,
            onTriggerFilterChange: m,
            sortKey: g,
            onSortKeyChange: x,
            allVisibleSelected: U,
            selectAllRef: q,
            onHeaderToggleAll: pe
          }
        ),
        Wt && /* @__PURE__ */ e(
          Jp,
          {
            count: G.size,
            onClear: j,
            onExport: ae,
            onExportAsJSON: Re,
            onPublish: be,
            onArchive: De,
            onAddTag: () => {
              J((P) => !P), H(!1);
            },
            onRemoveTag: () => {
              H((P) => !P), J(!1);
            },
            onDelete: () => ne(!0),
            onDeleteWithConfirm: () => ne(!0),
            addTagOpen: R,
            removeTagOpen: Y,
            onSubmitAddTag: Z,
            onSubmitRemoveTag: ie,
            onCloseAddTag: () => J(!1),
            onCloseRemoveTag: () => H(!1),
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
            children: Ge ? E.length === 0 ? /* @__PURE__ */ e(
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
                children: E.map((P) => /* @__PURE__ */ e(
                  zp,
                  {
                    row: P,
                    onOpen: () => Oe(P.id),
                    onRun: () => {
                      We(P);
                    },
                    onDuplicate: () => qe(P.id),
                    onExport: () => Ve(P),
                    onDelete: () => D(P.id),
                    selectionMode: K,
                    selected: G.has(P.id),
                    anySelected: Wt,
                    onToggleSelect: (_) => W(P.id, _)
                  },
                  P.id
                ))
              }
            ) : /* @__PURE__ */ o("div", { className: "flex flex-col h-full", children: [
              /* @__PURE__ */ e("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ e(
                Fe,
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
                    onClick: Xe,
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
          wu,
          {
            open: y,
            onClose: () => k(!1),
            onCreate: Be
          }
        ),
        /* @__PURE__ */ e(
          xu,
          {
            open: C,
            onClose: () => $(!1),
            onSelect: ze
          }
        ),
        /* @__PURE__ */ e(
          Ke,
          {
            open: !!A,
            onClose: () => D(null),
            title: "Delete pipeline?",
            maxWidth: 400,
            footer: /* @__PURE__ */ o(V, { children: [
              /* @__PURE__ */ e(
                "button",
                {
                  "data-testid": "delete-pipeline-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => D(null),
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
          Ke,
          {
            open: O,
            onClose: () => ne(!1),
            title: `Delete ${G.size} pipeline${G.size === 1 ? "" : "s"}?`,
            maxWidth: 420,
            backdropTestId: "bulk-delete-modal",
            footer: /* @__PURE__ */ o(V, { children: [
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
                  onClick: ue,
                  className: I(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-danger text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: [
                    "Delete ",
                    G.size
                  ]
                }
              )
            ] }),
            children: /* @__PURE__ */ o("p", { className: "m-0", children: [
              /* @__PURE__ */ o("strong", { children: [
                G.size,
                " pipeline",
                G.size === 1 ? "" : "s"
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
const ku = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function Ho(t, n, r) {
  const i = ku[t], a = Math.max(0, n | 0), s = Math.max(0, r | 0);
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
function wt(t) {
  const n = {};
  let r = 0, i = 0, a = 0, s = 0, d = !1;
  for (const l of t) {
    if (!l.model) continue;
    const p = l.tokensIn ?? 0, u = l.tokensOut ?? 0, h = Ho(l.model, p, u), m = n[l.model];
    m ? n[l.model] = {
      inputTokens: m.inputTokens + h.inputTokens,
      outputTokens: m.outputTokens + h.outputTokens,
      inputCostUsd: m.inputCostUsd + h.inputCostUsd,
      outputCostUsd: m.outputCostUsd + h.outputCostUsd,
      totalCostUsd: m.totalCostUsd + h.totalCostUsd,
      model: l.model,
      modelFound: m.modelFound || h.modelFound
    } : n[l.model] = h, r += h.inputTokens, i += h.outputTokens, a += h.inputCostUsd, s += h.outputCostUsd, h.modelFound && (d = !0);
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
function qt(t) {
  return !t || !t.modelFound && t.totalCostUsd === 0 ? "—" : t.totalCostUsd >= 0.01 ? `$${t.totalCostUsd.toFixed(2)}` : t.totalCostUsd === 0 ? "$0.00" : `$${t.totalCostUsd.toFixed(4)}`;
}
function Cu(t) {
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
function Ko(t, n) {
  let r = 0;
  if (t.llm) {
    const a = n.get(t.nodeId);
    a && (r += Ho(a, t.llm.tokensIn, t.llm.tokensOut).totalCostUsd);
  }
  const i = t.costUsd;
  return typeof i == "number" && Number.isFinite(i) && i > 0 && (r += i), r;
}
function Iu(t, n) {
  if (!n) return [];
  const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    l.data.type === "llm" && r.set(l.id, l.data.model), i.set(l.id, Cu(l)), a.set(l.id, l.data.type);
  const s = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    s.set(l.id, 0), d.set(l.id, 0);
  for (const l of t)
    for (const p of Object.values(l.steps ?? {})) {
      if (!i.has(p.nodeId)) continue;
      const u = Ko(p, r);
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
function Su(t) {
  return t.slice(0, 10);
}
function $u(t) {
  return Date.UTC(
    Number(t.slice(0, 4)),
    Number(t.slice(5, 7)) - 1,
    Number(t.slice(8, 10))
  );
}
function Tu(t, n, r = 30, i = /* @__PURE__ */ new Date()) {
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
    const h = new Date(u).toISOString().slice(0, 10);
    c.set(h, 0), l.set(h, 0);
  }
  for (const u of t) {
    const h = Su(u.startedAt);
    if (!c.has(h)) continue;
    let m = 0;
    for (const g of Object.values(u.steps ?? {}))
      m += Ko(g, a);
    c.set(h, (c.get(h) ?? 0) + m), l.set(h, (l.get(h) ?? 0) + 1);
  }
  const p = [];
  for (let u = d; u <= s; u += 864e5) {
    const h = new Date(u).toISOString().slice(0, 10);
    p.push({
      date: h,
      ts: $u(h),
      totalCostUsd: c.get(h) ?? 0,
      runCount: l.get(h) ?? 0
    });
  }
  return p;
}
const Go = [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
], Yo = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], Xo = ["24h", "7d", "30d", "all"], Ru = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function Pu(t) {
  return t.startsWith("document.") || t === "document" ? "document" : t === "schedule" || t === "scheduled" ? "scheduled" : t === "webhook" ? "webhook" : "manual";
}
function Au(t) {
  let n = 0;
  for (const r of Object.values(t.steps ?? {})) {
    const i = r.attempts?.length ?? 0;
    i > 1 && (n += i - 1);
  }
  return n;
}
function Qo(t, n) {
  const r = n.now ?? Date.now(), i = n.range === "all" ? null : r - Ru[n.range], a = n.query.trim().toLowerCase();
  return t.filter((s) => {
    if (n.statuses.size > 0 && !n.statuses.has(s.status)) return !1;
    if (n.triggerKinds.size > 0) {
      const d = Pu(s.triggeredBy.triggerType);
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
function Zo(t) {
  const n = t.get("range") ?? "7d", r = Xo.includes(n) ? n : "7d";
  return {
    query: t.get("q") ?? "",
    statuses: ro(t.get("status"), Go),
    triggerKinds: ro(t.get("trigger"), Yo),
    range: r
  };
}
const Du = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, Mu = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, Ou = {
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
  gt(l, () => c(!1), d);
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
function ea({
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
        /* @__PURE__ */ e("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: Xo.map((u) => /* @__PURE__ */ e(
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
            children: Ou[u]
          },
          u
        )) }),
        /* @__PURE__ */ e("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ e(
          oo,
          {
            label: "Status",
            options: Go,
            selected: n,
            onToggle: s,
            labels: Du,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ e(
          oo,
          {
            label: "Trigger",
            options: Yo,
            selected: r,
            onToggle: d,
            labels: Mu,
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
function Eu({
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
function or(t) {
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
function _u(t) {
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
const Lu = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function Bu(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Uu({
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
  const p = ce(!1), u = ce(null), h = t.length > 0 && t.every((f) => n.has(f.id)), m = !h && t.some((f) => n.has(f.id)), g = () => {
    const f = new Set(n);
    if (h)
      for (const N of t) f.delete(N.id);
    else
      for (const N of t) f.add(N.id);
    r(f);
  }, x = (f, N, v) => {
    const b = new Set(n), w = !b.has(f);
    if (v && u.current != null) {
      const y = Math.min(u.current, N), k = Math.max(u.current, N);
      for (let C = y; C <= k; C++) {
        const $ = t[C];
        $ && (w ? b.add($.id) : b.delete($.id));
      }
    } else w ? b.add(f) : b.delete(f);
    u.current = N, r(b);
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
                  checked: h,
                  ref: (f) => {
                    f && (f.indeterminate = m);
                  },
                  onChange: g
                }
              )
            }
          ),
          ["Started", "Status", "Duration", "Retries", "Cost", "Triggered by", "Run ID", ""].map((f, N) => /* @__PURE__ */ e(
            "th",
            {
              scope: "col",
              className: "px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
              children: f
            },
            `${f}-${N}`
          ))
        ] }) }),
        /* @__PURE__ */ e("tbody", { children: t.map((f, N) => {
          const { tone: v, label: b } = or(f.status), w = n.has(f.id), y = Au(f);
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
                        p.current = !1, x(f.id, N, k);
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
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: Bu(f.startedAt) }),
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: [
                  /* @__PURE__ */ e(se, { tone: v, "aria-label": `Status: ${b}`, children: b }),
                  f.status === "running" && f.stuckAt && /* @__PURE__ */ e(
                    se,
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
                    se,
                    {
                      tone: _u(f.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${f.id}`,
                      title: f.error.message,
                      className: "ml-1.5",
                      children: Lu[f.error.errorCategory] ?? f.error.errorCategory
                    }
                  )
                ] }),
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: Se(f.durationMs) }),
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
                            await Na(f.pipelineId, f.id);
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
function Wh() {
  const { pipelineId: t } = xt(), n = je(), [r, i] = ln(), [a, s] = S([]), [d, c] = S(null), [l, p] = S([]), [u, h] = S(() => /* @__PURE__ */ new Set()), [m, g] = S(null), [x, f] = S(!1), [N, v] = S(null), [b, w] = S(!1), y = M((U) => {
    const q = U.error?.nodeId;
    if (!q || q === "unknown") return;
    const W = Object.entries(U.steps).filter(([X, pe]) => X !== q && pe.status === "completed").map(([X]) => X);
    g({ run: U, nodeId: q, skippedNodes: W, snapshotInput: !1 }), v(null);
  }, []), k = M(async () => {
    if (m) {
      v(null), f(!0);
      try {
        const U = await Ao(
          m.run.pipelineId,
          m.run.id,
          m.nodeId,
          void 0,
          m.snapshotInput || void 0
        );
        g(null), n(`/pipelines/${m.run.pipelineId}/runs/${U.newRunId}`);
      } catch (U) {
        v(U instanceof Error ? U.message : String(U)), f(!1);
      }
    }
  }, [m, n]), { query: C, statuses: $, triggerKinds: A, range: D } = z(
    () => Zo(r),
    [r]
  ), O = (U, q) => {
    const W = new URLSearchParams(r);
    q ? W.set(U, q) : W.delete(U), i(W, { replace: !0 });
  }, ne = (U) => {
    const q = new Set($);
    q.has(U) ? q.delete(U) : q.add(U), O("status", q.size === 0 ? null : Array.from(q).join(","));
  }, R = (U) => {
    const q = new Set(A);
    q.has(U) ? q.delete(U) : q.add(U), O("trigger", q.size === 0 ? null : Array.from(q).join(","));
  }, J = (U) => {
    O("range", U === "7d" ? null : U);
  }, Y = (U) => {
    O("q", U.length === 0 ? null : U);
  }, H = (U) => {
    p((q) => q.includes(U) ? q.filter((W) => W !== U) : q.length >= 2 ? [q[1], U] : [...q, U]);
  };
  re(() => {
    t && (c(at(t)), s(rn(t)));
  }, [t]);
  const Q = z(
    () => Qo(a, { query: C, statuses: $, triggerKinds: A, range: D }),
    [a, C, $, A, D]
  ), E = z(() => {
    const U = /* @__PURE__ */ new Map();
    if (!d) return U;
    for (const q of d.nodes)
      q.data.type === "llm" && U.set(q.id, q.data.model);
    return U;
  }, [d]), T = z(() => {
    const U = {};
    for (const q of Q) {
      const W = Object.values(q.steps).filter((X) => !!X.llm).map((X) => ({
        model: E.get(X.nodeId),
        tokensIn: X.llm?.tokensIn ?? 0,
        tokensOut: X.llm?.tokensOut ?? 0
      }));
      U[q.id] = qt(wt(W).total);
    }
    return U;
  }, [Q, E]), K = () => {
    if (!t) return;
    w(!1);
    const U = Array.from(u), q = a.filter((W) => !u.has(W.id));
    Po(t);
    for (const W of [...q].sort((X, pe) => X.startedAt.localeCompare(pe.startedAt)))
      wa(t, W);
    s(rn(t)), h(/* @__PURE__ */ new Set()), p((W) => W.filter((X) => !U.includes(X)));
  }, G = () => {
    const U = a.filter((j) => u.has(j.id));
    if (U.length === 0) return;
    const q = new Blob([JSON.stringify(U, null, 2)], { type: "application/json" }), W = URL.createObjectURL(q), X = document.createElement("a"), pe = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    X.href = W, X.download = `pipeline-runs-${pe}.json`, document.body.appendChild(X), X.click(), document.body.removeChild(X), URL.revokeObjectURL(W);
  };
  return t ? d ? /* @__PURE__ */ o("div", { "data-testid": "pipeline-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e(
      an,
      {
        open: m !== null,
        onConfirm: k,
        onCancel: () => {
          x || g(null);
        },
        title: "Retry from failure",
        confirmLabel: x ? "Starting…" : "Confirm retry",
        confirmDisabled: x,
        children: m && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2.5", children: [
          /* @__PURE__ */ o("div", { className: "text-[13px] text-text-secondary", children: [
            "Run ",
            /* @__PURE__ */ e("code", { className: "bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs", children: m.run.id.slice(0, 8) }),
            " will restart from step",
            " ",
            /* @__PURE__ */ o("code", { className: "bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs", children: [
              m.nodeId.slice(0, 12),
              m.nodeId.length > 12 ? "…" : ""
            ] }),
            " ",
            "using the original upstream context."
          ] }),
          m.skippedNodes.length > 0 && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5", children: [
              "Steps skipped (",
              m.skippedNodes.length,
              ")"
            ] }),
            /* @__PURE__ */ e("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: m.skippedNodes.map((U) => /* @__PURE__ */ e("span", { className: "bg-[#fafbfc] border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary", children: U.slice(0, 10) }, U)) })
          ] }),
          /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
            /* @__PURE__ */ e("input", { type: "checkbox", checked: m.snapshotInput, onChange: (U) => g((q) => q && { ...q, snapshotInput: U.target.checked }), className: "accent-primary" }),
            "Use persisted input snapshot"
          ] }),
          N && /* @__PURE__ */ e("div", { "data-testid": "retry-modal-error", className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: N })
        ] })
      }
    ),
    /* @__PURE__ */ e(
      an,
      {
        open: b,
        onConfirm: K,
        onCancel: () => w(!1),
        title: `Delete ${u.size} run${u.size === 1 ? "" : "s"}?`,
        body: "This cannot be undone.",
        confirmLabel: `Delete ${u.size}`,
        tone: "destructive"
      }
    ),
    N && /* @__PURE__ */ e(et, { title: "Retry failed:", onDismiss: () => v(null), children: N }),
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
            const [U, q] = l;
            n(`/pipelines/${t}/runs/compare/${U}/${q}`);
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
      ea,
      {
        query: C,
        statuses: $,
        triggerKinds: A,
        range: D,
        onQueryChange: Y,
        onStatusToggle: ne,
        onTriggerToggle: R,
        onRangeChange: J,
        onClearFilters: () => {
          Y(""), O("status", null), O("trigger", null);
        }
      }
    ),
    u.size > 0 && /* @__PURE__ */ e(
      Eu,
      {
        selectionCount: u.size,
        onExport: G,
        onDelete: () => {
          u.size > 0 && t && w(!0);
        },
        onClear: () => h(/* @__PURE__ */ new Set())
      }
    ),
    Q.length === 0 ? /* @__PURE__ */ e(
      Fe,
      {
        icon: "📜",
        title: a.length === 0 ? "No runs yet" : "No runs match these filters",
        body: a.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
      }
    ) : /* @__PURE__ */ e(
      Uu,
      {
        filtered: Q,
        selected: u,
        onSelectionChange: h,
        comparePair: l,
        onToggleComparePair: H,
        costByRunId: T,
        pipelineId: t,
        onNavigate: n,
        onOpenRetryModal: y
      }
    )
  ] }) : /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
    Fe,
    {
      icon: "🔍",
      title: "Pipeline not found",
      body: "It may have been deleted. Go back to the pipelines list.",
      actionLabel: "Back to pipelines",
      onAction: () => n("/pipelines")
    }
  ) }) : /* @__PURE__ */ e(bt, { to: "/pipelines", replace: !0 });
}
function Fu(t) {
  return z(() => {
    if (!t) return null;
    const n = at(t.pipelineId);
    if (!n) return null;
    const r = /* @__PURE__ */ new Map();
    for (const a of n.nodes)
      a.data.type === "llm" && r.set(a.id, a.data.model);
    const i = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
      model: r.get(a.nodeId),
      tokensIn: a.llm?.tokensIn ?? 0,
      tokensOut: a.llm?.tokensOut ?? 0
    }));
    return wt(i).total;
  }, [t]);
}
function Ze({ title: t, children: n }) {
  return /* @__PURE__ */ o("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ e("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: t }),
    n
  ] });
}
const ao = "m-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", io = "px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", En = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", Me = "px-2 py-[5px] text-[11px] text-text-secondary align-top", ju = {
  "#2563eb": "bg-info/10 text-info-fg",
  "#7c3aed": "bg-accent/10 text-accent-fg",
  "#16a34a": "bg-success/10 text-success-fg",
  "#dc2626": "bg-danger/10 text-danger-fg"
};
function At(t) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${ju[t] ?? ""}`.trimEnd();
}
const zu = {
  completed: "#16a34a",
  failed: "#dc2626",
  running: "#2563eb"
};
function qu({ stepId: t, step: n, index: r, nodeType: i, nodeConfig: a, onRetryFromStep: s, onResumeFromStep: d }) {
  const [c, l] = S(!1), p = n.output, u = p?.response, h = n.llm, m = n.input, g = zu[n.status] ?? "#94a3b8";
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
          h && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
            h.tokensIn + h.tokensOut,
            " tok"
          ] }),
          p?.tokensIn != null && !h && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
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
          /* @__PURE__ */ e(Ze, { title: "Execution Timeline", children: /* @__PURE__ */ o("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ e("th", { scope: "col", className: En, children: "Event" }),
              /* @__PURE__ */ e("th", { scope: "col", className: En, children: "Time" }),
              /* @__PURE__ */ e("th", { scope: "col", className: En, children: "Detail" })
            ] }) }),
            /* @__PURE__ */ o("tbody", { children: [
              n.startedAt && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Me, children: /* @__PURE__ */ e("span", { className: At("#2563eb"), children: "started" }) }),
                /* @__PURE__ */ e("td", { className: Me, children: new Date(n.startedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Me, children: [
                  "Node ",
                  t.slice(0, 8),
                  " (",
                  i,
                  ") began execution"
                ] })
              ] }),
              h?.streamOpened && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Me, children: /* @__PURE__ */ e("span", { className: At("#7c3aed"), children: "stream.opened" }) }),
                /* @__PURE__ */ e("td", { className: Me, children: "—" }),
                /* @__PURE__ */ e("td", { className: Me, children: "LLM stream connection established" })
              ] }),
              h?.firstTokenLatencyMs != null && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Me, children: /* @__PURE__ */ e("span", { className: At("#7c3aed"), children: "first.token" }) }),
                /* @__PURE__ */ o("td", { className: Me, children: [
                  "+",
                  h.firstTokenLatencyMs,
                  "ms"
                ] }),
                /* @__PURE__ */ e("td", { className: Me, children: "First token received from LLM" })
              ] }),
              n.completedAt && n.status === "completed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Me, children: /* @__PURE__ */ e("span", { className: At("#16a34a"), children: "completed" }) }),
                /* @__PURE__ */ e("td", { className: Me, children: new Date(n.completedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Me, children: [
                  "Finished in ",
                  n.durationMs != null ? n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` : "—"
                ] })
              ] }),
              n.status === "failed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Me, children: /* @__PURE__ */ e("span", { className: At("#dc2626"), children: "failed" }) }),
                /* @__PURE__ */ e("td", { className: Me, children: n.completedAt ? new Date(n.completedAt).toLocaleTimeString() : "—" }),
                /* @__PURE__ */ e("td", { className: Me, children: n.error ?? "Unknown error" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ e(Ze, { title: "Node Configuration", children: a && Object.keys(a).length > 1 ? /* @__PURE__ */ e("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(a).filter(([x]) => x !== "type").map(([x, f]) => /* @__PURE__ */ o(ko.Fragment, { children: [
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
          m && Object.keys(m).length > 0 && /* @__PURE__ */ e(Ze, { title: "Runtime Input", children: /* @__PURE__ */ e("pre", { className: ao, children: JSON.stringify(m, null, 2) }) }),
          h?.prompt && /* @__PURE__ */ e(Ze, { title: "Resolved Prompt", children: /* @__PURE__ */ e("div", { className: io, children: h.prompt }) }),
          u || h?.response ? /* @__PURE__ */ e(Ze, { title: "Response", children: /* @__PURE__ */ e("div", { className: io, children: u ?? h?.response }) }) : /* @__PURE__ */ e(Ze, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ e("pre", { className: ao, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
          (h || p?.tokensIn != null) && /* @__PURE__ */ e(Ze, { title: "Token Usage", children: /* @__PURE__ */ o("div", { className: "flex gap-5 flex-wrap text-xs text-text-secondary", children: [
            /* @__PURE__ */ o("span", { children: [
              "Tokens in: ",
              /* @__PURE__ */ e("strong", { children: String(h?.tokensIn ?? p?.tokensIn ?? "—") })
            ] }),
            /* @__PURE__ */ o("span", { children: [
              "Tokens out: ",
              /* @__PURE__ */ e("strong", { children: String(h?.tokensOut ?? p?.tokensOut ?? "—") })
            ] }),
            h?.firstTokenLatencyMs != null && /* @__PURE__ */ o("span", { children: [
              "First token: ",
              /* @__PURE__ */ o("strong", { children: [
                h.firstTokenLatencyMs,
                "ms"
              ] })
            ] })
          ] }) }),
          n.error && /* @__PURE__ */ e(Ze, { title: "Error", children: /* @__PURE__ */ e("div", { className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap", children: n.error }) }),
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
function Wu({ steps: t, nodeDataMap: n, edges: r, onRetryFromStep: i, onResumeFromStep: a }) {
  const s = z(() => {
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
    }, u = /* @__PURE__ */ new Set(["fork", "condition", "approval"]), h = /* @__PURE__ */ new Set();
    for (const [y] of l) {
      const k = p(y), C = n[k]?.type;
      C && u.has(C) && h.add(k);
    }
    const m = (y) => y.startsWith("branch-") || y === "true" || y === "false" || y === "approved" || y === "rejected", g = [];
    for (const y of r)
      h.has(y.source) && m(y.sourceHandle) && g.push({ forkId: y.source, branch: y.sourceHandle, targetNodeId: y.target });
    const x = /* @__PURE__ */ new Map();
    for (const y of r)
      x.has(y.source) || x.set(y.source, []), x.get(y.source).push({ target: y.target, handle: y.sourceHandle });
    const f = /* @__PURE__ */ new Set();
    function N(y) {
      const k = [];
      let C = y;
      for (; C; ) {
        const $ = l.find(([J]) => p(J) === C && !f.has(J));
        if (!$) break;
        const [A, D] = $;
        f.add(A);
        const O = { stepId: A, step: D, children: [] }, ne = p(A);
        if (h.has(ne)) {
          const J = g.filter((Y) => Y.forkId === ne);
          for (const { branch: Y, targetNodeId: H } of J) {
            const Q = N(H);
            for (const E of Q)
              E.branch = E.branch ?? Y;
            Q.length > 0 && (Q[0].branch = Y, O.children.push(...Q));
          }
        }
        k.push(O);
        const R = x.get(ne)?.filter((J) => J.handle === "out");
        C = R && R.length === 1 ? R[0].target : null;
      }
      return k;
    }
    const v = /* @__PURE__ */ new Set();
    for (const y of r)
      v.add(y.target);
    const b = l.find(([y]) => !v.has(p(y)))?.[1] ? l.find(([y]) => !v.has(p(y)))[0] : l[0]?.[0];
    let w = [];
    b && (w = N(p(b)));
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
    return l.map((h) => {
      const m = u++, g = /* @__PURE__ */ new Map();
      for (const x of h.children) {
        const f = x.branch ?? "default";
        g.has(f) || g.set(f, []), g.get(f).push(x);
      }
      return /* @__PURE__ */ o(ko.Fragment, { children: [
        /* @__PURE__ */ e(
          qu,
          {
            stepId: h.stepId,
            step: h.step,
            index: m,
            nodeType: d(h.stepId)?.type ?? "unknown",
            nodeConfig: d(h.stepId)?.data,
            onRetryFromStep: i,
            onResumeFromStep: a
          }
        ),
        h.children.length > 0 && /* @__PURE__ */ e("div", { className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1", children: Array.from(g.entries()).map(([x, f], N) => /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("div", { className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${N === 0 ? "mt-1" : "mt-2"}`, children: x.replace("-", " ") }),
          c(f, u)
        ] }, x)) })
      ] }, h.stepId);
    });
  }
  return /* @__PURE__ */ o("div", { className: "relative", children: [
    /* @__PURE__ */ e("div", { className: "absolute left-[15px] top-6 bottom-6 w-0.5 bg-border rounded-sm" }),
    c(s, 0)
  ] });
}
const Vu = 5e3, Ju = "synthetic-";
function Hu(t) {
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
function Kn(t, n) {
  return n.timestamp.localeCompare(t.timestamp);
}
function Ku(t, n) {
  if (n.length === 0) return t.slice().sort(Kn);
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
  return [...t, ...a].sort(Kn);
}
function Gu(t, n, r = {}) {
  const { pollMs: i = Vu, filters: a } = r, s = Ua(), [d, c] = S([]), [l, p] = S([]), [u, h] = S(!0), [m, g] = S(null), [x, f] = S(void 0), [N, v] = S(0), [b, w] = S(!1), y = JSON.stringify({
    since: a?.since,
    until: a?.until,
    actions: a?.actions,
    limit: a?.limit
  });
  re(() => {
    if (!t || !n) return;
    let D = !1;
    return h(!0), g(null), (async () => {
      try {
        const O = await lr(t, n, a ?? {});
        if (D) return;
        c(O.items), f(O.nextCursor), h(!1);
      } catch (O) {
        if (D) return;
        g(O instanceof Error ? O.message : String(O)), h(!1);
      }
    })(), () => {
      D = !0;
    };
  }, [t, n, y, N]), re(() => {
    if (!t || !n || i <= 0) return;
    const D = window.setInterval(() => {
      v((O) => O + 1);
    }, i);
    return () => window.clearInterval(D);
  }, [t, n, i]), re(() => {
    if (!t || !n) return;
    const D = [], O = (R, J) => {
      const Y = Hu(R);
      if (!Y) return;
      const H = J;
      if (H.runId !== n) return;
      w(!0);
      const Q = {
        auditId: `${Ju}${R}-${H.stepId ?? "run"}-${Date.now()}`,
        timestamp: H.at ?? (/* @__PURE__ */ new Date()).toISOString(),
        action: Y,
        actorUserId: "executor",
        pipelineId: t,
        runId: n,
        trace: J
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
      D.push(s.subscribe(R, (J) => O(R, J)));
    return D.push(s.subscribeToRun(n)), () => {
      for (const R of D) R();
    };
  }, [s, t, n]), re(() => {
    d.length !== 0 && p((D) => {
      if (D.length === 0) return D;
      const O = /* @__PURE__ */ new Map();
      for (const ne of d) {
        const R = O.get(ne.action);
        (!R || ne.timestamp > R) && O.set(ne.action, ne.timestamp);
      }
      return D.filter((ne) => {
        const R = O.get(ne.action);
        return !R || ne.timestamp >= R;
      });
    });
  }, [d]);
  const k = ce(!1), C = M(() => {
    !t || !n || !x || k.current || (k.current = !0, (async () => {
      try {
        const D = await lr(t, n, {
          ...a ?? {},
          cursor: x
        });
        c((O) => {
          const ne = new Set(O.map((J) => J.auditId)), R = O.concat(D.items.filter((J) => !ne.has(J.auditId)));
          return R.sort(Kn), R;
        }), f(D.nextCursor);
      } catch (D) {
        g(D instanceof Error ? D.message : String(D));
      } finally {
        k.current = !1;
      }
    })());
  }, [t, n, x, y]), $ = M(() => {
    v((D) => D + 1);
  }, []);
  return {
    items: z(() => Ku(d, l), [d, l]),
    loading: u,
    error: m,
    hasMore: !!x,
    loadMore: C,
    liveHealthy: b,
    refresh: $
  };
}
const Yu = "#3b82f6", Xu = "#eab308", Qu = "#f97316", so = "#64748b", Zu = "#ef4444", em = "#a855f7";
function tm(t) {
  return t.action === "pipeline.step.failed" || t.outcome === "error" ? Zu : t.action === "pipeline.run.resumed-from-step" || t.action.startsWith("pipeline.step.context.patched") ? em : t.action.startsWith("pipeline.approval.") ? Xu : t.action.startsWith("pipeline.breakpoint.") ? Qu : t.action.startsWith("pipeline.step.") ? Yu : (t.action.startsWith("pipeline.run."), so);
}
const nm = {
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
function rm(t) {
  if (t === "all") return null;
  const n = Date.now();
  return t === "1h" ? n - 3600 * 1e3 : n - 1440 * 60 * 1e3;
}
function co(t) {
  const n = t.details, r = t.trace, i = n && typeof n.stepId == "string" ? n.stepId : void 0, a = r && typeof r.stepId == "string" ? r.stepId : void 0, s = r && typeof r.nodeId == "string" ? r.nodeId : void 0;
  return i ?? a ?? s;
}
function om(t, n = Date.now()) {
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
function am({
  pipelineId: t,
  runId: n,
  onStepClick: r
}) {
  const i = Gu(t, n), { items: a, error: s, hasMore: d, loadMore: c, loading: l } = i, [p, u] = S(/* @__PURE__ */ new Set()), [h, m] = S(""), [g, x] = S("all"), [f, N] = S(/* @__PURE__ */ new Set()), v = M((C) => {
    u(($) => {
      const A = new Set($);
      return A.has(C) ? A.delete(C) : A.add(C), A;
    });
  }, []), b = M((C) => {
    N(($) => {
      const A = new Set($);
      return A.has(C) ? A.delete(C) : A.add(C), A;
    });
  }, []), w = z(() => {
    const C = rm(g), $ = h.trim().toLowerCase(), A = lo.filter((D) => p.has(D.label));
    return a.filter((D) => {
      if (A.length > 0 && !A.some((O) => O.matches(D.action)) || $ && !D.actorUserId.toLowerCase().includes($)) return !1;
      if (C !== null) {
        const O = Date.parse(D.timestamp);
        if (!Number.isFinite(O) || O < C) return !1;
      }
      return !0;
    });
  }, [a, p, h, g]), y = M(() => {
    if (typeof window > "u") return;
    const C = w.map((O) => JSON.stringify(O)).join(`
`) + (w.length > 0 ? `
` : ""), $ = new Blob([C], { type: "application/x-ndjson" }), A = URL.createObjectURL($), D = document.createElement("a");
    D.href = A, D.download = `executor-log-${n}.ndjson`, document.body.appendChild(D), D.click(), document.body.removeChild(D), URL.revokeObjectURL(A);
  }, [w, n]), k = M(
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
                onClick: () => v(C.label),
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
              value: h,
              onChange: (C) => m(C.target.value),
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
                children: nm[C]
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
            const $ = f.has(C.auditId), D = C.action.startsWith("pipeline.step.") ? co(C) : void 0;
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
                      style: { background: tm(C) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: C.timestamp,
                      children: om(C.timestamp)
                    }
                  ),
                  /* @__PURE__ */ e("span", { className: "text-text-secondary text-[11px] whitespace-nowrap", children: C.actorUserId }),
                  /* @__PURE__ */ o("span", { className: "text-text-primary flex items-baseline gap-1.5 flex-wrap", children: [
                    /* @__PURE__ */ e("code", { className: "font-mono text-[11px] bg-[#fafbfc] px-1.5 py-px rounded-[3px]", children: C.action }),
                    D && /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", "data-testid": "executor-log-stepid", children: [
                      "· ",
                      D.slice(0, 14),
                      D.length > 14 ? "…" : ""
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
                      onClick: (O) => O.stopPropagation(),
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
            _e,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => c(),
              children: "Load more"
            }
          ) }) : /* @__PURE__ */ e("span", {}),
          /* @__PURE__ */ e("span", { "data-testid": "executor-log-download", children: /* @__PURE__ */ e(
            _e,
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
function Vh() {
  const { pipelineId: t, runId: n } = xt();
  return !t || !n ? /* @__PURE__ */ e(bt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(Ro, { pipelineId: t, children: /* @__PURE__ */ e(ka, { children: /* @__PURE__ */ e(im, { pipelineId: t, runId: n }) }) });
}
function im({ pipelineId: t, runId: n }) {
  const r = je(), i = Le(), a = yt(), { definition: s } = i, [d, c] = S(null);
  re(() => {
    let j = !1;
    return import("./usePendingApprovals-78SaxJH0.js").then((le) => le.$).then(({ getPipelineRun: le }) => {
      le(t, n).then((we) => {
        !j && we && c(we);
      });
    }), () => {
      j = !0;
    };
  }, [t, n]);
  const l = z(() => {
    const j = a.runs[n], le = d;
    if (!j && !le) return;
    if (!j) return le ?? void 0;
    if (!le) return j;
    const we = Object.keys(j.steps).length, Be = Object.keys(le.steps).length;
    return we >= Be ? j : { ...le, status: j.status, currentStepIds: j.currentStepIds };
  }, [a.runs, n, d]);
  Ca(n);
  const p = Fu(l ?? null), u = z(() => {
    const j = {};
    if (!s) return j;
    for (const le of s.nodes)
      j[le.id] = { type: le.data.type, data: le.data };
    return j;
  }, [s]), [h, m] = S(!1), g = ce(null);
  gt(g, () => m(!1), h);
  const [x, f] = S("steps"), [N, v] = S(null), b = M((j) => {
    v(j), f("steps");
  }, []), [w, y] = S(null), [k, C] = S(null), [$, A] = S(!1), D = l?.status === "failed" ? l.error?.nodeId : void 0, O = M((j) => {
    if (!l) return;
    const le = Object.entries(l.steps).filter(([we, Be]) => we !== j && Be.status === "completed").map(([we]) => we);
    y({ nodeId: j, skippedNodes: le, snapshotInput: !1 }), C(null);
  }, [l]), ne = M(async () => {
    if (!(!w || !l)) {
      C(null), A(!0);
      try {
        const j = await Ao(
          t,
          l.id,
          w.nodeId,
          void 0,
          w.snapshotInput || void 0
        );
        y(null), r(`/pipelines/${t}/runs/${j.newRunId}`);
      } catch (j) {
        C(j instanceof Error ? j.message : String(j)), A(!1);
      }
    }
  }, [w, l, t, r]), [R, J] = S(null), [Y, H] = S(null), [Q, E] = S(null), T = M(async (j) => {
    if (l) {
      H(null), J(j);
      try {
        const le = await Ia(t, l.id, j);
        E(
          `Resumed from ${j.slice(0, 10)}${j.length > 10 ? "…" : ""} (replay #${le.replayAttempts})`
        ), setTimeout(() => E(null), 4e3), r(`/pipelines/${t}/runs/${l.id}`);
      } catch (le) {
        H(le instanceof Error ? le.message : String(le));
      } finally {
        J(null);
      }
    }
  }, [l, t, r]), K = M(async () => {
    if (!l) {
      try {
        const j = await a.triggerRun(t);
        r(`/pipelines/${t}/runs/${j}`);
      } catch (j) {
        console.error("[PipelineRunReplay] re-run failed", j);
      }
      return;
    }
    try {
      const j = await a.triggerRun(
        t,
        l.triggeredBy.payload
      );
      r(`/pipelines/${t}/runs/${j}`);
    } catch (j) {
      console.error("[PipelineRunReplay] re-run failed", j);
    }
  }, [l, a, t, r]), G = async () => {
    m(!1);
    try {
      await navigator.clipboard?.writeText(n);
    } catch {
    }
  }, U = () => {
    if (m(!1), !l) return;
    const j = JSON.stringify(l, null, 2);
    _t(`run-${n}.json`, j);
  }, q = () => {
    if (m(!1), !s) return;
    const j = Yn(
      s.id,
      `${s.name} (from run)`
    );
    j && r(`/pipelines/${j.id}`);
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
              ht,
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
              _e,
              {
                onClick: () => r(`/pipelines/${t}`),
                children: "Back to pipeline"
              }
            )
          ] })
        ]
      }
    );
  const W = or(l.status), X = l.triggeredBy.userId ?? l.triggeredBy.triggerType, pe = qt(p);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
      "data-testid": "pipeline-replay",
      children: [
        /* @__PURE__ */ o("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
          /* @__PURE__ */ e(
            ht,
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
                pe
              ]
            }
          ),
          /* @__PURE__ */ e(se, { tone: W.tone, "aria-label": `Status: ${W.label}`, children: W.label }),
          l.status === "failed" && l.error?.errorCategory ? /* @__PURE__ */ e(
            se,
            {
              tone: "danger",
              title: l.error.message || "Error details unavailable",
              children: l.error.errorCategory
            }
          ) : null,
          /* @__PURE__ */ e("div", { className: "flex-1" }),
          D && /* @__PURE__ */ e(
            _e,
            {
              onClick: () => O(D),
              disabled: $,
              "data-testid": "retry-from-failed-step-button",
              title: `Retry from "${D}" with the original upstream context`,
              children: "↻ Retry from failure"
            }
          ),
          /* @__PURE__ */ e(
            _e,
            {
              onClick: K,
              "data-testid": "rerun-button",
              title: "Re-run with the original trigger payload",
              children: "↻ Re-run"
            }
          ),
          /* @__PURE__ */ o("div", { className: "relative", ref: g, children: [
            /* @__PURE__ */ e(
              ht,
              {
                onClick: () => m((j) => !j),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            h ? /* @__PURE__ */ o("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: G, children: "Copy runId" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: U, children: "Export run JSON" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: q, children: "Open as new draft" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ e(
          an,
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
                /* @__PURE__ */ e("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: w.skippedNodes.map((j) => /* @__PURE__ */ e("span", { className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary", children: j.slice(0, 10) }, j)) })
              ] }),
              /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
                /* @__PURE__ */ e(
                  "input",
                  {
                    type: "checkbox",
                    checked: w.snapshotInput,
                    onChange: (j) => y((le) => le && { ...le, snapshotInput: j.target.checked }),
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
          k && /* @__PURE__ */ e(et, { title: "Retry failed:", className: "mb-4", children: k }),
          Y && /* @__PURE__ */ e(et, { title: "Resume failed:", className: "mb-4", "data-testid": "resume-error-banner", children: Y }),
          (l.replayAttempts ?? 0) > 0 && /* @__PURE__ */ e(
            et,
            {
              title: "Resumed from a previous failure",
              className: "mb-4",
              "data-testid": "resume-history-banner",
              children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ o("div", { children: [
                  l.error?.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o(V, { children: [
                    "Originally failed at ",
                    /* @__PURE__ */ e("code", { children: l.error.nodeId.slice(0, 12) }),
                    " — "
                  ] }),
                  "Resumed ",
                  l.replayAttempts,
                  " time",
                  l.replayAttempts === 1 ? "" : "s",
                  ".",
                  l.resumeHistory && l.resumeHistory.length > 0 && /* @__PURE__ */ o(V, { children: [
                    " ",
                    "Most recent: from",
                    " ",
                    /* @__PURE__ */ e("code", { children: l.resumeHistory[l.resumeHistory.length - 1].fromNodeId.slice(0, 12) }),
                    " ",
                    "at ",
                    ft(l.resumeHistory[l.resumeHistory.length - 1].at),
                    "."
                  ] })
                ] }),
                l.resumeHistory && l.resumeHistory.length > 1 && /* @__PURE__ */ e(
                  "ol",
                  {
                    className: "m-0 pl-[18px] text-[11px] text-text-tertiary leading-relaxed",
                    "data-testid": "resume-history-timeline",
                    children: l.resumeHistory.map((j, le) => /* @__PURE__ */ o("li", { children: [
                      "from ",
                      /* @__PURE__ */ e("code", { children: j.fromNodeId.slice(0, 12) }),
                      " at ",
                      ft(j.at)
                    ] }, `${j.fromNodeId}-${j.at}-${le}`))
                  }
                )
              ] })
            }
          ),
          Q && /* @__PURE__ */ e(et, { title: "Resumed", className: "mb-4", "data-testid": "resume-toast", children: Q }),
          l.error && /* @__PURE__ */ o(et, { title: "Run failed:", className: "mb-4", children: [
            l.error.message,
            l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o("span", { className: "ml-2 text-[11px] text-[#b91c1c]", children: [
              "at node ",
              l.error.nodeId.slice(0, 8)
            ] }),
            l.status === "failed" && l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ e("div", { className: "mt-2", children: /* @__PURE__ */ e(
              _e,
              {
                onClick: () => T(l.error.nodeId),
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
              ].map((j) => {
                const le = x === j.id;
                return /* @__PURE__ */ e(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": le,
                    onClick: () => f(j.id),
                    "data-testid": `run-replay-tab-${j.id}`,
                    className: I(
                      "font-[inherit] text-[13px] font-semibold py-1.5 px-3.5 border-none bg-transparent cursor-pointer -mb-px",
                      le ? "text-text-primary border-b-2 border-b-primary" : "text-text-tertiary border-b-2 border-b-transparent"
                    ),
                    children: j.label
                  },
                  j.id
                );
              })
            }
          ),
          x === "steps" ? (
            /* Threaded step list with fork nesting */
            /* @__PURE__ */ e(
              Wu,
              {
                steps: l.steps,
                nodeDataMap: u,
                edges: s?.edges,
                onRetryFromStep: O,
                onResumeFromStep: l.status === "failed" ? T : void 0
              }
            )
          ) : /* @__PURE__ */ e("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ e(
            am,
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
function sm(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${Se(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function lm(t) {
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
function cm(t, n) {
  if (!t) return n;
  const r = t.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function dm(t, n) {
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
function pm(t, n) {
  const r = (m) => m.split(/(\s+)/).filter((g) => g.length > 0), i = r(t), a = r(n), s = i.length, d = a.length, c = Array.from({ length: s + 1 }, () => new Array(d + 1).fill(0));
  for (let m = s - 1; m >= 0; m--)
    for (let g = d - 1; g >= 0; g--)
      i[m] === a[g] ? c[m][g] = c[m + 1][g + 1] + 1 : c[m][g] = Math.max(c[m + 1][g], c[m][g + 1]);
  const l = [], p = (m, g) => {
    const x = l[l.length - 1];
    x && x.type === m ? x.text += g : l.push({ type: m, text: g });
  };
  let u = 0, h = 0;
  for (; u < s && h < d; )
    i[u] === a[h] ? (p("eq", i[u]), u++, h++) : c[u + 1][h] >= c[u][h + 1] ? (p("del", i[u]), u++) : (p("add", a[h]), h++);
  for (; u < s; )
    p("del", i[u++]);
  for (; h < d; )
    p("add", a[h++]);
  return l;
}
function um(t, n, r) {
  const i = /* @__PURE__ */ new Set(), a = [];
  if (r)
    for (const s of r.nodes)
      (t.steps[s.id] || n.steps[s.id]) && (a.push(s.id), i.add(s.id));
  for (const s of [...Object.keys(t.steps), ...Object.keys(n.steps)])
    i.has(s) || (a.push(s), i.add(s));
  return a.map((s) => {
    const d = t.steps[s], c = n.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, h = !!d && !!c && d.status !== c.status;
    let m = !1;
    l != null && p != null && l > 0 && (m = Math.abs(p - l) / l > 0.5);
    const g = dm(r, s), x = g ? po(d) : void 0, f = g ? po(c) : void 0, N = g && x !== void 0 && f !== void 0 && x !== f;
    return {
      nodeId: s,
      name: cm(r, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: h,
      durationLarge: m,
      branchDiffers: N,
      isLlm: !!(d?.llm || c?.llm),
      isCondition: g,
      branchA: x,
      branchB: f
    };
  });
}
function mm(t) {
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
  const i = lm(t.status);
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(se, { tone: i, children: t.status }),
      /* @__PURE__ */ e("span", { className: "font-mono text-text-secondary", children: Se(t.durationMs) }),
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
function hm({ a: t, b: n }) {
  const r = z(() => pm(t, n), [t, n]);
  return /* @__PURE__ */ e(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: r.map((i, a) => i.type === "eq" ? /* @__PURE__ */ e("span", { children: i.text }, a) : i.type === "add" ? /* @__PURE__ */ e("span", { "data-diff": "add", className: "bg-[#dcfce7] text-[#166534]", children: i.text }, a) : /* @__PURE__ */ e("span", { "data-diff": "del", className: "bg-[#fee2e2] text-[#991b1b] line-through", children: i.text }, a))
    }
  );
}
function fm({ row: t }) {
  const n = t.a?.llm, r = t.b?.llm, i = n && r ? r.tokensIn + r.tokensOut - (n.tokensIn + n.tokensOut) : void 0, a = mm(t);
  return /* @__PURE__ */ o(V, { children: [
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
            t.branchDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#2563eb]", children: "different branch!" }) : t.statusDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#dc2626]", children: "status differs" }) : t.durationDelta != null ? /* @__PURE__ */ e("span", { className: t.durationLarge ? "text-[#d97706]" : "text-text-secondary", children: sm(t.durationDelta) }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "—" }),
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
          hm,
          {
            a: n?.response ?? "",
            b: r?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function gm({ runA: t, runB: n, def: r }) {
  const i = z(() => um(t, n, r), [t, n, r]);
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
        /* @__PURE__ */ e("tbody", { children: i.map((a) => /* @__PURE__ */ e(fm, { row: a }, a.nodeId)) })
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
function ym(t) {
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
  return qt(wt(r).total);
}
function ho({
  label: t,
  run: n,
  cost: r,
  testIdPrefix: i
}) {
  const a = bm(n.status);
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
          /* @__PURE__ */ e("span", { className: "text-text-secondary", children: ft(n.startedAt) })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(se, { tone: a, children: n.status }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", children: Se(n.durationMs) }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", "data-testid": `${i}-cost`, children: r })
        ] })
      ]
    }
  );
}
function Jh() {
  const { pipelineId: t, runIdA: n, runIdB: r } = xt(), i = je(), a = z(
    () => t ? at(t) : null,
    [t]
  ), s = z(
    () => t && n ? on(t, n) : null,
    [t, n]
  ), d = z(
    () => t && r ? on(t, r) : null,
    [t, r]
  ), c = z(() => ym(a), [a]);
  if (!t || !n || !r)
    return /* @__PURE__ */ e(bt, { to: "/pipelines", replace: !0 });
  if (!a)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      Fe,
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
      Fe,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable — they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => i(`/pipelines/${t}/runs`)
      }
    ) });
  const l = (d.durationMs ?? 0) - (s.durationMs ?? 0), p = mo(s, c), u = mo(d, c), h = (/* @__PURE__ */ new Set([
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
          /* @__PURE__ */ e("span", { className: "font-mono text-[13px]", children: xm(l) }),
          /* @__PURE__ */ e("span", { className: "flex-1" }),
          /* @__PURE__ */ o("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
            h,
            " step",
            h === 1 ? "" : "s",
            " compared"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e(gm, { runA: s, runB: d, def: a })
  ] });
}
function vm(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${Se(Math.abs(t))}`;
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
function Nm({
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
              /* @__PURE__ */ e(se, { tone: fo(t.status), children: t.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: ft(t.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              Se(t.durationMs),
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
              /* @__PURE__ */ e(se, { tone: fo(n.status), children: n.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: ft(n.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              Se(n.durationMs),
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
              children: vm(d)
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
function wm(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${Se(Math.abs(t))}`;
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
function km(t, n) {
  if (!t) return n;
  const r = t.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Cm(t, n, r) {
  const i = /* @__PURE__ */ new Set(), a = [];
  if (r)
    for (const s of r.nodes)
      (t.steps[s.id] || n.steps[s.id]) && (a.push(s.id), i.add(s.id));
  for (const s of [...Object.keys(t.steps), ...Object.keys(n.steps)])
    i.has(s) || (a.push(s), i.add(s));
  return a.map((s) => {
    const d = t.steps[s], c = n.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, h = !!d && !!c && d.status !== c.status, m = !!d && !c, g = !d && !!c, x = d?.llm ? d.llm.tokensIn + d.llm.tokensOut : void 0, f = c?.llm ? c.llm.tokensIn + c.llm.tokensOut : void 0, N = x != null && f != null ? f - x : void 0;
    return {
      nodeId: s,
      name: km(r, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: h,
      onlyInA: m,
      onlyInB: g,
      tokenDelta: N
    };
  });
}
function Im({ runA: t, runB: n, def: r }) {
  const i = z(() => Cm(t, n, r), [t, n, r]);
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
            a.onlyInA && /* @__PURE__ */ e(se, { tone: "warning", size: "xs", children: "only in A" }),
            a.onlyInB && /* @__PURE__ */ e(se, { tone: "warning", size: "xs", children: "only in B" })
          ] }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: a.a ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(se, { tone: go(a.a.status), children: a.a.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: Se(a.a.durationMs) }),
            a.a.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              a.a.llm.tokensIn,
              " in / ",
              a.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: a.b ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(se, { tone: go(a.b.status), children: a.b.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: Se(a.b.durationMs) }),
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
                children: wm(a.durationDelta)
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
function Sm(t, n) {
  if (!t) return n;
  const r = t.nodes.find((i) => i.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function sn(t, n = "", r = 0) {
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
        for (const [c, l] of sn(t[s], d, r + 1))
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
      for (const [l, p] of sn(d, c, r + 1))
        i.set(l, p);
    }
  return i;
}
function ta(t, n) {
  const r = sn(t), i = sn(n), a = /* @__PURE__ */ new Set([...r.keys(), ...i.keys()]), s = [];
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
const $m = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function Tm({
  nodeId: t,
  name: n,
  outputA: r,
  outputB: i
}) {
  const [a, s] = S(!1), d = z(() => ta(r, i), [r, i]), c = d.filter((l) => l.type !== "unchanged").length;
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
              /* @__PURE__ */ o(se, { tone: "warning", size: "xs", className: "ml-auto", children: [
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
              $m[l.type]
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
function Rm({ runA: t, runB: n, def: r }) {
  const i = z(() => {
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
    Tm,
    {
      nodeId: a,
      name: Sm(r, a),
      outputA: t.steps[a]?.output,
      outputB: n.steps[a]?.output
    },
    a
  )) });
}
function Pm(t) {
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
  return qt(wt(r).total);
}
function tn({
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
              r && /* @__PURE__ */ e(se, { tone: "info", className: "ml-auto", children: r })
            ]
          }
        ),
        s && /* @__PURE__ */ e("div", { className: "p-4", children: i })
      ]
    }
  );
}
const Am = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function Dm({
  runA: t,
  runB: n
}) {
  const r = z(
    () => ta(t.context, n.context),
    [t.context, n.context]
  ), i = r.filter((a) => a.type !== "unchanged").length;
  return /* @__PURE__ */ e(
    tn,
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
            Am[a.type]
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
function Mm({ pipelineId: t, runIdA: n, runIdB: r }) {
  const i = je(), a = z(
    () => at(t),
    [t]
  ), s = z(
    () => on(t, n),
    [t, n]
  ), d = z(
    () => on(t, r),
    [t, r]
  ), c = z(() => Pm(a), [a]);
  if (!a)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      Fe,
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
      Fe,
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
        /* @__PURE__ */ e(tn, { title: "Summary", testId: "diff-summary-section", children: /* @__PURE__ */ e(
          Nm,
          {
            runA: s,
            runB: d,
            costA: l,
            costB: p
          }
        ) }),
        /* @__PURE__ */ e(
          tn,
          {
            title: "Step-by-step comparison",
            badge: `${Object.keys(s.steps).length + Object.keys(d.steps).length > 0 ? "steps" : "0 steps"}`,
            testId: "diff-steps-section",
            children: /* @__PURE__ */ e(Im, { runA: s, runB: d, def: a })
          }
        ),
        /* @__PURE__ */ e(
          tn,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ e(Rm, { runA: s, runB: d, def: a })
          }
        ),
        /* @__PURE__ */ e(Dm, { runA: s, runB: d })
      ]
    }
  );
}
function Hh() {
  const { pipelineId: t } = xt(), [n] = ln(), r = n.get("a"), i = n.get("b");
  return !t || !r || !i ? /* @__PURE__ */ e(bt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(Mm, { pipelineId: t, runIdA: r, runIdB: i });
}
function Kh() {
  const t = je(), [n, r] = ln(), [i, a] = S([]), { runs: s } = yt();
  re(() => {
    let b = !1;
    return (async () => {
      const w = cr(), y = [];
      await Promise.all(
        w.map(async (k) => {
          try {
            const { runs: C } = await To(k.id, { limit: 50 });
            if (C.length > 0) {
              for (const $ of C)
                $.id && y.push({ ...$, pipelineName: k.name });
              return;
            }
          } catch {
          }
          for (const C of rn(k.id))
            C.id && y.push({ ...C, pipelineName: k.name });
        })
      ), !b && (y.sort((k, C) => C.startedAt.localeCompare(k.startedAt)), a(y));
    })(), () => {
      b = !0;
    };
  }, []);
  const d = z(() => {
    const b = new Map(cr().map((k) => [k.id, k.name])), w = new Set(i.map((k) => k.id)), y = [];
    for (const [k, C] of Object.entries(s))
      w.has(k) || C.pipelineId && y.push({
        ...C,
        pipelineName: b.get(C.pipelineId) ?? `Pipeline ${C.pipelineId.slice(0, 8)}`
      });
    return y.length === 0 ? i : [...y, ...i].sort((k, C) => C.startedAt.localeCompare(k.startedAt));
  }, [i, s]), { query: c, statuses: l, triggerKinds: p, range: u } = z(
    () => Zo(n),
    [n]
  ), h = (b, w) => {
    const y = new URLSearchParams(n);
    w ? y.set(b, w) : y.delete(b), r(y, { replace: !0 });
  }, m = (b) => {
    const w = new Set(l);
    w.has(b) ? w.delete(b) : w.add(b), h("status", w.size === 0 ? null : Array.from(w).join(","));
  }, g = (b) => {
    const w = new Set(p);
    w.has(b) ? w.delete(b) : w.add(b), h("trigger", w.size === 0 ? null : Array.from(w).join(","));
  }, x = (b) => {
    h("range", b === "7d" ? null : b);
  }, f = (b) => {
    h("q", b.length === 0 ? null : b);
  }, N = z(
    () => Qo(d, { query: c, statuses: l, triggerKinds: p, range: u }),
    [d, c, l, p, u]
  ), v = z(() => {
    const b = {};
    for (const w of N) {
      const y = Object.values(w.steps).filter((C) => !!C.llm).map((C) => ({
        model: void 0,
        tokensIn: C.llm?.tokensIn ?? 0,
        tokensOut: C.llm?.tokensOut ?? 0
      })), k = wt(y);
      k.total.totalCostUsd > 0 && (b[w.id] = qt(k.total));
    }
    return b;
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
      ea,
      {
        query: c,
        onQueryChange: f,
        statuses: l,
        onStatusToggle: m,
        triggerKinds: p,
        onTriggerToggle: g,
        range: u,
        onRangeChange: x,
        onClearFilters: () => r(new URLSearchParams(), { replace: !0 })
      }
    ),
    N.length === 0 ? /* @__PURE__ */ e(
      Fe,
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
      /* @__PURE__ */ e("tbody", { children: N.map((b) => /* @__PURE__ */ o(
        "tr",
        {
          onClick: () => t(`/pipelines/${b.pipelineId}/runs/${b.id}`),
          className: "border-b border-border cursor-pointer hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-medium", children: b.pipelineName }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: b.id.slice(0, 11) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ e(se, { tone: or(b.status).tone, size: "sm", children: b.status }) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: b.triggerType ?? b.triggeredBy?.triggerType }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: Ip(b.startedAt) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: b.completedAt ? Se(new Date(b.completedAt).getTime() - new Date(b.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: v[b.id] ?? "—" })
          ]
        },
        b.id
      )) })
    ] }) })
  ] });
}
function na(t) {
  let n = 0, r = 0;
  for (const i of Object.values(t.steps ?? {}))
    i.llm && (n += i.llm.tokensIn ?? 0, r += i.llm.tokensOut ?? 0);
  return { tokensIn: n, tokensOut: r };
}
function Om(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Em(t, n) {
  const r = [];
  for (const i of Object.values(t.steps ?? {}))
    i.llm && r.push({
      model: n.get(i.nodeId),
      tokensIn: i.llm.tokensIn,
      tokensOut: i.llm.tokensOut
    });
  return wt(r).total.totalCostUsd;
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
function _m(t) {
  return t.slice(0, 8);
}
function Lm(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Bm(t, n) {
  const r = t.length;
  let i = 0, a = 0, s = 0;
  const d = [];
  let c = 0, l = 0, p = 0;
  const u = /* @__PURE__ */ new Map();
  for (const f of t) {
    f.status === "completed" ? i++ : f.status === "failed" ? a++ : f.status === "cancelled" && s++, typeof f.durationMs == "number" && f.durationMs > 0 && d.push(f.durationMs);
    const N = na(f);
    if (c += N.tokensIn, l += N.tokensOut, p += Em(f, n), f.error?.message) {
      const v = f.error.message.slice(0, 48), b = u.get(v);
      b ? (b.count += 1, f.startedAt > b.lastSeenAt && (b.lastSeenAt = f.startedAt, b.exampleRunId = f.id)) : u.set(v, { count: 1, lastSeenAt: f.startedAt, exampleRunId: f.id });
    }
  }
  d.sort((f, N) => f - N);
  const h = bo(d, 0.5), m = bo(d, 0.95), g = r === 0 ? 0 : Math.round(i / r * 100), x = [...u.entries()].map(([f, N]) => ({ key: f, count: N.count, lastSeenAt: N.lastSeenAt, exampleRunId: N.exampleRunId })).sort((f, N) => N.count - f.count).slice(0, 5);
  return {
    totalCount: r,
    completedCount: i,
    failedCount: a,
    cancelledCount: s,
    successRatePct: g,
    medianMs: h,
    p95Ms: m,
    tokensIn: c,
    tokensOut: l,
    tokensPerRun: r === 0 ? 0 : Math.round((c + l) / r),
    totalCost: p,
    costPerRun: r === 0 ? 0 : p / r,
    failureBreakdown: x
  };
}
function Um(t) {
  return t >= 90 ? "#16a34a" : t >= 70 ? "#f59e0b" : "#dc2626";
}
function Fm(t) {
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
function jm(t, n) {
  const i = [...t].sort((s, d) => s.startedAt.localeCompare(d.startedAt)).filter((s) => typeof s.durationMs == "number" && s.durationMs > 0).map((s) => ({ x: new Date(s.startedAt).getTime(), y: s.durationMs })), a = i.map((s) => ({ x: s.x, y: n }));
  return [
    { label: "Duration (ms)", data: i, color: "#646cff" },
    { label: "p50", data: a, color: "#94a3b8" }
  ];
}
function zm(t) {
  const n = [...t].sort((a, s) => a.startedAt.localeCompare(s.startedAt)), r = [], i = [];
  for (const a of n) {
    const s = new Date(a.startedAt).getTime(), { tokensIn: d, tokensOut: c } = na(a);
    r.push({ x: s, y: d }), i.push({ x: s, y: c });
  }
  return [
    { label: "Tokens in", data: r, color: "#646cff" },
    { label: "Tokens out", data: i, color: "#16a34a" }
  ];
}
function Gh() {
  const { pipelineId: t } = xt(), n = je(), [r, i] = S(null), [a, s] = S([]), [d, c] = S("50");
  re(() => {
    t && (i(at(t)), s(rn(t)));
  }, [t]);
  const l = z(() => {
    if (d === "all") return a;
    const f = Number(d);
    return a.slice(0, f);
  }, [a, d]), p = z(() => Om(r), [r]), u = z(() => Bm(l, p), [l, p]), h = z(
    () => Iu(l, r).filter((f) => f.totalCostUsd > 0 || f.stepCount > 0),
    [l, r]
  ), m = z(() => Tu(a, r, 30), [a, r]), g = z(
    () => [
      {
        label: "Daily spend",
        data: m.map((f) => ({ x: f.ts, y: f.totalCostUsd })),
        color: "#646cff"
      }
    ],
    [m]
  );
  if (!t) return /* @__PURE__ */ e(bt, { to: "/pipelines", replace: !0 });
  if (!r)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      Fe,
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
    x ? /* @__PURE__ */ o(V, { children: [
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
                  style: { color: Um(u.successRatePct) },
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
              h.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary py-2", children: "No per-node cost data in this range." }) : /* @__PURE__ */ e(
                ja,
                {
                  data: h.map((f) => ({
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
                Vt,
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
            Vt,
            {
              series: Fm(l),
              height: 180,
              xFormat: (f) => new Date(Number(f)).toLocaleDateString()
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Duration over time" }),
          /* @__PURE__ */ e(
            Vt,
            {
              series: jm(l, u.medianMs),
              height: 180,
              xFormat: (f) => new Date(Number(f)).toLocaleDateString(),
              yFormat: (f) => Se(f)
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Token usage over time" }),
          /* @__PURE__ */ e(
            Vt,
            {
              series: zm(l),
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
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5 text-text-secondary", children: Lm(f.lastSeenAt) }),
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => n(`/pipelines/${t}/runs/${f.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    _m(f.exampleRunId),
                    " →"
                  ]
                }
              ) })
            ] }, f.key)) })
          ] })
        ] })
      ] })
    ] }) : /* @__PURE__ */ e(
      Fe,
      {
        icon: "📊",
        title: "No runs yet",
        body: "No runs yet. Trigger this pipeline to see stats."
      }
    )
  ] });
}
function qm(t) {
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
function Wm(t) {
  return t.length <= 6 ? t : t.slice(-6);
}
function Vm({ approver: t, idx: n }) {
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
function Jm(t, n) {
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
function Hm({ row: t, onSubmit: n, onOpenPipeline: r }) {
  const [i, a] = S(""), s = M(
    (p) => {
      n(p, i.trim()), a("");
    },
    [i, n]
  ), d = t.requiredCount ?? 1, c = t.recordedCount ?? 0, l = z(() => Jm(t.runContext, t.runSteps), [t.runContext, t.runSteps]);
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
            Wm(t.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: qm(t.requestedAt) })
    ] }),
    t.message ? /* @__PURE__ */ e("div", { "data-testid": `approval-message-${t.runId}`, className: "text-[13px] text-text-secondary bg-[#fafbfc] px-3 py-2 rounded-md leading-normal", children: t.message }) : null,
    /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5 px-3 py-2.5 bg-[#fafbfc] rounded-md border border-border", children: [
      /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: l.length > 0 ? "Context" : "Run details" }),
      l.length > 0 ? l.map(({ label: p, value: u }) => /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-medium text-text-secondary", children: p }),
        /* @__PURE__ */ e("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: u })
      ] }, p)) : /* @__PURE__ */ o(V, { children: [
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
      t.approvers.length === 0 ? /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : t.approvers.map((p, u) => /* @__PURE__ */ e(Vm, { approver: p, idx: u }, u)),
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
function Yh() {
  const t = je(), { approvals: n, isLoading: r, error: i, retry: a } = Sa(), { resolveApproval: s, runs: d } = yt(), [c, l] = S(
    () => /* @__PURE__ */ new Set()
  );
  re(() => {
    if (c.size === 0) return;
    const f = new Set(n.map((b) => `${b.runId}::${b.stepId}`));
    let N = !1;
    const v = new Set(c);
    for (const b of c)
      f.has(b) || (v.delete(b), N = !0);
    N && l(v);
  }, [n, c]);
  const [p, u] = S({}), h = ce(/* @__PURE__ */ new Set());
  re(() => {
    for (const f of n)
      h.current.has(f.runId) || (h.current.add(f.runId), $a(f.pipelineId, f.runId).then((N) => {
        N && u((v) => ({
          ...v,
          [f.runId]: { context: N.context, steps: N.steps }
        }));
      }));
  }, [n]);
  const m = z(() => {
    const f = /* @__PURE__ */ new Map(), N = [];
    for (const v of n) {
      const b = `${v.runId}::${v.stepId}`;
      if (c.has(b)) continue;
      let w = f.get(v.pipelineId);
      w === void 0 && (w = at(v.pipelineId), f.set(v.pipelineId, w));
      const y = w?.name ?? (v.pipelineId ? `Pipeline ${v.pipelineId.slice(0, 8)}` : "Unknown pipeline"), k = p[v.runId]?.context ?? d[v.runId]?.context, C = p[v.runId]?.steps;
      N.push({ ...v, pipelineName: y, runContext: k, runSteps: C });
    }
    return N;
  }, [n, c, d, p]), g = M(
    (f, N, v, b, w) => {
      s(N, v, b, w || void 0), l((y) => {
        const k = new Set(y);
        return k.add(`${N}::${v}`), k;
      }), fetch(`/api/pipelines/${encodeURIComponent(N)}/approvals`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: v, decision: b, ...w ? { comment: w } : {} })
      }).catch((y) => {
        console.error("[approvals] POST failed", y);
      }), t(`/pipelines/${f}/runs/${N}`);
    },
    [s, t]
  ), x = m.length;
  return /* @__PURE__ */ o("div", { "data-testid": "pending-approvals-page", className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-[inherit]", children: [
    /* @__PURE__ */ e("div", { className: "h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]", children: /* @__PURE__ */ o("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "text-lg font-bold text-text-primary", children: "Pending approvals" }),
      /* @__PURE__ */ e(se, { "data-testid": "pending-count", tone: x > 0 ? "warning" : "neutral", size: "sm", children: x })
    ] }) }),
    /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto p-5", children: [
      i ? /* @__PURE__ */ o("div", { "data-testid": "approvals-error", role: "alert", className: "px-4 py-3 bg-[#fef2f2] border border-[#dc2626] text-[#dc2626] rounded-lg flex items-center justify-between gap-3 mb-4", children: [
        /* @__PURE__ */ e("span", { className: "text-[13px] font-medium", children: "Couldn't load pending approvals. Try again." }),
        /* @__PURE__ */ e("button", { "data-testid": "approvals-retry", onClick: a, className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[#dc2626] border border-[#dc2626] rounded-md cursor-pointer font-[inherit]", children: "Retry" })
      ] }) : null,
      r && x === 0 ? /* @__PURE__ */ o("div", { "data-testid": "approvals-loading", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: [
        /* @__PURE__ */ e(mn, { height: 140 }),
        /* @__PURE__ */ e(mn, { height: 140 }),
        /* @__PURE__ */ e(mn, { height: 140 })
      ] }) : x === 0 && !i ? /* @__PURE__ */ e(
        Fe,
        {
          icon: "✋",
          title: "No pending approvals",
          body: "When a pipeline reaches an approval step, it'll show up here.",
          testId: "approvals-empty"
        }
      ) : /* @__PURE__ */ e("div", { "data-testid": "approvals-list", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: m.map((f) => /* @__PURE__ */ e(
        Hm,
        {
          row: f,
          onOpenPipeline: () => t(`/pipelines/${f.pipelineId}`),
          onSubmit: (N, v) => g(f.pipelineId, f.runId, f.stepId, N, v)
        },
        `${f.runId}:${f.stepId}`
      )) })
    ] })
  ] });
}
function Xh({ data: t, onChange: n }) {
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
        Ft,
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
        Ft,
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
const Km = [
  "{{scatter.item.label}}",
  "{{scatter.index}}",
  "{{scatter.parentImageId}}"
];
function No({
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
function Qh({ data: t, onChange: n, nodeId: r }) {
  const i = $e(r ?? null);
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
        Ft,
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
        No,
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
        Ft,
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
          No,
          {
            samples: Km,
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
function Zh({
  status: t,
  result: n,
  runId: r,
  endpointLabel: i,
  error: a,
  latencyMs: s,
  onOpen: d,
  className: c
}) {
  const l = i ?? n?.model?.endpointId ?? "vision-model", p = s ?? n?.model?.latencyMs, u = n?.caption, h = (n?.tags ?? []).slice(0, 5), m = /* @__PURE__ */ o(V, { children: [
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
      r ? /* @__PURE__ */ e("span", { className: "ml-auto truncate font-mono text-[10px] text-text-tertiary", children: r }) : null
    ] }),
    t === "failed" && a ? /* @__PURE__ */ e("p", { className: "text-[13px] text-danger-fg", children: a }) : /* @__PURE__ */ e("p", { className: "line-clamp-2 text-left text-[13px] text-text-primary", children: u ?? (t === "running" ? "Analyzing image…" : "No caption produced.") }),
    h.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: h.map((x) => /* @__PURE__ */ o(se, { tone: "neutral", size: "sm", children: [
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
        children: m
      }
    );
  }
  return /* @__PURE__ */ e("article", { className: I(g, c), children: m });
}
function ef(t = {}) {
  const { maxRecords: n = 50, runId: r } = t, [i, a] = S([]), s = ce(/* @__PURE__ */ new Map()), d = ce(!0);
  return re(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Ee("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.image.vision.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const h = `${u.runId}::${u.stepId}`;
    a((m) => {
      const g = s.current.get(h), x = typeof u.at == "number" ? u.at : Date.now(), f = (N) => {
        if (typeof g == "number" && g >= 0 && g < m.length) {
          const w = m.slice();
          return w[g] = { ...m[g], ...N }, w;
        }
        const v = [N, ...m];
        v.length > n && (v.length = n);
        const b = /* @__PURE__ */ new Map();
        return v.forEach((w, y) => b.set(`${w.runId}::${w.stepId}`, y)), s.current = b, v;
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
        const N = typeof g == "number" ? m[g] : void 0;
        return f({
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
        const N = typeof g == "number" ? m[g] : void 0;
        return f({
          runId: u.runId,
          stepId: u.stepId,
          status: "failed",
          error: u.error,
          completedAt: x,
          elapsedMs: N?.startedAt ? x - N.startedAt : void 0
        });
      }
      return m;
    });
  }), z(() => i, [i]);
}
function Gm(t) {
  return t === "pass" ? "success" : t === "fail" ? "danger" : "warning";
}
function Ym({ result: t, className: n }) {
  const r = Gm(t.overallVerdict), i = r === "success" ? "PASS" : r === "danger" ? "FAIL" : "INCONCLUSIVE", a = t.rubricSnapshot.passThreshold ?? 0.5;
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
          /* @__PURE__ */ o(se, { tone: r, size: "sm", children: [
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
            Zn,
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
function Xm({ result: t, className: n }) {
  if (!t.criteria || t.criteria.length === 0) return null;
  const r = /* @__PURE__ */ new Map();
  for (const i of t.rubricSnapshot.criteria) r.set(i.id, i);
  return /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", n), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Criteria (",
      t.criteria.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1.5", children: t.criteria.map((i) => /* @__PURE__ */ e(Qm, { score: i, def: r.get(i.criterionId) }, i.criterionId)) })
  ] });
}
function Qm({
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
      /* @__PURE__ */ e(se, { tone: r, size: "sm", children: i }),
      /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
        "raw: ",
        String(t.rawScore)
      ] })
    ] }),
    /* @__PURE__ */ e(
      Zn,
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
const ra = la(null);
function tf({ value: t, children: n }) {
  return /* @__PURE__ */ e(ra.Provider, { value: t, children: n });
}
function oa() {
  return Co(ra);
}
function nf({
  result: t,
  showVerdict: n = !0,
  showCriteria: r = !0,
  showMetadata: i = !0,
  showRawText: a = !1,
  className: s
}) {
  const d = oa(), [c, l] = S(!1), [p, u] = S(null), [h, m] = S(!1), [g, x] = S(null), f = ce(!0);
  re(() => (f.current = !0, () => {
    f.current = !1;
  }), []), re(() => {
    c && (t.rawModelText || p === null && (h || t.rawTextTruncated && d && (m(!0), (async () => {
      try {
        const b = await d.fetchRawText(t.judgmentId);
        if (!f.current) return;
        u(b ?? ""), x(null);
      } catch (b) {
        if (!f.current) return;
        x(b instanceof Error ? b : new Error(String(b)));
      } finally {
        f.current && m(!1);
      }
    })())));
  }, [c, t.rawModelText, t.rawTextTruncated, t.judgmentId, d, p, h]);
  const N = t.rawModelText ?? p ?? null, v = !!t.rawModelText || !!t.rawTextTruncated;
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-3 text-text-primary", s), children: [
    n ? /* @__PURE__ */ e(Ym, { result: t }) : null,
    r ? /* @__PURE__ */ e(Xm, { result: t }) : null,
    i ? /* @__PURE__ */ o("section", { className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
      /* @__PURE__ */ o("span", { children: [
        "tokens ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: t.tokensIn }),
        " in /",
        " ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: t.tokensOut }),
        " out"
      ] }),
      t.cacheReadTokens && t.cacheReadTokens > 0 ? /* @__PURE__ */ o(V, { children: [
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
    a && v ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
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
        Zm,
        {
          text: N,
          loading: h,
          error: g,
          fallbackHint: t.rawTextTruncated && !d ? "Raw text was spilled to S3 but no JudgmentApi provider is wired." : null
        }
      ) : null
    ] }) : null
  ] });
}
function Zm({
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
function rf({ aggregate: t, className: n }) {
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
          /* @__PURE__ */ o(se, { tone: a, size: "sm", children: [
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
            Zn,
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
          typeof t.minOverallScore == "number" && typeof t.maxOverallScore == "number" ? /* @__PURE__ */ o(V, { children: [
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
function of({
  aggregates: t,
  sortOrder: n = "desc",
  caption: r,
  loading: i = !1,
  className: a
}) {
  const s = z(() => {
    const h = t.slice();
    return h.sort((m, g) => m.dayBucket.localeCompare(g.dayBucket)), n === "desc" && h.reverse(), h;
  }, [t, n]), d = z(() => t.slice().sort((m, g) => m.dayBucket.localeCompare(g.dayBucket)).map((m) => m.numJudgments > 0 ? m.numPassed / m.numJudgments : 0), [t]);
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
  const c = t.reduce((h, m) => h + m.numJudgments, 0), l = t.reduce((h, m) => h + m.numPassed, 0), p = t.reduce((h, m) => h + m.sumCostUsd, 0), u = c > 0 ? l / c : 0;
  return /* @__PURE__ */ o("section", { className: I("flex w-full flex-col gap-2", a), children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: r ?? `Judgment trend — ${t.length} days` }),
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
        Ba,
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
      /* @__PURE__ */ e("tbody", { children: s.map((h) => /* @__PURE__ */ e(eh, { row: h }, h.aggregateKey)) })
    ] })
  ] });
}
function eh({ row: t }) {
  const n = t.numJudgments > 0 ? t.numPassed / t.numJudgments : 0, r = t.numJudgments > 0 ? t.sumOverallScore / t.numJudgments : 0, i = n >= 0.9 ? "success" : n >= 0.6 ? "warning" : "danger";
  return /* @__PURE__ */ o("tr", { className: "border-t border-border", children: [
    /* @__PURE__ */ e("td", { className: "py-1 pr-2 font-mono", children: t.dayBucket }),
    /* @__PURE__ */ e("td", { className: "py-1 pr-2", children: /* @__PURE__ */ o(se, { tone: i, size: "sm", children: [
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
function th(t) {
  if (typeof t == "number") return t;
  if (typeof t == "string") {
    const n = Date.parse(t);
    if (Number.isFinite(n)) return n;
  }
  return Date.now();
}
function af(t = {}) {
  const { maxRecords: n = 50, runId: r } = t, [i, a] = S([]), s = ce(/* @__PURE__ */ new Map()), d = ce(!0);
  return re(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Ee("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.judge.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const h = `${u.runId}::${u.stepId}`;
    a((m) => {
      const g = s.current.get(h), x = th(u.at), f = (N) => {
        if (typeof g == "number" && g >= 0 && g < m.length) {
          const w = m.slice();
          return w[g] = { ...m[g], ...N }, w;
        }
        const v = [N, ...m];
        v.length > n && (v.length = n);
        const b = /* @__PURE__ */ new Map();
        return v.forEach((w, y) => b.set(`${w.runId}::${w.stepId}`, y)), s.current = b, v;
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
        const N = typeof g == "number" ? m[g] : void 0;
        return f({
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
        const N = typeof g == "number" ? m[g] : void 0;
        return f({
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
        const N = typeof g == "number" ? m[g] : void 0;
        return f({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? N?.pipelineId,
          status: "budget-exceeded",
          completedAt: x
        });
      }
      return m;
    });
  }), z(() => i, [i]);
}
function sf(t) {
  const n = oa(), [r, i] = S([]), [a, s] = S(!1), [d, c] = S(null), l = ce(!0), p = ce(() => {
  }), { pipelineId: u, rubricId: h, since: m, until: g, limit: x, refreshIntervalMs: f = 0, paused: N = !1 } = t, v = `${u ?? ""}|${h ?? ""}|${m ?? ""}|${g ?? ""}|${x ?? ""}|${N ? "1" : "0"}`;
  return re(() => (l.current = !0, () => {
    l.current = !1;
  }), []), re(() => {
    if (!n) {
      i([]), s(!1), c(null);
      return;
    }
    if (N) return;
    if (!u && !h) {
      c(new Error("useJudgmentAggregates: one of pipelineId or rubricId is required")), s(!1);
      return;
    }
    let b = !1;
    const w = async () => {
      s(!0);
      try {
        const y = await n.fetchAggregates({
          ...u ? { pipelineId: u } : {},
          ...h ? { rubricId: h } : {},
          ...m ? { since: m } : {},
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
  }, [n, v, f]), {
    aggregates: r,
    loading: a,
    error: d,
    reload: () => p.current()
  };
}
const nh = 100, rh = 500, aa = 148, ia = 116, oh = 56, ah = 20;
function ih(t) {
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
      const h = r.get(u) ?? -1;
      p + 1 > h && (r.set(u, p + 1), a.push(u));
    }
  }
  const d = /* @__PURE__ */ new Map();
  for (const [l, p] of r.entries()) {
    const u = d.get(p) ?? [];
    u.push(l), d.set(p, u);
  }
  const c = /* @__PURE__ */ new Map();
  for (const [l, p] of d.entries()) {
    const u = l * (aa + oh);
    p.forEach((h, m) => {
      c.set(h, {
        x: u,
        y: m * (ia + ah)
      });
    });
  }
  return c;
}
function sh(t, n) {
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
function lh({ src: t, alt: n, testId: r }) {
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
function ch({ data: t }) {
  const { entry: n, highlighted: r, selected: i, onSelect: a, getImageUrl: s } = t, d = n.width && n.height ? `${n.width}×${n.height}` : "", c = n.producedByNodeKind;
  return /* @__PURE__ */ o(V, { children: [
    /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: "w-2 h-2 bg-border-emphasis" }),
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
            lh,
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
    /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: "w-2 h-2 bg-border-emphasis" })
  ] });
}
const dh = { lineageNode: ch };
function ph() {
  return /* @__PURE__ */ e(
    "div",
    {
      className: "flex items-center justify-center h-full text-text-tertiary text-sm",
      "data-testid": "lineage-graph-empty",
      children: "No image artifacts produced by this run."
    }
  );
}
function uh(t, n) {
  if (t.length <= n) return t;
  const r = t.map((i, a) => ({ e: i, i: a }));
  return r.sort((i, a) => {
    const s = Date.parse(i.e.at), d = Date.parse(a.e.at);
    return d !== s ? d - s : a.i - i.i;
  }), r.slice(0, n).map((i) => i.e);
}
function _n(t) {
  return t.length > 10 ? `${t.slice(0, 8)}…` : t;
}
function mh({
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
    const u = (h) => {
      if (h.key !== "ArrowRight" && h.key !== "ArrowLeft" || t.length === 0) return;
      const m = t.findIndex((f) => f.imageId === n);
      if (m === -1) return;
      const g = t.length, x = h.key === "ArrowRight" ? (m + 1) % g : (m - 1 + g) % g;
      h.preventDefault(), i(t[x].imageId);
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [n, t, i]);
  const l = M(() => {
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
    Ke,
    {
      open: !0,
      onClose: r,
      title: `Artifact ${_n(s.imageId)}`,
      maxWidth: 760,
      rawChildren: !0,
      backdropTestId: "lineage-preview-backdrop",
      footer: /* @__PURE__ */ e(
        _e,
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
                  /* @__PURE__ */ o(se, { tone: "neutral", size: "sm", mono: !0, title: s.imageId, children: [
                    "id: ",
                    _n(s.imageId)
                  ] }),
                  /* @__PURE__ */ e(
                    ht,
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
                    _n(s.producedByStepId)
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
function lf({
  entries: t,
  selectedImageId: n,
  onSelect: r,
  maxRenderedNodes: i = nh
}) {
  const a = Te(), [s, d] = S(!1), [c, l] = S(!1), [p, u] = S(null), h = t.length, m = !s && h > i, g = z(
    () => m ? uh(t, i) : t,
    [t, m, i]
  ), x = z(
    () => n ? sh(n, g) : /* @__PURE__ */ new Set(),
    [n, g]
  ), f = z(() => ih(g), [g]), N = M(
    (H) => {
      r?.(H), u(H);
    },
    [r]
  ), v = z(
    () => g.map((H) => {
      const Q = f.get(H.imageId) ?? { x: 0, y: 0 };
      return {
        id: H.imageId,
        type: "lineageNode",
        position: Q,
        data: {
          entry: H,
          highlighted: x.has(H.imageId),
          selected: H.imageId === n,
          onSelect: N,
          getImageUrl: a
        },
        style: { width: aa, height: ia }
      };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [g, n, x, N, a]
  ), b = z(
    () => new Set(g.map((H) => H.imageId)),
    [g]
  ), w = z(
    () => g.filter(
      (H) => H.parentImageId && b.has(H.parentImageId)
    ).map((H) => ({
      id: `${H.parentImageId}->${H.imageId}`,
      source: H.parentImageId,
      target: H.imageId,
      sourceHandle: "out",
      targetHandle: "in",
      className: x.has(H.imageId) && x.has(H.parentImageId) ? "stroke-primary stroke-2" : "stroke-border"
    })),
    [g, b, x]
  ), [y, , k] = Do(v), [C, , $] = Mo(w), A = M(
    (H, Q) => {
      N(Q.id);
    },
    [N]
  ), D = M(() => {
    h > rh ? l(!0) : d(!0);
  }, [h]), O = M(() => {
    d(!0), l(!1);
  }, []), ne = M(() => {
    l(!1);
  }, []), R = z(() => {
    const H = g.slice();
    return H.sort((Q, E) => {
      const T = Date.parse(Q.at), K = Date.parse(E.at);
      return T !== K ? T - K : Q.imageId.localeCompare(E.imageId);
    }), H;
  }, [g]), J = M(() => u(null), []), Y = M(
    (H) => u(H),
    []
  );
  return h === 0 ? /* @__PURE__ */ e(ph, {}) : /* @__PURE__ */ o(
    "div",
    {
      className: "relative w-full h-full flex flex-col",
      "data-testid": "lineage-graph",
      children: [
        m && /* @__PURE__ */ e("div", { className: "p-2 flex-shrink-0", children: /* @__PURE__ */ o(
          et,
          {
            variant: "info",
            "data-testid": "lineage-graph-clip-banner",
            children: [
              /* @__PURE__ */ o("span", { className: "flex-1", children: [
                "Showing ",
                g.length,
                " of ",
                h,
                " artifacts"
              ] }),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: D,
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
            Oo,
            {
              nodes: y,
              edges: C,
              onNodesChange: k,
              onEdgesChange: $,
              onNodeClick: A,
              nodeTypes: dh,
              fitView: !0,
              fitViewOptions: { padding: 0.2 },
              minZoom: 0.3,
              maxZoom: 2,
              onlyRenderVisibleElements: !0,
              proOptions: { hideAttribution: !0 },
              children: [
                /* @__PURE__ */ e(Eo, { gap: 16, size: 1, className: "bg-surface-inset" }),
                /* @__PURE__ */ e(_o, { showInteractive: !1, className: "bg-surface border border-border rounded" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e(
          an,
          {
            open: c,
            onConfirm: O,
            onCancel: ne,
            title: "Show all artifacts?",
            body: `Rendering all ${h} artifacts may slow down the lineage tab. Continue?`,
            confirmLabel: "Show all",
            tone: "caution"
          }
        ),
        p && /* @__PURE__ */ e(
          mh,
          {
            navEntries: R,
            imageId: p,
            onClose: J,
            onNavigate: Y,
            getImageUrl: a
          }
        )
      ]
    }
  );
}
const zt = /* @__PURE__ */ new Map(), hh = 6e4;
function wo(t) {
  const n = zt.get(t);
  return n ? Date.now() - n.fetchedAt > hh ? (zt.delete(t), null) : n.entries : null;
}
function fh(t, n) {
  zt.set(t, { entries: n, fetchedAt: Date.now() });
}
function cf() {
  zt.clear();
}
function df(t, n) {
  const [r, i] = S(() => t ? wo(t) ?? [] : []), [a, s] = S(!1), [d, c] = S(null), l = ce(0), p = M(() => {
    if (!t || !n) return;
    const h = wo(t);
    if (h) {
      i(h), s(!1), c(null);
      return;
    }
    const m = ++l.current;
    s(!0), c(null);
    const g = `/api/pipeline/runs/${encodeURIComponent(t)}/image-lineage?pipelineId=${encodeURIComponent(n)}`;
    fetch(g, {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    }).then(async (x) => {
      if (m !== l.current) return;
      if (!x.ok) {
        const v = `image-lineage: ${x.status} ${x.statusText}`;
        c(v), s(!1);
        return;
      }
      const f = await x.json();
      if (m !== l.current) return;
      const N = Array.isArray(f.entries) ? f.entries : [];
      fh(t, N), i(N), s(!1);
    }).catch((x) => {
      m === l.current && (c(x instanceof Error ? x.message : String(x)), s(!1));
    });
  }, [t, n]), u = M(() => {
    t && zt.delete(t), p();
  }, [t, p]);
  return re(() => {
    p();
  }, [p]), { entries: r, loading: a, error: d, refetch: u };
}
export {
  li as ActionNode,
  pd as AdjustBwConfig,
  Li as AdjustBwNode,
  Cd as AdjustLayerConfig,
  Ui as AdjustLayerNode,
  wi as AgUiOutputNode,
  fi as AgentNode,
  rf as AggregateSummaryCard,
  Kh as AllRunsPage,
  ls as AnimatedEdge,
  hi as ApprovalNode,
  ge as BaseNode,
  cp as CaptionPanel,
  ii as ConditionNode,
  ac as ContextVariablePicker,
  Xm as CriteriaPanel,
  cd as CropConfig,
  _i as CropNode,
  $d as DimensionsConfig,
  Fi as DimensionsNode,
  sp as EditPromptConfig,
  os as EditPromptNode,
  gp as EditRecommendationsPanel,
  xf as EventStreamProvider,
  ci as ForkNode,
  Gc as FormatConvertConfig,
  Di as FormatConvertNode,
  ep as GenerateConfig,
  Zi as GenerateNode,
  bi as GraphQueryNode,
  vi as GuardrailNode,
  lf as ImageLineageGraph,
  Xh as ImageSourceConfig,
  Ci as ImageSourceNode,
  pp as ImageWithBBoxOverlay,
  ui as JoinNode,
  tf as JudgmentApiProvider,
  nf as JudgmentResultViewer,
  of as JudgmentTrendChart,
  xi as KnowledgeBaseNode,
  ni as LLMNode,
  gi as McpToolNode,
  yi as MemoryNode,
  Ya as NODE_CATEGORIES,
  jh as NODE_TYPES_WITHOUT_CONFIG,
  Is as NodePalette,
  dn as NodeThumbStrip,
  hp as ObjectsPanel,
  bs as PALETTE_ITEMS,
  Xa as PORT_CLS,
  Yh as PendingApprovalsPage,
  mp as PeoplePanel,
  Fs as PipelineCanvas,
  ua as PipelineEditorContext,
  zh as PipelineEditorPage,
  Ro as PipelineEditorProvider,
  mf as PipelineEditorServicesProvider,
  hf as PipelineNodeRuntimeProvider,
  Jh as PipelineRunComparePage,
  Hh as PipelineRunDiff,
  Vh as PipelineRunReplayPage,
  Wh as PipelineRunsPage,
  ka as PipelineRunsProvider,
  Gh as PipelineStatsPage,
  qh as PipelinesPage,
  Ni as PolicyNode,
  Uc as ResizeConfig,
  Ti as ResizeNode,
  Qh as SaveConfig,
  Ii as SaveNode,
  _c as ScatterConfig,
  $i as ScatterNode,
  Xc as SharpenConfig,
  Mi as SharpenNode,
  fp as TagsPanel,
  Vc as TransformGeoConfig,
  Pi as TransformGeoNode,
  oi as TransformNode,
  Za as TriggerNode,
  Pd as UpscaleConfig,
  ji as UpscaleNode,
  op as VariationConfig,
  ts as VariationNode,
  Ym as VerdictPanel,
  Fd as VisionClassifyConfig,
  Hi as VisionClassifyNode,
  _d as VisionConfig,
  Wd as VisionDescribeConfig,
  Ki as VisionDescribeNode,
  Qd as VisionExtractTextConfig,
  Yi as VisionExtractTextNode,
  Ji as VisionNode,
  xp as VisionResultViewer,
  Zh as VisionRunCard,
  Kd as VisionTagConfig,
  Gi as VisionTagNode,
  ed as WatermarkConfig,
  Oi as WatermarkNode,
  ic as availableContextPaths,
  cc as availableImageRefs,
  fe as categoryFor,
  cf as clearImageLineageCache,
  Cr as contextContributions,
  up as imageOverlayPropsFrom,
  as as nodeTypes,
  F as portCls,
  Fh as recordRecentType,
  sc as unresolvedTemplatePaths,
  Fn as upstreamNodeIds,
  Ee as useEventStream,
  Ua as useEventStreamContext,
  df as useImageLineage,
  Te as useImageUrl,
  Io as useIsNodeTypeExecutable,
  sf as useJudgmentAggregates,
  oa as useJudgmentApi,
  af as useJudgmentResults,
  me as useLatestStepForNode,
  Le as usePipelineEditor,
  So as usePipelineEditorServices,
  ff as usePipelineNodeRuntime,
  yt as usePipelineRuns,
  Ae as useRetryFromStep,
  Nt as useUpstreamContext,
  $e as useUpstreamImageRefs,
  ef as useVisionResults
};
