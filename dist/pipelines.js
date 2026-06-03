import { jsxs as i, jsx as t, Fragment as G } from "react/jsx-runtime";
import $n, { useState as D, useRef as re, useMemo as _, useEffect as J, useCallback as P, useContext as Zn } from "react";
import { useNavigate as Me, useParams as nt, Navigate as rt, useSearchParams as kt } from "react-router";
import { o as ke, p as Te, q as ot, u as st, g as er, f as tr, e as Wt, n as nr, t as rr, k as Mn, a as Ye, v as Pn, w as _t, x as Pt, y as En, z as or, A as sr, B as ir, b as ar, C as Xe, D as lr, E as dr, F as Qe, G as Vt, H as cr, h as pr, m as On, I as vt, J as ur, j as Jt, P as mr, K as fr, r as hr, L as Nt, l as Gt, M as xr, i as gr } from "./pipelineAudit-BFARhgAC.js";
import { Handle as ee, Position as te, useNodeConnections as br, getSmoothStepPath as yr, EdgeLabelRenderer as vr, ReactFlowProvider as Nr, useReactFlow as wr, useNodesState as kr, useEdgesState as Cr, ReactFlow as Ir, Background as Sr, BackgroundVariant as Tr, Controls as Ar, MiniMap as Rr } from "@xyflow/react";
/* empty css               */
import { c as S } from "./cn-B6yFEsav.js";
import { u as Ut, a as Ct } from "./ToastProvider-aHBNxMTO.js";
import "clsx";
import "tailwind-merge";
import { M as Fe } from "./Modal-2jg4229_.js";
import "react-dom";
import "./WebSocketContext-DPGFyPeZ.js";
import { u as Dr, I as $r, C as Bt, T as Mr, S as Ln } from "./TagEditor-CSYE5gVg.js";
import { a as Re, u as Pr } from "./EventStreamContext-CjzSHXy-.js";
import { E as Vd } from "./EventStreamContext-CjzSHXy-.js";
import { a as Ue, B as Ze } from "./Banner-B8AcwPH_.js";
import { I as ct } from "./IconButton-Da1kJ5WO.js";
import { u as jt } from "./IdentityContext-CLalsm_M.js";
import { C as ne } from "./Chip-BXdhqVFm.js";
import { E as Oe } from "./EmptyState-PM9wTjxk.js";
import { C as Et } from "./ConfirmDialog-CNoxvYGu.js";
import { B as Er, L as gt } from "./Chart-ByoxeiYX.js";
import { S as It } from "./SkeletonCard-C89GWQ3p.js";
const Or = "";
function Yt(e, n) {
  const r = e.displayName;
  return typeof r == "string" && r.length > 0 ? r : n.slice(0, 8);
}
function Lr({ value: e, onChange: n, placeholder: r, maxSelect: o }) {
  const { presenceUsers: s } = Dr(), { idToken: a } = jt(), [c, d] = D(""), [l, p] = D(!1), [m, x] = D(0), [f, h] = D([]), g = re(null), u = re(null), y = _(() => {
    const I = new Set(e), A = [];
    for (const $ of s)
      I.has($.clientId) || (I.add($.clientId), A.push({
        userId: $.clientId,
        displayName: Yt($.metadata, $.clientId)
      }));
    return A;
  }, [s, e]);
  J(() => {
    const I = c.trim();
    if (!I || !a) {
      h([]);
      return;
    }
    const A = new AbortController(), $ = setTimeout(() => {
      const q = `${Or}/api/profiles?q=${encodeURIComponent(I)}&limit=20`;
      fetch(q, {
        headers: { Authorization: `Bearer ${a}` },
        signal: A.signal
      }).then((V) => V.ok ? V.json() : Promise.reject(new Error(`HTTP ${V.status}`))).then((V) => {
        h(Array.isArray(V.profiles) ? V.profiles : []);
      }).catch(() => {
      });
    }, 250);
    return () => {
      clearTimeout($), A.abort();
    };
  }, [c, a]);
  const N = _(() => {
    const I = new Set(e), A = [];
    for (const $ of y)
      I.has($.userId) || (I.add($.userId), A.push($));
    for (const $ of f)
      I.has($.userId) || (I.add($.userId), A.push({
        userId: $.userId,
        displayName: $.displayName || $.userId.slice(0, 8)
      }));
    return A;
  }, [y, f, e]), v = _(() => {
    const I = c.trim().toLowerCase();
    return I ? N.filter(
      (A) => A.displayName.toLowerCase().includes(I) || A.userId.toLowerCase().includes(I)
    ) : N;
  }, [N, c]), C = typeof o == "number" && e.length >= o, b = (I) => {
    const A = I.trim();
    A && (e.includes(A) || C || (n([...e, A]), d(""), x(0)));
  }, w = (I) => {
    n(e.filter((A) => A !== I));
  }, k = (I) => {
    if (I.key === "ArrowDown")
      I.preventDefault(), p(!0), x((A) => Math.min(A + 1, Math.max(v.length - 1, 0)));
    else if (I.key === "ArrowUp")
      I.preventDefault(), x((A) => Math.max(A - 1, 0));
    else if (I.key === "Enter") {
      I.preventDefault();
      const A = v[m];
      A ? b(A.userId) : c.trim() && b(c.trim());
    } else I.key === "Escape" ? p(!1) : I.key === "Backspace" && !c && e.length > 0 && w(e[e.length - 1]);
  }, R = (I) => {
    const A = s.find((q) => q.clientId === I);
    if (A) return Yt(A.metadata, I);
    const $ = f.find((q) => q.userId === I);
    return $ && $.displayName ? $.displayName : I;
  };
  return /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 font-[inherit]", children: [
    e.length > 0 && /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5", children: e.map((I) => /* @__PURE__ */ i(
      "span",
      {
        className: "inline-flex items-center gap-1 bg-[#eef2ff] border border-[#c7d2fe] text-[#3730a3] rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
        children: [
          R(I),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => w(I),
              "aria-label": `Remove ${R(I)}`,
              className: "bg-transparent border-none text-[#3730a3] cursor-pointer text-[14px] leading-none px-0.5 py-0",
              children: "×"
            }
          )
        ]
      },
      I
    )) }),
    /* @__PURE__ */ i("div", { className: "relative", children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: g,
          type: "text",
          value: c,
          disabled: C,
          placeholder: C ? `Max ${o} selected` : r ?? "Search users…",
          onChange: (I) => {
            d(I.target.value), p(!0), x(0);
          },
          onFocus: () => p(!0),
          onBlur: () => {
            u.current = setTimeout(() => p(!1), 120);
          },
          onKeyDown: k,
          className: "w-full py-1.5 px-2.5 text-[13px] border border-[#e2e8f0] rounded-md font-[inherit] box-border outline-none"
        }
      ),
      l && !C && v.length > 0 && /* @__PURE__ */ t(
        "div",
        {
          className: "absolute top-full left-0 right-0 bg-white border border-[#e2e8f0] rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] mt-1 max-h-[200px] overflow-y-auto z-10",
          onMouseDown: (I) => {
            I.preventDefault(), u.current && clearTimeout(u.current);
          },
          children: v.map((I, A) => /* @__PURE__ */ i(
            "div",
            {
              className: S(
                "py-1.5 px-2.5 text-[13px] text-[#374151] cursor-pointer",
                A === m ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              onMouseEnter: () => x(A),
              onClick: () => {
                b(I.userId), g.current?.focus();
              },
              children: [
                /* @__PURE__ */ t("span", { className: "font-medium", children: I.displayName }),
                I.displayName !== I.userId && /* @__PURE__ */ t("span", { className: "text-[#94a3b8] ml-2 text-[11px] font-mono", children: I.userId.slice(0, 12) })
              ]
            },
            I.userId
          ))
        }
      )
    ] })
  ] });
}
const _r = {
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
}, Ur = {
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
function Ot(e, n, r, o) {
  return !(!Br(e, n) || !jr(r, o));
}
function Br(e, n) {
  const r = _r[e];
  return r === "fork" ? Fr(n) : r.includes(n);
}
function jr(e, n) {
  const r = Ur[e];
  return r === null ? !1 : r === "join" ? zr(n) : r.includes(n);
}
function Fr(e) {
  return /^branch-(\d+)$/.exec(e) !== null;
}
function zr(e) {
  return /^in-(\d+)$/.exec(e) !== null;
}
const qr = {
  idle: { card: "border border-[#d1d5db] bg-white", dot: "bg-[#d1d5db]" },
  pending: { card: "border border-dashed border-[#93c5fd] bg-[#eff6ff]", dot: "bg-[#93c5fd]" },
  running: { card: "border-2 border-[#2563eb] bg-[#eff6ff]", dot: "bg-[#2563eb]" },
  awaiting: { card: "border-2 border-[#f59e0b] bg-[#fffbeb]", dot: "bg-[#f59e0b]" },
  completed: { card: "border border-[#16a34a] bg-[#f0fdf4]", dot: "bg-[#16a34a]" },
  failed: { card: "border-2 border-[#dc2626] bg-[#fef2f2]", dot: "bg-[#dc2626]" },
  skipped: { card: "border border-dashed border-[#d1d5db] bg-[#f9fafb] opacity-50", dot: "bg-[#d1d5db]" }
};
function Ce(e) {
  const { icon: n, subtitle: r, state: o, body: s, footer: a, selected: c, onRetry: d, hasBreakpoint: l, pausedAtBreakpoint: p, ariaLabel: m, children: x } = e, f = qr[o], h = Ut(), [g, u] = D(!1), y = o === "failed" && typeof d == "function", N = (k) => {
    k.preventDefault(), k.stopPropagation(), d?.();
  }, v = !h && o === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !h && o === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", C = !!(s || a || y), b = !!(s || a), w = r ? `${r}, state: ${o}` : `Node, state: ${o}`;
  return /* @__PURE__ */ i(
    "div",
    {
      className: S(
        "w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        p ? "border-2 border-[#d97706] bg-[#fffbeb] shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]" : f.card,
        !p && c && "shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]",
        !p && !c && "shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
        h && "transition-none"
      ),
      role: "button",
      tabIndex: 0,
      "aria-label": m ?? w,
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
        /* @__PURE__ */ i("div", { className: S(
          "flex items-center gap-2 h-7 px-2.5",
          C && "border-b border-border"
        ), children: [
          /* @__PURE__ */ t("span", { className: "text-sm leading-none shrink-0", "aria-hidden": "true", children: n }),
          /* @__PURE__ */ t("span", { className: "flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap", children: r }),
          /* @__PURE__ */ t(
            "span",
            {
              className: S("w-2 h-2 rounded-full shrink-0", f.dot, v),
              "aria-label": `state: ${o}`
            }
          )
        ] }),
        y && /* @__PURE__ */ t("div", { className: S(
          "flex px-2.5 py-1.5",
          b && "border-b border-border"
        ), children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: S(
              "cursor-pointer appearance-none font-inherit text-[11px] font-medium leading-tight px-2 py-0.5 rounded-full border border-[#dc2626] text-[#dc2626] transition-colors duration-[120ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              g ? "bg-[#fef2f2]" : "bg-transparent",
              h && "transition-none"
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
        a != null && /* @__PURE__ */ t("div", { className: "border-t border-border px-2.5 py-1.5 text-xs text-text-secondary", children: a }),
        x
      ]
    }
  );
}
function Xt(e) {
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
function Hr(e) {
  return e.triggerType === "schedule" ? e.schedule ? `cron: ${e.schedule}` : "No schedule set" : e.triggerType === "webhook" ? e.webhookPath ? `POST ${e.webhookPath}` : "No path set" : e.triggerType.startsWith("document.") ? e.documentTypeId ? `Doc type: ${e.documentTypeId}` : "Any document" : "Fires on user click";
}
function Kr(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), a = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? a ?? r._state ?? "idle", l = Te(), p = d === "failed" ? () => l(n) : void 0, m = `Trigger node, ${Xt(r)}, state: ${d}`;
  return /* @__PURE__ */ t(
    Ce,
    {
      icon: "▶",
      subtitle: Xt(r),
      state: d,
      body: /* @__PURE__ */ t("span", { className: "italic", children: Hr(r) }),
      selected: o,
      onRetry: p,
      ariaLabel: m,
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
function Wr(e) {
  if (!e || e.trim().length === 0) return "Not configured";
  const r = e.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
function Vr({ info: e }) {
  const [n, r] = D(!1), o = n ? e.response : e.response.length > 60 ? `${e.response.slice(0, 60)}…` : e.response, s = e.tokensIn != null || e.tokensOut != null;
  return /* @__PURE__ */ i("div", { children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => r((a) => !a),
        className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-xs text-text-secondary font-medium text-left",
        children: [
          n ? "▾" : "▸",
          " Response",
          s && /* @__PURE__ */ i("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: [
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
function Jr(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), a = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? a ?? r._state ?? "idle", l = s?.llm, p = d === "running" && l?.streamOpened === !0 && (l?.tokensOut ?? 0) === 0, m = d === "running" && l !== void 0 && (l.tokensOut ?? 0) > 0, x = Te(), f = d === "failed" ? () => x(n) : void 0, h = /* @__PURE__ */ t("span", { className: "italic", children: Wr(r.userPromptTemplate) }), u = (l ? {
    response: l.response ?? "",
    tokensIn: l.tokensIn,
    tokensOut: l.tokensOut,
    streaming: m,
    streamOpening: p
  } : void 0) ?? r._llmResponse, y = u ? /* @__PURE__ */ t(Vr, { info: u }) : void 0, N = (r.systemPrompt ?? "").replace(/\s+/g, " ").trim(), v = N.length === 0 ? "no system prompt" : `system prompt: ${N.length > 60 ? `${N.slice(0, 60)}…` : N}`, C = `LLM node, ${r.model || r.provider}, ${v}, state: ${d}`;
  return /* @__PURE__ */ i(
    Ce,
    {
      icon: "🧠",
      subtitle: r.model || r.provider,
      state: d,
      body: h,
      footer: y,
      selected: o,
      onRetry: f,
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
function Gr(e) {
  if (!e) return "—";
  const n = e.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function Yr(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), a = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? a ?? r._state ?? "idle", l = Te(), p = d === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ i(
    Ce,
    {
      icon: "✨",
      subtitle: r.transformType,
      state: d,
      body: /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Gr(r.expression) }),
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
function Xr(e) {
  if (!e) return "—";
  const n = e.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function Qr(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), a = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? a ?? r._state ?? "idle", l = Te(), p = d === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ i(
    Ce,
    {
      icon: "❓",
      subtitle: r.label || "condition",
      state: d,
      body: /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: Xr(r.expression) }),
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
function Zr(e) {
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
function eo(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), a = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? a ?? r._state ?? "idle", l = Te(), p = d === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ i(
    Ce,
    {
      icon: "⚡",
      subtitle: r.actionType,
      state: d,
      body: /* @__PURE__ */ t("span", { className: "italic", children: Zr(r) }),
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
function to(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), a = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? a ?? r._state ?? "idle", l = Te(), p = d === "failed" ? () => l(n) : void 0, m = Math.max(2, Math.min(8, r.branchCount ?? 2)), x = Array.from({ length: m }, (f, h) => {
    const g = r.branchLabels?.[h];
    return g && g.trim().length > 0 ? g : `branch ${h}`;
  });
  return /* @__PURE__ */ i(
    Ce,
    {
      icon: "⑂",
      subtitle: `${m} branches`,
      state: d,
      body: /* @__PURE__ */ t("ul", { className: "m-0 p-0 list-none flex flex-col gap-0.5 text-xs text-text-secondary", children: x.map((f, h) => /* @__PURE__ */ i("li", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: [
        "• ",
        f
      ] }, h)) }),
      selected: o,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(ee, { type: "target", position: te.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        x.map((f, h) => {
          const g = (h + 1) / (m + 1) * 100;
          return /* @__PURE__ */ t(
            ee,
            {
              type: "source",
              position: te.Right,
              id: `branch-${h}`,
              className: "!bg-blue-600 !w-2.5 !h-2.5",
              style: { top: `${g}%` }
            },
            h
          );
        })
      ]
    }
  );
}
function no(e) {
  return e.mode === "all" ? "all" : e.mode === "any" ? "any" : `${e.n ?? 1} of many`;
}
function ro(e) {
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
function oo(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), a = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? a ?? r._state ?? "idle", l = Te(), p = d === "failed" ? () => l(n) : void 0, m = br({ handleType: "target" }), x = Math.max(2, m.length + 1);
  return /* @__PURE__ */ i(
    Ce,
    {
      icon: "⑃",
      subtitle: no(r),
      state: d,
      body: /* @__PURE__ */ t("span", { className: "italic", children: ro(r.mergeStrategy) }),
      selected: o,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        Array.from({ length: x }, (f, h) => {
          const g = (h + 1) / (x + 1) * 100;
          return /* @__PURE__ */ t(
            ee,
            {
              type: "target",
              position: te.Left,
              id: `in-${h}`,
              className: "!bg-slate-300 !w-2.5 !h-2.5",
              style: { top: `${g}%` }
            },
            `in-${h}`
          );
        }),
        /* @__PURE__ */ t(ee, { type: "source", position: te.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5" })
      ]
    }
  );
}
function so(e) {
  return e.type === "role" ? `@${e.value}` : e.value;
}
function io(e) {
  const { id: n, data: r, selected: o } = e, s = ke(n), a = s?.status === "cancelled" ? "failed" : s?.status, d = (r._state && r._state !== "idle" ? r._state : void 0) ?? a ?? r._state ?? "idle", l = Te(), p = d === "failed" ? () => l(n) : void 0, m = r.approvers ?? [], x = m.length, f = r.requiredCount ?? 0, h = `${x} approver${x === 1 ? "" : "s"}, ${f}/${x} required`, g = m.slice(0, 2), u = Math.max(0, m.length - 2), y = m.length === 0 ? /* @__PURE__ */ t("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1", children: [
    g.map((N, v) => /* @__PURE__ */ t(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: so(N)
      },
      v
    )),
    u > 0 && /* @__PURE__ */ i("span", { className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-inset text-text-tertiary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap", children: [
      "+",
      u,
      " more"
    ] })
  ] });
  return /* @__PURE__ */ i(
    Ce,
    {
      icon: "✋",
      subtitle: h,
      state: d,
      body: y,
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
function ao({ id: e, data: n, selected: r }) {
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, a = n._state ?? s ?? "idle", c = Te(), d = n.agentName || n.agentId || "Not configured", l = `${n.protocol.toUpperCase()}${n.streaming ? " (streaming)" : ""}`;
  return /* @__PURE__ */ i(
    Ce,
    {
      icon: "🤖",
      subtitle: d,
      state: a,
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: a === "failed" && o ? () => c(e) : void 0,
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
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, a = n._state ?? s ?? "idle", c = Te(), d = n.toolName || "Not configured";
  return /* @__PURE__ */ i(
    Ce,
    {
      icon: "🔌",
      subtitle: d,
      state: a,
      body: n.gatewayUrl ? /* @__PURE__ */ t("span", { className: "text-[11px]", children: n.gatewayUrl }) : void 0,
      selected: r,
      onRetry: a === "failed" && o ? () => c(e) : void 0,
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
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, a = n._state ?? s ?? "idle", c = Te(), d = n.knowledgeBaseId || "Not configured", l = `Top ${n.topK} chunks${n.scoreThreshold ? ` (≥${n.scoreThreshold})` : ""}`;
  return /* @__PURE__ */ i(
    Ce,
    {
      icon: "📚",
      subtitle: d,
      state: a,
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: a === "failed" && o ? () => c(e) : void 0,
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
function po({ id: e, data: n, selected: r }) {
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, a = n._state ?? s ?? "idle", c = Te(), d = n.graphId || "Not configured", l = n.query.length > 40 ? `${n.query.slice(0, 37)}...` : n.query;
  return /* @__PURE__ */ i(
    Ce,
    {
      icon: "🕸️",
      subtitle: d,
      state: a,
      body: /* @__PURE__ */ t("span", { className: "text-[11px] font-mono", children: l }),
      selected: r,
      onRetry: a === "failed" && o ? () => c(e) : void 0,
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
function uo({ id: e, data: n, selected: r }) {
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, a = n._state ?? s ?? "idle", c = Te(), d = `${n.mode} ${n.scope}`, l = n.namespace ? `ns: ${n.namespace}` : "No namespace";
  return /* @__PURE__ */ i(
    Ce,
    {
      icon: "💾",
      subtitle: d,
      state: a,
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: a === "failed" && o ? () => c(e) : void 0,
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
function mo({ id: e, data: n, selected: r }) {
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, a = n._state ?? s ?? "idle", c = Te(), d = n.label || n.guardrailId || "Not configured";
  return /* @__PURE__ */ i(
    Ce,
    {
      icon: "🛡️",
      subtitle: d,
      state: a,
      body: /* @__PURE__ */ i("span", { className: "text-[11px]", children: [
        "Action: ",
        n.action
      ] }),
      selected: r,
      onRetry: a === "failed" && o ? () => c(e) : void 0,
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
function fo({ id: e, data: n, selected: r }) {
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, a = n._state ?? s ?? "idle", c = Te(), d = n.label || n.action || "Not configured";
  return /* @__PURE__ */ i(
    Ce,
    {
      icon: "📜",
      subtitle: d,
      state: a,
      body: /* @__PURE__ */ i("span", { className: "text-[11px]", children: [
        n.principal,
        " → ",
        n.resource
      ] }),
      selected: r,
      onRetry: a === "failed" && o ? () => c(e) : void 0,
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
function ho({ id: e, data: n, selected: r }) {
  const o = ke(e), s = o?.status === "cancelled" ? "failed" : o?.status, a = n._state ?? s ?? "idle", c = n.eventType === "CUSTOM" ? n.customEventName || "Custom" : n.eventType;
  return /* @__PURE__ */ t(
    Ce,
    {
      icon: "📡",
      subtitle: c,
      state: a,
      body: /* @__PURE__ */ i("span", { className: "text-[11px]", children: [
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
const xo = {
  trigger: Kr,
  llm: Jr,
  transform: Yr,
  condition: Qr,
  action: eo,
  fork: to,
  join: oo,
  approval: io,
  agent: ao,
  "mcp-tool": lo,
  "knowledge-base": co,
  "graph-query": po,
  memory: uo,
  guardrail: mo,
  policy: fo,
  "ag-ui-output": ho
};
function go(e) {
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
function bo({
  id: e,
  sourceX: n,
  sourceY: r,
  targetX: o,
  targetY: s,
  sourcePosition: a,
  targetPosition: c,
  data: d,
  markerEnd: l,
  selected: p
}) {
  const m = d ?? {}, x = Ut(), [f] = yr({
    sourceX: n,
    sourceY: r,
    targetX: o,
    targetY: s,
    sourcePosition: a,
    targetPosition: c
  }), h = go(m.state), g = h.animate && !x, u = p ? "#646cff" : h.stroke, y = p ? 2.5 : h.strokeWidth;
  return /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t(
      "path",
      {
        d: f,
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
        d: f,
        fill: "none",
        stroke: u,
        strokeWidth: y,
        strokeDasharray: g ? h.strokeDasharray : void 0,
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
    m.label ? /* @__PURE__ */ t(vr, { children: /* @__PURE__ */ t(
      "div",
      {
        className: S(
          "absolute pointer-events-auto px-2 py-0.5 rounded-full text-[10px] font-semibold leading-[1.4]",
          "bg-white text-[#475569] border border-[#e2e8f0] font-[inherit] whitespace-nowrap",
          "shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
        ),
        style: {
          // Pull the pill slightly downstream of the source handle so it
          // sits inside the edge route rather than on top of the node.
          transform: `translate(-50%, -50%) translate(${n + 28}px, ${r}px)`
        },
        children: m.label
      }
    ) }) : null
  ] });
}
function tt(e, n, r) {
  const o = re(n);
  o.current = n, J(() => {
    if (r === !1) return;
    const s = (a) => {
      e.current && !e.current.contains(a.target) && o.current();
    };
    return document.addEventListener("mousedown", s), () => document.removeEventListener("mousedown", s);
  }, [e, r]);
}
const yo = [
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
function vo(e, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return e.type.toLowerCase().includes(r) || e.name.toLowerCase().includes(r) || e.description.toLowerCase().includes(r);
}
function No({
  anchor: e,
  flowPosition: n,
  disabledTypes: r = [],
  onClose: o,
  onInsert: s
}) {
  const [a, c] = D(""), [d, l] = D(0), p = re(null), m = re(null), x = _(() => new Set(r), [r]), f = _(
    () => yo.filter((u) => !x.has(u.type) && vo(u, a)),
    [x, a]
  );
  if (J(() => {
    l((u) => u >= f.length ? 0 : u);
  }, [f.length]), J(() => {
    if (e) {
      const u = setTimeout(() => m.current?.focus(), 0);
      return () => clearTimeout(u);
    }
  }, [e]), tt(p, o, !!e), !e) return null;
  const h = (u) => {
    const y = f[u];
    !y || !n || (s(y.type, n), o());
  }, g = (u) => {
    if (u.key === "ArrowDown") {
      if (u.preventDefault(), f.length === 0) return;
      l((y) => (y + 1) % f.length);
    } else if (u.key === "ArrowUp") {
      if (u.preventDefault(), f.length === 0) return;
      l((y) => (y - 1 + f.length) % f.length);
    } else u.key === "Enter" ? (u.preventDefault(), h(d)) : u.key === "Escape" && (u.preventDefault(), o());
  };
  return /* @__PURE__ */ i(
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
            ref: m,
            type: "text",
            value: a,
            onChange: (u) => c(u.target.value),
            onKeyDown: g,
            placeholder: "Search nodes…",
            className: "w-full box-border border border-[#d1d5db] rounded-md px-2.5 py-1.5 text-[13px] font-inherit bg-[#f9fafb] text-[#0f172a] outline-none",
            "aria-label": "Search node types",
            "data-testid": "quick-insert-search"
          }
        ) }),
        /* @__PURE__ */ t("div", { className: "max-h-[260px] overflow-y-auto py-1", role: "listbox", children: f.length === 0 ? /* @__PURE__ */ i("div", { className: "px-3 py-3.5 text-xs text-[#94a3b8] font-inherit", children: [
          'No nodes match "',
          a,
          '"'
        ] }) : f.map((u, y) => {
          const N = y === d;
          return /* @__PURE__ */ i(
            "div",
            {
              role: "option",
              "aria-selected": N,
              onMouseEnter: () => l(y),
              onMouseDown: (v) => {
                v.preventDefault(), h(y);
              },
              className: S(
                "flex items-center gap-2.5 px-3 py-2 cursor-pointer font-inherit",
                N ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              "data-node-type": u.type,
              "data-testid": `quick-insert-row-${u.type}`,
              children: [
                /* @__PURE__ */ t("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: u.icon }),
                /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: [
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
function wo({
  addNode: e,
  addEdge: n,
  updateNodeData: r,
  getDefinition: o
}) {
  J(() => {
  }, [e, n, r, o]);
}
function ko({
  definition: e,
  selectedNodeId: n,
  setSelectedNodeId: r,
  removeNode: o,
  removeDefEdge: s,
  setNodes: a,
  setEdges: c,
  setPositions: d,
  duplicateNodes: l,
  clipboardRef: p,
  containerRef: m
}) {
  J(() => {
    const x = m.current;
    if (!x) return;
    const f = (g) => {
      const u = x.querySelector(
        `.react-flow__node[data-id="${CSS.escape(g)}"]`
      );
      return u ? ((u.querySelector('[data-pipeline-node="true"]') ?? u).focus(), !0) : !1;
    }, h = (g) => {
      if (Ft(g.target)) return;
      const u = document.activeElement, y = !!u && x.contains(u);
      if (g.key === "Tab") {
        if (!y || !e || e.nodes.length === 0) return;
        const N = Lo(e);
        if (N.length === 0) return;
        const C = u?.closest(".react-flow__node")?.getAttribute("data-id") ?? null, b = C !== null ? N.indexOf(C) : -1, w = g.shiftKey ? -1 : 1, k = b === -1 ? g.shiftKey ? N.length - 1 : 0 : (b + w + N.length) % N.length, R = N[k];
        f(R) && g.preventDefault();
        return;
      }
      if (y && !g.altKey) {
        if (g.key === "Enter" || g.key === " " || g.key === "Spacebar") {
          const v = u?.closest(".react-flow__node")?.getAttribute("data-id");
          v && (g.preventDefault(), r(v));
          return;
        }
        if (g.key === "Delete" || g.key === "Backspace") {
          if (n) {
            g.preventDefault(), o(n);
            return;
          }
          c((N) => {
            const v = N.filter((C) => C.selected);
            if (v.length === 0) return N;
            for (const C of v) s(C.id);
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
          const N = 8, v = g.key === "ArrowLeft" ? -N : g.key === "ArrowRight" ? N : 0, C = g.key === "ArrowUp" ? -N : g.key === "ArrowDown" ? N : 0;
          a((b) => {
            const w = b.map(
              (R) => R.id === n ? {
                ...R,
                position: {
                  x: R.position.x + v,
                  y: R.position.y + C
                }
              } : R
            ), k = w.find((R) => R.id === n);
            return k && d([{ id: k.id, position: k.position }]), w;
          });
        }
      }
    };
    return x.addEventListener("keydown", h), () => x.removeEventListener("keydown", h);
  }, [e, n, r, o, s, a, c, d, l, p, m]);
}
function Co({
  addNode: e,
  screenToFlowPosition: n
}) {
  const r = P((s) => {
    s.preventDefault(), s.dataTransfer.dropEffect = "move";
  }, []), o = P(
    (s) => {
      s.preventDefault();
      const a = s.dataTransfer.getData("application/reactflow");
      if (!a) return;
      let c = null;
      try {
        c = JSON.parse(a);
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
function Io({
  nodeMenu: e,
  breakpoints: n,
  showBreakpointOption: r,
  onFilterLog: o,
  onCopyNodeId: s,
  onDuplicate: a,
  onToggleBreakpoint: c,
  onDismiss: d
}) {
  J(() => {
    const p = (x) => {
      x.target?.closest('[data-testid="canvas-node-context-menu"]') || d();
    }, m = (x) => {
      x.key === "Escape" && d();
    };
    return document.addEventListener("mousedown", p), window.addEventListener("keydown", m), () => {
      document.removeEventListener("mousedown", p), window.removeEventListener("keydown", m);
    };
  }, [d]);
  const l = "block w-full text-left px-3 py-2 border-none bg-transparent text-[13px] cursor-pointer rounded font-inherit";
  return /* @__PURE__ */ i(
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
            className: S(l, "text-[#0f172a]"),
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
            className: S(l, "text-[#0f172a]"),
            children: "📋 Copy node id"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: a,
            "data-testid": "ctx-duplicate",
            className: S(l, "text-[#0f172a]"),
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
            className: S(
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
const _n = [
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
], Un = _n.flatMap((e) => e.items.map((n) => ({ type: n.type, name: n.name })));
function So(e, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return e.name.toLowerCase().includes(r) || e.type.toLowerCase().includes(r) || e.description.toLowerCase().includes(r);
}
function To({ disabledTypes: e = [] }) {
  const [n, r] = D(""), [o, s] = D(null), a = _(() => new Set(e), [e]), c = _(
    () => _n.map((l) => ({
      ...l,
      items: l.items.filter((p) => So(p, n))
    })).filter((l) => l.items.length > 0),
    [n]
  ), d = (l) => (p) => {
    if (a.has(l.type)) {
      p.preventDefault();
      return;
    }
    p.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: l.type })
    ), p.dataTransfer.effectAllowed = "move";
  };
  return /* @__PURE__ */ i("div", { className: "w-[220px] shrink-0 h-full border-r border-[#e2e8f0] bg-white flex flex-col", "data-testid": "node-palette", children: [
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
    /* @__PURE__ */ t("div", { className: "flex-1 overflow-y-auto py-2", children: c.length === 0 ? /* @__PURE__ */ i("div", { className: "px-3.5 py-4 text-xs text-[#94a3b8]", children: [
      'No nodes match "',
      n,
      '"'
    ] }) : c.map((l) => /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ t("div", { className: "pt-2 px-[14px] pb-1 text-[10px] font-bold tracking-[0.6px] uppercase text-[#94a3b8] font-[inherit]", children: l.name }),
      l.items.map((p) => {
        const m = a.has(p.type), x = o === p.type && !m, f = Un.findIndex((g) => g.type === p.type), h = f >= 0 && f < 9 ? f + 1 : null;
        return /* @__PURE__ */ i(
          "div",
          {
            draggable: !m,
            onDragStart: d(p),
            onMouseEnter: () => s(p.type),
            onMouseLeave: () => s(null),
            className: S(
              "h-11 box-border my-0.5 mx-2 py-1.5 px-[10px] flex items-center gap-[10px] rounded-[6px] border border-transparent font-[inherit]",
              m ? "cursor-not-allowed opacity-[0.45]" : "cursor-grab",
              x ? "bg-[#f1f5f9]" : "bg-transparent"
            ),
            title: m ? `${p.name} is already placed` : h ? `${p.description} — press ${h}` : p.description,
            "data-node-type": p.type,
            "data-disabled": m || void 0,
            children: [
              /* @__PURE__ */ t(
                "span",
                {
                  className: "text-[18px] leading-none w-[22px] text-center shrink-0",
                  "aria-hidden": !0,
                  children: p.icon
                }
              ),
              /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ i("div", { className: S("text-[13px] font-semibold text-text-primary flex items-center gap-1.5", m && "line-through"), children: [
                  /* @__PURE__ */ t("span", { children: p.name }),
                  h !== null && /* @__PURE__ */ t(
                    "kbd",
                    {
                      "data-testid": `palette-shortcut-${p.type}`,
                      className: S("text-[10px] font-semibold font-mono text-[#64748b] bg-[#f1f5f9] border border-[#e2e8f0] rounded px-[5px] leading-[14px] min-w-[14px] text-center", m ? "opacity-50" : "opacity-100"),
                      children: h
                    }
                  )
                ] }),
                /* @__PURE__ */ t("div", { className: "text-[11px] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis", children: m ? "Placed" : p.description })
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
function Ao({
  definition: e,
  addNode: n,
  screenToFlowPosition: r,
  containerRef: o
}) {
  return J(() => {
    const s = (a) => {
      if (!Ft(a.target) && !(a.metaKey || a.ctrlKey || a.altKey) && /^[1-8]$/.test(a.key)) {
        const c = Number(a.key) - 1, d = Un[c];
        if (!d || d.type === "trigger" && e?.nodes.some((h) => h.type === "trigger"))
          return;
        const p = o.current?.getBoundingClientRect(), m = p ? r({
          x: p.left + p.width / 2,
          y: p.top + p.height / 2
        }) : { x: 0, y: 0 };
        let { x, y: f } = m;
        if (e)
          for (const h of e.nodes)
            Math.abs(h.position.x - x) < 16 && Math.abs(h.position.y - f) < 16 && (x += 24, f += 24);
        n(d.type, { x, y: f }), a.preventDefault();
      }
    };
    return window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s);
  }, [n, e, r, o]), null;
}
const Ro = 280, Do = 120, $o = 40, Mo = 40;
function Po(e, n) {
  const r = Ro, o = Do, s = $o, a = Mo;
  if (e.nodes.length === 0) return [];
  const c = /* @__PURE__ */ new Map();
  for (const y of e.nodes)
    c.set(y.id, []);
  for (const y of e.edges) {
    const N = c.get(y.source);
    N && c.has(y.target) && N.push(y.target);
  }
  const l = e.nodes.filter((y) => y.type === "trigger").map((y) => y.id).sort()[0], p = /* @__PURE__ */ new Map();
  if (l !== void 0) {
    const y = [l];
    for (p.set(l, 0); y.length > 0; ) {
      const N = y.shift(), v = p.get(N), C = c.get(N) ?? [];
      for (const b of C)
        p.has(b) || (p.set(b, v + 1), y.push(b));
    }
  }
  const m = /* @__PURE__ */ new Map();
  let x = -1;
  for (const y of e.nodes) {
    const N = p.get(y.id);
    N !== void 0 && (m.has(N) || m.set(N, []), m.get(N).push(y.id), N > x && (x = N));
  }
  for (const y of m.values())
    y.sort();
  const f = e.nodes.filter((y) => !p.has(y.id)).map((y) => y.id).sort(), h = x >= 0 ? x + 1 : 0;
  f.length > 0 && m.set(h, f);
  const g = [], u = [...m.keys()].sort((y, N) => y - N);
  for (const y of u) {
    const N = m.get(y), v = N.length, C = s + y * r;
    for (let b = 0; b < v; b++) {
      const w = a + (b - v / 2) * o;
      g.push({ id: N[b], position: { x: C, y: w } });
    }
  }
  return g;
}
function Eo({
  definition: e,
  setPositions: n,
  fitView: r
}) {
  const o = P(() => {
    r({ padding: 0.15, duration: 500 });
  }, [r]), s = P(() => {
    if (!e) return;
    const a = Po(e);
    a.length !== 0 && (n(a), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => r({ padding: 0.15, duration: 500 })) : r({ padding: 0.15, duration: 500 }));
  }, [e, n, r]);
  return { handleFitView: o, handleAutoArrange: s };
}
function Oo({
  definition: e,
  setPositions: n,
  fitView: r
}) {
  const { handleFitView: o, handleAutoArrange: s } = Eo({
    definition: e,
    setPositions: n,
    fitView: r
  });
  return J(() => {
    const a = (c) => {
      const d = c.target;
      if (!(d && (d.tagName === "INPUT" || d.tagName === "TEXTAREA" || d.isContentEditable)) && c.shiftKey && (c.key === "A" || c.key === "a")) {
        if (c.metaKey || c.ctrlKey || c.altKey) return;
        c.preventDefault(), s();
      }
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [s]), /* @__PURE__ */ i(G, { children: [
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
function Ft(e) {
  if (!e || !(e instanceof HTMLElement)) return !1;
  const n = e.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || e.isContentEditable);
}
function Lo(e) {
  if (e.nodes.length === 0) return [];
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const a of e.nodes)
    n.set(a.id, []), r.set(a.id, 0);
  for (const a of e.edges)
    !n.has(a.source) || !r.has(a.target) || (n.get(a.source).push(a.target), r.set(a.target, (r.get(a.target) ?? 0) + 1));
  const o = [], s = e.nodes.filter((a) => (r.get(a.id) ?? 0) === 0).map((a) => a.id).sort();
  for (; s.length > 0; ) {
    const a = s.shift();
    o.push(a);
    const c = (n.get(a) ?? []).slice().sort();
    for (const d of c) {
      const l = (r.get(d) ?? 0) - 1;
      r.set(d, l), l === 0 && s.push(d);
    }
  }
  if (o.length < e.nodes.length) {
    const a = new Set(o), c = e.nodes.filter((d) => !a.has(d.id)).map((d) => d.id).sort();
    o.push(...c);
  }
  return o;
}
const _o = { animated: bo }, Uo = xo;
function Bo(e) {
  return {
    id: e.id,
    type: e.type,
    position: e.position,
    data: { ...e.data, nodeType: e.type }
  };
}
function jo(e) {
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
function Fo({ onFilterLog: e, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: o, replayNodeClasses: s, breakpoints: a, onToggleBreakpoint: c, pausedAtNodeId: d }) {
  const {
    definition: l,
    addNode: p,
    setPositions: m,
    addEdge: x,
    removeEdge: f,
    removeNode: h,
    duplicateNodes: g,
    selectedNodeId: u,
    setSelectedNodeId: y,
    updateNodeData: N
  } = ot(), { screenToFlowPosition: v, fitView: C } = wr();
  wo({
    addNode: p,
    addEdge: x,
    updateNodeData: N,
    getDefinition: () => l
  });
  const [b, w, k] = kr([]), [R, I, A] = Cr([]), [$, q] = D(!0), [V, Q] = D(!0), ae = re(null), le = re(null), [oe, ue] = D(null), [O, Y] = D(null), K = P(
    (L, H) => {
      L.preventDefault(), Y({ nodeId: H.id, x: L.clientX, y: L.clientY });
    },
    []
  ), j = P(() => {
    O && (e?.(O.nodeId), Y(null));
  }, [O, e]), W = P(() => {
    if (!O) return;
    const L = O.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(L).catch(() => {
    }), Y(null);
  }, [O]), ce = P(() => {
    O && (c?.(O.nodeId), Y(null));
  }, [O, c]), pe = P(() => {
    if (!O) return;
    const L = g([O.nodeId]);
    L.length > 0 && y(L[0]), Y(null);
  }, [O, g, y]), be = P(() => Y(null), []);
  J(() => {
    if (!l) {
      w([]), I([]);
      return;
    }
    w((L) => {
      const H = new Map(L.map((se) => [se.id, se]));
      return l.nodes.map((se) => {
        const me = H.get(se.id), Ie = Bo(se);
        return a && a.size > 0 && (Ie.data._hasBreakpoint = a.has(se.id)), d && (Ie.data._pausedAtBreakpoint = se.id === d), me ? { ...me, ...Ie, selected: me.selected } : Ie;
      });
    }), I(() => l.edges.map(jo));
  }, [l, a, d, w, I]), J(() => {
    if (!n) {
      r?.(null);
      return;
    }
    w(
      (L) => L.map((H) => ({
        ...H,
        className: H.id === n ? "node-error" : H.className?.replace("node-error", "").trim() || void 0
      }))
    ), requestAnimationFrame(() => {
      const L = ae.current;
      if (!L) return;
      const H = L.querySelector(
        `.react-flow__node[data-id="${CSS.escape(n)}"]`
      );
      if (!H) {
        r?.(null);
        return;
      }
      const se = H.getBoundingClientRect();
      r?.({ x: se.right, y: se.top + se.height / 2 });
    });
  }, [n, w, r]), J(() => {
    s && w(
      (L) => L.map((H) => {
        const se = s[H.id] ?? "", Ie = [H.id === n ? "node-error" : "", se].filter(Boolean).join(" ") || void 0;
        let Ne;
        se === "node-replay-active" ? Ne = "running" : se === "node-replay-completed" ? Ne = "completed" : se === "node-replay-failed" && (Ne = "failed");
        const je = { ...H.data };
        return Ne ? je._state = Ne : je._state = "idle", { ...H, className: Ie, data: je };
      })
    );
  }, [s, n, w]), J(() => {
    o && I(
      (L) => L.map((H) => {
        const se = o[H.id];
        if (!se) return H;
        const me = H.data ?? {};
        return me.state === se ? H : { ...H, data: { ...me, state: se } };
      })
    );
  }, [o, I]);
  const E = P(
    (L) => {
      k(L);
      const H = [], se = [];
      for (const me of L)
        me.type === "position" && me.position && me.dragging === !1 ? H.push({ id: me.id, position: me.position }) : me.type === "remove" && se.push(me.id);
      H.length && m(H);
      for (const me of se) h(me);
    },
    [k, m, h]
  ), Z = P(
    (L) => {
      A(L);
      for (const H of L)
        H.type === "remove" && f(H.id);
    },
    [A, f]
  ), ge = P(
    (L) => {
      if (!l || !L.source || !L.target) return;
      const H = l.nodes.find((Ne) => Ne.id === L.source), se = l.nodes.find((Ne) => Ne.id === L.target);
      if (!H || !se) return;
      const me = L.sourceHandle ?? "out", Ie = L.targetHandle ?? "in";
      Ot(
        H.type,
        me,
        se.type,
        Ie
      ) && x({
        source: L.source,
        sourceHandle: me,
        target: L.target,
        targetHandle: Ie
      });
    },
    [l, x]
  ), De = P(
    (L) => {
      if (!l || !L.source || !L.target) return !1;
      const H = l.nodes.find((me) => me.id === L.source), se = l.nodes.find((me) => me.id === L.target);
      return !H || !se ? !1 : Ot(
        H.type,
        L.sourceHandle ?? "out",
        se.type,
        L.targetHandle ?? "in"
      );
    },
    [l]
  ), ze = P(
    (L, H) => {
      y(H.id);
    },
    [y]
  ), Pe = P(() => {
    y(null);
  }, [y]), Ae = P(
    (L) => {
      const H = L.target;
      if (!H || !(H.classList.contains("react-flow__pane") || H.classList.contains("react-flow__renderer") || H.classList.contains("react-flow__viewport") || H.classList.contains("react-flow"))) return;
      L.preventDefault();
      const me = v({ x: L.clientX, y: L.clientY });
      ue({
        anchor: { x: L.clientX, y: L.clientY },
        flowPosition: me
      });
    },
    [v]
  ), Le = P(() => ue(null), []), Ee = P(
    (L, H) => {
      p(L, H);
    },
    [p]
  ), _e = _(() => l ? l.nodes.some((L) => L.type === "trigger") ? ["trigger"] : [] : [], [l]), { handleDragOver: ye, handleDrop: de } = Co({
    addNode: p,
    screenToFlowPosition: v
  });
  J(() => {
    const L = (H) => {
      if (!Ft(H.target) && !(H.metaKey || H.ctrlKey || H.altKey)) {
        if (H.key === "m" || H.key === "M") {
          q((se) => !se);
          return;
        }
        if (H.key === "c" || H.key === "C") {
          Q((se) => !se);
          return;
        }
      }
    };
    return window.addEventListener("keydown", L), () => window.removeEventListener("keydown", L);
  }, []), ko({
    definition: l,
    selectedNodeId: u,
    setSelectedNodeId: y,
    removeNode: h,
    removeDefEdge: f,
    setNodes: w,
    setEdges: I,
    setPositions: m,
    duplicateNodes: g,
    clipboardRef: le,
    containerRef: ae
  });
  const z = P((L) => {
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
  return /* @__PURE__ */ i(
    "div",
    {
      ref: ae,
      className: "flex-1 min-w-0 min-h-[520px] relative bg-[#fafbfc]",
      role: "application",
      "aria-label": "Pipeline editor canvas",
      tabIndex: 0,
      "data-testid": "pipeline-canvas",
      onDragOver: ye,
      onDrop: de,
      onDoubleClick: Ae,
      children: [
        /* @__PURE__ */ i(
          Ir,
          {
            nodes: b,
            edges: R,
            nodeTypes: Uo,
            edgeTypes: _o,
            onNodesChange: E,
            onEdgesChange: Z,
            onConnect: ge,
            isValidConnection: De,
            onNodeClick: ze,
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
                Sr,
                {
                  variant: Tr.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              V ? /* @__PURE__ */ t(
                Ar,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              $ ? /* @__PURE__ */ t(
                Rr,
                {
                  position: "bottom-right",
                  pannable: !0,
                  zoomable: !0,
                  className: "!bg-white !border !border-border !rounded-md !w-[180px] !h-[120px]",
                  maskColor: "rgba(15, 23, 42, 0.04)",
                  nodeColor: z,
                  nodeStrokeColor: "#e2e8f0"
                }
              ) : null
            ]
          }
        ),
        oe ? /* @__PURE__ */ t(
          No,
          {
            anchor: oe.anchor,
            flowPosition: oe.flowPosition,
            disabledTypes: _e,
            onClose: Le,
            onInsert: Ee
          }
        ) : null,
        /* @__PURE__ */ t(
          Ao,
          {
            definition: l,
            addNode: p,
            screenToFlowPosition: v,
            containerRef: ae
          }
        ),
        /* @__PURE__ */ t(
          Oo,
          {
            definition: l,
            setPositions: m,
            fitView: C
          }
        ),
        O ? /* @__PURE__ */ t(
          Io,
          {
            nodeMenu: O,
            breakpoints: a,
            showBreakpointOption: !!c,
            onFilterLog: j,
            onCopyNodeId: W,
            onDuplicate: pe,
            onToggleBreakpoint: ce,
            onDismiss: be
          }
        ) : null
      ]
    }
  );
}
function zo({ onFilterLog: e, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: o, replayNodeClasses: s, breakpoints: a, onToggleBreakpoint: c, pausedAtNodeId: d } = {}) {
  return /* @__PURE__ */ t(Nr, { children: /* @__PURE__ */ t(
    Fo,
    {
      onFilterLog: e,
      errorNodeId: n,
      onErrorNodePosition: r,
      replayEdgeStates: o,
      replayNodeClasses: s,
      breakpoints: a,
      onToggleBreakpoint: c,
      pausedAtNodeId: d
    }
  ) });
}
const Qt = {
  LLMError: { bg: "#fef2f2", fg: "#dc2626" },
  TimeoutError: { bg: "#fff7ed", fg: "#ea580c" },
  NetworkError: { bg: "#fffbeb", fg: "#d97706" },
  ValidationError: { bg: "#fefce8", fg: "#ca8a04" },
  RegistryConflict: { bg: "#faf5ff", fg: "#9333ea" },
  UnknownError: { bg: "#f1f5f9", fg: "#475569" }
};
function qo(e) {
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
function Ho({ error: e, anchor: n, onDismiss: r, onRetry: o }) {
  const [s, a] = D(!1), [c, d] = D(!1), l = e.errorCategory ?? "UnknownError", p = Qt[l] ?? Qt.UnknownError, m = P(async () => {
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
  }, [e, l]), x = P(() => {
    o?.();
  }, [o]), f = Math.min(n.y + 8, window.innerHeight - 440), h = Math.min(n.x + 12, window.innerWidth - 360);
  return /* @__PURE__ */ i(
    "div",
    {
      className: "fixed z-[100] bg-white border border-[#e2e8f0] rounded-[10px] shadow-[0_12px_32px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.08)] p-0 w-[340px] max-h-[420px] overflow-y-auto font-inherit text-[#0f172a]",
      style: { top: Math.max(8, f), left: Math.max(8, h) },
      "data-testid": "error-overlay",
      role: "dialog",
      "aria-label": `Error details for node ${e.nodeId}`,
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2 px-3.5 pt-3 pb-2.5 border-b border-[#e2e8f0]", children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold leading-snug",
              style: { background: p.bg, color: p.fg },
              "data-testid": "error-category-badge",
              children: qo(l)
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
        /* @__PURE__ */ i("div", { className: "px-3.5 py-3 flex flex-col gap-2.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] leading-normal text-[#0f172a]", children: e.message }),
          /* @__PURE__ */ i("div", { className: "text-[11px] text-[#94a3b8]", children: [
            "Failed node:",
            " ",
            /* @__PURE__ */ t("code", { className: "bg-[#f1f5f9] px-[5px] py-px rounded-[3px] font-mono text-[11px] text-[#475569]", children: e.nodeId })
          ] }),
          e.stack && /* @__PURE__ */ i("div", { children: [
            /* @__PURE__ */ i(
              "button",
              {
                type: "button",
                onClick: () => a((g) => !g),
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
        /* @__PURE__ */ i("div", { className: "flex gap-2 px-3.5 pt-2.5 pb-3 border-t border-[#e2e8f0]", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: m,
              className: "px-3 py-1.5 text-xs font-semibold border-none rounded-md cursor-pointer font-inherit leading-snug bg-[#f1f5f9] text-[#475569]",
              "data-testid": "error-copy-btn",
              children: c ? "Copied!" : "Copy error details"
            }
          ),
          o && /* @__PURE__ */ t(
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
function Ko(e, n) {
  const r = /* @__PURE__ */ new Map();
  for (const s of e)
    r.set(s.id, []);
  for (const s of n) {
    const a = r.get(s.source);
    a && a.push({ target: s.target, edgeId: s.id });
  }
  const o = /* @__PURE__ */ new Map();
  for (const s of e)
    o.set(s.id, 0);
  for (const s of e) {
    if (o.get(s.id) !== 0) continue;
    const a = [
      { nodeId: s.id, index: 0 }
    ];
    for (o.set(s.id, 1); a.length > 0; ) {
      const c = a[a.length - 1], d = r.get(c.nodeId) ?? [];
      if (c.index >= d.length) {
        o.set(c.nodeId, 2), a.pop();
        continue;
      }
      const l = d[c.index];
      c.index += 1;
      const p = o.get(l.target);
      if (p === 1)
        return l.edgeId;
      p === 0 && (o.set(l.target, 1), a.push({ nodeId: l.target, index: 0 }));
    }
  }
  return null;
}
function Bn(e) {
  const n = [], r = [], { nodes: o, edges: s } = e, a = /* @__PURE__ */ new Map();
  for (const c of o)
    a.set(c.id, c);
  return Wo(o, n), Vo(o, s, n), Jo(s, a, n), Go(o, n), rs(o, s, n), os(o, s, r), ss(o, s, r), is(o, s, r), as(o, s, r), r.push(...ls(e)), r.push(...ds(e)), r.push(...cs(e)), r.push(...ps(e)), r.push(...us(e)), r.push(...ms(e)), r.push(...fs(e)), r.push(...hs(e)), r.push(...xs(e)), r.push(...gs(e)), {
    errors: n,
    warnings: r,
    isValid: n.length === 0,
    canPublish: n.length === 0
  };
}
function Wo(e, n) {
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
function Vo(e, n, r) {
  const o = Ko(e, n);
  o !== null && r.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: o
  });
}
function Jo(e, n, r) {
  for (const o of e) {
    const s = n.get(o.source), a = n.get(o.target);
    if (!s || !a) {
      r.push({
        code: "INVALID_HANDLE",
        severity: "error",
        message: "Edge references a node that does not exist.",
        edgeId: o.id
      });
      continue;
    }
    Ot(
      s.type,
      o.sourceHandle,
      a.type,
      o.targetHandle
    ) || r.push({
      code: "INVALID_HANDLE",
      severity: "error",
      message: `Invalid connection: ${s.type}.${o.sourceHandle} → ${a.type}.${o.targetHandle}.`,
      edgeId: o.id
    });
  }
}
function Go(e, n) {
  for (const r of e)
    switch (r.data.type) {
      case "llm":
        Yo(r.id, r.data, n);
        break;
      case "transform":
        Xo(r.id, r.data, n);
        break;
      case "condition":
        Qo(r.id, r.data, n);
        break;
      case "action":
        Zo(r.id, r.data, n);
        break;
      case "fork":
        es(r.id, r.data, n);
        break;
      case "join":
        ts(r.id, r.data, n);
        break;
      case "approval":
        ns(r.id, r.data, n);
        break;
    }
}
function Yo(e, n, r) {
  n.provider || Be(r, e, "provider"), (!n.model || !n.model.trim()) && Be(r, e, "model"), (!n.systemPrompt || !n.systemPrompt.trim()) && Be(r, e, "systemPrompt"), (!n.userPromptTemplate || !n.userPromptTemplate.trim()) && Be(r, e, "userPromptTemplate");
}
function Xo(e, n, r) {
  n.transformType || Be(r, e, "transformType"), (!n.expression || !n.expression.trim()) && Be(r, e, "expression");
}
function Qo(e, n, r) {
  (!n.expression || !n.expression.trim()) && Be(r, e, "expression");
}
function Zo(e, n, r) {
  n.actionType || Be(r, e, "actionType");
}
function es(e, n, r) {
  (typeof n.branchCount != "number" || n.branchCount < 2) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: e,
    field: "branchCount"
  });
}
function ts(e, n, r) {
  n.mode || Be(r, e, "mode"), n.mergeStrategy || Be(r, e, "mergeStrategy"), n.mode === "n_of_m" && (typeof n.n != "number" || n.n < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: e,
    field: "n"
  });
}
function ns(e, n, r) {
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
function rs(e, n, r) {
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
function os(e, n, r) {
  const o = e.filter((d) => d.type === "trigger");
  if (o.length !== 1) return;
  const s = /* @__PURE__ */ new Map();
  for (const d of e) s.set(d.id, []);
  for (const d of n)
    s.get(d.source)?.push(d.target);
  const a = /* @__PURE__ */ new Set(), c = [o[0].id];
  for (a.add(o[0].id); c.length > 0; ) {
    const d = c.shift();
    for (const l of s.get(d) ?? [])
      a.has(l) || (a.add(l), c.push(l));
  }
  for (const d of e)
    a.has(d.id) || r.push({
      code: "ORPHAN_NODE",
      severity: "warning",
      message: "Node is unreachable from the Trigger.",
      nodeId: d.id
    });
}
function ss(e, n, r) {
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
function is(e, n, r) {
  const o = /* @__PURE__ */ new Map();
  for (const s of n) {
    const a = o.get(s.source) ?? /* @__PURE__ */ new Set();
    a.add(s.sourceHandle), o.set(s.source, a);
  }
  for (const s of e) {
    if (s.data.type !== "fork") continue;
    const a = s.data.branchCount, c = o.get(s.id) ?? /* @__PURE__ */ new Set();
    for (let d = 0; d < a; d += 1) {
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
function as(e, n, r) {
  const o = /* @__PURE__ */ new Map();
  for (const s of n) {
    const a = o.get(s.source) ?? /* @__PURE__ */ new Set();
    a.add(s.sourceHandle), o.set(s.source, a);
  }
  for (const s of e) {
    if (s.type !== "condition") continue;
    const a = o.get(s.id) ?? /* @__PURE__ */ new Set();
    for (const c of ["true", "false"])
      a.has(c) || r.push({
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
function ls(e) {
  const n = [], r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (const d of e.nodes)
    r.set(d.id, []), o.set(d.id, []);
  for (const d of e.edges)
    d.sourceHandle !== "error" && r.get(d.source)?.push(d.target), o.get(d.target)?.push(d.source);
  const s = /* @__PURE__ */ new Map();
  for (const d of e.nodes) s.set(d.id, d);
  function a(d) {
    const l = /* @__PURE__ */ new Set([d]), p = [];
    for (const m of r.get(d) ?? [])
      l.has(m) || (l.add(m), p.push(m));
    for (; p.length > 0; ) {
      const m = p.shift();
      if (s.get(m)?.type === "join") return !0;
      for (const f of r.get(m) ?? [])
        l.has(f) || (l.add(f), p.push(f));
    }
    return !1;
  }
  function c(d) {
    const l = /* @__PURE__ */ new Set([d]), p = [];
    for (const m of o.get(d) ?? [])
      l.has(m) || (l.add(m), p.push(m));
    for (; p.length > 0; ) {
      const m = p.shift();
      if (s.get(m)?.type === "fork") return !0;
      for (const f of o.get(m) ?? [])
        l.has(f) || (l.add(f), p.push(f));
    }
    return !1;
  }
  for (const d of e.nodes)
    d.data.type !== "llm" && d.data.type !== "action" || e.edges.some(
      (p) => p.source === d.id && p.sourceHandle === "error"
    ) || c(d.id) && a(d.id) || n.push({
      code: "NO_ERROR_HANDLER",
      severity: "warning",
      message: `${d.data.type} node '${We(d)}' has no error handler — failures will terminate the run.`,
      nodeId: d.id
    });
  return n;
}
function ds(e) {
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
function cs(e) {
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
function ps(e) {
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
function us(e) {
  const r = e.nodes.filter((p) => p.type === "trigger");
  if (r.length !== 1) return [];
  const o = /* @__PURE__ */ new Map();
  for (const p of e.nodes) o.set(p.id, []);
  for (const p of e.edges) o.get(p.source)?.push(p.target);
  const s = /* @__PURE__ */ new Map(), a = [r[0].id];
  s.set(r[0].id, 1);
  const c = e.nodes.length * e.nodes.length + 1;
  let d = 0;
  for (; a.length > 0; ) {
    if (d++ > c) return [];
    const p = a.shift(), m = s.get(p);
    for (const x of o.get(p) ?? []) {
      const f = s.get(x);
      (f === void 0 || m + 1 > f) && (s.set(x, m + 1), a.push(x));
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
function ms(e) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const o of e.nodes) {
    const s = We(o), a = r.get(s) ?? [];
    a.push(o), r.set(s, a);
  }
  for (const [o, s] of r)
    if (!(s.length < 2))
      for (const a of s)
        n.push({
          code: "DUPLICATE_NODE_NAME",
          severity: "warning",
          message: `Multiple nodes named '${o}'; consider disambiguating.`,
          nodeId: a.id
        });
  return n;
}
function fs(e) {
  const n = [], r = /\{\{[^}]+\}\}/;
  for (const o of e.nodes) {
    if (o.data.type !== "llm") continue;
    const { temperature: s, userPromptTemplate: a } = o.data;
    typeof s != "number" || s <= 0.8 || !a || !r.test(a) || n.push({
      code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
      severity: "warning",
      message: `LLM '${We(o)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
      nodeId: o.id
    });
  }
  return n;
}
function hs(e) {
  return e.triggerBinding?.event !== "schedule" ? [] : e.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function xs(e) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const o of e.edges) {
    const s = r.get(o.source) ?? /* @__PURE__ */ new Set();
    s.add(o.sourceHandle), r.set(o.source, s);
  }
  for (const o of e.nodes) {
    if (o.type !== "condition") continue;
    const s = r.get(o.id) ?? /* @__PURE__ */ new Set(), a = s.has("true"), c = s.has("false");
    a && !c && n.push({
      code: "UNREACHABLE_AFTER_CONDITION_FALSE",
      severity: "warning",
      message: `Condition '${We(o)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: o.id,
      field: "false"
    });
  }
  return n;
}
function gs(e) {
  const n = [], r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (const d of e.nodes)
    r.set(d.id, []), o.set(d.id, []);
  for (const d of e.edges)
    r.get(d.source)?.push({ target: d.target, sourceHandle: d.sourceHandle }), o.get(d.target)?.push(d.source);
  const s = /* @__PURE__ */ new Map();
  for (const d of e.nodes) s.set(d.id, d);
  function a(d) {
    const l = /* @__PURE__ */ new Set([d]), p = [d];
    for (; p.length > 0; ) {
      const m = p.shift(), x = s.get(m);
      if (x && x.type === "join" && m !== d) return m;
      for (const { target: f } of r.get(m) ?? [])
        l.has(f) || (l.add(f), p.push(f));
    }
    return null;
  }
  function c(d) {
    const l = /* @__PURE__ */ new Set([d]), p = [d];
    for (; p.length > 0; ) {
      const m = p.shift(), x = s.get(m);
      if (x && x.type === "fork" && m !== d) return m;
      for (const f of o.get(m) ?? [])
        l.has(f) || (l.add(f), p.push(f));
    }
    return null;
  }
  for (const d of e.nodes) {
    if (d.data.type !== "fork") continue;
    const l = r.get(d.id) ?? [];
    if (l.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const { target: f } of l)
      p.add(a(f));
    const m = p.has(null), x = [...p].filter((f) => f !== null);
    (m || x.length !== 1) && n.push({
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
    for (const f of l)
      p.add(c(f));
    const m = p.has(null), x = [...p].filter((f) => f !== null);
    (m || x.length !== 1) && n.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Join '${We(d)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: d.id
    });
  }
  return n;
}
function bs(e, n) {
  return `${e}${n}`;
}
const ys = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, vs = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function jn(e) {
  return e.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const Ns = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function ws(e) {
  const n = vs[e.type] ?? "■", r = Ns[e.type] ?? e.type.charAt(0).toUpperCase() + e.type.slice(1);
  let o = null;
  switch (e.data.type) {
    case "llm":
      o = e.data.model || null;
      break;
    case "condition": {
      const a = e.data;
      o = a.label || a.expression || null;
      break;
    }
    case "approval": {
      const c = e.data.approvers?.length ?? 0;
      o = `${c} approver${c === 1 ? "" : "s"}`;
      break;
    }
    case "fork": {
      const a = e.data;
      o = `${a.branchCount} branch${a.branchCount === 1 ? "" : "es"}`;
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
  return jn(o ? `${s}<br/>${o}` : s);
}
function ks(e, n) {
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
function Cs(e) {
  return !e || e === "out" ? null : e;
}
function Is(e) {
  const n = ["flowchart TD"], r = {}, o = /* @__PURE__ */ new Map();
  for (const s of e.nodes) {
    const a = ys[s.type] ?? "n", c = r[a] = (r[a] ?? 0) + 1;
    o.set(s.id, bs(a, c));
  }
  for (const s of e.nodes) {
    const a = o.get(s.id);
    if (!a) continue;
    const c = ks(s.type, ws(s));
    n.push(`  ${a}${c}`);
  }
  for (const s of e.edges) {
    const a = o.get(s.source), c = o.get(s.target);
    if (!a || !c) continue;
    const d = Cs(s.sourceHandle);
    d ? n.push(`  ${a} --"${jn(d)}"--> ${c}`) : n.push(`  ${a} --> ${c}`);
  }
  return n.join(`
`);
}
function Zt(e) {
  return JSON.stringify(e, (n, r) => {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const o = Object.keys(r).sort(), s = {};
      for (const a of o) s[a] = r[a];
      return s;
    }
    return r;
  });
}
function en(e) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e) n.set(r.id, r);
  return n;
}
function tn(e) {
  return new Set(e.edges.map((n) => n.id));
}
function Ss(e, n) {
  if (!n)
    return {
      addedNodes: e.nodes.map((v) => ({
        node: v,
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
  const r = en(e.nodes), o = en(n.nodes), s = [], a = [], c = [];
  for (const [v, C] of r) {
    const b = o.get(v);
    if (!b) {
      s.push({ node: C, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const w = Zt(C.data) !== Zt(b.data), k = C.position.x !== b.position.x || C.position.y !== b.position.y;
    (w || k) && c.push({ node: C, dataChanged: w, positionChanged: k });
  }
  for (const [v, C] of o)
    r.has(v) || a.push({ node: C, dataChanged: !0, positionChanged: !1 });
  const d = tn(e), l = tn(n);
  let p = 0, m = 0;
  for (const v of d) l.has(v) || p++;
  for (const v of l) d.has(v) || m++;
  const x = e.name !== n.name, f = (e.icon ?? "") !== (n.icon ?? ""), h = new Set(e.tags ?? []), g = new Set(n.tags ?? []), u = [], y = [];
  for (const v of h) g.has(v) || u.push(v);
  for (const v of g) h.has(v) || y.push(v);
  const N = u.length > 0 || y.length > 0;
  return {
    addedNodes: s,
    removedNodes: a,
    modifiedNodes: c,
    addedEdges: p,
    removedEdges: m,
    nameChanged: x,
    previousName: x ? n.name : void 0,
    iconChanged: f,
    previousIcon: f ? n.icon : void 0,
    tagsChanged: N,
    tagsAdded: u,
    tagsRemoved: y
  };
}
const Ts = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function As(e) {
  return e.data.type === "condition" && e.data.label ? e.data.label : e.data.type === "llm" ? e.data.model : e.data.type === "action" ? e.data.actionType : e.data.type === "trigger" ? e.data.triggerType : e.type.charAt(0).toUpperCase() + e.type.slice(1);
}
function St(e, n, r) {
  const o = e.node, s = Ts[o.type] ?? "■", a = n !== "removed" && !!r;
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      disabled: !a,
      onClick: a ? () => r(e.node.id) : void 0,
      className: S(
        "flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-[inherit] bg-[#f8fafc] border border-border text-left w-full text-text-primary",
        a ? "cursor-pointer" : "cursor-default",
        n === "removed" && "opacity-85"
      ),
      "data-testid": `diff-row-${n}`,
      children: [
        /* @__PURE__ */ t("span", { className: "text-sm", children: s }),
        /* @__PURE__ */ t("span", { className: "font-semibold", children: o.type }),
        /* @__PURE__ */ t("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: As(o) }),
        n === "modified" && e.positionChanged ? /* @__PURE__ */ t("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]", children: "moved" }) : null
      ]
    },
    `${n}-${e.node.id}`
  );
}
function Rs({
  open: e,
  onClose: n,
  currentDef: r,
  publishedDef: o,
  onJumpToNode: s
}) {
  const a = _(
    () => Ss(r, o),
    [r, o]
  ), c = (m) => {
    s && s(m), n();
  }, d = o !== null, l = r.version, p = r.publishedVersion;
  return /* @__PURE__ */ i(
    Fe,
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
        /* @__PURE__ */ i("div", { className: "text-[13px] text-text-primary mb-3 flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ i("strong", { children: [
            "v",
            l
          ] }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "vs" }),
          typeof p == "number" ? /* @__PURE__ */ i("strong", { children: [
            "published v",
            p
          ] }) : /* @__PURE__ */ t("strong", { className: "text-text-secondary", children: "never published" })
        ] }),
        r.publishedVersion === void 0 ? /* @__PURE__ */ t("p", { className: "m-0 text-[13px] text-text-secondary", children: "This pipeline has never been published." }) : d ? /* @__PURE__ */ i(G, { children: [
          /* @__PURE__ */ i("div", { className: "flex gap-3 flex-wrap", children: [
            /* @__PURE__ */ i("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ i("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Added (",
                a.addedNodes.length,
                ")"
              ] }),
              a.addedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : a.addedNodes.map((m) => St(m, "added", c))
            ] }),
            /* @__PURE__ */ i("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ i("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Removed (",
                a.removedNodes.length,
                ")"
              ] }),
              a.removedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : a.removedNodes.map((m) => St(m, "removed", void 0))
            ] }),
            /* @__PURE__ */ i("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ i("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Modified (",
                a.modifiedNodes.length,
                ")"
              ] }),
              a.modifiedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : a.modifiedNodes.map((m) => St(m, "modified", c))
            ] })
          ] }),
          /* @__PURE__ */ i("div", { className: "mt-4 pt-3 border-t border-border", children: [
            /* @__PURE__ */ i("div", { className: "text-xs text-text-secondary mt-1", children: [
              /* @__PURE__ */ t("strong", { children: a.addedEdges }),
              " edge",
              a.addedEdges === 1 ? "" : "s",
              " added ·",
              " ",
              /* @__PURE__ */ t("strong", { children: a.removedEdges }),
              " edge",
              a.removedEdges === 1 ? "" : "s",
              " removed"
            ] }),
            a.nameChanged ? /* @__PURE__ */ i("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Name: ",
              /* @__PURE__ */ i("em", { children: [
                '"',
                a.previousName ?? "",
                '"'
              ] }),
              " →",
              " ",
              /* @__PURE__ */ i("strong", { children: [
                '"',
                r.name,
                '"'
              ] })
            ] }) : null,
            a.iconChanged ? /* @__PURE__ */ i("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Icon: ",
              a.previousIcon ?? "—",
              " → ",
              r.icon ?? "—"
            ] }) : null,
            a.tagsChanged ? /* @__PURE__ */ i("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Tags changed: added [",
              a.tagsAdded.join(", ") || "—",
              "], removed [",
              a.tagsRemoved.join(", ") || "—",
              "]"
            ] }) : null
          ] })
        ] }) : /* @__PURE__ */ i("p", { className: "m-0 text-[13px] text-text-secondary", children: [
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
function Ds({ open: e, onClose: n }) {
  return null;
}
const Tt = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", nn = "px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function $s(e) {
  const {
    publishConfirmOpen: n,
    onPublishClose: r,
    onPublishConfirm: o,
    hasErrors: s,
    validationErrorCount: a,
    definitionName: c,
    definitionVersion: d,
    deleteConfirmOpen: l,
    onDeleteClose: p,
    onDeleteConfirm: m,
    clearRunsConfirmOpen: x,
    onClearRunsClose: f,
    onClearRunsConfirm: h,
    versionDiffOpen: g,
    onVersionDiffClose: u,
    currentDef: y,
    publishedDef: N,
    onJumpToNode: v,
    simPanelOpen: C,
    onSimPanelClose: b
  } = e;
  return /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t(
      Fe,
      {
        open: n,
        onClose: r,
        title: "Publish pipeline?",
        maxWidth: 420,
        footer: /* @__PURE__ */ i(G, { children: [
          /* @__PURE__ */ t("button", { onClick: r, className: Tt, children: "Cancel" }),
          /* @__PURE__ */ t(
            "button",
            {
              onClick: o,
              disabled: s,
              className: S(
                "px-4 py-[7px] text-[13px] font-semibold text-white border-none rounded-[7px] font-[inherit]",
                s ? "bg-[#cbd5e1] cursor-not-allowed" : "bg-primary cursor-pointer"
              ),
              children: "Publish"
            }
          )
        ] }),
        children: /* @__PURE__ */ i("p", { className: "m-0", children: [
          "Publishing will make ",
          /* @__PURE__ */ i("strong", { children: [
            '"',
            c,
            '"'
          ] }),
          " available for runs and set the published version to",
          /* @__PURE__ */ i("strong", { children: [
            " v",
            d + 1
          ] }),
          ".",
          s ? /* @__PURE__ */ i(G, { children: [
            /* @__PURE__ */ t("br", {}),
            /* @__PURE__ */ t("br", {}),
            /* @__PURE__ */ i("span", { className: "text-[#dc2626]", children: [
              "Pipeline has ",
              a,
              " validation error",
              a === 1 ? "" : "s",
              ". Fix them before publishing."
            ] })
          ] }) : null
        ] })
      }
    ),
    /* @__PURE__ */ t(
      Fe,
      {
        open: l,
        onClose: p,
        title: "Delete pipeline?",
        maxWidth: 400,
        footer: /* @__PURE__ */ i(G, { children: [
          /* @__PURE__ */ t("button", { onClick: p, className: Tt, children: "Cancel" }),
          /* @__PURE__ */ t("button", { onClick: m, className: nn, children: "Delete" })
        ] }),
        children: /* @__PURE__ */ i("p", { className: "m-0", children: [
          /* @__PURE__ */ i("strong", { children: [
            '"',
            c,
            '"'
          ] }),
          " will be permanently removed. Run history for this pipeline will also be lost."
        ] })
      }
    ),
    /* @__PURE__ */ t(
      Fe,
      {
        open: x,
        onClose: f,
        title: "Clear run history?",
        maxWidth: 400,
        footer: /* @__PURE__ */ i(G, { children: [
          /* @__PURE__ */ t("button", { onClick: f, className: Tt, children: "Cancel" }),
          /* @__PURE__ */ t("button", { onClick: h, className: nn, children: "Clear history" })
        ] }),
        children: /* @__PURE__ */ i("p", { className: "m-0", children: [
          "All stored run history for ",
          /* @__PURE__ */ i("strong", { children: [
            '"',
            c,
            '"'
          ] }),
          " will be permanently removed. This cannot be undone."
        ] })
      }
    ),
    /* @__PURE__ */ t(
      Rs,
      {
        open: g,
        onClose: u,
        currentDef: y,
        publishedDef: N,
        onJumpToNode: v
      }
    ),
    /* @__PURE__ */ t(
      Ds,
      {
        open: C,
        onClose: b
      }
    )
  ] });
}
function Ms({ runId: e, visible: n }) {
  const [r, o] = D(/* @__PURE__ */ new Map()), s = re(null), a = re(!0), c = re(null);
  J(() => {
    e !== c.current && (c.current = e, o(/* @__PURE__ */ new Map()), a.current = !0);
  }, [e]);
  const d = P(() => {
    const h = s.current;
    if (!h) return;
    const g = h.scrollHeight - h.scrollTop - h.clientHeight < 30;
    a.current = g;
  }, []), l = P(() => {
    if (!a.current) return;
    const h = s.current;
    h && (h.scrollTop = h.scrollHeight);
  }, []), p = P(
    (h) => {
      if (!("eventType" in h)) return;
      const { eventType: g, payload: u } = h;
      if (!g.startsWith("pipeline.llm.")) return;
      const y = u?.runId;
      if (!e || y !== e) return;
      const N = u?.stepId;
      if (N) {
        if (g === "pipeline.llm.stream.opened")
          o((v) => {
            const C = new Map(v);
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
          const v = u?.token;
          if (v === void 0) return;
          o((C) => {
            const b = new Map(C), w = b.get(N);
            if (w) {
              const k = {
                ...w,
                tokens: [...w.tokens, v],
                text: w.text + v,
                active: !0
              };
              b.set(N, k);
            } else
              b.set(N, {
                stepId: N,
                tokens: [v],
                text: v,
                active: !0,
                summary: null,
                collapsed: !1,
                startedAt: Date.now()
              });
            return b;
          });
        } else if (g === "pipeline.llm.response") {
          const v = u?.tokensIn, C = u?.tokensOut;
          o((b) => {
            const w = new Map(b), k = w.get(N), R = k ? Date.now() - k.startedAt : 0, I = R > 1e3 ? `${(R / 1e3).toFixed(1)}s` : `${R}ms`, A = `${N}: ${v ?? "?"} tokens in, ${C ?? "?"} tokens out (${I})`;
            return k ? w.set(N, {
              ...k,
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
    [e]
  );
  Re("*", p), J(() => {
    l();
  }, [r, l]);
  const m = P((h) => {
    o((g) => {
      const u = new Map(g), y = u.get(h);
      return y && u.set(h, { ...y, collapsed: !y.collapsed }), u;
    });
  }, []), x = _(() => {
    for (const h of r.values())
      if (h.active) return !0;
    return !1;
  }, [r]), f = _(() => Array.from(r.values()), [r]);
  return n ? /* @__PURE__ */ i(
    "div",
    {
      className: "flex flex-col bg-[#1e1e2e] border-t border-[#313244] max-h-[320px] min-h-[160px] overflow-hidden relative",
      "data-testid": "live-output-panel",
      children: [
        /* @__PURE__ */ t("div", { className: "flex items-center justify-between py-2 px-[14px] bg-[#181825] border-b border-[#313244] shrink-0", children: /* @__PURE__ */ i("div", { className: "text-xs font-bold text-[#cdd6f4] tracking-[0.04em] uppercase flex items-center gap-2", children: [
          /* @__PURE__ */ t("span", { children: "Live Output" }),
          x && /* @__PURE__ */ t("span", { className: "w-1.5 h-1.5 rounded-full bg-[#a6e3a1] [animation:live-output-blink_1.2s_ease-in-out_infinite]" }),
          e && /* @__PURE__ */ i("span", { className: "text-[10px] text-[#6c7086] font-normal normal-case", children: [
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
            children: f.length === 0 ? /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full text-[#6c7086] text-[13px] italic", children: e ? "Waiting for LLM output..." : "No active run" }) : f.map((h) => /* @__PURE__ */ i("div", { children: [
              /* @__PURE__ */ i(
                "div",
                {
                  className: S(
                    "flex items-center gap-2 py-1.5 cursor-pointer select-none text-[11px] font-semibold border-b border-[#313244] mb-1.5",
                    h.active ? "text-[#89b4fa]" : "text-[#a6adc8]"
                  ),
                  onClick: () => m(h.stepId),
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (g) => {
                    (g.key === "Enter" || g.key === " ") && m(h.stepId);
                  },
                  children: [
                    /* @__PURE__ */ t("span", { className: "text-[10px]", children: h.collapsed ? "▶" : "▼" }),
                    /* @__PURE__ */ t("span", { children: h.stepId }),
                    h.active && /* @__PURE__ */ t("span", { className: "text-[#a6e3a1] text-[10px]", children: "streaming" })
                  ]
                }
              ),
              !h.collapsed && /* @__PURE__ */ i(G, { children: [
                h.text.length > 0 && /* @__PURE__ */ i("div", { className: "whitespace-pre-wrap break-words m-0 mb-3 p-0 text-[#cdd6f4]", children: [
                  h.text,
                  h.active && /* @__PURE__ */ t("span", { className: "inline-block w-0.5 h-[14px] bg-[#89b4fa] ml-px align-text-bottom [animation:live-output-blink_1s_step-end_infinite]" })
                ] }),
                h.summary && /* @__PURE__ */ i("div", { className: "text-[11px] text-[#a6e3a1] font-semibold pt-1 pb-2 border-b border-[#313244] mb-2", children: [
                  "✓",
                  " ",
                  h.summary
                ] })
              ] })
            ] }, h.stepId))
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
function Ps(e) {
  const n = st(), { toast: r } = Ct(), { definition: o, selectedNodeId: s, setSelectedNodeId: a } = ot(), c = re(n.runs);
  J(() => {
    c.current = n.runs;
  }, [n.runs]);
  const d = re(o);
  J(() => {
    d.current = o;
  }, [o]);
  const l = P(
    (T) => T ? c.current[T]?.pipelineId === e : !1,
    [e]
  ), [p, m] = D(null), [x, f] = D(null), h = P(() => {
    m(null), f(null);
  }, []), g = P(
    (T) => {
      f(T);
    },
    []
  ), u = P(
    (T) => {
      "eventType" in T || T.pipelineId === e && (r("Run started", { type: "info" }), m(null), f(null));
    },
    [e, r]
  ), y = P(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const M = Math.round(T.durationMs / 100) / 10;
      r(`Run completed in ${M}s`, { type: "success" });
    },
    [l, r]
  ), N = P(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const M = T.error.nodeId, X = ut(d.current, M);
      r(`Run failed at ${X}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => a(M)
      }), m(T.error);
    },
    [l, a, r]
  ), v = P(
    (T) => {
      "eventType" in T || l(T.runId) && r("Run cancelled", { type: "warning" });
    },
    [l, r]
  ), C = P(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const M = T.stepId, X = ut(d.current, M);
      r(`Approval requested on "${X}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => a(M)
      });
    },
    [l, a, r]
  );
  Re("pipeline.run.started", u), Re("pipeline.run.completed", y), Re("pipeline.run.failed", N), Re("pipeline.run.cancelled", v), Re("pipeline.approval.requested", C);
  const [b, w] = D(null);
  J(() => {
    if (n.activeRunIds.length > 0) {
      const T = n.activeRunIds[n.activeRunIds.length - 1];
      T !== b && w(T);
      return;
    }
    if (!b) {
      const T = Object.values(n.runs).sort(
        (M, X) => X.startedAt.localeCompare(M.startedAt)
      );
      T.length > 0 && w(T[0].id);
    }
  }, [n.activeRunIds, n.runs, b]);
  const k = b ? n.runs[b] : void 0, R = !!k && (k.status === "running" || k.status === "pending" || k.status === "awaiting_approval"), [I, A] = D(/* @__PURE__ */ new Set()), [$, q] = D(null), [V, Q] = D(null), [ae, le] = D(null), [oe, ue] = D(0), [O, Y] = D(!1), [K, j] = D(null), W = P(
    (T, M) => {
      M === null ? (Q(null), le(null)) : (Q(M), le(T));
    },
    []
  ), ce = P((T) => {
    A((M) => {
      const X = new Set(M);
      return X.has(T) ? X.delete(T) : X.add(T), X;
    });
  }, []), pe = P(async () => {
    if (I.size !== 0)
      try {
        const T = await n.triggerDebugRun(
          e,
          Array.from(I)
        );
        w(T);
      } catch (T) {
        console.error("[PipelineEditor] triggerDebugRun failed", T);
      }
  }, [I, n, e]), be = P(() => {
    $ && (n.resolveBreakpoint($.runId, $.stepId, "continue"), q(null));
  }, [$, n]), E = P(() => {
    $ && (n.resolveBreakpoint($.runId, $.stepId, "step_over"), q(null));
  }, [$, n]), Z = P(() => {
    $ && (n.resolveBreakpoint($.runId, $.stepId, "resume_all"), q(null));
  }, [$, n]), ge = P(async () => {
    if (!(!$ || !V || ae !== $.stepId) && Object.keys(V).length !== 0) {
      Y(!0);
      try {
        await er(
          e,
          $.runId,
          $.stepId,
          { mode: "merge", values: V }
        ), Q(null), le(null), ue((T) => T + 1), n.resolveBreakpoint($.runId, $.stepId, "continue"), q(null);
      } catch (T) {
        if (T instanceof tr)
          r(`Patch rejected: ${T.reason}`, { type: "error", durationMs: 8e3 });
        else if (T instanceof Wt)
          r(`Apply failed (HTTP ${T.status})`, { type: "error", durationMs: 6e3 });
        else {
          const M = T instanceof Error ? T.message : String(T);
          r(`Apply failed: ${M}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        Y(!1);
      }
    }
  }, [$, V, ae, e, n, r]), De = P(
    async (T) => {
      if ($) {
        j(T);
        try {
          await nr(
            e,
            $.runId,
            $.stepId,
            T
          ), r("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (M) {
          if (M instanceof Wt)
            r(`Revert failed (HTTP ${M.status})`, { type: "error", durationMs: 6e3 });
          else {
            const X = M instanceof Error ? M.message : String(M);
            r(`Revert failed: ${X}`, { type: "error", durationMs: 6e3 });
          }
        } finally {
          j(null);
        }
      }
    },
    [$, e, r]
  ), ze = P(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      q({ runId: T.runId, stepId: T.stepId });
      const M = ut(d.current, T.stepId);
      r(`Paused at breakpoint: ${M}`, { type: "warning", durationMs: 6e3 });
    },
    [l, r]
  );
  Re("pipeline.step.breakpoint", ze);
  const Pe = P(
    (T) => {
      "eventType" in T || $ && $.runId === T.runId && q(null);
    },
    [$]
  );
  Re("pipeline.run.completed", Pe), Re("pipeline.run.failed", Pe), Re("pipeline.run.cancelled", Pe);
  const Ae = P(() => {
    p?.nodeId && (n.retryFromStep(p.nodeId), h());
  }, [p, n, h]), Le = o?.status === "published", Ee = !R && !Le, _e = R ? "Cancel the active run" : Le ? "Start a new run" : "Publish the pipeline to enable runs", [ye, de] = D(!1), [z, L] = D({}), [H, se] = D(!1), [me, Ie] = D("config");
  J(() => {
    s !== null && Ie("config");
  }, [s]);
  const Ne = P(async (T) => {
    se(!0);
    try {
      const M = await n.triggerRun(e, T);
      w(M), Ie("runs"), r(`Pipeline triggered — run ${M.slice(0, 8)}…`, { type: "success" });
    } catch (M) {
      console.error("[PipelineEditor] triggerRun failed", M), r(`Trigger failed: ${M.message}`, { type: "error" });
    } finally {
      se(!1);
    }
  }, [n, e, r]), je = P(async () => {
    if (R && b) {
      n.cancelRun(b);
      return;
    }
    Ee || Ne();
  }, [R, b, Ee, n, Ne]), xt = P(() => {
    de(!1), Ne(z);
  }, [Ne, z]);
  return {
    currentRunId: b,
    setCurrentRunId: w,
    activeError: p,
    setActiveError: m,
    errorNodeAnchor: x,
    handleDismissError: h,
    handleErrorNodePosition: g,
    handleRetryFromError: Ae,
    handleRunClick: je,
    handleTriggerInputSubmit: xt,
    isRunActive: R,
    runDisabled: Ee,
    runTitle: _e,
    isTriggering: H,
    triggerInputOpen: ye,
    setTriggerInputOpen: de,
    triggerInputValues: z,
    setTriggerInputValues: L,
    breakpoints: I,
    handleToggleBreakpoint: ce,
    handleDebugRunClick: pe,
    pausedBreakpoint: $,
    handleBreakpointContinue: be,
    handleBreakpointStepOver: E,
    handleBreakpointResumeAll: Z,
    handleApplyAndContinue: ge,
    handleRevertPatch: De,
    applyingPatch: O,
    revertingPatchId: K,
    dirtyPatch: V,
    dirtyPatchStepId: ae,
    handleContextEditBufferChange: W,
    resetEditBufferKey: oe,
    sidebarTab: me,
    setSidebarTab: Ie
  };
}
function Es({
  isPublished: e,
  showTags: n,
  hasPublishedVersion: r,
  onDuplicate: o,
  onCopyMermaid: s,
  onViewVersions: a,
  onRevert: c,
  onToggleShowTags: d,
  onViewRunHistory: l,
  onClearRunHistory: p,
  onSimPanelOpen: m,
  onDelete: x
}) {
  const f = S(
    "block w-full text-left px-3.5 py-2 text-[13px]",
    "border-none bg-transparent cursor-pointer font-inherit text-text-primary",
    "hover:bg-surface-hover"
  ), h = S(
    "block w-full text-left px-3.5 py-2 text-[13px]",
    "border-none bg-transparent cursor-pointer font-inherit text-red-600",
    "hover:bg-surface-hover"
  );
  return /* @__PURE__ */ i(
    "div",
    {
      className: S(
        "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg",
        "shadow-lg p-0 min-w-[200px] max-h-[320px] overflow-y-auto z-20"
      ),
      role: "menu",
      children: [
        /* @__PURE__ */ t("button", { className: f, role: "menuitem", onClick: o, children: "Duplicate" }),
        /* @__PURE__ */ t(
          "button",
          {
            className: f,
            role: "menuitem",
            onClick: s,
            "data-testid": "copy-mermaid-btn",
            children: "Copy Mermaid"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: f,
            role: "menuitem",
            onClick: a,
            "data-testid": "view-versions-btn",
            children: "View changes since publish"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: f,
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
            className: f,
            role: "menuitem",
            onClick: d,
            "data-testid": "toggle-tags-row",
            children: n ? "Hide tags" : "Show tags"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: f,
            role: "menuitem",
            onClick: l,
            children: "View run history"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: h,
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
            className: h,
            role: "menuitem",
            onClick: x,
            children: "Delete"
          }
        )
      ]
    }
  );
}
const At = {
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-green-50 text-green-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600"
};
function Os({
  pipelineId: e,
  definition: n,
  dirty: r,
  savingFlash: o,
  isRunActive: s,
  isTriggering: a,
  runDisabled: c,
  runTitle: d,
  currentRun: l,
  breakpoints: p,
  onRunClick: m,
  onDebugRunClick: x,
  onExport: f,
  onPublishClick: h,
  onDuplicate: g,
  onCopyMermaid: u,
  onViewVersions: y,
  onRevert: N,
  onToggleShowTags: v,
  showTags: C,
  onViewRunHistory: b,
  onClearRunHistory: w,
  onSimPanelOpen: k,
  onDelete: R
}) {
  const I = Me(), { rename: A, setIcon: $, setSelectedNodeId: q } = ot(), [V, Q] = D(!1), [ae, le] = D(""), oe = re(null);
  J(() => {
    V && (le(n.name ?? ""), setTimeout(() => oe.current?.focus(), 0));
  }, [V, n.name]);
  const ue = () => {
    const z = ae.trim();
    z && z !== n.name && A(z), Q(!1);
  }, O = n ? Bn(n) : null;
  (O?.errors.length ?? 0) > 0;
  const Y = n.status === "published", K = r ? { label: "Saving…", variant: "info" } : o ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, j = n.status === "published" ? { label: `v${n.version} · Published`, variant: "success" } : typeof n.publishedVersion == "number" ? { label: `v${n.version} · Draft (pub v${n.publishedVersion})`, variant: "warning" } : { label: `v${n.version} · Draft`, variant: "neutral" }, W = O ? O.errors.length > 0 ? { label: `✗ ${O.errors.length} error${O.errors.length === 1 ? "" : "s"}`, variant: "danger" } : O.warnings.length > 0 ? { label: `⚠ ${O.warnings.length} warning${O.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [ce, pe] = D(!1), be = re(null);
  tt(be, () => pe(!1), ce);
  const E = O ? [...O.errors, ...O.warnings] : [], Z = (z) => {
    z && (q(z), pe(!1));
  }, ge = n.nodes.filter((z) => z.type !== "trigger").length, De = l ? Object.values(l.steps).filter(
    (z) => z.status === "completed" || z.status === "skipped"
  ).length : 0, Pe = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), Ae = s && l ? { text: `Running (${De}/${ge} steps) · ${Pe}s`, variant: "running" } : l?.status === "completed" ? { text: `Completed in ${l.durationMs ? (l.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : l?.status === "failed" ? { text: `Failed at ${ut(n, l.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, Le = {
    running: "bg-blue-50 text-blue-600",
    success: "bg-green-50 text-green-600",
    error: "bg-red-50 text-red-600"
  }, Ee = s ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [_e, ye] = D(!1), de = re(null);
  return tt(de, () => ye(!1), _e), /* @__PURE__ */ i(
    "div",
    {
      className: S(
        "h-11 shrink-0 flex items-center gap-2.5 px-3",
        "border-b border-border bg-surface",
        "sticky top-0 z-5"
      ),
      children: [
        /* @__PURE__ */ t(
          ct,
          {
            onClick: () => I("/pipelines"),
            "aria-label": "Back to pipelines",
            title: "Back to pipelines",
            children: "←"
          }
        ),
        /* @__PURE__ */ t(
          $r,
          {
            value: n.icon ?? "🔀",
            onChange: $
          }
        ),
        V ? /* @__PURE__ */ t(
          "input",
          {
            ref: oe,
            value: ae,
            onChange: (z) => le(z.target.value),
            onBlur: ue,
            onKeyDown: (z) => {
              z.key === "Enter" && ue(), z.key === "Escape" && (le(n.name), Q(!1));
            },
            className: S(
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
            className: S(
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
            className: S(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              At[K.variant]
            ),
            "data-testid": "save-status",
            children: K.label
          }
        ),
        /* @__PURE__ */ t(
          "span",
          {
            className: S(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              At[j.variant]
            ),
            "data-testid": "version-badge",
            children: j.label
          }
        ),
        /* @__PURE__ */ i("div", { className: "relative", ref: be, children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => pe((z) => !z),
              className: S(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
                "cursor-pointer border-none",
                At[W.variant]
              ),
              "data-testid": "validation-indicator",
              children: W.label
            }
          ),
          ce && E.length > 0 && /* @__PURE__ */ t(
            "div",
            {
              className: S(
                "absolute top-full mt-1.5 bg-surface border border-border rounded-lg",
                "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"
              ),
              children: E.map((z, L) => /* @__PURE__ */ i(
                "button",
                {
                  type: "button",
                  onClick: () => Z(z.nodeId),
                  className: S(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    z.nodeId ? "cursor-pointer" : "cursor-default",
                    L < E.length - 1 && "border-b border-border"
                  ),
                  children: [
                    /* @__PURE__ */ t(
                      "span",
                      {
                        className: S(
                          "font-bold text-xs",
                          z.severity === "error" ? "text-red-600" : "text-amber-600"
                        ),
                        children: z.severity === "error" ? "✗" : "⚠"
                      }
                    ),
                    /* @__PURE__ */ i("span", { className: "flex-1 text-xs", children: [
                      /* @__PURE__ */ t("div", { className: "font-semibold", children: z.code }),
                      /* @__PURE__ */ t("div", { className: "text-text-secondary", children: z.message }),
                      z.nodeId && /* @__PURE__ */ t("div", { className: "mt-0.5 text-[11px] text-primary", children: "Jump to node →" })
                    ] })
                  ]
                },
                `${z.code}-${L}`
              ))
            }
          )
        ] }),
        Ae.variant !== "none" && /* @__PURE__ */ i(
          "span",
          {
            className: S(
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
            onClick: () => I("/pipelines/metrics"),
            title: "View pipeline metrics dashboard",
            "data-testid": "metrics-button",
            children: "Metrics"
          }
        ),
        /* @__PURE__ */ t(
          Ue,
          {
            variant: "secondary",
            onClick: f,
            title: "Export pipeline as JSON",
            "data-testid": "export-button",
            children: "Export"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: h,
            title: Y ? "Already published at this version" : "Publish pipeline to enable runs",
            disabled: Y,
            className: S(
              "px-3 py-1.5 text-[13px] font-semibold border-none rounded-md font-inherit shrink-0",
              Y ? "bg-surface-hover text-text-tertiary cursor-default opacity-70" : "bg-green-600 text-white cursor-pointer"
            ),
            "data-testid": "publish-button",
            children: Y ? "Published" : "Publish"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: m,
            disabled: c || a,
            title: d,
            className: S(
              "px-3.5 py-1.5 text-[13px] font-semibold text-white border-none rounded-md font-inherit shrink-0",
              s ? "bg-red-600" : "bg-primary",
              c || a ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            ),
            "data-testid": "run-button",
            children: a ? /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ t("span", { className: "inline-block w-3 h-3 border-2 border-slate-200 border-t-white rounded-full animate-spin" }),
              "Triggering…"
            ] }) : Ee
          }
        ),
        p.size > 0 && /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: x,
            disabled: c || s,
            title: `Debug run (${p.size} breakpoint${p.size > 1 ? "s" : ""})`,
            className: S(
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
        /* @__PURE__ */ i("div", { className: "relative", ref: de, children: [
          /* @__PURE__ */ t(
            ct,
            {
              onClick: () => ye((z) => !z),
              "aria-label": "More actions",
              "data-testid": "overflow-menu-btn",
              children: "⋯"
            }
          ),
          _e && /* @__PURE__ */ t(
            Es,
            {
              isPublished: Y,
              showTags: C,
              onDuplicate: () => {
                g(), ye(!1);
              },
              onCopyMermaid: () => {
                u(), ye(!1);
              },
              onViewVersions: () => {
                y(), ye(!1);
              },
              onRevert: () => {
                N(), ye(!1);
              },
              onToggleShowTags: () => {
                v(), ye(!1);
              },
              onViewRunHistory: () => {
                b(), ye(!1);
              },
              onClearRunHistory: () => {
                w(), ye(!1);
              },
              onSimPanelOpen: () => {
                k(), ye(!1);
              },
              onDelete: () => {
                R(), ye(!1);
              },
              hasPublishedVersion: typeof n.publishedVersion == "number"
            }
          )
        ] })
      ]
    }
  );
}
const Ls = 12;
function we(e) {
  return S("text-xs", {
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
  const [a, c] = D(n > 2);
  if (n > Ls)
    return /* @__PURE__ */ t("span", { className: we("string"), children: "[max depth]" });
  const d = s || o != null && r?.has(o);
  if (e === null)
    return /* @__PURE__ */ t("span", { className: S(we("null"), d && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "null" });
  if (e === void 0)
    return /* @__PURE__ */ t("span", { className: S(we("null"), d && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "undefined" });
  if (typeof e == "boolean")
    return /* @__PURE__ */ t("span", { className: S(we("boolean"), d && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(e) });
  if (typeof e == "number")
    return /* @__PURE__ */ t("span", { className: S(we("number"), d && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(e) });
  if (typeof e == "string") {
    const l = e.length > 120 ? e.slice(0, 120) + "..." : e;
    return /* @__PURE__ */ i("span", { className: S(we("string"), d && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: [
      '"',
      l,
      '"'
    ] });
  }
  if (Array.isArray(e))
    return e.length === 0 ? /* @__PURE__ */ t("span", { className: we("bracket"), children: "[]" }) : /* @__PURE__ */ i("span", { children: [
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
          children: a ? "▶" : "▼"
        }
      ),
      /* @__PURE__ */ t("span", { className: we("bracket"), children: "[" }),
      a ? /* @__PURE__ */ i("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        e.length,
        " items"
      ] }) : /* @__PURE__ */ t("div", { className: "pl-4", children: e.map((l, p) => /* @__PURE__ */ i("div", { className: "leading-relaxed whitespace-nowrap", children: [
        /* @__PURE__ */ i("span", { className: "text-[#6c7086] text-[11px]", children: [
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
    return l.length === 0 ? /* @__PURE__ */ t("span", { className: we("bracket"), children: "{}" }) : /* @__PURE__ */ i("span", { children: [
      /* @__PURE__ */ t(
        "span",
        {
          className: "cursor-pointer select-none text-[9px] mr-1 text-[#6c7086] inline-block w-3 text-center",
          onClick: () => c((p) => !p),
          role: "button",
          tabIndex: 0,
          onKeyDown: (p) => {
            (p.key === "Enter" || p.key === " ") && c((m) => !m);
          },
          children: a ? "▶" : "▼"
        }
      ),
      /* @__PURE__ */ t("span", { className: we("bracket"), children: "{" }),
      a ? /* @__PURE__ */ i("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        l.length,
        " keys"
      ] }) : /* @__PURE__ */ t("div", { className: "pl-4", children: l.map(([p, m], x) => {
        const f = r?.has(p) || s;
        return /* @__PURE__ */ i("div", { className: "leading-relaxed whitespace-nowrap", children: [
          /* @__PURE__ */ t("span", { className: S(
            "text-xs font-medium text-[#89b4fa]",
            f && "text-[#a6e3a1] font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5"
          ), children: p }),
          /* @__PURE__ */ t("span", { className: we("bracket"), children: ": " }),
          /* @__PURE__ */ t(
            ft,
            {
              data: m,
              depth: n + 1,
              highlightKeys: n === 0 ? r : void 0,
              keyName: p,
              isHighlighted: f
            }
          ),
          x < l.length - 1 && /* @__PURE__ */ t("span", { className: we("bracket"), children: "," })
        ] }, p);
      }) }),
      /* @__PURE__ */ t("span", { className: we("bracket"), children: "}" })
    ] });
  }
  return /* @__PURE__ */ t("span", { className: we("string"), children: String(e) });
}
function _s({
  snapshots: e,
  activeStepId: n,
  fallbackActiveStepId: r,
  onStepSelect: o
}) {
  const s = n ?? r;
  return /* @__PURE__ */ t("div", { className: "w-[140px] shrink-0 border-r border-border overflow-y-auto", children: e.map((a, c) => {
    const d = a.stepId === s;
    return /* @__PURE__ */ i(
      "div",
      {
        className: S(
          "px-2.5 py-1.5 text-[11px] font-mono cursor-pointer border-b border-border overflow-hidden text-ellipsis whitespace-nowrap",
          d ? "text-text-primary bg-surface-inset font-semibold" : "text-text-tertiary font-normal"
        ),
        onClick: () => o?.(a.stepId),
        role: "button",
        tabIndex: 0,
        onKeyDown: (l) => {
          (l.key === "Enter" || l.key === " ") && o?.(a.stepId);
        },
        title: a.stepId,
        children: [
          a.newKeys.length > 0 && /* @__PURE__ */ t("span", { className: "text-[#a6e3a1] mr-1 text-[9px]", children: "+" }),
          /* @__PURE__ */ i("span", { className: "text-[10px] text-[#9399b2] mr-1", children: [
            c + 1,
            "."
          ] }),
          a.stepId ? a.stepId.slice(0, 8) : `step-${c + 1}`
        ]
      },
      a.stepId || c
    );
  }) });
}
function Us(e) {
  return typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : "object";
}
function Bs({ k: e, initial: n, onCommit: r, onError: o, onFocus: s }) {
  const [a, c] = D(() => {
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
      value: a,
      onChange: (d) => c(d.target.value),
      onFocus: s,
      onBlur: () => {
        try {
          const d = JSON.parse(a);
          r(d);
        } catch (d) {
          o(`Invalid JSON: ${d instanceof Error ? d.message : String(d)}`);
        }
      },
      className: "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono min-h-[60px] resize-y"
    }
  );
}
function js({
  inputContext: e,
  buffer: n,
  parseErrors: r,
  newKeyDraft: o,
  setNewKeyDraft: s,
  onCommitNewKey: a,
  onBeginEditKey: c,
  onSetValue: d,
  onRemoveKey: l,
  onParseError: p
}) {
  const m = _(() => {
    const f = /* @__PURE__ */ new Set([
      ...Object.keys(e),
      ...Object.keys(n)
    ]);
    return Array.from(f);
  }, [e, n]), x = "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono";
  return /* @__PURE__ */ i("div", { "data-testid": "context-edit-table", children: [
    m.map((f) => {
      const h = f in n, g = h ? n[f] : e[f], u = Us(g), y = h;
      return /* @__PURE__ */ i(
        "div",
        {
          className: "grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 border-b border-[#313244]",
          "data-testid": `context-edit-row-${f}`,
          children: [
            /* @__PURE__ */ i(
              "span",
              {
                className: S(
                  "text-xs font-medium text-[#89b4fa] pt-1 overflow-hidden text-ellipsis whitespace-nowrap",
                  y && "text-[#a6e3a1] font-bold"
                ),
                title: f,
                children: [
                  f,
                  y && /* @__PURE__ */ t("span", { className: "ml-1 text-[9px]", children: "●" })
                ]
              }
            ),
            /* @__PURE__ */ i("div", { className: "min-w-0", children: [
              u === "boolean" ? /* @__PURE__ */ i(
                "select",
                {
                  "data-testid": `context-edit-input-${f}`,
                  value: String(g),
                  onChange: (N) => d(f, N.target.value === "true"),
                  onFocus: () => c(f, g),
                  className: x,
                  children: [
                    /* @__PURE__ */ t("option", { value: "true", children: "true" }),
                    /* @__PURE__ */ t("option", { value: "false", children: "false" })
                  ]
                }
              ) : u === "number" ? /* @__PURE__ */ t(
                "input",
                {
                  "data-testid": `context-edit-input-${f}`,
                  type: "number",
                  value: String(g),
                  onChange: (N) => {
                    const v = N.target.value === "" ? 0 : Number(N.target.value);
                    d(f, Number.isNaN(v) ? 0 : v);
                  },
                  onFocus: () => c(f, g),
                  className: x
                }
              ) : u === "string" ? /* @__PURE__ */ t(
                "input",
                {
                  "data-testid": `context-edit-input-${f}`,
                  type: "text",
                  value: g ?? "",
                  onChange: (N) => d(f, N.target.value),
                  onFocus: () => c(f, g),
                  className: x
                }
              ) : /* @__PURE__ */ t(
                Bs,
                {
                  k: f,
                  initial: g,
                  onCommit: (N) => d(f, N),
                  onError: (N) => p(f, N),
                  onFocus: () => c(f, g)
                }
              ),
              r[f] && /* @__PURE__ */ t(
                "div",
                {
                  "data-testid": `context-edit-parse-error-${f}`,
                  className: "text-[#f38ba8] text-[11px] mt-1",
                  children: r[f]
                }
              )
            ] }),
            /* @__PURE__ */ t("div", { className: "flex gap-1", children: y && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                "data-testid": `context-edit-revert-${f}`,
                onClick: () => l(f),
                title: "Drop change",
                className: "px-1.5 py-0.5 text-[10px] bg-transparent text-[#9399b2] border border-[#313244] rounded-sm cursor-pointer font-mono",
                children: "↺"
              }
            ) })
          ]
        },
        f
      );
    }),
    /* @__PURE__ */ i(
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
              onChange: (f) => s({ ...o, key: f.target.value }),
              className: x
            }
          ),
          /* @__PURE__ */ t(
            "input",
            {
              "data-testid": "context-edit-new-value",
              type: "text",
              placeholder: "value (string or JSON)",
              value: o.value,
              onChange: (f) => s({ ...o, value: f.target.value }),
              onKeyDown: (f) => {
                f.key === "Enter" && (f.preventDefault(), a());
              },
              className: x
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": "context-edit-add-btn",
              onClick: a,
              disabled: !o.key.trim(),
              className: S(
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
function Fs(e, n, r) {
  const o = { ...e }, s = { ...o.steps ?? {} };
  return s[n] = r, o.steps = s, r && typeof r == "object" && !Array.isArray(r) && Object.assign(o, r), o;
}
function zs(e, n) {
  const r = [];
  for (const o of Object.keys(n))
    o in e || r.push(o);
  return r;
}
function qs(e) {
  const n = Object.values(e.steps).filter((s) => s != null).sort((s, a) => {
    const c = s.startedAt ? Date.parse(s.startedAt) : 0, d = a.startedAt ? Date.parse(a.startedAt) : 0;
    return c - d;
  }), r = [];
  let o = {};
  e.triggeredBy?.payload && typeof e.triggeredBy.payload == "object" && (o = { ...e.triggeredBy.payload });
  for (const s of n) {
    const a = { ...o }, c = s.output, d = s.llm?.prompt;
    let l;
    if (c !== void 0)
      l = Fs(o, s.nodeId, c);
    else {
      l = { ...o };
      const m = {
        ...l.steps ?? {}
      };
      m[s.nodeId] = c, l.steps = m;
    }
    const p = zs(a, l);
    r.push({
      stepId: s.nodeId,
      inputContext: a,
      output: c,
      outputContext: l,
      resolvedPrompt: d || void 0,
      newKeys: p,
      stepExecution: s
    }), o = l;
  }
  return r;
}
function Hs(e, n) {
  const [r, o] = D(/* @__PURE__ */ new Map()), [s, a] = D(
    /* @__PURE__ */ new Map()
  ), c = re(null);
  J(() => {
    const f = e?.id ?? null;
    f !== c.current && (c.current = f, o(/* @__PURE__ */ new Map()), a(/* @__PURE__ */ new Map()));
  }, [e?.id]);
  const d = P(
    (f) => {
      if (!f || typeof f != "object") return;
      const { eventType: h, payload: g } = f;
      if (!g || typeof g != "object") return;
      const u = g, y = u.runId;
      if (!(!e?.id || y !== e.id)) {
        if (h === "pipeline.llm.prompt") {
          const N = u.stepId, v = u.prompt;
          N && v && o((C) => {
            const b = new Map(C);
            return b.set(N, v), b;
          });
        }
        if (h === "pipeline.run.checkpoint" || h === "pipeline.run.checkpointed" || h === "pipeline:run:checkpoint" || h === "pipeline:run:checkpointed") {
          const N = u.context, v = u.stepId;
          N && v && a((C) => {
            const b = new Map(C);
            return b.set(v, N), b;
          });
        }
      }
    },
    [e?.id]
  );
  Re("*", d);
  const l = _(() => e ? qs(e) : [], [e]), p = _(() => l.map((f) => {
    const h = r.get(f.stepId), g = s.get(f.stepId);
    return {
      ...f,
      resolvedPrompt: f.resolvedPrompt || h,
      outputContext: g ?? f.outputContext
    };
  }), [l, r, s]), m = _(() => n ? p.find((f) => f.stepId === n) ?? null : p[p.length - 1] ?? null, [p, n]), x = _(() => m ? new Set(m.newKeys) : /* @__PURE__ */ new Set(), [m]);
  return { enrichedSnapshots: p, activeSnapshot: m, newKeysSet: x };
}
function rn({ attempt: e, label: n }) {
  const r = !e.error;
  return /* @__PURE__ */ i("div", { className: "bg-[#11111b] rounded-md border border-[#313244] p-2.5 overflow-auto", children: [
    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold text-[#cdd6f4] mb-2", children: n }),
    /* @__PURE__ */ i("div", { className: "flex gap-1.5 mb-1.5 items-center", children: [
      /* @__PURE__ */ t("span", { className: S(
        "text-[10px] font-semibold px-1.5 py-px rounded-sm",
        r ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
      ), children: r ? "OK" : "FAIL" }),
      e.durationMs != null && /* @__PURE__ */ i("span", { className: "text-[10px] text-[#6c7086]", children: [
        e.durationMs,
        "ms"
      ] })
    ] }),
    e.error && /* @__PURE__ */ t("div", { className: "text-[11px] text-[#f38ba8] font-mono mb-1.5 px-2 py-1.5 bg-[#1a0f14] rounded whitespace-pre-wrap break-words", children: e.error }),
    e.output !== void 0 && /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ t("div", { className: "text-[10px] text-[#6c7086] font-semibold mb-1 uppercase", children: "Output" }),
      /* @__PURE__ */ t(ft, { data: e.output, depth: 0 })
    ] })
  ] });
}
function Ks({
  run: e,
  activeStepId: n,
  onStepSelect: r,
  editable: o = !1,
  onEditBufferChange: s,
  resetEditBufferKey: a
}) {
  const [c, d] = D("input"), [l, p] = D(0), [m, x] = D(!1), [f, h] = D({}), [g, u] = D(null), [y, N] = D({}), [v, C] = D({
    key: "",
    value: ""
  }), { enrichedSnapshots: b, activeSnapshot: w, newKeysSet: k } = Hs(e, n), R = w?.resolvedPrompt != null, I = w?.stepExecution.attempts, A = (I?.length ?? 0) >= 2;
  J(() => {
    c === "prompt" && !R && d("input"), c === "attempts" && !A && d("input");
  }, [c, R, A]), J(() => {
    p(0);
  }, [n]);
  const $ = !!(e && e.status === "paused_at_breakpoint" && n && (e.currentStepIds?.includes(n) || w?.stepExecution.status === "running" || w?.stepExecution.status === "awaiting" || w?.stepExecution.status === "pending")), q = !!o && !!$;
  J(() => {
    q ? g && g !== n && (h({}), u(null), N({})) : (m && x(!1), Object.keys(f).length > 0 && h({}), g && u(null), Object.keys(y).length > 0 && N({}));
  }, [q, n]), J(() => {
    a !== void 0 && (h({}), u(null), N({}), C({ key: "", value: "" }));
  }, [a]), J(() => {
    !q || !n || s && (Object.keys(f).length === 0 ? s(n, null) : s(n, f));
  }, [f, q, n]);
  const V = P(
    (O, Y) => {
      u(n), h((K) => O in K ? K : { ...K, [O]: Y });
    },
    [n]
  ), Q = P(
    (O, Y) => {
      u(n), h((K) => ({ ...K, [O]: Y })), N((K) => {
        if (!(O in K)) return K;
        const j = { ...K };
        return delete j[O], j;
      });
    },
    [n]
  ), ae = P((O) => {
    h((Y) => {
      if (!(O in Y)) return Y;
      const K = { ...Y };
      return delete K[O], K;
    }), N((Y) => {
      if (!(O in Y)) return Y;
      const K = { ...Y };
      return delete K[O], K;
    });
  }, []), le = P((O, Y) => {
    N((K) => ({ ...K, [O]: Y }));
  }, []), oe = P(() => {
    h({}), u(null), N({}), C({ key: "", value: "" });
  }, []), ue = P(() => {
    const O = v.key.trim();
    if (!O) return;
    let Y = v.value;
    const K = v.value;
    if (K.trim().length > 0)
      try {
        Y = JSON.parse(K);
      } catch {
        Y = K;
      }
    Q(O, Y), C({ key: "", value: "" });
  }, [v, Q]);
  return !e || b.length === 0 ? /* @__PURE__ */ i("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0", children: /* @__PURE__ */ t("span", { className: "text-xs font-bold text-text-primary tracking-wide uppercase", children: "Context Inspector" }) }),
    /* @__PURE__ */ i("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs flex items-center justify-center flex-col gap-2", children: [
      /* @__PURE__ */ t("span", { className: "text-[13px] text-[#6c7086]", children: e ? "Waiting for step execution data..." : "Run a pipeline to inspect context flow" }),
      /* @__PURE__ */ t("span", { className: "text-[11px] text-[#45475a]", children: e ? "Context data will appear as steps complete." : "Trigger a run to see inputs, outputs, and context at each step." })
    ] })
  ] }) : /* @__PURE__ */ i("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0", children: [
      /* @__PURE__ */ t("span", { className: "text-xs font-bold text-text-primary tracking-wide uppercase", children: "Context Inspector" }),
      w && w.stepId && /* @__PURE__ */ i("span", { className: "text-[10px] text-[#6c7086]", children: [
        "Step: ",
        w.stepId.slice(0, 8)
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex gap-0 border-b border-border shrink-0", children: [
      { id: "input", label: "Input Context", show: !0 },
      { id: "output", label: "Output", show: !0 },
      { id: "prompt", label: "Resolved Prompt", show: R },
      { id: "details", label: "Details", show: !0 },
      { id: "attempts", label: `Attempts (${I?.length})`, show: A }
    ].filter((O) => O.show).map((O) => /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "data-testid": O.id === "attempts" ? "attempts-tab" : void 0,
        className: S(
          "px-3.5 py-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer font-inherit uppercase tracking-wide border-b-2",
          c === O.id ? "text-primary border-b-primary" : "text-text-tertiary border-b-transparent"
        ),
        onClick: () => d(O.id),
        children: O.label
      },
      O.id
    )) }),
    /* @__PURE__ */ i("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
      /* @__PURE__ */ t(
        _s,
        {
          snapshots: b,
          activeStepId: n,
          fallbackActiveStepId: w?.stepId,
          onStepSelect: r
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs", children: w ? c === "input" ? /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ i("div", { className: "text-[10px] text-[#6c7086] font-semibold uppercase", children: [
            "Input context",
            w.stepId ? ` — step ${w.stepId.slice(0, 8)}` : ""
          ] }),
          q && /* @__PURE__ */ i("div", { className: "flex gap-1.5 items-center", children: [
            m && Object.keys(f).length > 0 && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: oe,
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
                  const O = !m;
                  x(O), O || oe();
                },
                "data-testid": "context-inspector-edit-toggle",
                className: S(
                  "px-2 py-0.5 text-[10px] font-semibold border rounded-sm cursor-pointer font-mono uppercase tracking-wide",
                  m ? "bg-[#d97706] text-white border-[#d97706]" : "bg-transparent text-[#d97706] border-[#d97706]"
                ),
                children: m ? "Editing" : "Edit"
              }
            )
          ] })
        ] }),
        Object.keys(w.inputContext).length === 0 && !(q && m) ? /* @__PURE__ */ t("div", { className: "text-[#6c7086] text-xs italic", children: "No input context (first step or no upstream output)" }) : q && m ? /* @__PURE__ */ t(
          js,
          {
            inputContext: w.inputContext,
            buffer: f,
            parseErrors: y,
            newKeyDraft: v,
            setNewKeyDraft: C,
            onCommitNewKey: ue,
            onBeginEditKey: V,
            onSetValue: Q,
            onRemoveKey: ae,
            onParseError: le
          }
        ) : /* @__PURE__ */ t(
          ft,
          {
            data: w.inputContext,
            highlightKeys: k
          }
        )
      ] }) : c === "output" ? /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ i("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: [
          "Output",
          w.stepId ? ` — step ${w.stepId.slice(0, 8)}` : ""
        ] }),
        /* @__PURE__ */ t(ft, { data: w.output }),
        w.newKeys.length > 0 && /* @__PURE__ */ i("div", { className: "mt-3", children: [
          /* @__PURE__ */ t("div", { className: "text-[10px] text-[#a6e3a1] font-semibold uppercase mb-1", children: "New context keys added" }),
          /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: w.newKeys.map((O) => /* @__PURE__ */ t(
            "span",
            {
              className: "px-1.5 py-0.5 bg-[rgba(166,227,161,0.15)] text-[#a6e3a1] rounded-sm text-[11px] font-semibold font-mono",
              children: O
            },
            O
          )) })
        ] })
      ] }) : c === "prompt" ? /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ t("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: "Resolved prompt template" }),
        /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: w.resolvedPrompt })
      ] }) : c === "details" ? /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ t("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: "Step execution details" }),
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-3", children: [
          w.stepExecution.startedAt && /* @__PURE__ */ i("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Duration" }),
            /* @__PURE__ */ i("div", { className: "text-[11px] text-[#cdd6f4]", children: [
              "Started: ",
              w.stepExecution.startedAt,
              w.stepExecution.completedAt && /* @__PURE__ */ i(G, { children: [
                /* @__PURE__ */ t("br", {}),
                "Completed: ",
                w.stepExecution.completedAt,
                w.stepExecution.durationMs != null && /* @__PURE__ */ i(G, { children: [
                  /* @__PURE__ */ t("br", {}),
                  "Duration: ",
                  w.stepExecution.durationMs,
                  "ms"
                ] })
              ] })
            ] })
          ] }),
          w.stepExecution.llm && /* @__PURE__ */ i("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "LLM Metrics" }),
            /* @__PURE__ */ i("div", { className: "text-[11px] text-[#cdd6f4]", children: [
              "Tokens in: ",
              w.stepExecution.llm.tokensIn,
              /* @__PURE__ */ t("br", {}),
              "Tokens out: ",
              w.stepExecution.llm.tokensOut,
              w.stepExecution.llm.firstTokenLatencyMs != null && /* @__PURE__ */ i(G, { children: [
                /* @__PURE__ */ t("br", {}),
                "First token latency: ",
                w.stepExecution.llm.firstTokenLatencyMs,
                "ms"
              ] })
            ] }),
            w.stepExecution.llm.response && /* @__PURE__ */ i(G, { children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mt-2 mb-1", children: "Response Text" }),
              /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: w.stepExecution.llm.response })
            ] })
          ] }),
          w.stepExecution.error && /* @__PURE__ */ i("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#f38ba8] font-semibold mb-1", children: "Error" }),
            /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-[#1a0f14] border border-[#f38ba8] rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: /* @__PURE__ */ t("div", { className: "text-[#f38ba8] font-semibold mb-1", children: w.stepExecution.error }) })
          ] }),
          w.stepExecution.approvals && w.stepExecution.approvals.length > 0 && /* @__PURE__ */ i("div", { children: [
            /* @__PURE__ */ i("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: [
              "Approvals (",
              w.stepExecution.approvals.length,
              ")"
            ] }),
            w.stepExecution.approvals.map((O, Y) => /* @__PURE__ */ i("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2", children: [
              /* @__PURE__ */ i("div", { className: "flex gap-2 mb-1", children: [
                /* @__PURE__ */ t("span", { className: S(
                  "px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                  O.decision === "approve" ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
                ), children: O.decision.toUpperCase() }),
                /* @__PURE__ */ t("span", { className: "text-[11px] text-[#cdd6f4]", children: O.userId })
              ] }),
              O.comment && /* @__PURE__ */ i("div", { className: "text-[11px] text-[#9399b2] italic", children: [
                '"',
                O.comment,
                '"'
              ] }),
              /* @__PURE__ */ t("div", { className: "text-[10px] text-[#6c7086] mt-1", children: O.at })
            ] }, Y))
          ] }),
          /* @__PURE__ */ i("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Status" }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#cdd6f4]", children: w.stepExecution.status })
          ] })
        ] })
      ] }) : c === "attempts" && I && I.length >= 2 ? /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": "attempts-prev",
              disabled: l === 0,
              onClick: () => p((O) => O - 1),
              className: S(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l === 0 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "←"
            }
          ),
          /* @__PURE__ */ i(
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
                I.length
              ]
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": "attempts-next",
              disabled: l >= I.length - 2,
              onClick: () => p((O) => O + 1),
              className: S(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l >= I.length - 2 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "→"
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { className: "grid grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ t(rn, { attempt: I[l], label: `Attempt ${l + 1}` }),
          /* @__PURE__ */ t(rn, { attempt: I[l + 1], label: `Attempt ${l + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function Ws({
  definition: e,
  pausedBreakpoint: n,
  applyingPatch: r,
  revertingPatchId: o,
  dirtyPatch: s,
  dirtyPatchStepId: a,
  resetEditBufferKey: c,
  onContinue: d,
  onStepOver: l,
  onResumeAll: p,
  onApplyAndContinue: m,
  onRevertPatch: x,
  onEditBufferChange: f
}) {
  const g = st().runs[n.runId] ?? null, y = g?.steps?.[n.stepId]?.patches ?? [], N = !!s && a === n.stepId && Object.keys(s).length > 0, v = g?.status === "paused_at_breakpoint";
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "breakpoint-pause-overlay",
      className: S(
        "absolute top-14 left-1/2 -translate-x-1/2 z-30",
        "bg-surface border-2 border-amber-600 rounded-lg",
        "px-4 py-3 shadow-[0_8px_24px_rgba(217,119,6,0.2)]",
        "flex flex-col gap-3 font-inherit",
        "w-[min(900px,92vw)] max-h-[calc(100vh-120px)]"
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ i("span", { className: "text-[13px] font-semibold text-amber-600", children: [
            "Paused at: ",
            ut(e, n.stepId)
          ] }),
          N && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: m,
              disabled: r,
              "data-testid": "breakpoint-apply-continue-btn",
              className: S(
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
              className: S(
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
              className: S(
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
              className: S(
                "px-3 py-1 text-xs font-semibold bg-transparent text-amber-600",
                "border border-amber-600 rounded font-inherit",
                r ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              ),
              "data-testid": "breakpoint-resume-all-btn",
              children: "Resume All"
            }
          )
        ] }),
        /* @__PURE__ */ i(
          "div",
          {
            className: "grid [grid-template-columns:minmax(0,1fr)_240px] gap-3 min-h-[280px] max-h-[calc(100vh-220px)]",
            children: [
              /* @__PURE__ */ t("div", { className: "border border-border rounded-md bg-surface-inset overflow-hidden min-h-0", children: g ? /* @__PURE__ */ t(
                Ks,
                {
                  run: g,
                  activeStepId: n.stepId,
                  editable: !0,
                  onEditBufferChange: f,
                  resetEditBufferKey: c
                }
              ) : /* @__PURE__ */ t("div", { className: "p-3 text-xs text-text-tertiary", children: "Loading run…" }) }),
              /* @__PURE__ */ i(
                "div",
                {
                  "data-testid": "breakpoint-patch-history",
                  className: "border border-border rounded-md bg-surface-inset p-2.5 overflow-auto min-h-0",
                  children: [
                    /* @__PURE__ */ i("div", { className: "text-[10px] font-bold text-text-primary tracking-wide uppercase mb-2", children: [
                      "Patch history (",
                      y.length,
                      ")"
                    ] }),
                    y.length === 0 ? /* @__PURE__ */ t(
                      "div",
                      {
                        className: "text-[11px] text-text-tertiary italic",
                        "data-testid": "breakpoint-patch-history-empty",
                        children: "No patches applied yet."
                      }
                    ) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-2", children: y.map((C) => {
                      const b = !!C.revertedAt;
                      return /* @__PURE__ */ i(
                        "div",
                        {
                          "data-testid": `breakpoint-patch-row-${C.patchId}`,
                          className: S(
                            "border border-border rounded p-1.5",
                            b ? "bg-gray-500/10 opacity-60" : "bg-[#11111b]"
                          ),
                          children: [
                            /* @__PURE__ */ i("div", { className: "flex items-center gap-1 text-[10px] text-[#cdd6f4] mb-0.5", children: [
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
                            /* @__PURE__ */ i("div", { className: "text-[10px] text-[#9399b2]", children: [
                              C.appliedAt,
                              C.appliedBy && /* @__PURE__ */ i(G, { children: [
                                " · ",
                                /* @__PURE__ */ t("span", { className: "text-[#cdd6f4]", children: C.appliedBy })
                              ] })
                            ] }),
                            !b && /* @__PURE__ */ t(
                              "button",
                              {
                                type: "button",
                                "data-testid": `breakpoint-patch-revert-${C.patchId}`,
                                onClick: () => x(C.patchId),
                                disabled: !v || o === C.patchId,
                                title: v ? "Revert this patch" : "Run has progressed past this breakpoint — revert no longer allowed",
                                className: S(
                                  "mt-1 px-2 py-0.5 text-[10px] font-semibold bg-transparent rounded-sm font-inherit",
                                  v ? "text-red-400 border border-red-400 cursor-pointer" : "text-gray-700 border border-gray-700 cursor-not-allowed",
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
function he({ label: e, required: n, help: r, error: o, children: s, className: a }) {
  return /* @__PURE__ */ i("div", { className: S("flex flex-col", a), children: [
    /* @__PURE__ */ i("label", { className: "text-xs font-semibold text-text-secondary", children: [
      e,
      n && /* @__PURE__ */ t("span", { className: "text-[#dc2626] ml-1", children: "●" })
    ] }),
    /* @__PURE__ */ t("div", { className: "mt-1", children: s }),
    o && /* @__PURE__ */ t("div", { className: "text-[11px] text-[#dc2626] mt-0.5", children: o }),
    !o && r && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: r })
  ] });
}
function Vs({ title: e, defaultCollapsed: n = !1, children: r, className: o }) {
  const [s, a] = D(n);
  return /* @__PURE__ */ i("div", { className: S("flex flex-col", o), children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => a((c) => !c),
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
  return /* @__PURE__ */ t("div", { className: S("flex flex-col gap-3 px-4 py-3", n), children: e });
}
const Js = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function Gs(e, n, r) {
  const o = e.trim();
  if (o === "") return null;
  const s = /^\*\/(\d+)$/.exec(o);
  if (s) {
    const d = Number(s[1]);
    return !Number.isFinite(d) || d <= 0 ? null : { match: "*", step: d };
  }
  if (o === "*") return { match: "*" };
  const a = /^(\d+)-(\d+)$/.exec(o);
  if (a) {
    const d = Number(a[1]), l = Number(a[2]);
    if (!Number.isFinite(d) || !Number.isFinite(l) || d < n || l > r || d > l) return null;
    const p = [];
    for (let m = d; m <= l; m++) p.push(m);
    return { match: p };
  }
  if (o.includes(",")) {
    const d = o.split(","), l = /* @__PURE__ */ new Set(), p = [];
    for (const m of d) {
      const x = Number(m.trim());
      if (!Number.isFinite(x) || !Number.isInteger(x) || x < n || x > r) return null;
      l.has(x) || (l.add(x), p.push(x));
    }
    return p.length === 0 ? null : { match: p };
  }
  const c = Number(o);
  return !Number.isFinite(c) || !Number.isInteger(c) || c < n || c > r ? null : { match: [c] };
}
function Ys(e) {
  if (typeof e != "string") return null;
  const n = e.trim().split(/\s+/);
  if (n.length !== 5) return null;
  const r = {};
  for (let o = 0; o < 5; o++) {
    const s = Js[o], a = Gs(n[o], s.min, s.max);
    if (!a) return null;
    r[s.name] = a;
  }
  return r;
}
function at(e, n, r) {
  return e.match === "*" ? !e.step || e.step === 1 ? !0 : (n - r) % e.step === 0 : e.match.includes(n);
}
function Xs(e, n) {
  return at(e.minute, n.getMinutes(), 0) && at(e.hour, n.getHours(), 0) && at(e.dayOfMonth, n.getDate(), 1) && at(e.month, n.getMonth() + 1, 1) && at(e.dayOfWeek, n.getDay(), 0);
}
function Qs(e, n, r) {
  const o = [], s = new Date(n.getTime());
  s.setSeconds(0, 0), s.setMinutes(s.getMinutes() + 1);
  const a = 1440 * 366, c = new Date(s.getTime());
  for (let d = 0; d < a && o.length < r; d++)
    Xs(e, c) && o.push(new Date(c.getTime())), c.setMinutes(c.getMinutes() + 1);
  return o;
}
const on = /^[a-zA-Z0-9_-]{1,64}$/, Zs = "http://localhost:13001";
function ei() {
  try {
    const e = localStorage.getItem("ws_document_types_v1");
    if (!e) return [];
    const n = JSON.parse(e);
    return Array.isArray(n) ? n.filter((r) => typeof r == "object" && r !== null).filter((r) => typeof r.id == "string" && typeof r.name == "string").map((r) => ({ id: r.id, name: r.name })) : [];
  } catch {
    return [];
  }
}
const ti = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function ni({ data: e, onChange: n }) {
  const { toast: r } = Ct(), s = Zn(rr)?.definition?.triggerBinding?.webhookSecret, [a, c] = D(!1), d = e.triggerType.startsWith("document."), l = _(() => d ? ei() : [], [d]), p = d && !e.documentTypeId, m = e.triggerType === "schedule" && !e.schedule, x = e.triggerType === "webhook" && !e.webhookPath, f = e.webhookPath ?? "", h = e.triggerType === "webhook" && f.length > 0 && !on.test(f), g = e.triggerType === "webhook" && on.test(f) ? `${Zs}/hooks/pipeline/${f}` : null, u = () => {
    g && navigator.clipboard.writeText(g).then(() => r("Webhook URL copied", { type: "success" })).catch(() => r("Could not copy webhook URL", { type: "error" }));
  }, y = () => {
    s && navigator.clipboard.writeText(s).then(() => r("Webhook secret copied", { type: "success" })).catch(() => r("Could not copy webhook secret", { type: "error" }));
  }, N = e.triggerType === "schedule" ? e.schedule ?? "" : "", v = _(
    () => N ? Ys(N) : null,
    [N]
  ), C = _(() => v ? Qs(v, /* @__PURE__ */ new Date(), 3) : [], [v]), b = e.triggerType === "schedule" && !!N && !v, w = e.triggerType === "document.finalize" ? "On finalize" : e.triggerType === "document.submit" ? "On submit for review" : e.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ i(Ve, { children: [
    /* @__PURE__ */ t(he, { label: "Trigger type", required: !0, children: /* @__PURE__ */ t(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.triggerType,
        onChange: (k) => n({ triggerType: k.target.value }),
        children: ti.map((k) => /* @__PURE__ */ t("option", { value: k.value, children: k.label }, k.value))
      }
    ) }),
    d && /* @__PURE__ */ i(
      he,
      {
        label: "Document type",
        required: !0,
        error: p ? "Select a document type." : void 0,
        help: p ? void 0 : "Which document type should trigger this pipeline.",
        children: [
          /* @__PURE__ */ i(
            "select",
            {
              className: S(
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
          w && /* @__PURE__ */ i("div", { className: "text-[11px] text-text-tertiary mt-1.5", children: [
            "Event: ",
            /* @__PURE__ */ t("span", { className: "font-semibold text-text-secondary", children: w })
          ] })
        ]
      }
    ),
    e.triggerType === "schedule" && /* @__PURE__ */ i(
      he,
      {
        label: "Schedule (cron)",
        required: !0,
        error: m ? "Cron expression is required." : b ? "Invalid cron expression — supports *, */N, N,M, A-B, exact values." : void 0,
        help: !m && !b ? "5-field cron: minute hour day month weekday." : void 0,
        children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "text",
              className: S(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                m || b ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "*/15 * * * *",
              value: e.schedule ?? "",
              onChange: (k) => n({ schedule: k.target.value })
            }
          ),
          /* @__PURE__ */ t("div", { className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono", children: C.length > 0 ? /* @__PURE__ */ i(G, { children: [
            /* @__PURE__ */ t("div", { className: "text-text-secondary mb-1", children: "Next 3 fires:" }),
            C.map((k, R) => /* @__PURE__ */ t("div", { children: k.toLocaleString() }, R))
          ] }) : /* @__PURE__ */ t("span", { children: "Next fires: enter a valid cron expression to preview." }) })
        ]
      }
    ),
    e.triggerType === "webhook" && /* @__PURE__ */ i("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ t(
        he,
        {
          label: "Path",
          required: !0,
          error: x ? "Webhook path is required." : h ? "Path must be alphanumeric (plus _, -)" : void 0,
          help: !x && !h ? "Alphanumeric, _, or - (max 64 chars). No leading slash." : void 0,
          children: /* @__PURE__ */ t(
            "input",
            {
              type: "text",
              className: S(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                x || h ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "weekly-digest",
              value: f,
              onChange: (k) => n({ webhookPath: k.target.value })
            }
          )
        }
      ),
      /* @__PURE__ */ t("div", { className: "p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: g ? /* @__PURE__ */ i(G, { children: [
        /* @__PURE__ */ i("span", { className: "flex-1", children: [
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
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ t("label", { className: "text-xs font-semibold text-text-secondary", children: "Signing secret" }),
        /* @__PURE__ */ t("div", { className: "mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: s ? /* @__PURE__ */ i(G, { children: [
          /* @__PURE__ */ t("span", { className: "flex-1", "aria-label": "webhook secret", children: a ? s : "•".repeat(32) }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => c((k) => !k),
              className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
              children: a ? "Hide" : "Reveal"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: y,
              className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
              children: "Copy"
            }
          )
        ] }) : /* @__PURE__ */ i("span", { className: "font-sans text-text-tertiary", children: [
          "Save the pipeline to mint a signing secret. External callers must send ",
          /* @__PURE__ */ t("code", { children: "X-Pipeline-Signature-256: sha256=<hmac>" }),
          "."
        ] }) }),
        /* @__PURE__ */ i("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: [
          "HMAC-SHA256 of the raw request body. Send as",
          " ",
          /* @__PURE__ */ t("code", { children: "X-Pipeline-Signature-256: sha256=<hex>" }),
          "."
        ] })
      ] })
    ] })
  ] });
}
const sn = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, ri = 3e4;
function oi(e) {
  return e < 1e3 ? `${Math.round(e)}ms` : e < 6e4 ? `${(e / 1e3).toFixed(e < 1e4 ? 1 : 0)}s` : `${Math.round(e / 6e4)}m`;
}
function si(e) {
  const n = [];
  for (let r = 1; r < e.maxAttempts; r++) {
    const o = e.backoffMs * Math.pow(e.backoffMultiplier, r - 1);
    n.push(Math.min(o, ri));
  }
  return n;
}
function zt({ value: e, onChange: n }) {
  const r = e !== void 0, o = e ?? sn, s = r ? si(o) : [], c = s.reduce((d, l) => d + l, 0) > 300 * 1e3;
  return /* @__PURE__ */ i("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ i("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          checked: r,
          onChange: (d) => n(d.target.checked ? sn : void 0),
          "aria-label": "Enable retries"
        }
      ),
      "Retry policy"
    ] }),
    !r && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-1", children: "No retries — failure is terminal on first attempt." }),
    r && /* @__PURE__ */ i(G, { children: [
      /* @__PURE__ */ i("div", { className: "grid grid-cols-3 gap-2 mt-1", children: [
        /* @__PURE__ */ i("div", { children: [
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
        /* @__PURE__ */ i("div", { children: [
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
        /* @__PURE__ */ i("div", { children: [
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
      /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: o.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : s.length === 0 ? `Retries up to ${o.maxAttempts}× with no delay.` : `Retries up to ${o.maxAttempts}× with delays: ${s.map(oi).join(", ")}.` }),
      c && /* @__PURE__ */ t("div", { className: "text-[11px] text-[#ca8a04] mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const an = {
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
}, ii = [
  "context.doc.body",
  "context.doc.title",
  "context.trigger.userId",
  "context.steps"
], Fn = {
  "context.doc.body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "context.doc.title": "Sample Document Title",
  "context.trigger.userId": "user_abc123",
  "context.steps": '["step-1: fetched document", "step-2: validated schema"]'
};
function ln(e) {
  return e.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (n, r) => Fn[r] ?? `{{${r}}}`);
}
function ai({ data: e, onChange: n }) {
  const [r, o] = D(!1), s = !e.systemPrompt?.trim(), a = !e.userPromptTemplate?.trim(), c = (d) => {
    const l = an[d], p = l.includes(e.model) ? e.model : l[0];
    n({ provider: d, model: p });
  };
  return /* @__PURE__ */ i(Ve, { children: [
    /* @__PURE__ */ t(he, { label: "Provider", required: !0, children: /* @__PURE__ */ i(
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
    /* @__PURE__ */ t(he, { label: "Model", required: !0, children: /* @__PURE__ */ t(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.model,
        onChange: (d) => n({ model: d.target.value }),
        children: an[e.provider].map((d) => /* @__PURE__ */ t("option", { value: d, children: d }, d))
      }
    ) }),
    /* @__PURE__ */ t(
      he,
      {
        label: "System prompt",
        required: !0,
        error: s ? "System prompt is required." : void 0,
        help: s ? void 0 : "Sets the model's role and constraints.",
        children: /* @__PURE__ */ t(
          "textarea",
          {
            className: S(
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
      he,
      {
        label: "User prompt template",
        required: !0,
        error: a ? "User prompt template is required." : void 0,
        help: a ? void 0 : "Supports {{ context.* }} substitution — click a pill above to insert.",
        children: /* @__PURE__ */ t(
          Bt,
          {
            value: e.userPromptTemplate,
            onChange: (d) => n({ userPromptTemplate: d }),
            language: "template",
            variables: ii,
            minLines: 6,
            "aria-label": "User prompt template"
          }
        )
      }
    ),
    /* @__PURE__ */ i(Vs, { title: "Advanced", defaultCollapsed: !0, children: [
      /* @__PURE__ */ i(
        he,
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
      /* @__PURE__ */ t(he, { label: "Max tokens", help: "Upper bound on response length.", children: /* @__PURE__ */ t(
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
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ i("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
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
        zt,
        {
          value: e.retryPolicy,
          onChange: (d) => n({ retryPolicy: d })
        }
      )
    ] }),
    /* @__PURE__ */ i(
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
    r && /* @__PURE__ */ i("div", { className: "bg-surface-inset border border-border rounded-lg p-3 flex flex-col gap-2.5", children: [
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved system prompt" }),
        /* @__PURE__ */ t("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: ln(e.systemPrompt || "(empty)") })
      ] }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ t("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: ln(e.userPromptTemplate || "(empty)") })
      ] }),
      /* @__PURE__ */ i("div", { className: "text-[11px] text-text-tertiary", children: [
        "Sample values: ",
        Object.keys(Fn).map((d) => `{{${d}}}`).join(", ")
      ] })
    ] })
  ] });
}
const li = ["context", "context.steps", "context.trigger"], di = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function ci({ data: e, onChange: n }) {
  const r = !e.expression?.trim();
  return /* @__PURE__ */ i(Ve, { children: [
    /* @__PURE__ */ t(he, { label: "Type", required: !0, children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: di.map((o) => /* @__PURE__ */ i(
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
      he,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : e.transformType === "jsonpath" ? 'e.g. $.items[?(@.status == "active")]' : e.transformType === "template" ? "Mustache-style: {{ context.doc.title }}" : e.transformType === "javascript" ? "return ctx.items.filter(x => x.active)" : void 0,
        children: /* @__PURE__ */ t(
          Bt,
          {
            value: e.expression,
            onChange: (o) => n({ expression: o }),
            language: e.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: li,
            "aria-label": "Transform expression"
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      he,
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
      zt,
      {
        value: e.retryPolicy,
        onChange: (o) => n({ retryPolicy: o })
      }
    ),
    /* @__PURE__ */ t(he, { label: "Preview", children: /* @__PURE__ */ i("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ i("div", { children: [
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
      /* @__PURE__ */ i("div", { children: [
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
const pi = ["context.trigger", "context.steps"];
function ui({ data: e, onChange: n }) {
  const r = !e.expression?.trim();
  return /* @__PURE__ */ i(Ve, { children: [
    /* @__PURE__ */ t(
      he,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : "e.g. context.llm.response.length > 500",
        children: /* @__PURE__ */ t(
          Bt,
          {
            value: e.expression,
            onChange: (o) => n({ expression: o }),
            language: "javascript",
            variables: pi,
            "aria-label": "Condition expression"
          }
        )
      }
    ),
    /* @__PURE__ */ t(he, { label: "Label (optional — shown on node face)", help: "A short name so this branch is easy to spot.", children: /* @__PURE__ */ t(
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
const mi = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], fi = {
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
function hi({ data: e, onChange: n }) {
  const r = fi[e.actionType], o = e.config ?? {}, s = typeof o.retryCount == "number" ? o.retryCount : 3, a = e.onError === "route-error" ? "route-error" : typeof o.retryCount == "number" ? "retry" : "halt", c = (l, p) => {
    n({ config: { ...o, [l]: p } });
  }, d = (l) => {
    if (l === "route-error") {
      const { retryCount: p, ...m } = o;
      n({ onError: "route-error", config: m });
    } else if (l === "halt") {
      const { retryCount: p, ...m } = o;
      n({ onError: "fail-run", config: m });
    } else
      n({ onError: "fail-run", config: { ...o, retryCount: s } });
  };
  return /* @__PURE__ */ i(Ve, { children: [
    /* @__PURE__ */ t(he, { label: "Action type", required: !0, children: /* @__PURE__ */ t(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.actionType,
        onChange: (l) => n({ actionType: l.target.value, config: {} }),
        children: mi.map((l) => /* @__PURE__ */ t("option", { value: l.value, children: l.label }, l.value))
      }
    ) }),
    /* @__PURE__ */ t(he, { label: "Configuration", children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2.5", children: r.map((l) => /* @__PURE__ */ i("div", { children: [
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
    /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ i("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
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
    e.idempotent && /* @__PURE__ */ i(he, { label: "Dedup scope", children: [
      /* @__PURE__ */ i(
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
      zt,
      {
        value: e.retryPolicy,
        onChange: (l) => n({ retryPolicy: l })
      }
    ),
    /* @__PURE__ */ t(he, { label: "On error", children: /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ i("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: a === "route-error",
            onChange: () => d("route-error")
          }
        ),
        "Route to error handle"
      ] }),
      /* @__PURE__ */ i("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: a === "halt",
            onChange: () => d("halt")
          }
        ),
        "Halt pipeline"
      ] }),
      /* @__PURE__ */ i("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: a === "retry",
            onChange: () => d("retry")
          }
        ),
        "Retry up to",
        /* @__PURE__ */ t(
          "input",
          {
            type: "number",
            min: 1,
            disabled: a !== "retry",
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
function dn(e, n) {
  const r = e ?? [];
  return r.length === n ? r : r.length > n ? r.slice(0, n) : [...r, ...Array(n - r.length).fill("")];
}
function xi({ data: e, onChange: n }) {
  const r = Math.max(Je, Math.min(lt, e.branchCount || Je)), o = dn(e.branchLabels, r), s = (c) => {
    const d = Math.max(Je, Math.min(lt, c));
    n({
      branchCount: d,
      branchLabels: dn(e.branchLabels, d)
    });
  }, a = (c, d) => {
    const l = [...o];
    l[c] = d, n({ branchLabels: l });
  };
  return /* @__PURE__ */ i(Ve, { children: [
    /* @__PURE__ */ i(
      he,
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
    /* @__PURE__ */ t(he, { label: "Branch labels (optional)", children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: o.map((c, d) => /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ i("span", { className: "text-xs text-text-secondary min-w-[72px]", children: [
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
          onChange: (l) => a(d, l.target.value),
          placeholder: d === 0 ? "primary" : `branch-${d}`
        }
      )
    ] }, d)) }) })
  ] });
}
const gi = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], bi = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function yi({ data: e, onChange: n }) {
  return /* @__PURE__ */ i(Ve, { children: [
    /* @__PURE__ */ i(he, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: gi.map((r) => /* @__PURE__ */ i(
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
            /* @__PURE__ */ i("span", { className: "text-text-tertiary text-[11px]", children: [
              "— ",
              r.hint
            ] })
          ]
        },
        r.value
      )) }),
      e.mode === "n_of_m" && /* @__PURE__ */ i("div", { className: "mt-2 flex items-center gap-2", children: [
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
    /* @__PURE__ */ t(he, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: bi.map((r) => /* @__PURE__ */ i(
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
          /* @__PURE__ */ i("span", { className: "text-text-tertiary text-[11px]", children: [
            "— ",
            r.hint
          ] })
        ]
      },
      r.value
    )) }) }),
    /* @__PURE__ */ i("div", { className: "p-2 bg-surface-inset border border-border rounded-md text-xs text-text-secondary", children: [
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
function vi(e) {
  return !e || e <= 0 ? "minutes" : e % mt.hours === 0 ? "hours" : e % mt.minutes === 0 ? "minutes" : "seconds";
}
function Ni({ data: e, onChange: n }) {
  const r = e.approvers ?? [], o = r.length === 0, [s, a] = D(() => vi(e.timeoutMs)), c = e.timeoutMs !== void 0 ? Math.round(e.timeoutMs / mt[s]) : "", d = r.filter((h) => h.type === "user").map((h) => h.value), l = (h) => {
    const g = r.filter((N) => N.type === "role"), y = [...h.map((N) => ({ type: "user", value: N })), ...g];
    n({
      approvers: y,
      // Clamp requiredCount so it never exceeds approvers.length (min 1).
      requiredCount: Math.max(1, Math.min(e.requiredCount || 1, y.length || 1))
    });
  }, p = (h) => {
    const g = r.filter((u, y) => y !== h);
    n({
      approvers: g,
      requiredCount: Math.max(1, Math.min(e.requiredCount || 1, g.length || 1))
    });
  }, m = (h) => {
    if (h === "") {
      n({ timeoutMs: void 0 });
      return;
    }
    const g = Math.max(0, parseInt(h, 10) || 0);
    n({ timeoutMs: g * mt[s] });
  }, x = (h) => {
    a(h), typeof c == "number" && !Number.isNaN(c) && n({ timeoutMs: c * mt[h] });
  }, f = Math.max(1, r.length);
  return /* @__PURE__ */ i(Ve, { children: [
    /* @__PURE__ */ i(
      he,
      {
        label: "Approvers",
        required: !0,
        error: o ? "At least one approver is required." : void 0,
        help: o ? void 0 : "Who can approve this step.",
        children: [
          /* @__PURE__ */ t(
            Lr,
            {
              value: d,
              onChange: l,
              placeholder: "Add approver…"
            }
          ),
          r.length > 0 && /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5 mt-2", children: r.map((h, g) => /* @__PURE__ */ i(
            "span",
            {
              className: S(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-[1.4] whitespace-nowrap",
                h.type === "role" ? "bg-[#fffbeb] text-[#d97706]" : "bg-[#eff6ff] text-[#2563eb]"
              ),
              children: [
                h.type === "role" ? "🎖" : "👤",
                " ",
                h.value,
                /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: () => p(g),
                    "aria-label": `Remove ${h.value}`,
                    className: "bg-transparent border-none p-0 ml-0.5 cursor-pointer text-current font-inherit text-xs leading-none",
                    children: "×"
                  }
                )
              ]
            },
            `${h.type}:${h.value}:${g}`
          )) })
        ]
      }
    ),
    /* @__PURE__ */ t(
      he,
      {
        label: "Required count",
        required: !0,
        help: "How many approvers must say yes.",
        children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "number",
              min: 1,
              max: f,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-24 font-inherit",
              value: e.requiredCount || 1,
              onChange: (h) => {
                const g = parseInt(h.target.value, 10), u = Math.max(1, Math.min(f, Number.isNaN(g) ? 1 : g));
                n({ requiredCount: u });
              }
            }
          ),
          /* @__PURE__ */ i("span", { className: "text-text-tertiary text-xs", children: [
            e.requiredCount || 1,
            " of ",
            f
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ i(he, { label: "Timeout", help: "Leave blank for no timeout.", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "number",
            min: 0,
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-24 flex-none font-inherit",
            value: c,
            onChange: (h) => m(h.target.value),
            placeholder: "24"
          }
        ),
        /* @__PURE__ */ i(
          "select",
          {
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-[120px] flex-none font-inherit",
            value: s,
            onChange: (h) => x(h.target.value),
            children: [
              /* @__PURE__ */ t("option", { value: "seconds", children: "seconds" }),
              /* @__PURE__ */ t("option", { value: "minutes", children: "minutes" }),
              /* @__PURE__ */ t("option", { value: "hours", children: "hours" })
            ]
          }
        )
      ] }),
      e.timeoutMs !== void 0 && e.timeoutMs > 0 && /* @__PURE__ */ i("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "If timeout" }),
        /* @__PURE__ */ t("div", { className: "flex gap-3 mt-1", children: ["reject", "approve"].map((h) => /* @__PURE__ */ i(
          "label",
          {
            className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer",
            children: [
              /* @__PURE__ */ t(
                "input",
                {
                  type: "radio",
                  name: "approval-timeout-action",
                  checked: (e.timeoutAction ?? "reject") === h,
                  onChange: () => n({ timeoutAction: h })
                }
              ),
              h === "reject" ? "Reject" : "Approve"
            ]
          },
          h
        )) })
      ] })
    ] }),
    /* @__PURE__ */ t(he, { label: "Message for approver (optional)", help: "Shown to the approver when the request is sent.", children: /* @__PURE__ */ t(
      "textarea",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]",
        value: e.message ?? "",
        onChange: (h) => n({ message: h.target.value || void 0 }),
        placeholder: "Please review the summary before it's posted to the document."
      }
    ) })
  ] });
}
const wi = {
  // -------------------------------------------------------------------------
  // Trigger
  // -------------------------------------------------------------------------
  trigger: /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "The entry point of every pipeline. Every pipeline has exactly one trigger." }),
    /* @__PURE__ */ t("h4", { children: "Trigger types" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "manual" }),
        " — started by clicking Run in the editor."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "document.finalize" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "document.submit" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "document.comment" }),
        " — fires on doc lifecycle events for a given document type."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "schedule" }),
        " — cron expression (e.g. ",
        /* @__PURE__ */ t("code", { children: "0 9 * * 1-5" }),
        ")."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "webhook" }),
        " — inbound HTTP POST at the configured path."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "triggerType" }),
        " — one of the above."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "documentTypeId" }),
        " — required for ",
        /* @__PURE__ */ t("code", { children: "document.*" }),
        "."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "schedule" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "webhookPath" }),
        " — per type."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ i("p", { children: [
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
  llm: /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Calls an LLM with a prompt template filled from pipeline context." }),
    /* @__PURE__ */ t("h4", { children: "Provider & model" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "anthropic" }),
        " — Claude models (e.g. ",
        /* @__PURE__ */ t("code", { children: "claude-sonnet-4-6" }),
        ")."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "bedrock" }),
        " — same models via AWS Bedrock."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Prompt templates" }),
    /* @__PURE__ */ i("p", { children: [
      "Interpolate with ",
      /* @__PURE__ */ t("code", { children: "{{ context.steps.X.output }}" }),
      " or any dotted path into the run context."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Streaming" }),
    /* @__PURE__ */ i("p", { children: [
      "Toggle on to emit ",
      /* @__PURE__ */ t("code", { children: "pipeline.llm.token" }),
      " events as text arrives; off for a single response."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Errors" }),
    /* @__PURE__ */ i("p", { children: [
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
  transform: /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Pure data transform — JSONPath, template string, or sandboxed JavaScript. No side effects." }),
    /* @__PURE__ */ t("h4", { children: "When to use each" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "jsonpath" }),
        " — extract a value, e.g. ",
        /* @__PURE__ */ t("code", { children: "$.document.body.sections[0]" }),
        "."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "template" }),
        " — shape a string from context, e.g. ",
        /* @__PURE__ */ t("code", { children: "Hi {{context.user.name}}" }),
        "."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "javascript" }),
        " — arbitrary logic; runs in an isolated sandbox with ",
        /* @__PURE__ */ t("code", { children: "context" }),
        " as input."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Output" }),
    /* @__PURE__ */ i("p", { children: [
      /* @__PURE__ */ t("code", { children: "outputKey" }),
      " scopes the result into ",
      /* @__PURE__ */ i("code", { children: [
        "context.",
        "{outputKey}"
      ] }),
      ". Leave blank to merge into the root context."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Condition
  // -------------------------------------------------------------------------
  condition: /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Branches the flow based on a boolean expression evaluated over context." }),
    /* @__PURE__ */ t("h4", { children: "Expression language" }),
    /* @__PURE__ */ i("p", { children: [
      "JSONPath lookups combined with booleans and comparisons, e.g. ",
      /* @__PURE__ */ t("code", { children: '$.llm.output.sentiment == "positive"' }),
      " or ",
      /* @__PURE__ */ t("code", { children: "$.score > 0.8 && $.reviewed" }),
      "."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ i("p", { children: [
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
  action: /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Performs a side-effect: updates a doc, posts a comment, notifies, calls a webhook, or invokes an MCP tool." }),
    /* @__PURE__ */ t("h4", { children: "Subtypes" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "update-document" }),
        " — patch a document's body."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "post-comment" }),
        " — append a comment thread entry."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "notify" }),
        " — push notification to users/roles."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "webhook" }),
        " — outbound HTTP request."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "mcp-tool" }),
        " — invoke a registered MCP tool by name."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Idempotent flag" }),
    /* @__PURE__ */ i("p", { children: [
      "If ",
      /* @__PURE__ */ t("code", { children: "idempotent" }),
      " is true, retries are safe after partial completion — the runtime may re-invoke the action without guarding against duplicates."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Errors" }),
    /* @__PURE__ */ i("p", { children: [
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
  fork: /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Splits the flow into N parallel branches that all run concurrently against the same context snapshot." }),
    /* @__PURE__ */ t("h4", { children: "Branch count" }),
    /* @__PURE__ */ i("p", { children: [
      "2-8 branches. Each branch exposes a handle ",
      /* @__PURE__ */ t("code", { children: "branch-0" }),
      ", ",
      /* @__PURE__ */ t("code", { children: "branch-1" }),
      ", etc."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Downstream" }),
    /* @__PURE__ */ i("p", { children: [
      "Typically paired with a ",
      /* @__PURE__ */ t("code", { children: "Join" }),
      " to merge results. Without a Join, each branch terminates independently and the run completes when all tails finish."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Join
  // -------------------------------------------------------------------------
  join: /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Combines N parallel branches back into one flow." }),
    /* @__PURE__ */ t("h4", { children: "Modes" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "all" }),
        " — wait for every input."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "any" }),
        " — fire as soon as the first input arrives; later inputs are ignored."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "n_of_m" }),
        " — fire after ",
        /* @__PURE__ */ t("code", { children: "n" }),
        " of ",
        /* @__PURE__ */ t("code", { children: "m" }),
        " inputs complete."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Merge strategies" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "deep-merge" }),
        " — recursive object merge."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "array-collect" }),
        " — collect each branch's output into an array."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "last-writer-wins" }),
        " — final branch to arrive replaces prior values."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Partial failures (§17.2)" }),
    /* @__PURE__ */ i("p", { children: [
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
  approval: /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ i("p", { children: [
      "Blocks the pipeline waiting for human approval. The run enters ",
      /* @__PURE__ */ t("code", { children: "awaiting_approval" }),
      " until decisions are recorded."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Approvers" }),
    /* @__PURE__ */ i("p", { children: [
      "A list of users or roles. ",
      /* @__PURE__ */ t("code", { children: "requiredCount" }),
      " controls how many approvals are needed (n-of-m)."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Timeout" }),
    /* @__PURE__ */ i("p", { children: [
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
    /* @__PURE__ */ i("p", { children: [
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
  agent: /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Invokes a Strands agent via A2A protocol. The agent processes the input and returns a structured response." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "agentId" }),
        " — AgentCore agent identifier or ARN."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "protocol" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "a2a" }),
        " (recommended) or ",
        /* @__PURE__ */ t("code", { children: "direct" }),
        "."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "inputTemplate" }),
        " — supports ",
        /* @__PURE__ */ t("code", { children: "{{context.*}}" }),
        " substitution."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "streaming" }),
        " — whether to stream the agent's response tokens."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ i("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " (success) and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      " (invocation failure)."
    ] })
  ] }),
  "mcp-tool": /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Invokes an external tool through an MCP Gateway server." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "gatewayUrl" }),
        " — MCP Gateway endpoint."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "toolName" }),
        " — registered tool to invoke."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "inputTemplate" }),
        " — JSON input with substitution support."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ i("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "knowledge-base": /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Queries a Bedrock Knowledge Base for relevant document chunks (RAG retrieval)." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "knowledgeBaseId" }),
        " — Bedrock KB identifier."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "queryTemplate" }),
        " — natural language query with substitution."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "topK" }),
        " — number of chunks to retrieve (default 5)."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "scoreThreshold" }),
        " — minimum relevance score (0–1)."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ i("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " (retrieved chunks in context) and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "graph-query": /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Runs an openCypher query against a Neptune Analytics graph." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "graphId" }),
        " — Neptune Analytics graph identifier."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "query" }),
        " — openCypher query (NOT Gremlin/SPARQL)."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "parameters" }),
        " — named query parameters."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ i("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  memory: /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Reads from or writes to AgentCore Memory (session or long-term)." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "mode" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "read" }),
        " or ",
        /* @__PURE__ */ t("code", { children: "write" }),
        "."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "scope" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "session" }),
        " (ephemeral) or ",
        /* @__PURE__ */ t("code", { children: "long-term" }),
        " (persistent)."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "namespace" }),
        " — memory collection key."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "keyExpression" }),
        " — lookup key (read) or storage key (write)."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ i("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  guardrail: /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Applies Bedrock Guardrails content filtering. Evaluates input against configured policies and routes accordingly." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "guardrailId" }),
        " — Bedrock Guardrail identifier."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "inputField" }),
        " — context path to evaluate."
      ] }),
      /* @__PURE__ */ i("li", { children: [
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
    /* @__PURE__ */ i("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ t("code", { children: "pass" }),
      " (content OK) and ",
      /* @__PURE__ */ t("code", { children: "block" }),
      " (content flagged)."
    ] })
  ] }),
  policy: /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Evaluates a Cedar authorization policy against principal/action/resource." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "policyStoreId" }),
        " — Cedar policy store identifier."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "principal" }),
        " — who is requesting (supports substitution)."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "action" }),
        " — what action is being performed."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "resource" }),
        " — what resource is being accessed."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ i("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ t("code", { children: "allow" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "deny" }),
      "."
    ] })
  ] }),
  "ag-ui-output": /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Streams output to the AG-UI frontend via Server-Sent Events. This is a terminal node — no downstream flow." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ i("ul", { children: [
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "sourceField" }),
        " — context path to stream."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "eventType" }),
        " — AG-UI event type to emit (TEXT_MESSAGE_CONTENT, STATE_DELTA, or CUSTOM)."
      ] }),
      /* @__PURE__ */ i("li", { children: [
        /* @__PURE__ */ t("code", { children: "terminal" }),
        " — marks this as the pipeline endpoint."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ i("p", { children: [
      "One input handle ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ". No output — this is the endpoint."
    ] })
  ] })
}, ki = {
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
}, qe = ({ data: e }) => /* @__PURE__ */ i("div", { className: "p-3 text-[13px] text-[#64748b]", children: [
  "Configuration for ",
  /* @__PURE__ */ t("strong", { children: e.type }),
  " — coming in Phase C."
] }), Ci = {
  trigger: ni,
  llm: ai,
  transform: ci,
  condition: ui,
  action: hi,
  fork: xi,
  join: yi,
  approval: Ni,
  agent: qe,
  "mcp-tool": qe,
  "knowledge-base": qe,
  "graph-query": qe,
  memory: qe,
  guardrail: qe,
  policy: qe,
  "ag-ui-output": qe
};
function Ii(e, n) {
  const r = Ci[e.type];
  return /* @__PURE__ */ t(r, { data: e.data, onChange: n });
}
function Si({ selectedIds: e }) {
  const {
    definition: n,
    selectedNodeId: r,
    setSelectedNodeId: o,
    updateNodeData: s,
    removeNode: a,
    duplicateNodes: c
  } = ot(), [d, l] = D("config"), p = re(null), m = re(null);
  Ut();
  const x = _(() => e && e.length > 1 ? e : r ? [r] : [], [e, r]), f = x.length > 1, h = x.length > 0, g = _(() => f || x.length === 0 || !n ? null : n.nodes.find((b) => b.id === x[0]) ?? null, [n, x, f]), u = P(() => {
    o(null);
  }, [o]);
  J(() => {
    l("config");
  }, [x.join(",")]), J(() => {
    if (!h) return;
    const b = (w) => {
      w.key === "Escape" && (w.stopPropagation(), u());
    };
    return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b);
  }, [h, u]), J(() => {
    if (!h) return;
    const b = (w) => {
      const k = p.current;
      k && (w.target instanceof Node && k.contains(w.target) || w.target instanceof Element && (w.target.closest("[data-node-type]") || u()));
    };
    return window.addEventListener("mousedown", b), () => window.removeEventListener("mousedown", b);
  }, [h, u]);
  const y = g ? ki[g.type] : null, N = () => {
    if (f)
      for (const b of x) a(b);
    else g && a(g.id);
  }, v = () => {
    x.length !== 0 && c(x);
  }, C = (b) => {
    g && s(g.id, b);
  };
  return /* @__PURE__ */ t("div", { ref: p, className: "flex flex-col flex-1 min-h-0 bg-white", "data-testid": "config-panel", children: f ? (
    // ---------------------------------------------------------------
    // Multi-select pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ i(G, { children: [
      /* @__PURE__ */ i("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ t("span", { className: "text-base", "aria-hidden": !0, children: "⧉" }),
        /* @__PURE__ */ i("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: [
          x.length,
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
      /* @__PURE__ */ i("div", { className: "flex-1 overflow-y-auto p-4 flex flex-col gap-3", children: [
        /* @__PURE__ */ t("div", { className: "text-xs text-[#64748b] leading-normal", children: "Bulk actions apply to every selected node. Individual node configuration is only shown for single selections." }),
        /* @__PURE__ */ i("div", { className: "flex gap-2", children: [
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
              onClick: v,
              className: "px-2.5 py-1.5 text-xs font-semibold bg-[#f1f5f9] text-[#0f172a] border border-[#e2e8f0] rounded-md cursor-pointer font-inherit",
              children: "Duplicate all"
            }
          )
        ] })
      ] })
    ] })
  ) : g && y ? (
    // ---------------------------------------------------------------
    // Single-node pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ i(G, { children: [
      /* @__PURE__ */ i("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ t("span", { className: "text-lg leading-none", "aria-hidden": !0, children: y.icon }),
        /* @__PURE__ */ t("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: y.name }),
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
          ref: m,
          role: "tablist",
          "aria-label": "Node configuration tabs",
          className: "h-9 flex border-b border-[#e2e8f0] shrink-0",
          onKeyDown: (b) => {
            const w = ["config", "runs", "docs"], k = w.indexOf(d);
            let R = null;
            b.key === "ArrowRight" ? R = w[(k + 1) % w.length] : b.key === "ArrowLeft" ? R = w[(k - 1 + w.length) % w.length] : b.key === "Home" ? R = w[0] : b.key === "End" && (R = w[w.length - 1]), R && (b.preventDefault(), l(R), m.current?.querySelector(
              `[data-tab="${R}"]`
            )?.focus());
          },
          children: ["config", "runs", "docs"].map((b) => {
            const w = d === b, k = b === "config" ? "Config" : b === "runs" ? "Runs" : "Docs";
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": w,
                tabIndex: w ? 0 : -1,
                "data-tab": b,
                className: S(
                  "flex-1 border-none bg-transparent text-xs font-semibold cursor-pointer font-inherit",
                  w ? "text-[#0f172a] border-b-2 border-b-[#646cff]" : "text-[#64748b] border-b-2 border-b-transparent"
                ),
                onClick: () => l(b),
                children: k
              },
              b
            );
          })
        }
      ),
      /* @__PURE__ */ i("div", { className: "flex-1 overflow-y-auto", children: [
        d === "config" && Ii(g, C),
        d === "runs" && /* @__PURE__ */ t("div", { className: "p-6 text-xs text-[#64748b]", children: "No runs yet." }),
        d === "docs" && /* @__PURE__ */ t("div", { className: "pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug", children: wi[g.type] ?? /* @__PURE__ */ t("p", { className: "text-text-secondary", children: "No docs available for this node type." }) })
      ] }),
      /* @__PURE__ */ i("div", { className: "h-10 px-3 flex items-center justify-between gap-2 border-t border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: N,
            className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-transparent rounded-md cursor-pointer font-inherit",
            children: "🗑 Delete node"
          }
        ),
        /* @__PURE__ */ i(
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
function Ti(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Ai(e) {
  return e == null || e === 0 ? "--" : e < 1e-3 ? "<$0.001" : e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Ri(e) {
  return e == null || e === 0 ? "text-text-tertiary" : e < 0.01 ? "text-[#16a34a]" : e < 0.1 ? "text-[#ca8a04]" : e < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function cn(e) {
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
function Rt(e) {
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
function Di(e) {
  return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function Ge({ label: e, children: n }) {
  return /* @__PURE__ */ i("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ t("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: e }),
    /* @__PURE__ */ t("span", { className: "text-[13px] text-text-primary", children: n })
  ] });
}
function $i({ pipelineId: e, run: n, onBack: r }) {
  const o = Me();
  return /* @__PURE__ */ i("div", { className: "absolute inset-0 z-[2] flex flex-col overflow-hidden bg-surface", children: [
    /* @__PURE__ */ i("div", { className: "flex shrink-0 items-center gap-2 border-b border-border px-4 py-2.5", children: [
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
    /* @__PURE__ */ t("div", { className: "flex-1 overflow-y-auto p-4", children: /* @__PURE__ */ i("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ t(Ge, { label: "Status", children: /* @__PURE__ */ t(
        ne,
        {
          tone: cn(n.status),
          "aria-label": `Status: ${Rt(n.status)}`,
          children: Rt(n.status)
        }
      ) }),
      /* @__PURE__ */ t(Ge, { label: "Started", children: new Date(n.startedAt).toLocaleString() }),
      n.completedAt && /* @__PURE__ */ t(Ge, { label: "Completed", children: new Date(n.completedAt).toLocaleString() }),
      /* @__PURE__ */ t(Ge, { label: "Duration", children: ve(n.durationMs) }),
      /* @__PURE__ */ t(Ge, { label: "Triggered by", children: Di(n) }),
      /* @__PURE__ */ t(Ge, { label: "Trigger type", children: n.triggeredBy.triggerType }),
      n.estimatedCostUsd != null && n.estimatedCostUsd > 0 && /* @__PURE__ */ i(Ge, { label: "Est. Cost", children: [
        /* @__PURE__ */ t("span", { className: S("font-semibold", Ri(n.estimatedCostUsd)), children: Ai(n.estimatedCostUsd) }),
        n.estimatedCostUsd > 1 && /* @__PURE__ */ t("span", { className: "ml-1.5 rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "Budget Warning" })
      ] }),
      n.tokenUsage && Object.keys(n.tokenUsage).length > 0 && /* @__PURE__ */ i("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: "Cost Breakdown" }),
        Object.entries(n.tokenUsage).map(([s, a]) => /* @__PURE__ */ i(
          "div",
          {
            className: "flex items-center gap-2 py-0.5 text-[11px]",
            children: [
              /* @__PURE__ */ t("span", { className: "min-w-[100px] font-mono text-text-secondary", children: s }),
              /* @__PURE__ */ i("span", { className: "text-text-tertiary", children: [
                a.tokensIn.toLocaleString(),
                " in / ",
                a.tokensOut.toLocaleString(),
                " out"
              ] })
            ]
          },
          s
        ))
      ] }),
      n.error && /* @__PURE__ */ i("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("div", { className: "mb-1 text-[11px] font-semibold uppercase text-state-failed", children: "Error" }),
        /* @__PURE__ */ i("div", { className: "whitespace-pre-wrap break-words rounded-md bg-[#fef2f2] px-2.5 py-2 font-mono text-xs text-[#991b1b]", children: [
          n.error.message,
          n.error.nodeId && /* @__PURE__ */ i("div", { className: "mt-1 text-[11px] text-[#b91c1c]", children: [
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
      Object.keys(n.steps).length > 0 && /* @__PURE__ */ i("div", { className: "mt-2", children: [
        /* @__PURE__ */ i("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: [
          "Steps (",
          Object.keys(n.steps).length,
          ")"
        ] }),
        Object.entries(n.steps).map(([s, a]) => {
          const c = cn(a.status), d = Rt(a.status), l = a.output, p = l?.response;
          return /* @__PURE__ */ i("div", { className: "mb-2", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2 py-1 text-xs", children: [
              /* @__PURE__ */ t(ne, { tone: c, "aria-label": `Status: ${d}`, children: d }),
              /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: s.slice(0, 10) }),
              a.durationMs != null && /* @__PURE__ */ t("span", { className: "ml-auto text-[11px] text-text-tertiary", children: ve(a.durationMs) })
            ] }),
            p && /* @__PURE__ */ t("div", { className: "mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-2 text-xs leading-relaxed text-text-primary", children: p }),
            l && !p && Object.keys(l).length > 0 && /* @__PURE__ */ t("div", { className: "mt-1 max-h-[120px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-1.5 font-mono text-[11px] text-text-secondary", children: JSON.stringify(l, null, 2) })
          ] }, s);
        })
      ] }),
      /* @__PURE__ */ t("div", { className: "mt-3", children: /* @__PURE__ */ i("details", { children: [
        /* @__PURE__ */ t("summary", { className: "cursor-pointer select-none text-[11px] text-text-tertiary", children: "Raw snapshot JSON" }),
        /* @__PURE__ */ t("pre", { className: "mt-1.5 max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-md border border-border bg-surface-inset p-2.5 text-[10px]", children: JSON.stringify(n, null, 2) })
      ] }) })
    ] }) })
  ] });
}
function pn(e) {
  return e == null || e === 0 ? "--" : e < 1e-3 ? "<$0.001" : e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Mi(e) {
  return e == null || e === 0 ? "text-text-tertiary" : e < 0.01 ? "text-[#16a34a]" : e < 0.1 ? "text-[#ca8a04]" : e < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function Pi(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Ei(e) {
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
function Oi(e) {
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
function Li(e) {
  return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function _i({ pipelineId: e, onClose: n }) {
  const r = Me(), [o, s] = D([]), [a, c] = D(!0), [d, l] = D(null), [p, m] = D(null), [x, f] = D(!1), [h, g] = D([]), u = re(null), y = P(async () => {
    c(!0), l(null);
    try {
      const b = await Mn(e, { limit: 50 });
      s(b.runs);
    } catch (b) {
      l(b instanceof Error ? b.message : "Failed to load runs");
    } finally {
      c(!1);
    }
  }, [e]);
  J(() => {
    u.current !== e && (u.current = e, y());
  }, [e, y]), Re("*", P((b) => {
    const { eventType: w, payload: k } = b;
    if (!k || typeof k != "object") return;
    const R = k;
    if (!(R.pipelineId && R.pipelineId !== e))
      switch (w) {
        case "pipeline.run.started": {
          const I = k;
          if (I.pipelineId !== e) return;
          const A = {
            id: I.runId,
            pipelineId: I.pipelineId,
            pipelineVersion: 0,
            status: "running",
            triggeredBy: I.triggeredBy,
            ownerNodeId: "local",
            startedAt: I.at,
            currentStepIds: [],
            steps: {},
            context: {}
          };
          s(($) => [A, ...$.filter((q) => q.id !== I.runId)]);
          break;
        }
        case "pipeline.run.completed": {
          const I = k;
          s(
            (A) => A.map(
              ($) => $.id === I.runId ? { ...$, status: "completed", completedAt: I.at, durationMs: I.durationMs } : $
            )
          );
          break;
        }
        case "pipeline.run.failed": {
          const I = k;
          s(
            (A) => A.map(
              ($) => $.id === I.runId ? { ...$, status: "failed", completedAt: I.at, error: I.error } : $
            )
          );
          break;
        }
        case "pipeline.run.cancelled": {
          const I = k;
          s(
            (A) => A.map(
              ($) => $.id === I.runId ? { ...$, status: "cancelled", completedAt: I.at } : $
            )
          );
          break;
        }
      }
  }, [e]));
  const N = _(
    () => o.find((b) => b.id === p) ?? null,
    [o, p]
  ), v = P((b) => {
    g((w) => w.includes(b) ? w.filter((k) => k !== b) : w.length >= 2 ? [w[1], b] : [...w, b]);
  }, []), C = P(() => {
    if (h.length !== 2) return;
    const [b, w] = h;
    r(`/pipelines/${e}/compare?a=${b}&b=${w}`);
  }, [h, r, e]);
  return /* @__PURE__ */ i(
    "div",
    {
      className: "relative flex min-h-0 flex-1 flex-col overflow-hidden bg-surface",
      "data-testid": "pipeline-runs-panel",
      children: [
        /* @__PURE__ */ i("div", { className: "flex shrink-0 items-center justify-between border-b border-border px-4 py-3", children: [
          /* @__PURE__ */ t("span", { className: "text-sm font-bold text-text-primary", children: "Run History" }),
          /* @__PURE__ */ i("div", { className: "ml-auto flex items-center gap-1.5", children: [
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => {
                  f(!x), x && g([]);
                },
                "data-testid": "runs-panel-compare-toggle",
                className: S(
                  "cursor-pointer rounded px-2 py-0.5 font-inherit text-[11px] font-medium",
                  x ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"
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
        x && /* @__PURE__ */ i(
          "div",
          {
            className: "flex shrink-0 items-center gap-2 border-b border-border bg-surface-inset px-4 py-2",
            "data-testid": "runs-panel-compare-bar",
            children: [
              /* @__PURE__ */ i("span", { className: "text-[11px] text-text-secondary", children: [
                h.length,
                "/2 selected"
              ] }),
              /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  disabled: h.length !== 2,
                  onClick: C,
                  "data-testid": "runs-panel-compare-action",
                  className: S(
                    "ml-auto rounded px-2.5 py-0.5 font-inherit text-[11px] font-semibold",
                    h.length === 2 ? "cursor-pointer border border-primary bg-primary text-white" : "cursor-not-allowed border border-border bg-surface text-text-disabled"
                  ),
                  children: "Compare"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ i("div", { className: "relative min-h-0 flex-1", children: [
          N && /* @__PURE__ */ t(
            $i,
            {
              pipelineId: e,
              run: N,
              onBack: () => m(null)
            }
          ),
          a && o.length === 0 && /* @__PURE__ */ t("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "Loading runs..." }),
          d && /* @__PURE__ */ i("div", { className: "p-4 text-center text-xs text-state-failed", children: [
            d,
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => {
                  y();
                },
                className: "mx-auto mt-2 block cursor-pointer border-none bg-transparent font-inherit text-xs text-primary underline",
                children: "Retry"
              }
            )
          ] }),
          !a && !d && o.length === 0 && /* @__PURE__ */ t("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "No runs yet. Trigger this pipeline to see history here." }),
          o.length > 0 && /* @__PURE__ */ t("ul", { className: "m-0 flex-1 list-none overflow-y-auto p-0", children: o.map((b) => {
            const w = Ei(b.status), k = Oi(b.status), R = h.includes(b.id);
            return /* @__PURE__ */ i(
              "li",
              {
                "data-testid": `runs-panel-row-${b.id}`,
                onClick: () => {
                  x ? v(b.id) : m(b.id);
                },
                className: S(
                  "cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover",
                  R && "bg-[#eff6ff]"
                ),
                children: [
                  /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                    x && /* @__PURE__ */ t(
                      "input",
                      {
                        type: "checkbox",
                        checked: R,
                        onChange: () => v(b.id),
                        onClick: (I) => I.stopPropagation(),
                        "data-testid": `runs-panel-compare-check-${b.id}`,
                        className: "m-0 shrink-0 accent-primary",
                        "aria-label": `Select run ${b.id.slice(0, 8)} for comparison`
                      }
                    ),
                    /* @__PURE__ */ t(ne, { tone: w, "aria-label": `Status: ${k}`, children: k }),
                    /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-secondary", children: b.id.slice(0, 8) }),
                    /* @__PURE__ */ t("span", { className: "ml-auto text-[11px] text-text-tertiary", children: Pi(b.startedAt) })
                  ] }),
                  /* @__PURE__ */ i("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ t("span", { children: ve(b.durationMs) }),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 0 && /* @__PURE__ */ t(
                      "span",
                      {
                        className: S("font-mono font-semibold", Mi(b.estimatedCostUsd)),
                        title: `Estimated cost: ${pn(b.estimatedCostUsd)}`,
                        children: pn(b.estimatedCostUsd)
                      }
                    ),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 1 && /* @__PURE__ */ t("span", { className: "rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "High Cost" }),
                    /* @__PURE__ */ t("span", { className: "ml-auto", children: Li(b) })
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
function Ui({
  pipelineId: e,
  selectedNodeId: n,
  sidebarTab: r,
  onTabChange: o
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: S(
        "w-[350px] shrink-0 border-l border-border bg-surface",
        "flex flex-col overflow-hidden"
      ),
      "data-testid": "right-sidebar",
      children: [
        !(n !== null && r === "config") && /* @__PURE__ */ i("div", { className: "h-[38px] flex border-b border-border shrink-0", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: S(
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
              className: S(
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
        /* @__PURE__ */ i("div", { className: "flex-1 overflow-y-auto flex flex-col", children: [
          r === "config" && (n !== null ? /* @__PURE__ */ t(Si, {}) : /* @__PURE__ */ t("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          r === "runs" && /* @__PURE__ */ t(
            _i,
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
function Bi(e) {
  return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function ji(e) {
  if (!e) return [];
  const n = /* @__PURE__ */ new Set(), r = /\{\{\s*context\.([a-zA-Z0-9_.]+)\s*\}\}/g;
  for (const o of e.nodes) {
    const s = o.data;
    if (s.type === "llm") {
      for (const a of (s.userPromptTemplate || "").matchAll(r))
        a[1].startsWith("steps.") || n.add(a[1]);
      for (const a of (s.systemPrompt || "").matchAll(r))
        a[1].startsWith("steps.") || n.add(a[1]);
    } else if (s.type === "transform" && s.expression)
      for (const a of s.expression.matchAll(r))
        a[1].startsWith("steps.") || n.add(a[1]);
  }
  return Array.from(n);
}
function Fi(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const n = e.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || e.isContentEditable);
}
function $d() {
  const { pipelineId: e } = nt(), n = _(() => e ? Ye(e) !== null : !1, [e]);
  return !e || !n ? /* @__PURE__ */ t(rt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t(Pn, { pipelineId: e, children: /* @__PURE__ */ t(zi, { pipelineId: e }) });
}
function zi({ pipelineId: e }) {
  const n = Me(), r = ot(), o = st(), { toast: s } = Ct(), {
    definition: a,
    dirty: c,
    selectedNodeId: d,
    setSelectedNodeId: l,
    save: p,
    publish: m,
    revert: x,
    undo: f,
    redo: h,
    setTags: g
  } = r, u = Ps(e), [y, N] = D(!1), v = re(null), C = re(c);
  J(() => (C.current && !c && (N(!0), v.current && clearTimeout(v.current), v.current = setTimeout(() => N(!1), 450)), C.current = c, () => {
    v.current && (clearTimeout(v.current), v.current = null);
  }), [c]);
  const b = _(
    () => a ? Bn(a) : null,
    [a]
  ), w = (b?.errors.length ?? 0) > 0, k = _(
    () => ji(a),
    [a]
  ), I = _(() => a ? a.nodes.some((de) => de.type === "trigger") : !1, [a]) ? ["trigger"] : [], [A, $] = D(!0), [q, V] = D(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), Q = P(() => {
    V((de) => {
      const z = !de;
      try {
        window.localStorage.setItem(
          "ws_pipelines_v1_show_tags",
          z ? "true" : "false"
        );
      } catch {
      }
      return z;
    });
  }, []), [ae, le] = D(!1), [oe, ue] = D(!1), [O, Y] = D(!1), [K, j] = D(!1), [W, ce] = D(!1), pe = _(() => a?.publishedSnapshot ? a.publishedSnapshot : null, [a]), be = a?.status === "published", E = !u.isRunActive && (!be || w), Z = u.isRunActive ? "Cancel the active run" : be ? w ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", ge = P(async () => {
    if (u.isRunActive && u.currentRunId) {
      o.cancelRun(u.currentRunId);
      return;
    }
    if (!E) {
      if (k.length > 0) {
        u.setTriggerInputValues(
          Object.fromEntries(k.map((de) => [de, ""]))
        ), u.setTriggerInputOpen(!0);
        return;
      }
      u.handleRunClick();
    }
  }, [u, o, E, k]);
  J(() => {
    const de = (z) => {
      if (Fi(z.target)) return;
      const L = z.metaKey || z.ctrlKey;
      if (L && z.key.toLowerCase() === "s") {
        z.preventDefault(), p(), s("Saved", { type: "success", durationMs: 1200 });
        return;
      }
      if (L && z.key === "Enter") {
        z.preventDefault(), ge();
        return;
      }
      if (L && z.key === ".") {
        z.preventDefault(), u.isRunActive && u.currentRunId && o.cancelRun(u.currentRunId);
        return;
      }
      if (L && z.shiftKey && z.key.toLowerCase() === "z") {
        z.preventDefault(), h();
        return;
      }
      if (L && z.key.toLowerCase() === "z") {
        z.preventDefault(), f();
        return;
      }
      if (z.key === "Escape") {
        l(null);
        return;
      }
    };
    return window.addEventListener("keydown", de), () => window.removeEventListener("keydown", de);
  }, [p, s, ge, u, o, f, h, l]);
  const De = () => {
    if (!a) return;
    const de = _t(a.id);
    de && n(`/pipelines/${de.id}`);
  }, ze = () => {
    if (!a) return;
    const de = Pt(a.id);
    de && pt(`${Bi(a.name)}.pipeline.json`, de);
  }, Pe = async () => {
    if (!a) return;
    const de = Is(a);
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(de), s("Mermaid diagram copied", { type: "success" });
      else
        throw new Error("clipboard unavailable");
    } catch (z) {
      console.warn("[PipelineEditor] clipboard write failed", z), s("Could not copy Mermaid diagram", { type: "error" });
    }
  }, Ae = () => {
    j(!0);
  }, Le = () => {
    le(!1), !w && (m(), s("Pipeline published", { type: "success" }));
  }, Ee = () => {
    a && (or(a.id), ue(!1), n("/pipelines"));
  }, _e = () => {
    En(e), Y(!1), s("Run history cleared", { type: "success" });
  }, ye = u.currentRunId ? o.runs[u.currentRunId] : void 0;
  return a ? /* @__PURE__ */ i(
    "div",
    {
      className: S(
        "flex flex-col min-h-[calc(100vh-200px)]",
        "bg-surface-inset font-inherit text-text-primary",
        "rounded-lg border border-border overflow-hidden"
      ),
      "data-testid": "pipeline-editor",
      children: [
        /* @__PURE__ */ t(
          Os,
          {
            pipelineId: e,
            definition: a,
            dirty: c,
            savingFlash: y,
            isRunActive: u.isRunActive,
            isTriggering: u.isTriggering,
            runDisabled: E,
            runTitle: Z,
            currentRun: ye,
            breakpoints: u.breakpoints,
            onRunClick: ge,
            onDebugRunClick: u.handleDebugRunClick,
            onExport: ze,
            onPublishClick: () => le(!0),
            onDuplicate: De,
            onCopyMermaid: Pe,
            onViewVersions: Ae,
            onRevert: x,
            onToggleShowTags: Q,
            showTags: q,
            onViewRunHistory: () => u.setSidebarTab("runs"),
            onClearRunHistory: () => Y(!0),
            onSimPanelOpen: () => ce(!0),
            onDelete: () => ue(!0)
          }
        ),
        q && /* @__PURE__ */ i(
          "div",
          {
            "data-testid": "tags-row",
            className: S(
              "flex items-center gap-2 px-4 py-1.5",
              "border-b border-slate-200 bg-[#fafbfc]",
              "min-h-[34px] shrink-0 sticky top-11 z-[4]"
            ),
            children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-slate-400 font-semibold", children: "TAGS" }),
              /* @__PURE__ */ t(
                Mr,
                {
                  value: a.tags ?? [],
                  onChange: g,
                  placeholder: "add tag…"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ i("div", { className: "flex-1 flex min-h-0 relative overflow-hidden", children: [
          /* @__PURE__ */ t(To, { disabledTypes: I }),
          /* @__PURE__ */ t("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ t(
            zo,
            {
              errorNodeId: u.activeError?.nodeId ?? null,
              onErrorNodePosition: u.handleErrorNodePosition,
              breakpoints: u.breakpoints,
              onToggleBreakpoint: u.handleToggleBreakpoint,
              pausedAtNodeId: u.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ t(
            Ui,
            {
              pipelineId: e,
              selectedNodeId: d,
              sidebarTab: u.sidebarTab,
              onTabChange: u.setSidebarTab
            }
          )
        ] }),
        u.pausedBreakpoint && /* @__PURE__ */ t(
          Ws,
          {
            definition: a,
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
          Ho,
          {
            error: u.activeError,
            anchor: u.errorNodeAnchor,
            onDismiss: u.handleDismissError,
            onRetry: u.handleRetryFromError
          }
        ),
        /* @__PURE__ */ t(
          Ms,
          {
            runId: u.currentRunId,
            visible: u.isRunActive && A
          }
        ),
        /* @__PURE__ */ t(
          $s,
          {
            publishConfirmOpen: ae,
            onPublishClose: () => le(!1),
            onPublishConfirm: Le,
            hasErrors: w,
            validationErrorCount: b?.errors.length ?? 0,
            definitionName: a.name,
            definitionVersion: a.version,
            deleteConfirmOpen: oe,
            onDeleteClose: () => ue(!1),
            onDeleteConfirm: Ee,
            clearRunsConfirmOpen: O,
            onClearRunsClose: () => Y(!1),
            onClearRunsConfirm: _e,
            versionDiffOpen: K,
            onVersionDiffClose: () => j(!1),
            currentDef: a,
            publishedDef: pe,
            onJumpToNode: l,
            simPanelOpen: W,
            onSimPanelClose: () => ce(!1)
          }
        ),
        /* @__PURE__ */ t(
          Fe,
          {
            open: u.triggerInputOpen,
            onClose: () => u.setTriggerInputOpen(!1),
            title: "Trigger inputs",
            maxWidth: 480,
            footer: /* @__PURE__ */ i(G, { children: [
              /* @__PURE__ */ t(Ue, { variant: "ghost", onClick: () => u.setTriggerInputOpen(!1), children: "Cancel" }),
              /* @__PURE__ */ t(
                Ue,
                {
                  variant: "primary",
                  onClick: u.handleTriggerInputSubmit,
                  disabled: k.some((de) => !u.triggerInputValues[de]?.trim()),
                  children: "Run"
                }
              )
            ] }),
            children: /* @__PURE__ */ i("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ t("p", { className: "m-0 text-xs text-text-secondary", children: "This pipeline expects input data. Provide values for the trigger context:" }),
              k.map((de) => /* @__PURE__ */ i("label", { className: "flex flex-col gap-1 text-xs", children: [
                /* @__PURE__ */ t("span", { className: "font-medium text-text-primary", children: de }),
                /* @__PURE__ */ t(
                  "textarea",
                  {
                    "data-autofocus": de === k[0] ? !0 : void 0,
                    rows: 3,
                    className: "resize-y px-2 py-1.5 rounded-md border border-border text-xs font-inherit",
                    value: u.triggerInputValues[de] ?? "",
                    onChange: (z) => u.setTriggerInputValues((L) => ({ ...L, [de]: z.target.value }))
                  }
                )
              ] }, de))
            ] })
          }
        )
      ]
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: S(
        "flex flex-col min-h-[calc(100vh-200px)]",
        "bg-surface-inset font-inherit text-text-primary",
        "rounded-lg border border-border overflow-hidden"
      ),
      children: /* @__PURE__ */ t("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]", children: "Loading pipeline…" })
    }
  );
}
function qi(e) {
  const n = e?.event;
  return !n || n === "manual" ? { icon: "▶", text: "Manual" } : n === "schedule" ? { icon: "⏱", text: e?.schedule ?? "Schedule" } : n === "webhook" ? { icon: "🔌", text: e?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${e?.event}` };
}
function Hi({
  row: e,
  onOpen: n,
  onRun: r,
  onDuplicate: o,
  onExport: s,
  onDelete: a,
  selectionMode: c,
  selected: d,
  anySelected: l,
  onToggleSelect: p
}) {
  const [m, x] = D(!1), [f, h] = D(!1), g = re(null);
  tt(g, () => x(!1), m);
  const u = e.status === "published", y = e.status === "archived", N = typeof e.publishedVersion == "number", v = qi(e.triggerBinding);
  let C, b;
  y ? (C = `Archived · v${e.version}`, b = "danger") : u ? (C = `Published · v${e.version}`, b = "success") : N ? (C = `Draft · v${e.version} (published v${e.publishedVersion})`, b = "warning") : (C = `Draft · v${e.version}`, b = "neutral");
  const w = !u, k = (A) => ($) => {
    $.stopPropagation(), A();
  }, R = c || d || f || l, I = (A) => {
    c ? p(A.shiftKey) : n();
  };
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": `pipeline-card-${e.id}`,
      "data-selected": d ? "true" : "false",
      onClick: I,
      onMouseEnter: () => h(!0),
      onMouseLeave: () => {
        h(!1), x(!1);
      },
      className: S(
        "flex flex-col gap-2 w-full px-3.5 py-3 bg-surface rounded-lg cursor-pointer relative transition-[border-color,box-shadow] duration-100",
        d ? "border border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : f ? "border border-primary shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "border border-border shadow-none"
      ),
      children: [
        R && /* @__PURE__ */ t(
          "label",
          {
            onClick: (A) => A.stopPropagation(),
            className: "absolute top-2 right-2 flex items-center justify-center w-[22px] h-[22px] cursor-pointer z-[1]",
            children: /* @__PURE__ */ t(
              "input",
              {
                type: "checkbox",
                "data-testid": `pipeline-select-${e.id}`,
                checked: d,
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
        /* @__PURE__ */ i("div", { className: S("flex items-center gap-2 min-w-0", R && "pr-7"), children: [
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
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ t(ne, { "aria-label": `Status: ${C}`, tone: b, size: "sm", children: C }),
          /* @__PURE__ */ i("span", { className: "text-[11px] text-text-secondary", children: [
            v.icon,
            " ",
            v.text
          ] }),
          /* @__PURE__ */ i("span", { className: "text-[11px] text-text-tertiary", children: [
            "· ",
            e.nodeCount,
            " node",
            e.nodeCount === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": `run-pipeline-${e.id}`,
              onClick: k(r),
              disabled: w,
              title: w ? "Run requires published state" : "Run pipeline",
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
          /* @__PURE__ */ i("div", { className: "relative ml-auto", ref: g, children: [
            /* @__PURE__ */ t(
              "button",
              {
                "data-testid": `overflow-pipeline-${e.id}`,
                onClick: k(() => x((A) => !A)),
                "aria-label": "More actions",
                className: "px-2 py-1 text-sm font-bold bg-transparent text-text-secondary border border-transparent rounded-md cursor-pointer font-[inherit] leading-none",
                children: "⋯"
              }
            ),
            m && /* @__PURE__ */ i(
              "div",
              {
                "data-testid": `overflow-menu-${e.id}`,
                role: "menu",
                onClick: (A) => A.stopPropagation(),
                className: "absolute right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-[0_8px_24px_rgba(15,23,42,0.12)] min-w-[160px] z-10 overflow-hidden",
                children: [
                  /* @__PURE__ */ t("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: k(() => {
                    x(!1), o();
                  }), children: "Duplicate" }),
                  /* @__PURE__ */ t("button", { className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit]", role: "menuitem", onClick: k(() => {
                    x(!1), s();
                  }), children: "Export JSON" }),
                  /* @__PURE__ */ t(
                    "button",
                    {
                      className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-[#dc2626]",
                      role: "menuitem",
                      onClick: k(() => {
                        x(!1), a();
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
const Ki = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, Wi = ["draft", "published"];
function Vi({
  search: e,
  onSearchChange: n,
  statusFilter: r,
  statusExplicit: o,
  onToggleStatusKey: s,
  triggerFilter: a,
  onTriggerFilterChange: c,
  sortKey: d,
  onSortKeyChange: l,
  allVisibleSelected: p,
  selectAllRef: m,
  onHeaderToggleAll: x
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: S(
        "min-h-[40px] shrink-0 flex items-center gap-3 px-6",
        "border-b border-border bg-white"
      ),
      children: [
        /* @__PURE__ */ i(
          "label",
          {
            className: "flex items-center gap-1.5 cursor-pointer",
            title: "Select all visible pipelines",
            children: [
              /* @__PURE__ */ t(
                "input",
                {
                  ref: m,
                  type: "checkbox",
                  "data-testid": "pipeline-select-all",
                  "aria-label": "Select all visible pipelines",
                  checked: p,
                  onChange: x,
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
            onChange: (f) => n(f.target.value),
            className: S(
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
            children: qt.map((f) => {
              const h = o ? r.has(f) : Wi.includes(f);
              return /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  role: "checkbox",
                  "aria-checked": h,
                  "data-testid": `status-chip-${f}`,
                  onClick: () => s(f),
                  onKeyDown: (g) => {
                    (g.key === "Enter" || g.key === " ") && (g.preventDefault(), s(f));
                  },
                  className: S(
                    "px-3 py-1.5 text-xs font-medium rounded cursor-pointer font-inherit",
                    h ? "border border-primary bg-primary text-white" : "border border-border bg-white text-text-secondary"
                  ),
                  children: Ki[f]
                },
                f
              );
            })
          }
        ),
        /* @__PURE__ */ i("label", { className: "text-xs text-text-secondary flex items-center gap-1.5", children: [
          "Trigger:",
          /* @__PURE__ */ i(
            "select",
            {
              "data-testid": "trigger-filter",
              value: a,
              onChange: (f) => c(f.target.value),
              className: S(
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
        /* @__PURE__ */ i("label", { className: "text-xs text-text-secondary flex items-center gap-1.5 ml-auto", children: [
          "Sort:",
          /* @__PURE__ */ i(
            "select",
            {
              "data-testid": "sort-key",
              value: d,
              onChange: (f) => l(f.target.value),
              className: S(
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
const He = S(
  "px-2.5 py-[5px] text-xs font-semibold",
  "bg-white text-text-secondary",
  "border border-border-field rounded-md",
  "cursor-pointer font-inherit"
);
function Ji({
  count: e,
  onClear: n,
  onExport: r,
  onExportAsJSON: o,
  onPublish: s,
  onArchive: a,
  onAddTag: c,
  onRemoveTag: d,
  onDelete: l,
  onDeleteWithConfirm: p,
  addTagOpen: m,
  removeTagOpen: x,
  onSubmitAddTag: f,
  onSubmitRemoveTag: h,
  onCloseAddTag: g,
  onCloseRemoveTag: u,
  unionTags: y
}) {
  const [N, v] = D(""), C = re(null), b = re(null), w = re(null);
  J(() => {
    m && (v(""), setTimeout(() => C.current?.focus(), 30));
  }, [m]), J(() => {
    if (!m) return;
    const R = (A) => {
      b.current?.contains(A.target) || g();
    }, I = window.setTimeout(() => {
      document.addEventListener("mousedown", R);
    }, 0);
    return () => {
      window.clearTimeout(I), document.removeEventListener("mousedown", R);
    };
  }, [m, g]), J(() => {
    if (!x) return;
    const R = (A) => {
      w.current?.contains(A.target) || u();
    }, I = window.setTimeout(() => {
      document.addEventListener("mousedown", R);
    }, 0);
    return () => {
      window.clearTimeout(I), document.removeEventListener("mousedown", R);
    };
  }, [x, u]);
  const k = () => {
    const R = N.trim();
    R.length !== 0 && (f(R), v(""));
  };
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "bulk-action-bar",
      className: S(
        "min-h-[40px] shrink-0 flex items-center gap-3 px-6",
        "border-b border-border bg-[#eef2ff]",
        "sticky top-[56px] z-[1]"
      ),
      children: [
        /* @__PURE__ */ i(
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
        /* @__PURE__ */ t("button", { "data-testid": "bulk-archive", className: He, onClick: a, children: "Archive selected" }),
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
        /* @__PURE__ */ i("div", { className: "relative", children: [
          /* @__PURE__ */ t("button", { "data-testid": "bulk-add-tag-btn", className: He, onClick: c, children: "Add tag..." }),
          m && /* @__PURE__ */ i(
            "div",
            {
              ref: b,
              "data-testid": "bulk-add-tag-popover",
              onClick: (R) => R.stopPropagation(),
              className: S(
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
                    onChange: (R) => v(R.target.value),
                    onKeyDown: (R) => {
                      R.key === "Enter" ? (R.preventDefault(), k()) : R.key === "Escape" && (R.preventDefault(), g());
                    },
                    className: S(
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
                    className: S(
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
        /* @__PURE__ */ i("div", { className: "relative", children: [
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "bulk-remove-tag-btn",
              className: S(
                He,
                y.length === 0 && "opacity-50 cursor-not-allowed"
              ),
              onClick: d,
              disabled: y.length === 0,
              title: y.length === 0 ? "No tags on selected pipelines" : "Remove tag from selected",
              children: "Remove tag..."
            }
          ),
          x && /* @__PURE__ */ i(
            "div",
            {
              ref: w,
              "data-testid": "bulk-remove-tag-popover",
              onClick: (R) => R.stopPropagation(),
              className: S(
                "absolute top-full left-0 mt-1.5",
                "bg-white border border-border rounded-lg",
                "shadow-lg min-w-[220px] max-w-[320px] p-2.5 z-10",
                "flex flex-col gap-2"
              ),
              children: [
                /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary", children: "Click a tag to remove it from all selected:" }),
                /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5", children: y.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "No tags to remove." }) : y.map((R) => /* @__PURE__ */ i(
                  "button",
                  {
                    "data-testid": `bulk-remove-tag-chip-${R}`,
                    onClick: () => h(R),
                    className: S(
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
        /* @__PURE__ */ t(
          "button",
          {
            "data-testid": "bulk-delete",
            className: S(
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
function Gi({
  visibleRows: e,
  filteredIds: n
}) {
  const [r, o] = D(!1), [s, a] = D(/* @__PURE__ */ new Set()), c = re(null), d = re(null), l = P(() => {
    a(/* @__PURE__ */ new Set());
  }, []), p = P(() => {
    r ? (l(), o(!1)) : o(!0);
  }, [r, l]), m = P(
    (u, y = !1) => {
      const N = e, v = N.findIndex((b) => b.id === u), C = c.current;
      v !== -1 && (c.current = v), a((b) => {
        const w = new Set(b), k = !w.has(u);
        if (y && C != null && v !== -1) {
          const R = Math.min(C, v), I = Math.max(C, v);
          for (let A = R; A <= I; A++) {
            const $ = N[A];
            $ && (k ? w.add($.id) : w.delete($.id));
          }
        } else k ? w.add(u) : w.delete(u);
        return w;
      });
    },
    [e]
  ), x = P(() => {
    a(new Set(n));
  }, [n]), f = e.length > 0 && e.every((u) => s.has(u.id)), h = !f && e.some((u) => s.has(u.id)), g = P(() => {
    a((u) => {
      const y = new Set(u);
      if (f)
        for (const N of e) y.delete(N.id);
      else
        for (const N of e) y.add(N.id);
      return y;
    }), r || o(!0);
  }, [f, e, r]);
  return J(() => {
    d.current && (d.current.indeterminate = h);
  }, [h]), {
    selectionMode: r,
    selected: s,
    allVisibleSelected: f,
    someVisibleSelected: h,
    selectAllRef: d,
    handleToggleSelectMode: p,
    handleToggleSelect: m,
    handleSelectAllFiltered: x,
    handleHeaderToggleAll: g,
    clearSelection: l,
    setSelectionMode: o
  };
}
const Yi = 280, xe = 160, Xi = 40, Qi = 200;
function U(e) {
  return Xi + e * Yi;
}
function B(e) {
  return Qi + e * xe;
}
function F(e, n, r, o = "in") {
  return {
    id: crypto.randomUUID(),
    source: e,
    sourceHandle: n,
    target: r,
    targetHandle: o
  };
}
function Zi(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), a = {
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
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: a },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: c },
    { id: s, type: "action", position: { x: U(2), y: B(0) }, data: d }
  ], p = [
    F(r, "out", o),
    F(o, "out", s)
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
function ea(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), a = crypto.randomUUID(), c = crypto.randomUUID(), d = crypto.randomUUID(), l = crypto.randomUUID(), p = {
    type: "trigger",
    triggerType: "document.finalize",
    documentTypeId: "meeting-notes"
  }, m = {
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
  }, f = {
    type: "action",
    actionType: "update-document",
    config: {
      field: "tasks",
      value: `{{context.steps.${s}.response}}`
    },
    idempotent: !0,
    onError: "route-error"
  }, h = {
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
  }, y = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: p },
    { id: o, type: "fork", position: { x: U(1), y: B(0) }, data: m },
    { id: s, type: "llm", position: { x: U(2), y: B(0) - xe / 2 }, data: x },
    { id: a, type: "action", position: { x: U(3), y: B(0) - xe / 2 }, data: f },
    { id: c, type: "llm", position: { x: U(2), y: B(0) + xe / 2 }, data: h },
    { id: d, type: "action", position: { x: U(3), y: B(0) + xe / 2 }, data: g },
    { id: l, type: "join", position: { x: U(4), y: B(0) }, data: u }
  ], N = [
    F(r, "out", o),
    F(o, "branch-0", s),
    F(s, "out", a),
    F(a, "out", l, "in-0"),
    F(o, "branch-1", c),
    F(c, "out", d),
    F(d, "out", l, "in-1")
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
    nodes: y,
    edges: N,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function ta(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), a = crypto.randomUUID(), c = crypto.randomUUID(), d = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), m = crypto.randomUUID(), x = {
    type: "trigger",
    triggerType: "document.comment"
  }, f = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: 'Classify the safety of this content. Respond with JSON {"safe": boolean, "reason": string}.',
    userPromptTemplate: "{{context.commentBody}}",
    temperature: 0,
    maxTokens: 128,
    streaming: !1
  }, h = {
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
  }, y = {
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
  }, v = {
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
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: x },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: f },
    { id: s, type: "condition", position: { x: U(2), y: B(0) }, data: h },
    { id: a, type: "action", position: { x: U(3), y: B(0) - xe / 2 }, data: g },
    { id: c, type: "action", position: { x: U(3), y: B(0) + xe / 2 }, data: u },
    { id: d, type: "approval", position: { x: U(4), y: B(0) + xe / 2 }, data: y },
    { id: l, type: "condition", position: { x: U(5), y: B(0) + xe / 2 }, data: N },
    { id: p, type: "action", position: { x: U(6), y: B(0) }, data: v },
    { id: m, type: "action", position: { x: U(6), y: B(0) + xe }, data: C }
  ], w = [
    F(r, "out", o),
    F(o, "out", s),
    F(s, "true", a),
    F(s, "false", c),
    F(c, "out", d),
    F(d, "approved", l),
    F(d, "rejected", m),
    F(l, "true", p),
    F(l, "false", m)
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
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function na(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), a = crypto.randomUUID(), c = {
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
  }, m = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: c },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: d },
    { id: s, type: "transform", position: { x: U(2), y: B(0) }, data: l },
    { id: a, type: "action", position: { x: U(3), y: B(0) }, data: p }
  ], x = [
    F(r, "out", o),
    F(o, "out", s),
    F(s, "out", a)
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
    nodes: m,
    edges: x,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function ra(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), a = crypto.randomUUID(), c = {
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
  }, m = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: c },
    { id: o, type: "approval", position: { x: U(1), y: B(0) }, data: d },
    { id: s, type: "approval", position: { x: U(2), y: B(0) }, data: l },
    { id: a, type: "action", position: { x: U(3), y: B(0) }, data: p }
  ], x = [
    F(r, "out", o),
    F(o, "approved", s),
    F(s, "approved", a)
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
    nodes: m,
    edges: x,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function oa(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), a = crypto.randomUUID(), c = {
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
  }, m = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: c },
    { id: o, type: "transform", position: { x: U(1), y: B(0) }, data: d },
    { id: s, type: "llm", position: { x: U(2), y: B(0) }, data: l },
    { id: a, type: "action", position: { x: U(3), y: B(0) }, data: p }
  ], x = [
    F(r, "out", o),
    F(o, "out", s),
    F(s, "out", a)
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
    nodes: m,
    edges: x,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function sa(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), a = {
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
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: a },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: c },
    { id: s, type: "action", position: { x: U(2), y: B(0) }, data: d }
  ], p = [
    F(r, "out", o),
    F(o, "out", s)
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
function ia(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), a = { type: "trigger", triggerType: "document.submit" }, c = {
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
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: a },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: c },
    { id: s, type: "action", position: { x: U(2), y: B(0) }, data: d }
  ], p = [
    F(r, "out", o),
    F(o, "out", s)
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
function aa(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), a = crypto.randomUUID(), c = crypto.randomUUID(), d = crypto.randomUUID(), l = { type: "trigger", triggerType: "document.finalize" }, p = {
    type: "fork",
    branchCount: 2,
    branchLabels: ["llm-review", "human-review"]
  }, m = {
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
  }, f = { type: "join", mode: "all", mergeStrategy: "deep-merge" }, h = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "reviews",
      message: `Review complete: LLM said {{context.steps.${s}.response}}; reviewer decision: {{context.steps.${a}.output.decision}}`
    },
    idempotent: !1,
    onError: "route-error"
  }, g = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: l },
    { id: o, type: "fork", position: { x: U(1), y: B(0) }, data: p },
    { id: s, type: "llm", position: { x: U(2), y: B(0) - xe / 2 }, data: m },
    { id: a, type: "approval", position: { x: U(2), y: B(0) + xe / 2 }, data: x },
    { id: c, type: "join", position: { x: U(3), y: B(0) }, data: f },
    { id: d, type: "action", position: { x: U(4), y: B(0) }, data: h }
  ], u = [
    F(r, "out", o),
    F(o, "branch-0", s),
    F(s, "out", c, "in-0"),
    F(o, "branch-1", a),
    F(a, "approved", c, "in-1"),
    F(c, "out", d)
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
function la(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), a = crypto.randomUUID(), c = crypto.randomUUID(), d = crypto.randomUUID(), l = {
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
  }, m = {
    type: "condition",
    expression: `context.steps.${o}.output.severity === 'critical'`,
    label: "Critical?"
  }, x = {
    type: "action",
    actionType: "notify",
    config: {
      channel: "on-call",
      message: `CRITICAL incident: {{context.steps.${o}.output.summary}}`
    },
    idempotent: !1,
    onError: "fail-run"
  }, f = {
    type: "approval",
    approvers: [{ type: "role", value: "incident-commander" }],
    requiredCount: 1,
    timeoutMs: 1440 * 60 * 1e3,
    timeoutAction: "escalate",
    message: "Critical incident paged. Please acknowledge and assign a post-mortem owner."
  }, h = {
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
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: l },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: p },
    { id: s, type: "condition", position: { x: U(2), y: B(0) }, data: m },
    { id: a, type: "action", position: { x: U(3), y: B(0) - xe / 2 }, data: x },
    { id: c, type: "approval", position: { x: U(4), y: B(0) - xe / 2 }, data: f },
    { id: d, type: "action", position: { x: U(3), y: B(0) + xe / 2 }, data: h }
  ], u = [
    F(r, "out", o),
    F(o, "out", s),
    F(s, "true", a),
    F(a, "out", c),
    F(s, "false", d)
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
function da(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), a = crypto.randomUUID(), c = crypto.randomUUID(), d = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), m = crypto.randomUUID(), x = {
    type: "trigger",
    triggerType: "webhook",
    webhookPath: "/pipelines/webhooks/github-pr"
  }, f = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "You are a senior code reviewer. Read the GitHub pull-request payload and produce a brief, structured summary of the diff (files touched, scope, intent). No prose preface.",
    userPromptTemplate: "{{context.payload.pull_request}}",
    temperature: 0.2,
    maxTokens: 768,
    streaming: !1
  }, h = {
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
  }, y = {
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
  }, v = {
    type: "llm",
    provider: "bedrock",
    model: "claude-sonnet-4-6",
    systemPrompt: "You are a lead reviewer. Combine the security, style, and test-coverage findings into a single PR comment in markdown with sections, prioritized actions, and a final approve/request-changes recommendation.",
    userPromptTemplate: `Security: {{context.steps.${a}.response}}

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
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: x },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: f },
    { id: s, type: "fork", position: { x: U(2), y: B(0) }, data: h },
    { id: a, type: "llm", position: { x: U(3), y: B(0) - xe }, data: g },
    { id: c, type: "llm", position: { x: U(3), y: B(0) }, data: u },
    { id: d, type: "llm", position: { x: U(3), y: B(0) + xe }, data: y },
    { id: l, type: "join", position: { x: U(4), y: B(0) }, data: N },
    { id: p, type: "llm", position: { x: U(5), y: B(0) }, data: v },
    { id: m, type: "action", position: { x: U(6), y: B(0) }, data: C }
  ], w = [
    F(r, "out", o),
    F(o, "out", s),
    F(s, "branch-0", a),
    F(s, "branch-1", c),
    F(s, "branch-2", d),
    F(a, "out", l, "in-0"),
    F(c, "out", l, "in-1"),
    F(d, "out", l, "in-2"),
    F(l, "out", p),
    F(p, "out", m)
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
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function ca(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), a = crypto.randomUUID(), c = crypto.randomUUID(), d = {
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
  }, m = {
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
    message: `Document flagged as {{context.steps.${o}.output.category}} — please review before publishing.`
  }, f = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: d },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: l },
    { id: s, type: "condition", position: { x: U(2), y: B(0) }, data: p },
    { id: a, type: "action", position: { x: U(3), y: B(0) - xe / 2 }, data: m },
    { id: c, type: "approval", position: { x: U(3), y: B(0) + xe / 2 }, data: x }
  ], h = [
    F(r, "out", o),
    F(o, "out", s),
    F(s, "true", a),
    F(s, "false", c)
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
    nodes: f,
    edges: h,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
function pa(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), s = crypto.randomUUID(), a = crypto.randomUUID(), c = crypto.randomUUID(), d = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), m = {
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
  }, f = {
    type: "transform",
    transformType: "jsonpath",
    expression: `$.steps.${o}.output`,
    outputKey: "triage"
  }, h = {
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
  }, y = {
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
  }, v = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: m },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: x },
    { id: s, type: "transform", position: { x: U(2), y: B(0) }, data: f },
    { id: a, type: "condition", position: { x: U(3), y: B(0) }, data: h },
    { id: c, type: "action", position: { x: U(4), y: B(0) - xe / 2 }, data: g },
    { id: d, type: "llm", position: { x: U(4), y: B(0) + xe / 2 }, data: u },
    { id: l, type: "approval", position: { x: U(5), y: B(0) + xe / 2 }, data: y },
    { id: p, type: "action", position: { x: U(6), y: B(0) + xe / 2 }, data: N }
  ], C = [
    F(r, "out", o),
    F(o, "out", s),
    F(s, "out", a),
    F(a, "true", c),
    F(a, "false", d),
    F(d, "out", l),
    F(l, "approved", p)
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
    build: Zi
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: ea
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: ta,
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
    build: na,
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
    build: ra,
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
    build: oa
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: sa
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: ia
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: aa
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: la
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: da
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: ca
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: pa
  }
], zn = "/api";
async function ua(e) {
  const n = { createdTypes: [], errors: [] };
  if (!e?.documentTypes?.length) return n;
  for (const r of e.documentTypes)
    try {
      const o = await ma(r.name);
      if (o) {
        n.createdTypes.push(o.typeId);
        continue;
      }
      const s = await fa(r);
      n.createdTypes.push(s.typeId);
    } catch (o) {
      n.errors.push(
        `Failed to scaffold "${r.name}": ${o instanceof Error ? o.message : String(o)}`
      );
    }
  return n;
}
async function ma(e) {
  try {
    const n = await fetch(`${zn}/document-types`, { credentials: "same-origin" });
    if (!n.ok) return null;
    const o = (await n.json()).items?.find(
      (s) => s.name.toLowerCase() === e.toLowerCase()
    );
    return o ? { typeId: o.typeId } : null;
  } catch {
    return null;
  }
}
async function fa(e) {
  const n = e.fields.map((s, a) => ({
    fieldId: crypto.randomUUID(),
    name: s.name,
    fieldType: s.fieldType,
    widget: ha(s.fieldType),
    cardinality: 1,
    required: s.required ?? !1,
    helpText: "",
    options: s.options,
    order: a
  })), r = await fetch(`${zn}/document-types`, {
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
function ha(e) {
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
function xa(e) {
  const n = /* @__PURE__ */ new Map(), r = e.nodes.map((a) => {
    const c = crypto.randomUUID();
    return n.set(a.id, c), {
      ...a,
      id: c,
      data: JSON.parse(JSON.stringify(a.data)),
      position: { ...a.position }
    };
  }), o = e.edges.map((a) => ({
    ...a,
    id: crypto.randomUUID(),
    source: n.get(a.source) ?? a.source,
    target: n.get(a.target) ?? a.target
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
function ga(e) {
  const n = e.triggerBinding?.event ?? "manual";
  return n === "schedule" ? "Schedule" : n === "webhook" ? "Webhook" : n === "manual" ? "Manual" : n.startsWith("document.") ? `On ${n}` : n;
}
function ba({ template: e, meta: n, onPick: r }) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": `template-card-${e.id}`,
      className: "flex flex-col gap-2 w-[220px] min-h-[200px] p-3.5 bg-surface border border-border rounded-[10px] font-[inherit]",
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ t("span", { className: "text-2xl", "aria-hidden": !0, children: e.icon }),
          /* @__PURE__ */ t("div", { className: "text-sm font-bold text-text-primary overflow-hidden text-ellipsis", children: e.name })
        ] }),
        /* @__PURE__ */ i(
          "div",
          {
            "data-testid": `template-meta-${e.id}`,
            className: "text-[11px] text-text-tertiary flex gap-2",
            children: [
              /* @__PURE__ */ i("span", { children: [
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
function ya({
  open: e,
  onClose: n,
  onCreated: r,
  onSelect: o
}) {
  const { userId: s } = jt(), [a, c] = D(""), d = re(null);
  J(() => {
    e && (c(""), setTimeout(() => d.current?.focus(), 30));
  }, [e]);
  const l = _(() => {
    const f = /* @__PURE__ */ new Map();
    for (const h of Dt) {
      const g = h.build(s || "anonymous");
      f.set(h.id, { nodeCount: g.nodes.length, trigger: ga(g) });
    }
    return f;
  }, [s, e]), p = _(() => {
    const f = a.trim().toLowerCase();
    return f ? Dt.filter(
      (h) => h.name.toLowerCase().includes(f) || h.description.toLowerCase().includes(f) || h.tags.some((g) => g.toLowerCase().includes(f))
    ) : Dt;
  }, [a]), m = (f) => {
    if (r) {
      const h = f.build(s || "anonymous"), g = xa(h);
      sr(g), n(), r(g.id), f.prerequisites && ua(f.prerequisites).then((u) => {
        u.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", u.errors);
      });
      return;
    }
    o && o(f);
  };
  return /* @__PURE__ */ i(
    Fe,
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
            value: a,
            onChange: (f) => c(f.target.value),
            onKeyDown: (f) => {
              f.key === "Enter" && p.length > 0 && (f.preventDefault(), m(p[0]));
            },
            className: "w-full px-3 py-2 text-[13px] mb-3.5 border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none"
          }
        ),
        p.length === 0 ? /* @__PURE__ */ i(
          "div",
          {
            "data-testid": "templates-empty",
            className: "text-center p-8 text-[13px] text-text-tertiary",
            children: [
              'No templates match "',
              a,
              '".'
            ]
          }
        ) : /* @__PURE__ */ t(
          "div",
          {
            "data-testid": "templates-grid",
            className: "grid grid-cols-[repeat(3,220px)] gap-4 justify-center max-h-[60vh] overflow-y-auto p-2",
            children: p.map((f) => /* @__PURE__ */ t(
              ba,
              {
                template: f,
                meta: l.get(f.id) ?? { nodeCount: 0, trigger: "—" },
                onPick: m
              },
              f.id
            ))
          }
        )
      ]
    }
  );
}
const qt = ["draft", "published", "archived"], un = ["draft", "published"];
function va(e) {
  if (e == null) return null;
  if (e.trim() === "") return /* @__PURE__ */ new Set();
  const n = new Set(qt);
  return new Set(
    e.split(",").map((o) => o.trim()).filter((o) => n.has(o))
  );
}
function Na(e, n) {
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
function wa(e) {
  const n = e?.event;
  return !n || n === "manual" ? "manual" : n === "schedule" ? "schedule" : n === "webhook" ? "webhook" : "document";
}
function mn(e) {
  return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function ka() {
  const e = /* @__PURE__ */ new Date(), n = e.getFullYear(), r = String(e.getMonth() + 1).padStart(2, "0"), o = String(e.getDate()).padStart(2, "0");
  return `${n}-${r}-${o}`;
}
function Ca({
  open: e,
  onClose: n,
  onCreate: r
}) {
  const [o, s] = D(""), a = re(null);
  J(() => {
    e && (s(""), setTimeout(() => a.current?.focus(), 50));
  }, [e]);
  const c = o.trim().length > 0, d = () => {
    c && r(o.trim());
  };
  return /* @__PURE__ */ i(
    Fe,
    {
      open: e,
      onClose: n,
      title: "Create new pipeline",
      maxWidth: 440,
      footer: /* @__PURE__ */ i(G, { children: [
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
            className: S(
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
            ref: a,
            "data-testid": "new-pipeline-name",
            type: "text",
            value: o,
            onChange: (l) => s(l.target.value),
            onKeyDown: (l) => {
              l.key === "Enter" && d();
            },
            placeholder: "e.g. Invoice summarizer",
            className: S(
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
function Md() {
  const e = Me(), { userId: n } = jt(), { toast: r } = Ct(), { triggerRun: o, isTriggering: s } = ir(), [a, c] = kt(), [d, l] = D([]), [p, m] = D(""), [x, f] = D("all"), [h, g] = D("updated"), u = _(
    () => va(a.get("status")),
    [a]
  ), y = _(() => u ?? new Set(un), [u]), N = u != null, v = (T) => {
    const M = new URLSearchParams(a);
    if (T.size === 0)
      M.set("status", "");
    else {
      const X = qt.filter((ie) => T.has(ie)).join(",");
      M.set("status", X);
    }
    c(M, { replace: !0 });
  }, C = (T) => {
    const M = N ? new Set(y) : new Set(un);
    M.has(T) ? M.delete(T) : M.add(T), v(M);
  }, [b, w] = D(!1), [k, R] = D(!1), [I, A] = D(null), [$, q] = D(!1), [V, Q] = D(!1), [ae, le] = D(!1), oe = P(async () => {
    const T = await ar(), M = [];
    for (const X of T) {
      const ie = await Xe(X.id);
      ie && M.push(Na(ie, X.icon));
    }
    l(M);
  }, []);
  J(() => {
    oe();
  }, [oe]);
  const ue = _(() => {
    const T = p.trim().toLowerCase(), X = [...d.filter((ie) => {
      if (T) {
        const fe = ie.name.toLowerCase().includes(T), $e = ie.tags.some((Kt) => Kt.toLowerCase().includes(T));
        if (!fe && !$e) return !1;
      }
      return !(!(N && y.size === 0) && !y.has(ie.status) || x !== "all" && wa(ie.triggerBinding) !== x);
    })];
    return h === "name" ? X.sort((ie, fe) => ie.name.localeCompare(fe.name)) : h === "created" ? X.sort((ie, fe) => fe.createdAt.localeCompare(ie.createdAt)) : X.sort((ie, fe) => fe.updatedAt.localeCompare(ie.updatedAt)), X;
  }, [d, p, y, N, x, h]), O = _(() => ue.map((T) => T.id), [ue]), {
    selectionMode: Y,
    selected: K,
    allVisibleSelected: j,
    selectAllRef: W,
    handleToggleSelect: ce,
    handleSelectAllFiltered: pe,
    handleHeaderToggleAll: be,
    clearSelection: E,
    setSelectionMode: Z
  } = Gi({ visibleRows: ue, filteredIds: O }), ge = _(() => {
    const T = /* @__PURE__ */ new Set();
    for (const M of d)
      if (K.has(M.id))
        for (const X of M.tags) T.add(X);
    return Array.from(T).sort((M, X) => M.localeCompare(X));
  }, [d, K]), De = async (T) => {
    const M = await lr({ name: T, createdBy: n });
    w(!1), e(`/pipelines/${M.id}`);
  }, ze = () => {
    const T = dr(n);
    Qe(T).then(() => oe()), e(`/pipelines/${T.id}`);
  }, Pe = (T) => {
    const M = T.build(n);
    Qe(M), R(!1), e(`/pipelines/${M.id}`);
  }, Ae = (T) => e(`/pipelines/${T}`), Le = async (T) => {
    if (T.status !== "published") {
      r("Run requires published state", { type: "warning" });
      return;
    }
    if (!s)
      try {
        await o(T.id, {}) ? r(`Run started for "${T.name}"`, { type: "success" }) : r("Could not start run", { type: "error" });
      } catch (M) {
        r(`Run failed: ${M.message}`, { type: "error" });
      } finally {
        e(`/pipelines/${T.id}`);
      }
  }, Ee = (T) => {
    const M = _t(T);
    M && (Qe(M).then(() => oe()), r(`Duplicated as "${M.name}"`, { type: "success" }));
  }, _e = (T) => {
    const M = Pt(T.id);
    if (!M) {
      r("Export failed", { type: "error" });
      return;
    }
    pt(`${mn(T.name)}.pipeline.json`, M);
  }, ye = async () => {
    I && (await Vt(I), A(null), oe(), r("Pipeline deleted", { type: "success" }));
  }, de = I ? d.find((T) => T.id === I) : null, z = () => {
    const T = Array.from(K);
    T.length !== 0 && (T.forEach((M, X) => {
      window.setTimeout(() => {
        const ie = d.find(($e) => $e.id === M), fe = Pt(M);
        !ie || !fe || pt(`${mn(ie.name)}-${ka()}.pipeline.json`, fe);
      }, X * 100);
    }), r(`Exported ${T.length} pipeline${T.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, L = async (T) => {
    const M = Array.from(K);
    for (const X of M) {
      const ie = await Xe(X);
      if (!ie) continue;
      const fe = ie.tags ?? [];
      fe.includes(T) || (ie.tags = [...fe, T], await Qe(ie));
    }
    Q(!1), oe(), r(`Added tag "${T}" to ${M.length} pipeline${M.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, H = async (T) => {
    const M = Array.from(K);
    for (const X of M) {
      const ie = await Xe(X);
      if (!ie) continue;
      const fe = ie.tags ?? [];
      fe.includes(T) && (ie.tags = fe.filter(($e) => $e !== T), await Qe(ie));
    }
    oe(), r(`Removed tag "${T}" from ${M.length} pipeline${M.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, se = async () => {
    const T = Array.from(K);
    for (const M of T) await Vt(M);
    q(!1), E(), oe(), r(`Deleted ${T.length} pipeline${T.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, me = async () => {
    const T = Array.from(K);
    if (T.length === 0) return;
    let M = 0, X = 0;
    for (const ie of T) {
      const fe = await Xe(ie);
      if (!fe) continue;
      if (fe.status === "published") {
        X += 1;
        continue;
      }
      await cr(ie) && (M += 1);
    }
    oe(), X > 0 ? r(
      `Published ${M}; skipped ${X} already published`,
      { type: "success" }
    ) : r(
      `Published ${M} pipeline${M === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, Ie = async () => {
    const T = Array.from(K);
    if (T.length === 0) return;
    let M = 0, X = 0;
    for (const fe of T) {
      const $e = await Xe(fe);
      if (!$e) continue;
      $e.status === "archived" ? ($e.status = "draft", X += 1) : ($e.status = "archived", M += 1), await Qe($e);
    }
    oe();
    const ie = [];
    M > 0 && ie.push(`Archived ${M}`), X > 0 && ie.push(`Unarchived ${X}`), r(ie.join(" · ") || "No pipelines changed", { type: "success" });
  }, Ne = async () => {
    const T = Array.from(K);
    if (T.length === 0) return;
    const M = [];
    for (const ie of T) {
      const fe = await Xe(ie);
      fe && M.push(fe);
    }
    if (M.length === 0) {
      r("Export failed", { type: "error" });
      return;
    }
    const X = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    pt(`pipelines-${X}.json`, JSON.stringify(M, null, 2)), r(`Exported ${M.length} pipeline${M.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  };
  J(() => {
    const T = (M) => {
      const X = M.target;
      if (X) {
        const fe = X.tagName;
        if (fe === "INPUT" || fe === "TEXTAREA" || fe === "SELECT" || X.isContentEditable)
          return;
      }
      if (M.key === "Escape") {
        (K.size > 0 || Y || V || ae) && (Q(!1), le(!1), E(), Z(!1));
        return;
      }
      if ((M.metaKey || M.ctrlKey) && (M.key === "a" || M.key === "A")) {
        Y && (M.preventDefault(), pe());
        return;
      }
      (M.key === "Delete" || M.key === "Backspace") && K.size > 0 && !$ && !I && !b && !k && (M.preventDefault(), q(!0));
    };
    return window.addEventListener("keydown", T), () => window.removeEventListener("keydown", T);
  }, [
    K,
    Y,
    V,
    ae,
    $,
    I,
    b,
    k,
    E,
    pe,
    Z
  ]);
  const je = d.length > 0, xt = K.size > 0;
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "pipelines-page",
      className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-inherit",
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            className: S(
              "h-14 shrink-0 flex items-center justify-between px-6",
              "border-b border-border bg-white",
              "sticky top-0 z-[2]"
            ),
            children: [
              /* @__PURE__ */ t("div", { className: "text-lg font-bold text-text-primary", children: "Pipelines" }),
              /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "metrics-btn",
                    onClick: () => e("/pipelines/metrics"),
                    className: S(
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
                    onClick: () => R(!0),
                    className: S(
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
                    onClick: () => w(!0),
                    className: S(
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
        je && /* @__PURE__ */ t(
          Vi,
          {
            search: p,
            onSearchChange: m,
            statusFilter: y,
            statusExplicit: N,
            onToggleStatusKey: C,
            triggerFilter: x,
            onTriggerFilterChange: f,
            sortKey: h,
            onSortKeyChange: g,
            allVisibleSelected: j,
            selectAllRef: W,
            onHeaderToggleAll: be
          }
        ),
        xt && /* @__PURE__ */ t(
          Ji,
          {
            count: K.size,
            onClear: E,
            onExport: z,
            onExportAsJSON: Ne,
            onPublish: me,
            onArchive: Ie,
            onAddTag: () => {
              Q((T) => !T), le(!1);
            },
            onRemoveTag: () => {
              le((T) => !T), Q(!1);
            },
            onDelete: () => q(!0),
            onDeleteWithConfirm: () => q(!0),
            addTagOpen: V,
            removeTagOpen: ae,
            onSubmitAddTag: L,
            onSubmitRemoveTag: H,
            onCloseAddTag: () => Q(!1),
            onCloseRemoveTag: () => le(!1),
            unionTags: ge
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: S(
              "flex-1 overflow-y-auto overflow-x-hidden min-w-0",
              je ? "p-6" : "p-0"
            ),
            children: je ? ue.length === 0 ? /* @__PURE__ */ t(
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
                children: ue.map((T) => /* @__PURE__ */ t(
                  Hi,
                  {
                    row: T,
                    onOpen: () => Ae(T.id),
                    onRun: () => {
                      Le(T);
                    },
                    onDuplicate: () => Ee(T.id),
                    onExport: () => _e(T),
                    onDelete: () => A(T.id),
                    selectionMode: Y,
                    selected: K.has(T.id),
                    anySelected: xt,
                    onToggleSelect: (M) => ce(T.id, M)
                  },
                  T.id
                ))
              }
            ) : /* @__PURE__ */ i("div", { className: "flex flex-col h-full", children: [
              /* @__PURE__ */ t("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ t(
                Oe,
                {
                  icon: "🔀",
                  title: "No pipelines yet",
                  body: "Design your first one — from scratch or pick a template later.",
                  actionLabel: "+ New Pipeline",
                  onAction: () => w(!0)
                }
              ) }),
              /* @__PURE__ */ i("div", { className: "flex justify-center items-center gap-2.5 text-[13px] text-text-tertiary px-6 pb-8", children: [
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "empty-state-demo",
                    onClick: ze,
                    className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
                    children: "or try the demo pipeline"
                  }
                ),
                /* @__PURE__ */ t("span", { "aria-hidden": !0, children: "·" }),
                /* @__PURE__ */ t(
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
        /* @__PURE__ */ t(
          Ca,
          {
            open: b,
            onClose: () => w(!1),
            onCreate: De
          }
        ),
        /* @__PURE__ */ t(
          ya,
          {
            open: k,
            onClose: () => R(!1),
            onSelect: Pe
          }
        ),
        /* @__PURE__ */ t(
          Fe,
          {
            open: !!I,
            onClose: () => A(null),
            title: "Delete pipeline?",
            maxWidth: 400,
            footer: /* @__PURE__ */ i(G, { children: [
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "delete-pipeline-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => A(null),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "delete-pipeline-confirm",
                  onClick: ye,
                  className: S(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-red-600 text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: "Delete"
                }
              )
            ] }),
            children: de && /* @__PURE__ */ i("p", { className: "m-0", children: [
              /* @__PURE__ */ i("strong", { children: [
                "“",
                de.name,
                "”"
              ] }),
              " will be permanently removed. Run history will also be lost."
            ] })
          }
        ),
        /* @__PURE__ */ t(
          Fe,
          {
            open: $,
            onClose: () => q(!1),
            title: `Delete ${K.size} pipeline${K.size === 1 ? "" : "s"}?`,
            maxWidth: 420,
            backdropTestId: "bulk-delete-modal",
            footer: /* @__PURE__ */ i(G, { children: [
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "bulk-delete-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => q(!1),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ i(
                "button",
                {
                  "data-testid": "bulk-delete-confirm",
                  onClick: se,
                  className: S(
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
            children: /* @__PURE__ */ i("p", { className: "m-0", children: [
              /* @__PURE__ */ i("strong", { children: [
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
const Ia = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function qn(e, n, r) {
  const o = Ia[e], s = Math.max(0, n | 0), a = Math.max(0, r | 0);
  if (!o)
    return {
      inputTokens: s,
      outputTokens: a,
      inputCostUsd: 0,
      outputCostUsd: 0,
      totalCostUsd: 0,
      model: e,
      modelFound: !1
    };
  const c = s / 1e6 * o.inputPerMillion, d = a / 1e6 * o.outputPerMillion;
  return {
    inputTokens: s,
    outputTokens: a,
    inputCostUsd: c,
    outputCostUsd: d,
    totalCostUsd: c + d,
    model: e,
    modelFound: !0
  };
}
function it(e) {
  const n = {};
  let r = 0, o = 0, s = 0, a = 0, c = !1;
  for (const l of e) {
    if (!l.model) continue;
    const p = l.tokensIn ?? 0, m = l.tokensOut ?? 0, x = qn(l.model, p, m), f = n[l.model];
    f ? n[l.model] = {
      inputTokens: f.inputTokens + x.inputTokens,
      outputTokens: f.outputTokens + x.outputTokens,
      inputCostUsd: f.inputCostUsd + x.inputCostUsd,
      outputCostUsd: f.outputCostUsd + x.outputCostUsd,
      totalCostUsd: f.totalCostUsd + x.totalCostUsd,
      model: l.model,
      modelFound: f.modelFound || x.modelFound
    } : n[l.model] = x, r += x.inputTokens, o += x.outputTokens, s += x.inputCostUsd, a += x.outputCostUsd, x.modelFound && (c = !0);
  }
  return { total: {
    inputTokens: r,
    outputTokens: o,
    inputCostUsd: s,
    outputCostUsd: a,
    totalCostUsd: s + a,
    model: "aggregate",
    modelFound: c
  }, perModel: n };
}
function ht(e) {
  return !e || !e.modelFound && e.totalCostUsd === 0 ? "—" : e.totalCostUsd >= 0.01 ? `$${e.totalCostUsd.toFixed(2)}` : e.totalCostUsd === 0 ? "$0.00" : `$${e.totalCostUsd.toFixed(4)}`;
}
function Sa(e) {
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
function Hn(e, n) {
  let r = 0;
  if (e.llm) {
    const s = n.get(e.nodeId);
    s && (r += qn(s, e.llm.tokensIn, e.llm.tokensOut).totalCostUsd);
  }
  const o = e.costUsd;
  return typeof o == "number" && Number.isFinite(o) && o > 0 && (r += o), r;
}
function Ta(e, n) {
  if (!n) return [];
  const r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    l.data.type === "llm" && r.set(l.id, l.data.model), o.set(l.id, Sa(l)), s.set(l.id, l.data.type);
  const a = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    a.set(l.id, 0), c.set(l.id, 0);
  for (const l of e)
    for (const p of Object.values(l.steps ?? {})) {
      if (!o.has(p.nodeId)) continue;
      const m = Hn(p, r);
      a.set(p.nodeId, (a.get(p.nodeId) ?? 0) + m), c.set(p.nodeId, (c.get(p.nodeId) ?? 0) + 1);
    }
  const d = n.nodes.map((l) => ({
    nodeId: l.id,
    label: o.get(l.id) ?? l.id,
    type: s.get(l.id) ?? l.type,
    totalCostUsd: a.get(l.id) ?? 0,
    stepCount: c.get(l.id) ?? 0
  }));
  return d.sort((l, p) => p.totalCostUsd - l.totalCostUsd), d;
}
function Aa(e) {
  return e.slice(0, 10);
}
function Ra(e) {
  return Date.UTC(
    Number(e.slice(0, 4)),
    Number(e.slice(5, 7)) - 1,
    Number(e.slice(8, 10))
  );
}
function Da(e, n, r = 30, o = /* @__PURE__ */ new Date()) {
  const s = /* @__PURE__ */ new Map();
  if (n)
    for (const m of n.nodes)
      m.data.type === "llm" && s.set(m.id, m.data.model);
  const a = Date.UTC(
    o.getUTCFullYear(),
    o.getUTCMonth(),
    o.getUTCDate()
  ), c = a - (r - 1) * 864e5, d = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  for (let m = c; m <= a; m += 864e5) {
    const x = new Date(m).toISOString().slice(0, 10);
    d.set(x, 0), l.set(x, 0);
  }
  for (const m of e) {
    const x = Aa(m.startedAt);
    if (!d.has(x)) continue;
    let f = 0;
    for (const h of Object.values(m.steps ?? {}))
      f += Hn(h, s);
    d.set(x, (d.get(x) ?? 0) + f), l.set(x, (l.get(x) ?? 0) + 1);
  }
  const p = [];
  for (let m = c; m <= a; m += 864e5) {
    const x = new Date(m).toISOString().slice(0, 10);
    p.push({
      date: x,
      ts: Ra(x),
      totalCostUsd: d.get(x) ?? 0,
      runCount: l.get(x) ?? 0
    });
  }
  return p;
}
const Kn = [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
], Wn = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], Vn = ["24h", "7d", "30d", "all"], $a = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function Ma(e) {
  return e.startsWith("document.") || e === "document" ? "document" : e === "schedule" || e === "scheduled" ? "scheduled" : e === "webhook" ? "webhook" : "manual";
}
function Pa(e) {
  let n = 0;
  for (const r of Object.values(e.steps ?? {})) {
    const o = r.attempts?.length ?? 0;
    o > 1 && (n += o - 1);
  }
  return n;
}
function Jn(e, n) {
  const r = n.now ?? Date.now(), o = n.range === "all" ? null : r - $a[n.range], s = n.query.trim().toLowerCase();
  return e.filter((a) => {
    if (n.statuses.size > 0 && !n.statuses.has(a.status)) return !1;
    if (n.triggerKinds.size > 0) {
      const c = Ma(a.triggeredBy.triggerType);
      if (!n.triggerKinds.has(c)) return !1;
    }
    if (o != null) {
      const c = new Date(a.startedAt).getTime();
      if (Number.isFinite(c) && c < o) return !1;
    }
    if (s.length > 0) {
      const c = a.id.toLowerCase().includes(s), d = a.pipelineId.toLowerCase().includes(s);
      if (!c && !d) return !1;
    }
    return !0;
  });
}
function fn(e, n) {
  if (!e) return /* @__PURE__ */ new Set();
  const r = new Set(n);
  return new Set(
    e.split(",").map((o) => o.trim()).filter((o) => r.has(o))
  );
}
function Gn(e) {
  const n = e.get("range") ?? "7d", r = Vn.includes(n) ? n : "7d";
  return {
    query: e.get("q") ?? "",
    statuses: fn(e.get("status"), Kn),
    triggerKinds: fn(e.get("trigger"), Wn),
    range: r
  };
}
const Ea = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, Oa = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, La = {
  "24h": "Last 24h",
  "7d": "Last 7d",
  "30d": "Last 30d",
  all: "All time"
};
function hn({
  label: e,
  options: n,
  selected: r,
  onToggle: o,
  labels: s,
  testIdPrefix: a
}) {
  const [c, d] = D(!1), l = re(null);
  tt(l, () => d(!1), c);
  const p = r.size === 0 ? "All" : r.size <= 2 ? Array.from(r).map((m) => s[m]).join(", ") : `${r.size} selected`;
  return /* @__PURE__ */ i("div", { ref: l, className: "relative", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => d(!c),
        "data-testid": `${a}-dropdown`,
        className: S(
          "flex items-center gap-1.5 px-2.5 py-[5px] text-xs font-medium rounded cursor-pointer font-[inherit] whitespace-nowrap bg-surface text-text-secondary border",
          r.size > 0 ? "border-primary" : "border-border"
        ),
        children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary font-semibold text-[11px]", children: e }),
          /* @__PURE__ */ t(
            "span",
            {
              className: S(
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
        children: n.map((m) => /* @__PURE__ */ i(
          "label",
          {
            "data-testid": `${a}-${m}`,
            className: "flex items-center gap-2 px-3 py-1.5 text-xs cursor-pointer text-text-primary hover:bg-[#f1f5f9]",
            children: [
              /* @__PURE__ */ t(
                "input",
                {
                  type: "checkbox",
                  checked: r.has(m),
                  onChange: () => o(m),
                  className: "m-0 accent-primary"
                }
              ),
              s[m]
            ]
          },
          m
        ))
      }
    )
  ] });
}
function Yn({
  query: e,
  statuses: n,
  triggerKinds: r,
  range: o,
  onQueryChange: s,
  onStatusToggle: a,
  onTriggerToggle: c,
  onRangeChange: d,
  onClearFilters: l
}) {
  const p = n.size > 0 || r.size > 0 || e.length > 0;
  return /* @__PURE__ */ i(
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
            onChange: (m) => s(m.target.value),
            className: "flex-[1_1_180px] max-w-[240px] px-2.5 py-[5px] text-xs border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
            "aria-label": "Search runs by run id or pipeline id"
          }
        ),
        /* @__PURE__ */ t("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: Vn.map((m) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": o === m,
            "data-testid": `runs-range-${m}`,
            onClick: () => d(m),
            className: S(
              "px-2 py-1 text-[11px] border-none rounded-[3px] cursor-pointer font-[inherit]",
              o === m ? "font-semibold bg-primary text-white" : "font-medium bg-transparent text-text-secondary"
            ),
            children: La[m]
          },
          m
        )) }),
        /* @__PURE__ */ t("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ t(
          hn,
          {
            label: "Status",
            options: Kn,
            selected: n,
            onToggle: a,
            labels: Ea,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ t(
          hn,
          {
            label: "Trigger",
            options: Wn,
            selected: r,
            onToggle: c,
            labels: Oa,
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
function _a({
  selectionCount: e,
  onExport: n,
  onDelete: r,
  onClear: o
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "runs-bulk-toolbar",
      className: "flex items-center gap-2 px-3 py-2 bg-[#fafbfc] border border-border rounded-md",
      children: [
        /* @__PURE__ */ i("span", { className: "text-xs text-text-secondary", children: [
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
function Ht(e) {
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
function Ua(e) {
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
const Ba = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function ja(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function Fa({
  filtered: e,
  selected: n,
  onSelectionChange: r,
  comparePair: o,
  onToggleComparePair: s,
  costByRunId: a,
  pipelineId: c,
  onNavigate: d,
  onOpenRetryModal: l
}) {
  const p = re(!1), m = re(null), x = e.length > 0 && e.every((u) => n.has(u.id)), f = !x && e.some((u) => n.has(u.id)), h = () => {
    const u = new Set(n);
    if (x)
      for (const y of e) u.delete(y.id);
    else
      for (const y of e) u.add(y.id);
    r(u);
  }, g = (u, y, N) => {
    const v = new Set(n), C = !v.has(u);
    if (N && m.current != null) {
      const b = Math.min(m.current, y), w = Math.max(m.current, y);
      for (let k = b; k <= w; k++) {
        const R = e[k];
        R && (C ? v.add(R.id) : v.delete(R.id));
      }
    } else C ? v.add(u) : v.delete(u);
    m.current = y, r(v);
  };
  return /* @__PURE__ */ i(
    "table",
    {
      className: "w-full border-collapse text-[13px] bg-surface border border-border rounded-lg overflow-hidden",
      children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ i("tr", { className: "bg-[#fafbfc] text-left", children: [
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
                  checked: x,
                  ref: (u) => {
                    u && (u.indeterminate = f);
                  },
                  onChange: h
                }
              )
            }
          ),
          ["Started", "Status", "Duration", "Retries", "Cost", "Triggered by", "Run ID", ""].map((u, y) => /* @__PURE__ */ t(
            "th",
            {
              scope: "col",
              className: "px-3 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
              children: u
            },
            `${u}-${y}`
          ))
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: e.map((u, y) => {
          const { tone: N, label: v } = Ht(u.status), C = n.has(u.id), b = Pa(u);
          return /* @__PURE__ */ i(
            "tr",
            {
              "data-testid": `run-card-${u.id}`,
              className: S(
                "border-b border-border cursor-pointer hover:bg-[#f1f5f9]",
                C && "bg-[#f1f5f9]"
              ),
              onClick: () => d(`/pipelines/${c}/runs/${u.id}`),
              children: [
                /* @__PURE__ */ i("td", { className: "px-3 py-2.5 text-xs text-text-secondary w-6", onClick: (w) => w.stopPropagation(), children: [
                  /* @__PURE__ */ t(
                    "input",
                    {
                      type: "checkbox",
                      "data-testid": `run-select-${u.id}`,
                      checked: C,
                      onMouseDown: (w) => {
                        p.current = w.shiftKey;
                      },
                      onKeyDown: (w) => {
                        p.current = w.shiftKey;
                      },
                      onChange: () => {
                        const w = p.current;
                        p.current = !1, g(u.id, y, w);
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
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: ja(u.startedAt) }),
                /* @__PURE__ */ i("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: [
                  /* @__PURE__ */ t(ne, { tone: N, "aria-label": `Status: ${v}`, children: v }),
                  u.status === "running" && u.stuckAt && /* @__PURE__ */ t(
                    ne,
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
                    ne,
                    {
                      tone: Ua(u.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${u.id}`,
                      title: u.error.message,
                      className: "ml-1.5",
                      children: Ba[u.error.errorCategory] ?? u.error.errorCategory
                    }
                  )
                ] }),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: ve(u.durationMs) }),
                /* @__PURE__ */ t(
                  "td",
                  {
                    className: S(
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
                    children: a[u.id] ?? "—"
                  }
                ),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: u.triggeredBy.userId ?? u.triggeredBy.triggerType }),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-[11px] font-mono text-text-tertiary", children: u.id.slice(0, 8) }),
                /* @__PURE__ */ i("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right", onClick: (w) => w.stopPropagation(), children: [
                  u.status === "running" && u.stuckAt && /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      "data-testid": `force-fail-${u.id}`,
                      onClick: async (w) => {
                        if (w.stopPropagation(), !!confirm(`Force-fail stuck run ${u.id.slice(0, 8)}? The run will be interrupted and you can retry from the stuck step.`))
                          try {
                            await pr(u.pipelineId, u.id);
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
                      onClick: (w) => {
                        w.stopPropagation(), l(u);
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
function Pd() {
  const { pipelineId: e } = nt(), n = Me(), [r, o] = kt(), [s, a] = D([]), [c, d] = D(null), [l, p] = D([]), [m, x] = D(() => /* @__PURE__ */ new Set()), [f, h] = D(null), [g, u] = D(!1), [y, N] = D(null), [v, C] = D(!1), b = P((j) => {
    const W = j.error?.nodeId;
    if (!W || W === "unknown") return;
    const ce = Object.entries(j.steps).filter(([pe, be]) => pe !== W && be.status === "completed").map(([pe]) => pe);
    h({ run: j, nodeId: W, skippedNodes: ce, snapshotInput: !1 }), N(null);
  }, []), w = P(async () => {
    if (f) {
      N(null), u(!0);
      try {
        const j = await On(
          f.run.pipelineId,
          f.run.id,
          f.nodeId,
          void 0,
          f.snapshotInput || void 0
        );
        h(null), n(`/pipelines/${f.run.pipelineId}/runs/${j.newRunId}`);
      } catch (j) {
        N(j instanceof Error ? j.message : String(j)), u(!1);
      }
    }
  }, [f, n]), { query: k, statuses: R, triggerKinds: I, range: A } = _(
    () => Gn(r),
    [r]
  ), $ = (j, W) => {
    const ce = new URLSearchParams(r);
    W ? ce.set(j, W) : ce.delete(j), o(ce, { replace: !0 });
  }, q = (j) => {
    const W = new Set(R);
    W.has(j) ? W.delete(j) : W.add(j), $("status", W.size === 0 ? null : Array.from(W).join(","));
  }, V = (j) => {
    const W = new Set(I);
    W.has(j) ? W.delete(j) : W.add(j), $("trigger", W.size === 0 ? null : Array.from(W).join(","));
  }, Q = (j) => {
    $("range", j === "7d" ? null : j);
  }, ae = (j) => {
    $("q", j.length === 0 ? null : j);
  }, le = (j) => {
    p((W) => W.includes(j) ? W.filter((ce) => ce !== j) : W.length >= 2 ? [W[1], j] : [...W, j]);
  };
  J(() => {
    e && (d(Ye(e)), a(vt(e)));
  }, [e]);
  const oe = _(
    () => Jn(s, { query: k, statuses: R, triggerKinds: I, range: A }),
    [s, k, R, I, A]
  ), ue = _(() => {
    const j = /* @__PURE__ */ new Map();
    if (!c) return j;
    for (const W of c.nodes)
      W.data.type === "llm" && j.set(W.id, W.data.model);
    return j;
  }, [c]), O = _(() => {
    const j = {};
    for (const W of oe) {
      const ce = Object.values(W.steps).filter((pe) => !!pe.llm).map((pe) => ({
        model: ue.get(pe.nodeId),
        tokensIn: pe.llm?.tokensIn ?? 0,
        tokensOut: pe.llm?.tokensOut ?? 0
      }));
      j[W.id] = ht(it(ce).total);
    }
    return j;
  }, [oe, ue]), Y = () => {
    if (!e) return;
    C(!1);
    const j = Array.from(m), W = s.filter((ce) => !m.has(ce.id));
    En(e);
    for (const ce of [...W].sort((pe, be) => pe.startedAt.localeCompare(be.startedAt)))
      ur(e, ce);
    a(vt(e)), x(/* @__PURE__ */ new Set()), p((ce) => ce.filter((pe) => !j.includes(pe)));
  }, K = () => {
    const j = s.filter((E) => m.has(E.id));
    if (j.length === 0) return;
    const W = new Blob([JSON.stringify(j, null, 2)], { type: "application/json" }), ce = URL.createObjectURL(W), pe = document.createElement("a"), be = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    pe.href = ce, pe.download = `pipeline-runs-${be}.json`, document.body.appendChild(pe), pe.click(), document.body.removeChild(pe), URL.revokeObjectURL(ce);
  };
  return e ? c ? /* @__PURE__ */ i("div", { "data-testid": "pipeline-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ t(
      Et,
      {
        open: f !== null,
        onConfirm: w,
        onCancel: () => {
          g || h(null);
        },
        title: "Retry from failure",
        confirmLabel: g ? "Starting…" : "Confirm retry",
        confirmDisabled: g,
        children: f && /* @__PURE__ */ i("div", { className: "flex flex-col gap-2.5", children: [
          /* @__PURE__ */ i("div", { className: "text-[13px] text-text-secondary", children: [
            "Run ",
            /* @__PURE__ */ t("code", { className: "bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs", children: f.run.id.slice(0, 8) }),
            " will restart from step",
            " ",
            /* @__PURE__ */ i("code", { className: "bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs", children: [
              f.nodeId.slice(0, 12),
              f.nodeId.length > 12 ? "…" : ""
            ] }),
            " ",
            "using the original upstream context."
          ] }),
          f.skippedNodes.length > 0 && /* @__PURE__ */ i("div", { children: [
            /* @__PURE__ */ i("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5", children: [
              "Steps skipped (",
              f.skippedNodes.length,
              ")"
            ] }),
            /* @__PURE__ */ t("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: f.skippedNodes.map((j) => /* @__PURE__ */ t("span", { className: "bg-[#fafbfc] border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary", children: j.slice(0, 10) }, j)) })
          ] }),
          /* @__PURE__ */ i("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
            /* @__PURE__ */ t("input", { type: "checkbox", checked: f.snapshotInput, onChange: (j) => h((W) => W && { ...W, snapshotInput: j.target.checked }), className: "accent-primary" }),
            "Use persisted input snapshot"
          ] }),
          y && /* @__PURE__ */ t("div", { "data-testid": "retry-modal-error", className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: y })
        ] })
      }
    ),
    /* @__PURE__ */ t(
      Et,
      {
        open: v,
        onConfirm: Y,
        onCancel: () => C(!1),
        title: `Delete ${m.size} run${m.size === 1 ? "" : "s"}?`,
        body: "This cannot be undone.",
        confirmLabel: `Delete ${m.size}`,
        tone: "destructive"
      }
    ),
    y && /* @__PURE__ */ t(Ze, { title: "Retry failed:", onDismiss: () => N(null), children: y }),
    /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ i(
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
      /* @__PURE__ */ i("span", { className: "text-xs text-text-tertiary ml-auto", children: [
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
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          disabled: l.length !== 2,
          onClick: () => {
            if (l.length !== 2) return;
            const [j, W] = l;
            n(`/pipelines/${e}/runs/compare/${j}/${W}`);
          },
          "data-testid": "run-compare-btn",
          className: S(
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
      Yn,
      {
        query: k,
        statuses: R,
        triggerKinds: I,
        range: A,
        onQueryChange: ae,
        onStatusToggle: q,
        onTriggerToggle: V,
        onRangeChange: Q,
        onClearFilters: () => {
          ae(""), $("status", null), $("trigger", null);
        }
      }
    ),
    m.size > 0 && /* @__PURE__ */ t(
      _a,
      {
        selectionCount: m.size,
        onExport: K,
        onDelete: () => {
          m.size > 0 && e && C(!0);
        },
        onClear: () => x(/* @__PURE__ */ new Set())
      }
    ),
    oe.length === 0 ? /* @__PURE__ */ t(
      Oe,
      {
        icon: "📜",
        title: s.length === 0 ? "No runs yet" : "No runs match these filters",
        body: s.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
      }
    ) : /* @__PURE__ */ t(
      Fa,
      {
        filtered: oe,
        selected: m,
        onSelectionChange: x,
        comparePair: l,
        onToggleComparePair: le,
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
function za(e) {
  return _(() => {
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
    return it(o).total;
  }, [e]);
}
function Ke({ title: e, children: n }) {
  return /* @__PURE__ */ i("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ t("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: e }),
    n
  ] });
}
const xn = "m-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", gn = "px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", $t = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", Se = "px-2 py-[5px] text-[11px] text-text-secondary align-top", qa = {
  "#2563eb": "bg-blue-600/10 text-blue-600",
  "#7c3aed": "bg-violet-600/10 text-violet-600",
  "#16a34a": "bg-green-600/10 text-green-600",
  "#dc2626": "bg-red-600/10 text-red-600"
};
function dt(e) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${qa[e] ?? ""}`.trimEnd();
}
const Ha = {
  completed: "#16a34a",
  failed: "#dc2626",
  running: "#2563eb"
};
function Ka({ stepId: e, step: n, index: r, nodeType: o, nodeConfig: s, onRetryFromStep: a, onResumeFromStep: c }) {
  const [d, l] = D(!1), p = n.output, m = p?.response, x = n.llm, f = n.input, h = Ha[n.status] ?? "#94a3b8";
  return /* @__PURE__ */ i("div", { className: "relative pl-9 mb-1", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: "absolute left-[10px] top-[14px] w-3 h-3 rounded-full border-2 border-white z-[1] shadow-[0_0_0_1px_#e2e8f0]",
        style: { background: h }
      }
    ),
    /* @__PURE__ */ i(
      "div",
      {
        onClick: () => l(!d),
        "aria-expanded": d,
        role: "button",
        tabIndex: 0,
        onKeyDown: (g) => {
          (g.key === "Enter" || g.key === " ") && (g.preventDefault(), l(!d));
        },
        className: S(
          "flex items-center gap-2.5 px-3.5 py-2.5 cursor-pointer transition-colors duration-100",
          d ? "bg-[#fafbfc] rounded-t-lg" : "bg-surface rounded-lg"
        ),
        style: {
          border: `1px solid ${d ? h + "40" : "#e2e8f0"}`,
          ...d ? { borderRadius: "8px 8px 0 0" } : {}
        },
        children: [
          /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": "true",
              className: S(
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
              style: { background: h },
              children: n.status
            }
          ),
          /* @__PURE__ */ i("span", { className: "text-[13px] font-semibold text-text-primary", children: [
            r + 1,
            ". ",
            o
          ] }),
          /* @__PURE__ */ t("span", { className: "text-[11px] font-mono text-text-tertiary", children: e.slice(0, 8) }),
          n.durationMs != null && /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary ml-auto", children: n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` }),
          x && /* @__PURE__ */ i("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
            x.tokensIn + x.tokensOut,
            " tok"
          ] }),
          p?.tokensIn != null && !x && /* @__PURE__ */ i("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
            Number(p.tokensIn) + Number(p.tokensOut),
            " tok"
          ] })
        ]
      }
    ),
    d && /* @__PURE__ */ i(
      "div",
      {
        className: "border-t-0 rounded-b-lg bg-surface overflow-hidden",
        style: { border: `1px solid ${h}40` },
        children: [
          /* @__PURE__ */ t(Ke, { title: "Execution Timeline", children: /* @__PURE__ */ i("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ i("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ t("th", { scope: "col", className: $t, children: "Event" }),
              /* @__PURE__ */ t("th", { scope: "col", className: $t, children: "Time" }),
              /* @__PURE__ */ t("th", { scope: "col", className: $t, children: "Detail" })
            ] }) }),
            /* @__PURE__ */ i("tbody", { children: [
              n.startedAt && /* @__PURE__ */ i("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#2563eb"), children: "started" }) }),
                /* @__PURE__ */ t("td", { className: Se, children: new Date(n.startedAt).toLocaleTimeString() }),
                /* @__PURE__ */ i("td", { className: Se, children: [
                  "Node ",
                  e.slice(0, 8),
                  " (",
                  o,
                  ") began execution"
                ] })
              ] }),
              x?.streamOpened && /* @__PURE__ */ i("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#7c3aed"), children: "stream.opened" }) }),
                /* @__PURE__ */ t("td", { className: Se, children: "—" }),
                /* @__PURE__ */ t("td", { className: Se, children: "LLM stream connection established" })
              ] }),
              x?.firstTokenLatencyMs != null && /* @__PURE__ */ i("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#7c3aed"), children: "first.token" }) }),
                /* @__PURE__ */ i("td", { className: Se, children: [
                  "+",
                  x.firstTokenLatencyMs,
                  "ms"
                ] }),
                /* @__PURE__ */ t("td", { className: Se, children: "First token received from LLM" })
              ] }),
              n.completedAt && n.status === "completed" && /* @__PURE__ */ i("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#16a34a"), children: "completed" }) }),
                /* @__PURE__ */ t("td", { className: Se, children: new Date(n.completedAt).toLocaleTimeString() }),
                /* @__PURE__ */ i("td", { className: Se, children: [
                  "Finished in ",
                  n.durationMs != null ? n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` : "—"
                ] })
              ] }),
              n.status === "failed" && /* @__PURE__ */ i("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#dc2626"), children: "failed" }) }),
                /* @__PURE__ */ t("td", { className: Se, children: n.completedAt ? new Date(n.completedAt).toLocaleTimeString() : "—" }),
                /* @__PURE__ */ t("td", { className: Se, children: n.error ?? "Unknown error" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ t(Ke, { title: "Node Configuration", children: s && Object.keys(s).length > 1 ? /* @__PURE__ */ t("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(s).filter(([g]) => g !== "type").map(([g, u]) => /* @__PURE__ */ i($n.Fragment, { children: [
            /* @__PURE__ */ t("span", { className: "text-text-tertiary font-medium", children: g }),
            /* @__PURE__ */ t(
              "span",
              {
                className: S(
                  "text-text-secondary break-words",
                  typeof u == "string" && u.length > 60 ? "whitespace-pre-wrap font-sans" : "whitespace-nowrap font-mono"
                ),
                children: typeof u == "string" ? u : JSON.stringify(u)
              }
            )
          ] }, g)) }) : /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary italic", children: "No configuration" }) }),
          f && Object.keys(f).length > 0 && /* @__PURE__ */ t(Ke, { title: "Runtime Input", children: /* @__PURE__ */ t("pre", { className: xn, children: JSON.stringify(f, null, 2) }) }),
          x?.prompt && /* @__PURE__ */ t(Ke, { title: "Resolved Prompt", children: /* @__PURE__ */ t("div", { className: gn, children: x.prompt }) }),
          m || x?.response ? /* @__PURE__ */ t(Ke, { title: "Response", children: /* @__PURE__ */ t("div", { className: gn, children: m ?? x?.response }) }) : /* @__PURE__ */ t(Ke, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ t("pre", { className: xn, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
          (x || p?.tokensIn != null) && /* @__PURE__ */ t(Ke, { title: "Token Usage", children: /* @__PURE__ */ i("div", { className: "flex gap-5 flex-wrap text-xs text-text-secondary", children: [
            /* @__PURE__ */ i("span", { children: [
              "Tokens in: ",
              /* @__PURE__ */ t("strong", { children: String(x?.tokensIn ?? p?.tokensIn ?? "—") })
            ] }),
            /* @__PURE__ */ i("span", { children: [
              "Tokens out: ",
              /* @__PURE__ */ t("strong", { children: String(x?.tokensOut ?? p?.tokensOut ?? "—") })
            ] }),
            x?.firstTokenLatencyMs != null && /* @__PURE__ */ i("span", { children: [
              "First token: ",
              /* @__PURE__ */ i("strong", { children: [
                x.firstTokenLatencyMs,
                "ms"
              ] })
            ] })
          ] }) }),
          n.error && /* @__PURE__ */ t(Ke, { title: "Error", children: /* @__PURE__ */ t("div", { className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap", children: n.error }) }),
          (a || c) && /* @__PURE__ */ i("div", { className: "px-4 py-2.5 border-t border-border flex justify-end gap-2", children: [
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
            a && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                "data-testid": `retry-from-step-${e}`,
                onClick: (g) => {
                  g.stopPropagation(), a(e);
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
function Wa({ steps: e, nodeDataMap: n, edges: r, onRetryFromStep: o, onResumeFromStep: s }) {
  const a = _(() => {
    const l = Object.entries(e).sort(([, b], [, w]) => {
      const k = b.completedAt ? Date.parse(b.completedAt) - (b.durationMs ?? 0) : 0, R = w.completedAt ? Date.parse(w.completedAt) - (w.durationMs ?? 0) : 0;
      return k - R;
    });
    if (!r || r.length === 0)
      return l.map(([b, w]) => ({
        stepId: b,
        step: w,
        children: []
      }));
    const p = (b) => {
      const w = b.lastIndexOf(":");
      if (w > 0) {
        const k = b.slice(w + 1);
        if (/^\d+$/.test(k)) return b.slice(0, w);
      }
      return b;
    }, m = /* @__PURE__ */ new Set(["fork", "condition", "approval"]), x = /* @__PURE__ */ new Set();
    for (const [b] of l) {
      const w = p(b), k = n[w]?.type;
      k && m.has(k) && x.add(w);
    }
    const f = (b) => b.startsWith("branch-") || b === "true" || b === "false" || b === "approved" || b === "rejected", h = [];
    for (const b of r)
      x.has(b.source) && f(b.sourceHandle) && h.push({ forkId: b.source, branch: b.sourceHandle, targetNodeId: b.target });
    const g = /* @__PURE__ */ new Map();
    for (const b of r)
      g.has(b.source) || g.set(b.source, []), g.get(b.source).push({ target: b.target, handle: b.sourceHandle });
    const u = /* @__PURE__ */ new Set();
    function y(b) {
      const w = [];
      let k = b;
      for (; k; ) {
        const R = l.find(([Q]) => p(Q) === k && !u.has(Q));
        if (!R) break;
        const [I, A] = R;
        u.add(I);
        const $ = { stepId: I, step: A, children: [] }, q = p(I);
        if (x.has(q)) {
          const Q = h.filter((ae) => ae.forkId === q);
          for (const { branch: ae, targetNodeId: le } of Q) {
            const oe = y(le);
            for (const ue of oe)
              ue.branch = ue.branch ?? ae;
            oe.length > 0 && (oe[0].branch = ae, $.children.push(...oe));
          }
        }
        w.push($);
        const V = g.get(q)?.filter((Q) => Q.handle === "out");
        k = V && V.length === 1 ? V[0].target : null;
      }
      return w;
    }
    const N = /* @__PURE__ */ new Set();
    for (const b of r)
      N.add(b.target);
    const v = l.find(([b]) => !N.has(p(b)))?.[1] ? l.find(([b]) => !N.has(p(b)))[0] : l[0]?.[0];
    let C = [];
    v && (C = y(p(v)));
    for (const [b, w] of l)
      u.has(b) || C.push({ stepId: b, step: w, children: [] });
    return C;
  }, [e, n, r]), c = (l) => {
    if (n[l]) return n[l];
    const p = l.lastIndexOf(":");
    if (p > 0 && /^\d+$/.test(l.slice(p + 1)))
      return n[l.slice(0, p)];
  };
  function d(l, p) {
    let m = p;
    return l.map((x) => {
      const f = m++, h = /* @__PURE__ */ new Map();
      for (const g of x.children) {
        const u = g.branch ?? "default";
        h.has(u) || h.set(u, []), h.get(u).push(g);
      }
      return /* @__PURE__ */ i($n.Fragment, { children: [
        /* @__PURE__ */ t(
          Ka,
          {
            stepId: x.stepId,
            step: x.step,
            index: f,
            nodeType: c(x.stepId)?.type ?? "unknown",
            nodeConfig: c(x.stepId)?.data,
            onRetryFromStep: o,
            onResumeFromStep: s
          }
        ),
        x.children.length > 0 && /* @__PURE__ */ t("div", { className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1", children: Array.from(h.entries()).map(([g, u], y) => /* @__PURE__ */ i("div", { children: [
          /* @__PURE__ */ t("div", { className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${y === 0 ? "mt-1" : "mt-2"}`, children: g.replace("-", " ") }),
          d(u, m)
        ] }, g)) })
      ] }, x.stepId);
    });
  }
  return /* @__PURE__ */ i("div", { className: "relative", children: [
    /* @__PURE__ */ t("div", { className: "absolute left-[15px] top-6 bottom-6 w-0.5 bg-border rounded-sm" }),
    d(a, 0)
  ] });
}
const Va = 5e3, Ja = "synthetic-";
function Ga(e) {
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
function Lt(e, n) {
  return n.timestamp.localeCompare(e.timestamp);
}
function Ya(e, n) {
  if (n.length === 0) return e.slice().sort(Lt);
  const r = new Set(e.map((a) => a.auditId)), o = /* @__PURE__ */ new Map();
  for (const a of e) {
    const c = o.get(a.action);
    (!c || a.timestamp > c) && o.set(a.action, a.timestamp);
  }
  const s = n.filter((a) => {
    if (r.has(a.auditId)) return !1;
    const c = o.get(a.action);
    return !c || a.timestamp >= c;
  });
  return [...e, ...s].sort(Lt);
}
function Xa(e, n, r = {}) {
  const { pollMs: o = Va, filters: s } = r, a = Pr(), [c, d] = D([]), [l, p] = D([]), [m, x] = D(!0), [f, h] = D(null), [g, u] = D(void 0), [y, N] = D(0), [v, C] = D(!1), b = JSON.stringify({
    since: s?.since,
    until: s?.until,
    actions: s?.actions,
    limit: s?.limit
  });
  J(() => {
    if (!e || !n) return;
    let A = !1;
    return x(!0), h(null), (async () => {
      try {
        const $ = await Jt(e, n, s ?? {});
        if (A) return;
        d($.items), u($.nextCursor), x(!1);
      } catch ($) {
        if (A) return;
        h($ instanceof Error ? $.message : String($)), x(!1);
      }
    })(), () => {
      A = !0;
    };
  }, [e, n, b, y]), J(() => {
    if (!e || !n || o <= 0) return;
    const A = window.setInterval(() => {
      N(($) => $ + 1);
    }, o);
    return () => window.clearInterval(A);
  }, [e, n, o]), J(() => {
    if (!e || !n) return;
    const A = [], $ = (V, Q) => {
      const ae = Ga(V);
      if (!ae) return;
      const le = Q;
      if (le.runId !== n) return;
      C(!0);
      const oe = {
        auditId: `${Ja}${V}-${le.stepId ?? "run"}-${Date.now()}`,
        timestamp: le.at ?? (/* @__PURE__ */ new Date()).toISOString(),
        action: ae,
        actorUserId: "executor",
        pipelineId: e,
        runId: n,
        trace: Q
      };
      p((ue) => [oe, ...ue]);
    }, q = [
      "pipeline.step.started",
      "pipeline.step.completed",
      "pipeline.step.failed",
      "pipeline.step.breakpoint",
      "pipeline.run.completed",
      "pipeline.run.failed",
      "pipeline.run.resumed-from-step",
      "pipeline.approval.recorded"
    ];
    for (const V of q)
      A.push(a.subscribe(V, (Q) => $(V, Q)));
    return A.push(a.subscribeToRun(n)), () => {
      for (const V of A) V();
    };
  }, [a, e, n]), J(() => {
    c.length !== 0 && p((A) => {
      if (A.length === 0) return A;
      const $ = /* @__PURE__ */ new Map();
      for (const q of c) {
        const V = $.get(q.action);
        (!V || q.timestamp > V) && $.set(q.action, q.timestamp);
      }
      return A.filter((q) => {
        const V = $.get(q.action);
        return !V || q.timestamp >= V;
      });
    });
  }, [c]);
  const w = re(!1), k = P(() => {
    !e || !n || !g || w.current || (w.current = !0, (async () => {
      try {
        const A = await Jt(e, n, {
          ...s ?? {},
          cursor: g
        });
        d(($) => {
          const q = new Set($.map((Q) => Q.auditId)), V = $.concat(A.items.filter((Q) => !q.has(Q.auditId)));
          return V.sort(Lt), V;
        }), u(A.nextCursor);
      } catch (A) {
        h(A instanceof Error ? A.message : String(A));
      } finally {
        w.current = !1;
      }
    })());
  }, [e, n, g, b]), R = P(() => {
    N((A) => A + 1);
  }, []);
  return {
    items: _(() => Ya(c, l), [c, l]),
    loading: m,
    error: f,
    hasMore: !!g,
    loadMore: k,
    liveHealthy: v,
    refresh: R
  };
}
const Qa = "#3b82f6", Za = "#eab308", el = "#f97316", bn = "#64748b", tl = "#ef4444", nl = "#a855f7";
function rl(e) {
  return e.action === "pipeline.step.failed" || e.outcome === "error" ? tl : e.action === "pipeline.run.resumed-from-step" || e.action.startsWith("pipeline.step.context.patched") ? nl : e.action.startsWith("pipeline.approval.") ? Za : e.action.startsWith("pipeline.breakpoint.") ? el : e.action.startsWith("pipeline.step.") ? Qa : (e.action.startsWith("pipeline.run."), bn);
}
const ol = {
  "1h": "Last 1h",
  "24h": "Last 24h",
  all: "All"
}, yn = [
  { label: "Steps", matches: (e) => e.startsWith("pipeline.step.") },
  { label: "Approvals", matches: (e) => e.startsWith("pipeline.approval.") || e === "pipeline.approve" || e === "pipeline.reject" },
  { label: "Breakpoints", matches: (e) => e.startsWith("pipeline.breakpoint.") || e === "pipeline.step.breakpoint.hit" },
  { label: "Run lifecycle", matches: (e) => e.startsWith("pipeline.run.") || e === "pipeline.trigger" || e === "pipeline.cancel" },
  { label: "Errors", matches: (e) => e === "pipeline.step.failed" || e === "pipeline.run.failed" || e === "pipeline.force_fail" }
];
function sl(e) {
  if (e === "all") return null;
  const n = Date.now();
  return e === "1h" ? n - 3600 * 1e3 : n - 1440 * 60 * 1e3;
}
function vn(e) {
  const n = e.details, r = e.trace, o = n && typeof n.stepId == "string" ? n.stepId : void 0, s = r && typeof r.stepId == "string" ? r.stepId : void 0, a = r && typeof r.nodeId == "string" ? r.nodeId : void 0;
  return o ?? s ?? a;
}
function il(e, n = Date.now()) {
  const r = Date.parse(e);
  if (!Number.isFinite(r)) return e;
  const o = Math.max(0, Math.floor((n - r) / 1e3));
  if (o < 5) return "just now";
  if (o < 60) return `${o}s ago`;
  const s = Math.floor(o / 60);
  if (s < 60) return `${s}m ago`;
  const a = Math.floor(s / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function al({
  pipelineId: e,
  runId: n,
  onStepClick: r
}) {
  const o = Xa(e, n), { items: s, error: a, hasMore: c, loadMore: d, loading: l } = o, [p, m] = D(/* @__PURE__ */ new Set()), [x, f] = D(""), [h, g] = D("all"), [u, y] = D(/* @__PURE__ */ new Set()), N = P((k) => {
    m((R) => {
      const I = new Set(R);
      return I.has(k) ? I.delete(k) : I.add(k), I;
    });
  }, []), v = P((k) => {
    y((R) => {
      const I = new Set(R);
      return I.has(k) ? I.delete(k) : I.add(k), I;
    });
  }, []), C = _(() => {
    const k = sl(h), R = x.trim().toLowerCase(), I = yn.filter((A) => p.has(A.label));
    return s.filter((A) => {
      if (I.length > 0 && !I.some(($) => $.matches(A.action)) || R && !A.actorUserId.toLowerCase().includes(R)) return !1;
      if (k !== null) {
        const $ = Date.parse(A.timestamp);
        if (!Number.isFinite($) || $ < k) return !1;
      }
      return !0;
    });
  }, [s, p, x, h]), b = P(() => {
    if (typeof window > "u") return;
    const k = C.map(($) => JSON.stringify($)).join(`
`) + (C.length > 0 ? `
` : ""), R = new Blob([k], { type: "application/x-ndjson" }), I = URL.createObjectURL(R), A = document.createElement("a");
    A.href = I, A.download = `executor-log-${n}.ndjson`, document.body.appendChild(A), A.click(), document.body.removeChild(A), URL.revokeObjectURL(I);
  }, [C, n]), w = P(
    (k) => {
      if (v(k.auditId), !r || !k.action.startsWith("pipeline.step.")) return;
      const R = vn(k);
      R && r(R);
    },
    [r, v]
  );
  return /* @__PURE__ */ i(
    "div",
    {
      className: "flex flex-col flex-1 min-h-0 bg-surface border border-border rounded-lg overflow-hidden",
      "data-testid": "executor-log",
      children: [
        /* @__PURE__ */ i("div", { className: "sticky top-0 z-[2] flex flex-wrap items-center gap-2 px-3 py-2.5 bg-[#f8fafc] border-b border-border text-xs", children: [
          /* @__PURE__ */ i(
            "span",
            {
              className: S(
                "inline-flex items-center text-[11px] font-semibold",
                a ? "text-text-tertiary" : "text-text-secondary"
              ),
              "data-testid": "executor-log-live-indicator",
              title: a ? `Live updates unavailable: ${a}` : "Live updates active",
              children: [
                /* @__PURE__ */ t(
                  "span",
                  {
                    className: S(
                      "inline-block w-2 h-2 rounded-full mr-1.5 align-middle",
                      a ? "bg-text-tertiary" : "bg-[#22c55e] [animation:executor-log-pulse_1.6s_ease-in-out_infinite]"
                    ),
                    "aria-hidden": !0
                  }
                ),
                "Live"
              ]
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-border", children: "|" }),
          yn.map((k) => {
            const R = p.has(k.label);
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: S(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  R ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => N(k.label),
                "data-testid": `executor-log-chip-${k.label.toLowerCase().replace(/\s+/g, "-")}`,
                "aria-pressed": R,
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
              value: x,
              onChange: (k) => f(k.target.value),
              placeholder: "Actor",
              className: "font-[inherit] text-xs px-2 py-1 border border-border-field rounded bg-surface text-text-primary min-w-[120px]",
              "data-testid": "executor-log-actor-input",
              "aria-label": "Filter by actor"
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-border", children: "|" }),
          ["1h", "24h", "all"].map((k) => {
            const R = h === k;
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: S(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  R ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => g(k),
                "data-testid": `executor-log-time-${k}`,
                "aria-pressed": R,
                children: ol[k]
              },
              k
            );
          }),
          /* @__PURE__ */ t("div", { className: "flex-1" }),
          /* @__PURE__ */ i("span", { className: "text-[11px] text-text-tertiary", children: [
            C.length,
            " of ",
            s.length,
            " shown"
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex-1 overflow-y-auto px-4 py-3 relative", "data-testid": "executor-log-timeline", children: [
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
            const R = u.has(k.auditId), A = k.action.startsWith("pipeline.step.") ? vn(k) : void 0;
            return /* @__PURE__ */ i(
              "div",
              {
                className: "grid grid-cols-[14px_auto_auto_1fr] items-baseline gap-2.5 py-1.5 text-xs border-b border-[#fafbfc] cursor-pointer",
                onClick: () => w(k),
                "data-testid": "executor-log-row",
                "data-action": k.action,
                "data-audit-id": k.auditId,
                children: [
                  /* @__PURE__ */ t(
                    "span",
                    {
                      className: "w-2.5 h-2.5 rounded-full shrink-0 self-center",
                      style: { background: rl(k) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ t(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: k.timestamp,
                      children: il(k.timestamp)
                    }
                  ),
                  /* @__PURE__ */ t("span", { className: "text-text-secondary text-[11px] whitespace-nowrap", children: k.actorUserId }),
                  /* @__PURE__ */ i("span", { className: "text-text-primary flex items-baseline gap-1.5 flex-wrap", children: [
                    /* @__PURE__ */ t("code", { className: "font-mono text-[11px] bg-[#fafbfc] px-1.5 py-px rounded-[3px]", children: k.action }),
                    A && /* @__PURE__ */ i("span", { className: "text-[11px] text-text-tertiary", "data-testid": "executor-log-stepid", children: [
                      "· ",
                      A.slice(0, 14),
                      A.length > 14 ? "…" : ""
                    ] }),
                    k.outcome && /* @__PURE__ */ i(
                      "span",
                      {
                        className: S(
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
                  R && k.trace && /* @__PURE__ */ t(
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
        /* @__PURE__ */ i("div", { className: "flex justify-between items-center gap-2 px-3 py-2.5 border-t border-border bg-[#f8fafc]", children: [
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
function Ed() {
  const { pipelineId: e, runId: n } = nt();
  return !e || !n ? /* @__PURE__ */ t(rt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t(Pn, { pipelineId: e, children: /* @__PURE__ */ t(mr, { children: /* @__PURE__ */ t(ll, { pipelineId: e, runId: n }) }) });
}
function ll({ pipelineId: e, runId: n }) {
  const r = Me(), o = ot(), s = st(), { definition: a } = o, [c, d] = D(null);
  J(() => {
    let E = !1;
    return import("./pipelineAudit-BFARhgAC.js").then((Z) => Z.N).then(({ getPipelineRun: Z }) => {
      Z(e, n).then((ge) => {
        !E && ge && d(ge);
      });
    }), () => {
      E = !0;
    };
  }, [e, n]);
  const l = _(() => {
    const E = s.runs[n], Z = c;
    if (!E && !Z) return;
    if (!E) return Z ?? void 0;
    if (!Z) return E;
    const ge = Object.keys(E.steps).length, De = Object.keys(Z.steps).length;
    return ge >= De ? E : { ...Z, status: E.status, currentStepIds: E.currentStepIds };
  }, [s.runs, n, c]);
  fr(n);
  const p = za(l ?? null), m = _(() => {
    const E = {};
    if (!a) return E;
    for (const Z of a.nodes)
      E[Z.id] = { type: Z.data.type, data: Z.data };
    return E;
  }, [a]), [x, f] = D(!1), h = re(null);
  tt(h, () => f(!1), x);
  const [g, u] = D("steps"), [y, N] = D(null), v = P((E) => {
    N(E), u("steps");
  }, []), [C, b] = D(null), [w, k] = D(null), [R, I] = D(!1), A = l?.status === "failed" ? l.error?.nodeId : void 0, $ = P((E) => {
    if (!l) return;
    const Z = Object.entries(l.steps).filter(([ge, De]) => ge !== E && De.status === "completed").map(([ge]) => ge);
    b({ nodeId: E, skippedNodes: Z, snapshotInput: !1 }), k(null);
  }, [l]), q = P(async () => {
    if (!(!C || !l)) {
      k(null), I(!0);
      try {
        const E = await On(
          e,
          l.id,
          C.nodeId,
          void 0,
          C.snapshotInput || void 0
        );
        b(null), r(`/pipelines/${e}/runs/${E.newRunId}`);
      } catch (E) {
        k(E instanceof Error ? E.message : String(E)), I(!1);
      }
    }
  }, [C, l, e, r]), [V, Q] = D(null), [ae, le] = D(null), [oe, ue] = D(null), O = P(async (E) => {
    if (l) {
      le(null), Q(E);
      try {
        const Z = await hr(e, l.id, E);
        ue(
          `Resumed from ${E.slice(0, 10)}${E.length > 10 ? "…" : ""} (replay #${Z.replayAttempts})`
        ), setTimeout(() => ue(null), 4e3), r(`/pipelines/${e}/runs/${l.id}`);
      } catch (Z) {
        le(Z instanceof Error ? Z.message : String(Z));
      } finally {
        Q(null);
      }
    }
  }, [l, e, r]), Y = P(async () => {
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
    f(!1);
    try {
      await navigator.clipboard?.writeText(n);
    } catch {
    }
  }, j = () => {
    if (f(!1), !l) return;
    const E = JSON.stringify(l, null, 2);
    pt(`run-${n}.json`, E);
  }, W = () => {
    if (f(!1), !a) return;
    const E = _t(
      a.id,
      `${a.name} (from run)`
    );
    E && r(`/pipelines/${E.id}`);
  };
  if (!l)
    return /* @__PURE__ */ i(
      "div",
      {
        className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
        "data-testid": "pipeline-replay-missing",
        children: [
          /* @__PURE__ */ i("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
            /* @__PURE__ */ t(
              ct,
              {
                onClick: () => r(`/pipelines/${e}`),
                "aria-label": "Back to pipeline",
                title: "Back to pipeline",
                children: "←"
              }
            ),
            /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: a?.name ?? "Pipeline" })
          ] }),
          /* @__PURE__ */ i("div", { className: "flex-1 flex flex-col items-center justify-center gap-3.5 p-8 text-center", children: [
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
  const ce = Ht(l.status), pe = l.triggeredBy.userId ?? l.triggeredBy.triggerType, be = ht(p);
  return /* @__PURE__ */ i(
    "div",
    {
      className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
      "data-testid": "pipeline-replay",
      children: [
        /* @__PURE__ */ i("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
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
              title: a?.name ?? e,
              children: a?.name ?? e
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary text-xs", children: "·" }),
          /* @__PURE__ */ i(
            "div",
            {
              className: "text-xs text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
              "data-testid": "replay-subtitle",
              children: [
                "Run from ",
                et(l.startedAt),
                " by ",
                pe
              ]
            }
          ),
          /* @__PURE__ */ i(
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
          /* @__PURE__ */ t(ne, { tone: ce.tone, "aria-label": `Status: ${ce.label}`, children: ce.label }),
          l.status === "failed" && l.error?.errorCategory ? /* @__PURE__ */ t(
            ne,
            {
              tone: "danger",
              title: l.error.message || "Error details unavailable",
              children: l.error.errorCategory
            }
          ) : null,
          /* @__PURE__ */ t("div", { className: "flex-1" }),
          A && /* @__PURE__ */ t(
            Ue,
            {
              onClick: () => $(A),
              disabled: R,
              "data-testid": "retry-from-failed-step-button",
              title: `Retry from "${A}" with the original upstream context`,
              children: "↻ Retry from failure"
            }
          ),
          /* @__PURE__ */ t(
            Ue,
            {
              onClick: Y,
              "data-testid": "rerun-button",
              title: "Re-run with the original trigger payload",
              children: "↻ Re-run"
            }
          ),
          /* @__PURE__ */ i("div", { className: "relative", ref: h, children: [
            /* @__PURE__ */ t(
              ct,
              {
                onClick: () => f((E) => !E),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            x ? /* @__PURE__ */ i("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: K, children: "Copy runId" }),
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: j, children: "Export run JSON" }),
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: W, children: "Open as new draft" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ t(
          Et,
          {
            open: C !== null,
            onConfirm: q,
            onCancel: () => {
              R || b(null);
            },
            title: "Retry from step",
            confirmLabel: R ? "Starting…" : "Confirm retry",
            confirmDisabled: R,
            children: C && /* @__PURE__ */ i("div", { className: "flex flex-col gap-2.5", children: [
              /* @__PURE__ */ i("div", { className: "text-[13px] text-text-secondary", children: [
                "A new run will start from",
                " ",
                /* @__PURE__ */ i("code", { className: "bg-surface-inset px-1 rounded text-xs", children: [
                  C.nodeId.slice(0, 12),
                  C.nodeId.length > 12 ? "…" : ""
                ] }),
                " ",
                "using the original upstream context."
              ] }),
              C.skippedNodes.length > 0 && /* @__PURE__ */ i("div", { children: [
                /* @__PURE__ */ i("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5", children: [
                  "Steps that will be skipped (",
                  C.skippedNodes.length,
                  ")"
                ] }),
                /* @__PURE__ */ t("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: C.skippedNodes.map((E) => /* @__PURE__ */ t("span", { className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary", children: E.slice(0, 10) }, E)) })
              ] }),
              /* @__PURE__ */ i("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
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
              w && /* @__PURE__ */ t("div", { "data-testid": "retry-modal-error", className: "py-2 px-3 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: w })
            ] })
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col min-h-0", children: /* @__PURE__ */ i("div", { className: "flex-1 overflow-auto py-5 px-7 bg-surface", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-3 mb-5", children: [
            /* @__PURE__ */ i("h3", { className: "m-0 text-[15px] font-bold text-text-primary", children: [
              "Steps (",
              Object.keys(l.steps).length,
              ")"
            ] }),
            /* @__PURE__ */ i("span", { className: "text-xs text-text-tertiary", children: [
              l.startedAt ? new Date(l.startedAt).toLocaleTimeString() : "",
              " — ",
              l.completedAt ? new Date(l.completedAt).toLocaleTimeString() : "in progress"
            ] }),
            l.durationMs != null && /* @__PURE__ */ i("span", { className: "text-xs text-text-secondary ml-auto", children: [
              "Total: ",
              l.durationMs < 1e3 ? `${l.durationMs}ms` : `${(l.durationMs / 1e3).toFixed(1)}s`
            ] })
          ] }),
          w && /* @__PURE__ */ t(Ze, { title: "Retry failed:", className: "mb-4", children: w }),
          ae && /* @__PURE__ */ t(Ze, { title: "Resume failed:", className: "mb-4", "data-testid": "resume-error-banner", children: ae }),
          (l.replayAttempts ?? 0) > 0 && /* @__PURE__ */ t(
            Ze,
            {
              title: "Resumed from a previous failure",
              className: "mb-4",
              "data-testid": "resume-history-banner",
              children: /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ i("div", { children: [
                  l.error?.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ i(G, { children: [
                    "Originally failed at ",
                    /* @__PURE__ */ t("code", { children: l.error.nodeId.slice(0, 12) }),
                    " — "
                  ] }),
                  "Resumed ",
                  l.replayAttempts,
                  " time",
                  l.replayAttempts === 1 ? "" : "s",
                  ".",
                  l.resumeHistory && l.resumeHistory.length > 0 && /* @__PURE__ */ i(G, { children: [
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
                    children: l.resumeHistory.map((E, Z) => /* @__PURE__ */ i("li", { children: [
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
          oe && /* @__PURE__ */ t(Ze, { title: "Resumed", className: "mb-4", "data-testid": "resume-toast", children: oe }),
          l.error && /* @__PURE__ */ i(Ze, { title: "Run failed:", className: "mb-4", children: [
            l.error.message,
            l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ i("span", { className: "ml-2 text-[11px] text-[#b91c1c]", children: [
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
                    className: S(
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
              Wa,
              {
                steps: l.steps,
                nodeDataMap: m,
                edges: a?.edges,
                onRetryFromStep: $,
                onResumeFromStep: l.status === "failed" ? O : void 0
              }
            )
          ) : /* @__PURE__ */ t("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ t(
            al,
            {
              pipelineId: e,
              runId: n,
              onStepClick: v
            }
          ) })
        ] }) })
      ]
    }
  );
}
function dl(e) {
  return e == null ? "—" : `${e > 0 ? "+" : (e < 0, "")}${ve(Math.abs(e))}`.replace(/^(\+|-)?/, e === 0 ? "" : e > 0 ? "+" : "-");
}
function cl(e) {
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
function pl(e, n) {
  if (!e) return n;
  const r = e.nodes.find((o) => o.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function ul(e, n) {
  if (!e) return !1;
  const r = e.nodes.find((o) => o.id === n);
  return !!r && r.data.type === "condition";
}
function Nn(e) {
  if (!e) return;
  const n = e.output;
  if (n && typeof n == "object" && "result" in n)
    return n.result ? "true" : "false";
}
function ml(e, n) {
  const r = (f) => f.split(/(\s+)/).filter((h) => h.length > 0), o = r(e), s = r(n), a = o.length, c = s.length, d = Array.from({ length: a + 1 }, () => new Array(c + 1).fill(0));
  for (let f = a - 1; f >= 0; f--)
    for (let h = c - 1; h >= 0; h--)
      o[f] === s[h] ? d[f][h] = d[f + 1][h + 1] + 1 : d[f][h] = Math.max(d[f + 1][h], d[f][h + 1]);
  const l = [], p = (f, h) => {
    const g = l[l.length - 1];
    g && g.type === f ? g.text += h : l.push({ type: f, text: h });
  };
  let m = 0, x = 0;
  for (; m < a && x < c; )
    o[m] === s[x] ? (p("eq", o[m]), m++, x++) : d[m + 1][x] >= d[m][x + 1] ? (p("del", o[m]), m++) : (p("add", s[x]), x++);
  for (; m < a; )
    p("del", o[m++]);
  for (; x < c; )
    p("add", s[x++]);
  return l;
}
function fl(e, n, r) {
  const o = /* @__PURE__ */ new Set(), s = [];
  if (r)
    for (const a of r.nodes)
      (e.steps[a.id] || n.steps[a.id]) && (s.push(a.id), o.add(a.id));
  for (const a of [...Object.keys(e.steps), ...Object.keys(n.steps)])
    o.has(a) || (s.push(a), o.add(a));
  return s.map((a) => {
    const c = e.steps[a], d = n.steps[a], l = c?.durationMs, p = d?.durationMs, m = l != null && p != null ? p - l : void 0, x = !!c && !!d && c.status !== d.status;
    let f = !1;
    l != null && p != null && l > 0 && (f = Math.abs(p - l) / l > 0.5);
    const h = ul(r, a), g = h ? Nn(c) : void 0, u = h ? Nn(d) : void 0, y = h && g !== void 0 && u !== void 0 && g !== u;
    return {
      nodeId: a,
      name: pl(r, a),
      a: c,
      b: d,
      durationDelta: m,
      statusDiffers: x,
      durationLarge: f,
      branchDiffers: y,
      isLlm: !!(c?.llm || d?.llm),
      isCondition: h,
      branchA: g,
      branchB: u
    };
  });
}
function hl(e) {
  if (e.statusDiffers) return "bg-[#fef2f2]";
  if (e.branchDiffers) return "bg-[#eff6ff]";
  if (e.durationLarge) return "bg-[#fffbeb]";
}
function wn({
  step: e,
  branch: n,
  isCondition: r
}) {
  if (!e)
    return /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" });
  const o = cl(e.status);
  return /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ t(ne, { tone: o, children: e.status }),
      /* @__PURE__ */ t("span", { className: "font-mono text-text-secondary", children: ve(e.durationMs) }),
      r && n ? /* @__PURE__ */ i("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        "(",
        n === "true" ? "T" : "F",
        ")"
      ] }) : null
    ] }),
    e.llm ? /* @__PURE__ */ i("div", { className: "font-mono text-[11px] text-text-tertiary", children: [
      e.llm.tokensIn,
      "→",
      e.llm.tokensOut,
      "tok"
    ] }) : null,
    e.error ? /* @__PURE__ */ t("div", { className: "text-[11px] text-[#dc2626]", title: e.error, children: e.error.length > 60 ? `${e.error.slice(0, 60)}…` : e.error }) : null
  ] });
}
function xl({ a: e, b: n }) {
  const r = _(() => ml(e, n), [e, n]);
  return /* @__PURE__ */ t(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: r.map((o, s) => o.type === "eq" ? /* @__PURE__ */ t("span", { children: o.text }, s) : o.type === "add" ? /* @__PURE__ */ t("span", { "data-diff": "add", className: "bg-[#dcfce7] text-[#166534]", children: o.text }, s) : /* @__PURE__ */ t("span", { "data-diff": "del", className: "bg-[#fee2e2] text-[#991b1b] line-through", children: o.text }, s))
    }
  );
}
function gl({ row: e }) {
  const n = e.a?.llm, r = e.b?.llm, o = n && r ? r.tokensIn + r.tokensOut - (n.tokensIn + n.tokensOut) : void 0, s = hl(e);
  return /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ i("tr", { "data-testid": `run-compare-row-${e.nodeId}`, className: s, children: [
      /* @__PURE__ */ i("td", { className: S("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", s), children: [
        /* @__PURE__ */ t("div", { className: "font-semibold text-text-primary", children: e.name }),
        /* @__PURE__ */ t("div", { className: "font-mono text-[11px] text-text-tertiary", children: e.nodeId })
      ] }),
      /* @__PURE__ */ t("td", { className: S("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", s), children: /* @__PURE__ */ t(wn, { step: e.a, branch: e.branchA, isCondition: e.isCondition }) }),
      /* @__PURE__ */ t("td", { className: S("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", s), children: /* @__PURE__ */ t(wn, { step: e.b, branch: e.branchB, isCondition: e.isCondition }) }),
      /* @__PURE__ */ i(
        "td",
        {
          className: S("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", s),
          "data-testid": `run-compare-delta-${e.nodeId}`,
          children: [
            e.branchDiffers ? /* @__PURE__ */ t("span", { className: "font-semibold text-[#2563eb]", children: "different branch!" }) : e.statusDiffers ? /* @__PURE__ */ t("span", { className: "font-semibold text-[#dc2626]", children: "status differs" }) : e.durationDelta != null ? /* @__PURE__ */ t("span", { className: e.durationLarge ? "text-[#d97706]" : "text-text-secondary", children: dl(e.durationDelta) }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "—" }),
            o != null && o !== 0 ? /* @__PURE__ */ i("div", { className: "mt-0.5 text-[11px] text-text-tertiary", children: [
              o > 0 ? "+" : "",
              o,
              "tok"
            ] }) : null
          ]
        }
      )
    ] }),
    e.isLlm && (n || r) ? /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t("td", { className: "border-b border-border p-0", colSpan: 4, children: /* @__PURE__ */ i("details", { className: "bg-surface-inset px-3.5 py-2.5", children: [
      /* @__PURE__ */ t(
        "summary",
        {
          className: "cursor-pointer text-xs font-semibold text-text-secondary",
          "data-testid": `run-compare-llm-toggle-${e.nodeId}`,
          children: "LLM response diff"
        }
      ),
      /* @__PURE__ */ i("div", { className: "mt-2 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ i("div", { children: [
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
        /* @__PURE__ */ i("div", { children: [
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
      /* @__PURE__ */ i("div", { className: "mt-2.5", children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Word-level diff" }),
        /* @__PURE__ */ t("div", { className: "mt-1.5", children: /* @__PURE__ */ t(
          xl,
          {
            a: n?.response ?? "",
            b: r?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function bl({ runA: e, runB: n, def: r }) {
  const o = _(() => fl(e, n, r), [e, n, r]);
  return /* @__PURE__ */ i(
    "table",
    {
      className: "w-full overflow-hidden rounded-lg border border-border bg-surface text-[13px]",
      "data-testid": "run-compare-table",
      children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ i("tr", { children: [
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Step" }),
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run A" }),
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run B" }),
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Δ" })
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: o.map((s) => /* @__PURE__ */ t(gl, { row: s }, s.nodeId)) })
      ]
    }
  );
}
function yl(e) {
  return e == null ? "—" : `${e > 0 ? "+" : (e < 0, "")}${ve(Math.abs(e))}`.replace(/^(\+|-)?/, e === 0 ? "" : e > 0 ? "+" : "-");
}
function vl(e) {
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
function Nl(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function kn(e, n) {
  const r = Object.values(e.steps).filter((o) => !!o.llm).map((o) => ({
    model: n.get(o.nodeId),
    tokensIn: o.llm?.tokensIn ?? 0,
    tokensOut: o.llm?.tokensOut ?? 0
  }));
  return ht(it(r).total);
}
function Cn({
  label: e,
  run: n,
  cost: r,
  testIdPrefix: o
}) {
  const s = vl(n.status);
  return /* @__PURE__ */ i(
    "div",
    {
      className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
      "data-testid": `${o}-summary`,
      children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: e }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-tertiary", children: n.id.slice(0, 8) }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "text-text-secondary", children: et(n.startedAt) })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t(ne, { tone: s, children: n.status }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono", children: ve(n.durationMs) }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono", "data-testid": `${o}-cost`, children: r })
        ] })
      ]
    }
  );
}
function Od() {
  const { pipelineId: e, runIdA: n, runIdB: r } = nt(), o = Me(), s = _(
    () => e ? Ye(e) : null,
    [e]
  ), a = _(
    () => e && n ? Nt(e, n) : null,
    [e, n]
  ), c = _(
    () => e && r ? Nt(e, r) : null,
    [e, r]
  ), d = _(() => Nl(s), [s]);
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
  if (!a || !c)
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
  const l = (c.durationMs ?? 0) - (a.durationMs ?? 0), p = kn(a, d), m = kn(c, d), x = (/* @__PURE__ */ new Set([
    ...Object.keys(a.steps),
    ...Object.keys(c.steps)
  ])).size;
  return /* @__PURE__ */ i("div", { className: "flex flex-col gap-4 p-6 text-text-primary", "data-testid": "run-compare", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ i(
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
      /* @__PURE__ */ i(
        "span",
        {
          className: "ml-auto text-xs text-text-tertiary",
          "data-testid": "run-compare-cost-delta",
          children: [
            p,
            " → ",
            m
          ]
        }
      )
    ] }),
    /* @__PURE__ */ i("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ t(Cn, { label: "Run A", run: a, cost: p, testIdPrefix: "run-a" }),
      /* @__PURE__ */ t(Cn, { label: "Run B", run: c, cost: m, testIdPrefix: "run-b" })
    ] }),
    /* @__PURE__ */ i(
      "div",
      {
        className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
        "data-testid": "run-compare-delta",
        children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Δ duration" }),
          /* @__PURE__ */ t("span", { className: "font-mono text-[13px]", children: yl(l) }),
          /* @__PURE__ */ t("span", { className: "flex-1" }),
          /* @__PURE__ */ i("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
            x,
            " step",
            x === 1 ? "" : "s",
            " compared"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ t(bl, { runA: a, runB: c, def: s })
  ] });
}
function wl(e) {
  return e === 0 ? "0ms" : `${e > 0 ? "+" : "-"}${ve(Math.abs(e))}`;
}
function In(e) {
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
function kl({
  runA: e,
  runB: n,
  costA: r,
  costB: o
}) {
  const s = e.durationMs ?? 0, c = (n.durationMs ?? 0) - s;
  return /* @__PURE__ */ i("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ i("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ i(
        "div",
        {
          className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
          "data-testid": "diff-run-a-summary",
          children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run A" }),
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-tertiary", children: e.id.slice(0, 8) }),
              /* @__PURE__ */ t(ne, { tone: In(e.status), children: e.status })
            ] }),
            /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary", children: et(e.startedAt) }),
            /* @__PURE__ */ i("div", { className: "font-mono text-xs", children: [
              ve(e.durationMs),
              " | ",
              r
            ] }),
            /* @__PURE__ */ i("div", { className: "text-[11px] text-text-tertiary", children: [
              "Trigger: ",
              e.triggeredBy.userId ?? e.triggeredBy.triggerType
            ] })
          ]
        }
      ),
      /* @__PURE__ */ i(
        "div",
        {
          className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
          "data-testid": "diff-run-b-summary",
          children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run B" }),
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-tertiary", children: n.id.slice(0, 8) }),
              /* @__PURE__ */ t(ne, { tone: In(n.status), children: n.status })
            ] }),
            /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary", children: et(n.startedAt) }),
            /* @__PURE__ */ i("div", { className: "font-mono text-xs", children: [
              ve(n.durationMs),
              " | ",
              o
            ] }),
            /* @__PURE__ */ i("div", { className: "text-[11px] text-text-tertiary", children: [
              "Trigger: ",
              n.triggeredBy.userId ?? n.triggeredBy.triggerType
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ i(
      "div",
      {
        className: "flex items-center gap-4 rounded-md bg-surface-inset px-3.5 py-2.5",
        "data-testid": "diff-duration-delta",
        children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Duration delta" }),
          /* @__PURE__ */ t(
            "span",
            {
              className: S(
                "font-mono text-sm font-bold",
                c === 0 ? "text-text-secondary" : c < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
              ),
              children: wl(c)
            }
          ),
          /* @__PURE__ */ i("span", { className: "text-[11px] text-text-tertiary", children: [
            "(",
            c < 0 ? "faster" : c > 0 ? "slower" : "same",
            " in Run B)"
          ] })
        ]
      }
    )
  ] });
}
function Cl(e) {
  return e === 0 ? "0ms" : `${e > 0 ? "+" : "-"}${ve(Math.abs(e))}`;
}
function Sn(e) {
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
function Il(e, n) {
  if (!e) return n;
  const r = e.nodes.find((o) => o.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Sl(e, n, r) {
  const o = /* @__PURE__ */ new Set(), s = [];
  if (r)
    for (const a of r.nodes)
      (e.steps[a.id] || n.steps[a.id]) && (s.push(a.id), o.add(a.id));
  for (const a of [...Object.keys(e.steps), ...Object.keys(n.steps)])
    o.has(a) || (s.push(a), o.add(a));
  return s.map((a) => {
    const c = e.steps[a], d = n.steps[a], l = c?.durationMs, p = d?.durationMs, m = l != null && p != null ? p - l : void 0, x = !!c && !!d && c.status !== d.status, f = !!c && !d, h = !c && !!d, g = c?.llm ? c.llm.tokensIn + c.llm.tokensOut : void 0, u = d?.llm ? d.llm.tokensIn + d.llm.tokensOut : void 0, y = g != null && u != null ? u - g : void 0;
    return {
      nodeId: a,
      name: Il(r, a),
      a: c,
      b: d,
      durationDelta: m,
      statusDiffers: x,
      onlyInA: f,
      onlyInB: h,
      tokenDelta: y
    };
  });
}
function Tl({ runA: e, runB: n, def: r }) {
  const o = _(() => Sl(e, n, r), [e, n, r]);
  return /* @__PURE__ */ i("table", { className: "w-full border-collapse text-[13px]", children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ i("tr", { children: [
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Step" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run A" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run B" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Delta" })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: o.map((s) => /* @__PURE__ */ i(
      "tr",
      {
        className: S(
          s.onlyInA || s.onlyInB ? "bg-[#fefce8]" : s.statusDiffers ? "bg-[#fef2f2]" : void 0
        ),
        "data-testid": `diff-step-row-${s.nodeId}`,
        children: [
          /* @__PURE__ */ i("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: [
            /* @__PURE__ */ t("div", { className: "font-semibold", children: s.name }),
            /* @__PURE__ */ t("div", { className: "font-mono text-[10px] text-text-tertiary", children: s.nodeId }),
            s.onlyInA && /* @__PURE__ */ t(ne, { tone: "warning", size: "xs", children: "only in A" }),
            s.onlyInB && /* @__PURE__ */ t(ne, { tone: "warning", size: "xs", children: "only in B" })
          ] }),
          /* @__PURE__ */ t("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: s.a ? /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ t(ne, { tone: Sn(s.a.status), children: s.a.status }),
            /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: ve(s.a.durationMs) }),
            s.a.llm && /* @__PURE__ */ i("span", { className: "text-[10px] text-text-tertiary", children: [
              s.a.llm.tokensIn,
              " in / ",
              s.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ t("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: s.b ? /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ t(ne, { tone: Sn(s.b.status), children: s.b.status }),
            /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: ve(s.b.durationMs) }),
            s.b.llm && /* @__PURE__ */ i("span", { className: "text-[10px] text-text-tertiary", children: [
              s.b.llm.tokensIn,
              " in / ",
              s.b.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ i("td", { className: "border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", children: [
            s.statusDiffers && /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-[#dc2626]", children: "status differs" }),
            s.durationDelta != null && /* @__PURE__ */ t(
              "div",
              {
                className: S(
                  "text-xs",
                  s.durationDelta === 0 ? "text-text-tertiary" : s.durationDelta < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
                ),
                children: Cl(s.durationDelta)
              }
            ),
            s.tokenDelta != null && s.tokenDelta !== 0 && /* @__PURE__ */ i(
              "div",
              {
                className: S(
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
function Al(e, n) {
  if (!e) return n;
  const r = e.nodes.find((o) => o.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function wt(e, n = "", r = 0) {
  const o = /* @__PURE__ */ new Map();
  if (r > 6 || e == null)
    return o.set(n || "(root)", String(e)), o;
  if (typeof e != "object")
    return o.set(n || "(root)", JSON.stringify(e)), o;
  if (Array.isArray(e)) {
    if (e.length === 0)
      o.set(n || "(root)", "[]");
    else
      for (let a = 0; a < e.length; a++) {
        const c = n ? `${n}.${a}` : String(a);
        for (const [d, l] of wt(e[a], c, r + 1))
          o.set(d, l);
      }
    return o;
  }
  const s = Object.entries(e);
  if (s.length === 0)
    o.set(n || "(root)", "{}");
  else
    for (const [a, c] of s) {
      const d = n ? `${n}.${a}` : a;
      for (const [l, p] of wt(c, d, r + 1))
        o.set(l, p);
    }
  return o;
}
function Xn(e, n) {
  const r = wt(e), o = wt(n), s = /* @__PURE__ */ new Set([...r.keys(), ...o.keys()]), a = [];
  for (const d of s) {
    const l = r.get(d), p = o.get(d);
    l === void 0 ? a.push({ key: d, type: "added", valueB: p }) : p === void 0 ? a.push({ key: d, type: "removed", valueA: l }) : l !== p ? a.push({ key: d, type: "changed", valueA: l, valueB: p }) : a.push({ key: d, type: "unchanged", valueA: l, valueB: p });
  }
  const c = {
    changed: 0,
    added: 1,
    removed: 2,
    unchanged: 3
  };
  return a.sort((d, l) => {
    const p = c[d.type] - c[l.type];
    return p !== 0 ? p : d.key.localeCompare(l.key);
  }), a;
}
const Rl = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function Dl({
  nodeId: e,
  name: n,
  outputA: r,
  outputB: o
}) {
  const [s, a] = D(!1), c = _(() => Xn(r, o), [r, o]), d = c.filter((l) => l.type !== "unchanged").length;
  return d === 0 ? /* @__PURE__ */ i("div", { className: "rounded-md bg-surface-inset px-3 py-2", children: [
    /* @__PURE__ */ t("span", { className: "text-xs font-semibold", children: n }),
    /* @__PURE__ */ t("span", { className: "ml-2 text-[11px] text-text-tertiary", children: "(no differences)" })
  ] }) : /* @__PURE__ */ i(
    "div",
    {
      className: "overflow-hidden rounded-md border border-border",
      "data-testid": `diff-output-${e}`,
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            className: "flex cursor-pointer items-center gap-2 bg-surface-inset px-3 py-2",
            onClick: () => a(!s),
            children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: s ? "▼" : "▶" }),
              /* @__PURE__ */ t("span", { className: "text-xs font-semibold", children: n }),
              /* @__PURE__ */ t("span", { className: "font-mono text-[10px] text-text-tertiary", children: e }),
              /* @__PURE__ */ i(ne, { tone: "warning", size: "xs", className: "ml-auto", children: [
                d,
                " difference",
                d === 1 ? "" : "s"
              ] })
            ]
          }
        ),
        s && /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5 px-3 py-2", children: c.filter((l) => l.type !== "unchanged").map((l, p) => /* @__PURE__ */ i(
          "div",
          {
            className: S(
              "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
              Rl[l.type]
            ),
            children: [
              /* @__PURE__ */ i("span", { className: "min-w-[120px] shrink-0 font-semibold", children: [
                l.type === "added" && "+ ",
                l.type === "removed" && "- ",
                l.type === "changed" && "~ ",
                l.key
              ] }),
              l.type === "changed" && /* @__PURE__ */ i("span", { children: [
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
function $l({ runA: e, runB: n, def: r }) {
  const o = _(() => {
    const s = /* @__PURE__ */ new Set(), a = [];
    if (r)
      for (const c of r.nodes) {
        const d = e.steps[c.id]?.output != null, l = n.steps[c.id]?.output != null;
        (d || l) && (a.push(c.id), s.add(c.id));
      }
    for (const c of [...Object.keys(e.steps), ...Object.keys(n.steps)]) {
      if (s.has(c)) continue;
      const d = e.steps[c]?.output != null, l = n.steps[c]?.output != null;
      (d || l) && (a.push(c), s.add(c));
    }
    return a;
  }, [e, n, r]);
  return o.length === 0 ? /* @__PURE__ */ t("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "No step outputs to compare." }) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-3", children: o.map((s) => /* @__PURE__ */ t(
    Dl,
    {
      nodeId: s,
      name: Al(r, s),
      outputA: e.steps[s]?.output,
      outputB: n.steps[s]?.output
    },
    s
  )) });
}
function Ml(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Tn(e, n) {
  const r = Object.values(e.steps).filter((o) => !!o.llm).map((o) => ({
    model: n.get(o.nodeId),
    tokensIn: o.llm?.tokensIn ?? 0,
    tokensOut: o.llm?.tokensOut ?? 0
  }));
  return ht(it(r).total);
}
function bt({
  title: e,
  defaultOpen: n = !0,
  badge: r,
  children: o,
  testId: s
}) {
  const [a, c] = D(n);
  return /* @__PURE__ */ i(
    "div",
    {
      className: "overflow-hidden rounded-lg border border-border bg-surface",
      "data-testid": s,
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            className: "flex cursor-pointer select-none items-center gap-2 border-b border-border bg-surface-inset px-4 py-3",
            onClick: () => c(!a),
            role: "button",
            tabIndex: 0,
            onKeyDown: (d) => {
              (d.key === "Enter" || d.key === " ") && (d.preventDefault(), c(!a));
            },
            "aria-expanded": a,
            children: [
              /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary", children: a ? "▼" : "▶" }),
              /* @__PURE__ */ t("span", { className: "text-[13px] font-bold text-text-primary", children: e }),
              r && /* @__PURE__ */ t(ne, { tone: "info", className: "ml-auto", children: r })
            ]
          }
        ),
        a && /* @__PURE__ */ t("div", { className: "p-4", children: o })
      ]
    }
  );
}
const Pl = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function El({
  runA: e,
  runB: n
}) {
  const r = _(
    () => Xn(e.context, n.context),
    [e.context, n.context]
  ), o = r.filter((s) => s.type !== "unchanged").length;
  return /* @__PURE__ */ t(
    bt,
    {
      title: "Context evolution diff",
      defaultOpen: !1,
      badge: o > 0 ? `${o} difference${o === 1 ? "" : "s"}` : void 0,
      testId: "diff-context-section",
      children: o === 0 ? /* @__PURE__ */ t("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "Final contexts are identical." }) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: r.map((s, a) => /* @__PURE__ */ i(
        "div",
        {
          className: S(
            "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
            Pl[s.type]
          ),
          children: [
            /* @__PURE__ */ i("span", { className: "min-w-[160px] shrink-0 font-semibold", children: [
              s.type === "added" && "+ ",
              s.type === "removed" && "- ",
              s.type === "changed" && "~ ",
              s.type === "unchanged" && "  ",
              s.key
            ] }),
            s.type === "changed" && /* @__PURE__ */ i("span", { children: [
              /* @__PURE__ */ t("span", { className: "line-through opacity-70", children: s.valueA }),
              " -> ",
              /* @__PURE__ */ t("span", { className: "font-semibold", children: s.valueB })
            ] }),
            s.type === "added" && /* @__PURE__ */ t("span", { children: s.valueB }),
            s.type === "removed" && /* @__PURE__ */ t("span", { children: s.valueA }),
            s.type === "unchanged" && /* @__PURE__ */ t("span", { className: "opacity-50", children: s.valueA })
          ]
        },
        `${s.key}-${a}`
      )) })
    }
  );
}
function Ol({ pipelineId: e, runIdA: n, runIdB: r }) {
  const o = Me(), s = _(
    () => Ye(e),
    [e]
  ), a = _(
    () => Nt(e, n),
    [e, n]
  ), c = _(
    () => Nt(e, r),
    [e, r]
  ), d = _(() => Ml(s), [s]);
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
  if (!a || !c)
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
  const l = Tn(a, d), p = Tn(c, d);
  return /* @__PURE__ */ i(
    "div",
    {
      className: "mx-auto flex w-full max-w-[1400px] flex-col gap-5 p-6 text-text-primary",
      "data-testid": "pipeline-run-diff",
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ i(
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
          /* @__PURE__ */ i("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
            n.slice(0, 8),
            " vs ",
            r.slice(0, 8)
          ] })
        ] }),
        /* @__PURE__ */ t(bt, { title: "Summary", testId: "diff-summary-section", children: /* @__PURE__ */ t(
          kl,
          {
            runA: a,
            runB: c,
            costA: l,
            costB: p
          }
        ) }),
        /* @__PURE__ */ t(
          bt,
          {
            title: "Step-by-step comparison",
            badge: `${Object.keys(a.steps).length + Object.keys(c.steps).length > 0 ? "steps" : "0 steps"}`,
            testId: "diff-steps-section",
            children: /* @__PURE__ */ t(Tl, { runA: a, runB: c, def: s })
          }
        ),
        /* @__PURE__ */ t(
          bt,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ t($l, { runA: a, runB: c, def: s })
          }
        ),
        /* @__PURE__ */ t(El, { runA: a, runB: c })
      ]
    }
  );
}
function Ld() {
  const { pipelineId: e } = nt(), [n] = kt(), r = n.get("a"), o = n.get("b");
  return !e || !r || !o ? /* @__PURE__ */ t(rt, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t(Ol, { pipelineId: e, runIdA: r, runIdB: o });
}
function _d() {
  const e = Me(), [n, r] = kt(), [o, s] = D([]), { runs: a } = st();
  J(() => {
    let v = !1;
    return (async () => {
      const C = Gt(), b = [];
      await Promise.all(
        C.map(async (w) => {
          try {
            const { runs: k } = await Mn(w.id, { limit: 50 });
            if (k.length > 0) {
              for (const R of k)
                R.id && b.push({ ...R, pipelineName: w.name });
              return;
            }
          } catch {
          }
          for (const k of vt(w.id))
            k.id && b.push({ ...k, pipelineName: w.name });
        })
      ), !v && (b.sort((w, k) => k.startedAt.localeCompare(w.startedAt)), s(b));
    })(), () => {
      v = !0;
    };
  }, []);
  const c = _(() => {
    const v = new Map(Gt().map((w) => [w.id, w.name])), C = new Set(o.map((w) => w.id)), b = [];
    for (const [w, k] of Object.entries(a))
      C.has(w) || k.pipelineId && b.push({
        ...k,
        pipelineName: v.get(k.pipelineId) ?? `Pipeline ${k.pipelineId.slice(0, 8)}`
      });
    return b.length === 0 ? o : [...b, ...o].sort((w, k) => k.startedAt.localeCompare(w.startedAt));
  }, [o, a]), { query: d, statuses: l, triggerKinds: p, range: m } = _(
    () => Gn(n),
    [n]
  ), x = (v, C) => {
    const b = new URLSearchParams(n);
    C ? b.set(v, C) : b.delete(v), r(b, { replace: !0 });
  }, f = (v) => {
    const C = new Set(l);
    C.has(v) ? C.delete(v) : C.add(v), x("status", C.size === 0 ? null : Array.from(C).join(","));
  }, h = (v) => {
    const C = new Set(p);
    C.has(v) ? C.delete(v) : C.add(v), x("trigger", C.size === 0 ? null : Array.from(C).join(","));
  }, g = (v) => {
    x("range", v === "7d" ? null : v);
  }, u = (v) => {
    x("q", v.length === 0 ? null : v);
  }, y = _(
    () => Jn(c, { query: d, statuses: l, triggerKinds: p, range: m }),
    [c, d, l, p, m]
  ), N = _(() => {
    const v = {};
    for (const C of y) {
      const b = Object.values(C.steps).filter((k) => !!k.llm).map((k) => ({
        model: void 0,
        tokensIn: k.llm?.tokensIn ?? 0,
        tokensOut: k.llm?.tokensOut ?? 0
      })), w = it(b);
      w.total.totalCostUsd > 0 && (v[C.id] = ht(w.total));
    }
    return v;
  }, [y]);
  return /* @__PURE__ */ i("div", { "data-testid": "all-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ t("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Runs" }),
      /* @__PURE__ */ i("span", { className: "text-[13px] text-text-tertiary", children: [
        y.length,
        " run",
        y.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ t(
      Yn,
      {
        query: d,
        onQueryChange: u,
        statuses: l,
        onStatusToggle: f,
        triggerKinds: p,
        onTriggerToggle: h,
        range: m,
        onRangeChange: g,
        onClearFilters: () => r(new URLSearchParams(), { replace: !0 })
      }
    ),
    y.length === 0 ? /* @__PURE__ */ t(
      Oe,
      {
        icon: "📋",
        title: "No runs yet",
        body: "Run a pipeline to see execution history here."
      }
    ) : /* @__PURE__ */ t("div", { className: "overflow-x-auto", children: /* @__PURE__ */ i("table", { className: "w-full border-collapse text-[13px]", children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ i("tr", { className: "border-b border-border", children: [
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Pipeline" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Run ID" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Status" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Trigger" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Started" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right", children: "Duration" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right", children: "Cost" })
      ] }) }),
      /* @__PURE__ */ t("tbody", { children: y.map((v) => /* @__PURE__ */ i(
        "tr",
        {
          onClick: () => e(`/pipelines/${v.pipelineId}/runs/${v.id}`),
          className: "border-b border-border cursor-pointer hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-medium", children: v.pipelineName }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: v.id.slice(0, 11) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ t(ne, { tone: Ht(v.status).tone, size: "sm", children: v.status }) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: v.triggerType ?? v.triggeredBy?.triggerType }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: Ti(v.startedAt) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: v.completedAt ? ve(new Date(v.completedAt).getTime() - new Date(v.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: N[v.id] ?? "—" })
          ]
        },
        v.id
      )) })
    ] }) })
  ] });
}
function Qn(e) {
  let n = 0, r = 0;
  for (const o of Object.values(e.steps ?? {}))
    o.llm && (n += o.llm.tokensIn ?? 0, r += o.llm.tokensOut ?? 0);
  return { tokensIn: n, tokensOut: r };
}
function Ll(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function _l(e, n) {
  const r = [];
  for (const o of Object.values(e.steps ?? {}))
    o.llm && r.push({
      model: n.get(o.nodeId),
      tokensIn: o.llm.tokensIn,
      tokensOut: o.llm.tokensOut
    });
  return it(r).total.totalCostUsd;
}
function An(e, n) {
  if (e.length === 0) return 0;
  const r = Math.min(e.length - 1, Math.floor(e.length * n));
  return e[r];
}
function Rn(e) {
  return e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Dn(e) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? `$${n.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function Ul(e) {
  return e.slice(0, 8);
}
function Bl(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function jl(e, n) {
  const r = e.length;
  let o = 0, s = 0, a = 0;
  const c = [];
  let d = 0, l = 0, p = 0;
  const m = /* @__PURE__ */ new Map();
  for (const u of e) {
    u.status === "completed" ? o++ : u.status === "failed" ? s++ : u.status === "cancelled" && a++, typeof u.durationMs == "number" && u.durationMs > 0 && c.push(u.durationMs);
    const y = Qn(u);
    if (d += y.tokensIn, l += y.tokensOut, p += _l(u, n), u.error?.message) {
      const N = u.error.message.slice(0, 48), v = m.get(N);
      v ? (v.count += 1, u.startedAt > v.lastSeenAt && (v.lastSeenAt = u.startedAt, v.exampleRunId = u.id)) : m.set(N, { count: 1, lastSeenAt: u.startedAt, exampleRunId: u.id });
    }
  }
  c.sort((u, y) => u - y);
  const x = An(c, 0.5), f = An(c, 0.95), h = r === 0 ? 0 : Math.round(o / r * 100), g = [...m.entries()].map(([u, y]) => ({ key: u, count: y.count, lastSeenAt: y.lastSeenAt, exampleRunId: y.exampleRunId })).sort((u, y) => y.count - u.count).slice(0, 5);
  return {
    totalCount: r,
    completedCount: o,
    failedCount: s,
    cancelledCount: a,
    successRatePct: h,
    medianMs: x,
    p95Ms: f,
    tokensIn: d,
    tokensOut: l,
    tokensPerRun: r === 0 ? 0 : Math.round((d + l) / r),
    totalCost: p,
    costPerRun: r === 0 ? 0 : p / r,
    failureBreakdown: g
  };
}
function Fl(e) {
  return e >= 90 ? "#16a34a" : e >= 70 ? "#f59e0b" : "#dc2626";
}
function zl(e) {
  const n = [...e].sort((l, p) => l.startedAt.localeCompare(p.startedAt)), r = [], o = [], s = [];
  let a = 0, c = 0, d = 0;
  for (const l of n) {
    const p = new Date(l.startedAt).getTime();
    l.status === "completed" ? a += 1 : l.status === "failed" ? c += 1 : l.status === "cancelled" && (d += 1), r.push({ x: p, y: a }), o.push({ x: p, y: c }), s.push({ x: p, y: d });
  }
  return [
    { label: "Completed", data: r, color: "#16a34a" },
    { label: "Failed", data: o, color: "#dc2626" },
    { label: "Cancelled", data: s, color: "#d1d5db" }
  ];
}
function ql(e, n) {
  const o = [...e].sort((a, c) => a.startedAt.localeCompare(c.startedAt)).filter((a) => typeof a.durationMs == "number" && a.durationMs > 0).map((a) => ({ x: new Date(a.startedAt).getTime(), y: a.durationMs })), s = o.map((a) => ({ x: a.x, y: n }));
  return [
    { label: "Duration (ms)", data: o, color: "#646cff" },
    { label: "p50", data: s, color: "#94a3b8" }
  ];
}
function Hl(e) {
  const n = [...e].sort((s, a) => s.startedAt.localeCompare(a.startedAt)), r = [], o = [];
  for (const s of n) {
    const a = new Date(s.startedAt).getTime(), { tokensIn: c, tokensOut: d } = Qn(s);
    r.push({ x: a, y: c }), o.push({ x: a, y: d });
  }
  return [
    { label: "Tokens in", data: r, color: "#646cff" },
    { label: "Tokens out", data: o, color: "#16a34a" }
  ];
}
function Ud() {
  const { pipelineId: e } = nt(), n = Me(), [r, o] = D(null), [s, a] = D([]), [c, d] = D("50");
  J(() => {
    e && (o(Ye(e)), a(vt(e)));
  }, [e]);
  const l = _(() => {
    if (c === "all") return s;
    const u = Number(c);
    return s.slice(0, u);
  }, [s, c]), p = _(() => Ll(r), [r]), m = _(() => jl(l, p), [l, p]), x = _(
    () => Ta(l, r).filter((u) => u.totalCostUsd > 0 || u.stepCount > 0),
    [l, r]
  ), f = _(() => Da(s, r, 30), [s, r]), h = _(
    () => [
      {
        label: "Daily spend",
        data: f.map((u) => ({ x: u.ts, y: u.totalCostUsd })),
        color: "#646cff"
      }
    ],
    [f]
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
  return /* @__PURE__ */ i("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ i(
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
              className: S(
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
    g ? /* @__PURE__ */ i(G, { children: [
      /* @__PURE__ */ i(
        "div",
        {
          className: "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3",
          "data-testid": "stats-kpis",
          children: [
            /* @__PURE__ */ i("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Success rate" }),
              /* @__PURE__ */ i(
                "div",
                {
                  className: "text-[22px] font-bold font-mono",
                  style: { color: Fl(m.successRatePct) },
                  "data-testid": "stats-success-rate",
                  children: [
                    m.completedCount,
                    "/",
                    m.totalCount,
                    " (",
                    m.successRatePct,
                    "%)"
                  ]
                }
              ),
              /* @__PURE__ */ i("div", { className: "text-xs text-text-tertiary font-mono", children: [
                m.failedCount,
                " failed · ",
                m.cancelledCount,
                " cancelled"
              ] })
            ] }),
            /* @__PURE__ */ i("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Median duration" }),
              /* @__PURE__ */ t("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: ve(m.medianMs) }),
              /* @__PURE__ */ i("div", { className: "text-xs text-text-tertiary font-mono", children: [
                "p95 · ",
                ve(m.p95Ms)
              ] })
            ] }),
            /* @__PURE__ */ i("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Total tokens" }),
              /* @__PURE__ */ i("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: [
                m.tokensIn.toLocaleString(),
                " → ",
                m.tokensOut.toLocaleString()
              ] }),
              /* @__PURE__ */ i("div", { className: "text-xs text-text-tertiary font-mono", children: [
                m.tokensPerRun.toLocaleString(),
                " avg per run"
              ] })
            ] }),
            /* @__PURE__ */ i("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Total cost" }),
              /* @__PURE__ */ t("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: Rn(m.totalCost) }),
              /* @__PURE__ */ i("div", { className: "text-xs text-text-tertiary font-mono", children: [
                Rn(m.costPerRun),
                " avg per run"
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ i(
        "div",
        {
          className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3",
          "data-testid": "stats-cost-row",
          children: [
            /* @__PURE__ */ i("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-by-node", children: [
              /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Cost by node" }),
              x.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary py-2", children: "No per-node cost data in this range." }) : /* @__PURE__ */ t(
                Er,
                {
                  data: x.map((u) => ({
                    label: u.label,
                    cost: Number(u.totalCostUsd.toFixed(6))
                  })),
                  xKey: "label",
                  yKey: "cost",
                  height: 200,
                  color: "#646cff",
                  yFormat: Dn
                }
              )
            ] }),
            /* @__PURE__ */ i("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-trend-30d", children: [
              /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "30-day spend trend" }),
              /* @__PURE__ */ t(
                gt,
                {
                  series: h,
                  height: 200,
                  xFormat: (u) => new Date(Number(u)).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric"
                  }),
                  yFormat: Dn
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ i("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3", children: [
        /* @__PURE__ */ i("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Runs over time (cumulative)" }),
          /* @__PURE__ */ t(
            gt,
            {
              series: zl(l),
              height: 180,
              xFormat: (u) => new Date(Number(u)).toLocaleDateString()
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Duration over time" }),
          /* @__PURE__ */ t(
            gt,
            {
              series: ql(l, m.medianMs),
              height: 180,
              xFormat: (u) => new Date(Number(u)).toLocaleDateString(),
              yFormat: (u) => ve(u)
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Token usage over time" }),
          /* @__PURE__ */ t(
            gt,
            {
              series: Hl(l),
              height: 180,
              xFormat: (u) => new Date(Number(u)).toLocaleDateString(),
              yFormat: (u) => u.toLocaleString()
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-failure-breakdown", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Failure breakdown (top 5)" }),
          m.failureBreakdown.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary py-2", children: "No failures in this range." }) : /* @__PURE__ */ i("table", { className: "w-full border-collapse text-xs", children: [
            /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: "text-left", children: ["Error", "Count", "Last seen", "Example"].map((u) => /* @__PURE__ */ t(
              "th",
              {
                className: "px-2 py-1.5 text-[10px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
                children: u
              },
              u
            )) }) }),
            /* @__PURE__ */ t("tbody", { children: m.failureBreakdown.map((u) => /* @__PURE__ */ i("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ t(
                "td",
                {
                  className: "px-2 py-1.5 text-text-primary max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap",
                  title: u.key,
                  children: u.key
                }
              ),
              /* @__PURE__ */ t("td", { className: "px-2 py-1.5 font-mono text-text-primary", children: u.count }),
              /* @__PURE__ */ t("td", { className: "px-2 py-1.5 text-text-secondary", children: Bl(u.lastSeenAt) }),
              /* @__PURE__ */ t("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ i(
                "button",
                {
                  type: "button",
                  onClick: () => n(`/pipelines/${e}/runs/${u.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    Ul(u.exampleRunId),
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
function Kl(e) {
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
function Wl(e) {
  return e.length <= 6 ? e : e.slice(-6);
}
function Vl({ approver: e, idx: n }) {
  const r = e.type === "role" ? "🎖" : "👤";
  return /* @__PURE__ */ i(
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
function Jl(e, n) {
  const r = [];
  if (e) {
    const o = e.steps;
    for (const [s, a] of Object.entries(e))
      s === "steps" || a == null || a === "" || (typeof a == "string" ? r.push({ label: s, value: a }) : typeof a == "object" && r.push({ label: s, value: JSON.stringify(a, null, 2) }));
    if (o && typeof o == "object")
      for (const [s, a] of Object.entries(o)) {
        if (a == null) continue;
        const c = a;
        typeof c.response == "string" && c.response.trim() && r.push({ label: `Step ${s.slice(0, 8)} response`, value: c.response });
      }
  }
  if (r.length === 0 && n)
    for (const [o, s] of Object.entries(n)) {
      const a = s.output;
      if (a)
        for (const [c, d] of Object.entries(a))
          d == null || d === "" || c === "tokensIn" || c === "tokensOut" || typeof d == "string" && d.trim() && r.push({ label: c, value: d });
    }
  return r;
}
function Gl({ row: e, onSubmit: n, onOpenPipeline: r }) {
  const [o, s] = D(""), a = P(
    (p) => {
      n(p, o.trim()), s("");
    },
    [o, n]
  ), c = e.requiredCount ?? 1, d = e.recordedCount ?? 0, l = _(() => Jl(e.runContext, e.runSteps), [e.runContext, e.runSteps]);
  return /* @__PURE__ */ i("div", { "data-testid": `approval-card-${e.runId}`, className: "flex flex-col gap-3 p-4 bg-surface border border-border rounded-[10px]", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 min-w-0", children: [
        /* @__PURE__ */ t("span", { className: "text-lg", "aria-hidden": !0, children: "✋" }),
        /* @__PURE__ */ i("div", { className: "min-w-0", children: [
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
          /* @__PURE__ */ i("div", { className: "font-mono text-[11px] text-text-tertiary", children: [
            "run #",
            Wl(e.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: Kl(e.requestedAt) })
    ] }),
    e.message ? /* @__PURE__ */ t("div", { "data-testid": `approval-message-${e.runId}`, className: "text-[13px] text-text-secondary bg-[#fafbfc] px-3 py-2 rounded-md leading-normal", children: e.message }) : null,
    /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5 px-3 py-2.5 bg-[#fafbfc] rounded-md border border-border", children: [
      /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: l.length > 0 ? "Context" : "Run details" }),
      l.length > 0 ? l.map(({ label: p, value: m }) => /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: p }),
        /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: m })
      ] }, p)) : /* @__PURE__ */ i(G, { children: [
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: "Run" }),
          /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: e.runId })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: "Step" }),
          /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: e.stepId })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: "Status" }),
          /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: "Awaiting your approval — upstream steps haven't produced reviewable output yet (or this approval node runs in parallel with them)." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1.5 items-center", children: [
      /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Approvers:" }),
      e.approvers.length === 0 ? /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : e.approvers.map((p, m) => /* @__PURE__ */ t(Vl, { approver: p, idx: m }, m)),
      c > 1 ? /* @__PURE__ */ i("span", { className: "text-[11px] text-text-tertiary ml-1", children: [
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
    /* @__PURE__ */ i("div", { className: "flex gap-2 justify-end", children: [
      /* @__PURE__ */ t("button", { "data-testid": `reject-${e.runId}`, onClick: () => a("reject"), className: "px-3.5 py-1.5 text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-md font-[inherit] cursor-pointer", children: "Reject" }),
      /* @__PURE__ */ t("button", { "data-testid": `approve-${e.runId}`, onClick: () => a("approve"), className: "px-3.5 py-1.5 text-[13px] font-semibold bg-[#16a34a] text-white border-none rounded-md font-[inherit] cursor-pointer shrink-0", children: "Approve" })
    ] })
  ] });
}
function Bd() {
  const e = Me(), { approvals: n, isLoading: r, error: o, retry: s } = xr(), { resolveApproval: a, runs: c } = st(), [d, l] = D(
    () => /* @__PURE__ */ new Set()
  );
  J(() => {
    if (d.size === 0) return;
    const u = new Set(n.map((v) => `${v.runId}::${v.stepId}`));
    let y = !1;
    const N = new Set(d);
    for (const v of d)
      u.has(v) || (N.delete(v), y = !0);
    y && l(N);
  }, [n, d]);
  const [p, m] = D({}), x = re(/* @__PURE__ */ new Set());
  J(() => {
    for (const u of n)
      x.current.has(u.runId) || (x.current.add(u.runId), gr(u.pipelineId, u.runId).then((y) => {
        y && m((N) => ({
          ...N,
          [u.runId]: { context: y.context, steps: y.steps }
        }));
      }));
  }, [n]);
  const f = _(() => {
    const u = /* @__PURE__ */ new Map(), y = [];
    for (const N of n) {
      const v = `${N.runId}::${N.stepId}`;
      if (d.has(v)) continue;
      let C = u.get(N.pipelineId);
      C === void 0 && (C = Ye(N.pipelineId), u.set(N.pipelineId, C));
      const b = C?.name ?? (N.pipelineId ? `Pipeline ${N.pipelineId.slice(0, 8)}` : "Unknown pipeline"), w = p[N.runId]?.context ?? c[N.runId]?.context, k = p[N.runId]?.steps;
      y.push({ ...N, pipelineName: b, runContext: w, runSteps: k });
    }
    return y;
  }, [n, d, c, p]), h = P(
    (u, y, N, v, C) => {
      a(y, N, v, C || void 0), l((b) => {
        const w = new Set(b);
        return w.add(`${y}::${N}`), w;
      }), fetch(`/api/pipelines/${encodeURIComponent(y)}/approvals`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stepId: N, decision: v, ...C ? { comment: C } : {} })
      }).catch((b) => {
        console.error("[approvals] POST failed", b);
      }), e(`/pipelines/${u}/runs/${y}`);
    },
    [a, e]
  ), g = f.length;
  return /* @__PURE__ */ i("div", { "data-testid": "pending-approvals-page", className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-[inherit]", children: [
    /* @__PURE__ */ t("div", { className: "h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ t("div", { className: "text-lg font-bold text-text-primary", children: "Pending approvals" }),
      /* @__PURE__ */ t(ne, { "data-testid": "pending-count", tone: g > 0 ? "warning" : "neutral", size: "sm", children: g })
    ] }) }),
    /* @__PURE__ */ i("div", { className: "flex-1 overflow-y-auto p-5", children: [
      o ? /* @__PURE__ */ i("div", { "data-testid": "approvals-error", role: "alert", className: "px-4 py-3 bg-[#fef2f2] border border-[#dc2626] text-[#dc2626] rounded-lg flex items-center justify-between gap-3 mb-4", children: [
        /* @__PURE__ */ t("span", { className: "text-[13px] font-medium", children: "Couldn't load pending approvals. Try again." }),
        /* @__PURE__ */ t("button", { "data-testid": "approvals-retry", onClick: s, className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[#dc2626] border border-[#dc2626] rounded-md cursor-pointer font-[inherit]", children: "Retry" })
      ] }) : null,
      r && g === 0 ? /* @__PURE__ */ i("div", { "data-testid": "approvals-loading", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: [
        /* @__PURE__ */ t(It, { height: 140 }),
        /* @__PURE__ */ t(It, { height: 140 }),
        /* @__PURE__ */ t(It, { height: 140 })
      ] }) : g === 0 && !o ? /* @__PURE__ */ t(
        Oe,
        {
          icon: "✋",
          title: "No pending approvals",
          body: "When a pipeline reaches an approval step, it'll show up here.",
          testId: "approvals-empty"
        }
      ) : /* @__PURE__ */ t("div", { "data-testid": "approvals-list", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: f.map((u) => /* @__PURE__ */ t(
        Gl,
        {
          row: u,
          onOpenPipeline: () => e(`/pipelines/${u.pipelineId}`),
          onSubmit: (y, N) => h(u.pipelineId, u.runId, u.stepId, y, N)
        },
        `${u.runId}:${u.stepId}`
      )) })
    ] })
  ] });
}
function Yl({ result: e, className: n }) {
  const { caption: r, setting: o, location: s, timeOfDay: a, mood: c, colors: d } = e;
  return !r && !o && !s && !a && !c && (!d || d.length === 0) ? null : /* @__PURE__ */ i("section", { className: S("flex flex-col gap-2", n), children: [
    r ? /* @__PURE__ */ t("p", { className: "text-base leading-relaxed text-text-primary", children: r }) : null,
    /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1.5", children: [
      o ? /* @__PURE__ */ i(ne, { tone: "neutral", size: "sm", title: "Scene setting", children: [
        "setting: ",
        o
      ] }) : null,
      s ? /* @__PURE__ */ i(ne, { tone: "neutral", size: "sm", title: "Location", children: [
        "loc: ",
        s
      ] }) : null,
      a ? /* @__PURE__ */ i(ne, { tone: "neutral", size: "sm", title: "Time of day", children: [
        "tod: ",
        a
      ] }) : null,
      c ? /* @__PURE__ */ i(ne, { tone: "info", size: "sm", title: "Mood", children: [
        "mood: ",
        c
      ] }) : null,
      (d ?? []).map((l) => /* @__PURE__ */ i(
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
function Xl({
  imageUrl: e,
  imageDataUrl: n,
  imageWidth: r,
  imageHeight: o,
  people: s,
  objects: a,
  show: c = "both",
  onSelectPerson: d,
  onSelectObject: l,
  className: p,
  alt: m
}) {
  const x = n ?? e, [f, h] = D(null), g = re(null), u = P(() => {
    const v = g.current;
    v && (!r || !o) && h({ w: v.naturalWidth, h: v.naturalHeight });
  }, [r, o]), y = _(() => r && o && r > 0 && o > 0 ? { w: r, h: o } : f && f.w > 0 && f.h > 0 ? f : null, [r, o, f]), N = (v, C, b, w, k) => {
    if (!y) return null;
    const R = Math.max(0, Math.min(v.x1, y.w)), I = Math.max(0, Math.min(v.y1, y.h)), A = Math.max(0, Math.min(v.x2, y.w)), $ = Math.max(0, Math.min(v.y2, y.h));
    if (!Number.isFinite(R) || !Number.isFinite(I) || !Number.isFinite(A) || !Number.isFinite($) || A <= R || $ <= I) return null;
    const q = R / y.w * 100, V = I / y.h * 100, Q = (A - R) / y.w * 100, ae = ($ - I) / y.h * 100, le = b === "people" ? { stroke: "#4f46e5", fill: "rgba(79,70,229,0.10)", text: "bg-indigo-600 text-white" } : { stroke: "#d97706", fill: "rgba(217,119,6,0.10)", text: "bg-amber-600 text-white" };
    return /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: w,
        title: C,
        "aria-label": `${b === "people" ? "Person" : "Object"} bounding box: ${C}`,
        className: "group absolute m-0 cursor-pointer border-0 p-0 outline-none focus:ring-2 focus:ring-offset-1",
        style: {
          left: `${q}%`,
          top: `${V}%`,
          width: `${Q}%`,
          height: `${ae}%`,
          background: le.fill,
          border: `2px solid ${le.stroke}`,
          borderRadius: "2px"
        },
        children: /* @__PURE__ */ t(
          "span",
          {
            className: S(
              "pointer-events-none absolute -top-5 left-0 inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold leading-none shadow",
              le.text
            ),
            children: C
          }
        )
      },
      k
    );
  };
  return x ? /* @__PURE__ */ i(
    "div",
    {
      className: S(
        "relative w-full overflow-hidden rounded-lg border border-border bg-black/5",
        p
      ),
      children: [
        /* @__PURE__ */ t(
          "img",
          {
            ref: g,
            src: x,
            alt: m ?? "",
            onLoad: u,
            className: "block h-auto w-full object-contain",
            draggable: !1
          }
        ),
        y ? /* @__PURE__ */ t("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ i("div", { className: "pointer-events-auto absolute inset-0", children: [
          (c === "people" || c === "both") && (s ?? []).map(
            (v) => N(
              v.bbox,
              `#${v.index}${v.activity ? " · " + v.activity.replace(/^::\s*/, "") : ""}`,
              "people",
              d ? () => d(v) : void 0,
              `p-${v.index}`
            )
          ),
          (c === "objects" || c === "both") && (a ?? []).map(
            (v, C) => N(
              v.bbox,
              v.label,
              "object",
              l ? () => l(v) : void 0,
              `o-${C}-${v.label}`
            )
          )
        ] }) }) : null
      ]
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: S(
        "flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-border-emphasis bg-surface-panel text-xs text-text-tertiary",
        p
      ),
      children: "(no image)"
    }
  );
}
function Ql(e) {
  return {
    imageUrl: e.imageUrl,
    imageDataUrl: e.imageDataUrl,
    imageWidth: e.imageWidth,
    imageHeight: e.imageHeight,
    people: e.people,
    objects: e.objects
  };
}
function Zl({ people: e, highlightedIndex: n, onSelect: r, className: o }) {
  return !e || e.length === 0 ? null : /* @__PURE__ */ i("section", { className: S("flex flex-col gap-1.5", o), children: [
    /* @__PURE__ */ i("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "People (",
      e.length,
      ")"
    ] }),
    /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1.5", children: e.map((s) => {
      const a = n === s.index, c = s.activity?.replace(/^::\s*/, ""), d = S(
        "group flex w-full flex-col gap-1 rounded-lg border px-2.5 py-2 text-left text-sm transition-colors",
        a ? "border-indigo-400 bg-indigo-50/70 ring-1 ring-indigo-300" : "border-border bg-surface hover:bg-surface-hover"
      ), l = /* @__PURE__ */ i(G, { children: [
        /* @__PURE__ */ i("div", { className: "flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": !0,
              className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold leading-none text-white",
              children: s.index
            }
          ),
          s.ageBucket ? /* @__PURE__ */ t(ne, { tone: "neutral", size: "sm", children: s.ageBucket.replace("_", " ") }) : null,
          s.gender ? /* @__PURE__ */ t(ne, { tone: "neutral", size: "sm", children: s.gender }) : null,
          s.faceOrientation ? /* @__PURE__ */ t(ne, { tone: "neutral", size: "sm", title: "Face orientation", children: s.faceOrientation }) : null,
          s.expression ? /* @__PURE__ */ t(ne, { tone: "info", size: "sm", children: s.expression }) : null
        ] }),
        c ? /* @__PURE__ */ i("div", { className: "text-[13px] text-text-primary", children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "activity:" }),
          " ",
          c
        ] }) : null,
        s.clothing ? /* @__PURE__ */ i("div", { className: "text-[12px] text-text-secondary", children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "wearing:" }),
          " ",
          s.clothing
        ] }) : null
      ] });
      return r ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => r(s),
          className: S(
            d,
            "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          ),
          "aria-pressed": a,
          children: l
        }
      ) }, s.index) : /* @__PURE__ */ t("li", { className: d, children: l }, s.index);
    }) })
  ] });
}
function ed({ objects: e, onSelect: n, className: r }) {
  return !e || e.length === 0 ? null : /* @__PURE__ */ i("section", { className: S("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ i("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Objects (",
      e.length,
      ")"
    ] }),
    /* @__PURE__ */ t("ul", { className: "grid grid-cols-1 gap-1 sm:grid-cols-2", children: e.map((o, s) => {
      const a = S(
        "flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 text-left text-[13px]"
      ), c = /* @__PURE__ */ i(G, { children: [
        /* @__PURE__ */ t("span", { className: "truncate font-medium text-text-primary", children: o.label }),
        /* @__PURE__ */ i("span", { className: "shrink-0 font-mono text-[10px] text-text-tertiary", children: [
          "[",
          o.bbox.x1,
          ",",
          o.bbox.y1,
          ",",
          o.bbox.x2,
          ",",
          o.bbox.y2,
          "]"
        ] })
      ] });
      return n ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => n(o),
          className: S(
            a,
            "cursor-pointer hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          ),
          children: c
        }
      ) }, `${o.label}-${s}`) : /* @__PURE__ */ t("li", { className: a, children: c }, `${o.label}-${s}`);
    }) })
  ] });
}
function td({ tags: e, onTagClick: n, className: r }) {
  return !e || e.length === 0 ? null : /* @__PURE__ */ i("section", { className: S("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ t("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Tags" }),
    /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5", children: e.map(
      (o) => n ? /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => n(o),
          title: `Filter by ${o}`,
          "aria-label": `Filter by ${o}`,
          className: "appearance-none border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded-full",
          children: /* @__PURE__ */ i(ne, { tone: "info", size: "sm", children: [
            "#",
            o
          ] })
        },
        o
      ) : /* @__PURE__ */ i(ne, { tone: "info", size: "sm", children: [
        "#",
        o
      ] }, o)
    ) })
  ] });
}
function yt(e) {
  return e ? e === "correct" || e === "neutral" || e === "normal" ? "success" : "warning" : "neutral";
}
function Mt(e) {
  const n = yt(e);
  return n === "success" ? `OK · ${e}` : n === "warning" ? `ADJUST · ${e}` : e ?? "";
}
function nd({
  exposure: e,
  whiteBalance: n,
  contrast: r,
  composition: o,
  edits: s,
  onApplyEdit: a,
  className: c
}) {
  const d = e || n || r || o, l = (s ?? []).length > 0;
  return !d && !l ? null : /* @__PURE__ */ i("section", { className: S("flex flex-col gap-2", c), children: [
    /* @__PURE__ */ t("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Edits & Quality" }),
    d ? /* @__PURE__ */ i("div", { className: "grid grid-cols-1 gap-1.5 sm:grid-cols-2", children: [
      e ? /* @__PURE__ */ i("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-text-tertiary", children: "EXPOSURE" }),
          /* @__PURE__ */ t(ne, { tone: yt(e.verdict), size: "sm", children: Mt(e.verdict) }),
          e.evAdjustment !== 0 ? /* @__PURE__ */ i("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
            e.evAdjustment > 0 ? "+" : "",
            e.evAdjustment.toFixed(1),
            " EV"
          ] }) : null
        ] }),
        /* @__PURE__ */ t("p", { className: "mt-1 text-[12px] text-text-primary", children: e.rationale })
      ] }) : null,
      n ? /* @__PURE__ */ i("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-text-tertiary", children: "WB" }),
          /* @__PURE__ */ t(ne, { tone: yt(n.verdict), size: "sm", children: Mt(n.verdict) }),
          n.kelvinShift ? /* @__PURE__ */ i("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
            n.kelvinShift > 0 ? "+" : "",
            n.kelvinShift,
            "K"
          ] }) : null
        ] }),
        /* @__PURE__ */ t("p", { className: "mt-1 text-[12px] text-text-primary", children: n.rationale })
      ] }) : null,
      r ? /* @__PURE__ */ i("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-text-tertiary", children: "CONTRAST" }),
        /* @__PURE__ */ t("span", { className: "ml-1.5", children: /* @__PURE__ */ t(ne, { tone: yt(r), size: "sm", children: Mt(r) }) })
      ] }) : null,
      o ? /* @__PURE__ */ i("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-text-tertiary", children: "COMPOSITION" }),
        /* @__PURE__ */ t("p", { className: "mt-1 text-[12px] text-text-primary", children: o })
      ] }) : null
    ] }) : null,
    l ? /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1", children: (s ?? []).map((p, m) => /* @__PURE__ */ i(
      "li",
      {
        className: "flex items-start justify-between gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[13px]",
        children: [
          /* @__PURE__ */ t("span", { className: "flex-1 text-text-primary", children: p }),
          a ? /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => a(p),
              className: "shrink-0 rounded-md border border-border bg-surface-hover px-2 py-0.5 text-[11px] font-medium text-text-primary hover:bg-surface-panel focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
              children: "Apply"
            }
          ) : null
        ]
      },
      `${m}-${p.slice(0, 20)}`
    )) }) : null
  ] });
}
function jd({
  result: e,
  showImage: n = !0,
  showCaption: r = !0,
  showPeople: o = !0,
  showObjects: s = !0,
  showTags: a = !0,
  showEdits: c = !0,
  showRawText: d = !1,
  onTagClick: l,
  onApplyEdit: p,
  className: m
}) {
  const [x, f] = D(), [h, g] = D(!1), u = (N) => f(x === N.index ? void 0 : N.index), y = Ql(e);
  return /* @__PURE__ */ i("div", { className: S("flex w-full flex-col gap-4 text-text-primary", m), children: [
    /* @__PURE__ */ i("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-12", children: [
      n ? /* @__PURE__ */ i("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ t(
          Xl,
          {
            ...y,
            onSelectPerson: u,
            alt: e.caption ?? "Vision result"
          }
        ),
        e.model ? /* @__PURE__ */ i("div", { className: "mt-2 flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
          /* @__PURE__ */ t("span", { className: "font-medium text-text-primary", children: e.model.endpointId }),
          /* @__PURE__ */ t("span", { children: "·" }),
          /* @__PURE__ */ i("span", { children: [
            "latency ",
            e.model.latencyMs,
            "ms"
          ] }),
          typeof e.model.tokensOut == "number" ? /* @__PURE__ */ i(G, { children: [
            /* @__PURE__ */ t("span", { children: "·" }),
            /* @__PURE__ */ i("span", { children: [
              e.model.tokensOut,
              " tok out"
            ] })
          ] }) : null
        ] }) : null
      ] }) : null,
      /* @__PURE__ */ i("div", { className: S("flex flex-col gap-4", n ? "md:col-span-5" : "md:col-span-12"), children: [
        r ? /* @__PURE__ */ t(Yl, { result: e }) : null,
        o && e.people && e.people.length > 0 ? /* @__PURE__ */ t(
          Zl,
          {
            people: e.people,
            highlightedIndex: x,
            onSelect: u
          }
        ) : null
      ] })
    ] }),
    s && e.objects && e.objects.length > 0 ? /* @__PURE__ */ t(ed, { objects: e.objects }) : null,
    a && e.tags && e.tags.length > 0 ? /* @__PURE__ */ t(td, { tags: e.tags, onTagClick: l }) : null,
    c ? /* @__PURE__ */ t(
      nd,
      {
        exposure: e.exposure,
        whiteBalance: e.whiteBalance,
        contrast: e.contrast,
        composition: e.composition,
        edits: e.edits,
        onApplyEdit: p
      }
    ) : null,
    e.text && e.text.length > 0 ? /* @__PURE__ */ i("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ t("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Text (OCR)" }),
      /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1", children: e.text.map((N, v) => /* @__PURE__ */ t(
        "li",
        {
          className: "rounded border border-border bg-surface px-2 py-1 font-mono text-[12px]",
          children: N
        },
        v
      )) })
    ] }) : null,
    d && e.rawText ? /* @__PURE__ */ i("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => g((N) => !N),
          className: "self-start text-[11px] font-medium text-text-tertiary hover:underline",
          children: [
            h ? "▾" : "▸",
            " Raw model output"
          ]
        }
      ),
      h ? /* @__PURE__ */ t("pre", { className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary", children: e.rawText }) : null
    ] }) : null
  ] });
}
function Fd({
  status: e,
  result: n,
  runId: r,
  endpointLabel: o,
  error: s,
  latencyMs: a,
  onOpen: c,
  className: d
}) {
  const l = o ?? n?.model?.endpointId ?? "vision-model", p = a ?? n?.model?.latencyMs, m = n?.caption, x = (n?.tags ?? []).slice(0, 5), f = /* @__PURE__ */ i(G, { children: [
    /* @__PURE__ */ i("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ t("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: l }),
      e === "running" ? /* @__PURE__ */ i(ne, { tone: "info", size: "sm", children: [
        /* @__PURE__ */ t("span", { className: "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" }),
        " running"
      ] }) : e === "completed" ? /* @__PURE__ */ t(ne, { tone: "success", size: "sm", children: "ok" }) : /* @__PURE__ */ t(ne, { tone: "danger", size: "sm", children: "failed" }),
      typeof p == "number" ? /* @__PURE__ */ i("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        p.toFixed(0),
        "ms"
      ] }) : null,
      r ? /* @__PURE__ */ t("span", { className: "ml-auto truncate font-mono text-[10px] text-text-tertiary", children: r }) : null
    ] }),
    e === "failed" && s ? /* @__PURE__ */ t("p", { className: "text-[13px] text-red-700", children: s }) : /* @__PURE__ */ t("p", { className: "line-clamp-2 text-left text-[13px] text-text-primary", children: m ?? (e === "running" ? "Analyzing image…" : "No caption produced.") }),
    x.length > 0 ? /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: x.map((g) => /* @__PURE__ */ i(ne, { tone: "neutral", size: "sm", children: [
      "#",
      g
    ] }, g)) }) : null
  ] }), h = S(
    "flex w-full flex-col gap-1.5 rounded-lg border bg-surface p-3 text-sm text-left",
    e === "running" ? "border-indigo-300 ring-1 ring-indigo-200" : e === "failed" ? "border-red-300" : "border-border"
  );
  return c ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      onClick: c,
      className: S(
        h,
        "cursor-pointer transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1",
        d
      ),
      children: f
    }
  ) : /* @__PURE__ */ t("article", { className: S(h, d), children: f });
}
function zd(e = {}) {
  const { maxRecords: n = 50, runId: r } = e, [o, s] = D([]), a = re(/* @__PURE__ */ new Map()), c = re(!0);
  return J(() => (c.current = !0, () => {
    c.current = !1;
  }), []), Re("*", (d) => {
    if (!c.current) return;
    const l = d;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.image.vision.")) return;
    const m = l.payload;
    if (!m || typeof m.runId != "string" || typeof m.stepId != "string" || r && m.runId !== r) return;
    const x = `${m.runId}::${m.stepId}`;
    s((f) => {
      const h = a.current.get(x), g = typeof m.at == "number" ? m.at : Date.now(), u = (y) => {
        if (typeof h == "number" && h >= 0 && h < f.length) {
          const C = f.slice();
          return C[h] = { ...f[h], ...y }, C;
        }
        const N = [y, ...f];
        N.length > n && (N.length = n);
        const v = /* @__PURE__ */ new Map();
        return N.forEach((C, b) => v.set(`${C.runId}::${C.stepId}`, b)), a.current = v, N;
      };
      if (p === "pipeline.image.vision.started")
        return u({
          runId: m.runId,
          stepId: m.stepId,
          status: "running",
          endpointId: m.endpointId,
          startedAt: g
        });
      if (p === "pipeline.image.vision.completed") {
        const y = typeof h == "number" ? f[h] : void 0;
        return u({
          runId: m.runId,
          stepId: m.stepId,
          status: "completed",
          result: m.result,
          completedAt: g,
          elapsedMs: y?.startedAt ? g - y.startedAt : void 0,
          endpointId: y?.endpointId ?? m.result?.model?.endpointId
        });
      }
      if (p === "pipeline.image.vision.failed") {
        const y = typeof h == "number" ? f[h] : void 0;
        return u({
          runId: m.runId,
          stepId: m.stepId,
          status: "failed",
          error: m.error,
          completedAt: g,
          elapsedMs: y?.startedAt ? g - y.startedAt : void 0
        });
      }
      return f;
    });
  }), _(() => o, [o]);
}
function rd(e) {
  return e === "pass" ? "success" : e === "fail" ? "danger" : "warning";
}
function od({ result: e, className: n }) {
  const r = rd(e.overallVerdict), o = r === "success" ? "PASS" : r === "danger" ? "FAIL" : "INCONCLUSIVE", s = e.rubricSnapshot.passThreshold ?? 0.5;
  return /* @__PURE__ */ i(
    "section",
    {
      className: S(
        "flex flex-col gap-2 rounded-lg border border-border bg-surface p-3",
        n
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ i("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: [
            e.rubricSnapshot.id,
            " v",
            e.rubricSnapshot.version
          ] }),
          /* @__PURE__ */ i(ne, { tone: r, size: "sm", children: [
            o,
            " · ",
            e.overallVerdict
          ] }),
          /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-tertiary", children: e.model }),
          /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "·" }),
          /* @__PURE__ */ i("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
            "mode: ",
            e.mode
          ] }),
          typeof e.confidence == "number" ? /* @__PURE__ */ i("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
            "confidence ",
            (e.confidence * 100).toFixed(0),
            "%"
          ] }) : null
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium uppercase text-text-tertiary", children: "overall" }),
          /* @__PURE__ */ t(
            Ln,
            {
              value: e.overallScore,
              threshold: s,
              tone: r === "warning" ? "warning" : r,
              size: "lg",
              ariaLabel: `Overall judge score ${(e.overallScore * 100).toFixed(0)}% — ${o}`
            }
          )
        ] })
      ]
    }
  );
}
function sd({ result: e, className: n }) {
  if (!e.criteria || e.criteria.length === 0) return null;
  const r = /* @__PURE__ */ new Map();
  for (const o of e.rubricSnapshot.criteria) r.set(o.id, o);
  return /* @__PURE__ */ i("section", { className: S("flex flex-col gap-1.5", n), children: [
    /* @__PURE__ */ i("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Criteria (",
      e.criteria.length,
      ")"
    ] }),
    /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1.5", children: e.criteria.map((o) => /* @__PURE__ */ t(id, { score: o, def: r.get(o.criterionId) }, o.criterionId)) })
  ] });
}
function id({
  score: e,
  def: n
}) {
  const r = e.passed ? "success" : "danger", o = e.passed ? "PASS" : "FAIL", s = n?.scale ?? "0-1";
  return /* @__PURE__ */ i("li", { className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2.5", children: [
    /* @__PURE__ */ i("div", { className: "flex flex-wrap items-center gap-1.5", children: [
      /* @__PURE__ */ t("span", { className: "font-mono text-[11px] font-semibold text-text-primary", children: e.criterionId }),
      /* @__PURE__ */ i("span", { className: "font-mono text-[10px] uppercase text-text-tertiary", children: [
        "[",
        s,
        "]"
      ] }),
      /* @__PURE__ */ t(ne, { tone: r, size: "sm", children: o }),
      /* @__PURE__ */ i("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
        "raw: ",
        String(e.rawScore)
      ] })
    ] }),
    /* @__PURE__ */ t(
      Ln,
      {
        value: e.score,
        threshold: n?.failThreshold ?? 0.5,
        tone: r,
        size: "sm",
        ariaLabel: `Criterion ${e.criterionId} score ${(e.score * 100).toFixed(0)}% — ${o}`
      }
    ),
    n?.prompt ? /* @__PURE__ */ i("p", { className: "text-[12px] italic leading-snug text-text-tertiary", children: [
      "“",
      n.prompt,
      "”"
    ] }) : null,
    e.rationale ? /* @__PURE__ */ t("p", { className: "text-[13px] leading-snug text-text-primary", children: e.rationale }) : null
  ] });
}
function qd({
  result: e,
  showVerdict: n = !0,
  showCriteria: r = !0,
  showMetadata: o = !0,
  showRawText: s = !1,
  className: a
}) {
  const [c, d] = D(!1);
  return /* @__PURE__ */ i("div", { className: S("flex w-full flex-col gap-3 text-text-primary", a), children: [
    n ? /* @__PURE__ */ t(od, { result: e }) : null,
    r ? /* @__PURE__ */ t(sd, { result: e }) : null,
    o ? /* @__PURE__ */ i("section", { className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
      /* @__PURE__ */ i("span", { children: [
        "tokens ",
        /* @__PURE__ */ t("span", { className: "font-mono", children: e.tokensIn }),
        " in /",
        " ",
        /* @__PURE__ */ t("span", { className: "font-mono", children: e.tokensOut }),
        " out"
      ] }),
      e.cacheReadTokens && e.cacheReadTokens > 0 ? /* @__PURE__ */ i(G, { children: [
        /* @__PURE__ */ t("span", { children: "·" }),
        /* @__PURE__ */ i("span", { children: [
          "cache ",
          /* @__PURE__ */ t("span", { className: "font-mono", children: e.cacheReadTokens }),
          " read"
        ] })
      ] }) : null,
      /* @__PURE__ */ t("span", { children: "·" }),
      /* @__PURE__ */ i("span", { children: [
        "latency ",
        /* @__PURE__ */ t("span", { className: "font-mono", children: e.latencyMs }),
        "ms"
      ] }),
      /* @__PURE__ */ t("span", { children: "·" }),
      /* @__PURE__ */ i("span", { children: [
        "cost ",
        /* @__PURE__ */ i("span", { className: "font-mono", children: [
          "$",
          e.costUsd.toFixed(4)
        ] })
      ] }),
      /* @__PURE__ */ t("span", { className: "ml-auto font-mono", children: e.judgedAt })
    ] }) : null,
    s && e.rawModelText ? /* @__PURE__ */ i("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => d((l) => !l),
          className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded",
          children: [
            c ? "▾" : "▸",
            " Raw model output"
          ]
        }
      ),
      c ? /* @__PURE__ */ t("pre", { className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary", children: e.rawModelText }) : null
    ] }) : null
  ] });
}
function ad(e) {
  if (typeof e == "number") return e;
  if (typeof e == "string") {
    const n = Date.parse(e);
    if (Number.isFinite(n)) return n;
  }
  return Date.now();
}
function Hd(e = {}) {
  const { maxRecords: n = 50, runId: r } = e, [o, s] = D([]), a = re(/* @__PURE__ */ new Map()), c = re(!0);
  return J(() => (c.current = !0, () => {
    c.current = !1;
  }), []), Re("*", (d) => {
    if (!c.current) return;
    const l = d;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.judge.")) return;
    const m = l.payload;
    if (!m || typeof m.runId != "string" || typeof m.stepId != "string" || r && m.runId !== r) return;
    const x = `${m.runId}::${m.stepId}`;
    s((f) => {
      const h = a.current.get(x), g = ad(m.at), u = (y) => {
        if (typeof h == "number" && h >= 0 && h < f.length) {
          const C = f.slice();
          return C[h] = { ...f[h], ...y }, C;
        }
        const N = [y, ...f];
        N.length > n && (N.length = n);
        const v = /* @__PURE__ */ new Map();
        return N.forEach((C, b) => v.set(`${C.runId}::${C.stepId}`, b)), a.current = v, N;
      };
      if (p === "pipeline.judge.started")
        return u({
          runId: m.runId,
          stepId: m.stepId,
          pipelineId: m.pipelineId,
          status: "running",
          rubricId: m.rubricId,
          judgeModel: m.judgeModel,
          startedAt: g
        });
      if (p === "pipeline.judge.scored") {
        const y = typeof h == "number" ? f[h] : void 0;
        return u({
          runId: m.runId,
          stepId: m.stepId,
          pipelineId: m.pipelineId ?? y?.pipelineId,
          status: "scored",
          result: m.result,
          completedAt: g,
          elapsedMs: y?.startedAt ? g - y.startedAt : m.latencyMs,
          rubricId: m.rubricId ?? y?.rubricId,
          judgeModel: m.judgeModel ?? y?.judgeModel,
          costUsd: m.costUsd ?? m.result?.costUsd,
          tokensIn: m.usage?.inputTokens ?? m.result?.tokensIn,
          tokensOut: m.usage?.outputTokens ?? m.result?.tokensOut
        });
      }
      if (p === "pipeline.judge.failed") {
        const y = typeof h == "number" ? f[h] : void 0;
        return u({
          runId: m.runId,
          stepId: m.stepId,
          pipelineId: m.pipelineId ?? y?.pipelineId,
          status: "failed",
          error: m.error,
          failureReason: m.reason,
          completedAt: g,
          elapsedMs: y?.startedAt ? g - y.startedAt : m.latencyMs,
          costUsd: m.costUsd,
          tokensIn: m.tokensIn,
          tokensOut: m.tokensOut
        });
      }
      if (p === "pipeline.judge.budget-exceeded") {
        const y = typeof h == "number" ? f[h] : void 0;
        return u({
          runId: m.runId,
          stepId: m.stepId,
          pipelineId: m.pipelineId ?? y?.pipelineId,
          status: "budget-exceeded",
          completedAt: g
        });
      }
      return f;
    });
  }), _(() => o, [o]);
}
export {
  eo as ActionNode,
  _d as AllRunsPage,
  io as ApprovalNode,
  Ce as BaseNode,
  Yl as CaptionPanel,
  Qr as ConditionNode,
  sd as CriteriaPanel,
  nd as EditRecommendationsPanel,
  Vd as EventStreamProvider,
  to as ForkNode,
  Xl as ImageWithBBoxOverlay,
  oo as JoinNode,
  qd as JudgmentResultViewer,
  Jr as LLMNode,
  ed as ObjectsPanel,
  Bd as PendingApprovalsPage,
  Zl as PeoplePanel,
  zo as PipelineCanvas,
  rr as PipelineEditorContext,
  $d as PipelineEditorPage,
  Pn as PipelineEditorProvider,
  Od as PipelineRunComparePage,
  Ld as PipelineRunDiff,
  Ed as PipelineRunReplayPage,
  Pd as PipelineRunsPage,
  mr as PipelineRunsProvider,
  Ud as PipelineStatsPage,
  Md as PipelinesPage,
  td as TagsPanel,
  Yr as TransformNode,
  Kr as TriggerNode,
  od as VerdictPanel,
  jd as VisionResultViewer,
  Fd as VisionRunCard,
  Ql as imageOverlayPropsFrom,
  xo as nodeTypes,
  Re as useEventStream,
  Pr as useEventStreamContext,
  Hd as useJudgmentResults,
  ke as useLatestStepForNode,
  ot as usePipelineEditor,
  st as usePipelineRuns,
  Te as useRetryFromStep,
  zd as useVisionResults
};
