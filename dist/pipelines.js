import { jsxs as o, jsx as e, Fragment as H } from "react/jsx-runtime";
import Jr, { useState as $, useRef as oe, useMemo as V, useEffect as Z, memo as yo, useCallback as E, useContext as Hr, createContext as vo } from "react";
import { useNavigate as Ee, useParams as mt, Navigate as ht, useSearchParams as Qt } from "react-router";
import { t as he, v as Se, p as Pe, w as Ye, u as ft, h as No, f as wo, e as jn, o as ko, x as Co, J as en, m as Kr, a as tt, y as Gr, z as Pn, A as wn, B as Yr, C as Io, D as So, E as $o, b as To, F as nt, G as Ao, H as Ro, K as rt, L as zn, M as Po, i as Mo, n as Xr, N as Kt, O as Do, k as qn, P as Eo, Q as Oo, r as _o, R as Gt, l as Wn, S as Lo, j as Bo, I as Yt } from "./PipelineEditorServicesContext-D943p7tZ.js";
import { g as Em, q as Om } from "./PipelineEditorServicesContext-D943p7tZ.js";
import { Handle as L, Position as B, useNodeConnections as Fo, getSmoothStepPath as Uo, EdgeLabelRenderer as jo, ReactFlowProvider as zo, useReactFlow as qo, useNodesState as Wo, useEdgesState as Vo, ReactFlow as Jo, Background as Ho, BackgroundVariant as Ko, Controls as Go, MiniMap as Yo } from "@xyflow/react";
/* empty css               */
import { c as I } from "./cn-B6yFEsav.js";
import { u as Mn, a as Zt } from "./ToastProvider-aHBNxMTO.js";
import "clsx";
import "tailwind-merge";
import { M as Ve } from "./Modal-2jg4229_.js";
import "react-dom";
import "./WebSocketContext-DPGFyPeZ.js";
import { u as Xo, I as Qo, C as Dn, T as Zo, S as En, a as ea } from "./TagEditor-BmL7k5D2.js";
import { a as Re, u as ta } from "./EventStreamContext-CjzSHXy-.js";
import { E as Lm } from "./EventStreamContext-CjzSHXy-.js";
import { B as je } from "./Button-Qsbxqsl9.js";
import { I as Tt } from "./IconButton-Da1kJ5WO.js";
import { u as On } from "./IdentityContext-CLalsm_M.js";
import { C as ie } from "./Chip-CAS9vOWq.js";
import { E as Le } from "./EmptyState-PM9wTjxk.js";
import { B as lt } from "./Banner-DKb3JiLs.js";
import { C as kn } from "./ConfirmDialog-CNoxvYGu.js";
import { B as na, L as _t } from "./Chart-ByoxeiYX.js";
import { S as tn } from "./SkeletonCard-C89GWQ3p.js";
const ra = "";
function Vn(t, r) {
  const n = t.displayName;
  return typeof n == "string" && n.length > 0 ? n : r.slice(0, 8);
}
function oa({ value: t, onChange: r, placeholder: n, maxSelect: a }) {
  const { presenceUsers: i } = Xo(), { idToken: s } = On(), [d, c] = $(""), [l, p] = $(!1), [u, x] = $(0), [h, f] = $([]), g = oe(null), m = oe(null), N = V(() => {
    const S = new Set(t), A = [];
    for (const P of i)
      S.has(P.clientId) || (S.add(P.clientId), A.push({
        userId: P.clientId,
        displayName: Vn(P.metadata, P.clientId)
      }));
    return A;
  }, [i, t]);
  Z(() => {
    const S = d.trim();
    if (!S || !s) {
      f([]);
      return;
    }
    const A = new AbortController(), P = setTimeout(() => {
      const X = `${ra}/api/profiles?q=${encodeURIComponent(S)}&limit=20`;
      fetch(X, {
        headers: { Authorization: `Bearer ${s}` },
        signal: A.signal
      }).then((ee) => ee.ok ? ee.json() : Promise.reject(new Error(`HTTP ${ee.status}`))).then((ee) => {
        f(Array.isArray(ee.profiles) ? ee.profiles : []);
      }).catch(() => {
      });
    }, 250);
    return () => {
      clearTimeout(P), A.abort();
    };
  }, [d, s]);
  const v = V(() => {
    const S = new Set(t), A = [];
    for (const P of N)
      S.has(P.userId) || (S.add(P.userId), A.push(P));
    for (const P of h)
      S.has(P.userId) || (S.add(P.userId), A.push({
        userId: P.userId,
        displayName: P.displayName || P.userId.slice(0, 8)
      }));
    return A;
  }, [N, h, t]), y = V(() => {
    const S = d.trim().toLowerCase();
    return S ? v.filter(
      (A) => A.displayName.toLowerCase().includes(S) || A.userId.toLowerCase().includes(S)
    ) : v;
  }, [v, d]), k = typeof a == "number" && t.length >= a, b = (S) => {
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
    const A = i.find((X) => X.clientId === S);
    if (A) return Vn(A.metadata, S);
    const P = h.find((X) => X.userId === S);
    return P && P.displayName ? P.displayName : S;
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
function Cn(t, r, n, a) {
  return !(!sa(t, r) || !la(n, a));
}
function sa(t, r) {
  const n = aa[t];
  return n === "fork" ? ca(r) : n.includes(r);
}
function la(t, r) {
  const n = ia[t];
  return n === null ? !1 : n === "join" ? da(r) : n.includes(r);
}
function ca(t) {
  return /^branch-(\d+)$/.exec(t) !== null;
}
function da(t) {
  return /^in-(\d+)$/.exec(t) !== null;
}
const pa = {
  idle: { card: "border border-[#d1d5db] bg-white", dot: "bg-[#d1d5db]" },
  pending: { card: "border border-dashed border-[#93c5fd] bg-[#eff6ff]", dot: "bg-[#93c5fd]" },
  running: { card: "border-2 border-[#2563eb] bg-[#eff6ff]", dot: "bg-[#2563eb]" },
  awaiting: { card: "border-2 border-[#f59e0b] bg-[#fffbeb]", dot: "bg-[#f59e0b]" },
  completed: { card: "border border-[#16a34a] bg-[#f0fdf4]", dot: "bg-[#16a34a]" },
  failed: { card: "border-2 border-[#dc2626] bg-[#fef2f2]", dot: "bg-[#dc2626]" },
  skipped: { card: "border border-dashed border-[#d1d5db] bg-[#f9fafb] opacity-50", dot: "bg-[#d1d5db]" }
};
function fe(t) {
  const { icon: r, subtitle: n, state: a, body: i, footer: s, selected: d, onRetry: c, hasBreakpoint: l, pausedAtBreakpoint: p, ariaLabel: u, children: x } = t, h = pa[a], f = Mn(), [g, m] = $(!1), N = a === "failed" && typeof c == "function", v = (C) => {
    C.preventDefault(), C.stopPropagation(), c?.();
  }, y = !f && a === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !f && a === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", k = !!(i || s || N), b = !!(i || s), w = n ? `${n}, state: ${a}` : `Node, state: ${a}`;
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
              f && "transition-none"
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
        x
      ]
    }
  );
}
function Jn(t) {
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
function ua(t) {
  return t.triggerType === "schedule" ? t.schedule ? `cron: ${t.schedule}` : "No schedule set" : t.triggerType === "webhook" ? t.webhookPath ? `POST ${t.webhookPath}` : "No path set" : t.triggerType.startsWith("document.") ? t.documentTypeId ? `Doc type: ${t.documentTypeId}` : "Any document" : "Fires on user click";
}
function ma(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Se(), p = c === "failed" ? () => l(r) : void 0, u = `Trigger node, ${Jn(n)}, state: ${c}`;
  return /* @__PURE__ */ e(
    fe,
    {
      icon: "▶",
      subtitle: Jn(n),
      state: c,
      body: /* @__PURE__ */ e("span", { className: "italic", children: ua(n) }),
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
function ha(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const n = t.split(`
`).slice(0, 2).join(" ").trim();
  return n.length > 120 ? `${n.slice(0, 117)}…` : n;
}
function fa({ info: t }) {
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
function xa(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = i?.llm, p = c === "running" && l?.streamOpened === !0 && (l?.tokensOut ?? 0) === 0, u = c === "running" && l !== void 0 && (l.tokensOut ?? 0) > 0, x = Se(), h = c === "failed" ? () => x(r) : void 0, f = /* @__PURE__ */ e("span", { className: "italic", children: ha(n.userPromptTemplate) }), m = (l ? {
    response: l.response ?? "",
    tokensIn: l.tokensIn,
    tokensOut: l.tokensOut,
    streaming: u,
    streamOpening: p
  } : void 0) ?? n._llmResponse, N = m ? /* @__PURE__ */ e(fa, { info: m }) : void 0, v = (n.systemPrompt ?? "").replace(/\s+/g, " ").trim(), y = v.length === 0 ? "no system prompt" : `system prompt: ${v.length > 60 ? `${v.slice(0, 60)}…` : v}`, k = `LLM node, ${n.model || n.provider}, ${y}, state: ${c}`;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "🧠",
      subtitle: n.model || n.provider,
      state: c,
      body: f,
      footer: N,
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
function ga(t) {
  if (!t) return "—";
  const r = t.replace(/\s+/g, " ").trim();
  return r.length > 60 ? `${r.slice(0, 60)}…` : r;
}
function ba(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Se(), p = c === "failed" ? () => l(r) : void 0;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "✨",
      subtitle: n.transformType,
      state: c,
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: ga(n.expression) }),
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
function ya(t) {
  if (!t) return "—";
  const r = t.replace(/\s+/g, " ").trim();
  return r.length > 60 ? `${r.slice(0, 60)}…` : r;
}
function va(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Se(), p = c === "failed" ? () => l(r) : void 0;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "❓",
      subtitle: n.label || "condition",
      state: c,
      body: /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: ya(n.expression) }),
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
function Na(t) {
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
function wa(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Se(), p = c === "failed" ? () => l(r) : void 0;
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⚡",
      subtitle: n.actionType,
      state: c,
      body: /* @__PURE__ */ e("span", { className: "italic", children: Na(n) }),
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
function ka(t) {
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
function Ca(t) {
  return t.mode === "all" ? "all" : t.mode === "any" ? "any" : `${t.n ?? 1} of many`;
}
function Ia(t) {
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
function Sa(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Se(), p = c === "failed" ? () => l(r) : void 0, u = Fo({ handleType: "target" }), x = Math.max(2, u.length + 1);
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "⑃",
      subtitle: Ca(n),
      state: c,
      body: /* @__PURE__ */ e("span", { className: "italic", children: Ia(n.mergeStrategy) }),
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
function $a(t) {
  return t.type === "role" ? `@${t.value}` : t.value;
}
function Ta(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Se(), p = c === "failed" ? () => l(r) : void 0, u = n.approvers ?? [], x = u.length, h = n.requiredCount ?? 0, f = `${x} approver${x === 1 ? "" : "s"}, ${h}/${x} required`, g = u.slice(0, 2), m = Math.max(0, u.length - 2), N = u.length === 0 ? /* @__PURE__ */ e("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: [
    g.map((v, y) => /* @__PURE__ */ e(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: $a(v)
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
      body: N,
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
function Aa({ id: t, data: r, selected: n }) {
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
function Ra({ id: t, data: r, selected: n }) {
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
function Pa({ id: t, data: r, selected: n }) {
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
function Ma({ id: t, data: r, selected: n }) {
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
function Da({ id: t, data: r, selected: n }) {
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
function Ea({ id: t, data: r, selected: n }) {
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
function Oa({ id: t, data: r, selected: n }) {
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
function _a({ id: t, data: r, selected: n }) {
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
function La(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Pe(), p = n.imageId, u = p ? (
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
function Ba(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = Pe(), p = i?.images?.[0] ?? null, x = i?.output?.filename ?? null, h = p ? /* @__PURE__ */ o("div", { children: [
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
  ), N = "image:save", v = `Save node, template: ${f}, state: ${c}`;
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
function Fa(t) {
  return t ? t.length > 40 ? `${t.slice(0, 37)}…` : t : "Not configured";
}
function Ua(t) {
  const { id: r, data: n, selected: a } = t, i = he(r), s = i?.status === "cancelled" ? "failed" : i?.status, c = (n._state && n._state !== "idle" ? n._state : void 0) ?? s ?? n._state ?? "idle", l = i?.output, p = Array.isArray(l?.items) ? l.items.length : null, u = /* @__PURE__ */ o("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary break-all", children: Fa(n.itemsPath ?? "") }),
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
  ] }) : void 0, f = n.itemAlias ? ` · alias: ${n.itemAlias}` : "", g = n.maxConcurrency ? ` · max ${n.maxConcurrency}` : "", m = `scatter${f}${g}`, N = `Scatter node, path: ${n.itemsPath ?? "not set"}, state: ${c}`, v = "bg-border-emphasis w-2.5 h-2.5";
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
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ e(L, { type: "target", position: B.Left, id: "in", className: v }),
        /* @__PURE__ */ e(L, { type: "source", position: B.Right, id: "out", className: v })
      ]
    }
  );
}
function ja(t) {
  const { id: r, data: n, selected: a } = t, i = Pe(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.width != null && n.height != null ? `→ ${n.width}×${n.height}` : n.width != null ? `→ ${n.width}w` : n.height != null ? `→ ${n.height}h` : null, x = p ? /* @__PURE__ */ e(
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
function za(t) {
  switch (t.op) {
    case "rotate":
      return `rotate ${t.degrees}°`;
    case "flip":
      return "flip ↕";
    case "flop":
      return "flop ↔";
  }
}
function qa(t) {
  const { id: r, data: n, selected: a } = t, i = Pe(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.operations ?? [], x = u.length > 0 ? u.map(za).join("  ›  ") : null, h = p ? /* @__PURE__ */ e(
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
function Wa(t) {
  const r = t.format?.toUpperCase() ?? "?", n = t.lossless ? "lossless" : t.quality != null ? `q${t.quality}` : "";
  return n ? `${r} ${n}` : r;
}
function Va(t) {
  const { id: r, data: n, selected: a } = t, i = Pe(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.format ? Wa(n) : null, x = p ? /* @__PURE__ */ e(
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
function Ja(t) {
  const { id: r, data: n, selected: a } = t, i = Pe(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.sigma != null ? `σ ${n.sigma}` : null, x = p ? /* @__PURE__ */ e(
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
function Ha(t) {
  const { id: r, data: n, selected: a } = t, i = Pe(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.gravity ?? "southeast", x = n.opacity != null ? `${Math.round(n.opacity * 100)}%` : "100%", h = p ? /* @__PURE__ */ e(
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
function Ka(t) {
  if (!t) return null;
  const r = t.x + t.width, n = t.y + t.height;
  return `[${t.x},${t.y} → ${r},${n}]`;
}
function Ga(t) {
  const { id: r, data: n, selected: a } = t, i = Pe(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = s?.output, x = Ka(p?.bbox ?? u?.bbox), h = p ? /* @__PURE__ */ e(
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
function Ya(t) {
  const { id: r, data: n, selected: a } = t, i = Pe(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e("div", { className: "flex gap-1 w-full", children: /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
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
function Xa(t) {
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
function Qa(t) {
  const { id: r, data: n, selected: a } = t, i = Pe(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.layers ?? [], x = p ? /* @__PURE__ */ e(
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
          children: Xa(m)
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
function Za(t) {
  return t === 0 ? "$0" : t < 1e-3 ? "<$0.001" : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function ei(t) {
  if (!t || t.trim().length === 0) return "Not configured";
  const n = t.split(`
`).slice(0, 2).join(" ").trim();
  return n.length > 120 ? `${n.slice(0, 117)}…` : n;
}
const ti = yo(function({ info: r }) {
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
            Za(r.costUsd)
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
function ni(t) {
  const { id: r, data: n, selected: a } = t, i = Pe(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = Se(), u = l === "failed" ? () => p(r) : void 0, x = /* @__PURE__ */ e("span", { className: "italic text-text-secondary text-[13px]", children: ei(n.userPrompt) }), h = s?.vision, f = l === "running" && h !== void 0 && h.tokensSeen > 0 && !h.analyzed, g = l === "running" && h !== void 0 && h.tokensSeen === 0 && !h.failure, m = h ? {
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
  } : void 0, N = m ? /* @__PURE__ */ e(ti, { info: m }) : void 0, v = n.model || "claude-sonnet-4-6", y = n.outputSchema ? "extract" : "caption", k = `Vision node, model ${v}, mode ${y}, state: ${l}`, b = "bg-border-emphasis w-2.5 h-2.5";
  return /* @__PURE__ */ o(
    fe,
    {
      icon: "📷",
      subtitle: `${v} · ${y}`,
      state: l,
      body: x,
      footer: N,
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
function ri(t) {
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
function oi(t) {
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
function ai(t) {
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
function ii(t) {
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
function si(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
function li(t) {
  const { id: r, data: n, selected: a } = t, i = Pe(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e(
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
      children: si(n.prompt)
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
function ci(t) {
  const { id: r, data: n, selected: a } = t, i = Pe(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = n.numVariations ?? 1, h = /* @__PURE__ */ o("div", { children: [
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
function di(t) {
  return !t || !t.trim() ? "No prompt set" : t.length > 80 ? `${t.slice(0, 77)}…` : t;
}
function pi(t) {
  const { id: r, data: n, selected: a } = t, i = Pe(), s = he(r), d = s?.status === "cancelled" ? "failed" : s?.status, l = (n._state && n._state !== "idle" ? n._state : void 0) ?? d ?? n._state ?? "idle", p = s?.images?.[0] ?? null, u = p ? /* @__PURE__ */ e(
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
      children: di(n.prompt)
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
const ui = {
  trigger: ma,
  llm: xa,
  transform: ba,
  condition: va,
  action: wa,
  fork: ka,
  join: Sa,
  approval: Ta,
  agent: Aa,
  "mcp-tool": Ra,
  "knowledge-base": Pa,
  "graph-query": Ma,
  memory: Da,
  guardrail: Ea,
  policy: Oa,
  "ag-ui-output": _a,
  "image-source": La,
  "image:save": Ba,
  scatter: Ua,
  "image:resize": ja,
  "image:transform": qa,
  "image:format-convert": Va,
  "image:sharpen": Ja,
  "image:watermark": Ha,
  "image:crop": Ga,
  "image:adjust-bw": Ya,
  "image:adjust-layer": Qa,
  "image:vision-analyze": ni,
  "image:vision-classify": ri,
  "image:vision-describe": oi,
  "image:vision-tag": ai,
  "image:vision-extract-text": ii,
  "image:generate": li,
  "image:variation": ci,
  "image:edit-prompt": pi
};
function mi(t) {
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
function hi({
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
  const u = c ?? {}, x = Mn(), [h] = Uo({
    sourceX: r,
    sourceY: n,
    targetX: a,
    targetY: i,
    sourcePosition: s,
    targetPosition: d
  }), f = mi(u.state), g = f.animate && !x, m = p ? "#646cff" : f.stroke, N = p ? 2.5 : f.strokeWidth;
  return /* @__PURE__ */ o(H, { children: [
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
    u.label ? /* @__PURE__ */ e(jo, { children: /* @__PURE__ */ e(
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
  const a = oe(r);
  a.current = r, Z(() => {
    if (n === !1) return;
    const i = (s) => {
      t.current && !t.current.contains(s.target) && a.current();
    };
    return document.addEventListener("mousedown", i), () => document.removeEventListener("mousedown", i);
  }, [t, n]);
}
const fi = [
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
function xi(t, r) {
  if (!r) return !0;
  const n = r.toLowerCase();
  return t.type.toLowerCase().includes(n) || t.name.toLowerCase().includes(n) || t.description.toLowerCase().includes(n);
}
function gi({
  anchor: t,
  flowPosition: r,
  disabledTypes: n = [],
  onClose: a,
  onInsert: i
}) {
  const [s, d] = $(""), [c, l] = $(0), p = oe(null), u = oe(null), x = V(() => new Set(n), [n]), h = V(
    () => fi.filter((m) => !x.has(m.type) && xi(m, s)),
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
    const N = h[m];
    !N || !r || (i(N.type, r), a());
  }, g = (m) => {
    if (m.key === "ArrowDown") {
      if (m.preventDefault(), h.length === 0) return;
      l((N) => (N + 1) % h.length);
    } else if (m.key === "ArrowUp") {
      if (m.preventDefault(), h.length === 0) return;
      l((N) => (N - 1 + h.length) % h.length);
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
        ] }) : h.map((m, N) => {
          const v = N === c;
          return /* @__PURE__ */ o(
            "div",
            {
              role: "option",
              "aria-selected": v,
              onMouseEnter: () => l(N),
              onMouseDown: (y) => {
                y.preventDefault(), f(N);
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
function bi({
  addNode: t,
  addEdge: r,
  updateNodeData: n,
  getDefinition: a
}) {
  Z(() => {
  }, [t, r, n, a]);
}
function yi({
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
      if (_n(g.target)) return;
      const m = document.activeElement, N = !!m && x.contains(m);
      if (g.key === "Tab") {
        if (!N || !t || t.nodes.length === 0) return;
        const v = Mi(t);
        if (v.length === 0) return;
        const k = m?.closest(".react-flow__node")?.getAttribute("data-id") ?? null, b = k !== null ? v.indexOf(k) : -1, w = g.shiftKey ? -1 : 1, C = b === -1 ? g.shiftKey ? v.length - 1 : 0 : (b + w + v.length) % v.length, R = v[C];
        h(R) && g.preventDefault();
        return;
      }
      if (N && !g.altKey) {
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
          d((v) => {
            const y = v.filter((k) => k.selected);
            if (y.length === 0) return v;
            for (const k of y) i(k.id);
            return v.filter((k) => !k.selected);
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
          const v = l([p.current]);
          v.length > 0 && n(v[0]);
          return;
        }
        if ((g.metaKey || g.ctrlKey) && g.key === "d" && r) {
          g.preventDefault();
          const v = l([r]);
          v.length > 0 && n(v[0]);
          return;
        }
        if (g.key === "ArrowUp" || g.key === "ArrowDown" || g.key === "ArrowLeft" || g.key === "ArrowRight") {
          if (g.preventDefault(), g.stopPropagation(), !g.shiftKey || !r) return;
          const v = 8, y = g.key === "ArrowLeft" ? -v : g.key === "ArrowRight" ? v : 0, k = g.key === "ArrowUp" ? -v : g.key === "ArrowDown" ? v : 0;
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
function vi({
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
function Ni({
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
const Qr = [
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
], Zr = Qr.flatMap((t) => t.items.map((r) => ({ type: r.type, name: r.name })));
function wi(t, r) {
  if (!r) return !0;
  const n = r.toLowerCase();
  return t.name.toLowerCase().includes(n) || t.type.toLowerCase().includes(n) || t.description.toLowerCase().includes(n);
}
function ki({ disabledTypes: t = [] }) {
  const [r, n] = $(""), [a, i] = $(null), s = V(() => new Set(t), [t]), d = V(
    () => Qr.map((l) => ({
      ...l,
      items: l.items.filter((p) => wi(p, r))
    })).filter((l) => l.items.length > 0),
    [r]
  ), c = (l) => (p) => {
    if (s.has(l.type)) {
      p.preventDefault();
      return;
    }
    p.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: l.type })
    ), p.dataTransfer.effectAllowed = "move";
  };
  return /* @__PURE__ */ o("div", { className: "w-[220px] shrink-0 h-full border-r border-[#e2e8f0] bg-white flex flex-col", "data-testid": "node-palette", children: [
    /* @__PURE__ */ e("div", { className: "py-[10px] px-3 border-b border-[#e2e8f0] shrink-0", children: /* @__PURE__ */ e(
      "input",
      {
        type: "text",
        value: r,
        onChange: (l) => n(l.target.value),
        placeholder: "Search nodes…",
        className: "w-full box-border border border-[#d1d5db] rounded-[6px] py-1.5 px-[10px] text-[13px] font-[inherit] bg-[#f9fafb] text-[#0f172a] outline-none"
      }
    ) }),
    /* @__PURE__ */ e("div", { className: "flex-1 overflow-y-auto py-2", children: d.length === 0 ? /* @__PURE__ */ o("div", { className: "px-3.5 py-4 text-xs text-[#94a3b8]", children: [
      'No nodes match "',
      r,
      '"'
    ] }) : d.map((l) => /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: "pt-2 px-[14px] pb-1 text-[10px] font-bold tracking-[0.6px] uppercase text-[#94a3b8] font-[inherit]", children: l.name }),
      l.items.map((p) => {
        const u = s.has(p.type), x = a === p.type && !u, h = Zr.findIndex((g) => g.type === p.type), f = h >= 0 && h < 9 ? h + 1 : null;
        return /* @__PURE__ */ o(
          "div",
          {
            draggable: !u,
            onDragStart: c(p),
            onMouseEnter: () => i(p.type),
            onMouseLeave: () => i(null),
            className: I(
              "h-11 box-border my-0.5 mx-2 py-1.5 px-[10px] flex items-center gap-[10px] rounded-[6px] border border-transparent font-[inherit]",
              u ? "cursor-not-allowed opacity-[0.45]" : "cursor-grab",
              x ? "bg-[#f1f5f9]" : "bg-transparent"
            ),
            title: u ? `${p.name} is already placed` : f ? `${p.description} — press ${f}` : p.description,
            "data-node-type": p.type,
            "data-disabled": u || void 0,
            children: [
              /* @__PURE__ */ e(
                "span",
                {
                  className: "text-[18px] leading-none w-[22px] text-center shrink-0",
                  "aria-hidden": !0,
                  children: p.icon
                }
              ),
              /* @__PURE__ */ o("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ o("div", { className: I("text-[13px] font-semibold text-text-primary flex items-center gap-1.5", u && "line-through"), children: [
                  /* @__PURE__ */ e("span", { children: p.name }),
                  f !== null && /* @__PURE__ */ e(
                    "kbd",
                    {
                      "data-testid": `palette-shortcut-${p.type}`,
                      className: I("text-[10px] font-semibold font-mono text-[#64748b] bg-[#f1f5f9] border border-[#e2e8f0] rounded px-[5px] leading-[14px] min-w-[14px] text-center", u ? "opacity-50" : "opacity-100"),
                      children: f
                    }
                  )
                ] }),
                /* @__PURE__ */ e("div", { className: "text-[11px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis", children: u ? "Placed" : p.description })
              ] })
            ]
          },
          p.type
        );
      })
    ] }, l.name)) }),
    /* @__PURE__ */ e("div", { className: "py-2 px-3 border-t border-[#e2e8f0] text-[10px] text-[#94a3b8] font-[inherit] shrink-0", children: "Press 1–8 to insert at center" })
  ] });
}
function Ci({
  definition: t,
  addNode: r,
  screenToFlowPosition: n,
  containerRef: a
}) {
  return Z(() => {
    const i = (s) => {
      if (!_n(s.target) && !(s.metaKey || s.ctrlKey || s.altKey) && /^[1-8]$/.test(s.key)) {
        const d = Number(s.key) - 1, c = Zr[d];
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
const Ii = 280, Si = 120, $i = 40, Ti = 40;
function Ai(t, r) {
  const n = Ii, a = Si, i = $i, s = Ti;
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
      const v = N.shift(), y = p.get(v), k = d.get(v) ?? [];
      for (const b of k)
        p.has(b) || (p.set(b, y + 1), N.push(b));
    }
  }
  const u = /* @__PURE__ */ new Map();
  let x = -1;
  for (const N of t.nodes) {
    const v = p.get(N.id);
    v !== void 0 && (u.has(v) || u.set(v, []), u.get(v).push(N.id), v > x && (x = v));
  }
  for (const N of u.values())
    N.sort();
  const h = t.nodes.filter((N) => !p.has(N.id)).map((N) => N.id).sort(), f = x >= 0 ? x + 1 : 0;
  h.length > 0 && u.set(f, h);
  const g = [], m = [...u.keys()].sort((N, v) => N - v);
  for (const N of m) {
    const v = u.get(N), y = v.length, k = i + N * n;
    for (let b = 0; b < y; b++) {
      const w = s + (b - y / 2) * a;
      g.push({ id: v[b], position: { x: k, y: w } });
    }
  }
  return g;
}
function Ri({
  definition: t,
  setPositions: r,
  fitView: n
}) {
  const a = E(() => {
    n({ padding: 0.15, duration: 500 });
  }, [n]), i = E(() => {
    if (!t) return;
    const s = Ai(t);
    s.length !== 0 && (r(s), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => n({ padding: 0.15, duration: 500 })) : n({ padding: 0.15, duration: 500 }));
  }, [t, r, n]);
  return { handleFitView: a, handleAutoArrange: i };
}
function Pi({
  definition: t,
  setPositions: r,
  fitView: n
}) {
  const { handleFitView: a, handleAutoArrange: i } = Ri({
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
  }, [i]), /* @__PURE__ */ o(H, { children: [
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
function _n(t) {
  if (!t || !(t instanceof HTMLElement)) return !1;
  const r = t.tagName;
  return !!(r === "INPUT" || r === "TEXTAREA" || r === "SELECT" || t.isContentEditable);
}
function Mi(t) {
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
const Di = { animated: hi }, Ei = ui;
function Oi(t) {
  return {
    id: t.id,
    type: t.type,
    position: t.position,
    data: { ...t.data, nodeType: t.type }
  };
}
function _i(t) {
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
function Li({ onFilterLog: t, errorNodeId: r, onErrorNodePosition: n, replayEdgeStates: a, replayNodeClasses: i, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c }) {
  const {
    definition: l,
    addNode: p,
    setPositions: u,
    addEdge: x,
    removeEdge: h,
    removeNode: f,
    duplicateNodes: g,
    selectedNodeId: m,
    setSelectedNodeId: N,
    updateNodeData: v
  } = Ye(), { screenToFlowPosition: y, fitView: k } = qo();
  bi({
    addNode: p,
    addEdge: x,
    updateNodeData: v,
    getDefinition: () => l
  });
  const [b, w, C] = Wo([]), [R, S, A] = Vo([]), [P, X] = $(!0), [ee, re] = $(!0), le = oe(null), de = oe(null), [se, F] = $(null), [M, q] = $(null), z = E(
    (J, te) => {
      J.preventDefault(), q({ nodeId: te.id, x: J.clientX, y: J.clientY });
    },
    []
  ), O = E(() => {
    M && (t?.(M.nodeId), q(null));
  }, [M, t]), U = E(() => {
    if (!M) return;
    const J = M.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(J).catch(() => {
    }), q(null);
  }, [M]), j = E(() => {
    M && (d?.(M.nodeId), q(null));
  }, [M, d]), W = E(() => {
    if (!M) return;
    const J = g([M.nodeId]);
    J.length > 0 && N(J[0]), q(null);
  }, [M, g, N]), ce = E(() => q(null), []);
  Z(() => {
    if (!l) {
      w([]), S([]);
      return;
    }
    w((J) => {
      const te = new Map(J.map((pe) => [pe.id, pe]));
      return l.nodes.map((pe) => {
        const xe = te.get(pe.id), $e = Oi(pe);
        return s && s.size > 0 && ($e.data._hasBreakpoint = s.has(pe.id)), c && ($e.data._pausedAtBreakpoint = pe.id === c), xe ? { ...xe, ...$e, selected: xe.selected } : $e;
      });
    }), S(() => l.edges.map(_i));
  }, [l, s, c, w, S]), Z(() => {
    if (!r) {
      n?.(null);
      return;
    }
    w(
      (J) => J.map((te) => ({
        ...te,
        className: te.id === r ? "node-error" : te.className?.replace("node-error", "").trim() || void 0
      }))
    ), requestAnimationFrame(() => {
      const J = le.current;
      if (!J) return;
      const te = J.querySelector(
        `.react-flow__node[data-id="${CSS.escape(r)}"]`
      );
      if (!te) {
        n?.(null);
        return;
      }
      const pe = te.getBoundingClientRect();
      n?.({ x: pe.right, y: pe.top + pe.height / 2 });
    });
  }, [r, w, n]), Z(() => {
    i && w(
      (J) => J.map((te) => {
        const pe = i[te.id] ?? "", $e = [te.id === r ? "node-error" : "", pe].filter(Boolean).join(" ") || void 0;
        let Ce;
        pe === "node-replay-active" ? Ce = "running" : pe === "node-replay-completed" ? Ce = "completed" : pe === "node-replay-failed" && (Ce = "failed");
        const qe = { ...te.data };
        return Ce ? qe._state = Ce : qe._state = "idle", { ...te, className: $e, data: qe };
      })
    );
  }, [i, r, w]), Z(() => {
    a && S(
      (J) => J.map((te) => {
        const pe = a[te.id];
        if (!pe) return te;
        const xe = te.data ?? {};
        return xe.state === pe ? te : { ...te, data: { ...xe, state: pe } };
      })
    );
  }, [a, S]);
  const _ = E(
    (J) => {
      C(J);
      const te = [], pe = [];
      for (const xe of J)
        xe.type === "position" && xe.position && xe.dragging === !1 ? te.push({ id: xe.id, position: xe.position }) : xe.type === "remove" && pe.push(xe.id);
      te.length && u(te);
      for (const xe of pe) f(xe);
    },
    [C, u, f]
  ), ne = E(
    (J) => {
      A(J);
      for (const te of J)
        te.type === "remove" && h(te.id);
    },
    [A, h]
  ), ye = E(
    (J) => {
      if (!l || !J.source || !J.target) return;
      const te = l.nodes.find((Ce) => Ce.id === J.source), pe = l.nodes.find((Ce) => Ce.id === J.target);
      if (!te || !pe) return;
      const xe = J.sourceHandle ?? "out", $e = J.targetHandle ?? "in";
      Cn(
        te.type,
        xe,
        pe.type,
        $e
      ) && x({
        source: J.source,
        sourceHandle: xe,
        target: J.target,
        targetHandle: $e
      });
    },
    [l, x]
  ), Me = E(
    (J) => {
      if (!l || !J.source || !J.target) return !1;
      const te = l.nodes.find((xe) => xe.id === J.source), pe = l.nodes.find((xe) => xe.id === J.target);
      return !te || !pe ? !1 : Cn(
        te.type,
        J.sourceHandle ?? "out",
        pe.type,
        J.targetHandle ?? "in"
      );
    },
    [l]
  ), Je = E(
    (J, te) => {
      N(te.id);
    },
    [N]
  ), Oe = E(() => {
    N(null);
  }, [N]), Ae = E(
    (J) => {
      const te = J.target;
      if (!te || !(te.classList.contains("react-flow__pane") || te.classList.contains("react-flow__renderer") || te.classList.contains("react-flow__viewport") || te.classList.contains("react-flow"))) return;
      J.preventDefault();
      const xe = y({ x: J.clientX, y: J.clientY });
      F({
        anchor: { x: J.clientX, y: J.clientY },
        flowPosition: xe
      });
    },
    [y]
  ), Be = E(() => F(null), []), _e = E(
    (J, te) => {
      p(J, te);
    },
    [p]
  ), Fe = V(() => l ? l.nodes.some((J) => J.type === "trigger") ? ["trigger"] : [] : [], [l]), { handleDragOver: we, handleDrop: me } = vi({
    addNode: p,
    screenToFlowPosition: y
  });
  Z(() => {
    const J = (te) => {
      if (!_n(te.target) && !(te.metaKey || te.ctrlKey || te.altKey)) {
        if (te.key === "m" || te.key === "M") {
          X((pe) => !pe);
          return;
        }
        if (te.key === "c" || te.key === "C") {
          re((pe) => !pe);
          return;
        }
      }
    };
    return window.addEventListener("keydown", J), () => window.removeEventListener("keydown", J);
  }, []), yi({
    definition: l,
    selectedNodeId: m,
    setSelectedNodeId: N,
    removeNode: f,
    removeDefEdge: h,
    setNodes: w,
    setEdges: S,
    setPositions: u,
    duplicateNodes: g,
    clipboardRef: de,
    containerRef: le
  });
  const Q = E((J) => {
    switch (J.data?._state) {
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
      ref: le,
      className: "flex-1 min-w-0 min-h-[520px] relative bg-[#fafbfc]",
      role: "application",
      "aria-label": "Pipeline editor canvas",
      tabIndex: 0,
      "data-testid": "pipeline-canvas",
      onDragOver: we,
      onDrop: me,
      onDoubleClick: Ae,
      children: [
        /* @__PURE__ */ o(
          Jo,
          {
            nodes: b,
            edges: R,
            nodeTypes: Ei,
            edgeTypes: Di,
            onNodesChange: _,
            onEdgesChange: ne,
            onConnect: ye,
            isValidConnection: Me,
            onNodeClick: Je,
            onNodeContextMenu: z,
            onPaneClick: Oe,
            fitView: !0,
            snapToGrid: !0,
            snapGrid: [16, 16],
            edgesFocusable: !0,
            defaultEdgeOptions: { type: "smoothstep" },
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ e(
                Ho,
                {
                  variant: Ko.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              ee ? /* @__PURE__ */ e(
                Go,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              P ? /* @__PURE__ */ e(
                Yo,
                {
                  position: "bottom-right",
                  pannable: !0,
                  zoomable: !0,
                  className: "!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]",
                  maskColor: "rgba(15, 23, 42, 0.04)",
                  nodeColor: Q,
                  nodeStrokeColor: "#e2e8f0"
                }
              ) : null
            ]
          }
        ),
        se ? /* @__PURE__ */ e(
          gi,
          {
            anchor: se.anchor,
            flowPosition: se.flowPosition,
            disabledTypes: Fe,
            onClose: Be,
            onInsert: _e
          }
        ) : null,
        /* @__PURE__ */ e(
          Ci,
          {
            definition: l,
            addNode: p,
            screenToFlowPosition: y,
            containerRef: le
          }
        ),
        /* @__PURE__ */ e(
          Pi,
          {
            definition: l,
            setPositions: u,
            fitView: k
          }
        ),
        M ? /* @__PURE__ */ e(
          Ni,
          {
            nodeMenu: M,
            breakpoints: s,
            showBreakpointOption: !!d,
            onFilterLog: O,
            onCopyNodeId: U,
            onDuplicate: W,
            onToggleBreakpoint: j,
            onDismiss: ce
          }
        ) : null
      ]
    }
  );
}
function Bi({ onFilterLog: t, errorNodeId: r, onErrorNodePosition: n, replayEdgeStates: a, replayNodeClasses: i, breakpoints: s, onToggleBreakpoint: d, pausedAtNodeId: c } = {}) {
  return /* @__PURE__ */ e(zo, { children: /* @__PURE__ */ e(
    Li,
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
const Hn = {
  LLMError: { bg: "#fef2f2", fg: "#dc2626" },
  TimeoutError: { bg: "#fff7ed", fg: "#ea580c" },
  NetworkError: { bg: "#fffbeb", fg: "#d97706" },
  ValidationError: { bg: "#fefce8", fg: "#ca8a04" },
  RegistryConflict: { bg: "#faf5ff", fg: "#9333ea" },
  UnknownError: { bg: "#f1f5f9", fg: "#475569" }
};
function Fi(t) {
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
function Ui({ error: t, anchor: r, onDismiss: n, onRetry: a }) {
  const [i, s] = $(!1), [d, c] = $(!1), l = t.errorCategory ?? "UnknownError", p = Hn[l] ?? Hn.UnknownError, u = E(async () => {
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
              children: Fi(l)
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
function ji(t, r) {
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
function eo(t) {
  const r = [], n = [], { nodes: a, edges: i } = t, s = /* @__PURE__ */ new Map();
  for (const d of a)
    s.set(d.id, d);
  return zi(a, r), qi(a, i, r), Wi(i, s, r), Vi(a, r), Zi(a, i, r), es(a, i, n), ts(a, i, n), ns(a, i, n), rs(a, i, n), n.push(...os(t)), n.push(...as(t)), n.push(...is(t)), n.push(...ss(t)), n.push(...ls(t)), n.push(...cs(t)), n.push(...ds(t)), n.push(...ps(t)), n.push(...us(t)), n.push(...ms(t)), {
    errors: r,
    warnings: n,
    isValid: r.length === 0,
    canPublish: r.length === 0
  };
}
function zi(t, r) {
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
function qi(t, r, n) {
  const a = ji(t, r);
  a !== null && n.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: a
  });
}
function Wi(t, r, n) {
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
    Cn(
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
function Vi(t, r) {
  for (const n of t)
    switch (n.data.type) {
      case "llm":
        Ji(n.id, n.data, r);
        break;
      case "transform":
        Hi(n.id, n.data, r);
        break;
      case "condition":
        Ki(n.id, n.data, r);
        break;
      case "action":
        Gi(n.id, n.data, r);
        break;
      case "fork":
        Yi(n.id, n.data, r);
        break;
      case "join":
        Xi(n.id, n.data, r);
        break;
      case "approval":
        Qi(n.id, n.data, r);
        break;
    }
}
function Ji(t, r, n) {
  r.provider || ze(n, t, "provider"), (!r.model || !r.model.trim()) && ze(n, t, "model"), (!r.systemPrompt || !r.systemPrompt.trim()) && ze(n, t, "systemPrompt"), (!r.userPromptTemplate || !r.userPromptTemplate.trim()) && ze(n, t, "userPromptTemplate");
}
function Hi(t, r, n) {
  r.transformType || ze(n, t, "transformType"), (!r.expression || !r.expression.trim()) && ze(n, t, "expression");
}
function Ki(t, r, n) {
  (!r.expression || !r.expression.trim()) && ze(n, t, "expression");
}
function Gi(t, r, n) {
  r.actionType || ze(n, t, "actionType");
}
function Yi(t, r, n) {
  (typeof r.branchCount != "number" || r.branchCount < 2) && n.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: t,
    field: "branchCount"
  });
}
function Xi(t, r, n) {
  r.mode || ze(n, t, "mode"), r.mergeStrategy || ze(n, t, "mergeStrategy"), r.mode === "n_of_m" && (typeof r.n != "number" || r.n < 1) && n.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: t,
    field: "n"
  });
}
function Qi(t, r, n) {
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
function Zi(t, r, n) {
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
function es(t, r, n) {
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
function ts(t, r, n) {
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
function ns(t, r, n) {
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
function rs(t, r, n) {
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
function Ge(t) {
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
function os(t) {
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
      message: `${c.data.type} node '${Ge(c)}' has no error handler — failures will terminate the run.`,
      nodeId: c.id
    });
  return r;
}
function as(t) {
  const r = [];
  for (const n of t.nodes)
    n.data.type === "llm" && (typeof n.data.maxTokens != "number" || n.data.maxTokens <= 0) && r.push({
      code: "LLM_NO_MAX_TOKENS",
      severity: "warning",
      message: `LLM node '${Ge(n)}' has no maxTokens — responses could run long / expensive.`,
      nodeId: n.id,
      field: "maxTokens"
    });
  return r;
}
function is(t) {
  const r = [];
  for (const n of t.nodes)
    n.data.type === "approval" && (typeof n.data.timeoutMs != "number" || n.data.timeoutMs <= 0) && r.push({
      code: "UNGUARDED_APPROVAL_TIMEOUT",
      severity: "warning",
      message: `Approval '${Ge(n)}' has no timeout — the run could block indefinitely.`,
      nodeId: n.id,
      field: "timeoutMs"
    });
  return r;
}
function ss(t) {
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
function ls(t) {
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
function cs(t) {
  const r = [], n = /* @__PURE__ */ new Map();
  for (const a of t.nodes) {
    const i = Ge(a), s = n.get(i) ?? [];
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
function ds(t) {
  const r = [], n = /\{\{[^}]+\}\}/;
  for (const a of t.nodes) {
    if (a.data.type !== "llm") continue;
    const { temperature: i, userPromptTemplate: s } = a.data;
    typeof i != "number" || i <= 0.8 || !s || !n.test(s) || r.push({
      code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
      severity: "warning",
      message: `LLM '${Ge(a)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
      nodeId: a.id
    });
  }
  return r;
}
function ps(t) {
  return t.triggerBinding?.event !== "schedule" ? [] : t.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function us(t) {
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
      message: `Condition '${Ge(a)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: a.id,
      field: "false"
    });
  }
  return r;
}
function ms(t) {
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
      message: `Fork '${Ge(c)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
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
      message: `Join '${Ge(c)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: c.id
    });
  }
  return r;
}
function hs(t, r) {
  return `${t}${r}`;
}
const fs = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, xs = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function to(t) {
  return t.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const gs = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function bs(t) {
  const r = xs[t.type] ?? "■", n = gs[t.type] ?? t.type.charAt(0).toUpperCase() + t.type.slice(1);
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
  return to(a ? `${i}<br/>${a}` : i);
}
function ys(t, r) {
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
function vs(t) {
  return !t || t === "out" ? null : t;
}
function Ns(t) {
  const r = ["flowchart TD"], n = {}, a = /* @__PURE__ */ new Map();
  for (const i of t.nodes) {
    const s = fs[i.type] ?? "n", d = n[s] = (n[s] ?? 0) + 1;
    a.set(i.id, hs(s, d));
  }
  for (const i of t.nodes) {
    const s = a.get(i.id);
    if (!s) continue;
    const d = ys(i.type, bs(i));
    r.push(`  ${s}${d}`);
  }
  for (const i of t.edges) {
    const s = a.get(i.source), d = a.get(i.target);
    if (!s || !d) continue;
    const c = vs(i.sourceHandle);
    c ? r.push(`  ${s} --"${to(c)}"--> ${d}`) : r.push(`  ${s} --> ${d}`);
  }
  return r.join(`
`);
}
function Kn(t) {
  return JSON.stringify(t, (r, n) => {
    if (n && typeof n == "object" && !Array.isArray(n)) {
      const a = Object.keys(n).sort(), i = {};
      for (const s of a) i[s] = n[s];
      return i;
    }
    return n;
  });
}
function Gn(t) {
  const r = /* @__PURE__ */ new Map();
  for (const n of t) r.set(n.id, n);
  return r;
}
function Yn(t) {
  return new Set(t.edges.map((r) => r.id));
}
function ws(t, r) {
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
  const n = Gn(t.nodes), a = Gn(r.nodes), i = [], s = [], d = [];
  for (const [y, k] of n) {
    const b = a.get(y);
    if (!b) {
      i.push({ node: k, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const w = Kn(k.data) !== Kn(b.data), C = k.position.x !== b.position.x || k.position.y !== b.position.y;
    (w || C) && d.push({ node: k, dataChanged: w, positionChanged: C });
  }
  for (const [y, k] of a)
    n.has(y) || s.push({ node: k, dataChanged: !0, positionChanged: !1 });
  const c = Yn(t), l = Yn(r);
  let p = 0, u = 0;
  for (const y of c) l.has(y) || p++;
  for (const y of l) c.has(y) || u++;
  const x = t.name !== r.name, h = (t.icon ?? "") !== (r.icon ?? ""), f = new Set(t.tags ?? []), g = new Set(r.tags ?? []), m = [], N = [];
  for (const y of f) g.has(y) || m.push(y);
  for (const y of g) f.has(y) || N.push(y);
  const v = m.length > 0 || N.length > 0;
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
    tagsChanged: v,
    tagsAdded: m,
    tagsRemoved: N
  };
}
const ks = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function Cs(t) {
  return t.data.type === "condition" && t.data.label ? t.data.label : t.data.type === "llm" ? t.data.model : t.data.type === "action" ? t.data.actionType : t.data.type === "trigger" ? t.data.triggerType : t.type.charAt(0).toUpperCase() + t.type.slice(1);
}
function nn(t, r, n) {
  const a = t.node, i = ks[a.type] ?? "■", s = r !== "removed" && !!n;
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
        /* @__PURE__ */ e("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: Cs(a) }),
        r === "modified" && t.positionChanged ? /* @__PURE__ */ e("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]", children: "moved" }) : null
      ]
    },
    `${r}-${t.node.id}`
  );
}
function Is({
  open: t,
  onClose: r,
  currentDef: n,
  publishedDef: a,
  onJumpToNode: i
}) {
  const s = V(
    () => ws(n, a),
    [n, a]
  ), d = (u) => {
    i && i(u), r();
  }, c = a !== null, l = n.version, p = n.publishedVersion;
  return /* @__PURE__ */ o(
    Ve,
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
        n.publishedVersion === void 0 ? /* @__PURE__ */ e("p", { className: "m-0 text-[13px] text-text-secondary", children: "This pipeline has never been published." }) : c ? /* @__PURE__ */ o(H, { children: [
          /* @__PURE__ */ o("div", { className: "flex gap-3 flex-wrap", children: [
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Added (",
                s.addedNodes.length,
                ")"
              ] }),
              s.addedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.addedNodes.map((u) => nn(u, "added", d))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Removed (",
                s.removedNodes.length,
                ")"
              ] }),
              s.removedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.removedNodes.map((u) => nn(u, "removed", void 0))
            ] }),
            /* @__PURE__ */ o("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ o("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Modified (",
                s.modifiedNodes.length,
                ")"
              ] }),
              s.modifiedNodes.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "None" }) : s.modifiedNodes.map((u) => nn(u, "modified", d))
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
function Ss({ open: t, onClose: r }) {
  return null;
}
const rn = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", Xn = "px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function $s(t) {
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
    currentDef: N,
    publishedDef: v,
    onJumpToNode: y,
    simPanelOpen: k,
    onSimPanelClose: b
  } = t;
  return /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ e(
      Ve,
      {
        open: r,
        onClose: n,
        title: "Publish pipeline?",
        maxWidth: 420,
        footer: /* @__PURE__ */ o(H, { children: [
          /* @__PURE__ */ e("button", { onClick: n, className: rn, children: "Cancel" }),
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
          i ? /* @__PURE__ */ o(H, { children: [
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
      Ve,
      {
        open: l,
        onClose: p,
        title: "Delete pipeline?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(H, { children: [
          /* @__PURE__ */ e("button", { onClick: p, className: rn, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: u, className: Xn, children: "Delete" })
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
      Ve,
      {
        open: x,
        onClose: h,
        title: "Clear run history?",
        maxWidth: 400,
        footer: /* @__PURE__ */ o(H, { children: [
          /* @__PURE__ */ e("button", { onClick: h, className: rn, children: "Cancel" }),
          /* @__PURE__ */ e("button", { onClick: f, className: Xn, children: "Clear history" })
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
      Is,
      {
        open: g,
        onClose: m,
        currentDef: N,
        publishedDef: v,
        onJumpToNode: y
      }
    ),
    /* @__PURE__ */ e(
      Ss,
      {
        open: k,
        onClose: b
      }
    )
  ] });
}
function Ts({ runId: t, visible: r }) {
  const [n, a] = $(/* @__PURE__ */ new Map()), i = oe(null), s = oe(!0), d = oe(null);
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
      const N = m?.runId;
      if (!t || N !== t) return;
      const v = m?.stepId;
      if (v) {
        if (g === "pipeline.llm.stream.opened")
          a((y) => {
            const k = new Map(y);
            return k.has(v) || k.set(v, {
              stepId: v,
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
            const b = new Map(k), w = b.get(v);
            if (w) {
              const C = {
                ...w,
                tokens: [...w.tokens, y],
                text: w.text + y,
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
          const y = m?.tokensIn, k = m?.tokensOut;
          a((b) => {
            const w = new Map(b), C = w.get(v), R = C ? Date.now() - C.startedAt : 0, S = R > 1e3 ? `${(R / 1e3).toFixed(1)}s` : `${R}ms`, A = `${v}: ${y ?? "?"} tokens in, ${k ?? "?"} tokens out (${S})`;
            return C ? w.set(v, {
              ...C,
              active: !1,
              summary: A
            }) : w.set(v, {
              stepId: v,
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
  Re("*", p), Z(() => {
    l();
  }, [n, l]);
  const u = E((f) => {
    a((g) => {
      const m = new Map(g), N = m.get(f);
      return N && m.set(f, { ...N, collapsed: !N.collapsed }), m;
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
              !f.collapsed && /* @__PURE__ */ o(H, { children: [
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
function At(t, r) {
  const n = new Blob([r], { type: "application/json" }), a = URL.createObjectURL(n), i = document.createElement("a");
  i.href = a, i.download = t, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(a);
}
function Rt(t, r) {
  if (!r) return "step";
  const n = t?.nodes.find((a) => a.id === r);
  return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : r;
}
function As(t) {
  const r = ft(), { toast: n } = Zt(), { definition: a, selectedNodeId: i, setSelectedNodeId: s } = Ye(), d = oe(r.runs);
  Z(() => {
    d.current = r.runs;
  }, [r.runs]);
  const c = oe(a);
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
  ), N = E(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const D = Math.round(T.durationMs / 100) / 10;
      n(`Run completed in ${D}s`, { type: "success" });
    },
    [l, n]
  ), v = E(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const D = T.error.nodeId, ae = Rt(c.current, D);
      n(`Run failed at ${ae}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => s(D)
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
      const D = T.stepId, ae = Rt(c.current, D);
      n(`Approval requested on "${ae}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => s(D)
      });
    },
    [l, s, n]
  );
  Re("pipeline.run.started", m), Re("pipeline.run.completed", N), Re("pipeline.run.failed", v), Re("pipeline.run.cancelled", y), Re("pipeline.approval.requested", k);
  const [b, w] = $(null);
  Z(() => {
    if (r.activeRunIds.length > 0) {
      const T = r.activeRunIds[r.activeRunIds.length - 1];
      T !== b && w(T);
      return;
    }
    if (!b) {
      const T = Object.values(r.runs).sort(
        (D, ae) => ae.startedAt.localeCompare(D.startedAt)
      );
      T.length > 0 && w(T[0].id);
    }
  }, [r.activeRunIds, r.runs, b]);
  const C = b ? r.runs[b] : void 0, R = !!C && (C.status === "running" || C.status === "pending" || C.status === "awaiting_approval"), [S, A] = $(/* @__PURE__ */ new Set()), [P, X] = $(null), [ee, re] = $(null), [le, de] = $(null), [se, F] = $(0), [M, q] = $(!1), [z, O] = $(null), U = E(
    (T, D) => {
      D === null ? (re(null), de(null)) : (re(D), de(T));
    },
    []
  ), j = E((T) => {
    A((D) => {
      const ae = new Set(D);
      return ae.has(T) ? ae.delete(T) : ae.add(T), ae;
    });
  }, []), W = E(async () => {
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
  }, [S, r, t]), ce = E(() => {
    P && (r.resolveBreakpoint(P.runId, P.stepId, "continue"), X(null));
  }, [P, r]), _ = E(() => {
    P && (r.resolveBreakpoint(P.runId, P.stepId, "step_over"), X(null));
  }, [P, r]), ne = E(() => {
    P && (r.resolveBreakpoint(P.runId, P.stepId, "resume_all"), X(null));
  }, [P, r]), ye = E(async () => {
    if (!(!P || !ee || le !== P.stepId) && Object.keys(ee).length !== 0) {
      q(!0);
      try {
        await No(
          t,
          P.runId,
          P.stepId,
          { mode: "merge", values: ee }
        ), re(null), de(null), F((T) => T + 1), r.resolveBreakpoint(P.runId, P.stepId, "continue"), X(null);
      } catch (T) {
        if (T instanceof wo)
          n(`Patch rejected: ${T.reason}`, { type: "error", durationMs: 8e3 });
        else if (T instanceof jn)
          n(`Apply failed (HTTP ${T.status})`, { type: "error", durationMs: 6e3 });
        else {
          const D = T instanceof Error ? T.message : String(T);
          n(`Apply failed: ${D}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        q(!1);
      }
    }
  }, [P, ee, le, t, r, n]), Me = E(
    async (T) => {
      if (P) {
        O(T);
        try {
          await ko(
            t,
            P.runId,
            P.stepId,
            T
          ), n("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (D) {
          if (D instanceof jn)
            n(`Revert failed (HTTP ${D.status})`, { type: "error", durationMs: 6e3 });
          else {
            const ae = D instanceof Error ? D.message : String(D);
            n(`Revert failed: ${ae}`, { type: "error", durationMs: 6e3 });
          }
        } finally {
          O(null);
        }
      }
    },
    [P, t, n]
  ), Je = E(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      X({ runId: T.runId, stepId: T.stepId });
      const D = Rt(c.current, T.stepId);
      n(`Paused at breakpoint: ${D}`, { type: "warning", durationMs: 6e3 });
    },
    [l, n]
  );
  Re("pipeline.step.breakpoint", Je);
  const Oe = E(
    (T) => {
      "eventType" in T || P && P.runId === T.runId && X(null);
    },
    [P]
  );
  Re("pipeline.run.completed", Oe), Re("pipeline.run.failed", Oe), Re("pipeline.run.cancelled", Oe);
  const Ae = E(() => {
    p?.nodeId && (r.retryFromStep(p.nodeId), f());
  }, [p, r, f]), Be = a?.status === "published", _e = !R && !Be, Fe = R ? "Cancel the active run" : Be ? "Start a new run" : "Publish the pipeline to enable runs", [we, me] = $(!1), [Q, J] = $({}), [te, pe] = $(!1), [xe, $e] = $("config");
  Z(() => {
    i !== null && $e("config");
  }, [i]);
  const Ce = E(async (T) => {
    pe(!0);
    try {
      const D = await r.triggerRun(t, T);
      w(D), $e("runs"), n(`Pipeline triggered — run ${D.slice(0, 8)}…`, { type: "success" });
    } catch (D) {
      console.error("[PipelineEditor] triggerRun failed", D), n(`Trigger failed: ${D.message}`, { type: "error" });
    } finally {
      pe(!1);
    }
  }, [r, t, n]), qe = E(async () => {
    if (R && b) {
      r.cancelRun(b);
      return;
    }
    _e || Ce();
  }, [R, b, _e, r, Ce]), Ot = E(() => {
    me(!1), Ce(Q);
  }, [Ce, Q]);
  return {
    currentRunId: b,
    setCurrentRunId: w,
    activeError: p,
    setActiveError: u,
    errorNodeAnchor: x,
    handleDismissError: f,
    handleErrorNodePosition: g,
    handleRetryFromError: Ae,
    handleRunClick: qe,
    handleTriggerInputSubmit: Ot,
    isRunActive: R,
    runDisabled: _e,
    runTitle: Fe,
    isTriggering: te,
    triggerInputOpen: we,
    setTriggerInputOpen: me,
    triggerInputValues: Q,
    setTriggerInputValues: J,
    breakpoints: S,
    handleToggleBreakpoint: j,
    handleDebugRunClick: W,
    pausedBreakpoint: P,
    handleBreakpointContinue: ce,
    handleBreakpointStepOver: _,
    handleBreakpointResumeAll: ne,
    handleApplyAndContinue: ye,
    handleRevertPatch: Me,
    applyingPatch: M,
    revertingPatchId: z,
    dirtyPatch: ee,
    dirtyPatchStepId: le,
    handleContextEditBufferChange: U,
    resetEditBufferKey: se,
    sidebarTab: xe,
    setSidebarTab: $e
  };
}
function Rs({
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
const on = {
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-green-50 text-green-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600"
};
function Ps({
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
  onViewVersions: N,
  onRevert: v,
  onToggleShowTags: y,
  showTags: k,
  onViewRunHistory: b,
  onClearRunHistory: w,
  onSimPanelOpen: C,
  onDelete: R
}) {
  const S = Ee(), { rename: A, setIcon: P, setSelectedNodeId: X } = Ye(), [ee, re] = $(!1), [le, de] = $(""), se = oe(null);
  Z(() => {
    ee && (de(r.name ?? ""), setTimeout(() => se.current?.focus(), 0));
  }, [ee, r.name]);
  const F = () => {
    const Q = le.trim();
    Q && Q !== r.name && A(Q), re(!1);
  }, M = r ? eo(r) : null;
  (M?.errors.length ?? 0) > 0;
  const q = r.status === "published", z = n ? { label: "Saving…", variant: "info" } : a ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, O = r.status === "published" ? { label: `v${r.version} · Published`, variant: "success" } : typeof r.publishedVersion == "number" ? { label: `v${r.version} · Draft (pub v${r.publishedVersion})`, variant: "warning" } : { label: `v${r.version} · Draft`, variant: "neutral" }, U = M ? M.errors.length > 0 ? { label: `✗ ${M.errors.length} error${M.errors.length === 1 ? "" : "s"}`, variant: "danger" } : M.warnings.length > 0 ? { label: `⚠ ${M.warnings.length} warning${M.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [j, W] = $(!1), ce = oe(null);
  ut(ce, () => W(!1), j);
  const _ = M ? [...M.errors, ...M.warnings] : [], ne = (Q) => {
    Q && (X(Q), W(!1));
  }, ye = r.nodes.filter((Q) => Q.type !== "trigger").length, Me = l ? Object.values(l.steps).filter(
    (Q) => Q.status === "completed" || Q.status === "skipped"
  ).length : 0, Oe = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), Ae = i && l ? { text: `Running (${Me}/${ye} steps) · ${Oe}s`, variant: "running" } : l?.status === "completed" ? { text: `Completed in ${l.durationMs ? (l.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : l?.status === "failed" ? { text: `Failed at ${Rt(r, l.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, Be = {
    running: "bg-blue-50 text-blue-600",
    success: "bg-green-50 text-green-600",
    error: "bg-red-50 text-red-600"
  }, _e = i ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [Fe, we] = $(!1), me = oe(null);
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
          Qo,
          {
            value: r.icon ?? "🔀",
            onChange: P
          }
        ),
        ee ? /* @__PURE__ */ e(
          "input",
          {
            ref: se,
            value: le,
            onChange: (Q) => de(Q.target.value),
            onBlur: F,
            onKeyDown: (Q) => {
              Q.key === "Enter" && F(), Q.key === "Escape" && (de(r.name), re(!1));
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
            onClick: () => re(!0),
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
              on[z.variant]
            ),
            "data-testid": "save-status",
            children: z.label
          }
        ),
        /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              on[O.variant]
            ),
            "data-testid": "version-badge",
            children: O.label
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", ref: ce, children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => W((Q) => !Q),
              className: I(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
                "cursor-pointer border-none",
                on[U.variant]
              ),
              "data-testid": "validation-indicator",
              children: U.label
            }
          ),
          j && _.length > 0 && /* @__PURE__ */ e(
            "div",
            {
              className: I(
                "absolute top-full mt-1.5 bg-surface border border-border rounded-lg",
                "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"
              ),
              children: _.map((Q, J) => /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => ne(Q.nodeId),
                  className: I(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    Q.nodeId ? "cursor-pointer" : "cursor-default",
                    J < _.length - 1 && "border-b border-border"
                  ),
                  children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: I(
                          "font-bold text-xs",
                          Q.severity === "error" ? "text-red-600" : "text-amber-600"
                        ),
                        children: Q.severity === "error" ? "✗" : "⚠"
                      }
                    ),
                    /* @__PURE__ */ o("span", { className: "flex-1 text-xs", children: [
                      /* @__PURE__ */ e("div", { className: "font-semibold", children: Q.code }),
                      /* @__PURE__ */ e("div", { className: "text-text-secondary", children: Q.message }),
                      Q.nodeId && /* @__PURE__ */ e("div", { className: "mt-0.5 text-[11px] text-primary", children: "Jump to node →" })
                    ] })
                  ]
                },
                `${Q.code}-${J}`
              ))
            }
          )
        ] }),
        Ae.variant !== "none" && /* @__PURE__ */ o(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap",
              Be[Ae.variant]
            ),
            "data-testid": "run-status-indicator",
            children: [
              Ae.variant === "running" && /* @__PURE__ */ e("span", { className: "inline-block w-3 h-3 border-2 border-slate-200 border-t-primary rounded-full animate-spin" }),
              Ae.variant === "success" && "✓ ",
              Ae.variant === "error" && "✗ ",
              Ae.text
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
            title: q ? "Already published at this version" : "Publish pipeline to enable runs",
            disabled: q,
            className: I(
              "px-3 py-1.5 text-[13px] font-semibold border-none rounded-md font-inherit shrink-0",
              q ? "bg-surface-hover text-text-tertiary cursor-default opacity-70" : "bg-green-600 text-white cursor-pointer"
            ),
            "data-testid": "publish-button",
            children: q ? "Published" : "Publish"
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
            ] }) : _e
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
              onClick: () => we((Q) => !Q),
              "aria-label": "More actions",
              "data-testid": "overflow-menu-btn",
              children: "⋯"
            }
          ),
          Fe && /* @__PURE__ */ e(
            Rs,
            {
              isPublished: q,
              showTags: k,
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
const Ms = 12;
function Ie(t) {
  return I("text-xs", {
    string: "text-[#a6e3a1]",
    number: "text-[#fab387]",
    boolean: "text-[#cba6f7]",
    null: "text-[#6c7086]",
    bracket: "text-[#9399b2]"
  }[t]);
}
function Dt({
  data: t,
  depth: r = 0,
  highlightKeys: n,
  keyName: a,
  isHighlighted: i = !1
}) {
  const [s, d] = $(r > 2);
  if (r > Ms)
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
        /* @__PURE__ */ e(Dt, { data: l, depth: r + 1, highlightKeys: n }),
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
            Dt,
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
function Ds({
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
function Es(t) {
  return typeof t == "string" ? "string" : typeof t == "number" ? "number" : typeof t == "boolean" ? "boolean" : "object";
}
function Os({ k: t, initial: r, onCommit: n, onError: a, onFocus: i }) {
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
function _s({
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
      const f = h in r, g = f ? r[h] : t[h], m = Es(g), N = f;
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
                  onChange: (v) => {
                    const y = v.target.value === "" ? 0 : Number(v.target.value);
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
                  onChange: (v) => c(h, v.target.value),
                  onFocus: () => d(h, g),
                  className: x
                }
              ) : /* @__PURE__ */ e(
                Os,
                {
                  k: h,
                  initial: g,
                  onCommit: (v) => c(h, v),
                  onError: (v) => p(h, v),
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
function Ls(t, r, n) {
  const a = { ...t }, i = { ...a.steps ?? {} };
  return i[r] = n, a.steps = i, n && typeof n == "object" && !Array.isArray(n) && Object.assign(a, n), a;
}
function Bs(t, r) {
  const n = [];
  for (const a of Object.keys(r))
    a in t || n.push(a);
  return n;
}
function Fs(t) {
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
      l = Ls(a, i.nodeId, d);
    else {
      l = { ...a };
      const u = {
        ...l.steps ?? {}
      };
      u[i.nodeId] = d, l.steps = u;
    }
    const p = Bs(s, l);
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
function Us(t, r) {
  const [n, a] = $(/* @__PURE__ */ new Map()), [i, s] = $(
    /* @__PURE__ */ new Map()
  ), d = oe(null);
  Z(() => {
    const h = t?.id ?? null;
    h !== d.current && (d.current = h, a(/* @__PURE__ */ new Map()), s(/* @__PURE__ */ new Map()));
  }, [t?.id]);
  const c = E(
    (h) => {
      if (!h || typeof h != "object") return;
      const { eventType: f, payload: g } = h;
      if (!g || typeof g != "object") return;
      const m = g, N = m.runId;
      if (!(!t?.id || N !== t.id)) {
        if (f === "pipeline.llm.prompt") {
          const v = m.stepId, y = m.prompt;
          v && y && a((k) => {
            const b = new Map(k);
            return b.set(v, y), b;
          });
        }
        if (f === "pipeline.run.checkpoint" || f === "pipeline.run.checkpointed" || f === "pipeline:run:checkpoint" || f === "pipeline:run:checkpointed") {
          const v = m.context, y = m.stepId;
          v && y && s((k) => {
            const b = new Map(k);
            return b.set(y, v), b;
          });
        }
      }
    },
    [t?.id]
  );
  Re("*", c);
  const l = V(() => t ? Fs(t) : [], [t]), p = V(() => l.map((h) => {
    const f = n.get(h.stepId), g = i.get(h.stepId);
    return {
      ...h,
      resolvedPrompt: h.resolvedPrompt || f,
      outputContext: g ?? h.outputContext
    };
  }), [l, n, i]), u = V(() => r ? p.find((h) => h.stepId === r) ?? null : p[p.length - 1] ?? null, [p, r]), x = V(() => u ? new Set(u.newKeys) : /* @__PURE__ */ new Set(), [u]);
  return { enrichedSnapshots: p, activeSnapshot: u, newKeysSet: x };
}
function Qn({ attempt: t, label: r }) {
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
      /* @__PURE__ */ e(Dt, { data: t.output, depth: 0 })
    ] })
  ] });
}
function js({
  run: t,
  activeStepId: r,
  onStepSelect: n,
  editable: a = !1,
  onEditBufferChange: i,
  resetEditBufferKey: s
}) {
  const [d, c] = $("input"), [l, p] = $(0), [u, x] = $(!1), [h, f] = $({}), [g, m] = $(null), [N, v] = $({}), [y, k] = $({
    key: "",
    value: ""
  }), { enrichedSnapshots: b, activeSnapshot: w, newKeysSet: C } = Us(t, r), R = w?.resolvedPrompt != null, S = w?.stepExecution.attempts, A = (S?.length ?? 0) >= 2;
  Z(() => {
    d === "prompt" && !R && c("input"), d === "attempts" && !A && c("input");
  }, [d, R, A]), Z(() => {
    p(0);
  }, [r]);
  const P = !!(t && t.status === "paused_at_breakpoint" && r && (t.currentStepIds?.includes(r) || w?.stepExecution.status === "running" || w?.stepExecution.status === "awaiting" || w?.stepExecution.status === "pending")), X = !!a && !!P;
  Z(() => {
    X ? g && g !== r && (f({}), m(null), v({})) : (u && x(!1), Object.keys(h).length > 0 && f({}), g && m(null), Object.keys(N).length > 0 && v({}));
  }, [X, r]), Z(() => {
    s !== void 0 && (f({}), m(null), v({}), k({ key: "", value: "" }));
  }, [s]), Z(() => {
    !X || !r || i && (Object.keys(h).length === 0 ? i(r, null) : i(r, h));
  }, [h, X, r]);
  const ee = E(
    (M, q) => {
      m(r), f((z) => M in z ? z : { ...z, [M]: q });
    },
    [r]
  ), re = E(
    (M, q) => {
      m(r), f((z) => ({ ...z, [M]: q })), v((z) => {
        if (!(M in z)) return z;
        const O = { ...z };
        return delete O[M], O;
      });
    },
    [r]
  ), le = E((M) => {
    f((q) => {
      if (!(M in q)) return q;
      const z = { ...q };
      return delete z[M], z;
    }), v((q) => {
      if (!(M in q)) return q;
      const z = { ...q };
      return delete z[M], z;
    });
  }, []), de = E((M, q) => {
    v((z) => ({ ...z, [M]: q }));
  }, []), se = E(() => {
    f({}), m(null), v({}), k({ key: "", value: "" });
  }, []), F = E(() => {
    const M = y.key.trim();
    if (!M) return;
    let q = y.value;
    const z = y.value;
    if (z.trim().length > 0)
      try {
        q = JSON.parse(z);
      } catch {
        q = z;
      }
    re(M, q), k({ key: "", value: "" });
  }, [y, re]);
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
    ].filter((M) => M.show).map((M) => /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "data-testid": M.id === "attempts" ? "attempts-tab" : void 0,
        className: I(
          "px-3.5 py-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer font-inherit uppercase tracking-wide border-b-2",
          d === M.id ? "text-primary border-b-primary" : "text-text-tertiary border-b-transparent"
        ),
        onClick: () => c(M.id),
        children: M.label
      },
      M.id
    )) }),
    /* @__PURE__ */ o("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
      /* @__PURE__ */ e(
        Ds,
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
          X && /* @__PURE__ */ o("div", { className: "flex gap-1.5 items-center", children: [
            u && Object.keys(h).length > 0 && /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: se,
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
                  const M = !u;
                  x(M), M || se();
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
        Object.keys(w.inputContext).length === 0 && !(X && u) ? /* @__PURE__ */ e("div", { className: "text-[#6c7086] text-xs italic", children: "No input context (first step or no upstream output)" }) : X && u ? /* @__PURE__ */ e(
          _s,
          {
            inputContext: w.inputContext,
            buffer: h,
            parseErrors: N,
            newKeyDraft: y,
            setNewKeyDraft: k,
            onCommitNewKey: F,
            onBeginEditKey: ee,
            onSetValue: re,
            onRemoveKey: le,
            onParseError: de
          }
        ) : /* @__PURE__ */ e(
          Dt,
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
        /* @__PURE__ */ e(Dt, { data: w.output }),
        w.newKeys.length > 0 && /* @__PURE__ */ o("div", { className: "mt-3", children: [
          /* @__PURE__ */ e("div", { className: "text-[10px] text-[#a6e3a1] font-semibold uppercase mb-1", children: "New context keys added" }),
          /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: w.newKeys.map((M) => /* @__PURE__ */ e(
            "span",
            {
              className: "px-1.5 py-0.5 bg-[rgba(166,227,161,0.15)] text-[#a6e3a1] rounded-sm text-[11px] font-semibold font-mono",
              children: M
            },
            M
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
              w.stepExecution.completedAt && /* @__PURE__ */ o(H, { children: [
                /* @__PURE__ */ e("br", {}),
                "Completed: ",
                w.stepExecution.completedAt,
                w.stepExecution.durationMs != null && /* @__PURE__ */ o(H, { children: [
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
              w.stepExecution.llm.firstTokenLatencyMs != null && /* @__PURE__ */ o(H, { children: [
                /* @__PURE__ */ e("br", {}),
                "First token latency: ",
                w.stepExecution.llm.firstTokenLatencyMs,
                "ms"
              ] })
            ] }),
            w.stepExecution.llm.response && /* @__PURE__ */ o(H, { children: [
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
            w.stepExecution.approvals.map((M, q) => /* @__PURE__ */ o("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2", children: [
              /* @__PURE__ */ o("div", { className: "flex gap-2 mb-1", children: [
                /* @__PURE__ */ e("span", { className: I(
                  "px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                  M.decision === "approve" ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
                ), children: M.decision.toUpperCase() }),
                /* @__PURE__ */ e("span", { className: "text-[11px] text-[#cdd6f4]", children: M.userId })
              ] }),
              M.comment && /* @__PURE__ */ o("div", { className: "text-[11px] text-[#9399b2] italic", children: [
                '"',
                M.comment,
                '"'
              ] }),
              /* @__PURE__ */ e("div", { className: "text-[10px] text-[#6c7086] mt-1", children: M.at })
            ] }, q))
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
              onClick: () => p((M) => M - 1),
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
              onClick: () => p((M) => M + 1),
              className: I(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l >= S.length - 2 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "→"
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ e(Qn, { attempt: S[l], label: `Attempt ${l + 1}` }),
          /* @__PURE__ */ e(Qn, { attempt: S[l + 1], label: `Attempt ${l + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ e("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function zs({
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
  const g = ft().runs[r.runId] ?? null, N = g?.steps?.[r.stepId]?.patches ?? [], v = !!i && s === r.stepId && Object.keys(i).length > 0, y = g?.status === "paused_at_breakpoint";
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
            Rt(t, r.stepId)
          ] }),
          v && /* @__PURE__ */ e(
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
                js,
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
                    ) : /* @__PURE__ */ e("div", { className: "flex flex-col gap-2", children: N.map((k) => {
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
                              k.appliedBy && /* @__PURE__ */ o(H, { children: [
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
function qs({ title: t, defaultCollapsed: r = !1, children: n, className: a }) {
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
const Ws = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function Vs(t, r, n) {
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
function Js(t) {
  if (typeof t != "string") return null;
  const r = t.trim().split(/\s+/);
  if (r.length !== 5) return null;
  const n = {};
  for (let a = 0; a < 5; a++) {
    const i = Ws[a], s = Vs(r[a], i.min, i.max);
    if (!s) return null;
    n[i.name] = s;
  }
  return n;
}
function gt(t, r, n) {
  return t.match === "*" ? !t.step || t.step === 1 ? !0 : (r - n) % t.step === 0 : t.match.includes(r);
}
function Hs(t, r) {
  return gt(t.minute, r.getMinutes(), 0) && gt(t.hour, r.getHours(), 0) && gt(t.dayOfMonth, r.getDate(), 1) && gt(t.month, r.getMonth() + 1, 1) && gt(t.dayOfWeek, r.getDay(), 0);
}
function Ks(t, r, n) {
  const a = [], i = new Date(r.getTime());
  i.setSeconds(0, 0), i.setMinutes(i.getMinutes() + 1);
  const s = 1440 * 366, d = new Date(i.getTime());
  for (let c = 0; c < s && a.length < n; c++)
    Hs(t, d) && a.push(new Date(d.getTime())), d.setMinutes(d.getMinutes() + 1);
  return a;
}
const Zn = /^[a-zA-Z0-9_-]{1,64}$/, Gs = "http://localhost:13001";
function Ys() {
  try {
    const t = localStorage.getItem("ws_document_types_v1");
    if (!t) return [];
    const r = JSON.parse(t);
    return Array.isArray(r) ? r.filter((n) => typeof n == "object" && n !== null).filter((n) => typeof n.id == "string" && typeof n.name == "string").map((n) => ({ id: n.id, name: n.name })) : [];
  } catch {
    return [];
  }
}
const Xs = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function Qs({ data: t, onChange: r }) {
  const { toast: n } = Zt(), i = Hr(Co)?.definition?.triggerBinding?.webhookSecret, [s, d] = $(!1), c = t.triggerType.startsWith("document."), l = V(() => c ? Ys() : [], [c]), p = c && !t.documentTypeId, u = t.triggerType === "schedule" && !t.schedule, x = t.triggerType === "webhook" && !t.webhookPath, h = t.webhookPath ?? "", f = t.triggerType === "webhook" && h.length > 0 && !Zn.test(h), g = t.triggerType === "webhook" && Zn.test(h) ? `${Gs}/hooks/pipeline/${h}` : null, m = () => {
    g && navigator.clipboard.writeText(g).then(() => n("Webhook URL copied", { type: "success" })).catch(() => n("Could not copy webhook URL", { type: "error" }));
  }, N = () => {
    i && navigator.clipboard.writeText(i).then(() => n("Webhook secret copied", { type: "success" })).catch(() => n("Could not copy webhook secret", { type: "error" }));
  }, v = t.triggerType === "schedule" ? t.schedule ?? "" : "", y = V(
    () => v ? Js(v) : null,
    [v]
  ), k = V(() => y ? Ks(y, /* @__PURE__ */ new Date(), 3) : [], [y]), b = t.triggerType === "schedule" && !!v && !y, w = t.triggerType === "document.finalize" ? "On finalize" : t.triggerType === "document.submit" ? "On submit for review" : t.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ e(be, { label: "Trigger type", required: !0, children: /* @__PURE__ */ e(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: t.triggerType,
        onChange: (C) => r({ triggerType: C.target.value }),
        children: Xs.map((C) => /* @__PURE__ */ e("option", { value: C.value, children: C.label }, C.value))
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
          /* @__PURE__ */ e("div", { className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono", children: k.length > 0 ? /* @__PURE__ */ o(H, { children: [
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
      /* @__PURE__ */ e("div", { className: "p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: g ? /* @__PURE__ */ o(H, { children: [
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
        /* @__PURE__ */ e("div", { className: "mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: i ? /* @__PURE__ */ o(H, { children: [
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
const er = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, Zs = 3e4;
function el(t) {
  return t < 1e3 ? `${Math.round(t)}ms` : t < 6e4 ? `${(t / 1e3).toFixed(t < 1e4 ? 1 : 0)}s` : `${Math.round(t / 6e4)}m`;
}
function tl(t) {
  const r = [];
  for (let n = 1; n < t.maxAttempts; n++) {
    const a = t.backoffMs * Math.pow(t.backoffMultiplier, n - 1);
    r.push(Math.min(a, Zs));
  }
  return r;
}
function Ln({ value: t, onChange: r }) {
  const n = t !== void 0, a = t ?? er, i = n ? tl(a) : [], d = i.reduce((c, l) => c + l, 0) > 300 * 1e3;
  return /* @__PURE__ */ o("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ o("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "checkbox",
          checked: n,
          onChange: (c) => r(c.target.checked ? er : void 0),
          "aria-label": "Enable retries"
        }
      ),
      "Retry policy"
    ] }),
    !n && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", children: "No retries — failure is terminal on first attempt." }),
    n && /* @__PURE__ */ o(H, { children: [
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
      /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: a.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : i.length === 0 ? `Retries up to ${a.maxAttempts}× with no delay.` : `Retries up to ${a.maxAttempts}× with delays: ${i.map(el).join(", ")}.` }),
      d && /* @__PURE__ */ e("div", { className: "text-[11px] text-[#ca8a04] mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const tr = {
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
}, nl = [
  "context.doc.body",
  "context.doc.title",
  "context.trigger.userId",
  "context.steps"
], no = {
  "context.doc.body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "context.doc.title": "Sample Document Title",
  "context.trigger.userId": "user_abc123",
  "context.steps": '["step-1: fetched document", "step-2: validated schema"]'
};
function nr(t) {
  return t.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (r, n) => no[n] ?? `{{${n}}}`);
}
function rl({ data: t, onChange: r }) {
  const [n, a] = $(!1), i = !t.systemPrompt?.trim(), s = !t.userPromptTemplate?.trim(), d = (c) => {
    const l = tr[c], p = l.includes(t.model) ? t.model : l[0];
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
        children: tr[t.provider].map((c) => /* @__PURE__ */ e("option", { value: c, children: c }, c))
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
          Dn,
          {
            value: t.userPromptTemplate,
            onChange: (c) => r({ userPromptTemplate: c }),
            language: "template",
            variables: nl,
            minLines: 6,
            "aria-label": "User prompt template"
          }
        )
      }
    ),
    /* @__PURE__ */ o(qs, { title: "Advanced", defaultCollapsed: !0, children: [
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
        Ln,
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
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: nr(t.systemPrompt || "(empty)") })
      ] }),
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ e("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: nr(t.userPromptTemplate || "(empty)") })
      ] }),
      /* @__PURE__ */ o("div", { className: "text-[11px] text-text-tertiary", children: [
        "Sample values: ",
        Object.keys(no).map((c) => `{{${c}}}`).join(", ")
      ] })
    ] })
  ] });
}
const ol = ["context", "context.steps", "context.trigger"], al = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function il({ data: t, onChange: r }) {
  const n = !t.expression?.trim();
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ e(be, { label: "Type", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: al.map((a) => /* @__PURE__ */ o(
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
          Dn,
          {
            value: t.expression,
            onChange: (a) => r({ expression: a }),
            language: t.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: ol,
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
      Ln,
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
const sl = ["context.trigger", "context.steps"];
function ll({ data: t, onChange: r }) {
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
          Dn,
          {
            value: t.expression,
            onChange: (a) => r({ expression: a }),
            language: "javascript",
            variables: sl,
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
const cl = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], dl = {
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
function pl({ data: t, onChange: r }) {
  const n = dl[t.actionType], a = t.config ?? {}, i = typeof a.retryCount == "number" ? a.retryCount : 3, s = t.onError === "route-error" ? "route-error" : typeof a.retryCount == "number" ? "retry" : "halt", d = (l, p) => {
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
        children: cl.map((l) => /* @__PURE__ */ e("option", { value: l.value, children: l.label }, l.value))
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
      Ln,
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
function rr(t, r) {
  const n = t ?? [];
  return n.length === r ? n : n.length > r ? n.slice(0, r) : [...n, ...Array(r - n.length).fill("")];
}
function ul({ data: t, onChange: r }) {
  const n = Math.max(Qe, Math.min(bt, t.branchCount || Qe)), a = rr(t.branchLabels, n), i = (d) => {
    const c = Math.max(Qe, Math.min(bt, d));
    r({
      branchCount: c,
      branchLabels: rr(t.branchLabels, c)
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
const ml = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], hl = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function fl({ data: t, onChange: r }) {
  return /* @__PURE__ */ o(Xe, { children: [
    /* @__PURE__ */ o(be, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: ml.map((n) => /* @__PURE__ */ o(
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
    /* @__PURE__ */ e(be, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: hl.map((n) => /* @__PURE__ */ o(
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
const Pt = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5
};
function xl(t) {
  return !t || t <= 0 ? "minutes" : t % Pt.hours === 0 ? "hours" : t % Pt.minutes === 0 ? "minutes" : "seconds";
}
function gl({ data: t, onChange: r }) {
  const n = t.approvers ?? [], a = n.length === 0, [i, s] = $(() => xl(t.timeoutMs)), d = t.timeoutMs !== void 0 ? Math.round(t.timeoutMs / Pt[i]) : "", c = n.filter((f) => f.type === "user").map((f) => f.value), l = (f) => {
    const g = n.filter((v) => v.type === "role"), N = [...f.map((v) => ({ type: "user", value: v })), ...g];
    r({
      approvers: N,
      // Clamp requiredCount so it never exceeds approvers.length (min 1).
      requiredCount: Math.max(1, Math.min(t.requiredCount || 1, N.length || 1))
    });
  }, p = (f) => {
    const g = n.filter((m, N) => N !== f);
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
    r({ timeoutMs: g * Pt[i] });
  }, x = (f) => {
    s(f), typeof d == "number" && !Number.isNaN(d) && r({ timeoutMs: d * Pt[f] });
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
            oa,
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
function In(t) {
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
function ro(t) {
  const r = Array.isArray(t.type) ? t.type[0] : t.type;
  if (r === "array") {
    const n = t.items ? Array.isArray(t.items.type) ? t.items.type[0] : t.items.type : void 0;
    return n ? `array of ${n}` : "array";
  }
  return r ?? "unknown";
}
function Mt(t, r, n, a, i) {
  if (i.has(t)) return;
  i.add(t);
  const s = Array.isArray(t.type) ? t.type[0] : t.type, d = [t.anyOf, t.oneOf, t.allOf].filter(Boolean);
  for (const c of d)
    for (const l of c)
      Mt(l, r, n, a, i);
  if (s === "object" && t.properties) {
    for (const [c, l] of Object.entries(t.properties)) {
      const p = `${r}.${c}`, u = In(l);
      a.push({
        path: p,
        label: `${c} (${ro(l)})`,
        depth: n,
        kind: u,
        isArrayItems: u === "array"
      }), Mt(l, p, n + 1, a, i);
    }
    return;
  }
  if (s === "array") {
    const c = `${r}[*]`, l = t.items, p = l ? In(l) : "unknown";
    a.push({
      path: c,
      label: `${r.slice(r.lastIndexOf(".") + 1)}[*] (each item)`,
      depth: n,
      kind: p,
      isArrayItems: !0
    }), l && Mt(l, c, n + 1, a, i);
  }
}
function bl(t, r = "$") {
  if (!t || typeof t != "object") return [];
  const n = [], a = /* @__PURE__ */ new Set();
  if ((Array.isArray(t.type) ? t.type[0] : t.type) === "object" && t.properties)
    for (const [s, d] of Object.entries(t.properties)) {
      const c = `${r}.${s}`, l = In(d);
      n.push({
        path: c,
        label: `${s} (${ro(d)})`,
        depth: 0,
        kind: l,
        isArrayItems: l === "array"
      }), Mt(d, c, 1, n, a);
    }
  else
    Mt(t, r, 0, n, a);
  return n;
}
const yl = {};
function vl() {
  return `${(typeof import.meta < "u" && yl?.VITE_SOCIAL_API_URL) ?? ""}/api/pipeline/output-schemas`;
}
let an = null, yt = null;
async function Nl() {
  return an || (yt || (yt = fetch(vl()).then((t) => {
    if (!t.ok) throw new Error(`HTTP ${t.status}`);
    return t.json();
  }).then((t) => (an = t, yt = null, t)).catch((t) => {
    throw yt = null, t;
  })), yt);
}
const wl = {
  array: "bg-indigo-50 text-indigo-700 border-indigo-200",
  object: "bg-slate-50 text-slate-600 border-slate-200",
  string: "bg-emerald-50 text-emerald-700 border-emerald-200",
  number: "bg-amber-50 text-amber-700 border-amber-200",
  boolean: "bg-pink-50 text-pink-700 border-pink-200",
  unknown: "bg-slate-50 text-slate-400 border-slate-200"
};
function kl({ kind: t }) {
  return /* @__PURE__ */ e(
    "span",
    {
      className: I(
        "inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4",
        wl[t]
      ),
      children: t
    }
  );
}
function Cl({ entry: t, isSelected: r, onPick: n }) {
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
        /* @__PURE__ */ e(kl, { kind: t.kind })
      ]
    }
  );
}
function Il({
  value: t,
  onChange: r,
  upstreamKind: n,
  upstreamSchema: a
}) {
  const [i, s] = $("idle"), [d, c] = $(null), l = oe(!0);
  Z(() => (l.current = !0, () => {
    l.current = !1;
  }), []);
  const p = V(() => a !== void 0 ? a : d, [a, d]);
  Z(() => {
    !n || a !== void 0 || (s("loading"), Nl().then((m) => {
      if (!l.current) return;
      const N = m.schemas[n] ?? null;
      c(N), s("done");
    }).catch(() => {
      l.current && s("error");
    }));
  }, [n, a]);
  const u = V(
    () => bl(p),
    [p]
  ), x = p !== null && u.length > 0, h = E(
    (m) => {
      r(m);
    },
    [r]
  );
  if (!n && a === void 0)
    return /* @__PURE__ */ e(
      en,
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
        en,
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
      g && /* @__PURE__ */ o(H, { children: [
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
          Cl,
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
      en,
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
const sn = "text-[12px] font-semibold text-text-secondary", ln = "text-[11px] text-text-tertiary mt-0.5", Sl = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary";
function $l(t) {
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
function Tl({ data: t, onChange: r }) {
  const { selectedNodeId: n } = Ye(), a = $l(n), i = t.maxConcurrency ?? "";
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { className: sn, children: [
        "Items path",
        /* @__PURE__ */ e("span", { className: "text-red-600 ml-1", "aria-hidden": !0, children: "*" })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-1", children: /* @__PURE__ */ e(
        Il,
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
      !!t.itemsPath?.startsWith("$.") && /* @__PURE__ */ e("div", { className: ln, children: "JSONPath into context resolving to an array. Each element becomes one scatter arm." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-item-alias", className: sn, children: [
        "Item alias ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional, default: item)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "scatter-item-alias",
          type: "text",
          spellCheck: !1,
          className: Sl,
          value: t.itemAlias ?? "",
          onChange: (s) => r({ itemAlias: s.target.value.trim() || void 0 }),
          placeholder: "item"
        }
      ),
      /* @__PURE__ */ o("div", { className: ln, children: [
        "Key written to ",
        /* @__PURE__ */ e("code", { children: "$.scatter.<alias>" }),
        " for each arm."
      ] })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "scatter-max-concurrency", className: sn, children: [
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
      /* @__PURE__ */ e("div", { className: ln, children: "Maximum number of arms executing concurrently." })
    ] })
  ] });
}
const Al = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Rl({ samples: t, onSelect: r }) {
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
const Pl = ["cover", "contain", "fill", "inside", "outside"], vt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", Nt = "text-[12px] font-semibold text-text-secondary", or = "text-[11px] text-text-tertiary mt-0.5";
function Ml({ data: t, onChange: r }) {
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
      /* @__PURE__ */ e(Rl, { samples: Al, onSelect: (n) => r({ sourceImagePath: n }) })
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
          children: Pl.map((n) => /* @__PURE__ */ e("option", { value: n, children: n }, n))
        }
      ),
      /* @__PURE__ */ o("div", { className: or, children: [
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
      /* @__PURE__ */ o("div", { className: or, children: [
        "Hex colour used to fill letterbox padding. Only applies when fit is ",
        /* @__PURE__ */ e("code", { children: "contain" }),
        " or ",
        /* @__PURE__ */ e("code", { children: "fill" }),
        "."
      ] })
    ] })
  ] });
}
const Dl = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function El({ samples: t, onSelect: r }) {
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
function Ol(t) {
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
const Sn = "text-[12px] rounded border border-border bg-white px-2 py-1 font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary", _l = "flex-1 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", ar = "text-[12px] font-semibold text-text-secondary", Ll = "text-[11px] text-text-tertiary mt-0.5";
function Bl({ op: t, index: r, onUpdate: n, onRemove: a }) {
  return /* @__PURE__ */ o("div", { className: "border border-border rounded-md p-2.5 bg-surface-inset flex flex-col gap-2", "data-testid": `geo-op-card-${r}`, children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ o("span", { className: "text-[11px] text-text-tertiary font-semibold min-w-[20px]", children: [
        r + 1,
        "."
      ] }),
      /* @__PURE__ */ o(
        "select",
        {
          className: _l,
          value: t.op,
          onChange: (i) => n(Ol(i.target.value)),
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
    t.op === "rotate" && /* @__PURE__ */ o(H, { children: [
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e("label", { className: "text-[11px] text-text-tertiary min-w-[60px]", children: "Degrees" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "number",
            min: -360,
            max: 360,
            step: 90,
            className: `${Sn} w-24`,
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
            className: `${Sn} flex-1`,
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
function Fl({ data: t, onChange: r }) {
  const n = t.operations ?? [], a = (d, c) => {
    r({ operations: n.map((l, p) => p === d ? c : l) });
  }, i = (d) => {
    r({ operations: n.filter((c, l) => l !== d) });
  }, s = () => {
    r({ operations: [...n, { op: "rotate", degrees: 90 }] });
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "transform-geo-source-image-path", className: ar, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "transform-geo-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `mt-1 w-full ${Sn}`,
          value: t.sourceImagePath ?? "",
          onChange: (d) => r({ sourceImagePath: d.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(El, { samples: Dl, onSelect: (d) => r({ sourceImagePath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${ar} mb-2`, children: [
        "Operations ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      n.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-2 italic", children: "No operations — add at least one." }),
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: n.map((d, c) => /* @__PURE__ */ e(
        Bl,
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
      /* @__PURE__ */ e("div", { className: `${Ll} mt-1.5`, children: "Supported: Rotate (any angle), Flip (top-to-bottom mirror), Flop (left-to-right mirror)." })
    ] })
  ] });
}
const Ul = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function jl({ samples: t, onSelect: r }) {
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
const zl = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "avif", label: "AVIF" }
], $n = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", ql = `${$n} font-mono`, cn = "text-[12px] font-semibold text-text-secondary", dn = "text-[11px] text-text-tertiary mt-0.5";
function Wl({ data: t, onChange: r }) {
  const n = t.format === "jpeg" || t.format === "webp" || t.format === "avif";
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-source-image-path", className: cn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "format-convert-source-image-path",
          type: "text",
          spellCheck: !1,
          className: ql,
          value: t.sourceImagePath ?? "",
          onChange: (a) => r({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(jl, { samples: Ul, onSelect: (a) => r({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "format-convert-format", className: cn, children: "Output format" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "format-convert-format",
          className: $n,
          value: t.format ?? "jpeg",
          onChange: (a) => r({ format: a.target.value }),
          children: zl.map((a) => /* @__PURE__ */ e("option", { value: a.value, children: a.label }, a.value))
        }
      )
    ] }),
    n && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "format-convert-quality", className: cn, children: [
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
          className: $n,
          value: t.quality ?? 80,
          onChange: (a) => {
            const i = parseInt(a.target.value, 10);
            r({ quality: Number.isFinite(i) ? Math.min(100, Math.max(1, i)) : 80 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: dn, children: "Higher = better quality, larger file. 80 is a good default." })
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
      /* @__PURE__ */ e("div", { className: dn, children: "Overrides quality when enabled. Produces larger files with no compression artefacts." })
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
      /* @__PURE__ */ e("div", { className: dn, children: "Removes camera EXIF, GPS, copyright tags etc. Reduces file size; recommended for web delivery." })
    ] })
  ] });
}
const Vl = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Jl({ samples: t, onSelect: r }) {
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
const Lt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Bt = "text-[12px] font-semibold text-text-secondary", pn = "text-[11px] text-text-tertiary mt-0.5";
function Hl({ data: t, onChange: r }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-source-image-path", className: Bt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "sharpen-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `${Lt} font-mono`,
          value: t.sourceImagePath ?? "",
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Jl, { samples: Vl, onSelect: (n) => r({ sourceImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-sigma", className: Bt, children: [
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
          className: Lt,
          value: t.sigma ?? "",
          onChange: (n) => {
            const a = parseFloat(n.target.value);
            r({ sigma: Number.isFinite(a) && a > 0 ? a : void 0 });
          },
          placeholder: "1"
        }
      ),
      /* @__PURE__ */ e("div", { className: pn, children: "Gaussian mask sigma. Higher = broader/stronger sharpening. Typical range: 0.5–3." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-m1", className: Bt, children: [
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
          className: Lt,
          value: t.m1 ?? "",
          onChange: (n) => {
            const a = parseFloat(n.target.value);
            r({ m1: Number.isFinite(a) && a >= 0 ? a : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: pn, children: "Level of sharpening applied to flat (smooth) areas of the image." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "sharpen-m2", className: Bt, children: [
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
          className: Lt,
          value: t.m2 ?? "",
          onChange: (n) => {
            const a = parseFloat(n.target.value);
            r({ m2: Number.isFinite(a) && a >= 0 ? a : void 0 });
          },
          placeholder: "leave blank for default"
        }
      ),
      /* @__PURE__ */ e("div", { className: pn, children: "Level of sharpening applied to jagged (edge) areas of the image." })
    ] })
  ] });
}
const Kl = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function Gl({ samples: t, onSelect: r }) {
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
const Yl = [
  "northwest",
  "north",
  "northeast",
  "west",
  "center",
  "east",
  "southwest",
  "south",
  "southeast"
], It = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", ir = `${It} font-mono`, ot = "text-[12px] font-semibold text-text-secondary", sr = "text-[11px] text-text-tertiary mt-0.5";
function Xl({ data: t, onChange: r }) {
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
          className: ir,
          value: t.sourceImagePath ?? "",
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Gl, { samples: Kl, onSelect: (n) => r({ sourceImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "watermark-overlay-image-id", className: ot, children: "Overlay image ID" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "watermark-overlay-image-id",
          type: "text",
          spellCheck: !1,
          className: ir,
          value: t.overlayImageId ?? "",
          onChange: (n) => r({ overlayImageId: n.target.value.trim() }),
          placeholder: "img_xxxxxxxx"
        }
      ),
      /* @__PURE__ */ e("div", { className: sr, children: "The imageId of the watermark/overlay image already stored in the blob store. Required." })
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
          children: Yl.map((n) => /* @__PURE__ */ e("option", { value: n, children: n }, n))
        }
      ),
      /* @__PURE__ */ e("div", { className: sr, children: "Where the overlay is placed on the source image. Default: southeast." })
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
const Ql = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
], Zl = [
  "$.scatter.item.bbox",
  "$.steps.visionAnalyze.output.extracted.regions[0].bbox",
  "$.trigger.payload.bbox"
];
function lr({ samples: t, onSelect: r }) {
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
const cr = "mt-1 w-full text-[12px] font-mono rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", dr = "text-[12px] font-semibold text-text-secondary", un = "text-[11px] text-text-tertiary mt-0.5";
function ec({ data: t, onChange: r }) {
  const n = t.materialize !== !1;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-source-image-path", className: dr, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "crop-source-image-path",
          type: "text",
          spellCheck: !1,
          className: cr,
          value: t.sourceImagePath ?? "",
          onChange: (a) => r({ sourceImagePath: a.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ o("div", { className: un, children: [
        "JSONPath to the imageId of the source image. Defaults server-side to",
        " ",
        /* @__PURE__ */ e("code", { children: "$.scatter.parentImageId" }),
        "."
      ] }),
      /* @__PURE__ */ e(lr, { samples: Ql, onSelect: (a) => r({ sourceImagePath: a }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "crop-bbox-path", className: dr, children: [
        "Bounding-box path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "crop-bbox-path",
          type: "text",
          spellCheck: !1,
          className: cr,
          value: t.bboxPath ?? "",
          onChange: (a) => r({ bboxPath: a.target.value.trim() || void 0 }),
          placeholder: "$.scatter.item.bbox"
        }
      ),
      /* @__PURE__ */ o("div", { className: un, children: [
        "JSONPath to a bbox object ",
        /* @__PURE__ */ e("code", { children: "{ x, y, width, height }" }),
        " in pixels."
      ] }),
      /* @__PURE__ */ e(lr, { samples: Zl, onSelect: (a) => r({ bboxPath: a }) })
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
    /* @__PURE__ */ e("div", { className: un, children: "When enabled (default), the cropped image is saved to the ImageBlobStore." })
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
const pr = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", mn = "text-[12px] font-semibold text-text-secondary", hn = "text-[11px] text-text-tertiary mt-0.5";
function rc({ data: t, onChange: r }) {
  const n = t.algorithm ?? "luminosity", a = t.contrast ?? 1;
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-bw-source-image-path", className: mn, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "adjust-bw-source-image-path",
          type: "text",
          spellCheck: !1,
          className: `${pr} font-mono`,
          value: t.sourceImagePath ?? "",
          onChange: (i) => r({ sourceImagePath: i.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: hn, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(nc, { samples: tc, onSelect: (i) => r({ sourceImagePath: i }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "adjust-bw-algorithm", className: mn, children: "Greyscale algorithm" }),
      /* @__PURE__ */ o(
        "select",
        {
          id: "adjust-bw-algorithm",
          className: pr,
          value: n,
          onChange: (i) => r({ algorithm: i.target.value }),
          children: [
            /* @__PURE__ */ e("option", { value: "luminosity", children: "Luminosity — 0.21R + 0.72G + 0.07B (perceptually accurate)" }),
            /* @__PURE__ */ e("option", { value: "average", children: "Average — (R+G+B)/3 (fast, flat)" }),
            /* @__PURE__ */ e("option", { value: "desaturate", children: "Desaturate — (max+min)/2 (Lightness channel)" })
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: hn, children: "Controls how RGB channels are weighted when converting to greyscale." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-bw-contrast", className: mn, children: [
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
      /* @__PURE__ */ o("div", { className: hn, children: [
        "Applied after greyscale conversion. 1 = no change, ",
        "<",
        "1 = lower contrast,",
        " >",
        "1 = higher contrast. Range 0–4."
      ] })
    ] })
  ] });
}
const oc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function ac({ samples: t, onSelect: r }) {
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
const ur = {
  brightness: "Brightness",
  contrast: "Contrast",
  saturation: "Saturation",
  hue: "Hue",
  blur: "Blur"
};
function oo(t) {
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
const Ft = "text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary";
function ic({ layer: t, index: r, onUpdate: n, onRemove: a }) {
  const i = (c) => {
    const l = c.target.value;
    n(oo(l));
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
          className: `${Ft} w-24`,
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
          className: `${Ft} w-24`,
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
          className: `${Ft} w-24`,
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
          className: `${Ft} flex-1`,
          value: t.kind,
          onChange: i,
          "aria-label": `Layer ${r + 1} kind`,
          children: Object.keys(ur).map((c) => /* @__PURE__ */ e("option", { value: c, children: ur[c] }, c))
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
const mr = "text-[12px] font-semibold text-text-secondary", sc = "text-[11px] text-text-tertiary mt-0.5";
function lc({ data: t, onChange: r }) {
  const n = t.layers ?? [], a = (d, c) => {
    const l = n.map((p, u) => u === d ? c : p);
    r({ layers: l });
  }, i = (d) => {
    r({ layers: n.filter((c, l) => l !== d) });
  }, s = () => {
    r({ layers: [...n, oo("brightness")] });
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "adjust-layer-source-image-path", className: mr, children: [
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
      /* @__PURE__ */ e("div", { className: sc, children: "JSONPath to the imageId of the source image." }),
      /* @__PURE__ */ e(ac, { samples: oc, onSelect: (d) => r({ sourceImagePath: d }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("div", { className: `${mr} mb-2`, children: [
        "Adjustment layers ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(applied top-to-bottom)" })
      ] }),
      n.length === 0 && /* @__PURE__ */ e("div", { className: "text-[11px] text-text-tertiary mb-2 italic", children: "No layers configured — add at least one." }),
      /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5", children: n.map((d, c) => /* @__PURE__ */ e(
        ic,
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
const hr = 50;
function cc(t, r) {
  const [n, a] = $(t), [i, s] = $([]), [d, c] = $([]), l = oe(n);
  l.current = n;
  const p = E(
    (v) => {
      a((y) => {
        const k = v(y);
        return s((b) => {
          const w = [...b, y];
          return w.length > hr && w.shift(), w;
        }), c([]), r(k), k;
      });
    },
    [r]
  ), u = E(
    (v) => {
      p((y) => [...y, v]);
    },
    [p]
  ), x = E(
    (v, y, k) => {
      p(
        (b) => b.map((w) => w.id === v ? { ...w, x: y, y: k } : w)
      );
    },
    [p]
  ), h = E(
    (v, y, k, b, w) => {
      p(
        (C) => C.map((R) => R.id === v ? { ...R, x: y, y: k, width: b, height: w } : R)
      );
    },
    [p]
  ), f = E(
    (v, y) => {
      p(
        (k) => k.map((b) => b.id === v ? { ...b, label: y } : b)
      );
    },
    [p]
  ), g = E(
    (v) => {
      p((y) => y.filter((k) => k.id !== v));
    },
    [p]
  ), m = E(() => {
    s((v) => {
      if (v.length === 0) return v;
      const y = v[v.length - 1];
      c((b) => [...b, l.current]);
      const k = y;
      return a(k), r(k), v.slice(0, -1);
    });
  }, [r]), N = E(() => {
    c((v) => {
      if (v.length === 0) return v;
      const y = v[v.length - 1];
      s((b) => {
        const w = [...b, l.current];
        return w.length > hr && w.shift(), w;
      });
      const k = y;
      return a(k), r(k), v.slice(0, -1);
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
    redo: N,
    canUndo: i.length > 0,
    canRedo: d.length > 0
  };
}
function dc() {
  return typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bbox-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Ne(t, r, n) {
  return Math.max(r, Math.min(n, t));
}
function fn(t, r) {
  const n = r.getBoundingClientRect();
  return {
    x: Ne(t.clientX - n.left, 0, n.width),
    y: Ne(t.clientY - n.top, 0, n.height)
  };
}
function xn(t, r, n, a, i, s) {
  const d = i / n, c = s / a;
  return { x: t * d, y: r * c };
}
function fr(t, r, n) {
  return {
    left: `${t.x / r * 100}%`,
    top: `${t.y / n * 100}%`,
    width: `${t.width / r * 100}%`,
    height: `${t.height / n * 100}%`
  };
}
function pc(t, r, n) {
  for (let a = n.length - 1; a >= 0; a--) {
    const i = n[a];
    if (t >= i.x && t <= i.x + i.width && r >= i.y && r <= i.y + i.height)
      return i;
  }
  return null;
}
function uc({
  imageUrl: t,
  imageWidth: r,
  imageHeight: n,
  boxes: a,
  onChange: i,
  readOnly: s = !1,
  className: d
}) {
  const c = oe(null), [l, p] = $({ kind: "idle" }), [u, x] = $(null), h = oe(null), { addBox: f, moveBox: g, resizeBox: m, setLabel: N, deleteBox: v } = cc(
    a,
    i
  );
  Z(() => {
    u && h.current && (h.current.focus(), h.current.select());
  }, [u]);
  const y = E(
    (F) => {
      if (s || F.button !== 0) return;
      const M = c.current;
      if (!M) return;
      F.preventDefault(), M.setPointerCapture(F.pointerId);
      const { x: q, y: z } = fn(F, M), O = M.getBoundingClientRect(), { x: U, y: j } = xn(
        q,
        z,
        O.width,
        O.height,
        r,
        n
      ), W = pc(U, j, a);
      p(W ? {
        kind: "move",
        id: W.id,
        offsetX: U - W.x,
        offsetY: j - W.y,
        currentX: U,
        currentY: j
      } : { kind: "create", startX: U, startY: j, currentX: U, currentY: j });
    },
    [s, a, r, n]
  ), k = E(
    (F, M, q) => {
      if (s) return;
      F.stopPropagation(), F.preventDefault();
      const z = c.current;
      if (!z) return;
      z.setPointerCapture(F.pointerId);
      const { x: O, y: U } = fn(F, z), j = z.getBoundingClientRect(), { x: W, y: ce } = xn(O, U, j.width, j.height, r, n);
      p({ kind: "resize", id: M.id, corner: q, origBox: { ...M }, currentX: W, currentY: ce });
    },
    [s, r, n]
  ), b = E(
    (F) => {
      if (l.kind === "idle") return;
      const M = c.current;
      if (!M) return;
      const { x: q, y: z } = fn(F, M), O = M.getBoundingClientRect(), { x: U, y: j } = xn(q, z, O.width, O.height, r, n);
      l.kind === "create" ? p((W) => W.kind === "create" ? { ...W, currentX: U, currentY: j } : W) : l.kind === "move" ? p((W) => W.kind === "move" ? { ...W, currentX: U, currentY: j } : W) : l.kind === "resize" && p((W) => W.kind === "resize" ? { ...W, currentX: U, currentY: j } : W);
    },
    [l.kind, r, n]
  ), w = E(
    (F) => {
      if (l.kind === "create") {
        const M = Math.min(l.startX, l.currentX), q = Math.min(l.startY, l.currentY), z = Math.max(l.startX, l.currentX), O = Math.max(l.startY, l.currentY), U = z - M, j = O - q;
        U >= 4 && j >= 4 && f({ id: dc(), x: M, y: q, width: U, height: j });
      } else if (l.kind === "move") {
        const M = a.find((q) => q.id === l.id);
        if (M) {
          const q = Ne(l.currentX - l.offsetX, 0, r - M.width), z = Ne(l.currentY - l.offsetY, 0, n - M.height);
          g(l.id, q, z);
        }
      } else if (l.kind === "resize") {
        const { id: M, corner: q, origBox: z, currentX: O, currentY: U } = l;
        let { x: j, y: W, width: ce, height: _ } = z;
        if (q === "nw") {
          const ne = Ne(O, 0, j + ce - 4), ye = Ne(U, 0, W + _ - 4);
          ce = j + ce - ne, _ = W + _ - ye, j = ne, W = ye;
        } else if (q === "ne") {
          const ne = Ne(U, 0, W + _ - 4);
          ce = Ne(O - j, 4, r - j), _ = W + _ - ne, W = ne;
        } else if (q === "sw") {
          const ne = Ne(O, 0, j + ce - 4);
          ce = j + ce - ne, _ = Ne(U - W, 4, n - W), j = ne;
        } else
          ce = Ne(O - j, 4, r - j), _ = Ne(U - W, 4, n - W);
        m(M, j, W, ce, _);
      }
      p({ kind: "idle" });
    },
    [l, a, f, g, m, r, n]
  ), C = E(
    (F, M) => {
      s || (F.preventDefault(), v(M));
    },
    [s, v]
  ), R = E(
    (F, M) => {
      s || (F.key === "Delete" || F.key === "Backspace") && (F.preventDefault(), v(M));
    },
    [s, v]
  ), S = E(
    (F, M) => {
      s || (F.stopPropagation(), x({ id: M.id, value: M.label ?? "" }));
    },
    [s]
  ), A = E(() => {
    u && (N(u.id, u.value), x(null));
  }, [u, N]);
  let P = null;
  if (l.kind === "create") {
    const F = Math.min(l.startX, l.currentX), M = Math.min(l.startY, l.currentY), q = Math.max(l.startX, l.currentX), z = Math.max(l.startY, l.currentY);
    q - F >= 2 && z - M >= 2 && (P = { x: F, y: M, width: q - F, height: z - M });
  }
  let X = null;
  if (l.kind === "move") {
    const F = a.find((M) => M.id === l.id);
    if (F) {
      const M = Ne(l.currentX - l.offsetX, 0, r - F.width), q = Ne(l.currentY - l.offsetY, 0, n - F.height);
      X = { ...F, x: M, y: q };
    }
  }
  let ee = null;
  if (l.kind === "resize") {
    const { corner: F, origBox: M, currentX: q, currentY: z } = l;
    let { x: O, y: U, width: j, height: W } = M;
    if (F === "nw") {
      const ce = Ne(q, 0, O + j - 4), _ = Ne(z, 0, U + W - 4);
      j = O + j - ce, W = U + W - _, O = ce, U = _;
    } else if (F === "ne") {
      const ce = Ne(z, 0, U + W - 4);
      j = Ne(q - O, 4, r - O), W = U + W - ce, U = ce;
    } else if (F === "sw") {
      const ce = Ne(q, 0, O + j - 4);
      j = O + j - ce, W = Ne(z - U, 4, n - U), O = ce;
    } else
      j = Ne(q - O, 4, r - O), W = Ne(z - U, 4, n - U);
    ee = { ...M, x: O, y: U, width: j, height: W };
  }
  const re = /* @__PURE__ */ new Set();
  l.kind === "move" && re.add(l.id), l.kind === "resize" && re.add(l.id);
  const le = (F, M) => {
    const q = {
      nw: "-top-1.5 -left-1.5 cursor-nw-resize",
      ne: "-top-1.5 -right-1.5 cursor-ne-resize",
      sw: "-bottom-1.5 -left-1.5 cursor-sw-resize",
      se: "-bottom-1.5 -right-1.5 cursor-se-resize"
    };
    return /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        "aria-label": `Resize ${M}`,
        className: I(
          "absolute h-3 w-3 rounded-sm border border-primary bg-white shadow",
          q[M]
        ),
        onPointerDown: (z) => k(z, F, M)
      },
      M
    );
  }, de = (F, M, q, z) => {
    const O = fr(F, r, n), U = u?.id === F.id;
    return /* @__PURE__ */ o(
      "div",
      {
        role: "none",
        "aria-label": `Bounding box${F.label ? ": " + F.label : ""}`,
        className: I(
          "absolute",
          M ? "opacity-60" : "opacity-100"
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
          U ? /* @__PURE__ */ e(
            "input",
            {
              ref: h,
              type: "text",
              value: u.value,
              onChange: (j) => x((W) => W ? { ...W, value: j.target.value } : null),
              onBlur: A,
              onKeyDown: (j) => {
                j.key === "Enter" && (j.preventDefault(), A()), j.key === "Escape" && (j.preventDefault(), x(null));
              },
              className: "absolute -top-5 left-0 w-24 rounded border border-primary bg-white px-1 py-0 text-[10px] font-semibold text-primary shadow outline-none focus:ring-1 focus:ring-primary",
              onClick: (j) => j.stopPropagation()
            }
          ) : /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              tabIndex: 0,
              "aria-label": `Label: ${F.label || "Unlabeled"}. Double-click to edit.`,
              className: "absolute -top-5 left-0 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white shadow",
              style: { whiteSpace: "nowrap" },
              onDoubleClick: (j) => S(j, F),
              onContextMenu: (j) => C(j, F.id),
              onKeyDown: (j) => R(j, F.id),
              children: F.label || "Unlabeled"
            }
          ),
          q && !s && /* @__PURE__ */ o(H, { children: [
            le(F, "nw"),
            le(F, "ne"),
            le(F, "sw"),
            le(F, "se")
          ] })
        ]
      },
      z
    );
  }, se = () => {
    if (!P) return null;
    const F = fr(P, r, n);
    return /* @__PURE__ */ e(
      "div",
      {
        "aria-hidden": !0,
        className: "pointer-events-none absolute",
        style: {
          left: F.left,
          top: F.top,
          width: F.width,
          height: F.height,
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
              a.map((F) => re.has(F.id) ? null : de(F, !1, !0, `box-${F.id}`)),
              X && de(X, !0, !1, "ghost-move"),
              ee && de(ee, !0, !0, "ghost-resize"),
              se()
            ]
          }
        ),
        !s && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute bottom-1.5 right-2 rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-white/80", children: "Drag to add box" })
      ]
    }
  );
}
const mc = [
  "claude-opus-4-7",
  "claude-sonnet-4-6",
  "claude-haiku-4-5-20251001"
], hc = [
  "$.trigger.imageRef",
  "$.trigger.image",
  "$.steps.upload.output.imageId"
];
function fc(t) {
  if (!t) return !1;
  const r = t.properties;
  if (!r || typeof r != "object" || Array.isArray(r)) return !1;
  const n = r.regions;
  return typeof n == "object" && n !== null;
}
function xc(t) {
  const r = t.trim();
  if (r.length === 0) return { ok: !0, value: void 0 };
  try {
    const n = JSON.parse(r);
    return n === null || typeof n != "object" || Array.isArray(n) ? { ok: !1, error: "Schema must be a JSON object" } : { ok: !0, value: n };
  } catch (n) {
    return { ok: !1, error: n.message };
  }
}
const ct = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Tn = "mt-1 w-full text-[12px] rounded border border-red-500 bg-white px-2 py-1 outline-none", gc = `${ct} font-mono`, bc = `${Tn} font-mono`, Ze = "text-[12px] font-semibold text-text-secondary", We = "text-[11px] text-text-tertiary mt-0.5", Ut = "text-[11px] text-red-600 mt-0.5";
function yc({ data: t, onChange: r }) {
  const [n, a] = $(!1), [i, s] = $(
    t.outputSchema ? JSON.stringify(t.outputSchema, null, 2) : ""
  ), [d, c] = $(null), l = !t.userPrompt?.trim(), p = !t.imageRefPath?.trim(), u = !!t.imageRefPath && !t.imageRefPath.startsWith("$."), x = fc(t.outputSchema), h = E(
    (g) => {
      r({ seedRegions: g });
    },
    [r]
  ), f = (g) => {
    s(g);
    const m = xc(g);
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
          children: mc.map((g) => /* @__PURE__ */ e("option", { value: g, children: g }, g))
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
          className: p || u ? bc : gc,
          value: t.imageRefPath ?? "",
          onChange: (g) => r({ imageRefPath: g.target.value }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      p ? /* @__PURE__ */ e("div", { id: "vision-image-ref-path-error", role: "alert", className: Ut, children: "Image reference path is required." }) : u ? /* @__PURE__ */ o("div", { id: "vision-image-ref-path-error", role: "alert", className: Ut, children: [
        "Path must start with ",
        /* @__PURE__ */ e("code", { children: "$." })
      ] }) : /* @__PURE__ */ e("div", { className: We, children: "JSONPath into context. The value must be a string imageId or object with imageId." }),
      /* @__PURE__ */ e("div", { className: "mt-1.5 flex flex-wrap gap-1", children: hc.map((g) => /* @__PURE__ */ e(
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
          className: `${l ? Tn : ct} min-h-20 resize-y`,
          value: t.userPrompt,
          onChange: (g) => r({ userPrompt: g.target.value })
        }
      ),
      l ? /* @__PURE__ */ e("div", { id: "vision-user-prompt-error", role: "alert", className: Ut, children: "User prompt is required." }) : /* @__PURE__ */ o("div", { className: We, children: [
        "Supports ",
        "{{ context.* }}",
        " substitution."
      ] })
    ] }),
    x && /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("div", { className: Ze, children: "Focus regions (optional)" }),
      /* @__PURE__ */ e("div", { className: We, children: "Drag on the image to paint focus boxes. The next vision pass will use these as analysis hints." }),
      /* @__PURE__ */ e(
        uc,
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
          className: `${d ? Tn : ct} font-mono text-[11px] min-h-28 resize-y`,
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
      d ? /* @__PURE__ */ o("div", { id: "vision-output-schema-error", role: "alert", className: Ut, children: [
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
              onChange: (g) => r({ systemPrompt: g.target.value || void 0 }),
              placeholder: "Leave blank to use the canned vision system prompt."
            }
          ),
          /* @__PURE__ */ e("div", { className: We, children: "Schema instructions are auto-appended when output schema is set." })
        ] })
      ] })
    ] })
  ] });
}
const vc = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function Nc({ samples: t, onSelect: r }) {
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
const wc = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], St = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", kc = `${St} font-mono`, wt = "text-[12px] font-semibold text-text-secondary", xr = "text-[11px] text-text-tertiary mt-0.5";
function Cc({ data: t, onChange: r }) {
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
          className: kc,
          value: t.imageRefPath ?? "",
          onChange: (c) => r({ imageRefPath: c.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: xr, children: "JSONPath to the imageId to classify. Required." }),
      /* @__PURE__ */ e(Nc, { samples: vc, onSelect: (c) => r({ imageRefPath: c }) })
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
      /* @__PURE__ */ e("div", { className: xr, children: "Press Enter or click Add. The model returns the single best-matching label." })
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
          children: wc.map((c) => /* @__PURE__ */ e("option", { value: c.value, children: c.label }, c.value))
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
const Ic = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function Sc({ samples: t, onSelect: r }) {
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
const $c = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more detail)" }
], $t = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Tc = `${$t} font-mono`, kt = "text-[12px] font-semibold text-text-secondary", gr = "text-[11px] text-text-tertiary mt-0.5";
function Ac({ data: t, onChange: r }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-describe-image-ref-path", className: kt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-describe-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Tc,
          value: t.imageRefPath ?? "",
          onChange: (n) => r({ imageRefPath: n.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: gr, children: "JSONPath to the imageId to describe. Required." }),
      /* @__PURE__ */ e(Sc, { samples: Ic, onSelect: (n) => r({ imageRefPath: n }) })
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
      /* @__PURE__ */ e("div", { className: gr, children: "Required. What to ask the model about the image." })
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
          children: $c.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
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
const Rc = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
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
const Mc = [
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (default — fast)" },
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (more accurate)" }
], dt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Dc = `${dt} font-mono`, at = "text-[12px] font-semibold text-text-secondary", br = "text-[11px] text-text-tertiary mt-0.5";
function Ec({ data: t, onChange: r }) {
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
          className: Dc,
          value: t.imageRefPath ?? "",
          onChange: (c) => r({ imageRefPath: c.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: br, children: "JSONPath to the imageId to tag. Required." }),
      /* @__PURE__ */ e(Pc, { samples: Rc, onSelect: (c) => r({ imageRefPath: c }) })
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
      /* @__PURE__ */ e("div", { className: br, children: "Restricts tagging to this vocabulary. Leave empty for open-ended tags." })
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
          children: Mc.map((c) => /* @__PURE__ */ e("option", { value: c.value, children: c.label }, c.value))
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
const Oc = [
  "$.trigger.imageRef",
  "$.scatter.parentImageId",
  "$.steps.crop.output.imageId"
];
function _c({ samples: t, onSelect: r }) {
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
  { value: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 (default — best OCR accuracy)" },
  { value: "claude-haiku-4-5", label: "Claude Haiku 4.5 (faster, lower accuracy)" }
], Wt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Bc = `${Wt} font-mono`, jt = "text-[12px] font-semibold text-text-secondary", gn = "text-[11px] text-text-tertiary mt-0.5";
function Fc({ data: t, onChange: r }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-image-ref-path", className: jt, children: "Image ref path" }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "vision-extract-text-image-ref-path",
          type: "text",
          spellCheck: !1,
          className: Bc,
          value: t.imageRefPath ?? "",
          onChange: (n) => r({ imageRefPath: n.target.value.trim() }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e("div", { className: gn, children: "JSONPath to the imageId to extract text from. Required." }),
      /* @__PURE__ */ e(_c, { samples: Oc, onSelect: (n) => r({ imageRefPath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "vision-extract-text-model", className: jt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "vision-extract-text-model",
          className: Wt,
          value: t.model ?? "claude-sonnet-4-6",
          onChange: (n) => r({ model: n.target.value }),
          children: Lc.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
        }
      ),
      /* @__PURE__ */ e("div", { className: gn, children: "Defaults to Sonnet for best OCR accuracy." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-extract-text-system-prompt", className: jt, children: [
        "System prompt override ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "vision-extract-text-system-prompt",
          rows: 3,
          spellCheck: !1,
          className: `${Wt} resize-y`,
          value: t.systemPrompt ?? "",
          onChange: (n) => r({ systemPrompt: n.target.value || void 0 }),
          placeholder: "Leave blank to use the default OCR system prompt."
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "vision-extract-text-max-output-tokens", className: jt, children: [
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
          className: Wt,
          value: t.maxOutputTokens ?? 1024,
          onChange: (n) => {
            const a = parseInt(n.target.value, 10);
            r({ maxOutputTokens: Number.isFinite(a) && a > 0 ? a : 1024 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: gn, children: "Increase for documents with large amounts of text." })
    ] })
  ] });
}
const Uc = [
  { value: "amazon.titan-image-generator-v2:0", label: "Titan v2 (default)" },
  { value: "amazon.titan-image-generator-v1", label: "Titan v1" }
], it = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", st = "text-[12px] font-semibold text-text-secondary", yr = "text-[11px] text-text-tertiary mt-0.5";
function jc({ data: t, onChange: r }) {
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
      /* @__PURE__ */ e("div", { className: yr, children: "Text description of the image to generate. Required." })
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
          children: Uc.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
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
      /* @__PURE__ */ e("div", { className: yr, children: "When > 1, the step fans out with one arm per image. Each arm carries one imageId." })
    ] })
  ] });
}
const zc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
];
function qc({ samples: t, onSelect: r }) {
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
const Wc = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], Vt = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", Vc = `${Vt} font-mono`, zt = "text-[12px] font-semibold text-text-secondary", vr = "text-[11px] text-text-tertiary mt-0.5";
function Jc({ data: t, onChange: r }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-source-image-path", className: zt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "variation-source-image-path",
          type: "text",
          spellCheck: !1,
          className: Vc,
          value: t.sourceImagePath ?? "",
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(qc, { samples: zc, onSelect: (n) => r({ sourceImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "variation-model", className: zt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "variation-model",
          className: Vt,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (n) => r({ model: n.target.value }),
          children: Wc.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-num-variations", className: zt, children: [
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
          className: Vt,
          value: t.numVariations ?? 1,
          onChange: (n) => {
            const a = parseInt(n.target.value, 10);
            r({ numVariations: Number.isFinite(a) && a >= 1 ? Math.min(8, a) : 1 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: vr, children: "Always fans out — each variation becomes a separate arm downstream." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "variation-similarity", className: zt, children: [
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
          className: Vt,
          value: t.similarity ?? 0.7,
          onChange: (n) => {
            const a = parseFloat(n.target.value);
            r({ similarity: Number.isFinite(a) ? Math.min(1, Math.max(0, a)) : 0.7 });
          }
        }
      ),
      /* @__PURE__ */ e("div", { className: vr, children: "0 = very different, 1 = nearly identical. 0.7 is a good starting point." })
    ] })
  ] });
}
const Hc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.upload.output.imageId"
], Kc = [
  "$.steps.mask.output.imageId",
  "$.trigger.maskRef"
];
function Nr({ samples: t, onSelect: r }) {
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
const Gc = [
  { value: "amazon.nova-canvas-v1:0", label: "Nova Canvas v1 (default)" }
], An = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary", wr = `${An} font-mono`, qt = "text-[12px] font-semibold text-text-secondary", kr = "text-[11px] text-text-tertiary mt-0.5";
function Yc({ data: t, onChange: r }) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-source-image-path", className: qt, children: [
        "Source image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "edit-prompt-source-image-path",
          type: "text",
          spellCheck: !1,
          className: wr,
          value: t.sourceImagePath ?? "",
          onChange: (n) => r({ sourceImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.trigger.imageRef"
        }
      ),
      /* @__PURE__ */ e(Nr, { samples: Hc, onSelect: (n) => r({ sourceImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ o("label", { htmlFor: "edit-prompt-mask-image-path", className: qt, children: [
        "Mask image path ",
        /* @__PURE__ */ e("span", { className: "text-text-tertiary font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ e(
        "input",
        {
          id: "edit-prompt-mask-image-path",
          type: "text",
          spellCheck: !1,
          className: wr,
          value: t.maskImagePath ?? "",
          onChange: (n) => r({ maskImagePath: n.target.value.trim() || void 0 }),
          placeholder: "$.steps.mask.output.imageId"
        }
      ),
      /* @__PURE__ */ e("div", { className: kr, children: "JSONPath to a mask image. White pixels = edit region, black = preserve. Omit for outpainting." }),
      /* @__PURE__ */ e(Nr, { samples: Kc, onSelect: (n) => r({ maskImagePath: n }) })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-prompt", className: qt, children: "Edit prompt" }),
      /* @__PURE__ */ e(
        "textarea",
        {
          id: "edit-prompt-prompt",
          rows: 4,
          spellCheck: !1,
          className: `${An} resize-y min-h-20`,
          value: t.prompt ?? "",
          onChange: (n) => r({ prompt: n.target.value }),
          placeholder: "Replace the background with a sunny beach"
        }
      ),
      /* @__PURE__ */ e("div", { className: kr, children: "Describes what to generate in the masked region. Required." })
    ] }),
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e("label", { htmlFor: "edit-prompt-model", className: qt, children: "Model" }),
      /* @__PURE__ */ e(
        "select",
        {
          id: "edit-prompt-model",
          className: An,
          value: t.model ?? "amazon.nova-canvas-v1:0",
          onChange: (n) => r({ model: n.target.value }),
          children: Gc.map((n) => /* @__PURE__ */ e("option", { value: n.value, children: n.label }, n.value))
        }
      )
    ] })
  ] });
}
const Xc = {
  // -------------------------------------------------------------------------
  // Trigger
  // -------------------------------------------------------------------------
  trigger: /* @__PURE__ */ o(H, { children: [
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
  llm: /* @__PURE__ */ o(H, { children: [
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
  transform: /* @__PURE__ */ o(H, { children: [
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
  condition: /* @__PURE__ */ o(H, { children: [
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
  action: /* @__PURE__ */ o(H, { children: [
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
  fork: /* @__PURE__ */ o(H, { children: [
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
  join: /* @__PURE__ */ o(H, { children: [
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
  approval: /* @__PURE__ */ o(H, { children: [
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
  agent: /* @__PURE__ */ o(H, { children: [
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
  "mcp-tool": /* @__PURE__ */ o(H, { children: [
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
  "knowledge-base": /* @__PURE__ */ o(H, { children: [
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
  "graph-query": /* @__PURE__ */ o(H, { children: [
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
  memory: /* @__PURE__ */ o(H, { children: [
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
  guardrail: /* @__PURE__ */ o(H, { children: [
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
  policy: /* @__PURE__ */ o(H, { children: [
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
  "ag-ui-output": /* @__PURE__ */ o(H, { children: [
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
  "image-source": /* @__PURE__ */ o(H, { children: [
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
  "image:save": /* @__PURE__ */ o(H, { children: [
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
  scatter: /* @__PURE__ */ o(H, { children: [
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
  "image:resize": /* @__PURE__ */ o(H, { children: [
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
  "image:transform": /* @__PURE__ */ o(H, { children: [
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
  "image:format-convert": /* @__PURE__ */ o(H, { children: [
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
  "image:sharpen": /* @__PURE__ */ o(H, { children: [
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
  "image:watermark": /* @__PURE__ */ o(H, { children: [
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
  "image:crop": /* @__PURE__ */ o(H, { children: [
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
  "image:adjust-bw": /* @__PURE__ */ o(H, { children: [
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
  "image:adjust-layer": /* @__PURE__ */ o(H, { children: [
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
  "image:vision-analyze": /* @__PURE__ */ o(H, { children: [
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
  "image:vision-classify": /* @__PURE__ */ o(H, { children: [
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
  "image:vision-describe": /* @__PURE__ */ o(H, { children: [
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
  "image:vision-tag": /* @__PURE__ */ o(H, { children: [
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
  "image:vision-extract-text": /* @__PURE__ */ o(H, { children: [
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
  "image:generate": /* @__PURE__ */ o(H, { children: [
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
  "image:variation": /* @__PURE__ */ o(H, { children: [
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
  "image:edit-prompt": /* @__PURE__ */ o(H, { children: [
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
}, Qc = {
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
] }), Zc = {
  trigger: Qs,
  llm: rl,
  transform: il,
  condition: ll,
  action: pl,
  fork: ul,
  join: fl,
  approval: gl,
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
  scatter: Tl,
  "image:resize": Ml,
  "image:transform": Fl,
  "image:format-convert": Wl,
  "image:sharpen": Hl,
  "image:watermark": Xl,
  "image:crop": ec,
  "image:adjust-bw": rc,
  "image:adjust-layer": lc,
  "image:vision-analyze": yc,
  "image:vision-classify": Cc,
  "image:vision-describe": Ac,
  "image:vision-tag": Ec,
  "image:vision-extract-text": Fc,
  "image:generate": jc,
  "image:variation": Jc,
  "image:edit-prompt": Yc
};
function ed(t, r) {
  const n = Zc[t.type];
  return /* @__PURE__ */ e(n, { data: t.data, onChange: r });
}
function td({ selectedIds: t }) {
  const {
    definition: r,
    selectedNodeId: n,
    setSelectedNodeId: a,
    updateNodeData: i,
    removeNode: s,
    duplicateNodes: d
  } = Ye(), [c, l] = $("config"), p = oe(null), u = oe(null);
  Mn();
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
  const N = g ? Qc[g.type] : null, v = () => {
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
    /* @__PURE__ */ o(H, { children: [
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
    /* @__PURE__ */ o(H, { children: [
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
        c === "config" && ed(g, k),
        c === "runs" && /* @__PURE__ */ e("div", { className: "p-6 text-xs text-[#64748b]", children: "No runs yet." }),
        c === "docs" && /* @__PURE__ */ e("div", { className: "pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug", children: Xc[g.type] ?? /* @__PURE__ */ e("p", { className: "text-text-secondary", children: "No docs available for this node type." }) })
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
function nd(t) {
  const r = Date.now() - new Date(t).getTime();
  return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 2592e5 ? `${Math.floor(r / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function rd(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function od(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Cr(t) {
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
function bn(t) {
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
function ad(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function et({ label: t, children: r }) {
  return /* @__PURE__ */ o("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ e("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: t }),
    /* @__PURE__ */ e("span", { className: "text-[13px] text-text-primary", children: r })
  ] });
}
function id({ pipelineId: t, run: r, onBack: n }) {
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
        ie,
        {
          tone: Cr(r.status),
          "aria-label": `Status: ${bn(r.status)}`,
          children: bn(r.status)
        }
      ) }),
      /* @__PURE__ */ e(et, { label: "Started", children: new Date(r.startedAt).toLocaleString() }),
      r.completedAt && /* @__PURE__ */ e(et, { label: "Completed", children: new Date(r.completedAt).toLocaleString() }),
      /* @__PURE__ */ e(et, { label: "Duration", children: ke(r.durationMs) }),
      /* @__PURE__ */ e(et, { label: "Triggered by", children: ad(r) }),
      /* @__PURE__ */ e(et, { label: "Trigger type", children: r.triggeredBy.triggerType }),
      r.estimatedCostUsd != null && r.estimatedCostUsd > 0 && /* @__PURE__ */ o(et, { label: "Est. Cost", children: [
        /* @__PURE__ */ e("span", { className: I("font-semibold", od(r.estimatedCostUsd)), children: rd(r.estimatedCostUsd) }),
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
          const d = Cr(s.status), c = bn(s.status), l = s.output, p = l?.response;
          return /* @__PURE__ */ o("div", { className: "mb-2", children: [
            /* @__PURE__ */ o("div", { className: "flex items-center gap-2 py-1 text-xs", children: [
              /* @__PURE__ */ e(ie, { tone: d, "aria-label": `Status: ${c}`, children: c }),
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
function Ir(t) {
  return t == null || t === 0 ? "--" : t < 1e-3 ? "<$0.001" : t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function sd(t) {
  return t == null || t === 0 ? "text-text-tertiary" : t < 0.01 ? "text-[#16a34a]" : t < 0.1 ? "text-[#ca8a04]" : t < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function ld(t) {
  const r = Date.now() - new Date(t).getTime();
  return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 2592e5 ? `${Math.floor(r / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function cd(t) {
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
function dd(t) {
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
function pd(t) {
  return t.triggeredBy.userId ? t.triggeredBy.userId : t.triggeredBy.triggerType || "manual";
}
function ud({ pipelineId: t, onClose: r }) {
  const n = Ee(), [a, i] = $([]), [s, d] = $(!0), [c, l] = $(null), [p, u] = $(null), [x, h] = $(!1), [f, g] = $([]), m = oe(null), N = E(async () => {
    d(!0), l(null);
    try {
      const b = await Kr(t, { limit: 50 });
      i(b.runs);
    } catch (b) {
      l(b instanceof Error ? b.message : "Failed to load runs");
    } finally {
      d(!1);
    }
  }, [t]);
  Z(() => {
    m.current !== t && (m.current = t, N());
  }, [t, N]), Re("*", E((b) => {
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
          i((P) => [A, ...P.filter((X) => X.id !== S.runId)]);
          break;
        }
        case "pipeline.run.completed": {
          const S = C;
          i(
            (A) => A.map(
              (P) => P.id === S.runId ? { ...P, status: "completed", completedAt: S.at, durationMs: S.durationMs } : P
            )
          );
          break;
        }
        case "pipeline.run.failed": {
          const S = C;
          i(
            (A) => A.map(
              (P) => P.id === S.runId ? { ...P, status: "failed", completedAt: S.at, error: S.error } : P
            )
          );
          break;
        }
        case "pipeline.run.cancelled": {
          const S = C;
          i(
            (A) => A.map(
              (P) => P.id === S.runId ? { ...P, status: "cancelled", completedAt: S.at } : P
            )
          );
          break;
        }
      }
  }, [t]));
  const v = V(
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
          v && /* @__PURE__ */ e(
            id,
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
            const w = cd(b.status), C = dd(b.status), R = f.includes(b.id);
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
                    /* @__PURE__ */ e(ie, { tone: w, "aria-label": `Status: ${C}`, children: C }),
                    /* @__PURE__ */ e("span", { className: "font-mono text-xs text-text-secondary", children: b.id.slice(0, 8) }),
                    /* @__PURE__ */ e("span", { className: "ml-auto text-[11px] text-text-tertiary", children: ld(b.startedAt) })
                  ] }),
                  /* @__PURE__ */ o("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ e("span", { children: ke(b.durationMs) }),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 0 && /* @__PURE__ */ e(
                      "span",
                      {
                        className: I("font-mono font-semibold", sd(b.estimatedCostUsd)),
                        title: `Estimated cost: ${Ir(b.estimatedCostUsd)}`,
                        children: Ir(b.estimatedCostUsd)
                      }
                    ),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 1 && /* @__PURE__ */ e("span", { className: "rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "High Cost" }),
                    /* @__PURE__ */ e("span", { className: "ml-auto", children: pd(b) })
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
function md({
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
          n === "config" && (r !== null ? /* @__PURE__ */ e(td, {}) : /* @__PURE__ */ e("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          n === "runs" && /* @__PURE__ */ e(
            ud,
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
function hd(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function fd(t) {
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
function xd(t) {
  if (!(t instanceof HTMLElement)) return !1;
  const r = t.tagName;
  return !!(r === "INPUT" || r === "TEXTAREA" || r === "SELECT" || t.isContentEditable);
}
function um() {
  const { pipelineId: t } = mt(), r = V(() => t ? tt(t) !== null : !1, [t]);
  return !t || !r ? /* @__PURE__ */ e(ht, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(Gr, { pipelineId: t, children: /* @__PURE__ */ e(gd, { pipelineId: t }) });
}
function gd({ pipelineId: t }) {
  const r = Ee(), n = Ye(), a = ft(), { toast: i } = Zt(), {
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
  } = n, m = As(t), [N, v] = $(!1), y = oe(null), k = oe(d);
  Z(() => (k.current && !d && (v(!0), y.current && clearTimeout(y.current), y.current = setTimeout(() => v(!1), 450)), k.current = d, () => {
    y.current && (clearTimeout(y.current), y.current = null);
  }), [d]);
  const b = V(
    () => s ? eo(s) : null,
    [s]
  ), w = (b?.errors.length ?? 0) > 0, C = V(
    () => fd(s),
    [s]
  ), S = V(() => s ? s.nodes.some((me) => me.type === "trigger") : !1, [s]) ? ["trigger"] : [], [A, P] = $(!0), [X, ee] = $(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), re = E(() => {
    ee((me) => {
      const Q = !me;
      try {
        window.localStorage.setItem(
          "ws_pipelines_v1_show_tags",
          Q ? "true" : "false"
        );
      } catch {
      }
      return Q;
    });
  }, []), [le, de] = $(!1), [se, F] = $(!1), [M, q] = $(!1), [z, O] = $(!1), [U, j] = $(!1), W = V(() => s?.publishedSnapshot ? s.publishedSnapshot : null, [s]), ce = s?.status === "published", _ = !m.isRunActive && (!ce || w), ne = m.isRunActive ? "Cancel the active run" : ce ? w ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", ye = E(async () => {
    if (m.isRunActive && m.currentRunId) {
      a.cancelRun(m.currentRunId);
      return;
    }
    if (!_) {
      if (C.length > 0) {
        m.setTriggerInputValues(
          Object.fromEntries(C.map((me) => [me, ""]))
        ), m.setTriggerInputOpen(!0);
        return;
      }
      m.handleRunClick();
    }
  }, [m, a, _, C]);
  Z(() => {
    const me = (Q) => {
      if (xd(Q.target)) return;
      const J = Q.metaKey || Q.ctrlKey;
      if (J && Q.key.toLowerCase() === "s") {
        Q.preventDefault(), p(), i("Saved", { type: "success", durationMs: 1200 });
        return;
      }
      if (J && Q.key === "Enter") {
        Q.preventDefault(), ye();
        return;
      }
      if (J && Q.key === ".") {
        Q.preventDefault(), m.isRunActive && m.currentRunId && a.cancelRun(m.currentRunId);
        return;
      }
      if (J && Q.shiftKey && Q.key.toLowerCase() === "z") {
        Q.preventDefault(), f();
        return;
      }
      if (J && Q.key.toLowerCase() === "z") {
        Q.preventDefault(), h();
        return;
      }
      if (Q.key === "Escape") {
        l(null);
        return;
      }
    };
    return window.addEventListener("keydown", me), () => window.removeEventListener("keydown", me);
  }, [p, i, ye, m, a, h, f, l]);
  const Me = () => {
    if (!s) return;
    const me = Pn(s.id);
    me && r(`/pipelines/${me.id}`);
  }, Je = () => {
    if (!s) return;
    const me = wn(s.id);
    me && At(`${hd(s.name)}.pipeline.json`, me);
  }, Oe = async () => {
    if (!s) return;
    const me = Ns(s);
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(me), i("Mermaid diagram copied", { type: "success" });
      else
        throw new Error("clipboard unavailable");
    } catch (Q) {
      console.warn("[PipelineEditor] clipboard write failed", Q), i("Could not copy Mermaid diagram", { type: "error" });
    }
  }, Ae = () => {
    O(!0);
  }, Be = () => {
    de(!1), !w && (u(), i("Pipeline published", { type: "success" }));
  }, _e = () => {
    s && (Io(s.id), F(!1), r("/pipelines"));
  }, Fe = () => {
    Yr(t), q(!1), i("Run history cleared", { type: "success" });
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
          Ps,
          {
            pipelineId: t,
            definition: s,
            dirty: d,
            savingFlash: N,
            isRunActive: m.isRunActive,
            isTriggering: m.isTriggering,
            runDisabled: _,
            runTitle: ne,
            currentRun: we,
            breakpoints: m.breakpoints,
            onRunClick: ye,
            onDebugRunClick: m.handleDebugRunClick,
            onExport: Je,
            onPublishClick: () => de(!0),
            onDuplicate: Me,
            onCopyMermaid: Oe,
            onViewVersions: Ae,
            onRevert: x,
            onToggleShowTags: re,
            showTags: X,
            onViewRunHistory: () => m.setSidebarTab("runs"),
            onClearRunHistory: () => q(!0),
            onSimPanelOpen: () => j(!0),
            onDelete: () => F(!0)
          }
        ),
        X && /* @__PURE__ */ o(
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
                Zo,
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
          /* @__PURE__ */ e(ki, { disabledTypes: S }),
          /* @__PURE__ */ e("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ e(
            Bi,
            {
              errorNodeId: m.activeError?.nodeId ?? null,
              onErrorNodePosition: m.handleErrorNodePosition,
              breakpoints: m.breakpoints,
              onToggleBreakpoint: m.handleToggleBreakpoint,
              pausedAtNodeId: m.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ e(
            md,
            {
              pipelineId: t,
              selectedNodeId: c,
              sidebarTab: m.sidebarTab,
              onTabChange: m.setSidebarTab
            }
          )
        ] }),
        m.pausedBreakpoint && /* @__PURE__ */ e(
          zs,
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
          Ui,
          {
            error: m.activeError,
            anchor: m.errorNodeAnchor,
            onDismiss: m.handleDismissError,
            onRetry: m.handleRetryFromError
          }
        ),
        /* @__PURE__ */ e(
          Ts,
          {
            runId: m.currentRunId,
            visible: m.isRunActive && A
          }
        ),
        /* @__PURE__ */ e(
          $s,
          {
            publishConfirmOpen: le,
            onPublishClose: () => de(!1),
            onPublishConfirm: Be,
            hasErrors: w,
            validationErrorCount: b?.errors.length ?? 0,
            definitionName: s.name,
            definitionVersion: s.version,
            deleteConfirmOpen: se,
            onDeleteClose: () => F(!1),
            onDeleteConfirm: _e,
            clearRunsConfirmOpen: M,
            onClearRunsClose: () => q(!1),
            onClearRunsConfirm: Fe,
            versionDiffOpen: z,
            onVersionDiffClose: () => O(!1),
            currentDef: s,
            publishedDef: W,
            onJumpToNode: l,
            simPanelOpen: U,
            onSimPanelClose: () => j(!1)
          }
        ),
        /* @__PURE__ */ e(
          Ve,
          {
            open: m.triggerInputOpen,
            onClose: () => m.setTriggerInputOpen(!1),
            title: "Trigger inputs",
            maxWidth: 480,
            footer: /* @__PURE__ */ o(H, { children: [
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
                    onChange: (Q) => m.setTriggerInputValues((J) => ({ ...J, [me]: Q.target.value }))
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
function bd(t) {
  const r = t?.event;
  return !r || r === "manual" ? { icon: "▶", text: "Manual" } : r === "schedule" ? { icon: "⏱", text: t?.schedule ?? "Schedule" } : r === "webhook" ? { icon: "🔌", text: t?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${t?.event}` };
}
function yd({
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
  const [u, x] = $(!1), [h, f] = $(!1), g = oe(null);
  ut(g, () => x(!1), u);
  const m = t.status === "published", N = t.status === "archived", v = typeof t.publishedVersion == "number", y = bd(t.triggerBinding);
  let k, b;
  N ? (k = `Archived · v${t.version}`, b = "danger") : m ? (k = `Published · v${t.version}`, b = "success") : v ? (k = `Draft · v${t.version} (published v${t.publishedVersion})`, b = "warning") : (k = `Draft · v${t.version}`, b = "neutral");
  const w = !m, C = (A) => (P) => {
    P.stopPropagation(), A();
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
          /* @__PURE__ */ e(ie, { "aria-label": `Status: ${k}`, tone: b, size: "sm", children: k }),
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
const vd = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, Nd = ["draft", "published"];
function wd({
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
            children: Bn.map((h) => {
              const f = a ? n.has(h) : Nd.includes(h);
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
                  children: vd[h]
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
const He = I(
  "px-2.5 py-[5px] text-xs font-semibold",
  "bg-white text-text-secondary",
  "border border-border-field rounded-md",
  "cursor-pointer font-inherit"
);
function kd({
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
  unionTags: N
}) {
  const [v, y] = $(""), k = oe(null), b = oe(null), w = oe(null);
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
    const R = v.trim();
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
        /* @__PURE__ */ e("button", { "data-testid": "bulk-clear", className: He, onClick: r, children: "Clear" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-publish", className: He, onClick: i, children: "Publish selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-archive", className: He, onClick: s, children: "Archive selected" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export-json", className: He, onClick: a, children: "Export selected as JSON" }),
        /* @__PURE__ */ e("button", { "data-testid": "bulk-export", className: He, onClick: n, children: "Export all" }),
        /* @__PURE__ */ e(
          "button",
          {
            "data-testid": "bulk-delete-confirm-prompt",
            className: He,
            onClick: p,
            children: "Delete selected"
          }
        ),
        /* @__PURE__ */ o("div", { className: "relative", children: [
          /* @__PURE__ */ e("button", { "data-testid": "bulk-add-tag-btn", className: He, onClick: d, children: "Add tag..." }),
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
                    value: v,
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
                He,
                N.length === 0 && "opacity-50 cursor-not-allowed"
              ),
              onClick: c,
              disabled: N.length === 0,
              title: N.length === 0 ? "No tags on selected pipelines" : "Remove tag from selected",
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
                /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5", children: N.length === 0 ? /* @__PURE__ */ e("div", { className: "text-xs text-text-tertiary", children: "No tags to remove." }) : N.map((R) => /* @__PURE__ */ o(
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
function Cd({
  visibleRows: t,
  filteredIds: r
}) {
  const [n, a] = $(!1), [i, s] = $(/* @__PURE__ */ new Set()), d = oe(null), c = oe(null), l = E(() => {
    s(/* @__PURE__ */ new Set());
  }, []), p = E(() => {
    n ? (l(), a(!1)) : a(!0);
  }, [n, l]), u = E(
    (m, N = !1) => {
      const v = t, y = v.findIndex((b) => b.id === m), k = d.current;
      y !== -1 && (d.current = y), s((b) => {
        const w = new Set(b), C = !w.has(m);
        if (N && k != null && y !== -1) {
          const R = Math.min(k, y), S = Math.max(k, y);
          for (let A = R; A <= S; A++) {
            const P = v[A];
            P && (C ? w.add(P.id) : w.delete(P.id));
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
      const N = new Set(m);
      if (h)
        for (const v of t) N.delete(v.id);
      else
        for (const v of t) N.add(v.id);
      return N;
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
const Id = 280, ve = 160, Sd = 40, $d = 200;
function K(t) {
  return Sd + t * Id;
}
function G(t) {
  return $d + t * ve;
}
function Y(t, r, n, a = "in") {
  return {
    id: crypto.randomUUID(),
    source: t,
    sourceHandle: r,
    target: n,
    targetHandle: a
  };
}
function Td(t) {
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
    { id: n, type: "trigger", position: { x: K(0), y: G(0) }, data: s },
    { id: a, type: "llm", position: { x: K(1), y: G(0) }, data: d },
    { id: i, type: "action", position: { x: K(2), y: G(0) }, data: c }
  ], p = [
    Y(n, "out", a),
    Y(a, "out", i)
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
function Ad(t) {
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
  }, N = [
    { id: n, type: "trigger", position: { x: K(0), y: G(0) }, data: p },
    { id: a, type: "fork", position: { x: K(1), y: G(0) }, data: u },
    { id: i, type: "llm", position: { x: K(2), y: G(0) - ve / 2 }, data: x },
    { id: s, type: "action", position: { x: K(3), y: G(0) - ve / 2 }, data: h },
    { id: d, type: "llm", position: { x: K(2), y: G(0) + ve / 2 }, data: f },
    { id: c, type: "action", position: { x: K(3), y: G(0) + ve / 2 }, data: g },
    { id: l, type: "join", position: { x: K(4), y: G(0) }, data: m }
  ], v = [
    Y(n, "out", a),
    Y(a, "branch-0", i),
    Y(i, "out", s),
    Y(s, "out", l, "in-0"),
    Y(a, "branch-1", d),
    Y(d, "out", c),
    Y(c, "out", l, "in-1")
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
    createdAt: r,
    updatedAt: r,
    createdBy: t
  };
}
function Rd(t) {
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
  }, k = {
    type: "action",
    actionType: "update-document",
    config: { field: "commentStatus", value: "deleted" },
    idempotent: !0,
    onError: "fail-run"
  }, b = [
    { id: n, type: "trigger", position: { x: K(0), y: G(0) }, data: x },
    { id: a, type: "llm", position: { x: K(1), y: G(0) }, data: h },
    { id: i, type: "condition", position: { x: K(2), y: G(0) }, data: f },
    { id: s, type: "action", position: { x: K(3), y: G(0) - ve / 2 }, data: g },
    { id: d, type: "action", position: { x: K(3), y: G(0) + ve / 2 }, data: m },
    { id: c, type: "approval", position: { x: K(4), y: G(0) + ve / 2 }, data: N },
    { id: l, type: "condition", position: { x: K(5), y: G(0) + ve / 2 }, data: v },
    { id: p, type: "action", position: { x: K(6), y: G(0) }, data: y },
    { id: u, type: "action", position: { x: K(6), y: G(0) + ve }, data: k }
  ], w = [
    Y(n, "out", a),
    Y(a, "out", i),
    Y(i, "true", s),
    Y(i, "false", d),
    Y(d, "out", c),
    Y(c, "approved", l),
    Y(c, "rejected", u),
    Y(l, "true", p),
    Y(l, "false", u)
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
function Pd(t) {
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
    { id: n, type: "trigger", position: { x: K(0), y: G(0) }, data: d },
    { id: a, type: "llm", position: { x: K(1), y: G(0) }, data: c },
    { id: i, type: "transform", position: { x: K(2), y: G(0) }, data: l },
    { id: s, type: "action", position: { x: K(3), y: G(0) }, data: p }
  ], x = [
    Y(n, "out", a),
    Y(a, "out", i),
    Y(i, "out", s)
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
function Md(t) {
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
    { id: n, type: "trigger", position: { x: K(0), y: G(0) }, data: d },
    { id: a, type: "approval", position: { x: K(1), y: G(0) }, data: c },
    { id: i, type: "approval", position: { x: K(2), y: G(0) }, data: l },
    { id: s, type: "action", position: { x: K(3), y: G(0) }, data: p }
  ], x = [
    Y(n, "out", a),
    Y(a, "approved", i),
    Y(i, "approved", s)
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
function Dd(t) {
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
    { id: n, type: "trigger", position: { x: K(0), y: G(0) }, data: d },
    { id: a, type: "transform", position: { x: K(1), y: G(0) }, data: c },
    { id: i, type: "llm", position: { x: K(2), y: G(0) }, data: l },
    { id: s, type: "action", position: { x: K(3), y: G(0) }, data: p }
  ], x = [
    Y(n, "out", a),
    Y(a, "out", i),
    Y(i, "out", s)
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
function Ed(t) {
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
    { id: n, type: "trigger", position: { x: K(0), y: G(0) }, data: s },
    { id: a, type: "llm", position: { x: K(1), y: G(0) }, data: d },
    { id: i, type: "action", position: { x: K(2), y: G(0) }, data: c }
  ], p = [
    Y(n, "out", a),
    Y(a, "out", i)
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
function Od(t) {
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
    { id: n, type: "trigger", position: { x: K(0), y: G(0) }, data: s },
    { id: a, type: "llm", position: { x: K(1), y: G(0) }, data: d },
    { id: i, type: "action", position: { x: K(2), y: G(0) }, data: c }
  ], p = [
    Y(n, "out", a),
    Y(a, "out", i)
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
function _d(t) {
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
    { id: n, type: "trigger", position: { x: K(0), y: G(0) }, data: l },
    { id: a, type: "fork", position: { x: K(1), y: G(0) }, data: p },
    { id: i, type: "llm", position: { x: K(2), y: G(0) - ve / 2 }, data: u },
    { id: s, type: "approval", position: { x: K(2), y: G(0) + ve / 2 }, data: x },
    { id: d, type: "join", position: { x: K(3), y: G(0) }, data: h },
    { id: c, type: "action", position: { x: K(4), y: G(0) }, data: f }
  ], m = [
    Y(n, "out", a),
    Y(a, "branch-0", i),
    Y(i, "out", d, "in-0"),
    Y(a, "branch-1", s),
    Y(s, "approved", d, "in-1"),
    Y(d, "out", c)
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
function Ld(t) {
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
    { id: n, type: "trigger", position: { x: K(0), y: G(0) }, data: l },
    { id: a, type: "llm", position: { x: K(1), y: G(0) }, data: p },
    { id: i, type: "condition", position: { x: K(2), y: G(0) }, data: u },
    { id: s, type: "action", position: { x: K(3), y: G(0) - ve / 2 }, data: x },
    { id: d, type: "approval", position: { x: K(4), y: G(0) - ve / 2 }, data: h },
    { id: c, type: "action", position: { x: K(3), y: G(0) + ve / 2 }, data: f }
  ], m = [
    Y(n, "out", a),
    Y(a, "out", i),
    Y(i, "true", s),
    Y(s, "out", d),
    Y(i, "false", c)
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
function Bd(t) {
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
    { id: n, type: "trigger", position: { x: K(0), y: G(0) }, data: x },
    { id: a, type: "llm", position: { x: K(1), y: G(0) }, data: h },
    { id: i, type: "fork", position: { x: K(2), y: G(0) }, data: f },
    { id: s, type: "llm", position: { x: K(3), y: G(0) - ve }, data: g },
    { id: d, type: "llm", position: { x: K(3), y: G(0) }, data: m },
    { id: c, type: "llm", position: { x: K(3), y: G(0) + ve }, data: N },
    { id: l, type: "join", position: { x: K(4), y: G(0) }, data: v },
    { id: p, type: "llm", position: { x: K(5), y: G(0) }, data: y },
    { id: u, type: "action", position: { x: K(6), y: G(0) }, data: k }
  ], w = [
    Y(n, "out", a),
    Y(a, "out", i),
    Y(i, "branch-0", s),
    Y(i, "branch-1", d),
    Y(i, "branch-2", c),
    Y(s, "out", l, "in-0"),
    Y(d, "out", l, "in-1"),
    Y(c, "out", l, "in-2"),
    Y(l, "out", p),
    Y(p, "out", u)
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
function Fd(t) {
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
    { id: n, type: "trigger", position: { x: K(0), y: G(0) }, data: c },
    { id: a, type: "llm", position: { x: K(1), y: G(0) }, data: l },
    { id: i, type: "condition", position: { x: K(2), y: G(0) }, data: p },
    { id: s, type: "action", position: { x: K(3), y: G(0) - ve / 2 }, data: u },
    { id: d, type: "approval", position: { x: K(3), y: G(0) + ve / 2 }, data: x }
  ], f = [
    Y(n, "out", a),
    Y(a, "out", i),
    Y(i, "true", s),
    Y(i, "false", d)
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
function Ud(t) {
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
    { id: n, type: "trigger", position: { x: K(0), y: G(0) }, data: u },
    { id: a, type: "llm", position: { x: K(1), y: G(0) }, data: x },
    { id: i, type: "transform", position: { x: K(2), y: G(0) }, data: h },
    { id: s, type: "condition", position: { x: K(3), y: G(0) }, data: f },
    { id: d, type: "action", position: { x: K(4), y: G(0) - ve / 2 }, data: g },
    { id: c, type: "llm", position: { x: K(4), y: G(0) + ve / 2 }, data: m },
    { id: l, type: "approval", position: { x: K(5), y: G(0) + ve / 2 }, data: N },
    { id: p, type: "action", position: { x: K(6), y: G(0) + ve / 2 }, data: v }
  ], k = [
    Y(n, "out", a),
    Y(a, "out", i),
    Y(i, "out", s),
    Y(s, "true", d),
    Y(s, "false", c),
    Y(c, "out", l),
    Y(l, "approved", p)
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
const yn = [
  {
    id: "document-summary",
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    tags: ["llm", "summary", "document"],
    build: Td
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: Ad
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: Rd,
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
    build: Pd,
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
    build: Md,
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
    build: Dd
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: Ed
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: Od
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: _d
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: Ld
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: Bd
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: Fd
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: Ud
  }
], ao = "/api";
async function jd(t) {
  const r = { createdTypes: [], errors: [] };
  if (!t?.documentTypes?.length) return r;
  for (const n of t.documentTypes)
    try {
      const a = await zd(n.name);
      if (a) {
        r.createdTypes.push(a.typeId);
        continue;
      }
      const i = await qd(n);
      r.createdTypes.push(i.typeId);
    } catch (a) {
      r.errors.push(
        `Failed to scaffold "${n.name}": ${a instanceof Error ? a.message : String(a)}`
      );
    }
  return r;
}
async function zd(t) {
  try {
    const r = await fetch(`${ao}/document-types`, { credentials: "same-origin" });
    if (!r.ok) return null;
    const a = (await r.json()).items?.find(
      (i) => i.name.toLowerCase() === t.toLowerCase()
    );
    return a ? { typeId: a.typeId } : null;
  } catch {
    return null;
  }
}
async function qd(t) {
  const r = t.fields.map((i, s) => ({
    fieldId: crypto.randomUUID(),
    name: i.name,
    fieldType: i.fieldType,
    widget: Wd(i.fieldType),
    cardinality: 1,
    required: i.required ?? !1,
    helpText: "",
    options: i.options,
    order: s
  })), n = await fetch(`${ao}/document-types`, {
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
function Wd(t) {
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
function Vd(t) {
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
function Jd(t) {
  const r = t.triggerBinding?.event ?? "manual";
  return r === "schedule" ? "Schedule" : r === "webhook" ? "Webhook" : r === "manual" ? "Manual" : r.startsWith("document.") ? `On ${r}` : r;
}
function Hd({ template: t, meta: r, onPick: n }) {
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
function Kd({
  open: t,
  onClose: r,
  onCreated: n,
  onSelect: a
}) {
  const { userId: i } = On(), [s, d] = $(""), c = oe(null);
  Z(() => {
    t && (d(""), setTimeout(() => c.current?.focus(), 30));
  }, [t]);
  const l = V(() => {
    const h = /* @__PURE__ */ new Map();
    for (const f of yn) {
      const g = f.build(i || "anonymous");
      h.set(f.id, { nodeCount: g.nodes.length, trigger: Jd(g) });
    }
    return h;
  }, [i, t]), p = V(() => {
    const h = s.trim().toLowerCase();
    return h ? yn.filter(
      (f) => f.name.toLowerCase().includes(h) || f.description.toLowerCase().includes(h) || f.tags.some((g) => g.toLowerCase().includes(h))
    ) : yn;
  }, [s]), u = (h) => {
    if (n) {
      const f = h.build(i || "anonymous"), g = Vd(f);
      So(g), r(), n(g.id), h.prerequisites && jd(h.prerequisites).then((m) => {
        m.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", m.errors);
      });
      return;
    }
    a && a(h);
  };
  return /* @__PURE__ */ o(
    Ve,
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
              Hd,
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
const Bn = ["draft", "published", "archived"], Sr = ["draft", "published"];
function Gd(t) {
  if (t == null) return null;
  if (t.trim() === "") return /* @__PURE__ */ new Set();
  const r = new Set(Bn);
  return new Set(
    t.split(",").map((a) => a.trim()).filter((a) => r.has(a))
  );
}
function Yd(t, r) {
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
function Xd(t) {
  const r = t?.event;
  return !r || r === "manual" ? "manual" : r === "schedule" ? "schedule" : r === "webhook" ? "webhook" : "document";
}
function $r(t) {
  return t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Qd() {
  const t = /* @__PURE__ */ new Date(), r = t.getFullYear(), n = String(t.getMonth() + 1).padStart(2, "0"), a = String(t.getDate()).padStart(2, "0");
  return `${r}-${n}-${a}`;
}
function Zd({
  open: t,
  onClose: r,
  onCreate: n
}) {
  const [a, i] = $(""), s = oe(null);
  Z(() => {
    t && (i(""), setTimeout(() => s.current?.focus(), 50));
  }, [t]);
  const d = a.trim().length > 0, c = () => {
    d && n(a.trim());
  };
  return /* @__PURE__ */ o(
    Ve,
    {
      open: t,
      onClose: r,
      title: "Create new pipeline",
      maxWidth: 440,
      footer: /* @__PURE__ */ o(H, { children: [
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
function mm() {
  const t = Ee(), { userId: r } = On(), { toast: n } = Zt(), { triggerRun: a, isTriggering: i } = $o(), [s, d] = Qt(), [c, l] = $([]), [p, u] = $(""), [x, h] = $("all"), [f, g] = $("updated"), m = V(
    () => Gd(s.get("status")),
    [s]
  ), N = V(() => m ?? new Set(Sr), [m]), v = m != null, y = (T) => {
    const D = new URLSearchParams(s);
    if (T.size === 0)
      D.set("status", "");
    else {
      const ae = Bn.filter((ue) => T.has(ue)).join(",");
      D.set("status", ae);
    }
    d(D, { replace: !0 });
  }, k = (T) => {
    const D = v ? new Set(N) : new Set(Sr);
    D.has(T) ? D.delete(T) : D.add(T), y(D);
  }, [b, w] = $(!1), [C, R] = $(!1), [S, A] = $(null), [P, X] = $(!1), [ee, re] = $(!1), [le, de] = $(!1), se = E(async () => {
    const T = await To(), D = [];
    for (const ae of T) {
      const ue = await nt(ae.id);
      ue && D.push(Yd(ue, ae.icon));
    }
    l(D);
  }, []);
  Z(() => {
    se();
  }, [se]);
  const F = V(() => {
    const T = p.trim().toLowerCase(), ae = [...c.filter((ue) => {
      if (T) {
        const ge = ue.name.toLowerCase().includes(T), De = ue.tags.some((Un) => Un.toLowerCase().includes(T));
        if (!ge && !De) return !1;
      }
      return !(!(v && N.size === 0) && !N.has(ue.status) || x !== "all" && Xd(ue.triggerBinding) !== x);
    })];
    return f === "name" ? ae.sort((ue, ge) => ue.name.localeCompare(ge.name)) : f === "created" ? ae.sort((ue, ge) => ge.createdAt.localeCompare(ue.createdAt)) : ae.sort((ue, ge) => ge.updatedAt.localeCompare(ue.updatedAt)), ae;
  }, [c, p, N, v, x, f]), M = V(() => F.map((T) => T.id), [F]), {
    selectionMode: q,
    selected: z,
    allVisibleSelected: O,
    selectAllRef: U,
    handleToggleSelect: j,
    handleSelectAllFiltered: W,
    handleHeaderToggleAll: ce,
    clearSelection: _,
    setSelectionMode: ne
  } = Cd({ visibleRows: F, filteredIds: M }), ye = V(() => {
    const T = /* @__PURE__ */ new Set();
    for (const D of c)
      if (z.has(D.id))
        for (const ae of D.tags) T.add(ae);
    return Array.from(T).sort((D, ae) => D.localeCompare(ae));
  }, [c, z]), Me = async (T) => {
    const D = await Ao({ name: T, createdBy: r });
    w(!1), t(`/pipelines/${D.id}`);
  }, Je = () => {
    const T = Ro(r);
    rt(T).then(() => se()), t(`/pipelines/${T.id}`);
  }, Oe = (T) => {
    const D = T.build(r);
    rt(D), R(!1), t(`/pipelines/${D.id}`);
  }, Ae = (T) => t(`/pipelines/${T}`), Be = async (T) => {
    if (T.status !== "published") {
      n("Run requires published state", { type: "warning" });
      return;
    }
    if (!i)
      try {
        await a(T.id, {}) ? n(`Run started for "${T.name}"`, { type: "success" }) : n("Could not start run", { type: "error" });
      } catch (D) {
        n(`Run failed: ${D.message}`, { type: "error" });
      } finally {
        t(`/pipelines/${T.id}`);
      }
  }, _e = (T) => {
    const D = Pn(T);
    D && (rt(D).then(() => se()), n(`Duplicated as "${D.name}"`, { type: "success" }));
  }, Fe = (T) => {
    const D = wn(T.id);
    if (!D) {
      n("Export failed", { type: "error" });
      return;
    }
    At(`${$r(T.name)}.pipeline.json`, D);
  }, we = async () => {
    S && (await zn(S), A(null), se(), n("Pipeline deleted", { type: "success" }));
  }, me = S ? c.find((T) => T.id === S) : null, Q = () => {
    const T = Array.from(z);
    T.length !== 0 && (T.forEach((D, ae) => {
      window.setTimeout(() => {
        const ue = c.find((De) => De.id === D), ge = wn(D);
        !ue || !ge || At(`${$r(ue.name)}-${Qd()}.pipeline.json`, ge);
      }, ae * 100);
    }), n(`Exported ${T.length} pipeline${T.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, J = async (T) => {
    const D = Array.from(z);
    for (const ae of D) {
      const ue = await nt(ae);
      if (!ue) continue;
      const ge = ue.tags ?? [];
      ge.includes(T) || (ue.tags = [...ge, T], await rt(ue));
    }
    re(!1), se(), n(`Added tag "${T}" to ${D.length} pipeline${D.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, te = async (T) => {
    const D = Array.from(z);
    for (const ae of D) {
      const ue = await nt(ae);
      if (!ue) continue;
      const ge = ue.tags ?? [];
      ge.includes(T) && (ue.tags = ge.filter((De) => De !== T), await rt(ue));
    }
    se(), n(`Removed tag "${T}" from ${D.length} pipeline${D.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, pe = async () => {
    const T = Array.from(z);
    for (const D of T) await zn(D);
    X(!1), _(), se(), n(`Deleted ${T.length} pipeline${T.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, xe = async () => {
    const T = Array.from(z);
    if (T.length === 0) return;
    let D = 0, ae = 0;
    for (const ue of T) {
      const ge = await nt(ue);
      if (!ge) continue;
      if (ge.status === "published") {
        ae += 1;
        continue;
      }
      await Po(ue) && (D += 1);
    }
    se(), ae > 0 ? n(
      `Published ${D}; skipped ${ae} already published`,
      { type: "success" }
    ) : n(
      `Published ${D} pipeline${D === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, $e = async () => {
    const T = Array.from(z);
    if (T.length === 0) return;
    let D = 0, ae = 0;
    for (const ge of T) {
      const De = await nt(ge);
      if (!De) continue;
      De.status === "archived" ? (De.status = "draft", ae += 1) : (De.status = "archived", D += 1), await rt(De);
    }
    se();
    const ue = [];
    D > 0 && ue.push(`Archived ${D}`), ae > 0 && ue.push(`Unarchived ${ae}`), n(ue.join(" · ") || "No pipelines changed", { type: "success" });
  }, Ce = async () => {
    const T = Array.from(z);
    if (T.length === 0) return;
    const D = [];
    for (const ue of T) {
      const ge = await nt(ue);
      ge && D.push(ge);
    }
    if (D.length === 0) {
      n("Export failed", { type: "error" });
      return;
    }
    const ae = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    At(`pipelines-${ae}.json`, JSON.stringify(D, null, 2)), n(`Exported ${D.length} pipeline${D.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  };
  Z(() => {
    const T = (D) => {
      const ae = D.target;
      if (ae) {
        const ge = ae.tagName;
        if (ge === "INPUT" || ge === "TEXTAREA" || ge === "SELECT" || ae.isContentEditable)
          return;
      }
      if (D.key === "Escape") {
        (z.size > 0 || q || ee || le) && (re(!1), de(!1), _(), ne(!1));
        return;
      }
      if ((D.metaKey || D.ctrlKey) && (D.key === "a" || D.key === "A")) {
        q && (D.preventDefault(), W());
        return;
      }
      (D.key === "Delete" || D.key === "Backspace") && z.size > 0 && !P && !S && !b && !C && (D.preventDefault(), X(!0));
    };
    return window.addEventListener("keydown", T), () => window.removeEventListener("keydown", T);
  }, [
    z,
    q,
    ee,
    le,
    P,
    S,
    b,
    C,
    _,
    W,
    ne
  ]);
  const qe = c.length > 0, Ot = z.size > 0;
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
          wd,
          {
            search: p,
            onSearchChange: u,
            statusFilter: N,
            statusExplicit: v,
            onToggleStatusKey: k,
            triggerFilter: x,
            onTriggerFilterChange: h,
            sortKey: f,
            onSortKeyChange: g,
            allVisibleSelected: O,
            selectAllRef: U,
            onHeaderToggleAll: ce
          }
        ),
        Ot && /* @__PURE__ */ e(
          kd,
          {
            count: z.size,
            onClear: _,
            onExport: Q,
            onExportAsJSON: Ce,
            onPublish: xe,
            onArchive: $e,
            onAddTag: () => {
              re((T) => !T), de(!1);
            },
            onRemoveTag: () => {
              de((T) => !T), re(!1);
            },
            onDelete: () => X(!0),
            onDeleteWithConfirm: () => X(!0),
            addTagOpen: ee,
            removeTagOpen: le,
            onSubmitAddTag: J,
            onSubmitRemoveTag: te,
            onCloseAddTag: () => re(!1),
            onCloseRemoveTag: () => de(!1),
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
            children: qe ? F.length === 0 ? /* @__PURE__ */ e(
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
                children: F.map((T) => /* @__PURE__ */ e(
                  yd,
                  {
                    row: T,
                    onOpen: () => Ae(T.id),
                    onRun: () => {
                      Be(T);
                    },
                    onDuplicate: () => _e(T.id),
                    onExport: () => Fe(T),
                    onDelete: () => A(T.id),
                    selectionMode: q,
                    selected: z.has(T.id),
                    anySelected: Ot,
                    onToggleSelect: (D) => j(T.id, D)
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
                    onClick: Je,
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
          Zd,
          {
            open: b,
            onClose: () => w(!1),
            onCreate: Me
          }
        ),
        /* @__PURE__ */ e(
          Kd,
          {
            open: C,
            onClose: () => R(!1),
            onSelect: Oe
          }
        ),
        /* @__PURE__ */ e(
          Ve,
          {
            open: !!S,
            onClose: () => A(null),
            title: "Delete pipeline?",
            maxWidth: 400,
            footer: /* @__PURE__ */ o(H, { children: [
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
          Ve,
          {
            open: P,
            onClose: () => X(!1),
            title: `Delete ${z.size} pipeline${z.size === 1 ? "" : "s"}?`,
            maxWidth: 420,
            backdropTestId: "bulk-delete-modal",
            footer: /* @__PURE__ */ o(H, { children: [
              /* @__PURE__ */ e(
                "button",
                {
                  "data-testid": "bulk-delete-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => X(!1),
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
const ep = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function io(t, r, n) {
  const a = ep[t], i = Math.max(0, r | 0), s = Math.max(0, n | 0);
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
    const p = l.tokensIn ?? 0, u = l.tokensOut ?? 0, x = io(l.model, p, u), h = r[l.model];
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
function Et(t) {
  return !t || !t.modelFound && t.totalCostUsd === 0 ? "—" : t.totalCostUsd >= 0.01 ? `$${t.totalCostUsd.toFixed(2)}` : t.totalCostUsd === 0 ? "$0.00" : `$${t.totalCostUsd.toFixed(4)}`;
}
function tp(t) {
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
function so(t, r) {
  let n = 0;
  if (t.llm) {
    const i = r.get(t.nodeId);
    i && (n += io(i, t.llm.tokensIn, t.llm.tokensOut).totalCostUsd);
  }
  const a = t.costUsd;
  return typeof a == "number" && Number.isFinite(a) && a > 0 && (n += a), n;
}
function np(t, r) {
  if (!r) return [];
  const n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const l of r.nodes)
    l.data.type === "llm" && n.set(l.id, l.data.model), a.set(l.id, tp(l)), i.set(l.id, l.data.type);
  const s = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const l of r.nodes)
    s.set(l.id, 0), d.set(l.id, 0);
  for (const l of t)
    for (const p of Object.values(l.steps ?? {})) {
      if (!a.has(p.nodeId)) continue;
      const u = so(p, n);
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
function rp(t) {
  return t.slice(0, 10);
}
function op(t) {
  return Date.UTC(
    Number(t.slice(0, 4)),
    Number(t.slice(5, 7)) - 1,
    Number(t.slice(8, 10))
  );
}
function ap(t, r, n = 30, a = /* @__PURE__ */ new Date()) {
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
    const x = rp(u.startedAt);
    if (!c.has(x)) continue;
    let h = 0;
    for (const f of Object.values(u.steps ?? {}))
      h += so(f, i);
    c.set(x, (c.get(x) ?? 0) + h), l.set(x, (l.get(x) ?? 0) + 1);
  }
  const p = [];
  for (let u = d; u <= s; u += 864e5) {
    const x = new Date(u).toISOString().slice(0, 10);
    p.push({
      date: x,
      ts: op(x),
      totalCostUsd: c.get(x) ?? 0,
      runCount: l.get(x) ?? 0
    });
  }
  return p;
}
const lo = [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
], co = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], po = ["24h", "7d", "30d", "all"], ip = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function sp(t) {
  return t.startsWith("document.") || t === "document" ? "document" : t === "schedule" || t === "scheduled" ? "scheduled" : t === "webhook" ? "webhook" : "manual";
}
function lp(t) {
  let r = 0;
  for (const n of Object.values(t.steps ?? {})) {
    const a = n.attempts?.length ?? 0;
    a > 1 && (r += a - 1);
  }
  return r;
}
function uo(t, r) {
  const n = r.now ?? Date.now(), a = r.range === "all" ? null : n - ip[r.range], i = r.query.trim().toLowerCase();
  return t.filter((s) => {
    if (r.statuses.size > 0 && !r.statuses.has(s.status)) return !1;
    if (r.triggerKinds.size > 0) {
      const d = sp(s.triggeredBy.triggerType);
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
function Tr(t, r) {
  if (!t) return /* @__PURE__ */ new Set();
  const n = new Set(r);
  return new Set(
    t.split(",").map((a) => a.trim()).filter((a) => n.has(a))
  );
}
function mo(t) {
  const r = t.get("range") ?? "7d", n = po.includes(r) ? r : "7d";
  return {
    query: t.get("q") ?? "",
    statuses: Tr(t.get("status"), lo),
    triggerKinds: Tr(t.get("trigger"), co),
    range: n
  };
}
const cp = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, dp = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, pp = {
  "24h": "Last 24h",
  "7d": "Last 7d",
  "30d": "Last 30d",
  all: "All time"
};
function Ar({
  label: t,
  options: r,
  selected: n,
  onToggle: a,
  labels: i,
  testIdPrefix: s
}) {
  const [d, c] = $(!1), l = oe(null);
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
function ho({
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
        /* @__PURE__ */ e("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: po.map((u) => /* @__PURE__ */ e(
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
            children: pp[u]
          },
          u
        )) }),
        /* @__PURE__ */ e("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ e(
          Ar,
          {
            label: "Status",
            options: lo,
            selected: r,
            onToggle: s,
            labels: cp,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ e(
          Ar,
          {
            label: "Trigger",
            options: co,
            selected: n,
            onToggle: d,
            labels: dp,
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
function up({
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
function Fn(t) {
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
function mp(t) {
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
const hp = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function fp(t) {
  const r = Date.now() - new Date(t).getTime();
  return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 2592e5 ? `${Math.floor(r / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function xp({
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
  const p = oe(!1), u = oe(null), x = t.length > 0 && t.every((m) => r.has(m.id)), h = !x && t.some((m) => r.has(m.id)), f = () => {
    const m = new Set(r);
    if (x)
      for (const N of t) m.delete(N.id);
    else
      for (const N of t) m.add(N.id);
    n(m);
  }, g = (m, N, v) => {
    const y = new Set(r), k = !y.has(m);
    if (v && u.current != null) {
      const b = Math.min(u.current, N), w = Math.max(u.current, N);
      for (let C = b; C <= w; C++) {
        const R = t[C];
        R && (k ? y.add(R.id) : y.delete(R.id));
      }
    } else k ? y.add(m) : y.delete(m);
    u.current = N, n(y);
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
          const { tone: v, label: y } = Fn(m.status), k = r.has(m.id), b = lp(m);
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
                        p.current = !1, g(m.id, N, w);
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
                /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: fp(m.startedAt) }),
                /* @__PURE__ */ o("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: [
                  /* @__PURE__ */ e(ie, { tone: v, "aria-label": `Status: ${y}`, children: y }),
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
                      tone: mp(m.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${m.id}`,
                      title: m.error.message,
                      className: "ml-1.5",
                      children: hp[m.error.errorCategory] ?? m.error.errorCategory
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
                            await Mo(m.pipelineId, m.id);
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
function hm() {
  const { pipelineId: t } = mt(), r = Ee(), [n, a] = Qt(), [i, s] = $([]), [d, c] = $(null), [l, p] = $([]), [u, x] = $(() => /* @__PURE__ */ new Set()), [h, f] = $(null), [g, m] = $(!1), [N, v] = $(null), [y, k] = $(!1), b = E((O) => {
    const U = O.error?.nodeId;
    if (!U || U === "unknown") return;
    const j = Object.entries(O.steps).filter(([W, ce]) => W !== U && ce.status === "completed").map(([W]) => W);
    f({ run: O, nodeId: U, skippedNodes: j, snapshotInput: !1 }), v(null);
  }, []), w = E(async () => {
    if (h) {
      v(null), m(!0);
      try {
        const O = await Xr(
          h.run.pipelineId,
          h.run.id,
          h.nodeId,
          void 0,
          h.snapshotInput || void 0
        );
        f(null), r(`/pipelines/${h.run.pipelineId}/runs/${O.newRunId}`);
      } catch (O) {
        v(O instanceof Error ? O.message : String(O)), m(!1);
      }
    }
  }, [h, r]), { query: C, statuses: R, triggerKinds: S, range: A } = V(
    () => mo(n),
    [n]
  ), P = (O, U) => {
    const j = new URLSearchParams(n);
    U ? j.set(O, U) : j.delete(O), a(j, { replace: !0 });
  }, X = (O) => {
    const U = new Set(R);
    U.has(O) ? U.delete(O) : U.add(O), P("status", U.size === 0 ? null : Array.from(U).join(","));
  }, ee = (O) => {
    const U = new Set(S);
    U.has(O) ? U.delete(O) : U.add(O), P("trigger", U.size === 0 ? null : Array.from(U).join(","));
  }, re = (O) => {
    P("range", O === "7d" ? null : O);
  }, le = (O) => {
    P("q", O.length === 0 ? null : O);
  }, de = (O) => {
    p((U) => U.includes(O) ? U.filter((j) => j !== O) : U.length >= 2 ? [U[1], O] : [...U, O]);
  };
  Z(() => {
    t && (c(tt(t)), s(Kt(t)));
  }, [t]);
  const se = V(
    () => uo(i, { query: C, statuses: R, triggerKinds: S, range: A }),
    [i, C, R, S, A]
  ), F = V(() => {
    const O = /* @__PURE__ */ new Map();
    if (!d) return O;
    for (const U of d.nodes)
      U.data.type === "llm" && O.set(U.id, U.data.model);
    return O;
  }, [d]), M = V(() => {
    const O = {};
    for (const U of se) {
      const j = Object.values(U.steps).filter((W) => !!W.llm).map((W) => ({
        model: F.get(W.nodeId),
        tokensIn: W.llm?.tokensIn ?? 0,
        tokensOut: W.llm?.tokensOut ?? 0
      }));
      O[U.id] = Et(xt(j).total);
    }
    return O;
  }, [se, F]), q = () => {
    if (!t) return;
    k(!1);
    const O = Array.from(u), U = i.filter((j) => !u.has(j.id));
    Yr(t);
    for (const j of [...U].sort((W, ce) => W.startedAt.localeCompare(ce.startedAt)))
      Do(t, j);
    s(Kt(t)), x(/* @__PURE__ */ new Set()), p((j) => j.filter((W) => !O.includes(W)));
  }, z = () => {
    const O = i.filter((_) => u.has(_.id));
    if (O.length === 0) return;
    const U = new Blob([JSON.stringify(O, null, 2)], { type: "application/json" }), j = URL.createObjectURL(U), W = document.createElement("a"), ce = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    W.href = j, W.download = `pipeline-runs-${ce}.json`, document.body.appendChild(W), W.click(), document.body.removeChild(W), URL.revokeObjectURL(j);
  };
  return t ? d ? /* @__PURE__ */ o("div", { "data-testid": "pipeline-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ e(
      kn,
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
            /* @__PURE__ */ e("input", { type: "checkbox", checked: h.snapshotInput, onChange: (O) => f((U) => U && { ...U, snapshotInput: O.target.checked }), className: "accent-primary" }),
            "Use persisted input snapshot"
          ] }),
          N && /* @__PURE__ */ e("div", { "data-testid": "retry-modal-error", className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: N })
        ] })
      }
    ),
    /* @__PURE__ */ e(
      kn,
      {
        open: y,
        onConfirm: q,
        onCancel: () => k(!1),
        title: `Delete ${u.size} run${u.size === 1 ? "" : "s"}?`,
        body: "This cannot be undone.",
        confirmLabel: `Delete ${u.size}`,
        tone: "destructive"
      }
    ),
    N && /* @__PURE__ */ e(lt, { title: "Retry failed:", onDismiss: () => v(null), children: N }),
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
            const [O, U] = l;
            r(`/pipelines/${t}/runs/compare/${O}/${U}`);
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
      ho,
      {
        query: C,
        statuses: R,
        triggerKinds: S,
        range: A,
        onQueryChange: le,
        onStatusToggle: X,
        onTriggerToggle: ee,
        onRangeChange: re,
        onClearFilters: () => {
          le(""), P("status", null), P("trigger", null);
        }
      }
    ),
    u.size > 0 && /* @__PURE__ */ e(
      up,
      {
        selectionCount: u.size,
        onExport: z,
        onDelete: () => {
          u.size > 0 && t && k(!0);
        },
        onClear: () => x(/* @__PURE__ */ new Set())
      }
    ),
    se.length === 0 ? /* @__PURE__ */ e(
      Le,
      {
        icon: "📜",
        title: i.length === 0 ? "No runs yet" : "No runs match these filters",
        body: i.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
      }
    ) : /* @__PURE__ */ e(
      xp,
      {
        filtered: se,
        selected: u,
        onSelectionChange: x,
        comparePair: l,
        onToggleComparePair: de,
        costByRunId: M,
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
function gp(t) {
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
function Ke({ title: t, children: r }) {
  return /* @__PURE__ */ o("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ e("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: t }),
    r
  ] });
}
const Rr = "m-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", Pr = "px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", vn = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", Te = "px-2 py-[5px] text-[11px] text-text-secondary align-top", bp = {
  "#2563eb": "bg-blue-600/10 text-blue-600",
  "#7c3aed": "bg-violet-600/10 text-violet-600",
  "#16a34a": "bg-green-600/10 text-green-600",
  "#dc2626": "bg-red-600/10 text-red-600"
};
function Ct(t) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${bp[t] ?? ""}`.trimEnd();
}
const yp = {
  completed: "#16a34a",
  failed: "#dc2626",
  running: "#2563eb"
};
function vp({ stepId: t, step: r, index: n, nodeType: a, nodeConfig: i, onRetryFromStep: s, onResumeFromStep: d }) {
  const [c, l] = $(!1), p = r.output, u = p?.response, x = r.llm, h = r.input, f = yp[r.status] ?? "#94a3b8";
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
          /* @__PURE__ */ e(Ke, { title: "Execution Timeline", children: /* @__PURE__ */ o("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ e("th", { scope: "col", className: vn, children: "Event" }),
              /* @__PURE__ */ e("th", { scope: "col", className: vn, children: "Time" }),
              /* @__PURE__ */ e("th", { scope: "col", className: vn, children: "Detail" })
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
          /* @__PURE__ */ e(Ke, { title: "Node Configuration", children: i && Object.keys(i).length > 1 ? /* @__PURE__ */ e("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(i).filter(([g]) => g !== "type").map(([g, m]) => /* @__PURE__ */ o(Jr.Fragment, { children: [
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
          h && Object.keys(h).length > 0 && /* @__PURE__ */ e(Ke, { title: "Runtime Input", children: /* @__PURE__ */ e("pre", { className: Rr, children: JSON.stringify(h, null, 2) }) }),
          x?.prompt && /* @__PURE__ */ e(Ke, { title: "Resolved Prompt", children: /* @__PURE__ */ e("div", { className: Pr, children: x.prompt }) }),
          u || x?.response ? /* @__PURE__ */ e(Ke, { title: "Response", children: /* @__PURE__ */ e("div", { className: Pr, children: u ?? x?.response }) }) : /* @__PURE__ */ e(Ke, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ e("pre", { className: Rr, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
          (x || p?.tokensIn != null) && /* @__PURE__ */ e(Ke, { title: "Token Usage", children: /* @__PURE__ */ o("div", { className: "flex gap-5 flex-wrap text-xs text-text-secondary", children: [
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
          r.error && /* @__PURE__ */ e(Ke, { title: "Error", children: /* @__PURE__ */ e("div", { className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap", children: r.error }) }),
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
function Np({ steps: t, nodeDataMap: r, edges: n, onRetryFromStep: a, onResumeFromStep: i }) {
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
    function N(b) {
      const w = [];
      let C = b;
      for (; C; ) {
        const R = l.find(([re]) => p(re) === C && !m.has(re));
        if (!R) break;
        const [S, A] = R;
        m.add(S);
        const P = { stepId: S, step: A, children: [] }, X = p(S);
        if (x.has(X)) {
          const re = f.filter((le) => le.forkId === X);
          for (const { branch: le, targetNodeId: de } of re) {
            const se = N(de);
            for (const F of se)
              F.branch = F.branch ?? le;
            se.length > 0 && (se[0].branch = le, P.children.push(...se));
          }
        }
        w.push(P);
        const ee = g.get(X)?.filter((re) => re.handle === "out");
        C = ee && ee.length === 1 ? ee[0].target : null;
      }
      return w;
    }
    const v = /* @__PURE__ */ new Set();
    for (const b of n)
      v.add(b.target);
    const y = l.find(([b]) => !v.has(p(b)))?.[1] ? l.find(([b]) => !v.has(p(b)))[0] : l[0]?.[0];
    let k = [];
    y && (k = N(p(y)));
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
      return /* @__PURE__ */ o(Jr.Fragment, { children: [
        /* @__PURE__ */ e(
          vp,
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
        x.children.length > 0 && /* @__PURE__ */ e("div", { className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1", children: Array.from(f.entries()).map(([g, m], N) => /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ e("div", { className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${N === 0 ? "mt-1" : "mt-2"}`, children: g.replace("-", " ") }),
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
const wp = 5e3, kp = "synthetic-";
function Cp(t) {
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
function Rn(t, r) {
  return r.timestamp.localeCompare(t.timestamp);
}
function Ip(t, r) {
  if (r.length === 0) return t.slice().sort(Rn);
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
  return [...t, ...i].sort(Rn);
}
function Sp(t, r, n = {}) {
  const { pollMs: a = wp, filters: i } = n, s = ta(), [d, c] = $([]), [l, p] = $([]), [u, x] = $(!0), [h, f] = $(null), [g, m] = $(void 0), [N, v] = $(0), [y, k] = $(!1), b = JSON.stringify({
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
        const P = await qn(t, r, i ?? {});
        if (A) return;
        c(P.items), m(P.nextCursor), x(!1);
      } catch (P) {
        if (A) return;
        f(P instanceof Error ? P.message : String(P)), x(!1);
      }
    })(), () => {
      A = !0;
    };
  }, [t, r, b, N]), Z(() => {
    if (!t || !r || a <= 0) return;
    const A = window.setInterval(() => {
      v((P) => P + 1);
    }, a);
    return () => window.clearInterval(A);
  }, [t, r, a]), Z(() => {
    if (!t || !r) return;
    const A = [], P = (ee, re) => {
      const le = Cp(ee);
      if (!le) return;
      const de = re;
      if (de.runId !== r) return;
      k(!0);
      const se = {
        auditId: `${kp}${ee}-${de.stepId ?? "run"}-${Date.now()}`,
        timestamp: de.at ?? (/* @__PURE__ */ new Date()).toISOString(),
        action: le,
        actorUserId: "executor",
        pipelineId: t,
        runId: r,
        trace: re
      };
      p((F) => [se, ...F]);
    }, X = [
      "pipeline.step.started",
      "pipeline.step.completed",
      "pipeline.step.failed",
      "pipeline.step.breakpoint",
      "pipeline.run.completed",
      "pipeline.run.failed",
      "pipeline.run.resumed-from-step",
      "pipeline.approval.recorded"
    ];
    for (const ee of X)
      A.push(s.subscribe(ee, (re) => P(ee, re)));
    return A.push(s.subscribeToRun(r)), () => {
      for (const ee of A) ee();
    };
  }, [s, t, r]), Z(() => {
    d.length !== 0 && p((A) => {
      if (A.length === 0) return A;
      const P = /* @__PURE__ */ new Map();
      for (const X of d) {
        const ee = P.get(X.action);
        (!ee || X.timestamp > ee) && P.set(X.action, X.timestamp);
      }
      return A.filter((X) => {
        const ee = P.get(X.action);
        return !ee || X.timestamp >= ee;
      });
    });
  }, [d]);
  const w = oe(!1), C = E(() => {
    !t || !r || !g || w.current || (w.current = !0, (async () => {
      try {
        const A = await qn(t, r, {
          ...i ?? {},
          cursor: g
        });
        c((P) => {
          const X = new Set(P.map((re) => re.auditId)), ee = P.concat(A.items.filter((re) => !X.has(re.auditId)));
          return ee.sort(Rn), ee;
        }), m(A.nextCursor);
      } catch (A) {
        f(A instanceof Error ? A.message : String(A));
      } finally {
        w.current = !1;
      }
    })());
  }, [t, r, g, b]), R = E(() => {
    v((A) => A + 1);
  }, []);
  return {
    items: V(() => Ip(d, l), [d, l]),
    loading: u,
    error: h,
    hasMore: !!g,
    loadMore: C,
    liveHealthy: y,
    refresh: R
  };
}
const $p = "#3b82f6", Tp = "#eab308", Ap = "#f97316", Mr = "#64748b", Rp = "#ef4444", Pp = "#a855f7";
function Mp(t) {
  return t.action === "pipeline.step.failed" || t.outcome === "error" ? Rp : t.action === "pipeline.run.resumed-from-step" || t.action.startsWith("pipeline.step.context.patched") ? Pp : t.action.startsWith("pipeline.approval.") ? Tp : t.action.startsWith("pipeline.breakpoint.") ? Ap : t.action.startsWith("pipeline.step.") ? $p : (t.action.startsWith("pipeline.run."), Mr);
}
const Dp = {
  "1h": "Last 1h",
  "24h": "Last 24h",
  all: "All"
}, Dr = [
  { label: "Steps", matches: (t) => t.startsWith("pipeline.step.") },
  { label: "Approvals", matches: (t) => t.startsWith("pipeline.approval.") || t === "pipeline.approve" || t === "pipeline.reject" },
  { label: "Breakpoints", matches: (t) => t.startsWith("pipeline.breakpoint.") || t === "pipeline.step.breakpoint.hit" },
  { label: "Run lifecycle", matches: (t) => t.startsWith("pipeline.run.") || t === "pipeline.trigger" || t === "pipeline.cancel" },
  { label: "Errors", matches: (t) => t === "pipeline.step.failed" || t === "pipeline.run.failed" || t === "pipeline.force_fail" }
];
function Ep(t) {
  if (t === "all") return null;
  const r = Date.now();
  return t === "1h" ? r - 3600 * 1e3 : r - 1440 * 60 * 1e3;
}
function Er(t) {
  const r = t.details, n = t.trace, a = r && typeof r.stepId == "string" ? r.stepId : void 0, i = n && typeof n.stepId == "string" ? n.stepId : void 0, s = n && typeof n.nodeId == "string" ? n.nodeId : void 0;
  return a ?? i ?? s;
}
function Op(t, r = Date.now()) {
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
function _p({
  pipelineId: t,
  runId: r,
  onStepClick: n
}) {
  const a = Sp(t, r), { items: i, error: s, hasMore: d, loadMore: c, loading: l } = a, [p, u] = $(/* @__PURE__ */ new Set()), [x, h] = $(""), [f, g] = $("all"), [m, N] = $(/* @__PURE__ */ new Set()), v = E((C) => {
    u((R) => {
      const S = new Set(R);
      return S.has(C) ? S.delete(C) : S.add(C), S;
    });
  }, []), y = E((C) => {
    N((R) => {
      const S = new Set(R);
      return S.has(C) ? S.delete(C) : S.add(C), S;
    });
  }, []), k = V(() => {
    const C = Ep(f), R = x.trim().toLowerCase(), S = Dr.filter((A) => p.has(A.label));
    return i.filter((A) => {
      if (S.length > 0 && !S.some((P) => P.matches(A.action)) || R && !A.actorUserId.toLowerCase().includes(R)) return !1;
      if (C !== null) {
        const P = Date.parse(A.timestamp);
        if (!Number.isFinite(P) || P < C) return !1;
      }
      return !0;
    });
  }, [i, p, x, f]), b = E(() => {
    if (typeof window > "u") return;
    const C = k.map((P) => JSON.stringify(P)).join(`
`) + (k.length > 0 ? `
` : ""), R = new Blob([C], { type: "application/x-ndjson" }), S = URL.createObjectURL(R), A = document.createElement("a");
    A.href = S, A.download = `executor-log-${r}.ndjson`, document.body.appendChild(A), A.click(), document.body.removeChild(A), URL.revokeObjectURL(S);
  }, [k, r]), w = E(
    (C) => {
      if (y(C.auditId), !n || !C.action.startsWith("pipeline.step.")) return;
      const R = Er(C);
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
          Dr.map((C) => {
            const R = p.has(C.label);
            return /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  R ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => v(C.label),
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
                children: Dp[C]
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
            const R = m.has(C.auditId), A = C.action.startsWith("pipeline.step.") ? Er(C) : void 0;
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
                      style: { background: Mp(C) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: C.timestamp,
                      children: Op(C.timestamp)
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
                      onClick: (P) => P.stopPropagation(),
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
function fm() {
  const { pipelineId: t, runId: r } = mt();
  return !t || !r ? /* @__PURE__ */ e(ht, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(Gr, { pipelineId: t, children: /* @__PURE__ */ e(Eo, { children: /* @__PURE__ */ e(Lp, { pipelineId: t, runId: r }) }) });
}
function Lp({ pipelineId: t, runId: r }) {
  const n = Ee(), a = Ye(), i = ft(), { definition: s } = a, [d, c] = $(null);
  Z(() => {
    let _ = !1;
    return import("./PipelineEditorServicesContext-D943p7tZ.js").then((ne) => ne.T).then(({ getPipelineRun: ne }) => {
      ne(t, r).then((ye) => {
        !_ && ye && c(ye);
      });
    }), () => {
      _ = !0;
    };
  }, [t, r]);
  const l = V(() => {
    const _ = i.runs[r], ne = d;
    if (!_ && !ne) return;
    if (!_) return ne ?? void 0;
    if (!ne) return _;
    const ye = Object.keys(_.steps).length, Me = Object.keys(ne.steps).length;
    return ye >= Me ? _ : { ...ne, status: _.status, currentStepIds: _.currentStepIds };
  }, [i.runs, r, d]);
  Oo(r);
  const p = gp(l ?? null), u = V(() => {
    const _ = {};
    if (!s) return _;
    for (const ne of s.nodes)
      _[ne.id] = { type: ne.data.type, data: ne.data };
    return _;
  }, [s]), [x, h] = $(!1), f = oe(null);
  ut(f, () => h(!1), x);
  const [g, m] = $("steps"), [N, v] = $(null), y = E((_) => {
    v(_), m("steps");
  }, []), [k, b] = $(null), [w, C] = $(null), [R, S] = $(!1), A = l?.status === "failed" ? l.error?.nodeId : void 0, P = E((_) => {
    if (!l) return;
    const ne = Object.entries(l.steps).filter(([ye, Me]) => ye !== _ && Me.status === "completed").map(([ye]) => ye);
    b({ nodeId: _, skippedNodes: ne, snapshotInput: !1 }), C(null);
  }, [l]), X = E(async () => {
    if (!(!k || !l)) {
      C(null), S(!0);
      try {
        const _ = await Xr(
          t,
          l.id,
          k.nodeId,
          void 0,
          k.snapshotInput || void 0
        );
        b(null), n(`/pipelines/${t}/runs/${_.newRunId}`);
      } catch (_) {
        C(_ instanceof Error ? _.message : String(_)), S(!1);
      }
    }
  }, [k, l, t, n]), [ee, re] = $(null), [le, de] = $(null), [se, F] = $(null), M = E(async (_) => {
    if (l) {
      de(null), re(_);
      try {
        const ne = await _o(t, l.id, _);
        F(
          `Resumed from ${_.slice(0, 10)}${_.length > 10 ? "…" : ""} (replay #${ne.replayAttempts})`
        ), setTimeout(() => F(null), 4e3), n(`/pipelines/${t}/runs/${l.id}`);
      } catch (ne) {
        de(ne instanceof Error ? ne.message : String(ne));
      } finally {
        re(null);
      }
    }
  }, [l, t, n]), q = E(async () => {
    if (!l) {
      try {
        const _ = await i.triggerRun(t);
        n(`/pipelines/${t}/runs/${_}`);
      } catch (_) {
        console.error("[PipelineRunReplay] re-run failed", _);
      }
      return;
    }
    try {
      const _ = await i.triggerRun(
        t,
        l.triggeredBy.payload
      );
      n(`/pipelines/${t}/runs/${_}`);
    } catch (_) {
      console.error("[PipelineRunReplay] re-run failed", _);
    }
  }, [l, i, t, n]), z = async () => {
    h(!1);
    try {
      await navigator.clipboard?.writeText(r);
    } catch {
    }
  }, O = () => {
    if (h(!1), !l) return;
    const _ = JSON.stringify(l, null, 2);
    At(`run-${r}.json`, _);
  }, U = () => {
    if (h(!1), !s) return;
    const _ = Pn(
      s.id,
      `${s.name} (from run)`
    );
    _ && n(`/pipelines/${_.id}`);
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
  const j = Fn(l.status), W = l.triggeredBy.userId ?? l.triggeredBy.triggerType, ce = Et(p);
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
                W
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
                ce
              ]
            }
          ),
          /* @__PURE__ */ e(ie, { tone: j.tone, "aria-label": `Status: ${j.label}`, children: j.label }),
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
            je,
            {
              onClick: () => P(A),
              disabled: R,
              "data-testid": "retry-from-failed-step-button",
              title: `Retry from "${A}" with the original upstream context`,
              children: "↻ Retry from failure"
            }
          ),
          /* @__PURE__ */ e(
            je,
            {
              onClick: q,
              "data-testid": "rerun-button",
              title: "Re-run with the original trigger payload",
              children: "↻ Re-run"
            }
          ),
          /* @__PURE__ */ o("div", { className: "relative", ref: f, children: [
            /* @__PURE__ */ e(
              Tt,
              {
                onClick: () => h((_) => !_),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            x ? /* @__PURE__ */ o("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: z, children: "Copy runId" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: O, children: "Export run JSON" }),
              /* @__PURE__ */ e("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: U, children: "Open as new draft" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ e(
          kn,
          {
            open: k !== null,
            onConfirm: X,
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
                /* @__PURE__ */ e("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: k.skippedNodes.map((_) => /* @__PURE__ */ e("span", { className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary", children: _.slice(0, 10) }, _)) })
              ] }),
              /* @__PURE__ */ o("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
                /* @__PURE__ */ e(
                  "input",
                  {
                    type: "checkbox",
                    checked: k.snapshotInput,
                    onChange: (_) => b((ne) => ne && { ...ne, snapshotInput: _.target.checked }),
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
          le && /* @__PURE__ */ e(lt, { title: "Resume failed:", className: "mb-4", "data-testid": "resume-error-banner", children: le }),
          (l.replayAttempts ?? 0) > 0 && /* @__PURE__ */ e(
            lt,
            {
              title: "Resumed from a previous failure",
              className: "mb-4",
              "data-testid": "resume-history-banner",
              children: /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ o("div", { children: [
                  l.error?.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o(H, { children: [
                    "Originally failed at ",
                    /* @__PURE__ */ e("code", { children: l.error.nodeId.slice(0, 12) }),
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
                    children: l.resumeHistory.map((_, ne) => /* @__PURE__ */ o("li", { children: [
                      "from ",
                      /* @__PURE__ */ e("code", { children: _.fromNodeId.slice(0, 12) }),
                      " at ",
                      pt(_.at)
                    ] }, `${_.fromNodeId}-${_.at}-${ne}`))
                  }
                )
              ] })
            }
          ),
          se && /* @__PURE__ */ e(lt, { title: "Resumed", className: "mb-4", "data-testid": "resume-toast", children: se }),
          l.error && /* @__PURE__ */ o(lt, { title: "Run failed:", className: "mb-4", children: [
            l.error.message,
            l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ o("span", { className: "ml-2 text-[11px] text-[#b91c1c]", children: [
              "at node ",
              l.error.nodeId.slice(0, 8)
            ] }),
            l.status === "failed" && l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ e("div", { className: "mt-2", children: /* @__PURE__ */ e(
              je,
              {
                onClick: () => M(l.error.nodeId),
                disabled: ee !== null,
                "data-testid": "resume-from-here-button",
                title: `Resume this run from "${l.error.nodeId}" using its accumulated upstream context`,
                children: ee === l.error.nodeId ? "Resuming…" : "↻ Resume from here"
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
              ].map((_) => {
                const ne = g === _.id;
                return /* @__PURE__ */ e(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": ne,
                    onClick: () => m(_.id),
                    "data-testid": `run-replay-tab-${_.id}`,
                    className: I(
                      "font-[inherit] text-[13px] font-semibold py-1.5 px-3.5 border-none bg-transparent cursor-pointer -mb-px",
                      ne ? "text-text-primary border-b-2 border-b-primary" : "text-text-tertiary border-b-2 border-b-transparent"
                    ),
                    children: _.label
                  },
                  _.id
                );
              })
            }
          ),
          g === "steps" ? (
            /* Threaded step list with fork nesting */
            /* @__PURE__ */ e(
              Np,
              {
                steps: l.steps,
                nodeDataMap: u,
                edges: s?.edges,
                onRetryFromStep: P,
                onResumeFromStep: l.status === "failed" ? M : void 0
              }
            )
          ) : /* @__PURE__ */ e("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ e(
            _p,
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
function Bp(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${ke(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function Fp(t) {
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
function Up(t, r) {
  if (!t) return r;
  const n = t.nodes.find((a) => a.id === r);
  return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : r;
}
function jp(t, r) {
  if (!t) return !1;
  const n = t.nodes.find((a) => a.id === r);
  return !!n && n.data.type === "condition";
}
function Or(t) {
  if (!t) return;
  const r = t.output;
  if (r && typeof r == "object" && "result" in r)
    return r.result ? "true" : "false";
}
function zp(t, r) {
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
function qp(t, r, n) {
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
    const f = jp(n, s), g = f ? Or(d) : void 0, m = f ? Or(c) : void 0, N = f && g !== void 0 && m !== void 0 && g !== m;
    return {
      nodeId: s,
      name: Up(n, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: x,
      durationLarge: h,
      branchDiffers: N,
      isLlm: !!(d?.llm || c?.llm),
      isCondition: f,
      branchA: g,
      branchB: m
    };
  });
}
function Wp(t) {
  if (t.statusDiffers) return "bg-[#fef2f2]";
  if (t.branchDiffers) return "bg-[#eff6ff]";
  if (t.durationLarge) return "bg-[#fffbeb]";
}
function _r({
  step: t,
  branch: r,
  isCondition: n
}) {
  if (!t)
    return /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" });
  const a = Fp(t.status);
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ e(ie, { tone: a, children: t.status }),
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
function Vp({ a: t, b: r }) {
  const n = V(() => zp(t, r), [t, r]);
  return /* @__PURE__ */ e(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: n.map((a, i) => a.type === "eq" ? /* @__PURE__ */ e("span", { children: a.text }, i) : a.type === "add" ? /* @__PURE__ */ e("span", { "data-diff": "add", className: "bg-[#dcfce7] text-[#166534]", children: a.text }, i) : /* @__PURE__ */ e("span", { "data-diff": "del", className: "bg-[#fee2e2] text-[#991b1b] line-through", children: a.text }, i))
    }
  );
}
function Jp({ row: t }) {
  const r = t.a?.llm, n = t.b?.llm, a = r && n ? n.tokensIn + n.tokensOut - (r.tokensIn + r.tokensOut) : void 0, i = Wp(t);
  return /* @__PURE__ */ o(H, { children: [
    /* @__PURE__ */ o("tr", { "data-testid": `run-compare-row-${t.nodeId}`, className: i, children: [
      /* @__PURE__ */ o("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: [
        /* @__PURE__ */ e("div", { className: "font-semibold text-text-primary", children: t.name }),
        /* @__PURE__ */ e("div", { className: "font-mono text-[11px] text-text-tertiary", children: t.nodeId })
      ] }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ e(_r, { step: t.a, branch: t.branchA, isCondition: t.isCondition }) }),
      /* @__PURE__ */ e("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", i), children: /* @__PURE__ */ e(_r, { step: t.b, branch: t.branchB, isCondition: t.isCondition }) }),
      /* @__PURE__ */ o(
        "td",
        {
          className: I("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", i),
          "data-testid": `run-compare-delta-${t.nodeId}`,
          children: [
            t.branchDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#2563eb]", children: "different branch!" }) : t.statusDiffers ? /* @__PURE__ */ e("span", { className: "font-semibold text-[#dc2626]", children: "status differs" }) : t.durationDelta != null ? /* @__PURE__ */ e("span", { className: t.durationLarge ? "text-[#d97706]" : "text-text-secondary", children: Bp(t.durationDelta) }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "—" }),
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
          Vp,
          {
            a: r?.response ?? "",
            b: n?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function Hp({ runA: t, runB: r, def: n }) {
  const a = V(() => qp(t, r, n), [t, r, n]);
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
        /* @__PURE__ */ e("tbody", { children: a.map((i) => /* @__PURE__ */ e(Jp, { row: i }, i.nodeId)) })
      ]
    }
  );
}
function Kp(t) {
  return t == null ? "—" : `${t > 0 ? "+" : (t < 0, "")}${ke(Math.abs(t))}`.replace(/^(\+|-)?/, t === 0 ? "" : t > 0 ? "+" : "-");
}
function Gp(t) {
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
function Yp(t) {
  const r = /* @__PURE__ */ new Map();
  if (!t) return r;
  for (const n of t.nodes)
    n.data.type === "llm" && r.set(n.id, n.data.model);
  return r;
}
function Lr(t, r) {
  const n = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
    model: r.get(a.nodeId),
    tokensIn: a.llm?.tokensIn ?? 0,
    tokensOut: a.llm?.tokensOut ?? 0
  }));
  return Et(xt(n).total);
}
function Br({
  label: t,
  run: r,
  cost: n,
  testIdPrefix: a
}) {
  const i = Gp(r.status);
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
          /* @__PURE__ */ e(ie, { tone: i, children: r.status }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", children: ke(r.durationMs) }),
          /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ e("span", { className: "font-mono", "data-testid": `${a}-cost`, children: n })
        ] })
      ]
    }
  );
}
function xm() {
  const { pipelineId: t, runIdA: r, runIdB: n } = mt(), a = Ee(), i = V(
    () => t ? tt(t) : null,
    [t]
  ), s = V(
    () => t && r ? Gt(t, r) : null,
    [t, r]
  ), d = V(
    () => t && n ? Gt(t, n) : null,
    [t, n]
  ), c = V(() => Yp(i), [i]);
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
  const l = (d.durationMs ?? 0) - (s.durationMs ?? 0), p = Lr(s, c), u = Lr(d, c), x = (/* @__PURE__ */ new Set([
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
      /* @__PURE__ */ e(Br, { label: "Run A", run: s, cost: p, testIdPrefix: "run-a" }),
      /* @__PURE__ */ e(Br, { label: "Run B", run: d, cost: u, testIdPrefix: "run-b" })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
        "data-testid": "run-compare-delta",
        children: [
          /* @__PURE__ */ e("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Δ duration" }),
          /* @__PURE__ */ e("span", { className: "font-mono text-[13px]", children: Kp(l) }),
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
    /* @__PURE__ */ e(Hp, { runA: s, runB: d, def: i })
  ] });
}
function Xp(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${ke(Math.abs(t))}`;
}
function Fr(t) {
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
function Qp({
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
              /* @__PURE__ */ e(ie, { tone: Fr(t.status), children: t.status })
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
              /* @__PURE__ */ e(ie, { tone: Fr(r.status), children: r.status })
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
              children: Xp(d)
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
function Zp(t) {
  return t === 0 ? "0ms" : `${t > 0 ? "+" : "-"}${ke(Math.abs(t))}`;
}
function Ur(t) {
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
function eu(t, r) {
  if (!t) return r;
  const n = t.nodes.find((a) => a.id === r);
  return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : r;
}
function tu(t, r, n) {
  const a = /* @__PURE__ */ new Set(), i = [];
  if (n)
    for (const s of n.nodes)
      (t.steps[s.id] || r.steps[s.id]) && (i.push(s.id), a.add(s.id));
  for (const s of [...Object.keys(t.steps), ...Object.keys(r.steps)])
    a.has(s) || (i.push(s), a.add(s));
  return i.map((s) => {
    const d = t.steps[s], c = r.steps[s], l = d?.durationMs, p = c?.durationMs, u = l != null && p != null ? p - l : void 0, x = !!d && !!c && d.status !== c.status, h = !!d && !c, f = !d && !!c, g = d?.llm ? d.llm.tokensIn + d.llm.tokensOut : void 0, m = c?.llm ? c.llm.tokensIn + c.llm.tokensOut : void 0, N = g != null && m != null ? m - g : void 0;
    return {
      nodeId: s,
      name: eu(n, s),
      a: d,
      b: c,
      durationDelta: u,
      statusDiffers: x,
      onlyInA: h,
      onlyInB: f,
      tokenDelta: N
    };
  });
}
function nu({ runA: t, runB: r, def: n }) {
  const a = V(() => tu(t, r, n), [t, r, n]);
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
            /* @__PURE__ */ e(ie, { tone: Ur(i.a.status), children: i.a.status }),
            /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-text-secondary", children: ke(i.a.durationMs) }),
            i.a.llm && /* @__PURE__ */ o("span", { className: "text-[10px] text-text-tertiary", children: [
              i.a.llm.tokensIn,
              " in / ",
              i.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ e("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ e("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: i.b ? /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ e(ie, { tone: Ur(i.b.status), children: i.b.status }),
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
                children: Zp(i.durationDelta)
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
function ru(t, r) {
  if (!t) return r;
  const n = t.nodes.find((a) => a.id === r);
  return n ? n.data.type === "condition" && n.data.label ? n.data.label : n.type.charAt(0).toUpperCase() + n.type.slice(1) : r;
}
function Xt(t, r = "", n = 0) {
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
        for (const [c, l] of Xt(t[s], d, n + 1))
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
      for (const [l, p] of Xt(d, c, n + 1))
        a.set(l, p);
    }
  return a;
}
function fo(t, r) {
  const n = Xt(t), a = Xt(r), i = /* @__PURE__ */ new Set([...n.keys(), ...a.keys()]), s = [];
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
const ou = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function au({
  nodeId: t,
  name: r,
  outputA: n,
  outputB: a
}) {
  const [i, s] = $(!1), d = V(() => fo(n, a), [n, a]), c = d.filter((l) => l.type !== "unchanged").length;
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
              ou[l.type]
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
function iu({ runA: t, runB: r, def: n }) {
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
    au,
    {
      nodeId: i,
      name: ru(n, i),
      outputA: t.steps[i]?.output,
      outputB: r.steps[i]?.output
    },
    i
  )) });
}
function su(t) {
  const r = /* @__PURE__ */ new Map();
  if (!t) return r;
  for (const n of t.nodes)
    n.data.type === "llm" && r.set(n.id, n.data.model);
  return r;
}
function jr(t, r) {
  const n = Object.values(t.steps).filter((a) => !!a.llm).map((a) => ({
    model: r.get(a.nodeId),
    tokensIn: a.llm?.tokensIn ?? 0,
    tokensOut: a.llm?.tokensOut ?? 0
  }));
  return Et(xt(n).total);
}
function Jt({
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
              n && /* @__PURE__ */ e(ie, { tone: "info", className: "ml-auto", children: n })
            ]
          }
        ),
        s && /* @__PURE__ */ e("div", { className: "p-4", children: a })
      ]
    }
  );
}
const lu = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function cu({
  runA: t,
  runB: r
}) {
  const n = V(
    () => fo(t.context, r.context),
    [t.context, r.context]
  ), a = n.filter((i) => i.type !== "unchanged").length;
  return /* @__PURE__ */ e(
    Jt,
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
            lu[i.type]
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
function du({ pipelineId: t, runIdA: r, runIdB: n }) {
  const a = Ee(), i = V(
    () => tt(t),
    [t]
  ), s = V(
    () => Gt(t, r),
    [t, r]
  ), d = V(
    () => Gt(t, n),
    [t, n]
  ), c = V(() => su(i), [i]);
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
  const l = jr(s, c), p = jr(d, c);
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
        /* @__PURE__ */ e(Jt, { title: "Summary", testId: "diff-summary-section", children: /* @__PURE__ */ e(
          Qp,
          {
            runA: s,
            runB: d,
            costA: l,
            costB: p
          }
        ) }),
        /* @__PURE__ */ e(
          Jt,
          {
            title: "Step-by-step comparison",
            badge: `${Object.keys(s.steps).length + Object.keys(d.steps).length > 0 ? "steps" : "0 steps"}`,
            testId: "diff-steps-section",
            children: /* @__PURE__ */ e(nu, { runA: s, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ e(
          Jt,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ e(iu, { runA: s, runB: d, def: i })
          }
        ),
        /* @__PURE__ */ e(cu, { runA: s, runB: d })
      ]
    }
  );
}
function gm() {
  const { pipelineId: t } = mt(), [r] = Qt(), n = r.get("a"), a = r.get("b");
  return !t || !n || !a ? /* @__PURE__ */ e(ht, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ e(du, { pipelineId: t, runIdA: n, runIdB: a });
}
function bm() {
  const t = Ee(), [r, n] = Qt(), [a, i] = $([]), { runs: s } = ft();
  Z(() => {
    let y = !1;
    return (async () => {
      const k = Wn(), b = [];
      await Promise.all(
        k.map(async (w) => {
          try {
            const { runs: C } = await Kr(w.id, { limit: 50 });
            if (C.length > 0) {
              for (const R of C)
                R.id && b.push({ ...R, pipelineName: w.name });
              return;
            }
          } catch {
          }
          for (const C of Kt(w.id))
            C.id && b.push({ ...C, pipelineName: w.name });
        })
      ), !y && (b.sort((w, C) => C.startedAt.localeCompare(w.startedAt)), i(b));
    })(), () => {
      y = !0;
    };
  }, []);
  const d = V(() => {
    const y = new Map(Wn().map((w) => [w.id, w.name])), k = new Set(a.map((w) => w.id)), b = [];
    for (const [w, C] of Object.entries(s))
      k.has(w) || C.pipelineId && b.push({
        ...C,
        pipelineName: y.get(C.pipelineId) ?? `Pipeline ${C.pipelineId.slice(0, 8)}`
      });
    return b.length === 0 ? a : [...b, ...a].sort((w, C) => C.startedAt.localeCompare(w.startedAt));
  }, [a, s]), { query: c, statuses: l, triggerKinds: p, range: u } = V(
    () => mo(r),
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
  }, N = V(
    () => uo(d, { query: c, statuses: l, triggerKinds: p, range: u }),
    [d, c, l, p, u]
  ), v = V(() => {
    const y = {};
    for (const k of N) {
      const b = Object.values(k.steps).filter((C) => !!C.llm).map((C) => ({
        model: void 0,
        tokensIn: C.llm?.tokensIn ?? 0,
        tokensOut: C.llm?.tokensOut ?? 0
      })), w = xt(b);
      w.total.totalCostUsd > 0 && (y[k.id] = Et(w.total));
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
      ho,
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
    N.length === 0 ? /* @__PURE__ */ e(
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
      /* @__PURE__ */ e("tbody", { children: N.map((y) => /* @__PURE__ */ o(
        "tr",
        {
          onClick: () => t(`/pipelines/${y.pipelineId}/runs/${y.id}`),
          className: "border-b border-border cursor-pointer hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-medium", children: y.pipelineName }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: y.id.slice(0, 11) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ e(ie, { tone: Fn(y.status).tone, size: "sm", children: y.status }) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: y.triggerType ?? y.triggeredBy?.triggerType }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: nd(y.startedAt) }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: y.completedAt ? ke(new Date(y.completedAt).getTime() - new Date(y.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ e("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: v[y.id] ?? "—" })
          ]
        },
        y.id
      )) })
    ] }) })
  ] });
}
function xo(t) {
  let r = 0, n = 0;
  for (const a of Object.values(t.steps ?? {}))
    a.llm && (r += a.llm.tokensIn ?? 0, n += a.llm.tokensOut ?? 0);
  return { tokensIn: r, tokensOut: n };
}
function pu(t) {
  const r = /* @__PURE__ */ new Map();
  if (!t) return r;
  for (const n of t.nodes)
    n.data.type === "llm" && r.set(n.id, n.data.model);
  return r;
}
function uu(t, r) {
  const n = [];
  for (const a of Object.values(t.steps ?? {}))
    a.llm && n.push({
      model: r.get(a.nodeId),
      tokensIn: a.llm.tokensIn,
      tokensOut: a.llm.tokensOut
    });
  return xt(n).total.totalCostUsd;
}
function zr(t, r) {
  if (t.length === 0) return 0;
  const n = Math.min(t.length - 1, Math.floor(t.length * r));
  return t[n];
}
function qr(t) {
  return t < 0.01 ? `$${t.toFixed(4)}` : t < 1 ? `$${t.toFixed(3)}` : `$${t.toFixed(2)}`;
}
function Wr(t) {
  const r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(r) ? `$${r.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function mu(t) {
  return t.slice(0, 8);
}
function hu(t) {
  const r = Date.now() - new Date(t).getTime();
  return r < 6e4 ? "just now" : r < 36e5 ? `${Math.floor(r / 6e4)}m ago` : r < 864e5 ? `${Math.floor(r / 36e5)}h ago` : r < 2592e5 ? `${Math.floor(r / 864e5)}d ago` : new Date(t).toLocaleDateString();
}
function fu(t, r) {
  const n = t.length;
  let a = 0, i = 0, s = 0;
  const d = [];
  let c = 0, l = 0, p = 0;
  const u = /* @__PURE__ */ new Map();
  for (const m of t) {
    m.status === "completed" ? a++ : m.status === "failed" ? i++ : m.status === "cancelled" && s++, typeof m.durationMs == "number" && m.durationMs > 0 && d.push(m.durationMs);
    const N = xo(m);
    if (c += N.tokensIn, l += N.tokensOut, p += uu(m, r), m.error?.message) {
      const v = m.error.message.slice(0, 48), y = u.get(v);
      y ? (y.count += 1, m.startedAt > y.lastSeenAt && (y.lastSeenAt = m.startedAt, y.exampleRunId = m.id)) : u.set(v, { count: 1, lastSeenAt: m.startedAt, exampleRunId: m.id });
    }
  }
  d.sort((m, N) => m - N);
  const x = zr(d, 0.5), h = zr(d, 0.95), f = n === 0 ? 0 : Math.round(a / n * 100), g = [...u.entries()].map(([m, N]) => ({ key: m, count: N.count, lastSeenAt: N.lastSeenAt, exampleRunId: N.exampleRunId })).sort((m, N) => N.count - m.count).slice(0, 5);
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
function xu(t) {
  return t >= 90 ? "#16a34a" : t >= 70 ? "#f59e0b" : "#dc2626";
}
function gu(t) {
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
function bu(t, r) {
  const a = [...t].sort((s, d) => s.startedAt.localeCompare(d.startedAt)).filter((s) => typeof s.durationMs == "number" && s.durationMs > 0).map((s) => ({ x: new Date(s.startedAt).getTime(), y: s.durationMs })), i = a.map((s) => ({ x: s.x, y: r }));
  return [
    { label: "Duration (ms)", data: a, color: "#646cff" },
    { label: "p50", data: i, color: "#94a3b8" }
  ];
}
function yu(t) {
  const r = [...t].sort((i, s) => i.startedAt.localeCompare(s.startedAt)), n = [], a = [];
  for (const i of r) {
    const s = new Date(i.startedAt).getTime(), { tokensIn: d, tokensOut: c } = xo(i);
    n.push({ x: s, y: d }), a.push({ x: s, y: c });
  }
  return [
    { label: "Tokens in", data: n, color: "#646cff" },
    { label: "Tokens out", data: a, color: "#16a34a" }
  ];
}
function ym() {
  const { pipelineId: t } = mt(), r = Ee(), [n, a] = $(null), [i, s] = $([]), [d, c] = $("50");
  Z(() => {
    t && (a(tt(t)), s(Kt(t)));
  }, [t]);
  const l = V(() => {
    if (d === "all") return i;
    const m = Number(d);
    return i.slice(0, m);
  }, [i, d]), p = V(() => pu(n), [n]), u = V(() => fu(l, p), [l, p]), x = V(
    () => np(l, n).filter((m) => m.totalCostUsd > 0 || m.stepCount > 0),
    [l, n]
  ), h = V(() => ap(i, n, 30), [i, n]), f = V(
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
    g ? /* @__PURE__ */ o(H, { children: [
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
                  style: { color: xu(u.successRatePct) },
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
              /* @__PURE__ */ e("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: qr(u.totalCost) }),
              /* @__PURE__ */ o("div", { className: "text-xs text-text-tertiary font-mono", children: [
                qr(u.costPerRun),
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
                na,
                {
                  data: x.map((m) => ({
                    label: m.label,
                    cost: Number(m.totalCostUsd.toFixed(6))
                  })),
                  xKey: "label",
                  yKey: "cost",
                  height: 200,
                  color: "#646cff",
                  yFormat: Wr
                }
              )
            ] }),
            /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-trend-30d", children: [
              /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "30-day spend trend" }),
              /* @__PURE__ */ e(
                _t,
                {
                  series: f,
                  height: 200,
                  xFormat: (m) => new Date(Number(m)).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric"
                  }),
                  yFormat: Wr
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
            _t,
            {
              series: gu(l),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString()
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Duration over time" }),
          /* @__PURE__ */ e(
            _t,
            {
              series: bu(l, u.medianMs),
              height: 180,
              xFormat: (m) => new Date(Number(m)).toLocaleDateString(),
              yFormat: (m) => ke(m)
            }
          )
        ] }),
        /* @__PURE__ */ o("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ e("div", { className: "text-[13px] font-semibold text-text-primary", children: "Token usage over time" }),
          /* @__PURE__ */ e(
            _t,
            {
              series: yu(l),
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
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5 text-text-secondary", children: hu(m.lastSeenAt) }),
              /* @__PURE__ */ e("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => r(`/pipelines/${t}/runs/${m.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    mu(m.exampleRunId),
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
function vu(t) {
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
function Nu(t) {
  return t.length <= 6 ? t : t.slice(-6);
}
function wu({ approver: t, idx: r }) {
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
function ku(t, r) {
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
function Cu({ row: t, onSubmit: r, onOpenPipeline: n }) {
  const [a, i] = $(""), s = E(
    (p) => {
      r(p, a.trim()), i("");
    },
    [a, r]
  ), d = t.requiredCount ?? 1, c = t.recordedCount ?? 0, l = V(() => ku(t.runContext, t.runSteps), [t.runContext, t.runSteps]);
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
            Nu(t.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: vu(t.requestedAt) })
    ] }),
    t.message ? /* @__PURE__ */ e("div", { "data-testid": `approval-message-${t.runId}`, className: "text-[13px] text-text-secondary bg-[#fafbfc] px-3 py-2 rounded-md leading-normal", children: t.message }) : null,
    /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5 px-3 py-2.5 bg-[#fafbfc] rounded-md border border-border", children: [
      /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: l.length > 0 ? "Context" : "Run details" }),
      l.length > 0 ? l.map(({ label: p, value: u }) => /* @__PURE__ */ o("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ e("div", { className: "text-[11px] font-medium text-text-secondary", children: p }),
        /* @__PURE__ */ e("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: u })
      ] }, p)) : /* @__PURE__ */ o(H, { children: [
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
      t.approvers.length === 0 ? /* @__PURE__ */ e("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : t.approvers.map((p, u) => /* @__PURE__ */ e(wu, { approver: p, idx: u }, u)),
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
function vm() {
  const t = Ee(), { approvals: r, isLoading: n, error: a, retry: i } = Lo(), { resolveApproval: s, runs: d } = ft(), [c, l] = $(
    () => /* @__PURE__ */ new Set()
  );
  Z(() => {
    if (c.size === 0) return;
    const m = new Set(r.map((y) => `${y.runId}::${y.stepId}`));
    let N = !1;
    const v = new Set(c);
    for (const y of c)
      m.has(y) || (v.delete(y), N = !0);
    N && l(v);
  }, [r, c]);
  const [p, u] = $({}), x = oe(/* @__PURE__ */ new Set());
  Z(() => {
    for (const m of r)
      x.current.has(m.runId) || (x.current.add(m.runId), Bo(m.pipelineId, m.runId).then((N) => {
        N && u((v) => ({
          ...v,
          [m.runId]: { context: N.context, steps: N.steps }
        }));
      }));
  }, [r]);
  const h = V(() => {
    const m = /* @__PURE__ */ new Map(), N = [];
    for (const v of r) {
      const y = `${v.runId}::${v.stepId}`;
      if (c.has(y)) continue;
      let k = m.get(v.pipelineId);
      k === void 0 && (k = tt(v.pipelineId), m.set(v.pipelineId, k));
      const b = k?.name ?? (v.pipelineId ? `Pipeline ${v.pipelineId.slice(0, 8)}` : "Unknown pipeline"), w = p[v.runId]?.context ?? d[v.runId]?.context, C = p[v.runId]?.steps;
      N.push({ ...v, pipelineName: b, runContext: w, runSteps: C });
    }
    return N;
  }, [r, c, d, p]), f = E(
    (m, N, v, y, k) => {
      s(N, v, y, k || void 0), l((b) => {
        const w = new Set(b);
        return w.add(`${N}::${v}`), w;
      }), fetch(`/api/pipelines/${encodeURIComponent(N)}/approvals`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: v, decision: y, ...k ? { comment: k } : {} })
      }).catch((b) => {
        console.error("[approvals] POST failed", b);
      }), t(`/pipelines/${m}/runs/${N}`);
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
      n && g === 0 ? /* @__PURE__ */ o("div", { "data-testid": "approvals-loading", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: [
        /* @__PURE__ */ e(tn, { height: 140 }),
        /* @__PURE__ */ e(tn, { height: 140 }),
        /* @__PURE__ */ e(tn, { height: 140 })
      ] }) : g === 0 && !a ? /* @__PURE__ */ e(
        Le,
        {
          icon: "✋",
          title: "No pending approvals",
          body: "When a pipeline reaches an approval step, it'll show up here.",
          testId: "approvals-empty"
        }
      ) : /* @__PURE__ */ e("div", { "data-testid": "approvals-list", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: h.map((m) => /* @__PURE__ */ e(
        Cu,
        {
          row: m,
          onOpenPipeline: () => t(`/pipelines/${m.pipelineId}`),
          onSubmit: (N, v) => f(m.pipelineId, m.runId, m.stepId, N, v)
        },
        `${m.runId}:${m.stepId}`
      )) })
    ] })
  ] });
}
function Nm({ data: t, onChange: r }) {
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
        Yt,
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
        Yt,
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
const Iu = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.crop.output.imageId"
], Su = [
  "{{scatter.item.label}}",
  "{{scatter.index}}",
  "{{scatter.parentImageId}}"
];
function Vr({
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
function wm({ data: t, onChange: r }) {
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
        Yt,
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
        Vr,
        {
          samples: Iu,
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
        Yt,
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
          Vr,
          {
            samples: Su,
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
function $u({ result: t, className: r }) {
  const { caption: n, setting: a, location: i, timeOfDay: s, mood: d, colors: c } = t;
  return !n && !a && !i && !s && !d && (!c || c.length === 0) ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-2", r), children: [
    n ? /* @__PURE__ */ e("p", { className: "text-base leading-relaxed text-text-primary", children: n }) : null,
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
const Tu = {
  people: { stroke: "#4f46e5", fill: "rgba(79,70,229,0.10)", text: "bg-indigo-600 text-white" },
  object: { stroke: "#d97706", fill: "rgba(217,119,6,0.10)", text: "bg-amber-600 text-white" }
};
function Au({
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
  const x = r ?? t, [h, f] = $(null), g = oe(null), m = E(() => {
    const y = g.current;
    y && (!n || !a) && f({ w: y.naturalWidth, h: y.naturalHeight });
  }, [n, a]), N = V(() => n && a && n > 0 && a > 0 ? { w: n, h: a } : h && h.w > 0 && h.h > 0 ? h : null, [n, a, h]), v = (y, k, b, w, C) => {
    if (!N) return null;
    const R = Math.max(0, Math.min(y.x1, N.w)), S = Math.max(0, Math.min(y.y1, N.h)), A = Math.max(0, Math.min(y.x2, N.w)), P = Math.max(0, Math.min(y.y2, N.h));
    if (!Number.isFinite(R) || !Number.isFinite(S) || !Number.isFinite(A) || !Number.isFinite(P) || A <= R || P <= S) return null;
    const X = R / N.w * 100, ee = S / N.h * 100, re = (A - R) / N.w * 100, le = (P - S) / N.h * 100, de = Tu[b];
    return /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: w,
        title: k,
        "aria-label": `${b === "people" ? "Person" : "Object"} bounding box: ${k}`,
        className: "group absolute m-0 cursor-pointer border-0 p-0 outline-none focus:ring-2 focus:ring-offset-1",
        style: {
          left: `${X}%`,
          top: `${ee}%`,
          width: `${re}%`,
          height: `${le}%`,
          background: de.fill,
          border: `2px solid ${de.stroke}`,
          borderRadius: "2px"
        },
        children: /* @__PURE__ */ e(
          "span",
          {
            className: I(
              "pointer-events-none absolute -top-5 left-0 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none shadow",
              de.text
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
            (y, k) => v(
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
function Ru(t) {
  return {
    imageUrl: t.imageUrl,
    imageDataUrl: t.imageDataUrl,
    imageWidth: t.imageWidth,
    imageHeight: t.imageHeight,
    people: t.people,
    objects: t.objects
  };
}
function Pu({ people: t, highlightedIndex: r, onSelect: n, className: a }) {
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
      ), l = /* @__PURE__ */ o(H, { children: [
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
function Mu({ objects: t, onSelect: r, className: n }) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", n), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Objects (",
      t.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "grid grid-cols-1 gap-1 sm:grid-cols-2", children: t.map((a, i) => {
      const s = I(
        "flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 text-left text-[13px]"
      ), d = /* @__PURE__ */ o(H, { children: [
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
function Du({ tags: t, onTagClick: r, className: n }) {
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
function Ht(t) {
  return t ? t === "correct" || t === "neutral" || t === "normal" ? "success" : "warning" : "neutral";
}
function Nn(t) {
  const r = Ht(t);
  return r === "success" ? `OK · ${t}` : r === "warning" ? `ADJUST · ${t}` : t ?? "";
}
function Eu({
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
          /* @__PURE__ */ e(ie, { tone: Ht(t.verdict), size: "sm", children: Nn(t.verdict) }),
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
          /* @__PURE__ */ e(ie, { tone: Ht(r.verdict), size: "sm", children: Nn(r.verdict) }),
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
        /* @__PURE__ */ e("span", { className: "ml-1.5", children: /* @__PURE__ */ e(ie, { tone: Ht(n), size: "sm", children: Nn(n) }) })
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
function km({
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
  const [x, h] = $(), [f, g] = $(!1), m = (v) => h(x === v.index ? void 0 : v.index), N = Ru(t);
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-4 text-text-primary", u), children: [
    /* @__PURE__ */ o("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-12", children: [
      r ? /* @__PURE__ */ o("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ e(
          Au,
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
          typeof t.model.tokensOut == "number" ? /* @__PURE__ */ o(H, { children: [
            /* @__PURE__ */ e("span", { children: "·" }),
            /* @__PURE__ */ o("span", { children: [
              t.model.tokensOut,
              " tok out"
            ] })
          ] }) : null
        ] }) : null
      ] }) : null,
      /* @__PURE__ */ o("div", { className: I("flex flex-col gap-4", r ? "md:col-span-5" : "md:col-span-12"), children: [
        n ? /* @__PURE__ */ e($u, { result: t }) : null,
        a && t.people && t.people.length > 0 ? /* @__PURE__ */ e(
          Pu,
          {
            people: t.people,
            highlightedIndex: x,
            onSelect: m
          }
        ) : null
      ] })
    ] }),
    i && t.objects && t.objects.length > 0 ? /* @__PURE__ */ e(Mu, { objects: t.objects }) : null,
    s && t.tags && t.tags.length > 0 ? /* @__PURE__ */ e(Du, { tags: t.tags, onTagClick: l }) : null,
    d ? /* @__PURE__ */ e(
      Eu,
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
function Cm({
  status: t,
  result: r,
  runId: n,
  endpointLabel: a,
  error: i,
  latencyMs: s,
  onOpen: d,
  className: c
}) {
  const l = a ?? r?.model?.endpointId ?? "vision-model", p = s ?? r?.model?.latencyMs, u = r?.caption, x = (r?.tags ?? []).slice(0, 5), h = /* @__PURE__ */ o(H, { children: [
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
      n ? /* @__PURE__ */ e("span", { className: "ml-auto truncate font-mono text-[10px] text-text-tertiary", children: n }) : null
    ] }),
    t === "failed" && i ? /* @__PURE__ */ e("p", { className: "text-[13px] text-red-700", children: i }) : /* @__PURE__ */ e("p", { className: "line-clamp-2 text-left text-[13px] text-text-primary", children: u ?? (t === "running" ? "Analyzing image…" : "No caption produced.") }),
    x.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1", children: x.map((g) => /* @__PURE__ */ o(ie, { tone: "neutral", size: "sm", children: [
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
function Im(t = {}) {
  const { maxRecords: r = 50, runId: n } = t, [a, i] = $([]), s = oe(/* @__PURE__ */ new Map()), d = oe(!0);
  return Z(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Re("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.image.vision.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || n && u.runId !== n) return;
    const x = `${u.runId}::${u.stepId}`;
    i((h) => {
      const f = s.current.get(x), g = typeof u.at == "number" ? u.at : Date.now(), m = (N) => {
        if (typeof f == "number" && f >= 0 && f < h.length) {
          const k = h.slice();
          return k[f] = { ...h[f], ...N }, k;
        }
        const v = [N, ...h];
        v.length > r && (v.length = r);
        const y = /* @__PURE__ */ new Map();
        return v.forEach((k, b) => y.set(`${k.runId}::${k.stepId}`, b)), s.current = y, v;
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
        const N = typeof f == "number" ? h[f] : void 0;
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
        const N = typeof f == "number" ? h[f] : void 0;
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
  }), V(() => a, [a]);
}
function Ou(t) {
  return t === "pass" ? "success" : t === "fail" ? "danger" : "warning";
}
function _u({ result: t, className: r }) {
  const n = Ou(t.overallVerdict), a = n === "success" ? "PASS" : n === "danger" ? "FAIL" : "INCONCLUSIVE", i = t.rubricSnapshot.passThreshold ?? 0.5;
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
          /* @__PURE__ */ o(ie, { tone: n, size: "sm", children: [
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
            En,
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
function Lu({ result: t, className: r }) {
  if (!t.criteria || t.criteria.length === 0) return null;
  const n = /* @__PURE__ */ new Map();
  for (const a of t.rubricSnapshot.criteria) n.set(a.id, a);
  return /* @__PURE__ */ o("section", { className: I("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ o("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Criteria (",
      t.criteria.length,
      ")"
    ] }),
    /* @__PURE__ */ e("ul", { className: "flex flex-col gap-1.5", children: t.criteria.map((a) => /* @__PURE__ */ e(Bu, { score: a, def: n.get(a.criterionId) }, a.criterionId)) })
  ] });
}
function Bu({
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
      /* @__PURE__ */ e(ie, { tone: n, size: "sm", children: a }),
      /* @__PURE__ */ o("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
        "raw: ",
        String(t.rawScore)
      ] })
    ] }),
    /* @__PURE__ */ e(
      En,
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
const go = vo(null);
function Sm({ value: t, children: r }) {
  return /* @__PURE__ */ e(go.Provider, { value: t, children: r });
}
function bo() {
  return Hr(go);
}
function $m({
  result: t,
  showVerdict: r = !0,
  showCriteria: n = !0,
  showMetadata: a = !0,
  showRawText: i = !1,
  className: s
}) {
  const d = bo(), [c, l] = $(!1), [p, u] = $(null), [x, h] = $(!1), [f, g] = $(null), m = oe(!0);
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
  const N = t.rawModelText ?? p ?? null, v = !!t.rawModelText || !!t.rawTextTruncated;
  return /* @__PURE__ */ o("div", { className: I("flex w-full flex-col gap-3 text-text-primary", s), children: [
    r ? /* @__PURE__ */ e(_u, { result: t }) : null,
    n ? /* @__PURE__ */ e(Lu, { result: t }) : null,
    a ? /* @__PURE__ */ o("section", { className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
      /* @__PURE__ */ o("span", { children: [
        "tokens ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: t.tokensIn }),
        " in /",
        " ",
        /* @__PURE__ */ e("span", { className: "font-mono", children: t.tokensOut }),
        " out"
      ] }),
      t.cacheReadTokens && t.cacheReadTokens > 0 ? /* @__PURE__ */ o(H, { children: [
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
        Fu,
        {
          text: N,
          loading: x,
          error: f,
          fallbackHint: t.rawTextTruncated && !d ? "Raw text was spilled to S3 but no JudgmentApi provider is wired." : null
        }
      ) : null
    ] }) : null
  ] });
}
function Fu({
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
function Tm({ aggregate: t, className: r }) {
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
          /* @__PURE__ */ o(ie, { tone: i, size: "sm", children: [
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
            En,
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
          typeof t.minOverallScore == "number" && typeof t.maxOverallScore == "number" ? /* @__PURE__ */ o(H, { children: [
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
function Am({
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
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ o("tr", { className: "text-left text-[11px] uppercase tracking-wide text-text-tertiary", children: [
        /* @__PURE__ */ e("th", { scope: "col", className: "py-1 pr-2", children: "date" }),
        /* @__PURE__ */ e("th", { scope: "col", className: "py-1 pr-2", children: "pass" }),
        /* @__PURE__ */ e("th", { scope: "col", className: "py-1 pr-2", children: "mean" }),
        /* @__PURE__ */ e("th", { scope: "col", className: "py-1 pr-2 text-right", children: "judgments" }),
        /* @__PURE__ */ e("th", { scope: "col", className: "py-1 pl-2 text-right", children: "cost" })
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: s.map((x) => /* @__PURE__ */ e(Uu, { row: x }, x.aggregateKey)) })
    ] })
  ] });
}
function Uu({ row: t }) {
  const r = t.numJudgments > 0 ? t.numPassed / t.numJudgments : 0, n = t.numJudgments > 0 ? t.sumOverallScore / t.numJudgments : 0, a = r >= 0.9 ? "success" : r >= 0.6 ? "warning" : "danger";
  return /* @__PURE__ */ o("tr", { className: "border-t border-border", children: [
    /* @__PURE__ */ e("td", { className: "py-1 pr-2 font-mono", children: t.dayBucket }),
    /* @__PURE__ */ e("td", { className: "py-1 pr-2", children: /* @__PURE__ */ o(ie, { tone: a, size: "sm", children: [
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
function ju(t) {
  if (typeof t == "number") return t;
  if (typeof t == "string") {
    const r = Date.parse(t);
    if (Number.isFinite(r)) return r;
  }
  return Date.now();
}
function Rm(t = {}) {
  const { maxRecords: r = 50, runId: n } = t, [a, i] = $([]), s = oe(/* @__PURE__ */ new Map()), d = oe(!0);
  return Z(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Re("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.judge.")) return;
    const u = l.payload;
    if (!u || typeof u.runId != "string" || typeof u.stepId != "string" || n && u.runId !== n) return;
    const x = `${u.runId}::${u.stepId}`;
    i((h) => {
      const f = s.current.get(x), g = ju(u.at), m = (N) => {
        if (typeof f == "number" && f >= 0 && f < h.length) {
          const k = h.slice();
          return k[f] = { ...h[f], ...N }, k;
        }
        const v = [N, ...h];
        v.length > r && (v.length = r);
        const y = /* @__PURE__ */ new Map();
        return v.forEach((k, b) => y.set(`${k.runId}::${k.stepId}`, b)), s.current = y, v;
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
        const N = typeof f == "number" ? h[f] : void 0;
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
        const N = typeof f == "number" ? h[f] : void 0;
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
        const N = typeof f == "number" ? h[f] : void 0;
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
  }), V(() => a, [a]);
}
function Pm(t) {
  const r = bo(), [n, a] = $([]), [i, s] = $(!1), [d, c] = $(null), l = oe(!0), p = oe(() => {
  }), { pipelineId: u, rubricId: x, since: h, until: f, limit: g, refreshIntervalMs: m = 0, paused: N = !1 } = t, v = `${u ?? ""}|${x ?? ""}|${h ?? ""}|${f ?? ""}|${g ?? ""}|${N ? "1" : "0"}`;
  return Z(() => (l.current = !0, () => {
    l.current = !1;
  }), []), Z(() => {
    if (!r) {
      a([]), s(!1), c(null);
      return;
    }
    if (N) return;
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
  }, [r, v, m]), {
    aggregates: n,
    loading: i,
    error: d,
    reload: () => p.current()
  };
}
export {
  wa as ActionNode,
  rc as AdjustBwConfig,
  Ya as AdjustBwNode,
  lc as AdjustLayerConfig,
  Qa as AdjustLayerNode,
  _a as AgUiOutputNode,
  Aa as AgentNode,
  Tm as AggregateSummaryCard,
  bm as AllRunsPage,
  Ta as ApprovalNode,
  fe as BaseNode,
  $u as CaptionPanel,
  va as ConditionNode,
  Lu as CriteriaPanel,
  ec as CropConfig,
  Ga as CropNode,
  Yc as EditPromptConfig,
  pi as EditPromptNode,
  Eu as EditRecommendationsPanel,
  Lm as EventStreamProvider,
  ka as ForkNode,
  Wl as FormatConvertConfig,
  Va as FormatConvertNode,
  jc as GenerateConfig,
  li as GenerateNode,
  Ma as GraphQueryNode,
  Ea as GuardrailNode,
  Nm as ImageSourceConfig,
  La as ImageSourceNode,
  Au as ImageWithBBoxOverlay,
  Sa as JoinNode,
  Sm as JudgmentApiProvider,
  $m as JudgmentResultViewer,
  Am as JudgmentTrendChart,
  Pa as KnowledgeBaseNode,
  xa as LLMNode,
  Ra as McpToolNode,
  Da as MemoryNode,
  Mu as ObjectsPanel,
  vm as PendingApprovalsPage,
  Pu as PeoplePanel,
  Bi as PipelineCanvas,
  Co as PipelineEditorContext,
  um as PipelineEditorPage,
  Gr as PipelineEditorProvider,
  Em as PipelineEditorServicesProvider,
  xm as PipelineRunComparePage,
  gm as PipelineRunDiff,
  fm as PipelineRunReplayPage,
  hm as PipelineRunsPage,
  Eo as PipelineRunsProvider,
  ym as PipelineStatsPage,
  mm as PipelinesPage,
  Oa as PolicyNode,
  Ml as ResizeConfig,
  ja as ResizeNode,
  wm as SaveConfig,
  Ba as SaveNode,
  Tl as ScatterConfig,
  Ua as ScatterNode,
  Hl as SharpenConfig,
  Ja as SharpenNode,
  Du as TagsPanel,
  Fl as TransformGeoConfig,
  qa as TransformGeoNode,
  ba as TransformNode,
  ma as TriggerNode,
  Jc as VariationConfig,
  ci as VariationNode,
  _u as VerdictPanel,
  Cc as VisionClassifyConfig,
  ri as VisionClassifyNode,
  yc as VisionConfig,
  Ac as VisionDescribeConfig,
  oi as VisionDescribeNode,
  Fc as VisionExtractTextConfig,
  ii as VisionExtractTextNode,
  ni as VisionNode,
  km as VisionResultViewer,
  Cm as VisionRunCard,
  Ec as VisionTagConfig,
  ai as VisionTagNode,
  Xl as WatermarkConfig,
  Ha as WatermarkNode,
  Ru as imageOverlayPropsFrom,
  ui as nodeTypes,
  Re as useEventStream,
  ta as useEventStreamContext,
  Pe as useImageUrl,
  Pm as useJudgmentAggregates,
  bo as useJudgmentApi,
  Rm as useJudgmentResults,
  he as useLatestStepForNode,
  Ye as usePipelineEditor,
  Om as usePipelineEditorServices,
  ft as usePipelineRuns,
  Se as useRetryFromStep,
  Im as useVisionResults
};
