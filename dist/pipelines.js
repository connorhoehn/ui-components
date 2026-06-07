import { jsxs as o, jsx as e, Fragment as Y } from "react/jsx-runtime";
import so, { useState as S, useRef as se, useMemo as z, useEffect as te, memo as Vo, useCallback as D, useContext as lo, createContext as Wo } from "react";
import { useNavigate as _e, useParams as ht, Navigate as ft, useSearchParams as rn } from "react-router";
import { v as me, w as $e, q as Te, I as Bt, x as Le, u as xt, i as Jo, g as Ho, f as Xn, p as Ko, y as Go, J as an, t as co, e as Ot, S as Qt, N as Yo, T as sn, n as po, a as nt, z as uo, A as Fn, B as Rn, C as mo, D as Xo, E as Qo, F as Zo, b as ea, G as rt, H as ta, K as na, L as ot, M as Qn, O as ra, j as oa, o as ho, Q as Zt, R as aa, m as Zn, P as ia, U as sa, r as la, V as en, l as er, W as ca, k as da } from "./PipelineEditorServicesContext-CTTNH5_Y.js";
import { h as zh } from "./PipelineEditorServicesContext-CTTNH5_Y.js";
import { Handle as U, Position as F, useNodeConnections as pa, getSmoothStepPath as ua, EdgeLabelRenderer as ma, ReactFlowProvider as ha, useReactFlow as fa, useNodesState as fo, useEdgesState as xo, ReactFlow as go, Background as bo, BackgroundVariant as xa, Controls as yo, MiniMap as ga } from "@xyflow/react";
/* empty css               */
import { c as I } from "./cn-B6yFEsav.js";
import { u as jn, a as on } from "./ToastProvider-aHBNxMTO.js";
import "clsx";
import "tailwind-merge";
import { u as ba, F as ya, I as va, C as zn, T as Na, S as qn, a as wa } from "./FilterChip-DOtfeDVu.js";
import { M as We } from "./Modal-2jg4229_.js";
import "react-dom";
import "./WebSocketContext-DPGFyPeZ.js";
import { a as Me, u as ka } from "./EventStreamContext-CjzSHXy-.js";
import { E as Vh } from "./EventStreamContext-CjzSHXy-.js";
import { B as Ee } from "./Button-Qsbxqsl9.js";
import { I as pt, F as Ca } from "./FileUploadDrop-Cmz3XANg.js";
import { u as Vn } from "./IdentityContext-CLalsm_M.js";
import { B as Xe } from "./Banner-DKb3JiLs.js";
import { C as ie } from "./Chip-CAS9vOWq.js";
import { E as Fe } from "./EmptyState-PM9wTjxk.js";
import { C as tn } from "./ConfirmDialog-CNoxvYGu.js";
import { B as Ia, L as jt } from "./Chart-ByoxeiYX.js";
import { S as ln } from "./SkeletonCard-C89GWQ3p.js";
const Sa = "";
function tr(t, n) {
  const r = t.displayName;
  return typeof r == "string" && r.length > 0 ? r : n.slice(0, 8);
}
function $a({ value: t, onChange: n, placeholder: r, maxSelect: a }) {
  const { presenceUsers: i } = ba(), { idToken: s } = Vn(), [d, c] = S(""), [l, p] = S(!1), [u, f] = S(0), [h, x] = S([]), g = se(null), m = se(null), v = z(() => {
    const $ = new Set(t), A = [];
    for (const E of i)
      $.has(E.clientId) || ($.add(E.clientId), A.push({
        userId: E.clientId,
        displayName: tr(E.metadata, E.clientId)
      }));
    return A;
  }, [i, t]);
  te(() => {
    const $ = d.trim();
    if (!$ || !s) {
      x([]);
      return;
    }
    const A = new AbortController(), E = setTimeout(() => {
      const P = `${Sa}/api/profiles?q=${encodeURIComponent($)}&limit=20`;
      fetch(P, {
        headers: { Authorization: `Bearer ${s}` },
        signal: A.signal
      }).then((B) => B.ok ? B.json() : Promise.reject(new Error(`HTTP ${B.status}`))).then((B) => {
        x(Array.isArray(B.profiles) ? B.profiles : []);
      }).catch(() => {
      });
    }, 250);
    return () => {
      clearTimeout(E), A.abort();
    };
  }, [d, s]);
  const N = z(() => {
    const $ = new Set(t), A = [];
    for (const E of v)
      $.has(E.userId) || ($.add(E.userId), A.push(E));
    for (const E of h)
      $.has(E.userId) || ($.add(E.userId), A.push({
        userId: E.userId,
        displayName: E.displayName || E.userId.slice(0, 8)
      }));
    return A;
  }, [v, h, t]), y = z(() => {
    const $ = d.trim().toLowerCase();
    return $ ? N.filter(
      (A) => A.displayName.toLowerCase().includes($) || A.userId.toLowerCase().includes($)
    ) : N;
  }, [N, d]), w = typeof a == "number" && t.length >= a, b = ($) => {
    const A = $.trim();
    A && (t.includes(A) || w || (n([...t, A]), c(""), f(0)));
  }, k = ($) => {
    n(t.filter((A) => A !== $));
  }, C = ($) => {
    if ($.key === "ArrowDown")
      $.preventDefault(), p(!0), f((A) => Math.min(A + 1, Math.max(y.length - 1, 0)));
    else if ($.key === "ArrowUp")
      $.preventDefault(), f((A) => Math.max(A - 1, 0));
    else if ($.key === "Enter") {
      $.preventDefault();
      const A = y[u];
      A ? b(A.userId) : d.trim() && b(d.trim());
    } else $.key === "Escape" ? p(!1) : $.key === "Backspace" && !d && t.length > 0 && k(t[t.length - 1]);
  }, T = ($) => {
    const A = i.find((P) => P.clientId === $);
    if (A) return tr(A.metadata, $);
    const E = h.find((P) => P.userId === $);
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
          children: y.map(($, A) => /* @__PURE__ */ o(
            "div",
            {
              className: I(
                "py-1.5 px-2.5 text-[13px] text-[#374151] cursor-pointer",
                A === u ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              onMouseEnter: () => f(A),
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
const Ta = {
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
}, Aa = {
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
function Pn(t, n, r, a) {
  return !(!Ra(t, n) || !Pa(r, a));
}
function Ra(t, n) {
  const r = Ta[t];
  return r === "fork" ? Ma(n) : r.includes(n);
}
function Pa(t, n) {
  const r = Aa[t];
  return r === null ? !1 : r === "join" ? Ea(n) : r.includes(n);
}
function Ma(t) {
  return /^branch-(\d+)$/.exec(t) !== null;
}
function Ea(t) {
  return /^in-(\d+)$/.exec(t) !== null;
}
const Da = {
  idle: { card: "border border-[#d1d5db] bg-white", dot: "bg-[#d1d5db]" },
  pending: { card: "border border-dashed border-[#93c5fd] bg-[#eff6ff]", dot: "bg-[#93c5fd]" },
  running: { card: "border-2 border-[#2563eb] bg-[#eff6ff]", dot: "bg-[#2563eb]" },
  awaiting: { card: "border-2 border-[#f59e0b] bg-[#fffbeb]", dot: "bg-[#f59e0b]" },
  completed: { card: "border border-[#16a34a] bg-[#f0fdf4]", dot: "bg-[#16a34a]" },
  failed: { card: "border-2 border-[#dc2626] bg-[#fef2f2]", dot: "bg-[#dc2626]" },
  skipped: { card: "border border-dashed border-[#d1d5db] bg-[#f9fafb] opacity-50", dot: "bg-[#d1d5db]" }
};
function fe(t) {
  const { icon: n, subtitle: r, state: a, body: i, footer: s, selected: d, onRetry: c, hasBreakpoint: l, pausedAtBreakpoint: p, ariaLabel: u, children: f } = t, h = Da[a], x = jn(), [g, m] = S(!1), v = a === "failed" && typeof c == "function", N = (C) => {
    C.preventDefault(), C.stopPropagation(), c?.();
  }, y = !x && a === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !x && a === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", w = !!(i || s || v), b = !!(i || s), k = r ? `${r}, state: ${a}` : `Node, state: ${a}`;
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
        v && /* @__PURE__ */ e("div", { className: I(
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
            onClick: N,
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
function nr(t) {
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
function Oa(t) {
  return t.triggerType === "schedule" ? t.schedule ? `cron: ${t.schedule}` : "No schedule set" : t.triggerType === "webhook" ? t.webhookPath ? `POST ${t.webhookPath}` : "No path set" : t.triggerType.startsWith("document.") ? t.documentTypeId ? `Doc type: ${t.documentTypeId}` : "Any document" : "Fires on user click";
}
function _a(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = $e(), p = c === "failed" ? () => l(n) : void 0, u = `Trigger node, ${nr(r)}, state: ${c}`;
  return /* @__PURE__ */ e(
    fe,
    {
      icon: "▶",
      subtitle: nr(r),
      state: c,
      body: /* @__PURE__ */ e("span", { className: "italic", children: Oa(r) }),
      selected: a,
      onRetry: p,
      ariaLabel: u,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: /* @__PURE__ */ e(
        U,
        {
          type: "source",
          position: F.Right,
          id: "out",
          className: "!bg-slate-300 !w-2.5 !h-2.5"
        }
      )
    }
  );
}
function La(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const r = t.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
function Ba({ info: t }) {
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
function Ua(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = i?.llm, p = c === "running" && l?.streamOpened === !0 && (l?.tokensOut ?? 0) === 0, u = c === "running" && l !== void 0 && (l.tokensOut ?? 0) > 0, f = $e(), h = c === "failed" ? () => f(n) : void 0, x = /* @__PURE__ */ e("span", { className: "italic", children: La(r.userPromptTemplate) }), m = (l ? {
    response: l.response ?? "",
    tokensIn: l.tokensIn,
    tokensOut: l.tokensOut,
    streaming: u,
    streamOpening: p
  } : void 0) ?? r._llmResponse, v = m ? /* @__PURE__ */ e(Ba, { info: m }) : void 0, N = (r.systemPrompt ?? "").replace(/\s+/g, " ").trim(), y = N.length === 0 ? "no system prompt" : `system prompt: ${N.length > 60 ? `${N.slice(0, 60)}…` : N}`, w = `LLM node, ${r.model || r.provider}, ${y}, state: ${c}`;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🧠",
      subtitle: r.model || r.provider,
      state: c,
      body: x,
      footer: v,
      selected: a,
      onRetry: h,
      ariaLabel: w,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
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
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = $e(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "✨",
      subtitle: r.transformType,
      state: c,
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Fa(r.expression) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5" })
      ]
    }
  );
}
function za(t) {
  if (!t) return "—";
  const n = t.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function qa(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = $e(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "❓",
      subtitle: r.label || "condition",
      state: c,
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: za(r.expression) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "true", className: "!bg-green-600 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "false", className: "!bg-amber-500 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Va(t) {
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
function Wa(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = $e(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⚡",
      subtitle: r.actionType,
      state: c,
      body: /* @__PURE__ */ e("span", { className: "italic", children: Va(r) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Ja(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = $e(), p = c === "failed" ? () => l(n) : void 0, u = Math.max(2, Math.min(8, r.branchCount ?? 2)), f = Array.from({ length: u }, (h, x) => {
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        f.map((h, x) => {
          const g = (x + 1) / (u + 1) * 100;
          return /* @__PURE__ */ e(
            U,
            {
              type: "source",
              position: F.Right,
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
function Ha(t) {
  return t.mode === "all" ? "all" : t.mode === "any" ? "any" : `${t.n ?? 1} of many`;
}
function Ka(t) {
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
function Ga(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = $e(), p = c === "failed" ? () => l(n) : void 0, u = pa({ handleType: "target" }), f = Math.max(2, u.length + 1);
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⑃",
      subtitle: Ha(r),
      state: c,
      body: /* @__PURE__ */ e("span", { className: "italic", children: Ka(r.mergeStrategy) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        Array.from({ length: f }, (h, x) => {
          const g = (x + 1) / (f + 1) * 100;
          return /* @__PURE__ */ e(
            U,
            {
              type: "target",
              position: F.Left,
              id: `in-${x}`,
              className: "!bg-slate-300 !w-2.5 !h-2.5",
              style: { top: `${g}%` }
            },
            `in-${x}`
          );
        }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5" })
      ]
    }
  );
}
function Ya(t) {
  return t.type === "role" ? `@${t.value}` : t.value;
}
function Xa(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = $e(), p = c === "failed" ? () => l(n) : void 0, u = r.approvers ?? [], f = u.length, h = r.requiredCount ?? 0, x = `${f} approver${f === 1 ? "" : "s"}, ${h}/${f} required`, g = u.slice(0, 2), m = Math.max(0, u.length - 2), v = u.length === 0 ? /* @__PURE__ */ e("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: [
    g.map((N, y) => /* @__PURE__ */ e(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: Ya(N)
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
      body: v,
      selected: a,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "approved", className: "!bg-green-600 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "rejected", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Qa({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = $e(), c = n.agentName || n.agentId || "Not configured", l = `${n.protocol.toUpperCase()}${n.streaming ? " (streaming)" : ""}`;
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Za({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = $e(), c = n.toolName || "Not configured";
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function ei({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = $e(), c = n.knowledgeBaseId || "Not configured", l = `Top ${n.topK} chunks${n.scoreThreshold ? ` (≥${n.scoreThreshold})` : ""}`;
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function ti({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = $e(), c = n.graphId || "Not configured", l = n.query.length > 40 ? `${n.query.slice(0, 37)}...` : n.query;
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function ni({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = $e(), c = `${n.mode} ${n.scope}`, l = n.namespace ? `ns: ${n.namespace}` : "No namespace";
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function ri({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = $e(), c = n.label || n.guardrailId || "Not configured";
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "pass", className: "!top-[40%] !bg-green-600" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "block", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function oi({ id: t, data: n, selected: r }) {
  const a = me(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = n._state ?? i ?? "idle", d = $e(), c = n.label || n.action || "Not configured";
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "allow", className: "!top-[40%] !bg-green-600" }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "deny", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function ai({ id: t, data: n, selected: r }) {
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
      children: /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in" })
    }
  );
}
function ii(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Te(), p = r.imageId, u = p ? (
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
        U,
        {
          type: "source",
          position: F.Right,
          id: "out",
          className: "!w-2.5 !h-2.5 !bg-[#6b7280]"
        }
      )
    }
  );
}
function si(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = Te(), p = i?.images?.[0] ?? null, f = i?.output?.filename ?? null, h = p ? /* @__PURE__ */ o("div", { children: [
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
  ), v = "image:save", N = `Save node, template: ${x}, state: ${c}`;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⬇",
      subtitle: v,
      state: c,
      body: h,
      footer: m,
      selected: a,
      ariaLabel: N,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(
          U,
          {
            type: "target",
            position: F.Left,
            id: "in",
            className: "!w-2.5 !h-2.5 !bg-[#6b7280]"
          }
        ),
        /* @__PURE__ */ e(
          U,
          {
            type: "source",
            position: F.Right,
            id: "out",
            className: "!w-2.5 !h-2.5 !bg-[#6b7280]"
          }
        ),
        /* @__PURE__ */ e(
          U,
          {
            type: "source",
            position: F.Right,
            id: "error",
            className: "!w-2.5 !h-2.5 !bg-[#6b7280] !top-[75%]"
          }
        )
      ]
    }
  );
}
function li(t) {
  return t ? t.length > 40 ? `${t.slice(0, 37)}…` : t : "Not configured";
}
function ci(t) {
  const { id: n, data: r, selected: a } = t, i = me(n), s = i?.status === "cancelled" ? "failed" : i?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? s ?? r._state ?? "idle", l = i?.output, p = Array.isArray(l?.items) ? l.items.length : null, u = /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary break-all", children: li(r.itemsPath ?? "") }),
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
  ] }) : void 0, x = r.itemAlias ? ` · alias: ${r.itemAlias}` : "", g = r.maxConcurrency ? ` · max ${r.maxConcurrency}` : "", m = `scatter${x}${g}`, v = `Scatter node, path: ${r.itemsPath ?? "not set"}, state: ${c}`, N = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⑂",
      subtitle: m,
      state: c,
      body: u,
      footer: h,
      selected: a,
      ariaLabel: v,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: N }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: N })
      ]
    }
  );
}
function di(t) {
  const { id: n, data: r, selected: a } = t, i = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.width != null && r.height != null ? `→ ${r.width}×${r.height}` : r.width != null ? `→ ${r.width}w` : r.height != null ? `→ ${r.height}h` : null, f = p ? /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: x }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: x }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: x, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function pi(t) {
  switch (t.op) {
    case "rotate":
      return `rotate ${t.degrees}°`;
    case "flip":
      return "flip ↕";
    case "flop":
      return "flop ↔";
  }
}
function ui(t) {
  const { id: n, data: r, selected: a } = t, i = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.operations ?? [], f = u.length > 0 ? u.map(pi).join("  ›  ") : null, h = p ? /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function mi(t) {
  const n = t.format?.toUpperCase() ?? "?", r = t.lossless ? "lossless" : t.quality != null ? `q${t.quality}` : "";
  return r ? `${n} ${r}` : n;
}
function hi(t) {
  const { id: n, data: r, selected: a } = t, i = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.format ? mi(r) : null, f = p ? /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: x }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: x }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: x, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function fi(t) {
  const { id: n, data: r, selected: a } = t, i = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.sigma != null ? `σ ${r.sigma}` : null, f = p ? /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: x }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: x }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: x, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function xi(t) {
  const { id: n, data: r, selected: a } = t, i = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.gravity ?? "southeast", f = r.opacity != null ? `${Math.round(r.opacity * 100)}%` : "100%", h = p ? /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function gi(t) {
  if (!t) return null;
  const n = t.x + t.width, r = t.y + t.height;
  return `[${t.x},${t.y} → ${n},${r}]`;
}
function bi(t) {
  const { id: n, data: r, selected: a } = t, i = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = s?.output, f = gi(p?.bbox ?? u?.bbox), h = p ? /* @__PURE__ */ e(
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: m }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: m })
      ]
    }
  );
}
function yi(t) {
  const { id: n, data: r, selected: a } = t, i = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e("div", { className: "flex gap-1 w-full", children: /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: m }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: m }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: m, style: { top: "75%" } })
      ]
    }
  );
}
function vi(t) {
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
function Ni(t) {
  const { id: n, data: r, selected: a } = t, i = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.layers ?? [], f = p ? /* @__PURE__ */ e(
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
      children: u.map((m, v) => /* @__PURE__ */ e(
        "span",
        {
          className: "text-[10px] font-mono bg-surface-hover border border-border text-text-secondary rounded px-1 py-0.5",
          children: vi(m)
        },
        v
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: g, style: { top: "75%" } })
      ]
    }
  );
}
function wi(t) {
  return t === 0 ? "$0" : t < 1e-3 ? "<$0.001" : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function ki(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const r = t.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
const Ci = Vo(function({ info: n }) {
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
            wi(n.costUsd)
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
function Ii(t) {
  const { id: n, data: r, selected: a } = t, i = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = $e(), u = l === "failed" ? () => p(n) : void 0, f = /* @__PURE__ */ e("span", { className: "italic text-text-secondary text-[13px]", children: ki(r.userPrompt) }), h = s?.vision, x = l === "running" && h !== void 0 && h.tokensSeen > 0 && !h.analyzed, g = l === "running" && h !== void 0 && h.tokensSeen === 0 && !h.failure, m = h ? {
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
  } : void 0, v = m ? /* @__PURE__ */ e(Ci, { info: m }) : void 0, N = r.model || "claude-sonnet-4-6", y = r.outputSchema ? "extract" : "caption", w = `Vision node, model ${N}, mode ${y}, state: ${l}`, b = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "📷",
      subtitle: `${N} · ${y}`,
      state: l,
      body: f,
      footer: v,
      selected: a,
      onRetry: u,
      ariaLabel: w,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: b }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: b })
      ]
    }
  );
}
function Si(t) {
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function $i(t) {
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Ti(t) {
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Ai(t) {
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: x }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: x }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: x, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Ri(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
function Pi(t) {
  const { id: n, data: r, selected: a } = t, i = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e(
    Bt,
    {
      src: i(p.imageId),
      alt: "Generate output",
      aspectRatio: "auto",
      className: "w-24 h-16 border border-border",
      "data-testid": "generate-output-thumb"
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
      "data-testid": "generate-placeholder",
      children: Ri(r.prompt)
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Mi(t) {
  const { id: n, data: r, selected: a } = t, i = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = r.numVariations ?? 1, h = /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ o("span", { className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary mb-1", children: [
      "×",
      u,
      " variation",
      u !== 1 ? "s" : ""
    ] }),
    p ? /* @__PURE__ */ e(
      Bt,
      {
        src: i(p.imageId),
        alt: "Variation output",
        aspectRatio: "auto",
        className: "w-24 h-16 border border-border",
        "data-testid": "variation-output-thumb"
      }
    ) : /* @__PURE__ */ e(
      "div",
      {
        className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center text-[11px] text-text-tertiary",
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: g }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Ei(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
function Di(t) {
  const { id: n, data: r, selected: a } = t, i = Te(), s = me(n), d = s?.status === "cancelled" ? "failed" : s?.status, l = (r._state && r._state !== "idle" ? r._state : void 0) ?? d ?? r._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e(
    Bt,
    {
      src: i(p.imageId),
      alt: "Edit output",
      aspectRatio: "auto",
      className: "w-24 h-16 border border-border",
      "data-testid": "edit-prompt-output-thumb"
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      className: "w-24 h-16 rounded border border-dashed border-border bg-surface-inset flex items-center justify-center px-2 text-center text-[11px] text-text-tertiary",
      "data-testid": "edit-prompt-placeholder",
      children: Ei(r.prompt)
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
        /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: h }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: h }),
        /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "error", className: h, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
const Oi = {
  trigger: _a,
  llm: Ua,
  transform: ja,
  condition: qa,
  action: Wa,
  fork: Ja,
  join: Ga,
  approval: Xa,
  agent: Qa,
  "mcp-tool": Za,
  "knowledge-base": ei,
  "graph-query": ti,
  memory: ni,
  guardrail: ri,
  policy: oi,
  "ag-ui-output": ai,
  "image-source": ii,
  "image:save": si,
  scatter: ci,
  "image:resize": di,
  "image:transform": ui,
  "image:format-convert": hi,
  "image:sharpen": fi,
  "image:watermark": xi,
  "image:crop": bi,
  "image:adjust-bw": yi,
  "image:adjust-layer": Ni,
  "image:vision-analyze": Ii,
  "image:vision-classify": Si,
  "image:vision-describe": $i,
  "image:vision-tag": Ti,
  "image:vision-extract-text": Ai,
  "image:generate": Pi,
  "image:variation": Mi,
  "image:edit-prompt": Di
};
function _i(t) {
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
function Li({
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
  const u = c ?? {}, f = jn(), [h] = ua({
    sourceX: n,
    sourceY: r,
    targetX: a,
    targetY: i,
    sourcePosition: s,
    targetPosition: d
  }), x = _i(u.state), g = x.animate && !f, m = p ? "#646cff" : x.stroke, v = p ? 2.5 : x.strokeWidth;
  return /* @__PURE__ */ o(Y, { children: [
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
        strokeWidth: v,
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
    u.label ? /* @__PURE__ */ e(ma, { children: /* @__PURE__ */ e(
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
function mt(t, n, r) {
  const a = se(n);
  a.current = n, te(() => {
    if (r === !1) return;
    const i = (s) => {
      t.current && !t.current.contains(s.target) && a.current();
    };
    return document.addEventListener("mousedown", i), () => document.removeEventListener("mousedown", i);
  }, [t, r]);
}
const Bi = [
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
function Ui(t, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return t.type.toLowerCase().includes(r) || t.name.toLowerCase().includes(r) || t.description.toLowerCase().includes(r);
}
function Fi({
  anchor: t,
  flowPosition: n,
  disabledTypes: r = [],
  onClose: a,
  onInsert: i
}) {
  const [s, d] = S(""), [c, l] = S(0), p = se(null), u = se(null), f = z(() => new Set(r), [r]), h = z(
    () => Bi.filter((m) => !f.has(m.type) && Ui(m, s)),
    [f, s]
  );
  if (te(() => {
    l((m) => m >= h.length ? 0 : m);
  }, [h.length]), te(() => {
    if (t) {
      const m = setTimeout(() => u.current?.focus(), 0);
      return () => clearTimeout(m);
    }
  }, [t]), mt(p, a, !!t), !t) return null;
  const x = (m) => {
    const v = h[m];
    !v || !n || (i(v.type, n), a());
  }, g = (m) => {
    if (m.key === "ArrowDown") {
      if (m.preventDefault(), h.length === 0) return;
      l((v) => (v + 1) % h.length);
    } else if (m.key === "ArrowUp") {
      if (m.preventDefault(), h.length === 0) return;
      l((v) => (v - 1 + h.length) % h.length);
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
        ] }) : h.map((m, v) => {
          const N = v === c;
          return /* @__PURE__ */ o(
            "div",
            {
              role: "option",
              "aria-selected": N,
              onMouseEnter: () => l(v),
              onMouseDown: (y) => {
                y.preventDefault(), x(v);
              },
              className: I(
                "flex items-center gap-2.5 px-3 py-2 cursor-pointer font-inherit",
                N ? "bg-[#f1f5f9]" : "bg-transparent"
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
function ji({
  addNode: t,
  addEdge: n,
  updateNodeData: r,
  getDefinition: a
}) {
  te(() => {
  }, [t, n, r, a]);
}
function zi({
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
  te(() => {
    const f = u.current;
    if (!f) return;
    const h = (g) => {
      const m = f.querySelector(
        `.react-flow__node[data-id="${CSS.escape(g)}"]`
      );
      return m ? ((m.querySelector('[data-pipeline-node="true"]') ?? m).focus(), !0) : !1;
    }, x = (g) => {
      if (Jn(g.target)) return;
      const m = document.activeElement, v = !!m && f.contains(m);
      if (g.key === "Tab") {
        if (!v || !t || t.nodes.length === 0) return;
        const N = ss(t);
        if (N.length === 0) return;
        const w = m?.closest(".react-flow__node")?.getAttribute("data-id") ?? null, b = w !== null ? N.indexOf(w) : -1, k = g.shiftKey ? -1 : 1, C = b === -1 ? g.shiftKey ? N.length - 1 : 0 : (b + k + N.length) % N.length, T = N[C];
        h(T) && g.preventDefault();
        return;
      }
      if (v && !g.altKey) {
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
          d((N) => {
            const y = N.filter((w) => w.selected);
            if (y.length === 0) return N;
            for (const w of y) i(w.id);
            return N.filter((w) => !w.selected);
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
          const N = l([p.current]);
          N.length > 0 && r(N[0]);
          return;
        }
        if ((g.metaKey || g.ctrlKey) && g.key === "d" && n) {
          g.preventDefault();
          const N = l([n]);
          N.length > 0 && r(N[0]);
          return;
        }
        if (g.key === "ArrowUp" || g.key === "ArrowDown" || g.key === "ArrowLeft" || g.key === "ArrowRight") {
          if (g.preventDefault(), g.stopPropagation(), !g.shiftKey || !n) return;
          const N = 8, y = g.key === "ArrowLeft" ? -N : g.key === "ArrowRight" ? N : 0, w = g.key === "ArrowUp" ? -N : g.key === "ArrowDown" ? N : 0;
          s((b) => {
            const k = b.map(
              (T) => T.id === n ? {
                ...T,
                position: {
                  x: T.position.x + y,
                  y: T.position.y + w
                }
              } : T
            ), C = k.find((T) => T.id === n);
            return C && c([{ id: C.id, position: C.position }]), k;
          });
        }
      }
    };
    return f.addEventListener("keydown", x), () => f.removeEventListener("keydown", x);
  }, [t, n, r, a, i, s, d, c, l, p, u]);
}
function qi({
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
function Vi({
  nodeMenu: t,
  breakpoints: n,
  showBreakpointOption: r,
  onFilterLog: a,
  onCopyNodeId: i,
  onDuplicate: s,
  onToggleBreakpoint: d,
  onDismiss: c
}) {
  te(() => {
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
const Rt = [
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
], Wi = Rt.flatMap((t) => t.items.map((n) => ({ type: n.type, name: n.name }))), Ji = Rt.map((t) => t.name), Wn = "pipeline.palette.recents", Hi = 5, rr = "pipeline.palette.compact";
function Mn() {
  if (typeof window > "u") return [];
  try {
    const t = window.localStorage.getItem(Wn);
    if (!t) return [];
    const n = JSON.parse(t);
    return Array.isArray(n) ? n : [];
  } catch {
    return [];
  }
}
function Ki(t) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(Wn, JSON.stringify(t));
    } catch {
    }
}
function gh(t) {
  const n = Mn().filter((a) => a !== t), r = [t, ...n].slice(0, Hi);
  Ki(r);
}
const vo = "pipeline.palette.collapsed.";
function Gi(t) {
  if (typeof window > "u") return !1;
  try {
    return window.localStorage.getItem(vo + t) === "true";
  } catch {
    return !1;
  }
}
function Yi(t, n) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(vo + t, String(n));
    } catch {
    }
}
function Xi(t, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return t.name.toLowerCase().includes(r) || t.type.toLowerCase().includes(r) || t.description.toLowerCase().includes(r);
}
function or({ expanded: t }) {
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
function Qi({ disabledTypes: t = [] }) {
  const [n, r] = S(""), [a, i] = S(/* @__PURE__ */ new Set()), [s, d] = S(null), [c, l] = S(() => Mn()), [p, u] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem(rr) === "true";
    } catch {
      return !1;
    }
  }), [f, h] = S(() => {
    const P = {};
    for (const B of Rt)
      P[B.name] = Gi(B.name);
    return P;
  }), x = z(() => new Set(t), [t]);
  te(() => {
    const P = (B) => {
      B.key === Wn && l(Mn());
    };
    return window.addEventListener("storage", P), () => window.removeEventListener("storage", P);
  }, []), te(() => {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(rr, String(p));
      } catch {
      }
  }, [p]);
  const g = D((P) => {
    i((B) => {
      const V = new Set(B);
      return V.has(P) ? V.delete(P) : V.add(P), V;
    });
  }, []), m = D(() => {
    r(""), i(/* @__PURE__ */ new Set());
  }, []), v = D((P) => {
    h((B) => {
      const V = { ...B, [P]: !B[P] };
      return Yi(P, V[P]), V;
    });
  }, []), N = z(() => {
    const P = /* @__PURE__ */ new Map();
    for (const B of Rt)
      for (const V of B.items) P.set(V.type, V);
    return P;
  }, []), y = z(
    () => c.map((P) => N.get(P)).filter(Boolean),
    [c, N]
  ), w = z(() => Rt.map((P) => {
    const B = a.size > 0 && !a.has(P.name) ? [] : P.items.filter((V) => Xi(V, n));
    return { ...P, items: B };
  }).filter((P) => P.items.length > 0), [n, a]), b = z(() => {
    const P = /* @__PURE__ */ new Set(), B = [];
    if (!n && a.size === 0)
      for (const V of y)
        B.push(V), P.add(V.type);
    for (const V of w)
      for (const ae of V.items)
        P.has(ae.type) || (B.push(ae), P.add(ae.type));
    return B;
  }, [y, w, n, a]), k = se(b);
  te(() => {
    k.current = b;
  }, [b]);
  const C = w.length === 0 && (n !== "" || a.size > 0), T = (P) => (B) => {
    if (x.has(P.type)) {
      B.preventDefault();
      return;
    }
    B.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: P.type })
    ), B.dataTransfer.effectAllowed = "move";
  }, $ = (P, B) => {
    const V = x.has(P.type), ae = s === P.type && !V, K = B !== null && B < 9 ? B + 1 : null;
    return p ? /* @__PURE__ */ o(
      "div",
      {
        draggable: !V,
        onDragStart: T(P),
        onMouseEnter: () => d(P.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-8 box-border my-px mx-2 px-2 flex items-center gap-2 rounded font-[inherit]",
          V ? "cursor-not-allowed opacity-45" : "cursor-grab",
          ae ? "bg-slate-100" : "bg-transparent"
        ),
        title: V ? `${P.name} is already placed` : K ? `${P.description} — press ${K}` : P.description,
        "data-node-type": P.type,
        "data-disabled": V || void 0,
        "data-testid": `palette-item-${P.type}`,
        children: [
          /* @__PURE__ */ e("span", { className: "text-base leading-none w-5 text-center shrink-0", "aria-hidden": !0, children: P.icon }),
          /* @__PURE__ */ e("span", { className: I("text-[12px] font-medium text-slate-800 truncate", V && "line-through"), children: P.name }),
          K !== null && /* @__PURE__ */ e(
            "kbd",
            {
              "data-testid": `palette-shortcut-${P.type}`,
              className: I(
                "ml-auto text-[10px] font-semibold font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                V && "opacity-50"
              ),
              children: K
            }
          )
        ]
      },
      P.type
    ) : /* @__PURE__ */ o(
      "div",
      {
        draggable: !V,
        onDragStart: T(P),
        onMouseEnter: () => d(P.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-11 box-border my-0.5 mx-2 py-1.5 px-2.5 flex items-center gap-2.5 rounded-md border border-transparent font-[inherit]",
          V ? "cursor-not-allowed opacity-45" : "cursor-grab",
          ae ? "bg-slate-50" : "bg-transparent"
        ),
        title: V ? `${P.name} is already placed` : K ? `${P.description} — press ${K}` : P.description,
        "data-node-type": P.type,
        "data-disabled": V || void 0,
        "data-testid": `palette-item-${P.type}`,
        children: [
          /* @__PURE__ */ e("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: P.icon }),
          /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ o("div", { className: I("text-[13px] font-semibold text-slate-900 flex items-center gap-1.5", V && "line-through"), children: [
              /* @__PURE__ */ e("span", { className: "truncate", children: P.name }),
              K !== null && /* @__PURE__ */ e(
                "kbd",
                {
                  "data-testid": `palette-shortcut-${P.type}`,
                  className: I(
                    "text-[10px] font-semibold font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                    V && "opacity-50"
                  ),
                  children: K
                }
              )
            ] }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-slate-500 truncate", children: V ? "Placed" : P.description })
          ] })
        ]
      },
      P.type
    );
  }, A = y.length > 0 && !n && a.size === 0;
  let E = 0;
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
                onChange: (P) => r(P.target.value),
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
                onClick: () => u((P) => !P),
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
              children: Ji.map((P) => /* @__PURE__ */ e(
                ya,
                {
                  size: "xs",
                  active: a.has(P),
                  onClick: () => g(P),
                  "data-testid": `palette-chip-${P}`,
                  children: P
                },
                P
              ))
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto py-1", "data-testid": "palette-scroll", children: [
          A && /* @__PURE__ */ o("div", { "data-testid": "palette-recents", children: [
            /* @__PURE__ */ o(
              "button",
              {
                type: "button",
                onClick: () => v("__recents__"),
                className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-slate-400 hover:text-slate-600 transition-colors font-[inherit]",
                "aria-expanded": !f.__recents__,
                children: [
                  /* @__PURE__ */ e(or, { expanded: !f.__recents__ }),
                  "Recently used"
                ]
              }
            ),
            !f.__recents__ && /* @__PURE__ */ e("div", { children: y.map((P) => {
              const B = E++;
              return $(P, B);
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
          ) : w.map((P) => {
            const B = !!f[P.name];
            return /* @__PURE__ */ o("div", { "data-testid": `palette-category-${P.name}`, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => v(P.name),
                  className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-slate-400 hover:text-slate-600 transition-colors font-[inherit]",
                  "aria-expanded": !B,
                  children: [
                    /* @__PURE__ */ e(or, { expanded: !B }),
                    P.name
                  ]
                }
              ),
              !B && /* @__PURE__ */ e("div", { children: P.items.map((V) => {
                const ae = E++;
                return $(V, ae);
              }) })
            ] }, P.name);
          })
        ] }),
        /* @__PURE__ */ e("div", { className: "py-2 px-3 border-t border-slate-200 text-[10px] text-slate-400 font-[inherit] shrink-0", children: "Press 1–9 to insert at center" })
      ]
    }
  );
}
function Zi({
  definition: t,
  addNode: n,
  screenToFlowPosition: r,
  containerRef: a
}) {
  return te(() => {
    const i = (s) => {
      if (!Jn(s.target) && !(s.metaKey || s.ctrlKey || s.altKey) && /^[1-8]$/.test(s.key)) {
        const d = Number(s.key) - 1, c = Wi[d];
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
const es = 280, ts = 120, ns = 40, rs = 40;
function os(t, n) {
  const r = es, a = ts, i = ns, s = rs;
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
      const N = v.shift(), y = p.get(N), w = d.get(N) ?? [];
      for (const b of w)
        p.has(b) || (p.set(b, y + 1), v.push(b));
    }
  }
  const u = /* @__PURE__ */ new Map();
  let f = -1;
  for (const v of t.nodes) {
    const N = p.get(v.id);
    N !== void 0 && (u.has(N) || u.set(N, []), u.get(N).push(v.id), N > f && (f = N));
  }
  for (const v of u.values())
    v.sort();
  const h = t.nodes.filter((v) => !p.has(v.id)).map((v) => v.id).sort(), x = f >= 0 ? f + 1 : 0;
  h.length > 0 && u.set(x, h);
  const g = [], m = [...u.keys()].sort((v, N) => v - N);
  for (const v of m) {
    const N = u.get(v), y = N.length, w = i + v * r;
    for (let b = 0; b < y; b++) {
      const k = s + (b - y / 2) * a;
      g.push({ id: N[b], position: { x: w, y: k } });
    }
  }
  return g;
}
function as({
  definition: t,
  setPositions: n,
  fitView: r
}) {
  const a = D(() => {
    r({ padding: 0.15, duration: 500 });
  }, [r]), i = D(() => {
    if (!t) return;
    const s = os(t);
    s.length !== 0 && (n(s), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => r({ padding: 0.15, duration: 500 })) : r({ padding: 0.15, duration: 500 }));
  }, [t, n, r]);
  return { handleFitView: a, handleAutoArrange: i };
}
function is({
  definition: t,
  setPositions: n,
  fitView: r
}) {
  const { handleFitView: a, handleAutoArrange: i } = as({
    definition: t,
    setPositions: n,
    fitView: r
  });
  return te(() => {
    const s = (d) => {
      const c = d.target;
      if (!(c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable)) && d.shiftKey && (d.key === "A" || d.key === "a")) {
        if (d.metaKey || d.ctrlKey || d.altKey) return;
        d.preventDefault(), i();
      }
    };
    return window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s);
  }, [i]), /* @__PURE__ */ o(Y, { children: [
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
function Jn(t) {
  if (!t || !(t instanceof HTMLElement)) return !1;
  const n = t.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || t.isContentEditable);
}
function ss(t) {
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
const ls = { animated: Li }, cs = Oi;
function ds(t) {
  return {
    id: t.id,
    type: t.type,
    position: t.position,
    data: { ...t.data, nodeType: t.type }
  };
}
function ps(t) {
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
function us({ onFilterLog: t, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: a, replayNodeClasses: i, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c }) {
  const {
    definition: l,
    addNode: p,
    setPositions: u,
    addEdge: f,
    removeEdge: h,
    removeNode: x,
    duplicateNodes: g,
    selectedNodeId: m,
    setSelectedNodeId: v,
    updateNodeData: N
  } = Le(), { screenToFlowPosition: y, fitView: w } = fa();
  ji({
    addNode: p,
    addEdge: f,
    updateNodeData: N,
    getDefinition: () => l
  });
  const [b, k, C] = fo([]), [T, $, A] = xo([]), [E, P] = S(!0), [B, V] = S(!0), ae = se(null), K = se(null), [ee, O] = S(null), [R, J] = S(null), H = D(
    (X, oe) => {
      X.preventDefault(), J({ nodeId: oe.id, x: X.clientX, y: X.clientY });
    },
    []
  ), L = D(() => {
    R && (t?.(R.nodeId), J(null));
  }, [R, t]), q = D(() => {
    if (!R) return;
    const X = R.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(X).catch(() => {
    }), J(null);
  }, [R]), W = D(() => {
    R && (d?.(R.nodeId), J(null));
  }, [R, d]), G = D(() => {
    if (!R) return;
    const X = g([R.nodeId]);
    X.length > 0 && v(X[0]), J(null);
  }, [R, g, v]), de = D(() => J(null), []);
  te(() => {
    if (!l) {
      k([]), $([]);
      return;
    }
    k((X) => {
      const oe = new Map(X.map((pe) => [pe.id, pe]));
      return l.nodes.map((pe) => {
        const xe = oe.get(pe.id), Ae = ds(pe);
        return s && s.size > 0 && (Ae.data._hasBreakpoint = s.has(pe.id)), c && (Ae.data._pausedAtBreakpoint = pe.id === c), xe ? { ...xe, ...Ae, selected: xe.selected } : Ae;
      });
    }), $(() => l.edges.map(ps));
  }, [l, s, c, k, $]), te(() => {
    if (!n) {
      r?.(null);
      return;
    }
    k(
      (X) => X.map((oe) => ({
        ...oe,
        className: oe.id === n ? "node-error" : oe.className?.replace("node-error", "").trim() || void 0
      }))
    ), requestAnimationFrame(() => {
      const X = ae.current;
      if (!X) return;
      const oe = X.querySelector(
        `.react-flow__node[data-id="${CSS.escape(n)}"]`
      );
      if (!oe) {
        r?.(null);
        return;
      }
      const pe = oe.getBoundingClientRect();
      r?.({ x: pe.right, y: pe.top + pe.height / 2 });
    });
  }, [n, k, r]), te(() => {
    i && k(
      (X) => X.map((oe) => {
        const pe = i[oe.id] ?? "", Ae = [oe.id === n ? "node-error" : "", pe].filter(Boolean).join(" ") || void 0;
        let Ie;
        pe === "node-replay-active" ? Ie = "running" : pe === "node-replay-completed" ? Ie = "completed" : pe === "node-replay-failed" && (Ie = "failed");
        const Je = { ...oe.data };
        return Ie ? Je._state = Ie : Je._state = "idle", { ...oe, className: Ae, data: Je };
      })
    );
  }, [i, n, k]), te(() => {
    a && $(
      (X) => X.map((oe) => {
        const pe = a[oe.id];
        if (!pe) return oe;
        const xe = oe.data ?? {};
        return xe.state === pe ? oe : { ...oe, data: { ...xe, state: pe } };
      })
    );
  }, [a, $]);
  const j = D(
    (X) => {
      C(X);
      const oe = [], pe = [];
      for (const xe of X)
        xe.type === "position" && xe.position && xe.dragging === !1 ? oe.push({ id: xe.id, position: xe.position }) : xe.type === "remove" && pe.push(xe.id);
      oe.length && u(oe);
      for (const xe of pe) x(xe);
    },
    [C, u, x]
  ), le = D(
    (X) => {
      A(X);
      for (const oe of X)
        oe.type === "remove" && h(oe.id);
    },
    [A, h]
  ), ve = D(
    (X) => {
      if (!l || !X.source || !X.target) return;
      const oe = l.nodes.find((Ie) => Ie.id === X.source), pe = l.nodes.find((Ie) => Ie.id === X.target);
      if (!oe || !pe) return;
      const xe = X.sourceHandle ?? "out", Ae = X.targetHandle ?? "in";
      Pn(
        oe.type,
        xe,
        pe.type,
        Ae
      ) && f({
        source: X.source,
        sourceHandle: xe,
        target: X.target,
        targetHandle: Ae
      });
    },
    [l, f]
  ), De = D(
    (X) => {
      if (!l || !X.source || !X.target) return !1;
      const oe = l.nodes.find((xe) => xe.id === X.source), pe = l.nodes.find((xe) => xe.id === X.target);
      return !oe || !pe ? !1 : Pn(
        oe.type,
        X.sourceHandle ?? "out",
        pe.type,
        X.targetHandle ?? "in"
      );
    },
    [l]
  ), Ke = D(
    (X, oe) => {
      v(oe.id);
    },
    [v]
  ), Be = D(() => {
    v(null);
  }, [v]), Pe = D(
    (X) => {
      const oe = X.target;
      if (!oe || !(oe.classList.contains("react-flow__pane") || oe.classList.contains("react-flow__renderer") || oe.classList.contains("react-flow__viewport") || oe.classList.contains("react-flow"))) return;
      X.preventDefault();
      const xe = y({ x: X.clientX, y: X.clientY });
      O({
        anchor: { x: X.clientX, y: X.clientY },
        flowPosition: xe
      });
    },
    [y]
  ), je = D(() => O(null), []), Ue = D(
    (X, oe) => {
      p(X, oe);
    },
    [p]
  ), ze = z(() => l ? l.nodes.some((X) => X.type === "trigger") ? ["trigger"] : [] : [], [l]), { handleDragOver: ke, handleDrop: he } = qi({
    addNode: p,
    screenToFlowPosition: y
  });
  te(() => {
    const X = (oe) => {
      if (!Jn(oe.target) && !(oe.metaKey || oe.ctrlKey || oe.altKey)) {
        if (oe.key === "m" || oe.key === "M") {
          P((pe) => !pe);
          return;
        }
        if (oe.key === "c" || oe.key === "C") {
          V((pe) => !pe);
          return;
        }
      }
    };
    return window.addEventListener("keydown", X), () => window.removeEventListener("keydown", X);
  }, []), zi({
    definition: l,
    selectedNodeId: m,
    setSelectedNodeId: v,
    removeNode: x,
    removeDefEdge: h,
    setNodes: k,
    setEdges: $,
    setPositions: u,
    duplicateNodes: g,
    clipboardRef: K,
    containerRef: ae
  });
  const re = D((X) => {
    switch (X.data?._state) {
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
      onDragOver: ke,
      onDrop: he,
      onDoubleClick: Pe,
      children: [
        /* @__PURE__ */ o(
          go,
          {
            nodes: b,
            edges: T,
            nodeTypes: cs,
            edgeTypes: ls,
            onNodesChange: j,
            onEdgesChange: le,
            onConnect: ve,
            isValidConnection: De,
            onNodeClick: Ke,
            onNodeContextMenu: H,
            onPaneClick: Be,
            fitView: !0,
            snapToGrid: !0,
            snapGrid: [16, 16],
            edgesFocusable: !0,
            defaultEdgeOptions: { type: "smoothstep" },
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ e(
                bo,
                {
                  variant: xa.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              B ? /* @__PURE__ */ e(
                yo,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              E ? /* @__PURE__ */ e(
                ga,
                {
                  position: "bottom-right",
                  pannable: !0,
                  zoomable: !0,
                  className: "!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]",
                  maskColor: "rgba(15, 23, 42, 0.04)",
                  nodeColor: re,
                  nodeStrokeColor: "#e2e8f0"
                }
              ) : null
            ]
          }
        ),
        ee ? /* @__PURE__ */ e(
          Fi,
          {
            anchor: ee.anchor,
            flowPosition: ee.flowPosition,
            disabledTypes: ze,
            onClose: je,
            onInsert: Ue
          }
        ) : null,
        /* @__PURE__ */ e(
          Zi,
          {
            definition: l,
            addNode: p,
            screenToFlowPosition: y,
            containerRef: ae
          }
        ),
        /* @__PURE__ */ e(
          is,
          {
            definition: l,
            setPositions: u,
            fitView: w
          }
        ),
        R ? /* @__PURE__ */ e(
          Vi,
          {
            nodeMenu: R,
            breakpoints: s,
            showBreakpointOption: !!d,
            onFilterLog: L,
            onCopyNodeId: q,
            onDuplicate: G,
            onToggleBreakpoint: W,
            onDismiss: de
          }
        ) : null
      ]
    }
  );
}
function ms({ onFilterLog: t, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: a, replayNodeClasses: i, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c } = {}) {
  return /* @__PURE__ */ e(ha, { children: /* @__PURE__ */ e(
    us,
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
const ar = {
  LLMError: { bg: "#fef2f2", fg: "#dc2626" },
  TimeoutError: { bg: "#fff7ed", fg: "#ea580c" },
  NetworkError: { bg: "#fffbeb", fg: "#d97706" },
  ValidationError: { bg: "#fefce8", fg: "#ca8a04" },
  RegistryConflict: { bg: "#faf5ff", fg: "#9333ea" },
  UnknownError: { bg: "#f1f5f9", fg: "#475569" }
};
function hs(t) {
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
function fs({ error: t, anchor: n, onDismiss: r, onRetry: a }) {
  const [i, s] = S(!1), [d, c] = S(!1), l = t.errorCategory ?? "UnknownError", p = ar[l] ?? ar.UnknownError, u = D(async () => {
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
              children: hs(l)
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
function xs(t, n) {
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
function No(t) {
  const n = [], r = [], { nodes: a, edges: i } = t, s = /* @__PURE__ */ new Map();
  for (const d of a)
    s.set(d.id, d);
  return gs(a, n), bs(a, i, n), ys(i, s, n), vs(a, n), Ts(a, i, n), As(a, i, r), Rs(a, i, r), Ps(a, i, r), Ms(a, i, r), r.push(...Es(t)), r.push(...Ds(t)), r.push(...Os(t)), r.push(..._s(t)), r.push(...Ls(t)), r.push(...Bs(t)), r.push(...Us(t)), r.push(...Fs(t)), r.push(...js(t)), r.push(...zs(t)), {
    errors: n,
    warnings: r,
    isValid: n.length === 0,
    canPublish: n.length === 0
  };
}
function gs(t, n) {
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
function bs(t, n, r) {
  const a = xs(t, n);
  a !== null && r.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: a
  });
}
function ys(t, n, r) {
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
    Pn(
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
function vs(t, n) {
  for (const r of t)
    switch (r.data.type) {
      case "llm":
        Ns(r.id, r.data, n);
        break;
      case "transform":
        ws(r.id, r.data, n);
        break;
      case "condition":
        ks(r.id, r.data, n);
        break;
      case "action":
        Cs(r.id, r.data, n);
        break;
      case "fork":
        Is(r.id, r.data, n);
        break;
      case "join":
        Ss(r.id, r.data, n);
        break;
      case "approval":
        $s(r.id, r.data, n);
        break;
    }
}
function Ns(t, n, r) {
  n.provider || Ve(r, t, "provider"), (!n.model || !n.model.trim()) && Ve(r, t, "model"), (!n.systemPrompt || !n.systemPrompt.trim()) && Ve(r, t, "systemPrompt"), (!n.userPromptTemplate || !n.userPromptTemplate.trim()) && Ve(r, t, "userPromptTemplate");
}
function ws(t, n, r) {
  n.transformType || Ve(r, t, "transformType"), (!n.expression || !n.expression.trim()) && Ve(r, t, "expression");
}
function ks(t, n, r) {
  (!n.expression || !n.expression.trim()) && Ve(r, t, "expression");
}
function Cs(t, n, r) {
  n.actionType || Ve(r, t, "actionType");
}
function Is(t, n, r) {
  (typeof n.branchCount != "number" || n.branchCount < 2) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: t,
    field: "branchCount"
  });
}
function Ss(t, n, r) {
  n.mode || Ve(r, t, "mode"), n.mergeStrategy || Ve(r, t, "mergeStrategy"), n.mode === "n_of_m" && (typeof n.n != "number" || n.n < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: t,
    field: "n"
  });
}
function $s(t, n, r) {
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
function Ts(t, n, r) {
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
function Ve(t, n, r) {
  t.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: `Missing required field '${r}'.`,
    nodeId: n,
    field: r
  });
}
function As(t, n, r) {
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
function Rs(t, n, r) {
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
function Ps(t, n, r) {
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
function Ms(t, n, r) {
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
function Qe(t) {
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
function Es(t) {
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
      message: `${c.data.type} node '${Qe(c)}' has no error handler — failures will terminate the run.`,
      nodeId: c.id
    });
  return n;
}
function Ds(t) {
  const n = [];
  for (const r of t.nodes)
    r.data.type === "llm" && (typeof r.data.maxTokens != "number" || r.data.maxTokens <= 0) && n.push({
      code: "LLM_NO_MAX_TOKENS",
      severity: "warning",
      message: `LLM node '${Qe(r)}' has no maxTokens — responses could run long / expensive.`,
      nodeId: r.id,
      field: "maxTokens"
    });
  return n;
}
function Os(t) {
  const n = [];
  for (const r of t.nodes)
    r.data.type === "approval" && (typeof r.data.timeoutMs != "number" || r.data.timeoutMs <= 0) && n.push({
      code: "UNGUARDED_APPROVAL_TIMEOUT",
      severity: "warning",
      message: `Approval '${Qe(r)}' has no timeout — the run could block indefinitely.`,
      nodeId: r.id,
      field: "timeoutMs"
    });
  return n;
}
function _s(t) {
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
function Ls(t) {
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
function Bs(t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of t.nodes) {
    const i = Qe(a), s = r.get(i) ?? [];
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
function Us(t) {
  const n = [], r = /\{\{[^}]+\}\}/;
  for (const a of t.nodes) {
    if (a.data.type !== "llm") continue;
    const { temperature: i, userPromptTemplate: s } = a.data;
    typeof i != "number" || i <= 0.8 || !s || !r.test(s) || n.push({
      code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
      severity: "warning",
      message: `LLM '${Qe(a)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
      nodeId: a.id
    });
  }
  return n;
}
function Fs(t) {
  return t.triggerBinding?.event !== "schedule" ? [] : t.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function js(t) {
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
      message: `Condition '${Qe(a)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: a.id,
      field: "false"
    });
  }
  return n;
}
function zs(t) {
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
      message: `Fork '${Qe(c)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
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
      message: `Join '${Qe(c)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: c.id
    });
  }
  return n;
}
function qs(t, n) {
  return `${t}${n}`;
}
const Vs = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, Ws = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function wo(t) {
  return t.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const Js = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function Hs(t) {
  const n = Ws[t.type] ?? "■", r = Js[t.type] ?? t.type.charAt(0).toUpperCase() + t.type.slice(1);
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
  return wo(a ? `${i}<br/>${a}` : i);
}
function Ks(t, n) {
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
function Gs(t) {
  return !t || t === "out" ? null : t;
}
function Ys(t) {
  const n = ["flowchart TD"], r = {}, a = /* @__PURE__ */ new Map();
  for (const i of t.nodes) {
    const s = Vs[i.type] ?? "n", d = r[s] = (r[s] ?? 0) + 1;
    a.set(i.id, qs(s, d));
  }
  for (const i of t.nodes) {
    const s = a.get(i.id);
    if (!s) continue;
    const d = Ks(i.type, Hs(i));
    n.push(`  ${s}${d}`);
  }
  for (const i of t.edges) {
    const s = a.get(i.source), d = a.get(i.target);
    if (!s || !d) continue;
    const c = Gs(i.sourceHandle);
    c ? n.push(`  ${s} --"${wo(c)}"--> ${d}`) : n.push(`  ${s} --> ${d}`);
  }
  return n.join(`
`);
}
function ir(t) {
  return JSON.stringify(t, (n, r) => {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const a = Object.keys(r).sort(), i = {};
      for (const s of a) i[s] = r[s];
      return i;
    }
    return r;
  });
}
function sr(t) {
  const n = /* @__PURE__ */ new Map();
  for (const r of t) n.set(r.id, r);
  return n;
}
function lr(t) {
  return new Set(t.edges.map((n) => n.id));
}
function Xs(t, n) {
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
  const r = sr(t.nodes), a = sr(n.nodes), i = [], s = [], d = [];
  for (const [y, w] of r) {
    const b = a.get(y);
    if (!b) {
      i.push({ node: w, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const k = ir(w.data) !== ir(b.data), C = w.position.x !== b.position.x || w.position.y !== b.position.y;
    (k || C) && d.push({ node: w, dataChanged: k, positionChanged: C });
  }
  for (const [y, w] of a)
    r.has(y) || s.push({ node: w, dataChanged: !0, positionChanged: !1 });
  const c = lr(t), l = lr(n);
  let p = 0, u = 0;
  for (const y of c) l.has(y) || p++;
  for (const y of l) c.has(y) || u++;
  const f = t.name !== n.name, h = (t.icon ?? "") !== (n.icon ?? ""), x = new Set(t.tags ?? []), g = new Set(n.tags ?? []), m = [], v = [];
  for (const y of x) g.has(y) || m.push(y);
  for (const y of g) x.has(y) || v.push(y);
  const N = m.length > 0 || v.length > 0;
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
    tagsChanged: N,
    tagsAdded: m,
    tagsRemoved: v
  };
}
const Qs = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function Zs(t) {
  return t.data.type === "condition" && t.data.label ? t.data.label : t.data.type === "llm" ? t.data.model : t.data.type === "action" ? t.data.actionType : t.data.type === "trigger" ? t.data.triggerType : t.type.charAt(0).toUpperCase() + t.type.slice(1);
}
function cn(t, n, r) {
  const a = t.node, i = Qs[a.type] ?? "■", s = n !== "removed" && !!r;
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
        /* @__PURE__ */ e("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: Zs(a) }),
        n === "modified" && t.positionChanged ? /* @__PURE__ */ e("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]", children: "moved" }) : null
      ]
    },
    `${n}-${t.node.id}`
  );
}
function el({
  open: t,
  onClose: n,
  currentDef: r,
  publishedDef: a,
  onJumpToNode: i
}) {
  const s = z(
    () => Xs(r, a),
    [r, a]
  ), d = (u) => {
    i && i(u), n();
  }, c = a !== null, l = r.version, p = r.publishedVersion;
  return /* @__PURE__ */ o(
    We,
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
        r.publishedVersion === void 0 ? /* @__PURE__ */ e("p", { className: "m-0 text-[13px] text-text-secondary", children: "This pipeline has never been published." }) : c ? /* @__PURE__ */ o(Y, { children: [
          /* @__PURE__ */ o("div", { className: "flex gap-3 flex-wrap", children: [
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Added (",
                s.addedNodes.length,
                ")"
              ] }),
              s.addedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.addedNodes.map((u) => cn(u, "added", d))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Removed (",
                s.removedNodes.length,
                ")"
              ] }),
              s.removedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.removedNodes.map((u) => cn(u, "removed", void 0))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Modified (",
                s.modifiedNodes.length,
                ")"
              ] }),
              s.modifiedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.modifiedNodes.map((u) => cn(u, "modified", d))
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
function tl({ open: t, onClose: n }) {
  return null;
}
const dn = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", cr = "px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function nl(t) {
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
    currentDef: v,
    publishedDef: N,
    onJumpToNode: y,
    simPanelOpen: w,
    onSimPanelClose: b
  } = t;
  return /* @__PURE__ */ o(Y, { children: [
    /* @__PURE__ */ e(
      We,
      {
        open: n,
        onClose: r,
        title: "Publish pipeline?",
        maxWidth: 420,
        footer: /* @__PURE__ */ o(Y, { children: [
          /* @__PURE__ */ e("button", { onClick: r, className: dn, children: "Cancel" }),
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
          i ? /* @__PURE__ */ o(Y, { children: [
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
      We,
      {
        open: l,
        onClose: p,
        title: "Delete pipeline?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(Y, { children: [
          /* @__PURE__ */ e("button", { onClick: p, className: dn, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: u, className: cr, children: "Delete" })
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
      We,
      {
        open: f,
        onClose: h,
        title: "Clear run history?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(Y, { children: [
          /* @__PURE__ */ e("button", { onClick: h, className: dn, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: x, className: cr, children: "Clear history" })
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
      el,
      {
        open: g,
        onClose: m,
        currentDef: v,
        publishedDef: N,
        onJumpToNode: y
      }
    ),
    /* @__PURE__ */ e(
      tl,
      {
        open: w,
        onClose: b
      }
    )
  ] });
}
function rl({ runId: t, visible: n }) {
  const [r, a] = S(/* @__PURE__ */ new Map()), i = se(null), s = se(!0), d = se(null);
  te(() => {
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
      const v = m?.runId;
      if (!t || v !== t) return;
      const N = m?.stepId;
      if (N) {
        if (g === "pipeline.llm.stream.opened")
          a((y) => {
            const w = new Map(y);
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
        else if (g === "pipeline.llm.token") {
          const y = m?.token;
          if (y === void 0) return;
          a((w) => {
            const b = new Map(w), k = b.get(N);
            if (k) {
              const C = {
                ...k,
                tokens: [...k.tokens, y],
                text: k.text + y,
                active: !0
              };
              b.set(N, C);
            } else
              b.set(N, {
                stepId: N,
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
            const k = new Map(b), C = k.get(N), T = C ? Date.now() - C.startedAt : 0, $ = T > 1e3 ? `${(T / 1e3).toFixed(1)}s` : `${T}ms`, A = `${N}: ${y ?? "?"} tokens in, ${w ?? "?"} tokens out (${$})`;
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
  Me("*", p), te(() => {
    l();
  }, [r, l]);
  const u = D((x) => {
    a((g) => {
      const m = new Map(g), v = m.get(x);
      return v && m.set(x, { ...v, collapsed: !v.collapsed }), m;
    });
  }, []), f = z(() => {
    for (const x of r.values())
      if (x.active) return !0;
    return !1;
  }, [r]), h = z(() => Array.from(r.values()), [r]);
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
              !x.collapsed && /* @__PURE__ */ o(Y, { children: [
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
function Pt(t, n) {
  const r = new Blob([n], { type: "application/json" }), a = URL.createObjectURL(r), i = document.createElement("a");
  i.href = a, i.download = t, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(a);
}
function Mt(t, n) {
  if (!n) return "step";
  const r = t?.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function ol(t) {
  const n = xt(), { toast: r } = on(), { definition: a, selectedNodeId: i, setSelectedNodeId: s } = Le(), d = se(n.runs);
  te(() => {
    d.current = n.runs;
  }, [n.runs]);
  const c = se(a);
  te(() => {
    c.current = a;
  }, [a]);
  const l = D(
    (M) => M ? d.current[M]?.pipelineId === t : !1,
    [t]
  ), [p, u] = S(null), [f, h] = S(null), x = D(() => {
    u(null), h(null);
  }, []), g = D(
    (M) => {
      h(M);
    },
    []
  ), m = D(
    (M) => {
      "eventType" in M || M.pipelineId === t && (r("Run started", { type: "info" }), u(null), h(null));
    },
    [t, r]
  ), v = D(
    (M) => {
      if ("eventType" in M || !l(M.runId)) return;
      const _ = Math.round(M.durationMs / 100) / 10;
      r(`Run completed in ${_}s`, { type: "success" });
    },
    [l, r]
  ), N = D(
    (M) => {
      if ("eventType" in M || !l(M.runId)) return;
      const _ = M.error.nodeId, ce = Mt(c.current, _);
      r(`Run failed at ${ce}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => s(_)
      }), u(M.error);
    },
    [l, s, r]
  ), y = D(
    (M) => {
      "eventType" in M || l(M.runId) && r("Run cancelled", { type: "warning" });
    },
    [l, r]
  ), w = D(
    (M) => {
      if ("eventType" in M || !l(M.runId)) return;
      const _ = M.stepId, ce = Mt(c.current, _);
      r(`Approval requested on "${ce}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => s(_)
      });
    },
    [l, s, r]
  );
  Me("pipeline.run.started", m), Me("pipeline.run.completed", v), Me("pipeline.run.failed", N), Me("pipeline.run.cancelled", y), Me("pipeline.approval.requested", w);
  const [b, k] = S(null);
  te(() => {
    if (n.activeRunIds.length > 0) {
      const M = n.activeRunIds[n.activeRunIds.length - 1];
      M !== b && k(M);
      return;
    }
    if (!b) {
      const M = Object.values(n.runs).sort(
        (_, ce) => ce.startedAt.localeCompare(_.startedAt)
      );
      M.length > 0 && k(M[0].id);
    }
  }, [n.activeRunIds, n.runs, b]);
  const C = b ? n.runs[b] : void 0, T = !!C && (C.status === "running" || C.status === "pending" || C.status === "awaiting_approval"), [$, A] = S(/* @__PURE__ */ new Set()), [E, P] = S(null), [B, V] = S(null), [ae, K] = S(null), [ee, O] = S(0), [R, J] = S(!1), [H, L] = S(null), q = D(
    (M, _) => {
      _ === null ? (V(null), K(null)) : (V(_), K(M));
    },
    []
  ), W = D((M) => {
    A((_) => {
      const ce = new Set(_);
      return ce.has(M) ? ce.delete(M) : ce.add(M), ce;
    });
  }, []), G = D(async () => {
    if ($.size !== 0)
      try {
        const M = await n.triggerDebugRun(
          t,
          Array.from($)
        );
        k(M);
      } catch (M) {
        console.error("[PipelineEditor] triggerDebugRun failed", M);
      }
  }, [$, n, t]), de = D(() => {
    E && (n.resolveBreakpoint(E.runId, E.stepId, "continue"), P(null));
  }, [E, n]), j = D(() => {
    E && (n.resolveBreakpoint(E.runId, E.stepId, "step_over"), P(null));
  }, [E, n]), le = D(() => {
    E && (n.resolveBreakpoint(E.runId, E.stepId, "resume_all"), P(null));
  }, [E, n]), ve = D(async () => {
    if (!(!E || !B || ae !== E.stepId) && Object.keys(B).length !== 0) {
      J(!0);
      try {
        await Jo(
          t,
          E.runId,
          E.stepId,
          { mode: "merge", values: B }
        ), V(null), K(null), O((M) => M + 1), n.resolveBreakpoint(E.runId, E.stepId, "continue"), P(null);
      } catch (M) {
        if (M instanceof Ho)
          r(`Patch rejected: ${M.reason}`, { type: "error", durationMs: 8e3 });
        else if (M instanceof Xn)
          r(`Apply failed (HTTP ${M.status})`, { type: "error", durationMs: 6e3 });
        else {
          const _ = M instanceof Error ? M.message : String(M);
          r(`Apply failed: ${_}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        J(!1);
      }
    }
  }, [E, B, ae, t, n, r]), De = D(
    async (M) => {
      if (E) {
        L(M);
        try {
          await Ko(
            t,
            E.runId,
            E.stepId,
            M
          ), r("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (_) {
          if (_ instanceof Xn)
            r(`Revert failed (HTTP ${_.status})`, { type: "error", durationMs: 6e3 });
          else {
            const ce = _ instanceof Error ? _.message : String(_);
            r(`Revert failed: ${ce}`, { type: "error", durationMs: 6e3 });
          }
        } finally {
          L(null);
        }
      }
    },
    [E, t, r]
  ), Ke = D(
    (M) => {
      if ("eventType" in M || !l(M.runId)) return;
      P({ runId: M.runId, stepId: M.stepId });
      const _ = Mt(c.current, M.stepId);
      r(`Paused at breakpoint: ${_}`, { type: "warning", durationMs: 6e3 });
    },
    [l, r]
  );
  Me("pipeline.step.breakpoint", Ke);
  const Be = D(
    (M) => {
      "eventType" in M || E && E.runId === M.runId && P(null);
    },
    [E]
  );
  Me("pipeline.run.completed", Be), Me("pipeline.run.failed", Be), Me("pipeline.run.cancelled", Be);
  const Pe = D(() => {
    p?.nodeId && (n.retryFromStep(p.nodeId), x());
  }, [p, n, x]), je = a?.status === "published", Ue = !T && !je, ze = T ? "Cancel the active run" : je ? "Start a new run" : "Publish the pipeline to enable runs", [ke, he] = S(!1), [re, X] = S({}), [oe, pe] = S(!1), [xe, Ae] = S("config");
  te(() => {
    i !== null && Ae("config");
  }, [i]);
  const Ie = D(async (M) => {
    pe(!0);
    try {
      const _ = await n.triggerRun(t, M);
      k(_), Ae("runs"), r(`Pipeline triggered — run ${_.slice(0, 8)}…`, { type: "success" });
    } catch (_) {
      console.error("[PipelineEditor] triggerRun failed", _), r(`Trigger failed: ${_.message}`, { type: "error" });
    } finally {
      pe(!1);
    }
  }, [n, t, r]), Je = D(async () => {
    if (T && b) {
      n.cancelRun(b);
      return;
    }
    Ue || Ie();
  }, [T, b, Ue, n, Ie]), Ft = D(() => {
    he(!1), Ie(re);
  }, [Ie, re]);
  return {
    currentRunId: b,
    setCurrentRunId: k,
    activeError: p,
    setActiveError: u,
    errorNodeAnchor: f,
    handleDismissError: x,
    handleErrorNodePosition: g,
    handleRetryFromError: Pe,
    handleRunClick: Je,
    handleTriggerInputSubmit: Ft,
    isRunActive: T,
    runDisabled: Ue,
    runTitle: ze,
    isTriggering: oe,
    triggerInputOpen: ke,
    setTriggerInputOpen: he,
    triggerInputValues: re,
    setTriggerInputValues: X,
    breakpoints: $,
    handleToggleBreakpoint: W,
    handleDebugRunClick: G,
    pausedBreakpoint: E,
    handleBreakpointContinue: de,
    handleBreakpointStepOver: j,
    handleBreakpointResumeAll: le,
    handleApplyAndContinue: ve,
    handleRevertPatch: De,
    applyingPatch: R,
    revertingPatchId: H,
    dirtyPatch: B,
    dirtyPatchStepId: ae,
    handleContextEditBufferChange: q,
    resetEditBufferKey: ee,
    sidebarTab: xe,
    setSidebarTab: Ae
  };
}
function al({
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
const pn = {
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-green-50 text-green-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600"
};
function il({
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
  onViewVersions: v,
  onRevert: N,
  onToggleShowTags: y,
  showTags: w,
  onViewRunHistory: b,
  onClearRunHistory: k,
  onSimPanelOpen: C,
  onDelete: T
}) {
  const $ = _e(), { rename: A, setIcon: E, setSelectedNodeId: P } = Le(), [B, V] = S(!1), [ae, K] = S(""), ee = se(null);
  te(() => {
    B && (K(n.name ?? ""), setTimeout(() => ee.current?.focus(), 0));
  }, [B, n.name]);
  const O = () => {
    const re = ae.trim();
    re && re !== n.name && A(re), V(!1);
  }, R = n ? No(n) : null;
  (R?.errors.length ?? 0) > 0;
  const J = n.status === "published", H = r ? { label: "Saving…", variant: "info" } : a ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, L = n.status === "published" ? { label: `v${n.version} · Published`, variant: "success" } : typeof n.publishedVersion == "number" ? { label: `v${n.version} · Draft (pub v${n.publishedVersion})`, variant: "warning" } : { label: `v${n.version} · Draft`, variant: "neutral" }, q = R ? R.errors.length > 0 ? { label: `✗ ${R.errors.length} error${R.errors.length === 1 ? "" : "s"}`, variant: "danger" } : R.warnings.length > 0 ? { label: `⚠ ${R.warnings.length} warning${R.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [W, G] = S(!1), de = se(null);
  mt(de, () => G(!1), W);
  const j = R ? [...R.errors, ...R.warnings] : [], le = (re) => {
    re && (P(re), G(!1));
  }, ve = n.nodes.filter((re) => re.type !== "trigger").length, De = l ? Object.values(l.steps).filter(
    (re) => re.status === "completed" || re.status === "skipped"
  ).length : 0, Be = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), Pe = i && l ? { text: `Running (${De}/${ve} steps) · ${Be}s`, variant: "running" } : l?.status === "completed" ? { text: `Completed in ${l.durationMs ? (l.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : l?.status === "failed" ? { text: `Failed at ${Mt(n, l.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, je = {
    running: "bg-blue-50 text-blue-600",
    success: "bg-green-50 text-green-600",
    error: "bg-red-50 text-red-600"
  }, Ue = i ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [ze, ke] = S(!1), he = se(null);
  return mt(he, () => ke(!1), ze), /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "h-11 shrink-0 flex items-center gap-2.5 px-3",
        "border-b border-border bg-surface",
        "sticky top-0 z-5"
      ),
      children: [
        /* @__PURE__ */ e(
          pt,
          {
            onClick: () => $("/pipelines"),
            "aria-label": "Back to pipelines",
            title: "Back to pipelines",
            children: "←"
          }
        ),
        /* @__PURE__ */ e(
          va,
          {
            value: n.icon ?? "🔀",
            onChange: E
          }
        ),
        B ? /* @__PURE__ */ e(
          "input",
          {
            ref: ee,
            value: ae,
            onChange: (re) => K(re.target.value),
            onBlur: O,
            onKeyDown: (re) => {
              re.key === "Enter" && O(), re.key === "Escape" && (K(n.name), V(!1));
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
            onClick: () => V(!0),
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
              pn[H.variant]
            ),
            "data-testid": "save-status",
            children: H.label
          }
        ),
        /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              pn[L.variant]
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
              onClick: () => G((re) => !re),
              className: I(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
                "cursor-pointer border-none",
                pn[q.variant]
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
              children: j.map((re, X) => /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => le(re.nodeId),
                  className: I(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    re.nodeId ? "cursor-pointer" : "cursor-default",
                    X < j.length - 1 && "border-b border-border"
                  ),
                  children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: I(
                          "font-bold text-xs",
                          re.severity === "error" ? "text-red-600" : "text-amber-600"
                        ),
                        children: re.severity === "error" ? "✗" : "⚠"
                      }
                    ),
                    /* @__PURE__ */ o("span", { className: "flex-1 text-xs", children: [
                      /* @__PURE__ */ e("div", { className: "font-semibold", children: re.code }),
                      /* @__PURE__ */ e("div", { className: "text-text-secondary", children: re.message }),
                      re.nodeId && /* @__PURE__ */ e("div", { className: "mt-0.5 text-[11px] text-primary", children: "Jump to node →" })
                    ] })
                  ]
                },
                `${re.code}-${X}`
              ))
            }
          )
        ] }),
        Pe.variant !== "none" && /* @__PURE__ */ o(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap",
              je[Pe.variant]
            ),
            "data-testid": "run-status-indicator",
            children: [
              Pe.variant === "running" && /* @__PURE__ */ e("span", { className: "inline-block w-3 h-3 border-2 border-slate-200 border-t-primary rounded-full animate-spin" }),
              Pe.variant === "success" && "✓ ",
              Pe.variant === "error" && "✗ ",
              Pe.text
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
            title: J ? "Already published at this version" : "Publish pipeline to enable runs",
            disabled: J,
            className: I(
              "px-3 py-1.5 text-[13px] font-semibold border-none rounded-md font-inherit shrink-0",
              J ? "bg-surface-hover text-text-tertiary cursor-default opacity-70" : "bg-green-600 text-white cursor-pointer"
            ),
            "data-testid": "publish-button",
            children: J ? "Published" : "Publish"
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
            ] }) : Ue
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
            pt,
            {
              onClick: () => ke((re) => !re),
              "aria-label": "More actions",
              "data-testid": "overflow-menu-btn",
              children: "⋯"
            }
          ),
          ze && /* @__PURE__ */ e(
            al,
            {
              isPublished: J,
              showTags: w,
              onDuplicate: () => {
                g(), ke(!1);
              },
              onCopyMermaid: () => {
                m(), ke(!1);
              },
              onViewVersions: () => {
                v(), ke(!1);
              },
              onRevert: () => {
                N(), ke(!1);
              },
              onToggleShowTags: () => {
                y(), ke(!1);
              },
              onViewRunHistory: () => {
                b(), ke(!1);
              },
              onClearRunHistory: () => {
                k(), ke(!1);
              },
              onSimPanelOpen: () => {
                C(), ke(!1);
              },
              onDelete: () => {
                T(), ke(!1);
              },
              hasPublishedVersion: typeof n.publishedVersion == "number"
            }
          )
        ] })
      ]
    }
  );
}
const sl = 12;
function Se(t) {
  return I("text-xs", {
    string: "text-[#a6e3a1]",
    number: "text-[#fab387]",
    boolean: "text-[#cba6f7]",
    null: "text-[#6c7086]",
    bracket: "text-[#9399b2]"
  }[t]);
}
function _t({
  data: t,
  depth: n = 0,
  highlightKeys: r,
  keyName: a,
  isHighlighted: i = !1
}) {
  const [s, d] = S(n > 2);
  if (n > sl)
    return /* @__PURE__ */ e("span", { className: Se("string"), children: "[max depth]" });
  const c = i || a != null && r?.has(a);
  if (t === null)
    return /* @__PURE__ */ e("span", { className: I(Se("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "null" });
  if (t === void 0)
    return /* @__PURE__ */ e("span", { className: I(Se("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "undefined" });
  if (typeof t == "boolean")
    return /* @__PURE__ */ e("span", { className: I(Se("boolean"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(t) });
  if (typeof t == "number")
    return /* @__PURE__ */ e("span", { className: I(Se("number"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(t) });
  if (typeof t == "string") {
    const l = t.length > 120 ? t.slice(0, 120) + "..." : t;
    return /* @__PURE__ */ o("span", { className: I(Se("string"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: [
      '"',
      l,
      '"'
    ] });
  }
  if (Array.isArray(t))
    return t.length === 0 ? /* @__PURE__ */ e("span", { className: Se("bracket"), children: "[]" }) : /* @__PURE__ */ o("span", { children: [
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
      /* @__PURE__ */ e("span", { className: Se("bracket"), children: "[" }),
      s ? /* @__PURE__ */ o("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        t.length,
        " items"
      ] }) : /* @__PURE__ */ e("div", { className: "pl-4", children: t.map((l, p) => /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
        /* @__PURE__ */ o("span", { className: "text-[#6c7086] text-[11px]", children: [
          p,
          ": "
        ] }),
        /* @__PURE__ */ e(_t, { data: l, depth: n + 1, highlightKeys: r }),
        p < t.length - 1 && /* @__PURE__ */ e("span", { className: Se("bracket"), children: "," })
      ] }, p)) }),
      /* @__PURE__ */ e("span", { className: Se("bracket"), children: "]" })
    ] });
  if (typeof t == "object") {
    const l = Object.entries(t);
    return l.length === 0 ? /* @__PURE__ */ e("span", { className: Se("bracket"), children: "{}" }) : /* @__PURE__ */ o("span", { children: [
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
      /* @__PURE__ */ e("span", { className: Se("bracket"), children: "{" }),
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
          /* @__PURE__ */ e("span", { className: Se("bracket"), children: ": " }),
          /* @__PURE__ */ e(
            _t,
            {
              data: u,
              depth: n + 1,
              highlightKeys: n === 0 ? r : void 0,
              keyName: p,
              isHighlighted: h
            }
          ),
          f < l.length - 1 && /* @__PURE__ */ e("span", { className: Se("bracket"), children: "," })
        ] }, p);
      }) }),
      /* @__PURE__ */ e("span", { className: Se("bracket"), children: "}" })
    ] });
  }
  return /* @__PURE__ */ e("span", { className: Se("string"), children: String(t) });
}
function ll({
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
function cl(t) {
  return typeof t == "string" ? "string" : typeof t == "number" ? "number" : typeof t == "boolean" ? "boolean" : "object";
}
function dl({ k: t, initial: n, onCommit: r, onError: a, onFocus: i }) {
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
function pl({
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
  const u = z(() => {
    const h = /* @__PURE__ */ new Set([
      ...Object.keys(t),
      ...Object.keys(n)
    ]);
    return Array.from(h);
  }, [t, n]), f = "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono";
  return /* @__PURE__ */ o("div", { "data-testid": "context-edit-table", children: [
    u.map((h) => {
      const x = h in n, g = x ? n[h] : t[h], m = cl(g), v = x;
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
              m === "boolean" ? /* @__PURE__ */ o(
                "select",
                {
                  "data-testid": `context-edit-input-${h}`,
                  value: String(g),
                  onChange: (N) => c(h, N.target.value === "true"),
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
                  onChange: (N) => {
                    const y = N.target.value === "" ? 0 : Number(N.target.value);
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
                  onChange: (N) => c(h, N.target.value),
                  onFocus: () => d(h, g),
                  className: f
                }
              ) : /* @__PURE__ */ e(
                dl,
                {
                  k: h,
                  initial: g,
                  onCommit: (N) => c(h, N),
                  onError: (N) => p(h, N),
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
function ul(t, n, r) {
  const a = { ...t }, i = { ...a.steps ?? {} };
  return i[n] = r, a.steps = i, r && typeof r == "object" && !Array.isArray(r) && Object.assign(a, r), a;
}
function ml(t, n) {
  const r = [];
  for (const a of Object.keys(n))
    a in t || r.push(a);
  return r;
}
function hl(t) {
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
      l = ul(a, i.nodeId, d);
    else {
      l = { ...a };
      const u = {
        ...l.steps ?? {}
      };
      u[i.nodeId] = d, l.steps = u;
    }
    const p = ml(s, l);
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
function fl(t, n) {
  const [r, a] = S(/* @__PURE__ */ new Map()), [i, s] = S(
    /* @__PURE__ */ new Map()
  ), d = se(null);
  te(() => {
    const h = t?.id ?? null;
    h !== d.current && (d.current = h, a(/* @__PURE__ */ new Map()), s(/* @__PURE__ */ new Map()));
  }, [t?.id]);
  const c = D(
    (h) => {
      if (!h || typeof h != "object") return;
      const { eventType: x, payload: g } = h;
      if (!g || typeof g != "object") return;
      const m = g, v = m.runId;
      if (!(!t?.id || v !== t.id)) {
        if (x === "pipeline.llm.prompt") {
          const N = m.stepId, y = m.prompt;
          N && y && a((w) => {
            const b = new Map(w);
            return b.set(N, y), b;
          });
        }
        if (x === "pipeline.run.checkpoint" || x === "pipeline.run.checkpointed" || x === "pipeline:run:checkpoint" || x === "pipeline:run:checkpointed") {
          const N = m.context, y = m.stepId;
          N && y && s((w) => {
            const b = new Map(w);
            return b.set(y, N), b;
          });
        }
      }
    },
    [t?.id]
  );
  Me("*", c);
  const l = z(() => t ? hl(t) : [], [t]), p = z(() => l.map((h) => {
    const x = r.get(h.stepId), g = i.get(h.stepId);
    return {
      ...h,
      resolvedPrompt: h.resolvedPrompt || x,
      outputContext: g ?? h.outputContext
    };
  }), [l, r, i]), u = z(() => n ? p.find((h) => h.stepId === n) ?? null : p[p.length - 1] ?? null, [p, n]), f = z(() => u ? new Set(u.newKeys) : /* @__PURE__ */ new Set(), [u]);
  return { enrichedSnapshots: p, activeSnapshot: u, newKeysSet: f };
}
function dr({ attempt: t, label: n }) {
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
      /* @__PURE__ */ e(_t, { data: t.output, depth: 0 })
    ] })
  ] });
}
function xl({
  run: t,
  activeStepId: n,
  onStepSelect: r,
  editable: a = !1,
  onEditBufferChange: i,
  resetEditBufferKey: s
}) {
  const [d, c] = S("input"), [l, p] = S(0), [u, f] = S(!1), [h, x] = S({}), [g, m] = S(null), [v, N] = S({}), [y, w] = S({
    key: "",
    value: ""
  }), { enrichedSnapshots: b, activeSnapshot: k, newKeysSet: C } = fl(t, n), T = k?.resolvedPrompt != null, $ = k?.stepExecution.attempts, A = ($?.length ?? 0) >= 2;
  te(() => {
    d === "prompt" && !T && c("input"), d === "attempts" && !A && c("input");
  }, [d, T, A]), te(() => {
    p(0);
  }, [n]);
  const E = !!(t && t.status === "paused_at_breakpoint" && n && (t.currentStepIds?.includes(n) || k?.stepExecution.status === "running" || k?.stepExecution.status === "awaiting" || k?.stepExecution.status === "pending")), P = !!a && !!E;
  te(() => {
    P ? g && g !== n && (x({}), m(null), N({})) : (u && f(!1), Object.keys(h).length > 0 && x({}), g && m(null), Object.keys(v).length > 0 && N({}));
  }, [P, n]), te(() => {
    s !== void 0 && (x({}), m(null), N({}), w({ key: "", value: "" }));
  }, [s]), te(() => {
    !P || !n || i && (Object.keys(h).length === 0 ? i(n, null) : i(n, h));
  }, [h, P, n]);
  const B = D(
    (R, J) => {
      m(n), x((H) => R in H ? H : { ...H, [R]: J });
    },
    [n]
  ), V = D(
    (R, J) => {
      m(n), x((H) => ({ ...H, [R]: J })), N((H) => {
        if (!(R in H)) return H;
        const L = { ...H };
        return delete L[R], L;
      });
    },
    [n]
  ), ae = D((R) => {
    x((J) => {
      if (!(R in J)) return J;
      const H = { ...J };
      return delete H[R], H;
    }), N((J) => {
      if (!(R in J)) return J;
      const H = { ...J };
      return delete H[R], H;
    });
  }, []), K = D((R, J) => {
    N((H) => ({ ...H, [R]: J }));
  }, []), ee = D(() => {
    x({}), m(null), N({}), w({ key: "", value: "" });
  }, []), O = D(() => {
    const R = y.key.trim();
    if (!R) return;
    let J = y.value;
    const H = y.value;
    if (H.trim().length > 0)
      try {
        J = JSON.parse(H);
      } catch {
        J = H;
      }
    V(R, J), w({ key: "", value: "" });
  }, [y, V]);
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
      { id: "attempts", label: `Attempts (${$?.length})`, show: A }
    ].filter((R) => R.show).map((R) => /* @__PURE__ */ e(
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
      /* @__PURE__ */ e(
        ll,
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
          P && /* @__PURE__ */ o("div", { className: "flex gap-1.5 items-center", children: [
            u && Object.keys(h).length > 0 && /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: ee,
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
                  const R = !u;
                  f(R), R || ee();
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
        Object.keys(k.inputContext).length === 0 && !(P && u) ? /* @__PURE__ */ e("div", { className: "text-[#6c7086] text-xs italic", children: "No input context (first step or no upstream output)" }) : P && u ? /* @__PURE__ */ e(
          pl,
          {
            inputContext: k.inputContext,
            buffer: h,
            parseErrors: v,
            newKeyDraft: y,
            setNewKeyDraft: w,
            onCommitNewKey: O,
            onBeginEditKey: B,
            onSetValue: V,
            onRemoveKey: ae,
            onParseError: K
          }
        ) : /* @__PURE__ */ e(
          _t,
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
        /* @__PURE__ */ e(_t, { data: k.output }),
        k.newKeys.length > 0 && /* @__PURE__ */ o("div", { className: "mt-3", children: [
          /* @__PURE__ */ e("div", { className: "text-[10px] text-[#a6e3a1] font-semibold uppercase mb-1", children: "New context keys added" }),
          /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: k.newKeys.map((R) => /* @__PURE__ */ e(
            "span",
            {
              className: "px-1.5 py-0.5 bg-[rgba(166,227,161,0.15)] text-[#a6e3a1] rounded-sm text-[11px] font-semibold font-mono",
              children: R
            },
            R
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
              k.stepExecution.completedAt && /* @__PURE__ */ o(Y, { children: [
                /* @__PURE__ */ e("br", {}),
                "Completed: ",
                k.stepExecution.completedAt,
                k.stepExecution.durationMs != null && /* @__PURE__ */ o(Y, { children: [
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
              k.stepExecution.llm.firstTokenLatencyMs != null && /* @__PURE__ */ o(Y, { children: [
                /* @__PURE__ */ e("br", {}),
                "First token latency: ",
                k.stepExecution.llm.firstTokenLatencyMs,
                "ms"
              ] })
            ] }),
            k.stepExecution.llm.response && /* @__PURE__ */ o(Y, { children: [
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
            k.stepExecution.approvals.map((R, J) => /* @__PURE__ */ o("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2", children: [
              /* @__PURE__ */ o("div", { className: "flex gap-2 mb-1", children: [
                /* @__PURE__ */ e("span", { className: I(
                  "px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                  R.decision === "approve" ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
                ), children: R.decision.toUpperCase() }),
                /* @__PURE__ */ e("span", { className: "text-[11px] text-[#cdd6f4]", children: R.userId })
              ] }),
              R.comment && /* @__PURE__ */ o("div", { className: "text-[11px] text-[#9399b2] italic", children: [
                '"',
                R.comment,
                '"'
              ] }),
              /* @__PURE__ */ e("div", { className: "text-[10px] text-[#6c7086] mt-1", children: R.at })
            ] }, J))
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
              onClick: () => p((R) => R - 1),
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
              onClick: () => p((R) => R + 1),
              className: I(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l >= $.length - 2 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "→"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ e(dr, { attempt: $[l], label: `Attempt ${l + 1}` }),
          /* @__PURE__ */ e(dr, { attempt: $[l + 1], label: `Attempt ${l + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function gl({
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
  const g = xt().runs[n.runId] ?? null, v = g?.steps?.[n.stepId]?.patches ?? [], N = !!i && s === n.stepId && Object.keys(i).length > 0, y = g?.status === "paused_at_breakpoint";
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
            Mt(t, n.stepId)
          ] }),
          N && /* @__PURE__ */ e(
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
                xl,
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
                              w.appliedBy && /* @__PURE__ */ o(Y, { children: [
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
function bl({ title: t, defaultCollapsed: n = !1, children: r, className: a }) {
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
function ye({ children: t, className: n }) {
  return /* @__PURE__ */ e("div", { className: I("flex flex-col gap-3 px-4 py-3", n), children: t });
}
const yl = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function vl(t, n, r) {
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
function Nl(t) {
  if (typeof t != "string") return null;
  const n = t.trim().split(/\s+/);
  if (n.length !== 5) return null;
  const r = {};
  for (let a = 0; a < 5; a++) {
    const i = yl[a], s = vl(n[a], i.min, i.max);
    if (!s) return null;
    r[i.name] = s;
  }
  return r;
}
function bt(t, n, r) {
  return t.match === "*" ? !t.step || t.step === 1 ? !0 : (n - r) % t.step === 0 : t.match.includes(n);
}
function wl(t, n) {
  return bt(t.minute, n.getMinutes(), 0) && bt(t.hour, n.getHours(), 0) && bt(t.dayOfMonth, n.getDate(), 1) && bt(t.month, n.getMonth() + 1, 1) && bt(t.dayOfWeek, n.getDay(), 0);
}
function kl(t, n, r) {
  const a = [], i = new Date(n.getTime());
  i.setSeconds(0, 0), i.setMinutes(i.getMinutes() + 1);
  const s = 1440 * 366, d = new Date(i.getTime());
  for (let c = 0; c < s && a.length < r; c++)
    wl(t, d) && a.push(new Date(d.getTime())), d.setMinutes(d.getMinutes() + 1);
  return a;
}
const pr = /^[a-zA-Z0-9_-]{1,64}$/, Cl = "http://localhost:13001";
function Il() {
  try {
    const t = localStorage.getItem("ws_document_types_v1");
    if (!t) return [];
    const n = JSON.parse(t);
    return Array.isArray(n) ? n.filter((r) => typeof r == "object" && r !== null).filter((r) => typeof r.id == "string" && typeof r.name == "string").map((r) => ({ id: r.id, name: r.name })) : [];
  } catch {
    return [];
  }
}
const Sl = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function $l({ data: t, onChange: n }) {
  const { toast: r } = on(), i = lo(Go)?.definition?.triggerBinding?.webhookSecret, [s, d] = S(!1), c = t.triggerType.startsWith("document."), l = z(() => c ? Il() : [], [c]), p = c && !t.documentTypeId, u = t.triggerType === "schedule" && !t.schedule, f = t.triggerType === "webhook" && !t.webhookPath, h = t.webhookPath ?? "", x = t.triggerType === "webhook" && h.length > 0 && !pr.test(h), g = t.triggerType === "webhook" && pr.test(h) ? `${Cl}/hooks/pipeline/${h}` : null, m = () => {
    g && navigator.clipboard.writeText(g).then(() => r("Webhook URL copied", { type: "success" })).catch(() => r("Could not copy webhook URL", { type: "error" }));
  }, v = () => {
    i && navigator.clipboard.writeText(i).then(() => r("Webhook secret copied", { type: "success" })).catch(() => r("Could not copy webhook secret", { type: "error" }));
  }, N = t.triggerType === "schedule" ? t.schedule ?? "" : "", y = z(
    () => N ? Nl(N) : null,
    [N]
  ), w = z(() => y ? kl(y, /* @__PURE__ */ new Date(), 3) : [], [y]), b = t.triggerType === "schedule" && !!N && !y, k = t.triggerType === "document.finalize" ? "On finalize" : t.triggerType === "document.submit" ? "On submit for review" : t.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ e(be, { label: "Trigger type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.triggerType,
        onChange: (C) => n({ triggerType: C.target.value }),
        children: Sl.map((C) => /* @__PURE__ */ e("option", { value: C.value, children: C.label }, C.value))
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
          /* @__PURE__ */ e("div", { className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono", children: w.length > 0 ? /* @__PURE__ */ o(Y, { children: [
            /* @__PURE__ */ e("div", { className: "text-text-secondary mb-1", children: "Next 3 fires:" }),
            w.map((C, T) => /* @__PURE__ */ e("div", { children: C.toLocaleString() }, T))
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
      /* @__PURE__ */ e("div", { className: "p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: g ? /* @__PURE__ */ o(Y, { children: [
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
        /* @__PURE__ */ e("div", { className: "mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: i ? /* @__PURE__ */ o(Y, { children: [
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
const ur = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, Tl = 3e4;
function Al(t) {
  return t < 1e3 ? `${Math.round(t)}ms` : t < 6e4 ? `${(t / 1e3).toFixed(t < 1e4 ? 1 : 0)}s` : `${Math.round(t / 6e4)}m`;
}
function Rl(t) {
  const n = [];
  for (let r = 1; r < t.maxAttempts; r++) {
    const a = t.backoffMs * Math.pow(t.backoffMultiplier, r - 1);
    n.push(Math.min(a, Tl));
  }
  return n;
}
function Hn({ value: t, onChange: n }) {
  const r = t !== void 0, a = t ?? ur, i = r ? Rl(a) : [], d = i.reduce((c, l) => c + l, 0) > 300 * 1e3;
  return /* @__PURE__ */ o("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "checkbox",
          checked: r,
          onChange: (c) => n(c.target.checked ? ur : void 0),
          "aria-label": "Enable retries"
        }
      ),
      "Retry policy"
    ] }),
    !r && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", children: "No retries — failure is terminal on first attempt." }),
    r && /* @__PURE__ */ o(Y, { children: [
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
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: a.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : i.length === 0 ? `Retries up to ${a.maxAttempts}× with no delay.` : `Retries up to ${a.maxAttempts}× with delays: ${i.map(Al).join(", ")}.` }),
      d && /* @__PURE__ */ e("div", { className: "text-[11px] text-[#ca8a04] mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const mr = {
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
}, Pl = [
  "context.doc.body",
  "context.doc.title",
  "context.trigger.userId",
  "context.steps"
], ko = {
  "context.doc.body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "context.doc.title": "Sample Document Title",
  "context.trigger.userId": "user_abc123",
  "context.steps": '["step-1: fetched document", "step-2: validated schema"]'
};
function hr(t) {
  return t.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (n, r) => ko[r] ?? `{{${r}}}`);
}
function Ml({ data: t, onChange: n }) {
  const [r, a] = S(!1), i = !t.systemPrompt?.trim(), s = !t.userPromptTemplate?.trim(), d = (c) => {
    const l = mr[c], p = l.includes(t.model) ? t.model : l[0];
    n({ provider: c, model: p });
  };
  return /* @__PURE__ */ o(ye, { children: [
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
        children: mr[t.provider].map((c) => /* @__PURE__ */ e("option", { value: c, children: c }, c))
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
          zn,
          {
            value: t.userPromptTemplate,
            onChange: (c) => n({ userPromptTemplate: c }),
            language: "template",
            variables: Pl,
            minLines: 6,
            "aria-label": "User prompt template"
          }
        )
      }
    ),
    /* @__PURE__ */ o(bl, { title: "Advanced", defaultCollapsed: !0, children: [
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
        Hn,
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
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: hr(t.systemPrompt || "(empty)") })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: hr(t.userPromptTemplate || "(empty)") })
      ] }),
      /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary", children: [
        "Sample values: ",
        Object.keys(ko).map((c) => `{{${c}}}`).join(", ")
      ] })
    ] })
  ] });
}
const El = ["context", "context.steps", "context.trigger"], Dl = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function Ol({ data: t, onChange: n }) {
  const r = !t.expression?.trim();
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ e(be, { label: "Type", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: Dl.map((a) => /* @__PURE__ */ o(
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
          zn,
          {
            value: t.expression,
            onChange: (a) => n({ expression: a }),
            language: t.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: El,
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
      Hn,
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
const _l = ["context.trigger", "context.steps"];
function Ll({ data: t, onChange: n }) {
  const r = !t.expression?.trim();
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ e(
      be,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : "e.g. context.llm.response.length > 500",
        children: /* @__PURE__ */ e(
          zn,
          {
            value: t.expression,
            onChange: (a) => n({ expression: a }),
            language: "javascript",
            variables: _l,
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
const Bl = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], Ul = {
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
function Fl({ data: t, onChange: n }) {
  const r = Ul[t.actionType], a = t.config ?? {}, i = typeof a.retryCount == "number" ? a.retryCount : 3, s = t.onError === "route-error" ? "route-error" : typeof a.retryCount == "number" ? "retry" : "halt", d = (l, p) => {
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
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ e(be, { label: "Action type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.actionType,
        onChange: (l) => n({ actionType: l.target.value, config: {} }),
        children: Bl.map((l) => /* @__PURE__ */ e("option", { value: l.value, children: l.label }, l.value))
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
      Hn,
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
const Ze = 2, yt = 8;
function fr(t, n) {
  const r = t ?? [];
  return r.length === n ? r : r.length > n ? r.slice(0, n) : [...r, ...Array(n - r.length).fill("")];
}
function jl({ data: t, onChange: n }) {
  const r = Math.max(Ze, Math.min(yt, t.branchCount || Ze)), a = fr(t.branchLabels, r), i = (d) => {
    const c = Math.max(Ze, Math.min(yt, d));
    n({
      branchCount: c,
      branchLabels: fr(t.branchLabels, c)
    });
  }, s = (d, c) => {
    const l = [...a];
    l[d] = c, n({ branchLabels: l });
  };
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o(
      be,
      {
        label: "Branch count",
        required: !0,
        help: `Between ${Ze} and ${yt} parallel branches.`,
        children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs ml-2", children: r }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: Ze,
              max: yt,
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
              min: Ze,
              max: yt,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit mt-1",
              value: r,
              onChange: (d) => i(parseInt(d.target.value, 10) || Ze)
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
const zl = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], ql = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function Vl({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o(be, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: zl.map((r) => /* @__PURE__ */ o(
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
    /* @__PURE__ */ e(be, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: ql.map((r) => /* @__PURE__ */ o(
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
const Et = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5
};
function Wl(t) {
  return !t || t <= 0 ? "minutes" : t % Et.hours === 0 ? "hours" : t % Et.minutes === 0 ? "minutes" : "seconds";
}
function Jl({ data: t, onChange: n }) {
  const r = t.approvers ?? [], a = r.length === 0, [i, s] = S(() => Wl(t.timeoutMs)), d = t.timeoutMs !== void 0 ? Math.round(t.timeoutMs / Et[i]) : "", c = r.filter((x) => x.type === "user").map((x) => x.value), l = (x) => {
    const g = r.filter((N) => N.type === "role"), v = [...x.map((N) => ({ type: "user", value: N })), ...g];
    n({
      approvers: v,
      // Clamp requiredCount so it never exceeds approvers.length (min 1).
      requiredCount: Math.max(1, Math.min(t.requiredCount || 1, v.length || 1))
    });
  }, p = (x) => {
    const g = r.filter((m, v) => v !== x);
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
    n({ timeoutMs: g * Et[i] });
  }, f = (x) => {
    s(x), typeof d == "number" && !Number.isNaN(d) && n({ timeoutMs: d * Et[x] });
  }, h = Math.max(1, r.length);
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o(
      be,
      {
        label: "Approvers",
        required: !0,
        error: a ? "At least one approver is required." : void 0,
        help: a ? void 0 : "Who can approve this step.",
        children: [
          /* @__PURE__ */ e(
            $a,
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
function En(t) {
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
function Co(t) {
  const n = Array.isArray(t.type) ? t.type[0] : t.type;
  if (n === "array") {
    const r = t.items ? Array.isArray(t.items.type) ? t.items.type[0] : t.items.type : void 0;
    return r ? `array of ${r}` : "array";
  }
  return n ?? "unknown";
}
function Dt(t, n, r, a, i) {
  if (i.has(t)) return;
  i.add(t);
  const s = Array.isArray(t.type) ? t.type[0] : t.type, d = [t.anyOf, t.oneOf, t.allOf].filter(Boolean);
  for (const c of d)
    for (const l of c)
      Dt(l, n, r, a, i);
  if (s === "object" && t.properties) {
    for (const [c, l] of Object.entries(t.properties)) {
      const p = `${n}.${c}`, u = En(l);
      a.push({
        path: p,
        label: `${c} (${Co(l)})`,
        depth: r,
        kind: u,
        isArrayItems: u === "array"
      }), Dt(l, p, r + 1, a, i);
    }
    return;
  }
  if (s === "array") {
    const c = `${n}[*]`, l = t.items, p = l ? En(l) : "unknown";
    a.push({
      path: c,
      label: `${n.slice(n.lastIndexOf(".") + 1)}[*] (each item)`,
      depth: r,
      kind: p,
      isArrayItems: !0
    }), l && Dt(l, c, r + 1, a, i);
  }
}
function Hl(t, n = "$") {
  if (!t || typeof t != "object") return [];
  const r = [], a = /* @__PURE__ */ new Set();
  if ((Array.isArray(t.type) ? t.type[0] : t.type) === "object" && t.properties)
    for (const [s, d] of Object.entries(t.properties)) {
      const c = `${n}.${s}`, l = En(d);
      r.push({
        path: c,
        label: `${s} (${Co(d)})`,
        depth: 0,
        kind: l,
        isArrayItems: l === "array"
      }), Dt(d, c, 1, r, a);
    }
  else
    Dt(t, n, 0, r, a);
  return r;
}
const Kl = {};
function Gl() {
  return `${(typeof import.meta < "u" && Kl?.VITE_SOCIAL_API_URL) ?? ""}/api/pipeline/output-schemas`;
}
let un = null, vt = null;
async function Yl() {
  return un || (vt || (vt = fetch(Gl()).then((t) => {
    if (!t.ok) throw new Error(`HTTP ${t.status}`);
    return t.json();
  }).then((t) => (un = t, vt = null, t)).catch((t) => {
    throw vt = null, t;
  })), vt);
}
const Xl = {
  array: "bg-indigo-50 text-indigo-700 border-indigo-200",
  object: "bg-slate-50 text-slate-600 border-slate-200",
  string: "bg-emerald-50 text-emerald-700 border-emerald-200",
  number: "bg-amber-50 text-amber-700 border-amber-200",
  boolean: "bg-pink-50 text-pink-700 border-pink-200",
  unknown: "bg-slate-50 text-slate-400 border-slate-200"
};
function Ql({ kind: t }) {
  return /* @__PURE__ */ e(
    "span",
    {
      className: I(
        "inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4",
        Xl[t]
      ),
      children: t
    }
  );
}
function Zl({ entry: t, isSelected: n, onPick: r }) {
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
        /* @__PURE__ */ e(Ql, { kind: t.kind })
      ]
    }
  );
}
function ec({
  value: t,
  onChange: n,
  upstreamKind: r,
  upstreamSchema: a
}) {
  const [i, s] = S("idle"), [d, c] = S(null), l = se(!0);
  te(() => (l.current = !0, () => {
    l.current = !1;
  }), []);
  const p = z(() => a !== void 0 ? a : d, [a, d]);
  te(() => {
    !r || a !== void 0 || (s("loading"), Yl().then((m) => {
      if (!l.current) return;
      const v = m.schemas[r] ?? null;
      c(v), s("done");
    }).catch(() => {
      l.current && s("error");
    }));
  }, [r, a]);
  const u = z(
    () => Hl(p),
    [p]
  ), f = p !== null && u.length > 0, h = D(
    (m) => {
      n(m);
    },
    [n]
  );
  if (!r && a === void 0)
    return /* @__PURE__ */ e(
      an,
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
        an,
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
      g && /* @__PURE__ */ o(Y, { children: [
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
          Zl,
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
      an,
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
const mn = "text-[12px] font-semibold text-text-secondary", hn = "text-[11px] text-text-tertiary mt-0.5", tc = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary";
function nc(t) {
  const { definition: n } = Le();
  return z(() => {
    if (!t || !n) return;
    const r = n.edges.find((i) => i.target === t);
    if (!r) return;
    const a = n.nodes.find((i) => i.id === r.source);
    if (a)
      return a.type;
  }, [t, n]);
}
function rc({ data: t, onChange: n }) {
  const { selectedNodeId: r } = Le(), a = nc(r), i = t.maxConcurrency ?? "";
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { className: mn, children: [
        "Items path",
        /* @__PURE__ */ e("span", { className: "text-red-600 ml-1", "aria-hidden": !0, children: "*" })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-1", children: /* @__PURE__ */ e(
        ec,
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
      !!t.itemsPath?.startsWith("$.") && /* @__PURE__ */ e("div", { className: hn, children: "JSONPath into context resolving to an array. Each element becomes one scatter arm." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-item-alias", className: mn, children: [
        "Item alias ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, default: item)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "scatter-item-alias",
          type: "text",
          spellCheck: !1,
          className: tc,
          value: t.itemAlias ?? "",
          onChange: (s) => n({ itemAlias: s.target.value.trim() || void 0 }),
          placeholder: "item"
        }
      ),
      /* @__PURE__ */ o("div", { className: hn, children: [
        "Key written to ",
        /* @__PURE__ */ e("code", { children: "$.scatter.<alias>" }),
        " for each arm."
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-max-concurrency", className: mn, children: [
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
      /* @__PURE__ */ e("div", { className: hn, children: "Maximum number of arms executing concurrently." })
    ] })
  ] });
}
const oc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function ac({ samples: t, onSelect: n }) {
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
const ic = ["cover", "contain", "fill", "inside", "outside"], Nt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", wt = "text-[12px] font-semibold text-text-secondary", xr = "text-[11px] text-text-tertiary mt-0.5";
function sc({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "resize-source-image-path", className: wt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "resize-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Nt,
          value: t.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(ac, { samples: oc, onSelect: (r) => n({ sourceImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "resize-width", className: wt, children: "Width (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "resize-width",
            type: "number",
            min: 1,
            step: 1,
            className: Nt,
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
        /* @__PURE__ */ e("label", { htmlFor: "resize-height", className: wt, children: "Height (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "resize-height",
            type: "number",
            min: 1,
            step: 1,
            className: Nt,
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
      /* @__PURE__ */ e("label", { htmlFor: "resize-fit", className: wt, children: "Fit mode" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "resize-fit",
          className: Nt,
          value: t.fit ?? "cover",
          onChange: (r) => n({ fit: r.target.value }),
          children: ic.map((r) => /* @__PURE__ */ e("option", { value: r, children: r }, r))
        }
      ),
      /* @__PURE__ */ o("div", { className: xr, children: [
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
      /* @__PURE__ */ o("label", { htmlFor: "resize-background", className: wt, children: [
        "Background colour ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, for contain / fill)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "resize-background",
          type: "text",
          spellCheck: !1,
          className: Nt,
          value: t.background ?? "",
          onChange: (r) => n({ background: r.target.value.trim() || void 0 }),
          placeholder: "#ffffff"
        }
      ),
      /* @__PURE__ */ o("div", { className: xr, children: [
        "Hex colour used to fill letterbox padding. Only applies when fit is ",
        /* @__PURE__ */ e("code", { children: "contain" }),
        " or ",
        /* @__PURE__ */ e("code", { children: "fill" }),
        "."
      ] })
    ] })
  ] });
}
const lc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function cc({ samples: t, onSelect: n }) {
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
function dc(t) {
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
const Dn = "text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", pc = "flex-1 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", gr = "text-[12px] font-semibold text-text-secondary", uc = "text-[11px] text-text-tertiary mt-0.5";
function mc({ op: t, index: n, onUpdate: r, onRemove: a }) {
  return /* @__PURE__ */ o("div", { className: "border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2", "data-testid": `geo-op-card-${n}`, children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary font-semibold min-w-[20px]", children: [
        n + 1,
        "."
      ] }),
      /* @__PURE__ */ o(
        "select",
        {
          className: pc,
          value: t.op,
          onChange: (i) => r(dc(i.target.value)),
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
    t.op === "rotate" && /* @__PURE__ */ o(Y, { children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e("label", { className: "text-[11px] text-text-tertiary min-w-[60px]", children: "Degrees" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "number",
            min: -360,
            max: 360,
            step: 90,
            className: `${Dn} w-24`,
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
            className: `${Dn} flex-1`,
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
function hc({ data: t, onChange: n }) {
  const r = t.operations ?? [], a = (d, c) => {
    n({ operations: r.map((l, p) => p === d ? c : l) });
  }, i = (d) => {
    n({ operations: r.filter((c, l) => l !== d) });
  }, s = () => {
    n({ operations: [...r, { op: "rotate", degrees: 90 }] });
  };
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "transform-geo-source-image-path", className: gr, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "transform-geo-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `mt-1 w-full ${Dn}`,
          value: t.sourceImagePath ?? "",
          onChange: (d) => n({ sourceImagePath: d.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(cc, { samples: lc, onSelect: (d) => n({ sourceImagePath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${gr} mb-2`, children: [
        "Operations ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      r.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-2 italic", children: "No operations — add at least one." }),
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: r.map((d, c) => /* @__PURE__ */ e(
        mc,
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
      /* @__PURE__ */ e("div", { className: `${uc} mt-1.5`, children: "Supported: Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror)." })
    ] })
  ] });
}
const fc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function xc({ samples: t, onSelect: n }) {
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
const gc = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "avif", label: "AVIF" }
], On = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", bc = `${On} font-mono`, fn = "text-[12px] font-semibold text-text-secondary", xn = "text-[11px] text-text-tertiary mt-0.5";
function yc({ data: t, onChange: n }) {
  const r = t.format === "jpeg" || t.format === "webp" || t.format === "avif";
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-source-image-path", className: fn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "format-convert-source-image-path",
          type: "text",
          spellCheck: !1,
          className: bc,
          value: t.sourceImagePath ?? "",
          onChange: (a) => n({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(xc, { samples: fc, onSelect: (a) => n({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "format-convert-format", className: fn, children: "Output format" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "format-convert-format",
          className: On,
          value: t.format ?? "jpeg",
          onChange: (a) => n({ format: a.target.value }),
          children: gc.map((a) => /* @__PURE__ */ e("option", { value: a.value, children: a.label }, a.value))
        }
      )
    ] }),
    r && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-quality", className: fn, children: [
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
          className: On,
          value: t.quality ?? 80,
          onChange: (a) => {
            const i = parseInt(a.target.value, 10);
            n({ quality: Number.isFinite(i) ? Math.min(100, Math.max(1, i)) : 80 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: xn, children: "Higher = better quality, larger file. 80 is a good default." })
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
      /* @__PURE__ */ e("div", { className: xn, children: "Overrides quality when enabled. Produces larger files with no compression artefacts." })
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
      /* @__PURE__ */ e("div", { className: xn, children: "Removes camera EXIF, GPS, copyright tags etc. Reduces file size; recommended for web delivery." })
    ] })
  ] });
}
const vc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Nc({ samples: t, onSelect: n }) {
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
const zt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", qt = "text-[12px] font-semibold text-text-secondary", gn = "text-[11px] text-text-tertiary mt-0.5";
function wc({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-source-image-path", className: qt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "sharpen-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `${zt} font-mono`,
          value: t.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Nc, { samples: vc, onSelect: (r) => n({ sourceImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-sigma", className: qt, children: [
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
          className: zt,
          value: t.sigma ?? "",
          onChange: (r) => {
            const a = parseFloat(r.target.value);
            n({ sigma: Number.isFinite(a) && a > 0 ? a : void 0 });
          },
          placeholder: "1"
        }
      ),
      /* @__PURE__ */ e("div", { className: gn, children: "Gaussian mask sigma. Higher = broader/stronger sharpening. Typical range: 0.5–3." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-m1", className: qt, children: [
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
          className: zt,
          value: t.m1 ?? "",
          onChange: (r) => {
            const a = parseFloat(r.target.value);
            n({ m1: Number.isFinite(a) && a >= 0 ? a : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: gn, children: "Level of sharpening applied to flat (smooth) areas of the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-m2", className: qt, children: [
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
          className: zt,
          value: t.m2 ?? "",
          onChange: (r) => {
            const a = parseFloat(r.target.value);
            n({ m2: Number.isFinite(a) && a >= 0 ? a : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: gn, children: "Level of sharpening applied to jagged (edge) areas of the image." })
    ] })
  ] });
}
const kc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Cc({ samples: t, onSelect: n }) {
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
], $t = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", br = `${$t} font-mono`, at = "text-[12px] font-semibold text-text-secondary", yr = "text-[11px] text-text-tertiary mt-0.5";
function Sc({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(ye, { children: [
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
          className: br,
          value: t.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Cc, { samples: kc, onSelect: (r) => n({ sourceImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-overlay-image-id", className: at, children: "Overlay image ID" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-overlay-image-id",
          type: "text",
          spellCheck: !1,
          className: br,
          value: t.overlayImageId ?? "",
          onChange: (r) => n({ overlayImageId: r.target.value.trim() }),
          placeholder: "img_xxxxxxxx"
        }
      ),
      /* @__PURE__ */ e("div", { className: yr, children: "The imageId of the watermark/overlay image already stored in the blob store. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-gravity", className: at, children: "Gravity (placement)" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "watermark-gravity",
          className: $t,
          value: t.gravity ?? "southeast",
          onChange: (r) => n({ gravity: r.target.value }),
          children: Ic.map((r) => /* @__PURE__ */ e("option", { value: r, children: r }, r))
        }
      ),
      /* @__PURE__ */ e("div", { className: yr, children: "Where the overlay is placed on the source image. Default: southeast." })
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
          className: $t,
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
            className: $t,
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
            className: $t,
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
const vr = 50;
function $c(t, n) {
  const [r, a] = S(t), [i, s] = S([]), [d, c] = S([]), l = se(r);
  l.current = r;
  const p = D(
    (N) => {
      a((y) => {
        const w = N(y);
        return s((b) => {
          const k = [...b, y];
          return k.length > vr && k.shift(), k;
        }), c([]), n(w), w;
      });
    },
    [n]
  ), u = D(
    (N) => {
      p((y) => [...y, N]);
    },
    [p]
  ), f = D(
    (N, y, w) => {
      p(
        (b) => b.map((k) => k.id === N ? { ...k, x: y, y: w } : k)
      );
    },
    [p]
  ), h = D(
    (N, y, w, b, k) => {
      p(
        (C) => C.map((T) => T.id === N ? { ...T, x: y, y: w, width: b, height: k } : T)
      );
    },
    [p]
  ), x = D(
    (N, y) => {
      p(
        (w) => w.map((b) => b.id === N ? { ...b, label: y } : b)
      );
    },
    [p]
  ), g = D(
    (N) => {
      p((y) => y.filter((w) => w.id !== N));
    },
    [p]
  ), m = D(() => {
    s((N) => {
      if (N.length === 0) return N;
      const y = N[N.length - 1];
      c((b) => [...b, l.current]);
      const w = y;
      return a(w), n(w), N.slice(0, -1);
    });
  }, [n]), v = D(() => {
    c((N) => {
      if (N.length === 0) return N;
      const y = N[N.length - 1];
      s((b) => {
        const k = [...b, l.current];
        return k.length > vr && k.shift(), k;
      });
      const w = y;
      return a(w), n(w), N.slice(0, -1);
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
    redo: v,
    canUndo: i.length > 0,
    canRedo: d.length > 0
  };
}
function Tc() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function we(t, n, r) {
  return Math.max(n, Math.min(r, t));
}
function bn(t, n) {
  const r = n.getBoundingClientRect();
  return {
    x: we(t.clientX - r.left, 0, r.width),
    y: we(t.clientY - r.top, 0, r.height)
  };
}
function yn(t, n, r, a, i, s) {
  const d = i / r, c = s / a;
  return { x: t * d, y: n * c };
}
function Nr(t, n, r) {
  return {
    left: `${t.x / n * 100}%`,
    top: `${t.y / r * 100}%`,
    width: `${t.width / n * 100}%`,
    height: `${t.height / r * 100}%`
  };
}
function Ac(t, n, r) {
  for (let a = r.length - 1; a >= 0; a--) {
    const i = r[a];
    if (t >= i.x && t <= i.x + i.width && n >= i.y && n <= i.y + i.height)
      return i;
  }
  return null;
}
function Io({
  imageUrl: t,
  imageWidth: n,
  imageHeight: r,
  boxes: a,
  onChange: i,
  readOnly: s = !1,
  className: d
}) {
  const c = se(null), [l, p] = S({ kind: "idle" }), [u, f] = S(null), h = se(null), { addBox: x, moveBox: g, resizeBox: m, setLabel: v, deleteBox: N } = $c(
    a,
    i
  );
  te(() => {
    u && h.current && (h.current.focus(), h.current.select());
  }, [u]);
  const y = D(
    (O) => {
      if (s || O.button !== 0) return;
      const R = c.current;
      if (!R) return;
      O.preventDefault(), R.setPointerCapture(O.pointerId);
      const { x: J, y: H } = bn(O, R), L = R.getBoundingClientRect(), { x: q, y: W } = yn(
        J,
        H,
        L.width,
        L.height,
        n,
        r
      ), G = Ac(q, W, a);
      p(G ? {
        kind: "move",
        id: G.id,
        offsetX: q - G.x,
        offsetY: W - G.y,
        currentX: q,
        currentY: W
      } : { kind: "create", startX: q, startY: W, currentX: q, currentY: W });
    },
    [s, a, n, r]
  ), w = D(
    (O, R, J) => {
      if (s) return;
      O.stopPropagation(), O.preventDefault();
      const H = c.current;
      if (!H) return;
      H.setPointerCapture(O.pointerId);
      const { x: L, y: q } = bn(O, H), W = H.getBoundingClientRect(), { x: G, y: de } = yn(L, q, W.width, W.height, n, r);
      p({ kind: "resize", id: R.id, corner: J, origBox: { ...R }, currentX: G, currentY: de });
    },
    [s, n, r]
  ), b = D(
    (O) => {
      if (l.kind === "idle") return;
      const R = c.current;
      if (!R) return;
      const { x: J, y: H } = bn(O, R), L = R.getBoundingClientRect(), { x: q, y: W } = yn(J, H, L.width, L.height, n, r);
      l.kind === "create" ? p((G) => G.kind === "create" ? { ...G, currentX: q, currentY: W } : G) : l.kind === "move" ? p((G) => G.kind === "move" ? { ...G, currentX: q, currentY: W } : G) : l.kind === "resize" && p((G) => G.kind === "resize" ? { ...G, currentX: q, currentY: W } : G);
    },
    [l.kind, n, r]
  ), k = D(
    (O) => {
      if (l.kind === "create") {
        const R = Math.min(l.startX, l.currentX), J = Math.min(l.startY, l.currentY), H = Math.max(l.startX, l.currentX), L = Math.max(l.startY, l.currentY), q = H - R, W = L - J;
        q >= 4 && W >= 4 && x({ id: Tc(), x: R, y: J, width: q, height: W });
      } else if (l.kind === "move") {
        const R = a.find((J) => J.id === l.id);
        if (R) {
          const J = we(l.currentX - l.offsetX, 0, n - R.width), H = we(l.currentY - l.offsetY, 0, r - R.height);
          g(l.id, J, H);
        }
      } else if (l.kind === "resize") {
        const { id: R, corner: J, origBox: H, currentX: L, currentY: q } = l;
        let { x: W, y: G, width: de, height: j } = H;
        if (J === "nw") {
          const le = we(L, 0, W + de - 4), ve = we(q, 0, G + j - 4);
          de = W + de - le, j = G + j - ve, W = le, G = ve;
        } else if (J === "ne") {
          const le = we(q, 0, G + j - 4);
          de = we(L - W, 4, n - W), j = G + j - le, G = le;
        } else if (J === "sw") {
          const le = we(L, 0, W + de - 4);
          de = W + de - le, j = we(q - G, 4, r - G), W = le;
        } else
          de = we(L - W, 4, n - W), j = we(q - G, 4, r - G);
        m(R, W, G, de, j);
      }
      p({ kind: "idle" });
    },
    [l, a, x, g, m, n, r]
  ), C = D(
    (O, R) => {
      s || (O.preventDefault(), N(R));
    },
    [s, N]
  ), T = D(
    (O, R) => {
      s || (O.key === "Delete" || O.key === "Backspace") && (O.preventDefault(), N(R));
    },
    [s, N]
  ), $ = D(
    (O, R) => {
      s || (O.stopPropagation(), f({ id: R.id, value: R.label ?? "" }));
    },
    [s]
  ), A = D(() => {
    u && (v(u.id, u.value), f(null));
  }, [u, v]);
  let E = null;
  if (l.kind === "create") {
    const O = Math.min(l.startX, l.currentX), R = Math.min(l.startY, l.currentY), J = Math.max(l.startX, l.currentX), H = Math.max(l.startY, l.currentY);
    J - O >= 2 && H - R >= 2 && (E = { x: O, y: R, width: J - O, height: H - R });
  }
  let P = null;
  if (l.kind === "move") {
    const O = a.find((R) => R.id === l.id);
    if (O) {
      const R = we(l.currentX - l.offsetX, 0, n - O.width), J = we(l.currentY - l.offsetY, 0, r - O.height);
      P = { ...O, x: R, y: J };
    }
  }
  let B = null;
  if (l.kind === "resize") {
    const { corner: O, origBox: R, currentX: J, currentY: H } = l;
    let { x: L, y: q, width: W, height: G } = R;
    if (O === "nw") {
      const de = we(J, 0, L + W - 4), j = we(H, 0, q + G - 4);
      W = L + W - de, G = q + G - j, L = de, q = j;
    } else if (O === "ne") {
      const de = we(H, 0, q + G - 4);
      W = we(J - L, 4, n - L), G = q + G - de, q = de;
    } else if (O === "sw") {
      const de = we(J, 0, L + W - 4);
      W = L + W - de, G = we(H - q, 4, r - q), L = de;
    } else
      W = we(J - L, 4, n - L), G = we(H - q, 4, r - q);
    B = { ...R, x: L, y: q, width: W, height: G };
  }
  const V = /* @__PURE__ */ new Set();
  l.kind === "move" && V.add(l.id), l.kind === "resize" && V.add(l.id);
  const ae = (O, R) => {
    const J = {
      nw: "-top-1.5 -left-1.5 cursor-nw-resize",
      ne: "-top-1.5 -right-1.5 cursor-ne-resize",
      sw: "-bottom-1.5 -left-1.5 cursor-sw-resize",
      se: "-bottom-1.5 -right-1.5 cursor-se-resize"
    };
    return /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "aria-label": `Resize ${R}`,
        className: I(
          "absolute h-3 w-3 rounded-sm border border-primary bg-white shadow",
          J[R]
        ),
        onPointerDown: (H) => w(H, O, R)
      },
      R
    );
  }, K = (O, R, J, H) => {
    const L = Nr(O, n, r), q = u?.id === O.id;
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
          q ? /* @__PURE__ */ e(
            "input",
            {
              ref: h,
              type: "text",
              value: u.value,
              onChange: (W) => f((G) => G ? { ...G, value: W.target.value } : null),
              onBlur: A,
              onKeyDown: (W) => {
                W.key === "Enter" && (W.preventDefault(), A()), W.key === "Escape" && (W.preventDefault(), f(null));
              },
              className: "absolute -top-5 left-0 w-24 rounded border border-primary bg-white px-1 py-0 text-[10px] font-semibold text-primary shadow outline-none focus:ring-1 focus:ring-primary",
              onClick: (W) => W.stopPropagation()
            }
          ) : /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              tabIndex: 0,
              "aria-label": `Label: ${O.label || "Unlabeled"}. Double-click to edit.`,
              className: "absolute -top-5 left-0 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow",
              style: { whiteSpace: "nowrap" },
              onDoubleClick: (W) => $(W, O),
              onContextMenu: (W) => C(W, O.id),
              onKeyDown: (W) => T(W, O.id),
              children: O.label || "Unlabeled"
            }
          ),
          J && !s && /* @__PURE__ */ o(Y, { children: [
            ae(O, "nw"),
            ae(O, "ne"),
            ae(O, "sw"),
            ae(O, "se")
          ] })
        ]
      },
      H
    );
  }, ee = () => {
    if (!E) return null;
    const O = Nr(E, n, r);
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
            onPointerDown: s ? void 0 : y,
            onPointerMove: s ? void 0 : b,
            onPointerUp: s ? void 0 : k,
            children: [
              a.map((O) => V.has(O.id) ? null : K(O, !1, !0, `box-${O.id}`)),
              P && K(P, !0, !1, "ghost-move"),
              B && K(B, !0, !0, "ghost-resize"),
              ee()
            ]
          }
        ),
        !s && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute bottom-1.5 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80", children: "Drag to add box" })
      ]
    }
  );
}
const Rc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
], Pc = [
  "$.scatter.item.bbox",
  "$.steps.visionAnalyze.output.extracted.regions[0].bbox",
  "$.trigger.payload.bbox"
], Mc = "crop-region", Ec = "crop";
function wr({
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
const kr = "mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", vn = "text-[12px] font-semibold text-text-secondary", kt = "text-[11px] text-text-tertiary mt-0.5";
function Dc(t) {
  const { definition: n } = Le(), r = z(() => !t || !n ? null : n.edges.find((d) => d.target === t)?.source ?? null, [n, t]), i = me(r ?? "")?.images?.[0];
  return i ? { imageId: i.imageId, width: i.width, height: i.height } : null;
}
function Oc({
  data: t,
  onChange: n,
  currentNodeId: r
}) {
  const a = t.materialize !== !1, i = Dc(r), s = Te(), d = z(() => t.bbox ? [
    {
      id: Mc,
      x: t.bbox.x,
      y: t.bbox.y,
      width: t.bbox.width,
      height: t.bbox.height,
      label: Ec
    }
  ] : [], [t.bbox]), c = D(
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
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-source-image-path", className: vn, children: [
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
          className: kr,
          value: t.sourceImagePath ?? "",
          onChange: (l) => n({ sourceImagePath: l.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ o("div", { className: kt, children: [
        "JSONPath to the imageId of the source image. Defaults server-side to",
        " ",
        /* @__PURE__ */ e("code", { children: "$.scatter.parentImageId" }),
        "."
      ] }),
      /* @__PURE__ */ e(
        wr,
        {
          samples: Rc,
          onSelect: (l) => n({ sourceImagePath: l })
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-bbox-path", className: vn, children: [
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
          className: kr,
          value: t.bboxPath ?? "",
          onChange: (l) => n({ bboxPath: l.target.value.trim() || void 0 }),
          placeholder: "$.scatter.item.bbox"
        }
      ),
      /* @__PURE__ */ o("div", { className: kt, children: [
        "JSONPath to a bbox object ",
        /* @__PURE__ */ e("code", { children: "{ x, y, width, height }" }),
        " in pixels. Overrides the manual crop region below when present at run time."
      ] }),
      /* @__PURE__ */ e(
        wr,
        {
          samples: Pc,
          onSelect: (l) => n({ bboxPath: l })
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { "data-testid": "crop-region-section", children: [
      /* @__PURE__ */ o("div", { className: vn, children: [
        "Crop region",
        " ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e("div", { className: kt, children: "Drag on the source image to paint the crop box. Drawing a new box replaces the previous one." }),
      i ? /* @__PURE__ */ o(Y, { children: [
        /* @__PURE__ */ e(
          Io,
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
            children: t.bbox ? /* @__PURE__ */ o(Y, { children: [
              /* @__PURE__ */ o(ie, { tone: "neutral", size: "xs", mono: !0, "data-testid": "crop-chip-x", children: [
                "x: ",
                t.bbox.x
              ] }),
              /* @__PURE__ */ o(ie, { tone: "neutral", size: "xs", mono: !0, "data-testid": "crop-chip-y", children: [
                "y: ",
                t.bbox.y
              ] }),
              /* @__PURE__ */ o(
                ie,
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
                ie,
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
            ] }) : /* @__PURE__ */ e("span", { className: I(kt, "italic"), children: "No crop region yet — drag on the image to add one." })
          }
        )
      ] }) : /* @__PURE__ */ e(
        Xe,
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
              onChange: (l) => n({ materialize: l.target.checked }),
              className: "w-3.5 h-3.5 accent-primary"
            }
          ),
          "Persist crop to blob store"
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: kt, children: "When enabled (default), the cropped image is saved to the ImageBlobStore." })
  ] });
}
function _c(t) {
  const { selectedNodeId: n } = Le();
  return /* @__PURE__ */ e(Oc, { ...t, currentNodeId: n });
}
const Lc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Bc({ samples: t, onSelect: n }) {
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
const Cr = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Nn = "text-[12px] font-semibold text-text-secondary", wn = "text-[11px] text-text-tertiary mt-0.5";
function Uc({ data: t, onChange: n }) {
  const r = t.algorithm ?? "luminosity", a = t.contrast ?? 1;
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-bw-source-image-path", className: Nn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "adjust-bw-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `${Cr} font-mono`,
          value: t.sourceImagePath ?? "",
          onChange: (i) => n({ sourceImagePath: i.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: wn, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(Bc, { samples: Lc, onSelect: (i) => n({ sourceImagePath: i }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "adjust-bw-algorithm", className: Nn, children: "Greyscale algorithm" }),
      /* @__PURE__ */ o(
        "select",
        {
          id: "adjust-bw-algorithm",
          className: Cr,
          value: r,
          onChange: (i) => n({ algorithm: i.target.value }),
          children: [
            /* @__PURE__ */ e("option", { value: "luminosity", children: "Luminosity — 0.21R + 0.72G + 0.07B (perceptually accurate)" }),
            /* @__PURE__ */ e("option", { value: "average", children: "Average — (R+G+B)/3 (fast, flat)" }),
            /* @__PURE__ */ e("option", { value: "desaturate", children: "Desaturate — (max+min)/2 (Lightness channel)" })
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: wn, children: "Controls how RGB channels are weighted when converting to greyscale." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-bw-contrast", className: Nn, children: [
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
      /* @__PURE__ */ o("div", { className: wn, children: [
        "Applied after greyscale conversion. 1 = no change, ",
        "<",
        "1 = lower contrast,",
        " >",
        "1 = higher contrast. Range 0–4."
      ] })
    ] })
  ] });
}
function Fc({
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
  async function v(w) {
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
  function N(w) {
    w.length > 0 && v(w[0]);
  }
  async function y() {
    const w = g.trim();
    w && await v({ url: w });
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
            Bt,
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
          Ca,
          {
            accept: s,
            maxSize: i,
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
                Ot,
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
function So(t) {
  const n = co(), r = n.uploadImage;
  return r ? /* @__PURE__ */ e(
    Fc,
    {
      ...t,
      uploadImage: r,
      getImageUrl: n.getImageUrl
    }
  ) : /* @__PURE__ */ e("div", { className: "text-sm text-slate-500", children: "This host has not wired uploadImage. Cannot accept new uploads." });
}
const _n = {
  brightness: "Brightness",
  contrast: "Contrast",
  saturation: "Saturation",
  hue: "Hue",
  blur: "Blur"
}, $o = Object.keys(_n).map((t) => ({
  value: t,
  label: _n[t]
})), jc = {
  brightness: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  contrast: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  saturation: { min: 0, max: 2, step: 0.01, unit: "×", defaultValue: 1 },
  hue: { min: -180, max: 180, step: 1, unit: "°", defaultValue: 0 },
  blur: { min: 0, max: 50, step: 0.5, unit: "px", defaultValue: 1 }
};
function To(t) {
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
function zc(t) {
  switch (t.kind) {
    case "hue":
      return t.degrees;
    case "blur":
      return t.radiusPx;
    default:
      return t.value;
  }
}
function Ir(t, n) {
  switch (t.kind) {
    case "hue":
      return { kind: "hue", degrees: n };
    case "blur":
      return { kind: "blur", radiusPx: n };
    default:
      return { kind: t.kind, value: n };
  }
}
const qc = I(
  "w-4 h-full flex items-center justify-center",
  "text-[14px] text-text-tertiary cursor-grab select-none shrink-0"
);
I(
  "text-[11px] font-semibold px-2 py-0.5 rounded-full",
  "bg-surface-hover border border-border text-text-secondary",
  "whitespace-nowrap shrink-0"
);
function Vc({ layer: t, index: n, onUpdate: r, onRemove: a }) {
  const i = jc[t.kind], s = zc(t), d = (p) => {
    r(To(p.target.value));
  }, c = (p) => {
    const u = parseFloat(p.target.value);
    Number.isFinite(u) && r(Ir(t, u));
  }, l = (p) => {
    r(Ir(t, p));
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex items-center gap-2 px-2 py-1.5 rounded-md border border-border bg-surface-inset",
      "data-testid": `layer-row-${n}`,
      children: [
        /* @__PURE__ */ e("span", { className: qc, "aria-hidden": "true", title: "Drag handle", children: "⠿" }),
        /* @__PURE__ */ e(
          Qt,
          {
            value: t.kind,
            onChange: d,
            options: $o,
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
            "aria-label": `${_n[t.kind]} slider`,
            "data-testid": `layer-slider-${n}`
          }
        ),
        /* @__PURE__ */ e(
          Yo,
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
const Wc = 150;
function Jc(t, n, r) {
  const [a, i] = S(null), [s, d] = S(!1), c = se(null), l = se(null), p = D(
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
  return te(() => {
    if (!t) {
      i(null);
      return;
    }
    return c.current && clearTimeout(c.current), c.current = setTimeout(() => {
      p(t, n);
    }, Wc), () => {
      c.current && clearTimeout(c.current);
    };
  }, [t, JSON.stringify(n), p]), { previewSrc: a, loading: s };
}
function Sr(t) {
  return t.length <= 8 ? t : `${t.slice(0, 8)}…`;
}
function Hc({
  layers: t,
  onChange: n,
  autoSourceImageId: r,
  pinnedSourceImageId: a,
  onPinnedSourceImageIdChange: i,
  sourceImageId: s,
  apiBase: d = ""
}) {
  const [c, l] = S("brightness"), [p, u] = S(!1), f = r ?? s, h = a ?? f, x = !!a, { previewSrc: g, loading: m } = Jc(h, t, d), v = () => {
    i?.(void 0);
  }, N = (C) => {
    C?.imageId && (i?.(C.imageId), u(!1));
  }, y = (C, T) => {
    n(t.map(($, A) => A === C ? T : $));
  }, w = (C) => {
    n(t.filter((T, $) => $ !== C));
  }, b = () => {
    n([...t, To(c)]);
  }, k = (C) => {
    l(C.target.value);
  };
  return /* @__PURE__ */ o("div", { className: "flex gap-3 p-3", "data-testid": "adjust-layer-slider-panel", children: [
    /* @__PURE__ */ o("div", { className: "flex-1 flex flex-col gap-2 min-w-0", children: [
      t.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary italic", children: "No layers — add one below." }),
      t.map((C, T) => /* @__PURE__ */ e(
        Vc,
        {
          layer: C,
          index: T,
          onUpdate: ($) => y(T, $),
          onRemove: () => w(T)
        },
        T
      )),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mt-1", children: [
        /* @__PURE__ */ e(
          Qt,
          {
            value: c,
            onChange: k,
            options: $o,
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
              ie,
              {
                tone: "neutral",
                size: "xs",
                "data-testid": "adjust-layer-source-chip-pinned",
                children: [
                  /* @__PURE__ */ o("span", { children: [
                    "Source: pinned (",
                    Sr(h),
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
                        "hover:bg-slate-200"
                      ),
                      children: "×"
                    }
                  )
                ]
              }
            ) : f ? /* @__PURE__ */ o(
              ie,
              {
                tone: "info",
                size: "xs",
                "data-testid": "adjust-layer-source-chip-auto",
                children: [
                  "Source: ",
                  Sr(f),
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
            So,
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
          Bt,
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
const Kc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Gc({ samples: t, onSelect: n }) {
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
const $r = "text-[12px] font-semibold text-text-secondary", Yc = "text-[11px] text-text-tertiary mt-0.5";
function Xc(t) {
  const { definition: n } = Le(), r = z(() => !t || !n ? null : n.edges.find((s) => s.target === t)?.source ?? null, [n, t]);
  return me(r ?? "")?.images?.[0]?.imageId;
}
function Qc({
  data: t,
  onChange: n,
  currentNodeId: r
}) {
  const a = Xc(r), i = t.previewSourceImageId, s = t.layers ?? [];
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-layer-source-image-path", className: $r, children: [
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
      /* @__PURE__ */ e("div", { className: Yc, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(Gc, { samples: Kc, onSelect: (d) => n({ sourceImagePath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${$r} mb-1`, children: [
        "Adjustment layers ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      /* @__PURE__ */ e(
        Hc,
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
function Zc(t) {
  const { selectedNodeId: n } = Le();
  return /* @__PURE__ */ e(Qc, { ...t, currentNodeId: n });
}
const ed = [
  "claude-opus-4-7",
  "claude-sonnet-4-6",
  "claude-haiku-4-5-20251001"
], td = [
  "$.trigger.imageRef",
  "$.trigger.image",
  "$.steps.upload.output.imageId"
];
function nd(t) {
  if (!t) return !1;
  const n = t.properties;
  if (!n || typeof n != "object" || Array.isArray(n)) return !1;
  const r = n.regions;
  return typeof r == "object" && r !== null;
}
function rd(t) {
  const n = t.trim();
  if (n.length === 0) return { ok: !0, value: void 0 };
  try {
    const r = JSON.parse(n);
    return r === null || typeof r != "object" || Array.isArray(r) ? { ok: !1, error: "Schema must be a JSON object" } : { ok: !0, value: r };
  } catch (r) {
    return { ok: !1, error: r.message };
  }
}
const ct = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Ln = "mt-1 w-full text-[12px] rounded border border-red-500 bg-white px-2 py-1 outline-none", od = `${ct} font-mono`, ad = `${Ln} font-mono`, et = "text-[12px] font-semibold text-text-secondary", He = "text-[11px] text-text-tertiary mt-0.5", Vt = "text-[11px] text-red-600 mt-0.5";
function id({ data: t, onChange: n }) {
  const [r, a] = S(!1), [i, s] = S(
    t.outputSchema ? JSON.stringify(t.outputSchema, null, 2) : ""
  ), [d, c] = S(null), l = !t.userPrompt?.trim(), p = !t.imageRefPath?.trim(), u = !!t.imageRefPath && !t.imageRefPath.startsWith("$."), f = nd(t.outputSchema), h = D(
    (g) => {
      n({ seedRegions: g });
    },
    [n]
  ), x = (g) => {
    s(g);
    const m = rd(g);
    if (!m.ok) {
      c(m.error);
      return;
    }
    c(null), n({ outputSchema: m.value });
  };
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-model", className: et, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-model",
          className: ct,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (g) => n({ model: g.target.value }),
          children: ed.map((g) => /* @__PURE__ */ e("option", { value: g, children: g }, g))
        }
      ),
      /* @__PURE__ */ e("div", { className: He, children: "Anthropic Messages API. Requires ANTHROPIC_API_KEY on platform-api." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-image-ref-path", className: et, children: [
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
          className: p || u ? ad : od,
          value: t.imageRefPath ?? "",
          onChange: (g) => n({ imageRefPath: g.target.value }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      p ? /* @__PURE__ */ e("div", { id: "vision-image-ref-path-error", role: "alert", className: Vt, children: "Image reference path is required." }) : u ? /* @__PURE__ */ o("div", { id: "vision-image-ref-path-error", role: "alert", className: Vt, children: [
        "Path must start with ",
        /* @__PURE__ */ e("code", { children: "$." })
      ] }) : /* @__PURE__ */ e("div", { className: He, children: "JSONPath into context. The value must be a string imageId or object with imageId." }),
      /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: td.map((g) => /* @__PURE__ */ e(
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
      /* @__PURE__ */ o("label", { htmlFor: "vision-user-prompt", className: et, children: [
        "User prompt",
        /* @__PURE__ */ e("span", { className: "text-red-600 ml-1", children: "●" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-user-prompt",
          "aria-invalid": l ? "true" : void 0,
          "aria-describedby": l ? "vision-user-prompt-error" : void 0,
          className: `${l ? Ln : ct} min-h-20 resize-y`,
          value: t.userPrompt,
          onChange: (g) => n({ userPrompt: g.target.value })
        }
      ),
      l ? /* @__PURE__ */ e("div", { id: "vision-user-prompt-error", role: "alert", className: Vt, children: "User prompt is required." }) : /* @__PURE__ */ o("div", { className: He, children: [
        "Supports ",
        "{{ context.* }}",
        " substitution."
      ] })
    ] }),
    f && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: et, children: "Focus regions (optional)" }),
      /* @__PURE__ */ e("div", { className: He, children: "Drag on the image to paint focus boxes. The next vision pass will use these as analysis hints." }),
      /* @__PURE__ */ e(
        Io,
        {
          imageUrl: "",
          imageWidth: 800,
          imageHeight: 600,
          boxes: t.seedRegions ?? [],
          onChange: h,
          className: "mt-1"
        }
      ),
      (t.seedRegions?.length ?? 0) > 0 && /* @__PURE__ */ o("div", { className: He, "data-testid": "bbox-region-count", children: [
        t.seedRegions.length,
        " region",
        t.seedRegions.length !== 1 ? "s" : "",
        " defined."
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-output-schema", className: et, children: "Output schema (optional)" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-output-schema",
          "aria-invalid": d ? "true" : void 0,
          "aria-describedby": d ? "vision-output-schema-error" : void 0,
          className: `${d ? Ln : ct} font-mono text-[11px] min-h-28 resize-y`,
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
      d ? /* @__PURE__ */ o("div", { id: "vision-output-schema-error", role: "alert", className: Vt, children: [
        "Invalid JSON: ",
        d
      ] }) : t.outputSchema ? /* @__PURE__ */ e("div", { className: He, children: "Extract mode — model must return JSON matching this schema." }) : /* @__PURE__ */ e("div", { className: He, children: "Leave blank for caption mode (freeform analysis text)." })
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
          /* @__PURE__ */ e("label", { htmlFor: "vision-max-output-tokens", className: et, children: "Max output tokens" }),
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
          /* @__PURE__ */ e("div", { className: He, children: "Caps the response length. Default 2048." })
        ] }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("label", { htmlFor: "vision-system-prompt", className: et, children: "System prompt override (optional)" }),
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
          /* @__PURE__ */ e("div", { className: He, children: "Schema instructions are auto-appended when output schema is set." })
        ] })
      ] })
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
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], Tt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", dd = `${Tt} font-mono`, Ct = "text-[12px] font-semibold text-text-secondary", Tr = "text-[11px] text-text-tertiary mt-0.5";
function pd({ data: t, onChange: n }) {
  const [r, a] = S(""), i = t.labels ?? [], s = () => {
    const c = r.trim();
    !c || i.includes(c) || (n({ labels: [...i, c] }), a(""));
  }, d = (c) => {
    n({ labels: i.filter((l, p) => p !== c) });
  };
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-image-ref-path", className: Ct, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-classify-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: dd,
          value: t.imageRefPath ?? "",
          onChange: (c) => n({ imageRefPath: c.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Tr, children: "JSONPath to the imageId to classify. Required." }),
      /* @__PURE__ */ e(ld, { samples: sd, onSelect: (c) => n({ imageRefPath: c }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: Ct, children: "Labels (at least 2 required)" }),
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
            className: `${Tt} flex-1 mt-0`,
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
      /* @__PURE__ */ e("div", { className: Tr, children: "Press Enter or click Add. The model returns the single best-matching label." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-model", className: Ct, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-classify-model",
          className: Tt,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (c) => n({ model: c.target.value }),
          children: cd.map((c) => /* @__PURE__ */ e("option", { value: c.value, children: c.label }, c.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-classify-system-prompt", className: Ct, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-classify-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Tt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (c) => n({ systemPrompt: c.target.value || void 0 }),
          placeholder: "Leave blank to use the default classification system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-classify-max-output-tokens", className: Ct, children: [
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
          className: Tt,
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
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more detail)" }
], At = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", fd = `${At} font-mono`, It = "text-[12px] font-semibold text-text-secondary", Ar = "text-[11px] text-text-tertiary mt-0.5";
function xd({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-image-ref-path", className: It, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-describe-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: fd,
          value: t.imageRefPath ?? "",
          onChange: (r) => n({ imageRefPath: r.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Ar, children: "JSONPath to the imageId to describe. Required." }),
      /* @__PURE__ */ e(md, { samples: ud, onSelect: (r) => n({ imageRefPath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-user-prompt", className: It, children: "User prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-describe-user-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${At} resize-y`,
          value: t.userPrompt ?? "",
          onChange: (r) => n({ userPrompt: r.target.value }),
          placeholder: "Describe what you see in this image in one paragraph."
        }
      ),
      /* @__PURE__ */ e("div", { className: Ar, children: "Required. What to ask the model about the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-model", className: It, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-describe-model",
          className: At,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (r) => n({ model: r.target.value }),
          children: hd.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-describe-system-prompt", className: It, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-describe-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${At} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (r) => n({ systemPrompt: r.target.value || void 0 }),
          placeholder: "Leave blank to use the default describe system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-describe-max-output-tokens", className: It, children: [
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
          className: At,
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
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], dt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", vd = `${dt} font-mono`, it = "text-[12px] font-semibold text-text-secondary", Rr = "text-[11px] text-text-tertiary mt-0.5";
function Nd({ data: t, onChange: n }) {
  const [r, a] = S(""), i = t.candidateTags ?? [], s = () => {
    const c = r.trim();
    !c || i.includes(c) || (n({ candidateTags: [...i, c] }), a(""));
  }, d = (c) => {
    n({ candidateTags: i.filter((l, p) => p !== c) });
  };
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-tag-image-ref-path", className: it, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-tag-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: vd,
          value: t.imageRefPath ?? "",
          onChange: (c) => n({ imageRefPath: c.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Rr, children: "JSONPath to the imageId to tag. Required." }),
      /* @__PURE__ */ e(bd, { samples: gd, onSelect: (c) => n({ imageRefPath: c }) })
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
      /* @__PURE__ */ e("div", { className: Rr, children: "Restricts tagging to this vocabulary. Leave empty for open-ended tags." })
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
          children: yd.map((c) => /* @__PURE__ */ e("option", { value: c.value, children: c.label }, c.value))
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
const wd = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function kd({ samples: t, onSelect: n }) {
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
const Cd = [
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (default — best OCR accuracy)" },
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (faster, lower accuracy)" }
], Kt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Id = `${Kt} font-mono`, Wt = "text-[12px] font-semibold text-text-secondary", kn = "text-[11px] text-text-tertiary mt-0.5";
function Sd({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-image-ref-path", className: Wt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-extract-text-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Id,
          value: t.imageRefPath ?? "",
          onChange: (r) => n({ imageRefPath: r.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: kn, children: "JSONPath to the imageId to extract text from. Required." }),
      /* @__PURE__ */ e(kd, { samples: wd, onSelect: (r) => n({ imageRefPath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-model", className: Wt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-extract-text-model",
          className: Kt,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (r) => n({ model: r.target.value }),
          children: Cd.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
        }
      ),
      /* @__PURE__ */ e("div", { className: kn, children: "Defaults to Sonnet for best OCR accuracy." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-extract-text-system-prompt", className: Wt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-extract-text-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Kt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (r) => n({ systemPrompt: r.target.value || void 0 }),
          placeholder: "Leave blank to use the default OCR system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-extract-text-max-output-tokens", className: Wt, children: [
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
          className: Kt,
          value: t.maxOutputTokens ?? 1024,
          onChange: (r) => {
            const a = parseInt(r.target.value, 10);
            n({ maxOutputTokens: Number.isFinite(a) && a > 0 ? a : 1024 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: kn, children: "Increase for documents with large amounts of text." })
    ] })
  ] });
}
const $d = [
  { value: "amazon.titan-image-generator-v2:0", label: "Titan v2 (default)" },
  { value: "amazon.titan-image-generator-v1", label: "Titan v1" }
], st = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", lt = "text-[12px] font-semibold text-text-secondary", Pr = "text-[11px] text-text-tertiary mt-0.5";
function Td({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(ye, { children: [
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
      /* @__PURE__ */ e("div", { className: Pr, children: "Text description of the image to generate. Required." })
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
          children: $d.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
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
      /* @__PURE__ */ e("div", { className: Pr, children: "When > 1, the step fans out with one arm per image. Each arm carries one imageId." })
    ] })
  ] });
}
const Ad = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Rd({ samples: t, onSelect: n }) {
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
], Gt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Md = `${Gt} font-mono`, Jt = "text-[12px] font-semibold text-text-secondary", Mr = "text-[11px] text-text-tertiary mt-0.5";
function Ed({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-source-image-path", className: Jt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "variation-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Md,
          value: t.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Rd, { samples: Ad, onSelect: (r) => n({ sourceImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "variation-model", className: Jt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "variation-model",
          className: Gt,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (r) => n({ model: r.target.value }),
          children: Pd.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-num-variations", className: Jt, children: [
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
          className: Gt,
          value: t.numVariations ?? 1,
          onChange: (r) => {
            const a = parseInt(r.target.value, 10);
            n({ numVariations: Number.isFinite(a) && a >= 1 ? Math.min(8, a) : 1 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Mr, children: "Always fans out — each variation becomes a separate arm downstream." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-similarity", className: Jt, children: [
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
          className: Gt,
          value: t.similarity ?? 0.7,
          onChange: (r) => {
            const a = parseFloat(r.target.value);
            n({ similarity: Number.isFinite(a) ? Math.min(1, Math.max(0, a)) : 0.7 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Mr, children: "0 = very different, 1 = nearly identical. 0.7 is a good starting point." })
    ] })
  ] });
}
const Dd = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
], Od = [
  "$.steps.mask.output.imageId",
  "$.trigger.maskRef"
];
function Er({ samples: t, onSelect: n }) {
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
const _d = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], Bn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Dr = `${Bn} font-mono`, Ht = "text-[12px] font-semibold text-text-secondary", Or = "text-[11px] text-text-tertiary mt-0.5";
function Ld({ data: t, onChange: n }) {
  return /* @__PURE__ */ o(ye, { children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-source-image-path", className: Ht, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "edit-prompt-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Dr,
          value: t.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Er, { samples: Dd, onSelect: (r) => n({ sourceImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-mask-image-path", className: Ht, children: [
        "Mask image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "edit-prompt-mask-image-path",
          type: "text",
          spellCheck: !1,
          className: Dr,
          value: t.maskImagePath ?? "",
          onChange: (r) => n({ maskImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.steps.mask.output.imageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: Or, children: "JSONPath to a mask image. White pixels = edit region, black = preserve. Omit for outpainting." }),
      /* @__PURE__ */ e(Er, { samples: Od, onSelect: (r) => n({ maskImagePath: r }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-prompt", className: Ht, children: "Edit prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "edit-prompt-prompt",
          rows: 4,
          spellCheck: !1,
          className: `${Bn} resize-y min-h-20`,
          value: t.prompt ?? "",
          onChange: (r) => n({ prompt: r.target.value }),
          placeholder: "Replace the background with a sunny beach"
        }
      ),
      /* @__PURE__ */ e("div", { className: Or, children: "Describes what to generate in the masked region. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-model", className: Ht, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "edit-prompt-model",
          className: Bn,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (r) => n({ model: r.target.value }),
          children: _d.map((r) => /* @__PURE__ */ e("option", { value: r.value, children: r.label }, r.value))
        }
      )
    ] })
  ] });
}
const Bd = {
  // -------------------------------------------------------------------------
  // Trigger
  // -------------------------------------------------------------------------
  trigger: /* @__PURE__ */ o(Y, { children: [
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
  llm: /* @__PURE__ */ o(Y, { children: [
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
  transform: /* @__PURE__ */ o(Y, { children: [
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
  condition: /* @__PURE__ */ o(Y, { children: [
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
  action: /* @__PURE__ */ o(Y, { children: [
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
  fork: /* @__PURE__ */ o(Y, { children: [
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
  join: /* @__PURE__ */ o(Y, { children: [
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
  approval: /* @__PURE__ */ o(Y, { children: [
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
  agent: /* @__PURE__ */ o(Y, { children: [
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
  "mcp-tool": /* @__PURE__ */ o(Y, { children: [
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
  "knowledge-base": /* @__PURE__ */ o(Y, { children: [
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
  "graph-query": /* @__PURE__ */ o(Y, { children: [
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
  memory: /* @__PURE__ */ o(Y, { children: [
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
  guardrail: /* @__PURE__ */ o(Y, { children: [
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
  policy: /* @__PURE__ */ o(Y, { children: [
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
  "ag-ui-output": /* @__PURE__ */ o(Y, { children: [
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
  "image-source": /* @__PURE__ */ o(Y, { children: [
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
  "image:save": /* @__PURE__ */ o(Y, { children: [
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
  scatter: /* @__PURE__ */ o(Y, { children: [
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
  "image:resize": /* @__PURE__ */ o(Y, { children: [
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
  "image:transform": /* @__PURE__ */ o(Y, { children: [
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
  "image:format-convert": /* @__PURE__ */ o(Y, { children: [
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
  "image:sharpen": /* @__PURE__ */ o(Y, { children: [
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
  "image:watermark": /* @__PURE__ */ o(Y, { children: [
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
  "image:crop": /* @__PURE__ */ o(Y, { children: [
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
  "image:adjust-bw": /* @__PURE__ */ o(Y, { children: [
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
  "image:adjust-layer": /* @__PURE__ */ o(Y, { children: [
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
  "image:vision-analyze": /* @__PURE__ */ o(Y, { children: [
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
  "image:vision-classify": /* @__PURE__ */ o(Y, { children: [
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
  "image:vision-describe": /* @__PURE__ */ o(Y, { children: [
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
  "image:vision-tag": /* @__PURE__ */ o(Y, { children: [
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
  "image:vision-extract-text": /* @__PURE__ */ o(Y, { children: [
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
  "image:generate": /* @__PURE__ */ o(Y, { children: [
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
  "image:variation": /* @__PURE__ */ o(Y, { children: [
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
  "image:edit-prompt": /* @__PURE__ */ o(Y, { children: [
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
function Ud({ result: t, className: n }) {
  const { caption: r, setting: a, location: i, timeOfDay: s, mood: d, colors: c } = t;
  return !r && !a && !i && !s && !d && (!c || c.length === 0) ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", n), children: [
    r ? /* @__PURE__ */ e("p", { className: "text-base leading-relaxed text-text-primary", children: r }) : null,
    /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1.5", children: [
      a ? /* @__PURE__ */ o(ie, { tone: "neutral", size: "sm", title: "Scene setting", children: [
        "setting: ",
        a
      ] }) : null,
      i ? /* @__PURE__ */ o(ie, { tone: "neutral", size: "sm", title: "Location", children: [
        "loc: ",
        i
      ] }) : null,
      s ? /* @__PURE__ */ o(ie, { tone: "neutral", size: "sm", title: "Time of day", children: [
        "tod: ",
        s
      ] }) : null,
      d ? /* @__PURE__ */ o(ie, { tone: "info", size: "sm", title: "Mood", children: [
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
const Fd = {
  people: { stroke: "#4f46e5", fill: "rgba(79,70,229,0.10)", text: "bg-indigo-600 text-white" },
  object: { stroke: "#d97706", fill: "rgba(217,119,6,0.10)", text: "bg-amber-600 text-white" }
};
function jd({
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
  const f = n ?? t, [h, x] = S(null), g = se(null), m = D(() => {
    const y = g.current;
    y && (!r || !a) && x({ w: y.naturalWidth, h: y.naturalHeight });
  }, [r, a]), v = z(() => r && a && r > 0 && a > 0 ? { w: r, h: a } : h && h.w > 0 && h.h > 0 ? h : null, [r, a, h]), N = (y, w, b, k, C) => {
    if (!v) return null;
    const T = Math.max(0, Math.min(y.x1, v.w)), $ = Math.max(0, Math.min(y.y1, v.h)), A = Math.max(0, Math.min(y.x2, v.w)), E = Math.max(0, Math.min(y.y2, v.h));
    if (!Number.isFinite(T) || !Number.isFinite($) || !Number.isFinite(A) || !Number.isFinite(E) || A <= T || E <= $) return null;
    const P = T / v.w * 100, B = $ / v.h * 100, V = (A - T) / v.w * 100, ae = (E - $) / v.h * 100, K = Fd[b];
    return /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: k,
        title: w,
        "aria-label": `${b === "people" ? "Person" : "Object"} bounding box: ${w}`,
        className: "group absolute m-0 cursor-pointer border-0 p-0 outline-none focus:ring-2 focus:ring-offset-1",
        style: {
          left: `${P}%`,
          top: `${B}%`,
          width: `${V}%`,
          height: `${ae}%`,
          background: K.fill,
          border: `2px solid ${K.stroke}`,
          borderRadius: "2px"
        },
        children: /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "pointer-events-none absolute -top-5 left-0 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none shadow",
              K.text
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
        v ? /* @__PURE__ */ e("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ o("div", { className: "pointer-events-auto absolute inset-0", children: [
          (d === "people" || d === "both") && (i ?? []).map(
            (y) => N(
              y.bbox,
              `#${y.index}${y.activity ? " · " + y.activity.replace(/^::\s*/, "") : ""}`,
              "people",
              c ? () => c(y) : void 0,
              `p-${y.index}`
            )
          ),
          (d === "objects" || d === "both") && (s ?? []).map(
            (y, w) => N(
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
function zd(t) {
  return {
    imageUrl: t.imageUrl,
    imageDataUrl: t.imageDataUrl,
    imageWidth: t.imageWidth,
    imageHeight: t.imageHeight,
    people: t.people,
    objects: t.objects
  };
}
function qd({ people: t, highlightedIndex: n, onSelect: r, className: a }) {
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
      ), l = /* @__PURE__ */ o(Y, { children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": !0,
              className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold leading-none text-white",
              children: i.index
            }
          ),
          i.ageBucket ? /* @__PURE__ */ e(ie, { tone: "neutral", size: "sm", children: i.ageBucket.replace("_", " ") }) : null,
          i.gender ? /* @__PURE__ */ e(ie, { tone: "neutral", size: "sm", children: i.gender }) : null,
          i.faceOrientation ? /* @__PURE__ */ e(ie, { tone: "neutral", size: "sm", title: "Face orientation", children: i.faceOrientation }) : null,
          i.expression ? /* @__PURE__ */ e(ie, { tone: "info", size: "sm", children: i.expression }) : null
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
function Vd({ objects: t, onSelect: n, className: r }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Objects (",
      t.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "grid grid-cols-1 gap-1 sm:grid-cols-2", children: t.map((a, i) => {
      const s = I(
        "flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 text-left text-[13px]"
      ), d = /* @__PURE__ */ o(Y, { children: [
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
function Wd({ tags: t, onTagClick: n, className: r }) {
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
          children: /* @__PURE__ */ o(ie, { tone: "info", size: "sm", children: [
            "#",
            a
          ] })
        },
        a
      ) : /* @__PURE__ */ o(ie, { tone: "info", size: "sm", children: [
        "#",
        a
      ] }, a)
    ) })
  ] });
}
function Yt(t) {
  return t ? t === "correct" || t === "neutral" || t === "normal" ? "success" : "warning" : "neutral";
}
function Cn(t) {
  const n = Yt(t);
  return n === "success" ? `OK · ${t}` : n === "warning" ? `ADJUST · ${t}` : t ?? "";
}
function Jd({
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
          /* @__PURE__ */ e(ie, { tone: Yt(t.verdict), size: "sm", children: Cn(t.verdict) }),
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
          /* @__PURE__ */ e(ie, { tone: Yt(n.verdict), size: "sm", children: Cn(n.verdict) }),
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
        /* @__PURE__ */ e("span", { className: "ml-1.5", children: /* @__PURE__ */ e(ie, { tone: Yt(r), size: "sm", children: Cn(r) }) })
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
function Hd({
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
  const [f, h] = S(), [x, g] = S(!1), m = (N) => h(f === N.index ? void 0 : N.index), v = zd(t);
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-4 text-text-primary", u), children: [
    /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-12", children: [
      n ? /* @__PURE__ */ o("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ e(
          jd,
          {
            ...v,
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
          typeof t.model.tokensOut == "number" ? /* @__PURE__ */ o(Y, { children: [
            /* @__PURE__ */ e("span", { children: "·" }),
            /* @__PURE__ */ o("span", { children: [
              t.model.tokensOut,
              " tok out"
            ] })
          ] }) : null
        ] }) : null
      ] }) : null,
      /* @__PURE__ */ o("div", { className: I("flex flex-col gap-4", n ? "md:col-span-5" : "md:col-span-12"), children: [
        r ? /* @__PURE__ */ e(Ud, { result: t }) : null,
        a && t.people && t.people.length > 0 ? /* @__PURE__ */ e(
          qd,
          {
            people: t.people,
            highlightedIndex: f,
            onSelect: m
          }
        ) : null
      ] })
    ] }),
    i && t.objects && t.objects.length > 0 ? /* @__PURE__ */ e(Vd, { objects: t.objects }) : null,
    s && t.tags && t.tags.length > 0 ? /* @__PURE__ */ e(Wd, { tags: t.tags, onTagClick: l }) : null,
    d ? /* @__PURE__ */ e(
      Jd,
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
      /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1", children: t.text.map((N, y) => /* @__PURE__ */ e(
        "li",
        {
          className: "rounded border border-border bg-surface px-2 py-1 font-mono text-[12px]",
          children: N
        },
        y
      )) })
    ] }) : null,
    c && t.rawText ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => g((N) => !N),
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
const Kd = [
  { value: "claude-haiku-4-5-20251001", label: "Haiku 4.5" },
  { value: "claude-sonnet-4-6", label: "Sonnet 4.6" },
  { value: "claude-opus-4-7", label: "Opus 4.7" }
], _r = "claude-sonnet-4-6", Lr = [
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
function Gd(t) {
  const n = [`${t.inputTokens} in`, `${t.outputTokens} out`];
  return t.cacheReadTokens && n.push(`${t.cacheReadTokens} cached`), n.join(" / ");
}
function Yd({
  systemPrompt: t,
  userPrompt: n,
  outputSchema: r,
  model: a,
  onSave: i,
  apiBase: s = ""
}) {
  const d = co(), [c, l] = S(t), [p, u] = S(n), [f, h] = S(a ?? _r), [x, g] = S(
    r ? JSON.stringify(r, null, 2) : ""
  ), [m, v] = S("0"), [N, y] = S(null), [w, b] = S(!1), [k, C] = S(null), [T, $] = S(null), A = D(() => {
    const ee = x.trim();
    if (ee)
      try {
        const O = JSON.parse(ee);
        if (O && typeof O == "object" && !Array.isArray(O))
          return O;
      } catch {
      }
  }, [x]), E = D((ee) => {
    v(ee);
    const O = Number(ee), R = Lr[O];
    R && (g(R.value ? JSON.stringify(R.value, null, 2) : ""), R.systemPrompt !== void 0 && l(R.systemPrompt));
  }, []), P = N?.imageId ?? null, B = P ? d.getImageUrl(P) : null, V = D(async () => {
    if (!P) {
      C("Upload or paste a sample image URL first.");
      return;
    }
    if (!p.trim()) {
      C("User prompt is required.");
      return;
    }
    b(!0), C(null), $(null);
    const ee = A();
    try {
      const O = await fetch(`${s}/api/pipeline/preview/vision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageId: P,
          systemPrompt: c.trim() || void 0,
          userPrompt: p.trim(),
          outputSchema: ee,
          model: f || _r
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
      const J = {
        imageUrl: B ?? "",
        caption: R.caption ?? "",
        rawText: typeof R.extracted == "object" && R.extracted ? JSON.stringify(R.extracted, null, 2) : void 0,
        model: {
          endpointId: f,
          latencyMs: R.latencyMs ?? 0,
          tokensIn: R.usage?.inputTokens,
          tokensOut: R.usage?.outputTokens
        }
      };
      $({
        visionResult: J,
        rawExtracted: R.extracted,
        usage: R.usage ?? { inputTokens: 0, outputTokens: 0 },
        latencyMs: R.latencyMs ?? 0,
        costUsd: R.costUsd ?? 0
      });
    } catch (O) {
      C(O instanceof Error ? O.message : "Network error");
    } finally {
      b(!1);
    }
  }, [P, B, p, c, f, A, s]), ae = () => {
    i({
      systemPrompt: c,
      userPrompt: p,
      outputSchema: A()
    });
  }, K = "text-[12px] font-semibold text-text-secondary";
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-4 px-4 py-3", "data-testid": "vision-prompt-bench", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: I(K, "mb-1"), children: "Sample image" }),
      /* @__PURE__ */ e(
        So,
        {
          value: N,
          onChange: (ee) => y(ee),
          "data-testid": "bench-image-uploader"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("label", { className: K, children: "System prompt" }),
        /* @__PURE__ */ e(
          sn,
          {
            value: c,
            onChange: (ee) => l(ee.target.value),
            rows: 3,
            placeholder: "Optional override of the default vision system prompt.",
            "data-testid": "bench-system-prompt",
            className: "mt-1 text-[12px] font-mono"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("label", { className: K, children: [
          "User prompt ",
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ e(
          sn,
          {
            value: p,
            onChange: (ee) => u(ee.target.value),
            rows: 3,
            placeholder: "Describe what you want the model to do with the image.",
            "data-testid": "bench-user-prompt",
            className: "mt-1 text-[12px]"
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ e("label", { className: K, children: "Output schema" }),
          /* @__PURE__ */ e(
            Qt,
            {
              value: m,
              onChange: (ee) => E(ee.target.value),
              options: Lr.map((ee, O) => ({ value: String(O), label: ee.label })),
              size: "sm",
              "aria-label": "Schema preset",
              "data-testid": "bench-schema-preset"
            }
          )
        ] }),
        /* @__PURE__ */ e(
          sn,
          {
            value: x,
            onChange: (ee) => g(ee.target.value),
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
        Qt,
        {
          value: f,
          onChange: (ee) => h(ee.target.value),
          options: Kd,
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
            V();
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
    T && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2 border-t border-border pt-3", "data-testid": "bench-result", children: [
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1.5", children: [
        /* @__PURE__ */ o("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-surface-inset border border-border text-text-secondary", children: [
          Gd(T.usage),
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
        Hd,
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
          onClick: ae,
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
const Xd = {
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
}, In = /* @__PURE__ */ new Set([
  "image:vision-analyze",
  "image:vision-classify",
  "image:vision-describe",
  "image:vision-tag",
  "image:vision-extract-text"
]), qe = ({ data: t }) => /* @__PURE__ */ o("div", { className: "p-3 text-[13px] text-[#64748b]", children: [
  "Configuration for ",
  /* @__PURE__ */ e("strong", { children: t.type }),
  " — coming in Phase C."
] }), Qd = {
  trigger: $l,
  llm: Ml,
  transform: Ol,
  condition: Ll,
  action: Fl,
  fork: jl,
  join: Vl,
  approval: Jl,
  agent: qe,
  "mcp-tool": qe,
  "knowledge-base": qe,
  "graph-query": qe,
  memory: qe,
  guardrail: qe,
  policy: qe,
  "ag-ui-output": qe,
  "image-source": qe,
  "image:save": qe,
  scatter: rc,
  "image:resize": sc,
  "image:transform": hc,
  "image:format-convert": yc,
  "image:sharpen": wc,
  "image:watermark": Sc,
  "image:crop": _c,
  "image:adjust-bw": Uc,
  "image:adjust-layer": Zc,
  "image:vision-analyze": id,
  "image:vision-classify": pd,
  "image:vision-describe": xd,
  "image:vision-tag": Nd,
  "image:vision-extract-text": Sd,
  "image:generate": Td,
  "image:variation": Ed,
  "image:edit-prompt": Ld
};
function Zd(t, n) {
  const r = Qd[t.type];
  return /* @__PURE__ */ e(r, { data: t.data, onChange: n });
}
function ep({ selectedIds: t }) {
  const {
    definition: n,
    selectedNodeId: r,
    setSelectedNodeId: a,
    updateNodeData: i,
    removeNode: s,
    duplicateNodes: d
  } = Le(), [c, l] = S("config"), p = se(null), u = se(null);
  jn();
  const f = z(() => t && t.length > 1 ? t : r ? [r] : [], [t, r]), h = f.length > 1, x = f.length > 0, g = z(() => h || f.length === 0 || !n ? null : n.nodes.find((b) => b.id === f[0]) ?? null, [n, f, h]), m = D(() => {
    a(null);
  }, [a]);
  te(() => {
    l("config");
  }, [f.join(",")]), te(() => {
    if (!x) return;
    const b = (k) => {
      k.key === "Escape" && (k.stopPropagation(), m());
    };
    return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b);
  }, [x, m]), te(() => {
    if (!x) return;
    const b = (k) => {
      const C = p.current;
      C && (k.target instanceof Node && C.contains(k.target) || k.target instanceof Element && (k.target.closest("[data-node-type]") || m()));
    };
    return window.addEventListener("mousedown", b), () => window.removeEventListener("mousedown", b);
  }, [x, m]);
  const v = g ? Xd[g.type] : null, N = () => {
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
    /* @__PURE__ */ o(Y, { children: [
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
              onClick: N,
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
  ) : g && v ? (
    // ---------------------------------------------------------------
    // Single-node pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ o(Y, { children: [
      /* @__PURE__ */ o("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ e("span", { className: "text-lg leading-none", "aria-hidden": !0, children: v.icon }),
        /* @__PURE__ */ e("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: v.name }),
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
            const C = g && In.has(g.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"], T = C.indexOf(c);
            let $ = null;
            b.key === "ArrowRight" ? $ = C[(T + 1) % C.length] : b.key === "ArrowLeft" ? $ = C[(T - 1 + C.length) % C.length] : b.key === "Home" ? $ = C[0] : b.key === "End" && ($ = C[C.length - 1]), $ && (b.preventDefault(), l($), u.current?.querySelector(
              `[data-tab="${$}"]`
            )?.focus());
          },
          children: (g && In.has(g.type) ? ["config", "runs", "docs", "bench"] : ["config", "runs", "docs"]).map((b) => {
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
        c === "config" && Zd(g, w),
        c === "runs" && /* @__PURE__ */ e("div", { className: "p-6 text-xs text-[#64748b]", children: "No runs yet." }),
        c === "docs" && /* @__PURE__ */ e("div", { className: "pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug", children: Bd[g.type] ?? /* @__PURE__ */ e("p", { className: "text-text-secondary", children: "No docs available for this node type." }) }),
        c === "bench" && In.has(g.type) && (() => {
          const b = g.data;
          return /* @__PURE__ */ e(
            Yd,
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
            onClick: N,
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
function Ce(t) {
  if (t == null) return "--";
  if (t < 1e3) return `${Math.round(t)}ms`;
  if (t < 6e4) return `${(t / 1e3).toFixed(1)}s`;
  const n = Math.floor(t / 6e4), r = Math.floor(t % 6e4 / 1e3);
  return `${n}m ${r}s`;
}
function ut(t) {
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
function tp(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function np(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function rp(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Br(t) {
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
function Sn(t) {
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
function op(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function tt({ label: t, children: n }) {
  return /* @__PURE__ */ o("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ e("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: t }),
    /* @__PURE__ */ e("span", { className: "text-[13px] text-text-primary", children: n })
  ] });
}
function ap({ pipelineId: t, run: n, onBack: r }) {
  const a = _e();
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
      /* @__PURE__ */ e(tt, { label: "Status", children: /* @__PURE__ */ e(
        ie,
        {
          tone: Br(n.status),
          "aria-label": `Status: ${Sn(n.status)}`,
          children: Sn(n.status)
        }
      ) }),
      /* @__PURE__ */ e(tt, { label: "Started", children: new Date(n.startedAt).toLocaleString() }),
      n.completedAt && /* @__PURE__ */ e(tt, { label: "Completed", children: new Date(n.completedAt).toLocaleString() }),
      /* @__PURE__ */ e(tt, { label: "Duration", children: Ce(n.durationMs) }),
      /* @__PURE__ */ e(tt, { label: "Triggered by", children: op(n) }),
      /* @__PURE__ */ e(tt, { label: "Trigger type", children: n.triggeredBy.triggerType }),
      n.estimatedCostUsd != null && n.estimatedCostUsd > 0 && /* @__PURE__ */ o(tt, { label: "Est. Cost", children: [
        /* @__PURE__ */ e("span", { className: I("font-semibold", rp(n.estimatedCostUsd)), children: np(n.estimatedCostUsd) }),
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
          const d = Br(s.status), c = Sn(s.status), l = s.output, p = l?.response;
          return /* @__PURE__ */ o("div", { className: "mb-2", children: [
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2 py-1 text-xs", children: [
              /* @__PURE__ */ e(ie, { tone: d, "aria-label": `Status: ${c}`, children: c }),
              /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: i.slice(0, 10) }),
              s.durationMs != null && /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: Ce(s.durationMs) })
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
function Ur(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function ip(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function sp(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function lp(t) {
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
function cp(t) {
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
function dp(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function pp({ pipelineId: t, onClose: n }) {
  const r = _e(), [a, i] = S([]), [s, d] = S(!0), [c, l] = S(null), [p, u] = S(null), [f, h] = S(!1), [x, g] = S([]), m = se(null), v = D(async () => {
    d(!0), l(null);
    try {
      const b = await po(t, { limit: 50 });
      i(b.runs);
    } catch (b) {
      l(b instanceof Error ? b.message : "Failed to load runs");
    } finally {
      d(!1);
    }
  }, [t]);
  te(() => {
    m.current !== t && (m.current = t, v());
  }, [t, v]), Me("*", D((b) => {
    const { eventType: k, payload: C } = b;
    if (!C || typeof C != "object") return;
    const T = C;
    if (!(T.pipelineId && T.pipelineId !== t))
      switch (k) {
        case "pipeline.run.started": {
          const $ = C;
          if ($.pipelineId !== t) return;
          const A = {
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
          i((E) => [A, ...E.filter((P) => P.id !== $.runId)]);
          break;
        }
        case "pipeline.run.completed": {
          const $ = C;
          i(
            (A) => A.map(
              (E) => E.id === $.runId ? { ...E, status: "completed", completedAt: $.at, durationMs: $.durationMs } : E
            )
          );
          break;
        }
        case "pipeline.run.failed": {
          const $ = C;
          i(
            (A) => A.map(
              (E) => E.id === $.runId ? { ...E, status: "failed", completedAt: $.at, error: $.error } : E
            )
          );
          break;
        }
        case "pipeline.run.cancelled": {
          const $ = C;
          i(
            (A) => A.map(
              (E) => E.id === $.runId ? { ...E, status: "cancelled", completedAt: $.at } : E
            )
          );
          break;
        }
      }
  }, [t]));
  const N = z(
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
          N && /* @__PURE__ */ e(
            ap,
            {
              pipelineId: t,
              run: N,
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
                  v();
                },
                className: "mx-auto mt-2 block cursor-pointer border-none bg-transparent font-inherit text-xs text-primary underline",
                children: "Retry"
              }
            )
          ] }),
          !s && !c && a.length === 0 && /* @__PURE__ */ e("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "No runs yet. Trigger this pipeline to see history here." }),
          a.length > 0 && /* @__PURE__ */ e("ul", { className: "m-0 flex-1 list-none overflow-y-auto p-0", children: a.map((b) => {
            const k = lp(b.status), C = cp(b.status), T = x.includes(b.id);
            return /* @__PURE__ */ o(
              "li",
              {
                "data-testid": `runs-panel-row-${b.id}`,
                onClick: () => {
                  f ? y(b.id) : u(b.id);
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
                        onChange: () => y(b.id),
                        onClick: ($) => $.stopPropagation(),
                        "data-testid": `runs-panel-compare-check-${b.id}`,
                        className: "m-0 shrink-0 accent-primary",
                        "aria-label": `Select run ${b.id.slice(0, 8)} for comparison`
                      }
                    ),
                    /* @__PURE__ */ e(ie, { tone: k, "aria-label": `Status: ${C}`, children: C }),
                    /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-secondary", children: b.id.slice(0, 8) }),
                    /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: sp(b.startedAt) })
                  ] }),
                  /* @__PURE__ */ o("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ e("span", { children: Ce(b.durationMs) }),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 0 && /* @__PURE__ */ e(
                      "span",
                      {
                        className: I("font-mono font-semibold", ip(b.estimatedCostUsd)),
                        title: `Estimated cost: ${Ur(b.estimatedCostUsd)}`,
                        children: Ur(b.estimatedCostUsd)
                      }
                    ),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 1 && /* @__PURE__ */ e("span", { className: "rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "High Cost" }),
                    /* @__PURE__ */ e("span", { className: "ml-auto", children: dp(b) })
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
function up({
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
          r === "config" && (n !== null ? /* @__PURE__ */ e(ep, {}) : /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          r === "runs" && /* @__PURE__ */ e(
            pp,
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
function mp(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function hp(t) {
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
function fp(t) {
  if (!(t instanceof HTMLElement)) return !1;
  const n = t.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || t.isContentEditable);
}
function bh() {
  const { pipelineId: t } = ht(), n = z(() => t ? nt(t) !== null : !1, [t]);
  return !t || !n ? /* @__PURE__ */ e(ft, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(uo, { pipelineId: t, children: /* @__PURE__ */ e(xp, { pipelineId: t }) });
}
function xp({ pipelineId: t }) {
  const n = _e(), r = Le(), a = xt(), { toast: i } = on(), {
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
  } = r, m = ol(t), [v, N] = S(!1), y = se(null), w = se(d);
  te(() => (w.current && !d && (N(!0), y.current && clearTimeout(y.current), y.current = setTimeout(() => N(!1), 450)), w.current = d, () => {
    y.current && (clearTimeout(y.current), y.current = null);
  }), [d]);
  const b = z(
    () => s ? No(s) : null,
    [s]
  ), k = (b?.errors.length ?? 0) > 0, C = z(
    () => hp(s),
    [s]
  ), $ = z(() => s ? s.nodes.some((he) => he.type === "trigger") : !1, [s]) ? ["trigger"] : [], [A, E] = S(!0), [P, B] = S(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), V = D(() => {
    B((he) => {
      const re = !he;
      try {
        window.localStorage.setItem(
          "ws_pipelines_v1_show_tags",
          re ? "true" : "false"
        );
      } catch {
      }
      return re;
    });
  }, []), [ae, K] = S(!1), [ee, O] = S(!1), [R, J] = S(!1), [H, L] = S(!1), [q, W] = S(!1), G = z(() => s?.publishedSnapshot ? s.publishedSnapshot : null, [s]), de = s?.status === "published", j = !m.isRunActive && (!de || k), le = m.isRunActive ? "Cancel the active run" : de ? k ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", ve = D(async () => {
    if (m.isRunActive && m.currentRunId) {
      a.cancelRun(m.currentRunId);
      return;
    }
    if (!j) {
      if (C.length > 0) {
        m.setTriggerInputValues(
          Object.fromEntries(C.map((he) => [he, ""]))
        ), m.setTriggerInputOpen(!0);
        return;
      }
      m.handleRunClick();
    }
  }, [m, a, j, C]);
  te(() => {
    const he = (re) => {
      if (fp(re.target)) return;
      const X = re.metaKey || re.ctrlKey;
      if (X && re.key.toLowerCase() === "s") {
        re.preventDefault(), p(), i("Saved", { type: "success", durationMs: 1200 });
        return;
      }
      if (X && re.key === "Enter") {
        re.preventDefault(), ve();
        return;
      }
      if (X && re.key === ".") {
        re.preventDefault(), m.isRunActive && m.currentRunId && a.cancelRun(m.currentRunId);
        return;
      }
      if (X && re.shiftKey && re.key.toLowerCase() === "z") {
        re.preventDefault(), x();
        return;
      }
      if (X && re.key.toLowerCase() === "z") {
        re.preventDefault(), h();
        return;
      }
      if (re.key === "Escape") {
        l(null);
        return;
      }
    };
    return window.addEventListener("keydown", he), () => window.removeEventListener("keydown", he);
  }, [p, i, ve, m, a, h, x, l]);
  const De = () => {
    if (!s) return;
    const he = Fn(s.id);
    he && n(`/pipelines/${he.id}`);
  }, Ke = () => {
    if (!s) return;
    const he = Rn(s.id);
    he && Pt(`${mp(s.name)}.pipeline.json`, he);
  }, Be = async () => {
    if (!s) return;
    const he = Ys(s);
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(he), i("Mermaid diagram copied", { type: "success" });
      else
        throw new Error("clipboard unavailable");
    } catch (re) {
      console.warn("[PipelineEditor] clipboard write failed", re), i("Could not copy Mermaid diagram", { type: "error" });
    }
  }, Pe = () => {
    L(!0);
  }, je = () => {
    K(!1), !k && (u(), i("Pipeline published", { type: "success" }));
  }, Ue = () => {
    s && (Xo(s.id), O(!1), n("/pipelines"));
  }, ze = () => {
    mo(t), J(!1), i("Run history cleared", { type: "success" });
  }, ke = m.currentRunId ? a.runs[m.currentRunId] : void 0;
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
          il,
          {
            pipelineId: t,
            definition: s,
            dirty: d,
            savingFlash: v,
            isRunActive: m.isRunActive,
            isTriggering: m.isTriggering,
            runDisabled: j,
            runTitle: le,
            currentRun: ke,
            breakpoints: m.breakpoints,
            onRunClick: ve,
            onDebugRunClick: m.handleDebugRunClick,
            onExport: Ke,
            onPublishClick: () => K(!0),
            onDuplicate: De,
            onCopyMermaid: Be,
            onViewVersions: Pe,
            onRevert: f,
            onToggleShowTags: V,
            showTags: P,
            onViewRunHistory: () => m.setSidebarTab("runs"),
            onClearRunHistory: () => J(!0),
            onSimPanelOpen: () => W(!0),
            onDelete: () => O(!0)
          }
        ),
        P && /* @__PURE__ */ o(
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
                Na,
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
          /* @__PURE__ */ e(Qi, { disabledTypes: $ }),
          /* @__PURE__ */ e("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ e(
            ms,
            {
              errorNodeId: m.activeError?.nodeId ?? null,
              onErrorNodePosition: m.handleErrorNodePosition,
              breakpoints: m.breakpoints,
              onToggleBreakpoint: m.handleToggleBreakpoint,
              pausedAtNodeId: m.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ e(
            up,
            {
              pipelineId: t,
              selectedNodeId: c,
              sidebarTab: m.sidebarTab,
              onTabChange: m.setSidebarTab
            }
          )
        ] }),
        m.pausedBreakpoint && /* @__PURE__ */ e(
          gl,
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
          fs,
          {
            error: m.activeError,
            anchor: m.errorNodeAnchor,
            onDismiss: m.handleDismissError,
            onRetry: m.handleRetryFromError
          }
        ),
        /* @__PURE__ */ e(
          rl,
          {
            runId: m.currentRunId,
            visible: m.isRunActive && A
          }
        ),
        /* @__PURE__ */ e(
          nl,
          {
            publishConfirmOpen: ae,
            onPublishClose: () => K(!1),
            onPublishConfirm: je,
            hasErrors: k,
            validationErrorCount: b?.errors.length ?? 0,
            definitionName: s.name,
            definitionVersion: s.version,
            deleteConfirmOpen: ee,
            onDeleteClose: () => O(!1),
            onDeleteConfirm: Ue,
            clearRunsConfirmOpen: R,
            onClearRunsClose: () => J(!1),
            onClearRunsConfirm: ze,
            versionDiffOpen: H,
            onVersionDiffClose: () => L(!1),
            currentDef: s,
            publishedDef: G,
            onJumpToNode: l,
            simPanelOpen: q,
            onSimPanelClose: () => W(!1)
          }
        ),
        /* @__PURE__ */ e(
          We,
          {
            open: m.triggerInputOpen,
            onClose: () => m.setTriggerInputOpen(!1),
            title: "Trigger inputs",
            maxWidth: 480,
            footer: /* @__PURE__ */ o(Y, { children: [
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
                    onChange: (re) => m.setTriggerInputValues((X) => ({ ...X, [he]: re.target.value }))
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
function gp(t) {
  const n = t?.event;
  return !n || n === "manual" ? { icon: "▶", text: "Manual" } : n === "schedule" ? { icon: "⏱", text: t?.schedule ?? "Schedule" } : n === "webhook" ? { icon: "🔌", text: t?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${t?.event}` };
}
function bp({
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
  const [u, f] = S(!1), [h, x] = S(!1), g = se(null);
  mt(g, () => f(!1), u);
  const m = t.status === "published", v = t.status === "archived", N = typeof t.publishedVersion == "number", y = gp(t.triggerBinding);
  let w, b;
  v ? (w = `Archived · v${t.version}`, b = "danger") : m ? (w = `Published · v${t.version}`, b = "success") : N ? (w = `Draft · v${t.version} (published v${t.publishedVersion})`, b = "warning") : (w = `Draft · v${t.version}`, b = "neutral");
  const k = !m, C = (A) => (E) => {
    E.stopPropagation(), A();
  }, T = d || c || h || l, $ = (A) => {
    d ? p(A.shiftKey) : n();
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
        T && /* @__PURE__ */ e(
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
          /* @__PURE__ */ e(ie, { "aria-label": `Status: ${w}`, tone: b, size: "sm", children: w }),
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
                onClick: C(() => f((A) => !A)),
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
const yp = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, vp = ["draft", "published"];
function Np({
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
            children: Kn.map((h) => {
              const x = a ? r.has(h) : vp.includes(h);
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
                  children: yp[h]
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
const Ge = I(
  "px-2.5 py-[5px] text-xs font-semibold",
  "bg-white text-text-secondary",
  "border border-border-field rounded-md",
  "cursor-pointer font-inherit"
);
function wp({
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
  unionTags: v
}) {
  const [N, y] = S(""), w = se(null), b = se(null), k = se(null);
  te(() => {
    u && (y(""), setTimeout(() => w.current?.focus(), 30));
  }, [u]), te(() => {
    if (!u) return;
    const T = (A) => {
      b.current?.contains(A.target) || g();
    }, $ = window.setTimeout(() => {
      document.addEventListener("mousedown", T);
    }, 0);
    return () => {
      window.clearTimeout($), document.removeEventListener("mousedown", T);
    };
  }, [u, g]), te(() => {
    if (!f) return;
    const T = (A) => {
      k.current?.contains(A.target) || m();
    }, $ = window.setTimeout(() => {
      document.addEventListener("mousedown", T);
    }, 0);
    return () => {
      window.clearTimeout($), document.removeEventListener("mousedown", T);
    };
  }, [f, m]);
  const C = () => {
    const T = N.trim();
    T.length !== 0 && (h(T), y(""));
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
        /* @__PURE__ */ e("button", { "data-testid": "bulk-clear", className: Ge, onClick: n, children: "Clear" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-publish", className: Ge, onClick: i, children: "Publish selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-archive", className: Ge, onClick: s, children: "Archive selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export-json", className: Ge, onClick: a, children: "Export selected as JSON" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export", className: Ge, onClick: r, children: "Export all" }),
        /* @__PURE__ */ e(
          "button",
          {
            "data-testid": "bulk-delete-confirm-prompt",
            className: Ge,
            onClick: p,
            children: "Delete selected"
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", children: [
          /* @__PURE__ */ e("button", { "data-testid": "bulk-add-tag-btn", className: Ge, onClick: d, children: "Add tag..." }),
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
                    value: N,
                    onChange: (T) => y(T.target.value),
                    onKeyDown: (T) => {
                      T.key === "Enter" ? (T.preventDefault(), C()) : T.key === "Escape" && (T.preventDefault(), g());
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
                Ge,
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
                /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: "Click a tag to remove it from all selected:" }),
                /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: v.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "No tags to remove." }) : v.map((T) => /* @__PURE__ */ o(
                  "button",
                  {
                    "data-testid": `bulk-remove-tag-chip-${T}`,
                    onClick: () => x(T),
                    className: I(
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
function kp({
  visibleRows: t,
  filteredIds: n
}) {
  const [r, a] = S(!1), [i, s] = S(/* @__PURE__ */ new Set()), d = se(null), c = se(null), l = D(() => {
    s(/* @__PURE__ */ new Set());
  }, []), p = D(() => {
    r ? (l(), a(!1)) : a(!0);
  }, [r, l]), u = D(
    (m, v = !1) => {
      const N = t, y = N.findIndex((b) => b.id === m), w = d.current;
      y !== -1 && (d.current = y), s((b) => {
        const k = new Set(b), C = !k.has(m);
        if (v && w != null && y !== -1) {
          const T = Math.min(w, y), $ = Math.max(w, y);
          for (let A = T; A <= $; A++) {
            const E = N[A];
            E && (C ? k.add(E.id) : k.delete(E.id));
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
      const v = new Set(m);
      if (h)
        for (const N of t) v.delete(N.id);
      else
        for (const N of t) v.add(N.id);
      return v;
    }), r || a(!0);
  }, [h, t, r]);
  return te(() => {
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
const Cp = 280, Ne = 160, Ip = 40, Sp = 200;
function Q(t) {
  return Ip + t * Cp;
}
function Z(t) {
  return Sp + t * Ne;
}
function ne(t, n, r, a = "in") {
  return {
    id: crypto.randomUUID(),
    source: t,
    sourceHandle: n,
    target: r,
    targetHandle: a
  };
}
function $p(t) {
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
    { id: r, type: "trigger", position: { x: Q(0), y: Z(0) }, data: s },
    { id: a, type: "llm", position: { x: Q(1), y: Z(0) }, data: d },
    { id: i, type: "action", position: { x: Q(2), y: Z(0) }, data: c }
  ], p = [
    ne(r, "out", a),
    ne(a, "out", i)
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
function Tp(t) {
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
  }, v = [
    { id: r, type: "trigger", position: { x: Q(0), y: Z(0) }, data: p },
    { id: a, type: "fork", position: { x: Q(1), y: Z(0) }, data: u },
    { id: i, type: "llm", position: { x: Q(2), y: Z(0) - Ne / 2 }, data: f },
    { id: s, type: "action", position: { x: Q(3), y: Z(0) - Ne / 2 }, data: h },
    { id: d, type: "llm", position: { x: Q(2), y: Z(0) + Ne / 2 }, data: x },
    { id: c, type: "action", position: { x: Q(3), y: Z(0) + Ne / 2 }, data: g },
    { id: l, type: "join", position: { x: Q(4), y: Z(0) }, data: m }
  ], N = [
    ne(r, "out", a),
    ne(a, "branch-0", i),
    ne(i, "out", s),
    ne(s, "out", l, "in-0"),
    ne(a, "branch-1", d),
    ne(d, "out", c),
    ne(c, "out", l, "in-1")
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
function Ap(t) {
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
    { id: r, type: "trigger", position: { x: Q(0), y: Z(0) }, data: f },
    { id: a, type: "llm", position: { x: Q(1), y: Z(0) }, data: h },
    { id: i, type: "condition", position: { x: Q(2), y: Z(0) }, data: x },
    { id: s, type: "action", position: { x: Q(3), y: Z(0) - Ne / 2 }, data: g },
    { id: d, type: "action", position: { x: Q(3), y: Z(0) + Ne / 2 }, data: m },
    { id: c, type: "approval", position: { x: Q(4), y: Z(0) + Ne / 2 }, data: v },
    { id: l, type: "condition", position: { x: Q(5), y: Z(0) + Ne / 2 }, data: N },
    { id: p, type: "action", position: { x: Q(6), y: Z(0) }, data: y },
    { id: u, type: "action", position: { x: Q(6), y: Z(0) + Ne }, data: w }
  ], k = [
    ne(r, "out", a),
    ne(a, "out", i),
    ne(i, "true", s),
    ne(i, "false", d),
    ne(d, "out", c),
    ne(c, "approved", l),
    ne(c, "rejected", u),
    ne(l, "true", p),
    ne(l, "false", u)
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
function Rp(t) {
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
    { id: r, type: "trigger", position: { x: Q(0), y: Z(0) }, data: d },
    { id: a, type: "llm", position: { x: Q(1), y: Z(0) }, data: c },
    { id: i, type: "transform", position: { x: Q(2), y: Z(0) }, data: l },
    { id: s, type: "action", position: { x: Q(3), y: Z(0) }, data: p }
  ], f = [
    ne(r, "out", a),
    ne(a, "out", i),
    ne(i, "out", s)
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
function Pp(t) {
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
    { id: r, type: "trigger", position: { x: Q(0), y: Z(0) }, data: d },
    { id: a, type: "approval", position: { x: Q(1), y: Z(0) }, data: c },
    { id: i, type: "approval", position: { x: Q(2), y: Z(0) }, data: l },
    { id: s, type: "action", position: { x: Q(3), y: Z(0) }, data: p }
  ], f = [
    ne(r, "out", a),
    ne(a, "approved", i),
    ne(i, "approved", s)
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
function Mp(t) {
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
    { id: r, type: "trigger", position: { x: Q(0), y: Z(0) }, data: d },
    { id: a, type: "transform", position: { x: Q(1), y: Z(0) }, data: c },
    { id: i, type: "llm", position: { x: Q(2), y: Z(0) }, data: l },
    { id: s, type: "action", position: { x: Q(3), y: Z(0) }, data: p }
  ], f = [
    ne(r, "out", a),
    ne(a, "out", i),
    ne(i, "out", s)
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
function Ep(t) {
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
    { id: r, type: "trigger", position: { x: Q(0), y: Z(0) }, data: s },
    { id: a, type: "llm", position: { x: Q(1), y: Z(0) }, data: d },
    { id: i, type: "action", position: { x: Q(2), y: Z(0) }, data: c }
  ], p = [
    ne(r, "out", a),
    ne(a, "out", i)
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
function Dp(t) {
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
    { id: r, type: "trigger", position: { x: Q(0), y: Z(0) }, data: s },
    { id: a, type: "llm", position: { x: Q(1), y: Z(0) }, data: d },
    { id: i, type: "action", position: { x: Q(2), y: Z(0) }, data: c }
  ], p = [
    ne(r, "out", a),
    ne(a, "out", i)
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
function Op(t) {
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
    { id: r, type: "trigger", position: { x: Q(0), y: Z(0) }, data: l },
    { id: a, type: "fork", position: { x: Q(1), y: Z(0) }, data: p },
    { id: i, type: "llm", position: { x: Q(2), y: Z(0) - Ne / 2 }, data: u },
    { id: s, type: "approval", position: { x: Q(2), y: Z(0) + Ne / 2 }, data: f },
    { id: d, type: "join", position: { x: Q(3), y: Z(0) }, data: h },
    { id: c, type: "action", position: { x: Q(4), y: Z(0) }, data: x }
  ], m = [
    ne(r, "out", a),
    ne(a, "branch-0", i),
    ne(i, "out", d, "in-0"),
    ne(a, "branch-1", s),
    ne(s, "approved", d, "in-1"),
    ne(d, "out", c)
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
function _p(t) {
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
    { id: r, type: "trigger", position: { x: Q(0), y: Z(0) }, data: l },
    { id: a, type: "llm", position: { x: Q(1), y: Z(0) }, data: p },
    { id: i, type: "condition", position: { x: Q(2), y: Z(0) }, data: u },
    { id: s, type: "action", position: { x: Q(3), y: Z(0) - Ne / 2 }, data: f },
    { id: d, type: "approval", position: { x: Q(4), y: Z(0) - Ne / 2 }, data: h },
    { id: c, type: "action", position: { x: Q(3), y: Z(0) + Ne / 2 }, data: x }
  ], m = [
    ne(r, "out", a),
    ne(a, "out", i),
    ne(i, "true", s),
    ne(s, "out", d),
    ne(i, "false", c)
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
function Lp(t) {
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
  }, v = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are a test-coverage reviewer. Identify untested branches, missing edge-case tests, and risky changes lacking tests. Output JSON {"gaps": [{"file": string, "concern": string}]}.',
    userPromptTemplate: `{{context.payload.pull_request.diff}}

Summary: {{context.steps.${a}.response}}`,
    temperature: 0.1,
    maxTokens: 1024,
    streaming: !1
  }, N = {
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
    { id: r, type: "trigger", position: { x: Q(0), y: Z(0) }, data: f },
    { id: a, type: "llm", position: { x: Q(1), y: Z(0) }, data: h },
    { id: i, type: "fork", position: { x: Q(2), y: Z(0) }, data: x },
    { id: s, type: "llm", position: { x: Q(3), y: Z(0) - Ne }, data: g },
    { id: d, type: "llm", position: { x: Q(3), y: Z(0) }, data: m },
    { id: c, type: "llm", position: { x: Q(3), y: Z(0) + Ne }, data: v },
    { id: l, type: "join", position: { x: Q(4), y: Z(0) }, data: N },
    { id: p, type: "llm", position: { x: Q(5), y: Z(0) }, data: y },
    { id: u, type: "action", position: { x: Q(6), y: Z(0) }, data: w }
  ], k = [
    ne(r, "out", a),
    ne(a, "out", i),
    ne(i, "branch-0", s),
    ne(i, "branch-1", d),
    ne(i, "branch-2", c),
    ne(s, "out", l, "in-0"),
    ne(d, "out", l, "in-1"),
    ne(c, "out", l, "in-2"),
    ne(l, "out", p),
    ne(p, "out", u)
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
function Bp(t) {
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
    { id: r, type: "trigger", position: { x: Q(0), y: Z(0) }, data: c },
    { id: a, type: "llm", position: { x: Q(1), y: Z(0) }, data: l },
    { id: i, type: "condition", position: { x: Q(2), y: Z(0) }, data: p },
    { id: s, type: "action", position: { x: Q(3), y: Z(0) - Ne / 2 }, data: u },
    { id: d, type: "approval", position: { x: Q(3), y: Z(0) + Ne / 2 }, data: f }
  ], x = [
    ne(r, "out", a),
    ne(a, "out", i),
    ne(i, "true", s),
    ne(i, "false", d)
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
function Up(t) {
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
  }, y = [
    { id: r, type: "trigger", position: { x: Q(0), y: Z(0) }, data: u },
    { id: a, type: "llm", position: { x: Q(1), y: Z(0) }, data: f },
    { id: i, type: "transform", position: { x: Q(2), y: Z(0) }, data: h },
    { id: s, type: "condition", position: { x: Q(3), y: Z(0) }, data: x },
    { id: d, type: "action", position: { x: Q(4), y: Z(0) - Ne / 2 }, data: g },
    { id: c, type: "llm", position: { x: Q(4), y: Z(0) + Ne / 2 }, data: m },
    { id: l, type: "approval", position: { x: Q(5), y: Z(0) + Ne / 2 }, data: v },
    { id: p, type: "action", position: { x: Q(6), y: Z(0) + Ne / 2 }, data: N }
  ], w = [
    ne(r, "out", a),
    ne(a, "out", i),
    ne(i, "out", s),
    ne(s, "true", d),
    ne(s, "false", c),
    ne(c, "out", l),
    ne(l, "approved", p)
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
const $n = [
  {
    id: "document-summary",
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    tags: ["llm", "summary", "document"],
    build: $p
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: Tp
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: Ap,
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
    build: Rp,
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
    build: Pp,
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
    build: Mp
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: Ep
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: Dp
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: Op
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: _p
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: Lp
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: Bp
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: Up
  }
], Ao = "/api";
async function Fp(t) {
  const n = { createdTypes: [], errors: [] };
  if (!t?.documentTypes?.length) return n;
  for (const r of t.documentTypes)
    try {
      const a = await jp(r.name);
      if (a) {
        n.createdTypes.push(a.typeId);
        continue;
      }
      const i = await zp(r);
      n.createdTypes.push(i.typeId);
    } catch (a) {
      n.errors.push(
        `Failed to scaffold "${r.name}": ${a instanceof Error ? a.message : String(a)}`
      );
    }
  return n;
}
async function jp(t) {
  try {
    const n = await fetch(`${Ao}/document-types`, { credentials: "same-origin" });
    if (!n.ok) return null;
    const a = (await n.json()).items?.find(
      (i) => i.name.toLowerCase() === t.toLowerCase()
    );
    return a ? { typeId: a.typeId } : null;
  } catch {
    return null;
  }
}
async function zp(t) {
  const n = t.fields.map((i, s) => ({
    fieldId: crypto.randomUUID(),
    name: i.name,
    fieldType: i.fieldType,
    widget: qp(i.fieldType),
    cardinality: 1,
    required: i.required ?? !1,
    helpText: "",
    options: i.options,
    order: s
  })), r = await fetch(`${Ao}/document-types`, {
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
function qp(t) {
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
function Vp(t) {
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
function Wp(t) {
  const n = t.triggerBinding?.event ?? "manual";
  return n === "schedule" ? "Schedule" : n === "webhook" ? "Webhook" : n === "manual" ? "Manual" : n.startsWith("document.") ? `On ${n}` : n;
}
function Jp({ template: t, meta: n, onPick: r }) {
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
function Hp({
  open: t,
  onClose: n,
  onCreated: r,
  onSelect: a
}) {
  const { userId: i } = Vn(), [s, d] = S(""), c = se(null);
  te(() => {
    t && (d(""), setTimeout(() => c.current?.focus(), 30));
  }, [t]);
  const l = z(() => {
    const h = /* @__PURE__ */ new Map();
    for (const x of $n) {
      const g = x.build(i || "anonymous");
      h.set(x.id, { nodeCount: g.nodes.length, trigger: Wp(g) });
    }
    return h;
  }, [i, t]), p = z(() => {
    const h = s.trim().toLowerCase();
    return h ? $n.filter(
      (x) => x.name.toLowerCase().includes(h) || x.description.toLowerCase().includes(h) || x.tags.some((g) => g.toLowerCase().includes(h))
    ) : $n;
  }, [s]), u = (h) => {
    if (r) {
      const x = h.build(i || "anonymous"), g = Vp(x);
      Qo(g), n(), r(g.id), h.prerequisites && Fp(h.prerequisites).then((m) => {
        m.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", m.errors);
      });
      return;
    }
    a && a(h);
  };
  return /* @__PURE__ */ o(
    We,
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
              Jp,
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
const Kn = ["draft", "published", "archived"], Fr = ["draft", "published"];
function Kp(t) {
  if (t == null) return null;
  if (t.trim() === "") return /* @__PURE__ */ new Set();
  const n = new Set(Kn);
  return new Set(
    t.split(",").map((a) => a.trim()).filter((a) => n.has(a))
  );
}
function Gp(t, n) {
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
function Yp(t) {
  const n = t?.event;
  return !n || n === "manual" ? "manual" : n === "schedule" ? "schedule" : n === "webhook" ? "webhook" : "document";
}
function jr(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Xp() {
  const t = /* @__PURE__ */ new Date(), n = t.getFullYear(), r = String(t.getMonth() + 1).padStart(2, "0"), a = String(t.getDate()).padStart(2, "0");
  return `${n}-${r}-${a}`;
}
function Qp({
  open: t,
  onClose: n,
  onCreate: r
}) {
  const [a, i] = S(""), s = se(null);
  te(() => {
    t && (i(""), setTimeout(() => s.current?.focus(), 50));
  }, [t]);
  const d = a.trim().length > 0, c = () => {
    d && r(a.trim());
  };
  return /* @__PURE__ */ o(
    We,
    {
      open: t,
      onClose: n,
      title: "Create new pipeline",
      maxWidth: 440,
      footer: /* @__PURE__ */ o(Y, { children: [
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
function yh() {
  const t = _e(), { userId: n } = Vn(), { toast: r } = on(), { triggerRun: a, isTriggering: i } = Zo(), [s, d] = rn(), [c, l] = S([]), [p, u] = S(""), [f, h] = S("all"), [x, g] = S("updated"), m = z(
    () => Kp(s.get("status")),
    [s]
  ), v = z(() => m ?? new Set(Fr), [m]), N = m != null, y = (M) => {
    const _ = new URLSearchParams(s);
    if (M.size === 0)
      _.set("status", "");
    else {
      const ce = Kn.filter((ue) => M.has(ue)).join(",");
      _.set("status", ce);
    }
    d(_, { replace: !0 });
  }, w = (M) => {
    const _ = N ? new Set(v) : new Set(Fr);
    _.has(M) ? _.delete(M) : _.add(M), y(_);
  }, [b, k] = S(!1), [C, T] = S(!1), [$, A] = S(null), [E, P] = S(!1), [B, V] = S(!1), [ae, K] = S(!1), ee = D(async () => {
    const M = await ea(), _ = [];
    for (const ce of M) {
      const ue = await rt(ce.id);
      ue && _.push(Gp(ue, ce.icon));
    }
    l(_);
  }, []);
  te(() => {
    ee();
  }, [ee]);
  const O = z(() => {
    const M = p.trim().toLowerCase(), ce = [...c.filter((ue) => {
      if (M) {
        const ge = ue.name.toLowerCase().includes(M), Oe = ue.tags.some((Yn) => Yn.toLowerCase().includes(M));
        if (!ge && !Oe) return !1;
      }
      return !(!(N && v.size === 0) && !v.has(ue.status) || f !== "all" && Yp(ue.triggerBinding) !== f);
    })];
    return x === "name" ? ce.sort((ue, ge) => ue.name.localeCompare(ge.name)) : x === "created" ? ce.sort((ue, ge) => ge.createdAt.localeCompare(ue.createdAt)) : ce.sort((ue, ge) => ge.updatedAt.localeCompare(ue.updatedAt)), ce;
  }, [c, p, v, N, f, x]), R = z(() => O.map((M) => M.id), [O]), {
    selectionMode: J,
    selected: H,
    allVisibleSelected: L,
    selectAllRef: q,
    handleToggleSelect: W,
    handleSelectAllFiltered: G,
    handleHeaderToggleAll: de,
    clearSelection: j,
    setSelectionMode: le
  } = kp({ visibleRows: O, filteredIds: R }), ve = z(() => {
    const M = /* @__PURE__ */ new Set();
    for (const _ of c)
      if (H.has(_.id))
        for (const ce of _.tags) M.add(ce);
    return Array.from(M).sort((_, ce) => _.localeCompare(ce));
  }, [c, H]), De = async (M) => {
    const _ = await ta({ name: M, createdBy: n });
    k(!1), t(`/pipelines/${_.id}`);
  }, Ke = () => {
    const M = na(n);
    ot(M).then(() => ee()), t(`/pipelines/${M.id}`);
  }, Be = (M) => {
    const _ = M.build(n);
    ot(_), T(!1), t(`/pipelines/${_.id}`);
  }, Pe = (M) => t(`/pipelines/${M}`), je = async (M) => {
    if (M.status !== "published") {
      r("Run requires published state", { type: "warning" });
      return;
    }
    if (!i)
      try {
        await a(M.id, {}) ? r(`Run started for "${M.name}"`, { type: "success" }) : r("Could not start run", { type: "error" });
      } catch (_) {
        r(`Run failed: ${_.message}`, { type: "error" });
      } finally {
        t(`/pipelines/${M.id}`);
      }
  }, Ue = (M) => {
    const _ = Fn(M);
    _ && (ot(_).then(() => ee()), r(`Duplicated as "${_.name}"`, { type: "success" }));
  }, ze = (M) => {
    const _ = Rn(M.id);
    if (!_) {
      r("Export failed", { type: "error" });
      return;
    }
    Pt(`${jr(M.name)}.pipeline.json`, _);
  }, ke = async () => {
    $ && (await Qn($), A(null), ee(), r("Pipeline deleted", { type: "success" }));
  }, he = $ ? c.find((M) => M.id === $) : null, re = () => {
    const M = Array.from(H);
    M.length !== 0 && (M.forEach((_, ce) => {
      window.setTimeout(() => {
        const ue = c.find((Oe) => Oe.id === _), ge = Rn(_);
        !ue || !ge || Pt(`${jr(ue.name)}-${Xp()}.pipeline.json`, ge);
      }, ce * 100);
    }), r(`Exported ${M.length} pipeline${M.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, X = async (M) => {
    const _ = Array.from(H);
    for (const ce of _) {
      const ue = await rt(ce);
      if (!ue) continue;
      const ge = ue.tags ?? [];
      ge.includes(M) || (ue.tags = [...ge, M], await ot(ue));
    }
    V(!1), ee(), r(`Added tag "${M}" to ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, oe = async (M) => {
    const _ = Array.from(H);
    for (const ce of _) {
      const ue = await rt(ce);
      if (!ue) continue;
      const ge = ue.tags ?? [];
      ge.includes(M) && (ue.tags = ge.filter((Oe) => Oe !== M), await ot(ue));
    }
    ee(), r(`Removed tag "${M}" from ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, pe = async () => {
    const M = Array.from(H);
    for (const _ of M) await Qn(_);
    P(!1), j(), ee(), r(`Deleted ${M.length} pipeline${M.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, xe = async () => {
    const M = Array.from(H);
    if (M.length === 0) return;
    let _ = 0, ce = 0;
    for (const ue of M) {
      const ge = await rt(ue);
      if (!ge) continue;
      if (ge.status === "published") {
        ce += 1;
        continue;
      }
      await ra(ue) && (_ += 1);
    }
    ee(), ce > 0 ? r(
      `Published ${_}; skipped ${ce} already published`,
      { type: "success" }
    ) : r(
      `Published ${_} pipeline${_ === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, Ae = async () => {
    const M = Array.from(H);
    if (M.length === 0) return;
    let _ = 0, ce = 0;
    for (const ge of M) {
      const Oe = await rt(ge);
      if (!Oe) continue;
      Oe.status === "archived" ? (Oe.status = "draft", ce += 1) : (Oe.status = "archived", _ += 1), await ot(Oe);
    }
    ee();
    const ue = [];
    _ > 0 && ue.push(`Archived ${_}`), ce > 0 && ue.push(`Unarchived ${ce}`), r(ue.join(" · ") || "No pipelines changed", { type: "success" });
  }, Ie = async () => {
    const M = Array.from(H);
    if (M.length === 0) return;
    const _ = [];
    for (const ue of M) {
      const ge = await rt(ue);
      ge && _.push(ge);
    }
    if (_.length === 0) {
      r("Export failed", { type: "error" });
      return;
    }
    const ce = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    Pt(`pipelines-${ce}.json`, JSON.stringify(_, null, 2)), r(`Exported ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  };
  te(() => {
    const M = (_) => {
      const ce = _.target;
      if (ce) {
        const ge = ce.tagName;
        if (ge === "INPUT" || ge === "TEXTAREA" || ge === "SELECT" || ce.isContentEditable)
          return;
      }
      if (_.key === "Escape") {
        (H.size > 0 || J || B || ae) && (V(!1), K(!1), j(), le(!1));
        return;
      }
      if ((_.metaKey || _.ctrlKey) && (_.key === "a" || _.key === "A")) {
        J && (_.preventDefault(), G());
        return;
      }
      (_.key === "Delete" || _.key === "Backspace") && H.size > 0 && !E && !$ && !b && !C && (_.preventDefault(), P(!0));
    };
    return window.addEventListener("keydown", M), () => window.removeEventListener("keydown", M);
  }, [
    H,
    J,
    B,
    ae,
    E,
    $,
    b,
    C,
    j,
    G,
    le
  ]);
  const Je = c.length > 0, Ft = H.size > 0;
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
        Je && /* @__PURE__ */ e(
          Np,
          {
            search: p,
            onSearchChange: u,
            statusFilter: v,
            statusExplicit: N,
            onToggleStatusKey: w,
            triggerFilter: f,
            onTriggerFilterChange: h,
            sortKey: x,
            onSortKeyChange: g,
            allVisibleSelected: L,
            selectAllRef: q,
            onHeaderToggleAll: de
          }
        ),
        Ft && /* @__PURE__ */ e(
          wp,
          {
            count: H.size,
            onClear: j,
            onExport: re,
            onExportAsJSON: Ie,
            onPublish: xe,
            onArchive: Ae,
            onAddTag: () => {
              V((M) => !M), K(!1);
            },
            onRemoveTag: () => {
              K((M) => !M), V(!1);
            },
            onDelete: () => P(!0),
            onDeleteWithConfirm: () => P(!0),
            addTagOpen: B,
            removeTagOpen: ae,
            onSubmitAddTag: X,
            onSubmitRemoveTag: oe,
            onCloseAddTag: () => V(!1),
            onCloseRemoveTag: () => K(!1),
            unionTags: ve
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: I(
              "flex-1 overflow-y-auto overflow-x-hidden min-w-0",
              Je ? "p-6" : "p-0"
            ),
            children: Je ? O.length === 0 ? /* @__PURE__ */ e(
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
                  bp,
                  {
                    row: M,
                    onOpen: () => Pe(M.id),
                    onRun: () => {
                      je(M);
                    },
                    onDuplicate: () => Ue(M.id),
                    onExport: () => ze(M),
                    onDelete: () => A(M.id),
                    selectionMode: J,
                    selected: H.has(M.id),
                    anySelected: Ft,
                    onToggleSelect: (_) => W(M.id, _)
                  },
                  M.id
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
                    onClick: Ke,
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
          Qp,
          {
            open: b,
            onClose: () => k(!1),
            onCreate: De
          }
        ),
        /* @__PURE__ */ e(
          Hp,
          {
            open: C,
            onClose: () => T(!1),
            onSelect: Be
          }
        ),
        /* @__PURE__ */ e(
          We,
          {
            open: !!$,
            onClose: () => A(null),
            title: "Delete pipeline?",
            maxWidth: 400,
            footer: /* @__PURE__ */ o(Y, { children: [
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
                  onClick: ke,
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
          We,
          {
            open: E,
            onClose: () => P(!1),
            title: `Delete ${H.size} pipeline${H.size === 1 ? "" : "s"}?`,
            maxWidth: 420,
            backdropTestId: "bulk-delete-modal",
            footer: /* @__PURE__ */ o(Y, { children: [
              /* @__PURE__ */ e(
                "button",
                {
                  "data-testid": "bulk-delete-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => P(!1),
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
                    H.size
                  ]
                }
              )
            ] }),
            children: /* @__PURE__ */ o("p", { className: "m-0", children: [
              /* @__PURE__ */ o("strong", { children: [
                H.size,
                " pipeline",
                H.size === 1 ? "" : "s"
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
const Zp = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function Ro(t, n, r) {
  const a = Zp[t], i = Math.max(0, n | 0), s = Math.max(0, r | 0);
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
function gt(t) {
  const n = {};
  let r = 0, a = 0, i = 0, s = 0, d = !1;
  for (const l of t) {
    if (!l.model) continue;
    const p = l.tokensIn ?? 0, u = l.tokensOut ?? 0, f = Ro(l.model, p, u), h = n[l.model];
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
function Ut(t) {
  return !t || !t.modelFound && t.totalCostUsd === 0 ? "—" : t.totalCostUsd >= 0.01 ? `$${t.totalCostUsd.toFixed(2)}` : t.totalCostUsd === 0 ? "$0.00" : `$${t.totalCostUsd.toFixed(4)}`;
}
function eu(t) {
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
function Po(t, n) {
  let r = 0;
  if (t.llm) {
    const i = n.get(t.nodeId);
    i && (r += Ro(i, t.llm.tokensIn, t.llm.tokensOut).totalCostUsd);
  }
  const a = t.costUsd;
  return typeof a == "number" && Number.isFinite(a) && a > 0 && (r += a), r;
}
function tu(t, n) {
  if (!n) return [];
  const r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    l.data.type === "llm" && r.set(l.id, l.data.model), a.set(l.id, eu(l)), i.set(l.id, l.data.type);
  const s = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    s.set(l.id, 0), d.set(l.id, 0);
  for (const l of t)
    for (const p of Object.values(l.steps ?? {})) {
      if (!a.has(p.nodeId)) continue;
      const u = Po(p, r);
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
function nu(t) {
  return t.slice(0, 10);
}
function ru(t) {
  return Date.UTC(
    Number(t.slice(0, 4)),
    Number(t.slice(5, 7)) - 1,
    Number(t.slice(8, 10))
  );
}
function ou(t, n, r = 30, a = /* @__PURE__ */ new Date()) {
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
    const f = nu(u.startedAt);
    if (!c.has(f)) continue;
    let h = 0;
    for (const x of Object.values(u.steps ?? {}))
      h += Po(x, i);
    c.set(f, (c.get(f) ?? 0) + h), l.set(f, (l.get(f) ?? 0) + 1);
  }
  const p = [];
  for (let u = d; u <= s; u += 864e5) {
    const f = new Date(u).toISOString().slice(0, 10);
    p.push({
      date: f,
      ts: ru(f),
      totalCostUsd: c.get(f) ?? 0,
      runCount: l.get(f) ?? 0
    });
  }
  return p;
}
const Mo = [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
], Eo = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], Do = ["24h", "7d", "30d", "all"], au = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function iu(t) {
  return t.startsWith("document.") || t === "document" ? "document" : t === "schedule" || t === "scheduled" ? "scheduled" : t === "webhook" ? "webhook" : "manual";
}
function su(t) {
  let n = 0;
  for (const r of Object.values(t.steps ?? {})) {
    const a = r.attempts?.length ?? 0;
    a > 1 && (n += a - 1);
  }
  return n;
}
function Oo(t, n) {
  const r = n.now ?? Date.now(), a = n.range === "all" ? null : r - au[n.range], i = n.query.trim().toLowerCase();
  return t.filter((s) => {
    if (n.statuses.size > 0 && !n.statuses.has(s.status)) return !1;
    if (n.triggerKinds.size > 0) {
      const d = iu(s.triggeredBy.triggerType);
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
function zr(t, n) {
  if (!t) return /* @__PURE__ */ new Set();
  const r = new Set(n);
  return new Set(
    t.split(",").map((a) => a.trim()).filter((a) => r.has(a))
  );
}
function _o(t) {
  const n = t.get("range") ?? "7d", r = Do.includes(n) ? n : "7d";
  return {
    query: t.get("q") ?? "",
    statuses: zr(t.get("status"), Mo),
    triggerKinds: zr(t.get("trigger"), Eo),
    range: r
  };
}
const lu = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, cu = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, du = {
  "24h": "Last 24h",
  "7d": "Last 7d",
  "30d": "Last 30d",
  all: "All time"
};
function qr({
  label: t,
  options: n,
  selected: r,
  onToggle: a,
  labels: i,
  testIdPrefix: s
}) {
  const [d, c] = S(!1), l = se(null);
  mt(l, () => c(!1), d);
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
function Lo({
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
        /* @__PURE__ */ e("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: Do.map((u) => /* @__PURE__ */ e(
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
            children: du[u]
          },
          u
        )) }),
        /* @__PURE__ */ e("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ e(
          qr,
          {
            label: "Status",
            options: Mo,
            selected: n,
            onToggle: s,
            labels: lu,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ e(
          qr,
          {
            label: "Trigger",
            options: Eo,
            selected: r,
            onToggle: d,
            labels: cu,
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
function pu({
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
function Gn(t) {
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
function uu(t) {
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
const mu = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function hu(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function fu({
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
  const p = se(!1), u = se(null), f = t.length > 0 && t.every((m) => n.has(m.id)), h = !f && t.some((m) => n.has(m.id)), x = () => {
    const m = new Set(n);
    if (f)
      for (const v of t) m.delete(v.id);
    else
      for (const v of t) m.add(v.id);
    r(m);
  }, g = (m, v, N) => {
    const y = new Set(n), w = !y.has(m);
    if (N && u.current != null) {
      const b = Math.min(u.current, v), k = Math.max(u.current, v);
      for (let C = b; C <= k; C++) {
        const T = t[C];
        T && (w ? y.add(T.id) : y.delete(T.id));
      }
    } else w ? y.add(m) : y.delete(m);
    u.current = v, r(y);
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
          ["Started", "Status", "Duration", "Retries", "Cost", "Triggered by", "Run ID", ""].map((m, v) => /* @__PURE__ */ e(
            "th",
            {
              scope: "col",
              className: "px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
              children: m
            },
            `${m}-${v}`
          ))
        ] }) }),
        /* @__PURE__ */ e("tbody", { children: t.map((m, v) => {
          const { tone: N, label: y } = Gn(m.status), w = n.has(m.id), b = su(m);
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
                        p.current = !1, g(m.id, v, k);
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
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: hu(m.startedAt) }),
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: [
                  /* @__PURE__ */ e(ie, { tone: N, "aria-label": `Status: ${y}`, children: y }),
                  m.status === "running" && m.stuckAt && /* @__PURE__ */ e(
                    ie,
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
                    ie,
                    {
                      tone: uu(m.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${m.id}`,
                      title: m.error.message,
                      className: "ml-1.5",
                      children: mu[m.error.errorCategory] ?? m.error.errorCategory
                    }
                  )
                ] }),
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: Ce(m.durationMs) }),
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
                            await oa(m.pipelineId, m.id);
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
function vh() {
  const { pipelineId: t } = ht(), n = _e(), [r, a] = rn(), [i, s] = S([]), [d, c] = S(null), [l, p] = S([]), [u, f] = S(() => /* @__PURE__ */ new Set()), [h, x] = S(null), [g, m] = S(!1), [v, N] = S(null), [y, w] = S(!1), b = D((L) => {
    const q = L.error?.nodeId;
    if (!q || q === "unknown") return;
    const W = Object.entries(L.steps).filter(([G, de]) => G !== q && de.status === "completed").map(([G]) => G);
    x({ run: L, nodeId: q, skippedNodes: W, snapshotInput: !1 }), N(null);
  }, []), k = D(async () => {
    if (h) {
      N(null), m(!0);
      try {
        const L = await ho(
          h.run.pipelineId,
          h.run.id,
          h.nodeId,
          void 0,
          h.snapshotInput || void 0
        );
        x(null), n(`/pipelines/${h.run.pipelineId}/runs/${L.newRunId}`);
      } catch (L) {
        N(L instanceof Error ? L.message : String(L)), m(!1);
      }
    }
  }, [h, n]), { query: C, statuses: T, triggerKinds: $, range: A } = z(
    () => _o(r),
    [r]
  ), E = (L, q) => {
    const W = new URLSearchParams(r);
    q ? W.set(L, q) : W.delete(L), a(W, { replace: !0 });
  }, P = (L) => {
    const q = new Set(T);
    q.has(L) ? q.delete(L) : q.add(L), E("status", q.size === 0 ? null : Array.from(q).join(","));
  }, B = (L) => {
    const q = new Set($);
    q.has(L) ? q.delete(L) : q.add(L), E("trigger", q.size === 0 ? null : Array.from(q).join(","));
  }, V = (L) => {
    E("range", L === "7d" ? null : L);
  }, ae = (L) => {
    E("q", L.length === 0 ? null : L);
  }, K = (L) => {
    p((q) => q.includes(L) ? q.filter((W) => W !== L) : q.length >= 2 ? [q[1], L] : [...q, L]);
  };
  te(() => {
    t && (c(nt(t)), s(Zt(t)));
  }, [t]);
  const ee = z(
    () => Oo(i, { query: C, statuses: T, triggerKinds: $, range: A }),
    [i, C, T, $, A]
  ), O = z(() => {
    const L = /* @__PURE__ */ new Map();
    if (!d) return L;
    for (const q of d.nodes)
      q.data.type === "llm" && L.set(q.id, q.data.model);
    return L;
  }, [d]), R = z(() => {
    const L = {};
    for (const q of ee) {
      const W = Object.values(q.steps).filter((G) => !!G.llm).map((G) => ({
        model: O.get(G.nodeId),
        tokensIn: G.llm?.tokensIn ?? 0,
        tokensOut: G.llm?.tokensOut ?? 0
      }));
      L[q.id] = Ut(gt(W).total);
    }
    return L;
  }, [ee, O]), J = () => {
    if (!t) return;
    w(!1);
    const L = Array.from(u), q = i.filter((W) => !u.has(W.id));
    mo(t);
    for (const W of [...q].sort((G, de) => G.startedAt.localeCompare(de.startedAt)))
      aa(t, W);
    s(Zt(t)), f(/* @__PURE__ */ new Set()), p((W) => W.filter((G) => !L.includes(G)));
  }, H = () => {
    const L = i.filter((j) => u.has(j.id));
    if (L.length === 0) return;
    const q = new Blob([JSON.stringify(L, null, 2)], { type: "application/json" }), W = URL.createObjectURL(q), G = document.createElement("a"), de = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    G.href = W, G.download = `pipeline-runs-${de}.json`, document.body.appendChild(G), G.click(), document.body.removeChild(G), URL.revokeObjectURL(W);
  };
  return t ? d ? /* @__PURE__ */ o("div", { "data-testid": "pipeline-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e(
      tn,
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
            /* @__PURE__ */ e("input", { type: "checkbox", checked: h.snapshotInput, onChange: (L) => x((q) => q && { ...q, snapshotInput: L.target.checked }), className: "accent-primary" }),
            "Use persisted input snapshot"
          ] }),
          v && /* @__PURE__ */ e("div", { "data-testid": "retry-modal-error", className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: v })
        ] })
      }
    ),
    /* @__PURE__ */ e(
      tn,
      {
        open: y,
        onConfirm: J,
        onCancel: () => w(!1),
        title: `Delete ${u.size} run${u.size === 1 ? "" : "s"}?`,
        body: "This cannot be undone.",
        confirmLabel: `Delete ${u.size}`,
        tone: "destructive"
      }
    ),
    v && /* @__PURE__ */ e(Xe, { title: "Retry failed:", onDismiss: () => N(null), children: v }),
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
            const [L, q] = l;
            n(`/pipelines/${t}/runs/compare/${L}/${q}`);
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
      Lo,
      {
        query: C,
        statuses: T,
        triggerKinds: $,
        range: A,
        onQueryChange: ae,
        onStatusToggle: P,
        onTriggerToggle: B,
        onRangeChange: V,
        onClearFilters: () => {
          ae(""), E("status", null), E("trigger", null);
        }
      }
    ),
    u.size > 0 && /* @__PURE__ */ e(
      pu,
      {
        selectionCount: u.size,
        onExport: H,
        onDelete: () => {
          u.size > 0 && t && w(!0);
        },
        onClear: () => f(/* @__PURE__ */ new Set())
      }
    ),
    ee.length === 0 ? /* @__PURE__ */ e(
      Fe,
      {
        icon: "📜",
        title: i.length === 0 ? "No runs yet" : "No runs match these filters",
        body: i.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
      }
    ) : /* @__PURE__ */ e(
      fu,
      {
        filtered: ee,
        selected: u,
        onSelectionChange: f,
        comparePair: l,
        onToggleComparePair: K,
        costByRunId: R,
        pipelineId: t,
        onNavigate: n,
        onOpenRetryModal: b
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
  ) }) : /* @__PURE__ */ e(ft, { to: "/pipelines", replace: !0 });
}
function xu(t) {
  return z(() => {
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
    return gt(a).total;
  }, [t]);
}
function Ye({ title: t, children: n }) {
  return /* @__PURE__ */ o("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ e("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: t }),
    n
  ] });
}
const Vr = "m-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", Wr = "px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", Tn = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", Re = "px-2 py-[5px] text-[11px] text-text-secondary align-top", gu = {
  "#2563eb": "bg-blue-600/10 text-blue-600",
  "#7c3aed": "bg-violet-600/10 text-violet-600",
  "#16a34a": "bg-green-600/10 text-green-600",
  "#dc2626": "bg-red-600/10 text-red-600"
};
function St(t) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${gu[t] ?? ""}`.trimEnd();
}
const bu = {
  completed: "#16a34a",
  failed: "#dc2626",
  running: "#2563eb"
};
function yu({ stepId: t, step: n, index: r, nodeType: a, nodeConfig: i, onRetryFromStep: s, onResumeFromStep: d }) {
  const [c, l] = S(!1), p = n.output, u = p?.response, f = n.llm, h = n.input, x = bu[n.status] ?? "#94a3b8";
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
          /* @__PURE__ */ e(Ye, { title: "Execution Timeline", children: /* @__PURE__ */ o("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ e("th", { scope: "col", className: Tn, children: "Event" }),
              /* @__PURE__ */ e("th", { scope: "col", className: Tn, children: "Time" }),
              /* @__PURE__ */ e("th", { scope: "col", className: Tn, children: "Detail" })
            ] }) }),
            /* @__PURE__ */ o("tbody", { children: [
              n.startedAt && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Re, children: /* @__PURE__ */ e("span", { className: St("#2563eb"), children: "started" }) }),
                /* @__PURE__ */ e("td", { className: Re, children: new Date(n.startedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Re, children: [
                  "Node ",
                  t.slice(0, 8),
                  " (",
                  a,
                  ") began execution"
                ] })
              ] }),
              f?.streamOpened && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Re, children: /* @__PURE__ */ e("span", { className: St("#7c3aed"), children: "stream.opened" }) }),
                /* @__PURE__ */ e("td", { className: Re, children: "—" }),
                /* @__PURE__ */ e("td", { className: Re, children: "LLM stream connection established" })
              ] }),
              f?.firstTokenLatencyMs != null && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Re, children: /* @__PURE__ */ e("span", { className: St("#7c3aed"), children: "first.token" }) }),
                /* @__PURE__ */ o("td", { className: Re, children: [
                  "+",
                  f.firstTokenLatencyMs,
                  "ms"
                ] }),
                /* @__PURE__ */ e("td", { className: Re, children: "First token received from LLM" })
              ] }),
              n.completedAt && n.status === "completed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Re, children: /* @__PURE__ */ e("span", { className: St("#16a34a"), children: "completed" }) }),
                /* @__PURE__ */ e("td", { className: Re, children: new Date(n.completedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Re, children: [
                  "Finished in ",
                  n.durationMs != null ? n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` : "—"
                ] })
              ] }),
              n.status === "failed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Re, children: /* @__PURE__ */ e("span", { className: St("#dc2626"), children: "failed" }) }),
                /* @__PURE__ */ e("td", { className: Re, children: n.completedAt ? new Date(n.completedAt).toLocaleTimeString() : "—" }),
                /* @__PURE__ */ e("td", { className: Re, children: n.error ?? "Unknown error" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ e(Ye, { title: "Node Configuration", children: i && Object.keys(i).length > 1 ? /* @__PURE__ */ e("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(i).filter(([g]) => g !== "type").map(([g, m]) => /* @__PURE__ */ o(so.Fragment, { children: [
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
          h && Object.keys(h).length > 0 && /* @__PURE__ */ e(Ye, { title: "Runtime Input", children: /* @__PURE__ */ e("pre", { className: Vr, children: JSON.stringify(h, null, 2) }) }),
          f?.prompt && /* @__PURE__ */ e(Ye, { title: "Resolved Prompt", children: /* @__PURE__ */ e("div", { className: Wr, children: f.prompt }) }),
          u || f?.response ? /* @__PURE__ */ e(Ye, { title: "Response", children: /* @__PURE__ */ e("div", { className: Wr, children: u ?? f?.response }) }) : /* @__PURE__ */ e(Ye, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ e("pre", { className: Vr, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
          (f || p?.tokensIn != null) && /* @__PURE__ */ e(Ye, { title: "Token Usage", children: /* @__PURE__ */ o("div", { className: "flex gap-5 flex-wrap text-xs text-text-secondary", children: [
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
          n.error && /* @__PURE__ */ e(Ye, { title: "Error", children: /* @__PURE__ */ e("div", { className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap", children: n.error }) }),
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
function vu({ steps: t, nodeDataMap: n, edges: r, onRetryFromStep: a, onResumeFromStep: i }) {
  const s = z(() => {
    const l = Object.entries(t).sort(([, b], [, k]) => {
      const C = b.completedAt ? Date.parse(b.completedAt) - (b.durationMs ?? 0) : 0, T = k.completedAt ? Date.parse(k.completedAt) - (k.durationMs ?? 0) : 0;
      return C - T;
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
    function v(b) {
      const k = [];
      let C = b;
      for (; C; ) {
        const T = l.find(([V]) => p(V) === C && !m.has(V));
        if (!T) break;
        const [$, A] = T;
        m.add($);
        const E = { stepId: $, step: A, children: [] }, P = p($);
        if (f.has(P)) {
          const V = x.filter((ae) => ae.forkId === P);
          for (const { branch: ae, targetNodeId: K } of V) {
            const ee = v(K);
            for (const O of ee)
              O.branch = O.branch ?? ae;
            ee.length > 0 && (ee[0].branch = ae, E.children.push(...ee));
          }
        }
        k.push(E);
        const B = g.get(P)?.filter((V) => V.handle === "out");
        C = B && B.length === 1 ? B[0].target : null;
      }
      return k;
    }
    const N = /* @__PURE__ */ new Set();
    for (const b of r)
      N.add(b.target);
    const y = l.find(([b]) => !N.has(p(b)))?.[1] ? l.find(([b]) => !N.has(p(b)))[0] : l[0]?.[0];
    let w = [];
    y && (w = v(p(y)));
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
      return /* @__PURE__ */ o(so.Fragment, { children: [
        /* @__PURE__ */ e(
          yu,
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
        f.children.length > 0 && /* @__PURE__ */ e("div", { className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1", children: Array.from(x.entries()).map(([g, m], v) => /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("div", { className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${v === 0 ? "mt-1" : "mt-2"}`, children: g.replace("-", " ") }),
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
const Nu = 5e3, wu = "synthetic-";
function ku(t) {
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
function Un(t, n) {
  return n.timestamp.localeCompare(t.timestamp);
}
function Cu(t, n) {
  if (n.length === 0) return t.slice().sort(Un);
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
  return [...t, ...i].sort(Un);
}
function Iu(t, n, r = {}) {
  const { pollMs: a = Nu, filters: i } = r, s = ka(), [d, c] = S([]), [l, p] = S([]), [u, f] = S(!0), [h, x] = S(null), [g, m] = S(void 0), [v, N] = S(0), [y, w] = S(!1), b = JSON.stringify({
    since: i?.since,
    until: i?.until,
    actions: i?.actions,
    limit: i?.limit
  });
  te(() => {
    if (!t || !n) return;
    let A = !1;
    return f(!0), x(null), (async () => {
      try {
        const E = await Zn(t, n, i ?? {});
        if (A) return;
        c(E.items), m(E.nextCursor), f(!1);
      } catch (E) {
        if (A) return;
        x(E instanceof Error ? E.message : String(E)), f(!1);
      }
    })(), () => {
      A = !0;
    };
  }, [t, n, b, v]), te(() => {
    if (!t || !n || a <= 0) return;
    const A = window.setInterval(() => {
      N((E) => E + 1);
    }, a);
    return () => window.clearInterval(A);
  }, [t, n, a]), te(() => {
    if (!t || !n) return;
    const A = [], E = (B, V) => {
      const ae = ku(B);
      if (!ae) return;
      const K = V;
      if (K.runId !== n) return;
      w(!0);
      const ee = {
        auditId: `${wu}${B}-${K.stepId ?? "run"}-${Date.now()}`,
        timestamp: K.at ?? (/* @__PURE__ */ new Date()).toISOString(),
        action: ae,
        actorUserId: "executor",
        pipelineId: t,
        runId: n,
        trace: V
      };
      p((O) => [ee, ...O]);
    }, P = [
      "pipeline.step.started",
      "pipeline.step.completed",
      "pipeline.step.failed",
      "pipeline.step.breakpoint",
      "pipeline.run.completed",
      "pipeline.run.failed",
      "pipeline.run.resumed-from-step",
      "pipeline.approval.recorded"
    ];
    for (const B of P)
      A.push(s.subscribe(B, (V) => E(B, V)));
    return A.push(s.subscribeToRun(n)), () => {
      for (const B of A) B();
    };
  }, [s, t, n]), te(() => {
    d.length !== 0 && p((A) => {
      if (A.length === 0) return A;
      const E = /* @__PURE__ */ new Map();
      for (const P of d) {
        const B = E.get(P.action);
        (!B || P.timestamp > B) && E.set(P.action, P.timestamp);
      }
      return A.filter((P) => {
        const B = E.get(P.action);
        return !B || P.timestamp >= B;
      });
    });
  }, [d]);
  const k = se(!1), C = D(() => {
    !t || !n || !g || k.current || (k.current = !0, (async () => {
      try {
        const A = await Zn(t, n, {
          ...i ?? {},
          cursor: g
        });
        c((E) => {
          const P = new Set(E.map((V) => V.auditId)), B = E.concat(A.items.filter((V) => !P.has(V.auditId)));
          return B.sort(Un), B;
        }), m(A.nextCursor);
      } catch (A) {
        x(A instanceof Error ? A.message : String(A));
      } finally {
        k.current = !1;
      }
    })());
  }, [t, n, g, b]), T = D(() => {
    N((A) => A + 1);
  }, []);
  return {
    items: z(() => Cu(d, l), [d, l]),
    loading: u,
    error: h,
    hasMore: !!g,
    loadMore: C,
    liveHealthy: y,
    refresh: T
  };
}
const Su = "#3b82f6", $u = "#eab308", Tu = "#f97316", Jr = "#64748b", Au = "#ef4444", Ru = "#a855f7";
function Pu(t) {
  return t.action === "pipeline.step.failed" || t.outcome === "error" ? Au : t.action === "pipeline.run.resumed-from-step" || t.action.startsWith("pipeline.step.context.patched") ? Ru : t.action.startsWith("pipeline.approval.") ? $u : t.action.startsWith("pipeline.breakpoint.") ? Tu : t.action.startsWith("pipeline.step.") ? Su : (t.action.startsWith("pipeline.run."), Jr);
}
const Mu = {
  "1h": "Last 1h",
  "24h": "Last 24h",
  all: "All"
}, Hr = [
  { label: "Steps", matches: (t) => t.startsWith("pipeline.step.") },
  { label: "Approvals", matches: (t) => t.startsWith("pipeline.approval.") || t === "pipeline.approve" || t === "pipeline.reject" },
  { label: "Breakpoints", matches: (t) => t.startsWith("pipeline.breakpoint.") || t === "pipeline.step.breakpoint.hit" },
  { label: "Run lifecycle", matches: (t) => t.startsWith("pipeline.run.") || t === "pipeline.trigger" || t === "pipeline.cancel" },
  { label: "Errors", matches: (t) => t === "pipeline.step.failed" || t === "pipeline.run.failed" || t === "pipeline.force_fail" }
];
function Eu(t) {
  if (t === "all") return null;
  const n = Date.now();
  return t === "1h" ? n - 3600 * 1e3 : n - 1440 * 60 * 1e3;
}
function Kr(t) {
  const n = t.details, r = t.trace, a = n && typeof n.stepId == "string" ? n.stepId : void 0, i = r && typeof r.stepId == "string" ? r.stepId : void 0, s = r && typeof r.nodeId == "string" ? r.nodeId : void 0;
  return a ?? i ?? s;
}
function Du(t, n = Date.now()) {
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
function Ou({
  pipelineId: t,
  runId: n,
  onStepClick: r
}) {
  const a = Iu(t, n), { items: i, error: s, hasMore: d, loadMore: c, loading: l } = a, [p, u] = S(/* @__PURE__ */ new Set()), [f, h] = S(""), [x, g] = S("all"), [m, v] = S(/* @__PURE__ */ new Set()), N = D((C) => {
    u((T) => {
      const $ = new Set(T);
      return $.has(C) ? $.delete(C) : $.add(C), $;
    });
  }, []), y = D((C) => {
    v((T) => {
      const $ = new Set(T);
      return $.has(C) ? $.delete(C) : $.add(C), $;
    });
  }, []), w = z(() => {
    const C = Eu(x), T = f.trim().toLowerCase(), $ = Hr.filter((A) => p.has(A.label));
    return i.filter((A) => {
      if ($.length > 0 && !$.some((E) => E.matches(A.action)) || T && !A.actorUserId.toLowerCase().includes(T)) return !1;
      if (C !== null) {
        const E = Date.parse(A.timestamp);
        if (!Number.isFinite(E) || E < C) return !1;
      }
      return !0;
    });
  }, [i, p, f, x]), b = D(() => {
    if (typeof window > "u") return;
    const C = w.map((E) => JSON.stringify(E)).join(`
`) + (w.length > 0 ? `
` : ""), T = new Blob([C], { type: "application/x-ndjson" }), $ = URL.createObjectURL(T), A = document.createElement("a");
    A.href = $, A.download = `executor-log-${n}.ndjson`, document.body.appendChild(A), A.click(), document.body.removeChild(A), URL.revokeObjectURL($);
  }, [w, n]), k = D(
    (C) => {
      if (y(C.auditId), !r || !C.action.startsWith("pipeline.step.")) return;
      const T = Kr(C);
      T && r(T);
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
          Hr.map((C) => {
            const T = p.has(C.label);
            return /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  T ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => N(C.label),
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
            const T = x === C;
            return /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  T ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => g(C),
                "data-testid": `executor-log-time-${C}`,
                "aria-pressed": T,
                children: Mu[C]
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
            const T = m.has(C.auditId), A = C.action.startsWith("pipeline.step.") ? Kr(C) : void 0;
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
                      style: { background: Pu(C) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: C.timestamp,
                      children: Du(C.timestamp)
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
function Nh() {
  const { pipelineId: t, runId: n } = ht();
  return !t || !n ? /* @__PURE__ */ e(ft, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(uo, { pipelineId: t, children: /* @__PURE__ */ e(ia, { children: /* @__PURE__ */ e(_u, { pipelineId: t, runId: n }) }) });
}
function _u({ pipelineId: t, runId: n }) {
  const r = _e(), a = Le(), i = xt(), { definition: s } = a, [d, c] = S(null);
  te(() => {
    let j = !1;
    return import("./PipelineEditorServicesContext-CTTNH5_Y.js").then((le) => le.X).then(({ getPipelineRun: le }) => {
      le(t, n).then((ve) => {
        !j && ve && c(ve);
      });
    }), () => {
      j = !0;
    };
  }, [t, n]);
  const l = z(() => {
    const j = i.runs[n], le = d;
    if (!j && !le) return;
    if (!j) return le ?? void 0;
    if (!le) return j;
    const ve = Object.keys(j.steps).length, De = Object.keys(le.steps).length;
    return ve >= De ? j : { ...le, status: j.status, currentStepIds: j.currentStepIds };
  }, [i.runs, n, d]);
  sa(n);
  const p = xu(l ?? null), u = z(() => {
    const j = {};
    if (!s) return j;
    for (const le of s.nodes)
      j[le.id] = { type: le.data.type, data: le.data };
    return j;
  }, [s]), [f, h] = S(!1), x = se(null);
  mt(x, () => h(!1), f);
  const [g, m] = S("steps"), [v, N] = S(null), y = D((j) => {
    N(j), m("steps");
  }, []), [w, b] = S(null), [k, C] = S(null), [T, $] = S(!1), A = l?.status === "failed" ? l.error?.nodeId : void 0, E = D((j) => {
    if (!l) return;
    const le = Object.entries(l.steps).filter(([ve, De]) => ve !== j && De.status === "completed").map(([ve]) => ve);
    b({ nodeId: j, skippedNodes: le, snapshotInput: !1 }), C(null);
  }, [l]), P = D(async () => {
    if (!(!w || !l)) {
      C(null), $(!0);
      try {
        const j = await ho(
          t,
          l.id,
          w.nodeId,
          void 0,
          w.snapshotInput || void 0
        );
        b(null), r(`/pipelines/${t}/runs/${j.newRunId}`);
      } catch (j) {
        C(j instanceof Error ? j.message : String(j)), $(!1);
      }
    }
  }, [w, l, t, r]), [B, V] = S(null), [ae, K] = S(null), [ee, O] = S(null), R = D(async (j) => {
    if (l) {
      K(null), V(j);
      try {
        const le = await la(t, l.id, j);
        O(
          `Resumed from ${j.slice(0, 10)}${j.length > 10 ? "…" : ""} (replay #${le.replayAttempts})`
        ), setTimeout(() => O(null), 4e3), r(`/pipelines/${t}/runs/${l.id}`);
      } catch (le) {
        K(le instanceof Error ? le.message : String(le));
      } finally {
        V(null);
      }
    }
  }, [l, t, r]), J = D(async () => {
    if (!l) {
      try {
        const j = await i.triggerRun(t);
        r(`/pipelines/${t}/runs/${j}`);
      } catch (j) {
        console.error("[PipelineRunReplay] re-run failed", j);
      }
      return;
    }
    try {
      const j = await i.triggerRun(
        t,
        l.triggeredBy.payload
      );
      r(`/pipelines/${t}/runs/${j}`);
    } catch (j) {
      console.error("[PipelineRunReplay] re-run failed", j);
    }
  }, [l, i, t, r]), H = async () => {
    h(!1);
    try {
      await navigator.clipboard?.writeText(n);
    } catch {
    }
  }, L = () => {
    if (h(!1), !l) return;
    const j = JSON.stringify(l, null, 2);
    Pt(`run-${n}.json`, j);
  }, q = () => {
    if (h(!1), !s) return;
    const j = Fn(
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
              pt,
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
  const W = Gn(l.status), G = l.triggeredBy.userId ?? l.triggeredBy.triggerType, de = Ut(p);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
      "data-testid": "pipeline-replay",
      children: [
        /* @__PURE__ */ o("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
          /* @__PURE__ */ e(
            pt,
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
                ut(l.startedAt),
                " by ",
                G
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
          /* @__PURE__ */ e(ie, { tone: W.tone, "aria-label": `Status: ${W.label}`, children: W.label }),
          l.status === "failed" && l.error?.errorCategory ? /* @__PURE__ */ e(
            ie,
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
              onClick: () => E(A),
              disabled: T,
              "data-testid": "retry-from-failed-step-button",
              title: `Retry from "${A}" with the original upstream context`,
              children: "↻ Retry from failure"
            }
          ),
          /* @__PURE__ */ e(
            Ee,
            {
              onClick: J,
              "data-testid": "rerun-button",
              title: "Re-run with the original trigger payload",
              children: "↻ Re-run"
            }
          ),
          /* @__PURE__ */ o("div", { className: "relative", ref: x, children: [
            /* @__PURE__ */ e(
              pt,
              {
                onClick: () => h((j) => !j),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            f ? /* @__PURE__ */ o("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: H, children: "Copy runId" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: L, children: "Export run JSON" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: q, children: "Open as new draft" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ e(
          tn,
          {
            open: w !== null,
            onConfirm: P,
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
                /* @__PURE__ */ e("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: w.skippedNodes.map((j) => /* @__PURE__ */ e("span", { className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary", children: j.slice(0, 10) }, j)) })
              ] }),
              /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
                /* @__PURE__ */ e(
                  "input",
                  {
                    type: "checkbox",
                    checked: w.snapshotInput,
                    onChange: (j) => b((le) => le && { ...le, snapshotInput: j.target.checked }),
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
          k && /* @__PURE__ */ e(Xe, { title: "Retry failed:", className: "mb-4", children: k }),
          ae && /* @__PURE__ */ e(Xe, { title: "Resume failed:", className: "mb-4", "data-testid": "resume-error-banner", children: ae }),
          (l.replayAttempts ?? 0) > 0 && /* @__PURE__ */ e(
            Xe,
            {
              title: "Resumed from a previous failure",
              className: "mb-4",
              "data-testid": "resume-history-banner",
              children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ o("div", { children: [
                  l.error?.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o(Y, { children: [
                    "Originally failed at ",
                    /* @__PURE__ */ e("code", { children: l.error.nodeId.slice(0, 12) }),
                    " — "
                  ] }),
                  "Resumed ",
                  l.replayAttempts,
                  " time",
                  l.replayAttempts === 1 ? "" : "s",
                  ".",
                  l.resumeHistory && l.resumeHistory.length > 0 && /* @__PURE__ */ o(Y, { children: [
                    " ",
                    "Most recent: from",
                    " ",
                    /* @__PURE__ */ e("code", { children: l.resumeHistory[l.resumeHistory.length - 1].fromNodeId.slice(0, 12) }),
                    " ",
                    "at ",
                    ut(l.resumeHistory[l.resumeHistory.length - 1].at),
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
                      ut(j.at)
                    ] }, `${j.fromNodeId}-${j.at}-${le}`))
                  }
                )
              ] })
            }
          ),
          ee && /* @__PURE__ */ e(Xe, { title: "Resumed", className: "mb-4", "data-testid": "resume-toast", children: ee }),
          l.error && /* @__PURE__ */ o(Xe, { title: "Run failed:", className: "mb-4", children: [
            l.error.message,
            l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o("span", { className: "ml-2 text-[11px] text-[#b91c1c]", children: [
              "at node ",
              l.error.nodeId.slice(0, 8)
            ] }),
            l.status === "failed" && l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ e("div", { className: "mt-2", children: /* @__PURE__ */ e(
              Ee,
              {
                onClick: () => R(l.error.nodeId),
                disabled: B !== null,
                "data-testid": "resume-from-here-button",
                title: `Resume this run from "${l.error.nodeId}" using its accumulated upstream context`,
                children: B === l.error.nodeId ? "Resuming…" : "↻ Resume from here"
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
                const le = g === j.id;
                return /* @__PURE__ */ e(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": le,
                    onClick: () => m(j.id),
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
          g === "steps" ? (
            /* Threaded step list with fork nesting */
            /* @__PURE__ */ e(
              vu,
              {
                steps: l.steps,
                nodeDataMap: u,
                edges: s?.edges,
                onRetryFromStep: E,
                onResumeFromStep: l.status === "failed" ? R : void 0
              }
            )
          ) : /* @__PURE__ */ e("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ e(
            Ou,
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
function Lu(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${Ce(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function Bu(t) {
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
function Uu(t, n) {
  if (!t) return n;
  const r = t.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Fu(t, n) {
  if (!t) return !1;
  const r = t.nodes.find((a) => a.id === n);
  return !!r && r.data.type === "condition";
}
function Gr(t) {
  if (!t) return;
  const n = t.output;
  if (n && typeof n == "object" && "result" in n)
    return n.result ? "true" : "false";
}
function ju(t, n) {
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
function zu(t, n, r) {
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
    const x = Fu(r, s), g = x ? Gr(d) : void 0, m = x ? Gr(c) : void 0, v = x && g !== void 0 && m !== void 0 && g !== m;
    return {
      nodeId: s,
      name: Uu(r, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: f,
      durationLarge: h,
      branchDiffers: v,
      isLlm: !!(d?.llm || c?.llm),
      isCondition: x,
      branchA: g,
      branchB: m
    };
  });
}
function qu(t) {
  if (t.statusDiffers) return "bg-[#fef2f2]";
  if (t.branchDiffers) return "bg-[#eff6ff]";
  if (t.durationLarge) return "bg-[#fffbeb]";
}
function Yr({
  step: t,
  branch: n,
  isCondition: r
}) {
  if (!t)
    return /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" });
  const a = Bu(t.status);
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(ie, { tone: a, children: t.status }),
      /* @__PURE__ */ e("span", { className: "font-mono text-text-secondary", children: Ce(t.durationMs) }),
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
function Vu({ a: t, b: n }) {
  const r = z(() => ju(t, n), [t, n]);
  return /* @__PURE__ */ e(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: r.map((a, i) => a.type === "eq" ? /* @__PURE__ */ e("span", { children: a.text }, i) : a.type === "add" ? /* @__PURE__ */ e("span", { "data-diff": "add", className: "bg-[#dcfce7] text-[#166534]", children: a.text }, i) : /* @__PURE__ */ e("span", { "data-diff": "del", className: "bg-[#fee2e2] text-[#991b1b] line-through", children: a.text }, i))
    }
  );
}
function Wu({ row: t }) {
  const n = t.a?.llm, r = t.b?.llm, a = n && r ? r.tokensIn + r.tokensOut - (n.tokensIn + n.tokensOut) : void 0, i = qu(t);
  return /* @__PURE__ */ o(Y, { children: [
    /* @__PURE__ */ o("tr", { "data-testid": `run-compare-row-${t.nodeId}`, className: i, children: [
      /* @__PURE__ */ o("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-text-primary", children: t.name }),
        /* @__PURE__ */ e("div", { className: "font-mono text-[11px] text-text-tertiary", children: t.nodeId })
      ] }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ e(Yr, { step: t.a, branch: t.branchA, isCondition: t.isCondition }) }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ e(Yr, { step: t.b, branch: t.branchB, isCondition: t.isCondition }) }),
      /* @__PURE__ */ o(
        "td",
        {
          className: I("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", i),
          "data-testid": `run-compare-delta-${t.nodeId}`,
          children: [
            t.branchDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#2563eb]", children: "different branch!" }) : t.statusDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#dc2626]", children: "status differs" }) : t.durationDelta != null ? /* @__PURE__ */ e("span", { className: t.durationLarge ? "text-[#d97706]" : "text-text-secondary", children: Lu(t.durationDelta) }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "—" }),
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
          Vu,
          {
            a: n?.response ?? "",
            b: r?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function Ju({ runA: t, runB: n, def: r }) {
  const a = z(() => zu(t, n, r), [t, n, r]);
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
        /* @__PURE__ */ e("tbody", { children: a.map((i) => /* @__PURE__ */ e(Wu, { row: i }, i.nodeId)) })
      ]
    }
  );
}
function Hu(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${Ce(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function Ku(t) {
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
function Gu(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Xr(t, n) {
  const r = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
    model: n.get(a.nodeId),
    tokensIn: a.llm?.tokensIn ?? 0,
    tokensOut: a.llm?.tokensOut ?? 0
  }));
  return Ut(gt(r).total);
}
function Qr({
  label: t,
  run: n,
  cost: r,
  testIdPrefix: a
}) {
  const i = Ku(n.status);
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
          /* @__PURE__ */ e("span", { className: "text-text-secondary", children: ut(n.startedAt) })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(ie, { tone: i, children: n.status }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", children: Ce(n.durationMs) }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", "data-testid": `${a}-cost`, children: r })
        ] })
      ]
    }
  );
}
function wh() {
  const { pipelineId: t, runIdA: n, runIdB: r } = ht(), a = _e(), i = z(
    () => t ? nt(t) : null,
    [t]
  ), s = z(
    () => t && n ? en(t, n) : null,
    [t, n]
  ), d = z(
    () => t && r ? en(t, r) : null,
    [t, r]
  ), c = z(() => Gu(i), [i]);
  if (!t || !n || !r)
    return /* @__PURE__ */ e(ft, { to: "/pipelines", replace: !0 });
  if (!i)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      Fe,
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
      Fe,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable — they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => a(`/pipelines/${t}/runs`)
      }
    ) });
  const l = (d.durationMs ?? 0) - (s.durationMs ?? 0), p = Xr(s, c), u = Xr(d, c), f = (/* @__PURE__ */ new Set([
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
      /* @__PURE__ */ e(Qr, { label: "Run A", run: s, cost: p, testIdPrefix: "run-a" }),
      /* @__PURE__ */ e(Qr, { label: "Run B", run: d, cost: u, testIdPrefix: "run-b" })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
        "data-testid": "run-compare-delta",
        children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Δ duration" }),
          /* @__PURE__ */ e("span", { className: "font-mono text-[13px]", children: Hu(l) }),
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
    /* @__PURE__ */ e(Ju, { runA: s, runB: d, def: i })
  ] });
}
function Yu(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${Ce(Math.abs(t))}`;
}
function Zr(t) {
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
function Xu({
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
              /* @__PURE__ */ e(ie, { tone: Zr(t.status), children: t.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: ut(t.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              Ce(t.durationMs),
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
              /* @__PURE__ */ e(ie, { tone: Zr(n.status), children: n.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: ut(n.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              Ce(n.durationMs),
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
              children: Yu(d)
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
function Qu(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${Ce(Math.abs(t))}`;
}
function eo(t) {
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
function Zu(t, n) {
  if (!t) return n;
  const r = t.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function em(t, n, r) {
  const a = /* @__PURE__ */ new Set(), i = [];
  if (r)
    for (const s of r.nodes)
      (t.steps[s.id] || n.steps[s.id]) && (i.push(s.id), a.add(s.id));
  for (const s of [...Object.keys(t.steps), ...Object.keys(n.steps)])
    a.has(s) || (i.push(s), a.add(s));
  return i.map((s) => {
    const d = t.steps[s], c = n.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, f = !!d && !!c && d.status !== c.status, h = !!d && !c, x = !d && !!c, g = d?.llm ? d.llm.tokensIn + d.llm.tokensOut : void 0, m = c?.llm ? c.llm.tokensIn + c.llm.tokensOut : void 0, v = g != null && m != null ? m - g : void 0;
    return {
      nodeId: s,
      name: Zu(r, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: f,
      onlyInA: h,
      onlyInB: x,
      tokenDelta: v
    };
  });
}
function tm({ runA: t, runB: n, def: r }) {
  const a = z(() => em(t, n, r), [t, n, r]);
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
            i.onlyInA && /* @__PURE__ */ e(ie, { tone: "warning", size: "xs", children: "only in A" }),
            i.onlyInB && /* @__PURE__ */ e(ie, { tone: "warning", size: "xs", children: "only in B" })
          ] }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: i.a ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(ie, { tone: eo(i.a.status), children: i.a.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: Ce(i.a.durationMs) }),
            i.a.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              i.a.llm.tokensIn,
              " in / ",
              i.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: i.b ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(ie, { tone: eo(i.b.status), children: i.b.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: Ce(i.b.durationMs) }),
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
                children: Qu(i.durationDelta)
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
function nm(t, n) {
  if (!t) return n;
  const r = t.nodes.find((a) => a.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function nn(t, n = "", r = 0) {
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
        for (const [c, l] of nn(t[s], d, r + 1))
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
      for (const [l, p] of nn(d, c, r + 1))
        a.set(l, p);
    }
  return a;
}
function Bo(t, n) {
  const r = nn(t), a = nn(n), i = /* @__PURE__ */ new Set([...r.keys(), ...a.keys()]), s = [];
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
const rm = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function om({
  nodeId: t,
  name: n,
  outputA: r,
  outputB: a
}) {
  const [i, s] = S(!1), d = z(() => Bo(r, a), [r, a]), c = d.filter((l) => l.type !== "unchanged").length;
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
              /* @__PURE__ */ o(ie, { tone: "warning", size: "xs", className: "ml-auto", children: [
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
              rm[l.type]
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
function am({ runA: t, runB: n, def: r }) {
  const a = z(() => {
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
    om,
    {
      nodeId: i,
      name: nm(r, i),
      outputA: t.steps[i]?.output,
      outputB: n.steps[i]?.output
    },
    i
  )) });
}
function im(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function to(t, n) {
  const r = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
    model: n.get(a.nodeId),
    tokensIn: a.llm?.tokensIn ?? 0,
    tokensOut: a.llm?.tokensOut ?? 0
  }));
  return Ut(gt(r).total);
}
function Xt({
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
              r && /* @__PURE__ */ e(ie, { tone: "info", className: "ml-auto", children: r })
            ]
          }
        ),
        s && /* @__PURE__ */ e("div", { className: "p-4", children: a })
      ]
    }
  );
}
const sm = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function lm({
  runA: t,
  runB: n
}) {
  const r = z(
    () => Bo(t.context, n.context),
    [t.context, n.context]
  ), a = r.filter((i) => i.type !== "unchanged").length;
  return /* @__PURE__ */ e(
    Xt,
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
            sm[i.type]
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
function cm({ pipelineId: t, runIdA: n, runIdB: r }) {
  const a = _e(), i = z(
    () => nt(t),
    [t]
  ), s = z(
    () => en(t, n),
    [t, n]
  ), d = z(
    () => en(t, r),
    [t, r]
  ), c = z(() => im(i), [i]);
  if (!i)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      Fe,
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
      Fe,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable -- they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => a(`/pipelines/${t}/runs`)
      }
    ) });
  const l = to(s, c), p = to(d, c);
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
        /* @__PURE__ */ e(Xt, { title: "Summary", testId: "diff-summary-section", children: /* @__PURE__ */ e(
          Xu,
          {
            runA: s,
            runB: d,
            costA: l,
            costB: p
          }
        ) }),
        /* @__PURE__ */ e(
          Xt,
          {
            title: "Step-by-step comparison",
            badge: `${Object.keys(s.steps).length + Object.keys(d.steps).length > 0 ? "steps" : "0 steps"}`,
            testId: "diff-steps-section",
            children: /* @__PURE__ */ e(tm, { runA: s, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ e(
          Xt,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ e(am, { runA: s, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ e(lm, { runA: s, runB: d })
      ]
    }
  );
}
function kh() {
  const { pipelineId: t } = ht(), [n] = rn(), r = n.get("a"), a = n.get("b");
  return !t || !r || !a ? /* @__PURE__ */ e(ft, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(cm, { pipelineId: t, runIdA: r, runIdB: a });
}
function Ch() {
  const t = _e(), [n, r] = rn(), [a, i] = S([]), { runs: s } = xt();
  te(() => {
    let y = !1;
    return (async () => {
      const w = er(), b = [];
      await Promise.all(
        w.map(async (k) => {
          try {
            const { runs: C } = await po(k.id, { limit: 50 });
            if (C.length > 0) {
              for (const T of C)
                T.id && b.push({ ...T, pipelineName: k.name });
              return;
            }
          } catch {
          }
          for (const C of Zt(k.id))
            C.id && b.push({ ...C, pipelineName: k.name });
        })
      ), !y && (b.sort((k, C) => C.startedAt.localeCompare(k.startedAt)), i(b));
    })(), () => {
      y = !0;
    };
  }, []);
  const d = z(() => {
    const y = new Map(er().map((k) => [k.id, k.name])), w = new Set(a.map((k) => k.id)), b = [];
    for (const [k, C] of Object.entries(s))
      w.has(k) || C.pipelineId && b.push({
        ...C,
        pipelineName: y.get(C.pipelineId) ?? `Pipeline ${C.pipelineId.slice(0, 8)}`
      });
    return b.length === 0 ? a : [...b, ...a].sort((k, C) => C.startedAt.localeCompare(k.startedAt));
  }, [a, s]), { query: c, statuses: l, triggerKinds: p, range: u } = z(
    () => _o(n),
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
  }, v = z(
    () => Oo(d, { query: c, statuses: l, triggerKinds: p, range: u }),
    [d, c, l, p, u]
  ), N = z(() => {
    const y = {};
    for (const w of v) {
      const b = Object.values(w.steps).filter((C) => !!C.llm).map((C) => ({
        model: void 0,
        tokensIn: C.llm?.tokensIn ?? 0,
        tokensOut: C.llm?.tokensOut ?? 0
      })), k = gt(b);
      k.total.totalCostUsd > 0 && (y[w.id] = Ut(k.total));
    }
    return y;
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
      Lo,
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
    v.length === 0 ? /* @__PURE__ */ e(
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
      /* @__PURE__ */ e("tbody", { children: v.map((y) => /* @__PURE__ */ o(
        "tr",
        {
          onClick: () => t(`/pipelines/${y.pipelineId}/runs/${y.id}`),
          className: "border-b border-border cursor-pointer hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-medium", children: y.pipelineName }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: y.id.slice(0, 11) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ e(ie, { tone: Gn(y.status).tone, size: "sm", children: y.status }) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: y.triggerType ?? y.triggeredBy?.triggerType }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: tp(y.startedAt) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: y.completedAt ? Ce(new Date(y.completedAt).getTime() - new Date(y.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: N[y.id] ?? "—" })
          ]
        },
        y.id
      )) })
    ] }) })
  ] });
}
function Uo(t) {
  let n = 0, r = 0;
  for (const a of Object.values(t.steps ?? {}))
    a.llm && (n += a.llm.tokensIn ?? 0, r += a.llm.tokensOut ?? 0);
  return { tokensIn: n, tokensOut: r };
}
function dm(t) {
  const n = /* @__PURE__ */ new Map();
  if (!t) return n;
  for (const r of t.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function pm(t, n) {
  const r = [];
  for (const a of Object.values(t.steps ?? {}))
    a.llm && r.push({
      model: n.get(a.nodeId),
      tokensIn: a.llm.tokensIn,
      tokensOut: a.llm.tokensOut
    });
  return gt(r).total.totalCostUsd;
}
function no(t, n) {
  if (t.length === 0) return 0;
  const r = Math.min(t.length - 1, Math.floor(t.length * n));
  return t[r];
}
function ro(t) {
  return t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function oo(t) {
  const n = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) ? `$${n.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function um(t) {
  return t.slice(0, 8);
}
function mm(t) {
  const n = Date.now() - new Date(t).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function hm(t, n) {
  const r = t.length;
  let a = 0, i = 0, s = 0;
  const d = [];
  let c = 0, l = 0, p = 0;
  const u = /* @__PURE__ */ new Map();
  for (const m of t) {
    m.status === "completed" ? a++ : m.status === "failed" ? i++ : m.status === "cancelled" && s++, typeof m.durationMs == "number" && m.durationMs > 0 && d.push(m.durationMs);
    const v = Uo(m);
    if (c += v.tokensIn, l += v.tokensOut, p += pm(m, n), m.error?.message) {
      const N = m.error.message.slice(0, 48), y = u.get(N);
      y ? (y.count += 1, m.startedAt > y.lastSeenAt && (y.lastSeenAt = m.startedAt, y.exampleRunId = m.id)) : u.set(N, { count: 1, lastSeenAt: m.startedAt, exampleRunId: m.id });
    }
  }
  d.sort((m, v) => m - v);
  const f = no(d, 0.5), h = no(d, 0.95), x = r === 0 ? 0 : Math.round(a / r * 100), g = [...u.entries()].map(([m, v]) => ({ key: m, count: v.count, lastSeenAt: v.lastSeenAt, exampleRunId: v.exampleRunId })).sort((m, v) => v.count - m.count).slice(0, 5);
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
function fm(t) {
  return t >= 90 ? "#16a34a" : t >= 70 ? "#f59e0b" : "#dc2626";
}
function xm(t) {
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
function gm(t, n) {
  const a = [...t].sort((s, d) => s.startedAt.localeCompare(d.startedAt)).filter((s) => typeof s.durationMs == "number" && s.durationMs > 0).map((s) => ({ x: new Date(s.startedAt).getTime(), y: s.durationMs })), i = a.map((s) => ({ x: s.x, y: n }));
  return [
    { label: "Duration (ms)", data: a, color: "#646cff" },
    { label: "p50", data: i, color: "#94a3b8" }
  ];
}
function bm(t) {
  const n = [...t].sort((i, s) => i.startedAt.localeCompare(s.startedAt)), r = [], a = [];
  for (const i of n) {
    const s = new Date(i.startedAt).getTime(), { tokensIn: d, tokensOut: c } = Uo(i);
    r.push({ x: s, y: d }), a.push({ x: s, y: c });
  }
  return [
    { label: "Tokens in", data: r, color: "#646cff" },
    { label: "Tokens out", data: a, color: "#16a34a" }
  ];
}
function Ih() {
  const { pipelineId: t } = ht(), n = _e(), [r, a] = S(null), [i, s] = S([]), [d, c] = S("50");
  te(() => {
    t && (a(nt(t)), s(Zt(t)));
  }, [t]);
  const l = z(() => {
    if (d === "all") return i;
    const m = Number(d);
    return i.slice(0, m);
  }, [i, d]), p = z(() => dm(r), [r]), u = z(() => hm(l, p), [l, p]), f = z(
    () => tu(l, r).filter((m) => m.totalCostUsd > 0 || m.stepCount > 0),
    [l, r]
  ), h = z(() => ou(i, r, 30), [i, r]), x = z(
    () => [
      {
        label: "Daily spend",
        data: h.map((m) => ({ x: m.ts, y: m.totalCostUsd })),
        color: "#646cff"
      }
    ],
    [h]
  );
  if (!t) return /* @__PURE__ */ e(ft, { to: "/pipelines", replace: !0 });
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
    g ? /* @__PURE__ */ o(Y, { children: [
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
                  style: { color: fm(u.successRatePct) },
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
              /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: Ce(u.medianMs) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                "p95 · ",
                Ce(u.p95Ms)
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
              /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: ro(u.totalCost) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                ro(u.costPerRun),
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
                Ia,
                {
                  data: f.map((m) => ({
                    label: m.label,
                    cost: Number(m.totalCostUsd.toFixed(6))
                  })),
                  xKey: "label",
                  yKey: "cost",
                  height: 200,
                  color: "#646cff",
                  yFormat: oo
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-trend-30d", children: [
              /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "30-day spend trend" }),
              /* @__PURE__ */ e(
                jt,
                {
                  series: x,
                  height: 200,
                  xFormat: (m) => new Date(Number(m)).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric"
                  }),
                  yFormat: oo
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
            jt,
            {
              series: xm(l),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString()
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Duration over time" }),
          /* @__PURE__ */ e(
            jt,
            {
              series: gm(l, u.medianMs),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString(),
              yFormat: (m) => Ce(m)
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Token usage over time" }),
          /* @__PURE__ */ e(
            jt,
            {
              series: bm(l),
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
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5 text-text-secondary", children: mm(m.lastSeenAt) }),
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => n(`/pipelines/${t}/runs/${m.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    um(m.exampleRunId),
                    " →"
                  ]
                }
              ) })
            ] }, m.key)) })
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
function ym(t) {
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
function vm(t) {
  return t.length <= 6 ? t : t.slice(-6);
}
function Nm({ approver: t, idx: n }) {
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
function wm(t, n) {
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
function km({ row: t, onSubmit: n, onOpenPipeline: r }) {
  const [a, i] = S(""), s = D(
    (p) => {
      n(p, a.trim()), i("");
    },
    [a, n]
  ), d = t.requiredCount ?? 1, c = t.recordedCount ?? 0, l = z(() => wm(t.runContext, t.runSteps), [t.runContext, t.runSteps]);
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
            vm(t.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: ym(t.requestedAt) })
    ] }),
    t.message ? /* @__PURE__ */ e("div", { "data-testid": `approval-message-${t.runId}`, className: "text-[13px] text-text-secondary bg-[#fafbfc] px-3 py-2 rounded-md leading-normal", children: t.message }) : null,
    /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5 px-3 py-2.5 bg-[#fafbfc] rounded-md border border-border", children: [
      /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: l.length > 0 ? "Context" : "Run details" }),
      l.length > 0 ? l.map(({ label: p, value: u }) => /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-medium text-text-secondary", children: p }),
        /* @__PURE__ */ e("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: u })
      ] }, p)) : /* @__PURE__ */ o(Y, { children: [
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
      t.approvers.length === 0 ? /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : t.approvers.map((p, u) => /* @__PURE__ */ e(Nm, { approver: p, idx: u }, u)),
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
function Sh() {
  const t = _e(), { approvals: n, isLoading: r, error: a, retry: i } = ca(), { resolveApproval: s, runs: d } = xt(), [c, l] = S(
    () => /* @__PURE__ */ new Set()
  );
  te(() => {
    if (c.size === 0) return;
    const m = new Set(n.map((y) => `${y.runId}::${y.stepId}`));
    let v = !1;
    const N = new Set(c);
    for (const y of c)
      m.has(y) || (N.delete(y), v = !0);
    v && l(N);
  }, [n, c]);
  const [p, u] = S({}), f = se(/* @__PURE__ */ new Set());
  te(() => {
    for (const m of n)
      f.current.has(m.runId) || (f.current.add(m.runId), da(m.pipelineId, m.runId).then((v) => {
        v && u((N) => ({
          ...N,
          [m.runId]: { context: v.context, steps: v.steps }
        }));
      }));
  }, [n]);
  const h = z(() => {
    const m = /* @__PURE__ */ new Map(), v = [];
    for (const N of n) {
      const y = `${N.runId}::${N.stepId}`;
      if (c.has(y)) continue;
      let w = m.get(N.pipelineId);
      w === void 0 && (w = nt(N.pipelineId), m.set(N.pipelineId, w));
      const b = w?.name ?? (N.pipelineId ? `Pipeline ${N.pipelineId.slice(0, 8)}` : "Unknown pipeline"), k = p[N.runId]?.context ?? d[N.runId]?.context, C = p[N.runId]?.steps;
      v.push({ ...N, pipelineName: b, runContext: k, runSteps: C });
    }
    return v;
  }, [n, c, d, p]), x = D(
    (m, v, N, y, w) => {
      s(v, N, y, w || void 0), l((b) => {
        const k = new Set(b);
        return k.add(`${v}::${N}`), k;
      }), fetch(`/api/pipelines/${encodeURIComponent(v)}/approvals`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: N, decision: y, ...w ? { comment: w } : {} })
      }).catch((b) => {
        console.error("[approvals] POST failed", b);
      }), t(`/pipelines/${m}/runs/${v}`);
    },
    [s, t]
  ), g = h.length;
  return /* @__PURE__ */ o("div", { "data-testid": "pending-approvals-page", className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-[inherit]", children: [
    /* @__PURE__ */ e("div", { className: "h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]", children: /* @__PURE__ */ o("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "text-lg font-bold text-text-primary", children: "Pending approvals" }),
      /* @__PURE__ */ e(ie, { "data-testid": "pending-count", tone: g > 0 ? "warning" : "neutral", size: "sm", children: g })
    ] }) }),
    /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto p-5", children: [
      a ? /* @__PURE__ */ o("div", { "data-testid": "approvals-error", role: "alert", className: "px-4 py-3 bg-[#fef2f2] border border-[#dc2626] text-[#dc2626] rounded-lg flex items-center justify-between gap-3 mb-4", children: [
        /* @__PURE__ */ e("span", { className: "text-[13px] font-medium", children: "Couldn't load pending approvals. Try again." }),
        /* @__PURE__ */ e("button", { "data-testid": "approvals-retry", onClick: i, className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[#dc2626] border border-[#dc2626] rounded-md cursor-pointer font-[inherit]", children: "Retry" })
      ] }) : null,
      r && g === 0 ? /* @__PURE__ */ o("div", { "data-testid": "approvals-loading", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: [
        /* @__PURE__ */ e(ln, { height: 140 }),
        /* @__PURE__ */ e(ln, { height: 140 }),
        /* @__PURE__ */ e(ln, { height: 140 })
      ] }) : g === 0 && !a ? /* @__PURE__ */ e(
        Fe,
        {
          icon: "✋",
          title: "No pending approvals",
          body: "When a pipeline reaches an approval step, it'll show up here.",
          testId: "approvals-empty"
        }
      ) : /* @__PURE__ */ e("div", { "data-testid": "approvals-list", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: h.map((m) => /* @__PURE__ */ e(
        km,
        {
          row: m,
          onOpenPipeline: () => t(`/pipelines/${m.pipelineId}`),
          onSubmit: (v, N) => x(m.pipelineId, m.runId, m.stepId, v, N)
        },
        `${m.runId}:${m.stepId}`
      )) })
    ] })
  ] });
}
function $h({ data: t, onChange: n }) {
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
        Ot,
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
        Ot,
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
const Cm = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.crop.output.imageId"
], Im = [
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
function Th({ data: t, onChange: n }) {
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
        Ot,
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
        ao,
        {
          samples: Cm,
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
        Ot,
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
          ao,
          {
            samples: Im,
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
function Ah({
  status: t,
  result: n,
  runId: r,
  endpointLabel: a,
  error: i,
  latencyMs: s,
  onOpen: d,
  className: c
}) {
  const l = a ?? n?.model?.endpointId ?? "vision-model", p = s ?? n?.model?.latencyMs, u = n?.caption, f = (n?.tags ?? []).slice(0, 5), h = /* @__PURE__ */ o(Y, { children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ e("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: l }),
      t === "running" ? /* @__PURE__ */ o(ie, { tone: "info", size: "sm", children: [
        /* @__PURE__ */ e("span", { className: "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" }),
        " running"
      ] }) : t === "completed" ? /* @__PURE__ */ e(ie, { tone: "success", size: "sm", children: "ok" }) : /* @__PURE__ */ e(ie, { tone: "danger", size: "sm", children: "failed" }),
      typeof p == "number" ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        p.toFixed(0),
        "ms"
      ] }) : null,
      r ? /* @__PURE__ */ e("span", { className: "ml-auto truncate font-mono text-[10px] text-text-tertiary", children: r }) : null
    ] }),
    t === "failed" && i ? /* @__PURE__ */ e("p", { className: "text-[13px] text-red-700", children: i }) : /* @__PURE__ */ e("p", { className: "line-clamp-2 text-left text-[13px] text-text-primary", children: u ?? (t === "running" ? "Analyzing image…" : "No caption produced.") }),
    f.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: f.map((g) => /* @__PURE__ */ o(ie, { tone: "neutral", size: "sm", children: [
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
function Rh(t = {}) {
  const { maxRecords: n = 50, runId: r } = t, [a, i] = S([]), s = se(/* @__PURE__ */ new Map()), d = se(!0);
  return te(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Me("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.image.vision.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const f = `${u.runId}::${u.stepId}`;
    i((h) => {
      const x = s.current.get(f), g = typeof u.at == "number" ? u.at : Date.now(), m = (v) => {
        if (typeof x == "number" && x >= 0 && x < h.length) {
          const w = h.slice();
          return w[x] = { ...h[x], ...v }, w;
        }
        const N = [v, ...h];
        N.length > n && (N.length = n);
        const y = /* @__PURE__ */ new Map();
        return N.forEach((w, b) => y.set(`${w.runId}::${w.stepId}`, b)), s.current = y, N;
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
        const v = typeof x == "number" ? h[x] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          status: "completed",
          result: u.result,
          completedAt: g,
          elapsedMs: v?.startedAt ? g - v.startedAt : void 0,
          endpointId: v?.endpointId ?? u.result?.model?.endpointId
        });
      }
      if (p === "pipeline.image.vision.failed") {
        const v = typeof x == "number" ? h[x] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          status: "failed",
          error: u.error,
          completedAt: g,
          elapsedMs: v?.startedAt ? g - v.startedAt : void 0
        });
      }
      return h;
    });
  }), z(() => a, [a]);
}
function Sm(t) {
  return t === "pass" ? "success" : t === "fail" ? "danger" : "warning";
}
function $m({ result: t, className: n }) {
  const r = Sm(t.overallVerdict), a = r === "success" ? "PASS" : r === "danger" ? "FAIL" : "INCONCLUSIVE", i = t.rubricSnapshot.passThreshold ?? 0.5;
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
          /* @__PURE__ */ o(ie, { tone: r, size: "sm", children: [
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
            qn,
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
function Tm({ result: t, className: n }) {
  if (!t.criteria || t.criteria.length === 0) return null;
  const r = /* @__PURE__ */ new Map();
  for (const a of t.rubricSnapshot.criteria) r.set(a.id, a);
  return /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", n), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Criteria (",
      t.criteria.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1.5", children: t.criteria.map((a) => /* @__PURE__ */ e(Am, { score: a, def: r.get(a.criterionId) }, a.criterionId)) })
  ] });
}
function Am({
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
      /* @__PURE__ */ e(ie, { tone: r, size: "sm", children: a }),
      /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
        "raw: ",
        String(t.rawScore)
      ] })
    ] }),
    /* @__PURE__ */ e(
      qn,
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
const Fo = Wo(null);
function Ph({ value: t, children: n }) {
  return /* @__PURE__ */ e(Fo.Provider, { value: t, children: n });
}
function jo() {
  return lo(Fo);
}
function Mh({
  result: t,
  showVerdict: n = !0,
  showCriteria: r = !0,
  showMetadata: a = !0,
  showRawText: i = !1,
  className: s
}) {
  const d = jo(), [c, l] = S(!1), [p, u] = S(null), [f, h] = S(!1), [x, g] = S(null), m = se(!0);
  te(() => (m.current = !0, () => {
    m.current = !1;
  }), []), te(() => {
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
  const v = t.rawModelText ?? p ?? null, N = !!t.rawModelText || !!t.rawTextTruncated;
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-3 text-text-primary", s), children: [
    n ? /* @__PURE__ */ e($m, { result: t }) : null,
    r ? /* @__PURE__ */ e(Tm, { result: t }) : null,
    a ? /* @__PURE__ */ o("section", { className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
      /* @__PURE__ */ o("span", { children: [
        "tokens ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: t.tokensIn }),
        " in /",
        " ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: t.tokensOut }),
        " out"
      ] }),
      t.cacheReadTokens && t.cacheReadTokens > 0 ? /* @__PURE__ */ o(Y, { children: [
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
    i && N ? /* @__PURE__ */ o("section", { className: "flex flex-col gap-1.5", children: [
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
        Rm,
        {
          text: v,
          loading: f,
          error: x,
          fallbackHint: t.rawTextTruncated && !d ? "Raw text was spilled to S3 but no JudgmentApi provider is wired." : null
        }
      ) : null
    ] }) : null
  ] });
}
function Rm({
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
function Eh({ aggregate: t, className: n }) {
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
          /* @__PURE__ */ o(ie, { tone: i, size: "sm", children: [
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
            qn,
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
          typeof t.minOverallScore == "number" && typeof t.maxOverallScore == "number" ? /* @__PURE__ */ o(Y, { children: [
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
function Dh({
  aggregates: t,
  sortOrder: n = "desc",
  caption: r,
  loading: a = !1,
  className: i
}) {
  const s = z(() => {
    const f = t.slice();
    return f.sort((h, x) => h.dayBucket.localeCompare(x.dayBucket)), n === "desc" && f.reverse(), f;
  }, [t, n]), d = z(() => t.slice().sort((h, x) => h.dayBucket.localeCompare(x.dayBucket)).map((h) => h.numJudgments > 0 ? h.numPassed / h.numJudgments : 0), [t]);
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
        ie,
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
        wa,
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
      /* @__PURE__ */ e("tbody", { children: s.map((f) => /* @__PURE__ */ e(Pm, { row: f }, f.aggregateKey)) })
    ] })
  ] });
}
function Pm({ row: t }) {
  const n = t.numJudgments > 0 ? t.numPassed / t.numJudgments : 0, r = t.numJudgments > 0 ? t.sumOverallScore / t.numJudgments : 0, a = n >= 0.9 ? "success" : n >= 0.6 ? "warning" : "danger";
  return /* @__PURE__ */ o("tr", { className: "border-t border-border", children: [
    /* @__PURE__ */ e("td", { className: "py-1 pr-2 font-mono", children: t.dayBucket }),
    /* @__PURE__ */ e("td", { className: "py-1 pr-2", children: /* @__PURE__ */ o(ie, { tone: a, size: "sm", children: [
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
function Mm(t) {
  if (typeof t == "number") return t;
  if (typeof t == "string") {
    const n = Date.parse(t);
    if (Number.isFinite(n)) return n;
  }
  return Date.now();
}
function Oh(t = {}) {
  const { maxRecords: n = 50, runId: r } = t, [a, i] = S([]), s = se(/* @__PURE__ */ new Map()), d = se(!0);
  return te(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Me("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.judge.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || r && u.runId !== r) return;
    const f = `${u.runId}::${u.stepId}`;
    i((h) => {
      const x = s.current.get(f), g = Mm(u.at), m = (v) => {
        if (typeof x == "number" && x >= 0 && x < h.length) {
          const w = h.slice();
          return w[x] = { ...h[x], ...v }, w;
        }
        const N = [v, ...h];
        N.length > n && (N.length = n);
        const y = /* @__PURE__ */ new Map();
        return N.forEach((w, b) => y.set(`${w.runId}::${w.stepId}`, b)), s.current = y, N;
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
        const v = typeof x == "number" ? h[x] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? v?.pipelineId,
          status: "scored",
          result: u.result,
          completedAt: g,
          elapsedMs: v?.startedAt ? g - v.startedAt : u.latencyMs,
          rubricId: u.rubricId ?? v?.rubricId,
          judgeModel: u.judgeModel ?? v?.judgeModel,
          costUsd: u.costUsd ?? u.result?.costUsd,
          tokensIn: u.usage?.inputTokens ?? u.result?.tokensIn,
          tokensOut: u.usage?.outputTokens ?? u.result?.tokensOut
        });
      }
      if (p === "pipeline.judge.failed") {
        const v = typeof x == "number" ? h[x] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? v?.pipelineId,
          status: "failed",
          error: u.error,
          failureReason: u.reason,
          completedAt: g,
          elapsedMs: v?.startedAt ? g - v.startedAt : u.latencyMs,
          costUsd: u.costUsd,
          tokensIn: u.tokensIn,
          tokensOut: u.tokensOut
        });
      }
      if (p === "pipeline.judge.budget-exceeded") {
        const v = typeof x == "number" ? h[x] : void 0;
        return m({
          runId: u.runId,
          stepId: u.stepId,
          pipelineId: u.pipelineId ?? v?.pipelineId,
          status: "budget-exceeded",
          completedAt: g
        });
      }
      return h;
    });
  }), z(() => a, [a]);
}
function _h(t) {
  const n = jo(), [r, a] = S([]), [i, s] = S(!1), [d, c] = S(null), l = se(!0), p = se(() => {
  }), { pipelineId: u, rubricId: f, since: h, until: x, limit: g, refreshIntervalMs: m = 0, paused: v = !1 } = t, N = `${u ?? ""}|${f ?? ""}|${h ?? ""}|${x ?? ""}|${g ?? ""}|${v ? "1" : "0"}`;
  return te(() => (l.current = !0, () => {
    l.current = !1;
  }), []), te(() => {
    if (!n) {
      a([]), s(!1), c(null);
      return;
    }
    if (v) return;
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
  }, [n, N, m]), {
    aggregates: r,
    loading: i,
    error: d,
    reload: () => p.current()
  };
}
const Em = 100, Dm = 500, zo = 148, qo = 116, Om = 56, _m = 20;
function Lm(t) {
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
    const u = l * (zo + Om);
    p.forEach((f, h) => {
      c.set(f, {
        x: u,
        y: h * (qo + _m)
      });
    });
  }
  return c;
}
function Bm(t, n) {
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
function Um({ src: t, alt: n, testId: r }) {
  const a = se(null), [i, s] = S(!1);
  return te(() => {
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
function Fm({ data: t }) {
  const { entry: n, highlighted: r, selected: a, onSelect: i, getImageUrl: s } = t, d = n.width && n.height ? `${n.width}×${n.height}` : "", c = n.producedByNodeKind;
  return /* @__PURE__ */ o(Y, { children: [
    /* @__PURE__ */ e(U, { type: "target", position: F.Left, id: "in", className: "w-2 h-2 bg-border-emphasis" }),
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
            Um,
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
    /* @__PURE__ */ e(U, { type: "source", position: F.Right, id: "out", className: "w-2 h-2 bg-border-emphasis" })
  ] });
}
const jm = { lineageNode: Fm };
function zm() {
  return /* @__PURE__ */ e(
    "div",
    {
      className: "flex items-center justify-center h-full text-text-tertiary text-sm",
      "data-testid": "lineage-graph-empty",
      children: "No image artifacts produced by this run."
    }
  );
}
function qm(t, n) {
  if (t.length <= n) return t;
  const r = t.map((a, i) => ({ e: a, i }));
  return r.sort((a, i) => {
    const s = Date.parse(a.e.at), d = Date.parse(i.e.at);
    return d !== s ? d - s : i.i - a.i;
  }), r.slice(0, n).map((a) => a.e);
}
function An(t) {
  return t.length > 10 ? `${t.slice(0, 8)}…` : t;
}
function Vm({
  navEntries: t,
  imageId: n,
  onClose: r,
  onNavigate: a,
  getImageUrl: i
}) {
  const s = t.find((u) => u.imageId === n), [d, c] = S(!1);
  te(() => {
    c(!1);
  }, [n]), te(() => {
    const u = (f) => {
      if (f.key !== "ArrowRight" && f.key !== "ArrowLeft" || t.length === 0) return;
      const h = t.findIndex((m) => m.imageId === n);
      if (h === -1) return;
      const x = t.length, g = f.key === "ArrowRight" ? (h + 1) % x : (h - 1 + x) % x;
      f.preventDefault(), a(t[g].imageId);
    };
    return window.addEventListener("keydown", u), () => window.removeEventListener("keydown", u);
  }, [n, t, a]);
  const l = D(() => {
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
    We,
    {
      open: !0,
      onClose: r,
      title: `Artifact ${An(s.imageId)}`,
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
                  /* @__PURE__ */ o(ie, { tone: "neutral", size: "sm", mono: !0, title: s.imageId, children: [
                    "id: ",
                    An(s.imageId)
                  ] }),
                  /* @__PURE__ */ e(
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
                  s.mimeType && /* @__PURE__ */ e(ie, { tone: "info", size: "sm", children: s.mimeType }),
                  p && /* @__PURE__ */ e(ie, { tone: "neutral", size: "sm", mono: !0, children: p }),
                  /* @__PURE__ */ o(ie, { tone: "purple", size: "sm", mono: !0, title: s.producedByStepId, children: [
                    "step: ",
                    An(s.producedByStepId)
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
function Lh({
  entries: t,
  selectedImageId: n,
  onSelect: r,
  maxRenderedNodes: a = Em
}) {
  const i = Te(), [s, d] = S(!1), [c, l] = S(!1), [p, u] = S(null), f = t.length, h = !s && f > a, x = z(
    () => h ? qm(t, a) : t,
    [t, h, a]
  ), g = z(
    () => n ? Bm(n, x) : /* @__PURE__ */ new Set(),
    [n, x]
  ), m = z(() => Lm(x), [x]), v = D(
    (K) => {
      r?.(K), u(K);
    },
    [r]
  ), N = z(
    () => x.map((K) => {
      const ee = m.get(K.imageId) ?? { x: 0, y: 0 };
      return {
        id: K.imageId,
        type: "lineageNode",
        position: ee,
        data: {
          entry: K,
          highlighted: g.has(K.imageId),
          selected: K.imageId === n,
          onSelect: v,
          getImageUrl: i
        },
        style: { width: zo, height: qo }
      };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [x, n, g, v, i]
  ), y = z(
    () => new Set(x.map((K) => K.imageId)),
    [x]
  ), w = z(
    () => x.filter(
      (K) => K.parentImageId && y.has(K.parentImageId)
    ).map((K) => ({
      id: `${K.parentImageId}->${K.imageId}`,
      source: K.parentImageId,
      target: K.imageId,
      sourceHandle: "out",
      targetHandle: "in",
      className: g.has(K.imageId) && g.has(K.parentImageId) ? "stroke-primary stroke-2" : "stroke-border"
    })),
    [x, y, g]
  ), [b, , k] = fo(N), [C, , T] = xo(w), $ = D(
    (K, ee) => {
      v(ee.id);
    },
    [v]
  ), A = D(() => {
    f > Dm ? l(!0) : d(!0);
  }, [f]), E = D(() => {
    d(!0), l(!1);
  }, []), P = D(() => {
    l(!1);
  }, []), B = z(() => {
    const K = x.slice();
    return K.sort((ee, O) => {
      const R = Date.parse(ee.at), J = Date.parse(O.at);
      return R !== J ? R - J : ee.imageId.localeCompare(O.imageId);
    }), K;
  }, [x]), V = D(() => u(null), []), ae = D(
    (K) => u(K),
    []
  );
  return f === 0 ? /* @__PURE__ */ e(zm, {}) : /* @__PURE__ */ o(
    "div",
    {
      className: "relative w-full h-full flex flex-col",
      "data-testid": "lineage-graph",
      children: [
        h && /* @__PURE__ */ e("div", { className: "p-2 flex-shrink-0", children: /* @__PURE__ */ o(
          Xe,
          {
            variant: "info",
            "data-testid": "lineage-graph-clip-banner",
            children: [
              /* @__PURE__ */ o("span", { className: "flex-1", children: [
                "Showing ",
                x.length,
                " of ",
                f,
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
            go,
            {
              nodes: b,
              edges: C,
              onNodesChange: k,
              onEdgesChange: T,
              onNodeClick: $,
              nodeTypes: jm,
              fitView: !0,
              fitViewOptions: { padding: 0.2 },
              minZoom: 0.3,
              maxZoom: 2,
              onlyRenderVisibleElements: !0,
              proOptions: { hideAttribution: !0 },
              children: [
                /* @__PURE__ */ e(bo, { gap: 16, size: 1, className: "bg-surface-inset" }),
                /* @__PURE__ */ e(yo, { showInteractive: !1, className: "bg-surface border border-border rounded" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e(
          tn,
          {
            open: c,
            onConfirm: E,
            onCancel: P,
            title: "Show all artifacts?",
            body: `Rendering all ${f} artifacts may slow down the lineage tab. Continue?`,
            confirmLabel: "Show all",
            tone: "caution"
          }
        ),
        p && /* @__PURE__ */ e(
          Vm,
          {
            navEntries: B,
            imageId: p,
            onClose: V,
            onNavigate: ae,
            getImageUrl: i
          }
        )
      ]
    }
  );
}
const Lt = /* @__PURE__ */ new Map(), Wm = 6e4;
function io(t) {
  const n = Lt.get(t);
  return n ? Date.now() - n.fetchedAt > Wm ? (Lt.delete(t), null) : n.entries : null;
}
function Jm(t, n) {
  Lt.set(t, { entries: n, fetchedAt: Date.now() });
}
function Bh() {
  Lt.clear();
}
function Uh(t, n) {
  const [r, a] = S(() => t ? io(t) ?? [] : []), [i, s] = S(!1), [d, c] = S(null), l = se(0), p = D(() => {
    if (!t || !n) return;
    const f = io(t);
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
        const N = `image-lineage: ${g.status} ${g.statusText}`;
        c(N), s(!1);
        return;
      }
      const m = await g.json();
      if (h !== l.current) return;
      const v = Array.isArray(m.entries) ? m.entries : [];
      Jm(t, v), a(v), s(!1);
    }).catch((g) => {
      h === l.current && (c(g instanceof Error ? g.message : String(g)), s(!1));
    });
  }, [t, n]), u = D(() => {
    t && Lt.delete(t), p();
  }, [t, p]);
  return te(() => {
    p();
  }, [p]), { entries: r, loading: i, error: d, refetch: u };
}
export {
  Wa as ActionNode,
  Uc as AdjustBwConfig,
  yi as AdjustBwNode,
  Zc as AdjustLayerConfig,
  Ni as AdjustLayerNode,
  ai as AgUiOutputNode,
  Qa as AgentNode,
  Eh as AggregateSummaryCard,
  Ch as AllRunsPage,
  Xa as ApprovalNode,
  fe as BaseNode,
  Ud as CaptionPanel,
  qa as ConditionNode,
  Tm as CriteriaPanel,
  _c as CropConfig,
  bi as CropNode,
  Ld as EditPromptConfig,
  Di as EditPromptNode,
  Jd as EditRecommendationsPanel,
  Vh as EventStreamProvider,
  Ja as ForkNode,
  yc as FormatConvertConfig,
  hi as FormatConvertNode,
  Td as GenerateConfig,
  Pi as GenerateNode,
  ti as GraphQueryNode,
  ri as GuardrailNode,
  Lh as ImageLineageGraph,
  $h as ImageSourceConfig,
  ii as ImageSourceNode,
  jd as ImageWithBBoxOverlay,
  Ga as JoinNode,
  Ph as JudgmentApiProvider,
  Mh as JudgmentResultViewer,
  Dh as JudgmentTrendChart,
  ei as KnowledgeBaseNode,
  Ua as LLMNode,
  Za as McpToolNode,
  ni as MemoryNode,
  Qi as NodePalette,
  Vd as ObjectsPanel,
  Wi as PALETTE_ITEMS,
  Sh as PendingApprovalsPage,
  qd as PeoplePanel,
  ms as PipelineCanvas,
  Go as PipelineEditorContext,
  bh as PipelineEditorPage,
  uo as PipelineEditorProvider,
  zh as PipelineEditorServicesProvider,
  wh as PipelineRunComparePage,
  kh as PipelineRunDiff,
  Nh as PipelineRunReplayPage,
  vh as PipelineRunsPage,
  ia as PipelineRunsProvider,
  Ih as PipelineStatsPage,
  yh as PipelinesPage,
  oi as PolicyNode,
  sc as ResizeConfig,
  di as ResizeNode,
  Th as SaveConfig,
  si as SaveNode,
  rc as ScatterConfig,
  ci as ScatterNode,
  wc as SharpenConfig,
  fi as SharpenNode,
  Wd as TagsPanel,
  hc as TransformGeoConfig,
  ui as TransformGeoNode,
  ja as TransformNode,
  _a as TriggerNode,
  Ed as VariationConfig,
  Mi as VariationNode,
  $m as VerdictPanel,
  pd as VisionClassifyConfig,
  Si as VisionClassifyNode,
  id as VisionConfig,
  xd as VisionDescribeConfig,
  $i as VisionDescribeNode,
  Sd as VisionExtractTextConfig,
  Ai as VisionExtractTextNode,
  Ii as VisionNode,
  Hd as VisionResultViewer,
  Ah as VisionRunCard,
  Nd as VisionTagConfig,
  Ti as VisionTagNode,
  Sc as WatermarkConfig,
  xi as WatermarkNode,
  Bh as clearImageLineageCache,
  zd as imageOverlayPropsFrom,
  Oi as nodeTypes,
  gh as recordRecentType,
  Me as useEventStream,
  ka as useEventStreamContext,
  Uh as useImageLineage,
  Te as useImageUrl,
  _h as useJudgmentAggregates,
  jo as useJudgmentApi,
  Oh as useJudgmentResults,
  me as useLatestStepForNode,
  Le as usePipelineEditor,
  co as usePipelineEditorServices,
  xt as usePipelineRuns,
  $e as useRetryFromStep,
  Rh as useVisionResults
};
