import { jsxs as o, jsx as e, Fragment as G } from "react/jsx-runtime";
import ao, { useState as S, useRef as ie, useMemo as q, useEffect as ee, memo as zo, useCallback as D, useContext as io, createContext as qo } from "react";
import { useNavigate as Oe, useParams as mt, Navigate as ht, useSearchParams as tn } from "react-router";
import { v as me, w as Se, q as Ae, x as qe, u as ft, i as Vo, g as Wo, f as Kn, p as Jo, y as Ho, J as rn, t as so, I as lo, e as Dt, S as Yt, N as Ko, T as on, n as co, a as nt, z as po, A as Ln, B as $n, C as uo, D as Go, E as Yo, F as Xo, b as Qo, G as rt, H as Zo, K as ea, L as ot, M as Gn, O as ta, j as na, o as mo, Q as Xt, R as ra, m as Yn, P as oa, U as aa, r as ia, V as Qt, l as Xn, W as sa, k as la } from "./PipelineEditorServicesContext-CTTNH5_Y.js";
import { h as _h } from "./PipelineEditorServicesContext-CTTNH5_Y.js";
import { Handle as B, Position as U, useNodeConnections as ca, getSmoothStepPath as da, EdgeLabelRenderer as pa, ReactFlowProvider as ua, useReactFlow as ma, useNodesState as ho, useEdgesState as fo, ReactFlow as xo, Background as go, BackgroundVariant as ha, Controls as bo, MiniMap as fa } from "@xyflow/react";
/* empty css               */
import { c as I } from "./cn-B6yFEsav.js";
import { u as Bn, a as nn } from "./ToastProvider-aHBNxMTO.js";
import "clsx";
import "tailwind-merge";
import { u as xa, F as ga, I as ba, C as Un, T as ya, S as Fn, a as va } from "./FilterChip-DOtfeDVu.js";
import { M as Je } from "./Modal-2jg4229_.js";
import "react-dom";
import "./WebSocketContext-DPGFyPeZ.js";
import { a as Pe, u as Na } from "./EventStreamContext-CjzSHXy-.js";
import { E as Bh } from "./EventStreamContext-CjzSHXy-.js";
import { B as Ee } from "./Button-Qsbxqsl9.js";
import { I as Tt, F as wa } from "./FileUploadDrop-Cmz3XANg.js";
import { u as jn } from "./IdentityContext-CLalsm_M.js";
import { C as ce } from "./Chip-CAS9vOWq.js";
import { E as Be } from "./EmptyState-PM9wTjxk.js";
import { B as tt } from "./Banner-DKb3JiLs.js";
import { C as Zt } from "./ConfirmDialog-CNoxvYGu.js";
import { B as ka, L as Ut } from "./Chart-ByoxeiYX.js";
import { S as an } from "./SkeletonCard-C89GWQ3p.js";
const Ca = "";
function Qn(t, n) {
  const r = t.displayName;
  return typeof r == "string" && r.length > 0 ? r : n.slice(0, 8);
}
function Ia({ value: t, onChange: n, placeholder: r, maxSelect: a }) {
  const { presenceUsers: i } = xa(), { idToken: s } = jn(), [d, c] = S(""), [l, p] = S(!1), [u, f] = S(0), [h, x] = S([]), g = ie(null), m = ie(null), N = q(() => {
    const $ = new Set(t), T = [];
    for (const M of i)
      $.has(M.clientId) || ($.add(M.clientId), T.push({
        userId: M.clientId,
        displayName: Qn(M.metadata, M.clientId)
      }));
    return T;
  }, [i, t]);
  ee(() => {
    const $ = d.trim();
    if (!$ || !s) {
      x([]);
      return;
    }
    const T = new AbortController(), M = setTimeout(() => {
      const R = `${Ca}/api/profiles?q=${encodeURIComponent($)}&limit=20`;
      fetch(R, {
        headers: { Authorization: `Bearer ${s}` },
        signal: T.signal
      }).then((j) => j.ok ? j.json() : Promise.reject(new Error(`HTTP ${j.status}`))).then((j) => {
        x(Array.isArray(j.profiles) ? j.profiles : []);
      }).catch(() => {
      });
    }, 250);
    return () => {
      clearTimeout(M), T.abort();
    };
  }, [d, s]);
  const v = q(() => {
    const $ = new Set(t), T = [];
    for (const M of N)
      $.has(M.userId) || ($.add(M.userId), T.push(M));
    for (const M of h)
      $.has(M.userId) || ($.add(M.userId), T.push({
        userId: M.userId,
        displayName: M.displayName || M.userId.slice(0, 8)
      }));
    return T;
  }, [N, h, t]), y = q(() => {
    const $ = d.trim().toLowerCase();
    return $ ? v.filter(
      (T) => T.displayName.toLowerCase().includes($) || T.userId.toLowerCase().includes($)
    ) : v;
  }, [v, d]), w = typeof a == "number" && t.length >= a, b = ($) => {
    const T = $.trim();
    T && (t.includes(T) || w || (n([...t, T]), c(""), f(0)));
  }, k = ($) => {
    n(t.filter((T) => T !== $));
  }, C = ($) => {
    if ($.key === "ArrowDown")
      $.preventDefault(), p(!0), f((T) => Math.min(T + 1, Math.max(y.length - 1, 0)));
    else if ($.key === "ArrowUp")
      $.preventDefault(), f((T) => Math.max(T - 1, 0));
    else if ($.key === "Enter") {
      $.preventDefault();
      const T = y[u];
      T ? b(T.userId) : d.trim() && b(d.trim());
    } else $.key === "Escape" ? p(!1) : $.key === "Backspace" && !d && t.length > 0 && k(t[t.length - 1]);
  }, A = ($) => {
    const T = i.find((R) => R.clientId === $);
    if (T) return Qn(T.metadata, $);
    const M = h.find((R) => R.userId === $);
    return M && M.displayName ? M.displayName : $;
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5 font-[inherit]", children: [
    t.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: t.map(($) => /* @__PURE__ */ o(
      "span",
      {
        className: "inline-flex items-center gap-1 bg-[#eef2ff] border border-[#c7d2fe] text-[#3730a3] rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
        children: [
          A($),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => k($),
              "aria-label": `Remove ${A($)}`,
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
          ref: g,
          type: "text",
          value: d,
          disabled: w,
          placeholder: w ? `Max ${a} selected` : r ?? "Search users…",
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
      l && !w && y.length > 0 && /* @__PURE__ */ e(
        "div",
        {
          className: "absolute top-full left-0 right-0 bg-white border border-[#e2e8f0] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
          onMouseDown: ($) => {
            $.preventDefault(), m.current && clearTimeout(m.current);
          },
          children: y.map(($, T) => /* @__PURE__ */ o(
            "div",
            {
              className: I(
                "py-1.5 px-2.5 text-[13px] text-[#374151] cursor-pointer",
                T === u ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              onMouseEnter: () => f(T),
              onClick: () => {
                b($.userId), g.current?.focus();
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
const Sa = {
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
  "image:vision-analyze": ["out"],
  "image:vision-classify": ["out", "error"],
  "image:vision-describe": ["out", "error"],
  "image:vision-tag": ["out", "error"],
  "image:vision-extract-text": ["out", "error"],
  "image:generate": ["out", "error"],
  "image:variation": ["out", "error"],
  "image:edit-prompt": ["out", "error"]
}, $a = {
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
  "image-source": null,
  // image-source has no inputs — it is a source node
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
  "image:vision-analyze": ["in"],
  "image:vision-classify": ["in"],
  "image:vision-describe": ["in"],
  "image:vision-tag": ["in"],
  "image:vision-extract-text": ["in"],
  "image:generate": ["in"],
  "image:variation": ["in"],
  "image:edit-prompt": ["in"]
};
function Tn(t, n, r, a) {
  return !(!Ta(t, n) || !Aa(r, a));
}
function Ta(t, n) {
  const r = Sa[t];
  return r === "fork" ? Ra(n) : r.includes(n);
}
function Aa(t, n) {
  const r = $a[t];
  return r === null ? !1 : r === "join" ? Pa(n) : r.includes(n);
}
function Ra(t) {
  return /^branch-(\d+)$/.exec(t) !== null;
}
function Pa(t) {
  return /^in-(\d+)$/.exec(t) !== null;
}
const Ma = {
  idle: { card: "border border-[#d1d5db] bg-white", dot: "bg-[#d1d5db]" },
  pending: { card: "border border-dashed border-[#93c5fd] bg-[#eff6ff]", dot: "bg-[#93c5fd]" },
  running: { card: "border-2 border-[#2563eb] bg-[#eff6ff]", dot: "bg-[#2563eb]" },
  awaiting: { card: "border-2 border-[#f59e0b] bg-[#fffbeb]", dot: "bg-[#f59e0b]" },
  completed: { card: "border border-[#16a34a] bg-[#f0fdf4]", dot: "bg-[#16a34a]" },
  failed: { card: "border-2 border-[#dc2626] bg-[#fef2f2]", dot: "bg-[#dc2626]" },
  skipped: { card: "border border-dashed border-[#d1d5db] bg-[#f9fafb] opacity-50", dot: "bg-[#d1d5db]" }
};
function fe(t) {
  const { icon: n, subtitle: r, state: a, body: i, footer: s, selected: d, onRetry: c, hasBreakpoint: l, pausedAtBreakpoint: p, ariaLabel: u, children: f } = t, h = Ma[a], x = Bn(), [g, m] = S(!1), N = a === "failed" && typeof c == "function", v = (C) => {
    C.preventDefault(), C.stopPropagation(), c?.();
  }, y = !x && a === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !x && a === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", w = !!(i || s || N), b = !!(i || s), k = r ? `${r}, state: ${a}` : `Node, state: ${a}`;
  return /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        p ? "border-2 border-[#d97706] bg-[#fffbeb] shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]" : h.card,
        !p && d && "shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]",
        !p && !d && "shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
        x && "transition-none"
      ),
      role: "button",
      tabIndex: 0,
      "aria-label": u ?? k,
      "aria-selected": !!d,
      "data-state": a,
      "data-node-state": a,
      "data-pipeline-node": "true",
      children: [
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
          w && "border-b border-border"
        ), children: [
          /* @__PURE__ */ e("span", { className: "text-sm leading-none shrink-0", "aria-hidden": "true", children: n }),
          /* @__PURE__ */ e("span", { className: "flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap", children: r }),
          /* @__PURE__ */ e(
            "span",
            {
              className: I("w-2 h-2 rounded-full shrink-0", h.dot, y),
              "aria-label": `state: ${a}`
            }
          )
        ] }),
        N && /* @__PURE__ */ e("div", { className: I(
          "flex px-2.5 py-1.5",
          b && "border-b border-border"
        ), children: /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            className: I(
              "cursor-pointer appearance-none font-inherit text-[11px] font-medium leading-tight px-2 py-0.5 rounded-full border border-[#dc2626] text-[#dc2626] transition-colors duration-[120ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              g ? "bg-[#fef2f2]" : "bg-transparent",
              x && "transition-none"
            ),
            onClick: v,
            onMouseDown: (C) => C.stopPropagation(),
            onMouseEnter: () => m(!0),
            onMouseLeave: () => m(!1),
            "aria-label": "Retry from here",
            children: "⟳ Retry from here"
          }
        ) }),
        i != null && /* @__PURE__ */ e("div", { className: "px-2.5 py-2 text-[13px] leading-[1.4] text-text-secondary", children: i }),
        s != null && /* @__PURE__ */ e("div", { className: "border-t border-border px-2.5 py-1.5 text-xs text-text-secondary", children: s }),
        f
      ]
    }
  );
}
function Zn(t) {
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
function Ea(t) {
  return t.triggerType === "schedule" ? t.schedule ? `cron: ${t.schedule}` : "No schedule set" : t.triggerType === "webhook" ? t.webhookPath ? `POST ${t.webhookPath}` : "No path set" : t.triggerType.startsWith("document.") ? t.documentTypeId ? `Doc type: ${t.documentTypeId}` : "Any document" : "Fires on user click";
}
function Da(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Se(), p = c === "failed" ? () => l(n) : void 0, u = `Trigger node, ${Zn(r)}, state: ${c}`;
  return /* @__PURE__ */ e(
    fe,
    {
      icon: "▶",
      subtitle: Zn(r),
      state: c,
      body: /* @__PURE__ */ e("span", { className: "italic", children: Ea(r) }),
      selected: a,
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
          className: "!bg-slate-300 !w-2.5 !h-2.5"
        }
      )
    }
  );
}
function Oa(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const r = t.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
function _a({ info: t }) {
  const [n, r] = S(!1), a = n ? t.response : t.response.length > 60 ? `${t.response.slice(0, 60)}…` : t.response, i = t.tokensIn != null || t.tokensOut != null;
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
        children: a
      }
    )
  ] });
}
function La(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = i?.llm, p = c === "running" && l?.streamOpened === !0 && (l?.tokensOut ?? 0) === 0, u = c === "running" && l !== void 0 && (l.tokensOut ?? 0) > 0, f = Se(), h = c === "failed" ? () => f(n) : void 0, x = /* @__PURE__ */ e("span", { className: "italic", children: Oa(r.userPromptTemplate) }), m = (l ? {
    response: l.response ?? "",
    tokensIn: l.tokensIn,
    tokensOut: l.tokensOut,
    streaming: u,
    streamOpening: p
  } : void 0) ?? r._llmResponse, N = m ? /* @__PURE__ */ e(_a, { info: m }) : void 0, v = (r.systemPrompt ?? "").replace(/\s+/g, " ").trim(), y = v.length === 0 ? "no system prompt" : `system prompt: ${v.length > 60 ? `${v.slice(0, 60)}…` : v}`, w = `LLM node, ${r.model || r.provider}, ${y}, state: ${c}`;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🧠",
      subtitle: r.model || r.provider,
      state: c,
      body: x,
      footer: N,
      selected: a,
      onRetry: h,
      ariaLabel: w,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Ba(t) {
  if (!t) return "—";
  const n = t.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function Ua(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Se(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "✨",
      subtitle: r.transformType,
      state: c,
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Ba(r.expression) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5" })
      ]
    }
  );
}
function Fa(t) {
  if (!t) return "—";
  const n = t.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function ja(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Se(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "❓",
      subtitle: r.label || "condition",
      state: c,
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Fa(r.expression) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "true", className: "!bg-green-600 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "false", className: "!bg-amber-500 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function za(t) {
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
function qa(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Se(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⚡",
      subtitle: r.actionType,
      state: c,
      body: /* @__PURE__ */ e("span", { className: "italic", children: za(r) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Va(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Se(), p = c === "failed" ? () => l(n) : void 0, u = Math.max(2, Math.min(8, r.branchCount ?? 2)), f = Array.from({ length: u }, (h, x) => {
    const g = r.branchLabels?.[x];
    return g && g.trim().length > 0 ? g : `branch ${x}`;
  });
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⑂",
      subtitle: `${u} branches`,
      state: c,
      body: /* @__PURE__ */ e("ul", { className: "m-0 p-0 list-none flex flex-col gap-0.5 text-xs text-text-secondary", children: f.map((h, x) => /* @__PURE__ */ o("li", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: [
        "• ",
        h
      ] }, x)) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        f.map((h, x) => {
          const g = (x + 1) / (u + 1) * 100;
          return /* @__PURE__ */ e(
            B,
            {
              type: "source",
              position: U.Right,
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
function Wa(t) {
  return t.mode === "all" ? "all" : t.mode === "any" ? "any" : `${t.n ?? 1} of many`;
}
function Ja(t) {
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
function Ha(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Se(), p = c === "failed" ? () => l(n) : void 0, u = ca({ handleType: "target" }), f = Math.max(2, u.length + 1);
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⑃",
      subtitle: Wa(r),
      state: c,
      body: /* @__PURE__ */ e("span", { className: "italic", children: Ja(r.mergeStrategy) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        Array.from({ length: f }, (h, x) => {
          const g = (x + 1) / (f + 1) * 100;
          return /* @__PURE__ */ e(
            B,
            {
              type: "target",
              position: U.Left,
              id: `in-${x}`,
              className: "!bg-slate-300 !w-2.5 !h-2.5",
              style: { top: `${g}%` }
            },
            `in-${x}`
          );
        }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5" })
      ]
    }
  );
}
function Ka(t) {
  return t.type === "role" ? `@${t.value}` : t.value;
}
function Ga(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Se(), p = c === "failed" ? () => l(n) : void 0, u = r.approvers ?? [], f = u.length, h = r.requiredCount ?? 0, x = `${f} approver${f === 1 ? "" : "s"}, ${h}/${f} required`, g = u.slice(0, 2), m = Math.max(0, u.length - 2), N = u.length === 0 ? /* @__PURE__ */ e("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: [
    g.map((v, y) => /* @__PURE__ */ e(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: Ka(v)
      },
      y
    )),
    m > 0 && /* @__PURE__ */ o("span", { className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-inset text-text-tertiary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap", children: [
      "+",
      m,
      " more"
    ] })
  ] });
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "✋",
      subtitle: x,
      state: c,
      body: N,
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "approved", className: "!bg-green-600 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "rejected", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Ya({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = Se(), c = n.agentName || n.agentId || "Not configured", l = `${n.protocol.toUpperCase()}${n.streaming ? " (streaming)" : ""}`;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🤖",
      subtitle: c,
      state: s,
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Xa({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = Se(), c = n.toolName || "Not configured";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🔌",
      subtitle: c,
      state: s,
      body: n.gatewayUrl ? /* @__PURE__ */ e("span", { className: "text-[11px]", children: n.gatewayUrl }) : void 0,
      selected: r,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Qa({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = Se(), c = n.knowledgeBaseId || "Not configured", l = `Top ${n.topK} chunks${n.scoreThreshold ? ` (≥${n.scoreThreshold})` : ""}`;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "📚",
      subtitle: c,
      state: s,
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Za({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = Se(), c = n.graphId || "Not configured", l = n.query.length > 40 ? `${n.query.slice(0, 37)}...` : n.query;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🕸️",
      subtitle: c,
      state: s,
      body: /* @__PURE__ */ e("span", { className: "text-[11px] font-mono", children: l }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function ei({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = Se(), c = `${n.mode} ${n.scope}`, l = n.namespace ? `ns: ${n.namespace}` : "No namespace";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "💾",
      subtitle: c,
      state: s,
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function ti({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = Se(), c = n.label || n.guardrailId || "Not configured";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🛡️",
      subtitle: c,
      state: s,
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        "Action: ",
        n.action
      ] }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "pass", className: "!top-[40%] !bg-green-600" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "block", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function ni({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = Se(), c = n.label || n.action || "Not configured";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "📜",
      subtitle: c,
      state: s,
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        n.principal,
        " → ",
        n.resource
      ] }),
      selected: r,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "allow", className: "!top-[40%] !bg-green-600" }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "deny", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function ri({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = n.eventType === "CUSTOM" ? n.customEventName || "Custom" : n.eventType;
  return /* @__PURE__ */ e(
    fe,
    {
      icon: "📡",
      subtitle: d,
      state: s,
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        "Source: ",
        n.sourceField
      ] }),
      footer: /* @__PURE__ */ e("span", { className: "text-[10px] text-[#6366f1]", children: "Terminal — streams to AG-UI frontend" }),
      selected: r,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in" })
    }
  );
}
function oi(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = r.imageId, u = p ? (
    // eslint-disable-next-line jsx-a11y/alt-text
    /* @__PURE__ */ e(
      "img",
      {
        src: l(p),
        alt: "Source image",
        className: I(
          "w-full h-20 object-cover rounded block",
          "border border-[#d1d5db] bg-[#f3f4f6]"
        ),
        "data-testid": "image-source-thumb"
      }
    )
  ) : /* @__PURE__ */ e(
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
  ), f = p ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-[#6b7280]", children: [
    p.slice(0, 16),
    "…"
  ] }) : void 0;
  return /* @__PURE__ */ e(
    fe,
    {
      icon: "🖼",
      subtitle: "image-source",
      state: c,
      body: u,
      footer: f,
      selected: a,
      ariaLabel: `Image Source node, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: /* @__PURE__ */ e(
        B,
        {
          type: "source",
          position: U.Right,
          id: "out",
          className: "!w-2.5 !h-2.5 !bg-[#6b7280]"
        }
      )
    }
  );
}
function ai(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Ae(), p = i?.images?.[0] ?? null, f = i?.output?.filename ?? null, h = p ? /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ e(
      "img",
      {
        src: l(p.imageId),
        alt: "Saved image",
        className: I(
          "w-full h-20 object-cover rounded block",
          "border border-[#d1d5db] bg-[#f3f4f6]"
        ),
        "data-testid": "save-output-thumb"
      }
    ),
    f && /* @__PURE__ */ e(
      "div",
      {
        className: "mt-1 text-[10px] font-mono text-[#6b7280] overflow-hidden text-ellipsis whitespace-nowrap",
        "data-testid": "save-filename-badge",
        title: f,
        children: f
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
  ), x = r.filenameTemplate ?? "crop-{{scatter.index}}.png", g = x.length > 28 ? `${x.slice(0, 25)}…` : x, m = /* @__PURE__ */ e(
    "span",
    {
      className: "font-mono text-[11px] text-[#6b7280]",
      "data-testid": "save-footer",
      title: x,
      children: g
    }
  ), N = "image:save", v = `Save node, template: ${x}, state: ${c}`;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⬇",
      subtitle: N,
      state: c,
      body: h,
      footer: m,
      selected: a,
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
            className: "!w-2.5 !h-2.5 !bg-[#6b7280]"
          }
        ),
        /* @__PURE__ */ e(
          B,
          {
            type: "source",
            position: U.Right,
            id: "out",
            className: "!w-2.5 !h-2.5 !bg-[#6b7280]"
          }
        ),
        /* @__PURE__ */ e(
          B,
          {
            type: "source",
            position: U.Right,
            id: "error",
            className: "!w-2.5 !h-2.5 !bg-[#6b7280] !top-[75%]"
          }
        )
      ]
    }
  );
}
function ii(t) {
  return t ? t.length > 40 ? `${t.slice(0, 37)}…` : t : "Not configured";
}
function si(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = i?.output, p = Array.isArray(l?.items) ? l.items.length : null, u = /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary break-all", children: ii(r.itemsPath ?? "") }),
    p !== null && /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", children: [
      p,
      " item",
      p === 1 ? "" : "s",
      " resolved"
    ] })
  ] }), f = p, h = f !== null && c !== "idle" ? /* @__PURE__ */ o("span", { className: "inline-block text-[11px] font-semibold text-blue-600 bg-blue-50 border border-blue-600 rounded-full px-2 py-0.5", children: [
    "Dispatched ",
    f,
    " arm",
    f === 1 ? "" : "s"
  ] }) : void 0, x = r.itemAlias ? ` · alias: ${r.itemAlias}` : "", g = r.maxConcurrency ? ` · max ${r.maxConcurrency}` : "", m = `scatter${x}${g}`, N = `Scatter node, path: ${r.itemsPath ?? "not set"}, state: ${c}`, v = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⑂",
      subtitle: m,
      state: c,
      body: u,
      footer: h,
      selected: a,
      ariaLabel: N,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: v }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: v })
      ]
    }
  );
}
function li(t) {
  const { id: n, data: r, selected: a } = t, i = Ae(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.width != null && r.height != null ? `→ ${r.width}×${r.height}` : r.width != null ? `→ ${r.width}w` : r.height != null ? `→ ${r.height}h` : null, f = p ? /* @__PURE__ */ e(
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
    r.fit ? ` · ${r.fit}` : ""
  ] }) : void 0, x = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⥂",
      subtitle: "image:resize",
      state: l,
      body: f,
      footer: h,
      selected: a,
      ariaLabel: `Resize node, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: x }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: x }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: x, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function ci(t) {
  switch (t.op) {
    case "rotate":
      return `rotate ${t.degrees}°`;
    case "flip":
      return "flip ↕";
    case "flop":
      return "flop ↔";
  }
}
function di(t) {
  const { id: n, data: r, selected: a } = t, i = Ae(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.operations ?? [], f = u.length > 0 ? u.map(ci).join("  ›  ") : null, h = p ? /* @__PURE__ */ e(
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
  ), x = f ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-tertiary", children: f }) : void 0, g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "↻",
      subtitle: "image:transform",
      state: l,
      body: h,
      footer: x,
      selected: a,
      ariaLabel: `Transform node, ops: ${u.length}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function pi(t) {
  const n = t.format?.toUpperCase() ?? "?", r = t.lossless ? "lossless" : t.quality != null ? `q${t.quality}` : "";
  return r ? `${n} ${r}` : n;
}
function ui(t) {
  const { id: n, data: r, selected: a } = t, i = Ae(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.format ? pi(r) : null, f = p ? /* @__PURE__ */ e(
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
  ), h = u ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary", children: u }) : void 0, x = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⇌",
      subtitle: "image:format-convert",
      state: l,
      body: f,
      footer: h,
      selected: a,
      ariaLabel: `Format Convert node, format: ${r.format ?? "unset"}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: x }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: x }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: x, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function mi(t) {
  const { id: n, data: r, selected: a } = t, i = Ae(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.sigma != null ? `σ ${r.sigma}` : null, f = p ? /* @__PURE__ */ e(
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
  ), h = u ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary", children: u }) : void 0, x = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "◈",
      subtitle: "image:sharpen",
      state: l,
      body: f,
      footer: h,
      selected: a,
      ariaLabel: `Sharpen node, sigma: ${r.sigma ?? "default"}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: x }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: x }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: x, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function hi(t) {
  const { id: n, data: r, selected: a } = t, i = Ae(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.gravity ?? "southeast", f = r.opacity != null ? `${Math.round(r.opacity * 100)}%` : "100%", h = p ? /* @__PURE__ */ e(
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
      children: r.overlayImageId ? `${u} · ${f}` : "No overlay image set"
    }
  ), x = r.overlayImageId ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    u,
    " · ",
    f
  ] }) : void 0, g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⊕",
      subtitle: "image:watermark",
      state: l,
      body: h,
      footer: x,
      selected: a,
      ariaLabel: `Watermark node, gravity: ${u}, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function fi(t) {
  if (!t) return null;
  const n = t.x + t.width, r = t.y + t.height;
  return `[${t.x},${t.y} → ${n},${r}]`;
}
function xi(t) {
  const { id: n, data: r, selected: a } = t, i = Ae(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = s?.output, f = fi(p?.bbox ?? u?.bbox), h = p ? /* @__PURE__ */ e(
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
  ), x = f ? /* @__PURE__ */ e(
    "span",
    {
      className: "font-mono text-[11px] text-text-tertiary",
      "data-testid": "crop-bbox-coords",
      children: f
    }
  ) : void 0, g = `Crop node, source: ${r.sourceImagePath ?? "default"}, state: ${l}`, m = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "✂",
      subtitle: "image:crop",
      state: l,
      body: h,
      footer: x,
      selected: a,
      ariaLabel: g,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: m }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: m })
      ]
    }
  );
}
function gi(t) {
  const { id: n, data: r, selected: a } = t, i = Ae(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e("div", { className: "flex gap-1 w-full", children: /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
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
  ), f = r.algorithm ?? "luminosity", h = r.contrast ?? 1, x = /* @__PURE__ */ o(
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
  ), g = `Adjust B/W node, algorithm: ${f}, state: ${l}`, m = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "◐",
      subtitle: "image:adjust-bw",
      state: l,
      body: u,
      footer: x,
      selected: a,
      ariaLabel: g,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: m }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: m }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: m, style: { top: "75%" } })
      ]
    }
  );
}
function bi(t) {
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
function yi(t) {
  const { id: n, data: r, selected: a } = t, i = Ae(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.layers ?? [], f = p ? /* @__PURE__ */ e(
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
      children: u.map((m, N) => /* @__PURE__ */ e(
        "span",
        {
          className: "text-[10px] font-mono bg-surface-hover border border-border text-text-secondary rounded px-1 py-0.5",
          children: bi(m)
        },
        N
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
  ), x = `Adjust Layer node, ${u.length} layer${u.length === 1 ? "" : "s"}, state: ${l}`, g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "𝍩",
      subtitle: "image:adjust-layer",
      state: l,
      body: f,
      footer: h,
      selected: a,
      ariaLabel: x,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: g, style: { top: "75%" } })
      ]
    }
  );
}
function vi(t) {
  return t === 0 ? "$0" : t < 1e-3 ? "<$0.001" : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Ni(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const r = t.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
const wi = zo(function({ info: n }) {
  const [r, a] = S(!1);
  if (n.failure) {
    const l = n.failure.reason === "refusal";
    return /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("output", { "aria-live": "polite", className: "sr-only", children: l ? "Content policy refusal" : `Failure: ${n.failure.reason}` }),
      /* @__PURE__ */ o("div", { className: "flex items-start gap-1", children: [
        /* @__PURE__ */ e("span", { className: "bg-transparent border-none p-0 text-[12px] text-red-600 font-medium text-left", children: l ? "✕ Content policy refusal" : `✕ ${n.failure.reason}` }),
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
  const i = n.tokensIn != null || n.tokensOut != null, s = !n.streaming && !n.awaiting && n.response.length > 0, d = r ? n.response : n.response.length > 60 ? `${n.response.slice(0, 60)}…` : n.response, c = n.awaiting ? "Vision: waiting for first token" : n.streaming ? "Vision: streaming response" : s ? "Vision: completed" : "";
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ e("output", { "aria-live": "polite", className: "sr-only", children: c }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => a((l) => !l),
        className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] text-text-secondary font-medium text-left",
        children: [
          r ? "▾" : "▸",
          " ",
          n.streaming ? "Streaming" : "Response",
          typeof n.costUsd == "number" && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", "data-testid": "vision-cost", title: "Cost based on model usage rate", children: [
            "· ",
            vi(n.costUsd)
          ] }),
          i && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: [
            "· ",
            n.tokensIn ?? 0,
            " → ",
            n.tokensOut ?? 0,
            " tokens"
          ] }),
          n.awaiting && /* @__PURE__ */ e("span", { className: "ml-1.5 text-[11px] text-blue-600", "data-testid": "vision-awaiting", children: "· waiting…" }),
          n.streaming && !n.awaiting && /* @__PURE__ */ e("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: "· streaming…" })
        ]
      }
    ),
    s && n.imageId && /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: () => window.dispatchEvent(new CustomEvent("pipeline:open-run-modal")),
        className: "mt-1 block bg-transparent border-none p-0 cursor-pointer text-[11px] text-primary underline font-inherit",
        children: "Run with new image →"
      }
    ),
    n.imageId && /* @__PURE__ */ e(
      "img",
      {
        src: n.getImageUrl(n.imageId),
        alt: "Vision input",
        className: "mt-1.5 object-cover rounded border border-border bg-surface-inset cursor-zoom-in block",
        style: { width: r ? 160 : 56, height: r ? 120 : 56 },
        "data-testid": "vision-input-thumb"
      }
    ),
    /* @__PURE__ */ e(
      "div",
      {
        className: "mt-1 font-mono text-[11px] leading-snug text-text-primary whitespace-pre-wrap break-words",
        style: { maxHeight: r ? "none" : "1.4em", overflow: "hidden" },
        children: d
      }
    )
  ] });
});
function ki(t) {
  const { id: n, data: r, selected: a } = t, i = Ae(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = Se(), u = l === "failed" ? () => p(n) : void 0, f = /* @__PURE__ */ e("span", { className: "italic text-text-secondary text-[13px]", children: Ni(r.userPrompt) }), h = s?.vision, x = l === "running" && h !== void 0 && h.tokensSeen > 0 && !h.analyzed, g = l === "running" && h !== void 0 && h.tokensSeen === 0 && !h.failure, m = h ? {
    response: h.response,
    tokensIn: h.tokensIn,
    tokensOut: h.tokensOut,
    streaming: x,
    awaiting: g,
    ...h.failure ? { failure: h.failure } : {},
    ...h.imageId ? { imageId: h.imageId } : {},
    ...typeof h.costUsd == "number" ? { costUsd: h.costUsd } : {},
    ...u ? { onRetry: u } : {},
    getImageUrl: i
  } : void 0, N = m ? /* @__PURE__ */ e(wi, { info: m }) : void 0, v = r.model || "claude-sonnet-4-6", y = r.outputSchema ? "extract" : "caption", w = `Vision node, model ${v}, mode ${y}, state: ${l}`, b = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "📷",
      subtitle: `${v} · ${y}`,
      state: l,
      body: f,
      footer: N,
      selected: a,
      onRetry: u,
      ariaLabel: w,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: b }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: b })
      ]
    }
  );
}
function Ci(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = i?.output, p = l?.extracted?.label, u = l?.extracted?.confidence, f = (r.labels ?? []).slice(0, 4).join(", "), h = p ? /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 py-0.5", children: [
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
  ] }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: f ? `Labels: ${f}` : "No labels configured" }), x = r.model ?? "claude-haiku-4-5", g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🏷",
      subtitle: x,
      state: c,
      body: h,
      selected: a,
      ariaLabel: `Vision Classify node, model: ${x}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Ii(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", p = i?.output?.extracted?.caption, u = p ? p.length > 80 ? `${p.slice(0, 77)}…` : p : null, f = r.userPrompt ? r.userPrompt.length > 60 ? `${r.userPrompt.slice(0, 57)}…` : r.userPrompt : "No prompt set", h = u ? /* @__PURE__ */ e(
    "span",
    {
      className: "text-[11px] text-text-primary leading-snug",
      "data-testid": "describe-caption",
      children: u
    }
  ) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: f }), x = r.model ?? "claude-haiku-4-5", g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "💬",
      subtitle: x,
      state: c,
      body: h,
      selected: a,
      ariaLabel: `Vision Describe node, model: ${x}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Si(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", u = (i?.output?.extracted?.tags ?? []).slice(0, 5), f = (r.candidateTags ?? []).slice(0, 3).join(", "), h = u.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", "data-testid": "tag-pills", children: u.map((m) => /* @__PURE__ */ e(
    "span",
    {
      className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded-full px-1.5 py-0.5 text-text-secondary whitespace-nowrap",
      children: m
    },
    m
  )) }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: f ? `Candidates: ${f}…` : "Open-vocabulary tagging" }), x = r.model ?? "claude-haiku-4-5", g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🔖",
      subtitle: x,
      state: c,
      body: h,
      selected: a,
      ariaLabel: `Vision Tag node, model: ${x}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function $i(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", p = i?.output?.extracted?.lines ?? [], u = p[0], f = p.length > 0 ? /* @__PURE__ */ o("div", { "data-testid": "extract-text-result", children: [
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
  ] }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: "Awaiting OCR" }), h = r.model ?? "claude-sonnet-4-6", x = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "📝",
      subtitle: h,
      state: c,
      body: f,
      selected: a,
      ariaLabel: `Vision Extract Text node, model: ${h}, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: x }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: x }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: x, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Ti(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
function Ai(t) {
  const { id: n, data: r, selected: a } = t, i = Ae(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e(
    "img",
    {
      src: i(p.imageId),
      alt: "Generate output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "generate-output-thumb"
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
      "data-testid": "generate-placeholder",
      children: Ti(r.prompt)
    }
  ), f = (r.numImages ?? 1) > 1 ? `×${r.numImages}` : null, h = r.width && r.height ? `${r.width}×${r.height}` : null, x = f || h ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-tertiary", children: [h, f].filter(Boolean).join(" · ") }) : void 0, g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "✦",
      subtitle: "image:generate",
      state: l,
      body: u,
      footer: x,
      selected: a,
      ariaLabel: `Generate node, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Ri(t) {
  const { id: n, data: r, selected: a } = t, i = Ae(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.numVariations ?? 1, h = /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ o("span", { className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary mb-1", children: [
      "×",
      u,
      " variation",
      u !== 1 ? "s" : ""
    ] }),
    p ? /* @__PURE__ */ e(
      "img",
      {
        src: i(p.imageId),
        alt: "Variation output",
        className: "w-full h-18 object-cover rounded border border-border bg-surface-inset block",
        "data-testid": "variation-output-thumb"
      }
    ) : /* @__PURE__ */ e(
      "div",
      {
        className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
        "data-testid": "variation-placeholder",
        children: "Awaiting input"
      }
    )
  ] }), x = r.similarity != null ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "similarity ",
    r.similarity
  ] }) : void 0, g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⊞",
      subtitle: "image:variation",
      state: l,
      body: h,
      footer: x,
      selected: a,
      ariaLabel: `Variation node, ${u} variations, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: g }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Pi(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
function Mi(t) {
  const { id: n, data: r, selected: a } = t, i = Ae(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e(
    "img",
    {
      src: i(p.imageId),
      alt: "Edit output",
      className: "w-full h-20 object-cover rounded border border-border bg-surface-inset block",
      "data-testid": "edit-prompt-output-thumb"
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: "w-full h-20 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
      "data-testid": "edit-prompt-placeholder",
      children: Pi(r.prompt)
    }
  ), f = r.maskImagePath ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "mask: ",
    r.maskImagePath
  ] }) : void 0, h = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "✎",
      subtitle: "image:edit-prompt",
      state: l,
      body: u,
      footer: f,
      selected: a,
      ariaLabel: `Edit Prompt node, state: ${l}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: h }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "out", className: h }),
        /* @__PURE__ */ e(B, { type: "source", position: U.Right, id: "error", className: h, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
const Ei = {
  trigger: Da,
  llm: La,
  transform: Ua,
  condition: ja,
  action: qa,
  fork: Va,
  join: Ha,
  approval: Ga,
  agent: Ya,
  "mcp-tool": Xa,
  "knowledge-base": Qa,
  "graph-query": Za,
  memory: ei,
  guardrail: ti,
  policy: ni,
  "ag-ui-output": ri,
  "image-source": oi,
  "image:save": ai,
  scatter: si,
  "image:resize": li,
  "image:transform": di,
  "image:format-convert": ui,
  "image:sharpen": mi,
  "image:watermark": hi,
  "image:crop": xi,
  "image:adjust-bw": gi,
  "image:adjust-layer": yi,
  "image:vision-analyze": ki,
  "image:vision-classify": Ci,
  "image:vision-describe": Ii,
  "image:vision-tag": Si,
  "image:vision-extract-text": $i,
  "image:generate": Ai,
  "image:variation": Ri,
  "image:edit-prompt": Mi
};
function Di(t) {
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
function Oi({
  id: t,
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
  const u = c ?? {}, f = Bn(), [h] = da({
    sourceX: n,
    sourceY: r,
    targetX: a,
    targetY: i,
    sourcePosition: s,
    targetPosition: d
  }), x = Di(u.state), g = x.animate && !f, m = p ? "#646cff" : x.stroke, N = p ? 2.5 : x.strokeWidth;
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
        stroke: m,
        strokeWidth: N,
        strokeDasharray: g ? x.strokeDasharray : void 0,
        markerEnd: l,
        className: "pointer-events-none",
        children: g ? /* @__PURE__ */ e(
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
    u.label ? /* @__PURE__ */ e(pa, { children: /* @__PURE__ */ e(
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
    ) }) : null
  ] });
}
function ut(t, n, r) {
  const a = ie(n);
  a.current = n, ee(() => {
    if (r === !1) return;
    const i = (s) => {
      t.current && !t.current.contains(s.target) && a.current();
    };
    return document.addEventListener("mousedown", i), () => document.removeEventListener("mousedown", i);
  }, [t, r]);
}
const _i = [
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
function Li(t, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return t.type.toLowerCase().includes(r) || t.name.toLowerCase().includes(r) || t.description.toLowerCase().includes(r);
}
function Bi({
  anchor: t,
  flowPosition: n,
  disabledTypes: r = [],
  onClose: a,
  onInsert: i
}) {
  const [s, d] = S(""), [c, l] = S(0), p = ie(null), u = ie(null), f = q(() => new Set(r), [r]), h = q(
    () => _i.filter((m) => !f.has(m.type) && Li(m, s)),
    [f, s]
  );
  if (ee(() => {
    l((m) => m >= h.length ? 0 : m);
  }, [h.length]), ee(() => {
    if (t) {
      const m = setTimeout(() => u.current?.focus(), 0);
      return () => clearTimeout(m);
    }
  }, [t]), ut(p, a, !!t), !t) return null;
  const x = (m) => {
    const N = h[m];
    !N || !n || (i(N.type, n), a());
  }, g = (m) => {
    if (m.key === "ArrowDown") {
      if (m.preventDefault(), h.length === 0) return;
      l((N) => (N + 1) % h.length);
    } else if (m.key === "ArrowUp") {
      if (m.preventDefault(), h.length === 0) return;
      l((N) => (N - 1 + h.length) % h.length);
    } else m.key === "Enter" ? (m.preventDefault(), x(c)) : m.key === "Escape" && (m.preventDefault(), a());
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
            onKeyDown: g,
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
          const v = N === c;
          return /* @__PURE__ */ o(
            "div",
            {
              role: "option",
              "aria-selected": v,
              onMouseEnter: () => l(N),
              onMouseDown: (y) => {
                y.preventDefault(), x(N);
              },
              className: I(
                "flex items-center gap-2.5 px-3 py-2 cursor-pointer font-inherit",
                v ? "bg-[#f1f5f9]" : "bg-transparent"
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
function Ui({
  addNode: t,
  addEdge: n,
  updateNodeData: r,
  getDefinition: a
}) {
  ee(() => {
  }, [t, n, r, a]);
}
function Fi({
  definition: t,
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
  ee(() => {
    const f = u.current;
    if (!f) return;
    const h = (g) => {
      const m = f.querySelector(
        `.react-flow__node[data-id="${CSS.escape(g)}"]`
      );
      return m ? ((m.querySelector('[data-pipeline-node="true"]') ?? m).focus(), !0) : !1;
    }, x = (g) => {
      if (qn(g.target)) return;
      const m = document.activeElement, N = !!m && f.contains(m);
      if (g.key === "Tab") {
        if (!N || !t || t.nodes.length === 0) return;
        const v = as(t);
        if (v.length === 0) return;
        const w = m?.closest(".react-flow__node")?.getAttribute("data-id") ?? null, b = w !== null ? v.indexOf(w) : -1, k = g.shiftKey ? -1 : 1, C = b === -1 ? g.shiftKey ? v.length - 1 : 0 : (b + k + v.length) % v.length, A = v[C];
        h(A) && g.preventDefault();
        return;
      }
      if (N && !g.altKey) {
        if (g.key === "Enter" || g.key === " " || g.key === "Spacebar") {
          const y = m?.closest(".react-flow__node")?.getAttribute("data-id");
          y && (g.preventDefault(), r(y));
          return;
        }
        if (g.key === "Delete" || g.key === "Backspace") {
          if (n) {
            g.preventDefault(), a(n);
            return;
          }
          d((v) => {
            const y = v.filter((w) => w.selected);
            if (y.length === 0) return v;
            for (const w of y) i(w.id);
            return v.filter((w) => !w.selected);
          }), g.preventDefault();
          return;
        }
        if (g.key === "Escape") {
          g.preventDefault(), r(null);
          return;
        }
        if ((g.metaKey || g.ctrlKey) && g.key === "c" && n) {
          g.preventDefault(), p.current = n;
          return;
        }
        if ((g.metaKey || g.ctrlKey) && g.key === "v" && p.current) {
          g.preventDefault();
          const v = l([p.current]);
          v.length > 0 && r(v[0]);
          return;
        }
        if ((g.metaKey || g.ctrlKey) && g.key === "d" && n) {
          g.preventDefault();
          const v = l([n]);
          v.length > 0 && r(v[0]);
          return;
        }
        if (g.key === "ArrowUp" || g.key === "ArrowDown" || g.key === "ArrowLeft" || g.key === "ArrowRight") {
          if (g.preventDefault(), g.stopPropagation(), !g.shiftKey || !n) return;
          const v = 8, y = g.key === "ArrowLeft" ? -v : g.key === "ArrowRight" ? v : 0, w = g.key === "ArrowUp" ? -v : g.key === "ArrowDown" ? v : 0;
          s((b) => {
            const k = b.map(
              (A) => A.id === n ? {
                ...A,
                position: {
                  x: A.position.x + y,
                  y: A.position.y + w
                }
              } : A
            ), C = k.find((A) => A.id === n);
            return C && c([{ id: C.id, position: C.position }]), k;
          });
        }
      }
    };
    return f.addEventListener("keydown", x), () => f.removeEventListener("keydown", x);
  }, [t, n, r, a, i, s, d, c, l, p, u]);
}
function ji({
  addNode: t,
  screenToFlowPosition: n
}) {
  const r = D((i) => {
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
      const l = n({
        x: i.clientX,
        y: i.clientY
      });
      t(c, l);
    },
    [t, n]
  );
  return { handleDragOver: r, handleDrop: a };
}
function zi({
  nodeMenu: t,
  breakpoints: n,
  showBreakpointOption: r,
  onFilterLog: a,
  onCopyNodeId: i,
  onDuplicate: s,
  onToggleBreakpoint: d,
  onDismiss: c
}) {
  ee(() => {
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
const At = [
  {
    name: "Triggers",
    items: [
      { type: "trigger", icon: "⚡", name: "Trigger", description: "Starts the pipeline", category: "Triggers" }
    ]
  },
  {
    name: "Vision",
    items: [
      { type: "image:vision-analyze", icon: "📷", name: "Vision Analyze", description: "Analyze an image with a multimodal LLM", category: "Vision" },
      { type: "image:vision-classify", icon: "🏷", name: "Vision Classify", description: "Classify image into a label set", category: "Vision" },
      { type: "image:vision-describe", icon: "💬", name: "Vision Describe", description: "Generate a natural-language caption of an image", category: "Vision" },
      { type: "image:vision-tag", icon: "🔖", name: "Vision Tag", description: "Extract ranked tags from an image", category: "Vision" },
      { type: "image:vision-extract-text", icon: "📝", name: "Vision Extract Text", description: "OCR / text extraction from an image", category: "Vision" }
    ]
  },
  {
    name: "AI",
    items: [
      { type: "llm", icon: "🧠", name: "LLM", description: "Call an LLM model", category: "AI" },
      { type: "image:generate", icon: "✦", name: "Generate", description: "Generate an image from a text prompt via Bedrock", category: "AI" },
      { type: "image:variation", icon: "⊞", name: "Variation", description: "Generate variations of a source image via Nova Canvas", category: "AI" },
      { type: "image:edit-prompt", icon: "✎", name: "Edit Prompt", description: "Inpaint or outpaint a region via Nova Canvas", category: "AI" }
    ]
  },
  {
    name: "Image Processing",
    items: [
      { type: "image:crop", icon: "✂", name: "Crop", description: "Crop a region from an image using a bbox", category: "Image Processing" },
      { type: "image:resize", icon: "⤢", name: "Resize", description: "Resize an image to target dimensions", category: "Image Processing" },
      { type: "image:transform", icon: "↻", name: "Transform", description: "Rotate, flip or flop an image", category: "Image Processing" },
      { type: "image:format-convert", icon: "⇌", name: "Format Convert", description: "Convert image to JPEG, PNG, WebP or AVIF", category: "Image Processing" },
      { type: "image:sharpen", icon: "◈", name: "Sharpen", description: "Apply unsharp-mask sharpening", category: "Image Processing" },
      { type: "image:watermark", icon: "⊕", name: "Watermark", description: "Composite an overlay image onto the source", category: "Image Processing" },
      { type: "image:adjust-bw", icon: "◐", name: "Adjust B/W", description: "Convert image to black and white", category: "Image Processing" },
      { type: "image:adjust-layer", icon: "𝍩", name: "Adjust Layers", description: "Apply stacked colour/filter adjustments", category: "Image Processing" }
    ]
  },
  {
    name: "Logic",
    items: [
      { type: "condition", icon: "🔀", name: "Condition", description: "Branch on an expression", category: "Logic" },
      { type: "fork", icon: "🍴", name: "Fork", description: "Split into parallel branches", category: "Logic" },
      { type: "join", icon: "🔗", name: "Join", description: "Combine parallel branches", category: "Logic" },
      { type: "scatter", icon: "⑂", name: "Scatter", description: "Fan out over an array — one arm per item", category: "Logic" },
      { type: "approval", icon: "✅", name: "Approval", description: "Wait for a human decision", category: "Logic" },
      { type: "transform", icon: "🔧", name: "Transform", description: "Reshape the context", category: "Logic" }
    ]
  },
  {
    name: "Storage",
    items: [
      { type: "image-source", icon: "🖼", name: "Image Source", description: "Inject an image into the pipeline context", category: "Storage" },
      { type: "image:save", icon: "⬇", name: "Save Image", description: "Write produced image to artifact store", category: "Storage" },
      { type: "action", icon: "🎯", name: "Action", description: "Produce a side effect", category: "Storage" }
    ]
  },
  {
    name: "Data",
    items: [
      { type: "knowledge-base", icon: "📚", name: "Knowledge Base", description: "RAG retrieval from Bedrock KB", category: "Data" },
      { type: "graph-query", icon: "🕸️", name: "Graph Query", description: "Neptune openCypher query", category: "Data" },
      { type: "memory", icon: "💾", name: "Memory", description: "AgentCore Memory read/write", category: "Data" }
    ]
  },
  {
    name: "Tools",
    items: [
      { type: "mcp-tool", icon: "🔌", name: "MCP Tool", description: "Invoke an MCP Gateway tool", category: "Tools" },
      { type: "agent", icon: "🤖", name: "Agent", description: "Invoke a Strands agent via A2A", category: "Tools" },
      { type: "guardrail", icon: "🛡️", name: "Guardrail", description: "Bedrock Guardrails content filter", category: "Tools" },
      { type: "policy", icon: "📜", name: "Policy", description: "Cedar authorization policy", category: "Tools" },
      { type: "ag-ui-output", icon: "📡", name: "AG-UI Output", description: "Stream to AG-UI frontend", category: "Tools" }
    ]
  }
], qi = At.flatMap((t) => t.items.map((n) => ({ type: n.type, name: n.name }))), Vi = At.map((t) => t.name), zn = "pipeline.palette.recents", Wi = 5, er = "pipeline.palette.compact";
function An() {
  if (typeof window > "u") return [];
  try {
    const t = window.localStorage.getItem(zn);
    if (!t) return [];
    const n = JSON.parse(t);
    return Array.isArray(n) ? n : [];
  } catch {
    return [];
  }
}
function Ji(t) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(zn, JSON.stringify(t));
    } catch {
    }
}
function ph(t) {
  const n = An().filter((a) => a !== t), r = [t, ...n].slice(0, Wi);
  Ji(r);
}
const yo = "pipeline.palette.collapsed.";
function Hi(t) {
  if (typeof window > "u") return !1;
  try {
    return window.localStorage.getItem(yo + t) === "true";
  } catch {
    return !1;
  }
}
function Ki(t, n) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(yo + t, String(n));
    } catch {
    }
}
function Gi(t, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return t.name.toLowerCase().includes(r) || t.type.toLowerCase().includes(r) || t.description.toLowerCase().includes(r);
}
function tr({ expanded: t }) {
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
function Yi({ disabledTypes: t = [] }) {
  const [n, r] = S(""), [a, i] = S(/* @__PURE__ */ new Set()), [s, d] = S(null), [c, l] = S(() => An()), [p, u] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem(er) === "true";
    } catch {
      return !1;
    }
  }), [f, h] = S(() => {
    const R = {};
    for (const j of At)
      R[j.name] = Hi(j.name);
    return R;
  }), x = q(() => new Set(t), [t]);
  ee(() => {
    const R = (j) => {
      j.key === zn && l(An());
    };
    return window.addEventListener("storage", R), () => window.removeEventListener("storage", R);
  }, []), ee(() => {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(er, String(p));
      } catch {
      }
  }, [p]);
  const g = D((R) => {
    i((j) => {
      const W = new Set(j);
      return W.has(R) ? W.delete(R) : W.add(R), W;
    });
  }, []), m = D(() => {
    r(""), i(/* @__PURE__ */ new Set());
  }, []), N = D((R) => {
    h((j) => {
      const W = { ...j, [R]: !j[R] };
      return Ki(R, W[R]), W;
    });
  }, []), v = q(() => {
    const R = /* @__PURE__ */ new Map();
    for (const j of At)
      for (const W of j.items) R.set(W.type, W);
    return R;
  }, []), y = q(
    () => c.map((R) => v.get(R)).filter(Boolean),
    [c, v]
  ), w = q(() => At.map((R) => {
    const j = a.size > 0 && !a.has(R.name) ? [] : R.items.filter((W) => Gi(W, n));
    return { ...R, items: j };
  }).filter((R) => R.items.length > 0), [n, a]), b = q(() => {
    const R = /* @__PURE__ */ new Set(), j = [];
    if (!n && a.size === 0)
      for (const W of y)
        j.push(W), R.add(W.type);
    for (const W of w)
      for (const ae of W.items)
        R.has(ae.type) || (j.push(ae), R.add(ae.type));
    return j;
  }, [y, w, n, a]), k = ie(b);
  ee(() => {
    k.current = b;
  }, [b]);
  const C = w.length === 0 && (n !== "" || a.size > 0), A = (R) => (j) => {
    if (x.has(R.type)) {
      j.preventDefault();
      return;
    }
    j.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: R.type })
    ), j.dataTransfer.effectAllowed = "move";
  }, $ = (R, j) => {
    const W = x.has(R.type), ae = s === R.type && !W, Z = j !== null && j < 9 ? j + 1 : null;
    return p ? /* @__PURE__ */ o(
      "div",
      {
        draggable: !W,
        onDragStart: A(R),
        onMouseEnter: () => d(R.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-8 box-border my-px mx-2 px-2 flex items-center gap-2 rounded font-[inherit]",
          W ? "cursor-not-allowed opacity-45" : "cursor-grab",
          ae ? "bg-slate-100" : "bg-transparent"
        ),
        title: W ? `${R.name} is already placed` : Z ? `${R.description} — press ${Z}` : R.description,
        "data-node-type": R.type,
        "data-disabled": W || void 0,
        "data-testid": `palette-item-${R.type}`,
        children: [
          /* @__PURE__ */ e("span", { className: "text-base leading-none w-5 text-center shrink-0", "aria-hidden": !0, children: R.icon }),
          /* @__PURE__ */ e("span", { className: I("text-[12px] font-medium text-slate-800 truncate", W && "line-through"), children: R.name }),
          Z !== null && /* @__PURE__ */ e(
            "kbd",
            {
              "data-testid": `palette-shortcut-${R.type}`,
              className: I(
                "ml-auto text-[10px] font-semibold font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                W && "opacity-50"
              ),
              children: Z
            }
          )
        ]
      },
      R.type
    ) : /* @__PURE__ */ o(
      "div",
      {
        draggable: !W,
        onDragStart: A(R),
        onMouseEnter: () => d(R.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-11 box-border my-0.5 mx-2 py-1.5 px-2.5 flex items-center gap-2.5 rounded-md border border-transparent font-[inherit]",
          W ? "cursor-not-allowed opacity-45" : "cursor-grab",
          ae ? "bg-slate-50" : "bg-transparent"
        ),
        title: W ? `${R.name} is already placed` : Z ? `${R.description} — press ${Z}` : R.description,
        "data-node-type": R.type,
        "data-disabled": W || void 0,
        "data-testid": `palette-item-${R.type}`,
        children: [
          /* @__PURE__ */ e("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: R.icon }),
          /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ o("div", { className: I("text-[13px] font-semibold text-slate-900 flex items-center gap-1.5", W && "line-through"), children: [
              /* @__PURE__ */ e("span", { className: "truncate", children: R.name }),
              Z !== null && /* @__PURE__ */ e(
                "kbd",
                {
                  "data-testid": `palette-shortcut-${R.type}`,
                  className: I(
                    "text-[10px] font-semibold font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                    W && "opacity-50"
                  ),
                  children: Z
                }
              )
            ] }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-slate-500 truncate", children: W ? "Placed" : R.description })
          ] })
        ]
      },
      R.type
    );
  }, T = y.length > 0 && !n && a.size === 0;
  let M = 0;
  return /* @__PURE__ */ o(
    "div",
    {
      className: "w-[220px] shrink-0 h-full border-r border-slate-200 bg-white flex flex-col",
      "data-testid": "node-palette",
      children: [
        /* @__PURE__ */ o("div", { className: "shrink-0 border-b border-slate-200", children: [
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
                className: "flex-1 min-w-0 border border-slate-300 rounded-md py-1.5 px-2.5 text-[13px] font-[inherit] bg-slate-50 text-slate-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 placeholder:text-slate-400"
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
                  p ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-300 text-slate-500 hover:bg-slate-50"
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
              children: Vi.map((R) => /* @__PURE__ */ e(
                ga,
                {
                  size: "xs",
                  active: a.has(R),
                  onClick: () => g(R),
                  "data-testid": `palette-chip-${R}`,
                  children: R
                },
                R
              ))
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto py-1", "data-testid": "palette-scroll", children: [
          T && /* @__PURE__ */ o("div", { "data-testid": "palette-recents", children: [
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: () => N("__recents__"),
                className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-slate-400 hover:text-slate-600 transition-colors font-[inherit]",
                "aria-expanded": !f.__recents__,
                children: [
                  /* @__PURE__ */ e(tr, { expanded: !f.__recents__ }),
                  "Recently used"
                ]
              }
            ),
            !f.__recents__ && /* @__PURE__ */ e("div", { children: y.map((R) => {
              const j = M++;
              return $(R, j);
            }) })
          ] }),
          C ? /* @__PURE__ */ o(
            "div",
            {
              className: "flex flex-col items-center gap-3 px-4 py-8 text-center",
              "data-testid": "palette-empty",
              children: [
                /* @__PURE__ */ e("span", { className: "text-xs text-slate-400", children: "No nodes match" }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    onClick: m,
                    "data-testid": "palette-clear-filters",
                    className: "text-[11px] font-semibold text-blue-600 hover:underline",
                    children: "Clear filters"
                  }
                )
              ]
            }
          ) : w.map((R) => {
            const j = !!f[R.name];
            return /* @__PURE__ */ o("div", { "data-testid": `palette-category-${R.name}`, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => N(R.name),
                  className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-slate-400 hover:text-slate-600 transition-colors font-[inherit]",
                  "aria-expanded": !j,
                  children: [
                    /* @__PURE__ */ e(tr, { expanded: !j }),
                    R.name
                  ]
                }
              ),
              !j && /* @__PURE__ */ e("div", { children: R.items.map((W) => {
                const ae = M++;
                return $(W, ae);
              }) })
            ] }, R.name);
          })
        ] }),
        /* @__PURE__ */ e("div", { className: "py-2 px-3 border-t border-slate-200 text-[10px] text-slate-400 font-[inherit] shrink-0", children: "Press 1–9 to insert at center" })
      ]
    }
  );
}
function Xi({
  definition: t,
  addNode: n,
  screenToFlowPosition: r,
  containerRef: a
}) {
  return ee(() => {
    const i = (s) => {
      if (!qn(s.target) && !(s.metaKey || s.ctrlKey || s.altKey) && /^[1-8]$/.test(s.key)) {
        const d = Number(s.key) - 1, c = qi[d];
        if (!c || c.type === "trigger" && t?.nodes.some((x) => x.type === "trigger"))
          return;
        const p = a.current?.getBoundingClientRect(), u = p ? r({
          x: p.left + p.width / 2,
          y: p.top + p.height / 2
        }) : { x: 0, y: 0 };
        let { x: f, y: h } = u;
        if (t)
          for (const x of t.nodes)
            Math.abs(x.position.x - f) < 16 && Math.abs(x.position.y - h) < 16 && (f += 24, h += 24);
        n(c.type, { x: f, y: h }), s.preventDefault();
      }
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [n, t, r, a]), null;
}
const Qi = 280, Zi = 120, es = 40, ts = 40;
function ns(t, n) {
  const r = Qi, a = Zi, i = es, s = ts;
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
      const v = N.shift(), y = p.get(v), w = d.get(v) ?? [];
      for (const b of w)
        p.has(b) || (p.set(b, y + 1), N.push(b));
    }
  }
  const u = /* @__PURE__ */ new Map();
  let f = -1;
  for (const N of t.nodes) {
    const v = p.get(N.id);
    v !== void 0 && (u.has(v) || u.set(v, []), u.get(v).push(N.id), v > f && (f = v));
  }
  for (const N of u.values())
    N.sort();
  const h = t.nodes.filter((N) => !p.has(N.id)).map((N) => N.id).sort(), x = f >= 0 ? f + 1 : 0;
  h.length > 0 && u.set(x, h);
  const g = [], m = [...u.keys()].sort((N, v) => N - v);
  for (const N of m) {
    const v = u.get(N), y = v.length, w = i + N * r;
    for (let b = 0; b < y; b++) {
      const k = s + (b - y / 2) * a;
      g.push({ id: v[b], position: { x: w, y: k } });
    }
  }
  return g;
}
function rs({
  definition: t,
  setPositions: n,
  fitView: r
}) {
  const a = D(() => {
    r({ padding: 0.15, duration: 500 });
  }, [r]), i = D(() => {
    if (!t) return;
    const s = ns(t);
    s.length !== 0 && (n(s), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => r({ padding: 0.15, duration: 500 })) : r({ padding: 0.15, duration: 500 }));
  }, [t, n, r]);
  return { handleFitView: a, handleAutoArrange: i };
}
function os({
  definition: t,
  setPositions: n,
  fitView: r
}) {
  const { handleFitView: a, handleAutoArrange: i } = rs({
    definition: t,
    setPositions: n,
    fitView: r
  });
  return ee(() => {
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
function qn(t) {
  if (!t || !(t instanceof HTMLElement)) return !1;
  const n = t.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || t.isContentEditable);
}
function as(t) {
  if (t.nodes.length === 0) return [];
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const s of t.nodes)
    n.set(s.id, []), r.set(s.id, 0);
  for (const s of t.edges)
    !n.has(s.source) || !r.has(s.target) || (n.get(s.source).push(s.target), r.set(s.target, (r.get(s.target) ?? 0) + 1));
  const a = [], i = t.nodes.filter((s) => (r.get(s.id) ?? 0) === 0).map((s) => s.id).sort();
  for (; i.length > 0; ) {
    const s = i.shift();
    a.push(s);
    const d = (n.get(s) ?? []).slice().sort();
    for (const c of d) {
      const l = (r.get(c) ?? 0) - 1;
      r.set(c, l), l === 0 && i.push(c);
    }
  }
  if (a.length < t.nodes.length) {
    const s = new Set(a), d = t.nodes.filter((c) => !s.has(c.id)).map((c) => c.id).sort();
    a.push(...d);
  }
  return a;
}
const is = { animated: Oi }, ss = Ei;
function ls(t) {
  return {
    id: t.id,
    type: t.type,
    position: t.position,
    data: { ...t.data, nodeType: t.type }
  };
}
function cs(t) {
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
function ds({ onFilterLog: t, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: a, replayNodeClasses: i, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c }) {
  const {
    definition: l,
    addNode: p,
    setPositions: u,
    addEdge: f,
    removeEdge: h,
    removeNode: x,
    duplicateNodes: g,
    selectedNodeId: m,
    setSelectedNodeId: N,
    updateNodeData: v
  } = qe(), { screenToFlowPosition: y, fitView: w } = ma();
  Ui({
    addNode: p,
    addEdge: f,
    updateNodeData: v,
    getDefinition: () => l
  });
  const [b, k, C] = ho([]), [A, $, T] = fo([]), [M, R] = S(!0), [j, W] = S(!0), ae = ie(null), Z = ie(null), [oe, O] = S(null), [E, H] = S(null), J = D(
    (Y, re) => {
      Y.preventDefault(), H({ nodeId: re.id, x: Y.clientX, y: Y.clientY });
    },
    []
  ), L = D(() => {
    E && (t?.(E.nodeId), H(null));
  }, [E, t]), z = D(() => {
    if (!E) return;
    const Y = E.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(Y).catch(() => {
    }), H(null);
  }, [E]), V = D(() => {
    E && (d?.(E.nodeId), H(null));
  }, [E, d]), K = D(() => {
    if (!E) return;
    const Y = g([E.nodeId]);
    Y.length > 0 && N(Y[0]), H(null);
  }, [E, g, N]), de = D(() => H(null), []);
  ee(() => {
    if (!l) {
      k([]), $([]);
      return;
    }
    k((Y) => {
      const re = new Map(Y.map((pe) => [pe.id, pe]));
      return l.nodes.map((pe) => {
        const xe = re.get(pe.id), $e = ls(pe);
        return s && s.size > 0 && ($e.data._hasBreakpoint = s.has(pe.id)), c && ($e.data._pausedAtBreakpoint = pe.id === c), xe ? { ...xe, ...$e, selected: xe.selected } : $e;
      });
    }), $(() => l.edges.map(cs));
  }, [l, s, c, k, $]), ee(() => {
    if (!n) {
      r?.(null);
      return;
    }
    k(
      (Y) => Y.map((re) => ({
        ...re,
        className: re.id === n ? "node-error" : re.className?.replace("node-error", "").trim() || void 0
      }))
    ), requestAnimationFrame(() => {
      const Y = ae.current;
      if (!Y) return;
      const re = Y.querySelector(
        `.react-flow__node[data-id="${CSS.escape(n)}"]`
      );
      if (!re) {
        r?.(null);
        return;
      }
      const pe = re.getBoundingClientRect();
      r?.({ x: pe.right, y: pe.top + pe.height / 2 });
    });
  }, [n, k, r]), ee(() => {
    i && k(
      (Y) => Y.map((re) => {
        const pe = i[re.id] ?? "", $e = [re.id === n ? "node-error" : "", pe].filter(Boolean).join(" ") || void 0;
        let Ce;
        pe === "node-replay-active" ? Ce = "running" : pe === "node-replay-completed" ? Ce = "completed" : pe === "node-replay-failed" && (Ce = "failed");
        const Ve = { ...re.data };
        return Ce ? Ve._state = Ce : Ve._state = "idle", { ...re, className: $e, data: Ve };
      })
    );
  }, [i, n, k]), ee(() => {
    a && $(
      (Y) => Y.map((re) => {
        const pe = a[re.id];
        if (!pe) return re;
        const xe = re.data ?? {};
        return xe.state === pe ? re : { ...re, data: { ...xe, state: pe } };
      })
    );
  }, [a, $]);
  const F = D(
    (Y) => {
      C(Y);
      const re = [], pe = [];
      for (const xe of Y)
        xe.type === "position" && xe.position && xe.dragging === !1 ? re.push({ id: xe.id, position: xe.position }) : xe.type === "remove" && pe.push(xe.id);
      re.length && u(re);
      for (const xe of pe) x(xe);
    },
    [C, u, x]
  ), se = D(
    (Y) => {
      T(Y);
      for (const re of Y)
        re.type === "remove" && h(re.id);
    },
    [T, h]
  ), ye = D(
    (Y) => {
      if (!l || !Y.source || !Y.target) return;
      const re = l.nodes.find((Ce) => Ce.id === Y.source), pe = l.nodes.find((Ce) => Ce.id === Y.target);
      if (!re || !pe) return;
      const xe = Y.sourceHandle ?? "out", $e = Y.targetHandle ?? "in";
      Tn(
        re.type,
        xe,
        pe.type,
        $e
      ) && f({
        source: Y.source,
        sourceHandle: xe,
        target: Y.target,
        targetHandle: $e
      });
    },
    [l, f]
  ), Me = D(
    (Y) => {
      if (!l || !Y.source || !Y.target) return !1;
      const re = l.nodes.find((xe) => xe.id === Y.source), pe = l.nodes.find((xe) => xe.id === Y.target);
      return !re || !pe ? !1 : Tn(
        re.type,
        Y.sourceHandle ?? "out",
        pe.type,
        Y.targetHandle ?? "in"
      );
    },
    [l]
  ), He = D(
    (Y, re) => {
      N(re.id);
    },
    [N]
  ), _e = D(() => {
    N(null);
  }, [N]), Re = D(
    (Y) => {
      const re = Y.target;
      if (!re || !(re.classList.contains("react-flow__pane") || re.classList.contains("react-flow__renderer") || re.classList.contains("react-flow__viewport") || re.classList.contains("react-flow"))) return;
      Y.preventDefault();
      const xe = y({ x: Y.clientX, y: Y.clientY });
      O({
        anchor: { x: Y.clientX, y: Y.clientY },
        flowPosition: xe
      });
    },
    [y]
  ), Ue = D(() => O(null), []), Le = D(
    (Y, re) => {
      p(Y, re);
    },
    [p]
  ), Fe = q(() => l ? l.nodes.some((Y) => Y.type === "trigger") ? ["trigger"] : [] : [], [l]), { handleDragOver: we, handleDrop: he } = ji({
    addNode: p,
    screenToFlowPosition: y
  });
  ee(() => {
    const Y = (re) => {
      if (!qn(re.target) && !(re.metaKey || re.ctrlKey || re.altKey)) {
        if (re.key === "m" || re.key === "M") {
          R((pe) => !pe);
          return;
        }
        if (re.key === "c" || re.key === "C") {
          W((pe) => !pe);
          return;
        }
      }
    };
    return window.addEventListener("keydown", Y), () => window.removeEventListener("keydown", Y);
  }, []), Fi({
    definition: l,
    selectedNodeId: m,
    setSelectedNodeId: N,
    removeNode: x,
    removeDefEdge: h,
    setNodes: k,
    setEdges: $,
    setPositions: u,
    duplicateNodes: g,
    clipboardRef: Z,
    containerRef: ae
  });
  const ne = D((Y) => {
    switch (Y.data?._state) {
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
      ref: ae,
      className: "flex-1 min-w-0 min-h-[520px] relative bg-[#fafbfc]",
      role: "application",
      "aria-label": "Pipeline editor canvas",
      tabIndex: 0,
      "data-testid": "pipeline-canvas",
      onDragOver: we,
      onDrop: he,
      onDoubleClick: Re,
      children: [
        /* @__PURE__ */ o(
          xo,
          {
            nodes: b,
            edges: A,
            nodeTypes: ss,
            edgeTypes: is,
            onNodesChange: F,
            onEdgesChange: se,
            onConnect: ye,
            isValidConnection: Me,
            onNodeClick: He,
            onNodeContextMenu: J,
            onPaneClick: _e,
            fitView: !0,
            snapToGrid: !0,
            snapGrid: [16, 16],
            edgesFocusable: !0,
            defaultEdgeOptions: { type: "smoothstep" },
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ e(
                go,
                {
                  variant: ha.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              j ? /* @__PURE__ */ e(
                bo,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              M ? /* @__PURE__ */ e(
                fa,
                {
                  position: "bottom-right",
                  pannable: !0,
                  zoomable: !0,
                  className: "!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]",
                  maskColor: "rgba(15, 23, 42, 0.04)",
                  nodeColor: ne,
                  nodeStrokeColor: "#e2e8f0"
                }
              ) : null
            ]
          }
        ),
        oe ? /* @__PURE__ */ e(
          Bi,
          {
            anchor: oe.anchor,
            flowPosition: oe.flowPosition,
            disabledTypes: Fe,
            onClose: Ue,
            onInsert: Le
          }
        ) : null,
        /* @__PURE__ */ e(
          Xi,
          {
            definition: l,
            addNode: p,
            screenToFlowPosition: y,
            containerRef: ae
          }
        ),
        /* @__PURE__ */ e(
          os,
          {
            definition: l,
            setPositions: u,
            fitView: w
          }
        ),
        E ? /* @__PURE__ */ e(
          zi,
          {
            nodeMenu: E,
            breakpoints: s,
            showBreakpointOption: !!d,
            onFilterLog: L,
            onCopyNodeId: z,
            onDuplicate: K,
            onToggleBreakpoint: V,
            onDismiss: de
          }
        ) : null
      ]
    }
  );
}
function ps({ onFilterLog: t, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: a, replayNodeClasses: i, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c } = {}) {
  return /* @__PURE__ */ e(ua, { children: /* @__PURE__ */ e(
    ds,
    {
      onFilterLog: t,
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
const nr = {
  LLMError: { bg: "#fef2f2", fg: "#dc2626" },
  TimeoutError: { bg: "#fff7ed", fg: "#ea580c" },
  NetworkError: { bg: "#fffbeb", fg: "#d97706" },
  ValidationError: { bg: "#fefce8", fg: "#ca8a04" },
  RegistryConflict: { bg: "#faf5ff", fg: "#9333ea" },
  UnknownError: { bg: "#f1f5f9", fg: "#475569" }
};
function us(t) {
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
function ms({ error: t, anchor: n, onDismiss: r, onRetry: a }) {
  const [i, s] = S(!1), [d, c] = S(!1), l = t.errorCategory ?? "UnknownError", p = nr[l] ?? nr.UnknownError, u = D(async () => {
    const g = [
      `Error Category: ${l}`,
      `Node ID: ${t.nodeId}`,
      `Message: ${t.message}`,
      t.stack ? `
Stack Trace:
${t.stack}` : ""
    ].filter(Boolean).join(`
`);
    try {
      typeof navigator < "u" && navigator.clipboard?.writeText && (await navigator.clipboard.writeText(g), c(!0), setTimeout(() => c(!1), 2e3));
    } catch {
    }
  }, [t, l]), f = D(() => {
    a?.();
  }, [a]), h = Math.min(n.y + 8, window.innerHeight - 440), x = Math.min(n.x + 12, window.innerWidth - 360);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "fixed z-[100] bg-white border border-[#e2e8f0] rounded-[10px] shadow-[0_12px_32px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.08)] p-0 w-[340px] max-h-[420px] overflow-y-auto font-inherit text-[#0f172a]",
      style: { top: Math.max(8, h), left: Math.max(8, x) },
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
              children: us(l)
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
                onClick: () => s((g) => !g),
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
function hs(t, n) {
  const r = /* @__PURE__ */ new Map();
  for (const i of t)
    r.set(i.id, []);
  for (const i of n) {
    const s = r.get(i.source);
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
function vo(t) {
  const n = [], r = [], { nodes: a, edges: i } = t, s = /* @__PURE__ */ new Map();
  for (const d of a)
    s.set(d.id, d);
  return fs(a, n), xs(a, i, n), gs(i, s, n), bs(a, n), Ss(a, i, n), $s(a, i, r), Ts(a, i, r), As(a, i, r), Rs(a, i, r), r.push(...Ps(t)), r.push(...Ms(t)), r.push(...Es(t)), r.push(...Ds(t)), r.push(...Os(t)), r.push(..._s(t)), r.push(...Ls(t)), r.push(...Bs(t)), r.push(...Us(t)), r.push(...Fs(t)), {
    errors: n,
    warnings: r,
    isValid: n.length === 0,
    canPublish: n.length === 0
  };
}
function fs(t, n) {
  const r = t.filter((a) => a.type === "trigger");
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
function xs(t, n, r) {
  const a = hs(t, n);
  a !== null && r.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: a
  });
}
function gs(t, n, r) {
  for (const a of t) {
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
    Tn(
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
function bs(t, n) {
  for (const r of t)
    switch (r.data.type) {
      case "llm":
        ys(r.id, r.data, n);
        break;
      case "transform":
        vs(r.id, r.data, n);
        break;
      case "condition":
        Ns(r.id, r.data, n);
        break;
      case "action":
        ws(r.id, r.data, n);
        break;
      case "fork":
        ks(r.id, r.data, n);
        break;
      case "join":
        Cs(r.id, r.data, n);
        break;
      case "approval":
        Is(r.id, r.data, n);
        break;
    }
}
function ys(t, n, r) {
  n.provider || ze(r, t, "provider"), (!n.model || !n.model.trim()) && ze(r, t, "model"), (!n.systemPrompt || !n.systemPrompt.trim()) && ze(r, t, "systemPrompt"), (!n.userPromptTemplate || !n.userPromptTemplate.trim()) && ze(r, t, "userPromptTemplate");
}
function vs(t, n, r) {
  n.transformType || ze(r, t, "transformType"), (!n.expression || !n.expression.trim()) && ze(r, t, "expression");
}
function Ns(t, n, r) {
  (!n.expression || !n.expression.trim()) && ze(r, t, "expression");
}
function ws(t, n, r) {
  n.actionType || ze(r, t, "actionType");
}
function ks(t, n, r) {
  (typeof n.branchCount != "number" || n.branchCount < 2) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: t,
    field: "branchCount"
  });
}
function Cs(t, n, r) {
  n.mode || ze(r, t, "mode"), n.mergeStrategy || ze(r, t, "mergeStrategy"), n.mode === "n_of_m" && (typeof n.n != "number" || n.n < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: t,
    field: "n"
  });
}
function Is(t, n, r) {
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
function Ss(t, n, r) {
  const a = /* @__PURE__ */ new Map();
  for (const i of n)
    a.set(i.target, (a.get(i.target) ?? 0) + 1);
  for (const i of t) {
    if (i.type !== "join") continue;
    (a.get(i.id) ?? 0) < 2 && r.push({
      code: "JOIN_INSUFFICIENT_INPUTS",
      severity: "error",
      message: "Join node requires at least 2 incoming edges.",
      nodeId: i.id
    });
  }
}
function ze(t, n, r) {
  t.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: `Missing required field '${r}'.`,
    nodeId: n,
    field: r
  });
}
function $s(t, n, r) {
  const a = t.filter((c) => c.type === "trigger");
  if (a.length !== 1) return;
  const i = /* @__PURE__ */ new Map();
  for (const c of t) i.set(c.id, []);
  for (const c of n)
    i.get(c.source)?.push(c.target);
  const s = /* @__PURE__ */ new Set(), d = [a[0].id];
  for (s.add(a[0].id); d.length > 0; ) {
    const c = d.shift();
    for (const l of i.get(c) ?? [])
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
function Ts(t, n, r) {
  const a = /* @__PURE__ */ new Set();
  for (const i of n) a.add(i.source);
  for (const i of t)
    a.has(i.id) || i.data.terminal !== !0 && r.push({
      code: "DEAD_END",
      severity: "warning",
      message: "Node has no outgoing edges.",
      nodeId: i.id
    });
}
function As(t, n, r) {
  const a = /* @__PURE__ */ new Map();
  for (const i of n) {
    const s = a.get(i.source) ?? /* @__PURE__ */ new Set();
    s.add(i.sourceHandle), a.set(i.source, s);
  }
  for (const i of t) {
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
function Rs(t, n, r) {
  const a = /* @__PURE__ */ new Map();
  for (const i of n) {
    const s = a.get(i.source) ?? /* @__PURE__ */ new Set();
    s.add(i.sourceHandle), a.set(i.source, s);
  }
  for (const i of t) {
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
function Ye(t) {
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
function Ps(t) {
  const n = [], r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const c of t.nodes)
    r.set(c.id, []), a.set(c.id, []);
  for (const c of t.edges)
    c.sourceHandle !== "error" && r.get(c.source)?.push(c.target), a.get(c.target)?.push(c.source);
  const i = /* @__PURE__ */ new Map();
  for (const c of t.nodes) i.set(c.id, c);
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
  for (const c of t.nodes)
    c.data.type !== "llm" && c.data.type !== "action" || t.edges.some(
      (p) => p.source === c.id && p.sourceHandle === "error"
    ) || d(c.id) && s(c.id) || n.push({
      code: "NO_ERROR_HANDLER",
      severity: "warning",
      message: `${c.data.type} node '${Ye(c)}' has no error handler — failures will terminate the run.`,
      nodeId: c.id
    });
  return n;
}
function Ms(t) {
  const n = [];
  for (const r of t.nodes)
    r.data.type === "llm" && (typeof r.data.maxTokens != "number" || r.data.maxTokens <= 0) && n.push({
      code: "LLM_NO_MAX_TOKENS",
      severity: "warning",
      message: `LLM node '${Ye(r)}' has no maxTokens — responses could run long / expensive.`,
      nodeId: r.id,
      field: "maxTokens"
    });
  return n;
}
function Es(t) {
  const n = [];
  for (const r of t.nodes)
    r.data.type === "approval" && (typeof r.data.timeoutMs != "number" || r.data.timeoutMs <= 0) && n.push({
      code: "UNGUARDED_APPROVAL_TIMEOUT",
      severity: "warning",
      message: `Approval '${Ye(r)}' has no timeout — the run could block indefinitely.`,
      nodeId: r.id,
      field: "timeoutMs"
    });
  return n;
}
function Ds(t) {
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
function Os(t) {
  const r = t.nodes.filter((p) => p.type === "trigger");
  if (r.length !== 1) return [];
  const a = /* @__PURE__ */ new Map();
  for (const p of t.nodes) a.set(p.id, []);
  for (const p of t.edges) a.get(p.source)?.push(p.target);
  const i = /* @__PURE__ */ new Map(), s = [r[0].id];
  i.set(r[0].id, 1);
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
function _s(t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of t.nodes) {
    const i = Ye(a), s = r.get(i) ?? [];
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
function Ls(t) {
  const n = [], r = /\{\{[^}]+\}\}/;
  for (const a of t.nodes) {
    if (a.data.type !== "llm") continue;
    const { temperature: i, userPromptTemplate: s } = a.data;
    typeof i != "number" || i <= 0.8 || !s || !r.test(s) || n.push({
      code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
      severity: "warning",
      message: `LLM '${Ye(a)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
      nodeId: a.id
    });
  }
  return n;
}
function Bs(t) {
  return t.triggerBinding?.event !== "schedule" ? [] : t.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function Us(t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of t.edges) {
    const i = r.get(a.source) ?? /* @__PURE__ */ new Set();
    i.add(a.sourceHandle), r.set(a.source, i);
  }
  for (const a of t.nodes) {
    if (a.type !== "condition") continue;
    const i = r.get(a.id) ?? /* @__PURE__ */ new Set(), s = i.has("true"), d = i.has("false");
    s && !d && n.push({
      code: "UNREACHABLE_AFTER_CONDITION_FALSE",
      severity: "warning",
      message: `Condition '${Ye(a)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: a.id,
      field: "false"
    });
  }
  return n;
}
function Fs(t) {
  const n = [], r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const c of t.nodes)
    r.set(c.id, []), a.set(c.id, []);
  for (const c of t.edges)
    r.get(c.source)?.push({ target: c.target, sourceHandle: c.sourceHandle }), a.get(c.target)?.push(c.source);
  const i = /* @__PURE__ */ new Map();
  for (const c of t.nodes) i.set(c.id, c);
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
  for (const c of t.nodes) {
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
      message: `Fork '${Ye(c)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
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
    (u || f.length !== 1) && n.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Join '${Ye(c)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: c.id
    });
  }
  return n;
}
function js(t, n) {
  return `${t}${n}`;
}
const zs = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, qs = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function No(t) {
  return t.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const Vs = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function Ws(t) {
  const n = qs[t.type] ?? "■", r = Vs[t.type] ?? t.type.charAt(0).toUpperCase() + t.type.slice(1);
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
  const i = `${n} ${r}`;
  return No(a ? `${i}<br/>${a}` : i);
}
function Js(t, n) {
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
function Hs(t) {
  return !t || t === "out" ? null : t;
}
function Ks(t) {
  const n = ["flowchart TD"], r = {}, a = /* @__PURE__ */ new Map();
  for (const i of t.nodes) {
    const s = zs[i.type] ?? "n", d = r[s] = (r[s] ?? 0) + 1;
    a.set(i.id, js(s, d));
  }
  for (const i of t.nodes) {
    const s = a.get(i.id);
    if (!s) continue;
    const d = Js(i.type, Ws(i));
    n.push(`  ${s}${d}`);
  }
  for (const i of t.edges) {
    const s = a.get(i.source), d = a.get(i.target);
    if (!s || !d) continue;
    const c = Hs(i.sourceHandle);
    c ? n.push(`  ${s} --"${No(c)}"--> ${d}`) : n.push(`  ${s} --> ${d}`);
  }
  return n.join(`
`);
}
function rr(t) {
  return JSON.stringify(t, (n, r) => {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const a = Object.keys(r).sort(), i = {};
      for (const s of a) i[s] = r[s];
      return i;
    }
    return r;
  });
}
function or(t) {
  const n = /* @__PURE__ */ new Map();
  for (const r of t) n.set(r.id, r);
  return n;
}
function ar(t) {
  return new Set(t.edges.map((n) => n.id));
}
function Gs(t, n) {
  if (!n)
    return {
      addedNodes: t.nodes.map((y) => ({
        node: y,
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
  const r = or(t.nodes), a = or(n.nodes), i = [], s = [], d = [];
  for (const [y, w] of r) {
    const b = a.get(y);
    if (!b) {
      i.push({ node: w, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const k = rr(w.data) !== rr(b.data), C = w.position.x !== b.position.x || w.position.y !== b.position.y;
    (k || C) && d.push({ node: w, dataChanged: k, positionChanged: C });
  }
  for (const [y, w] of a)
    r.has(y) || s.push({ node: w, dataChanged: !0, positionChanged: !1 });
  const c = ar(t), l = ar(n);
  let p = 0, u = 0;
  for (const y of c) l.has(y) || p++;
  for (const y of l) c.has(y) || u++;
  const f = t.name !== n.name, h = (t.icon ?? "") !== (n.icon ?? ""), x = new Set(t.tags ?? []), g = new Set(n.tags ?? []), m = [], N = [];
  for (const y of x) g.has(y) || m.push(y);
  for (const y of g) x.has(y) || N.push(y);
  const v = m.length > 0 || N.length > 0;
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
    tagsRemoved: N
  };
}
const Ys = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function Xs(t) {
  return t.data.type === "condition" && t.data.label ? t.data.label : t.data.type === "llm" ? t.data.model : t.data.type === "action" ? t.data.actionType : t.data.type === "trigger" ? t.data.triggerType : t.type.charAt(0).toUpperCase() + t.type.slice(1);
}
function sn(t, n, r) {
  const a = t.node, i = Ys[a.type] ?? "■", s = n !== "removed" && !!r;
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
        /* @__PURE__ */ e("span", { className: "text-sm", children: i }),
        /* @__PURE__ */ e("span", { className: "font-semibold", children: a.type }),
        /* @__PURE__ */ e("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: Xs(a) }),
        n === "modified" && t.positionChanged ? /* @__PURE__ */ e("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]", children: "moved" }) : null
      ]
    },
    `${n}-${t.node.id}`
  );
}
function Qs({
  open: t,
  onClose: n,
  currentDef: r,
  publishedDef: a,
  onJumpToNode: i
}) {
  const s = q(
    () => Gs(r, a),
    [r, a]
  ), d = (u) => {
    i && i(u), n();
  }, c = a !== null, l = r.version, p = r.publishedVersion;
  return /* @__PURE__ */ o(
    Je,
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
        r.publishedVersion === void 0 ? /* @__PURE__ */ e("p", { className: "m-0 text-[13px] text-text-secondary", children: "This pipeline has never been published." }) : c ? /* @__PURE__ */ o(G, { children: [
          /* @__PURE__ */ o("div", { className: "flex gap-3 flex-wrap", children: [
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Added (",
                s.addedNodes.length,
                ")"
              ] }),
              s.addedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.addedNodes.map((u) => sn(u, "added", d))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Removed (",
                s.removedNodes.length,
                ")"
              ] }),
              s.removedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.removedNodes.map((u) => sn(u, "removed", void 0))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Modified (",
                s.modifiedNodes.length,
                ")"
              ] }),
              s.modifiedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.modifiedNodes.map((u) => sn(u, "modified", d))
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
function Zs({ open: t, onClose: n }) {
  return null;
}
const ln = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", ir = "px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function el(t) {
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
    onClearRunsConfirm: x,
    versionDiffOpen: g,
    onVersionDiffClose: m,
    currentDef: N,
    publishedDef: v,
    onJumpToNode: y,
    simPanelOpen: w,
    onSimPanelClose: b
  } = t;
  return /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ e(
      Je,
      {
        open: n,
        onClose: r,
        title: "Publish pipeline?",
        maxWidth: 420,
        footer: /* @__PURE__ */ o(G, { children: [
          /* @__PURE__ */ e("button", { onClick: r, className: ln, children: "Cancel" }),
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
      Je,
      {
        open: l,
        onClose: p,
        title: "Delete pipeline?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(G, { children: [
          /* @__PURE__ */ e("button", { onClick: p, className: ln, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: u, className: ir, children: "Delete" })
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
      Je,
      {
        open: f,
        onClose: h,
        title: "Clear run history?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(G, { children: [
          /* @__PURE__ */ e("button", { onClick: h, className: ln, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: x, className: ir, children: "Clear history" })
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
      Qs,
      {
        open: g,
        onClose: m,
        currentDef: N,
        publishedDef: v,
        onJumpToNode: y
      }
    ),
    /* @__PURE__ */ e(
      Zs,
      {
        open: w,
        onClose: b
      }
    )
  ] });
}
function tl({ runId: t, visible: n }) {
  const [r, a] = S(/* @__PURE__ */ new Map()), i = ie(null), s = ie(!0), d = ie(null);
  ee(() => {
    t !== d.current && (d.current = t, a(/* @__PURE__ */ new Map()), s.current = !0);
  }, [t]);
  const c = D(() => {
    const x = i.current;
    if (!x) return;
    const g = x.scrollHeight - x.scrollTop - x.clientHeight < 30;
    s.current = g;
  }, []), l = D(() => {
    if (!s.current) return;
    const x = i.current;
    x && (x.scrollTop = x.scrollHeight);
  }, []), p = D(
    (x) => {
      if (!("eventType" in x)) return;
      const { eventType: g, payload: m } = x;
      if (!g.startsWith("pipeline.llm.")) return;
      const N = m?.runId;
      if (!t || N !== t) return;
      const v = m?.stepId;
      if (v) {
        if (g === "pipeline.llm.stream.opened")
          a((y) => {
            const w = new Map(y);
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
        else if (g === "pipeline.llm.token") {
          const y = m?.token;
          if (y === void 0) return;
          a((w) => {
            const b = new Map(w), k = b.get(v);
            if (k) {
              const C = {
                ...k,
                tokens: [...k.tokens, y],
                text: k.text + y,
                active: !0
              };
              b.set(v, C);
            } else
              b.set(v, {
                stepId: v,
                tokens: [y],
                text: y,
                active: !0,
                summary: null,
                collapsed: !1,
                startedAt: Date.now()
              });
            return b;
          });
        } else if (g === "pipeline.llm.response") {
          const y = m?.tokensIn, w = m?.tokensOut;
          a((b) => {
            const k = new Map(b), C = k.get(v), A = C ? Date.now() - C.startedAt : 0, $ = A > 1e3 ? `${(A / 1e3).toFixed(1)}s` : `${A}ms`, T = `${v}: ${y ?? "?"} tokens in, ${w ?? "?"} tokens out (${$})`;
            return C ? k.set(v, {
              ...C,
              active: !1,
              summary: T
            }) : k.set(v, {
              stepId: v,
              tokens: [],
              text: "",
              active: !1,
              summary: T,
              collapsed: !1,
              startedAt: Date.now()
            }), k;
          });
        }
      }
    },
    [t]
  );
  Pe("*", p), ee(() => {
    l();
  }, [r, l]);
  const u = D((x) => {
    a((g) => {
      const m = new Map(g), N = m.get(x);
      return N && m.set(x, { ...N, collapsed: !N.collapsed }), m;
    });
  }, []), f = q(() => {
    for (const x of r.values())
      if (x.active) return !0;
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
            children: h.length === 0 ? /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-full text-[#6c7086] text-[13px] italic", children: t ? "Waiting for LLM output..." : "No active run" }) : h.map((x) => /* @__PURE__ */ o("div", { children: [
              /* @__PURE__ */ o(
                "div",
                {
                  className: I(
                    "flex items-center gap-2 py-1.5 cursor-pointer select-none text-[11px] font-semibold border-b border-[#313244] mb-1.5",
                    x.active ? "text-[#89b4fa]" : "text-[#a6adc8]"
                  ),
                  onClick: () => u(x.stepId),
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (g) => {
                    (g.key === "Enter" || g.key === " ") && u(x.stepId);
                  },
                  children: [
                    /* @__PURE__ */ e("span", { className: "text-[10px]", children: x.collapsed ? "▶" : "▼" }),
                    /* @__PURE__ */ e("span", { children: x.stepId }),
                    x.active && /* @__PURE__ */ e("span", { className: "text-[#a6e3a1] text-[10px]", children: "streaming" })
                  ]
                }
              ),
              !x.collapsed && /* @__PURE__ */ o(G, { children: [
                x.text.length > 0 && /* @__PURE__ */ o("div", { className: "whitespace-pre-wrap break-words m-0 mb-3 p-0 text-[#cdd6f4]", children: [
                  x.text,
                  x.active && /* @__PURE__ */ e("span", { className: "inline-block w-0.5 h-[14px] bg-[#89b4fa] ml-px align-text-bottom [animation:live-output-blink_1s_step-end_infinite]" })
                ] }),
                x.summary && /* @__PURE__ */ o("div", { className: "text-[11px] text-[#a6e3a1] font-semibold pt-1 pb-2 border-b border-[#313244] mb-2", children: [
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
function Rt(t, n) {
  const r = new Blob([n], { type: "application/json" }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(a);
}
function Pt(t, n) {
  if (!n) return "step";
  const r = t?.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function nl(t) {
  const n = ft(), { toast: r } = nn(), { definition: a, selectedNodeId: i, setSelectedNodeId: s } = qe(), d = ie(n.runs);
  ee(() => {
    d.current = n.runs;
  }, [n.runs]);
  const c = ie(a);
  ee(() => {
    c.current = a;
  }, [a]);
  const l = D(
    (P) => P ? d.current[P]?.pipelineId === t : !1,
    [t]
  ), [p, u] = S(null), [f, h] = S(null), x = D(() => {
    u(null), h(null);
  }, []), g = D(
    (P) => {
      h(P);
    },
    []
  ), m = D(
    (P) => {
      "eventType" in P || P.pipelineId === t && (r("Run started", { type: "info" }), u(null), h(null));
    },
    [t, r]
  ), N = D(
    (P) => {
      if ("eventType" in P || !l(P.runId)) return;
      const _ = Math.round(P.durationMs / 100) / 10;
      r(`Run completed in ${_}s`, { type: "success" });
    },
    [l, r]
  ), v = D(
    (P) => {
      if ("eventType" in P || !l(P.runId)) return;
      const _ = P.error.nodeId, le = Pt(c.current, _);
      r(`Run failed at ${le}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => s(_)
      }), u(P.error);
    },
    [l, s, r]
  ), y = D(
    (P) => {
      "eventType" in P || l(P.runId) && r("Run cancelled", { type: "warning" });
    },
    [l, r]
  ), w = D(
    (P) => {
      if ("eventType" in P || !l(P.runId)) return;
      const _ = P.stepId, le = Pt(c.current, _);
      r(`Approval requested on "${le}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => s(_)
      });
    },
    [l, s, r]
  );
  Pe("pipeline.run.started", m), Pe("pipeline.run.completed", N), Pe("pipeline.run.failed", v), Pe("pipeline.run.cancelled", y), Pe("pipeline.approval.requested", w);
  const [b, k] = S(null);
  ee(() => {
    if (n.activeRunIds.length > 0) {
      const P = n.activeRunIds[n.activeRunIds.length - 1];
      P !== b && k(P);
      return;
    }
    if (!b) {
      const P = Object.values(n.runs).sort(
        (_, le) => le.startedAt.localeCompare(_.startedAt)
      );
      P.length > 0 && k(P[0].id);
    }
  }, [n.activeRunIds, n.runs, b]);
  const C = b ? n.runs[b] : void 0, A = !!C && (C.status === "running" || C.status === "pending" || C.status === "awaiting_approval"), [$, T] = S(/* @__PURE__ */ new Set()), [M, R] = S(null), [j, W] = S(null), [ae, Z] = S(null), [oe, O] = S(0), [E, H] = S(!1), [J, L] = S(null), z = D(
    (P, _) => {
      _ === null ? (W(null), Z(null)) : (W(_), Z(P));
    },
    []
  ), V = D((P) => {
    T((_) => {
      const le = new Set(_);
      return le.has(P) ? le.delete(P) : le.add(P), le;
    });
  }, []), K = D(async () => {
    if ($.size !== 0)
      try {
        const P = await n.triggerDebugRun(
          t,
          Array.from($)
        );
        k(P);
      } catch (P) {
        console.error("[PipelineEditor] triggerDebugRun failed", P);
      }
  }, [$, n, t]), de = D(() => {
    M && (n.resolveBreakpoint(M.runId, M.stepId, "continue"), R(null));
  }, [M, n]), F = D(() => {
    M && (n.resolveBreakpoint(M.runId, M.stepId, "step_over"), R(null));
  }, [M, n]), se = D(() => {
    M && (n.resolveBreakpoint(M.runId, M.stepId, "resume_all"), R(null));
  }, [M, n]), ye = D(async () => {
    if (!(!M || !j || ae !== M.stepId) && Object.keys(j).length !== 0) {
      H(!0);
      try {
        await Vo(
          t,
          M.runId,
          M.stepId,
          { mode: "merge", values: j }
        ), W(null), Z(null), O((P) => P + 1), n.resolveBreakpoint(M.runId, M.stepId, "continue"), R(null);
      } catch (P) {
        if (P instanceof Wo)
          r(`Patch rejected: ${P.reason}`, { type: "error", durationMs: 8e3 });
        else if (P instanceof Kn)
          r(`Apply failed (HTTP ${P.status})`, { type: "error", durationMs: 6e3 });
        else {
          const _ = P instanceof Error ? P.message : String(P);
          r(`Apply failed: ${_}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        H(!1);
      }
    }
  }, [M, j, ae, t, n, r]), Me = D(
    async (P) => {
      if (M) {
        L(P);
        try {
          await Jo(
            t,
            M.runId,
            M.stepId,
            P
          ), r("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (_) {
          if (_ instanceof Kn)
            r(`Revert failed (HTTP ${_.status})`, { type: "error", durationMs: 6e3 });
          else {
            const le = _ instanceof Error ? _.message : String(_);
            r(`Revert failed: ${le}`, { type: "error", durationMs: 6e3 });
          }
        } finally {
          L(null);
        }
      }
    },
    [M, t, r]
  ), He = D(
    (P) => {
      if ("eventType" in P || !l(P.runId)) return;
      R({ runId: P.runId, stepId: P.stepId });
      const _ = Pt(c.current, P.stepId);
      r(`Paused at breakpoint: ${_}`, { type: "warning", durationMs: 6e3 });
    },
    [l, r]
  );
  Pe("pipeline.step.breakpoint", He);
  const _e = D(
    (P) => {
      "eventType" in P || M && M.runId === P.runId && R(null);
    },
    [M]
  );
  Pe("pipeline.run.completed", _e), Pe("pipeline.run.failed", _e), Pe("pipeline.run.cancelled", _e);
  const Re = D(() => {
    p?.nodeId && (n.retryFromStep(p.nodeId), x());
  }, [p, n, x]), Ue = a?.status === "published", Le = !A && !Ue, Fe = A ? "Cancel the active run" : Ue ? "Start a new run" : "Publish the pipeline to enable runs", [we, he] = S(!1), [ne, Y] = S({}), [re, pe] = S(!1), [xe, $e] = S("config");
  ee(() => {
    i !== null && $e("config");
  }, [i]);
  const Ce = D(async (P) => {
    pe(!0);
    try {
      const _ = await n.triggerRun(t, P);
      k(_), $e("runs"), r(`Pipeline triggered — run ${_.slice(0, 8)}…`, { type: "success" });
    } catch (_) {
      console.error("[PipelineEditor] triggerRun failed", _), r(`Trigger failed: ${_.message}`, { type: "error" });
    } finally {
      pe(!1);
    }
  }, [n, t, r]), Ve = D(async () => {
    if (A && b) {
      n.cancelRun(b);
      return;
    }
    Le || Ce();
  }, [A, b, Le, n, Ce]), Bt = D(() => {
    he(!1), Ce(ne);
  }, [Ce, ne]);
  return {
    currentRunId: b,
    setCurrentRunId: k,
    activeError: p,
    setActiveError: u,
    errorNodeAnchor: f,
    handleDismissError: x,
    handleErrorNodePosition: g,
    handleRetryFromError: Re,
    handleRunClick: Ve,
    handleTriggerInputSubmit: Bt,
    isRunActive: A,
    runDisabled: Le,
    runTitle: Fe,
    isTriggering: re,
    triggerInputOpen: we,
    setTriggerInputOpen: he,
    triggerInputValues: ne,
    setTriggerInputValues: Y,
    breakpoints: $,
    handleToggleBreakpoint: V,
    handleDebugRunClick: K,
    pausedBreakpoint: M,
    handleBreakpointContinue: de,
    handleBreakpointStepOver: F,
    handleBreakpointResumeAll: se,
    handleApplyAndContinue: ye,
    handleRevertPatch: Me,
    applyingPatch: E,
    revertingPatchId: J,
    dirtyPatch: j,
    dirtyPatchStepId: ae,
    handleContextEditBufferChange: z,
    resetEditBufferKey: oe,
    sidebarTab: xe,
    setSidebarTab: $e
  };
}
function rl({
  isPublished: t,
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
  ), x = I(
    "block w-full text-left px-3.5 py-2 text-[13px]",
    "border-none bg-transparent cursor-pointer font-inherit text-red-600",
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
            disabled: !r,
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
            className: x,
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
            className: x,
            role: "menuitem",
            onClick: f,
            children: "Delete"
          }
        )
      ]
    }
  );
}
const cn = {
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-green-50 text-green-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600"
};
function ol({
  pipelineId: t,
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
  onPublishClick: x,
  onDuplicate: g,
  onCopyMermaid: m,
  onViewVersions: N,
  onRevert: v,
  onToggleShowTags: y,
  showTags: w,
  onViewRunHistory: b,
  onClearRunHistory: k,
  onSimPanelOpen: C,
  onDelete: A
}) {
  const $ = Oe(), { rename: T, setIcon: M, setSelectedNodeId: R } = qe(), [j, W] = S(!1), [ae, Z] = S(""), oe = ie(null);
  ee(() => {
    j && (Z(n.name ?? ""), setTimeout(() => oe.current?.focus(), 0));
  }, [j, n.name]);
  const O = () => {
    const ne = ae.trim();
    ne && ne !== n.name && T(ne), W(!1);
  }, E = n ? vo(n) : null;
  (E?.errors.length ?? 0) > 0;
  const H = n.status === "published", J = r ? { label: "Saving…", variant: "info" } : a ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, L = n.status === "published" ? { label: `v${n.version} · Published`, variant: "success" } : typeof n.publishedVersion == "number" ? { label: `v${n.version} · Draft (pub v${n.publishedVersion})`, variant: "warning" } : { label: `v${n.version} · Draft`, variant: "neutral" }, z = E ? E.errors.length > 0 ? { label: `✗ ${E.errors.length} error${E.errors.length === 1 ? "" : "s"}`, variant: "danger" } : E.warnings.length > 0 ? { label: `⚠ ${E.warnings.length} warning${E.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [V, K] = S(!1), de = ie(null);
  ut(de, () => K(!1), V);
  const F = E ? [...E.errors, ...E.warnings] : [], se = (ne) => {
    ne && (R(ne), K(!1));
  }, ye = n.nodes.filter((ne) => ne.type !== "trigger").length, Me = l ? Object.values(l.steps).filter(
    (ne) => ne.status === "completed" || ne.status === "skipped"
  ).length : 0, _e = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), Re = i && l ? { text: `Running (${Me}/${ye} steps) · ${_e}s`, variant: "running" } : l?.status === "completed" ? { text: `Completed in ${l.durationMs ? (l.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : l?.status === "failed" ? { text: `Failed at ${Pt(n, l.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, Ue = {
    running: "bg-blue-50 text-blue-600",
    success: "bg-green-50 text-green-600",
    error: "bg-red-50 text-red-600"
  }, Le = i ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [Fe, we] = S(!1), he = ie(null);
  return ut(he, () => we(!1), Fe), /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "h-11 shrink-0 flex items-center gap-2.5 px-3",
        "border-b border-border bg-surface",
        "sticky top-0 z-5"
      ),
      children: [
        /* @__PURE__ */ e(
          Tt,
          {
            onClick: () => $("/pipelines"),
            "aria-label": "Back to pipelines",
            title: "Back to pipelines",
            children: "←"
          }
        ),
        /* @__PURE__ */ e(
          ba,
          {
            value: n.icon ?? "🔀",
            onChange: M
          }
        ),
        j ? /* @__PURE__ */ e(
          "input",
          {
            ref: oe,
            value: ae,
            onChange: (ne) => Z(ne.target.value),
            onBlur: O,
            onKeyDown: (ne) => {
              ne.key === "Enter" && O(), ne.key === "Escape" && (Z(n.name), W(!1));
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
              cn[J.variant]
            ),
            "data-testid": "save-status",
            children: J.label
          }
        ),
        /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              cn[L.variant]
            ),
            "data-testid": "version-badge",
            children: L.label
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", ref: de, children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => K((ne) => !ne),
              className: I(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
                "cursor-pointer border-none",
                cn[z.variant]
              ),
              "data-testid": "validation-indicator",
              children: z.label
            }
          ),
          V && F.length > 0 && /* @__PURE__ */ e(
            "div",
            {
              className: I(
                "absolute top-full mt-1.5 bg-surface border border-border rounded-lg",
                "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"
              ),
              children: F.map((ne, Y) => /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => se(ne.nodeId),
                  className: I(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    ne.nodeId ? "cursor-pointer" : "cursor-default",
                    Y < F.length - 1 && "border-b border-border"
                  ),
                  children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: I(
                          "font-bold text-xs",
                          ne.severity === "error" ? "text-red-600" : "text-amber-600"
                        ),
                        children: ne.severity === "error" ? "✗" : "⚠"
                      }
                    ),
                    /* @__PURE__ */ o("span", { className: "flex-1 text-xs", children: [
                      /* @__PURE__ */ e("div", { className: "font-semibold", children: ne.code }),
                      /* @__PURE__ */ e("div", { className: "text-text-secondary", children: ne.message }),
                      ne.nodeId && /* @__PURE__ */ e("div", { className: "mt-0.5 text-[11px] text-primary", children: "Jump to node →" })
                    ] })
                  ]
                },
                `${ne.code}-${Y}`
              ))
            }
          )
        ] }),
        Re.variant !== "none" && /* @__PURE__ */ o(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap",
              Ue[Re.variant]
            ),
            "data-testid": "run-status-indicator",
            children: [
              Re.variant === "running" && /* @__PURE__ */ e("span", { className: "inline-block w-3 h-3 border-2 border-slate-200 border-t-primary rounded-full animate-spin" }),
              Re.variant === "success" && "✓ ",
              Re.variant === "error" && "✗ ",
              Re.text
            ]
          }
        ),
        /* @__PURE__ */ e("div", { className: "flex-1" }),
        /* @__PURE__ */ e(
          Ee,
          {
            variant: "secondary",
            onClick: () => $("/pipelines/metrics"),
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
            onClick: x,
            title: H ? "Already published at this version" : "Publish pipeline to enable runs",
            disabled: H,
            className: I(
              "px-3 py-1.5 text-[13px] font-semibold border-none rounded-md font-inherit shrink-0",
              H ? "bg-surface-hover text-text-tertiary cursor-default opacity-70" : "bg-green-600 text-white cursor-pointer"
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
              i ? "bg-red-600" : "bg-primary",
              d || s ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            ),
            "data-testid": "run-button",
            children: s ? /* @__PURE__ */ o("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ e("span", { className: "inline-block w-3 h-3 border-2 border-slate-200 border-t-white rounded-full animate-spin" }),
              "Triggering…"
            ] }) : Le
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
        /* @__PURE__ */ o("div", { className: "relative", ref: he, children: [
          /* @__PURE__ */ e(
            Tt,
            {
              onClick: () => we((ne) => !ne),
              "aria-label": "More actions",
              "data-testid": "overflow-menu-btn",
              children: "⋯"
            }
          ),
          Fe && /* @__PURE__ */ e(
            rl,
            {
              isPublished: H,
              showTags: w,
              onDuplicate: () => {
                g(), we(!1);
              },
              onCopyMermaid: () => {
                m(), we(!1);
              },
              onViewVersions: () => {
                N(), we(!1);
              },
              onRevert: () => {
                v(), we(!1);
              },
              onToggleShowTags: () => {
                y(), we(!1);
              },
              onViewRunHistory: () => {
                b(), we(!1);
              },
              onClearRunHistory: () => {
                k(), we(!1);
              },
              onSimPanelOpen: () => {
                C(), we(!1);
              },
              onDelete: () => {
                A(), we(!1);
              },
              hasPublishedVersion: typeof n.publishedVersion == "number"
            }
          )
        ] })
      ]
    }
  );
}
const al = 12;
function Ie(t) {
  return I("text-xs", {
    string: "text-[#a6e3a1]",
    number: "text-[#fab387]",
    boolean: "text-[#cba6f7]",
    null: "text-[#6c7086]",
    bracket: "text-[#9399b2]"
  }[t]);
}
function Ot({
  data: t,
  depth: n = 0,
  highlightKeys: r,
  keyName: a,
  isHighlighted: i = !1
}) {
  const [s, d] = S(n > 2);
  if (n > al)
    return /* @__PURE__ */ e("span", { className: Ie("string"), children: "[max depth]" });
  const c = i || a != null && r?.has(a);
  if (t === null)
    return /* @__PURE__ */ e("span", { className: I(Ie("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "null" });
  if (t === void 0)
    return /* @__PURE__ */ e("span", { className: I(Ie("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "undefined" });
  if (typeof t == "boolean")
    return /* @__PURE__ */ e("span", { className: I(Ie("boolean"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(t) });
  if (typeof t == "number")
    return /* @__PURE__ */ e("span", { className: I(Ie("number"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(t) });
  if (typeof t == "string") {
    const l = t.length > 120 ? t.slice(0, 120) + "..." : t;
    return /* @__PURE__ */ o("span", { className: I(Ie("string"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: [
      '"',
      l,
      '"'
    ] });
  }
  if (Array.isArray(t))
    return t.length === 0 ? /* @__PURE__ */ e("span", { className: Ie("bracket"), children: "[]" }) : /* @__PURE__ */ o("span", { children: [
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
      /* @__PURE__ */ e("span", { className: Ie("bracket"), children: "[" }),
      s ? /* @__PURE__ */ o("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        t.length,
        " items"
      ] }) : /* @__PURE__ */ e("div", { className: "pl-4", children: t.map((l, p) => /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
        /* @__PURE__ */ o("span", { className: "text-[#6c7086] text-[11px]", children: [
          p,
          ": "
        ] }),
        /* @__PURE__ */ e(Ot, { data: l, depth: n + 1, highlightKeys: r }),
        p < t.length - 1 && /* @__PURE__ */ e("span", { className: Ie("bracket"), children: "," })
      ] }, p)) }),
      /* @__PURE__ */ e("span", { className: Ie("bracket"), children: "]" })
    ] });
  if (typeof t == "object") {
    const l = Object.entries(t);
    return l.length === 0 ? /* @__PURE__ */ e("span", { className: Ie("bracket"), children: "{}" }) : /* @__PURE__ */ o("span", { children: [
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
      /* @__PURE__ */ e("span", { className: Ie("bracket"), children: "{" }),
      s ? /* @__PURE__ */ o("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        l.length,
        " keys"
      ] }) : /* @__PURE__ */ e("div", { className: "pl-4", children: l.map(([p, u], f) => {
        const h = r?.has(p) || i;
        return /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
          /* @__PURE__ */ e("span", { className: I(
            "text-xs font-medium text-[#89b4fa]",
            h && "text-[#a6e3a1] font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5"
          ), children: p }),
          /* @__PURE__ */ e("span", { className: Ie("bracket"), children: ": " }),
          /* @__PURE__ */ e(
            Ot,
            {
              data: u,
              depth: n + 1,
              highlightKeys: n === 0 ? r : void 0,
              keyName: p,
              isHighlighted: h
            }
          ),
          f < l.length - 1 && /* @__PURE__ */ e("span", { className: Ie("bracket"), children: "," })
        ] }, p);
      }) }),
      /* @__PURE__ */ e("span", { className: Ie("bracket"), children: "}" })
    ] });
  }
  return /* @__PURE__ */ e("span", { className: Ie("string"), children: String(t) });
}
function il({
  snapshots: t,
  activeStepId: n,
  fallbackActiveStepId: r,
  onStepSelect: a
}) {
  const i = n ?? r;
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
function sl(t) {
  return typeof t == "string" ? "string" : typeof t == "number" ? "number" : typeof t == "boolean" ? "boolean" : "object";
}
function ll({ k: t, initial: n, onCommit: r, onError: a, onFocus: i }) {
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
      onFocus: i,
      onBlur: () => {
        try {
          const c = JSON.parse(s);
          r(c);
        } catch (c) {
          a(`Invalid JSON: ${c instanceof Error ? c.message : String(c)}`);
        }
      },
      className: "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono min-h-[60px] resize-y"
    }
  );
}
function cl({
  inputContext: t,
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
  const u = q(() => {
    const h = /* @__PURE__ */ new Set([
      ...Object.keys(t),
      ...Object.keys(n)
    ]);
    return Array.from(h);
  }, [t, n]), f = "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono";
  return /* @__PURE__ */ o("div", { "data-testid": "context-edit-table", children: [
    u.map((h) => {
      const x = h in n, g = x ? n[h] : t[h], m = sl(g), N = x;
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
                  value: String(g),
                  onChange: (v) => c(h, v.target.value === "true"),
                  onFocus: () => d(h, g),
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
                  value: String(g),
                  onChange: (v) => {
                    const y = v.target.value === "" ? 0 : Number(v.target.value);
                    c(h, Number.isNaN(y) ? 0 : y);
                  },
                  onFocus: () => d(h, g),
                  className: f
                }
              ) : m === "string" ? /* @__PURE__ */ e(
                "input",
                {
                  "data-testid": `context-edit-input-${h}`,
                  type: "text",
                  value: g ?? "",
                  onChange: (v) => c(h, v.target.value),
                  onFocus: () => d(h, g),
                  className: f
                }
              ) : /* @__PURE__ */ e(
                ll,
                {
                  k: h,
                  initial: g,
                  onCommit: (v) => c(h, v),
                  onError: (v) => p(h, v),
                  onFocus: () => d(h, g)
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
function dl(t, n, r) {
  const a = { ...t }, i = { ...a.steps ?? {} };
  return i[n] = r, a.steps = i, r && typeof r == "object" && !Array.isArray(r) && Object.assign(a, r), a;
}
function pl(t, n) {
  const r = [];
  for (const a of Object.keys(n))
    a in t || r.push(a);
  return r;
}
function ul(t) {
  const n = Object.values(t.steps).filter((i) => i != null).sort((i, s) => {
    const d = i.startedAt ? Date.parse(i.startedAt) : 0, c = s.startedAt ? Date.parse(s.startedAt) : 0;
    return d - c;
  }), r = [];
  let a = {};
  t.triggeredBy?.payload && typeof t.triggeredBy.payload == "object" && (a = { ...t.triggeredBy.payload });
  for (const i of n) {
    const s = { ...a }, d = i.output, c = i.llm?.prompt;
    let l;
    if (d !== void 0)
      l = dl(a, i.nodeId, d);
    else {
      l = { ...a };
      const u = {
        ...l.steps ?? {}
      };
      u[i.nodeId] = d, l.steps = u;
    }
    const p = pl(s, l);
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
function ml(t, n) {
  const [r, a] = S(/* @__PURE__ */ new Map()), [i, s] = S(
    /* @__PURE__ */ new Map()
  ), d = ie(null);
  ee(() => {
    const h = t?.id ?? null;
    h !== d.current && (d.current = h, a(/* @__PURE__ */ new Map()), s(/* @__PURE__ */ new Map()));
  }, [t?.id]);
  const c = D(
    (h) => {
      if (!h || typeof h != "object") return;
      const { eventType: x, payload: g } = h;
      if (!g || typeof g != "object") return;
      const m = g, N = m.runId;
      if (!(!t?.id || N !== t.id)) {
        if (x === "pipeline.llm.prompt") {
          const v = m.stepId, y = m.prompt;
          v && y && a((w) => {
            const b = new Map(w);
            return b.set(v, y), b;
          });
        }
        if (x === "pipeline.run.checkpoint" || x === "pipeline.run.checkpointed" || x === "pipeline:run:checkpoint" || x === "pipeline:run:checkpointed") {
          const v = m.context, y = m.stepId;
          v && y && s((w) => {
            const b = new Map(w);
            return b.set(y, v), b;
          });
        }
      }
    },
    [t?.id]
  );
  Pe("*", c);
  const l = q(() => t ? ul(t) : [], [t]), p = q(() => l.map((h) => {
    const x = r.get(h.stepId), g = i.get(h.stepId);
    return {
      ...h,
      resolvedPrompt: h.resolvedPrompt || x,
      outputContext: g ?? h.outputContext
    };
  }), [l, r, i]), u = q(() => n ? p.find((h) => h.stepId === n) ?? null : p[p.length - 1] ?? null, [p, n]), f = q(() => u ? new Set(u.newKeys) : /* @__PURE__ */ new Set(), [u]);
  return { enrichedSnapshots: p, activeSnapshot: u, newKeysSet: f };
}
function sr({ attempt: t, label: n }) {
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
      /* @__PURE__ */ e(Ot, { data: t.output, depth: 0 })
    ] })
  ] });
}
function hl({
  run: t,
  activeStepId: n,
  onStepSelect: r,
  editable: a = !1,
  onEditBufferChange: i,
  resetEditBufferKey: s
}) {
  const [d, c] = S("input"), [l, p] = S(0), [u, f] = S(!1), [h, x] = S({}), [g, m] = S(null), [N, v] = S({}), [y, w] = S({
    key: "",
    value: ""
  }), { enrichedSnapshots: b, activeSnapshot: k, newKeysSet: C } = ml(t, n), A = k?.resolvedPrompt != null, $ = k?.stepExecution.attempts, T = ($?.length ?? 0) >= 2;
  ee(() => {
    d === "prompt" && !A && c("input"), d === "attempts" && !T && c("input");
  }, [d, A, T]), ee(() => {
    p(0);
  }, [n]);
  const M = !!(t && t.status === "paused_at_breakpoint" && n && (t.currentStepIds?.includes(n) || k?.stepExecution.status === "running" || k?.stepExecution.status === "awaiting" || k?.stepExecution.status === "pending")), R = !!a && !!M;
  ee(() => {
    R ? g && g !== n && (x({}), m(null), v({})) : (u && f(!1), Object.keys(h).length > 0 && x({}), g && m(null), Object.keys(N).length > 0 && v({}));
  }, [R, n]), ee(() => {
    s !== void 0 && (x({}), m(null), v({}), w({ key: "", value: "" }));
  }, [s]), ee(() => {
    !R || !n || i && (Object.keys(h).length === 0 ? i(n, null) : i(n, h));
  }, [h, R, n]);
  const j = D(
    (E, H) => {
      m(n), x((J) => E in J ? J : { ...J, [E]: H });
    },
    [n]
  ), W = D(
    (E, H) => {
      m(n), x((J) => ({ ...J, [E]: H })), v((J) => {
        if (!(E in J)) return J;
        const L = { ...J };
        return delete L[E], L;
      });
    },
    [n]
  ), ae = D((E) => {
    x((H) => {
      if (!(E in H)) return H;
      const J = { ...H };
      return delete J[E], J;
    }), v((H) => {
      if (!(E in H)) return H;
      const J = { ...H };
      return delete J[E], J;
    });
  }, []), Z = D((E, H) => {
    v((J) => ({ ...J, [E]: H }));
  }, []), oe = D(() => {
    x({}), m(null), v({}), w({ key: "", value: "" });
  }, []), O = D(() => {
    const E = y.key.trim();
    if (!E) return;
    let H = y.value;
    const J = y.value;
    if (J.trim().length > 0)
      try {
        H = JSON.parse(J);
      } catch {
        H = J;
      }
    W(E, H), w({ key: "", value: "" });
  }, [y, W]);
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
      { id: "prompt", label: "Resolved Prompt", show: A },
      { id: "details", label: "Details", show: !0 },
      { id: "attempts", label: `Attempts (${$?.length})`, show: T }
    ].filter((E) => E.show).map((E) => /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "data-testid": E.id === "attempts" ? "attempts-tab" : void 0,
        className: I(
          "px-3.5 py-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer font-inherit uppercase tracking-wide border-b-2",
          d === E.id ? "text-primary border-b-primary" : "text-text-tertiary border-b-transparent"
        ),
        onClick: () => c(E.id),
        children: E.label
      },
      E.id
    )) }),
    /* @__PURE__ */ o("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
      /* @__PURE__ */ e(
        il,
        {
          snapshots: b,
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
          R && /* @__PURE__ */ o("div", { className: "flex gap-1.5 items-center", children: [
            u && Object.keys(h).length > 0 && /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: oe,
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
                  const E = !u;
                  f(E), E || oe();
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
        Object.keys(k.inputContext).length === 0 && !(R && u) ? /* @__PURE__ */ e("div", { className: "text-[#6c7086] text-xs italic", children: "No input context (first step or no upstream output)" }) : R && u ? /* @__PURE__ */ e(
          cl,
          {
            inputContext: k.inputContext,
            buffer: h,
            parseErrors: N,
            newKeyDraft: y,
            setNewKeyDraft: w,
            onCommitNewKey: O,
            onBeginEditKey: j,
            onSetValue: W,
            onRemoveKey: ae,
            onParseError: Z
          }
        ) : /* @__PURE__ */ e(
          Ot,
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
        /* @__PURE__ */ e(Ot, { data: k.output }),
        k.newKeys.length > 0 && /* @__PURE__ */ o("div", { className: "mt-3", children: [
          /* @__PURE__ */ e("div", { className: "text-[10px] text-[#a6e3a1] font-semibold uppercase mb-1", children: "New context keys added" }),
          /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: k.newKeys.map((E) => /* @__PURE__ */ e(
            "span",
            {
              className: "px-1.5 py-0.5 bg-[rgba(166,227,161,0.15)] text-[#a6e3a1] rounded-sm text-[11px] font-semibold font-mono",
              children: E
            },
            E
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
            k.stepExecution.approvals.map((E, H) => /* @__PURE__ */ o("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2", children: [
              /* @__PURE__ */ o("div", { className: "flex gap-2 mb-1", children: [
                /* @__PURE__ */ e("span", { className: I(
                  "px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                  E.decision === "approve" ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
                ), children: E.decision.toUpperCase() }),
                /* @__PURE__ */ e("span", { className: "text-[11px] text-[#cdd6f4]", children: E.userId })
              ] }),
              E.comment && /* @__PURE__ */ o("div", { className: "text-[11px] text-[#9399b2] italic", children: [
                '"',
                E.comment,
                '"'
              ] }),
              /* @__PURE__ */ e("div", { className: "text-[10px] text-[#6c7086] mt-1", children: E.at })
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
              onClick: () => p((E) => E - 1),
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
              onClick: () => p((E) => E + 1),
              className: I(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l >= $.length - 2 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "→"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ e(sr, { attempt: $[l], label: `Attempt ${l + 1}` }),
          /* @__PURE__ */ e(sr, { attempt: $[l + 1], label: `Attempt ${l + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function fl({
  definition: t,
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
  const g = ft().runs[n.runId] ?? null, N = g?.steps?.[n.stepId]?.patches ?? [], v = !!i && s === n.stepId && Object.keys(i).length > 0, y = g?.status === "paused_at_breakpoint";
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": "breakpoint-pause-overlay",
      className: I(
        "absolute top-14 left-1/2 -translate-x-1/2 z-30",
        "bg-surface border-2 border-amber-600 rounded-lg",
        "px-4 py-3 shadow-[0_8px_24px_rgba(217,119,6,0.2)]",
        "flex flex-col gap-3 font-inherit",
        "w-[min(900px,92vw)] max-h-[calc(100vh-120px)]"
      ),
      children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ o("span", { className: "text-[13px] font-semibold text-amber-600", children: [
            "Paused at: ",
            Pt(t, n.stepId)
          ] }),
          v && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: u,
              disabled: r,
              "data-testid": "breakpoint-apply-continue-btn",
              className: I(
                "px-3 py-1 text-xs font-semibold bg-green-300 text-gray-900",
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
                "px-3 py-1 text-xs font-semibold bg-amber-600 text-white",
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
                "px-3 py-1 text-xs font-semibold bg-transparent text-amber-600",
                "border border-amber-600 rounded font-inherit",
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
                "px-3 py-1 text-xs font-semibold bg-transparent text-amber-600",
                "border border-amber-600 rounded font-inherit",
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
              /* @__PURE__ */ e("div", { className: "border border-border rounded-md bg-surface-inset overflow-hidden min-h-0", children: g ? /* @__PURE__ */ e(
                hl,
                {
                  run: g,
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
                                  className: "px-1 text-[9px] font-bold bg-orange-300/15 text-orange-300 rounded-sm",
                                  children: "⚠ Unvalidated"
                                }
                              ),
                              b && /* @__PURE__ */ e("span", { className: "px-1 text-[9px] font-bold bg-gray-500/20 text-gray-400 rounded-sm", children: "Reverted" })
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
                                disabled: !y || a === w.patchId,
                                title: y ? "Revert this patch" : "Run has progressed past this breakpoint — revert no longer allowed",
                                className: I(
                                  "mt-1 px-2 py-0.5 text-[10px] font-semibold bg-transparent rounded-sm font-inherit",
                                  y ? "text-red-400 border border-red-400 cursor-pointer" : "text-gray-700 border border-gray-700 cursor-not-allowed",
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
function be({ label: t, required: n, help: r, error: a, children: i, className: s }) {
  return /* @__PURE__ */ o("div", { className: I("flex flex-col", s), children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary", children: [
      t,
      n && /* @__PURE__ */ e("span", { className: "text-[#dc2626] ml-1", children: "●" })
    ] }),
    /* @__PURE__ */ e("div", { className: "mt-1", children: i }),
    a && /* @__PURE__ */ e("div", { className: "text-[11px] text-[#dc2626] mt-0.5", children: a }),
    !a && r && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: r })
  ] });
}
function xl({ title: t, defaultCollapsed: n = !1, children: r, className: a }) {
  const [i, s] = S(n);
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
    !i && /* @__PURE__ */ e("div", { className: "flex flex-col gap-3 mt-2", children: r })
  ] });
}
function Xe({ children: t, className: n }) {
  return /* @__PURE__ */ e("div", { className: I("flex flex-col gap-3 px-4 py-3", n), children: t });
}
const gl = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function bl(t, n, r) {
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
function yl(t) {
  if (typeof t != "string") return null;
  const n = t.trim().split(/\s+/);
  if (n.length !== 5) return null;
  const r = {};
  for (let a = 0; a < 5; a++) {
    const i = gl[a], s = bl(n[a], i.min, i.max);
    if (!s) return null;
    r[i.name] = s;
  }
  return r;
}
function gt(t, n, r) {
  return t.match === "*" ? !t.step || t.step === 1 ? !0 : (n - r) % t.step === 0 : t.match.includes(n);
}
function vl(t, n) {
  return gt(t.minute, n.getMinutes(), 0) && gt(t.hour, n.getHours(), 0) && gt(t.dayOfMonth, n.getDate(), 1) && gt(t.month, n.getMonth() + 1, 1) && gt(t.dayOfWeek, n.getDay(), 0);
}
function Nl(t, n, r) {
  const a = [], i = new Date(n.getTime());
  i.setSeconds(0, 0), i.setMinutes(i.getMinutes() + 1);
  const s = 1440 * 366, d = new Date(i.getTime());
  for (let c = 0; c < s && a.length < r; c++)
    vl(t, d) && a.push(new Date(d.getTime())), d.setMinutes(d.getMinutes() + 1);
  return a;
}
const lr = /^[a-zA-Z0-9_-]{1,64}$/, wl = "http://localhost:13001";
function kl() {
  try {
    const t = localStorage.getItem("ws_document_types_v1");
    if (!t) return [];
    const n = JSON.parse(t);
    return Array.isArray(n) ? n.filter((r) => typeof r == "object" && r !== null).filter((r) => typeof r.id == "string" && typeof r.name == "string").map((r) => ({ id: r.id, name: r.name })) : [];
  } catch {
    return [];
  }
}
const Cl = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function Il({ data: t, onChange: n }) {
  const { toast: r } = nn(), i = io(Ho)?.definition?.triggerBinding?.webhookSecret, [s, d] = S(!1), c = t.triggerType.startsWith("document."), l = q(() => c ? kl() : [], [c]), p = c && !t.documentTypeId, u = t.triggerType === "schedule" && !t.schedule, f = t.triggerType === "webhook" && !t.webhookPath, h = t.webhookPath ?? "", x = t.triggerType === "webhook" && h.length > 0 && !lr.test(h), g = t.triggerType === "webhook" && lr.test(h) ? `${wl}/hooks/pipeline/${h}` : null, m = () => {
    g && navigator.clipboard.writeText(g).then(() => r("Webhook URL copied", { type: "success" })).catch(() => r("Could not copy webhook URL", { type: "error" }));
  }, N = () => {
    i && navigator.clipboard.writeText(i).then(() => r("Webhook secret copied", { type: "success" })).catch(() => r("Could not copy webhook secret", { type: "error" }));
  }, v = t.triggerType === "schedule" ? t.schedule ?? "" : "", y = q(
    () => v ? yl(v) : null,
    [v]
  ), w = q(() => y ? Nl(y, /* @__PURE__ */ new Date(), 3) : [], [y]), b = t.triggerType === "schedule" && !!v && !y, k = t.triggerType === "document.finalize" ? "On finalize" : t.triggerType === "document.submit" ? "On submit for review" : t.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ e(be, { label: "Trigger type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.triggerType,
        onChange: (C) => n({ triggerType: C.target.value }),
        children: Cl.map((C) => /* @__PURE__ */ e("option", { value: C.value, children: C.label }, C.value))
      }
    ) }),
    c && /* @__PURE__ */ o(
      be,
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
      be,
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
              onChange: (C) => n({ schedule: C.target.value })
            }
          ),
          /* @__PURE__ */ e("div", { className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono", children: w.length > 0 ? /* @__PURE__ */ o(G, { children: [
            /* @__PURE__ */ e("div", { className: "text-text-secondary mb-1", children: "Next 3 fires:" }),
            w.map((C, A) => /* @__PURE__ */ e("div", { children: C.toLocaleString() }, A))
          ] }) : /* @__PURE__ */ e("span", { children: "Next fires: enter a valid cron expression to preview." }) })
        ]
      }
    ),
    t.triggerType === "webhook" && /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ e(
        be,
        {
          label: "Path",
          required: !0,
          error: f ? "Webhook path is required." : x ? "Path must be alphanumeric (plus _, -)" : void 0,
          help: !f && !x ? "Alphanumeric, _, or - (max 64 chars). No leading slash." : void 0,
          children: /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              className: I(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                f || x ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "weekly-digest",
              value: h,
              onChange: (C) => n({ webhookPath: C.target.value })
            }
          )
        }
      ),
      /* @__PURE__ */ e("div", { className: "p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: g ? /* @__PURE__ */ o(G, { children: [
        /* @__PURE__ */ o("span", { className: "flex-1", children: [
          /* @__PURE__ */ e("span", { className: "font-sans text-text-tertiary mr-1", children: "Full URL:" }),
          g
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
const cr = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, Sl = 3e4;
function $l(t) {
  return t < 1e3 ? `${Math.round(t)}ms` : t < 6e4 ? `${(t / 1e3).toFixed(t < 1e4 ? 1 : 0)}s` : `${Math.round(t / 6e4)}m`;
}
function Tl(t) {
  const n = [];
  for (let r = 1; r < t.maxAttempts; r++) {
    const a = t.backoffMs * Math.pow(t.backoffMultiplier, r - 1);
    n.push(Math.min(a, Sl));
  }
  return n;
}
function Vn({ value: t, onChange: n }) {
  const r = t !== void 0, a = t ?? cr, i = r ? Tl(a) : [], d = i.reduce((c, l) => c + l, 0) > 300 * 1e3;
  return /* @__PURE__ */ o("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "checkbox",
          checked: r,
          onChange: (c) => n(c.target.checked ? cr : void 0),
          "aria-label": "Enable retries"
        }
      ),
      "Retry policy"
    ] }),
    !r && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", children: "No retries — failure is terminal on first attempt." }),
    r && /* @__PURE__ */ o(G, { children: [
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
                n({ ...a, maxAttempts: l });
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
                n({ ...a, backoffMs: l });
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
                n({ ...a, backoffMultiplier: l });
              },
              "aria-label": "Backoff multiplier"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: a.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : i.length === 0 ? `Retries up to ${a.maxAttempts}× with no delay.` : `Retries up to ${a.maxAttempts}× with delays: ${i.map($l).join(", ")}.` }),
      d && /* @__PURE__ */ e("div", { className: "text-[11px] text-[#ca8a04] mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const dr = {
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
}, Al = [
  "context.doc.body",
  "context.doc.title",
  "context.trigger.userId",
  "context.steps"
], wo = {
  "context.doc.body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "context.doc.title": "Sample Document Title",
  "context.trigger.userId": "user_abc123",
  "context.steps": '["step-1: fetched document", "step-2: validated schema"]'
};
function pr(t) {
  return t.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (n, r) => wo[r] ?? `{{${r}}}`);
}
function Rl({ data: t, onChange: n }) {
  const [r, a] = S(!1), i = !t.systemPrompt?.trim(), s = !t.userPromptTemplate?.trim(), d = (c) => {
    const l = dr[c], p = l.includes(t.model) ? t.model : l[0];
    n({ provider: c, model: p });
  };
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ e(be, { label: "Provider", required: !0, children: /* @__PURE__ */ o(
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
    /* @__PURE__ */ e(be, { label: "Model", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.model,
        onChange: (c) => n({ model: c.target.value }),
        children: dr[t.provider].map((c) => /* @__PURE__ */ e("option", { value: c, children: c }, c))
      }
    ) }),
    /* @__PURE__ */ e(
      be,
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
            onChange: (c) => n({ systemPrompt: c.target.value })
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      be,
      {
        label: "User prompt template",
        required: !0,
        error: s ? "User prompt template is required." : void 0,
        help: s ? void 0 : "Supports {{ context.* }} substitution — click a pill above to insert.",
        children: /* @__PURE__ */ e(
          Un,
          {
            value: t.userPromptTemplate,
            onChange: (c) => n({ userPromptTemplate: c }),
            language: "template",
            variables: Al,
            minLines: 6,
            "aria-label": "User prompt template"
          }
        )
      }
    ),
    /* @__PURE__ */ o(xl, { title: "Advanced", defaultCollapsed: !0, children: [
      /* @__PURE__ */ o(
        be,
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
                onChange: (c) => n({ temperature: parseFloat(c.target.value) }),
                className: "w-full mt-1"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ e(be, { label: "Max tokens", help: "Upper bound on response length.", children: /* @__PURE__ */ e(
        "input",
        {
          type: "number",
          min: 1,
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
          value: t.maxTokens ?? "",
          onChange: (c) => {
            const l = c.target.value;
            n({ maxTokens: l === "" ? void 0 : Math.max(1, parseInt(l, 10) || 0) });
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
              onChange: (c) => n({ streaming: c.target.checked })
            }
          ),
          "Streaming"
        ] }),
        /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Stream tokens as they are generated." })
      ] }),
      /* @__PURE__ */ e(
        Vn,
        {
          value: t.retryPolicy,
          onChange: (c) => n({ retryPolicy: c })
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
          r ? "▾" : "▶",
          " Preview with sample context"
        ]
      }
    ),
    r && /* @__PURE__ */ o("div", { className: "bg-surface-inset border border-border rounded-lg p-3 flex flex-col gap-2.5", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved system prompt" }),
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: pr(t.systemPrompt || "(empty)") })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: pr(t.userPromptTemplate || "(empty)") })
      ] }),
      /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary", children: [
        "Sample values: ",
        Object.keys(wo).map((c) => `{{${c}}}`).join(", ")
      ] })
    ] })
  ] });
}
const Pl = ["context", "context.steps", "context.trigger"], Ml = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function El({ data: t, onChange: n }) {
  const r = !t.expression?.trim();
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ e(be, { label: "Type", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: Ml.map((a) => /* @__PURE__ */ o(
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
              onChange: () => n({ transformType: a.value })
            }
          ),
          a.label
        ]
      },
      a.value
    )) }) }),
    /* @__PURE__ */ e(
      be,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : t.transformType === "jsonpath" ? 'e.g. $.items[?(@.status == "active")]' : t.transformType === "template" ? "Mustache-style: {{ context.doc.title }}" : t.transformType === "javascript" ? "return ctx.items.filter(x => x.active)" : void 0,
        children: /* @__PURE__ */ e(
          Un,
          {
            value: t.expression,
            onChange: (a) => n({ expression: a }),
            language: t.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: Pl,
            "aria-label": "Transform expression"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      be,
      {
        label: "Output key (optional)",
        help: `If set, writes to context.${t.outputKey || "outputKey"}. Otherwise merges into root context.`,
        children: /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
            value: t.outputKey ?? "",
            onChange: (a) => n({ outputKey: a.target.value || void 0 }),
            placeholder: "activeItems"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      Vn,
      {
        value: t.retryPolicy,
        onChange: (a) => n({ retryPolicy: a })
      }
    ),
    /* @__PURE__ */ e(be, { label: "Preview", children: /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2", children: [
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
const Dl = ["context.trigger", "context.steps"];
function Ol({ data: t, onChange: n }) {
  const r = !t.expression?.trim();
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ e(
      be,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : "e.g. context.llm.response.length > 500",
        children: /* @__PURE__ */ e(
          Un,
          {
            value: t.expression,
            onChange: (a) => n({ expression: a }),
            language: "javascript",
            variables: Dl,
            "aria-label": "Condition expression"
          }
        )
      }
    ),
    /* @__PURE__ */ e(be, { label: "Label (optional — shown on node face)", help: "A short name so this branch is easy to spot.", children: /* @__PURE__ */ e(
      "input",
      {
        type: "text",
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.label ?? "",
        onChange: (a) => n({ label: a.target.value || void 0 }),
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
const _l = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], Ll = {
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
function Bl({ data: t, onChange: n }) {
  const r = Ll[t.actionType], a = t.config ?? {}, i = typeof a.retryCount == "number" ? a.retryCount : 3, s = t.onError === "route-error" ? "route-error" : typeof a.retryCount == "number" ? "retry" : "halt", d = (l, p) => {
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
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ e(be, { label: "Action type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.actionType,
        onChange: (l) => n({ actionType: l.target.value, config: {} }),
        children: _l.map((l) => /* @__PURE__ */ e("option", { value: l.value, children: l.label }, l.value))
      }
    ) }),
    /* @__PURE__ */ e(be, { label: "Configuration", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-2.5", children: r.map((l) => /* @__PURE__ */ o("div", { children: [
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
            onChange: (l) => n({ idempotent: l.target.checked })
          }
        ),
        "Idempotent"
      ] }),
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "This action is safe to retry." })
    ] }),
    t.idempotent && /* @__PURE__ */ o(be, { label: "Dedup scope", children: [
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
      Vn,
      {
        value: t.retryPolicy,
        onChange: (l) => n({ retryPolicy: l })
      }
    ),
    /* @__PURE__ */ e(be, { label: "On error", children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
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
              n({ onError: "fail-run", config: { ...a, retryCount: p } });
            }
          }
        ),
        "times"
      ] })
    ] }) })
  ] });
}
const Qe = 2, bt = 8;
function ur(t, n) {
  const r = t ?? [];
  return r.length === n ? r : r.length > n ? r.slice(0, n) : [...r, ...Array(n - r.length).fill("")];
}
function Ul({ data: t, onChange: n }) {
  const r = Math.max(Qe, Math.min(bt, t.branchCount || Qe)), a = ur(t.branchLabels, r), i = (d) => {
    const c = Math.max(Qe, Math.min(bt, d));
    n({
      branchCount: c,
      branchLabels: ur(t.branchLabels, c)
    });
  }, s = (d, c) => {
    const l = [...a];
    l[d] = c, n({ branchLabels: l });
  };
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ o(
      be,
      {
        label: "Branch count",
        required: !0,
        help: `Between ${Qe} and ${bt} parallel branches.`,
        children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs ml-2", children: r }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: Qe,
              max: bt,
              step: 1,
              value: r,
              onChange: (d) => i(parseInt(d.target.value, 10)),
              className: "w-full mt-1"
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              type: "number",
              min: Qe,
              max: bt,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit mt-1",
              value: r,
              onChange: (d) => i(parseInt(d.target.value, 10) || Qe)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e(be, { label: "Branch labels (optional)", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: a.map((d, c) => /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
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
const Fl = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], jl = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function zl({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ o(be, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: Fl.map((r) => /* @__PURE__ */ o(
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
    /* @__PURE__ */ e(be, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: jl.map((r) => /* @__PURE__ */ o(
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
const Mt = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5
};
function ql(t) {
  return !t || t <= 0 ? "minutes" : t % Mt.hours === 0 ? "hours" : t % Mt.minutes === 0 ? "minutes" : "seconds";
}
function Vl({ data: t, onChange: n }) {
  const r = t.approvers ?? [], a = r.length === 0, [i, s] = S(() => ql(t.timeoutMs)), d = t.timeoutMs !== void 0 ? Math.round(t.timeoutMs / Mt[i]) : "", c = r.filter((x) => x.type === "user").map((x) => x.value), l = (x) => {
    const g = r.filter((v) => v.type === "role"), N = [...x.map((v) => ({ type: "user", value: v })), ...g];
    n({
      approvers: N,
      // Clamp requiredCount so it never exceeds approvers.length (min 1).
      requiredCount: Math.max(1, Math.min(t.requiredCount || 1, N.length || 1))
    });
  }, p = (x) => {
    const g = r.filter((m, N) => N !== x);
    n({
      approvers: g,
      requiredCount: Math.max(1, Math.min(t.requiredCount || 1, g.length || 1))
    });
  }, u = (x) => {
    if (x === "") {
      n({ timeoutMs: void 0 });
      return;
    }
    const g = Math.max(0, parseInt(x, 10) || 0);
    n({ timeoutMs: g * Mt[i] });
  }, f = (x) => {
    s(x), typeof d == "number" && !Number.isNaN(d) && n({ timeoutMs: d * Mt[x] });
  }, h = Math.max(1, r.length);
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ o(
      be,
      {
        label: "Approvers",
        required: !0,
        error: a ? "At least one approver is required." : void 0,
        help: a ? void 0 : "Who can approve this step.",
        children: [
          /* @__PURE__ */ e(
            Ia,
            {
              value: c,
              onChange: l,
              placeholder: "Add approver…"
            }
          ),
          r.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 mt-2", children: r.map((x, g) => /* @__PURE__ */ o(
            "span",
            {
              className: I(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-[1.4] whitespace-nowrap",
                x.type === "role" ? "bg-[#fffbeb] text-[#d97706]" : "bg-[#eff6ff] text-[#2563eb]"
              ),
              children: [
                x.type === "role" ? "🎖" : "👤",
                " ",
                x.value,
                /* @__PURE__ */ e(
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
    /* @__PURE__ */ e(
      be,
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
              onChange: (x) => {
                const g = parseInt(x.target.value, 10), m = Math.max(1, Math.min(h, Number.isNaN(g) ? 1 : g));
                n({ requiredCount: m });
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
    /* @__PURE__ */ o(be, { label: "Timeout", help: "Leave blank for no timeout.", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "number",
            min: 0,
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-24 flex-none font-inherit",
            value: d,
            onChange: (x) => u(x.target.value),
            placeholder: "24"
          }
        ),
        /* @__PURE__ */ o(
          "select",
          {
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-[120px] flex-none font-inherit",
            value: i,
            onChange: (x) => f(x.target.value),
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
        /* @__PURE__ */ e("div", { className: "flex gap-3 mt-1", children: ["reject", "approve"].map((x) => /* @__PURE__ */ o(
          "label",
          {
            className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
            children: [
              /* @__PURE__ */ e(
                "input",
                {
                  type: "radio",
                  name: "approval-timeout-action",
                  checked: (t.timeoutAction ?? "reject") === x,
                  onChange: () => n({ timeoutAction: x })
                }
              ),
              x === "reject" ? "Reject" : "Approve"
            ]
          },
          x
        )) })
      ] })
    ] }),
    /* @__PURE__ */ e(be, { label: "Message for approver (optional)", help: "Shown to the approver when the request is sent.", children: /* @__PURE__ */ e(
      "textarea",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]",
        value: t.message ?? "",
        onChange: (x) => n({ message: x.target.value || void 0 }),
        placeholder: "Please review the summary before it's posted to the document."
      }
    ) })
  ] });
}
function Rn(t) {
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
function ko(t) {
  const n = Array.isArray(t.type) ? t.type[0] : t.type;
  if (n === "array") {
    const r = t.items ? Array.isArray(t.items.type) ? t.items.type[0] : t.items.type : void 0;
    return r ? `array of ${r}` : "array";
  }
  return n ?? "unknown";
}
function Et(t, n, r, a, i) {
  if (i.has(t)) return;
  i.add(t);
  const s = Array.isArray(t.type) ? t.type[0] : t.type, d = [t.anyOf, t.oneOf, t.allOf].filter(Boolean);
  for (const c of d)
    for (const l of c)
      Et(l, n, r, a, i);
  if (s === "object" && t.properties) {
    for (const [c, l] of Object.entries(t.properties)) {
      const p = `${n}.${c}`, u = Rn(l);
      a.push({
        path: p,
        label: `${c} (${ko(l)})`,
        depth: r,
        kind: u,
        isArrayItems: u === "array"
      }), Et(l, p, r + 1, a, i);
    }
    return;
  }
  if (s === "array") {
    const c = `${n}[*]`, l = t.items, p = l ? Rn(l) : "unknown";
    a.push({
      path: c,
      label: `${n.slice(n.lastIndexOf(".") + 1)}[*] (each item)`,
      depth: r,
      kind: p,
      isArrayItems: !0
    }), l && Et(l, c, r + 1, a, i);
  }
}
function Wl(t, n = "$") {
  if (!t || typeof t != "object") return [];
  const r = [], a = /* @__PURE__ */ new Set();
  if ((Array.isArray(t.type) ? t.type[0] : t.type) === "object" && t.properties)
    for (const [s, d] of Object.entries(t.properties)) {
      const c = `${n}.${s}`, l = Rn(d);
      r.push({
        path: c,
        label: `${s} (${ko(d)})`,
        depth: 0,
        kind: l,
        isArrayItems: l === "array"
      }), Et(d, c, 1, r, a);
    }
  else
    Et(t, n, 0, r, a);
  return r;
}
const Jl = {};
function Hl() {
  return `${(typeof import.meta < "u" && Jl?.VITE_SOCIAL_API_URL) ?? ""}/api/pipeline/output-schemas`;
}
let dn = null, yt = null;
async function Kl() {
  return dn || (yt || (yt = fetch(Hl()).then((t) => {
    if (!t.ok) throw new Error(`HTTP ${t.status}`);
    return t.json();
  }).then((t) => (dn = t, yt = null, t)).catch((t) => {
    throw yt = null, t;
  })), yt);
}
const Gl = {
  array: "bg-indigo-50 text-indigo-700 border-indigo-200",
  object: "bg-slate-50 text-slate-600 border-slate-200",
  string: "bg-emerald-50 text-emerald-700 border-emerald-200",
  number: "bg-amber-50 text-amber-700 border-amber-200",
  boolean: "bg-pink-50 text-pink-700 border-pink-200",
  unknown: "bg-slate-50 text-slate-400 border-slate-200"
};
function Yl({ kind: t }) {
  return /* @__PURE__ */ e(
    "span",
    {
      className: I(
        "inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4",
        Gl[t]
      ),
      children: t
    }
  );
}
function Xl({ entry: t, isSelected: n, onPick: r }) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      onClick: () => r(t.path),
      "data-testid": `path-row-${t.path}`,
      className: I(
        "w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors duration-100",
        "hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400/50",
        n && "bg-indigo-50 ring-1 ring-inset ring-indigo-300",
        t.isArrayItems && !n && "hover:bg-indigo-50"
      ),
      style: { paddingLeft: `${8 + t.depth * 12}px` },
      children: [
        /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "flex-1 font-mono text-[12px] leading-5 truncate",
              t.isArrayItems ? "text-indigo-700 font-semibold" : "text-slate-700"
            ),
            children: t.path
          }
        ),
        /* @__PURE__ */ e(Yl, { kind: t.kind })
      ]
    }
  );
}
function Ql({
  value: t,
  onChange: n,
  upstreamKind: r,
  upstreamSchema: a
}) {
  const [i, s] = S("idle"), [d, c] = S(null), l = ie(!0);
  ee(() => (l.current = !0, () => {
    l.current = !1;
  }), []);
  const p = q(() => a !== void 0 ? a : d, [a, d]);
  ee(() => {
    !r || a !== void 0 || (s("loading"), Kl().then((m) => {
      if (!l.current) return;
      const N = m.schemas[r] ?? null;
      c(N), s("done");
    }).catch(() => {
      l.current && s("error");
    }));
  }, [r, a]);
  const u = q(
    () => Wl(p),
    [p]
  ), f = p !== null && u.length > 0, h = D(
    (m) => {
      n(m);
    },
    [n]
  );
  if (!r && a === void 0)
    return /* @__PURE__ */ e(
      rn,
      {
        value: t,
        onChange: n,
        enforcePrefix: !0,
        "data-testid": "scatter-path-plain-input"
      }
    );
  if (!f)
    return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
      i === "loading" && /* @__PURE__ */ o("p", { className: "text-[11px] text-slate-400 leading-4", children: [
        "Loading schema for ",
        r,
        "…"
      ] }),
      i === "error" && /* @__PURE__ */ e("p", { className: "text-[11px] text-amber-600 leading-4", children: "Could not load schema — enter path manually." }),
      (i === "done" || a === null) && /* @__PURE__ */ o("p", { className: "text-[11px] text-slate-400 leading-4", children: [
        "Schema unavailable for ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: r }),
        " — enter path manually."
      ] }),
      /* @__PURE__ */ e(
        rn,
        {
          value: t,
          onChange: n,
          enforcePrefix: !0,
          "data-testid": "scatter-path-fallback-input"
        }
      )
    ] });
  const g = u.filter((m) => m.isArrayItems).length < u.length;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("p", { className: "text-[11px] text-slate-500 leading-4", children: [
      "Click a path to set itemsPath.",
      g && /* @__PURE__ */ o(G, { children: [
        " ",
        /* @__PURE__ */ e("span", { className: "text-indigo-600 font-semibold", children: "Indigo" }),
        " ",
        "paths are arrays — valid scatter sources."
      ] })
    ] }),
    /* @__PURE__ */ e(
      "div",
      {
        className: "flex flex-col gap-px border border-slate-200 rounded-md bg-white max-h-48 overflow-y-auto",
        "data-testid": "scatter-path-tree",
        role: "listbox",
        "aria-label": "Available output paths",
        children: u.map((m) => /* @__PURE__ */ e(
          Xl,
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
      rn,
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
const pn = "text-[12px] font-semibold text-text-secondary", un = "text-[11px] text-text-tertiary mt-0.5", Zl = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary";
function ec(t) {
  const { definition: n } = qe();
  return q(() => {
    if (!t || !n) return;
    const r = n.edges.find((i) => i.target === t);
    if (!r) return;
    const a = n.nodes.find((i) => i.id === r.source);
    if (a)
      return a.type;
  }, [t, n]);
}
function tc({ data: t, onChange: n }) {
  const { selectedNodeId: r } = qe(), a = ec(r), i = t.maxConcurrency ?? "";
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { className: pn, children: [
        "Items path",
        /* @__PURE__ */ e("span", { className: "text-red-600 ml-1", "aria-hidden": !0, children: "*" })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-1", children: /* @__PURE__ */ e(
        Ql,
        {
          value: t.itemsPath ?? "",
          onChange: (s) => n({ itemsPath: s }),
          upstreamKind: a
        }
      ) }),
      !t.itemsPath?.trim() && /* @__PURE__ */ e("div", { role: "alert", className: "text-[11px] text-red-600 mt-0.5", children: "Items path is required." }),
      !!t.itemsPath && !t.itemsPath.startsWith("$.") && /* @__PURE__ */ o("div", { role: "alert", className: "text-[11px] text-red-600 mt-0.5", children: [
        "Path must start with ",
        /* @__PURE__ */ e("code", { children: "$." })
      ] }),
      !!t.itemsPath?.startsWith("$.") && /* @__PURE__ */ e("div", { className: un, children: "JSONPath into context resolving to an array. Each element becomes one scatter arm." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-item-alias", className: pn, children: [
        "Item alias ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, default: item)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "scatter-item-alias",
          type: "text",
          spellCheck: !1,
          className: Zl,
          value: t.itemAlias ?? "",
          onChange: (s) => n({ itemAlias: s.target.value.trim() || void 0 }),
          placeholder: "item"
        }
      ),
      /* @__PURE__ */ o("div", { className: un, children: [
        "Key written to ",
        /* @__PURE__ */ e("code", { children: "$.scatter.<alias>" }),
        " for each arm."
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-max-concurrency", className: pn, children: [
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
            n({
              maxConcurrency: d === "" ? void 0 : Math.max(1, parseInt(d, 10) || 1)
            });
          },
          placeholder: "4"
        }
      ),
      /* @__PURE__ */ e("div", { className: un, children: "Maximum number of arms executing concurrently." })
    ] })
  ] });
}
const nc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function rc({ samples: t, onSelect: n }) {
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
const oc = ["cover", "contain", "fill", "inside", "outside"], vt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", Nt = "text-[12px] font-semibold text-text-secondary", mr = "text-[11px] text-text-tertiary mt-0.5";
function ac({ data: t, onChange: n }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "resize-source-image-path", className: Nt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "resize-source-image-path",
          type: "text",
          spellCheck: !1,
          className: vt,
          value: t.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(rc, { samples: nc, onSelect: (r) => n({ sourceImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "resize-width", className: Nt, children: "Width (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "resize-width",
            type: "number",
            min: 1,
            step: 1,
            className: vt,
            value: t.width ?? "",
            onChange: (r) => {
              const a = parseInt(r.target.value, 10);
              n({ width: Number.isFinite(a) && a > 0 ? a : void 0 });
            },
            placeholder: "e.g. 512"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "resize-height", className: Nt, children: "Height (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "resize-height",
            type: "number",
            min: 1,
            step: 1,
            className: vt,
            value: t.height ?? "",
            onChange: (r) => {
              const a = parseInt(r.target.value, 10);
              n({ height: Number.isFinite(a) && a > 0 ? a : void 0 });
            },
            placeholder: "e.g. 512"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "resize-fit", className: Nt, children: "Fit mode" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "resize-fit",
          className: vt,
          value: t.fit ?? "cover",
          onChange: (r) => n({ fit: r.target.value }),
          children: oc.map((r) => /* @__PURE__ */ e("option", { value: r, children: r }, r))
        }
      ),
      /* @__PURE__ */ o("div", { className: mr, children: [
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
          onChange: (r) => n({ withoutEnlargement: r.target.checked }),
          className: "w-3.5 h-3.5 accent-primary"
        }
      ),
      "Do not enlarge if already smaller than target"
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "resize-background", className: Nt, children: [
        "Background colour ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, for contain / fill)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "resize-background",
          type: "text",
          spellCheck: !1,
          className: vt,
          value: t.background ?? "",
          onChange: (r) => n({ background: r.target.value.trim() || void 0 }),
          placeholder: "#ffffff"
        }
      ),
      /* @__PURE__ */ o("div", { className: mr, children: [
        "Hex colour used to fill letterbox padding. Only applies when fit is ",
        /* @__PURE__ */ e("code", { children: "contain" }),
        " or ",
        /* @__PURE__ */ e("code", { children: "fill" }),
        "."
      ] })
    ] })
  ] });
}
const ic = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function sc({ samples: t, onSelect: n }) {
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
function lc(t) {
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
const Pn = "text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", cc = "flex-1 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", hr = "text-[12px] font-semibold text-text-secondary", dc = "text-[11px] text-text-tertiary mt-0.5";
function pc({ op: t, index: n, onUpdate: r, onRemove: a }) {
  return /* @__PURE__ */ o("div", { className: "border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2", "data-testid": `geo-op-card-${n}`, children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary font-semibold min-w-[20px]", children: [
        n + 1,
        "."
      ] }),
      /* @__PURE__ */ o(
        "select",
        {
          className: cc,
          value: t.op,
          onChange: (i) => r(lc(i.target.value)),
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
          onClick: a,
          className: "ml-auto text-[11px] font-semibold bg-transparent text-red-600 border border-transparent rounded px-2 py-0.5 cursor-pointer hover:bg-red-50",
          "aria-label": `Remove op ${n + 1}`,
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
            className: `${Pn} w-24`,
            value: t.degrees,
            onChange: (i) => {
              const s = parseFloat(i.target.value);
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
            className: `${Pn} flex-1`,
            value: t.background ?? "",
            onChange: (i) => r({ ...t, background: i.target.value.trim() || void 0 }),
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
            onChange: (i) => r({ ...t, trimAfter: i.target.checked }),
            className: "w-3.5 h-3.5 accent-primary"
          }
        ),
        "Trim after rotate"
      ] })
    ] })
  ] });
}
function uc({ data: t, onChange: n }) {
  const r = t.operations ?? [], a = (d, c) => {
    n({ operations: r.map((l, p) => p === d ? c : l) });
  }, i = (d) => {
    n({ operations: r.filter((c, l) => l !== d) });
  }, s = () => {
    n({ operations: [...r, { op: "rotate", degrees: 90 }] });
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "transform-geo-source-image-path", className: hr, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "transform-geo-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `mt-1 w-full ${Pn}`,
          value: t.sourceImagePath ?? "",
          onChange: (d) => n({ sourceImagePath: d.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(sc, { samples: ic, onSelect: (d) => n({ sourceImagePath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${hr} mb-2`, children: [
        "Operations ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      r.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-2 italic", children: "No operations — add at least one." }),
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: r.map((d, c) => /* @__PURE__ */ e(
        pc,
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
          className: `w-full text-[12px] font-semibold bg-surface-hover text-text-secondary border border-border rounded-md cursor-pointer py-1.5 px-3 ${r.length > 0 ? "mt-2" : ""}`,
          "data-testid": "add-geo-op-btn",
          children: "+ Add operation"
        }
      ),
      /* @__PURE__ */ e("div", { className: `${dc} mt-1.5`, children: "Supported: Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror)." })
    ] })
  ] });
}
const mc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function hc({ samples: t, onSelect: n }) {
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
const fc = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "avif", label: "AVIF" }
], Mn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", xc = `${Mn} font-mono`, mn = "text-[12px] font-semibold text-text-secondary", hn = "text-[11px] text-text-tertiary mt-0.5";
function gc({ data: t, onChange: n }) {
  const r = t.format === "jpeg" || t.format === "webp" || t.format === "avif";
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-source-image-path", className: mn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "format-convert-source-image-path",
          type: "text",
          spellCheck: !1,
          className: xc,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(hc, { samples: mc, onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "format-convert-format", className: mn, children: "Output format" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "format-convert-format",
          className: Mn,
          value: t.format ?? "jpeg",
          onChange: (a) => n({ format: a.target.value }),
          children: fc.map((a) => /* @__PURE__ */ e("option", { value: a.value, children: a.label }, a.value))
        }
      )
    ] }),
    r && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-quality", className: mn, children: [
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
          className: Mn,
          value: t.quality ?? 80,
          onChange: (a) => {
            const i = parseInt(a.target.value, 10);
            n({ quality: Number.isFinite(i) ? Math.min(100, Math.max(1, i)) : 80 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: hn, children: "Higher = better quality, larger file. 80 is a good default." })
    ] }),
    (t.format === "webp" || t.format === "avif") && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-lossless", className: "flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer", children: [
        /* @__PURE__ */ e(
          "input",
          {
            id: "format-convert-lossless",
            type: "checkbox",
            checked: t.lossless ?? !1,
            onChange: (a) => n({ lossless: a.target.checked }),
            className: "w-3.5 h-3.5 accent-primary"
          }
        ),
        "Lossless encoding"
      ] }),
      /* @__PURE__ */ e("div", { className: hn, children: "Overrides quality when enabled. Produces larger files with no compression artefacts." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-strip-metadata", className: "flex items-center gap-2 text-[12px] font-semibold text-text-secondary cursor-pointer", children: [
        /* @__PURE__ */ e(
          "input",
          {
            id: "format-convert-strip-metadata",
            type: "checkbox",
            checked: t.stripMetadata ?? !1,
            onChange: (a) => n({ stripMetadata: a.target.checked }),
            className: "w-3.5 h-3.5 accent-primary"
          }
        ),
        "Strip EXIF and metadata"
      ] }),
      /* @__PURE__ */ e("div", { className: hn, children: "Removes camera EXIF, GPS, copyright tags etc. Reduces file size; recommended for web delivery." })
    ] })
  ] });
}
const bc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function yc({ samples: t, onSelect: n }) {
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
const Ft = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", jt = "text-[12px] font-semibold text-text-secondary", fn = "text-[11px] text-text-tertiary mt-0.5";
function vc({ data: t, onChange: n }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-source-image-path", className: jt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "sharpen-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `${Ft} font-mono`,
          value: t.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(yc, { samples: bc, onSelect: (r) => n({ sourceImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-sigma", className: jt, children: [
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
          className: Ft,
          value: t.sigma ?? "",
          onChange: (r) => {
            const a = parseFloat(r.target.value);
            n({ sigma: Number.isFinite(a) && a > 0 ? a : void 0 });
          },
          placeholder: "1"
        }
      ),
      /* @__PURE__ */ e("div", { className: fn, children: "Gaussian mask sigma. Higher = broader/stronger sharpening. Typical range: 0.5–3." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-m1", className: jt, children: [
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
          className: Ft,
          value: t.m1 ?? "",
          onChange: (r) => {
            const a = parseFloat(r.target.value);
            n({ m1: Number.isFinite(a) && a >= 0 ? a : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: fn, children: "Level of sharpening applied to flat (smooth) areas of the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-m2", className: jt, children: [
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
          className: Ft,
          value: t.m2 ?? "",
          onChange: (r) => {
            const a = parseFloat(r.target.value);
            n({ m2: Number.isFinite(a) && a >= 0 ? a : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: fn, children: "Level of sharpening applied to jagged (edge) areas of the image." })
    ] })
  ] });
}
const Nc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function wc({ samples: t, onSelect: n }) {
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
const kc = [
  "northwest",
  "north",
  "northeast",
  "west",
  "center",
  "east",
  "southwest",
  "south",
  "southeast"
], It = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", fr = `${It} font-mono`, at = "text-[12px] font-semibold text-text-secondary", xr = "text-[11px] text-text-tertiary mt-0.5";
function Cc({ data: t, onChange: n }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "watermark-source-image-path", className: at, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-source-image-path",
          type: "text",
          spellCheck: !1,
          className: fr,
          value: t.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(wc, { samples: Nc, onSelect: (r) => n({ sourceImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-overlay-image-id", className: at, children: "Overlay image ID" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-overlay-image-id",
          type: "text",
          spellCheck: !1,
          className: fr,
          value: t.overlayImageId ?? "",
          onChange: (r) => n({ overlayImageId: r.target.value.trim() }),
          placeholder: "img_xxxxxxxx"
        }
      ),
      /* @__PURE__ */ e("div", { className: xr, children: "The imageId of the watermark/overlay image already stored in the blob store. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-gravity", className: at, children: "Gravity (placement)" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "watermark-gravity",
          className: It,
          value: t.gravity ?? "southeast",
          onChange: (r) => n({ gravity: r.target.value }),
          children: kc.map((r) => /* @__PURE__ */ e("option", { value: r, children: r }, r))
        }
      ),
      /* @__PURE__ */ e("div", { className: xr, children: "Where the overlay is placed on the source image. Default: southeast." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "watermark-opacity", className: at, children: [
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
          className: It,
          value: t.opacity ?? 1,
          onChange: (r) => {
            const a = parseFloat(r.target.value);
            n({ opacity: Number.isFinite(a) ? Math.min(1, Math.max(0, a)) : 1 });
          }
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "watermark-offset-x", className: at, children: "Offset X (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "watermark-offset-x",
            type: "number",
            step: 1,
            className: It,
            value: t.offsetX ?? "",
            onChange: (r) => {
              const a = parseInt(r.target.value, 10);
              n({ offsetX: Number.isFinite(a) ? a : void 0 });
            },
            placeholder: "0"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "watermark-offset-y", className: at, children: "Offset Y (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "watermark-offset-y",
            type: "number",
            step: 1,
            className: It,
            value: t.offsetY ?? "",
            onChange: (r) => {
              const a = parseInt(r.target.value, 10);
              n({ offsetY: Number.isFinite(a) ? a : void 0 });
            },
            placeholder: "0"
          }
        )
      ] })
    ] })
  ] });
}
const Ic = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
], Sc = [
  "$.scatter.item.bbox",
  "$.steps.visionAnalyze.output.extracted.regions[0].bbox",
  "$.trigger.payload.bbox"
];
function gr({ samples: t, onSelect: n }) {
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
const br = "mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", yr = "text-[12px] font-semibold text-text-secondary", xn = "text-[11px] text-text-tertiary mt-0.5";
function $c({ data: t, onChange: n }) {
  const r = t.materialize !== !1;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-source-image-path", className: yr, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "crop-source-image-path",
          type: "text",
          spellCheck: !1,
          className: br,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ o("div", { className: xn, children: [
        "JSONPath to the imageId of the source image. Defaults server-side to",
        " ",
        /* @__PURE__ */ e("code", { children: "$.scatter.parentImageId" }),
        "."
      ] }),
      /* @__PURE__ */ e(gr, { samples: Ic, onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-bbox-path", className: yr, children: [
        "Bounding-box path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "crop-bbox-path",
          type: "text",
          spellCheck: !1,
          className: br,
          value: t.bboxPath ?? "",
          onChange: (a) => n({ bboxPath: a.target.value.trim() || void 0 }),
          placeholder: "$.scatter.item.bbox"
        }
      ),
      /* @__PURE__ */ o("div", { className: xn, children: [
        "JSONPath to a bbox object ",
        /* @__PURE__ */ e("code", { children: "{ x, y, width, height }" }),
        " in pixels."
      ] }),
      /* @__PURE__ */ e(gr, { samples: Sc, onSelect: (a) => n({ bboxPath: a }) })
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
              checked: r,
              onChange: (a) => n({ materialize: a.target.checked }),
              className: "w-3.5 h-3.5 accent-primary"
            }
          ),
          "Persist crop to blob store"
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: xn, children: "When enabled (default), the cropped image is saved to the ImageBlobStore." })
  ] });
}
const Tc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Ac({ samples: t, onSelect: n }) {
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
const vr = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", gn = "text-[12px] font-semibold text-text-secondary", bn = "text-[11px] text-text-tertiary mt-0.5";
function Rc({ data: t, onChange: n }) {
  const r = t.algorithm ?? "luminosity", a = t.contrast ?? 1;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-bw-source-image-path", className: gn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "adjust-bw-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `${vr} font-mono`,
          value: t.sourceImagePath ?? "",
          onChange: (i) => n({ sourceImagePath: i.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: bn, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(Ac, { samples: Tc, onSelect: (i) => n({ sourceImagePath: i }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "adjust-bw-algorithm", className: gn, children: "Greyscale algorithm" }),
      /* @__PURE__ */ o(
        "select",
        {
          id: "adjust-bw-algorithm",
          className: vr,
          value: r,
          onChange: (i) => n({ algorithm: i.target.value }),
          children: [
            /* @__PURE__ */ e("option", { value: "luminosity", children: "Luminosity — 0.21R + 0.72G + 0.07B (perceptually accurate)" }),
            /* @__PURE__ */ e("option", { value: "average", children: "Average — (R+G+B)/3 (fast, flat)" }),
            /* @__PURE__ */ e("option", { value: "desaturate", children: "Desaturate — (max+min)/2 (Lightness channel)" })
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: bn, children: "Controls how RGB channels are weighted when converting to greyscale." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-bw-contrast", className: gn, children: [
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
            n({ contrast: Number.isFinite(s) ? Math.max(0, s) : 1 });
          }
        }
      ),
      /* @__PURE__ */ o("div", { className: bn, children: [
        "Applied after greyscale conversion. 1 = no change, ",
        "<",
        "1 = lower contrast,",
        " >",
        "1 = higher contrast. Range 0–4."
      ] })
    ] })
  ] });
}
function Pc({
  value: t,
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
  const [u, f] = S(!1), [h, x] = S(null), [g, m] = S("");
  async function N(w) {
    f(!0), x(null);
    try {
      const b = await r(w);
      n(b), m("");
    } catch (b) {
      const k = b instanceof Error ? b.message : "Upload failed. Please try again.";
      x(k);
    } finally {
      f(!1);
    }
  }
  function v(w) {
    w.length > 0 && N(w[0]);
  }
  async function y() {
    const w = g.trim();
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
            lo,
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
            className: "text-sm text-slate-500",
            "data-testid": p ? `${p}-uploading` : void 0,
            children: "Uploading..."
          }
        ),
        !c && /* @__PURE__ */ e(
          wa,
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
              /* @__PURE__ */ e(
                Dt,
                {
                  type: "url",
                  placeholder: "https://example.com/image.jpg",
                  value: g,
                  onChange: (w) => m(w.target.value),
                  disabled: u,
                  "data-testid": p ? `${p}-url-input` : void 0,
                  onKeyDown: (w) => {
                    w.key === "Enter" && y();
                  }
                }
              ),
              /* @__PURE__ */ e(
                Ee,
                {
                  variant: "secondary",
                  size: "sm",
                  onClick: () => {
                    y();
                  },
                  disabled: u || !g.trim(),
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
            className: "text-sm text-red-600",
            "data-testid": p ? `${p}-error` : void 0,
            children: h
          }
        )
      ]
    }
  );
}
function Co(t) {
  const n = so(), r = n.uploadImage;
  return r ? /* @__PURE__ */ e(
    Pc,
    {
      ...t,
      uploadImage: r,
      getImageUrl: n.getImageUrl
    }
  ) : /* @__PURE__ */ e("div", { className: "text-sm text-slate-500", children: "This host has not wired uploadImage. Cannot accept new uploads." });
}
const En = {
  brightness: "Brightness",
  contrast: "Contrast",
  saturation: "Saturation",
  hue: "Hue",
  blur: "Blur"
}, Io = Object.keys(En).map((t) => ({
  value: t,
  label: En[t]
})), Mc = {
  brightness: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  contrast: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  saturation: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  hue: { min: -180, max: 180, step: 1, unit: "°", defaultValue: 0 },
  blur: { min: 0, max: 50, step: 0.5, unit: "px", defaultValue: 1 }
};
function So(t) {
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
function Ec(t) {
  switch (t.kind) {
    case "hue":
      return t.degrees;
    case "blur":
      return t.radiusPx;
    default:
      return t.value;
  }
}
function Nr(t, n) {
  switch (t.kind) {
    case "hue":
      return { kind: "hue", degrees: n };
    case "blur":
      return { kind: "blur", radiusPx: n };
    default:
      return { kind: t.kind, value: n };
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
function Oc({ layer: t, index: n, onUpdate: r, onRemove: a }) {
  const i = Mc[t.kind], s = Ec(t), d = (p) => {
    r(So(p.target.value));
  }, c = (p) => {
    const u = parseFloat(p.target.value);
    Number.isFinite(u) && r(Nr(t, u));
  }, l = (p) => {
    r(Nr(t, p));
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-surface-inset",
      "data-testid": `layer-row-${n}`,
      children: [
        /* @__PURE__ */ e("span", { className: Dc, "aria-hidden": "true", title: "Drag handle", children: "⠿" }),
        /* @__PURE__ */ e(
          Yt,
          {
            value: t.kind,
            onChange: d,
            options: Io,
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
            min: i.min,
            max: i.max,
            step: i.step,
            value: s,
            onChange: c,
            className: "flex-1 h-1 accent-primary cursor-pointer min-w-0",
            "aria-label": `${En[t.kind]} slider`,
            "data-testid": `layer-slider-${n}`
          }
        ),
        /* @__PURE__ */ e(
          Ko,
          {
            value: s,
            onChange: l,
            min: i.min,
            max: i.max,
            step: i.step,
            unit: i.unit,
            size: "sm",
            "data-testid": `layer-number-${n}`
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
              "cursor-pointer hover:text-red-600 hover:bg-red-50"
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
const _c = 150;
function Lc(t, n, r) {
  const [a, i] = S(null), [s, d] = S(!1), c = ie(null), l = ie(null), p = D(
    async (u, f) => {
      l.current?.abort();
      const h = new AbortController();
      l.current = h, d(!0);
      try {
        const x = await fetch(`${r}/api/pipeline/preview/adjust-layer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageId: u, layers: f }),
          signal: h.signal
        });
        if (!x.ok) return;
        const g = await x.json();
        g.dataUrl && i(g.dataUrl);
      } catch {
      } finally {
        d(!1);
      }
    },
    [r]
  );
  return ee(() => {
    if (!t) {
      i(null);
      return;
    }
    return c.current && clearTimeout(c.current), c.current = setTimeout(() => {
      p(t, n);
    }, _c), () => {
      c.current && clearTimeout(c.current);
    };
  }, [t, JSON.stringify(n), p]), { previewSrc: a, loading: s };
}
function wr(t) {
  return t.length <= 8 ? t : `${t.slice(0, 8)}…`;
}
function Bc({
  layers: t,
  onChange: n,
  autoSourceImageId: r,
  pinnedSourceImageId: a,
  onPinnedSourceImageIdChange: i,
  sourceImageId: s,
  apiBase: d = ""
}) {
  const [c, l] = S("brightness"), [p, u] = S(!1), f = r ?? s, h = a ?? f, x = !!a, { previewSrc: g, loading: m } = Lc(h, t, d), N = () => {
    i?.(void 0);
  }, v = (C) => {
    C?.imageId && (i?.(C.imageId), u(!1));
  }, y = (C, A) => {
    n(t.map(($, T) => T === C ? A : $));
  }, w = (C) => {
    n(t.filter((A, $) => $ !== C));
  }, b = () => {
    n([...t, So(c)]);
  }, k = (C) => {
    l(C.target.value);
  };
  return /* @__PURE__ */ o("div", { className: "flex gap-3 p-3", "data-testid": "adjust-layer-slider-panel", children: [
    /* @__PURE__ */ o("div", { className: "flex-1 flex flex-col gap-2 min-w-0", children: [
      t.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary italic", children: "No layers — add one below." }),
      t.map((C, A) => /* @__PURE__ */ e(
        Oc,
        {
          layer: C,
          index: A,
          onUpdate: ($) => y(A, $),
          onRemove: () => w(A)
        },
        A
      )),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mt-1", children: [
        /* @__PURE__ */ e(
          Yt,
          {
            value: c,
            onChange: k,
            options: Io,
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
            x && h ? /* @__PURE__ */ o(
              ce,
              {
                tone: "neutral",
                size: "xs",
                "data-testid": "adjust-layer-source-chip-pinned",
                children: [
                  /* @__PURE__ */ o("span", { children: [
                    "Source: pinned (",
                    wr(h),
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
              ce,
              {
                tone: "info",
                size: "xs",
                "data-testid": "adjust-layer-source-chip-auto",
                children: [
                  "Source: ",
                  wr(f),
                  " from upstream run"
                ]
              }
            ) : null,
            i && /* @__PURE__ */ e(
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
      p && i && /* @__PURE__ */ e(
        "div",
        {
          className: "w-48",
          "data-testid": "adjust-layer-override-uploader-wrap",
          children: /* @__PURE__ */ e(
            Co,
            {
              value: null,
              onChange: v,
              "data-testid": "adjust-layer-override-uploader"
            }
          )
        }
      ),
      h ? /* @__PURE__ */ o("div", { className: "relative", children: [
        /* @__PURE__ */ e(
          lo,
          {
            src: g ?? "",
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
const Uc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
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
const kr = "text-[12px] font-semibold text-text-secondary", jc = "text-[11px] text-text-tertiary mt-0.5";
function zc(t) {
  const { definition: n } = qe(), r = q(() => !t || !n ? null : n.edges.find((s) => s.target === t)?.source ?? null, [n, t]);
  return me(r ?? "")?.images?.[0]?.imageId;
}
function qc({
  data: t,
  onChange: n,
  currentNodeId: r
}) {
  const a = zc(r), i = t.previewSourceImageId, s = t.layers ?? [];
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-layer-source-image-path", className: kr, children: [
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
          onChange: (d) => n({ sourceImagePath: d.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: jc, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(Fc, { samples: Uc, onSelect: (d) => n({ sourceImagePath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${kr} mb-1`, children: [
        "Adjustment layers ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      /* @__PURE__ */ e(
        Bc,
        {
          layers: s,
          onChange: (d) => n({ layers: d }),
          autoSourceImageId: a,
          pinnedSourceImageId: i,
          onPinnedSourceImageIdChange: (d) => n({ previewSourceImageId: d })
        }
      )
    ] })
  ] });
}
function Vc(t) {
  const { selectedNodeId: n } = qe();
  return /* @__PURE__ */ e(qc, { ...t, currentNodeId: n });
}
const Cr = 50;
function Wc(t, n) {
  const [r, a] = S(t), [i, s] = S([]), [d, c] = S([]), l = ie(r);
  l.current = r;
  const p = D(
    (v) => {
      a((y) => {
        const w = v(y);
        return s((b) => {
          const k = [...b, y];
          return k.length > Cr && k.shift(), k;
        }), c([]), n(w), w;
      });
    },
    [n]
  ), u = D(
    (v) => {
      p((y) => [...y, v]);
    },
    [p]
  ), f = D(
    (v, y, w) => {
      p(
        (b) => b.map((k) => k.id === v ? { ...k, x: y, y: w } : k)
      );
    },
    [p]
  ), h = D(
    (v, y, w, b, k) => {
      p(
        (C) => C.map((A) => A.id === v ? { ...A, x: y, y: w, width: b, height: k } : A)
      );
    },
    [p]
  ), x = D(
    (v, y) => {
      p(
        (w) => w.map((b) => b.id === v ? { ...b, label: y } : b)
      );
    },
    [p]
  ), g = D(
    (v) => {
      p((y) => y.filter((w) => w.id !== v));
    },
    [p]
  ), m = D(() => {
    s((v) => {
      if (v.length === 0) return v;
      const y = v[v.length - 1];
      c((b) => [...b, l.current]);
      const w = y;
      return a(w), n(w), v.slice(0, -1);
    });
  }, [n]), N = D(() => {
    c((v) => {
      if (v.length === 0) return v;
      const y = v[v.length - 1];
      s((b) => {
        const k = [...b, l.current];
        return k.length > Cr && k.shift(), k;
      });
      const w = y;
      return a(w), n(w), v.slice(0, -1);
    });
  }, [n]);
  return {
    boxes: r,
    addBox: u,
    moveBox: f,
    resizeBox: h,
    setLabel: x,
    deleteBox: g,
    undo: m,
    redo: N,
    canUndo: i.length > 0,
    canRedo: d.length > 0
  };
}
function Jc() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Ne(t, n, r) {
  return Math.max(n, Math.min(r, t));
}
function yn(t, n) {
  const r = n.getBoundingClientRect();
  return {
    x: Ne(t.clientX - r.left, 0, r.width),
    y: Ne(t.clientY - r.top, 0, r.height)
  };
}
function vn(t, n, r, a, i, s) {
  const d = i / r, c = s / a;
  return { x: t * d, y: n * c };
}
function Ir(t, n, r) {
  return {
    left: `${t.x / n * 100}%`,
    top: `${t.y / r * 100}%`,
    width: `${t.width / n * 100}%`,
    height: `${t.height / r * 100}%`
  };
}
function Hc(t, n, r) {
  for (let a = r.length - 1; a >= 0; a--) {
    const i = r[a];
    if (t >= i.x && t <= i.x + i.width && n >= i.y && n <= i.y + i.height)
      return i;
  }
  return null;
}
function Kc({
  imageUrl: t,
  imageWidth: n,
  imageHeight: r,
  boxes: a,
  onChange: i,
  readOnly: s = !1,
  className: d
}) {
  const c = ie(null), [l, p] = S({ kind: "idle" }), [u, f] = S(null), h = ie(null), { addBox: x, moveBox: g, resizeBox: m, setLabel: N, deleteBox: v } = Wc(
    a,
    i
  );
  ee(() => {
    u && h.current && (h.current.focus(), h.current.select());
  }, [u]);
  const y = D(
    (O) => {
      if (s || O.button !== 0) return;
      const E = c.current;
      if (!E) return;
      O.preventDefault(), E.setPointerCapture(O.pointerId);
      const { x: H, y: J } = yn(O, E), L = E.getBoundingClientRect(), { x: z, y: V } = vn(
        H,
        J,
        L.width,
        L.height,
        n,
        r
      ), K = Hc(z, V, a);
      p(K ? {
        kind: "move",
        id: K.id,
        offsetX: z - K.x,
        offsetY: V - K.y,
        currentX: z,
        currentY: V
      } : { kind: "create", startX: z, startY: V, currentX: z, currentY: V });
    },
    [s, a, n, r]
  ), w = D(
    (O, E, H) => {
      if (s) return;
      O.stopPropagation(), O.preventDefault();
      const J = c.current;
      if (!J) return;
      J.setPointerCapture(O.pointerId);
      const { x: L, y: z } = yn(O, J), V = J.getBoundingClientRect(), { x: K, y: de } = vn(L, z, V.width, V.height, n, r);
      p({ kind: "resize", id: E.id, corner: H, origBox: { ...E }, currentX: K, currentY: de });
    },
    [s, n, r]
  ), b = D(
    (O) => {
      if (l.kind === "idle") return;
      const E = c.current;
      if (!E) return;
      const { x: H, y: J } = yn(O, E), L = E.getBoundingClientRect(), { x: z, y: V } = vn(H, J, L.width, L.height, n, r);
      l.kind === "create" ? p((K) => K.kind === "create" ? { ...K, currentX: z, currentY: V } : K) : l.kind === "move" ? p((K) => K.kind === "move" ? { ...K, currentX: z, currentY: V } : K) : l.kind === "resize" && p((K) => K.kind === "resize" ? { ...K, currentX: z, currentY: V } : K);
    },
    [l.kind, n, r]
  ), k = D(
    (O) => {
      if (l.kind === "create") {
        const E = Math.min(l.startX, l.currentX), H = Math.min(l.startY, l.currentY), J = Math.max(l.startX, l.currentX), L = Math.max(l.startY, l.currentY), z = J - E, V = L - H;
        z >= 4 && V >= 4 && x({ id: Jc(), x: E, y: H, width: z, height: V });
      } else if (l.kind === "move") {
        const E = a.find((H) => H.id === l.id);
        if (E) {
          const H = Ne(l.currentX - l.offsetX, 0, n - E.width), J = Ne(l.currentY - l.offsetY, 0, r - E.height);
          g(l.id, H, J);
        }
      } else if (l.kind === "resize") {
        const { id: E, corner: H, origBox: J, currentX: L, currentY: z } = l;
        let { x: V, y: K, width: de, height: F } = J;
        if (H === "nw") {
          const se = Ne(L, 0, V + de - 4), ye = Ne(z, 0, K + F - 4);
          de = V + de - se, F = K + F - ye, V = se, K = ye;
        } else if (H === "ne") {
          const se = Ne(z, 0, K + F - 4);
          de = Ne(L - V, 4, n - V), F = K + F - se, K = se;
        } else if (H === "sw") {
          const se = Ne(L, 0, V + de - 4);
          de = V + de - se, F = Ne(z - K, 4, r - K), V = se;
        } else
          de = Ne(L - V, 4, n - V), F = Ne(z - K, 4, r - K);
        m(E, V, K, de, F);
      }
      p({ kind: "idle" });
    },
    [l, a, x, g, m, n, r]
  ), C = D(
    (O, E) => {
      s || (O.preventDefault(), v(E));
    },
    [s, v]
  ), A = D(
    (O, E) => {
      s || (O.key === "Delete" || O.key === "Backspace") && (O.preventDefault(), v(E));
    },
    [s, v]
  ), $ = D(
    (O, E) => {
      s || (O.stopPropagation(), f({ id: E.id, value: E.label ?? "" }));
    },
    [s]
  ), T = D(() => {
    u && (N(u.id, u.value), f(null));
  }, [u, N]);
  let M = null;
  if (l.kind === "create") {
    const O = Math.min(l.startX, l.currentX), E = Math.min(l.startY, l.currentY), H = Math.max(l.startX, l.currentX), J = Math.max(l.startY, l.currentY);
    H - O >= 2 && J - E >= 2 && (M = { x: O, y: E, width: H - O, height: J - E });
  }
  let R = null;
  if (l.kind === "move") {
    const O = a.find((E) => E.id === l.id);
    if (O) {
      const E = Ne(l.currentX - l.offsetX, 0, n - O.width), H = Ne(l.currentY - l.offsetY, 0, r - O.height);
      R = { ...O, x: E, y: H };
    }
  }
  let j = null;
  if (l.kind === "resize") {
    const { corner: O, origBox: E, currentX: H, currentY: J } = l;
    let { x: L, y: z, width: V, height: K } = E;
    if (O === "nw") {
      const de = Ne(H, 0, L + V - 4), F = Ne(J, 0, z + K - 4);
      V = L + V - de, K = z + K - F, L = de, z = F;
    } else if (O === "ne") {
      const de = Ne(J, 0, z + K - 4);
      V = Ne(H - L, 4, n - L), K = z + K - de, z = de;
    } else if (O === "sw") {
      const de = Ne(H, 0, L + V - 4);
      V = L + V - de, K = Ne(J - z, 4, r - z), L = de;
    } else
      V = Ne(H - L, 4, n - L), K = Ne(J - z, 4, r - z);
    j = { ...E, x: L, y: z, width: V, height: K };
  }
  const W = /* @__PURE__ */ new Set();
  l.kind === "move" && W.add(l.id), l.kind === "resize" && W.add(l.id);
  const ae = (O, E) => {
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
        "aria-label": `Resize ${E}`,
        className: I(
          "absolute h-3 w-3 rounded-sm border border-primary bg-white shadow",
          H[E]
        ),
        onPointerDown: (J) => w(J, O, E)
      },
      E
    );
  }, Z = (O, E, H, J) => {
    const L = Ir(O, n, r), z = u?.id === O.id;
    return /* @__PURE__ */ o(
      "div",
      {
        role: "none",
        "aria-label": `Bounding box${O.label ? ": " + O.label : ""}`,
        className: I(
          "absolute",
          E ? "opacity-60" : "opacity-100"
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
          z ? /* @__PURE__ */ e(
            "input",
            {
              ref: h,
              type: "text",
              value: u.value,
              onChange: (V) => f((K) => K ? { ...K, value: V.target.value } : null),
              onBlur: T,
              onKeyDown: (V) => {
                V.key === "Enter" && (V.preventDefault(), T()), V.key === "Escape" && (V.preventDefault(), f(null));
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
              onDoubleClick: (V) => $(V, O),
              onContextMenu: (V) => C(V, O.id),
              onKeyDown: (V) => A(V, O.id),
              children: O.label || "Unlabeled"
            }
          ),
          H && !s && /* @__PURE__ */ o(G, { children: [
            ae(O, "nw"),
            ae(O, "ne"),
            ae(O, "sw"),
            ae(O, "se")
          ] })
        ]
      },
      J
    );
  }, oe = () => {
    if (!M) return null;
    const O = Ir(M, n, r);
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
            className: I(
              "absolute inset-0",
              s ? "pointer-events-none" : "cursor-crosshair"
            ),
            onPointerDown: s ? void 0 : y,
            onPointerMove: s ? void 0 : b,
            onPointerUp: s ? void 0 : k,
            children: [
              a.map((O) => W.has(O.id) ? null : Z(O, !1, !0, `box-${O.id}`)),
              R && Z(R, !0, !1, "ghost-move"),
              j && Z(j, !0, !0, "ghost-resize"),
              oe()
            ]
          }
        ),
        !s && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute bottom-1.5 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80", children: "Drag to add box" })
      ]
    }
  );
}
const Gc = [
  "claude-opus-4-7",
  "claude-sonnet-4-6",
  "claude-haiku-4-5-20251001"
], Yc = [
  "$.trigger.imageRef",
  "$.trigger.image",
  "$.steps.upload.output.imageId"
];
function Xc(t) {
  if (!t) return !1;
  const n = t.properties;
  if (!n || typeof n != "object" || Array.isArray(n)) return !1;
  const r = n.regions;
  return typeof r == "object" && r !== null;
}
function Qc(t) {
  const n = t.trim();
  if (n.length === 0) return { ok: !0, value: void 0 };
  try {
    const r = JSON.parse(n);
    return r === null || typeof r != "object" || Array.isArray(r) ? { ok: !1, error: "Schema must be a JSON object" } : { ok: !0, value: r };
  } catch (r) {
    return { ok: !1, error: r.message };
  }
}
const ct = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Dn = "mt-1 w-full text-[12px] rounded border border-red-500 bg-white px-2 py-1 outline-none", Zc = `${ct} font-mono`, ed = `${Dn} font-mono`, Ze = "text-[12px] font-semibold text-text-secondary", We = "text-[11px] text-text-tertiary mt-0.5", zt = "text-[11px] text-red-600 mt-0.5";
function td({ data: t, onChange: n }) {
  const [r, a] = S(!1), [i, s] = S(
    t.outputSchema ? JSON.stringify(t.outputSchema, null, 2) : ""
  ), [d, c] = S(null), l = !t.userPrompt?.trim(), p = !t.imageRefPath?.trim(), u = !!t.imageRefPath && !t.imageRefPath.startsWith("$."), f = Xc(t.outputSchema), h = D(
    (g) => {
      n({ seedRegions: g });
    },
    [n]
  ), x = (g) => {
    s(g);
    const m = Qc(g);
    if (!m.ok) {
      c(m.error);
      return;
    }
    c(null), n({ outputSchema: m.value });
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-model", className: Ze, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-model",
          className: ct,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (g) => n({ model: g.target.value }),
          children: Gc.map((g) => /* @__PURE__ */ e("option", { value: g, children: g }, g))
        }
      ),
      /* @__PURE__ */ e("div", { className: We, children: "Anthropic Messages API. Requires ANTHROPIC_API_KEY on platform-api." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-image-ref-path", className: Ze, children: [
        "Image reference path",
        /* @__PURE__ */ e("span", { className: "text-red-600 ml-1", children: "●" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-image-ref-path",
          type: "text",
          spellCheck: !1,
          "aria-invalid": p || u ? "true" : void 0,
          "aria-describedby": p || u ? "vision-image-ref-path-error" : void 0,
          className: p || u ? ed : Zc,
          value: t.imageRefPath ?? "",
          onChange: (g) => n({ imageRefPath: g.target.value }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      p ? /* @__PURE__ */ e("div", { id: "vision-image-ref-path-error", role: "alert", className: zt, children: "Image reference path is required." }) : u ? /* @__PURE__ */ o("div", { id: "vision-image-ref-path-error", role: "alert", className: zt, children: [
        "Path must start with ",
        /* @__PURE__ */ e("code", { children: "$." })
      ] }) : /* @__PURE__ */ e("div", { className: We, children: "JSONPath into context. The value must be a string imageId or object with imageId." }),
      /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: Yc.map((g) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => n({ imageRefPath: g }),
          className: "text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer",
          children: g
        },
        g
      )) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-user-prompt", className: Ze, children: [
        "User prompt",
        /* @__PURE__ */ e("span", { className: "text-red-600 ml-1", children: "●" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-user-prompt",
          "aria-invalid": l ? "true" : void 0,
          "aria-describedby": l ? "vision-user-prompt-error" : void 0,
          className: `${l ? Dn : ct} min-h-20 resize-y`,
          value: t.userPrompt,
          onChange: (g) => n({ userPrompt: g.target.value })
        }
      ),
      l ? /* @__PURE__ */ e("div", { id: "vision-user-prompt-error", role: "alert", className: zt, children: "User prompt is required." }) : /* @__PURE__ */ o("div", { className: We, children: [
        "Supports ",
        "{{ context.* }}",
        " substitution."
      ] })
    ] }),
    f && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: Ze, children: "Focus regions (optional)" }),
      /* @__PURE__ */ e("div", { className: We, children: "Drag on the image to paint focus boxes. The next vision pass will use these as analysis hints." }),
      /* @__PURE__ */ e(
        Kc,
        {
          imageUrl: "",
          imageWidth: 800,
          imageHeight: 600,
          boxes: t.seedRegions ?? [],
          onChange: h,
          className: "mt-1"
        }
      ),
      (t.seedRegions?.length ?? 0) > 0 && /* @__PURE__ */ o("div", { className: We, children: [
        t.seedRegions.length,
        " region",
        t.seedRegions.length !== 1 ? "s" : "",
        " defined."
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-output-schema", className: Ze, children: "Output schema (optional)" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-output-schema",
          "aria-invalid": d ? "true" : void 0,
          "aria-describedby": d ? "vision-output-schema-error" : void 0,
          className: `${d ? Dn : ct} font-mono text-[11px] min-h-28 resize-y`,
          value: i,
          onChange: (g) => x(g.target.value),
          placeholder: `{
  "type": "object",
  "properties": {
    "caption": { "type": "string" }
  }
}`
        }
      ),
      d ? /* @__PURE__ */ o("div", { id: "vision-output-schema-error", role: "alert", className: zt, children: [
        "Invalid JSON: ",
        d
      ] }) : t.outputSchema ? /* @__PURE__ */ e("div", { className: We, children: "Extract mode — model must return JSON matching this schema." }) : /* @__PURE__ */ e("div", { className: We, children: "Leave blank for caption mode (freeform analysis text)." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => a((g) => !g),
          className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] font-semibold text-text-secondary flex items-center gap-1",
          children: [
            /* @__PURE__ */ e("span", { children: r ? "▾" : "▸" }),
            " Advanced"
          ]
        }
      ),
      r && /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 mt-2", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("label", { htmlFor: "vision-max-output-tokens", className: Ze, children: "Max output tokens" }),
          /* @__PURE__ */ e(
            "input",
            {
              id: "vision-max-output-tokens",
              type: "number",
              min: 1,
              max: 8192,
              className: ct,
              value: t.maxOutputTokens ?? "",
              onChange: (g) => {
                const m = g.target.value;
                n({ maxOutputTokens: m === "" ? void 0 : Math.max(1, parseInt(m, 10) || 0) });
              }
            }
          ),
          /* @__PURE__ */ e("div", { className: We, children: "Caps the response length. Default 2048." })
        ] }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("label", { htmlFor: "vision-system-prompt", className: Ze, children: "System prompt override (optional)" }),
          /* @__PURE__ */ e(
            "textarea",
            {
              id: "vision-system-prompt",
              className: `${ct} min-h-14 resize-y`,
              value: t.systemPrompt ?? "",
              onChange: (g) => n({ systemPrompt: g.target.value || void 0 }),
              placeholder: "Leave blank to use the canned vision system prompt."
            }
          ),
          /* @__PURE__ */ e("div", { className: We, children: "Schema instructions are auto-appended when output schema is set." })
        ] })
      ] })
    ] })
  ] });
}
const nd = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function rd({ samples: t, onSelect: n }) {
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
const od = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], St = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", ad = `${St} font-mono`, wt = "text-[12px] font-semibold text-text-secondary", Sr = "text-[11px] text-text-tertiary mt-0.5";
function id({ data: t, onChange: n }) {
  const [r, a] = S(""), i = t.labels ?? [], s = () => {
    const c = r.trim();
    !c || i.includes(c) || (n({ labels: [...i, c] }), a(""));
  }, d = (c) => {
    n({ labels: i.filter((l, p) => p !== c) });
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-image-ref-path", className: wt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-classify-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: ad,
          value: t.imageRefPath ?? "",
          onChange: (c) => n({ imageRefPath: c.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Sr, children: "JSONPath to the imageId to classify. Required." }),
      /* @__PURE__ */ e(rd, { samples: nd, onSelect: (c) => n({ imageRefPath: c }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: wt, children: "Labels (at least 2 required)" }),
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
                className: "bg-transparent border-none cursor-pointer p-0 text-red-600 text-[11px] leading-none",
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
            className: `${St} flex-1 mt-0`,
            value: r,
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
      /* @__PURE__ */ e("div", { className: Sr, children: "Press Enter or click Add. The model returns the single best-matching label." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-model", className: wt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-classify-model",
          className: St,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (c) => n({ model: c.target.value }),
          children: od.map((c) => /* @__PURE__ */ e("option", { value: c.value, children: c.label }, c.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-classify-system-prompt", className: wt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-classify-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${St} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (c) => n({ systemPrompt: c.target.value || void 0 }),
          placeholder: "Leave blank to use the default classification system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-classify-max-output-tokens", className: wt, children: [
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
          className: St,
          value: t.maxOutputTokens ?? 256,
          onChange: (c) => {
            const l = parseInt(c.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(l) && l > 0 ? l : 256 });
          }
        }
      )
    ] })
  ] });
}
const sd = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
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
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more detail)" }
], $t = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", dd = `${$t} font-mono`, kt = "text-[12px] font-semibold text-text-secondary", $r = "text-[11px] text-text-tertiary mt-0.5";
function pd({ data: t, onChange: n }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-image-ref-path", className: kt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-describe-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: dd,
          value: t.imageRefPath ?? "",
          onChange: (r) => n({ imageRefPath: r.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: $r, children: "JSONPath to the imageId to describe. Required." }),
      /* @__PURE__ */ e(ld, { samples: sd, onSelect: (r) => n({ imageRefPath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-user-prompt", className: kt, children: "User prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-describe-user-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${$t} resize-y`,
          value: t.userPrompt ?? "",
          onChange: (r) => n({ userPrompt: r.target.value }),
          placeholder: "Describe what you see in this image in one paragraph."
        }
      ),
      /* @__PURE__ */ e("div", { className: $r, children: "Required. What to ask the model about the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-model", className: kt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-describe-model",
          className: $t,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (r) => n({ model: r.target.value }),
          children: cd.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-describe-system-prompt", className: kt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-describe-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${$t} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (r) => n({ systemPrompt: r.target.value || void 0 }),
          placeholder: "Leave blank to use the default describe system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-describe-max-output-tokens", className: kt, children: [
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
          className: $t,
          value: t.maxOutputTokens ?? 512,
          onChange: (r) => {
            const a = parseInt(r.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(a) && a > 0 ? a : 512 });
          }
        }
      )
    ] })
  ] });
}
const ud = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function md({ samples: t, onSelect: n }) {
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
const hd = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], dt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", fd = `${dt} font-mono`, it = "text-[12px] font-semibold text-text-secondary", Tr = "text-[11px] text-text-tertiary mt-0.5";
function xd({ data: t, onChange: n }) {
  const [r, a] = S(""), i = t.candidateTags ?? [], s = () => {
    const c = r.trim();
    !c || i.includes(c) || (n({ candidateTags: [...i, c] }), a(""));
  }, d = (c) => {
    n({ candidateTags: i.filter((l, p) => p !== c) });
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-tag-image-ref-path", className: it, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-tag-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: fd,
          value: t.imageRefPath ?? "",
          onChange: (c) => n({ imageRefPath: c.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Tr, children: "JSONPath to the imageId to tag. Required." }),
      /* @__PURE__ */ e(md, { samples: ud, onSelect: (c) => n({ imageRefPath: c }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: it, children: [
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
                className: "bg-transparent border-none cursor-pointer p-0 text-red-600 text-[11px] leading-none",
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
            className: `${dt} flex-1 mt-0`,
            value: r,
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
      /* @__PURE__ */ e("div", { className: Tr, children: "Restricts tagging to this vocabulary. Leave empty for open-ended tags." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-max-tags", className: it, children: [
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
          className: dt,
          value: t.maxTags ?? 10,
          onChange: (c) => {
            const l = parseInt(c.target.value, 10);
            n({ maxTags: Number.isFinite(l) && l >= 1 ? l : 10 });
          }
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-tag-model", className: it, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-tag-model",
          className: dt,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (c) => n({ model: c.target.value }),
          children: hd.map((c) => /* @__PURE__ */ e("option", { value: c.value, children: c.label }, c.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-system-prompt", className: it, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-tag-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${dt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (c) => n({ systemPrompt: c.target.value || void 0 }),
          placeholder: "Leave blank to use the default tagging system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-max-output-tokens", className: it, children: [
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
          className: dt,
          value: t.maxOutputTokens ?? 256,
          onChange: (c) => {
            const l = parseInt(c.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(l) && l > 0 ? l : 256 });
          }
        }
      )
    ] })
  ] });
}
const gd = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function bd({ samples: t, onSelect: n }) {
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
const yd = [
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (default — best OCR accuracy)" },
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (faster, lower accuracy)" }
], Jt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", vd = `${Jt} font-mono`, qt = "text-[12px] font-semibold text-text-secondary", Nn = "text-[11px] text-text-tertiary mt-0.5";
function Nd({ data: t, onChange: n }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-image-ref-path", className: qt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-extract-text-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: vd,
          value: t.imageRefPath ?? "",
          onChange: (r) => n({ imageRefPath: r.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Nn, children: "JSONPath to the imageId to extract text from. Required." }),
      /* @__PURE__ */ e(bd, { samples: gd, onSelect: (r) => n({ imageRefPath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-model", className: qt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-extract-text-model",
          className: Jt,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (r) => n({ model: r.target.value }),
          children: yd.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
        }
      ),
      /* @__PURE__ */ e("div", { className: Nn, children: "Defaults to Sonnet for best OCR accuracy." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-extract-text-system-prompt", className: qt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-extract-text-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Jt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (r) => n({ systemPrompt: r.target.value || void 0 }),
          placeholder: "Leave blank to use the default OCR system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-extract-text-max-output-tokens", className: qt, children: [
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
          className: Jt,
          value: t.maxOutputTokens ?? 1024,
          onChange: (r) => {
            const a = parseInt(r.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(a) && a > 0 ? a : 1024 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Nn, children: "Increase for documents with large amounts of text." })
    ] })
  ] });
}
const wd = [
  { value: "amazon.titan-image-generator-v2:0", label: "Titan v2 (default)" },
  { value: "amazon.titan-image-generator-v1", label: "Titan v1" }
], st = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", lt = "text-[12px] font-semibold text-text-secondary", Ar = "text-[11px] text-text-tertiary mt-0.5";
function kd({ data: t, onChange: n }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "generate-prompt", className: lt, children: "Prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "generate-prompt",
          rows: 4,
          spellCheck: !1,
          className: `${st} resize-y min-h-20`,
          value: t.prompt ?? "",
          onChange: (r) => n({ prompt: r.target.value }),
          placeholder: "A photorealistic photograph of a golden retriever in a sunny meadow"
        }
      ),
      /* @__PURE__ */ e("div", { className: Ar, children: "Text description of the image to generate. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "generate-model", className: lt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "generate-model",
          className: st,
          value: t.model ?? "amazon.titan-image-generator-v2:0",
          onChange: (r) => n({ model: r.target.value }),
          children: wd.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "generate-width", className: lt, children: "Width (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "generate-width",
            type: "number",
            min: 64,
            max: 2048,
            step: 64,
            className: st,
            value: t.width ?? 512,
            onChange: (r) => {
              const a = parseInt(r.target.value, 10);
              n({ width: Number.isFinite(a) && a > 0 ? a : 512 });
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "generate-height", className: lt, children: "Height (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "generate-height",
            type: "number",
            min: 64,
            max: 2048,
            step: 64,
            className: st,
            value: t.height ?? 512,
            onChange: (r) => {
              const a = parseInt(r.target.value, 10);
              n({ height: Number.isFinite(a) && a > 0 ? a : 512 });
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "generate-seed", className: lt, children: [
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
          className: st,
          value: t.seed ?? "",
          onChange: (r) => {
            const a = parseInt(r.target.value, 10);
            n({ seed: Number.isFinite(a) && a >= 0 ? a : void 0 });
          },
          placeholder: "random"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "generate-num-images", className: lt, children: [
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
          className: st,
          value: t.numImages ?? 1,
          onChange: (r) => {
            const a = parseInt(r.target.value, 10);
            n({ numImages: Number.isFinite(a) && a >= 1 ? Math.min(8, a) : 1 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Ar, children: "When > 1, the step fans out with one arm per image. Each arm carries one imageId." })
    ] })
  ] });
}
const Cd = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
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
const Sd = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], Ht = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", $d = `${Ht} font-mono`, Vt = "text-[12px] font-semibold text-text-secondary", Rr = "text-[11px] text-text-tertiary mt-0.5";
function Td({ data: t, onChange: n }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-source-image-path", className: Vt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "variation-source-image-path",
          type: "text",
          spellCheck: !1,
          className: $d,
          value: t.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Id, { samples: Cd, onSelect: (r) => n({ sourceImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "variation-model", className: Vt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "variation-model",
          className: Ht,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (r) => n({ model: r.target.value }),
          children: Sd.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-num-variations", className: Vt, children: [
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
          className: Ht,
          value: t.numVariations ?? 1,
          onChange: (r) => {
            const a = parseInt(r.target.value, 10);
            n({ numVariations: Number.isFinite(a) && a >= 1 ? Math.min(8, a) : 1 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Rr, children: "Always fans out — each variation becomes a separate arm downstream." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-similarity", className: Vt, children: [
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
          className: Ht,
          value: t.similarity ?? 0.7,
          onChange: (r) => {
            const a = parseFloat(r.target.value);
            n({ similarity: Number.isFinite(a) ? Math.min(1, Math.max(0, a)) : 0.7 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Rr, children: "0 = very different, 1 = nearly identical. 0.7 is a good starting point." })
    ] })
  ] });
}
const Ad = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
], Rd = [
  "$.steps.mask.output.imageId",
  "$.trigger.maskRef"
];
function Pr({ samples: t, onSelect: n }) {
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
const Pd = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], On = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Mr = `${On} font-mono`, Wt = "text-[12px] font-semibold text-text-secondary", Er = "text-[11px] text-text-tertiary mt-0.5";
function Md({ data: t, onChange: n }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-source-image-path", className: Wt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "edit-prompt-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Mr,
          value: t.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Pr, { samples: Ad, onSelect: (r) => n({ sourceImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-mask-image-path", className: Wt, children: [
        "Mask image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "edit-prompt-mask-image-path",
          type: "text",
          spellCheck: !1,
          className: Mr,
          value: t.maskImagePath ?? "",
          onChange: (r) => n({ maskImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.steps.mask.output.imageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: Er, children: "JSONPath to a mask image. White pixels = edit region, black = preserve. Omit for outpainting." }),
      /* @__PURE__ */ e(Pr, { samples: Rd, onSelect: (r) => n({ maskImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-prompt", className: Wt, children: "Edit prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "edit-prompt-prompt",
          rows: 4,
          spellCheck: !1,
          className: `${On} resize-y min-h-20`,
          value: t.prompt ?? "",
          onChange: (r) => n({ prompt: r.target.value }),
          placeholder: "Replace the background with a sunny beach"
        }
      ),
      /* @__PURE__ */ e("div", { className: Er, children: "Describes what to generate in the masked region. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-model", className: Wt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "edit-prompt-model",
          className: On,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (r) => n({ model: r.target.value }),
          children: Pd.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
        }
      )
    ] })
  ] });
}
const Ed = {
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
function Dd({ result: t, className: n }) {
  const { caption: r, setting: a, location: i, timeOfDay: s, mood: d, colors: c } = t;
  return !r && !a && !i && !s && !d && (!c || c.length === 0) ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", n), children: [
    r ? /* @__PURE__ */ e("p", { className: "text-base leading-relaxed text-text-primary", children: r }) : null,
    /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1.5", children: [
      a ? /* @__PURE__ */ o(ce, { tone: "neutral", size: "sm", title: "Scene setting", children: [
        "setting: ",
        a
      ] }) : null,
      i ? /* @__PURE__ */ o(ce, { tone: "neutral", size: "sm", title: "Location", children: [
        "loc: ",
        i
      ] }) : null,
      s ? /* @__PURE__ */ o(ce, { tone: "neutral", size: "sm", title: "Time of day", children: [
        "tod: ",
        s
      ] }) : null,
      d ? /* @__PURE__ */ o(ce, { tone: "info", size: "sm", title: "Mood", children: [
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
const Od = {
  people: { stroke: "#4f46e5", fill: "rgba(79,70,229,0.10)", text: "bg-indigo-600 text-white" },
  object: { stroke: "#d97706", fill: "rgba(217,119,6,0.10)", text: "bg-amber-600 text-white" }
};
function _d({
  imageUrl: t,
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
  const f = n ?? t, [h, x] = S(null), g = ie(null), m = D(() => {
    const y = g.current;
    y && (!r || !a) && x({ w: y.naturalWidth, h: y.naturalHeight });
  }, [r, a]), N = q(() => r && a && r > 0 && a > 0 ? { w: r, h: a } : h && h.w > 0 && h.h > 0 ? h : null, [r, a, h]), v = (y, w, b, k, C) => {
    if (!N) return null;
    const A = Math.max(0, Math.min(y.x1, N.w)), $ = Math.max(0, Math.min(y.y1, N.h)), T = Math.max(0, Math.min(y.x2, N.w)), M = Math.max(0, Math.min(y.y2, N.h));
    if (!Number.isFinite(A) || !Number.isFinite($) || !Number.isFinite(T) || !Number.isFinite(M) || T <= A || M <= $) return null;
    const R = A / N.w * 100, j = $ / N.h * 100, W = (T - A) / N.w * 100, ae = (M - $) / N.h * 100, Z = Od[b];
    return /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: k,
        title: w,
        "aria-label": `${b === "people" ? "Person" : "Object"} bounding box: ${w}`,
        className: "group absolute m-0 cursor-pointer border-0 p-0 outline-none focus:ring-2 focus:ring-offset-1",
        style: {
          left: `${R}%`,
          top: `${j}%`,
          width: `${W}%`,
          height: `${ae}%`,
          background: Z.fill,
          border: `2px solid ${Z.stroke}`,
          borderRadius: "2px"
        },
        children: /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "pointer-events-none absolute -top-5 left-0 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none shadow",
              Z.text
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
            ref: g,
            src: f,
            alt: u ?? "",
            onLoad: m,
            className: "block h-auto w-full object-contain",
            draggable: !1
          }
        ),
        N ? /* @__PURE__ */ e("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ o("div", { className: "pointer-events-auto absolute inset-0", children: [
          (d === "people" || d === "both") && (i ?? []).map(
            (y) => v(
              y.bbox,
              `#${y.index}${y.activity ? " · " + y.activity.replace(/^::\s*/, "") : ""}`,
              "people",
              c ? () => c(y) : void 0,
              `p-${y.index}`
            )
          ),
          (d === "objects" || d === "both") && (s ?? []).map(
            (y, w) => v(
              y.bbox,
              y.label,
              "object",
              l ? () => l(y) : void 0,
              `o-${w}-${y.label}`
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
function Ld(t) {
  return {
    imageUrl: t.imageUrl,
    imageDataUrl: t.imageDataUrl,
    imageWidth: t.imageWidth,
    imageHeight: t.imageHeight,
    people: t.people,
    objects: t.objects
  };
}
function Bd({ people: t, highlightedIndex: n, onSelect: r, className: a }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", a), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "People (",
      t.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1.5", children: t.map((i) => {
      const s = n === i.index, d = i.activity?.replace(/^::\s*/, ""), c = I(
        "group flex w-full flex-col gap-1 rounded-lg border px-2.5 py-2 text-left text-sm transition-colors",
        s ? "border-indigo-400 bg-indigo-50/70 ring-1 ring-indigo-300" : "border-border bg-surface hover:bg-surface-hover"
      ), l = /* @__PURE__ */ o(G, { children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": !0,
              className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold leading-none text-white",
              children: i.index
            }
          ),
          i.ageBucket ? /* @__PURE__ */ e(ce, { tone: "neutral", size: "sm", children: i.ageBucket.replace("_", " ") }) : null,
          i.gender ? /* @__PURE__ */ e(ce, { tone: "neutral", size: "sm", children: i.gender }) : null,
          i.faceOrientation ? /* @__PURE__ */ e(ce, { tone: "neutral", size: "sm", title: "Face orientation", children: i.faceOrientation }) : null,
          i.expression ? /* @__PURE__ */ e(ce, { tone: "info", size: "sm", children: i.expression }) : null
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
      return r ? /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => r(i),
          className: I(
            c,
            "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          ),
          "aria-pressed": s,
          children: l
        }
      ) }, i.index) : /* @__PURE__ */ e("li", { className: c, children: l }, i.index);
    }) })
  ] });
}
function Ud({ objects: t, onSelect: n, className: r }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", r), children: [
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
      return n ? /* @__PURE__ */ e("li", { children: /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => n(a),
          className: I(
            s,
            "cursor-pointer hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          ),
          children: d
        }
      ) }, `${a.label}-${i}`) : /* @__PURE__ */ e("li", { className: s, children: d }, `${a.label}-${i}`);
    }) })
  ] });
}
function Fd({ tags: t, onTagClick: n, className: r }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ e("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Tags" }),
    /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: t.map(
      (a) => n ? /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => n(a),
          title: `Filter by ${a}`,
          "aria-label": `Filter by ${a}`,
          className: "appearance-none border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded-full",
          children: /* @__PURE__ */ o(ce, { tone: "info", size: "sm", children: [
            "#",
            a
          ] })
        },
        a
      ) : /* @__PURE__ */ o(ce, { tone: "info", size: "sm", children: [
        "#",
        a
      ] }, a)
    ) })
  ] });
}
function Kt(t) {
  return t ? t === "correct" || t === "neutral" || t === "normal" ? "success" : "warning" : "neutral";
}
function wn(t) {
  const n = Kt(t);
  return n === "success" ? `OK · ${t}` : n === "warning" ? `ADJUST · ${t}` : t ?? "";
}
function jd({
  exposure: t,
  whiteBalance: n,
  contrast: r,
  composition: a,
  edits: i,
  onApplyEdit: s,
  className: d
}) {
  const c = t || n || r || a, l = (i ?? []).length > 0;
  return !c && !l ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", d), children: [
    /* @__PURE__ */ e("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Edits & Quality" }),
    c ? /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-1.5 sm:grid-cols-2", children: [
      t ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-text-tertiary", children: "EXPOSURE" }),
          /* @__PURE__ */ e(ce, { tone: Kt(t.verdict), size: "sm", children: wn(t.verdict) }),
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
          /* @__PURE__ */ e(ce, { tone: Kt(n.verdict), size: "sm", children: wn(n.verdict) }),
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
        /* @__PURE__ */ e("span", { className: "ml-1.5", children: /* @__PURE__ */ e(ce, { tone: Kt(r), size: "sm", children: wn(r) }) })
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
              className: "shrink-0 rounded-md border border-border bg-surface-hover px-2 py-0.5 text-[11px] font-medium text-text-primary hover:bg-surface-panel focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
              children: "Apply"
            }
          ) : null
        ]
      },
      `${u}-${p.slice(0, 20)}`
    )) }) : null
  ] });
}
function zd({
  result: t,
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
  const [f, h] = S(), [x, g] = S(!1), m = (v) => h(f === v.index ? void 0 : v.index), N = Ld(t);
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-4 text-text-primary", u), children: [
    /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-12", children: [
      n ? /* @__PURE__ */ o("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ e(
          _d,
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
      /* @__PURE__ */ o("div", { className: I("flex flex-col gap-4", n ? "md:col-span-5" : "md:col-span-12"), children: [
        r ? /* @__PURE__ */ e(Dd, { result: t }) : null,
        a && t.people && t.people.length > 0 ? /* @__PURE__ */ e(
          Bd,
          {
            people: t.people,
            highlightedIndex: f,
            onSelect: m
          }
        ) : null
      ] })
    ] }),
    i && t.objects && t.objects.length > 0 ? /* @__PURE__ */ e(Ud, { objects: t.objects }) : null,
    s && t.tags && t.tags.length > 0 ? /* @__PURE__ */ e(Fd, { tags: t.tags, onTagClick: l }) : null,
    d ? /* @__PURE__ */ e(
      jd,
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
      /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1", children: t.text.map((v, y) => /* @__PURE__ */ e(
        "li",
        {
          className: "rounded border border-border bg-surface px-2 py-1 font-mono text-[12px]",
          children: v
        },
        y
      )) })
    ] }) : null,
    c && t.rawText ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => g((v) => !v),
          "aria-expanded": x,
          "aria-label": `${x ? "Hide" : "Show"} raw model output`,
          className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded",
          children: [
            x ? "▾" : "▸",
            " Raw model output"
          ]
        }
      ),
      x ? /* @__PURE__ */ e("pre", { className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary", children: t.rawText }) : null
    ] }) : null
  ] });
}
const qd = [
  { value: "claude-haiku-4-5-20251001", label: "Haiku 4.5" },
  { value: "claude-sonnet-4-6", label: "Sonnet 4.6" },
  { value: "claude-opus-4-7", label: "Opus 4.7" }
], Dr = "claude-sonnet-4-6", Or = [
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
  }
];
function Vd(t) {
  const n = [`${t.inputTokens} in`, `${t.outputTokens} out`];
  return t.cacheReadTokens && n.push(`${t.cacheReadTokens} cached`), n.join(" / ");
}
function Wd({
  systemPrompt: t,
  userPrompt: n,
  outputSchema: r,
  model: a,
  onSave: i,
  apiBase: s = ""
}) {
  const d = so(), [c, l] = S(t), [p, u] = S(n), [f, h] = S(a ?? Dr), [x, g] = S(
    r ? JSON.stringify(r, null, 2) : ""
  ), [m, N] = S("0"), [v, y] = S(null), [w, b] = S(!1), [k, C] = S(null), [A, $] = S(null), T = D(() => {
    const Z = x.trim();
    if (Z)
      try {
        const oe = JSON.parse(Z);
        if (oe && typeof oe == "object" && !Array.isArray(oe))
          return oe;
      } catch {
      }
  }, [x]), M = D((Z) => {
    N(Z);
    const oe = Number(Z), O = Or[oe];
    O && g(O.value ? JSON.stringify(O.value, null, 2) : "");
  }, []), R = v ? d.getImageUrl(v.imageId) : null, j = D(async () => {
    if (!R) {
      C("Upload or paste a sample image URL first.");
      return;
    }
    if (!p.trim()) {
      C("User prompt is required.");
      return;
    }
    b(!0), C(null), $(null);
    const Z = T();
    try {
      const oe = await fetch(`${s}/api/pipeline/preview/vision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: R,
          systemPrompt: c.trim() || void 0,
          userPrompt: p.trim(),
          outputSchema: Z,
          model: f || Dr
        })
      }), O = await oe.json();
      if (!oe.ok) {
        C(O.error ?? `Request failed with status ${oe.status}`);
        return;
      }
      if (O.failureReason) {
        C(`Model refused to answer (${O.failureReason}).`);
        return;
      }
      const E = {
        imageUrl: R,
        caption: O.caption ?? "",
        rawText: typeof O.extracted == "object" && O.extracted ? JSON.stringify(O.extracted, null, 2) : void 0,
        model: {
          endpointId: f,
          latencyMs: O.latencyMs ?? 0,
          tokensIn: O.usage?.inputTokens,
          tokensOut: O.usage?.outputTokens
        }
      };
      $({
        visionResult: E,
        rawExtracted: O.extracted,
        usage: O.usage ?? { inputTokens: 0, outputTokens: 0 },
        latencyMs: O.latencyMs ?? 0,
        costUsd: O.costUsd ?? 0
      });
    } catch (oe) {
      C(oe instanceof Error ? oe.message : "Network error");
    } finally {
      b(!1);
    }
  }, [R, p, c, f, T, s]), W = () => {
    i({
      systemPrompt: c,
      userPrompt: p,
      outputSchema: T()
    });
  }, ae = "text-[12px] font-semibold text-text-secondary";
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-4 px-4 py-3", "data-testid": "vision-prompt-bench", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: I(ae, "mb-1"), children: "Sample image" }),
      /* @__PURE__ */ e(
        Co,
        {
          value: v,
          onChange: (Z) => y(Z),
          "data-testid": "bench-image-uploader"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("label", { className: ae, children: "System prompt" }),
        /* @__PURE__ */ e(
          on,
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
        /* @__PURE__ */ o("label", { className: ae, children: [
          "User prompt ",
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ e(
          on,
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
          /* @__PURE__ */ e("label", { className: ae, children: "Output schema" }),
          /* @__PURE__ */ e(
            Yt,
            {
              value: m,
              onChange: (Z) => M(Z.target.value),
              options: Or.map((Z, oe) => ({ value: String(oe), label: Z.label })),
              size: "sm",
              "aria-label": "Schema preset",
              "data-testid": "bench-schema-preset"
            }
          )
        ] }),
        /* @__PURE__ */ e(
          on,
          {
            value: x,
            onChange: (Z) => g(Z.target.value),
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
        Yt,
        {
          value: f,
          onChange: (Z) => h(Z.target.value),
          options: qd,
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
            j();
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
        className: "text-[12px] text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2",
        "data-testid": "bench-error",
        children: k
      }
    ),
    A && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2 border-t border-border pt-3", "data-testid": "bench-result", children: [
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1.5", children: [
        /* @__PURE__ */ o("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary", children: [
          Vd(A.usage),
          " tokens"
        ] }),
        /* @__PURE__ */ o("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary", children: [
          A.latencyMs,
          " ms"
        ] }),
        /* @__PURE__ */ o("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary", children: [
          "$",
          A.costUsd.toFixed(4)
        ] })
      ] }),
      /* @__PURE__ */ e(
        zd,
        {
          result: A.visionResult,
          showImage: !1,
          showRawText: !!A.rawExtracted,
          "data-testid": "bench-vision-viewer"
        }
      ),
      A.rawExtracted !== null && A.rawExtracted !== void 0 && /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary", children: "Extracted JSON" }),
        /* @__PURE__ */ e(
          "pre",
          {
            className: "text-[10px] font-mono bg-surface-inset border border-border rounded p-2 overflow-x-auto",
            "data-testid": "bench-extracted-json",
            children: JSON.stringify(A.rawExtracted, null, 2)
          }
        )
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: W,
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
const Jd = {
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
}, kn = /* @__PURE__ */ new Set([
  "image:vision-analyze",
  "image:vision-classify",
  "image:vision-describe",
  "image:vision-tag",
  "image:vision-extract-text"
]), je = ({ data: t }) => /* @__PURE__ */ o("div", { className: "p-3 text-[13px] text-[#64748b]", children: [
  "Configuration for ",
  /* @__PURE__ */ e("strong", { children: t.type }),
  " — coming in Phase C."
] }), Hd = {
  trigger: Il,
  llm: Rl,
  transform: El,
  condition: Ol,
  action: Bl,
  fork: Ul,
  join: zl,
  approval: Vl,
  agent: je,
  "mcp-tool": je,
  "knowledge-base": je,
  "graph-query": je,
  memory: je,
  guardrail: je,
  policy: je,
  "ag-ui-output": je,
  "image-source": je,
  "image:save": je,
  scatter: tc,
  "image:resize": ac,
  "image:transform": uc,
  "image:format-convert": gc,
  "image:sharpen": vc,
  "image:watermark": Cc,
  "image:crop": $c,
  "image:adjust-bw": Rc,
  "image:adjust-layer": Vc,
  "image:vision-analyze": td,
  "image:vision-classify": id,
  "image:vision-describe": pd,
  "image:vision-tag": xd,
  "image:vision-extract-text": Nd,
  "image:generate": kd,
  "image:variation": Td,
  "image:edit-prompt": Md
};
function Kd(t, n) {
  const r = Hd[t.type];
  return /* @__PURE__ */ e(r, { data: t.data, onChange: n });
}
function Gd({ selectedIds: t }) {
  const {
    definition: n,
    selectedNodeId: r,
    setSelectedNodeId: a,
    updateNodeData: i,
    removeNode: s,
    duplicateNodes: d
  } = qe(), [c, l] = S("config"), p = ie(null), u = ie(null);
  Bn();
  const f = q(() => t && t.length > 1 ? t : r ? [r] : [], [t, r]), h = f.length > 1, x = f.length > 0, g = q(() => h || f.length === 0 || !n ? null : n.nodes.find((b) => b.id === f[0]) ?? null, [n, f, h]), m = D(() => {
    a(null);
  }, [a]);
  ee(() => {
    l("config");
  }, [f.join(",")]), ee(() => {
    if (!x) return;
    const b = (k) => {
      k.key === "Escape" && (k.stopPropagation(), m());
    };
    return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b);
  }, [x, m]), ee(() => {
    if (!x) return;
    const b = (k) => {
      const C = p.current;
      C && (k.target instanceof Node && C.contains(k.target) || k.target instanceof Element && (k.target.closest("[data-node-type]") || m()));
    };
    return window.addEventListener("mousedown", b), () => window.removeEventListener("mousedown", b);
  }, [x, m]);
  const N = g ? Jd[g.type] : null, v = () => {
    if (h)
      for (const b of f) s(b);
    else g && s(g.id);
  }, y = () => {
    f.length !== 0 && d(f);
  }, w = (b) => {
    g && i(g.id, b);
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
              onClick: v,
              className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-[#fecaca] rounded-md cursor-pointer font-inherit",
              children: "Delete all"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: y,
              className: "px-2.5 py-1.5 text-xs font-semibold bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0] rounded-md cursor-pointer font-inherit",
              children: "Duplicate all"
            }
          )
        ] })
      ] })
    ] })
  ) : g && N ? (
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
            const C = g && kn.has(g.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"], A = C.indexOf(c);
            let $ = null;
            b.key === "ArrowRight" ? $ = C[(A + 1) % C.length] : b.key === "ArrowLeft" ? $ = C[(A - 1 + C.length) % C.length] : b.key === "Home" ? $ = C[0] : b.key === "End" && ($ = C[C.length - 1]), $ && (b.preventDefault(), l($), u.current?.querySelector(
              `[data-tab="${$}"]`
            )?.focus());
          },
          children: (g && kn.has(g.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"]).map((b) => {
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
        c === "config" && Kd(g, w),
        c === "runs" && /* @__PURE__ */ e("div", { className: "p-6 text-xs text-[#64748b]", children: "No runs yet." }),
        c === "docs" && /* @__PURE__ */ e("div", { className: "pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug", children: Ed[g.type] ?? /* @__PURE__ */ e("p", { className: "text-text-secondary", children: "No docs available for this node type." }) }),
        c === "bench" && kn.has(g.type) && (() => {
          const b = g.data;
          return /* @__PURE__ */ e(
            Wd,
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
            onClick: v,
            className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-transparent rounded-md cursor-pointer font-inherit",
            children: "🗑 Delete node"
          }
        ),
        /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: y,
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
function ke(t) {
  if (t == null) return "--";
  if (t < 1e3) return `${Math.round(t)}ms`;
  if (t < 6e4) return `${(t / 1e3).toFixed(1)}s`;
  const n = Math.floor(t / 6e4), r = Math.floor(t % 6e4 / 1e3);
  return `${n}m ${r}s`;
}
function pt(t) {
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
function Yd(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Xd(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Qd(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function _r(t) {
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
function Cn(t) {
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
function Zd(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function et({ label: t, children: n }) {
  return /* @__PURE__ */ o("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ e("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: t }),
    /* @__PURE__ */ e("span", { className: "text-[13px] text-text-primary", children: n })
  ] });
}
function ep({ pipelineId: t, run: n, onBack: r }) {
  const a = Oe();
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
      /* @__PURE__ */ e(et, { label: "Status", children: /* @__PURE__ */ e(
        ce,
        {
          tone: _r(n.status),
          "aria-label": `Status: ${Cn(n.status)}`,
          children: Cn(n.status)
        }
      ) }),
      /* @__PURE__ */ e(et, { label: "Started", children: new Date(n.startedAt).toLocaleString() }),
      n.completedAt && /* @__PURE__ */ e(et, { label: "Completed", children: new Date(n.completedAt).toLocaleString() }),
      /* @__PURE__ */ e(et, { label: "Duration", children: ke(n.durationMs) }),
      /* @__PURE__ */ e(et, { label: "Triggered by", children: Zd(n) }),
      /* @__PURE__ */ e(et, { label: "Trigger type", children: n.triggeredBy.triggerType }),
      n.estimatedCostUsd != null && n.estimatedCostUsd > 0 && /* @__PURE__ */ o(et, { label: "Est. Cost", children: [
        /* @__PURE__ */ e("span", { className: I("font-semibold", Qd(n.estimatedCostUsd)), children: Xd(n.estimatedCostUsd) }),
        n.estimatedCostUsd > 1 && /* @__PURE__ */ e("span", { className: "ml-1.5 rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "Budget Warning" })
      ] }),
      n.tokenUsage && Object.keys(n.tokenUsage).length > 0 && /* @__PURE__ */ o("div", { className: "mt-2", children: [
        /* @__PURE__ */ e("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: "Cost Breakdown" }),
        Object.entries(n.tokenUsage).map(([i, s]) => /* @__PURE__ */ o(
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
          onClick: () => a(`/pipelines/${t}/runs/${n.id}`),
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
          const d = _r(s.status), c = Cn(s.status), l = s.output, p = l?.response;
          return /* @__PURE__ */ o("div", { className: "mb-2", children: [
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2 py-1 text-xs", children: [
              /* @__PURE__ */ e(ce, { tone: d, "aria-label": `Status: ${c}`, children: c }),
              /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: i.slice(0, 10) }),
              s.durationMs != null && /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: ke(s.durationMs) })
            ] }),
            p && /* @__PURE__ */ e("div", { className: "mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-2 text-xs leading-relaxed text-text-primary", children: p }),
            l && !p && Object.keys(l).length > 0 && /* @__PURE__ */ e("div", { className: "mt-1 max-h-[120px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-1.5 font-mono text-[11px] text-text-secondary", children: JSON.stringify(l, null, 2) })
          ] }, i);
        })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-3", children: /* @__PURE__ */ o("details", { children: [
        /* @__PURE__ */ e("summary", { className: "cursor-pointer select-none text-[11px] text-text-tertiary", children: "Raw snapshot JSON" }),
        /* @__PURE__ */ e("pre", { className: "mt-1.5 max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-md border border-border bg-surface-inset p-2.5 text-[10px]", children: JSON.stringify(n, null, 2) })
      ] }) })
    ] }) })
  ] });
}
function Lr(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function tp(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function np(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function rp(t) {
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
function op(t) {
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
function ap(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function ip({ pipelineId: t, onClose: n }) {
  const r = Oe(), [a, i] = S([]), [s, d] = S(!0), [c, l] = S(null), [p, u] = S(null), [f, h] = S(!1), [x, g] = S([]), m = ie(null), N = D(async () => {
    d(!0), l(null);
    try {
      const b = await co(t, { limit: 50 });
      i(b.runs);
    } catch (b) {
      l(b instanceof Error ? b.message : "Failed to load runs");
    } finally {
      d(!1);
    }
  }, [t]);
  ee(() => {
    m.current !== t && (m.current = t, N());
  }, [t, N]), Pe("*", D((b) => {
    const { eventType: k, payload: C } = b;
    if (!C || typeof C != "object") return;
    const A = C;
    if (!(A.pipelineId && A.pipelineId !== t))
      switch (k) {
        case "pipeline.run.started": {
          const $ = C;
          if ($.pipelineId !== t) return;
          const T = {
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
          i((M) => [T, ...M.filter((R) => R.id !== $.runId)]);
          break;
        }
        case "pipeline.run.completed": {
          const $ = C;
          i(
            (T) => T.map(
              (M) => M.id === $.runId ? { ...M, status: "completed", completedAt: $.at, durationMs: $.durationMs } : M
            )
          );
          break;
        }
        case "pipeline.run.failed": {
          const $ = C;
          i(
            (T) => T.map(
              (M) => M.id === $.runId ? { ...M, status: "failed", completedAt: $.at, error: $.error } : M
            )
          );
          break;
        }
        case "pipeline.run.cancelled": {
          const $ = C;
          i(
            (T) => T.map(
              (M) => M.id === $.runId ? { ...M, status: "cancelled", completedAt: $.at } : M
            )
          );
          break;
        }
      }
  }, [t]));
  const v = q(
    () => a.find((b) => b.id === p) ?? null,
    [a, p]
  ), y = D((b) => {
    g((k) => k.includes(b) ? k.filter((C) => C !== b) : k.length >= 2 ? [k[1], b] : [...k, b]);
  }, []), w = D(() => {
    if (x.length !== 2) return;
    const [b, k] = x;
    r(`/pipelines/${t}/compare?a=${b}&b=${k}`);
  }, [x, r, t]);
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
                  h(!f), f && g([]);
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
                x.length,
                "/2 selected"
              ] }),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  disabled: x.length !== 2,
                  onClick: w,
                  "data-testid": "runs-panel-compare-action",
                  className: I(
                    "ml-auto rounded px-2.5 py-0.5 font-inherit text-[11px] font-semibold",
                    x.length === 2 ? "cursor-pointer border border-primary bg-primary text-white" : "cursor-not-allowed border border-border bg-surface text-text-disabled"
                  ),
                  children: "Compare"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative min-h-0 flex-1", children: [
          v && /* @__PURE__ */ e(
            ep,
            {
              pipelineId: t,
              run: v,
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
            const k = rp(b.status), C = op(b.status), A = x.includes(b.id);
            return /* @__PURE__ */ o(
              "li",
              {
                "data-testid": `runs-panel-row-${b.id}`,
                onClick: () => {
                  f ? y(b.id) : u(b.id);
                },
                className: I(
                  "cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover",
                  A && "bg-[#eff6ff]"
                ),
                children: [
                  /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
                    f && /* @__PURE__ */ e(
                      "input",
                      {
                        type: "checkbox",
                        checked: A,
                        onChange: () => y(b.id),
                        onClick: ($) => $.stopPropagation(),
                        "data-testid": `runs-panel-compare-check-${b.id}`,
                        className: "m-0 shrink-0 accent-primary",
                        "aria-label": `Select run ${b.id.slice(0, 8)} for comparison`
                      }
                    ),
                    /* @__PURE__ */ e(ce, { tone: k, "aria-label": `Status: ${C}`, children: C }),
                    /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-secondary", children: b.id.slice(0, 8) }),
                    /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: np(b.startedAt) })
                  ] }),
                  /* @__PURE__ */ o("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ e("span", { children: ke(b.durationMs) }),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 0 && /* @__PURE__ */ e(
                      "span",
                      {
                        className: I("font-mono font-semibold", tp(b.estimatedCostUsd)),
                        title: `Estimated cost: ${Lr(b.estimatedCostUsd)}`,
                        children: Lr(b.estimatedCostUsd)
                      }
                    ),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 1 && /* @__PURE__ */ e("span", { className: "rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "High Cost" }),
                    /* @__PURE__ */ e("span", { className: "ml-auto", children: ap(b) })
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
function sp({
  pipelineId: t,
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
          /* @__PURE__ */ e(
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
          /* @__PURE__ */ e(
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
          r === "config" && (n !== null ? /* @__PURE__ */ e(Gd, {}) : /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          r === "runs" && /* @__PURE__ */ e(
            ip,
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
function lp(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function cp(t) {
  if (!t) return [];
  const n = /* @__PURE__ */ new Set(), r = /\{\{\s*context\.([a-zA-Z0-9_.]+)\s*\}\}/g;
  for (const a of t.nodes) {
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
function dp(t) {
  if (!(t instanceof HTMLElement)) return !1;
  const n = t.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || t.isContentEditable);
}
function uh() {
  const { pipelineId: t } = mt(), n = q(() => t ? nt(t) !== null : !1, [t]);
  return !t || !n ? /* @__PURE__ */ e(ht, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(po, { pipelineId: t, children: /* @__PURE__ */ e(pp, { pipelineId: t }) });
}
function pp({ pipelineId: t }) {
  const n = Oe(), r = qe(), a = ft(), { toast: i } = nn(), {
    definition: s,
    dirty: d,
    selectedNodeId: c,
    setSelectedNodeId: l,
    save: p,
    publish: u,
    revert: f,
    undo: h,
    redo: x,
    setTags: g
  } = r, m = nl(t), [N, v] = S(!1), y = ie(null), w = ie(d);
  ee(() => (w.current && !d && (v(!0), y.current && clearTimeout(y.current), y.current = setTimeout(() => v(!1), 450)), w.current = d, () => {
    y.current && (clearTimeout(y.current), y.current = null);
  }), [d]);
  const b = q(
    () => s ? vo(s) : null,
    [s]
  ), k = (b?.errors.length ?? 0) > 0, C = q(
    () => cp(s),
    [s]
  ), $ = q(() => s ? s.nodes.some((he) => he.type === "trigger") : !1, [s]) ? ["trigger"] : [], [T, M] = S(!0), [R, j] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), W = D(() => {
    j((he) => {
      const ne = !he;
      try {
        window.localStorage.setItem(
          "ws_pipelines_v1_show_tags",
          ne ? "true" : "false"
        );
      } catch {
      }
      return ne;
    });
  }, []), [ae, Z] = S(!1), [oe, O] = S(!1), [E, H] = S(!1), [J, L] = S(!1), [z, V] = S(!1), K = q(() => s?.publishedSnapshot ? s.publishedSnapshot : null, [s]), de = s?.status === "published", F = !m.isRunActive && (!de || k), se = m.isRunActive ? "Cancel the active run" : de ? k ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", ye = D(async () => {
    if (m.isRunActive && m.currentRunId) {
      a.cancelRun(m.currentRunId);
      return;
    }
    if (!F) {
      if (C.length > 0) {
        m.setTriggerInputValues(
          Object.fromEntries(C.map((he) => [he, ""]))
        ), m.setTriggerInputOpen(!0);
        return;
      }
      m.handleRunClick();
    }
  }, [m, a, F, C]);
  ee(() => {
    const he = (ne) => {
      if (dp(ne.target)) return;
      const Y = ne.metaKey || ne.ctrlKey;
      if (Y && ne.key.toLowerCase() === "s") {
        ne.preventDefault(), p(), i("Saved", { type: "success", durationMs: 1200 });
        return;
      }
      if (Y && ne.key === "Enter") {
        ne.preventDefault(), ye();
        return;
      }
      if (Y && ne.key === ".") {
        ne.preventDefault(), m.isRunActive && m.currentRunId && a.cancelRun(m.currentRunId);
        return;
      }
      if (Y && ne.shiftKey && ne.key.toLowerCase() === "z") {
        ne.preventDefault(), x();
        return;
      }
      if (Y && ne.key.toLowerCase() === "z") {
        ne.preventDefault(), h();
        return;
      }
      if (ne.key === "Escape") {
        l(null);
        return;
      }
    };
    return window.addEventListener("keydown", he), () => window.removeEventListener("keydown", he);
  }, [p, i, ye, m, a, h, x, l]);
  const Me = () => {
    if (!s) return;
    const he = Ln(s.id);
    he && n(`/pipelines/${he.id}`);
  }, He = () => {
    if (!s) return;
    const he = $n(s.id);
    he && Rt(`${lp(s.name)}.pipeline.json`, he);
  }, _e = async () => {
    if (!s) return;
    const he = Ks(s);
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(he), i("Mermaid diagram copied", { type: "success" });
      else
        throw new Error("clipboard unavailable");
    } catch (ne) {
      console.warn("[PipelineEditor] clipboard write failed", ne), i("Could not copy Mermaid diagram", { type: "error" });
    }
  }, Re = () => {
    L(!0);
  }, Ue = () => {
    Z(!1), !k && (u(), i("Pipeline published", { type: "success" }));
  }, Le = () => {
    s && (Go(s.id), O(!1), n("/pipelines"));
  }, Fe = () => {
    uo(t), H(!1), i("Run history cleared", { type: "success" });
  }, we = m.currentRunId ? a.runs[m.currentRunId] : void 0;
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
          ol,
          {
            pipelineId: t,
            definition: s,
            dirty: d,
            savingFlash: N,
            isRunActive: m.isRunActive,
            isTriggering: m.isTriggering,
            runDisabled: F,
            runTitle: se,
            currentRun: we,
            breakpoints: m.breakpoints,
            onRunClick: ye,
            onDebugRunClick: m.handleDebugRunClick,
            onExport: He,
            onPublishClick: () => Z(!0),
            onDuplicate: Me,
            onCopyMermaid: _e,
            onViewVersions: Re,
            onRevert: f,
            onToggleShowTags: W,
            showTags: R,
            onViewRunHistory: () => m.setSidebarTab("runs"),
            onClearRunHistory: () => H(!0),
            onSimPanelOpen: () => V(!0),
            onDelete: () => O(!0)
          }
        ),
        R && /* @__PURE__ */ o(
          "div",
          {
            "data-testid": "tags-row",
            className: I(
              "flex items-center gap-2 px-4 py-1.5",
              "border-b border-slate-200 bg-[#fafbfc]",
              "min-h-[34px] shrink-0 sticky top-11 z-[4]"
            ),
            children: [
              /* @__PURE__ */ e("span", { className: "text-[11px] text-slate-400 font-semibold", children: "TAGS" }),
              /* @__PURE__ */ e(
                ya,
                {
                  value: s.tags ?? [],
                  onChange: g,
                  placeholder: "add tag…"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ o("div", { className: "flex-1 flex min-h-0 relative overflow-hidden", children: [
          /* @__PURE__ */ e(Yi, { disabledTypes: $ }),
          /* @__PURE__ */ e("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ e(
            ps,
            {
              errorNodeId: m.activeError?.nodeId ?? null,
              onErrorNodePosition: m.handleErrorNodePosition,
              breakpoints: m.breakpoints,
              onToggleBreakpoint: m.handleToggleBreakpoint,
              pausedAtNodeId: m.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ e(
            sp,
            {
              pipelineId: t,
              selectedNodeId: c,
              sidebarTab: m.sidebarTab,
              onTabChange: m.setSidebarTab
            }
          )
        ] }),
        m.pausedBreakpoint && /* @__PURE__ */ e(
          fl,
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
          ms,
          {
            error: m.activeError,
            anchor: m.errorNodeAnchor,
            onDismiss: m.handleDismissError,
            onRetry: m.handleRetryFromError
          }
        ),
        /* @__PURE__ */ e(
          tl,
          {
            runId: m.currentRunId,
            visible: m.isRunActive && T
          }
        ),
        /* @__PURE__ */ e(
          el,
          {
            publishConfirmOpen: ae,
            onPublishClose: () => Z(!1),
            onPublishConfirm: Ue,
            hasErrors: k,
            validationErrorCount: b?.errors.length ?? 0,
            definitionName: s.name,
            definitionVersion: s.version,
            deleteConfirmOpen: oe,
            onDeleteClose: () => O(!1),
            onDeleteConfirm: Le,
            clearRunsConfirmOpen: E,
            onClearRunsClose: () => H(!1),
            onClearRunsConfirm: Fe,
            versionDiffOpen: J,
            onVersionDiffClose: () => L(!1),
            currentDef: s,
            publishedDef: K,
            onJumpToNode: l,
            simPanelOpen: z,
            onSimPanelClose: () => V(!1)
          }
        ),
        /* @__PURE__ */ e(
          Je,
          {
            open: m.triggerInputOpen,
            onClose: () => m.setTriggerInputOpen(!1),
            title: "Trigger inputs",
            maxWidth: 480,
            footer: /* @__PURE__ */ o(G, { children: [
              /* @__PURE__ */ e(Ee, { variant: "ghost", onClick: () => m.setTriggerInputOpen(!1), children: "Cancel" }),
              /* @__PURE__ */ e(
                Ee,
                {
                  variant: "primary",
                  onClick: m.handleTriggerInputSubmit,
                  disabled: C.some((he) => !m.triggerInputValues[he]?.trim()),
                  children: "Run"
                }
              )
            ] }),
            children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ e("p", { className: "m-0 text-xs text-text-secondary", children: "This pipeline expects input data. Provide values for the trigger context:" }),
              C.map((he) => /* @__PURE__ */ o("label", { className: "flex flex-col gap-1 text-xs", children: [
                /* @__PURE__ */ e("span", { className: "font-medium text-text-primary", children: he }),
                /* @__PURE__ */ e(
                  "textarea",
                  {
                    "data-autofocus": he === C[0] ? !0 : void 0,
                    rows: 3,
                    className: "resize-y px-2 py-1.5 rounded-md border border-border text-xs font-inherit",
                    value: m.triggerInputValues[he] ?? "",
                    onChange: (ne) => m.setTriggerInputValues((Y) => ({ ...Y, [he]: ne.target.value }))
                  }
                )
              ] }, he))
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
function up(t) {
  const n = t?.event;
  return !n || n === "manual" ? { icon: "▶", text: "Manual" } : n === "schedule" ? { icon: "⏱", text: t?.schedule ?? "Schedule" } : n === "webhook" ? { icon: "🔌", text: t?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${t?.event}` };
}
function mp({
  row: t,
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
  const [u, f] = S(!1), [h, x] = S(!1), g = ie(null);
  ut(g, () => f(!1), u);
  const m = t.status === "published", N = t.status === "archived", v = typeof t.publishedVersion == "number", y = up(t.triggerBinding);
  let w, b;
  N ? (w = `Archived · v${t.version}`, b = "danger") : m ? (w = `Published · v${t.version}`, b = "success") : v ? (w = `Draft · v${t.version} (published v${t.publishedVersion})`, b = "warning") : (w = `Draft · v${t.version}`, b = "neutral");
  const k = !m, C = (T) => (M) => {
    M.stopPropagation(), T();
  }, A = d || c || h || l, $ = (T) => {
    d ? p(T.shiftKey) : n();
  };
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": `pipeline-card-${t.id}`,
      "data-selected": c ? "true" : "false",
      onClick: $,
      onMouseEnter: () => x(!0),
      onMouseLeave: () => {
        x(!1), f(!1);
      },
      className: I(
        "flex flex-col gap-2 w-full px-3.5 py-3 bg-surface rounded-lg cursor-pointer relative transition-[border-color,box-shadow] duration-100",
        c ? "border border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : h ? "border border-primary shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "border border-border shadow-none"
      ),
      children: [
        A && /* @__PURE__ */ e(
          "label",
          {
            onClick: (T) => T.stopPropagation(),
            className: "absolute top-2 right-2 flex items-center justify-center w-[22px] h-[22px] cursor-pointer z-[1]",
            children: /* @__PURE__ */ e(
              "input",
              {
                type: "checkbox",
                "data-testid": `pipeline-select-${t.id}`,
                checked: c,
                onClick: (T) => {
                  T.stopPropagation(), p(T.shiftKey);
                },
                onKeyDown: (T) => {
                  (T.key === " " || T.key === "Spacebar") && (T.preventDefault(), p(T.shiftKey));
                },
                onChange: () => {
                },
                className: "cursor-pointer w-4 h-4 accent-primary"
              }
            )
          }
        ),
        /* @__PURE__ */ o("div", { className: I("flex items-center gap-2 min-w-0", A && "pr-7"), children: [
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
          /* @__PURE__ */ e(ce, { "aria-label": `Status: ${w}`, tone: b, size: "sm", children: w }),
          /* @__PURE__ */ o("span", { className: "text-[11px] text-text-secondary", children: [
            y.icon,
            " ",
            y.text
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
          /* @__PURE__ */ o("div", { className: "relative ml-auto", ref: g, children: [
            /* @__PURE__ */ e(
              "button",
              {
                "data-testid": `overflow-pipeline-${t.id}`,
                onClick: C(() => f((T) => !T)),
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
                onClick: (T) => T.stopPropagation(),
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
const hp = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, fp = ["draft", "published"];
function xp({
  search: t,
  onSearchChange: n,
  statusFilter: r,
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
            children: Wn.map((h) => {
              const x = a ? r.has(h) : fp.includes(h);
              return /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  role: "checkbox",
                  "aria-checked": x,
                  "data-testid": `status-chip-${h}`,
                  onClick: () => i(h),
                  onKeyDown: (g) => {
                    (g.key === "Enter" || g.key === " ") && (g.preventDefault(), i(h));
                  },
                  className: I(
                    "px-3 py-1.5 text-xs font-medium rounded cursor-pointer font-inherit",
                    x ? "border border-primary bg-primary text-white" : "border border-border bg-white text-text-secondary"
                  ),
                  children: hp[h]
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
const Ke = I(
  "px-2.5 py-[5px] text-xs font-semibold",
  "bg-white text-text-secondary",
  "border border-border-field rounded-md",
  "cursor-pointer font-inherit"
);
function gp({
  count: t,
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
  onSubmitRemoveTag: x,
  onCloseAddTag: g,
  onCloseRemoveTag: m,
  unionTags: N
}) {
  const [v, y] = S(""), w = ie(null), b = ie(null), k = ie(null);
  ee(() => {
    u && (y(""), setTimeout(() => w.current?.focus(), 30));
  }, [u]), ee(() => {
    if (!u) return;
    const A = (T) => {
      b.current?.contains(T.target) || g();
    }, $ = window.setTimeout(() => {
      document.addEventListener("mousedown", A);
    }, 0);
    return () => {
      window.clearTimeout($), document.removeEventListener("mousedown", A);
    };
  }, [u, g]), ee(() => {
    if (!f) return;
    const A = (T) => {
      k.current?.contains(T.target) || m();
    }, $ = window.setTimeout(() => {
      document.addEventListener("mousedown", A);
    }, 0);
    return () => {
      window.clearTimeout($), document.removeEventListener("mousedown", A);
    };
  }, [f, m]);
  const C = () => {
    const A = v.trim();
    A.length !== 0 && (h(A), y(""));
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
        /* @__PURE__ */ e("button", { "data-testid": "bulk-clear", className: Ke, onClick: n, children: "Clear" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-publish", className: Ke, onClick: i, children: "Publish selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-archive", className: Ke, onClick: s, children: "Archive selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export-json", className: Ke, onClick: a, children: "Export selected as JSON" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export", className: Ke, onClick: r, children: "Export all" }),
        /* @__PURE__ */ e(
          "button",
          {
            "data-testid": "bulk-delete-confirm-prompt",
            className: Ke,
            onClick: p,
            children: "Delete selected"
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", children: [
          /* @__PURE__ */ e("button", { "data-testid": "bulk-add-tag-btn", className: Ke, onClick: d, children: "Add tag..." }),
          u && /* @__PURE__ */ o(
            "div",
            {
              ref: b,
              "data-testid": "bulk-add-tag-popover",
              onClick: (A) => A.stopPropagation(),
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
                    onChange: (A) => y(A.target.value),
                    onKeyDown: (A) => {
                      A.key === "Enter" ? (A.preventDefault(), C()) : A.key === "Escape" && (A.preventDefault(), g());
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
                Ke,
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
              onClick: (A) => A.stopPropagation(),
              className: I(
                "absolute top-full left-0 mt-1.5",
                "bg-white border border-border rounded-lg",
                "shadow-lg min-w-[220px] max-w-[320px] p-2.5 z-10",
                "flex flex-col gap-2"
              ),
              children: [
                /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: "Click a tag to remove it from all selected:" }),
                /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: N.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "No tags to remove." }) : N.map((A) => /* @__PURE__ */ o(
                  "button",
                  {
                    "data-testid": `bulk-remove-tag-chip-${A}`,
                    onClick: () => x(A),
                    className: I(
                      "px-2 py-0.5 text-xs font-medium",
                      "bg-red-50 text-red-600",
                      "border border-red-200 rounded-full",
                      "cursor-pointer font-inherit"
                    ),
                    children: [
                      A,
                      " ✕"
                    ]
                  },
                  A
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
              "bg-red-600 text-white border-none rounded-md",
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
function bp({
  visibleRows: t,
  filteredIds: n
}) {
  const [r, a] = S(!1), [i, s] = S(/* @__PURE__ */ new Set()), d = ie(null), c = ie(null), l = D(() => {
    s(/* @__PURE__ */ new Set());
  }, []), p = D(() => {
    r ? (l(), a(!1)) : a(!0);
  }, [r, l]), u = D(
    (m, N = !1) => {
      const v = t, y = v.findIndex((b) => b.id === m), w = d.current;
      y !== -1 && (d.current = y), s((b) => {
        const k = new Set(b), C = !k.has(m);
        if (N && w != null && y !== -1) {
          const A = Math.min(w, y), $ = Math.max(w, y);
          for (let T = A; T <= $; T++) {
            const M = v[T];
            M && (C ? k.add(M.id) : k.delete(M.id));
          }
        } else C ? k.add(m) : k.delete(m);
        return k;
      });
    },
    [t]
  ), f = D(() => {
    s(new Set(n));
  }, [n]), h = t.length > 0 && t.every((m) => i.has(m.id)), x = !h && t.some((m) => i.has(m.id)), g = D(() => {
    s((m) => {
      const N = new Set(m);
      if (h)
        for (const v of t) N.delete(v.id);
      else
        for (const v of t) N.add(v.id);
      return N;
    }), r || a(!0);
  }, [h, t, r]);
  return ee(() => {
    c.current && (c.current.indeterminate = x);
  }, [x]), {
    selectionMode: r,
    selected: i,
    allVisibleSelected: h,
    someVisibleSelected: x,
    selectAllRef: c,
    handleToggleSelectMode: p,
    handleToggleSelect: u,
    handleSelectAllFiltered: f,
    handleHeaderToggleAll: g,
    clearSelection: l,
    setSelectionMode: a
  };
}
const yp = 280, ve = 160, vp = 40, Np = 200;
function X(t) {
  return vp + t * yp;
}
function Q(t) {
  return Np + t * ve;
}
function te(t, n, r, a = "in") {
  return {
    id: crypto.randomUUID(),
    source: t,
    sourceHandle: n,
    target: r,
    targetHandle: a
  };
}
function wp(t) {
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
    { id: r, type: "trigger", position: { x: X(0), y: Q(0) }, data: s },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: d },
    { id: i, type: "action", position: { x: X(2), y: Q(0) }, data: c }
  ], p = [
    te(r, "out", a),
    te(a, "out", i)
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
function kp(t) {
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
  }, m = {
    type: "join",
    mode: "all",
    mergeStrategy: "deep-merge"
  }, N = [
    { id: r, type: "trigger", position: { x: X(0), y: Q(0) }, data: p },
    { id: a, type: "fork", position: { x: X(1), y: Q(0) }, data: u },
    { id: i, type: "llm", position: { x: X(2), y: Q(0) - ve / 2 }, data: f },
    { id: s, type: "action", position: { x: X(3), y: Q(0) - ve / 2 }, data: h },
    { id: d, type: "llm", position: { x: X(2), y: Q(0) + ve / 2 }, data: x },
    { id: c, type: "action", position: { x: X(3), y: Q(0) + ve / 2 }, data: g },
    { id: l, type: "join", position: { x: X(4), y: Q(0) }, data: m }
  ], v = [
    te(r, "out", a),
    te(a, "branch-0", i),
    te(i, "out", s),
    te(s, "out", l, "in-0"),
    te(a, "branch-1", d),
    te(d, "out", c),
    te(c, "out", l, "in-1")
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
function Cp(t) {
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
  }, x = {
    type: "condition",
    expression: `context.steps.${a}.output.safe === true`,
    label: "Safe?"
  }, g = {
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
  }, v = {
    type: "condition",
    expression: `context.steps.${c}.output.decision === 'approve'`,
    label: "Approved?"
  }, y = {
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
    { id: r, type: "trigger", position: { x: X(0), y: Q(0) }, data: f },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: h },
    { id: i, type: "condition", position: { x: X(2), y: Q(0) }, data: x },
    { id: s, type: "action", position: { x: X(3), y: Q(0) - ve / 2 }, data: g },
    { id: d, type: "action", position: { x: X(3), y: Q(0) + ve / 2 }, data: m },
    { id: c, type: "approval", position: { x: X(4), y: Q(0) + ve / 2 }, data: N },
    { id: l, type: "condition", position: { x: X(5), y: Q(0) + ve / 2 }, data: v },
    { id: p, type: "action", position: { x: X(6), y: Q(0) }, data: y },
    { id: u, type: "action", position: { x: X(6), y: Q(0) + ve }, data: w }
  ], k = [
    te(r, "out", a),
    te(a, "out", i),
    te(i, "true", s),
    te(i, "false", d),
    te(d, "out", c),
    te(c, "approved", l),
    te(c, "rejected", u),
    te(l, "true", p),
    te(l, "false", u)
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Ip(t) {
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
    { id: r, type: "trigger", position: { x: X(0), y: Q(0) }, data: d },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: c },
    { id: i, type: "transform", position: { x: X(2), y: Q(0) }, data: l },
    { id: s, type: "action", position: { x: X(3), y: Q(0) }, data: p }
  ], f = [
    te(r, "out", a),
    te(a, "out", i),
    te(i, "out", s)
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
    createdBy: t
  };
}
function Sp(t) {
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
    { id: r, type: "trigger", position: { x: X(0), y: Q(0) }, data: d },
    { id: a, type: "approval", position: { x: X(1), y: Q(0) }, data: c },
    { id: i, type: "approval", position: { x: X(2), y: Q(0) }, data: l },
    { id: s, type: "action", position: { x: X(3), y: Q(0) }, data: p }
  ], f = [
    te(r, "out", a),
    te(a, "approved", i),
    te(i, "approved", s)
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
    createdBy: t
  };
}
function $p(t) {
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
    { id: r, type: "trigger", position: { x: X(0), y: Q(0) }, data: d },
    { id: a, type: "transform", position: { x: X(1), y: Q(0) }, data: c },
    { id: i, type: "llm", position: { x: X(2), y: Q(0) }, data: l },
    { id: s, type: "action", position: { x: X(3), y: Q(0) }, data: p }
  ], f = [
    te(r, "out", a),
    te(a, "out", i),
    te(i, "out", s)
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
    createdBy: t
  };
}
function Tp(t) {
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
    { id: r, type: "trigger", position: { x: X(0), y: Q(0) }, data: s },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: d },
    { id: i, type: "action", position: { x: X(2), y: Q(0) }, data: c }
  ], p = [
    te(r, "out", a),
    te(a, "out", i)
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
function Ap(t) {
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
    { id: r, type: "trigger", position: { x: X(0), y: Q(0) }, data: s },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: d },
    { id: i, type: "action", position: { x: X(2), y: Q(0) }, data: c }
  ], p = [
    te(r, "out", a),
    te(a, "out", i)
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
function Rp(t) {
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
  }, h = { type: "join", mode: "all", mergeStrategy: "deep-merge" }, x = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "reviews",
      message: `Review complete: LLM said {{context.steps.${i}.response}}; reviewer decision: {{context.steps.${s}.output.decision}}`
    },
    idempotent: !1,
    onError: "route-error"
  }, g = [
    { id: r, type: "trigger", position: { x: X(0), y: Q(0) }, data: l },
    { id: a, type: "fork", position: { x: X(1), y: Q(0) }, data: p },
    { id: i, type: "llm", position: { x: X(2), y: Q(0) - ve / 2 }, data: u },
    { id: s, type: "approval", position: { x: X(2), y: Q(0) + ve / 2 }, data: f },
    { id: d, type: "join", position: { x: X(3), y: Q(0) }, data: h },
    { id: c, type: "action", position: { x: X(4), y: Q(0) }, data: x }
  ], m = [
    te(r, "out", a),
    te(a, "branch-0", i),
    te(i, "out", d, "in-0"),
    te(a, "branch-1", s),
    te(s, "approved", d, "in-1"),
    te(d, "out", c)
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
    edges: m,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Pp(t) {
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
  }, x = {
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
  }, g = [
    { id: r, type: "trigger", position: { x: X(0), y: Q(0) }, data: l },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: p },
    { id: i, type: "condition", position: { x: X(2), y: Q(0) }, data: u },
    { id: s, type: "action", position: { x: X(3), y: Q(0) - ve / 2 }, data: f },
    { id: d, type: "approval", position: { x: X(4), y: Q(0) - ve / 2 }, data: h },
    { id: c, type: "action", position: { x: X(3), y: Q(0) + ve / 2 }, data: x }
  ], m = [
    te(r, "out", a),
    te(a, "out", i),
    te(i, "true", s),
    te(s, "out", d),
    te(i, "false", c)
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
    edges: m,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Mp(t) {
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
  }, v = {
    type: "join",
    mode: "all",
    mergeStrategy: "array-collect"
  }, y = {
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
    { id: r, type: "trigger", position: { x: X(0), y: Q(0) }, data: f },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: h },
    { id: i, type: "fork", position: { x: X(2), y: Q(0) }, data: x },
    { id: s, type: "llm", position: { x: X(3), y: Q(0) - ve }, data: g },
    { id: d, type: "llm", position: { x: X(3), y: Q(0) }, data: m },
    { id: c, type: "llm", position: { x: X(3), y: Q(0) + ve }, data: N },
    { id: l, type: "join", position: { x: X(4), y: Q(0) }, data: v },
    { id: p, type: "llm", position: { x: X(5), y: Q(0) }, data: y },
    { id: u, type: "action", position: { x: X(6), y: Q(0) }, data: w }
  ], k = [
    te(r, "out", a),
    te(a, "out", i),
    te(i, "branch-0", s),
    te(i, "branch-1", d),
    te(i, "branch-2", c),
    te(s, "out", l, "in-0"),
    te(d, "out", l, "in-1"),
    te(c, "out", l, "in-2"),
    te(l, "out", p),
    te(p, "out", u)
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
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Ep(t) {
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
    { id: r, type: "trigger", position: { x: X(0), y: Q(0) }, data: c },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: l },
    { id: i, type: "condition", position: { x: X(2), y: Q(0) }, data: p },
    { id: s, type: "action", position: { x: X(3), y: Q(0) - ve / 2 }, data: u },
    { id: d, type: "approval", position: { x: X(3), y: Q(0) + ve / 2 }, data: f }
  ], x = [
    te(r, "out", a),
    te(a, "out", i),
    te(i, "true", s),
    te(i, "false", d)
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
    edges: x,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
function Dp(t) {
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
  }, y = [
    { id: r, type: "trigger", position: { x: X(0), y: Q(0) }, data: u },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: f },
    { id: i, type: "transform", position: { x: X(2), y: Q(0) }, data: h },
    { id: s, type: "condition", position: { x: X(3), y: Q(0) }, data: x },
    { id: d, type: "action", position: { x: X(4), y: Q(0) - ve / 2 }, data: g },
    { id: c, type: "llm", position: { x: X(4), y: Q(0) + ve / 2 }, data: m },
    { id: l, type: "approval", position: { x: X(5), y: Q(0) + ve / 2 }, data: N },
    { id: p, type: "action", position: { x: X(6), y: Q(0) + ve / 2 }, data: v }
  ], w = [
    te(r, "out", a),
    te(a, "out", i),
    te(i, "out", s),
    te(s, "true", d),
    te(s, "false", c),
    te(c, "out", l),
    te(l, "approved", p)
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
    nodes: y,
    edges: w,
    createdAt: n,
    updatedAt: n,
    createdBy: t
  };
}
const In = [
  {
    id: "document-summary",
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    tags: ["llm", "summary", "document"],
    build: wp
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: kp
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: Cp,
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
    build: Ip,
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
    build: Sp,
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
    build: $p
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: Tp
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: Ap
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: Rp
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: Pp
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: Mp
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: Ep
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: Dp
  }
], $o = "/api";
async function Op(t) {
  const n = { createdTypes: [], errors: [] };
  if (!t?.documentTypes?.length) return n;
  for (const r of t.documentTypes)
    try {
      const a = await _p(r.name);
      if (a) {
        n.createdTypes.push(a.typeId);
        continue;
      }
      const i = await Lp(r);
      n.createdTypes.push(i.typeId);
    } catch (a) {
      n.errors.push(
        `Failed to scaffold "${r.name}": ${a instanceof Error ? a.message : String(a)}`
      );
    }
  return n;
}
async function _p(t) {
  try {
    const n = await fetch(`${$o}/document-types`, { credentials: "same-origin" });
    if (!n.ok) return null;
    const a = (await n.json()).items?.find(
      (i) => i.name.toLowerCase() === t.toLowerCase()
    );
    return a ? { typeId: a.typeId } : null;
  } catch {
    return null;
  }
}
async function Lp(t) {
  const n = t.fields.map((i, s) => ({
    fieldId: crypto.randomUUID(),
    name: i.name,
    fieldType: i.fieldType,
    widget: Bp(i.fieldType),
    cardinality: 1,
    required: i.required ?? !1,
    helpText: "",
    options: i.options,
    order: s
  })), r = await fetch(`${$o}/document-types`, {
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
    const i = await r.text();
    throw new Error(`HTTP ${r.status}: ${i}`);
  }
  return await r.json();
}
function Bp(t) {
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
function Up(t) {
  const n = /* @__PURE__ */ new Map(), r = t.nodes.map((s) => {
    const d = crypto.randomUUID();
    return n.set(s.id, d), {
      ...s,
      id: d,
      data: JSON.parse(JSON.stringify(s.data)),
      position: { ...s.position }
    };
  }), a = t.edges.map((s) => ({
    ...s,
    id: crypto.randomUUID(),
    source: n.get(s.source) ?? s.source,
    target: n.get(s.target) ?? s.target
  })), i = (/* @__PURE__ */ new Date()).toISOString();
  return {
    ...t,
    id: crypto.randomUUID(),
    name: `${t.name} (copy)`,
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
function Fp(t) {
  const n = t.triggerBinding?.event ?? "manual";
  return n === "schedule" ? "Schedule" : n === "webhook" ? "Webhook" : n === "manual" ? "Manual" : n.startsWith("document.") ? `On ${n}` : n;
}
function jp({ template: t, meta: n, onPick: r }) {
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
            onClick: () => r(t),
            className: "mt-auto px-2.5 py-1.5 text-xs font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-[inherit]",
            children: "Use this template"
          }
        )
      ]
    }
  );
}
function zp({
  open: t,
  onClose: n,
  onCreated: r,
  onSelect: a
}) {
  const { userId: i } = jn(), [s, d] = S(""), c = ie(null);
  ee(() => {
    t && (d(""), setTimeout(() => c.current?.focus(), 30));
  }, [t]);
  const l = q(() => {
    const h = /* @__PURE__ */ new Map();
    for (const x of In) {
      const g = x.build(i || "anonymous");
      h.set(x.id, { nodeCount: g.nodes.length, trigger: Fp(g) });
    }
    return h;
  }, [i, t]), p = q(() => {
    const h = s.trim().toLowerCase();
    return h ? In.filter(
      (x) => x.name.toLowerCase().includes(h) || x.description.toLowerCase().includes(h) || x.tags.some((g) => g.toLowerCase().includes(h))
    ) : In;
  }, [s]), u = (h) => {
    if (r) {
      const x = h.build(i || "anonymous"), g = Up(x);
      Yo(g), n(), r(g.id), h.prerequisites && Op(h.prerequisites).then((m) => {
        m.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", m.errors);
      });
      return;
    }
    a && a(h);
  };
  return /* @__PURE__ */ o(
    Je,
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
              jp,
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
const Wn = ["draft", "published", "archived"], Br = ["draft", "published"];
function qp(t) {
  if (t == null) return null;
  if (t.trim() === "") return /* @__PURE__ */ new Set();
  const n = new Set(Wn);
  return new Set(
    t.split(",").map((a) => a.trim()).filter((a) => n.has(a))
  );
}
function Vp(t, n) {
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
function Wp(t) {
  const n = t?.event;
  return !n || n === "manual" ? "manual" : n === "schedule" ? "schedule" : n === "webhook" ? "webhook" : "document";
}
function Ur(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Jp() {
  const t = /* @__PURE__ */ new Date(), n = t.getFullYear(), r = String(t.getMonth() + 1).padStart(2, "0"), a = String(t.getDate()).padStart(2, "0");
  return `${n}-${r}-${a}`;
}
function Hp({
  open: t,
  onClose: n,
  onCreate: r
}) {
  const [a, i] = S(""), s = ie(null);
  ee(() => {
    t && (i(""), setTimeout(() => s.current?.focus(), 50));
  }, [t]);
  const d = a.trim().length > 0, c = () => {
    d && r(a.trim());
  };
  return /* @__PURE__ */ o(
    Je,
    {
      open: t,
      onClose: n,
      title: "Create new pipeline",
      maxWidth: 440,
      footer: /* @__PURE__ */ o(G, { children: [
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
function mh() {
  const t = Oe(), { userId: n } = jn(), { toast: r } = nn(), { triggerRun: a, isTriggering: i } = Xo(), [s, d] = tn(), [c, l] = S([]), [p, u] = S(""), [f, h] = S("all"), [x, g] = S("updated"), m = q(
    () => qp(s.get("status")),
    [s]
  ), N = q(() => m ?? new Set(Br), [m]), v = m != null, y = (P) => {
    const _ = new URLSearchParams(s);
    if (P.size === 0)
      _.set("status", "");
    else {
      const le = Wn.filter((ue) => P.has(ue)).join(",");
      _.set("status", le);
    }
    d(_, { replace: !0 });
  }, w = (P) => {
    const _ = v ? new Set(N) : new Set(Br);
    _.has(P) ? _.delete(P) : _.add(P), y(_);
  }, [b, k] = S(!1), [C, A] = S(!1), [$, T] = S(null), [M, R] = S(!1), [j, W] = S(!1), [ae, Z] = S(!1), oe = D(async () => {
    const P = await Qo(), _ = [];
    for (const le of P) {
      const ue = await rt(le.id);
      ue && _.push(Vp(ue, le.icon));
    }
    l(_);
  }, []);
  ee(() => {
    oe();
  }, [oe]);
  const O = q(() => {
    const P = p.trim().toLowerCase(), le = [...c.filter((ue) => {
      if (P) {
        const ge = ue.name.toLowerCase().includes(P), De = ue.tags.some((Hn) => Hn.toLowerCase().includes(P));
        if (!ge && !De) return !1;
      }
      return !(!(v && N.size === 0) && !N.has(ue.status) || f !== "all" && Wp(ue.triggerBinding) !== f);
    })];
    return x === "name" ? le.sort((ue, ge) => ue.name.localeCompare(ge.name)) : x === "created" ? le.sort((ue, ge) => ge.createdAt.localeCompare(ue.createdAt)) : le.sort((ue, ge) => ge.updatedAt.localeCompare(ue.updatedAt)), le;
  }, [c, p, N, v, f, x]), E = q(() => O.map((P) => P.id), [O]), {
    selectionMode: H,
    selected: J,
    allVisibleSelected: L,
    selectAllRef: z,
    handleToggleSelect: V,
    handleSelectAllFiltered: K,
    handleHeaderToggleAll: de,
    clearSelection: F,
    setSelectionMode: se
  } = bp({ visibleRows: O, filteredIds: E }), ye = q(() => {
    const P = /* @__PURE__ */ new Set();
    for (const _ of c)
      if (J.has(_.id))
        for (const le of _.tags) P.add(le);
    return Array.from(P).sort((_, le) => _.localeCompare(le));
  }, [c, J]), Me = async (P) => {
    const _ = await Zo({ name: P, createdBy: n });
    k(!1), t(`/pipelines/${_.id}`);
  }, He = () => {
    const P = ea(n);
    ot(P).then(() => oe()), t(`/pipelines/${P.id}`);
  }, _e = (P) => {
    const _ = P.build(n);
    ot(_), A(!1), t(`/pipelines/${_.id}`);
  }, Re = (P) => t(`/pipelines/${P}`), Ue = async (P) => {
    if (P.status !== "published") {
      r("Run requires published state", { type: "warning" });
      return;
    }
    if (!i)
      try {
        await a(P.id, {}) ? r(`Run started for "${P.name}"`, { type: "success" }) : r("Could not start run", { type: "error" });
      } catch (_) {
        r(`Run failed: ${_.message}`, { type: "error" });
      } finally {
        t(`/pipelines/${P.id}`);
      }
  }, Le = (P) => {
    const _ = Ln(P);
    _ && (ot(_).then(() => oe()), r(`Duplicated as "${_.name}"`, { type: "success" }));
  }, Fe = (P) => {
    const _ = $n(P.id);
    if (!_) {
      r("Export failed", { type: "error" });
      return;
    }
    Rt(`${Ur(P.name)}.pipeline.json`, _);
  }, we = async () => {
    $ && (await Gn($), T(null), oe(), r("Pipeline deleted", { type: "success" }));
  }, he = $ ? c.find((P) => P.id === $) : null, ne = () => {
    const P = Array.from(J);
    P.length !== 0 && (P.forEach((_, le) => {
      window.setTimeout(() => {
        const ue = c.find((De) => De.id === _), ge = $n(_);
        !ue || !ge || Rt(`${Ur(ue.name)}-${Jp()}.pipeline.json`, ge);
      }, le * 100);
    }), r(`Exported ${P.length} pipeline${P.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, Y = async (P) => {
    const _ = Array.from(J);
    for (const le of _) {
      const ue = await rt(le);
      if (!ue) continue;
      const ge = ue.tags ?? [];
      ge.includes(P) || (ue.tags = [...ge, P], await ot(ue));
    }
    W(!1), oe(), r(`Added tag "${P}" to ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, re = async (P) => {
    const _ = Array.from(J);
    for (const le of _) {
      const ue = await rt(le);
      if (!ue) continue;
      const ge = ue.tags ?? [];
      ge.includes(P) && (ue.tags = ge.filter((De) => De !== P), await ot(ue));
    }
    oe(), r(`Removed tag "${P}" from ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, pe = async () => {
    const P = Array.from(J);
    for (const _ of P) await Gn(_);
    R(!1), F(), oe(), r(`Deleted ${P.length} pipeline${P.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, xe = async () => {
    const P = Array.from(J);
    if (P.length === 0) return;
    let _ = 0, le = 0;
    for (const ue of P) {
      const ge = await rt(ue);
      if (!ge) continue;
      if (ge.status === "published") {
        le += 1;
        continue;
      }
      await ta(ue) && (_ += 1);
    }
    oe(), le > 0 ? r(
      `Published ${_}; skipped ${le} already published`,
      { type: "success" }
    ) : r(
      `Published ${_} pipeline${_ === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, $e = async () => {
    const P = Array.from(J);
    if (P.length === 0) return;
    let _ = 0, le = 0;
    for (const ge of P) {
      const De = await rt(ge);
      if (!De) continue;
      De.status === "archived" ? (De.status = "draft", le += 1) : (De.status = "archived", _ += 1), await ot(De);
    }
    oe();
    const ue = [];
    _ > 0 && ue.push(`Archived ${_}`), le > 0 && ue.push(`Unarchived ${le}`), r(ue.join(" · ") || "No pipelines changed", { type: "success" });
  }, Ce = async () => {
    const P = Array.from(J);
    if (P.length === 0) return;
    const _ = [];
    for (const ue of P) {
      const ge = await rt(ue);
      ge && _.push(ge);
    }
    if (_.length === 0) {
      r("Export failed", { type: "error" });
      return;
    }
    const le = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    Rt(`pipelines-${le}.json`, JSON.stringify(_, null, 2)), r(`Exported ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  };
  ee(() => {
    const P = (_) => {
      const le = _.target;
      if (le) {
        const ge = le.tagName;
        if (ge === "INPUT" || ge === "TEXTAREA" || ge === "SELECT" || le.isContentEditable)
          return;
      }
      if (_.key === "Escape") {
        (J.size > 0 || H || j || ae) && (W(!1), Z(!1), F(), se(!1));
        return;
      }
      if ((_.metaKey || _.ctrlKey) && (_.key === "a" || _.key === "A")) {
        H && (_.preventDefault(), K());
        return;
      }
      (_.key === "Delete" || _.key === "Backspace") && J.size > 0 && !M && !$ && !b && !C && (_.preventDefault(), R(!0));
    };
    return window.addEventListener("keydown", P), () => window.removeEventListener("keydown", P);
  }, [
    J,
    H,
    j,
    ae,
    M,
    $,
    b,
    C,
    F,
    K,
    se
  ]);
  const Ve = c.length > 0, Bt = J.size > 0;
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
                    onClick: () => A(!0),
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
        Ve && /* @__PURE__ */ e(
          xp,
          {
            search: p,
            onSearchChange: u,
            statusFilter: N,
            statusExplicit: v,
            onToggleStatusKey: w,
            triggerFilter: f,
            onTriggerFilterChange: h,
            sortKey: x,
            onSortKeyChange: g,
            allVisibleSelected: L,
            selectAllRef: z,
            onHeaderToggleAll: de
          }
        ),
        Bt && /* @__PURE__ */ e(
          gp,
          {
            count: J.size,
            onClear: F,
            onExport: ne,
            onExportAsJSON: Ce,
            onPublish: xe,
            onArchive: $e,
            onAddTag: () => {
              W((P) => !P), Z(!1);
            },
            onRemoveTag: () => {
              Z((P) => !P), W(!1);
            },
            onDelete: () => R(!0),
            onDeleteWithConfirm: () => R(!0),
            addTagOpen: j,
            removeTagOpen: ae,
            onSubmitAddTag: Y,
            onSubmitRemoveTag: re,
            onCloseAddTag: () => W(!1),
            onCloseRemoveTag: () => Z(!1),
            unionTags: ye
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: I(
              "flex-1 overflow-y-auto overflow-x-hidden min-w-0",
              Ve ? "p-6" : "p-0"
            ),
            children: Ve ? O.length === 0 ? /* @__PURE__ */ e(
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
                children: O.map((P) => /* @__PURE__ */ e(
                  mp,
                  {
                    row: P,
                    onOpen: () => Re(P.id),
                    onRun: () => {
                      Ue(P);
                    },
                    onDuplicate: () => Le(P.id),
                    onExport: () => Fe(P),
                    onDelete: () => T(P.id),
                    selectionMode: H,
                    selected: J.has(P.id),
                    anySelected: Bt,
                    onToggleSelect: (_) => V(P.id, _)
                  },
                  P.id
                ))
              }
            ) : /* @__PURE__ */ o("div", { className: "flex flex-col h-full", children: [
              /* @__PURE__ */ e("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ e(
                Be,
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
                    onClick: He,
                    className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
                    children: "or try the demo pipeline"
                  }
                ),
                /* @__PURE__ */ e("span", { "aria-hidden": !0, children: "·" }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    "data-testid": "empty-state-templates",
                    onClick: () => A(!0),
                    className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
                    children: "or browse templates"
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ e(
          Hp,
          {
            open: b,
            onClose: () => k(!1),
            onCreate: Me
          }
        ),
        /* @__PURE__ */ e(
          zp,
          {
            open: C,
            onClose: () => A(!1),
            onSelect: _e
          }
        ),
        /* @__PURE__ */ e(
          Je,
          {
            open: !!$,
            onClose: () => T(null),
            title: "Delete pipeline?",
            maxWidth: 400,
            footer: /* @__PURE__ */ o(G, { children: [
              /* @__PURE__ */ e(
                "button",
                {
                  "data-testid": "delete-pipeline-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => T(null),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  "data-testid": "delete-pipeline-confirm",
                  onClick: we,
                  className: I(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-red-600 text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: "Delete"
                }
              )
            ] }),
            children: he && /* @__PURE__ */ o("p", { className: "m-0", children: [
              /* @__PURE__ */ o("strong", { children: [
                "“",
                he.name,
                "”"
              ] }),
              " will be permanently removed. Run history will also be lost."
            ] })
          }
        ),
        /* @__PURE__ */ e(
          Je,
          {
            open: M,
            onClose: () => R(!1),
            title: `Delete ${J.size} pipeline${J.size === 1 ? "" : "s"}?`,
            maxWidth: 420,
            backdropTestId: "bulk-delete-modal",
            footer: /* @__PURE__ */ o(G, { children: [
              /* @__PURE__ */ e(
                "button",
                {
                  "data-testid": "bulk-delete-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => R(!1),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ o(
                "button",
                {
                  "data-testid": "bulk-delete-confirm",
                  onClick: pe,
                  className: I(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-red-600 text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: [
                    "Delete ",
                    J.size
                  ]
                }
              )
            ] }),
            children: /* @__PURE__ */ o("p", { className: "m-0", children: [
              /* @__PURE__ */ o("strong", { children: [
                J.size,
                " pipeline",
                J.size === 1 ? "" : "s"
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
const Kp = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function To(t, n, r) {
  const a = Kp[t], i = Math.max(0, n | 0), s = Math.max(0, r | 0);
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
function xt(t) {
  const n = {};
  let r = 0, a = 0, i = 0, s = 0, d = !1;
  for (const l of t) {
    if (!l.model) continue;
    const p = l.tokensIn ?? 0, u = l.tokensOut ?? 0, f = To(l.model, p, u), h = n[l.model];
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
function Lt(t) {
  return !t || !t.modelFound && t.totalCostUsd === 0 ? "—" : t.totalCostUsd >= 0.01 ? `$${t.totalCostUsd.toFixed(2)}` : t.totalCostUsd === 0 ? "$0.00" : `$${t.totalCostUsd.toFixed(4)}`;
}
function Gp(t) {
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
function Ao(t, n) {
  let r = 0;
  if (t.llm) {
    const i = n.get(t.nodeId);
    i && (r += To(i, t.llm.tokensIn, t.llm.tokensOut).totalCostUsd);
  }
  const a = t.costUsd;
  return typeof a == "number" && Number.isFinite(a) && a > 0 && (r += a), r;
}
function Yp(t, n) {
  if (!n) return [];
  const r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    l.data.type === "llm" && r.set(l.id, l.data.model), a.set(l.id, Gp(l)), i.set(l.id, l.data.type);
  const s = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    s.set(l.id, 0), d.set(l.id, 0);
  for (const l of t)
    for (const p of Object.values(l.steps ?? {})) {
      if (!a.has(p.nodeId)) continue;
      const u = Ao(p, r);
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
function Xp(t) {
  return t.slice(0, 10);
}
function Qp(t) {
  return Date.UTC(
    Number(t.slice(0, 4)),
    Number(t.slice(5, 7)) - 1,
    Number(t.slice(8, 10))
  );
}
function Zp(t, n, r = 30, a = /* @__PURE__ */ new Date()) {
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
  for (const u of t) {
    const f = Xp(u.startedAt);
    if (!c.has(f)) continue;
    let h = 0;
    for (const x of Object.values(u.steps ?? {}))
      h += Ao(x, i);
    c.set(f, (c.get(f) ?? 0) + h), l.set(f, (l.get(f) ?? 0) + 1);
  }
  const p = [];
  for (let u = d; u <= s; u += 864e5) {
    const f = new Date(u).toISOString().slice(0, 10);
    p.push({
      date: f,
      ts: Qp(f),
      totalCostUsd: c.get(f) ?? 0,
      runCount: l.get(f) ?? 0
    });
  }
  return p;
}
const Ro = [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
], Po = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], Mo = ["24h", "7d", "30d", "all"], eu = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function tu(t) {
  return t.startsWith("document.") || t === "document" ? "document" : t === "schedule" || t === "scheduled" ? "scheduled" : t === "webhook" ? "webhook" : "manual";
}
function nu(t) {
  let n = 0;
  for (const r of Object.values(t.steps ?? {})) {
    const a = r.attempts?.length ?? 0;
    a > 1 && (n += a - 1);
  }
  return n;
}
function Eo(t, n) {
  const r = n.now ?? Date.now(), a = n.range === "all" ? null : r - eu[n.range], i = n.query.trim().toLowerCase();
  return t.filter((s) => {
    if (n.statuses.size > 0 && !n.statuses.has(s.status)) return !1;
    if (n.triggerKinds.size > 0) {
      const d = tu(s.triggeredBy.triggerType);
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
function Fr(t, n) {
  if (!t) return /* @__PURE__ */ new Set();
  const r = new Set(n);
  return new Set(
    t.split(",").map((a) => a.trim()).filter((a) => r.has(a))
  );
}
function Do(t) {
  const n = t.get("range") ?? "7d", r = Mo.includes(n) ? n : "7d";
  return {
    query: t.get("q") ?? "",
    statuses: Fr(t.get("status"), Ro),
    triggerKinds: Fr(t.get("trigger"), Po),
    range: r
  };
}
const ru = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, ou = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, au = {
  "24h": "Last 24h",
  "7d": "Last 7d",
  "30d": "Last 30d",
  all: "All time"
};
function jr({
  label: t,
  options: n,
  selected: r,
  onToggle: a,
  labels: i,
  testIdPrefix: s
}) {
  const [d, c] = S(!1), l = ie(null);
  ut(l, () => c(!1), d);
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
function Oo({
  query: t,
  statuses: n,
  triggerKinds: r,
  range: a,
  onQueryChange: i,
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
            onChange: (u) => i(u.target.value),
            className: "flex-[1_1_180px] max-w-[240px] px-2.5 py-[5px] text-xs border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
            "aria-label": "Search runs by run id or pipeline id"
          }
        ),
        /* @__PURE__ */ e("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ e("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: Mo.map((u) => /* @__PURE__ */ e(
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
            children: au[u]
          },
          u
        )) }),
        /* @__PURE__ */ e("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ e(
          jr,
          {
            label: "Status",
            options: Ro,
            selected: n,
            onToggle: s,
            labels: ru,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ e(
          jr,
          {
            label: "Trigger",
            options: Po,
            selected: r,
            onToggle: d,
            labels: ou,
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
function iu({
  selectionCount: t,
  onExport: n,
  onDelete: r,
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
            onClick: a,
            className: "px-2.5 py-1 text-xs bg-none border-none text-text-secondary cursor-pointer font-[inherit] ml-auto",
            children: "Clear selection"
          }
        )
      ]
    }
  );
}
function Jn(t) {
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
function su(t) {
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
const lu = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function cu(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function du({
  filtered: t,
  selected: n,
  onSelectionChange: r,
  comparePair: a,
  onToggleComparePair: i,
  costByRunId: s,
  pipelineId: d,
  onNavigate: c,
  onOpenRetryModal: l
}) {
  const p = ie(!1), u = ie(null), f = t.length > 0 && t.every((m) => n.has(m.id)), h = !f && t.some((m) => n.has(m.id)), x = () => {
    const m = new Set(n);
    if (f)
      for (const N of t) m.delete(N.id);
    else
      for (const N of t) m.add(N.id);
    r(m);
  }, g = (m, N, v) => {
    const y = new Set(n), w = !y.has(m);
    if (v && u.current != null) {
      const b = Math.min(u.current, N), k = Math.max(u.current, N);
      for (let C = b; C <= k; C++) {
        const A = t[C];
        A && (w ? y.add(A.id) : y.delete(A.id));
      }
    } else w ? y.add(m) : y.delete(m);
    u.current = N, r(y);
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
                  onChange: x
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
          const { tone: v, label: y } = Jn(m.status), w = n.has(m.id), b = nu(m);
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
                        p.current = !1, g(m.id, N, k);
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
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: cu(m.startedAt) }),
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: [
                  /* @__PURE__ */ e(ce, { tone: v, "aria-label": `Status: ${y}`, children: y }),
                  m.status === "running" && m.stuckAt && /* @__PURE__ */ e(
                    ce,
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
                    ce,
                    {
                      tone: su(m.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${m.id}`,
                      title: m.error.message,
                      className: "ml-1.5",
                      children: lu[m.error.errorCategory] ?? m.error.errorCategory
                    }
                  )
                ] }),
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: ke(m.durationMs) }),
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
                            await na(m.pipelineId, m.id);
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
function hh() {
  const { pipelineId: t } = mt(), n = Oe(), [r, a] = tn(), [i, s] = S([]), [d, c] = S(null), [l, p] = S([]), [u, f] = S(() => /* @__PURE__ */ new Set()), [h, x] = S(null), [g, m] = S(!1), [N, v] = S(null), [y, w] = S(!1), b = D((L) => {
    const z = L.error?.nodeId;
    if (!z || z === "unknown") return;
    const V = Object.entries(L.steps).filter(([K, de]) => K !== z && de.status === "completed").map(([K]) => K);
    x({ run: L, nodeId: z, skippedNodes: V, snapshotInput: !1 }), v(null);
  }, []), k = D(async () => {
    if (h) {
      v(null), m(!0);
      try {
        const L = await mo(
          h.run.pipelineId,
          h.run.id,
          h.nodeId,
          void 0,
          h.snapshotInput || void 0
        );
        x(null), n(`/pipelines/${h.run.pipelineId}/runs/${L.newRunId}`);
      } catch (L) {
        v(L instanceof Error ? L.message : String(L)), m(!1);
      }
    }
  }, [h, n]), { query: C, statuses: A, triggerKinds: $, range: T } = q(
    () => Do(r),
    [r]
  ), M = (L, z) => {
    const V = new URLSearchParams(r);
    z ? V.set(L, z) : V.delete(L), a(V, { replace: !0 });
  }, R = (L) => {
    const z = new Set(A);
    z.has(L) ? z.delete(L) : z.add(L), M("status", z.size === 0 ? null : Array.from(z).join(","));
  }, j = (L) => {
    const z = new Set($);
    z.has(L) ? z.delete(L) : z.add(L), M("trigger", z.size === 0 ? null : Array.from(z).join(","));
  }, W = (L) => {
    M("range", L === "7d" ? null : L);
  }, ae = (L) => {
    M("q", L.length === 0 ? null : L);
  }, Z = (L) => {
    p((z) => z.includes(L) ? z.filter((V) => V !== L) : z.length >= 2 ? [z[1], L] : [...z, L]);
  };
  ee(() => {
    t && (c(nt(t)), s(Xt(t)));
  }, [t]);
  const oe = q(
    () => Eo(i, { query: C, statuses: A, triggerKinds: $, range: T }),
    [i, C, A, $, T]
  ), O = q(() => {
    const L = /* @__PURE__ */ new Map();
    if (!d) return L;
    for (const z of d.nodes)
      z.data.type === "llm" && L.set(z.id, z.data.model);
    return L;
  }, [d]), E = q(() => {
    const L = {};
    for (const z of oe) {
      const V = Object.values(z.steps).filter((K) => !!K.llm).map((K) => ({
        model: O.get(K.nodeId),
        tokensIn: K.llm?.tokensIn ?? 0,
        tokensOut: K.llm?.tokensOut ?? 0
      }));
      L[z.id] = Lt(xt(V).total);
    }
    return L;
  }, [oe, O]), H = () => {
    if (!t) return;
    w(!1);
    const L = Array.from(u), z = i.filter((V) => !u.has(V.id));
    uo(t);
    for (const V of [...z].sort((K, de) => K.startedAt.localeCompare(de.startedAt)))
      ra(t, V);
    s(Xt(t)), f(/* @__PURE__ */ new Set()), p((V) => V.filter((K) => !L.includes(K)));
  }, J = () => {
    const L = i.filter((F) => u.has(F.id));
    if (L.length === 0) return;
    const z = new Blob([JSON.stringify(L, null, 2)], { type: "application/json" }), V = URL.createObjectURL(z), K = document.createElement("a"), de = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    K.href = V, K.download = `pipeline-runs-${de}.json`, document.body.appendChild(K), K.click(), document.body.removeChild(K), URL.revokeObjectURL(V);
  };
  return t ? d ? /* @__PURE__ */ o("div", { "data-testid": "pipeline-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e(
      Zt,
      {
        open: h !== null,
        onConfirm: k,
        onCancel: () => {
          g || x(null);
        },
        title: "Retry from failure",
        confirmLabel: g ? "Starting…" : "Confirm retry",
        confirmDisabled: g,
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
            /* @__PURE__ */ e("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: h.skippedNodes.map((L) => /* @__PURE__ */ e("span", { className: "bg-[#fafbfc] border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary", children: L.slice(0, 10) }, L)) })
          ] }),
          /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
            /* @__PURE__ */ e("input", { type: "checkbox", checked: h.snapshotInput, onChange: (L) => x((z) => z && { ...z, snapshotInput: L.target.checked }), className: "accent-primary" }),
            "Use persisted input snapshot"
          ] }),
          N && /* @__PURE__ */ e("div", { "data-testid": "retry-modal-error", className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: N })
        ] })
      }
    ),
    /* @__PURE__ */ e(
      Zt,
      {
        open: y,
        onConfirm: H,
        onCancel: () => w(!1),
        title: `Delete ${u.size} run${u.size === 1 ? "" : "s"}?`,
        body: "This cannot be undone.",
        confirmLabel: `Delete ${u.size}`,
        tone: "destructive"
      }
    ),
    N && /* @__PURE__ */ e(tt, { title: "Retry failed:", onDismiss: () => v(null), children: N }),
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
        i.length,
        " run",
        i.length === 1 ? "" : "s",
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
            const [L, z] = l;
            n(`/pipelines/${t}/runs/compare/${L}/${z}`);
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
      Oo,
      {
        query: C,
        statuses: A,
        triggerKinds: $,
        range: T,
        onQueryChange: ae,
        onStatusToggle: R,
        onTriggerToggle: j,
        onRangeChange: W,
        onClearFilters: () => {
          ae(""), M("status", null), M("trigger", null);
        }
      }
    ),
    u.size > 0 && /* @__PURE__ */ e(
      iu,
      {
        selectionCount: u.size,
        onExport: J,
        onDelete: () => {
          u.size > 0 && t && w(!0);
        },
        onClear: () => f(/* @__PURE__ */ new Set())
      }
    ),
    oe.length === 0 ? /* @__PURE__ */ e(
      Be,
      {
        icon: "📜",
        title: i.length === 0 ? "No runs yet" : "No runs match these filters",
        body: i.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
      }
    ) : /* @__PURE__ */ e(
      du,
      {
        filtered: oe,
        selected: u,
        onSelectionChange: f,
        comparePair: l,
        onToggleComparePair: Z,
        costByRunId: E,
        pipelineId: t,
        onNavigate: n,
        onOpenRetryModal: b
      }
    )
  ] }) : /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
    Be,
    {
      icon: "🔍",
      title: "Pipeline not found",
      body: "It may have been deleted. Go back to the pipelines list.",
      actionLabel: "Back to pipelines",
      onAction: () => n("/pipelines")
    }
  ) }) : /* @__PURE__ */ e(ht, { to: "/pipelines", replace: !0 });
}
function pu(t) {
  return q(() => {
    if (!t) return null;
    const n = nt(t.pipelineId);
    if (!n) return null;
    const r = /* @__PURE__ */ new Map();
    for (const i of n.nodes)
      i.data.type === "llm" && r.set(i.id, i.data.model);
    const a = Object.values(t.steps).filter((i) => !!i.llm).map((i) => ({
      model: r.get(i.nodeId),
      tokensIn: i.llm?.tokensIn ?? 0,
      tokensOut: i.llm?.tokensOut ?? 0
    }));
    return xt(a).total;
  }, [t]);
}
function Ge({ title: t, children: n }) {
  return /* @__PURE__ */ o("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ e("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: t }),
    n
  ] });
}
const zr = "m-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", qr = "px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", Sn = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", Te = "px-2 py-[5px] text-[11px] text-text-secondary align-top", uu = {
  "#2563eb": "bg-blue-600/10 text-blue-600",
  "#7c3aed": "bg-violet-600/10 text-violet-600",
  "#16a34a": "bg-green-600/10 text-green-600",
  "#dc2626": "bg-red-600/10 text-red-600"
};
function Ct(t) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${uu[t] ?? ""}`.trimEnd();
}
const mu = {
  completed: "#16a34a",
  failed: "#dc2626",
  running: "#2563eb"
};
function hu({ stepId: t, step: n, index: r, nodeType: a, nodeConfig: i, onRetryFromStep: s, onResumeFromStep: d }) {
  const [c, l] = S(!1), p = n.output, u = p?.response, f = n.llm, h = n.input, x = mu[n.status] ?? "#94a3b8";
  return /* @__PURE__ */ o("div", { className: "relative pl-9 mb-1", children: [
    /* @__PURE__ */ e(
      "div",
      {
        className: "absolute left-[10px] top-[14px] w-3 h-3 rounded-full border-2 border-white z-[1] shadow-[0_0_0_1px_#e2e8f0]",
        style: { background: x }
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        onClick: () => l(!c),
        "aria-expanded": c,
        role: "button",
        tabIndex: 0,
        onKeyDown: (g) => {
          (g.key === "Enter" || g.key === " ") && (g.preventDefault(), l(!c));
        },
        className: I(
          "flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer transition-colors duration-100",
          c ? "bg-[#fafbfc] rounded-t-lg" : "bg-surface rounded-lg"
        ),
        style: {
          border: `1px solid ${c ? x + "40" : "#e2e8f0"}`,
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
              style: { background: x },
              children: n.status
            }
          ),
          /* @__PURE__ */ o("span", { className: "text-[13px] font-semibold text-text-primary", children: [
            r + 1,
            ". ",
            a
          ] }),
          /* @__PURE__ */ e("span", { className: "text-[11px] font-mono text-text-tertiary", children: t.slice(0, 8) }),
          n.durationMs != null && /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary ml-auto", children: n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` }),
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
        style: { border: `1px solid ${x}40` },
        children: [
          /* @__PURE__ */ e(Ge, { title: "Execution Timeline", children: /* @__PURE__ */ o("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ e("th", { scope: "col", className: Sn, children: "Event" }),
              /* @__PURE__ */ e("th", { scope: "col", className: Sn, children: "Time" }),
              /* @__PURE__ */ e("th", { scope: "col", className: Sn, children: "Detail" })
            ] }) }),
            /* @__PURE__ */ o("tbody", { children: [
              n.startedAt && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Te, children: /* @__PURE__ */ e("span", { className: Ct("#2563eb"), children: "started" }) }),
                /* @__PURE__ */ e("td", { className: Te, children: new Date(n.startedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Te, children: [
                  "Node ",
                  t.slice(0, 8),
                  " (",
                  a,
                  ") began execution"
                ] })
              ] }),
              f?.streamOpened && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Te, children: /* @__PURE__ */ e("span", { className: Ct("#7c3aed"), children: "stream.opened" }) }),
                /* @__PURE__ */ e("td", { className: Te, children: "—" }),
                /* @__PURE__ */ e("td", { className: Te, children: "LLM stream connection established" })
              ] }),
              f?.firstTokenLatencyMs != null && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Te, children: /* @__PURE__ */ e("span", { className: Ct("#7c3aed"), children: "first.token" }) }),
                /* @__PURE__ */ o("td", { className: Te, children: [
                  "+",
                  f.firstTokenLatencyMs,
                  "ms"
                ] }),
                /* @__PURE__ */ e("td", { className: Te, children: "First token received from LLM" })
              ] }),
              n.completedAt && n.status === "completed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Te, children: /* @__PURE__ */ e("span", { className: Ct("#16a34a"), children: "completed" }) }),
                /* @__PURE__ */ e("td", { className: Te, children: new Date(n.completedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Te, children: [
                  "Finished in ",
                  n.durationMs != null ? n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` : "—"
                ] })
              ] }),
              n.status === "failed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Te, children: /* @__PURE__ */ e("span", { className: Ct("#dc2626"), children: "failed" }) }),
                /* @__PURE__ */ e("td", { className: Te, children: n.completedAt ? new Date(n.completedAt).toLocaleTimeString() : "—" }),
                /* @__PURE__ */ e("td", { className: Te, children: n.error ?? "Unknown error" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ e(Ge, { title: "Node Configuration", children: i && Object.keys(i).length > 1 ? /* @__PURE__ */ e("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(i).filter(([g]) => g !== "type").map(([g, m]) => /* @__PURE__ */ o(ao.Fragment, { children: [
            /* @__PURE__ */ e("span", { className: "text-text-tertiary font-medium", children: g }),
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
          ] }, g)) }) : /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary italic", children: "No configuration" }) }),
          h && Object.keys(h).length > 0 && /* @__PURE__ */ e(Ge, { title: "Runtime Input", children: /* @__PURE__ */ e("pre", { className: zr, children: JSON.stringify(h, null, 2) }) }),
          f?.prompt && /* @__PURE__ */ e(Ge, { title: "Resolved Prompt", children: /* @__PURE__ */ e("div", { className: qr, children: f.prompt }) }),
          u || f?.response ? /* @__PURE__ */ e(Ge, { title: "Response", children: /* @__PURE__ */ e("div", { className: qr, children: u ?? f?.response }) }) : /* @__PURE__ */ e(Ge, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ e("pre", { className: zr, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
          (f || p?.tokensIn != null) && /* @__PURE__ */ e(Ge, { title: "Token Usage", children: /* @__PURE__ */ o("div", { className: "flex gap-5 flex-wrap text-xs text-text-secondary", children: [
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
          n.error && /* @__PURE__ */ e(Ge, { title: "Error", children: /* @__PURE__ */ e("div", { className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap", children: n.error }) }),
          (s || d) && /* @__PURE__ */ o("div", { className: "px-4 py-2.5 border-t border-border flex justify-end gap-2", children: [
            d && /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                "data-testid": `resume-from-step-${t}`,
                onClick: (g) => {
                  g.stopPropagation(), d(t);
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
                onClick: (g) => {
                  g.stopPropagation(), s(t);
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
function fu({ steps: t, nodeDataMap: n, edges: r, onRetryFromStep: a, onResumeFromStep: i }) {
  const s = q(() => {
    const l = Object.entries(t).sort(([, b], [, k]) => {
      const C = b.completedAt ? Date.parse(b.completedAt) - (b.durationMs ?? 0) : 0, A = k.completedAt ? Date.parse(k.completedAt) - (k.durationMs ?? 0) : 0;
      return C - A;
    });
    if (!r || r.length === 0)
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
      const k = p(b), C = n[k]?.type;
      C && u.has(C) && f.add(k);
    }
    const h = (b) => b.startsWith("branch-") || b === "true" || b === "false" || b === "approved" || b === "rejected", x = [];
    for (const b of r)
      f.has(b.source) && h(b.sourceHandle) && x.push({ forkId: b.source, branch: b.sourceHandle, targetNodeId: b.target });
    const g = /* @__PURE__ */ new Map();
    for (const b of r)
      g.has(b.source) || g.set(b.source, []), g.get(b.source).push({ target: b.target, handle: b.sourceHandle });
    const m = /* @__PURE__ */ new Set();
    function N(b) {
      const k = [];
      let C = b;
      for (; C; ) {
        const A = l.find(([W]) => p(W) === C && !m.has(W));
        if (!A) break;
        const [$, T] = A;
        m.add($);
        const M = { stepId: $, step: T, children: [] }, R = p($);
        if (f.has(R)) {
          const W = x.filter((ae) => ae.forkId === R);
          for (const { branch: ae, targetNodeId: Z } of W) {
            const oe = N(Z);
            for (const O of oe)
              O.branch = O.branch ?? ae;
            oe.length > 0 && (oe[0].branch = ae, M.children.push(...oe));
          }
        }
        k.push(M);
        const j = g.get(R)?.filter((W) => W.handle === "out");
        C = j && j.length === 1 ? j[0].target : null;
      }
      return k;
    }
    const v = /* @__PURE__ */ new Set();
    for (const b of r)
      v.add(b.target);
    const y = l.find(([b]) => !v.has(p(b)))?.[1] ? l.find(([b]) => !v.has(p(b)))[0] : l[0]?.[0];
    let w = [];
    y && (w = N(p(y)));
    for (const [b, k] of l)
      m.has(b) || w.push({ stepId: b, step: k, children: [] });
    return w;
  }, [t, n, r]), d = (l) => {
    if (n[l]) return n[l];
    const p = l.lastIndexOf(":");
    if (p > 0 && /^\d+$/.test(l.slice(p + 1)))
      return n[l.slice(0, p)];
  };
  function c(l, p) {
    let u = p;
    return l.map((f) => {
      const h = u++, x = /* @__PURE__ */ new Map();
      for (const g of f.children) {
        const m = g.branch ?? "default";
        x.has(m) || x.set(m, []), x.get(m).push(g);
      }
      return /* @__PURE__ */ o(ao.Fragment, { children: [
        /* @__PURE__ */ e(
          hu,
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
        f.children.length > 0 && /* @__PURE__ */ e("div", { className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1", children: Array.from(x.entries()).map(([g, m], N) => /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("div", { className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${N === 0 ? "mt-1" : "mt-2"}`, children: g.replace("-", " ") }),
          c(m, u)
        ] }, g)) })
      ] }, f.stepId);
    });
  }
  return /* @__PURE__ */ o("div", { className: "relative", children: [
    /* @__PURE__ */ e("div", { className: "absolute left-[15px] top-6 bottom-6 w-0.5 bg-border rounded-sm" }),
    c(s, 0)
  ] });
}
const xu = 5e3, gu = "synthetic-";
function bu(t) {
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
function _n(t, n) {
  return n.timestamp.localeCompare(t.timestamp);
}
function yu(t, n) {
  if (n.length === 0) return t.slice().sort(_n);
  const r = new Set(t.map((s) => s.auditId)), a = /* @__PURE__ */ new Map();
  for (const s of t) {
    const d = a.get(s.action);
    (!d || s.timestamp > d) && a.set(s.action, s.timestamp);
  }
  const i = n.filter((s) => {
    if (r.has(s.auditId)) return !1;
    const d = a.get(s.action);
    return !d || s.timestamp >= d;
  });
  return [...t, ...i].sort(_n);
}
function vu(t, n, r = {}) {
  const { pollMs: a = xu, filters: i } = r, s = Na(), [d, c] = S([]), [l, p] = S([]), [u, f] = S(!0), [h, x] = S(null), [g, m] = S(void 0), [N, v] = S(0), [y, w] = S(!1), b = JSON.stringify({
    since: i?.since,
    until: i?.until,
    actions: i?.actions,
    limit: i?.limit
  });
  ee(() => {
    if (!t || !n) return;
    let T = !1;
    return f(!0), x(null), (async () => {
      try {
        const M = await Yn(t, n, i ?? {});
        if (T) return;
        c(M.items), m(M.nextCursor), f(!1);
      } catch (M) {
        if (T) return;
        x(M instanceof Error ? M.message : String(M)), f(!1);
      }
    })(), () => {
      T = !0;
    };
  }, [t, n, b, N]), ee(() => {
    if (!t || !n || a <= 0) return;
    const T = window.setInterval(() => {
      v((M) => M + 1);
    }, a);
    return () => window.clearInterval(T);
  }, [t, n, a]), ee(() => {
    if (!t || !n) return;
    const T = [], M = (j, W) => {
      const ae = bu(j);
      if (!ae) return;
      const Z = W;
      if (Z.runId !== n) return;
      w(!0);
      const oe = {
        auditId: `${gu}${j}-${Z.stepId ?? "run"}-${Date.now()}`,
        timestamp: Z.at ?? (/* @__PURE__ */ new Date()).toISOString(),
        action: ae,
        actorUserId: "executor",
        pipelineId: t,
        runId: n,
        trace: W
      };
      p((O) => [oe, ...O]);
    }, R = [
      "pipeline.step.started",
      "pipeline.step.completed",
      "pipeline.step.failed",
      "pipeline.step.breakpoint",
      "pipeline.run.completed",
      "pipeline.run.failed",
      "pipeline.run.resumed-from-step",
      "pipeline.approval.recorded"
    ];
    for (const j of R)
      T.push(s.subscribe(j, (W) => M(j, W)));
    return T.push(s.subscribeToRun(n)), () => {
      for (const j of T) j();
    };
  }, [s, t, n]), ee(() => {
    d.length !== 0 && p((T) => {
      if (T.length === 0) return T;
      const M = /* @__PURE__ */ new Map();
      for (const R of d) {
        const j = M.get(R.action);
        (!j || R.timestamp > j) && M.set(R.action, R.timestamp);
      }
      return T.filter((R) => {
        const j = M.get(R.action);
        return !j || R.timestamp >= j;
      });
    });
  }, [d]);
  const k = ie(!1), C = D(() => {
    !t || !n || !g || k.current || (k.current = !0, (async () => {
      try {
        const T = await Yn(t, n, {
          ...i ?? {},
          cursor: g
        });
        c((M) => {
          const R = new Set(M.map((W) => W.auditId)), j = M.concat(T.items.filter((W) => !R.has(W.auditId)));
          return j.sort(_n), j;
        }), m(T.nextCursor);
      } catch (T) {
        x(T instanceof Error ? T.message : String(T));
      } finally {
        k.current = !1;
      }
    })());
  }, [t, n, g, b]), A = D(() => {
    v((T) => T + 1);
  }, []);
  return {
    items: q(() => yu(d, l), [d, l]),
    loading: u,
    error: h,
    hasMore: !!g,
    loadMore: C,
    liveHealthy: y,
    refresh: A
  };
}
const Nu = "#3b82f6", wu = "#eab308", ku = "#f97316", Vr = "#64748b", Cu = "#ef4444", Iu = "#a855f7";
function Su(t) {
  return t.action === "pipeline.step.failed" || t.outcome === "error" ? Cu : t.action === "pipeline.run.resumed-from-step" || t.action.startsWith("pipeline.step.context.patched") ? Iu : t.action.startsWith("pipeline.approval.") ? wu : t.action.startsWith("pipeline.breakpoint.") ? ku : t.action.startsWith("pipeline.step.") ? Nu : (t.action.startsWith("pipeline.run."), Vr);
}
const $u = {
  "1h": "Last 1h",
  "24h": "Last 24h",
  all: "All"
}, Wr = [
  { label: "Steps", matches: (t) => t.startsWith("pipeline.step.") },
  { label: "Approvals", matches: (t) => t.startsWith("pipeline.approval.") || t === "pipeline.approve" || t === "pipeline.reject" },
  { label: "Breakpoints", matches: (t) => t.startsWith("pipeline.breakpoint.") || t === "pipeline.step.breakpoint.hit" },
  { label: "Run lifecycle", matches: (t) => t.startsWith("pipeline.run.") || t === "pipeline.trigger" || t === "pipeline.cancel" },
  { label: "Errors", matches: (t) => t === "pipeline.step.failed" || t === "pipeline.run.failed" || t === "pipeline.force_fail" }
];
function Tu(t) {
  if (t === "all") return null;
  const n = Date.now();
  return t === "1h" ? n - 3600 * 1e3 : n - 1440 * 60 * 1e3;
}
function Jr(t) {
  const n = t.details, r = t.trace, a = n && typeof n.stepId == "string" ? n.stepId : void 0, i = r && typeof r.stepId == "string" ? r.stepId : void 0, s = r && typeof r.nodeId == "string" ? r.nodeId : void 0;
  return a ?? i ?? s;
}
function Au(t, n = Date.now()) {
  const r = Date.parse(t);
  if (!Number.isFinite(r)) return t;
  const a = Math.max(0, Math.floor((n - r) / 1e3));
  if (a < 5) return "just now";
  if (a < 60) return `${a}s ago`;
  const i = Math.floor(a / 60);
  if (i < 60) return `${i}m ago`;
  const s = Math.floor(i / 60);
  return s < 24 ? `${s}h ago` : `${Math.floor(s / 24)}d ago`;
}
function Ru({
  pipelineId: t,
  runId: n,
  onStepClick: r
}) {
  const a = vu(t, n), { items: i, error: s, hasMore: d, loadMore: c, loading: l } = a, [p, u] = S(/* @__PURE__ */ new Set()), [f, h] = S(""), [x, g] = S("all"), [m, N] = S(/* @__PURE__ */ new Set()), v = D((C) => {
    u((A) => {
      const $ = new Set(A);
      return $.has(C) ? $.delete(C) : $.add(C), $;
    });
  }, []), y = D((C) => {
    N((A) => {
      const $ = new Set(A);
      return $.has(C) ? $.delete(C) : $.add(C), $;
    });
  }, []), w = q(() => {
    const C = Tu(x), A = f.trim().toLowerCase(), $ = Wr.filter((T) => p.has(T.label));
    return i.filter((T) => {
      if ($.length > 0 && !$.some((M) => M.matches(T.action)) || A && !T.actorUserId.toLowerCase().includes(A)) return !1;
      if (C !== null) {
        const M = Date.parse(T.timestamp);
        if (!Number.isFinite(M) || M < C) return !1;
      }
      return !0;
    });
  }, [i, p, f, x]), b = D(() => {
    if (typeof window > "u") return;
    const C = w.map((M) => JSON.stringify(M)).join(`
`) + (w.length > 0 ? `
` : ""), A = new Blob([C], { type: "application/x-ndjson" }), $ = URL.createObjectURL(A), T = document.createElement("a");
    T.href = $, T.download = `executor-log-${n}.ndjson`, document.body.appendChild(T), T.click(), document.body.removeChild(T), URL.revokeObjectURL($);
  }, [w, n]), k = D(
    (C) => {
      if (y(C.auditId), !r || !C.action.startsWith("pipeline.step.")) return;
      const A = Jr(C);
      A && r(A);
    },
    [r, y]
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
          Wr.map((C) => {
            const A = p.has(C.label);
            return /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  A ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => v(C.label),
                "data-testid": `executor-log-chip-${C.label.toLowerCase().replace(/\s+/g, "-")}`,
                "aria-pressed": A,
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
            const A = x === C;
            return /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  A ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => g(C),
                "data-testid": `executor-log-time-${C}`,
                "aria-pressed": A,
                children: $u[C]
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
            const A = m.has(C.auditId), T = C.action.startsWith("pipeline.step.") ? Jr(C) : void 0;
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
                      style: { background: Su(C) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: C.timestamp,
                      children: Au(C.timestamp)
                    }
                  ),
                  /* @__PURE__ */ e("span", { className: "text-text-secondary text-[11px] whitespace-nowrap", children: C.actorUserId }),
                  /* @__PURE__ */ o("span", { className: "text-text-primary flex items-baseline gap-1.5 flex-wrap", children: [
                    /* @__PURE__ */ e("code", { className: "font-mono text-[11px] bg-[#fafbfc] px-1.5 py-px rounded-[3px]", children: C.action }),
                    T && /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", "data-testid": "executor-log-stepid", children: [
                      "· ",
                      T.slice(0, 14),
                      T.length > 14 ? "…" : ""
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
                  A && C.trace && /* @__PURE__ */ e(
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
function fh() {
  const { pipelineId: t, runId: n } = mt();
  return !t || !n ? /* @__PURE__ */ e(ht, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(po, { pipelineId: t, children: /* @__PURE__ */ e(oa, { children: /* @__PURE__ */ e(Pu, { pipelineId: t, runId: n }) }) });
}
function Pu({ pipelineId: t, runId: n }) {
  const r = Oe(), a = qe(), i = ft(), { definition: s } = a, [d, c] = S(null);
  ee(() => {
    let F = !1;
    return import("./PipelineEditorServicesContext-CTTNH5_Y.js").then((se) => se.X).then(({ getPipelineRun: se }) => {
      se(t, n).then((ye) => {
        !F && ye && c(ye);
      });
    }), () => {
      F = !0;
    };
  }, [t, n]);
  const l = q(() => {
    const F = i.runs[n], se = d;
    if (!F && !se) return;
    if (!F) return se ?? void 0;
    if (!se) return F;
    const ye = Object.keys(F.steps).length, Me = Object.keys(se.steps).length;
    return ye >= Me ? F : { ...se, status: F.status, currentStepIds: F.currentStepIds };
  }, [i.runs, n, d]);
  aa(n);
  const p = pu(l ?? null), u = q(() => {
    const F = {};
    if (!s) return F;
    for (const se of s.nodes)
      F[se.id] = { type: se.data.type, data: se.data };
    return F;
  }, [s]), [f, h] = S(!1), x = ie(null);
  ut(x, () => h(!1), f);
  const [g, m] = S("steps"), [N, v] = S(null), y = D((F) => {
    v(F), m("steps");
  }, []), [w, b] = S(null), [k, C] = S(null), [A, $] = S(!1), T = l?.status === "failed" ? l.error?.nodeId : void 0, M = D((F) => {
    if (!l) return;
    const se = Object.entries(l.steps).filter(([ye, Me]) => ye !== F && Me.status === "completed").map(([ye]) => ye);
    b({ nodeId: F, skippedNodes: se, snapshotInput: !1 }), C(null);
  }, [l]), R = D(async () => {
    if (!(!w || !l)) {
      C(null), $(!0);
      try {
        const F = await mo(
          t,
          l.id,
          w.nodeId,
          void 0,
          w.snapshotInput || void 0
        );
        b(null), r(`/pipelines/${t}/runs/${F.newRunId}`);
      } catch (F) {
        C(F instanceof Error ? F.message : String(F)), $(!1);
      }
    }
  }, [w, l, t, r]), [j, W] = S(null), [ae, Z] = S(null), [oe, O] = S(null), E = D(async (F) => {
    if (l) {
      Z(null), W(F);
      try {
        const se = await ia(t, l.id, F);
        O(
          `Resumed from ${F.slice(0, 10)}${F.length > 10 ? "…" : ""} (replay #${se.replayAttempts})`
        ), setTimeout(() => O(null), 4e3), r(`/pipelines/${t}/runs/${l.id}`);
      } catch (se) {
        Z(se instanceof Error ? se.message : String(se));
      } finally {
        W(null);
      }
    }
  }, [l, t, r]), H = D(async () => {
    if (!l) {
      try {
        const F = await i.triggerRun(t);
        r(`/pipelines/${t}/runs/${F}`);
      } catch (F) {
        console.error("[PipelineRunReplay] re-run failed", F);
      }
      return;
    }
    try {
      const F = await i.triggerRun(
        t,
        l.triggeredBy.payload
      );
      r(`/pipelines/${t}/runs/${F}`);
    } catch (F) {
      console.error("[PipelineRunReplay] re-run failed", F);
    }
  }, [l, i, t, r]), J = async () => {
    h(!1);
    try {
      await navigator.clipboard?.writeText(n);
    } catch {
    }
  }, L = () => {
    if (h(!1), !l) return;
    const F = JSON.stringify(l, null, 2);
    Rt(`run-${n}.json`, F);
  }, z = () => {
    if (h(!1), !s) return;
    const F = Ln(
      s.id,
      `${s.name} (from run)`
    );
    F && r(`/pipelines/${F.id}`);
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
              Tt,
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
  const V = Jn(l.status), K = l.triggeredBy.userId ?? l.triggeredBy.triggerType, de = Lt(p);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
      "data-testid": "pipeline-replay",
      children: [
        /* @__PURE__ */ o("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
          /* @__PURE__ */ e(
            Tt,
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
                pt(l.startedAt),
                " by ",
                K
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
                de
              ]
            }
          ),
          /* @__PURE__ */ e(ce, { tone: V.tone, "aria-label": `Status: ${V.label}`, children: V.label }),
          l.status === "failed" && l.error?.errorCategory ? /* @__PURE__ */ e(
            ce,
            {
              tone: "danger",
              title: l.error.message || "Error details unavailable",
              children: l.error.errorCategory
            }
          ) : null,
          /* @__PURE__ */ e("div", { className: "flex-1" }),
          T && /* @__PURE__ */ e(
            Ee,
            {
              onClick: () => M(T),
              disabled: A,
              "data-testid": "retry-from-failed-step-button",
              title: `Retry from "${T}" with the original upstream context`,
              children: "↻ Retry from failure"
            }
          ),
          /* @__PURE__ */ e(
            Ee,
            {
              onClick: H,
              "data-testid": "rerun-button",
              title: "Re-run with the original trigger payload",
              children: "↻ Re-run"
            }
          ),
          /* @__PURE__ */ o("div", { className: "relative", ref: x, children: [
            /* @__PURE__ */ e(
              Tt,
              {
                onClick: () => h((F) => !F),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            f ? /* @__PURE__ */ o("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: J, children: "Copy runId" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: L, children: "Export run JSON" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: z, children: "Open as new draft" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ e(
          Zt,
          {
            open: w !== null,
            onConfirm: R,
            onCancel: () => {
              A || b(null);
            },
            title: "Retry from step",
            confirmLabel: A ? "Starting…" : "Confirm retry",
            confirmDisabled: A,
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
                /* @__PURE__ */ e("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: w.skippedNodes.map((F) => /* @__PURE__ */ e("span", { className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary", children: F.slice(0, 10) }, F)) })
              ] }),
              /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
                /* @__PURE__ */ e(
                  "input",
                  {
                    type: "checkbox",
                    checked: w.snapshotInput,
                    onChange: (F) => b((se) => se && { ...se, snapshotInput: F.target.checked }),
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
          k && /* @__PURE__ */ e(tt, { title: "Retry failed:", className: "mb-4", children: k }),
          ae && /* @__PURE__ */ e(tt, { title: "Resume failed:", className: "mb-4", "data-testid": "resume-error-banner", children: ae }),
          (l.replayAttempts ?? 0) > 0 && /* @__PURE__ */ e(
            tt,
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
                    pt(l.resumeHistory[l.resumeHistory.length - 1].at),
                    "."
                  ] })
                ] }),
                l.resumeHistory && l.resumeHistory.length > 1 && /* @__PURE__ */ e(
                  "ol",
                  {
                    className: "m-0 pl-[18px] text-[11px] text-text-tertiary leading-relaxed",
                    "data-testid": "resume-history-timeline",
                    children: l.resumeHistory.map((F, se) => /* @__PURE__ */ o("li", { children: [
                      "from ",
                      /* @__PURE__ */ e("code", { children: F.fromNodeId.slice(0, 12) }),
                      " at ",
                      pt(F.at)
                    ] }, `${F.fromNodeId}-${F.at}-${se}`))
                  }
                )
              ] })
            }
          ),
          oe && /* @__PURE__ */ e(tt, { title: "Resumed", className: "mb-4", "data-testid": "resume-toast", children: oe }),
          l.error && /* @__PURE__ */ o(tt, { title: "Run failed:", className: "mb-4", children: [
            l.error.message,
            l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o("span", { className: "ml-2 text-[11px] text-[#b91c1c]", children: [
              "at node ",
              l.error.nodeId.slice(0, 8)
            ] }),
            l.status === "failed" && l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ e("div", { className: "mt-2", children: /* @__PURE__ */ e(
              Ee,
              {
                onClick: () => E(l.error.nodeId),
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
              ].map((F) => {
                const se = g === F.id;
                return /* @__PURE__ */ e(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": se,
                    onClick: () => m(F.id),
                    "data-testid": `run-replay-tab-${F.id}`,
                    className: I(
                      "font-[inherit] text-[13px] font-semibold py-1.5 px-3.5 border-none bg-transparent cursor-pointer -mb-px",
                      se ? "text-text-primary border-b-2 border-b-primary" : "text-text-tertiary border-b-2 border-b-transparent"
                    ),
                    children: F.label
                  },
                  F.id
                );
              })
            }
          ),
          g === "steps" ? (
            /* Threaded step list with fork nesting */
            /* @__PURE__ */ e(
              fu,
              {
                steps: l.steps,
                nodeDataMap: u,
                edges: s?.edges,
                onRetryFromStep: M,
                onResumeFromStep: l.status === "failed" ? E : void 0
              }
            )
          ) : /* @__PURE__ */ e("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ e(
            Ru,
            {
              pipelineId: t,
              runId: n,
              onStepClick: y
            }
          ) })
        ] }) })
      ]
    }
  );
}
function Mu(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${ke(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function Eu(t) {
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
function Du(t, n) {
  if (!t) return n;
  const r = t.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Ou(t, n) {
  if (!t) return !1;
  const r = t.nodes.find((a) => a.id === n);
  return !!r && r.data.type === "condition";
}
function Hr(t) {
  if (!t) return;
  const n = t.output;
  if (n && typeof n == "object" && "result" in n)
    return n.result ? "true" : "false";
}
function _u(t, n) {
  const r = (h) => h.split(/(\s+)/).filter((x) => x.length > 0), a = r(t), i = r(n), s = a.length, d = i.length, c = Array.from({ length: s + 1 }, () => new Array(d + 1).fill(0));
  for (let h = s - 1; h >= 0; h--)
    for (let x = d - 1; x >= 0; x--)
      a[h] === i[x] ? c[h][x] = c[h + 1][x + 1] + 1 : c[h][x] = Math.max(c[h + 1][x], c[h][x + 1]);
  const l = [], p = (h, x) => {
    const g = l[l.length - 1];
    g && g.type === h ? g.text += x : l.push({ type: h, text: x });
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
function Lu(t, n, r) {
  const a = /* @__PURE__ */ new Set(), i = [];
  if (r)
    for (const s of r.nodes)
      (t.steps[s.id] || n.steps[s.id]) && (i.push(s.id), a.add(s.id));
  for (const s of [...Object.keys(t.steps), ...Object.keys(n.steps)])
    a.has(s) || (i.push(s), a.add(s));
  return i.map((s) => {
    const d = t.steps[s], c = n.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, f = !!d && !!c && d.status !== c.status;
    let h = !1;
    l != null && p != null && l > 0 && (h = Math.abs(p - l) / l > 0.5);
    const x = Ou(r, s), g = x ? Hr(d) : void 0, m = x ? Hr(c) : void 0, N = x && g !== void 0 && m !== void 0 && g !== m;
    return {
      nodeId: s,
      name: Du(r, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: f,
      durationLarge: h,
      branchDiffers: N,
      isLlm: !!(d?.llm || c?.llm),
      isCondition: x,
      branchA: g,
      branchB: m
    };
  });
}
function Bu(t) {
  if (t.statusDiffers) return "bg-[#fef2f2]";
  if (t.branchDiffers) return "bg-[#eff6ff]";
  if (t.durationLarge) return "bg-[#fffbeb]";
}
function Kr({
  step: t,
  branch: n,
  isCondition: r
}) {
  if (!t)
    return /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" });
  const a = Eu(t.status);
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(ce, { tone: a, children: t.status }),
      /* @__PURE__ */ e("span", { className: "font-mono text-text-secondary", children: ke(t.durationMs) }),
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
function Uu({ a: t, b: n }) {
  const r = q(() => _u(t, n), [t, n]);
  return /* @__PURE__ */ e(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: r.map((a, i) => a.type === "eq" ? /* @__PURE__ */ e("span", { children: a.text }, i) : a.type === "add" ? /* @__PURE__ */ e("span", { "data-diff": "add", className: "bg-[#dcfce7] text-[#166534]", children: a.text }, i) : /* @__PURE__ */ e("span", { "data-diff": "del", className: "bg-[#fee2e2] text-[#991b1b] line-through", children: a.text }, i))
    }
  );
}
function Fu({ row: t }) {
  const n = t.a?.llm, r = t.b?.llm, a = n && r ? r.tokensIn + r.tokensOut - (n.tokensIn + n.tokensOut) : void 0, i = Bu(t);
  return /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ o("tr", { "data-testid": `run-compare-row-${t.nodeId}`, className: i, children: [
      /* @__PURE__ */ o("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-text-primary", children: t.name }),
        /* @__PURE__ */ e("div", { className: "font-mono text-[11px] text-text-tertiary", children: t.nodeId })
      ] }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ e(Kr, { step: t.a, branch: t.branchA, isCondition: t.isCondition }) }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ e(Kr, { step: t.b, branch: t.branchB, isCondition: t.isCondition }) }),
      /* @__PURE__ */ o(
        "td",
        {
          className: I("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", i),
          "data-testid": `run-compare-delta-${t.nodeId}`,
          children: [
            t.branchDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#2563eb]", children: "different branch!" }) : t.statusDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#dc2626]", children: "status differs" }) : t.durationDelta != null ? /* @__PURE__ */ e("span", { className: t.durationLarge ? "text-[#d97706]" : "text-text-secondary", children: Mu(t.durationDelta) }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "—" }),
            a != null && a !== 0 ? /* @__PURE__ */ o("div", { className: "mt-0.5 text-[11px] text-text-tertiary", children: [
              a > 0 ? "+" : "",
              a,
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
          Uu,
          {
            a: n?.response ?? "",
            b: r?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function ju({ runA: t, runB: n, def: r }) {
  const a = q(() => Lu(t, n, r), [t, n, r]);
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
        /* @__PURE__ */ e("tbody", { children: a.map((i) => /* @__PURE__ */ e(Fu, { row: i }, i.nodeId)) })
      ]
    }
  );
}
function zu(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${ke(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function qu(t) {
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
function Vu(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Gr(t, n) {
  const r = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
    model: n.get(a.nodeId),
    tokensIn: a.llm?.tokensIn ?? 0,
    tokensOut: a.llm?.tokensOut ?? 0
  }));
  return Lt(xt(r).total);
}
function Yr({
  label: t,
  run: n,
  cost: r,
  testIdPrefix: a
}) {
  const i = qu(n.status);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
      "data-testid": `${a}-summary`,
      children: [
        /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: t }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-tertiary", children: n.id.slice(0, 8) }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "text-text-secondary", children: pt(n.startedAt) })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(ce, { tone: i, children: n.status }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", children: ke(n.durationMs) }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", "data-testid": `${a}-cost`, children: r })
        ] })
      ]
    }
  );
}
function xh() {
  const { pipelineId: t, runIdA: n, runIdB: r } = mt(), a = Oe(), i = q(
    () => t ? nt(t) : null,
    [t]
  ), s = q(
    () => t && n ? Qt(t, n) : null,
    [t, n]
  ), d = q(
    () => t && r ? Qt(t, r) : null,
    [t, r]
  ), c = q(() => Vu(i), [i]);
  if (!t || !n || !r)
    return /* @__PURE__ */ e(ht, { to: "/pipelines", replace: !0 });
  if (!i)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      Be,
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
      Be,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable — they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => a(`/pipelines/${t}/runs`)
      }
    ) });
  const l = (d.durationMs ?? 0) - (s.durationMs ?? 0), p = Gr(s, c), u = Gr(d, c), f = (/* @__PURE__ */ new Set([
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
      /* @__PURE__ */ e(Yr, { label: "Run A", run: s, cost: p, testIdPrefix: "run-a" }),
      /* @__PURE__ */ e(Yr, { label: "Run B", run: d, cost: u, testIdPrefix: "run-b" })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
        "data-testid": "run-compare-delta",
        children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Δ duration" }),
          /* @__PURE__ */ e("span", { className: "font-mono text-[13px]", children: zu(l) }),
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
    /* @__PURE__ */ e(ju, { runA: s, runB: d, def: i })
  ] });
}
function Wu(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${ke(Math.abs(t))}`;
}
function Xr(t) {
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
function Ju({
  runA: t,
  runB: n,
  costA: r,
  costB: a
}) {
  const i = t.durationMs ?? 0, d = (n.durationMs ?? 0) - i;
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
              /* @__PURE__ */ e(ce, { tone: Xr(t.status), children: t.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: pt(t.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              ke(t.durationMs),
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
              /* @__PURE__ */ e(ce, { tone: Xr(n.status), children: n.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: pt(n.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              ke(n.durationMs),
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
          /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Duration delta" }),
          /* @__PURE__ */ e(
            "span",
            {
              className: I(
                "font-mono text-sm font-bold",
                d === 0 ? "text-text-secondary" : d < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
              ),
              children: Wu(d)
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
function Hu(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${ke(Math.abs(t))}`;
}
function Qr(t) {
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
function Ku(t, n) {
  if (!t) return n;
  const r = t.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Gu(t, n, r) {
  const a = /* @__PURE__ */ new Set(), i = [];
  if (r)
    for (const s of r.nodes)
      (t.steps[s.id] || n.steps[s.id]) && (i.push(s.id), a.add(s.id));
  for (const s of [...Object.keys(t.steps), ...Object.keys(n.steps)])
    a.has(s) || (i.push(s), a.add(s));
  return i.map((s) => {
    const d = t.steps[s], c = n.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, f = !!d && !!c && d.status !== c.status, h = !!d && !c, x = !d && !!c, g = d?.llm ? d.llm.tokensIn + d.llm.tokensOut : void 0, m = c?.llm ? c.llm.tokensIn + c.llm.tokensOut : void 0, N = g != null && m != null ? m - g : void 0;
    return {
      nodeId: s,
      name: Ku(r, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: f,
      onlyInA: h,
      onlyInB: x,
      tokenDelta: N
    };
  });
}
function Yu({ runA: t, runB: n, def: r }) {
  const a = q(() => Gu(t, n, r), [t, n, r]);
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
            i.onlyInA && /* @__PURE__ */ e(ce, { tone: "warning", size: "xs", children: "only in A" }),
            i.onlyInB && /* @__PURE__ */ e(ce, { tone: "warning", size: "xs", children: "only in B" })
          ] }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: i.a ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(ce, { tone: Qr(i.a.status), children: i.a.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: ke(i.a.durationMs) }),
            i.a.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              i.a.llm.tokensIn,
              " in / ",
              i.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: i.b ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(ce, { tone: Qr(i.b.status), children: i.b.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: ke(i.b.durationMs) }),
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
                children: Hu(i.durationDelta)
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
function Xu(t, n) {
  if (!t) return n;
  const r = t.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function en(t, n = "", r = 0) {
  const a = /* @__PURE__ */ new Map();
  if (r > 6 || t == null)
    return a.set(n || "(root)", String(t)), a;
  if (typeof t != "object")
    return a.set(n || "(root)", JSON.stringify(t)), a;
  if (Array.isArray(t)) {
    if (t.length === 0)
      a.set(n || "(root)", "[]");
    else
      for (let s = 0; s < t.length; s++) {
        const d = n ? `${n}.${s}` : String(s);
        for (const [c, l] of en(t[s], d, r + 1))
          a.set(c, l);
      }
    return a;
  }
  const i = Object.entries(t);
  if (i.length === 0)
    a.set(n || "(root)", "{}");
  else
    for (const [s, d] of i) {
      const c = n ? `${n}.${s}` : s;
      for (const [l, p] of en(d, c, r + 1))
        a.set(l, p);
    }
  return a;
}
function _o(t, n) {
  const r = en(t), a = en(n), i = /* @__PURE__ */ new Set([...r.keys(), ...a.keys()]), s = [];
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
const Qu = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function Zu({
  nodeId: t,
  name: n,
  outputA: r,
  outputB: a
}) {
  const [i, s] = S(!1), d = q(() => _o(r, a), [r, a]), c = d.filter((l) => l.type !== "unchanged").length;
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
            onClick: () => s(!i),
            children: [
              /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: i ? "▼" : "▶" }),
              /* @__PURE__ */ e("span", { className: "text-xs font-semibold", children: n }),
              /* @__PURE__ */ e("span", { className: "font-mono text-[10px] text-text-tertiary", children: t }),
              /* @__PURE__ */ o(ce, { tone: "warning", size: "xs", className: "ml-auto", children: [
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
              Qu[l.type]
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
function em({ runA: t, runB: n, def: r }) {
  const a = q(() => {
    const i = /* @__PURE__ */ new Set(), s = [];
    if (r)
      for (const d of r.nodes) {
        const c = t.steps[d.id]?.output != null, l = n.steps[d.id]?.output != null;
        (c || l) && (s.push(d.id), i.add(d.id));
      }
    for (const d of [...Object.keys(t.steps), ...Object.keys(n.steps)]) {
      if (i.has(d)) continue;
      const c = t.steps[d]?.output != null, l = n.steps[d]?.output != null;
      (c || l) && (s.push(d), i.add(d));
    }
    return s;
  }, [t, n, r]);
  return a.length === 0 ? /* @__PURE__ */ e("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "No step outputs to compare." }) : /* @__PURE__ */ e("div", { className: "flex flex-col gap-3", children: a.map((i) => /* @__PURE__ */ e(
    Zu,
    {
      nodeId: i,
      name: Xu(r, i),
      outputA: t.steps[i]?.output,
      outputB: n.steps[i]?.output
    },
    i
  )) });
}
function tm(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Zr(t, n) {
  const r = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
    model: n.get(a.nodeId),
    tokensIn: a.llm?.tokensIn ?? 0,
    tokensOut: a.llm?.tokensOut ?? 0
  }));
  return Lt(xt(r).total);
}
function Gt({
  title: t,
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
              /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary", children: s ? "▼" : "▶" }),
              /* @__PURE__ */ e("span", { className: "text-[13px] font-bold text-text-primary", children: t }),
              r && /* @__PURE__ */ e(ce, { tone: "info", className: "ml-auto", children: r })
            ]
          }
        ),
        s && /* @__PURE__ */ e("div", { className: "p-4", children: a })
      ]
    }
  );
}
const nm = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function rm({
  runA: t,
  runB: n
}) {
  const r = q(
    () => _o(t.context, n.context),
    [t.context, n.context]
  ), a = r.filter((i) => i.type !== "unchanged").length;
  return /* @__PURE__ */ e(
    Gt,
    {
      title: "Context evolution diff",
      defaultOpen: !1,
      badge: a > 0 ? `${a} difference${a === 1 ? "" : "s"}` : void 0,
      testId: "diff-context-section",
      children: a === 0 ? /* @__PURE__ */ e("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "Final contexts are identical." }) : /* @__PURE__ */ e("div", { className: "flex flex-col gap-0.5", children: r.map((i, s) => /* @__PURE__ */ o(
        "div",
        {
          className: I(
            "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
            nm[i.type]
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
function om({ pipelineId: t, runIdA: n, runIdB: r }) {
  const a = Oe(), i = q(
    () => nt(t),
    [t]
  ), s = q(
    () => Qt(t, n),
    [t, n]
  ), d = q(
    () => Qt(t, r),
    [t, r]
  ), c = q(() => tm(i), [i]);
  if (!i)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      Be,
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
      Be,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable -- they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => a(`/pipelines/${t}/runs`)
      }
    ) });
  const l = Zr(s, c), p = Zr(d, c);
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
            n.slice(0, 8),
            " vs ",
            r.slice(0, 8)
          ] })
        ] }),
        /* @__PURE__ */ e(Gt, { title: "Summary", testId: "diff-summary-section", children: /* @__PURE__ */ e(
          Ju,
          {
            runA: s,
            runB: d,
            costA: l,
            costB: p
          }
        ) }),
        /* @__PURE__ */ e(
          Gt,
          {
            title: "Step-by-step comparison",
            badge: `${Object.keys(s.steps).length + Object.keys(d.steps).length > 0 ? "steps" : "0 steps"}`,
            testId: "diff-steps-section",
            children: /* @__PURE__ */ e(Yu, { runA: s, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ e(
          Gt,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ e(em, { runA: s, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ e(rm, { runA: s, runB: d })
      ]
    }
  );
}
function gh() {
  const { pipelineId: t } = mt(), [n] = tn(), r = n.get("a"), a = n.get("b");
  return !t || !r || !a ? /* @__PURE__ */ e(ht, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(om, { pipelineId: t, runIdA: r, runIdB: a });
}
function bh() {
  const t = Oe(), [n, r] = tn(), [a, i] = S([]), { runs: s } = ft();
  ee(() => {
    let y = !1;
    return (async () => {
      const w = Xn(), b = [];
      await Promise.all(
        w.map(async (k) => {
          try {
            const { runs: C } = await co(k.id, { limit: 50 });
            if (C.length > 0) {
              for (const A of C)
                A.id && b.push({ ...A, pipelineName: k.name });
              return;
            }
          } catch {
          }
          for (const C of Xt(k.id))
            C.id && b.push({ ...C, pipelineName: k.name });
        })
      ), !y && (b.sort((k, C) => C.startedAt.localeCompare(k.startedAt)), i(b));
    })(), () => {
      y = !0;
    };
  }, []);
  const d = q(() => {
    const y = new Map(Xn().map((k) => [k.id, k.name])), w = new Set(a.map((k) => k.id)), b = [];
    for (const [k, C] of Object.entries(s))
      w.has(k) || C.pipelineId && b.push({
        ...C,
        pipelineName: y.get(C.pipelineId) ?? `Pipeline ${C.pipelineId.slice(0, 8)}`
      });
    return b.length === 0 ? a : [...b, ...a].sort((k, C) => C.startedAt.localeCompare(k.startedAt));
  }, [a, s]), { query: c, statuses: l, triggerKinds: p, range: u } = q(
    () => Do(n),
    [n]
  ), f = (y, w) => {
    const b = new URLSearchParams(n);
    w ? b.set(y, w) : b.delete(y), r(b, { replace: !0 });
  }, h = (y) => {
    const w = new Set(l);
    w.has(y) ? w.delete(y) : w.add(y), f("status", w.size === 0 ? null : Array.from(w).join(","));
  }, x = (y) => {
    const w = new Set(p);
    w.has(y) ? w.delete(y) : w.add(y), f("trigger", w.size === 0 ? null : Array.from(w).join(","));
  }, g = (y) => {
    f("range", y === "7d" ? null : y);
  }, m = (y) => {
    f("q", y.length === 0 ? null : y);
  }, N = q(
    () => Eo(d, { query: c, statuses: l, triggerKinds: p, range: u }),
    [d, c, l, p, u]
  ), v = q(() => {
    const y = {};
    for (const w of N) {
      const b = Object.values(w.steps).filter((C) => !!C.llm).map((C) => ({
        model: void 0,
        tokensIn: C.llm?.tokensIn ?? 0,
        tokensOut: C.llm?.tokensOut ?? 0
      })), k = xt(b);
      k.total.totalCostUsd > 0 && (y[w.id] = Lt(k.total));
    }
    return y;
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
      Oo,
      {
        query: c,
        onQueryChange: m,
        statuses: l,
        onStatusToggle: h,
        triggerKinds: p,
        onTriggerToggle: x,
        range: u,
        onRangeChange: g,
        onClearFilters: () => r(new URLSearchParams(), { replace: !0 })
      }
    ),
    N.length === 0 ? /* @__PURE__ */ e(
      Be,
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
      /* @__PURE__ */ e("tbody", { children: N.map((y) => /* @__PURE__ */ o(
        "tr",
        {
          onClick: () => t(`/pipelines/${y.pipelineId}/runs/${y.id}`),
          className: "border-b border-border cursor-pointer hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-medium", children: y.pipelineName }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: y.id.slice(0, 11) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ e(ce, { tone: Jn(y.status).tone, size: "sm", children: y.status }) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: y.triggerType ?? y.triggeredBy?.triggerType }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: Yd(y.startedAt) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: y.completedAt ? ke(new Date(y.completedAt).getTime() - new Date(y.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: v[y.id] ?? "—" })
          ]
        },
        y.id
      )) })
    ] }) })
  ] });
}
function Lo(t) {
  let n = 0, r = 0;
  for (const a of Object.values(t.steps ?? {}))
    a.llm && (n += a.llm.tokensIn ?? 0, r += a.llm.tokensOut ?? 0);
  return { tokensIn: n, tokensOut: r };
}
function am(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function im(t, n) {
  const r = [];
  for (const a of Object.values(t.steps ?? {}))
    a.llm && r.push({
      model: n.get(a.nodeId),
      tokensIn: a.llm.tokensIn,
      tokensOut: a.llm.tokensOut
    });
  return xt(r).total.totalCostUsd;
}
function eo(t, n) {
  if (t.length === 0) return 0;
  const r = Math.min(t.length - 1, Math.floor(t.length * n));
  return t[r];
}
function to(t) {
  return t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function no(t) {
  const n = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) ? `$${n.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function sm(t) {
  return t.slice(0, 8);
}
function lm(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function cm(t, n) {
  const r = t.length;
  let a = 0, i = 0, s = 0;
  const d = [];
  let c = 0, l = 0, p = 0;
  const u = /* @__PURE__ */ new Map();
  for (const m of t) {
    m.status === "completed" ? a++ : m.status === "failed" ? i++ : m.status === "cancelled" && s++, typeof m.durationMs == "number" && m.durationMs > 0 && d.push(m.durationMs);
    const N = Lo(m);
    if (c += N.tokensIn, l += N.tokensOut, p += im(m, n), m.error?.message) {
      const v = m.error.message.slice(0, 48), y = u.get(v);
      y ? (y.count += 1, m.startedAt > y.lastSeenAt && (y.lastSeenAt = m.startedAt, y.exampleRunId = m.id)) : u.set(v, { count: 1, lastSeenAt: m.startedAt, exampleRunId: m.id });
    }
  }
  d.sort((m, N) => m - N);
  const f = eo(d, 0.5), h = eo(d, 0.95), x = r === 0 ? 0 : Math.round(a / r * 100), g = [...u.entries()].map(([m, N]) => ({ key: m, count: N.count, lastSeenAt: N.lastSeenAt, exampleRunId: N.exampleRunId })).sort((m, N) => N.count - m.count).slice(0, 5);
  return {
    totalCount: r,
    completedCount: a,
    failedCount: i,
    cancelledCount: s,
    successRatePct: x,
    medianMs: f,
    p95Ms: h,
    tokensIn: c,
    tokensOut: l,
    tokensPerRun: r === 0 ? 0 : Math.round((c + l) / r),
    totalCost: p,
    costPerRun: r === 0 ? 0 : p / r,
    failureBreakdown: g
  };
}
function dm(t) {
  return t >= 90 ? "#16a34a" : t >= 70 ? "#f59e0b" : "#dc2626";
}
function pm(t) {
  const n = [...t].sort((l, p) => l.startedAt.localeCompare(p.startedAt)), r = [], a = [], i = [];
  let s = 0, d = 0, c = 0;
  for (const l of n) {
    const p = new Date(l.startedAt).getTime();
    l.status === "completed" ? s += 1 : l.status === "failed" ? d += 1 : l.status === "cancelled" && (c += 1), r.push({ x: p, y: s }), a.push({ x: p, y: d }), i.push({ x: p, y: c });
  }
  return [
    { label: "Completed", data: r, color: "#16a34a" },
    { label: "Failed", data: a, color: "#dc2626" },
    { label: "Cancelled", data: i, color: "#d1d5db" }
  ];
}
function um(t, n) {
  const a = [...t].sort((s, d) => s.startedAt.localeCompare(d.startedAt)).filter((s) => typeof s.durationMs == "number" && s.durationMs > 0).map((s) => ({ x: new Date(s.startedAt).getTime(), y: s.durationMs })), i = a.map((s) => ({ x: s.x, y: n }));
  return [
    { label: "Duration (ms)", data: a, color: "#646cff" },
    { label: "p50", data: i, color: "#94a3b8" }
  ];
}
function mm(t) {
  const n = [...t].sort((i, s) => i.startedAt.localeCompare(s.startedAt)), r = [], a = [];
  for (const i of n) {
    const s = new Date(i.startedAt).getTime(), { tokensIn: d, tokensOut: c } = Lo(i);
    r.push({ x: s, y: d }), a.push({ x: s, y: c });
  }
  return [
    { label: "Tokens in", data: r, color: "#646cff" },
    { label: "Tokens out", data: a, color: "#16a34a" }
  ];
}
function yh() {
  const { pipelineId: t } = mt(), n = Oe(), [r, a] = S(null), [i, s] = S([]), [d, c] = S("50");
  ee(() => {
    t && (a(nt(t)), s(Xt(t)));
  }, [t]);
  const l = q(() => {
    if (d === "all") return i;
    const m = Number(d);
    return i.slice(0, m);
  }, [i, d]), p = q(() => am(r), [r]), u = q(() => cm(l, p), [l, p]), f = q(
    () => Yp(l, r).filter((m) => m.totalCostUsd > 0 || m.stepCount > 0),
    [l, r]
  ), h = q(() => Zp(i, r, 30), [i, r]), x = q(
    () => [
      {
        label: "Daily spend",
        data: h.map((m) => ({ x: m.ts, y: m.totalCostUsd })),
        color: "#646cff"
      }
    ],
    [h]
  );
  if (!t) return /* @__PURE__ */ e(ht, { to: "/pipelines", replace: !0 });
  if (!r)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      Be,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => n("/pipelines")
      }
    ) });
  const g = l.length > 0;
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
    g ? /* @__PURE__ */ o(G, { children: [
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
                  style: { color: dm(u.successRatePct) },
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
              /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: ke(u.medianMs) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                "p95 · ",
                ke(u.p95Ms)
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
              /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: to(u.totalCost) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                to(u.costPerRun),
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
                ka,
                {
                  data: f.map((m) => ({
                    label: m.label,
                    cost: Number(m.totalCostUsd.toFixed(6))
                  })),
                  xKey: "label",
                  yKey: "cost",
                  height: 200,
                  color: "#646cff",
                  yFormat: no
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-trend-30d", children: [
              /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "30-day spend trend" }),
              /* @__PURE__ */ e(
                Ut,
                {
                  series: x,
                  height: 200,
                  xFormat: (m) => new Date(Number(m)).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric"
                  }),
                  yFormat: no
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
            Ut,
            {
              series: pm(l),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString()
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Duration over time" }),
          /* @__PURE__ */ e(
            Ut,
            {
              series: um(l, u.medianMs),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString(),
              yFormat: (m) => ke(m)
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Token usage over time" }),
          /* @__PURE__ */ e(
            Ut,
            {
              series: mm(l),
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
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5 text-text-secondary", children: lm(m.lastSeenAt) }),
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => n(`/pipelines/${t}/runs/${m.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    sm(m.exampleRunId),
                    " →"
                  ]
                }
              ) })
            ] }, m.key)) })
          ] })
        ] })
      ] })
    ] }) : /* @__PURE__ */ e(
      Be,
      {
        icon: "📊",
        title: "No runs yet",
        body: "No runs yet. Trigger this pipeline to see stats."
      }
    )
  ] });
}
function hm(t) {
  const n = new Date(t).getTime();
  if (!Number.isFinite(n) || n <= 0) return "—";
  const r = Math.floor((Date.now() - n) / 1e3);
  if (r < 10) return "just now";
  if (r < 60) return `${r}s ago`;
  const a = Math.floor(r / 60);
  if (a < 60) return `${a}m ago`;
  const i = Math.floor(a / 60);
  return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
}
function fm(t) {
  return t.length <= 6 ? t : t.slice(-6);
}
function xm({ approver: t, idx: n }) {
  const r = t.type === "role" ? "🎖" : "👤";
  return /* @__PURE__ */ o(
    "span",
    {
      className: "inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-sm text-[11px] font-semibold leading-[1.4] whitespace-nowrap",
      children: [
        /* @__PURE__ */ e("span", { "aria-hidden": !0, children: r }),
        /* @__PURE__ */ e("span", { children: t.value })
      ]
    },
    `${t.type}:${t.value}:${n}`
  );
}
function gm(t, n) {
  const r = [];
  if (t) {
    const a = t.steps;
    for (const [i, s] of Object.entries(t))
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
function bm({ row: t, onSubmit: n, onOpenPipeline: r }) {
  const [a, i] = S(""), s = D(
    (p) => {
      n(p, a.trim()), i("");
    },
    [a, n]
  ), d = t.requiredCount ?? 1, c = t.recordedCount ?? 0, l = q(() => gm(t.runContext, t.runSteps), [t.runContext, t.runSteps]);
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
            fm(t.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: hm(t.requestedAt) })
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
      t.approvers.length === 0 ? /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : t.approvers.map((p, u) => /* @__PURE__ */ e(xm, { approver: p, idx: u }, u)),
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
function vh() {
  const t = Oe(), { approvals: n, isLoading: r, error: a, retry: i } = sa(), { resolveApproval: s, runs: d } = ft(), [c, l] = S(
    () => /* @__PURE__ */ new Set()
  );
  ee(() => {
    if (c.size === 0) return;
    const m = new Set(n.map((y) => `${y.runId}::${y.stepId}`));
    let N = !1;
    const v = new Set(c);
    for (const y of c)
      m.has(y) || (v.delete(y), N = !0);
    N && l(v);
  }, [n, c]);
  const [p, u] = S({}), f = ie(/* @__PURE__ */ new Set());
  ee(() => {
    for (const m of n)
      f.current.has(m.runId) || (f.current.add(m.runId), la(m.pipelineId, m.runId).then((N) => {
        N && u((v) => ({
          ...v,
          [m.runId]: { context: N.context, steps: N.steps }
        }));
      }));
  }, [n]);
  const h = q(() => {
    const m = /* @__PURE__ */ new Map(), N = [];
    for (const v of n) {
      const y = `${v.runId}::${v.stepId}`;
      if (c.has(y)) continue;
      let w = m.get(v.pipelineId);
      w === void 0 && (w = nt(v.pipelineId), m.set(v.pipelineId, w));
      const b = w?.name ?? (v.pipelineId ? `Pipeline ${v.pipelineId.slice(0, 8)}` : "Unknown pipeline"), k = p[v.runId]?.context ?? d[v.runId]?.context, C = p[v.runId]?.steps;
      N.push({ ...v, pipelineName: b, runContext: k, runSteps: C });
    }
    return N;
  }, [n, c, d, p]), x = D(
    (m, N, v, y, w) => {
      s(N, v, y, w || void 0), l((b) => {
        const k = new Set(b);
        return k.add(`${N}::${v}`), k;
      }), fetch(`/api/pipelines/${encodeURIComponent(N)}/approvals`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: v, decision: y, ...w ? { comment: w } : {} })
      }).catch((b) => {
        console.error("[approvals] POST failed", b);
      }), t(`/pipelines/${m}/runs/${N}`);
    },
    [s, t]
  ), g = h.length;
  return /* @__PURE__ */ o("div", { "data-testid": "pending-approvals-page", className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-[inherit]", children: [
    /* @__PURE__ */ e("div", { className: "h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]", children: /* @__PURE__ */ o("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "text-lg font-bold text-text-primary", children: "Pending approvals" }),
      /* @__PURE__ */ e(ce, { "data-testid": "pending-count", tone: g > 0 ? "warning" : "neutral", size: "sm", children: g })
    ] }) }),
    /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto p-5", children: [
      a ? /* @__PURE__ */ o("div", { "data-testid": "approvals-error", role: "alert", className: "px-4 py-3 bg-[#fef2f2] border border-[#dc2626] text-[#dc2626] rounded-lg flex items-center justify-between gap-3 mb-4", children: [
        /* @__PURE__ */ e("span", { className: "text-[13px] font-medium", children: "Couldn't load pending approvals. Try again." }),
        /* @__PURE__ */ e("button", { "data-testid": "approvals-retry", onClick: i, className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[#dc2626] border border-[#dc2626] rounded-md cursor-pointer font-[inherit]", children: "Retry" })
      ] }) : null,
      r && g === 0 ? /* @__PURE__ */ o("div", { "data-testid": "approvals-loading", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: [
        /* @__PURE__ */ e(an, { height: 140 }),
        /* @__PURE__ */ e(an, { height: 140 }),
        /* @__PURE__ */ e(an, { height: 140 })
      ] }) : g === 0 && !a ? /* @__PURE__ */ e(
        Be,
        {
          icon: "✋",
          title: "No pending approvals",
          body: "When a pipeline reaches an approval step, it'll show up here.",
          testId: "approvals-empty"
        }
      ) : /* @__PURE__ */ e("div", { "data-testid": "approvals-list", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: h.map((m) => /* @__PURE__ */ e(
        bm,
        {
          row: m,
          onOpenPipeline: () => t(`/pipelines/${m.pipelineId}`),
          onSubmit: (N, v) => x(m.pipelineId, m.runId, m.stepId, N, v)
        },
        `${m.runId}:${m.stepId}`
      )) })
    ] })
  ] });
}
function Nh({ data: t, onChange: n }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
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
        Dt,
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
        Dt,
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
const ym = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.crop.output.imageId"
], vm = [
  "{{scatter.item.label}}",
  "{{scatter.index}}",
  "{{scatter.parentImageId}}"
];
function ro({
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
function wh({ data: t, onChange: n }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
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
        Dt,
        {
          id: "save-source-image-path",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: t.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
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
        ro,
        {
          samples: ym,
          onSelect: (r) => n({ sourceImagePath: r })
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
        Dt,
        {
          id: "save-filename-template",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: t.filenameTemplate ?? "",
          onChange: (r) => n({ filenameTemplate: r.target.value.trim() || void 0 }),
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
          ro,
          {
            samples: vm,
            onSelect: (r) => {
              const a = t.filenameTemplate ?? "";
              n({ filenameTemplate: a + r });
            }
          }
        )
      ] })
    ] })
  ] });
}
function kh({
  status: t,
  result: n,
  runId: r,
  endpointLabel: a,
  error: i,
  latencyMs: s,
  onOpen: d,
  className: c
}) {
  const l = a ?? n?.model?.endpointId ?? "vision-model", p = s ?? n?.model?.latencyMs, u = n?.caption, f = (n?.tags ?? []).slice(0, 5), h = /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ e("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: l }),
      t === "running" ? /* @__PURE__ */ o(ce, { tone: "info", size: "sm", children: [
        /* @__PURE__ */ e("span", { className: "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" }),
        " running"
      ] }) : t === "completed" ? /* @__PURE__ */ e(ce, { tone: "success", size: "sm", children: "ok" }) : /* @__PURE__ */ e(ce, { tone: "danger", size: "sm", children: "failed" }),
      typeof p == "number" ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        p.toFixed(0),
        "ms"
      ] }) : null,
      r ? /* @__PURE__ */ e("span", { className: "ml-auto truncate font-mono text-[10px] text-text-tertiary", children: r }) : null
    ] }),
    t === "failed" && i ? /* @__PURE__ */ e("p", { className: "text-[13px] text-red-700", children: i }) : /* @__PURE__ */ e("p", { className: "line-clamp-2 text-left text-[13px] text-text-primary", children: u ?? (t === "running" ? "Analyzing image…" : "No caption produced.") }),
    f.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: f.map((g) => /* @__PURE__ */ o(ce, { tone: "neutral", size: "sm", children: [
      "#",
      g
    ] }, g)) }) : null
  ] }), x = I(
    "flex w-full flex-col gap-1.5 rounded-lg border bg-surface p-3 text-sm text-left",
    t === "running" ? "border-indigo-300 ring-1 ring-indigo-200" : t === "failed" ? "border-red-300" : "border-border"
  );
  if (d) {
    const g = u ? u.slice(0, 60) : "no caption";
    return /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: d,
        "aria-label": `Open vision result: ${l}, ${t}, ${g}`,
        className: I(
          x,
          "cursor-pointer transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1",
          c
        ),
        children: h
      }
    );
  }
  return /* @__PURE__ */ e("article", { className: I(x, c), children: h });
}
function Ch(t = {}) {
  const { maxRecords: n = 50, runId: r } = t, [a, i] = S([]), s = ie(/* @__PURE__ */ new Map()), d = ie(!0);
  return ee(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Pe("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.image.vision.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const f = `${u.runId}::${u.stepId}`;
    i((h) => {
      const x = s.current.get(f), g = typeof u.at == "number" ? u.at : Date.now(), m = (N) => {
        if (typeof x == "number" && x >= 0 && x < h.length) {
          const w = h.slice();
          return w[x] = { ...h[x], ...N }, w;
        }
        const v = [N, ...h];
        v.length > n && (v.length = n);
        const y = /* @__PURE__ */ new Map();
        return v.forEach((w, b) => y.set(`${w.runId}::${w.stepId}`, b)), s.current = y, v;
      };
      if (p === "pipeline.image.vision.started")
        return m({
          runId: u.runId,
          stepId: u.stepId,
          status: "running",
          endpointId: u.endpointId,
          startedAt: g
        });
      if (p === "pipeline.image.vision.completed") {
        const N = typeof x == "number" ? h[x] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          status: "completed",
          result: u.result,
          completedAt: g,
          elapsedMs: N?.startedAt ? g - N.startedAt : void 0,
          endpointId: N?.endpointId ?? u.result?.model?.endpointId
        });
      }
      if (p === "pipeline.image.vision.failed") {
        const N = typeof x == "number" ? h[x] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          status: "failed",
          error: u.error,
          completedAt: g,
          elapsedMs: N?.startedAt ? g - N.startedAt : void 0
        });
      }
      return h;
    });
  }), q(() => a, [a]);
}
function Nm(t) {
  return t === "pass" ? "success" : t === "fail" ? "danger" : "warning";
}
function wm({ result: t, className: n }) {
  const r = Nm(t.overallVerdict), a = r === "success" ? "PASS" : r === "danger" ? "FAIL" : "INCONCLUSIVE", i = t.rubricSnapshot.passThreshold ?? 0.5;
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
          /* @__PURE__ */ o(ce, { tone: r, size: "sm", children: [
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
            Fn,
            {
              value: t.overallScore,
              threshold: i,
              tone: r === "warning" ? "warning" : r,
              size: "lg",
              ariaLabel: `Overall judge score ${(t.overallScore * 100).toFixed(0)}% — ${a}`
            }
          )
        ] })
      ]
    }
  );
}
function km({ result: t, className: n }) {
  if (!t.criteria || t.criteria.length === 0) return null;
  const r = /* @__PURE__ */ new Map();
  for (const a of t.rubricSnapshot.criteria) r.set(a.id, a);
  return /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", n), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Criteria (",
      t.criteria.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1.5", children: t.criteria.map((a) => /* @__PURE__ */ e(Cm, { score: a, def: r.get(a.criterionId) }, a.criterionId)) })
  ] });
}
function Cm({
  score: t,
  def: n
}) {
  const r = t.passed ? "success" : "danger", a = t.passed ? "PASS" : "FAIL", i = n?.scale ?? "0-1";
  return /* @__PURE__ */ o("li", { className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2.5", children: [
    /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-1.5", children: [
      /* @__PURE__ */ e("span", { className: "font-mono text-[11px] font-semibold text-text-primary", children: t.criterionId }),
      /* @__PURE__ */ o("span", { className: "font-mono text-[10px] uppercase text-text-tertiary", children: [
        "[",
        i,
        "]"
      ] }),
      /* @__PURE__ */ e(ce, { tone: r, size: "sm", children: a }),
      /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
        "raw: ",
        String(t.rawScore)
      ] })
    ] }),
    /* @__PURE__ */ e(
      Fn,
      {
        value: t.score,
        threshold: n?.failThreshold ?? 0.5,
        tone: r,
        size: "sm",
        ariaLabel: `Criterion ${t.criterionId} score ${(t.score * 100).toFixed(0)}% — ${a}`
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
const Bo = qo(null);
function Ih({ value: t, children: n }) {
  return /* @__PURE__ */ e(Bo.Provider, { value: t, children: n });
}
function Uo() {
  return io(Bo);
}
function Sh({
  result: t,
  showVerdict: n = !0,
  showCriteria: r = !0,
  showMetadata: a = !0,
  showRawText: i = !1,
  className: s
}) {
  const d = Uo(), [c, l] = S(!1), [p, u] = S(null), [f, h] = S(!1), [x, g] = S(null), m = ie(!0);
  ee(() => (m.current = !0, () => {
    m.current = !1;
  }), []), ee(() => {
    c && (t.rawModelText || p === null && (f || t.rawTextTruncated && d && (h(!0), (async () => {
      try {
        const y = await d.fetchRawText(t.judgmentId);
        if (!m.current) return;
        u(y ?? ""), g(null);
      } catch (y) {
        if (!m.current) return;
        g(y instanceof Error ? y : new Error(String(y)));
      } finally {
        m.current && h(!1);
      }
    })())));
  }, [c, t.rawModelText, t.rawTextTruncated, t.judgmentId, d, p, f]);
  const N = t.rawModelText ?? p ?? null, v = !!t.rawModelText || !!t.rawTextTruncated;
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-3 text-text-primary", s), children: [
    n ? /* @__PURE__ */ e(wm, { result: t }) : null,
    r ? /* @__PURE__ */ e(km, { result: t }) : null,
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
    i && v ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => l((y) => !y),
          className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded",
          "aria-expanded": c,
          children: [
            c ? "▾" : "▸",
            " Raw model output"
          ]
        }
      ),
      c ? /* @__PURE__ */ e(
        Im,
        {
          text: N,
          loading: f,
          error: x,
          fallbackHint: t.rawTextTruncated && !d ? "Raw text was spilled to S3 but no JudgmentApi provider is wired." : null
        }
      ) : null
    ] }) : null
  ] });
}
function Im({
  text: t,
  loading: n,
  error: r,
  fallbackHint: a
}) {
  return n ? /* @__PURE__ */ e("div", { className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary", children: "Loading raw text…" }) : r ? /* @__PURE__ */ o("div", { className: "rounded-lg border border-state-failed bg-danger-bg p-2 text-[11px] text-text-primary", children: [
    "Failed to fetch raw text: ",
    r.message
  ] }) : t === null || t.length === 0 ? /* @__PURE__ */ e("div", { className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary", children: a ?? "Raw text not available." }) : /* @__PURE__ */ e("pre", { className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary", children: t });
}
function $h({ aggregate: t, className: n }) {
  const r = t.numJudgments > 0 ? t.numPassed / t.numJudgments : 0, a = t.numJudgments > 0 ? t.sumOverallScore / t.numJudgments : 0, i = r >= 0.9 ? "success" : r >= 0.6 ? "warning" : "danger", s = i === "success" ? "HEALTHY" : i === "warning" ? "MIXED" : "FAILING";
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
          /* @__PURE__ */ o(ce, { tone: i, size: "sm", children: [
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
            Fn,
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
function Th({
  aggregates: t,
  sortOrder: n = "desc",
  caption: r,
  loading: a = !1,
  className: i
}) {
  const s = q(() => {
    const f = t.slice();
    return f.sort((h, x) => h.dayBucket.localeCompare(x.dayBucket)), n === "desc" && f.reverse(), f;
  }, [t, n]), d = q(() => t.slice().sort((h, x) => h.dayBucket.localeCompare(x.dayBucket)).map((h) => h.numJudgments > 0 ? h.numPassed / h.numJudgments : 0), [t]);
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
      /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: r ?? `Judgment trend — ${t.length} days` }),
      /* @__PURE__ */ o(
        ce,
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
        va,
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
      /* @__PURE__ */ e("tbody", { children: s.map((f) => /* @__PURE__ */ e(Sm, { row: f }, f.aggregateKey)) })
    ] })
  ] });
}
function Sm({ row: t }) {
  const n = t.numJudgments > 0 ? t.numPassed / t.numJudgments : 0, r = t.numJudgments > 0 ? t.sumOverallScore / t.numJudgments : 0, a = n >= 0.9 ? "success" : n >= 0.6 ? "warning" : "danger";
  return /* @__PURE__ */ o("tr", { className: "border-t border-border", children: [
    /* @__PURE__ */ e("td", { className: "py-1 pr-2 font-mono", children: t.dayBucket }),
    /* @__PURE__ */ e("td", { className: "py-1 pr-2", children: /* @__PURE__ */ o(ce, { tone: a, size: "sm", children: [
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
function $m(t) {
  if (typeof t == "number") return t;
  if (typeof t == "string") {
    const n = Date.parse(t);
    if (Number.isFinite(n)) return n;
  }
  return Date.now();
}
function Ah(t = {}) {
  const { maxRecords: n = 50, runId: r } = t, [a, i] = S([]), s = ie(/* @__PURE__ */ new Map()), d = ie(!0);
  return ee(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Pe("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.judge.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const f = `${u.runId}::${u.stepId}`;
    i((h) => {
      const x = s.current.get(f), g = $m(u.at), m = (N) => {
        if (typeof x == "number" && x >= 0 && x < h.length) {
          const w = h.slice();
          return w[x] = { ...h[x], ...N }, w;
        }
        const v = [N, ...h];
        v.length > n && (v.length = n);
        const y = /* @__PURE__ */ new Map();
        return v.forEach((w, b) => y.set(`${w.runId}::${w.stepId}`, b)), s.current = y, v;
      };
      if (p === "pipeline.judge.started")
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId,
          status: "running",
          rubricId: u.rubricId,
          judgeModel: u.judgeModel,
          startedAt: g
        });
      if (p === "pipeline.judge.scored") {
        const N = typeof x == "number" ? h[x] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? N?.pipelineId,
          status: "scored",
          result: u.result,
          completedAt: g,
          elapsedMs: N?.startedAt ? g - N.startedAt : u.latencyMs,
          rubricId: u.rubricId ?? N?.rubricId,
          judgeModel: u.judgeModel ?? N?.judgeModel,
          costUsd: u.costUsd ?? u.result?.costUsd,
          tokensIn: u.usage?.inputTokens ?? u.result?.tokensIn,
          tokensOut: u.usage?.outputTokens ?? u.result?.tokensOut
        });
      }
      if (p === "pipeline.judge.failed") {
        const N = typeof x == "number" ? h[x] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? N?.pipelineId,
          status: "failed",
          error: u.error,
          failureReason: u.reason,
          completedAt: g,
          elapsedMs: N?.startedAt ? g - N.startedAt : u.latencyMs,
          costUsd: u.costUsd,
          tokensIn: u.tokensIn,
          tokensOut: u.tokensOut
        });
      }
      if (p === "pipeline.judge.budget-exceeded") {
        const N = typeof x == "number" ? h[x] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? N?.pipelineId,
          status: "budget-exceeded",
          completedAt: g
        });
      }
      return h;
    });
  }), q(() => a, [a]);
}
function Rh(t) {
  const n = Uo(), [r, a] = S([]), [i, s] = S(!1), [d, c] = S(null), l = ie(!0), p = ie(() => {
  }), { pipelineId: u, rubricId: f, since: h, until: x, limit: g, refreshIntervalMs: m = 0, paused: N = !1 } = t, v = `${u ?? ""}|${f ?? ""}|${h ?? ""}|${x ?? ""}|${g ?? ""}|${N ? "1" : "0"}`;
  return ee(() => (l.current = !0, () => {
    l.current = !1;
  }), []), ee(() => {
    if (!n) {
      a([]), s(!1), c(null);
      return;
    }
    if (N) return;
    if (!u && !f) {
      c(new Error("useJudgmentAggregates: one of pipelineId or rubricId is required")), s(!1);
      return;
    }
    let y = !1;
    const w = async () => {
      s(!0);
      try {
        const b = await n.fetchAggregates({
          ...u ? { pipelineId: u } : {},
          ...f ? { rubricId: f } : {},
          ...h ? { since: h } : {},
          ...x ? { until: x } : {},
          ...typeof g == "number" ? { limit: g } : {}
        });
        if (y || !l.current) return;
        a(b.items), c(null);
      } catch (b) {
        if (y || !l.current) return;
        c(b instanceof Error ? b : new Error(String(b)));
      } finally {
        l.current && !y && s(!1);
      }
    };
    if (p.current = () => {
      w();
    }, w(), m > 0) {
      const b = setInterval(() => {
        w();
      }, m);
      return () => {
        y = !0, clearInterval(b);
      };
    }
    return () => {
      y = !0;
    };
  }, [n, v, m]), {
    aggregates: r,
    loading: i,
    error: d,
    reload: () => p.current()
  };
}
const Tm = 100, Am = 500, Fo = 148, jo = 116, Rm = 56, Pm = 20;
function Mm(t) {
  const n = new Map(t.map((l) => [l.imageId, l])), r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const l of t)
    if (l.parentImageId) {
      const p = a.get(l.parentImageId) ?? [];
      p.push(l.imageId), a.set(l.parentImageId, p);
    }
  const i = [];
  for (const l of t)
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
    const u = l * (Fo + Rm);
    p.forEach((f, h) => {
      c.set(f, {
        x: u,
        y: h * (jo + Pm)
      });
    });
  }
  return c;
}
function Em(t, n) {
  const r = new Map(n.map((s) => [s.imageId, s])), a = /* @__PURE__ */ new Set(), i = [t];
  for (; i.length; ) {
    const s = i.shift();
    if (a.has(s)) continue;
    a.add(s);
    const d = r.get(s);
    d?.parentImageId && i.push(d.parentImageId);
  }
  return a;
}
function Dm({ src: t, alt: n, testId: r }) {
  const a = ie(null), [i, s] = S(!1);
  return ee(() => {
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
function Om({ data: t }) {
  const { entry: n, highlighted: r, selected: a, onSelect: i, getImageUrl: s } = t, d = n.width && n.height ? `${n.width}×${n.height}` : "", c = n.producedByNodeKind;
  return /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ e(B, { type: "target", position: U.Left, id: "in", className: "w-2 h-2 bg-border-emphasis" }),
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
          /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 overflow-hidden bg-surface-inset flex items-center justify-center", children: /* @__PURE__ */ e(
            Dm,
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
const _m = { lineageNode: Om };
function Lm() {
  return /* @__PURE__ */ e(
    "div",
    {
      className: "flex items-center justify-center h-full text-text-tertiary text-sm",
      "data-testid": "lineage-graph-empty",
      children: "No image artifacts produced by this run."
    }
  );
}
function Bm(t, n) {
  if (t.length <= n) return t;
  const r = t.map((a, i) => ({ e: a, i }));
  return r.sort((a, i) => {
    const s = Date.parse(a.e.at), d = Date.parse(i.e.at);
    return d !== s ? d - s : i.i - a.i;
  }), r.slice(0, n).map((a) => a.e);
}
function Ph({
  entries: t,
  selectedImageId: n,
  onSelect: r,
  maxRenderedNodes: a = Tm
}) {
  const i = Ae(), [s, d] = S(!1), [c, l] = S(!1), p = t.length, u = !s && p > a, f = q(
    () => u ? Bm(t, a) : t,
    [t, u, a]
  ), h = q(
    () => n ? Em(n, f) : /* @__PURE__ */ new Set(),
    [n, f]
  ), x = q(() => Mm(f), [f]), g = q(
    () => f.map((T) => {
      const M = x.get(T.imageId) ?? { x: 0, y: 0 };
      return {
        id: T.imageId,
        type: "lineageNode",
        position: M,
        data: {
          entry: T,
          highlighted: h.has(T.imageId),
          selected: T.imageId === n,
          onSelect: r ?? (() => {
          }),
          getImageUrl: i
        },
        style: { width: Fo, height: jo }
      };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [f, n, h, r, i]
  ), m = q(
    () => new Set(f.map((T) => T.imageId)),
    [f]
  ), N = q(
    () => f.filter(
      (T) => T.parentImageId && m.has(T.parentImageId)
    ).map((T) => ({
      id: `${T.parentImageId}->${T.imageId}`,
      source: T.parentImageId,
      target: T.imageId,
      sourceHandle: "out",
      targetHandle: "in",
      className: h.has(T.imageId) && h.has(T.parentImageId) ? "stroke-primary stroke-2" : "stroke-border"
    })),
    [f, m, h]
  ), [v, , y] = ho(g), [w, , b] = fo(N), k = D(
    (T, M) => {
      r?.(M.id);
    },
    [r]
  ), C = D(() => {
    p > Am ? l(!0) : d(!0);
  }, [p]), A = D(() => {
    d(!0), l(!1);
  }, []), $ = D(() => {
    l(!1);
  }, []);
  return p === 0 ? /* @__PURE__ */ e(Lm, {}) : /* @__PURE__ */ o(
    "div",
    {
      className: "relative w-full h-full flex flex-col",
      "data-testid": "lineage-graph",
      children: [
        u && /* @__PURE__ */ e("div", { className: "p-2 flex-shrink-0", children: /* @__PURE__ */ o(
          tt,
          {
            variant: "info",
            "data-testid": "lineage-graph-clip-banner",
            children: [
              /* @__PURE__ */ o("span", { className: "flex-1", children: [
                "Showing ",
                f.length,
                " of ",
                p,
                " artifacts"
              ] }),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: C,
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
            xo,
            {
              nodes: v,
              edges: w,
              onNodesChange: y,
              onEdgesChange: b,
              onNodeClick: k,
              nodeTypes: _m,
              fitView: !0,
              fitViewOptions: { padding: 0.2 },
              minZoom: 0.3,
              maxZoom: 2,
              onlyRenderVisibleElements: !0,
              proOptions: { hideAttribution: !0 },
              children: [
                /* @__PURE__ */ e(go, { gap: 16, size: 1, className: "bg-surface-inset" }),
                /* @__PURE__ */ e(bo, { showInteractive: !1, className: "bg-surface border border-border rounded" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e(
          Zt,
          {
            open: c,
            onConfirm: A,
            onCancel: $,
            title: "Show all artifacts?",
            body: `Rendering all ${p} artifacts may slow down the lineage tab. Continue?`,
            confirmLabel: "Show all",
            tone: "caution"
          }
        )
      ]
    }
  );
}
const _t = /* @__PURE__ */ new Map(), Um = 6e4;
function oo(t) {
  const n = _t.get(t);
  return n ? Date.now() - n.fetchedAt > Um ? (_t.delete(t), null) : n.entries : null;
}
function Fm(t, n) {
  _t.set(t, { entries: n, fetchedAt: Date.now() });
}
function Mh() {
  _t.clear();
}
function Eh(t, n) {
  const [r, a] = S(() => t ? oo(t) ?? [] : []), [i, s] = S(!1), [d, c] = S(null), l = ie(0), p = D(() => {
    if (!t || !n) return;
    const f = oo(t);
    if (f) {
      a(f), s(!1), c(null);
      return;
    }
    const h = ++l.current;
    s(!0), c(null);
    const x = `/api/pipeline/runs/${encodeURIComponent(t)}/image-lineage?pipelineId=${encodeURIComponent(n)}`;
    fetch(x, {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    }).then(async (g) => {
      if (h !== l.current) return;
      if (!g.ok) {
        const v = `image-lineage: ${g.status} ${g.statusText}`;
        c(v), s(!1);
        return;
      }
      const m = await g.json();
      if (h !== l.current) return;
      const N = Array.isArray(m.entries) ? m.entries : [];
      Fm(t, N), a(N), s(!1);
    }).catch((g) => {
      h === l.current && (c(g instanceof Error ? g.message : String(g)), s(!1));
    });
  }, [t, n]), u = D(() => {
    t && _t.delete(t), p();
  }, [t, p]);
  return ee(() => {
    p();
  }, [p]), { entries: r, loading: i, error: d, refetch: u };
}
export {
  qa as ActionNode,
  Rc as AdjustBwConfig,
  gi as AdjustBwNode,
  Vc as AdjustLayerConfig,
  yi as AdjustLayerNode,
  ri as AgUiOutputNode,
  Ya as AgentNode,
  $h as AggregateSummaryCard,
  bh as AllRunsPage,
  Ga as ApprovalNode,
  fe as BaseNode,
  Dd as CaptionPanel,
  ja as ConditionNode,
  km as CriteriaPanel,
  $c as CropConfig,
  xi as CropNode,
  Md as EditPromptConfig,
  Mi as EditPromptNode,
  jd as EditRecommendationsPanel,
  Bh as EventStreamProvider,
  Va as ForkNode,
  gc as FormatConvertConfig,
  ui as FormatConvertNode,
  kd as GenerateConfig,
  Ai as GenerateNode,
  Za as GraphQueryNode,
  ti as GuardrailNode,
  Ph as ImageLineageGraph,
  Nh as ImageSourceConfig,
  oi as ImageSourceNode,
  _d as ImageWithBBoxOverlay,
  Ha as JoinNode,
  Ih as JudgmentApiProvider,
  Sh as JudgmentResultViewer,
  Th as JudgmentTrendChart,
  Qa as KnowledgeBaseNode,
  La as LLMNode,
  Xa as McpToolNode,
  ei as MemoryNode,
  Yi as NodePalette,
  Ud as ObjectsPanel,
  qi as PALETTE_ITEMS,
  vh as PendingApprovalsPage,
  Bd as PeoplePanel,
  ps as PipelineCanvas,
  Ho as PipelineEditorContext,
  uh as PipelineEditorPage,
  po as PipelineEditorProvider,
  _h as PipelineEditorServicesProvider,
  xh as PipelineRunComparePage,
  gh as PipelineRunDiff,
  fh as PipelineRunReplayPage,
  hh as PipelineRunsPage,
  oa as PipelineRunsProvider,
  yh as PipelineStatsPage,
  mh as PipelinesPage,
  ni as PolicyNode,
  ac as ResizeConfig,
  li as ResizeNode,
  wh as SaveConfig,
  ai as SaveNode,
  tc as ScatterConfig,
  si as ScatterNode,
  vc as SharpenConfig,
  mi as SharpenNode,
  Fd as TagsPanel,
  uc as TransformGeoConfig,
  di as TransformGeoNode,
  Ua as TransformNode,
  Da as TriggerNode,
  Td as VariationConfig,
  Ri as VariationNode,
  wm as VerdictPanel,
  id as VisionClassifyConfig,
  Ci as VisionClassifyNode,
  td as VisionConfig,
  pd as VisionDescribeConfig,
  Ii as VisionDescribeNode,
  Nd as VisionExtractTextConfig,
  $i as VisionExtractTextNode,
  ki as VisionNode,
  zd as VisionResultViewer,
  kh as VisionRunCard,
  xd as VisionTagConfig,
  Si as VisionTagNode,
  Cc as WatermarkConfig,
  hi as WatermarkNode,
  Mh as clearImageLineageCache,
  Ld as imageOverlayPropsFrom,
  Ei as nodeTypes,
  ph as recordRecentType,
  Pe as useEventStream,
  Na as useEventStreamContext,
  Eh as useImageLineage,
  Ae as useImageUrl,
  Rh as useJudgmentAggregates,
  Uo as useJudgmentApi,
  Ah as useJudgmentResults,
  me as useLatestStepForNode,
  qe as usePipelineEditor,
  so as usePipelineEditorServices,
  ft as usePipelineRuns,
  Se as useRetryFromStep,
  Ch as useVisionResults
};
