import { jsxs as s, jsx as t, Fragment as V } from "react/jsx-runtime";
import jn, { useState as R, useRef as te, useMemo as L, useEffect as q, useCallback as M, useContext as zn, createContext as mr } from "react";
import { useNavigate as Pe, useParams as rt, Navigate as ot, useSearchParams as St } from "react-router";
import { t as Ne, v as Te, p as qn, w as Je, u as st, h as fr, f as hr, e as tn, o as xr, x as gr, J as At, m as Hn, a as Xe, y as Kn, z as Kt, A as Ft, B as Wn, C as br, D as yr, E as vr, b as Nr, F as Qe, G as wr, H as kr, K as Ze, L as nn, M as Cr, i as Ir, n as Jn, N as wt, O as Sr, k as rn, P as Tr, Q as Ar, r as Rr, R as kt, l as on, S as $r, j as Dr, I as Ct } from "./PipelineEditorServicesContext-FYjuBErM.js";
import { g as Md, q as Ed } from "./PipelineEditorServicesContext-FYjuBErM.js";
import { Handle as Q, Position as Z, useNodeConnections as Pr, getSmoothStepPath as Mr, EdgeLabelRenderer as Er, ReactFlowProvider as Or, useReactFlow as Lr, useNodesState as _r, useEdgesState as Ur, ReactFlow as Br, Background as Fr, BackgroundVariant as jr, Controls as zr, MiniMap as qr } from "@xyflow/react";
/* empty css               */
import { c as I } from "./cn-B6yFEsav.js";
import { u as Wt, a as Tt } from "./ToastProvider-aHBNxMTO.js";
import "clsx";
import "tailwind-merge";
import { M as ze } from "./Modal-2jg4229_.js";
import "react-dom";
import "./WebSocketContext-DPGFyPeZ.js";
import { u as Hr, I as Kr, C as Jt, T as Wr, S as Vt, a as Jr } from "./TagEditor-BmL7k5D2.js";
import { a as Re, u as Vr } from "./EventStreamContext-CjzSHXy-.js";
import { E as Ld } from "./EventStreamContext-CjzSHXy-.js";
import { B as Be } from "./Button-Qsbxqsl9.js";
import { I as pt } from "./IconButton-Da1kJ5WO.js";
import { u as Gt } from "./IdentityContext-CLalsm_M.js";
import { C as ne } from "./Chip-CAS9vOWq.js";
import { E as Oe } from "./EmptyState-PM9wTjxk.js";
import { B as et } from "./Banner-DKb3JiLs.js";
import { C as jt } from "./ConfirmDialog-CNoxvYGu.js";
import { B as Gr, L as yt } from "./Chart-ByoxeiYX.js";
import { S as Rt } from "./SkeletonCard-C89GWQ3p.js";
const Yr = "";
function sn(e, n) {
  const r = e.displayName;
  return typeof r == "string" && r.length > 0 ? r : n.slice(0, 8);
}
function Xr({ value: e, onChange: n, placeholder: r, maxSelect: o }) {
  const { presenceUsers: a } = Hr(), { idToken: i } = Gt(), [d, c] = R(""), [l, p] = R(!1), [m, x] = R(0), [f, h] = R([]), g = te(null), u = te(null), y = L(() => {
    const S = new Set(e), A = [];
    for (const D of a)
      S.has(D.clientId) || (S.add(D.clientId), A.push({
        userId: D.clientId,
        displayName: sn(D.metadata, D.clientId)
      }));
    return A;
  }, [a, e]);
  q(() => {
    const S = d.trim();
    if (!S || !i) {
      h([]);
      return;
    }
    const A = new AbortController(), D = setTimeout(() => {
      const H = `${Yr}/api/profiles?q=${encodeURIComponent(S)}&limit=20`;
      fetch(H, {
        headers: { Authorization: `Bearer ${i}` },
        signal: A.signal
      }).then((G) => G.ok ? G.json() : Promise.reject(new Error(`HTTP ${G.status}`))).then((G) => {
        h(Array.isArray(G.profiles) ? G.profiles : []);
      }).catch(() => {
      });
    }, 250);
    return () => {
      clearTimeout(D), A.abort();
    };
  }, [d, i]);
  const N = L(() => {
    const S = new Set(e), A = [];
    for (const D of y)
      S.has(D.userId) || (S.add(D.userId), A.push(D));
    for (const D of f)
      S.has(D.userId) || (S.add(D.userId), A.push({
        userId: D.userId,
        displayName: D.displayName || D.userId.slice(0, 8)
      }));
    return A;
  }, [y, f, e]), v = L(() => {
    const S = d.trim().toLowerCase();
    return S ? N.filter(
      (A) => A.displayName.toLowerCase().includes(S) || A.userId.toLowerCase().includes(S)
    ) : N;
  }, [N, d]), C = typeof o == "number" && e.length >= o, b = (S) => {
    const A = S.trim();
    A && (e.includes(A) || C || (n([...e, A]), c(""), x(0)));
  }, w = (S) => {
    n(e.filter((A) => A !== S));
  }, k = (S) => {
    if (S.key === "ArrowDown")
      S.preventDefault(), p(!0), x((A) => Math.min(A + 1, Math.max(v.length - 1, 0)));
    else if (S.key === "ArrowUp")
      S.preventDefault(), x((A) => Math.max(A - 1, 0));
    else if (S.key === "Enter") {
      S.preventDefault();
      const A = v[m];
      A ? b(A.userId) : d.trim() && b(d.trim());
    } else S.key === "Escape" ? p(!1) : S.key === "Backspace" && !d && e.length > 0 && w(e[e.length - 1]);
  }, $ = (S) => {
    const A = a.find((H) => H.clientId === S);
    if (A) return sn(A.metadata, S);
    const D = f.find((H) => H.userId === S);
    return D && D.displayName ? D.displayName : S;
  };
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5 font-[inherit]", children: [
    e.length > 0 && /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5", children: e.map((S) => /* @__PURE__ */ s(
      "span",
      {
        className: "inline-flex items-center gap-1 bg-[#eef2ff] border border-[#c7d2fe] text-[#3730a3] rounded-full py-0.5 pr-2 pl-2.5 text-[12px] font-medium",
        children: [
          $(S),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => w(S),
              "aria-label": `Remove ${$(S)}`,
              className: "bg-transparent border-none text-[#3730a3] cursor-pointer text-[14px] leading-none px-0.5 py-0",
              children: "×"
            }
          )
        ]
      },
      S
    )) }),
    /* @__PURE__ */ s("div", { className: "relative", children: [
      /* @__PURE__ */ t(
        "input",
        {
          ref: g,
          type: "text",
          value: d,
          disabled: C,
          placeholder: C ? `Max ${o} selected` : r ?? "Search users…",
          onChange: (S) => {
            c(S.target.value), p(!0), x(0);
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
          onMouseDown: (S) => {
            S.preventDefault(), u.current && clearTimeout(u.current);
          },
          children: v.map((S, A) => /* @__PURE__ */ s(
            "div",
            {
              className: I(
                "py-1.5 px-2.5 text-[13px] text-[#374151] cursor-pointer",
                A === m ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              onMouseEnter: () => x(A),
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
const Qr = {
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
  scatter: ["out"]
}, Zr = {
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
  scatter: ["in"]
};
function zt(e, n, r, o) {
  return !(!eo(e, n) || !to(r, o));
}
function eo(e, n) {
  const r = Qr[e];
  return r === "fork" ? no(n) : r.includes(n);
}
function to(e, n) {
  const r = Zr[e];
  return r === null ? !1 : r === "join" ? ro(n) : r.includes(n);
}
function no(e) {
  return /^branch-(\d+)$/.exec(e) !== null;
}
function ro(e) {
  return /^in-(\d+)$/.exec(e) !== null;
}
const oo = {
  idle: { card: "border border-[#d1d5db] bg-white", dot: "bg-[#d1d5db]" },
  pending: { card: "border border-dashed border-[#93c5fd] bg-[#eff6ff]", dot: "bg-[#93c5fd]" },
  running: { card: "border-2 border-[#2563eb] bg-[#eff6ff]", dot: "bg-[#2563eb]" },
  awaiting: { card: "border-2 border-[#f59e0b] bg-[#fffbeb]", dot: "bg-[#f59e0b]" },
  completed: { card: "border border-[#16a34a] bg-[#f0fdf4]", dot: "bg-[#16a34a]" },
  failed: { card: "border-2 border-[#dc2626] bg-[#fef2f2]", dot: "bg-[#dc2626]" },
  skipped: { card: "border border-dashed border-[#d1d5db] bg-[#f9fafb] opacity-50", dot: "bg-[#d1d5db]" }
};
function we(e) {
  const { icon: n, subtitle: r, state: o, body: a, footer: i, selected: d, onRetry: c, hasBreakpoint: l, pausedAtBreakpoint: p, ariaLabel: m, children: x } = e, f = oo[o], h = Wt(), [g, u] = R(!1), y = o === "failed" && typeof c == "function", N = (k) => {
    k.preventDefault(), k.stopPropagation(), c?.();
  }, v = !h && o === "pending" ? "animate-[basenode-pulse_2000ms_cubic-bezier(0.25,0.1,0.25,1)_infinite]" : !h && o === "running" ? "animate-[basenode-pulse_1500ms_linear_infinite]" : "", C = !!(a || i || y), b = !!(a || i), w = r ? `${r}, state: ${o}` : `Node, state: ${o}`;
  return /* @__PURE__ */ s(
    "div",
    {
      className: I(
        "w-[200px] rounded-lg relative font-inherit text-text-primary box-border outline-none transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        p ? "border-2 border-[#d97706] bg-[#fffbeb] shadow-[0_0_0_3px_rgba(217,119,6,0.25),0_1px_2px_rgba(15,23,42,0.06)]" : f.card,
        !p && d && "shadow-[0_0_0_4px_rgba(100,108,255,0.18),0_1px_2px_rgba(15,23,42,0.06)]",
        !p && !d && "shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
        h && "transition-none"
      ),
      role: "button",
      tabIndex: 0,
      "aria-label": m ?? w,
      "aria-selected": !!d,
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
        /* @__PURE__ */ s("div", { className: I(
          "flex items-center gap-2 h-7 px-2.5",
          C && "border-b border-border"
        ), children: [
          /* @__PURE__ */ t("span", { className: "text-sm leading-none shrink-0", "aria-hidden": "true", children: n }),
          /* @__PURE__ */ t("span", { className: "flex-1 min-w-0 text-xs font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap", children: r }),
          /* @__PURE__ */ t(
            "span",
            {
              className: I("w-2 h-2 rounded-full shrink-0", f.dot, v),
              "aria-label": `state: ${o}`
            }
          )
        ] }),
        y && /* @__PURE__ */ t("div", { className: I(
          "flex px-2.5 py-1.5",
          b && "border-b border-border"
        ), children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: I(
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
        a != null && /* @__PURE__ */ t("div", { className: "px-2.5 py-2 text-[13px] leading-[1.4] text-text-secondary", children: a }),
        i != null && /* @__PURE__ */ t("div", { className: "border-t border-border px-2.5 py-1.5 text-xs text-text-secondary", children: i }),
        x
      ]
    }
  );
}
function an(e) {
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
function so(e) {
  return e.triggerType === "schedule" ? e.schedule ? `cron: ${e.schedule}` : "No schedule set" : e.triggerType === "webhook" ? e.webhookPath ? `POST ${e.webhookPath}` : "No path set" : e.triggerType.startsWith("document.") ? e.documentTypeId ? `Doc type: ${e.documentTypeId}` : "Any document" : "Fires on user click";
}
function ao(e) {
  const { id: n, data: r, selected: o } = e, a = Ne(n), i = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = Te(), p = c === "failed" ? () => l(n) : void 0, m = `Trigger node, ${an(r)}, state: ${c}`;
  return /* @__PURE__ */ t(
    we,
    {
      icon: "▶",
      subtitle: an(r),
      state: c,
      body: /* @__PURE__ */ t("span", { className: "italic", children: so(r) }),
      selected: o,
      onRetry: p,
      ariaLabel: m,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: /* @__PURE__ */ t(
        Q,
        {
          type: "source",
          position: Z.Right,
          id: "out",
          className: "!bg-slate-300 !w-2.5 !h-2.5"
        }
      )
    }
  );
}
function io(e) {
  if (!e || e.trim().length === 0) return "Not configured";
  const r = e.split(`
`).slice(0, 2).join(" ").trim();
  return r.length > 120 ? `${r.slice(0, 117)}…` : r;
}
function lo({ info: e }) {
  const [n, r] = R(!1), o = n ? e.response : e.response.length > 60 ? `${e.response.slice(0, 60)}…` : e.response, a = e.tokensIn != null || e.tokensOut != null;
  return /* @__PURE__ */ s("div", { children: [
    /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        onClick: () => r((i) => !i),
        className: "bg-transparent border-none p-0 cursor-pointer font-inherit text-xs text-text-secondary font-medium text-left",
        children: [
          n ? "▾" : "▸",
          " Response",
          a && /* @__PURE__ */ s("span", { className: "ml-1.5 text-[11px] text-text-tertiary", children: [
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
function co(e) {
  const { id: n, data: r, selected: o } = e, a = Ne(n), i = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = a?.llm, p = c === "running" && l?.streamOpened === !0 && (l?.tokensOut ?? 0) === 0, m = c === "running" && l !== void 0 && (l.tokensOut ?? 0) > 0, x = Te(), f = c === "failed" ? () => x(n) : void 0, h = /* @__PURE__ */ t("span", { className: "italic", children: io(r.userPromptTemplate) }), u = (l ? {
    response: l.response ?? "",
    tokensIn: l.tokensIn,
    tokensOut: l.tokensOut,
    streaming: m,
    streamOpening: p
  } : void 0) ?? r._llmResponse, y = u ? /* @__PURE__ */ t(lo, { info: u }) : void 0, N = (r.systemPrompt ?? "").replace(/\s+/g, " ").trim(), v = N.length === 0 ? "no system prompt" : `system prompt: ${N.length > 60 ? `${N.slice(0, 60)}…` : N}`, C = `LLM node, ${r.model || r.provider}, ${v}, state: ${c}`;
  return /* @__PURE__ */ s(
    we,
    {
      icon: "🧠",
      subtitle: r.model || r.provider,
      state: c,
      body: h,
      footer: y,
      selected: o,
      onRetry: f,
      ariaLabel: C,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(Q, { type: "target", position: Z.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "error", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function po(e) {
  if (!e) return "—";
  const n = e.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function uo(e) {
  const { id: n, data: r, selected: o } = e, a = Ne(n), i = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = Te(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ s(
    we,
    {
      icon: "✨",
      subtitle: r.transformType,
      state: c,
      body: /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: po(r.expression) }),
      selected: o,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(Q, { type: "target", position: Z.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5" })
      ]
    }
  );
}
function mo(e) {
  if (!e) return "—";
  const n = e.replace(/\s+/g, " ").trim();
  return n.length > 60 ? `${n.slice(0, 60)}…` : n;
}
function fo(e) {
  const { id: n, data: r, selected: o } = e, a = Ne(n), i = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = Te(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ s(
    we,
    {
      icon: "❓",
      subtitle: r.label || "condition",
      state: c,
      body: /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-primary bg-surface-inset px-1.5 py-0.5 rounded inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap", children: mo(r.expression) }),
      selected: o,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(Q, { type: "target", position: Z.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "true", className: "!bg-green-600 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "false", className: "!bg-amber-500 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function ho(e) {
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
function xo(e) {
  const { id: n, data: r, selected: o } = e, a = Ne(n), i = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = Te(), p = c === "failed" ? () => l(n) : void 0;
  return /* @__PURE__ */ s(
    we,
    {
      icon: "⚡",
      subtitle: r.actionType,
      state: c,
      body: /* @__PURE__ */ t("span", { className: "italic", children: ho(r) }),
      selected: o,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(Q, { type: "target", position: Z.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "error", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function go(e) {
  const { id: n, data: r, selected: o } = e, a = Ne(n), i = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = Te(), p = c === "failed" ? () => l(n) : void 0, m = Math.max(2, Math.min(8, r.branchCount ?? 2)), x = Array.from({ length: m }, (f, h) => {
    const g = r.branchLabels?.[h];
    return g && g.trim().length > 0 ? g : `branch ${h}`;
  });
  return /* @__PURE__ */ s(
    we,
    {
      icon: "⑂",
      subtitle: `${m} branches`,
      state: c,
      body: /* @__PURE__ */ t("ul", { className: "m-0 p-0 list-none flex flex-col gap-0.5 text-xs text-text-secondary", children: x.map((f, h) => /* @__PURE__ */ s("li", { className: "overflow-hidden text-ellipsis whitespace-nowrap", children: [
        "• ",
        f
      ] }, h)) }),
      selected: o,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(Q, { type: "target", position: Z.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        x.map((f, h) => {
          const g = (h + 1) / (m + 1) * 100;
          return /* @__PURE__ */ t(
            Q,
            {
              type: "source",
              position: Z.Right,
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
function bo(e) {
  return e.mode === "all" ? "all" : e.mode === "any" ? "any" : `${e.n ?? 1} of many`;
}
function yo(e) {
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
function vo(e) {
  const { id: n, data: r, selected: o } = e, a = Ne(n), i = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = Te(), p = c === "failed" ? () => l(n) : void 0, m = Pr({ handleType: "target" }), x = Math.max(2, m.length + 1);
  return /* @__PURE__ */ s(
    we,
    {
      icon: "⑃",
      subtitle: bo(r),
      state: c,
      body: /* @__PURE__ */ t("span", { className: "italic", children: yo(r.mergeStrategy) }),
      selected: o,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        Array.from({ length: x }, (f, h) => {
          const g = (h + 1) / (x + 1) * 100;
          return /* @__PURE__ */ t(
            Q,
            {
              type: "target",
              position: Z.Left,
              id: `in-${h}`,
              className: "!bg-slate-300 !w-2.5 !h-2.5",
              style: { top: `${g}%` }
            },
            `in-${h}`
          );
        }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "out", className: "!bg-slate-300 !w-2.5 !h-2.5" })
      ]
    }
  );
}
function No(e) {
  return e.type === "role" ? `@${e.value}` : e.value;
}
function wo(e) {
  const { id: n, data: r, selected: o } = e, a = Ne(n), i = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = Te(), p = c === "failed" ? () => l(n) : void 0, m = r.approvers ?? [], x = m.length, f = r.requiredCount ?? 0, h = `${x} approver${x === 1 ? "" : "s"}, ${f}/${x} required`, g = m.slice(0, 2), u = Math.max(0, m.length - 2), y = m.length === 0 ? /* @__PURE__ */ t("span", { className: "italic text-text-tertiary", children: "No approvers" }) : /* @__PURE__ */ s("div", { className: "flex flex-wrap gap-1", children: [
    g.map((N, v) => /* @__PURE__ */ t(
      "span",
      {
        className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-panel text-text-secondary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap",
        children: No(N)
      },
      v
    )),
    u > 0 && /* @__PURE__ */ s("span", { className: "inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-surface-inset text-text-tertiary border border-border max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap", children: [
      "+",
      u,
      " more"
    ] })
  ] });
  return /* @__PURE__ */ s(
    we,
    {
      icon: "✋",
      subtitle: h,
      state: c,
      body: y,
      selected: o,
      onRetry: p,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(Q, { type: "target", position: Z.Left, id: "in", className: "!bg-slate-300 !w-2.5 !h-2.5" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "approved", className: "!bg-green-600 !w-2.5 !h-2.5 !top-[40%]" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "rejected", className: "!bg-red-600 !w-2.5 !h-2.5 !top-[60%]" })
      ]
    }
  );
}
function ko({ id: e, data: n, selected: r }) {
  const o = Ne(e), a = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? a ?? "idle", d = Te(), c = n.agentName || n.agentId || "Not configured", l = `${n.protocol.toUpperCase()}${n.streaming ? " (streaming)" : ""}`;
  return /* @__PURE__ */ s(
    we,
    {
      icon: "🤖",
      subtitle: c,
      state: i,
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: i === "failed" && o ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(Q, { type: "target", position: Z.Left, id: "in" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Co({ id: e, data: n, selected: r }) {
  const o = Ne(e), a = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? a ?? "idle", d = Te(), c = n.toolName || "Not configured";
  return /* @__PURE__ */ s(
    we,
    {
      icon: "🔌",
      subtitle: c,
      state: i,
      body: n.gatewayUrl ? /* @__PURE__ */ t("span", { className: "text-[11px]", children: n.gatewayUrl }) : void 0,
      selected: r,
      onRetry: i === "failed" && o ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(Q, { type: "target", position: Z.Left, id: "in" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Io({ id: e, data: n, selected: r }) {
  const o = Ne(e), a = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? a ?? "idle", d = Te(), c = n.knowledgeBaseId || "Not configured", l = `Top ${n.topK} chunks${n.scoreThreshold ? ` (≥${n.scoreThreshold})` : ""}`;
  return /* @__PURE__ */ s(
    we,
    {
      icon: "📚",
      subtitle: c,
      state: i,
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: i === "failed" && o ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(Q, { type: "target", position: Z.Left, id: "in" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function So({ id: e, data: n, selected: r }) {
  const o = Ne(e), a = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? a ?? "idle", d = Te(), c = n.graphId || "Not configured", l = n.query.length > 40 ? `${n.query.slice(0, 37)}...` : n.query;
  return /* @__PURE__ */ s(
    we,
    {
      icon: "🕸️",
      subtitle: c,
      state: i,
      body: /* @__PURE__ */ t("span", { className: "text-[11px] font-mono", children: l }),
      selected: r,
      onRetry: i === "failed" && o ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(Q, { type: "target", position: Z.Left, id: "in" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function To({ id: e, data: n, selected: r }) {
  const o = Ne(e), a = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? a ?? "idle", d = Te(), c = `${n.mode} ${n.scope}`, l = n.namespace ? `ns: ${n.namespace}` : "No namespace";
  return /* @__PURE__ */ s(
    we,
    {
      icon: "💾",
      subtitle: c,
      state: i,
      body: /* @__PURE__ */ t("span", { className: "text-[11px]", children: l }),
      selected: r,
      onRetry: i === "failed" && o ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(Q, { type: "target", position: Z.Left, id: "in" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "out", className: "!top-[40%]" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "error", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Ao({ id: e, data: n, selected: r }) {
  const o = Ne(e), a = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? a ?? "idle", d = Te(), c = n.label || n.guardrailId || "Not configured";
  return /* @__PURE__ */ s(
    we,
    {
      icon: "🛡️",
      subtitle: c,
      state: i,
      body: /* @__PURE__ */ s("span", { className: "text-[11px]", children: [
        "Action: ",
        n.action
      ] }),
      selected: r,
      onRetry: i === "failed" && o ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(Q, { type: "target", position: Z.Left, id: "in" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "pass", className: "!top-[40%] !bg-green-600" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "block", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function Ro({ id: e, data: n, selected: r }) {
  const o = Ne(e), a = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? a ?? "idle", d = Te(), c = n.label || n.action || "Not configured";
  return /* @__PURE__ */ s(
    we,
    {
      icon: "📜",
      subtitle: c,
      state: i,
      body: /* @__PURE__ */ s("span", { className: "text-[11px]", children: [
        n.principal,
        " → ",
        n.resource
      ] }),
      selected: r,
      onRetry: i === "failed" && o ? () => d(e) : void 0,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(Q, { type: "target", position: Z.Left, id: "in" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "allow", className: "!top-[40%] !bg-green-600" }),
        /* @__PURE__ */ t(Q, { type: "source", position: Z.Right, id: "deny", className: "!top-[60%] !bg-red-600" })
      ]
    }
  );
}
function $o({ id: e, data: n, selected: r }) {
  const o = Ne(e), a = o?.status === "cancelled" ? "failed" : o?.status, i = n._state ?? a ?? "idle", d = n.eventType === "CUSTOM" ? n.customEventName || "Custom" : n.eventType;
  return /* @__PURE__ */ t(
    we,
    {
      icon: "📡",
      subtitle: d,
      state: i,
      body: /* @__PURE__ */ s("span", { className: "text-[11px]", children: [
        "Source: ",
        n.sourceField
      ] }),
      footer: /* @__PURE__ */ t("span", { className: "text-[10px] text-[#6366f1]", children: "Terminal — streams to AG-UI frontend" }),
      selected: r,
      hasBreakpoint: n._hasBreakpoint,
      pausedAtBreakpoint: n._pausedAtBreakpoint,
      children: /* @__PURE__ */ t(Q, { type: "target", position: Z.Left, id: "in" })
    }
  );
}
function Do(e) {
  const { id: n, data: r, selected: o } = e, a = Ne(n), i = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = qn(), p = r.imageId, m = p ? (
    // eslint-disable-next-line jsx-a11y/alt-text
    /* @__PURE__ */ t(
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
  ) : /* @__PURE__ */ t(
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
  ), x = p ? /* @__PURE__ */ s("span", { className: "font-mono text-[11px] text-[#6b7280]", children: [
    p.slice(0, 16),
    "…"
  ] }) : void 0;
  return /* @__PURE__ */ t(
    we,
    {
      icon: "🖼",
      subtitle: "image-source",
      state: c,
      body: m,
      footer: x,
      selected: o,
      ariaLabel: `Image Source node, state: ${c}`,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: /* @__PURE__ */ t(
        Q,
        {
          type: "source",
          position: Z.Right,
          id: "out",
          className: "!w-2.5 !h-2.5 !bg-[#6b7280]"
        }
      )
    }
  );
}
function Po(e) {
  const { id: n, data: r, selected: o } = e, a = Ne(n), i = a?.status === "cancelled" ? "failed" : a?.status, c = (r._state && r._state !== "idle" ? r._state : void 0) ?? i ?? r._state ?? "idle", l = qn(), p = a?.images?.[0] ?? null, x = a?.output?.filename ?? null, f = p ? /* @__PURE__ */ s("div", { children: [
    /* @__PURE__ */ t(
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
    x && /* @__PURE__ */ t(
      "div",
      {
        className: "mt-1 text-[10px] font-mono text-[#6b7280] overflow-hidden text-ellipsis whitespace-nowrap",
        "data-testid": "save-filename-badge",
        title: x,
        children: x
      }
    )
  ] }) : /* @__PURE__ */ t(
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
  ), h = r.filenameTemplate ?? "crop-{{scatter.index}}.png", g = h.length > 28 ? `${h.slice(0, 25)}…` : h, u = /* @__PURE__ */ t(
    "span",
    {
      className: "font-mono text-[11px] text-[#6b7280]",
      "data-testid": "save-footer",
      title: h,
      children: g
    }
  ), y = "image:save", N = `Save node, template: ${h}, state: ${c}`;
  return /* @__PURE__ */ s(
    we,
    {
      icon: "⬇",
      subtitle: y,
      state: c,
      body: f,
      footer: u,
      selected: o,
      ariaLabel: N,
      hasBreakpoint: r._hasBreakpoint,
      pausedAtBreakpoint: r._pausedAtBreakpoint,
      children: [
        /* @__PURE__ */ t(
          Q,
          {
            type: "target",
            position: Z.Left,
            id: "in",
            className: "!w-2.5 !h-2.5 !bg-[#6b7280]"
          }
        ),
        /* @__PURE__ */ t(
          Q,
          {
            type: "source",
            position: Z.Right,
            id: "out",
            className: "!w-2.5 !h-2.5 !bg-[#6b7280]"
          }
        ),
        /* @__PURE__ */ t(
          Q,
          {
            type: "source",
            position: Z.Right,
            id: "error",
            className: "!w-2.5 !h-2.5 !bg-[#6b7280] !top-[75%]"
          }
        )
      ]
    }
  );
}
const Mo = {
  trigger: ao,
  llm: co,
  transform: uo,
  condition: fo,
  action: xo,
  fork: go,
  join: vo,
  approval: wo,
  agent: ko,
  "mcp-tool": Co,
  "knowledge-base": Io,
  "graph-query": So,
  memory: To,
  guardrail: Ao,
  policy: Ro,
  "ag-ui-output": $o,
  "image-source": Do,
  "image:save": Po
};
function Eo(e) {
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
function Oo({
  id: e,
  sourceX: n,
  sourceY: r,
  targetX: o,
  targetY: a,
  sourcePosition: i,
  targetPosition: d,
  data: c,
  markerEnd: l,
  selected: p
}) {
  const m = c ?? {}, x = Wt(), [f] = Mr({
    sourceX: n,
    sourceY: r,
    targetX: o,
    targetY: a,
    sourcePosition: i,
    targetPosition: d
  }), h = Eo(m.state), g = h.animate && !x, u = p ? "#646cff" : h.stroke, y = p ? 2.5 : h.strokeWidth;
  return /* @__PURE__ */ s(V, { children: [
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
    m.label ? /* @__PURE__ */ t(Er, { children: /* @__PURE__ */ t(
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
        children: m.label
      }
    ) }) : null
  ] });
}
function nt(e, n, r) {
  const o = te(n);
  o.current = n, q(() => {
    if (r === !1) return;
    const a = (i) => {
      e.current && !e.current.contains(i.target) && o.current();
    };
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [e, r]);
}
const Lo = [
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
function _o(e, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return e.type.toLowerCase().includes(r) || e.name.toLowerCase().includes(r) || e.description.toLowerCase().includes(r);
}
function Uo({
  anchor: e,
  flowPosition: n,
  disabledTypes: r = [],
  onClose: o,
  onInsert: a
}) {
  const [i, d] = R(""), [c, l] = R(0), p = te(null), m = te(null), x = L(() => new Set(r), [r]), f = L(
    () => Lo.filter((u) => !x.has(u.type) && _o(u, i)),
    [x, i]
  );
  if (q(() => {
    l((u) => u >= f.length ? 0 : u);
  }, [f.length]), q(() => {
    if (e) {
      const u = setTimeout(() => m.current?.focus(), 0);
      return () => clearTimeout(u);
    }
  }, [e]), nt(p, o, !!e), !e) return null;
  const h = (u) => {
    const y = f[u];
    !y || !n || (a(y.type, n), o());
  }, g = (u) => {
    if (u.key === "ArrowDown") {
      if (u.preventDefault(), f.length === 0) return;
      l((y) => (y + 1) % f.length);
    } else if (u.key === "ArrowUp") {
      if (u.preventDefault(), f.length === 0) return;
      l((y) => (y - 1 + f.length) % f.length);
    } else u.key === "Enter" ? (u.preventDefault(), h(c)) : u.key === "Escape" && (u.preventDefault(), o());
  };
  return /* @__PURE__ */ s(
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
            value: i,
            onChange: (u) => d(u.target.value),
            onKeyDown: g,
            placeholder: "Search nodes…",
            className: "w-full box-border border border-[#d1d5db] rounded-md px-2.5 py-1.5 text-[13px] font-inherit bg-[#f9fafb] text-[#0f172a] outline-none",
            "aria-label": "Search node types",
            "data-testid": "quick-insert-search"
          }
        ) }),
        /* @__PURE__ */ t("div", { className: "max-h-[260px] overflow-y-auto py-1", role: "listbox", children: f.length === 0 ? /* @__PURE__ */ s("div", { className: "px-3 py-3.5 text-xs text-[#94a3b8] font-inherit", children: [
          'No nodes match "',
          i,
          '"'
        ] }) : f.map((u, y) => {
          const N = y === c;
          return /* @__PURE__ */ s(
            "div",
            {
              role: "option",
              "aria-selected": N,
              onMouseEnter: () => l(y),
              onMouseDown: (v) => {
                v.preventDefault(), h(y);
              },
              className: I(
                "flex items-center gap-2.5 px-3 py-2 cursor-pointer font-inherit",
                N ? "bg-[#f1f5f9]" : "bg-transparent"
              ),
              "data-node-type": u.type,
              "data-testid": `quick-insert-row-${u.type}`,
              children: [
                /* @__PURE__ */ t("span", { className: "text-lg leading-none w-[22px] text-center shrink-0", "aria-hidden": !0, children: u.icon }),
                /* @__PURE__ */ s("div", { className: "flex-1 min-w-0", children: [
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
function Bo({
  addNode: e,
  addEdge: n,
  updateNodeData: r,
  getDefinition: o
}) {
  q(() => {
  }, [e, n, r, o]);
}
function Fo({
  definition: e,
  selectedNodeId: n,
  setSelectedNodeId: r,
  removeNode: o,
  removeDefEdge: a,
  setNodes: i,
  setEdges: d,
  setPositions: c,
  duplicateNodes: l,
  clipboardRef: p,
  containerRef: m
}) {
  q(() => {
    const x = m.current;
    if (!x) return;
    const f = (g) => {
      const u = x.querySelector(
        `.react-flow__node[data-id="${CSS.escape(g)}"]`
      );
      return u ? ((u.querySelector('[data-pipeline-node="true"]') ?? u).focus(), !0) : !1;
    }, h = (g) => {
      if (Yt(g.target)) return;
      const u = document.activeElement, y = !!u && x.contains(u);
      if (g.key === "Tab") {
        if (!y || !e || e.nodes.length === 0) return;
        const N = Zo(e);
        if (N.length === 0) return;
        const C = u?.closest(".react-flow__node")?.getAttribute("data-id") ?? null, b = C !== null ? N.indexOf(C) : -1, w = g.shiftKey ? -1 : 1, k = b === -1 ? g.shiftKey ? N.length - 1 : 0 : (b + w + N.length) % N.length, $ = N[k];
        f($) && g.preventDefault();
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
          d((N) => {
            const v = N.filter((C) => C.selected);
            if (v.length === 0) return N;
            for (const C of v) a(C.id);
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
          i((b) => {
            const w = b.map(
              ($) => $.id === n ? {
                ...$,
                position: {
                  x: $.position.x + v,
                  y: $.position.y + C
                }
              } : $
            ), k = w.find(($) => $.id === n);
            return k && c([{ id: k.id, position: k.position }]), w;
          });
        }
      }
    };
    return x.addEventListener("keydown", h), () => x.removeEventListener("keydown", h);
  }, [e, n, r, o, a, i, d, c, l, p, m]);
}
function jo({
  addNode: e,
  screenToFlowPosition: n
}) {
  const r = M((a) => {
    a.preventDefault(), a.dataTransfer.dropEffect = "move";
  }, []), o = M(
    (a) => {
      a.preventDefault();
      const i = a.dataTransfer.getData("application/reactflow");
      if (!i) return;
      let d = null;
      try {
        d = JSON.parse(i);
      } catch {
        return;
      }
      const c = d?.nodeType;
      if (!c) return;
      const l = n({
        x: a.clientX,
        y: a.clientY
      });
      e(c, l);
    },
    [e, n]
  );
  return { handleDragOver: r, handleDrop: o };
}
function zo({
  nodeMenu: e,
  breakpoints: n,
  showBreakpointOption: r,
  onFilterLog: o,
  onCopyNodeId: a,
  onDuplicate: i,
  onToggleBreakpoint: d,
  onDismiss: c
}) {
  q(() => {
    const p = (x) => {
      x.target?.closest('[data-testid="canvas-node-context-menu"]') || c();
    }, m = (x) => {
      x.key === "Escape" && c();
    };
    return document.addEventListener("mousedown", p), window.addEventListener("keydown", m), () => {
      document.removeEventListener("mousedown", p), window.removeEventListener("keydown", m);
    };
  }, [c]);
  const l = "block w-full text-left px-3 py-2 border-none bg-transparent text-[13px] cursor-pointer rounded font-inherit";
  return /* @__PURE__ */ s(
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
            className: I(l, "text-[#0f172a]"),
            children: "🎯 Filter log to this node"
          }
        ),
        /* @__PURE__ */ t(
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
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: i,
            "data-testid": "ctx-duplicate",
            className: I(l, "text-[#0f172a]"),
            children: "📑 Duplicate node"
          }
        ),
        r ? /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "menuitem",
            onClick: d,
            "data-testid": "ctx-toggle-breakpoint",
            className: I(
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
const Vn = [
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
], Gn = Vn.flatMap((e) => e.items.map((n) => ({ type: n.type, name: n.name })));
function qo(e, n) {
  if (!n) return !0;
  const r = n.toLowerCase();
  return e.name.toLowerCase().includes(r) || e.type.toLowerCase().includes(r) || e.description.toLowerCase().includes(r);
}
function Ho({ disabledTypes: e = [] }) {
  const [n, r] = R(""), [o, a] = R(null), i = L(() => new Set(e), [e]), d = L(
    () => Vn.map((l) => ({
      ...l,
      items: l.items.filter((p) => qo(p, n))
    })).filter((l) => l.items.length > 0),
    [n]
  ), c = (l) => (p) => {
    if (i.has(l.type)) {
      p.preventDefault();
      return;
    }
    p.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: l.type })
    ), p.dataTransfer.effectAllowed = "move";
  };
  return /* @__PURE__ */ s("div", { className: "w-[220px] shrink-0 h-full border-r border-[#e2e8f0] bg-white flex flex-col", "data-testid": "node-palette", children: [
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
    /* @__PURE__ */ t("div", { className: "flex-1 overflow-y-auto py-2", children: d.length === 0 ? /* @__PURE__ */ s("div", { className: "px-3.5 py-4 text-xs text-[#94a3b8]", children: [
      'No nodes match "',
      n,
      '"'
    ] }) : d.map((l) => /* @__PURE__ */ s("div", { children: [
      /* @__PURE__ */ t("div", { className: "pt-2 px-[14px] pb-1 text-[10px] font-bold tracking-[0.6px] uppercase text-[#94a3b8] font-[inherit]", children: l.name }),
      l.items.map((p) => {
        const m = i.has(p.type), x = o === p.type && !m, f = Gn.findIndex((g) => g.type === p.type), h = f >= 0 && f < 9 ? f + 1 : null;
        return /* @__PURE__ */ s(
          "div",
          {
            draggable: !m,
            onDragStart: c(p),
            onMouseEnter: () => a(p.type),
            onMouseLeave: () => a(null),
            className: I(
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
              /* @__PURE__ */ s("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ s("div", { className: I("text-[13px] font-semibold text-text-primary flex items-center gap-1.5", m && "line-through"), children: [
                  /* @__PURE__ */ t("span", { children: p.name }),
                  h !== null && /* @__PURE__ */ t(
                    "kbd",
                    {
                      "data-testid": `palette-shortcut-${p.type}`,
                      className: I("text-[10px] font-semibold font-mono text-[#64748b] bg-[#f1f5f9] border border-[#e2e8f0] rounded px-[5px] leading-[14px] min-w-[14px] text-center", m ? "opacity-50" : "opacity-100"),
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
function Ko({
  definition: e,
  addNode: n,
  screenToFlowPosition: r,
  containerRef: o
}) {
  return q(() => {
    const a = (i) => {
      if (!Yt(i.target) && !(i.metaKey || i.ctrlKey || i.altKey) && /^[1-8]$/.test(i.key)) {
        const d = Number(i.key) - 1, c = Gn[d];
        if (!c || c.type === "trigger" && e?.nodes.some((h) => h.type === "trigger"))
          return;
        const p = o.current?.getBoundingClientRect(), m = p ? r({
          x: p.left + p.width / 2,
          y: p.top + p.height / 2
        }) : { x: 0, y: 0 };
        let { x, y: f } = m;
        if (e)
          for (const h of e.nodes)
            Math.abs(h.position.x - x) < 16 && Math.abs(h.position.y - f) < 16 && (x += 24, f += 24);
        n(c.type, { x, y: f }), i.preventDefault();
      }
    };
    return window.addEventListener("keydown", a), () => window.removeEventListener("keydown", a);
  }, [n, e, r, o]), null;
}
const Wo = 280, Jo = 120, Vo = 40, Go = 40;
function Yo(e, n) {
  const r = Wo, o = Jo, a = Vo, i = Go;
  if (e.nodes.length === 0) return [];
  const d = /* @__PURE__ */ new Map();
  for (const y of e.nodes)
    d.set(y.id, []);
  for (const y of e.edges) {
    const N = d.get(y.source);
    N && d.has(y.target) && N.push(y.target);
  }
  const l = e.nodes.filter((y) => y.type === "trigger").map((y) => y.id).sort()[0], p = /* @__PURE__ */ new Map();
  if (l !== void 0) {
    const y = [l];
    for (p.set(l, 0); y.length > 0; ) {
      const N = y.shift(), v = p.get(N), C = d.get(N) ?? [];
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
    const N = m.get(y), v = N.length, C = a + y * r;
    for (let b = 0; b < v; b++) {
      const w = i + (b - v / 2) * o;
      g.push({ id: N[b], position: { x: C, y: w } });
    }
  }
  return g;
}
function Xo({
  definition: e,
  setPositions: n,
  fitView: r
}) {
  const o = M(() => {
    r({ padding: 0.15, duration: 500 });
  }, [r]), a = M(() => {
    if (!e) return;
    const i = Yo(e);
    i.length !== 0 && (n(i), typeof requestAnimationFrame == "function" ? requestAnimationFrame(() => r({ padding: 0.15, duration: 500 })) : r({ padding: 0.15, duration: 500 }));
  }, [e, n, r]);
  return { handleFitView: o, handleAutoArrange: a };
}
function Qo({
  definition: e,
  setPositions: n,
  fitView: r
}) {
  const { handleFitView: o, handleAutoArrange: a } = Xo({
    definition: e,
    setPositions: n,
    fitView: r
  });
  return q(() => {
    const i = (d) => {
      const c = d.target;
      if (!(c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable)) && d.shiftKey && (d.key === "A" || d.key === "a")) {
        if (d.metaKey || d.ctrlKey || d.altKey) return;
        d.preventDefault(), a();
      }
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [a]), /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: a,
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
function Yt(e) {
  if (!e || !(e instanceof HTMLElement)) return !1;
  const n = e.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || e.isContentEditable);
}
function Zo(e) {
  if (e.nodes.length === 0) return [];
  const n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const i of e.nodes)
    n.set(i.id, []), r.set(i.id, 0);
  for (const i of e.edges)
    !n.has(i.source) || !r.has(i.target) || (n.get(i.source).push(i.target), r.set(i.target, (r.get(i.target) ?? 0) + 1));
  const o = [], a = e.nodes.filter((i) => (r.get(i.id) ?? 0) === 0).map((i) => i.id).sort();
  for (; a.length > 0; ) {
    const i = a.shift();
    o.push(i);
    const d = (n.get(i) ?? []).slice().sort();
    for (const c of d) {
      const l = (r.get(c) ?? 0) - 1;
      r.set(c, l), l === 0 && a.push(c);
    }
  }
  if (o.length < e.nodes.length) {
    const i = new Set(o), d = e.nodes.filter((c) => !i.has(c.id)).map((c) => c.id).sort();
    o.push(...d);
  }
  return o;
}
const es = { animated: Oo }, ts = Mo;
function ns(e) {
  return {
    id: e.id,
    type: e.type,
    position: e.position,
    data: { ...e.data, nodeType: e.type }
  };
}
function rs(e) {
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
function os({ onFilterLog: e, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: o, replayNodeClasses: a, breakpoints: i, onToggleBreakpoint: d, pausedAtNodeId: c }) {
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
  } = Je(), { screenToFlowPosition: v, fitView: C } = Lr();
  Bo({
    addNode: p,
    addEdge: x,
    updateNodeData: N,
    getDefinition: () => l
  });
  const [b, w, k] = _r([]), [$, S, A] = Ur([]), [D, H] = R(!0), [G, ee] = R(!0), ie = te(null), le = te(null), [oe, ue] = R(null), [O, Y] = R(null), W = M(
    (_, K) => {
      _.preventDefault(), Y({ nodeId: K.id, x: _.clientX, y: _.clientY });
    },
    []
  ), F = M(() => {
    O && (e?.(O.nodeId), Y(null));
  }, [O, e]), J = M(() => {
    if (!O) return;
    const _ = O.nodeId;
    typeof navigator < "u" && navigator.clipboard?.writeText && navigator.clipboard.writeText(_).catch(() => {
    }), Y(null);
  }, [O]), de = M(() => {
    O && (d?.(O.nodeId), Y(null));
  }, [O, d]), pe = M(() => {
    if (!O) return;
    const _ = g([O.nodeId]);
    _.length > 0 && y(_[0]), Y(null);
  }, [O, g, y]), be = M(() => Y(null), []);
  q(() => {
    if (!l) {
      w([]), S([]);
      return;
    }
    w((_) => {
      const K = new Map(_.map((se) => [se.id, se]));
      return l.nodes.map((se) => {
        const me = K.get(se.id), Ie = ns(se);
        return i && i.size > 0 && (Ie.data._hasBreakpoint = i.has(se.id)), c && (Ie.data._pausedAtBreakpoint = se.id === c), me ? { ...me, ...Ie, selected: me.selected } : Ie;
      });
    }), S(() => l.edges.map(rs));
  }, [l, i, c, w, S]), q(() => {
    if (!n) {
      r?.(null);
      return;
    }
    w(
      (_) => _.map((K) => ({
        ...K,
        className: K.id === n ? "node-error" : K.className?.replace("node-error", "").trim() || void 0
      }))
    ), requestAnimationFrame(() => {
      const _ = ie.current;
      if (!_) return;
      const K = _.querySelector(
        `.react-flow__node[data-id="${CSS.escape(n)}"]`
      );
      if (!K) {
        r?.(null);
        return;
      }
      const se = K.getBoundingClientRect();
      r?.({ x: se.right, y: se.top + se.height / 2 });
    });
  }, [n, w, r]), q(() => {
    a && w(
      (_) => _.map((K) => {
        const se = a[K.id] ?? "", Ie = [K.id === n ? "node-error" : "", se].filter(Boolean).join(" ") || void 0;
        let ke;
        se === "node-replay-active" ? ke = "running" : se === "node-replay-completed" ? ke = "completed" : se === "node-replay-failed" && (ke = "failed");
        const je = { ...K.data };
        return ke ? je._state = ke : je._state = "idle", { ...K, className: Ie, data: je };
      })
    );
  }, [a, n, w]), q(() => {
    o && S(
      (_) => _.map((K) => {
        const se = o[K.id];
        if (!se) return K;
        const me = K.data ?? {};
        return me.state === se ? K : { ...K, data: { ...me, state: se } };
      })
    );
  }, [o, S]);
  const E = M(
    (_) => {
      k(_);
      const K = [], se = [];
      for (const me of _)
        me.type === "position" && me.position && me.dragging === !1 ? K.push({ id: me.id, position: me.position }) : me.type === "remove" && se.push(me.id);
      K.length && m(K);
      for (const me of se) h(me);
    },
    [k, m, h]
  ), re = M(
    (_) => {
      A(_);
      for (const K of _)
        K.type === "remove" && f(K.id);
    },
    [A, f]
  ), ge = M(
    (_) => {
      if (!l || !_.source || !_.target) return;
      const K = l.nodes.find((ke) => ke.id === _.source), se = l.nodes.find((ke) => ke.id === _.target);
      if (!K || !se) return;
      const me = _.sourceHandle ?? "out", Ie = _.targetHandle ?? "in";
      zt(
        K.type,
        me,
        se.type,
        Ie
      ) && x({
        source: _.source,
        sourceHandle: me,
        target: _.target,
        targetHandle: Ie
      });
    },
    [l, x]
  ), $e = M(
    (_) => {
      if (!l || !_.source || !_.target) return !1;
      const K = l.nodes.find((me) => me.id === _.source), se = l.nodes.find((me) => me.id === _.target);
      return !K || !se ? !1 : zt(
        K.type,
        _.sourceHandle ?? "out",
        se.type,
        _.targetHandle ?? "in"
      );
    },
    [l]
  ), qe = M(
    (_, K) => {
      y(K.id);
    },
    [y]
  ), Me = M(() => {
    y(null);
  }, [y]), Ae = M(
    (_) => {
      const K = _.target;
      if (!K || !(K.classList.contains("react-flow__pane") || K.classList.contains("react-flow__renderer") || K.classList.contains("react-flow__viewport") || K.classList.contains("react-flow"))) return;
      _.preventDefault();
      const me = v({ x: _.clientX, y: _.clientY });
      ue({
        anchor: { x: _.clientX, y: _.clientY },
        flowPosition: me
      });
    },
    [v]
  ), Le = M(() => ue(null), []), Ee = M(
    (_, K) => {
      p(_, K);
    },
    [p]
  ), _e = L(() => l ? l.nodes.some((_) => _.type === "trigger") ? ["trigger"] : [] : [], [l]), { handleDragOver: ye, handleDrop: ce } = jo({
    addNode: p,
    screenToFlowPosition: v
  });
  q(() => {
    const _ = (K) => {
      if (!Yt(K.target) && !(K.metaKey || K.ctrlKey || K.altKey)) {
        if (K.key === "m" || K.key === "M") {
          H((se) => !se);
          return;
        }
        if (K.key === "c" || K.key === "C") {
          ee((se) => !se);
          return;
        }
      }
    };
    return window.addEventListener("keydown", _), () => window.removeEventListener("keydown", _);
  }, []), Fo({
    definition: l,
    selectedNodeId: u,
    setSelectedNodeId: y,
    removeNode: h,
    removeDefEdge: f,
    setNodes: w,
    setEdges: S,
    setPositions: m,
    duplicateNodes: g,
    clipboardRef: le,
    containerRef: ie
  });
  const z = M((_) => {
    switch (_.data?._state) {
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
  return /* @__PURE__ */ s(
    "div",
    {
      ref: ie,
      className: "flex-1 min-w-0 min-h-[520px] relative bg-[#fafbfc]",
      role: "application",
      "aria-label": "Pipeline editor canvas",
      tabIndex: 0,
      "data-testid": "pipeline-canvas",
      onDragOver: ye,
      onDrop: ce,
      onDoubleClick: Ae,
      children: [
        /* @__PURE__ */ s(
          Br,
          {
            nodes: b,
            edges: $,
            nodeTypes: ts,
            edgeTypes: es,
            onNodesChange: E,
            onEdgesChange: re,
            onConnect: ge,
            isValidConnection: $e,
            onNodeClick: qe,
            onNodeContextMenu: W,
            onPaneClick: Me,
            fitView: !0,
            snapToGrid: !0,
            snapGrid: [16, 16],
            edgesFocusable: !0,
            defaultEdgeOptions: { type: "smoothstep" },
            proOptions: { hideAttribution: !0 },
            children: [
              /* @__PURE__ */ t(
                Fr,
                {
                  variant: jr.Dots,
                  gap: 16,
                  size: 1,
                  color: "#e2e8f0",
                  bgColor: "#fafbfc"
                }
              ),
              G ? /* @__PURE__ */ t(
                zr,
                {
                  position: "bottom-left",
                  showZoom: !0,
                  showFitView: !0,
                  showInteractive: !0,
                  className: "!bg-white !border !border-border !rounded-md !shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                }
              ) : null,
              D ? /* @__PURE__ */ t(
                qr,
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
          Uo,
          {
            anchor: oe.anchor,
            flowPosition: oe.flowPosition,
            disabledTypes: _e,
            onClose: Le,
            onInsert: Ee
          }
        ) : null,
        /* @__PURE__ */ t(
          Ko,
          {
            definition: l,
            addNode: p,
            screenToFlowPosition: v,
            containerRef: ie
          }
        ),
        /* @__PURE__ */ t(
          Qo,
          {
            definition: l,
            setPositions: m,
            fitView: C
          }
        ),
        O ? /* @__PURE__ */ t(
          zo,
          {
            nodeMenu: O,
            breakpoints: i,
            showBreakpointOption: !!d,
            onFilterLog: F,
            onCopyNodeId: J,
            onDuplicate: pe,
            onToggleBreakpoint: de,
            onDismiss: be
          }
        ) : null
      ]
    }
  );
}
function ss({ onFilterLog: e, errorNodeId: n, onErrorNodePosition: r, replayEdgeStates: o, replayNodeClasses: a, breakpoints: i, onToggleBreakpoint: d, pausedAtNodeId: c } = {}) {
  return /* @__PURE__ */ t(Or, { children: /* @__PURE__ */ t(
    os,
    {
      onFilterLog: e,
      errorNodeId: n,
      onErrorNodePosition: r,
      replayEdgeStates: o,
      replayNodeClasses: a,
      breakpoints: i,
      onToggleBreakpoint: d,
      pausedAtNodeId: c
    }
  ) });
}
const ln = {
  LLMError: { bg: "#fef2f2", fg: "#dc2626" },
  TimeoutError: { bg: "#fff7ed", fg: "#ea580c" },
  NetworkError: { bg: "#fffbeb", fg: "#d97706" },
  ValidationError: { bg: "#fefce8", fg: "#ca8a04" },
  RegistryConflict: { bg: "#faf5ff", fg: "#9333ea" },
  UnknownError: { bg: "#f1f5f9", fg: "#475569" }
};
function as(e) {
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
function is({ error: e, anchor: n, onDismiss: r, onRetry: o }) {
  const [a, i] = R(!1), [d, c] = R(!1), l = e.errorCategory ?? "UnknownError", p = ln[l] ?? ln.UnknownError, m = M(async () => {
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
      typeof navigator < "u" && navigator.clipboard?.writeText && (await navigator.clipboard.writeText(g), c(!0), setTimeout(() => c(!1), 2e3));
    } catch {
    }
  }, [e, l]), x = M(() => {
    o?.();
  }, [o]), f = Math.min(n.y + 8, window.innerHeight - 440), h = Math.min(n.x + 12, window.innerWidth - 360);
  return /* @__PURE__ */ s(
    "div",
    {
      className: "fixed z-[100] bg-white border border-[#e2e8f0] rounded-[10px] shadow-[0_12px_32px_rgba(15,23,42,0.18),0_2px_6px_rgba(15,23,42,0.08)] p-0 w-[340px] max-h-[420px] overflow-y-auto font-inherit text-[#0f172a]",
      style: { top: Math.max(8, f), left: Math.max(8, h) },
      "data-testid": "error-overlay",
      role: "dialog",
      "aria-label": `Error details for node ${e.nodeId}`,
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2 px-3.5 pt-3 pb-2.5 border-b border-[#e2e8f0]", children: [
          /* @__PURE__ */ t(
            "span",
            {
              className: "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold leading-snug",
              style: { background: p.bg, color: p.fg },
              "data-testid": "error-category-badge",
              children: as(l)
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
        /* @__PURE__ */ s("div", { className: "px-3.5 py-3 flex flex-col gap-2.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] leading-normal text-[#0f172a]", children: e.message }),
          /* @__PURE__ */ s("div", { className: "text-[11px] text-[#94a3b8]", children: [
            "Failed node:",
            " ",
            /* @__PURE__ */ t("code", { className: "bg-[#f1f5f9] px-[5px] py-px rounded-[3px] font-mono text-[11px] text-[#475569]", children: e.nodeId })
          ] }),
          e.stack && /* @__PURE__ */ s("div", { children: [
            /* @__PURE__ */ s(
              "button",
              {
                type: "button",
                onClick: () => i((g) => !g),
                className: "bg-transparent border-none p-0 cursor-pointer text-xs font-medium text-[#475569] font-inherit",
                "data-testid": "error-stack-toggle",
                children: [
                  a ? "▾" : "▸",
                  " Stack trace"
                ]
              }
            ),
            a && /* @__PURE__ */ t(
              "pre",
              {
                className: "mt-1.5 p-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-md text-[10px] leading-normal font-mono text-[#475569] whitespace-pre-wrap break-all max-h-40 overflow-y-auto m-0",
                "data-testid": "error-stack-content",
                children: e.stack
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ s("div", { className: "flex gap-2 px-3.5 pt-2.5 pb-3 border-t border-[#e2e8f0]", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: m,
              className: "px-3 py-1.5 text-xs font-semibold border-none rounded-md cursor-pointer font-inherit leading-snug bg-[#f1f5f9] text-[#475569]",
              "data-testid": "error-copy-btn",
              children: d ? "Copied!" : "Copy error details"
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
function ls(e, n) {
  const r = /* @__PURE__ */ new Map();
  for (const a of e)
    r.set(a.id, []);
  for (const a of n) {
    const i = r.get(a.source);
    i && i.push({ target: a.target, edgeId: a.id });
  }
  const o = /* @__PURE__ */ new Map();
  for (const a of e)
    o.set(a.id, 0);
  for (const a of e) {
    if (o.get(a.id) !== 0) continue;
    const i = [
      { nodeId: a.id, index: 0 }
    ];
    for (o.set(a.id, 1); i.length > 0; ) {
      const d = i[i.length - 1], c = r.get(d.nodeId) ?? [];
      if (d.index >= c.length) {
        o.set(d.nodeId, 2), i.pop();
        continue;
      }
      const l = c[d.index];
      d.index += 1;
      const p = o.get(l.target);
      if (p === 1)
        return l.edgeId;
      p === 0 && (o.set(l.target, 1), i.push({ nodeId: l.target, index: 0 }));
    }
  }
  return null;
}
function Yn(e) {
  const n = [], r = [], { nodes: o, edges: a } = e, i = /* @__PURE__ */ new Map();
  for (const d of o)
    i.set(d.id, d);
  return cs(o, n), ds(o, a, n), ps(a, i, n), us(o, n), vs(o, a, n), Ns(o, a, r), ws(o, a, r), ks(o, a, r), Cs(o, a, r), r.push(...Is(e)), r.push(...Ss(e)), r.push(...Ts(e)), r.push(...As(e)), r.push(...Rs(e)), r.push(...$s(e)), r.push(...Ds(e)), r.push(...Ps(e)), r.push(...Ms(e)), r.push(...Es(e)), {
    errors: n,
    warnings: r,
    isValid: n.length === 0,
    canPublish: n.length === 0
  };
}
function cs(e, n) {
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
function ds(e, n, r) {
  const o = ls(e, n);
  o !== null && r.push({
    code: "CYCLE_DETECTED",
    severity: "error",
    message: "Pipeline contains a cycle.",
    edgeId: o
  });
}
function ps(e, n, r) {
  for (const o of e) {
    const a = n.get(o.source), i = n.get(o.target);
    if (!a || !i) {
      r.push({
        code: "INVALID_HANDLE",
        severity: "error",
        message: "Edge references a node that does not exist.",
        edgeId: o.id
      });
      continue;
    }
    zt(
      a.type,
      o.sourceHandle,
      i.type,
      o.targetHandle
    ) || r.push({
      code: "INVALID_HANDLE",
      severity: "error",
      message: `Invalid connection: ${a.type}.${o.sourceHandle} → ${i.type}.${o.targetHandle}.`,
      edgeId: o.id
    });
  }
}
function us(e, n) {
  for (const r of e)
    switch (r.data.type) {
      case "llm":
        ms(r.id, r.data, n);
        break;
      case "transform":
        fs(r.id, r.data, n);
        break;
      case "condition":
        hs(r.id, r.data, n);
        break;
      case "action":
        xs(r.id, r.data, n);
        break;
      case "fork":
        gs(r.id, r.data, n);
        break;
      case "join":
        bs(r.id, r.data, n);
        break;
      case "approval":
        ys(r.id, r.data, n);
        break;
    }
}
function ms(e, n, r) {
  n.provider || Fe(r, e, "provider"), (!n.model || !n.model.trim()) && Fe(r, e, "model"), (!n.systemPrompt || !n.systemPrompt.trim()) && Fe(r, e, "systemPrompt"), (!n.userPromptTemplate || !n.userPromptTemplate.trim()) && Fe(r, e, "userPromptTemplate");
}
function fs(e, n, r) {
  n.transformType || Fe(r, e, "transformType"), (!n.expression || !n.expression.trim()) && Fe(r, e, "expression");
}
function hs(e, n, r) {
  (!n.expression || !n.expression.trim()) && Fe(r, e, "expression");
}
function xs(e, n, r) {
  n.actionType || Fe(r, e, "actionType");
}
function gs(e, n, r) {
  (typeof n.branchCount != "number" || n.branchCount < 2) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Fork requires branchCount ≥ 2.",
    nodeId: e,
    field: "branchCount"
  });
}
function bs(e, n, r) {
  n.mode || Fe(r, e, "mode"), n.mergeStrategy || Fe(r, e, "mergeStrategy"), n.mode === "n_of_m" && (typeof n.n != "number" || n.n < 1) && r.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: "Join mode 'n_of_m' requires a numeric n ≥ 1.",
    nodeId: e,
    field: "n"
  });
}
function ys(e, n, r) {
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
function vs(e, n, r) {
  const o = /* @__PURE__ */ new Map();
  for (const a of n)
    o.set(a.target, (o.get(a.target) ?? 0) + 1);
  for (const a of e) {
    if (a.type !== "join") continue;
    (o.get(a.id) ?? 0) < 2 && r.push({
      code: "JOIN_INSUFFICIENT_INPUTS",
      severity: "error",
      message: "Join node requires at least 2 incoming edges.",
      nodeId: a.id
    });
  }
}
function Fe(e, n, r) {
  e.push({
    code: "MISSING_CONFIG",
    severity: "error",
    message: `Missing required field '${r}'.`,
    nodeId: n,
    field: r
  });
}
function Ns(e, n, r) {
  const o = e.filter((c) => c.type === "trigger");
  if (o.length !== 1) return;
  const a = /* @__PURE__ */ new Map();
  for (const c of e) a.set(c.id, []);
  for (const c of n)
    a.get(c.source)?.push(c.target);
  const i = /* @__PURE__ */ new Set(), d = [o[0].id];
  for (i.add(o[0].id); d.length > 0; ) {
    const c = d.shift();
    for (const l of a.get(c) ?? [])
      i.has(l) || (i.add(l), d.push(l));
  }
  for (const c of e)
    i.has(c.id) || r.push({
      code: "ORPHAN_NODE",
      severity: "warning",
      message: "Node is unreachable from the Trigger.",
      nodeId: c.id
    });
}
function ws(e, n, r) {
  const o = /* @__PURE__ */ new Set();
  for (const a of n) o.add(a.source);
  for (const a of e)
    o.has(a.id) || a.data.terminal !== !0 && r.push({
      code: "DEAD_END",
      severity: "warning",
      message: "Node has no outgoing edges.",
      nodeId: a.id
    });
}
function ks(e, n, r) {
  const o = /* @__PURE__ */ new Map();
  for (const a of n) {
    const i = o.get(a.source) ?? /* @__PURE__ */ new Set();
    i.add(a.sourceHandle), o.set(a.source, i);
  }
  for (const a of e) {
    if (a.data.type !== "fork") continue;
    const i = a.data.branchCount, d = o.get(a.id) ?? /* @__PURE__ */ new Set();
    for (let c = 0; c < i; c += 1) {
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
function Cs(e, n, r) {
  const o = /* @__PURE__ */ new Map();
  for (const a of n) {
    const i = o.get(a.source) ?? /* @__PURE__ */ new Set();
    i.add(a.sourceHandle), o.set(a.source, i);
  }
  for (const a of e) {
    if (a.type !== "condition") continue;
    const i = o.get(a.id) ?? /* @__PURE__ */ new Set();
    for (const d of ["true", "false"])
      i.has(d) || r.push({
        code: "UNUSED_CONDITION_BRANCH",
        severity: "warning",
        message: `Condition branch '${d}' has no connected edge.`,
        nodeId: a.id,
        field: d
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
function Is(e) {
  const n = [], r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (const c of e.nodes)
    r.set(c.id, []), o.set(c.id, []);
  for (const c of e.edges)
    c.sourceHandle !== "error" && r.get(c.source)?.push(c.target), o.get(c.target)?.push(c.source);
  const a = /* @__PURE__ */ new Map();
  for (const c of e.nodes) a.set(c.id, c);
  function i(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [];
    for (const m of r.get(c) ?? [])
      l.has(m) || (l.add(m), p.push(m));
    for (; p.length > 0; ) {
      const m = p.shift();
      if (a.get(m)?.type === "join") return !0;
      for (const f of r.get(m) ?? [])
        l.has(f) || (l.add(f), p.push(f));
    }
    return !1;
  }
  function d(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [];
    for (const m of o.get(c) ?? [])
      l.has(m) || (l.add(m), p.push(m));
    for (; p.length > 0; ) {
      const m = p.shift();
      if (a.get(m)?.type === "fork") return !0;
      for (const f of o.get(m) ?? [])
        l.has(f) || (l.add(f), p.push(f));
    }
    return !1;
  }
  for (const c of e.nodes)
    c.data.type !== "llm" && c.data.type !== "action" || e.edges.some(
      (p) => p.source === c.id && p.sourceHandle === "error"
    ) || d(c.id) && i(c.id) || n.push({
      code: "NO_ERROR_HANDLER",
      severity: "warning",
      message: `${c.data.type} node '${We(c)}' has no error handler — failures will terminate the run.`,
      nodeId: c.id
    });
  return n;
}
function Ss(e) {
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
function Ts(e) {
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
function As(e) {
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
function Rs(e) {
  const r = e.nodes.filter((p) => p.type === "trigger");
  if (r.length !== 1) return [];
  const o = /* @__PURE__ */ new Map();
  for (const p of e.nodes) o.set(p.id, []);
  for (const p of e.edges) o.get(p.source)?.push(p.target);
  const a = /* @__PURE__ */ new Map(), i = [r[0].id];
  a.set(r[0].id, 1);
  const d = e.nodes.length * e.nodes.length + 1;
  let c = 0;
  for (; i.length > 0; ) {
    if (c++ > d) return [];
    const p = i.shift(), m = a.get(p);
    for (const x of o.get(p) ?? []) {
      const f = a.get(x);
      (f === void 0 || m + 1 > f) && (a.set(x, m + 1), i.push(x));
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
function $s(e) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const o of e.nodes) {
    const a = We(o), i = r.get(a) ?? [];
    i.push(o), r.set(a, i);
  }
  for (const [o, a] of r)
    if (!(a.length < 2))
      for (const i of a)
        n.push({
          code: "DUPLICATE_NODE_NAME",
          severity: "warning",
          message: `Multiple nodes named '${o}'; consider disambiguating.`,
          nodeId: i.id
        });
  return n;
}
function Ds(e) {
  const n = [], r = /\{\{[^}]+\}\}/;
  for (const o of e.nodes) {
    if (o.data.type !== "llm") continue;
    const { temperature: a, userPromptTemplate: i } = o.data;
    typeof a != "number" || a <= 0.8 || !i || !r.test(i) || n.push({
      code: "LOW_TEMPERATURE_NON_DETERMINISTIC_PROMPT",
      severity: "warning",
      message: `LLM '${We(o)}' uses high temperature with templated inputs — outputs will be non-deterministic, pair with a retry or validation downstream.`,
      nodeId: o.id
    });
  }
  return n;
}
function Ps(e) {
  return e.triggerBinding?.event !== "schedule" ? [] : e.status !== "draft" ? [] : [
    {
      code: "NO_PUBLISHED_VERSION_BUT_TRIGGER_SCHEDULED",
      severity: "warning",
      message: "Scheduled trigger on a draft pipeline — schedules won't fire until published."
    }
  ];
}
function Ms(e) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const o of e.edges) {
    const a = r.get(o.source) ?? /* @__PURE__ */ new Set();
    a.add(o.sourceHandle), r.set(o.source, a);
  }
  for (const o of e.nodes) {
    if (o.type !== "condition") continue;
    const a = r.get(o.id) ?? /* @__PURE__ */ new Set(), i = a.has("true"), d = a.has("false");
    i && !d && n.push({
      code: "UNREACHABLE_AFTER_CONDITION_FALSE",
      severity: "warning",
      message: `Condition '${We(o)}' has no edge from its 'false' handle — any node intended for the false branch is unreachable.`,
      nodeId: o.id,
      field: "false"
    });
  }
  return n;
}
function Es(e) {
  const n = [], r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  for (const c of e.nodes)
    r.set(c.id, []), o.set(c.id, []);
  for (const c of e.edges)
    r.get(c.source)?.push({ target: c.target, sourceHandle: c.sourceHandle }), o.get(c.target)?.push(c.source);
  const a = /* @__PURE__ */ new Map();
  for (const c of e.nodes) a.set(c.id, c);
  function i(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [c];
    for (; p.length > 0; ) {
      const m = p.shift(), x = a.get(m);
      if (x && x.type === "join" && m !== c) return m;
      for (const { target: f } of r.get(m) ?? [])
        l.has(f) || (l.add(f), p.push(f));
    }
    return null;
  }
  function d(c) {
    const l = /* @__PURE__ */ new Set([c]), p = [c];
    for (; p.length > 0; ) {
      const m = p.shift(), x = a.get(m);
      if (x && x.type === "fork" && m !== c) return m;
      for (const f of o.get(m) ?? [])
        l.has(f) || (l.add(f), p.push(f));
    }
    return null;
  }
  for (const c of e.nodes) {
    if (c.data.type !== "fork") continue;
    const l = r.get(c.id) ?? [];
    if (l.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const { target: f } of l)
      p.add(i(f));
    const m = p.has(null), x = [...p].filter((f) => f !== null);
    (m || x.length !== 1) && n.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Fork '${We(c)}' branches do not converge in a single Join — parallel branches may diverge or terminate without merging.`,
      nodeId: c.id
    });
  }
  for (const c of e.nodes) {
    if (c.data.type !== "join") continue;
    const l = o.get(c.id) ?? [];
    if (l.length === 0) continue;
    const p = /* @__PURE__ */ new Set();
    for (const f of l)
      p.add(d(f));
    const m = p.has(null), x = [...p].filter((f) => f !== null);
    (m || x.length !== 1) && n.push({
      code: "FORK_WITHOUT_MATCHING_JOIN",
      severity: "warning",
      message: `Join '${We(c)}' has no matching upstream Fork — its incoming branches don't share a common Fork ancestor.`,
      nodeId: c.id
    });
  }
  return n;
}
function Os(e, n) {
  return `${e}${n}`;
}
const Ls = {
  trigger: "t",
  llm: "llm",
  transform: "x",
  condition: "c",
  action: "a",
  fork: "f",
  join: "j",
  approval: "ap"
}, _s = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function Xn(e) {
  return e.replace(/"/g, "&quot;").replace(/#/g, "&#35;").replace(/\n/g, "<br/>");
}
const Us = {
  trigger: "Trigger",
  llm: "LLM",
  transform: "Transform",
  condition: "Condition",
  action: "Action",
  fork: "Fork",
  join: "Join",
  approval: "Approval"
};
function Bs(e) {
  const n = _s[e.type] ?? "■", r = Us[e.type] ?? e.type.charAt(0).toUpperCase() + e.type.slice(1);
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
      const d = e.data.approvers?.length ?? 0;
      o = `${d} approver${d === 1 ? "" : "s"}`;
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
  const a = `${n} ${r}`;
  return Xn(o ? `${a}<br/>${o}` : a);
}
function Fs(e, n) {
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
function js(e) {
  return !e || e === "out" ? null : e;
}
function zs(e) {
  const n = ["flowchart TD"], r = {}, o = /* @__PURE__ */ new Map();
  for (const a of e.nodes) {
    const i = Ls[a.type] ?? "n", d = r[i] = (r[i] ?? 0) + 1;
    o.set(a.id, Os(i, d));
  }
  for (const a of e.nodes) {
    const i = o.get(a.id);
    if (!i) continue;
    const d = Fs(a.type, Bs(a));
    n.push(`  ${i}${d}`);
  }
  for (const a of e.edges) {
    const i = o.get(a.source), d = o.get(a.target);
    if (!i || !d) continue;
    const c = js(a.sourceHandle);
    c ? n.push(`  ${i} --"${Xn(c)}"--> ${d}`) : n.push(`  ${i} --> ${d}`);
  }
  return n.join(`
`);
}
function cn(e) {
  return JSON.stringify(e, (n, r) => {
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const o = Object.keys(r).sort(), a = {};
      for (const i of o) a[i] = r[i];
      return a;
    }
    return r;
  });
}
function dn(e) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e) n.set(r.id, r);
  return n;
}
function pn(e) {
  return new Set(e.edges.map((n) => n.id));
}
function qs(e, n) {
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
  const r = dn(e.nodes), o = dn(n.nodes), a = [], i = [], d = [];
  for (const [v, C] of r) {
    const b = o.get(v);
    if (!b) {
      a.push({ node: C, dataChanged: !0, positionChanged: !1 });
      continue;
    }
    const w = cn(C.data) !== cn(b.data), k = C.position.x !== b.position.x || C.position.y !== b.position.y;
    (w || k) && d.push({ node: C, dataChanged: w, positionChanged: k });
  }
  for (const [v, C] of o)
    r.has(v) || i.push({ node: C, dataChanged: !0, positionChanged: !1 });
  const c = pn(e), l = pn(n);
  let p = 0, m = 0;
  for (const v of c) l.has(v) || p++;
  for (const v of l) c.has(v) || m++;
  const x = e.name !== n.name, f = (e.icon ?? "") !== (n.icon ?? ""), h = new Set(e.tags ?? []), g = new Set(n.tags ?? []), u = [], y = [];
  for (const v of h) g.has(v) || u.push(v);
  for (const v of g) h.has(v) || y.push(v);
  const N = u.length > 0 || y.length > 0;
  return {
    addedNodes: a,
    removedNodes: i,
    modifiedNodes: d,
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
const Hs = {
  trigger: "▶",
  llm: "🧠",
  transform: "⚙",
  condition: "❓",
  action: "⚡",
  fork: "🔀",
  join: "🔗",
  approval: "✋"
};
function Ks(e) {
  return e.data.type === "condition" && e.data.label ? e.data.label : e.data.type === "llm" ? e.data.model : e.data.type === "action" ? e.data.actionType : e.data.type === "trigger" ? e.data.triggerType : e.type.charAt(0).toUpperCase() + e.type.slice(1);
}
function $t(e, n, r) {
  const o = e.node, a = Hs[o.type] ?? "■", i = n !== "removed" && !!r;
  return /* @__PURE__ */ s(
    "button",
    {
      type: "button",
      disabled: !i,
      onClick: i ? () => r(e.node.id) : void 0,
      className: I(
        "flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-[inherit] bg-[#f8fafc] border border-border text-left w-full text-text-primary",
        i ? "cursor-pointer" : "cursor-default",
        n === "removed" && "opacity-85"
      ),
      "data-testid": `diff-row-${n}`,
      children: [
        /* @__PURE__ */ t("span", { className: "text-sm", children: a }),
        /* @__PURE__ */ t("span", { className: "font-semibold", children: o.type }),
        /* @__PURE__ */ t("span", { className: "text-text-secondary flex-1 overflow-hidden text-ellipsis whitespace-nowrap", children: Ks(o) }),
        n === "modified" && e.positionChanged ? /* @__PURE__ */ t("span", { className: "inline-flex items-center px-1.5 py-px rounded text-[10px] font-semibold bg-[#fef3c7] text-[#92400e]", children: "moved" }) : null
      ]
    },
    `${n}-${e.node.id}`
  );
}
function Ws({
  open: e,
  onClose: n,
  currentDef: r,
  publishedDef: o,
  onJumpToNode: a
}) {
  const i = L(
    () => qs(r, o),
    [r, o]
  ), d = (m) => {
    a && a(m), n();
  }, c = o !== null, l = r.version, p = r.publishedVersion;
  return /* @__PURE__ */ s(
    ze,
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
        /* @__PURE__ */ s("div", { className: "text-[13px] text-text-primary mb-3 flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ s("strong", { children: [
            "v",
            l
          ] }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "vs" }),
          typeof p == "number" ? /* @__PURE__ */ s("strong", { children: [
            "published v",
            p
          ] }) : /* @__PURE__ */ t("strong", { className: "text-text-secondary", children: "never published" })
        ] }),
        r.publishedVersion === void 0 ? /* @__PURE__ */ t("p", { className: "m-0 text-[13px] text-text-secondary", children: "This pipeline has never been published." }) : c ? /* @__PURE__ */ s(V, { children: [
          /* @__PURE__ */ s("div", { className: "flex gap-3 flex-wrap", children: [
            /* @__PURE__ */ s("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ s("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Added (",
                i.addedNodes.length,
                ")"
              ] }),
              i.addedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : i.addedNodes.map((m) => $t(m, "added", d))
            ] }),
            /* @__PURE__ */ s("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ s("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Removed (",
                i.removedNodes.length,
                ")"
              ] }),
              i.removedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : i.removedNodes.map((m) => $t(m, "removed", void 0))
            ] }),
            /* @__PURE__ */ s("div", { className: "flex-1 min-w-0 flex flex-col gap-1.5", children: [
              /* @__PURE__ */ s("div", { className: "text-[11px] font-bold tracking-[0.5px] uppercase text-text-secondary mb-0.5", children: [
                "Modified (",
                i.modifiedNodes.length,
                ")"
              ] }),
              i.modifiedNodes.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "None" }) : i.modifiedNodes.map((m) => $t(m, "modified", d))
            ] })
          ] }),
          /* @__PURE__ */ s("div", { className: "mt-4 pt-3 border-t border-border", children: [
            /* @__PURE__ */ s("div", { className: "text-xs text-text-secondary mt-1", children: [
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
            i.nameChanged ? /* @__PURE__ */ s("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Name: ",
              /* @__PURE__ */ s("em", { children: [
                '"',
                i.previousName ?? "",
                '"'
              ] }),
              " →",
              " ",
              /* @__PURE__ */ s("strong", { children: [
                '"',
                r.name,
                '"'
              ] })
            ] }) : null,
            i.iconChanged ? /* @__PURE__ */ s("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Icon: ",
              i.previousIcon ?? "—",
              " → ",
              r.icon ?? "—"
            ] }) : null,
            i.tagsChanged ? /* @__PURE__ */ s("div", { className: "text-xs text-text-secondary mt-1", children: [
              "Tags changed: added [",
              i.tagsAdded.join(", ") || "—",
              "], removed [",
              i.tagsRemoved.join(", ") || "—",
              "]"
            ] }) : null
          ] })
        ] }) : /* @__PURE__ */ s("p", { className: "m-0 text-[13px] text-text-secondary", children: [
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
function Js({ open: e, onClose: n }) {
  return null;
}
const Dt = "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer font-[inherit]", un = "px-4 py-[7px] text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-[7px] cursor-pointer font-[inherit]";
function Vs(e) {
  const {
    publishConfirmOpen: n,
    onPublishClose: r,
    onPublishConfirm: o,
    hasErrors: a,
    validationErrorCount: i,
    definitionName: d,
    definitionVersion: c,
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
  return /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t(
      ze,
      {
        open: n,
        onClose: r,
        title: "Publish pipeline?",
        maxWidth: 420,
        footer: /* @__PURE__ */ s(V, { children: [
          /* @__PURE__ */ t("button", { onClick: r, className: Dt, children: "Cancel" }),
          /* @__PURE__ */ t(
            "button",
            {
              onClick: o,
              disabled: a,
              className: I(
                "px-4 py-[7px] text-[13px] font-semibold text-white border-none rounded-[7px] font-[inherit]",
                a ? "bg-[#cbd5e1] cursor-not-allowed" : "bg-primary cursor-pointer"
              ),
              children: "Publish"
            }
          )
        ] }),
        children: /* @__PURE__ */ s("p", { className: "m-0", children: [
          "Publishing will make ",
          /* @__PURE__ */ s("strong", { children: [
            '"',
            d,
            '"'
          ] }),
          " available for runs and set the published version to",
          /* @__PURE__ */ s("strong", { children: [
            " v",
            c + 1
          ] }),
          ".",
          a ? /* @__PURE__ */ s(V, { children: [
            /* @__PURE__ */ t("br", {}),
            /* @__PURE__ */ t("br", {}),
            /* @__PURE__ */ s("span", { className: "text-[#dc2626]", children: [
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
      ze,
      {
        open: l,
        onClose: p,
        title: "Delete pipeline?",
        maxWidth: 400,
        footer: /* @__PURE__ */ s(V, { children: [
          /* @__PURE__ */ t("button", { onClick: p, className: Dt, children: "Cancel" }),
          /* @__PURE__ */ t("button", { onClick: m, className: un, children: "Delete" })
        ] }),
        children: /* @__PURE__ */ s("p", { className: "m-0", children: [
          /* @__PURE__ */ s("strong", { children: [
            '"',
            d,
            '"'
          ] }),
          " will be permanently removed. Run history for this pipeline will also be lost."
        ] })
      }
    ),
    /* @__PURE__ */ t(
      ze,
      {
        open: x,
        onClose: f,
        title: "Clear run history?",
        maxWidth: 400,
        footer: /* @__PURE__ */ s(V, { children: [
          /* @__PURE__ */ t("button", { onClick: f, className: Dt, children: "Cancel" }),
          /* @__PURE__ */ t("button", { onClick: h, className: un, children: "Clear history" })
        ] }),
        children: /* @__PURE__ */ s("p", { className: "m-0", children: [
          "All stored run history for ",
          /* @__PURE__ */ s("strong", { children: [
            '"',
            d,
            '"'
          ] }),
          " will be permanently removed. This cannot be undone."
        ] })
      }
    ),
    /* @__PURE__ */ t(
      Ws,
      {
        open: g,
        onClose: u,
        currentDef: y,
        publishedDef: N,
        onJumpToNode: v
      }
    ),
    /* @__PURE__ */ t(
      Js,
      {
        open: C,
        onClose: b
      }
    )
  ] });
}
function Gs({ runId: e, visible: n }) {
  const [r, o] = R(/* @__PURE__ */ new Map()), a = te(null), i = te(!0), d = te(null);
  q(() => {
    e !== d.current && (d.current = e, o(/* @__PURE__ */ new Map()), i.current = !0);
  }, [e]);
  const c = M(() => {
    const h = a.current;
    if (!h) return;
    const g = h.scrollHeight - h.scrollTop - h.clientHeight < 30;
    i.current = g;
  }, []), l = M(() => {
    if (!i.current) return;
    const h = a.current;
    h && (h.scrollTop = h.scrollHeight);
  }, []), p = M(
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
            const w = new Map(b), k = w.get(N), $ = k ? Date.now() - k.startedAt : 0, S = $ > 1e3 ? `${($ / 1e3).toFixed(1)}s` : `${$}ms`, A = `${N}: ${v ?? "?"} tokens in, ${C ?? "?"} tokens out (${S})`;
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
  Re("*", p), q(() => {
    l();
  }, [r, l]);
  const m = M((h) => {
    o((g) => {
      const u = new Map(g), y = u.get(h);
      return y && u.set(h, { ...y, collapsed: !y.collapsed }), u;
    });
  }, []), x = L(() => {
    for (const h of r.values())
      if (h.active) return !0;
    return !1;
  }, [r]), f = L(() => Array.from(r.values()), [r]);
  return n ? /* @__PURE__ */ s(
    "div",
    {
      className: "flex flex-col bg-[#1e1e2e] border-t border-[#313244] max-h-[320px] min-h-[160px] overflow-hidden relative",
      "data-testid": "live-output-panel",
      children: [
        /* @__PURE__ */ t("div", { className: "flex items-center justify-between py-2 px-[14px] bg-[#181825] border-b border-[#313244] shrink-0", children: /* @__PURE__ */ s("div", { className: "text-xs font-bold text-[#cdd6f4] tracking-[0.04em] uppercase flex items-center gap-2", children: [
          /* @__PURE__ */ t("span", { children: "Live Output" }),
          x && /* @__PURE__ */ t("span", { className: "w-1.5 h-1.5 rounded-full bg-[#a6e3a1] [animation:live-output-blink_1.2s_ease-in-out_infinite]" }),
          e && /* @__PURE__ */ s("span", { className: "text-[10px] text-[#6c7086] font-normal normal-case", children: [
            e.slice(0, 8),
            "..."
          ] })
        ] }) }),
        /* @__PURE__ */ t(
          "div",
          {
            ref: a,
            className: "flex-1 overflow-y-auto py-[10px] px-[14px] text-[13px] leading-[1.6] text-[#cdd6f4] font-code",
            onScroll: c,
            children: f.length === 0 ? /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full text-[#6c7086] text-[13px] italic", children: e ? "Waiting for LLM output..." : "No active run" }) : f.map((h) => /* @__PURE__ */ s("div", { children: [
              /* @__PURE__ */ s(
                "div",
                {
                  className: I(
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
              !h.collapsed && /* @__PURE__ */ s(V, { children: [
                h.text.length > 0 && /* @__PURE__ */ s("div", { className: "whitespace-pre-wrap break-words m-0 mb-3 p-0 text-[#cdd6f4]", children: [
                  h.text,
                  h.active && /* @__PURE__ */ t("span", { className: "inline-block w-0.5 h-[14px] bg-[#89b4fa] ml-px align-text-bottom [animation:live-output-blink_1s_step-end_infinite]" })
                ] }),
                h.summary && /* @__PURE__ */ s("div", { className: "text-[11px] text-[#a6e3a1] font-semibold pt-1 pb-2 border-b border-[#313244] mb-2", children: [
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
function ut(e, n) {
  const r = new Blob([n], { type: "application/json" }), o = URL.createObjectURL(r), a = document.createElement("a");
  a.href = o, a.download = e, document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(o);
}
function mt(e, n) {
  if (!n) return "step";
  const r = e?.nodes.find((o) => o.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Ys(e) {
  const n = st(), { toast: r } = Tt(), { definition: o, selectedNodeId: a, setSelectedNodeId: i } = Je(), d = te(n.runs);
  q(() => {
    d.current = n.runs;
  }, [n.runs]);
  const c = te(o);
  q(() => {
    c.current = o;
  }, [o]);
  const l = M(
    (T) => T ? d.current[T]?.pipelineId === e : !1,
    [e]
  ), [p, m] = R(null), [x, f] = R(null), h = M(() => {
    m(null), f(null);
  }, []), g = M(
    (T) => {
      f(T);
    },
    []
  ), u = M(
    (T) => {
      "eventType" in T || T.pipelineId === e && (r("Run started", { type: "info" }), m(null), f(null));
    },
    [e, r]
  ), y = M(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const P = Math.round(T.durationMs / 100) / 10;
      r(`Run completed in ${P}s`, { type: "success" });
    },
    [l, r]
  ), N = M(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const P = T.error.nodeId, X = mt(c.current, P);
      r(`Run failed at ${X}`, {
        type: "error",
        durationMs: 8e3,
        actionLabel: "View",
        onAction: () => i(P)
      }), m(T.error);
    },
    [l, i, r]
  ), v = M(
    (T) => {
      "eventType" in T || l(T.runId) && r("Run cancelled", { type: "warning" });
    },
    [l, r]
  ), C = M(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      const P = T.stepId, X = mt(c.current, P);
      r(`Approval requested on "${X}"`, {
        type: "warning",
        durationMs: 6e3,
        actionLabel: "Resolve",
        onAction: () => i(P)
      });
    },
    [l, i, r]
  );
  Re("pipeline.run.started", u), Re("pipeline.run.completed", y), Re("pipeline.run.failed", N), Re("pipeline.run.cancelled", v), Re("pipeline.approval.requested", C);
  const [b, w] = R(null);
  q(() => {
    if (n.activeRunIds.length > 0) {
      const T = n.activeRunIds[n.activeRunIds.length - 1];
      T !== b && w(T);
      return;
    }
    if (!b) {
      const T = Object.values(n.runs).sort(
        (P, X) => X.startedAt.localeCompare(P.startedAt)
      );
      T.length > 0 && w(T[0].id);
    }
  }, [n.activeRunIds, n.runs, b]);
  const k = b ? n.runs[b] : void 0, $ = !!k && (k.status === "running" || k.status === "pending" || k.status === "awaiting_approval"), [S, A] = R(/* @__PURE__ */ new Set()), [D, H] = R(null), [G, ee] = R(null), [ie, le] = R(null), [oe, ue] = R(0), [O, Y] = R(!1), [W, F] = R(null), J = M(
    (T, P) => {
      P === null ? (ee(null), le(null)) : (ee(P), le(T));
    },
    []
  ), de = M((T) => {
    A((P) => {
      const X = new Set(P);
      return X.has(T) ? X.delete(T) : X.add(T), X;
    });
  }, []), pe = M(async () => {
    if (S.size !== 0)
      try {
        const T = await n.triggerDebugRun(
          e,
          Array.from(S)
        );
        w(T);
      } catch (T) {
        console.error("[PipelineEditor] triggerDebugRun failed", T);
      }
  }, [S, n, e]), be = M(() => {
    D && (n.resolveBreakpoint(D.runId, D.stepId, "continue"), H(null));
  }, [D, n]), E = M(() => {
    D && (n.resolveBreakpoint(D.runId, D.stepId, "step_over"), H(null));
  }, [D, n]), re = M(() => {
    D && (n.resolveBreakpoint(D.runId, D.stepId, "resume_all"), H(null));
  }, [D, n]), ge = M(async () => {
    if (!(!D || !G || ie !== D.stepId) && Object.keys(G).length !== 0) {
      Y(!0);
      try {
        await fr(
          e,
          D.runId,
          D.stepId,
          { mode: "merge", values: G }
        ), ee(null), le(null), ue((T) => T + 1), n.resolveBreakpoint(D.runId, D.stepId, "continue"), H(null);
      } catch (T) {
        if (T instanceof hr)
          r(`Patch rejected: ${T.reason}`, { type: "error", durationMs: 8e3 });
        else if (T instanceof tn)
          r(`Apply failed (HTTP ${T.status})`, { type: "error", durationMs: 6e3 });
        else {
          const P = T instanceof Error ? T.message : String(T);
          r(`Apply failed: ${P}`, { type: "error", durationMs: 6e3 });
        }
      } finally {
        Y(!1);
      }
    }
  }, [D, G, ie, e, n, r]), $e = M(
    async (T) => {
      if (D) {
        F(T);
        try {
          await xr(
            e,
            D.runId,
            D.stepId,
            T
          ), r("Patch reverted", { type: "success", durationMs: 3e3 });
        } catch (P) {
          if (P instanceof tn)
            r(`Revert failed (HTTP ${P.status})`, { type: "error", durationMs: 6e3 });
          else {
            const X = P instanceof Error ? P.message : String(P);
            r(`Revert failed: ${X}`, { type: "error", durationMs: 6e3 });
          }
        } finally {
          F(null);
        }
      }
    },
    [D, e, r]
  ), qe = M(
    (T) => {
      if ("eventType" in T || !l(T.runId)) return;
      H({ runId: T.runId, stepId: T.stepId });
      const P = mt(c.current, T.stepId);
      r(`Paused at breakpoint: ${P}`, { type: "warning", durationMs: 6e3 });
    },
    [l, r]
  );
  Re("pipeline.step.breakpoint", qe);
  const Me = M(
    (T) => {
      "eventType" in T || D && D.runId === T.runId && H(null);
    },
    [D]
  );
  Re("pipeline.run.completed", Me), Re("pipeline.run.failed", Me), Re("pipeline.run.cancelled", Me);
  const Ae = M(() => {
    p?.nodeId && (n.retryFromStep(p.nodeId), h());
  }, [p, n, h]), Le = o?.status === "published", Ee = !$ && !Le, _e = $ ? "Cancel the active run" : Le ? "Start a new run" : "Publish the pipeline to enable runs", [ye, ce] = R(!1), [z, _] = R({}), [K, se] = R(!1), [me, Ie] = R("config");
  q(() => {
    a !== null && Ie("config");
  }, [a]);
  const ke = M(async (T) => {
    se(!0);
    try {
      const P = await n.triggerRun(e, T);
      w(P), Ie("runs"), r(`Pipeline triggered — run ${P.slice(0, 8)}…`, { type: "success" });
    } catch (P) {
      console.error("[PipelineEditor] triggerRun failed", P), r(`Trigger failed: ${P.message}`, { type: "error" });
    } finally {
      se(!1);
    }
  }, [n, e, r]), je = M(async () => {
    if ($ && b) {
      n.cancelRun(b);
      return;
    }
    Ee || ke();
  }, [$, b, Ee, n, ke]), bt = M(() => {
    ce(!1), ke(z);
  }, [ke, z]);
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
    handleTriggerInputSubmit: bt,
    isRunActive: $,
    runDisabled: Ee,
    runTitle: _e,
    isTriggering: K,
    triggerInputOpen: ye,
    setTriggerInputOpen: ce,
    triggerInputValues: z,
    setTriggerInputValues: _,
    breakpoints: S,
    handleToggleBreakpoint: de,
    handleDebugRunClick: pe,
    pausedBreakpoint: D,
    handleBreakpointContinue: be,
    handleBreakpointStepOver: E,
    handleBreakpointResumeAll: re,
    handleApplyAndContinue: ge,
    handleRevertPatch: $e,
    applyingPatch: O,
    revertingPatchId: W,
    dirtyPatch: G,
    dirtyPatchStepId: ie,
    handleContextEditBufferChange: J,
    resetEditBufferKey: oe,
    sidebarTab: me,
    setSidebarTab: Ie
  };
}
function Xs({
  isPublished: e,
  showTags: n,
  hasPublishedVersion: r,
  onDuplicate: o,
  onCopyMermaid: a,
  onViewVersions: i,
  onRevert: d,
  onToggleShowTags: c,
  onViewRunHistory: l,
  onClearRunHistory: p,
  onSimPanelOpen: m,
  onDelete: x
}) {
  const f = I(
    "block w-full text-left px-3.5 py-2 text-[13px]",
    "border-none bg-transparent cursor-pointer font-inherit text-text-primary",
    "hover:bg-surface-hover"
  ), h = I(
    "block w-full text-left px-3.5 py-2 text-[13px]",
    "border-none bg-transparent cursor-pointer font-inherit text-red-600",
    "hover:bg-surface-hover"
  );
  return /* @__PURE__ */ s(
    "div",
    {
      className: I(
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
            onClick: a,
            "data-testid": "copy-mermaid-btn",
            children: "Copy Mermaid"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: f,
            role: "menuitem",
            onClick: i,
            "data-testid": "view-versions-btn",
            children: "View changes since publish"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            className: f,
            role: "menuitem",
            onClick: d,
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
            onClick: c,
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
const Pt = {
  neutral: "bg-slate-100 text-slate-600",
  success: "bg-green-50 text-green-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600"
};
function Qs({
  pipelineId: e,
  definition: n,
  dirty: r,
  savingFlash: o,
  isRunActive: a,
  isTriggering: i,
  runDisabled: d,
  runTitle: c,
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
  onDelete: $
}) {
  const S = Pe(), { rename: A, setIcon: D, setSelectedNodeId: H } = Je(), [G, ee] = R(!1), [ie, le] = R(""), oe = te(null);
  q(() => {
    G && (le(n.name ?? ""), setTimeout(() => oe.current?.focus(), 0));
  }, [G, n.name]);
  const ue = () => {
    const z = ie.trim();
    z && z !== n.name && A(z), ee(!1);
  }, O = n ? Yn(n) : null;
  (O?.errors.length ?? 0) > 0;
  const Y = n.status === "published", W = r ? { label: "Saving…", variant: "info" } : o ? { label: "✓ Saved", variant: "success" } : { label: "✓ Saved", variant: "neutral" }, F = n.status === "published" ? { label: `v${n.version} · Published`, variant: "success" } : typeof n.publishedVersion == "number" ? { label: `v${n.version} · Draft (pub v${n.publishedVersion})`, variant: "warning" } : { label: `v${n.version} · Draft`, variant: "neutral" }, J = O ? O.errors.length > 0 ? { label: `✗ ${O.errors.length} error${O.errors.length === 1 ? "" : "s"}`, variant: "danger" } : O.warnings.length > 0 ? { label: `⚠ ${O.warnings.length} warning${O.warnings.length === 1 ? "" : "s"}`, variant: "warning" } : { label: "✓ Valid", variant: "success" } : { label: "…", variant: "neutral" }, [de, pe] = R(!1), be = te(null);
  nt(be, () => pe(!1), de);
  const E = O ? [...O.errors, ...O.warnings] : [], re = (z) => {
    z && (H(z), pe(!1));
  }, ge = n.nodes.filter((z) => z.type !== "trigger").length, $e = l ? Object.values(l.steps).filter(
    (z) => z.status === "completed" || z.status === "skipped"
  ).length : 0, Me = ((l?.startedAt ? Date.now() - new Date(l.startedAt).getTime() : 0) / 1e3).toFixed(1), Ae = a && l ? { text: `Running (${$e}/${ge} steps) · ${Me}s`, variant: "running" } : l?.status === "completed" ? { text: `Completed in ${l.durationMs ? (l.durationMs / 1e3).toFixed(1) : "?"}s`, variant: "success" } : l?.status === "failed" ? { text: `Failed at ${mt(n, l.error?.nodeId)}`, variant: "error" } : { text: "", variant: "none" }, Le = {
    running: "bg-blue-50 text-blue-600",
    success: "bg-green-50 text-green-600",
    error: "bg-red-50 text-red-600"
  }, Ee = a ? "⏹ Stop" : l && l.status !== "running" ? "↻ Re-run" : "▶ Run", [_e, ye] = R(!1), ce = te(null);
  return nt(ce, () => ye(!1), _e), /* @__PURE__ */ s(
    "div",
    {
      className: I(
        "h-11 shrink-0 flex items-center gap-2.5 px-3",
        "border-b border-border bg-surface",
        "sticky top-0 z-5"
      ),
      children: [
        /* @__PURE__ */ t(
          pt,
          {
            onClick: () => S("/pipelines"),
            "aria-label": "Back to pipelines",
            title: "Back to pipelines",
            children: "←"
          }
        ),
        /* @__PURE__ */ t(
          Kr,
          {
            value: n.icon ?? "🔀",
            onChange: D
          }
        ),
        G ? /* @__PURE__ */ t(
          "input",
          {
            ref: oe,
            value: ie,
            onChange: (z) => le(z.target.value),
            onBlur: ue,
            onKeyDown: (z) => {
              z.key === "Enter" && ue(), z.key === "Escape" && (le(n.name), ee(!1));
            },
            className: I(
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
            onClick: () => ee(!0),
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
        /* @__PURE__ */ t(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              Pt[W.variant]
            ),
            "data-testid": "save-status",
            children: W.label
          }
        ),
        /* @__PURE__ */ t(
          "span",
          {
            className: I(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
              Pt[F.variant]
            ),
            "data-testid": "version-badge",
            children: F.label
          }
        ),
        /* @__PURE__ */ s("div", { className: "relative", ref: be, children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => pe((z) => !z),
              className: I(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold font-inherit leading-snug whitespace-nowrap",
                "cursor-pointer border-none",
                Pt[J.variant]
              ),
              "data-testid": "validation-indicator",
              children: J.label
            }
          ),
          de && E.length > 0 && /* @__PURE__ */ t(
            "div",
            {
              className: I(
                "absolute top-full mt-1.5 bg-surface border border-border rounded-lg",
                "shadow-lg p-0 min-w-[260px] max-w-[360px] max-h-[320px] overflow-y-auto z-20"
              ),
              children: E.map((z, _) => /* @__PURE__ */ s(
                "button",
                {
                  type: "button",
                  onClick: () => re(z.nodeId),
                  className: I(
                    "block w-full text-left px-3.5 py-2 text-[13px]",
                    "border-none bg-transparent font-inherit text-text-primary",
                    "flex gap-2 items-start leading-snug",
                    z.nodeId ? "cursor-pointer" : "cursor-default",
                    _ < E.length - 1 && "border-b border-border"
                  ),
                  children: [
                    /* @__PURE__ */ t(
                      "span",
                      {
                        className: I(
                          "font-bold text-xs",
                          z.severity === "error" ? "text-red-600" : "text-amber-600"
                        ),
                        children: z.severity === "error" ? "✗" : "⚠"
                      }
                    ),
                    /* @__PURE__ */ s("span", { className: "flex-1 text-xs", children: [
                      /* @__PURE__ */ t("div", { className: "font-semibold", children: z.code }),
                      /* @__PURE__ */ t("div", { className: "text-text-secondary", children: z.message }),
                      z.nodeId && /* @__PURE__ */ t("div", { className: "mt-0.5 text-[11px] text-primary", children: "Jump to node →" })
                    ] })
                  ]
                },
                `${z.code}-${_}`
              ))
            }
          )
        ] }),
        Ae.variant !== "none" && /* @__PURE__ */ s(
          "span",
          {
            className: I(
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
          Be,
          {
            variant: "secondary",
            onClick: () => S("/pipelines/metrics"),
            title: "View pipeline metrics dashboard",
            "data-testid": "metrics-button",
            children: "Metrics"
          }
        ),
        /* @__PURE__ */ t(
          Be,
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
            className: I(
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
            disabled: d || i,
            title: c,
            className: I(
              "px-3.5 py-1.5 text-[13px] font-semibold text-white border-none rounded-md font-inherit shrink-0",
              a ? "bg-red-600" : "bg-primary",
              d || i ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            ),
            "data-testid": "run-button",
            children: i ? /* @__PURE__ */ s("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ t("span", { className: "inline-block w-3 h-3 border-2 border-slate-200 border-t-white rounded-full animate-spin" }),
              "Triggering…"
            ] }) : Ee
          }
        ),
        p.size > 0 && /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: x,
            disabled: d || a,
            title: `Debug run (${p.size} breakpoint${p.size > 1 ? "s" : ""})`,
            className: I(
              "px-3.5 py-1.5 text-[13px] font-semibold bg-amber-600 text-white",
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
        /* @__PURE__ */ s("div", { className: "relative", ref: ce, children: [
          /* @__PURE__ */ t(
            pt,
            {
              onClick: () => ye((z) => !z),
              "aria-label": "More actions",
              "data-testid": "overflow-menu-btn",
              children: "⋯"
            }
          ),
          _e && /* @__PURE__ */ t(
            Xs,
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
                $(), ye(!1);
              },
              hasPublishedVersion: typeof n.publishedVersion == "number"
            }
          )
        ] })
      ]
    }
  );
}
const Zs = 12;
function Ce(e) {
  return I("text-xs", {
    string: "text-[#a6e3a1]",
    number: "text-[#fab387]",
    boolean: "text-[#cba6f7]",
    null: "text-[#6c7086]",
    bracket: "text-[#9399b2]"
  }[e]);
}
function xt({
  data: e,
  depth: n = 0,
  highlightKeys: r,
  keyName: o,
  isHighlighted: a = !1
}) {
  const [i, d] = R(n > 2);
  if (n > Zs)
    return /* @__PURE__ */ t("span", { className: Ce("string"), children: "[max depth]" });
  const c = a || o != null && r?.has(o);
  if (e === null)
    return /* @__PURE__ */ t("span", { className: I(Ce("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "null" });
  if (e === void 0)
    return /* @__PURE__ */ t("span", { className: I(Ce("null"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: "undefined" });
  if (typeof e == "boolean")
    return /* @__PURE__ */ t("span", { className: I(Ce("boolean"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(e) });
  if (typeof e == "number")
    return /* @__PURE__ */ t("span", { className: I(Ce("number"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: String(e) });
  if (typeof e == "string") {
    const l = e.length > 120 ? e.slice(0, 120) + "..." : e;
    return /* @__PURE__ */ s("span", { className: I(Ce("string"), c && "bg-[rgba(166,227,161,0.08)] rounded-sm px-0.5"), children: [
      '"',
      l,
      '"'
    ] });
  }
  if (Array.isArray(e))
    return e.length === 0 ? /* @__PURE__ */ t("span", { className: Ce("bracket"), children: "[]" }) : /* @__PURE__ */ s("span", { children: [
      /* @__PURE__ */ t(
        "span",
        {
          className: "cursor-pointer select-none text-[9px] mr-1 text-[#6c7086] inline-block w-3 text-center",
          onClick: () => d((l) => !l),
          role: "button",
          tabIndex: 0,
          onKeyDown: (l) => {
            (l.key === "Enter" || l.key === " ") && d((p) => !p);
          },
          children: i ? "▶" : "▼"
        }
      ),
      /* @__PURE__ */ t("span", { className: Ce("bracket"), children: "[" }),
      i ? /* @__PURE__ */ s("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        e.length,
        " items"
      ] }) : /* @__PURE__ */ t("div", { className: "pl-4", children: e.map((l, p) => /* @__PURE__ */ s("div", { className: "leading-relaxed whitespace-nowrap", children: [
        /* @__PURE__ */ s("span", { className: "text-[#6c7086] text-[11px]", children: [
          p,
          ": "
        ] }),
        /* @__PURE__ */ t(xt, { data: l, depth: n + 1, highlightKeys: r }),
        p < e.length - 1 && /* @__PURE__ */ t("span", { className: Ce("bracket"), children: "," })
      ] }, p)) }),
      /* @__PURE__ */ t("span", { className: Ce("bracket"), children: "]" })
    ] });
  if (typeof e == "object") {
    const l = Object.entries(e);
    return l.length === 0 ? /* @__PURE__ */ t("span", { className: Ce("bracket"), children: "{}" }) : /* @__PURE__ */ s("span", { children: [
      /* @__PURE__ */ t(
        "span",
        {
          className: "cursor-pointer select-none text-[9px] mr-1 text-[#6c7086] inline-block w-3 text-center",
          onClick: () => d((p) => !p),
          role: "button",
          tabIndex: 0,
          onKeyDown: (p) => {
            (p.key === "Enter" || p.key === " ") && d((m) => !m);
          },
          children: i ? "▶" : "▼"
        }
      ),
      /* @__PURE__ */ t("span", { className: Ce("bracket"), children: "{" }),
      i ? /* @__PURE__ */ s("span", { className: "text-[#6c7086] italic text-[11px] ml-1", children: [
        l.length,
        " keys"
      ] }) : /* @__PURE__ */ t("div", { className: "pl-4", children: l.map(([p, m], x) => {
        const f = r?.has(p) || a;
        return /* @__PURE__ */ s("div", { className: "leading-relaxed whitespace-nowrap", children: [
          /* @__PURE__ */ t("span", { className: I(
            "text-xs font-medium text-[#89b4fa]",
            f && "text-[#a6e3a1] font-bold bg-[rgba(166,227,161,0.1)] rounded-sm px-0.5"
          ), children: p }),
          /* @__PURE__ */ t("span", { className: Ce("bracket"), children: ": " }),
          /* @__PURE__ */ t(
            xt,
            {
              data: m,
              depth: n + 1,
              highlightKeys: n === 0 ? r : void 0,
              keyName: p,
              isHighlighted: f
            }
          ),
          x < l.length - 1 && /* @__PURE__ */ t("span", { className: Ce("bracket"), children: "," })
        ] }, p);
      }) }),
      /* @__PURE__ */ t("span", { className: Ce("bracket"), children: "}" })
    ] });
  }
  return /* @__PURE__ */ t("span", { className: Ce("string"), children: String(e) });
}
function ea({
  snapshots: e,
  activeStepId: n,
  fallbackActiveStepId: r,
  onStepSelect: o
}) {
  const a = n ?? r;
  return /* @__PURE__ */ t("div", { className: "w-[140px] shrink-0 border-r border-border overflow-y-auto", children: e.map((i, d) => {
    const c = i.stepId === a;
    return /* @__PURE__ */ s(
      "div",
      {
        className: I(
          "px-2.5 py-1.5 text-[11px] font-mono cursor-pointer border-b border-border overflow-hidden text-ellipsis whitespace-nowrap",
          c ? "text-text-primary bg-surface-inset font-semibold" : "text-text-tertiary font-normal"
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
          /* @__PURE__ */ s("span", { className: "text-[10px] text-[#9399b2] mr-1", children: [
            d + 1,
            "."
          ] }),
          i.stepId ? i.stepId.slice(0, 8) : `step-${d + 1}`
        ]
      },
      i.stepId || d
    );
  }) });
}
function ta(e) {
  return typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : "object";
}
function na({ k: e, initial: n, onCommit: r, onError: o, onFocus: a }) {
  const [i, d] = R(() => {
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
      onChange: (c) => d(c.target.value),
      onFocus: a,
      onBlur: () => {
        try {
          const c = JSON.parse(i);
          r(c);
        } catch (c) {
          o(`Invalid JSON: ${c instanceof Error ? c.message : String(c)}`);
        }
      },
      className: "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono min-h-[60px] resize-y"
    }
  );
}
function ra({
  inputContext: e,
  buffer: n,
  parseErrors: r,
  newKeyDraft: o,
  setNewKeyDraft: a,
  onCommitNewKey: i,
  onBeginEditKey: d,
  onSetValue: c,
  onRemoveKey: l,
  onParseError: p
}) {
  const m = L(() => {
    const f = /* @__PURE__ */ new Set([
      ...Object.keys(e),
      ...Object.keys(n)
    ]);
    return Array.from(f);
  }, [e, n]), x = "w-full px-1.5 py-1 text-xs bg-[#11111b] text-[#cdd6f4] border border-[#313244] rounded-sm font-mono";
  return /* @__PURE__ */ s("div", { "data-testid": "context-edit-table", children: [
    m.map((f) => {
      const h = f in n, g = h ? n[f] : e[f], u = ta(g), y = h;
      return /* @__PURE__ */ s(
        "div",
        {
          className: "grid grid-cols-[120px_1fr_auto] gap-2 items-start py-1.5 border-b border-[#313244]",
          "data-testid": `context-edit-row-${f}`,
          children: [
            /* @__PURE__ */ s(
              "span",
              {
                className: I(
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
            /* @__PURE__ */ s("div", { className: "min-w-0", children: [
              u === "boolean" ? /* @__PURE__ */ s(
                "select",
                {
                  "data-testid": `context-edit-input-${f}`,
                  value: String(g),
                  onChange: (N) => c(f, N.target.value === "true"),
                  onFocus: () => d(f, g),
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
                    c(f, Number.isNaN(v) ? 0 : v);
                  },
                  onFocus: () => d(f, g),
                  className: x
                }
              ) : u === "string" ? /* @__PURE__ */ t(
                "input",
                {
                  "data-testid": `context-edit-input-${f}`,
                  type: "text",
                  value: g ?? "",
                  onChange: (N) => c(f, N.target.value),
                  onFocus: () => d(f, g),
                  className: x
                }
              ) : /* @__PURE__ */ t(
                na,
                {
                  k: f,
                  initial: g,
                  onCommit: (N) => c(f, N),
                  onError: (N) => p(f, N),
                  onFocus: () => d(f, g)
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
    /* @__PURE__ */ s(
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
              onChange: (f) => a({ ...o, key: f.target.value }),
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
              onChange: (f) => a({ ...o, value: f.target.value }),
              onKeyDown: (f) => {
                f.key === "Enter" && (f.preventDefault(), i());
              },
              className: x
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": "context-edit-add-btn",
              onClick: i,
              disabled: !o.key.trim(),
              className: I(
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
function oa(e, n, r) {
  const o = { ...e }, a = { ...o.steps ?? {} };
  return a[n] = r, o.steps = a, r && typeof r == "object" && !Array.isArray(r) && Object.assign(o, r), o;
}
function sa(e, n) {
  const r = [];
  for (const o of Object.keys(n))
    o in e || r.push(o);
  return r;
}
function aa(e) {
  const n = Object.values(e.steps).filter((a) => a != null).sort((a, i) => {
    const d = a.startedAt ? Date.parse(a.startedAt) : 0, c = i.startedAt ? Date.parse(i.startedAt) : 0;
    return d - c;
  }), r = [];
  let o = {};
  e.triggeredBy?.payload && typeof e.triggeredBy.payload == "object" && (o = { ...e.triggeredBy.payload });
  for (const a of n) {
    const i = { ...o }, d = a.output, c = a.llm?.prompt;
    let l;
    if (d !== void 0)
      l = oa(o, a.nodeId, d);
    else {
      l = { ...o };
      const m = {
        ...l.steps ?? {}
      };
      m[a.nodeId] = d, l.steps = m;
    }
    const p = sa(i, l);
    r.push({
      stepId: a.nodeId,
      inputContext: i,
      output: d,
      outputContext: l,
      resolvedPrompt: c || void 0,
      newKeys: p,
      stepExecution: a
    }), o = l;
  }
  return r;
}
function ia(e, n) {
  const [r, o] = R(/* @__PURE__ */ new Map()), [a, i] = R(
    /* @__PURE__ */ new Map()
  ), d = te(null);
  q(() => {
    const f = e?.id ?? null;
    f !== d.current && (d.current = f, o(/* @__PURE__ */ new Map()), i(/* @__PURE__ */ new Map()));
  }, [e?.id]);
  const c = M(
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
          N && v && i((C) => {
            const b = new Map(C);
            return b.set(v, N), b;
          });
        }
      }
    },
    [e?.id]
  );
  Re("*", c);
  const l = L(() => e ? aa(e) : [], [e]), p = L(() => l.map((f) => {
    const h = r.get(f.stepId), g = a.get(f.stepId);
    return {
      ...f,
      resolvedPrompt: f.resolvedPrompt || h,
      outputContext: g ?? f.outputContext
    };
  }), [l, r, a]), m = L(() => n ? p.find((f) => f.stepId === n) ?? null : p[p.length - 1] ?? null, [p, n]), x = L(() => m ? new Set(m.newKeys) : /* @__PURE__ */ new Set(), [m]);
  return { enrichedSnapshots: p, activeSnapshot: m, newKeysSet: x };
}
function mn({ attempt: e, label: n }) {
  const r = !e.error;
  return /* @__PURE__ */ s("div", { className: "bg-[#11111b] rounded-md border border-[#313244] p-2.5 overflow-auto", children: [
    /* @__PURE__ */ t("div", { className: "text-[11px] font-bold text-[#cdd6f4] mb-2", children: n }),
    /* @__PURE__ */ s("div", { className: "flex gap-1.5 mb-1.5 items-center", children: [
      /* @__PURE__ */ t("span", { className: I(
        "text-[10px] font-semibold px-1.5 py-px rounded-sm",
        r ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
      ), children: r ? "OK" : "FAIL" }),
      e.durationMs != null && /* @__PURE__ */ s("span", { className: "text-[10px] text-[#6c7086]", children: [
        e.durationMs,
        "ms"
      ] })
    ] }),
    e.error && /* @__PURE__ */ t("div", { className: "text-[11px] text-[#f38ba8] font-mono mb-1.5 px-2 py-1.5 bg-[#1a0f14] rounded whitespace-pre-wrap break-words", children: e.error }),
    e.output !== void 0 && /* @__PURE__ */ s("div", { children: [
      /* @__PURE__ */ t("div", { className: "text-[10px] text-[#6c7086] font-semibold mb-1 uppercase", children: "Output" }),
      /* @__PURE__ */ t(xt, { data: e.output, depth: 0 })
    ] })
  ] });
}
function la({
  run: e,
  activeStepId: n,
  onStepSelect: r,
  editable: o = !1,
  onEditBufferChange: a,
  resetEditBufferKey: i
}) {
  const [d, c] = R("input"), [l, p] = R(0), [m, x] = R(!1), [f, h] = R({}), [g, u] = R(null), [y, N] = R({}), [v, C] = R({
    key: "",
    value: ""
  }), { enrichedSnapshots: b, activeSnapshot: w, newKeysSet: k } = ia(e, n), $ = w?.resolvedPrompt != null, S = w?.stepExecution.attempts, A = (S?.length ?? 0) >= 2;
  q(() => {
    d === "prompt" && !$ && c("input"), d === "attempts" && !A && c("input");
  }, [d, $, A]), q(() => {
    p(0);
  }, [n]);
  const D = !!(e && e.status === "paused_at_breakpoint" && n && (e.currentStepIds?.includes(n) || w?.stepExecution.status === "running" || w?.stepExecution.status === "awaiting" || w?.stepExecution.status === "pending")), H = !!o && !!D;
  q(() => {
    H ? g && g !== n && (h({}), u(null), N({})) : (m && x(!1), Object.keys(f).length > 0 && h({}), g && u(null), Object.keys(y).length > 0 && N({}));
  }, [H, n]), q(() => {
    i !== void 0 && (h({}), u(null), N({}), C({ key: "", value: "" }));
  }, [i]), q(() => {
    !H || !n || a && (Object.keys(f).length === 0 ? a(n, null) : a(n, f));
  }, [f, H, n]);
  const G = M(
    (O, Y) => {
      u(n), h((W) => O in W ? W : { ...W, [O]: Y });
    },
    [n]
  ), ee = M(
    (O, Y) => {
      u(n), h((W) => ({ ...W, [O]: Y })), N((W) => {
        if (!(O in W)) return W;
        const F = { ...W };
        return delete F[O], F;
      });
    },
    [n]
  ), ie = M((O) => {
    h((Y) => {
      if (!(O in Y)) return Y;
      const W = { ...Y };
      return delete W[O], W;
    }), N((Y) => {
      if (!(O in Y)) return Y;
      const W = { ...Y };
      return delete W[O], W;
    });
  }, []), le = M((O, Y) => {
    N((W) => ({ ...W, [O]: Y }));
  }, []), oe = M(() => {
    h({}), u(null), N({}), C({ key: "", value: "" });
  }, []), ue = M(() => {
    const O = v.key.trim();
    if (!O) return;
    let Y = v.value;
    const W = v.value;
    if (W.trim().length > 0)
      try {
        Y = JSON.parse(W);
      } catch {
        Y = W;
      }
    ee(O, Y), C({ key: "", value: "" });
  }, [v, ee]);
  return !e || b.length === 0 ? /* @__PURE__ */ s("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0", children: /* @__PURE__ */ t("span", { className: "text-xs font-bold text-text-primary tracking-wide uppercase", children: "Context Inspector" }) }),
    /* @__PURE__ */ s("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs flex items-center justify-center flex-col gap-2", children: [
      /* @__PURE__ */ t("span", { className: "text-[13px] text-[#6c7086]", children: e ? "Waiting for step execution data..." : "Run a pipeline to inspect context flow" }),
      /* @__PURE__ */ t("span", { className: "text-[11px] text-[#45475a]", children: e ? "Context data will appear as steps complete." : "Trigger a run to see inputs, outputs, and context at each step." })
    ] })
  ] }) : /* @__PURE__ */ s("div", { className: "flex flex-col overflow-hidden h-full", "data-testid": "context-inspector", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0", children: [
      /* @__PURE__ */ t("span", { className: "text-xs font-bold text-text-primary tracking-wide uppercase", children: "Context Inspector" }),
      w && w.stepId && /* @__PURE__ */ s("span", { className: "text-[10px] text-[#6c7086]", children: [
        "Step: ",
        w.stepId.slice(0, 8)
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex gap-0 border-b border-border shrink-0", children: [
      { id: "input", label: "Input Context", show: !0 },
      { id: "output", label: "Output", show: !0 },
      { id: "prompt", label: "Resolved Prompt", show: $ },
      { id: "details", label: "Details", show: !0 },
      { id: "attempts", label: `Attempts (${S?.length})`, show: A }
    ].filter((O) => O.show).map((O) => /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "data-testid": O.id === "attempts" ? "attempts-tab" : void 0,
        className: I(
          "px-3.5 py-1.5 text-[11px] font-semibold bg-transparent border-none cursor-pointer font-inherit uppercase tracking-wide border-b-2",
          d === O.id ? "text-primary border-b-primary" : "text-text-tertiary border-b-transparent"
        ),
        onClick: () => c(O.id),
        children: O.label
      },
      O.id
    )) }),
    /* @__PURE__ */ s("div", { className: "flex flex-1 min-h-0 overflow-hidden", children: [
      /* @__PURE__ */ t(
        ea,
        {
          snapshots: b,
          activeStepId: n,
          fallbackActiveStepId: w?.stepId,
          onStepSelect: r
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex-1 overflow-auto px-3.5 py-2.5 font-mono text-xs", children: w ? d === "input" ? /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ s("div", { className: "text-[10px] text-[#6c7086] font-semibold uppercase", children: [
            "Input context",
            w.stepId ? ` — step ${w.stepId.slice(0, 8)}` : ""
          ] }),
          H && /* @__PURE__ */ s("div", { className: "flex gap-1.5 items-center", children: [
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
                className: I(
                  "px-2 py-0.5 text-[10px] font-semibold border rounded-sm cursor-pointer font-mono uppercase tracking-wide",
                  m ? "bg-[#d97706] text-white border-[#d97706]" : "bg-transparent text-[#d97706] border-[#d97706]"
                ),
                children: m ? "Editing" : "Edit"
              }
            )
          ] })
        ] }),
        Object.keys(w.inputContext).length === 0 && !(H && m) ? /* @__PURE__ */ t("div", { className: "text-[#6c7086] text-xs italic", children: "No input context (first step or no upstream output)" }) : H && m ? /* @__PURE__ */ t(
          ra,
          {
            inputContext: w.inputContext,
            buffer: f,
            parseErrors: y,
            newKeyDraft: v,
            setNewKeyDraft: C,
            onCommitNewKey: ue,
            onBeginEditKey: G,
            onSetValue: ee,
            onRemoveKey: ie,
            onParseError: le
          }
        ) : /* @__PURE__ */ t(
          xt,
          {
            data: w.inputContext,
            highlightKeys: k
          }
        )
      ] }) : d === "output" ? /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ s("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: [
          "Output",
          w.stepId ? ` — step ${w.stepId.slice(0, 8)}` : ""
        ] }),
        /* @__PURE__ */ t(xt, { data: w.output }),
        w.newKeys.length > 0 && /* @__PURE__ */ s("div", { className: "mt-3", children: [
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
      ] }) : d === "prompt" ? /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ t("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: "Resolved prompt template" }),
        /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: w.resolvedPrompt })
      ] }) : d === "details" ? /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ t("div", { className: "mb-2 text-[10px] text-[#6c7086] font-semibold uppercase", children: "Step execution details" }),
        /* @__PURE__ */ s("div", { className: "flex flex-col gap-3", children: [
          w.stepExecution.startedAt && /* @__PURE__ */ s("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Duration" }),
            /* @__PURE__ */ s("div", { className: "text-[11px] text-[#cdd6f4]", children: [
              "Started: ",
              w.stepExecution.startedAt,
              w.stepExecution.completedAt && /* @__PURE__ */ s(V, { children: [
                /* @__PURE__ */ t("br", {}),
                "Completed: ",
                w.stepExecution.completedAt,
                w.stepExecution.durationMs != null && /* @__PURE__ */ s(V, { children: [
                  /* @__PURE__ */ t("br", {}),
                  "Duration: ",
                  w.stepExecution.durationMs,
                  "ms"
                ] })
              ] })
            ] })
          ] }),
          w.stepExecution.llm && /* @__PURE__ */ s("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "LLM Metrics" }),
            /* @__PURE__ */ s("div", { className: "text-[11px] text-[#cdd6f4]", children: [
              "Tokens in: ",
              w.stepExecution.llm.tokensIn,
              /* @__PURE__ */ t("br", {}),
              "Tokens out: ",
              w.stepExecution.llm.tokensOut,
              w.stepExecution.llm.firstTokenLatencyMs != null && /* @__PURE__ */ s(V, { children: [
                /* @__PURE__ */ t("br", {}),
                "First token latency: ",
                w.stepExecution.llm.firstTokenLatencyMs,
                "ms"
              ] })
            ] }),
            w.stepExecution.llm.response && /* @__PURE__ */ s(V, { children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mt-2 mb-1", children: "Response Text" }),
              /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: w.stepExecution.llm.response })
            ] })
          ] }),
          w.stepExecution.error && /* @__PURE__ */ s("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#f38ba8] font-semibold mb-1", children: "Error" }),
            /* @__PURE__ */ t("div", { className: "px-3 py-2.5 bg-[#1a0f14] border border-[#f38ba8] rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto", children: /* @__PURE__ */ t("div", { className: "text-[#f38ba8] font-semibold mb-1", children: w.stepExecution.error }) })
          ] }),
          w.stepExecution.approvals && w.stepExecution.approvals.length > 0 && /* @__PURE__ */ s("div", { children: [
            /* @__PURE__ */ s("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: [
              "Approvals (",
              w.stepExecution.approvals.length,
              ")"
            ] }),
            w.stepExecution.approvals.map((O, Y) => /* @__PURE__ */ s("div", { className: "px-3 py-2.5 bg-surface-inset border border-border rounded-md text-xs text-text-primary whitespace-pre-wrap break-words leading-relaxed max-h-60 overflow-y-auto mb-2", children: [
              /* @__PURE__ */ s("div", { className: "flex gap-2 mb-1", children: [
                /* @__PURE__ */ t("span", { className: I(
                  "px-1.5 py-0.5 rounded-sm text-[10px] font-semibold",
                  O.decision === "approve" ? "bg-[rgba(166,227,161,0.15)] text-[#a6e3a1]" : "bg-[rgba(243,139,168,0.15)] text-[#f38ba8]"
                ), children: O.decision.toUpperCase() }),
                /* @__PURE__ */ t("span", { className: "text-[11px] text-[#cdd6f4]", children: O.userId })
              ] }),
              O.comment && /* @__PURE__ */ s("div", { className: "text-[11px] text-[#9399b2] italic", children: [
                '"',
                O.comment,
                '"'
              ] }),
              /* @__PURE__ */ t("div", { className: "text-[10px] text-[#6c7086] mt-1", children: O.at })
            ] }, Y))
          ] }),
          /* @__PURE__ */ s("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#89b4fa] font-semibold mb-1", children: "Status" }),
            /* @__PURE__ */ t("div", { className: "text-[11px] text-[#cdd6f4]", children: w.stepExecution.status })
          ] })
        ] })
      ] }) : d === "attempts" && S && S.length >= 2 ? /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "data-testid": "attempts-prev",
              disabled: l === 0,
              onClick: () => p((O) => O - 1),
              className: I(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l === 0 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "←"
            }
          ),
          /* @__PURE__ */ s(
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
              className: I(
                "px-2 py-0.5 text-[11px] bg-transparent border border-[#313244] rounded-sm font-mono",
                l >= S.length - 2 ? "text-[#45475a] cursor-not-allowed" : "text-[#cdd6f4] cursor-pointer"
              ),
              children: "→"
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { className: "grid grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ t(mn, { attempt: S[l], label: `Attempt ${l + 1}` }),
          /* @__PURE__ */ t(mn, { attempt: S[l + 1], label: `Attempt ${l + 2}` })
        ] })
      ] }) : null : /* @__PURE__ */ t("div", { className: "flex items-center justify-center h-full text-text-tertiary text-xs italic", children: "Select a step to inspect" }) })
    ] })
  ] });
}
function ca({
  definition: e,
  pausedBreakpoint: n,
  applyingPatch: r,
  revertingPatchId: o,
  dirtyPatch: a,
  dirtyPatchStepId: i,
  resetEditBufferKey: d,
  onContinue: c,
  onStepOver: l,
  onResumeAll: p,
  onApplyAndContinue: m,
  onRevertPatch: x,
  onEditBufferChange: f
}) {
  const g = st().runs[n.runId] ?? null, y = g?.steps?.[n.stepId]?.patches ?? [], N = !!a && i === n.stepId && Object.keys(a).length > 0, v = g?.status === "paused_at_breakpoint";
  return /* @__PURE__ */ s(
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
        /* @__PURE__ */ s("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ s("span", { className: "text-[13px] font-semibold text-amber-600", children: [
            "Paused at: ",
            mt(e, n.stepId)
          ] }),
          N && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: m,
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
          /* @__PURE__ */ t(
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
          /* @__PURE__ */ t(
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
          /* @__PURE__ */ t(
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
        /* @__PURE__ */ s(
          "div",
          {
            className: "grid [grid-template-columns:minmax(0,1fr)_240px] gap-3 min-h-[280px] max-h-[calc(100vh-220px)]",
            children: [
              /* @__PURE__ */ t("div", { className: "border border-border rounded-md bg-surface-inset overflow-hidden min-h-0", children: g ? /* @__PURE__ */ t(
                la,
                {
                  run: g,
                  activeStepId: n.stepId,
                  editable: !0,
                  onEditBufferChange: f,
                  resetEditBufferKey: d
                }
              ) : /* @__PURE__ */ t("div", { className: "p-3 text-xs text-text-tertiary", children: "Loading run…" }) }),
              /* @__PURE__ */ s(
                "div",
                {
                  "data-testid": "breakpoint-patch-history",
                  className: "border border-border rounded-md bg-surface-inset p-2.5 overflow-auto min-h-0",
                  children: [
                    /* @__PURE__ */ s("div", { className: "text-[10px] font-bold text-text-primary tracking-wide uppercase mb-2", children: [
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
                      return /* @__PURE__ */ s(
                        "div",
                        {
                          "data-testid": `breakpoint-patch-row-${C.patchId}`,
                          className: I(
                            "border border-border rounded p-1.5",
                            b ? "bg-gray-500/10 opacity-60" : "bg-[#11111b]"
                          ),
                          children: [
                            /* @__PURE__ */ s("div", { className: "flex items-center gap-1 text-[10px] text-[#cdd6f4] mb-0.5", children: [
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
                            /* @__PURE__ */ s("div", { className: "text-[10px] text-[#9399b2]", children: [
                              C.appliedAt,
                              C.appliedBy && /* @__PURE__ */ s(V, { children: [
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
                                className: I(
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
function he({ label: e, required: n, help: r, error: o, children: a, className: i }) {
  return /* @__PURE__ */ s("div", { className: I("flex flex-col", i), children: [
    /* @__PURE__ */ s("label", { className: "text-xs font-semibold text-text-secondary", children: [
      e,
      n && /* @__PURE__ */ t("span", { className: "text-[#dc2626] ml-1", children: "●" })
    ] }),
    /* @__PURE__ */ t("div", { className: "mt-1", children: a }),
    o && /* @__PURE__ */ t("div", { className: "text-[11px] text-[#dc2626] mt-0.5", children: o }),
    !o && r && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: r })
  ] });
}
function da({ title: e, defaultCollapsed: n = !1, children: r, className: o }) {
  const [a, i] = R(n);
  return /* @__PURE__ */ s("div", { className: I("flex flex-col", o), children: [
    /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        onClick: () => i((d) => !d),
        className: "flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer font-inherit text-xs font-semibold text-text-secondary",
        children: [
          /* @__PURE__ */ t("span", { children: a ? "▸" : "▾" }),
          " ",
          e
        ]
      }
    ),
    !a && /* @__PURE__ */ t("div", { className: "flex flex-col gap-3 mt-2", children: r })
  ] });
}
function Ve({ children: e, className: n }) {
  return /* @__PURE__ */ t("div", { className: I("flex flex-col gap-3 px-4 py-3", n), children: e });
}
const pa = [
  { name: "minute", min: 0, max: 59 },
  { name: "hour", min: 0, max: 23 },
  { name: "dayOfMonth", min: 1, max: 31 },
  { name: "month", min: 1, max: 12 },
  { name: "dayOfWeek", min: 0, max: 6 }
];
function ua(e, n, r) {
  const o = e.trim();
  if (o === "") return null;
  const a = /^\*\/(\d+)$/.exec(o);
  if (a) {
    const c = Number(a[1]);
    return !Number.isFinite(c) || c <= 0 ? null : { match: "*", step: c };
  }
  if (o === "*") return { match: "*" };
  const i = /^(\d+)-(\d+)$/.exec(o);
  if (i) {
    const c = Number(i[1]), l = Number(i[2]);
    if (!Number.isFinite(c) || !Number.isFinite(l) || c < n || l > r || c > l) return null;
    const p = [];
    for (let m = c; m <= l; m++) p.push(m);
    return { match: p };
  }
  if (o.includes(",")) {
    const c = o.split(","), l = /* @__PURE__ */ new Set(), p = [];
    for (const m of c) {
      const x = Number(m.trim());
      if (!Number.isFinite(x) || !Number.isInteger(x) || x < n || x > r) return null;
      l.has(x) || (l.add(x), p.push(x));
    }
    return p.length === 0 ? null : { match: p };
  }
  const d = Number(o);
  return !Number.isFinite(d) || !Number.isInteger(d) || d < n || d > r ? null : { match: [d] };
}
function ma(e) {
  if (typeof e != "string") return null;
  const n = e.trim().split(/\s+/);
  if (n.length !== 5) return null;
  const r = {};
  for (let o = 0; o < 5; o++) {
    const a = pa[o], i = ua(n[o], a.min, a.max);
    if (!i) return null;
    r[a.name] = i;
  }
  return r;
}
function it(e, n, r) {
  return e.match === "*" ? !e.step || e.step === 1 ? !0 : (n - r) % e.step === 0 : e.match.includes(n);
}
function fa(e, n) {
  return it(e.minute, n.getMinutes(), 0) && it(e.hour, n.getHours(), 0) && it(e.dayOfMonth, n.getDate(), 1) && it(e.month, n.getMonth() + 1, 1) && it(e.dayOfWeek, n.getDay(), 0);
}
function ha(e, n, r) {
  const o = [], a = new Date(n.getTime());
  a.setSeconds(0, 0), a.setMinutes(a.getMinutes() + 1);
  const i = 1440 * 366, d = new Date(a.getTime());
  for (let c = 0; c < i && o.length < r; c++)
    fa(e, d) && o.push(new Date(d.getTime())), d.setMinutes(d.getMinutes() + 1);
  return o;
}
const fn = /^[a-zA-Z0-9_-]{1,64}$/, xa = "http://localhost:13001";
function ga() {
  try {
    const e = localStorage.getItem("ws_document_types_v1");
    if (!e) return [];
    const n = JSON.parse(e);
    return Array.isArray(n) ? n.filter((r) => typeof r == "object" && r !== null).filter((r) => typeof r.id == "string" && typeof r.name == "string").map((r) => ({ id: r.id, name: r.name })) : [];
  } catch {
    return [];
  }
}
const ba = [
  { value: "manual", label: "Manual" },
  { value: "document.finalize", label: "Document finalize" },
  { value: "document.submit", label: "Document submit" },
  { value: "document.comment", label: "Document comment" },
  { value: "schedule", label: "Schedule" },
  { value: "webhook", label: "Webhook" }
];
function ya({ data: e, onChange: n }) {
  const { toast: r } = Tt(), a = zn(gr)?.definition?.triggerBinding?.webhookSecret, [i, d] = R(!1), c = e.triggerType.startsWith("document."), l = L(() => c ? ga() : [], [c]), p = c && !e.documentTypeId, m = e.triggerType === "schedule" && !e.schedule, x = e.triggerType === "webhook" && !e.webhookPath, f = e.webhookPath ?? "", h = e.triggerType === "webhook" && f.length > 0 && !fn.test(f), g = e.triggerType === "webhook" && fn.test(f) ? `${xa}/hooks/pipeline/${f}` : null, u = () => {
    g && navigator.clipboard.writeText(g).then(() => r("Webhook URL copied", { type: "success" })).catch(() => r("Could not copy webhook URL", { type: "error" }));
  }, y = () => {
    a && navigator.clipboard.writeText(a).then(() => r("Webhook secret copied", { type: "success" })).catch(() => r("Could not copy webhook secret", { type: "error" }));
  }, N = e.triggerType === "schedule" ? e.schedule ?? "" : "", v = L(
    () => N ? ma(N) : null,
    [N]
  ), C = L(() => v ? ha(v, /* @__PURE__ */ new Date(), 3) : [], [v]), b = e.triggerType === "schedule" && !!N && !v, w = e.triggerType === "document.finalize" ? "On finalize" : e.triggerType === "document.submit" ? "On submit for review" : e.triggerType === "document.comment" ? "On comment added" : "";
  return /* @__PURE__ */ s(Ve, { children: [
    /* @__PURE__ */ t(he, { label: "Trigger type", required: !0, children: /* @__PURE__ */ t(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.triggerType,
        onChange: (k) => n({ triggerType: k.target.value }),
        children: ba.map((k) => /* @__PURE__ */ t("option", { value: k.value, children: k.label }, k.value))
      }
    ) }),
    c && /* @__PURE__ */ s(
      he,
      {
        label: "Document type",
        required: !0,
        error: p ? "Select a document type." : void 0,
        help: p ? void 0 : "Which document type should trigger this pipeline.",
        children: [
          /* @__PURE__ */ s(
            "select",
            {
              className: I(
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
          w && /* @__PURE__ */ s("div", { className: "text-[11px] text-text-tertiary mt-1.5", children: [
            "Event: ",
            /* @__PURE__ */ t("span", { className: "font-semibold text-text-secondary", children: w })
          ] })
        ]
      }
    ),
    e.triggerType === "schedule" && /* @__PURE__ */ s(
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
              className: I(
                "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-mono",
                m || b ? "border-[#dc2626]" : "border-border-field"
              ),
              placeholder: "*/15 * * * *",
              value: e.schedule ?? "",
              onChange: (k) => n({ schedule: k.target.value })
            }
          ),
          /* @__PURE__ */ t("div", { className: "mt-2 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-tertiary font-mono", children: C.length > 0 ? /* @__PURE__ */ s(V, { children: [
            /* @__PURE__ */ t("div", { className: "text-text-secondary mb-1", children: "Next 3 fires:" }),
            C.map((k, $) => /* @__PURE__ */ t("div", { children: k.toLocaleString() }, $))
          ] }) : /* @__PURE__ */ t("span", { children: "Next fires: enter a valid cron expression to preview." }) })
        ]
      }
    ),
    e.triggerType === "webhook" && /* @__PURE__ */ s("div", { className: "flex flex-col gap-3", children: [
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
              className: I(
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
      /* @__PURE__ */ t("div", { className: "p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: g ? /* @__PURE__ */ s(V, { children: [
        /* @__PURE__ */ s("span", { className: "flex-1", children: [
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
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ t("label", { className: "text-xs font-semibold text-text-secondary", children: "Signing secret" }),
        /* @__PURE__ */ t("div", { className: "mt-1 p-2 bg-surface-inset border border-dashed border-border rounded-md text-[11px] text-text-secondary font-mono break-all flex items-center gap-2", children: a ? /* @__PURE__ */ s(V, { children: [
          /* @__PURE__ */ t("span", { className: "flex-1", "aria-label": "webhook secret", children: i ? a : "•".repeat(32) }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => d((k) => !k),
              className: "text-[11px] px-2 py-0.5 border border-border rounded bg-transparent text-text-secondary cursor-pointer font-sans",
              children: i ? "Hide" : "Reveal"
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
        ] }) : /* @__PURE__ */ s("span", { className: "font-sans text-text-tertiary", children: [
          "Save the pipeline to mint a signing secret. External callers must send ",
          /* @__PURE__ */ t("code", { children: "X-Pipeline-Signature-256: sha256=<hmac>" }),
          "."
        ] }) }),
        /* @__PURE__ */ s("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: [
          "HMAC-SHA256 of the raw request body. Send as",
          " ",
          /* @__PURE__ */ t("code", { children: "X-Pipeline-Signature-256: sha256=<hex>" }),
          "."
        ] })
      ] })
    ] })
  ] });
}
const hn = {
  maxAttempts: 3,
  backoffMs: 1e3,
  backoffMultiplier: 2
}, va = 3e4;
function Na(e) {
  return e < 1e3 ? `${Math.round(e)}ms` : e < 6e4 ? `${(e / 1e3).toFixed(e < 1e4 ? 1 : 0)}s` : `${Math.round(e / 6e4)}m`;
}
function wa(e) {
  const n = [];
  for (let r = 1; r < e.maxAttempts; r++) {
    const o = e.backoffMs * Math.pow(e.backoffMultiplier, r - 1);
    n.push(Math.min(o, va));
  }
  return n;
}
function Xt({ value: e, onChange: n }) {
  const r = e !== void 0, o = e ?? hn, a = r ? wa(o) : [], d = a.reduce((c, l) => c + l, 0) > 300 * 1e3;
  return /* @__PURE__ */ s("div", { "data-testid": "retry-policy-editor", className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ s("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          checked: r,
          onChange: (c) => n(c.target.checked ? hn : void 0),
          "aria-label": "Enable retries"
        }
      ),
      "Retry policy"
    ] }),
    !r && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-1", children: "No retries — failure is terminal on first attempt." }),
    r && /* @__PURE__ */ s(V, { children: [
      /* @__PURE__ */ s("div", { className: "grid grid-cols-3 gap-2 mt-1", children: [
        /* @__PURE__ */ s("div", { children: [
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
              onChange: (c) => {
                const l = Math.max(1, Math.min(10, parseInt(c.target.value, 10) || 1));
                n({ ...o, maxAttempts: l });
              },
              "aria-label": "Max attempts"
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { children: [
          /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "Initial backoff (ms)" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "number",
              min: 0,
              step: 100,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full mt-0.5 font-inherit",
              value: o.backoffMs,
              onChange: (c) => {
                const l = Math.max(0, parseInt(c.target.value, 10) || 0);
                n({ ...o, backoffMs: l });
              },
              "aria-label": "Initial backoff in milliseconds"
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { children: [
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
              onChange: (c) => {
                const l = Math.max(1, Math.min(4, parseFloat(c.target.value) || 1));
                n({ ...o, backoffMultiplier: l });
              },
              "aria-label": "Backoff multiplier"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-1", "data-testid": "retry-policy-preview", children: o.maxAttempts === 1 ? "Effectively no retry (1 attempt)." : a.length === 0 ? `Retries up to ${o.maxAttempts}× with no delay.` : `Retries up to ${o.maxAttempts}× with delays: ${a.map(Na).join(", ")}.` }),
      d && /* @__PURE__ */ t("div", { className: "text-[11px] text-[#ca8a04] mt-1", "data-testid": "retry-policy-tail-warning", children: "⚠ Total backoff >5min — long-tail latency risk on persistent failures." })
    ] })
  ] });
}
const xn = {
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
}, ka = [
  "context.doc.body",
  "context.doc.title",
  "context.trigger.userId",
  "context.steps"
], Qn = {
  "context.doc.body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "context.doc.title": "Sample Document Title",
  "context.trigger.userId": "user_abc123",
  "context.steps": '["step-1: fetched document", "step-2: validated schema"]'
};
function gn(e) {
  return e.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (n, r) => Qn[r] ?? `{{${r}}}`);
}
function Ca({ data: e, onChange: n }) {
  const [r, o] = R(!1), a = !e.systemPrompt?.trim(), i = !e.userPromptTemplate?.trim(), d = (c) => {
    const l = xn[c], p = l.includes(e.model) ? e.model : l[0];
    n({ provider: c, model: p });
  };
  return /* @__PURE__ */ s(Ve, { children: [
    /* @__PURE__ */ t(he, { label: "Provider", required: !0, children: /* @__PURE__ */ s(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.provider,
        onChange: (c) => d(c.target.value),
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
        onChange: (c) => n({ model: c.target.value }),
        children: xn[e.provider].map((c) => /* @__PURE__ */ t("option", { value: c, children: c }, c))
      }
    ) }),
    /* @__PURE__ */ t(
      he,
      {
        label: "System prompt",
        required: !0,
        error: a ? "System prompt is required." : void 0,
        help: a ? void 0 : "Sets the model's role and constraints.",
        children: /* @__PURE__ */ t(
          "textarea",
          {
            className: I(
              "border rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[80px]",
              a ? "border-[#dc2626]" : "border-border-field"
            ),
            value: e.systemPrompt,
            onChange: (c) => n({ systemPrompt: c.target.value })
          }
        )
      }
    ),
    /* @__PURE__ */ t(
      he,
      {
        label: "User prompt template",
        required: !0,
        error: i ? "User prompt template is required." : void 0,
        help: i ? void 0 : "Supports {{ context.* }} substitution — click a pill above to insert.",
        children: /* @__PURE__ */ t(
          Jt,
          {
            value: e.userPromptTemplate,
            onChange: (c) => n({ userPromptTemplate: c }),
            language: "template",
            variables: ka,
            minLines: 6,
            "aria-label": "User prompt template"
          }
        )
      }
    ),
    /* @__PURE__ */ s(da, { title: "Advanced", defaultCollapsed: !0, children: [
      /* @__PURE__ */ s(
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
                onChange: (c) => n({ temperature: parseFloat(c.target.value) }),
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
          onChange: (c) => {
            const l = c.target.value;
            n({ maxTokens: l === "" ? void 0 : Math.max(1, parseInt(l, 10) || 0) });
          }
        }
      ) }),
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ s("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "checkbox",
              checked: e.streaming,
              onChange: (c) => n({ streaming: c.target.checked })
            }
          ),
          "Streaming"
        ] }),
        /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Stream tokens as they are generated." })
      ] }),
      /* @__PURE__ */ t(
        Xt,
        {
          value: e.retryPolicy,
          onChange: (c) => n({ retryPolicy: c })
        }
      )
    ] }),
    /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        onClick: () => o((c) => !c),
        className: "px-3.5 py-1.5 text-[13px] font-semibold bg-primary text-white border-none rounded-md cursor-pointer font-inherit shrink-0",
        children: [
          r ? "▾" : "▶",
          " Preview with sample context"
        ]
      }
    ),
    r && /* @__PURE__ */ s("div", { className: "bg-surface-inset border border-border rounded-lg p-3 flex flex-col gap-2.5", children: [
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved system prompt" }),
        /* @__PURE__ */ t("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[120px] overflow-auto", children: gn(e.systemPrompt || "(empty)") })
      ] }),
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary mb-1", children: "Resolved user prompt" }),
        /* @__PURE__ */ t("pre", { className: "text-xs whitespace-pre-wrap break-words m-0 text-text-primary bg-white p-2 rounded-md border border-border max-h-[200px] overflow-auto", children: gn(e.userPromptTemplate || "(empty)") })
      ] }),
      /* @__PURE__ */ s("div", { className: "text-[11px] text-text-tertiary", children: [
        "Sample values: ",
        Object.keys(Qn).map((c) => `{{${c}}}`).join(", ")
      ] })
    ] })
  ] });
}
const Ia = ["context", "context.steps", "context.trigger"], Sa = [
  { value: "jsonpath", label: "JSONPath" },
  { value: "template", label: "Template" },
  { value: "javascript", label: "JavaScript" }
];
function Ta({ data: e, onChange: n }) {
  const r = !e.expression?.trim();
  return /* @__PURE__ */ s(Ve, { children: [
    /* @__PURE__ */ t(he, { label: "Type", required: !0, children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: Sa.map((o) => /* @__PURE__ */ s(
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
          Jt,
          {
            value: e.expression,
            onChange: (o) => n({ expression: o }),
            language: e.transformType === "javascript" ? "javascript" : "jsonpath",
            variables: Ia,
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
      Xt,
      {
        value: e.retryPolicy,
        onChange: (o) => n({ retryPolicy: o })
      }
    ),
    /* @__PURE__ */ t(he, { label: "Preview", children: /* @__PURE__ */ s("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ s("div", { children: [
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
      /* @__PURE__ */ s("div", { children: [
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
const Aa = ["context.trigger", "context.steps"];
function Ra({ data: e, onChange: n }) {
  const r = !e.expression?.trim();
  return /* @__PURE__ */ s(Ve, { children: [
    /* @__PURE__ */ t(
      he,
      {
        label: "Expression",
        required: !0,
        error: r ? "Expression is required." : void 0,
        help: r ? void 0 : "e.g. context.llm.response.length > 500",
        children: /* @__PURE__ */ t(
          Jt,
          {
            value: e.expression,
            onChange: (o) => n({ expression: o }),
            language: "javascript",
            variables: Aa,
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
const $a = [
  { value: "update-document", label: "Update document" },
  { value: "post-comment", label: "Post comment" },
  { value: "notify", label: "Notify user" },
  { value: "webhook", label: "Webhook" },
  { value: "mcp-tool", label: "MCP tool" },
  { value: "sync-back", label: "Sync back to source" }
], Da = {
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
function Pa({ data: e, onChange: n }) {
  const r = Da[e.actionType], o = e.config ?? {}, a = typeof o.retryCount == "number" ? o.retryCount : 3, i = e.onError === "route-error" ? "route-error" : typeof o.retryCount == "number" ? "retry" : "halt", d = (l, p) => {
    n({ config: { ...o, [l]: p } });
  }, c = (l) => {
    if (l === "route-error") {
      const { retryCount: p, ...m } = o;
      n({ onError: "route-error", config: m });
    } else if (l === "halt") {
      const { retryCount: p, ...m } = o;
      n({ onError: "fail-run", config: m });
    } else
      n({ onError: "fail-run", config: { ...o, retryCount: a } });
  };
  return /* @__PURE__ */ s(Ve, { children: [
    /* @__PURE__ */ t(he, { label: "Action type", required: !0, children: /* @__PURE__ */ t(
      "select",
      {
        className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit",
        value: e.actionType,
        onChange: (l) => n({ actionType: l.target.value, config: {} }),
        children: $a.map((l) => /* @__PURE__ */ t("option", { value: l.value, children: l.label }, l.value))
      }
    ) }),
    /* @__PURE__ */ t(he, { label: "Configuration", children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-2.5", children: r.map((l) => /* @__PURE__ */ s("div", { children: [
      /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: l.label }),
      l.multiline ? /* @__PURE__ */ t(
        "textarea",
        {
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit resize-y min-h-[48px] mt-0.5",
          rows: 2,
          placeholder: l.placeholder,
          value: typeof o[l.key] == "string" ? o[l.key] : "",
          onChange: (p) => d(l.key, p.target.value)
        }
      ) : /* @__PURE__ */ t(
        "input",
        {
          type: "text",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-full font-inherit mt-0.5",
          placeholder: l.placeholder,
          value: typeof o[l.key] == "string" ? o[l.key] : "",
          onChange: (p) => d(l.key, p.target.value)
        }
      ),
      l.help && /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: l.help })
    ] }, l.key)) }) }),
    /* @__PURE__ */ s("div", { children: [
      /* @__PURE__ */ s("label", { className: "text-xs font-semibold text-text-secondary flex items-center gap-1.5", children: [
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
    e.idempotent && /* @__PURE__ */ s(he, { label: "Dedup scope", children: [
      /* @__PURE__ */ s(
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
      Xt,
      {
        value: e.retryPolicy,
        onChange: (l) => n({ retryPolicy: l })
      }
    ),
    /* @__PURE__ */ t(he, { label: "On error", children: /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ s("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: i === "route-error",
            onChange: () => c("route-error")
          }
        ),
        "Route to error handle"
      ] }),
      /* @__PURE__ */ s("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: i === "halt",
            onChange: () => c("halt")
          }
        ),
        "Halt pipeline"
      ] }),
      /* @__PURE__ */ s("label", { className: "flex items-center gap-1.5 text-[13px] text-text-primary cursor-pointer", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "radio",
            name: "action-on-error",
            checked: i === "retry",
            onChange: () => c("retry")
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
            value: a,
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
const Ge = 2, lt = 8;
function bn(e, n) {
  const r = e ?? [];
  return r.length === n ? r : r.length > n ? r.slice(0, n) : [...r, ...Array(n - r.length).fill("")];
}
function Ma({ data: e, onChange: n }) {
  const r = Math.max(Ge, Math.min(lt, e.branchCount || Ge)), o = bn(e.branchLabels, r), a = (d) => {
    const c = Math.max(Ge, Math.min(lt, d));
    n({
      branchCount: c,
      branchLabels: bn(e.branchLabels, c)
    });
  }, i = (d, c) => {
    const l = [...o];
    l[d] = c, n({ branchLabels: l });
  };
  return /* @__PURE__ */ s(Ve, { children: [
    /* @__PURE__ */ s(
      he,
      {
        label: "Branch count",
        required: !0,
        help: `Between ${Ge} and ${lt} parallel branches.`,
        children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary text-xs ml-2", children: r }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "range",
              min: Ge,
              max: lt,
              step: 1,
              value: r,
              onChange: (d) => a(parseInt(d.target.value, 10)),
              className: "w-full mt-1"
            }
          ),
          /* @__PURE__ */ t(
            "input",
            {
              type: "number",
              min: Ge,
              max: lt,
              className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-20 font-inherit mt-1",
              value: r,
              onChange: (d) => a(parseInt(d.target.value, 10) || Ge)
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t(he, { label: "Branch labels (optional)", children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: o.map((d, c) => /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ s("span", { className: "text-xs text-text-secondary min-w-[72px]", children: [
        "Branch ",
        c,
        ":"
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          type: "text",
          className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none flex-1 min-w-[120px] font-inherit",
          value: d,
          onChange: (l) => i(c, l.target.value),
          placeholder: c === 0 ? "primary" : `branch-${c}`
        }
      )
    ] }, c)) }) })
  ] });
}
const Ea = [
  { value: "all", label: "All", hint: "Wait for every input." },
  { value: "any", label: "Any", hint: "Fire on the first input." },
  { value: "n_of_m", label: "N of M", hint: "Fire after N inputs." }
], Oa = [
  { value: "deep-merge", label: "Deep merge", hint: "Recursively merge input objects." },
  { value: "array-collect", label: "Array collect", hint: "Writes inputs to context.joinInputs[]." },
  { value: "last-writer-wins", label: "Last writer wins", hint: "Most recent input replaces prior." }
];
function La({ data: e, onChange: n }) {
  return /* @__PURE__ */ s(Ve, { children: [
    /* @__PURE__ */ s(he, { label: "Mode", required: !0, children: [
      /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: Ea.map((r) => /* @__PURE__ */ s(
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
            /* @__PURE__ */ s("span", { className: "text-text-tertiary text-[11px]", children: [
              "— ",
              r.hint
            ] })
          ]
        },
        r.value
      )) }),
      e.mode === "n_of_m" && /* @__PURE__ */ s("div", { className: "mt-2 flex items-center gap-2", children: [
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
    /* @__PURE__ */ t(he, { label: "Merge strategy", required: !0, children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", children: Oa.map((r) => /* @__PURE__ */ s(
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
          /* @__PURE__ */ s("span", { className: "text-text-tertiary text-[11px]", children: [
            "— ",
            r.hint
          ] })
        ]
      },
      r.value
    )) }) }),
    /* @__PURE__ */ s("div", { className: "p-2 bg-surface-inset border border-border rounded-md text-xs text-text-secondary", children: [
      "Current inputs: ",
      /* @__PURE__ */ t("strong", { children: "TBD" }),
      /* @__PURE__ */ t("div", { className: "text-[11px] text-text-tertiary mt-0.5", children: "Derived from incoming edges once the canvas is connected." })
    ] })
  ] });
}
const ft = {
  seconds: 1e3,
  minutes: 6e4,
  hours: 36e5
};
function _a(e) {
  return !e || e <= 0 ? "minutes" : e % ft.hours === 0 ? "hours" : e % ft.minutes === 0 ? "minutes" : "seconds";
}
function Ua({ data: e, onChange: n }) {
  const r = e.approvers ?? [], o = r.length === 0, [a, i] = R(() => _a(e.timeoutMs)), d = e.timeoutMs !== void 0 ? Math.round(e.timeoutMs / ft[a]) : "", c = r.filter((h) => h.type === "user").map((h) => h.value), l = (h) => {
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
    n({ timeoutMs: g * ft[a] });
  }, x = (h) => {
    i(h), typeof d == "number" && !Number.isNaN(d) && n({ timeoutMs: d * ft[h] });
  }, f = Math.max(1, r.length);
  return /* @__PURE__ */ s(Ve, { children: [
    /* @__PURE__ */ s(
      he,
      {
        label: "Approvers",
        required: !0,
        error: o ? "At least one approver is required." : void 0,
        help: o ? void 0 : "Who can approve this step.",
        children: [
          /* @__PURE__ */ t(
            Xr,
            {
              value: c,
              onChange: l,
              placeholder: "Add approver…"
            }
          ),
          r.length > 0 && /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5 mt-2", children: r.map((h, g) => /* @__PURE__ */ s(
            "span",
            {
              className: I(
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
        children: /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
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
          /* @__PURE__ */ s("span", { className: "text-text-tertiary text-xs", children: [
            e.requiredCount || 1,
            " of ",
            f
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ s(he, { label: "Timeout", help: "Leave blank for no timeout.", children: [
      /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "number",
            min: 0,
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-24 flex-none font-inherit",
            value: d,
            onChange: (h) => m(h.target.value),
            placeholder: "24"
          }
        ),
        /* @__PURE__ */ s(
          "select",
          {
            className: "border border-border-field rounded-md px-2.5 py-1.5 text-[13px] bg-[#f9fafb] text-text-primary outline-none w-[120px] flex-none font-inherit",
            value: a,
            onChange: (h) => x(h.target.value),
            children: [
              /* @__PURE__ */ t("option", { value: "seconds", children: "seconds" }),
              /* @__PURE__ */ t("option", { value: "minutes", children: "minutes" }),
              /* @__PURE__ */ t("option", { value: "hours", children: "hours" })
            ]
          }
        )
      ] }),
      e.timeoutMs !== void 0 && e.timeoutMs > 0 && /* @__PURE__ */ s("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("label", { className: "text-[11px] font-semibold text-text-secondary", children: "If timeout" }),
        /* @__PURE__ */ t("div", { className: "flex gap-3 mt-1", children: ["reject", "approve"].map((h) => /* @__PURE__ */ s(
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
function qt(e) {
  switch (Array.isArray(e.type) ? e.type[0] : e.type) {
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
function Zn(e) {
  const n = Array.isArray(e.type) ? e.type[0] : e.type;
  if (n === "array") {
    const r = e.items ? Array.isArray(e.items.type) ? e.items.type[0] : e.items.type : void 0;
    return r ? `array of ${r}` : "array";
  }
  return n ?? "unknown";
}
function ht(e, n, r, o, a) {
  if (a.has(e)) return;
  a.add(e);
  const i = Array.isArray(e.type) ? e.type[0] : e.type, d = [e.anyOf, e.oneOf, e.allOf].filter(Boolean);
  for (const c of d)
    for (const l of c)
      ht(l, n, r, o, a);
  if (i === "object" && e.properties) {
    for (const [c, l] of Object.entries(e.properties)) {
      const p = `${n}.${c}`, m = qt(l);
      o.push({
        path: p,
        label: `${c} (${Zn(l)})`,
        depth: r,
        kind: m,
        isArrayItems: m === "array"
      }), ht(l, p, r + 1, o, a);
    }
    return;
  }
  if (i === "array") {
    const c = `${n}[*]`, l = e.items, p = l ? qt(l) : "unknown";
    o.push({
      path: c,
      label: `${n.slice(n.lastIndexOf(".") + 1)}[*] (each item)`,
      depth: r,
      kind: p,
      isArrayItems: !0
    }), l && ht(l, c, r + 1, o, a);
  }
}
function Ba(e, n = "$") {
  if (!e || typeof e != "object") return [];
  const r = [], o = /* @__PURE__ */ new Set();
  if ((Array.isArray(e.type) ? e.type[0] : e.type) === "object" && e.properties)
    for (const [i, d] of Object.entries(e.properties)) {
      const c = `${n}.${i}`, l = qt(d);
      r.push({
        path: c,
        label: `${i} (${Zn(d)})`,
        depth: 0,
        kind: l,
        isArrayItems: l === "array"
      }), ht(d, c, 1, r, o);
    }
  else
    ht(e, n, 0, r, o);
  return r;
}
const Fa = {};
function ja() {
  return `${(typeof import.meta < "u" && Fa?.VITE_SOCIAL_API_URL) ?? ""}/api/pipeline/output-schemas`;
}
let Mt = null, ct = null;
async function za() {
  return Mt || (ct || (ct = fetch(ja()).then((e) => {
    if (!e.ok) throw new Error(`HTTP ${e.status}`);
    return e.json();
  }).then((e) => (Mt = e, ct = null, e)).catch((e) => {
    throw ct = null, e;
  })), ct);
}
const qa = {
  array: "bg-indigo-50 text-indigo-700 border-indigo-200",
  object: "bg-slate-50 text-slate-600 border-slate-200",
  string: "bg-emerald-50 text-emerald-700 border-emerald-200",
  number: "bg-amber-50 text-amber-700 border-amber-200",
  boolean: "bg-pink-50 text-pink-700 border-pink-200",
  unknown: "bg-slate-50 text-slate-400 border-slate-200"
};
function Ha({ kind: e }) {
  return /* @__PURE__ */ t(
    "span",
    {
      className: I(
        "inline-flex items-center px-1 py-0 rounded text-[10px] font-mono border leading-4",
        qa[e]
      ),
      children: e
    }
  );
}
function Ka({ entry: e, isSelected: n, onPick: r }) {
  return /* @__PURE__ */ s(
    "button",
    {
      type: "button",
      onClick: () => r(e.path),
      "data-testid": `path-row-${e.path}`,
      className: I(
        "w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors duration-100",
        "hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400/50",
        n && "bg-indigo-50 ring-1 ring-inset ring-indigo-300",
        e.isArrayItems && !n && "hover:bg-indigo-50"
      ),
      style: { paddingLeft: `${8 + e.depth * 12}px` },
      children: [
        /* @__PURE__ */ t(
          "span",
          {
            className: I(
              "flex-1 font-mono text-[12px] leading-5 truncate",
              e.isArrayItems ? "text-indigo-700 font-semibold" : "text-slate-700"
            ),
            children: e.path
          }
        ),
        /* @__PURE__ */ t(Ha, { kind: e.kind })
      ]
    }
  );
}
function Wa({
  value: e,
  onChange: n,
  upstreamKind: r,
  upstreamSchema: o
}) {
  const [a, i] = R("idle"), [d, c] = R(null), l = te(!0);
  q(() => (l.current = !0, () => {
    l.current = !1;
  }), []);
  const p = L(() => o !== void 0 ? o : d, [o, d]);
  q(() => {
    !r || o !== void 0 || (i("loading"), za().then((u) => {
      if (!l.current) return;
      const y = u.schemas[r] ?? null;
      c(y), i("done");
    }).catch(() => {
      l.current && i("error");
    }));
  }, [r, o]);
  const m = L(
    () => Ba(p),
    [p]
  ), x = p !== null && m.length > 0, f = M(
    (u) => {
      n(u);
    },
    [n]
  );
  if (!r && o === void 0)
    return /* @__PURE__ */ t(
      At,
      {
        value: e,
        onChange: n,
        enforcePrefix: !0,
        "data-testid": "scatter-path-plain-input"
      }
    );
  if (!x)
    return /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5", children: [
      a === "loading" && /* @__PURE__ */ s("p", { className: "text-[11px] text-slate-400 leading-4", children: [
        "Loading schema for ",
        r,
        "…"
      ] }),
      a === "error" && /* @__PURE__ */ t("p", { className: "text-[11px] text-amber-600 leading-4", children: "Could not load schema — enter path manually." }),
      (a === "done" || o === null) && /* @__PURE__ */ s("p", { className: "text-[11px] text-slate-400 leading-4", children: [
        "Schema unavailable for ",
        /* @__PURE__ */ t("span", { className: "font-mono", children: r }),
        " — enter path manually."
      ] }),
      /* @__PURE__ */ t(
        At,
        {
          value: e,
          onChange: n,
          enforcePrefix: !0,
          "data-testid": "scatter-path-fallback-input"
        }
      )
    ] });
  const g = m.filter((u) => u.isArrayItems).length < m.length;
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ s("p", { className: "text-[11px] text-slate-500 leading-4", children: [
      "Click a path to set itemsPath.",
      g && /* @__PURE__ */ s(V, { children: [
        " ",
        /* @__PURE__ */ t("span", { className: "text-indigo-600 font-semibold", children: "Indigo" }),
        " ",
        "paths are arrays — valid scatter sources."
      ] })
    ] }),
    /* @__PURE__ */ t(
      "div",
      {
        className: "flex flex-col gap-px border border-slate-200 rounded-md bg-white max-h-48 overflow-y-auto",
        "data-testid": "scatter-path-tree",
        role: "listbox",
        "aria-label": "Available output paths",
        children: m.map((u) => /* @__PURE__ */ t(
          Ka,
          {
            entry: u,
            isSelected: e === u.path,
            onPick: f
          },
          u.path
        ))
      }
    ),
    /* @__PURE__ */ t(
      At,
      {
        value: e,
        onChange: n,
        enforcePrefix: !0,
        "data-testid": "scatter-path-input",
        placeholder: "$.path selected above or type manually"
      }
    )
  ] });
}
const Et = "text-[12px] font-semibold text-text-secondary", Ot = "text-[11px] text-text-tertiary mt-0.5", Ja = "mt-1 w-full text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary";
function Va(e) {
  const { definition: n } = Je();
  return L(() => {
    if (!e || !n) return;
    const r = n.edges.find((a) => a.target === e);
    if (!r) return;
    const o = n.nodes.find((a) => a.id === r.source);
    if (o)
      return o.type;
  }, [e, n]);
}
function Ga({ data: e, onChange: n }) {
  const { selectedNodeId: r } = Je(), o = Va(r), a = e.maxConcurrency ?? "";
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ s("div", { children: [
      /* @__PURE__ */ s("label", { className: Et, children: [
        "Items path",
        /* @__PURE__ */ t("span", { className: "text-red-600 ml-1", "aria-hidden": !0, children: "*" })
      ] }),
      /* @__PURE__ */ t("div", { className: "mt-1", children: /* @__PURE__ */ t(
        Wa,
        {
          value: e.itemsPath ?? "",
          onChange: (i) => n({ itemsPath: i }),
          upstreamKind: o
        }
      ) }),
      !e.itemsPath?.trim() && /* @__PURE__ */ t("div", { role: "alert", className: "text-[11px] text-red-600 mt-0.5", children: "Items path is required." }),
      !!e.itemsPath && !e.itemsPath.startsWith("$.") && /* @__PURE__ */ s("div", { role: "alert", className: "text-[11px] text-red-600 mt-0.5", children: [
        "Path must start with ",
        /* @__PURE__ */ t("code", { children: "$." })
      ] }),
      !!e.itemsPath?.startsWith("$.") && /* @__PURE__ */ t("div", { className: Ot, children: "JSONPath into context resolving to an array. Each element becomes one scatter arm." })
    ] }),
    /* @__PURE__ */ s("div", { children: [
      /* @__PURE__ */ s("label", { htmlFor: "scatter-item-alias", className: Et, children: [
        "Item alias ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(optional, default: item)" })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "scatter-item-alias",
          type: "text",
          spellCheck: !1,
          className: Ja,
          value: e.itemAlias ?? "",
          onChange: (i) => n({ itemAlias: i.target.value.trim() || void 0 }),
          placeholder: "item"
        }
      ),
      /* @__PURE__ */ s("div", { className: Ot, children: [
        "Key written to ",
        /* @__PURE__ */ t("code", { children: "$.scatter.<alias>" }),
        " for each arm."
      ] })
    ] }),
    /* @__PURE__ */ s("div", { children: [
      /* @__PURE__ */ s("label", { htmlFor: "scatter-max-concurrency", className: Et, children: [
        "Max concurrency ",
        /* @__PURE__ */ t("span", { className: "text-text-tertiary font-normal", children: "(optional, default: 4)" })
      ] }),
      /* @__PURE__ */ t(
        "input",
        {
          id: "scatter-max-concurrency",
          type: "number",
          min: 1,
          max: 64,
          className: "mt-1 w-28 text-[12px] rounded border border-border bg-white px-2 py-1 outline-none focus:border-primary focus:ring-1 focus:ring-primary",
          value: a,
          onChange: (i) => {
            const d = i.target.value;
            n({
              maxConcurrency: d === "" ? void 0 : Math.max(1, parseInt(d, 10) || 1)
            });
          },
          placeholder: "4"
        }
      ),
      /* @__PURE__ */ t("div", { className: Ot, children: "Maximum number of arms executing concurrently." })
    ] })
  ] });
}
const Ya = {
  // -------------------------------------------------------------------------
  // Trigger
  // -------------------------------------------------------------------------
  trigger: /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "The entry point of every pipeline. Every pipeline has exactly one trigger." }),
    /* @__PURE__ */ t("h4", { children: "Trigger types" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "manual" }),
        " — started by clicking Run in the editor."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "document.finalize" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "document.submit" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "document.comment" }),
        " — fires on doc lifecycle events for a given document type."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "schedule" }),
        " — cron expression (e.g. ",
        /* @__PURE__ */ t("code", { children: "0 9 * * 1-5" }),
        ")."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "webhook" }),
        " — inbound HTTP POST at the configured path."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "triggerType" }),
        " — one of the above."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "documentTypeId" }),
        " — required for ",
        /* @__PURE__ */ t("code", { children: "document.*" }),
        "."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "schedule" }),
        " / ",
        /* @__PURE__ */ t("code", { children: "webhookPath" }),
        " — per type."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ s("p", { children: [
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
  llm: /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Calls an LLM with a prompt template filled from pipeline context." }),
    /* @__PURE__ */ t("h4", { children: "Provider & model" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "anthropic" }),
        " — Claude models (e.g. ",
        /* @__PURE__ */ t("code", { children: "claude-sonnet-4-6" }),
        ")."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "bedrock" }),
        " — same models via AWS Bedrock."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Prompt templates" }),
    /* @__PURE__ */ s("p", { children: [
      "Interpolate with ",
      /* @__PURE__ */ t("code", { children: "{{ context.steps.X.output }}" }),
      " or any dotted path into the run context."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Streaming" }),
    /* @__PURE__ */ s("p", { children: [
      "Toggle on to emit ",
      /* @__PURE__ */ t("code", { children: "pipeline.llm.token" }),
      " events as text arrives; off for a single response."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Errors" }),
    /* @__PURE__ */ s("p", { children: [
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
  transform: /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Pure data transform — JSONPath, template string, or sandboxed JavaScript. No side effects." }),
    /* @__PURE__ */ t("h4", { children: "When to use each" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "jsonpath" }),
        " — extract a value, e.g. ",
        /* @__PURE__ */ t("code", { children: "$.document.body.sections[0]" }),
        "."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "template" }),
        " — shape a string from context, e.g. ",
        /* @__PURE__ */ t("code", { children: "Hi {{context.user.name}}" }),
        "."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "javascript" }),
        " — arbitrary logic; runs in an isolated sandbox with ",
        /* @__PURE__ */ t("code", { children: "context" }),
        " as input."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Output" }),
    /* @__PURE__ */ s("p", { children: [
      /* @__PURE__ */ t("code", { children: "outputKey" }),
      " scopes the result into ",
      /* @__PURE__ */ s("code", { children: [
        "context.",
        "{outputKey}"
      ] }),
      ". Leave blank to merge into the root context."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Condition
  // -------------------------------------------------------------------------
  condition: /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Branches the flow based on a boolean expression evaluated over context." }),
    /* @__PURE__ */ t("h4", { children: "Expression language" }),
    /* @__PURE__ */ s("p", { children: [
      "JSONPath lookups combined with booleans and comparisons, e.g. ",
      /* @__PURE__ */ t("code", { children: '$.llm.output.sentiment == "positive"' }),
      " or ",
      /* @__PURE__ */ t("code", { children: "$.score > 0.8 && $.reviewed" }),
      "."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ s("p", { children: [
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
  action: /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Performs a side-effect: updates a doc, posts a comment, notifies, calls a webhook, or invokes an MCP tool." }),
    /* @__PURE__ */ t("h4", { children: "Subtypes" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "update-document" }),
        " — patch a document's body."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "post-comment" }),
        " — append a comment thread entry."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "notify" }),
        " — push notification to users/roles."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "webhook" }),
        " — outbound HTTP request."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "mcp-tool" }),
        " — invoke a registered MCP tool by name."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Idempotent flag" }),
    /* @__PURE__ */ s("p", { children: [
      "If ",
      /* @__PURE__ */ t("code", { children: "idempotent" }),
      " is true, retries are safe after partial completion — the runtime may re-invoke the action without guarding against duplicates."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Errors" }),
    /* @__PURE__ */ s("p", { children: [
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
  fork: /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Splits the flow into N parallel branches that all run concurrently against the same context snapshot." }),
    /* @__PURE__ */ t("h4", { children: "Branch count" }),
    /* @__PURE__ */ s("p", { children: [
      "2-8 branches. Each branch exposes a handle ",
      /* @__PURE__ */ t("code", { children: "branch-0" }),
      ", ",
      /* @__PURE__ */ t("code", { children: "branch-1" }),
      ", etc."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Downstream" }),
    /* @__PURE__ */ s("p", { children: [
      "Typically paired with a ",
      /* @__PURE__ */ t("code", { children: "Join" }),
      " to merge results. Without a Join, each branch terminates independently and the run completes when all tails finish."
    ] })
  ] }),
  // -------------------------------------------------------------------------
  // Join
  // -------------------------------------------------------------------------
  join: /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Combines N parallel branches back into one flow." }),
    /* @__PURE__ */ t("h4", { children: "Modes" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "all" }),
        " — wait for every input."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "any" }),
        " — fire as soon as the first input arrives; later inputs are ignored."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "n_of_m" }),
        " — fire after ",
        /* @__PURE__ */ t("code", { children: "n" }),
        " of ",
        /* @__PURE__ */ t("code", { children: "m" }),
        " inputs complete."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Merge strategies" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "deep-merge" }),
        " — recursive object merge."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "array-collect" }),
        " — collect each branch's output into an array."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "last-writer-wins" }),
        " — final branch to arrive replaces prior values."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Partial failures (§17.2)" }),
    /* @__PURE__ */ s("p", { children: [
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
  approval: /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ s("p", { children: [
      "Blocks the pipeline waiting for human approval. The run enters ",
      /* @__PURE__ */ t("code", { children: "awaiting_approval" }),
      " until decisions are recorded."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Approvers" }),
    /* @__PURE__ */ s("p", { children: [
      "A list of users or roles. ",
      /* @__PURE__ */ t("code", { children: "requiredCount" }),
      " controls how many approvals are needed (n-of-m)."
    ] }),
    /* @__PURE__ */ t("h4", { children: "Timeout" }),
    /* @__PURE__ */ s("p", { children: [
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
    /* @__PURE__ */ s("p", { children: [
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
  agent: /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Invokes a Strands agent via A2A protocol. The agent processes the input and returns a structured response." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "agentId" }),
        " — AgentCore agent identifier or ARN."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "protocol" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "a2a" }),
        " (recommended) or ",
        /* @__PURE__ */ t("code", { children: "direct" }),
        "."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "inputTemplate" }),
        " — supports ",
        /* @__PURE__ */ t("code", { children: "{{context.*}}" }),
        " substitution."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "streaming" }),
        " — whether to stream the agent's response tokens."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ s("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " (success) and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      " (invocation failure)."
    ] })
  ] }),
  "mcp-tool": /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Invokes an external tool through an MCP Gateway server." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "gatewayUrl" }),
        " — MCP Gateway endpoint."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "toolName" }),
        " — registered tool to invoke."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "inputTemplate" }),
        " — JSON input with substitution support."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ s("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "knowledge-base": /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Queries a Bedrock Knowledge Base for relevant document chunks (RAG retrieval)." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "knowledgeBaseId" }),
        " — Bedrock KB identifier."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "queryTemplate" }),
        " — natural language query with substitution."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "topK" }),
        " — number of chunks to retrieve (default 5)."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "scoreThreshold" }),
        " — minimum relevance score (0–1)."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ s("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " (retrieved chunks in context) and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  "graph-query": /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Runs an openCypher query against a Neptune Analytics graph." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "graphId" }),
        " — Neptune Analytics graph identifier."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "query" }),
        " — openCypher query (NOT Gremlin/SPARQL)."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "parameters" }),
        " — named query parameters."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ s("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  memory: /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Reads from or writes to AgentCore Memory (session or long-term)." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "mode" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "read" }),
        " or ",
        /* @__PURE__ */ t("code", { children: "write" }),
        "."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "scope" }),
        " — ",
        /* @__PURE__ */ t("code", { children: "session" }),
        " (ephemeral) or ",
        /* @__PURE__ */ t("code", { children: "long-term" }),
        " (persistent)."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "namespace" }),
        " — memory collection key."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "keyExpression" }),
        " — lookup key (read) or storage key (write)."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ s("p", { children: [
      "Output handles: ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  guardrail: /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Applies Bedrock Guardrails content filtering. Evaluates input against configured policies and routes accordingly." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "guardrailId" }),
        " — Bedrock Guardrail identifier."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "inputField" }),
        " — context path to evaluate."
      ] }),
      /* @__PURE__ */ s("li", { children: [
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
    /* @__PURE__ */ s("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ t("code", { children: "pass" }),
      " (content OK) and ",
      /* @__PURE__ */ t("code", { children: "block" }),
      " (content flagged)."
    ] })
  ] }),
  policy: /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Evaluates a Cedar authorization policy against principal/action/resource." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "policyStoreId" }),
        " — Cedar policy store identifier."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "principal" }),
        " — who is requesting (supports substitution)."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "action" }),
        " — what action is being performed."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "resource" }),
        " — what resource is being accessed."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ s("p", { children: [
      "Two output handles: ",
      /* @__PURE__ */ t("code", { children: "allow" }),
      " and ",
      /* @__PURE__ */ t("code", { children: "deny" }),
      "."
    ] })
  ] }),
  "ag-ui-output": /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Streams output to the AG-UI frontend via Server-Sent Events. This is a terminal node — no downstream flow." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "sourceField" }),
        " — context path to stream."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "eventType" }),
        " — AG-UI event type to emit (TEXT_MESSAGE_CONTENT, STATE_DELTA, or CUSTOM)."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "terminal" }),
        " — marks this as the pipeline endpoint."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ s("p", { children: [
      "One input handle ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ". No output — this is the endpoint."
    ] })
  ] }),
  "image-source": /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Injects an existing image into the pipeline context. Use this as the entry point for image-processing pipelines when the image is already stored in the blob store." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "imageId" }),
        " — optional; can be set at run time by the trigger or a preceding step."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "outputKey" }),
        " — the key written to pipeline context (default: ",
        /* @__PURE__ */ t("code", { children: "imageRef" }),
        ")."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ s("p", { children: [
      "One output handle ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ". No inputs — this is a source node."
    ] })
  ] }),
  "image:save": /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Writes a produced image to a named file in the artifact store. Dispatched server-side by the SaveStepHandler." }),
    /* @__PURE__ */ t("h4", { children: "Fields" }),
    /* @__PURE__ */ s("ul", { children: [
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "sourceImagePath" }),
        " — JSONPath to the imageId to save (default: ",
        /* @__PURE__ */ t("code", { children: "$.scatter.parentImageId" }),
        ")."
      ] }),
      /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("code", { children: "filenameTemplate" }),
        " — output filename; supports ",
        /* @__PURE__ */ t("code", { children: "{{scatter.item.label}}" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "{{scatter.index}}" }),
        ", ",
        /* @__PURE__ */ t("code", { children: "{{scatter.parentImageId}}" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ s("p", { children: [
      "One input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ", one output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      ", one error handle ",
      /* @__PURE__ */ t("code", { children: "error" }),
      "."
    ] })
  ] }),
  scatter: /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ t("h4", { children: "What it does" }),
    /* @__PURE__ */ t("p", { children: "Fans out over a collection — runs downstream nodes once per item in the scatter set. Results are collected by a downstream Join or Save node." }),
    /* @__PURE__ */ t("h4", { children: "Wiring" }),
    /* @__PURE__ */ s("p", { children: [
      "One input ",
      /* @__PURE__ */ t("code", { children: "in" }),
      ". One output ",
      /* @__PURE__ */ t("code", { children: "out" }),
      " that fires once per item in the scatter collection."
    ] })
  ] })
}, Xa = {
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
  }
}, Ue = ({ data: e }) => /* @__PURE__ */ s("div", { className: "p-3 text-[13px] text-[#64748b]", children: [
  "Configuration for ",
  /* @__PURE__ */ t("strong", { children: e.type }),
  " — coming in Phase C."
] }), Qa = {
  trigger: ya,
  llm: Ca,
  transform: Ta,
  condition: Ra,
  action: Pa,
  fork: Ma,
  join: La,
  approval: Ua,
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
  scatter: Ga
};
function Za(e, n) {
  const r = Qa[e.type];
  return /* @__PURE__ */ t(r, { data: e.data, onChange: n });
}
function ei({ selectedIds: e }) {
  const {
    definition: n,
    selectedNodeId: r,
    setSelectedNodeId: o,
    updateNodeData: a,
    removeNode: i,
    duplicateNodes: d
  } = Je(), [c, l] = R("config"), p = te(null), m = te(null);
  Wt();
  const x = L(() => e && e.length > 1 ? e : r ? [r] : [], [e, r]), f = x.length > 1, h = x.length > 0, g = L(() => f || x.length === 0 || !n ? null : n.nodes.find((b) => b.id === x[0]) ?? null, [n, x, f]), u = M(() => {
    o(null);
  }, [o]);
  q(() => {
    l("config");
  }, [x.join(",")]), q(() => {
    if (!h) return;
    const b = (w) => {
      w.key === "Escape" && (w.stopPropagation(), u());
    };
    return window.addEventListener("keydown", b), () => window.removeEventListener("keydown", b);
  }, [h, u]), q(() => {
    if (!h) return;
    const b = (w) => {
      const k = p.current;
      k && (w.target instanceof Node && k.contains(w.target) || w.target instanceof Element && (w.target.closest("[data-node-type]") || u()));
    };
    return window.addEventListener("mousedown", b), () => window.removeEventListener("mousedown", b);
  }, [h, u]);
  const y = g ? Xa[g.type] : null, N = () => {
    if (f)
      for (const b of x) i(b);
    else g && i(g.id);
  }, v = () => {
    x.length !== 0 && d(x);
  }, C = (b) => {
    g && a(g.id, b);
  };
  return /* @__PURE__ */ t("div", { ref: p, className: "flex flex-col flex-1 min-h-0 bg-white", "data-testid": "config-panel", children: f ? (
    // ---------------------------------------------------------------
    // Multi-select pane
    // ---------------------------------------------------------------
    /* @__PURE__ */ s(V, { children: [
      /* @__PURE__ */ s("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ t("span", { className: "text-base", "aria-hidden": !0, children: "⧉" }),
        /* @__PURE__ */ s("div", { className: "flex-1 text-[13px] font-semibold text-[#0f172a]", children: [
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
      /* @__PURE__ */ s("div", { className: "flex-1 overflow-y-auto p-4 flex flex-col gap-3", children: [
        /* @__PURE__ */ t("div", { className: "text-xs text-[#64748b] leading-normal", children: "Bulk actions apply to every selected node. Individual node configuration is only shown for single selections." }),
        /* @__PURE__ */ s("div", { className: "flex gap-2", children: [
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
    /* @__PURE__ */ s(V, { children: [
      /* @__PURE__ */ s("div", { className: "h-11 px-3 pl-3.5 flex items-center gap-2 border-b border-[#e2e8f0] shrink-0", children: [
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
            const w = ["config", "runs", "docs"], k = w.indexOf(c);
            let $ = null;
            b.key === "ArrowRight" ? $ = w[(k + 1) % w.length] : b.key === "ArrowLeft" ? $ = w[(k - 1 + w.length) % w.length] : b.key === "Home" ? $ = w[0] : b.key === "End" && ($ = w[w.length - 1]), $ && (b.preventDefault(), l($), m.current?.querySelector(
              `[data-tab="${$}"]`
            )?.focus());
          },
          children: ["config", "runs", "docs"].map((b) => {
            const w = c === b, k = b === "config" ? "Config" : b === "runs" ? "Runs" : "Docs";
            return /* @__PURE__ */ t(
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
                children: k
              },
              b
            );
          })
        }
      ),
      /* @__PURE__ */ s("div", { className: "flex-1 overflow-y-auto", children: [
        c === "config" && Za(g, C),
        c === "runs" && /* @__PURE__ */ t("div", { className: "p-6 text-xs text-[#64748b]", children: "No runs yet." }),
        c === "docs" && /* @__PURE__ */ t("div", { className: "pipeline-docs-pane p-4 text-[13px] text-[#0f172a] leading-snug", children: Ya[g.type] ?? /* @__PURE__ */ t("p", { className: "text-text-secondary", children: "No docs available for this node type." }) })
      ] }),
      /* @__PURE__ */ s("div", { className: "h-10 px-3 flex items-center justify-between gap-2 border-t border-[#e2e8f0] shrink-0", children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: N,
            className: "px-2.5 py-1.5 text-xs font-semibold bg-transparent text-[#dc2626] border border-transparent rounded-md cursor-pointer font-inherit",
            children: "🗑 Delete node"
          }
        ),
        /* @__PURE__ */ s(
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
function tt(e) {
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
function ti(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function ni(e) {
  return e == null || e === 0 ? "--" : e < 1e-3 ? "<$0.001" : e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function ri(e) {
  return e == null || e === 0 ? "text-text-tertiary" : e < 0.01 ? "text-[#16a34a]" : e < 0.1 ? "text-[#ca8a04]" : e < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function yn(e) {
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
function Lt(e) {
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
function oi(e) {
  return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function Ye({ label: e, children: n }) {
  return /* @__PURE__ */ s("div", { className: "flex items-baseline gap-2", children: [
    /* @__PURE__ */ t("span", { className: "min-w-[80px] text-[11px] font-semibold uppercase text-text-tertiary", children: e }),
    /* @__PURE__ */ t("span", { className: "text-[13px] text-text-primary", children: n })
  ] });
}
function si({ pipelineId: e, run: n, onBack: r }) {
  const o = Pe();
  return /* @__PURE__ */ s("div", { className: "absolute inset-0 z-[2] flex flex-col overflow-hidden bg-surface", children: [
    /* @__PURE__ */ s("div", { className: "flex shrink-0 items-center gap-2 border-b border-border px-4 py-2.5", children: [
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
    /* @__PURE__ */ t("div", { className: "flex-1 overflow-y-auto p-4", children: /* @__PURE__ */ s("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ t(Ye, { label: "Status", children: /* @__PURE__ */ t(
        ne,
        {
          tone: yn(n.status),
          "aria-label": `Status: ${Lt(n.status)}`,
          children: Lt(n.status)
        }
      ) }),
      /* @__PURE__ */ t(Ye, { label: "Started", children: new Date(n.startedAt).toLocaleString() }),
      n.completedAt && /* @__PURE__ */ t(Ye, { label: "Completed", children: new Date(n.completedAt).toLocaleString() }),
      /* @__PURE__ */ t(Ye, { label: "Duration", children: ve(n.durationMs) }),
      /* @__PURE__ */ t(Ye, { label: "Triggered by", children: oi(n) }),
      /* @__PURE__ */ t(Ye, { label: "Trigger type", children: n.triggeredBy.triggerType }),
      n.estimatedCostUsd != null && n.estimatedCostUsd > 0 && /* @__PURE__ */ s(Ye, { label: "Est. Cost", children: [
        /* @__PURE__ */ t("span", { className: I("font-semibold", ri(n.estimatedCostUsd)), children: ni(n.estimatedCostUsd) }),
        n.estimatedCostUsd > 1 && /* @__PURE__ */ t("span", { className: "ml-1.5 rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "Budget Warning" })
      ] }),
      n.tokenUsage && Object.keys(n.tokenUsage).length > 0 && /* @__PURE__ */ s("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: "Cost Breakdown" }),
        Object.entries(n.tokenUsage).map(([a, i]) => /* @__PURE__ */ s(
          "div",
          {
            className: "flex items-center gap-2 py-0.5 text-[11px]",
            children: [
              /* @__PURE__ */ t("span", { className: "min-w-[100px] font-mono text-text-secondary", children: a }),
              /* @__PURE__ */ s("span", { className: "text-text-tertiary", children: [
                i.tokensIn.toLocaleString(),
                " in / ",
                i.tokensOut.toLocaleString(),
                " out"
              ] })
            ]
          },
          a
        ))
      ] }),
      n.error && /* @__PURE__ */ s("div", { className: "mt-2", children: [
        /* @__PURE__ */ t("div", { className: "mb-1 text-[11px] font-semibold uppercase text-state-failed", children: "Error" }),
        /* @__PURE__ */ s("div", { className: "whitespace-pre-wrap break-words rounded-md bg-[#fef2f2] px-2.5 py-2 font-mono text-xs text-[#991b1b]", children: [
          n.error.message,
          n.error.nodeId && /* @__PURE__ */ s("div", { className: "mt-1 text-[11px] text-[#b91c1c]", children: [
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
      Object.keys(n.steps).length > 0 && /* @__PURE__ */ s("div", { className: "mt-2", children: [
        /* @__PURE__ */ s("div", { className: "mb-1.5 text-[11px] font-semibold uppercase text-text-secondary", children: [
          "Steps (",
          Object.keys(n.steps).length,
          ")"
        ] }),
        Object.entries(n.steps).map(([a, i]) => {
          const d = yn(i.status), c = Lt(i.status), l = i.output, p = l?.response;
          return /* @__PURE__ */ s("div", { className: "mb-2", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2 py-1 text-xs", children: [
              /* @__PURE__ */ t(ne, { tone: d, "aria-label": `Status: ${c}`, children: c }),
              /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: a.slice(0, 10) }),
              i.durationMs != null && /* @__PURE__ */ t("span", { className: "ml-auto text-[11px] text-text-tertiary", children: ve(i.durationMs) })
            ] }),
            p && /* @__PURE__ */ t("div", { className: "mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-2 text-xs leading-relaxed text-text-primary", children: p }),
            l && !p && Object.keys(l).length > 0 && /* @__PURE__ */ t("div", { className: "mt-1 max-h-[120px] overflow-y-auto whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset px-2.5 py-1.5 font-mono text-[11px] text-text-secondary", children: JSON.stringify(l, null, 2) })
          ] }, a);
        })
      ] }),
      /* @__PURE__ */ t("div", { className: "mt-3", children: /* @__PURE__ */ s("details", { children: [
        /* @__PURE__ */ t("summary", { className: "cursor-pointer select-none text-[11px] text-text-tertiary", children: "Raw snapshot JSON" }),
        /* @__PURE__ */ t("pre", { className: "mt-1.5 max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-md border border-border bg-surface-inset p-2.5 text-[10px]", children: JSON.stringify(n, null, 2) })
      ] }) })
    ] }) })
  ] });
}
function vn(e) {
  return e == null || e === 0 ? "--" : e < 1e-3 ? "<$0.001" : e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function ai(e) {
  return e == null || e === 0 ? "text-text-tertiary" : e < 0.01 ? "text-[#16a34a]" : e < 0.1 ? "text-[#ca8a04]" : e < 1 ? "text-[#ea580c]" : "text-[#dc2626]";
}
function ii(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function li(e) {
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
function ci(e) {
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
function di(e) {
  return e.triggeredBy.userId ? e.triggeredBy.userId : e.triggeredBy.triggerType || "manual";
}
function pi({ pipelineId: e, onClose: n }) {
  const r = Pe(), [o, a] = R([]), [i, d] = R(!0), [c, l] = R(null), [p, m] = R(null), [x, f] = R(!1), [h, g] = R([]), u = te(null), y = M(async () => {
    d(!0), l(null);
    try {
      const b = await Hn(e, { limit: 50 });
      a(b.runs);
    } catch (b) {
      l(b instanceof Error ? b.message : "Failed to load runs");
    } finally {
      d(!1);
    }
  }, [e]);
  q(() => {
    u.current !== e && (u.current = e, y());
  }, [e, y]), Re("*", M((b) => {
    const { eventType: w, payload: k } = b;
    if (!k || typeof k != "object") return;
    const $ = k;
    if (!($.pipelineId && $.pipelineId !== e))
      switch (w) {
        case "pipeline.run.started": {
          const S = k;
          if (S.pipelineId !== e) return;
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
          a((D) => [A, ...D.filter((H) => H.id !== S.runId)]);
          break;
        }
        case "pipeline.run.completed": {
          const S = k;
          a(
            (A) => A.map(
              (D) => D.id === S.runId ? { ...D, status: "completed", completedAt: S.at, durationMs: S.durationMs } : D
            )
          );
          break;
        }
        case "pipeline.run.failed": {
          const S = k;
          a(
            (A) => A.map(
              (D) => D.id === S.runId ? { ...D, status: "failed", completedAt: S.at, error: S.error } : D
            )
          );
          break;
        }
        case "pipeline.run.cancelled": {
          const S = k;
          a(
            (A) => A.map(
              (D) => D.id === S.runId ? { ...D, status: "cancelled", completedAt: S.at } : D
            )
          );
          break;
        }
      }
  }, [e]));
  const N = L(
    () => o.find((b) => b.id === p) ?? null,
    [o, p]
  ), v = M((b) => {
    g((w) => w.includes(b) ? w.filter((k) => k !== b) : w.length >= 2 ? [w[1], b] : [...w, b]);
  }, []), C = M(() => {
    if (h.length !== 2) return;
    const [b, w] = h;
    r(`/pipelines/${e}/compare?a=${b}&b=${w}`);
  }, [h, r, e]);
  return /* @__PURE__ */ s(
    "div",
    {
      className: "relative flex min-h-0 flex-1 flex-col overflow-hidden bg-surface",
      "data-testid": "pipeline-runs-panel",
      children: [
        /* @__PURE__ */ s("div", { className: "flex shrink-0 items-center justify-between border-b border-border px-4 py-3", children: [
          /* @__PURE__ */ t("span", { className: "text-sm font-bold text-text-primary", children: "Run History" }),
          /* @__PURE__ */ s("div", { className: "ml-auto flex items-center gap-1.5", children: [
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                onClick: () => {
                  f(!x), x && g([]);
                },
                "data-testid": "runs-panel-compare-toggle",
                className: I(
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
        x && /* @__PURE__ */ s(
          "div",
          {
            className: "flex shrink-0 items-center gap-2 border-b border-border bg-surface-inset px-4 py-2",
            "data-testid": "runs-panel-compare-bar",
            children: [
              /* @__PURE__ */ s("span", { className: "text-[11px] text-text-secondary", children: [
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
                  className: I(
                    "ml-auto rounded px-2.5 py-0.5 font-inherit text-[11px] font-semibold",
                    h.length === 2 ? "cursor-pointer border border-primary bg-primary text-white" : "cursor-not-allowed border border-border bg-surface text-text-disabled"
                  ),
                  children: "Compare"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s("div", { className: "relative min-h-0 flex-1", children: [
          N && /* @__PURE__ */ t(
            si,
            {
              pipelineId: e,
              run: N,
              onBack: () => m(null)
            }
          ),
          i && o.length === 0 && /* @__PURE__ */ t("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "Loading runs..." }),
          c && /* @__PURE__ */ s("div", { className: "p-4 text-center text-xs text-state-failed", children: [
            c,
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
          !i && !c && o.length === 0 && /* @__PURE__ */ t("div", { className: "p-6 text-center text-[13px] text-text-tertiary", children: "No runs yet. Trigger this pipeline to see history here." }),
          o.length > 0 && /* @__PURE__ */ t("ul", { className: "m-0 flex-1 list-none overflow-y-auto p-0", children: o.map((b) => {
            const w = li(b.status), k = ci(b.status), $ = h.includes(b.id);
            return /* @__PURE__ */ s(
              "li",
              {
                "data-testid": `runs-panel-row-${b.id}`,
                onClick: () => {
                  x ? v(b.id) : m(b.id);
                },
                className: I(
                  "cursor-pointer border-b border-border px-4 py-2.5 transition-colors duration-100 hover:bg-surface-hover",
                  $ && "bg-[#eff6ff]"
                ),
                children: [
                  /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
                    x && /* @__PURE__ */ t(
                      "input",
                      {
                        type: "checkbox",
                        checked: $,
                        onChange: () => v(b.id),
                        onClick: (S) => S.stopPropagation(),
                        "data-testid": `runs-panel-compare-check-${b.id}`,
                        className: "m-0 shrink-0 accent-primary",
                        "aria-label": `Select run ${b.id.slice(0, 8)} for comparison`
                      }
                    ),
                    /* @__PURE__ */ t(ne, { tone: w, "aria-label": `Status: ${k}`, children: k }),
                    /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-secondary", children: b.id.slice(0, 8) }),
                    /* @__PURE__ */ t("span", { className: "ml-auto text-[11px] text-text-tertiary", children: ii(b.startedAt) })
                  ] }),
                  /* @__PURE__ */ s("div", { className: "mt-1 flex items-center gap-2 text-[11px] text-text-tertiary", children: [
                    /* @__PURE__ */ t("span", { children: ve(b.durationMs) }),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 0 && /* @__PURE__ */ t(
                      "span",
                      {
                        className: I("font-mono font-semibold", ai(b.estimatedCostUsd)),
                        title: `Estimated cost: ${vn(b.estimatedCostUsd)}`,
                        children: vn(b.estimatedCostUsd)
                      }
                    ),
                    b.estimatedCostUsd != null && b.estimatedCostUsd > 1 && /* @__PURE__ */ t("span", { className: "rounded-sm bg-[#fef3c7] px-1 py-px text-[9px] font-bold uppercase text-[#92400e]", children: "High Cost" }),
                    /* @__PURE__ */ t("span", { className: "ml-auto", children: di(b) })
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
function ui({
  pipelineId: e,
  selectedNodeId: n,
  sidebarTab: r,
  onTabChange: o
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      className: I(
        "w-[350px] shrink-0 border-l border-border bg-surface",
        "flex flex-col overflow-hidden"
      ),
      "data-testid": "right-sidebar",
      children: [
        !(n !== null && r === "config") && /* @__PURE__ */ s("div", { className: "h-[38px] flex border-b border-border shrink-0", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: I(
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
              className: I(
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
        /* @__PURE__ */ s("div", { className: "flex-1 overflow-y-auto flex flex-col", children: [
          r === "config" && (n !== null ? /* @__PURE__ */ t(ei, {}) : /* @__PURE__ */ t("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px] p-5 text-center", children: "Select a node to configure" })),
          r === "runs" && /* @__PURE__ */ t(
            pi,
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
function mi(e) {
  return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function fi(e) {
  if (!e) return [];
  const n = /* @__PURE__ */ new Set(), r = /\{\{\s*context\.([a-zA-Z0-9_.]+)\s*\}\}/g;
  for (const o of e.nodes) {
    const a = o.data;
    if (a.type === "llm") {
      for (const i of (a.userPromptTemplate || "").matchAll(r))
        i[1].startsWith("steps.") || n.add(i[1]);
      for (const i of (a.systemPrompt || "").matchAll(r))
        i[1].startsWith("steps.") || n.add(i[1]);
    } else if (a.type === "transform" && a.expression)
      for (const i of a.expression.matchAll(r))
        i[1].startsWith("steps.") || n.add(i[1]);
  }
  return Array.from(n);
}
function hi(e) {
  if (!(e instanceof HTMLElement)) return !1;
  const n = e.tagName;
  return !!(n === "INPUT" || n === "TEXTAREA" || n === "SELECT" || e.isContentEditable);
}
function pd() {
  const { pipelineId: e } = rt(), n = L(() => e ? Xe(e) !== null : !1, [e]);
  return !e || !n ? /* @__PURE__ */ t(ot, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t(Kn, { pipelineId: e, children: /* @__PURE__ */ t(xi, { pipelineId: e }) });
}
function xi({ pipelineId: e }) {
  const n = Pe(), r = Je(), o = st(), { toast: a } = Tt(), {
    definition: i,
    dirty: d,
    selectedNodeId: c,
    setSelectedNodeId: l,
    save: p,
    publish: m,
    revert: x,
    undo: f,
    redo: h,
    setTags: g
  } = r, u = Ys(e), [y, N] = R(!1), v = te(null), C = te(d);
  q(() => (C.current && !d && (N(!0), v.current && clearTimeout(v.current), v.current = setTimeout(() => N(!1), 450)), C.current = d, () => {
    v.current && (clearTimeout(v.current), v.current = null);
  }), [d]);
  const b = L(
    () => i ? Yn(i) : null,
    [i]
  ), w = (b?.errors.length ?? 0) > 0, k = L(
    () => fi(i),
    [i]
  ), S = L(() => i ? i.nodes.some((ce) => ce.type === "trigger") : !1, [i]) ? ["trigger"] : [], [A, D] = R(!0), [H, G] = R(() => {
    if (typeof window > "u") return !1;
    try {
      return window.localStorage.getItem("ws_pipelines_v1_show_tags") === "true";
    } catch {
      return !1;
    }
  }), ee = M(() => {
    G((ce) => {
      const z = !ce;
      try {
        window.localStorage.setItem(
          "ws_pipelines_v1_show_tags",
          z ? "true" : "false"
        );
      } catch {
      }
      return z;
    });
  }, []), [ie, le] = R(!1), [oe, ue] = R(!1), [O, Y] = R(!1), [W, F] = R(!1), [J, de] = R(!1), pe = L(() => i?.publishedSnapshot ? i.publishedSnapshot : null, [i]), be = i?.status === "published", E = !u.isRunActive && (!be || w), re = u.isRunActive ? "Cancel the active run" : be ? w ? "Fix validation errors to enable runs" : "Start a new run" : "Publish the pipeline to enable runs", ge = M(async () => {
    if (u.isRunActive && u.currentRunId) {
      o.cancelRun(u.currentRunId);
      return;
    }
    if (!E) {
      if (k.length > 0) {
        u.setTriggerInputValues(
          Object.fromEntries(k.map((ce) => [ce, ""]))
        ), u.setTriggerInputOpen(!0);
        return;
      }
      u.handleRunClick();
    }
  }, [u, o, E, k]);
  q(() => {
    const ce = (z) => {
      if (hi(z.target)) return;
      const _ = z.metaKey || z.ctrlKey;
      if (_ && z.key.toLowerCase() === "s") {
        z.preventDefault(), p(), a("Saved", { type: "success", durationMs: 1200 });
        return;
      }
      if (_ && z.key === "Enter") {
        z.preventDefault(), ge();
        return;
      }
      if (_ && z.key === ".") {
        z.preventDefault(), u.isRunActive && u.currentRunId && o.cancelRun(u.currentRunId);
        return;
      }
      if (_ && z.shiftKey && z.key.toLowerCase() === "z") {
        z.preventDefault(), h();
        return;
      }
      if (_ && z.key.toLowerCase() === "z") {
        z.preventDefault(), f();
        return;
      }
      if (z.key === "Escape") {
        l(null);
        return;
      }
    };
    return window.addEventListener("keydown", ce), () => window.removeEventListener("keydown", ce);
  }, [p, a, ge, u, o, f, h, l]);
  const $e = () => {
    if (!i) return;
    const ce = Kt(i.id);
    ce && n(`/pipelines/${ce.id}`);
  }, qe = () => {
    if (!i) return;
    const ce = Ft(i.id);
    ce && ut(`${mi(i.name)}.pipeline.json`, ce);
  }, Me = async () => {
    if (!i) return;
    const ce = zs(i);
    try {
      if (typeof navigator < "u" && navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(ce), a("Mermaid diagram copied", { type: "success" });
      else
        throw new Error("clipboard unavailable");
    } catch (z) {
      console.warn("[PipelineEditor] clipboard write failed", z), a("Could not copy Mermaid diagram", { type: "error" });
    }
  }, Ae = () => {
    F(!0);
  }, Le = () => {
    le(!1), !w && (m(), a("Pipeline published", { type: "success" }));
  }, Ee = () => {
    i && (br(i.id), ue(!1), n("/pipelines"));
  }, _e = () => {
    Wn(e), Y(!1), a("Run history cleared", { type: "success" });
  }, ye = u.currentRunId ? o.runs[u.currentRunId] : void 0;
  return i ? /* @__PURE__ */ s(
    "div",
    {
      className: I(
        "flex flex-col min-h-[calc(100vh-200px)]",
        "bg-surface-inset font-inherit text-text-primary",
        "rounded-lg border border-border overflow-hidden"
      ),
      "data-testid": "pipeline-editor",
      children: [
        /* @__PURE__ */ t(
          Qs,
          {
            pipelineId: e,
            definition: i,
            dirty: d,
            savingFlash: y,
            isRunActive: u.isRunActive,
            isTriggering: u.isTriggering,
            runDisabled: E,
            runTitle: re,
            currentRun: ye,
            breakpoints: u.breakpoints,
            onRunClick: ge,
            onDebugRunClick: u.handleDebugRunClick,
            onExport: qe,
            onPublishClick: () => le(!0),
            onDuplicate: $e,
            onCopyMermaid: Me,
            onViewVersions: Ae,
            onRevert: x,
            onToggleShowTags: ee,
            showTags: H,
            onViewRunHistory: () => u.setSidebarTab("runs"),
            onClearRunHistory: () => Y(!0),
            onSimPanelOpen: () => de(!0),
            onDelete: () => ue(!0)
          }
        ),
        H && /* @__PURE__ */ s(
          "div",
          {
            "data-testid": "tags-row",
            className: I(
              "flex items-center gap-2 px-4 py-1.5",
              "border-b border-slate-200 bg-[#fafbfc]",
              "min-h-[34px] shrink-0 sticky top-11 z-[4]"
            ),
            children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-slate-400 font-semibold", children: "TAGS" }),
              /* @__PURE__ */ t(
                Wr,
                {
                  value: i.tags ?? [],
                  onChange: g,
                  placeholder: "add tag…"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ s("div", { className: "flex-1 flex min-h-0 relative overflow-hidden", children: [
          /* @__PURE__ */ t(Ho, { disabledTypes: S }),
          /* @__PURE__ */ t("div", { className: "flex-1 min-w-0 min-h-[600px] relative flex flex-col", children: /* @__PURE__ */ t(
            ss,
            {
              errorNodeId: u.activeError?.nodeId ?? null,
              onErrorNodePosition: u.handleErrorNodePosition,
              breakpoints: u.breakpoints,
              onToggleBreakpoint: u.handleToggleBreakpoint,
              pausedAtNodeId: u.pausedBreakpoint?.stepId ?? null
            }
          ) }),
          /* @__PURE__ */ t(
            ui,
            {
              pipelineId: e,
              selectedNodeId: c,
              sidebarTab: u.sidebarTab,
              onTabChange: u.setSidebarTab
            }
          )
        ] }),
        u.pausedBreakpoint && /* @__PURE__ */ t(
          ca,
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
          is,
          {
            error: u.activeError,
            anchor: u.errorNodeAnchor,
            onDismiss: u.handleDismissError,
            onRetry: u.handleRetryFromError
          }
        ),
        /* @__PURE__ */ t(
          Gs,
          {
            runId: u.currentRunId,
            visible: u.isRunActive && A
          }
        ),
        /* @__PURE__ */ t(
          Vs,
          {
            publishConfirmOpen: ie,
            onPublishClose: () => le(!1),
            onPublishConfirm: Le,
            hasErrors: w,
            validationErrorCount: b?.errors.length ?? 0,
            definitionName: i.name,
            definitionVersion: i.version,
            deleteConfirmOpen: oe,
            onDeleteClose: () => ue(!1),
            onDeleteConfirm: Ee,
            clearRunsConfirmOpen: O,
            onClearRunsClose: () => Y(!1),
            onClearRunsConfirm: _e,
            versionDiffOpen: W,
            onVersionDiffClose: () => F(!1),
            currentDef: i,
            publishedDef: pe,
            onJumpToNode: l,
            simPanelOpen: J,
            onSimPanelClose: () => de(!1)
          }
        ),
        /* @__PURE__ */ t(
          ze,
          {
            open: u.triggerInputOpen,
            onClose: () => u.setTriggerInputOpen(!1),
            title: "Trigger inputs",
            maxWidth: 480,
            footer: /* @__PURE__ */ s(V, { children: [
              /* @__PURE__ */ t(Be, { variant: "ghost", onClick: () => u.setTriggerInputOpen(!1), children: "Cancel" }),
              /* @__PURE__ */ t(
                Be,
                {
                  variant: "primary",
                  onClick: u.handleTriggerInputSubmit,
                  disabled: k.some((ce) => !u.triggerInputValues[ce]?.trim()),
                  children: "Run"
                }
              )
            ] }),
            children: /* @__PURE__ */ s("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ t("p", { className: "m-0 text-xs text-text-secondary", children: "This pipeline expects input data. Provide values for the trigger context:" }),
              k.map((ce) => /* @__PURE__ */ s("label", { className: "flex flex-col gap-1 text-xs", children: [
                /* @__PURE__ */ t("span", { className: "font-medium text-text-primary", children: ce }),
                /* @__PURE__ */ t(
                  "textarea",
                  {
                    "data-autofocus": ce === k[0] ? !0 : void 0,
                    rows: 3,
                    className: "resize-y px-2 py-1.5 rounded-md border border-border text-xs font-inherit",
                    value: u.triggerInputValues[ce] ?? "",
                    onChange: (z) => u.setTriggerInputValues((_) => ({ ..._, [ce]: z.target.value }))
                  }
                )
              ] }, ce))
            ] })
          }
        )
      ]
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: I(
        "flex flex-col min-h-[calc(100vh-200px)]",
        "bg-surface-inset font-inherit text-text-primary",
        "rounded-lg border border-border overflow-hidden"
      ),
      children: /* @__PURE__ */ t("div", { className: "flex-1 flex items-center justify-center text-text-tertiary text-[13px]", children: "Loading pipeline…" })
    }
  );
}
function gi(e) {
  const n = e?.event;
  return !n || n === "manual" ? { icon: "▶", text: "Manual" } : n === "schedule" ? { icon: "⏱", text: e?.schedule ?? "Schedule" } : n === "webhook" ? { icon: "🔌", text: e?.webhookPath ?? "Webhook" } : { icon: "🗎", text: `On ${e?.event}` };
}
function bi({
  row: e,
  onOpen: n,
  onRun: r,
  onDuplicate: o,
  onExport: a,
  onDelete: i,
  selectionMode: d,
  selected: c,
  anySelected: l,
  onToggleSelect: p
}) {
  const [m, x] = R(!1), [f, h] = R(!1), g = te(null);
  nt(g, () => x(!1), m);
  const u = e.status === "published", y = e.status === "archived", N = typeof e.publishedVersion == "number", v = gi(e.triggerBinding);
  let C, b;
  y ? (C = `Archived · v${e.version}`, b = "danger") : u ? (C = `Published · v${e.version}`, b = "success") : N ? (C = `Draft · v${e.version} (published v${e.publishedVersion})`, b = "warning") : (C = `Draft · v${e.version}`, b = "neutral");
  const w = !u, k = (A) => (D) => {
    D.stopPropagation(), A();
  }, $ = d || c || f || l, S = (A) => {
    d ? p(A.shiftKey) : n();
  };
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": `pipeline-card-${e.id}`,
      "data-selected": c ? "true" : "false",
      onClick: S,
      onMouseEnter: () => h(!0),
      onMouseLeave: () => {
        h(!1), x(!1);
      },
      className: I(
        "flex flex-col gap-2 w-full px-3.5 py-3 bg-surface rounded-lg cursor-pointer relative transition-[border-color,box-shadow] duration-100",
        c ? "border border-primary shadow-[0_0_0_4px_rgba(100,108,255,0.18)]" : f ? "border border-primary shadow-[0_2px_8px_rgba(15,23,42,0.06)]" : "border border-border shadow-none"
      ),
      children: [
        $ && /* @__PURE__ */ t(
          "label",
          {
            onClick: (A) => A.stopPropagation(),
            className: "absolute top-2 right-2 flex items-center justify-center w-[22px] h-[22px] cursor-pointer z-[1]",
            children: /* @__PURE__ */ t(
              "input",
              {
                type: "checkbox",
                "data-testid": `pipeline-select-${e.id}`,
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
        /* @__PURE__ */ s("div", { className: I("flex items-center gap-2 min-w-0", $ && "pr-7"), children: [
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
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ t(ne, { "aria-label": `Status: ${C}`, tone: b, size: "sm", children: C }),
          /* @__PURE__ */ s("span", { className: "text-[11px] text-text-secondary", children: [
            v.icon,
            " ",
            v.text
          ] }),
          /* @__PURE__ */ s("span", { className: "text-[11px] text-text-tertiary", children: [
            "· ",
            e.nodeCount,
            " node",
            e.nodeCount === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5", children: [
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
          /* @__PURE__ */ s("div", { className: "relative ml-auto", ref: g, children: [
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
            m && /* @__PURE__ */ s(
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
                    x(!1), a();
                  }), children: "Export JSON" }),
                  /* @__PURE__ */ t(
                    "button",
                    {
                      className: "block w-full text-left px-3.5 py-2 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-[#dc2626]",
                      role: "menuitem",
                      onClick: k(() => {
                        x(!1), i();
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
const yi = {
  draft: "Draft",
  published: "Published",
  archived: "Archived"
}, vi = ["draft", "published"];
function Ni({
  search: e,
  onSearchChange: n,
  statusFilter: r,
  statusExplicit: o,
  onToggleStatusKey: a,
  triggerFilter: i,
  onTriggerFilterChange: d,
  sortKey: c,
  onSortKeyChange: l,
  allVisibleSelected: p,
  selectAllRef: m,
  onHeaderToggleAll: x
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      className: I(
        "min-h-[40px] shrink-0 flex items-center gap-3 px-6",
        "border-b border-border bg-white"
      ),
      children: [
        /* @__PURE__ */ s(
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
            className: I(
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
            children: Qt.map((f) => {
              const h = o ? r.has(f) : vi.includes(f);
              return /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  role: "checkbox",
                  "aria-checked": h,
                  "data-testid": `status-chip-${f}`,
                  onClick: () => a(f),
                  onKeyDown: (g) => {
                    (g.key === "Enter" || g.key === " ") && (g.preventDefault(), a(f));
                  },
                  className: I(
                    "px-3 py-1.5 text-xs font-medium rounded cursor-pointer font-inherit",
                    h ? "border border-primary bg-primary text-white" : "border border-border bg-white text-text-secondary"
                  ),
                  children: yi[f]
                },
                f
              );
            })
          }
        ),
        /* @__PURE__ */ s("label", { className: "text-xs text-text-secondary flex items-center gap-1.5", children: [
          "Trigger:",
          /* @__PURE__ */ s(
            "select",
            {
              "data-testid": "trigger-filter",
              value: i,
              onChange: (f) => d(f.target.value),
              className: I(
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
        /* @__PURE__ */ s("label", { className: "text-xs text-text-secondary flex items-center gap-1.5 ml-auto", children: [
          "Sort:",
          /* @__PURE__ */ s(
            "select",
            {
              "data-testid": "sort-key",
              value: c,
              onChange: (f) => l(f.target.value),
              className: I(
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
const He = I(
  "px-2.5 py-[5px] text-xs font-semibold",
  "bg-white text-text-secondary",
  "border border-border-field rounded-md",
  "cursor-pointer font-inherit"
);
function wi({
  count: e,
  onClear: n,
  onExport: r,
  onExportAsJSON: o,
  onPublish: a,
  onArchive: i,
  onAddTag: d,
  onRemoveTag: c,
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
  const [N, v] = R(""), C = te(null), b = te(null), w = te(null);
  q(() => {
    m && (v(""), setTimeout(() => C.current?.focus(), 30));
  }, [m]), q(() => {
    if (!m) return;
    const $ = (A) => {
      b.current?.contains(A.target) || g();
    }, S = window.setTimeout(() => {
      document.addEventListener("mousedown", $);
    }, 0);
    return () => {
      window.clearTimeout(S), document.removeEventListener("mousedown", $);
    };
  }, [m, g]), q(() => {
    if (!x) return;
    const $ = (A) => {
      w.current?.contains(A.target) || u();
    }, S = window.setTimeout(() => {
      document.addEventListener("mousedown", $);
    }, 0);
    return () => {
      window.clearTimeout(S), document.removeEventListener("mousedown", $);
    };
  }, [x, u]);
  const k = () => {
    const $ = N.trim();
    $.length !== 0 && (f($), v(""));
  };
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "bulk-action-bar",
      className: I(
        "min-h-[40px] shrink-0 flex items-center gap-3 px-6",
        "border-b border-border bg-[#eef2ff]",
        "sticky top-[56px] z-[1]"
      ),
      children: [
        /* @__PURE__ */ s(
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
        /* @__PURE__ */ t("button", { "data-testid": "bulk-publish", className: He, onClick: a, children: "Publish selected" }),
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
        /* @__PURE__ */ s("div", { className: "relative", children: [
          /* @__PURE__ */ t("button", { "data-testid": "bulk-add-tag-btn", className: He, onClick: d, children: "Add tag..." }),
          m && /* @__PURE__ */ s(
            "div",
            {
              ref: b,
              "data-testid": "bulk-add-tag-popover",
              onClick: ($) => $.stopPropagation(),
              className: I(
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
                    onChange: ($) => v($.target.value),
                    onKeyDown: ($) => {
                      $.key === "Enter" ? ($.preventDefault(), k()) : $.key === "Escape" && ($.preventDefault(), g());
                    },
                    className: I(
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
        /* @__PURE__ */ s("div", { className: "relative", children: [
          /* @__PURE__ */ t(
            "button",
            {
              "data-testid": "bulk-remove-tag-btn",
              className: I(
                He,
                y.length === 0 && "opacity-50 cursor-not-allowed"
              ),
              onClick: c,
              disabled: y.length === 0,
              title: y.length === 0 ? "No tags on selected pipelines" : "Remove tag from selected",
              children: "Remove tag..."
            }
          ),
          x && /* @__PURE__ */ s(
            "div",
            {
              ref: w,
              "data-testid": "bulk-remove-tag-popover",
              onClick: ($) => $.stopPropagation(),
              className: I(
                "absolute top-full left-0 mt-1.5",
                "bg-white border border-border rounded-lg",
                "shadow-lg min-w-[220px] max-w-[320px] p-2.5 z-10",
                "flex flex-col gap-2"
              ),
              children: [
                /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary", children: "Click a tag to remove it from all selected:" }),
                /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5", children: y.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary", children: "No tags to remove." }) : y.map(($) => /* @__PURE__ */ s(
                  "button",
                  {
                    "data-testid": `bulk-remove-tag-chip-${$}`,
                    onClick: () => h($),
                    className: I(
                      "px-2 py-0.5 text-xs font-medium",
                      "bg-red-50 text-red-600",
                      "border border-red-200 rounded-full",
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
        /* @__PURE__ */ t(
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
function ki({
  visibleRows: e,
  filteredIds: n
}) {
  const [r, o] = R(!1), [a, i] = R(/* @__PURE__ */ new Set()), d = te(null), c = te(null), l = M(() => {
    i(/* @__PURE__ */ new Set());
  }, []), p = M(() => {
    r ? (l(), o(!1)) : o(!0);
  }, [r, l]), m = M(
    (u, y = !1) => {
      const N = e, v = N.findIndex((b) => b.id === u), C = d.current;
      v !== -1 && (d.current = v), i((b) => {
        const w = new Set(b), k = !w.has(u);
        if (y && C != null && v !== -1) {
          const $ = Math.min(C, v), S = Math.max(C, v);
          for (let A = $; A <= S; A++) {
            const D = N[A];
            D && (k ? w.add(D.id) : w.delete(D.id));
          }
        } else k ? w.add(u) : w.delete(u);
        return w;
      });
    },
    [e]
  ), x = M(() => {
    i(new Set(n));
  }, [n]), f = e.length > 0 && e.every((u) => a.has(u.id)), h = !f && e.some((u) => a.has(u.id)), g = M(() => {
    i((u) => {
      const y = new Set(u);
      if (f)
        for (const N of e) y.delete(N.id);
      else
        for (const N of e) y.add(N.id);
      return y;
    }), r || o(!0);
  }, [f, e, r]);
  return q(() => {
    c.current && (c.current.indeterminate = h);
  }, [h]), {
    selectionMode: r,
    selected: a,
    allVisibleSelected: f,
    someVisibleSelected: h,
    selectAllRef: c,
    handleToggleSelectMode: p,
    handleToggleSelect: m,
    handleSelectAllFiltered: x,
    handleHeaderToggleAll: g,
    clearSelection: l,
    setSelectionMode: o
  };
}
const Ci = 280, xe = 160, Ii = 40, Si = 200;
function U(e) {
  return Ii + e * Ci;
}
function B(e) {
  return Si + e * xe;
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
function Ti(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), i = {
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
    config: { body: `{{context.steps.${o}.response}}` },
    idempotent: !0,
    onError: "fail-run"
  }, l = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: i },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: d },
    { id: a, type: "action", position: { x: U(2), y: B(0) }, data: c }
  ], p = [
    j(r, "out", o),
    j(o, "out", a)
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
function Ai(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = {
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
      value: `{{context.steps.${a}.response}}`
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
      message: `Meeting summary: {{context.steps.${d}.response}}`
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
    { id: a, type: "llm", position: { x: U(2), y: B(0) - xe / 2 }, data: x },
    { id: i, type: "action", position: { x: U(3), y: B(0) - xe / 2 }, data: f },
    { id: d, type: "llm", position: { x: U(2), y: B(0) + xe / 2 }, data: h },
    { id: c, type: "action", position: { x: U(3), y: B(0) + xe / 2 }, data: g },
    { id: l, type: "join", position: { x: U(4), y: B(0) }, data: u }
  ], N = [
    j(r, "out", o),
    j(o, "branch-0", a),
    j(a, "out", i),
    j(i, "out", l, "in-0"),
    j(o, "branch-1", d),
    j(d, "out", c),
    j(c, "out", l, "in-1")
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
function Ri(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), m = crypto.randomUUID(), x = {
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
    expression: `context.steps.${c}.output.decision === 'approve'`,
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
    { id: a, type: "condition", position: { x: U(2), y: B(0) }, data: h },
    { id: i, type: "action", position: { x: U(3), y: B(0) - xe / 2 }, data: g },
    { id: d, type: "action", position: { x: U(3), y: B(0) + xe / 2 }, data: u },
    { id: c, type: "approval", position: { x: U(4), y: B(0) + xe / 2 }, data: y },
    { id: l, type: "condition", position: { x: U(5), y: B(0) + xe / 2 }, data: N },
    { id: p, type: "action", position: { x: U(6), y: B(0) }, data: v },
    { id: m, type: "action", position: { x: U(6), y: B(0) + xe }, data: C }
  ], w = [
    j(r, "out", o),
    j(o, "out", a),
    j(a, "true", i),
    j(a, "false", d),
    j(d, "out", c),
    j(c, "approved", l),
    j(c, "rejected", m),
    j(l, "true", p),
    j(l, "false", m)
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
function $i(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), d = {
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
    expression: `$.steps.${o}.response`,
    outputKey: "tags"
  }, p = {
    type: "action",
    actionType: "update-document",
    config: { field: "tags", value: "{{context.tags}}" },
    idempotent: !0,
    onError: "fail-run"
  }, m = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: d },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: c },
    { id: a, type: "transform", position: { x: U(2), y: B(0) }, data: l },
    { id: i, type: "action", position: { x: U(3), y: B(0) }, data: p }
  ], x = [
    j(r, "out", o),
    j(o, "out", a),
    j(a, "out", i)
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
function Di(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), d = {
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
  }, m = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: d },
    { id: o, type: "approval", position: { x: U(1), y: B(0) }, data: c },
    { id: a, type: "approval", position: { x: U(2), y: B(0) }, data: l },
    { id: i, type: "action", position: { x: U(3), y: B(0) }, data: p }
  ], x = [
    j(r, "out", o),
    j(o, "approved", a),
    j(a, "approved", i)
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
function Pi(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), d = {
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
  }, m = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: d },
    { id: o, type: "transform", position: { x: U(1), y: B(0) }, data: c },
    { id: a, type: "llm", position: { x: U(2), y: B(0) }, data: l },
    { id: i, type: "action", position: { x: U(3), y: B(0) }, data: p }
  ], x = [
    j(r, "out", o),
    j(o, "out", a),
    j(a, "out", i)
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
function Mi(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), i = {
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
    config: { documentId: "digest-doc", body: `{{context.steps.${o}.response}}` },
    idempotent: !0,
    onError: "route-error"
  }, l = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: i },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: d },
    { id: a, type: "action", position: { x: U(2), y: B(0) }, data: c }
  ], p = [
    j(r, "out", o),
    j(o, "out", a)
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
function Ei(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), i = { type: "trigger", triggerType: "document.submit" }, d = {
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
    config: { field: "tags", value: `{{context.steps.${o}.response}}` },
    idempotent: !0,
    onError: "fail-run"
  }, l = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: i },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: d },
    { id: a, type: "action", position: { x: U(2), y: B(0) }, data: c }
  ], p = [
    j(r, "out", o),
    j(o, "out", a)
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
function Oi(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = { type: "trigger", triggerType: "document.finalize" }, p = {
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
      message: `Review complete: LLM said {{context.steps.${a}.response}}; reviewer decision: {{context.steps.${i}.output.decision}}`
    },
    idempotent: !1,
    onError: "route-error"
  }, g = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: l },
    { id: o, type: "fork", position: { x: U(1), y: B(0) }, data: p },
    { id: a, type: "llm", position: { x: U(2), y: B(0) - xe / 2 }, data: m },
    { id: i, type: "approval", position: { x: U(2), y: B(0) + xe / 2 }, data: x },
    { id: d, type: "join", position: { x: U(3), y: B(0) }, data: f },
    { id: c, type: "action", position: { x: U(4), y: B(0) }, data: h }
  ], u = [
    j(r, "out", o),
    j(o, "branch-0", a),
    j(a, "out", d, "in-0"),
    j(o, "branch-1", i),
    j(i, "approved", d, "in-1"),
    j(d, "out", c)
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
function Li(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = {
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
    { id: a, type: "condition", position: { x: U(2), y: B(0) }, data: m },
    { id: i, type: "action", position: { x: U(3), y: B(0) - xe / 2 }, data: x },
    { id: d, type: "approval", position: { x: U(4), y: B(0) - xe / 2 }, data: f },
    { id: c, type: "action", position: { x: U(3), y: B(0) + xe / 2 }, data: h }
  ], u = [
    j(r, "out", o),
    j(o, "out", a),
    j(a, "true", i),
    j(i, "out", d),
    j(a, "false", c)
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
function _i(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), m = crypto.randomUUID(), x = {
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
    userPromptTemplate: `Security: {{context.steps.${i}.response}}

Style: {{context.steps.${d}.response}}

Coverage: {{context.steps.${c}.response}}`,
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
    { id: a, type: "fork", position: { x: U(2), y: B(0) }, data: h },
    { id: i, type: "llm", position: { x: U(3), y: B(0) - xe }, data: g },
    { id: d, type: "llm", position: { x: U(3), y: B(0) }, data: u },
    { id: c, type: "llm", position: { x: U(3), y: B(0) + xe }, data: y },
    { id: l, type: "join", position: { x: U(4), y: B(0) }, data: N },
    { id: p, type: "llm", position: { x: U(5), y: B(0) }, data: v },
    { id: m, type: "action", position: { x: U(6), y: B(0) }, data: C }
  ], w = [
    j(r, "out", o),
    j(o, "out", a),
    j(a, "branch-0", i),
    j(a, "branch-1", d),
    j(a, "branch-2", c),
    j(i, "out", l, "in-0"),
    j(d, "out", l, "in-1"),
    j(c, "out", l, "in-2"),
    j(l, "out", p),
    j(p, "out", m)
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
function Ui(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), d = crypto.randomUUID(), c = {
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
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: c },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: l },
    { id: a, type: "condition", position: { x: U(2), y: B(0) }, data: p },
    { id: i, type: "action", position: { x: U(3), y: B(0) - xe / 2 }, data: m },
    { id: d, type: "approval", position: { x: U(3), y: B(0) + xe / 2 }, data: x }
  ], h = [
    j(r, "out", o),
    j(o, "out", a),
    j(a, "true", i),
    j(a, "false", d)
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
function Bi(e) {
  const n = (/* @__PURE__ */ new Date()).toISOString(), r = crypto.randomUUID(), o = crypto.randomUUID(), a = crypto.randomUUID(), i = crypto.randomUUID(), d = crypto.randomUUID(), c = crypto.randomUUID(), l = crypto.randomUUID(), p = crypto.randomUUID(), m = {
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
        body: `{{context.steps.${c}.response}}`
      }
    },
    idempotent: !0,
    onError: "route-error"
  }, v = [
    { id: r, type: "trigger", position: { x: U(0), y: B(0) }, data: m },
    { id: o, type: "llm", position: { x: U(1), y: B(0) }, data: x },
    { id: a, type: "transform", position: { x: U(2), y: B(0) }, data: f },
    { id: i, type: "condition", position: { x: U(3), y: B(0) }, data: h },
    { id: d, type: "action", position: { x: U(4), y: B(0) - xe / 2 }, data: g },
    { id: c, type: "llm", position: { x: U(4), y: B(0) + xe / 2 }, data: u },
    { id: l, type: "approval", position: { x: U(5), y: B(0) + xe / 2 }, data: y },
    { id: p, type: "action", position: { x: U(6), y: B(0) + xe / 2 }, data: N }
  ], C = [
    j(r, "out", o),
    j(o, "out", a),
    j(a, "out", i),
    j(i, "true", d),
    j(i, "false", c),
    j(c, "out", l),
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
    nodes: v,
    edges: C,
    createdAt: n,
    updatedAt: n,
    createdBy: e
  };
}
const _t = [
  {
    id: "document-summary",
    name: "Document Summary",
    description: "Summarize a finalized document and post the summary as a comment.",
    icon: "📄",
    tags: ["llm", "summary", "document"],
    build: Ti
  },
  {
    id: "meeting-notes-assistant",
    name: "Meeting Notes Assistant",
    description: "Extract action items and send a team summary in parallel when meeting notes are finalized.",
    icon: "📝",
    tags: ["llm", "parallel", "meeting", "tasks"],
    build: Ai
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    description: "Classify comments for safety; auto-post safe ones, flag risky ones for human review.",
    icon: "🛡️",
    tags: ["llm", "moderation", "approval", "condition"],
    build: Ri,
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
    build: $i,
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
    build: Di,
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
    build: Pi
  },
  {
    id: "daily-document-digest",
    name: "Daily Document Digest",
    description: "Every morning at 9am, summarize the last 24h of document activity and post it to a digest doc.",
    icon: "📰",
    tags: ["schedule", "llm", "digest", "cron"],
    build: Mi
  },
  {
    id: "auto-tag-on-creation",
    name: "Auto-tag on Creation",
    description: "When a new document is submitted, extract tags with an LLM and write them back to the document.",
    icon: "🏷️",
    tags: ["llm", "tags", "submit"],
    build: Ei
  },
  {
    id: "pr-style-review",
    name: "PR-style Review",
    description: "Finalize a document, run an LLM review and human approval in parallel, then notify when both complete.",
    icon: "🔍",
    tags: ["fork", "llm", "approval", "review", "join"],
    build: Oi
  },
  {
    id: "incident-response",
    name: "Incident Response",
    description: "Webhook from PagerDuty/Opsgenie triages severity; critical alerts page on-call and request a post-mortem owner, others file a ticket.",
    icon: "🚨",
    tags: ["webhook", "incident", "ops", "condition", "approval"],
    build: Li
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "GitHub PR webhook fans out security, style, and test-coverage reviews in parallel, then synthesizes one PR comment.",
    icon: "🔍",
    tags: ["webhook", "fork", "llm", "review", "github", "join"],
    build: _i
  },
  {
    id: "content-moderation-publish-gate",
    name: "Content Moderation (Publish Gate)",
    description: "On document creation, classify safety (PII / policy / clean); auto-publish clean docs, route flagged ones to moderator approval.",
    icon: "🛡️",
    tags: ["moderation", "llm", "condition", "approval", "submit"],
    build: Ui
  },
  {
    id: "support-triage",
    name: "Customer Support Triage",
    description: "Helpdesk webhook classifies intent and urgency; high-urgency tickets escalate, others get an agent-reviewed draft reply auto-sent on approval.",
    icon: "🎧",
    tags: ["webhook", "support", "llm", "condition", "approval", "transform"],
    build: Bi
  }
], er = "/api";
async function Fi(e) {
  const n = { createdTypes: [], errors: [] };
  if (!e?.documentTypes?.length) return n;
  for (const r of e.documentTypes)
    try {
      const o = await ji(r.name);
      if (o) {
        n.createdTypes.push(o.typeId);
        continue;
      }
      const a = await zi(r);
      n.createdTypes.push(a.typeId);
    } catch (o) {
      n.errors.push(
        `Failed to scaffold "${r.name}": ${o instanceof Error ? o.message : String(o)}`
      );
    }
  return n;
}
async function ji(e) {
  try {
    const n = await fetch(`${er}/document-types`, { credentials: "same-origin" });
    if (!n.ok) return null;
    const o = (await n.json()).items?.find(
      (a) => a.name.toLowerCase() === e.toLowerCase()
    );
    return o ? { typeId: o.typeId } : null;
  } catch {
    return null;
  }
}
async function zi(e) {
  const n = e.fields.map((a, i) => ({
    fieldId: crypto.randomUUID(),
    name: a.name,
    fieldType: a.fieldType,
    widget: qi(a.fieldType),
    cardinality: 1,
    required: a.required ?? !1,
    helpText: "",
    options: a.options,
    order: i
  })), r = await fetch(`${er}/document-types`, {
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
    const a = await r.text();
    throw new Error(`HTTP ${r.status}: ${a}`);
  }
  return await r.json();
}
function qi(e) {
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
function Hi(e) {
  const n = /* @__PURE__ */ new Map(), r = e.nodes.map((i) => {
    const d = crypto.randomUUID();
    return n.set(i.id, d), {
      ...i,
      id: d,
      data: JSON.parse(JSON.stringify(i.data)),
      position: { ...i.position }
    };
  }), o = e.edges.map((i) => ({
    ...i,
    id: crypto.randomUUID(),
    source: n.get(i.source) ?? i.source,
    target: n.get(i.target) ?? i.target
  })), a = (/* @__PURE__ */ new Date()).toISOString();
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
    createdAt: a,
    updatedAt: a
  };
}
function Ki(e) {
  const n = e.triggerBinding?.event ?? "manual";
  return n === "schedule" ? "Schedule" : n === "webhook" ? "Webhook" : n === "manual" ? "Manual" : n.startsWith("document.") ? `On ${n}` : n;
}
function Wi({ template: e, meta: n, onPick: r }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": `template-card-${e.id}`,
      className: "flex flex-col gap-2 w-[220px] min-h-[200px] p-3.5 bg-surface border border-border rounded-[10px] font-[inherit]",
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ t("span", { className: "text-2xl", "aria-hidden": !0, children: e.icon }),
          /* @__PURE__ */ t("div", { className: "text-sm font-bold text-text-primary overflow-hidden text-ellipsis", children: e.name })
        ] }),
        /* @__PURE__ */ s(
          "div",
          {
            "data-testid": `template-meta-${e.id}`,
            className: "text-[11px] text-text-tertiary flex gap-2",
            children: [
              /* @__PURE__ */ s("span", { children: [
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
function Ji({
  open: e,
  onClose: n,
  onCreated: r,
  onSelect: o
}) {
  const { userId: a } = Gt(), [i, d] = R(""), c = te(null);
  q(() => {
    e && (d(""), setTimeout(() => c.current?.focus(), 30));
  }, [e]);
  const l = L(() => {
    const f = /* @__PURE__ */ new Map();
    for (const h of _t) {
      const g = h.build(a || "anonymous");
      f.set(h.id, { nodeCount: g.nodes.length, trigger: Ki(g) });
    }
    return f;
  }, [a, e]), p = L(() => {
    const f = i.trim().toLowerCase();
    return f ? _t.filter(
      (h) => h.name.toLowerCase().includes(f) || h.description.toLowerCase().includes(f) || h.tags.some((g) => g.toLowerCase().includes(f))
    ) : _t;
  }, [i]), m = (f) => {
    if (r) {
      const h = f.build(a || "anonymous"), g = Hi(h);
      yr(g), n(), r(g.id), f.prerequisites && Fi(f.prerequisites).then((u) => {
        u.errors.length > 0 && console.warn("[TemplatesModal] scaffold errors:", u.errors);
      });
      return;
    }
    o && o(f);
  };
  return /* @__PURE__ */ s(
    ze,
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
            ref: c,
            type: "search",
            "data-testid": "templates-search",
            placeholder: "Search templates…",
            value: i,
            onChange: (f) => d(f.target.value),
            onKeyDown: (f) => {
              f.key === "Enter" && p.length > 0 && (f.preventDefault(), m(p[0]));
            },
            className: "w-full px-3 py-2 text-[13px] mb-3.5 border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none"
          }
        ),
        p.length === 0 ? /* @__PURE__ */ s(
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
            children: p.map((f) => /* @__PURE__ */ t(
              Wi,
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
const Qt = ["draft", "published", "archived"], Nn = ["draft", "published"];
function Vi(e) {
  if (e == null) return null;
  if (e.trim() === "") return /* @__PURE__ */ new Set();
  const n = new Set(Qt);
  return new Set(
    e.split(",").map((o) => o.trim()).filter((o) => n.has(o))
  );
}
function Gi(e, n) {
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
function Yi(e) {
  const n = e?.event;
  return !n || n === "manual" ? "manual" : n === "schedule" ? "schedule" : n === "webhook" ? "webhook" : "document";
}
function wn(e) {
  return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "pipeline";
}
function Xi() {
  const e = /* @__PURE__ */ new Date(), n = e.getFullYear(), r = String(e.getMonth() + 1).padStart(2, "0"), o = String(e.getDate()).padStart(2, "0");
  return `${n}-${r}-${o}`;
}
function Qi({
  open: e,
  onClose: n,
  onCreate: r
}) {
  const [o, a] = R(""), i = te(null);
  q(() => {
    e && (a(""), setTimeout(() => i.current?.focus(), 50));
  }, [e]);
  const d = o.trim().length > 0, c = () => {
    d && r(o.trim());
  };
  return /* @__PURE__ */ s(
    ze,
    {
      open: e,
      onClose: n,
      title: "Create new pipeline",
      maxWidth: 440,
      footer: /* @__PURE__ */ s(V, { children: [
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
        /* @__PURE__ */ t("label", { className: "block text-[13px] font-semibold text-text-secondary mb-1.5", children: "Name" }),
        /* @__PURE__ */ t(
          "input",
          {
            ref: i,
            "data-testid": "new-pipeline-name",
            type: "text",
            value: o,
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
function ud() {
  const e = Pe(), { userId: n } = Gt(), { toast: r } = Tt(), { triggerRun: o, isTriggering: a } = vr(), [i, d] = St(), [c, l] = R([]), [p, m] = R(""), [x, f] = R("all"), [h, g] = R("updated"), u = L(
    () => Vi(i.get("status")),
    [i]
  ), y = L(() => u ?? new Set(Nn), [u]), N = u != null, v = (T) => {
    const P = new URLSearchParams(i);
    if (T.size === 0)
      P.set("status", "");
    else {
      const X = Qt.filter((ae) => T.has(ae)).join(",");
      P.set("status", X);
    }
    d(P, { replace: !0 });
  }, C = (T) => {
    const P = N ? new Set(y) : new Set(Nn);
    P.has(T) ? P.delete(T) : P.add(T), v(P);
  }, [b, w] = R(!1), [k, $] = R(!1), [S, A] = R(null), [D, H] = R(!1), [G, ee] = R(!1), [ie, le] = R(!1), oe = M(async () => {
    const T = await Nr(), P = [];
    for (const X of T) {
      const ae = await Qe(X.id);
      ae && P.push(Gi(ae, X.icon));
    }
    l(P);
  }, []);
  q(() => {
    oe();
  }, [oe]);
  const ue = L(() => {
    const T = p.trim().toLowerCase(), X = [...c.filter((ae) => {
      if (T) {
        const fe = ae.name.toLowerCase().includes(T), De = ae.tags.some((en) => en.toLowerCase().includes(T));
        if (!fe && !De) return !1;
      }
      return !(!(N && y.size === 0) && !y.has(ae.status) || x !== "all" && Yi(ae.triggerBinding) !== x);
    })];
    return h === "name" ? X.sort((ae, fe) => ae.name.localeCompare(fe.name)) : h === "created" ? X.sort((ae, fe) => fe.createdAt.localeCompare(ae.createdAt)) : X.sort((ae, fe) => fe.updatedAt.localeCompare(ae.updatedAt)), X;
  }, [c, p, y, N, x, h]), O = L(() => ue.map((T) => T.id), [ue]), {
    selectionMode: Y,
    selected: W,
    allVisibleSelected: F,
    selectAllRef: J,
    handleToggleSelect: de,
    handleSelectAllFiltered: pe,
    handleHeaderToggleAll: be,
    clearSelection: E,
    setSelectionMode: re
  } = ki({ visibleRows: ue, filteredIds: O }), ge = L(() => {
    const T = /* @__PURE__ */ new Set();
    for (const P of c)
      if (W.has(P.id))
        for (const X of P.tags) T.add(X);
    return Array.from(T).sort((P, X) => P.localeCompare(X));
  }, [c, W]), $e = async (T) => {
    const P = await wr({ name: T, createdBy: n });
    w(!1), e(`/pipelines/${P.id}`);
  }, qe = () => {
    const T = kr(n);
    Ze(T).then(() => oe()), e(`/pipelines/${T.id}`);
  }, Me = (T) => {
    const P = T.build(n);
    Ze(P), $(!1), e(`/pipelines/${P.id}`);
  }, Ae = (T) => e(`/pipelines/${T}`), Le = async (T) => {
    if (T.status !== "published") {
      r("Run requires published state", { type: "warning" });
      return;
    }
    if (!a)
      try {
        await o(T.id, {}) ? r(`Run started for "${T.name}"`, { type: "success" }) : r("Could not start run", { type: "error" });
      } catch (P) {
        r(`Run failed: ${P.message}`, { type: "error" });
      } finally {
        e(`/pipelines/${T.id}`);
      }
  }, Ee = (T) => {
    const P = Kt(T);
    P && (Ze(P).then(() => oe()), r(`Duplicated as "${P.name}"`, { type: "success" }));
  }, _e = (T) => {
    const P = Ft(T.id);
    if (!P) {
      r("Export failed", { type: "error" });
      return;
    }
    ut(`${wn(T.name)}.pipeline.json`, P);
  }, ye = async () => {
    S && (await nn(S), A(null), oe(), r("Pipeline deleted", { type: "success" }));
  }, ce = S ? c.find((T) => T.id === S) : null, z = () => {
    const T = Array.from(W);
    T.length !== 0 && (T.forEach((P, X) => {
      window.setTimeout(() => {
        const ae = c.find((De) => De.id === P), fe = Ft(P);
        !ae || !fe || ut(`${wn(ae.name)}-${Xi()}.pipeline.json`, fe);
      }, X * 100);
    }), r(`Exported ${T.length} pipeline${T.length === 1 ? "" : "s"}`, {
      type: "success"
    }));
  }, _ = async (T) => {
    const P = Array.from(W);
    for (const X of P) {
      const ae = await Qe(X);
      if (!ae) continue;
      const fe = ae.tags ?? [];
      fe.includes(T) || (ae.tags = [...fe, T], await Ze(ae));
    }
    ee(!1), oe(), r(`Added tag "${T}" to ${P.length} pipeline${P.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, K = async (T) => {
    const P = Array.from(W);
    for (const X of P) {
      const ae = await Qe(X);
      if (!ae) continue;
      const fe = ae.tags ?? [];
      fe.includes(T) && (ae.tags = fe.filter((De) => De !== T), await Ze(ae));
    }
    oe(), r(`Removed tag "${T}" from ${P.length} pipeline${P.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, se = async () => {
    const T = Array.from(W);
    for (const P of T) await nn(P);
    H(!1), E(), oe(), r(`Deleted ${T.length} pipeline${T.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  }, me = async () => {
    const T = Array.from(W);
    if (T.length === 0) return;
    let P = 0, X = 0;
    for (const ae of T) {
      const fe = await Qe(ae);
      if (!fe) continue;
      if (fe.status === "published") {
        X += 1;
        continue;
      }
      await Cr(ae) && (P += 1);
    }
    oe(), X > 0 ? r(
      `Published ${P}; skipped ${X} already published`,
      { type: "success" }
    ) : r(
      `Published ${P} pipeline${P === 1 ? "" : "s"}`,
      { type: "success" }
    );
  }, Ie = async () => {
    const T = Array.from(W);
    if (T.length === 0) return;
    let P = 0, X = 0;
    for (const fe of T) {
      const De = await Qe(fe);
      if (!De) continue;
      De.status === "archived" ? (De.status = "draft", X += 1) : (De.status = "archived", P += 1), await Ze(De);
    }
    oe();
    const ae = [];
    P > 0 && ae.push(`Archived ${P}`), X > 0 && ae.push(`Unarchived ${X}`), r(ae.join(" · ") || "No pipelines changed", { type: "success" });
  }, ke = async () => {
    const T = Array.from(W);
    if (T.length === 0) return;
    const P = [];
    for (const ae of T) {
      const fe = await Qe(ae);
      fe && P.push(fe);
    }
    if (P.length === 0) {
      r("Export failed", { type: "error" });
      return;
    }
    const X = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    ut(`pipelines-${X}.json`, JSON.stringify(P, null, 2)), r(`Exported ${P.length} pipeline${P.length === 1 ? "" : "s"}`, {
      type: "success"
    });
  };
  q(() => {
    const T = (P) => {
      const X = P.target;
      if (X) {
        const fe = X.tagName;
        if (fe === "INPUT" || fe === "TEXTAREA" || fe === "SELECT" || X.isContentEditable)
          return;
      }
      if (P.key === "Escape") {
        (W.size > 0 || Y || G || ie) && (ee(!1), le(!1), E(), re(!1));
        return;
      }
      if ((P.metaKey || P.ctrlKey) && (P.key === "a" || P.key === "A")) {
        Y && (P.preventDefault(), pe());
        return;
      }
      (P.key === "Delete" || P.key === "Backspace") && W.size > 0 && !D && !S && !b && !k && (P.preventDefault(), H(!0));
    };
    return window.addEventListener("keydown", T), () => window.removeEventListener("keydown", T);
  }, [
    W,
    Y,
    G,
    ie,
    D,
    S,
    b,
    k,
    E,
    pe,
    re
  ]);
  const je = c.length > 0, bt = W.size > 0;
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "pipelines-page",
      className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-inherit",
      children: [
        /* @__PURE__ */ s(
          "div",
          {
            className: I(
              "h-14 shrink-0 flex items-center justify-between px-6",
              "border-b border-border bg-white",
              "sticky top-0 z-[2]"
            ),
            children: [
              /* @__PURE__ */ t("div", { className: "text-lg font-bold text-text-primary", children: "Pipelines" }),
              /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ t(
                  "button",
                  {
                    "data-testid": "metrics-btn",
                    onClick: () => e("/pipelines/metrics"),
                    className: I(
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
                /* @__PURE__ */ t(
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
        je && /* @__PURE__ */ t(
          Ni,
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
            allVisibleSelected: F,
            selectAllRef: J,
            onHeaderToggleAll: be
          }
        ),
        bt && /* @__PURE__ */ t(
          wi,
          {
            count: W.size,
            onClear: E,
            onExport: z,
            onExportAsJSON: ke,
            onPublish: me,
            onArchive: Ie,
            onAddTag: () => {
              ee((T) => !T), le(!1);
            },
            onRemoveTag: () => {
              le((T) => !T), ee(!1);
            },
            onDelete: () => H(!0),
            onDeleteWithConfirm: () => H(!0),
            addTagOpen: G,
            removeTagOpen: ie,
            onSubmitAddTag: _,
            onSubmitRemoveTag: K,
            onCloseAddTag: () => ee(!1),
            onCloseRemoveTag: () => le(!1),
            unionTags: ge
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            className: I(
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
                  bi,
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
                    selected: W.has(T.id),
                    anySelected: bt,
                    onToggleSelect: (P) => de(T.id, P)
                  },
                  T.id
                ))
              }
            ) : /* @__PURE__ */ s("div", { className: "flex flex-col h-full", children: [
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
              /* @__PURE__ */ s("div", { className: "flex justify-center items-center gap-2.5 text-[13px] text-text-tertiary px-6 pb-8", children: [
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
                    onClick: () => $(!0),
                    className: "bg-transparent border-none p-1 px-2 text-[13px] text-primary cursor-pointer underline font-inherit",
                    children: "or browse templates"
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ t(
          Qi,
          {
            open: b,
            onClose: () => w(!1),
            onCreate: $e
          }
        ),
        /* @__PURE__ */ t(
          Ji,
          {
            open: k,
            onClose: () => $(!1),
            onSelect: Me
          }
        ),
        /* @__PURE__ */ t(
          ze,
          {
            open: !!S,
            onClose: () => A(null),
            title: "Delete pipeline?",
            maxWidth: 400,
            footer: /* @__PURE__ */ s(V, { children: [
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
                  className: I(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-red-600 text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: "Delete"
                }
              )
            ] }),
            children: ce && /* @__PURE__ */ s("p", { className: "m-0", children: [
              /* @__PURE__ */ s("strong", { children: [
                "“",
                ce.name,
                "”"
              ] }),
              " will be permanently removed. Run history will also be lost."
            ] })
          }
        ),
        /* @__PURE__ */ t(
          ze,
          {
            open: D,
            onClose: () => H(!1),
            title: `Delete ${W.size} pipeline${W.size === 1 ? "" : "s"}?`,
            maxWidth: 420,
            backdropTestId: "bulk-delete-modal",
            footer: /* @__PURE__ */ s(V, { children: [
              /* @__PURE__ */ t(
                "button",
                {
                  "data-testid": "bulk-delete-cancel",
                  className: "px-3 py-1.5 text-[13px] bg-transparent border-none text-text-secondary cursor-pointer",
                  onClick: () => H(!1),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ s(
                "button",
                {
                  "data-testid": "bulk-delete-confirm",
                  onClick: se,
                  className: I(
                    "px-[18px] py-[7px] text-[13px] font-semibold",
                    "bg-red-600 text-white border-none rounded-[7px]",
                    "cursor-pointer font-inherit"
                  ),
                  children: [
                    "Delete ",
                    W.size
                  ]
                }
              )
            ] }),
            children: /* @__PURE__ */ s("p", { className: "m-0", children: [
              /* @__PURE__ */ s("strong", { children: [
                W.size,
                " pipeline",
                W.size === 1 ? "" : "s"
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
const Zi = {
  "claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "claude-haiku-4-5-20251001": { inputPerMillion: 0.8, outputPerMillion: 4 },
  // Bedrock inference profile IDs
  "us.anthropic.claude-opus-4-7": { inputPerMillion: 15, outputPerMillion: 75 },
  "us.anthropic.claude-sonnet-4-6": { inputPerMillion: 3, outputPerMillion: 15 },
  "mock-model": { inputPerMillion: 1, outputPerMillion: 5 }
};
function tr(e, n, r) {
  const o = Zi[e], a = Math.max(0, n | 0), i = Math.max(0, r | 0);
  if (!o)
    return {
      inputTokens: a,
      outputTokens: i,
      inputCostUsd: 0,
      outputCostUsd: 0,
      totalCostUsd: 0,
      model: e,
      modelFound: !1
    };
  const d = a / 1e6 * o.inputPerMillion, c = i / 1e6 * o.outputPerMillion;
  return {
    inputTokens: a,
    outputTokens: i,
    inputCostUsd: d,
    outputCostUsd: c,
    totalCostUsd: d + c,
    model: e,
    modelFound: !0
  };
}
function at(e) {
  const n = {};
  let r = 0, o = 0, a = 0, i = 0, d = !1;
  for (const l of e) {
    if (!l.model) continue;
    const p = l.tokensIn ?? 0, m = l.tokensOut ?? 0, x = tr(l.model, p, m), f = n[l.model];
    f ? n[l.model] = {
      inputTokens: f.inputTokens + x.inputTokens,
      outputTokens: f.outputTokens + x.outputTokens,
      inputCostUsd: f.inputCostUsd + x.inputCostUsd,
      outputCostUsd: f.outputCostUsd + x.outputCostUsd,
      totalCostUsd: f.totalCostUsd + x.totalCostUsd,
      model: l.model,
      modelFound: f.modelFound || x.modelFound
    } : n[l.model] = x, r += x.inputTokens, o += x.outputTokens, a += x.inputCostUsd, i += x.outputCostUsd, x.modelFound && (d = !0);
  }
  return { total: {
    inputTokens: r,
    outputTokens: o,
    inputCostUsd: a,
    outputCostUsd: i,
    totalCostUsd: a + i,
    model: "aggregate",
    modelFound: d
  }, perModel: n };
}
function gt(e) {
  return !e || !e.modelFound && e.totalCostUsd === 0 ? "—" : e.totalCostUsd >= 0.01 ? `$${e.totalCostUsd.toFixed(2)}` : e.totalCostUsd === 0 ? "$0.00" : `$${e.totalCostUsd.toFixed(4)}`;
}
function el(e) {
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
function nr(e, n) {
  let r = 0;
  if (e.llm) {
    const a = n.get(e.nodeId);
    a && (r += tr(a, e.llm.tokensIn, e.llm.tokensOut).totalCostUsd);
  }
  const o = e.costUsd;
  return typeof o == "number" && Number.isFinite(o) && o > 0 && (r += o), r;
}
function tl(e, n) {
  if (!n) return [];
  const r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    l.data.type === "llm" && r.set(l.id, l.data.model), o.set(l.id, el(l)), a.set(l.id, l.data.type);
  const i = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const l of n.nodes)
    i.set(l.id, 0), d.set(l.id, 0);
  for (const l of e)
    for (const p of Object.values(l.steps ?? {})) {
      if (!o.has(p.nodeId)) continue;
      const m = nr(p, r);
      i.set(p.nodeId, (i.get(p.nodeId) ?? 0) + m), d.set(p.nodeId, (d.get(p.nodeId) ?? 0) + 1);
    }
  const c = n.nodes.map((l) => ({
    nodeId: l.id,
    label: o.get(l.id) ?? l.id,
    type: a.get(l.id) ?? l.type,
    totalCostUsd: i.get(l.id) ?? 0,
    stepCount: d.get(l.id) ?? 0
  }));
  return c.sort((l, p) => p.totalCostUsd - l.totalCostUsd), c;
}
function nl(e) {
  return e.slice(0, 10);
}
function rl(e) {
  return Date.UTC(
    Number(e.slice(0, 4)),
    Number(e.slice(5, 7)) - 1,
    Number(e.slice(8, 10))
  );
}
function ol(e, n, r = 30, o = /* @__PURE__ */ new Date()) {
  const a = /* @__PURE__ */ new Map();
  if (n)
    for (const m of n.nodes)
      m.data.type === "llm" && a.set(m.id, m.data.model);
  const i = Date.UTC(
    o.getUTCFullYear(),
    o.getUTCMonth(),
    o.getUTCDate()
  ), d = i - (r - 1) * 864e5, c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  for (let m = d; m <= i; m += 864e5) {
    const x = new Date(m).toISOString().slice(0, 10);
    c.set(x, 0), l.set(x, 0);
  }
  for (const m of e) {
    const x = nl(m.startedAt);
    if (!c.has(x)) continue;
    let f = 0;
    for (const h of Object.values(m.steps ?? {}))
      f += nr(h, a);
    c.set(x, (c.get(x) ?? 0) + f), l.set(x, (l.get(x) ?? 0) + 1);
  }
  const p = [];
  for (let m = d; m <= i; m += 864e5) {
    const x = new Date(m).toISOString().slice(0, 10);
    p.push({
      date: x,
      ts: rl(x),
      totalCostUsd: c.get(x) ?? 0,
      runCount: l.get(x) ?? 0
    });
  }
  return p;
}
const rr = [
  "pending",
  "running",
  "completed",
  "failed",
  "cancelled"
], or = [
  "manual",
  "scheduled",
  "webhook",
  "document"
], sr = ["24h", "7d", "30d", "all"], sl = {
  "24h": 1440 * 60 * 1e3,
  "7d": 10080 * 60 * 1e3,
  "30d": 720 * 60 * 60 * 1e3
};
function al(e) {
  return e.startsWith("document.") || e === "document" ? "document" : e === "schedule" || e === "scheduled" ? "scheduled" : e === "webhook" ? "webhook" : "manual";
}
function il(e) {
  let n = 0;
  for (const r of Object.values(e.steps ?? {})) {
    const o = r.attempts?.length ?? 0;
    o > 1 && (n += o - 1);
  }
  return n;
}
function ar(e, n) {
  const r = n.now ?? Date.now(), o = n.range === "all" ? null : r - sl[n.range], a = n.query.trim().toLowerCase();
  return e.filter((i) => {
    if (n.statuses.size > 0 && !n.statuses.has(i.status)) return !1;
    if (n.triggerKinds.size > 0) {
      const d = al(i.triggeredBy.triggerType);
      if (!n.triggerKinds.has(d)) return !1;
    }
    if (o != null) {
      const d = new Date(i.startedAt).getTime();
      if (Number.isFinite(d) && d < o) return !1;
    }
    if (a.length > 0) {
      const d = i.id.toLowerCase().includes(a), c = i.pipelineId.toLowerCase().includes(a);
      if (!d && !c) return !1;
    }
    return !0;
  });
}
function kn(e, n) {
  if (!e) return /* @__PURE__ */ new Set();
  const r = new Set(n);
  return new Set(
    e.split(",").map((o) => o.trim()).filter((o) => r.has(o))
  );
}
function ir(e) {
  const n = e.get("range") ?? "7d", r = sr.includes(n) ? n : "7d";
  return {
    query: e.get("q") ?? "",
    statuses: kn(e.get("status"), rr),
    triggerKinds: kn(e.get("trigger"), or),
    range: r
  };
}
const ll = {
  pending: "Pending",
  running: "Running",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
  paused_at_breakpoint: "Paused"
}, cl = {
  manual: "Manual",
  scheduled: "Scheduled",
  webhook: "Webhook",
  document: "Document"
}, dl = {
  "24h": "Last 24h",
  "7d": "Last 7d",
  "30d": "Last 30d",
  all: "All time"
};
function Cn({
  label: e,
  options: n,
  selected: r,
  onToggle: o,
  labels: a,
  testIdPrefix: i
}) {
  const [d, c] = R(!1), l = te(null);
  nt(l, () => c(!1), d);
  const p = r.size === 0 ? "All" : r.size <= 2 ? Array.from(r).map((m) => a[m]).join(", ") : `${r.size} selected`;
  return /* @__PURE__ */ s("div", { ref: l, className: "relative", children: [
    /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        onClick: () => c(!d),
        "data-testid": `${i}-dropdown`,
        className: I(
          "flex items-center gap-1.5 px-2.5 py-[5px] text-xs font-medium rounded cursor-pointer font-[inherit] whitespace-nowrap bg-surface text-text-secondary border",
          r.size > 0 ? "border-primary" : "border-border"
        ),
        children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary font-semibold text-[11px]", children: e }),
          /* @__PURE__ */ t(
            "span",
            {
              className: I(
                r.size > 0 ? "text-primary font-semibold" : "text-text-secondary font-medium"
              ),
              children: p
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-[9px] ml-0.5 opacity-60", children: "▾" })
        ]
      }
    ),
    d && /* @__PURE__ */ t(
      "div",
      {
        className: "absolute top-full left-0 mt-1 bg-white border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-50 min-w-[160px] py-1",
        children: n.map((m) => /* @__PURE__ */ s(
          "label",
          {
            "data-testid": `${i}-${m}`,
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
              a[m]
            ]
          },
          m
        ))
      }
    )
  ] });
}
function lr({
  query: e,
  statuses: n,
  triggerKinds: r,
  range: o,
  onQueryChange: a,
  onStatusToggle: i,
  onTriggerToggle: d,
  onRangeChange: c,
  onClearFilters: l
}) {
  const p = n.size > 0 || r.size > 0 || e.length > 0;
  return /* @__PURE__ */ s(
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
            onChange: (m) => a(m.target.value),
            className: "flex-[1_1_180px] max-w-[240px] px-2.5 py-[5px] text-xs border border-border-field rounded-md font-[inherit] bg-[#f9fafb] text-text-primary outline-none",
            "aria-label": "Search runs by run id or pipeline id"
          }
        ),
        /* @__PURE__ */ t("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ t("div", { role: "radiogroup", "aria-label": "Date range", className: "flex gap-0.5", children: sr.map((m) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": o === m,
            "data-testid": `runs-range-${m}`,
            onClick: () => c(m),
            className: I(
              "px-2 py-1 text-[11px] border-none rounded-[3px] cursor-pointer font-[inherit]",
              o === m ? "font-semibold bg-primary text-white" : "font-medium bg-transparent text-text-secondary"
            ),
            children: dl[m]
          },
          m
        )) }),
        /* @__PURE__ */ t("div", { className: "w-px h-5 bg-border shrink-0" }),
        /* @__PURE__ */ t(
          Cn,
          {
            label: "Status",
            options: rr,
            selected: n,
            onToggle: i,
            labels: ll,
            testIdPrefix: "runs-status-chip"
          }
        ),
        /* @__PURE__ */ t(
          Cn,
          {
            label: "Trigger",
            options: or,
            selected: r,
            onToggle: d,
            labels: cl,
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
function pl({
  selectionCount: e,
  onExport: n,
  onDelete: r,
  onClear: o
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-testid": "runs-bulk-toolbar",
      className: "flex items-center gap-2 px-3 py-2 bg-[#fafbfc] border border-border rounded-md",
      children: [
        /* @__PURE__ */ s("span", { className: "text-xs text-text-secondary", children: [
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
function Zt(e) {
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
function ul(e) {
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
const ml = {
  LLMError: "LLM",
  TimeoutError: "Timeout",
  NetworkError: "Network",
  ValidationError: "Validation",
  RegistryConflict: "Conflict",
  UnknownError: "Unknown"
};
function fl(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function hl({
  filtered: e,
  selected: n,
  onSelectionChange: r,
  comparePair: o,
  onToggleComparePair: a,
  costByRunId: i,
  pipelineId: d,
  onNavigate: c,
  onOpenRetryModal: l
}) {
  const p = te(!1), m = te(null), x = e.length > 0 && e.every((u) => n.has(u.id)), f = !x && e.some((u) => n.has(u.id)), h = () => {
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
        const $ = e[k];
        $ && (C ? v.add($.id) : v.delete($.id));
      }
    } else C ? v.add(u) : v.delete(u);
    m.current = y, r(v);
  };
  return /* @__PURE__ */ s(
    "table",
    {
      className: "w-full border-collapse text-[13px] bg-surface border border-border rounded-lg overflow-hidden",
      children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ s("tr", { className: "bg-[#fafbfc] text-left", children: [
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
          const { tone: N, label: v } = Zt(u.status), C = n.has(u.id), b = il(u);
          return /* @__PURE__ */ s(
            "tr",
            {
              "data-testid": `run-card-${u.id}`,
              className: I(
                "border-b border-border cursor-pointer hover:bg-[#f1f5f9]",
                C && "bg-[#f1f5f9]"
              ),
              onClick: () => c(`/pipelines/${d}/runs/${u.id}`),
              children: [
                /* @__PURE__ */ s("td", { className: "px-3 py-2.5 text-xs text-text-secondary w-6", onClick: (w) => w.stopPropagation(), children: [
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
                      onChange: () => a(u.id),
                      "aria-label": `Pick run ${u.id.slice(0, 8)} for comparison`,
                      className: "absolute w-px h-px opacity-0 pointer-events-none",
                      tabIndex: -1
                    }
                  )
                ] }),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-primary", children: fl(u.startedAt) }),
                /* @__PURE__ */ s("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: [
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
                      tone: ul(u.error.errorCategory),
                      size: "xs",
                      "data-testid": `run-error-category-${u.id}`,
                      title: u.error.message,
                      className: "ml-1.5",
                      children: ml[u.error.errorCategory] ?? u.error.errorCategory
                    }
                  )
                ] }),
                /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: ve(u.durationMs) }),
                /* @__PURE__ */ t(
                  "td",
                  {
                    className: I(
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
                /* @__PURE__ */ s("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right", onClick: (w) => w.stopPropagation(), children: [
                  u.status === "running" && u.stuckAt && /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      "data-testid": `force-fail-${u.id}`,
                      onClick: async (w) => {
                        if (w.stopPropagation(), !!confirm(`Force-fail stuck run ${u.id.slice(0, 8)}? The run will be interrupted and you can retry from the stuck step.`))
                          try {
                            await Ir(u.pipelineId, u.id);
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
function md() {
  const { pipelineId: e } = rt(), n = Pe(), [r, o] = St(), [a, i] = R([]), [d, c] = R(null), [l, p] = R([]), [m, x] = R(() => /* @__PURE__ */ new Set()), [f, h] = R(null), [g, u] = R(!1), [y, N] = R(null), [v, C] = R(!1), b = M((F) => {
    const J = F.error?.nodeId;
    if (!J || J === "unknown") return;
    const de = Object.entries(F.steps).filter(([pe, be]) => pe !== J && be.status === "completed").map(([pe]) => pe);
    h({ run: F, nodeId: J, skippedNodes: de, snapshotInput: !1 }), N(null);
  }, []), w = M(async () => {
    if (f) {
      N(null), u(!0);
      try {
        const F = await Jn(
          f.run.pipelineId,
          f.run.id,
          f.nodeId,
          void 0,
          f.snapshotInput || void 0
        );
        h(null), n(`/pipelines/${f.run.pipelineId}/runs/${F.newRunId}`);
      } catch (F) {
        N(F instanceof Error ? F.message : String(F)), u(!1);
      }
    }
  }, [f, n]), { query: k, statuses: $, triggerKinds: S, range: A } = L(
    () => ir(r),
    [r]
  ), D = (F, J) => {
    const de = new URLSearchParams(r);
    J ? de.set(F, J) : de.delete(F), o(de, { replace: !0 });
  }, H = (F) => {
    const J = new Set($);
    J.has(F) ? J.delete(F) : J.add(F), D("status", J.size === 0 ? null : Array.from(J).join(","));
  }, G = (F) => {
    const J = new Set(S);
    J.has(F) ? J.delete(F) : J.add(F), D("trigger", J.size === 0 ? null : Array.from(J).join(","));
  }, ee = (F) => {
    D("range", F === "7d" ? null : F);
  }, ie = (F) => {
    D("q", F.length === 0 ? null : F);
  }, le = (F) => {
    p((J) => J.includes(F) ? J.filter((de) => de !== F) : J.length >= 2 ? [J[1], F] : [...J, F]);
  };
  q(() => {
    e && (c(Xe(e)), i(wt(e)));
  }, [e]);
  const oe = L(
    () => ar(a, { query: k, statuses: $, triggerKinds: S, range: A }),
    [a, k, $, S, A]
  ), ue = L(() => {
    const F = /* @__PURE__ */ new Map();
    if (!d) return F;
    for (const J of d.nodes)
      J.data.type === "llm" && F.set(J.id, J.data.model);
    return F;
  }, [d]), O = L(() => {
    const F = {};
    for (const J of oe) {
      const de = Object.values(J.steps).filter((pe) => !!pe.llm).map((pe) => ({
        model: ue.get(pe.nodeId),
        tokensIn: pe.llm?.tokensIn ?? 0,
        tokensOut: pe.llm?.tokensOut ?? 0
      }));
      F[J.id] = gt(at(de).total);
    }
    return F;
  }, [oe, ue]), Y = () => {
    if (!e) return;
    C(!1);
    const F = Array.from(m), J = a.filter((de) => !m.has(de.id));
    Wn(e);
    for (const de of [...J].sort((pe, be) => pe.startedAt.localeCompare(be.startedAt)))
      Sr(e, de);
    i(wt(e)), x(/* @__PURE__ */ new Set()), p((de) => de.filter((pe) => !F.includes(pe)));
  }, W = () => {
    const F = a.filter((E) => m.has(E.id));
    if (F.length === 0) return;
    const J = new Blob([JSON.stringify(F, null, 2)], { type: "application/json" }), de = URL.createObjectURL(J), pe = document.createElement("a"), be = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
    pe.href = de, pe.download = `pipeline-runs-${be}.json`, document.body.appendChild(pe), pe.click(), document.body.removeChild(pe), URL.revokeObjectURL(de);
  };
  return e ? d ? /* @__PURE__ */ s("div", { "data-testid": "pipeline-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ t(
      jt,
      {
        open: f !== null,
        onConfirm: w,
        onCancel: () => {
          g || h(null);
        },
        title: "Retry from failure",
        confirmLabel: g ? "Starting…" : "Confirm retry",
        confirmDisabled: g,
        children: f && /* @__PURE__ */ s("div", { className: "flex flex-col gap-2.5", children: [
          /* @__PURE__ */ s("div", { className: "text-[13px] text-text-secondary", children: [
            "Run ",
            /* @__PURE__ */ t("code", { className: "bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs", children: f.run.id.slice(0, 8) }),
            " will restart from step",
            " ",
            /* @__PURE__ */ s("code", { className: "bg-[#fafbfc] px-1 py-px rounded-[3px] text-xs", children: [
              f.nodeId.slice(0, 12),
              f.nodeId.length > 12 ? "…" : ""
            ] }),
            " ",
            "using the original upstream context."
          ] }),
          f.skippedNodes.length > 0 && /* @__PURE__ */ s("div", { children: [
            /* @__PURE__ */ s("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5", children: [
              "Steps skipped (",
              f.skippedNodes.length,
              ")"
            ] }),
            /* @__PURE__ */ t("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: f.skippedNodes.map((F) => /* @__PURE__ */ t("span", { className: "bg-[#fafbfc] border border-border rounded-[3px] px-1.5 py-px text-[11px] font-mono text-text-secondary", children: F.slice(0, 10) }, F)) })
          ] }),
          /* @__PURE__ */ s("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
            /* @__PURE__ */ t("input", { type: "checkbox", checked: f.snapshotInput, onChange: (F) => h((J) => J && { ...J, snapshotInput: F.target.checked }), className: "accent-primary" }),
            "Use persisted input snapshot"
          ] }),
          y && /* @__PURE__ */ t("div", { "data-testid": "retry-modal-error", className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: y })
        ] })
      }
    ),
    /* @__PURE__ */ t(
      jt,
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
    y && /* @__PURE__ */ t(et, { title: "Retry failed:", onDismiss: () => N(null), children: y }),
    /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          onClick: () => n(`/pipelines/${e}`),
          className: "bg-none border-none text-primary cursor-pointer text-[13px] p-0",
          children: [
            "← ",
            d.name
          ]
        }
      ),
      /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "/" }),
      /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: "Run history" }),
      /* @__PURE__ */ s("span", { className: "text-xs text-text-tertiary ml-auto", children: [
        a.length,
        " run",
        a.length === 1 ? "" : "s",
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
      /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          disabled: l.length !== 2,
          onClick: () => {
            if (l.length !== 2) return;
            const [F, J] = l;
            n(`/pipelines/${e}/runs/compare/${F}/${J}`);
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
    /* @__PURE__ */ t(
      lr,
      {
        query: k,
        statuses: $,
        triggerKinds: S,
        range: A,
        onQueryChange: ie,
        onStatusToggle: H,
        onTriggerToggle: G,
        onRangeChange: ee,
        onClearFilters: () => {
          ie(""), D("status", null), D("trigger", null);
        }
      }
    ),
    m.size > 0 && /* @__PURE__ */ t(
      pl,
      {
        selectionCount: m.size,
        onExport: W,
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
        title: a.length === 0 ? "No runs yet" : "No runs match these filters",
        body: a.length === 0 ? "Trigger this pipeline and completed runs will appear here." : "Try clearing a filter or expanding the date range."
      }
    ) : /* @__PURE__ */ t(
      hl,
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
  ) }) : /* @__PURE__ */ t(ot, { to: "/pipelines", replace: !0 });
}
function xl(e) {
  return L(() => {
    if (!e) return null;
    const n = Xe(e.pipelineId);
    if (!n) return null;
    const r = /* @__PURE__ */ new Map();
    for (const a of n.nodes)
      a.data.type === "llm" && r.set(a.id, a.data.model);
    const o = Object.values(e.steps).filter((a) => !!a.llm).map((a) => ({
      model: r.get(a.nodeId),
      tokensIn: a.llm?.tokensIn ?? 0,
      tokensOut: a.llm?.tokensOut ?? 0
    }));
    return at(o).total;
  }, [e]);
}
function Ke({ title: e, children: n }) {
  return /* @__PURE__ */ s("div", { className: "px-4 py-2.5 border-t border-border", children: [
    /* @__PURE__ */ t("div", { className: "text-[10px] font-bold text-text-tertiary uppercase tracking-[0.5px] mb-1.5", children: e }),
    n
  ] });
}
const In = "m-0 px-3 py-2 bg-[#fafbfc] border border-border rounded-md text-[11px] font-mono text-text-secondary whitespace-pre-wrap break-words max-h-[300px] overflow-auto", Sn = "px-3.5 py-2.5 bg-[#fafbfc] border border-border rounded-md text-[13px] text-text-primary whitespace-pre-wrap break-words leading-[1.6] max-h-[400px] overflow-auto", Ut = "text-left px-2 py-1 text-[10px] font-semibold text-text-tertiary uppercase", Se = "px-2 py-[5px] text-[11px] text-text-secondary align-top", gl = {
  "#2563eb": "bg-blue-600/10 text-blue-600",
  "#7c3aed": "bg-violet-600/10 text-violet-600",
  "#16a34a": "bg-green-600/10 text-green-600",
  "#dc2626": "bg-red-600/10 text-red-600"
};
function dt(e) {
  return `inline-block px-1.5 py-px rounded-[3px] text-[10px] font-semibold ${gl[e] ?? ""}`.trimEnd();
}
const bl = {
  completed: "#16a34a",
  failed: "#dc2626",
  running: "#2563eb"
};
function yl({ stepId: e, step: n, index: r, nodeType: o, nodeConfig: a, onRetryFromStep: i, onResumeFromStep: d }) {
  const [c, l] = R(!1), p = n.output, m = p?.response, x = n.llm, f = n.input, h = bl[n.status] ?? "#94a3b8";
  return /* @__PURE__ */ s("div", { className: "relative pl-9 mb-1", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: "absolute left-[10px] top-[14px] w-3 h-3 rounded-full border-2 border-white z-[1] shadow-[0_0_0_1px_#e2e8f0]",
        style: { background: h }
      }
    ),
    /* @__PURE__ */ s(
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
          border: `1px solid ${c ? h + "40" : "#e2e8f0"}`,
          ...c ? { borderRadius: "8px 8px 0 0" } : {}
        },
        children: [
          /* @__PURE__ */ t(
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
          /* @__PURE__ */ t(
            "span",
            {
              "aria-label": `Status: ${n.status}`,
              className: "text-[10px] font-bold text-white px-1.5 py-0.5 rounded-[3px] uppercase shrink-0",
              style: { background: h },
              children: n.status
            }
          ),
          /* @__PURE__ */ s("span", { className: "text-[13px] font-semibold text-text-primary", children: [
            r + 1,
            ". ",
            o
          ] }),
          /* @__PURE__ */ t("span", { className: "text-[11px] font-mono text-text-tertiary", children: e.slice(0, 8) }),
          n.durationMs != null && /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary ml-auto", children: n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` }),
          x && /* @__PURE__ */ s("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
            x.tokensIn + x.tokensOut,
            " tok"
          ] }),
          p?.tokensIn != null && !x && /* @__PURE__ */ s("span", { className: "text-[10px] text-text-tertiary font-mono", children: [
            Number(p.tokensIn) + Number(p.tokensOut),
            " tok"
          ] })
        ]
      }
    ),
    c && /* @__PURE__ */ s(
      "div",
      {
        className: "border-t-0 rounded-b-lg bg-surface overflow-hidden",
        style: { border: `1px solid ${h}40` },
        children: [
          /* @__PURE__ */ t(Ke, { title: "Execution Timeline", children: /* @__PURE__ */ s("table", { className: "w-full text-[11px] border-collapse font-mono", children: [
            /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ s("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ t("th", { scope: "col", className: Ut, children: "Event" }),
              /* @__PURE__ */ t("th", { scope: "col", className: Ut, children: "Time" }),
              /* @__PURE__ */ t("th", { scope: "col", className: Ut, children: "Detail" })
            ] }) }),
            /* @__PURE__ */ s("tbody", { children: [
              n.startedAt && /* @__PURE__ */ s("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#2563eb"), children: "started" }) }),
                /* @__PURE__ */ t("td", { className: Se, children: new Date(n.startedAt).toLocaleTimeString() }),
                /* @__PURE__ */ s("td", { className: Se, children: [
                  "Node ",
                  e.slice(0, 8),
                  " (",
                  o,
                  ") began execution"
                ] })
              ] }),
              x?.streamOpened && /* @__PURE__ */ s("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#7c3aed"), children: "stream.opened" }) }),
                /* @__PURE__ */ t("td", { className: Se, children: "—" }),
                /* @__PURE__ */ t("td", { className: Se, children: "LLM stream connection established" })
              ] }),
              x?.firstTokenLatencyMs != null && /* @__PURE__ */ s("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#7c3aed"), children: "first.token" }) }),
                /* @__PURE__ */ s("td", { className: Se, children: [
                  "+",
                  x.firstTokenLatencyMs,
                  "ms"
                ] }),
                /* @__PURE__ */ t("td", { className: Se, children: "First token received from LLM" })
              ] }),
              n.completedAt && n.status === "completed" && /* @__PURE__ */ s("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#16a34a"), children: "completed" }) }),
                /* @__PURE__ */ t("td", { className: Se, children: new Date(n.completedAt).toLocaleTimeString() }),
                /* @__PURE__ */ s("td", { className: Se, children: [
                  "Finished in ",
                  n.durationMs != null ? n.durationMs < 1e3 ? `${n.durationMs}ms` : `${(n.durationMs / 1e3).toFixed(1)}s` : "—"
                ] })
              ] }),
              n.status === "failed" && /* @__PURE__ */ s("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ t("td", { className: Se, children: /* @__PURE__ */ t("span", { className: dt("#dc2626"), children: "failed" }) }),
                /* @__PURE__ */ t("td", { className: Se, children: n.completedAt ? new Date(n.completedAt).toLocaleTimeString() : "—" }),
                /* @__PURE__ */ t("td", { className: Se, children: n.error ?? "Unknown error" })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ t(Ke, { title: "Node Configuration", children: a && Object.keys(a).length > 1 ? /* @__PURE__ */ t("div", { className: "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs", children: Object.entries(a).filter(([g]) => g !== "type").map(([g, u]) => /* @__PURE__ */ s(jn.Fragment, { children: [
            /* @__PURE__ */ t("span", { className: "text-text-tertiary font-medium", children: g }),
            /* @__PURE__ */ t(
              "span",
              {
                className: I(
                  "text-text-secondary break-words",
                  typeof u == "string" && u.length > 60 ? "whitespace-pre-wrap font-sans" : "whitespace-nowrap font-mono"
                ),
                children: typeof u == "string" ? u : JSON.stringify(u)
              }
            )
          ] }, g)) }) : /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary italic", children: "No configuration" }) }),
          f && Object.keys(f).length > 0 && /* @__PURE__ */ t(Ke, { title: "Runtime Input", children: /* @__PURE__ */ t("pre", { className: In, children: JSON.stringify(f, null, 2) }) }),
          x?.prompt && /* @__PURE__ */ t(Ke, { title: "Resolved Prompt", children: /* @__PURE__ */ t("div", { className: Sn, children: x.prompt }) }),
          m || x?.response ? /* @__PURE__ */ t(Ke, { title: "Response", children: /* @__PURE__ */ t("div", { className: Sn, children: m ?? x?.response }) }) : /* @__PURE__ */ t(Ke, { title: "Output", children: p && Object.keys(p).length > 0 ? /* @__PURE__ */ t("pre", { className: In, children: JSON.stringify(p, null, 2) }) : /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary italic", children: "No output data" }) }),
          (x || p?.tokensIn != null) && /* @__PURE__ */ t(Ke, { title: "Token Usage", children: /* @__PURE__ */ s("div", { className: "flex gap-5 flex-wrap text-xs text-text-secondary", children: [
            /* @__PURE__ */ s("span", { children: [
              "Tokens in: ",
              /* @__PURE__ */ t("strong", { children: String(x?.tokensIn ?? p?.tokensIn ?? "—") })
            ] }),
            /* @__PURE__ */ s("span", { children: [
              "Tokens out: ",
              /* @__PURE__ */ t("strong", { children: String(x?.tokensOut ?? p?.tokensOut ?? "—") })
            ] }),
            x?.firstTokenLatencyMs != null && /* @__PURE__ */ s("span", { children: [
              "First token: ",
              /* @__PURE__ */ s("strong", { children: [
                x.firstTokenLatencyMs,
                "ms"
              ] })
            ] })
          ] }) }),
          n.error && /* @__PURE__ */ t(Ke, { title: "Error", children: /* @__PURE__ */ t("div", { className: "px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b] font-mono whitespace-pre-wrap", children: n.error }) }),
          (i || d) && /* @__PURE__ */ s("div", { className: "px-4 py-2.5 border-t border-border flex justify-end gap-2", children: [
            d && /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                "data-testid": `resume-from-step-${e}`,
                onClick: (g) => {
                  g.stopPropagation(), d(e);
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
function vl({ steps: e, nodeDataMap: n, edges: r, onRetryFromStep: o, onResumeFromStep: a }) {
  const i = L(() => {
    const l = Object.entries(e).sort(([, b], [, w]) => {
      const k = b.completedAt ? Date.parse(b.completedAt) - (b.durationMs ?? 0) : 0, $ = w.completedAt ? Date.parse(w.completedAt) - (w.durationMs ?? 0) : 0;
      return k - $;
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
        const $ = l.find(([ee]) => p(ee) === k && !u.has(ee));
        if (!$) break;
        const [S, A] = $;
        u.add(S);
        const D = { stepId: S, step: A, children: [] }, H = p(S);
        if (x.has(H)) {
          const ee = h.filter((ie) => ie.forkId === H);
          for (const { branch: ie, targetNodeId: le } of ee) {
            const oe = y(le);
            for (const ue of oe)
              ue.branch = ue.branch ?? ie;
            oe.length > 0 && (oe[0].branch = ie, D.children.push(...oe));
          }
        }
        w.push(D);
        const G = g.get(H)?.filter((ee) => ee.handle === "out");
        k = G && G.length === 1 ? G[0].target : null;
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
  }, [e, n, r]), d = (l) => {
    if (n[l]) return n[l];
    const p = l.lastIndexOf(":");
    if (p > 0 && /^\d+$/.test(l.slice(p + 1)))
      return n[l.slice(0, p)];
  };
  function c(l, p) {
    let m = p;
    return l.map((x) => {
      const f = m++, h = /* @__PURE__ */ new Map();
      for (const g of x.children) {
        const u = g.branch ?? "default";
        h.has(u) || h.set(u, []), h.get(u).push(g);
      }
      return /* @__PURE__ */ s(jn.Fragment, { children: [
        /* @__PURE__ */ t(
          yl,
          {
            stepId: x.stepId,
            step: x.step,
            index: f,
            nodeType: d(x.stepId)?.type ?? "unknown",
            nodeConfig: d(x.stepId)?.data,
            onRetryFromStep: o,
            onResumeFromStep: a
          }
        ),
        x.children.length > 0 && /* @__PURE__ */ t("div", { className: "ml-9 pl-5 border-l-2 border-dashed border-border mb-1", children: Array.from(h.entries()).map(([g, u], y) => /* @__PURE__ */ s("div", { children: [
          /* @__PURE__ */ t("div", { className: `text-[10px] font-semibold text-text-tertiary uppercase pt-1 pb-0.5 ${y === 0 ? "mt-1" : "mt-2"}`, children: g.replace("-", " ") }),
          c(u, m)
        ] }, g)) })
      ] }, x.stepId);
    });
  }
  return /* @__PURE__ */ s("div", { className: "relative", children: [
    /* @__PURE__ */ t("div", { className: "absolute left-[15px] top-6 bottom-6 w-0.5 bg-border rounded-sm" }),
    c(i, 0)
  ] });
}
const Nl = 5e3, wl = "synthetic-";
function kl(e) {
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
function Ht(e, n) {
  return n.timestamp.localeCompare(e.timestamp);
}
function Cl(e, n) {
  if (n.length === 0) return e.slice().sort(Ht);
  const r = new Set(e.map((i) => i.auditId)), o = /* @__PURE__ */ new Map();
  for (const i of e) {
    const d = o.get(i.action);
    (!d || i.timestamp > d) && o.set(i.action, i.timestamp);
  }
  const a = n.filter((i) => {
    if (r.has(i.auditId)) return !1;
    const d = o.get(i.action);
    return !d || i.timestamp >= d;
  });
  return [...e, ...a].sort(Ht);
}
function Il(e, n, r = {}) {
  const { pollMs: o = Nl, filters: a } = r, i = Vr(), [d, c] = R([]), [l, p] = R([]), [m, x] = R(!0), [f, h] = R(null), [g, u] = R(void 0), [y, N] = R(0), [v, C] = R(!1), b = JSON.stringify({
    since: a?.since,
    until: a?.until,
    actions: a?.actions,
    limit: a?.limit
  });
  q(() => {
    if (!e || !n) return;
    let A = !1;
    return x(!0), h(null), (async () => {
      try {
        const D = await rn(e, n, a ?? {});
        if (A) return;
        c(D.items), u(D.nextCursor), x(!1);
      } catch (D) {
        if (A) return;
        h(D instanceof Error ? D.message : String(D)), x(!1);
      }
    })(), () => {
      A = !0;
    };
  }, [e, n, b, y]), q(() => {
    if (!e || !n || o <= 0) return;
    const A = window.setInterval(() => {
      N((D) => D + 1);
    }, o);
    return () => window.clearInterval(A);
  }, [e, n, o]), q(() => {
    if (!e || !n) return;
    const A = [], D = (G, ee) => {
      const ie = kl(G);
      if (!ie) return;
      const le = ee;
      if (le.runId !== n) return;
      C(!0);
      const oe = {
        auditId: `${wl}${G}-${le.stepId ?? "run"}-${Date.now()}`,
        timestamp: le.at ?? (/* @__PURE__ */ new Date()).toISOString(),
        action: ie,
        actorUserId: "executor",
        pipelineId: e,
        runId: n,
        trace: ee
      };
      p((ue) => [oe, ...ue]);
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
    for (const G of H)
      A.push(i.subscribe(G, (ee) => D(G, ee)));
    return A.push(i.subscribeToRun(n)), () => {
      for (const G of A) G();
    };
  }, [i, e, n]), q(() => {
    d.length !== 0 && p((A) => {
      if (A.length === 0) return A;
      const D = /* @__PURE__ */ new Map();
      for (const H of d) {
        const G = D.get(H.action);
        (!G || H.timestamp > G) && D.set(H.action, H.timestamp);
      }
      return A.filter((H) => {
        const G = D.get(H.action);
        return !G || H.timestamp >= G;
      });
    });
  }, [d]);
  const w = te(!1), k = M(() => {
    !e || !n || !g || w.current || (w.current = !0, (async () => {
      try {
        const A = await rn(e, n, {
          ...a ?? {},
          cursor: g
        });
        c((D) => {
          const H = new Set(D.map((ee) => ee.auditId)), G = D.concat(A.items.filter((ee) => !H.has(ee.auditId)));
          return G.sort(Ht), G;
        }), u(A.nextCursor);
      } catch (A) {
        h(A instanceof Error ? A.message : String(A));
      } finally {
        w.current = !1;
      }
    })());
  }, [e, n, g, b]), $ = M(() => {
    N((A) => A + 1);
  }, []);
  return {
    items: L(() => Cl(d, l), [d, l]),
    loading: m,
    error: f,
    hasMore: !!g,
    loadMore: k,
    liveHealthy: v,
    refresh: $
  };
}
const Sl = "#3b82f6", Tl = "#eab308", Al = "#f97316", Tn = "#64748b", Rl = "#ef4444", $l = "#a855f7";
function Dl(e) {
  return e.action === "pipeline.step.failed" || e.outcome === "error" ? Rl : e.action === "pipeline.run.resumed-from-step" || e.action.startsWith("pipeline.step.context.patched") ? $l : e.action.startsWith("pipeline.approval.") ? Tl : e.action.startsWith("pipeline.breakpoint.") ? Al : e.action.startsWith("pipeline.step.") ? Sl : (e.action.startsWith("pipeline.run."), Tn);
}
const Pl = {
  "1h": "Last 1h",
  "24h": "Last 24h",
  all: "All"
}, An = [
  { label: "Steps", matches: (e) => e.startsWith("pipeline.step.") },
  { label: "Approvals", matches: (e) => e.startsWith("pipeline.approval.") || e === "pipeline.approve" || e === "pipeline.reject" },
  { label: "Breakpoints", matches: (e) => e.startsWith("pipeline.breakpoint.") || e === "pipeline.step.breakpoint.hit" },
  { label: "Run lifecycle", matches: (e) => e.startsWith("pipeline.run.") || e === "pipeline.trigger" || e === "pipeline.cancel" },
  { label: "Errors", matches: (e) => e === "pipeline.step.failed" || e === "pipeline.run.failed" || e === "pipeline.force_fail" }
];
function Ml(e) {
  if (e === "all") return null;
  const n = Date.now();
  return e === "1h" ? n - 3600 * 1e3 : n - 1440 * 60 * 1e3;
}
function Rn(e) {
  const n = e.details, r = e.trace, o = n && typeof n.stepId == "string" ? n.stepId : void 0, a = r && typeof r.stepId == "string" ? r.stepId : void 0, i = r && typeof r.nodeId == "string" ? r.nodeId : void 0;
  return o ?? a ?? i;
}
function El(e, n = Date.now()) {
  const r = Date.parse(e);
  if (!Number.isFinite(r)) return e;
  const o = Math.max(0, Math.floor((n - r) / 1e3));
  if (o < 5) return "just now";
  if (o < 60) return `${o}s ago`;
  const a = Math.floor(o / 60);
  if (a < 60) return `${a}m ago`;
  const i = Math.floor(a / 60);
  return i < 24 ? `${i}h ago` : `${Math.floor(i / 24)}d ago`;
}
function Ol({
  pipelineId: e,
  runId: n,
  onStepClick: r
}) {
  const o = Il(e, n), { items: a, error: i, hasMore: d, loadMore: c, loading: l } = o, [p, m] = R(/* @__PURE__ */ new Set()), [x, f] = R(""), [h, g] = R("all"), [u, y] = R(/* @__PURE__ */ new Set()), N = M((k) => {
    m(($) => {
      const S = new Set($);
      return S.has(k) ? S.delete(k) : S.add(k), S;
    });
  }, []), v = M((k) => {
    y(($) => {
      const S = new Set($);
      return S.has(k) ? S.delete(k) : S.add(k), S;
    });
  }, []), C = L(() => {
    const k = Ml(h), $ = x.trim().toLowerCase(), S = An.filter((A) => p.has(A.label));
    return a.filter((A) => {
      if (S.length > 0 && !S.some((D) => D.matches(A.action)) || $ && !A.actorUserId.toLowerCase().includes($)) return !1;
      if (k !== null) {
        const D = Date.parse(A.timestamp);
        if (!Number.isFinite(D) || D < k) return !1;
      }
      return !0;
    });
  }, [a, p, x, h]), b = M(() => {
    if (typeof window > "u") return;
    const k = C.map((D) => JSON.stringify(D)).join(`
`) + (C.length > 0 ? `
` : ""), $ = new Blob([k], { type: "application/x-ndjson" }), S = URL.createObjectURL($), A = document.createElement("a");
    A.href = S, A.download = `executor-log-${n}.ndjson`, document.body.appendChild(A), A.click(), document.body.removeChild(A), URL.revokeObjectURL(S);
  }, [C, n]), w = M(
    (k) => {
      if (v(k.auditId), !r || !k.action.startsWith("pipeline.step.")) return;
      const $ = Rn(k);
      $ && r($);
    },
    [r, v]
  );
  return /* @__PURE__ */ s(
    "div",
    {
      className: "flex flex-col flex-1 min-h-0 bg-surface border border-border rounded-lg overflow-hidden",
      "data-testid": "executor-log",
      children: [
        /* @__PURE__ */ s("div", { className: "sticky top-0 z-[2] flex flex-wrap items-center gap-2 px-3 py-2.5 bg-[#f8fafc] border-b border-border text-xs", children: [
          /* @__PURE__ */ s(
            "span",
            {
              className: I(
                "inline-flex items-center text-[11px] font-semibold",
                i ? "text-text-tertiary" : "text-text-secondary"
              ),
              "data-testid": "executor-log-live-indicator",
              title: i ? `Live updates unavailable: ${i}` : "Live updates active",
              children: [
                /* @__PURE__ */ t(
                  "span",
                  {
                    className: I(
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
          An.map((k) => {
            const $ = p.has(k.label);
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  $ ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => N(k.label),
                "data-testid": `executor-log-chip-${k.label.toLowerCase().replace(/\s+/g, "-")}`,
                "aria-pressed": $,
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
            const $ = h === k;
            return /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: I(
                  "font-[inherit] text-[11px] font-semibold px-2.5 py-[3px] rounded-xl border cursor-pointer",
                  $ ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]" : "bg-surface text-text-secondary border-border"
                ),
                onClick: () => g(k),
                "data-testid": `executor-log-time-${k}`,
                "aria-pressed": $,
                children: Pl[k]
              },
              k
            );
          }),
          /* @__PURE__ */ t("div", { className: "flex-1" }),
          /* @__PURE__ */ s("span", { className: "text-[11px] text-text-tertiary", children: [
            C.length,
            " of ",
            a.length,
            " shown"
          ] })
        ] }),
        /* @__PURE__ */ s("div", { className: "flex-1 overflow-y-auto px-4 py-3 relative", "data-testid": "executor-log-timeline", children: [
          l && a.length === 0 && /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary p-3", children: "Loading audit rows…" }),
          !l && a.length === 0 && /* @__PURE__ */ t(
            "div",
            {
              className: "px-3 py-6 text-[13px] text-text-secondary text-center leading-relaxed",
              "data-testid": "executor-log-empty",
              children: "Audit log started recording on 2026-05-07 (hub#2224). This run predates that — no rows captured."
            }
          ),
          C.length === 0 && a.length > 0 && /* @__PURE__ */ t(
            "div",
            {
              className: "px-3 py-5 text-xs text-text-tertiary text-center",
              "data-testid": "executor-log-no-matches",
              children: "No audit rows match the current filters."
            }
          ),
          C.map((k) => {
            const $ = u.has(k.auditId), A = k.action.startsWith("pipeline.step.") ? Rn(k) : void 0;
            return /* @__PURE__ */ s(
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
                      style: { background: Dl(k) },
                      "aria-hidden": !0,
                      "data-testid": "executor-log-marker"
                    }
                  ),
                  /* @__PURE__ */ t(
                    "span",
                    {
                      className: "text-text-tertiary font-mono text-[11px] whitespace-nowrap",
                      title: k.timestamp,
                      children: El(k.timestamp)
                    }
                  ),
                  /* @__PURE__ */ t("span", { className: "text-text-secondary text-[11px] whitespace-nowrap", children: k.actorUserId }),
                  /* @__PURE__ */ s("span", { className: "text-text-primary flex items-baseline gap-1.5 flex-wrap", children: [
                    /* @__PURE__ */ t("code", { className: "font-mono text-[11px] bg-[#fafbfc] px-1.5 py-px rounded-[3px]", children: k.action }),
                    A && /* @__PURE__ */ s("span", { className: "text-[11px] text-text-tertiary", "data-testid": "executor-log-stepid", children: [
                      "· ",
                      A.slice(0, 14),
                      A.length > 14 ? "…" : ""
                    ] }),
                    k.outcome && /* @__PURE__ */ s(
                      "span",
                      {
                        className: I(
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
                  $ && k.trace && /* @__PURE__ */ t(
                    "pre",
                    {
                      className: "col-[2/span_3] mt-1 p-2 bg-[#fafbfc] border border-border rounded text-[11px] font-mono text-text-secondary overflow-x-auto",
                      "data-testid": "executor-log-trace",
                      onClick: (D) => D.stopPropagation(),
                      children: JSON.stringify(k.trace, null, 2)
                    }
                  )
                ]
              },
              k.auditId
            );
          })
        ] }),
        /* @__PURE__ */ s("div", { className: "flex justify-between items-center gap-2 px-3 py-2.5 border-t border-border bg-[#f8fafc]", children: [
          d ? /* @__PURE__ */ t("span", { "data-testid": "executor-log-load-more", children: /* @__PURE__ */ t(
            Be,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => c(),
              children: "Load more"
            }
          ) }) : /* @__PURE__ */ t("span", {}),
          /* @__PURE__ */ t("span", { "data-testid": "executor-log-download", children: /* @__PURE__ */ t(
            Be,
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
function fd() {
  const { pipelineId: e, runId: n } = rt();
  return !e || !n ? /* @__PURE__ */ t(ot, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t(Kn, { pipelineId: e, children: /* @__PURE__ */ t(Tr, { children: /* @__PURE__ */ t(Ll, { pipelineId: e, runId: n }) }) });
}
function Ll({ pipelineId: e, runId: n }) {
  const r = Pe(), o = Je(), a = st(), { definition: i } = o, [d, c] = R(null);
  q(() => {
    let E = !1;
    return import("./PipelineEditorServicesContext-FYjuBErM.js").then((re) => re.T).then(({ getPipelineRun: re }) => {
      re(e, n).then((ge) => {
        !E && ge && c(ge);
      });
    }), () => {
      E = !0;
    };
  }, [e, n]);
  const l = L(() => {
    const E = a.runs[n], re = d;
    if (!E && !re) return;
    if (!E) return re ?? void 0;
    if (!re) return E;
    const ge = Object.keys(E.steps).length, $e = Object.keys(re.steps).length;
    return ge >= $e ? E : { ...re, status: E.status, currentStepIds: E.currentStepIds };
  }, [a.runs, n, d]);
  Ar(n);
  const p = xl(l ?? null), m = L(() => {
    const E = {};
    if (!i) return E;
    for (const re of i.nodes)
      E[re.id] = { type: re.data.type, data: re.data };
    return E;
  }, [i]), [x, f] = R(!1), h = te(null);
  nt(h, () => f(!1), x);
  const [g, u] = R("steps"), [y, N] = R(null), v = M((E) => {
    N(E), u("steps");
  }, []), [C, b] = R(null), [w, k] = R(null), [$, S] = R(!1), A = l?.status === "failed" ? l.error?.nodeId : void 0, D = M((E) => {
    if (!l) return;
    const re = Object.entries(l.steps).filter(([ge, $e]) => ge !== E && $e.status === "completed").map(([ge]) => ge);
    b({ nodeId: E, skippedNodes: re, snapshotInput: !1 }), k(null);
  }, [l]), H = M(async () => {
    if (!(!C || !l)) {
      k(null), S(!0);
      try {
        const E = await Jn(
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
  }, [C, l, e, r]), [G, ee] = R(null), [ie, le] = R(null), [oe, ue] = R(null), O = M(async (E) => {
    if (l) {
      le(null), ee(E);
      try {
        const re = await Rr(e, l.id, E);
        ue(
          `Resumed from ${E.slice(0, 10)}${E.length > 10 ? "…" : ""} (replay #${re.replayAttempts})`
        ), setTimeout(() => ue(null), 4e3), r(`/pipelines/${e}/runs/${l.id}`);
      } catch (re) {
        le(re instanceof Error ? re.message : String(re));
      } finally {
        ee(null);
      }
    }
  }, [l, e, r]), Y = M(async () => {
    if (!l) {
      try {
        const E = await a.triggerRun(e);
        r(`/pipelines/${e}/runs/${E}`);
      } catch (E) {
        console.error("[PipelineRunReplay] re-run failed", E);
      }
      return;
    }
    try {
      const E = await a.triggerRun(
        e,
        l.triggeredBy.payload
      );
      r(`/pipelines/${e}/runs/${E}`);
    } catch (E) {
      console.error("[PipelineRunReplay] re-run failed", E);
    }
  }, [l, a, e, r]), W = async () => {
    f(!1);
    try {
      await navigator.clipboard?.writeText(n);
    } catch {
    }
  }, F = () => {
    if (f(!1), !l) return;
    const E = JSON.stringify(l, null, 2);
    ut(`run-${n}.json`, E);
  }, J = () => {
    if (f(!1), !i) return;
    const E = Kt(
      i.id,
      `${i.name} (from run)`
    );
    E && r(`/pipelines/${E.id}`);
  };
  if (!l)
    return /* @__PURE__ */ s(
      "div",
      {
        className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
        "data-testid": "pipeline-replay-missing",
        children: [
          /* @__PURE__ */ s("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
            /* @__PURE__ */ t(
              pt,
              {
                onClick: () => r(`/pipelines/${e}`),
                "aria-label": "Back to pipeline",
                title: "Back to pipeline",
                children: "←"
              }
            ),
            /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: i?.name ?? "Pipeline" })
          ] }),
          /* @__PURE__ */ s("div", { className: "flex-1 flex flex-col items-center justify-center gap-3.5 p-8 text-center", children: [
            /* @__PURE__ */ t("div", { className: "text-sm text-text-secondary", children: "Run not available — it may have been trimmed from history." }),
            /* @__PURE__ */ t(
              Be,
              {
                onClick: () => r(`/pipelines/${e}`),
                children: "Back to pipeline"
              }
            )
          ] })
        ]
      }
    );
  const de = Zt(l.status), pe = l.triggeredBy.userId ?? l.triggeredBy.triggerType, be = gt(p);
  return /* @__PURE__ */ s(
    "div",
    {
      className: "flex flex-col flex-1 h-0 overflow-hidden bg-surface-inset font-[inherit] text-text-primary rounded-lg border border-border",
      "data-testid": "pipeline-replay",
      children: [
        /* @__PURE__ */ s("div", { className: "h-11 shrink-0 flex items-center gap-2.5 px-3 border-b border-border bg-surface relative z-[5]", children: [
          /* @__PURE__ */ t(
            pt,
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
          /* @__PURE__ */ s(
            "div",
            {
              className: "text-xs text-text-secondary overflow-hidden text-ellipsis whitespace-nowrap",
              "data-testid": "replay-subtitle",
              children: [
                "Run from ",
                tt(l.startedAt),
                " by ",
                pe
              ]
            }
          ),
          /* @__PURE__ */ s(
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
          /* @__PURE__ */ t(ne, { tone: de.tone, "aria-label": `Status: ${de.label}`, children: de.label }),
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
            Be,
            {
              onClick: () => D(A),
              disabled: $,
              "data-testid": "retry-from-failed-step-button",
              title: `Retry from "${A}" with the original upstream context`,
              children: "↻ Retry from failure"
            }
          ),
          /* @__PURE__ */ t(
            Be,
            {
              onClick: Y,
              "data-testid": "rerun-button",
              title: "Re-run with the original trigger payload",
              children: "↻ Re-run"
            }
          ),
          /* @__PURE__ */ s("div", { className: "relative", ref: h, children: [
            /* @__PURE__ */ t(
              pt,
              {
                onClick: () => f((E) => !E),
                "aria-label": "More actions",
                "data-testid": "replay-overflow-btn",
                children: "⋯"
              }
            ),
            x ? /* @__PURE__ */ s("div", { className: "absolute top-full right-0 mt-1.5 bg-surface border border-border rounded-lg shadow-[0_12px_28px_rgba(15,23,42,0.14)] min-w-[200px] z-20 overflow-hidden", role: "menu", children: [
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: W, children: "Copy runId" }),
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: F, children: "Export run JSON" }),
              /* @__PURE__ */ t("button", { className: "block w-full text-left py-2 px-3.5 text-[13px] border-none bg-transparent cursor-pointer font-[inherit] text-text-primary", role: "menuitem", onClick: J, children: "Open as new draft" })
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ t(
          jt,
          {
            open: C !== null,
            onConfirm: H,
            onCancel: () => {
              $ || b(null);
            },
            title: "Retry from step",
            confirmLabel: $ ? "Starting…" : "Confirm retry",
            confirmDisabled: $,
            children: C && /* @__PURE__ */ s("div", { className: "flex flex-col gap-2.5", children: [
              /* @__PURE__ */ s("div", { className: "text-[13px] text-text-secondary", children: [
                "A new run will start from",
                " ",
                /* @__PURE__ */ s("code", { className: "bg-surface-inset px-1 rounded text-xs", children: [
                  C.nodeId.slice(0, 12),
                  C.nodeId.length > 12 ? "…" : ""
                ] }),
                " ",
                "using the original upstream context."
              ] }),
              C.skippedNodes.length > 0 && /* @__PURE__ */ s("div", { children: [
                /* @__PURE__ */ s("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase mb-1.5", children: [
                  "Steps that will be skipped (",
                  C.skippedNodes.length,
                  ")"
                ] }),
                /* @__PURE__ */ t("div", { className: "max-h-20 overflow-y-auto flex flex-wrap gap-1", children: C.skippedNodes.map((E) => /* @__PURE__ */ t("span", { className: "bg-surface-inset border border-border rounded px-1.5 py-px text-[11px] font-mono text-text-secondary", children: E.slice(0, 10) }, E)) })
              ] }),
              /* @__PURE__ */ s("label", { className: "flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer", children: [
                /* @__PURE__ */ t(
                  "input",
                  {
                    type: "checkbox",
                    checked: C.snapshotInput,
                    onChange: (E) => b((re) => re && { ...re, snapshotInput: E.target.checked }),
                    className: "accent-primary"
                  }
                ),
                "Use persisted input snapshot"
              ] }),
              w && /* @__PURE__ */ t("div", { "data-testid": "retry-modal-error", className: "py-2 px-3 bg-[#fef2f2] border border-[#fecaca] rounded-md text-xs text-[#991b1b]", children: w })
            ] })
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col min-h-0", children: /* @__PURE__ */ s("div", { className: "flex-1 overflow-auto py-5 px-7 bg-surface", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-3 mb-5", children: [
            /* @__PURE__ */ s("h3", { className: "m-0 text-[15px] font-bold text-text-primary", children: [
              "Steps (",
              Object.keys(l.steps).length,
              ")"
            ] }),
            /* @__PURE__ */ s("span", { className: "text-xs text-text-tertiary", children: [
              l.startedAt ? new Date(l.startedAt).toLocaleTimeString() : "",
              " — ",
              l.completedAt ? new Date(l.completedAt).toLocaleTimeString() : "in progress"
            ] }),
            l.durationMs != null && /* @__PURE__ */ s("span", { className: "text-xs text-text-secondary ml-auto", children: [
              "Total: ",
              l.durationMs < 1e3 ? `${l.durationMs}ms` : `${(l.durationMs / 1e3).toFixed(1)}s`
            ] })
          ] }),
          w && /* @__PURE__ */ t(et, { title: "Retry failed:", className: "mb-4", children: w }),
          ie && /* @__PURE__ */ t(et, { title: "Resume failed:", className: "mb-4", "data-testid": "resume-error-banner", children: ie }),
          (l.replayAttempts ?? 0) > 0 && /* @__PURE__ */ t(
            et,
            {
              title: "Resumed from a previous failure",
              className: "mb-4",
              "data-testid": "resume-history-banner",
              children: /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ s("div", { children: [
                  l.error?.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ s(V, { children: [
                    "Originally failed at ",
                    /* @__PURE__ */ t("code", { children: l.error.nodeId.slice(0, 12) }),
                    " — "
                  ] }),
                  "Resumed ",
                  l.replayAttempts,
                  " time",
                  l.replayAttempts === 1 ? "" : "s",
                  ".",
                  l.resumeHistory && l.resumeHistory.length > 0 && /* @__PURE__ */ s(V, { children: [
                    " ",
                    "Most recent: from",
                    " ",
                    /* @__PURE__ */ t("code", { children: l.resumeHistory[l.resumeHistory.length - 1].fromNodeId.slice(0, 12) }),
                    " ",
                    "at ",
                    tt(l.resumeHistory[l.resumeHistory.length - 1].at),
                    "."
                  ] })
                ] }),
                l.resumeHistory && l.resumeHistory.length > 1 && /* @__PURE__ */ t(
                  "ol",
                  {
                    className: "m-0 pl-[18px] text-[11px] text-text-tertiary leading-relaxed",
                    "data-testid": "resume-history-timeline",
                    children: l.resumeHistory.map((E, re) => /* @__PURE__ */ s("li", { children: [
                      "from ",
                      /* @__PURE__ */ t("code", { children: E.fromNodeId.slice(0, 12) }),
                      " at ",
                      tt(E.at)
                    ] }, `${E.fromNodeId}-${E.at}-${re}`))
                  }
                )
              ] })
            }
          ),
          oe && /* @__PURE__ */ t(et, { title: "Resumed", className: "mb-4", "data-testid": "resume-toast", children: oe }),
          l.error && /* @__PURE__ */ s(et, { title: "Run failed:", className: "mb-4", children: [
            l.error.message,
            l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ s("span", { className: "ml-2 text-[11px] text-[#b91c1c]", children: [
              "at node ",
              l.error.nodeId.slice(0, 8)
            ] }),
            l.status === "failed" && l.error.nodeId && l.error.nodeId !== "unknown" && /* @__PURE__ */ t("div", { className: "mt-2", children: /* @__PURE__ */ t(
              Be,
              {
                onClick: () => O(l.error.nodeId),
                disabled: G !== null,
                "data-testid": "resume-from-here-button",
                title: `Resume this run from "${l.error.nodeId}" using its accumulated upstream context`,
                children: G === l.error.nodeId ? "Resuming…" : "↻ Resume from here"
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
                const re = g === E.id;
                return /* @__PURE__ */ t(
                  "button",
                  {
                    role: "tab",
                    "aria-selected": re,
                    onClick: () => u(E.id),
                    "data-testid": `run-replay-tab-${E.id}`,
                    className: I(
                      "font-[inherit] text-[13px] font-semibold py-1.5 px-3.5 border-none bg-transparent cursor-pointer -mb-px",
                      re ? "text-text-primary border-b-2 border-b-primary" : "text-text-tertiary border-b-2 border-b-transparent"
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
              vl,
              {
                steps: l.steps,
                nodeDataMap: m,
                edges: i?.edges,
                onRetryFromStep: D,
                onResumeFromStep: l.status === "failed" ? O : void 0
              }
            )
          ) : /* @__PURE__ */ t("div", { className: "flex flex-col min-h-[400px] h-[60vh]", children: /* @__PURE__ */ t(
            Ol,
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
function _l(e) {
  return e == null ? "—" : `${e > 0 ? "+" : (e < 0, "")}${ve(Math.abs(e))}`.replace(/^(\+|-)?/, e === 0 ? "" : e > 0 ? "+" : "-");
}
function Ul(e) {
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
function Bl(e, n) {
  if (!e) return n;
  const r = e.nodes.find((o) => o.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function Fl(e, n) {
  if (!e) return !1;
  const r = e.nodes.find((o) => o.id === n);
  return !!r && r.data.type === "condition";
}
function $n(e) {
  if (!e) return;
  const n = e.output;
  if (n && typeof n == "object" && "result" in n)
    return n.result ? "true" : "false";
}
function jl(e, n) {
  const r = (f) => f.split(/(\s+)/).filter((h) => h.length > 0), o = r(e), a = r(n), i = o.length, d = a.length, c = Array.from({ length: i + 1 }, () => new Array(d + 1).fill(0));
  for (let f = i - 1; f >= 0; f--)
    for (let h = d - 1; h >= 0; h--)
      o[f] === a[h] ? c[f][h] = c[f + 1][h + 1] + 1 : c[f][h] = Math.max(c[f + 1][h], c[f][h + 1]);
  const l = [], p = (f, h) => {
    const g = l[l.length - 1];
    g && g.type === f ? g.text += h : l.push({ type: f, text: h });
  };
  let m = 0, x = 0;
  for (; m < i && x < d; )
    o[m] === a[x] ? (p("eq", o[m]), m++, x++) : c[m + 1][x] >= c[m][x + 1] ? (p("del", o[m]), m++) : (p("add", a[x]), x++);
  for (; m < i; )
    p("del", o[m++]);
  for (; x < d; )
    p("add", a[x++]);
  return l;
}
function zl(e, n, r) {
  const o = /* @__PURE__ */ new Set(), a = [];
  if (r)
    for (const i of r.nodes)
      (e.steps[i.id] || n.steps[i.id]) && (a.push(i.id), o.add(i.id));
  for (const i of [...Object.keys(e.steps), ...Object.keys(n.steps)])
    o.has(i) || (a.push(i), o.add(i));
  return a.map((i) => {
    const d = e.steps[i], c = n.steps[i], l = d?.durationMs, p = c?.durationMs, m = l != null && p != null ? p - l : void 0, x = !!d && !!c && d.status !== c.status;
    let f = !1;
    l != null && p != null && l > 0 && (f = Math.abs(p - l) / l > 0.5);
    const h = Fl(r, i), g = h ? $n(d) : void 0, u = h ? $n(c) : void 0, y = h && g !== void 0 && u !== void 0 && g !== u;
    return {
      nodeId: i,
      name: Bl(r, i),
      a: d,
      b: c,
      durationDelta: m,
      statusDiffers: x,
      durationLarge: f,
      branchDiffers: y,
      isLlm: !!(d?.llm || c?.llm),
      isCondition: h,
      branchA: g,
      branchB: u
    };
  });
}
function ql(e) {
  if (e.statusDiffers) return "bg-[#fef2f2]";
  if (e.branchDiffers) return "bg-[#eff6ff]";
  if (e.durationLarge) return "bg-[#fffbeb]";
}
function Dn({
  step: e,
  branch: n,
  isCondition: r
}) {
  if (!e)
    return /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" });
  const o = Ul(e.status);
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-0.5", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ t(ne, { tone: o, children: e.status }),
      /* @__PURE__ */ t("span", { className: "font-mono text-text-secondary", children: ve(e.durationMs) }),
      r && n ? /* @__PURE__ */ s("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        "(",
        n === "true" ? "T" : "F",
        ")"
      ] }) : null
    ] }),
    e.llm ? /* @__PURE__ */ s("div", { className: "font-mono text-[11px] text-text-tertiary", children: [
      e.llm.tokensIn,
      "→",
      e.llm.tokensOut,
      "tok"
    ] }) : null,
    e.error ? /* @__PURE__ */ t("div", { className: "text-[11px] text-[#dc2626]", title: e.error, children: e.error.length > 60 ? `${e.error.slice(0, 60)}…` : e.error }) : null
  ] });
}
function Hl({ a: e, b: n }) {
  const r = L(() => jl(e, n), [e, n]);
  return /* @__PURE__ */ t(
    "div",
    {
      className: "whitespace-pre-wrap break-words rounded-md border border-border bg-surface-inset p-2.5 font-mono text-xs leading-relaxed",
      "data-testid": "llm-word-diff",
      children: r.map((o, a) => o.type === "eq" ? /* @__PURE__ */ t("span", { children: o.text }, a) : o.type === "add" ? /* @__PURE__ */ t("span", { "data-diff": "add", className: "bg-[#dcfce7] text-[#166534]", children: o.text }, a) : /* @__PURE__ */ t("span", { "data-diff": "del", className: "bg-[#fee2e2] text-[#991b1b] line-through", children: o.text }, a))
    }
  );
}
function Kl({ row: e }) {
  const n = e.a?.llm, r = e.b?.llm, o = n && r ? r.tokensIn + r.tokensOut - (n.tokensIn + n.tokensOut) : void 0, a = ql(e);
  return /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ s("tr", { "data-testid": `run-compare-row-${e.nodeId}`, className: a, children: [
      /* @__PURE__ */ s("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a), children: [
        /* @__PURE__ */ t("div", { className: "font-semibold text-text-primary", children: e.name }),
        /* @__PURE__ */ t("div", { className: "font-mono text-[11px] text-text-tertiary", children: e.nodeId })
      ] }),
      /* @__PURE__ */ t("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a), children: /* @__PURE__ */ t(Dn, { step: e.a, branch: e.branchA, isCondition: e.isCondition }) }),
      /* @__PURE__ */ t("td", { className: I("border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", a), children: /* @__PURE__ */ t(Dn, { step: e.b, branch: e.branchB, isCondition: e.isCondition }) }),
      /* @__PURE__ */ s(
        "td",
        {
          className: I("border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", a),
          "data-testid": `run-compare-delta-${e.nodeId}`,
          children: [
            e.branchDiffers ? /* @__PURE__ */ t("span", { className: "font-semibold text-[#2563eb]", children: "different branch!" }) : e.statusDiffers ? /* @__PURE__ */ t("span", { className: "font-semibold text-[#dc2626]", children: "status differs" }) : e.durationDelta != null ? /* @__PURE__ */ t("span", { className: e.durationLarge ? "text-[#d97706]" : "text-text-secondary", children: _l(e.durationDelta) }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "—" }),
            o != null && o !== 0 ? /* @__PURE__ */ s("div", { className: "mt-0.5 text-[11px] text-text-tertiary", children: [
              o > 0 ? "+" : "",
              o,
              "tok"
            ] }) : null
          ]
        }
      )
    ] }),
    e.isLlm && (n || r) ? /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t("td", { className: "border-b border-border p-0", colSpan: 4, children: /* @__PURE__ */ s("details", { className: "bg-surface-inset px-3.5 py-2.5", children: [
      /* @__PURE__ */ t(
        "summary",
        {
          className: "cursor-pointer text-xs font-semibold text-text-secondary",
          "data-testid": `run-compare-llm-toggle-${e.nodeId}`,
          children: "LLM response diff"
        }
      ),
      /* @__PURE__ */ s("div", { className: "mt-2 grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ s("div", { children: [
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
        /* @__PURE__ */ s("div", { children: [
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
      /* @__PURE__ */ s("div", { className: "mt-2.5", children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Word-level diff" }),
        /* @__PURE__ */ t("div", { className: "mt-1.5", children: /* @__PURE__ */ t(
          Hl,
          {
            a: n?.response ?? "",
            b: r?.response ?? ""
          }
        ) })
      ] })
    ] }) }) }) : null
  ] });
}
function Wl({ runA: e, runB: n, def: r }) {
  const o = L(() => zl(e, n, r), [e, n, r]);
  return /* @__PURE__ */ s(
    "table",
    {
      className: "w-full overflow-hidden rounded-lg border border-border bg-surface text-[13px]",
      "data-testid": "run-compare-table",
      children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ s("tr", { children: [
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Step" }),
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run A" }),
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run B" }),
          /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Δ" })
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: o.map((a) => /* @__PURE__ */ t(Kl, { row: a }, a.nodeId)) })
      ]
    }
  );
}
function Jl(e) {
  return e == null ? "—" : `${e > 0 ? "+" : (e < 0, "")}${ve(Math.abs(e))}`.replace(/^(\+|-)?/, e === 0 ? "" : e > 0 ? "+" : "-");
}
function Vl(e) {
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
function Gl(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Pn(e, n) {
  const r = Object.values(e.steps).filter((o) => !!o.llm).map((o) => ({
    model: n.get(o.nodeId),
    tokensIn: o.llm?.tokensIn ?? 0,
    tokensOut: o.llm?.tokensOut ?? 0
  }));
  return gt(at(r).total);
}
function Mn({
  label: e,
  run: n,
  cost: r,
  testIdPrefix: o
}) {
  const a = Vl(n.status);
  return /* @__PURE__ */ s(
    "div",
    {
      className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
      "data-testid": `${o}-summary`,
      children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: e }),
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-tertiary", children: n.id.slice(0, 8) }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "text-text-secondary", children: tt(n.startedAt) })
        ] }),
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t(ne, { tone: a, children: n.status }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono", children: ve(n.durationMs) }),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono", "data-testid": `${o}-cost`, children: r })
        ] })
      ]
    }
  );
}
function hd() {
  const { pipelineId: e, runIdA: n, runIdB: r } = rt(), o = Pe(), a = L(
    () => e ? Xe(e) : null,
    [e]
  ), i = L(
    () => e && n ? kt(e, n) : null,
    [e, n]
  ), d = L(
    () => e && r ? kt(e, r) : null,
    [e, r]
  ), c = L(() => Gl(a), [a]);
  if (!e || !n || !r)
    return /* @__PURE__ */ t(ot, { to: "/pipelines", replace: !0 });
  if (!a)
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
  if (!i || !d)
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
  const l = (d.durationMs ?? 0) - (i.durationMs ?? 0), p = Pn(i, c), m = Pn(d, c), x = (/* @__PURE__ */ new Set([
    ...Object.keys(i.steps),
    ...Object.keys(d.steps)
  ])).size;
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-4 p-6 text-text-primary", "data-testid": "run-compare", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          onClick: () => o(`/pipelines/${e}/runs`),
          className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
          children: [
            "← ",
            a.name
          ]
        }
      ),
      /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "/" }),
      /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: "Compare runs" }),
      /* @__PURE__ */ s(
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
    /* @__PURE__ */ s("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ t(Mn, { label: "Run A", run: i, cost: p, testIdPrefix: "run-a" }),
      /* @__PURE__ */ t(Mn, { label: "Run B", run: d, cost: m, testIdPrefix: "run-b" })
    ] }),
    /* @__PURE__ */ s(
      "div",
      {
        className: "flex items-center gap-4 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-xs",
        "data-testid": "run-compare-delta",
        children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Δ duration" }),
          /* @__PURE__ */ t("span", { className: "font-mono text-[13px]", children: Jl(l) }),
          /* @__PURE__ */ t("span", { className: "flex-1" }),
          /* @__PURE__ */ s("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
            x,
            " step",
            x === 1 ? "" : "s",
            " compared"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ t(Wl, { runA: i, runB: d, def: a })
  ] });
}
function Yl(e) {
  return e === 0 ? "0ms" : `${e > 0 ? "+" : "-"}${ve(Math.abs(e))}`;
}
function En(e) {
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
function Xl({
  runA: e,
  runB: n,
  costA: r,
  costB: o
}) {
  const a = e.durationMs ?? 0, d = (n.durationMs ?? 0) - a;
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ s("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ s(
        "div",
        {
          className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
          "data-testid": "diff-run-a-summary",
          children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run A" }),
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-tertiary", children: e.id.slice(0, 8) }),
              /* @__PURE__ */ t(ne, { tone: En(e.status), children: e.status })
            ] }),
            /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary", children: tt(e.startedAt) }),
            /* @__PURE__ */ s("div", { className: "font-mono text-xs", children: [
              ve(e.durationMs),
              " | ",
              r
            ] }),
            /* @__PURE__ */ s("div", { className: "text-[11px] text-text-tertiary", children: [
              "Trigger: ",
              e.triggeredBy.userId ?? e.triggeredBy.triggerType
            ] })
          ]
        }
      ),
      /* @__PURE__ */ s(
        "div",
        {
          className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-3.5 text-xs",
          "data-testid": "diff-run-b-summary",
          children: [
            /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Run B" }),
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t("span", { className: "font-mono text-xs text-text-tertiary", children: n.id.slice(0, 8) }),
              /* @__PURE__ */ t(ne, { tone: En(n.status), children: n.status })
            ] }),
            /* @__PURE__ */ t("div", { className: "text-xs text-text-secondary", children: tt(n.startedAt) }),
            /* @__PURE__ */ s("div", { className: "font-mono text-xs", children: [
              ve(n.durationMs),
              " | ",
              o
            ] }),
            /* @__PURE__ */ s("div", { className: "text-[11px] text-text-tertiary", children: [
              "Trigger: ",
              n.triggeredBy.userId ?? n.triggeredBy.triggerType
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ s(
      "div",
      {
        className: "flex items-center gap-4 rounded-md bg-surface-inset px-3.5 py-2.5",
        "data-testid": "diff-duration-delta",
        children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Duration delta" }),
          /* @__PURE__ */ t(
            "span",
            {
              className: I(
                "font-mono text-sm font-bold",
                d === 0 ? "text-text-secondary" : d < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
              ),
              children: Yl(d)
            }
          ),
          /* @__PURE__ */ s("span", { className: "text-[11px] text-text-tertiary", children: [
            "(",
            d < 0 ? "faster" : d > 0 ? "slower" : "same",
            " in Run B)"
          ] })
        ]
      }
    )
  ] });
}
function Ql(e) {
  return e === 0 ? "0ms" : `${e > 0 ? "+" : "-"}${ve(Math.abs(e))}`;
}
function On(e) {
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
function Zl(e, n) {
  if (!e) return n;
  const r = e.nodes.find((o) => o.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function ec(e, n, r) {
  const o = /* @__PURE__ */ new Set(), a = [];
  if (r)
    for (const i of r.nodes)
      (e.steps[i.id] || n.steps[i.id]) && (a.push(i.id), o.add(i.id));
  for (const i of [...Object.keys(e.steps), ...Object.keys(n.steps)])
    o.has(i) || (a.push(i), o.add(i));
  return a.map((i) => {
    const d = e.steps[i], c = n.steps[i], l = d?.durationMs, p = c?.durationMs, m = l != null && p != null ? p - l : void 0, x = !!d && !!c && d.status !== c.status, f = !!d && !c, h = !d && !!c, g = d?.llm ? d.llm.tokensIn + d.llm.tokensOut : void 0, u = c?.llm ? c.llm.tokensIn + c.llm.tokensOut : void 0, y = g != null && u != null ? u - g : void 0;
    return {
      nodeId: i,
      name: Zl(r, i),
      a: d,
      b: c,
      durationDelta: m,
      statusDiffers: x,
      onlyInA: f,
      onlyInB: h,
      tokenDelta: y
    };
  });
}
function tc({ runA: e, runB: n, def: r }) {
  const o = L(() => ec(e, n, r), [e, n, r]);
  return /* @__PURE__ */ s("table", { className: "w-full border-collapse text-[13px]", children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ s("tr", { children: [
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Step" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run A" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Run B" }),
      /* @__PURE__ */ t("th", { className: "border-b border-border bg-surface-inset px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: "Delta" })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: o.map((a) => /* @__PURE__ */ s(
      "tr",
      {
        className: I(
          a.onlyInA || a.onlyInB ? "bg-[#fefce8]" : a.statusDiffers ? "bg-[#fef2f2]" : void 0
        ),
        "data-testid": `diff-step-row-${a.nodeId}`,
        children: [
          /* @__PURE__ */ s("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: [
            /* @__PURE__ */ t("div", { className: "font-semibold", children: a.name }),
            /* @__PURE__ */ t("div", { className: "font-mono text-[10px] text-text-tertiary", children: a.nodeId }),
            a.onlyInA && /* @__PURE__ */ t(ne, { tone: "warning", size: "xs", children: "only in A" }),
            a.onlyInB && /* @__PURE__ */ t(ne, { tone: "warning", size: "xs", children: "only in B" })
          ] }),
          /* @__PURE__ */ t("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: a.a ? /* @__PURE__ */ s("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ t(ne, { tone: On(a.a.status), children: a.a.status }),
            /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: ve(a.a.durationMs) }),
            a.a.llm && /* @__PURE__ */ s("span", { className: "text-[10px] text-text-tertiary", children: [
              a.a.llm.tokensIn,
              " in / ",
              a.a.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ t("td", { className: "border-b border-border px-3 py-2.5 align-top text-xs text-text-primary", children: a.b ? /* @__PURE__ */ s("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ t(ne, { tone: On(a.b.status), children: a.b.status }),
            /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-secondary", children: ve(a.b.durationMs) }),
            a.b.llm && /* @__PURE__ */ s("span", { className: "text-[10px] text-text-tertiary", children: [
              a.b.llm.tokensIn,
              " in / ",
              a.b.llm.tokensOut,
              " out"
            ] })
          ] }) : /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "(not run)" }) }),
          /* @__PURE__ */ s("td", { className: "border-b border-border px-3 py-2.5 align-top font-mono text-xs text-text-primary", children: [
            a.statusDiffers && /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-[#dc2626]", children: "status differs" }),
            a.durationDelta != null && /* @__PURE__ */ t(
              "div",
              {
                className: I(
                  "text-xs",
                  a.durationDelta === 0 ? "text-text-tertiary" : a.durationDelta < 0 ? "text-[#16a34a]" : "text-[#dc2626]"
                ),
                children: Ql(a.durationDelta)
              }
            ),
            a.tokenDelta != null && a.tokenDelta !== 0 && /* @__PURE__ */ s(
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
            a.durationDelta == null && !a.statusDiffers && /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "--" })
          ] })
        ]
      },
      a.nodeId
    )) })
  ] });
}
function nc(e, n) {
  if (!e) return n;
  const r = e.nodes.find((o) => o.id === n);
  return r ? r.data.type === "condition" && r.data.label ? r.data.label : r.type.charAt(0).toUpperCase() + r.type.slice(1) : n;
}
function It(e, n = "", r = 0) {
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
        const d = n ? `${n}.${i}` : String(i);
        for (const [c, l] of It(e[i], d, r + 1))
          o.set(c, l);
      }
    return o;
  }
  const a = Object.entries(e);
  if (a.length === 0)
    o.set(n || "(root)", "{}");
  else
    for (const [i, d] of a) {
      const c = n ? `${n}.${i}` : i;
      for (const [l, p] of It(d, c, r + 1))
        o.set(l, p);
    }
  return o;
}
function cr(e, n) {
  const r = It(e), o = It(n), a = /* @__PURE__ */ new Set([...r.keys(), ...o.keys()]), i = [];
  for (const c of a) {
    const l = r.get(c), p = o.get(c);
    l === void 0 ? i.push({ key: c, type: "added", valueB: p }) : p === void 0 ? i.push({ key: c, type: "removed", valueA: l }) : l !== p ? i.push({ key: c, type: "changed", valueA: l, valueB: p }) : i.push({ key: c, type: "unchanged", valueA: l, valueB: p });
  }
  const d = {
    changed: 0,
    added: 1,
    removed: 2,
    unchanged: 3
  };
  return i.sort((c, l) => {
    const p = d[c.type] - d[l.type];
    return p !== 0 ? p : c.key.localeCompare(l.key);
  }), i;
}
const rc = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function oc({
  nodeId: e,
  name: n,
  outputA: r,
  outputB: o
}) {
  const [a, i] = R(!1), d = L(() => cr(r, o), [r, o]), c = d.filter((l) => l.type !== "unchanged").length;
  return c === 0 ? /* @__PURE__ */ s("div", { className: "rounded-md bg-surface-inset px-3 py-2", children: [
    /* @__PURE__ */ t("span", { className: "text-xs font-semibold", children: n }),
    /* @__PURE__ */ t("span", { className: "ml-2 text-[11px] text-text-tertiary", children: "(no differences)" })
  ] }) : /* @__PURE__ */ s(
    "div",
    {
      className: "overflow-hidden rounded-md border border-border",
      "data-testid": `diff-output-${e}`,
      children: [
        /* @__PURE__ */ s(
          "div",
          {
            className: "flex cursor-pointer items-center gap-2 bg-surface-inset px-3 py-2",
            onClick: () => i(!a),
            children: [
              /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: a ? "▼" : "▶" }),
              /* @__PURE__ */ t("span", { className: "text-xs font-semibold", children: n }),
              /* @__PURE__ */ t("span", { className: "font-mono text-[10px] text-text-tertiary", children: e }),
              /* @__PURE__ */ s(ne, { tone: "warning", size: "xs", className: "ml-auto", children: [
                c,
                " difference",
                c === 1 ? "" : "s"
              ] })
            ]
          }
        ),
        a && /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5 px-3 py-2", children: d.filter((l) => l.type !== "unchanged").map((l, p) => /* @__PURE__ */ s(
          "div",
          {
            className: I(
              "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
              rc[l.type]
            ),
            children: [
              /* @__PURE__ */ s("span", { className: "min-w-[120px] shrink-0 font-semibold", children: [
                l.type === "added" && "+ ",
                l.type === "removed" && "- ",
                l.type === "changed" && "~ ",
                l.key
              ] }),
              l.type === "changed" && /* @__PURE__ */ s("span", { children: [
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
function sc({ runA: e, runB: n, def: r }) {
  const o = L(() => {
    const a = /* @__PURE__ */ new Set(), i = [];
    if (r)
      for (const d of r.nodes) {
        const c = e.steps[d.id]?.output != null, l = n.steps[d.id]?.output != null;
        (c || l) && (i.push(d.id), a.add(d.id));
      }
    for (const d of [...Object.keys(e.steps), ...Object.keys(n.steps)]) {
      if (a.has(d)) continue;
      const c = e.steps[d]?.output != null, l = n.steps[d]?.output != null;
      (c || l) && (i.push(d), a.add(d));
    }
    return i;
  }, [e, n, r]);
  return o.length === 0 ? /* @__PURE__ */ t("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "No step outputs to compare." }) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-3", children: o.map((a) => /* @__PURE__ */ t(
    oc,
    {
      nodeId: a,
      name: nc(r, a),
      outputA: e.steps[a]?.output,
      outputB: n.steps[a]?.output
    },
    a
  )) });
}
function ac(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function Ln(e, n) {
  const r = Object.values(e.steps).filter((o) => !!o.llm).map((o) => ({
    model: n.get(o.nodeId),
    tokensIn: o.llm?.tokensIn ?? 0,
    tokensOut: o.llm?.tokensOut ?? 0
  }));
  return gt(at(r).total);
}
function vt({
  title: e,
  defaultOpen: n = !0,
  badge: r,
  children: o,
  testId: a
}) {
  const [i, d] = R(n);
  return /* @__PURE__ */ s(
    "div",
    {
      className: "overflow-hidden rounded-lg border border-border bg-surface",
      "data-testid": a,
      children: [
        /* @__PURE__ */ s(
          "div",
          {
            className: "flex cursor-pointer select-none items-center gap-2 border-b border-border bg-surface-inset px-4 py-3",
            onClick: () => d(!i),
            role: "button",
            tabIndex: 0,
            onKeyDown: (c) => {
              (c.key === "Enter" || c.key === " ") && (c.preventDefault(), d(!i));
            },
            "aria-expanded": i,
            children: [
              /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary", children: i ? "▼" : "▶" }),
              /* @__PURE__ */ t("span", { className: "text-[13px] font-bold text-text-primary", children: e }),
              r && /* @__PURE__ */ t(ne, { tone: "info", className: "ml-auto", children: r })
            ]
          }
        ),
        i && /* @__PURE__ */ t("div", { className: "p-4", children: o })
      ]
    }
  );
}
const ic = {
  added: "bg-[#f0fdf4] text-[#166534]",
  removed: "bg-[#fef2f2] text-[#991b1b] line-through",
  changed: "bg-[#fffbeb] text-[#92400e]",
  unchanged: "text-text-tertiary"
};
function lc({
  runA: e,
  runB: n
}) {
  const r = L(
    () => cr(e.context, n.context),
    [e.context, n.context]
  ), o = r.filter((a) => a.type !== "unchanged").length;
  return /* @__PURE__ */ t(
    vt,
    {
      title: "Context evolution diff",
      defaultOpen: !1,
      badge: o > 0 ? `${o} difference${o === 1 ? "" : "s"}` : void 0,
      testId: "diff-context-section",
      children: o === 0 ? /* @__PURE__ */ t("div", { className: "p-4 text-center text-xs text-text-tertiary", children: "Final contexts are identical." }) : /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: r.map((a, i) => /* @__PURE__ */ s(
        "div",
        {
          className: I(
            "flex items-baseline gap-2 rounded-sm px-2 py-0.5 font-mono text-[11px]",
            ic[a.type]
          ),
          children: [
            /* @__PURE__ */ s("span", { className: "min-w-[160px] shrink-0 font-semibold", children: [
              a.type === "added" && "+ ",
              a.type === "removed" && "- ",
              a.type === "changed" && "~ ",
              a.type === "unchanged" && "  ",
              a.key
            ] }),
            a.type === "changed" && /* @__PURE__ */ s("span", { children: [
              /* @__PURE__ */ t("span", { className: "line-through opacity-70", children: a.valueA }),
              " -> ",
              /* @__PURE__ */ t("span", { className: "font-semibold", children: a.valueB })
            ] }),
            a.type === "added" && /* @__PURE__ */ t("span", { children: a.valueB }),
            a.type === "removed" && /* @__PURE__ */ t("span", { children: a.valueA }),
            a.type === "unchanged" && /* @__PURE__ */ t("span", { className: "opacity-50", children: a.valueA })
          ]
        },
        `${a.key}-${i}`
      )) })
    }
  );
}
function cc({ pipelineId: e, runIdA: n, runIdB: r }) {
  const o = Pe(), a = L(
    () => Xe(e),
    [e]
  ), i = L(
    () => kt(e, n),
    [e, n]
  ), d = L(
    () => kt(e, r),
    [e, r]
  ), c = L(() => ac(a), [a]);
  if (!a)
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
  if (!i || !d)
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
  const l = Ln(i, c), p = Ln(d, c);
  return /* @__PURE__ */ s(
    "div",
    {
      className: "mx-auto flex w-full max-w-[1400px] flex-col gap-5 p-6 text-text-primary",
      "data-testid": "pipeline-run-diff",
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ s(
            "button",
            {
              type: "button",
              onClick: () => o(`/pipelines/${e}/runs`),
              className: "cursor-pointer border-none bg-transparent p-0 text-[13px] text-primary",
              children: [
                "← ",
                a.name
              ]
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "/" }),
          /* @__PURE__ */ t("span", { className: "text-lg font-bold text-text-primary", children: "Diff view" }),
          /* @__PURE__ */ s("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
            n.slice(0, 8),
            " vs ",
            r.slice(0, 8)
          ] })
        ] }),
        /* @__PURE__ */ t(vt, { title: "Summary", testId: "diff-summary-section", children: /* @__PURE__ */ t(
          Xl,
          {
            runA: i,
            runB: d,
            costA: l,
            costB: p
          }
        ) }),
        /* @__PURE__ */ t(
          vt,
          {
            title: "Step-by-step comparison",
            badge: `${Object.keys(i.steps).length + Object.keys(d.steps).length > 0 ? "steps" : "0 steps"}`,
            testId: "diff-steps-section",
            children: /* @__PURE__ */ t(tc, { runA: i, runB: d, def: a })
          }
        ),
        /* @__PURE__ */ t(
          vt,
          {
            title: "Output diff",
            defaultOpen: !1,
            testId: "diff-output-section",
            children: /* @__PURE__ */ t(sc, { runA: i, runB: d, def: a })
          }
        ),
        /* @__PURE__ */ t(lc, { runA: i, runB: d })
      ]
    }
  );
}
function xd() {
  const { pipelineId: e } = rt(), [n] = St(), r = n.get("a"), o = n.get("b");
  return !e || !r || !o ? /* @__PURE__ */ t(ot, { to: "/pipelines", replace: !0 }) : /* @__PURE__ */ t(cc, { pipelineId: e, runIdA: r, runIdB: o });
}
function gd() {
  const e = Pe(), [n, r] = St(), [o, a] = R([]), { runs: i } = st();
  q(() => {
    let v = !1;
    return (async () => {
      const C = on(), b = [];
      await Promise.all(
        C.map(async (w) => {
          try {
            const { runs: k } = await Hn(w.id, { limit: 50 });
            if (k.length > 0) {
              for (const $ of k)
                $.id && b.push({ ...$, pipelineName: w.name });
              return;
            }
          } catch {
          }
          for (const k of wt(w.id))
            k.id && b.push({ ...k, pipelineName: w.name });
        })
      ), !v && (b.sort((w, k) => k.startedAt.localeCompare(w.startedAt)), a(b));
    })(), () => {
      v = !0;
    };
  }, []);
  const d = L(() => {
    const v = new Map(on().map((w) => [w.id, w.name])), C = new Set(o.map((w) => w.id)), b = [];
    for (const [w, k] of Object.entries(i))
      C.has(w) || k.pipelineId && b.push({
        ...k,
        pipelineName: v.get(k.pipelineId) ?? `Pipeline ${k.pipelineId.slice(0, 8)}`
      });
    return b.length === 0 ? o : [...b, ...o].sort((w, k) => k.startedAt.localeCompare(w.startedAt));
  }, [o, i]), { query: c, statuses: l, triggerKinds: p, range: m } = L(
    () => ir(n),
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
  }, y = L(
    () => ar(d, { query: c, statuses: l, triggerKinds: p, range: m }),
    [d, c, l, p, m]
  ), N = L(() => {
    const v = {};
    for (const C of y) {
      const b = Object.values(C.steps).filter((k) => !!k.llm).map((k) => ({
        model: void 0,
        tokensIn: k.llm?.tokensIn ?? 0,
        tokensOut: k.llm?.tokensOut ?? 0
      })), w = at(b);
      w.total.totalCostUsd > 0 && (v[C.id] = gt(w.total));
    }
    return v;
  }, [y]);
  return /* @__PURE__ */ s("div", { "data-testid": "all-runs-page", className: "p-6 flex flex-col gap-3", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ t("h2", { className: "m-0 text-[22px] font-bold text-text-primary", children: "Runs" }),
      /* @__PURE__ */ s("span", { className: "text-[13px] text-text-tertiary", children: [
        y.length,
        " run",
        y.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ t(
      lr,
      {
        query: c,
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
    ) : /* @__PURE__ */ t("div", { className: "overflow-x-auto", children: /* @__PURE__ */ s("table", { className: "w-full border-collapse text-[13px]", children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ s("tr", { className: "border-b border-border", children: [
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Pipeline" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Run ID" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Status" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Trigger" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-left", children: "Started" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right", children: "Duration" }),
        /* @__PURE__ */ t("th", { className: "px-3 py-2.5 text-xs text-text-secondary font-semibold text-right", children: "Cost" })
      ] }) }),
      /* @__PURE__ */ t("tbody", { children: y.map((v) => /* @__PURE__ */ s(
        "tr",
        {
          onClick: () => e(`/pipelines/${v.pipelineId}/runs/${v.id}`),
          className: "border-b border-border cursor-pointer hover:bg-surface-hover",
          children: [
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-medium", children: v.pipelineName }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary font-mono", children: v.id.slice(0, 11) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: /* @__PURE__ */ t(ne, { tone: Zt(v.status).tone, size: "sm", children: v.status }) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: v.triggerType ?? v.triggeredBy?.triggerType }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary", children: ti(v.startedAt) }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: v.completedAt ? ve(new Date(v.completedAt).getTime() - new Date(v.startedAt).getTime()) : "—" }),
            /* @__PURE__ */ t("td", { className: "px-3 py-2.5 text-xs text-text-secondary text-right font-mono", children: N[v.id] ?? "—" })
          ]
        },
        v.id
      )) })
    ] }) })
  ] });
}
function dr(e) {
  let n = 0, r = 0;
  for (const o of Object.values(e.steps ?? {}))
    o.llm && (n += o.llm.tokensIn ?? 0, r += o.llm.tokensOut ?? 0);
  return { tokensIn: n, tokensOut: r };
}
function dc(e) {
  const n = /* @__PURE__ */ new Map();
  if (!e) return n;
  for (const r of e.nodes)
    r.data.type === "llm" && n.set(r.id, r.data.model);
  return n;
}
function pc(e, n) {
  const r = [];
  for (const o of Object.values(e.steps ?? {}))
    o.llm && r.push({
      model: n.get(o.nodeId),
      tokensIn: o.llm.tokensIn,
      tokensOut: o.llm.tokensOut
    });
  return at(r).total.totalCostUsd;
}
function _n(e, n) {
  if (e.length === 0) return 0;
  const r = Math.min(e.length - 1, Math.floor(e.length * n));
  return e[r];
}
function Un(e) {
  return e < 0.01 ? `$${e.toFixed(4)}` : e < 1 ? `$${e.toFixed(3)}` : `$${e.toFixed(2)}`;
}
function Bn(e) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? `$${n.toFixed(4).replace(/\.?0+$/, "")}` : "$0";
}
function uc(e) {
  return e.slice(0, 8);
}
function mc(e) {
  const n = Date.now() - new Date(e).getTime();
  return n < 6e4 ? "just now" : n < 36e5 ? `${Math.floor(n / 6e4)}m ago` : n < 864e5 ? `${Math.floor(n / 36e5)}h ago` : n < 2592e5 ? `${Math.floor(n / 864e5)}d ago` : new Date(e).toLocaleDateString();
}
function fc(e, n) {
  const r = e.length;
  let o = 0, a = 0, i = 0;
  const d = [];
  let c = 0, l = 0, p = 0;
  const m = /* @__PURE__ */ new Map();
  for (const u of e) {
    u.status === "completed" ? o++ : u.status === "failed" ? a++ : u.status === "cancelled" && i++, typeof u.durationMs == "number" && u.durationMs > 0 && d.push(u.durationMs);
    const y = dr(u);
    if (c += y.tokensIn, l += y.tokensOut, p += pc(u, n), u.error?.message) {
      const N = u.error.message.slice(0, 48), v = m.get(N);
      v ? (v.count += 1, u.startedAt > v.lastSeenAt && (v.lastSeenAt = u.startedAt, v.exampleRunId = u.id)) : m.set(N, { count: 1, lastSeenAt: u.startedAt, exampleRunId: u.id });
    }
  }
  d.sort((u, y) => u - y);
  const x = _n(d, 0.5), f = _n(d, 0.95), h = r === 0 ? 0 : Math.round(o / r * 100), g = [...m.entries()].map(([u, y]) => ({ key: u, count: y.count, lastSeenAt: y.lastSeenAt, exampleRunId: y.exampleRunId })).sort((u, y) => y.count - u.count).slice(0, 5);
  return {
    totalCount: r,
    completedCount: o,
    failedCount: a,
    cancelledCount: i,
    successRatePct: h,
    medianMs: x,
    p95Ms: f,
    tokensIn: c,
    tokensOut: l,
    tokensPerRun: r === 0 ? 0 : Math.round((c + l) / r),
    totalCost: p,
    costPerRun: r === 0 ? 0 : p / r,
    failureBreakdown: g
  };
}
function hc(e) {
  return e >= 90 ? "#16a34a" : e >= 70 ? "#f59e0b" : "#dc2626";
}
function xc(e) {
  const n = [...e].sort((l, p) => l.startedAt.localeCompare(p.startedAt)), r = [], o = [], a = [];
  let i = 0, d = 0, c = 0;
  for (const l of n) {
    const p = new Date(l.startedAt).getTime();
    l.status === "completed" ? i += 1 : l.status === "failed" ? d += 1 : l.status === "cancelled" && (c += 1), r.push({ x: p, y: i }), o.push({ x: p, y: d }), a.push({ x: p, y: c });
  }
  return [
    { label: "Completed", data: r, color: "#16a34a" },
    { label: "Failed", data: o, color: "#dc2626" },
    { label: "Cancelled", data: a, color: "#d1d5db" }
  ];
}
function gc(e, n) {
  const o = [...e].sort((i, d) => i.startedAt.localeCompare(d.startedAt)).filter((i) => typeof i.durationMs == "number" && i.durationMs > 0).map((i) => ({ x: new Date(i.startedAt).getTime(), y: i.durationMs })), a = o.map((i) => ({ x: i.x, y: n }));
  return [
    { label: "Duration (ms)", data: o, color: "#646cff" },
    { label: "p50", data: a, color: "#94a3b8" }
  ];
}
function bc(e) {
  const n = [...e].sort((a, i) => a.startedAt.localeCompare(i.startedAt)), r = [], o = [];
  for (const a of n) {
    const i = new Date(a.startedAt).getTime(), { tokensIn: d, tokensOut: c } = dr(a);
    r.push({ x: i, y: d }), o.push({ x: i, y: c });
  }
  return [
    { label: "Tokens in", data: r, color: "#646cff" },
    { label: "Tokens out", data: o, color: "#16a34a" }
  ];
}
function bd() {
  const { pipelineId: e } = rt(), n = Pe(), [r, o] = R(null), [a, i] = R([]), [d, c] = R("50");
  q(() => {
    e && (o(Xe(e)), i(wt(e)));
  }, [e]);
  const l = L(() => {
    if (d === "all") return a;
    const u = Number(d);
    return a.slice(0, u);
  }, [a, d]), p = L(() => dc(r), [r]), m = L(() => fc(l, p), [l, p]), x = L(
    () => tl(l, r).filter((u) => u.totalCostUsd > 0 || u.stepCount > 0),
    [l, r]
  ), f = L(() => ol(a, r, 30), [a, r]), h = L(
    () => [
      {
        label: "Daily spend",
        data: f.map((u) => ({ x: u.ts, y: u.totalCostUsd })),
        color: "#646cff"
      }
    ],
    [f]
  );
  if (!e) return /* @__PURE__ */ t(ot, { to: "/pipelines", replace: !0 });
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
  return /* @__PURE__ */ s("div", { className: "p-6 flex flex-col gap-4", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ s(
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
              onClick: () => c(u),
              className: I(
                "px-2.5 py-1 text-xs font-medium rounded cursor-pointer font-[inherit]",
                d === u ? "border border-primary bg-primary text-white" : "border border-border bg-surface text-text-secondary"
              ),
              children: u === "all" ? "All" : `Last ${u}`
            },
            u
          ))
        }
      )
    ] }),
    g ? /* @__PURE__ */ s(V, { children: [
      /* @__PURE__ */ s(
        "div",
        {
          className: "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3",
          "data-testid": "stats-kpis",
          children: [
            /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Success rate" }),
              /* @__PURE__ */ s(
                "div",
                {
                  className: "text-[22px] font-bold font-mono",
                  style: { color: hc(m.successRatePct) },
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
              /* @__PURE__ */ s("div", { className: "text-xs text-text-tertiary font-mono", children: [
                m.failedCount,
                " failed · ",
                m.cancelledCount,
                " cancelled"
              ] })
            ] }),
            /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Median duration" }),
              /* @__PURE__ */ t("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: ve(m.medianMs) }),
              /* @__PURE__ */ s("div", { className: "text-xs text-text-tertiary font-mono", children: [
                "p95 · ",
                ve(m.p95Ms)
              ] })
            ] }),
            /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Total tokens" }),
              /* @__PURE__ */ s("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: [
                m.tokensIn.toLocaleString(),
                " → ",
                m.tokensOut.toLocaleString()
              ] }),
              /* @__PURE__ */ s("div", { className: "text-xs text-text-tertiary font-mono", children: [
                m.tokensPerRun.toLocaleString(),
                " avg per run"
              ] })
            ] }),
            /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-secondary uppercase tracking-[0.04em]", children: "Total cost" }),
              /* @__PURE__ */ t("div", { className: "text-[22px] font-bold text-text-primary font-mono", children: Un(m.totalCost) }),
              /* @__PURE__ */ s("div", { className: "text-xs text-text-tertiary font-mono", children: [
                Un(m.costPerRun),
                " avg per run"
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ s(
        "div",
        {
          className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3",
          "data-testid": "stats-cost-row",
          children: [
            /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-by-node", children: [
              /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Cost by node" }),
              x.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary py-2", children: "No per-node cost data in this range." }) : /* @__PURE__ */ t(
                Gr,
                {
                  data: x.map((u) => ({
                    label: u.label,
                    cost: Number(u.totalCostUsd.toFixed(6))
                  })),
                  xKey: "label",
                  yKey: "cost",
                  height: 200,
                  color: "#646cff",
                  yFormat: Bn
                }
              )
            ] }),
            /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-cost-trend-30d", children: [
              /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "30-day spend trend" }),
              /* @__PURE__ */ t(
                yt,
                {
                  series: h,
                  height: 200,
                  xFormat: (u) => new Date(Number(u)).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric"
                  }),
                  yFormat: Bn
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ s("div", { className: "grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-3", children: [
        /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Runs over time (cumulative)" }),
          /* @__PURE__ */ t(
            yt,
            {
              series: xc(l),
              height: 180,
              xFormat: (u) => new Date(Number(u)).toLocaleDateString()
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Duration over time" }),
          /* @__PURE__ */ t(
            yt,
            {
              series: gc(l, m.medianMs),
              height: 180,
              xFormat: (u) => new Date(Number(u)).toLocaleDateString(),
              yFormat: (u) => ve(u)
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Token usage over time" }),
          /* @__PURE__ */ t(
            yt,
            {
              series: bc(l),
              height: 180,
              xFormat: (u) => new Date(Number(u)).toLocaleDateString(),
              yFormat: (u) => u.toLocaleString()
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { className: "bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 min-w-0", "data-testid": "stats-failure-breakdown", children: [
          /* @__PURE__ */ t("div", { className: "text-[13px] font-semibold text-text-primary", children: "Failure breakdown (top 5)" }),
          m.failureBreakdown.length === 0 ? /* @__PURE__ */ t("div", { className: "text-xs text-text-tertiary py-2", children: "No failures in this range." }) : /* @__PURE__ */ s("table", { className: "w-full border-collapse text-xs", children: [
            /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { className: "text-left", children: ["Error", "Count", "Last seen", "Example"].map((u) => /* @__PURE__ */ t(
              "th",
              {
                className: "px-2 py-1.5 text-[10px] font-semibold text-text-secondary uppercase tracking-[0.04em] border-b border-border",
                children: u
              },
              u
            )) }) }),
            /* @__PURE__ */ t("tbody", { children: m.failureBreakdown.map((u) => /* @__PURE__ */ s("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ t(
                "td",
                {
                  className: "px-2 py-1.5 text-text-primary max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap",
                  title: u.key,
                  children: u.key
                }
              ),
              /* @__PURE__ */ t("td", { className: "px-2 py-1.5 font-mono text-text-primary", children: u.count }),
              /* @__PURE__ */ t("td", { className: "px-2 py-1.5 text-text-secondary", children: mc(u.lastSeenAt) }),
              /* @__PURE__ */ t("td", { className: "px-2 py-1.5", children: /* @__PURE__ */ s(
                "button",
                {
                  type: "button",
                  onClick: () => n(`/pipelines/${e}/runs/${u.exampleRunId}`),
                  className: "bg-transparent border-none text-primary cursor-pointer text-xs font-mono p-0",
                  children: [
                    uc(u.exampleRunId),
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
function yc(e) {
  const n = new Date(e).getTime();
  if (!Number.isFinite(n) || n <= 0) return "—";
  const r = Math.floor((Date.now() - n) / 1e3);
  if (r < 10) return "just now";
  if (r < 60) return `${r}s ago`;
  const o = Math.floor(r / 60);
  if (o < 60) return `${o}m ago`;
  const a = Math.floor(o / 60);
  return a < 24 ? `${a}h ago` : `${Math.floor(a / 24)}d ago`;
}
function vc(e) {
  return e.length <= 6 ? e : e.slice(-6);
}
function Nc({ approver: e, idx: n }) {
  const r = e.type === "role" ? "🎖" : "👤";
  return /* @__PURE__ */ s(
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
function wc(e, n) {
  const r = [];
  if (e) {
    const o = e.steps;
    for (const [a, i] of Object.entries(e))
      a === "steps" || i == null || i === "" || (typeof i == "string" ? r.push({ label: a, value: i }) : typeof i == "object" && r.push({ label: a, value: JSON.stringify(i, null, 2) }));
    if (o && typeof o == "object")
      for (const [a, i] of Object.entries(o)) {
        if (i == null) continue;
        const d = i;
        typeof d.response == "string" && d.response.trim() && r.push({ label: `Step ${a.slice(0, 8)} response`, value: d.response });
      }
  }
  if (r.length === 0 && n)
    for (const [o, a] of Object.entries(n)) {
      const i = a.output;
      if (i)
        for (const [d, c] of Object.entries(i))
          c == null || c === "" || d === "tokensIn" || d === "tokensOut" || typeof c == "string" && c.trim() && r.push({ label: d, value: c });
    }
  return r;
}
function kc({ row: e, onSubmit: n, onOpenPipeline: r }) {
  const [o, a] = R(""), i = M(
    (p) => {
      n(p, o.trim()), a("");
    },
    [o, n]
  ), d = e.requiredCount ?? 1, c = e.recordedCount ?? 0, l = L(() => wc(e.runContext, e.runSteps), [e.runContext, e.runSteps]);
  return /* @__PURE__ */ s("div", { "data-testid": `approval-card-${e.runId}`, className: "flex flex-col gap-3 p-4 bg-surface border border-border rounded-[10px]", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 min-w-0", children: [
        /* @__PURE__ */ t("span", { className: "text-lg", "aria-hidden": !0, children: "✋" }),
        /* @__PURE__ */ s("div", { className: "min-w-0", children: [
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
          /* @__PURE__ */ s("div", { className: "font-mono text-[11px] text-text-tertiary", children: [
            "run #",
            vc(e.runId)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("span", { className: "text-xs text-text-tertiary whitespace-nowrap", children: yc(e.requestedAt) })
    ] }),
    e.message ? /* @__PURE__ */ t("div", { "data-testid": `approval-message-${e.runId}`, className: "text-[13px] text-text-secondary bg-[#fafbfc] px-3 py-2 rounded-md leading-normal", children: e.message }) : null,
    /* @__PURE__ */ s("div", { className: "flex flex-col gap-1.5 px-3 py-2.5 bg-[#fafbfc] rounded-md border border-border", children: [
      /* @__PURE__ */ t("div", { className: "text-[11px] font-semibold text-text-tertiary uppercase tracking-[0.5px]", children: l.length > 0 ? "Context" : "Run details" }),
      l.length > 0 ? l.map(({ label: p, value: m }) => /* @__PURE__ */ s("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: p }),
        /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: m })
      ] }, p)) : /* @__PURE__ */ s(V, { children: [
        /* @__PURE__ */ s("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: "Run" }),
          /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: e.runId })
        ] }),
        /* @__PURE__ */ s("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: "Step" }),
          /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: e.stepId })
        ] }),
        /* @__PURE__ */ s("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ t("div", { className: "text-[11px] font-medium text-text-secondary", children: "Status" }),
          /* @__PURE__ */ t("pre", { className: "m-0 text-xs leading-normal text-text-primary whitespace-pre-wrap break-words font-[inherit] max-h-[120px] overflow-auto", children: "Awaiting your approval — upstream steps haven't produced reviewable output yet (or this approval node runs in parallel with them)." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex flex-wrap gap-1.5 items-center", children: [
      /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary mr-1", children: "Approvers:" }),
      e.approvers.length === 0 ? /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "(anyone)" }) : e.approvers.map((p, m) => /* @__PURE__ */ t(Nc, { approver: p, idx: m }, m)),
      d > 1 ? /* @__PURE__ */ s("span", { className: "text-[11px] text-text-tertiary ml-1", children: [
        "(",
        c,
        "/",
        d,
        " approvals)"
      ] }) : null
    ] }),
    /* @__PURE__ */ t(
      "textarea",
      {
        "data-testid": `approval-comment-${e.runId}`,
        value: o,
        onChange: (p) => a(p.target.value),
        placeholder: "Optional comment…",
        rows: 2,
        className: "w-full px-3 py-2 text-[13px] font-[inherit] border border-border-field rounded-md bg-[#f9fafb] text-text-primary outline-none resize-y"
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex gap-2 justify-end", children: [
      /* @__PURE__ */ t("button", { "data-testid": `reject-${e.runId}`, onClick: () => i("reject"), className: "px-3.5 py-1.5 text-[13px] font-semibold bg-[#dc2626] text-white border-none rounded-md font-[inherit] cursor-pointer", children: "Reject" }),
      /* @__PURE__ */ t("button", { "data-testid": `approve-${e.runId}`, onClick: () => i("approve"), className: "px-3.5 py-1.5 text-[13px] font-semibold bg-[#16a34a] text-white border-none rounded-md font-[inherit] cursor-pointer shrink-0", children: "Approve" })
    ] })
  ] });
}
function yd() {
  const e = Pe(), { approvals: n, isLoading: r, error: o, retry: a } = $r(), { resolveApproval: i, runs: d } = st(), [c, l] = R(
    () => /* @__PURE__ */ new Set()
  );
  q(() => {
    if (c.size === 0) return;
    const u = new Set(n.map((v) => `${v.runId}::${v.stepId}`));
    let y = !1;
    const N = new Set(c);
    for (const v of c)
      u.has(v) || (N.delete(v), y = !0);
    y && l(N);
  }, [n, c]);
  const [p, m] = R({}), x = te(/* @__PURE__ */ new Set());
  q(() => {
    for (const u of n)
      x.current.has(u.runId) || (x.current.add(u.runId), Dr(u.pipelineId, u.runId).then((y) => {
        y && m((N) => ({
          ...N,
          [u.runId]: { context: y.context, steps: y.steps }
        }));
      }));
  }, [n]);
  const f = L(() => {
    const u = /* @__PURE__ */ new Map(), y = [];
    for (const N of n) {
      const v = `${N.runId}::${N.stepId}`;
      if (c.has(v)) continue;
      let C = u.get(N.pipelineId);
      C === void 0 && (C = Xe(N.pipelineId), u.set(N.pipelineId, C));
      const b = C?.name ?? (N.pipelineId ? `Pipeline ${N.pipelineId.slice(0, 8)}` : "Unknown pipeline"), w = p[N.runId]?.context ?? d[N.runId]?.context, k = p[N.runId]?.steps;
      y.push({ ...N, pipelineName: b, runContext: w, runSteps: k });
    }
    return y;
  }, [n, c, d, p]), h = M(
    (u, y, N, v, C) => {
      i(y, N, v, C || void 0), l((b) => {
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
    [i, e]
  ), g = f.length;
  return /* @__PURE__ */ s("div", { "data-testid": "pending-approvals-page", className: "flex flex-col h-full overflow-hidden bg-[#fafbfc] font-[inherit]", children: [
    /* @__PURE__ */ t("div", { className: "h-14 shrink-0 flex items-center justify-between px-6 border-b border-border bg-surface sticky top-0 z-[2]", children: /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ t("div", { className: "text-lg font-bold text-text-primary", children: "Pending approvals" }),
      /* @__PURE__ */ t(ne, { "data-testid": "pending-count", tone: g > 0 ? "warning" : "neutral", size: "sm", children: g })
    ] }) }),
    /* @__PURE__ */ s("div", { className: "flex-1 overflow-y-auto p-5", children: [
      o ? /* @__PURE__ */ s("div", { "data-testid": "approvals-error", role: "alert", className: "px-4 py-3 bg-[#fef2f2] border border-[#dc2626] text-[#dc2626] rounded-lg flex items-center justify-between gap-3 mb-4", children: [
        /* @__PURE__ */ t("span", { className: "text-[13px] font-medium", children: "Couldn't load pending approvals. Try again." }),
        /* @__PURE__ */ t("button", { "data-testid": "approvals-retry", onClick: a, className: "px-3.5 py-1.5 text-[13px] font-medium bg-white text-[#dc2626] border border-[#dc2626] rounded-md cursor-pointer font-[inherit]", children: "Retry" })
      ] }) : null,
      r && g === 0 ? /* @__PURE__ */ s("div", { "data-testid": "approvals-loading", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: [
        /* @__PURE__ */ t(Rt, { height: 140 }),
        /* @__PURE__ */ t(Rt, { height: 140 }),
        /* @__PURE__ */ t(Rt, { height: 140 })
      ] }) : g === 0 && !o ? /* @__PURE__ */ t(
        Oe,
        {
          icon: "✋",
          title: "No pending approvals",
          body: "When a pipeline reaches an approval step, it'll show up here.",
          testId: "approvals-empty"
        }
      ) : /* @__PURE__ */ t("div", { "data-testid": "approvals-list", className: "flex flex-col gap-3 max-w-[680px] mx-auto", children: f.map((u) => /* @__PURE__ */ t(
        kc,
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
function vd({ data: e, onChange: n }) {
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ s("div", { children: [
      /* @__PURE__ */ s(
        "label",
        {
          htmlFor: "image-source-image-id",
          className: "block text-[12px] font-semibold text-[#374151]",
          children: [
            "Image ID",
            " ",
            /* @__PURE__ */ t("span", { className: "text-[#6b7280] font-normal", children: "(optional — can be set at run time)" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        Ct,
        {
          id: "image-source-image-id",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: e.imageId ?? "",
          onChange: (r) => n({ imageId: r.target.value.trim() || void 0 }),
          placeholder: "img_xxxxxxxx"
        }
      ),
      /* @__PURE__ */ t("p", { className: "mt-0.5 text-[11px] text-[#6b7280]", children: "The imageId of an image already in the blob store. Leave blank to have the trigger or a preceding step supply the image at runtime." })
    ] }),
    /* @__PURE__ */ s("div", { children: [
      /* @__PURE__ */ s(
        "label",
        {
          htmlFor: "image-source-output-key",
          className: "block text-[12px] font-semibold text-[#374151]",
          children: [
            "Output key",
            " ",
            /* @__PURE__ */ t("span", { className: "text-[#6b7280] font-normal", children: "(default: imageRef)" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        Ct,
        {
          id: "image-source-output-key",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: e.outputKey ?? "",
          onChange: (r) => n({ outputKey: r.target.value.trim() || void 0 }),
          placeholder: "imageRef"
        }
      ),
      /* @__PURE__ */ s("p", { className: "mt-0.5 text-[11px] text-[#6b7280]", children: [
        "The key written to pipeline context (accessible as",
        " ",
        /* @__PURE__ */ s("code", { children: [
          "$.trigger.",
          "<key>"
        ] }),
        " by downstream steps)."
      ] })
    ] })
  ] });
}
const Cc = [
  "$.scatter.parentImageId",
  "$.trigger.imageRef",
  "$.steps.crop.output.imageId"
], Ic = [
  "{{scatter.item.label}}",
  "{{scatter.index}}",
  "{{scatter.parentImageId}}"
];
function Fn({
  samples: e,
  onSelect: n
}) {
  return /* @__PURE__ */ t("div", { className: "mt-1.5 flex flex-wrap gap-1", children: e.map((r) => /* @__PURE__ */ t(
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
function Nd({ data: e, onChange: n }) {
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-3 px-4 py-3", children: [
    /* @__PURE__ */ s("div", { children: [
      /* @__PURE__ */ s(
        "label",
        {
          htmlFor: "save-source-image-path",
          className: "block text-[12px] font-semibold text-[#374151]",
          children: [
            "Source image path",
            " ",
            /* @__PURE__ */ t("span", { className: "text-[#6b7280] font-normal", children: "(optional)" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        Ct,
        {
          id: "save-source-image-path",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: e.sourceImagePath ?? "",
          onChange: (r) => n({ sourceImagePath: r.target.value.trim() || void 0 }),
          placeholder: "$.scatter.parentImageId"
        }
      ),
      /* @__PURE__ */ s("p", { className: "mt-0.5 text-[11px] text-[#6b7280]", children: [
        "JSONPath to the imageId to save. Defaults server-side to",
        " ",
        /* @__PURE__ */ t("code", { children: "$.scatter.parentImageId" }),
        "."
      ] }),
      /* @__PURE__ */ t(
        Fn,
        {
          samples: Cc,
          onSelect: (r) => n({ sourceImagePath: r })
        }
      )
    ] }),
    /* @__PURE__ */ s("div", { children: [
      /* @__PURE__ */ s(
        "label",
        {
          htmlFor: "save-filename-template",
          className: "block text-[12px] font-semibold text-[#374151]",
          children: [
            "Filename template",
            " ",
            /* @__PURE__ */ t("span", { className: "text-[#6b7280] font-normal", children: "(optional)" })
          ]
        }
      ),
      /* @__PURE__ */ t(
        Ct,
        {
          id: "save-filename-template",
          type: "text",
          size: "sm",
          mono: !0,
          spellCheck: !1,
          className: "mt-1",
          value: e.filenameTemplate ?? "",
          onChange: (r) => n({ filenameTemplate: r.target.value.trim() || void 0 }),
          placeholder: "crop-{{scatter.index}}.png"
        }
      ),
      /* @__PURE__ */ s("p", { className: "mt-0.5 text-[11px] text-[#6b7280]", children: [
        "Output filename. Supports",
        " ",
        /* @__PURE__ */ t("code", { children: "{{scatter.item.label}}" }),
        ",",
        " ",
        /* @__PURE__ */ t("code", { children: "{{scatter.index}}" }),
        ", and",
        " ",
        /* @__PURE__ */ t("code", { children: "{{scatter.parentImageId}}" }),
        " substitutions. Default:",
        " ",
        /* @__PURE__ */ s("code", { children: [
          "crop-",
          "{{scatter.index}}",
          ".png"
        ] }),
        "."
      ] }),
      /* @__PURE__ */ s("div", { className: "mt-1.5", children: [
        /* @__PURE__ */ t("div", { className: "text-[10px] text-[#6b7280] mb-1", children: "Quick-fill variable:" }),
        /* @__PURE__ */ t(
          Fn,
          {
            samples: Ic,
            onSelect: (r) => {
              const o = e.filenameTemplate ?? "";
              n({ filenameTemplate: o + r });
            }
          }
        )
      ] })
    ] })
  ] });
}
function Sc({ result: e, className: n }) {
  const { caption: r, setting: o, location: a, timeOfDay: i, mood: d, colors: c } = e;
  return !r && !o && !a && !i && !d && (!c || c.length === 0) ? null : /* @__PURE__ */ s("section", { className: I("flex flex-col gap-2", n), children: [
    r ? /* @__PURE__ */ t("p", { className: "text-base leading-relaxed text-text-primary", children: r }) : null,
    /* @__PURE__ */ s("div", { className: "flex flex-wrap gap-1.5", children: [
      o ? /* @__PURE__ */ s(ne, { tone: "neutral", size: "sm", title: "Scene setting", children: [
        "setting: ",
        o
      ] }) : null,
      a ? /* @__PURE__ */ s(ne, { tone: "neutral", size: "sm", title: "Location", children: [
        "loc: ",
        a
      ] }) : null,
      i ? /* @__PURE__ */ s(ne, { tone: "neutral", size: "sm", title: "Time of day", children: [
        "tod: ",
        i
      ] }) : null,
      d ? /* @__PURE__ */ s(ne, { tone: "info", size: "sm", title: "Mood", children: [
        "mood: ",
        d
      ] }) : null,
      (c ?? []).map((l) => /* @__PURE__ */ s(
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
const Tc = {
  people: { stroke: "#4f46e5", fill: "rgba(79,70,229,0.10)", text: "bg-indigo-600 text-white" },
  object: { stroke: "#d97706", fill: "rgba(217,119,6,0.10)", text: "bg-amber-600 text-white" }
};
function Ac({
  imageUrl: e,
  imageDataUrl: n,
  imageWidth: r,
  imageHeight: o,
  people: a,
  objects: i,
  show: d = "both",
  onSelectPerson: c,
  onSelectObject: l,
  className: p,
  alt: m
}) {
  const x = n ?? e, [f, h] = R(null), g = te(null), u = M(() => {
    const v = g.current;
    v && (!r || !o) && h({ w: v.naturalWidth, h: v.naturalHeight });
  }, [r, o]), y = L(() => r && o && r > 0 && o > 0 ? { w: r, h: o } : f && f.w > 0 && f.h > 0 ? f : null, [r, o, f]), N = (v, C, b, w, k) => {
    if (!y) return null;
    const $ = Math.max(0, Math.min(v.x1, y.w)), S = Math.max(0, Math.min(v.y1, y.h)), A = Math.max(0, Math.min(v.x2, y.w)), D = Math.max(0, Math.min(v.y2, y.h));
    if (!Number.isFinite($) || !Number.isFinite(S) || !Number.isFinite(A) || !Number.isFinite(D) || A <= $ || D <= S) return null;
    const H = $ / y.w * 100, G = S / y.h * 100, ee = (A - $) / y.w * 100, ie = (D - S) / y.h * 100, le = Tc[b];
    return /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: w,
        title: C,
        "aria-label": `${b === "people" ? "Person" : "Object"} bounding box: ${C}`,
        className: "group absolute m-0 cursor-pointer border-0 p-0 outline-none focus:ring-2 focus:ring-offset-1",
        style: {
          left: `${H}%`,
          top: `${G}%`,
          width: `${ee}%`,
          height: `${ie}%`,
          background: le.fill,
          border: `2px solid ${le.stroke}`,
          borderRadius: "2px"
        },
        children: /* @__PURE__ */ t(
          "span",
          {
            className: I(
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
  return x ? /* @__PURE__ */ s(
    "div",
    {
      className: I(
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
        y ? /* @__PURE__ */ t("div", { className: "pointer-events-none absolute inset-0", children: /* @__PURE__ */ s("div", { className: "pointer-events-auto absolute inset-0", children: [
          (d === "people" || d === "both") && (a ?? []).map(
            (v) => N(
              v.bbox,
              `#${v.index}${v.activity ? " · " + v.activity.replace(/^::\s*/, "") : ""}`,
              "people",
              c ? () => c(v) : void 0,
              `p-${v.index}`
            )
          ),
          (d === "objects" || d === "both") && (i ?? []).map(
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
      className: I(
        "flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-border-emphasis bg-surface-panel text-xs text-text-tertiary",
        p
      ),
      children: "(no image)"
    }
  );
}
function Rc(e) {
  return {
    imageUrl: e.imageUrl,
    imageDataUrl: e.imageDataUrl,
    imageWidth: e.imageWidth,
    imageHeight: e.imageHeight,
    people: e.people,
    objects: e.objects
  };
}
function $c({ people: e, highlightedIndex: n, onSelect: r, className: o }) {
  return !e || e.length === 0 ? null : /* @__PURE__ */ s("section", { className: I("flex flex-col gap-1.5", o), children: [
    /* @__PURE__ */ s("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "People (",
      e.length,
      ")"
    ] }),
    /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1.5", children: e.map((a) => {
      const i = n === a.index, d = a.activity?.replace(/^::\s*/, ""), c = I(
        "group flex w-full flex-col gap-1 rounded-lg border px-2.5 py-2 text-left text-sm transition-colors",
        i ? "border-indigo-400 bg-indigo-50/70 ring-1 ring-indigo-300" : "border-border bg-surface hover:bg-surface-hover"
      ), l = /* @__PURE__ */ s(V, { children: [
        /* @__PURE__ */ s("div", { className: "flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": !0,
              className: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold leading-none text-white",
              children: a.index
            }
          ),
          a.ageBucket ? /* @__PURE__ */ t(ne, { tone: "neutral", size: "sm", children: a.ageBucket.replace("_", " ") }) : null,
          a.gender ? /* @__PURE__ */ t(ne, { tone: "neutral", size: "sm", children: a.gender }) : null,
          a.faceOrientation ? /* @__PURE__ */ t(ne, { tone: "neutral", size: "sm", title: "Face orientation", children: a.faceOrientation }) : null,
          a.expression ? /* @__PURE__ */ t(ne, { tone: "info", size: "sm", children: a.expression }) : null
        ] }),
        d ? /* @__PURE__ */ s("div", { className: "text-[13px] text-text-primary", children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "activity:" }),
          " ",
          d
        ] }) : null,
        a.clothing ? /* @__PURE__ */ s("div", { className: "text-[12px] text-text-secondary", children: [
          /* @__PURE__ */ t("span", { className: "text-text-tertiary", children: "wearing:" }),
          " ",
          a.clothing
        ] }) : null
      ] });
      return r ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: () => r(a),
          className: I(
            c,
            "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          ),
          "aria-pressed": i,
          children: l
        }
      ) }, a.index) : /* @__PURE__ */ t("li", { className: c, children: l }, a.index);
    }) })
  ] });
}
function Dc({ objects: e, onSelect: n, className: r }) {
  return !e || e.length === 0 ? null : /* @__PURE__ */ s("section", { className: I("flex flex-col gap-1.5", r), children: [
    /* @__PURE__ */ s("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Objects (",
      e.length,
      ")"
    ] }),
    /* @__PURE__ */ t("ul", { className: "grid grid-cols-1 gap-1 sm:grid-cols-2", children: e.map((o, a) => {
      const i = I(
        "flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 text-left text-[13px]"
      ), d = /* @__PURE__ */ s(V, { children: [
        /* @__PURE__ */ t("span", { className: "truncate font-medium text-text-primary", children: o.label }),
        /* @__PURE__ */ s("span", { className: "shrink-0 font-mono text-[10px] text-text-tertiary", children: [
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
          className: I(
            i,
            "cursor-pointer hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          ),
          children: d
        }
      ) }, `${o.label}-${a}`) : /* @__PURE__ */ t("li", { className: i, children: d }, `${o.label}-${a}`);
    }) })
  ] });
}
function Pc({ tags: e, onTagClick: n, className: r }) {
  return !e || e.length === 0 ? null : /* @__PURE__ */ s("section", { className: I("flex flex-col gap-1.5", r), children: [
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
          children: /* @__PURE__ */ s(ne, { tone: "info", size: "sm", children: [
            "#",
            o
          ] })
        },
        o
      ) : /* @__PURE__ */ s(ne, { tone: "info", size: "sm", children: [
        "#",
        o
      ] }, o)
    ) })
  ] });
}
function Nt(e) {
  return e ? e === "correct" || e === "neutral" || e === "normal" ? "success" : "warning" : "neutral";
}
function Bt(e) {
  const n = Nt(e);
  return n === "success" ? `OK · ${e}` : n === "warning" ? `ADJUST · ${e}` : e ?? "";
}
function Mc({
  exposure: e,
  whiteBalance: n,
  contrast: r,
  composition: o,
  edits: a,
  onApplyEdit: i,
  className: d
}) {
  const c = e || n || r || o, l = (a ?? []).length > 0;
  return !c && !l ? null : /* @__PURE__ */ s("section", { className: I("flex flex-col gap-2", d), children: [
    /* @__PURE__ */ t("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: "Edits & Quality" }),
    c ? /* @__PURE__ */ s("div", { className: "grid grid-cols-1 gap-1.5 sm:grid-cols-2", children: [
      e ? /* @__PURE__ */ s("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-text-tertiary", children: "EXPOSURE" }),
          /* @__PURE__ */ t(ne, { tone: Nt(e.verdict), size: "sm", children: Bt(e.verdict) }),
          e.evAdjustment !== 0 ? /* @__PURE__ */ s("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
            e.evAdjustment > 0 ? "+" : "",
            e.evAdjustment.toFixed(1),
            " EV"
          ] }) : null
        ] }),
        /* @__PURE__ */ t("p", { className: "mt-1 text-[12px] text-text-primary", children: e.rationale })
      ] }) : null,
      n ? /* @__PURE__ */ s("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-text-tertiary", children: "WB" }),
          /* @__PURE__ */ t(ne, { tone: Nt(n.verdict), size: "sm", children: Bt(n.verdict) }),
          n.kelvinShift ? /* @__PURE__ */ s("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
            n.kelvinShift > 0 ? "+" : "",
            n.kelvinShift,
            "K"
          ] }) : null
        ] }),
        /* @__PURE__ */ t("p", { className: "mt-1 text-[12px] text-text-primary", children: n.rationale })
      ] }) : null,
      r ? /* @__PURE__ */ s("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-text-tertiary", children: "CONTRAST" }),
        /* @__PURE__ */ t("span", { className: "ml-1.5", children: /* @__PURE__ */ t(ne, { tone: Nt(r), size: "sm", children: Bt(r) }) })
      ] }) : null,
      o ? /* @__PURE__ */ s("div", { className: "rounded-lg border border-border bg-surface p-2", children: [
        /* @__PURE__ */ t("span", { className: "text-[11px] font-medium text-text-tertiary", children: "COMPOSITION" }),
        /* @__PURE__ */ t("p", { className: "mt-1 text-[12px] text-text-primary", children: o })
      ] }) : null
    ] }) : null,
    l ? /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1", children: (a ?? []).map((p, m) => /* @__PURE__ */ s(
      "li",
      {
        className: "flex items-start justify-between gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[13px]",
        children: [
          /* @__PURE__ */ t("span", { className: "flex-1 text-text-primary", children: p }),
          i ? /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => i(p),
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
function wd({
  result: e,
  showImage: n = !0,
  showCaption: r = !0,
  showPeople: o = !0,
  showObjects: a = !0,
  showTags: i = !0,
  showEdits: d = !0,
  showRawText: c = !1,
  onTagClick: l,
  onApplyEdit: p,
  className: m
}) {
  const [x, f] = R(), [h, g] = R(!1), u = (N) => f(x === N.index ? void 0 : N.index), y = Rc(e);
  return /* @__PURE__ */ s("div", { className: I("flex w-full flex-col gap-4 text-text-primary", m), children: [
    /* @__PURE__ */ s("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-12", children: [
      n ? /* @__PURE__ */ s("div", { className: "md:col-span-7", children: [
        /* @__PURE__ */ t(
          Ac,
          {
            ...y,
            onSelectPerson: u,
            alt: e.caption ?? "Vision result"
          }
        ),
        e.model ? /* @__PURE__ */ s("div", { className: "mt-2 flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
          /* @__PURE__ */ t("span", { className: "font-medium text-text-primary", children: e.model.endpointId }),
          /* @__PURE__ */ t("span", { children: "·" }),
          /* @__PURE__ */ s("span", { children: [
            "latency ",
            e.model.latencyMs,
            "ms"
          ] }),
          typeof e.model.tokensOut == "number" ? /* @__PURE__ */ s(V, { children: [
            /* @__PURE__ */ t("span", { children: "·" }),
            /* @__PURE__ */ s("span", { children: [
              e.model.tokensOut,
              " tok out"
            ] })
          ] }) : null
        ] }) : null
      ] }) : null,
      /* @__PURE__ */ s("div", { className: I("flex flex-col gap-4", n ? "md:col-span-5" : "md:col-span-12"), children: [
        r ? /* @__PURE__ */ t(Sc, { result: e }) : null,
        o && e.people && e.people.length > 0 ? /* @__PURE__ */ t(
          $c,
          {
            people: e.people,
            highlightedIndex: x,
            onSelect: u
          }
        ) : null
      ] })
    ] }),
    a && e.objects && e.objects.length > 0 ? /* @__PURE__ */ t(Dc, { objects: e.objects }) : null,
    i && e.tags && e.tags.length > 0 ? /* @__PURE__ */ t(Pc, { tags: e.tags, onTagClick: l }) : null,
    d ? /* @__PURE__ */ t(
      Mc,
      {
        exposure: e.exposure,
        whiteBalance: e.whiteBalance,
        contrast: e.contrast,
        composition: e.composition,
        edits: e.edits,
        onApplyEdit: p
      }
    ) : null,
    e.text && e.text.length > 0 ? /* @__PURE__ */ s("section", { className: "flex flex-col gap-1.5", children: [
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
    c && e.rawText ? /* @__PURE__ */ s("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          onClick: () => g((N) => !N),
          "aria-expanded": h,
          "aria-label": `${h ? "Hide" : "Show"} raw model output`,
          className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded",
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
function kd({
  status: e,
  result: n,
  runId: r,
  endpointLabel: o,
  error: a,
  latencyMs: i,
  onOpen: d,
  className: c
}) {
  const l = o ?? n?.model?.endpointId ?? "vision-model", p = i ?? n?.model?.latencyMs, m = n?.caption, x = (n?.tags ?? []).slice(0, 5), f = /* @__PURE__ */ s(V, { children: [
    /* @__PURE__ */ s("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ t("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: l }),
      e === "running" ? /* @__PURE__ */ s(ne, { tone: "info", size: "sm", children: [
        /* @__PURE__ */ t("span", { className: "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" }),
        " running"
      ] }) : e === "completed" ? /* @__PURE__ */ t(ne, { tone: "success", size: "sm", children: "ok" }) : /* @__PURE__ */ t(ne, { tone: "danger", size: "sm", children: "failed" }),
      typeof p == "number" ? /* @__PURE__ */ s("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
        p.toFixed(0),
        "ms"
      ] }) : null,
      r ? /* @__PURE__ */ t("span", { className: "ml-auto truncate font-mono text-[10px] text-text-tertiary", children: r }) : null
    ] }),
    e === "failed" && a ? /* @__PURE__ */ t("p", { className: "text-[13px] text-red-700", children: a }) : /* @__PURE__ */ t("p", { className: "line-clamp-2 text-left text-[13px] text-text-primary", children: m ?? (e === "running" ? "Analyzing image…" : "No caption produced.") }),
    x.length > 0 ? /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1", children: x.map((g) => /* @__PURE__ */ s(ne, { tone: "neutral", size: "sm", children: [
      "#",
      g
    ] }, g)) }) : null
  ] }), h = I(
    "flex w-full flex-col gap-1.5 rounded-lg border bg-surface p-3 text-sm text-left",
    e === "running" ? "border-indigo-300 ring-1 ring-indigo-200" : e === "failed" ? "border-red-300" : "border-border"
  );
  if (d) {
    const g = m ? m.slice(0, 60) : "no caption";
    return /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: d,
        "aria-label": `Open vision result: ${l}, ${e}, ${g}`,
        className: I(
          h,
          "cursor-pointer transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1",
          c
        ),
        children: f
      }
    );
  }
  return /* @__PURE__ */ t("article", { className: I(h, c), children: f });
}
function Cd(e = {}) {
  const { maxRecords: n = 50, runId: r } = e, [o, a] = R([]), i = te(/* @__PURE__ */ new Map()), d = te(!0);
  return q(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Re("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.image.vision.")) return;
    const m = l.payload;
    if (!m || typeof m.runId != "string" || typeof m.stepId != "string" || r && m.runId !== r) return;
    const x = `${m.runId}::${m.stepId}`;
    a((f) => {
      const h = i.current.get(x), g = typeof m.at == "number" ? m.at : Date.now(), u = (y) => {
        if (typeof h == "number" && h >= 0 && h < f.length) {
          const C = f.slice();
          return C[h] = { ...f[h], ...y }, C;
        }
        const N = [y, ...f];
        N.length > n && (N.length = n);
        const v = /* @__PURE__ */ new Map();
        return N.forEach((C, b) => v.set(`${C.runId}::${C.stepId}`, b)), i.current = v, N;
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
  }), L(() => o, [o]);
}
function Ec(e) {
  return e === "pass" ? "success" : e === "fail" ? "danger" : "warning";
}
function Oc({ result: e, className: n }) {
  const r = Ec(e.overallVerdict), o = r === "success" ? "PASS" : r === "danger" ? "FAIL" : "INCONCLUSIVE", a = e.rubricSnapshot.passThreshold ?? 0.5;
  return /* @__PURE__ */ s(
    "section",
    {
      className: I(
        "flex flex-col gap-2 rounded-lg border border-border bg-surface p-3",
        n
      ),
      children: [
        /* @__PURE__ */ s("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ s("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: [
            e.rubricSnapshot.id,
            " v",
            e.rubricSnapshot.version
          ] }),
          /* @__PURE__ */ s(ne, { tone: r, size: "sm", children: [
            o,
            " · ",
            e.overallVerdict
          ] }),
          /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "·" }),
          /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-text-tertiary", children: e.model }),
          /* @__PURE__ */ t("span", { className: "text-[11px] text-text-tertiary", children: "·" }),
          /* @__PURE__ */ s("span", { className: "font-mono text-[11px] text-text-tertiary", children: [
            "mode: ",
            e.mode
          ] }),
          typeof e.confidence == "number" ? /* @__PURE__ */ s("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
            "confidence ",
            (e.confidence * 100).toFixed(0),
            "%"
          ] }) : null
        ] }),
        /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium uppercase text-text-tertiary", children: "overall" }),
          /* @__PURE__ */ t(
            Vt,
            {
              value: e.overallScore,
              threshold: a,
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
function Lc({ result: e, className: n }) {
  if (!e.criteria || e.criteria.length === 0) return null;
  const r = /* @__PURE__ */ new Map();
  for (const o of e.rubricSnapshot.criteria) r.set(o.id, o);
  return /* @__PURE__ */ s("section", { className: I("flex flex-col gap-1.5", n), children: [
    /* @__PURE__ */ s("h4", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: [
      "Criteria (",
      e.criteria.length,
      ")"
    ] }),
    /* @__PURE__ */ t("ul", { className: "flex flex-col gap-1.5", children: e.criteria.map((o) => /* @__PURE__ */ t(_c, { score: o, def: r.get(o.criterionId) }, o.criterionId)) })
  ] });
}
function _c({
  score: e,
  def: n
}) {
  const r = e.passed ? "success" : "danger", o = e.passed ? "PASS" : "FAIL", a = n?.scale ?? "0-1";
  return /* @__PURE__ */ s("li", { className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2.5", children: [
    /* @__PURE__ */ s("div", { className: "flex flex-wrap items-center gap-1.5", children: [
      /* @__PURE__ */ t("span", { className: "font-mono text-[11px] font-semibold text-text-primary", children: e.criterionId }),
      /* @__PURE__ */ s("span", { className: "font-mono text-[10px] uppercase text-text-tertiary", children: [
        "[",
        a,
        "]"
      ] }),
      /* @__PURE__ */ t(ne, { tone: r, size: "sm", children: o }),
      /* @__PURE__ */ s("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
        "raw: ",
        String(e.rawScore)
      ] })
    ] }),
    /* @__PURE__ */ t(
      Vt,
      {
        value: e.score,
        threshold: n?.failThreshold ?? 0.5,
        tone: r,
        size: "sm",
        ariaLabel: `Criterion ${e.criterionId} score ${(e.score * 100).toFixed(0)}% — ${o}`
      }
    ),
    n?.prompt ? /* @__PURE__ */ s("p", { className: "text-[12px] italic leading-snug text-text-tertiary", children: [
      "“",
      n.prompt,
      "”"
    ] }) : null,
    e.rationale ? /* @__PURE__ */ t("p", { className: "text-[13px] leading-snug text-text-primary", children: e.rationale }) : null
  ] });
}
const pr = mr(null);
function Id({ value: e, children: n }) {
  return /* @__PURE__ */ t(pr.Provider, { value: e, children: n });
}
function ur() {
  return zn(pr);
}
function Sd({
  result: e,
  showVerdict: n = !0,
  showCriteria: r = !0,
  showMetadata: o = !0,
  showRawText: a = !1,
  className: i
}) {
  const d = ur(), [c, l] = R(!1), [p, m] = R(null), [x, f] = R(!1), [h, g] = R(null), u = te(!0);
  q(() => (u.current = !0, () => {
    u.current = !1;
  }), []), q(() => {
    c && (e.rawModelText || p === null && (x || e.rawTextTruncated && d && (f(!0), (async () => {
      try {
        const v = await d.fetchRawText(e.judgmentId);
        if (!u.current) return;
        m(v ?? ""), g(null);
      } catch (v) {
        if (!u.current) return;
        g(v instanceof Error ? v : new Error(String(v)));
      } finally {
        u.current && f(!1);
      }
    })())));
  }, [c, e.rawModelText, e.rawTextTruncated, e.judgmentId, d, p, x]);
  const y = e.rawModelText ?? p ?? null, N = !!e.rawModelText || !!e.rawTextTruncated;
  return /* @__PURE__ */ s("div", { className: I("flex w-full flex-col gap-3 text-text-primary", i), children: [
    n ? /* @__PURE__ */ t(Oc, { result: e }) : null,
    r ? /* @__PURE__ */ t(Lc, { result: e }) : null,
    o ? /* @__PURE__ */ s("section", { className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
      /* @__PURE__ */ s("span", { children: [
        "tokens ",
        /* @__PURE__ */ t("span", { className: "font-mono", children: e.tokensIn }),
        " in /",
        " ",
        /* @__PURE__ */ t("span", { className: "font-mono", children: e.tokensOut }),
        " out"
      ] }),
      e.cacheReadTokens && e.cacheReadTokens > 0 ? /* @__PURE__ */ s(V, { children: [
        /* @__PURE__ */ t("span", { children: "·" }),
        /* @__PURE__ */ s("span", { children: [
          "cache ",
          /* @__PURE__ */ t("span", { className: "font-mono", children: e.cacheReadTokens }),
          " read"
        ] })
      ] }) : null,
      /* @__PURE__ */ t("span", { children: "·" }),
      /* @__PURE__ */ s("span", { children: [
        "latency ",
        /* @__PURE__ */ t("span", { className: "font-mono", children: e.latencyMs }),
        "ms"
      ] }),
      /* @__PURE__ */ t("span", { children: "·" }),
      /* @__PURE__ */ s("span", { children: [
        "cost ",
        /* @__PURE__ */ s("span", { className: "font-mono", children: [
          "$",
          e.costUsd.toFixed(4)
        ] })
      ] }),
      /* @__PURE__ */ t("span", { className: "ml-auto font-mono", children: e.judgedAt })
    ] }) : null,
    a && N ? /* @__PURE__ */ s("section", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          onClick: () => l((v) => !v),
          className: "self-start text-[11px] font-medium text-text-tertiary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 rounded",
          "aria-expanded": c,
          children: [
            c ? "▾" : "▸",
            " Raw model output"
          ]
        }
      ),
      c ? /* @__PURE__ */ t(
        Uc,
        {
          text: y,
          loading: x,
          error: h,
          fallbackHint: e.rawTextTruncated && !d ? "Raw text was spilled to S3 but no JudgmentApi provider is wired." : null
        }
      ) : null
    ] }) : null
  ] });
}
function Uc({
  text: e,
  loading: n,
  error: r,
  fallbackHint: o
}) {
  return n ? /* @__PURE__ */ t("div", { className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary", children: "Loading raw text…" }) : r ? /* @__PURE__ */ s("div", { className: "rounded-lg border border-state-failed bg-danger-bg p-2 text-[11px] text-text-primary", children: [
    "Failed to fetch raw text: ",
    r.message
  ] }) : e === null || e.length === 0 ? /* @__PURE__ */ t("div", { className: "rounded-lg border border-border bg-surface-panel p-2 text-[11px] text-text-tertiary", children: o ?? "Raw text not available." }) : /* @__PURE__ */ t("pre", { className: "overflow-x-auto rounded-lg border border-border bg-surface-panel p-2 font-mono text-[11px] leading-snug text-text-secondary", children: e });
}
function Td({ aggregate: e, className: n }) {
  const r = e.numJudgments > 0 ? e.numPassed / e.numJudgments : 0, o = e.numJudgments > 0 ? e.sumOverallScore / e.numJudgments : 0, a = r >= 0.9 ? "success" : r >= 0.6 ? "warning" : "danger", i = a === "success" ? "HEALTHY" : a === "warning" ? "MIXED" : "FAILING";
  return /* @__PURE__ */ s(
    "section",
    {
      className: I(
        "flex flex-col gap-2 rounded-lg border border-border bg-surface p-3",
        n
      ),
      children: [
        /* @__PURE__ */ s("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ t("span", { className: "font-mono text-[11px] font-semibold uppercase tracking-wide text-text-secondary", children: e.dayBucket }),
          /* @__PURE__ */ s(ne, { tone: a, size: "sm", children: [
            i,
            " · ",
            (r * 100).toFixed(0),
            "% pass"
          ] }),
          /* @__PURE__ */ s("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
            e.numJudgments,
            " judgments"
          ] })
        ] }),
        /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t("span", { className: "text-[11px] font-medium uppercase text-text-tertiary", children: "mean score" }),
          /* @__PURE__ */ t(
            Vt,
            {
              value: o,
              tone: a === "warning" ? "warning" : a,
              size: "md",
              ariaLabel: `Mean score ${(o * 100).toFixed(0)}% across ${e.numJudgments} judgments`
            }
          )
        ] }),
        /* @__PURE__ */ s("div", { className: "flex flex-wrap items-center gap-2 text-[11px] text-text-tertiary", children: [
          /* @__PURE__ */ s("span", { children: [
            "tokens ",
            /* @__PURE__ */ t("span", { className: "font-mono", children: e.sumTokensIn }),
            " in /",
            " ",
            /* @__PURE__ */ t("span", { className: "font-mono", children: e.sumTokensOut }),
            " out"
          ] }),
          /* @__PURE__ */ t("span", { children: "·" }),
          /* @__PURE__ */ s("span", { children: [
            "cost ",
            /* @__PURE__ */ s("span", { className: "font-mono", children: [
              "$",
              e.sumCostUsd.toFixed(4)
            ] })
          ] }),
          typeof e.minOverallScore == "number" && typeof e.maxOverallScore == "number" ? /* @__PURE__ */ s(V, { children: [
            /* @__PURE__ */ t("span", { children: "·" }),
            /* @__PURE__ */ s("span", { children: [
              "range ",
              /* @__PURE__ */ t("span", { className: "font-mono", children: e.minOverallScore.toFixed(2) }),
              "–",
              /* @__PURE__ */ t("span", { className: "font-mono", children: e.maxOverallScore.toFixed(2) })
            ] })
          ] }) : null,
          /* @__PURE__ */ t("span", { children: "·" }),
          /* @__PURE__ */ s("span", { className: "font-mono", children: [
            e.numPassed,
            " pass / ",
            e.numFailed,
            " fail"
          ] })
        ] })
      ]
    }
  );
}
function Ad({
  aggregates: e,
  sortOrder: n = "desc",
  caption: r,
  loading: o = !1,
  className: a
}) {
  const i = L(() => {
    const x = e.slice();
    return x.sort((f, h) => f.dayBucket.localeCompare(h.dayBucket)), n === "desc" && x.reverse(), x;
  }, [e, n]), d = L(() => e.slice().sort((f, h) => f.dayBucket.localeCompare(h.dayBucket)).map((f) => f.numJudgments > 0 ? f.numPassed / f.numJudgments : 0), [e]);
  if (e.length === 0)
    return /* @__PURE__ */ t(
      "section",
      {
        className: I(
          "flex min-h-[120px] w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-surface-panel p-4 text-text-tertiary",
          a
        ),
        children: /* @__PURE__ */ t("span", { className: "text-[12px]", children: o ? "Loading trends…" : "No judgment activity in range." })
      }
    );
  const c = e.reduce((x, f) => x + f.numJudgments, 0), l = e.reduce((x, f) => x + f.numPassed, 0), p = e.reduce((x, f) => x + f.sumCostUsd, 0), m = c > 0 ? l / c : 0;
  return /* @__PURE__ */ s("section", { className: I("flex w-full flex-col gap-2", a), children: [
    /* @__PURE__ */ s("header", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ t("span", { className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary", children: r ?? `Judgment trend — ${e.length} days` }),
      /* @__PURE__ */ s(
        ne,
        {
          tone: m >= 0.9 ? "success" : m >= 0.6 ? "warning" : "danger",
          size: "sm",
          children: [
            (m * 100).toFixed(0),
            "% pass · ",
            c,
            " judgments"
          ]
        }
      ),
      /* @__PURE__ */ s("span", { className: "ml-auto font-mono text-[11px] text-text-tertiary", children: [
        "total cost $",
        p.toFixed(4)
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ t("span", { className: "text-[11px] font-medium uppercase text-text-tertiary", children: "pass-rate" }),
      /* @__PURE__ */ t(
        Jr,
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
    /* @__PURE__ */ s("table", { className: "w-full border-collapse text-[12px]", children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ s("tr", { className: "text-left text-[11px] uppercase tracking-wide text-text-tertiary", children: [
        /* @__PURE__ */ t("th", { scope: "col", className: "py-1 pr-2", children: "date" }),
        /* @__PURE__ */ t("th", { scope: "col", className: "py-1 pr-2", children: "pass" }),
        /* @__PURE__ */ t("th", { scope: "col", className: "py-1 pr-2", children: "mean" }),
        /* @__PURE__ */ t("th", { scope: "col", className: "py-1 pr-2 text-right", children: "judgments" }),
        /* @__PURE__ */ t("th", { scope: "col", className: "py-1 pl-2 text-right", children: "cost" })
      ] }) }),
      /* @__PURE__ */ t("tbody", { children: i.map((x) => /* @__PURE__ */ t(Bc, { row: x }, x.aggregateKey)) })
    ] })
  ] });
}
function Bc({ row: e }) {
  const n = e.numJudgments > 0 ? e.numPassed / e.numJudgments : 0, r = e.numJudgments > 0 ? e.sumOverallScore / e.numJudgments : 0, o = n >= 0.9 ? "success" : n >= 0.6 ? "warning" : "danger";
  return /* @__PURE__ */ s("tr", { className: "border-t border-border", children: [
    /* @__PURE__ */ t("td", { className: "py-1 pr-2 font-mono", children: e.dayBucket }),
    /* @__PURE__ */ t("td", { className: "py-1 pr-2", children: /* @__PURE__ */ s(ne, { tone: o, size: "sm", children: [
      (n * 100).toFixed(0),
      "%"
    ] }) }),
    /* @__PURE__ */ s("td", { className: "py-1 pr-2 font-mono", children: [
      (r * 100).toFixed(0),
      "%"
    ] }),
    /* @__PURE__ */ t("td", { className: "py-1 pr-2 text-right font-mono", children: e.numJudgments }),
    /* @__PURE__ */ s("td", { className: "py-1 pl-2 text-right font-mono", children: [
      "$",
      e.sumCostUsd.toFixed(4)
    ] })
  ] });
}
function Fc(e) {
  if (typeof e == "number") return e;
  if (typeof e == "string") {
    const n = Date.parse(e);
    if (Number.isFinite(n)) return n;
  }
  return Date.now();
}
function Rd(e = {}) {
  const { maxRecords: n = 50, runId: r } = e, [o, a] = R([]), i = te(/* @__PURE__ */ new Map()), d = te(!0);
  return q(() => (d.current = !0, () => {
    d.current = !1;
  }), []), Re("*", (c) => {
    if (!d.current) return;
    const l = c;
    if (!l || typeof l.eventType != "string") return;
    const p = l.eventType;
    if (!p.startsWith("pipeline.judge.")) return;
    const m = l.payload;
    if (!m || typeof m.runId != "string" || typeof m.stepId != "string" || r && m.runId !== r) return;
    const x = `${m.runId}::${m.stepId}`;
    a((f) => {
      const h = i.current.get(x), g = Fc(m.at), u = (y) => {
        if (typeof h == "number" && h >= 0 && h < f.length) {
          const C = f.slice();
          return C[h] = { ...f[h], ...y }, C;
        }
        const N = [y, ...f];
        N.length > n && (N.length = n);
        const v = /* @__PURE__ */ new Map();
        return N.forEach((C, b) => v.set(`${C.runId}::${C.stepId}`, b)), i.current = v, N;
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
  }), L(() => o, [o]);
}
function $d(e) {
  const n = ur(), [r, o] = R([]), [a, i] = R(!1), [d, c] = R(null), l = te(!0), p = te(() => {
  }), { pipelineId: m, rubricId: x, since: f, until: h, limit: g, refreshIntervalMs: u = 0, paused: y = !1 } = e, N = `${m ?? ""}|${x ?? ""}|${f ?? ""}|${h ?? ""}|${g ?? ""}|${y ? "1" : "0"}`;
  return q(() => (l.current = !0, () => {
    l.current = !1;
  }), []), q(() => {
    if (!n) {
      o([]), i(!1), c(null);
      return;
    }
    if (y) return;
    if (!m && !x) {
      c(new Error("useJudgmentAggregates: one of pipelineId or rubricId is required")), i(!1);
      return;
    }
    let v = !1;
    const C = async () => {
      i(!0);
      try {
        const b = await n.fetchAggregates({
          ...m ? { pipelineId: m } : {},
          ...x ? { rubricId: x } : {},
          ...f ? { since: f } : {},
          ...h ? { until: h } : {},
          ...typeof g == "number" ? { limit: g } : {}
        });
        if (v || !l.current) return;
        o(b.items), c(null);
      } catch (b) {
        if (v || !l.current) return;
        c(b instanceof Error ? b : new Error(String(b)));
      } finally {
        l.current && !v && i(!1);
      }
    };
    if (p.current = () => {
      C();
    }, C(), u > 0) {
      const b = setInterval(() => {
        C();
      }, u);
      return () => {
        v = !0, clearInterval(b);
      };
    }
    return () => {
      v = !0;
    };
  }, [n, N, u]), {
    aggregates: r,
    loading: a,
    error: d,
    reload: () => p.current()
  };
}
export {
  xo as ActionNode,
  Td as AggregateSummaryCard,
  gd as AllRunsPage,
  wo as ApprovalNode,
  we as BaseNode,
  Sc as CaptionPanel,
  fo as ConditionNode,
  Lc as CriteriaPanel,
  Mc as EditRecommendationsPanel,
  Ld as EventStreamProvider,
  go as ForkNode,
  vd as ImageSourceConfig,
  Do as ImageSourceNode,
  Ac as ImageWithBBoxOverlay,
  vo as JoinNode,
  Id as JudgmentApiProvider,
  Sd as JudgmentResultViewer,
  Ad as JudgmentTrendChart,
  co as LLMNode,
  Dc as ObjectsPanel,
  yd as PendingApprovalsPage,
  $c as PeoplePanel,
  ss as PipelineCanvas,
  gr as PipelineEditorContext,
  pd as PipelineEditorPage,
  Kn as PipelineEditorProvider,
  Md as PipelineEditorServicesProvider,
  hd as PipelineRunComparePage,
  xd as PipelineRunDiff,
  fd as PipelineRunReplayPage,
  md as PipelineRunsPage,
  Tr as PipelineRunsProvider,
  bd as PipelineStatsPage,
  ud as PipelinesPage,
  Nd as SaveConfig,
  Po as SaveNode,
  Pc as TagsPanel,
  uo as TransformNode,
  ao as TriggerNode,
  Oc as VerdictPanel,
  wd as VisionResultViewer,
  kd as VisionRunCard,
  Rc as imageOverlayPropsFrom,
  Mo as nodeTypes,
  Re as useEventStream,
  Vr as useEventStreamContext,
  qn as useImageUrl,
  $d as useJudgmentAggregates,
  ur as useJudgmentApi,
  Rd as useJudgmentResults,
  Ne as useLatestStepForNode,
  Je as usePipelineEditor,
  Ed as usePipelineEditorServices,
  st as usePipelineRuns,
  Te as useRetryFromStep,
  Cd as useVisionResults
};
