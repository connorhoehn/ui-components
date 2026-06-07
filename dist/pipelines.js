import { jsxs as o, jsx as e, Fragment as K } from "react/jsx-runtime";
import Zr, { useState as $, useRef as ae, useMemo as V, useEffect as Z, memo as Mo, useCallback as E, useContext as eo, createContext as Do } from "react";
import { useNavigate as Ee, useParams as mt, Navigate as ht, useSearchParams as en } from "react-router";
import { t as he, v as Se, p as Ae, w as Ye, u as ft, h as Eo, f as _o, e as Wn, o as Oo, x as Lo, J as nn, m as to, a as tt, y as no, z as En, A as Cn, B as ro, C as Bo, D as Fo, E as Uo, b as jo, F as nt, G as zo, H as qo, K as rt, L as Hn, M as Vo, i as Wo, n as oo, N as Yt, O as Ho, k as Jn, P as Jo, Q as Go, r as Ko, R as Xt, l as Gn, S as Yo, j as Xo, I as Qt } from "./PipelineEditorServicesContext-D943p7tZ.js";
import { g as lh, q as ch } from "./PipelineEditorServicesContext-D943p7tZ.js";
import { Handle as L, Position as B, useNodeConnections as Qo, getSmoothStepPath as Zo, EdgeLabelRenderer as ea, ReactFlowProvider as ta, useReactFlow as na, useNodesState as ao, useEdgesState as io, ReactFlow as so, Background as lo, BackgroundVariant as ra, Controls as co, MiniMap as oa } from "@xyflow/react";
/* empty css               */
import { c as I } from "./cn-B6yFEsav.js";
import { u as _n, a as tn } from "./ToastProvider-aHBNxMTO.js";
import "clsx";
import "tailwind-merge";
import { u as aa, F as ia, I as sa, C as On, T as la, S as Ln, a as ca } from "./FilterChip-DOtfeDVu.js";
import { M as We } from "./Modal-2jg4229_.js";
import "react-dom";
import "./WebSocketContext-DPGFyPeZ.js";
import { a as Pe, u as da } from "./EventStreamContext-CjzSHXy-.js";
import { E as ph } from "./EventStreamContext-CjzSHXy-.js";
import { B as je } from "./Button-Qsbxqsl9.js";
import { I as Tt } from "./IconButton-Da1kJ5WO.js";
import { u as Bn } from "./IdentityContext-CLalsm_M.js";
import { C as le } from "./Chip-CAS9vOWq.js";
import { E as Le } from "./EmptyState-PM9wTjxk.js";
import { B as lt } from "./Banner-DKb3JiLs.js";
import { C as In } from "./ConfirmDialog-CNoxvYGu.js";
import { B as pa, L as Bt } from "./Chart-ByoxeiYX.js";
import { S as rn } from "./SkeletonCard-C89GWQ3p.js";
const ua = "";
function Kn(t, r) {
  const n = t.displayName;
  return typeof n == "string" && n.length > 0 ? n : r.slice(0, 8);
}
function ma({ value: t, onChange: r, placeholder: n, maxSelect: a }) {
  const { presenceUsers: i } = aa(), { idToken: s } = Bn(), [d, c] = $(""), [l, p] = $(!1), [u, x] = $(0), [h, f] = $([]), g = ae(null), m = ae(null), v = V(() => {
    const S = new Set(t), A = [];
    for (const M of i)
      S.has(M.clientId) || (S.add(M.clientId), A.push({
        userId: M.clientId,
        displayName: Kn(M.metadata, M.clientId)
      }));
    return A;
  }, [i, t]);
  Z(() => {
    const S = d.trim();
    if (!S || !s) {
      f([]);
      return;
    }
    const A = new AbortController(), M = setTimeout(() => {
      const P = `${ua}/api/profiles?q=${encodeURIComponent(S)}&limit=20`;
      fetch(P, {
        headers: { Authorization: `Bearer ${s}` },
        signal: A.signal
      }).then((U) => U.ok ? U.json() : Promise.reject(new Error(`HTTP ${U.status}`))).then((U) => {
        f(Array.isArray(U.profiles) ? U.profiles : []);
      }).catch(() => {
      });
    }, 250);
    return () => {
      clearTimeout(M), A.abort();
    };
  }, [d, s]);
  const N = V(() => {
    const S = new Set(t), A = [];
    for (const M of v)
      S.has(M.userId) || (S.add(M.userId), A.push(M));
    for (const M of h)
      S.has(M.userId) || (S.add(M.userId), A.push({
        userId: M.userId,
        displayName: M.displayName || M.userId.slice(0, 8)
      }));
    return A;
  }, [v, h, t]), y = V(() => {
    const S = d.trim().toLowerCase();
    return S ? N.filter(
      (A) => A.displayName.toLowerCase().includes(S) || A.userId.toLowerCase().includes(S)
    ) : N;
  }, [N, d]), k = typeof a == "number" && t.length >= a, b = (S) => {
    const A = S.trim();
    A && (t.includes(A) || k || (r([...t, A]), c(""), x(0)));
  }, w = (S) => {
    r(t.filter((A) => A !== S));
  }, C = (S) => {
    if (S.key === "ArrowDown")
      S.preventDefault(), p(!0), x((A) => Math.min(A + 1, Math.max(y.length - 1, 0)));
    else if (S.key === "ArrowUp")
      S.preventDefault(), x((A) => Math.max(A - 1, 0));
    else if (S.key === "Enter") {
      S.preventDefault();
      const A = y[u];
      A ? b(A.userId) : d.trim() && b(d.trim());
    } else S.key === "Escape" ? p(!1) : S.key === "Backspace" && !d && t.length > 0 && w(t[t.length - 1]);
  }, R = (S) => {
    const A = i.find((P) => P.clientId === S);
    if (A) return Kn(A.metadata, S);
    const M = h.find((P) => P.userId === S);
    return M && M.displayName ? M.displayName : S;
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5 font-[inherit]", children: [
    t.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: t.map((S) => /* @__PURE__ */ o(
      "span",
      {
        className: "inline-flex items-center gap-1 bg-[#eef2ff] border border-[#c7d2fe] text-[#3730a3] rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
        children: [
          R(S),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => w(S),
              "aria-label": `Remove ${R(S)}`,
              className: "bg-transparent border-none text-[#3730a3] cursor-pointer text-[14px] leading-none px-0.5 py-0",
              children: "×"
            }
          )
        ]
      },
      S
    )) }),
    /* @__PURE__ */ o("div", { className: "relative", children: [
      /* @__PURE__ */ e(
        "input",
        {
          ref: g,
          type: "text",
          value: d,
          disabled: k,
          placeholder: k ? `Max ${a} selected` : n ?? "Search users…",
          onChange: (S) => {
            c(S.target.value), p(!0), x(0);
          },
          onFocus: () => p(!0),
          onBlur: () => {
            m.current = setTimeout(() => p(!1), 120);
          },
          onKeyDown: C,
          className: "w-full py-1.5 px-2.5 text-[13px] border border-[#e2e8f0] rounded-md font-[inherit] box-border outline-none"
        }
      ),
      l && !k && y.length > 0 && /* @__PURE__ */ e(
        "div",
        {
          className: "absolute top-full left-0 right-0 bg-white border border-[#e2e8f0] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
          onMouseDown: (S) => {
            S.preventDefault(), m.current && clearTimeout(m.current);
          },
          children: y.map((S, A) => /* @__PURE__ */ o(
            "div",
            {
              className: I(
                "py-1.5 px-2.5 text-[13px] text-[#374151] cursor-pointer",
                A === u ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              onMouseEnter: () => x(A),
              onClick: () => {
                b(S.userId), g.current?.focus();
              },
              children: [
                /* @__PURE__ */ e("span", { className: "font-medium", children: S.displayName }),
                S.displayName !== S.userId && /* @__PURE__ */ e("span", { className: "text-[#94a3b8] ml-2 text-[11px] font-mono", children: S.userId.slice(0, 12) })
              ]
            },
            S.userId
          ))
        }
      )
    ] })
  ] });
}
const ha = {
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
}, fa = {
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
function Sn(t, r, n, a) {
  return !(!xa(t, r) || !ga(n, a));
}
function xa(t, r) {
  const n = ha[t];
  return n === "fork" ? ba(r) : n.includes(r);
}
function ga(t, r) {
  const n = fa[t];
  return n === null ? !1 : n === "join" ? ya(r) : n.includes(r);
}
function ba(t) {
  return /^branch-(\d+)$/.exec(t) !== null;
}
function ya(t) {
  return /^in-(\d+)$/.exec(t) !== null;
}
const va = {
  idle: { card: "border border-[#d1d5db] bg-white", dot: "bg-[#d1d5db]" },
  pending: { card: "border border-dashed border-[#93c5fd] bg-[#eff6ff]", dot: "bg-[#93c5fd]" },
  running: { card: "border-2 border-[#2563eb] bg-[#eff6ff]", dot: "bg-[#2563eb]" },
  awaiting: { card: "border-2 border-[#f59e0b] bg-[#fffbeb]", dot: "bg-[#f59e0b]" },
  completed: { card: "border border-[#16a34a] bg-[#f0fdf4]", dot: "bg-[#16a34a]" },
  failed: { card: "border-2 border-[#dc2626] bg-[#fef2f2]", dot: "bg-[#dc2626]" },
  skipped: { card: "border border-dashed border-[#d1d5db] bg-[#f9fafb] opacity-50", dot: "bg-[#d1d5db]" }
};
function fe(t) {
  const { icon: r, subtitle: n, state: a, body: i, footer: s, selected: d, onRetry: c, hasBreakpoint: l, pausedAtBreakpoint: p, ariaLabel: u, children: x } = t, h = va[a], f = _n(), [g, m] = $(!1), v = a === "failed" && typeof c == "function", N = (C) => {
    C.preventDefault(), C.stopPropagation(), c?.();
  }, y = !f && a === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !f && a === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", k = !!(i || s || v), b = !!(i || s), w = n ? `${n}, state: ${a}` : `Node, state: ${a}`;
  return /* @__PURE__ */ o(
    "div",
    {
      className: I(
        "w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        p ? "border-2 border-[#d97706] bg-[#fffbeb] shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]" : h.card,
        !p && d && "shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]",
        !p && !d && "shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
        f && "transition-none"
      ),
      role: "button",
      tabIndex: 0,
      "aria-label": u ?? w,
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
          k && "border-b border-border"
        ), children: [
          /* @__PURE__ */ e("span", { className: "text-sm leading-none shrink-0", "aria-hidden": "true", children: r }),
          /* @__PURE__ */ e("span", { className: "flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap", children: n }),
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
              f && "transition-none"
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
        x
      ]
    }
  );
}
function Yn(t) {
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
function Na(t) {
  return t.triggerType === "schedule" ? t.schedule ? `cron: ${t.schedule}` : "No schedule set" : t.triggerType === "webhook" ? t.webhookPath ? `POST ${t.webhookPath}` : "No path set" : t.triggerType.startsWith("document.") ? t.documentTypeId ? `Doc type: ${t.documentTypeId}` : "Any document" : "Fires on user click";
}
function wa(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Se(), p = c === "failed" ? () => l(r) : void 0, u = `Trigger node, ${Yn(n)}, state: ${c}`;
  return /* @__PURE__ */ e(
    fe,
    {
      icon: "▶",
      subtitle: Yn(n),
      state: c,
      body: /* @__PURE__ */ e("span", { className: "italic", children: Na(n) }),
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
          className: "!bg-slate-300 !w-2.5 !h-2.5"
        }
      )
    }
  );
}
function ka(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const n = t.split(`
`).slice(0, 2).join(" ").trim();
  return n.length > 120 ? `${n.slice(0, 117)}…` : n;
}
function Ca({ info: t }) {
  const [r, n] = $(!1), a = r ? t.response : t.response.length > 60 ? `${t.response.slice(0, 60)}…` : t.response, i = t.tokensIn != null || t.tokensOut != null;
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
function Ia(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = i?.llm, p = c === "running" && l?.streamOpened === !0 && (l?.tokensOut ?? 0) === 0, u = c === "running" && l !== void 0 && (l.tokensOut ?? 0) > 0, x = Se(), h = c === "failed" ? () => x(r) : void 0, f = /* @__PURE__ */ e("span", { className: "italic", children: ka(n.userPromptTemplate) }), m = (l ? {
    response: l.response ?? "",
    tokensIn: l.tokensIn,
    tokensOut: l.tokensOut,
    streaming: u,
    streamOpening: p
  } : void 0) ?? n._llmResponse, v = m ? /* @__PURE__ */ e(Ca, { info: m }) : void 0, N = (n.systemPrompt ?? "").replace(/\s+/g, " ").trim(), y = N.length === 0 ? "no system prompt" : `system prompt: ${N.length > 60 ? `${N.slice(0, 60)}…` : N}`, k = `LLM node, ${n.model || n.provider}, ${y}, state: ${c}`;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🧠",
      subtitle: n.model || n.provider,
      state: c,
      body: f,
      footer: v,
      selected: a,
      onRetry: h,
      ariaLabel: k,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Sa(t) {
  if (!t) return "—";
  const r = t.replace(/\s+/g, " ").trim();
  return r.length > 60 ? `${r.slice(0, 60)}…` : r;
}
function $a(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Se(), p = c === "failed" ? () => l(r) : void 0;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "✨",
      subtitle: n.transformType,
      state: c,
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Sa(n.expression) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5" })
      ]
    }
  );
}
function Ta(t) {
  if (!t) return "—";
  const r = t.replace(/\s+/g, " ").trim();
  return r.length > 60 ? `${r.slice(0, 60)}…` : r;
}
function Aa(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Se(), p = c === "failed" ? () => l(r) : void 0;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "❓",
      subtitle: n.label || "condition",
      state: c,
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Ta(n.expression) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "true", className: "!bg-green-600 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "false", className: "!bg-amber-500 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Ra(t) {
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
function Pa(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Se(), p = c === "failed" ? () => l(r) : void 0;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⚡",
      subtitle: n.actionType,
      state: c,
      body: /* @__PURE__ */ e("span", { className: "italic", children: Ra(n) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Ma(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Se(), p = c === "failed" ? () => l(r) : void 0, u = Math.max(2, Math.min(8, n.branchCount ?? 2)), x = Array.from({ length: u }, (h, f) => {
    const g = n.branchLabels?.[f];
    return g && g.trim().length > 0 ? g : `branch ${f}`;
  });
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⑂",
      subtitle: `${u} branches`,
      state: c,
      body: /* @__PURE__ */ e("ul", { className: "m-0 p-0 list-none flex flex-col gap-0.5 text-xs text-text-secondary", children: x.map((h, f) => /* @__PURE__ */ o("li", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: [
        "• ",
        h
      ] }, f)) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        x.map((h, f) => {
          const g = (f + 1) / (u + 1) * 100;
          return /* @__PURE__ */ e(
            L,
            {
              type: "source",
              position: B.Right,
              id: `branch-${f}`,
              className: "!bg-blue-600 !w-2.5 !h-2.5",
              style: { top: `${g}%` }
            },
            f
          );
        })
      ]
    }
  );
}
function Da(t) {
  return t.mode === "all" ? "all" : t.mode === "any" ? "any" : `${t.n ?? 1} of many`;
}
function Ea(t) {
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
function _a(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Se(), p = c === "failed" ? () => l(r) : void 0, u = Qo({ handleType: "target" }), x = Math.max(2, u.length + 1);
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⑃",
      subtitle: Da(n),
      state: c,
      body: /* @__PURE__ */ e("span", { className: "italic", children: Ea(n.mergeStrategy) }),
      selected: a,
      onRetry: p,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        Array.from({ length: x }, (h, f) => {
          const g = (f + 1) / (x + 1) * 100;
          return /* @__PURE__ */ e(
            L,
            {
              type: "target",
              position: B.Left,
              id: `in-${f}`,
              className: "!bg-slate-300 !w-2.5 !h-2.5",
              style: { top: `${g}%` }
            },
            `in-${f}`
          );
        }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5" })
      ]
    }
  );
}
function Oa(t) {
  return t.type === "role" ? `@${t.value}` : t.value;
}
function La(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Se(), p = c === "failed" ? () => l(r) : void 0, u = n.approvers ?? [], x = u.length, h = n.requiredCount ?? 0, f = `${x} approver${x === 1 ? "" : "s"}, ${h}/${x} required`, g = u.slice(0, 2), m = Math.max(0, u.length - 2), v = u.length === 0 ? /* @__PURE__ */ e("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: [
    g.map((N, y) => /* @__PURE__ */ e(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: Oa(N)
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
      subtitle: f,
      state: c,
      body: v,
      selected: a,
      onRetry: p,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "approved", className: "!bg-green-600 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "rejected", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Ba({ id: t, data: r, selected: n }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = Se(), c = r.agentName || r.agentId || "Not configured", l = `${r.protocol.toUpperCase()}${r.streaming ? " (streaming)" : ""}`;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🤖",
      subtitle: c,
      state: s,
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: n,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Fa({ id: t, data: r, selected: n }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = Se(), c = r.toolName || "Not configured";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🔌",
      subtitle: c,
      state: s,
      body: r.gatewayUrl ? /* @__PURE__ */ e("span", { className: "text-[11px]", children: r.gatewayUrl }) : void 0,
      selected: n,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Ua({ id: t, data: r, selected: n }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = Se(), c = r.knowledgeBaseId || "Not configured", l = `Top ${r.topK} chunks${r.scoreThreshold ? ` (≥${r.scoreThreshold})` : ""}`;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "📚",
      subtitle: c,
      state: s,
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: n,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function ja({ id: t, data: r, selected: n }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = Se(), c = r.graphId || "Not configured", l = r.query.length > 40 ? `${r.query.slice(0, 37)}...` : r.query;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🕸️",
      subtitle: c,
      state: s,
      body: /* @__PURE__ */ e("span", { className: "text-[11px] font-mono", children: l }),
      selected: n,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function za({ id: t, data: r, selected: n }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = Se(), c = `${r.mode} ${r.scope}`, l = r.namespace ? `ns: ${r.namespace}` : "No namespace";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "💾",
      subtitle: c,
      state: s,
      body: /* @__PURE__ */ e("span", { className: "text-[11px]", children: l }),
      selected: n,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function qa({ id: t, data: r, selected: n }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = Se(), c = r.label || r.guardrailId || "Not configured";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🛡️",
      subtitle: c,
      state: s,
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        "Action: ",
        r.action
      ] }),
      selected: n,
      onRetry: s === "failed" && a ? () => d(t) : void 0,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "pass", className: "!top-[40%] !bg-green-600" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "block", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Va({ id: t, data: r, selected: n }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = Se(), c = r.label || r.action || "Not configured";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "📜",
      subtitle: c,
      state: s,
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
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "allow", className: "!top-[40%] !bg-green-600" }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "deny", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Wa({ id: t, data: r, selected: n }) {
  const a = he(t), i = a?.status === "cancelled" ? "failed" : a?.status, s = r._state ?? i ?? "idle", d = r.eventType === "CUSTOM" ? r.customEventName || "Custom" : r.eventType;
  return /* @__PURE__ */ e(
    fe,
    {
      icon: "📡",
      subtitle: d,
      state: s,
      body: /* @__PURE__ */ o("span", { className: "text-[11px]", children: [
        "Source: ",
        r.sourceField
      ] }),
      footer: /* @__PURE__ */ e("span", { className: "text-[10px] text-[#6366f1]", children: "Terminal — streams to AG-UI frontend" }),
      selected: n,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in" })
    }
  );
}
function Ha(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Ae(), p = n.imageId, u = p ? (
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
  ), x = p ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-[#6b7280]", children: [
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
      footer: x,
      selected: a,
      ariaLabel: `Image Source node, state: ${c}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: /* @__PURE__ */ e(
        L,
        {
          type: "source",
          position: B.Right,
          id: "out",
          className: "!w-2.5 !h-2.5 !bg-[#6b7280]"
        }
      )
    }
  );
}
function Ja(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Ae(), p = i?.images?.[0] ?? null, x = i?.output?.filename ?? null, h = p ? /* @__PURE__ */ o("div", { children: [
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
    x && /* @__PURE__ */ e(
      "div",
      {
        className: "mt-1 text-[10px] font-mono text-[#6b7280] overflow-hidden text-ellipsis whitespace-nowrap",
        "data-testid": "save-filename-badge",
        title: x,
        children: x
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
  ), f = n.filenameTemplate ?? "crop-{{scatter.index}}.png", g = f.length > 28 ? `${f.slice(0, 25)}…` : f, m = /* @__PURE__ */ e(
    "span",
    {
      className: "font-mono text-[11px] text-[#6b7280]",
      "data-testid": "save-footer",
      title: f,
      children: g
    }
  ), v = "image:save", N = `Save node, template: ${f}, state: ${c}`;
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
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(
          L,
          {
            type: "target",
            position: B.Left,
            id: "in",
            className: "!w-2.5 !h-2.5 !bg-[#6b7280]"
          }
        ),
        /* @__PURE__ */ e(
          L,
          {
            type: "source",
            position: B.Right,
            id: "out",
            className: "!w-2.5 !h-2.5 !bg-[#6b7280]"
          }
        ),
        /* @__PURE__ */ e(
          L,
          {
            type: "source",
            position: B.Right,
            id: "error",
            className: "!w-2.5 !h-2.5 !bg-[#6b7280] !top-[75%]"
          }
        )
      ]
    }
  );
}
function Ga(t) {
  return t ? t.length > 40 ? `${t.slice(0, 37)}…` : t : "Not configured";
}
function Ka(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = i?.output, p = Array.isArray(l?.items) ? l.items.length : null, u = /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary break-all", children: Ga(n.itemsPath ?? "") }),
    p !== null && /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", children: [
      p,
      " item",
      p === 1 ? "" : "s",
      " resolved"
    ] })
  ] }), x = p, h = x !== null && c !== "idle" ? /* @__PURE__ */ o("span", { className: "inline-block text-[11px] font-semibold text-blue-600 bg-blue-50 border border-blue-600 rounded-full px-2 py-0.5", children: [
    "Dispatched ",
    x,
    " arm",
    x === 1 ? "" : "s"
  ] }) : void 0, f = n.itemAlias ? ` · alias: ${n.itemAlias}` : "", g = n.maxConcurrency ? ` · max ${n.maxConcurrency}` : "", m = `scatter${f}${g}`, v = `Scatter node, path: ${n.itemsPath ?? "not set"}, state: ${c}`, N = "bg-border-emphasis w-2.5 h-2.5";
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
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: N }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: N })
      ]
    }
  );
}
function Ya(t) {
  const { id: r, data: n, selected: a } = t, i = Ae(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.width != null && n.height != null ? `→ ${n.width}×${n.height}` : n.width != null ? `→ ${n.width}w` : n.height != null ? `→ ${n.height}h` : null, x = p ? /* @__PURE__ */ e(
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
  ] }) : void 0, f = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⥂",
      subtitle: "image:resize",
      state: l,
      body: x,
      footer: h,
      selected: a,
      ariaLabel: `Resize node, state: ${l}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: f }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: f }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: f, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Xa(t) {
  switch (t.op) {
    case "rotate":
      return `rotate ${t.degrees}°`;
    case "flip":
      return "flip ↕";
    case "flop":
      return "flop ↔";
  }
}
function Qa(t) {
  const { id: r, data: n, selected: a } = t, i = Ae(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.operations ?? [], x = u.length > 0 ? u.map(Xa).join("  ›  ") : null, h = p ? /* @__PURE__ */ e(
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
      children: x ?? "No ops configured"
    }
  ), f = x ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-tertiary", children: x }) : void 0, g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "↻",
      subtitle: "image:transform",
      state: l,
      body: h,
      footer: f,
      selected: a,
      ariaLabel: `Transform node, ops: ${u.length}, state: ${l}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function Za(t) {
  const r = t.format?.toUpperCase() ?? "?", n = t.lossless ? "lossless" : t.quality != null ? `q${t.quality}` : "";
  return n ? `${r} ${n}` : r;
}
function ei(t) {
  const { id: r, data: n, selected: a } = t, i = Ae(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.format ? Za(n) : null, x = p ? /* @__PURE__ */ e(
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
  ), h = u ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary", children: u }) : void 0, f = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⇌",
      subtitle: "image:format-convert",
      state: l,
      body: x,
      footer: h,
      selected: a,
      ariaLabel: `Format Convert node, format: ${n.format ?? "unset"}, state: ${l}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: f }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: f }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: f, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function ti(t) {
  const { id: r, data: n, selected: a } = t, i = Ae(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.sigma != null ? `σ ${n.sigma}` : null, x = p ? /* @__PURE__ */ e(
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
  ), h = u ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] bg-surface-inset border border-border rounded px-1.5 py-0.5 text-text-secondary", children: u }) : void 0, f = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "◈",
      subtitle: "image:sharpen",
      state: l,
      body: x,
      footer: h,
      selected: a,
      ariaLabel: `Sharpen node, sigma: ${n.sigma ?? "default"}, state: ${l}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: f }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: f }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: f, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function ni(t) {
  const { id: r, data: n, selected: a } = t, i = Ae(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.gravity ?? "southeast", x = n.opacity != null ? `${Math.round(n.opacity * 100)}%` : "100%", h = p ? /* @__PURE__ */ e(
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
      children: n.overlayImageId ? `${u} · ${x}` : "No overlay image set"
    }
  ), f = n.overlayImageId ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    u,
    " · ",
    x
  ] }) : void 0, g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⊕",
      subtitle: "image:watermark",
      state: l,
      body: h,
      footer: f,
      selected: a,
      ariaLabel: `Watermark node, gravity: ${u}, state: ${l}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function ri(t) {
  if (!t) return null;
  const r = t.x + t.width, n = t.y + t.height;
  return `[${t.x},${t.y} → ${r},${n}]`;
}
function oi(t) {
  const { id: r, data: n, selected: a } = t, i = Ae(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = s?.output, x = ri(p?.bbox ?? u?.bbox), h = p ? /* @__PURE__ */ e(
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
  ), f = x ? /* @__PURE__ */ e(
    "span",
    {
      className: "font-mono text-[11px] text-text-tertiary",
      "data-testid": "crop-bbox-coords",
      children: x
    }
  ) : void 0, g = `Crop node, source: ${n.sourceImagePath ?? "default"}, state: ${l}`, m = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "✂",
      subtitle: "image:crop",
      state: l,
      body: h,
      footer: f,
      selected: a,
      ariaLabel: g,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: m }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: m })
      ]
    }
  );
}
function ai(t) {
  const { id: r, data: n, selected: a } = t, i = Ae(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e("div", { className: "flex gap-1 w-full", children: /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
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
  ), x = n.algorithm ?? "luminosity", h = n.contrast ?? 1, f = /* @__PURE__ */ o(
    "span",
    {
      className: "font-mono text-[11px] text-text-tertiary",
      "data-testid": "adjust-bw-footer",
      children: [
        x,
        " · contrast ",
        h
      ]
    }
  ), g = `Adjust B/W node, algorithm: ${x}, state: ${l}`, m = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "◐",
      subtitle: "image:adjust-bw",
      state: l,
      body: u,
      footer: f,
      selected: a,
      ariaLabel: g,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: m }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: m }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: m, style: { top: "75%" } })
      ]
    }
  );
}
function ii(t) {
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
function si(t) {
  const { id: r, data: n, selected: a } = t, i = Ae(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.layers ?? [], x = p ? /* @__PURE__ */ e(
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
          children: ii(m)
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
  ), f = `Adjust Layer node, ${u.length} layer${u.length === 1 ? "" : "s"}, state: ${l}`, g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "𝍩",
      subtitle: "image:adjust-layer",
      state: l,
      body: x,
      footer: h,
      selected: a,
      ariaLabel: f,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: g, style: { top: "75%" } })
      ]
    }
  );
}
function li(t) {
  return t === 0 ? "$0" : t < 1e-3 ? "<$0.001" : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function ci(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const n = t.split(`
`).slice(0, 2).join(" ").trim();
  return n.length > 120 ? `${n.slice(0, 117)}…` : n;
}
const di = Mo(function({ info: r }) {
  const [n, a] = $(!1);
  if (r.failure) {
    const l = r.failure.reason === "refusal";
    return /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("output", { "aria-live": "polite", className: "sr-only", children: l ? "Content policy refusal" : `Failure: ${r.failure.reason}` }),
      /* @__PURE__ */ o("div", { className: "flex items-start gap-1", children: [
        /* @__PURE__ */ e("span", { className: "bg-transparent border-none p-0 text-[12px] text-red-600 font-medium text-left", children: l ? "✕ Content policy refusal" : `✕ ${r.failure.reason}` }),
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
  const i = r.tokensIn != null || r.tokensOut != null, s = !r.streaming && !r.awaiting && r.response.length > 0, d = n ? r.response : r.response.length > 60 ? `${r.response.slice(0, 60)}…` : r.response, c = r.awaiting ? "Vision: waiting for first token" : r.streaming ? "Vision: streaming response" : s ? "Vision: completed" : "";
  return /* @__PURE__ */ o("div", { children: [
    /* @__PURE__ */ e("output", { "aria-live": "polite", className: "sr-only", children: c }),
    /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => a((l) => !l),
        className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] text-text-secondary font-medium text-left",
        children: [
          n ? "▾" : "▸",
          " ",
          r.streaming ? "Streaming" : "Response",
          typeof r.costUsd == "number" && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", "data-testid": "vision-cost", title: "Cost based on model usage rate", children: [
            "· ",
            li(r.costUsd)
          ] }),
          i && /* @__PURE__ */ o("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: [
            "· ",
            r.tokensIn ?? 0,
            " → ",
            r.tokensOut ?? 0,
            " tokens"
          ] }),
          r.awaiting && /* @__PURE__ */ e("span", { className: "ml-1.5 text-[11px] text-blue-600", "data-testid": "vision-awaiting", children: "· waiting…" }),
          r.streaming && !r.awaiting && /* @__PURE__ */ e("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: "· streaming…" })
        ]
      }
    ),
    s && r.imageId && /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: () => window.dispatchEvent(new CustomEvent("pipeline:open-run-modal")),
        className: "mt-1 block bg-transparent border-none p-0 cursor-pointer text-[11px] text-primary underline font-inherit",
        children: "Run with new image →"
      }
    ),
    r.imageId && /* @__PURE__ */ e(
      "img",
      {
        src: r.getImageUrl(r.imageId),
        alt: "Vision input",
        className: "mt-1.5 object-cover rounded border border-border bg-surface-inset cursor-zoom-in block",
        style: { width: n ? 160 : 56, height: n ? 120 : 56 },
        "data-testid": "vision-input-thumb"
      }
    ),
    /* @__PURE__ */ e(
      "div",
      {
        className: "mt-1 font-mono text-[11px] leading-snug text-text-primary whitespace-pre-wrap break-words",
        style: { maxHeight: n ? "none" : "1.4em", overflow: "hidden" },
        children: d
      }
    )
  ] });
});
function pi(t) {
  const { id: r, data: n, selected: a } = t, i = Ae(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = Se(), u = l === "failed" ? () => p(r) : void 0, x = /* @__PURE__ */ e("span", { className: "italic text-text-secondary text-[13px]", children: ci(n.userPrompt) }), h = s?.vision, f = l === "running" && h !== void 0 && h.tokensSeen > 0 && !h.analyzed, g = l === "running" && h !== void 0 && h.tokensSeen === 0 && !h.failure, m = h ? {
    response: h.response,
    tokensIn: h.tokensIn,
    tokensOut: h.tokensOut,
    streaming: f,
    awaiting: g,
    ...h.failure ? { failure: h.failure } : {},
    ...h.imageId ? { imageId: h.imageId } : {},
    ...typeof h.costUsd == "number" ? { costUsd: h.costUsd } : {},
    ...u ? { onRetry: u } : {},
    getImageUrl: i
  } : void 0, v = m ? /* @__PURE__ */ e(di, { info: m }) : void 0, N = n.model || "claude-sonnet-4-6", y = n.outputSchema ? "extract" : "caption", k = `Vision node, model ${N}, mode ${y}, state: ${l}`, b = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "📷",
      subtitle: `${N} · ${y}`,
      state: l,
      body: x,
      footer: v,
      selected: a,
      onRetry: u,
      ariaLabel: k,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: b }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: b })
      ]
    }
  );
}
function ui(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = i?.output, p = l?.extracted?.label, u = l?.extracted?.confidence, x = (n.labels ?? []).slice(0, 4).join(", "), h = p ? /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 py-0.5", children: [
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
  ] }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: x ? `Labels: ${x}` : "No labels configured" }), f = n.model ?? "claude-haiku-4-5", g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🏷",
      subtitle: f,
      state: c,
      body: h,
      selected: a,
      ariaLabel: `Vision Classify node, model: ${f}, state: ${c}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function mi(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", p = i?.output?.extracted?.caption, u = p ? p.length > 80 ? `${p.slice(0, 77)}…` : p : null, x = n.userPrompt ? n.userPrompt.length > 60 ? `${n.userPrompt.slice(0, 57)}…` : n.userPrompt : "No prompt set", h = u ? /* @__PURE__ */ e(
    "span",
    {
      className: "text-[11px] text-text-primary leading-snug",
      "data-testid": "describe-caption",
      children: u
    }
  ) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: x }), f = n.model ?? "claude-haiku-4-5", g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "💬",
      subtitle: f,
      state: c,
      body: h,
      selected: a,
      ariaLabel: `Vision Describe node, model: ${f}, state: ${c}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function hi(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", u = (i?.output?.extracted?.tags ?? []).slice(0, 5), x = (n.candidateTags ?? []).slice(0, 3).join(", "), h = u.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", "data-testid": "tag-pills", children: u.map((m) => /* @__PURE__ */ e(
    "span",
    {
      className: "inline-block text-[10px] font-semibold bg-surface-inset border border-border rounded-full px-1.5 py-0.5 text-text-secondary whitespace-nowrap",
      children: m
    },
    m
  )) }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: x ? `Candidates: ${x}…` : "Open-vocabulary tagging" }), f = n.model ?? "claude-haiku-4-5", g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🔖",
      subtitle: f,
      state: c,
      body: h,
      selected: a,
      ariaLabel: `Vision Tag node, model: ${f}, state: ${c}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function fi(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", p = i?.output?.extracted?.lines ?? [], u = p[0], x = p.length > 0 ? /* @__PURE__ */ o("div", { "data-testid": "extract-text-result", children: [
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
  ] }) : /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary italic", children: "Awaiting OCR" }), h = n.model ?? "claude-sonnet-4-6", f = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "📝",
      subtitle: h,
      state: c,
      body: x,
      selected: a,
      ariaLabel: `Vision Extract Text node, model: ${h}, state: ${c}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: f }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: f }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: f, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function xi(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
function gi(t) {
  const { id: r, data: n, selected: a } = t, i = Ae(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e(
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
      children: xi(n.prompt)
    }
  ), x = (n.numImages ?? 1) > 1 ? `×${n.numImages}` : null, h = n.width && n.height ? `${n.width}×${n.height}` : null, f = x || h ? /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-tertiary", children: [h, x].filter(Boolean).join(" · ") }) : void 0, g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "✦",
      subtitle: "image:generate",
      state: l,
      body: u,
      footer: f,
      selected: a,
      ariaLabel: `Generate node, state: ${l}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function bi(t) {
  const { id: r, data: n, selected: a } = t, i = Ae(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.numVariations ?? 1, h = /* @__PURE__ */ o("div", { children: [
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
  ] }), f = n.similarity != null ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "similarity ",
    n.similarity
  ] }) : void 0, g = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⊞",
      subtitle: "image:variation",
      state: l,
      body: h,
      footer: f,
      selected: a,
      ariaLabel: `Variation node, ${u} variations, state: ${l}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: g }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: g, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
function yi(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
function vi(t) {
  const { id: r, data: n, selected: a } = t, i = Ae(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e(
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
      children: yi(n.prompt)
    }
  ), x = n.maskImagePath ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
    "mask: ",
    n.maskImagePath
  ] }) : void 0, h = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "✎",
      subtitle: "image:edit-prompt",
      state: l,
      body: u,
      footer: x,
      selected: a,
      ariaLabel: `Edit Prompt node, state: ${l}`,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: h }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: h }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "error", className: h, style: { bottom: 8, top: "auto" } })
      ]
    }
  );
}
const Ni = {
  trigger: wa,
  llm: Ia,
  transform: $a,
  condition: Aa,
  action: Pa,
  fork: Ma,
  join: _a,
  approval: La,
  agent: Ba,
  "mcp-tool": Fa,
  "knowledge-base": Ua,
  "graph-query": ja,
  memory: za,
  guardrail: qa,
  policy: Va,
  "ag-ui-output": Wa,
  "image-source": Ha,
  "image:save": Ja,
  scatter: Ka,
  "image:resize": Ya,
  "image:transform": Qa,
  "image:format-convert": ei,
  "image:sharpen": ti,
  "image:watermark": ni,
  "image:crop": oi,
  "image:adjust-bw": ai,
  "image:adjust-layer": si,
  "image:vision-analyze": pi,
  "image:vision-classify": ui,
  "image:vision-describe": mi,
  "image:vision-tag": hi,
  "image:vision-extract-text": fi,
  "image:generate": gi,
  "image:variation": bi,
  "image:edit-prompt": vi
};
function wi(t) {
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
function ki({
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
  const u = c ?? {}, x = _n(), [h] = Zo({
    sourceX: r,
    sourceY: n,
    targetX: a,
    targetY: i,
    sourcePosition: s,
    targetPosition: d
  }), f = wi(u.state), g = f.animate && !x, m = p ? "#646cff" : f.stroke, v = p ? 2.5 : f.strokeWidth;
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
        stroke: m,
        strokeWidth: v,
        strokeDasharray: g ? f.strokeDasharray : void 0,
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
    u.label ? /* @__PURE__ */ e(ea, { children: /* @__PURE__ */ e(
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
    ) }) : null
  ] });
}
function ut(t, r, n) {
  const a = ae(r);
  a.current = r, Z(() => {
    if (n === !1) return;
    const i = (s) => {
      t.current && !t.current.contains(s.target) && a.current();
    };
    return document.addEventListener("mousedown", i), () => document.removeEventListener("mousedown", i);
  }, [t, n]);
}
const Ci = [
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
function Ii(t, r) {
  if (!r) return !0;
  const n = r.toLowerCase();
  return t.type.toLowerCase().includes(n) || t.name.toLowerCase().includes(n) || t.description.toLowerCase().includes(n);
}
function Si({
  anchor: t,
  flowPosition: r,
  disabledTypes: n = [],
  onClose: a,
  onInsert: i
}) {
  const [s, d] = $(""), [c, l] = $(0), p = ae(null), u = ae(null), x = V(() => new Set(n), [n]), h = V(
    () => Ci.filter((m) => !x.has(m.type) && Ii(m, s)),
    [x, s]
  );
  if (Z(() => {
    l((m) => m >= h.length ? 0 : m);
  }, [h.length]), Z(() => {
    if (t) {
      const m = setTimeout(() => u.current?.focus(), 0);
      return () => clearTimeout(m);
    }
  }, [t]), ut(p, a, !!t), !t) return null;
  const f = (m) => {
    const v = h[m];
    !v || !r || (i(v.type, r), a());
  }, g = (m) => {
    if (m.key === "ArrowDown") {
      if (m.preventDefault(), h.length === 0) return;
      l((v) => (v + 1) % h.length);
    } else if (m.key === "ArrowUp") {
      if (m.preventDefault(), h.length === 0) return;
      l((v) => (v - 1 + h.length) % h.length);
    } else m.key === "Enter" ? (m.preventDefault(), f(c)) : m.key === "Escape" && (m.preventDefault(), a());
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
                y.preventDefault(), f(v);
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
function $i({
  addNode: t,
  addEdge: r,
  updateNodeData: n,
  getDefinition: a
}) {
  Z(() => {
  }, [t, r, n, a]);
}
function Ti({
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
  Z(() => {
    const x = u.current;
    if (!x) return;
    const h = (g) => {
      const m = x.querySelector(
        `.react-flow__node[data-id="${CSS.escape(g)}"]`
      );
      return m ? ((m.querySelector('[data-pipeline-node="true"]') ?? m).focus(), !0) : !1;
    }, f = (g) => {
      if (Un(g.target)) return;
      const m = document.activeElement, v = !!m && x.contains(m);
      if (g.key === "Tab") {
        if (!v || !t || t.nodes.length === 0) return;
        const N = Ji(t);
        if (N.length === 0) return;
        const k = m?.closest(".react-flow__node")?.getAttribute("data-id") ?? null, b = k !== null ? N.indexOf(k) : -1, w = g.shiftKey ? -1 : 1, C = b === -1 ? g.shiftKey ? N.length - 1 : 0 : (b + w + N.length) % N.length, R = N[C];
        h(R) && g.preventDefault();
        return;
      }
      if (v && !g.altKey) {
        if (g.key === "Enter" || g.key === " " || g.key === "Spacebar") {
          const y = m?.closest(".react-flow__node")?.getAttribute("data-id");
          y && (g.preventDefault(), n(y));
          return;
        }
        if (g.key === "Delete" || g.key === "Backspace") {
          if (r) {
            g.preventDefault(), a(r);
            return;
          }
          d((N) => {
            const y = N.filter((k) => k.selected);
            if (y.length === 0) return N;
            for (const k of y) i(k.id);
            return N.filter((k) => !k.selected);
          }), g.preventDefault();
          return;
        }
        if (g.key === "Escape") {
          g.preventDefault(), n(null);
          return;
        }
        if ((g.metaKey || g.ctrlKey) && g.key === "c" && r) {
          g.preventDefault(), p.current = r;
          return;
        }
        if ((g.metaKey || g.ctrlKey) && g.key === "v" && p.current) {
          g.preventDefault();
          const N = l([p.current]);
          N.length > 0 && n(N[0]);
          return;
        }
        if ((g.metaKey || g.ctrlKey) && g.key === "d" && r) {
          g.preventDefault();
          const N = l([r]);
          N.length > 0 && n(N[0]);
          return;
        }
        if (g.key === "ArrowUp" || g.key === "ArrowDown" || g.key === "ArrowLeft" || g.key === "ArrowRight") {
          if (g.preventDefault(), g.stopPropagation(), !g.shiftKey || !r) return;
          const N = 8, y = g.key === "ArrowLeft" ? -N : g.key === "ArrowRight" ? N : 0, k = g.key === "ArrowUp" ? -N : g.key === "ArrowDown" ? N : 0;
          s((b) => {
            const w = b.map(
              (R) => R.id === r ? {
                ...R,
                position: {
                  x: R.position.x + y,
                  y: R.position.y + k
                }
              } : R
            ), C = w.find((R) => R.id === r);
            return C && c([{ id: C.id, position: C.position }]), w;
          });
        }
      }
    };
    return x.addEventListener("keydown", f), () => x.removeEventListener("keydown", f);
  }, [t, r, n, a, i, s, d, c, l, p, u]);
}
function Ai({
  addNode: t,
  screenToFlowPosition: r
}) {
  const n = E((i) => {
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
function Ri({
  nodeMenu: t,
  breakpoints: r,
  showBreakpointOption: n,
  onFilterLog: a,
  onCopyNodeId: i,
  onDuplicate: s,
  onToggleBreakpoint: d,
  onDismiss: c
}) {
  Z(() => {
    const p = (x) => {
      x.target?.closest('[data-testid="canvas-node-context-menu"]') || c();
    }, u = (x) => {
      x.key === "Escape" && c();
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
], Pi = At.flatMap((t) => t.items.map((r) => ({ type: r.type, name: r.name }))), Mi = At.map((t) => t.name), Fn = "pipeline.palette.recents", Di = 5, Xn = "pipeline.palette.compact";
function $n() {
  if (typeof window > "u") return [];
  try {
    const t = window.localStorage.getItem(Fn);
    if (!t) return [];
    const r = JSON.parse(t);
    return Array.isArray(r) ? r : [];
  } catch {
    return [];
  }
}
function Ei(t) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(Fn, JSON.stringify(t));
    } catch {
    }
}
function Om(t) {
  const r = $n().filter((a) => a !== t), n = [t, ...r].slice(0, Di);
  Ei(n);
}
const po = "pipeline.palette.collapsed.";
function _i(t) {
  if (typeof window > "u") return !1;
  try {
    return window.localStorage.getItem(po + t) === "true";
  } catch {
    return !1;
  }
}
function Oi(t, r) {
  if (!(typeof window > "u"))
    try {
      window.localStorage.setItem(po + t, String(r));
    } catch {
    }
}
function Li(t, r) {
  if (!r) return !0;
  const n = r.toLowerCase();
  return t.name.toLowerCase().includes(n) || t.type.toLowerCase().includes(n) || t.description.toLowerCase().includes(n);
}
function Qn({ expanded: t }) {
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
function Bi({ disabledTypes: t = [] }) {
  const [r, n] = $(""), [a, i] = $(/* @__PURE__ */ new Set()), [s, d] = $(null), [c, l] = $(() => $n()), [p, u] = $(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem(Xn) === "true";
    } catch {
      return !1;
    }
  }), [x, h] = $(() => {
    const P = {};
    for (const U of At)
      P[U.name] = _i(U.name);
    return P;
  }), f = V(() => new Set(t), [t]);
  Z(() => {
    const P = (U) => {
      U.key === Fn && l($n());
    };
    return window.addEventListener("storage", P), () => window.removeEventListener("storage", P);
  }, []), Z(() => {
    if (!(typeof window > "u"))
      try {
        window.localStorage.setItem(Xn, String(p));
      } catch {
      }
  }, [p]);
  const g = E((P) => {
    i((U) => {
      const W = new Set(U);
      return W.has(P) ? W.delete(P) : W.add(P), W;
    });
  }, []), m = E(() => {
    n(""), i(/* @__PURE__ */ new Set());
  }, []), v = E((P) => {
    h((U) => {
      const W = { ...U, [P]: !U[P] };
      return Oi(P, W[P]), W;
    });
  }, []), N = V(() => {
    const P = /* @__PURE__ */ new Map();
    for (const U of At)
      for (const W of U.items) P.set(W.type, W);
    return P;
  }, []), y = V(
    () => c.map((P) => N.get(P)).filter(Boolean),
    [c, N]
  ), k = V(() => At.map((P) => {
    const U = a.size > 0 && !a.has(P.name) ? [] : P.items.filter((W) => Li(W, r));
    return { ...P, items: U };
  }).filter((P) => P.items.length > 0), [r, a]), b = V(() => {
    const P = /* @__PURE__ */ new Set(), U = [];
    if (!r && a.size === 0)
      for (const W of y)
        U.push(W), P.add(W.type);
    for (const W of k)
      for (const oe of W.items)
        P.has(oe.type) || (U.push(oe), P.add(oe.type));
    return U;
  }, [y, k, r, a]), w = ae(b);
  Z(() => {
    w.current = b;
  }, [b]);
  const C = k.length === 0 && (r !== "" || a.size > 0), R = (P) => (U) => {
    if (f.has(P.type)) {
      U.preventDefault();
      return;
    }
    U.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: P.type })
    ), U.dataTransfer.effectAllowed = "move";
  }, S = (P, U) => {
    const W = f.has(P.type), oe = s === P.type && !W, ie = U !== null && U < 9 ? U + 1 : null;
    return p ? /* @__PURE__ */ o(
      "div",
      {
        draggable: !W,
        onDragStart: R(P),
        onMouseEnter: () => d(P.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-8 box-border my-px mx-2 px-2 flex items-center gap-2 rounded font-[inherit]",
          W ? "cursor-not-allowed opacity-45" : "cursor-grab",
          oe ? "bg-slate-100" : "bg-transparent"
        ),
        title: W ? `${P.name} is already placed` : ie ? `${P.description} — press ${ie}` : P.description,
        "data-node-type": P.type,
        "data-disabled": W || void 0,
        "data-testid": `palette-item-${P.type}`,
        children: [
          /* @__PURE__ */ e("span", { className: "text-base leading-none w-5 text-center shrink-0", "aria-hidden": !0, children: P.icon }),
          /* @__PURE__ */ e("span", { className: I("text-[12px] font-medium text-slate-800 truncate", W && "line-through"), children: P.name }),
          ie !== null && /* @__PURE__ */ e(
            "kbd",
            {
              "data-testid": `palette-shortcut-${P.type}`,
              className: I(
                "ml-auto text-[10px] font-semibold font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                W && "opacity-50"
              ),
              children: ie
            }
          )
        ]
      },
      P.type
    ) : /* @__PURE__ */ o(
      "div",
      {
        draggable: !W,
        onDragStart: R(P),
        onMouseEnter: () => d(P.type),
        onMouseLeave: () => d(null),
        className: I(
          "h-11 box-border my-0.5 mx-2 py-1.5 px-2.5 flex items-center gap-2.5 rounded-md border border-transparent font-[inherit]",
          W ? "cursor-not-allowed opacity-45" : "cursor-grab",
          oe ? "bg-slate-50" : "bg-transparent"
        ),
        title: W ? `${P.name} is already placed` : ie ? `${P.description} — press ${ie}` : P.description,
        "data-node-type": P.type,
        "data-disabled": W || void 0,
        "data-testid": `palette-item-${P.type}`,
        children: [
          /* @__PURE__ */ e("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: P.icon }),
          /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ o("div", { className: I("text-[13px] font-semibold text-slate-900 flex items-center gap-1.5", W && "line-through"), children: [
              /* @__PURE__ */ e("span", { className: "truncate", children: P.name }),
              ie !== null && /* @__PURE__ */ e(
                "kbd",
                {
                  "data-testid": `palette-shortcut-${P.type}`,
                  className: I(
                    "text-[10px] font-semibold font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded px-1 leading-[14px] min-w-[14px] text-center shrink-0",
                    W && "opacity-50"
                  ),
                  children: ie
                }
              )
            ] }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-slate-500 truncate", children: W ? "Placed" : P.description })
          ] })
        ]
      },
      P.type
    );
  }, A = y.length > 0 && !r && a.size === 0;
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
                value: r,
                onChange: (P) => n(P.target.value),
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
              children: Mi.map((P) => /* @__PURE__ */ e(
                ia,
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
                "aria-expanded": !x.__recents__,
                children: [
                  /* @__PURE__ */ e(Qn, { expanded: !x.__recents__ }),
                  "Recently used"
                ]
              }
            ),
            !x.__recents__ && /* @__PURE__ */ e("div", { children: y.map((P) => {
              const U = M++;
              return S(P, U);
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
          ) : k.map((P) => {
            const U = !!x[P.name];
            return /* @__PURE__ */ o("div", { "data-testid": `palette-category-${P.name}`, children: [
              /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => v(P.name),
                  className: "w-full flex items-center gap-1 pt-2 pb-1 px-3.5 text-[10px] font-bold tracking-[0.6px] uppercase text-slate-400 hover:text-slate-600 transition-colors font-[inherit]",
                  "aria-expanded": !U,
                  children: [
                    /* @__PURE__ */ e(Qn, { expanded: !U }),
                    P.name
                  ]
                }
              ),
              !U && /* @__PURE__ */ e("div", { children: P.items.map((W) => {
                const oe = M++;
                return S(W, oe);
              }) })
            ] }, P.name);
          })
        ] }),
        /* @__PURE__ */ e("div", { className: "py-2 px-3 border-t border-slate-200 text-[10px] text-slate-400 font-[inherit] shrink-0", children: "Press 1–9 to insert at center" })
      ]
    }
  );
}
function Fi({
  definition: t,
  addNode: r,
  screenToFlowPosition: n,
  containerRef: a
}) {
  return Z(() => {
    const i = (s) => {
      if (!Un(s.target) && !(s.metaKey || s.ctrlKey || s.altKey) && /^[1-8]$/.test(s.key)) {
        const d = Number(s.key) - 1, c = Pi[d];
        if (!c || c.type === "trigger" && t?.nodes.some((f) => f.type === "trigger"))
          return;
        const p = a.current?.getBoundingClientRect(), u = p ? n({
          x: p.left + p.width / 2,
          y: p.top + p.height / 2
        }) : { x: 0, y: 0 };
        let { x, y: h } = u;
        if (t)
          for (const f of t.nodes)
            Math.abs(f.position.x - x) < 16 && Math.abs(f.position.y - h) < 16 && (x += 24, h += 24);
        r(c.type, { x, y: h }), s.preventDefault();
      }
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [r, t, n, a]), null;
}
const Ui = 280, ji = 120, zi = 40, qi = 40;
function Vi(t, r) {
  const n = Ui, a = ji, i = zi, s = qi;
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
      const N = v.shift(), y = p.get(N), k = d.get(N) ?? [];
      for (const b of k)
        p.has(b) || (p.set(b, y + 1), v.push(b));
    }
  }
  const u = /* @__PURE__ */ new Map();
  let x = -1;
  for (const v of t.nodes) {
    const N = p.get(v.id);
    N !== void 0 && (u.has(N) || u.set(N, []), u.get(N).push(v.id), N > x && (x = N));
  }
  for (const v of u.values())
    v.sort();
  const h = t.nodes.filter((v) => !p.has(v.id)).map((v) => v.id).sort(), f = x >= 0 ? x + 1 : 0;
  h.length > 0 && u.set(f, h);
  const g = [], m = [...u.keys()].sort((v, N) => v - N);
  for (const v of m) {
    const N = u.get(v), y = N.length, k = i + v * n;
    for (let b = 0; b < y; b++) {
      const w = s + (b - y / 2) * a;
      g.push({ id: N[b], position: { x: k, y: w } });
    }
  }
  return g;
}
function Wi({
  definition: t,
  setPositions: r,
  fitView: n
}) {
  const a = E(() => {
    n({ padding: 0.15, duration: 500 });
  }, [n]), i = E(() => {
    if (!t) return;
    const s = Vi(t);
    s.length !== 0 && (r(s), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => n({ padding: 0.15, duration: 500 })) : n({ padding: 0.15, duration: 500 }));
  }, [t, r, n]);
  return { handleFitView: a, handleAutoArrange: i };
}
function Hi({
  definition: t,
  setPositions: r,
  fitView: n
}) {
  const { handleFitView: a, handleAutoArrange: i } = Wi({
    definition: t,
    setPositions: r,
    fitView: n
  });
  return Z(() => {
    const s = (d) => {
      const c = d.target;
      if (!(c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable)) && d.shiftKey && (d.key === "A" || d.key === "a")) {
        if (d.metaKey || d.ctrlKey || d.altKey) return;
        d.preventDefault(), i();
      }
    };
    return window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s);
  }, [i]), /* @__PURE__ */ o(K, { children: [
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
function Un(t) {
  if (!t || !(t instanceof HTMLElement)) return !1;
  const r = t.tagName;
  return !!(r === "INPUT" || r === "TEXTAREA" || r === "SELECT" || t.isContentEditable);
}
function Ji(t) {
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
const Gi = { animated: ki }, Ki = Ni;
function Yi(t) {
  return {
    id: t.id,
    type: t.type,
    position: t.position,
    data: { ...t.data, nodeType: t.type }
  };
}
function Xi(t) {
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
function Qi({ onFilterLog: t, errorNodeId: r, onErrorNodePosition: n, replayEdgeStates: a, replayNodeClasses: i, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c }) {
  const {
    definition: l,
    addNode: p,
    setPositions: u,
    addEdge: x,
    removeEdge: h,
    removeNode: f,
    duplicateNodes: g,
    selectedNodeId: m,
    setSelectedNodeId: v,
    updateNodeData: N
  } = Ye(), { screenToFlowPosition: y, fitView: k } = na();
  $i({
    addNode: p,
    addEdge: x,
    updateNodeData: N,
    getDefinition: () => l
  });
  const [b, w, C] = ao([]), [R, S, A] = io([]), [M, P] = $(!0), [U, W] = $(!0), oe = ae(null), ie = ae(null), [ce, j] = $(null), [D, J] = $(null), H = E(
    (Y, ne) => {
      Y.preventDefault(), J({ nodeId: ne.id, x: Y.clientX, y: Y.clientY });
    },
    []
  ), O = E(() => {
    D && (t?.(D.nodeId), J(null));
  }, [D, t]), z = E(() => {
    if (!D) return;
    const Y = D.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(Y).catch(() => {
    }), J(null);
  }, [D]), q = E(() => {
    D && (d?.(D.nodeId), J(null));
  }, [D, d]), G = E(() => {
    if (!D) return;
    const Y = g([D.nodeId]);
    Y.length > 0 && v(Y[0]), J(null);
  }, [D, g, v]), de = E(() => J(null), []);
  Z(() => {
    if (!l) {
      w([]), S([]);
      return;
    }
    w((Y) => {
      const ne = new Map(Y.map((pe) => [pe.id, pe]));
      return l.nodes.map((pe) => {
        const xe = ne.get(pe.id), $e = Yi(pe);
        return s && s.size > 0 && ($e.data._hasBreakpoint = s.has(pe.id)), c && ($e.data._pausedAtBreakpoint = pe.id === c), xe ? { ...xe, ...$e, selected: xe.selected } : $e;
      });
    }), S(() => l.edges.map(Xi));
  }, [l, s, c, w, S]), Z(() => {
    if (!r) {
      n?.(null);
      return;
    }
    w(
      (Y) => Y.map((ne) => ({
        ...ne,
        className: ne.id === r ? "node-error" : ne.className?.replace("node-error", "").trim() || void 0
      }))
    ), requestAnimationFrame(() => {
      const Y = oe.current;
      if (!Y) return;
      const ne = Y.querySelector(
        `.react-flow__node[data-id="${CSS.escape(r)}"]`
      );
      if (!ne) {
        n?.(null);
        return;
      }
      const pe = ne.getBoundingClientRect();
      n?.({ x: pe.right, y: pe.top + pe.height / 2 });
    });
  }, [r, w, n]), Z(() => {
    i && w(
      (Y) => Y.map((ne) => {
        const pe = i[ne.id] ?? "", $e = [ne.id === r ? "node-error" : "", pe].filter(Boolean).join(" ") || void 0;
        let Ce;
        pe === "node-replay-active" ? Ce = "running" : pe === "node-replay-completed" ? Ce = "completed" : pe === "node-replay-failed" && (Ce = "failed");
        const qe = { ...ne.data };
        return Ce ? qe._state = Ce : qe._state = "idle", { ...ne, className: $e, data: qe };
      })
    );
  }, [i, r, w]), Z(() => {
    a && S(
      (Y) => Y.map((ne) => {
        const pe = a[ne.id];
        if (!pe) return ne;
        const xe = ne.data ?? {};
        return xe.state === pe ? ne : { ...ne, data: { ...xe, state: pe } };
      })
    );
  }, [a, S]);
  const F = E(
    (Y) => {
      C(Y);
      const ne = [], pe = [];
      for (const xe of Y)
        xe.type === "position" && xe.position && xe.dragging === !1 ? ne.push({ id: xe.id, position: xe.position }) : xe.type === "remove" && pe.push(xe.id);
      ne.length && u(ne);
      for (const xe of pe) f(xe);
    },
    [C, u, f]
  ), re = E(
    (Y) => {
      A(Y);
      for (const ne of Y)
        ne.type === "remove" && h(ne.id);
    },
    [A, h]
  ), ye = E(
    (Y) => {
      if (!l || !Y.source || !Y.target) return;
      const ne = l.nodes.find((Ce) => Ce.id === Y.source), pe = l.nodes.find((Ce) => Ce.id === Y.target);
      if (!ne || !pe) return;
      const xe = Y.sourceHandle ?? "out", $e = Y.targetHandle ?? "in";
      Sn(
        ne.type,
        xe,
        pe.type,
        $e
      ) && x({
        source: Y.source,
        sourceHandle: xe,
        target: Y.target,
        targetHandle: $e
      });
    },
    [l, x]
  ), Me = E(
    (Y) => {
      if (!l || !Y.source || !Y.target) return !1;
      const ne = l.nodes.find((xe) => xe.id === Y.source), pe = l.nodes.find((xe) => xe.id === Y.target);
      return !ne || !pe ? !1 : Sn(
        ne.type,
        Y.sourceHandle ?? "out",
        pe.type,
        Y.targetHandle ?? "in"
      );
    },
    [l]
  ), He = E(
    (Y, ne) => {
      v(ne.id);
    },
    [v]
  ), _e = E(() => {
    v(null);
  }, [v]), Re = E(
    (Y) => {
      const ne = Y.target;
      if (!ne || !(ne.classList.contains("react-flow__pane") || ne.classList.contains("react-flow__renderer") || ne.classList.contains("react-flow__viewport") || ne.classList.contains("react-flow"))) return;
      Y.preventDefault();
      const xe = y({ x: Y.clientX, y: Y.clientY });
      j({
        anchor: { x: Y.clientX, y: Y.clientY },
        flowPosition: xe
      });
    },
    [y]
  ), Be = E(() => j(null), []), Oe = E(
    (Y, ne) => {
      p(Y, ne);
    },
    [p]
  ), Fe = V(() => l ? l.nodes.some((Y) => Y.type === "trigger") ? ["trigger"] : [] : [], [l]), { handleDragOver: we, handleDrop: me } = Ai({
    addNode: p,
    screenToFlowPosition: y
  });
  Z(() => {
    const Y = (ne) => {
      if (!Un(ne.target) && !(ne.metaKey || ne.ctrlKey || ne.altKey)) {
        if (ne.key === "m" || ne.key === "M") {
          P((pe) => !pe);
          return;
        }
        if (ne.key === "c" || ne.key === "C") {
          W((pe) => !pe);
          return;
        }
      }
    };
    return window.addEventListener("keydown", Y), () => window.removeEventListener("keydown", Y);
  }, []), Ti({
    definition: l,
    selectedNodeId: m,
    setSelectedNodeId: v,
    removeNode: f,
    removeDefEdge: h,
    setNodes: w,
    setEdges: S,
    setPositions: u,
    duplicateNodes: g,
    clipboardRef: ie,
    containerRef: oe
  });
  const te = E((Y) => {
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
      ref: oe,
      className: "flex-1 min-w-0 min-h-[520px] relative bg-[#fafbfc]",
      role: "application",
      "aria-label": "Pipeline editor canvas",
      tabIndex: 0,
      "data-testid": "pipeline-canvas",
      onDragOver: we,
      onDrop: me,
      onDoubleClick: Re,
      children: [
        /* @__PURE__ */ o(
          so,
          {
            nodes: b,
            edges: R,
            nodeTypes: Ki,
            edgeTypes: Gi,
            onNodesChange: F,
            onEdgesChange: re,
            onConnect: ye,
            isValidConnection: Me,
            onNodeClick: He,
            onNodeContextMenu: H,
            onPaneClick: _e,
            fitView: !0,
            snapToGrid: !0,
            snapGrid: [16, 16],
            edgesFocusable: !0,
            defaultEdgeOptions: { type: "smoothstep" },
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ e(
                lo,
                {
                  variant: ra.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              U ? /* @__PURE__ */ e(
                co,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              M ? /* @__PURE__ */ e(
                oa,
                {
                  position: "bottom-right",
                  pannable: !0,
                  zoomable: !0,
                  className: "!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]",
                  maskColor: "rgba(15, 23, 42, 0.04)",
                  nodeColor: te,
                  nodeStrokeColor: "#e2e8f0"
                }
              ) : null
            ]
          }
        ),
        ce ? /* @__PURE__ */ e(
          Si,
          {
            anchor: ce.anchor,
            flowPosition: ce.flowPosition,
            disabledTypes: Fe,
            onClose: Be,
            onInsert: Oe
          }
        ) : null,
        /* @__PURE__ */ e(
          Fi,
          {
            definition: l,
            addNode: p,
            screenToFlowPosition: y,
            containerRef: oe
          }
        ),
        /* @__PURE__ */ e(
          Hi,
          {
            definition: l,
            setPositions: u,
            fitView: k
          }
        ),
        D ? /* @__PURE__ */ e(
          Ri,
          {
            nodeMenu: D,
            breakpoints: s,
            showBreakpointOption: !!d,
            onFilterLog: O,
            onCopyNodeId: z,
            onDuplicate: G,
            onToggleBreakpoint: q,
            onDismiss: de
          }
        ) : null
      ]
    }
  );
}
function Zi({ onFilterLog: t, errorNodeId: r, onErrorNodePosition: n, replayEdgeStates: a, replayNodeClasses: i, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c } = {}) {
  return /* @__PURE__ */ e(ta, { children: /* @__PURE__ */ e(
    Qi,
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
const Zn = {
  LLMError: { bg: "#fef2f2", fg: "#dc2626" },
  TimeoutError: { bg: "#fff7ed", fg: "#ea580c" },
  NetworkError: { bg: "#fffbeb", fg: "#d97706" },
  ValidationError: { bg: "#fefce8", fg: "#ca8a04" },
  RegistryConflict: { bg: "#faf5ff", fg: "#9333ea" },
  UnknownError: { bg: "#f1f5f9", fg: "#475569" }
};
function es(t) {
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
function ts({ error: t, anchor: r, onDismiss: n, onRetry: a }) {
  const [i, s] = $(!1), [d, c] = $(!1), l = t.errorCategory ?? "UnknownError", p = Zn[l] ?? Zn.UnknownError, u = E(async () => {
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
  }, [t, l]), x = E(() => {
    a?.();
  }, [a]), h = Math.min(r.y + 8, window.innerHeight - 440), f = Math.min(r.x + 12, window.innerWidth - 360);
  return /* @__PURE__ */ o(
    "div",
    {
      className: "fixed z-[100] bg-white border border-[#e2e8f0] rounded-[10px] shadow-[0_12px_32px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.08)] p-0 w-[340px] max-h-[420px] overflow-y-auto font-inherit text-[#0f172a]",
      style: { top: Math.max(8, h), left: Math.max(8, f) },
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
              children: es(l)
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
              onClick: x,
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
function ns(t, r) {
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
function uo(t) {
  const r = [], n = [], { nodes: a, edges: i } = t, s = /* @__PURE__ */ new Map();
  for (const d of a)
    s.set(d.id, d);
  return rs(a, r), os(a, i, r), as(i, s, r), is(a, r), hs(a, i, r), fs(a, i, n), xs(a, i, n), gs(a, i, n), bs(a, i, n), n.push(...ys(t)), n.push(...vs(t)), n.push(...Ns(t)), n.push(...ws(t)), n.push(...ks(t)), n.push(...Cs(t)), n.push(...Is(t)), n.push(...Ss(t)), n.push(...$s(t)), n.push(...Ts(t)), {
    errors: r,
    warnings: n,
    isValid: r.length === 0,
    canPublish: r.length === 0
  };
}
function rs(t, r) {
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
function os(t, r, n) {
  const a = ns(t, r);
  a !== null && n.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: a
  });
}
function as(t, r, n) {
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
    Sn(
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
function is(t, r) {
  for (const n of t)
    switch (n.data.type) {
      case "llm":
        ss(n.id, n.data, r);
        break;
      case "transform":
        ls(n.id, n.data, r);
        break;
      case "condition":
        cs(n.id, n.data, r);
        break;
      case "action":
        ds(n.id, n.data, r);
        break;
      case "fork":
        ps(n.id, n.data, r);
        break;
      case "join":
        us(n.id, n.data, r);
        break;
      case "approval":
        ms(n.id, n.data, r);
        break;
    }
}
function ss(t, r, n) {
  r.provider || ze(n, t, "provider"), (!r.model || !r.model.trim()) && ze(n, t, "model"), (!r.systemPrompt || !r.systemPrompt.trim()) && ze(n, t, "systemPrompt"), (!r.userPromptTemplate || !r.userPromptTemplate.trim()) && ze(n, t, "userPromptTemplate");
}
function ls(t, r, n) {
  r.transformType || ze(n, t, "transformType"), (!r.expression || !r.expression.trim()) && ze(n, t, "expression");
}
function cs(t, r, n) {
  (!r.expression || !r.expression.trim()) && ze(n, t, "expression");
}
function ds(t, r, n) {
  r.actionType || ze(n, t, "actionType");
}
function ps(t, r, n) {
  (typeof r.branchCount != "number" || r.branchCount < 2) && n.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: t,
    field: "branchCount"
  });
}
function us(t, r, n) {
  r.mode || ze(n, t, "mode"), r.mergeStrategy || ze(n, t, "mergeStrategy"), r.mode === "n_of_m" && (typeof r.n != "number" || r.n < 1) && n.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: t,
    field: "n"
  });
}
function ms(t, r, n) {
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
function hs(t, r, n) {
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
function ze(t, r, n) {
  t.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: `Missing required field '${n}'.`,
    nodeId: r,
    field: n
  });
}
function fs(t, r, n) {
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
function xs(t, r, n) {
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
function gs(t, r, n) {
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
function bs(t, r, n) {
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
function Ke(t) {
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
function ys(t) {
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
      message: `${c.data.type} node '${Ke(c)}' has no error handler — failures will terminate the run.`,
      nodeId: c.id
    });
  return r;
}
function vs(t) {
  const r = [];
  for (const n of t.nodes)
    n.data.type === "llm" && (typeof n.data.maxTokens != "number" || n.data.maxTokens <= 0) && r.push({
      code: "LLM_NO_MAX_TOKENS",
      severity: "warning",
      message: `LLM node '${Ke(n)}' has no maxTokens — responses could run long / expensive.`,
      nodeId: n.id,
      field: "maxTokens"
    });
  return r;
}
function Ns(t) {
  const r = [];
  for (const n of t.nodes)
    n.data.type === "approval" && (typeof n.data.timeoutMs != "number" || n.data.timeoutMs <= 0) && r.push({
      code: "UNGUARDED_APPROVAL_TIMEOUT",
      severity: "warning",
      message: `Approval '${Ke(n)}' has no timeout — the run could block indefinitely.`,
      nodeId: n.id,
      field: "timeoutMs"
    });
  return r;
}
function ws(t) {
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
function ks(t) {
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
    for (const x of a.get(p) ?? []) {
      const h = i.get(x);
      (h === void 0 || u + 1 > h) && (i.set(x, u + 1), s.push(x));
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
function Cs(t) {
  const r = [], n = /* @__PURE__ */ new Map();
  for (const a of t.nodes) {
    const i = Ke(a), s = n.get(i) ?? [];
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
function Is(t) {
  const r = [], n = /\{\{[^}]+\}\}/;
  for (const a of t.nodes) {
    if (a.data.type !== "llm") continue;
    const { temperature: i, userPromptTemplate: s } = a.data;
    typeof i != "number" || i <= 0.8 || !s || !n.test(s) || r.push({
      code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
      severity: "warning",
      message: `LLM '${Ke(a)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
      nodeId: a.id
    });
  }
  return r;
}
function Ss(t) {
  return t.triggerBinding?.event !== "schedule" ? [] : t.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function $s(t) {
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
      message: `Condition '${Ke(a)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: a.id,
      field: "false"
    });
  }
  return r;
}
function Ts(t) {
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
      const u = p.shift(), x = i.get(u);
      if (x && x.type === "join" && u !== c) return u;
      for (const { target: h } of n.get(u) ?? [])
        l.has(h) || (l.add(h), p.push(h));
    }
    return null;
  }
  function d(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [c];
    for (; p.length > 0; ) {
      const u = p.shift(), x = i.get(u);
      if (x && x.type === "fork" && u !== c) return u;
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
    const u = p.has(null), x = [...p].filter((h) => h !== null);
    (u || x.length !== 1) && r.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Fork '${Ke(c)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
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
    const u = p.has(null), x = [...p].filter((h) => h !== null);
    (u || x.length !== 1) && r.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Join '${Ke(c)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: c.id
    });
  }
  return r;
}
function As(t, r) {
  return `${t}${r}`;
}
const Rs = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, Ps = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function mo(t) {
  return t.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const Ms = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function Ds(t) {
  const r = Ps[t.type] ?? "■", n = Ms[t.type] ?? t.type.charAt(0).toUpperCase() + t.type.slice(1);
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
  return mo(a ? `${i}<br/>${a}` : i);
}
function Es(t, r) {
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
function _s(t) {
  return !t || t === "out" ? null : t;
}
function Os(t) {
  const r = ["flowchart TD"], n = {}, a = /* @__PURE__ */ new Map();
  for (const i of t.nodes) {
    const s = Rs[i.type] ?? "n", d = n[s] = (n[s] ?? 0) + 1;
    a.set(i.id, As(s, d));
  }
  for (const i of t.nodes) {
    const s = a.get(i.id);
    if (!s) continue;
    const d = Es(i.type, Ds(i));
    r.push(`  ${s}${d}`);
  }
  for (const i of t.edges) {
    const s = a.get(i.source), d = a.get(i.target);
    if (!s || !d) continue;
    const c = _s(i.sourceHandle);
    c ? r.push(`  ${s} --"${mo(c)}"--> ${d}`) : r.push(`  ${s} --> ${d}`);
  }
  return r.join(`
`);
}
function er(t) {
  return JSON.stringify(t, (r, n) => {
    if (n && typeof n == "object" && !Array.isArray(n)) {
      const a = Object.keys(n).sort(), i = {};
      for (const s of a) i[s] = n[s];
      return i;
    }
    return n;
  });
}
function tr(t) {
  const r = /* @__PURE__ */ new Map();
  for (const n of t) r.set(n.id, n);
  return r;
}
function nr(t) {
  return new Set(t.edges.map((r) => r.id));
}
function Ls(t, r) {
  if (!r)
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
  const n = tr(t.nodes), a = tr(r.nodes), i = [], s = [], d = [];
  for (const [y, k] of n) {
    const b = a.get(y);
    if (!b) {
      i.push({ node: k, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const w = er(k.data) !== er(b.data), C = k.position.x !== b.position.x || k.position.y !== b.position.y;
    (w || C) && d.push({ node: k, dataChanged: w, positionChanged: C });
  }
  for (const [y, k] of a)
    n.has(y) || s.push({ node: k, dataChanged: !0, positionChanged: !1 });
  const c = nr(t), l = nr(r);
  let p = 0, u = 0;
  for (const y of c) l.has(y) || p++;
  for (const y of l) c.has(y) || u++;
  const x = t.name !== r.name, h = (t.icon ?? "") !== (r.icon ?? ""), f = new Set(t.tags ?? []), g = new Set(r.tags ?? []), m = [], v = [];
  for (const y of f) g.has(y) || m.push(y);
  for (const y of g) f.has(y) || v.push(y);
  const N = m.length > 0 || v.length > 0;
  return {
    addedNodes: i,
    removedNodes: s,
    modifiedNodes: d,
    addedEdges: p,
    removedEdges: u,
    nameChanged: x,
    previousName: x ? r.name : void 0,
    iconChanged: h,
    previousIcon: h ? r.icon : void 0,
    tagsChanged: N,
    tagsAdded: m,
    tagsRemoved: v
  };
}
const Bs = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function Fs(t) {
  return t.data.type === "condition" && t.data.label ? t.data.label : t.data.type === "llm" ? t.data.model : t.data.type === "action" ? t.data.actionType : t.data.type === "trigger" ? t.data.triggerType : t.type.charAt(0).toUpperCase() + t.type.slice(1);
}
function on(t, r, n) {
  const a = t.node, i = Bs[a.type] ?? "■", s = r !== "removed" && !!n;
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
        /* @__PURE__ */ e("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: Fs(a) }),
        r === "modified" && t.positionChanged ? /* @__PURE__ */ e("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]", children: "moved" }) : null
      ]
    },
    `${r}-${t.node.id}`
  );
}
function Us({
  open: t,
  onClose: r,
  currentDef: n,
  publishedDef: a,
  onJumpToNode: i
}) {
  const s = V(
    () => Ls(n, a),
    [n, a]
  ), d = (u) => {
    i && i(u), r();
  }, c = a !== null, l = n.version, p = n.publishedVersion;
  return /* @__PURE__ */ o(
    We,
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
        n.publishedVersion === void 0 ? /* @__PURE__ */ e("p", { className: "m-0 text-[13px] text-text-secondary", children: "This pipeline has never been published." }) : c ? /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ o("div", { className: "flex gap-3 flex-wrap", children: [
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Added (",
                s.addedNodes.length,
                ")"
              ] }),
              s.addedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.addedNodes.map((u) => on(u, "added", d))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Removed (",
                s.removedNodes.length,
                ")"
              ] }),
              s.removedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.removedNodes.map((u) => on(u, "removed", void 0))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Modified (",
                s.modifiedNodes.length,
                ")"
              ] }),
              s.modifiedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.modifiedNodes.map((u) => on(u, "modified", d))
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
function js({ open: t, onClose: r }) {
  return null;
}
const an = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", rr = "px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function zs(t) {
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
    clearRunsConfirmOpen: x,
    onClearRunsClose: h,
    onClearRunsConfirm: f,
    versionDiffOpen: g,
    onVersionDiffClose: m,
    currentDef: v,
    publishedDef: N,
    onJumpToNode: y,
    simPanelOpen: k,
    onSimPanelClose: b
  } = t;
  return /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ e(
      We,
      {
        open: r,
        onClose: n,
        title: "Publish pipeline?",
        maxWidth: 420,
        footer: /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ e("button", { onClick: n, className: an, children: "Cancel" }),
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
          i ? /* @__PURE__ */ o(K, { children: [
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
        footer: /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ e("button", { onClick: p, className: an, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: u, className: rr, children: "Delete" })
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
        open: x,
        onClose: h,
        title: "Clear run history?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(K, { children: [
          /* @__PURE__ */ e("button", { onClick: h, className: an, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: f, className: rr, children: "Clear history" })
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
      Us,
      {
        open: g,
        onClose: m,
        currentDef: v,
        publishedDef: N,
        onJumpToNode: y
      }
    ),
    /* @__PURE__ */ e(
      js,
      {
        open: k,
        onClose: b
      }
    )
  ] });
}
function qs({ runId: t, visible: r }) {
  const [n, a] = $(/* @__PURE__ */ new Map()), i = ae(null), s = ae(!0), d = ae(null);
  Z(() => {
    t !== d.current && (d.current = t, a(/* @__PURE__ */ new Map()), s.current = !0);
  }, [t]);
  const c = E(() => {
    const f = i.current;
    if (!f) return;
    const g = f.scrollHeight - f.scrollTop - f.clientHeight < 30;
    s.current = g;
  }, []), l = E(() => {
    if (!s.current) return;
    const f = i.current;
    f && (f.scrollTop = f.scrollHeight);
  }, []), p = E(
    (f) => {
      if (!("eventType" in f)) return;
      const { eventType: g, payload: m } = f;
      if (!g.startsWith("pipeline.llm.")) return;
      const v = m?.runId;
      if (!t || v !== t) return;
      const N = m?.stepId;
      if (N) {
        if (g === "pipeline.llm.stream.opened")
          a((y) => {
            const k = new Map(y);
            return k.has(N) || k.set(N, {
              stepId: N,
              tokens: [],
              text: "",
              active: !0,
              summary: null,
              collapsed: !1,
              startedAt: Date.now()
            }), k;
          });
        else if (g === "pipeline.llm.token") {
          const y = m?.token;
          if (y === void 0) return;
          a((k) => {
            const b = new Map(k), w = b.get(N);
            if (w) {
              const C = {
                ...w,
                tokens: [...w.tokens, y],
                text: w.text + y,
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
          const y = m?.tokensIn, k = m?.tokensOut;
          a((b) => {
            const w = new Map(b), C = w.get(N), R = C ? Date.now() - C.startedAt : 0, S = R > 1e3 ? `${(R / 1e3).toFixed(1)}s` : `${R}ms`, A = `${N}: ${y ?? "?"} tokens in, ${k ?? "?"} tokens out (${S})`;
            return C ? w.set(N, {
              ...C,
              active: !1,
              summary: A
            }) : w.set(N, {
              stepId: N,
              tokens: [],
              text: "",
              active: !1,
              summary: A,
              collapsed: !1,
              startedAt: Date.now()
            }), w;
          });
        }
      }
    },
    [t]
  );
  Pe("*", p), Z(() => {
    l();
  }, [n, l]);
  const u = E((f) => {
    a((g) => {
      const m = new Map(g), v = m.get(f);
      return v && m.set(f, { ...v, collapsed: !v.collapsed }), m;
    });
  }, []), x = V(() => {
    for (const f of n.values())
      if (f.active) return !0;
    return !1;
  }, [n]), h = V(() => Array.from(n.values()), [n]);
  return r ? /* @__PURE__ */ o(
    "div",
    {
      className: "flex flex-col bg-[#1e1e2e] border-t border-[#313244] max-h-[320px] min-h-[160px] overflow-hidden relative",
      "data-testid": "live-output-panel",
      children: [
        /* @__PURE__ */ e("div", { className: "flex items-center justify-between py-2 px-[14px] bg-[#181825] border-b border-[#313244] shrink-0", children: /* @__PURE__ */ o("div", { className: "text-xs font-bold text-[#cdd6f4] tracking-[0.04em] uppercase flex items-center gap-2", children: [
          /* @__PURE__ */ e("span", { children: "Live Output" }),
          x && /* @__PURE__ */ e("span", { className: "w-1.5 h-1.5 rounded-full bg-[#a6e3a1] [animation:live-output-blink_1.2s_ease-in-out_infinite]" }),
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
            children: h.length === 0 ? /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-full text-[#6c7086] text-[13px] italic", children: t ? "Waiting for LLM output..." : "No active run" }) : h.map((f) => /* @__PURE__ */ o("div", { children: [
              /* @__PURE__ */ o(
                "div",
                {
                  className: I(
                    "flex items-center gap-2 py-1.5 cursor-pointer select-none text-[11px] font-semibold border-b border-[#313244] mb-1.5",
                    f.active ? "text-[#89b4fa]" : "text-[#a6adc8]"
                  ),
                  onClick: () => u(f.stepId),
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (g) => {
                    (g.key === "Enter" || g.key === " ") && u(f.stepId);
                  },
                  children: [
                    /* @__PURE__ */ e("span", { className: "text-[10px]", children: f.collapsed ? "▶" : "▼" }),
                    /* @__PURE__ */ e("span", { children: f.stepId }),
                    f.active && /* @__PURE__ */ e("span", { className: "text-[#a6e3a1] text-[10px]", children: "streaming" })
                  ]
                }
              ),
              !f.collapsed && /* @__PURE__ */ o(K, { children: [
                f.text.length > 0 && /* @__PURE__ */ o("div", { className: "whitespace-pre-wrap break-words m-0 mb-3 p-0 text-[#cdd6f4]", children: [
                  f.text,
                  f.active && /* @__PURE__ */ e("span", { className: "inline-block w-0.5 h-[14px] bg-[#89b4fa] ml-px align-text-bottom [animation:live-output-blink_1s_step-end_infinite]" })
                ] }),
                f.summary && /* @__PURE__ */ o("div", { className: "text-[11px] text-[#a6e3a1] font-semibold pt-1 pb-2 border-b border-[#313244] mb-2", children: [
                  "✓",
                  " ",
                  f.summary
                ] })
              ] })
            ] }, f.stepId))
          }
        )
      ]
    }
  ) : null;
}
function Rt(t, r) {
  const n = new Blob([r], { type: "application/json" }), a = URL.createObjectURL(n), i = document.createElement("a");
  i.href = a, i.download = t, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(a);
}
function Pt(t, r) {
  if (!r) return "step";
  const n = t?.nodes.find((a) => a.id === r);
  return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : r;
}
function Vs(t) {
  const r = ft(), { toast: n } = tn(), { definition: a, selectedNodeId: i, setSelectedNodeId: s } = Ye(), d = ae(r.runs);
  Z(() => {
    d.current = r.runs;
  }, [r.runs]);
  const c = ae(a);
  Z(() => {
    c.current = a;
  }, [a]);
  const l = E(
    (T) => T ? d.current[T]?.pipelineId === t : !1,
    [t]
  ), [p, u] = $(null), [x, h] = $(null), f = E(() => {
    u(null), h(null);
  }, []), g = E(
    (T) => {
      h(T);
    },
    []
  ), m = E(
    (T) => {
      "eventType" in T || T.pipelineId === t && (n("Run started", { type: "info" }), u(null), h(null));
    },
    [t, n]
  ), v = E(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const _ = Math.round(T.durationMs / 100) / 10;
      n(`Run completed in ${_}s`, { type: "success" });
    },
    [l, n]
  ), N = E(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const _ = T.error.nodeId, se = Pt(c.current, _);
      n(`Run failed at ${se}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => s(_)
      }), u(T.error);
    },
    [l, s, n]
  ), y = E(
    (T) => {
      "eventType" in T || l(T.runId) && n("Run cancelled", { type: "warning" });
    },
    [l, n]
  ), k = E(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const _ = T.stepId, se = Pt(c.current, _);
      n(`Approval requested on "${se}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => s(_)
      });
    },
    [l, s, n]
  );
  Pe("pipeline.run.started", m), Pe("pipeline.run.completed", v), Pe("pipeline.run.failed", N), Pe("pipeline.run.cancelled", y), Pe("pipeline.approval.requested", k);
  const [b, w] = $(null);
  Z(() => {
    if (r.activeRunIds.length > 0) {
      const T = r.activeRunIds[r.activeRunIds.length - 1];
      T !== b && w(T);
      return;
    }
    if (!b) {
      const T = Object.values(r.runs).sort(
        (_, se) => se.startedAt.localeCompare(_.startedAt)
      );
      T.length > 0 && w(T[0].id);
    }
  }, [r.activeRunIds, r.runs, b]);
  const C = b ? r.runs[b] : void 0, R = !!C && (C.status === "running" || C.status === "pending" || C.status === "awaiting_approval"), [S, A] = $(/* @__PURE__ */ new Set()), [M, P] = $(null), [U, W] = $(null), [oe, ie] = $(null), [ce, j] = $(0), [D, J] = $(!1), [H, O] = $(null), z = E(
    (T, _) => {
      _ === null ? (W(null), ie(null)) : (W(_), ie(T));
    },
    []
  ), q = E((T) => {
    A((_) => {
      const se = new Set(_);
      return se.has(T) ? se.delete(T) : se.add(T), se;
    });
  }, []), G = E(async () => {
    if (S.size !== 0)
      try {
        const T = await r.triggerDebugRun(
          t,
          Array.from(S)
        );
        w(T);
      } catch (T) {
        console.error("[PipelineEditor] triggerDebugRun failed", T);
      }
  }, [S, r, t]), de = E(() => {
    M && (r.resolveBreakpoint(M.runId, M.stepId, "continue"), P(null));
  }, [M, r]), F = E(() => {
    M && (r.resolveBreakpoint(M.runId, M.stepId, "step_over"), P(null));
  }, [M, r]), re = E(() => {
    M && (r.resolveBreakpoint(M.runId, M.stepId, "resume_all"), P(null));
  }, [M, r]), ye = E(async () => {
    if (!(!M || !U || oe !== M.stepId) && Object.keys(U).length !== 0) {
      J(!0);
      try {
        await Eo(
          t,
          M.runId,
          M.stepId,
          { mode: "merge", values: U }
        ), W(null), ie(null), j((T) => T + 1), r.resolveBreakpoint(M.runId, M.stepId, "continue"), P(null);
      } catch (T) {
        if (T instanceof _o)
          n(`Patch rejected: ${T.reason}`, { type: "error", durationMs: 8e3 });
        else if (T instanceof Wn)
          n(`Apply failed (HTTP ${T.status})`, { type: "error", durationMs: 6e3 });
        else {
          const _ = T instanceof Error ? T.message : String(T);
          n(`Apply failed: ${_}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        J(!1);
      }
    }
  }, [M, U, oe, t, r, n]), Me = E(
    async (T) => {
      if (M) {
        O(T);
        try {
          await Oo(
            t,
            M.runId,
            M.stepId,
            T
          ), n("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (_) {
          if (_ instanceof Wn)
            n(`Revert failed (HTTP ${_.status})`, { type: "error", durationMs: 6e3 });
          else {
            const se = _ instanceof Error ? _.message : String(_);
            n(`Revert failed: ${se}`, { type: "error", durationMs: 6e3 });
          }
        } finally {
          O(null);
        }
      }
    },
    [M, t, n]
  ), He = E(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      P({ runId: T.runId, stepId: T.stepId });
      const _ = Pt(c.current, T.stepId);
      n(`Paused at breakpoint: ${_}`, { type: "warning", durationMs: 6e3 });
    },
    [l, n]
  );
  Pe("pipeline.step.breakpoint", He);
  const _e = E(
    (T) => {
      "eventType" in T || M && M.runId === T.runId && P(null);
    },
    [M]
  );
  Pe("pipeline.run.completed", _e), Pe("pipeline.run.failed", _e), Pe("pipeline.run.cancelled", _e);
  const Re = E(() => {
    p?.nodeId && (r.retryFromStep(p.nodeId), f());
  }, [p, r, f]), Be = a?.status === "published", Oe = !R && !Be, Fe = R ? "Cancel the active run" : Be ? "Start a new run" : "Publish the pipeline to enable runs", [we, me] = $(!1), [te, Y] = $({}), [ne, pe] = $(!1), [xe, $e] = $("config");
  Z(() => {
    i !== null && $e("config");
  }, [i]);
  const Ce = E(async (T) => {
    pe(!0);
    try {
      const _ = await r.triggerRun(t, T);
      w(_), $e("runs"), n(`Pipeline triggered — run ${_.slice(0, 8)}…`, { type: "success" });
    } catch (_) {
      console.error("[PipelineEditor] triggerRun failed", _), n(`Trigger failed: ${_.message}`, { type: "error" });
    } finally {
      pe(!1);
    }
  }, [r, t, n]), qe = E(async () => {
    if (R && b) {
      r.cancelRun(b);
      return;
    }
    Oe || Ce();
  }, [R, b, Oe, r, Ce]), Lt = E(() => {
    me(!1), Ce(te);
  }, [Ce, te]);
  return {
    currentRunId: b,
    setCurrentRunId: w,
    activeError: p,
    setActiveError: u,
    errorNodeAnchor: x,
    handleDismissError: f,
    handleErrorNodePosition: g,
    handleRetryFromError: Re,
    handleRunClick: qe,
    handleTriggerInputSubmit: Lt,
    isRunActive: R,
    runDisabled: Oe,
    runTitle: Fe,
    isTriggering: ne,
    triggerInputOpen: we,
    setTriggerInputOpen: me,
    triggerInputValues: te,
    setTriggerInputValues: Y,
    breakpoints: S,
    handleToggleBreakpoint: q,
    handleDebugRunClick: G,
    pausedBreakpoint: M,
    handleBreakpointContinue: de,
    handleBreakpointStepOver: F,
    handleBreakpointResumeAll: re,
    handleApplyAndContinue: ye,
    handleRevertPatch: Me,
    applyingPatch: D,
    revertingPatchId: H,
    dirtyPatch: U,
    dirtyPatchStepId: oe,
    handleContextEditBufferChange: z,
    resetEditBufferKey: ce,
    sidebarTab: xe,
    setSidebarTab: $e
  };
}
function Ws({
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
  onDelete: x
}) {
  const h = I(
    "block w-full text-left px-3.5 py-2 text-[13px]",
    "border-none bg-transparent cursor-pointer font-inherit text-text-primary",
    "hover:bg-surface-hover"
  ), f = I(
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
            className: f,
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
            className: f,
            role: "menuitem",
            onClick: x,
            children: "Delete"
          }
        )
      ]
    }
  );
}
const sn = {
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-green-50 text-green-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600"
};
function Hs({
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
  onDebugRunClick: x,
  onExport: h,
  onPublishClick: f,
  onDuplicate: g,
  onCopyMermaid: m,
  onViewVersions: v,
  onRevert: N,
  onToggleShowTags: y,
  showTags: k,
  onViewRunHistory: b,
  onClearRunHistory: w,
  onSimPanelOpen: C,
  onDelete: R
}) {
  const S = Ee(), { rename: A, setIcon: M, setSelectedNodeId: P } = Ye(), [U, W] = $(!1), [oe, ie] = $(""), ce = ae(null);
  Z(() => {
    U && (ie(r.name ?? ""), setTimeout(() => ce.current?.focus(), 0));
  }, [U, r.name]);
  const j = () => {
    const te = oe.trim();
    te && te !== r.name && A(te), W(!1);
  }, D = r ? uo(r) : null;
  (D?.errors.length ?? 0) > 0;
  const J = r.status === "published", H = n ? { label: "Saving…", variant: "info" } : a ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, O = r.status === "published" ? { label: `v${r.version} · Published`, variant: "success" } : typeof r.publishedVersion == "number" ? { label: `v${r.version} · Draft (pub v${r.publishedVersion})`, variant: "warning" } : { label: `v${r.version} · Draft`, variant: "neutral" }, z = D ? D.errors.length > 0 ? { label: `✗ ${D.errors.length} error${D.errors.length === 1 ? "" : "s"}`, variant: "danger" } : D.warnings.length > 0 ? { label: `⚠ ${D.warnings.length} warning${D.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [q, G] = $(!1), de = ae(null);
  ut(de, () => G(!1), q);
  const F = D ? [...D.errors, ...D.warnings] : [], re = (te) => {
    te && (P(te), G(!1));
  }, ye = r.nodes.filter((te) => te.type !== "trigger").length, Me = l ? Object.values(l.steps).filter(
    (te) => te.status === "completed" || te.status === "skipped"
  ).length : 0, _e = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), Re = i && l ? { text: `Running (${Me}/${ye} steps) · ${_e}s`, variant: "running" } : l?.status === "completed" ? { text: `Completed in ${l.durationMs ? (l.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : l?.status === "failed" ? { text: `Failed at ${Pt(r, l.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, Be = {
    running: "bg-blue-50 text-blue-600",
    success: "bg-green-50 text-green-600",
    error: "bg-red-50 text-red-600"
  }, Oe = i ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [Fe, we] = $(!1), me = ae(null);
  return ut(me, () => we(!1), Fe), /* @__PURE__ */ o(
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
            onClick: () => S("/pipelines"),
            "aria-label": "Back to pipelines",
            title: "Back to pipelines",
            children: "←"
          }
        ),
        /* @__PURE__ */ e(
          sa,
          {
            value: r.icon ?? "🔀",
            onChange: M
          }
        ),
        U ? /* @__PURE__ */ e(
          "input",
          {
            ref: ce,
            value: oe,
            onChange: (te) => ie(te.target.value),
            onBlur: j,
            onKeyDown: (te) => {
              te.key === "Enter" && j(), te.key === "Escape" && (ie(r.name), W(!1));
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
              sn[H.variant]
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
              sn[O.variant]
            ),
            "data-testid": "version-badge",
            children: O.label
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", ref: de, children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => G((te) => !te),
              className: I(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
                "cursor-pointer border-none",
                sn[z.variant]
              ),
              "data-testid": "validation-indicator",
              children: z.label
            }
          ),
          q && F.length > 0 && /* @__PURE__ */ e(
            "div",
            {
              className: I(
                "absolute top-full mt-1.5 bg-surface border border-border rounded-lg",
                "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"
              ),
              children: F.map((te, Y) => /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => re(te.nodeId),
                  className: I(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    te.nodeId ? "cursor-pointer" : "cursor-default",
                    Y < F.length - 1 && "border-b border-border"
                  ),
                  children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: I(
                          "font-bold text-xs",
                          te.severity === "error" ? "text-red-600" : "text-amber-600"
                        ),
                        children: te.severity === "error" ? "✗" : "⚠"
                      }
                    ),
                    /* @__PURE__ */ o("span", { className: "flex-1 text-xs", children: [
                      /* @__PURE__ */ e("div", { className: "font-semibold", children: te.code }),
                      /* @__PURE__ */ e("div", { className: "text-text-secondary", children: te.message }),
                      te.nodeId && /* @__PURE__ */ e("div", { className: "mt-0.5 text-[11px] text-primary", children: "Jump to node →" })
                    ] })
                  ]
                },
                `${te.code}-${Y}`
              ))
            }
          )
        ] }),
        Re.variant !== "none" && /* @__PURE__ */ o(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap",
              Be[Re.variant]
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
          je,
          {
            variant: "secondary",
            onClick: () => S("/pipelines/metrics"),
            title: "View pipeline metrics dashboard",
            "data-testid": "metrics-button",
            children: "Metrics"
          }
        ),
        /* @__PURE__ */ e(
          je,
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
            onClick: f,
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
            ] }) : Oe
          }
        ),
        p.size > 0 && /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            onClick: x,
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
        /* @__PURE__ */ o("div", { className: "relative", ref: me, children: [
          /* @__PURE__ */ e(
            Tt,
            {
              onClick: () => we((te) => !te),
              "aria-label": "More actions",
              "data-testid": "overflow-menu-btn",
              children: "⋯"
            }
          ),
          Fe && /* @__PURE__ */ e(
            Ws,
            {
              isPublished: J,
              showTags: k,
              onDuplicate: () => {
                g(), we(!1);
              },
              onCopyMermaid: () => {
                m(), we(!1);
              },
              onViewVersions: () => {
                v(), we(!1);
              },
              onRevert: () => {
                N(), we(!1);
              },
              onToggleShowTags: () => {
                y(), we(!1);
              },
              onViewRunHistory: () => {
                b(), we(!1);
              },
              onClearRunHistory: () => {
                w(), we(!1);
              },
              onSimPanelOpen: () => {
                C(), we(!1);
              },
              onDelete: () => {
                R(), we(!1);
              },
              hasPublishedVersion: typeof r.publishedVersion == "number"
            }
          )
        ] })
      ]
    }
  );
}
const Js = 12;
function Ie(t) {
  return I("text-xs", {
    string: "text-[#a6e3a1]",
    number: "text-[#fab387]",
    boolean: "text-[#cba6f7]",
    null: "text-[#6c7086]",
    bracket: "text-[#9399b2]"
  }[t]);
}
function Et({
  data: t,
  depth: r = 0,
  highlightKeys: n,
  keyName: a,
  isHighlighted: i = !1
}) {
  const [s, d] = $(r > 2);
  if (r > Js)
    return /* @__PURE__ */ e("span", { className: Ie("string"), children: "[max depth]" });
  const c = i || a != null && n?.has(a);
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
        /* @__PURE__ */ e(Et, { data: l, depth: r + 1, highlightKeys: n }),
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
      ] }) : /* @__PURE__ */ e("div", { className: "pl-4", children: l.map(([p, u], x) => {
        const h = n?.has(p) || i;
        return /* @__PURE__ */ o("div", { className: "leading-relaxed whitespace-nowrap", children: [
          /* @__PURE__ */ e("span", { className: I(
            "text-xs font-medium text-[#89b4fa]",
            h && "text-[#a6e3a1] font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5"
          ), children: p }),
          /* @__PURE__ */ e("span", { className: Ie("bracket"), children: ": " }),
          /* @__PURE__ */ e(
            Et,
            {
              data: u,
              depth: r + 1,
              highlightKeys: r === 0 ? n : void 0,
              keyName: p,
              isHighlighted: h
            }
          ),
          x < l.length - 1 && /* @__PURE__ */ e("span", { className: Ie("bracket"), children: "," })
        ] }, p);
      }) }),
      /* @__PURE__ */ e("span", { className: Ie("bracket"), children: "}" })
    ] });
  }
  return /* @__PURE__ */ e("span", { className: Ie("string"), children: String(t) });
}
function Gs({
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
function Ks(t) {
  return typeof t == "string" ? "string" : typeof t == "number" ? "number" : typeof t == "boolean" ? "boolean" : "object";
}
function Ys({ k: t, initial: r, onCommit: n, onError: a, onFocus: i }) {
  const [s, d] = $(() => {
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
function Xs({
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
  const u = V(() => {
    const h = /* @__PURE__ */ new Set([
      ...Object.keys(t),
      ...Object.keys(r)
    ]);
    return Array.from(h);
  }, [t, r]), x = "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono";
  return /* @__PURE__ */ o("div", { "data-testid": "context-edit-table", children: [
    u.map((h) => {
      const f = h in r, g = f ? r[h] : t[h], m = Ks(g), v = f;
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
                  className: x,
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
                  className: x
                }
              ) : m === "string" ? /* @__PURE__ */ e(
                "input",
                {
                  "data-testid": `context-edit-input-${h}`,
                  type: "text",
                  value: g ?? "",
                  onChange: (N) => c(h, N.target.value),
                  onFocus: () => d(h, g),
                  className: x
                }
              ) : /* @__PURE__ */ e(
                Ys,
                {
                  k: h,
                  initial: g,
                  onCommit: (N) => c(h, N),
                  onError: (N) => p(h, N),
                  onFocus: () => d(h, g)
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
              className: x
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
              className: x
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
function Qs(t, r, n) {
  const a = { ...t }, i = { ...a.steps ?? {} };
  return i[r] = n, a.steps = i, n && typeof n == "object" && !Array.isArray(n) && Object.assign(a, n), a;
}
function Zs(t, r) {
  const n = [];
  for (const a of Object.keys(r))
    a in t || n.push(a);
  return n;
}
function el(t) {
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
      l = Qs(a, i.nodeId, d);
    else {
      l = { ...a };
      const u = {
        ...l.steps ?? {}
      };
      u[i.nodeId] = d, l.steps = u;
    }
    const p = Zs(s, l);
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
function tl(t, r) {
  const [n, a] = $(/* @__PURE__ */ new Map()), [i, s] = $(
    /* @__PURE__ */ new Map()
  ), d = ae(null);
  Z(() => {
    const h = t?.id ?? null;
    h !== d.current && (d.current = h, a(/* @__PURE__ */ new Map()), s(/* @__PURE__ */ new Map()));
  }, [t?.id]);
  const c = E(
    (h) => {
      if (!h || typeof h != "object") return;
      const { eventType: f, payload: g } = h;
      if (!g || typeof g != "object") return;
      const m = g, v = m.runId;
      if (!(!t?.id || v !== t.id)) {
        if (f === "pipeline.llm.prompt") {
          const N = m.stepId, y = m.prompt;
          N && y && a((k) => {
            const b = new Map(k);
            return b.set(N, y), b;
          });
        }
        if (f === "pipeline.run.checkpoint" || f === "pipeline.run.checkpointed" || f === "pipeline:run:checkpoint" || f === "pipeline:run:checkpointed") {
          const N = m.context, y = m.stepId;
          N && y && s((k) => {
            const b = new Map(k);
            return b.set(y, N), b;
          });
        }
      }
    },
    [t?.id]
  );
  Pe("*", c);
  const l = V(() => t ? el(t) : [], [t]), p = V(() => l.map((h) => {
    const f = n.get(h.stepId), g = i.get(h.stepId);
    return {
      ...h,
      resolvedPrompt: h.resolvedPrompt || f,
      outputContext: g ?? h.outputContext
    };
  }), [l, n, i]), u = V(() => r ? p.find((h) => h.stepId === r) ?? null : p[p.length - 1] ?? null, [p, r]), x = V(() => u ? new Set(u.newKeys) : /* @__PURE__ */ new Set(), [u]);
  return { enrichedSnapshots: p, activeSnapshot: u, newKeysSet: x };
}
function or({ attempt: t, label: r }) {
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
      /* @__PURE__ */ e(Et, { data: t.output, depth: 0 })
    ] })
  ] });
}
function nl({
  run: t,
  activeStepId: r,
  onStepSelect: n,
  editable: a = !1,
  onEditBufferChange: i,
  resetEditBufferKey: s
}) {
  const [d, c] = $("input"), [l, p] = $(0), [u, x] = $(!1), [h, f] = $({}), [g, m] = $(null), [v, N] = $({}), [y, k] = $({
    key: "",
    value: ""
  }), { enrichedSnapshots: b, activeSnapshot: w, newKeysSet: C } = tl(t, r), R = w?.resolvedPrompt != null, S = w?.stepExecution.attempts, A = (S?.length ?? 0) >= 2;
  Z(() => {
    d === "prompt" && !R && c("input"), d === "attempts" && !A && c("input");
  }, [d, R, A]), Z(() => {
    p(0);
  }, [r]);
  const M = !!(t && t.status === "paused_at_breakpoint" && r && (t.currentStepIds?.includes(r) || w?.stepExecution.status === "running" || w?.stepExecution.status === "awaiting" || w?.stepExecution.status === "pending")), P = !!a && !!M;
  Z(() => {
    P ? g && g !== r && (f({}), m(null), N({})) : (u && x(!1), Object.keys(h).length > 0 && f({}), g && m(null), Object.keys(v).length > 0 && N({}));
  }, [P, r]), Z(() => {
    s !== void 0 && (f({}), m(null), N({}), k({ key: "", value: "" }));
  }, [s]), Z(() => {
    !P || !r || i && (Object.keys(h).length === 0 ? i(r, null) : i(r, h));
  }, [h, P, r]);
  const U = E(
    (D, J) => {
      m(r), f((H) => D in H ? H : { ...H, [D]: J });
    },
    [r]
  ), W = E(
    (D, J) => {
      m(r), f((H) => ({ ...H, [D]: J })), N((H) => {
        if (!(D in H)) return H;
        const O = { ...H };
        return delete O[D], O;
      });
    },
    [r]
  ), oe = E((D) => {
    f((J) => {
      if (!(D in J)) return J;
      const H = { ...J };
      return delete H[D], H;
    }), N((J) => {
      if (!(D in J)) return J;
      const H = { ...J };
      return delete H[D], H;
    });
  }, []), ie = E((D, J) => {
    N((H) => ({ ...H, [D]: J }));
  }, []), ce = E(() => {
    f({}), m(null), N({}), k({ key: "", value: "" });
  }, []), j = E(() => {
    const D = y.key.trim();
    if (!D) return;
    let J = y.value;
    const H = y.value;
    if (H.trim().length > 0)
      try {
        J = JSON.parse(H);
      } catch {
        J = H;
      }
    W(D, J), k({ key: "", value: "" });
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
      w && w.stepId && /* @__PURE__ */ o("span", { className: "text-[10px] text-[#6c7086]", children: [
        "Step: ",
        w.stepId.slice(0, 8)
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "flex gap-0 border-b border-border shrink-0", children: [
      { id: "input", label: "Input Context", show: !0 },
      { id: "output", label: "Output", show: !0 },
      { id: "prompt", label: "Resolved Prompt", show: R },
      { id: "details", label: "Details", show: !0 },
      { id: "attempts", label: `Attempts (${S?.length})`, show: A }
    ].filter((D) => D.show).map((D) => /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "data-testid": D.id === "attempts" ? "attempts-tab" : void 0,
        className: I(
          "px-3.5 py-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer font-inherit uppercase tracking-wide border-b-2",
          d === D.id ? "text-primary border-b-primary" : "text-text-tertiary border-b-transparent"
        ),
        onClick: () => c(D.id),
        children: D.label
      },
      D.id
    )) }),
    /* @__PURE__ */ o("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
      /* @__PURE__ */ e(
        Gs,
        {
          snapshots: b,
          activeStepId: r,
          fallbackActiveStepId: w?.stepId,
          onStepSelect: n
        }
      ),
      /* @__PURE__ */ e("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs", children: w ? d === "input" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ o("div", { className: "text-[10px] text-[#6c7086] font-semibold uppercase", children: [
            "Input context",
            w.stepId ? ` — step ${w.stepId.slice(0, 8)}` : ""
          ] }),
          P && /* @__PURE__ */ o("div", { className: "flex gap-1.5 items-center", children: [
            u && Object.keys(h).length > 0 && /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: ce,
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
                  const D = !u;
                  x(D), D || ce();
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
        Object.keys(w.inputContext).length === 0 && !(P && u) ? /* @__PURE__ */ e("div", { className: "text-[#6c7086] text-xs italic", children: "No input context (first step or no upstream output)" }) : P && u ? /* @__PURE__ */ e(
          Xs,
          {
            inputContext: w.inputContext,
            buffer: h,
            parseErrors: v,
            newKeyDraft: y,
            setNewKeyDraft: k,
            onCommitNewKey: j,
            onBeginEditKey: U,
            onSetValue: W,
            onRemoveKey: oe,
            onParseError: ie
          }
        ) : /* @__PURE__ */ e(
          Et,
          {
            data: w.inputContext,
            highlightKeys: C
          }
        )
      ] }) : d === "output" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: [
          "Output",
          w.stepId ? ` — step ${w.stepId.slice(0, 8)}` : ""
        ] }),
        /* @__PURE__ */ e(Et, { data: w.output }),
        w.newKeys.length > 0 && /* @__PURE__ */ o("div", { className: "mt-3", children: [
          /* @__PURE__ */ e("div", { className: "text-[10px] text-[#a6e3a1] font-semibold uppercase mb-1", children: "New context keys added" }),
          /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: w.newKeys.map((D) => /* @__PURE__ */ e(
            "span",
            {
              className: "px-1.5 py-0.5 bg-[rgba(166,227,161,0.15)] text-[#a6e3a1] rounded-sm text-[11px] font-semibold font-mono",
              children: D
            },
            D
          )) })
        ] })
      ] }) : d === "prompt" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: "Resolved prompt template" }),
        /* @__PURE__ */ e("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: w.resolvedPrompt })
      ] }) : d === "details" ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: "Step execution details" }),
        /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
          w.stepExecution.startedAt && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Duration" }),
            /* @__PURE__ */ o("div", { className: "text-[11px] text-[#cdd6f4]", children: [
              "Started: ",
              w.stepExecution.startedAt,
              w.stepExecution.completedAt && /* @__PURE__ */ o(K, { children: [
                /* @__PURE__ */ e("br", {}),
                "Completed: ",
                w.stepExecution.completedAt,
                w.stepExecution.durationMs != null && /* @__PURE__ */ o(K, { children: [
                  /* @__PURE__ */ e("br", {}),
                  "Duration: ",
                  w.stepExecution.durationMs,
                  "ms"
                ] })
              ] })
            ] })
          ] }),
          w.stepExecution.llm && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "LLM Metrics" }),
            /* @__PURE__ */ o("div", { className: "text-[11px] text-[#cdd6f4]", children: [
              "Tokens in: ",
              w.stepExecution.llm.tokensIn,
              /* @__PURE__ */ e("br", {}),
              "Tokens out: ",
              w.stepExecution.llm.tokensOut,
              w.stepExecution.llm.firstTokenLatencyMs != null && /* @__PURE__ */ o(K, { children: [
                /* @__PURE__ */ e("br", {}),
                "First token latency: ",
                w.stepExecution.llm.firstTokenLatencyMs,
                "ms"
              ] })
            ] }),
            w.stepExecution.llm.response && /* @__PURE__ */ o(K, { children: [
              /* @__PURE__ */ e("div", { className: "text-[11px] text-[#89b4fa] font-semibold mt-2 mb-1", children: "Response Text" }),
              /* @__PURE__ */ e("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: w.stepExecution.llm.response })
            ] })
          ] }),
          w.stepExecution.error && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-[11px] text-[#f38ba8] font-semibold mb-1", children: "Error" }),
            /* @__PURE__ */ e("div", { className: "px-3 py-2.5 bg-[#1a0f14] border border-[#f38ba8] rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: /* @__PURE__ */ e("div", { className: "text-[#f38ba8] font-semibold mb-1", children: w.stepExecution.error }) })
          ] }),
          w.stepExecution.approvals && w.stepExecution.approvals.length > 0 && /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ o("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: [
              "Approvals (",
              w.stepExecution.approvals.length,
              ")"
            ] }),
            w.stepExecution.approvals.map((D, J) => /* @__PURE__ */ o("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2", children: [
              /* @__PURE__ */ o("div", { className: "flex gap-2 mb-1", children: [
                /* @__PURE__ */ e("span", { className: I(
                  "px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                  D.decision === "approve" ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
                ), children: D.decision.toUpperCase() }),
                /* @__PURE__ */ e("span", { className: "text-[11px] text-[#cdd6f4]", children: D.userId })
              ] }),
              D.comment && /* @__PURE__ */ o("div", { className: "text-[11px] text-[#9399b2] italic", children: [
                '"',
                D.comment,
                '"'
              ] }),
              /* @__PURE__ */ e("div", { className: "text-[10px] text-[#6c7086] mt-1", children: D.at })
            ] }, J))
          ] }),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Status" }),
            /* @__PURE__ */ e("div", { className: "text-[11px] text-[#cdd6f4]", children: w.stepExecution.status })
          ] })
        ] })
      ] }) : d === "attempts" && S && S.length >= 2 ? /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              "data-testid": "attempts-prev",
              disabled: l === 0,
              onClick: () => p((D) => D - 1),
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
                S.length
              ]
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              "data-testid": "attempts-next",
              disabled: l >= S.length - 2,
              onClick: () => p((D) => D + 1),
              className: I(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l >= S.length - 2 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "→"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ e(or, { attempt: S[l], label: `Attempt ${l + 1}` }),
          /* @__PURE__ */ e(or, { attempt: S[l + 1], label: `Attempt ${l + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function rl({
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
  onRevertPatch: x,
  onEditBufferChange: h
}) {
  const g = ft().runs[r.runId] ?? null, v = g?.steps?.[r.stepId]?.patches ?? [], N = !!i && s === r.stepId && Object.keys(i).length > 0, y = g?.status === "paused_at_breakpoint";
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
            Pt(t, r.stepId)
          ] }),
          N && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: u,
              disabled: n,
              "data-testid": "breakpoint-apply-continue-btn",
              className: I(
                "px-3 py-1 text-xs font-semibold bg-green-300 text-gray-900",
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
                "px-3 py-1 text-xs font-semibold bg-amber-600 text-white",
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
                "px-3 py-1 text-xs font-semibold bg-transparent text-amber-600",
                "border border-amber-600 rounded font-inherit",
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
                "px-3 py-1 text-xs font-semibold bg-transparent text-amber-600",
                "border border-amber-600 rounded font-inherit",
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
              /* @__PURE__ */ e("div", { className: "border border-border rounded-md bg-surface-inset overflow-hidden min-h-0", children: g ? /* @__PURE__ */ e(
                nl,
                {
                  run: g,
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
                    ) : /* @__PURE__ */ e("div", { className: "flex flex-col gap-2", children: v.map((k) => {
                      const b = !!k.revertedAt;
                      return /* @__PURE__ */ o(
                        "div",
                        {
                          "data-testid": `breakpoint-patch-row-${k.patchId}`,
                          className: I(
                            "border border-border rounded p-1.5",
                            b ? "bg-gray-500/10 opacity-60" : "bg-[#11111b]"
                          ),
                          children: [
                            /* @__PURE__ */ o("div", { className: "flex items-center gap-1 text-[10px] text-[#cdd6f4] mb-0.5", children: [
                              /* @__PURE__ */ e("span", { className: "font-mono", children: k.patchId.slice(0, 8) }),
                              k.unvalidated && /* @__PURE__ */ e(
                                "span",
                                {
                                  "data-testid": `breakpoint-patch-unvalidated-${k.patchId}`,
                                  title: "No validator was registered for this step's node type",
                                  className: "px-1 text-[9px] font-bold bg-orange-300/15 text-orange-300 rounded-sm",
                                  children: "⚠ Unvalidated"
                                }
                              ),
                              b && /* @__PURE__ */ e("span", { className: "px-1 text-[9px] font-bold bg-gray-500/20 text-gray-400 rounded-sm", children: "Reverted" })
                            ] }),
                            /* @__PURE__ */ o("div", { className: "text-[10px] text-[#9399b2]", children: [
                              k.appliedAt,
                              k.appliedBy && /* @__PURE__ */ o(K, { children: [
                                " · ",
                                /* @__PURE__ */ e("span", { className: "text-[#cdd6f4]", children: k.appliedBy })
                              ] })
                            ] }),
                            !b && /* @__PURE__ */ e(
                              "button",
                              {
                                type: "button",
                                "data-testid": `breakpoint-patch-revert-${k.patchId}`,
                                onClick: () => x(k.patchId),
                                disabled: !y || a === k.patchId,
                                title: y ? "Revert this patch" : "Run has progressed past this breakpoint — revert no longer allowed",
                                className: I(
                                  "mt-1 px-2 py-0.5 text-[10px] font-semibold bg-transparent rounded-sm font-inherit",
                                  y ? "text-red-400 border border-red-400 cursor-pointer" : "text-gray-700 border border-gray-700 cursor-not-allowed",
                                  a === k.patchId && "cursor-not-allowed"
                                ),
                                children: a === k.patchId ? "Reverting…" : "Revert"
                              }
                            )
                          ]
                        },
                        k.patchId
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
function be({ label: t, required: r, help: n, error: a, children: i, className: s }) {
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
function ol({ title: t, defaultCollapsed: r = !1, children: n, className: a }) {
  const [i, s] = $(r);
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
function Xe({ children: t, className: r }) {
  return /* @__PURE__ */ e("div", { className: I("flex flex-col gap-3 px-4 py-3", r), children: t });
}
const al = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function il(t, r, n) {
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
      const x = Number(u.trim());
      if (!Number.isFinite(x) || !Number.isInteger(x) || x < r || x > n) return null;
      l.has(x) || (l.add(x), p.push(x));
    }
    return p.length === 0 ? null : { match: p };
  }
  const d = Number(a);
  return !Number.isFinite(d) || !Number.isInteger(d) || d < r || d > n ? null : { match: [d] };
}
function sl(t) {
  if (typeof t != "string") return null;
  const r = t.trim().split(/\s+/);
  if (r.length !== 5) return null;
  const n = {};
  for (let a = 0; a < 5; a++) {
    const i = al[a], s = il(r[a], i.min, i.max);
    if (!s) return null;
    n[i.name] = s;
  }
  return n;
}
function gt(t, r, n) {
  return t.match === "*" ? !t.step || t.step === 1 ? !0 : (r - n) % t.step === 0 : t.match.includes(r);
}
function ll(t, r) {
  return gt(t.minute, r.getMinutes(), 0) && gt(t.hour, r.getHours(), 0) && gt(t.dayOfMonth, r.getDate(), 1) && gt(t.month, r.getMonth() + 1, 1) && gt(t.dayOfWeek, r.getDay(), 0);
}
function cl(t, r, n) {
  const a = [], i = new Date(r.getTime());
  i.setSeconds(0, 0), i.setMinutes(i.getMinutes() + 1);
  const s = 1440 * 366, d = new Date(i.getTime());
  for (let c = 0; c < s && a.length < n; c++)
    ll(t, d) && a.push(new Date(d.getTime())), d.setMinutes(d.getMinutes() + 1);
  return a;
}
const ar = /^[a-zA-Z0-9_-]{1,64}$/, dl = "http://localhost:13001";
function pl() {
  try {
    const t = localStorage.getItem("ws_document_types_v1");
    if (!t) return [];
    const r = JSON.parse(t);
    return Array.isArray(r) ? r.filter((n) => typeof n == "object" && n !== null).filter((n) => typeof n.id == "string" && typeof n.name == "string").map((n) => ({ id: n.id, name: n.name })) : [];
  } catch {
    return [];
  }
}
const ul = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function ml({ data: t, onChange: r }) {
  const { toast: n } = tn(), i = eo(Lo)?.definition?.triggerBinding?.webhookSecret, [s, d] = $(!1), c = t.triggerType.startsWith("document."), l = V(() => c ? pl() : [], [c]), p = c && !t.documentTypeId, u = t.triggerType === "schedule" && !t.schedule, x = t.triggerType === "webhook" && !t.webhookPath, h = t.webhookPath ?? "", f = t.triggerType === "webhook" && h.length > 0 && !ar.test(h), g = t.triggerType === "webhook" && ar.test(h) ? `${dl}/hooks/pipeline/${h}` : null, m = () => {
    g && navigator.clipboard.writeText(g).then(() => n("Webhook URL copied", { type: "success" })).catch(() => n("Could not copy webhook URL", { type: "error" }));
  }, v = () => {
    i && navigator.clipboard.writeText(i).then(() => n("Webhook secret copied", { type: "success" })).catch(() => n("Could not copy webhook secret", { type: "error" }));
  }, N = t.triggerType === "schedule" ? t.schedule ?? "" : "", y = V(
    () => N ? sl(N) : null,
    [N]
  ), k = V(() => y ? cl(y, /* @__PURE__ */ new Date(), 3) : [], [y]), b = t.triggerType === "schedule" && !!N && !y, w = t.triggerType === "document.finalize" ? "On finalize" : t.triggerType === "document.submit" ? "On submit for review" : t.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ e(be, { label: "Trigger type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.triggerType,
        onChange: (C) => r({ triggerType: C.target.value }),
        children: ul.map((C) => /* @__PURE__ */ e("option", { value: C.value, children: C.label }, C.value))
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
              onChange: (C) => r({ documentTypeId: C.target.value || void 0 }),
              children: [
                /* @__PURE__ */ e("option", { value: "", children: "— select a document type —" }),
                l.map((C) => /* @__PURE__ */ e("option", { value: C.id, children: C.name }, C.id))
              ]
            }
          ),
          w && /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary mt-1.5", children: [
            "Event: ",
            /* @__PURE__ */ e("span", { className: "font-semibold text-text-secondary", children: w })
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
              onChange: (C) => r({ schedule: C.target.value })
            }
          ),
          /* @__PURE__ */ e("div", { className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono", children: k.length > 0 ? /* @__PURE__ */ o(K, { children: [
            /* @__PURE__ */ e("div", { className: "text-text-secondary mb-1", children: "Next 3 fires:" }),
            k.map((C, R) => /* @__PURE__ */ e("div", { children: C.toLocaleString() }, R))
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
          error: x ? "Webhook path is required." : f ? "Path must be alphanumeric (plus _, -)" : void 0,
          help: !x && !f ? "Alphanumeric, _, or - (max 64 chars). No leading slash." : void 0,
          children: /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              className: I(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                x || f ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "weekly-digest",
              value: h,
              onChange: (C) => r({ webhookPath: C.target.value })
            }
          )
        }
      ),
      /* @__PURE__ */ e("div", { className: "p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: g ? /* @__PURE__ */ o(K, { children: [
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
        /* @__PURE__ */ e("div", { className: "mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: i ? /* @__PURE__ */ o(K, { children: [
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
const ir = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, hl = 3e4;
function fl(t) {
  return t < 1e3 ? `${Math.round(t)}ms` : t < 6e4 ? `${(t / 1e3).toFixed(t < 1e4 ? 1 : 0)}s` : `${Math.round(t / 6e4)}m`;
}
function xl(t) {
  const r = [];
  for (let n = 1; n < t.maxAttempts; n++) {
    const a = t.backoffMs * Math.pow(t.backoffMultiplier, n - 1);
    r.push(Math.min(a, hl));
  }
  return r;
}
function jn({ value: t, onChange: r }) {
  const n = t !== void 0, a = t ?? ir, i = n ? xl(a) : [], d = i.reduce((c, l) => c + l, 0) > 300 * 1e3;
  return /* @__PURE__ */ o("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "checkbox",
          checked: n,
          onChange: (c) => r(c.target.checked ? ir : void 0),
          "aria-label": "Enable retries"
        }
      ),
      "Retry policy"
    ] }),
    !n && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", children: "No retries — failure is terminal on first attempt." }),
    n && /* @__PURE__ */ o(K, { children: [
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
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: a.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : i.length === 0 ? `Retries up to ${a.maxAttempts}× with no delay.` : `Retries up to ${a.maxAttempts}× with delays: ${i.map(fl).join(", ")}.` }),
      d && /* @__PURE__ */ e("div", { className: "text-[11px] text-[#ca8a04] mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const sr = {
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
}, gl = [
  "context.doc.body",
  "context.doc.title",
  "context.trigger.userId",
  "context.steps"
], ho = {
  "context.doc.body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "context.doc.title": "Sample Document Title",
  "context.trigger.userId": "user_abc123",
  "context.steps": '["step-1: fetched document", "step-2: validated schema"]'
};
function lr(t) {
  return t.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (r, n) => ho[n] ?? `{{${n}}}`);
}
function bl({ data: t, onChange: r }) {
  const [n, a] = $(!1), i = !t.systemPrompt?.trim(), s = !t.userPromptTemplate?.trim(), d = (c) => {
    const l = sr[c], p = l.includes(t.model) ? t.model : l[0];
    r({ provider: c, model: p });
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
        onChange: (c) => r({ model: c.target.value }),
        children: sr[t.provider].map((c) => /* @__PURE__ */ e("option", { value: c, children: c }, c))
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
            onChange: (c) => r({ systemPrompt: c.target.value })
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
          On,
          {
            value: t.userPromptTemplate,
            onChange: (c) => r({ userPromptTemplate: c }),
            language: "template",
            variables: gl,
            minLines: 6,
            "aria-label": "User prompt template"
          }
        )
      }
    ),
    /* @__PURE__ */ o(ol, { title: "Advanced", defaultCollapsed: !0, children: [
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
                onChange: (c) => r({ temperature: parseFloat(c.target.value) }),
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
        jn,
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
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: lr(t.systemPrompt || "(empty)") })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: lr(t.userPromptTemplate || "(empty)") })
      ] }),
      /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary", children: [
        "Sample values: ",
        Object.keys(ho).map((c) => `{{${c}}}`).join(", ")
      ] })
    ] })
  ] });
}
const yl = ["context", "context.steps", "context.trigger"], vl = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function Nl({ data: t, onChange: r }) {
  const n = !t.expression?.trim();
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ e(be, { label: "Type", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: vl.map((a) => /* @__PURE__ */ o(
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
      be,
      {
        label: "Expression",
        required: !0,
        error: n ? "Expression is required." : void 0,
        help: n ? void 0 : t.transformType === "jsonpath" ? 'e.g. $.items[?(@.status == "active")]' : t.transformType === "template" ? "Mustache-style: {{ context.doc.title }}" : t.transformType === "javascript" ? "return ctx.items.filter(x => x.active)" : void 0,
        children: /* @__PURE__ */ e(
          On,
          {
            value: t.expression,
            onChange: (a) => r({ expression: a }),
            language: t.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: yl,
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
            onChange: (a) => r({ outputKey: a.target.value || void 0 }),
            placeholder: "activeItems"
          }
        )
      }
    ),
    /* @__PURE__ */ e(
      jn,
      {
        value: t.retryPolicy,
        onChange: (a) => r({ retryPolicy: a })
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
const wl = ["context.trigger", "context.steps"];
function kl({ data: t, onChange: r }) {
  const n = !t.expression?.trim();
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ e(
      be,
      {
        label: "Expression",
        required: !0,
        error: n ? "Expression is required." : void 0,
        help: n ? void 0 : "e.g. context.llm.response.length > 500",
        children: /* @__PURE__ */ e(
          On,
          {
            value: t.expression,
            onChange: (a) => r({ expression: a }),
            language: "javascript",
            variables: wl,
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
const Cl = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], Il = {
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
function Sl({ data: t, onChange: r }) {
  const n = Il[t.actionType], a = t.config ?? {}, i = typeof a.retryCount == "number" ? a.retryCount : 3, s = t.onError === "route-error" ? "route-error" : typeof a.retryCount == "number" ? "retry" : "halt", d = (l, p) => {
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
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ e(be, { label: "Action type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.actionType,
        onChange: (l) => r({ actionType: l.target.value, config: {} }),
        children: Cl.map((l) => /* @__PURE__ */ e("option", { value: l.value, children: l.label }, l.value))
      }
    ) }),
    /* @__PURE__ */ e(be, { label: "Configuration", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-2.5", children: n.map((l) => /* @__PURE__ */ o("div", { children: [
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
    t.idempotent && /* @__PURE__ */ o(be, { label: "Dedup scope", children: [
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
      jn,
      {
        value: t.retryPolicy,
        onChange: (l) => r({ retryPolicy: l })
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
              r({ onError: "fail-run", config: { ...a, retryCount: p } });
            }
          }
        ),
        "times"
      ] })
    ] }) })
  ] });
}
const Qe = 2, bt = 8;
function cr(t, r) {
  const n = t ?? [];
  return n.length === r ? n : n.length > r ? n.slice(0, r) : [...n, ...Array(r - n.length).fill("")];
}
function $l({ data: t, onChange: r }) {
  const n = Math.max(Qe, Math.min(bt, t.branchCount || Qe)), a = cr(t.branchLabels, n), i = (d) => {
    const c = Math.max(Qe, Math.min(bt, d));
    r({
      branchCount: c,
      branchLabels: cr(t.branchLabels, c)
    });
  }, s = (d, c) => {
    const l = [...a];
    l[d] = c, r({ branchLabels: l });
  };
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ o(
      be,
      {
        label: "Branch count",
        required: !0,
        help: `Between ${Qe} and ${bt} parallel branches.`,
        children: [
          /* @__PURE__ */ e("span", { className: "text-text-tertiary text-xs ml-2", children: n }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: Qe,
              max: bt,
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
              min: Qe,
              max: bt,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit mt-1",
              value: n,
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
const Tl = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], Al = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function Rl({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ o(be, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: Tl.map((n) => /* @__PURE__ */ o(
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
    /* @__PURE__ */ e(be, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: Al.map((n) => /* @__PURE__ */ o(
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
const Mt = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5
};
function Pl(t) {
  return !t || t <= 0 ? "minutes" : t % Mt.hours === 0 ? "hours" : t % Mt.minutes === 0 ? "minutes" : "seconds";
}
function Ml({ data: t, onChange: r }) {
  const n = t.approvers ?? [], a = n.length === 0, [i, s] = $(() => Pl(t.timeoutMs)), d = t.timeoutMs !== void 0 ? Math.round(t.timeoutMs / Mt[i]) : "", c = n.filter((f) => f.type === "user").map((f) => f.value), l = (f) => {
    const g = n.filter((N) => N.type === "role"), v = [...f.map((N) => ({ type: "user", value: N })), ...g];
    r({
      approvers: v,
      // Clamp requiredCount so it never exceeds approvers.length (min 1).
      requiredCount: Math.max(1, Math.min(t.requiredCount || 1, v.length || 1))
    });
  }, p = (f) => {
    const g = n.filter((m, v) => v !== f);
    r({
      approvers: g,
      requiredCount: Math.max(1, Math.min(t.requiredCount || 1, g.length || 1))
    });
  }, u = (f) => {
    if (f === "") {
      r({ timeoutMs: void 0 });
      return;
    }
    const g = Math.max(0, parseInt(f, 10) || 0);
    r({ timeoutMs: g * Mt[i] });
  }, x = (f) => {
    s(f), typeof d == "number" && !Number.isNaN(d) && r({ timeoutMs: d * Mt[f] });
  }, h = Math.max(1, n.length);
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
            ma,
            {
              value: c,
              onChange: l,
              placeholder: "Add approver…"
            }
          ),
          n.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 mt-2", children: n.map((f, g) => /* @__PURE__ */ o(
            "span",
            {
              className: I(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-[1.4] whitespace-nowrap",
                f.type === "role" ? "bg-[#fffbeb] text-[#d97706]" : "bg-[#eff6ff] text-[#2563eb]"
              ),
              children: [
                f.type === "role" ? "🎖" : "👤",
                " ",
                f.value,
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    onClick: () => p(g),
                    "aria-label": `Remove ${f.value}`,
                    className: "bg-transparent border-none p-0 ml-0.5 cursor-pointer text-current font-inherit text-xs leading-none",
                    children: "×"
                  }
                )
              ]
            },
            `${f.type}:${f.value}:${g}`
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
              onChange: (f) => {
                const g = parseInt(f.target.value, 10), m = Math.max(1, Math.min(h, Number.isNaN(g) ? 1 : g));
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
    /* @__PURE__ */ o(be, { label: "Timeout", help: "Leave blank for no timeout.", children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "number",
            min: 0,
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-24 flex-none font-inherit",
            value: d,
            onChange: (f) => u(f.target.value),
            placeholder: "24"
          }
        ),
        /* @__PURE__ */ o(
          "select",
          {
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-[120px] flex-none font-inherit",
            value: i,
            onChange: (f) => x(f.target.value),
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
        /* @__PURE__ */ e("div", { className: "flex gap-3 mt-1", children: ["reject", "approve"].map((f) => /* @__PURE__ */ o(
          "label",
          {
            className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
            children: [
              /* @__PURE__ */ e(
                "input",
                {
                  type: "radio",
                  name: "approval-timeout-action",
                  checked: (t.timeoutAction ?? "reject") === f,
                  onChange: () => r({ timeoutAction: f })
                }
              ),
              f === "reject" ? "Reject" : "Approve"
            ]
          },
          f
        )) })
      ] })
    ] }),
    /* @__PURE__ */ e(be, { label: "Message for approver (optional)", help: "Shown to the approver when the request is sent.", children: /* @__PURE__ */ e(
      "textarea",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]",
        value: t.message ?? "",
        onChange: (f) => r({ message: f.target.value || void 0 }),
        placeholder: "Please review the summary before it's posted to the document."
      }
    ) })
  ] });
}
function Tn(t) {
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
function fo(t) {
  const r = Array.isArray(t.type) ? t.type[0] : t.type;
  if (r === "array") {
    const n = t.items ? Array.isArray(t.items.type) ? t.items.type[0] : t.items.type : void 0;
    return n ? `array of ${n}` : "array";
  }
  return r ?? "unknown";
}
function Dt(t, r, n, a, i) {
  if (i.has(t)) return;
  i.add(t);
  const s = Array.isArray(t.type) ? t.type[0] : t.type, d = [t.anyOf, t.oneOf, t.allOf].filter(Boolean);
  for (const c of d)
    for (const l of c)
      Dt(l, r, n, a, i);
  if (s === "object" && t.properties) {
    for (const [c, l] of Object.entries(t.properties)) {
      const p = `${r}.${c}`, u = Tn(l);
      a.push({
        path: p,
        label: `${c} (${fo(l)})`,
        depth: n,
        kind: u,
        isArrayItems: u === "array"
      }), Dt(l, p, n + 1, a, i);
    }
    return;
  }
  if (s === "array") {
    const c = `${r}[*]`, l = t.items, p = l ? Tn(l) : "unknown";
    a.push({
      path: c,
      label: `${r.slice(r.lastIndexOf(".") + 1)}[*] (each item)`,
      depth: n,
      kind: p,
      isArrayItems: !0
    }), l && Dt(l, c, n + 1, a, i);
  }
}
function Dl(t, r = "$") {
  if (!t || typeof t != "object") return [];
  const n = [], a = /* @__PURE__ */ new Set();
  if ((Array.isArray(t.type) ? t.type[0] : t.type) === "object" && t.properties)
    for (const [s, d] of Object.entries(t.properties)) {
      const c = `${r}.${s}`, l = Tn(d);
      n.push({
        path: c,
        label: `${s} (${fo(d)})`,
        depth: 0,
        kind: l,
        isArrayItems: l === "array"
      }), Dt(d, c, 1, n, a);
    }
  else
    Dt(t, r, 0, n, a);
  return n;
}
const El = {};
function _l() {
  return `${(typeof import.meta < "u" && El?.VITE_SOCIAL_API_URL) ?? ""}/api/pipeline/output-schemas`;
}
let ln = null, yt = null;
async function Ol() {
  return ln || (yt || (yt = fetch(_l()).then((t) => {
    if (!t.ok) throw new Error(`HTTP ${t.status}`);
    return t.json();
  }).then((t) => (ln = t, yt = null, t)).catch((t) => {
    throw yt = null, t;
  })), yt);
}
const Ll = {
  array: "bg-indigo-50 text-indigo-700 border-indigo-200",
  object: "bg-slate-50 text-slate-600 border-slate-200",
  string: "bg-emerald-50 text-emerald-700 border-emerald-200",
  number: "bg-amber-50 text-amber-700 border-amber-200",
  boolean: "bg-pink-50 text-pink-700 border-pink-200",
  unknown: "bg-slate-50 text-slate-400 border-slate-200"
};
function Bl({ kind: t }) {
  return /* @__PURE__ */ e(
    "span",
    {
      className: I(
        "inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4",
        Ll[t]
      ),
      children: t
    }
  );
}
function Fl({ entry: t, isSelected: r, onPick: n }) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      onClick: () => n(t.path),
      "data-testid": `path-row-${t.path}`,
      className: I(
        "w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors duration-100",
        "hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400/50",
        r && "bg-indigo-50 ring-1 ring-inset ring-indigo-300",
        t.isArrayItems && !r && "hover:bg-indigo-50"
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
        /* @__PURE__ */ e(Bl, { kind: t.kind })
      ]
    }
  );
}
function Ul({
  value: t,
  onChange: r,
  upstreamKind: n,
  upstreamSchema: a
}) {
  const [i, s] = $("idle"), [d, c] = $(null), l = ae(!0);
  Z(() => (l.current = !0, () => {
    l.current = !1;
  }), []);
  const p = V(() => a !== void 0 ? a : d, [a, d]);
  Z(() => {
    !n || a !== void 0 || (s("loading"), Ol().then((m) => {
      if (!l.current) return;
      const v = m.schemas[n] ?? null;
      c(v), s("done");
    }).catch(() => {
      l.current && s("error");
    }));
  }, [n, a]);
  const u = V(
    () => Dl(p),
    [p]
  ), x = p !== null && u.length > 0, h = E(
    (m) => {
      r(m);
    },
    [r]
  );
  if (!n && a === void 0)
    return /* @__PURE__ */ e(
      nn,
      {
        value: t,
        onChange: r,
        enforcePrefix: !0,
        "data-testid": "scatter-path-plain-input"
      }
    );
  if (!x)
    return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
      i === "loading" && /* @__PURE__ */ o("p", { className: "text-[11px] text-slate-400 leading-4", children: [
        "Loading schema for ",
        n,
        "…"
      ] }),
      i === "error" && /* @__PURE__ */ e("p", { className: "text-[11px] text-amber-600 leading-4", children: "Could not load schema — enter path manually." }),
      (i === "done" || a === null) && /* @__PURE__ */ o("p", { className: "text-[11px] text-slate-400 leading-4", children: [
        "Schema unavailable for ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: n }),
        " — enter path manually."
      ] }),
      /* @__PURE__ */ e(
        nn,
        {
          value: t,
          onChange: r,
          enforcePrefix: !0,
          "data-testid": "scatter-path-fallback-input"
        }
      )
    ] });
  const g = u.filter((m) => m.isArrayItems).length < u.length;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("p", { className: "text-[11px] text-slate-500 leading-4", children: [
      "Click a path to set itemsPath.",
      g && /* @__PURE__ */ o(K, { children: [
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
          Fl,
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
      nn,
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
const cn = "text-[12px] font-semibold text-text-secondary", dn = "text-[11px] text-text-tertiary mt-0.5", jl = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary";
function zl(t) {
  const { definition: r } = Ye();
  return V(() => {
    if (!t || !r) return;
    const n = r.edges.find((i) => i.target === t);
    if (!n) return;
    const a = r.nodes.find((i) => i.id === n.source);
    if (a)
      return a.type;
  }, [t, r]);
}
function ql({ data: t, onChange: r }) {
  const { selectedNodeId: n } = Ye(), a = zl(n), i = t.maxConcurrency ?? "";
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { className: cn, children: [
        "Items path",
        /* @__PURE__ */ e("span", { className: "text-red-600 ml-1", "aria-hidden": !0, children: "*" })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-1", children: /* @__PURE__ */ e(
        Ul,
        {
          value: t.itemsPath ?? "",
          onChange: (s) => r({ itemsPath: s }),
          upstreamKind: a
        }
      ) }),
      !t.itemsPath?.trim() && /* @__PURE__ */ e("div", { role: "alert", className: "text-[11px] text-red-600 mt-0.5", children: "Items path is required." }),
      !!t.itemsPath && !t.itemsPath.startsWith("$.") && /* @__PURE__ */ o("div", { role: "alert", className: "text-[11px] text-red-600 mt-0.5", children: [
        "Path must start with ",
        /* @__PURE__ */ e("code", { children: "$." })
      ] }),
      !!t.itemsPath?.startsWith("$.") && /* @__PURE__ */ e("div", { className: dn, children: "JSONPath into context resolving to an array. Each element becomes one scatter arm." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-item-alias", className: cn, children: [
        "Item alias ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, default: item)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "scatter-item-alias",
          type: "text",
          spellCheck: !1,
          className: jl,
          value: t.itemAlias ?? "",
          onChange: (s) => r({ itemAlias: s.target.value.trim() || void 0 }),
          placeholder: "item"
        }
      ),
      /* @__PURE__ */ o("div", { className: dn, children: [
        "Key written to ",
        /* @__PURE__ */ e("code", { children: "$.scatter.<alias>" }),
        " for each arm."
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-max-concurrency", className: cn, children: [
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
      /* @__PURE__ */ e("div", { className: dn, children: "Maximum number of arms executing concurrently." })
    ] })
  ] });
}
const Vl = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Wl({ samples: t, onSelect: r }) {
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
const Hl = ["cover", "contain", "fill", "inside", "outside"], vt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", Nt = "text-[12px] font-semibold text-text-secondary", dr = "text-[11px] text-text-tertiary mt-0.5";
function Jl({ data: t, onChange: r }) {
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
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Wl, { samples: Vl, onSelect: (n) => r({ sourceImagePath: n }) })
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
            onChange: (n) => {
              const a = parseInt(n.target.value, 10);
              r({ width: Number.isFinite(a) && a > 0 ? a : void 0 });
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
      /* @__PURE__ */ e("label", { htmlFor: "resize-fit", className: Nt, children: "Fit mode" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "resize-fit",
          className: vt,
          value: t.fit ?? "cover",
          onChange: (n) => r({ fit: n.target.value }),
          children: Hl.map((n) => /* @__PURE__ */ e("option", { value: n, children: n }, n))
        }
      ),
      /* @__PURE__ */ o("div", { className: dr, children: [
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
          onChange: (n) => r({ background: n.target.value.trim() || void 0 }),
          placeholder: "#ffffff"
        }
      ),
      /* @__PURE__ */ o("div", { className: dr, children: [
        "Hex colour used to fill letterbox padding. Only applies when fit is ",
        /* @__PURE__ */ e("code", { children: "contain" }),
        " or ",
        /* @__PURE__ */ e("code", { children: "fill" }),
        "."
      ] })
    ] })
  ] });
}
const Gl = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Kl({ samples: t, onSelect: r }) {
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
function Yl(t) {
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
const An = "text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", Xl = "flex-1 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", pr = "text-[12px] font-semibold text-text-secondary", Ql = "text-[11px] text-text-tertiary mt-0.5";
function Zl({ op: t, index: r, onUpdate: n, onRemove: a }) {
  return /* @__PURE__ */ o("div", { className: "border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2", "data-testid": `geo-op-card-${r}`, children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary font-semibold min-w-[20px]", children: [
        r + 1,
        "."
      ] }),
      /* @__PURE__ */ o(
        "select",
        {
          className: Xl,
          value: t.op,
          onChange: (i) => n(Yl(i.target.value)),
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
          className: "ml-auto text-[11px] font-semibold bg-transparent text-red-600 border border-transparent rounded px-2 py-0.5 cursor-pointer hover:bg-red-50",
          "aria-label": `Remove op ${r + 1}`,
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
            className: `${An} w-24`,
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
            className: `${An} flex-1`,
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
function ec({ data: t, onChange: r }) {
  const n = t.operations ?? [], a = (d, c) => {
    r({ operations: n.map((l, p) => p === d ? c : l) });
  }, i = (d) => {
    r({ operations: n.filter((c, l) => l !== d) });
  }, s = () => {
    r({ operations: [...n, { op: "rotate", degrees: 90 }] });
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "transform-geo-source-image-path", className: pr, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "transform-geo-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `mt-1 w-full ${An}`,
          value: t.sourceImagePath ?? "",
          onChange: (d) => r({ sourceImagePath: d.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Kl, { samples: Gl, onSelect: (d) => r({ sourceImagePath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${pr} mb-2`, children: [
        "Operations ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      n.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-2 italic", children: "No operations — add at least one." }),
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: n.map((d, c) => /* @__PURE__ */ e(
        Zl,
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
      /* @__PURE__ */ e("div", { className: `${Ql} mt-1.5`, children: "Supported: Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror)." })
    ] })
  ] });
}
const tc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function nc({ samples: t, onSelect: r }) {
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
const rc = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "avif", label: "AVIF" }
], Rn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", oc = `${Rn} font-mono`, pn = "text-[12px] font-semibold text-text-secondary", un = "text-[11px] text-text-tertiary mt-0.5";
function ac({ data: t, onChange: r }) {
  const n = t.format === "jpeg" || t.format === "webp" || t.format === "avif";
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-source-image-path", className: pn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "format-convert-source-image-path",
          type: "text",
          spellCheck: !1,
          className: oc,
          value: t.sourceImagePath ?? "",
          onChange: (a) => r({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(nc, { samples: tc, onSelect: (a) => r({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "format-convert-format", className: pn, children: "Output format" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "format-convert-format",
          className: Rn,
          value: t.format ?? "jpeg",
          onChange: (a) => r({ format: a.target.value }),
          children: rc.map((a) => /* @__PURE__ */ e("option", { value: a.value, children: a.label }, a.value))
        }
      )
    ] }),
    n && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-quality", className: pn, children: [
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
          className: Rn,
          value: t.quality ?? 80,
          onChange: (a) => {
            const i = parseInt(a.target.value, 10);
            r({ quality: Number.isFinite(i) ? Math.min(100, Math.max(1, i)) : 80 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: un, children: "Higher = better quality, larger file. 80 is a good default." })
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
      /* @__PURE__ */ e("div", { className: un, children: "Overrides quality when enabled. Produces larger files with no compression artefacts." })
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
      /* @__PURE__ */ e("div", { className: un, children: "Removes camera EXIF, GPS, copyright tags etc. Reduces file size; recommended for web delivery." })
    ] })
  ] });
}
const ic = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function sc({ samples: t, onSelect: r }) {
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
const Ft = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Ut = "text-[12px] font-semibold text-text-secondary", mn = "text-[11px] text-text-tertiary mt-0.5";
function lc({ data: t, onChange: r }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-source-image-path", className: Ut, children: [
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
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(sc, { samples: ic, onSelect: (n) => r({ sourceImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-sigma", className: Ut, children: [
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
          onChange: (n) => {
            const a = parseFloat(n.target.value);
            r({ sigma: Number.isFinite(a) && a > 0 ? a : void 0 });
          },
          placeholder: "1"
        }
      ),
      /* @__PURE__ */ e("div", { className: mn, children: "Gaussian mask sigma. Higher = broader/stronger sharpening. Typical range: 0.5–3." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-m1", className: Ut, children: [
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
          onChange: (n) => {
            const a = parseFloat(n.target.value);
            r({ m1: Number.isFinite(a) && a >= 0 ? a : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: mn, children: "Level of sharpening applied to flat (smooth) areas of the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-m2", className: Ut, children: [
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
          onChange: (n) => {
            const a = parseFloat(n.target.value);
            r({ m2: Number.isFinite(a) && a >= 0 ? a : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: mn, children: "Level of sharpening applied to jagged (edge) areas of the image." })
    ] })
  ] });
}
const cc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function dc({ samples: t, onSelect: r }) {
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
const pc = [
  "northwest",
  "north",
  "northeast",
  "west",
  "center",
  "east",
  "southwest",
  "south",
  "southeast"
], It = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", ur = `${It} font-mono`, ot = "text-[12px] font-semibold text-text-secondary", mr = "text-[11px] text-text-tertiary mt-0.5";
function uc({ data: t, onChange: r }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "watermark-source-image-path", className: ot, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-source-image-path",
          type: "text",
          spellCheck: !1,
          className: ur,
          value: t.sourceImagePath ?? "",
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(dc, { samples: cc, onSelect: (n) => r({ sourceImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-overlay-image-id", className: ot, children: "Overlay image ID" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-overlay-image-id",
          type: "text",
          spellCheck: !1,
          className: ur,
          value: t.overlayImageId ?? "",
          onChange: (n) => r({ overlayImageId: n.target.value.trim() }),
          placeholder: "img_xxxxxxxx"
        }
      ),
      /* @__PURE__ */ e("div", { className: mr, children: "The imageId of the watermark/overlay image already stored in the blob store. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-gravity", className: ot, children: "Gravity (placement)" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "watermark-gravity",
          className: It,
          value: t.gravity ?? "southeast",
          onChange: (n) => r({ gravity: n.target.value }),
          children: pc.map((n) => /* @__PURE__ */ e("option", { value: n, children: n }, n))
        }
      ),
      /* @__PURE__ */ e("div", { className: mr, children: "Where the overlay is placed on the source image. Default: southeast." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "watermark-opacity", className: ot, children: [
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
          onChange: (n) => {
            const a = parseFloat(n.target.value);
            r({ opacity: Number.isFinite(a) ? Math.min(1, Math.max(0, a)) : 1 });
          }
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "watermark-offset-x", className: ot, children: "Offset X (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "watermark-offset-x",
            type: "number",
            step: 1,
            className: It,
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
        /* @__PURE__ */ e("label", { htmlFor: "watermark-offset-y", className: ot, children: "Offset Y (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "watermark-offset-y",
            type: "number",
            step: 1,
            className: It,
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
const mc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
], hc = [
  "$.scatter.item.bbox",
  "$.steps.visionAnalyze.output.extracted.regions[0].bbox",
  "$.trigger.payload.bbox"
];
function hr({ samples: t, onSelect: r }) {
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
const fr = "mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", xr = "text-[12px] font-semibold text-text-secondary", hn = "text-[11px] text-text-tertiary mt-0.5";
function fc({ data: t, onChange: r }) {
  const n = t.materialize !== !1;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-source-image-path", className: xr, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "crop-source-image-path",
          type: "text",
          spellCheck: !1,
          className: fr,
          value: t.sourceImagePath ?? "",
          onChange: (a) => r({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ o("div", { className: hn, children: [
        "JSONPath to the imageId of the source image. Defaults server-side to",
        " ",
        /* @__PURE__ */ e("code", { children: "$.scatter.parentImageId" }),
        "."
      ] }),
      /* @__PURE__ */ e(hr, { samples: mc, onSelect: (a) => r({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-bbox-path", className: xr, children: [
        "Bounding-box path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "crop-bbox-path",
          type: "text",
          spellCheck: !1,
          className: fr,
          value: t.bboxPath ?? "",
          onChange: (a) => r({ bboxPath: a.target.value.trim() || void 0 }),
          placeholder: "$.scatter.item.bbox"
        }
      ),
      /* @__PURE__ */ o("div", { className: hn, children: [
        "JSONPath to a bbox object ",
        /* @__PURE__ */ e("code", { children: "{ x, y, width, height }" }),
        " in pixels."
      ] }),
      /* @__PURE__ */ e(hr, { samples: hc, onSelect: (a) => r({ bboxPath: a }) })
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
              checked: n,
              onChange: (a) => r({ materialize: a.target.checked }),
              className: "w-3.5 h-3.5 accent-primary"
            }
          ),
          "Persist crop to blob store"
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: hn, children: "When enabled (default), the cropped image is saved to the ImageBlobStore." })
  ] });
}
const xc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function gc({ samples: t, onSelect: r }) {
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
const gr = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", fn = "text-[12px] font-semibold text-text-secondary", xn = "text-[11px] text-text-tertiary mt-0.5";
function bc({ data: t, onChange: r }) {
  const n = t.algorithm ?? "luminosity", a = t.contrast ?? 1;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-bw-source-image-path", className: fn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "adjust-bw-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `${gr} font-mono`,
          value: t.sourceImagePath ?? "",
          onChange: (i) => r({ sourceImagePath: i.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: xn, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(gc, { samples: xc, onSelect: (i) => r({ sourceImagePath: i }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "adjust-bw-algorithm", className: fn, children: "Greyscale algorithm" }),
      /* @__PURE__ */ o(
        "select",
        {
          id: "adjust-bw-algorithm",
          className: gr,
          value: n,
          onChange: (i) => r({ algorithm: i.target.value }),
          children: [
            /* @__PURE__ */ e("option", { value: "luminosity", children: "Luminosity — 0.21R + 0.72G + 0.07B (perceptually accurate)" }),
            /* @__PURE__ */ e("option", { value: "average", children: "Average — (R+G+B)/3 (fast, flat)" }),
            /* @__PURE__ */ e("option", { value: "desaturate", children: "Desaturate — (max+min)/2 (Lightness channel)" })
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: xn, children: "Controls how RGB channels are weighted when converting to greyscale." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-bw-contrast", className: fn, children: [
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
      /* @__PURE__ */ o("div", { className: xn, children: [
        "Applied after greyscale conversion. 1 = no change, ",
        "<",
        "1 = lower contrast,",
        " >",
        "1 = higher contrast. Range 0–4."
      ] })
    ] })
  ] });
}
const yc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function vc({ samples: t, onSelect: r }) {
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
const br = {
  brightness: "Brightness",
  contrast: "Contrast",
  saturation: "Saturation",
  hue: "Hue",
  blur: "Blur"
};
function xo(t) {
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
const jt = "text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary";
function Nc({ layer: t, index: r, onUpdate: n, onRemove: a }) {
  const i = (c) => {
    const l = c.target.value;
    n(xo(l));
  };
  let s;
  switch (t.kind) {
    case "brightness":
    case "contrast":
    case "saturation":
      s = /* @__PURE__ */ e(
        "input",
        {
          type: "number",
          min: 0,
          max: 4,
          step: 0.05,
          className: `${jt} w-24`,
          value: t.value,
          onChange: (c) => {
            const l = parseFloat(c.target.value);
            n({ kind: t.kind, value: Number.isFinite(l) ? Math.max(0, l) : 1 });
          },
          "aria-label": `${t.kind} value`
        }
      );
      break;
    case "hue":
      s = /* @__PURE__ */ e(
        "input",
        {
          type: "number",
          min: -360,
          max: 360,
          step: 1,
          className: `${jt} w-24`,
          value: t.degrees,
          onChange: (c) => {
            const l = parseFloat(c.target.value);
            n({ kind: "hue", degrees: Number.isFinite(l) ? l : 0 });
          },
          "aria-label": "hue degrees"
        }
      );
      break;
    case "blur":
      s = /* @__PURE__ */ e(
        "input",
        {
          type: "number",
          min: 0,
          max: 50,
          step: 0.5,
          className: `${jt} w-24`,
          value: t.radiusPx,
          onChange: (c) => {
            const l = parseFloat(c.target.value);
            n({ kind: "blur", radiusPx: Number.isFinite(l) ? Math.max(0, l) : 1 });
          },
          "aria-label": "blur radius px"
        }
      );
      break;
  }
  const d = t.kind === "hue" ? "°" : t.kind === "blur" ? "px" : "×";
  return /* @__PURE__ */ o("div", { className: "border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2", "data-testid": `layer-card-${r}`, children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary font-semibold min-w-[20px]", children: [
        r + 1,
        "."
      ] }),
      /* @__PURE__ */ e(
        "select",
        {
          className: `${jt} flex-1`,
          value: t.kind,
          onChange: i,
          "aria-label": `Layer ${r + 1} kind`,
          children: Object.keys(br).map((c) => /* @__PURE__ */ e("option", { value: c, children: br[c] }, c))
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: a,
          className: "ml-auto text-[11px] font-semibold bg-transparent text-red-600 border border-transparent rounded px-2 py-0.5 cursor-pointer hover:bg-red-50",
          "aria-label": `Remove layer ${r + 1}`,
          children: "✕"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      s,
      /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: d })
    ] })
  ] });
}
const yr = "text-[12px] font-semibold text-text-secondary", wc = "text-[11px] text-text-tertiary mt-0.5";
function kc({ data: t, onChange: r }) {
  const n = t.layers ?? [], a = (d, c) => {
    const l = n.map((p, u) => u === d ? c : p);
    r({ layers: l });
  }, i = (d) => {
    r({ layers: n.filter((c, l) => l !== d) });
  }, s = () => {
    r({ layers: [...n, xo("brightness")] });
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-layer-source-image-path", className: yr, children: [
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
      /* @__PURE__ */ e("div", { className: wc, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(vc, { samples: yc, onSelect: (d) => r({ sourceImagePath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${yr} mb-2`, children: [
        "Adjustment layers ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      n.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-2 italic", children: "No layers configured — add at least one." }),
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: n.map((d, c) => /* @__PURE__ */ e(
        Nc,
        {
          layer: d,
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
          "data-testid": "add-layer-btn",
          children: "+ Add layer"
        }
      )
    ] })
  ] });
}
const vr = 50;
function Cc(t, r) {
  const [n, a] = $(t), [i, s] = $([]), [d, c] = $([]), l = ae(n);
  l.current = n;
  const p = E(
    (N) => {
      a((y) => {
        const k = N(y);
        return s((b) => {
          const w = [...b, y];
          return w.length > vr && w.shift(), w;
        }), c([]), r(k), k;
      });
    },
    [r]
  ), u = E(
    (N) => {
      p((y) => [...y, N]);
    },
    [p]
  ), x = E(
    (N, y, k) => {
      p(
        (b) => b.map((w) => w.id === N ? { ...w, x: y, y: k } : w)
      );
    },
    [p]
  ), h = E(
    (N, y, k, b, w) => {
      p(
        (C) => C.map((R) => R.id === N ? { ...R, x: y, y: k, width: b, height: w } : R)
      );
    },
    [p]
  ), f = E(
    (N, y) => {
      p(
        (k) => k.map((b) => b.id === N ? { ...b, label: y } : b)
      );
    },
    [p]
  ), g = E(
    (N) => {
      p((y) => y.filter((k) => k.id !== N));
    },
    [p]
  ), m = E(() => {
    s((N) => {
      if (N.length === 0) return N;
      const y = N[N.length - 1];
      c((b) => [...b, l.current]);
      const k = y;
      return a(k), r(k), N.slice(0, -1);
    });
  }, [r]), v = E(() => {
    c((N) => {
      if (N.length === 0) return N;
      const y = N[N.length - 1];
      s((b) => {
        const w = [...b, l.current];
        return w.length > vr && w.shift(), w;
      });
      const k = y;
      return a(k), r(k), N.slice(0, -1);
    });
  }, [r]);
  return {
    boxes: n,
    addBox: u,
    moveBox: x,
    resizeBox: h,
    setLabel: f,
    deleteBox: g,
    undo: m,
    redo: v,
    canUndo: i.length > 0,
    canRedo: d.length > 0
  };
}
function Ic() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Ne(t, r, n) {
  return Math.max(r, Math.min(n, t));
}
function gn(t, r) {
  const n = r.getBoundingClientRect();
  return {
    x: Ne(t.clientX - n.left, 0, n.width),
    y: Ne(t.clientY - n.top, 0, n.height)
  };
}
function bn(t, r, n, a, i, s) {
  const d = i / n, c = s / a;
  return { x: t * d, y: r * c };
}
function Nr(t, r, n) {
  return {
    left: `${t.x / r * 100}%`,
    top: `${t.y / n * 100}%`,
    width: `${t.width / r * 100}%`,
    height: `${t.height / n * 100}%`
  };
}
function Sc(t, r, n) {
  for (let a = n.length - 1; a >= 0; a--) {
    const i = n[a];
    if (t >= i.x && t <= i.x + i.width && r >= i.y && r <= i.y + i.height)
      return i;
  }
  return null;
}
function $c({
  imageUrl: t,
  imageWidth: r,
  imageHeight: n,
  boxes: a,
  onChange: i,
  readOnly: s = !1,
  className: d
}) {
  const c = ae(null), [l, p] = $({ kind: "idle" }), [u, x] = $(null), h = ae(null), { addBox: f, moveBox: g, resizeBox: m, setLabel: v, deleteBox: N } = Cc(
    a,
    i
  );
  Z(() => {
    u && h.current && (h.current.focus(), h.current.select());
  }, [u]);
  const y = E(
    (j) => {
      if (s || j.button !== 0) return;
      const D = c.current;
      if (!D) return;
      j.preventDefault(), D.setPointerCapture(j.pointerId);
      const { x: J, y: H } = gn(j, D), O = D.getBoundingClientRect(), { x: z, y: q } = bn(
        J,
        H,
        O.width,
        O.height,
        r,
        n
      ), G = Sc(z, q, a);
      p(G ? {
        kind: "move",
        id: G.id,
        offsetX: z - G.x,
        offsetY: q - G.y,
        currentX: z,
        currentY: q
      } : { kind: "create", startX: z, startY: q, currentX: z, currentY: q });
    },
    [s, a, r, n]
  ), k = E(
    (j, D, J) => {
      if (s) return;
      j.stopPropagation(), j.preventDefault();
      const H = c.current;
      if (!H) return;
      H.setPointerCapture(j.pointerId);
      const { x: O, y: z } = gn(j, H), q = H.getBoundingClientRect(), { x: G, y: de } = bn(O, z, q.width, q.height, r, n);
      p({ kind: "resize", id: D.id, corner: J, origBox: { ...D }, currentX: G, currentY: de });
    },
    [s, r, n]
  ), b = E(
    (j) => {
      if (l.kind === "idle") return;
      const D = c.current;
      if (!D) return;
      const { x: J, y: H } = gn(j, D), O = D.getBoundingClientRect(), { x: z, y: q } = bn(J, H, O.width, O.height, r, n);
      l.kind === "create" ? p((G) => G.kind === "create" ? { ...G, currentX: z, currentY: q } : G) : l.kind === "move" ? p((G) => G.kind === "move" ? { ...G, currentX: z, currentY: q } : G) : l.kind === "resize" && p((G) => G.kind === "resize" ? { ...G, currentX: z, currentY: q } : G);
    },
    [l.kind, r, n]
  ), w = E(
    (j) => {
      if (l.kind === "create") {
        const D = Math.min(l.startX, l.currentX), J = Math.min(l.startY, l.currentY), H = Math.max(l.startX, l.currentX), O = Math.max(l.startY, l.currentY), z = H - D, q = O - J;
        z >= 4 && q >= 4 && f({ id: Ic(), x: D, y: J, width: z, height: q });
      } else if (l.kind === "move") {
        const D = a.find((J) => J.id === l.id);
        if (D) {
          const J = Ne(l.currentX - l.offsetX, 0, r - D.width), H = Ne(l.currentY - l.offsetY, 0, n - D.height);
          g(l.id, J, H);
        }
      } else if (l.kind === "resize") {
        const { id: D, corner: J, origBox: H, currentX: O, currentY: z } = l;
        let { x: q, y: G, width: de, height: F } = H;
        if (J === "nw") {
          const re = Ne(O, 0, q + de - 4), ye = Ne(z, 0, G + F - 4);
          de = q + de - re, F = G + F - ye, q = re, G = ye;
        } else if (J === "ne") {
          const re = Ne(z, 0, G + F - 4);
          de = Ne(O - q, 4, r - q), F = G + F - re, G = re;
        } else if (J === "sw") {
          const re = Ne(O, 0, q + de - 4);
          de = q + de - re, F = Ne(z - G, 4, n - G), q = re;
        } else
          de = Ne(O - q, 4, r - q), F = Ne(z - G, 4, n - G);
        m(D, q, G, de, F);
      }
      p({ kind: "idle" });
    },
    [l, a, f, g, m, r, n]
  ), C = E(
    (j, D) => {
      s || (j.preventDefault(), N(D));
    },
    [s, N]
  ), R = E(
    (j, D) => {
      s || (j.key === "Delete" || j.key === "Backspace") && (j.preventDefault(), N(D));
    },
    [s, N]
  ), S = E(
    (j, D) => {
      s || (j.stopPropagation(), x({ id: D.id, value: D.label ?? "" }));
    },
    [s]
  ), A = E(() => {
    u && (v(u.id, u.value), x(null));
  }, [u, v]);
  let M = null;
  if (l.kind === "create") {
    const j = Math.min(l.startX, l.currentX), D = Math.min(l.startY, l.currentY), J = Math.max(l.startX, l.currentX), H = Math.max(l.startY, l.currentY);
    J - j >= 2 && H - D >= 2 && (M = { x: j, y: D, width: J - j, height: H - D });
  }
  let P = null;
  if (l.kind === "move") {
    const j = a.find((D) => D.id === l.id);
    if (j) {
      const D = Ne(l.currentX - l.offsetX, 0, r - j.width), J = Ne(l.currentY - l.offsetY, 0, n - j.height);
      P = { ...j, x: D, y: J };
    }
  }
  let U = null;
  if (l.kind === "resize") {
    const { corner: j, origBox: D, currentX: J, currentY: H } = l;
    let { x: O, y: z, width: q, height: G } = D;
    if (j === "nw") {
      const de = Ne(J, 0, O + q - 4), F = Ne(H, 0, z + G - 4);
      q = O + q - de, G = z + G - F, O = de, z = F;
    } else if (j === "ne") {
      const de = Ne(H, 0, z + G - 4);
      q = Ne(J - O, 4, r - O), G = z + G - de, z = de;
    } else if (j === "sw") {
      const de = Ne(J, 0, O + q - 4);
      q = O + q - de, G = Ne(H - z, 4, n - z), O = de;
    } else
      q = Ne(J - O, 4, r - O), G = Ne(H - z, 4, n - z);
    U = { ...D, x: O, y: z, width: q, height: G };
  }
  const W = /* @__PURE__ */ new Set();
  l.kind === "move" && W.add(l.id), l.kind === "resize" && W.add(l.id);
  const oe = (j, D) => {
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
        "aria-label": `Resize ${D}`,
        className: I(
          "absolute h-3 w-3 rounded-sm border border-primary bg-white shadow",
          J[D]
        ),
        onPointerDown: (H) => k(H, j, D)
      },
      D
    );
  }, ie = (j, D, J, H) => {
    const O = Nr(j, r, n), z = u?.id === j.id;
    return /* @__PURE__ */ o(
      "div",
      {
        role: "none",
        "aria-label": `Bounding box${j.label ? ": " + j.label : ""}`,
        className: I(
          "absolute",
          D ? "opacity-60" : "opacity-100"
        ),
        style: {
          left: O.left,
          top: O.top,
          width: O.width,
          height: O.height,
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
              onChange: (q) => x((G) => G ? { ...G, value: q.target.value } : null),
              onBlur: A,
              onKeyDown: (q) => {
                q.key === "Enter" && (q.preventDefault(), A()), q.key === "Escape" && (q.preventDefault(), x(null));
              },
              className: "absolute -top-5 left-0 w-24 rounded border border-primary bg-white px-1 py-0 text-[10px] font-semibold text-primary shadow outline-none focus:ring-1 focus:ring-primary",
              onClick: (q) => q.stopPropagation()
            }
          ) : /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              tabIndex: 0,
              "aria-label": `Label: ${j.label || "Unlabeled"}. Double-click to edit.`,
              className: "absolute -top-5 left-0 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow",
              style: { whiteSpace: "nowrap" },
              onDoubleClick: (q) => S(q, j),
              onContextMenu: (q) => C(q, j.id),
              onKeyDown: (q) => R(q, j.id),
              children: j.label || "Unlabeled"
            }
          ),
          J && !s && /* @__PURE__ */ o(K, { children: [
            oe(j, "nw"),
            oe(j, "ne"),
            oe(j, "sw"),
            oe(j, "se")
          ] })
        ]
      },
      H
    );
  }, ce = () => {
    if (!M) return null;
    const j = Nr(M, r, n);
    return /* @__PURE__ */ e(
      "div",
      {
        "aria-hidden": !0,
        className: "pointer-events-none absolute",
        style: {
          left: j.left,
          top: j.top,
          width: j.width,
          height: j.height,
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
            onPointerUp: s ? void 0 : w,
            children: [
              a.map((j) => W.has(j.id) ? null : ie(j, !1, !0, `box-${j.id}`)),
              P && ie(P, !0, !1, "ghost-move"),
              U && ie(U, !0, !0, "ghost-resize"),
              ce()
            ]
          }
        ),
        !s && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute bottom-1.5 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80", children: "Drag to add box" })
      ]
    }
  );
}
const Tc = [
  "claude-opus-4-7",
  "claude-sonnet-4-6",
  "claude-haiku-4-5-20251001"
], Ac = [
  "$.trigger.imageRef",
  "$.trigger.image",
  "$.steps.upload.output.imageId"
];
function Rc(t) {
  if (!t) return !1;
  const r = t.properties;
  if (!r || typeof r != "object" || Array.isArray(r)) return !1;
  const n = r.regions;
  return typeof n == "object" && n !== null;
}
function Pc(t) {
  const r = t.trim();
  if (r.length === 0) return { ok: !0, value: void 0 };
  try {
    const n = JSON.parse(r);
    return n === null || typeof n != "object" || Array.isArray(n) ? { ok: !1, error: "Schema must be a JSON object" } : { ok: !0, value: n };
  } catch (n) {
    return { ok: !1, error: n.message };
  }
}
const ct = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Pn = "mt-1 w-full text-[12px] rounded border border-red-500 bg-white px-2 py-1 outline-none", Mc = `${ct} font-mono`, Dc = `${Pn} font-mono`, Ze = "text-[12px] font-semibold text-text-secondary", Ve = "text-[11px] text-text-tertiary mt-0.5", zt = "text-[11px] text-red-600 mt-0.5";
function Ec({ data: t, onChange: r }) {
  const [n, a] = $(!1), [i, s] = $(
    t.outputSchema ? JSON.stringify(t.outputSchema, null, 2) : ""
  ), [d, c] = $(null), l = !t.userPrompt?.trim(), p = !t.imageRefPath?.trim(), u = !!t.imageRefPath && !t.imageRefPath.startsWith("$."), x = Rc(t.outputSchema), h = E(
    (g) => {
      r({ seedRegions: g });
    },
    [r]
  ), f = (g) => {
    s(g);
    const m = Pc(g);
    if (!m.ok) {
      c(m.error);
      return;
    }
    c(null), r({ outputSchema: m.value });
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
          onChange: (g) => r({ model: g.target.value }),
          children: Tc.map((g) => /* @__PURE__ */ e("option", { value: g, children: g }, g))
        }
      ),
      /* @__PURE__ */ e("div", { className: Ve, children: "Anthropic Messages API. Requires ANTHROPIC_API_KEY on platform-api." })
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
          className: p || u ? Dc : Mc,
          value: t.imageRefPath ?? "",
          onChange: (g) => r({ imageRefPath: g.target.value }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      p ? /* @__PURE__ */ e("div", { id: "vision-image-ref-path-error", role: "alert", className: zt, children: "Image reference path is required." }) : u ? /* @__PURE__ */ o("div", { id: "vision-image-ref-path-error", role: "alert", className: zt, children: [
        "Path must start with ",
        /* @__PURE__ */ e("code", { children: "$." })
      ] }) : /* @__PURE__ */ e("div", { className: Ve, children: "JSONPath into context. The value must be a string imageId or object with imageId." }),
      /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: Ac.map((g) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => r({ imageRefPath: g }),
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
          className: `${l ? Pn : ct} min-h-20 resize-y`,
          value: t.userPrompt,
          onChange: (g) => r({ userPrompt: g.target.value })
        }
      ),
      l ? /* @__PURE__ */ e("div", { id: "vision-user-prompt-error", role: "alert", className: zt, children: "User prompt is required." }) : /* @__PURE__ */ o("div", { className: Ve, children: [
        "Supports ",
        "{{ context.* }}",
        " substitution."
      ] })
    ] }),
    x && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: Ze, children: "Focus regions (optional)" }),
      /* @__PURE__ */ e("div", { className: Ve, children: "Drag on the image to paint focus boxes. The next vision pass will use these as analysis hints." }),
      /* @__PURE__ */ e(
        $c,
        {
          imageUrl: "",
          imageWidth: 800,
          imageHeight: 600,
          boxes: t.seedRegions ?? [],
          onChange: h,
          className: "mt-1"
        }
      ),
      (t.seedRegions?.length ?? 0) > 0 && /* @__PURE__ */ o("div", { className: Ve, children: [
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
          className: `${d ? Pn : ct} font-mono text-[11px] min-h-28 resize-y`,
          value: i,
          onChange: (g) => f(g.target.value),
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
      ] }) : t.outputSchema ? /* @__PURE__ */ e("div", { className: Ve, children: "Extract mode — model must return JSON matching this schema." }) : /* @__PURE__ */ e("div", { className: Ve, children: "Leave blank for caption mode (freeform analysis text)." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => a((g) => !g),
          className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-[12px] font-semibold text-text-secondary flex items-center gap-1",
          children: [
            /* @__PURE__ */ e("span", { children: n ? "▾" : "▸" }),
            " Advanced"
          ]
        }
      ),
      n && /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 mt-2", children: [
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
                r({ maxOutputTokens: m === "" ? void 0 : Math.max(1, parseInt(m, 10) || 0) });
              }
            }
          ),
          /* @__PURE__ */ e("div", { className: Ve, children: "Caps the response length. Default 2048." })
        ] }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("label", { htmlFor: "vision-system-prompt", className: Ze, children: "System prompt override (optional)" }),
          /* @__PURE__ */ e(
            "textarea",
            {
              id: "vision-system-prompt",
              className: `${ct} min-h-14 resize-y`,
              value: t.systemPrompt ?? "",
              onChange: (g) => r({ systemPrompt: g.target.value || void 0 }),
              placeholder: "Leave blank to use the canned vision system prompt."
            }
          ),
          /* @__PURE__ */ e("div", { className: Ve, children: "Schema instructions are auto-appended when output schema is set." })
        ] })
      ] })
    ] })
  ] });
}
const _c = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
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
const Lc = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], St = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Bc = `${St} font-mono`, wt = "text-[12px] font-semibold text-text-secondary", wr = "text-[11px] text-text-tertiary mt-0.5";
function Fc({ data: t, onChange: r }) {
  const [n, a] = $(""), i = t.labels ?? [], s = () => {
    const c = n.trim();
    !c || i.includes(c) || (r({ labels: [...i, c] }), a(""));
  }, d = (c) => {
    r({ labels: i.filter((l, p) => p !== c) });
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
          className: Bc,
          value: t.imageRefPath ?? "",
          onChange: (c) => r({ imageRefPath: c.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: wr, children: "JSONPath to the imageId to classify. Required." }),
      /* @__PURE__ */ e(Oc, { samples: _c, onSelect: (c) => r({ imageRefPath: c }) })
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
      /* @__PURE__ */ e("div", { className: wr, children: "Press Enter or click Add. The model returns the single best-matching label." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-classify-model", className: wt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-classify-model",
          className: St,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (c) => r({ model: c.target.value }),
          children: Lc.map((c) => /* @__PURE__ */ e("option", { value: c.value, children: c.label }, c.value))
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
          onChange: (c) => r({ systemPrompt: c.target.value || void 0 }),
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
            r({ maxOutputTokens: Number.isFinite(l) && l > 0 ? l : 256 });
          }
        }
      )
    ] })
  ] });
}
const Uc = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function jc({ samples: t, onSelect: r }) {
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
const zc = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more detail)" }
], $t = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", qc = `${$t} font-mono`, kt = "text-[12px] font-semibold text-text-secondary", kr = "text-[11px] text-text-tertiary mt-0.5";
function Vc({ data: t, onChange: r }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-image-ref-path", className: kt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-describe-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: qc,
          value: t.imageRefPath ?? "",
          onChange: (n) => r({ imageRefPath: n.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: kr, children: "JSONPath to the imageId to describe. Required." }),
      /* @__PURE__ */ e(jc, { samples: Uc, onSelect: (n) => r({ imageRefPath: n }) })
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
          onChange: (n) => r({ userPrompt: n.target.value }),
          placeholder: "Describe what you see in this image in one paragraph."
        }
      ),
      /* @__PURE__ */ e("div", { className: kr, children: "Required. What to ask the model about the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-model", className: kt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-describe-model",
          className: $t,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (n) => r({ model: n.target.value }),
          children: zc.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
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
          onChange: (n) => r({ systemPrompt: n.target.value || void 0 }),
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
          onChange: (n) => {
            const a = parseInt(n.target.value, 10);
            r({ maxOutputTokens: Number.isFinite(a) && a > 0 ? a : 512 });
          }
        }
      )
    ] })
  ] });
}
const Wc = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
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
const Jc = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], dt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Gc = `${dt} font-mono`, at = "text-[12px] font-semibold text-text-secondary", Cr = "text-[11px] text-text-tertiary mt-0.5";
function Kc({ data: t, onChange: r }) {
  const [n, a] = $(""), i = t.candidateTags ?? [], s = () => {
    const c = n.trim();
    !c || i.includes(c) || (r({ candidateTags: [...i, c] }), a(""));
  }, d = (c) => {
    r({ candidateTags: i.filter((l, p) => p !== c) });
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-tag-image-ref-path", className: at, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-tag-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Gc,
          value: t.imageRefPath ?? "",
          onChange: (c) => r({ imageRefPath: c.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: Cr, children: "JSONPath to the imageId to tag. Required." }),
      /* @__PURE__ */ e(Hc, { samples: Wc, onSelect: (c) => r({ imageRefPath: c }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: at, children: [
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
      /* @__PURE__ */ e("div", { className: Cr, children: "Restricts tagging to this vocabulary. Leave empty for open-ended tags." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-max-tags", className: at, children: [
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
            r({ maxTags: Number.isFinite(l) && l >= 1 ? l : 10 });
          }
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-tag-model", className: at, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-tag-model",
          className: dt,
          value: t.model ?? "claude-haiku-4-5",
          onChange: (c) => r({ model: c.target.value }),
          children: Jc.map((c) => /* @__PURE__ */ e("option", { value: c.value, children: c.label }, c.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-system-prompt", className: at, children: [
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
          onChange: (c) => r({ systemPrompt: c.target.value || void 0 }),
          placeholder: "Leave blank to use the default tagging system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-tag-max-output-tokens", className: at, children: [
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
            r({ maxOutputTokens: Number.isFinite(l) && l > 0 ? l : 256 });
          }
        }
      )
    ] })
  ] });
}
const Yc = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function Xc({ samples: t, onSelect: r }) {
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
const Qc = [
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (default — best OCR accuracy)" },
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (faster, lower accuracy)" }
], Ht = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Zc = `${Ht} font-mono`, qt = "text-[12px] font-semibold text-text-secondary", yn = "text-[11px] text-text-tertiary mt-0.5";
function ed({ data: t, onChange: r }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-image-ref-path", className: qt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-extract-text-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Zc,
          value: t.imageRefPath ?? "",
          onChange: (n) => r({ imageRefPath: n.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: yn, children: "JSONPath to the imageId to extract text from. Required." }),
      /* @__PURE__ */ e(Xc, { samples: Yc, onSelect: (n) => r({ imageRefPath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-model", className: qt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-extract-text-model",
          className: Ht,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (n) => r({ model: n.target.value }),
          children: Qc.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
        }
      ),
      /* @__PURE__ */ e("div", { className: yn, children: "Defaults to Sonnet for best OCR accuracy." })
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
          className: `${Ht} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (n) => r({ systemPrompt: n.target.value || void 0 }),
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
          className: Ht,
          value: t.maxOutputTokens ?? 1024,
          onChange: (n) => {
            const a = parseInt(n.target.value, 10);
            r({ maxOutputTokens: Number.isFinite(a) && a > 0 ? a : 1024 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: yn, children: "Increase for documents with large amounts of text." })
    ] })
  ] });
}
const td = [
  { value: "amazon.titan-image-generator-v2:0", label: "Titan v2 (default)" },
  { value: "amazon.titan-image-generator-v1", label: "Titan v1" }
], it = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", st = "text-[12px] font-semibold text-text-secondary", Ir = "text-[11px] text-text-tertiary mt-0.5";
function nd({ data: t, onChange: r }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "generate-prompt", className: st, children: "Prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "generate-prompt",
          rows: 4,
          spellCheck: !1,
          className: `${it} resize-y min-h-20`,
          value: t.prompt ?? "",
          onChange: (n) => r({ prompt: n.target.value }),
          placeholder: "A photorealistic photograph of a golden retriever in a sunny meadow"
        }
      ),
      /* @__PURE__ */ e("div", { className: Ir, children: "Text description of the image to generate. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "generate-model", className: st, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "generate-model",
          className: it,
          value: t.model ?? "amazon.titan-image-generator-v2:0",
          onChange: (n) => r({ model: n.target.value }),
          children: td.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "generate-width", className: st, children: "Width (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "generate-width",
            type: "number",
            min: 64,
            max: 2048,
            step: 64,
            className: it,
            value: t.width ?? 512,
            onChange: (n) => {
              const a = parseInt(n.target.value, 10);
              r({ width: Number.isFinite(a) && a > 0 ? a : 512 });
            }
          }
        )
      ] }),
      /* @__PURE__ */ o("div", { className: "flex-1", children: [
        /* @__PURE__ */ e("label", { htmlFor: "generate-height", className: st, children: "Height (px)" }),
        /* @__PURE__ */ e(
          "input",
          {
            id: "generate-height",
            type: "number",
            min: 64,
            max: 2048,
            step: 64,
            className: it,
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
      /* @__PURE__ */ o("label", { htmlFor: "generate-seed", className: st, children: [
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
          className: it,
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
      /* @__PURE__ */ o("label", { htmlFor: "generate-num-images", className: st, children: [
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
          className: it,
          value: t.numImages ?? 1,
          onChange: (n) => {
            const a = parseInt(n.target.value, 10);
            r({ numImages: Number.isFinite(a) && a >= 1 ? Math.min(8, a) : 1 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Ir, children: "When > 1, the step fans out with one arm per image. Each arm carries one imageId." })
    ] })
  ] });
}
const rd = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function od({ samples: t, onSelect: r }) {
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
const ad = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], Jt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", id = `${Jt} font-mono`, Vt = "text-[12px] font-semibold text-text-secondary", Sr = "text-[11px] text-text-tertiary mt-0.5";
function sd({ data: t, onChange: r }) {
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
          className: id,
          value: t.sourceImagePath ?? "",
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(od, { samples: rd, onSelect: (n) => r({ sourceImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "variation-model", className: Vt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "variation-model",
          className: Jt,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (n) => r({ model: n.target.value }),
          children: ad.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
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
          className: Jt,
          value: t.numVariations ?? 1,
          onChange: (n) => {
            const a = parseInt(n.target.value, 10);
            r({ numVariations: Number.isFinite(a) && a >= 1 ? Math.min(8, a) : 1 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Sr, children: "Always fans out — each variation becomes a separate arm downstream." })
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
          className: Jt,
          value: t.similarity ?? 0.7,
          onChange: (n) => {
            const a = parseFloat(n.target.value);
            r({ similarity: Number.isFinite(a) ? Math.min(1, Math.max(0, a)) : 0.7 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: Sr, children: "0 = very different, 1 = nearly identical. 0.7 is a good starting point." })
    ] })
  ] });
}
const ld = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
], cd = [
  "$.steps.mask.output.imageId",
  "$.trigger.maskRef"
];
function $r({ samples: t, onSelect: r }) {
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
const dd = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], Mn = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Tr = `${Mn} font-mono`, Wt = "text-[12px] font-semibold text-text-secondary", Ar = "text-[11px] text-text-tertiary mt-0.5";
function pd({ data: t, onChange: r }) {
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
          className: Tr,
          value: t.sourceImagePath ?? "",
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e($r, { samples: ld, onSelect: (n) => r({ sourceImagePath: n }) })
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
          className: Tr,
          value: t.maskImagePath ?? "",
          onChange: (n) => r({ maskImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.steps.mask.output.imageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: Ar, children: "JSONPath to a mask image. White pixels = edit region, black = preserve. Omit for outpainting." }),
      /* @__PURE__ */ e($r, { samples: cd, onSelect: (n) => r({ maskImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-prompt", className: Wt, children: "Edit prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "edit-prompt-prompt",
          rows: 4,
          spellCheck: !1,
          className: `${Mn} resize-y min-h-20`,
          value: t.prompt ?? "",
          onChange: (n) => r({ prompt: n.target.value }),
          placeholder: "Replace the background with a sunny beach"
        }
      ),
      /* @__PURE__ */ e("div", { className: Ar, children: "Describes what to generate in the masked region. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-model", className: Wt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "edit-prompt-model",
          className: Mn,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (n) => r({ model: n.target.value }),
          children: dd.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
        }
      )
    ] })
  ] });
}
const ud = {
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
  // Agent (AgentCore)
  // -------------------------------------------------------------------------
  agent: /* @__PURE__ */ o(K, { children: [
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
  "graph-query": /* @__PURE__ */ o(K, { children: [
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
  memory: /* @__PURE__ */ o(K, { children: [
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
  guardrail: /* @__PURE__ */ o(K, { children: [
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
}, md = {
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
}, Ue = ({ data: t }) => /* @__PURE__ */ o("div", { className: "p-3 text-[13px] text-[#64748b]", children: [
  "Configuration for ",
  /* @__PURE__ */ e("strong", { children: t.type }),
  " — coming in Phase C."
] }), hd = {
  trigger: ml,
  llm: bl,
  transform: Nl,
  condition: kl,
  action: Sl,
  fork: $l,
  join: Rl,
  approval: Ml,
  agent: Ue,
  "mcp-tool": Ue,
  "knowledge-base": Ue,
  "graph-query": Ue,
  memory: Ue,
  guardrail: Ue,
  policy: Ue,
  "ag-ui-output": Ue,
  "image-source": Ue,
  "image:save": Ue,
  scatter: ql,
  "image:resize": Jl,
  "image:transform": ec,
  "image:format-convert": ac,
  "image:sharpen": lc,
  "image:watermark": uc,
  "image:crop": fc,
  "image:adjust-bw": bc,
  "image:adjust-layer": kc,
  "image:vision-analyze": Ec,
  "image:vision-classify": Fc,
  "image:vision-describe": Vc,
  "image:vision-tag": Kc,
  "image:vision-extract-text": ed,
  "image:generate": nd,
  "image:variation": sd,
  "image:edit-prompt": pd
};
function fd(t, r) {
  const n = hd[t.type];
  return /* @__PURE__ */ e(n, { data: t.data, onChange: r });
}
function xd({ selectedIds: t }) {
  const {
    definition: r,
    selectedNodeId: n,
    setSelectedNodeId: a,
    updateNodeData: i,
    removeNode: s,
    duplicateNodes: d
  } = Ye(), [c, l] = $("config"), p = ae(null), u = ae(null);
  _n();
  const x = V(() => t && t.length > 1 ? t : n ? [n] : [], [t, n]), h = x.length > 1, f = x.length > 0, g = V(() => h || x.length === 0 || !r ? null : r.nodes.find((b) => b.id === x[0]) ?? null, [r, x, h]), m = E(() => {
    a(null);
  }, [a]);
  Z(() => {
    l("config");
  }, [x.join(",")]), Z(() => {
    if (!f) return;
    const b = (w) => {
      w.key === "Escape" && (w.stopPropagation(), m());
    };
    return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b);
  }, [f, m]), Z(() => {
    if (!f) return;
    const b = (w) => {
      const C = p.current;
      C && (w.target instanceof Node && C.contains(w.target) || w.target instanceof Element && (w.target.closest("[data-node-type]") || m()));
    };
    return window.addEventListener("mousedown", b), () => window.removeEventListener("mousedown", b);
  }, [f, m]);
  const v = g ? md[g.type] : null, N = () => {
    if (h)
      for (const b of x) s(b);
    else g && s(g.id);
  }, y = () => {
    x.length !== 0 && d(x);
  }, k = (b) => {
    g && i(g.id, b);
  };
  return /* @__PURE__ */ e("div", { ref: p, className: "flex flex-col flex-1 min-h-0 bg-white", "data-testid": "config-panel", children: h ? (
    // ---------------------------------------------------------------
    // Multi-select pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ o(K, { children: [
      /* @__PURE__ */ o("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ e("span", { className: "text-base", "aria-hidden": !0, children: "⧉" }),
        /* @__PURE__ */ o("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: [
          x.length,
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
    /* @__PURE__ */ o(K, { children: [
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
            const w = ["config", "runs", "docs"], C = w.indexOf(c);
            let R = null;
            b.key === "ArrowRight" ? R = w[(C + 1) % w.length] : b.key === "ArrowLeft" ? R = w[(C - 1 + w.length) % w.length] : b.key === "Home" ? R = w[0] : b.key === "End" && (R = w[w.length - 1]), R && (b.preventDefault(), l(R), u.current?.querySelector(
              `[data-tab="${R}"]`
            )?.focus());
          },
          children: ["config", "runs", "docs"].map((b) => {
            const w = c === b, C = b === "config" ? "Config" : b === "runs" ? "Runs" : "Docs";
            return /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": w,
                tabIndex: w ? 0 : -1,
                "data-tab": b,
                className: I(
                  "flex-1 border-none bg-transparent text-xs font-semibold cursor-pointer font-inherit",
                  w ? "text-[#0f172a] border-b-2 border-b-[#646cff]" : "text-[#64748b] border-b-2 border-b-transparent"
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
        c === "config" && fd(g, k),
        c === "runs" && /* @__PURE__ */ e("div", { className: "p-6 text-xs text-[#64748b]", children: "No runs yet." }),
        c === "docs" && /* @__PURE__ */ e("div", { className: "pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug", children: ud[g.type] ?? /* @__PURE__ */ e("p", { className: "text-text-secondary", children: "No docs available for this node type." }) })
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
function ke(t) {
  if (t == null) return "--";
  if (t < 1e3) return `${Math.round(t)}ms`;
  if (t < 6e4) return `${(t / 1e3).toFixed(1)}s`;
  const r = Math.floor(t / 6e4), n = Math.floor(t % 6e4 / 1e3);
  return `${r}m ${n}s`;
}
function pt(t) {
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
function gd(t) {
  const r = Date.now() - new Date(t).getTime();
  return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 2592e5 ? `${Math.floor(r / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function bd(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function yd(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Rr(t) {
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
function vn(t) {
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
function vd(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function et({ label: t, children: r }) {
  return /* @__PURE__ */ o("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ e("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: t }),
    /* @__PURE__ */ e("span", { className: "text-[13px] text-text-primary", children: r })
  ] });
}
function Nd({ pipelineId: t, run: r, onBack: n }) {
  const a = Ee();
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
      /* @__PURE__ */ e(et, { label: "Status", children: /* @__PURE__ */ e(
        le,
        {
          tone: Rr(r.status),
          "aria-label": `Status: ${vn(r.status)}`,
          children: vn(r.status)
        }
      ) }),
      /* @__PURE__ */ e(et, { label: "Started", children: new Date(r.startedAt).toLocaleString() }),
      r.completedAt && /* @__PURE__ */ e(et, { label: "Completed", children: new Date(r.completedAt).toLocaleString() }),
      /* @__PURE__ */ e(et, { label: "Duration", children: ke(r.durationMs) }),
      /* @__PURE__ */ e(et, { label: "Triggered by", children: vd(r) }),
      /* @__PURE__ */ e(et, { label: "Trigger type", children: r.triggeredBy.triggerType }),
      r.estimatedCostUsd != null && r.estimatedCostUsd > 0 && /* @__PURE__ */ o(et, { label: "Est. Cost", children: [
        /* @__PURE__ */ e("span", { className: I("font-semibold", yd(r.estimatedCostUsd)), children: bd(r.estimatedCostUsd) }),
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
          const d = Rr(s.status), c = vn(s.status), l = s.output, p = l?.response;
          return /* @__PURE__ */ o("div", { className: "mb-2", children: [
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2 py-1 text-xs", children: [
              /* @__PURE__ */ e(le, { tone: d, "aria-label": `Status: ${c}`, children: c }),
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
        /* @__PURE__ */ e("pre", { className: "mt-1.5 max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-md border border-border bg-surface-inset p-2.5 text-[10px]", children: JSON.stringify(r, null, 2) })
      ] }) })
    ] }) })
  ] });
}
function Pr(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function wd(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function kd(t) {
  const r = Date.now() - new Date(t).getTime();
  return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 2592e5 ? `${Math.floor(r / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Cd(t) {
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
function Id(t) {
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
function Sd(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function $d({ pipelineId: t, onClose: r }) {
  const n = Ee(), [a, i] = $([]), [s, d] = $(!0), [c, l] = $(null), [p, u] = $(null), [x, h] = $(!1), [f, g] = $([]), m = ae(null), v = E(async () => {
    d(!0), l(null);
    try {
      const b = await to(t, { limit: 50 });
      i(b.runs);
    } catch (b) {
      l(b instanceof Error ? b.message : "Failed to load runs");
    } finally {
      d(!1);
    }
  }, [t]);
  Z(() => {
    m.current !== t && (m.current = t, v());
  }, [t, v]), Pe("*", E((b) => {
    const { eventType: w, payload: C } = b;
    if (!C || typeof C != "object") return;
    const R = C;
    if (!(R.pipelineId && R.pipelineId !== t))
      switch (w) {
        case "pipeline.run.started": {
          const S = C;
          if (S.pipelineId !== t) return;
          const A = {
            id: S.runId,
            pipelineId: S.pipelineId,
            pipelineVersion: 0,
            status: "running",
            triggeredBy: S.triggeredBy,
            ownerNodeId: "local",
            startedAt: S.at,
            currentStepIds: [],
            steps: {},
            context: {}
          };
          i((M) => [A, ...M.filter((P) => P.id !== S.runId)]);
          break;
        }
        case "pipeline.run.completed": {
          const S = C;
          i(
            (A) => A.map(
              (M) => M.id === S.runId ? { ...M, status: "completed", completedAt: S.at, durationMs: S.durationMs } : M
            )
          );
          break;
        }
        case "pipeline.run.failed": {
          const S = C;
          i(
            (A) => A.map(
              (M) => M.id === S.runId ? { ...M, status: "failed", completedAt: S.at, error: S.error } : M
            )
          );
          break;
        }
        case "pipeline.run.cancelled": {
          const S = C;
          i(
            (A) => A.map(
              (M) => M.id === S.runId ? { ...M, status: "cancelled", completedAt: S.at } : M
            )
          );
          break;
        }
      }
  }, [t]));
  const N = V(
    () => a.find((b) => b.id === p) ?? null,
    [a, p]
  ), y = E((b) => {
    g((w) => w.includes(b) ? w.filter((C) => C !== b) : w.length >= 2 ? [w[1], b] : [...w, b]);
  }, []), k = E(() => {
    if (f.length !== 2) return;
    const [b, w] = f;
    n(`/pipelines/${t}/compare?a=${b}&b=${w}`);
  }, [f, n, t]);
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
                  h(!x), x && g([]);
                },
                "data-testid": "runs-panel-compare-toggle",
                className: I(
                  "cursor-pointer rounded px-2 py-0.5 font-inherit text-[11px] font-medium",
                  x ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"
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
        x && /* @__PURE__ */ o(
          "div",
          {
            className: "flex shrink-0 items-center gap-2 border-b border-border bg-surface-inset px-4 py-2",
            "data-testid": "runs-panel-compare-bar",
            children: [
              /* @__PURE__ */ o("span", { className: "text-[11px] text-text-secondary", children: [
                f.length,
                "/2 selected"
              ] }),
              /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  disabled: f.length !== 2,
                  onClick: k,
                  "data-testid": "runs-panel-compare-action",
                  className: I(
                    "ml-auto rounded px-2.5 py-0.5 font-inherit text-[11px] font-semibold",
                    f.length === 2 ? "cursor-pointer border border-primary bg-primary text-white" : "cursor-not-allowed border border-border bg-surface text-text-disabled"
                  ),
                  children: "Compare"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative min-h-0 flex-1", children: [
          N && /* @__PURE__ */ e(
            Nd,
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
            const w = Cd(b.status), C = Id(b.status), R = f.includes(b.id);
            return /* @__PURE__ */ o(
              "li",
              {
                "data-testid": `runs-panel-row-${b.id}`,
                onClick: () => {
                  x ? y(b.id) : u(b.id);
                },
                className: I(
                  "cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover",
                  R && "bg-[#eff6ff]"
                ),
                children: [
                  /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
                    x && /* @__PURE__ */ e(
                      "input",
                      {
                        type: "checkbox",
                        checked: R,
                        onChange: () => y(b.id),
                        onClick: (S) => S.stopPropagation(),
                        "data-testid": `runs-panel-compare-check-${b.id}`,
                        className: "m-0 shrink-0 accent-primary",
                        "aria-label": `Select run ${b.id.slice(0, 8)} for comparison`
                      }
                    ),
                    /* @__PURE__ */ e(le, { tone: w, "aria-label": `Status: ${C}`, children: C }),
                    /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-secondary", children: b.id.slice(0, 8) }),
                    /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: kd(b.startedAt) })
                  ] }),
                  /* @__PURE__ */ o("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ e("span", { children: ke(b.durationMs) }),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 0 && /* @__PURE__ */ e(
                      "span",
                      {
                        className: I("font-mono font-semibold", wd(b.estimatedCostUsd)),
                        title: `Estimated cost: ${Pr(b.estimatedCostUsd)}`,
                        children: Pr(b.estimatedCostUsd)
                      }
                    ),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 1 && /* @__PURE__ */ e("span", { className: "rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "High Cost" }),
                    /* @__PURE__ */ e("span", { className: "ml-auto", children: Sd(b) })
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
function Td({
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
          n === "config" && (r !== null ? /* @__PURE__ */ e(xd, {}) : /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          n === "runs" && /* @__PURE__ */ e(
            $d,
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
function Ad(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Rd(t) {
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
function Pd(t) {
  if (!(t instanceof HTMLElement)) return !1;
  const r = t.tagName;
  return !!(r === "INPUT" || r === "TEXTAREA" || r === "SELECT" || t.isContentEditable);
}
function Lm() {
  const { pipelineId: t } = mt(), r = V(() => t ? tt(t) !== null : !1, [t]);
  return !t || !r ? /* @__PURE__ */ e(ht, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(no, { pipelineId: t, children: /* @__PURE__ */ e(Md, { pipelineId: t }) });
}
function Md({ pipelineId: t }) {
  const r = Ee(), n = Ye(), a = ft(), { toast: i } = tn(), {
    definition: s,
    dirty: d,
    selectedNodeId: c,
    setSelectedNodeId: l,
    save: p,
    publish: u,
    revert: x,
    undo: h,
    redo: f,
    setTags: g
  } = n, m = Vs(t), [v, N] = $(!1), y = ae(null), k = ae(d);
  Z(() => (k.current && !d && (N(!0), y.current && clearTimeout(y.current), y.current = setTimeout(() => N(!1), 450)), k.current = d, () => {
    y.current && (clearTimeout(y.current), y.current = null);
  }), [d]);
  const b = V(
    () => s ? uo(s) : null,
    [s]
  ), w = (b?.errors.length ?? 0) > 0, C = V(
    () => Rd(s),
    [s]
  ), S = V(() => s ? s.nodes.some((me) => me.type === "trigger") : !1, [s]) ? ["trigger"] : [], [A, M] = $(!0), [P, U] = $(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), W = E(() => {
    U((me) => {
      const te = !me;
      try {
        window.localStorage.setItem(
          "ws_pipelines_v1_show_tags",
          te ? "true" : "false"
        );
      } catch {
      }
      return te;
    });
  }, []), [oe, ie] = $(!1), [ce, j] = $(!1), [D, J] = $(!1), [H, O] = $(!1), [z, q] = $(!1), G = V(() => s?.publishedSnapshot ? s.publishedSnapshot : null, [s]), de = s?.status === "published", F = !m.isRunActive && (!de || w), re = m.isRunActive ? "Cancel the active run" : de ? w ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", ye = E(async () => {
    if (m.isRunActive && m.currentRunId) {
      a.cancelRun(m.currentRunId);
      return;
    }
    if (!F) {
      if (C.length > 0) {
        m.setTriggerInputValues(
          Object.fromEntries(C.map((me) => [me, ""]))
        ), m.setTriggerInputOpen(!0);
        return;
      }
      m.handleRunClick();
    }
  }, [m, a, F, C]);
  Z(() => {
    const me = (te) => {
      if (Pd(te.target)) return;
      const Y = te.metaKey || te.ctrlKey;
      if (Y && te.key.toLowerCase() === "s") {
        te.preventDefault(), p(), i("Saved", { type: "success", durationMs: 1200 });
        return;
      }
      if (Y && te.key === "Enter") {
        te.preventDefault(), ye();
        return;
      }
      if (Y && te.key === ".") {
        te.preventDefault(), m.isRunActive && m.currentRunId && a.cancelRun(m.currentRunId);
        return;
      }
      if (Y && te.shiftKey && te.key.toLowerCase() === "z") {
        te.preventDefault(), f();
        return;
      }
      if (Y && te.key.toLowerCase() === "z") {
        te.preventDefault(), h();
        return;
      }
      if (te.key === "Escape") {
        l(null);
        return;
      }
    };
    return window.addEventListener("keydown", me), () => window.removeEventListener("keydown", me);
  }, [p, i, ye, m, a, h, f, l]);
  const Me = () => {
    if (!s) return;
    const me = En(s.id);
    me && r(`/pipelines/${me.id}`);
  }, He = () => {
    if (!s) return;
    const me = Cn(s.id);
    me && Rt(`${Ad(s.name)}.pipeline.json`, me);
  }, _e = async () => {
    if (!s) return;
    const me = Os(s);
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(me), i("Mermaid diagram copied", { type: "success" });
      else
        throw new Error("clipboard unavailable");
    } catch (te) {
      console.warn("[PipelineEditor] clipboard write failed", te), i("Could not copy Mermaid diagram", { type: "error" });
    }
  }, Re = () => {
    O(!0);
  }, Be = () => {
    ie(!1), !w && (u(), i("Pipeline published", { type: "success" }));
  }, Oe = () => {
    s && (Bo(s.id), j(!1), r("/pipelines"));
  }, Fe = () => {
    ro(t), J(!1), i("Run history cleared", { type: "success" });
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
          Hs,
          {
            pipelineId: t,
            definition: s,
            dirty: d,
            savingFlash: v,
            isRunActive: m.isRunActive,
            isTriggering: m.isTriggering,
            runDisabled: F,
            runTitle: re,
            currentRun: we,
            breakpoints: m.breakpoints,
            onRunClick: ye,
            onDebugRunClick: m.handleDebugRunClick,
            onExport: He,
            onPublishClick: () => ie(!0),
            onDuplicate: Me,
            onCopyMermaid: _e,
            onViewVersions: Re,
            onRevert: x,
            onToggleShowTags: W,
            showTags: P,
            onViewRunHistory: () => m.setSidebarTab("runs"),
            onClearRunHistory: () => J(!0),
            onSimPanelOpen: () => q(!0),
            onDelete: () => j(!0)
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
                la,
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
          /* @__PURE__ */ e(Bi, { disabledTypes: S }),
          /* @__PURE__ */ e("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ e(
            Zi,
            {
              errorNodeId: m.activeError?.nodeId ?? null,
              onErrorNodePosition: m.handleErrorNodePosition,
              breakpoints: m.breakpoints,
              onToggleBreakpoint: m.handleToggleBreakpoint,
              pausedAtNodeId: m.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ e(
            Td,
            {
              pipelineId: t,
              selectedNodeId: c,
              sidebarTab: m.sidebarTab,
              onTabChange: m.setSidebarTab
            }
          )
        ] }),
        m.pausedBreakpoint && /* @__PURE__ */ e(
          rl,
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
          ts,
          {
            error: m.activeError,
            anchor: m.errorNodeAnchor,
            onDismiss: m.handleDismissError,
            onRetry: m.handleRetryFromError
          }
        ),
        /* @__PURE__ */ e(
          qs,
          {
            runId: m.currentRunId,
            visible: m.isRunActive && A
          }
        ),
        /* @__PURE__ */ e(
          zs,
          {
            publishConfirmOpen: oe,
            onPublishClose: () => ie(!1),
            onPublishConfirm: Be,
            hasErrors: w,
            validationErrorCount: b?.errors.length ?? 0,
            definitionName: s.name,
            definitionVersion: s.version,
            deleteConfirmOpen: ce,
            onDeleteClose: () => j(!1),
            onDeleteConfirm: Oe,
            clearRunsConfirmOpen: D,
            onClearRunsClose: () => J(!1),
            onClearRunsConfirm: Fe,
            versionDiffOpen: H,
            onVersionDiffClose: () => O(!1),
            currentDef: s,
            publishedDef: G,
            onJumpToNode: l,
            simPanelOpen: z,
            onSimPanelClose: () => q(!1)
          }
        ),
        /* @__PURE__ */ e(
          We,
          {
            open: m.triggerInputOpen,
            onClose: () => m.setTriggerInputOpen(!1),
            title: "Trigger inputs",
            maxWidth: 480,
            footer: /* @__PURE__ */ o(K, { children: [
              /* @__PURE__ */ e(je, { variant: "ghost", onClick: () => m.setTriggerInputOpen(!1), children: "Cancel" }),
              /* @__PURE__ */ e(
                je,
                {
                  variant: "primary",
                  onClick: m.handleTriggerInputSubmit,
                  disabled: C.some((me) => !m.triggerInputValues[me]?.trim()),
                  children: "Run"
                }
              )
            ] }),
            children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ e("p", { className: "m-0 text-xs text-text-secondary", children: "This pipeline expects input data. Provide values for the trigger context:" }),
              C.map((me) => /* @__PURE__ */ o("label", { className: "flex flex-col gap-1 text-xs", children: [
                /* @__PURE__ */ e("span", { className: "font-medium text-text-primary", children: me }),
                /* @__PURE__ */ e(
                  "textarea",
                  {
                    "data-autofocus": me === C[0] ? !0 : void 0,
                    rows: 3,
                    className: "resize-y px-2 py-1.5 rounded-md border border-border text-xs font-inherit",
                    value: m.triggerInputValues[me] ?? "",
                    onChange: (te) => m.setTriggerInputValues((Y) => ({ ...Y, [me]: te.target.value }))
                  }
                )
              ] }, me))
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
function Dd(t) {
  const r = t?.event;
  return !r || r === "manual" ? { icon: "▶", text: "Manual" } : r === "schedule" ? { icon: "⏱", text: t?.schedule ?? "Schedule" } : r === "webhook" ? { icon: "🔌", text: t?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${t?.event}` };
}
function Ed({
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
  const [u, x] = $(!1), [h, f] = $(!1), g = ae(null);
  ut(g, () => x(!1), u);
  const m = t.status === "published", v = t.status === "archived", N = typeof t.publishedVersion == "number", y = Dd(t.triggerBinding);
  let k, b;
  v ? (k = `Archived · v${t.version}`, b = "danger") : m ? (k = `Published · v${t.version}`, b = "success") : N ? (k = `Draft · v${t.version} (published v${t.publishedVersion})`, b = "warning") : (k = `Draft · v${t.version}`, b = "neutral");
  const w = !m, C = (A) => (M) => {
    M.stopPropagation(), A();
  }, R = d || c || h || l, S = (A) => {
    d ? p(A.shiftKey) : r();
  };
  return /* @__PURE__ */ o(
    "div",
    {
      "data-testid": `pipeline-card-${t.id}`,
      "data-selected": c ? "true" : "false",
      onClick: S,
      onMouseEnter: () => f(!0),
      onMouseLeave: () => {
        f(!1), x(!1);
      },
      className: I(
        "flex flex-col gap-2 w-full px-3.5 py-3 bg-surface rounded-lg cursor-pointer relative transition-[border-color,box-shadow] duration-100",
        c ? "border border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : h ? "border border-primary shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "border border-border shadow-none"
      ),
      children: [
        R && /* @__PURE__ */ e(
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
        /* @__PURE__ */ o("div", { className: I("flex items-center gap-2 min-w-0", R && "pr-7"), children: [
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
          /* @__PURE__ */ e(le, { "aria-label": `Status: ${k}`, tone: b, size: "sm", children: k }),
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
              onClick: C(n),
              disabled: w,
              title: w ? "Run requires published state" : "Run pipeline",
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
          /* @__PURE__ */ o("div", { className: "relative ml-auto", ref: g, children: [
            /* @__PURE__ */ e(
              "button",
              {
                "data-testid": `overflow-pipeline-${t.id}`,
                onClick: C(() => x((A) => !A)),
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
                    x(!1), a();
                  }), children: "Duplicate" }),
                  /* @__PURE__ */ e("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: C(() => {
                    x(!1), i();
                  }), children: "Export JSON" }),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-[#dc2626]",
                      role: "menuitem",
                      onClick: C(() => {
                        x(!1), s();
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
const _d = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, Od = ["draft", "published"];
function Ld({
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
  onHeaderToggleAll: x
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
                  onChange: x,
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
            children: zn.map((h) => {
              const f = a ? n.has(h) : Od.includes(h);
              return /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  role: "checkbox",
                  "aria-checked": f,
                  "data-testid": `status-chip-${h}`,
                  onClick: () => i(h),
                  onKeyDown: (g) => {
                    (g.key === "Enter" || g.key === " ") && (g.preventDefault(), i(h));
                  },
                  className: I(
                    "px-3 py-1.5 text-xs font-medium rounded cursor-pointer font-inherit",
                    f ? "border border-primary bg-primary text-white" : "border border-border bg-white text-text-secondary"
                  ),
                  children: _d[h]
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
const Je = I(
  "px-2.5 py-[5px] text-xs font-semibold",
  "bg-white text-text-secondary",
  "border border-border-field rounded-md",
  "cursor-pointer font-inherit"
);
function Bd({
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
  removeTagOpen: x,
  onSubmitAddTag: h,
  onSubmitRemoveTag: f,
  onCloseAddTag: g,
  onCloseRemoveTag: m,
  unionTags: v
}) {
  const [N, y] = $(""), k = ae(null), b = ae(null), w = ae(null);
  Z(() => {
    u && (y(""), setTimeout(() => k.current?.focus(), 30));
  }, [u]), Z(() => {
    if (!u) return;
    const R = (A) => {
      b.current?.contains(A.target) || g();
    }, S = window.setTimeout(() => {
      document.addEventListener("mousedown", R);
    }, 0);
    return () => {
      window.clearTimeout(S), document.removeEventListener("mousedown", R);
    };
  }, [u, g]), Z(() => {
    if (!x) return;
    const R = (A) => {
      w.current?.contains(A.target) || m();
    }, S = window.setTimeout(() => {
      document.addEventListener("mousedown", R);
    }, 0);
    return () => {
      window.clearTimeout(S), document.removeEventListener("mousedown", R);
    };
  }, [x, m]);
  const C = () => {
    const R = N.trim();
    R.length !== 0 && (h(R), y(""));
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
        /* @__PURE__ */ e("button", { "data-testid": "bulk-clear", className: Je, onClick: r, children: "Clear" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-publish", className: Je, onClick: i, children: "Publish selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-archive", className: Je, onClick: s, children: "Archive selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export-json", className: Je, onClick: a, children: "Export selected as JSON" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export", className: Je, onClick: n, children: "Export all" }),
        /* @__PURE__ */ e(
          "button",
          {
            "data-testid": "bulk-delete-confirm-prompt",
            className: Je,
            onClick: p,
            children: "Delete selected"
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", children: [
          /* @__PURE__ */ e("button", { "data-testid": "bulk-add-tag-btn", className: Je, onClick: d, children: "Add tag..." }),
          u && /* @__PURE__ */ o(
            "div",
            {
              ref: b,
              "data-testid": "bulk-add-tag-popover",
              onClick: (R) => R.stopPropagation(),
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
                    ref: k,
                    type: "text",
                    "data-testid": "bulk-add-tag-input",
                    placeholder: "Tag name",
                    value: N,
                    onChange: (R) => y(R.target.value),
                    onKeyDown: (R) => {
                      R.key === "Enter" ? (R.preventDefault(), C()) : R.key === "Escape" && (R.preventDefault(), g());
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
                Je,
                v.length === 0 && "opacity-50 cursor-not-allowed"
              ),
              onClick: c,
              disabled: v.length === 0,
              title: v.length === 0 ? "No tags on selected pipelines" : "Remove tag from selected",
              children: "Remove tag..."
            }
          ),
          x && /* @__PURE__ */ o(
            "div",
            {
              ref: w,
              "data-testid": "bulk-remove-tag-popover",
              onClick: (R) => R.stopPropagation(),
              className: I(
                "absolute top-full left-0 mt-1.5",
                "bg-white border border-border rounded-lg",
                "shadow-lg min-w-[220px] max-w-[320px] p-2.5 z-10",
                "flex flex-col gap-2"
              ),
              children: [
                /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: "Click a tag to remove it from all selected:" }),
                /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: v.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "No tags to remove." }) : v.map((R) => /* @__PURE__ */ o(
                  "button",
                  {
                    "data-testid": `bulk-remove-tag-chip-${R}`,
                    onClick: () => f(R),
                    className: I(
                      "px-2 py-0.5 text-xs font-medium",
                      "bg-red-50 text-red-600",
                      "border border-red-200 rounded-full",
                      "cursor-pointer font-inherit"
                    ),
                    children: [
                      R,
                      " ✕"
                    ]
                  },
                  R
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
function Fd({
  visibleRows: t,
  filteredIds: r
}) {
  const [n, a] = $(!1), [i, s] = $(/* @__PURE__ */ new Set()), d = ae(null), c = ae(null), l = E(() => {
    s(/* @__PURE__ */ new Set());
  }, []), p = E(() => {
    n ? (l(), a(!1)) : a(!0);
  }, [n, l]), u = E(
    (m, v = !1) => {
      const N = t, y = N.findIndex((b) => b.id === m), k = d.current;
      y !== -1 && (d.current = y), s((b) => {
        const w = new Set(b), C = !w.has(m);
        if (v && k != null && y !== -1) {
          const R = Math.min(k, y), S = Math.max(k, y);
          for (let A = R; A <= S; A++) {
            const M = N[A];
            M && (C ? w.add(M.id) : w.delete(M.id));
          }
        } else C ? w.add(m) : w.delete(m);
        return w;
      });
    },
    [t]
  ), x = E(() => {
    s(new Set(r));
  }, [r]), h = t.length > 0 && t.every((m) => i.has(m.id)), f = !h && t.some((m) => i.has(m.id)), g = E(() => {
    s((m) => {
      const v = new Set(m);
      if (h)
        for (const N of t) v.delete(N.id);
      else
        for (const N of t) v.add(N.id);
      return v;
    }), n || a(!0);
  }, [h, t, n]);
  return Z(() => {
    c.current && (c.current.indeterminate = f);
  }, [f]), {
    selectionMode: n,
    selected: i,
    allVisibleSelected: h,
    someVisibleSelected: f,
    selectAllRef: c,
    handleToggleSelectMode: p,
    handleToggleSelect: u,
    handleSelectAllFiltered: x,
    handleHeaderToggleAll: g,
    clearSelection: l,
    setSelectionMode: a
  };
}
const Ud = 280, ve = 160, jd = 40, zd = 200;
function X(t) {
  return jd + t * Ud;
}
function Q(t) {
  return zd + t * ve;
}
function ee(t, r, n, a = "in") {
  return {
    id: crypto.randomUUID(),
    source: t,
    sourceHandle: r,
    target: n,
    targetHandle: a
  };
}
function qd(t) {
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
    { id: n, type: "trigger", position: { x: X(0), y: Q(0) }, data: s },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: d },
    { id: i, type: "action", position: { x: X(2), y: Q(0) }, data: c }
  ], p = [
    ee(n, "out", a),
    ee(a, "out", i)
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
function Vd(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = {
    type: "trigger",
    triggerType: "document.finalize",
    documentTypeId: "meeting-notes"
  }, u = {
    type: "fork",
    branchCount: 2,
    branchLabels: ["action-items", "summary"]
  }, x = {
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
  }, f = {
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
    { id: n, type: "trigger", position: { x: X(0), y: Q(0) }, data: p },
    { id: a, type: "fork", position: { x: X(1), y: Q(0) }, data: u },
    { id: i, type: "llm", position: { x: X(2), y: Q(0) - ve / 2 }, data: x },
    { id: s, type: "action", position: { x: X(3), y: Q(0) - ve / 2 }, data: h },
    { id: d, type: "llm", position: { x: X(2), y: Q(0) + ve / 2 }, data: f },
    { id: c, type: "action", position: { x: X(3), y: Q(0) + ve / 2 }, data: g },
    { id: l, type: "join", position: { x: X(4), y: Q(0) }, data: m }
  ], N = [
    ee(n, "out", a),
    ee(a, "branch-0", i),
    ee(i, "out", s),
    ee(s, "out", l, "in-0"),
    ee(a, "branch-1", d),
    ee(d, "out", c),
    ee(c, "out", l, "in-1")
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
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function Wd(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = crypto.randomUUID(), x = {
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
  }, f = {
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
  }, k = {
    type: "action",
    actionType: "update-document",
    config: { field: "commentStatus", value: "deleted" },
    idempotent: !0,
    onError: "fail-run"
  }, b = [
    { id: n, type: "trigger", position: { x: X(0), y: Q(0) }, data: x },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: h },
    { id: i, type: "condition", position: { x: X(2), y: Q(0) }, data: f },
    { id: s, type: "action", position: { x: X(3), y: Q(0) - ve / 2 }, data: g },
    { id: d, type: "action", position: { x: X(3), y: Q(0) + ve / 2 }, data: m },
    { id: c, type: "approval", position: { x: X(4), y: Q(0) + ve / 2 }, data: v },
    { id: l, type: "condition", position: { x: X(5), y: Q(0) + ve / 2 }, data: N },
    { id: p, type: "action", position: { x: X(6), y: Q(0) }, data: y },
    { id: u, type: "action", position: { x: X(6), y: Q(0) + ve }, data: k }
  ], w = [
    ee(n, "out", a),
    ee(a, "out", i),
    ee(i, "true", s),
    ee(i, "false", d),
    ee(d, "out", c),
    ee(c, "approved", l),
    ee(c, "rejected", u),
    ee(l, "true", p),
    ee(l, "false", u)
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
    edges: w,
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function Hd(t) {
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
    { id: n, type: "trigger", position: { x: X(0), y: Q(0) }, data: d },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: c },
    { id: i, type: "transform", position: { x: X(2), y: Q(0) }, data: l },
    { id: s, type: "action", position: { x: X(3), y: Q(0) }, data: p }
  ], x = [
    ee(n, "out", a),
    ee(a, "out", i),
    ee(i, "out", s)
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
    edges: x,
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function Jd(t) {
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
    { id: n, type: "trigger", position: { x: X(0), y: Q(0) }, data: d },
    { id: a, type: "approval", position: { x: X(1), y: Q(0) }, data: c },
    { id: i, type: "approval", position: { x: X(2), y: Q(0) }, data: l },
    { id: s, type: "action", position: { x: X(3), y: Q(0) }, data: p }
  ], x = [
    ee(n, "out", a),
    ee(a, "approved", i),
    ee(i, "approved", s)
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
    edges: x,
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function Gd(t) {
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
    { id: n, type: "trigger", position: { x: X(0), y: Q(0) }, data: d },
    { id: a, type: "transform", position: { x: X(1), y: Q(0) }, data: c },
    { id: i, type: "llm", position: { x: X(2), y: Q(0) }, data: l },
    { id: s, type: "action", position: { x: X(3), y: Q(0) }, data: p }
  ], x = [
    ee(n, "out", a),
    ee(a, "out", i),
    ee(i, "out", s)
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
    edges: x,
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function Kd(t) {
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
    { id: n, type: "trigger", position: { x: X(0), y: Q(0) }, data: s },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: d },
    { id: i, type: "action", position: { x: X(2), y: Q(0) }, data: c }
  ], p = [
    ee(n, "out", a),
    ee(a, "out", i)
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
function Yd(t) {
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
    { id: n, type: "trigger", position: { x: X(0), y: Q(0) }, data: s },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: d },
    { id: i, type: "action", position: { x: X(2), y: Q(0) }, data: c }
  ], p = [
    ee(n, "out", a),
    ee(a, "out", i)
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
function Xd(t) {
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
  }, x = {
    type: "approval",
    approvers: [{ type: "role", value: "reviewer" }],
    requiredCount: 1,
    timeoutMs: 2880 * 60 * 1e3,
    timeoutAction: "reject",
    message: "Please review this document PR-style and approve or reject."
  }, h = { type: "join", mode: "all", mergeStrategy: "deep-merge" }, f = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "reviews",
      message: `Review complete: LLM said {{context.steps.${i}.response}}; reviewer decision: {{context.steps.${s}.output.decision}}`
    },
    idempotent: !1,
    onError: "route-error"
  }, g = [
    { id: n, type: "trigger", position: { x: X(0), y: Q(0) }, data: l },
    { id: a, type: "fork", position: { x: X(1), y: Q(0) }, data: p },
    { id: i, type: "llm", position: { x: X(2), y: Q(0) - ve / 2 }, data: u },
    { id: s, type: "approval", position: { x: X(2), y: Q(0) + ve / 2 }, data: x },
    { id: d, type: "join", position: { x: X(3), y: Q(0) }, data: h },
    { id: c, type: "action", position: { x: X(4), y: Q(0) }, data: f }
  ], m = [
    ee(n, "out", a),
    ee(a, "branch-0", i),
    ee(i, "out", d, "in-0"),
    ee(a, "branch-1", s),
    ee(s, "approved", d, "in-1"),
    ee(d, "out", c)
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
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function Qd(t) {
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
  }, x = {
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
  }, f = {
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
    { id: n, type: "trigger", position: { x: X(0), y: Q(0) }, data: l },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: p },
    { id: i, type: "condition", position: { x: X(2), y: Q(0) }, data: u },
    { id: s, type: "action", position: { x: X(3), y: Q(0) - ve / 2 }, data: x },
    { id: d, type: "approval", position: { x: X(4), y: Q(0) - ve / 2 }, data: h },
    { id: c, type: "action", position: { x: X(3), y: Q(0) + ve / 2 }, data: f }
  ], m = [
    ee(n, "out", a),
    ee(a, "out", i),
    ee(i, "true", s),
    ee(s, "out", d),
    ee(i, "false", c)
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
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function Zd(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = crypto.randomUUID(), x = {
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
  }, f = {
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
  }, k = {
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
    { id: n, type: "trigger", position: { x: X(0), y: Q(0) }, data: x },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: h },
    { id: i, type: "fork", position: { x: X(2), y: Q(0) }, data: f },
    { id: s, type: "llm", position: { x: X(3), y: Q(0) - ve }, data: g },
    { id: d, type: "llm", position: { x: X(3), y: Q(0) }, data: m },
    { id: c, type: "llm", position: { x: X(3), y: Q(0) + ve }, data: v },
    { id: l, type: "join", position: { x: X(4), y: Q(0) }, data: N },
    { id: p, type: "llm", position: { x: X(5), y: Q(0) }, data: y },
    { id: u, type: "action", position: { x: X(6), y: Q(0) }, data: k }
  ], w = [
    ee(n, "out", a),
    ee(a, "out", i),
    ee(i, "branch-0", s),
    ee(i, "branch-1", d),
    ee(i, "branch-2", c),
    ee(s, "out", l, "in-0"),
    ee(d, "out", l, "in-1"),
    ee(c, "out", l, "in-2"),
    ee(l, "out", p),
    ee(p, "out", u)
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
    edges: w,
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function ep(t) {
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
  }, x = {
    type: "approval",
    approvers: [{ type: "role", value: "moderator" }],
    requiredCount: 1,
    timeoutMs: 720 * 60 * 1e3,
    timeoutAction: "reject",
    message: `Document flagged as {{context.steps.${a}.output.category}} — please review before publishing.`
  }, h = [
    { id: n, type: "trigger", position: { x: X(0), y: Q(0) }, data: c },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: l },
    { id: i, type: "condition", position: { x: X(2), y: Q(0) }, data: p },
    { id: s, type: "action", position: { x: X(3), y: Q(0) - ve / 2 }, data: u },
    { id: d, type: "approval", position: { x: X(3), y: Q(0) + ve / 2 }, data: x }
  ], f = [
    ee(n, "out", a),
    ee(a, "out", i),
    ee(i, "true", s),
    ee(i, "false", d)
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
    edges: f,
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function tp(t) {
  const r = (/* @__PURE__ */ new Date()).toISOString(), n = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), s = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), u = {
    type: "trigger",
    triggerType: "webhook",
    webhookPath: "/pipelines/webhooks/helpdesk"
  }, x = {
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
  }, f = {
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
    { id: n, type: "trigger", position: { x: X(0), y: Q(0) }, data: u },
    { id: a, type: "llm", position: { x: X(1), y: Q(0) }, data: x },
    { id: i, type: "transform", position: { x: X(2), y: Q(0) }, data: h },
    { id: s, type: "condition", position: { x: X(3), y: Q(0) }, data: f },
    { id: d, type: "action", position: { x: X(4), y: Q(0) - ve / 2 }, data: g },
    { id: c, type: "llm", position: { x: X(4), y: Q(0) + ve / 2 }, data: m },
    { id: l, type: "approval", position: { x: X(5), y: Q(0) + ve / 2 }, data: v },
    { id: p, type: "action", position: { x: X(6), y: Q(0) + ve / 2 }, data: N }
  ], k = [
    ee(n, "out", a),
    ee(a, "out", i),
    ee(i, "out", s),
    ee(s, "true", d),
    ee(s, "false", c),
    ee(c, "out", l),
    ee(l, "approved", p)
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
    edges: k,
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
const Nn = [
  {
    id: "document-summary",
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    tags: ["llm", "summary", "document"],
    build: qd
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: Vd
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: Wd,
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
    build: Hd,
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
    build: Jd,
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
    build: Gd
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: Kd
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: Yd
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: Xd
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: Qd
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: Zd
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: ep
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: tp
  }
], go = "/api";
async function np(t) {
  const r = { createdTypes: [], errors: [] };
  if (!t?.documentTypes?.length) return r;
  for (const n of t.documentTypes)
    try {
      const a = await rp(n.name);
      if (a) {
        r.createdTypes.push(a.typeId);
        continue;
      }
      const i = await op(n);
      r.createdTypes.push(i.typeId);
    } catch (a) {
      r.errors.push(
        `Failed to scaffold "${n.name}": ${a instanceof Error ? a.message : String(a)}`
      );
    }
  return r;
}
async function rp(t) {
  try {
    const r = await fetch(`${go}/document-types`, { credentials: "same-origin" });
    if (!r.ok) return null;
    const a = (await r.json()).items?.find(
      (i) => i.name.toLowerCase() === t.toLowerCase()
    );
    return a ? { typeId: a.typeId } : null;
  } catch {
    return null;
  }
}
async function op(t) {
  const r = t.fields.map((i, s) => ({
    fieldId: crypto.randomUUID(),
    name: i.name,
    fieldType: i.fieldType,
    widget: ap(i.fieldType),
    cardinality: 1,
    required: i.required ?? !1,
    helpText: "",
    options: i.options,
    order: s
  })), n = await fetch(`${go}/document-types`, {
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
function ap(t) {
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
function ip(t) {
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
function sp(t) {
  const r = t.triggerBinding?.event ?? "manual";
  return r === "schedule" ? "Schedule" : r === "webhook" ? "Webhook" : r === "manual" ? "Manual" : r.startsWith("document.") ? `On ${r}` : r;
}
function lp({ template: t, meta: r, onPick: n }) {
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
function cp({
  open: t,
  onClose: r,
  onCreated: n,
  onSelect: a
}) {
  const { userId: i } = Bn(), [s, d] = $(""), c = ae(null);
  Z(() => {
    t && (d(""), setTimeout(() => c.current?.focus(), 30));
  }, [t]);
  const l = V(() => {
    const h = /* @__PURE__ */ new Map();
    for (const f of Nn) {
      const g = f.build(i || "anonymous");
      h.set(f.id, { nodeCount: g.nodes.length, trigger: sp(g) });
    }
    return h;
  }, [i, t]), p = V(() => {
    const h = s.trim().toLowerCase();
    return h ? Nn.filter(
      (f) => f.name.toLowerCase().includes(h) || f.description.toLowerCase().includes(h) || f.tags.some((g) => g.toLowerCase().includes(h))
    ) : Nn;
  }, [s]), u = (h) => {
    if (n) {
      const f = h.build(i || "anonymous"), g = ip(f);
      Fo(g), r(), n(g.id), h.prerequisites && np(h.prerequisites).then((m) => {
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
              lp,
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
const zn = ["draft", "published", "archived"], Mr = ["draft", "published"];
function dp(t) {
  if (t == null) return null;
  if (t.trim() === "") return /* @__PURE__ */ new Set();
  const r = new Set(zn);
  return new Set(
    t.split(",").map((a) => a.trim()).filter((a) => r.has(a))
  );
}
function pp(t, r) {
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
function up(t) {
  const r = t?.event;
  return !r || r === "manual" ? "manual" : r === "schedule" ? "schedule" : r === "webhook" ? "webhook" : "document";
}
function Dr(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function mp() {
  const t = /* @__PURE__ */ new Date(), r = t.getFullYear(), n = String(t.getMonth() + 1).padStart(2, "0"), a = String(t.getDate()).padStart(2, "0");
  return `${r}-${n}-${a}`;
}
function hp({
  open: t,
  onClose: r,
  onCreate: n
}) {
  const [a, i] = $(""), s = ae(null);
  Z(() => {
    t && (i(""), setTimeout(() => s.current?.focus(), 50));
  }, [t]);
  const d = a.trim().length > 0, c = () => {
    d && n(a.trim());
  };
  return /* @__PURE__ */ o(
    We,
    {
      open: t,
      onClose: r,
      title: "Create new pipeline",
      maxWidth: 440,
      footer: /* @__PURE__ */ o(K, { children: [
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
function Bm() {
  const t = Ee(), { userId: r } = Bn(), { toast: n } = tn(), { triggerRun: a, isTriggering: i } = Uo(), [s, d] = en(), [c, l] = $([]), [p, u] = $(""), [x, h] = $("all"), [f, g] = $("updated"), m = V(
    () => dp(s.get("status")),
    [s]
  ), v = V(() => m ?? new Set(Mr), [m]), N = m != null, y = (T) => {
    const _ = new URLSearchParams(s);
    if (T.size === 0)
      _.set("status", "");
    else {
      const se = zn.filter((ue) => T.has(ue)).join(",");
      _.set("status", se);
    }
    d(_, { replace: !0 });
  }, k = (T) => {
    const _ = N ? new Set(v) : new Set(Mr);
    _.has(T) ? _.delete(T) : _.add(T), y(_);
  }, [b, w] = $(!1), [C, R] = $(!1), [S, A] = $(null), [M, P] = $(!1), [U, W] = $(!1), [oe, ie] = $(!1), ce = E(async () => {
    const T = await jo(), _ = [];
    for (const se of T) {
      const ue = await nt(se.id);
      ue && _.push(pp(ue, se.icon));
    }
    l(_);
  }, []);
  Z(() => {
    ce();
  }, [ce]);
  const j = V(() => {
    const T = p.trim().toLowerCase(), se = [...c.filter((ue) => {
      if (T) {
        const ge = ue.name.toLowerCase().includes(T), De = ue.tags.some((Vn) => Vn.toLowerCase().includes(T));
        if (!ge && !De) return !1;
      }
      return !(!(N && v.size === 0) && !v.has(ue.status) || x !== "all" && up(ue.triggerBinding) !== x);
    })];
    return f === "name" ? se.sort((ue, ge) => ue.name.localeCompare(ge.name)) : f === "created" ? se.sort((ue, ge) => ge.createdAt.localeCompare(ue.createdAt)) : se.sort((ue, ge) => ge.updatedAt.localeCompare(ue.updatedAt)), se;
  }, [c, p, v, N, x, f]), D = V(() => j.map((T) => T.id), [j]), {
    selectionMode: J,
    selected: H,
    allVisibleSelected: O,
    selectAllRef: z,
    handleToggleSelect: q,
    handleSelectAllFiltered: G,
    handleHeaderToggleAll: de,
    clearSelection: F,
    setSelectionMode: re
  } = Fd({ visibleRows: j, filteredIds: D }), ye = V(() => {
    const T = /* @__PURE__ */ new Set();
    for (const _ of c)
      if (H.has(_.id))
        for (const se of _.tags) T.add(se);
    return Array.from(T).sort((_, se) => _.localeCompare(se));
  }, [c, H]), Me = async (T) => {
    const _ = await zo({ name: T, createdBy: r });
    w(!1), t(`/pipelines/${_.id}`);
  }, He = () => {
    const T = qo(r);
    rt(T).then(() => ce()), t(`/pipelines/${T.id}`);
  }, _e = (T) => {
    const _ = T.build(r);
    rt(_), R(!1), t(`/pipelines/${_.id}`);
  }, Re = (T) => t(`/pipelines/${T}`), Be = async (T) => {
    if (T.status !== "published") {
      n("Run requires published state", { type: "warning" });
      return;
    }
    if (!i)
      try {
        await a(T.id, {}) ? n(`Run started for "${T.name}"`, { type: "success" }) : n("Could not start run", { type: "error" });
      } catch (_) {
        n(`Run failed: ${_.message}`, { type: "error" });
      } finally {
        t(`/pipelines/${T.id}`);
      }
  }, Oe = (T) => {
    const _ = En(T);
    _ && (rt(_).then(() => ce()), n(`Duplicated as "${_.name}"`, { type: "success" }));
  }, Fe = (T) => {
    const _ = Cn(T.id);
    if (!_) {
      n("Export failed", { type: "error" });
      return;
    }
    Rt(`${Dr(T.name)}.pipeline.json`, _);
  }, we = async () => {
    S && (await Hn(S), A(null), ce(), n("Pipeline deleted", { type: "success" }));
  }, me = S ? c.find((T) => T.id === S) : null, te = () => {
    const T = Array.from(H);
    T.length !== 0 && (T.forEach((_, se) => {
      window.setTimeout(() => {
        const ue = c.find((De) => De.id === _), ge = Cn(_);
        !ue || !ge || Rt(`${Dr(ue.name)}-${mp()}.pipeline.json`, ge);
      }, se * 100);
    }), n(`Exported ${T.length} pipeline${T.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, Y = async (T) => {
    const _ = Array.from(H);
    for (const se of _) {
      const ue = await nt(se);
      if (!ue) continue;
      const ge = ue.tags ?? [];
      ge.includes(T) || (ue.tags = [...ge, T], await rt(ue));
    }
    W(!1), ce(), n(`Added tag "${T}" to ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ne = async (T) => {
    const _ = Array.from(H);
    for (const se of _) {
      const ue = await nt(se);
      if (!ue) continue;
      const ge = ue.tags ?? [];
      ge.includes(T) && (ue.tags = ge.filter((De) => De !== T), await rt(ue));
    }
    ce(), n(`Removed tag "${T}" from ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, pe = async () => {
    const T = Array.from(H);
    for (const _ of T) await Hn(_);
    P(!1), F(), ce(), n(`Deleted ${T.length} pipeline${T.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, xe = async () => {
    const T = Array.from(H);
    if (T.length === 0) return;
    let _ = 0, se = 0;
    for (const ue of T) {
      const ge = await nt(ue);
      if (!ge) continue;
      if (ge.status === "published") {
        se += 1;
        continue;
      }
      await Vo(ue) && (_ += 1);
    }
    ce(), se > 0 ? n(
      `Published ${_}; skipped ${se} already published`,
      { type: "success" }
    ) : n(
      `Published ${_} pipeline${_ === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, $e = async () => {
    const T = Array.from(H);
    if (T.length === 0) return;
    let _ = 0, se = 0;
    for (const ge of T) {
      const De = await nt(ge);
      if (!De) continue;
      De.status === "archived" ? (De.status = "draft", se += 1) : (De.status = "archived", _ += 1), await rt(De);
    }
    ce();
    const ue = [];
    _ > 0 && ue.push(`Archived ${_}`), se > 0 && ue.push(`Unarchived ${se}`), n(ue.join(" · ") || "No pipelines changed", { type: "success" });
  }, Ce = async () => {
    const T = Array.from(H);
    if (T.length === 0) return;
    const _ = [];
    for (const ue of T) {
      const ge = await nt(ue);
      ge && _.push(ge);
    }
    if (_.length === 0) {
      n("Export failed", { type: "error" });
      return;
    }
    const se = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    Rt(`pipelines-${se}.json`, JSON.stringify(_, null, 2)), n(`Exported ${_.length} pipeline${_.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  };
  Z(() => {
    const T = (_) => {
      const se = _.target;
      if (se) {
        const ge = se.tagName;
        if (ge === "INPUT" || ge === "TEXTAREA" || ge === "SELECT" || se.isContentEditable)
          return;
      }
      if (_.key === "Escape") {
        (H.size > 0 || J || U || oe) && (W(!1), ie(!1), F(), re(!1));
        return;
      }
      if ((_.metaKey || _.ctrlKey) && (_.key === "a" || _.key === "A")) {
        J && (_.preventDefault(), G());
        return;
      }
      (_.key === "Delete" || _.key === "Backspace") && H.size > 0 && !M && !S && !b && !C && (_.preventDefault(), P(!0));
    };
    return window.addEventListener("keydown", T), () => window.removeEventListener("keydown", T);
  }, [
    H,
    J,
    U,
    oe,
    M,
    S,
    b,
    C,
    F,
    G,
    re
  ]);
  const qe = c.length > 0, Lt = H.size > 0;
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
                    onClick: () => R(!0),
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
                    onClick: () => w(!0),
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
        qe && /* @__PURE__ */ e(
          Ld,
          {
            search: p,
            onSearchChange: u,
            statusFilter: v,
            statusExplicit: N,
            onToggleStatusKey: k,
            triggerFilter: x,
            onTriggerFilterChange: h,
            sortKey: f,
            onSortKeyChange: g,
            allVisibleSelected: O,
            selectAllRef: z,
            onHeaderToggleAll: de
          }
        ),
        Lt && /* @__PURE__ */ e(
          Bd,
          {
            count: H.size,
            onClear: F,
            onExport: te,
            onExportAsJSON: Ce,
            onPublish: xe,
            onArchive: $e,
            onAddTag: () => {
              W((T) => !T), ie(!1);
            },
            onRemoveTag: () => {
              ie((T) => !T), W(!1);
            },
            onDelete: () => P(!0),
            onDeleteWithConfirm: () => P(!0),
            addTagOpen: U,
            removeTagOpen: oe,
            onSubmitAddTag: Y,
            onSubmitRemoveTag: ne,
            onCloseAddTag: () => W(!1),
            onCloseRemoveTag: () => ie(!1),
            unionTags: ye
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: I(
              "flex-1 overflow-y-auto overflow-x-hidden min-w-0",
              qe ? "p-6" : "p-0"
            ),
            children: qe ? j.length === 0 ? /* @__PURE__ */ e(
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
                children: j.map((T) => /* @__PURE__ */ e(
                  Ed,
                  {
                    row: T,
                    onOpen: () => Re(T.id),
                    onRun: () => {
                      Be(T);
                    },
                    onDuplicate: () => Oe(T.id),
                    onExport: () => Fe(T),
                    onDelete: () => A(T.id),
                    selectionMode: J,
                    selected: H.has(T.id),
                    anySelected: Lt,
                    onToggleSelect: (_) => q(T.id, _)
                  },
                  T.id
                ))
              }
            ) : /* @__PURE__ */ o("div", { className: "flex flex-col h-full", children: [
              /* @__PURE__ */ e("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ e(
                Le,
                {
                  icon: "🔀",
                  title: "No pipelines yet",
                  body: "Design your first one — from scratch or pick a template later.",
                  actionLabel: "+ New Pipeline",
                  onAction: () => w(!0)
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
                    onClick: () => R(!0),
                    className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
                    children: "or browse templates"
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ e(
          hp,
          {
            open: b,
            onClose: () => w(!1),
            onCreate: Me
          }
        ),
        /* @__PURE__ */ e(
          cp,
          {
            open: C,
            onClose: () => R(!1),
            onSelect: _e
          }
        ),
        /* @__PURE__ */ e(
          We,
          {
            open: !!S,
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
            children: me && /* @__PURE__ */ o("p", { className: "m-0", children: [
              /* @__PURE__ */ o("strong", { children: [
                "“",
                me.name,
                "”"
              ] }),
              " will be permanently removed. Run history will also be lost."
            ] })
          }
        ),
        /* @__PURE__ */ e(
          We,
          {
            open: M,
            onClose: () => P(!1),
            title: `Delete ${H.size} pipeline${H.size === 1 ? "" : "s"}?`,
            maxWidth: 420,
            backdropTestId: "bulk-delete-modal",
            footer: /* @__PURE__ */ o(K, { children: [
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
const fp = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function bo(t, r, n) {
  const a = fp[t], i = Math.max(0, r | 0), s = Math.max(0, n | 0);
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
  const r = {};
  let n = 0, a = 0, i = 0, s = 0, d = !1;
  for (const l of t) {
    if (!l.model) continue;
    const p = l.tokensIn ?? 0, u = l.tokensOut ?? 0, x = bo(l.model, p, u), h = r[l.model];
    h ? r[l.model] = {
      inputTokens: h.inputTokens + x.inputTokens,
      outputTokens: h.outputTokens + x.outputTokens,
      inputCostUsd: h.inputCostUsd + x.inputCostUsd,
      outputCostUsd: h.outputCostUsd + x.outputCostUsd,
      totalCostUsd: h.totalCostUsd + x.totalCostUsd,
      model: l.model,
      modelFound: h.modelFound || x.modelFound
    } : r[l.model] = x, n += x.inputTokens, a += x.outputTokens, i += x.inputCostUsd, s += x.outputCostUsd, x.modelFound && (d = !0);
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
function Ot(t) {
  return !t || !t.modelFound && t.totalCostUsd === 0 ? "—" : t.totalCostUsd >= 0.01 ? `$${t.totalCostUsd.toFixed(2)}` : t.totalCostUsd === 0 ? "$0.00" : `$${t.totalCostUsd.toFixed(4)}`;
}
function xp(t) {
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
function yo(t, r) {
  let n = 0;
  if (t.llm) {
    const i = r.get(t.nodeId);
    i && (n += bo(i, t.llm.tokensIn, t.llm.tokensOut).totalCostUsd);
  }
  const a = t.costUsd;
  return typeof a == "number" && Number.isFinite(a) && a > 0 && (n += a), n;
}
function gp(t, r) {
  if (!r) return [];
  const n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const l of r.nodes)
    l.data.type === "llm" && n.set(l.id, l.data.model), a.set(l.id, xp(l)), i.set(l.id, l.data.type);
  const s = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const l of r.nodes)
    s.set(l.id, 0), d.set(l.id, 0);
  for (const l of t)
    for (const p of Object.values(l.steps ?? {})) {
      if (!a.has(p.nodeId)) continue;
      const u = yo(p, n);
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
function bp(t) {
  return t.slice(0, 10);
}
function yp(t) {
  return Date.UTC(
    Number(t.slice(0, 4)),
    Number(t.slice(5, 7)) - 1,
    Number(t.slice(8, 10))
  );
}
function vp(t, r, n = 30, a = /* @__PURE__ */ new Date()) {
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
    const x = new Date(u).toISOString().slice(0, 10);
    c.set(x, 0), l.set(x, 0);
  }
  for (const u of t) {
    const x = bp(u.startedAt);
    if (!c.has(x)) continue;
    let h = 0;
    for (const f of Object.values(u.steps ?? {}))
      h += yo(f, i);
    c.set(x, (c.get(x) ?? 0) + h), l.set(x, (l.get(x) ?? 0) + 1);
  }
  const p = [];
  for (let u = d; u <= s; u += 864e5) {
    const x = new Date(u).toISOString().slice(0, 10);
    p.push({
      date: x,
      ts: yp(x),
      totalCostUsd: c.get(x) ?? 0,
      runCount: l.get(x) ?? 0
    });
  }
  return p;
}
const vo = [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
], No = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], wo = ["24h", "7d", "30d", "all"], Np = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function wp(t) {
  return t.startsWith("document.") || t === "document" ? "document" : t === "schedule" || t === "scheduled" ? "scheduled" : t === "webhook" ? "webhook" : "manual";
}
function kp(t) {
  let r = 0;
  for (const n of Object.values(t.steps ?? {})) {
    const a = n.attempts?.length ?? 0;
    a > 1 && (r += a - 1);
  }
  return r;
}
function ko(t, r) {
  const n = r.now ?? Date.now(), a = r.range === "all" ? null : n - Np[r.range], i = r.query.trim().toLowerCase();
  return t.filter((s) => {
    if (r.statuses.size > 0 && !r.statuses.has(s.status)) return !1;
    if (r.triggerKinds.size > 0) {
      const d = wp(s.triggeredBy.triggerType);
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
function Er(t, r) {
  if (!t) return /* @__PURE__ */ new Set();
  const n = new Set(r);
  return new Set(
    t.split(",").map((a) => a.trim()).filter((a) => n.has(a))
  );
}
function Co(t) {
  const r = t.get("range") ?? "7d", n = wo.includes(r) ? r : "7d";
  return {
    query: t.get("q") ?? "",
    statuses: Er(t.get("status"), vo),
    triggerKinds: Er(t.get("trigger"), No),
    range: n
  };
}
const Cp = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, Ip = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, Sp = {
  "24h": "Last 24h",
  "7d": "Last 7d",
  "30d": "Last 30d",
  all: "All time"
};
function _r({
  label: t,
  options: r,
  selected: n,
  onToggle: a,
  labels: i,
  testIdPrefix: s
}) {
  const [d, c] = $(!1), l = ae(null);
  ut(l, () => c(!1), d);
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
function Io({
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
        /* @__PURE__ */ e("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: wo.map((u) => /* @__PURE__ */ e(
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
            children: Sp[u]
          },
          u
        )) }),
        /* @__PURE__ */ e("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ e(
          _r,
          {
            label: "Status",
            options: vo,
            selected: r,
            onToggle: s,
            labels: Cp,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ e(
          _r,
          {
            label: "Trigger",
            options: No,
            selected: n,
            onToggle: d,
            labels: Ip,
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
function $p({
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
function qn(t) {
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
function Tp(t) {
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
const Ap = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function Rp(t) {
  const r = Date.now() - new Date(t).getTime();
  return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 2592e5 ? `${Math.floor(r / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Pp({
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
  const p = ae(!1), u = ae(null), x = t.length > 0 && t.every((m) => r.has(m.id)), h = !x && t.some((m) => r.has(m.id)), f = () => {
    const m = new Set(r);
    if (x)
      for (const v of t) m.delete(v.id);
    else
      for (const v of t) m.add(v.id);
    n(m);
  }, g = (m, v, N) => {
    const y = new Set(r), k = !y.has(m);
    if (N && u.current != null) {
      const b = Math.min(u.current, v), w = Math.max(u.current, v);
      for (let C = b; C <= w; C++) {
        const R = t[C];
        R && (k ? y.add(R.id) : y.delete(R.id));
      }
    } else k ? y.add(m) : y.delete(m);
    u.current = v, n(y);
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
                  checked: x,
                  ref: (m) => {
                    m && (m.indeterminate = h);
                  },
                  onChange: f
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
          const { tone: N, label: y } = qn(m.status), k = r.has(m.id), b = kp(m);
          return /* @__PURE__ */ o(
            "tr",
            {
              "data-testid": `run-card-${m.id}`,
              className: I(
                "border-b border-border cursor-pointer hover:bg-[#f1f5f9]",
                k && "bg-[#f1f5f9]"
              ),
              onClick: () => c(`/pipelines/${d}/runs/${m.id}`),
              children: [
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary w-6", onClick: (w) => w.stopPropagation(), children: [
                  /* @__PURE__ */ e(
                    "input",
                    {
                      type: "checkbox",
                      "data-testid": `run-select-${m.id}`,
                      checked: k,
                      onMouseDown: (w) => {
                        p.current = w.shiftKey;
                      },
                      onKeyDown: (w) => {
                        p.current = w.shiftKey;
                      },
                      onChange: () => {
                        const w = p.current;
                        p.current = !1, g(m.id, v, w);
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
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: Rp(m.startedAt) }),
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: [
                  /* @__PURE__ */ e(le, { tone: N, "aria-label": `Status: ${y}`, children: y }),
                  m.status === "running" && m.stuckAt && /* @__PURE__ */ e(
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
                  m.status === "failed" && m.error?.errorCategory && /* @__PURE__ */ e(
                    le,
                    {
                      tone: Tp(m.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${m.id}`,
                      title: m.error.message,
                      className: "ml-1.5",
                      children: Ap[m.error.errorCategory] ?? m.error.errorCategory
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
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right", onClick: (w) => w.stopPropagation(), children: [
                  m.status === "running" && m.stuckAt && /* @__PURE__ */ e(
                    "button",
                    {
                      type: "button",
                      "data-testid": `force-fail-${m.id}`,
                      onClick: async (w) => {
                        if (w.stopPropagation(), !!confirm(`Force-fail stuck run ${m.id.slice(0, 8)}? The run will be interrupted and you can retry from the stuck step.`))
                          try {
                            await Wo(m.pipelineId, m.id);
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
                      onClick: (w) => {
                        w.stopPropagation(), l(m);
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
function Fm() {
  const { pipelineId: t } = mt(), r = Ee(), [n, a] = en(), [i, s] = $([]), [d, c] = $(null), [l, p] = $([]), [u, x] = $(() => /* @__PURE__ */ new Set()), [h, f] = $(null), [g, m] = $(!1), [v, N] = $(null), [y, k] = $(!1), b = E((O) => {
    const z = O.error?.nodeId;
    if (!z || z === "unknown") return;
    const q = Object.entries(O.steps).filter(([G, de]) => G !== z && de.status === "completed").map(([G]) => G);
    f({ run: O, nodeId: z, skippedNodes: q, snapshotInput: !1 }), N(null);
  }, []), w = E(async () => {
    if (h) {
      N(null), m(!0);
      try {
        const O = await oo(
          h.run.pipelineId,
          h.run.id,
          h.nodeId,
          void 0,
          h.snapshotInput || void 0
        );
        f(null), r(`/pipelines/${h.run.pipelineId}/runs/${O.newRunId}`);
      } catch (O) {
        N(O instanceof Error ? O.message : String(O)), m(!1);
      }
    }
  }, [h, r]), { query: C, statuses: R, triggerKinds: S, range: A } = V(
    () => Co(n),
    [n]
  ), M = (O, z) => {
    const q = new URLSearchParams(n);
    z ? q.set(O, z) : q.delete(O), a(q, { replace: !0 });
  }, P = (O) => {
    const z = new Set(R);
    z.has(O) ? z.delete(O) : z.add(O), M("status", z.size === 0 ? null : Array.from(z).join(","));
  }, U = (O) => {
    const z = new Set(S);
    z.has(O) ? z.delete(O) : z.add(O), M("trigger", z.size === 0 ? null : Array.from(z).join(","));
  }, W = (O) => {
    M("range", O === "7d" ? null : O);
  }, oe = (O) => {
    M("q", O.length === 0 ? null : O);
  }, ie = (O) => {
    p((z) => z.includes(O) ? z.filter((q) => q !== O) : z.length >= 2 ? [z[1], O] : [...z, O]);
  };
  Z(() => {
    t && (c(tt(t)), s(Yt(t)));
  }, [t]);
  const ce = V(
    () => ko(i, { query: C, statuses: R, triggerKinds: S, range: A }),
    [i, C, R, S, A]
  ), j = V(() => {
    const O = /* @__PURE__ */ new Map();
    if (!d) return O;
    for (const z of d.nodes)
      z.data.type === "llm" && O.set(z.id, z.data.model);
    return O;
  }, [d]), D = V(() => {
    const O = {};
    for (const z of ce) {
      const q = Object.values(z.steps).filter((G) => !!G.llm).map((G) => ({
        model: j.get(G.nodeId),
        tokensIn: G.llm?.tokensIn ?? 0,
        tokensOut: G.llm?.tokensOut ?? 0
      }));
      O[z.id] = Ot(xt(q).total);
    }
    return O;
  }, [ce, j]), J = () => {
    if (!t) return;
    k(!1);
    const O = Array.from(u), z = i.filter((q) => !u.has(q.id));
    ro(t);
    for (const q of [...z].sort((G, de) => G.startedAt.localeCompare(de.startedAt)))
      Ho(t, q);
    s(Yt(t)), x(/* @__PURE__ */ new Set()), p((q) => q.filter((G) => !O.includes(G)));
  }, H = () => {
    const O = i.filter((F) => u.has(F.id));
    if (O.length === 0) return;
    const z = new Blob([JSON.stringify(O, null, 2)], { type: "application/json" }), q = URL.createObjectURL(z), G = document.createElement("a"), de = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    G.href = q, G.download = `pipeline-runs-${de}.json`, document.body.appendChild(G), G.click(), document.body.removeChild(G), URL.revokeObjectURL(q);
  };
  return t ? d ? /* @__PURE__ */ o("div", { "data-testid": "pipeline-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e(
      In,
      {
        open: h !== null,
        onConfirm: w,
        onCancel: () => {
          g || f(null);
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
            /* @__PURE__ */ e("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: h.skippedNodes.map((O) => /* @__PURE__ */ e("span", { className: "bg-[#fafbfc] border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary", children: O.slice(0, 10) }, O)) })
          ] }),
          /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
            /* @__PURE__ */ e("input", { type: "checkbox", checked: h.snapshotInput, onChange: (O) => f((z) => z && { ...z, snapshotInput: O.target.checked }), className: "accent-primary" }),
            "Use persisted input snapshot"
          ] }),
          v && /* @__PURE__ */ e("div", { "data-testid": "retry-modal-error", className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: v })
        ] })
      }
    ),
    /* @__PURE__ */ e(
      In,
      {
        open: y,
        onConfirm: J,
        onCancel: () => k(!1),
        title: `Delete ${u.size} run${u.size === 1 ? "" : "s"}?`,
        body: "This cannot be undone.",
        confirmLabel: `Delete ${u.size}`,
        tone: "destructive"
      }
    ),
    v && /* @__PURE__ */ e(lt, { title: "Retry failed:", onDismiss: () => N(null), children: v }),
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
            const [O, z] = l;
            r(`/pipelines/${t}/runs/compare/${O}/${z}`);
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
      Io,
      {
        query: C,
        statuses: R,
        triggerKinds: S,
        range: A,
        onQueryChange: oe,
        onStatusToggle: P,
        onTriggerToggle: U,
        onRangeChange: W,
        onClearFilters: () => {
          oe(""), M("status", null), M("trigger", null);
        }
      }
    ),
    u.size > 0 && /* @__PURE__ */ e(
      $p,
      {
        selectionCount: u.size,
        onExport: H,
        onDelete: () => {
          u.size > 0 && t && k(!0);
        },
        onClear: () => x(/* @__PURE__ */ new Set())
      }
    ),
    ce.length === 0 ? /* @__PURE__ */ e(
      Le,
      {
        icon: "📜",
        title: i.length === 0 ? "No runs yet" : "No runs match these filters",
        body: i.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
      }
    ) : /* @__PURE__ */ e(
      Pp,
      {
        filtered: ce,
        selected: u,
        onSelectionChange: x,
        comparePair: l,
        onToggleComparePair: ie,
        costByRunId: D,
        pipelineId: t,
        onNavigate: r,
        onOpenRetryModal: b
      }
    )
  ] }) : /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
    Le,
    {
      icon: "🔍",
      title: "Pipeline not found",
      body: "It may have been deleted. Go back to the pipelines list.",
      actionLabel: "Back to pipelines",
      onAction: () => r("/pipelines")
    }
  ) }) : /* @__PURE__ */ e(ht, { to: "/pipelines", replace: !0 });
}
function Mp(t) {
  return V(() => {
    if (!t) return null;
    const r = tt(t.pipelineId);
    if (!r) return null;
    const n = /* @__PURE__ */ new Map();
    for (const i of r.nodes)
      i.data.type === "llm" && n.set(i.id, i.data.model);
    const a = Object.values(t.steps).filter((i) => !!i.llm).map((i) => ({
      model: n.get(i.nodeId),
      tokensIn: i.llm?.tokensIn ?? 0,
      tokensOut: i.llm?.tokensOut ?? 0
    }));
    return xt(a).total;
  }, [t]);
}
function Ge({ title: t, children: r }) {
  return /* @__PURE__ */ o("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ e("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: t }),
    r
  ] });
}
const Or = "m-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", Lr = "px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", wn = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", Te = "px-2 py-[5px] text-[11px] text-text-secondary align-top", Dp = {
  "#2563eb": "bg-blue-600/10 text-blue-600",
  "#7c3aed": "bg-violet-600/10 text-violet-600",
  "#16a34a": "bg-green-600/10 text-green-600",
  "#dc2626": "bg-red-600/10 text-red-600"
};
function Ct(t) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${Dp[t] ?? ""}`.trimEnd();
}
const Ep = {
  completed: "#16a34a",
  failed: "#dc2626",
  running: "#2563eb"
};
function _p({ stepId: t, step: r, index: n, nodeType: a, nodeConfig: i, onRetryFromStep: s, onResumeFromStep: d }) {
  const [c, l] = $(!1), p = r.output, u = p?.response, x = r.llm, h = r.input, f = Ep[r.status] ?? "#94a3b8";
  return /* @__PURE__ */ o("div", { className: "relative pl-9 mb-1", children: [
    /* @__PURE__ */ e(
      "div",
      {
        className: "absolute left-[10px] top-[14px] w-3 h-3 rounded-full border-2 border-white z-[1] shadow-[0_0_0_1px_#e2e8f0]",
        style: { background: f }
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
          border: `1px solid ${c ? f + "40" : "#e2e8f0"}`,
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
              style: { background: f },
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
          x && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
            x.tokensIn + x.tokensOut,
            " tok"
          ] }),
          p?.tokensIn != null && !x && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
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
        style: { border: `1px solid ${f}40` },
        children: [
          /* @__PURE__ */ e(Ge, { title: "Execution Timeline", children: /* @__PURE__ */ o("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ e("th", { scope: "col", className: wn, children: "Event" }),
              /* @__PURE__ */ e("th", { scope: "col", className: wn, children: "Time" }),
              /* @__PURE__ */ e("th", { scope: "col", className: wn, children: "Detail" })
            ] }) }),
            /* @__PURE__ */ o("tbody", { children: [
              r.startedAt && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Te, children: /* @__PURE__ */ e("span", { className: Ct("#2563eb"), children: "started" }) }),
                /* @__PURE__ */ e("td", { className: Te, children: new Date(r.startedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Te, children: [
                  "Node ",
                  t.slice(0, 8),
                  " (",
                  a,
                  ") began execution"
                ] })
              ] }),
              x?.streamOpened && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Te, children: /* @__PURE__ */ e("span", { className: Ct("#7c3aed"), children: "stream.opened" }) }),
                /* @__PURE__ */ e("td", { className: Te, children: "—" }),
                /* @__PURE__ */ e("td", { className: Te, children: "LLM stream connection established" })
              ] }),
              x?.firstTokenLatencyMs != null && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Te, children: /* @__PURE__ */ e("span", { className: Ct("#7c3aed"), children: "first.token" }) }),
                /* @__PURE__ */ o("td", { className: Te, children: [
                  "+",
                  x.firstTokenLatencyMs,
                  "ms"
                ] }),
                /* @__PURE__ */ e("td", { className: Te, children: "First token received from LLM" })
              ] }),
              r.completedAt && r.status === "completed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Te, children: /* @__PURE__ */ e("span", { className: Ct("#16a34a"), children: "completed" }) }),
                /* @__PURE__ */ e("td", { className: Te, children: new Date(r.completedAt).toLocaleTimeString() }),
                /* @__PURE__ */ o("td", { className: Te, children: [
                  "Finished in ",
                  r.durationMs != null ? r.durationMs < 1e3 ? `${r.durationMs}ms` : `${(r.durationMs / 1e3).toFixed(1)}s` : "—"
                ] })
              ] }),
              r.status === "failed" && /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ e("td", { className: Te, children: /* @__PURE__ */ e("span", { className: Ct("#dc2626"), children: "failed" }) }),
                /* @__PURE__ */ e("td", { className: Te, children: r.completedAt ? new Date(r.completedAt).toLocaleTimeString() : "—" }),
                /* @__PURE__ */ e("td", { className: Te, children: r.error ?? "Unknown error" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ e(Ge, { title: "Node Configuration", children: i && Object.keys(i).length > 1 ? /* @__PURE__ */ e("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(i).filter(([g]) => g !== "type").map(([g, m]) => /* @__PURE__ */ o(Zr.Fragment, { children: [
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
          h && Object.keys(h).length > 0 && /* @__PURE__ */ e(Ge, { title: "Runtime Input", children: /* @__PURE__ */ e("pre", { className: Or, children: JSON.stringify(h, null, 2) }) }),
          x?.prompt && /* @__PURE__ */ e(Ge, { title: "Resolved Prompt", children: /* @__PURE__ */ e("div", { className: Lr, children: x.prompt }) }),
          u || x?.response ? /* @__PURE__ */ e(Ge, { title: "Response", children: /* @__PURE__ */ e("div", { className: Lr, children: u ?? x?.response }) }) : /* @__PURE__ */ e(Ge, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ e("pre", { className: Or, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
          (x || p?.tokensIn != null) && /* @__PURE__ */ e(Ge, { title: "Token Usage", children: /* @__PURE__ */ o("div", { className: "flex gap-5 flex-wrap text-xs text-text-secondary", children: [
            /* @__PURE__ */ o("span", { children: [
              "Tokens in: ",
              /* @__PURE__ */ e("strong", { children: String(x?.tokensIn ?? p?.tokensIn ?? "—") })
            ] }),
            /* @__PURE__ */ o("span", { children: [
              "Tokens out: ",
              /* @__PURE__ */ e("strong", { children: String(x?.tokensOut ?? p?.tokensOut ?? "—") })
            ] }),
            x?.firstTokenLatencyMs != null && /* @__PURE__ */ o("span", { children: [
              "First token: ",
              /* @__PURE__ */ o("strong", { children: [
                x.firstTokenLatencyMs,
                "ms"
              ] })
            ] })
          ] }) }),
          r.error && /* @__PURE__ */ e(Ge, { title: "Error", children: /* @__PURE__ */ e("div", { className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap", children: r.error }) }),
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
function Op({ steps: t, nodeDataMap: r, edges: n, onRetryFromStep: a, onResumeFromStep: i }) {
  const s = V(() => {
    const l = Object.entries(t).sort(([, b], [, w]) => {
      const C = b.completedAt ? Date.parse(b.completedAt) - (b.durationMs ?? 0) : 0, R = w.completedAt ? Date.parse(w.completedAt) - (w.durationMs ?? 0) : 0;
      return C - R;
    });
    if (!n || n.length === 0)
      return l.map(([b, w]) => ({
        stepId: b,
        step: w,
        children: []
      }));
    const p = (b) => {
      const w = b.lastIndexOf(":");
      if (w > 0) {
        const C = b.slice(w + 1);
        if (/^\d+$/.test(C)) return b.slice(0, w);
      }
      return b;
    }, u = /* @__PURE__ */ new Set(["fork", "condition", "approval"]), x = /* @__PURE__ */ new Set();
    for (const [b] of l) {
      const w = p(b), C = r[w]?.type;
      C && u.has(C) && x.add(w);
    }
    const h = (b) => b.startsWith("branch-") || b === "true" || b === "false" || b === "approved" || b === "rejected", f = [];
    for (const b of n)
      x.has(b.source) && h(b.sourceHandle) && f.push({ forkId: b.source, branch: b.sourceHandle, targetNodeId: b.target });
    const g = /* @__PURE__ */ new Map();
    for (const b of n)
      g.has(b.source) || g.set(b.source, []), g.get(b.source).push({ target: b.target, handle: b.sourceHandle });
    const m = /* @__PURE__ */ new Set();
    function v(b) {
      const w = [];
      let C = b;
      for (; C; ) {
        const R = l.find(([W]) => p(W) === C && !m.has(W));
        if (!R) break;
        const [S, A] = R;
        m.add(S);
        const M = { stepId: S, step: A, children: [] }, P = p(S);
        if (x.has(P)) {
          const W = f.filter((oe) => oe.forkId === P);
          for (const { branch: oe, targetNodeId: ie } of W) {
            const ce = v(ie);
            for (const j of ce)
              j.branch = j.branch ?? oe;
            ce.length > 0 && (ce[0].branch = oe, M.children.push(...ce));
          }
        }
        w.push(M);
        const U = g.get(P)?.filter((W) => W.handle === "out");
        C = U && U.length === 1 ? U[0].target : null;
      }
      return w;
    }
    const N = /* @__PURE__ */ new Set();
    for (const b of n)
      N.add(b.target);
    const y = l.find(([b]) => !N.has(p(b)))?.[1] ? l.find(([b]) => !N.has(p(b)))[0] : l[0]?.[0];
    let k = [];
    y && (k = v(p(y)));
    for (const [b, w] of l)
      m.has(b) || k.push({ stepId: b, step: w, children: [] });
    return k;
  }, [t, r, n]), d = (l) => {
    if (r[l]) return r[l];
    const p = l.lastIndexOf(":");
    if (p > 0 && /^\d+$/.test(l.slice(p + 1)))
      return r[l.slice(0, p)];
  };
  function c(l, p) {
    let u = p;
    return l.map((x) => {
      const h = u++, f = /* @__PURE__ */ new Map();
      for (const g of x.children) {
        const m = g.branch ?? "default";
        f.has(m) || f.set(m, []), f.get(m).push(g);
      }
      return /* @__PURE__ */ o(Zr.Fragment, { children: [
        /* @__PURE__ */ e(
          _p,
          {
            stepId: x.stepId,
            step: x.step,
            index: h,
            nodeType: d(x.stepId)?.type ?? "unknown",
            nodeConfig: d(x.stepId)?.data,
            onRetryFromStep: a,
            onResumeFromStep: i
          }
        ),
        x.children.length > 0 && /* @__PURE__ */ e("div", { className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1", children: Array.from(f.entries()).map(([g, m], v) => /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("div", { className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${v === 0 ? "mt-1" : "mt-2"}`, children: g.replace("-", " ") }),
          c(m, u)
        ] }, g)) })
      ] }, x.stepId);
    });
  }
  return /* @__PURE__ */ o("div", { className: "relative", children: [
    /* @__PURE__ */ e("div", { className: "absolute left-[15px] top-6 bottom-6 w-0.5 bg-border rounded-sm" }),
    c(s, 0)
  ] });
}
const Lp = 5e3, Bp = "synthetic-";
function Fp(t) {
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
function Dn(t, r) {
  return r.timestamp.localeCompare(t.timestamp);
}
function Up(t, r) {
  if (r.length === 0) return t.slice().sort(Dn);
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
  return [...t, ...i].sort(Dn);
}
function jp(t, r, n = {}) {
  const { pollMs: a = Lp, filters: i } = n, s = da(), [d, c] = $([]), [l, p] = $([]), [u, x] = $(!0), [h, f] = $(null), [g, m] = $(void 0), [v, N] = $(0), [y, k] = $(!1), b = JSON.stringify({
    since: i?.since,
    until: i?.until,
    actions: i?.actions,
    limit: i?.limit
  });
  Z(() => {
    if (!t || !r) return;
    let A = !1;
    return x(!0), f(null), (async () => {
      try {
        const M = await Jn(t, r, i ?? {});
        if (A) return;
        c(M.items), m(M.nextCursor), x(!1);
      } catch (M) {
        if (A) return;
        f(M instanceof Error ? M.message : String(M)), x(!1);
      }
    })(), () => {
      A = !0;
    };
  }, [t, r, b, v]), Z(() => {
    if (!t || !r || a <= 0) return;
    const A = window.setInterval(() => {
      N((M) => M + 1);
    }, a);
    return () => window.clearInterval(A);
  }, [t, r, a]), Z(() => {
    if (!t || !r) return;
    const A = [], M = (U, W) => {
      const oe = Fp(U);
      if (!oe) return;
      const ie = W;
      if (ie.runId !== r) return;
      k(!0);
      const ce = {
        auditId: `${Bp}${U}-${ie.stepId ?? "run"}-${Date.now()}`,
        timestamp: ie.at ?? (/* @__PURE__ */ new Date()).toISOString(),
        action: oe,
        actorUserId: "executor",
        pipelineId: t,
        runId: r,
        trace: W
      };
      p((j) => [ce, ...j]);
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
    for (const U of P)
      A.push(s.subscribe(U, (W) => M(U, W)));
    return A.push(s.subscribeToRun(r)), () => {
      for (const U of A) U();
    };
  }, [s, t, r]), Z(() => {
    d.length !== 0 && p((A) => {
      if (A.length === 0) return A;
      const M = /* @__PURE__ */ new Map();
      for (const P of d) {
        const U = M.get(P.action);
        (!U || P.timestamp > U) && M.set(P.action, P.timestamp);
      }
      return A.filter((P) => {
        const U = M.get(P.action);
        return !U || P.timestamp >= U;
      });
    });
  }, [d]);
  const w = ae(!1), C = E(() => {
    !t || !r || !g || w.current || (w.current = !0, (async () => {
      try {
        const A = await Jn(t, r, {
          ...i ?? {},
          cursor: g
        });
        c((M) => {
          const P = new Set(M.map((W) => W.auditId)), U = M.concat(A.items.filter((W) => !P.has(W.auditId)));
          return U.sort(Dn), U;
        }), m(A.nextCursor);
      } catch (A) {
        f(A instanceof Error ? A.message : String(A));
      } finally {
        w.current = !1;
      }
    })());
  }, [t, r, g, b]), R = E(() => {
    N((A) => A + 1);
  }, []);
  return {
    items: V(() => Up(d, l), [d, l]),
    loading: u,
    error: h,
    hasMore: !!g,
    loadMore: C,
    liveHealthy: y,
    refresh: R
  };
}
const zp = "#3b82f6", qp = "#eab308", Vp = "#f97316", Br = "#64748b", Wp = "#ef4444", Hp = "#a855f7";
function Jp(t) {
  return t.action === "pipeline.step.failed" || t.outcome === "error" ? Wp : t.action === "pipeline.run.resumed-from-step" || t.action.startsWith("pipeline.step.context.patched") ? Hp : t.action.startsWith("pipeline.approval.") ? qp : t.action.startsWith("pipeline.breakpoint.") ? Vp : t.action.startsWith("pipeline.step.") ? zp : (t.action.startsWith("pipeline.run."), Br);
}
const Gp = {
  "1h": "Last 1h",
  "24h": "Last 24h",
  all: "All"
}, Fr = [
  { label: "Steps", matches: (t) => t.startsWith("pipeline.step.") },
  { label: "Approvals", matches: (t) => t.startsWith("pipeline.approval.") || t === "pipeline.approve" || t === "pipeline.reject" },
  { label: "Breakpoints", matches: (t) => t.startsWith("pipeline.breakpoint.") || t === "pipeline.step.breakpoint.hit" },
  { label: "Run lifecycle", matches: (t) => t.startsWith("pipeline.run.") || t === "pipeline.trigger" || t === "pipeline.cancel" },
  { label: "Errors", matches: (t) => t === "pipeline.step.failed" || t === "pipeline.run.failed" || t === "pipeline.force_fail" }
];
function Kp(t) {
  if (t === "all") return null;
  const r = Date.now();
  return t === "1h" ? r - 3600 * 1e3 : r - 1440 * 60 * 1e3;
}
function Ur(t) {
  const r = t.details, n = t.trace, a = r && typeof r.stepId == "string" ? r.stepId : void 0, i = n && typeof n.stepId == "string" ? n.stepId : void 0, s = n && typeof n.nodeId == "string" ? n.nodeId : void 0;
  return a ?? i ?? s;
}
function Yp(t, r = Date.now()) {
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
function Xp({
  pipelineId: t,
  runId: r,
  onStepClick: n
}) {
  const a = jp(t, r), { items: i, error: s, hasMore: d, loadMore: c, loading: l } = a, [p, u] = $(/* @__PURE__ */ new Set()), [x, h] = $(""), [f, g] = $("all"), [m, v] = $(/* @__PURE__ */ new Set()), N = E((C) => {
    u((R) => {
      const S = new Set(R);
      return S.has(C) ? S.delete(C) : S.add(C), S;
    });
  }, []), y = E((C) => {
    v((R) => {
      const S = new Set(R);
      return S.has(C) ? S.delete(C) : S.add(C), S;
    });
  }, []), k = V(() => {
    const C = Kp(f), R = x.trim().toLowerCase(), S = Fr.filter((A) => p.has(A.label));
    return i.filter((A) => {
      if (S.length > 0 && !S.some((M) => M.matches(A.action)) || R && !A.actorUserId.toLowerCase().includes(R)) return !1;
      if (C !== null) {
        const M = Date.parse(A.timestamp);
        if (!Number.isFinite(M) || M < C) return !1;
      }
      return !0;
    });
  }, [i, p, x, f]), b = E(() => {
    if (typeof window > "u") return;
    const C = k.map((M) => JSON.stringify(M)).join(`
`) + (k.length > 0 ? `
` : ""), R = new Blob([C], { type: "application/x-ndjson" }), S = URL.createObjectURL(R), A = document.createElement("a");
    A.href = S, A.download = `executor-log-${r}.ndjson`, document.body.appendChild(A), A.click(), document.body.removeChild(A), URL.revokeObjectURL(S);
  }, [k, r]), w = E(
    (C) => {
      if (y(C.auditId), !n || !C.action.startsWith("pipeline.step.")) return;
      const R = Ur(C);
      R && n(R);
    },
    [n, y]
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
          Fr.map((C) => {
            const R = p.has(C.label);
            return /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  R ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => N(C.label),
                "data-testid": `executor-log-chip-${C.label.toLowerCase().replace(/\s+/g, "-")}`,
                "aria-pressed": R,
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
              value: x,
              onChange: (C) => h(C.target.value),
              placeholder: "Actor",
              className: "font-[inherit] text-xs px-2 py-1 border border-border-field rounded bg-surface text-text-primary min-w-[120px]",
              "data-testid": "executor-log-actor-input",
              "aria-label": "Filter by actor"
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-border", children: "|" }),
          ["1h", "24h", "all"].map((C) => {
            const R = f === C;
            return /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  R ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => g(C),
                "data-testid": `executor-log-time-${C}`,
                "aria-pressed": R,
                children: Gp[C]
              },
              C
            );
          }),
          /* @__PURE__ */ e("div", { className: "flex-1" }),
          /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary", children: [
            k.length,
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
          k.length === 0 && i.length > 0 && /* @__PURE__ */ e(
            "div",
            {
              className: "px-3 py-5 text-xs text-text-tertiary text-center",
              "data-testid": "executor-log-no-matches",
              children: "No audit rows match the current filters."
            }
          ),
          k.map((C) => {
            const R = m.has(C.auditId), A = C.action.startsWith("pipeline.step.") ? Ur(C) : void 0;
            return /* @__PURE__ */ o(
              "div",
              {
                className: "grid grid-cols-[14px_auto_auto_1fr] items-baseline gap-2.5 py-1.5 text-xs border-b border-[#fafbfc] cursor-pointer",
                onClick: () => w(C),
                "data-testid": "executor-log-row",
                "data-action": C.action,
                "data-audit-id": C.auditId,
                children: [
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "w-2.5 h-2.5 rounded-full shrink-0 self-center",
                      style: { background: Jp(C) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: C.timestamp,
                      children: Yp(C.timestamp)
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
                  R && C.trace && /* @__PURE__ */ e(
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
            je,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => c(),
              children: "Load more"
            }
          ) }) : /* @__PURE__ */ e("span", {}),
          /* @__PURE__ */ e("span", { "data-testid": "executor-log-download", children: /* @__PURE__ */ e(
            je,
            {
              variant: "secondary",
              size: "sm",
              onClick: b,
              disabled: k.length === 0,
              children: "Download log"
            }
          ) })
        ] })
      ]
    }
  );
}
function Um() {
  const { pipelineId: t, runId: r } = mt();
  return !t || !r ? /* @__PURE__ */ e(ht, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(no, { pipelineId: t, children: /* @__PURE__ */ e(Jo, { children: /* @__PURE__ */ e(Qp, { pipelineId: t, runId: r }) }) });
}
function Qp({ pipelineId: t, runId: r }) {
  const n = Ee(), a = Ye(), i = ft(), { definition: s } = a, [d, c] = $(null);
  Z(() => {
    let F = !1;
    return import("./PipelineEditorServicesContext-D943p7tZ.js").then((re) => re.T).then(({ getPipelineRun: re }) => {
      re(t, r).then((ye) => {
        !F && ye && c(ye);
      });
    }), () => {
      F = !0;
    };
  }, [t, r]);
  const l = V(() => {
    const F = i.runs[r], re = d;
    if (!F && !re) return;
    if (!F) return re ?? void 0;
    if (!re) return F;
    const ye = Object.keys(F.steps).length, Me = Object.keys(re.steps).length;
    return ye >= Me ? F : { ...re, status: F.status, currentStepIds: F.currentStepIds };
  }, [i.runs, r, d]);
  Go(r);
  const p = Mp(l ?? null), u = V(() => {
    const F = {};
    if (!s) return F;
    for (const re of s.nodes)
      F[re.id] = { type: re.data.type, data: re.data };
    return F;
  }, [s]), [x, h] = $(!1), f = ae(null);
  ut(f, () => h(!1), x);
  const [g, m] = $("steps"), [v, N] = $(null), y = E((F) => {
    N(F), m("steps");
  }, []), [k, b] = $(null), [w, C] = $(null), [R, S] = $(!1), A = l?.status === "failed" ? l.error?.nodeId : void 0, M = E((F) => {
    if (!l) return;
    const re = Object.entries(l.steps).filter(([ye, Me]) => ye !== F && Me.status === "completed").map(([ye]) => ye);
    b({ nodeId: F, skippedNodes: re, snapshotInput: !1 }), C(null);
  }, [l]), P = E(async () => {
    if (!(!k || !l)) {
      C(null), S(!0);
      try {
        const F = await oo(
          t,
          l.id,
          k.nodeId,
          void 0,
          k.snapshotInput || void 0
        );
        b(null), n(`/pipelines/${t}/runs/${F.newRunId}`);
      } catch (F) {
        C(F instanceof Error ? F.message : String(F)), S(!1);
      }
    }
  }, [k, l, t, n]), [U, W] = $(null), [oe, ie] = $(null), [ce, j] = $(null), D = E(async (F) => {
    if (l) {
      ie(null), W(F);
      try {
        const re = await Ko(t, l.id, F);
        j(
          `Resumed from ${F.slice(0, 10)}${F.length > 10 ? "…" : ""} (replay #${re.replayAttempts})`
        ), setTimeout(() => j(null), 4e3), n(`/pipelines/${t}/runs/${l.id}`);
      } catch (re) {
        ie(re instanceof Error ? re.message : String(re));
      } finally {
        W(null);
      }
    }
  }, [l, t, n]), J = E(async () => {
    if (!l) {
      try {
        const F = await i.triggerRun(t);
        n(`/pipelines/${t}/runs/${F}`);
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
      n(`/pipelines/${t}/runs/${F}`);
    } catch (F) {
      console.error("[PipelineRunReplay] re-run failed", F);
    }
  }, [l, i, t, n]), H = async () => {
    h(!1);
    try {
      await navigator.clipboard?.writeText(r);
    } catch {
    }
  }, O = () => {
    if (h(!1), !l) return;
    const F = JSON.stringify(l, null, 2);
    Rt(`run-${r}.json`, F);
  }, z = () => {
    if (h(!1), !s) return;
    const F = En(
      s.id,
      `${s.name} (from run)`
    );
    F && n(`/pipelines/${F.id}`);
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
              je,
              {
                onClick: () => n(`/pipelines/${t}`),
                children: "Back to pipeline"
              }
            )
          ] })
        ]
      }
    );
  const q = qn(l.status), G = l.triggeredBy.userId ?? l.triggeredBy.triggerType, de = Ot(p);
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
                pt(l.startedAt),
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
          /* @__PURE__ */ e(le, { tone: q.tone, "aria-label": `Status: ${q.label}`, children: q.label }),
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
            je,
            {
              onClick: () => M(A),
              disabled: R,
              "data-testid": "retry-from-failed-step-button",
              title: `Retry from "${A}" with the original upstream context`,
              children: "↻ Retry from failure"
            }
          ),
          /* @__PURE__ */ e(
            je,
            {
              onClick: J,
              "data-testid": "rerun-button",
              title: "Re-run with the original trigger payload",
              children: "↻ Re-run"
            }
          ),
          /* @__PURE__ */ o("div", { className: "relative", ref: f, children: [
            /* @__PURE__ */ e(
              Tt,
              {
                onClick: () => h((F) => !F),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            x ? /* @__PURE__ */ o("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: H, children: "Copy runId" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: O, children: "Export run JSON" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: z, children: "Open as new draft" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ e(
          In,
          {
            open: k !== null,
            onConfirm: P,
            onCancel: () => {
              R || b(null);
            },
            title: "Retry from step",
            confirmLabel: R ? "Starting…" : "Confirm retry",
            confirmDisabled: R,
            children: k && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[13px] text-text-secondary", children: [
                "A new run will start from",
                " ",
                /* @__PURE__ */ o("code", { className: "bg-surface-inset px-1 rounded text-xs", children: [
                  k.nodeId.slice(0, 12),
                  k.nodeId.length > 12 ? "…" : ""
                ] }),
                " ",
                "using the original upstream context."
              ] }),
              k.skippedNodes.length > 0 && /* @__PURE__ */ o("div", { children: [
                /* @__PURE__ */ o("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5", children: [
                  "Steps that will be skipped (",
                  k.skippedNodes.length,
                  ")"
                ] }),
                /* @__PURE__ */ e("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: k.skippedNodes.map((F) => /* @__PURE__ */ e("span", { className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary", children: F.slice(0, 10) }, F)) })
              ] }),
              /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
                /* @__PURE__ */ e(
                  "input",
                  {
                    type: "checkbox",
                    checked: k.snapshotInput,
                    onChange: (F) => b((re) => re && { ...re, snapshotInput: F.target.checked }),
                    className: "accent-primary"
                  }
                ),
                "Use persisted input snapshot"
              ] }),
              w && /* @__PURE__ */ e("div", { "data-testid": "retry-modal-error", className: "py-2 px-3 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: w })
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
          w && /* @__PURE__ */ e(lt, { title: "Retry failed:", className: "mb-4", children: w }),
          oe && /* @__PURE__ */ e(lt, { title: "Resume failed:", className: "mb-4", "data-testid": "resume-error-banner", children: oe }),
          (l.replayAttempts ?? 0) > 0 && /* @__PURE__ */ e(
            lt,
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
                    pt(l.resumeHistory[l.resumeHistory.length - 1].at),
                    "."
                  ] })
                ] }),
                l.resumeHistory && l.resumeHistory.length > 1 && /* @__PURE__ */ e(
                  "ol",
                  {
                    className: "m-0 pl-[18px] text-[11px] text-text-tertiary leading-relaxed",
                    "data-testid": "resume-history-timeline",
                    children: l.resumeHistory.map((F, re) => /* @__PURE__ */ o("li", { children: [
                      "from ",
                      /* @__PURE__ */ e("code", { children: F.fromNodeId.slice(0, 12) }),
                      " at ",
                      pt(F.at)
                    ] }, `${F.fromNodeId}-${F.at}-${re}`))
                  }
                )
              ] })
            }
          ),
          ce && /* @__PURE__ */ e(lt, { title: "Resumed", className: "mb-4", "data-testid": "resume-toast", children: ce }),
          l.error && /* @__PURE__ */ o(lt, { title: "Run failed:", className: "mb-4", children: [
            l.error.message,
            l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o("span", { className: "ml-2 text-[11px] text-[#b91c1c]", children: [
              "at node ",
              l.error.nodeId.slice(0, 8)
            ] }),
            l.status === "failed" && l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ e("div", { className: "mt-2", children: /* @__PURE__ */ e(
              je,
              {
                onClick: () => D(l.error.nodeId),
                disabled: U !== null,
                "data-testid": "resume-from-here-button",
                title: `Resume this run from "${l.error.nodeId}" using its accumulated upstream context`,
                children: U === l.error.nodeId ? "Resuming…" : "↻ Resume from here"
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
                const re = g === F.id;
                return /* @__PURE__ */ e(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": re,
                    onClick: () => m(F.id),
                    "data-testid": `run-replay-tab-${F.id}`,
                    className: I(
                      "font-[inherit] text-[13px] font-semibold py-1.5 px-3.5 border-none bg-transparent cursor-pointer -mb-px",
                      re ? "text-text-primary border-b-2 border-b-primary" : "text-text-tertiary border-b-2 border-b-transparent"
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
              Op,
              {
                steps: l.steps,
                nodeDataMap: u,
                edges: s?.edges,
                onRetryFromStep: M,
                onResumeFromStep: l.status === "failed" ? D : void 0
              }
            )
          ) : /* @__PURE__ */ e("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ e(
            Xp,
            {
              pipelineId: t,
              runId: r,
              onStepClick: y
            }
          ) })
        ] }) })
      ]
    }
  );
}
function Zp(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${ke(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function eu(t) {
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
function tu(t, r) {
  if (!t) return r;
  const n = t.nodes.find((a) => a.id === r);
  return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : r;
}
function nu(t, r) {
  if (!t) return !1;
  const n = t.nodes.find((a) => a.id === r);
  return !!n && n.data.type === "condition";
}
function jr(t) {
  if (!t) return;
  const r = t.output;
  if (r && typeof r == "object" && "result" in r)
    return r.result ? "true" : "false";
}
function ru(t, r) {
  const n = (h) => h.split(/(\s+)/).filter((f) => f.length > 0), a = n(t), i = n(r), s = a.length, d = i.length, c = Array.from({ length: s + 1 }, () => new Array(d + 1).fill(0));
  for (let h = s - 1; h >= 0; h--)
    for (let f = d - 1; f >= 0; f--)
      a[h] === i[f] ? c[h][f] = c[h + 1][f + 1] + 1 : c[h][f] = Math.max(c[h + 1][f], c[h][f + 1]);
  const l = [], p = (h, f) => {
    const g = l[l.length - 1];
    g && g.type === h ? g.text += f : l.push({ type: h, text: f });
  };
  let u = 0, x = 0;
  for (; u < s && x < d; )
    a[u] === i[x] ? (p("eq", a[u]), u++, x++) : c[u + 1][x] >= c[u][x + 1] ? (p("del", a[u]), u++) : (p("add", i[x]), x++);
  for (; u < s; )
    p("del", a[u++]);
  for (; x < d; )
    p("add", i[x++]);
  return l;
}
function ou(t, r, n) {
  const a = /* @__PURE__ */ new Set(), i = [];
  if (n)
    for (const s of n.nodes)
      (t.steps[s.id] || r.steps[s.id]) && (i.push(s.id), a.add(s.id));
  for (const s of [...Object.keys(t.steps), ...Object.keys(r.steps)])
    a.has(s) || (i.push(s), a.add(s));
  return i.map((s) => {
    const d = t.steps[s], c = r.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, x = !!d && !!c && d.status !== c.status;
    let h = !1;
    l != null && p != null && l > 0 && (h = Math.abs(p - l) / l > 0.5);
    const f = nu(n, s), g = f ? jr(d) : void 0, m = f ? jr(c) : void 0, v = f && g !== void 0 && m !== void 0 && g !== m;
    return {
      nodeId: s,
      name: tu(n, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: x,
      durationLarge: h,
      branchDiffers: v,
      isLlm: !!(d?.llm || c?.llm),
      isCondition: f,
      branchA: g,
      branchB: m
    };
  });
}
function au(t) {
  if (t.statusDiffers) return "bg-[#fef2f2]";
  if (t.branchDiffers) return "bg-[#eff6ff]";
  if (t.durationLarge) return "bg-[#fffbeb]";
}
function zr({
  step: t,
  branch: r,
  isCondition: n
}) {
  if (!t)
    return /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" });
  const a = eu(t.status);
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(le, { tone: a, children: t.status }),
      /* @__PURE__ */ e("span", { className: "font-mono text-text-secondary", children: ke(t.durationMs) }),
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
function iu({ a: t, b: r }) {
  const n = V(() => ru(t, r), [t, r]);
  return /* @__PURE__ */ e(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: n.map((a, i) => a.type === "eq" ? /* @__PURE__ */ e("span", { children: a.text }, i) : a.type === "add" ? /* @__PURE__ */ e("span", { "data-diff": "add", className: "bg-[#dcfce7] text-[#166534]", children: a.text }, i) : /* @__PURE__ */ e("span", { "data-diff": "del", className: "bg-[#fee2e2] text-[#991b1b] line-through", children: a.text }, i))
    }
  );
}
function su({ row: t }) {
  const r = t.a?.llm, n = t.b?.llm, a = r && n ? n.tokensIn + n.tokensOut - (r.tokensIn + r.tokensOut) : void 0, i = au(t);
  return /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ o("tr", { "data-testid": `run-compare-row-${t.nodeId}`, className: i, children: [
      /* @__PURE__ */ o("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-text-primary", children: t.name }),
        /* @__PURE__ */ e("div", { className: "font-mono text-[11px] text-text-tertiary", children: t.nodeId })
      ] }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ e(zr, { step: t.a, branch: t.branchA, isCondition: t.isCondition }) }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ e(zr, { step: t.b, branch: t.branchB, isCondition: t.isCondition }) }),
      /* @__PURE__ */ o(
        "td",
        {
          className: I("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", i),
          "data-testid": `run-compare-delta-${t.nodeId}`,
          children: [
            t.branchDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#2563eb]", children: "different branch!" }) : t.statusDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#dc2626]", children: "status differs" }) : t.durationDelta != null ? /* @__PURE__ */ e("span", { className: t.durationLarge ? "text-[#d97706]" : "text-text-secondary", children: Zp(t.durationDelta) }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "—" }),
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
          iu,
          {
            a: r?.response ?? "",
            b: n?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function lu({ runA: t, runB: r, def: n }) {
  const a = V(() => ou(t, r, n), [t, r, n]);
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
        /* @__PURE__ */ e("tbody", { children: a.map((i) => /* @__PURE__ */ e(su, { row: i }, i.nodeId)) })
      ]
    }
  );
}
function cu(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${ke(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function du(t) {
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
function pu(t) {
  const r = /* @__PURE__ */ new Map();
  if (!t) return r;
  for (const n of t.nodes)
    n.data.type === "llm" && r.set(n.id, n.data.model);
  return r;
}
function qr(t, r) {
  const n = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
    model: r.get(a.nodeId),
    tokensIn: a.llm?.tokensIn ?? 0,
    tokensOut: a.llm?.tokensOut ?? 0
  }));
  return Ot(xt(n).total);
}
function Vr({
  label: t,
  run: r,
  cost: n,
  testIdPrefix: a
}) {
  const i = du(r.status);
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
          /* @__PURE__ */ e("span", { className: "text-text-secondary", children: pt(r.startedAt) })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(le, { tone: i, children: r.status }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", children: ke(r.durationMs) }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", "data-testid": `${a}-cost`, children: n })
        ] })
      ]
    }
  );
}
function jm() {
  const { pipelineId: t, runIdA: r, runIdB: n } = mt(), a = Ee(), i = V(
    () => t ? tt(t) : null,
    [t]
  ), s = V(
    () => t && r ? Xt(t, r) : null,
    [t, r]
  ), d = V(
    () => t && n ? Xt(t, n) : null,
    [t, n]
  ), c = V(() => pu(i), [i]);
  if (!t || !r || !n)
    return /* @__PURE__ */ e(ht, { to: "/pipelines", replace: !0 });
  if (!i)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      Le,
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
      Le,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable — they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => a(`/pipelines/${t}/runs`)
      }
    ) });
  const l = (d.durationMs ?? 0) - (s.durationMs ?? 0), p = qr(s, c), u = qr(d, c), x = (/* @__PURE__ */ new Set([
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
      /* @__PURE__ */ e(Vr, { label: "Run A", run: s, cost: p, testIdPrefix: "run-a" }),
      /* @__PURE__ */ e(Vr, { label: "Run B", run: d, cost: u, testIdPrefix: "run-b" })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
        "data-testid": "run-compare-delta",
        children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Δ duration" }),
          /* @__PURE__ */ e("span", { className: "font-mono text-[13px]", children: cu(l) }),
          /* @__PURE__ */ e("span", { className: "flex-1" }),
          /* @__PURE__ */ o("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
            x,
            " step",
            x === 1 ? "" : "s",
            " compared"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e(lu, { runA: s, runB: d, def: i })
  ] });
}
function uu(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${ke(Math.abs(t))}`;
}
function Wr(t) {
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
function mu({
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
              /* @__PURE__ */ e(le, { tone: Wr(t.status), children: t.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: pt(t.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              ke(t.durationMs),
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
              /* @__PURE__ */ e(le, { tone: Wr(r.status), children: r.status })
            ] }),
            /* @__PURE__ */ e("div", { className: "text-xs text-text-secondary", children: pt(r.startedAt) }),
            /* @__PURE__ */ o("div", { className: "font-mono text-xs", children: [
              ke(r.durationMs),
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
              children: uu(d)
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
function hu(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${ke(Math.abs(t))}`;
}
function Hr(t) {
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
function fu(t, r) {
  if (!t) return r;
  const n = t.nodes.find((a) => a.id === r);
  return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : r;
}
function xu(t, r, n) {
  const a = /* @__PURE__ */ new Set(), i = [];
  if (n)
    for (const s of n.nodes)
      (t.steps[s.id] || r.steps[s.id]) && (i.push(s.id), a.add(s.id));
  for (const s of [...Object.keys(t.steps), ...Object.keys(r.steps)])
    a.has(s) || (i.push(s), a.add(s));
  return i.map((s) => {
    const d = t.steps[s], c = r.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, x = !!d && !!c && d.status !== c.status, h = !!d && !c, f = !d && !!c, g = d?.llm ? d.llm.tokensIn + d.llm.tokensOut : void 0, m = c?.llm ? c.llm.tokensIn + c.llm.tokensOut : void 0, v = g != null && m != null ? m - g : void 0;
    return {
      nodeId: s,
      name: fu(n, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: x,
      onlyInA: h,
      onlyInB: f,
      tokenDelta: v
    };
  });
}
function gu({ runA: t, runB: r, def: n }) {
  const a = V(() => xu(t, r, n), [t, r, n]);
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
            i.onlyInA && /* @__PURE__ */ e(le, { tone: "warning", size: "xs", children: "only in A" }),
            i.onlyInB && /* @__PURE__ */ e(le, { tone: "warning", size: "xs", children: "only in B" })
          ] }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: i.a ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(le, { tone: Hr(i.a.status), children: i.a.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: ke(i.a.durationMs) }),
            i.a.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              i.a.llm.tokensIn,
              " in / ",
              i.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: i.b ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(le, { tone: Hr(i.b.status), children: i.b.status }),
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
                children: hu(i.durationDelta)
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
function bu(t, r) {
  if (!t) return r;
  const n = t.nodes.find((a) => a.id === r);
  return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : r;
}
function Zt(t, r = "", n = 0) {
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
        for (const [c, l] of Zt(t[s], d, n + 1))
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
      for (const [l, p] of Zt(d, c, n + 1))
        a.set(l, p);
    }
  return a;
}
function So(t, r) {
  const n = Zt(t), a = Zt(r), i = /* @__PURE__ */ new Set([...n.keys(), ...a.keys()]), s = [];
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
const yu = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function vu({
  nodeId: t,
  name: r,
  outputA: n,
  outputB: a
}) {
  const [i, s] = $(!1), d = V(() => So(n, a), [n, a]), c = d.filter((l) => l.type !== "unchanged").length;
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
              /* @__PURE__ */ o(le, { tone: "warning", size: "xs", className: "ml-auto", children: [
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
              yu[l.type]
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
function Nu({ runA: t, runB: r, def: n }) {
  const a = V(() => {
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
    vu,
    {
      nodeId: i,
      name: bu(n, i),
      outputA: t.steps[i]?.output,
      outputB: r.steps[i]?.output
    },
    i
  )) });
}
function wu(t) {
  const r = /* @__PURE__ */ new Map();
  if (!t) return r;
  for (const n of t.nodes)
    n.data.type === "llm" && r.set(n.id, n.data.model);
  return r;
}
function Jr(t, r) {
  const n = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
    model: r.get(a.nodeId),
    tokensIn: a.llm?.tokensIn ?? 0,
    tokensOut: a.llm?.tokensOut ?? 0
  }));
  return Ot(xt(n).total);
}
function Gt({
  title: t,
  defaultOpen: r = !0,
  badge: n,
  children: a,
  testId: i
}) {
  const [s, d] = $(r);
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
              n && /* @__PURE__ */ e(le, { tone: "info", className: "ml-auto", children: n })
            ]
          }
        ),
        s && /* @__PURE__ */ e("div", { className: "p-4", children: a })
      ]
    }
  );
}
const ku = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function Cu({
  runA: t,
  runB: r
}) {
  const n = V(
    () => So(t.context, r.context),
    [t.context, r.context]
  ), a = n.filter((i) => i.type !== "unchanged").length;
  return /* @__PURE__ */ e(
    Gt,
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
            ku[i.type]
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
function Iu({ pipelineId: t, runIdA: r, runIdB: n }) {
  const a = Ee(), i = V(
    () => tt(t),
    [t]
  ), s = V(
    () => Xt(t, r),
    [t, r]
  ), d = V(
    () => Xt(t, n),
    [t, n]
  ), c = V(() => wu(i), [i]);
  if (!i)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      Le,
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
      Le,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable -- they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => a(`/pipelines/${t}/runs`)
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
        /* @__PURE__ */ e(Gt, { title: "Summary", testId: "diff-summary-section", children: /* @__PURE__ */ e(
          mu,
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
            children: /* @__PURE__ */ e(gu, { runA: s, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ e(
          Gt,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ e(Nu, { runA: s, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ e(Cu, { runA: s, runB: d })
      ]
    }
  );
}
function zm() {
  const { pipelineId: t } = mt(), [r] = en(), n = r.get("a"), a = r.get("b");
  return !t || !n || !a ? /* @__PURE__ */ e(ht, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(Iu, { pipelineId: t, runIdA: n, runIdB: a });
}
function qm() {
  const t = Ee(), [r, n] = en(), [a, i] = $([]), { runs: s } = ft();
  Z(() => {
    let y = !1;
    return (async () => {
      const k = Gn(), b = [];
      await Promise.all(
        k.map(async (w) => {
          try {
            const { runs: C } = await to(w.id, { limit: 50 });
            if (C.length > 0) {
              for (const R of C)
                R.id && b.push({ ...R, pipelineName: w.name });
              return;
            }
          } catch {
          }
          for (const C of Yt(w.id))
            C.id && b.push({ ...C, pipelineName: w.name });
        })
      ), !y && (b.sort((w, C) => C.startedAt.localeCompare(w.startedAt)), i(b));
    })(), () => {
      y = !0;
    };
  }, []);
  const d = V(() => {
    const y = new Map(Gn().map((w) => [w.id, w.name])), k = new Set(a.map((w) => w.id)), b = [];
    for (const [w, C] of Object.entries(s))
      k.has(w) || C.pipelineId && b.push({
        ...C,
        pipelineName: y.get(C.pipelineId) ?? `Pipeline ${C.pipelineId.slice(0, 8)}`
      });
    return b.length === 0 ? a : [...b, ...a].sort((w, C) => C.startedAt.localeCompare(w.startedAt));
  }, [a, s]), { query: c, statuses: l, triggerKinds: p, range: u } = V(
    () => Co(r),
    [r]
  ), x = (y, k) => {
    const b = new URLSearchParams(r);
    k ? b.set(y, k) : b.delete(y), n(b, { replace: !0 });
  }, h = (y) => {
    const k = new Set(l);
    k.has(y) ? k.delete(y) : k.add(y), x("status", k.size === 0 ? null : Array.from(k).join(","));
  }, f = (y) => {
    const k = new Set(p);
    k.has(y) ? k.delete(y) : k.add(y), x("trigger", k.size === 0 ? null : Array.from(k).join(","));
  }, g = (y) => {
    x("range", y === "7d" ? null : y);
  }, m = (y) => {
    x("q", y.length === 0 ? null : y);
  }, v = V(
    () => ko(d, { query: c, statuses: l, triggerKinds: p, range: u }),
    [d, c, l, p, u]
  ), N = V(() => {
    const y = {};
    for (const k of v) {
      const b = Object.values(k.steps).filter((C) => !!C.llm).map((C) => ({
        model: void 0,
        tokensIn: C.llm?.tokensIn ?? 0,
        tokensOut: C.llm?.tokensOut ?? 0
      })), w = xt(b);
      w.total.totalCostUsd > 0 && (y[k.id] = Ot(w.total));
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
      Io,
      {
        query: c,
        onQueryChange: m,
        statuses: l,
        onStatusToggle: h,
        triggerKinds: p,
        onTriggerToggle: f,
        range: u,
        onRangeChange: g,
        onClearFilters: () => n(new URLSearchParams(), { replace: !0 })
      }
    ),
    v.length === 0 ? /* @__PURE__ */ e(
      Le,
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
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ e(le, { tone: qn(y.status).tone, size: "sm", children: y.status }) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: y.triggerType ?? y.triggeredBy?.triggerType }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: gd(y.startedAt) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: y.completedAt ? ke(new Date(y.completedAt).getTime() - new Date(y.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: N[y.id] ?? "—" })
          ]
        },
        y.id
      )) })
    ] }) })
  ] });
}
function $o(t) {
  let r = 0, n = 0;
  for (const a of Object.values(t.steps ?? {}))
    a.llm && (r += a.llm.tokensIn ?? 0, n += a.llm.tokensOut ?? 0);
  return { tokensIn: r, tokensOut: n };
}
function Su(t) {
  const r = /* @__PURE__ */ new Map();
  if (!t) return r;
  for (const n of t.nodes)
    n.data.type === "llm" && r.set(n.id, n.data.model);
  return r;
}
function $u(t, r) {
  const n = [];
  for (const a of Object.values(t.steps ?? {}))
    a.llm && n.push({
      model: r.get(a.nodeId),
      tokensIn: a.llm.tokensIn,
      tokensOut: a.llm.tokensOut
    });
  return xt(n).total.totalCostUsd;
}
function Gr(t, r) {
  if (t.length === 0) return 0;
  const n = Math.min(t.length - 1, Math.floor(t.length * r));
  return t[n];
}
function Kr(t) {
  return t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Yr(t) {
  const r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(r) ? `$${r.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function Tu(t) {
  return t.slice(0, 8);
}
function Au(t) {
  const r = Date.now() - new Date(t).getTime();
  return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 2592e5 ? `${Math.floor(r / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function Ru(t, r) {
  const n = t.length;
  let a = 0, i = 0, s = 0;
  const d = [];
  let c = 0, l = 0, p = 0;
  const u = /* @__PURE__ */ new Map();
  for (const m of t) {
    m.status === "completed" ? a++ : m.status === "failed" ? i++ : m.status === "cancelled" && s++, typeof m.durationMs == "number" && m.durationMs > 0 && d.push(m.durationMs);
    const v = $o(m);
    if (c += v.tokensIn, l += v.tokensOut, p += $u(m, r), m.error?.message) {
      const N = m.error.message.slice(0, 48), y = u.get(N);
      y ? (y.count += 1, m.startedAt > y.lastSeenAt && (y.lastSeenAt = m.startedAt, y.exampleRunId = m.id)) : u.set(N, { count: 1, lastSeenAt: m.startedAt, exampleRunId: m.id });
    }
  }
  d.sort((m, v) => m - v);
  const x = Gr(d, 0.5), h = Gr(d, 0.95), f = n === 0 ? 0 : Math.round(a / n * 100), g = [...u.entries()].map(([m, v]) => ({ key: m, count: v.count, lastSeenAt: v.lastSeenAt, exampleRunId: v.exampleRunId })).sort((m, v) => v.count - m.count).slice(0, 5);
  return {
    totalCount: n,
    completedCount: a,
    failedCount: i,
    cancelledCount: s,
    successRatePct: f,
    medianMs: x,
    p95Ms: h,
    tokensIn: c,
    tokensOut: l,
    tokensPerRun: n === 0 ? 0 : Math.round((c + l) / n),
    totalCost: p,
    costPerRun: n === 0 ? 0 : p / n,
    failureBreakdown: g
  };
}
function Pu(t) {
  return t >= 90 ? "#16a34a" : t >= 70 ? "#f59e0b" : "#dc2626";
}
function Mu(t) {
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
function Du(t, r) {
  const a = [...t].sort((s, d) => s.startedAt.localeCompare(d.startedAt)).filter((s) => typeof s.durationMs == "number" && s.durationMs > 0).map((s) => ({ x: new Date(s.startedAt).getTime(), y: s.durationMs })), i = a.map((s) => ({ x: s.x, y: r }));
  return [
    { label: "Duration (ms)", data: a, color: "#646cff" },
    { label: "p50", data: i, color: "#94a3b8" }
  ];
}
function Eu(t) {
  const r = [...t].sort((i, s) => i.startedAt.localeCompare(s.startedAt)), n = [], a = [];
  for (const i of r) {
    const s = new Date(i.startedAt).getTime(), { tokensIn: d, tokensOut: c } = $o(i);
    n.push({ x: s, y: d }), a.push({ x: s, y: c });
  }
  return [
    { label: "Tokens in", data: n, color: "#646cff" },
    { label: "Tokens out", data: a, color: "#16a34a" }
  ];
}
function Vm() {
  const { pipelineId: t } = mt(), r = Ee(), [n, a] = $(null), [i, s] = $([]), [d, c] = $("50");
  Z(() => {
    t && (a(tt(t)), s(Yt(t)));
  }, [t]);
  const l = V(() => {
    if (d === "all") return i;
    const m = Number(d);
    return i.slice(0, m);
  }, [i, d]), p = V(() => Su(n), [n]), u = V(() => Ru(l, p), [l, p]), x = V(
    () => gp(l, n).filter((m) => m.totalCostUsd > 0 || m.stepCount > 0),
    [l, n]
  ), h = V(() => vp(i, n, 30), [i, n]), f = V(
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
  if (!n)
    return /* @__PURE__ */ e("div", { className: "p-8", children: /* @__PURE__ */ e(
      Le,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => r("/pipelines")
      }
    ) });
  const g = l.length > 0;
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
    g ? /* @__PURE__ */ o(K, { children: [
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
                  style: { color: Pu(u.successRatePct) },
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
              /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: Kr(u.totalCost) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                Kr(u.costPerRun),
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
              x.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary py-2", children: "No per-node cost data in this range." }) : /* @__PURE__ */ e(
                pa,
                {
                  data: x.map((m) => ({
                    label: m.label,
                    cost: Number(m.totalCostUsd.toFixed(6))
                  })),
                  xKey: "label",
                  yKey: "cost",
                  height: 200,
                  color: "#646cff",
                  yFormat: Yr
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-trend-30d", children: [
              /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "30-day spend trend" }),
              /* @__PURE__ */ e(
                Bt,
                {
                  series: f,
                  height: 200,
                  xFormat: (m) => new Date(Number(m)).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric"
                  }),
                  yFormat: Yr
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
            Bt,
            {
              series: Mu(l),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString()
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Duration over time" }),
          /* @__PURE__ */ e(
            Bt,
            {
              series: Du(l, u.medianMs),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString(),
              yFormat: (m) => ke(m)
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Token usage over time" }),
          /* @__PURE__ */ e(
            Bt,
            {
              series: Eu(l),
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
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5 text-text-secondary", children: Au(m.lastSeenAt) }),
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => r(`/pipelines/${t}/runs/${m.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    Tu(m.exampleRunId),
                    " →"
                  ]
                }
              ) })
            ] }, m.key)) })
          ] })
        ] })
      ] })
    ] }) : /* @__PURE__ */ e(
      Le,
      {
        icon: "📊",
        title: "No runs yet",
        body: "No runs yet. Trigger this pipeline to see stats."
      }
    )
  ] });
}
function _u(t) {
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
function Ou(t) {
  return t.length <= 6 ? t : t.slice(-6);
}
function Lu({ approver: t, idx: r }) {
  const n = t.type === "role" ? "🎖" : "👤";
  return /* @__PURE__ */ o(
    "span",
    {
      className: "inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-sm text-[11px] font-semibold leading-[1.4] whitespace-nowrap",
      children: [
        /* @__PURE__ */ e("span", { "aria-hidden": !0, children: n }),
        /* @__PURE__ */ e("span", { children: t.value })
      ]
    },
    `${t.type}:${t.value}:${r}`
  );
}
function Bu(t, r) {
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
function Fu({ row: t, onSubmit: r, onOpenPipeline: n }) {
  const [a, i] = $(""), s = E(
    (p) => {
      r(p, a.trim()), i("");
    },
    [a, r]
  ), d = t.requiredCount ?? 1, c = t.recordedCount ?? 0, l = V(() => Bu(t.runContext, t.runSteps), [t.runContext, t.runSteps]);
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
            Ou(t.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: _u(t.requestedAt) })
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
      t.approvers.length === 0 ? /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : t.approvers.map((p, u) => /* @__PURE__ */ e(Lu, { approver: p, idx: u }, u)),
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
function Wm() {
  const t = Ee(), { approvals: r, isLoading: n, error: a, retry: i } = Yo(), { resolveApproval: s, runs: d } = ft(), [c, l] = $(
    () => /* @__PURE__ */ new Set()
  );
  Z(() => {
    if (c.size === 0) return;
    const m = new Set(r.map((y) => `${y.runId}::${y.stepId}`));
    let v = !1;
    const N = new Set(c);
    for (const y of c)
      m.has(y) || (N.delete(y), v = !0);
    v && l(N);
  }, [r, c]);
  const [p, u] = $({}), x = ae(/* @__PURE__ */ new Set());
  Z(() => {
    for (const m of r)
      x.current.has(m.runId) || (x.current.add(m.runId), Xo(m.pipelineId, m.runId).then((v) => {
        v && u((N) => ({
          ...N,
          [m.runId]: { context: v.context, steps: v.steps }
        }));
      }));
  }, [r]);
  const h = V(() => {
    const m = /* @__PURE__ */ new Map(), v = [];
    for (const N of r) {
      const y = `${N.runId}::${N.stepId}`;
      if (c.has(y)) continue;
      let k = m.get(N.pipelineId);
      k === void 0 && (k = tt(N.pipelineId), m.set(N.pipelineId, k));
      const b = k?.name ?? (N.pipelineId ? `Pipeline ${N.pipelineId.slice(0, 8)}` : "Unknown pipeline"), w = p[N.runId]?.context ?? d[N.runId]?.context, C = p[N.runId]?.steps;
      v.push({ ...N, pipelineName: b, runContext: w, runSteps: C });
    }
    return v;
  }, [r, c, d, p]), f = E(
    (m, v, N, y, k) => {
      s(v, N, y, k || void 0), l((b) => {
        const w = new Set(b);
        return w.add(`${v}::${N}`), w;
      }), fetch(`/api/pipelines/${encodeURIComponent(v)}/approvals`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: N, decision: y, ...k ? { comment: k } : {} })
      }).catch((b) => {
        console.error("[approvals] POST failed", b);
      }), t(`/pipelines/${m}/runs/${v}`);
    },
    [s, t]
  ), g = h.length;
  return /* @__PURE__ */ o("div", { "data-testid": "pending-approvals-page", className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-[inherit]", children: [
    /* @__PURE__ */ e("div", { className: "h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]", children: /* @__PURE__ */ o("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "text-lg font-bold text-text-primary", children: "Pending approvals" }),
      /* @__PURE__ */ e(le, { "data-testid": "pending-count", tone: g > 0 ? "warning" : "neutral", size: "sm", children: g })
    ] }) }),
    /* @__PURE__ */ o("div", { className: "flex-1 overflow-y-auto p-5", children: [
      a ? /* @__PURE__ */ o("div", { "data-testid": "approvals-error", role: "alert", className: "px-4 py-3 bg-[#fef2f2] border border-[#dc2626] text-[#dc2626] rounded-lg flex items-center justify-between gap-3 mb-4", children: [
        /* @__PURE__ */ e("span", { className: "text-[13px] font-medium", children: "Couldn't load pending approvals. Try again." }),
        /* @__PURE__ */ e("button", { "data-testid": "approvals-retry", onClick: i, className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[#dc2626] border border-[#dc2626] rounded-md cursor-pointer font-[inherit]", children: "Retry" })
      ] }) : null,
      n && g === 0 ? /* @__PURE__ */ o("div", { "data-testid": "approvals-loading", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: [
        /* @__PURE__ */ e(rn, { height: 140 }),
        /* @__PURE__ */ e(rn, { height: 140 }),
        /* @__PURE__ */ e(rn, { height: 140 })
      ] }) : g === 0 && !a ? /* @__PURE__ */ e(
        Le,
        {
          icon: "✋",
          title: "No pending approvals",
          body: "When a pipeline reaches an approval step, it'll show up here.",
          testId: "approvals-empty"
        }
      ) : /* @__PURE__ */ e("div", { "data-testid": "approvals-list", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: h.map((m) => /* @__PURE__ */ e(
        Fu,
        {
          row: m,
          onOpenPipeline: () => t(`/pipelines/${m.pipelineId}`),
          onSubmit: (v, N) => f(m.pipelineId, m.runId, m.stepId, v, N)
        },
        `${m.runId}:${m.stepId}`
      )) })
    ] })
  ] });
}
function Hm({ data: t, onChange: r }) {
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
        Qt,
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
        Qt,
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
const Uu = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.crop.output.imageId"
], ju = [
  "{{scatter.item.label}}",
  "{{scatter.index}}",
  "{{scatter.parentImageId}}"
];
function Xr({
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
function Jm({ data: t, onChange: r }) {
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
        Qt,
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
        Xr,
        {
          samples: Uu,
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
        Qt,
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
          Xr,
          {
            samples: ju,
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
function zu({ result: t, className: r }) {
  const { caption: n, setting: a, location: i, timeOfDay: s, mood: d, colors: c } = t;
  return !n && !a && !i && !s && !d && (!c || c.length === 0) ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", r), children: [
    n ? /* @__PURE__ */ e("p", { className: "text-base leading-relaxed text-text-primary", children: n }) : null,
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
const qu = {
  people: { stroke: "#4f46e5", fill: "rgba(79,70,229,0.10)", text: "bg-indigo-600 text-white" },
  object: { stroke: "#d97706", fill: "rgba(217,119,6,0.10)", text: "bg-amber-600 text-white" }
};
function Vu({
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
  const x = r ?? t, [h, f] = $(null), g = ae(null), m = E(() => {
    const y = g.current;
    y && (!n || !a) && f({ w: y.naturalWidth, h: y.naturalHeight });
  }, [n, a]), v = V(() => n && a && n > 0 && a > 0 ? { w: n, h: a } : h && h.w > 0 && h.h > 0 ? h : null, [n, a, h]), N = (y, k, b, w, C) => {
    if (!v) return null;
    const R = Math.max(0, Math.min(y.x1, v.w)), S = Math.max(0, Math.min(y.y1, v.h)), A = Math.max(0, Math.min(y.x2, v.w)), M = Math.max(0, Math.min(y.y2, v.h));
    if (!Number.isFinite(R) || !Number.isFinite(S) || !Number.isFinite(A) || !Number.isFinite(M) || A <= R || M <= S) return null;
    const P = R / v.w * 100, U = S / v.h * 100, W = (A - R) / v.w * 100, oe = (M - S) / v.h * 100, ie = qu[b];
    return /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: w,
        title: k,
        "aria-label": `${b === "people" ? "Person" : "Object"} bounding box: ${k}`,
        className: "group absolute m-0 cursor-pointer border-0 p-0 outline-none focus:ring-2 focus:ring-offset-1",
        style: {
          left: `${P}%`,
          top: `${U}%`,
          width: `${W}%`,
          height: `${oe}%`,
          background: ie.fill,
          border: `2px solid ${ie.stroke}`,
          borderRadius: "2px"
        },
        children: /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "pointer-events-none absolute -top-5 left-0 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none shadow",
              ie.text
            ),
            children: k
          }
        )
      },
      C
    );
  };
  return x ? /* @__PURE__ */ o(
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
            src: x,
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
            (y, k) => N(
              y.bbox,
              y.label,
              "object",
              l ? () => l(y) : void 0,
              `o-${k}-${y.label}`
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
function Wu(t) {
  return {
    imageUrl: t.imageUrl,
    imageDataUrl: t.imageDataUrl,
    imageWidth: t.imageWidth,
    imageHeight: t.imageHeight,
    people: t.people,
    objects: t.objects
  };
}
function Hu({ people: t, highlightedIndex: r, onSelect: n, className: a }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", a), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "People (",
      t.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1.5", children: t.map((i) => {
      const s = r === i.index, d = i.activity?.replace(/^::\s*/, ""), c = I(
        "group flex w-full flex-col gap-1 rounded-lg border px-2.5 py-2 text-left text-sm transition-colors",
        s ? "border-indigo-400 bg-indigo-50/70 ring-1 ring-indigo-300" : "border-border bg-surface hover:bg-surface-hover"
      ), l = /* @__PURE__ */ o(K, { children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": !0,
              className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold leading-none text-white",
              children: i.index
            }
          ),
          i.ageBucket ? /* @__PURE__ */ e(le, { tone: "neutral", size: "sm", children: i.ageBucket.replace("_", " ") }) : null,
          i.gender ? /* @__PURE__ */ e(le, { tone: "neutral", size: "sm", children: i.gender }) : null,
          i.faceOrientation ? /* @__PURE__ */ e(le, { tone: "neutral", size: "sm", title: "Face orientation", children: i.faceOrientation }) : null,
          i.expression ? /* @__PURE__ */ e(le, { tone: "info", size: "sm", children: i.expression }) : null
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
            "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          ),
          "aria-pressed": s,
          children: l
        }
      ) }, i.index) : /* @__PURE__ */ e("li", { className: c, children: l }, i.index);
    }) })
  ] });
}
function Ju({ objects: t, onSelect: r, className: n }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", n), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Objects (",
      t.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "grid grid-cols-1 gap-1 sm:grid-cols-2", children: t.map((a, i) => {
      const s = I(
        "flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 text-left text-[13px]"
      ), d = /* @__PURE__ */ o(K, { children: [
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
            "cursor-pointer hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          ),
          children: d
        }
      ) }, `${a.label}-${i}`) : /* @__PURE__ */ e("li", { className: s, children: d }, `${a.label}-${i}`);
    }) })
  ] });
}
function Gu({ tags: t, onTagClick: r, className: n }) {
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
          className: "appearance-none border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded-full",
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
function Kt(t) {
  return t ? t === "correct" || t === "neutral" || t === "normal" ? "success" : "warning" : "neutral";
}
function kn(t) {
  const r = Kt(t);
  return r === "success" ? `OK · ${t}` : r === "warning" ? `ADJUST · ${t}` : t ?? "";
}
function Ku({
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
          /* @__PURE__ */ e(le, { tone: Kt(t.verdict), size: "sm", children: kn(t.verdict) }),
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
          /* @__PURE__ */ e(le, { tone: Kt(r.verdict), size: "sm", children: kn(r.verdict) }),
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
        /* @__PURE__ */ e("span", { className: "ml-1.5", children: /* @__PURE__ */ e(le, { tone: Kt(n), size: "sm", children: kn(n) }) })
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
function Gm({
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
  const [x, h] = $(), [f, g] = $(!1), m = (N) => h(x === N.index ? void 0 : N.index), v = Wu(t);
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-4 text-text-primary", u), children: [
    /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-12", children: [
      r ? /* @__PURE__ */ o("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ e(
          Vu,
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
          typeof t.model.tokensOut == "number" ? /* @__PURE__ */ o(K, { children: [
            /* @__PURE__ */ e("span", { children: "·" }),
            /* @__PURE__ */ o("span", { children: [
              t.model.tokensOut,
              " tok out"
            ] })
          ] }) : null
        ] }) : null
      ] }) : null,
      /* @__PURE__ */ o("div", { className: I("flex flex-col gap-4", r ? "md:col-span-5" : "md:col-span-12"), children: [
        n ? /* @__PURE__ */ e(zu, { result: t }) : null,
        a && t.people && t.people.length > 0 ? /* @__PURE__ */ e(
          Hu,
          {
            people: t.people,
            highlightedIndex: x,
            onSelect: m
          }
        ) : null
      ] })
    ] }),
    i && t.objects && t.objects.length > 0 ? /* @__PURE__ */ e(Ju, { objects: t.objects }) : null,
    s && t.tags && t.tags.length > 0 ? /* @__PURE__ */ e(Gu, { tags: t.tags, onTagClick: l }) : null,
    d ? /* @__PURE__ */ e(
      Ku,
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
          "aria-expanded": f,
          "aria-label": `${f ? "Hide" : "Show"} raw model output`,
          className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded",
          children: [
            f ? "▾" : "▸",
            " Raw model output"
          ]
        }
      ),
      f ? /* @__PURE__ */ e("pre", { className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary", children: t.rawText }) : null
    ] }) : null
  ] });
}
function Km({
  status: t,
  result: r,
  runId: n,
  endpointLabel: a,
  error: i,
  latencyMs: s,
  onOpen: d,
  className: c
}) {
  const l = a ?? r?.model?.endpointId ?? "vision-model", p = s ?? r?.model?.latencyMs, u = r?.caption, x = (r?.tags ?? []).slice(0, 5), h = /* @__PURE__ */ o(K, { children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ e("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: l }),
      t === "running" ? /* @__PURE__ */ o(le, { tone: "info", size: "sm", children: [
        /* @__PURE__ */ e("span", { className: "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" }),
        " running"
      ] }) : t === "completed" ? /* @__PURE__ */ e(le, { tone: "success", size: "sm", children: "ok" }) : /* @__PURE__ */ e(le, { tone: "danger", size: "sm", children: "failed" }),
      typeof p == "number" ? /* @__PURE__ */ o("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        p.toFixed(0),
        "ms"
      ] }) : null,
      n ? /* @__PURE__ */ e("span", { className: "ml-auto truncate font-mono text-[10px] text-text-tertiary", children: n }) : null
    ] }),
    t === "failed" && i ? /* @__PURE__ */ e("p", { className: "text-[13px] text-red-700", children: i }) : /* @__PURE__ */ e("p", { className: "line-clamp-2 text-left text-[13px] text-text-primary", children: u ?? (t === "running" ? "Analyzing image…" : "No caption produced.") }),
    x.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: x.map((g) => /* @__PURE__ */ o(le, { tone: "neutral", size: "sm", children: [
      "#",
      g
    ] }, g)) }) : null
  ] }), f = I(
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
          f,
          "cursor-pointer transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1",
          c
        ),
        children: h
      }
    );
  }
  return /* @__PURE__ */ e("article", { className: I(f, c), children: h });
}
function Ym(t = {}) {
  const { maxRecords: r = 50, runId: n } = t, [a, i] = $([]), s = ae(/* @__PURE__ */ new Map()), d = ae(!0);
  return Z(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Pe("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.image.vision.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || n && u.runId !== n) return;
    const x = `${u.runId}::${u.stepId}`;
    i((h) => {
      const f = s.current.get(x), g = typeof u.at == "number" ? u.at : Date.now(), m = (v) => {
        if (typeof f == "number" && f >= 0 && f < h.length) {
          const k = h.slice();
          return k[f] = { ...h[f], ...v }, k;
        }
        const N = [v, ...h];
        N.length > r && (N.length = r);
        const y = /* @__PURE__ */ new Map();
        return N.forEach((k, b) => y.set(`${k.runId}::${k.stepId}`, b)), s.current = y, N;
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
        const v = typeof f == "number" ? h[f] : void 0;
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
        const v = typeof f == "number" ? h[f] : void 0;
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
  }), V(() => a, [a]);
}
function Yu(t) {
  return t === "pass" ? "success" : t === "fail" ? "danger" : "warning";
}
function Xu({ result: t, className: r }) {
  const n = Yu(t.overallVerdict), a = n === "success" ? "PASS" : n === "danger" ? "FAIL" : "INCONCLUSIVE", i = t.rubricSnapshot.passThreshold ?? 0.5;
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
          /* @__PURE__ */ o(le, { tone: n, size: "sm", children: [
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
            Ln,
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
function Qu({ result: t, className: r }) {
  if (!t.criteria || t.criteria.length === 0) return null;
  const n = /* @__PURE__ */ new Map();
  for (const a of t.rubricSnapshot.criteria) n.set(a.id, a);
  return /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Criteria (",
      t.criteria.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1.5", children: t.criteria.map((a) => /* @__PURE__ */ e(Zu, { score: a, def: n.get(a.criterionId) }, a.criterionId)) })
  ] });
}
function Zu({
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
      /* @__PURE__ */ e(le, { tone: n, size: "sm", children: a }),
      /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
        "raw: ",
        String(t.rawScore)
      ] })
    ] }),
    /* @__PURE__ */ e(
      Ln,
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
const To = Do(null);
function Xm({ value: t, children: r }) {
  return /* @__PURE__ */ e(To.Provider, { value: t, children: r });
}
function Ao() {
  return eo(To);
}
function Qm({
  result: t,
  showVerdict: r = !0,
  showCriteria: n = !0,
  showMetadata: a = !0,
  showRawText: i = !1,
  className: s
}) {
  const d = Ao(), [c, l] = $(!1), [p, u] = $(null), [x, h] = $(!1), [f, g] = $(null), m = ae(!0);
  Z(() => (m.current = !0, () => {
    m.current = !1;
  }), []), Z(() => {
    c && (t.rawModelText || p === null && (x || t.rawTextTruncated && d && (h(!0), (async () => {
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
  }, [c, t.rawModelText, t.rawTextTruncated, t.judgmentId, d, p, x]);
  const v = t.rawModelText ?? p ?? null, N = !!t.rawModelText || !!t.rawTextTruncated;
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-3 text-text-primary", s), children: [
    r ? /* @__PURE__ */ e(Xu, { result: t }) : null,
    n ? /* @__PURE__ */ e(Qu, { result: t }) : null,
    a ? /* @__PURE__ */ o("section", { className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
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
        em,
        {
          text: v,
          loading: x,
          error: f,
          fallbackHint: t.rawTextTruncated && !d ? "Raw text was spilled to S3 but no JudgmentApi provider is wired." : null
        }
      ) : null
    ] }) : null
  ] });
}
function em({
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
function Zm({ aggregate: t, className: r }) {
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
          /* @__PURE__ */ o(le, { tone: i, size: "sm", children: [
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
            Ln,
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
function eh({
  aggregates: t,
  sortOrder: r = "desc",
  caption: n,
  loading: a = !1,
  className: i
}) {
  const s = V(() => {
    const x = t.slice();
    return x.sort((h, f) => h.dayBucket.localeCompare(f.dayBucket)), r === "desc" && x.reverse(), x;
  }, [t, r]), d = V(() => t.slice().sort((h, f) => h.dayBucket.localeCompare(f.dayBucket)).map((h) => h.numJudgments > 0 ? h.numPassed / h.numJudgments : 0), [t]);
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
  const c = t.reduce((x, h) => x + h.numJudgments, 0), l = t.reduce((x, h) => x + h.numPassed, 0), p = t.reduce((x, h) => x + h.sumCostUsd, 0), u = c > 0 ? l / c : 0;
  return /* @__PURE__ */ o("section", { className: I("flex w-full flex-col gap-2", i), children: [
    /* @__PURE__ */ o("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: n ?? `Judgment trend — ${t.length} days` }),
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
        ca,
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
      /* @__PURE__ */ e("tbody", { children: s.map((x) => /* @__PURE__ */ e(tm, { row: x }, x.aggregateKey)) })
    ] })
  ] });
}
function tm({ row: t }) {
  const r = t.numJudgments > 0 ? t.numPassed / t.numJudgments : 0, n = t.numJudgments > 0 ? t.sumOverallScore / t.numJudgments : 0, a = r >= 0.9 ? "success" : r >= 0.6 ? "warning" : "danger";
  return /* @__PURE__ */ o("tr", { className: "border-t border-border", children: [
    /* @__PURE__ */ e("td", { className: "py-1 pr-2 font-mono", children: t.dayBucket }),
    /* @__PURE__ */ e("td", { className: "py-1 pr-2", children: /* @__PURE__ */ o(le, { tone: a, size: "sm", children: [
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
function nm(t) {
  if (typeof t == "number") return t;
  if (typeof t == "string") {
    const r = Date.parse(t);
    if (Number.isFinite(r)) return r;
  }
  return Date.now();
}
function th(t = {}) {
  const { maxRecords: r = 50, runId: n } = t, [a, i] = $([]), s = ae(/* @__PURE__ */ new Map()), d = ae(!0);
  return Z(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Pe("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.judge.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || n && u.runId !== n) return;
    const x = `${u.runId}::${u.stepId}`;
    i((h) => {
      const f = s.current.get(x), g = nm(u.at), m = (v) => {
        if (typeof f == "number" && f >= 0 && f < h.length) {
          const k = h.slice();
          return k[f] = { ...h[f], ...v }, k;
        }
        const N = [v, ...h];
        N.length > r && (N.length = r);
        const y = /* @__PURE__ */ new Map();
        return N.forEach((k, b) => y.set(`${k.runId}::${k.stepId}`, b)), s.current = y, N;
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
        const v = typeof f == "number" ? h[f] : void 0;
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
        const v = typeof f == "number" ? h[f] : void 0;
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
        const v = typeof f == "number" ? h[f] : void 0;
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
  }), V(() => a, [a]);
}
function nh(t) {
  const r = Ao(), [n, a] = $([]), [i, s] = $(!1), [d, c] = $(null), l = ae(!0), p = ae(() => {
  }), { pipelineId: u, rubricId: x, since: h, until: f, limit: g, refreshIntervalMs: m = 0, paused: v = !1 } = t, N = `${u ?? ""}|${x ?? ""}|${h ?? ""}|${f ?? ""}|${g ?? ""}|${v ? "1" : "0"}`;
  return Z(() => (l.current = !0, () => {
    l.current = !1;
  }), []), Z(() => {
    if (!r) {
      a([]), s(!1), c(null);
      return;
    }
    if (v) return;
    if (!u && !x) {
      c(new Error("useJudgmentAggregates: one of pipelineId or rubricId is required")), s(!1);
      return;
    }
    let y = !1;
    const k = async () => {
      s(!0);
      try {
        const b = await r.fetchAggregates({
          ...u ? { pipelineId: u } : {},
          ...x ? { rubricId: x } : {},
          ...h ? { since: h } : {},
          ...f ? { until: f } : {},
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
      k();
    }, k(), m > 0) {
      const b = setInterval(() => {
        k();
      }, m);
      return () => {
        y = !0, clearInterval(b);
      };
    }
    return () => {
      y = !0;
    };
  }, [r, N, m]), {
    aggregates: n,
    loading: i,
    error: d,
    reload: () => p.current()
  };
}
const Ro = 148, Po = 116, rm = 56, om = 20;
function am(t) {
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
      const x = n.get(u) ?? -1;
      p + 1 > x && (n.set(u, p + 1), i.push(u));
    }
  }
  const d = /* @__PURE__ */ new Map();
  for (const [l, p] of n.entries()) {
    const u = d.get(p) ?? [];
    u.push(l), d.set(p, u);
  }
  const c = /* @__PURE__ */ new Map();
  for (const [l, p] of d.entries()) {
    const u = l * (Ro + rm);
    p.forEach((x, h) => {
      c.set(x, {
        x: u,
        y: h * (Po + om)
      });
    });
  }
  return c;
}
function im(t, r) {
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
function sm({ data: t }) {
  const { entry: r, highlighted: n, selected: a, onSelect: i, getImageUrl: s } = t, d = r.width && r.height ? `${r.width}×${r.height}` : "", c = r.producedByNodeKind;
  return /* @__PURE__ */ o(K, { children: [
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
            "img",
            {
              src: s(r.imageId),
              alt: `Artifact ${r.imageId.slice(0, 8)}`,
              className: "w-full h-full object-cover",
              loading: "lazy",
              "data-testid": `lineage-thumb-${r.imageId}`
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
const lm = { lineageNode: sm };
function cm() {
  return /* @__PURE__ */ e(
    "div",
    {
      className: "flex items-center justify-center h-full text-text-tertiary text-sm",
      "data-testid": "lineage-graph-empty",
      children: "No image artifacts produced by this run."
    }
  );
}
function rh({
  entries: t,
  selectedImageId: r,
  onSelect: n
}) {
  const a = Ae(), i = V(
    () => r ? im(r, t) : /* @__PURE__ */ new Set(),
    [r, t]
  ), s = V(() => am(t), [t]), d = V(
    () => t.map((f) => {
      const g = s.get(f.imageId) ?? { x: 0, y: 0 };
      return {
        id: f.imageId,
        type: "lineageNode",
        position: g,
        data: {
          entry: f,
          highlighted: i.has(f.imageId),
          selected: f.imageId === r,
          onSelect: n ?? (() => {
          }),
          getImageUrl: a
        },
        style: { width: Ro, height: Po }
      };
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, r, i, n, a]
  ), c = V(
    () => t.filter((f) => f.parentImageId).map((f) => ({
      id: `${f.parentImageId}->${f.imageId}`,
      source: f.parentImageId,
      target: f.imageId,
      sourceHandle: "out",
      targetHandle: "in",
      className: i.has(f.imageId) && i.has(f.parentImageId) ? "stroke-primary stroke-2" : "stroke-border"
    })),
    [t, i]
  ), [l, , p] = ao(d), [u, , x] = io(c), h = E(
    (f, g) => {
      n?.(g.id);
    },
    [n]
  );
  return t.length === 0 ? /* @__PURE__ */ e(cm, {}) : /* @__PURE__ */ o(
    "div",
    {
      className: "relative w-full h-full",
      "data-testid": "lineage-graph",
      children: [
        /* @__PURE__ */ e("style", { children: ".react-flow__node { position: absolute; }" }),
        /* @__PURE__ */ o(
          so,
          {
            nodes: l,
            edges: u,
            onNodesChange: p,
            onEdgesChange: x,
            onNodeClick: h,
            nodeTypes: lm,
            fitView: !0,
            fitViewOptions: { padding: 0.2 },
            minZoom: 0.3,
            maxZoom: 2,
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ e(lo, { gap: 16, size: 1, className: "bg-surface-inset" }),
              /* @__PURE__ */ e(co, { showInteractive: !1, className: "bg-surface border border-border rounded" })
            ]
          }
        )
      ]
    }
  );
}
const _t = /* @__PURE__ */ new Map(), dm = 6e4;
function Qr(t) {
  const r = _t.get(t);
  return r ? Date.now() - r.fetchedAt > dm ? (_t.delete(t), null) : r.entries : null;
}
function pm(t, r) {
  _t.set(t, { entries: r, fetchedAt: Date.now() });
}
function oh() {
  _t.clear();
}
function ah(t, r) {
  const [n, a] = $(() => t ? Qr(t) ?? [] : []), [i, s] = $(!1), [d, c] = $(null), l = ae(0), p = E(() => {
    if (!t || !r) return;
    const x = Qr(t);
    if (x) {
      a(x), s(!1), c(null);
      return;
    }
    const h = ++l.current;
    s(!0), c(null);
    const f = `/api/pipeline/runs/${encodeURIComponent(t)}/image-lineage?pipelineId=${encodeURIComponent(r)}`;
    fetch(f, {
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
      pm(t, v), a(v), s(!1);
    }).catch((g) => {
      h === l.current && (c(g instanceof Error ? g.message : String(g)), s(!1));
    });
  }, [t, r]), u = E(() => {
    t && _t.delete(t), p();
  }, [t, p]);
  return Z(() => {
    p();
  }, [p]), { entries: n, loading: i, error: d, refetch: u };
}
export {
  Pa as ActionNode,
  bc as AdjustBwConfig,
  ai as AdjustBwNode,
  kc as AdjustLayerConfig,
  si as AdjustLayerNode,
  Wa as AgUiOutputNode,
  Ba as AgentNode,
  Zm as AggregateSummaryCard,
  qm as AllRunsPage,
  La as ApprovalNode,
  fe as BaseNode,
  zu as CaptionPanel,
  Aa as ConditionNode,
  Qu as CriteriaPanel,
  fc as CropConfig,
  oi as CropNode,
  pd as EditPromptConfig,
  vi as EditPromptNode,
  Ku as EditRecommendationsPanel,
  ph as EventStreamProvider,
  Ma as ForkNode,
  ac as FormatConvertConfig,
  ei as FormatConvertNode,
  nd as GenerateConfig,
  gi as GenerateNode,
  ja as GraphQueryNode,
  qa as GuardrailNode,
  rh as ImageLineageGraph,
  Hm as ImageSourceConfig,
  Ha as ImageSourceNode,
  Vu as ImageWithBBoxOverlay,
  _a as JoinNode,
  Xm as JudgmentApiProvider,
  Qm as JudgmentResultViewer,
  eh as JudgmentTrendChart,
  Ua as KnowledgeBaseNode,
  Ia as LLMNode,
  Fa as McpToolNode,
  za as MemoryNode,
  Bi as NodePalette,
  Ju as ObjectsPanel,
  Pi as PALETTE_ITEMS,
  Wm as PendingApprovalsPage,
  Hu as PeoplePanel,
  Zi as PipelineCanvas,
  Lo as PipelineEditorContext,
  Lm as PipelineEditorPage,
  no as PipelineEditorProvider,
  lh as PipelineEditorServicesProvider,
  jm as PipelineRunComparePage,
  zm as PipelineRunDiff,
  Um as PipelineRunReplayPage,
  Fm as PipelineRunsPage,
  Jo as PipelineRunsProvider,
  Vm as PipelineStatsPage,
  Bm as PipelinesPage,
  Va as PolicyNode,
  Jl as ResizeConfig,
  Ya as ResizeNode,
  Jm as SaveConfig,
  Ja as SaveNode,
  ql as ScatterConfig,
  Ka as ScatterNode,
  lc as SharpenConfig,
  ti as SharpenNode,
  Gu as TagsPanel,
  ec as TransformGeoConfig,
  Qa as TransformGeoNode,
  $a as TransformNode,
  wa as TriggerNode,
  sd as VariationConfig,
  bi as VariationNode,
  Xu as VerdictPanel,
  Fc as VisionClassifyConfig,
  ui as VisionClassifyNode,
  Ec as VisionConfig,
  Vc as VisionDescribeConfig,
  mi as VisionDescribeNode,
  ed as VisionExtractTextConfig,
  fi as VisionExtractTextNode,
  pi as VisionNode,
  Gm as VisionResultViewer,
  Km as VisionRunCard,
  Kc as VisionTagConfig,
  hi as VisionTagNode,
  uc as WatermarkConfig,
  ni as WatermarkNode,
  oh as clearImageLineageCache,
  Wu as imageOverlayPropsFrom,
  Ni as nodeTypes,
  Om as recordRecentType,
  Pe as useEventStream,
  da as useEventStreamContext,
  ah as useImageLineage,
  Ae as useImageUrl,
  nh as useJudgmentAggregates,
  Ao as useJudgmentApi,
  th as useJudgmentResults,
  he as useLatestStepForNode,
  Ye as usePipelineEditor,
  ch as usePipelineEditorServices,
  ft as usePipelineRuns,
  Se as useRetryFromStep,
  Ym as useVisionResults
};
