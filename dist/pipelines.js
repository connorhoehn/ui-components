import { jsxs as a, jsx as t, Fragment as X } from "react/jsx-runtime";
import Dn, { useState as R, useRef as ae, useMemo as B, useEffect as J, useCallback as P, useContext as Yn } from "react";
import { useNavigate as Me, useParams as nt, Navigate as rt, useSearchParams as wt } from "react-router";
import { o as ke, p as Te, q as ot, u as st, g as Xn, f as Qn, e as Ht, n as Zn, t as er, k as Rn, a as Ye, v as $n, w as Ot, x as $t, y as Mn, z as tr, A as nr, B as rr, b as or, C as Xe, D as sr, E as ar, F as Qe, G as Kt, H as ir, h as lr, m as Pn, I as yt, J as dr, j as Wt, P as cr, K as pr, r as ur, L as vt, l as Vt, M as mr, i as fr } from "./pipelineAudit-CRdqcwiW.js";
import { Handle as ee, Position as te, useNodeConnections as hr, getSmoothStepPath as xr, EdgeLabelRenderer as gr, ReactFlowProvider as br, useReactFlow as yr, useNodesState as vr, useEdgesState as Nr, ReactFlow as wr, Background as kr, BackgroundVariant as Cr, Controls as Ir, MiniMap as Sr } from "@xyflow/react";
/* empty css               */
import { c as A } from "./cn-B6yFEsav.js";
import { u as Lt, a as kt } from "./ToastProvider-aHBNxMTO.js";
import "clsx";
import "tailwind-merge";
import { M as je } from "./Modal-2jg4229_.js";
import "react-dom";
import "./WebSocketContext-DPGFyPeZ.js";
import { u as Tr, I as Ar, C as _t, T as Dr } from "./TagEditor-Dc6-WL1y.js";
import { a as $e, u as Rr } from "./EventStreamContext-CjzSHXy-.js";
import { E as Td } from "./EventStreamContext-CjzSHXy-.js";
import { a as Ue, B as Ze } from "./Banner-B8AcwPH_.js";
import { I as ct } from "./IconButton-Da1kJ5WO.js";
import { u as Ut } from "./IdentityContext-CLalsm_M.js";
import { C as xe } from "./Chip-BXdhqVFm.js";
import { E as Oe } from "./EmptyState-D_CN3LUx.js";
import { C as Mt } from "./ConfirmDialog-CNoxvYGu.js";
import { B as $r, L as gt } from "./Chart-ByoxeiYX.js";
import { S as Ct } from "./SkeletonCard-C89GWQ3p.js";
const Mr = "";
function Jt(e, n) {
  const r = e.displayName;
  return typeof r == "string" && r.length > 0 ? r : n.slice(0, 8);
}
function Pr({ value: e, onChange: n, placeholder: r, maxSelect: o }) {
  const { presenceUsers: s } = Tr(), { idToken: i } = Ut(), [c, d] = R(""), [l, p] = R(!1), [f, h] = R(0), [m, x] = R([]), g = ae(null), u = ae(null), v = B(() => {
    const S = new Set(e), T = [];
    for (const $ of s)
      S.has($.clientId) || (S.add($.clientId), T.push({
        userId: $.clientId,
        displayName: Jt($.metadata, $.clientId)
      }));
    return T;
  }, [s, e]);
  J(() => {
    const S = c.trim();
    if (!S || !i) {
      x([]);
      return;
    }
    const T = new AbortController(), $ = setTimeout(() => {
      const H = `${Mr}/api/profiles?q=${encodeURIComponent(S)}&limit=20`;
      fetch(H, {
        headers: { Authorization: `Bearer ${i}` },
        signal: T.signal
      }).then((V) => V.ok ? V.json() : Promise.reject(new Error(`HTTP ${V.status}`))).then((V) => {
        x(Array.isArray(V.profiles) ? V.profiles : []);
      }).catch(() => {
      });
    }, 250);
    return () => {
      clearTimeout($), T.abort();
    };
  }, [c, i]);
  const N = B(() => {
    const S = new Set(e), T = [];
    for (const $ of v)
      S.has($.userId) || (S.add($.userId), T.push($));
    for (const $ of m)
      S.has($.userId) || (S.add($.userId), T.push({
        userId: $.userId,
        displayName: $.displayName || $.userId.slice(0, 8)
      }));
    return T;
  }, [v, m, e]), w = B(() => {
    const S = c.trim().toLowerCase();
    return S ? N.filter(
      (T) => T.displayName.toLowerCase().includes(S) || T.userId.toLowerCase().includes(S)
    ) : N;
  }, [N, c]), C = typeof o == "number" && e.length >= o, b = (S) => {
    const T = S.trim();
    T && (e.includes(T) || C || (n([...e, T]), d(""), h(0)));
  }, y = (S) => {
    n(e.filter((T) => T !== S));
  }, k = (S) => {
    if (S.key === "ArrowDown")
      S.preventDefault(), p(!0), h((T) => Math.min(T + 1, Math.max(w.length - 1, 0)));
    else if (S.key === "ArrowUp")
      S.preventDefault(), h((T) => Math.max(T - 1, 0));
    else if (S.key === "Enter") {
      S.preventDefault();
      const T = w[f];
      T ? b(T.userId) : c.trim() && b(c.trim());
    } else S.key === "Escape" ? p(!1) : S.key === "Backspace" && !c && e.length > 0 && y(e[e.length - 1]);
  }, D = (S) => {
    const T = s.find((H) => H.clientId === S);
    if (T) return Jt(T.metadata, S);
    const $ = m.find((H) => H.userId === S);
    return $ && $.displayName ? $.displayName : S;
  };
  return /* @__PURE__ */ a("div", { className: "flex flex-col gap-1.5 font-[inherit]", children: [
    e.length > 0 && /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5", children: e.map((S) => /* @__PURE__ */ a(
      "span",
      {
        className: "inline-flex items-center gap-1 bg-[#eef2ff] border border-[#c7d2fe] text-[#3730a3] rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
        children: [
          D(S),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => y(S),
              "aria-label": `Remove ${D(S)}`,
              className: "bg-transparent border-none text-[#3730a3] cursor-pointer text-[14px] leading-none px-0.5 py-0",
              children: "×"
            }
          )
        ]
      },
      S
    )) }),
    /* @__PURE__ */ a("div", { className: "relative", children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: g,
          type: "text",
          value: c,
          disabled: C,
          placeholder: C ? `Max ${o} selected` : r ?? "Search users…",
          onChange: (S) => {
            d(S.target.value), p(!0), h(0);
          },
          onFocus: () => p(!0),
          onBlur: () => {
            u.current = setTimeout(() => p(!1), 120);
          },
          onKeyDown: k,
          className: "w-full py-1.5 px-2.5 text-[13px] border border-[#e2e8f0] rounded-md font-[inherit] box-border outline-none"
        }
      ),
      l && !C && w.length > 0 && /* @__PURE__ */ t(
        "div",
        {
          className: "absolute top-full left-0 right-0 bg-white border border-[#e2e8f0] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
          onMouseDown: (S) => {
            S.preventDefault(), u.current && clearTimeout(u.current);
          },
          children: w.map((S, T) => /* @__PURE__ */ a(
            "div",
            {
              className: A(
                "py-1.5 px-2.5 text-[13px] text-[#374151] cursor-pointer",
                T === f ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              onMouseEnter: () => h(T),
              onClick: () => {
                b(S.userId), g.current?.focus();
              },
              children: [
                /* @__PURE__ */ t("span", { className: "font-medium", children: S.displayName }),
                S.displayName !== S.userId && /* @__PURE__ */ t("span", { className: "text-[#94a3b8] ml-2 text-[11px] font-mono", children: S.userId.slice(0, 12) })
              ]
            },
            S.userId
          ))
        }
      )
    ] })
  ] });
}
const Er = {
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
  "ag-ui-output": []
}, Or = {
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
  "ag-ui-output": ["in"]
};
function Pt(e, n, r, o) {
  return !(!Lr(e, n) || !_r(r, o));
}
function Lr(e, n) {
  const r = Er[e];
  return r === "fork" ? Ur(n) : r.includes(n);
}
function _r(e, n) {
  const r = Or[e];
  return r === null ? !1 : r === "join" ? Br(n) : r.includes(n);
}
function Ur(e) {
  return /^branch-(\d+)$/.exec(e) !== null;
}
function Br(e) {
  return /^in-(\d+)$/.exec(e) !== null;
}
const Fr = {
  idle: { card: "border border-[#d1d5db] bg-white", dot: "bg-[#d1d5db]" },
  pending: { card: "border border-dashed border-[#93c5fd] bg-[#eff6ff]", dot: "bg-[#93c5fd]" },
  running: { card: "border-2 border-[#2563eb] bg-[#eff6ff]", dot: "bg-[#2563eb]" },
  awaiting: { card: "border-2 border-[#f59e0b] bg-[#fffbeb]", dot: "bg-[#f59e0b]" },
  completed: { card: "border border-[#16a34a] bg-[#f0fdf4]", dot: "bg-[#16a34a]" },
  failed: { card: "border-2 border-[#dc2626] bg-[#fef2f2]", dot: "bg-[#dc2626]" },
  skipped: { card: "border border-dashed border-[#d1d5db] bg-[#f9fafb] opacity-50", dot: "bg-[#d1d5db]" }
};
function Ce(e) {
  const { icon: n, subtitle: r, state: o, body: s, footer: i, selected: c, onRetry: d, hasBreakpoint: l, pausedAtBreakpoint: p, ariaLabel: f, children: h } = e, m = Fr[o], x = Lt(), [g, u] = R(!1), v = o === "failed" && typeof d == "function", N = (k) => {
    k.preventDefault(), k.stopPropagation(), d?.();
  }, w = !x && o === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !x && o === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", C = !!(s || i || v), b = !!(s || i), y = r ? `${r}, state: ${o}` : `Node, state: ${o}`;
  return /* @__PURE__ */ a(
    "div",
    {
      className: A(
        "w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        p ? "border-2 border-[#d97706] bg-[#fffbeb] shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]" : m.card,
        !p && c && "shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]",
        !p && !c && "shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
        x && "transition-none"
      ),
      role: "button",
      tabIndex: 0,
      "aria-label": f ?? y,
      "aria-selected": !!c,
      "data-state": o,
      "data-node-state": o,
      "data-pipeline-node": "true",
      children: [
        l && /* @__PURE__ */ t(
          "span",
          {
            "aria-label": "breakpoint",
            "data-testid": "breakpoint-dot",
            className: "absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-[#ef4444] border-[1.5px] border-white z-[1]"
          }
        ),
        /* @__PURE__ */ a("div", { className: A(
          "flex items-center gap-2 h-7 px-2.5",
          C && "border-b border-border"
        ), children: [
          /* @__PURE__ */ t("span", { className: "text-sm leading-none shrink-0", "aria-hidden": "true", children: n }),
          /* @__PURE__ */ t("span", { className: "flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap", children: r }),
          /* @__PURE__ */ t(
            "span",
            {
              className: A("w-2 h-2 rounded-full shrink-0", m.dot, w),
              "aria-label": `state: ${o}`
            }
          )
        ] }),
        v && /* @__PURE__ */ t("div", { className: A(
          "flex px-2.5 py-1.5",
          b && "border-b border-border"
        ), children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: A(
              "cursor-pointer appearance-none font-inherit text-[11px] font-medium leading-tight px-2 py-0.5 rounded-full border border-[#dc2626] text-[#dc2626] transition-colors duration-[120ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              g ? "bg-[#fef2f2]" : "bg-transparent",
              x && "transition-none"
            ),
            onClick: N,
            onMouseDown: (k) => k.stopPropagation(),
            onMouseEnter: () => u(!0),
            onMouseLeave: () => u(!1),
            "aria-label": "Retry from here",
            children: "⟳ Retry from here"
          }
        ) }),
        s != null && /* @__PURE__ */ t("div", { className: "px-2.5 py-2 text-[13px] leading-[1.4] text-text-secondary", children: s }),
        i != null && /* @__PURE__ */ t("div", { className: "border-t border-border px-2.5 py-1.5 text-xs text-text-secondary", children: i }),
        h
      ]
    }
  );
}
function Gt(e) {
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
function jr(e) {
  return e.triggerType === "schedule" ? e.schedule ? `cron: ${e.schedule}` : "No schedule set" : e.triggerType === "webhook" ? e.webhookPath ? `POST ${e.webhookPath}` : "No path set" : e.triggerType.startsWith("document.") ? e.documentTypeId ? `Doc type: ${e.documentTypeId}` : "Any document" : "Fires on user click";
}
function qr(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), i = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = Te(), p = d === "failed" ? () => l(n) : void 0, f = `Trigger node, ${Gt(r)}, state: ${d}`;
  return /* @__PURE__ */ t(
    Ce,
    {
      icon: "▶",
      subtitle: Gt(r),
      state: d,
      body: /* @__PURE__ */ t("span", { className: "italic", children: jr(r) }),
      selected: o,
      onRetry: p,
      ariaLabel: f,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: /* @__PURE__ */ t(
        ee,
        {
          type: "source",
          position: te.Right,
          id: "out",
          className: "!bg-slate-300 !w-2.5 !h-2.5"
        }
      )
    }
  );
}
function zr(e) {
  if (!e || e.trim().length === 0) return "Not configured";
  const r = e.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
function Hr({ info: e }) {
  const [n, r] = R(!1), o = n ? e.response : e.response.length > 60 ? `${e.response.slice(0, 60)}…` : e.response, s = e.tokensIn != null || e.tokensOut != null;
  return /* @__PURE__ */ a("div", { children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => r((i) => !i),
        className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-xs text-text-secondary font-medium text-left",
        children: [
          n ? "▾" : "▸",
          " Response",
          s && /* @__PURE__ */ a("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: [
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
        children: o
      }
    )
  ] });
}
function Kr(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), i = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = s?.llm, p = d === "running" && l?.streamOpened === !0 && (l?.tokensOut ?? 0) === 0, f = d === "running" && l !== void 0 && (l.tokensOut ?? 0) > 0, h = Te(), m = d === "failed" ? () => h(n) : void 0, x = /* @__PURE__ */ t("span", { className: "italic", children: zr(r.userPromptTemplate) }), u = (l ? {
    response: l.response ?? "",
    tokensIn: l.tokensIn,
    tokensOut: l.tokensOut,
    streaming: f,
    streamOpening: p
  } : void 0) ?? r._llmResponse, v = u ? /* @__PURE__ */ t(Hr, { info: u }) : void 0, N = (r.systemPrompt ?? "").replace(/\s+/g, " ").trim(), w = N.length === 0 ? "no system prompt" : `system prompt: ${N.length > 60 ? `${N.slice(0, 60)}…` : N}`, C = `LLM node, ${r.model || r.provider}, ${w}, state: ${d}`;
  return /* @__PURE__ */ a(
    Ce,
    {
      icon: "🧠",
      subtitle: r.model || r.provider,
      state: d,
      body: x,
      footer: v,
      selected: o,
      onRetry: m,
      ariaLabel: C,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "error", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Wr(e) {
  if (!e) return "—";
  const n = e.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function Vr(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), i = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = Te(), p = d === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ a(
    Ce,
    {
      icon: "✨",
      subtitle: r.transformType,
      state: d,
      body: /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Wr(r.expression) }),
      selected: o,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5" })
      ]
    }
  );
}
function Jr(e) {
  if (!e) return "—";
  const n = e.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function Gr(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), i = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = Te(), p = d === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ a(
    Ce,
    {
      icon: "❓",
      subtitle: r.label || "condition",
      state: d,
      body: /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Jr(r.expression) }),
      selected: o,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "true", className: "!bg-green-600 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "false", className: "!bg-amber-500 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Yr(e) {
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
function Xr(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), i = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = Te(), p = d === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ a(
    Ce,
    {
      icon: "⚡",
      subtitle: r.actionType,
      state: d,
      body: /* @__PURE__ */ t("span", { className: "italic", children: Yr(r) }),
      selected: o,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "error", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function Qr(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), i = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = Te(), p = d === "failed" ? () => l(n) : void 0, f = Math.max(2, Math.min(8, r.branchCount ?? 2)), h = Array.from({ length: f }, (m, x) => {
    const g = r.branchLabels?.[x];
    return g && g.trim().length > 0 ? g : `branch ${x}`;
  });
  return /* @__PURE__ */ a(
    Ce,
    {
      icon: "⑂",
      subtitle: `${f} branches`,
      state: d,
      body: /* @__PURE__ */ t("ul", { className: "m-0 p-0 list-none flex flex-col gap-0.5 text-xs text-text-secondary", children: h.map((m, x) => /* @__PURE__ */ a("li", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: [
        "• ",
        m
      ] }, x)) }),
      selected: o,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        h.map((m, x) => {
          const g = (x + 1) / (f + 1) * 100;
          return /* @__PURE__ */ t(
            ee,
            {
              type: "source",
              position: te.Right,
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
function Zr(e) {
  return e.mode === "all" ? "all" : e.mode === "any" ? "any" : `${e.n ?? 1} of many`;
}
function eo(e) {
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
function to(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), i = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = Te(), p = d === "failed" ? () => l(n) : void 0, f = hr({ handleType: "target" }), h = Math.max(2, f.length + 1);
  return /* @__PURE__ */ a(
    Ce,
    {
      icon: "⑃",
      subtitle: Zr(r),
      state: d,
      body: /* @__PURE__ */ t("span", { className: "italic", children: eo(r.mergeStrategy) }),
      selected: o,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        Array.from({ length: h }, (m, x) => {
          const g = (x + 1) / (h + 1) * 100;
          return /* @__PURE__ */ t(
            ee,
            {
              type: "target",
              position: te.Left,
              id: `in-${x}`,
              className: "!bg-slate-300 !w-2.5 !h-2.5",
              style: { top: `${g}%` }
            },
            `in-${x}`
          );
        }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5" })
      ]
    }
  );
}
function no(e) {
  return e.type === "role" ? `@${e.value}` : e.value;
}
function ro(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), i = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = Te(), p = d === "failed" ? () => l(n) : void 0, f = r.approvers ?? [], h = f.length, m = r.requiredCount ?? 0, x = `${h} approver${h === 1 ? "" : "s"}, ${m}/${h} required`, g = f.slice(0, 2), u = Math.max(0, f.length - 2), v = f.length === 0 ? /* @__PURE__ */ t("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ a("div", { className: "flex flex-wrap gap-1", children: [
    g.map((N, w) => /* @__PURE__ */ t(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: no(N)
      },
      w
    )),
    u > 0 && /* @__PURE__ */ a("span", { className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-inset text-text-tertiary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap", children: [
      "+",
      u,
      " more"
    ] })
  ] });
  return /* @__PURE__ */ a(
    Ce,
    {
      icon: "✋",
      subtitle: x,
      state: d,
      body: v,
      selected: o,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "approved", className: "!bg-green-600 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "rejected", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function oo({ id: e, data: n, selected: r }) {
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? s ?? "idle", c = Te(), d = n.agentName || n.agentId || "Not configured", l = `${n.protocol.toUpperCase()}${n.streaming ? " (streaming)" : ""}`;
  return /* @__PURE__ */ a(
    Ce,
    {
      icon: "🤖",
      subtitle: d,
      state: i,
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: i === "failed" && o ? () => c(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function so({ id: e, data: n, selected: r }) {
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? s ?? "idle", c = Te(), d = n.toolName || "Not configured";
  return /* @__PURE__ */ a(
    Ce,
    {
      icon: "🔌",
      subtitle: d,
      state: i,
      body: n.gatewayUrl ? /* @__PURE__ */ t("span", { className: "text-[11px]", children: n.gatewayUrl }) : void 0,
      selected: r,
      onRetry: i === "failed" && o ? () => c(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function ao({ id: e, data: n, selected: r }) {
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? s ?? "idle", c = Te(), d = n.knowledgeBaseId || "Not configured", l = `Top ${n.topK} chunks${n.scoreThreshold ? ` (≥${n.scoreThreshold})` : ""}`;
  return /* @__PURE__ */ a(
    Ce,
    {
      icon: "📚",
      subtitle: d,
      state: i,
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: i === "failed" && o ? () => c(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function io({ id: e, data: n, selected: r }) {
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? s ?? "idle", c = Te(), d = n.graphId || "Not configured", l = n.query.length > 40 ? `${n.query.slice(0, 37)}...` : n.query;
  return /* @__PURE__ */ a(
    Ce,
    {
      icon: "🕸️",
      subtitle: d,
      state: i,
      body: /* @__PURE__ */ t("span", { className: "text-[11px] font-mono", children: l }),
      selected: r,
      onRetry: i === "failed" && o ? () => c(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function lo({ id: e, data: n, selected: r }) {
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? s ?? "idle", c = Te(), d = `${n.mode} ${n.scope}`, l = n.namespace ? `ns: ${n.namespace}` : "No namespace";
  return /* @__PURE__ */ a(
    Ce,
    {
      icon: "💾",
      subtitle: d,
      state: i,
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: i === "failed" && o ? () => c(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function co({ id: e, data: n, selected: r }) {
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? s ?? "idle", c = Te(), d = n.label || n.guardrailId || "Not configured";
  return /* @__PURE__ */ a(
    Ce,
    {
      icon: "🛡️",
      subtitle: d,
      state: i,
      body: /* @__PURE__ */ a("span", { className: "text-[11px]", children: [
        "Action: ",
        n.action
      ] }),
      selected: r,
      onRetry: i === "failed" && o ? () => c(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "pass", className: "!top-[40%] !bg-green-600" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "block", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function po({ id: e, data: n, selected: r }) {
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? s ?? "idle", c = Te(), d = n.label || n.action || "Not configured";
  return /* @__PURE__ */ a(
    Ce,
    {
      icon: "📜",
      subtitle: d,
      state: i,
      body: /* @__PURE__ */ a("span", { className: "text-[11px]", children: [
        n.principal,
        " → ",
        n.resource
      ] }),
      selected: r,
      onRetry: i === "failed" && o ? () => c(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "allow", className: "!top-[40%] !bg-green-600" }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "deny", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function uo({ id: e, data: n, selected: r }) {
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? s ?? "idle", c = n.eventType === "CUSTOM" ? n.customEventName || "Custom" : n.eventType;
  return /* @__PURE__ */ t(
    Ce,
    {
      icon: "📡",
      subtitle: c,
      state: i,
      body: /* @__PURE__ */ a("span", { className: "text-[11px]", children: [
        "Source: ",
        n.sourceField
      ] }),
      footer: /* @__PURE__ */ t("span", { className: "text-[10px] text-[#6366f1]", children: "Terminal — streams to AG-UI frontend" }),
      selected: r,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in" })
    }
  );
}
const mo = {
  trigger: qr,
  llm: Kr,
  transform: Vr,
  condition: Gr,
  action: Xr,
  fork: Qr,
  join: to,
  approval: ro,
  agent: oo,
  "mcp-tool": so,
  "knowledge-base": ao,
  "graph-query": io,
  memory: lo,
  guardrail: co,
  policy: po,
  "ag-ui-output": uo
};
function fo(e) {
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
function ho({
  id: e,
  sourceX: n,
  sourceY: r,
  targetX: o,
  targetY: s,
  sourcePosition: i,
  targetPosition: c,
  data: d,
  markerEnd: l,
  selected: p
}) {
  const f = d ?? {}, h = Lt(), [m] = xr({
    sourceX: n,
    sourceY: r,
    targetX: o,
    targetY: s,
    sourcePosition: i,
    targetPosition: c
  }), x = fo(f.state), g = x.animate && !h, u = p ? "#646cff" : x.stroke, v = p ? 2.5 : x.strokeWidth;
  return /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t(
      "path",
      {
        d: m,
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
        d: m,
        fill: "none",
        stroke: u,
        strokeWidth: v,
        strokeDasharray: g ? x.strokeDasharray : void 0,
        markerEnd: l,
        className: "pointer-events-none",
        children: g ? /* @__PURE__ */ t(
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
    f.label ? /* @__PURE__ */ t(gr, { children: /* @__PURE__ */ t(
      "div",
      {
        className: A(
          "absolute pointer-events-auto px-2 py-0.5 rounded-full text-[10px] font-semibold leading-[1.4]",
          "bg-white text-[#475569] border border-[#e2e8f0] font-[inherit] whitespace-nowrap",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
        ),
        style: {
          // Pull the pill slightly downstream of the source handle so it
          // sits inside the edge route rather than on top of the node.
          transform: `translate(-50%, -50%) translate(${n + 28}px, ${r}px)`
        },
        children: f.label
      }
    ) }) : null
  ] });
}
function tt(e, n, r) {
  const o = ae(n);
  o.current = n, J(() => {
    if (r === !1) return;
    const s = (i) => {
      e.current && !e.current.contains(i.target) && o.current();
    };
    return document.addEventListener("mousedown", s), () => document.removeEventListener("mousedown", s);
  }, [e, r]);
}
const xo = [
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
function go(e, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return e.type.toLowerCase().includes(r) || e.name.toLowerCase().includes(r) || e.description.toLowerCase().includes(r);
}
function bo({
  anchor: e,
  flowPosition: n,
  disabledTypes: r = [],
  onClose: o,
  onInsert: s
}) {
  const [i, c] = R(""), [d, l] = R(0), p = ae(null), f = ae(null), h = B(() => new Set(r), [r]), m = B(
    () => xo.filter((u) => !h.has(u.type) && go(u, i)),
    [h, i]
  );
  if (J(() => {
    l((u) => u >= m.length ? 0 : u);
  }, [m.length]), J(() => {
    if (e) {
      const u = setTimeout(() => f.current?.focus(), 0);
      return () => clearTimeout(u);
    }
  }, [e]), tt(p, o, !!e), !e) return null;
  const x = (u) => {
    const v = m[u];
    !v || !n || (s(v.type, n), o());
  }, g = (u) => {
    if (u.key === "ArrowDown") {
      if (u.preventDefault(), m.length === 0) return;
      l((v) => (v + 1) % m.length);
    } else if (u.key === "ArrowUp") {
      if (u.preventDefault(), m.length === 0) return;
      l((v) => (v - 1 + m.length) % m.length);
    } else u.key === "Enter" ? (u.preventDefault(), x(d)) : u.key === "Escape" && (u.preventDefault(), o());
  };
  return /* @__PURE__ */ a(
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
            ref: f,
            type: "text",
            value: i,
            onChange: (u) => c(u.target.value),
            onKeyDown: g,
            placeholder: "Search nodes…",
            className: "w-full box-border border border-[#d1d5db] rounded-md px-2.5 py-1.5 text-[13px] font-inherit bg-[#f9fafb] text-[#0f172a] outline-none",
            "aria-label": "Search node types",
            "data-testid": "quick-insert-search"
          }
        ) }),
        /* @__PURE__ */ t("div", { className: "max-h-[260px] overflow-y-auto py-1", role: "listbox", children: m.length === 0 ? /* @__PURE__ */ a("div", { className: "px-3 py-3.5 text-xs text-[#94a3b8] font-inherit", children: [
          'No nodes match "',
          i,
          '"'
        ] }) : m.map((u, v) => {
          const N = v === d;
          return /* @__PURE__ */ a(
            "div",
            {
              role: "option",
              "aria-selected": N,
              onMouseEnter: () => l(v),
              onMouseDown: (w) => {
                w.preventDefault(), x(v);
              },
              className: A(
                "flex items-center gap-2.5 px-3 py-2 cursor-pointer font-inherit",
                N ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              "data-node-type": u.type,
              "data-testid": `quick-insert-row-${u.type}`,
              children: [
                /* @__PURE__ */ t("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: u.icon }),
                /* @__PURE__ */ a("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-[#0f172a]", children: u.name }),
                  /* @__PURE__ */ t("div", { className: "text-[11px] text-[#475569] whitespace-nowrap overflow-hidden text-ellipsis", children: u.description })
                ] })
              ]
            },
            u.type
          );
        }) })
      ]
    }
  );
}
function yo({
  addNode: e,
  addEdge: n,
  updateNodeData: r,
  getDefinition: o
}) {
  J(() => {
  }, [e, n, r, o]);
}
function vo({
  definition: e,
  selectedNodeId: n,
  setSelectedNodeId: r,
  removeNode: o,
  removeDefEdge: s,
  setNodes: i,
  setEdges: c,
  setPositions: d,
  duplicateNodes: l,
  clipboardRef: p,
  containerRef: f
}) {
  J(() => {
    const h = f.current;
    if (!h) return;
    const m = (g) => {
      const u = h.querySelector(
        `.react-flow__node[data-id="${CSS.escape(g)}"]`
      );
      return u ? ((u.querySelector('[data-pipeline-node="true"]') ?? u).focus(), !0) : !1;
    }, x = (g) => {
      if (Bt(g.target)) return;
      const u = document.activeElement, v = !!u && h.contains(u);
      if (g.key === "Tab") {
        if (!v || !e || e.nodes.length === 0) return;
        const N = Po(e);
        if (N.length === 0) return;
        const C = u?.closest(".react-flow__node")?.getAttribute("data-id") ?? null, b = C !== null ? N.indexOf(C) : -1, y = g.shiftKey ? -1 : 1, k = b === -1 ? g.shiftKey ? N.length - 1 : 0 : (b + y + N.length) % N.length, D = N[k];
        m(D) && g.preventDefault();
        return;
      }
      if (v && !g.altKey) {
        if (g.key === "Enter" || g.key === " " || g.key === "Spacebar") {
          const w = u?.closest(".react-flow__node")?.getAttribute("data-id");
          w && (g.preventDefault(), r(w));
          return;
        }
        if (g.key === "Delete" || g.key === "Backspace") {
          if (n) {
            g.preventDefault(), o(n);
            return;
          }
          c((N) => {
            const w = N.filter((C) => C.selected);
            if (w.length === 0) return N;
            for (const C of w) s(C.id);
            return N.filter((C) => !C.selected);
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
          const N = 8, w = g.key === "ArrowLeft" ? -N : g.key === "ArrowRight" ? N : 0, C = g.key === "ArrowUp" ? -N : g.key === "ArrowDown" ? N : 0;
          i((b) => {
            const y = b.map(
              (D) => D.id === n ? {
                ...D,
                position: {
                  x: D.position.x + w,
                  y: D.position.y + C
                }
              } : D
            ), k = y.find((D) => D.id === n);
            return k && d([{ id: k.id, position: k.position }]), y;
          });
        }
      }
    };
    return h.addEventListener("keydown", x), () => h.removeEventListener("keydown", x);
  }, [e, n, r, o, s, i, c, d, l, p, f]);
}
function No({
  addNode: e,
  screenToFlowPosition: n
}) {
  const r = P((s) => {
    s.preventDefault(), s.dataTransfer.dropEffect = "move";
  }, []), o = P(
    (s) => {
      s.preventDefault();
      const i = s.dataTransfer.getData("application/reactflow");
      if (!i) return;
      let c = null;
      try {
        c = JSON.parse(i);
      } catch {
        return;
      }
      const d = c?.nodeType;
      if (!d) return;
      const l = n({
        x: s.clientX,
        y: s.clientY
      });
      e(d, l);
    },
    [e, n]
  );
  return { handleDragOver: r, handleDrop: o };
}
function wo({
  nodeMenu: e,
  breakpoints: n,
  showBreakpointOption: r,
  onFilterLog: o,
  onCopyNodeId: s,
  onDuplicate: i,
  onToggleBreakpoint: c,
  onDismiss: d
}) {
  J(() => {
    const p = (h) => {
      h.target?.closest('[data-testid="canvas-node-context-menu"]') || d();
    }, f = (h) => {
      h.key === "Escape" && d();
    };
    return document.addEventListener("mousedown", p), window.addEventListener("keydown", f), () => {
      document.removeEventListener("mousedown", p), window.removeEventListener("keydown", f);
    };
  }, [d]);
  const l = "block w-full text-left px-3 py-2 border-none bg-transparent text-[13px] cursor-pointer rounded font-inherit";
  return /* @__PURE__ */ a(
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
            onClick: o,
            "data-testid": "ctx-filter-log",
            className: A(l, "text-[#0f172a]"),
            children: "🎯 Filter log to this node"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: s,
            "data-testid": "ctx-copy-id",
            className: A(l, "text-[#0f172a]"),
            children: "📋 Copy node id"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: i,
            "data-testid": "ctx-duplicate",
            className: A(l, "text-[#0f172a]"),
            children: "📑 Duplicate node"
          }
        ),
        r ? /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: c,
            "data-testid": "ctx-toggle-breakpoint",
            className: A(
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
const En = [
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
], On = En.flatMap((e) => e.items.map((n) => ({ type: n.type, name: n.name })));
function ko(e, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return e.name.toLowerCase().includes(r) || e.type.toLowerCase().includes(r) || e.description.toLowerCase().includes(r);
}
function Co({ disabledTypes: e = [] }) {
  const [n, r] = R(""), [o, s] = R(null), i = B(() => new Set(e), [e]), c = B(
    () => En.map((l) => ({
      ...l,
      items: l.items.filter((p) => ko(p, n))
    })).filter((l) => l.items.length > 0),
    [n]
  ), d = (l) => (p) => {
    if (i.has(l.type)) {
      p.preventDefault();
      return;
    }
    p.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: l.type })
    ), p.dataTransfer.effectAllowed = "move";
  };
  return /* @__PURE__ */ a("div", { className: "w-[220px] shrink-0 h-full border-r border-[#e2e8f0] bg-white flex flex-col", "data-testid": "node-palette", children: [
    /* @__PURE__ */ t("div", { className: "py-[10px] px-3 border-b border-[#e2e8f0] shrink-0", children: /* @__PURE__ */ t(
      "input",
      {
        type: "text",
        value: n,
        onChange: (l) => r(l.target.value),
        placeholder: "Search nodes…",
        className: "w-full box-border border border-[#d1d5db] rounded-[6px] py-1.5 px-[10px] text-[13px] font-[inherit] bg-[#f9fafb] text-[#0f172a] outline-none"
      }
    ) }),
    /* @__PURE__ */ t("div", { className: "flex-1 overflow-y-auto py-2", children: c.length === 0 ? /* @__PURE__ */ a("div", { className: "px-3.5 py-4 text-xs text-[#94a3b8]", children: [
      'No nodes match "',
      n,
      '"'
    ] }) : c.map((l) => /* @__PURE__ */ a("div", { children: [
      /* @__PURE__ */ t("div", { className: "pt-2 px-[14px] pb-1 text-[10px] font-bold tracking-[0.6px] uppercase text-[#94a3b8] font-[inherit]", children: l.name }),
      l.items.map((p) => {
        const f = i.has(p.type), h = o === p.type && !f, m = On.findIndex((g) => g.type === p.type), x = m >= 0 && m < 9 ? m + 1 : null;
        return /* @__PURE__ */ a(
          "div",
          {
            draggable: !f,
            onDragStart: d(p),
            onMouseEnter: () => s(p.type),
            onMouseLeave: () => s(null),
            className: A(
              "h-11 box-border my-0.5 mx-2 py-1.5 px-[10px] flex items-center gap-[10px] rounded-[6px] border border-transparent font-[inherit]",
              f ? "cursor-not-allowed opacity-[0.45]" : "cursor-grab",
              h ? "bg-[#f1f5f9]" : "bg-transparent"
            ),
            title: f ? `${p.name} is already placed` : x ? `${p.description} — press ${x}` : p.description,
            "data-node-type": p.type,
            "data-disabled": f || void 0,
            children: [
              /* @__PURE__ */ t(
                "span",
                {
                  className: "text-[18px] leading-none w-[22px] text-center shrink-0",
                  "aria-hidden": !0,
                  children: p.icon
                }
              ),
              /* @__PURE__ */ a("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ a("div", { className: A("text-[13px] font-semibold text-text-primary flex items-center gap-1.5", f && "line-through"), children: [
                  /* @__PURE__ */ t("span", { children: p.name }),
                  x !== null && /* @__PURE__ */ t(
                    "kbd",
                    {
                      "data-testid": `palette-shortcut-${p.type}`,
                      className: A("text-[10px] font-semibold font-mono text-[#64748b] bg-[#f1f5f9] border border-[#e2e8f0] rounded px-[5px] leading-[14px] min-w-[14px] text-center", f ? "opacity-50" : "opacity-100"),
                      children: x
                    }
                  )
                ] }),
                /* @__PURE__ */ t("div", { className: "text-[11px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis", children: f ? "Placed" : p.description })
              ] })
            ]
          },
          p.type
        );
      })
    ] }, l.name)) }),
    /* @__PURE__ */ t("div", { className: "py-2 px-3 border-t border-[#e2e8f0] text-[10px] text-[#94a3b8] font-[inherit] shrink-0", children: "Press 1–8 to insert at center" })
  ] });
}
function Io({
  definition: e,
  addNode: n,
  screenToFlowPosition: r,
  containerRef: o
}) {
  return J(() => {
    const s = (i) => {
      if (!Bt(i.target) && !(i.metaKey || i.ctrlKey || i.altKey) && /^[1-8]$/.test(i.key)) {
        const c = Number(i.key) - 1, d = On[c];
        if (!d || d.type === "trigger" && e?.nodes.some((x) => x.type === "trigger"))
          return;
        const p = o.current?.getBoundingClientRect(), f = p ? r({
          x: p.left + p.width / 2,
          y: p.top + p.height / 2
        }) : { x: 0, y: 0 };
        let { x: h, y: m } = f;
        if (e)
          for (const x of e.nodes)
            Math.abs(x.position.x - h) < 16 && Math.abs(x.position.y - m) < 16 && (h += 24, m += 24);
        n(d.type, { x: h, y: m }), i.preventDefault();
      }
    };
    return window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s);
  }, [n, e, r, o]), null;
}
const So = 280, To = 120, Ao = 40, Do = 40;
function Ro(e, n) {
  const r = So, o = To, s = Ao, i = Do;
  if (e.nodes.length === 0) return [];
  const c = /* @__PURE__ */ new Map();
  for (const v of e.nodes)
    c.set(v.id, []);
  for (const v of e.edges) {
    const N = c.get(v.source);
    N && c.has(v.target) && N.push(v.target);
  }
  const l = e.nodes.filter((v) => v.type === "trigger").map((v) => v.id).sort()[0], p = /* @__PURE__ */ new Map();
  if (l !== void 0) {
    const v = [l];
    for (p.set(l, 0); v.length > 0; ) {
      const N = v.shift(), w = p.get(N), C = c.get(N) ?? [];
      for (const b of C)
        p.has(b) || (p.set(b, w + 1), v.push(b));
    }
  }
  const f = /* @__PURE__ */ new Map();
  let h = -1;
  for (const v of e.nodes) {
    const N = p.get(v.id);
    N !== void 0 && (f.has(N) || f.set(N, []), f.get(N).push(v.id), N > h && (h = N));
  }
  for (const v of f.values())
    v.sort();
  const m = e.nodes.filter((v) => !p.has(v.id)).map((v) => v.id).sort(), x = h >= 0 ? h + 1 : 0;
  m.length > 0 && f.set(x, m);
  const g = [], u = [...f.keys()].sort((v, N) => v - N);
  for (const v of u) {
    const N = f.get(v), w = N.length, C = s + v * r;
    for (let b = 0; b < w; b++) {
      const y = i + (b - w / 2) * o;
      g.push({ id: N[b], position: { x: C, y } });
    }
  }
  return g;
}
function $o({
  definition: e,
  setPositions: n,
  fitView: r
}) {
  const o = P(() => {
    r({ padding: 0.15, duration: 500 });
  }, [r]), s = P(() => {
    if (!e) return;
    const i = Ro(e);
    i.length !== 0 && (n(i), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => r({ padding: 0.15, duration: 500 })) : r({ padding: 0.15, duration: 500 }));
  }, [e, n, r]);
  return { handleFitView: o, handleAutoArrange: s };
}
function Mo({
  definition: e,
  setPositions: n,
  fitView: r
}) {
  const { handleFitView: o, handleAutoArrange: s } = $o({
    definition: e,
    setPositions: n,
    fitView: r
  });
  return J(() => {
    const i = (c) => {
      const d = c.target;
      if (!(d && (d.tagName === "INPUT" || d.tagName === "TEXTAREA" || d.isContentEditable)) && c.shiftKey && (c.key === "A" || c.key === "a")) {
        if (c.metaKey || c.ctrlKey || c.altKey) return;
        c.preventDefault(), s();
      }
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [s]), /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: s,
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
        onClick: o,
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
function Bt(e) {
  if (!e || !(e instanceof HTMLElement)) return !1;
  const n = e.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || e.isContentEditable);
}
function Po(e) {
  if (e.nodes.length === 0) return [];
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const i of e.nodes)
    n.set(i.id, []), r.set(i.id, 0);
  for (const i of e.edges)
    !n.has(i.source) || !r.has(i.target) || (n.get(i.source).push(i.target), r.set(i.target, (r.get(i.target) ?? 0) + 1));
  const o = [], s = e.nodes.filter((i) => (r.get(i.id) ?? 0) === 0).map((i) => i.id).sort();
  for (; s.length > 0; ) {
    const i = s.shift();
    o.push(i);
    const c = (n.get(i) ?? []).slice().sort();
    for (const d of c) {
      const l = (r.get(d) ?? 0) - 1;
      r.set(d, l), l === 0 && s.push(d);
    }
  }
  if (o.length < e.nodes.length) {
    const i = new Set(o), c = e.nodes.filter((d) => !i.has(d.id)).map((d) => d.id).sort();
    o.push(...c);
  }
  return o;
}
const Eo = { animated: ho }, Oo = mo;
function Lo(e) {
  return {
    id: e.id,
    type: e.type,
    position: e.position,
    data: { ...e.data, nodeType: e.type }
  };
}
function _o(e) {
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
function Uo({ onFilterLog: e, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: o, replayNodeClasses: s, breakpoints: i, onToggleBreakpoint: c, pausedAtNodeId: d }) {
  const {
    definition: l,
    addNode: p,
    setPositions: f,
    addEdge: h,
    removeEdge: m,
    removeNode: x,
    duplicateNodes: g,
    selectedNodeId: u,
    setSelectedNodeId: v,
    updateNodeData: N
  } = ot(), { screenToFlowPosition: w, fitView: C } = yr();
  yo({
    addNode: p,
    addEdge: h,
    updateNodeData: N,
    getDefinition: () => l
  });
  const [b, y, k] = vr([]), [D, S, T] = Nr([]), [$, H] = R(!0), [V, Q] = R(!0), de = ae(null), ce = ae(null), [ne, pe] = R(null), [O, G] = R(null), K = P(
    (L, z) => {
      L.preventDefault(), G({ nodeId: z.id, x: L.clientX, y: L.clientY });
    },
    []
  ), F = P(() => {
    O && (e?.(O.nodeId), G(null));
  }, [O, e]), W = P(() => {
    if (!O) return;
    const L = O.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(L).catch(() => {
    }), G(null);
  }, [O]), ie = P(() => {
    O && (c?.(O.nodeId), G(null));
  }, [O, c]), le = P(() => {
    if (!O) return;
    const L = g([O.nodeId]);
    L.length > 0 && v(L[0]), G(null);
  }, [O, g, v]), be = P(() => G(null), []);
  J(() => {
    if (!l) {
      y([]), S([]);
      return;
    }
    y((L) => {
      const z = new Map(L.map((re) => [re.id, re]));
      return l.nodes.map((re) => {
        const ue = z.get(re.id), Ie = Lo(re);
        return i && i.size > 0 && (Ie.data._hasBreakpoint = i.has(re.id)), d && (Ie.data._pausedAtBreakpoint = re.id === d), ue ? { ...ue, ...Ie, selected: ue.selected } : Ie;
      });
    }), S(() => l.edges.map(_o));
  }, [l, i, d, y, S]), J(() => {
    if (!n) {
      r?.(null);
      return;
    }
    y(
      (L) => L.map((z) => ({
        ...z,
        className: z.id === n ? "node-error" : z.className?.replace("node-error", "").trim() || void 0
      }))
    ), requestAnimationFrame(() => {
      const L = de.current;
      if (!L) return;
      const z = L.querySelector(
        `.react-flow__node[data-id="${CSS.escape(n)}"]`
      );
      if (!z) {
        r?.(null);
        return;
      }
      const re = z.getBoundingClientRect();
      r?.({ x: re.right, y: re.top + re.height / 2 });
    });
  }, [n, y, r]), J(() => {
    s && y(
      (L) => L.map((z) => {
        const re = s[z.id] ?? "", Ie = [z.id === n ? "node-error" : "", re].filter(Boolean).join(" ") || void 0;
        let Ne;
        re === "node-replay-active" ? Ne = "running" : re === "node-replay-completed" ? Ne = "completed" : re === "node-replay-failed" && (Ne = "failed");
        const Fe = { ...z.data };
        return Ne ? Fe._state = Ne : Fe._state = "idle", { ...z, className: Ie, data: Fe };
      })
    );
  }, [s, n, y]), J(() => {
    o && S(
      (L) => L.map((z) => {
        const re = o[z.id];
        if (!re) return z;
        const ue = z.data ?? {};
        return ue.state === re ? z : { ...z, data: { ...ue, state: re } };
      })
    );
  }, [o, S]);
  const E = P(
    (L) => {
      k(L);
      const z = [], re = [];
      for (const ue of L)
        ue.type === "position" && ue.position && ue.dragging === !1 ? z.push({ id: ue.id, position: ue.position }) : ue.type === "remove" && re.push(ue.id);
      z.length && f(z);
      for (const ue of re) x(ue);
    },
    [k, f, x]
  ), Z = P(
    (L) => {
      T(L);
      for (const z of L)
        z.type === "remove" && m(z.id);
    },
    [T, m]
  ), ge = P(
    (L) => {
      if (!l || !L.source || !L.target) return;
      const z = l.nodes.find((Ne) => Ne.id === L.source), re = l.nodes.find((Ne) => Ne.id === L.target);
      if (!z || !re) return;
      const ue = L.sourceHandle ?? "out", Ie = L.targetHandle ?? "in";
      Pt(
        z.type,
        ue,
        re.type,
        Ie
      ) && h({
        source: L.source,
        sourceHandle: ue,
        target: L.target,
        targetHandle: Ie
      });
    },
    [l, h]
  ), De = P(
    (L) => {
      if (!l || !L.source || !L.target) return !1;
      const z = l.nodes.find((ue) => ue.id === L.source), re = l.nodes.find((ue) => ue.id === L.target);
      return !z || !re ? !1 : Pt(
        z.type,
        L.sourceHandle ?? "out",
        re.type,
        L.targetHandle ?? "in"
      );
    },
    [l]
  ), qe = P(
    (L, z) => {
      v(z.id);
    },
    [v]
  ), Pe = P(() => {
    v(null);
  }, [v]), Ae = P(
    (L) => {
      const z = L.target;
      if (!z || !(z.classList.contains("react-flow__pane") || z.classList.contains("react-flow__renderer") || z.classList.contains("react-flow__viewport") || z.classList.contains("react-flow"))) return;
      L.preventDefault();
      const ue = w({ x: L.clientX, y: L.clientY });
      pe({
        anchor: { x: L.clientX, y: L.clientY },
        flowPosition: ue
      });
    },
    [w]
  ), Le = P(() => pe(null), []), Ee = P(
    (L, z) => {
      p(L, z);
    },
    [p]
  ), _e = B(() => l ? l.nodes.some((L) => L.type === "trigger") ? ["trigger"] : [] : [], [l]), { handleDragOver: ye, handleDrop: se } = No({
    addNode: p,
    screenToFlowPosition: w
  });
  J(() => {
    const L = (z) => {
      if (!Bt(z.target) && !(z.metaKey || z.ctrlKey || z.altKey)) {
        if (z.key === "m" || z.key === "M") {
          H((re) => !re);
          return;
        }
        if (z.key === "c" || z.key === "C") {
          Q((re) => !re);
          return;
        }
      }
    };
    return window.addEventListener("keydown", L), () => window.removeEventListener("keydown", L);
  }, []), vo({
    definition: l,
    selectedNodeId: u,
    setSelectedNodeId: v,
    removeNode: x,
    removeDefEdge: m,
    setNodes: y,
    setEdges: S,
    setPositions: f,
    duplicateNodes: g,
    clipboardRef: ce,
    containerRef: de
  });
  const q = P((L) => {
    switch (L.data?._state) {
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
  return /* @__PURE__ */ a(
    "div",
    {
      ref: de,
      className: "flex-1 min-w-0 min-h-[520px] relative bg-[#fafbfc]",
      role: "application",
      "aria-label": "Pipeline editor canvas",
      tabIndex: 0,
      "data-testid": "pipeline-canvas",
      onDragOver: ye,
      onDrop: se,
      onDoubleClick: Ae,
      children: [
        /* @__PURE__ */ a(
          wr,
          {
            nodes: b,
            edges: D,
            nodeTypes: Oo,
            edgeTypes: Eo,
            onNodesChange: E,
            onEdgesChange: Z,
            onConnect: ge,
            isValidConnection: De,
            onNodeClick: qe,
            onNodeContextMenu: K,
            onPaneClick: Pe,
            fitView: !0,
            snapToGrid: !0,
            snapGrid: [16, 16],
            edgesFocusable: !0,
            defaultEdgeOptions: { type: "smoothstep" },
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ t(
                kr,
                {
                  variant: Cr.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              V ? /* @__PURE__ */ t(
                Ir,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              $ ? /* @__PURE__ */ t(
                Sr,
                {
                  position: "bottom-right",
                  pannable: !0,
                  zoomable: !0,
                  className: "!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]",
                  maskColor: "rgba(15, 23, 42, 0.04)",
                  nodeColor: q,
                  nodeStrokeColor: "#e2e8f0"
                }
              ) : null
            ]
          }
        ),
        ne ? /* @__PURE__ */ t(
          bo,
          {
            anchor: ne.anchor,
            flowPosition: ne.flowPosition,
            disabledTypes: _e,
            onClose: Le,
            onInsert: Ee
          }
        ) : null,
        /* @__PURE__ */ t(
          Io,
          {
            definition: l,
            addNode: p,
            screenToFlowPosition: w,
            containerRef: de
          }
        ),
        /* @__PURE__ */ t(
          Mo,
          {
            definition: l,
            setPositions: f,
            fitView: C
          }
        ),
        O ? /* @__PURE__ */ t(
          wo,
          {
            nodeMenu: O,
            breakpoints: i,
            showBreakpointOption: !!c,
            onFilterLog: F,
            onCopyNodeId: W,
            onDuplicate: le,
            onToggleBreakpoint: ie,
            onDismiss: be
          }
        ) : null
      ]
    }
  );
}
function Bo({ onFilterLog: e, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: o, replayNodeClasses: s, breakpoints: i, onToggleBreakpoint: c, pausedAtNodeId: d } = {}) {
  return /* @__PURE__ */ t(br, { children: /* @__PURE__ */ t(
    Uo,
    {
      onFilterLog: e,
      errorNodeId: n,
      onErrorNodePosition: r,
      replayEdgeStates: o,
      replayNodeClasses: s,
      breakpoints: i,
      onToggleBreakpoint: c,
      pausedAtNodeId: d
    }
  ) });
}
const Yt = {
  LLMError: { bg: "#fef2f2", fg: "#dc2626" },
  TimeoutError: { bg: "#fff7ed", fg: "#ea580c" },
  NetworkError: { bg: "#fffbeb", fg: "#d97706" },
  ValidationError: { bg: "#fefce8", fg: "#ca8a04" },
  RegistryConflict: { bg: "#faf5ff", fg: "#9333ea" },
  UnknownError: { bg: "#f1f5f9", fg: "#475569" }
};
function Fo(e) {
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
function jo({ error: e, anchor: n, onDismiss: r, onRetry: o }) {
  const [s, i] = R(!1), [c, d] = R(!1), l = e.errorCategory ?? "UnknownError", p = Yt[l] ?? Yt.UnknownError, f = P(async () => {
    const g = [
      `Error Category: ${l}`,
      `Node ID: ${e.nodeId}`,
      `Message: ${e.message}`,
      e.stack ? `
Stack Trace:
${e.stack}` : ""
    ].filter(Boolean).join(`
`);
    try {
      typeof navigator < "u" && navigator.clipboard?.writeText && (await navigator.clipboard.writeText(g), d(!0), setTimeout(() => d(!1), 2e3));
    } catch {
    }
  }, [e, l]), h = P(() => {
    o?.();
  }, [o]), m = Math.min(n.y + 8, window.innerHeight - 440), x = Math.min(n.x + 12, window.innerWidth - 360);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "fixed z-[100] bg-white border border-[#e2e8f0] rounded-[10px] shadow-[0_12px_32px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.08)] p-0 w-[340px] max-h-[420px] overflow-y-auto font-inherit text-[#0f172a]",
      style: { top: Math.max(8, m), left: Math.max(8, x) },
      "data-testid": "error-overlay",
      role: "dialog",
      "aria-label": `Error details for node ${e.nodeId}`,
      children: [
        /* @__PURE__ */ a("div", { className: "flex items-center gap-2 px-3.5 pt-3 pb-2.5 border-b border-[#e2e8f0]", children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold leading-snug",
              style: { background: p.bg, color: p.fg },
              "data-testid": "error-category-badge",
              children: Fo(l)
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
        /* @__PURE__ */ a("div", { className: "px-3.5 py-3 flex flex-col gap-2.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] leading-normal text-[#0f172a]", children: e.message }),
          /* @__PURE__ */ a("div", { className: "text-[11px] text-[#94a3b8]", children: [
            "Failed node:",
            " ",
            /* @__PURE__ */ t("code", { className: "bg-[#f1f5f9] px-[5px] py-px rounded-[3px] font-mono text-[11px] text-[#475569]", children: e.nodeId })
          ] }),
          e.stack && /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                onClick: () => i((g) => !g),
                className: "bg-transparent border-none p-0 cursor-pointer text-xs font-medium text-[#475569] font-inherit",
                "data-testid": "error-stack-toggle",
                children: [
                  s ? "▾" : "▸",
                  " Stack trace"
                ]
              }
            ),
            s && /* @__PURE__ */ t(
              "pre",
              {
                className: "mt-1.5 p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-md text-[10px] leading-normal font-mono text-[#475569] whitespace-pre-wrap break-all max-h-40 overflow-y-auto m-0",
                "data-testid": "error-stack-content",
                children: e.stack
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex gap-2 px-3.5 pt-2.5 pb-3 border-t border-[#e2e8f0]", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: f,
              className: "px-3 py-1.5 text-xs font-semibold border-none rounded-md cursor-pointer font-inherit leading-snug bg-[#f1f5f9] text-[#475569]",
              "data-testid": "error-copy-btn",
              children: c ? "Copied!" : "Copy error details"
            }
          ),
          o && /* @__PURE__ */ t(
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
function qo(e, n) {
  const r = /* @__PURE__ */ new Map();
  for (const s of e)
    r.set(s.id, []);
  for (const s of n) {
    const i = r.get(s.source);
    i && i.push({ target: s.target, edgeId: s.id });
  }
  const o = /* @__PURE__ */ new Map();
  for (const s of e)
    o.set(s.id, 0);
  for (const s of e) {
    if (o.get(s.id) !== 0) continue;
    const i = [
      { nodeId: s.id, index: 0 }
    ];
    for (o.set(s.id, 1); i.length > 0; ) {
      const c = i[i.length - 1], d = r.get(c.nodeId) ?? [];
      if (c.index >= d.length) {
        o.set(c.nodeId, 2), i.pop();
        continue;
      }
      const l = d[c.index];
      c.index += 1;
      const p = o.get(l.target);
      if (p === 1)
        return l.edgeId;
      p === 0 && (o.set(l.target, 1), i.push({ nodeId: l.target, index: 0 }));
    }
  }
  return null;
}
function Ln(e) {
  const n = [], r = [], { nodes: o, edges: s } = e, i = /* @__PURE__ */ new Map();
  for (const c of o)
    i.set(c.id, c);
  return zo(o, n), Ho(o, s, n), Ko(s, i, n), Wo(o, n), es(o, s, n), ts(o, s, r), ns(o, s, r), rs(o, s, r), os(o, s, r), r.push(...ss(e)), r.push(...as(e)), r.push(...is(e)), r.push(...ls(e)), r.push(...ds(e)), r.push(...cs(e)), r.push(...ps(e)), r.push(...us(e)), r.push(...ms(e)), r.push(...fs(e)), {
    errors: n,
    warnings: r,
    isValid: n.length === 0,
    canPublish: n.length === 0
  };
}
function zo(e, n) {
  const r = e.filter((o) => o.type === "trigger");
  if (r.length === 0) {
    n.push({
      code: "NO_TRIGGER",
      severity: "error",
      message: "Pipeline must have exactly one Trigger node."
    });
    return;
  }
  if (r.length > 1)
    for (const o of r)
      n.push({
        code: "MULTIPLE_TRIGGERS",
        severity: "error",
        message: "Pipeline must have exactly one Trigger node.",
        nodeId: o.id
      });
}
function Ho(e, n, r) {
  const o = qo(e, n);
  o !== null && r.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: o
  });
}
function Ko(e, n, r) {
  for (const o of e) {
    const s = n.get(o.source), i = n.get(o.target);
    if (!s || !i) {
      r.push({
        code: "INVALID_HANDLE",
        severity: "error",
        message: "Edge references a node that does not exist.",
        edgeId: o.id
      });
      continue;
    }
    Pt(
      s.type,
      o.sourceHandle,
      i.type,
      o.targetHandle
    ) || r.push({
      code: "INVALID_HANDLE",
      severity: "error",
      message: `Invalid connection: ${s.type}.${o.sourceHandle} → ${i.type}.${o.targetHandle}.`,
      edgeId: o.id
    });
  }
}
function Wo(e, n) {
  for (const r of e)
    switch (r.data.type) {
      case "llm":
        Vo(r.id, r.data, n);
        break;
      case "transform":
        Jo(r.id, r.data, n);
        break;
      case "condition":
        Go(r.id, r.data, n);
        break;
      case "action":
        Yo(r.id, r.data, n);
        break;
      case "fork":
        Xo(r.id, r.data, n);
        break;
      case "join":
        Qo(r.id, r.data, n);
        break;
      case "approval":
        Zo(r.id, r.data, n);
        break;
    }
}
function Vo(e, n, r) {
  n.provider || Be(r, e, "provider"), (!n.model || !n.model.trim()) && Be(r, e, "model"), (!n.systemPrompt || !n.systemPrompt.trim()) && Be(r, e, "systemPrompt"), (!n.userPromptTemplate || !n.userPromptTemplate.trim()) && Be(r, e, "userPromptTemplate");
}
function Jo(e, n, r) {
  n.transformType || Be(r, e, "transformType"), (!n.expression || !n.expression.trim()) && Be(r, e, "expression");
}
function Go(e, n, r) {
  (!n.expression || !n.expression.trim()) && Be(r, e, "expression");
}
function Yo(e, n, r) {
  n.actionType || Be(r, e, "actionType");
}
function Xo(e, n, r) {
  (typeof n.branchCount != "number" || n.branchCount < 2) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: e,
    field: "branchCount"
  });
}
function Qo(e, n, r) {
  n.mode || Be(r, e, "mode"), n.mergeStrategy || Be(r, e, "mergeStrategy"), n.mode === "n_of_m" && (typeof n.n != "number" || n.n < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: e,
    field: "n"
  });
}
function Zo(e, n, r) {
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
function es(e, n, r) {
  const o = /* @__PURE__ */ new Map();
  for (const s of n)
    o.set(s.target, (o.get(s.target) ?? 0) + 1);
  for (const s of e) {
    if (s.type !== "join") continue;
    (o.get(s.id) ?? 0) < 2 && r.push({
      code: "JOIN_INSUFFICIENT_INPUTS",
      severity: "error",
      message: "Join node requires at least 2 incoming edges.",
      nodeId: s.id
    });
  }
}
function Be(e, n, r) {
  e.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: `Missing required field '${r}'.`,
    nodeId: n,
    field: r
  });
}
function ts(e, n, r) {
  const o = e.filter((d) => d.type === "trigger");
  if (o.length !== 1) return;
  const s = /* @__PURE__ */ new Map();
  for (const d of e) s.set(d.id, []);
  for (const d of n)
    s.get(d.source)?.push(d.target);
  const i = /* @__PURE__ */ new Set(), c = [o[0].id];
  for (i.add(o[0].id); c.length > 0; ) {
    const d = c.shift();
    for (const l of s.get(d) ?? [])
      i.has(l) || (i.add(l), c.push(l));
  }
  for (const d of e)
    i.has(d.id) || r.push({
      code: "ORPHAN_NODE",
      severity: "warning",
      message: "Node is unreachable from the Trigger.",
      nodeId: d.id
    });
}
function ns(e, n, r) {
  const o = /* @__PURE__ */ new Set();
  for (const s of n) o.add(s.source);
  for (const s of e)
    o.has(s.id) || s.data.terminal !== !0 && r.push({
      code: "DEAD_END",
      severity: "warning",
      message: "Node has no outgoing edges.",
      nodeId: s.id
    });
}
function rs(e, n, r) {
  const o = /* @__PURE__ */ new Map();
  for (const s of n) {
    const i = o.get(s.source) ?? /* @__PURE__ */ new Set();
    i.add(s.sourceHandle), o.set(s.source, i);
  }
  for (const s of e) {
    if (s.data.type !== "fork") continue;
    const i = s.data.branchCount, c = o.get(s.id) ?? /* @__PURE__ */ new Set();
    for (let d = 0; d < i; d += 1) {
      const l = `branch-${d}`;
      c.has(l) || r.push({
        code: "UNUSED_FORK_BRANCH",
        severity: "warning",
        message: `Fork branch '${l}' has no connected edge.`,
        nodeId: s.id,
        field: l
      });
    }
  }
}
function os(e, n, r) {
  const o = /* @__PURE__ */ new Map();
  for (const s of n) {
    const i = o.get(s.source) ?? /* @__PURE__ */ new Set();
    i.add(s.sourceHandle), o.set(s.source, i);
  }
  for (const s of e) {
    if (s.type !== "condition") continue;
    const i = o.get(s.id) ?? /* @__PURE__ */ new Set();
    for (const c of ["true", "false"])
      i.has(c) || r.push({
        code: "UNUSED_CONDITION_BRANCH",
        severity: "warning",
        message: `Condition branch '${c}' has no connected edge.`,
        nodeId: s.id,
        field: c
      });
  }
}
function We(e) {
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
function ss(e) {
  const n = [], r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (const d of e.nodes)
    r.set(d.id, []), o.set(d.id, []);
  for (const d of e.edges)
    d.sourceHandle !== "error" && r.get(d.source)?.push(d.target), o.get(d.target)?.push(d.source);
  const s = /* @__PURE__ */ new Map();
  for (const d of e.nodes) s.set(d.id, d);
  function i(d) {
    const l = /* @__PURE__ */ new Set([d]), p = [];
    for (const f of r.get(d) ?? [])
      l.has(f) || (l.add(f), p.push(f));
    for (; p.length > 0; ) {
      const f = p.shift();
      if (s.get(f)?.type === "join") return !0;
      for (const m of r.get(f) ?? [])
        l.has(m) || (l.add(m), p.push(m));
    }
    return !1;
  }
  function c(d) {
    const l = /* @__PURE__ */ new Set([d]), p = [];
    for (const f of o.get(d) ?? [])
      l.has(f) || (l.add(f), p.push(f));
    for (; p.length > 0; ) {
      const f = p.shift();
      if (s.get(f)?.type === "fork") return !0;
      for (const m of o.get(f) ?? [])
        l.has(m) || (l.add(m), p.push(m));
    }
    return !1;
  }
  for (const d of e.nodes)
    d.data.type !== "llm" && d.data.type !== "action" || e.edges.some(
      (p) => p.source === d.id && p.sourceHandle === "error"
    ) || c(d.id) && i(d.id) || n.push({
      code: "NO_ERROR_HANDLER",
      severity: "warning",
      message: `${d.data.type} node '${We(d)}' has no error handler — failures will terminate the run.`,
      nodeId: d.id
    });
  return n;
}
function as(e) {
  const n = [];
  for (const r of e.nodes)
    r.data.type === "llm" && (typeof r.data.maxTokens != "number" || r.data.maxTokens <= 0) && n.push({
      code: "LLM_NO_MAX_TOKENS",
      severity: "warning",
      message: `LLM node '${We(r)}' has no maxTokens — responses could run long / expensive.`,
      nodeId: r.id,
      field: "maxTokens"
    });
  return n;
}
function is(e) {
  const n = [];
  for (const r of e.nodes)
    r.data.type === "approval" && (typeof r.data.timeoutMs != "number" || r.data.timeoutMs <= 0) && n.push({
      code: "UNGUARDED_APPROVAL_TIMEOUT",
      severity: "warning",
      message: `Approval '${We(r)}' has no timeout — the run could block indefinitely.`,
      nodeId: r.id,
      field: "timeoutMs"
    });
  return n;
}
function ls(e) {
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
function ds(e) {
  const r = e.nodes.filter((p) => p.type === "trigger");
  if (r.length !== 1) return [];
  const o = /* @__PURE__ */ new Map();
  for (const p of e.nodes) o.set(p.id, []);
  for (const p of e.edges) o.get(p.source)?.push(p.target);
  const s = /* @__PURE__ */ new Map(), i = [r[0].id];
  s.set(r[0].id, 1);
  const c = e.nodes.length * e.nodes.length + 1;
  let d = 0;
  for (; i.length > 0; ) {
    if (d++ > c) return [];
    const p = i.shift(), f = s.get(p);
    for (const h of o.get(p) ?? []) {
      const m = s.get(h);
      (m === void 0 || f + 1 > m) && (s.set(h, f + 1), i.push(h));
    }
  }
  let l = 0;
  for (const p of s.values()) p > l && (l = p);
  return l > 12 ? [
    {
      code: "DEEP_CHAIN",
      severity: "warning",
      message: `Pipeline is very deep (${l} levels); consider modularizing.`
    }
  ] : [];
}
function cs(e) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const o of e.nodes) {
    const s = We(o), i = r.get(s) ?? [];
    i.push(o), r.set(s, i);
  }
  for (const [o, s] of r)
    if (!(s.length < 2))
      for (const i of s)
        n.push({
          code: "DUPLICATE_NODE_NAME",
          severity: "warning",
          message: `Multiple nodes named '${o}'; consider disambiguating.`,
          nodeId: i.id
        });
  return n;
}
function ps(e) {
  const n = [], r = /\{\{[^}]+\}\}/;
  for (const o of e.nodes) {
    if (o.data.type !== "llm") continue;
    const { temperature: s, userPromptTemplate: i } = o.data;
    typeof s != "number" || s <= 0.8 || !i || !r.test(i) || n.push({
      code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
      severity: "warning",
      message: `LLM '${We(o)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
      nodeId: o.id
    });
  }
  return n;
}
function us(e) {
  return e.triggerBinding?.event !== "schedule" ? [] : e.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function ms(e) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const o of e.edges) {
    const s = r.get(o.source) ?? /* @__PURE__ */ new Set();
    s.add(o.sourceHandle), r.set(o.source, s);
  }
  for (const o of e.nodes) {
    if (o.type !== "condition") continue;
    const s = r.get(o.id) ?? /* @__PURE__ */ new Set(), i = s.has("true"), c = s.has("false");
    i && !c && n.push({
      code: "UNREACHABLE_AFTER_CONDITION_FALSE",
      severity: "warning",
      message: `Condition '${We(o)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: o.id,
      field: "false"
    });
  }
  return n;
}
function fs(e) {
  const n = [], r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (const d of e.nodes)
    r.set(d.id, []), o.set(d.id, []);
  for (const d of e.edges)
    r.get(d.source)?.push({ target: d.target, sourceHandle: d.sourceHandle }), o.get(d.target)?.push(d.source);
  const s = /* @__PURE__ */ new Map();
  for (const d of e.nodes) s.set(d.id, d);
  function i(d) {
    const l = /* @__PURE__ */ new Set([d]), p = [d];
    for (; p.length > 0; ) {
      const f = p.shift(), h = s.get(f);
      if (h && h.type === "join" && f !== d) return f;
      for (const { target: m } of r.get(f) ?? [])
        l.has(m) || (l.add(m), p.push(m));
    }
    return null;
  }
  function c(d) {
    const l = /* @__PURE__ */ new Set([d]), p = [d];
    for (; p.length > 0; ) {
      const f = p.shift(), h = s.get(f);
      if (h && h.type === "fork" && f !== d) return f;
      for (const m of o.get(f) ?? [])
        l.has(m) || (l.add(m), p.push(m));
    }
    return null;
  }
  for (const d of e.nodes) {
    if (d.data.type !== "fork") continue;
    const l = r.get(d.id) ?? [];
    if (l.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const { target: m } of l)
      p.add(i(m));
    const f = p.has(null), h = [...p].filter((m) => m !== null);
    (f || h.length !== 1) && n.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Fork '${We(d)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
      nodeId: d.id
    });
  }
  for (const d of e.nodes) {
    if (d.data.type !== "join") continue;
    const l = o.get(d.id) ?? [];
    if (l.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const m of l)
      p.add(c(m));
    const f = p.has(null), h = [...p].filter((m) => m !== null);
    (f || h.length !== 1) && n.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Join '${We(d)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: d.id
    });
  }
  return n;
}
function hs(e, n) {
  return `${e}${n}`;
}
const xs = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, gs = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function _n(e) {
  return e.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const bs = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function ys(e) {
  const n = gs[e.type] ?? "■", r = bs[e.type] ?? e.type.charAt(0).toUpperCase() + e.type.slice(1);
  let o = null;
  switch (e.data.type) {
    case "llm":
      o = e.data.model || null;
      break;
    case "condition": {
      const i = e.data;
      o = i.label || i.expression || null;
      break;
    }
    case "approval": {
      const c = e.data.approvers?.length ?? 0;
      o = `${c} approver${c === 1 ? "" : "s"}`;
      break;
    }
    case "fork": {
      const i = e.data;
      o = `${i.branchCount} branch${i.branchCount === 1 ? "" : "es"}`;
      break;
    }
    case "action":
      o = e.data.actionType;
      break;
    case "transform":
      o = e.data.transformType;
      break;
    case "trigger":
      o = e.data.triggerType;
      break;
    case "join":
      o = e.data.mode;
      break;
  }
  const s = `${n} ${r}`;
  return _n(o ? `${s}<br/>${o}` : s);
}
function vs(e, n) {
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
function Ns(e) {
  return !e || e === "out" ? null : e;
}
function ws(e) {
  const n = ["flowchart TD"], r = {}, o = /* @__PURE__ */ new Map();
  for (const s of e.nodes) {
    const i = xs[s.type] ?? "n", c = r[i] = (r[i] ?? 0) + 1;
    o.set(s.id, hs(i, c));
  }
  for (const s of e.nodes) {
    const i = o.get(s.id);
    if (!i) continue;
    const c = vs(s.type, ys(s));
    n.push(`  ${i}${c}`);
  }
  for (const s of e.edges) {
    const i = o.get(s.source), c = o.get(s.target);
    if (!i || !c) continue;
    const d = Ns(s.sourceHandle);
    d ? n.push(`  ${i} --"${_n(d)}"--> ${c}`) : n.push(`  ${i} --> ${c}`);
  }
  return n.join(`
`);
}
function Xt(e) {
  return JSON.stringify(e, (n, r) => {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const o = Object.keys(r).sort(), s = {};
      for (const i of o) s[i] = r[i];
      return s;
    }
    return r;
  });
}
function Qt(e) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e) n.set(r.id, r);
  return n;
}
function Zt(e) {
  return new Set(e.edges.map((n) => n.id));
}
function ks(e, n) {
  if (!n)
    return {
      addedNodes: e.nodes.map((w) => ({
        node: w,
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
  const r = Qt(e.nodes), o = Qt(n.nodes), s = [], i = [], c = [];
  for (const [w, C] of r) {
    const b = o.get(w);
    if (!b) {
      s.push({ node: C, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const y = Xt(C.data) !== Xt(b.data), k = C.position.x !== b.position.x || C.position.y !== b.position.y;
    (y || k) && c.push({ node: C, dataChanged: y, positionChanged: k });
  }
  for (const [w, C] of o)
    r.has(w) || i.push({ node: C, dataChanged: !0, positionChanged: !1 });
  const d = Zt(e), l = Zt(n);
  let p = 0, f = 0;
  for (const w of d) l.has(w) || p++;
  for (const w of l) d.has(w) || f++;
  const h = e.name !== n.name, m = (e.icon ?? "") !== (n.icon ?? ""), x = new Set(e.tags ?? []), g = new Set(n.tags ?? []), u = [], v = [];
  for (const w of x) g.has(w) || u.push(w);
  for (const w of g) x.has(w) || v.push(w);
  const N = u.length > 0 || v.length > 0;
  return {
    addedNodes: s,
    removedNodes: i,
    modifiedNodes: c,
    addedEdges: p,
    removedEdges: f,
    nameChanged: h,
    previousName: h ? n.name : void 0,
    iconChanged: m,
    previousIcon: m ? n.icon : void 0,
    tagsChanged: N,
    tagsAdded: u,
    tagsRemoved: v
  };
}
const Cs = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function Is(e) {
  return e.data.type === "condition" && e.data.label ? e.data.label : e.data.type === "llm" ? e.data.model : e.data.type === "action" ? e.data.actionType : e.data.type === "trigger" ? e.data.triggerType : e.type.charAt(0).toUpperCase() + e.type.slice(1);
}
function It(e, n, r) {
  const o = e.node, s = Cs[o.type] ?? "■", i = n !== "removed" && !!r;
  return /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      disabled: !i,
      onClick: i ? () => r(e.node.id) : void 0,
      className: A(
        "flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-[inherit] bg-[#f8fafc] border border-border text-left w-full text-text-primary",
        i ? "cursor-pointer" : "cursor-default",
        n === "removed" && "opacity-85"
      ),
      "data-testid": `diff-row-${n}`,
      children: [
        /* @__PURE__ */ t("span", { className: "text-sm", children: s }),
        /* @__PURE__ */ t("span", { className: "font-semibold", children: o.type }),
        /* @__PURE__ */ t("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: Is(o) }),
        n === "modified" && e.positionChanged ? /* @__PURE__ */ t("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]", children: "moved" }) : null
      ]
    },
    `${n}-${e.node.id}`
  );
}
function Ss({
  open: e,
  onClose: n,
  currentDef: r,
  publishedDef: o,
  onJumpToNode: s
}) {
  const i = B(
    () => ks(r, o),
    [r, o]
  ), c = (f) => {
    s && s(f), n();
  }, d = o !== null, l = r.version, p = r.publishedVersion;
  return /* @__PURE__ */ a(
    je,
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
        /* @__PURE__ */ a("div", { className: "text-[13px] text-text-primary mb-3 flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ a("strong", { children: [
            "v",
            l
          ] }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "vs" }),
          typeof p == "number" ? /* @__PURE__ */ a("strong", { children: [
            "published v",
            p
          ] }) : /* @__PURE__ */ t("strong", { className: "text-text-secondary", children: "never published" })
        ] }),
        r.publishedVersion === void 0 ? /* @__PURE__ */ t("p", { className: "m-0 text-[13px] text-text-secondary", children: "This pipeline has never been published." }) : d ? /* @__PURE__ */ a(X, { children: [
          /* @__PURE__ */ a("div", { className: "flex gap-3 flex-wrap", children: [
            /* @__PURE__ */ a("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ a("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Added (",
                i.addedNodes.length,
                ")"
              ] }),
              i.addedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : i.addedNodes.map((f) => It(f, "added", c))
            ] }),
            /* @__PURE__ */ a("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ a("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Removed (",
                i.removedNodes.length,
                ")"
              ] }),
              i.removedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : i.removedNodes.map((f) => It(f, "removed", void 0))
            ] }),
            /* @__PURE__ */ a("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ a("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Modified (",
                i.modifiedNodes.length,
                ")"
              ] }),
              i.modifiedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : i.modifiedNodes.map((f) => It(f, "modified", c))
            ] })
          ] }),
          /* @__PURE__ */ a("div", { className: "mt-4 pt-3 border-t border-border", children: [
            /* @__PURE__ */ a("div", { className: "text-xs text-text-secondary mt-1", children: [
              /* @__PURE__ */ t("strong", { children: i.addedEdges }),
              " edge",
              i.addedEdges === 1 ? "" : "s",
              " added ·",
              " ",
              /* @__PURE__ */ t("strong", { children: i.removedEdges }),
              " edge",
              i.removedEdges === 1 ? "" : "s",
              " removed"
            ] }),
            i.nameChanged ? /* @__PURE__ */ a("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Name: ",
              /* @__PURE__ */ a("em", { children: [
                '"',
                i.previousName ?? "",
                '"'
              ] }),
              " →",
              " ",
              /* @__PURE__ */ a("strong", { children: [
                '"',
                r.name,
                '"'
              ] })
            ] }) : null,
            i.iconChanged ? /* @__PURE__ */ a("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Icon: ",
              i.previousIcon ?? "—",
              " → ",
              r.icon ?? "—"
            ] }) : null,
            i.tagsChanged ? /* @__PURE__ */ a("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Tags changed: added [",
              i.tagsAdded.join(", ") || "—",
              "], removed [",
              i.tagsRemoved.join(", ") || "—",
              "]"
            ] }) : null
          ] })
        ] }) : /* @__PURE__ */ a("p", { className: "m-0 text-[13px] text-text-secondary", children: [
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
function Ts({ open: e, onClose: n }) {
  return null;
}
const St = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", en = "px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function As(e) {
  const {
    publishConfirmOpen: n,
    onPublishClose: r,
    onPublishConfirm: o,
    hasErrors: s,
    validationErrorCount: i,
    definitionName: c,
    definitionVersion: d,
    deleteConfirmOpen: l,
    onDeleteClose: p,
    onDeleteConfirm: f,
    clearRunsConfirmOpen: h,
    onClearRunsClose: m,
    onClearRunsConfirm: x,
    versionDiffOpen: g,
    onVersionDiffClose: u,
    currentDef: v,
    publishedDef: N,
    onJumpToNode: w,
    simPanelOpen: C,
    onSimPanelClose: b
  } = e;
  return /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t(
      je,
      {
        open: n,
        onClose: r,
        title: "Publish pipeline?",
        maxWidth: 420,
        footer: /* @__PURE__ */ a(X, { children: [
          /* @__PURE__ */ t("button", { onClick: r, className: St, children: "Cancel" }),
          /* @__PURE__ */ t(
            "button",
            {
              onClick: o,
              disabled: s,
              className: A(
                "px-4 py-[7px] text-[13px] font-semibold text-white border-none rounded-[7px] font-[inherit]",
                s ? "bg-[#cbd5e1] cursor-not-allowed" : "bg-primary cursor-pointer"
              ),
              children: "Publish"
            }
          )
        ] }),
        children: /* @__PURE__ */ a("p", { className: "m-0", children: [
          "Publishing will make ",
          /* @__PURE__ */ a("strong", { children: [
            '"',
            c,
            '"'
          ] }),
          " available for runs and set the published version to",
          /* @__PURE__ */ a("strong", { children: [
            " v",
            d + 1
          ] }),
          ".",
          s ? /* @__PURE__ */ a(X, { children: [
            /* @__PURE__ */ t("br", {}),
            /* @__PURE__ */ t("br", {}),
            /* @__PURE__ */ a("span", { className: "text-[#dc2626]", children: [
              "Pipeline has ",
              i,
              " validation error",
              i === 1 ? "" : "s",
              ". Fix them before publishing."
            ] })
          ] }) : null
        ] })
      }
    ),
    /* @__PURE__ */ t(
      je,
      {
        open: l,
        onClose: p,
        title: "Delete pipeline?",
        maxWidth: 400,
        footer: /* @__PURE__ */ a(X, { children: [
          /* @__PURE__ */ t("button", { onClick: p, className: St, children: "Cancel" }),
          /* @__PURE__ */ t("button", { onClick: f, className: en, children: "Delete" })
        ] }),
        children: /* @__PURE__ */ a("p", { className: "m-0", children: [
          /* @__PURE__ */ a("strong", { children: [
            '"',
            c,
            '"'
          ] }),
          " will be permanently removed. Run history for this pipeline will also be lost."
        ] })
      }
    ),
    /* @__PURE__ */ t(
      je,
      {
        open: h,
        onClose: m,
        title: "Clear run history?",
        maxWidth: 400,
        footer: /* @__PURE__ */ a(X, { children: [
          /* @__PURE__ */ t("button", { onClick: m, className: St, children: "Cancel" }),
          /* @__PURE__ */ t("button", { onClick: x, className: en, children: "Clear history" })
        ] }),
        children: /* @__PURE__ */ a("p", { className: "m-0", children: [
          "All stored run history for ",
          /* @__PURE__ */ a("strong", { children: [
            '"',
            c,
            '"'
          ] }),
          " will be permanently removed. This cannot be undone."
        ] })
      }
    ),
    /* @__PURE__ */ t(
      Ss,
      {
        open: g,
        onClose: u,
        currentDef: v,
        publishedDef: N,
        onJumpToNode: w
      }
    ),
    /* @__PURE__ */ t(
      Ts,
      {
        open: C,
        onClose: b
      }
    )
  ] });
}
function Ds({ runId: e, visible: n }) {
  const [r, o] = R(/* @__PURE__ */ new Map()), s = ae(null), i = ae(!0), c = ae(null);
  J(() => {
    e !== c.current && (c.current = e, o(/* @__PURE__ */ new Map()), i.current = !0);
  }, [e]);
  const d = P(() => {
    const x = s.current;
    if (!x) return;
    const g = x.scrollHeight - x.scrollTop - x.clientHeight < 30;
    i.current = g;
  }, []), l = P(() => {
    if (!i.current) return;
    const x = s.current;
    x && (x.scrollTop = x.scrollHeight);
  }, []), p = P(
    (x) => {
      if (!("eventType" in x)) return;
      const { eventType: g, payload: u } = x;
      if (!g.startsWith("pipeline.llm.")) return;
      const v = u?.runId;
      if (!e || v !== e) return;
      const N = u?.stepId;
      if (N) {
        if (g === "pipeline.llm.stream.opened")
          o((w) => {
            const C = new Map(w);
            return C.has(N) || C.set(N, {
              stepId: N,
              tokens: [],
              text: "",
              active: !0,
              summary: null,
              collapsed: !1,
              startedAt: Date.now()
            }), C;
          });
        else if (g === "pipeline.llm.token") {
          const w = u?.token;
          if (w === void 0) return;
          o((C) => {
            const b = new Map(C), y = b.get(N);
            if (y) {
              const k = {
                ...y,
                tokens: [...y.tokens, w],
                text: y.text + w,
                active: !0
              };
              b.set(N, k);
            } else
              b.set(N, {
                stepId: N,
                tokens: [w],
                text: w,
                active: !0,
                summary: null,
                collapsed: !1,
                startedAt: Date.now()
              });
            return b;
          });
        } else if (g === "pipeline.llm.response") {
          const w = u?.tokensIn, C = u?.tokensOut;
          o((b) => {
            const y = new Map(b), k = y.get(N), D = k ? Date.now() - k.startedAt : 0, S = D > 1e3 ? `${(D / 1e3).toFixed(1)}s` : `${D}ms`, T = `${N}: ${w ?? "?"} tokens in, ${C ?? "?"} tokens out (${S})`;
            return k ? y.set(N, {
              ...k,
              active: !1,
              summary: T
            }) : y.set(N, {
              stepId: N,
              tokens: [],
              text: "",
              active: !1,
              summary: T,
              collapsed: !1,
              startedAt: Date.now()
            }), y;
          });
        }
      }
    },
    [e]
  );
  $e("*", p), J(() => {
    l();
  }, [r, l]);
  const f = P((x) => {
    o((g) => {
      const u = new Map(g), v = u.get(x);
      return v && u.set(x, { ...v, collapsed: !v.collapsed }), u;
    });
  }, []), h = B(() => {
    for (const x of r.values())
      if (x.active) return !0;
    return !1;
  }, [r]), m = B(() => Array.from(r.values()), [r]);
  return n ? /* @__PURE__ */ a(
    "div",
    {
      className: "flex flex-col bg-[#1e1e2e] border-t border-[#313244] max-h-[320px] min-h-[160px] overflow-hidden relative",
      "data-testid": "live-output-panel",
      children: [
        /* @__PURE__ */ t("div", { className: "flex items-center justify-between py-2 px-[14px] bg-[#181825] border-b border-[#313244] shrink-0", children: /* @__PURE__ */ a("div", { className: "text-xs font-bold text-[#cdd6f4] tracking-[0.04em] uppercase flex items-center gap-2", children: [
          /* @__PURE__ */ t("span", { children: "Live Output" }),
          h && /* @__PURE__ */ t("span", { className: "w-1.5 h-1.5 rounded-full bg-[#a6e3a1] [animation:live-output-blink_1.2s_ease-in-out_infinite]" }),
          e && /* @__PURE__ */ a("span", { className: "text-[10px] text-[#6c7086] font-normal normal-case", children: [
            e.slice(0, 8),
            "..."
          ] })
        ] }) }),
        /* @__PURE__ */ t(
          "div",
          {
            ref: s,
            className: "flex-1 overflow-y-auto py-[10px] px-[14px] text-[13px] leading-[1.6] text-[#cdd6f4] font-code",
            onScroll: d,
            children: m.length === 0 ? /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full text-[#6c7086] text-[13px] italic", children: e ? "Waiting for LLM output..." : "No active run" }) : m.map((x) => /* @__PURE__ */ a("div", { children: [
              /* @__PURE__ */ a(
                "div",
                {
                  className: A(
                    "flex items-center gap-2 py-1.5 cursor-pointer select-none text-[11px] font-semibold border-b border-[#313244] mb-1.5",
                    x.active ? "text-[#89b4fa]" : "text-[#a6adc8]"
                  ),
                  onClick: () => f(x.stepId),
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (g) => {
                    (g.key === "Enter" || g.key === " ") && f(x.stepId);
                  },
                  children: [
                    /* @__PURE__ */ t("span", { className: "text-[10px]", children: x.collapsed ? "▶" : "▼" }),
                    /* @__PURE__ */ t("span", { children: x.stepId }),
                    x.active && /* @__PURE__ */ t("span", { className: "text-[#a6e3a1] text-[10px]", children: "streaming" })
                  ]
                }
              ),
              !x.collapsed && /* @__PURE__ */ a(X, { children: [
                x.text.length > 0 && /* @__PURE__ */ a("div", { className: "whitespace-pre-wrap break-words m-0 mb-3 p-0 text-[#cdd6f4]", children: [
                  x.text,
                  x.active && /* @__PURE__ */ t("span", { className: "inline-block w-0.5 h-[14px] bg-[#89b4fa] ml-px align-text-bottom [animation:live-output-blink_1s_step-end_infinite]" })
                ] }),
                x.summary && /* @__PURE__ */ a("div", { className: "text-[11px] text-[#a6e3a1] font-semibold pt-1 pb-2 border-b border-[#313244] mb-2", children: [
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
function pt(e, n) {
  const r = new Blob([n], { type: "application/json" }), o = URL.createObjectURL(r), s = document.createElement("a");
  s.href = o, s.download = e, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(o);
}
function ut(e, n) {
  if (!n) return "step";
  const r = e?.nodes.find((o) => o.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Rs(e) {
  const n = st(), { toast: r } = kt(), { definition: o, selectedNodeId: s, setSelectedNodeId: i } = ot(), c = ae(n.runs);
  J(() => {
    c.current = n.runs;
  }, [n.runs]);
  const d = ae(o);
  J(() => {
    d.current = o;
  }, [o]);
  const l = P(
    (I) => I ? c.current[I]?.pipelineId === e : !1,
    [e]
  ), [p, f] = R(null), [h, m] = R(null), x = P(() => {
    f(null), m(null);
  }, []), g = P(
    (I) => {
      m(I);
    },
    []
  ), u = P(
    (I) => {
      "eventType" in I || I.pipelineId === e && (r("Run started", { type: "info" }), f(null), m(null));
    },
    [e, r]
  ), v = P(
    (I) => {
      if ("eventType" in I || !l(I.runId)) return;
      const M = Math.round(I.durationMs / 100) / 10;
      r(`Run completed in ${M}s`, { type: "success" });
    },
    [l, r]
  ), N = P(
    (I) => {
      if ("eventType" in I || !l(I.runId)) return;
      const M = I.error.nodeId, Y = ut(d.current, M);
      r(`Run failed at ${Y}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => i(M)
      }), f(I.error);
    },
    [l, i, r]
  ), w = P(
    (I) => {
      "eventType" in I || l(I.runId) && r("Run cancelled", { type: "warning" });
    },
    [l, r]
  ), C = P(
    (I) => {
      if ("eventType" in I || !l(I.runId)) return;
      const M = I.stepId, Y = ut(d.current, M);
      r(`Approval requested on "${Y}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => i(M)
      });
    },
    [l, i, r]
  );
  $e("pipeline.run.started", u), $e("pipeline.run.completed", v), $e("pipeline.run.failed", N), $e("pipeline.run.cancelled", w), $e("pipeline.approval.requested", C);
  const [b, y] = R(null);
  J(() => {
    if (n.activeRunIds.length > 0) {
      const I = n.activeRunIds[n.activeRunIds.length - 1];
      I !== b && y(I);
      return;
    }
    if (!b) {
      const I = Object.values(n.runs).sort(
        (M, Y) => Y.startedAt.localeCompare(M.startedAt)
      );
      I.length > 0 && y(I[0].id);
    }
  }, [n.activeRunIds, n.runs, b]);
  const k = b ? n.runs[b] : void 0, D = !!k && (k.status === "running" || k.status === "pending" || k.status === "awaiting_approval"), [S, T] = R(/* @__PURE__ */ new Set()), [$, H] = R(null), [V, Q] = R(null), [de, ce] = R(null), [ne, pe] = R(0), [O, G] = R(!1), [K, F] = R(null), W = P(
    (I, M) => {
      M === null ? (Q(null), ce(null)) : (Q(M), ce(I));
    },
    []
  ), ie = P((I) => {
    T((M) => {
      const Y = new Set(M);
      return Y.has(I) ? Y.delete(I) : Y.add(I), Y;
    });
  }, []), le = P(async () => {
    if (S.size !== 0)
      try {
        const I = await n.triggerDebugRun(
          e,
          Array.from(S)
        );
        y(I);
      } catch (I) {
        console.error("[PipelineEditor] triggerDebugRun failed", I);
      }
  }, [S, n, e]), be = P(() => {
    $ && (n.resolveBreakpoint($.runId, $.stepId, "continue"), H(null));
  }, [$, n]), E = P(() => {
    $ && (n.resolveBreakpoint($.runId, $.stepId, "step_over"), H(null));
  }, [$, n]), Z = P(() => {
    $ && (n.resolveBreakpoint($.runId, $.stepId, "resume_all"), H(null));
  }, [$, n]), ge = P(async () => {
    if (!(!$ || !V || de !== $.stepId) && Object.keys(V).length !== 0) {
      G(!0);
      try {
        await Xn(
          e,
          $.runId,
          $.stepId,
          { mode: "merge", values: V }
        ), Q(null), ce(null), pe((I) => I + 1), n.resolveBreakpoint($.runId, $.stepId, "continue"), H(null);
      } catch (I) {
        if (I instanceof Qn)
          r(`Patch rejected: ${I.reason}`, { type: "error", durationMs: 8e3 });
        else if (I instanceof Ht)
          r(`Apply failed (HTTP ${I.status})`, { type: "error", durationMs: 6e3 });
        else {
          const M = I instanceof Error ? I.message : String(I);
          r(`Apply failed: ${M}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        G(!1);
      }
    }
  }, [$, V, de, e, n, r]), De = P(
    async (I) => {
      if ($) {
        F(I);
        try {
          await Zn(
            e,
            $.runId,
            $.stepId,
            I
          ), r("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (M) {
          if (M instanceof Ht)
            r(`Revert failed (HTTP ${M.status})`, { type: "error", durationMs: 6e3 });
          else {
            const Y = M instanceof Error ? M.message : String(M);
            r(`Revert failed: ${Y}`, { type: "error", durationMs: 6e3 });
          }
        } finally {
          F(null);
        }
      }
    },
    [$, e, r]
  ), qe = P(
    (I) => {
      if ("eventType" in I || !l(I.runId)) return;
      H({ runId: I.runId, stepId: I.stepId });
      const M = ut(d.current, I.stepId);
      r(`Paused at breakpoint: ${M}`, { type: "warning", durationMs: 6e3 });
    },
    [l, r]
  );
  $e("pipeline.step.breakpoint", qe);
  const Pe = P(
    (I) => {
      "eventType" in I || $ && $.runId === I.runId && H(null);
    },
    [$]
  );
  $e("pipeline.run.completed", Pe), $e("pipeline.run.failed", Pe), $e("pipeline.run.cancelled", Pe);
  const Ae = P(() => {
    p?.nodeId && (n.retryFromStep(p.nodeId), x());
  }, [p, n, x]), Le = o?.status === "published", Ee = !D && !Le, _e = D ? "Cancel the active run" : Le ? "Start a new run" : "Publish the pipeline to enable runs", [ye, se] = R(!1), [q, L] = R({}), [z, re] = R(!1), [ue, Ie] = R("config");
  J(() => {
    s !== null && Ie("config");
  }, [s]);
  const Ne = P(async (I) => {
    re(!0);
    try {
      const M = await n.triggerRun(e, I);
      y(M), Ie("runs"), r(`Pipeline triggered — run ${M.slice(0, 8)}…`, { type: "success" });
    } catch (M) {
      console.error("[PipelineEditor] triggerRun failed", M), r(`Trigger failed: ${M.message}`, { type: "error" });
    } finally {
      re(!1);
    }
  }, [n, e, r]), Fe = P(async () => {
    if (D && b) {
      n.cancelRun(b);
      return;
    }
    Ee || Ne();
  }, [D, b, Ee, n, Ne]), xt = P(() => {
    se(!1), Ne(q);
  }, [Ne, q]);
  return {
    currentRunId: b,
    setCurrentRunId: y,
    activeError: p,
    setActiveError: f,
    errorNodeAnchor: h,
    handleDismissError: x,
    handleErrorNodePosition: g,
    handleRetryFromError: Ae,
    handleRunClick: Fe,
    handleTriggerInputSubmit: xt,
    isRunActive: D,
    runDisabled: Ee,
    runTitle: _e,
    isTriggering: z,
    triggerInputOpen: ye,
    setTriggerInputOpen: se,
    triggerInputValues: q,
    setTriggerInputValues: L,
    breakpoints: S,
    handleToggleBreakpoint: ie,
    handleDebugRunClick: le,
    pausedBreakpoint: $,
    handleBreakpointContinue: be,
    handleBreakpointStepOver: E,
    handleBreakpointResumeAll: Z,
    handleApplyAndContinue: ge,
    handleRevertPatch: De,
    applyingPatch: O,
    revertingPatchId: K,
    dirtyPatch: V,
    dirtyPatchStepId: de,
    handleContextEditBufferChange: W,
    resetEditBufferKey: ne,
    sidebarTab: ue,
    setSidebarTab: Ie
  };
}
function $s({
  isPublished: e,
  showTags: n,
  hasPublishedVersion: r,
  onDuplicate: o,
  onCopyMermaid: s,
  onViewVersions: i,
  onRevert: c,
  onToggleShowTags: d,
  onViewRunHistory: l,
  onClearRunHistory: p,
  onSimPanelOpen: f,
  onDelete: h
}) {
  const m = A(
    "block w-full text-left px-3.5 py-2 text-[13px]",
    "border-none bg-transparent cursor-pointer font-inherit text-text-primary",
    "hover:bg-surface-hover"
  ), x = A(
    "block w-full text-left px-3.5 py-2 text-[13px]",
    "border-none bg-transparent cursor-pointer font-inherit text-red-600",
    "hover:bg-surface-hover"
  );
  return /* @__PURE__ */ a(
    "div",
    {
      className: A(
        "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg",
        "shadow-lg p-0 min-w-[200px] max-h-[320px] overflow-y-auto z-20"
      ),
      role: "menu",
      children: [
        /* @__PURE__ */ t("button", { className: m, role: "menuitem", onClick: o, children: "Duplicate" }),
        /* @__PURE__ */ t(
          "button",
          {
            className: m,
            role: "menuitem",
            onClick: s,
            "data-testid": "copy-mermaid-btn",
            children: "Copy Mermaid"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: m,
            role: "menuitem",
            onClick: i,
            "data-testid": "view-versions-btn",
            children: "View changes since publish"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: m,
            role: "menuitem",
            onClick: c,
            disabled: !r,
            children: "Revert to published"
          }
        ),
        /* @__PURE__ */ t("div", { className: "border-t border-slate-100 my-1" }),
        /* @__PURE__ */ t(
          "button",
          {
            className: m,
            role: "menuitem",
            onClick: d,
            "data-testid": "toggle-tags-row",
            children: n ? "Hide tags" : "Show tags"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: m,
            role: "menuitem",
            onClick: l,
            children: "View run history"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: x,
            role: "menuitem",
            onClick: p,
            children: "Clear run history"
          }
        ),
        !1,
        /* @__PURE__ */ t("div", { className: "border-t border-slate-100 my-1" }),
        /* @__PURE__ */ t(
          "button",
          {
            className: x,
            role: "menuitem",
            onClick: h,
            children: "Delete"
          }
        )
      ]
    }
  );
}
const Tt = {
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-green-50 text-green-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600"
};
function Ms({
  pipelineId: e,
  definition: n,
  dirty: r,
  savingFlash: o,
  isRunActive: s,
  isTriggering: i,
  runDisabled: c,
  runTitle: d,
  currentRun: l,
  breakpoints: p,
  onRunClick: f,
  onDebugRunClick: h,
  onExport: m,
  onPublishClick: x,
  onDuplicate: g,
  onCopyMermaid: u,
  onViewVersions: v,
  onRevert: N,
  onToggleShowTags: w,
  showTags: C,
  onViewRunHistory: b,
  onClearRunHistory: y,
  onSimPanelOpen: k,
  onDelete: D
}) {
  const S = Me(), { rename: T, setIcon: $, setSelectedNodeId: H } = ot(), [V, Q] = R(!1), [de, ce] = R(""), ne = ae(null);
  J(() => {
    V && (ce(n.name ?? ""), setTimeout(() => ne.current?.focus(), 0));
  }, [V, n.name]);
  const pe = () => {
    const q = de.trim();
    q && q !== n.name && T(q), Q(!1);
  }, O = n ? Ln(n) : null;
  (O?.errors.length ?? 0) > 0;
  const G = n.status === "published", K = r ? { label: "Saving…", variant: "info" } : o ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, F = n.status === "published" ? { label: `v${n.version} · Published`, variant: "success" } : typeof n.publishedVersion == "number" ? { label: `v${n.version} · Draft (pub v${n.publishedVersion})`, variant: "warning" } : { label: `v${n.version} · Draft`, variant: "neutral" }, W = O ? O.errors.length > 0 ? { label: `✗ ${O.errors.length} error${O.errors.length === 1 ? "" : "s"}`, variant: "danger" } : O.warnings.length > 0 ? { label: `⚠ ${O.warnings.length} warning${O.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [ie, le] = R(!1), be = ae(null);
  tt(be, () => le(!1), ie);
  const E = O ? [...O.errors, ...O.warnings] : [], Z = (q) => {
    q && (H(q), le(!1));
  }, ge = n.nodes.filter((q) => q.type !== "trigger").length, De = l ? Object.values(l.steps).filter(
    (q) => q.status === "completed" || q.status === "skipped"
  ).length : 0, Pe = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), Ae = s && l ? { text: `Running (${De}/${ge} steps) · ${Pe}s`, variant: "running" } : l?.status === "completed" ? { text: `Completed in ${l.durationMs ? (l.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : l?.status === "failed" ? { text: `Failed at ${ut(n, l.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, Le = {
    running: "bg-blue-50 text-blue-600",
    success: "bg-green-50 text-green-600",
    error: "bg-red-50 text-red-600"
  }, Ee = s ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [_e, ye] = R(!1), se = ae(null);
  return tt(se, () => ye(!1), _e), /* @__PURE__ */ a(
    "div",
    {
      className: A(
        "h-11 shrink-0 flex items-center gap-2.5 px-3",
        "border-b border-border bg-surface",
        "sticky top-0 z-5"
      ),
      children: [
        /* @__PURE__ */ t(
          ct,
          {
            onClick: () => S("/pipelines"),
            "aria-label": "Back to pipelines",
            title: "Back to pipelines",
            children: "←"
          }
        ),
        /* @__PURE__ */ t(
          Ar,
          {
            value: n.icon ?? "🔀",
            onChange: $
          }
        ),
        V ? /* @__PURE__ */ t(
          "input",
          {
            ref: ne,
            value: de,
            onChange: (q) => ce(q.target.value),
            onBlur: pe,
            onKeyDown: (q) => {
              q.key === "Enter" && pe(), q.key === "Escape" && (ce(n.name), Q(!1));
            },
            className: A(
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
            onClick: () => Q(!0),
            className: A(
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
            className: A(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              Tt[K.variant]
            ),
            "data-testid": "save-status",
            children: K.label
          }
        ),
        /* @__PURE__ */ t(
          "span",
          {
            className: A(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              Tt[F.variant]
            ),
            "data-testid": "version-badge",
            children: F.label
          }
        ),
        /* @__PURE__ */ a("div", { className: "relative", ref: be, children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => le((q) => !q),
              className: A(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
                "cursor-pointer border-none",
                Tt[W.variant]
              ),
              "data-testid": "validation-indicator",
              children: W.label
            }
          ),
          ie && E.length > 0 && /* @__PURE__ */ t(
            "div",
            {
              className: A(
                "absolute top-full mt-1.5 bg-surface border border-border rounded-lg",
                "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"
              ),
              children: E.map((q, L) => /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  onClick: () => Z(q.nodeId),
                  className: A(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    q.nodeId ? "cursor-pointer" : "cursor-default",
                    L < E.length - 1 && "border-b border-border"
                  ),
                  children: [
                    /* @__PURE__ */ t(
                      "span",
                      {
                        className: A(
                          "font-bold text-xs",
                          q.severity === "error" ? "text-red-600" : "text-amber-600"
                        ),
                        children: q.severity === "error" ? "✗" : "⚠"
                      }
                    ),
                    /* @__PURE__ */ a("span", { className: "flex-1 text-xs", children: [
                      /* @__PURE__ */ t("div", { className: "font-semibold", children: q.code }),
                      /* @__PURE__ */ t("div", { className: "text-text-secondary", children: q.message }),
                      q.nodeId && /* @__PURE__ */ t("div", { className: "mt-0.5 text-[11px] text-primary", children: "Jump to node →" })
                    ] })
                  ]
                },
                `${q.code}-${L}`
              ))
            }
          )
        ] }),
        Ae.variant !== "none" && /* @__PURE__ */ a(
          "span",
          {
            className: A(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold font-inherit leading-snug whitespace-nowrap",
              Le[Ae.variant]
            ),
            "data-testid": "run-status-indicator",
            children: [
              Ae.variant === "running" && /* @__PURE__ */ t("span", { className: "inline-block w-3 h-3 border-2 border-slate-200 border-t-primary rounded-full animate-spin" }),
              Ae.variant === "success" && "✓ ",
              Ae.variant === "error" && "✗ ",
              Ae.text
            ]
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex-1" }),
        /* @__PURE__ */ t(
          Ue,
          {
            variant: "secondary",
            onClick: () => S("/pipelines/metrics"),
            title: "View pipeline metrics dashboard",
            "data-testid": "metrics-button",
            children: "Metrics"
          }
        ),
        /* @__PURE__ */ t(
          Ue,
          {
            variant: "secondary",
            onClick: m,
            title: "Export pipeline as JSON",
            "data-testid": "export-button",
            children: "Export"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: x,
            title: G ? "Already published at this version" : "Publish pipeline to enable runs",
            disabled: G,
            className: A(
              "px-3 py-1.5 text-[13px] font-semibold border-none rounded-md font-inherit shrink-0",
              G ? "bg-surface-hover text-text-tertiary cursor-default opacity-70" : "bg-green-600 text-white cursor-pointer"
            ),
            "data-testid": "publish-button",
            children: G ? "Published" : "Publish"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: f,
            disabled: c || i,
            title: d,
            className: A(
              "px-3.5 py-1.5 text-[13px] font-semibold text-white border-none rounded-md font-inherit shrink-0",
              s ? "bg-red-600" : "bg-primary",
              c || i ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            ),
            "data-testid": "run-button",
            children: i ? /* @__PURE__ */ a("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ t("span", { className: "inline-block w-3 h-3 border-2 border-slate-200 border-t-white rounded-full animate-spin" }),
              "Triggering…"
            ] }) : Ee
          }
        ),
        p.size > 0 && /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: h,
            disabled: c || s,
            title: `Debug run (${p.size} breakpoint${p.size > 1 ? "s" : ""})`,
            className: A(
              "px-3.5 py-1.5 text-[13px] font-semibold bg-amber-600 text-white",
              "border-none rounded-md font-inherit shrink-0",
              c || s ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            ),
            "data-testid": "debug-run-button",
            children: [
              "Debug (",
              p.size,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ a("div", { className: "relative", ref: se, children: [
          /* @__PURE__ */ t(
            ct,
            {
              onClick: () => ye((q) => !q),
              "aria-label": "More actions",
              "data-testid": "overflow-menu-btn",
              children: "⋯"
            }
          ),
          _e && /* @__PURE__ */ t(
            $s,
            {
              isPublished: G,
              showTags: C,
              onDuplicate: () => {
                g(), ye(!1);
              },
              onCopyMermaid: () => {
                u(), ye(!1);
              },
              onViewVersions: () => {
                v(), ye(!1);
              },
              onRevert: () => {
                N(), ye(!1);
              },
              onToggleShowTags: () => {
                w(), ye(!1);
              },
              onViewRunHistory: () => {
                b(), ye(!1);
              },
              onClearRunHistory: () => {
                y(), ye(!1);
              },
              onSimPanelOpen: () => {
                k(), ye(!1);
              },
              onDelete: () => {
                D(), ye(!1);
              },
              hasPublishedVersion: typeof n.publishedVersion == "number"
            }
          )
        ] })
      ]
    }
  );
}
const Ps = 12;
function we(e) {
  return A("text-xs", {
    string: "text-[#a6e3a1]",
    number: "text-[#fab387]",
    boolean: "text-[#cba6f7]",
    null: "text-[#6c7086]",
    bracket: "text-[#9399b2]"
  }[e]);
}
function ft({
  data: e,
  depth: n = 0,
  highlightKeys: r,
  keyName: o,
  isHighlighted: s = !1
}) {
  const [i, c] = R(n > 2);
  if (n > Ps)
    return /* @__PURE__ */ t("span", { className: we("string"), children: "[max depth]" });
  const d = s || o != null && r?.has(o);
  if (e === null)
    return /* @__PURE__ */ t("span", { className: A(we("null"), d && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "null" });
  if (e === void 0)
    return /* @__PURE__ */ t("span", { className: A(we("null"), d && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "undefined" });
  if (typeof e == "boolean")
    return /* @__PURE__ */ t("span", { className: A(we("boolean"), d && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(e) });
  if (typeof e == "number")
    return /* @__PURE__ */ t("span", { className: A(we("number"), d && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(e) });
  if (typeof e == "string") {
    const l = e.length > 120 ? e.slice(0, 120) + "..." : e;
    return /* @__PURE__ */ a("span", { className: A(we("string"), d && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: [
      '"',
      l,
      '"'
    ] });
  }
  if (Array.isArray(e))
    return e.length === 0 ? /* @__PURE__ */ t("span", { className: we("bracket"), children: "[]" }) : /* @__PURE__ */ a("span", { children: [
      /* @__PURE__ */ t(
        "span",
        {
          className: "cursor-pointer select-none text-[9px] mr-1 text-[#6c7086] inline-block w-3 text-center",
          onClick: () => c((l) => !l),
          role: "button",
          tabIndex: 0,
          onKeyDown: (l) => {
            (l.key === "Enter" || l.key === " ") && c((p) => !p);
          },
          children: i ? "▶" : "▼"
        }
      ),
      /* @__PURE__ */ t("span", { className: we("bracket"), children: "[" }),
      i ? /* @__PURE__ */ a("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        e.length,
        " items"
      ] }) : /* @__PURE__ */ t("div", { className: "pl-4", children: e.map((l, p) => /* @__PURE__ */ a("div", { className: "leading-relaxed whitespace-nowrap", children: [
        /* @__PURE__ */ a("span", { className: "text-[#6c7086] text-[11px]", children: [
          p,
          ": "
        ] }),
        /* @__PURE__ */ t(ft, { data: l, depth: n + 1, highlightKeys: r }),
        p < e.length - 1 && /* @__PURE__ */ t("span", { className: we("bracket"), children: "," })
      ] }, p)) }),
      /* @__PURE__ */ t("span", { className: we("bracket"), children: "]" })
    ] });
  if (typeof e == "object") {
    const l = Object.entries(e);
    return l.length === 0 ? /* @__PURE__ */ t("span", { className: we("bracket"), children: "{}" }) : /* @__PURE__ */ a("span", { children: [
      /* @__PURE__ */ t(
        "span",
        {
          className: "cursor-pointer select-none text-[9px] mr-1 text-[#6c7086] inline-block w-3 text-center",
          onClick: () => c((p) => !p),
          role: "button",
          tabIndex: 0,
          onKeyDown: (p) => {
            (p.key === "Enter" || p.key === " ") && c((f) => !f);
          },
          children: i ? "▶" : "▼"
        }
      ),
      /* @__PURE__ */ t("span", { className: we("bracket"), children: "{" }),
      i ? /* @__PURE__ */ a("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        l.length,
        " keys"
      ] }) : /* @__PURE__ */ t("div", { className: "pl-4", children: l.map(([p, f], h) => {
        const m = r?.has(p) || s;
        return /* @__PURE__ */ a("div", { className: "leading-relaxed whitespace-nowrap", children: [
          /* @__PURE__ */ t("span", { className: A(
            "text-xs font-medium text-[#89b4fa]",
            m && "text-[#a6e3a1] font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5"
          ), children: p }),
          /* @__PURE__ */ t("span", { className: we("bracket"), children: ": " }),
          /* @__PURE__ */ t(
            ft,
            {
              data: f,
              depth: n + 1,
              highlightKeys: n === 0 ? r : void 0,
              keyName: p,
              isHighlighted: m
            }
          ),
          h < l.length - 1 && /* @__PURE__ */ t("span", { className: we("bracket"), children: "," })
        ] }, p);
      }) }),
      /* @__PURE__ */ t("span", { className: we("bracket"), children: "}" })
    ] });
  }
  return /* @__PURE__ */ t("span", { className: we("string"), children: String(e) });
}
function Es({
  snapshots: e,
  activeStepId: n,
  fallbackActiveStepId: r,
  onStepSelect: o
}) {
  const s = n ?? r;
  return /* @__PURE__ */ t("div", { className: "w-[140px] shrink-0 border-r border-border overflow-y-auto", children: e.map((i, c) => {
    const d = i.stepId === s;
    return /* @__PURE__ */ a(
      "div",
      {
        className: A(
          "px-2.5 py-1.5 text-[11px] font-mono cursor-pointer border-b border-border overflow-hidden text-ellipsis whitespace-nowrap",
          d ? "text-text-primary bg-surface-inset font-semibold" : "text-text-tertiary font-normal"
        ),
        onClick: () => o?.(i.stepId),
        role: "button",
        tabIndex: 0,
        onKeyDown: (l) => {
          (l.key === "Enter" || l.key === " ") && o?.(i.stepId);
        },
        title: i.stepId,
        children: [
          i.newKeys.length > 0 && /* @__PURE__ */ t("span", { className: "text-[#a6e3a1] mr-1 text-[9px]", children: "+" }),
          /* @__PURE__ */ a("span", { className: "text-[10px] text-[#9399b2] mr-1", children: [
            c + 1,
            "."
          ] }),
          i.stepId ? i.stepId.slice(0, 8) : `step-${c + 1}`
        ]
      },
      i.stepId || c
    );
  }) });
}
function Os(e) {
  return typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : "object";
}
function Ls({ k: e, initial: n, onCommit: r, onError: o, onFocus: s }) {
  const [i, c] = R(() => {
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
      value: i,
      onChange: (d) => c(d.target.value),
      onFocus: s,
      onBlur: () => {
        try {
          const d = JSON.parse(i);
          r(d);
        } catch (d) {
          o(`Invalid JSON: ${d instanceof Error ? d.message : String(d)}`);
        }
      },
      className: "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono min-h-[60px] resize-y"
    }
  );
}
function _s({
  inputContext: e,
  buffer: n,
  parseErrors: r,
  newKeyDraft: o,
  setNewKeyDraft: s,
  onCommitNewKey: i,
  onBeginEditKey: c,
  onSetValue: d,
  onRemoveKey: l,
  onParseError: p
}) {
  const f = B(() => {
    const m = /* @__PURE__ */ new Set([
      ...Object.keys(e),
      ...Object.keys(n)
    ]);
    return Array.from(m);
  }, [e, n]), h = "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono";
  return /* @__PURE__ */ a("div", { "data-testid": "context-edit-table", children: [
    f.map((m) => {
      const x = m in n, g = x ? n[m] : e[m], u = Os(g), v = x;
      return /* @__PURE__ */ a(
        "div",
        {
          className: "grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 border-b border-[#313244]",
          "data-testid": `context-edit-row-${m}`,
          children: [
            /* @__PURE__ */ a(
              "span",
              {
                className: A(
                  "text-xs font-medium text-[#89b4fa] pt-1 overflow-hidden text-ellipsis whitespace-nowrap",
                  v && "text-[#a6e3a1] font-bold"
                ),
                title: m,
                children: [
                  m,
                  v && /* @__PURE__ */ t("span", { className: "ml-1 text-[9px]", children: "●" })
                ]
              }
            ),
            /* @__PURE__ */ a("div", { className: "min-w-0", children: [
              u === "boolean" ? /* @__PURE__ */ a(
                "select",
                {
                  "data-testid": `context-edit-input-${m}`,
                  value: String(g),
                  onChange: (N) => d(m, N.target.value === "true"),
                  onFocus: () => c(m, g),
                  className: h,
                  children: [
                    /* @__PURE__ */ t("option", { value: "true", children: "true" }),
                    /* @__PURE__ */ t("option", { value: "false", children: "false" })
                  ]
                }
              ) : u === "number" ? /* @__PURE__ */ t(
                "input",
                {
                  "data-testid": `context-edit-input-${m}`,
                  type: "number",
                  value: String(g),
                  onChange: (N) => {
                    const w = N.target.value === "" ? 0 : Number(N.target.value);
                    d(m, Number.isNaN(w) ? 0 : w);
                  },
                  onFocus: () => c(m, g),
                  className: h
                }
              ) : u === "string" ? /* @__PURE__ */ t(
                "input",
                {
                  "data-testid": `context-edit-input-${m}`,
                  type: "text",
                  value: g ?? "",
                  onChange: (N) => d(m, N.target.value),
                  onFocus: () => c(m, g),
                  className: h
                }
              ) : /* @__PURE__ */ t(
                Ls,
                {
                  k: m,
                  initial: g,
                  onCommit: (N) => d(m, N),
                  onError: (N) => p(m, N),
                  onFocus: () => c(m, g)
                }
              ),
              r[m] && /* @__PURE__ */ t(
                "div",
                {
                  "data-testid": `context-edit-parse-error-${m}`,
                  className: "text-[#f38ba8] text-[11px] mt-1",
                  children: r[m]
                }
              )
            ] }),
            /* @__PURE__ */ t("div", { className: "flex gap-1", children: v && /* @__PURE__ */ t(
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
    /* @__PURE__ */ a(
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
              value: o.key,
              onChange: (m) => s({ ...o, key: m.target.value }),
              className: h
            }
          ),
          /* @__PURE__ */ t(
            "input",
            {
              "data-testid": "context-edit-new-value",
              type: "text",
              placeholder: "value (string or JSON)",
              value: o.value,
              onChange: (m) => s({ ...o, value: m.target.value }),
              onKeyDown: (m) => {
                m.key === "Enter" && (m.preventDefault(), i());
              },
              className: h
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": "context-edit-add-btn",
              onClick: i,
              disabled: !o.key.trim(),
              className: A(
                "px-2.5 py-0.5 text-[11px] font-semibold border rounded-sm cursor-pointer font-mono",
                o.key.trim() ? "bg-[#a6e3a1] text-[#1e1e2e] border-[#a6e3a1]" : "bg-transparent text-[#45475a] border-[#313244] cursor-not-allowed"
              ),
              children: "+ Add field"
            }
          )
        ]
      }
    )
  ] });
}
function Us(e, n, r) {
  const o = { ...e }, s = { ...o.steps ?? {} };
  return s[n] = r, o.steps = s, r && typeof r == "object" && !Array.isArray(r) && Object.assign(o, r), o;
}
function Bs(e, n) {
  const r = [];
  for (const o of Object.keys(n))
    o in e || r.push(o);
  return r;
}
function Fs(e) {
  const n = Object.values(e.steps).filter((s) => s != null).sort((s, i) => {
    const c = s.startedAt ? Date.parse(s.startedAt) : 0, d = i.startedAt ? Date.parse(i.startedAt) : 0;
    return c - d;
  }), r = [];
  let o = {};
  e.triggeredBy?.payload && typeof e.triggeredBy.payload == "object" && (o = { ...e.triggeredBy.payload });
  for (const s of n) {
    const i = { ...o }, c = s.output, d = s.llm?.prompt;
    let l;
    if (c !== void 0)
      l = Us(o, s.nodeId, c);
    else {
      l = { ...o };
      const f = {
        ...l.steps ?? {}
      };
      f[s.nodeId] = c, l.steps = f;
    }
    const p = Bs(i, l);
    r.push({
      stepId: s.nodeId,
      inputContext: i,
      output: c,
      outputContext: l,
      resolvedPrompt: d || void 0,
      newKeys: p,
      stepExecution: s
    }), o = l;
  }
  return r;
}
function js(e, n) {
  const [r, o] = R(/* @__PURE__ */ new Map()), [s, i] = R(
    /* @__PURE__ */ new Map()
  ), c = ae(null);
  J(() => {
    const m = e?.id ?? null;
    m !== c.current && (c.current = m, o(/* @__PURE__ */ new Map()), i(/* @__PURE__ */ new Map()));
  }, [e?.id]);
  const d = P(
    (m) => {
      if (!m || typeof m != "object") return;
      const { eventType: x, payload: g } = m;
      if (!g || typeof g != "object") return;
      const u = g, v = u.runId;
      if (!(!e?.id || v !== e.id)) {
        if (x === "pipeline.llm.prompt") {
          const N = u.stepId, w = u.prompt;
          N && w && o((C) => {
            const b = new Map(C);
            return b.set(N, w), b;
          });
        }
        if (x === "pipeline.run.checkpoint" || x === "pipeline.run.checkpointed" || x === "pipeline:run:checkpoint" || x === "pipeline:run:checkpointed") {
          const N = u.context, w = u.stepId;
          N && w && i((C) => {
            const b = new Map(C);
            return b.set(w, N), b;
          });
        }
      }
    },
    [e?.id]
  );
  $e("*", d);
  const l = B(() => e ? Fs(e) : [], [e]), p = B(() => l.map((m) => {
    const x = r.get(m.stepId), g = s.get(m.stepId);
    return {
      ...m,
      resolvedPrompt: m.resolvedPrompt || x,
      outputContext: g ?? m.outputContext
    };
  }), [l, r, s]), f = B(() => n ? p.find((m) => m.stepId === n) ?? null : p[p.length - 1] ?? null, [p, n]), h = B(() => f ? new Set(f.newKeys) : /* @__PURE__ */ new Set(), [f]);
  return { enrichedSnapshots: p, activeSnapshot: f, newKeysSet: h };
}
function tn({ attempt: e, label: n }) {
  const r = !e.error;
  return /* @__PURE__ */ a("div", { className: "bg-[#11111b] rounded-md border border-[#313244] p-2.5 overflow-auto", children: [
    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold text-[#cdd6f4] mb-2", children: n }),
    /* @__PURE__ */ a("div", { className: "flex gap-1.5 mb-1.5 items-center", children: [
      /* @__PURE__ */ t("span", { className: A(
        "text-[10px] font-semibold px-1.5 py-px rounded-sm",
        r ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
      ), children: r ? "OK" : "FAIL" }),
      e.durationMs != null && /* @__PURE__ */ a("span", { className: "text-[10px] text-[#6c7086]", children: [
        e.durationMs,
        "ms"
      ] })
    ] }),
    e.error && /* @__PURE__ */ t("div", { className: "text-[11px] text-[#f38ba8] font-mono mb-1.5 px-2 py-1.5 bg-[#1a0f14] rounded whitespace-pre-wrap break-words", children: e.error }),
    e.output !== void 0 && /* @__PURE__ */ a("div", { children: [
      /* @__PURE__ */ t("div", { className: "text-[10px] text-[#6c7086] font-semibold mb-1 uppercase", children: "Output" }),
      /* @__PURE__ */ t(ft, { data: e.output, depth: 0 })
    ] })
  ] });
}
function qs({
  run: e,
  activeStepId: n,
  onStepSelect: r,
  editable: o = !1,
  onEditBufferChange: s,
  resetEditBufferKey: i
}) {
  const [c, d] = R("input"), [l, p] = R(0), [f, h] = R(!1), [m, x] = R({}), [g, u] = R(null), [v, N] = R({}), [w, C] = R({
    key: "",
    value: ""
  }), { enrichedSnapshots: b, activeSnapshot: y, newKeysSet: k } = js(e, n), D = y?.resolvedPrompt != null, S = y?.stepExecution.attempts, T = (S?.length ?? 0) >= 2;
  J(() => {
    c === "prompt" && !D && d("input"), c === "attempts" && !T && d("input");
  }, [c, D, T]), J(() => {
    p(0);
  }, [n]);
  const $ = !!(e && e.status === "paused_at_breakpoint" && n && (e.currentStepIds?.includes(n) || y?.stepExecution.status === "running" || y?.stepExecution.status === "awaiting" || y?.stepExecution.status === "pending")), H = !!o && !!$;
  J(() => {
    H ? g && g !== n && (x({}), u(null), N({})) : (f && h(!1), Object.keys(m).length > 0 && x({}), g && u(null), Object.keys(v).length > 0 && N({}));
  }, [H, n]), J(() => {
    i !== void 0 && (x({}), u(null), N({}), C({ key: "", value: "" }));
  }, [i]), J(() => {
    !H || !n || s && (Object.keys(m).length === 0 ? s(n, null) : s(n, m));
  }, [m, H, n]);
  const V = P(
    (O, G) => {
      u(n), x((K) => O in K ? K : { ...K, [O]: G });
    },
    [n]
  ), Q = P(
    (O, G) => {
      u(n), x((K) => ({ ...K, [O]: G })), N((K) => {
        if (!(O in K)) return K;
        const F = { ...K };
        return delete F[O], F;
      });
    },
    [n]
  ), de = P((O) => {
    x((G) => {
      if (!(O in G)) return G;
      const K = { ...G };
      return delete K[O], K;
    }), N((G) => {
      if (!(O in G)) return G;
      const K = { ...G };
      return delete K[O], K;
    });
  }, []), ce = P((O, G) => {
    N((K) => ({ ...K, [O]: G }));
  }, []), ne = P(() => {
    x({}), u(null), N({}), C({ key: "", value: "" });
  }, []), pe = P(() => {
    const O = w.key.trim();
    if (!O) return;
    let G = w.value;
    const K = w.value;
    if (K.trim().length > 0)
      try {
        G = JSON.parse(K);
      } catch {
        G = K;
      }
    Q(O, G), C({ key: "", value: "" });
  }, [w, Q]);
  return !e || b.length === 0 ? /* @__PURE__ */ a("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0", children: /* @__PURE__ */ t("span", { className: "text-xs font-bold text-text-primary tracking-wide uppercase", children: "Context Inspector" }) }),
    /* @__PURE__ */ a("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs flex items-center justify-center flex-col gap-2", children: [
      /* @__PURE__ */ t("span", { className: "text-[13px] text-[#6c7086]", children: e ? "Waiting for step execution data..." : "Run a pipeline to inspect context flow" }),
      /* @__PURE__ */ t("span", { className: "text-[11px] text-[#45475a]", children: e ? "Context data will appear as steps complete." : "Trigger a run to see inputs, outputs, and context at each step." })
    ] })
  ] }) : /* @__PURE__ */ a("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
    /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0", children: [
      /* @__PURE__ */ t("span", { className: "text-xs font-bold text-text-primary tracking-wide uppercase", children: "Context Inspector" }),
      y && y.stepId && /* @__PURE__ */ a("span", { className: "text-[10px] text-[#6c7086]", children: [
        "Step: ",
        y.stepId.slice(0, 8)
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex gap-0 border-b border-border shrink-0", children: [
      { id: "input", label: "Input Context", show: !0 },
      { id: "output", label: "Output", show: !0 },
      { id: "prompt", label: "Resolved Prompt", show: D },
      { id: "details", label: "Details", show: !0 },
      { id: "attempts", label: `Attempts (${S?.length})`, show: T }
    ].filter((O) => O.show).map((O) => /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "data-testid": O.id === "attempts" ? "attempts-tab" : void 0,
        className: A(
          "px-3.5 py-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer font-inherit uppercase tracking-wide border-b-2",
          c === O.id ? "text-primary border-b-primary" : "text-text-tertiary border-b-transparent"
        ),
        onClick: () => d(O.id),
        children: O.label
      },
      O.id
    )) }),
    /* @__PURE__ */ a("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
      /* @__PURE__ */ t(
        Es,
        {
          snapshots: b,
          activeStepId: n,
          fallbackActiveStepId: y?.stepId,
          onStepSelect: r
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs", children: y ? c === "input" ? /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ a("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ a("div", { className: "text-[10px] text-[#6c7086] font-semibold uppercase", children: [
            "Input context",
            y.stepId ? ` — step ${y.stepId.slice(0, 8)}` : ""
          ] }),
          H && /* @__PURE__ */ a("div", { className: "flex gap-1.5 items-center", children: [
            f && Object.keys(m).length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: ne,
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
                  const O = !f;
                  h(O), O || ne();
                },
                "data-testid": "context-inspector-edit-toggle",
                className: A(
                  "px-2 py-0.5 text-[10px] font-semibold border rounded-sm cursor-pointer font-mono uppercase tracking-wide",
                  f ? "bg-[#d97706] text-white border-[#d97706]" : "bg-transparent text-[#d97706] border-[#d97706]"
                ),
                children: f ? "Editing" : "Edit"
              }
            )
          ] })
        ] }),
        Object.keys(y.inputContext).length === 0 && !(H && f) ? /* @__PURE__ */ t("div", { className: "text-[#6c7086] text-xs italic", children: "No input context (first step or no upstream output)" }) : H && f ? /* @__PURE__ */ t(
          _s,
          {
            inputContext: y.inputContext,
            buffer: m,
            parseErrors: v,
            newKeyDraft: w,
            setNewKeyDraft: C,
            onCommitNewKey: pe,
            onBeginEditKey: V,
            onSetValue: Q,
            onRemoveKey: de,
            onParseError: ce
          }
        ) : /* @__PURE__ */ t(
          ft,
          {
            data: y.inputContext,
            highlightKeys: k
          }
        )
      ] }) : c === "output" ? /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ a("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: [
          "Output",
          y.stepId ? ` — step ${y.stepId.slice(0, 8)}` : ""
        ] }),
        /* @__PURE__ */ t(ft, { data: y.output }),
        y.newKeys.length > 0 && /* @__PURE__ */ a("div", { className: "mt-3", children: [
          /* @__PURE__ */ t("div", { className: "text-[10px] text-[#a6e3a1] font-semibold uppercase mb-1", children: "New context keys added" }),
          /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: y.newKeys.map((O) => /* @__PURE__ */ t(
            "span",
            {
              className: "px-1.5 py-0.5 bg-[rgba(166,227,161,0.15)] text-[#a6e3a1] rounded-sm text-[11px] font-semibold font-mono",
              children: O
            },
            O
          )) })
        ] })
      ] }) : c === "prompt" ? /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ t("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: "Resolved prompt template" }),
        /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: y.resolvedPrompt })
      ] }) : c === "details" ? /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ t("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: "Step execution details" }),
        /* @__PURE__ */ a("div", { className: "flex flex-col gap-3", children: [
          y.stepExecution.startedAt && /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Duration" }),
            /* @__PURE__ */ a("div", { className: "text-[11px] text-[#cdd6f4]", children: [
              "Started: ",
              y.stepExecution.startedAt,
              y.stepExecution.completedAt && /* @__PURE__ */ a(X, { children: [
                /* @__PURE__ */ t("br", {}),
                "Completed: ",
                y.stepExecution.completedAt,
                y.stepExecution.durationMs != null && /* @__PURE__ */ a(X, { children: [
                  /* @__PURE__ */ t("br", {}),
                  "Duration: ",
                  y.stepExecution.durationMs,
                  "ms"
                ] })
              ] })
            ] })
          ] }),
          y.stepExecution.llm && /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "LLM Metrics" }),
            /* @__PURE__ */ a("div", { className: "text-[11px] text-[#cdd6f4]", children: [
              "Tokens in: ",
              y.stepExecution.llm.tokensIn,
              /* @__PURE__ */ t("br", {}),
              "Tokens out: ",
              y.stepExecution.llm.tokensOut,
              y.stepExecution.llm.firstTokenLatencyMs != null && /* @__PURE__ */ a(X, { children: [
                /* @__PURE__ */ t("br", {}),
                "First token latency: ",
                y.stepExecution.llm.firstTokenLatencyMs,
                "ms"
              ] })
            ] }),
            y.stepExecution.llm.response && /* @__PURE__ */ a(X, { children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mt-2 mb-1", children: "Response Text" }),
              /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: y.stepExecution.llm.response })
            ] })
          ] }),
          y.stepExecution.error && /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#f38ba8] font-semibold mb-1", children: "Error" }),
            /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-[#1a0f14] border border-[#f38ba8] rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: /* @__PURE__ */ t("div", { className: "text-[#f38ba8] font-semibold mb-1", children: y.stepExecution.error }) })
          ] }),
          y.stepExecution.approvals && y.stepExecution.approvals.length > 0 && /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ a("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: [
              "Approvals (",
              y.stepExecution.approvals.length,
              ")"
            ] }),
            y.stepExecution.approvals.map((O, G) => /* @__PURE__ */ a("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2", children: [
              /* @__PURE__ */ a("div", { className: "flex gap-2 mb-1", children: [
                /* @__PURE__ */ t("span", { className: A(
                  "px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                  O.decision === "approve" ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
                ), children: O.decision.toUpperCase() }),
                /* @__PURE__ */ t("span", { className: "text-[11px] text-[#cdd6f4]", children: O.userId })
              ] }),
              O.comment && /* @__PURE__ */ a("div", { className: "text-[11px] text-[#9399b2] italic", children: [
                '"',
                O.comment,
                '"'
              ] }),
              /* @__PURE__ */ t("div", { className: "text-[10px] text-[#6c7086] mt-1", children: O.at })
            ] }, G))
          ] }),
          /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Status" }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#cdd6f4]", children: y.stepExecution.status })
          ] })
        ] })
      ] }) : c === "attempts" && S && S.length >= 2 ? /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ a("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": "attempts-prev",
              disabled: l === 0,
              onClick: () => p((O) => O - 1),
              className: A(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l === 0 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "←"
            }
          ),
          /* @__PURE__ */ a(
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
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": "attempts-next",
              disabled: l >= S.length - 2,
              onClick: () => p((O) => O + 1),
              className: A(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l >= S.length - 2 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "→"
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "grid grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ t(tn, { attempt: S[l], label: `Attempt ${l + 1}` }),
          /* @__PURE__ */ t(tn, { attempt: S[l + 1], label: `Attempt ${l + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function zs({
  definition: e,
  pausedBreakpoint: n,
  applyingPatch: r,
  revertingPatchId: o,
  dirtyPatch: s,
  dirtyPatchStepId: i,
  resetEditBufferKey: c,
  onContinue: d,
  onStepOver: l,
  onResumeAll: p,
  onApplyAndContinue: f,
  onRevertPatch: h,
  onEditBufferChange: m
}) {
  const g = st().runs[n.runId] ?? null, v = g?.steps?.[n.stepId]?.patches ?? [], N = !!s && i === n.stepId && Object.keys(s).length > 0, w = g?.status === "paused_at_breakpoint";
  return /* @__PURE__ */ a(
    "div",
    {
      "data-testid": "breakpoint-pause-overlay",
      className: A(
        "absolute top-14 left-1/2 -translate-x-1/2 z-30",
        "bg-surface border-2 border-amber-600 rounded-lg",
        "px-4 py-3 shadow-[0_8px_24px_rgba(217,119,6,0.2)]",
        "flex flex-col gap-3 font-inherit",
        "w-[min(900px,92vw)] max-h-[calc(100vh-120px)]"
      ),
      children: [
        /* @__PURE__ */ a("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ a("span", { className: "text-[13px] font-semibold text-amber-600", children: [
            "Paused at: ",
            ut(e, n.stepId)
          ] }),
          N && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: f,
              disabled: r,
              "data-testid": "breakpoint-apply-continue-btn",
              className: A(
                "px-3 py-1 text-xs font-semibold bg-green-300 text-gray-900",
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
              onClick: d,
              disabled: r,
              className: A(
                "px-3 py-1 text-xs font-semibold bg-amber-600 text-white",
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
              className: A(
                "px-3 py-1 text-xs font-semibold bg-transparent text-amber-600",
                "border border-amber-600 rounded font-inherit",
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
              className: A(
                "px-3 py-1 text-xs font-semibold bg-transparent text-amber-600",
                "border border-amber-600 rounded font-inherit",
                r ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              ),
              "data-testid": "breakpoint-resume-all-btn",
              children: "Resume All"
            }
          )
        ] }),
        /* @__PURE__ */ a(
          "div",
          {
            className: "grid [grid-template-columns:minmax(0,1fr)_240px] gap-3 min-h-[280px] max-h-[calc(100vh-220px)]",
            children: [
              /* @__PURE__ */ t("div", { className: "border border-border rounded-md bg-surface-inset overflow-hidden min-h-0", children: g ? /* @__PURE__ */ t(
                qs,
                {
                  run: g,
                  activeStepId: n.stepId,
                  editable: !0,
                  onEditBufferChange: m,
                  resetEditBufferKey: c
                }
              ) : /* @__PURE__ */ t("div", { className: "p-3 text-xs text-text-tertiary", children: "Loading run…" }) }),
              /* @__PURE__ */ a(
                "div",
                {
                  "data-testid": "breakpoint-patch-history",
                  className: "border border-border rounded-md bg-surface-inset p-2.5 overflow-auto min-h-0",
                  children: [
                    /* @__PURE__ */ a("div", { className: "text-[10px] font-bold text-text-primary tracking-wide uppercase mb-2", children: [
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
                    ) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: v.map((C) => {
                      const b = !!C.revertedAt;
                      return /* @__PURE__ */ a(
                        "div",
                        {
                          "data-testid": `breakpoint-patch-row-${C.patchId}`,
                          className: A(
                            "border border-border rounded p-1.5",
                            b ? "bg-gray-500/10 opacity-60" : "bg-[#11111b]"
                          ),
                          children: [
                            /* @__PURE__ */ a("div", { className: "flex items-center gap-1 text-[10px] text-[#cdd6f4] mb-0.5", children: [
                              /* @__PURE__ */ t("span", { className: "font-mono", children: C.patchId.slice(0, 8) }),
                              C.unvalidated && /* @__PURE__ */ t(
                                "span",
                                {
                                  "data-testid": `breakpoint-patch-unvalidated-${C.patchId}`,
                                  title: "No validator was registered for this step's node type",
                                  className: "px-1 text-[9px] font-bold bg-orange-300/15 text-orange-300 rounded-sm",
                                  children: "⚠ Unvalidated"
                                }
                              ),
                              b && /* @__PURE__ */ t("span", { className: "px-1 text-[9px] font-bold bg-gray-500/20 text-gray-400 rounded-sm", children: "Reverted" })
                            ] }),
                            /* @__PURE__ */ a("div", { className: "text-[10px] text-[#9399b2]", children: [
                              C.appliedAt,
                              C.appliedBy && /* @__PURE__ */ a(X, { children: [
                                " · ",
                                /* @__PURE__ */ t("span", { className: "text-[#cdd6f4]", children: C.appliedBy })
                              ] })
                            ] }),
                            !b && /* @__PURE__ */ t(
                              "button",
                              {
                                type: "button",
                                "data-testid": `breakpoint-patch-revert-${C.patchId}`,
                                onClick: () => h(C.patchId),
                                disabled: !w || o === C.patchId,
                                title: w ? "Revert this patch" : "Run has progressed past this breakpoint — revert no longer allowed",
                                className: A(
                                  "mt-1 px-2 py-0.5 text-[10px] font-semibold bg-transparent rounded-sm font-inherit",
                                  w ? "text-red-400 border border-red-400 cursor-pointer" : "text-gray-700 border border-gray-700 cursor-not-allowed",
                                  o === C.patchId && "cursor-not-allowed"
                                ),
                                children: o === C.patchId ? "Reverting…" : "Revert"
                              }
                            )
                          ]
                        },
                        C.patchId
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
function fe({ label: e, required: n, help: r, error: o, children: s, className: i }) {
  return /* @__PURE__ */ a("div", { className: A("flex flex-col", i), children: [
    /* @__PURE__ */ a("label", { className: "text-xs font-semibold text-text-secondary", children: [
      e,
      n && /* @__PURE__ */ t("span", { className: "text-[#dc2626] ml-1", children: "●" })
    ] }),
    /* @__PURE__ */ t("div", { className: "mt-1", children: s }),
    o && /* @__PURE__ */ t("div", { className: "text-[11px] text-[#dc2626] mt-0.5", children: o }),
    !o && r && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: r })
  ] });
}
function Hs({ title: e, defaultCollapsed: n = !1, children: r, className: o }) {
  const [s, i] = R(n);
  return /* @__PURE__ */ a("div", { className: A("flex flex-col", o), children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => i((c) => !c),
        className: "flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer font-inherit text-xs font-semibold text-text-secondary",
        children: [
          /* @__PURE__ */ t("span", { children: s ? "▸" : "▾" }),
          " ",
          e
        ]
      }
    ),
    !s && /* @__PURE__ */ t("div", { className: "flex flex-col gap-3 mt-2", children: r })
  ] });
}
function Ve({ children: e, className: n }) {
  return /* @__PURE__ */ t("div", { className: A("flex flex-col gap-3 px-4 py-3", n), children: e });
}
const Ks = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function Ws(e, n, r) {
  const o = e.trim();
  if (o === "") return null;
  const s = /^\*\/(\d+)$/.exec(o);
  if (s) {
    const d = Number(s[1]);
    return !Number.isFinite(d) || d <= 0 ? null : { match: "*", step: d };
  }
  if (o === "*") return { match: "*" };
  const i = /^(\d+)-(\d+)$/.exec(o);
  if (i) {
    const d = Number(i[1]), l = Number(i[2]);
    if (!Number.isFinite(d) || !Number.isFinite(l) || d < n || l > r || d > l) return null;
    const p = [];
    for (let f = d; f <= l; f++) p.push(f);
    return { match: p };
  }
  if (o.includes(",")) {
    const d = o.split(","), l = /* @__PURE__ */ new Set(), p = [];
    for (const f of d) {
      const h = Number(f.trim());
      if (!Number.isFinite(h) || !Number.isInteger(h) || h < n || h > r) return null;
      l.has(h) || (l.add(h), p.push(h));
    }
    return p.length === 0 ? null : { match: p };
  }
  const c = Number(o);
  return !Number.isFinite(c) || !Number.isInteger(c) || c < n || c > r ? null : { match: [c] };
}
function Vs(e) {
  if (typeof e != "string") return null;
  const n = e.trim().split(/\s+/);
  if (n.length !== 5) return null;
  const r = {};
  for (let o = 0; o < 5; o++) {
    const s = Ks[o], i = Ws(n[o], s.min, s.max);
    if (!i) return null;
    r[s.name] = i;
  }
  return r;
}
function it(e, n, r) {
  return e.match === "*" ? !e.step || e.step === 1 ? !0 : (n - r) % e.step === 0 : e.match.includes(n);
}
function Js(e, n) {
  return it(e.minute, n.getMinutes(), 0) && it(e.hour, n.getHours(), 0) && it(e.dayOfMonth, n.getDate(), 1) && it(e.month, n.getMonth() + 1, 1) && it(e.dayOfWeek, n.getDay(), 0);
}
function Gs(e, n, r) {
  const o = [], s = new Date(n.getTime());
  s.setSeconds(0, 0), s.setMinutes(s.getMinutes() + 1);
  const i = 1440 * 366, c = new Date(s.getTime());
  for (let d = 0; d < i && o.length < r; d++)
    Js(e, c) && o.push(new Date(c.getTime())), c.setMinutes(c.getMinutes() + 1);
  return o;
}
const nn = /^[a-zA-Z0-9_-]{1,64}$/, Ys = "http://localhost:13001";
function Xs() {
  try {
    const e = localStorage.getItem("ws_document_types_v1");
    if (!e) return [];
    const n = JSON.parse(e);
    return Array.isArray(n) ? n.filter((r) => typeof r == "object" && r !== null).filter((r) => typeof r.id == "string" && typeof r.name == "string").map((r) => ({ id: r.id, name: r.name })) : [];
  } catch {
    return [];
  }
}
const Qs = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function Zs({ data: e, onChange: n }) {
  const { toast: r } = kt(), s = Yn(er)?.definition?.triggerBinding?.webhookSecret, [i, c] = R(!1), d = e.triggerType.startsWith("document."), l = B(() => d ? Xs() : [], [d]), p = d && !e.documentTypeId, f = e.triggerType === "schedule" && !e.schedule, h = e.triggerType === "webhook" && !e.webhookPath, m = e.webhookPath ?? "", x = e.triggerType === "webhook" && m.length > 0 && !nn.test(m), g = e.triggerType === "webhook" && nn.test(m) ? `${Ys}/hooks/pipeline/${m}` : null, u = () => {
    g && navigator.clipboard.writeText(g).then(() => r("Webhook URL copied", { type: "success" })).catch(() => r("Could not copy webhook URL", { type: "error" }));
  }, v = () => {
    s && navigator.clipboard.writeText(s).then(() => r("Webhook secret copied", { type: "success" })).catch(() => r("Could not copy webhook secret", { type: "error" }));
  }, N = e.triggerType === "schedule" ? e.schedule ?? "" : "", w = B(
    () => N ? Vs(N) : null,
    [N]
  ), C = B(() => w ? Gs(w, /* @__PURE__ */ new Date(), 3) : [], [w]), b = e.triggerType === "schedule" && !!N && !w, y = e.triggerType === "document.finalize" ? "On finalize" : e.triggerType === "document.submit" ? "On submit for review" : e.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ a(Ve, { children: [
    /* @__PURE__ */ t(fe, { label: "Trigger type", required: !0, children: /* @__PURE__ */ t(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.triggerType,
        onChange: (k) => n({ triggerType: k.target.value }),
        children: Qs.map((k) => /* @__PURE__ */ t("option", { value: k.value, children: k.label }, k.value))
      }
    ) }),
    d && /* @__PURE__ */ a(
      fe,
      {
        label: "Document type",
        required: !0,
        error: p ? "Select a document type." : void 0,
        help: p ? void 0 : "Which document type should trigger this pipeline.",
        children: [
          /* @__PURE__ */ a(
            "select",
            {
              className: A(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
                p ? "border-[#dc2626]" : "border-border-field"
              ),
              value: e.documentTypeId ?? "",
              onChange: (k) => n({ documentTypeId: k.target.value || void 0 }),
              children: [
                /* @__PURE__ */ t("option", { value: "", children: "— select a document type —" }),
                l.map((k) => /* @__PURE__ */ t("option", { value: k.id, children: k.name }, k.id))
              ]
            }
          ),
          y && /* @__PURE__ */ a("div", { className: "text-[11px] text-text-tertiary mt-1.5", children: [
            "Event: ",
            /* @__PURE__ */ t("span", { className: "font-semibold text-text-secondary", children: y })
          ] })
        ]
      }
    ),
    e.triggerType === "schedule" && /* @__PURE__ */ a(
      fe,
      {
        label: "Schedule (cron)",
        required: !0,
        error: f ? "Cron expression is required." : b ? "Invalid cron expression — supports *, */N, N,M, A-B, exact values." : void 0,
        help: !f && !b ? "5-field cron: minute hour day month weekday." : void 0,
        children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "text",
              className: A(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                f || b ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "*/15 * * * *",
              value: e.schedule ?? "",
              onChange: (k) => n({ schedule: k.target.value })
            }
          ),
          /* @__PURE__ */ t("div", { className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono", children: C.length > 0 ? /* @__PURE__ */ a(X, { children: [
            /* @__PURE__ */ t("div", { className: "text-text-secondary mb-1", children: "Next 3 fires:" }),
            C.map((k, D) => /* @__PURE__ */ t("div", { children: k.toLocaleString() }, D))
          ] }) : /* @__PURE__ */ t("span", { children: "Next fires: enter a valid cron expression to preview." }) })
        ]
      }
    ),
    e.triggerType === "webhook" && /* @__PURE__ */ a("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ t(
        fe,
        {
          label: "Path",
          required: !0,
          error: h ? "Webhook path is required." : x ? "Path must be alphanumeric (plus _, -)" : void 0,
          help: !h && !x ? "Alphanumeric, _, or - (max 64 chars). No leading slash." : void 0,
          children: /* @__PURE__ */ t(
            "input",
            {
              type: "text",
              className: A(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                h || x ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "weekly-digest",
              value: m,
              onChange: (k) => n({ webhookPath: k.target.value })
            }
          )
        }
      ),
      /* @__PURE__ */ t("div", { className: "p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: g ? /* @__PURE__ */ a(X, { children: [
        /* @__PURE__ */ a("span", { className: "flex-1", children: [
          /* @__PURE__ */ t("span", { className: "font-sans text-text-tertiary mr-1", children: "Full URL:" }),
          g
        ] }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: u,
            className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
            children: "Copy"
          }
        )
      ] }) : /* @__PURE__ */ t("span", { className: "font-sans text-text-tertiary", children: "Set a path above to see the URL" }) }),
      /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ t("label", { className: "text-xs font-semibold text-text-secondary", children: "Signing secret" }),
        /* @__PURE__ */ t("div", { className: "mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: s ? /* @__PURE__ */ a(X, { children: [
          /* @__PURE__ */ t("span", { className: "flex-1", "aria-label": "webhook secret", children: i ? s : "•".repeat(32) }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => c((k) => !k),
              className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
              children: i ? "Hide" : "Reveal"
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
        ] }) : /* @__PURE__ */ a("span", { className: "font-sans text-text-tertiary", children: [
          "Save the pipeline to mint a signing secret. External callers must send ",
          /* @__PURE__ */ t("code", { children: "X-Pipeline-Signature-256: sha256=<hmac>" }),
          "."
        ] }) }),
        /* @__PURE__ */ a("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: [
          "HMAC-SHA256 of the raw request body. Send as",
          " ",
          /* @__PURE__ */ t("code", { children: "X-Pipeline-Signature-256: sha256=<hex>" }),
          "."
        ] })
      ] })
    ] })
  ] });
}
const rn = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, ea = 3e4;
function ta(e) {
  return e < 1e3 ? `${Math.round(e)}ms` : e < 6e4 ? `${(e / 1e3).toFixed(e < 1e4 ? 1 : 0)}s` : `${Math.round(e / 6e4)}m`;
}
function na(e) {
  const n = [];
  for (let r = 1; r < e.maxAttempts; r++) {
    const o = e.backoffMs * Math.pow(e.backoffMultiplier, r - 1);
    n.push(Math.min(o, ea));
  }
  return n;
}
function Ft({ value: e, onChange: n }) {
  const r = e !== void 0, o = e ?? rn, s = r ? na(o) : [], c = s.reduce((d, l) => d + l, 0) > 300 * 1e3;
  return /* @__PURE__ */ a("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ a("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          checked: r,
          onChange: (d) => n(d.target.checked ? rn : void 0),
          "aria-label": "Enable retries"
        }
      ),
      "Retry policy"
    ] }),
    !r && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-1", children: "No retries — failure is terminal on first attempt." }),
    r && /* @__PURE__ */ a(X, { children: [
      /* @__PURE__ */ a("div", { className: "grid grid-cols-3 gap-2 mt-1", children: [
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Max attempts" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "number",
              min: 1,
              max: 10,
              step: 1,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full mt-0.5 font-inherit",
              value: o.maxAttempts,
              onChange: (d) => {
                const l = Math.max(1, Math.min(10, parseInt(d.target.value, 10) || 1));
                n({ ...o, maxAttempts: l });
              },
              "aria-label": "Max attempts"
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Initial backoff (ms)" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "number",
              min: 0,
              step: 100,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full mt-0.5 font-inherit",
              value: o.backoffMs,
              onChange: (d) => {
                const l = Math.max(0, parseInt(d.target.value, 10) || 0);
                n({ ...o, backoffMs: l });
              },
              "aria-label": "Initial backoff in milliseconds"
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Backoff multiplier" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "number",
              min: 1,
              max: 4,
              step: 0.5,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full mt-0.5 font-inherit",
              value: o.backoffMultiplier,
              onChange: (d) => {
                const l = Math.max(1, Math.min(4, parseFloat(d.target.value) || 1));
                n({ ...o, backoffMultiplier: l });
              },
              "aria-label": "Backoff multiplier"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: o.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : s.length === 0 ? `Retries up to ${o.maxAttempts}× with no delay.` : `Retries up to ${o.maxAttempts}× with delays: ${s.map(ta).join(", ")}.` }),
      c && /* @__PURE__ */ t("div", { className: "text-[11px] text-[#ca8a04] mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const on = {
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
}, ra = [
  "context.doc.body",
  "context.doc.title",
  "context.trigger.userId",
  "context.steps"
], Un = {
  "context.doc.body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "context.doc.title": "Sample Document Title",
  "context.trigger.userId": "user_abc123",
  "context.steps": '["step-1: fetched document", "step-2: validated schema"]'
};
function sn(e) {
  return e.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (n, r) => Un[r] ?? `{{${r}}}`);
}
function oa({ data: e, onChange: n }) {
  const [r, o] = R(!1), s = !e.systemPrompt?.trim(), i = !e.userPromptTemplate?.trim(), c = (d) => {
    const l = on[d], p = l.includes(e.model) ? e.model : l[0];
    n({ provider: d, model: p });
  };
  return /* @__PURE__ */ a(Ve, { children: [
    /* @__PURE__ */ t(fe, { label: "Provider", required: !0, children: /* @__PURE__ */ a(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.provider,
        onChange: (d) => c(d.target.value),
        children: [
          /* @__PURE__ */ t("option", { value: "anthropic", children: "Anthropic" }),
          /* @__PURE__ */ t("option", { value: "bedrock", children: "Bedrock" }),
          /* @__PURE__ */ t("option", { value: "claude-code", children: "Claude Code (subprocess)" })
        ]
      }
    ) }),
    /* @__PURE__ */ t(fe, { label: "Model", required: !0, children: /* @__PURE__ */ t(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.model,
        onChange: (d) => n({ model: d.target.value }),
        children: on[e.provider].map((d) => /* @__PURE__ */ t("option", { value: d, children: d }, d))
      }
    ) }),
    /* @__PURE__ */ t(
      fe,
      {
        label: "System prompt",
        required: !0,
        error: s ? "System prompt is required." : void 0,
        help: s ? void 0 : "Sets the model's role and constraints.",
        children: /* @__PURE__ */ t(
          "textarea",
          {
            className: A(
              "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]",
              s ? "border-[#dc2626]" : "border-border-field"
            ),
            value: e.systemPrompt,
            onChange: (d) => n({ systemPrompt: d.target.value })
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      fe,
      {
        label: "User prompt template",
        required: !0,
        error: i ? "User prompt template is required." : void 0,
        help: i ? void 0 : "Supports {{ context.* }} substitution — click a pill above to insert.",
        children: /* @__PURE__ */ t(
          _t,
          {
            value: e.userPromptTemplate,
            onChange: (d) => n({ userPromptTemplate: d }),
            language: "template",
            variables: ra,
            minLines: 6,
            "aria-label": "User prompt template"
          }
        )
      }
    ),
    /* @__PURE__ */ a(Hs, { title: "Advanced", defaultCollapsed: !0, children: [
      /* @__PURE__ */ a(
        fe,
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
                onChange: (d) => n({ temperature: parseFloat(d.target.value) }),
                className: "w-full mt-1"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ t(fe, { label: "Max tokens", help: "Upper bound on response length.", children: /* @__PURE__ */ t(
        "input",
        {
          type: "number",
          min: 1,
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
          value: e.maxTokens ?? "",
          onChange: (d) => {
            const l = d.target.value;
            n({ maxTokens: l === "" ? void 0 : Math.max(1, parseInt(l, 10) || 0) });
          }
        }
      ) }),
      /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ a("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "checkbox",
              checked: e.streaming,
              onChange: (d) => n({ streaming: d.target.checked })
            }
          ),
          "Streaming"
        ] }),
        /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Stream tokens as they are generated." })
      ] }),
      /* @__PURE__ */ t(
        Ft,
        {
          value: e.retryPolicy,
          onChange: (d) => n({ retryPolicy: d })
        }
      )
    ] }),
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => o((d) => !d),
        className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit shrink-0",
        children: [
          r ? "▾" : "▶",
          " Preview with sample context"
        ]
      }
    ),
    r && /* @__PURE__ */ a("div", { className: "bg-surface-inset border border-border rounded-lg p-3 flex flex-col gap-2.5", children: [
      /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved system prompt" }),
        /* @__PURE__ */ t("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: sn(e.systemPrompt || "(empty)") })
      ] }),
      /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ t("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: sn(e.userPromptTemplate || "(empty)") })
      ] }),
      /* @__PURE__ */ a("div", { className: "text-[11px] text-text-tertiary", children: [
        "Sample values: ",
        Object.keys(Un).map((d) => `{{${d}}}`).join(", ")
      ] })
    ] })
  ] });
}
const sa = ["context", "context.steps", "context.trigger"], aa = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function ia({ data: e, onChange: n }) {
  const r = !e.expression?.trim();
  return /* @__PURE__ */ a(Ve, { children: [
    /* @__PURE__ */ t(fe, { label: "Type", required: !0, children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: aa.map((o) => /* @__PURE__ */ a(
      "label",
      {
        className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
        children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "radio",
              name: "transform-type",
              value: o.value,
              checked: e.transformType === o.value,
              onChange: () => n({ transformType: o.value })
            }
          ),
          o.label
        ]
      },
      o.value
    )) }) }),
    /* @__PURE__ */ t(
      fe,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : e.transformType === "jsonpath" ? 'e.g. $.items[?(@.status == "active")]' : e.transformType === "template" ? "Mustache-style: {{ context.doc.title }}" : e.transformType === "javascript" ? "return ctx.items.filter(x => x.active)" : void 0,
        children: /* @__PURE__ */ t(
          _t,
          {
            value: e.expression,
            onChange: (o) => n({ expression: o }),
            language: e.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: sa,
            "aria-label": "Transform expression"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      fe,
      {
        label: "Output key (optional)",
        help: `If set, writes to context.${e.outputKey || "outputKey"}. Otherwise merges into root context.`,
        children: /* @__PURE__ */ t(
          "input",
          {
            type: "text",
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
            value: e.outputKey ?? "",
            onChange: (o) => n({ outputKey: o.target.value || void 0 }),
            placeholder: "activeItems"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      Ft,
      {
        value: e.retryPolicy,
        onChange: (o) => n({ retryPolicy: o })
      }
    ),
    /* @__PURE__ */ t(fe, { label: "Preview", children: /* @__PURE__ */ a("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ a("div", { children: [
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
      /* @__PURE__ */ a("div", { children: [
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
const la = ["context.trigger", "context.steps"];
function da({ data: e, onChange: n }) {
  const r = !e.expression?.trim();
  return /* @__PURE__ */ a(Ve, { children: [
    /* @__PURE__ */ t(
      fe,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : "e.g. context.llm.response.length > 500",
        children: /* @__PURE__ */ t(
          _t,
          {
            value: e.expression,
            onChange: (o) => n({ expression: o }),
            language: "javascript",
            variables: la,
            "aria-label": "Condition expression"
          }
        )
      }
    ),
    /* @__PURE__ */ t(fe, { label: "Label (optional — shown on node face)", help: "A short name so this branch is easy to spot.", children: /* @__PURE__ */ t(
      "input",
      {
        type: "text",
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.label ?? "",
        onChange: (o) => n({ label: o.target.value || void 0 }),
        placeholder: "Long summary?"
      }
    ) }),
    /* @__PURE__ */ t(
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
const ca = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], pa = {
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
function ua({ data: e, onChange: n }) {
  const r = pa[e.actionType], o = e.config ?? {}, s = typeof o.retryCount == "number" ? o.retryCount : 3, i = e.onError === "route-error" ? "route-error" : typeof o.retryCount == "number" ? "retry" : "halt", c = (l, p) => {
    n({ config: { ...o, [l]: p } });
  }, d = (l) => {
    if (l === "route-error") {
      const { retryCount: p, ...f } = o;
      n({ onError: "route-error", config: f });
    } else if (l === "halt") {
      const { retryCount: p, ...f } = o;
      n({ onError: "fail-run", config: f });
    } else
      n({ onError: "fail-run", config: { ...o, retryCount: s } });
  };
  return /* @__PURE__ */ a(Ve, { children: [
    /* @__PURE__ */ t(fe, { label: "Action type", required: !0, children: /* @__PURE__ */ t(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.actionType,
        onChange: (l) => n({ actionType: l.target.value, config: {} }),
        children: ca.map((l) => /* @__PURE__ */ t("option", { value: l.value, children: l.label }, l.value))
      }
    ) }),
    /* @__PURE__ */ t(fe, { label: "Configuration", children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2.5", children: r.map((l) => /* @__PURE__ */ a("div", { children: [
      /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: l.label }),
      l.multiline ? /* @__PURE__ */ t(
        "textarea",
        {
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[48px] mt-0.5",
          rows: 2,
          placeholder: l.placeholder,
          value: typeof o[l.key] == "string" ? o[l.key] : "",
          onChange: (p) => c(l.key, p.target.value)
        }
      ) : /* @__PURE__ */ t(
        "input",
        {
          type: "text",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit mt-0.5",
          placeholder: l.placeholder,
          value: typeof o[l.key] == "string" ? o[l.key] : "",
          onChange: (p) => c(l.key, p.target.value)
        }
      ),
      l.help && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: l.help })
    ] }, l.key)) }) }),
    /* @__PURE__ */ a("div", { children: [
      /* @__PURE__ */ a("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
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
    e.idempotent && /* @__PURE__ */ a(fe, { label: "Dedup scope", children: [
      /* @__PURE__ */ a(
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
      Ft,
      {
        value: e.retryPolicy,
        onChange: (l) => n({ retryPolicy: l })
      }
    ),
    /* @__PURE__ */ t(fe, { label: "On error", children: /* @__PURE__ */ a("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ a("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: i === "route-error",
            onChange: () => d("route-error")
          }
        ),
        "Route to error handle"
      ] }),
      /* @__PURE__ */ a("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: i === "halt",
            onChange: () => d("halt")
          }
        ),
        "Halt pipeline"
      ] }),
      /* @__PURE__ */ a("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: i === "retry",
            onChange: () => d("retry")
          }
        ),
        "Retry up to",
        /* @__PURE__ */ t(
          "input",
          {
            type: "number",
            min: 1,
            disabled: i !== "retry",
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-16 flex-none font-inherit",
            value: s,
            onChange: (l) => {
              const p = Math.max(1, parseInt(l.target.value, 10) || 1);
              n({ onError: "fail-run", config: { ...o, retryCount: p } });
            }
          }
        ),
        "times"
      ] })
    ] }) })
  ] });
}
const Je = 2, lt = 8;
function an(e, n) {
  const r = e ?? [];
  return r.length === n ? r : r.length > n ? r.slice(0, n) : [...r, ...Array(n - r.length).fill("")];
}
function ma({ data: e, onChange: n }) {
  const r = Math.max(Je, Math.min(lt, e.branchCount || Je)), o = an(e.branchLabels, r), s = (c) => {
    const d = Math.max(Je, Math.min(lt, c));
    n({
      branchCount: d,
      branchLabels: an(e.branchLabels, d)
    });
  }, i = (c, d) => {
    const l = [...o];
    l[c] = d, n({ branchLabels: l });
  };
  return /* @__PURE__ */ a(Ve, { children: [
    /* @__PURE__ */ a(
      fe,
      {
        label: "Branch count",
        required: !0,
        help: `Between ${Je} and ${lt} parallel branches.`,
        children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary text-xs ml-2", children: r }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "range",
              min: Je,
              max: lt,
              step: 1,
              value: r,
              onChange: (c) => s(parseInt(c.target.value, 10)),
              className: "w-full mt-1"
            }
          ),
          /* @__PURE__ */ t(
            "input",
            {
              type: "number",
              min: Je,
              max: lt,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit mt-1",
              value: r,
              onChange: (c) => s(parseInt(c.target.value, 10) || Je)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(fe, { label: "Branch labels (optional)", children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: o.map((c, d) => /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ a("span", { className: "text-xs text-text-secondary min-w-[72px]", children: [
        "Branch ",
        d,
        ":"
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          type: "text",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none flex-1 min-w-[120px] font-inherit",
          value: c,
          onChange: (l) => i(d, l.target.value),
          placeholder: d === 0 ? "primary" : `branch-${d}`
        }
      )
    ] }, d)) }) })
  ] });
}
const fa = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], ha = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function xa({ data: e, onChange: n }) {
  return /* @__PURE__ */ a(Ve, { children: [
    /* @__PURE__ */ a(fe, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: fa.map((r) => /* @__PURE__ */ a(
        "label",
        {
          className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
          children: [
            /* @__PURE__ */ t(
              "input",
              {
                type: "radio",
                name: "join-mode",
                checked: e.mode === r.value,
                onChange: () => n({ mode: r.value })
              }
            ),
            r.label,
            /* @__PURE__ */ a("span", { className: "text-text-tertiary text-[11px]", children: [
              "— ",
              r.hint
            ] })
          ]
        },
        r.value
      )) }),
      e.mode === "n_of_m" && /* @__PURE__ */ a("div", { className: "mt-2 flex items-center gap-2", children: [
        /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "N" }),
        /* @__PURE__ */ t(
          "input",
          {
            type: "number",
            min: 1,
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit",
            value: e.n ?? 1,
            onChange: (r) => n({ n: Math.max(1, parseInt(r.target.value, 10) || 1) })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t(fe, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: ha.map((r) => /* @__PURE__ */ a(
      "label",
      {
        className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
        children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "radio",
              name: "join-merge",
              checked: e.mergeStrategy === r.value,
              onChange: () => n({ mergeStrategy: r.value })
            }
          ),
          r.label,
          /* @__PURE__ */ a("span", { className: "text-text-tertiary text-[11px]", children: [
            "— ",
            r.hint
          ] })
        ]
      },
      r.value
    )) }) }),
    /* @__PURE__ */ a("div", { className: "p-2 bg-surface-inset border border-border rounded-md text-xs text-text-secondary", children: [
      "Current inputs: ",
      /* @__PURE__ */ t("strong", { children: "TBD" }),
      /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Derived from incoming edges once the canvas is connected." })
    ] })
  ] });
}
const mt = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5
};
function ga(e) {
  return !e || e <= 0 ? "minutes" : e % mt.hours === 0 ? "hours" : e % mt.minutes === 0 ? "minutes" : "seconds";
}
function ba({ data: e, onChange: n }) {
  const r = e.approvers ?? [], o = r.length === 0, [s, i] = R(() => ga(e.timeoutMs)), c = e.timeoutMs !== void 0 ? Math.round(e.timeoutMs / mt[s]) : "", d = r.filter((x) => x.type === "user").map((x) => x.value), l = (x) => {
    const g = r.filter((N) => N.type === "role"), v = [...x.map((N) => ({ type: "user", value: N })), ...g];
    n({
      approvers: v,
      // Clamp requiredCount so it never exceeds approvers.length (min 1).
      requiredCount: Math.max(1, Math.min(e.requiredCount || 1, v.length || 1))
    });
  }, p = (x) => {
    const g = r.filter((u, v) => v !== x);
    n({
      approvers: g,
      requiredCount: Math.max(1, Math.min(e.requiredCount || 1, g.length || 1))
    });
  }, f = (x) => {
    if (x === "") {
      n({ timeoutMs: void 0 });
      return;
    }
    const g = Math.max(0, parseInt(x, 10) || 0);
    n({ timeoutMs: g * mt[s] });
  }, h = (x) => {
    i(x), typeof c == "number" && !Number.isNaN(c) && n({ timeoutMs: c * mt[x] });
  }, m = Math.max(1, r.length);
  return /* @__PURE__ */ a(Ve, { children: [
    /* @__PURE__ */ a(
      fe,
      {
        label: "Approvers",
        required: !0,
        error: o ? "At least one approver is required." : void 0,
        help: o ? void 0 : "Who can approve this step.",
        children: [
          /* @__PURE__ */ t(
            Pr,
            {
              value: d,
              onChange: l,
              placeholder: "Add approver…"
            }
          ),
          r.length > 0 && /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5 mt-2", children: r.map((x, g) => /* @__PURE__ */ a(
            "span",
            {
              className: A(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-[1.4] whitespace-nowrap",
                x.type === "role" ? "bg-[#fffbeb] text-[#d97706]" : "bg-[#eff6ff] text-[#2563eb]"
              ),
              children: [
                x.type === "role" ? "🎖" : "👤",
                " ",
                x.value,
                /* @__PURE__ */ t(
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
    /* @__PURE__ */ t(
      fe,
      {
        label: "Required count",
        required: !0,
        help: "How many approvers must say yes.",
        children: /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "number",
              min: 1,
              max: m,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-24 font-inherit",
              value: e.requiredCount || 1,
              onChange: (x) => {
                const g = parseInt(x.target.value, 10), u = Math.max(1, Math.min(m, Number.isNaN(g) ? 1 : g));
                n({ requiredCount: u });
              }
            }
          ),
          /* @__PURE__ */ a("span", { className: "text-text-tertiary text-xs", children: [
            e.requiredCount || 1,
            " of ",
            m
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ a(fe, { label: "Timeout", help: "Leave blank for no timeout.", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "number",
            min: 0,
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-24 flex-none font-inherit",
            value: c,
            onChange: (x) => f(x.target.value),
            placeholder: "24"
          }
        ),
        /* @__PURE__ */ a(
          "select",
          {
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-[120px] flex-none font-inherit",
            value: s,
            onChange: (x) => h(x.target.value),
            children: [
              /* @__PURE__ */ t("option", { value: "seconds", children: "seconds" }),
              /* @__PURE__ */ t("option", { value: "minutes", children: "minutes" }),
              /* @__PURE__ */ t("option", { value: "hours", children: "hours" })
            ]
          }
        )
      ] }),
      e.timeoutMs !== void 0 && e.timeoutMs > 0 && /* @__PURE__ */ a("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "If timeout" }),
        /* @__PURE__ */ t("div", { className: "flex gap-3 mt-1", children: ["reject", "approve"].map((x) => /* @__PURE__ */ a(
          "label",
          {
            className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
            children: [
              /* @__PURE__ */ t(
                "input",
                {
                  type: "radio",
                  name: "approval-timeout-action",
                  checked: (e.timeoutAction ?? "reject") === x,
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
    /* @__PURE__ */ t(fe, { label: "Message for approver (optional)", help: "Shown to the approver when the request is sent.", children: /* @__PURE__ */ t(
      "textarea",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]",
        value: e.message ?? "",
        onChange: (x) => n({ message: x.target.value || void 0 }),
        placeholder: "Please review the summary before it's posted to the document."
      }
    ) })
  ] });
}
const ya = {
  // -------------------------------------------------------------------------
  // Trigger
  // -------------------------------------------------------------------------
  trigger: /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "The entry point of every pipeline. Every pipeline has exactly one trigger." }),
    /* @__PURE__ */ t("h4", { children: "Trigger types" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "manual" }),
        " — started by clicking Run in the editor."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "document.finalize" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "document.submit" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "document.comment" }),
        " — fires on doc lifecycle events for a given document type."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "schedule" }),
        " — cron expression (e.g. ",
        /* @__PURE__ */ t("code", { children: "0 9 * * 1-5" }),
        ")."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "webhook" }),
        " — inbound HTTP POST at the configured path."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "triggerType" }),
        " — one of the above."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "documentTypeId" }),
        " — required for ",
        /* @__PURE__ */ t("code", { children: "document.*" }),
        "."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "schedule" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "webhookPath" }),
        " — per type."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ a("p", { children: [
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
  llm: /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Calls an LLM with a prompt template filled from pipeline context." }),
    /* @__PURE__ */ t("h4", { children: "Provider & model" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "anthropic" }),
        " — Claude models (e.g. ",
        /* @__PURE__ */ t("code", { children: "claude-sonnet-4-6" }),
        ")."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "bedrock" }),
        " — same models via AWS Bedrock."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Prompt templates" }),
    /* @__PURE__ */ a("p", { children: [
      "Interpolate with ",
      /* @__PURE__ */ t("code", { children: "{{ context.steps.X.output }}" }),
      " or any dotted path into the run context."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Streaming" }),
    /* @__PURE__ */ a("p", { children: [
      "Toggle on to emit ",
      /* @__PURE__ */ t("code", { children: "pipeline.llm.token" }),
      " events as text arrives; off for a single response."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Errors" }),
    /* @__PURE__ */ a("p", { children: [
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
  transform: /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Pure data transform — JSONPath, template string, or sandboxed JavaScript. No side effects." }),
    /* @__PURE__ */ t("h4", { children: "When to use each" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "jsonpath" }),
        " — extract a value, e.g. ",
        /* @__PURE__ */ t("code", { children: "$.document.body.sections[0]" }),
        "."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "template" }),
        " — shape a string from context, e.g. ",
        /* @__PURE__ */ t("code", { children: "Hi {{context.user.name}}" }),
        "."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "javascript" }),
        " — arbitrary logic; runs in an isolated sandbox with ",
        /* @__PURE__ */ t("code", { children: "context" }),
        " as input."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Output" }),
    /* @__PURE__ */ a("p", { children: [
      /* @__PURE__ */ t("code", { children: "outputKey" }),
      " scopes the result into ",
      /* @__PURE__ */ a("code", { children: [
        "context.",
        "{outputKey}"
      ] }),
      ". Leave blank to merge into the root context."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Condition
  // -------------------------------------------------------------------------
  condition: /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Branches the flow based on a boolean expression evaluated over context." }),
    /* @__PURE__ */ t("h4", { children: "Expression language" }),
    /* @__PURE__ */ a("p", { children: [
      "JSONPath lookups combined with booleans and comparisons, e.g. ",
      /* @__PURE__ */ t("code", { children: '$.llm.output.sentiment == "positive"' }),
      " or ",
      /* @__PURE__ */ t("code", { children: "$.score > 0.8 && $.reviewed" }),
      "."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ a("p", { children: [
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
  action: /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Performs a side-effect: updates a doc, posts a comment, notifies, calls a webhook, or invokes an MCP tool." }),
    /* @__PURE__ */ t("h4", { children: "Subtypes" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "update-document" }),
        " — patch a document's body."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "post-comment" }),
        " — append a comment thread entry."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "notify" }),
        " — push notification to users/roles."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "webhook" }),
        " — outbound HTTP request."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "mcp-tool" }),
        " — invoke a registered MCP tool by name."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Idempotent flag" }),
    /* @__PURE__ */ a("p", { children: [
      "If ",
      /* @__PURE__ */ t("code", { children: "idempotent" }),
      " is true, retries are safe after partial completion — the runtime may re-invoke the action without guarding against duplicates."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Errors" }),
    /* @__PURE__ */ a("p", { children: [
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
  fork: /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Splits the flow into N parallel branches that all run concurrently against the same context snapshot." }),
    /* @__PURE__ */ t("h4", { children: "Branch count" }),
    /* @__PURE__ */ a("p", { children: [
      "2-8 branches. Each branch exposes a handle ",
      /* @__PURE__ */ t("code", { children: "branch-0" }),
      ", ",
      /* @__PURE__ */ t("code", { children: "branch-1" }),
      ", etc."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Downstream" }),
    /* @__PURE__ */ a("p", { children: [
      "Typically paired with a ",
      /* @__PURE__ */ t("code", { children: "Join" }),
      " to merge results. Without a Join, each branch terminates independently and the run completes when all tails finish."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Join
  // -------------------------------------------------------------------------
  join: /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Combines N parallel branches back into one flow." }),
    /* @__PURE__ */ t("h4", { children: "Modes" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "all" }),
        " — wait for every input."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "any" }),
        " — fire as soon as the first input arrives; later inputs are ignored."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "n_of_m" }),
        " — fire after ",
        /* @__PURE__ */ t("code", { children: "n" }),
        " of ",
        /* @__PURE__ */ t("code", { children: "m" }),
        " inputs complete."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Merge strategies" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "deep-merge" }),
        " — recursive object merge."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "array-collect" }),
        " — collect each branch's output into an array."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "last-writer-wins" }),
        " — final branch to arrive replaces prior values."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Partial failures (§17.2)" }),
    /* @__PURE__ */ a("p", { children: [
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
  approval: /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ a("p", { children: [
      "Blocks the pipeline waiting for human approval. The run enters ",
      /* @__PURE__ */ t("code", { children: "awaiting_approval" }),
      " until decisions are recorded."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Approvers" }),
    /* @__PURE__ */ a("p", { children: [
      "A list of users or roles. ",
      /* @__PURE__ */ t("code", { children: "requiredCount" }),
      " controls how many approvals are needed (n-of-m)."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Timeout" }),
    /* @__PURE__ */ a("p", { children: [
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
    /* @__PURE__ */ a("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ t("code", { children: "approved" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "rejected" }),
      ". The flow resumes down the matching branch."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Agent (AgentCore)
  // -------------------------------------------------------------------------
  agent: /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Invokes a Strands agent via A2A protocol. The agent processes the input and returns a structured response." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "agentId" }),
        " — AgentCore agent identifier or ARN."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "protocol" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "a2a" }),
        " (recommended) or ",
        /* @__PURE__ */ t("code", { children: "direct" }),
        "."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "inputTemplate" }),
        " — supports ",
        /* @__PURE__ */ t("code", { children: "{{context.*}}" }),
        " substitution."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "streaming" }),
        " — whether to stream the agent's response tokens."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ a("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " (success) and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      " (invocation failure)."
    ] })
  ] }),
  "mcp-tool": /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Invokes an external tool through an MCP Gateway server." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "gatewayUrl" }),
        " — MCP Gateway endpoint."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "toolName" }),
        " — registered tool to invoke."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "inputTemplate" }),
        " — JSON input with substitution support."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ a("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "knowledge-base": /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Queries a Bedrock Knowledge Base for relevant document chunks (RAG retrieval)." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "knowledgeBaseId" }),
        " — Bedrock KB identifier."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "queryTemplate" }),
        " — natural language query with substitution."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "topK" }),
        " — number of chunks to retrieve (default 5)."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "scoreThreshold" }),
        " — minimum relevance score (0–1)."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ a("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " (retrieved chunks in context) and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "graph-query": /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Runs an openCypher query against a Neptune Analytics graph." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "graphId" }),
        " — Neptune Analytics graph identifier."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "query" }),
        " — openCypher query (NOT Gremlin/SPARQL)."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "parameters" }),
        " — named query parameters."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ a("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  memory: /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Reads from or writes to AgentCore Memory (session or long-term)." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "mode" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "read" }),
        " or ",
        /* @__PURE__ */ t("code", { children: "write" }),
        "."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "scope" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "session" }),
        " (ephemeral) or ",
        /* @__PURE__ */ t("code", { children: "long-term" }),
        " (persistent)."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "namespace" }),
        " — memory collection key."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "keyExpression" }),
        " — lookup key (read) or storage key (write)."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ a("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  guardrail: /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Applies Bedrock Guardrails content filtering. Evaluates input against configured policies and routes accordingly." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "guardrailId" }),
        " — Bedrock Guardrail identifier."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "inputField" }),
        " — context path to evaluate."
      ] }),
      /* @__PURE__ */ a("li", { children: [
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
    /* @__PURE__ */ a("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ t("code", { children: "pass" }),
      " (content OK) and ",
      /* @__PURE__ */ t("code", { children: "block" }),
      " (content flagged)."
    ] })
  ] }),
  policy: /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Evaluates a Cedar authorization policy against principal/action/resource." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "policyStoreId" }),
        " — Cedar policy store identifier."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "principal" }),
        " — who is requesting (supports substitution)."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "action" }),
        " — what action is being performed."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "resource" }),
        " — what resource is being accessed."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ a("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ t("code", { children: "allow" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "deny" }),
      "."
    ] })
  ] }),
  "ag-ui-output": /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Streams output to the AG-UI frontend via Server-Sent Events. This is a terminal node — no downstream flow." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ a("ul", { children: [
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "sourceField" }),
        " — context path to stream."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "eventType" }),
        " — AG-UI event type to emit (TEXT_MESSAGE_CONTENT, STATE_DELTA, or CUSTOM)."
      ] }),
      /* @__PURE__ */ a("li", { children: [
        /* @__PURE__ */ t("code", { children: "terminal" }),
        " — marks this as the pipeline endpoint."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ a("p", { children: [
      "One input handle ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ". No output — this is the endpoint."
    ] })
  ] })
}, va = {
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
  }
}, ze = ({ data: e }) => /* @__PURE__ */ a("div", { className: "p-3 text-[13px] text-[#64748b]", children: [
  "Configuration for ",
  /* @__PURE__ */ t("strong", { children: e.type }),
  " — coming in Phase C."
] }), Na = {
  trigger: Zs,
  llm: oa,
  transform: ia,
  condition: da,
  action: ua,
  fork: ma,
  join: xa,
  approval: ba,
  agent: ze,
  "mcp-tool": ze,
  "knowledge-base": ze,
  "graph-query": ze,
  memory: ze,
  guardrail: ze,
  policy: ze,
  "ag-ui-output": ze
};
function wa(e, n) {
  const r = Na[e.type];
  return /* @__PURE__ */ t(r, { data: e.data, onChange: n });
}
function ka({ selectedIds: e }) {
  const {
    definition: n,
    selectedNodeId: r,
    setSelectedNodeId: o,
    updateNodeData: s,
    removeNode: i,
    duplicateNodes: c
  } = ot(), [d, l] = R("config"), p = ae(null), f = ae(null);
  Lt();
  const h = B(() => e && e.length > 1 ? e : r ? [r] : [], [e, r]), m = h.length > 1, x = h.length > 0, g = B(() => m || h.length === 0 || !n ? null : n.nodes.find((b) => b.id === h[0]) ?? null, [n, h, m]), u = P(() => {
    o(null);
  }, [o]);
  J(() => {
    l("config");
  }, [h.join(",")]), J(() => {
    if (!x) return;
    const b = (y) => {
      y.key === "Escape" && (y.stopPropagation(), u());
    };
    return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b);
  }, [x, u]), J(() => {
    if (!x) return;
    const b = (y) => {
      const k = p.current;
      k && (y.target instanceof Node && k.contains(y.target) || y.target instanceof Element && (y.target.closest("[data-node-type]") || u()));
    };
    return window.addEventListener("mousedown", b), () => window.removeEventListener("mousedown", b);
  }, [x, u]);
  const v = g ? va[g.type] : null, N = () => {
    if (m)
      for (const b of h) i(b);
    else g && i(g.id);
  }, w = () => {
    h.length !== 0 && c(h);
  }, C = (b) => {
    g && s(g.id, b);
  };
  return /* @__PURE__ */ t("div", { ref: p, className: "flex flex-col flex-1 min-h-0 bg-white", "data-testid": "config-panel", children: m ? (
    // ---------------------------------------------------------------
    // Multi-select pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ a(X, { children: [
      /* @__PURE__ */ a("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ t("span", { className: "text-base", "aria-hidden": !0, children: "⧉" }),
        /* @__PURE__ */ a("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: [
          h.length,
          " nodes selected"
        ] }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: u,
            className: "w-7 h-7 p-0 bg-transparent border-none text-[#64748b] text-lg leading-none cursor-pointer rounded font-inherit",
            "aria-label": "Close",
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ a("div", { className: "flex-1 overflow-y-auto p-4 flex flex-col gap-3", children: [
        /* @__PURE__ */ t("div", { className: "text-xs text-[#64748b] leading-normal", children: "Bulk actions apply to every selected node. Individual node configuration is only shown for single selections." }),
        /* @__PURE__ */ a("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: N,
              className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-[#fecaca] rounded-md cursor-pointer font-inherit",
              children: "Delete all"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: w,
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
    /* @__PURE__ */ a(X, { children: [
      /* @__PURE__ */ a("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ t("span", { className: "text-lg leading-none", "aria-hidden": !0, children: v.icon }),
        /* @__PURE__ */ t("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: v.name }),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: u,
            className: "w-7 h-7 p-0 bg-transparent border-none text-[#64748b] text-lg leading-none cursor-pointer rounded font-inherit",
            "aria-label": "Close",
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ t(
        "div",
        {
          ref: f,
          role: "tablist",
          "aria-label": "Node configuration tabs",
          className: "h-9 flex border-b border-[#e2e8f0] shrink-0",
          onKeyDown: (b) => {
            const y = ["config", "runs", "docs"], k = y.indexOf(d);
            let D = null;
            b.key === "ArrowRight" ? D = y[(k + 1) % y.length] : b.key === "ArrowLeft" ? D = y[(k - 1 + y.length) % y.length] : b.key === "Home" ? D = y[0] : b.key === "End" && (D = y[y.length - 1]), D && (b.preventDefault(), l(D), f.current?.querySelector(
              `[data-tab="${D}"]`
            )?.focus());
          },
          children: ["config", "runs", "docs"].map((b) => {
            const y = d === b, k = b === "config" ? "Config" : b === "runs" ? "Runs" : "Docs";
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": y,
                tabIndex: y ? 0 : -1,
                "data-tab": b,
                className: A(
                  "flex-1 border-none bg-transparent text-xs font-semibold cursor-pointer font-inherit",
                  y ? "text-[#0f172a] border-b-2 border-b-[#646cff]" : "text-[#64748b] border-b-2 border-b-transparent"
                ),
                onClick: () => l(b),
                children: k
              },
              b
            );
          })
        }
      ),
      /* @__PURE__ */ a("div", { className: "flex-1 overflow-y-auto", children: [
        d === "config" && wa(g, C),
        d === "runs" && /* @__PURE__ */ t("div", { className: "p-6 text-xs text-[#64748b]", children: "No runs yet." }),
        d === "docs" && /* @__PURE__ */ t("div", { className: "pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug", children: ya[g.type] ?? /* @__PURE__ */ t("p", { className: "text-text-secondary", children: "No docs available for this node type." }) })
      ] }),
      /* @__PURE__ */ a("div", { className: "h-10 px-3 flex items-center justify-between gap-2 border-t border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: N,
            className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-transparent rounded-md cursor-pointer font-inherit",
            children: "🗑 Delete node"
          }
        ),
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: w,
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
function ve(e) {
  if (e == null) return "--";
  if (e < 1e3) return `${Math.round(e)}ms`;
  if (e < 6e4) return `${(e / 1e3).toFixed(1)}s`;
  const n = Math.floor(e / 6e4), r = Math.floor(e % 6e4 / 1e3);
  return `${n}m ${r}s`;
}
function et(e) {
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
function Ca(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Ia(e) {
  return e == null || e === 0 ? "--" : e < 1e-3 ? "<$0.001" : e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Sa(e) {
  return e == null || e === 0 ? "text-text-tertiary" : e < 0.01 ? "text-[#16a34a]" : e < 0.1 ? "text-[#ca8a04]" : e < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function ln(e) {
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
function At(e) {
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
function Ta(e) {
  return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function Ge({ label: e, children: n }) {
  return /* @__PURE__ */ a("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ t("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: e }),
    /* @__PURE__ */ t("span", { className: "text-[13px] text-text-primary", children: n })
  ] });
}
function Aa({ pipelineId: e, run: n, onBack: r }) {
  const o = Me();
  return /* @__PURE__ */ a("div", { className: "absolute inset-0 z-[2] flex flex-col overflow-hidden bg-surface", children: [
    /* @__PURE__ */ a("div", { className: "flex shrink-0 items-center gap-2 border-b border-border px-4 py-2.5", children: [
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
    /* @__PURE__ */ t("div", { className: "flex-1 overflow-y-auto p-4", children: /* @__PURE__ */ a("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ t(Ge, { label: "Status", children: /* @__PURE__ */ t(
        xe,
        {
          tone: ln(n.status),
          "aria-label": `Status: ${At(n.status)}`,
          children: At(n.status)
        }
      ) }),
      /* @__PURE__ */ t(Ge, { label: "Started", children: new Date(n.startedAt).toLocaleString() }),
      n.completedAt && /* @__PURE__ */ t(Ge, { label: "Completed", children: new Date(n.completedAt).toLocaleString() }),
      /* @__PURE__ */ t(Ge, { label: "Duration", children: ve(n.durationMs) }),
      /* @__PURE__ */ t(Ge, { label: "Triggered by", children: Ta(n) }),
      /* @__PURE__ */ t(Ge, { label: "Trigger type", children: n.triggeredBy.triggerType }),
      n.estimatedCostUsd != null && n.estimatedCostUsd > 0 && /* @__PURE__ */ a(Ge, { label: "Est. Cost", children: [
        /* @__PURE__ */ t("span", { className: A("font-semibold", Sa(n.estimatedCostUsd)), children: Ia(n.estimatedCostUsd) }),
        n.estimatedCostUsd > 1 && /* @__PURE__ */ t("span", { className: "ml-1.5 rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "Budget Warning" })
      ] }),
      n.tokenUsage && Object.keys(n.tokenUsage).length > 0 && /* @__PURE__ */ a("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: "Cost Breakdown" }),
        Object.entries(n.tokenUsage).map(([s, i]) => /* @__PURE__ */ a(
          "div",
          {
            className: "flex items-center gap-2 py-0.5 text-[11px]",
            children: [
              /* @__PURE__ */ t("span", { className: "min-w-[100px] font-mono text-text-secondary", children: s }),
              /* @__PURE__ */ a("span", { className: "text-text-tertiary", children: [
                i.tokensIn.toLocaleString(),
                " in / ",
                i.tokensOut.toLocaleString(),
                " out"
              ] })
            ]
          },
          s
        ))
      ] }),
      n.error && /* @__PURE__ */ a("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("div", { className: "mb-1 text-[11px] font-semibold uppercase text-state-failed", children: "Error" }),
        /* @__PURE__ */ a("div", { className: "whitespace-pre-wrap break-words rounded-md bg-[#fef2f2] px-2.5 py-2 font-mono text-xs text-[#991b1b]", children: [
          n.error.message,
          n.error.nodeId && /* @__PURE__ */ a("div", { className: "mt-1 text-[11px] text-[#b91c1c]", children: [
            "at node: ",
            n.error.nodeId
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => o(`/pipelines/${e}/runs/${n.id}`),
          "data-testid": "runs-panel-replay-btn",
          className: "mt-3 w-full cursor-pointer rounded-md border-none bg-primary px-3.5 py-2 font-inherit text-[13px] font-semibold text-white",
          children: "View Full Run"
        }
      ),
      Object.keys(n.steps).length > 0 && /* @__PURE__ */ a("div", { className: "mt-2", children: [
        /* @__PURE__ */ a("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: [
          "Steps (",
          Object.keys(n.steps).length,
          ")"
        ] }),
        Object.entries(n.steps).map(([s, i]) => {
          const c = ln(i.status), d = At(i.status), l = i.output, p = l?.response;
          return /* @__PURE__ */ a("div", { className: "mb-2", children: [
            /* @__PURE__ */ a("div", { className: "flex items-center gap-2 py-1 text-xs", children: [
              /* @__PURE__ */ t(xe, { tone: c, "aria-label": `Status: ${d}`, children: d }),
              /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: s.slice(0, 10) }),
              i.durationMs != null && /* @__PURE__ */ t("span", { className: "ml-auto text-[11px] text-text-tertiary", children: ve(i.durationMs) })
            ] }),
            p && /* @__PURE__ */ t("div", { className: "mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-2 text-xs leading-relaxed text-text-primary", children: p }),
            l && !p && Object.keys(l).length > 0 && /* @__PURE__ */ t("div", { className: "mt-1 max-h-[120px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-1.5 font-mono text-[11px] text-text-secondary", children: JSON.stringify(l, null, 2) })
          ] }, s);
        })
      ] }),
      /* @__PURE__ */ t("div", { className: "mt-3", children: /* @__PURE__ */ a("details", { children: [
        /* @__PURE__ */ t("summary", { className: "cursor-pointer select-none text-[11px] text-text-tertiary", children: "Raw snapshot JSON" }),
        /* @__PURE__ */ t("pre", { className: "mt-1.5 max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-md border border-border bg-surface-inset p-2.5 text-[10px]", children: JSON.stringify(n, null, 2) })
      ] }) })
    ] }) })
  ] });
}
function dn(e) {
  return e == null || e === 0 ? "--" : e < 1e-3 ? "<$0.001" : e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Da(e) {
  return e == null || e === 0 ? "text-text-tertiary" : e < 0.01 ? "text-[#16a34a]" : e < 0.1 ? "text-[#ca8a04]" : e < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Ra(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function $a(e) {
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
function Ma(e) {
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
function Pa(e) {
  return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function Ea({ pipelineId: e, onClose: n }) {
  const r = Me(), [o, s] = R([]), [i, c] = R(!0), [d, l] = R(null), [p, f] = R(null), [h, m] = R(!1), [x, g] = R([]), u = ae(null), v = P(async () => {
    c(!0), l(null);
    try {
      const b = await Rn(e, { limit: 50 });
      s(b.runs);
    } catch (b) {
      l(b instanceof Error ? b.message : "Failed to load runs");
    } finally {
      c(!1);
    }
  }, [e]);
  J(() => {
    u.current !== e && (u.current = e, v());
  }, [e, v]), $e("*", P((b) => {
    const { eventType: y, payload: k } = b;
    if (!k || typeof k != "object") return;
    const D = k;
    if (!(D.pipelineId && D.pipelineId !== e))
      switch (y) {
        case "pipeline.run.started": {
          const S = k;
          if (S.pipelineId !== e) return;
          const T = {
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
          s(($) => [T, ...$.filter((H) => H.id !== S.runId)]);
          break;
        }
        case "pipeline.run.completed": {
          const S = k;
          s(
            (T) => T.map(
              ($) => $.id === S.runId ? { ...$, status: "completed", completedAt: S.at, durationMs: S.durationMs } : $
            )
          );
          break;
        }
        case "pipeline.run.failed": {
          const S = k;
          s(
            (T) => T.map(
              ($) => $.id === S.runId ? { ...$, status: "failed", completedAt: S.at, error: S.error } : $
            )
          );
          break;
        }
        case "pipeline.run.cancelled": {
          const S = k;
          s(
            (T) => T.map(
              ($) => $.id === S.runId ? { ...$, status: "cancelled", completedAt: S.at } : $
            )
          );
          break;
        }
      }
  }, [e]));
  const N = B(
    () => o.find((b) => b.id === p) ?? null,
    [o, p]
  ), w = P((b) => {
    g((y) => y.includes(b) ? y.filter((k) => k !== b) : y.length >= 2 ? [y[1], b] : [...y, b]);
  }, []), C = P(() => {
    if (x.length !== 2) return;
    const [b, y] = x;
    r(`/pipelines/${e}/compare?a=${b}&b=${y}`);
  }, [x, r, e]);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "relative flex min-h-0 flex-1 flex-col overflow-hidden bg-surface",
      "data-testid": "pipeline-runs-panel",
      children: [
        /* @__PURE__ */ a("div", { className: "flex shrink-0 items-center justify-between border-b border-border px-4 py-3", children: [
          /* @__PURE__ */ t("span", { className: "text-sm font-bold text-text-primary", children: "Run History" }),
          /* @__PURE__ */ a("div", { className: "ml-auto flex items-center gap-1.5", children: [
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => {
                  m(!h), h && g([]);
                },
                "data-testid": "runs-panel-compare-toggle",
                className: A(
                  "cursor-pointer rounded px-2 py-0.5 font-inherit text-[11px] font-medium",
                  h ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"
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
        h && /* @__PURE__ */ a(
          "div",
          {
            className: "flex shrink-0 items-center gap-2 border-b border-border bg-surface-inset px-4 py-2",
            "data-testid": "runs-panel-compare-bar",
            children: [
              /* @__PURE__ */ a("span", { className: "text-[11px] text-text-secondary", children: [
                x.length,
                "/2 selected"
              ] }),
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  disabled: x.length !== 2,
                  onClick: C,
                  "data-testid": "runs-panel-compare-action",
                  className: A(
                    "ml-auto rounded px-2.5 py-0.5 font-inherit text-[11px] font-semibold",
                    x.length === 2 ? "cursor-pointer border border-primary bg-primary text-white" : "cursor-not-allowed border border-border bg-surface text-text-disabled"
                  ),
                  children: "Compare"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ a("div", { className: "relative min-h-0 flex-1", children: [
          N && /* @__PURE__ */ t(
            Aa,
            {
              pipelineId: e,
              run: N,
              onBack: () => f(null)
            }
          ),
          i && o.length === 0 && /* @__PURE__ */ t("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "Loading runs..." }),
          d && /* @__PURE__ */ a("div", { className: "p-4 text-center text-xs text-state-failed", children: [
            d,
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
          !i && !d && o.length === 0 && /* @__PURE__ */ t("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "No runs yet. Trigger this pipeline to see history here." }),
          o.length > 0 && /* @__PURE__ */ t("ul", { className: "m-0 flex-1 list-none overflow-y-auto p-0", children: o.map((b) => {
            const y = $a(b.status), k = Ma(b.status), D = x.includes(b.id);
            return /* @__PURE__ */ a(
              "li",
              {
                "data-testid": `runs-panel-row-${b.id}`,
                onClick: () => {
                  h ? w(b.id) : f(b.id);
                },
                className: A(
                  "cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover",
                  D && "bg-[#eff6ff]"
                ),
                children: [
                  /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
                    h && /* @__PURE__ */ t(
                      "input",
                      {
                        type: "checkbox",
                        checked: D,
                        onChange: () => w(b.id),
                        onClick: (S) => S.stopPropagation(),
                        "data-testid": `runs-panel-compare-check-${b.id}`,
                        className: "m-0 shrink-0 accent-primary",
                        "aria-label": `Select run ${b.id.slice(0, 8)} for comparison`
                      }
                    ),
                    /* @__PURE__ */ t(xe, { tone: y, "aria-label": `Status: ${k}`, children: k }),
                    /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-secondary", children: b.id.slice(0, 8) }),
                    /* @__PURE__ */ t("span", { className: "ml-auto text-[11px] text-text-tertiary", children: Ra(b.startedAt) })
                  ] }),
                  /* @__PURE__ */ a("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ t("span", { children: ve(b.durationMs) }),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 0 && /* @__PURE__ */ t(
                      "span",
                      {
                        className: A("font-mono font-semibold", Da(b.estimatedCostUsd)),
                        title: `Estimated cost: ${dn(b.estimatedCostUsd)}`,
                        children: dn(b.estimatedCostUsd)
                      }
                    ),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 1 && /* @__PURE__ */ t("span", { className: "rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "High Cost" }),
                    /* @__PURE__ */ t("span", { className: "ml-auto", children: Pa(b) })
                  ] }),
                  b.error && /* @__PURE__ */ t("div", { className: "mt-1 truncate text-[11px] text-state-failed", children: b.error.message })
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
function Oa({
  pipelineId: e,
  selectedNodeId: n,
  sidebarTab: r,
  onTabChange: o
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: A(
        "w-[350px] shrink-0 border-l border-border bg-surface",
        "flex flex-col overflow-hidden"
      ),
      "data-testid": "right-sidebar",
      children: [
        !(n !== null && r === "config") && /* @__PURE__ */ a("div", { className: "h-[38px] flex border-b border-border shrink-0", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: A(
                "flex-1 border-none bg-transparent text-xs font-semibold",
                "cursor-pointer font-inherit px-2",
                r === "config" ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"
              ),
              onClick: () => o("config"),
              "data-testid": "sidebar-tab-config",
              children: "Config"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: A(
                "flex-1 border-none bg-transparent text-xs font-semibold",
                "cursor-pointer font-inherit px-2",
                r === "runs" ? "text-text-primary border-b-2 border-b-primary" : "text-text-secondary border-b-2 border-b-transparent"
              ),
              onClick: () => o("runs"),
              "data-testid": "sidebar-tab-runs",
              children: "Runs"
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "flex-1 overflow-y-auto flex flex-col", children: [
          r === "config" && (n !== null ? /* @__PURE__ */ t(ka, {}) : /* @__PURE__ */ t("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          r === "runs" && /* @__PURE__ */ t(
            Ea,
            {
              pipelineId: e,
              onClose: () => o("config")
            }
          )
        ] })
      ]
    }
  );
}
function La(e) {
  return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function _a(e) {
  if (!e) return [];
  const n = /* @__PURE__ */ new Set(), r = /\{\{\s*context\.([a-zA-Z0-9_.]+)\s*\}\}/g;
  for (const o of e.nodes) {
    const s = o.data;
    if (s.type === "llm") {
      for (const i of (s.userPromptTemplate || "").matchAll(r))
        i[1].startsWith("steps.") || n.add(i[1]);
      for (const i of (s.systemPrompt || "").matchAll(r))
        i[1].startsWith("steps.") || n.add(i[1]);
    } else if (s.type === "transform" && s.expression)
      for (const i of s.expression.matchAll(r))
        i[1].startsWith("steps.") || n.add(i[1]);
  }
  return Array.from(n);
}
function Ua(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const n = e.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || e.isContentEditable);
}
function xd() {
  const { pipelineId: e } = nt(), n = B(() => e ? Ye(e) !== null : !1, [e]);
  return !e || !n ? /* @__PURE__ */ t(rt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t($n, { pipelineId: e, children: /* @__PURE__ */ t(Ba, { pipelineId: e }) });
}
function Ba({ pipelineId: e }) {
  const n = Me(), r = ot(), o = st(), { toast: s } = kt(), {
    definition: i,
    dirty: c,
    selectedNodeId: d,
    setSelectedNodeId: l,
    save: p,
    publish: f,
    revert: h,
    undo: m,
    redo: x,
    setTags: g
  } = r, u = Rs(e), [v, N] = R(!1), w = ae(null), C = ae(c);
  J(() => (C.current && !c && (N(!0), w.current && clearTimeout(w.current), w.current = setTimeout(() => N(!1), 450)), C.current = c, () => {
    w.current && (clearTimeout(w.current), w.current = null);
  }), [c]);
  const b = B(
    () => i ? Ln(i) : null,
    [i]
  ), y = (b?.errors.length ?? 0) > 0, k = B(
    () => _a(i),
    [i]
  ), S = B(() => i ? i.nodes.some((se) => se.type === "trigger") : !1, [i]) ? ["trigger"] : [], [T, $] = R(!0), [H, V] = R(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), Q = P(() => {
    V((se) => {
      const q = !se;
      try {
        window.localStorage.setItem(
          "ws_pipelines_v1_show_tags",
          q ? "true" : "false"
        );
      } catch {
      }
      return q;
    });
  }, []), [de, ce] = R(!1), [ne, pe] = R(!1), [O, G] = R(!1), [K, F] = R(!1), [W, ie] = R(!1), le = B(() => i?.publishedSnapshot ? i.publishedSnapshot : null, [i]), be = i?.status === "published", E = !u.isRunActive && (!be || y), Z = u.isRunActive ? "Cancel the active run" : be ? y ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", ge = P(async () => {
    if (u.isRunActive && u.currentRunId) {
      o.cancelRun(u.currentRunId);
      return;
    }
    if (!E) {
      if (k.length > 0) {
        u.setTriggerInputValues(
          Object.fromEntries(k.map((se) => [se, ""]))
        ), u.setTriggerInputOpen(!0);
        return;
      }
      u.handleRunClick();
    }
  }, [u, o, E, k]);
  J(() => {
    const se = (q) => {
      if (Ua(q.target)) return;
      const L = q.metaKey || q.ctrlKey;
      if (L && q.key.toLowerCase() === "s") {
        q.preventDefault(), p(), s("Saved", { type: "success", durationMs: 1200 });
        return;
      }
      if (L && q.key === "Enter") {
        q.preventDefault(), ge();
        return;
      }
      if (L && q.key === ".") {
        q.preventDefault(), u.isRunActive && u.currentRunId && o.cancelRun(u.currentRunId);
        return;
      }
      if (L && q.shiftKey && q.key.toLowerCase() === "z") {
        q.preventDefault(), x();
        return;
      }
      if (L && q.key.toLowerCase() === "z") {
        q.preventDefault(), m();
        return;
      }
      if (q.key === "Escape") {
        l(null);
        return;
      }
    };
    return window.addEventListener("keydown", se), () => window.removeEventListener("keydown", se);
  }, [p, s, ge, u, o, m, x, l]);
  const De = () => {
    if (!i) return;
    const se = Ot(i.id);
    se && n(`/pipelines/${se.id}`);
  }, qe = () => {
    if (!i) return;
    const se = $t(i.id);
    se && pt(`${La(i.name)}.pipeline.json`, se);
  }, Pe = async () => {
    if (!i) return;
    const se = ws(i);
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(se), s("Mermaid diagram copied", { type: "success" });
      else
        throw new Error("clipboard unavailable");
    } catch (q) {
      console.warn("[PipelineEditor] clipboard write failed", q), s("Could not copy Mermaid diagram", { type: "error" });
    }
  }, Ae = () => {
    F(!0);
  }, Le = () => {
    ce(!1), !y && (f(), s("Pipeline published", { type: "success" }));
  }, Ee = () => {
    i && (tr(i.id), pe(!1), n("/pipelines"));
  }, _e = () => {
    Mn(e), G(!1), s("Run history cleared", { type: "success" });
  }, ye = u.currentRunId ? o.runs[u.currentRunId] : void 0;
  return i ? /* @__PURE__ */ a(
    "div",
    {
      className: A(
        "flex flex-col min-h-[calc(100vh-200px)]",
        "bg-surface-inset font-inherit text-text-primary",
        "rounded-lg border border-border overflow-hidden"
      ),
      "data-testid": "pipeline-editor",
      children: [
        /* @__PURE__ */ t(
          Ms,
          {
            pipelineId: e,
            definition: i,
            dirty: c,
            savingFlash: v,
            isRunActive: u.isRunActive,
            isTriggering: u.isTriggering,
            runDisabled: E,
            runTitle: Z,
            currentRun: ye,
            breakpoints: u.breakpoints,
            onRunClick: ge,
            onDebugRunClick: u.handleDebugRunClick,
            onExport: qe,
            onPublishClick: () => ce(!0),
            onDuplicate: De,
            onCopyMermaid: Pe,
            onViewVersions: Ae,
            onRevert: h,
            onToggleShowTags: Q,
            showTags: H,
            onViewRunHistory: () => u.setSidebarTab("runs"),
            onClearRunHistory: () => G(!0),
            onSimPanelOpen: () => ie(!0),
            onDelete: () => pe(!0)
          }
        ),
        H && /* @__PURE__ */ a(
          "div",
          {
            "data-testid": "tags-row",
            className: A(
              "flex items-center gap-2 px-4 py-1.5",
              "border-b border-slate-200 bg-[#fafbfc]",
              "min-h-[34px] shrink-0 sticky top-11 z-[4]"
            ),
            children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-slate-400 font-semibold", children: "TAGS" }),
              /* @__PURE__ */ t(
                Dr,
                {
                  value: i.tags ?? [],
                  onChange: g,
                  placeholder: "add tag…"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ a("div", { className: "flex-1 flex min-h-0 relative overflow-hidden", children: [
          /* @__PURE__ */ t(Co, { disabledTypes: S }),
          /* @__PURE__ */ t("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ t(
            Bo,
            {
              errorNodeId: u.activeError?.nodeId ?? null,
              onErrorNodePosition: u.handleErrorNodePosition,
              breakpoints: u.breakpoints,
              onToggleBreakpoint: u.handleToggleBreakpoint,
              pausedAtNodeId: u.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ t(
            Oa,
            {
              pipelineId: e,
              selectedNodeId: d,
              sidebarTab: u.sidebarTab,
              onTabChange: u.setSidebarTab
            }
          )
        ] }),
        u.pausedBreakpoint && /* @__PURE__ */ t(
          zs,
          {
            definition: i,
            pausedBreakpoint: u.pausedBreakpoint,
            applyingPatch: u.applyingPatch,
            revertingPatchId: u.revertingPatchId,
            dirtyPatch: u.dirtyPatch,
            dirtyPatchStepId: u.dirtyPatchStepId,
            resetEditBufferKey: u.resetEditBufferKey,
            onContinue: u.handleBreakpointContinue,
            onStepOver: u.handleBreakpointStepOver,
            onResumeAll: u.handleBreakpointResumeAll,
            onApplyAndContinue: u.handleApplyAndContinue,
            onRevertPatch: u.handleRevertPatch,
            onEditBufferChange: u.handleContextEditBufferChange
          }
        ),
        u.activeError && u.errorNodeAnchor && /* @__PURE__ */ t(
          jo,
          {
            error: u.activeError,
            anchor: u.errorNodeAnchor,
            onDismiss: u.handleDismissError,
            onRetry: u.handleRetryFromError
          }
        ),
        /* @__PURE__ */ t(
          Ds,
          {
            runId: u.currentRunId,
            visible: u.isRunActive && T
          }
        ),
        /* @__PURE__ */ t(
          As,
          {
            publishConfirmOpen: de,
            onPublishClose: () => ce(!1),
            onPublishConfirm: Le,
            hasErrors: y,
            validationErrorCount: b?.errors.length ?? 0,
            definitionName: i.name,
            definitionVersion: i.version,
            deleteConfirmOpen: ne,
            onDeleteClose: () => pe(!1),
            onDeleteConfirm: Ee,
            clearRunsConfirmOpen: O,
            onClearRunsClose: () => G(!1),
            onClearRunsConfirm: _e,
            versionDiffOpen: K,
            onVersionDiffClose: () => F(!1),
            currentDef: i,
            publishedDef: le,
            onJumpToNode: l,
            simPanelOpen: W,
            onSimPanelClose: () => ie(!1)
          }
        ),
        /* @__PURE__ */ t(
          je,
          {
            open: u.triggerInputOpen,
            onClose: () => u.setTriggerInputOpen(!1),
            title: "Trigger inputs",
            maxWidth: 480,
            footer: /* @__PURE__ */ a(X, { children: [
              /* @__PURE__ */ t(Ue, { variant: "ghost", onClick: () => u.setTriggerInputOpen(!1), children: "Cancel" }),
              /* @__PURE__ */ t(
                Ue,
                {
                  variant: "primary",
                  onClick: u.handleTriggerInputSubmit,
                  disabled: k.some((se) => !u.triggerInputValues[se]?.trim()),
                  children: "Run"
                }
              )
            ] }),
            children: /* @__PURE__ */ a("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ t("p", { className: "m-0 text-xs text-text-secondary", children: "This pipeline expects input data. Provide values for the trigger context:" }),
              k.map((se) => /* @__PURE__ */ a("label", { className: "flex flex-col gap-1 text-xs", children: [
                /* @__PURE__ */ t("span", { className: "font-medium text-text-primary", children: se }),
                /* @__PURE__ */ t(
                  "textarea",
                  {
                    "data-autofocus": se === k[0] ? !0 : void 0,
                    rows: 3,
                    className: "resize-y px-2 py-1.5 rounded-md border border-border text-xs font-inherit",
                    value: u.triggerInputValues[se] ?? "",
                    onChange: (q) => u.setTriggerInputValues((L) => ({ ...L, [se]: q.target.value }))
                  }
                )
              ] }, se))
            ] })
          }
        )
      ]
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: A(
        "flex flex-col min-h-[calc(100vh-200px)]",
        "bg-surface-inset font-inherit text-text-primary",
        "rounded-lg border border-border overflow-hidden"
      ),
      children: /* @__PURE__ */ t("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]", children: "Loading pipeline…" })
    }
  );
}
function Fa(e) {
  const n = e?.event;
  return !n || n === "manual" ? { icon: "▶", text: "Manual" } : n === "schedule" ? { icon: "⏱", text: e?.schedule ?? "Schedule" } : n === "webhook" ? { icon: "🔌", text: e?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${e?.event}` };
}
function ja({
  row: e,
  onOpen: n,
  onRun: r,
  onDuplicate: o,
  onExport: s,
  onDelete: i,
  selectionMode: c,
  selected: d,
  anySelected: l,
  onToggleSelect: p
}) {
  const [f, h] = R(!1), [m, x] = R(!1), g = ae(null);
  tt(g, () => h(!1), f);
  const u = e.status === "published", v = e.status === "archived", N = typeof e.publishedVersion == "number", w = Fa(e.triggerBinding);
  let C, b;
  v ? (C = `Archived · v${e.version}`, b = "danger") : u ? (C = `Published · v${e.version}`, b = "success") : N ? (C = `Draft · v${e.version} (published v${e.publishedVersion})`, b = "warning") : (C = `Draft · v${e.version}`, b = "neutral");
  const y = !u, k = (T) => ($) => {
    $.stopPropagation(), T();
  }, D = c || d || m || l, S = (T) => {
    c ? p(T.shiftKey) : n();
  };
  return /* @__PURE__ */ a(
    "div",
    {
      "data-testid": `pipeline-card-${e.id}`,
      "data-selected": d ? "true" : "false",
      onClick: S,
      onMouseEnter: () => x(!0),
      onMouseLeave: () => {
        x(!1), h(!1);
      },
      className: A(
        "flex flex-col gap-2 w-full px-3.5 py-3 bg-surface rounded-lg cursor-pointer relative transition-[border-color,box-shadow] duration-100",
        d ? "border border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : m ? "border border-primary shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "border border-border shadow-none"
      ),
      children: [
        D && /* @__PURE__ */ t(
          "label",
          {
            onClick: (T) => T.stopPropagation(),
            className: "absolute top-2 right-2 flex items-center justify-center w-[22px] h-[22px] cursor-pointer z-[1]",
            children: /* @__PURE__ */ t(
              "input",
              {
                type: "checkbox",
                "data-testid": `pipeline-select-${e.id}`,
                checked: d,
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
        /* @__PURE__ */ a("div", { className: A("flex items-center gap-2 min-w-0", D && "pr-7"), children: [
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
        /* @__PURE__ */ a("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ t(xe, { "aria-label": `Status: ${C}`, tone: b, size: "sm", children: C }),
          /* @__PURE__ */ a("span", { className: "text-[11px] text-text-secondary", children: [
            w.icon,
            " ",
            w.text
          ] }),
          /* @__PURE__ */ a("span", { className: "text-[11px] text-text-tertiary", children: [
            "· ",
            e.nodeCount,
            " node",
            e.nodeCount === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": `run-pipeline-${e.id}`,
              onClick: k(r),
              disabled: y,
              title: y ? "Run requires published state" : "Run pipeline",
              className: "px-3 py-[5px] text-xs font-semibold bg-primary text-white border-none rounded-md font-[inherit] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
              children: "Run"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": `edit-pipeline-${e.id}`,
              onClick: k(n),
              className: "px-3 py-[5px] text-xs font-semibold bg-surface text-text-secondary border border-border-field rounded-md cursor-pointer font-[inherit]",
              children: "Edit"
            }
          ),
          /* @__PURE__ */ a("div", { className: "relative ml-auto", ref: g, children: [
            /* @__PURE__ */ t(
              "button",
              {
                "data-testid": `overflow-pipeline-${e.id}`,
                onClick: k(() => h((T) => !T)),
                "aria-label": "More actions",
                className: "px-2 py-1 text-sm font-bold bg-transparent text-text-secondary border border-transparent rounded-md cursor-pointer font-[inherit] leading-none",
                children: "⋯"
              }
            ),
            f && /* @__PURE__ */ a(
              "div",
              {
                "data-testid": `overflow-menu-${e.id}`,
                role: "menu",
                onClick: (T) => T.stopPropagation(),
                className: "absolute right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-[0_8px_24px_rgba(15,23,42,0.12)] min-w-[160px] z-10 overflow-hidden",
                children: [
                  /* @__PURE__ */ t("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: k(() => {
                    h(!1), o();
                  }), children: "Duplicate" }),
                  /* @__PURE__ */ t("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: k(() => {
                    h(!1), s();
                  }), children: "Export JSON" }),
                  /* @__PURE__ */ t(
                    "button",
                    {
                      className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-[#dc2626]",
                      role: "menuitem",
                      onClick: k(() => {
                        h(!1), i();
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
const qa = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, za = ["draft", "published"];
function Ha({
  search: e,
  onSearchChange: n,
  statusFilter: r,
  statusExplicit: o,
  onToggleStatusKey: s,
  triggerFilter: i,
  onTriggerFilterChange: c,
  sortKey: d,
  onSortKeyChange: l,
  allVisibleSelected: p,
  selectAllRef: f,
  onHeaderToggleAll: h
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: A(
        "min-h-[40px] shrink-0 flex items-center gap-3 px-6",
        "border-b border-border bg-white"
      ),
      children: [
        /* @__PURE__ */ a(
          "label",
          {
            className: "flex items-center gap-1.5 cursor-pointer",
            title: "Select all visible pipelines",
            children: [
              /* @__PURE__ */ t(
                "input",
                {
                  ref: f,
                  type: "checkbox",
                  "data-testid": "pipeline-select-all",
                  "aria-label": "Select all visible pipelines",
                  checked: p,
                  onChange: h,
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
            onChange: (m) => n(m.target.value),
            className: A(
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
            children: jt.map((m) => {
              const x = o ? r.has(m) : za.includes(m);
              return /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  role: "checkbox",
                  "aria-checked": x,
                  "data-testid": `status-chip-${m}`,
                  onClick: () => s(m),
                  onKeyDown: (g) => {
                    (g.key === "Enter" || g.key === " ") && (g.preventDefault(), s(m));
                  },
                  className: A(
                    "px-3 py-1.5 text-xs font-medium rounded cursor-pointer font-inherit",
                    x ? "border border-primary bg-primary text-white" : "border border-border bg-white text-text-secondary"
                  ),
                  children: qa[m]
                },
                m
              );
            })
          }
        ),
        /* @__PURE__ */ a("label", { className: "text-xs text-text-secondary flex items-center gap-1.5", children: [
          "Trigger:",
          /* @__PURE__ */ a(
            "select",
            {
              "data-testid": "trigger-filter",
              value: i,
              onChange: (m) => c(m.target.value),
              className: A(
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
        /* @__PURE__ */ a("label", { className: "text-xs text-text-secondary flex items-center gap-1.5 ml-auto", children: [
          "Sort:",
          /* @__PURE__ */ a(
            "select",
            {
              "data-testid": "sort-key",
              value: d,
              onChange: (m) => l(m.target.value),
              className: A(
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
const He = A(
  "px-2.5 py-[5px] text-xs font-semibold",
  "bg-white text-text-secondary",
  "border border-border-field rounded-md",
  "cursor-pointer font-inherit"
);
function Ka({
  count: e,
  onClear: n,
  onExport: r,
  onExportAsJSON: o,
  onPublish: s,
  onArchive: i,
  onAddTag: c,
  onRemoveTag: d,
  onDelete: l,
  onDeleteWithConfirm: p,
  addTagOpen: f,
  removeTagOpen: h,
  onSubmitAddTag: m,
  onSubmitRemoveTag: x,
  onCloseAddTag: g,
  onCloseRemoveTag: u,
  unionTags: v
}) {
  const [N, w] = R(""), C = ae(null), b = ae(null), y = ae(null);
  J(() => {
    f && (w(""), setTimeout(() => C.current?.focus(), 30));
  }, [f]), J(() => {
    if (!f) return;
    const D = (T) => {
      b.current?.contains(T.target) || g();
    }, S = window.setTimeout(() => {
      document.addEventListener("mousedown", D);
    }, 0);
    return () => {
      window.clearTimeout(S), document.removeEventListener("mousedown", D);
    };
  }, [f, g]), J(() => {
    if (!h) return;
    const D = (T) => {
      y.current?.contains(T.target) || u();
    }, S = window.setTimeout(() => {
      document.addEventListener("mousedown", D);
    }, 0);
    return () => {
      window.clearTimeout(S), document.removeEventListener("mousedown", D);
    };
  }, [h, u]);
  const k = () => {
    const D = N.trim();
    D.length !== 0 && (m(D), w(""));
  };
  return /* @__PURE__ */ a(
    "div",
    {
      "data-testid": "bulk-action-bar",
      className: A(
        "min-h-[40px] shrink-0 flex items-center gap-3 px-6",
        "border-b border-border bg-[#eef2ff]",
        "sticky top-[56px] z-[1]"
      ),
      children: [
        /* @__PURE__ */ a(
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
        /* @__PURE__ */ t("button", { "data-testid": "bulk-clear", className: He, onClick: n, children: "Clear" }),
        /* @__PURE__ */ t("button", { "data-testid": "bulk-publish", className: He, onClick: s, children: "Publish selected" }),
        /* @__PURE__ */ t("button", { "data-testid": "bulk-archive", className: He, onClick: i, children: "Archive selected" }),
        /* @__PURE__ */ t("button", { "data-testid": "bulk-export-json", className: He, onClick: o, children: "Export selected as JSON" }),
        /* @__PURE__ */ t("button", { "data-testid": "bulk-export", className: He, onClick: r, children: "Export all" }),
        /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "bulk-delete-confirm-prompt",
            className: He,
            onClick: p,
            children: "Delete selected"
          }
        ),
        /* @__PURE__ */ a("div", { className: "relative", children: [
          /* @__PURE__ */ t("button", { "data-testid": "bulk-add-tag-btn", className: He, onClick: c, children: "Add tag..." }),
          f && /* @__PURE__ */ a(
            "div",
            {
              ref: b,
              "data-testid": "bulk-add-tag-popover",
              onClick: (D) => D.stopPropagation(),
              className: A(
                "absolute top-full left-0 mt-1.5",
                "bg-white border border-border rounded-lg",
                "shadow-lg min-w-[220px] p-2.5 z-10",
                "flex flex-col gap-2"
              ),
              children: [
                /* @__PURE__ */ t(
                  "input",
                  {
                    ref: C,
                    type: "text",
                    "data-testid": "bulk-add-tag-input",
                    placeholder: "Tag name",
                    value: N,
                    onChange: (D) => w(D.target.value),
                    onKeyDown: (D) => {
                      D.key === "Enter" ? (D.preventDefault(), k()) : D.key === "Escape" && (D.preventDefault(), g());
                    },
                    className: A(
                      "border border-border-field rounded-md px-2.5 py-1.5 text-[13px]",
                      "bg-[#f9fafb] text-text-primary outline-none w-full"
                    )
                  }
                ),
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "bulk-add-tag-submit",
                    disabled: N.trim().length === 0,
                    onClick: k,
                    className: A(
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
        /* @__PURE__ */ a("div", { className: "relative", children: [
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "bulk-remove-tag-btn",
              className: A(
                He,
                v.length === 0 && "opacity-50 cursor-not-allowed"
              ),
              onClick: d,
              disabled: v.length === 0,
              title: v.length === 0 ? "No tags on selected pipelines" : "Remove tag from selected",
              children: "Remove tag..."
            }
          ),
          h && /* @__PURE__ */ a(
            "div",
            {
              ref: y,
              "data-testid": "bulk-remove-tag-popover",
              onClick: (D) => D.stopPropagation(),
              className: A(
                "absolute top-full left-0 mt-1.5",
                "bg-white border border-border rounded-lg",
                "shadow-lg min-w-[220px] max-w-[320px] p-2.5 z-10",
                "flex flex-col gap-2"
              ),
              children: [
                /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary", children: "Click a tag to remove it from all selected:" }),
                /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5", children: v.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "No tags to remove." }) : v.map((D) => /* @__PURE__ */ a(
                  "button",
                  {
                    "data-testid": `bulk-remove-tag-chip-${D}`,
                    onClick: () => x(D),
                    className: A(
                      "px-2 py-0.5 text-xs font-medium",
                      "bg-red-50 text-red-600",
                      "border border-red-200 rounded-full",
                      "cursor-pointer font-inherit"
                    ),
                    children: [
                      D,
                      " ✕"
                    ]
                  },
                  D
                )) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "bulk-delete",
            className: A(
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
function Wa({
  visibleRows: e,
  filteredIds: n
}) {
  const [r, o] = R(!1), [s, i] = R(/* @__PURE__ */ new Set()), c = ae(null), d = ae(null), l = P(() => {
    i(/* @__PURE__ */ new Set());
  }, []), p = P(() => {
    r ? (l(), o(!1)) : o(!0);
  }, [r, l]), f = P(
    (u, v = !1) => {
      const N = e, w = N.findIndex((b) => b.id === u), C = c.current;
      w !== -1 && (c.current = w), i((b) => {
        const y = new Set(b), k = !y.has(u);
        if (v && C != null && w !== -1) {
          const D = Math.min(C, w), S = Math.max(C, w);
          for (let T = D; T <= S; T++) {
            const $ = N[T];
            $ && (k ? y.add($.id) : y.delete($.id));
          }
        } else k ? y.add(u) : y.delete(u);
        return y;
      });
    },
    [e]
  ), h = P(() => {
    i(new Set(n));
  }, [n]), m = e.length > 0 && e.every((u) => s.has(u.id)), x = !m && e.some((u) => s.has(u.id)), g = P(() => {
    i((u) => {
      const v = new Set(u);
      if (m)
        for (const N of e) v.delete(N.id);
      else
        for (const N of e) v.add(N.id);
      return v;
    }), r || o(!0);
  }, [m, e, r]);
  return J(() => {
    d.current && (d.current.indeterminate = x);
  }, [x]), {
    selectionMode: r,
    selected: s,
    allVisibleSelected: m,
    someVisibleSelected: x,
    selectAllRef: d,
    handleToggleSelectMode: p,
    handleToggleSelect: f,
    handleSelectAllFiltered: h,
    handleHeaderToggleAll: g,
    clearSelection: l,
    setSelectionMode: o
  };
}
const Va = 280, he = 160, Ja = 40, Ga = 200;
function _(e) {
  return Ja + e * Va;
}
function U(e) {
  return Ga + e * he;
}
function j(e, n, r, o = "in") {
  return {
    id: crypto.randomUUID(),
    source: e,
    sourceHandle: n,
    target: r,
    targetHandle: o
  };
}
function Ya(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), i = {
    type: "trigger",
    triggerType: "document.finalize"
  }, c = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Summarize the following document in 2-3 concise sentences.",
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0.3,
    maxTokens: 512,
    streaming: !0
  }, d = {
    type: "action",
    actionType: "post-comment",
    config: { body: `{{context.steps.${o}.response}}` },
    idempotent: !0,
    onError: "fail-run"
  }, l = [
    { id: r, type: "trigger", position: { x: _(0), y: U(0) }, data: i },
    { id: o, type: "llm", position: { x: _(1), y: U(0) }, data: c },
    { id: s, type: "action", position: { x: _(2), y: U(0) }, data: d }
  ], p = [
    j(r, "out", o),
    j(o, "out", s)
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
function Xa(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), c = crypto.randomUUID(), d = crypto.randomUUID(), l = crypto.randomUUID(), p = {
    type: "trigger",
    triggerType: "document.finalize",
    documentTypeId: "meeting-notes"
  }, f = {
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
      value: `{{context.steps.${s}.response}}`
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
      message: `Meeting summary: {{context.steps.${c}.response}}`
    },
    idempotent: !1,
    onError: "route-error"
  }, u = {
    type: "join",
    mode: "all",
    mergeStrategy: "deep-merge"
  }, v = [
    { id: r, type: "trigger", position: { x: _(0), y: U(0) }, data: p },
    { id: o, type: "fork", position: { x: _(1), y: U(0) }, data: f },
    { id: s, type: "llm", position: { x: _(2), y: U(0) - he / 2 }, data: h },
    { id: i, type: "action", position: { x: _(3), y: U(0) - he / 2 }, data: m },
    { id: c, type: "llm", position: { x: _(2), y: U(0) + he / 2 }, data: x },
    { id: d, type: "action", position: { x: _(3), y: U(0) + he / 2 }, data: g },
    { id: l, type: "join", position: { x: _(4), y: U(0) }, data: u }
  ], N = [
    j(r, "out", o),
    j(o, "branch-0", s),
    j(s, "out", i),
    j(i, "out", l, "in-0"),
    j(o, "branch-1", c),
    j(c, "out", d),
    j(d, "out", l, "in-1")
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
    createdBy: e
  };
}
function Qa(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), c = crypto.randomUUID(), d = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), f = crypto.randomUUID(), h = {
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
  }, x = {
    type: "condition",
    expression: `context.steps.${o}.output.safe === true`,
    label: "Safe?"
  }, g = {
    type: "action",
    actionType: "post-comment",
    config: { body: "{{context.commentBody}}" },
    idempotent: !0,
    onError: "fail-run"
  }, u = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "moderation",
      message: `Flagged comment: {{context.steps.${o}.output.reason}}`
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
    expression: `context.steps.${d}.output.decision === 'approve'`,
    label: "Approved?"
  }, w = {
    type: "action",
    actionType: "post-comment",
    config: { body: "{{context.commentBody}}" },
    idempotent: !0,
    onError: "fail-run"
  }, C = {
    type: "action",
    actionType: "update-document",
    config: { field: "commentStatus", value: "deleted" },
    idempotent: !0,
    onError: "fail-run"
  }, b = [
    { id: r, type: "trigger", position: { x: _(0), y: U(0) }, data: h },
    { id: o, type: "llm", position: { x: _(1), y: U(0) }, data: m },
    { id: s, type: "condition", position: { x: _(2), y: U(0) }, data: x },
    { id: i, type: "action", position: { x: _(3), y: U(0) - he / 2 }, data: g },
    { id: c, type: "action", position: { x: _(3), y: U(0) + he / 2 }, data: u },
    { id: d, type: "approval", position: { x: _(4), y: U(0) + he / 2 }, data: v },
    { id: l, type: "condition", position: { x: _(5), y: U(0) + he / 2 }, data: N },
    { id: p, type: "action", position: { x: _(6), y: U(0) }, data: w },
    { id: f, type: "action", position: { x: _(6), y: U(0) + he }, data: C }
  ], y = [
    j(r, "out", o),
    j(o, "out", s),
    j(s, "true", i),
    j(s, "false", c),
    j(c, "out", d),
    j(d, "approved", l),
    j(d, "rejected", f),
    j(l, "true", p),
    j(l, "false", f)
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
    edges: y,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function Za(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), c = {
    type: "trigger",
    triggerType: "document.finalize"
  }, d = {
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
    expression: `$.steps.${o}.response`,
    outputKey: "tags"
  }, p = {
    type: "action",
    actionType: "update-document",
    config: { field: "tags", value: "{{context.tags}}" },
    idempotent: !0,
    onError: "fail-run"
  }, f = [
    { id: r, type: "trigger", position: { x: _(0), y: U(0) }, data: c },
    { id: o, type: "llm", position: { x: _(1), y: U(0) }, data: d },
    { id: s, type: "transform", position: { x: _(2), y: U(0) }, data: l },
    { id: i, type: "action", position: { x: _(3), y: U(0) }, data: p }
  ], h = [
    j(r, "out", o),
    j(o, "out", s),
    j(s, "out", i)
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
    nodes: f,
    edges: h,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function ei(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), c = {
    type: "trigger",
    triggerType: "document.finalize"
  }, d = {
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
  }, f = [
    { id: r, type: "trigger", position: { x: _(0), y: U(0) }, data: c },
    { id: o, type: "approval", position: { x: _(1), y: U(0) }, data: d },
    { id: s, type: "approval", position: { x: _(2), y: U(0) }, data: l },
    { id: i, type: "action", position: { x: _(3), y: U(0) }, data: p }
  ], h = [
    j(r, "out", o),
    j(o, "approved", s),
    j(s, "approved", i)
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
    nodes: f,
    edges: h,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function ti(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), c = {
    type: "trigger",
    triggerType: "webhook",
    webhookPath: "/pipelines/webhooks/translate"
  }, d = {
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
    config: { body: `{{context.steps.${s}.response}}` },
    idempotent: !0,
    onError: "route-error"
  }, f = [
    { id: r, type: "trigger", position: { x: _(0), y: U(0) }, data: c },
    { id: o, type: "transform", position: { x: _(1), y: U(0) }, data: d },
    { id: s, type: "llm", position: { x: _(2), y: U(0) }, data: l },
    { id: i, type: "action", position: { x: _(3), y: U(0) }, data: p }
  ], h = [
    j(r, "out", o),
    j(o, "out", s),
    j(s, "out", i)
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
    nodes: f,
    edges: h,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function ni(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), i = {
    type: "trigger",
    triggerType: "schedule",
    schedule: "0 9 * * *"
  }, c = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Summarize all documents updated in the last 24 hours into a concise daily digest with bullet points.",
    userPromptTemplate: "{{context.recentDocuments}}",
    temperature: 0.3,
    maxTokens: 1024,
    streaming: !1
  }, d = {
    type: "action",
    actionType: "post-comment",
    config: { documentId: "digest-doc", body: `{{context.steps.${o}.response}}` },
    idempotent: !0,
    onError: "route-error"
  }, l = [
    { id: r, type: "trigger", position: { x: _(0), y: U(0) }, data: i },
    { id: o, type: "llm", position: { x: _(1), y: U(0) }, data: c },
    { id: s, type: "action", position: { x: _(2), y: U(0) }, data: d }
  ], p = [
    j(r, "out", o),
    j(o, "out", s)
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
function ri(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), i = { type: "trigger", triggerType: "document.submit" }, c = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "Extract 3-6 relevant tags from this newly submitted document. Respond as a JSON array of lowercase strings, no prose.",
    userPromptTemplate: "{{context.documentBody}}",
    temperature: 0.2,
    maxTokens: 256,
    streaming: !1
  }, d = {
    type: "action",
    actionType: "update-document",
    config: { field: "tags", value: `{{context.steps.${o}.response}}` },
    idempotent: !0,
    onError: "fail-run"
  }, l = [
    { id: r, type: "trigger", position: { x: _(0), y: U(0) }, data: i },
    { id: o, type: "llm", position: { x: _(1), y: U(0) }, data: c },
    { id: s, type: "action", position: { x: _(2), y: U(0) }, data: d }
  ], p = [
    j(r, "out", o),
    j(o, "out", s)
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
function oi(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), c = crypto.randomUUID(), d = crypto.randomUUID(), l = { type: "trigger", triggerType: "document.finalize" }, p = {
    type: "fork",
    branchCount: 2,
    branchLabels: ["llm-review", "human-review"]
  }, f = {
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
  }, m = { type: "join", mode: "all", mergeStrategy: "deep-merge" }, x = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "reviews",
      message: `Review complete: LLM said {{context.steps.${s}.response}}; reviewer decision: {{context.steps.${i}.output.decision}}`
    },
    idempotent: !1,
    onError: "route-error"
  }, g = [
    { id: r, type: "trigger", position: { x: _(0), y: U(0) }, data: l },
    { id: o, type: "fork", position: { x: _(1), y: U(0) }, data: p },
    { id: s, type: "llm", position: { x: _(2), y: U(0) - he / 2 }, data: f },
    { id: i, type: "approval", position: { x: _(2), y: U(0) + he / 2 }, data: h },
    { id: c, type: "join", position: { x: _(3), y: U(0) }, data: m },
    { id: d, type: "action", position: { x: _(4), y: U(0) }, data: x }
  ], u = [
    j(r, "out", o),
    j(o, "branch-0", s),
    j(s, "out", c, "in-0"),
    j(o, "branch-1", i),
    j(i, "approved", c, "in-1"),
    j(c, "out", d)
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
    edges: u,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function si(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), c = crypto.randomUUID(), d = crypto.randomUUID(), l = {
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
  }, f = {
    type: "condition",
    expression: `context.steps.${o}.output.severity === 'critical'`,
    label: "Critical?"
  }, h = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "on-call",
      message: `CRITICAL incident: {{context.steps.${o}.output.summary}}`
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
  }, x = {
    type: "action",
    actionType: "webhook",
    config: {
      url: "https://tickets.example.com/api/incidents",
      method: "POST",
      body: {
        severity: `{{context.steps.${o}.output.severity}}`,
        summary: `{{context.steps.${o}.output.summary}}`
      }
    },
    idempotent: !0,
    onError: "route-error"
  }, g = [
    { id: r, type: "trigger", position: { x: _(0), y: U(0) }, data: l },
    { id: o, type: "llm", position: { x: _(1), y: U(0) }, data: p },
    { id: s, type: "condition", position: { x: _(2), y: U(0) }, data: f },
    { id: i, type: "action", position: { x: _(3), y: U(0) - he / 2 }, data: h },
    { id: c, type: "approval", position: { x: _(4), y: U(0) - he / 2 }, data: m },
    { id: d, type: "action", position: { x: _(3), y: U(0) + he / 2 }, data: x }
  ], u = [
    j(r, "out", o),
    j(o, "out", s),
    j(s, "true", i),
    j(i, "out", c),
    j(s, "false", d)
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
    edges: u,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function ai(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), c = crypto.randomUUID(), d = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), f = crypto.randomUUID(), h = {
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

Summary: {{context.steps.${o}.response}}`,
    temperature: 0.1,
    maxTokens: 1024,
    streaming: !1
  }, u = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are a code-style reviewer. Flag naming, structure, readability, and idiom issues. Output JSON {"findings": [{"file": string, "line": number?, "issue": string}]}.',
    userPromptTemplate: `{{context.payload.pull_request.diff}}

Summary: {{context.steps.${o}.response}}`,
    temperature: 0.2,
    maxTokens: 1024,
    streaming: !1
  }, v = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'You are a test-coverage reviewer. Identify untested branches, missing edge-case tests, and risky changes lacking tests. Output JSON {"gaps": [{"file": string, "concern": string}]}.',
    userPromptTemplate: `{{context.payload.pull_request.diff}}

Summary: {{context.steps.${o}.response}}`,
    temperature: 0.1,
    maxTokens: 1024,
    streaming: !1
  }, N = {
    type: "join",
    mode: "all",
    mergeStrategy: "array-collect"
  }, w = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "You are a lead reviewer. Combine the security, style, and test-coverage findings into a single PR comment in markdown with sections, prioritized actions, and a final approve/request-changes recommendation.",
    userPromptTemplate: `Security: {{context.steps.${i}.response}}

Style: {{context.steps.${c}.response}}

Coverage: {{context.steps.${d}.response}}`,
    temperature: 0.3,
    maxTokens: 1536,
    streaming: !0
  }, C = {
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
    { id: r, type: "trigger", position: { x: _(0), y: U(0) }, data: h },
    { id: o, type: "llm", position: { x: _(1), y: U(0) }, data: m },
    { id: s, type: "fork", position: { x: _(2), y: U(0) }, data: x },
    { id: i, type: "llm", position: { x: _(3), y: U(0) - he }, data: g },
    { id: c, type: "llm", position: { x: _(3), y: U(0) }, data: u },
    { id: d, type: "llm", position: { x: _(3), y: U(0) + he }, data: v },
    { id: l, type: "join", position: { x: _(4), y: U(0) }, data: N },
    { id: p, type: "llm", position: { x: _(5), y: U(0) }, data: w },
    { id: f, type: "action", position: { x: _(6), y: U(0) }, data: C }
  ], y = [
    j(r, "out", o),
    j(o, "out", s),
    j(s, "branch-0", i),
    j(s, "branch-1", c),
    j(s, "branch-2", d),
    j(i, "out", l, "in-0"),
    j(c, "out", l, "in-1"),
    j(d, "out", l, "in-2"),
    j(l, "out", p),
    j(p, "out", f)
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
    edges: y,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function ii(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), c = crypto.randomUUID(), d = {
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
    expression: `context.steps.${o}.output.category === 'clean'`,
    label: "Clean?"
  }, f = {
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
    message: `Document flagged as {{context.steps.${o}.output.category}} — please review before publishing.`
  }, m = [
    { id: r, type: "trigger", position: { x: _(0), y: U(0) }, data: d },
    { id: o, type: "llm", position: { x: _(1), y: U(0) }, data: l },
    { id: s, type: "condition", position: { x: _(2), y: U(0) }, data: p },
    { id: i, type: "action", position: { x: _(3), y: U(0) - he / 2 }, data: f },
    { id: c, type: "approval", position: { x: _(3), y: U(0) + he / 2 }, data: h }
  ], x = [
    j(r, "out", o),
    j(o, "out", s),
    j(s, "true", i),
    j(s, "false", c)
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
    edges: x,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function li(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), i = crypto.randomUUID(), c = crypto.randomUUID(), d = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), f = {
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
    expression: `$.steps.${o}.output`,
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
  }, u = {
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
        body: `{{context.steps.${d}.response}}`
      }
    },
    idempotent: !0,
    onError: "route-error"
  }, w = [
    { id: r, type: "trigger", position: { x: _(0), y: U(0) }, data: f },
    { id: o, type: "llm", position: { x: _(1), y: U(0) }, data: h },
    { id: s, type: "transform", position: { x: _(2), y: U(0) }, data: m },
    { id: i, type: "condition", position: { x: _(3), y: U(0) }, data: x },
    { id: c, type: "action", position: { x: _(4), y: U(0) - he / 2 }, data: g },
    { id: d, type: "llm", position: { x: _(4), y: U(0) + he / 2 }, data: u },
    { id: l, type: "approval", position: { x: _(5), y: U(0) + he / 2 }, data: v },
    { id: p, type: "action", position: { x: _(6), y: U(0) + he / 2 }, data: N }
  ], C = [
    j(r, "out", o),
    j(o, "out", s),
    j(s, "out", i),
    j(i, "true", c),
    j(i, "false", d),
    j(d, "out", l),
    j(l, "approved", p)
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
    nodes: w,
    edges: C,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
const Dt = [
  {
    id: "document-summary",
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    tags: ["llm", "summary", "document"],
    build: Ya
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: Xa
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: Qa,
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
    build: Za,
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
    build: ei,
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
    build: ti
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: ni
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: ri
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: oi
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: si
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: ai
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: ii
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: li
  }
], Bn = "/api";
async function di(e) {
  const n = { createdTypes: [], errors: [] };
  if (!e?.documentTypes?.length) return n;
  for (const r of e.documentTypes)
    try {
      const o = await ci(r.name);
      if (o) {
        n.createdTypes.push(o.typeId);
        continue;
      }
      const s = await pi(r);
      n.createdTypes.push(s.typeId);
    } catch (o) {
      n.errors.push(
        `Failed to scaffold "${r.name}": ${o instanceof Error ? o.message : String(o)}`
      );
    }
  return n;
}
async function ci(e) {
  try {
    const n = await fetch(`${Bn}/document-types`, { credentials: "same-origin" });
    if (!n.ok) return null;
    const o = (await n.json()).items?.find(
      (s) => s.name.toLowerCase() === e.toLowerCase()
    );
    return o ? { typeId: o.typeId } : null;
  } catch {
    return null;
  }
}
async function pi(e) {
  const n = e.fields.map((s, i) => ({
    fieldId: crypto.randomUUID(),
    name: s.name,
    fieldType: s.fieldType,
    widget: ui(s.fieldType),
    cardinality: 1,
    required: s.required ?? !1,
    helpText: "",
    options: s.options,
    order: i
  })), r = await fetch(`${Bn}/document-types`, {
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
    const s = await r.text();
    throw new Error(`HTTP ${r.status}: ${s}`);
  }
  return await r.json();
}
function ui(e) {
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
function mi(e) {
  const n = /* @__PURE__ */ new Map(), r = e.nodes.map((i) => {
    const c = crypto.randomUUID();
    return n.set(i.id, c), {
      ...i,
      id: c,
      data: JSON.parse(JSON.stringify(i.data)),
      position: { ...i.position }
    };
  }), o = e.edges.map((i) => ({
    ...i,
    id: crypto.randomUUID(),
    source: n.get(i.source) ?? i.source,
    target: n.get(i.target) ?? i.target
  })), s = (/* @__PURE__ */ new Date()).toISOString();
  return {
    ...e,
    id: crypto.randomUUID(),
    name: `${e.name} (copy)`,
    status: "draft",
    version: 1,
    publishedVersion: void 0,
    publishedSnapshot: void 0,
    nodes: r,
    edges: o,
    createdAt: s,
    updatedAt: s
  };
}
function fi(e) {
  const n = e.triggerBinding?.event ?? "manual";
  return n === "schedule" ? "Schedule" : n === "webhook" ? "Webhook" : n === "manual" ? "Manual" : n.startsWith("document.") ? `On ${n}` : n;
}
function hi({ template: e, meta: n, onPick: r }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-testid": `template-card-${e.id}`,
      className: "flex flex-col gap-2 w-[220px] min-h-[200px] p-3.5 bg-surface border border-border rounded-[10px] font-[inherit]",
      children: [
        /* @__PURE__ */ a("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ t("span", { className: "text-2xl", "aria-hidden": !0, children: e.icon }),
          /* @__PURE__ */ t("div", { className: "text-sm font-bold text-text-primary overflow-hidden text-ellipsis", children: e.name })
        ] }),
        /* @__PURE__ */ a(
          "div",
          {
            "data-testid": `template-meta-${e.id}`,
            className: "text-[11px] text-text-tertiary flex gap-2",
            children: [
              /* @__PURE__ */ a("span", { children: [
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
        e.tags.length > 0 && /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: e.tags.map((o) => /* @__PURE__ */ t(
          "span",
          {
            className: "text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#f1f5f9] text-text-secondary lowercase",
            children: o
          },
          o
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
function xi({
  open: e,
  onClose: n,
  onCreated: r,
  onSelect: o
}) {
  const { userId: s } = Ut(), [i, c] = R(""), d = ae(null);
  J(() => {
    e && (c(""), setTimeout(() => d.current?.focus(), 30));
  }, [e]);
  const l = B(() => {
    const m = /* @__PURE__ */ new Map();
    for (const x of Dt) {
      const g = x.build(s || "anonymous");
      m.set(x.id, { nodeCount: g.nodes.length, trigger: fi(g) });
    }
    return m;
  }, [s, e]), p = B(() => {
    const m = i.trim().toLowerCase();
    return m ? Dt.filter(
      (x) => x.name.toLowerCase().includes(m) || x.description.toLowerCase().includes(m) || x.tags.some((g) => g.toLowerCase().includes(m))
    ) : Dt;
  }, [i]), f = (m) => {
    if (r) {
      const x = m.build(s || "anonymous"), g = mi(x);
      nr(g), n(), r(g.id), m.prerequisites && di(m.prerequisites).then((u) => {
        u.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", u.errors);
      });
      return;
    }
    o && o(m);
  };
  return /* @__PURE__ */ a(
    je,
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
            ref: d,
            type: "search",
            "data-testid": "templates-search",
            placeholder: "Search templates…",
            value: i,
            onChange: (m) => c(m.target.value),
            onKeyDown: (m) => {
              m.key === "Enter" && p.length > 0 && (m.preventDefault(), f(p[0]));
            },
            className: "w-full px-3 py-2 text-[13px] mb-3.5 border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none"
          }
        ),
        p.length === 0 ? /* @__PURE__ */ a(
          "div",
          {
            "data-testid": "templates-empty",
            className: "text-center p-8 text-[13px] text-text-tertiary",
            children: [
              'No templates match "',
              i,
              '".'
            ]
          }
        ) : /* @__PURE__ */ t(
          "div",
          {
            "data-testid": "templates-grid",
            className: "grid grid-cols-[repeat(3,220px)] gap-4 justify-center max-h-[60vh] overflow-y-auto p-2",
            children: p.map((m) => /* @__PURE__ */ t(
              hi,
              {
                template: m,
                meta: l.get(m.id) ?? { nodeCount: 0, trigger: "—" },
                onPick: f
              },
              m.id
            ))
          }
        )
      ]
    }
  );
}
const jt = ["draft", "published", "archived"], cn = ["draft", "published"];
function gi(e) {
  if (e == null) return null;
  if (e.trim() === "") return /* @__PURE__ */ new Set();
  const n = new Set(jt);
  return new Set(
    e.split(",").map((o) => o.trim()).filter((o) => n.has(o))
  );
}
function bi(e, n) {
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
function yi(e) {
  const n = e?.event;
  return !n || n === "manual" ? "manual" : n === "schedule" ? "schedule" : n === "webhook" ? "webhook" : "document";
}
function pn(e) {
  return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function vi() {
  const e = /* @__PURE__ */ new Date(), n = e.getFullYear(), r = String(e.getMonth() + 1).padStart(2, "0"), o = String(e.getDate()).padStart(2, "0");
  return `${n}-${r}-${o}`;
}
function Ni({
  open: e,
  onClose: n,
  onCreate: r
}) {
  const [o, s] = R(""), i = ae(null);
  J(() => {
    e && (s(""), setTimeout(() => i.current?.focus(), 50));
  }, [e]);
  const c = o.trim().length > 0, d = () => {
    c && r(o.trim());
  };
  return /* @__PURE__ */ a(
    je,
    {
      open: e,
      onClose: n,
      title: "Create new pipeline",
      maxWidth: 440,
      footer: /* @__PURE__ */ a(X, { children: [
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
            className: A(
              "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer",
              !c && "opacity-50 cursor-not-allowed"
            ),
            disabled: !c,
            onClick: d,
            children: "Create pipeline"
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ t("label", { className: "block text-[13px] font-semibold text-text-secondary mb-1.5", children: "Name" }),
        /* @__PURE__ */ t(
          "input",
          {
            ref: i,
            "data-testid": "new-pipeline-name",
            type: "text",
            value: o,
            onChange: (l) => s(l.target.value),
            onKeyDown: (l) => {
              l.key === "Enter" && d();
            },
            placeholder: "e.g. Invoice summarizer",
            className: A(
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
function gd() {
  const e = Me(), { userId: n } = Ut(), { toast: r } = kt(), { triggerRun: o, isTriggering: s } = rr(), [i, c] = wt(), [d, l] = R([]), [p, f] = R(""), [h, m] = R("all"), [x, g] = R("updated"), u = B(
    () => gi(i.get("status")),
    [i]
  ), v = B(() => u ?? new Set(cn), [u]), N = u != null, w = (I) => {
    const M = new URLSearchParams(i);
    if (I.size === 0)
      M.set("status", "");
    else {
      const Y = jt.filter((oe) => I.has(oe)).join(",");
      M.set("status", Y);
    }
    c(M, { replace: !0 });
  }, C = (I) => {
    const M = N ? new Set(v) : new Set(cn);
    M.has(I) ? M.delete(I) : M.add(I), w(M);
  }, [b, y] = R(!1), [k, D] = R(!1), [S, T] = R(null), [$, H] = R(!1), [V, Q] = R(!1), [de, ce] = R(!1), ne = P(async () => {
    const I = await or(), M = [];
    for (const Y of I) {
      const oe = await Xe(Y.id);
      oe && M.push(bi(oe, Y.icon));
    }
    l(M);
  }, []);
  J(() => {
    ne();
  }, [ne]);
  const pe = B(() => {
    const I = p.trim().toLowerCase(), Y = [...d.filter((oe) => {
      if (I) {
        const me = oe.name.toLowerCase().includes(I), Re = oe.tags.some((zt) => zt.toLowerCase().includes(I));
        if (!me && !Re) return !1;
      }
      return !(!(N && v.size === 0) && !v.has(oe.status) || h !== "all" && yi(oe.triggerBinding) !== h);
    })];
    return x === "name" ? Y.sort((oe, me) => oe.name.localeCompare(me.name)) : x === "created" ? Y.sort((oe, me) => me.createdAt.localeCompare(oe.createdAt)) : Y.sort((oe, me) => me.updatedAt.localeCompare(oe.updatedAt)), Y;
  }, [d, p, v, N, h, x]), O = B(() => pe.map((I) => I.id), [pe]), {
    selectionMode: G,
    selected: K,
    allVisibleSelected: F,
    selectAllRef: W,
    handleToggleSelect: ie,
    handleSelectAllFiltered: le,
    handleHeaderToggleAll: be,
    clearSelection: E,
    setSelectionMode: Z
  } = Wa({ visibleRows: pe, filteredIds: O }), ge = B(() => {
    const I = /* @__PURE__ */ new Set();
    for (const M of d)
      if (K.has(M.id))
        for (const Y of M.tags) I.add(Y);
    return Array.from(I).sort((M, Y) => M.localeCompare(Y));
  }, [d, K]), De = async (I) => {
    const M = await sr({ name: I, createdBy: n });
    y(!1), e(`/pipelines/${M.id}`);
  }, qe = () => {
    const I = ar(n);
    Qe(I).then(() => ne()), e(`/pipelines/${I.id}`);
  }, Pe = (I) => {
    const M = I.build(n);
    Qe(M), D(!1), e(`/pipelines/${M.id}`);
  }, Ae = (I) => e(`/pipelines/${I}`), Le = async (I) => {
    if (I.status !== "published") {
      r("Run requires published state", { type: "warning" });
      return;
    }
    if (!s)
      try {
        await o(I.id, {}) ? r(`Run started for "${I.name}"`, { type: "success" }) : r("Could not start run", { type: "error" });
      } catch (M) {
        r(`Run failed: ${M.message}`, { type: "error" });
      } finally {
        e(`/pipelines/${I.id}`);
      }
  }, Ee = (I) => {
    const M = Ot(I);
    M && (Qe(M).then(() => ne()), r(`Duplicated as "${M.name}"`, { type: "success" }));
  }, _e = (I) => {
    const M = $t(I.id);
    if (!M) {
      r("Export failed", { type: "error" });
      return;
    }
    pt(`${pn(I.name)}.pipeline.json`, M);
  }, ye = async () => {
    S && (await Kt(S), T(null), ne(), r("Pipeline deleted", { type: "success" }));
  }, se = S ? d.find((I) => I.id === S) : null, q = () => {
    const I = Array.from(K);
    I.length !== 0 && (I.forEach((M, Y) => {
      window.setTimeout(() => {
        const oe = d.find((Re) => Re.id === M), me = $t(M);
        !oe || !me || pt(`${pn(oe.name)}-${vi()}.pipeline.json`, me);
      }, Y * 100);
    }), r(`Exported ${I.length} pipeline${I.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, L = async (I) => {
    const M = Array.from(K);
    for (const Y of M) {
      const oe = await Xe(Y);
      if (!oe) continue;
      const me = oe.tags ?? [];
      me.includes(I) || (oe.tags = [...me, I], await Qe(oe));
    }
    Q(!1), ne(), r(`Added tag "${I}" to ${M.length} pipeline${M.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, z = async (I) => {
    const M = Array.from(K);
    for (const Y of M) {
      const oe = await Xe(Y);
      if (!oe) continue;
      const me = oe.tags ?? [];
      me.includes(I) && (oe.tags = me.filter((Re) => Re !== I), await Qe(oe));
    }
    ne(), r(`Removed tag "${I}" from ${M.length} pipeline${M.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, re = async () => {
    const I = Array.from(K);
    for (const M of I) await Kt(M);
    H(!1), E(), ne(), r(`Deleted ${I.length} pipeline${I.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, ue = async () => {
    const I = Array.from(K);
    if (I.length === 0) return;
    let M = 0, Y = 0;
    for (const oe of I) {
      const me = await Xe(oe);
      if (!me) continue;
      if (me.status === "published") {
        Y += 1;
        continue;
      }
      await ir(oe) && (M += 1);
    }
    ne(), Y > 0 ? r(
      `Published ${M}; skipped ${Y} already published`,
      { type: "success" }
    ) : r(
      `Published ${M} pipeline${M === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, Ie = async () => {
    const I = Array.from(K);
    if (I.length === 0) return;
    let M = 0, Y = 0;
    for (const me of I) {
      const Re = await Xe(me);
      if (!Re) continue;
      Re.status === "archived" ? (Re.status = "draft", Y += 1) : (Re.status = "archived", M += 1), await Qe(Re);
    }
    ne();
    const oe = [];
    M > 0 && oe.push(`Archived ${M}`), Y > 0 && oe.push(`Unarchived ${Y}`), r(oe.join(" · ") || "No pipelines changed", { type: "success" });
  }, Ne = async () => {
    const I = Array.from(K);
    if (I.length === 0) return;
    const M = [];
    for (const oe of I) {
      const me = await Xe(oe);
      me && M.push(me);
    }
    if (M.length === 0) {
      r("Export failed", { type: "error" });
      return;
    }
    const Y = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    pt(`pipelines-${Y}.json`, JSON.stringify(M, null, 2)), r(`Exported ${M.length} pipeline${M.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  };
  J(() => {
    const I = (M) => {
      const Y = M.target;
      if (Y) {
        const me = Y.tagName;
        if (me === "INPUT" || me === "TEXTAREA" || me === "SELECT" || Y.isContentEditable)
          return;
      }
      if (M.key === "Escape") {
        (K.size > 0 || G || V || de) && (Q(!1), ce(!1), E(), Z(!1));
        return;
      }
      if ((M.metaKey || M.ctrlKey) && (M.key === "a" || M.key === "A")) {
        G && (M.preventDefault(), le());
        return;
      }
      (M.key === "Delete" || M.key === "Backspace") && K.size > 0 && !$ && !S && !b && !k && (M.preventDefault(), H(!0));
    };
    return window.addEventListener("keydown", I), () => window.removeEventListener("keydown", I);
  }, [
    K,
    G,
    V,
    de,
    $,
    S,
    b,
    k,
    E,
    le,
    Z
  ]);
  const Fe = d.length > 0, xt = K.size > 0;
  return /* @__PURE__ */ a(
    "div",
    {
      "data-testid": "pipelines-page",
      className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-inherit",
      children: [
        /* @__PURE__ */ a(
          "div",
          {
            className: A(
              "h-14 shrink-0 flex items-center justify-between px-6",
              "border-b border-border bg-white",
              "sticky top-0 z-[2]"
            ),
            children: [
              /* @__PURE__ */ t("div", { className: "text-lg font-bold text-text-primary", children: "Pipelines" }),
              /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "metrics-btn",
                    onClick: () => e("/pipelines/metrics"),
                    className: A(
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
                    onClick: () => D(!0),
                    className: A(
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
                    onClick: () => y(!0),
                    className: A(
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
        Fe && /* @__PURE__ */ t(
          Ha,
          {
            search: p,
            onSearchChange: f,
            statusFilter: v,
            statusExplicit: N,
            onToggleStatusKey: C,
            triggerFilter: h,
            onTriggerFilterChange: m,
            sortKey: x,
            onSortKeyChange: g,
            allVisibleSelected: F,
            selectAllRef: W,
            onHeaderToggleAll: be
          }
        ),
        xt && /* @__PURE__ */ t(
          Ka,
          {
            count: K.size,
            onClear: E,
            onExport: q,
            onExportAsJSON: Ne,
            onPublish: ue,
            onArchive: Ie,
            onAddTag: () => {
              Q((I) => !I), ce(!1);
            },
            onRemoveTag: () => {
              ce((I) => !I), Q(!1);
            },
            onDelete: () => H(!0),
            onDeleteWithConfirm: () => H(!0),
            addTagOpen: V,
            removeTagOpen: de,
            onSubmitAddTag: L,
            onSubmitRemoveTag: z,
            onCloseAddTag: () => Q(!1),
            onCloseRemoveTag: () => ce(!1),
            unionTags: ge
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: A(
              "flex-1 overflow-y-auto overflow-x-hidden min-w-0",
              Fe ? "p-6" : "p-0"
            ),
            children: Fe ? pe.length === 0 ? /* @__PURE__ */ t(
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
                children: pe.map((I) => /* @__PURE__ */ t(
                  ja,
                  {
                    row: I,
                    onOpen: () => Ae(I.id),
                    onRun: () => {
                      Le(I);
                    },
                    onDuplicate: () => Ee(I.id),
                    onExport: () => _e(I),
                    onDelete: () => T(I.id),
                    selectionMode: G,
                    selected: K.has(I.id),
                    anySelected: xt,
                    onToggleSelect: (M) => ie(I.id, M)
                  },
                  I.id
                ))
              }
            ) : /* @__PURE__ */ a("div", { className: "flex flex-col h-full", children: [
              /* @__PURE__ */ t("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ t(
                Oe,
                {
                  icon: "🔀",
                  title: "No pipelines yet",
                  body: "Design your first one — from scratch or pick a template later.",
                  actionLabel: "+ New Pipeline",
                  onAction: () => y(!0)
                }
              ) }),
              /* @__PURE__ */ a("div", { className: "flex justify-center items-center gap-2.5 text-[13px] text-text-tertiary px-6 pb-8", children: [
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "empty-state-demo",
                    onClick: qe,
                    className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
                    children: "or try the demo pipeline"
                  }
                ),
                /* @__PURE__ */ t("span", { "aria-hidden": !0, children: "·" }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "empty-state-templates",
                    onClick: () => D(!0),
                    className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
                    children: "or browse templates"
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ t(
          Ni,
          {
            open: b,
            onClose: () => y(!1),
            onCreate: De
          }
        ),
        /* @__PURE__ */ t(
          xi,
          {
            open: k,
            onClose: () => D(!1),
            onSelect: Pe
          }
        ),
        /* @__PURE__ */ t(
          je,
          {
            open: !!S,
            onClose: () => T(null),
            title: "Delete pipeline?",
            maxWidth: 400,
            footer: /* @__PURE__ */ a(X, { children: [
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "delete-pipeline-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => T(null),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "delete-pipeline-confirm",
                  onClick: ye,
                  className: A(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-red-600 text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: "Delete"
                }
              )
            ] }),
            children: se && /* @__PURE__ */ a("p", { className: "m-0", children: [
              /* @__PURE__ */ a("strong", { children: [
                "“",
                se.name,
                "”"
              ] }),
              " will be permanently removed. Run history will also be lost."
            ] })
          }
        ),
        /* @__PURE__ */ t(
          je,
          {
            open: $,
            onClose: () => H(!1),
            title: `Delete ${K.size} pipeline${K.size === 1 ? "" : "s"}?`,
            maxWidth: 420,
            backdropTestId: "bulk-delete-modal",
            footer: /* @__PURE__ */ a(X, { children: [
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "bulk-delete-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => H(!1),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ a(
                "button",
                {
                  "data-testid": "bulk-delete-confirm",
                  onClick: re,
                  className: A(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-red-600 text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: [
                    "Delete ",
                    K.size
                  ]
                }
              )
            ] }),
            children: /* @__PURE__ */ a("p", { className: "m-0", children: [
              /* @__PURE__ */ a("strong", { children: [
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
const wi = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function Fn(e, n, r) {
  const o = wi[e], s = Math.max(0, n | 0), i = Math.max(0, r | 0);
  if (!o)
    return {
      inputTokens: s,
      outputTokens: i,
      inputCostUsd: 0,
      outputCostUsd: 0,
      totalCostUsd: 0,
      model: e,
      modelFound: !1
    };
  const c = s / 1e6 * o.inputPerMillion, d = i / 1e6 * o.outputPerMillion;
  return {
    inputTokens: s,
    outputTokens: i,
    inputCostUsd: c,
    outputCostUsd: d,
    totalCostUsd: c + d,
    model: e,
    modelFound: !0
  };
}
function at(e) {
  const n = {};
  let r = 0, o = 0, s = 0, i = 0, c = !1;
  for (const l of e) {
    if (!l.model) continue;
    const p = l.tokensIn ?? 0, f = l.tokensOut ?? 0, h = Fn(l.model, p, f), m = n[l.model];
    m ? n[l.model] = {
      inputTokens: m.inputTokens + h.inputTokens,
      outputTokens: m.outputTokens + h.outputTokens,
      inputCostUsd: m.inputCostUsd + h.inputCostUsd,
      outputCostUsd: m.outputCostUsd + h.outputCostUsd,
      totalCostUsd: m.totalCostUsd + h.totalCostUsd,
      model: l.model,
      modelFound: m.modelFound || h.modelFound
    } : n[l.model] = h, r += h.inputTokens, o += h.outputTokens, s += h.inputCostUsd, i += h.outputCostUsd, h.modelFound && (c = !0);
  }
  return { total: {
    inputTokens: r,
    outputTokens: o,
    inputCostUsd: s,
    outputCostUsd: i,
    totalCostUsd: s + i,
    model: "aggregate",
    modelFound: c
  }, perModel: n };
}
function ht(e) {
  return !e || !e.modelFound && e.totalCostUsd === 0 ? "—" : e.totalCostUsd >= 0.01 ? `$${e.totalCostUsd.toFixed(2)}` : e.totalCostUsd === 0 ? "$0.00" : `$${e.totalCostUsd.toFixed(4)}`;
}
function ki(e) {
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
function jn(e, n) {
  let r = 0;
  if (e.llm) {
    const s = n.get(e.nodeId);
    s && (r += Fn(s, e.llm.tokensIn, e.llm.tokensOut).totalCostUsd);
  }
  const o = e.costUsd;
  return typeof o == "number" && Number.isFinite(o) && o > 0 && (r += o), r;
}
function Ci(e, n) {
  if (!n) return [];
  const r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    l.data.type === "llm" && r.set(l.id, l.data.model), o.set(l.id, ki(l)), s.set(l.id, l.data.type);
  const i = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    i.set(l.id, 0), c.set(l.id, 0);
  for (const l of e)
    for (const p of Object.values(l.steps ?? {})) {
      if (!o.has(p.nodeId)) continue;
      const f = jn(p, r);
      i.set(p.nodeId, (i.get(p.nodeId) ?? 0) + f), c.set(p.nodeId, (c.get(p.nodeId) ?? 0) + 1);
    }
  const d = n.nodes.map((l) => ({
    nodeId: l.id,
    label: o.get(l.id) ?? l.id,
    type: s.get(l.id) ?? l.type,
    totalCostUsd: i.get(l.id) ?? 0,
    stepCount: c.get(l.id) ?? 0
  }));
  return d.sort((l, p) => p.totalCostUsd - l.totalCostUsd), d;
}
function Ii(e) {
  return e.slice(0, 10);
}
function Si(e) {
  return Date.UTC(
    Number(e.slice(0, 4)),
    Number(e.slice(5, 7)) - 1,
    Number(e.slice(8, 10))
  );
}
function Ti(e, n, r = 30, o = /* @__PURE__ */ new Date()) {
  const s = /* @__PURE__ */ new Map();
  if (n)
    for (const f of n.nodes)
      f.data.type === "llm" && s.set(f.id, f.data.model);
  const i = Date.UTC(
    o.getUTCFullYear(),
    o.getUTCMonth(),
    o.getUTCDate()
  ), c = i - (r - 1) * 864e5, d = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  for (let f = c; f <= i; f += 864e5) {
    const h = new Date(f).toISOString().slice(0, 10);
    d.set(h, 0), l.set(h, 0);
  }
  for (const f of e) {
    const h = Ii(f.startedAt);
    if (!d.has(h)) continue;
    let m = 0;
    for (const x of Object.values(f.steps ?? {}))
      m += jn(x, s);
    d.set(h, (d.get(h) ?? 0) + m), l.set(h, (l.get(h) ?? 0) + 1);
  }
  const p = [];
  for (let f = c; f <= i; f += 864e5) {
    const h = new Date(f).toISOString().slice(0, 10);
    p.push({
      date: h,
      ts: Si(h),
      totalCostUsd: d.get(h) ?? 0,
      runCount: l.get(h) ?? 0
    });
  }
  return p;
}
const qn = [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
], zn = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], Hn = ["24h", "7d", "30d", "all"], Ai = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function Di(e) {
  return e.startsWith("document.") || e === "document" ? "document" : e === "schedule" || e === "scheduled" ? "scheduled" : e === "webhook" ? "webhook" : "manual";
}
function Ri(e) {
  let n = 0;
  for (const r of Object.values(e.steps ?? {})) {
    const o = r.attempts?.length ?? 0;
    o > 1 && (n += o - 1);
  }
  return n;
}
function Kn(e, n) {
  const r = n.now ?? Date.now(), o = n.range === "all" ? null : r - Ai[n.range], s = n.query.trim().toLowerCase();
  return e.filter((i) => {
    if (n.statuses.size > 0 && !n.statuses.has(i.status)) return !1;
    if (n.triggerKinds.size > 0) {
      const c = Di(i.triggeredBy.triggerType);
      if (!n.triggerKinds.has(c)) return !1;
    }
    if (o != null) {
      const c = new Date(i.startedAt).getTime();
      if (Number.isFinite(c) && c < o) return !1;
    }
    if (s.length > 0) {
      const c = i.id.toLowerCase().includes(s), d = i.pipelineId.toLowerCase().includes(s);
      if (!c && !d) return !1;
    }
    return !0;
  });
}
function un(e, n) {
  if (!e) return /* @__PURE__ */ new Set();
  const r = new Set(n);
  return new Set(
    e.split(",").map((o) => o.trim()).filter((o) => r.has(o))
  );
}
function Wn(e) {
  const n = e.get("range") ?? "7d", r = Hn.includes(n) ? n : "7d";
  return {
    query: e.get("q") ?? "",
    statuses: un(e.get("status"), qn),
    triggerKinds: un(e.get("trigger"), zn),
    range: r
  };
}
const $i = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, Mi = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, Pi = {
  "24h": "Last 24h",
  "7d": "Last 7d",
  "30d": "Last 30d",
  all: "All time"
};
function mn({
  label: e,
  options: n,
  selected: r,
  onToggle: o,
  labels: s,
  testIdPrefix: i
}) {
  const [c, d] = R(!1), l = ae(null);
  tt(l, () => d(!1), c);
  const p = r.size === 0 ? "All" : r.size <= 2 ? Array.from(r).map((f) => s[f]).join(", ") : `${r.size} selected`;
  return /* @__PURE__ */ a("div", { ref: l, className: "relative", children: [
    /* @__PURE__ */ a(
      "button",
      {
        type: "button",
        onClick: () => d(!c),
        "data-testid": `${i}-dropdown`,
        className: A(
          "flex items-center gap-1.5 px-2.5 py-[5px] text-xs font-medium rounded cursor-pointer font-[inherit] whitespace-nowrap bg-surface text-text-secondary border",
          r.size > 0 ? "border-primary" : "border-border"
        ),
        children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary font-semibold text-[11px]", children: e }),
          /* @__PURE__ */ t(
            "span",
            {
              className: A(
                r.size > 0 ? "text-primary font-semibold" : "text-text-secondary font-medium"
              ),
              children: p
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-[9px] ml-0.5 opacity-60", children: "▾" })
        ]
      }
    ),
    c && /* @__PURE__ */ t(
      "div",
      {
        className: "absolute top-full left-0 mt-1 bg-white border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] py-1",
        children: n.map((f) => /* @__PURE__ */ a(
          "label",
          {
            "data-testid": `${i}-${f}`,
            className: "flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer text-text-primary hover:bg-[#f1f5f9]",
            children: [
              /* @__PURE__ */ t(
                "input",
                {
                  type: "checkbox",
                  checked: r.has(f),
                  onChange: () => o(f),
                  className: "m-0 accent-primary"
                }
              ),
              s[f]
            ]
          },
          f
        ))
      }
    )
  ] });
}
function Vn({
  query: e,
  statuses: n,
  triggerKinds: r,
  range: o,
  onQueryChange: s,
  onStatusToggle: i,
  onTriggerToggle: c,
  onRangeChange: d,
  onClearFilters: l
}) {
  const p = n.size > 0 || r.size > 0 || e.length > 0;
  return /* @__PURE__ */ a(
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
            onChange: (f) => s(f.target.value),
            className: "flex-[1_1_180px] max-w-[240px] px-2.5 py-[5px] text-xs border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
            "aria-label": "Search runs by run id or pipeline id"
          }
        ),
        /* @__PURE__ */ t("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: Hn.map((f) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": o === f,
            "data-testid": `runs-range-${f}`,
            onClick: () => d(f),
            className: A(
              "px-2 py-1 text-[11px] border-none rounded-[3px] cursor-pointer font-[inherit]",
              o === f ? "font-semibold bg-primary text-white" : "font-medium bg-transparent text-text-secondary"
            ),
            children: Pi[f]
          },
          f
        )) }),
        /* @__PURE__ */ t("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ t(
          mn,
          {
            label: "Status",
            options: qn,
            selected: n,
            onToggle: i,
            labels: $i,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ t(
          mn,
          {
            label: "Trigger",
            options: zn,
            selected: r,
            onToggle: c,
            labels: Mi,
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
function Ei({
  selectionCount: e,
  onExport: n,
  onDelete: r,
  onClear: o
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-testid": "runs-bulk-toolbar",
      className: "flex items-center gap-2 px-3 py-2 bg-[#fafbfc] border border-border rounded-md",
      children: [
        /* @__PURE__ */ a("span", { className: "text-xs text-text-secondary", children: [
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
            onClick: o,
            className: "px-2.5 py-1 text-xs bg-none border-none text-text-secondary cursor-pointer font-[inherit] ml-auto",
            children: "Clear selection"
          }
        )
      ]
    }
  );
}
function qt(e) {
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
function Oi(e) {
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
const Li = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function _i(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Ui({
  filtered: e,
  selected: n,
  onSelectionChange: r,
  comparePair: o,
  onToggleComparePair: s,
  costByRunId: i,
  pipelineId: c,
  onNavigate: d,
  onOpenRetryModal: l
}) {
  const p = ae(!1), f = ae(null), h = e.length > 0 && e.every((u) => n.has(u.id)), m = !h && e.some((u) => n.has(u.id)), x = () => {
    const u = new Set(n);
    if (h)
      for (const v of e) u.delete(v.id);
    else
      for (const v of e) u.add(v.id);
    r(u);
  }, g = (u, v, N) => {
    const w = new Set(n), C = !w.has(u);
    if (N && f.current != null) {
      const b = Math.min(f.current, v), y = Math.max(f.current, v);
      for (let k = b; k <= y; k++) {
        const D = e[k];
        D && (C ? w.add(D.id) : w.delete(D.id));
      }
    } else C ? w.add(u) : w.delete(u);
    f.current = v, r(w);
  };
  return /* @__PURE__ */ a(
    "table",
    {
      className: "w-full border-collapse text-[13px] bg-surface border border-border rounded-lg overflow-hidden",
      children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ a("tr", { className: "bg-[#fafbfc] text-left", children: [
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
                  checked: h,
                  ref: (u) => {
                    u && (u.indeterminate = m);
                  },
                  onChange: x
                }
              )
            }
          ),
          ["Started", "Status", "Duration", "Retries", "Cost", "Triggered by", "Run ID", ""].map((u, v) => /* @__PURE__ */ t(
            "th",
            {
              scope: "col",
              className: "px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
              children: u
            },
            `${u}-${v}`
          ))
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: e.map((u, v) => {
          const { tone: N, label: w } = qt(u.status), C = n.has(u.id), b = Ri(u);
          return /* @__PURE__ */ a(
            "tr",
            {
              "data-testid": `run-card-${u.id}`,
              className: A(
                "border-b border-border cursor-pointer hover:bg-[#f1f5f9]",
                C && "bg-[#f1f5f9]"
              ),
              onClick: () => d(`/pipelines/${c}/runs/${u.id}`),
              children: [
                /* @__PURE__ */ a("td", { className: "px-3 py-2.5 text-xs text-text-secondary w-6", onClick: (y) => y.stopPropagation(), children: [
                  /* @__PURE__ */ t(
                    "input",
                    {
                      type: "checkbox",
                      "data-testid": `run-select-${u.id}`,
                      checked: C,
                      onMouseDown: (y) => {
                        p.current = y.shiftKey;
                      },
                      onKeyDown: (y) => {
                        p.current = y.shiftKey;
                      },
                      onChange: () => {
                        const y = p.current;
                        p.current = !1, g(u.id, v, y);
                      },
                      "aria-label": `Select run ${u.id.slice(0, 8)}`
                    }
                  ),
                  /* @__PURE__ */ t(
                    "input",
                    {
                      type: "checkbox",
                      "data-testid": `run-compare-pick-${u.id}`,
                      checked: o.includes(u.id),
                      onChange: () => s(u.id),
                      "aria-label": `Pick run ${u.id.slice(0, 8)} for comparison`,
                      className: "absolute w-px h-px opacity-0 pointer-events-none",
                      tabIndex: -1
                    }
                  )
                ] }),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: _i(u.startedAt) }),
                /* @__PURE__ */ a("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: [
                  /* @__PURE__ */ t(xe, { tone: N, "aria-label": `Status: ${w}`, children: w }),
                  u.status === "running" && u.stuckAt && /* @__PURE__ */ t(
                    xe,
                    {
                      tone: "warning",
                      size: "xs",
                      "data-testid": `run-stuck-badge-${u.id}`,
                      title: `No pipeline events since ${new Date(u.stuckAt).toLocaleTimeString()}`,
                      className: "ml-1.5",
                      children: "Stuck"
                    }
                  ),
                  u.status === "failed" && u.error?.errorCategory && /* @__PURE__ */ t(
                    xe,
                    {
                      tone: Oi(u.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${u.id}`,
                      title: u.error.message,
                      className: "ml-1.5",
                      children: Li[u.error.errorCategory] ?? u.error.errorCategory
                    }
                  )
                ] }),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: ve(u.durationMs) }),
                /* @__PURE__ */ t(
                  "td",
                  {
                    className: A(
                      "px-3 py-2.5 text-xs font-mono",
                      b > 0 ? "text-text-primary" : "text-text-tertiary"
                    ),
                    "data-testid": `run-retries-${u.id}`,
                    title: b > 0 ? `${b} retry attempts across this run` : "No retries — every step succeeded on first attempt",
                    children: b > 0 ? `×${b}` : "—"
                  }
                ),
                /* @__PURE__ */ t(
                  "td",
                  {
                    className: "px-3 py-2.5 text-xs text-text-secondary font-mono",
                    "data-testid": `run-cost-${u.id}`,
                    children: i[u.id] ?? "—"
                  }
                ),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: u.triggeredBy.userId ?? u.triggeredBy.triggerType }),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-[11px] font-mono text-text-tertiary", children: u.id.slice(0, 8) }),
                /* @__PURE__ */ a("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right", onClick: (y) => y.stopPropagation(), children: [
                  u.status === "running" && u.stuckAt && /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      "data-testid": `force-fail-${u.id}`,
                      onClick: async (y) => {
                        if (y.stopPropagation(), !!confirm(`Force-fail stuck run ${u.id.slice(0, 8)}? The run will be interrupted and you can retry from the stuck step.`))
                          try {
                            await lr(u.pipelineId, u.id);
                          } catch (k) {
                            alert(`Force-fail failed: ${k instanceof Error ? k.message : String(k)}`);
                          }
                      },
                      title: "Force-fail this stuck run so you can retry from the stuck step",
                      className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-[#b45309] border border-[#fde68a] rounded cursor-pointer font-[inherit]",
                      children: "⚡ Force-fail"
                    }
                  ),
                  u.status === "failed" && u.error?.nodeId && u.error.nodeId !== "unknown" && /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      "data-testid": `retry-from-failed-step-${u.id}`,
                      onClick: (y) => {
                        y.stopPropagation(), l(u);
                      },
                      title: `Retry from "${u.error.nodeId}" with the original upstream context`,
                      className: "text-[11px] px-2 py-1 mr-2 bg-transparent text-[#ea580c] border border-[#fed7aa] rounded cursor-pointer font-[inherit]",
                      children: "↻ Retry from failed"
                    }
                  ),
                  /* @__PURE__ */ t("span", { className: "text-xs text-primary", children: "View →" })
                ] })
              ]
            },
            u.id
          );
        }) })
      ]
    }
  );
}
function bd() {
  const { pipelineId: e } = nt(), n = Me(), [r, o] = wt(), [s, i] = R([]), [c, d] = R(null), [l, p] = R([]), [f, h] = R(() => /* @__PURE__ */ new Set()), [m, x] = R(null), [g, u] = R(!1), [v, N] = R(null), [w, C] = R(!1), b = P((F) => {
    const W = F.error?.nodeId;
    if (!W || W === "unknown") return;
    const ie = Object.entries(F.steps).filter(([le, be]) => le !== W && be.status === "completed").map(([le]) => le);
    x({ run: F, nodeId: W, skippedNodes: ie, snapshotInput: !1 }), N(null);
  }, []), y = P(async () => {
    if (m) {
      N(null), u(!0);
      try {
        const F = await Pn(
          m.run.pipelineId,
          m.run.id,
          m.nodeId,
          void 0,
          m.snapshotInput || void 0
        );
        x(null), n(`/pipelines/${m.run.pipelineId}/runs/${F.newRunId}`);
      } catch (F) {
        N(F instanceof Error ? F.message : String(F)), u(!1);
      }
    }
  }, [m, n]), { query: k, statuses: D, triggerKinds: S, range: T } = B(
    () => Wn(r),
    [r]
  ), $ = (F, W) => {
    const ie = new URLSearchParams(r);
    W ? ie.set(F, W) : ie.delete(F), o(ie, { replace: !0 });
  }, H = (F) => {
    const W = new Set(D);
    W.has(F) ? W.delete(F) : W.add(F), $("status", W.size === 0 ? null : Array.from(W).join(","));
  }, V = (F) => {
    const W = new Set(S);
    W.has(F) ? W.delete(F) : W.add(F), $("trigger", W.size === 0 ? null : Array.from(W).join(","));
  }, Q = (F) => {
    $("range", F === "7d" ? null : F);
  }, de = (F) => {
    $("q", F.length === 0 ? null : F);
  }, ce = (F) => {
    p((W) => W.includes(F) ? W.filter((ie) => ie !== F) : W.length >= 2 ? [W[1], F] : [...W, F]);
  };
  J(() => {
    e && (d(Ye(e)), i(yt(e)));
  }, [e]);
  const ne = B(
    () => Kn(s, { query: k, statuses: D, triggerKinds: S, range: T }),
    [s, k, D, S, T]
  ), pe = B(() => {
    const F = /* @__PURE__ */ new Map();
    if (!c) return F;
    for (const W of c.nodes)
      W.data.type === "llm" && F.set(W.id, W.data.model);
    return F;
  }, [c]), O = B(() => {
    const F = {};
    for (const W of ne) {
      const ie = Object.values(W.steps).filter((le) => !!le.llm).map((le) => ({
        model: pe.get(le.nodeId),
        tokensIn: le.llm?.tokensIn ?? 0,
        tokensOut: le.llm?.tokensOut ?? 0
      }));
      F[W.id] = ht(at(ie).total);
    }
    return F;
  }, [ne, pe]), G = () => {
    if (!e) return;
    C(!1);
    const F = Array.from(f), W = s.filter((ie) => !f.has(ie.id));
    Mn(e);
    for (const ie of [...W].sort((le, be) => le.startedAt.localeCompare(be.startedAt)))
      dr(e, ie);
    i(yt(e)), h(/* @__PURE__ */ new Set()), p((ie) => ie.filter((le) => !F.includes(le)));
  }, K = () => {
    const F = s.filter((E) => f.has(E.id));
    if (F.length === 0) return;
    const W = new Blob([JSON.stringify(F, null, 2)], { type: "application/json" }), ie = URL.createObjectURL(W), le = document.createElement("a"), be = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    le.href = ie, le.download = `pipeline-runs-${be}.json`, document.body.appendChild(le), le.click(), document.body.removeChild(le), URL.revokeObjectURL(ie);
  };
  return e ? c ? /* @__PURE__ */ a("div", { "data-testid": "pipeline-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ t(
      Mt,
      {
        open: m !== null,
        onConfirm: y,
        onCancel: () => {
          g || x(null);
        },
        title: "Retry from failure",
        confirmLabel: g ? "Starting…" : "Confirm retry",
        confirmDisabled: g,
        children: m && /* @__PURE__ */ a("div", { className: "flex flex-col gap-2.5", children: [
          /* @__PURE__ */ a("div", { className: "text-[13px] text-text-secondary", children: [
            "Run ",
            /* @__PURE__ */ t("code", { className: "bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs", children: m.run.id.slice(0, 8) }),
            " will restart from step",
            " ",
            /* @__PURE__ */ a("code", { className: "bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs", children: [
              m.nodeId.slice(0, 12),
              m.nodeId.length > 12 ? "…" : ""
            ] }),
            " ",
            "using the original upstream context."
          ] }),
          m.skippedNodes.length > 0 && /* @__PURE__ */ a("div", { children: [
            /* @__PURE__ */ a("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5", children: [
              "Steps skipped (",
              m.skippedNodes.length,
              ")"
            ] }),
            /* @__PURE__ */ t("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: m.skippedNodes.map((F) => /* @__PURE__ */ t("span", { className: "bg-[#fafbfc] border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary", children: F.slice(0, 10) }, F)) })
          ] }),
          /* @__PURE__ */ a("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
            /* @__PURE__ */ t("input", { type: "checkbox", checked: m.snapshotInput, onChange: (F) => x((W) => W && { ...W, snapshotInput: F.target.checked }), className: "accent-primary" }),
            "Use persisted input snapshot"
          ] }),
          v && /* @__PURE__ */ t("div", { "data-testid": "retry-modal-error", className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: v })
        ] })
      }
    ),
    /* @__PURE__ */ t(
      Mt,
      {
        open: w,
        onConfirm: G,
        onCancel: () => C(!1),
        title: `Delete ${f.size} run${f.size === 1 ? "" : "s"}?`,
        body: "This cannot be undone.",
        confirmLabel: `Delete ${f.size}`,
        tone: "destructive"
      }
    ),
    v && /* @__PURE__ */ t(Ze, { title: "Retry failed:", onDismiss: () => N(null), children: v }),
    /* @__PURE__ */ a("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          onClick: () => n(`/pipelines/${e}`),
          className: "bg-none border-none text-primary cursor-pointer text-[13px] p-0",
          children: [
            "← ",
            c.name
          ]
        }
      ),
      /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "/" }),
      /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: "Run history" }),
      /* @__PURE__ */ a("span", { className: "text-xs text-text-tertiary ml-auto", children: [
        s.length,
        " run",
        s.length === 1 ? "" : "s",
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
      /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          disabled: l.length !== 2,
          onClick: () => {
            if (l.length !== 2) return;
            const [F, W] = l;
            n(`/pipelines/${e}/runs/compare/${F}/${W}`);
          },
          "data-testid": "run-compare-btn",
          className: A(
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
      Vn,
      {
        query: k,
        statuses: D,
        triggerKinds: S,
        range: T,
        onQueryChange: de,
        onStatusToggle: H,
        onTriggerToggle: V,
        onRangeChange: Q,
        onClearFilters: () => {
          de(""), $("status", null), $("trigger", null);
        }
      }
    ),
    f.size > 0 && /* @__PURE__ */ t(
      Ei,
      {
        selectionCount: f.size,
        onExport: K,
        onDelete: () => {
          f.size > 0 && e && C(!0);
        },
        onClear: () => h(/* @__PURE__ */ new Set())
      }
    ),
    ne.length === 0 ? /* @__PURE__ */ t(
      Oe,
      {
        icon: "📜",
        title: s.length === 0 ? "No runs yet" : "No runs match these filters",
        body: s.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
      }
    ) : /* @__PURE__ */ t(
      Ui,
      {
        filtered: ne,
        selected: f,
        onSelectionChange: h,
        comparePair: l,
        onToggleComparePair: ce,
        costByRunId: O,
        pipelineId: e,
        onNavigate: n,
        onOpenRetryModal: b
      }
    )
  ] }) : /* @__PURE__ */ t("div", { className: "p-8", children: /* @__PURE__ */ t(
    Oe,
    {
      icon: "🔍",
      title: "Pipeline not found",
      body: "It may have been deleted. Go back to the pipelines list.",
      actionLabel: "Back to pipelines",
      onAction: () => n("/pipelines")
    }
  ) }) : /* @__PURE__ */ t(rt, { to: "/pipelines", replace: !0 });
}
function Bi(e) {
  return B(() => {
    if (!e) return null;
    const n = Ye(e.pipelineId);
    if (!n) return null;
    const r = /* @__PURE__ */ new Map();
    for (const s of n.nodes)
      s.data.type === "llm" && r.set(s.id, s.data.model);
    const o = Object.values(e.steps).filter((s) => !!s.llm).map((s) => ({
      model: r.get(s.nodeId),
      tokensIn: s.llm?.tokensIn ?? 0,
      tokensOut: s.llm?.tokensOut ?? 0
    }));
    return at(o).total;
  }, [e]);
}
function Ke({ title: e, children: n }) {
  return /* @__PURE__ */ a("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ t("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: e }),
    n
  ] });
}
const fn = "m-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", hn = "px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", Rt = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", Se = "px-2 py-[5px] text-[11px] text-text-secondary align-top", Fi = {
  "#2563eb": "bg-blue-600/10 text-blue-600",
  "#7c3aed": "bg-violet-600/10 text-violet-600",
  "#16a34a": "bg-green-600/10 text-green-600",
  "#dc2626": "bg-red-600/10 text-red-600"
};
function dt(e) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${Fi[e] ?? ""}`.trimEnd();
}
const ji = {
  completed: "#16a34a",
  failed: "#dc2626",
  running: "#2563eb"
};
function qi({ stepId: e, step: n, index: r, nodeType: o, nodeConfig: s, onRetryFromStep: i, onResumeFromStep: c }) {
  const [d, l] = R(!1), p = n.output, f = p?.response, h = n.llm, m = n.input, x = ji[n.status] ?? "#94a3b8";
  return /* @__PURE__ */ a("div", { className: "relative pl-9 mb-1", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: "absolute left-[10px] top-[14px] w-3 h-3 rounded-full border-2 border-white z-[1] shadow-[0_0_0_1px_#e2e8f0]",
        style: { background: x }
      }
    ),
    /* @__PURE__ */ a(
      "div",
      {
        onClick: () => l(!d),
        "aria-expanded": d,
        role: "button",
        tabIndex: 0,
        onKeyDown: (g) => {
          (g.key === "Enter" || g.key === " ") && (g.preventDefault(), l(!d));
        },
        className: A(
          "flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer transition-colors duration-100",
          d ? "bg-[#fafbfc] rounded-t-lg" : "bg-surface rounded-lg"
        ),
        style: {
          border: `1px solid ${d ? x + "40" : "#e2e8f0"}`,
          ...d ? { borderRadius: "8px 8px 0 0" } : {}
        },
        children: [
          /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": "true",
              className: A(
                "text-[10px] text-text-tertiary shrink-0 transition-transform duration-150",
                d && "rotate-90"
              ),
              children: "▶"
            }
          ),
          /* @__PURE__ */ t(
            "span",
            {
              "aria-label": `Status: ${n.status}`,
              className: "text-[10px] font-bold text-white px-1.5 py-0.5 rounded-[3px] uppercase shrink-0",
              style: { background: x },
              children: n.status
            }
          ),
          /* @__PURE__ */ a("span", { className: "text-[13px] font-semibold text-text-primary", children: [
            r + 1,
            ". ",
            o
          ] }),
          /* @__PURE__ */ t("span", { className: "text-[11px] font-mono text-text-tertiary", children: e.slice(0, 8) }),
          n.durationMs != null && /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary ml-auto", children: n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` }),
          h && /* @__PURE__ */ a("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
            h.tokensIn + h.tokensOut,
            " tok"
          ] }),
          p?.tokensIn != null && !h && /* @__PURE__ */ a("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
            Number(p.tokensIn) + Number(p.tokensOut),
            " tok"
          ] })
        ]
      }
    ),
    d && /* @__PURE__ */ a(
      "div",
      {
        className: "border-t-0 rounded-b-lg bg-surface overflow-hidden",
        style: { border: `1px solid ${x}40` },
        children: [
          /* @__PURE__ */ t(Ke, { title: "Execution Timeline", children: /* @__PURE__ */ a("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ a("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ t("th", { scope: "col", className: Rt, children: "Event" }),
              /* @__PURE__ */ t("th", { scope: "col", className: Rt, children: "Time" }),
              /* @__PURE__ */ t("th", { scope: "col", className: Rt, children: "Detail" })
            ] }) }),
            /* @__PURE__ */ a("tbody", { children: [
              n.startedAt && /* @__PURE__ */ a("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#2563eb"), children: "started" }) }),
                /* @__PURE__ */ t("td", { className: Se, children: new Date(n.startedAt).toLocaleTimeString() }),
                /* @__PURE__ */ a("td", { className: Se, children: [
                  "Node ",
                  e.slice(0, 8),
                  " (",
                  o,
                  ") began execution"
                ] })
              ] }),
              h?.streamOpened && /* @__PURE__ */ a("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#7c3aed"), children: "stream.opened" }) }),
                /* @__PURE__ */ t("td", { className: Se, children: "—" }),
                /* @__PURE__ */ t("td", { className: Se, children: "LLM stream connection established" })
              ] }),
              h?.firstTokenLatencyMs != null && /* @__PURE__ */ a("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#7c3aed"), children: "first.token" }) }),
                /* @__PURE__ */ a("td", { className: Se, children: [
                  "+",
                  h.firstTokenLatencyMs,
                  "ms"
                ] }),
                /* @__PURE__ */ t("td", { className: Se, children: "First token received from LLM" })
              ] }),
              n.completedAt && n.status === "completed" && /* @__PURE__ */ a("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#16a34a"), children: "completed" }) }),
                /* @__PURE__ */ t("td", { className: Se, children: new Date(n.completedAt).toLocaleTimeString() }),
                /* @__PURE__ */ a("td", { className: Se, children: [
                  "Finished in ",
                  n.durationMs != null ? n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` : "—"
                ] })
              ] }),
              n.status === "failed" && /* @__PURE__ */ a("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#dc2626"), children: "failed" }) }),
                /* @__PURE__ */ t("td", { className: Se, children: n.completedAt ? new Date(n.completedAt).toLocaleTimeString() : "—" }),
                /* @__PURE__ */ t("td", { className: Se, children: n.error ?? "Unknown error" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ t(Ke, { title: "Node Configuration", children: s && Object.keys(s).length > 1 ? /* @__PURE__ */ t("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(s).filter(([g]) => g !== "type").map(([g, u]) => /* @__PURE__ */ a(Dn.Fragment, { children: [
            /* @__PURE__ */ t("span", { className: "text-text-tertiary font-medium", children: g }),
            /* @__PURE__ */ t(
              "span",
              {
                className: A(
                  "text-text-secondary break-words",
                  typeof u == "string" && u.length > 60 ? "whitespace-pre-wrap font-sans" : "whitespace-nowrap font-mono"
                ),
                children: typeof u == "string" ? u : JSON.stringify(u)
              }
            )
          ] }, g)) }) : /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary italic", children: "No configuration" }) }),
          m && Object.keys(m).length > 0 && /* @__PURE__ */ t(Ke, { title: "Runtime Input", children: /* @__PURE__ */ t("pre", { className: fn, children: JSON.stringify(m, null, 2) }) }),
          h?.prompt && /* @__PURE__ */ t(Ke, { title: "Resolved Prompt", children: /* @__PURE__ */ t("div", { className: hn, children: h.prompt }) }),
          f || h?.response ? /* @__PURE__ */ t(Ke, { title: "Response", children: /* @__PURE__ */ t("div", { className: hn, children: f ?? h?.response }) }) : /* @__PURE__ */ t(Ke, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ t("pre", { className: fn, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
          (h || p?.tokensIn != null) && /* @__PURE__ */ t(Ke, { title: "Token Usage", children: /* @__PURE__ */ a("div", { className: "flex gap-5 flex-wrap text-xs text-text-secondary", children: [
            /* @__PURE__ */ a("span", { children: [
              "Tokens in: ",
              /* @__PURE__ */ t("strong", { children: String(h?.tokensIn ?? p?.tokensIn ?? "—") })
            ] }),
            /* @__PURE__ */ a("span", { children: [
              "Tokens out: ",
              /* @__PURE__ */ t("strong", { children: String(h?.tokensOut ?? p?.tokensOut ?? "—") })
            ] }),
            h?.firstTokenLatencyMs != null && /* @__PURE__ */ a("span", { children: [
              "First token: ",
              /* @__PURE__ */ a("strong", { children: [
                h.firstTokenLatencyMs,
                "ms"
              ] })
            ] })
          ] }) }),
          n.error && /* @__PURE__ */ t(Ke, { title: "Error", children: /* @__PURE__ */ t("div", { className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap", children: n.error }) }),
          (i || c) && /* @__PURE__ */ a("div", { className: "px-4 py-2.5 border-t border-border flex justify-end gap-2", children: [
            c && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                "data-testid": `resume-from-step-${e}`,
                onClick: (g) => {
                  g.stopPropagation(), c(e);
                },
                title: "Resume the same run from this step (preserves accumulated context)",
                className: "px-3 py-[5px] text-xs font-medium border border-primary bg-primary text-white rounded cursor-pointer font-[inherit]",
                children: "↻ Resume from here"
              }
            ),
            i && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                "data-testid": `retry-from-step-${e}`,
                onClick: (g) => {
                  g.stopPropagation(), i(e);
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
function zi({ steps: e, nodeDataMap: n, edges: r, onRetryFromStep: o, onResumeFromStep: s }) {
  const i = B(() => {
    const l = Object.entries(e).sort(([, b], [, y]) => {
      const k = b.completedAt ? Date.parse(b.completedAt) - (b.durationMs ?? 0) : 0, D = y.completedAt ? Date.parse(y.completedAt) - (y.durationMs ?? 0) : 0;
      return k - D;
    });
    if (!r || r.length === 0)
      return l.map(([b, y]) => ({
        stepId: b,
        step: y,
        children: []
      }));
    const p = (b) => {
      const y = b.lastIndexOf(":");
      if (y > 0) {
        const k = b.slice(y + 1);
        if (/^\d+$/.test(k)) return b.slice(0, y);
      }
      return b;
    }, f = /* @__PURE__ */ new Set(["fork", "condition", "approval"]), h = /* @__PURE__ */ new Set();
    for (const [b] of l) {
      const y = p(b), k = n[y]?.type;
      k && f.has(k) && h.add(y);
    }
    const m = (b) => b.startsWith("branch-") || b === "true" || b === "false" || b === "approved" || b === "rejected", x = [];
    for (const b of r)
      h.has(b.source) && m(b.sourceHandle) && x.push({ forkId: b.source, branch: b.sourceHandle, targetNodeId: b.target });
    const g = /* @__PURE__ */ new Map();
    for (const b of r)
      g.has(b.source) || g.set(b.source, []), g.get(b.source).push({ target: b.target, handle: b.sourceHandle });
    const u = /* @__PURE__ */ new Set();
    function v(b) {
      const y = [];
      let k = b;
      for (; k; ) {
        const D = l.find(([Q]) => p(Q) === k && !u.has(Q));
        if (!D) break;
        const [S, T] = D;
        u.add(S);
        const $ = { stepId: S, step: T, children: [] }, H = p(S);
        if (h.has(H)) {
          const Q = x.filter((de) => de.forkId === H);
          for (const { branch: de, targetNodeId: ce } of Q) {
            const ne = v(ce);
            for (const pe of ne)
              pe.branch = pe.branch ?? de;
            ne.length > 0 && (ne[0].branch = de, $.children.push(...ne));
          }
        }
        y.push($);
        const V = g.get(H)?.filter((Q) => Q.handle === "out");
        k = V && V.length === 1 ? V[0].target : null;
      }
      return y;
    }
    const N = /* @__PURE__ */ new Set();
    for (const b of r)
      N.add(b.target);
    const w = l.find(([b]) => !N.has(p(b)))?.[1] ? l.find(([b]) => !N.has(p(b)))[0] : l[0]?.[0];
    let C = [];
    w && (C = v(p(w)));
    for (const [b, y] of l)
      u.has(b) || C.push({ stepId: b, step: y, children: [] });
    return C;
  }, [e, n, r]), c = (l) => {
    if (n[l]) return n[l];
    const p = l.lastIndexOf(":");
    if (p > 0 && /^\d+$/.test(l.slice(p + 1)))
      return n[l.slice(0, p)];
  };
  function d(l, p) {
    let f = p;
    return l.map((h) => {
      const m = f++, x = /* @__PURE__ */ new Map();
      for (const g of h.children) {
        const u = g.branch ?? "default";
        x.has(u) || x.set(u, []), x.get(u).push(g);
      }
      return /* @__PURE__ */ a(Dn.Fragment, { children: [
        /* @__PURE__ */ t(
          qi,
          {
            stepId: h.stepId,
            step: h.step,
            index: m,
            nodeType: c(h.stepId)?.type ?? "unknown",
            nodeConfig: c(h.stepId)?.data,
            onRetryFromStep: o,
            onResumeFromStep: s
          }
        ),
        h.children.length > 0 && /* @__PURE__ */ t("div", { className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1", children: Array.from(x.entries()).map(([g, u], v) => /* @__PURE__ */ a("div", { children: [
          /* @__PURE__ */ t("div", { className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${v === 0 ? "mt-1" : "mt-2"}`, children: g.replace("-", " ") }),
          d(u, f)
        ] }, g)) })
      ] }, h.stepId);
    });
  }
  return /* @__PURE__ */ a("div", { className: "relative", children: [
    /* @__PURE__ */ t("div", { className: "absolute left-[15px] top-6 bottom-6 w-0.5 bg-border rounded-sm" }),
    d(i, 0)
  ] });
}
const Hi = 5e3, Ki = "synthetic-";
function Wi(e) {
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
function Et(e, n) {
  return n.timestamp.localeCompare(e.timestamp);
}
function Vi(e, n) {
  if (n.length === 0) return e.slice().sort(Et);
  const r = new Set(e.map((i) => i.auditId)), o = /* @__PURE__ */ new Map();
  for (const i of e) {
    const c = o.get(i.action);
    (!c || i.timestamp > c) && o.set(i.action, i.timestamp);
  }
  const s = n.filter((i) => {
    if (r.has(i.auditId)) return !1;
    const c = o.get(i.action);
    return !c || i.timestamp >= c;
  });
  return [...e, ...s].sort(Et);
}
function Ji(e, n, r = {}) {
  const { pollMs: o = Hi, filters: s } = r, i = Rr(), [c, d] = R([]), [l, p] = R([]), [f, h] = R(!0), [m, x] = R(null), [g, u] = R(void 0), [v, N] = R(0), [w, C] = R(!1), b = JSON.stringify({
    since: s?.since,
    until: s?.until,
    actions: s?.actions,
    limit: s?.limit
  });
  J(() => {
    if (!e || !n) return;
    let T = !1;
    return h(!0), x(null), (async () => {
      try {
        const $ = await Wt(e, n, s ?? {});
        if (T) return;
        d($.items), u($.nextCursor), h(!1);
      } catch ($) {
        if (T) return;
        x($ instanceof Error ? $.message : String($)), h(!1);
      }
    })(), () => {
      T = !0;
    };
  }, [e, n, b, v]), J(() => {
    if (!e || !n || o <= 0) return;
    const T = window.setInterval(() => {
      N(($) => $ + 1);
    }, o);
    return () => window.clearInterval(T);
  }, [e, n, o]), J(() => {
    if (!e || !n) return;
    const T = [], $ = (V, Q) => {
      const de = Wi(V);
      if (!de) return;
      const ce = Q;
      if (ce.runId !== n) return;
      C(!0);
      const ne = {
        auditId: `${Ki}${V}-${ce.stepId ?? "run"}-${Date.now()}`,
        timestamp: ce.at ?? (/* @__PURE__ */ new Date()).toISOString(),
        action: de,
        actorUserId: "executor",
        pipelineId: e,
        runId: n,
        trace: Q
      };
      p((pe) => [ne, ...pe]);
    }, H = [
      "pipeline.step.started",
      "pipeline.step.completed",
      "pipeline.step.failed",
      "pipeline.step.breakpoint",
      "pipeline.run.completed",
      "pipeline.run.failed",
      "pipeline.run.resumed-from-step",
      "pipeline.approval.recorded"
    ];
    for (const V of H)
      T.push(i.subscribe(V, (Q) => $(V, Q)));
    return T.push(i.subscribeToRun(n)), () => {
      for (const V of T) V();
    };
  }, [i, e, n]), J(() => {
    c.length !== 0 && p((T) => {
      if (T.length === 0) return T;
      const $ = /* @__PURE__ */ new Map();
      for (const H of c) {
        const V = $.get(H.action);
        (!V || H.timestamp > V) && $.set(H.action, H.timestamp);
      }
      return T.filter((H) => {
        const V = $.get(H.action);
        return !V || H.timestamp >= V;
      });
    });
  }, [c]);
  const y = ae(!1), k = P(() => {
    !e || !n || !g || y.current || (y.current = !0, (async () => {
      try {
        const T = await Wt(e, n, {
          ...s ?? {},
          cursor: g
        });
        d(($) => {
          const H = new Set($.map((Q) => Q.auditId)), V = $.concat(T.items.filter((Q) => !H.has(Q.auditId)));
          return V.sort(Et), V;
        }), u(T.nextCursor);
      } catch (T) {
        x(T instanceof Error ? T.message : String(T));
      } finally {
        y.current = !1;
      }
    })());
  }, [e, n, g, b]), D = P(() => {
    N((T) => T + 1);
  }, []);
  return {
    items: B(() => Vi(c, l), [c, l]),
    loading: f,
    error: m,
    hasMore: !!g,
    loadMore: k,
    liveHealthy: w,
    refresh: D
  };
}
const Gi = "#3b82f6", Yi = "#eab308", Xi = "#f97316", xn = "#64748b", Qi = "#ef4444", Zi = "#a855f7";
function el(e) {
  return e.action === "pipeline.step.failed" || e.outcome === "error" ? Qi : e.action === "pipeline.run.resumed-from-step" || e.action.startsWith("pipeline.step.context.patched") ? Zi : e.action.startsWith("pipeline.approval.") ? Yi : e.action.startsWith("pipeline.breakpoint.") ? Xi : e.action.startsWith("pipeline.step.") ? Gi : (e.action.startsWith("pipeline.run."), xn);
}
const tl = {
  "1h": "Last 1h",
  "24h": "Last 24h",
  all: "All"
}, gn = [
  { label: "Steps", matches: (e) => e.startsWith("pipeline.step.") },
  { label: "Approvals", matches: (e) => e.startsWith("pipeline.approval.") || e === "pipeline.approve" || e === "pipeline.reject" },
  { label: "Breakpoints", matches: (e) => e.startsWith("pipeline.breakpoint.") || e === "pipeline.step.breakpoint.hit" },
  { label: "Run lifecycle", matches: (e) => e.startsWith("pipeline.run.") || e === "pipeline.trigger" || e === "pipeline.cancel" },
  { label: "Errors", matches: (e) => e === "pipeline.step.failed" || e === "pipeline.run.failed" || e === "pipeline.force_fail" }
];
function nl(e) {
  if (e === "all") return null;
  const n = Date.now();
  return e === "1h" ? n - 3600 * 1e3 : n - 1440 * 60 * 1e3;
}
function bn(e) {
  const n = e.details, r = e.trace, o = n && typeof n.stepId == "string" ? n.stepId : void 0, s = r && typeof r.stepId == "string" ? r.stepId : void 0, i = r && typeof r.nodeId == "string" ? r.nodeId : void 0;
  return o ?? s ?? i;
}
function rl(e, n = Date.now()) {
  const r = Date.parse(e);
  if (!Number.isFinite(r)) return e;
  const o = Math.max(0, Math.floor((n - r) / 1e3));
  if (o < 5) return "just now";
  if (o < 60) return `${o}s ago`;
  const s = Math.floor(o / 60);
  if (s < 60) return `${s}m ago`;
  const i = Math.floor(s / 60);
  return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
}
function ol({
  pipelineId: e,
  runId: n,
  onStepClick: r
}) {
  const o = Ji(e, n), { items: s, error: i, hasMore: c, loadMore: d, loading: l } = o, [p, f] = R(/* @__PURE__ */ new Set()), [h, m] = R(""), [x, g] = R("all"), [u, v] = R(/* @__PURE__ */ new Set()), N = P((k) => {
    f((D) => {
      const S = new Set(D);
      return S.has(k) ? S.delete(k) : S.add(k), S;
    });
  }, []), w = P((k) => {
    v((D) => {
      const S = new Set(D);
      return S.has(k) ? S.delete(k) : S.add(k), S;
    });
  }, []), C = B(() => {
    const k = nl(x), D = h.trim().toLowerCase(), S = gn.filter((T) => p.has(T.label));
    return s.filter((T) => {
      if (S.length > 0 && !S.some(($) => $.matches(T.action)) || D && !T.actorUserId.toLowerCase().includes(D)) return !1;
      if (k !== null) {
        const $ = Date.parse(T.timestamp);
        if (!Number.isFinite($) || $ < k) return !1;
      }
      return !0;
    });
  }, [s, p, h, x]), b = P(() => {
    if (typeof window > "u") return;
    const k = C.map(($) => JSON.stringify($)).join(`
`) + (C.length > 0 ? `
` : ""), D = new Blob([k], { type: "application/x-ndjson" }), S = URL.createObjectURL(D), T = document.createElement("a");
    T.href = S, T.download = `executor-log-${n}.ndjson`, document.body.appendChild(T), T.click(), document.body.removeChild(T), URL.revokeObjectURL(S);
  }, [C, n]), y = P(
    (k) => {
      if (w(k.auditId), !r || !k.action.startsWith("pipeline.step.")) return;
      const D = bn(k);
      D && r(D);
    },
    [r, w]
  );
  return /* @__PURE__ */ a(
    "div",
    {
      className: "flex flex-col flex-1 min-h-0 bg-surface border border-border rounded-lg overflow-hidden",
      "data-testid": "executor-log",
      children: [
        /* @__PURE__ */ a("div", { className: "sticky top-0 z-[2] flex flex-wrap items-center gap-2 px-3 py-2.5 bg-[#f8fafc] border-b border-border text-xs", children: [
          /* @__PURE__ */ a(
            "span",
            {
              className: A(
                "inline-flex items-center text-[11px] font-semibold",
                i ? "text-text-tertiary" : "text-text-secondary"
              ),
              "data-testid": "executor-log-live-indicator",
              title: i ? `Live updates unavailable: ${i}` : "Live updates active",
              children: [
                /* @__PURE__ */ t(
                  "span",
                  {
                    className: A(
                      "inline-block w-2 h-2 rounded-full mr-1.5 align-middle",
                      i ? "bg-text-tertiary" : "bg-[#22c55e] [animation:executor-log-pulse_1.6s_ease-in-out_infinite]"
                    ),
                    "aria-hidden": !0
                  }
                ),
                "Live"
              ]
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-border", children: "|" }),
          gn.map((k) => {
            const D = p.has(k.label);
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: A(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  D ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => N(k.label),
                "data-testid": `executor-log-chip-${k.label.toLowerCase().replace(/\s+/g, "-")}`,
                "aria-pressed": D,
                children: k.label
              },
              k.label
            );
          }),
          /* @__PURE__ */ t("span", { className: "text-border", children: "|" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "text",
              value: h,
              onChange: (k) => m(k.target.value),
              placeholder: "Actor",
              className: "font-[inherit] text-xs px-2 py-1 border border-border-field rounded bg-surface text-text-primary min-w-[120px]",
              "data-testid": "executor-log-actor-input",
              "aria-label": "Filter by actor"
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-border", children: "|" }),
          ["1h", "24h", "all"].map((k) => {
            const D = x === k;
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: A(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  D ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => g(k),
                "data-testid": `executor-log-time-${k}`,
                "aria-pressed": D,
                children: tl[k]
              },
              k
            );
          }),
          /* @__PURE__ */ t("div", { className: "flex-1" }),
          /* @__PURE__ */ a("span", { className: "text-[11px] text-text-tertiary", children: [
            C.length,
            " of ",
            s.length,
            " shown"
          ] })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex-1 overflow-y-auto px-4 py-3 relative", "data-testid": "executor-log-timeline", children: [
          l && s.length === 0 && /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary p-3", children: "Loading audit rows…" }),
          !l && s.length === 0 && /* @__PURE__ */ t(
            "div",
            {
              className: "px-3 py-6 text-[13px] text-text-secondary text-center leading-relaxed",
              "data-testid": "executor-log-empty",
              children: "Audit log started recording on 2026-05-07 (hub#2224). This run predates that — no rows captured."
            }
          ),
          C.length === 0 && s.length > 0 && /* @__PURE__ */ t(
            "div",
            {
              className: "px-3 py-5 text-xs text-text-tertiary text-center",
              "data-testid": "executor-log-no-matches",
              children: "No audit rows match the current filters."
            }
          ),
          C.map((k) => {
            const D = u.has(k.auditId), T = k.action.startsWith("pipeline.step.") ? bn(k) : void 0;
            return /* @__PURE__ */ a(
              "div",
              {
                className: "grid grid-cols-[14px_auto_auto_1fr] items-baseline gap-2.5 py-1.5 text-xs border-b border-[#fafbfc] cursor-pointer",
                onClick: () => y(k),
                "data-testid": "executor-log-row",
                "data-action": k.action,
                "data-audit-id": k.auditId,
                children: [
                  /* @__PURE__ */ t(
                    "span",
                    {
                      className: "w-2.5 h-2.5 rounded-full shrink-0 self-center",
                      style: { background: el(k) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ t(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: k.timestamp,
                      children: rl(k.timestamp)
                    }
                  ),
                  /* @__PURE__ */ t("span", { className: "text-text-secondary text-[11px] whitespace-nowrap", children: k.actorUserId }),
                  /* @__PURE__ */ a("span", { className: "text-text-primary flex items-baseline gap-1.5 flex-wrap", children: [
                    /* @__PURE__ */ t("code", { className: "font-mono text-[11px] bg-[#fafbfc] px-1.5 py-px rounded-[3px]", children: k.action }),
                    T && /* @__PURE__ */ a("span", { className: "text-[11px] text-text-tertiary", "data-testid": "executor-log-stepid", children: [
                      "· ",
                      T.slice(0, 14),
                      T.length > 14 ? "…" : ""
                    ] }),
                    k.outcome && /* @__PURE__ */ a(
                      "span",
                      {
                        className: A(
                          "text-[11px]",
                          k.outcome === "error" ? "text-[#b91c1c]" : "text-text-tertiary"
                        ),
                        children: [
                          "· ",
                          k.outcome
                        ]
                      }
                    )
                  ] }),
                  D && k.trace && /* @__PURE__ */ t(
                    "pre",
                    {
                      className: "col-[2/span_3] mt-1 p-2 bg-[#fafbfc] border border-border rounded text-[11px] font-mono text-text-secondary overflow-x-auto",
                      "data-testid": "executor-log-trace",
                      onClick: ($) => $.stopPropagation(),
                      children: JSON.stringify(k.trace, null, 2)
                    }
                  )
                ]
              },
              k.auditId
            );
          })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex justify-between items-center gap-2 px-3 py-2.5 border-t border-border bg-[#f8fafc]", children: [
          c ? /* @__PURE__ */ t("span", { "data-testid": "executor-log-load-more", children: /* @__PURE__ */ t(
            Ue,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => d(),
              children: "Load more"
            }
          ) }) : /* @__PURE__ */ t("span", {}),
          /* @__PURE__ */ t("span", { "data-testid": "executor-log-download", children: /* @__PURE__ */ t(
            Ue,
            {
              variant: "secondary",
              size: "sm",
              onClick: b,
              disabled: C.length === 0,
              children: "Download log"
            }
          ) })
        ] })
      ]
    }
  );
}
function yd() {
  const { pipelineId: e, runId: n } = nt();
  return !e || !n ? /* @__PURE__ */ t(rt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t($n, { pipelineId: e, children: /* @__PURE__ */ t(cr, { children: /* @__PURE__ */ t(sl, { pipelineId: e, runId: n }) }) });
}
function sl({ pipelineId: e, runId: n }) {
  const r = Me(), o = ot(), s = st(), { definition: i } = o, [c, d] = R(null);
  J(() => {
    let E = !1;
    return import("./pipelineAudit-CRdqcwiW.js").then((Z) => Z.N).then(({ getPipelineRun: Z }) => {
      Z(e, n).then((ge) => {
        !E && ge && d(ge);
      });
    }), () => {
      E = !0;
    };
  }, [e, n]);
  const l = B(() => {
    const E = s.runs[n], Z = c;
    if (!E && !Z) return;
    if (!E) return Z ?? void 0;
    if (!Z) return E;
    const ge = Object.keys(E.steps).length, De = Object.keys(Z.steps).length;
    return ge >= De ? E : { ...Z, status: E.status, currentStepIds: E.currentStepIds };
  }, [s.runs, n, c]);
  pr(n);
  const p = Bi(l ?? null), f = B(() => {
    const E = {};
    if (!i) return E;
    for (const Z of i.nodes)
      E[Z.id] = { type: Z.data.type, data: Z.data };
    return E;
  }, [i]), [h, m] = R(!1), x = ae(null);
  tt(x, () => m(!1), h);
  const [g, u] = R("steps"), [v, N] = R(null), w = P((E) => {
    N(E), u("steps");
  }, []), [C, b] = R(null), [y, k] = R(null), [D, S] = R(!1), T = l?.status === "failed" ? l.error?.nodeId : void 0, $ = P((E) => {
    if (!l) return;
    const Z = Object.entries(l.steps).filter(([ge, De]) => ge !== E && De.status === "completed").map(([ge]) => ge);
    b({ nodeId: E, skippedNodes: Z, snapshotInput: !1 }), k(null);
  }, [l]), H = P(async () => {
    if (!(!C || !l)) {
      k(null), S(!0);
      try {
        const E = await Pn(
          e,
          l.id,
          C.nodeId,
          void 0,
          C.snapshotInput || void 0
        );
        b(null), r(`/pipelines/${e}/runs/${E.newRunId}`);
      } catch (E) {
        k(E instanceof Error ? E.message : String(E)), S(!1);
      }
    }
  }, [C, l, e, r]), [V, Q] = R(null), [de, ce] = R(null), [ne, pe] = R(null), O = P(async (E) => {
    if (l) {
      ce(null), Q(E);
      try {
        const Z = await ur(e, l.id, E);
        pe(
          `Resumed from ${E.slice(0, 10)}${E.length > 10 ? "…" : ""} (replay #${Z.replayAttempts})`
        ), setTimeout(() => pe(null), 4e3), r(`/pipelines/${e}/runs/${l.id}`);
      } catch (Z) {
        ce(Z instanceof Error ? Z.message : String(Z));
      } finally {
        Q(null);
      }
    }
  }, [l, e, r]), G = P(async () => {
    if (!l) {
      try {
        const E = await s.triggerRun(e);
        r(`/pipelines/${e}/runs/${E}`);
      } catch (E) {
        console.error("[PipelineRunReplay] re-run failed", E);
      }
      return;
    }
    try {
      const E = await s.triggerRun(
        e,
        l.triggeredBy.payload
      );
      r(`/pipelines/${e}/runs/${E}`);
    } catch (E) {
      console.error("[PipelineRunReplay] re-run failed", E);
    }
  }, [l, s, e, r]), K = async () => {
    m(!1);
    try {
      await navigator.clipboard?.writeText(n);
    } catch {
    }
  }, F = () => {
    if (m(!1), !l) return;
    const E = JSON.stringify(l, null, 2);
    pt(`run-${n}.json`, E);
  }, W = () => {
    if (m(!1), !i) return;
    const E = Ot(
      i.id,
      `${i.name} (from run)`
    );
    E && r(`/pipelines/${E.id}`);
  };
  if (!l)
    return /* @__PURE__ */ a(
      "div",
      {
        className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
        "data-testid": "pipeline-replay-missing",
        children: [
          /* @__PURE__ */ a("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
            /* @__PURE__ */ t(
              ct,
              {
                onClick: () => r(`/pipelines/${e}`),
                "aria-label": "Back to pipeline",
                title: "Back to pipeline",
                children: "←"
              }
            ),
            /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: i?.name ?? "Pipeline" })
          ] }),
          /* @__PURE__ */ a("div", { className: "flex-1 flex flex-col items-center justify-center gap-3.5 p-8 text-center", children: [
            /* @__PURE__ */ t("div", { className: "text-sm text-text-secondary", children: "Run not available — it may have been trimmed from history." }),
            /* @__PURE__ */ t(
              Ue,
              {
                onClick: () => r(`/pipelines/${e}`),
                children: "Back to pipeline"
              }
            )
          ] })
        ]
      }
    );
  const ie = qt(l.status), le = l.triggeredBy.userId ?? l.triggeredBy.triggerType, be = ht(p);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
      "data-testid": "pipeline-replay",
      children: [
        /* @__PURE__ */ a("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
          /* @__PURE__ */ t(
            ct,
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
              title: i?.name ?? e,
              children: i?.name ?? e
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary text-xs", children: "·" }),
          /* @__PURE__ */ a(
            "div",
            {
              className: "text-xs text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
              "data-testid": "replay-subtitle",
              children: [
                "Run from ",
                et(l.startedAt),
                " by ",
                le
              ]
            }
          ),
          /* @__PURE__ */ a(
            "span",
            {
              className: "text-text-tertiary text-xs",
              "data-testid": "replay-cost",
              children: [
                "· ",
                be
              ]
            }
          ),
          /* @__PURE__ */ t(xe, { tone: ie.tone, "aria-label": `Status: ${ie.label}`, children: ie.label }),
          l.status === "failed" && l.error?.errorCategory ? /* @__PURE__ */ t(
            xe,
            {
              tone: "danger",
              title: l.error.message || "Error details unavailable",
              children: l.error.errorCategory
            }
          ) : null,
          /* @__PURE__ */ t("div", { className: "flex-1" }),
          T && /* @__PURE__ */ t(
            Ue,
            {
              onClick: () => $(T),
              disabled: D,
              "data-testid": "retry-from-failed-step-button",
              title: `Retry from "${T}" with the original upstream context`,
              children: "↻ Retry from failure"
            }
          ),
          /* @__PURE__ */ t(
            Ue,
            {
              onClick: G,
              "data-testid": "rerun-button",
              title: "Re-run with the original trigger payload",
              children: "↻ Re-run"
            }
          ),
          /* @__PURE__ */ a("div", { className: "relative", ref: x, children: [
            /* @__PURE__ */ t(
              ct,
              {
                onClick: () => m((E) => !E),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            h ? /* @__PURE__ */ a("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: K, children: "Copy runId" }),
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: F, children: "Export run JSON" }),
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: W, children: "Open as new draft" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ t(
          Mt,
          {
            open: C !== null,
            onConfirm: H,
            onCancel: () => {
              D || b(null);
            },
            title: "Retry from step",
            confirmLabel: D ? "Starting…" : "Confirm retry",
            confirmDisabled: D,
            children: C && /* @__PURE__ */ a("div", { className: "flex flex-col gap-2.5", children: [
              /* @__PURE__ */ a("div", { className: "text-[13px] text-text-secondary", children: [
                "A new run will start from",
                " ",
                /* @__PURE__ */ a("code", { className: "bg-surface-inset px-1 rounded text-xs", children: [
                  C.nodeId.slice(0, 12),
                  C.nodeId.length > 12 ? "…" : ""
                ] }),
                " ",
                "using the original upstream context."
              ] }),
              C.skippedNodes.length > 0 && /* @__PURE__ */ a("div", { children: [
                /* @__PURE__ */ a("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5", children: [
                  "Steps that will be skipped (",
                  C.skippedNodes.length,
                  ")"
                ] }),
                /* @__PURE__ */ t("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: C.skippedNodes.map((E) => /* @__PURE__ */ t("span", { className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary", children: E.slice(0, 10) }, E)) })
              ] }),
              /* @__PURE__ */ a("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
                /* @__PURE__ */ t(
                  "input",
                  {
                    type: "checkbox",
                    checked: C.snapshotInput,
                    onChange: (E) => b((Z) => Z && { ...Z, snapshotInput: E.target.checked }),
                    className: "accent-primary"
                  }
                ),
                "Use persisted input snapshot"
              ] }),
              y && /* @__PURE__ */ t("div", { "data-testid": "retry-modal-error", className: "py-2 px-3 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: y })
            ] })
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col min-h-0", children: /* @__PURE__ */ a("div", { className: "flex-1 overflow-auto py-5 px-7 bg-surface", children: [
          /* @__PURE__ */ a("div", { className: "flex items-center gap-3 mb-5", children: [
            /* @__PURE__ */ a("h3", { className: "m-0 text-[15px] font-bold text-text-primary", children: [
              "Steps (",
              Object.keys(l.steps).length,
              ")"
            ] }),
            /* @__PURE__ */ a("span", { className: "text-xs text-text-tertiary", children: [
              l.startedAt ? new Date(l.startedAt).toLocaleTimeString() : "",
              " — ",
              l.completedAt ? new Date(l.completedAt).toLocaleTimeString() : "in progress"
            ] }),
            l.durationMs != null && /* @__PURE__ */ a("span", { className: "text-xs text-text-secondary ml-auto", children: [
              "Total: ",
              l.durationMs < 1e3 ? `${l.durationMs}ms` : `${(l.durationMs / 1e3).toFixed(1)}s`
            ] })
          ] }),
          y && /* @__PURE__ */ t(Ze, { title: "Retry failed:", className: "mb-4", children: y }),
          de && /* @__PURE__ */ t(Ze, { title: "Resume failed:", className: "mb-4", "data-testid": "resume-error-banner", children: de }),
          (l.replayAttempts ?? 0) > 0 && /* @__PURE__ */ t(
            Ze,
            {
              title: "Resumed from a previous failure",
              className: "mb-4",
              "data-testid": "resume-history-banner",
              children: /* @__PURE__ */ a("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ a("div", { children: [
                  l.error?.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ a(X, { children: [
                    "Originally failed at ",
                    /* @__PURE__ */ t("code", { children: l.error.nodeId.slice(0, 12) }),
                    " — "
                  ] }),
                  "Resumed ",
                  l.replayAttempts,
                  " time",
                  l.replayAttempts === 1 ? "" : "s",
                  ".",
                  l.resumeHistory && l.resumeHistory.length > 0 && /* @__PURE__ */ a(X, { children: [
                    " ",
                    "Most recent: from",
                    " ",
                    /* @__PURE__ */ t("code", { children: l.resumeHistory[l.resumeHistory.length - 1].fromNodeId.slice(0, 12) }),
                    " ",
                    "at ",
                    et(l.resumeHistory[l.resumeHistory.length - 1].at),
                    "."
                  ] })
                ] }),
                l.resumeHistory && l.resumeHistory.length > 1 && /* @__PURE__ */ t(
                  "ol",
                  {
                    className: "m-0 pl-[18px] text-[11px] text-text-tertiary leading-relaxed",
                    "data-testid": "resume-history-timeline",
                    children: l.resumeHistory.map((E, Z) => /* @__PURE__ */ a("li", { children: [
                      "from ",
                      /* @__PURE__ */ t("code", { children: E.fromNodeId.slice(0, 12) }),
                      " at ",
                      et(E.at)
                    ] }, `${E.fromNodeId}-${E.at}-${Z}`))
                  }
                )
              ] })
            }
          ),
          ne && /* @__PURE__ */ t(Ze, { title: "Resumed", className: "mb-4", "data-testid": "resume-toast", children: ne }),
          l.error && /* @__PURE__ */ a(Ze, { title: "Run failed:", className: "mb-4", children: [
            l.error.message,
            l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ a("span", { className: "ml-2 text-[11px] text-[#b91c1c]", children: [
              "at node ",
              l.error.nodeId.slice(0, 8)
            ] }),
            l.status === "failed" && l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ t("div", { className: "mt-2", children: /* @__PURE__ */ t(
              Ue,
              {
                onClick: () => O(l.error.nodeId),
                disabled: V !== null,
                "data-testid": "resume-from-here-button",
                title: `Resume this run from "${l.error.nodeId}" using its accumulated upstream context`,
                children: V === l.error.nodeId ? "Resuming…" : "↻ Resume from here"
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
              ].map((E) => {
                const Z = g === E.id;
                return /* @__PURE__ */ t(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": Z,
                    onClick: () => u(E.id),
                    "data-testid": `run-replay-tab-${E.id}`,
                    className: A(
                      "font-[inherit] text-[13px] font-semibold py-1.5 px-3.5 border-none bg-transparent cursor-pointer -mb-px",
                      Z ? "text-text-primary border-b-2 border-b-primary" : "text-text-tertiary border-b-2 border-b-transparent"
                    ),
                    children: E.label
                  },
                  E.id
                );
              })
            }
          ),
          g === "steps" ? (
            /* Threaded step list with fork nesting */
            /* @__PURE__ */ t(
              zi,
              {
                steps: l.steps,
                nodeDataMap: f,
                edges: i?.edges,
                onRetryFromStep: $,
                onResumeFromStep: l.status === "failed" ? O : void 0
              }
            )
          ) : /* @__PURE__ */ t("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ t(
            ol,
            {
              pipelineId: e,
              runId: n,
              onStepClick: w
            }
          ) })
        ] }) })
      ]
    }
  );
}
function al(e) {
  return e == null ? "—" : `${e > 0 ? "+" : (e < 0, "")}${ve(Math.abs(e))}`.replace(/^(\+|-)?/, e === 0 ? "" : e > 0 ? "+" : "-");
}
function il(e) {
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
function ll(e, n) {
  if (!e) return n;
  const r = e.nodes.find((o) => o.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function dl(e, n) {
  if (!e) return !1;
  const r = e.nodes.find((o) => o.id === n);
  return !!r && r.data.type === "condition";
}
function yn(e) {
  if (!e) return;
  const n = e.output;
  if (n && typeof n == "object" && "result" in n)
    return n.result ? "true" : "false";
}
function cl(e, n) {
  const r = (m) => m.split(/(\s+)/).filter((x) => x.length > 0), o = r(e), s = r(n), i = o.length, c = s.length, d = Array.from({ length: i + 1 }, () => new Array(c + 1).fill(0));
  for (let m = i - 1; m >= 0; m--)
    for (let x = c - 1; x >= 0; x--)
      o[m] === s[x] ? d[m][x] = d[m + 1][x + 1] + 1 : d[m][x] = Math.max(d[m + 1][x], d[m][x + 1]);
  const l = [], p = (m, x) => {
    const g = l[l.length - 1];
    g && g.type === m ? g.text += x : l.push({ type: m, text: x });
  };
  let f = 0, h = 0;
  for (; f < i && h < c; )
    o[f] === s[h] ? (p("eq", o[f]), f++, h++) : d[f + 1][h] >= d[f][h + 1] ? (p("del", o[f]), f++) : (p("add", s[h]), h++);
  for (; f < i; )
    p("del", o[f++]);
  for (; h < c; )
    p("add", s[h++]);
  return l;
}
function pl(e, n, r) {
  const o = /* @__PURE__ */ new Set(), s = [];
  if (r)
    for (const i of r.nodes)
      (e.steps[i.id] || n.steps[i.id]) && (s.push(i.id), o.add(i.id));
  for (const i of [...Object.keys(e.steps), ...Object.keys(n.steps)])
    o.has(i) || (s.push(i), o.add(i));
  return s.map((i) => {
    const c = e.steps[i], d = n.steps[i], l = c?.durationMs, p = d?.durationMs, f = l != null && p != null ? p - l : void 0, h = !!c && !!d && c.status !== d.status;
    let m = !1;
    l != null && p != null && l > 0 && (m = Math.abs(p - l) / l > 0.5);
    const x = dl(r, i), g = x ? yn(c) : void 0, u = x ? yn(d) : void 0, v = x && g !== void 0 && u !== void 0 && g !== u;
    return {
      nodeId: i,
      name: ll(r, i),
      a: c,
      b: d,
      durationDelta: f,
      statusDiffers: h,
      durationLarge: m,
      branchDiffers: v,
      isLlm: !!(c?.llm || d?.llm),
      isCondition: x,
      branchA: g,
      branchB: u
    };
  });
}
function ul(e) {
  if (e.statusDiffers) return "bg-[#fef2f2]";
  if (e.branchDiffers) return "bg-[#eff6ff]";
  if (e.durationLarge) return "bg-[#fffbeb]";
}
function vn({
  step: e,
  branch: n,
  isCondition: r
}) {
  if (!e)
    return /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" });
  const o = il(e.status);
  return /* @__PURE__ */ a("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ a("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ t(xe, { tone: o, children: e.status }),
      /* @__PURE__ */ t("span", { className: "font-mono text-text-secondary", children: ve(e.durationMs) }),
      r && n ? /* @__PURE__ */ a("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        "(",
        n === "true" ? "T" : "F",
        ")"
      ] }) : null
    ] }),
    e.llm ? /* @__PURE__ */ a("div", { className: "font-mono text-[11px] text-text-tertiary", children: [
      e.llm.tokensIn,
      "→",
      e.llm.tokensOut,
      "tok"
    ] }) : null,
    e.error ? /* @__PURE__ */ t("div", { className: "text-[11px] text-[#dc2626]", title: e.error, children: e.error.length > 60 ? `${e.error.slice(0, 60)}…` : e.error }) : null
  ] });
}
function ml({ a: e, b: n }) {
  const r = B(() => cl(e, n), [e, n]);
  return /* @__PURE__ */ t(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: r.map((o, s) => o.type === "eq" ? /* @__PURE__ */ t("span", { children: o.text }, s) : o.type === "add" ? /* @__PURE__ */ t("span", { "data-diff": "add", className: "bg-[#dcfce7] text-[#166534]", children: o.text }, s) : /* @__PURE__ */ t("span", { "data-diff": "del", className: "bg-[#fee2e2] text-[#991b1b] line-through", children: o.text }, s))
    }
  );
}
function fl({ row: e }) {
  const n = e.a?.llm, r = e.b?.llm, o = n && r ? r.tokensIn + r.tokensOut - (n.tokensIn + n.tokensOut) : void 0, s = ul(e);
  return /* @__PURE__ */ a(X, { children: [
    /* @__PURE__ */ a("tr", { "data-testid": `run-compare-row-${e.nodeId}`, className: s, children: [
      /* @__PURE__ */ a("td", { className: A("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", s), children: [
        /* @__PURE__ */ t("div", { className: "font-semibold text-text-primary", children: e.name }),
        /* @__PURE__ */ t("div", { className: "font-mono text-[11px] text-text-tertiary", children: e.nodeId })
      ] }),
      /* @__PURE__ */ t("td", { className: A("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", s), children: /* @__PURE__ */ t(vn, { step: e.a, branch: e.branchA, isCondition: e.isCondition }) }),
      /* @__PURE__ */ t("td", { className: A("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", s), children: /* @__PURE__ */ t(vn, { step: e.b, branch: e.branchB, isCondition: e.isCondition }) }),
      /* @__PURE__ */ a(
        "td",
        {
          className: A("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", s),
          "data-testid": `run-compare-delta-${e.nodeId}`,
          children: [
            e.branchDiffers ? /* @__PURE__ */ t("span", { className: "font-semibold text-[#2563eb]", children: "different branch!" }) : e.statusDiffers ? /* @__PURE__ */ t("span", { className: "font-semibold text-[#dc2626]", children: "status differs" }) : e.durationDelta != null ? /* @__PURE__ */ t("span", { className: e.durationLarge ? "text-[#d97706]" : "text-text-secondary", children: al(e.durationDelta) }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "—" }),
            o != null && o !== 0 ? /* @__PURE__ */ a("div", { className: "mt-0.5 text-[11px] text-text-tertiary", children: [
              o > 0 ? "+" : "",
              o,
              "tok"
            ] }) : null
          ]
        }
      )
    ] }),
    e.isLlm && (n || r) ? /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t("td", { className: "border-b border-border p-0", colSpan: 4, children: /* @__PURE__ */ a("details", { className: "bg-surface-inset px-3.5 py-2.5", children: [
      /* @__PURE__ */ t(
        "summary",
        {
          className: "cursor-pointer text-xs font-semibold text-text-secondary",
          "data-testid": `run-compare-llm-toggle-${e.nodeId}`,
          children: "LLM response diff"
        }
      ),
      /* @__PURE__ */ a("div", { className: "mt-2 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ a("div", { children: [
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
        /* @__PURE__ */ a("div", { children: [
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
      /* @__PURE__ */ a("div", { className: "mt-2.5", children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Word-level diff" }),
        /* @__PURE__ */ t("div", { className: "mt-1.5", children: /* @__PURE__ */ t(
          ml,
          {
            a: n?.response ?? "",
            b: r?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function hl({ runA: e, runB: n, def: r }) {
  const o = B(() => pl(e, n, r), [e, n, r]);
  return /* @__PURE__ */ a(
    "table",
    {
      className: "w-full overflow-hidden rounded-lg border border-border bg-surface text-[13px]",
      "data-testid": "run-compare-table",
      children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ a("tr", { children: [
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Step" }),
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run A" }),
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run B" }),
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Δ" })
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: o.map((s) => /* @__PURE__ */ t(fl, { row: s }, s.nodeId)) })
      ]
    }
  );
}
function xl(e) {
  return e == null ? "—" : `${e > 0 ? "+" : (e < 0, "")}${ve(Math.abs(e))}`.replace(/^(\+|-)?/, e === 0 ? "" : e > 0 ? "+" : "-");
}
function gl(e) {
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
function bl(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Nn(e, n) {
  const r = Object.values(e.steps).filter((o) => !!o.llm).map((o) => ({
    model: n.get(o.nodeId),
    tokensIn: o.llm?.tokensIn ?? 0,
    tokensOut: o.llm?.tokensOut ?? 0
  }));
  return ht(at(r).total);
}
function wn({
  label: e,
  run: n,
  cost: r,
  testIdPrefix: o
}) {
  const s = gl(n.status);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
      "data-testid": `${o}-summary`,
      children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: e }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-tertiary", children: n.id.slice(0, 8) }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "text-text-secondary", children: et(n.startedAt) })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t(xe, { tone: s, children: n.status }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono", children: ve(n.durationMs) }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono", "data-testid": `${o}-cost`, children: r })
        ] })
      ]
    }
  );
}
function vd() {
  const { pipelineId: e, runIdA: n, runIdB: r } = nt(), o = Me(), s = B(
    () => e ? Ye(e) : null,
    [e]
  ), i = B(
    () => e && n ? vt(e, n) : null,
    [e, n]
  ), c = B(
    () => e && r ? vt(e, r) : null,
    [e, r]
  ), d = B(() => bl(s), [s]);
  if (!e || !n || !r)
    return /* @__PURE__ */ t(rt, { to: "/pipelines", replace: !0 });
  if (!s)
    return /* @__PURE__ */ t("div", { className: "p-8", children: /* @__PURE__ */ t(
      Oe,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => o("/pipelines")
      }
    ) });
  if (!i || !c)
    return /* @__PURE__ */ t("div", { className: "p-8", "data-testid": "run-compare-missing", children: /* @__PURE__ */ t(
      Oe,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable — they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => o(`/pipelines/${e}/runs`)
      }
    ) });
  const l = (c.durationMs ?? 0) - (i.durationMs ?? 0), p = Nn(i, d), f = Nn(c, d), h = (/* @__PURE__ */ new Set([
    ...Object.keys(i.steps),
    ...Object.keys(c.steps)
  ])).size;
  return /* @__PURE__ */ a("div", { className: "flex flex-col gap-4 p-6 text-text-primary", "data-testid": "run-compare", children: [
    /* @__PURE__ */ a("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          onClick: () => o(`/pipelines/${e}/runs`),
          className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
          children: [
            "← ",
            s.name
          ]
        }
      ),
      /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "/" }),
      /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: "Compare runs" }),
      /* @__PURE__ */ a(
        "span",
        {
          className: "ml-auto text-xs text-text-tertiary",
          "data-testid": "run-compare-cost-delta",
          children: [
            p,
            " → ",
            f
          ]
        }
      )
    ] }),
    /* @__PURE__ */ a("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ t(wn, { label: "Run A", run: i, cost: p, testIdPrefix: "run-a" }),
      /* @__PURE__ */ t(wn, { label: "Run B", run: c, cost: f, testIdPrefix: "run-b" })
    ] }),
    /* @__PURE__ */ a(
      "div",
      {
        className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
        "data-testid": "run-compare-delta",
        children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Δ duration" }),
          /* @__PURE__ */ t("span", { className: "font-mono text-[13px]", children: xl(l) }),
          /* @__PURE__ */ t("span", { className: "flex-1" }),
          /* @__PURE__ */ a("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
            h,
            " step",
            h === 1 ? "" : "s",
            " compared"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ t(hl, { runA: i, runB: c, def: s })
  ] });
}
function yl(e) {
  return e === 0 ? "0ms" : `${e > 0 ? "+" : "-"}${ve(Math.abs(e))}`;
}
function kn(e) {
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
function vl({
  runA: e,
  runB: n,
  costA: r,
  costB: o
}) {
  const s = e.durationMs ?? 0, c = (n.durationMs ?? 0) - s;
  return /* @__PURE__ */ a("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ a("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ a(
        "div",
        {
          className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
          "data-testid": "diff-run-a-summary",
          children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run A" }),
            /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-tertiary", children: e.id.slice(0, 8) }),
              /* @__PURE__ */ t(xe, { tone: kn(e.status), children: e.status })
            ] }),
            /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary", children: et(e.startedAt) }),
            /* @__PURE__ */ a("div", { className: "font-mono text-xs", children: [
              ve(e.durationMs),
              " | ",
              r
            ] }),
            /* @__PURE__ */ a("div", { className: "text-[11px] text-text-tertiary", children: [
              "Trigger: ",
              e.triggeredBy.userId ?? e.triggeredBy.triggerType
            ] })
          ]
        }
      ),
      /* @__PURE__ */ a(
        "div",
        {
          className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
          "data-testid": "diff-run-b-summary",
          children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run B" }),
            /* @__PURE__ */ a("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-tertiary", children: n.id.slice(0, 8) }),
              /* @__PURE__ */ t(xe, { tone: kn(n.status), children: n.status })
            ] }),
            /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary", children: et(n.startedAt) }),
            /* @__PURE__ */ a("div", { className: "font-mono text-xs", children: [
              ve(n.durationMs),
              " | ",
              o
            ] }),
            /* @__PURE__ */ a("div", { className: "text-[11px] text-text-tertiary", children: [
              "Trigger: ",
              n.triggeredBy.userId ?? n.triggeredBy.triggerType
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ a(
      "div",
      {
        className: "flex items-center gap-4 rounded-md bg-surface-inset px-3.5 py-2.5",
        "data-testid": "diff-duration-delta",
        children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Duration delta" }),
          /* @__PURE__ */ t(
            "span",
            {
              className: A(
                "font-mono text-sm font-bold",
                c === 0 ? "text-text-secondary" : c < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
              ),
              children: yl(c)
            }
          ),
          /* @__PURE__ */ a("span", { className: "text-[11px] text-text-tertiary", children: [
            "(",
            c < 0 ? "faster" : c > 0 ? "slower" : "same",
            " in Run B)"
          ] })
        ]
      }
    )
  ] });
}
function Nl(e) {
  return e === 0 ? "0ms" : `${e > 0 ? "+" : "-"}${ve(Math.abs(e))}`;
}
function Cn(e) {
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
function wl(e, n) {
  if (!e) return n;
  const r = e.nodes.find((o) => o.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function kl(e, n, r) {
  const o = /* @__PURE__ */ new Set(), s = [];
  if (r)
    for (const i of r.nodes)
      (e.steps[i.id] || n.steps[i.id]) && (s.push(i.id), o.add(i.id));
  for (const i of [...Object.keys(e.steps), ...Object.keys(n.steps)])
    o.has(i) || (s.push(i), o.add(i));
  return s.map((i) => {
    const c = e.steps[i], d = n.steps[i], l = c?.durationMs, p = d?.durationMs, f = l != null && p != null ? p - l : void 0, h = !!c && !!d && c.status !== d.status, m = !!c && !d, x = !c && !!d, g = c?.llm ? c.llm.tokensIn + c.llm.tokensOut : void 0, u = d?.llm ? d.llm.tokensIn + d.llm.tokensOut : void 0, v = g != null && u != null ? u - g : void 0;
    return {
      nodeId: i,
      name: wl(r, i),
      a: c,
      b: d,
      durationDelta: f,
      statusDiffers: h,
      onlyInA: m,
      onlyInB: x,
      tokenDelta: v
    };
  });
}
function Cl({ runA: e, runB: n, def: r }) {
  const o = B(() => kl(e, n, r), [e, n, r]);
  return /* @__PURE__ */ a("table", { className: "w-full border-collapse text-[13px]", children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ a("tr", { children: [
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Step" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run A" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run B" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Delta" })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: o.map((s) => /* @__PURE__ */ a(
      "tr",
      {
        className: A(
          s.onlyInA || s.onlyInB ? "bg-[#fefce8]" : s.statusDiffers ? "bg-[#fef2f2]" : void 0
        ),
        "data-testid": `diff-step-row-${s.nodeId}`,
        children: [
          /* @__PURE__ */ a("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: [
            /* @__PURE__ */ t("div", { className: "font-semibold", children: s.name }),
            /* @__PURE__ */ t("div", { className: "font-mono text-[10px] text-text-tertiary", children: s.nodeId }),
            s.onlyInA && /* @__PURE__ */ t(xe, { tone: "warning", size: "xs", children: "only in A" }),
            s.onlyInB && /* @__PURE__ */ t(xe, { tone: "warning", size: "xs", children: "only in B" })
          ] }),
          /* @__PURE__ */ t("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: s.a ? /* @__PURE__ */ a("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ t(xe, { tone: Cn(s.a.status), children: s.a.status }),
            /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: ve(s.a.durationMs) }),
            s.a.llm && /* @__PURE__ */ a("span", { className: "text-[10px] text-text-tertiary", children: [
              s.a.llm.tokensIn,
              " in / ",
              s.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ t("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: s.b ? /* @__PURE__ */ a("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ t(xe, { tone: Cn(s.b.status), children: s.b.status }),
            /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: ve(s.b.durationMs) }),
            s.b.llm && /* @__PURE__ */ a("span", { className: "text-[10px] text-text-tertiary", children: [
              s.b.llm.tokensIn,
              " in / ",
              s.b.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ a("td", { className: "border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", children: [
            s.statusDiffers && /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-[#dc2626]", children: "status differs" }),
            s.durationDelta != null && /* @__PURE__ */ t(
              "div",
              {
                className: A(
                  "text-xs",
                  s.durationDelta === 0 ? "text-text-tertiary" : s.durationDelta < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
                ),
                children: Nl(s.durationDelta)
              }
            ),
            s.tokenDelta != null && s.tokenDelta !== 0 && /* @__PURE__ */ a(
              "div",
              {
                className: A(
                  "mt-0.5 text-[10px]",
                  s.tokenDelta < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
                ),
                children: [
                  s.tokenDelta > 0 ? "+" : "",
                  s.tokenDelta,
                  " tok"
                ]
              }
            ),
            s.durationDelta == null && !s.statusDiffers && /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "--" })
          ] })
        ]
      },
      s.nodeId
    )) })
  ] });
}
function Il(e, n) {
  if (!e) return n;
  const r = e.nodes.find((o) => o.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Nt(e, n = "", r = 0) {
  const o = /* @__PURE__ */ new Map();
  if (r > 6 || e == null)
    return o.set(n || "(root)", String(e)), o;
  if (typeof e != "object")
    return o.set(n || "(root)", JSON.stringify(e)), o;
  if (Array.isArray(e)) {
    if (e.length === 0)
      o.set(n || "(root)", "[]");
    else
      for (let i = 0; i < e.length; i++) {
        const c = n ? `${n}.${i}` : String(i);
        for (const [d, l] of Nt(e[i], c, r + 1))
          o.set(d, l);
      }
    return o;
  }
  const s = Object.entries(e);
  if (s.length === 0)
    o.set(n || "(root)", "{}");
  else
    for (const [i, c] of s) {
      const d = n ? `${n}.${i}` : i;
      for (const [l, p] of Nt(c, d, r + 1))
        o.set(l, p);
    }
  return o;
}
function Jn(e, n) {
  const r = Nt(e), o = Nt(n), s = /* @__PURE__ */ new Set([...r.keys(), ...o.keys()]), i = [];
  for (const d of s) {
    const l = r.get(d), p = o.get(d);
    l === void 0 ? i.push({ key: d, type: "added", valueB: p }) : p === void 0 ? i.push({ key: d, type: "removed", valueA: l }) : l !== p ? i.push({ key: d, type: "changed", valueA: l, valueB: p }) : i.push({ key: d, type: "unchanged", valueA: l, valueB: p });
  }
  const c = {
    changed: 0,
    added: 1,
    removed: 2,
    unchanged: 3
  };
  return i.sort((d, l) => {
    const p = c[d.type] - c[l.type];
    return p !== 0 ? p : d.key.localeCompare(l.key);
  }), i;
}
const Sl = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function Tl({
  nodeId: e,
  name: n,
  outputA: r,
  outputB: o
}) {
  const [s, i] = R(!1), c = B(() => Jn(r, o), [r, o]), d = c.filter((l) => l.type !== "unchanged").length;
  return d === 0 ? /* @__PURE__ */ a("div", { className: "rounded-md bg-surface-inset px-3 py-2", children: [
    /* @__PURE__ */ t("span", { className: "text-xs font-semibold", children: n }),
    /* @__PURE__ */ t("span", { className: "ml-2 text-[11px] text-text-tertiary", children: "(no differences)" })
  ] }) : /* @__PURE__ */ a(
    "div",
    {
      className: "overflow-hidden rounded-md border border-border",
      "data-testid": `diff-output-${e}`,
      children: [
        /* @__PURE__ */ a(
          "div",
          {
            className: "flex cursor-pointer items-center gap-2 bg-surface-inset px-3 py-2",
            onClick: () => i(!s),
            children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: s ? "▼" : "▶" }),
              /* @__PURE__ */ t("span", { className: "text-xs font-semibold", children: n }),
              /* @__PURE__ */ t("span", { className: "font-mono text-[10px] text-text-tertiary", children: e }),
              /* @__PURE__ */ a(xe, { tone: "warning", size: "xs", className: "ml-auto", children: [
                d,
                " difference",
                d === 1 ? "" : "s"
              ] })
            ]
          }
        ),
        s && /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5 px-3 py-2", children: c.filter((l) => l.type !== "unchanged").map((l, p) => /* @__PURE__ */ a(
          "div",
          {
            className: A(
              "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
              Sl[l.type]
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "min-w-[120px] shrink-0 font-semibold", children: [
                l.type === "added" && "+ ",
                l.type === "removed" && "- ",
                l.type === "changed" && "~ ",
                l.key
              ] }),
              l.type === "changed" && /* @__PURE__ */ a("span", { children: [
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
function Al({ runA: e, runB: n, def: r }) {
  const o = B(() => {
    const s = /* @__PURE__ */ new Set(), i = [];
    if (r)
      for (const c of r.nodes) {
        const d = e.steps[c.id]?.output != null, l = n.steps[c.id]?.output != null;
        (d || l) && (i.push(c.id), s.add(c.id));
      }
    for (const c of [...Object.keys(e.steps), ...Object.keys(n.steps)]) {
      if (s.has(c)) continue;
      const d = e.steps[c]?.output != null, l = n.steps[c]?.output != null;
      (d || l) && (i.push(c), s.add(c));
    }
    return i;
  }, [e, n, r]);
  return o.length === 0 ? /* @__PURE__ */ t("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "No step outputs to compare." }) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-3", children: o.map((s) => /* @__PURE__ */ t(
    Tl,
    {
      nodeId: s,
      name: Il(r, s),
      outputA: e.steps[s]?.output,
      outputB: n.steps[s]?.output
    },
    s
  )) });
}
function Dl(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function In(e, n) {
  const r = Object.values(e.steps).filter((o) => !!o.llm).map((o) => ({
    model: n.get(o.nodeId),
    tokensIn: o.llm?.tokensIn ?? 0,
    tokensOut: o.llm?.tokensOut ?? 0
  }));
  return ht(at(r).total);
}
function bt({
  title: e,
  defaultOpen: n = !0,
  badge: r,
  children: o,
  testId: s
}) {
  const [i, c] = R(n);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "overflow-hidden rounded-lg border border-border bg-surface",
      "data-testid": s,
      children: [
        /* @__PURE__ */ a(
          "div",
          {
            className: "flex cursor-pointer select-none items-center gap-2 border-b border-border bg-surface-inset px-4 py-3",
            onClick: () => c(!i),
            role: "button",
            tabIndex: 0,
            onKeyDown: (d) => {
              (d.key === "Enter" || d.key === " ") && (d.preventDefault(), c(!i));
            },
            "aria-expanded": i,
            children: [
              /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary", children: i ? "▼" : "▶" }),
              /* @__PURE__ */ t("span", { className: "text-[13px] font-bold text-text-primary", children: e }),
              r && /* @__PURE__ */ t(xe, { tone: "info", className: "ml-auto", children: r })
            ]
          }
        ),
        i && /* @__PURE__ */ t("div", { className: "p-4", children: o })
      ]
    }
  );
}
const Rl = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function $l({
  runA: e,
  runB: n
}) {
  const r = B(
    () => Jn(e.context, n.context),
    [e.context, n.context]
  ), o = r.filter((s) => s.type !== "unchanged").length;
  return /* @__PURE__ */ t(
    bt,
    {
      title: "Context evolution diff",
      defaultOpen: !1,
      badge: o > 0 ? `${o} difference${o === 1 ? "" : "s"}` : void 0,
      testId: "diff-context-section",
      children: o === 0 ? /* @__PURE__ */ t("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "Final contexts are identical." }) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: r.map((s, i) => /* @__PURE__ */ a(
        "div",
        {
          className: A(
            "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
            Rl[s.type]
          ),
          children: [
            /* @__PURE__ */ a("span", { className: "min-w-[160px] shrink-0 font-semibold", children: [
              s.type === "added" && "+ ",
              s.type === "removed" && "- ",
              s.type === "changed" && "~ ",
              s.type === "unchanged" && "  ",
              s.key
            ] }),
            s.type === "changed" && /* @__PURE__ */ a("span", { children: [
              /* @__PURE__ */ t("span", { className: "line-through opacity-70", children: s.valueA }),
              " -> ",
              /* @__PURE__ */ t("span", { className: "font-semibold", children: s.valueB })
            ] }),
            s.type === "added" && /* @__PURE__ */ t("span", { children: s.valueB }),
            s.type === "removed" && /* @__PURE__ */ t("span", { children: s.valueA }),
            s.type === "unchanged" && /* @__PURE__ */ t("span", { className: "opacity-50", children: s.valueA })
          ]
        },
        `${s.key}-${i}`
      )) })
    }
  );
}
function Ml({ pipelineId: e, runIdA: n, runIdB: r }) {
  const o = Me(), s = B(
    () => Ye(e),
    [e]
  ), i = B(
    () => vt(e, n),
    [e, n]
  ), c = B(
    () => vt(e, r),
    [e, r]
  ), d = B(() => Dl(s), [s]);
  if (!s)
    return /* @__PURE__ */ t("div", { className: "p-8", children: /* @__PURE__ */ t(
      Oe,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => o("/pipelines")
      }
    ) });
  if (!i || !c)
    return /* @__PURE__ */ t("div", { className: "p-8", "data-testid": "diff-run-missing", children: /* @__PURE__ */ t(
      Oe,
      {
        icon: "🔍",
        title: "Run not found",
        body: "One or both runs are unavailable -- they may have been trimmed from history.",
        actionLabel: "Back to runs",
        onAction: () => o(`/pipelines/${e}/runs`)
      }
    ) });
  const l = In(i, d), p = In(c, d);
  return /* @__PURE__ */ a(
    "div",
    {
      className: "mx-auto flex w-full max-w-[1400px] flex-col gap-5 p-6 text-text-primary",
      "data-testid": "pipeline-run-diff",
      children: [
        /* @__PURE__ */ a("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: () => o(`/pipelines/${e}/runs`),
              className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
              children: [
                "← ",
                s.name
              ]
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "/" }),
          /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: "Diff view" }),
          /* @__PURE__ */ a("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
            n.slice(0, 8),
            " vs ",
            r.slice(0, 8)
          ] })
        ] }),
        /* @__PURE__ */ t(bt, { title: "Summary", testId: "diff-summary-section", children: /* @__PURE__ */ t(
          vl,
          {
            runA: i,
            runB: c,
            costA: l,
            costB: p
          }
        ) }),
        /* @__PURE__ */ t(
          bt,
          {
            title: "Step-by-step comparison",
            badge: `${Object.keys(i.steps).length + Object.keys(c.steps).length > 0 ? "steps" : "0 steps"}`,
            testId: "diff-steps-section",
            children: /* @__PURE__ */ t(Cl, { runA: i, runB: c, def: s })
          }
        ),
        /* @__PURE__ */ t(
          bt,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ t(Al, { runA: i, runB: c, def: s })
          }
        ),
        /* @__PURE__ */ t($l, { runA: i, runB: c })
      ]
    }
  );
}
function Nd() {
  const { pipelineId: e } = nt(), [n] = wt(), r = n.get("a"), o = n.get("b");
  return !e || !r || !o ? /* @__PURE__ */ t(rt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t(Ml, { pipelineId: e, runIdA: r, runIdB: o });
}
function wd() {
  const e = Me(), [n, r] = wt(), [o, s] = R([]), { runs: i } = st();
  J(() => {
    let w = !1;
    return (async () => {
      const C = Vt(), b = [];
      await Promise.all(
        C.map(async (y) => {
          try {
            const { runs: k } = await Rn(y.id, { limit: 50 });
            if (k.length > 0) {
              for (const D of k)
                D.id && b.push({ ...D, pipelineName: y.name });
              return;
            }
          } catch {
          }
          for (const k of yt(y.id))
            k.id && b.push({ ...k, pipelineName: y.name });
        })
      ), !w && (b.sort((y, k) => k.startedAt.localeCompare(y.startedAt)), s(b));
    })(), () => {
      w = !0;
    };
  }, []);
  const c = B(() => {
    const w = new Map(Vt().map((y) => [y.id, y.name])), C = new Set(o.map((y) => y.id)), b = [];
    for (const [y, k] of Object.entries(i))
      C.has(y) || k.pipelineId && b.push({
        ...k,
        pipelineName: w.get(k.pipelineId) ?? `Pipeline ${k.pipelineId.slice(0, 8)}`
      });
    return b.length === 0 ? o : [...b, ...o].sort((y, k) => k.startedAt.localeCompare(y.startedAt));
  }, [o, i]), { query: d, statuses: l, triggerKinds: p, range: f } = B(
    () => Wn(n),
    [n]
  ), h = (w, C) => {
    const b = new URLSearchParams(n);
    C ? b.set(w, C) : b.delete(w), r(b, { replace: !0 });
  }, m = (w) => {
    const C = new Set(l);
    C.has(w) ? C.delete(w) : C.add(w), h("status", C.size === 0 ? null : Array.from(C).join(","));
  }, x = (w) => {
    const C = new Set(p);
    C.has(w) ? C.delete(w) : C.add(w), h("trigger", C.size === 0 ? null : Array.from(C).join(","));
  }, g = (w) => {
    h("range", w === "7d" ? null : w);
  }, u = (w) => {
    h("q", w.length === 0 ? null : w);
  }, v = B(
    () => Kn(c, { query: d, statuses: l, triggerKinds: p, range: f }),
    [c, d, l, p, f]
  ), N = B(() => {
    const w = {};
    for (const C of v) {
      const b = Object.values(C.steps).filter((k) => !!k.llm).map((k) => ({
        model: void 0,
        tokensIn: k.llm?.tokensIn ?? 0,
        tokensOut: k.llm?.tokensOut ?? 0
      })), y = at(b);
      y.total.totalCostUsd > 0 && (w[C.id] = ht(y.total));
    }
    return w;
  }, [v]);
  return /* @__PURE__ */ a("div", { "data-testid": "all-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ a("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ t("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Runs" }),
      /* @__PURE__ */ a("span", { className: "text-[13px] text-text-tertiary", children: [
        v.length,
        " run",
        v.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ t(
      Vn,
      {
        query: d,
        onQueryChange: u,
        statuses: l,
        onStatusToggle: m,
        triggerKinds: p,
        onTriggerToggle: x,
        range: f,
        onRangeChange: g,
        onClearFilters: () => r(new URLSearchParams(), { replace: !0 })
      }
    ),
    v.length === 0 ? /* @__PURE__ */ t(
      Oe,
      {
        icon: "📋",
        title: "No runs yet",
        body: "Run a pipeline to see execution history here."
      }
    ) : /* @__PURE__ */ t("div", { className: "overflow-x-auto", children: /* @__PURE__ */ a("table", { className: "w-full border-collapse text-[13px]", children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ a("tr", { className: "border-b border-border", children: [
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Pipeline" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Run ID" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Status" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Trigger" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Started" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right", children: "Duration" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right", children: "Cost" })
      ] }) }),
      /* @__PURE__ */ t("tbody", { children: v.map((w) => /* @__PURE__ */ a(
        "tr",
        {
          onClick: () => e(`/pipelines/${w.pipelineId}/runs/${w.id}`),
          className: "border-b border-border cursor-pointer hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-medium", children: w.pipelineName }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: w.id.slice(0, 11) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ t(xe, { tone: qt(w.status).tone, size: "sm", children: w.status }) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: w.triggerType ?? w.triggeredBy?.triggerType }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: Ca(w.startedAt) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: w.completedAt ? ve(new Date(w.completedAt).getTime() - new Date(w.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: N[w.id] ?? "—" })
          ]
        },
        w.id
      )) })
    ] }) })
  ] });
}
function Gn(e) {
  let n = 0, r = 0;
  for (const o of Object.values(e.steps ?? {}))
    o.llm && (n += o.llm.tokensIn ?? 0, r += o.llm.tokensOut ?? 0);
  return { tokensIn: n, tokensOut: r };
}
function Pl(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function El(e, n) {
  const r = [];
  for (const o of Object.values(e.steps ?? {}))
    o.llm && r.push({
      model: n.get(o.nodeId),
      tokensIn: o.llm.tokensIn,
      tokensOut: o.llm.tokensOut
    });
  return at(r).total.totalCostUsd;
}
function Sn(e, n) {
  if (e.length === 0) return 0;
  const r = Math.min(e.length - 1, Math.floor(e.length * n));
  return e[r];
}
function Tn(e) {
  return e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function An(e) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? `$${n.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function Ol(e) {
  return e.slice(0, 8);
}
function Ll(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function _l(e, n) {
  const r = e.length;
  let o = 0, s = 0, i = 0;
  const c = [];
  let d = 0, l = 0, p = 0;
  const f = /* @__PURE__ */ new Map();
  for (const u of e) {
    u.status === "completed" ? o++ : u.status === "failed" ? s++ : u.status === "cancelled" && i++, typeof u.durationMs == "number" && u.durationMs > 0 && c.push(u.durationMs);
    const v = Gn(u);
    if (d += v.tokensIn, l += v.tokensOut, p += El(u, n), u.error?.message) {
      const N = u.error.message.slice(0, 48), w = f.get(N);
      w ? (w.count += 1, u.startedAt > w.lastSeenAt && (w.lastSeenAt = u.startedAt, w.exampleRunId = u.id)) : f.set(N, { count: 1, lastSeenAt: u.startedAt, exampleRunId: u.id });
    }
  }
  c.sort((u, v) => u - v);
  const h = Sn(c, 0.5), m = Sn(c, 0.95), x = r === 0 ? 0 : Math.round(o / r * 100), g = [...f.entries()].map(([u, v]) => ({ key: u, count: v.count, lastSeenAt: v.lastSeenAt, exampleRunId: v.exampleRunId })).sort((u, v) => v.count - u.count).slice(0, 5);
  return {
    totalCount: r,
    completedCount: o,
    failedCount: s,
    cancelledCount: i,
    successRatePct: x,
    medianMs: h,
    p95Ms: m,
    tokensIn: d,
    tokensOut: l,
    tokensPerRun: r === 0 ? 0 : Math.round((d + l) / r),
    totalCost: p,
    costPerRun: r === 0 ? 0 : p / r,
    failureBreakdown: g
  };
}
function Ul(e) {
  return e >= 90 ? "#16a34a" : e >= 70 ? "#f59e0b" : "#dc2626";
}
function Bl(e) {
  const n = [...e].sort((l, p) => l.startedAt.localeCompare(p.startedAt)), r = [], o = [], s = [];
  let i = 0, c = 0, d = 0;
  for (const l of n) {
    const p = new Date(l.startedAt).getTime();
    l.status === "completed" ? i += 1 : l.status === "failed" ? c += 1 : l.status === "cancelled" && (d += 1), r.push({ x: p, y: i }), o.push({ x: p, y: c }), s.push({ x: p, y: d });
  }
  return [
    { label: "Completed", data: r, color: "#16a34a" },
    { label: "Failed", data: o, color: "#dc2626" },
    { label: "Cancelled", data: s, color: "#d1d5db" }
  ];
}
function Fl(e, n) {
  const o = [...e].sort((i, c) => i.startedAt.localeCompare(c.startedAt)).filter((i) => typeof i.durationMs == "number" && i.durationMs > 0).map((i) => ({ x: new Date(i.startedAt).getTime(), y: i.durationMs })), s = o.map((i) => ({ x: i.x, y: n }));
  return [
    { label: "Duration (ms)", data: o, color: "#646cff" },
    { label: "p50", data: s, color: "#94a3b8" }
  ];
}
function jl(e) {
  const n = [...e].sort((s, i) => s.startedAt.localeCompare(i.startedAt)), r = [], o = [];
  for (const s of n) {
    const i = new Date(s.startedAt).getTime(), { tokensIn: c, tokensOut: d } = Gn(s);
    r.push({ x: i, y: c }), o.push({ x: i, y: d });
  }
  return [
    { label: "Tokens in", data: r, color: "#646cff" },
    { label: "Tokens out", data: o, color: "#16a34a" }
  ];
}
function kd() {
  const { pipelineId: e } = nt(), n = Me(), [r, o] = R(null), [s, i] = R([]), [c, d] = R("50");
  J(() => {
    e && (o(Ye(e)), i(yt(e)));
  }, [e]);
  const l = B(() => {
    if (c === "all") return s;
    const u = Number(c);
    return s.slice(0, u);
  }, [s, c]), p = B(() => Pl(r), [r]), f = B(() => _l(l, p), [l, p]), h = B(
    () => Ci(l, r).filter((u) => u.totalCostUsd > 0 || u.stepCount > 0),
    [l, r]
  ), m = B(() => Ti(s, r, 30), [s, r]), x = B(
    () => [
      {
        label: "Daily spend",
        data: m.map((u) => ({ x: u.ts, y: u.totalCostUsd })),
        color: "#646cff"
      }
    ],
    [m]
  );
  if (!e) return /* @__PURE__ */ t(rt, { to: "/pipelines", replace: !0 });
  if (!r)
    return /* @__PURE__ */ t("div", { className: "p-8", children: /* @__PURE__ */ t(
      Oe,
      {
        icon: "🔍",
        title: "Pipeline not found",
        body: "It may have been deleted. Go back to the pipelines list.",
        actionLabel: "Back to pipelines",
        onAction: () => n("/pipelines")
      }
    ) });
  const g = l.length > 0;
  return /* @__PURE__ */ a("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ a("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ a(
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
          children: ["10", "50", "all"].map((u) => /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => d(u),
              className: A(
                "px-2.5 py-1 text-xs font-medium rounded cursor-pointer font-[inherit]",
                c === u ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"
              ),
              children: u === "all" ? "All" : `Last ${u}`
            },
            u
          ))
        }
      )
    ] }),
    g ? /* @__PURE__ */ a(X, { children: [
      /* @__PURE__ */ a(
        "div",
        {
          className: "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3",
          "data-testid": "stats-kpis",
          children: [
            /* @__PURE__ */ a("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Success rate" }),
              /* @__PURE__ */ a(
                "div",
                {
                  className: "text-[22px] font-bold font-mono",
                  style: { color: Ul(f.successRatePct) },
                  "data-testid": "stats-success-rate",
                  children: [
                    f.completedCount,
                    "/",
                    f.totalCount,
                    " (",
                    f.successRatePct,
                    "%)"
                  ]
                }
              ),
              /* @__PURE__ */ a("div", { className: "text-xs text-text-tertiary font-mono", children: [
                f.failedCount,
                " failed · ",
                f.cancelledCount,
                " cancelled"
              ] })
            ] }),
            /* @__PURE__ */ a("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Median duration" }),
              /* @__PURE__ */ t("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: ve(f.medianMs) }),
              /* @__PURE__ */ a("div", { className: "text-xs text-text-tertiary font-mono", children: [
                "p95 · ",
                ve(f.p95Ms)
              ] })
            ] }),
            /* @__PURE__ */ a("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Total tokens" }),
              /* @__PURE__ */ a("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: [
                f.tokensIn.toLocaleString(),
                " → ",
                f.tokensOut.toLocaleString()
              ] }),
              /* @__PURE__ */ a("div", { className: "text-xs text-text-tertiary font-mono", children: [
                f.tokensPerRun.toLocaleString(),
                " avg per run"
              ] })
            ] }),
            /* @__PURE__ */ a("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Total cost" }),
              /* @__PURE__ */ t("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: Tn(f.totalCost) }),
              /* @__PURE__ */ a("div", { className: "text-xs text-text-tertiary font-mono", children: [
                Tn(f.costPerRun),
                " avg per run"
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ a(
        "div",
        {
          className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3",
          "data-testid": "stats-cost-row",
          children: [
            /* @__PURE__ */ a("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-by-node", children: [
              /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Cost by node" }),
              h.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary py-2", children: "No per-node cost data in this range." }) : /* @__PURE__ */ t(
                $r,
                {
                  data: h.map((u) => ({
                    label: u.label,
                    cost: Number(u.totalCostUsd.toFixed(6))
                  })),
                  xKey: "label",
                  yKey: "cost",
                  height: 200,
                  color: "#646cff",
                  yFormat: An
                }
              )
            ] }),
            /* @__PURE__ */ a("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-trend-30d", children: [
              /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "30-day spend trend" }),
              /* @__PURE__ */ t(
                gt,
                {
                  series: x,
                  height: 200,
                  xFormat: (u) => new Date(Number(u)).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric"
                  }),
                  yFormat: An
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ a("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3", children: [
        /* @__PURE__ */ a("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Runs over time (cumulative)" }),
          /* @__PURE__ */ t(
            gt,
            {
              series: Bl(l),
              height: 180,
              xFormat: (u) => new Date(Number(u)).toLocaleDateString()
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Duration over time" }),
          /* @__PURE__ */ t(
            gt,
            {
              series: Fl(l, f.medianMs),
              height: 180,
              xFormat: (u) => new Date(Number(u)).toLocaleDateString(),
              yFormat: (u) => ve(u)
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Token usage over time" }),
          /* @__PURE__ */ t(
            gt,
            {
              series: jl(l),
              height: 180,
              xFormat: (u) => new Date(Number(u)).toLocaleDateString(),
              yFormat: (u) => u.toLocaleString()
            }
          )
        ] }),
        /* @__PURE__ */ a("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-failure-breakdown", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Failure breakdown (top 5)" }),
          f.failureBreakdown.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary py-2", children: "No failures in this range." }) : /* @__PURE__ */ a("table", { className: "w-full border-collapse text-xs", children: [
            /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: "text-left", children: ["Error", "Count", "Last seen", "Example"].map((u) => /* @__PURE__ */ t(
              "th",
              {
                className: "px-2 py-1.5 text-[10px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
                children: u
              },
              u
            )) }) }),
            /* @__PURE__ */ t("tbody", { children: f.failureBreakdown.map((u) => /* @__PURE__ */ a("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ t(
                "td",
                {
                  className: "px-2 py-1.5 text-text-primary max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap",
                  title: u.key,
                  children: u.key
                }
              ),
              /* @__PURE__ */ t("td", { className: "px-2 py-1.5 font-mono text-text-primary", children: u.count }),
              /* @__PURE__ */ t("td", { className: "px-2 py-1.5 text-text-secondary", children: Ll(u.lastSeenAt) }),
              /* @__PURE__ */ t("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ a(
                "button",
                {
                  type: "button",
                  onClick: () => n(`/pipelines/${e}/runs/${u.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    Ol(u.exampleRunId),
                    " →"
                  ]
                }
              ) })
            ] }, u.key)) })
          ] })
        ] })
      ] })
    ] }) : /* @__PURE__ */ t(
      Oe,
      {
        icon: "📊",
        title: "No runs yet",
        body: "No runs yet. Trigger this pipeline to see stats."
      }
    )
  ] });
}
function ql(e) {
  const n = new Date(e).getTime();
  if (!Number.isFinite(n) || n <= 0) return "—";
  const r = Math.floor((Date.now() - n) / 1e3);
  if (r < 10) return "just now";
  if (r < 60) return `${r}s ago`;
  const o = Math.floor(r / 60);
  if (o < 60) return `${o}m ago`;
  const s = Math.floor(o / 60);
  return s < 24 ? `${s}h ago` : `${Math.floor(s / 24)}d ago`;
}
function zl(e) {
  return e.length <= 6 ? e : e.slice(-6);
}
function Hl({ approver: e, idx: n }) {
  const r = e.type === "role" ? "🎖" : "👤";
  return /* @__PURE__ */ a(
    "span",
    {
      className: "inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-sm text-[11px] font-semibold leading-[1.4] whitespace-nowrap",
      children: [
        /* @__PURE__ */ t("span", { "aria-hidden": !0, children: r }),
        /* @__PURE__ */ t("span", { children: e.value })
      ]
    },
    `${e.type}:${e.value}:${n}`
  );
}
function Kl(e, n) {
  const r = [];
  if (e) {
    const o = e.steps;
    for (const [s, i] of Object.entries(e))
      s === "steps" || i == null || i === "" || (typeof i == "string" ? r.push({ label: s, value: i }) : typeof i == "object" && r.push({ label: s, value: JSON.stringify(i, null, 2) }));
    if (o && typeof o == "object")
      for (const [s, i] of Object.entries(o)) {
        if (i == null) continue;
        const c = i;
        typeof c.response == "string" && c.response.trim() && r.push({ label: `Step ${s.slice(0, 8)} response`, value: c.response });
      }
  }
  if (r.length === 0 && n)
    for (const [o, s] of Object.entries(n)) {
      const i = s.output;
      if (i)
        for (const [c, d] of Object.entries(i))
          d == null || d === "" || c === "tokensIn" || c === "tokensOut" || typeof d == "string" && d.trim() && r.push({ label: c, value: d });
    }
  return r;
}
function Wl({ row: e, onSubmit: n, onOpenPipeline: r }) {
  const [o, s] = R(""), i = P(
    (p) => {
      n(p, o.trim()), s("");
    },
    [o, n]
  ), c = e.requiredCount ?? 1, d = e.recordedCount ?? 0, l = B(() => Kl(e.runContext, e.runSteps), [e.runContext, e.runSteps]);
  return /* @__PURE__ */ a("div", { "data-testid": `approval-card-${e.runId}`, className: "flex flex-col gap-3 p-4 bg-surface border border-border rounded-[10px]", children: [
    /* @__PURE__ */ a("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center gap-2.5 min-w-0", children: [
        /* @__PURE__ */ t("span", { className: "text-lg", "aria-hidden": !0, children: "✋" }),
        /* @__PURE__ */ a("div", { className: "min-w-0", children: [
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
          /* @__PURE__ */ a("div", { className: "font-mono text-[11px] text-text-tertiary", children: [
            "run #",
            zl(e.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: ql(e.requestedAt) })
    ] }),
    e.message ? /* @__PURE__ */ t("div", { "data-testid": `approval-message-${e.runId}`, className: "text-[13px] text-text-secondary bg-[#fafbfc] px-3 py-2 rounded-md leading-normal", children: e.message }) : null,
    /* @__PURE__ */ a("div", { className: "flex flex-col gap-1.5 px-3 py-2.5 bg-[#fafbfc] rounded-md border border-border", children: [
      /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: l.length > 0 ? "Context" : "Run details" }),
      l.length > 0 ? l.map(({ label: p, value: f }) => /* @__PURE__ */ a("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: p }),
        /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: f })
      ] }, p)) : /* @__PURE__ */ a(X, { children: [
        /* @__PURE__ */ a("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: "Run" }),
          /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: e.runId })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: "Step" }),
          /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: e.stepId })
        ] }),
        /* @__PURE__ */ a("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: "Status" }),
          /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: "Awaiting your approval — upstream steps haven't produced reviewable output yet (or this approval node runs in parallel with them)." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a("div", { className: "flex flex-wrap gap-1.5 items-center", children: [
      /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Approvers:" }),
      e.approvers.length === 0 ? /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : e.approvers.map((p, f) => /* @__PURE__ */ t(Hl, { approver: p, idx: f }, f)),
      c > 1 ? /* @__PURE__ */ a("span", { className: "text-[11px] text-text-tertiary ml-1", children: [
        "(",
        d,
        "/",
        c,
        " approvals)"
      ] }) : null
    ] }),
    /* @__PURE__ */ t(
      "textarea",
      {
        "data-testid": `approval-comment-${e.runId}`,
        value: o,
        onChange: (p) => s(p.target.value),
        placeholder: "Optional comment…",
        rows: 2,
        className: "w-full px-3 py-2 text-[13px] font-[inherit] border border-border-field rounded-md bg-[#f9fafb] text-text-primary outline-none resize-y"
      }
    ),
    /* @__PURE__ */ a("div", { className: "flex gap-2 justify-end", children: [
      /* @__PURE__ */ t("button", { "data-testid": `reject-${e.runId}`, onClick: () => i("reject"), className: "px-3.5 py-1.5 text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-md font-[inherit] cursor-pointer", children: "Reject" }),
      /* @__PURE__ */ t("button", { "data-testid": `approve-${e.runId}`, onClick: () => i("approve"), className: "px-3.5 py-1.5 text-[13px] font-semibold bg-[#16a34a] text-white border-none rounded-md font-[inherit] cursor-pointer shrink-0", children: "Approve" })
    ] })
  ] });
}
function Cd() {
  const e = Me(), { approvals: n, isLoading: r, error: o, retry: s } = mr(), { resolveApproval: i, runs: c } = st(), [d, l] = R(
    () => /* @__PURE__ */ new Set()
  );
  J(() => {
    if (d.size === 0) return;
    const u = new Set(n.map((w) => `${w.runId}::${w.stepId}`));
    let v = !1;
    const N = new Set(d);
    for (const w of d)
      u.has(w) || (N.delete(w), v = !0);
    v && l(N);
  }, [n, d]);
  const [p, f] = R({}), h = ae(/* @__PURE__ */ new Set());
  J(() => {
    for (const u of n)
      h.current.has(u.runId) || (h.current.add(u.runId), fr(u.pipelineId, u.runId).then((v) => {
        v && f((N) => ({
          ...N,
          [u.runId]: { context: v.context, steps: v.steps }
        }));
      }));
  }, [n]);
  const m = B(() => {
    const u = /* @__PURE__ */ new Map(), v = [];
    for (const N of n) {
      const w = `${N.runId}::${N.stepId}`;
      if (d.has(w)) continue;
      let C = u.get(N.pipelineId);
      C === void 0 && (C = Ye(N.pipelineId), u.set(N.pipelineId, C));
      const b = C?.name ?? (N.pipelineId ? `Pipeline ${N.pipelineId.slice(0, 8)}` : "Unknown pipeline"), y = p[N.runId]?.context ?? c[N.runId]?.context, k = p[N.runId]?.steps;
      v.push({ ...N, pipelineName: b, runContext: y, runSteps: k });
    }
    return v;
  }, [n, d, c, p]), x = P(
    (u, v, N, w, C) => {
      i(v, N, w, C || void 0), l((b) => {
        const y = new Set(b);
        return y.add(`${v}::${N}`), y;
      }), fetch(`/api/pipelines/${encodeURIComponent(v)}/approvals`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: N, decision: w, ...C ? { comment: C } : {} })
      }).catch((b) => {
        console.error("[approvals] POST failed", b);
      }), e(`/pipelines/${u}/runs/${v}`);
    },
    [i, e]
  ), g = m.length;
  return /* @__PURE__ */ a("div", { "data-testid": "pending-approvals-page", className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-[inherit]", children: [
    /* @__PURE__ */ t("div", { className: "h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]", children: /* @__PURE__ */ a("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ t("div", { className: "text-lg font-bold text-text-primary", children: "Pending approvals" }),
      /* @__PURE__ */ t(xe, { "data-testid": "pending-count", tone: g > 0 ? "warning" : "neutral", size: "sm", children: g })
    ] }) }),
    /* @__PURE__ */ a("div", { className: "flex-1 overflow-y-auto p-5", children: [
      o ? /* @__PURE__ */ a("div", { "data-testid": "approvals-error", role: "alert", className: "px-4 py-3 bg-[#fef2f2] border border-[#dc2626] text-[#dc2626] rounded-lg flex items-center justify-between gap-3 mb-4", children: [
        /* @__PURE__ */ t("span", { className: "text-[13px] font-medium", children: "Couldn't load pending approvals. Try again." }),
        /* @__PURE__ */ t("button", { "data-testid": "approvals-retry", onClick: s, className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[#dc2626] border border-[#dc2626] rounded-md cursor-pointer font-[inherit]", children: "Retry" })
      ] }) : null,
      r && g === 0 ? /* @__PURE__ */ a("div", { "data-testid": "approvals-loading", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: [
        /* @__PURE__ */ t(Ct, { height: 140 }),
        /* @__PURE__ */ t(Ct, { height: 140 }),
        /* @__PURE__ */ t(Ct, { height: 140 })
      ] }) : g === 0 && !o ? /* @__PURE__ */ t(
        Oe,
        {
          icon: "✋",
          title: "No pending approvals",
          body: "When a pipeline reaches an approval step, it'll show up here.",
          testId: "approvals-empty"
        }
      ) : /* @__PURE__ */ t("div", { "data-testid": "approvals-list", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: m.map((u) => /* @__PURE__ */ t(
        Wl,
        {
          row: u,
          onOpenPipeline: () => e(`/pipelines/${u.pipelineId}`),
          onSubmit: (v, N) => x(u.pipelineId, u.runId, u.stepId, v, N)
        },
        `${u.runId}:${u.stepId}`
      )) })
    ] })
  ] });
}
export {
  Xr as ActionNode,
  wd as AllRunsPage,
  ro as ApprovalNode,
  Ce as BaseNode,
  Gr as ConditionNode,
  Td as EventStreamProvider,
  Qr as ForkNode,
  to as JoinNode,
  Kr as LLMNode,
  Cd as PendingApprovalsPage,
  Bo as PipelineCanvas,
  er as PipelineEditorContext,
  xd as PipelineEditorPage,
  $n as PipelineEditorProvider,
  vd as PipelineRunComparePage,
  Nd as PipelineRunDiff,
  yd as PipelineRunReplayPage,
  bd as PipelineRunsPage,
  cr as PipelineRunsProvider,
  kd as PipelineStatsPage,
  gd as PipelinesPage,
  Vr as TransformNode,
  qr as TriggerNode,
  mo as nodeTypes,
  $e as useEventStream,
  Rr as useEventStreamContext,
  ke as useLatestStepForNode,
  ot as usePipelineEditor,
  st as usePipelineRuns,
  Te as useRetryFromStep
};
